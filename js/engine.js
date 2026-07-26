/* ===== js/engine.js — 故事引擎 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  /**
   * 引擎: 读节点 → 校验 requires → 执行 action → 跳转
   * 引擎只懂通用规则,剧情全在 data/story.js
   */
  const Engine = {
    /** 当前是否正在跳转过场 (防止重复触发) */
    _transitioning: false,

    /** 获取节点对象 */
    getNode(nodeId) {
      const node = CyberAdv.story.nodes[nodeId];
      if (!node) {
        console.error(`[Engine] 节点不存在: ${nodeId}`);
        return null;
      }
      return node;
    },

    /**
     * 校验 requires 条件
     * @param {Object} requires - { items: [], skills: {}, flags: [] }
     * @returns {Object} { ok: boolean, reason: string }
     */
    checkRequires(requires) {
      if (!requires) return { ok: true, reason: "" };
      const state = CyberAdv.State;

      if (requires.items && Array.isArray(requires.items)) {
        for (const it of requires.items) {
          if (!state.hasItem(it)) {
            return { ok: false, reason: `缺少物品: ${CyberAdv.items[it]?.name || it}` };
          }
        }
      }

      if (requires.skills && typeof requires.skills === "object") {
        for (const [skill, min] of Object.entries(requires.skills)) {
          if (state.getSkill(skill) < min) {
            return { ok: false, reason: `${skill} 技能不足 (需 ≥${min})` };
          }
        }
      }

      if (requires.flags && Array.isArray(requires.flags)) {
        for (const f of requires.flags) {
          if (!state.hasFlag(f)) {
            return { ok: false, reason: `条件未达成: ${f}` };
          }
        }
      }

      return { ok: true, reason: "" };
    },

    /**
     * 执行 action (内置同步 + 异步小游戏/战斗)
     * @param {Object} action - { type, item, flag, skill, success, failure, ... }
     * @returns {Promise<string|Object>} 同步 action 返回字符串; 异步 action 返回 { outcome, message }
     */
    async runAction(action) {
      if (!action || typeof action !== "object") return "";
      const state = CyberAdv.State;
      const type = action.type || action.action; // 兼容 onEnter 的 action 字段

      switch (type) {
        case "give_item":
          if (action.item && state.giveItem(action.item)) {
            return `获得物品: ${CyberAdv.items[action.item]?.name || action.item}`;
          }
          return "";
        case "take_item":
          if (action.item && state.takeItem(action.item)) {
            return `失去物品: ${CyberAdv.items[action.item]?.name || action.item}`;
          }
          return "";
        case "set_flag":
          if (action.flag) {
            state.setFlag(action.flag, action.value !== false);
            return `事件标记: ${action.flag}`;
          }
          return "";
        case "modify_skill":
          if (action.skill) {
            state.modifySkill(action.skill, action.delta || 0);
            return `技能变化: ${action.skill} ${action.delta >= 0 ? "+" : ""}${action.delta}`;
          }
          return "";
        case "restart":
          // 由 main.js 处理重启逻辑,这里只发信号
          return "__RESTART__";
        // ===== 异步 action: 小游戏/战斗 =====
        case "minigame/hack":
          if (CyberAdv.Actions && CyberAdv.Actions.hack) {
            return await CyberAdv.Actions.hack(action);
          }
          return { outcome: "failure", message: "小游戏模块未加载" };
        case "battle":
          if (CyberAdv.Actions && CyberAdv.Actions.battle) {
            return await CyberAdv.Actions.battle(action);
          }
          return { outcome: "failure", message: "战斗模块未加载" };
        default:
          console.warn(`[Engine] 未知 action 类型: ${type}`);
          return "";
      }
    },

    /**
     * 跳转到节点
     * @param {string} nodeId - 目标节点 id
     * @param {Object} optionAction - 选项触发的 action (可选)
     */
    async goTo(nodeId, optionAction) {
      if (this._transitioning) return;
      const node = this.getNode(nodeId);
      if (!node) return;

      this._transitioning = true;

      // 1. 执行选项 action (如果有)
      let targetNode = nodeId;
      if (optionAction) {
        const result = await this.runAction(optionAction);

        // 重启信号
        if (result === "__RESTART__") {
          this._transitioning = false;
          CyberAdv.UI && CyberAdv.UI.onRestartRequest && CyberAdv.UI.onRestartRequest();
          return;
        }

        // 异步 action 返回 outcome 对象: 按 success/failure 跳转
        if (result && typeof result === "object" && result.outcome) {
          if (result.message) {
            const toastType = result.outcome === "success" ? "info" : result.outcome === "cancel" ? "warn" : "error";
            CyberAdv.UI && CyberAdv.UI.toast(result.message, toastType);
          }
          // cancel: 回到原节点,不跳转
          if (result.outcome === "cancel") {
            this._transitioning = false;
            return;
          }
          // success/failure: 覆盖目标节点
          if (result.outcome === "success" && optionAction.success) {
            targetNode = optionAction.success;
          } else if (result.outcome === "failure" && optionAction.failure) {
            targetNode = optionAction.failure;
          }
        } else if (typeof result === "string" && result) {
          // 同步 action 的字符串消息
          CyberAdv.UI && CyberAdv.UI.toast(result);
        }
      }

      // 重新获取目标节点 (可能被 action outcome 覆盖)
      const finalNode = this.getNode(targetNode);
      if (!finalNode) {
        this._transitioning = false;
        return;
      }

      // 2. glitch 过场
      if (CyberAdv.UI && CyberAdv.UI.glitchTransition) {
        await CyberAdv.UI.glitchTransition(finalNode.title || "");
      }

      // 3. 更新状态
      CyberAdv.State.setCurrentNode(targetNode);

      // 4. 执行 onEnter action
      if (finalNode.onEnter) {
        const msg = await this.runAction(finalNode.onEnter);
        if (typeof msg === "string" && msg && !msg.startsWith("__")) {
          CyberAdv.UI && CyberAdv.UI.toast(msg);
        }
      }

      // 5. 渲染
      CyberAdv.UI && CyberAdv.UI.renderNode(finalNode);

      // 6. 自动存档
      CyberAdv.Save && CyberAdv.Save.autoSave && CyberAdv.Save.autoSave();

      this._transitioning = false;
    },

    /**
     * 选择某个选项
     * @param {number} index - 选项索引
     */
    chooseOption(index) {
      const node = this.getNode(CyberAdv.State.data.currentNode);
      if (!node || !node.options || !node.options[index]) return;

      const opt = node.options[index];

      // 校验 requires
      const check = this.checkRequires(opt.requires);
      if (!check.ok) {
        CyberAdv.UI && CyberAdv.UI.toast(check.reason, "warn");
        return;
      }

      // 跳转 (携带选项 action)
      this.goTo(opt.next, opt.action);
    },

    /** 启动游戏: 跳转到 start 节点 */
    start() {
      if (!CyberAdv.State.data) CyberAdv.State.init();
      this.goTo(CyberAdv.State.data.currentNode);
    }
  };

  CyberAdv.Engine = Engine;
})(window);

/* ===== js/state.js — 玩家状态管理 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  /**
   * 玩家状态对象
   * @typedef {Object} PlayerState
   * @property {string} currentNode - 当前剧情节点 id
   * @property {string[]} items - 物品 id 列表
   * @property {Object<string, number>} skills - 技能名 -> 数值
   * @property {Object<string, boolean>} flags - 事件标记
   * @property {string[]} history - 已访问节点历史
   */
  const State = {
    data: null,

    /** 初始化为默认状态 */
    init() {
      const s = CyberAdv.settings;
      this.data = {
        currentNode: CyberAdv.story.start,
        items: [...s.initialItems],
        skills: { ...s.initialSkills },
        flags: { ...s.initialFlags },
        history: [CyberAdv.story.start]
      };
      this._notify();
      return this.data;
    },

    /** 从存档对象恢复状态 (浅拷贝,避免外部引用污染) */
    loadFrom(snapshot) {
      if (!snapshot || typeof snapshot !== "object") {
        throw new Error("无效的存档数据");
      }
      this.data = {
        currentNode: snapshot.currentNode || CyberAdv.story.start,
        items: Array.isArray(snapshot.items) ? [...snapshot.items] : [],
        skills: { ...(snapshot.skills || CyberAdv.settings.initialSkills) },
        flags: { ...(snapshot.flags || {}) },
        history: Array.isArray(snapshot.history) ? [...snapshot.history] : []
      };
      this._notify();
      return this.data;
    },

    /** 导出可序列化的快照 */
    snapshot() {
      if (!this.data) return null;
      return {
        currentNode: this.data.currentNode,
        items: [...this.data.items],
        skills: { ...this.data.skills },
        flags: { ...this.data.flags },
        history: [...this.data.history]
      };
    },

    // ===== 物品 =====
    hasItem(itemId) {
      return this.data && this.data.items.includes(itemId);
    },

    giveItem(itemId) {
      if (!this.data) return false;
      if (this.data.items.includes(itemId)) return false;
      this.data.items.push(itemId);
      this._notify();
      return true;
    },

    takeItem(itemId) {
      if (!this.data) return false;
      const i = this.data.items.indexOf(itemId);
      if (i === -1) return false;
      this.data.items.splice(i, 1);
      this._notify();
      return true;
    },

    // ===== 技能 =====
    getSkill(name) {
      return this.data ? (this.data.skills[name] || 0) : 0;
    },

    modifySkill(name, delta) {
      if (!this.data) return;
      this.data.skills[name] = (this.data.skills[name] || 0) + delta;
      this._notify();
    },

    // ===== Flags =====
    hasFlag(flag) {
      return !!(this.data && this.data.flags[flag]);
    },

    setFlag(flag, value = true) {
      if (!this.data) return;
      this.data.flags[flag] = value;
      this._notify();
    },

    // ===== 节点跳转 =====
    setCurrentNode(nodeId) {
      if (!this.data) return;
      this.data.currentNode = nodeId;
      if (!this.data.history.includes(nodeId)) {
        this.data.history.push(nodeId);
      }
      this._notify();
    },

    // ===== 订阅机制: 物品栏/技能面板自动刷新 =====
    _listeners: [],

    subscribe(fn) {
      if (typeof fn === "function") this._listeners.push(fn);
      return () => {
        const i = this._listeners.indexOf(fn);
        if (i !== -1) this._listeners.splice(i, 1);
      };
    },

    _notify() {
      this._listeners.forEach((fn) => {
        try { fn(this.data); } catch (e) { console.error("[State] listener error", e); }
      });
    }
  };

  CyberAdv.State = State;
})(window);

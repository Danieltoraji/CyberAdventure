/* ===== js/actions.js — 小游戏/战斗 action 实现 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  const Actions = {
    // 字符池 (用于 hack 序列)
    _charPool: "ABCDEF0123456789@#$%",

    /** 获取模态层 DOM */
    _layer() {
      return document.getElementById("modal-layer");
    },

    /** 打开模态层,返回内容容器 */
    _open(title, desc) {
      const layer = this._layer();
      layer.innerHTML = "";
      const box = document.createElement("div");
      box.className = "modal-box";

      if (title) {
        const t = document.createElement("div");
        t.className = "modal-title";
        t.textContent = title;
        box.appendChild(t);
      }
      if (desc) {
        const d = document.createElement("div");
        d.className = "modal-desc";
        d.textContent = desc;
        box.appendChild(d);
      }

      layer.appendChild(box);
      layer.classList.remove("hidden");
      return box;
    },

    /** 关闭模态层 */
    _close() {
      const layer = this._layer();
      layer.classList.add("hidden");
      layer.innerHTML = "";
    },

    /**
     * 黑客破解小游戏: 序列破解
     * 显示随机字符序列,玩家限时按序输入
     * @param {Object} action - { type, success, failure, difficulty }
     * @returns {Promise<{outcome, message}>}
     */
    hack(action) {
      const state = CyberAdv.State;
      const hackSkill = state.getSkill("hack");
      // 难度: 序列长度 = 基础难度 + 2, hack 技能每+1 减1, 最少3
      const baseLen = (action.difficulty || 3) + 2;
      const seqLen = Math.max(3, baseLen - Math.floor(hackSkill / 2));
      // 时长: 10s + hack*2s
      const duration = 10000 + hackSkill * 2000;

      // 生成随机序列
      const pool = this._charPool;
      let sequence = "";
      for (let i = 0; i < seqLen; i++) {
        sequence += pool[Math.floor(Math.random() * pool.length)];
      }

      return new Promise((resolve) => {
        const box = this._open(
          "ICE BREAKER // 序列破解",
          `防火墙节点已锁定。按顺序输入下方序列以注入漏洞。\n[ HACK ${hackSkill} | 序列长度 ${seqLen} | 限时 ${Math.floor(duration / 1000)}s ]`
        );

        // 序列显示区
        const seqBox = document.createElement("div");
        seqBox.className = "hack-sequence";
        for (let i = 0; i < sequence.length; i++) {
          const c = document.createElement("span");
          c.className = "hack-char";
          c.textContent = sequence[i];
          c.style.animationDelay = `${i * 0.1}s`;
          seqBox.appendChild(c);
        }
        box.appendChild(seqBox);

        // 倒计时
        const timer = document.createElement("div");
        timer.className = "hack-timer";
        box.appendChild(timer);

        // 进度提示
        const progress = document.createElement("div");
        progress.className = "hack-progress";
        box.appendChild(progress);

        // 输入框
        const input = document.createElement("input");
        input.className = "hack-input";
        input.type = "text";
        input.maxLength = sequence.length;
        input.spellcheck = false;
        input.setAttribute("autocomplete", "off");
        box.appendChild(input);

        // 按钮区
        const actions = document.createElement("div");
        actions.className = "modal-actions";
        const submitBtn = document.createElement("button");
        submitBtn.className = "modal-btn";
        submitBtn.textContent = "提交破解";
        const cancelBtn = document.createElement("button");
        cancelBtn.className = "modal-btn btn-cancel";
        cancelBtn.textContent = "放弃";
        actions.appendChild(submitBtn);
        actions.appendChild(cancelBtn);
        box.appendChild(actions);

        let timeLeft = duration;
        let resolved = false;
        let timerInterval = null;

        const updateProgress = () => {
          const typed = input.value;
          let correct = 0;
          for (let i = 0; i < typed.length && i < sequence.length; i++) {
            if (typed[i] === sequence[i]) correct++;
            else break;
          }
          progress.innerHTML = `进度: <span class="ok">${correct}/${sequence.length}</span>`;
        };

        const updateTimer = () => {
          timeLeft -= 100;
          const secs = Math.ceil(timeLeft / 1000);
          timer.textContent = `剩余时间: ${secs}s`;
          if (timeLeft <= 3000) timer.classList.add("danger");
          if (timeLeft <= 0) {
            finish("failure", "时间耗尽! 防火墙未被攻破。");
          }
        };

        const finish = (outcome, message) => {
          if (resolved) return;
          resolved = true;
          clearInterval(timerInterval);
          this._close();
          resolve({ outcome, message });
        };

        // 提交校验
        const submit = () => {
          const typed = input.value.toUpperCase();
          if (typed === sequence) {
            finish("success", "序列匹配! 防火墙崩溃,数据流涌入。");
          } else if (typed.length >= sequence.length) {
            finish("failure", "序列错误! 警报已触发。");
          } else {
            // 未输完,提示
            progress.innerHTML = `<span style="color:var(--neon-amber)">请输入完整序列 (${typed.length}/${sequence.length})</span>`;
          }
        };

        submitBtn.addEventListener("click", submit);
        cancelBtn.addEventListener("click", () => {
          finish("cancel", "你放弃了破解。");
        });
        input.addEventListener("input", updateProgress);
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") submit();
        });

        // 自动聚焦
        setTimeout(() => input.focus(), 50);

        timerInterval = setInterval(updateTimer, 100);
        updateTimer();
        updateProgress();
      });
    },

    /**
     * 回合制战斗
     * @param {Object} action - { type, success, failure, enemy: {name, hp, atk} }
     * @returns {Promise<{outcome, message}>}
     */
    battle(action) {
      const state = CyberAdv.State;
      const fightSkill = state.getSkill("fight");
      // 玩家 HP = fight*5 + 10
      let playerHP = fightSkill * 5 + 10;
      const playerMaxHP = playerHP;
      // 敌人
      const enemy = action.enemy || { name: "未知敌人", hp: 20, atk: 4 };
      let enemyHP = enemy.hp;
      const enemyMaxHP = enemy.hp;

      return new Promise((resolve) => {
        const box = this._open(
          `COMBAT // ${enemy.name}`,
          `战斗开始! [ 你的战斗 ${fightSkill} | HP ${playerMaxHP} ] vs [ ${enemy.name} | HP ${enemyMaxHP} | ATK ${enemy.atk} ]`
        );

        const arena = document.createElement("div");
        arena.className = "battle-arena";
        box.appendChild(arena);

        // 战斗双方
        const combatants = document.createElement("div");
        combatants.className = "battle-combatants";
        const playerUnit = this._makeUnit("你", playerHP, playerMaxHP, false);
        const enemyUnit = this._makeUnit(enemy.name, enemyHP, enemyMaxHP, true);
        combatants.appendChild(playerUnit.root);
        combatants.appendChild(enemyUnit.root);
        arena.appendChild(combatants);

        // 战斗日志
        const log = document.createElement("div");
        log.className = "battle-log";
        log.innerHTML = '<div class="log-entry log-info">> 战斗开始...</div>';
        arena.appendChild(log);

        // 操作区
        const actions = document.createElement("div");
        actions.className = "modal-actions";
        const atkBtn = document.createElement("button");
        atkBtn.className = "modal-btn";
        atkBtn.textContent = "攻击";
        const defBtn = document.createElement("button");
        defBtn.className = "modal-btn";
        defBtn.textContent = "防御";
        const fleeBtn = document.createElement("button");
        fleeBtn.className = "modal-btn btn-cancel";
        fleeBtn.textContent = "逃跑";
        actions.appendChild(atkBtn);
        actions.appendChild(defBtn);
        actions.appendChild(fleeBtn);
        arena.appendChild(actions);

        // 物品栏 (战斗中可用)
        const itemsBox = document.createElement("div");
        itemsBox.className = "battle-items";
        arena.appendChild(itemsBox);

        let defending = false;
        let resolved = false;
        let playerTurn = true;
        let enemyStunned = false;

        const addLog = (text, cls = "") => {
          const entry = document.createElement("div");
          entry.className = "log-entry " + cls;
          entry.textContent = text;
          log.appendChild(entry);
          log.scrollTop = log.scrollHeight;
        };

        const finish = (outcome, message) => {
          if (resolved) return;
          resolved = true;
          this._close();
          resolve({ outcome, message });
        };

        const updateItems = () => {
          itemsBox.innerHTML = "";
          const items = state.data.items;
          // 战斗可用物品: emp_grenade (机器人眩晕), medkit (回血)
          const usable = { emp_grenade: "EMP手雷(眩晕敌人)", medkit: "医疗包(+8HP)" };
          items.forEach((id) => {
            if (usable[id]) {
              const btn = document.createElement("button");
              btn.className = "battle-item-btn";
              btn.textContent = usable[id];
              btn.addEventListener("click", () => useItem(id));
              itemsBox.appendChild(btn);
            }
          });
        };

        const useItem = (id) => {
          if (!playerTurn || resolved) return;
          if (id === "emp_grenade") {
            // EMP 手雷: 对机器人造成大量伤害 + 眩晕一回合
            const dmg = fightSkill + 6 + Math.floor(Math.random() * 4) + 1;
            enemyHP = Math.max(0, enemyHP - dmg);
            enemyUnit.update(enemyHP, enemyMaxHP);
            addLog(`> 你投出 EMP 手雷,${enemy.name} 系统紊乱,受到 ${dmg} 点伤害并被眩晕!`, "log-dmg");
            state.takeItem("emp_grenade");
            enemyStunned = true;
            playerTurn = false;
            setTimeout(enemyTurn, 600);
          } else if (id === "medkit") {
            const heal = 8;
            playerHP = Math.min(playerMaxHP, playerHP + heal);
            playerUnit.update(playerHP, playerMaxHP);
            addLog(`> 你使用医疗包,回复 ${heal} HP。`, "log-heal");
            state.takeItem("medkit");
            updateItems();
            // 使用医疗包不结束回合,但仍让敌人行动
            playerTurn = false;
            setTimeout(enemyTurn, 600);
          }
          updateItems();
        };

        const playerAttack = () => {
          if (!playerTurn || resolved) return;
          const dmg = fightSkill + Math.floor(Math.random() * 3) + 1;
          enemyHP = Math.max(0, enemyHP - dmg);
          enemyUnit.update(enemyHP, enemyMaxHP);
          addLog(`> 你攻击 ${enemy.name},造成 ${dmg} 点伤害。`, "log-dmg");
          if (enemyHP <= 0) {
            addLog(`> ${enemy.name} 倒下了!`, "log-info");
            setTimeout(() => finish("success", `你击败了 ${enemy.name}!`), 800);
            return;
          }
          playerTurn = false;
          defending = false;
          setTimeout(enemyTurn, 600);
        };

        const playerDefend = () => {
          if (!playerTurn || resolved) return;
          defending = true;
          addLog("> 你进入防御姿态,本回合受击减半。", "log-info");
          playerTurn = false;
          setTimeout(enemyTurn, 600);
        };

        const enemyTurn = () => {
          if (resolved) return;
          // 眩晕状态: 跳过本回合
          if (enemyStunned) {
            addLog(`< ${enemy.name} 仍在系统紊乱中,无法行动!`, "log-info");
            enemyStunned = false;
            playerTurn = true;
            return;
          }
          // 敌人 AI: 70% 攻击, 30% 蓄力 (下回合伤害+2)
          const r = Math.random();
          if (r < 0.7) {
            let dmg = enemy.atk + Math.floor(Math.random() * 2);
            if (defending) dmg = Math.floor(dmg / 2);
            playerHP = Math.max(0, playerHP - dmg);
            playerUnit.update(playerHP, playerMaxHP);
            addLog(`< ${enemy.name} 攻击你,造成 ${dmg} 点伤害。`, "log-dmg");
            // 实际受击后重置防御状态
            defending = false;
            if (playerHP <= 0) {
              addLog("< 你倒下了...", "log-info");
              setTimeout(() => finish("failure", `你被 ${enemy.name} 击败了。`), 800);
              return;
            }
          } else {
            addLog(`< ${enemy.name} 正在蓄力...`, "log-info");
            // 蓄力回合不重置防御,持续到下次受击
          }
          playerTurn = true;
        };

        atkBtn.addEventListener("click", playerAttack);
        defBtn.addEventListener("click", playerDefend);
        fleeBtn.addEventListener("click", () => {
          // 逃跑: 50% 成功
          if (Math.random() < 0.5) {
            finish("cancel", "你成功逃离了战斗。");
          } else {
            addLog("< 逃跑失败! 敌人趁机攻击。", "log-info");
            playerTurn = false;
            setTimeout(enemyTurn, 600);
          }
        });

        updateItems();
      });
    },

    /** 构建战斗单位 DOM (含 HP 条更新方法) */
    _makeUnit(name, hp, maxHP, isEnemy) {
      const root = document.createElement("div");
      root.className = "battle-unit" + (isEnemy ? " enemy" : "");

      const nameEl = document.createElement("div");
      nameEl.className = "battle-unit-name";
      nameEl.textContent = name;
      root.appendChild(nameEl);

      const hpBar = document.createElement("div");
      hpBar.className = "battle-hp-bar";
      const hpFill = document.createElement("div");
      hpFill.className = "battle-hp-fill";
      hpFill.style.width = "100%";
      hpBar.appendChild(hpFill);
      root.appendChild(hpBar);

      const hpText = document.createElement("div");
      hpText.className = "battle-hp-text";
      hpText.textContent = `${hp} / ${maxHP}`;
      root.appendChild(hpText);

      return {
        root,
        update(curHP, max) {
          const pct = Math.max(0, (curHP / max) * 100);
          hpFill.style.width = pct + "%";
          hpText.textContent = `${curHP} / ${max}`;
        }
      };
    }
  };

  CyberAdv.Actions = Actions;
})(window);

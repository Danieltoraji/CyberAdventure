/* ===== js/inventory.js — 物品栏 + 技能面板 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  const Inventory = {
    el: {},

    init() {
      this.el.inventoryList = document.getElementById("inventoryList");
      this.el.statsList = document.getElementById("statsList");

      // 订阅状态变化,自动刷新
      CyberAdv.State.subscribe(() => this.refresh());
      this.refresh();
    },

    /** 刷新物品栏 + 技能面板 */
    refresh() {
      this._renderInventory();
      this._renderStats();
    },

    _renderInventory() {
      const items = CyberAdv.State.data ? CyberAdv.State.data.items : [];
      this.el.inventoryList.innerHTML = "";

      if (!items.length) {
        const li = document.createElement("li");
        li.className = "empty-hint";
        li.textContent = "[ 空 ]";
        this.el.inventoryList.appendChild(li);
        return;
      }

      items.forEach((id) => {
        const def = CyberAdv.items[id];
        const li = document.createElement("li");
        if (def) {
          li.textContent = def.name;
          li.title = def.desc;
        } else {
          li.textContent = id;
          li.title = "未知物品";
        }
        this.el.inventoryList.appendChild(li);
      });
    },

    _renderStats() {
      const skills = CyberAdv.State.data ? CyberAdv.State.data.skills : {};
      this.el.statsList.innerHTML = "";

      const entries = Object.entries(skills);
      if (!entries.length) {
        const li = document.createElement("li");
        li.className = "empty-hint";
        li.textContent = "[ 无 ]";
        this.el.statsList.appendChild(li);
        return;
      }

      const labels = { hack: "黑客", fight: "战斗", charm: "魅力" };
      entries.forEach(([key, val]) => {
        const li = document.createElement("li");
        const label = labels[key] || key;
        li.innerHTML = `<span>${label}</span><span class="stat-value">${val}</span>`;
        this.el.statsList.appendChild(li);
      });
    }
  };

  CyberAdv.Inventory = Inventory;
})(window);

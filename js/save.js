/* ===== js/save.js — localStorage 存档系统 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  const Save = {
    /** 存档结构版本号 (用于后续迁移) */
    SCHEMA_VERSION: CyberAdv.settings.schemaVersion || 1,

    /** 自动存档 (每次跳转后调用) */
    autoSave() {
      try {
        const data = {
          schemaVersion: this.SCHEMA_VERSION,
          state: CyberAdv.State.snapshot(),
          timestamp: Date.now()
        };
        localStorage.setItem(CyberAdv.settings.autoSaveKey, JSON.stringify(data));
      } catch (e) {
        console.warn("[Save] 自动存档失败", e);
      }
    },

    /** 手动存档 */
    manualSave() {
      try {
        const data = {
          schemaVersion: this.SCHEMA_VERSION,
          state: CyberAdv.State.snapshot(),
          timestamp: Date.now()
        };
        localStorage.setItem(CyberAdv.settings.manualSaveKey, JSON.stringify(data));
        CyberAdv.UI && CyberAdv.UI.toast("存档成功");
        return true;
      } catch (e) {
        console.error("[Save] 手动存档失败", e);
        CyberAdv.UI && CyberAdv.UI.toast("存档失败: " + e.message, "error");
        return false;
      }
    },

    /** 读档 (手动优先,回退自动) */
    load() {
      const data = this._read(CyberAdv.settings.manualSaveKey) || this._read(CyberAdv.settings.autoSaveKey);
      if (!data) {
        CyberAdv.UI && CyberAdv.UI.toast("无可用存档", "warn");
        return false;
      }
      return this._apply(data);
    },

    /** 仅读自动存档 (启动时恢复) */
    loadAuto() {
      const data = this._read(CyberAdv.settings.autoSaveKey);
      if (!data) return false;
      return this._apply(data);
    },

    /** 清除所有存档 */
    clear() {
      localStorage.removeItem(CyberAdv.settings.autoSaveKey);
      localStorage.removeItem(CyberAdv.settings.manualSaveKey);
    },

    // ===== 内部 =====
    _read(key) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (!data || typeof data !== "object") return null;
        // 版本迁移钩子 (未来扩展)
        if (data.schemaVersion !== this.SCHEMA_VERSION) {
          data.state = this._migrate(data);
        }
        return data;
      } catch (e) {
        console.warn("[Save] 读取存档失败", e);
        return null;
      }
    },

    _apply(data) {
      try {
        if (!data.state) return false;
        CyberAdv.State.loadFrom(data.state);
        CyberAdv.UI && CyberAdv.UI.toast("读档成功");
        return true;
      } catch (e) {
        console.error("[Save] 应用存档失败", e);
        CyberAdv.UI && CyberAdv.UI.toast("读档失败: " + e.message, "error");
        return false;
      }
    },

    /** 版本迁移钩子 (预留) */
    _migrate(data) {
      // 未来: 根据 schemaVersion 做字段补全/重命名
      return data.state;
    }
  };

  CyberAdv.Save = Save;
})(window);

/* ===== js/main.js — 入口,初始化所有模块 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  async function boot() {
    // 1. 初始化 UI (DOM 引用 + 键盘绑定)
    CyberAdv.UI.init();
    CyberAdv.UI.bindKeyboard();

    // 2. 初始化物品栏 (订阅状态变化)
    CyberAdv.Inventory.init();

    // 3. 尝试恢复自动存档,否则初始化默认状态
    const restored = CyberAdv.Save.loadAuto();
    if (!restored) {
      CyberAdv.State.init();
    }

    // 4. 绑定系统按钮
    document.getElementById("btnSave").addEventListener("click", () => CyberAdv.Save.manualSave());
    document.getElementById("btnLoad").addEventListener("click", () => {
      if (CyberAdv.Save.load()) {
        CyberAdv.Engine.start();
      }
    });
    document.getElementById("btnRestart").addEventListener("click", () => {
      if (confirm("确认重新开始? 当前进度将丢失。")) {
        CyberAdv.Save.clear();
        CyberAdv.State.init();
        CyberAdv.Engine.start();
      }
    });

    // 5. 播放启动屏
    await CyberAdv.UI.playBootSequence();

    // 6. 启动引擎 (跳转到当前节点)
    CyberAdv.Engine.start();

    console.log("%c[CYBERADVENTURE] 系统就绪 // 双击 index.html 即开即玩", "color:#00ff9c");
  }

  // DOM 就绪后启动
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window);

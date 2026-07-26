/* ===== data/settings.js — 默认设置 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  CyberAdv.settings = {
    // 打字机速度 (ms/字符)
    typeSpeed: 18,
    // glitch 过场时长 (ms)
    glitchDuration: 600,
    // 启动屏文字
    bootSequence: [
      "> CYBERADVENTURE BIOS v2.1",
      "> Initializing neural interface...",
      "> Loading NIGHTCITY_GRID.dat ... OK",
      "> Mounting /dev/memory ... OK",
      "> Decrypting story nodes ... OK",
      "> [SYSTEM READY]"
    ],
    // 自动存档键
    autoSaveKey: "cyberadv_autosave",
    // 手动存档键
    manualSaveKey: "cyberadv_save",
    // 存档结构版本号 (用于后续迁移)
    schemaVersion: 1,
    // 玩家初始技能
    initialSkills: {
      hack: 3,
      fight: 2,
      charm: 1
    },
    // 玩家初始物品
    initialItems: [],
    // 玩家初始 flags
    initialFlags: {}
  };
})(window);

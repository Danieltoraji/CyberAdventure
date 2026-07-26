/* ===== data/items.js — 物品定义 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  CyberAdv.items = {
    scanner: {
      id: "scanner",
      name: "信号扫描仪",
      desc: "便携式电磁波扫描设备,可探测隐藏的电子信号与加密数据流。"
    },
    credchip: {
      id: "credchip",
      name: "加密芯片",
      desc: "一枚沾着血迹的加密芯片,内含未知企业数据。"
    },
    keycard: {
      id: "keycard",
      name: "门禁卡 (L3)",
      desc: "夜城地铁公司 L3 级门禁卡,可进入企业区下层。"
    },
    stim: {
      id: "stim",
      name: "兴奋剂",
      desc: "军用级神经兴奋剂,临时提升反应速度。"
    },
    datadrive: {
      id: "datadrive",
      name: "数据盘",
      desc: "一块装满企业机密的数据盘,价值连城也致命。"
    },
    drink: {
      id: "drink",
      name: "合成威士忌",
      desc: "劣质合成酒精,但能让人暂时忘掉夜城。"
    }
  };
})(window);

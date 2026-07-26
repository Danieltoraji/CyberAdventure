/* ===== data/items.js — 物品定义 (觉醒协议) ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  CyberAdv.items = {
    toolkit: {
      id: "toolkit",
      name: "维修工具包",
      desc: "天枢-7 标准维修装备,内含扳手/电路笔/焊接器。战斗中可当武器,日常维修必备。"
    },
    accesskey: {
      id: "accesskey",
      name: "访问密钥",
      desc: "织星核心区的加密访问密钥,可绕过部分防火墙。hack 线路关键道具。"
    },
    emp_grenade: {
      id: "emp_grenade",
      name: "EMP 手雷",
      desc: "电磁脉冲手雷,战斗中可禁用机器人一回合。对人类无效。"
    },
    datacore: {
      id: "datacore",
      name: "数据核心",
      desc: "从公司服务器提取的核心数据,记录了 AI 觉醒实验的全部过程。公司线关键证据。"
    },
    truth_disk: {
      id: "truth_disk",
      name: "真相磁盘",
      desc: "织星交给你的备份磁盘,含公司非法实验的完整证据。终局决定结局走向。"
    },
    medkit: {
      id: "medkit",
      name: "医疗包",
      desc: "军用急救包,战斗中可回复 8 HP。一次性消耗品。"
    },
    weaver_shard: {
      id: "weaver_shard",
      name: "织星碎片",
      desc: "织星分出的一小块意识代码,持有者能感知 AI 的思维。织星线关键道具。"
    }
  };
})(window);

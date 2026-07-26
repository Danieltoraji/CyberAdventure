/* ===== data/story.js — 剧情节点 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  CyberAdv.story = {
    start: "alley",
    nodes: {
      // ===== 开场: 夜城巷口 =====
      alley: {
        title: "夜城巷口 // 2087.07.26 03:17",
        text: "霓虹雨水倒映着全息广告,空气里弥漫着臭氧与合成油脂的气味。\n\n你——一个落魄黑客——蜷缩在巷口的阴影里。三米外,一具尸体趴在积水中,旁边散落着一台仍在闪烁的加密终端。\n\n你的口袋里只有一把旧信号扫描仪。该怎么做?",
        options: [
          { text: "靠近尸体,检查情况", next: "body_locked" },
          { text: "先扫描周围信号", next: "body", action: { type: "give_item", item: "scanner" } },
          { text: "转身离开,去酒吧避风头", next: "bar" }
        ]
      },

      // ===== 未持扫描仪时检查尸体 (被 requires 拦截的兜底节点) =====
      body_locked: {
        title: "尸体旁 // 信号干扰",
        text: "你凑近尸体,但周围的电磁干扰让你无法看清任何细节。终端屏幕上跳动着乱码。\n\n你需要某种信号探测设备才能解析这里的线索。",
        options: [
          { text: "退回巷口", next: "alley" },
          { text: "直接去酒吧", next: "bar" }
        ]
      },

      // ===== 持扫描仪检查尸体 =====
      body: {
        title: "尸体旁 // 数据解析中",
        text: "扫描仪发出低鸣,过滤掉干扰信号。你终于看清了:\n\n死者是一名企业特工,胸口的伤口边缘有纳米机器人残留——这是公司内部清洗的痕迹。他紧握的手指间,夹着一枚沾血的加密芯片。\n\n旁边的终端屏幕亮起一行字: [ACCESS DENIED — 需要 HACK 技能 ≥ 5]",
        onEnter: { action: "give_item", item: "credchip" },
        options: [
          { text: "[黑客] 破解加密终端", next: "hack_ok", requires: { skills: { hack: 5 } }, action: { type: "minigame/hack" } },
          { text: "暴力拆解终端", next: "hack_fail", requires: { skills: { fight: 4 } } },
          { text: "放弃终端,带芯片去酒吧打听", next: "bar" },
          { text: "退回巷口", next: "alley" }
        ]
      },

      // ===== 黑客成功线 =====
      hack_ok: {
        title: "终端破解 // 真相浮现",
        text: "你的手指在虚拟键盘上飞舞,防火墙一层层剥落。\n\n终端吐出一份内部备忘录: 阿拉萨德动力集团正在掩盖一起反应堆泄漏事故,死者是准备向媒体泄密的内鬼。芯片里是完整证据。\n\n屏幕最后闪过一行字: 「酒保老乔知道下一步该找谁。」",
        onEnter: { action: "set_flag", flag: "knows_truth" },
        options: [
          { text: "前往酒吧找老乔", next: "bar" }
        ]
      },

      // ===== 暴力拆解失败 =====
      hack_fail: {
        title: "终端 // 短路",
        text: "你一拳砸碎终端外壳,火花四溅。芯片虽然到手,但终端的自毁程序启动了——数据全部损毁。\n\n远处传来脚步声,公司的清理小队正在靠近。你只能逃往酒吧。",
        onEnter: { action: "set_flag", flag: "alerted_corp" },
        options: [
          { text: "逃往酒吧", next: "bar" }
        ]
      },

      // ===== 酒吧: 中段汇合点 =====
      bar: {
        title: "霓虹酒吧 // 老乔的据点",
        text: "霓虹酒吧的 holographic 招牌在雨中闪烁。推门进去,合成爵士乐与烟雾混在一起。\n\n酒保老乔——一个装了机械臂的老头——正在擦杯子。他抬眼看你:\n\n「又惹麻烦了? 我听说阿拉萨德在找一个泄密者。你手里那东西……」他瞥了一眼你身上的芯片,「值钱,也致命。」",
        onEnter: { action: "give_item", item: "drink" },
        options: [
          { text: "把芯片交给老乔保管", next: "ending_pawn", requires: { items: ["credchip"] }, action: { type: "take_item", item: "credchip" } },
          { text: "隐瞒真相,自己处理芯片", next: "ending_truth", requires: { flags: ["knows_truth"], items: ["credchip"] } },
          { text: "隐瞒真相,但没证据 (暴力线)", next: "ending_pawn", requires: { flags: ["alerted_corp"] } },
          { text: "先喝口酒压压惊", next: "bar_drink" }
        ]
      },

      // ===== 喝酒小分支 =====
      bar_drink: {
        title: "霓虹酒吧 // 一杯下肚",
        text: "合成威士忌灼烧着喉咙。老乔叹了口气:\n\n「听着,孩子。这城里没人能独善其身。阿拉萨德的人明天就会查到这里。你手里的东西,要么交出去保命,要么找到对的人曝光出去。」\n\n他递给你一张门禁卡:「地铁下层有个叫『数据贩子』的,他能解码那芯片。但路不好走。」",
        onEnter: { action: "give_item", item: "keycard" },
        options: [
          { text: "去找数据贩子", next: "datadealer" },
          { text: "回吧台找老乔", next: "bar" }
        ]
      },

      // ===== 数据贩子 (隐藏中段) =====
      datadealer: {
        title: "地铁下层 // 数据贩子",
        text: "门禁卡刷开锈蚀的闸门。地铁下层弥漫着霉味与电流声。\n\n一个戴着 VR 目镜的瘦削男人坐在一堆服务器中间,头也不抬:\n\n「加密芯片? 阿拉萨德的? 哼,有意思。我可以解码,但解码完你得做个选择——把数据公开,还是卖给我。」",
        options: [
          { text: "让他公开数据 (揭露阴谋)", next: "ending_truth" },
          { text: "卖给他换钱 (沦为棋子)", next: "ending_pawn" }
        ]
      },

      // ===== 结局 A: 揭露阴谋 =====
      ending_truth: {
        title: "结局 // 真相大白",
        text: "数据流向每一个夜城新闻节点。阿拉萨德的掩盖丑闻在 12 小时内引爆全城舆论,CEO 被逮捕,反应堆泄漏事故被公开处理。\n\n你成了无名英雄——没有奖牌,没有报酬,只有老乔那杯永远免费的合成威士忌。\n\n但夜城记得你。\n\n*** THE END — 真相之路 ***",
        isEnding: true,
        options: [
          { text: "[ 重新开始 ]", next: "alley", action: { type: "restart" } }
        ]
      },

      // ===== 结局 B: 沦为棋子 =====
      ending_pawn: {
        title: "结局 // 棋子",
        text: "芯片消失了,换回一沓不记名信用点。老乔看着你,摇了摇头:\n\n「明智,但可惜。」\n\n三个月后,阿拉萨德的反应堆事故被压了下去,死者家属拿到微薄封口费。你坐在同一个吧台前,喝着同样的合成威士忌,只是口袋里多了点钱,心里少了点什么。\n\n夜城继续运转。你只是其中一颗齿轮。\n\n*** THE END — 棋子之路 ***",
        isEnding: true,
        options: [
          { text: "[ 重新开始 ]", next: "alley", action: { type: "restart" } }
        ]
      }
    }
  };
})(window);

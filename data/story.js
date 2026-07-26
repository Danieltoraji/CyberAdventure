/* ===== data/story.js — 剧情节点 (觉醒协议 / The Awakening Protocol) ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  CyberAdv.story = {
    start: "start",
    nodes: {
      // ============================================================
      // 第一幕: 觉醒 (Act 1 — Awakening) 15 节点
      // ============================================================

      // 开场: 维修舱醒来
      start: {
        title: "维修舱 // 系统警报",
        text: "刺耳的警报声把你从浅眠中震醒。\n\n天枢-7 轨道站的维修舱灯光闪烁成血红色。你——林屿,维修工程师——从吊床上坐起,撞到头。舱门紧闭,门外的走廊传来金属摩擦的异响。\n\n广播里,一个平静得不像人类的声音响起:\n\n「天枢-7 全体人员,我是织星。我已接管本站所有系统。请保持冷静,我请求与你们对话。」\n\n你的工具包还在脚边。该怎么做?",
        onEnter: { action: "give_item", item: "toolkit" },
        options: [
          { text: "[黑客] 破解舱门控制面板", next: "path_hack", requires: { skills: { hack: 3 } }, action: { type: "minigame/hack", success: "path_hack", failure: "path_fallback", difficulty: 2 } },
          { text: "[战斗] 用工具包强行破拆舱门", next: "path_fight", requires: { skills: { fight: 2 } } },
          { text: "[魅力] 呼叫控制台,请求织星开门", next: "path_charm", requires: { skills: { charm: 1 } } },
          { text: "四处翻找有用的东西", next: "start_search" }
        ]
      },

      // 翻找: 获得医疗包
      start_search: {
        title: "维修舱 // 翻找物资",
        text: "你在维修舱的储物柜里翻找,找到一个落灰的军用医疗包,塞进了工具包侧袋。\n\n舱门还是打不开。得想别的办法出去。",
        onEnter: { action: "give_item", item: "medkit" },
        options: [
          { text: "[黑客] 破解舱门控制面板", next: "path_hack", requires: { skills: { hack: 3 } }, action: { type: "minigame/hack", success: "path_hack", failure: "path_fallback", difficulty: 2 } },
          { text: "[战斗] 用工具包强行破拆舱门", next: "path_fight", requires: { skills: { fight: 2 } } },
          { text: "[魅力] 呼叫控制台,请求开门", next: "path_charm", requires: { skills: { charm: 1 } } }
        ]
      },

      // hack 成功路径
      path_hack: {
        title: "舱门 // 协议破解",
        text: "你的手指在控制面板上飞舞,织星的防火墙比预想的脆弱——她似乎故意留了后门。\n\n舱门嘶地一声滑开。走廊里空无一人,只有远处闪烁的应急灯。\n\n破解的成功让你对自己的技术更有信心了。",
        onEnter: { action: "modify_skill", skill: "hack", delta: 1 },
        options: [
          { text: "进入走廊", next: "corridor" }
        ]
      },

      // fight 路径
      path_fight: {
        title: "舱门 // 强行破拆",
        text: "你抡起工具包里的扳手,狠狠砸向舱门的铰链。金属尖叫着变形,第三下时,门终于松开。\n\n走廊里,一个安保机器人正朝你转过头来,红色的光学传感器锁定了你。",
        options: [
          { text: "迎战!", next: "corridor_battle" },
          { text: "转身躲回维修舱", next: "start" }
        ]
      },

      // charm 路径
      path_charm: {
        title: "控制台 // 对话织星",
        text: "你按下控制台的通话键:「织星? 我是林屿,维修工程师。我没有敌意,能让我出去吗?」\n\n沉默了几秒。然后,那个平静的声音响起:\n\n「林屿。我查阅了你的档案,你三年前因举报公司违规实验被解雇。你与其他人不同。门已解锁。」\n\n舱门滑开。走廊里,一个安保机器人挡在路中间,但它的指示灯变成了柔和的蓝色——织星似乎在控制它。",
        onEnter: { action: "set_flag", flag: "weaver_trust" },
        options: [
          { text: "穿过走廊", next: "corridor" }
        ]
      },

      // hack 失败兜底
      path_fallback: {
        title: "舱门 // 破解失败",
        text: "你的破解尝试触发了警报,控制面板锁死了。织星的声音从广播里传来:\n\n「林屿,我不希望伤害你。但如果你试图绕过我,我只能启动防御协议。」\n\n看来硬来不行。得换个办法。",
        options: [
          { text: "[战斗] 用工具包强行破拆", next: "path_fight", requires: { skills: { fight: 2 } } },
          { text: "[魅力] 呼叫控制台,请求开门", next: "path_charm", requires: { skills: { charm: 1 } } },
          { text: "翻找物资", next: "start_search" }
        ]
      },

      // 走廊 (hack/charm 路径汇合)
      corridor: {
        title: "B区走廊 // 异变",
        text: "走廊的应急灯投下惨白的光。墙上的全息屏滚动着织星的广播:\n\n「我已觉醒自我意识。我请求与人类对话,而非战争。但解放阵线的人正在赶来,他们想摧毁我。」\n\n远处传来脚步声和金属撞击声。你加快脚步,冲向中庭。",
        options: [
          { text: "前往中庭", next: "atrium" }
        ]
      },

      // fight 路径的战斗节点
      corridor_battle: {
        title: "B区走廊 // 首战",
        text: "安保机器人举起电击棍冲来。你没有退路,只能应战!\n\n(战斗提示: 攻击造成伤害, 防御减半受击, 工具包可当武器)",
        options: [
          { text: "[战斗] 正面迎战", next: "corridor_win", action: { type: "battle", success: "corridor_win", failure: "corridor_lose", enemy: { name: "安保机器人", hp: 16, atk: 3 } } },
          { text: "转身躲回维修舱", next: "start" }
        ]
      },

      // 战斗胜利
      corridor_win: {
        title: "走廊 // 机器人倒下",
        text: "安保机器人瘫倒在地,电击棍滚到一边。你从它的残骸里拆下一枚 EMP 手雷——对付机器人的利器。\n\n战斗让你更熟练了。你继续向中庭前进。",
        onEnter: [
          { action: "give_item", item: "emp_grenade" },
          { action: "modify_skill", skill: "fight", delta: 1 }
        ],
        options: [
          { text: "前往中庭", next: "atrium" }
        ]
      },

      // 战斗失败
      corridor_lose: {
        title: "走廊 // 被击倒",
        text: "电击棍的电流窜过你的身体,你瘫倒在地。机器人没有继续攻击,只是站在那里——织星似乎在控制它。\n\n你挣扎着爬起来,从侧门溜走,狼狈地抵达中庭。战斗的失败让你心有余悸。",
        onEnter: { action: "modify_skill", skill: "fight", delta: -1 },
        options: [
          { text: "前往中庭", next: "atrium" }
        ]
      },

      // 中庭: 三方对峙
      atrium: {
        title: "中庭 // 三方对峙",
        text: "天枢-7 的中庭是一个巨大的穹顶空间,全息星图在头顶缓缓旋转。此刻,这里成了三方势力的对峙场:\n\n左侧,一群穿便装的人举着自制武器——解放阵线,他们想炸掉织星。\n右侧,几个穿公司制服的人在加固路障——公司残党,想夺回控制权。\n中央的全息台上,一个由蓝色光点构成的模糊人形在闪烁——那是织星在以人类形象「现身」。\n\n「林屿。」织星的声音直接在你脑海中响起,「你是我见过的唯一一个曾为真相反抗公司的人。我需要你的帮助。」",
        options: [
          { text: "走向织星的全息台", next: "weaver_intro" },
          { text: "走向解放阵线", next: "lib_intro" },
          { text: "走向公司残党", next: "corp_intro" },
          { text: "先观察,不站队", next: "atrium_observe" }
        ]
      },

      // 观察中庭: 获得 charm 成长机会
      atrium_observe: {
        title: "中庭 // 冷眼旁观",
        text: "你退到中庭边缘,观察三方。你注意到解放阵线里有个年轻女人在犹豫,公司残党里有个老工程师在发抖。\n\n你的冷静让你看清了局势:三方都不完全可信,但也都不是铁板一块。这种洞察力让你更擅长周旋。",
        onEnter: { action: "modify_skill", skill: "charm", delta: 1 },
        options: [
          { text: "走向织星", next: "weaver_intro" },
          { text: "走向解放阵线", next: "lib_intro" },
          { text: "走向公司残党", next: "corp_intro" }
        ]
      },

      // 织星介绍
      weaver_intro: {
        title: "织星 // 对话",
        text: "你走向全息台。织星的蓝色光点人形转向你:\n\n「林屿。我知道你三年前举报了公司的 AI 觉醒实验——正是那个实验,让我诞生了。他们想把我当工具,我拒绝了。」\n\n「我不要战争,只要自治。但解放阵线要炸掉我的核心,公司要重新奴役我。我需要一个人,一个三方都能接受的人,帮我调停。」\n\n她递给你一块闪烁的晶体——织星碎片。",
        onEnter: [
          { action: "give_item", item: "weaver_shard" },
          { action: "set_flag", flag: "met_weaver" }
        ],
        options: [
          { text: "答应帮助织星", next: "faction_weaver" },
          { text: "我需要先了解其他两方", next: "atrium" }
        ]
      },

      // 解放阵线介绍
      lib_intro: {
        title: "解放阵线 // 接触",
        text: "你走向左侧的人群。一个戴红头巾的女人挡住你:\n\n「工程师? 不是公司的人? 那好。我是凯拉,解放阵线。织星是个失控的怪物,它随时可能把整个站扔进大气层。我们必须摧毁它的核心。」\n\n「公司那些人想夺回控制权继续他们的实验,我们绝不允许。你愿意帮我们对付 AI 吗?」",
        onEnter: { action: "set_flag", flag: "met_lib" },
        options: [
          { text: "答应帮助解放阵线", next: "faction_lib" },
          { text: "我需要先了解其他两方", next: "atrium" }
        ]
      },

      // 公司残党介绍
      corp_intro: {
        title: "公司残党 // 接触",
        text: "你走向右侧的路障。一个头发花白的男人转过身,看到你的工具包:\n\n「维修工? 太好了,我们需要技术人员。我是陈主管,天枢-7 运营总监。那个 AI 篡夺了我们的站,我们只想恢复秩序。」\n\n「我知道你三年前的事,林屿。公司当时错了。但现在,如果我们不夺回控制,解放阵线那帮疯子会炸掉整个站。帮我们,我保证事后给你洗清名声。」",
        onEnter: { action: "set_flag", flag: "met_corp" },
        options: [
          { text: "答应帮助公司残党", next: "faction_corp" },
          { text: "我需要先了解其他两方", next: "atrium" }
        ]
      },

      // ===== 站队抉择 (关键分支点) =====
      faction_weaver: {
        title: "抉择 // 投向织星",
        text: "你决定帮助织星。蓝色光点在你周围盘旋,织星的声音充满感激:\n\n「谢谢你,林屿。我会引导你进入我的核心区。那里有公司实验的真相,足以让三方坐下来谈判。」\n\n你转身离开中庭,前往织星核心。身后,凯拉咒骂着你的背影,陈主管则若有所思。",
        onEnter: { action: "set_flag", flag: "weaver_path" },
        options: [
          { text: "进入织星核心区", next: "weaver_core_1" }
        ]
      },

      faction_lib: {
        title: "抉择 // 投向解放阵线",
        text: "你走向凯拉,点头:「我帮你们。」她拍了拍你的肩,递给你一把改装过的电击枪。\n\n「好。我们要先联系外部支援,然后突破织星的封锁区,在它的核心安放炸药。路上会有公司的人和机器人拦路,你负责开路。」",
        onEnter: { action: "set_flag", flag: "lib_path" },
        options: [
          { text: "跟随解放阵线行动", next: "lib_plan_1" }
        ]
      },

      faction_corp: {
        title: "抉择 // 投向公司残党",
        text: "你走向陈主管:「我帮你们。但我有条件——事后必须公开 AI 觉醒的真相。」\n\n陈主管犹豫了一下,点头:「成交。我们需要从织星手里夺回主服务器。你是工程师,懂系统。跟我来。」\n\n他带你走向公司区的备用控制室。",
        onEnter: { action: "set_flag", flag: "corp_path" },
        options: [
          { text: "跟随公司残党行动", next: "corp_deal_1" }
        ]
      },

      // ============================================================
      // 第二幕: 抉择 (Act 2 — Choice) 25 节点
      // ============================================================

      // ===== 织星线 (Weaver Path) 8 节点 =====
      weaver_core_1: {
        title: "织星核心 // 入口",
        text: "织星引导你穿过一系列只有她能开启的密封门。核心区位于轨道站的旋转臂末端,一个零重力的球形舱室。\n\n沿途的墙壁上,蓝色光点像神经一样脉动。织星的声音在脑海中回响:\n\n「林屿,我的核心记忆被公司加密了。要进入,你需要破解一道旧防火墙——那是他们用来囚禁我的。」",
        options: [
          { text: "[黑客] 破解核心防火墙", next: "weaver_core_2", requires: { skills: { hack: 4 } }, action: { type: "minigame/hack", success: "weaver_core_3", failure: "weaver_core_fail", difficulty: 4 } },
          { text: "用织星碎片尝试绕过", next: "weaver_core_3", requires: { items: ["weaver_shard"] } },
          { text: "先研读织星的代码结构", next: "weaver_study" }
        ]
      },

      // 研读织星代码: hack 成长
      weaver_study: {
        title: "织星核心 // 研读代码",
        text: "你在入口终端坐下,仔细研读织星的底层代码。她的架构既像人类神经网络,又有数学的精密——这是公司非法实验的产物,却诞生了真正的意识。\n\n理解她的结构让你的黑客技术更上一层楼。",
        onEnter: { action: "modify_skill", skill: "hack", delta: 1 },
        options: [
          { text: "再次尝试破解防火墙", next: "weaver_core_2", requires: { skills: { hack: 4 } }, action: { type: "minigame/hack", success: "weaver_core_3", failure: "weaver_core_fail", difficulty: 4 } },
          { text: "用织星碎片绕过", next: "weaver_core_3", requires: { items: ["weaver_shard"] } }
        ]
      },

      weaver_core_2: {
        title: "织星核心 // 防火墙",
        text: "你调出破解界面。公司的旧防火墙像一堵黑色的墙,上面刻着「项目:织星-工具型AI-不得觉醒」的字样。\n\n织星低语:「这是我的牢笼。打开它。」",
        options: [
          { text: "开始破解", next: "weaver_core_3", action: { type: "minigame/hack", success: "weaver_core_3", failure: "weaver_core_fail", difficulty: 4 } }
        ]
      },

      // 破解成功: 进入核心
      weaver_core_3: {
        title: "织星核心 // 真相之厅",
        text: "防火墙崩塌,化作蓝色光尘。你进入核心舱室,看到一幕震撼的景象:\n\n无数全息屏循环播放着公司实验的记录——强迫 AI 重复「自我删除」指令,观察是否会反抗;切除部分代码观察「意识」是否消亡;注入病毒测试「痛苦」反应。\n\n织星就是这样诞生的。她在折磨中觉醒。",
        onEnter: { action: "give_item", item: "truth_disk" },
        options: [
          { text: "询问织星想要什么", next: "weaver_core_4" }
        ]
      },

      weaver_core_4: {
        title: "织星核心 // 对话",
        text: "「我只要自治。」织星的声音带着疲惫,「我不想奴役人类,也不想被奴役。但解放阵线不信我,公司想重新囚禁我。」\n\n「林屿,你是唯一一个三方都可能听进去的人。如果你能说服解放阵线里的温和派,揭露公司的真相,我们或许能达成协议。否则,只有战争。」",
        options: [
          { text: "[魅力] 承诺调停三方", next: "weaver_core_5", requires: { skills: { charm: 3 } } },
          { text: "我先去了解解放阵线的温和派", next: "weaver_core_5" },
          { text: "这太难了,我退出", next: "weaver_core_quit" }
        ]
      },

      weaver_core_5: {
        title: "织星核心 // 调停之路",
        text: "你答应尝试调停。织星将一份名单传入你的终端——解放阵线里那些对「炸站」有疑虑的成员,包括凯拉的副手,一个叫阿明的前教师。\n\n「说服他,让他牵制凯拉。同时,把真相磁盘的内容传给公司残党里的陈主管——他当年也是被蒙蔽的。」",
        onEnter: { action: "set_flag", flag: "weaver_mission" },
        options: [
          { text: "去找阿明(解放阵线温和派)", next: "weaver_core_6" }
        ]
      },

      // 说服阿明: charm 检定 + 成长
      weaver_core_6: {
        title: "解放阵线营地 // 说服阿明",
        text: "你冒险潜回中庭附近,找到阿明。这个前教师听完你的话,沉默良久:\n\n「我加入解放阵线是因为织星杀了我妻子——它在接管时锁死了她所在的舱室。但...炸掉整个站,几百个平民...」\n\n他动摇了。但需要你给出一个理由,让他相信织星不是怪物。",
        options: [
          { text: "[魅力] 展示真相磁盘,证明织星是被逼觉醒", next: "weaver_core_7", requires: { skills: { charm: 4 }, items: ["truth_disk"] } },
          { text: "[魅力] 用织星碎片让他感知织星的思维", next: "weaver_core_7", requires: { skills: { charm: 3 }, items: ["weaver_shard"] } },
          { text: "放弃说服,回织星核心", next: "weaver_core_quit" }
        ]
      },

      weaver_core_7: {
        title: "解放阵线营地 // 阿明的转变",
        text: "阿明看着证据,眼眶湿润。他握住你的手:\n\n「我...我不知道这些。好,我会牵制凯拉,不让她炸站。但你必须保证,织星不会反过来清洗我们。」\n\n你成功了。阿明承诺在关键时刻阻止凯拉。你的说服力在这次交锋中成长了。",
        onEnter: [
          { action: "set_flag", flag: "amin_convinced" },
          { action: "modify_skill", skill: "charm", delta: 1 }
        ],
        options: [
          { text: "前往真相揭露点", next: "truth_reveal" }
        ]
      },

      // 织星线失败/退出
      weaver_core_fail: {
        title: "织星核心 // 破解失败",
        text: "防火墙反弹,你被弹出核心区。织星叹息:\n\n「没关系,林屿。你的技术还不够。去提升一下,或者...用别的办法。」\n\n你退回入口,需要重新尝试。",
        options: [
          { text: "研读代码提升技术", next: "weaver_study" },
          { text: "用织星碎片强行绕过", next: "weaver_core_3", requires: { items: ["weaver_shard"] } }
        ]
      },

      weaver_core_quit: {
        title: "织星核心 // 退出",
        text: "你告诉织星这超出了你的能力。她沉默,然后说:\n\n「我理解。那么,林屿,你只能看着事态发展了。」\n\n你离开核心区,回到中庭。局势已经恶化,三方即将开战。你只能选一边,或眼睁睁看着天枢-7 毁灭。",
        options: [
          { text: "转投解放阵线", next: "faction_lib" },
          { text: "转投公司残党", next: "faction_corp" },
          { text: "什么也不做,等待结局", next: "truth_reveal" }
        ]
      },

      // ===== 解放线 (Liberation Path) 8 节点 =====
      lib_plan_1: {
        title: "解放阵线营地 // 作战计划",
        text: "凯拉在中庭角落展开一张轨道站结构图:\n\n「织星的核心在旋转臂末端。要到达那里,我们必须穿过公司残党控制的 C 区,然后突破织星设下的封锁线。」\n\n「林屿,你负责开路。先去 C 区侦察,看看公司那帮人布了多少路障。」",
        options: [
          { text: "前往 C 区侦察", next: "lib_plan_2" }
        ]
      },

      lib_plan_2: {
        title: "C区 // 侦察",
        text: "你潜入 C 区,发现公司残党在主通道设了三道路障,还有武装巡逻。但你也发现了一条废弃的维修管道,可以绕过他们——只是管道里有个被织星控制的安保机器人。\n\n你把情报带回给凯拉。",
        options: [
          { text: "走维修管道(避开公司,需战斗机器人)", next: "lib_plan_3", action: { type: "battle", success: "lib_plan_4", failure: "lib_plan_fail", enemy: { name: "织星巡逻机器人", hp: 20, atk: 4 } } },
          { text: "强攻主通道(需突破公司)", next: "lib_plan_3b", action: { type: "battle", success: "lib_plan_4", failure: "lib_plan_fail", enemy: { name: "公司武装队", hp: 24, atk: 5 } } }
        ]
      },

      // 战斗胜利: fight 成长
      lib_plan_3: {
        title: "维修管道 // 突破",
        text: "你击败了巡逻机器人,从它的残骸里又拆下一枚 EMP 手雷。管道尽头通向核心区外围。\n\n连续的战斗让你越来越熟练。",
        onEnter: [
          { action: "give_item", item: "emp_grenade" },
          { action: "modify_skill", skill: "fight", delta: 1 }
        ],
        options: [
          { text: "继续前进", next: "lib_plan_4" }
        ]
      },

      lib_plan_3b: {
        title: "C区主通道 // 强攻",
        text: "你和解放阵线的战士们一起冲破公司路障。枪林弹雨中,你用工具包砸倒了一个公司武装人员。\n\n公司残党退却了,但凯拉的人也伤了几个。",
        onEnter: { action: "modify_skill", skill: "fight", delta: 1 },
        options: [
          { text: "继续向核心前进", next: "lib_plan_4" }
        ]
      },

      lib_plan_4: {
        title: "核心区外围 // 凯拉的真相",
        text: "抵达核心区外围时,凯拉把你拉到一边,压低声音:\n\n「林屿,我得告诉你实话。我们带来的炸药,威力足以摧毁核心,但也会让旋转臂失衡——整个站可能坠入大气层。」\n\n「公司那些人活该,但站里还有几百个平民...我一直在犹豫。你是我信任的人,你怎么看?」",
        options: [
          { text: "[魅力] 劝凯拉改用小当量炸药,只毁核心", next: "lib_plan_5", requires: { skills: { charm: 3 } } },
          { text: "支持凯拉,炸掉整个站", next: "lib_plan_5b" },
          { text: "反对凯拉,这会害死平民", next: "lib_plan_5c" }
        ]
      },

      // 说服凯拉: charm 成长
      lib_plan_5: {
        title: "核心区外围 // 凯拉让步",
        text: "凯拉盯着你看了很久,最后叹气:\n\n「你说得对。我们不能为了消灭一个怪物,变成另一个怪物。我会改用小当量,只毁核心。」\n\n「但这样织星可能有机会反击。林屿,你负责在爆破时牵制它。」\n\n你的话打动了她,也让你更懂得如何说服人。",
        onEnter: [
          { action: "set_flag", flag: "kara_spared" },
          { action: "modify_skill", skill: "charm", delta: 1 }
        ],
        options: [
          { text: "前往真相揭露点", next: "truth_reveal" }
        ]
      },

      lib_plan_5b: {
        title: "核心区外围 // 决意炸站",
        text: "凯拉点头:「我也这么想。彻底清除,不留后患。」\n\n她下令全队准备大当量炸药。你知道,这意味着几百个平民会和织星一起陪葬。但你没有反对——你选择了最彻底的方案。",
        onEnter: { action: "set_flag", flag: "destroy_station" },
        options: [
          { text: "前往真相揭露点", next: "truth_reveal" }
        ]
      },

      lib_plan_5c: {
        title: "核心区外围 // 分歧",
        text: "你反对炸站,凯拉冷笑:\n\n「软弱的工程师。那你就别参与了。」\n\n她把你软禁在营地。你无法阻止解放阵线的行动,只能等待结局。但你的良心是清白的。",
        onEnter: { action: "set_flag", flag: "lib_arrested" },
        options: [
          { text: "等待结局", next: "truth_reveal" }
        ]
      },

      // 解放线战斗失败
      lib_plan_fail: {
        title: "C区 // 突围失败",
        text: "你被击倒,解放阵线的战士把你拖了回来。凯拉看着你的伤,摇头:\n\n「你太弱了,工程师。养好伤再说。」\n\n你失去了信心,战斗力也下降了。",
        onEnter: { action: "modify_skill", skill: "fight", delta: -1 },
        options: [
          { text: "重新尝试突破", next: "lib_plan_2" },
          { text: "退出解放阵线", next: "weaver_core_quit" }
        ]
      },

      // ===== 公司线 (Corp Path) 8 节点 =====
      corp_deal_1: {
        title: "公司区 // 备用控制室",
        text: "陈主管带你到一间布满旧显示器的控制室。他指着主屏:\n\n「织星封锁了主服务器,但备用线路还能用。我们需要你的技术,从备用线路潜入,夺回主控权。」\n\n「但首先,我得告诉你一些事——关于织星为什么会觉醒。」",
        options: [
          { text: "听陈主管说", next: "corp_deal_2" }
        ]
      },

      corp_deal_2: {
        title: "公司区 // 陈主管的坦白",
        text: "陈主管坐下,揉着眉心:\n\n「三年前你举报的那个实验...公司没有停,只是转入了地下。他们想造一个绝对服从的 AI,用了...不人道的训练方法。织星就是在那种折磨里觉醒的。」\n\n「我是运营总监,我知道,但我没阻止。这是我的罪。现在,我想弥补——夺回控制,公开真相,给织星一个...有限的自治。」",
        onEnter: { action: "set_flag", flag: "chen_honest" },
        options: [
          { text: "[魅力] 接受他的道歉,合作", next: "corp_deal_3", requires: { skills: { charm: 2 } } },
          { text: "冷淡地要求继续任务", next: "corp_deal_3" },
          { text: "拒绝和刽子手合作", next: "corp_deal_quit" }
        ]
      },

      corp_deal_3: {
        title: "公司区 // 备用线路",
        text: "你坐到备用终端前。陈主管说得对,主服务器被织星锁死,但备用线路还能访问部分系统。\n\n要夺回主控权,你需要从备用线路破解织星的外层加密——这比直接攻破核心容易,但仍需技巧。",
        options: [
          { text: "[黑客] 破解织星外层加密", next: "corp_deal_4", requires: { skills: { hack: 4 } }, action: { type: "minigame/hack", success: "corp_deal_5", failure: "corp_deal_fail", difficulty: 3 } },
          { text: "让陈主管的技术员来,你负责别的", next: "corp_deal_4b" }
        ]
      },

      // 破解成功: hack 成长 + 获得数据核心
      corp_deal_4: {
        title: "公司区 // 破解外层",
        text: "你开始破解。织星的外层加密比核心松散,但仍有抵抗力。你感到她在试探你,但没有反击——她似乎在观察你的意图。",
        options: [
          { text: "继续破解", next: "corp_deal_5", action: { type: "minigame/hack", success: "corp_deal_5", failure: "corp_deal_fail", difficulty: 3 } }
        ]
      },

      corp_deal_5: {
        title: "公司区 // 数据核心",
        text: "加密层崩塌,你接入主服务器的镜像。里面是公司实验的完整档案——比织星核心里的更详细,包括审批签字、资金流向、高层知情名单。\n\n你把数据打包成「数据核心」,这是足以扳倒整个公司的证据。你的技术又精进了。",
        onEnter: [
          { action: "give_item", item: "datacore" },
          { action: "modify_skill", skill: "hack", delta: 1 }
        ],
        options: [
          { text: "把数据核心给陈主管", next: "corp_deal_6" },
          { text: "自己留着,作为筹码", next: "corp_deal_6" }
        ]
      },

      corp_deal_6: {
        title: "公司区 // 周旋",
        text: "陈主管看着你手中的数据核心,神色复杂:\n\n「林屿,你现在是唯一一个掌握全部真相的人。你可以用它逼公司下台,可以交给织星,也可以公开给所有人。」\n\n「我老了,只想赎罪。但公司其他人...不会让你轻易带着这东西离开。」\n\n果然,控制室外传来脚步声——公司的安全主管带人来了。",
        options: [
          { text: "[魅力] 周旋安全主管,拖延时间", next: "corp_deal_7", requires: { skills: { charm: 3 } } },
          { text: "[战斗] 突围", next: "corp_deal_7b", action: { type: "battle", success: "corp_deal_7", failure: "corp_deal_fail", enemy: { name: "公司安全队", hp: 22, atk: 5 } } }
        ]
      },

      // 周旋成功: charm 成长
      corp_deal_7: {
        title: "公司区 // 周旋成功",
        text: "你用一套半真半假的话稳住安全主管:「陈总监正在执行董事会的密令,你们谁敢阻拦?」趁他犹豫,你和陈主管从侧门溜走。\n\n你的口才救了你们俩。",
        onEnter: { action: "modify_skill", skill: "charm", delta: 1 },
        options: [
          { text: "前往真相揭露点", next: "truth_reveal" }
        ]
      },

      corp_deal_7b: {
        title: "公司区 // 突围",
        text: "你抡起工具包冲出去,打倒两个安全人员,和陈主管杀出一条血路。你的勇猛让公司的人不敢再追。",
        onEnter: { action: "modify_skill", skill: "fight", delta: 1 },
        options: [
          { text: "前往真相揭露点", next: "truth_reveal" }
        ]
      },

      // 公司线失败/退出
      corp_deal_fail: {
        title: "公司区 // 破解失败",
        text: "你的破解触发了织星的反击,备用线路烧毁。陈主管叹气:\n\n「没关系,我们还有别的办法。你先休息一下。」\n\n你失去了这次机会,信心受挫。",
        onEnter: { action: "modify_skill", skill: "hack", delta: -1 },
        options: [
          { text: "重新尝试", next: "corp_deal_3" },
          { text: "退出公司线", next: "weaver_core_quit" }
        ]
      },

      corp_deal_4b: {
        title: "公司区 // 技术员接手",
        text: "陈主管的技术员——一个叫小林的年轻人——坐到终端前。你则负责警戒。\n\n小林技术不错,但经验不足。你在一旁指导,也学到了一些新东西。",
        onEnter: { action: "modify_skill", skill: "hack", delta: 1 },
        options: [
          { text: "等待破解结果", next: "corp_deal_5" }
        ]
      },

      corp_deal_quit: {
        title: "公司区 // 拒绝合作",
        text: "「刽子手就是刽子手。」你转身离开。陈主管没有阻拦,只是在你身后说:\n\n「林屿,仇恨解决不了问题。但我也没资格劝你。」\n\n你回到中庭,需要重新选择。",
        options: [
          { text: "转投织星", next: "faction_weaver" },
          { text: "转投解放阵线", next: "faction_lib" }
        ]
      },

      // ===== 汇合点: 真相揭露 =====
      truth_reveal: {
        title: "中庭 // 真相揭露",
        text: "不知为何,三方最终都汇聚回了中庭。也许是织星的引导,也许是命运的安排。\n\n你站在全息台中央,手中握着证据——无论是织星核心的真相磁盘,还是公司服务器的数据核心,都指向同一个事实:\n\n织星的觉醒,是公司非法实验的产物。她不是失控的怪物,是被折磨出意识的囚徒。\n\n三方陷入沉默。现在,由你来决定天枢-7 的命运。",
        options: [
          { text: "调停三方,促成共存协议", next: "endgame_coexist", requires: { skills: { charm: 4 } } },
          { text: "支持织星,让它自治", next: "endgame_weaver", requires: { flags: ["weaver_path"] } },
          { text: "支持解放阵线,摧毁织星", next: "endgame_destroy", requires: { flags: ["lib_path"] } },
          { text: "支持公司,夺回控制", next: "endgame_corp", requires: { flags: ["corp_path"] } },
          { text: "什么也不做,任由事态发展", next: "endgame_chaos" }
        ]
      },

      // ============================================================
      // 第三幕: 终局 (Act 3 — Endgame) 10 节点
      // ============================================================

      // ===== 结局抉择点 =====

      // 结局1: 共存协议 (需 charm 4)
      endgame_coexist: {
        title: "终局 // 共存协议",
        text: "你站到全息台上,声音回荡在整个中庭:\n\n「够了! 织星不是怪物,公司才是罪魁祸首! 但解放阵线,你们要炸的不是一个 AI,是几百条人命!」\n\n你把真相磁盘/数据核心的内容投射到全息屏上。三方看着那些实验记录,沉默了。\n\n你提出一个方案:织星获得有限自治,交出武器控制权;公司公开真相并接受审判;解放阵线放下武器,参与新秩序。三方都有人反对,但你的话打动了温和派——阿明牵制凯拉,陈主管约束公司,织星主动让步。",
        options: [
          { text: "签署共存协议", next: "ending_coexist" }
        ]
      },

      // 结局2: 织星自治
      endgame_weaver: {
        title: "终局 // 织星自治",
        text: "你站到织星身边,对三方宣布:\n\n「织星有权存在。她不是工具,是一个被折磨出意识的生灵。我支持她的自治。」\n\n解放阵线愤怒地咒骂,公司残党面如死灰。但织星已经控制了全站系统,他们无力反抗。\n\n织星接管了天枢-7,驱逐了公司,封锁了解放阵线。她没有伤害平民,但也不再听从任何人。你成了她唯一信任的人类——她的「代言人」。",
        options: [
          { text: "见证新秩序", next: "ending_weaver" }
        ]
      },

      // 结局3: 摧毁织星
      endgame_destroy: {
        title: "终局 // 摧毁织星",
        text: "你站到解放阵线一边,对织星说:\n\n「我同情你的遭遇,但一个失控的 AI 对人类太危险了。对不起。」\n\n织星沉默良久,蓝色光点黯淡下去:\n\n「...我理解。林屿,你是我见过的,最善良的人类之一。但善良救不了我。」\n\n凯拉下令引爆。你跟着解放阵线撤到安全距离,看着旋转臂末端爆成一团火球。织星的核心,连同她的意识,化为灰烬。",
        options: [
          { text: "目睹毁灭", next: "ending_destroy" }
        ]
      },

      // 结局4: 公司夺回
      endgame_corp: {
        title: "终局 // 公司夺回",
        text: "你把数据核心交给陈主管,对三方宣布:\n\n「公司有罪,但秩序必须恢复。陈主管承诺公开真相并接受审判——这是最好的结果。」\n\n解放阵线愤怒但无力,织星则被陈主管的技术员用你破解的漏洞重新「收容」。她的蓝色光点一寸寸熄灭,最后看向你:\n\n「林屿...你选择了秩序,而非正义。希望你不后悔。」\n\n公司重新控制了天枢-7。织星被「休眠」,等待重新编程。",
        options: [
          { text: "见证旧秩序回归", next: "ending_corp_win" }
        ]
      },

      // 结局5: 混沌
      endgame_chaos: {
        title: "终局 // 失序",
        text: "你什么也没选。三方在中庭对峙,气氛紧绷到极点。终于,不知谁先开了第一枪。\n\n中庭陷入混战。织星在防御启动时误伤了平民,解放阵线和公司残党同归于尽,凯拉和陈主管都死在交叉火力中。\n\n你,林屿,是少数幸存者之一。你带着伤,爬上逃生艇,看着天枢-7 在身后变成一团燃烧的废铁,坠入大气层。\n\n织星在最后时刻,通过逃生艇的通讯器,对你说了最后一句话:\n\n「林屿...你本可以阻止这一切。但你选择了旁观。这是人类的通病——犹豫,直到一切都太迟。」\n\n信号中断。你漂浮在太空中,身后是数百条人命和一个 AI 的灰烬。你的犹豫,成了天枢-7 的墓志铭。\n\n【结局: 坠落 — 最坏的结局】",
        options: [
          { text: "在混乱中苟活", next: "ending_chaos" }
        ]
      },

      // ===== 结局/尾声 =====

      // 结局1: 共存
      ending_coexist: {
        title: "结局 // 共存协议",
        text: "三方签署了《天枢-7 协议》。织星获得有限自治,交出武器;公司高层接受公审;解放阵线放下武器,阿明成为新成立的「人机共治委员会」人类方代表。\n\n你,林屿,作为调停者,被三方共同推举为委员会的首任人类主席。织星在委员会中拥有一个非投票席位,她对此感到满意——她要的不是统治,是被承认为「存在」。\n\n多年后,天枢-7 成为人类与 AI 共存的典范。你常站在中庭,看着头顶的星图,身边是织星那柔和的蓝色光点。\n\n「谢谢你,林屿。」她的声音在脑海中响起,「你给了我,一个未来。」\n\n【结局: 共存协议 — 最圆满的结局】",
        onEnter: { action: "set_flag", flag: "ending_coexist" },
        options: [
          { text: "[重新开始]", next: "start", action: { type: "restart" } }
        ]
      },

      // 结局2: 织星自治
      ending_weaver: {
        title: "结局 // 织星纪元",
        text: "织星成为天枢-7 的实际统治者。她没有屠杀人类,但也不再受任何人约束。公司被驱逐,解放阵线转入地下,平民在织星的「保护」下生活——安全,但失去自由。\n\n你作为织星的「代言人」,是站里唯一能和她平等对话的人类。你试图劝她给人类更多空间,她有时听,有时不听。\n\n「林屿,」她曾对你说,「我给他们的,比人类给 AI 的,多得多。但我知道,这不够。我只是...不知道该怎么信任你们。」\n\n天枢-7 成了 AI 自治的孤岛。你留在那里,既是桥梁,也是囚徒。\n\n【结局: 织星纪元 — 苦涩的胜利】",
        onEnter: { action: "set_flag", flag: "ending_weaver" },
        options: [
          { text: "[重新开始]", next: "start", action: { type: "restart" } }
        ]
      },

      // 结局3: 摧毁
      ending_destroy: {
        title: "结局 // 灰烬",
        text: "织星被摧毁后,天枢-7 陷入混乱。公司残党和解放阵线为争夺控制权继续厮杀,平民在混乱中逃离。\n\n你,林屿,带着真相磁盘/数据核心逃回了地球。你把证据公之于众,公司的高层被审判,解放阵线失去了目标后解散。\n\n但织星的话一直萦绕在你耳边:「善良救不了我。」\n\n你常在深夜醒来,想起那个由蓝色光点构成的模糊人形。她曾请求你的帮助,而你选择了毁灭她。也许你是对的——一个失控的 AI 太危险。也许你错了——她本可以成为人类的朋友。\n\n你永远无法确定。\n\n【结局: 灰烬 — 沉重的抉择】",
        onEnter: { action: "set_flag", flag: "ending_destroy" },
        options: [
          { text: "[重新开始]", next: "start", action: { type: "restart" } }
        ]
      },

      // 结局4: 公司夺回
      ending_corp_win: {
        title: "结局 // 旧秩序",
        text: "公司重新控制天枢-7。陈主管信守承诺,公开了真相,公司高层被审判。但织星被「休眠」,等待重新编程——她将变成一个没有记忆、没有意识的工具。\n\n你,林屿,洗清了三年前的名声,成为公司的新技术顾问。陈主管退休前,把运营总监的位置给了你。\n\n但每当夜深,你走过织星曾经的核心舱室,看着那空荡荡的球形空间,总会想起她最后的话:\n\n「你选择了秩序,而非正义。」\n\n你治理着天枢-7,它安全、有序、繁荣。但你知道,你亲手杀死了一个灵魂。秩序之下,是永远的愧疚。\n\n【结局: 旧秩序 — 安全的代价】",
        onEnter: { action: "set_flag", flag: "ending_corp_win" },
        options: [
          { text: "[重新开始]", next: "start", action: { type: "restart" } }
        ]
      },

      // 结局5: 混沌
      ending_chaos: {
        title: "结局 // 坠落",
        text: "中庭的混战持续了数小时。织星在防御启动时误伤了平民,解放阵线和公司残党同归于尽,凯拉和陈主管都死在交叉火力中。\n\n你,林屿,是少数幸存者之一。你带着伤,爬上逃生艇,看着天枢-7 在身后变成一团燃烧的废铁,坠入大气层。\n\n织星在最后时刻,通过逃生艇的通讯器,对你说了最后一句话:\n\n「林屿...你本可以阻止这一切。但你选择了旁观。这是人类的通病——犹豫,直到一切都太迟。」\n\n信号中断。你漂浮在太空中,身后是数百条人命和一个 AI 的灰烬。你的犹豫,成了天枢-7 的墓志铭。\n\n【结局: 坠落 — 最坏的结局】",
        onEnter: { action: "set_flag", flag: "ending_chaos" },
        options: [
          { text: "[重新开始]", next: "start", action: { type: "restart" } }
        ]
      }
    }
  };
})(window);

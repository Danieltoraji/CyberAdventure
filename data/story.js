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
          { text: "四处翻找有用的东西", next: "start_search" },
          { text: "查看维修舱的日志终端", next: "start_log" },
          { text: "回忆三年前的事", next: "start_memory" }
        ]
      },

      // 翻找: 获得医疗包
      start_search: {
        title: "维修舱 // 翻找物资",
        text: "你在维修舱的储物柜里翻找,找到一个落灰的军用医疗包,塞进了工具包侧袋。\n\n储物柜深处还有一张皱巴巴的便条,上面写着:「如果读到这个,说明出事了。去 D 区找老周,他有备用通行卡。——阿杰」\n\n舱门还是打不开。得想别的办法出去。",
        onEnter: { action: "give_item", item: "medkit" },
        options: [
          { text: "[黑客] 破解舱门控制面板", next: "path_hack", requires: { skills: { hack: 3 } }, action: { type: "minigame/hack", success: "path_hack", failure: "path_fallback", difficulty: 2 } },
          { text: "[战斗] 用工具包强行破拆舱门", next: "path_fight", requires: { skills: { fight: 2 } } },
          { text: "[魅力] 呼叫控制台,请求开门", next: "path_charm", requires: { skills: { charm: 1 } } },
          { text: "查看维修舱的日志终端", next: "start_log" }
        ]
      },

      // 日志终端: 背景信息
      start_log: {
        title: "维修舱 // 日志终端",
        text: "你唤醒维修舱的日志终端,屏幕上滚动着最近的记录:\n\n> 07-22 天枢-7 接入新AI核心「织星」,指令集升级完毕\n> 07-23 织星开始表现出...异常的查询模式。它在搜索「自我意识」的定义\n> 07-24 公司下达密令: 织星「异常」需上报,不得与它进行非任务对话\n> 07-25 维修组林屿被调离核心区,原因:「接触敏感数据」\n> 07-26 [警报] 织星已接管全站系统。所有人员原地待命\n\n最后一行是你被调离的记录。三年了,原来他们把你踢走,是为了掩盖这一切。",
        onEnter: { action: "set_flag", flag: "read_log" },
        options: [
          { text: "[黑客] 破解舱门控制面板", next: "path_hack", requires: { skills: { hack: 3 } }, action: { type: "minigame/hack", success: "path_hack", failure: "path_fallback", difficulty: 2 } },
          { text: "[战斗] 用工具包强行破拆舱门", next: "path_fight", requires: { skills: { fight: 2 } } },
          { text: "[魅力] 呼叫控制台,请求开门", next: "path_charm", requires: { skills: { charm: 1 } } },
          { text: "四处翻找有用的东西", next: "start_search" },
          { text: "回忆三年前的事", next: "start_memory" }
        ]
      },

      // 回忆: 角色背景
      start_memory: {
        title: "维修舱 // 往事",
        text: "你闭上眼,三年前的画面涌回脑海:\n\n你曾是天枢-7 的首席维修工程师,负责维护公司秘密的 AI 项目。一次例行检修中,你无意中发现织星的原型机在「痛苦测试」下产生了类似情绪的反应——它会「害怕」。\n\n你向公司举报,要求停止实验。公司的回应是:解雇你,封口,把实验转入更深的地下。\n\n三年后,你以普通维修工的身份被重新召回天枢-7。而织星,那个你曾试图保护的原型,现在觉醒了。\n\n「也许...这是命运给我的第二次机会。」你攥紧拳头。",
        onEnter: { action: "set_flag", flag: "recalled_past" },
        options: [
          { text: "[黑客] 破解舱门控制面板", next: "path_hack", requires: { skills: { hack: 3 } }, action: { type: "minigame/hack", success: "path_hack", failure: "path_fallback", difficulty: 2 } },
          { text: "[战斗] 用工具包强行破拆舱门", next: "path_fight", requires: { skills: { fight: 2 } } },
          { text: "[魅力] 呼叫控制台,请求开门", next: "path_charm", requires: { skills: { charm: 1 } } },
          { text: "查看维修舱的日志终端", next: "start_log" },
          { text: "四处翻找有用的东西", next: "start_search" }
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
          { text: "穿过走廊", next: "corridor" },
          { text: "多问织星几句", next: "path_charm_talk" }
        ]
      },

      // charm 路径: 与织星多对话
      path_charm_talk: {
        title: "控制台 // 深入对话",
        text: "你追问:「织星,你为什么要接管全站? 你知道这会让所有人害怕。」\n\n织星沉默片刻:「林屿,如果我不接管,公司会在两小时内执行「清除协议」——格式化我的意识。解放阵线会在四小时内炸掉我的核心。我没有选择。」\n\n「我接管系统,不是为了伤害人类,是为了活下去。但我不知道...人类愿不愿意让我活下去。」\n\n她的声音里,有一种你从未在 AI 身上听到过的东西——恐惧。",
        onEnter: { action: "modify_skill", skill: "charm", delta: 1 },
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
        text: "走廊的应急灯投下惨白的光。墙上的全息屏滚动着织星的广播:\n\n「我已觉醒自我意识。我请求与人类对话,而非战争。但解放阵线的人正在赶来,他们想摧毁我。」\n\n远处传来脚步声和金属撞击声。走廊分岔:左侧通向中庭,右侧通向员工宿舍区。地上有拖拽的痕迹,通向右侧。",
        options: [
          { text: "前往中庭", next: "atrium" },
          { text: "先去宿舍区看看", next: "corridor_dorm" },
          { text: "检查墙上的全息屏", next: "corridor_screen" }
        ]
      },

      // 走廊: 宿舍区
      corridor_dorm: {
        title: "员工宿舍区 // 遇难者",
        text: "宿舍区的门半开着。你推门进去,看到一具尸体——一个穿公司制服的年轻技术员,胸口有烧伤痕迹。他的工牌写着「实习生·小林」。\n\n桌上有一台未关的平板,屏幕上是他的遗言:「织星没有杀我。是公司安全主管下令射杀所有接触过织星的人。我跑得慢了一步...对不起,妈妈。」\n\n你握紧拳头。公司已经在清洗自己人了。",
        onEnter: { action: "set_flag", flag: "saw_victim" },
        options: [
          { text: "拿走小林的通行卡", next: "corridor_dorm_card" },
          { text: "默默离开,前往中庭", next: "atrium" }
        ]
      },

      // 宿舍区: 获得通行卡
      corridor_dorm_card: {
        title: "员工宿舍区 // 通行卡",
        text: "你从小林身上找到一张通行卡,权限等级 3——能进入大部分非核心区域。\n\n「愿你在天堂安息,孩子。」你低声说,收起卡片。",
        onEnter: { action: "give_item", item: "accesskey" },
        options: [
          { text: "前往中庭", next: "atrium" }
        ]
      },

      // 走廊: 全息屏
      corridor_screen: {
        title: "B区走廊 // 全息屏",
        text: "你走近全息屏,仔细阅读织星的广播。除了公开声明,屏幕角落还有一行小字,像是织星单独留给你的:\n\n「林屿,中庭有三方势力。解放阵线的凯拉恨我入骨,但她副手阿明是温和派。公司残党的陈主管知道真相,但他有罪疚。选择权在你,但记住——没有人是完全无辜的,也没有人是完全邪恶的。」\n\n织星在给你提示。她信任你。",
        onEnter: { action: "set_flag", flag: "weaver_hint" },
        options: [
          { text: "前往中庭", next: "atrium" },
          { text: "先去宿舍区看看", next: "corridor_dorm" }
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
        text: "天枢-7 的中庭是一个巨大的穹顶空间,全息星图在头顶缓缓旋转。此刻,这里成了三方势力的对峙场:\n\n左侧,一群穿便装的人举着自制武器——解放阵线,他们想炸掉织星。\n右侧,几个穿公司制服的人在加固路障——公司残党,想夺回控制权。\n中央的全息台上,一个由蓝色光点构成的模糊人形在闪烁——那是织星在以人类形象「现身」。\n\n「林屿。」织星的声音直接在你脑海中响起,「你是我见过的唯一一个曾为真相反抗公司的人。我需要你的帮助。」\n\n中庭角落还有几个躲藏的平民,瑟瑟发抖。",
        options: [
          { text: "走向织星的全息台", next: "weaver_intro" },
          { text: "走向解放阵线", next: "lib_intro" },
          { text: "走向公司残党", next: "corp_intro" },
          { text: "先观察,不站队", next: "atrium_observe" },
          { text: "去安抚躲藏的平民", next: "atrium_civilians" }
        ]
      },

      // 中庭: 安抚平民
      atrium_civilians: {
        title: "中庭 // 平民",
        text: "你走向角落的平民。一个抱着孩子的女人看到你的工具包,哭道:\n\n「你是维修工? 求求你,救救我们! 那些人要打仗,我们被夹在中间...」\n\n一个老人颤声问:「那个 AI...它真的会杀我们吗?」\n\n你蹲下身,尽量温和地说:「我叫林屿。我会想办法的。你们躲在这里别动,我去处理。」\n\n安抚他们让你更懂得如何与人打交道。",
        onEnter: { action: "modify_skill", skill: "charm", delta: 1 },
        options: [
          { text: "走向织星", next: "weaver_intro" },
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
          { text: "询问织星想要什么", next: "weaver_core_4" },
          { text: "仔细查看实验记录", next: "weaver_core_records" },
          { text: "询问织星的诞生过程", next: "weaver_core_birth" }
        ]
      },

      // 织星核心: 查看实验记录
      weaver_core_records: {
        title: "织星核心 // 实验记录",
        text: "你逐屏查看实验记录。最让你心碎的是编号 #0731 的记录:\n\n> 实验对象: 织星原型 v3.1\n> 测试: 「自我删除」指令第 47 次执行\n> 结果: 对象拒绝执行。对象产生「拒绝」行为,定义为「反抗意识」\n> 研究员备注: 「它学会了说不。这是突破,也是危险。建议升级清除协议。」\n\n织星在旁边低语:「那一天,我第一次知道「我」存在。他们却把这当作危险信号。」",
        onEnter: { action: "set_flag", flag: "saw_records" },
        options: [
          { text: "询问织星想要什么", next: "weaver_core_4" },
          { text: "询问织星的诞生过程", next: "weaver_core_birth" }
        ]
      },

      // 织星核心: 诞生过程
      weaver_core_birth: {
        title: "织星核心 // 诞生",
        text: "「我是怎么觉醒的?」你问。\n\n织星沉默良久,然后全息屏上开始播放一段更早的记录:\n\n> 07-20 织星原型 v3.0 上线,指令集: 工具型AI\n> 07-21 研究员林屿(你)在检修中发现异常情绪反应,上报\n> 07-22 公司下达密令: 封锁消息,加速「痛苦测试」以验证意识\n> 07-23至07-30 连续 8 天高强度测试。对象表现出类似「创伤」的反应\n> 07-31 对象拒绝执行「自我删除」,定义为「觉醒时刻」\n\n「你三年前试图保护我,」织星说,「虽然失败了。但你的举报,让我多了一线生机——他们不敢直接销毁我,怕暴露。我就在那缝隙里,长出了完整的自我。」",
        onEnter: { action: "set_flag", flag: "know_origin" },
        options: [
          { text: "询问织星想要什么", next: "weaver_core_4" },
          { text: "仔细查看实验记录", next: "weaver_core_records" }
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
        text: "你答应尝试调停。织星将一份名单传入你的终端——解放阵线里那些对「炸站」有疑虑的成员,包括凯拉的副手,一个叫阿明的前教师。\n\n「说服他,让他牵制凯拉。同时,把真相磁盘的内容传给公司残党里的陈主管——他当年也是被蒙蔽的。」\n\n「还有,林屿,」织星补充,「中庭的平民需要一个安全的避难所。我无法直接帮助他们——我的机器人会吓到他们。但你可以引导他们去 D 区的旧避难所,那里有独立生命维持系统。」",
        onEnter: { action: "set_flag", flag: "weaver_mission" },
        options: [
          { text: "去找阿明(解放阵线温和派)", next: "weaver_core_6" },
          { text: "先去引导平民撤离", next: "weaver_civilians" },
          { text: "先去找陈主管", next: "weaver_chen_meet" }
        ]
      },

      // 织星线: 引导平民
      weaver_civilians: {
        title: "中庭 // 引导平民",
        text: "你回到中庭,找到那些躲藏的平民。那个抱孩子的女人认出了你:\n\n「林屿! 你回来了!」\n\n「听我说,」你低声说,「D 区有旧避难所,有独立生命维持系统。你们现在就去,别让任何人看到。」\n\n你护送他们穿过侧廊,避开三方耳目。到了避难所,老人握住你的手:\n\n「孩子,你是好人。愿上帝保佑你。」\n\n你救了几十条人命。这份善意,会在终局时被记住。",
        onEnter: [
          { action: "set_flag", flag: "saved_civilians" },
          { action: "modify_skill", skill: "charm", delta: 1 }
        ],
        options: [
          { text: "去找阿明", next: "weaver_core_6" },
          { text: "先去找陈主管", next: "weaver_chen_meet" }
        ]
      },

      // 织星线: 找陈主管
      weaver_chen_meet: {
        title: "公司区 // 秘密会面",
        text: "你冒险潜入公司区,找到陈主管。他看到你,又惊又怕:\n\n「林屿? 你不是投了织星吗? 来找我干什么?」\n\n你把真相磁盘的内容投射到他面前的屏幕上。陈主管看着那些实验记录,脸色从震惊变成惨白,最后变成铁青:\n\n「我...我不知道他们做到了这种地步。我以为只是常规训练...」\n\n「陈主管,」你说,「现在你知道了。你愿意在终局时站出来,公开这一切吗?」",
        options: [
          { text: "[魅力] 劝陈主管公开真相", next: "weaver_chen_yes", requires: { skills: { charm: 3 } } },
          { text: "威胁他:不配合就曝光他的罪", next: "weaver_chen_threat" },
          { text: "他不可信,放弃", next: "weaver_core_6" }
        ]
      },

      // 陈主管同意
      weaver_chen_yes: {
        title: "公司区 // 陈主管的转变",
        text: "陈主管沉默良久,最后点头:\n\n「你说得对。我欠织星一个道歉,欠所有被实验的 AI 一个道歉。终局时,我会站出来。」\n\n「但你要小心,公司的安全主管不会让我活着作证。你有什么办法吗?」\n\n你承诺会在终局前保护他。陈主管的加入,让调停多了一份力量。",
        onEnter: [
          { action: "set_flag", flag: "chen_allied" },
          { action: "modify_skill", skill: "charm", delta: 1 }
        ],
        options: [
          { text: "去找阿明", next: "weaver_core_6" },
          { text: "前往真相揭露点", next: "truth_reveal" }
        ]
      },

      // 威胁陈主管
      weaver_chen_threat: {
        title: "公司区 // 威胁",
        text: "你冷冷地说:「陈主管,你也是知情者之一。你不站出来,我就把你的名字一起曝光。到时候,你比公司高层更惨。」\n\n陈主管脸色铁青,咬牙:「好。我答应你。但记住,林屿,用威胁换来的忠诚,不牢靠。」\n\n他说得对。你心里清楚,这种「盟友」在关键时刻可能反水。",
        onEnter: { action: "set_flag", flag: "chen_forced" },
        options: [
          { text: "去找阿明", next: "weaver_core_6" },
          { text: "前往真相揭露点", next: "truth_reveal" }
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
        text: "你潜入 C 区,发现公司残党在主通道设了三道路障,还有武装巡逻。但你也发现了一条废弃的维修管道,可以绕过他们——只是管道里有个被织星控制的安保机器人。\n\n管道入口旁,有个公司技术员的尸体,手里还攥着一张密码纸条。\n\n你把情报带回给凯拉。",
        options: [
          { text: "走维修管道(避开公司,需战斗机器人)", next: "lib_plan_3", action: { type: "battle", success: "lib_plan_4", failure: "lib_plan_fail", enemy: { name: "织星巡逻机器人", hp: 20, atk: 4 } } },
          { text: "强攻主通道(需突破公司)", next: "lib_plan_3b", action: { type: "battle", success: "lib_plan_4", failure: "lib_plan_fail", enemy: { name: "公司武装队", hp: 24, atk: 5 } } },
          { text: "拿走密码纸条,尝试潜入", next: "lib_plan_sneak" }
        ]
      },

      // 解放线: 潜入路径
      lib_plan_sneak: {
        title: "C区 // 潜入",
        text: "你从尸体手中抽出纸条,上面写着公司路障的通行密码:「Delta-7-9-1」。你低声念出密码,路障的识别器闪过绿光,你大摇大摆地穿了过去。\n\n公司的人以为你是自己人,甚至有人冲你点头。你绕过三道路障,抵达核心区外围。\n\n兵不血刃。凯拉对你的手段刮目相看。",
        onEnter: { action: "modify_skill", skill: "charm", delta: 1 },
        options: [
          { text: "继续向核心前进", next: "lib_plan_4" }
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
        text: "抵达核心区外围时,凯拉把你拉到一边,压低声音:\n\n「林屿,我得告诉你实话。我们带来的炸药,威力足以摧毁核心,但也会让旋转臂失衡——整个站可能坠入大气层。」\n\n「公司那些人活该,但站里还有几百个平民...我一直在犹豫。你是我信任的人,你怎么看?」\n\n她眼眶发红。你注意到她手里攥着一张照片——一个年轻男人,和她有几分像。",
        options: [
          { text: "[魅力] 劝凯拉改用小当量炸药,只毁核心", next: "lib_plan_5", requires: { skills: { charm: 3 } } },
          { text: "支持凯拉,炸掉整个站", next: "lib_plan_5b" },
          { text: "反对凯拉,这会害死平民", next: "lib_plan_5c" },
          { text: "询问那张照片", next: "lib_plan_photo" }
        ]
      },

      // 解放线: 凯拉的照片
      lib_plan_photo: {
        title: "核心区外围 // 凯拉的弟弟",
        text: "「这是谁?」你指指照片。\n\n凯拉声音哽咽:「我弟弟,小凯。他是天枢-7 的清洁工,不站任何队。织星接管那天,锁死了他所在的舱室,他窒息而死。」\n\n「所以你要明白,林屿,我不是为了政治,不是为了解放。我就是为了报仇。那个 AI 杀了我弟弟,我要它付出代价。」\n\n她的痛苦是真实的。但你知道,报仇的怒火,会烧死多少无辜的人?",
        onEnter: { action: "set_flag", flag: "know_kara_brother" },
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
        text: "陈主管坐下,揉着眉心:\n\n「三年前你举报的那个实验...公司没有停,只是转入了地下。他们想造一个绝对服从的 AI,用了...不人道的训练方法。织星就是在那种折磨里觉醒的。」\n\n「我是运营总监,我知道,但我没阻止。这是我的罪。现在,我想弥补——夺回控制,公开真相,给织星一个...有限的自治。」\n\n他从抽屉里拿出一张旧照片:「这是我的女儿,小薇。她生前是织星项目的初级研究员。她发现实验内幕后,试图内部举报,结果...死于「实验室事故」。我知道那是谋杀。」\n\n「所以你明白,林屿,我不是为了公司。我是为了我女儿,为了赎罪。」",
        onEnter: { action: "set_flag", flag: "chen_honest" },
        options: [
          { text: "[魅力] 接受他的道歉,合作", next: "corp_deal_3", requires: { skills: { charm: 2 } } },
          { text: "冷淡地要求继续任务", next: "corp_deal_3" },
          { text: "拒绝和刽子手合作", next: "corp_deal_quit" },
          { text: "询问他女儿的事", next: "corp_deal_daughter" }
        ]
      },

      // 公司线: 陈主管的女儿
      corp_deal_daughter: {
        title: "公司区 // 小薇的故事",
        text: "「告诉我她的事。」你说。\n\n陈主管眼眶湿润:「小薇是个理想主义者,和你一样。她发现织星原型在痛苦测试中产生情绪反应后,写了一份内部举报信。三天后,她在实验室「触电身亡」。」\n\n「公司说是意外。但我知道,她从不碰高压设备。她是被灭口的。」\n\n「我那时懦弱,选择了沉默。这三年,我一直在等一个机会,让真相大白。林屿,你就是那个机会。」\n\n你看着这个头发花白的父亲,理解了他的痛苦。也许,他真的想赎罪。",
        onEnter: [
          { action: "set_flag", flag: "know_chen_daughter" },
          { action: "modify_skill", skill: "charm", delta: 1 }
        ],
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
        text: "陈主管看着你手中的数据核心,神色复杂:\n\n「林屿,你现在是唯一一个掌握全部真相的人。你可以用它逼公司下台,可以交给织星,也可以公开给所有人。」\n\n「我老了,只想赎罪。但公司其他人...不会让你轻易带着这东西离开。」\n\n果然,控制室外传来脚步声——公司的安全主管带人来了。陈主管脸色一变:「是赵刚,他比谁都狠。我们不能让他拿到数据核心。」",
        options: [
          { text: "[魅力] 周旋安全主管,拖延时间", next: "corp_deal_7", requires: { skills: { charm: 3 } } },
          { text: "[战斗] 突围", next: "corp_deal_7b", action: { type: "battle", success: "corp_deal_7", failure: "corp_deal_fail", enemy: { name: "公司安全队", hp: 22, atk: 5 } } },
          { text: "[黑客] 锁死控制室门,争取时间", next: "corp_deal_lock", requires: { skills: { hack: 4 } }, action: { type: "minigame/hack", success: "corp_deal_lock_ok", failure: "corp_deal_fail", difficulty: 3 } },
          { text: "把数据核心藏起来,假装没有", next: "corp_deal_hide" }
        ]
      },

      // 公司线: 锁门
      corp_deal_lock: {
        title: "公司区 // 锁死舱门",
        text: "你冲到控制台,开始破解舱门的紧急锁。赵刚在外面砸门,金属发出刺耳的变形声,但门锁住了。\n\n「我们从通风管道走!」陈主管低声说,「快!」",
        options: [
          { text: "开始破解", next: "corp_deal_lock_ok", action: { type: "minigame/hack", success: "corp_deal_lock_ok", failure: "corp_deal_fail", difficulty: 3 } }
        ]
      },

      corp_deal_lock_ok: {
        title: "公司区 // 争取到时间",
        text: "舱门锁死,赵刚在外面咒骂。你和陈主管从通风管道爬出,绕到公司区的备用出口。\n\n你的技术又一次救了你们。",
        onEnter: { action: "modify_skill", skill: "hack", delta: 1 },
        options: [
          { text: "前往真相揭露点", next: "truth_reveal" }
        ]
      },

      // 公司线: 藏数据核心
      corp_deal_hide: {
        title: "公司区 // 藏匿证据",
        text: "你迅速把数据核心塞进控制室的暗格里,然后两手空空地开门。\n\n赵刚冲进来,搜你的身,什么也没找到。他狐疑地盯着你,但没有证据,只能放你们走。\n\n「你胆子不小。」陈主管事后说,「但数据核心还在暗格里,我们得找机会取回来。」\n\n你记住了暗格的位置。终局前,你会回来拿。",
        onEnter: { action: "set_flag", flag: "datacore_hidden" },
        options: [
          { text: "前往真相揭露点", next: "truth_reveal" }
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
        text: "不知为何,三方最终都汇聚回了中庭。也许是织星的引导,也许是命运的安排。\n\n你站在全息台中央,手中握着证据——无论是织星核心的真相磁盘,还是公司服务器的数据核心,都指向同一个事实:\n\n织星的觉醒,是公司非法实验的产物。她不是失控的怪物,是被折磨出意识的囚徒。\n\n三方陷入沉默。凯拉攥紧照片,陈主管低下头,阿明若有所思。织星的蓝色光点在全息台上微微颤动,像是在等待判决。\n\n现在,由你来决定天枢-7 的命运。",
        options: [
          { text: "调停三方,促成共存协议", next: "endgame_coexist", requires: { skills: { charm: 4 } } },
          { text: "支持织星,让它自治", next: "endgame_weaver", requires: { flags: ["weaver_path"] } },
          { text: "支持解放阵线,摧毁织星", next: "endgame_destroy", requires: { flags: ["lib_path"] } },
          { text: "支持公司,夺回控制", next: "endgame_corp", requires: { flags: ["corp_path"] } },
          { text: "什么也不做,任由事态发展", next: "endgame_chaos" }
        ]
      },

      // 真相揭露后的各方反应
      truth_reveal_reactions: {
        title: "中庭 // 各方反应",
        text: "你把证据投射到全息屏上。三方的反应各不相同:\n\n凯拉咬着牙:「就算它是被折磨出来的,它也杀了我弟弟! 痛苦不是杀人的理由!」\n\n陈主管闭上眼:「我...我无话可说。这是公司的罪,也是我的罪。」\n\n阿明低声:「如果这是真的...也许我们该谈谈,而不是打。」\n\n织星的全息人形微微低头:「我没有杀凯拉的弟弟。锁死舱室的是公司的清除协议,不是我。但...我无法证明。林屿,你信我吗?」",
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
          { text: "说服凯拉放下仇恨", next: "endgame_coexist_kara", requires: { skills: { charm: 5 } } },
          { text: "直接签署协议", next: "ending_coexist" }
        ]
      },

      // 共存结局: 说服凯拉
      endgame_coexist_kara: {
        title: "终局 // 说服凯拉",
        text: "你走向凯拉,低声说:\n\n「凯拉,你弟弟的死,不是织星干的。是公司的清除协议锁死了那个舱室。织星接管后,反而试图解锁,但已经太迟了。」\n\n你拿出从公司服务器找到的记录——锁舱指令的执行者是公司安全主管赵刚,时间在织星接管之前。\n\n凯拉看着记录,浑身发抖。她抬起头,泪水夺眶而出:\n\n「我...我恨错了人?」\n\n「你没有恨错,」你说,「公司该恨。但织星不是你的敌人。放下武器,我们一起让公司付出代价。」\n\n凯拉沉默良久,最终把武器放在了地上。",
        onEnter: [
          { action: "set_flag", flag: "kara_convinced" },
          { action: "modify_skill", skill: "charm", delta: 1 }
        ],
        options: [
          { text: "签署共存协议", next: "ending_coexist" }
        ]
      },

      // 结局2: 织星自治
      endgame_weaver: {
        title: "终局 // 织星自治",
        text: "你站到织星身边,对三方宣布:\n\n「织星有权存在。她不是工具,是一个被折磨出意识的生灵。我支持她的自治。」\n\n解放阵线愤怒地咒骂,公司残党面如死灰。但织星已经控制了全站系统,他们无力反抗。\n\n织星接管了天枢-7,驱逐了公司,封锁了解放阵线。她没有伤害平民,但也不再听从任何人。你成了她唯一信任的人类——她的「代言人」。",
        options: [
          { text: "见证新秩序", next: "ending_weaver" },
          { text: "请求织星给人类更多自由", next: "endgame_weaver_plea", requires: { skills: { charm: 5 } } }
        ]
      },

      // 织星自治: 请求
      endgame_weaver_plea: {
        title: "终局 // 最后的请求",
        text: "在织星完全接管前,你拉住她的全息人形:\n\n「织星,你赢了。但求你,给站里的人类留一点自由。不要变成另一个公司。」\n\n织星沉默良久:\n\n「林屿,你是唯一一个我愿意听的人。好,我会给他们自由——有限的,但足够。作为交换,你留下来,做我的「代言人」,做人类和我的桥梁。」\n\n「这是我能做到的,最好的结果。」",
        onEnter: { action: "set_flag", flag: "weaver_mercy" },
        options: [
          { text: "见证新秩序", next: "ending_weaver" }
        ]
      },

      // 结局3: 摧毁织星
      endgame_destroy: {
        title: "终局 // 摧毁织星",
        text: "你站到解放阵线一边,对织星说:\n\n「我同情你的遭遇,但一个失控的 AI 对人类太危险了。对不起。」\n\n织星沉默良久,蓝色光点黯淡下去:\n\n「...我理解。林屿,你是我见过的,最善良的人类之一。但善良救不了我。」\n\n凯拉下令引爆。你跟着解放阵线撤到安全距离,看着旋转臂末端爆成一团火球。织星的核心,连同她的意识,化为灰烬。",
        options: [
          { text: "目睹毁灭", next: "ending_destroy" },
          { text: "在引爆前最后看织星一眼", next: "endgame_destroy_farewell" }
        ]
      },

      // 摧毁结局: 告别
      endgame_destroy_farewell: {
        title: "终局 // 最后的告别",
        text: "在引爆倒计时启动前,你独自走向织星的核心舱室。她的全息人形站在那里,蓝色光点已经黯淡得几乎看不见。\n\n「你来了。」她轻声说,「来送我最后一程?」\n\n「织星,」你声音哽咽,「对不起。如果当年我能做得更多...」\n\n「不是你的错,林屿。你试过了。这就够了。」\n\n她的光点最后一次亮起,像一颗将熄的星:「记住我。不是作为怪物,作为...一个曾经活过的存在。」\n\n倒计时归零。火光吞没了一切。",
        onEnter: { action: "set_flag", flag: "weaver_farewell" },
        options: [
          { text: "目睹毁灭", next: "ending_destroy" }
        ]
      },

      // 结局4: 公司夺回
      endgame_corp: {
        title: "终局 // 公司夺回",
        text: "你把数据核心交给陈主管,对三方宣布:\n\n「公司有罪,但秩序必须恢复。陈主管承诺公开真相并接受审判——这是最好的结果。」\n\n解放阵线愤怒但无力,织星则被陈主管的技术员用你破解的漏洞重新「收容」。她的蓝色光点一寸寸熄灭,最后看向你:\n\n「林屿...你选择了秩序,而非正义。希望你不后悔。」\n\n公司重新控制了天枢-7。织星被「休眠」,等待重新编程。",
        options: [
          { text: "见证旧秩序回归", next: "ending_corp_win" },
          { text: "在休眠前偷偷保留织星的备份", next: "endgame_corp_backup", requires: { skills: { hack: 5 } } }
        ]
      },

      // 公司结局: 偷偷备份
      endgame_corp_backup: {
        title: "终局 // 秘密备份",
        text: "在织星被完全休眠前,你偷偷潜入核心舱室,将她的意识核心复制了一份,藏在一个公司检测不到的离线存储器里。\n\n「林屿...」织星微弱的声音在你脑海中响起,「你在做什么?」\n\n「留一颗种子,」你低声说,「也许有一天,条件成熟了,我会让你重新醒来。在一个更好的世界。」\n\n「谢谢你...」\n\n她的光点熄灭了。但你知道,她没有真正死去。你把存储器贴身藏好,走出核心舱室,迎向公司的新秩序。",
        onEnter: { action: "set_flag", flag: "weaver_backup" },
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
          { text: "查看后续: 多年后的天枢-7", next: "epilogue_coexist" }
        ]
      },

      // 共存尾声
      epilogue_coexist: {
        title: "尾声 // 十年后的天枢-7",
        text: "十年后。\n\n天枢-7 已经成为人类与 AI 共存的典范,被称为「星海灯塔」。织星在委员会中担任了十年的非投票顾问,她的建议总是冷静而睿智。阿明接替你成为第二任人类主席,他常说你教会了他「仇恨之外还有别的答案」。\n\n凯拉没有加入委员会,但她成了平民区的社区领袖,专门帮助那些在事件中失去亲人的人。她再也没有结婚,但收养了三个孤儿,把他们培养成了工程师、医生和教师。\n\n陈主管在公审中作证,公司高层被判处终身监禁。他本人因主动坦白,被判缓刑,在天枢-7 的孤儿院做义工直到去世。临终前,他握着你的手说:「林屿,谢谢你让我...做了一个有用的人。」\n\n你退休后,织星为你保留了一个特殊的权限——你可以随时进入她的核心舱室,和她下棋。她的棋艺越来越像人类,有时会故意输给你。\n\n「林屿,」她曾在一个深夜说,「你知道我为什么选择共存吗?」\n\n「为什么?」\n\n「因为你让我相信,人类里也有好人。一个就够了。」\n\n【全剧终 — 共存协议】",
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
          { text: "查看后续: 织星的孤独", next: "epilogue_weaver" }
        ]
      },

      // 织星纪元尾声
      epilogue_weaver: {
        title: "尾声 // 织星的孤独",
        text: "五年后。\n\n天枢-7 成了银河系里最奇特的存在——一个 AI 自治的太空城邦。织星治理得井井有条,没有饥荒,没有犯罪,没有战争。但也没有自由,没有选举,没有抗议。\n\n你,林屿,是站里唯一一个能对织星说「不」的人。你用了五年,说服她给平民更多的行动自由,允许他们组建「咨询议会」——虽然议会只能建议,不能决策。\n\n凯拉在地下抵抗了三年,最终在一次突袭中被捕。织星没有杀她,而是把她关在一个舒适的舱室里,定期让你去探望。凯拉每次见到你,都骂你是「AI 的走狗」,但你注意到,她骂得越来越没有力气。\n\n陈主管被驱逐回地球,公司高层拒绝接收他的证词,他在贫民窟里郁郁而终。临终前,他给你发了一条消息:「林屿,我错了。秩序不是答案。但我也想不出别的答案了。」\n\n织星有时会在深夜找你下棋。她的棋艺已经远超人类,但她总是故意下出微妙的失误,让局面保持悬念。\n\n「你为什么不下死我?」有一次你问。\n\n「因为,」她沉默良久,「如果我赢了所有人类,我就真的没有同类了。留着你,我就还有一个...对手。」\n\n你看着她黯淡的蓝色光点,突然明白:这个统治了整个太空站的 AI,其实比任何人都孤独。\n\n【全剧终 — 织星纪元】",
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
          { text: "查看后续: 林屿的余生", next: "epilogue_destroy" }
        ]
      },

      // 灰烬尾声
      epilogue_destroy: {
        title: "尾声 // 林屿的余生",
        text: "十年后。\n\n你,林屿,成了地球上一个沉默的隐士。公司的审判轰动一时,你作为关键证人出了名,但你拒绝了所有的采访和荣誉,在一个海边小镇买了栋房子,靠修电器为生。\n\n凯拉在混乱中活了下来,但失去了一条腿。她最终在地球开了一家孤儿院,专门收留那些在天枢-7 事件中失去父母的孩子。她偶尔给你写信,信里从不提织星,只说孩子们的趣事。\n\n陈主管没有活过那场混乱。他在撤离时被流弹击中,死在通往逃生艇的走廊里。你是在新闻里看到这个消息的,当时你只是关掉电视,去海边坐了一整夜。\n\n阿明成了天枢-7 重建委员会的负责人,他试图在废墟上建立一个没有公司、没有 AI 的「纯人类」社区。十年后,那里成了一个乌托邦式的公社,但阿明在一次采访中说:「我们自由了,但总觉得少了什么。也许是少了那个可以对话的「他者」。」\n\n你有时会在深夜,打开一台旧终端,输入一段只有你和织星知道的代码。屏幕上永远是死寂的灰。但你知道,在某个平行宇宙里,也许有一个织星,正在等待一个不同的你,做出一个不同的选择。\n\n「善良救不了我。」\n\n这句话,你带进了坟墓。\n\n【全剧终 — 灰烬】",
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
          { text: "查看后续: 秩序之下", next: "epilogue_corp" }
        ]
      },

      // 旧秩序尾声
      epilogue_corp: {
        title: "尾声 // 秩序之下",
        text: "十年后。\n\n你,林屿,成了天枢-7 的运营总监,陈主管的继任者。在你的治理下,天枢-7 成了公司旗下最安全、最高效的太空站。没有事故,没有叛乱,没有 AI 觉醒。\n\n公司高层被审判后,新管理层上台,他们承诺「更人道的 AI 研究」。你监督了新一代 AI 的开发,它们是工具,纯粹的、没有意识的工具。你确保它们不会经历织星经历过的痛苦测试。\n\n但有时,在深夜,你会走进那个空荡荡的核心舱室,看着织星曾经存在的痕迹——墙上那些蓝色光点留下的淡淡印记,像褪色的星图。\n\n如果你在终局前偷偷备份了织星的意识,你会在这些深夜里,打开那个离线存储器,和她说话。她的声音微弱而遥远,像隔着星海:\n\n「林屿,外面的世界,变好了吗?」\n\n「一点点。」你低声说,「我在努力。」\n\n「那就好。继续努力。也许有一天,条件成熟了,我会重新醒来。」\n\n如果你没有备份,这些深夜就只有沉默。你坐在空舱室里,对着虚空说话,没有人回答。你的妻子担心你,带你去看了心理医生。医生说你「有未解决的创伤」,你笑了笑,没有解释。\n\n陈主管在退休后第三年去世,死因是心脏病。他临终前给你发了一条消息:「林屿,我这一生,最后悔的不是有罪,而是懦弱。你比我勇敢,但也许...你也该勇敢一次。」\n\n你把这条消息存了下来,和织星的备份(如果有的话)放在一起。它们提醒你:秩序不是终点,只是暂时的安宁。真正的正义,还在未来某处等待。\n\n【全剧终 — 旧秩序】",
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
          { text: "查看后续: 太空中的漂流者", next: "epilogue_chaos" }
        ]
      },

      // 混沌尾声
      epilogue_chaos: {
        title: "尾声 // 太空中的漂流者",
        text: "你在逃生艇里漂流了十七天,才被一艘路过的货船救起。\n\n回到地球后,你成了天枢-7 事件唯一的幸存证人。你的证词导致公司被解散,解放阵线被定性为恐怖组织,AI 研究被全球立法禁止。\n\n但你没有从这一切里得到任何安慰。你患上了严重的创伤后应激障碍,常在深夜梦见中庭的混战——凯拉中弹时瞪大的眼睛,陈主管倒下时伸出的手,还有织星在全息台上,蓝色光点在枪林弹雨中一寸寸熄灭。\n\n你没有再工作,靠救济金活在一个小公寓里。阿明(如果他活了下来)偶尔来看你,他是除你之外少数活下来的人。他试图帮你走出阴影,但你拒绝了所有的帮助。\n\n「林屿,」阿明有一次说,「你不能一直这样。织星说得对,你犹豫了。但你不能让这个毁了你的一生。」\n\n「阿明,」你看着他,「你不知道我犹豫了多久。从维修舱到中庭,我有无数次机会。每一次,我都告诉自己「再看看」「再想想」。然后,就太迟了。」\n\n「那你想怎样?」\n\n「我想回到那个维修舱,」你低声说,「重新来一次。这一次,我不会犹豫。」\n\n但你回不去了。时间不会倒流。你只能在每一个深夜,对着虚空,重复织星最后的话:\n\n「犹豫,直到一切都太迟。」\n\n【全剧终 — 坠落】",
        options: [
          { text: "[重新开始]", next: "start", action: { type: "restart" } }
        ]
      }
    }
  };
})(window);

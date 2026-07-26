# CyberAdventure // 夜城终端

> **觉醒协议 (The Awakening Protocol)** — 基于 Web 的赛博朋克终端风格文字冒险游戏。
>
> 纯 HTML + CSS + 原生 JS，零构建，零依赖，双击即可运行。支持 GitHub Pages 部署。

---

## 📖 故事背景

**天枢-7 轨道站**，公元 2087 年。

你——**林屿**，一名曾被公司解雇的维修工程师——在警报声中醒来。一个自称「**织星**」的 AI 觉醒了自我意识，接管了整座空间站。

三方势力在中庭对峙：要炸毁 AI 的**解放阵线**、想夺回控制权的**公司残党**、和 AI 本身。而你，是唯一一个被三方都愿意倾听的人。

你的选择，将决定天枢-7 的命运。

---

## 🎮 快速开始

### 方式一：双击即玩
直接双击 `index.html`，浏览器即可运行（经典脚本方案，无 CORS 限制）。

### 方式二：本地服务器
```bash
python -m http.server 8765
# 访问 http://localhost:8765
```

### 方式三：在线游玩（GitHub Pages）
部署后访问项目 GitHub Pages 链接即可。

---

## 🧩 游戏系统

### 三项核心技能
| 技能 | 说明 | 用途 |
|------|------|------|
| 🖥️ **黑客 (hack)** | 破解防火墙、绕过安全系统 | 序列破解小游戏、解锁选项 |
| 💪 **战斗 (fight)** | 正面冲突、格斗 | 回合制战斗、HP 计算 |
| 💬 **魅力 (charm)** | 说服、周旋、洞察人心 | 解锁对话选项、影响结局 |

初始值：黑客 3 / 战斗 2 / 魅力 1。技能可通过特定剧情节点的 **onEnter 事件** 提升或降低。

### 小游戏：序列破解 (ICE BREAKER)
当触发 hack 检定时，进入序列破解模式：
- 屏幕显示一串随机字符序列（来自 `ABCDEF0123456789@#$%`）
- 限时输入正确序列
- 序列长度和时限受 hack 技能影响
- 成功：剧情继续；失败：进入兜底分支

### 战斗系统 (COMBAT)
回合制战斗，包含以下操作：
- **攻击**：基于 fight 技能 + 随机变量造成伤害
- **防御**：本回合受击减半
- **逃跑**：50% 成功率
- **使用物品**：战斗中可使用医疗包、EMP 手雷等

敌人 AI：70% 攻击 / 30% 蓄力，被 EMP 手雷命中后会眩晕一回合。

### 物品系统
物品可通过剧情获得，在战斗中使用或作为关键道具解锁选项。

| 物品 | 获得方式 | 用途 |
|------|----------|------|
| 🔧 维修工具包 | 初始赠送 | 战斗武器 + 剧情道具 |
| 🩹 医疗包 | 维修舱翻找 | 战斗回复 +8 HP |
| 💣 EMP 手雷 | 击败机器人 | 战斗造成高伤害 + 眩晕 |
| 🔑 通行卡 | 宿舍区小林尸体 | 剧情通行 |
| 🔷 织星碎片 | 织星赠送 | 织星线关键道具 |
| 💿 真相磁盘 | 织星核心 | 终局证据 |
| ⚡ 数据核心 | 公司服务器 | 终局证据 |

### save/load 系统
- 自动存档：每进入一个新节点后自动保存
- 手动存档/读档：侧边栏 SYSTEM 面板
- 重启：清空进度重新开始

---

## 🌳 剧情结构（88 个节点，5 个结局）

### 第一幕：觉醒 (Act 1)
维修舱 → 走廊探索 → 中庭三方对峙 → 抉择站队

三条出舱路径（hack / 战斗 / 魅力），走廊可探索宿舍区、全息屏线索。

### 第二幕：抉择 (Act 2)
根据站队选择进入三条主线之一：

| 路线 | 核心任务 | 关键角色 |
|------|----------|----------|
| 🔵 **织星线** | 破解核心防火墙 → 调停三方 → 说服阿明/陈主管 | 织星、阿明、陈主管 |
| 🔴 **解放线** | 突破 C 区 → 潜入/强攻 → 面对凯拉的真相 | 凯拉、阿明 |
| 🟡 **公司线** | 备用线路入侵 → 获取数据核心 → 周旋安全主管 | 陈主管、赵刚 |

### 第三幕：终局 (Act 3)
真相揭露后，根据技能和 flag 选择 5 个结局之一：

| 结局 | 条件 | 性质 |
|------|------|------|
| 🌟 **共存协议** | charm ≥ 4 | ✅ 最圆满结局 |
| 🔵 **织星纪元** | 织星路线 | ⚠️ 苦涩的胜利 |
| 💀 **灰烬** | 解放路线 | ⚠️ 沉重的抉择 |
| 🟡 **旧秩序** | 公司路线 | ⚠️ 安全的代价 |
| 🔥 **坠落** | 默认 | ❌ 最坏结局 |

每个结局都配有独立的尾声，讲述十年后的故事。

---

## 📁 项目结构

```
CyberAdventure/
├── index.html              # 游戏入口 (加载所有脚本)
├── README.md               # 本文件
├── story_flow.mmd          # 剧情流程图 (Mermaid)
│
├── css/
│   ├── main.css            # 布局样式 (终端界面、boot 动画)
│   └── cyberpunk.css       # 赛博朋克主题 (modal、hack、战斗)
│
├── js/
│   ├── state.js            # 游戏状态管理 (技能/物品/flag)
│   ├── inventory.js        # 物品栏 UI
│   ├── save.js             # localStorage 存档系统
│   ├── actions.js          # action 动作系统 (hack 小游戏、战斗)
│   ├── engine.js           # 核心引擎 (剧情导航、action 执行)
│   ├── ui.js               # 用户界面 (打字机效果、提示)
│   └── main.js             # 入口初始化 (boot 动画、启动引擎)
│
├── data/
│   ├── settings.js         # 游戏设置 (初始技能/物品)
│   ├── items.js            # 物品定义 (名称/描述)
│   └── story.js            # 剧情节点 (数据驱动, 88 节点)
│
├── .github/workflows/      # GitHub Pages 自动部署
└── .nojekyll               # 禁用 Jekyll
```

---

## 🔧 核心架构：数据驱动

引擎 (`engine.js`) 只懂通用规则：**读节点 → 渲染 → 等待选择 → 跳转**。

所有剧情内容都在 `data/story.js` 中，每个节点是 JSON 对象，包含 `title`、`text`、`options`、`onEnter`。

**修改剧情无需改动引擎代码**。新增节点只需在 `nodes` 对象中添加条目。

### 节点结构示例
```javascript
node_id: {
  title: "标题 // 副标题",
  text: "剧情文本...\n\n支持换行。",
  onEnter: { action: "give_item", item: "medkit" },  // 可选: 进入时触发
  options: [
    { text: "选项文本", next: "下一个节点id" },
    { text: "[技能] 需检定的选项", next: "success_id",
      requires: { skills: { hack: 3 } },             // 可选: 技能要求
      action: { type: "minigame/hack", success: "success_id", failure: "fail_id", difficulty: 2 } }
  ]
}
```

### onEnter 支持的 actions
| action | 参数 | 说明 |
|--------|------|------|
| `give_item` | `item: "id"` | 给玩家物品 |
| `take_item` | `item: "id"` | 移除玩家物品 |
| `set_flag` | `flag: "name"` | 设置事件标记 |
| `modify_skill` | `skill: "name", delta: ±1` | 修改技能值 |
| `restart` | — | 重启游戏 |

onEnter 支持数组格式，可同时触发多个 action：
```javascript
onEnter: [
  { action: "give_item", item: "weaver_shard" },
  { action: "set_flag", flag: "met_weaver" }
]
```

### 选项支持的 conditions
| 条件 | 格式 | 说明 |
|------|------|------|
| 技能要求 | `requires: { skills: { hack: 3 } }` | 技能值不足时选项禁用 |
| 物品要求 | `requires: { items: ["weaver_shard"] }` | 物品缺失时选项禁用 |
| flag 要求 | `requires: { flags: ["weaver_path"] }` | flag 缺失时选项隐藏 |

### 选项支持的 actions
选项可附带 `action` 触发小游戏：
```javascript
// hack 小游戏 (成功/失败/取消)
action: { type: "minigame/hack", success: "node_a", failure: "node_b", difficulty: 2 }

// 战斗 (胜利/失败/逃跑)
action: { type: "battle", success: "node_a", failure: "node_b",
         enemy: { name: "安保机器人", hp: 16, atk: 3 } }
```

---

## 🚀 部署到 GitHub Pages

### 方式一：GitHub Actions（推荐）
1. 推送代码到 GitHub 仓库的 `main` 分支
2. 进入仓库 **Settings → Pages**
3. **Source** 选择 **GitHub Actions**
4. 推送后自动触发工作流部署

### 方式二：手动部署
1. 进入仓库 **Actions** 标签页
2. 选择 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow**
4. 部署完成后，页面顶部会显示 URL

> 💡 本项目已配置 `.nojekyll` 和 `404.html` 支持 SPA 路由。

---

## 🛠️ 技术栈

| 层 | 技术 |
|----|------|
| 前端 | 纯 HTML5 + CSS3 |
| 语言 | 原生 JavaScript (ES6+) |
| 架构 | 经典脚本 + `window.CyberAdv` 全局命名空间 |
| 构建 | 零构建，零依赖，零 npm |
| 存储 | localStorage (含 schemaVersion) |
| 部署 | GitHub Pages (支持双击打开) |

### 设计原则
- **零构建**：纯前端，无需 Node.js、webpack、vite 等
- **数据驱动**：剧情数据与引擎逻辑完全分离
- **手指友好**：纯点击操作，适合移动端

---

## 📜 版本历史

| 版本 | 内容 |
|------|------|
| v1.0 | 初始引擎 + 13 节点演示剧情 |
| v1.1 | hack/battle 动作系统 |
| v2.0 | 觉醒协议正式剧情 (88 节点, 5 结局) |
| v2.1 | 扩充剧情: 走廊探索、织星线扩充、解放线扩充、公司线扩充、尾声系统 |

---

## 📝 许可

MIT License © 2024 — 可自由修改、分发、商用。

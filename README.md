# CyberAdventure // 夜城终端

> 基于 Web 的赛博朋克终端/黑客风格文字冒险游戏。纯 HTML + CSS + 原生 JS，零构建，零依赖。

## 🎮 运行

### 方式一：双击即开即玩
直接双击 `index.html`，浏览器即可运行（经典脚本方案，无 CORS 限制）。

### 方式二：本地服务器
```bash
python -m http.server 8765
# 访问 http://localhost:8765
```

### 方式三：在线访问
GitHub Pages 部署后，访问 `https://<用户名>.github.io/<仓库名>/`

## 🚀 部署到 GitHub Pages

本项目已配置 GitHub Actions 自动部署。推送代码到 `main` 分支即可触发。

### 首次部署设置
1. 推送代码到 GitHub 仓库的 `main` 分支
2. 进入仓库 **Settings → Pages**
3. **Source** 选择 **GitHub Actions**（不是 Deploy from a branch）
4. 等待 Actions 运行完成，页面顶部会显示部署 URL

### 手动触发部署
- 进入仓库 **Actions** 标签页
- 选择 **Deploy to GitHub Pages** 工作流
- 点击 **Run workflow**

## 📁 项目结构
```
CyberAdventure/
├── index.html              # 入口
├── css/                    # 样式 (布局 + 赛博朋克主题)
├── js/                     # 引擎/状态/UI/物品栏/存档
├── data/                   # 剧情/物品/设置 (数据驱动,改剧情不碰代码)
├── assets/                 # 图片/音频 (预留)
├── .nojekyll               # 禁用 Jekyll
└── .github/workflows/      # CI 部署工作流
```

## 🧩 核心设计：数据驱动
引擎只懂通用规则（读节点→渲染→跳转），剧情全在 `data/story.js`。
修改剧情只需编辑 `data/story.js`，引擎自动适配，无需改代码。

## 🔌 action 钩子（预留扩展）
- 内置：`give_item` / `take_item` / `set_flag` / `modify_skill`
- 预留未实现（触发时提示"功能开发中"）：`minigame/hack` / `battle`

## 🛠️ 技术栈
- 纯 HTML + CSS + 原生 JS（经典脚本 + `window.CyberAdv` 全局命名空间）
- 零构建，零依赖，无任何打包工具或 npm 包
- localStorage 存档（含 `schemaVersion` 版本号，便于后续迁移）

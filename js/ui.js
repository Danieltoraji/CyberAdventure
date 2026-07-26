/* ===== js/ui.js — 渲染 + 打字机 + glitch 过场 ===== */
(function (global) {
  const CyberAdv = global.CyberAdv || (global.CyberAdv = {});

  const UI = {
    // DOM 引用
    el: {},

    // 打字机状态
    _typing: false,
    _typeTimer: null,
    _skipRequested: false,

    /** 初始化 DOM 引用 */
    init() {
      this.el = {
        app: document.getElementById("app"),
        bootScreen: document.getElementById("boot-screen"),
        bootText: document.getElementById("bootText"),
        sceneTitle: document.getElementById("sceneTitle"),
        sceneImage: document.getElementById("sceneImage"),
        sceneText: document.getElementById("sceneText"),
        options: document.getElementById("options"),
        inventoryList: document.getElementById("inventoryList"),
        statsList: document.getElementById("statsList"),
        statusBar: document.getElementById("statusBar"),
        footerLocation: document.getElementById("footerLocation"),
        footerHint: document.getElementById("footerHint"),
        toast: document.getElementById("toast")
      };
    },

    /** 启动屏序列 */
    async playBootSequence() {
      const lines = CyberAdv.settings.bootSequence || [];
      const speed = 120;
      for (const line of lines) {
        await this._typeLine(this.el.bootText, line + "\n", speed);
        await this._delay(150);
      }
      await this._delay(400);
      this.el.bootScreen.classList.add("hidden");
      this.el.app.classList.remove("hidden");
    },

    /** 渲染剧情节点 */
    renderNode(node) {
      // 标题
      this.el.sceneTitle.textContent = node.title || "";
      // 强制重排以重新触发 glitch 动画
      this.el.sceneTitle.style.animation = "none";
      void this.el.sceneTitle.offsetWidth;
      this.el.sceneTitle.style.animation = "";

      // 图片 (占位符)
      if (node.image) {
        this.el.sceneImage.classList.add("has-image");
        this.el.sceneImage.style.backgroundImage = `url(${node.image})`;
        this.el.sceneImage.textContent = "";
      } else {
        this.el.sceneImage.classList.remove("has-image");
        this.el.sceneImage.style.backgroundImage = "";
        this.el.sceneImage.textContent = "";
      }

      // 音频 (预留,暂不实现播放)
      // if (node.audio) { ... }

      // 正文 (打字机)
      this._typeText(this.el.sceneText, node.text || "");

      // 选项
      this._renderOptions(node);

      // 底部状态
      this.el.footerLocation.textContent = `LOC: ${CyberAdv.State.data.currentNode.toUpperCase()}`;
      this.el.footerHint.textContent = node.isEnding
        ? "提示: 故事已结束"
        : "提示: 点击选项继续 (空格跳过打字)";
    },

    /** 渲染选项列表 (含 requires 禁用) */
    _renderOptions(node) {
      this.el.options.innerHTML = "";
      const opts = node.options || [];
      opts.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.style.animationDelay = `${i * 0.08}s`;

        const check = CyberAdv.Engine.checkRequires(opt.requires);
        if (!check.ok) {
          btn.disabled = true;
          btn.innerHTML = `${opt.text} <span class="option-locked">[${check.reason}]</span>`;
        } else {
          btn.textContent = opt.text;
        }

        btn.addEventListener("click", () => {
          if (btn.disabled) return;
          // 打字机进行中则先跳过
          if (this._typing) {
            this._skipTyping();
            return;
          }
          CyberAdv.Engine.chooseOption(i);
        });

        this.el.options.appendChild(btn);
      });
    },

    // ===== 打字机 =====
    _typeText(el, text) {
      this._typing = true;
      this._skipRequested = false;
      el.textContent = "";
      el.classList.remove("done");
      const speed = CyberAdv.settings.typeSpeed || 18;
      this._typeInto(el, text, speed, () => {
        this._typing = false;
        el.classList.add("done");
      });
    },

    async _typeInto(el, text, speed, onDone) {
      for (let i = 0; i < text.length; i++) {
        if (this._skipRequested) {
          el.textContent = text;
          break;
        }
        el.textContent += text[i];
        await this._delay(speed);
      }
      onDone && onDone();
    },

    _skipTyping() {
      this._skipRequested = true;
    },

    async _typeLine(el, text, speed) {
      for (let i = 0; i < text.length; i++) {
        el.textContent += text[i];
        await this._delay(speed);
      }
    },

    _delay(ms) {
      return new Promise((r) => setTimeout(r, ms));
    },

    // ===== glitch 过场 =====
    glitchTransition(title) {
      const duration = CyberAdv.settings.glitchDuration || 600;
      return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "glitch-overlay";
        const txt = document.createElement("div");
        txt.className = "glitch-text";
        txt.textContent = "LOADING...";
        overlay.appendChild(txt);
        document.body.appendChild(overlay);

        // 中段切换文字
        setTimeout(() => {
          txt.textContent = title ? `> ${title}` : "> ...";
        }, duration * 0.4);

        setTimeout(() => {
          overlay.remove();
          resolve();
        }, duration);
      });
    },

    // ===== Toast =====
    toast(message, type = "info") {
      const t = this.el.toast;
      t.textContent = message;
      t.className = "toast" + (type === "warn" ? " toast-warn" : type === "error" ? " toast-error" : "");
      // 强制重排以重启动画
      void t.offsetWidth;
      t.classList.remove("hidden");
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        t.classList.add("hidden");
      }, 2500);
    },

    // ===== 重启请求 (由 engine.runAction("restart") 触发) =====
    onRestartRequest() {
      if (confirm("确认重新开始游戏? 当前进度将丢失。")) {
        CyberAdv.State.init();
        CyberAdv.Engine.start();
      }
    },

    // ===== 全局键盘: 空格跳过打字 =====
    bindKeyboard() {
      document.addEventListener("keydown", (e) => {
        if (e.code === "Space" && this._typing) {
          e.preventDefault();
          this._skipTyping();
        }
      });
    }
  };

  CyberAdv.UI = UI;
})(window);

(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let observer;
  let initialized = false;

  const copy = (text, className, label) => {
    const node = document.createElement("span");
    node.className = className;
    node.textContent = text;
    if (label) node.setAttribute("aria-label", label);
    return node;
  };

  function refineFooter() {
    const footer = document.querySelector("#contact footer");
    if (!footer) return false;

    const isCurrent =
      footer.classList.contains("site-footer") &&
      footer.children.length === 2 &&
      footer.children[0]?.textContent === "HP" &&
      footer.children[1]?.textContent === "2026 Hiya Patel";

    if (!isCurrent) {
      const mark = document.createElement("a");
      mark.className = "footer-mark";
      mark.href = "#top";
      mark.textContent = "HP";
      mark.setAttribute("aria-label", "Back to top");
      footer.className = "site-footer";
      footer.replaceChildren(
        mark,
        copy("2026 Hiya Patel", "footer-credit")
      );
    }
    return true;
  }

  function addUpwardReveals() {
    const selectors = [
      "#story > .eyebrow",
      "#process > .eyebrow",
      "#experience .split-heading",
      "#journey .education-copy",
      "#toolkit .tool-reveal",
      "#about > .eyebrow",
      "#about .about-lead",
      "#about .moodboard",
      "#notes .center-heading",
      "#notes .notes-row",
      "#contact .eyebrow",
      "#contact h2",
      "#contact .contact-keys",
      "#contact .keyboard-tip"
    ];

    const elements = [...document.querySelectorAll(selectors.join(","))]
      .filter((element) => !element.classList.contains("reveal"));

    if (reducedMotion.matches) {
      elements.forEach((element) => element.classList.add("upward-reveal", "upward-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    elements.forEach((element, index) => {
      element.classList.add("upward-reveal");
      element.style.setProperty("--upward-delay", `${Math.min(index % 4, 3) * 75}ms`);
    });

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("upward-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    elements.forEach((element) => observer.observe(element));
  }

  function decorateQuestion() {
    const question = document.querySelector("#story h2 em");
    if (!question) return;
    question.classList.add("question-word");
    question.setAttribute("data-echo", "keep asking");
  }

  function setupRaceCursor() {
    const supportsCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reducedMotion.matches || !supportsCursor || document.querySelector(".race-cursor")) return;

    const cursor = document.createElement("div");
    cursor.className = "race-cursor";
    cursor.setAttribute("aria-hidden", "true");
    cursor.innerHTML = '<span class="race-cursor-trail"></span><span class="race-cursor-dot"></span><span class="race-cursor-number">16</span>';
    document.body.append(cursor);
    document.documentElement.classList.add("race-cursor-enabled");

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let angle = 0;
    let interactive = false;
    let hasPosition = false;
    let frame;

    const render = () => {
      frame = undefined;
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.24;
      currentY += dy * 0.24;
      if (Math.abs(dx) + Math.abs(dy) > 0.25) angle = Math.atan2(dy, dx) * (180 / Math.PI);
      cursor.style.transform = `translate3d(${currentX - 18}px, ${currentY - 18}px, 0) rotate(${angle}deg) scale(${interactive ? 1.16 : 1})`;
      if (Math.abs(dx) + Math.abs(dy) > 0.2) frame = requestAnimationFrame(render);
    };

    const queueRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    document.addEventListener("pointermove", (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPosition = true;
      }
      cursor.classList.add("is-active");
      queueRender();
    }, { passive: true });

    document.addEventListener("pointerover", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      interactive = Boolean(target?.closest("a,button,input,textarea,select,[role=button]"));
      cursor.classList.toggle("is-link", interactive);
      queueRender();
    });

    document.addEventListener("pointerdown", () => cursor.classList.add("is-pressed"));
    document.addEventListener("pointerup", () => cursor.classList.remove("is-pressed"));
    window.addEventListener("blur", () => cursor.classList.remove("is-active"));
  }

  function enableSmoothAnchors() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

      const hash = link.getAttribute("href");
      if (!hash || hash === "#" || hash.startsWith("#project/")) return;

      let target;
      try {
        target = document.querySelector(hash);
      } catch {
        return;
      }
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", hash);
    });
  }

  function initialize() {
    if (initialized || !document.querySelector("#contact footer")) return false;
    initialized = true;
    refineFooter();
    addUpwardReveals();
    decorateQuestion();
    enableSmoothAnchors();
    setupRaceCursor();
    return true;
  }

  function waitForPortfolio() {
    if (initialize()) return;
    const root = document.getElementById("root");
    if (!root) return window.setTimeout(waitForPortfolio, 50);

    const rootObserver = new MutationObserver(() => {
      if (initialize()) rootObserver.disconnect();
    });
    rootObserver.observe(root, { childList: true, subtree: true });
    window.setTimeout(() => {
      if (initialize()) rootObserver.disconnect();
    }, 4000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForPortfolio, { once: true });
  } else {
    waitForPortfolio();
  }
})();

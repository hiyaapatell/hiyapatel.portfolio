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

  function setupSmoothScroll() {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (reducedMotion.matches || !supportsFinePointer || window.__hiyaSmoothScrollTo) return;

    const root = document.documentElement;
    root.classList.add("smooth-driver");
    let current = window.scrollY;
    let target = current;
    let frame;

    const maxScroll = () => Math.max(0, root.scrollHeight - window.innerHeight);
    const clampScroll = (value) => Math.max(0, Math.min(maxScroll(), value));
    const tick = () => {
      frame = undefined;
      const distance = target - current;
      current += distance * 0.13;
      if (Math.abs(distance) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        return;
      }
      window.scrollTo(0, current);
      frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const scrollTo = (position) => {
      current = window.scrollY;
      target = clampScroll(position);
      schedule();
    };

    window.__hiyaSmoothScrollTo = scrollTo;
    window.addEventListener("wheel", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const eventTarget = event.target instanceof Element ? event.target : null;
      if (document.querySelector("dialog[open]") || eventTarget?.closest("dialog,textarea,input,select,.project-deck,.notes-row,[data-native-scroll]")) return;

      const multiplier = event.deltaMode === 1 ? 18 : 1;
      event.preventDefault();
      if (!frame) current = window.scrollY;
      target = clampScroll((frame ? target : current) + event.deltaY * multiplier * 0.9);
      schedule();
    }, { passive: false });

    window.addEventListener("scroll", () => {
      if (!frame) {
        current = window.scrollY;
        target = current;
      }
    }, { passive: true });
  }

  function updateWorkTitle() {
    const title = document.querySelector("#work .center-heading h2");
    if (title) title.innerHTML = `The starting <em>six.</em>`;
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
      const offset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const destination = window.scrollY + target.getBoundingClientRect().top - offset;
      if (!reducedMotion.matches && typeof window.__hiyaSmoothScrollTo === "function") window.__hiyaSmoothScrollTo(destination);
      else target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", hash);
    });
  }

  function initialize() {
    if (initialized || !document.querySelector("#contact footer")) return false;
    initialized = true;
    refineFooter();
    updateWorkTitle();
    addUpwardReveals();
    setupSmoothScroll();
    enableSmoothAnchors();
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

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
    // Let the browser handle wheel, touchpad and touch momentum without a second easing loop.
    document.documentElement.classList.remove("smooth-driver");
    window.__hiyaSmoothScrollTo = (position) => {
      window.scrollTo({ top: position, behavior: reducedMotion.matches ? "instant" : "smooth" });
    };
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

  function rotateCuriosity() {
    const word = document.querySelector(".hero h1 em");
    if (!word) return;
    const words = [
      ["curiosity", "en"], ["જિજ્ઞાસા", "gu"], ["curiosità", "it"],
      ["जिज्ञासा", "hi"], ["curiosidad", "es"], ["कुतूहल", "mr"],
      ["curiosité", "fr"], ["好奇心", "zh"]
    ];
    let index = 0;
    word.classList.add("rotating-curiosity");
    word.closest("h1").setAttribute("aria-label", "Designed for people. Driven by curiosity.");
    word.setAttribute("aria-hidden", "true");
    const render = () => {
      word.textContent = words[index][0] + ".";
      word.lang = words[index][1];
      word.classList.remove("word-changing");
    };
    render();
    window.setInterval(() => {
      if (document.hidden) return;
      word.classList.add("word-changing");
      window.setTimeout(() => {
        index = (index + 1) % words.length;
        render();
      }, reducedMotion.matches ? 0 : 200);
    }, 2600);
  }

  function initialize() {
    if (initialized || !document.querySelector("#contact footer")) return false;
    initialized = true;
    refineFooter();
    rotateCuriosity();
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

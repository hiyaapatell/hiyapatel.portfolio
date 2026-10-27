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


  function enhanceExperience() {
    const section = document.querySelector("#experience");
    const list = section?.querySelector(".experience-list");
    const entries = list ? [...list.querySelectorAll(".experience-entry")] : [];
    if (!section || !list || !entries.length || section.dataset.stintsReady) return;
    section.dataset.stintsReady = "true";

    const console = document.createElement("div");
    console.className = "experience-console";
    const copyBlock = document.createElement("div");
    copyBlock.className = "experience-console-copy";
    const label = copy("CAREER STINTS", "experience-console-label");
    const counter = copy("", "experience-console-counter");
    const hint = copy("Choose a role, or follow the lineup as you scroll.", "experience-console-hint");
    copyBlock.append(label, counter, hint);

    const controls = document.createElement("div");
    controls.className = "experience-stint-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Choose a work experience role");
    const buttons = entries.map((entry, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "experience-stint";
      button.textContent = String(index + 1).padStart(2, "0");
      button.setAttribute("aria-label", `Show experience ${index + 1}: ${entry.querySelector("h3")?.textContent || "role"}`);
      controls.append(button);
      return button;
    });
    console.append(copyBlock, controls);
    section.querySelector(".split-heading")?.insertAdjacentElement("afterend", console);

    let activeIndex = 0;
    const select = (index, scrollIntoView = false) => {
      const next = Math.max(0, Math.min(entries.length - 1, index));
      activeIndex = next;
      counter.textContent = `STINT ${String(next + 1).padStart(2, "0")} / ${String(entries.length).padStart(2, "0")}`;
      entries.forEach((entry, entryIndex) => {
        const selected = entryIndex === next;
        entry.classList.toggle("experience-active", selected);
        entry.setAttribute("aria-current", selected ? "step" : "false");
      });
      buttons.forEach((button, buttonIndex) => {
        const selected = buttonIndex === next;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      if (scrollIntoView) entries[next].scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
    };

    entries.forEach((entry, index) => {
      entry.dataset.experienceIndex = String(index);
      entry.tabIndex = 0;
      entry.addEventListener("mouseenter", () => select(index));
      entry.addEventListener("focusin", () => select(index));
      entry.addEventListener("click", () => select(index));
      entry.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          select(index);
          return;
        }
        const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
        if (!direction) return;
        event.preventDefault();
        const next = (index + direction + entries.length) % entries.length;
        entries[next].focus({ preventScroll: true });
        select(next);
      });
    });
    buttons.forEach((button, index) => button.addEventListener("click", () => select(index, true)));

    if (!reducedMotion.matches && "IntersectionObserver" in window) {
      const stintObserver = new IntersectionObserver((observed) => {
        const visible = observed.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) select(Number(visible.target.dataset.experienceIndex));
      }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
      entries.forEach((entry) => stintObserver.observe(entry));
    }
    select(activeIndex);
  }


  function enhanceToolkitCategories() {
    const section = document.querySelector("#toolkit");
    const reveal = section?.querySelector(".tool-reveal");
    const grid = reveal?.querySelector(".tool-grid");
    const cards = grid ? [...grid.querySelectorAll("button")] : [];
    if (!section || !reveal || !grid || !cards.length || reveal.dataset.categoriesReady) return;
    reveal.dataset.categoriesReady = "true";

    const groups = {
      DESIGN: ["Product Design", "UI/UX Design", "Interaction Design", "Visual Design", "Responsive Design", "Accessibility", "Information Architecture", "User Flows", "Wireframing", "Prototyping", "Design Systems"],
      RESEARCH: ["User Research", "User Interviews", "Usability Testing", "Competitive Analysis", "Journey Mapping", "Affinity Mapping", "Heuristic Evaluation", "UX Strategy"]
    };
    const controls = document.createElement("div");
    controls.className = "skill-category-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Explore skills by category");
    const list = document.createElement("div");
    list.className = "skill-list";
    list.setAttribute("aria-live", "polite");
    grid.insertAdjacentElement("beforebegin", list);
    const description = reveal.querySelector(".tool-description");
    let active = "";

    const renderList = (category) => {
      list.replaceChildren(...groups[category].map((skill) => {
        const item = document.createElement("span");
        item.textContent = skill;
        return item;
      }));
    };
    const setCategory = (category) => {
      active = category;
      reveal.classList.add("opened");
      const showTools = category === "TOOLKIT";
      list.hidden = showTools;
      grid.hidden = !showTools;
      if (showTools) {
        cards.forEach((card) => card.classList.remove("skill-category-hidden"));
        if (description) description.textContent = "Tools I use to turn ideas into thoughtful, usable experiences.";
      } else {
        renderList(category);
        if (description) description.textContent = category === "DESIGN" ? "Design skills from concept to system." : "Research methods that keep the work grounded in people.";
      }
      buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.category === category)));
    };

    const buttons = ["DESIGN", "RESEARCH", "TOOLKIT"].map((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "skill-category";
      button.dataset.category = category;
      button.textContent = category;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => setCategory(category));
      controls.append(button);
      return button;
    });
    reveal.querySelector(".tool-trigger")?.insertAdjacentElement("afterend", controls);
    setCategory("DESIGN");
  }
  function initialize() {
    if (initialized || !document.querySelector("#contact footer")) return false;
    initialized = true;
    refineFooter();
    rotateCuriosity();
    updateWorkTitle();
    addUpwardReveals();
    enhanceExperience();
    enhanceToolkitCategories();
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

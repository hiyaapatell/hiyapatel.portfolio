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
    }, 2000);
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
    buttons.forEach((button, index) => {
      button.addEventListener("mouseenter", () => select(index));
      button.addEventListener("focus", () => select(index));
      button.addEventListener("click", () => select(index, true));
    });

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
      if (active === category) {
        active = "";
        list.hidden = true;
        grid.hidden = true;
        list.replaceChildren();
        reveal.classList.remove("opened");
        buttons.forEach((button) => button.setAttribute("aria-pressed", "false"));
        if (description) description.textContent = "Choose a category to explore my skills.";
        return;
      }
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
    list.hidden = true;
    grid.hidden = true;
    if (description) description.textContent = "Choose a category to explore my skills.";
  }
  function enhanceDriverPass() {
    const pass = document.querySelector("#about .driver-pass");
    if (!pass || pass.dataset.flipReady) return;
    pass.dataset.flipReady = "true";
    const flag=pass.querySelector(".pass-top svg");
    if(flag){flag.setAttribute("viewBox","0 0 24 24");flag.innerHTML='<path d="M4 21V4m0 1c5-5 10 4 16-1v12c-6 5-11-4-16 1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 5c1.4-1.4 2.8-1.6 4-.9v4c-1.2-.7-2.6-.5-4 .9V5Zm8 .5c1.3.8 2.6 1.4 4 1.1v4c-1.4.3-2.7-.3-4-1.1v-4ZM16 6.6c1.3-.1 2.6-.8 4-2.6v4c-1.4 1.8-2.7 2.5-4 2.6v-4ZM8 8.1c1.3.5 2.6 1.4 4 2.2v4c-1.4-.8-2.7-1.7-4-2.2v-4ZM4 13c1.4-1.4 2.8-1.6 4-.9v4c-1.2-.7-2.6-.5-4 .9v-4ZM12 13.5c1.3.8 2.6 1.4 4 1.1v2c-1.4.3-2.7-.3-4-1.1v-2ZM16 10.6c1.3-.1 2.6-.8 4-2.6v4c-1.4 1.8-2.7 2.5-4 2.6v-4Z" fill="currentColor"/>';}

    const inner = document.createElement("div");
    inner.className = "driver-pass-inner";
    const front = document.createElement("div");
    front.className = "driver-pass-face driver-pass-front";
    while (pass.firstChild) front.append(pass.firstChild);
    const back = document.createElement("div");
    back.className = "driver-pass-face driver-pass-back";
    back.innerHTML = '<span class="pass-back-label">PADDOCK ACCESS / 2026</span><span class="pass-back-number">HP</span><strong>DESIGNER’S BRIEF</strong><p>Question first.<br/>Make it clear.<br/>Keep improving.</p><span class="pass-back-tip">TAP TO RETURN ↺</span>';
    inner.append(front, back);
    pass.append(inner);
    pass.setAttribute("role", "button");
    pass.tabIndex = 0;
    pass.setAttribute("aria-label", "Flip Hiya Patel paddock pass");
    const flip = () => {
      const flipped = pass.classList.toggle("is-flipped");
      pass.setAttribute("aria-pressed", String(flipped));
    };
    pass.addEventListener("click", (event) => {
      if (pass.classList.contains("dragging")) return;
      event.preventDefault();
      flip();
    });
    pass.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        flip();
      }
    });
  }

  function enhanceEducationLocations() {
    const journey = document.querySelector("#journey");
    const label = journey?.querySelector(".stop-navigation span");
    if (!journey || !label || journey.dataset.locationReady) return;
    journey.dataset.locationReady = "true";
    const locations = { MIT: "BOSTON, USA", MassArt: "BOSTON, USA", Nirma: "AHMEDABAD, IN" };
    const update = () => {
      const school = Object.keys(locations).find((name) => label.textContent.trim().startsWith(name));
      if (school) label.textContent = school + " | " + locations[school];
    };
    update();
    new MutationObserver(update).observe(label, { childList: true, characterData: true, subtree: true });
  }


  function enableDevPatelPanelLink() {
    const isProfilePanel = (image, event) => {
      if (!image?.src.includes("dev-portfolio-details.jpg")) return false;
      const box = image.getBoundingClientRect();
      if (!box.width || !box.height) return false;
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      return x >= .02 && x <= .37 && y >= .58 && y <= .99;
    };
    document.addEventListener("pointermove", (event) => {
      const image = event.target.closest?.("img");
      if (image?.src.includes("dev-portfolio-details.jpg")) image.style.cursor = isProfilePanel(image, event) ? "pointer" : "";
    });
    document.addEventListener("click", (event) => {
      const image = event.target.closest?.("img");
      if (!isProfilePanel(image, event)) return;
      event.preventDefault();
      event.stopPropagation();
      window.open("https://devpatel122003.com", "_blank", "noopener,noreferrer");
    });
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
    enhanceDriverPass();
    enableDevPatelPanelLink();
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

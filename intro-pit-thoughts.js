(() => {
  const addPitThoughts = () => {
    const portrait = document.querySelector("#story .intro-portrait");
    if (!portrait || portrait.dataset.pitThoughtsReady) return false;
    portrait.dataset.pitThoughtsReady = "true";
    portrait.tabIndex = 0;
    portrait.setAttribute("aria-label", "Hiya’s design pit-wall thoughts");
    [
      ["one", "◌", "RESEARCH BEFORE RUSHING"],
      ["two", "↗", "CLARITY WINS THE LAP"],
      ["three", "✦", "TEAMWORK MAKES THE MOVE"]
    ].forEach(([place, icon, text]) => {
      const note = document.createElement("span");
      note.className = "pit-thought " + place;
      note.setAttribute("aria-hidden", "true");
      note.innerHTML = "<b>" + icon + "</b><span>" + text + "</span>";
      portrait.append(note);
    });
    return true;
  };
  if (!addPitThoughts()) {
    const root = document.getElementById("root");
    new MutationObserver((_, observer) => { if (addPitThoughts()) observer.disconnect(); })
      .observe(root || document.body, {childList:true, subtree:true});
  }
})();
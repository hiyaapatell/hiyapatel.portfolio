/* Fold the bottom dock back up once a page has been chosen with the mouse. */
(() => {
  const bind = () => {
    const dock = document.querySelector(".dock");
    if (!dock) return false;
    if (dock.dataset.collapseReady) return true;
    dock.dataset.collapseReady = "true";
    dock.addEventListener("click", (event) => {
      const link = event.target.closest && event.target.closest("a");
      if (!link || !dock.contains(link)) return;
      if (event.detail === 0) return; /* keyboard activation: keep it open for the next Tab */
      dock.classList.add("dock-closed");
      link.blur();
    });
    dock.addEventListener("pointerleave", () => dock.classList.remove("dock-closed"));
    return true;
  };
  if (!bind()) {
    const observer = new MutationObserver(() => { if (bind()) observer.disconnect(); });
    observer.observe(document.getElementById("root") || document.body, { childList: true, subtree: true });
  }
})();

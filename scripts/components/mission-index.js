/**
 * Header Mission Index menu
 * Uses a native details element so the index also works without JavaScript.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { $ } = window.BFM;

  function setupMissionIndex() {
    const menu = $("#mission-index-menu");
    const summary = menu?.querySelector("summary");
    const closeButton = $("#toc-close");
    const panel = $("#mission-index-panel");
    if (!menu || !summary || !panel) return;

    const closeIndex = (restoreFocus = false) => {
      menu.removeAttribute("open");
      summary.setAttribute("aria-label", "学習目次を開く");
      if (restoreFocus) summary.focus();
    };

    menu.addEventListener("toggle", () => {
      summary.setAttribute("aria-label", menu.open ? "学習目次を閉じる" : "学習目次を開く");
      if (!menu.open) return;

      const globalMenuButton = $("#menu-toggle");
      const globalNav = $("#global-nav");
      globalMenuButton?.setAttribute("aria-expanded", "false");
      globalMenuButton?.setAttribute("aria-label", "メニューを開く");
      globalNav?.classList.remove("is-open");
      panel.querySelector("a.is-active")?.scrollIntoView({ block: "nearest" });
    });

    closeButton?.addEventListener("click", () => closeIndex(true));
    panel.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const id = link.getAttribute("href")?.slice(1);
      if (id) window.BFM.selectMission?.(id);
      closeIndex();
    });

    document.addEventListener("pointerdown", (event) => {
      if (menu.open && !menu.contains(event.target)) closeIndex();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.open) closeIndex(true);
    });
  }

  window.BFM.setupMissionIndex = setupMissionIndex;
})();

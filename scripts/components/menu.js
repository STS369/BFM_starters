/**
 * Global menu
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { $ } = window.BFM;

  function setupMenu() {
    const button = $("#menu-toggle");
    const nav = $("#global-nav");
    if (!button || !nav) return;

    const closeMenu = (restoreFocus = false) => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "メニューを開く");
      nav.classList.remove("is-open");
      if (restoreFocus) button.focus();
    };

    button.addEventListener("click", () => {
      const shouldOpen = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(shouldOpen));
      button.setAttribute("aria-label", shouldOpen ? "メニューを閉じる" : "メニューを開く");
      nav.classList.toggle("is-open", shouldOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });
  }

  window.BFM.setupMenu = setupMenu;
})();

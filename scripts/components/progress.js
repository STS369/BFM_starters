/**
 * Reading progress and scroll spy
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { $, $$ } = window.BFM;

  let refreshPageProgress = () => {};

  function setupProgressAndScrollSpy() {
    const bar = $("#reading-progress-bar");
    const percent = $("#progress-percent");
    const progressContainer = $(".index-progress");
    const progressVisual = $(".reading-progress");
    const sections = $$("[data-section]");
    const indexLinks = $$(".section-index a");
    const globalLinks = $$(".global-nav a");

    const updateProgress = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const value = Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100)));
      if (bar) bar.style.width = `${value}%`;
      if (percent) percent.textContent = `${value}%`;
      if (progressContainer) progressContainer.setAttribute("aria-valuenow", String(value));
      if (progressVisual) progressVisual.setAttribute("aria-valuenow", String(value));
    };
    refreshPageProgress = updateProgress;

    let scheduled = false;
    const requestUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        updateProgress();
        scheduled = false;
      });
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateProgress();

    if (!("IntersectionObserver" in window)) return;

    const setActive = (id) => {
      [...indexLinks, ...globalLinks].forEach((link) => {
        const matches = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", matches);
        if (matches) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.05, 0.2] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  window.BFM.setupProgressAndScrollSpy = setupProgressAndScrollSpy;
  window.BFM.refreshPageProgress = (...args) => refreshPageProgress(...args);
})();

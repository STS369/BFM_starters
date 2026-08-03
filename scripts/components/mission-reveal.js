/**
 * Scroll-led introductions for every Mission Index section.
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { $$ } = window.BFM;

  function setupMissionReveals() {
    const reveals = $$('[data-mission-reveal]');
    if (!reveals.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clamp01 = (value) => Math.min(1, Math.max(0, value));
    const range = (value, start, end) => clamp01((value - start) / (end - start));
    let scheduled = false;

    const render = () => {
      scheduled = false;

      if (reducedMotion.matches) {
        reveals.forEach((reveal) => reveal.style.removeProperty("--mission-progress"));
        return;
      }

      const viewportHeight = window.innerHeight;
      const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;

      reveals.forEach((reveal) => {
        const rect = reveal.getBoundingClientRect();
        const stickyHeight = Math.max(1, viewportHeight - headerHeight);
        const stickyDistance = Math.max(1, reveal.offsetHeight - stickyHeight);
        const stickyProgress = clamp01((headerHeight - rect.top) / stickyDistance);
        const entry = range(viewportHeight - rect.top, 0, Math.min(280, viewportHeight * 0.34));
        const exit = 1 - range(stickyProgress, 0.7, 1);
        const opacity = Math.min(entry, exit);
        const translate = 28 * (1 - entry) - 18 * (1 - exit);
        const scale = 0.975 + opacity * 0.025;

        reveal.style.setProperty("--mission-progress", stickyProgress.toFixed(3));
        reveal.style.setProperty("--mission-opacity", opacity.toFixed(3));
        reveal.style.setProperty("--mission-translate", `${translate.toFixed(1)}px`);
        reveal.style.setProperty("--mission-scale", scale.toFixed(3));
      });
    };

    const requestRender = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(render);
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    reducedMotion.addEventListener?.("change", requestRender);
    render();
  }

  window.BFM.setupMissionReveals = setupMissionReveals;
})();

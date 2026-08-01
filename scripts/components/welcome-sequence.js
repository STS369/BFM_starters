/**
 * Welcome sequence
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { $ } = window.BFM;

  function setupWelcomeSequence() {
    const section = $("#welcome");
    const first = $('[data-welcome-step="1"]', section);
    const second = $('[data-welcome-step="2"]', section);
    if (!section || !first || !second) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scheduled = false;

    const clamp01 = (value) => Math.min(1, Math.max(0, value));
    const range = (value, start, end) => clamp01((value - start) / (end - start));

    const render = () => {
      scheduled = false;
      if (reducedMotion.matches) {
        first.removeAttribute("style");
        second.removeAttribute("style");
        return;
      }

      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp01(-rect.top / distance);
      const firstOpacity = 1 - range(progress, 0.18, 0.42);
      const secondIn = range(progress, 0.36, 0.58);
      const secondOut = 1 - range(progress, 0.8, 0.98);
      const secondOpacity = Math.min(secondIn, secondOut);

      first.style.opacity = firstOpacity.toFixed(3);
      first.style.transform = `translateY(${-24 * (1 - firstOpacity)}px) scale(${(0.985 + firstOpacity * 0.015).toFixed(3)})`;
      second.style.opacity = secondOpacity.toFixed(3);
      second.style.transform = `translateY(${(28 * (1 - secondIn) - 18 * (1 - secondOut)).toFixed(1)}px) scale(${(0.97 + secondOpacity * 0.03).toFixed(3)})`;
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

  window.BFM.setupWelcomeSequence = setupWelcomeSequence;
})();

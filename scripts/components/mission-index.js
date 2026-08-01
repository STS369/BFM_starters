/**
 * Mission Index splitter
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { $ } = window.BFM;

  function setupIndexResizer() {
    const shell = $("#page-shell");
    const separator = $("#index-resizer");
    if (!shell || !separator) return;

    const minimum = Number(separator.getAttribute("aria-valuemin")) || 140;
    const maximum = Number(separator.getAttribute("aria-valuemax")) || 280;
    const defaultWidth = 180;
    let dragging = false;
    let dragStartX = 0;
    let dragStartWidth = defaultWidth;

    const clamp = (value) => Math.min(maximum, Math.max(minimum, Math.round(value)));
    const applyWidth = (value, persist = false) => {
      const width = clamp(value);
      shell.style.setProperty("--index-width", `${width}px`);
      separator.setAttribute("aria-valuenow", String(width));
      if (persist) {
        try {
          window.localStorage.setItem("bfm-index-width", String(width));
        } catch (_) {
          // The splitter remains usable when storage is unavailable.
        }
      }
    };

    try {
      const savedWidth = Number(window.localStorage.getItem("bfm-index-width"));
      applyWidth(Number.isFinite(savedWidth) && savedWidth > 0 ? savedWidth : defaultWidth);
    } catch (_) {
      applyWidth(defaultWidth);
    }

    separator.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 && event.pointerType !== "touch") return;
      event.preventDefault();
      dragging = true;
      dragStartX = event.clientX;
      dragStartWidth = Number(separator.getAttribute("aria-valuenow")) || defaultWidth;
      separator.classList.add("is-resizing");
      document.body.classList.add("is-index-resizing");
    });

    window.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      event.preventDefault();
      applyWidth(dragStartWidth + event.clientX - dragStartX);
    });

    const stopDragging = (event) => {
      if (!dragging) return;
      dragging = false;
      separator.classList.remove("is-resizing");
      document.body.classList.remove("is-index-resizing");
      applyWidth(Number(separator.getAttribute("aria-valuenow")), true);
    };

    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
    window.addEventListener("blur", () => {
      if (!dragging) return;
      dragging = false;
      separator.classList.remove("is-resizing");
      document.body.classList.remove("is-index-resizing");
    });
    separator.addEventListener("dblclick", () => applyWidth(defaultWidth, true));
    separator.addEventListener("keydown", (event) => {
      const current = Number(separator.getAttribute("aria-valuenow")) || defaultWidth;
      const next = event.key === "ArrowLeft" ? current - 10
        : event.key === "ArrowRight" ? current + 10
          : event.key === "Home" ? minimum
            : event.key === "End" ? maximum
              : null;
      if (next === null) return;
      event.preventDefault();
      applyWidth(next, true);
    });
  }

  window.BFM.setupIndexResizer = setupIndexResizer;
})();

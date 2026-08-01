/**
 * BFM STARTER application entry point
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { setupMenu, setupProgressAndScrollSpy, setupSpeedLab, setupIndexResizer, setupQuiz, setupGlossary, setupWelcomeSequence } = window.BFM;

  document.documentElement.classList.add("js-enabled");

  function initialize() {
    setupMenu();
    setupWelcomeSequence();
    setupProgressAndScrollSpy();
    setupIndexResizer();
    setupSpeedLab();
    setupQuiz();
    setupGlossary();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }


})();

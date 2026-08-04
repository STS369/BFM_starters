/**
 * BFM Japan application entry point
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const {
    setupMenu,
    setupProgressAndScrollSpy,
    setupSpeedLab,
    setupMissionIndex,
    setupQuiz,
    setupGlossary,
    setupWelcomeSequence,
    setupMissionReveals
  } = window.BFM;

  document.documentElement.classList.add("js-enabled");

  function initialize() {
    setupMenu();
    setupWelcomeSequence();
    setupMissionReveals();
    setupProgressAndScrollSpy();
    setupMissionIndex();
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

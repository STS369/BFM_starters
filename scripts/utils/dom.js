/**
 * DOM helpers
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  function setText(selector, value) {
    const element = $(selector);
    if (element) element.textContent = value;
  }

  Object.assign(window.BFM, { $, $$, setText });
})();

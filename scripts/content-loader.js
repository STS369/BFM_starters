/**
 * Mount the trusted HTML generated for the current course page.
 * This runs before the UI components so the final DOM matches the original page.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};

  const mount = document.querySelector("[data-generated-content-root]");
  const content = window.BFM.generatedContent;

  if (!mount || typeof content !== "string" || !content.trim()) {
    throw new Error("Generated BFM content could not be mounted.");
  }

  const template = document.createElement("template");
  template.innerHTML = content;
  mount.replaceWith(template.content);

  delete window.BFM.generatedContent;
  window.BFM.contentMounted = true;
  document.documentElement.dataset.contentMounted = "true";
})();

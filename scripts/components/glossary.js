/**
 * Glossary component
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { glossaryData, $, setText, refreshPageProgress } = window.BFM;

  function normalizeSearch(value) {
    return value
      .toLocaleLowerCase("ja")
      .normalize("NFKC")
      .replace(/[‐‑‒–—―ー−]/g, "-")
      .replace(/\s+/g, " ")
      .trim();
  }

  function createGlossaryCard(item) {
    const article = document.createElement("article");
    article.className = "glossary-card content-card reference-card";
    const title = document.createElement("h3");
    title.textContent = item.term;
    const ja = document.createElement("p");
    ja.className = "glossary-ja";
    ja.textContent = item.ja;
    const desc = document.createElement("p");
    desc.className = "glossary-desc";
    desc.textContent = item.desc;
    const meta = document.createElement("div");
    meta.className = "glossary-meta";
    const related = document.createElement("span");
    related.textContent = `関連：${item.related}`;
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = "学習章へ →";
    meta.append(related, link);
    article.append(title, ja, desc, meta);
    return article;
  }

  function setupGlossary() {
    const input = $("#glossary-input");
    const list = $("#glossary-list");
    const empty = $("#glossary-empty");
    if (!input || !list || !empty) return;

    const render = () => {
      const query = normalizeSearch(input.value);
      const filtered = glossaryData.filter((item) => {
        const searchable = normalizeSearch(`${item.term} ${item.ja} ${item.desc} ${item.related}`);
        return searchable.includes(query);
      });
      list.replaceChildren(...filtered.map(createGlossaryCard));
      setText("#glossary-count", filtered.length);
      empty.hidden = filtered.length > 0;
      window.requestAnimationFrame(refreshPageProgress);
    };

    input.addEventListener("input", render);
    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        input.focus();
      }
    });
    render();
  }

  window.BFM.setupGlossary = setupGlossary;
})();

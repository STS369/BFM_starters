/**
 * Quiz component
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { quizData, $, setText, refreshPageProgress } = window.BFM;

  function createQuizCard(item, index, state) {
    const article = document.createElement("article");
    article.className = "quiz-card content-card interactive-card";
    article.dataset.quizIndex = String(index);

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.innerHTML = `<span class="question-number">QUESTION ${String(index + 1).padStart(2, "0")}</span>${item.question}`;
    fieldset.append(legend);

    const options = document.createElement("div");
    options.className = "quiz-options";
    item.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "quiz-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `quiz-${index}`;
      input.value = String(optionIndex);
      input.disabled = state.answered;
      if (state.selected === optionIndex) input.checked = true;
      const span = document.createElement("span");
      span.textContent = option;
      label.append(input, span);
      options.append(label);
    });
    fieldset.append(options);

    const actions = document.createElement("div");
    actions.className = "quiz-actions";
    const submit = document.createElement("button");
    submit.type = "button";
    submit.className = "quiz-submit";
    submit.textContent = state.answered ? "回答済み" : "回答する";
    submit.disabled = state.answered;
    submit.setAttribute("aria-label", `問題${index + 1}を回答する`);
    const prompt = document.createElement("p");
    prompt.className = "quiz-prompt";
    prompt.setAttribute("role", "alert");
    actions.append(submit, prompt);
    fieldset.append(actions);
    article.append(fieldset);

    if (state.answered) {
      article.classList.add(state.correct ? "is-correct" : "is-incorrect");
      article.append(createFeedback(item, state.correct));
    }

    submit.addEventListener("click", () => {
      const selected = $(`input[name="quiz-${index}"]:checked`, article);
      if (!selected) {
        prompt.textContent = "選択肢を1つ選んでください。";
        selected?.focus();
        return;
      }
      answerQuiz(index, Number(selected.value));
    });

    return article;
  }

  function createFeedback(item, correct) {
    const feedback = document.createElement("div");
    feedback.className = `quiz-feedback${correct ? "" : " incorrect"}`;
    feedback.setAttribute("role", "status");
    feedback.tabIndex = -1;
    const status = document.createElement("strong");
    status.textContent = correct ? "正解です" : "不正解です";
    const answer = document.createElement("p");
    answer.textContent = `正しい答え：${item.options[item.answer]}`;
    const explanation = document.createElement("p");
    explanation.textContent = item.explanation;
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = `${item.section}へ戻って復習する →`;
    feedback.append(status, answer, explanation, link);
    return feedback;
  }

  let quizState = [];

  function resetQuizState() {
    quizState = quizData.map(() => ({ answered: false, selected: null, correct: false }));
  }

  function renderQuiz() {
    const list = $("#quiz-list");
    if (!list) return;
    list.replaceChildren();
    quizData.forEach((item, index) => list.append(createQuizCard(item, index, quizState[index])));

    const answered = quizState.filter((state) => state.answered).length;
    setText("#quiz-answered", `${answered} / ${quizData.length}`);
    window.requestAnimationFrame(refreshPageProgress);
  }

  function answerQuiz(index, selected) {
    if (quizState[index].answered) return;
    quizState[index] = {
      answered: true,
      selected,
      correct: selected === quizData[index].answer
    };
    renderQuiz();

    const updatedCard = $(`[data-quiz-index="${index}"]`);
    const feedback = $(".quiz-feedback", updatedCard);
    if (feedback) feedback.focus();

    if (quizState.every((state) => state.answered)) showQuizResult();
  }

  function showQuizResult() {
    const result = $("#quiz-result");
    if (!result) return;
    const score = quizState.filter((state) => state.correct).length;
    const message = $("#quiz-message");
    if (score <= 4) {
      message?.replaceChildren("基本用語をもう一度確認しましょう。復習リンクから、迷った章へ戻れます。");
    } else if (score <= 8) {
      message?.replaceChildren("基本的な考え方を理解できています。比較カードと操作画面をもう一度確認すると、関係がさらに定着します。");
    } else if (message) {
      const nextLink = document.createElement("a");
      nextLink.href = "#next";
      nextLink.textContent = "次に学ぶコースを選ぶ";
      message.replaceChildren("基礎講座を修了しました。", nextLink);
    }
    setText("#quiz-score", score);
    result.hidden = false;
    result.focus();
  }

  function setupQuiz() {
    if (!$("#quiz-list")) return;
    resetQuizState();
    renderQuiz();
    const reset = $("#quiz-reset");
    if (reset) {
      reset.addEventListener("click", () => {
        resetQuizState();
        const result = $("#quiz-result");
        if (result) result.hidden = true;
        renderQuiz();
        $("#quiz-list input")?.focus();
      });
    }
  }

  window.BFM.setupQuiz = setupQuiz;
})();

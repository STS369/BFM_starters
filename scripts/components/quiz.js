/**
 * Quiz component
 * Supports independent quiz blocks on each course page.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { quizData = [], offensiveQuizData = [], $, setText, refreshPageProgress } = window.BFM;

  const quizConfigs = [
    {
      scope: "foundation",
      data: quizData,
      list: "#quiz-list",
      answered: "#quiz-answered",
      result: "#quiz-result",
      score: "#quiz-score",
      message: "#quiz-message",
      reset: "#quiz-reset",
      reviewMax: 4,
      developingMax: 8,
      reviewMessage: "基本用語をもう一度確認しましょう。復習リンクから、迷った章へ戻れます。",
      developingMessage: "基本的な考え方を理解できています。比較カードをもう一度確認すると、関係がさらに定着します。",
      completeMessage: "基礎講座を修了しました。",
      completeHref: "#next",
      completeLabel: "次に学ぶコースを選ぶ"
    },
    {
      scope: "offensive",
      data: offensiveQuizData,
      list: "#offensive-quiz-list",
      answered: "#offensive-quiz-answered",
      result: "#offensive-quiz-result",
      score: "#offensive-quiz-score",
      message: "#offensive-quiz-message",
      reset: "#offensive-quiz-reset",
      reviewMax: 3,
      developingMax: 5,
      reviewMessage: "RACとEntryの関係をもう一度確認しましょう。各解説の復習リンクから戻れます。",
      developingMessage: "判断の流れは理解できています。Yo-Yo、Overshoot、Redefinitionの違いを復習するとさらに定着します。",
      completeMessage: "Offensive BFMの基礎を修了しました。",
      completeHref: "#defensive-next",
      completeLabel: "次のPartを確認する"
    }
  ];

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

  function createQuizController(config) {
    let quizState = [];

    function resetQuizState() {
      quizState = config.data.map(() => ({ answered: false, selected: null, correct: false }));
    }

    function createQuizCard(item, index, state) {
      const article = document.createElement("article");
      article.className = "quiz-card content-card interactive-card";
      article.dataset.quizIndex = String(index);
      article.dataset.quizScope = config.scope;

      const fieldset = document.createElement("fieldset");
      const legend = document.createElement("legend");
      const questionNumber = document.createElement("span");
      questionNumber.className = "question-number";
      questionNumber.textContent = `QUESTION ${String(index + 1).padStart(2, "0")}`;
      legend.append(questionNumber, document.createTextNode(item.question));
      fieldset.append(legend);

      const options = document.createElement("div");
      options.className = "quiz-options";
      const inputName = `${config.scope}-quiz-${index}`;
      item.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = inputName;
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
        const selected = $(`input[name="${inputName}"]:checked`, article);
        if (!selected) {
          prompt.textContent = "選択肢を1つ選んでください。";
          $("input", options)?.focus();
          return;
        }
        answerQuiz(index, Number(selected.value));
      });

      return article;
    }

    function renderQuiz() {
      const list = $(config.list);
      if (!list) return;
      list.replaceChildren();
      config.data.forEach((item, index) => list.append(createQuizCard(item, index, quizState[index])));
      const answered = quizState.filter((state) => state.answered).length;
      setText(config.answered, `${answered} / ${config.data.length}`);
      window.requestAnimationFrame(refreshPageProgress);
    }

    function answerQuiz(index, selected) {
      if (quizState[index].answered) return;
      quizState[index] = {
        answered: true,
        selected,
        correct: selected === config.data[index].answer
      };
      renderQuiz();

      const list = $(config.list);
      const updatedCard = $(`[data-quiz-index="${index}"]`, list);
      const feedback = $(".quiz-feedback", updatedCard);
      if (feedback) feedback.focus();
      if (quizState.every((state) => state.answered)) showQuizResult();
    }

    function showQuizResult() {
      const result = $(config.result);
      const message = $(config.message);
      if (!result || !message) return;
      const score = quizState.filter((state) => state.correct).length;

      if (score <= config.reviewMax) {
        message.replaceChildren(config.reviewMessage);
      } else if (score <= config.developingMax) {
        message.replaceChildren(config.developingMessage);
      } else {
        const nextLink = document.createElement("a");
        nextLink.href = config.completeHref;
        nextLink.textContent = config.completeLabel;
        message.replaceChildren(config.completeMessage, nextLink);
      }

      setText(config.score, score);
      result.hidden = false;
      result.focus();
    }

    function setup() {
      const list = $(config.list);
      if (!list || !config.data.length) return;
      resetQuizState();
      renderQuiz();
      const reset = $(config.reset);
      reset?.addEventListener("click", () => {
        resetQuizState();
        const result = $(config.result);
        if (result) result.hidden = true;
        renderQuiz();
        $("input", list)?.focus();
      });
    }

    return { setup };
  }

  function setupQuiz() {
    quizConfigs.forEach((config) => createQuizController(config).setup());
  }

  window.BFM.setupQuiz = setupQuiz;
})();

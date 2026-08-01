/**
 * Speed region lab
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
  const { $$, setText } = window.BFM;

  function setupSpeedLab() {
    const buttons = $$('[data-speed-region]');
    if (!buttons.length) return;

    const regions = {
      low: {
        name: "Low Speed / Lift Limit",
        desc: "迎角と揚力の限界へ近づきやすい領域です。強い旋回を続けると、速度を急速に失う場合があります。",
        benefit: "小さい旋回半径を作りやすい場合がある",
        caution: "失速と大きなエネルギー損失"
      },
      rate: {
        name: "Best Sustained Area",
        desc: "高い旋回率を比較的維持しやすい領域です。正確な速度帯は機体・重量・高度・搭載物で変わります。",
        benefit: "旋回率とエネルギー維持の両立",
        caution: "固定の速度値として暗記しない"
      },
      high: {
        name: "High Speed / Load Limit",
        desc: "許容荷重へ近づきやすく、速度が高いため旋回半径も大きくなり得る領域です。",
        benefit: "大きな運動エネルギー",
        caution: "大きい旋回半径とOvershoot"
      }
    };

    const select = (button) => {
      const info = regions[button.dataset.speedRegion];
      if (!info) return;
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      setText("#speed-region-name", info.name);
      setText("#speed-region-desc", info.desc);
      setText("#speed-benefit", info.benefit);
      setText("#speed-caution", info.caution);
    };

    buttons.forEach((button) => button.addEventListener("click", () => select(button)));
    select(buttons.find((button) => button.classList.contains("is-active")) || buttons[0]);
  }

  window.BFM.setupSpeedLab = setupSpeedLab;
})();

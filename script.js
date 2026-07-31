/* =========================================================
   BFM STARTER — interactive learning modules
   Content data is kept separate from rendering functions so it
   can be moved to JSON when the site becomes multi-page.
   ========================================================= */

"use strict";

document.documentElement.classList.add("js-enabled");

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
let refreshPageProgress = () => {};

const glossaryData = [
  {
    term: "BFM",
    ja: "基本戦闘機動",
    desc: "Basic Fighter Maneuversの略。固定された技の順番ではなく、相対位置を観察し、先を予測し、必要な機動を選び直す判断の基礎。",
    related: "observe / predict / maneuver",
    href: "#overview"
  },
  {
    term: "bandit",
    ja: "敵機",
    desc: "敵対していると識別された航空機を表す用語。この教材では、位置関係を考える相手の機体を指す。",
    related: "relative geometry / visual",
    href: "#principles"
  },
  {
    term: "angle of attack",
    ja: "迎角",
    desc: "翼が向く基準線と、翼に当たる空気の流れとの角度。増やしすぎると失速へ近づく。",
    related: "lift / stall / drag",
    href: "#energy"
  },
  {
    term: "lift",
    ja: "揚力",
    desc: "空気の流れによって生まれ、機体を支えたり旋回させたりする力。",
    related: "angle of attack / lift limit",
    href: "#energy"
  },
  {
    term: "drag",
    ja: "抗力",
    desc: "空気が機体の動きを妨げる方向に働く力。強い旋回では増えやすく、速度を失う原因になる。",
    related: "thrust / energy state",
    href: "#energy"
  },
  {
    term: "thrust",
    ja: "推力",
    desc: "エンジンなどが機体を前へ進める方向に生み出す力。",
    related: "drag / airspeed",
    href: "#energy"
  },
  {
    term: "G-force",
    ja: "G（加速度の感覚）",
    desc: "加速や旋回によって機体や搭乗者にかかる加速度を、重力加速度との比で表す日常的な呼び方。",
    related: "load factor / load limit",
    href: "#energy"
  },
  {
    term: "load factor",
    ja: "荷重倍数",
    desc: "機体にかかる荷重が重力に対して何倍かを表す量。旋回の強さと関係する。",
    related: "G-force / load limit",
    href: "#energy"
  },
  {
    term: "stall",
    ja: "失速",
    desc: "翼が臨界迎角を超えるなどして気流が大きく剥離し、必要な揚力を保てなくなる状態。単なる低速と同義ではない。",
    related: "angle of attack / lift",
    href: "#energy"
  },
  {
    term: "airspeed",
    ja: "対気速度",
    desc: "周囲の空気に対する機体の速度。旋回性能とエネルギー状態を考える基本の量。",
    related: "energy state / rate band",
    href: "#energy"
  },
  {
    term: "energy state",
    ja: "エネルギー状態",
    desc: "主に速度と高度の組み合わせとして見る、機体が機動に使えるエネルギーの状態。",
    related: "airspeed / altitude",
    href: "#energy"
  },
  {
    term: "energy management",
    ja: "エネルギー管理",
    desc: "速度と高度を、旋回や位置取りのために使う・温存する・回復する判断。",
    related: "energy state / nose position",
    href: "#principles"
  },
  {
    term: "turn rate",
    ja: "旋回率",
    desc: "単位時間あたりに機首方向が変わる角度。例として度毎秒で表す。",
    related: "turn radius / Rate Fight",
    href: "#turn-performance"
  },
  {
    term: "turn radius",
    ja: "旋回半径",
    desc: "旋回円の中心から機体までの距離。小さいほど狭い空間で向きを変えられる。",
    related: "turn rate / Radius Fight",
    href: "#turn-performance"
  },
  {
    term: "instantaneous turn rate",
    ja: "瞬間旋回率",
    desc: "短時間に発揮できる旋回率。大きく向きを変えられても、速度や高度などのエネルギーを失う場合がある。",
    related: "sustained turn rate / Ps",
    href: "#turn-performance"
  },
  {
    term: "sustained turn rate",
    ja: "持続旋回率",
    desc: "速度や高度を大きく失わず、継続して保てる旋回率。瞬間的な最大値とは分けて考える。",
    related: "instantaneous turn rate / Ps",
    href: "#turn-performance"
  },
  {
    term: "rate band",
    ja: "持続旋回に適した速度帯",
    desc: "比較的少ないエネルギー損失で高い旋回率を保ちやすい速度帯。機体や条件によって変わる。",
    related: "turn rate / energy state",
    href: "#energy"
  },
  {
    term: "lift limit",
    ja: "揚力限界",
    desc: "主に低速側で、現在の状態から生み出せる揚力の上限に近い状態。速度を急速に失いやすい。",
    related: "lift / stall",
    href: "#energy"
  },
  {
    term: "load limit",
    ja: "荷重限界",
    desc: "主に高速側で、機体が許容する荷重の上限に達した状態。高速でも小さく回れるとは限らない。",
    related: "load factor / turn radius",
    href: "#energy"
  },
  {
    term: "range",
    ja: "距離",
    desc: "2機の直線距離。近すぎ・遠すぎの両方が問題になり、距離だけでは有利不利を決められない。",
    related: "angles / closure",
    href: "#geometry"
  },
  {
    term: "angles",
    ja: "角度・位置関係",
    desc: "2機の位置だけでなく、双方の機首方向や飛行経路を含む広い相対関係。",
    related: "Aspect Angle / HCA / range",
    href: "#geometry"
  },
  {
    term: "Aspect Angle",
    ja: "アスペクト角",
    desc: "相手機の尾部方向を0度として、相手機から見た自機の位置を表す角度。自機の機首方向には左右されない。",
    related: "HCA / ATA / angles",
    href: "#geometry"
  },
  {
    term: "Heading Crossing Angle (HCA)",
    ja: "機首方位の交差角",
    desc: "2機の機首が向く方向の差を表す角度。位置を表すAspect Angleとは区別して読む。",
    related: "Aspect Angle / headings",
    href: "#geometry"
  },
  {
    term: "Antenna Train Angle (ATA)",
    ja: "自機の機首と視線の角度",
    desc: "自機の機首方向と、相手機へ向かう視線との間の角度。相手機が機首正面からどれだけ外れて見えるかを表す。",
    related: "Aspect Angle / line of sight",
    href: "#geometry"
  },
  {
    term: "Specific Excess Power (Ps)",
    ja: "比余剰出力",
    desc: "機体がエネルギーを増やしているか、維持しているか、失っているかを見る指標。正なら増加、0付近なら維持、負なら減少を表す。",
    related: "energy state / sustained turn rate",
    href: "#energy"
  },
  {
    term: "closure",
    ja: "接近率",
    desc: "2機の距離が変わる速さ。この教材では正を接近、0付近を一定、負を離隔として扱う。",
    related: "range / overshoot",
    href: "#geometry"
  },
  {
    term: "pursuit",
    ja: "追跡",
    desc: "相手に対して機首や飛行経路をどこへ向けるかという考え方。Lead・Pure・Lagに分けて学ぶ。",
    related: "lead / pure / lag",
    href: "#pursuit"
  },
  {
    term: "lead pursuit",
    ja: "前方追跡",
    desc: "敵機の進行方向の前へ機首を向ける追跡。距離を詰めやすいが、接近率が大きくなりやすい。",
    related: "closure / overshoot",
    href: "#pursuit"
  },
  {
    term: "pure pursuit",
    ja: "純粋追跡",
    desc: "敵機の現在位置そのものへ機首を向ける追跡。LeadとLagの中間に見える。",
    related: "lead pursuit / lag pursuit",
    href: "#pursuit"
  },
  {
    term: "lag pursuit",
    ja: "後方追跡",
    desc: "敵機の後方へ機首を向ける追跡。接近率を抑え、後方位置を保つために使う。",
    related: "closure / turning room",
    href: "#pursuit"
  },
  {
    term: "overshoot",
    ja: "有利な後方位置を越えること",
    desc: "接近しすぎたり飛行経路を越えたりして、有利な後方位置を維持できなくなる状態。",
    related: "closure / flight-path overshoot",
    href: "#overshoot"
  },
  {
    term: "in-close overshoot",
    ja: "近距離オーバーシュート",
    desc: "攻撃側が近づきすぎ、有利な後方位置を通り越してしまう状態。",
    related: "overshoot / closure",
    href: "#overshoot"
  },
  {
    term: "flight-path overshoot",
    ja: "飛行経路オーバーシュート",
    desc: "攻撃側が敵機の飛行経路を横切ってしまう状態。発生位置で危険度が変わる。",
    related: "pursuit / angles",
    href: "#overshoot"
  },
  {
    term: "turn circle",
    ja: "旋回円",
    desc: "航空機が旋回しながら描く円。速度や旋回性能によって大きさが変わる。",
    related: "turn radius / turning room",
    href: "#turn-circle"
  },
  {
    term: "misaligned turn circles",
    ja: "ずれた旋回円",
    desc: "2機の旋回円の中心や面、位置が一致していない状態。同じ方向へ旋回していても起こる。",
    related: "turn circle / extend",
    href: "#alignment"
  },
  {
    term: "turning room",
    ja: "旋回に使える空間",
    desc: "機体が目的の位置へ向きを変えるために使える空間。相手機の飛行経路との位置関係から考え、単なる直線距離とは分けて読む。",
    related: "turn circle / turn radius",
    href: "#turn-circle"
  },
  {
    term: "extend",
    ja: "延伸する",
    desc: "一時的に相手から距離を取り、位置関係やエネルギーを整えること。状況を自動でリセットする万能手段ではない。",
    related: "energy management / alignment",
    href: "#alignment"
  },
  {
    term: "One-Circle Fight",
    ja: "ワン・サークル戦",
    desc: "2機が1つの旋回空間を作る流れ。一般に旋回半径が重要になりやすい。",
    related: "Radius Fight / turn radius",
    href: "#circle-fight"
  },
  {
    term: "Two-Circle Fight",
    ja: "ツー・サークル戦",
    desc: "2機がそれぞれ別の旋回円を作る流れ。一般に持続旋回率が重要になりやすい。",
    related: "Rate Fight / turn rate",
    href: "#circle-fight"
  },
  {
    term: "Radius Fight",
    ja: "旋回半径を重視する戦い",
    desc: "One-Circle Fightの別名。一般に小さいTurn Radiusが有利になりやすい流れ。",
    related: "One-Circle / turn radius",
    href: "#circle-fight"
  },
  {
    term: "Rate Fight",
    ja: "旋回率を重視する戦い",
    desc: "Two-Circle Fightの別名。一般に高い持続Turn Rateが有利になりやすい流れ。",
    related: "Two-Circle / turn rate",
    href: "#circle-fight"
  },
  {
    term: "Plane of Motion",
    ja: "運動面",
    desc: "航空機が描く旋回円が置かれている面。実際の機動は3次元で考える。",
    related: "In-plane / Out-of-plane",
    href: "#plane-motion"
  },
  {
    term: "In-plane Maneuvering",
    ja: "同一面内の機動",
    desc: "2機の旋回面がほぼ同じ状態で行う機動。上面の2次元図で理解しやすい。",
    related: "Plane of Motion / One-Circle",
    href: "#plane-motion"
  },
  {
    term: "Out-of-plane Maneuvering",
    ja: "異なる面を使う機動",
    desc: "一方が旋回面を傾け、垂直方向を含む別の面で行う機動。距離やエネルギーの調整につながる。",
    related: "Plane of Motion / energy",
    href: "#plane-motion"
  },
  {
    term: "Tracking Guns",
    ja: "継続追跡の射撃機会",
    desc: "敵機を照準位置へ継続して捉えられる、比較的安定した位置関係。ここでは概念だけを扱う。",
    related: "stable tracking / Snapshot",
    href: "#guns"
  },
  {
    term: "Snapshot",
    ja: "一瞬の交差射撃機会",
    desc: "敵機が照準位置を短時間だけ横切る機会。安定追跡ではなく、未来位置の予測が必要になる概念。",
    related: "Tracking Guns / angles",
    href: "#guns"
  }
];

const quizData = [
  {
    question: "BFMの学び方として最も適切なのはどれですか？",
    options: ["決められた技を順番どおりに繰り返す", "観察・予測・機動を繰り返し、状況に応じて選び直す", "速度だけを一定に保つ", "最初に選んだ機動を最後まで変えない"],
    answer: 1,
    explanation: "BFMは固定された技の手順ではありません。相対位置を観察し、次の変化を予測し、必要な機動を選ぶ判断を繰り返します。",
    href: "#overview",
    section: "BFMとは何か"
  },
  {
    question: "BFMで同時に確認する3つの要素はどれですか？",
    options: ["高度・燃料・時間", "Range・Angles・Closure", "推力・重量・気温", "翼幅・塗装・機種名"],
    answer: 1,
    explanation: "距離、角度・位置関係、接近率の3つを同時に確認します。後方に見えても、この3つが整っていなければ有利な位置は維持できません。",
    href: "#overview",
    section: "BFMの目的"
  },
  {
    question: "「Lose sight, lose the fight.」が伝える中心的な意味は？",
    options: ["計器だけを見続ける", "速度を必ず最大にする", "敵機を継続して視認する", "敵機からすぐ離れる"],
    answer: 2,
    explanation: "相手を見失うと位置変化や次の行動を判断できません。自機を操縦しながら、相手との相対位置を見続けることが基本です。",
    href: "#principles",
    section: "BFMの3原則"
  },
  {
    question: "Aspect AngleとHCAの違いとして正しい説明はどれですか？",
    options: ["Aspect Angleは相手機から見た自機の位置、HCAは2機の機首方位差を表す", "Aspect Angleは機首方位差、HCAは距離を表す", "どちらも接近率だけを表す", "どちらも高度差だけを表す"],
    answer: 0,
    explanation: "Aspect Angleは相手機の尾部方向を基準に、自機がどの位置にいるかを示します。HCAは2機の機首が向く方向の差で、位置と向きを混同しないことが大切です。",
    href: "#geometry",
    section: "Aspect AngleとHCA"
  },
  {
    question: "Lag Pursuitを使う主な目的として最も適切なのは？",
    options: ["Closureを抑えて後方位置を保つ", "最短時間で距離を詰める", "必ず相手の前へ出る", "旋回面を垂直にする"],
    answer: 0,
    explanation: "Lag Pursuitは敵機の後方へ機首を向け、接近率を抑えやすくします。Overshootを避け、後方位置を維持したい場面で役立ちます。",
    href: "#pursuit",
    section: "Pursuit Curves"
  },
  {
    question: "Closureが大きすぎると、何が起こりやすくなりますか？",
    options: ["必ず失速する", "Overshootする", "高度差が必ずなくなる", "旋回半径が0になる"],
    answer: 1,
    explanation: "距離が急速に縮まると、相手や相手の飛行経路を越えやすくなります。Lagの利用や速度・経路の調整でClosureを管理します。",
    href: "#overshoot",
    section: "Overshoot"
  },
  {
    question: "Two-Circle Fightで一般に重要になりやすい性能は？",
    options: ["小さいTurn Radiusだけ", "高い持続Turn Rate", "最大直線速度だけ", "最小高度"],
    answer: 1,
    explanation: "Two-Circleではそれぞれの旋回円を進み、先に機首を向ける持続旋回率が重要になりやすいです。ただし、初期位置やエネルギーなどでも結果は変わります。",
    href: "#circle-fight",
    section: "Two-Circle Fight"
  },
  {
    question: "One-Circle Fightで一般に重要になりやすい性能は？",
    options: ["小さいTurn Radius", "最大航続距離", "機体の塗装", "高いClosure"],
    answer: 0,
    explanation: "One-Circleは1つの旋回空間を作り、一般に小さい旋回半径が機首を先に向ける助けになります。だからRadius Fightとも呼ばれます。",
    href: "#circle-fight",
    section: "One-Circle Fight"
  },
  {
    question: "Misaligned Turn Circlesとは、どのような状態ですか？",
    options: ["2機が完全に停止した状態", "旋回円の中心・位置・面がずれた状態", "常に同じ円を飛ぶ状態", "2機の速度が必ず等しい状態"],
    answer: 1,
    explanation: "同じ方向へ旋回していても、2機の旋回円が一致するとは限りません。中心や面のずれを認識しないと、安定した後方位置を保ちにくくなります。",
    href: "#alignment",
    section: "Turn Circle Alignment"
  },
  {
    question: "Out-of-plane Maneuveringが利用するものは？",
    options: ["同じ平面だけ", "垂直方向を含む異なる旋回面", "地図上の直線だけ", "通信だけ"],
    answer: 1,
    explanation: "一方の機体が旋回面を傾け、相手と異なる面で機動します。垂直方向の空間を使い、速度・距離・Closure・旋回半径の調整につなげます。",
    href: "#plane-motion",
    section: "Plane of Motion"
  },
  {
    question: "Tracking GunsとSnapshotの違いとして適切なのは？",
    options: ["どちらも全く同じ", "Trackingは継続追跡、Snapshotは一瞬の交差機会", "Trackingは距離だけを見る", "Snapshotは安定追跡だけ"],
    answer: 1,
    explanation: "Trackingは相手を照準位置へ継続して捉えられる状態です。Snapshotは相手が照準位置を一瞬だけ横切る短い機会です。",
    href: "#guns",
    section: "射撃機会の基礎"
  },
  {
    question: "瞬間旋回率と持続旋回率の違いとして適切なのは？",
    options: ["どちらも常に同じ値になる", "瞬間旋回は必ずエネルギーを増やす", "瞬間旋回はエネルギーを消費し得るが、持続旋回は速度や高度を保てる範囲を重視する", "持続旋回は機体が停止した状態を指す"],
    answer: 2,
    explanation: "高い瞬間旋回率は短時間に大きく向きを変えられる一方、速度や高度を失う場合があります。持続旋回率は、エネルギーを大きく減らさず保てる旋回を考えます。",
    href: "#turn-performance",
    section: "旋回性能とエネルギー"
  }
];

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function setupMenu() {
  const button = $("#menu-toggle");
  const nav = $("#global-nav");
  if (!button || !nav) return;

  const closeMenu = (restoreFocus = false) => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "メニューを開く");
    nav.classList.remove("is-open");
    if (restoreFocus) button.focus();
  };

  button.addEventListener("click", () => {
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(shouldOpen));
    button.setAttribute("aria-label", shouldOpen ? "メニューを閉じる" : "メニューを開く");
    nav.classList.toggle("is-open", shouldOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      closeMenu(true);
    }
  });
}

function setupProgressAndScrollSpy() {
  const bar = $("#reading-progress-bar");
  const percent = $("#progress-percent");
  const progressContainer = $(".index-progress");
  const progressVisual = $(".reading-progress");
  const sections = $$("[data-section]");
  const indexLinks = $$(".section-index a");
  const globalLinks = $$(".global-nav a");

  const updateProgress = () => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const value = Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100)));
    if (bar) bar.style.width = `${value}%`;
    if (percent) percent.textContent = `${value}%`;
    if (progressContainer) progressContainer.setAttribute("aria-valuenow", String(value));
    if (progressVisual) progressVisual.setAttribute("aria-valuenow", String(value));
  };
  refreshPageProgress = updateProgress;

  let scheduled = false;
  const requestUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      updateProgress();
      scheduled = false;
    });
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  updateProgress();

  if (!("IntersectionObserver" in window)) return;

  const setActive = (id) => {
    [...indexLinks, ...globalLinks].forEach((link) => {
      const matches = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", matches);
      if (matches) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.05, 0.2] }
  );

  sections.forEach((section) => observer.observe(section));
}

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

function createQuizCard(item, index, state) {
  const article = document.createElement("article");
  article.className = "quiz-card";
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
  article.className = "glossary-card";
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

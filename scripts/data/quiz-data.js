/**
 * Quiz data
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
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
      question: "瞬間旋回率と持続旋回率の違いとして適切なのは？",
      options: ["どちらも常に同じ値になる", "瞬間旋回は必ずエネルギーを増やす", "瞬間旋回はエネルギーを消費し得るが、持続旋回は速度や高度を保てる範囲を重視する", "持続旋回は機体が停止した状態を指す"],
      answer: 2,
      explanation: "高い瞬間旋回率は短時間に大きく向きを変えられる一方、速度や高度を失う場合があります。持続旋回率は、エネルギーを大きく減らさず保てる旋回を考えます。",
      href: "#turn-performance",
      section: "旋回性能とエネルギー"
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
      question: "Misaligned Turn Circlesとは、どのような状態ですか？",
      options: ["2機が完全に停止した状態", "旋回円の中心・位置・面がずれた状態", "常に同じ円を飛ぶ状態", "2機の速度が必ず等しい状態"],
      answer: 1,
      explanation: "同じ方向へ旋回していても、2機の旋回円が一致するとは限りません。中心や面のずれを認識しないと、安定した後方位置を保ちにくくなります。",
      href: "#alignment",
      section: "Turn Circle Alignment"
    },
    {
      question: "One‑Circle Fightで一般に重要になりやすい性能は？",
      options: ["小さいTurn Radius", "最大航続距離", "機体の塗装", "高いClosure"],
      answer: 0,
      explanation: "One‑Circleは1つの旋回空間を作り、一般に小さい旋回半径が機首を先に向ける助けになります。だからRadius Fightとも呼ばれます。",
      href: "#circle-fight",
      section: "One‑Circle Fight"
    },
    {
      question: "Two‑Circle Fightで一般に重要になりやすい性能は？",
      options: ["小さいTurn Radiusだけ", "高い持続Turn Rate", "最大直線速度だけ", "最小高度"],
      answer: 1,
      explanation: "Two‑Circleではそれぞれの旋回円を進み、先に機首を向ける持続旋回率が重要になりやすいです。ただし、初期位置やエネルギーなどでも結果は変わります。",
      href: "#circle-fight",
      section: "Two‑Circle Fight"
    },
    {
      question: "Out‑of‑plane Maneuveringが利用するものは？",
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
    }
  ];

  const offensiveQuizData = [
    {
      question: "Offensive BFMで最も重視する考え方はどれですか？",
      options: ["技を決めた順番で最後まで続ける", "Range・Angles・Closureを整え、攻撃優位を維持する", "常に最短距離だけを選ぶ", "速度を一定に保つ"],
      answer: 1,
      explanation: "Offensive BFMは技の固定手順ではありません。RACを整えて機会を作り、選択後も優位が残るかを読み続けます。",
      href: "#offensive-overview",
      section: "Offensive BFMとは"
    },
    {
      question: "Turn Circleへ早すぎるタイミングで入る主な問題はどれですか？",
      options: ["必ず距離が離れる", "Flight-Path Overshootと相手の反転機会を招きやすい", "Turning Roomが無限に増える", "Closureが必ずゼロになる"],
      answer: 1,
      explanation: "早すぎる進入は距離とClosureの余裕を失い、相手へReversal opportunityを渡しやすくなります。",
      href: "#offensive-entry",
      section: "Attack Window"
    },
    {
      question: "High Yo-Yoを考える状況として最も適切なのはどれですか？",
      options: ["Closureが大きくOvershootが進みつつある", "距離が離れ続けて近づけない", "相手を見失った", "高度を必ず失いたい"],
      answer: 0,
      explanation: "High Yo-Yoは速度を高度へ移し、Closureを抑えて後方関係を作り直す方向の調整です。",
      href: "#offensive-yoyos",
      section: "High / Low Yo-Yo"
    },
    {
      question: "Low Yo-Yoの主なEnergy tradeはどれですか？",
      options: ["速度を高度へ移す", "高度を速度へ移す", "Rangeを高度へ移す", "Anglesを燃料へ移す"],
      answer: 1,
      explanation: "Low Yo-Yoは高度を速度へ移し、Lagに残りすぎた距離を詰める方向の調整です。",
      href: "#offensive-yoyos",
      section: "High / Low Yo-Yo"
    },
    {
      question: "Lag Displacement Rollの説明として適切なのはどれですか？",
      options: ["相手の飛行経路を正確になぞる", "旋回面をずらしてClosureと後方位置を作り直す", "常にLead Pursuitを強める", "High-Aspectへ必ず移行する"],
      answer: 1,
      explanation: "Lag Displacement RollはPlane of Motionから外れて位置をずらし、In-close Overshootを避ける余裕を作る考え方です。",
      href: "#offensive-overshoot",
      section: "Overshoot管理"
    },
    {
      question: "攻撃側にとってScissorsをどう捉えるのが適切ですか？",
      options: ["最初から積極的に目指す状態", "攻撃優位が崩れ、役割逆転の危険がある状態", "必ずTwo‑Circleになる状態", "速度だけで勝敗が決まる状態"],
      answer: 1,
      explanation: "ScissorsはOvershootと反転から生じる低速の関係で、攻撃優位が不安定になった警告として読みます。",
      href: "#offensive-overshoot",
      section: "Overshoot管理"
    },
    {
      question: "相手のRedefinitionを認識した直後に行うべきことはどれですか？",
      options: ["以前の追跡をそのまま続ける", "Departure pointとRAC、Energyを読み直す", "相手と同じ運動面へ必ず入る", "One‑Circleを固定する"],
      answer: 1,
      explanation: "運動面や旋回関係が変わると、以前の追跡判断は前提を失います。変化後の関係を再評価します。",
      href: "#offensive-responses",
      section: "Defender Response"
    },
    {
      question: "攻撃優位が中立化してHigh-Aspectへ移ったときの考え方はどれですか？",
      options: ["攻撃側だった前提を維持する", "Energy・Geometry・Turning Room・高度余裕からFlowを選び直す", "機体名だけでOne／Two‑Circleを決める", "必ずNose-lowを選ぶ"],
      answer: 1,
      explanation: "中立化後は以前の役割を捨て、現在のEnergy・Geometry・Turning Room・高度余裕から新しいFlowを考えます。",
      href: "#high-aspect",
      section: "High-Aspect BFM"
    }
  ];

  window.BFM.quizData = quizData;
  window.BFM.offensiveQuizData = offensiveQuizData;
})();

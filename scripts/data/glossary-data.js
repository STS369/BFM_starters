/**
 * Glossary data
 * Uses the shared window.BFM namespace so it works over HTTP and file://.
 */

(() => {
  "use strict";

  window.BFM = window.BFM || {};
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
      term: "induced drag",
      ja: "誘導抗力",
      desc: "揚力を生み出すことに伴って生じる抗力。旋回で大きな揚力を求めるほど増えやすい。",
      related: "lift / angle of attack / energy",
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
      term: "energy expenditure / energy trade",
      ja: "エネルギーの消費・交換",
      desc: "速度や高度として持つエネルギーを、一時的な旋回率や機首位置へ交換する考え方。資料によって表現が異なる。",
      related: "energy state / instantaneous turn rate",
      href: "#energy"
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
      term: "Angle Off Tail (AOT)",
      ja: "相手の尾部方向を基準にした角度",
      desc: "相手の尾部方向を基準に自機の位置を表す語。Aspect Angleとほぼ同じ意味で使われる場合があるため、資料ごとの定義を確認する。",
      related: "Aspect Angle / HCA / angles",
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
      term: "Line of Sight Rate (LOSR)",
      ja: "視線方向が動く速さ",
      desc: "視界の中で、相手機へ向く視線方向がどの向きへ、どの速さで動くかを表す見方。相手の次の位置を考える手掛かりになる。",
      related: "line of sight / closure / flight path",
      href: "offensive-bfm.html#offensive-geometry"
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
      term: "reversal opportunity",
      ja: "旋回方向を変えて関係を作り直す機会",
      desc: "相手が飛行経路を越えたあとなどに、旋回方向を変えて位置関係を作り直せる可能性。発生しても自動的な逆転を意味しない。",
      related: "overshoot / range / HCA",
      href: "#overshoot"
    },
    {
      term: "role reversal",
      ja: "攻守の役割逆転",
      desc: "追う側と追われる側の位置的な役割が入れ替わること。単なる旋回方向の変更とは分けて考える。",
      related: "overshoot / reversal / scissors",
      href: "offensive-bfm.html#offensive-overshoot"
    },
    {
      term: "downrange travel",
      ja: "元の進行方向へ進む距離",
      desc: "旋回している間にも、元の進行方向へどれだけ先へ進むかを見る考え方。Scissorsでは前後位置の変化と合わせて読む。",
      related: "Flat Scissors / flight path / energy",
      href: "offensive-bfm.html#offensive-overshoot"
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
      term: "turn bubble",
      ja: "現在の旋回限界を表す空間の目安",
      desc: "現在の速度と旋回能力から考える、機体がすぐには内側へ向きを変えられない空間の目安。固定された球ではなく、状態によって変化する。",
      related: "turn radius / energy state",
      href: "#turn-circle"
    },
    {
      term: "control zone",
      ja: "Range・Angles・Closureを管理する後方領域",
      desc: "相手機の後方で、距離・角度・接近率を同時に管理しやすい3次元の領域。形や基準は資料と機種によって異なる。",
      related: "range / angles / closure",
      href: "#turn-circle"
    },
    {
      term: "attack / assessment window",
      ja: "進入条件を評価する位置や見え方の手掛かり",
      desc: "Control Zoneへ移る前にRange・Angles・Closureが整うかを評価する手掛かり。名称・形・判定基準は資料によって異なる。",
      related: "control zone / relative geometry",
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
      term: "One‑Circle Fight",
      ja: "ワン・サークル戦",
      desc: "2機が1つの旋回空間を作る流れ。一般に旋回半径が重要になりやすい。",
      related: "Radius Fight / turn radius",
      href: "#circle-fight"
    },
    {
      term: "merge",
      ja: "2機が近い位置ですれ違う局面",
      desc: "2機が近い位置ですれ違い、その後にOne‑CircleまたはTwo‑Circleの流れが形成される局面。",
      related: "One‑Circle / Two‑Circle",
      href: "#circle-fight"
    },
    {
      term: "flow",
      ja: "Merge後に形成される旋回の流れ",
      desc: "双方の飛行経路によって形作られるOne‑Circle、Two‑Circle、Scissorsなどの旋回関係。片方だけでは決まらない。",
      related: "merge / One‑Circle / Two‑Circle",
      href: "offensive-bfm.html#high-aspect"
    },
    {
      term: "lead turn",
      ja: "すれ違う前から始める旋回",
      desc: "利用できるTurning Roomを使い、Merge後の向きの差を小さくするため、すれ違う前から旋回を始める考え方。",
      related: "turning room / merge / geometry",
      href: "offensive-bfm.html#high-aspect"
    },
    {
      term: "nose-on / sensor nose on",
      ja: "相手へ機首またはセンサーの有効方向を向けた状態",
      desc: "相手へ機首またはセンサーの有効方向を向けられる状態。Sensor Noseの範囲は搭載システムや資料によって異なる。",
      related: "turn radius / One‑Circle",
      href: "#circle-fight"
    },
    {
      term: "Two‑Circle Fight",
      ja: "ツー・サークル戦",
      desc: "2機がそれぞれ別の旋回円を作る流れ。一般に持続旋回率が重要になりやすい。",
      related: "Rate Fight / turn rate",
      href: "#circle-fight"
    },
    {
      term: "Radius Fight",
      ja: "旋回半径を重視する戦い",
      desc: "One‑Circle Fightの別名。一般に小さいTurn Radiusが有利になりやすい流れ。",
      related: "One‑Circle / turn radius",
      href: "#circle-fight"
    },
    {
      term: "Rate Fight",
      ja: "旋回率を重視する戦い",
      desc: "Two‑Circle Fightの別名。一般に高い持続Turn Rateが有利になりやすい流れ。",
      related: "Two‑Circle / turn rate",
      href: "#circle-fight"
    },
    {
      term: "Plane of Motion",
      ja: "運動面",
      desc: "航空機が描く旋回円が置かれている面。実際の機動は3次元で考える。",
      related: "In‑plane / Out‑of‑plane",
      href: "#plane-motion"
    },
    {
      term: "In‑plane Maneuvering",
      ja: "同一面内の機動",
      desc: "2機の旋回面がほぼ同じ状態で行う機動。上面の2次元図で理解しやすい。",
      related: "Plane of Motion / One‑Circle",
      href: "#plane-motion"
    },
    {
      term: "Out‑of‑plane Maneuvering",
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
    },
    {
      term: "Offensive BFM",
      ja: "攻撃側の基本戦闘機動",
      desc: "有利な位置からRange・Angles・Closureを整え、攻撃機会を作りながら優位を維持する判断。固定された技の順番ではない。",
      related: "RAC / pursuit / control zone",
      href: "offensive-bfm.html#offensive-overview"
    },
    {
      term: "exclusive-use turning room",
      ja: "片方だけが使える旋回空間",
      desc: "2機の位置・高度・旋回円のずれにより、一方の機体だけが利用できるTurning Room。存在だけで優位は確定しない。",
      related: "turning room / geometry / altitude",
      href: "offensive-bfm.html#offensive-geometry"
    },
    {
      term: "High Yo-Yo",
      ja: "高度側を使う接近調整",
      desc: "速度を高度へ移し、Closureを抑えながら相手の後方関係を作り直すOut‑of‑planeの調整。",
      related: "closure / lag pursuit / energy trade",
      href: "offensive-bfm.html#offensive-yoyos"
    },
    {
      term: "Low Yo-Yo",
      ja: "低高度側を使う接近調整",
      desc: "高度を速度へ移し、Lag側に残りすぎたRangeを詰めるOut‑of‑planeの調整。Overshootと高度損失に注意する。",
      related: "range / lead pursuit / energy trade",
      href: "offensive-bfm.html#offensive-yoyos"
    },
    {
      term: "Lag Displacement Roll",
      ja: "後方へ位置をずらすロール",
      desc: "相手のPlane of Motionから外れて位置をずらし、Closureを抑えて後方関係を作り直す機動概念。",
      related: "in-close overshoot / lag pursuit / plane of motion",
      href: "offensive-bfm.html#offensive-overshoot"
    },
    {
      term: "Flat Scissors",
      ja: "同一面内で続く反転関係",
      desc: "2機が同じ面に近い状態で、飛行経路のOvershootと反転を繰り返す関係。攻撃側には役割逆転の危険がある。",
      related: "overshoot / reversal / downrange travel",
      href: "offensive-bfm.html#offensive-overshoot"
    },
    {
      term: "Rolling Scissors",
      ja: "立体的に続く反転関係",
      desc: "水平・垂直方向のOvershootが続き、2機が螺旋状の関係になる状態。相対位置とEnergyを読み続ける。",
      related: "overshoot / vertical / energy",
      href: "offensive-bfm.html#offensive-overshoot"
    },
    {
      term: "redefinition",
      ja: "戦いの関係が別の状態へ変わること",
      desc: "反転や運動面の変更によって、それまでの追跡関係やCircle flowが変わること。変化後はRACを読み直す。",
      related: "reversal / plane of motion / RAC",
      href: "offensive-bfm.html#offensive-responses"
    },
    {
      term: "Point of Departure",
      ja: "相手が元の運動関係から離れ始めた地点",
      desc: "相手がそれまでの運動面や旋回関係から離れ始めた位置。Redefinition後の経路を読む手がかり。",
      related: "redefinition / flight path / closure",
      href: "offensive-bfm.html#offensive-responses"
    },
    {
      term: "Ditch Follow",
      ja: "運動面の変更に対する追跡の組み直し",
      desc: "相手がNose-low側へ運動面を変えた後、Point of Departureと新しいRACを読み、移動したControl Zoneへつながるよう追跡関係を作り直す考え方。",
      related: "Ditch / Point of Departure / control zone",
      href: "offensive-bfm.html#offensive-responses"
    },
    {
      term: "Radius Defense Follow",
      ja: "旋回半径の変更に対する追跡の組み直し",
      desc: "相手がEnergyを使ってTurn Radiusを小さくした後、早い飛行経路交差を避けながら新しい旋回円へ追跡関係を作り直す考え方。",
      related: "Radius Defense / turn radius / redefinition",
      href: "offensive-bfm.html#offensive-responses"
    },
    {
      term: "High-Aspect BFM",
      ja: "互いに機首を向けやすい高Aspectの関係",
      desc: "両機が高Aspectで新しいMergeへ近づく状態。以前の攻撃優位が中立化したら、EnergyとGeometryからFlowを選び直す。",
      related: "merge / One‑Circle / Two‑Circle",
      href: "offensive-bfm.html#high-aspect"
    },
    {
      term: "neutralized",
      ja: "位置的な優位が中立化した状態",
      desc: "どちらにも明確で安定した後方優位がなく、以前の攻守関係を前提にできない状態。",
      related: "High-Aspect BFM / merge / role reversal",
      href: "offensive-bfm.html#high-aspect"
    }
  ];

  window.BFM.glossaryData = glossaryData;
})();

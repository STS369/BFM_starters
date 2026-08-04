# BFM Japan コンポーネントガイド

現在の外観と静的HTMLの読みやすさを保ちながら、再利用するUIの責務を明確にするためのガイドです。既存の機能クラスはJavaScriptや後方互換のフックとして残し、共通クラスをCSSの正式なAPIとして扱います。

## CSSファイル構成

CSSは役割別に9ファイルへ分け、次の順で読み込みます。順序もカスケードの一部なので変更しないでください。

1. `styles/tokens.css` — 色、文字サイズ、余白などのデザイントークン
2. `styles/base.css` — body、見出し、リンク、フォーカスなど文書の基礎
3. `styles/layout.css` — ヘッダー、ヒーロー、ページ幅、右上のMISSION INDEX
4. `styles/components.css` — 共通見出し、ボタン、カード、Callout
5. `styles/welcome.css` — Apple風スクロールウェルカム
6. `styles/lessons.css` — 図表、比較UI、各学習トピック固有の見た目
7. `styles/quiz.css` — 確認問題、回答状態、採点結果
8. `styles/glossary.css` — 用語検索、用語カード
9. `styles/responsive.css` — ブレークポイント、動き軽減、読みやすさの最終調整

## LessonHeader

各学習章の番号、タイトル、学習目標をまとめます。CSSでは `lesson-*` を主セレクターにします。

```html
<header class="module-header lesson-header">
  <div>
    <h2 class="numbered-module-title lesson-title">
      <span class="module-title-number lesson-number">02:</span>
      <span class="module-title-text lesson-title-text">BFMとは何か</span>
    </h2>
  </div>
  <p class="learning-goal lesson-goal"><span>学習目標</span>説明文</p>
</header>
```

## CardGrid / ContentCard

`card-grid` はカードを並べる共通の外枠です。列数やカード固有の見た目は `comparison-cards`、`principle-grid`、`triad`、`two-term-grid`、`guns-grid`、`course-choice-grid` が担当します。

`content-card` の役割別バリエーションは次のとおりです。

- `interactive-card` — 確認問題など操作を含むカード
- `reference-card` — 用語集など参照用カード
- `course-card` — 次の講座を選ぶカード

## Callout

`callout` を共通クラスとし、意味に応じて次のバリエーションを使います。

| バリエーション | 用途 | 互換クラス |
|---|---|---|
| `callout-summary` | 章の要点 | `checkpoint` |
| `callout-warning` | 注意・判断 | `warning-box` |
| `callout-advanced` | 発展内容 | `advanced-box` |
| `callout-bridge` | 次の概念との接続 | `bridge-note` |
| `callout-source` | 資料方針 | `source-notice` |
| `callout-status` | 講座の状態 | `no-figure-note` |
| `callout-scope` | 教材の範囲 | `safety-intro` |

## 固有コンポーネント

`WelcomeSequence`、`MissionReveal`、`TriangleFlow`、`SpeedLab`、`MissionIndex`、`Quiz`、`Glossary`、`CourseSelector`、`SiteRequest`、`SiteAbout` は、独立した名前と処理を維持します。

`SiteRequest` は第1章の学習手順のあとに置く控えめな注意欄です。`SiteAbout` はフッター内の「このサイトについて」として、学習を終えたあとに制作背景を読めるセクションです。

`WelcomeSequence` は3つのメッセージを順に表示し、「さあ始めましょう」と `assets/welcome-takeoff.mp4` の離陸映像を重ねます。`welcome-sequence.js` は下方向のスクロールから前方の目標時刻を求め、動画の通常再生で滑らかに追従させます。上方向では目標時刻を減らさないため逆再生せず、映像が完全に隠れた位置でだけ次回用に0秒へ戻します。背景では少し拡大して画面を埋め、音声は使用しません。最初のメッセージは、スマホで不自然な位置に折り返さないよう「ようこそ」と「BFM Japanへ」を別の `span` にしています。文言を変更するときも、各行が320px幅に収まるか確認してください。

`MissionReveal` は各 `mission-sequence` の先頭に置きます。MISSION INDEXのリンク先IDと `data-section` は外側の `mission-sequence` が持ち、導入画面の直後に実際の `.module` を置きます。導入タイトルと章タイトルは同じ文言にしてください。

`MissionIndex` は、旧「PART 01 ACTIVE」と同じヘッダー右端に単独の「目次」として配置したネイティブな `details` です。Part 1では18章、Part 2では11章のページ内項目だけを表示し、項目選択で同じページの `mission-sequence` へ移動します。左固定カラムとスプリッターは使用しません。JavaScriptは現在項目の強調、選択後・外側クリック・Escapeでの閉じる動作を補助します。

`Quiz` はPart 1とPart 2の確認問題を同じ実装で管理します。`scripts/data/quiz-data.js`の`quizData`と`offensiveQuizData`を、`scripts/components/quiz.js`の`quizConfigs`でそれぞれのDOM ID・得点境界・修了リンクへ対応させます。現在のページに存在しないクイズ設定は何もせず終了し、入力名と状態はPartごとに分離します。

## HTMLコンポーネントと生成

公開ページはPartごとに分け、`index.html` と `offensive-bfm.html` を短い表示枠だけにして、本文をページ別の生成済みJavaScriptから組み立てます。編集用ソースは次の単位へ分割しています。

- `src/index.template.html` — Part 1のhead、表示先、JavaScriptの読み込み順
- `src/offensive.template.html` — Part 2のhead、表示先、JavaScriptの読み込み順
- `src/app.template.html` — Part 1本文の外枠とHTML部品の読み込み順
- `src/offensive-app.template.html` — Part 2本文の外枠とHTML部品の読み込み順
- `src/partials/` — ページ別Header・Hero・MissionIndexと、共通Footer・SiteAbout
- `src/missions/` — Part 1 MISSION 01〜18の導入画面と本文
- `src/offensive-missions/` — Part 2 MISSION 01〜11の導入画面と本文

`src/app.template.html` の `<!-- @include missions/01-site-guide.html -->` や、`src/offensive-app.template.html` の `<!-- @include offensive-missions/01-overview.html -->` のような行を、`tools/build-html.mjs` が再帰的に展開します。Part 1は `scripts/generated-content.js`、Part 2は `scripts/generated-offensive-content.js` へ生成され、`scripts/content-loader.js` が各ページでコンポーネントの初期化前に本文を表示先へ挿入します。通信によるHTML取得は行わないため、HTTP公開時とWindowsからの直接表示の両方で動作します。

```powershell
node tools/build-html.mjs
node tools/build-html.mjs --check
```

`index.html`、`offensive-bfm.html`、`scripts/generated-content.js`、`scripts/generated-offensive-content.js` は生成物なので直接編集しません。変更は `src/` へ行い、4つの生成済みファイルもコミットします。

## JavaScriptコンポーネント

HTML本文は編集時にファイルを分割し、公開前にPart 1を `scripts/generated-content.js`、Part 2を `scripts/generated-offensive-content.js` へまとめます。JavaScriptが有効な環境ではHTTP公開時とWindowsからの直接表示の両方で動作します。JavaScript無効時は本文の代わりに有効化案内を表示します。操作機能は両ページで共用し、読み込み順付きの通常スクリプトへ分けます。

- `scripts/generated-content.js` — ビルドで生成するPart 1本文データ
- `scripts/generated-offensive-content.js` — ビルドで生成するPart 2本文データ
- `scripts/content-loader.js` — 本文を表示先へ挿入する起動前処理
- `scripts/main.js` — 起動順を管理するエントリーポイント
- `scripts/data/` — 確認問題と用語のデータ
- `scripts/utils/dom.js` — DOM共通処理
- `scripts/components/` — Menu、Progress、MissionIndex、SpeedLab、WelcomeSequence、MissionReveal、Quiz、Glossary

各ファイルは `window.BFM` 名前空間へ `setup...()` を登録し、`main.js` だけが初期化します。各公開ページは対応する生成コンテンツだけを先頭で読み込み、その後の共通スクリプト順は同一にします。HTMLのスクリプト順は依存関係の一部なので変更しないでください。

## レスポンシブの責務

モバイル向けの上書きは原則として `styles/responsive.css` に置きます。Part 1のApple風ウェルカム、両ページのMISSION導入画面に固有の幅・高さ調整だけは `styles/welcome.css` に置きます。Part 2の専用ヒーローも既存のHeroクラスとレスポンシブ規則を再利用します。

| 幅 | 主な切り替え |
|---|---|
| 940px以下 | モバイルメニューへの切り替え、右上目次の維持、本文1カラム化 |
| 720px以下 | 比較カード・図表・学習目標の1列化、章見出しと余白の縮小 |
| 430px以下 | クイズ操作、用語メタ情報、ボタン、フッターの縦配置 |
| 320〜430px | 見出しの見切れ、44px以上の操作領域、ページ全体の横スクロールを重点確認 |

横に長い表は `.table-wrap` の内側だけをスクロール可能にします。`body` の横幅へ表を押し出したり、文章や英単語を途中で強制改行したりしないでください。

## 変更時の確認

1. 共通構造は `styles/components.css`、教材固有の見た目は `styles/lessons.css`、画面幅への対応は `styles/responsive.css` へ記述します。
2. 既存の機能クラスは削除せず、共通クラスと組み合わせます。
3. 9つのCSSファイルの読み込み順を維持します。
4. 1440px、768px、430px、390px、375px、360px、320pxと `prefers-reduced-motion` を確認します。
5. `tests/smoke.mjs` でPart 1とPart 2の表示、目次、ページ間リンク、本文の挿入、クイズ、JavaScript無効時の案内を確認します。
6. `node tools/build-html.mjs --check` で2つの公開用HTMLと2つの生成コンテンツが最新か確認します。

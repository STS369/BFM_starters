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

## InfoStack

同じ幅と間隔で縦に並ぶ補足情報です。現在は「制作背景」「サイトの目的」「お願い」に使用します。間隔は `--component-stack-gap` で変更できます。

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

`WelcomeSequence`、`MissionReveal`、`TriangleFlow`、`SpeedLab`、`MissionIndex`、`Quiz`、`Glossary`、`CourseSelector` は、独立した名前と処理を維持します。

`WelcomeSequence` の最初のメッセージは、スマホで不自然な位置に折り返さないよう「ようこそ」と「BFM Japanへ」を別の `span` にしています。文言を変更するときも、各行が320px幅に収まるか確認してください。

`MissionReveal` は各 `mission-sequence` の先頭に置きます。MISSION INDEXのリンク先IDと `data-section` は外側の `mission-sequence` が持ち、導入画面の直後に実際の `.module` を置きます。導入タイトルと章タイトルは同じ文言にしてください。

`MissionIndex` は、旧「PART 01 ACTIVE」と同じヘッダー右端に単独の「目次」として配置したネイティブな `details` です。開くと18章の名前とページ進捗を表示し、項目選択で対応する `mission-sequence` へ移動します。左固定カラムとスプリッターは使用しません。JavaScriptは現在項目の強調、選択後・外側クリック・Escapeでの閉じる動作を補助します。

## HTMLコンポーネントと生成

公開ページは単一ページのまま、`index.html` を表示枠だけにして、本文を生成済みJavaScriptから組み立てます。編集用ソースは次の単位へ分割しています。

- `src/index.template.html` — head、表示先、JavaScriptの読み込み順
- `src/app.template.html` — ページ本文の外枠とHTML部品の読み込み順
- `src/partials/` — Header、WelcomeSequence、Hero、MissionIndex、Footer
- `src/missions/` — MISSION 01〜18の導入画面と本文

`src/app.template.html` の `<!-- @include missions/01-site-guide.html -->` のような行を、`tools/build-html.mjs` が再帰的に展開します。展開結果は `scripts/generated-content.js` へ生成され、`scripts/content-loader.js` が既存コンポーネントの初期化前に `index.html` の表示先へ挿入します。通信によるHTML取得は行わないため、HTTP公開時とWindowsからの直接表示の両方で動作します。

```powershell
node tools/build-html.mjs
node tools/build-html.mjs --check
```

`index.html` と `scripts/generated-content.js` は生成物なので直接編集しません。変更は `src/` へ行い、2つの生成済みファイルもコミットします。

## JavaScriptコンポーネント

HTML本文は編集時にファイルを分割し、公開前に `scripts/generated-content.js` へまとめます。JavaScriptが有効な環境ではHTTP公開時とWindowsからの直接表示の両方で動作します。JavaScript無効時は本文の代わりに有効化案内を表示します。操作機能は読み込み順付きの通常スクリプトへ分けます。

- `scripts/generated-content.js` — ビルドで生成する本文データ
- `scripts/content-loader.js` — 本文を表示先へ挿入する起動前処理
- `scripts/main.js` — 起動順を管理するエントリーポイント
- `scripts/data/` — 確認問題と用語のデータ
- `scripts/utils/dom.js` — DOM共通処理
- `scripts/components/` — Menu、Progress、MissionIndex、SpeedLab、WelcomeSequence、MissionReveal、Quiz、Glossary

各ファイルは `window.BFM` 名前空間へ `setup...()` を登録し、`main.js` だけが初期化します。HTMLのスクリプト順は依存関係の一部なので変更しないでください。

## レスポンシブの責務

モバイル向けの上書きは原則として `styles/responsive.css` に置きます。Apple風ウェルカムとMISSION導入画面に固有の幅・高さ調整だけは `styles/welcome.css` に置きます。

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
5. `tests/smoke.mjs` で表示、操作、本文の挿入、JavaScript無効時の案内を確認します。
6. `node tools/build-html.mjs --check` で公開用HTMLと生成コンテンツが最新か確認します。

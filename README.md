# BFM STARTER

日本人の初心者が「何を、どの順番で学ぶか」に迷わず、Basic Fighter Maneuvers（BFM：基本戦闘機動）を定義・位置・角度・エネルギーの順に学べるよう作った静的Web教材です。HTML5、CSS3、Vanilla JavaScriptだけで動作し、ビルドは不要です。

## 1. 設計方針

- 1ページを「ブリーフィング → 比較／操作 → 出典確認 → 要点 → 確認問題」の学習導線にしています
- 濃いネイビーを基調にしつつ、本文の読みやすさを優先しましたシアンは自機・現在状態、オレンジは敵機・注意点、赤は危険を表します
- 図版はNASA公式教材と、米海軍航空訓練資料を原典とするPublic Domain図だけを使用しています本文では小さな参照番号だけを示し、動画・書誌・原典・作者・権利表示・外部リンクは第17章へ集約しています
- 適切な公開図を確認できない箇所では図を新作せず、比較カード・定義・操作結果のUIで説明します
- 最上部でサイトの制作目的を伝え、上部ナビゲーションから「BFM入門」「Offensive BFM」「Defensive BFM」の3系統へ移動できます
- PART 01を完成範囲とし、確認問題を終えたあとにPART 02と03を選ぶ修了導線にしています
- 不明瞭になりやすい定義は、ユーザー提供の『Basic Employment Manual F-16C』第4章を照合し、図版や長文を転載せず初心者向けに要約しています
- セクションID、共通カード、共通ナビゲーションを再利用し、将来の複数ページ化に備えています

## 2. 情報設計と学習順序

最上部のウェルカムと「このサイトを作った目的」に続き、MISSION INDEXと本文は次の18章で対応しています。

1. BFMとは何か
2. 基礎講座の進め方
3. BFMの3原則
4. 旋回とエネルギー
5. Turn Rate / Radius
6. 2機の位置関係
7. Turning Room / Circle
8. Pursuit Curves
9. Overshoot
10. Circle Alignment
11. One / Two Circle
12. Plane of Motion
13. 射撃機会の基礎
14. 初心者の要点
15. 12問の確認問題
16. 用語集
17. 参考資料・出典
18. Next Part

## 3. ファイル構成

```text
DogfightLecture/
├── index.html          # PART 01本文、出典付き図版、SEO、参考資料、次講座の選択
├── styles/
│   ├── tokens.css       # 色・文字サイズ・余白
│   ├── base.css         # body、見出し、リンク、フォーカス
│   ├── layout.css       # ヘッダー、ページ幅、MISSION INDEX
│   ├── components.css   # カード、見出し、ボタン、Callout
│   ├── welcome.css      # Apple風ウェルカム
│   ├── lessons.css      # 各学習トピック固有
│   ├── quiz.css         # 確認問題と採点結果
│   ├── glossary.css     # 用語検索と用語カード
│   └── responsive.css   # 画面幅・動き軽減・読みやすさ
├── scripts/
│   ├── main.js                  # window.BFMに登録されたUIの起動処理
│   ├── utils/dom.js             # DOM共通処理
│   ├── data/
│   │   ├── quiz-data.js         # 確認問題データ
│   │   └── glossary-data.js     # 用語データ
│   └── components/
│       ├── menu.js
│       ├── progress.js
│       ├── mission-index.js
│       ├── speed-lab.js
│       ├── welcome-sequence.js
│       ├── quiz.js
│       └── glossary.js
├── COMPONENTS.md       # コンポーネントの責務と利用方法
├── README.md           # 設計・公開・拡張・確認手順
├── robots.txt          # 検索クローラー向け設定
├── sitemap.xml         # 公開ページ一覧
├── tests/
│   └── smoke.mjs       # 依存なしのChrome DevToolsスモークテスト
└── assets/
    ├── favicon.svg
    ├── og-bfm.svg
    ├── reference-nasa-four-forces.jpg
    ├── reference-usn-pursuit-curves.png
    └── reference-usn-circle-flow.png
```

ビルド不要の静的ファイル構成です。CSSは上記の順、JavaScriptは `index.html` に記載された依存順で読み込みます。将来は `offensive.html`、`defensive.html` などへ講座単位で分割できます。

## 4. ローカルで確認する

Windowsのエクスプローラーから `index.html` を直接開いても動作します。HTTP経由でGitHub Pagesに近い形を確認する場合は、このプロジェクトフォルダーで次を実行します。

```powershell
py -m http.server 4173
```

ブラウザーで `http://127.0.0.1:4173/` を開きます。

## 5. レスポンシブ設計

- 940px以下ではMISSION INDEXとスプリッターを非表示にし、ヘッダーをモバイルメニューへ切り替えます。
- 720px以下では比較カード、図表、学習目標を原則1列にし、本文の左右余白と見出しサイズを調整します。
- 430px以下ではクイズ操作、用語カード、ボタン、フッターを狭幅向けに再配置します。
- Apple風ウェルカムは縦画面と横画面で文字サイズと高さを切り替え、文が画面外へはみ出さないようにします。
- 横に長い表だけは `.table-wrap` 内で横スクロールでき、ページ全体には横スクロールを発生させません。
- 主要確認幅は320px、360px、375px、390px、430pxです。タッチ操作は44px以上を基準にしています。

## 6. GitHub Pagesで公開する

1. このフォルダーをGitHubリポジトリへコミットして、既定ブランチへpushします
2. GitHubのリポジトリ画面で **Settings → Pages** を開きます
3. **Build and deployment** のSourceを **Deploy from a branch** にします
4. Branchに既定ブランチ、Folderに `/(root)` を選び、Saveします
5. 表示された公開URLでCSS、JavaScript、ページ内リンクを再確認します
6. 公開URLが決まったら、`index.html`のコメント位置に `canonical` と `og:url` を追加します`og:image`も必要に応じて絶対URLへ変更します

すべての内部資産は相対パスなので、`https://ユーザー名.github.io/リポジトリ名/` のサブパスでも動作します

## 7. Offensive BFMを追加する

1. `index.html`を複製して `offensive.html`を作り、`main`内をPART 02の章へ差し替えます
2. `.module`、`.module-header`、`.learning-goal`、`.checkpoint`、`.interactive-panel`を再利用します
3. ナビゲーションのPART 02を通常リンクに変更し、`aria-disabled`と準備中表示を外します
4. High/Low Yo-Yoなどは、最初に学習目標・本文・比較UI・要点を用意します適切な公開図がある場合だけ原典と権利を確認して引用し、実機値や具体的武器操作は掲載しません
5. 参照した一次資料を参考資料へ追加します

## 8. Defensive BFMを追加する

1. 同様に `defensive.html`を作り、PART 03の共通ナビゲーションを有効にします
2. Break Turn、Reversal、Overshoot誘発、Energy回復などを独立した`.module`へ分けます
3. 攻撃側・防御側の色とラベルを図と本文で一貫させ、色だけで役割を伝えないようにします
4. 新しい用語を用語集へ追加し、関連する学習章へのリンクを設定します

## 9. 用語集を追加・修正する

`scripts/data/glossary-data.js`の`glossaryData`配列へ次の形で1件追加します

```js
{
  term: "英語",
  ja: "日本語訳",
  desc: "初心者向け説明",
  related: "関連語 / 関連語",
  href: "#関連セクション"
}
```

描画処理とは分離済みです複数ページ化するときは、この配列を`glossary.json`へ移し、`fetch`で読む構成にできますGitHub PagesではJSONファイルのパスを相対パスにしてください

## 10. クイズを追加する

`scripts/data/quiz-data.js`の`quizData`へ次の形で追加します

```js
{
  question: "問題文",
  options: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
  answer: 1,
  explanation: "2〜3文の解説",
  href: "#復習先",
  section: "復習先の表示名"
}
```

`answer`は0から始まる選択肢番号です問題数を変更した場合、得点メッセージの境界も`showQuizResult()`で見直してください

## 11. 参考資料を追加する

- `#references`の`references-list`へ、資料種別、正式名、説明、公式URL、参照日を追加します
- YouTubeは動画タイトル・チャンネル・動画URLを公開元で確認します
- 書籍は著者、発行元、年、ISBNを出版社または信頼できる書誌で確認します
- 確認できない情報はURLを推測せず「要確認」と表示します
- 本文の重要説明から`#ref-N`への脚注リンクを付けます

## 12. 動作確認チェックリスト

- [ ] `Get-ChildItem scripts -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }`が成功する
- [ ] ブラウザーのConsoleにエラーがない
- [ ] 最上部にサイトの制作目的が表示され、上部ナビゲーションが3系統になっている
- [ ] 各章は番号がタイトルの上に少し大きく表示され、タイトルが1行に収まる
- [ ] MISSION INDEXの縦スプリッターをドラッグまたは矢印キーで動かせる
- [ ] 320px、360px、375px、390px、430px、768px、1280px、1440pxでページ全体の横スクロールがない
- [ ] スマホ幅でApple風ウェルカム、章見出し、カード、表、クイズ、用語検索、Next Partが画面内に収まる
- [ ] モバイルの主要ボタンと選択肢が44px以上の操作領域を持つ
- [ ] Low / Rate Band / Highの3ボタンで説明・利点・注意点が変わる
- [ ] Aspect Angleの0°、90°、180°を比較表で確認できる
- [ ] Closureの接近・一定・離隔を比較表で確認できる
- [ ] Lead / Pure / Lag、Overshoot、Alignment、One/Two Circle、In/Out-planeを同時に比較できる
- [ ] NASA図と米海軍由来の2図が表示され、各図の参照番号から第17章へ移動できる
- [ ] 12問の各回答で正誤、正答、解説、復習リンクが表示される
- [ ] 0〜4、5〜8、9〜12点の最終メッセージが正しい
- [ ] 基礎修了後のコース選択にOffensive BFMとDefensive BFMの両方が表示される
- [ ] 再挑戦で選択・採点・結果が初期化される
- [ ] 用語集が全件表示され、英語・日本語・説明文で検索できる
- [ ] ページ進捗が0〜100%で更新される
- [ ] すべてのページ内リンクと外部リンクが正しい
- [ ] GitHub Pagesのリポジトリ配下URLで資産が404にならない

## 13. アクセシビリティ確認項目

- [ ] Tab順が見た目の順と一致し、すべての操作へ到達できる
- [ ] スキップリンクで本文へ移動できる
- [ ] フォーカスリングが常に見える
- [ ] モバイルメニューをEnter/Spaceで開閉し、Escapeで閉じられる
- [ ] 速度域ボタンをキーボードで操作でき、位置関係の2つの比較表を読める
- [ ] 引用画像に内容を説明する`alt`と、第17章へ移動する小さな参照番号がある
- [ ] 選択・正誤・危険度が色だけでなく文字でも分かる
- [ ] `prefers-reduced-motion: reduce`で装飾アニメーションが停止する
- [ ] JavaScript無効時も本文、学習目標、要点、注意事項を読める
- [ ] 200%ズームと320px幅で情報や操作を失わない
- [ ] NVDA + Edge/Chromeなどでナビ、タブ、クイズ、検索を一巡する

## 14. 参考資料の確認状態

掲載URLと書誌は2026-07-31に公開元または公式資料で確認しています外部サイトは将来変更される可能性があるため、リリースごとにリンクを再確認してください

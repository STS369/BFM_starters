# BFM Japan

日本人の初心者が「何を、どの順番で学ぶか」に迷わず、Basic Fighter Maneuvers（BFM：基本戦闘機動）を学べるよう作った静的Web教材です。Part 1「BFM入門」とPart 2「Offensive BFM」は、それぞれ独立したページで学べます。公開時はHTML5、CSS3、Vanilla JavaScriptだけで動作します。編集用HTMLは章ごとに分割し、依存ライブラリのないNode.jsスクリプトで、短い2つの公開用HTMLとページ別の生成コンテンツを作ります。

## 1. 設計方針

- 各Partを「ブリーフィング → 比較／操作 → 出典確認 → 要点 → 確認問題」の学習導線にしています
- 濃いネイビーを基調にしつつ、本文の読みやすさを優先しました。シアンは自機・現在状態、オレンジは敵機・注意点、赤は危険を表します
- 図版はNASA公式教材と、米海軍航空訓練資料を原典とするPublic Domain図だけを使用しています。本文では小さな参照番号だけを示し、書誌・原典・作者・権利表示・外部リンクは各ページの「参考資料・出典」へ集約しています
- 適切な公開図を確認できない箇所では図を新作せず、比較カード・定義・操作結果のUIで説明します
- BFM入門のヒーロー説明でサイトの目的を伝え、「お願い」は第1章の最後、制作背景はフッターの「このサイトについて」に配置しています。上部ナビゲーションからPart 1「BFM入門」とPart 2「Offensive BFM」を移動でき、Part 3「Defensive BFM」は準備中として示します
- 左固定目次とスプリッターは使用せず、各ページのヘッダー右上に単独の「目次」を配置します。Part 1では18章、Part 2では11章だけを表示し、項目を選ぶと同じページのMISSION導入へ移動します
- 各章へ入る前に、章番号とタイトルをApple風のスクロール連動表示で案内します。背景とグリッドは最上部の「ようこそBFM Japanへ」と統一し、本文との間に別パネルのような視差が生まれない構成です
- 検索結果で内容が伝わるよう、各ページのタイトルと説明文に正式名称・日本語名・対象者を明記し、ページ別のcanonical、OGP、構造化データと、robots.txt、sitemap.xmlを公開URLに統一しています
- 動きを減らす設定ではスクロール演出を静的表示へ切り替えます。JavaScript無効時は本文の代わりに有効化案内を表示します
- PART 01とPART 02を公開範囲とし、Part 1修了後は `offensive-bfm.html` へ、Part 2修了後は同ページ内の復習または準備中のDefensive BFMへ進む導線にしています
- 不明瞭になりやすい定義は、ユーザー提供の『Basic Employment Manual F-16C』第4章を照合し、図版や長文を転載せず初心者向けに要約しています
- Turn Bubble、Control Zone、AOT、Mergeなどは関連する既存章へ配置し、資料や機種によって定義が変わる語は固定値や固定形状として扱いません。索敵・Padlock・Lookoutはこの基礎講座の対象外です
- 2ページで同じセクション構造、共通カード、CSS、JavaScriptを再利用し、見た目と操作感を揃えています

## 2. 情報設計と学習順序

Part 1とPart 2は別ページです。どちらも専用のヒーロー、目次、章番号、参考資料、確認問題を持ちます。Part 1で共通する学び方と基礎概念を確認し、修了後にPart 2へ移動します。

### Part 1：BFM入門（`index.html`）

1. このサイトの進め方
2. BFMとは何か
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
15. 確認問題
16. 用語集
17. 参考資料・出典
18. Next Part

### Part 2：Offensive BFM（`offensive-bfm.html`）

1. Offensive BFMとは
2. 攻撃位置を読む
3. Attack Window
4. High / Low Yo-Yo
5. Overshoot管理
6. Defender Response
7. High-Aspect BFM
8. 要点整理
9. 確認問題
10. 参考資料・出典
11. Next Part

## 3. ファイル構成

```text
DogfightLecture/
├── index.html                  # Part 1の公開用表示シェル（直接編集しない）
├── offensive-bfm.html          # Part 2の公開用表示シェル（直接編集しない）
├── src/
│   ├── index.template.html          # Part 1のheadとCSS・JS読み込み順
│   ├── offensive.template.html      # Part 2のheadとCSS・JS読み込み順
│   ├── app.template.html            # Part 1の本文外枠と部品の読み込み順
│   ├── offensive-app.template.html  # Part 2の本文外枠と部品の読み込み順
│   ├── partials/                    # ページ別ヘッダー・ヒーロー・目次と共通フッター
│   ├── missions/                    # Part 1 MISSION 01〜18
│   └── offensive-missions/          # Part 2 MISSION 01〜11
├── tools/
│   └── build-html.mjs               # 2つのページと生成コンテンツを生成・照合
├── styles/
│   ├── tokens.css       # 色・文字サイズ・余白
│   ├── base.css         # body、見出し、リンク、フォーカス
│   ├── layout.css       # ヘッダー、ページ幅、右上目次
│   ├── components.css   # カード、見出し、ボタン、Callout
│   ├── welcome.css      # 最上部と各MISSIONのApple風導入
│   ├── lessons.css      # 各学習トピック固有
│   ├── quiz.css         # 確認問題と採点結果
│   ├── glossary.css     # 用語検索と用語カード
│   └── responsive.css   # 画面幅・動き軽減・読みやすさ
├── scripts/
│   ├── generated-content.js             # Part 1本文データ（直接編集しない）
│   ├── generated-offensive-content.js   # Part 2本文データ（直接編集しない）
│   ├── content-loader.js        # 生成本文を表示先へ挿入
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
│       ├── mission-reveal.js
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
    ├── reference-usn-circle-flow.png
    ├── reference-usn-high-yo-yo.png
    ├── reference-usn-low-yo-yo.png
    ├── reference-usn-rolling-scissors.png
    └── welcome-takeoff.mp4
```

公開される画面は、Part 1の `index.html` とPart 2の `offensive-bfm.html` の2ページです。編集後に `node tools/build-html.mjs` を実行し、2つのHTMLと `scripts/generated-content.js`、`scripts/generated-offensive-content.js` を一緒にコミットします。実行時の `fetch()` や外部テンプレート読み込みは使わず、各ページが対応する生成コンテンツを通常の外部JavaScriptとして読み込みます。共通CSSとJavaScriptは両ページで同じ順序にし、JavaScriptが有効ならWindowsからの直接表示とGitHub Pagesの両方で動作します。

## 4. ローカルで確認する

文章や構造を変更するときは、共通部品は `src/partials/`、Part 1は `src/missions/`、Part 2は `src/offensive-missions/` を編集し、プロジェクトフォルダーで次を実行します。

```powershell
node tools/build-html.mjs
node tools/build-html.mjs --check
```

1つ目は公開用の2ページと2つの生成コンテンツを生成し、2つ目は4つの生成物に生成し忘れがないかだけを確認します。生成後の `index.html` と `offensive-bfm.html` はWindowsのエクスプローラーから直接開いても動作します。HTTP経由でGitHub Pagesに近い形を確認する場合は、続けて次を実行します。

```powershell
py -m http.server 4173
```

ブラウザーでPart 1は `http://127.0.0.1:4173/`、Part 2は `http://127.0.0.1:4173/offensive-bfm.html` を開きます。

## 5. レスポンシブ設計

- 940px以下ではグローバルナビゲーションをモバイルメニューへ切り替えます。右上の学習目次はすべての画面幅で使用できます。
- 720px以下では比較カード、図表、学習目標を原則1列にし、本文の左右余白と見出しサイズを調整します。
- 430px以下ではクイズ操作、用語カード、ボタン、フッターを狭幅向けに再配置します。
- Apple風ウェルカムは3つの案内を順に表示し、最後に `assets/welcome-takeoff.mp4` の離陸映像へつなげます。動画は背景いっぱいに少し拡大し、下方向のスクロールへ滑らかに追従します。上方向では逆再生せず到達済みのフレームを保ち、映像が見えなくなってから次回用にリセットします。
- ウェルカムは縦画面と横画面で文字サイズと高さを切り替え、文が画面外へはみ出さないようにします。動きを減らす設定では離陸演出を表示しません。
- 横に長い表だけは `.table-wrap` 内で横スクロールでき、ページ全体には横スクロールを発生させません。
- 主要確認幅は320px、360px、375px、390px、430pxです。タッチ操作は44px以上を基準にしています。

## 6. GitHub Pagesで公開する

1. `node tools/build-html.mjs --check` が成功することを確認します
2. `src/`、生成済みの2つのHTML、2つの生成コンテンツを含む変更をGitHubリポジトリへコミットして、既定ブランチへpushします
3. GitHubのリポジトリ画面で **Settings → Pages** を開きます
4. **Build and deployment** のSourceを **Deploy from a branch** にします
5. Branchに既定ブランチ、Folderに `/(root)` を選び、Saveします
6. 表示された公開URLでPart 1とPart 2のCSS、JavaScript、ページ内リンク、ページ間リンクを再確認します
7. `canonical` と `og:url` はPart 1を `https://bfm-starters.netlify.app/`、Part 2を `https://bfm-starters.netlify.app/offensive-bfm.html` に設定しています。公開ドメインを変更した場合だけ両方を更新して再生成します

すべての内部資産は相対パスなので、`https://ユーザー名.github.io/リポジトリ名/` のサブパスでも動作します

現在の変更を既定ブランチへ反映する場合は、リポジトリ直下で次を実行します。`git add -A` のあとに `git status` を確認し、意図したファイルだけが登録されていることを確認してからコミットします。

```powershell
node tools/build-html.mjs --check
git status
git add -A
git status
git commit -m "Offensive BFMをPart 2ページとして追加"
git push origin main
```

## 7. Offensive BFMを修正・拡張する

1. Part 2の本文は `src/offensive-missions/01-overview.html` から `11-next.html` に分割されています
2. 章を増減した場合は `src/offensive-app.template.html` とPart 2用の目次partialの順序・番号・リンク先を同時に更新します
3. `.module`、`.lesson-header`、`.comparison-cards`、`.table-wrap`、`.reference-figure`、各 `callout-*` を再利用します
4. High / Low Yo-Yoなどは、学習目標・本文・比較UI・要点を一組にします。公開図は原典と再利用条件を確認できた場合だけ引用し、実機値や具体的武器操作は掲載しません
5. 新しい用語は `glossaryData`、確認問題は `offensiveQuizData`、資料と画像の権利情報はPart 2の第10章「参考資料・出典」へ追加します

## 8. Defensive BFMを追加する

1. Part 1やPart 2と同様に、専用のページテンプレートとMISSION用ディレクトリを追加し、共通ナビゲーションを有効にします
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

描画処理とは分離済みです。Partをまたぐリンクを追加する場合は、対象ページ名を含む相対URLにします

## 10. クイズを追加する

`scripts/data/quiz-data.js`にはPart 1用の`quizData`とPart 2用の`offensiveQuizData`があります。対象の配列へ次の形で追加します

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

`answer`は0から始まる選択肢番号です。問題数を変更した場合は、`scripts/components/quiz.js`の`quizConfigs`にある得点境界と、各Missionの合計表示も見直してください

## 11. 参考資料を追加する

- Part 1の資料は `src/missions/17-references.html`、Part 2の資料は `src/offensive-missions/10-references.html` の `references-list` へ追加します
- YouTubeは動画タイトル・チャンネル・動画URLを公開元で確認します
- 書籍は著者、発行元、年、ISBNを出版社または信頼できる書誌で確認します
- 確認できない情報はURLを推測せず「要確認」と表示します
- 本文の重要説明から、同じページにあるPart 1の`#ref-N`、Part 2の`#offensive-ref-N`へ脚注リンクを付けます。参照番号は各ページで初出順に並べます

## 12. 動作確認チェックリスト

- [ ] `Get-ChildItem scripts -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }`が成功する
- [ ] `node tools/build-html.mjs --check` が成功する
- [ ] ブラウザーのConsoleにエラーがない
- [ ] 最上部にサイトの制作目的が表示され、上部ナビゲーションが3系統になっている
- [ ] 各章は番号がタイトルの上に少し大きく表示され、タイトルが1行に収まる
- [ ] 左固定目次とスプリッターがなく、右上の「目次」でPart 1の18章、Part 2の11章をそれぞれ開閉できる
- [ ] 320px、360px、375px、390px、430px、768px、1280px、1440pxでページ全体の横スクロールがない
- [ ] スマホ幅でApple風ウェルカム、章見出し、カード、表、クイズ、用語検索、Next Partが画面内に収まる
- [ ] Part 1のMISSION 01〜18とPart 2のMISSION 01〜11がスクロールで表示され、各目次リンクが同じページの導入へ移動する
- [ ] モバイルの主要ボタンと選択肢が44px以上の操作領域を持つ
- [ ] Low / Rate Band / Highの3ボタンで説明・利点・注意点が変わる
- [ ] Aspect Angleの0°、90°、180°を比較表で確認できる
- [ ] Closureの接近・一定・離隔を比較表で確認できる
- [ ] Lead / Pure / Lag、Overshoot、Alignment、One/Two Circle、In/Out-planeを同時に比較できる
- [ ] NASA図と米海軍由来の引用図が表示され、各図の参照番号から同じページの「参考資料・出典」へ移動できる
- [ ] Part 1の12問とPart 2の8問で、正誤、正答、解説、復習リンクが表示される
- [ ] Part 1は0〜4、5〜8、9〜12点、Part 2は0〜3、4〜5、6〜8点の最終メッセージが正しい
- [ ] 基礎修了後のコース選択にOffensive BFMとDefensive BFMの両方が表示される
- [ ] 再挑戦で選択・採点・結果が初期化される
- [ ] 用語集が全件表示され、英語・日本語・説明文で検索できる
- [ ] ページ進捗が0〜100%で更新される
- [ ] Part 1とPart 2のページ内リンク、ページ間リンク、外部リンクが正しい
- [ ] GitHub Pagesのリポジトリ配下URLで資産が404にならない

## 13. アクセシビリティ確認項目

- [ ] Tab順が見た目の順と一致し、すべての操作へ到達できる
- [ ] スキップリンクで本文へ移動できる
- [ ] フォーカスリングが常に見える
- [ ] モバイルメニューをEnter/Spaceで開閉し、Escapeで閉じられる
- [ ] 速度域ボタンをキーボードで操作でき、位置関係の2つの比較表を読める
- [ ] 引用画像に内容を説明する`alt`と、同じページの「参考資料・出典」へ移動する小さな参照番号がある
- [ ] 選択・正誤・危険度が色だけでなく文字でも分かる
- [ ] `prefers-reduced-motion: reduce`で装飾アニメーションが停止する
- [ ] JavaScript無効時は本文の代わりに有効化と再読み込みの案内が表示される
- [ ] 200%ズームと320px幅で情報や操作を失わない
- [ ] NVDA + Edge/Chromeなどでナビ、タブ、クイズ、検索を一巡する

## 14. 参考資料の確認状態

掲載URLと書誌は2026-08-04までに公開元または公式資料で確認しています。外部サイトは将来変更される可能性があるため、リリースごとにリンクを再確認してください

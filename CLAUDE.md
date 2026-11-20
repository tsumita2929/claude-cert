# Claude 認定資格の学習教材（非公式）

Anthropic の Claude 認定資格 4つ（CCAO-F、CCDV-F、CCAR-F、CCAR-P）の、非公式の日本語教材を作るフォルダです。試験ごとに、問題集アプリ、音声講座、スライド、解説動画があります。制度の全体像は `shared/program.md`。

## フォルダの構成

```
<試験>/                       CCDV-F、CCAR-F、CCAR-P、CCAO-F（公式の試験コード）
  exam.json                   試験の設定（名称、問題数、分野と配点。CCDV-F はスキル、CCAR-F はシナリオも）
  reference/                  公式の試験ガイド（PDF とテキスト。手元にだけ置き、リポジトリには入れない）、出題範囲の調査メモ（blueprint.md）、教材の設計（outline.md）
  data/*.json  → index.html   問題集。`python3 <試験>/build.py` で検査してアプリを作る
  course/ch*.md               講座の本文（事実確認つき）。音声・スライド・動画の共通の素材
  audio/script.txt → *.m4a    音声講座。`python3 <試験>/audio/build_audio.py`
  slides/build_deck.js → *.pptx   スライド。`node <試験>/slides/build_deck.js`
  video/                      解説動画（cert-video スキル）
shared/                       全試験で共用する道具と、書き方の決まり
  check_all.py  教材全体の点検（問題の書式、index.html と台本が素材と合っているか、動作テスト、スライドのはみ出し）
  quiz/      app.html（問題集アプリのひな形）、build.py、smoke.js（動作テスト）
  site/      build.py（GitHub Pages に公開するサイトを組み立てる）、home.html（入口のページのひな形）
  audio/     make_script.py（course → script.txt）、build_audio.py、lexicon.json（読みの辞書）
  slides/    deck_lib.js（スライドの部品）、render.py（確認用の画像）
  guides/    course-guide.md（章の書き方）、question-guide.md（問題の書き方）
  reference/ 教材を作っていない資格（CCDV-P）の公式の試験ガイド（手元にだけ置き、リポジトリには入れない）
.claude/skills/cert-video/    解説動画を作るスキル（各試験フォルダからはリンクで参照）
.github/workflows/pages.yml   main に push すると、問題集を GitHub Pages に公開する
```

CCDV-F だけは作った時期が早く、`course/` がありません。`audio/script.txt` を直接書いていて、これが講座の素材です。

## 作り直すコマンド

```bash
python3 shared/check_all.py                   # 全試験の点検をまとめて行う（何も書き換えない。直したあとは必ず実行）
python3 CCAR-F/build.py                       # 問題集（data/*.json を検査して index.html）
node shared/quiz/smoke.js CCAR-F/index.html   # 問題集アプリの動作テスト
python3 shared/site/build.py                  # 公開用のサイト（入口のページと全試験の問題集）を _site/ に書き出す
python3 shared/audio/make_script.py CCAR-F    # course/ch*.md → audio/script.txt（CCDV-F 以外）
python3 CCAR-F/audio/build_audio.py --check   # 台本の字数と、残っている英字
python3 CCAR-F/audio/build_audio.py           # m4a（1〜2分）
node CCAR-F/slides/build_deck.js              # pptx（最後に FIT WARNINGS が出る）
python3 shared/slides/render.py CCAR-F/CCAR-F_キャッチアップ講座.pptx /tmp/qa   # スライドを画像にして確認
```

動画は cert-video スキルの手順に従う（`python3 .claude/skills/cert-video/scripts/certvideo.py …`）。

問題集は claude.ai の Artifact（非公開）としても公開している。URL は各試験の `exam.json` の `_artifact`。
更新するときは `python3 <試験>/build.py --artifact <出力.html>` で公開用のページを書き出し、その URL を指定して publish する。

問題集は GitHub Pages でも公開している（https://tsumita2929.github.io/claude-cert/ 。誰でも見られる）。
main に push すると、`.github/workflows/pages.yml` が `shared/site/build.py` を実行して公開し直す。手で書き出す作業はない。
Pages のサイトに載るのは入口のページと各試験の問題集だけで、`reference/` の公式の試験ガイドや、音声・スライド・動画は載らない（載せる範囲を広げるときは `shared/site/build.py` に足す。公式の試験ガイドは載せない）。
ただし、これは Pages のサイトの話。リポジトリ（tsumita2929/claude-cert）そのものが公開（public）のあいだは、リポジトリに入れたファイルはすべて GitHub 上で誰でも見られる（2026-11-18 時点で public）。

## 決まり

- **非公式の教材。** 実際の試験問題、公式サンプル問題、ほかの対策サイトの問題を、転載も言い換えもしない。どの教材にも「非公式で、Anthropic が作成・公認したものではない」と書く。
- **公式の試験ガイドは、リポジトリに入れない。** PDF と、そこから取り出したテキスト（`*_exam_guide_*.pdf`、`*_exam_guide_*.txt`）は、手元の `reference/` にだけ置く。リポジトリは公開なので、入れると再配布になる。`.gitignore` で外してある。手元にないときの入手先は `shared/program.md` の「3. 公式の一次情報の場所」。
- **事実は一次情報で確かめる。** 公式の試験ガイド、公式ドキュメント、ヘルプセンター、公式の記事だけを根拠にする。記憶で書かない。手順は `shared/guides/course-guide.md` の「2. 事実確認」。
- **試験ガイドと現行のドキュメントが食い違うときは、ガイドの立場を主にする。** 現行の違いは一言添える（各章の「事実確認」に記録がある）。
- **用語は公式の日本語版試験ガイドに合わせる。** 出題範囲の区分は「分野」。CCDV-F だけは、既存の教材に合わせて「ドメイン」。
- **内容を直すときは、素材から直す。** 講座の内容は `course/chNN.md`（CCDV-F は `audio/script.txt`）を直してから、音声・スライド・動画に反映する。問題は `data/*.json` を直して `build.py`。
- 問題と章の書き方は `shared/guides/` の2つのガイドに従う。

## 試験ガイドの版

教材は、**改訂前（2026-12-06 までの試験）の公式の試験ガイド**に基づく。本文と問題は v1.0（2026年7月発効）で作った。現行の v1.1（2026年11月発効）は、申し込みと本人確認の章が変わっただけで、分野・配点・問題数・サンプル問題は v1.0 と同じ（2026-11-18 に比べて確認）。

2026-11-17 に、CCAO-F・CCDV-F・CCAR-P の **2026-12-07 発効のガイド**が公開された（70問〔採点対象60＋対象外10〕になり、分野の配点とスキルが再編された。CCAR-F は対象外）。手元の `reference/` に保存してあるが、**教材には反映していない**（2026-11-18 時点の方針: 改訂前のままにする）。差分のまとめは `shared/program.md` の冒頭の追記。
反映するときは、分野・配点・スキルの差分を `exam.json`、`reference/outline.md`、講座、問題集の順に直す。
公式の情報の場所は `shared/program.md` の「3. 公式の一次情報の場所」。

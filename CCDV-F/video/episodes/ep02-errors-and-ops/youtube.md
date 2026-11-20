# 公開用の文面：第2回 エラー処理と本番運用

## 題名（案）

1. 【CCDV-F】エラー処理と本番運用｜再試行するエラー・バッチ・構造化出力（第2回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCDV-F 対策】429 と 401 の違い、言えますか？｜エラー処理と本番運用（第2回）
   - 問いかけで興味を引く形。ミニクイズの内容と対応している。
3. Claude API の実務｜エラー処理・画像と PDF・バッチ・構造化出力【CCDV-F 第2回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
Claude API をアプリに組み込むときの実務を整理します。再試行するエラーと直すエラー、画像と PDF の渡し方、Files API、バッチ処理、構造化出力、本番運用のポイントまで。CCDV-F（Claude Certified Developer – Foundations）の学習用です。

▼ 目次
0:00 オープニング
0:18 エラー処理
1:52 クラウド経由
2:15 画像と文書
3:22 バッチ
3:47 構造化出力
4:38 本番運用
5:55 ミニクイズ
6:24 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式ドキュメントに基づいています。仕様は変わることがあります。
・「本番運用の5つのポイント」と「利用形態の選び分け」は、API の仕様ではなく、運用の考え方をまとめたものです。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式ドキュメント）
・Create a Message: https://platform.claude.com/docs/en/api/messages/create
・ドキュメントのトップ（エラー、バッチ、Files API、構造化出力の各ページはここから）: https://platform.claude.com/docs/

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCDV-F, Claude Certified Developer, Claude API, Anthropic, エラー処理, 429, Message Batches, 構造化出力, Files API, 資格対策

## アップロードするファイル

- 動画: `out/ep02-errors-and-ops/ep02-errors-and-ops.mp4`
- サムネイル: `out/ep02-errors-and-ops/thumbnail.png`
- 字幕: `out/ep02-errors-and-ops/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた。エラー・バッチ・Files API・構造化出力の個別ページの URL を調べて、概要欄に足す
- [ ] 資格の正式名称「Claude Certified Developer – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- エラー番号の読み（ヨンニーキュー、ゴーマルマル、ゴーニーキュー、ヨンマルマル、ヨンマルイチ）。冒頭の「エラー処理」の章と、ミニクイズ、まとめに出る
- 「x-api-key」（エックスエーピーアイキー）、「Authorization ヘッダー」（オーソリゼーション）
- 「Amazon Bedrock」「Files API」「Message Batches API」「Claude.ai」「Claude Agent SDK」
- 「strict: true」（ストリクト・トゥルー）

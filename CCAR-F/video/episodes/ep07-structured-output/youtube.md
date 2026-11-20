# 公開用の文面：第7回 構造化出力とバッチ処理

## 題名（案）

1. 【CCAR-F】構造化出力とバッチ処理｜tool_use・検証とリトライ・Message Batches API（第7回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-F 対策】形はスキーマで強制、中身は検証で｜構造化出力とバッチ処理（第7回）
   - サムネイルの言葉と合わせ、いちばん覚えてほしい考え方を前に出した形。
3. Claude の出力を確実に扱う｜JSON スキーマ・リトライの限界・バッチの使い分け【CCAR-F 第7回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
Claude の出力をプログラムで確実に扱う方法を整理します。tool_use と JSON スキーマによる構造化出力、tool_choice の使い分け、値をでっち上げさせないスキーマの設計、意味の誤りの検証とリトライの限界、Message Batches API の使いどころと運用まで。CCAR-F（Claude Certified Architect – Foundations）の分野4「プロンプトエンジニアリングと構造化出力」、タスク4.3〜4.5の学習用です。

▼ 目次
0:00 オープニング
0:26 スキーマで強制
2:25 検証とリトライ
3:50 バッチ処理
4:38 バッチの運用
5:35 ミニクイズ
6:20 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は、公式の試験ガイド（v1.0）と、2026年11月時点の公式ドキュメントに基づいています。仕様は変わることがあります。
・試験ガイドは2026年3月時点の製品を前提にしています。動画は試験ガイドの立場で説明し、現行の違いを補足しています（例: 2026年11月時点では、新しいモデルの一部で tool_choice の any とツール名の指定が 400 エラーになり、代わりに auto と strict: true を使います）。
・「30時間の SLA に対して4時間ごとの投入」は、試験ガイドが挙げている例の数字です。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Claude Certified Architect – Foundations 試験ガイド（v1.0、公式の日本語版）
・Define tools（tool_choice）: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
・Strict tool use: https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use
・Batch processing（Message Batches API）: https://platform.claude.com/docs/en/build-with-claude/batch-processing

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-F, CCA-F, Claude Certified Architect, Claude API, Anthropic, 構造化出力, JSONスキーマ, tool_use, tool_choice, Message Batches API, バッチ処理, 資格対策

## アップロードするファイル

- 動画: `out/ep07-structured-output/ep07-structured-output.mp4`
- サムネイル: `out/ep07-structured-output/thumbnail.png`
- 字幕: `out/ep07-structured-output/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。とくに `tool_choice` の 400 エラーの対象モデルと、バッチの料金・24時間の記述）
- [ ] 資格の正式名称「Claude Certified Architect – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「`tool_choice`」（ツールチョイス）、「`auto`」（オート）、「`any`」（エニー）、「`extract_metadata`」（エクストラクトメタデータ）。「スキーマで強制」の章
- 「`strict: true`」（ストリクト、トゥルー）。コロンの位置で短い間が入る。同じ章
- 「`null`」（ヌル）、「`enum`」（イーナム）、「`other`」（アザー）、「`unclear`」（アンクリア）。「スキーマで強制」の章の後半、クイズ、まとめ
- 「Message Batches API」（メッセージバッチズエーピーアイ）、「SLA」（エスエルエー）、「`custom_id`」（カスタムアイディー）。「バッチ処理」「バッチの運用」の章
- 「400のエラー」（ヨンマルマル）、「タスク4.3から4.5」（ヨンテンサン）
- ミニクイズの「正解は B」（ビー）と「C は」（シー）
- `stated_total`、`calculated_total`、`conflict_detected`、`detected_pattern` は、音声エンジンが語の途中で区切るため、声では読まず役割を日本語で言っている（名前は画面に出る）

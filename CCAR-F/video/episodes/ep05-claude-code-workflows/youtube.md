# 公開用の文面：第5回 Claude Code の進め方と CI

## 題名（案）

1. 【CCAR-F】Claude Code の進め方と CI｜プランモードと `-p` の使いどころ（第5回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-F 対策】複雑な作業は、まず計画｜プランモード・テスト駆動・CI レビュー（第5回）
   - サムネイルの「複雑ならまず計画」と対応させ、中身の具体性を出した形。
3. Claude Code を CI で動かす前に｜`-p`、JSON 出力、別インスタンスのレビュー【CCAR-F 第5回】
   - 資格を受けない開発者にも届く形。

（YouTube の題名ではバッククォートは表示されないので、貼るときは外す）

## 概要欄

```
Claude Code の進め方を整理します。プランモードと直接実行の使い分け、Explore サブエージェント、入出力の例とテスト駆動による反復的な改良、インタビューパターン、そして CI への組み込み（-p、--output-format json、--json-schema、CLAUDE.md、別インスタンスでのレビュー）まで。CCAR-F（Claude Certified Architect – Foundations）分野3「Claude Code の設定とワークフロー」の後半（タスク 3.4〜3.6）の学習用です。

▼ 目次
0:00 オープニング
0:17 プランモード
1:34 Explore
2:17 反復的な改良
3:37 CI への組み込み
5:48 ミニクイズ
6:29 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式の試験ガイド（v1.0）と、Claude Code の公式ドキュメントに基づいています。仕様は変わることがあります。
・試験ガイドと現行のドキュメントで扱いが違う点が2つあります。動画では試験ガイドの立場で説明し、現行の違いを添えています。
　- Explore サブエージェントの目的（ガイドは「コンテキストの枯渇を防ぐ」。現行のドキュメントは、使い切ることはまれになったとし、長い出力を切り離す用途を勧めています）
　- CI での CLAUDE.md（ガイドは CI に文脈を渡す手段とします。現行のドキュメントは CI で --bare モードを勧めており、このモードは CLAUDE.md を自動では読みません）
・コード例（コマンドと JSON 出力）は説明用に短くしたものです。$SCHEMA は JSON スキーマを入れた変数、findings 以下は自分で決めるスキーマの例です。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Permission modes（プランモード）: https://code.claude.com/docs/en/permission-modes
・Common workflows: https://code.claude.com/docs/en/common-workflows
・Subagents（Explore）: https://code.claude.com/docs/en/sub-agents
・Best practices: https://code.claude.com/docs/en/best-practices
・Run Claude Code programmatically（-p、JSON 出力、--bare）: https://code.claude.com/docs/en/headless
・CLI reference: https://code.claude.com/docs/en/cli-reference
・GitHub Actions: https://code.claude.com/docs/en/github-actions

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-F, Claude Certified Architect, Claude Code, Anthropic, プランモード, サブエージェント, テスト駆動開発, CI/CD, コードレビュー, 資格対策

## アップロードするファイル

- 動画: `out/ep05-claude-code-workflows/ep05-claude-code-workflows.mp4`
- サムネイル: `out/ep05-claude-code-workflows/thumbnail.png`
- 字幕: `out/ep05-claude-code-workflows/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。特に `--bare` が `-p` の既定になっていないか）
- [ ] 資格の正式名称「Claude Certified Architect – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「Explore サブエージェント」（エクスプロア、サブエージェント）。そのままだと「エクスプロ／アサブエージェント」と区切られたので、中黒を入れた読みを指定し、間を1つ入れている。「Explore」の章
- 「PR」（ピーアール）。「ピー／アール」と区切られたので、読みを「ピイアール」にしている。「CI への組み込み」の章とミニクイズ
- 「ファイル、行、内容」の「行」（ぎょう）。エンジンが「こう」と読んだので、ひらがなで指定している。「CI への組み込み」の章
- 「`-p`」（ハイフンピー）、「`--output-format json`」（アウトプットフォーマット ジェイソン）、「`--json-schema`」（ジェイソンスキーマ）、「`structured_output`」（ストラクチャードアウトプット）、「`--bare`」（ベア）、「`--print`」（プリント）
- 「null 値」（ヌルち）、「45以上」（よんじゅうごいじょう）
- ミニクイズの「正解は B」「A では」「C では」（C は「スィー」寄りに聞こえる可能性がある）

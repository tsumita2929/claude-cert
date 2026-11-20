# 公開用の文面：第8回 Claude Code と評価

## 題名（案）

1. 【CCDV-F】Claude Code と評価｜設定の優先順位・スキル・評価セット（第8回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCDV-F 対策】settings.json、どれが勝つ？｜Claude Code と評価（第8回・最終回）
   - 問いかけで興味を引く形。ミニクイズの内容と対応している。
3. Claude Code の設定と、評価の進め方｜CLAUDE.md・スキル・採点の方法【CCDV-F 第8回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
Claude Code の設定と、評価の進め方を整理します。CLAUDE.md の置き場所、settings.json の優先順位、スキル、サブエージェント、CI での実行。後半は、評価セットの作り方、採点の方法、デバッグの切り分けまで。CCDV-F（Claude Certified Developer – Foundations）の学習用で、全8回の最終回です。

▼ 目次
0:00 オープニング
0:19 CLAUDE.md
1:21 設定の優先順位
2:17 スキルとサブエージェント
3:27 CI で使う
4:07 評価
5:20 デバッグ
5:51 ミニクイズ
6:22 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式ドキュメントに基づいています。Claude Code の機能名や設定ファイル、オプションは変わることがあります。
・評価セットの作り方（過去の失敗例を入れる、変更のたびに同じセットを実行する）、「採点はまずコードで」、「許可するツールは必要なものだけ」、デバッグの進め方は、仕様ではなく、進め方の助言をまとめたものです。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式ドキュメント）
・How Claude remembers your project（CLAUDE.md）: https://code.claude.com/docs/en/memory
・Settings files and precedence: https://code.claude.com/docs/en/settings
・Configure permissions: https://code.claude.com/docs/en/permissions
・Extend Claude with skills: https://code.claude.com/docs/en/skills
・Create custom subagents: https://code.claude.com/docs/en/sub-agents
・Run Claude Code programmatically（claude -p）: https://code.claude.com/docs/en/headless
・Define success criteria and build evaluations: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
・Handling stop reasons: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCDV-F, Claude Certified Developer, Claude Code, Anthropic, CLAUDE.md, settings.json, スキル, サブエージェント, 評価, evals, 資格対策

## アップロードするファイル

- 動画: `out/ep08-claude-code-and-evals/ep08-claude-code-and-evals.mp4`
- サムネイル: `out/ep08-claude-code-and-evals/thumbnail.png`
- 字幕: `out/ep08-claude-code-and-evals/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた。Claude Code の機能名・設定ファイル名・オプション名は変わりやすいので、公開日の時点で見直す
- [ ] 資格の正式名称「Claude Certified Developer – Foundations」が公式の表記と合っている
- [ ] 事実確認の記録（factcheck.md）に、未確認の項目が残っていない
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「CLAUDE.md」（クロードドットエムディー）、「CLAUDE.local.md」（クロードドットローカルドットエムディー）。既存の音声講座と第7回の読みにそろえた。「CLAUDE.md」の章とまとめに出る
- 「settings.json」（セッティングスジェイソン）。「設定の優先順位」の章
- 「SKILL.md ファイル」（スキルエムディーファイル）、「.claude」（ドットクロード）、「agents」（エージェンツ）。「スキルとサブエージェント」の章
- 「tools」（トゥールズ）、「--allowedTools」（アロウドトゥールズ）。「ツールズ」だとエンジンが語の途中で区切るため、「トゥールズ」にしてある
- 「claude -p」（クロードハイフンピー）、「--resume」（レジューム）。「CI で使う」の章
- 「name」（ネーム）、「description」（ディスクリプション）
- 採点の方法の2つ目は、画面に「LLM」と出し、声では「モデルによる採点」と言っている（「エルエルエム」は、エンジンが途中で区切って読むため）

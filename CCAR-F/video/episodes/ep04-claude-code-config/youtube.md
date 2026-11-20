# 公開用の文面：第4回 Claude Code の設定

## 題名（案）

1. 【CCAR-F】Claude Code の設定｜CLAUDE.md の階層・ルール・スキル（第4回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-F 対策】その指示、どこに置く？｜CLAUDE.md・rules・スキルの使い分け（第4回）
   - 問いかけで興味を引く形。動画の芯（置き場所で届く相手が変わる）と対応している。
3. チームに届く CLAUDE.md の書き方｜パス指定のルールと context: fork【CCAR-F 第4回】
   - 資格を受けない Claude Code の利用者にも届く形。

## 概要欄

```
Claude Code の指示を「どこに置けば、誰に、いつ届くか」を整理します。CLAUDE.md の3つの階層、@import と .claude/rules/ による分割、paths を付けたルール、カスタムスラッシュコマンドとスキルの置き場所、スキルのフロントマター（context: fork、allowed-tools、argument-hint）、CLAUDE.md とスキルの使い分けまで。CCAR-F（Claude Certified Architect – Foundations）の分野3「Claude Code の設定とワークフロー」の前半（タスク3.1〜3.3）の学習用です。

▼ 目次
0:00 オープニング
0:25 指示の階層
1:34 ファイルの分け方
2:10 パス指定のルール
3:14 コマンドとスキル
4:42 使い分け
5:13 ミニクイズ
5:52 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式の試験ガイド（v1.0）と、Claude Code の公式ドキュメントに基づいています。仕様は変わることがあります。
・試験ガイドと現在のドキュメントで説明が違う点（allowed-tools の扱い、パス指定のルールが読み込まれる時、/memory と /context、カスタムコマンドとスキルの統合）は、試験ガイドの立場で説明し、現在の違いを添えています。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Claude Code Docs（memory。CLAUDE.md、@import、.claude/rules/、paths）: https://code.claude.com/docs/en/memory
・Claude Code Docs（skills。SKILL.md、context: fork、allowed-tools、argument-hint）: https://code.claude.com/docs/en/skills
・Claude Code Docs（.claude ディレクトリ）: https://code.claude.com/docs/en/claude-directory
・Claude Code Docs（機能の比較）: https://code.claude.com/docs/en/features-overview

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-F, CCA-F, Claude Certified Architect, Claude Code, CLAUDE.md, Claude Code スキル, カスタムスラッシュコマンド, Anthropic, AIエージェント, 資格対策

## アップロードするファイル

- 動画: `out/ep04-claude-code-config/ep04-claude-code-config.mp4`
- サムネイル: `out/ep04-claude-code-config/thumbnail.png`
- 字幕: `out/ep04-claude-code-config/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。とくに allowed-tools、パス指定のルール、/memory の説明が変わっていないか）
- [ ] 資格の正式名称「Claude Certified Architect – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「SKILL.md」（スキルエムディー）。音声エンジンが「スキル／エム／ディー」と区切る。「コマンドとスキル」の章（3:14〜）
- `.claude/rules/`・`.claude/commands/`・`.claude/skills/` は、声では「ドットクロードのルールズ」「ドットクロードのコマンズ」「ドットクロードのスキルズ」と読ませている。ホームの `~/.claude/...` は「ホームの、ドットクロードフォルダ」と言い換えている
- `testing.md`・`deployment.md` は、声では「テスティング」「デプロイメント」とだけ読ませている（「エムディー」が語の途中で区切れるため）。「ファイルの分け方」の章
- 「YAML」（ヤムル）、「glob」（グロブ）、「paths」（パスズ）。「パス指定のルール」の章
- 「@import」（アットインポート）、「/memory」（スラッシュメモリー）、「/context」（スラッシュコンテキスト）
- 「context: fork」（コンテキストフォーク）、「allowed-tools」「disallowed-tools」（アロウドトゥールズ、ディスアロウドトゥールズ）、「argument-hint」（アーギュメントヒント）。フロントマターの場面（4:02〜）とミニクイズ
- ミニクイズの「正解は B」（ビー）と、「A は」「C は」（エー、シー）

# 公開用の文面：第5回 プロンプトとコンテキストの設計

## 題名（案）

1. 【CCDV-F】プロンプトとコンテキストの設計｜指示の書き方・XML タグ・長い文書（第5回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCDV-F 対策】長い文書は先頭、質問は最後｜プロンプトとコンテキストの設計（第5回）
   - 内容の具体性重視。サムネイルとミニクイズの内容に対応している。
3. Claude のプロンプト設計｜公式ガイドの要点を6分で整理【CCDV-F 第5回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
Claude に渡すプロンプトとコンテキストの設計を、公式ガイドの要点に沿って6分で整理します。指示の書き方、例の見せ方、XML タグ、長い文書の置き方、ハルシネーション対策、評価による改善、コンテキストの絞り方まで。CCDV-F（Claude Certified Developer – Foundations）の学習用です。

▼ 目次
0:00 オープニング
0:15 指示の書き方
1:48 例とタグ
2:40 長い文書
3:11 誤りを減らす
3:46 評価で改善
4:11 コンテキスト
5:25 ミニクイズ
5:59 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式ドキュメントに基づいています。仕様や推奨は変わることがあります。
・「質問を最後に置くと、応答の品質が最大で30%上がった」は、公式ガイドに載っているテスト結果です。特に、複数の文書を含む複雑な入力での数字です。
・「必要になってから読み込む」とサブエージェントの説明は、Anthropic の技術ブログ（下の参考の最後）に基づいています。
・「変更は1つずつ。結果が悪ければ戻す」という評価の進め方は、公式ドキュメントの文言ではなく、設計上の助言です。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式ドキュメント）
・Prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
・Reduce hallucinations: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
・Define success criteria and build evaluations: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
・Context windows: https://platform.claude.com/docs/en/build-with-claude/context-windows
・Prompt caching: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
・Effective context engineering for AI agents（Anthropic の技術ブログ）: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCDV-F, Claude Certified Developer, Claude API, Anthropic, プロンプトエンジニアリング, プロンプト設計, XML タグ, few-shot, ハルシネーション, コンテキストエンジニアリング, 資格対策

## アップロードするファイル

- 動画: `out/ep05-prompts-and-context/ep05-prompts-and-context.mp4`
- サムネイル: `out/ep05-prompts-and-context/thumbnail.png`
- 字幕: `out/ep05-prompts-and-context/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL 6つが開けることと、動画の内容と食い違いがないことを確かめた（2026-11-14 に取得して照合済み。公開日に見直す）
- [ ] 事実確認の記録（factcheck.md）に、未確認の項目が残っていない
- [ ] 資格の正式名称「Claude Certified Developer – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 0:00 「CCDV-F」（シーシーディーブイエフ）、「第5回」
- 0:51 「省略記号は絶対に使うな」（かぎ括弧の中の言い方が、不自然に聞こえないか）
- 1:18 「1文だけでも」（いちぶん）
- 1:31 「否定形より、肯定形で」（ひていけい、こうていけい）。「肯定形」はエンジンが「こうていがた」と読んだので、この回の辞書で読みを指定した
- 2:10 「example タグ」（イグザンプルタグ）
- 2:16 「XML のタグ」（エックスエムエルのタグ）。「XML タグ」と続けると語の途中で区切られたため、「の」を入れている
- 2:49 「document タグ」（ドキュメントタグ）
- 3:01 「最大で30%」（さんじゅっパーセント）
- 4:19 「コンテキストロット」
- 4:47 「ジャストインタイムの取得」
- 5:28 「契約書3通」（さんつう）、5:43 「1通ずつ」（いっつうずつ）、「正解は D」（ディー）
- 6:17 「MCP」（エムシーピー）

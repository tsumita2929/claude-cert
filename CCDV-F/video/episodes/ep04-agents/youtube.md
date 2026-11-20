# 公開用の文面：第4回 エージェントとワークフロー

## 題名（案）

1. 【CCDV-F】エージェントとワークフロー｜使い分けと5つのパターン（第4回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCDV-F 対策】その処理、エージェントにすべき？｜ワークフローとの使い分け（第4回）
   - 問いかけで興味を引く形。ミニクイズの内容と対応している。
3. Claude でエージェントを作る前に｜ワークフロー・ループ・コンテキスト管理【CCDV-F 第4回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
ワークフローとエージェントの違いと使い分けを整理します。ワークフローの5つのパターン、エージェントを動かすループの仕組み、止める条件、コンテキスト管理、エージェントの作り方の4つの選択肢まで。CCDV-F（Claude Certified Developer – Foundations）の学習用です。

▼ 目次
0:00 オープニング
0:18 違いと使い分け
1:23 5つのパターン
2:15 エージェントのループ
3:26 コンテキスト管理
4:15 作り方の選択肢
5:07 ミニクイズ
5:45 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式ドキュメントと公式記事に基づいています。仕様は変わることがあります。
・「違いと使い分け」「シンプルに始める」「5つのパターン」「止める条件」「コンテキストは有限」は、API の仕様ではなく、Anthropic の公式記事（下記の2本）に書かれた設計の考え方をまとめたものです。
・Tool Runner、Managed Agents、タスクバジェット、コンテキスト編集、コンパクションは、2026年11月時点でベータの機能です。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Building effective agents（Anthropic Engineering）: https://www.anthropic.com/engineering/building-effective-agents
・Effective context engineering for AI agents（Anthropic Engineering）: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
・How tool use works: https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works
・Handle tool calls: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls
・Tool runner: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner
・Task budgets: https://platform.claude.com/docs/en/build-with-claude/task-budgets
・Context editing: https://platform.claude.com/docs/en/build-with-claude/context-editing
・Compaction: https://platform.claude.com/docs/en/build-with-claude/compaction
・Memory tool: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool
・Agent SDK overview: https://code.claude.com/docs/en/agent-sdk/overview
・Claude Managed Agents overview: https://platform.claude.com/docs/en/managed-agents/overview

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCDV-F, Claude Certified Developer, Claude API, Anthropic, AIエージェント, ワークフロー, プロンプトチェーン, Claude Agent SDK, Managed Agents, 資格対策

## アップロードするファイル

- 動画: `out/ep04-agents/ep04-agents.mp4`
- サムネイル: `out/ep04-agents/thumbnail.png`
- 字幕: `out/ep04-agents/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。ベータの機能が正式版になっていないかも見る）
- [ ] 資格の正式名称「Claude Certified Developer – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「評価者・最適化者」（ひょうかしゃ、さいてきかしゃ）。音声エンジンが「最適化者」を別の語に読み替えたので、読みをひらがなで指定している。「5つのパターン」の章
- 「オーケストレーター・ワーカー」。中黒のところで短い間が入る。同じ章
- 「Tool Runner」（ツールランナー）、「Claude Agent SDK」、「Managed Agents」（マネージドエージェンツ）。「作り方の選択肢」の章
- 「タスクバジェット」「コンパクション」「プロンプトチェーン」「ルーティング」
- 「stop_reason が tool_use の間」（ストップリーズンが、ツールユースのあいだ）。「エージェントのループ」の章と、まとめ
- ミニクイズの「正解は C」（シー）
- 台本の原文の「LLM」は、音声エンジンが語の途中で区切るため、声でも画面でも「モデル」と言い換えている。「LLM」と言いたい場合は、読みの調整が要る

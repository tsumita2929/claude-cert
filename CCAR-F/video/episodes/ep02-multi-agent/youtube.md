# 公開用の文面：第2回 マルチエージェントの設計

## 題名（案）

1. 【CCAR-F】マルチエージェントの設計｜コーディネーターと文脈の渡し方（第2回）
   - 検索重視。資格名と、動画で扱う中心の用語を入れた形。
2. 【CCAR-F 対策】サブエージェントは文脈を引き継がない｜マルチエージェントの設計（第2回）
   - いちばん覚えてほしい結論を前に出す形。サムネイル「文脈は全部渡す」と対応している。
3. Claude のマルチエージェント設計｜分け方・任せ方・引き継ぎ方【CCAR-F 第2回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
コーディネーターとサブエージェントによるマルチエージェントの設計を整理します。ハブアンドスポーク型の通信、分解が狭すぎるときの抜けと反復的な改善ループ、サブエージェントへの文脈の渡し方（Task ツール、allowedTools、AgentDefinition）、並列の起動、プロンプトチェーンと動的な分解、セッションの再開と分岐まで。CCAR-F（Claude Certified Architect – Foundations）の分野1、タスク 1.2・1.3・1.6・1.7 の学習用です。

▼ 目次
0:00 オープニング
0:24 コーディネーター
1:57 文脈の渡し方
3:18 任せ方と分解
4:48 セッション管理
5:35 ミニクイズ
6:21 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式の試験ガイド（v1.0）と公式ドキュメントに基づいています。仕様は変わることがあります。
・試験ガイドは、サブエージェントを起動するツールを「Task」と呼びます。2026年11月時点のドキュメントでは「Agent」ツールに改名されています（古い名前も設定で使えます）。また、会話を丸ごと引き継ぐ「フォーク」のサブエージェントが加わっています。動画では試験ガイドの立場で説明しています。
・構造化データの例（JSON）の項目の名前は説明用の一例で、API や SDK の仕様ではありません。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Anthropic Engineering の記事（マルチエージェントのリサーチシステム）: https://www.anthropic.com/engineering/multi-agent-research-system
・Anthropic Engineering の記事 Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
・Agent SDK ドキュメント（サブエージェント）: https://code.claude.com/docs/en/agent-sdk/subagents
・Claude Code ドキュメント（サブエージェント）: https://code.claude.com/docs/en/sub-agents
・Agent SDK ドキュメント（セッション）: https://code.claude.com/docs/en/agent-sdk/sessions
・Claude Code ドキュメント（CLI リファレンス）: https://code.claude.com/docs/en/cli-reference
・Claude API ドキュメント（並列のツール使用）: https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-F, CCA-F, Claude Certified Architect, Claude, Anthropic, マルチエージェント, サブエージェント, Claude Agent SDK, Claude Code, AIエージェント, 資格対策

## アップロードするファイル

- 動画: `out/ep02-multi-agent/ep02-multi-agent.mp4`
- サムネイル: `out/ep02-multi-agent/thumbnail.png`
- 字幕: `out/ep02-multi-agent/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。`Task` と `Agent` の扱い、フォークの説明が変わっていないかも見る）
- [ ] 資格の正式名称「Claude Certified Architect – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「ハブアンドスポーク型」。エンジンは「ハブ／アンドスポークがた」と区切る。「コーディネーター」の章
- 「allowedTools」（アロウドトゥールズ）、「AgentDefinition」（エージェントデフィニション）、「Task ツール」（タスクツール）。「文脈の渡し方」の章
- 「--resume」（リジューム。ハイフンは読まない）、「fork_session」（フォークセッション）。「セッション管理」の章
- 「2026年11月時点では」。同じ章の、改名の説明
- 「分解が狭すぎる」。「セマ／スギル」と区切られている。「コーディネーター」の章の2つ目の場面
- ミニクイズの「正解は B」（ビー）と「C は」（エンジンの読みは「スィー」に近い）

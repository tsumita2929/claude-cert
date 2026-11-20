# 公開用の文面：第1回 エージェントループと制御

## 題名（案）

1. 【CCAR-F】エージェントループと制御｜stop_reason・前提条件ゲート・フック（第1回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-F 対策】必ず守らせたいことは、プロンプトではなく仕組みで｜エージェントループと制御（第1回）
   - この回の芯を前に出した形。サムネイルの言葉と対応している。
3. エージェントはいつ止める？ stop_reason の読み方と、フックでの強制【CCAR-F 第1回】
   - 資格を受けない開発者にも届く形。ミニクイズの内容と対応している。

## 概要欄

```
エージェントループの回し方と止め方、複数ステップのワークフローで順序を守らせる方法、Agent SDK のフックを整理します。stop_reason で終了を判断する理由、止め方のアンチパターン、前提条件ゲート、人への引き継ぎ、PreToolUse と PostToolUse の使い方まで。CCAR-F（Claude Certified Architect – Foundations）の分野1、タスクステートメント1.1、1.4、1.5の学習用です。

▼ 目次
0:00 オープニング
0:38 ループの回し方
1:33 止め方
2:36 順序と引き継ぎ
4:19 フック
5:40 ミニクイズ
6:20 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は、公式の試験ガイド（v1.0）と、2026年11月時点の公式ドキュメントに基づいています。仕様や試験範囲は変わることがあります。
・試験ガイドは、stop_reason について tool_use と end_turn の2つを扱います。現行のドキュメントはさらに細かく、tool_use 以外の理由で止まればループを抜け、max_tokens による打ち切りなどは完了と区別して扱うよう説明しています。動画では試験ガイドの説明を主にし、現行の違いを一言添えています。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・How tool use works: https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works
・Handle tool calls: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls
・Handling stop reasons: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons
・Agent SDK: How the agent loop works: https://code.claude.com/docs/en/agent-sdk/agent-loop
・Agent SDK: Hooks: https://code.claude.com/docs/en/agent-sdk/hooks
・Building effective agents（Anthropic Engineering）: https://www.anthropic.com/engineering/building-effective-agents

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-F, Claude Certified Architect, Claude API, Anthropic, AIエージェント, エージェントループ, stop_reason, Claude Agent SDK, フック, 資格対策

## アップロードするファイル

- 動画: `out/ep01-agent-loop/ep01-agent-loop.mp4`
- サムネイル: `out/ep01-agent-loop/thumbnail.png`
- 字幕: `out/ep01-agent-loop/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する）
- [ ] 事実確認の記録（factcheck.md）に、未確認の項目が残っていない
- [ ] 資格の正式名称「Claude Certified Architect – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「PreToolUse」「PostToolUse」（プレトゥールユース、ポストトゥールユース）。「プレツールユース」と書くと「プレ／ツールユース」で区切れたため、「トゥ」にして1語で読ませている。「フック」の章
- 「根本原因」（こんぽんげんいん）。音声エンジンが「ねもとげんいん」と読んだので、読みを指定している。「順序と引き継ぎ」の章
- 「500ドル」（ごひゃくドル）。共有の辞書で「500」が「ゴーマルマル」になるため、この回だけ読みを指定している。「フック」の章
- 「ISO 8601」（アイエスオーハチロクゼロイチ）、「Unix」（ユニックス）。「フック」の章
- 「tool_use_id」「max_turns」「get_customer」「process_refund」（読みを辞書で指定）
- 「タスクステートメント1.1、1.4、1.5」の数字の読み（イッテンイチ など）。オープニング
- ミニクイズの「正解は B」（ビー）

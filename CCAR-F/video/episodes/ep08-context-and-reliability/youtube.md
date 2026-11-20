# 公開用の文面：第8回 コンテキスト管理と信頼性

## 題名（案）

1. 【CCAR-F】コンテキスト管理と信頼性｜分野5の6タスクを整理（第8回）
   - 検索重視。資格名、章の名前、試験ガイドの分野番号を入れた形。
2. 【CCAR-F 対策】情報を落とさず渡す｜要約・引き継ぎ・エラー・出典（第8回）
   - サムネイルの言葉と、扱う論点を並べた形。中身の具体性重視。
3. 長い対話とマルチエージェントで情報を落とさない設計｜Claude アーキテクト試験【CCAR-F 第8回・最終回】
   - 資格を受けない開発者にも届く形。最終回であることも入れた。

## 概要欄

```
Claude Certified Architect – Foundations（CCAR-F）の分野5「コンテキスト管理と信頼性」を、タスク5.1〜5.6の順に整理します。取引の事実を要約の外に置く、人を求められたらすぐ引き継ぐ、エラーを文脈ごと返す、長い探索をファイルとサブエージェントで支える、区分ごとの精度でレビューを減らす、主張と出典を最後まで対応させる、の6つです。シリーズの最終回です。

▼ 目次
0:00 オープニング
0:22 事実の保持
1:30 引き継ぎ
2:31 エラーの伝え方
3:26 長い探索
4:14 人のレビュー
5:02 情報の出所
5:46 ミニクイズ
6:26 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式の試験ガイド（v1.0）と公式ドキュメントに基づいています。仕様や試験の内容は変わることがあります。
・試験ガイドは2026年3月時点の製品を前提にしています。動画は試験ガイドの立場で説明し、現行の製品との違いは一言添えています（例: Messages API の会話履歴は、ガイドどおり「毎回すべて送る」と説明。現行のドキュメントには、API 側で会話を保つベータの機能も載っています）。
・「lost in the middle」、エスカレーションの基準、確信度のキャリブレーション、層化無作為抽出の説明は、試験ガイドの記載に基づきます。
・「情報の出所」の場面のコードは、説明用の自作の例です。項目名は API や SDK で決まっているものではありません。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Working with the Messages API: https://platform.claude.com/docs/en/build-with-claude/working-with-messages
・Prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
・Effective context engineering for AI agents（Anthropic Engineering）: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
・How we built our multi-agent research system（Anthropic Engineering）: https://www.anthropic.com/engineering/multi-agent-research-system
・Claude Code: Subagents: https://code.claude.com/docs/en/sub-agents
・Claude Code: Commands: https://code.claude.com/docs/en/commands

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-F, CCA-F, Claude Certified Architect, Claude, Anthropic, コンテキスト管理, エスカレーション, マルチエージェント, Claude Code, 資格対策

## アップロードするファイル

- 動画: `out/ep08-context-and-reliability/ep08-context-and-reliability.mp4`
- サムネイル: `out/ep08-context-and-reliability/thumbnail.png`
- 字幕: `out/ep08-context-and-reliability/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md と照合する。message threads がベータのままかも見る）
- [ ] 事実確認の記録（factcheck.md）に、未確認の項目が残っていない（「確認できなかった点」の2つは、試験ガイドの記載が根拠であることを了承のうえ公開する）
- [ ] 資格の正式名称「Claude Certified Architect – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「lost in the middle」（ロストインザミドル）。辞書で1語として読ませている。「事実の保持」の章
- 「`/compact`」（スラッシュ、コンパクト）。2語に分かれて読まれる。「長い探索」の章
- 「空の結果」（から）。エンジンが「そら」と読むため、2か所で `read` を指定した。「エラーの伝え方」の章
- 「元の文書」（もと）。エンジンが「げん」と読むため `read` を指定した。「人のレビュー」の章
- 「層化無作為抽出」（そうか、むさくいちゅうしゅつ）、「キャリブレーション」「マニフェスト」「スクラッチパッドファイル」
- 「タスク5.1」のような番号は、冒頭で「6つのタスク」と言い換えたので声には出ない
- ミニクイズの「正解は C」（シー）
- 最後の「CCAR-F キャッチアップ講座は、これで全8回が終わりです」

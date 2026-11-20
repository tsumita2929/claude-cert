# 公開用の文面：第7回 セキュリティと安全性

## 題名（案）

1. 【CCDV-F】セキュリティと安全性｜プロンプトインジェクション対策と API キー（第7回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCDV-F 対策】外部のデータはどこに入れる？｜セキュリティと安全性（第7回）
   - 問いかけで興味を引く形。ミニクイズの内容と対応している。
3. Claude API のセキュリティ｜インジェクション対策・認証・refusal【CCDV-F 第7回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
Claude を組み込んだアプリを守るための考え方を整理します。プロンプトインジェクションへの備え、モデルの出力の検証、認証の方式と API キーの扱い、個人情報、refusal への対応、Claude Code のフックまで。CCDV-F（Claude Certified Developer – Foundations）の学習用です。

▼ 目次
0:00 オープニング
0:19 プロンプトインジェクション
2:49 API キーと認証
4:14 個人情報
4:42 refusal
5:23 フック
5:58 ミニクイズ
6:32 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式ドキュメントに基づいています。仕様は変わることがあります。
・開発者が自分のアプリを守るための内容です。攻撃の手順は扱っていません。
・「個人情報は、送る前に減らす」の最小化とマスク、SQL の実行の例は、API の仕様ではなく、一般的なセキュリティの考え方をまとめたものです。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式ドキュメント）
・Mitigate jailbreaks and prompt injections: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
・Authentication: https://platform.claude.com/docs/en/manage-claude/authentication
・Workspaces: https://platform.claude.com/docs/en/manage-claude/workspaces
・API and data retention: https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
・Refusals and fallback: https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback
・Claude Code Hooks: https://code.claude.com/docs/en/hooks

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCDV-F, Claude Certified Developer, Claude API, Anthropic, プロンプトインジェクション, セキュリティ, API キー, tool_result, refusal, Claude Code, 資格対策

## アップロードするファイル

- 動画: `out/ep07-security/ep07-security.mp4`
- サムネイル: `out/ep07-security/thumbnail.png`
- 字幕: `out/ep07-security/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（特に、外部のデータを `tool_result` に入れるという説明と、認証の3方式）
- [ ] 資格の正式名称「Claude Certified Developer – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「tool_result」（ツールリザルト）。「プロンプトインジェクション」の章、ミニクイズ、まとめに出る
- 「App Attest」（アップアテスト）と「iOS と macOS」。声では「アイオーエスとマック」と読ませている（「macOS」は語の途中で区切れてしまうため）
- 「ZDR」（ゼットディーアール）、「PreToolUse」（プリーツールユーズ）、「deny」（ディナイ）。この3語は、辞書の読みを入れると語の途中で区切れたので、音声エンジン任せの読みにしてある
- 「終了コード 2」。声では「終了コードとして、数字の2を返すと」と読ませている（「2」が聞き取りにくいため。字幕は「終了コード 2 を返すと」）
- 「HTTP 200」（エイチティーティーピー二百）、「stop_details」（ストップディテールズ）、「CLAUDE.md」（クロードドットエムディー）
- 「CI」（シーアイ）、「SQL」（エスキューエル）
- ミニクイズの「正解は C」（第1回・第2回と同じ読み）

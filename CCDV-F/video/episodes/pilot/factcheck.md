# 事実確認：pilot（Messages API の基本・試作）

確認日: 2026-11-14

| 台本の主張 | 判定 | 根拠 |
|---|---|---|
| Messages API の必須パラメータは `model`・`max_tokens`・`messages` の3つ | 正しい | Anthropic の API リファレンス（Claude Code 同梱の claude-api 資料、2026-11-03 時点）。400 エラーの原因として「Missing required parameters (`model`, `max_tokens`, `messages`)」と記載 |
| システムプロンプトはトップレベルの `system` パラメータで渡す | 正しい | 同上。基本のリクエスト例がこの形 |
| `messages` の先頭に `role: "system"` を置くとエラーになる | 正しい | 同上。「最初のメッセージは `user`」「`role: "system"` は `messages[0]` に置けない」と記載 |
| `developer` というロールはない | 正しい | 同上。`messages` のロールは `user`・`assistant`（一部の新しいモデルでは会話の途中に限り `system`） |
| モデル ID `claude-sonnet-5-5` | 正しい | 同上のモデル一覧に記載 |

## 言い切っていないこと

- 一部の新しいモデルは、会話の**途中**に `role: "system"` のメッセージを置ける。台本では「先頭に入れるのは間違い」と範囲を絞って述べており、矛盾しない。
- 試験の出題傾向（「よく問われる」など）は公式の根拠がないので、台本では述べていない。

## 公開前にもう一度確認すること

- 公開日の時点で、公式ドキュメント（https://platform.claude.com/docs/en/api/messages）の記載が変わっていないか。

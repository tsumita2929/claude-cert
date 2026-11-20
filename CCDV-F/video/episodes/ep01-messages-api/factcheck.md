# 事実確認：ep01-messages-api（Messages API の基本）

確認日: 2026-11-14

根拠は、Anthropic の API リファレンスをまとめた Claude Code（2.1.325）同梱の資料（claude-api。資料内のモデル一覧は 2026-11-03 取得と記載）。
8〜10 は、公式ページ「Handling stop reasons」（https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons）を
2026-11-14 に取得して照合した（ページの後半2割は要約で読んだため、逐語の確認は前半8割）。
公開前に、公式ドキュメント（https://platform.claude.com/docs/）の該当ページで変わっていないかを見直すこと。

| # | 台本の主張 | 判定 | 根拠（資料内の場所） |
|---|---|---|---|
| 1 | 必須パラメータは `model`・`max_tokens`・`messages` の3つ | 正しい | エラーコードの表。400 の原因に「Missing required parameters (`model`, `max_tokens`, `messages`)」 |
| 2 | システムプロンプトはトップレベルの `system` パラメータで渡す | 正しい | 基本のリクエスト例 |
| 3 | `messages` の先頭に `role: "system"` を置くのは誤り | 正しい | 「最初のメッセージは `user`」「`role: "system"` は `messages[0]` に置けない」 |
| 4 | Messages API はステートレス。会話を続けるには履歴を毎回送る | 正しい（基本の動作） | 「The API is stateless - send the full conversation history each time」 |
| 5 | レスポンスの `content` は文字列ではなくブロックの配列 | 正しい | 「response.content is ContentBlock[]」。`type` で種類を見分けてから読む、と記載 |
| 6 | ブロックの種類に `text`・`thinking`・`tool_use` がある | 正しい | 応答例と思考ブロックの説明 |
| 7 | トークンの使用量は `usage`（`input_tokens`・`output_tokens`） | 正しい | キャッシュとトークン数の説明 |
| 8 | `stop_reason` の値：`end_turn`・`max_tokens`・`stop_sequence`・`tool_use`・`pause_turn`・`refusal` とその意味。このほかに、コンテキストウィンドウの上限で止まった場合の値がある | 正しい | 公式ページは7つを挙げる。7つ目は `model_context_window_exceeded`。動画は6つを説明し、7つ目は「このほかにもある」と触れるだけ（名前は読まない） |
| 9 | `pause_turn` は、ウェブ検索などのサーバーツールの処理が上限に達して一時停止した状態。エラーではない。応答を履歴に足して送り直すと再開する | 正しい | 公式ページ「Returned when the server-side sampling loop reaches its iteration limit while running server tools such as web search.」「Add the assistant's response to your messages array and make another API request」 |
| 9b | `refusal` は、安全性の判定によって応答を断った状態 | 正しい | 公式ページ「Claude declined to generate a response. Safety classifiers return this stop reason as a normal HTTP 200 response, not an error.」 |
| 10 | `content` を読む前に `stop_reason` を確認する | 正しい | 同梱の資料「always check `stop_reason` before reading `content`」。公式ページは「Make it a habit to check the `stop_reason`」 |
| 11 | `max_tokens` は1回の応答の出力の上限で、モデル自身はこの値を知らない | 正しい | 「`max_tokens` … an enforced per-response ceiling the model is not aware of」 |
| 12 | コンテキストウィンドウは入力と出力を合わせた総量で、`max_tokens` とは別の制限 | 正しい | モデル一覧（Context と最大出力が別の列） |
| 13 | `stream: true` で、応答が Server-Sent Events で届く | 正しい | cURL のストリーミング例 |
| 14 | イベントの順番：`message_start` → ブロックごとに `content_block_start`／`content_block_delta`／`content_block_stop` → `message_delta` → `message_stop` | 正しい | 同上 |
| 15 | `stop_reason` と出力トークン数は `message_delta` で確定する | 正しい | 同上（`message_delta` に `stop_reason` と `usage.output_tokens`） |
| 16 | ツールの引数は `input_json_delta` で断片として届き、`content_block_stop` のあとで解析する | 正しい | ツール利用の説明とストリーミングの例（`partial_json`） |
| 17 | SDK のヘルパーで完成したメッセージを受け取れる | 正しい | `get_final_message()`／`finalMessage()` |
| 18 | 長い出力はストリーミングで受け取るのが推奨（タイムアウトを避ける） | 正しい | 「default to streaming for any request that may involve … long output … it prevents hitting request timeouts」 |
| 19 | モデル ID `claude-sonnet-5-5` | 正しい | モデル一覧 |
| 20 | コンテキストウィンドウの大きさはモデルごとに決まる | 正しい | モデル一覧（1M のモデルと 200K のモデルがある） |
| 21 | モデルは `max_tokens` に合わせて書いてはくれない（画面の文言） | 11 からの言い換え | 「モデルは値を知らない」ことの帰結として書いた。公式の文言そのものではない |

## 元の教材から変えた点

- **「user と assistant が交互に並ぶ」とは言っていない。** 資料には「同じロールが続いてもよい（API が1つにまとめる）」とあるため、「`user` と `assistant` が並ぶ」とした。
- **「頻出」「試験でよく問われる」を使っていない。** 出題傾向は公式の根拠がないため、「大事なポイント」と言い換えた。
- **`pause_turn` の「再開の回数に上限を設ける」は入れていない。** 公式ページの本文には推奨として書かれていない。
- **ストリーミング中の ping・error イベントには触れていない。** 同梱の資料で確認できなかったため外した。公式のストリーミングのページで確認できれば、次の版で戻せる。
- **「履歴はサーバー側のデータベースに保存する」は入れていない。** API の仕様ではなく設計上の助言で、1本の長さを抑えるために外した。第2回（本番運用）で扱う候補。

## 言い切っていないこと

- 一部の新しいモデルは、会話の途中に `role: "system"` のメッセージを置ける。台本は「先頭に入れるのは間違い」と範囲を絞っている。
- ベータ機能のメッセージスレッド（`thread`）を使うと、履歴を毎回送らずに済む。基礎の範囲では扱わず、「ステートレス」を基本の動作として説明している。

## 未確認のまま残っている主張

なし。

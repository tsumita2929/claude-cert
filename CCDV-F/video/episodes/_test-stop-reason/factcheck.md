# 事実確認：ep02-stop-reason（stop_reason の読み方）

確認日: 2026-11-14

根拠の略号

- **[公式]** Anthropic 公式ドキュメント「Handling stop reasons」
  https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons （2026-11-14 に取得して照合）
- **[同梱]** Claude Code 同梱の claude-api スキル資料（2026-11-03 時点のキャッシュ。`python/claude-api/README.md` の Stop Reasons 表、`shared/tool-use-concepts.md`）

| 台本の主張 | 判定 | 根拠 |
|---|---|---|
| 成功したレスポンスには、必ず `stop_reason` が入っている | 正しい | [公式]「The `stop_reason` field is part of every successful Messages API response.」 |
| `stop_reason` は、モデルがなぜ生成を止めたかを伝える | 正しい | [公式]「…a `stop_reason` field that tells you why Claude stopped generating.」 |
| `stop_reason` の値はエラーではない（見出し「エラーではない、2つの止まり方」ほか） | 正しい | [公式]「Unlike errors, which indicate failures in processing your request, `stop_reason` tells you why Claude completed its response generation.」 |
| `content` を読む前に `stop_reason` を確認する | 正しい（推奨として） | [公式]「Make it a habit to check the `stop_reason` in your response handling logic」。[同梱]「always check `stop_reason` before reading `content`」 |
| `end_turn`：自然に答え終えた | 正しい | [公式]「Claude completed its response naturally.」 |
| `max_tokens`：出力が上限で打ち切られた。完成品として扱わない | 正しい | [公式]「Claude stopped because it reached the `max_tokens` limit specified in your request.」「When a response is truncated because of token limits…append a notice so the reader knows the output is incomplete.」 |
| `max_tokens` はエラーではない（クイズの解説） | 正しい | 上の「値はエラーではない」と同じ |
| `stop_sequence`：指定した停止文字列が出て止まった | 正しい | [公式]「Claude encountered one of your custom stop sequences.」 |
| `tool_use`：Claude がツールの実行を求めている。アプリが実行して結果を返す | 正しい | [公式]「Claude is calling a tool that you need to run.」「Run the tool and return the result.」 |
| `pause_turn`：ウェブ検索などのサーバーツールの処理が、繰り返しの上限に達した | 正しい | [公式]「Returned when the server-side sampling loop reaches its iteration limit while running server tools such as web search.」 |
| `pause_turn` は、返ってきた応答をそのまま `messages` に足してもう一度送ると再開する | 正しい | [公式]「continue the conversation by sending the response back as-is」「Add the assistant's response to your messages array and make another API request to let Claude continue.」 |
| `refusal`：Claude が応答の生成を断った | 正しい | [公式]「Claude declined to generate a response.」 |
| `refusal` はエラーではなく、HTTP 200 の通常のレスポンスとして返る | 正しい | [公式]「Safety classifiers return this stop reason as a normal HTTP 200 response, not an error.」 |
| コード例：レスポンスに `content`（`type: "text"` のブロックの配列）と `"stop_reason": "end_turn"` がある | 正しい（抜粋） | [公式] のレスポンス例と [同梱] の基本例。実際のレスポンスには `id`・`role`・`model`・`usage` などもあるため、画面に「レスポンスの抜粋」と明示した |

## 素材（audio/script.txt 47〜58行目）から外した・言い換えた点

| 素材の記述 | 対処 | 理由 |
|---|---|---|
| 「ここからが試験の頻出ポイント」 | 外した | 出題傾向には一次情報の根拠がない |
| `pause_turn`：「サーバーツールの処理が長くなり、ターンが一時停止した状態」 | 言い換えた | [公式] の定義は「サーバー側の繰り返し（sampling loop）が上限に達した」。「処理が長い」ではなく「繰り返しの上限に達した」に合わせた |
| `pause_turn`：「念のため、再開の回数には上限を設けます」 | 外した | [公式] の本文には推奨として書かれていない（サンプルコードの引数 `max_requests` にあるだけ）。[同梱] には「Set a `max_continuations` limit (e.g., 5)」とあるが、一次情報の本文で確認できないので、短い回では扱わない |
| `refusal`：「安全上の理由で、応答を断った」 | 言い換えた | [公式] の定義は「declined to generate a response」で、理由は限定していない（安全分類器への言及はある）。「応答の生成を断った」とだけ述べた |
| `max_tokens`：「文章が途中で切れている可能性がある」 | 言い換えた | [公式] は truncated（打ち切り）と扱っている。「出力は途中で切れている」と言い切った |
| 「鉄則は、コンテントを読む前に、必ずストップ・リーズンを確認すること」 | 言い換えた | [公式] の表現は「習慣にする（Make it a habit）」。「鉄則」「必ず」は使わず、「まず確認します」とした |
| 58行目：`max_tokens` はコンテキストウィンドウとは別の制限／モデル自身はこの値を知らない | 外した | 1本1テーマに絞るため。この回では確認もしていない（未確認のまま載せない） |

## 言い切っていないこと

- **値の総数。** [公式] が載せている `stop_reason` の値は7つ（上の6つと `model_context_window_exceeded`）。この回で扱うのは6つで、台本では「全部で6つ」とは言っていない（「まず、4つの値を見ます」「あと2つ、覚えておきたい値があります」）。
- `pause_turn` の繰り返しの上限の回数（[公式] では既定 10 回）は、台本では数字を出していない。
- `refusal` のあとの対処（`stop_details` を読む、別のモデルで再試行する）は、モデルによって挙動が違うので、この回では述べていない。

## 公開前にもう一度確認すること

- 公開日の時点で、上の公式ページの記載（特に値の一覧と `pause_turn` の定義）が変わっていないか。
- まとめの「次回は、ストリーミング」は、素材の並び順からの推定。シリーズの第3回の題材が決まったら合わせる。

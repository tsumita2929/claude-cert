# 事実確認：ep02-errors-and-ops（エラー処理と本番運用）

確認日: 2026-11-14

根拠は、Anthropic の API リファレンスをまとめた Claude Code（2.1.325）同梱の資料（claude-api。資料内のモデル一覧は 2026-11-03 取得と記載）。
公開前に、公式ドキュメント（https://platform.claude.com/docs/）の該当ページで変わっていないかを見直すこと。

## API の仕様（一次情報で確認できたもの）

| # | 台本の主張 | 判定 | 根拠（資料内の場所） |
|---|---|---|---|
| 1 | 再試行で直るのは 429（レート制限）、500（サーバー側の問題）、529（過負荷） | 正しい | エラーコードの表。Retryable が Yes なのはこの3つ |
| 2 | 400（リクエストの誤り）、401（認証の誤り）は再試行しても成功しない | 正しい | 同上。Retryable が No |
| 3 | 403（権限）、404、413（リクエストが大きすぎる）も直す側 | 正しい | 同上。`permission_error`、`not_found_error`、`request_too_large` |
| 4 | 429 では、レスポンスのヘッダー（`retry-after`）が待ち時間の目安になる | 正しい | 429 の項「`retry-after`: Seconds to wait before retrying」 |
| 5 | 公式 SDK は 429 と 500番台を、指数バックオフで、既定で2回まで自動で再試行する | 正しい | 「The Anthropic SDKs automatically retry 429 and 5xx errors with exponential backoff (default: `max_retries=2`)」 |
| 6 | HTTP で直接呼ぶときは、API キーをヘッダーで送る。`Authorization: Bearer` でも `x-api-key` でも送れる。公式は `Authorization` を先に説明している | 正しい | 公式の Authentication ページ（https://platform.claude.com/docs/en/manage-claude/authentication、2026-11-14 取得）。「Send it as `Authorization: Bearer <key>` on direct HTTP requests」「You can also send the key in the legacy `x-api-key: YOUR_API_KEY` header in place of `Authorization`.」同じページの cURL の例は `x-api-key` を使っている |
| 6b | 例では `anthropic-version` ヘッダーも付ける | 正しい | 同じページと同梱資料の cURL の例。ただし「必須」とは明記されていないので、動画でも「付けます」とだけ言っている |
| 7 | 例の `anthropic-version: 2026-10-21` | 正しい | cURL の例の値 |
| 8 | Amazon Bedrock、Vertex AI、Microsoft Foundry では専用のクライアントを使い、モデル ID の書き方と認証はプラットフォームごとに違う | 正しい | 「Provider Clients」。Bedrock は `anthropic.` の接頭辞、Vertex はプロジェクトとリージョンを指定 |
| 9 | 使える機能はプラットフォームによって違う | 正しい | 「Provider availability varies by tool」 |
| 10 | 画像の渡し方は base64、URL、Files API の `file_id` の3通り | 正しい | Vision の例（`base64`／`url`）と Files API の説明（`file`） |
| 11 | 画像を先に、質問を後に置く | おおむね正しい | 資料の例はすべてこの並び。明文で「テキストの前に置く」とあるのは PDF（document ブロック）。画像については例に基づく |
| 12 | 画像もトークンを使う | 正しい | モデル移行の資料（画像のトークン量の記述） |
| 13 | PDF は document ブロックで送る。引用（citations）を有効にすると、原文（`cited_text`）とページの位置（`page_location`）が付く | 正しい | 「Citations」 |
| 14 | 引用は構造化出力（`output_config.format`）と一緒に使えない | 正しい | 「Incompatible with `output_config.format` (returns a 400)」 |
| 15 | Files API は一度アップロードして `file_id` で参照する。参照のたびに中身は入力トークンとして数えられる | 正しい | 「File operations … are free; content used in messages is billed as input tokens」 |
| 16 | Message Batches は非同期で、料金は半額。結果は最大24時間以内（多くは1時間以内） | 正しい | 「Most batches complete within 1 hour; maximum 24 hours」「50% cost reduction on all token usage」 |
| 17 | バッチの結果は順不同。`custom_id` で突き合わせる | 正しい | 「Results arrive in any order - key by `custom_id`, never by position」 |
| 18 | 応答の形式は `output_config.format` に JSON Schema を指定して制約する | 正しい | 「Structured outputs」 |
| 19 | ツールの入力は、ツール定義の `strict: true` でスキーマどおりにする。スキーマには `additionalProperties: false` が要る | 正しい | 「Strict tool use」 |
| 20 | 新しいモデルではプリフィル（アシスタントの応答の書き出しの指定）が使えず、エラーになる | 正しい | 「Prefill removed」。該当モデルで 400 |
| 21 | 提供終了したモデルは使えなくなる | 正しい | モデル一覧の「Deprecated（retiring soon）」「Retired（no longer available）」 |
| 22 | レスポンスのヘッダーにリクエスト ID がある | 正しい | 「populated from the `request-id` header - log it」 |
| 23 | 自社の環境で独自のエージェントを動かすなら Claude Agent SDK | 正しい | 「Claude Agent SDK … you host」 |

## 設計上の助言（API の仕様ではないもの）

次は既存の教材（音声講座の第2章）に基づく運用の考え方で、公式ドキュメントの文言と照合したものではない。
内容は一般的な実務の原則だが、「公式がこう定めている」という言い方はしていない。

- モデル ID を設定で固定し、移行は評価セットで比べてから段階的に広げる
- プロンプトをコードとして扱う（バージョン管理、レビュー、回帰テスト）
- ログにリクエスト ID・モデル・使用量・`stop_reason` を残し、秘密情報は残さず、個人情報はマスクする
- 人間のレビューを、取り消しにくい操作の直前に置く
- 利用形態の選び分け（Claude.ai／Claude Code／Claude API／Agent SDK）の整理

## 元の教材から変えた点

- **ジッター（待ち時間の揺らぎ）、再試行回数の上限と縮退、同時実行数の制御は入れていない。** 一般的な技法だが、手元の公式資料で確認できず、長さも抑えたかったため。
- **「Authorization: Bearer の形式ではない」は、教材が古くなっていた点。** 現在の公式は、API キーを `Authorization: Bearer` で送る形を先に説明し、`x-api-key` を従来の形式（legacy）として残している（上の 6）。教材の「ベアラーの形式ではないので、ひっかけに注意」は、いまは当てはまらない。動画は「どちらの形でも使える。公式は Authorization を先に説明している」とした。音声講座の第2章と、問題集に同じ趣旨の問題があれば、見直しが必要。
- **「出題されます」「ひっかけに注意」は使っていない。** 出題傾向は公式の根拠がない。
- **カナリアリリース、レイテンシの比較には触れていない。**「評価してから段階的に広げる」にまとめた。
- **エラー番号の読み方。** 教材と同じく「ヨンニーキュー」「ゴーマルマル」のように1桁ずつ読ませている。

## 未確認のまま残っている主張

なし（設計上の助言は、上のとおり仕様としては扱っていない）。

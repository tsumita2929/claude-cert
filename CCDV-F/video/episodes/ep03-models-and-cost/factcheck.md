# 事実確認：ep03-models-and-cost（モデルの選び方とコスト）

確認日: 2026-11-14

根拠は2つ。どちらも 2026-11-14 に読んだ。

- **公式**: Anthropic の公式ドキュメント（https://platform.claude.com/docs/）。各ページを Markdown で取得して照合した。表の「公式」は、このページ名を指す。
- **同梱**: Claude Code 同梱の claude-api 資料（2026-11-03 時点の API リファレンスのまとめ）。公式と食い違う点はなかった。

この回は、モデル名・料金の倍率・既定値など、変わりやすい情報が多い。**公開の直前に、下の「公開前に見直すページ」をもう一度開いて確かめること。**

## API の仕様（一次情報で確認できたもの）

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 1 | 2026年11月時点で、現行のモデルは4つの系統（Fable／Opus／Sonnet／Haiku） | 正しい | 公式 Models overview「Latest models」の表。Claude Fable 5.2、Opus 5.5、Sonnet 5.5、Haiku 5.5 の4列 |
| 2 | Fable が最も高性能。難しい推論や、長時間のエージェント作業に向く | 正しい | 同表「For demanding reasoning and long-horizon agentic work」。Choosing a model「Anthropic's most capable model open to all customers」 |
| 3 | 迷ったら、まず Opus から始める。多くの用途の出発点 | 正しい | Models overview「If you're unsure which model to use, start with Claude Opus 5.5 for most workloads」 |
| 4 | Sonnet は、速さと賢さのバランス型 | 正しい | 同表「The best combination of speed and intelligence」 |
| 5 | Haiku は最も速く、最も安い。大量の分類や抽出に向く | 正しい | 同表「For high-volume, latency-sensitive tasks such as classification, extraction, and routing」、Comparative latency が Fastest。Choosing a model「The lowest latency and price」 |
| 6 | 上ほど高性能、下ほど低コスト（画面の補足） | 正しい | 公式 Optimizing for cost and intelligence「From lowest to highest cost and capability, the current models are Claude Haiku 5.5, Claude Sonnet 5.5, Claude Opus 5.5, and Claude Fable 5.2」 |
| 7 | 選び方の進め方は2通り。軽いモデルから始めて足りないときだけ上げる方法と、高性能なモデルから始めて、あとから effort やモデルを下げる方法 | 正しい | Choosing a model「Option 1: Start efficiency-first」（Haiku 5.5 で始め、必要なときだけ上げる）、「Option 2: Start capability-first」（Opus 5.5 で始め、effort を下げるかモデルを下げる） |
| 8 | 決め手は評価。実際のプロンプトとデータで確かめる | 正しい | 同ページ「Having a good evaluation set is the most important step in the process」「Test with your actual prompts and data」 |
| 9 | 新しいモデルの思考は adaptive thinking。どれだけ考えるかを Claude が決める | 正しい | 公式 Steering thinking「Claude's thinking is adaptive: the model evaluates each request and determines whether to think and how much」 |
| 10 | 思考のトークン数を固定の予算で指定する方法（`budget_tokens`）は、最新のモデルでは使えない | 正しい | 公式 Thinking のモデル別の表。Fable 5.2、Opus 5.5、Sonnet 5.5、Haiku 5.5 はいずれも「"enabled" with budget_tokens → 400 error」。前の世代の Haiku 4.5 などでは今も使う |
| 11 | 考える深さとコストは `effort` で調整する。`output_config` の中に書く | 正しい | 公式 Effort「Set `output_config.effort` on the request」「trade off between response thoroughness and token efficiency with a single model」 |
| 12 | コード例（`claude-opus-5-5`、`thinking: {"type": "adaptive"}`、`output_config: {"effort": "low"}`） | 正しい | モデル ID は Models overview。Opus 5.5 は `thinking` を省くか `adaptive` を指定する（Thinking の表）。`low` は Effort levels の表 |
| 13 | `effort` は5段階（`low`／`medium`／`high`／`xhigh`／`max`）と、それぞれの向き | 正しい | Effort「Effort levels」の表。`low`「Most efficient… Simpler tasks」、`medium`「Balanced approach… balance of speed, cost, and performance」、`high`「Complex reasoning, difficult coding problems」、`xhigh`「Long-running agentic and coding tasks」、`max`「no constraints on token spending」。現行の4モデルは5段階すべてに対応（古いモデルには `xhigh` のないものがある） |
| 14 | `effort` の既定値はモデルによって違う | 正しい | Effort「Most Claude models default to high effort…; Claude Opus 5.5 and Claude Haiku 5.5 default to medium」 |
| 15 | `temperature`・`top_p`・`top_k` に既定以外の値を指定すると 400 エラー | 正しい | 公式 Thinking「Sampling parameters」。Fable 5.2、Opus 5.5、Sonnet 5.5、Haiku 5.5 を含む新しいモデルで「non-default … values return a 400 error on every request」 |
| 16 | API バージョン `2026-10-21` では、既定値を送ってもエラー（画面の補足） | 正しい | 公式 Migrating to API version 2026-10-21「a request that sends `temperature`, `top_p`, or `top_k` returns a 400 error, even at the parameter's default value」 |
| 17 | コストは、トークンの単価ではなく、完了したタスクあたりで比べる | 正しい | Optimizing for cost and intelligence「Compare models on cost per completed task, not per token, because you pay for completed tasks」 |
| 18 | 単価の安いモデルに替えても総額が増えることがある。失敗したタスクにも再試行にも料金がかかる | 正しい | 同ページ「The bill is decided by the tasks the cheaper model fails, because a failed task still bills its tokens, then the retry…」 |
| 19 | モデルを替える前に、まず `effort` を調整する | 正しい | Choosing a model「Tuning effort is often a better lever than switching models」 |
| 20 | トークン数は、専用のエンドポイント（`count_tokens`）で送る前に数えられる。システムプロンプトやツールも含めて送る | 正しい | 公式 Token counting「determine the number of tokens in a message before you send it」「including support for system prompts, tools, images, and PDFs」 |
| 21 | 数えるときは、本番と同じモデルを指定する。モデルによって数え方が違う | 正しい | 同ページ「The token counting endpoint counts under the tokenizer of the `model` you pass」「Recount prompts against the model you plan to use」 |
| 22 | 数えるだけなら料金はかからない。回数の制限はある | 正しい | 同ページ「Token counting is free to use but subject to requests per minute rate limits」 |
| 23 | キャッシュは先頭からの一致で効く。プロンプトは `tools`→`system`→`messages` の順につながる | 正しい | 公式 Prompt caching「Prompt caching covers the full prefix: `tools`, `system`, and `messages` (in that order)」 |
| 24 | 前の部分が変わると、そこから後ろはキャッシュが使えない。ツールの定義が変わると全部が無効になる | 正しい | 同ページ「Changes at each level invalidate that level and all subsequent levels」「Modifying tool definitions… invalidates the entire cache」 |
| 25 | システムプロンプトに現在時刻を埋め込むと、毎回キャッシュが使えない | 正しい | 同梱 prompt-caching「Don't interpolate "current date: X"… into the system prompt」。公式にも、時刻を含むブロックで毎回ミスする例がある |
| 26 | キャッシュの区切り（ブレークポイント）は `cache_control` で指定し、毎回共通の部分の終わりに置く。変わる値はそれより後ろに置く | 正しい | Prompt caching「For a prompt with a varying suffix (timestamps, per-request context, the incoming message), place the breakpoint at the end of the static prefix, not on the varying block」 |
| 27 | 区切りを変わる部分に置くと、毎回、書き込みだけが起きる（画面） | 正しい | 同ページ「You pay for a fresh cache write on every request and never get a read」 |
| 28 | キャッシュが効いているかは、レスポンスの `usage` で確認する | 正しい | 同ページ「Tracking cache performance」。`usage` の `cache_read_input_tokens`（キャッシュから読んだ量）と `cache_creation_input_tokens`（書き込んだ量）で確認する |
| 29 | ブレークポイントは1リクエストに4つまで | 正しい | 同ページ「You can define up to 4 cache breakpoints」 |
| 30 | 有効期間は既定で5分。キャッシュが読まれるたびに延長される。1時間も選べる | 正しい | 同ページ「By default, the cache has a 5-minute lifetime. The cache is refreshed for no additional cost each time the cached content is used」「1-hour cache duration at additional cost」 |
| 31 | 書き込みは通常の入力の 1.25倍（5分）、2倍（1時間） | 正しい | 同ページ Pricing の注記「1.25 times」「2 times the base input tokens price」 |
| 32 | 読み込みは通常の入力のおよそ10分の1（0.1倍）。モデルによってはさらに安い | 正しい | 同注記「Cache read tokens are 0.1 times the base input tokens price」。表の脚注で、Fable 5.2・5.1 は 0.025倍、Opus 5.5・Sonnet 5.5 は 0.05倍。現行の4モデルで 0.1倍なのは Haiku 5.5 |
| 33 | キャッシュの割引は、バッチの割引と組み合わせられる | 正しい | 公式 Pricing「Batch API and prompt caching discounts can be combined」。Batch processing「can stack」 |
| 34 | ストリーミングで、体感の待ち時間が短くなる | 正しい | 公式 Reducing latency「Stream responses… can significantly improve the perceived responsiveness」 |
| 35 | 実際の処理時間は、プロンプトと出力を短くする、速いモデルや低い `effort` を選ぶ、で減らす | 正しい | 同ページ「Choose the right model」「Optimize prompt and output length」。`low` は「the cheapest and fastest level」 |

## 設計上の助言（API の仕様ではないもの）

次は、公式ドキュメントの文言どおりではなく、既存の教材（音声講座の第3章）に基づく考え方。台本では「公式がこう定めている」という言い方はしていない。

- **出力のばらつきを抑えるには、指示を明確にし、例を示し、形式は構造化出力で縛る。** 公式が言っているのは「パラメータの代わりに、プロンプトで挙動を導く」「代わりになる設定はない」まで。例示と構造化出力を挙げるのは、教材の助言。
- **ツールの定義は途中で変えない。** 仕様（変えるとキャッシュが全部無効になる）から導いた運用の助言。一部のモデルには、キャッシュを保ったままツールを足す新しい機能があるが、この動画では扱っていない。

## 元の教材から変えた点

元の台本（`audio/script.txt` の第3章）は、モデルの世代が古い前提で書かれていた。

- **「オーパスは最も高性能」は古い。** 2026年11月時点では、Opus の上に Fable がある。系統は3つではなく4つ。「迷ったら Opus から」という公式の案内に合わせた。
- **「要件を満たす最も軽いモデルを選ぶ」は、公式の2通りの進め方に置き換えた。** 公式は、軽いモデルから始める方法と、高性能なモデルから始める方法を並べている。
- **「精度が最優先ならオーパスに高いエフォート」は入れていない。** 最上位が Fable に変わっており、公式も「まず Opus、評価で足りなければ Fable」という順で案内しているため。
- **`effort` の値は「ローからマックスまで」ではなく、5段階を全部挙げた。** `xhigh` が加わっている。既定値がモデルで違う（`high` か `medium`）ことも足した。
- **サンプリングのパラメータには、API バージョンの話を足した。** 第2回のコード例で見せた `2026-10-21` では、既定値を送ってもエラーになる。
- **「一貫性は複数回の実行で測る」「effort は処理ごとに設定する」は入れていない。** 一般的な助言だが、長さを抑えるため。
- **カスケード構成の話は入れていない。**「モデルを替える前に、まず effort」という公式の言い方にまとめた。
- **「キャッシュできる最小の長さ」「キャッシュはモデルごとに分かれる」「バッチの中のキャッシュヒットはベストエフォート」は入れていない。** いずれも正しいが、最小の長さはモデルごとに違う数字で（現行モデルは 512 トークン）、長さも抑えたかった。
- **「間隔が5分から1時間なら、1時間の有効期間が有利」は「1時間も選べる」に弱めた。** 最新の資料では、読み込みが特に安いモデルでは、5分のまま定期的に読み直すほうが安い場合があるとされている。
- **読み込みの料金は「はるかに安い」ではなく、倍率で言った。** 標準は 0.1倍で、新しいモデルにはさらに安いものがある。具体的なドルの金額は、変わりやすいので出していない。
- **思考の内容の表示（`display`）の話は入れていない。** 長さを抑えるため。
- **「レイテンシを最も効果的に減らすのはストリーミング」の「最も」は外した。** 公式は「体感の応答性を大きく改善する」という言い方。キャッシュで処理時間が減る点も、長さの都合で省いた。
- **「配点2位」は使っていない。** 配点や出題傾向は、公式の根拠がない。
- **「1バイトでも変わると」は「少しでも変わると」にした。** 意味は同じ。

## 未確認のまま残っている主張

なし（設計上の助言は、上のとおり仕様としては扱っていない）。

## 公開前に見直すページ

- Models overview（現行モデルの顔ぶれ、既定の effort）: https://platform.claude.com/docs/en/models/overview
- Choosing the right model: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
- Effort: https://platform.claude.com/docs/en/build-with-claude/effort
- Thinking（`budget_tokens` とサンプリングのパラメータ）: https://platform.claude.com/docs/en/build-with-claude/thinking
- Prompt caching（倍率、有効期間、ブレークポイントの数）: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- Optimizing for cost and intelligence: https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence
- Token counting: https://platform.claude.com/docs/en/build-with-claude/token-counting
- Reducing latency: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency

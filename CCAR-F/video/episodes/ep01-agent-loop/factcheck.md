# 事実確認：ep01-agent-loop（エージェントループと制御）

確認日: 2026-11-16

台本は、音声講座の第1章（`course/ch01.md`）を動画用に組み直したもの。素材の「事実確認」の表は、2026-11-16 に公式の試験ガイド（v1.0）と公式ドキュメントで照合済み。
下の表は、台本に入れた主張ごとに、素材の表の該当行（「素材#」）を引いたもの。素材にない描写を足した箇所（コード例）だけ、同じ日に一次情報を取得して確かめた。

根拠の種類:

- **試験ガイド**: 公式の試験ガイド v1.0（2026年7月発効。日本語版の訳語「分野」「タスクステートメント」に合わせた）
- **公式ドキュメント**: platform.claude.com/docs と code.claude.com/docs。URL は各行と末尾の一覧
- **公式記事**: Anthropic Engineering「Building effective agents」

## 台本の主張と根拠

| # | 台本の主張（場面） | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 1 | 試験の分野は5つ。分野1の配点は27%で、5分野の中で最大。この回はタスク1.1、1.4、1.5（scope） | 正しい | `reference/outline.md`（公式ガイド v1.0 で確認済み）。分野2は18%、分野3と4は20%、分野5は15% | 1 |
| 2 | Claude にリクエストを送り、1周ごとに `stop_reason` を確かめる。`tool_use` ならツールを実行して続け、`end_turn` なら終える（loop、quiz、wrap） | 正しい | 試験ガイド タスク 1.1 の知識・スキル ／ https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works 「The agentic loop (client tools)」: `stop_reason` が `"tool_use"` の間、ツールを実行して会話を続ける | 2 |
| 3 | Claude の応答を、ツールの呼び出しごと履歴に戻し、続くユーザーのメッセージで `tool_result` を返す。`tool_use_id` で対応づける（history） | 正しい | how-tool-use-works の手順4「original messages, the assistant's response, and a user message with the tool_result blocks」 ／ https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls 「tool_use_id: The id of the tool use request this is a result for」 | 3 |
| 4 | コード例の形（`assistant` の `content` に `type: "tool_use"` と `id`、`user` の `content` に `type: "tool_result"` と `tool_use_id`。ID は `toolu_01`） | 正しい（2026-11-16 に取得して確認） | handle-tool-calls: `tool_use` ブロックは `id`・`name`・`input` を持つ。結果は `role` が `user` のメッセージで、`type: "tool_result"` と `tool_use_id` を送る。`content` は省略できる（「Example of empty tool result」）。ページ内の例でも `"tool_use_id": "toolu_01"` と、一部を省いた書き方をしている。台本では `name`・`input`・結果の中身を省き、そのことを画面の補足に書いた | 素材にない（追加） |
| 5 | 次に呼ぶツールを Claude が文脈から推論する。これをモデル主導の意思決定と呼び、事前に決めた決定木や固定のツールの順番とは違う（model） | 正しい | 試験ガイド タスク 1.1 の知識 ／ https://www.anthropic.com/engineering/building-effective-agents ワークフローは「predefined code paths」、エージェントは「dynamically direct their own processes and tool usage」 | 4 |
| 6 | 止め方のアンチパターン3つ：言葉の解析、テキストの有無で完了判定、根拠のない反復回数の上限を主な停止手段にする（anti） | 正しい | 試験ガイド タスク 1.1 のスキル（日本語版の訳語に合わせた） | 5 |
| 7 | Claude は、前置きの文章とツールの呼び出しを、同じ応答で返すことがある（anti、quiz） | 正しい | handle-tool-calls の応答例: `stop_reason` が `tool_use` の応答に、text ブロック「I'll check the current weather in San Francisco for you.」と tool_use ブロックが並ぶ（2026-11-16 に取得して再確認） | 6 |
| 8 | 回数の上限は暴走を防ぐ安全網。Agent SDK の `max_turns` もその用途の上限（axis、wrap） | 正しい | https://code.claude.com/docs/en/agent-sdk/agent-loop 「Turns and budget」: 既定は上限なし、上限に達すると `error_max_turns`。例のコメント「Prevent runaway sessions」 ／ building-effective-agents「stopping conditions (such as a maximum number of iterations) to maintain control」 | 7 |
| 9 | 2026年11月時点のドキュメントでは、`tool_use` 以外で止まればループを抜ける。`max_tokens` による打ち切りは完了と区別して扱う（axis） | 正しい | how-tool-use-works「The loop exits on any other stop reason ("end_turn", "max_tokens", "stop_sequence", or "refusal")」 ／ https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons `max_tokens` は「Raise max_tokens or continue the response」 | 8 |
| 10 | プロンプトの指示だけでは失敗率はゼロにならない。外せない規則はプログラムで強制し、ぶれてよいことはプロンプトで誘導する（rule） | 正しい | 試験ガイド タスク 1.4 の知識・スキル | 9 |
| 11 | お金の操作で順番が飛ぶと、別人の口座への返金のような事故になる（rule） | 正しい（例示） | 試験ガイドの公式サンプル問題1の状況（名乗った名前だけで調べ、誤った口座に返金）を一般化して触れた。問題文は写していない | 10 |
| 12 | 前提条件ゲート。`get_customer` が確認済みの顧客IDを返すまで、`process_refund` をコードで止める（gate） | 正しい | 試験ガイド タスク 1.4 の知識・スキル | 9 |
| 13 | プロンプトを強める、例を足す、という手当ては確率的なので、必ず守らせる場面では劣る（gate） | 正しい | 試験ガイド タスク 1.4・1.5（決定論的な遵守が要るならプログラムによる強制。プロンプトの指示は確率的） | 9、17 |
| 14 | 引き継ぐ担当者は会話の記録を見られない前提。ハンドオフサマリーの項目は顧客ID、根本原因、返金額、推奨する対応（handoff） | 正しい | 試験ガイド タスク 1.4 のスキル。画面の各項目の説明（「どの顧客の件か」など）は、項目名の言い換え | 11 |
| 15 | 複数の用件は個別の項目に分け、共有の文脈で並行して調べ、ひとつの解決策にまとめる（multi） | 正しい | 試験ガイド タスク 1.4 のスキル | 12 |
| 16 | フックは、エージェントの動きの決まった時点で自分のコードを実行する仕組み。アプリの側で動くので、決定論的に効く（hooks） | 正しい | https://code.claude.com/docs/en/agent-sdk/hooks 「Hooks are callback functions that run your code in response to agent events」 ／ agent-loop「Hooks run in your application process, not inside the agent's context window」 ／ 決定論的は試験ガイド タスク 1.5 | 13、17 |
| 17 | `PreToolUse` はツールの実行前に呼ばれ、呼び出しを止められる。止めた理由は Claude に伝わり、別のやり方に切り替えられる（hooks、hookuse） | 正しい | hooks「PreToolUse: Tool call request (can block or modify)」、「permissionDecision: 'deny' stops the tool call. permissionDecisionReason tells the model why.」 ／ agent-loop「Claude receives the rejection message instead」 | 14 |
| 18 | 500ドルを超える返金を止め、人へのエスカレーションに回す（hookuse） | 正しい | 試験ガイド タスク 1.5 のスキル（「$500を超える返金」） | 15 |
| 19 | `PostToolUse` は結果が返ったあとに呼ばれ、モデルが処理する前に結果を変換できる。MCP ツールごとにばらばらな日時の形式（Unix タイムスタンプと ISO 8601）をそろえる。これを正規化と呼ぶ（hooks、hookuse） | 正しい | 試験ガイド タスク 1.5 ／ hooks「PostToolUse: Tool execution result」、「To replace the tool's output before Claude sees it, set updatedToolOutput, which works for built-in and MCP tools」 | 16 |
| 20 | 業務ルールで確実な遵守が要るなら、プロンプトではなくフックを選ぶ（hookuse、wrap） | 正しい | 試験ガイド タスク 1.5 の知識・スキル | 17 |
| 21 | ミニクイズ（文章とツール呼び出しが同じ応答に入るのに、文章の有無で完了と判定している） | 正しい | 素材のミニクイズを短くしたもの。根拠は #6・#7。自作の問題で、実際の試験問題ではない | 5、6 |

## 試験ガイドと現行ドキュメントの食い違い（素材と同じ立場で扱った）

- **`stop_reason` の扱い。** ガイドは `tool_use` と `end_turn` の2つだけを扱う。2026年11月時点のドキュメントは7つの値（`end_turn`、`max_tokens`、`stop_sequence`、`tool_use`、`pause_turn`、`refusal`、`model_context_window_exceeded`）を挙げ、`tool_use` 以外ならループを抜けて、理由ごとに扱うよう説明している。台本はガイドどおり「`tool_use` なら続け、`end_turn` なら終える」を主にし、axis の場面で「2026年11月時点のドキュメントでは、`tool_use` 以外で止まればループを抜ける。`max_tokens` による打ち切りは完了と区別する」と一言添えた。`pause_turn` などの個々の値には触れていない。
- **`PostToolUse` で結果を差し替える方法。** 現行のドキュメントでは `hookSpecificOutput` の `updatedToolOutput` で差し替える（古い `updatedMCPToolOutput` は MCP ツールだけ）。試験ガイドにないので、台本ではフィールド名を出していない。

## 素材から変えた点

- 音声講座の文章を、1文1字幕に切り直した。内容と節の順序は素材どおり。
- 「この章で学ぶこと」は、数字（5分野、27%、3つのタスク）を `stats` の場面で見せた。「試験の分野は5つ」は素材の「5つの分野の中で最大」から取った。
- エージェントループの節は、流れの図（loop）、履歴のコード例（history）、モデル主導と事前に決める方式の対比（model）の3場面に分けた。コード例は素材にない描写なので、#4 を一次情報で確かめた。
- 長さの都合で、素材の次の文は省いた（内容は画面に残すか、別の文で言っている）: 「作業の途中でも切れてしまいます」（画面の説明に残した）、「こうして Claude は、新しい情報をもとに次の一手を考えます」、「判断の軸は、決定論的な遵守が要るかどうか」（rule の対比の画面で見せた）。
- ハンドオフサマリーの4項目に、画面だけの短い言い換え（「どの顧客の件か」など）を付けた。新しい事実は足していない。
- ミニクイズは素材の3択をそのまま使い、選択肢の番号を A〜C にした（正解は素材の2番＝B）。

## 未確認のまま残っている主張

なし。

## 参照した URL

- https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls
- https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons
- https://code.claude.com/docs/en/agent-sdk/agent-loop
- https://code.claude.com/docs/en/agent-sdk/hooks
- https://www.anthropic.com/engineering/building-effective-agents

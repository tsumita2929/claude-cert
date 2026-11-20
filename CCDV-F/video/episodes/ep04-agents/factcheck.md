# 事実確認：ep04-agents（エージェントとワークフロー）

確認日: 2026-11-14

根拠は次の3つ。

- **同梱資料**: Anthropic の API リファレンスをまとめた Claude Code 同梱の資料（claude-api、2026-11-03 時点）。`SKILL.md`、`shared/agent-design.md`、`shared/tool-use-concepts.md`、`shared/managed-agents-overview.md`、`shared/model-migration.md`、`python/claude-api/tool-use.md`
- **公式ドキュメント**（2026-11-14 に取得）: platform.claude.com/docs と code.claude.com/docs の各ページ。URL は末尾の一覧
- **公式記事**（2026-11-14 に取得）: Anthropic Engineering の「Building effective agents」（2024-12-19 公開、Erik S.・Barry Zhang）と「Effective context engineering for AI agents」（2025-09-29 公開）

公開前に、末尾の URL を開いて、動画の内容と食い違いがないかを見直すこと。

## API と製品の仕様（一次情報で確認できたもの）

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 1 | `stop_reason` が `tool_use` の間、ツールを実行して会話を続ける | 正しい | 公式「How tool use works」: 「while `stop_reason == "tool_use"`, run the tools and continue the conversation」「The loop exits on any other stop reason」。同梱 SKILL.md も「The `while stop_reason == "tool_use"` loop」 |
| 2 | アシスタントの応答は `content` を丸ごと履歴に戻す。テキストだけを抜き出さない | 正しい | 同梱 tool-use-concepts.md「always append the full `response.content` to preserve tool_use blocks」。SKILL.md「Append `response.content` (not just the text)」 |
| 3 | ツールの結果は、次の `user` メッセージで返し、`tool_use_id` で呼び出しと対応させる | 正しい | 公式「Handle tool calls」: 「sending a new message with the `role` of `user`」「`tool_use_id`: The `id` of the tool use request this is a result for」。結果は呼び出しの直後に置く決まりも同ページ |
| 4 | 1回の応答に複数のツール呼び出しが入ることがある。結果は1つのメッセージにまとめて返す | 正しい | 同梱 tool-use-concepts.md「Claude can request multiple tools in a single response. Handle them all before continuing - send all results back in a single `user` message」 |
| 5 | コード例（`client.messages.create(model, max_tokens, tools, messages)`、`resp.stop_reason`、`resp.content`） | 正しい | 同梱 python/claude-api/tool-use.md の手動ループの例と同じ呼び出し。モデル ID `claude-sonnet-5-5` は同梱のモデル一覧にある。`run_tools` は説明用の自作の関数（`tool_result` ブロックのリストを返す想定）で、SDK の関数ではない |
| 6 | `max_tokens` は1回の応答の上限。達すると応答は途中で打ち切られる | 正しい | 公式「Task budgets」: 「`max_tokens` is a hard per-request cap on generated tokens」「truncates the response with `stop_reason: "max_tokens"` when reached」 |
| 7 | タスクバジェット（`task_budget`）は、ループ全体で使うトークンの目安をモデルに伝える | 正しい | 同ページ: 「Task budgets let you tell Claude how many tokens it has for a full agentic loop, including thinking, tool calls, tool results, and output」。`output_config` の中に書く |
| 8 | モデルは残りを見ながら、ペースを配分して作業をまとめる | 正しい | 同ページ: 「The model receives a running countdown and uses it to prioritize work and finish gracefully as the budget is consumed」 |
| 9 | タスクバジェットは強制的な上限ではない。ベータの機能 | 正しい | 同ページ: 「Task budgets are a soft hint, not a hard cap」。ベータ（ヘッダー `task-budgets-2026-03-13`）。対応モデルは限られる（Claude Sonnet 5 などは対象外）。最小値は 20,000 トークン（台本では触れていない） |
| 10 | コンテキスト編集は、古いツールの結果を、要約せずに消す | 正しい | 公式「Context editing」: 「selectively clear specific content from conversation history」。同梱 agent-design.md「Keeps the transcript lean without summarizing」。ベータ（`context-management-2025-06-27`）。thinking ブロックも消せる |
| 11 | コンパクションは、古いやり取りを要約に置き換える | 正しい | 公式「Compaction」: 「Compaction replaces the older turns of a conversation with a summary that Claude writes on the server」。ベータ |
| 12 | メモリは、決定や進捗をファイルに残し、次のセッションで読む | 正しい | 公式「Memory tool」: 「store and retrieve information across conversations in a directory of memory files」「files that persist between sessions」。クライアント側のツールで、保存先はアプリが実装する。ベータのヘッダーは不要 |
| 13 | エージェントの作り方は4通り。軸は「ループを誰が用意するか」「実行環境を誰が持つか」 | 正しい | 同梱 SKILL.md「Building an Agent: Four Approaches」: 「who supplies the harness」「who supplies the deployment」 |
| 14 | 手動のループは、どちらも自前 | 正しい | 同上「You build the harness; you host」 |
| 15 | SDK の Tool Runner は、自分で定義したツールに対してループを回す。ベータ | 正しい | 公式「Tool runner」: 「The tool runner handles the agentic loop, error wrapping, and type safety」（ベータ）。同梱「Only tools you define」「harness only; you host」 |
| 16 | Claude Agent SDK は、Claude Code と同じループと、ファイル操作などの組み込みツールを提供する | 正しい | 公式「Agent SDK overview」: 「The Agent SDK gives you the same tools, agent loop, and context management that power Claude Code, programmable in Python and TypeScript」 |
| 17 | Tool Runner と Agent SDK は、自分の環境で動かす | 正しい | 同梱 SKILL.md「Both are harness-only - you host and deploy them」。公式でも Agent SDK は「in a process you operate」 |
| 18 | Managed Agents は、ループに加えて、ツールを動かす実行環境まで Anthropic に任せられる。ベータ | 正しい | 公式「Claude Managed Agents overview」: 「provides the harness and infrastructure for running Claude as an autonomous agent」。ベータ（`managed-agents-2026-04-01`）。実行環境は「an Anthropic-managed cloud sandbox, or a self-hosted sandbox on your own infrastructure」。自社側に置く選択肢もあるので、台本は「任せられます」とした |
| 19 | エージェントの設定を一度作っておき、実行のたびにセッションを開始する | 正しい | 同ページ: 「Create the agent once and reference it by ID across sessions」。同梱 managed-agents-overview.md「Agent (once) -> Session (every run)」 |

## 設計上の助言（API の仕様ではないもの）

次は Anthropic の公式記事に書かれた設計の考え方で、API の決まりではない。台本の冒頭でも「公式の記事をもとにしています」と言っている。

出典: **Building effective agents**（Anthropic Engineering、2024-12-19）

| # | 台本の主張 | 記事の該当箇所 |
|---|---|---|
| A | ワークフローは、モデルとツールを、あらかじめコードで決めた経路で動かすもの | 「Workflows are systems where LLMs and tools are orchestrated through predefined code paths」 |
| B | エージェントは、モデルが自分で、進め方やツールの使い方を決めるもの | 「Agents ... are systems where LLMs dynamically direct their own processes and tool usage」 |
| C | 毎回同じ手順のタスクにはワークフロー。予測しやすく、一貫性がある | 「workflows offer predictability and consistency for well-defined tasks」 |
| D | エージェントは、必要な手順の数を事前に読めない問題に使う | 「open-ended problems where it's difficult or impossible to predict the required number of steps」 |
| E | できるだけシンプルな方法から始める。多くは、検索や例で補強した1回の呼び出しで足りる | 「finding the simplest solution possible, and only increasing complexity when needed」「optimizing single LLM calls with retrieval and in-context examples is usually enough」 |
| F | エージェントはコストが高くなり、誤りも積み重なりやすい。複雑さは効果を確かめられたときだけ足す | 「higher costs, and the potential for compounding errors」「adding complexity only when it demonstrably improves outcomes」 |
| G | ワークフローの5つのパターン（プロンプトチェーン、ルーティング、並列化、オーケストレーター・ワーカー、評価者・最適化者）と、それぞれの説明 | 記事の5つの節。チェーンの途中の検査は「programmatic checks（gate）」、並列化の2つの形は「Sectioning」「Voting」、オーケストレーターは「subtasks aren't pre-defined, but determined by the orchestrator based on the specific input」 |
| H | 止める条件として、ループの回数に上限を設ける | 「it's also common to include stopping conditions (such as a maximum number of iterations) to maintain control」。Tool Runner にも `max_iterations` がある（公式「Tool runner」） |

出典: **Effective context engineering for AI agents**（Anthropic Engineering、2025-09-29）

| # | 台本の主張 | 記事の該当箇所 |
|---|---|---|
| I | コンテキストは有限の資源。トークンが増えるほど、モデルは中の情報を正確に思い出しにくくなる | 「Context ... must be treated as a finite resource」「as the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases」 |
| J | サブエージェントに調査を任せ、要約だけを受け取る | 「Each subagent might explore extensively ... but returns only a condensed, distilled summary of its work」 |

台本での整理（記事の文言そのままではないもの）:

- 「1回の呼び出し → ワークフロー → エージェント」を左から右の3段で見せているのは、記事の E と C・D を1枚にまとめた図解。記事に同じ図はない。
- ミニクイズ（請求書の処理はワークフローにする）は、C を当てはめた自作の問題。

## 元の教材（音声講座の第4章）から変えた点

- **「配点3位」は外した。** 出題の配点は、公式の根拠を確認できない。
- **「Anthropic が繰り返し強調する」は「記事がすすめている」に変えた。** 出典を具体的にした。
- **フレームワークへの注意（中身が見えにくくなる）は入れていない。** 記事には書かれているが、記事のページ自体に「2024年12月以降、ツールの状況は大きく変わった」という注記が付いている。長さも抑えたかった。
- **「上限に達したら人間に引き継ぐ」「コストの上限」は入れていない。** 妥当な運用だが、確認した一次情報には、この形の記述が見つからなかった。「ループの回数に上限を設ける」（記事と Tool Runner の `max_iterations` で確認）に絞った。
- **「`max_tokens` はモデルには見えない」は言っていない。** 同梱資料には「not surfaced to the model」とあるが、公式の Task budgets のページでは、この言い方を確認できなかった。両方で確認できた「強制的な上限」と「目安」の対比で説明した。
- **「API はステートレスなので、記憶は開発者が用意する」は入れていない。** 基本はいまも正しい（同梱資料「The API is stateless」）。ただし、API 側が会話を短時間保持するベータ機能（message threads）が加わっており、言い切ると誤解を生む。
- **コンテキスト編集とコンパクションの「使い分け」は、違いの説明だけにした。** 公式の Context editing のページは、いまは「多くの場合、長い会話の管理はサーバー側のコンパクションが主な方法」と案内している。教材の「ツール結果が原因なら編集、会話全体が長いならコンパクション」という対等な使い分けは、そのままは言っていない。
- **Managed Agents は「両方を提供する」ではなく「任せられる」とした。** 実行環境を自社のインフラに置く選択肢（self-hosted sandbox）が加わっているため。スケジュール実行（事実。scheduled deployments）は、長さの都合で省いた。
- **ベータであることを足した。** Tool Runner、Managed Agents、タスクバジェットは、現在もベータ。教材は Tool Runner と Managed Agents については触れていなかった。
- **Agent SDK の機能の列挙（権限、フック、サブエージェント、MCP）は省いた。**「Claude Code と同じループと組み込みツール」にまとめた。
- **各パターンの補足（ルーティングでのモデルの使い分け、投票の向き不向き、文芸翻訳の例）は省いた。** 記事には書かれている。長さの都合。
- **声では「LLM」を「モデル」と言い換えた。** 音声エンジンが「エルエル／エム」と語の途中で区切るため。画面の表記もそろえた。
- **「出題されます」「押さえてください」のような出題傾向の言い方は使っていない。**
- **ミニクイズは二択から四択に作り直した。** 題材（請求書の処理）は教材と同じ。

## 未確認のまま残っている主張

なし。ただし、次の点は確認の範囲に限りがある。

- 公式記事と公式ドキュメントは、取得ツールが返したテキストで確認した（一部のページは長く、後半が要約で返った。ループの条件は「How tool use works」の原文で確認している）。上の引用は、公開前にページを開いて照合しておくと確実。
- 「Building effective agents」は2024年12月の記事。定義とパターンの考え方は現在も公式ドキュメントから参照されているが、記事中の個別のツールの話は古くなっている（台本では使っていない）。
- コード例は、自分で定義したツール（クライアント側のツール）だけを使う前提。サーバー側のツール（Web 検索など）を使う場合は `pause_turn` の処理が要るが、この回では扱っていない。

## 参照した URL

- https://www.anthropic.com/engineering/building-effective-agents
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner
- https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons
- https://platform.claude.com/docs/en/build-with-claude/task-budgets
- https://platform.claude.com/docs/en/build-with-claude/context-editing
- https://platform.claude.com/docs/en/build-with-claude/compaction
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool
- https://code.claude.com/docs/en/agent-sdk/overview
- https://platform.claude.com/docs/en/managed-agents/overview

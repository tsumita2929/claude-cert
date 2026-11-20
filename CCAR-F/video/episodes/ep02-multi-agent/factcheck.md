# 事実確認：ep02-multi-agent（マルチエージェントの設計）

確認日: 2026-11-16

台本の主張は、すべて素材 `CCAR-F/course/ch02.md` の本文から取った。素材の「## 事実確認」の表は、2026-11-16 に公式の試験ガイド（v1.0）と公式ドキュメントで照合済み。下の表は、台本に入れた主張ごとに、素材の表の該当行（素材 #）と根拠を写したもの。素材にない事実は台本に足していないので、追加の照合はしていない。

根拠の「試験ガイド」は、公式の CCAR-F 試験ガイド（`CCAR-F/reference/` の PDF とテキスト）。

## 台本の主張と根拠

| # | 台本の主張（場面） | 判定 | 根拠（素材 #） |
|---|---|---|---|
| 1 | 範囲は分野1のタスク 1.2、1.3、1.6、1.7。分野1は配点27%で、5つの分野で最大（open） | 正しい | 素材 #1。`reference/outline.md` の分野と配点の表、章立ての表 |
| 2 | コーディネーターが、タスクを分解し、サブエージェントに任せ、結果をまとめる。この形がハブアンドスポーク型アーキテクチャ（hub） | 正しい | 素材 #2。試験ガイド タスク 1.2「以下に関する知識」1つ目と3つ目 |
| 3 | サブエージェントどうしは直接やり取りしない。通信、エラー処理、情報の振り分けは、すべてコーディネーターを通す（hub） | 正しい | 素材 #2。試験ガイド タスク 1.2 知識3つ目 |
| 4 | 通信を集めると、1か所で観察でき、エラーを同じ方針で扱え、情報の流れを制御できる（hub） | 正しい | 素材 #3。試験ガイド タスク 1.2「以下を実行できること」4つ目 |
| 5 | 呼ぶサブエージェントは、問い合わせの要件を見て、その都度選ぶ（hub） | 正しい | 素材 #4。試験ガイド タスク 1.2 スキル1つ目／ https://www.anthropic.com/engineering/multi-agent-research-system 「Agents struggle to judge appropriate effort for different tasks, so we embedded scaling rules in the prompts.」 |
| 6 | 幅広いテーマのレポートが一部の分野しか扱っていないとき、サブエージェントが割り当てどおりに正しく動いていれば、原因は上流のコーディネーターの分解が狭すぎること（gap） | 正しい | 素材 #5。試験ガイド タスク 1.2 知識4つ目／公式サンプル問題7 |
| 7 | 範囲をサブトピックや情報源の種類ごとに分けて割り当てると、重複が減る（loop） | 正しい | 素材 #6。試験ガイド タスク 1.2 スキル2つ目／ multi-agent-research-system「Without detailed task descriptions, agents duplicate work, leave gaps…」 |
| 8 | コーディネーターが統合の結果を評価し、抜けがあれば的を絞った問い合わせで検索や分析を再委任し、十分になるまで統合をやり直す（反復的な改善ループ）（loop） | 正しい | 素材 #7。試験ガイド タスク 1.2 スキル3つ目／ multi-agent-research-system「The LeadResearcher synthesizes these results and decides whether more research is needed」 |
| 9 | サブエージェントは分離されたコンテキストで動き、コーディネーターの会話履歴を自動では引き継がず、呼び出しをまたいでメモリも共有しない。必要な情報は、呼び出すときのプロンプトに明示して渡す（context） | 正しい（試験ガイドの立場。現行のフォークは例外。下の「食い違い2」） | 素材 #8。試験ガイド タスク 1.2 知識2つ目、タスク 1.3 知識2つ目／ https://code.claude.com/docs/en/agent-sdk/subagents 「The only content you pass from parent to subagent is the Agent tool's prompt string…」「The subagent doesn't receive: The parent's conversation history or tool results」 |
| 10 | Agent SDK でサブエージェントを起動する仕組みは `Task` ツール。コーディネーターが使うには `allowedTools` に `Task` を含める（spawn） | 正しい（試験ガイドの立場。現行は `Agent`。下の「食い違い1」） | 素材 #9。試験ガイド タスク 1.3 知識1つ目／ Agent SDK subagents の例は `allowedTools: [..., "Agent"]` |
| 11 | 種類ごとの設定は `AgentDefinition` に書く。中身は、いつ使うかの説明、システムプロンプト、ツールの制限（spawn） | 正しい | 素材 #10。試験ガイド タスク 1.3 知識3つ目／ Agent SDK subagents「AgentDefinition configuration」の表: `description`（when to use this agent）、`prompt`（the agent's system prompt）、`tools`（Array of allowed tool names） |
| 12 | 2026年11月時点では、`Task` は `Agent` ツールに改名され、古い名前も使える（spawn） | 正しい | 素材 #13。 https://code.claude.com/docs/en/sub-agents 「In version 2.1.63, the Task tool was renamed to Agent. Existing `Task(...)` references in settings and agent definitions still work as aliases.」 |
| 13 | 2026年11月時点では、会話を丸ごと写す、フォークというサブエージェントがある（spawn） | 正しい | 素材 #14。 https://code.claude.com/docs/en/sub-agents 「A fork is a subagent that inherits the entire conversation so far instead of starting fresh.」／ Agent SDK subagents「Forked subagents」 |
| 14 | 前のエージェントの調査結果は、丸ごとプロンプトに入れる（handoff） | 正しい | 素材 #11。試験ガイド タスク 1.3 スキル1つ目 |
| 15 | 本文とメタデータ（出典の URL、文書名、ページ番号）を分けた構造化データにすると、どの主張がどの出典からかが最後まで残る（handoff） | 正しい | 素材 #12。試験ガイド タスク 1.3 スキル2つ目 |
| 16 | 独立した調査は、コーディネーターの1回の応答で、複数の `Task` 呼び出しを出して並列に起動する（parallel） | 正しい | 素材 #15。試験ガイド タスク 1.3 スキル3つ目／ https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use 「By default, Claude may call multiple tools in a single response.」 |
| 17 | ターンを分けて1つずつ呼ぶと時間は合計になり、並列ならいちばん遅い1つの時間で済む（parallel） | 正しい | 素材 #16。 Agent SDK subagents「independent subtasks finish in the time of the slowest one rather than the sum of all of them」 |
| 18 | 指示には手順を並べず、調査の目標と品質の基準を書く。手順を固定すると、途中で見つけたことに合わせて動けない（parallel） | 正しい | 素材 #17。試験ガイド タスク 1.3 スキル4つ目 |
| 19 | プロンプトチェーンは、決まった順番のステップに分け、前の出力を次の入力にする。予測できる多観点のレビューに向く（split） | 正しい | 素材 #18。試験ガイド タスク 1.6 知識1つ目、スキル1つ目／ https://www.anthropic.com/engineering/building-effective-agents 「Prompt chaining decomposes a task into a sequence of steps, where each LLM call processes the output of the previous one.」 |
| 20 | 大きなコードレビューは、ファイルごとのパスと、ファイルをまたぐ統合のパスに分ける。一度に全部見せると、注意が分散して見落としが出る（split） | 正しい | 素材 #19。試験ガイド タスク 1.6 知識2つ目、スキル2つ目／公式サンプル問題12 |
| 21 | 動的な分解は、各ステップで分かったことから次のサブタスクを作り、終わりの見えない調査に向く（split） | 正しい | 素材 #20。試験ガイド タスク 1.6 知識3つ目／ building-effective-agents（orchestrator-workers）「subtasks aren't pre-defined, but determined by the orchestrator based on the specific input」 |
| 22 | レガシーなコードベースに網羅的なテストを足すなら、構造の把握、影響の大きい領域の特定、優先順位付きの計画、依存関係に応じた組み替えの順（legacy） | 正しい | 素材 #20。試験ガイド タスク 1.6 スキル1つ目と3つ目 |
| 23 | Claude Code では、`--resume` にセッション名を付けて、名前付きの会話を再開できる（session） | 正しい | 素材 #21。試験ガイド タスク 1.7 知識1つ目／ https://code.claude.com/docs/en/cli-reference 「`--resume`, `-r`: Resume a specific session by ID or name」 |
| 24 | `fork_session` で、共通の分析から分岐を作る。元のセッションは残るので、2つのテスト戦略を比べられる（session） | 正しい | 素材 #22。試験ガイド タスク 1.7 知識2つ目、スキル2つ目／ https://code.claude.com/docs/en/agent-sdk/sessions 「Forking creates a new session that starts with a copy of the original's history but diverges from that point. … the original's ID and history stay unchanged.」 |
| 25 | セッションが保存するのは会話で、ファイルではない（session） | 正しい | 素材 #23。 Agent SDK sessions「Sessions persist the **conversation**, not the filesystem.」 |
| 26 | 再開では、ツールの結果が古くないかに気をつける。コードを変えたなら、変えたファイルを具体的に伝え、そこだけを分析し直させる（fresh） | 正しい | 素材 #24。試験ガイド タスク 1.7 知識3つ目、スキル4つ目 |
| 27 | 前の結果の多くが古いなら再開せず、大事な事実をまとめた構造化された要約を渡して、新しいセッションを始める（fresh） | 正しい | 素材 #25。試験ガイド タスク 1.7 知識4つ目、スキル3つ目／ Agent SDK sessions「Capture the results you need … and pass them into a fresh session's prompt.」 |
| 28 | ミニクイズ: 統合役は渡されたものしか知らない。本文と出典を分けた構造化データで丸ごと渡すのが正解。統合役に検索役の会話履歴を直接読ませるのは、文脈を引き継がない仕組みにも、通信をコーディネーターに集める原則にも反する（quiz） | 正しい（自作の問題） | 素材 #26。試験ガイド タスク 1.3 知識2つ目、スキル1つ目と2つ目、タスク 1.2 スキル4つ目 |

## 試験ガイドと現行ドキュメントの食い違い（素材と同じ扱い）

- **食い違い1（ツールの名前）**: 試験ガイドは起動のツールを `Task` と呼び、`allowedTools` に `Task` を含めるとする。2026年11月時点のドキュメントでは、Claude Code v2.1.63 で `Agent` に改名され、`Task(...)` という古い書き方は設定とエージェント定義で別名として使える。台本はガイドの `Task` を主にし、spawn の場面のナレーションと画面の補足（lead）で改名を一言添え、「試験では、ガイドのとおりに考えてください」と言った。
- **食い違い2（フォーク）**: 試験ガイドは「サブエージェントは親の文脈を自動では引き継がない」とする。現行の Claude Code と Agent SDK には、会話を丸ごと引き継ぐフォークのサブエージェントがある。台本はガイドの原則を主にし（context の場面）、spawn の場面でフォークの存在を一言添えた。
- 参考: `fork_session` は Agent SDK の Python のオプション名（TypeScript では `forkSession`、CLI では `--fork-session`）。ガイドの表記どおり `fork_session` と書いた。

## 素材から変えた点

- **「よく問われるのが、分解が狭すぎるリスクです」を「気をつけたいのが、…」に変えた。** 出題傾向の言い方は、シリーズの手本（CCDV-F）にそろえて使わない。
- **handoff の場面のコードは、説明用に作った構造化データの例。** 項目の名前（`findings`、`claim`、`source_url`、`document`、`page`）は API や SDK の仕様ではない。画面の補足に「項目の名前は一例」と書いた。
- **gap の場面の画面の項目**（下流は「任された範囲は、きちんと扱った」、上流は「レポートが、一部の分野に偏る」）は、素材 #5 の言い換え。新しい事実ではない。
- **fresh の場面の左の列**（再開するとき）は、素材の本文の「変えたファイルを具体的に伝え、そこだけを分析し直させる」を項目にしたもの。
- **「エラーの伝え方は、第8章で扱います」は省いた。** 長さの都合。
- **ミニクイズは、素材の3択をそのまま使い、番号（1〜3番）を記号（A〜C）に変えた。** 問題文と選択肢は画面に収まるよう短くした。正解（B＝素材の2番）と解説の趣旨は素材と同じ。
- **ナレーションの文は、1文1字幕になるよう短く切り直した。** 内容は素材の本文の順に沿う（レガシーなコードベースの例だけ、画面を分けるため独立した場面にした）。

## 未確認のまま残っている主張

なし（すべて素材の表の照合済みの行に対応する）。

## 参照した URL（素材の表から）

- https://www.anthropic.com/engineering/multi-agent-research-system
- https://www.anthropic.com/engineering/building-effective-agents
- https://code.claude.com/docs/en/agent-sdk/subagents
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/agent-sdk/sessions
- https://code.claude.com/docs/en/cli-reference
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use

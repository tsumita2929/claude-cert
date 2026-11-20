# 事実確認：ep08-claude-code-and-evals（Claude Code と評価）

確認日: 2026-11-14

根拠は、次の一次情報（いずれも 2026-11-14 に取得）。

- Claude Code 公式ドキュメント（https://code.claude.com/docs/）の各ページ。下の表では「CC: ページ名」と書く
- Claude 開発者向け公式ドキュメント（https://platform.claude.com/docs/）の各ページ。「PF: ページ名」と書く
- Claude Code 同梱の claude-api 資料（`shared/evals/build-eval.md`、`shared/evals/eval-audit.md`）。「同梱: ファイル名」と書く

Claude Code の機能名・設定ファイル名・オプション名は変わりやすい。公開前に、下の各ページで変わっていないかを見直すこと。

## 仕様（一次情報で確認できたもの）

### CLAUDE.md

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 1 | `CLAUDE.md` の置き場所は4つ（組織の管理ポリシー、ユーザー、プロジェクト、ローカル） | 正しい | CC: memory「Choose where to put CLAUDE.md files」の表。Managed policy／User instructions／Project instructions／Local instructions |
| 2 | ユーザーは `~/.claude/CLAUDE.md`。自分のすべてのプロジェクトに効く | 正しい | 同じ表。「Personal preferences for all projects」 |
| 3 | プロジェクトは `./CLAUDE.md`。チームで共有する | 正しい | 同じ表。「`./CLAUDE.md` or `./.claude/CLAUDE.md`」「Team members via source control」。画面には `./CLAUDE.md` だけを出した |
| 4 | ローカルは `./CLAUDE.local.md`。個人用で、Git にコミットしない | 正しい | 同じ表。「Personal project-specific preferences; add to `.gitignore`」 |
| 5 | 見つかったファイルは、上書きされず、すべてつなげて読み込まれる | 正しい | CC: memory「How CLAUDE.md files load」。「All discovered files are concatenated into context rather than overriding each other」 |
| 6 | `@` に続けてパスを書くと、別のファイルを取り込める。相対パスの基準は、取り込みを書いたファイル | 正しい | CC: memory「Import additional files」。「Relative paths resolve relative to the file containing the import, not the working directory」 |
| 7 | `CLAUDE.md` は、毎回、会話の最初に読み込まれる。文脈として読まれるだけで、強制力はない | 正しい | CC: memory。「Both are loaded at the start of every conversation. Claude treats them as context, not enforced configuration」 |
| 8 | 確実に止めたいなら、ツール実行前に動くフック（`PreToolUse`）か、権限の拒否（`deny`）ルールを使う | 正しい | CC: memory「To block an action regardless of what Claude decides, use a PreToolUse hook instead」。CC: permissions「Permission rules are enforced by Claude Code, not by the model」「Deny rules prevent Claude Code from using the specified tool」 |

### 設定ファイルの優先順位

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 9 | 同じキーが複数の場所にあると、上の階層の値が使われる | 正しい | CC: settings「Settings precedence」。「Claude Code uses the value from the highest level that sets it」 |
| 10 | 優先順位は高い順に、組織の管理設定、コマンドライン、プロジェクトのローカル、プロジェクトの共有、ユーザー | 正しい | 同上。「managed settings, command line, project local, shared project, user」 |
| 11 | 管理設定は、ほかの設定では上書きできない | おおむね正しい | 「Nothing in your own settings files or `--settings` overrides a managed key」。ただし、ごく一部の安全に関わるキーは、下の階層のより厳しい値が優先される（「Exceptions to managed settings precedence」）。動画では触れていない |
| 12 | コマンドラインは `--settings` で渡す設定で、そのセッションだけに効く | 正しい | 同上。「JSON you pass with `--settings <file-or-json>` …, for that session only」 |
| 13 | ローカルは `.claude/settings.local.json`、共有は `.claude/settings.json`、ユーザーは `~/.claude/settings.json` | 正しい | CC: settings「Settings files and who they affect」の表 |
| 14 | 共有の設定は、リポジトリにコミットしてチームで使う | 正しい | 同上。「Commit `.claude/settings.json` so everyone who clones the repository gets the same permissions, hooks, and plugin settings」 |
| 15 | 個人用のローカル設定は、共有の設定より強い（クイズの正解も同じ。`model` の例） | 正しい | CC: settings「Keep personal settings out of a repository」。チームのファイルが `model` を指定していても、ローカルに別の `model` を書けば自分のセッションだけ変わる、という例が載っている |
| 16 | 許可ルールのようなリスト（`permissions.allow` など）は、上書きではなく結合される | 正しい | CC: settings「Lists merge instead of overriding」。モデルの一覧に関する4つのキーは別の決まり（動画では触れていない） |
| 17 | 権限のルールは、拒否（`deny`）→ 確認（`ask`）→ 許可（`allow`）の順に評価される | 正しい | CC: permissions「Rules are evaluated in order: deny, then ask, then allow」 |
| 18 | どこか1つの階層で拒否されていれば、ほかの階層の許可ではくつがえせない | 正しい | CC: permissions「Settings precedence」。「If a tool is denied at any level, no other level can allow it」 |

### スキルとサブエージェント

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 19 | スキルは `.claude/skills/<名前>/SKILL.md` に置く | 正しい | CC: skills「Choose where skills load」の表（Project）。個人用は `~/.claude/skills/` |
| 20 | ふだんコンテキストに入っているのは説明文（`description`）だけ。本文は呼び出されたときに読み込まれる | 正しい（既定の動作） | CC: skills「Control who invokes a skill」の表。「Description always in context, full skill loads when invoked」。`disable-model-invocation: true` を付けたスキルは、説明文も入らない |
| 21 | 本文が読み込まれるのは、Claude が必要と判断したときか、スラッシュコマンドで呼び出したとき | 正しい | CC: skills 冒頭。「Claude uses skills when relevant, or you can invoke one directly with `/skill-name`」 |
| 22 | 長い資料は補助ファイルに分ける。必要なときだけ読まれる | 正しい | CC: skills「Add supporting files」。「letting Claude access detailed reference material only when needed」 |
| 23 | 以前のカスタムコマンドは、スキルに統合された | 正しい | CC: skills 冒頭。「Custom commands have been merged into skills」。`.claude/commands/` のファイルは引き続き動く |
| 24 | サブエージェントは `.claude/agents/` に Markdown のファイルで定義する | 正しい | CC: sub-agents「Choose the subagent scope」「Write subagent files」。個人用は `~/.claude/agents/` |
| 25 | `name` と `description` は必須。`description` には、どんなときに任せるかを書く | 正しい | CC: sub-agents「Frontmatter reference」。「Only `name` and `description` are required」「When Claude should delegate to this subagent」 |
| 26 | `tools` で使えるツールを絞れる。画面の例（`tools: Read, Glob, Grep`） | 正しい | 同上。公式の `code-reviewer` の例と同じ指定。省略すると、使えるツールをすべて引き継ぐ |
| 27 | 本文は、そのサブエージェントのシステムプロンプトになる | 正しい | CC: sub-agents「The body becomes the system prompt that guides the subagent's behavior」 |
| 28 | サブエージェントは独立したコンテキストで作業し、要約だけを返す | 正しい | CC: sub-agents 冒頭。「the subagent does that work in its own context and returns only the summary」 |

### CI で使う

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 29 | CI やスクリプトからは `claude -p` で、対話なしで実行する | 正しい | CC: headless（Run Claude Code programmatically）。「To run Claude Code in non-interactive mode, pass `-p` with your prompt」 |
| 30 | 出力形式は `text`、`json`、`stream-json` の3つ。`json` にすると結果とセッション ID が返る | 正しい | CC: headless「Get structured output」。「`json`: structured JSON with result, session ID, and metadata」 |
| 31 | `--allowedTools` には、確認なしで使ってよいツールを書く | 正しい | CC: headless「Auto-approve tools」。CC: cli-reference「Tools that execute without prompting for permission」 |
| 32 | 組み込みのツールそのものを絞るのは `--tools` | 正しい | CC: cli-reference「`--tools`: Restrict which built-in tools Claude can use」。`--allowedTools` の項にも「To restrict which tools are available, use `--tools` instead」とある。`--tools` は MCP のツールには効かない |
| 33 | 続きを実行するときは `--resume` にセッション ID を渡す | 正しい | CC: headless「Continue conversations」 |
| 34 | 画面のコード（`claude -p … --output-format json --allowedTools "Read" \| jq -r '.session_id'`、`--resume "$id"`） | 正しい | CC: headless の例（`session_id=$(claude -p "Start a review" --output-format json \| jq -r '.session_id')`）に、同じページの `--allowedTools "Read"` を足し、変数名を短くしたもの |

### 評価とデバッグ

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 35 | 先に、成功基準を、数値で測れる形で決めておく | 正しい | PF: Define success criteria and build evaluations。冒頭の「starts with clearly defining your success criteria」と、Specific／Measurable の説明（「Use quantitative metrics or well-defined qualitative scales」） |
| 36 | 評価セットは実際の入力の分布を反映させ、エッジケース（極端に長い入力、関係のない入力など）を入れる | 正しい | PF: 同ページ「Eval design principles」。「Design evals that mirror your real-world task distribution. Don't forget to factor in edge cases!」。エッジケースの例に「Irrelevant or nonexistent input data」「Overly long input data or user input」 |
| 37 | 採点の方法は、コード、モデル（LLM）、人の3つ。コードがいちばん速く確実。人は柔軟で質が高いが、遅くてコストがかかる | 正しい | PF: 同ページ「Grade your evaluations」。「Code-based grading: Fastest and most reliable」「Human grading: Most flexible and high quality, but slow and expensive」「LLM-based grading: Fast and flexible, scalable and suitable for complex judgment」 |
| 38 | モデルによる採点には明確なルーブリックを与え、信頼できるかを確かめてから広げる | 正しい | 同上。「Have detailed, clear rubrics」「Test to ensure reliability first, then scale」 |
| 39 | 出力が途中で切れていて `stop_reason` が `max_tokens` なら、上限による打ち切り | 正しい | PF: Handling stop reasons。「Claude stopped because it reached the `max_tokens` limit specified in your request」 |
| 40 | 400（`invalid_request_error`）は、リクエストの形式か内容の誤り | おおむね正しい | PF: Errors。「There's an issue with the format or content of your request」。400 は、自分で設定した利用額の上限に達したときにも返る（動画では触れていない） |
| 41 | ツールを使った直後にエラーが出るなら、ツールの結果（`tool_result`）の返し忘れを疑う | 正しい | PF: Troubleshooting tool use「Errors at request time」。「`tool_use ids were found without tool_result blocks immediately after` — Missing `tool_result` for some `tool_use` IDs」 |

## 設計上の助言（仕様ではないもの）

次は「こう決まっている」という仕様ではなく、進め方の助言。出典が公式のガイドのものは、その名前を書いた。
動画でも「公式がこう定めている」という言い方はしていない。

- **過去の失敗例を評価セットに入れる。** 出典は同梱の build-eval.md（「Bug reports, support tickets, or "this went wrong" examples. Often the most valuable inputs are the ones someone complained about」）。
- **プロンプトやモデルを変えるたびに、同じ評価セットをもう一度実行する。** 出典は同梱の build-eval.md（「The eval is only useful if the user can rerun it - on the next model, …, after the next prompt rewrite」）。既存の教材（音声講座の第8章）の「回帰テストとして同じセットを実行」と同じ内容。
- **機械的に判定できるものは、まずコードで採点する。** 出典は PF の同ページ（「choose the fastest, most reliable, most scalable method」）と、同梱の build-eval.md（「prefer a programmatic check wherever one exists」）。
- **`--allowedTools` に書くツールは、必要なものだけにする。** 最小権限の考え方で、既存の教材に基づく。公式ドキュメントの文言と照合したものではない。
- **レビュー用のサブエージェントは、読み取り系のツールだけにする。** 公式の `code-reviewer` の例がこの形だが、「そうすべき」と明文で定めているわけではない。
- **デバッグは、症状から原因を切り分ける。** 既存の教材に基づく進め方。個々の症状と原因の対応は、上の表の 39〜41 で確認した。

## 元の教材から変えた点

- **「配点は小さいものの、確実に取りたい」「頻出です」は使っていない。** 配点や出題傾向は公式の根拠がない。
- **「ヘッドレスモード」という呼び方をやめた。** 現在の公式ドキュメントは「non-interactive mode（非対話モード）」と呼んでおり、本文に headless という語は出てこない（URL に残っているだけ）。動画では「`claude -p` で、対話なしで実行する」と言っている。
- **「`--allowedTools` で、許可するツールを最小限に絞る」を言い換えた。** `--allowedTools` は「確認なしで使ってよいツール」の指定で、使えるツールを減らすものではない。使える組み込みツールを絞るのは `--tools`。動画では両方を分けて説明した。
- **「カスタムコマンドはスキルに統合された」を足した。** 教材にはないが、公式ドキュメントの冒頭に明記されている変更点。
- **「段階的開示」という用語は声に出していない。** 用語自体は公式（PF: Agent Skills の概要に「progressive disclosure」）にあるが、Claude Code のドキュメントには出てこないので、動作の説明（説明文 → 本文 → 補助ファイル）だけにした。
- **「チームで共有する設定」の場面（`.mcp.json`）は入れていない。** 内容は正しい（CC: mcp「Project scope」。プロジェクトのルートの `.mcp.json` をコミットする）が、長さを抑えるために外した。`.claude/settings.json` をコミットする点は、優先順位の場面に残した。
- **「LLM-as-a-judge」は、声では「モデルによる採点」と言い、画面に「LLM」と出している。** 公式ページの呼び方は「LLM-based grading」。声で「LLM」と言わないのは、音声エンジンが「エルエル／エム」と途中で区切って読むため。
- **成功基準の具体例（公式ページの「F1 スコア 0.85 以上」など）は入れていない。** 「先に、数値で測れる形で決めておく」の1文にまとめた。
- **「人の判定と突き合わせて妥当性を確かめる」は「信頼できるかを確かめてから、広げる」にした。** 公式ページの文言（「Test to ensure reliability first, then scale」）に合わせた。人の判定との突き合わせは、同梱の eval-audit.md に「Calibrated against human labels」としてある。
- **クイズを4択に作り直した。** 教材は「共有とローカルのどちらが優先か」の2択。ユーザー設定と「最後に編集したファイル」を誤答に足した。問題は自作。
- **`CLAUDE.md` の取り込みの深さ（最大4段）、`.claude/rules/`、`AGENTS.md` の読み込み、自動メモリ、`--bare`（スクリプト向けの最小モード）、`--continue` には触れていない。** いずれも公式ドキュメントにあるが、長さを抑えるために外した。

## 未確認のまま残っている主張

なし（設計上の助言は、上のとおり仕様としては扱っていない）。

ただし、この回の内容が「試験の範囲にどこまで含まれるか」は確認していない（試験ガイドを参照していないため）。
教材にない点として足した `--tools` と `--allowedTools` の違い、カスタムコマンドのスキルへの統合は、内容そのものは上の表のとおり公式ドキュメントで確認済み。

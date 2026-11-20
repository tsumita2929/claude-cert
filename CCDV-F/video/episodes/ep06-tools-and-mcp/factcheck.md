# 事実確認：ep06-tools-and-mcp（ツールと MCP）

確認日: 2026-11-14

根拠は次の2つ。どちらも 2026-11-14 に読んで照合した。

- **公式ドキュメント**（Web で取得した Markdown 版）。Claude の API は https://platform.claude.com/docs/ 、MCP は https://modelcontextprotocol.io/ 。
  表の「根拠」に書いたページ名は、末尾の「参照したページ」の URL に対応する。
- **Claude Code 同梱の claude-api 資料**（Claude Code 2.1.325 に同梱のもの。`shared/tool-use-concepts.md`、`shared/agent-design.md`）。表では「同梱資料」と書く。

MCP の仕様は、取得した時点で版 `2026-07-28` が掲載されていた。公開前に、該当ページで変わっていないかを見直すこと。

## API の仕様（一次情報で確認できたもの）

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 1 | 自分で定義するツールは、名前（`name`）・説明（`description`）・`input_schema` の3つで定義する | 正しい | Define tools「A user-defined tool definition includes」の表。`input_examples` は任意の4つ目。同梱資料「Each tool requires a name, description, and JSON Schema for its inputs」 |
| 2 | `input_schema` は、入力の形を JSON Schema で定義する | 正しい | 同上「A JSON Schema object defining the expected parameters for the tool」 |
| 3 | 入力の項目名は `input_schema`。`parameters` ではない（画面の補足） | 正しい | 同じ表に `parameters` という項目はない。「`parameters` で送ると何が起きるか」までは確認していないので、台本では言っていない |
| 4 | コード例（`get_weather`、`location` を必須にしたスキーマ） | 正しい | Define tools と同梱資料の例を短くしたもの。形は同じ |
| 5 | Claude は、説明文を手がかりに、ツールを使うかどうかを判断する | 正しい | Tool use overview「Claude determines when to call a tool based on the user's request and the tool's description」 |
| 6 | Claude が `tool_use` のブロックを返す。ツールの名前（`name`）と入力（`input`）が入っている | 正しい | Handle tool calls「one or more `tool_use` content blocks that include: `id` / `name` / `input`」 |
| 7 | 自分で定義したツールは、アプリが実行する | 正しい | 同上「Run the actual tool in your code base」 |
| 8 | 結果は、次の `user` メッセージの `tool_result` ブロックで返す。`tool_use_id` で呼び出しと対応させる | 正しい | 同上「sending a new message with the `role` of `user`, and a `content` block containing the `tool_result` type」「`tool_use_id`: The `id` of the tool use request this is a result for」 |
| 9 | Claude は、1回の応答で複数のツールを呼ぶことがある | 正しい | Parallel tool use「By default, Claude may call multiple tools in a single response」 |
| 10 | その場合、すべての結果を、1つの `user` メッセージにまとめて返す | 正しい | 同上「return one `tool_result` for each `tool_use` block, all together in the next user message」。分けて送るのは「Wrong」と明記 |
| 11 | テキストを添えるなら結果の後ろ。結果より前に置くとエラーになる | 正しい | Handle tool calls「the `tool_result` blocks must come FIRST in the content array. Any text must come AFTER all tool results」。テキストを前に置いた例に「this causes a 400 error」 |
| 12 | 画面の例（`tool_result` 2つの後ろに `text` ブロック） | 正しい | 同上の「Text after tool_result」の例と同じ並び。Claude が呼んだのがクライアントツールだけの場合の形 |
| 13 | 失敗したときも結果を省略せず、`tool_result` に `is_error: true` を付けて返す | 正しい | Handle tool calls「Handling errors with is_error」。Parallel tool use「still return a `tool_result` for it with `is_error: true`」 |
| 14 | `tool_choice` は `auto`・`any`・`tool`・`none` の4種類。それぞれの意味 | 正しい | Define tools「there are four possible options」 |
| 15 | `auto` は、ツールを渡したときの既定 | 正しい | 同上「This is the default value when `tools` are provided」 |
| 16 | `any` と `tool`（強制指定）は、新しいモデルの一部で 400 エラーになる | 正しい | Define tools「Forcing tool use」の表と、Errors「Forced tool use not supported」。対象は Claude Fable 5.2、Claude Mythos 5.2、Claude Opus 5.5、Claude Sonnet 5.5、Claude Fable 5.1、Claude Mythos 5.1。同梱資料にも同じ記述 |
| 17 | 画面の「対象のモデル：Opus 5.5、Sonnet 5.5 など」 | 正しい | 同上。6つのうち2つを例として出している |
| 18 | `auto` と `none` は、これらのモデルでも使える（画面の補足） | 正しい | Errors「`tool_choice: {"type": "auto"}` (the default) and `{"type": "none"}` are accepted」 |
| 19 | 代わりに、`auto` のままプロンプトでツールを使うよう指示する。入力をスキーマどおりにしたいなら `strict: true` | 正しい | Define tools の表の「What to use instead」（`auto` with strict tool use。Prompting still influences which tool `auto` picks）。同梱資料「Use `{"type": "auto"}` and state the expectation in the prompt」 |
| 20 | ツールは、実行する場所で2種類（クライアントツールとサーバーツール） | 正しい | Tool use overview「Tools differ primarily by where the code runs」 |
| 21 | 自分で定義するツールはクライアントツール。bash・テキストエディタ・メモリは、Anthropic がスキーマを定義し、アプリが実行する | 正しい | 同上「Client tools (including user-defined tools and tools with Anthropic-defined schemas, such as `bash` and `text_editor`) run in your application」。Tool reference の表で Memory・Bash・Text editor は Execution が Client |
| 22 | サーバーツールは Anthropic の側で実行される。Web 検索、Web フェッチ、コード実行、ツール検索 | 正しい | 同上「Server tools (such as `web_search`, `web_fetch`, `code_execution`, and `tool_search`) run on Anthropic's infrastructure」。Tool reference の表で Execution が Server |
| 23 | ツールが数百もある場合は、ツール検索ツールを使う（画面は「数百、数千とあるとき」） | 正しい | Tool search tool「lets Claude work with hundreds or thousands of tools by discovering and loading them on demand」 |
| 24 | `defer_loading: true` を付けたツールは、最初はコンテキストに読み込まれず、Claude が検索して必要なものだけを読み込む | 正しい | 同上「Tools with `defer_loading: true` load only when Claude discovers them through search」 |
| 25 | MCP は Model Context Protocol の略。AI アプリと外部のシステムをつなぐ、オープンな標準 | 正しい | MCP 公式「What is the Model Context Protocol (MCP)?」の「an open-source standard for connecting AI applications to external systems」 |
| 26 | ホストは Claude Code のような AI アプリ。接続するサーバーごとにクライアントを1つ作る。サーバーはツールやデータを提供するプログラム | 正しい | MCP 公式「Architecture overview」の Participants。「creating one MCP client for each MCP server」 |
| 27 | サーバーが提供する主な要素（プリミティブ）は、ツール・リソース・プロンプトの3つ | 正しい | 同上「MCP defines three core primitives that servers can expose」 |
| 28 | ツールはモデルが制御、リソースはアプリケーションが制御、プロンプトはユーザーが制御 | 正しい | MCP 仕様「Server > Overview」の control hierarchy の表（Model-controlled／Application-controlled／User-controlled）。「Understanding MCP servers」の表も同じ |
| 29 | 通信方式は stdio と Streamable HTTP の2つ | 正しい | Architecture overview「MCP supports two transport mechanisms」。仕様「Transports」 |
| 30 | stdio は標準入出力でやり取りし、クライアントがサーバーを起動する。ローカル向け | 正しい | 仕様 Transports「the standard streams of a client-launched subprocess」。Architecture overview「Local MCP servers that use the STDIO transport」 |
| 31 | Streamable HTTP はネットワーク越し（リモート向け） | 正しい | Architecture overview「This transport enables remote server communication」 |
| 32 | 以前の HTTP の方式（HTTP+SSE）は非推奨 | 正しい | 仕様「Deprecated Features」の表。HTTP+SSE transport、Deprecated in `2025-03-26`、移行先は Streamable HTTP |
| 33 | MCP コネクタは Messages API のベータ機能。Anthropic の側からリモートの MCP サーバーに接続する | 正しい | MCP connector（status: beta）「connect to remote MCP servers directly from the Messages API without a separate MCP client」。同梱資料「Anthropic makes the MCP connection server-side」 |
| 34 | サーバーは HTTP で外部に公開しておく必要がある。ローカルの stdio サーバーにはつなげない（見出しの「リモート専用」） | 正しい | 同上 Limitations「The server must be publicly exposed through HTTP … Local STDIO servers cannot be connected directly」 |
| 35 | MCP コネクタで使えるのはツールの呼び出しだけ（画面の補足） | 正しい | 同上 Limitations「only tool calls are currently supported」 |
| 36 | リクエストには `mcp_servers` と、`tools` の中の `mcp_toolset` の両方を書く。`mcp_toolset` はサーバーを名前で指す | 正しい | 同上「Pass `mcp_servers` and a matching `mcp_toolset` in `tools` on each request」。Validation rules「Every MCP server defined in `mcp_servers` must be referenced by exactly one MCPToolset」 |
| 37 | クイズ：2つの結果は1つの `user` メッセージにまとめる。結果は呼び出しごとに1つずつ必要 | 正しい | 10・11 と同じ。Parallel tool use「return one `tool_result` for each `tool_use` block」 |

## 設計上の助言（API の仕様ではないもの）

次は「こうしないとエラーになる」という仕様ではなく、うまく動かすための助言。出典は公式ドキュメントのガイドで、台本でも言い切りすぎない形にしている。

| 台本の内容 | 出典 |
|---|---|
| 説明文は詳しく書く。何をするか、いつ使い・いつ使わないか、パラメータの意味、制約や注意点 | Define tools「Best practices for tool definitions」の「Provide extremely detailed descriptions」 |
| 1つのツールの説明は、少なくとも3〜4文（画面の補足） | 同上「Aim for at least 3–4 sentences for each tool description」 |
| ツールが返す結果は、Claude の判断に必要な項目に絞る | 同上「Design tool responses to return only high-signal information」 |
| エラーの内容には、何が起きたかと、次に何を試せるかを書く。Claude が立て直しやすくなる | Handle tool calls の Tip「Write instructive error messages … include what went wrong and what Claude should try next」 |

## 元の教材（音声講座の第6章）から変えた点

**古くなっていた・言い方が合わなくなっていた点**

- **`tool_choice` の `any` と `tool`。** 教材は「必ず使わせる」とだけ説明していた。現在は、新しいモデルの一部（上の16）で 400 エラーになる。台本では1場面を使ってこの変更を説明し、代わりの方法を示した。
- **ツールの分類。** 教材は「カスタムツール／クライアントツール／サーバーツール」の3種類とし、「クライアントツール」を Anthropic がスキーマを定義するツールだけの名前として使っていた。公式の分類は「実行する場所」で2種類で、自分で定義するツールもクライアントツールに含まれる。台本は公式の分け方に合わせた。
- **サーバーツールの例。** 公式の一覧に合わせて、ツール検索もサーバーツールとして出した。

**確認が取れなかったので外した点**

- **「`parameters` という名前で渡すと受け付けられない」。** 項目名が `input_schema` であることは確認できたが、`parameters` で送ったときの挙動を書いた公式の記述は見つけられなかった。画面に「`parameters` ではない」と出すだけにした。
- **「`tool_result` が欠けていると 400 エラー」。** 公式には、結果が欠けているときのエラーメッセージの例はあるが、状態コードまでは書かれていない。400 と明記されているのは「テキストを結果より前に置いた場合」なので、台本ではそちらを使った。

**確認は取れたが、長さの都合で入れなかった点**

- ツールの結果に含める識別子の選び方、件数が多いときのページングや切り詰め
- ツールの入力は文字列のまま照合せず、JSON として解析してから検査する（同梱資料のモデル移行の章に記述あり）
- MCP のエラーの2種類（プロトコルのエラーは JSON-RPC のエラー、ツール実行のエラーは結果に `isError: true`）。MCP 仕様「Server > Tools」の Error Handling で確認済み。なお、MCP 側の項目名は `isError` で、Claude の API の `is_error` とは書き方が違う
- スキル／MCP／カスタムツール／組み込みツールの使い分け（設計上の助言）
- `disable_parallel_tool_use`、ツールランナー、`pause_turn`
- 手動の拡張思考（`thinking: {type: "enabled"}`）でも強制指定がエラーになること

**そのほか**

- 「出題されます」「ひっかけ」などの出題傾向の話は入れていない（根拠がない）。
- ミニクイズは、教材の「プリミティブを制御するのは誰か」から、並列ツールの結果の返し方に変えた。自作の問題集（D8-03）を短く作り直したもの。

## 未確認のまま残っている主張

なし。

読みについて（事実ではなく発音の選択）: `none` を「ノン」、`stdio` を「エスティーディーアイオー」と読ませている。どちらも元の教材の読みに合わせたもの。

## 参照したページ（2026-11-14 取得）

- Tool use overview: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
- Define tools: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
- Handle tool calls: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls
- Parallel tool use: https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use
- Tool reference: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference
- Tool search tool: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool
- MCP connector: https://platform.claude.com/docs/en/agents-and-tools/mcp-connector
- Errors: https://platform.claude.com/docs/en/api/errors
- MCP「What is the Model Context Protocol (MCP)?」: https://modelcontextprotocol.io/docs/getting-started/intro
- MCP「Architecture overview」: https://modelcontextprotocol.io/docs/learn/architecture
- MCP「Understanding MCP servers」: https://modelcontextprotocol.io/docs/learn/server-concepts
- MCP 仕様「Server > Overview」: https://modelcontextprotocol.io/specification/2026-07-28/server/index
- MCP 仕様「Server > Tools」: https://modelcontextprotocol.io/specification/2026-07-28/server/tools
- MCP 仕様「Transports」: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/index
- MCP 仕様「Deprecated Features」: https://modelcontextprotocol.io/specification/2026-07-28/deprecated

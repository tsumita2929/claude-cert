# 事実確認：ep03-tools-and-mcp（ツール設計と MCP 統合）

確認日: 2026-11-16

根拠は次の3つ。台本の主張は、すべて素材（`CCAR-F/course/ch03.md`）の「## 事実確認」の表（2026-11-16 に一次情報で照合済み）から該当する行を引いた。素材にない主張は台本に足していない。

- **試験ガイド**: Claude Certified Architect – Foundations 試験ガイド v1.0（日本語版・英語版。`CCAR-F/reference/` の PDF とテキスト）。分野2 タスク 2.1〜2.5
- **公式ドキュメント**: platform.claude.com/docs、code.claude.com/docs、modelcontextprotocol.io の各ページ（URL は末尾の一覧）
- **公式記事**: Anthropic Engineering「Writing effective tools for agents」

試験ガイドは2026年3月の製品を前提にしている。現行のドキュメントと食い違う点は、素材と同じく **ガイドの立場を主にし、現行の違いを一言添えた**（下の「食い違いの扱い」）。

## 台本の主張と根拠

| # | 台本の主張（場面） | 判定 | 根拠（素材の表の行） |
|---|---|---|---|
| 1 | 分野2 ツール設計と MCP 統合は、配点18%（open） | 正しい | 素材 #1：reference/outline.md（公式ガイド v1.0 の値）／試験ガイド 日本語版「分野2：ツール設計とMCP統合」 |
| 2 | モデルは、ツールの説明を主な手がかりに、使うツールを選ぶ。似た短い説明だと取り違えが起きる（overlap） | 正しい | 素材 #2：試験ガイド タスク 2.1 知識1／ https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools 「Provide extremely detailed descriptions. This is by far the most important factor in tool performance.」 |
| 3 | 説明には、目的、入力の形式、クエリの例、エッジケース、似たツールではなくこれを使う場面を書く（describe） | 正しい | 素材 #3：試験ガイド タスク 2.1 知識2・スキル1／同ページ「What the tool does / When it should be used (and when it shouldn't) / What each parameter means… / caveats or limitations」 |
| 4 | ほぼ同じ説明の `analyze_content` と `analyze_document` は取り違えを生む。重なるなら `extract_web_results` のように改名する。汎用ツールは、入出力の決まった目的別のツールに分ける（overlap） | 正しい | 素材 #4：試験ガイド タスク 2.1 知識3・スキル2・スキル3／ https://www.anthropic.com/engineering/writing-tools-for-agents 「When tools overlap in function or have a vague purpose, agents can get confused about which ones to use.」 |
| 5 | システムプロンプトの、キーワードに反応する指示も見直す。説明を打ち消すから（first） | 正しい | 素材 #5：試験ガイド タスク 2.1 知識4・スキル4（「適切に書かれたツールの説明を上書きしてしまう可能性のある、キーワードに敏感な指示」） |
| 6 | 最初の一手は説明の充実。few-shot の例やキーワードの振り分け層は、重いうえに原因に届かない（first） | 正しい（ガイドのサンプル問題の考え方） | 素材 #6：reference/blueprint.md 7-1 Q2（公式サンプル問題の要旨）。問題文は写していない |
| 7 | 失敗は、結果に `isError` を付けて伝える（errors） | 正しい | 素材 #7：試験ガイド タスク 2.2 知識1／ https://modelcontextprotocol.io/specification/latest/server/tools 「Tool Execution Errors … are reported in tool results with isError: true」 |
| 8 | どれも「Operation failed」と返すと、エージェントは次の手を決められない。一時的、検証、ビジネス、権限のエラーを区別する（errors） | 正しい | 素材 #8：試験ガイド タスク 2.2 知識2・知識3 |
| 9 | エラーの種類（`errorCategory`）、リトライできるか（`isRetryable`）、人が読める説明を構造化して返す。（ルール違反の扱いは長さの都合で省いた）（errors） | 正しい | 素材 #9：試験ガイド タスク 2.2 スキル1・スキル2 |
| 10 | `errorCategory` と `isRetryable` は、MCP の仕様ではなく自分で決める項目（errors の画面の補足） | 正しい | 素材 #10： https://modelcontextprotocol.io/specification/latest/server/tools と 2025-06-18 版。ツールの結果の項目は `content`、`structuredContent`、`isError` などで、分類やリトライ可否の項目は定義されていない |
| 11 | 一時的な失敗はサブエージェントの中で立て直す。解決できないものだけを、途中の結果と試したことと一緒にコーディネーターへ（escalate） | 正しい | 素材 #11：試験ガイド タスク 2.2 スキル3 |
| 12 | 該当なしは正常な空の結果として成功で返し、アクセスの失敗と区別する（empty） | 正しい | 素材 #12：試験ガイド タスク 2.2 スキル4 |
| 13 | 4〜5個ではなく18個のツールを渡すと、選択の信頼性が下がる。専門外のツールは誤用されがち（統合エージェントのウェブ検索）（scope） | 正しい | 素材 #13：試験ガイド タスク 2.3 知識1・知識2／ https://www.anthropic.com/engineering/writing-tools-for-agents 「Too many tools or overlapping tools can also distract agents from pursuing efficient strategies.」 |
| 14 | 各サブエージェントには、役割に必要なツールだけを渡す（scope） | 正しい | 素材 #14：試験ガイド タスク 2.3 知識3・スキル1／ https://code.claude.com/docs/en/agent-sdk/subagents 「Tool restrictions: subagents can be limited to specific tools」 |
| 15 | 汎用の `fetch_url` を、文書の URL かを検証する `load_document` に置き換える。頻度の高い用途だけ `verify_fact` のような範囲を絞った横断ツール（scope） | 正しい | 素材 #15：試験ガイド タスク 2.3 スキル2・スキル3／ reference/blueprint.md 7-1 Q9 |
| 16 | `tool_choice` は3種類。`auto` はモデルに任せる、`any` は必ずどれかを呼ばせる、名前の指定（`tool`）は特定のツールを強制する（choice） | 正しい | 素材 #16：試験ガイド タスク 2.3 知識4・スキル4・スキル5（「エンリッチメントツールの前に extract_metadata を強制する」）／ https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools 「auto allows Claude to determine whether to call any provided tools… any tells Claude that it must use one of the provided tools… tool forces Claude to always use a particular tool」 |
| 17 | 2026年11月時点、新しいモデルの一部では `any` と `tool`（強制の指定）がエラーになる。`auto` とプロンプトの指示や、`strict: true` で代える（choice） | 正しい（現行の違い） | 素材 #17：同ページ「Claude Fable 5.2, Claude Mythos 5.2, Claude Opus 5.5, Claude Sonnet 5.5, Claude Fable 5.1, and Claude Mythos 5.1: any and tool return a 400 error」「What to use instead: auto with strict tool use… Prompting still influences which tool auto picks」 |
| 18 | チームで共有するサーバーはプロジェクトの `.mcp.json` に書いてコミット。個人用・試験的なものはユーザーの `~/.claude.json`（config） | 正しい | 素材 #18：試験ガイド タスク 2.4 知識1・スキル1・スキル2／ https://code.claude.com/docs/en/mcp 「Project … Shared with team: Yes, via version control … .mcp.json in project root」「User-scoped servers are stored in ~/.claude.json」 |
| 19 | トークンは直接書かず、`${GITHUB_TOKEN}` のような環境変数の展開で渡す（config） | 正しい | 素材 #19：試験ガイド タスク 2.4 知識2／ https://code.claude.com/docs/en/mcp 「You can reference an environment variable in a server's command, args, env, url, or headers value… ${VAR}」 |
| 20 | 設定したサーバーのツールは、すべて接続時に検出され、同時に使える（config） | 正しい（ガイドの立場） | 素材 #20：試験ガイド タスク 2.4 知識3 |
| 21 | 2026年11月時点の Claude Code では、定義を必要なときに読み込むツール検索が既定（config） | 正しい（現行の違い） | 素材 #21： https://code.claude.com/docs/en/mcp 「Tool search is enabled by default: MCP tools are deferred and discovered on demand.」 |
| 22 | Grep ばかり選ばれるなら、MCP ツールの説明に機能と出力を詳しく書く（mcptips） | 正しい | 素材 #22：試験ガイド タスク 2.4 スキル3 |
| 23 | Jira のような標準の連携は既存のコミュニティ製サーバー、自作はチーム固有の作業に（mcptips） | 正しい | 素材 #23：試験ガイド タスク 2.4 スキル4 |
| 24 | 課題の要約やデータベースのスキーマのような目録を MCP リソースで公開し、手探りの呼び出しを減らす（mcptips） | 正しい | 素材 #24：試験ガイド タスク 2.4 知識4・スキル5／ https://modelcontextprotocol.io/specification/2025-06-18/server/resources 「Resources allow servers to share data that provides context to language models, such as files, database schemas, or application-specific information.」 |
| 25 | 中身の検索は Grep（関数の呼び出し元など）、名前や拡張子のパターンは Glob、コマンドの実行は Bash、全体の読み書きは Read と Write、部分の修正は Edit（一意に一致するテキストで）（builtin・edit） | 正しい | 素材 #25：試験ガイド タスク 2.5 知識1〜3・スキル1／ https://code.claude.com/docs/en/tools-reference 「Grep: Searches for patterns in file contents」「Glob: Finds files based on pattern matching」「Bash: Executes shell commands」「Edit… old_string must appear exactly once」 |
| 26 | 同じテキストが何か所もあって Edit が失敗したら、Read で全体を読んでから Write（edit） | 正しい（ガイドの立場） | 素材 #26：試験ガイド タスク 2.5 知識4・スキル3 |
| 27 | コードベースは最初に全部を読まない。Grep で入口、Read で import をたどる。ラッパーを経由する関数は、エクスポートされた名前を洗い出してから各名前を検索（explore） | 正しい | 素材 #27：試験ガイド タスク 2.5 スキル4・スキル5 |
| 28 | 2026年11月時点の Claude Code では、macOS などで Grep と Glob が既定から外れ、Bash で検索する（builtin） | 正しい（現行の違い） | 素材 #28： https://code.claude.com/docs/en/tools-reference 「On macOS, Linux, and WSL, Claude Code leaves Glob and Grep out of the default tool set, and Claude searches with find and grep through the Bash tool instead.」 |
| 29 | ミニクイズ：接続の失敗は `isError` とリトライの可否を付けて返し、該当なしは成功として返すのが正解。3回までのリトライは無駄なリトライを生み、全体の停止は立て直しの機会を奪う（quiz） | 正しい | 素材 #29：試験ガイド タスク 2.2 スキル4・知識4。自作の問題（公式サンプルの文面は使っていない） |

## 食い違いの扱い（素材と同じ立場）

- **`tool_choice` の強制（choice）。** ガイドの3つの選択肢を主に教え、「2026年11月時点、新しいモデルの一部では強制の指定がエラーになる。`auto` とプロンプトの指示や、`strict: true` で代える」と一言添えた（素材の本文は作業中の 2026-11-16 09:26 に `strict: true` が書き足されたので、それに合わせた）。画面の補足では、エラーになるのが `any` と `tool` の両方であることを明示した（素材の本文の「強制の指定」は `tool` だけとも読めるため。素材 #17 と define-tools のページでは両方）。
- **MCP ツールの読み込み（config）。** ガイドの「すべてのツールが接続時に検出され、同時に使える」を主にし、現行の Claude Code ではツール検索が既定であることを一言添えた。
- **MCP サーバーのスコープ（config）。** ガイドのプロジェクト（`.mcp.json`）とユーザー（`~/.claude.json`）の2分類だけを書いた。現行の local スコープには触れていない（素材と同じ）。
- **Grep と Glob（builtin）。** ガイドの6つのツールで説明し、現行では macOS などで既定から外れ Bash で検索することを一言添えた。画面では「macOS など」とし、Linux と WSL は省いた。
- **Edit の一意性（edit）。** ガイドの立場（Read してから Write）だけを書いた。現行の `replace_all` には触れていない。
- **`errorCategory` の値。** ガイドのスキル1の例は transient／validation／permission の3つで、ビジネスエラーは知識2の側にある。台本は「エラーの種類を区別する。一時的、検証、ビジネス、権限の4つ」と言い、画面の `errorCategory` の説明は「エラーの種類を表す」にとどめた（値の一覧をガイドの例と食い違わせないため）。項目名は自分で決めるもの（#10）。

## 素材（音声講座の第3章）から変えた点

- **声と画面では「LLM」を「モデル」と言い換えた。** 音声エンジンが「LLM」を語の途中で区切るため（CCDV-F の回と同じ扱い）。
- **長い英語の名前は声で読んでいない。** `analyze_content`、`analyze_document`、`extract_web_results`、`${GITHUB_TOKEN}` は画面にだけ出し、声では「2つのツール」「名前も変える」「環境変数の展開」と言った。
- **省いた内容（長さの都合。7分に収めるため）。** `tool_choice` の強制の例（`extract_metadata` を最初に呼ばせ、続きは次のターンで処理する）、ビジネスルール違反に付けるリトライ不可の印と顧客向けの説明、横断ツールを渡しても複雑な確認はコーディネーター経由のままにする点、冒頭の5つのテーマの読み上げ。どれも誤りではなく、台本から外しただけ。
- **ミニクイズは素材の3択のまま、問題文を短くした。** 番号（1〜3番）は、画面に合わせて A〜C に読み替えた（正解は B ＝素材の2番）。
- **長さの都合で、言い回しを縮めた箇所がある。** 内容は足していない。

## 未確認のまま残っている主張

なし。素材の「確認できなかった点」と同じく、「Jira のような標準的な連携はコミュニティ製サーバー」「キーワードに反応するシステムプロンプトの指示」は、試験ガイドの記述だけを根拠にしている。

## 参照した URL

- https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
- https://www.anthropic.com/engineering/writing-tools-for-agents
- https://modelcontextprotocol.io/specification/latest/server/tools
- https://modelcontextprotocol.io/specification/2025-06-18/server/resources
- https://code.claude.com/docs/en/agent-sdk/subagents
- https://code.claude.com/docs/en/mcp
- https://code.claude.com/docs/en/tools-reference

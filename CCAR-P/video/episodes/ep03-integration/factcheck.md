# 事実確認：ep03-integration（統合の設計と認証・認可）

確認日: 2026-11-16

台本の主張は、すべて素材（`CCAR-P/course/ch03.md`）の本文にあるもの。素材の「事実確認」の表（2026-11-16 に、公式の試験ガイド v1.0 と公式ドキュメントで照合済み）から、台本に入れた主張に当たる行を引いた。
素材にない事実は、台本に足していない（自分で WebFetch して足した行はない）。表の「素材 #」は、素材の事実確認の表の番号。

根拠は次の3種類。

- **試験ガイド**: Claude Certified Architect – Professional 試験ガイド v1.0（2026年7月発効）。英語版と公式の日本語版
- **公式ドキュメント**: modelcontextprotocol.io の仕様（2025-11-25 版）、platform.claude.com/docs、code.claude.com/docs、support.claude.com
- **公式記事**: Anthropic Engineering の記事（writing-tools-for-agents、effective-context-engineering-for-ai-agents、multi-agent-research-system）

試験内容は 2026-12-07 に更新される予定（更新版の試験ガイドは 2026-11-17 に公開予定）。配点の数字は、台本で「現行の試験ガイド、バージョン1.0 では」と添えた。サムネイルと場面の見出しには、配点の数字を入れていない。

## オープニング

| # | 台本の主張 | 判定 | 根拠（素材 #） |
|---|---|---|---|
| 1 | 現行の試験ガイド v1.0 では、分野3「統合」の配点は19%で、7つの分野の中で最大 | 正しい | 素材 #1: 試験ガイド v1.0 §6（日本語版「3 統合 19%」）。outline.md の表とも一致 |
| 2 | この回は分野3の前半で、機能の肥大化、認証と認可、統合の手段、段階的ディスカバリーの4つを扱う（RAG と運用の見える化は次回） | 正しい | 素材 #2: 試験ガイド 分野3 のタスク（日本語版「ツールやエージェントの構成を、機能の肥大化の観点から評価する」「認証と認可の要件を分析し、セキュリティ上のギャップを特定する」「接続プロトコルを評価し、適切な統合メカニズム（MCP、API/CLI、エージェント間）を選択する」「段階的ディスカバリーと一括型コンテキスト戦略を比較評価する」）／ outline.md の章立て |

## 機能の肥大化

| # | 台本の主張 | 判定 | 根拠（素材 #） |
|---|---|---|---|
| 3 | 判断の軸は最小権限の原則。役割に要らない機能は、構成から取り除く | 正しい | 素材 #3: 試験ガイド §8 サンプル1の解説「Least privilege means removing capabilities the role does not require, eliminating the attack surface rather than monitoring or guarding it.」 |
| 4 | 例: 要約するだけのエージェントに付いた、顧客データを書き換えるツールは外す | 正しい（例は自作） | 素材 #3 の注記: 本文の例（要約エージェントと書き換えツール）は自作 |
| 5 | ログを足すのは発見的な統制、実行の前の確認は補完的な統制で、どちらも危ない機能は残る。モデルの大きさは認可の範囲と無関係 | 正しい | 素材 #3: 同解説「Logging (A) and confirmations (C) are detective/compensating controls … model size (D) is unrelated to authorization scope.」 |
| 6 | ツールが多すぎると、エージェントは迷いやすくなる | 正しい | 素材 #4: https://www.anthropic.com/engineering/writing-tools-for-agents 「More tools don't always lead to better outcomes.」「Too many tools or overlapping tools can also distract agents from pursuing efficient strategies.」／ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents 「bloated tool sets … lead to ambiguous decision points about which tool to use」 |
| 7 | 2026年11月時点のドキュメントでは、ツールが30から50個を超えると、選択の精度が落ちる | 正しい（数値は変わりうるので時点を明記） | 素材 #5: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool 「Claude's ability to pick the right tool degrades once you exceed 30–50 available tools.」 |

## 認証と認可

| # | 台本の主張 | 判定 | 根拠（素材 #） |
|---|---|---|---|
| 8 | MCP の認可は、仕様の上では任意。つないだだけでは守られない | 正しい | 素材 #6: https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization 「Authorization is OPTIONAL for MCP implementations.」 |
| 9 | ネットワーク越しの HTTP のサーバーは、OAuth 2.1 をもとにした認可の仕様に沿う | 正しい | 素材 #6・#7: 同仕様「Implementations using an HTTP-based transport SHOULD conform to this specification.」、Standards Compliance「OAuth 2.1 IETF DRAFT」 |
| 10 | 手元で起動する STDIO のサーバーは、資格情報を環境から受け取り、クライアントと同じ権限で動く。何を受け継いでいるかを確かめる | 正しい | 素材 #6: 同仕様「Implementations using an STDIO transport SHOULD NOT follow this specification, and instead retrieve credentials from the environment.」／ 素材 #8: https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices 「Warn that MCP servers run with the same privileges as the client」 |
| 11 | MCP サーバーは、自分あてに発行されたトークンだけを受け付ける。受け取ったトークンをそのまま先へ渡すのは仕様で禁止。先のサービスには別に発行されたトークンを使う | 正しい | 素材 #9: authorization 仕様「MCP servers MUST validate that access tokens were issued specifically for them as the intended audience」「The MCP server MUST NOT pass through the token it received from the MCP client.」「The access token used at the upstream API is a separate token, issued by the upstream authorization server.」／ security_best_practices「Token passthrough is explicitly forbidden」 |
| 12 | スコープは最初は最小にして、必要なときに広げる | 正しい | 素材 #10: security_best_practices の Scope Minimization「Minimal initial scope set … Incremental elevation via targeted WWW-Authenticate scope="..." challenges」 |
| 13 | 社員の入口は、組織の ID 基盤と SSO でつなぐ | 正しい（設計の勧めとして） | 素材 #11: 公式の対策講座（Partner Academy 講座2）の学習目標が ID の統合として SSO／OAuth を挙げる（公式の講座だが試験ガイドではない）／ https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso 「Single sign-on is available for Team plans, Enterprise plans, and Console organizations.」 |
| 14 | サーバーどうしの通信では、使い回す API キーより短期の資格情報を使う。漏れたときの被害が小さくなる | 正しい | 素材 #12: https://platform.claude.com/docs/en/manage-claude/authentication 「Federation removes long-lived Claude API keys from your environment, which limits the damage that a leaked credential can cause」 |

## 統合の手段

| # | 台本の主張 | 判定 | 根拠（素材 #） |
|---|---|---|---|
| 15 | MCP は、AI のアプリと外部のシステムをつなぐオープンな標準。一度作れば、複数のアプリで使い回せる | 正しい | 素材 #13: https://modelcontextprotocol.io/docs/getting-started/intro 「MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems.」「making it easy to build once and integrate everywhere」 |
| 16 | Claude Code のドキュメントによれば、相手に CLI があれば、たいていそれがいちばん簡単な入り口 | 正しい | 素材 #14: https://code.claude.com/docs/en/best-practices 「If that system has a CLI, that's usually the easiest way in.」 |
| 17 | 自分のアプリだけで使うなら、API を呼ぶ自作のツールで足りる。多くのアプリやチームで使う接続には MCP が向く | 正しい（本教材の整理） | 素材 #15: 自作ツールは「Tools you define … your code runs them and returns the result」（https://platform.claude.com/docs/en/build-with-claude/overview）。MCP の利点は複数アプリでの再利用（#15）なので、再利用の必要がなければ自作ツールで足りる、という使い分けは素材の整理 |
| 18 | エージェント間の連携では、任された側が自分のコンテキストで作業し、結果をまとめて返す。独立した調べものを並べて進めるのに向く | 正しい | 素材 #16: https://www.anthropic.com/engineering/multi-agent-research-system 「operating in parallel with their own context windows」／ https://code.claude.com/docs/en/features-overview（Subagent:「Isolated execution context that returns summarized results」） |
| 19 | Anthropic の報告では、トークンの消費はチャットの約15倍。文脈の共有や作業どうしの依存が多い仕事には、今のところ向かない | 正しい | 素材 #17: multi-agent-research-system「multi-agent systems use about 15× more tokens than chats」「domains that require all agents to share the same context or involve many dependencies between agents are not a good fit for multi-agent systems today」 |
| 20 | Claude は、直接の API のほか、Amazon Bedrock や Google Cloud のようなクラウド経由でも使える。レイテンシ、コンプライアンス、コストで比べる | 正しい | 素材 #18: 公式の対策講座（講座4）の学習目標「直接 API、Bedrock、Vertex、サードパーティ経由を、レイテンシ、コンプライアンス、コストで比べる」／ https://platform.claude.com/llms.txt に Amazon Bedrock、Claude Models on Google Cloud などの各ページ |
| 21 | 必要な機能がそのルートで使えるかを、先に確かめる | 正しい | 素材 #19: https://platform.claude.com/docs/en/build-with-claude/overview 「Each feature's page says where you can use it.」。例: ツール検索は Amazon Bedrock の Converse API では使えない（tool-search-tool のページ） |

## 段階的ディスカバリー

| # | 台本の主張 | 判定 | 根拠（素材 #） |
|---|---|---|---|
| 22 | 一括型は最初に全部載せる。単純だが、量が増えるとコンテキストを圧迫し、関係のない情報が判断を鈍らせる | 正しい | 素材 #22: effective-context-engineering「context rot」「LLMs have an "attention budget"」／ https://code.claude.com/docs/en/features-overview 「Too much can fill up your context window, but it can also add noise that makes Claude less effective」 |
| 23 | Skills は、最初は名前と説明だけを読み、作業に合えば `SKILL.md` の本文を、さらに必要なら付属のファイルを読む | 正しい | 素材 #20: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview 「progressive disclosure: Claude loads information in stages as needed」。Level 1 Metadata (always loaded)、Level 2 Instructions (loaded when triggered)、Level 3 Resources (loaded as needed) |
| 24 | `defer_loading` を付けたツールは、ツール検索で見つかって初めてコンテキストに載る | 正しい | 素材 #21: tool-search-tool「Tools with defer_loading: true load only when Claude discovers them through search.」 |
| 25 | 段階的ディスカバリーは、探すぶん遅くなる | 正しい | 素材 #23: effective-context-engineering「runtime exploration is slower than retrieving pre-computed data.」 |
| 26 | 説明があいまいだと見落とす | 正しい | 素材 #24: features-overview（Skills）「If descriptions are vague or overlap, Claude may load the wrong skill or miss one that would help.」 |
| 27 | ツールが10個に満たず、毎回すべてを使うなら、最初から全部渡すほうが合う | 正しい | 素材 #25: tool-search-tool「Standard tool calling, without tool search, is a better fit when you have fewer than 10 tools, every tool is used in every request, or your tool definitions are small」（ドキュメントは3つの条件を「or」で並べる。台本は素材どおり2つを挙げた） |
| 28 | Claude Code は、CLAUDE.md を最初に読み、ほかは必要なときに探す | 正しい | 素材 #26: effective-context-engineering「CLAUDE.md files are naively dropped into context up front」「primitives like glob and grep allow it to navigate its environment and retrieve files just-in-time」 |
| 29 | いつも要る小さな情報は先に、ときどき要る大きな情報は後から | 正しい（本教材の整理） | 素材の本文の結論。#22〜#28 をまとめた判断の軸で、公式の文言そのものではない |

## ミニクイズ

| # | 台本の主張 | 判定 | 根拠（素材 #） |
|---|---|---|---|
| 30 | 届いたトークンをそのまま電子カルテの API へ渡す MCP サーバーは仕様違反。自分あてのトークンだけを受け付け、先には別のトークンを使うのが正しい。ログを足しても、すき間は残る | 正しい | 素材 #27（#9 と同じ根拠）。クイズの状況と選択肢は素材の自作の問題で、公式サンプル問題の転載や言い換えではない |

## 試験ガイドと現行ドキュメントの食い違いの扱い

素材と同じ立場で扱った。

- **提供ルートの名前。** 試験ガイド v1.0 は提供ルートに触れず、公式の対策講座は「Bedrock、Vertex」と書く。2026年11月時点のドキュメントでは、Google Cloud 経由の提供は「Claude Models on Google Cloud」と呼ばれ、Vertex AI は旧称（現在は Google Cloud の Agent Platform）。台本は素材どおり「Amazon Bedrock や Google Cloud のようなクラウド経由」とだけ言い、Vertex AI の名前は出していない。
- **MCP の仕様の版。** 試験ガイドは MCP の版を指定していない。台本の認可の説明（認可は任意、HTTP は OAuth 2.1 ベースの仕様に沿う、STDIO は環境から資格情報を取る、トークンの受け渡しの禁止）は、仕様 2025-11-25 版に基づく。新しい版で表現が変わる可能性がある。

## 素材から変えた点

- **音声講座の文を、動画用に組み直した。** 1文を短く切り、画面の項目の出る順に合わせて並べた。内容は足していない。
- **「ツールが多すぎると精度も落ちる」を、肥大化の最初の場面に入れた。** 素材では誤答の説明の後にある。画面の項目（「要らない機能は、構成から外す」の4つ目）にまとめるため、順番を入れ替えた。
- **「役割が重なったりすると」は声では省いた。** 長さの都合。根拠（素材 #4）には重なりも書かれている。
- **「一度サーバーを作れば」を「一度作れば」に縮めた。** 意味は同じ。
- **ツール検索ツールの説明を短くした。** 素材の「ツール検索ツールを使い、定義に `defer_loading` を付けたツールは、検索されて初めてコンテキストに載る」を、「`defer_loading` を付けたツールは、ツール検索で見つかって初めて、コンテキストに載る」とした。
- **ミニクイズは素材の3択をそのまま使い、問題文を短くした。** 選択肢の記号は、画面の形に合わせて 1〜3番ではなく A〜C にした（正解は B）。
- **配点の数字に「現行の試験ガイド、バージョン1.0 では」と添えた。** 12月7日の試験内容の更新に備えるため。

## 確認できなかった点（素材のとおり）

- 試験ガイドの「エージェント間（agent-to-agent）」が、特定のプロトコル（A2A など）を指すのかは確認できない。台本は「別のエージェントに仕事を任せる形」という一般的な意味で言い、プロトコル名は出していない。
- 公式の対策講座（Partner Academy）の本文は、パートナー限定で直接は読めていない。SSO（#13）と提供ルート（#20）は、学習目標の要旨を根拠にしている。

## 参照した URL

- https://www.anthropic.com/engineering/writing-tools-for-agents
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://www.anthropic.com/engineering/multi-agent-research-system
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- https://platform.claude.com/docs/en/build-with-claude/overview
- https://platform.claude.com/docs/en/manage-claude/authentication
- https://platform.claude.com/llms.txt
- https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization
- https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices
- https://modelcontextprotocol.io/docs/getting-started/intro
- https://code.claude.com/docs/en/best-practices
- https://code.claude.com/docs/en/features-overview
- https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso

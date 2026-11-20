# 事実確認：ep05-prompts-and-context（プロンプトとコンテキストの設計）

確認日: 2026-11-14

## 根拠にした一次情報

公式ドキュメントは、2026-11-14 に Markdown 版（URL の末尾に `.md`）を取得し、該当する節を原文で照合した。

| 記号 | 資料 | 場所 |
|---|---|---|
| A | Prompting best practices（公式ドキュメント） | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices |
| B | Reduce hallucinations（公式ドキュメント） | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations |
| C | Context windows（公式ドキュメント） | https://platform.claude.com/docs/en/build-with-claude/context-windows |
| D | Define success criteria and build evaluations（公式ドキュメント） | https://platform.claude.com/docs/en/test-and-evaluate/develop-tests |
| E | Prompt caching（公式ドキュメント） | https://platform.claude.com/docs/en/build-with-claude/prompt-caching |
| F | Effective context engineering for AI agents（Anthropic の技術ブログ。C からリンクされている） | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| G | Claude Code 同梱の claude-api 資料（2.1.325 に同梱の版）。`shared/prompt-audit.md`、`shared/model-migration.md`、`shared/agent-design.md` | ローカルの資料 |

F は公式ドキュメントではなく Anthropic の技術ブログ。コンテキストロットの定義は公式ドキュメント（C）にもあるが、
「軽い識別子」「必要になってから読み込む」「サブエージェントが要約を返す」は F が出典。

公開前に、上の各ページが変わっていないかを見直すこと。

## 公式ドキュメントで確認できたもの

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 1 | 基本は、明確で直接的な指示。Claude を「優秀だが、こちらの事情を知らない新人」と考える | 正しい | A「Be clear and direct」: "Think of Claude as a brilliant but new employee who lacks context on your norms and workflows." |
| 2 | 出力の形式と、守ってほしい制約を具体的に書く | 正しい | A 同節: "Be specific about the output format and constraints you want." |
| 3 | なぜそうしてほしいのか、理由や背景を伝える | 正しい | A「Add context to improve performance」: "Providing context or motivation behind your instructions … can give Claude more information about your goals" |
| 4 | 順番が大事な作業は、番号付きの手順にする | 正しい | A「Be clear and direct」: "Provide instructions as sequential steps using numbered lists or bullet points when the order or completeness of steps matters." |
| 5 | 文脈を知らない同僚に見せて、迷わず作業できるかを確かめる（画面の補足。読み上げてはいない） | 正しい | A 同節「Key test」: "Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too." |
| 6 | 「省略記号は絶対に使うな」は効果が低い例、「音声で読み上げるので使わない」と理由を添えると効果が高い例 | 正しい | A「Add context to improve performance」の例。Less effective: "NEVER use ellipses"／More effective: "Your response will be read aloud by a text-to-speech engine, so never use ellipses since …" |
| 7 | 理由がわかれば、Claude はほかの場面にも応用できる | 正しい | A 同節: "Claude can generalize from the explanation." |
| 8 | 強い言葉での強調は、今のモデルには効きすぎる（過剰に反応する）ことがある | 正しい | A「Tool usage」: Claude Opus 4.5／4.6 は "more responsive to the system prompt than previous models … these models might now overtrigger. The fix is to soften any aggressive language."。A「Migration considerations」6 も同旨。G（prompt-audit 1a）: "current models are highly responsive to the system prompt, so the same text over-applies" |
| 9 | 役割はシステムプロンプトに書く。1文だけでも、振る舞いと口調が定まる。例「Python に詳しいコーディングアシスタント」 | 正しい | A「Give Claude a role」: "Setting a role in the system prompt focuses Claude's behavior and tone for your use case. Even a single sentence makes a difference"。例は "You are a helpful coding assistant specializing in Python." |
| 10 | 役割の1文だけで済ませず、読み手・用途・求める品質といった文脈も伝える | 正しい（G が根拠） | G（prompt-audit 1d と keep list 1・9）: 役割の1文は問題ないが、"an identity statement *substituting* for audience, product, and quality bar" が欠陥。"Context is never cruft." |
| 11 | 出力の書式は、否定形より肯定形で指示する。「マークダウンを使わないで」より「なめらかな文章の段落で書いて」 | 正しい | A「Control the format of responses」1: "Tell Claude what to do instead of what not to do"。Instead of: "Do not use markdown in your response"／Try: "Your response should be composed of smoothly flowing prose paragraphs." |
| 12 | 禁止を並べると、望む形が伝わりにくい（画面の文言） | 11 からの言い換え | G（prompt-audit 1c）: "Describing success beats enumerating failure"。公式ページの文言そのものではない |
| 13 | 例は、出力の形式や口調をそろえる確実な方法の一つ。few-shot とも呼ぶ | 正しい | A「Use examples effectively」: "Examples are one of the most reliable ways to steer Claude's output format, tone, and structure. … (known as few-shot or multishot prompting)" |
| 14 | 例の数の目安は3〜5個。実際の用途に近い例を選ぶ | 正しい | A 同節: "Include 3–5 examples for best results."、"Relevant: Mirror your actual use case closely." |
| 15 | 例が偏っていると、意図しない特徴まで真似される。多様な例を用意する | 正しい | A 同節: "Diverse: Cover edge cases and vary enough that Claude doesn't pick up unintended patterns." |
| 16 | 例は `<example>` タグで囲み、指示と区別する | 正しい | A 同節: "Wrap examples in `<example>` tags (multiple examples in `<examples>` tags) so Claude can distinguish them from instructions." |
| 17 | 指示・文脈・例・入力データが混ざるプロンプトでは XML タグが役立つ。種類ごとに別のタグで囲む | 正しい | A「Structure prompts with XML tags」: "XML tags help Claude parse complex prompts unambiguously, especially when your prompt mixes instructions, context, examples, and variable inputs. Wrapping each type of content in its own tag (for example, `<instructions>`, `<context>`, `<input>`) reduces misinterpretation." |
| 18 | タグの名前は、内容を表す名前にして一貫して使う | 正しい | A 同節: "Use consistent, descriptive tag names across your prompts." |
| 19 | 画面の例（`<instructions>` と `<email>`） | 例として妥当 | `<instructions>` は A の例に出るタグ名。`<email>` は自作の例（A は特定のタグ名を必須としていない。内容を表す名前を使う、という 18 に沿う） |
| 20 | 長い文書はプロンプトの先頭に置き、質問や指示は最後に書く。2万トークンを超えるような長い入力での置き方 | 正しい | A「Long context prompting」: "When working with large documents or data-rich inputs (20k+ tokens) …"、"Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples." |
| 21 | 質問を最後に置くと、テストでは応答の品質が最大で30%上がった | 正しい | A 同節: "Queries at the end can improve response quality by up to 30 percent in tests, especially with complex, multidocument inputs." 台本は「公式のガイドには…というテスト結果があります」と出典を言っている |
| 22 | 複数の文書は1つずつ `<document>` タグで囲み、出典などの情報を添える。画面の構造（`<documents>`／`<document index>`／`<source>`／`<document_content>`） | 正しい | A 同節: "wrap each document in `<document>` tags with `<document_content>` and `<source>` (and other metadata) subtags"。画面のコードは A の「Example multidocument structure」と同じ構造（ファイル名と質問文は自作） |
| 23 | ハルシネーション対策 1: 情報が足りなければ「わかりません」と答えてよい、と明示する | 正しい | B: "Allow Claude to say "I don't know": Explicitly give Claude permission to admit uncertainty." |
| 24 | 対策 2: 長い文書では、先に該当箇所をそのまま引用させてから回答させる | 正しい | B: "For tasks involving long documents (>20k tokens), ask Claude to extract word-for-word quotes first before performing its task."。A「Long context prompting」の "Ground responses in quotes" も同旨 |
| 25 | 対策 3: 主張ごとに、根拠になる引用と出典を示させる | 正しい | B: "Verify with citations: Make Claude's response auditable by having it cite quotes and sources for each of its claims." |
| 26 | これらで誤りは減るが、ゼロにはならない。重要な情報は検証する | 正しい | B: "although these techniques significantly reduce hallucinations, they don't eliminate them entirely. Always validate critical information" |
| 27 | プロンプトの改善は評価で進める。まず、具体的で測れる成功基準を決める | 正しい | D: "Building a successful LLM-based application starts with clearly defining your success criteria and then designing evaluations … This cycle is central to prompt engineering."、成功基準は "Specific"、"Measurable" |
| 28 | 評価には、実際の入力に近いケースと、エッジケースを入れる | 正しい | D「Eval design principles」: "Design evals that mirror your real-world task distribution. Don't forget to factor in edge cases!" |
| 29 | コンテキストは多ければ良いわけではない。トークンが増えるほど、正確さが落ちる。これをコンテキストロットと呼ぶ | 正しい | C: "more context isn't automatically better. As token count grows, accuracy and recall degrade, a phenomenon known as *context rot*." |
| 30 | 入れる情報を選ぶ。何を入れるかが、空きの量と同じくらい大事（画面の文言）。少ない量で、重要な情報だけに絞る | 正しい | C: "This makes curating what's in context just as important as how much space is available."。F: "finding the smallest possible set of high-signal tokens" |
| 31 | エージェントには、すべてを前もって読み込ませない。ファイルのパスのような軽い識別子を持たせ、必要になった時点でツールで読み込む（ジャストインタイム） | 正しい（F が根拠） | F: "Rather than pre-processing all relevant data up front, agents built with the "just in time" approach maintain lightweight identifiers (file paths, stored queries, web links, etc.) and use these references to dynamically load data into context at runtime using tools." |
| 32 | 大量に読む調査はサブエージェントに任せ、別のコンテキストで調べて、要約だけを返させる | 正しい（F が根拠） | F「Sub-agent architectures」: "specialized sub-agents can handle focused tasks with clean context windows … returns only a condensed, distilled summary of its work" |
| 33 | プロンプトキャッシュは、料金と速度のための機能 | 正しい | E の説明: "Cache prompt prefixes with `cache_control` to cut costs and latency"、本文 "significantly reduces processing time and costs" |
| 34 | キャッシュした部分も、コンテキストウィンドウにはそのまま数えられる | 正しい | C: "Cached prompt prefixes still occupy the context window: prompt caching changes what you pay for those tokens, not whether they count." |
| 35 | コンテキストが長くなったら、古い結果を消去したり、要約したりする | 正しい | C「Manage context with compaction」: コンパクションは "automatically summarizes earlier parts of the conversation"、コンテキスト編集は "Tool result clearing: Clear old tool results in agentic workflows" |
| 36 | クイズの正解（契約書を1通ずつタグで囲んで先頭に、質問は最後） | 正しい | 20 と 22 のとおり |

## 言い換え・推論を含むもの

| # | 台本の主張 | 扱い |
|---|---|---|
| 37 | プロンプトを変えるたびに測る。変更は1つずつ。結果が悪ければ戻す（「結果が悪ければ戻す」は画面の文言） | 根拠は G（prompt-audit Step 7）: "One change at a time where stakes are high, so regressions attribute to their cause."、"If a cut regresses, re-add simply."。公式ドキュメント D には「1つずつ」という文言はない。下の「設計上の助言」として扱う |

## 設計上の助言（公式ドキュメントの文言ではないもの）

- **評価の回し方（変更は1つずつ。結果が悪ければ戻す）。** 上の 37。Claude Code 同梱の資料には同じ趣旨の記述があるが、
  公式ドキュメントのページで確認した文言ではない。youtube.md の概要欄にも一言書いた。

## 元の教材から変えた点

- **「タスクの目的、出力の使われ方、読み手、形式と長さ、成功の条件」の5点の列挙は使っていない。**
  公式の概要ページによると、プロンプトの技法は現在 A の1ページにまとめられている
  （"All prompting techniques … are covered in Prompting best practices. That's the living reference"）。
  A には、この形の列挙は載っていない。A にある「形式と制約を具体的に」「理由や背景を伝える」「順番が大事なら番号付きで」に置き換えた。
- **「指示の中では、タグの名前で参照する」は入れていない。** A では確認できなかった。
  「種類ごとに別のタグで囲む」「内容を表す名前を一貫して使う」だけにした。
- **「具体的なタスクと入力は、ユーザーのメッセージに書く」は入れていない。** 現在のページ（A）は
  「役割をシステムプロンプトに書く」ことだけを述べている。かわりに、同梱の資料（G）にある
  「役割の1文だけで済ませず、文脈も伝える」を入れた。
- **「指示どうしの矛盾をなくす」は入れていない。** 一般論としてはもっともだが、取得した公式ページでは確認できなかった。
- **「良くなれば採用、悪くなれば戻す」は、画面の「結果が悪ければ戻す」に短くした。** 上の 37 のとおり、設計上の助言として扱う。
- **プロンプトキャッシュの説明を、公式の文言に合わせた。** 教材の「キャッシュしても、モデルが読むトークンの量は同じ」を、
  公式ドキュメントの言い方「キャッシュした部分も、コンテキストウィンドウに数えられる」に直した。
- **「頻出です」「出題されます」「ひっかけに注意」は使っていない。** 出題傾向は公式の根拠がない。
- **足したもの。** 教材にはなかったが、現在の公式ガイドで強調されている次の点を足した。
  - 強い強調は今のモデルに効きすぎることがある（8）
  - ハルシネーション対策は、誤りをゼロにはしない（26）
- **「コンテキストウィンドウの上限内であっても」は言っていない。** 公式ドキュメント（C）は、劣化をトークン数の増加に伴うものとして説明しているが、
  「上限内でも」という文言そのものはない。「多ければ良いわけではない」「トークンが増えるほど落ちる」という公式の言い方にとどめた。
- **クイズ。** 教材のクイズ（契約書3通と質問の順番）を元に、選択肢を4つ作り直した。自作の問題集の D6-04 を参考にした。

## 言い切っていないこと・注意

- **先に引用させる方法（24）について。** 公式ページ（A・B）は現在もこの方法を挙げている。一方、同梱の資料（G、prompt-audit）は
  「引用を先に書かせる型」を、古い世代向けに書かれたプロンプトを見分ける手がかりの一つに挙げている（それだけでは削除の根拠にしない、という扱い）。
  台本は「長い文書では」と公式ページの条件を付けて紹介している。
- **古くなった手法は勧めていない。** 元の教材の第5章には、プリフィルや「順を追って考えて」を勧める記述はなく、この台本にも入れていない。
  公式ガイド（A）によると、プリフィルは Claude 4.6 以降のモデルでエラーになり、思考の深さは `effort` パラメータで調整する。
  この2点を説明する場面（古い書き方の見直し）も下書きしたが、長さを6分前後に収めるために外した。
  プリフィルは第2回で扱っており、思考の設定はモデル選択の章の内容と重なる。次の版で足す候補。
- **30% の数字（21）。** 公式ガイドの「テストでは最大30%」という記述で、条件は「特に、複数の文書を含む複雑な入力」。どの入力でも30%上がる、とは言っていない。
- **コンテキストの整理の機能名（コンパクション、コンテキスト編集）は読み上げていない。** 元の教材では第4章（エージェント）で扱っている内容なので、
  この回では「古い結果を消去したり、要約したり」とだけ言っている。

## 未確認のまま残っている主張

なし（37 は設計上の助言として、仕様や公式の助言とは分けて扱っている）。

# 事実確認：ep01-solution-design（ソリューション設計）

確認日: 2026-11-16

台本の主張は、すべて素材 `CCAR-P/course/ch01.md` の「## 事実確認」の表（2026-11-16 に公式の試験ガイドと公式ドキュメントで照合済み）から引いた。表の番号（素材の #）を「素材」の列に残す。素材にない主張は台本に足していないので、この回で新たに一次情報を取得した行はない。

根拠は次のとおり。

- **試験ガイド**: Claude Certified Architect – Professional 試験ガイド v1.0（日本語版・英語版）§6「分野1：ソリューション設計とアーキテクチャ（17%）」
- **公式記事**: Anthropic Engineering「Building effective agents」「How we built our multi-agent research system」
- **公式ドキュメント**: platform.claude.com/docs の「Ticket routing」「Define success criteria and build evaluations（develop-tests）」
- **公式の対策講座**（Partner Academy の Prep Course 講座1）の学習目標。素材の調査資料（blueprint.md）の要旨に基づく（下の「確認の範囲」を参照）

## 試験ガイドの範囲と配点

| # | 台本の主張 | 判定 | 根拠 | 素材 |
|---|---|---|---|---|
| 1 | 分野1は「ソリューション設計とアーキテクチャ」。現行の試験ガイド v1.0 では配点17% | 正しい | 試験ガイド v1.0 日本語版・英語版 §6「分野1：ソリューション設計とアーキテクチャ（17%）」の6項目 | 1 |
| 2 | 全体の流れは、入力、処理、出力、フィードバックループの4つ（試験ガイドが挙げる） | 正しい | 試験ガイド タスク「エンドツーエンドのアーキテクチャ（入力 → 処理 → 出力 → フィードバックループ）を設計する」 | 6 |
| 3 | 構成のパターンは、拡張LLM、ワークフロー、エージェント型の3つ | 正しい | 試験ガイド日本語版「適切なアーキテクチャパターン（ワークフロー、エージェント型、拡張LLM）を選択する」 | 8 |
| 4 | 価値の柱は、効率性、変革、生産性、コスト、パフォーマンスSLA の5つ（試験ガイドが挙げる） | 正しい | 試験ガイド日本語版 タスク「ビジネス価値の柱（効率性、変革、生産性、コスト、パフォーマンスSLA）に整合させる」 | 21 |

## 役割分けと全体の流れ

| # | 台本の主張 | 判定 | 根拠 | 素材 |
|---|---|---|---|---|
| 5 | 課題を、Claude がやること、既存システムがやること、人がやることに分ける | 正しい（公式・講座） | 試験ガイド タスク「ビジネス課題をClaudeベースのAIソリューションに落とし込む」。公式 Prep Course 講座1の学習目標（blueprint.md 4章 Domain 1 (a) の要旨） | 2 |
| 6 | Claude に向くのは、意味の理解が要る判断。形の決まっていない文章の分類や、基準がよく変わる分類 | 正しい | https://platform.claude.com/docs/en/about-claude/use-case-guides/ticket-routing 「Define whether to use Claude」: Your classification categories are likely to change or evolve over time、You need to handle complex, unstructured text inputs、Your classification rules are based on semantic understanding | 3 |
| 7 | 記録の正本や刻々と変わる値（在庫、残高）は既存のシステムが持ち、検索のインデックスに写さず、元のシステムにツールで問い合わせる | 正しい（公式・講座） | Prep Course 講座1の学習目標「本来はライブの状態（live-state）が担うべき役割を、検索に担わせていないかを見抜く」（blueprint.md 4章 Domain 1 (a)）。在庫と残高は素材の本文の例 | 4 |
| 8 | 分ける前に、今の業務を人がどう回しているか、例外の扱い、既存のルールが失敗する場面を調べる。知るほど、任せる範囲を正しく決められる | 正しい | ticket-routing「Understand your current support approach」: Are there any automated rules or workflows already in place? In what cases do they fail? How are edge cases or ambiguous tickets handled? The more you know about how humans handle certain cases, the better you can work with Claude | 5 |
| 9 | フィードバックループは、本番の結果を改善に戻す仕組み。人が直した箇所や失敗した事例を集め、評価とプロンプトの見直しに使う | 正しい（一般化） | https://platform.claude.com/docs/en/test-and-evaluate/develop-tests 「starts with clearly defining your success criteria and then designing evaluations ... This cycle is central to prompt engineering」。ticket-routing は人の評価者による採点を例示。素材は設計の一般論として述べている | 7 |

## 構成のパターン（Building effective agents）

出典: https://www.anthropic.com/engineering/building-effective-agents

| # | 台本の主張 | 判定 | 根拠 | 素材 |
|---|---|---|---|---|
| 10 | 拡張LLMは、検索、ツール、メモリで補強した、1回のモデル呼び出し | 正しい | 「an LLM enhanced with augmentations such as retrieval, tools, and memory」 | 9 |
| 11 | ワークフローはコードで決めた経路でモデルとツールを動かす。エージェント型はモデルが自分で手順とツールの使い方を決める | 正しい | 「Workflows are systems where LLMs and tools are orchestrated through predefined code paths」「LLMs dynamically direct their own processes and tool usage」 | 10 |
| 12 | できるだけ単純な解決策から始め、複雑さは必要なときだけ足す。多くの用途では拡張LLM（1回の呼び出し）で足りる | 正しい | 「finding the simplest solution possible, and only increasing complexity when needed」「For many applications, however, optimizing single LLM calls with retrieval and in-context examples is usually enough」 | 11 |
| 13 | 手順が決まっているならワークフロー（予測しやすく一貫性がある）。エージェント型は手順の数を前もって読めないオープンエンドな問題に | 正しい | 「workflows offer predictability and consistency for well-defined tasks」「Agents can be used for open-ended problems where it's difficult or impossible to predict the required number of steps」 | 12 |
| 14 | エージェント型はレイテンシとコストを払う。誤りが積み重なるおそれもある | 正しい | 「Agentic systems often trade latency and cost for better task performance」「higher costs, and the potential for compounding errors」 | 13 |
| 15 | 「エージェントのほうが常に高度で正しい」という選択肢は疑う | 正しい（公式・講座） | Prep Course の学習目標「augmented call、workflow、agent のどれにするかを、それぞれのコストを言葉にして選ぶ」（blueprint.md）と、同記事の「simplest solution」 | 14 |

## 分解の手法

出典: 同上（Building effective agents）

| # | 台本の主張 | 判定 | 根拠 | 素材 |
|---|---|---|---|---|
| 16 | プロンプトチェーンは前の段の出力を次の段の入力に。段の間にコードのチェックを置ける。レイテンシと引き換えに精度が上がる | 正しい | 「each LLM call processes the output of the previous one」「You can add programmatic checks (see "gate”...) on any intermediate steps」「trade off latency for higher accuracy, by making each LLM call an easier task」 | 15 |
| 17 | ルーティングははっきり違う種類の入力、並列化は独立した部分、オーケストレーター・ワーカーは前もって決められないサブタスク（中心のモデルがその場で分けて任せる） | 正しい | Routing「distinct categories that are better handled separately」、Sectioning「independent subtasks run in parallel」、Orchestrator-workers「complex tasks where you can't predict the subtasks needed」 | 16 |

## マルチエージェント

出典: https://www.anthropic.com/engineering/multi-agent-research-system

| # | 台本の主張 | 判定 | 根拠 | 素材 |
|---|---|---|---|---|
| 18 | 調査システムでは、リードのエージェントが計画を立て、サブエージェントを並列に動かす | 正しい | 「an orchestrator-worker pattern, where a lead agent coordinates the process」「operating in parallel with their own context windows」（サブエージェントがそれぞれ自分のコンテキストウィンドウを持つ点は、長さの都合で台本から外した） | 17 |
| 19 | 公式の記事によると、トークンの消費は、ふつうのチャットの約15倍 | 正しい | 「multi-agent systems use about 15× more tokens than chats」（Anthropic の自社データ。台本・画面とも「公式の記事」と添えた） | 18 |
| 20 | 向くのは、価値が高く、並列にしやすく、1つのコンテキストに収まらない情報を扱う仕事。全員が同じコンテキストを共有する仕事や、依存が多い仕事には向かない | 正しい | 「multi-agent systems excel at valuable tasks that involve heavy parallelization, information that exceeds single context windows, and interfacing with numerous complex tools」「domains that require all agents to share the same context or involve many dependencies between agents are not a good fit for multi-agent systems today」「require tasks where the value of the task is high enough」 | 19 |
| 21 | サブエージェントには、目的、出力の形式、使うツールと情報源、仕事の境界を渡す。あいまいだと重複や抜けが出る | 正しい | 「Each subagent needs an objective, an output format, guidance on the tools and sources to use, and clear task boundaries」「Without detailed task descriptions, agents duplicate work, leave gaps, or fail to find necessary information」 | 20 |

## ビジネス価値

| # | 台本の主張 | 判定 | 根拠 | 素材 |
|---|---|---|---|---|
| 22 | よい成功基準は、具体的で、測れて、達成でき、目的に合ったもの。レイテンシとコストの上限も基準に入れる | 正しい | develop-tests「Specific」「Measurable」「Achievable」「Relevant」、共通の基準として「Latency」「Price」 | 22 |
| 23 | 問い合わせの振り分けは、1件あたりのコストや、上位の窓口に回した割合で測れる | 正しい | ticket-routing「Establish success criteria」: Cost per ticket、Escalation rate | 23 |
| 24 | 精度を上げる構成は、遅く、高くなりがち | 正しい（一般化） | building-effective-agents のプロンプトチェーン「trade off latency for higher accuracy」、エージェント型「trade latency and cost for better task performance」。素材と同じく「なりがち」と弱めた | 24 |
| 25 | ミニクイズ: 決まった分類の大量処理は、1件ずつ1回の呼び出しとコードの集計で足り、マルチエージェントは見合わない | 正しい | 主張12、13、19、20 の組み合わせ。問題は素材の自作の問題（公式サンプル問題や第三者の問題の流用ではない） | 25 |

## 台本での整理（一次情報の文言そのままではないもの）

- 「役割分け」の画面の3項目（Claude に任せる／システムに残す／先に調べる）は、素材の要点4つを1枚にまとめたもの。
- 「全体の流れ」の4つの箱の説明（どのシステムから、どんな形のデータが届くか、など）は、素材の本文の言い換え。試験ガイドが挙げているのは4つの名前だけ。
- 「いちばん単純な構成から始める」の左右の対比（ワークフロー／エージェント型）は、主張12〜14を1枚にまとめた図解。記事に同じ図はない。
- 「任せ方」の4項目の画面の説明（何のために調べるか、など）は、記事の4つの要素を言い換えた補足。
- 「価値の柱を、測れる基準にする」の3つの箱（柱を決める → 基準にする → 構成を選ぶ）は、素材の本文の順序を図にしたもの。柱ごとの定義には踏み込んでいない（試験ガイドに定義がないため。素材と同じ扱い）。

## 素材（音声講座の第1章）から変えた点

- 「Building effective agents」の題名は、声では読まず、画面の補足（lead）に出した。声では「Anthropic の公式の記事」と言った（長い英語の名前は音声エンジンが語の途中で区切るため）。
- 配点の「17%」は、「現行の試験ガイド、バージョン1.0 では」と添えた。2026年12月7日に試験内容の更新が予定されているため（更新版の試験ガイドは 2026年11月17日に公開予定。outline.md）。サムネイルと場面の見出しには、配点の数字を入れていない。
- 「この章で学ぶこと」の範囲の列挙（落とし込みから、ビジネス価値との結びつけまで）は、冒頭では省き、「目標は、どの構成を選ぶかと、その理由を説明できるようになること」だけを残した。
- ミニクイズの選択肢は、素材の3つのまま、表記を短くした。動画の選択肢の記号は A・B・C（素材の「1番、2番、3番」）。正解は素材と同じ（素材の2番＝動画の B）。

## 試験ガイドと現行ドキュメントの食い違い

- なし（素材と同じ）。試験ガイドの「拡張LLM（augmented LLM）」は、Building effective agents の「augmented LLM」と同じ意味。公式の対策講座は同じものを「augmented call」と呼ぶが、台本は日本語版ガイドの訳語「拡張LLM」に統一した。

## 確認の範囲

- この回で新たに一次情報を取得してはいない。上の表は、素材の事実確認（2026-11-16 照合済み）の該当行を写したもの。台本には、素材の表にない主張を足していない。
- 公式の対策講座（Partner Academy の Prep Course）の学習目標は、素材と同じく blueprint.md の要旨に基づく（パートナー限定のため、講座の原文は直接読んでいない）。主張5、7、15 がこれに当たるが、いずれも試験ガイドのタスクの文面と、公開の公式記事・ドキュメントの範囲で言える内容に限っている。
- ビジネス価値の柱の5つそれぞれの定義は、試験ガイドにも公式の一次情報にもない。台本では柱の名前だけを挙げている。

## 参照した URL

- https://www.anthropic.com/engineering/building-effective-agents
- https://www.anthropic.com/engineering/multi-agent-research-system
- https://platform.claude.com/docs/en/about-claude/use-case-guides/ticket-routing
- https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

# 事実確認：ep02-models-and-prompts（モデルとプロンプトの設計）

確認日: 2026-11-16

根拠は、講座の本文 `CCAR-P/course/ch02.md` の「事実確認」の表（2026-11-16 に、公式の試験ガイド v1.0 と公式ドキュメントで照合済み）。
台本の主張ごとに、その表から該当する行を引いた（「素材 #」は ch02.md の表の番号）。台本には、素材にない事実は足していない。そのため、この回で新たに一次情報を取得して足した行はない。

- **試験ガイド**: Claude Certified Architect – Professional 試験ガイド v1.0（日本語版・英語版。`CCAR-P/reference/` にある）
- **公式ドキュメント**: platform.claude.com/docs の各ページと、Anthropic Engineering の記事。URL は表と末尾の一覧

この試験は 2026-12-07 に内容が更新される予定で、更新版の試験ガイドは 2026-11-17 に公開予定。この回は v1.0 に基づく。配点の数字は、台本で「現行の試験ガイド、バージョン1.0 では」と添えて言い、サムネイルと場面の見出しには入れていない。

## 台本の主張と根拠

| # | 台本の主張（場面） | 判定 | 根拠（素材 #） | 確認日 |
|---|---|---|---|---|
| 1 | 分野2の配点は、現行の試験ガイド v1.0 で13%。タスクは5つ（open） | 正しい | 素材 #1。試験ガイド v1.0 日本語版 §6「分野2：Claudeモデル、プロンプト作成、コンテキストエンジニアリング（13%）」の5項目 | 2026-11-16 |
| 2 | モデル選択の軸は、品質、速度、コスト（choose） | 正しい | 素材 #2。https://platform.claude.com/docs/en/about-claude/models/choosing-a-model 「Choosing a Claude model means balancing capabilities, speed, and cost」 | 2026-11-16 |
| 3 | 2026年11月時点で、最も速く、最も安いのは Haiku の系統（choose） | 正しい（時点つき） | 素材 #3。同ページの選択表「The lowest latency and price: Claude Haiku 5.5」 | 2026-11-16 |
| 4 | 始め方は2つ。速くて安いモデルから始めて足りないときだけ上げる／高性能なモデルから始めて後で効率のよいモデルに移す（choose） | 正しい | 素材 #4。同ページ「Option 1: Start efficiency-first … Upgrade only if necessary」「Option 2: Start capability-first … optimize to more efficient models later」 | 2026-11-16 |
| 5 | 決め手は、実際のプロンプトとデータでの評価（choose、gate） | 正しい | 素材 #5。同ページ「Create benchmark tests … the most important step」「Test with your actual prompts and data」 | 2026-11-16 |
| 6 | 公式のサンプル問題でも、評価なしのモデル変更は誤りの選択肢。適合を見ずに最小のモデルへ替えると品質を損なう。大きなモデルに替えても、原因が権限や検索にあれば効かない（gate） | 正しい | 素材 #6。試験ガイド サンプル2の解説「やみくもな小型化（B）は品質を損なうリスク」、サンプル1の解説「モデルのサイズ（D）は認可の範囲とは無関係」、サンプル3（原因は検索・インデックス） | 2026-11-16 |
| 7 | 現行のドキュメントは、同じモデルのまま考える深さを変える `effort` の調整も勧めている（gate） | 正しい（時点つき） | 素材 #7。choosing-a-model「Tuning effort is often a better lever than switching models」 | 2026-11-16 |
| 8 | 役割を与えると、1文でも、振る舞いと口調が用途に合ってくる（template） | 正しい | 素材 #8。https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices 「Give Claude a role … Even a single sentence makes a difference」 | 2026-11-16 |
| 9 | 指示には理由を添える。Claude は理由から一般化できる（template） | 正しい | 素材 #9。同ページ「Add context to improve performance … Claude can generalize from the explanation」 | 2026-11-16 |
| 10 | テンプレートは固定の指示と可変の入力を分けたひな形。入れ替わる部分は XML のタグで囲み、指示と区別する（template） | 正しい | 素材 #10。同ページ「Structure prompts with XML tags … mixes instructions, context, examples, and variable inputs」。ガードレールの各ページの例も差し込み変数をタグで囲む形 | 2026-11-16 |
| 11 | 「分からない」と答えてよいと明示すると、誤った情報が大きく減る（guard） | 正しい | 素材 #11。https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations 「Allow Claude to say "I don't know" … can drastically reduce false information」 | 2026-11-16 |
| 12 | 外部の文書やツールの結果は、信頼できないデータとして扱うよう指示する（guard） | 正しい | 素材 #12。https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks 「Tell Claude explicitly that content returned from tools, documents, or searches is untrusted data」 | 2026-11-16 |
| 13 | プロンプトだけでは完全には防げない。権限を絞る統制と組み合わせる（guard） | 正しい | 素材 #13。reduce-hallucinations「they don't eliminate them entirely」／mitigate-jailbreaks「Apply the principle of least privilege …」「Chain safeguards」 | 2026-11-16 |
| 14 | ゼロショットは指示だけで頼む方法。まずこれで試し、評価で足りない点が見えたら手を足す（shots） | 正しい（進め方の原則） | 素材 #15。https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview 「A clear definition of the success criteria … Some ways to empirically test … A first draft prompt you want to improve」 | 2026-11-16 |
| 15 | few-shot は入力と出力の例を見せる方法で、形式や口調をそろえる確実な手の1つ。例は3〜5個が目安。用途に近く、互いに違うものを選ぶ。似た例ばかりだと意図しない癖まで真似される（shots） | 正しい | 素材 #14。best practices「Examples are one of the most reliable ways to steer Claude's output format, tone, and structure」「Relevant / Diverse … doesn't pick up unintended patterns」「Include 3–5 examples」 | 2026-11-16 |
| 16 | 思考の連鎖は、答える前に段階を追って考えさせる方法。複雑な推論で役立つが、トークンと待ち時間が増える（thinking） | 正しい | 素材 #16。best practices「complex multistep reasoning」「Thinking adds latency」／https://platform.claude.com/docs/en/build-with-claude/context-windows 「Thinking tokens … are billed as output tokens」 | 2026-11-16 |
| 17 | 2026年11月時点の新しいモデルでは、思考の機能に任せ、考える量を Claude が決めるのが基本。推論を書き出させるプロンプトは、思考の機能を使えないときの代わり（thinking） | 正しい（時点つき） | 素材 #17。best practices「adaptive thinking … Claude dynamically determines when and how much to think」「Manual chain-of-thought (CoT) prompting as a fallback. When thinking is off …」 | 2026-11-16 |
| 18 | コンテキストウィンドウは、応答を作るときに参照できる作業用の記憶。システムプロンプト、履歴、ツールの結果、出力もすべて数えられる（window） | 正しい | 素材 #18。context-windows「all the text a language model can reference when generating a response, including the response itself … a "working memory"」「Everything in the request counts … The output … counts too」 | 2026-11-16 |
| 19 | トークンが増えるほど、正確に思い出す力が落ちる。これを context rot と呼ぶ（window） | 正しい | 素材 #19。context-windows「As token count grows, accuracy and recall degrade, a phenomenon known as context rot」 | 2026-11-16 |
| 20 | 必要で信号の濃いトークンを、できるだけ少なく渡す（window） | 正しい | 素材 #20。https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents 「the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome」 | 2026-11-16 |
| 21 | 長い文書は上に、質問は最後に置く（tidy） | 正しい | 素材 #21。best practices「Put long-form data at the top … above your query」「Queries at the end can improve response quality」 | 2026-11-16 |
| 22 | 長い会話では、古いツールの結果を消したり、やり取りを要約したりする。送る前にトークン数を見積もる（tidy） | 正しい | 素材 #22。context-windows「Tool result clearing」「server-side compaction … summarizes earlier parts」「use the token counting API to estimate token usage before sending」 | 2026-11-16 |
| 23 | 必要な方針文書を切り詰めるのは誤答。答えに要る情報まで消える（tidy） | 正しい | 素材 #23。試験ガイド サンプル2の解説「切り詰め（A）では必要なポリシーが失われます」 | 2026-11-16 |
| 24 | キャッシュはプロンプトの先頭から一致する部分に効く。変わらないシステムプロンプトや参照文書を前に、変わる入力を後ろに置く（cache） | 正しい | 素材 #24。https://platform.claude.com/docs/en/build-with-claude/prompt-caching 「resume from specific prefixes」「Place static content (tool definitions, system instructions, context, examples) at the beginning of your prompt」 | 2026-11-16 |
| 25 | 最初のトークンまでの時間と、1回あたりのコストが両方下がる。情報を捨てない点が切り詰めとの違い（cache） | 正しい | 素材 #25。試験ガイド サンプル2の解説「最初のトークンまでの時間とリクエストあたりのコストの両方を削減」「必要なコンテキストを捨てることなく」／prompt-caching「reducing processing time and costs」 | 2026-11-16 |
| 26 | 先頭に現在時刻などを入れると、毎回キャッシュが外れる（cache） | 正しい | 素材 #26。prompt-caching「Cache hits require 100 percent identical prompt segments」 | 2026-11-16 |
| 27 | モジュール型のプロンプトは、役割、方針、出力の形式といった部品に分けて使い回す。並び順を固定するとキャッシュとの相性がよい（modules） | 一部推論 | 素材 #27。用語は試験ガイド タスク 2.5。部品をタグで区切る考え方は best practices「Wrapping each type of content in its own tag」「Use consistent, descriptive tag names across your prompts」。キャッシュとの相性は先頭一致の仕様（#24）からの帰結 | 2026-11-16 |
| 28 | Skills は指示や手順、スクリプトをまとめた部品。ふだんは名前と説明だけが載り、課題に合ったときだけ中身が読み込まれる（modules） | 正しい | 素材 #28。https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview 「Skills are reusable, filesystem-based resources」「Level 1: Metadata (always loaded) … only its name and description occupy context」「Level 2: Instructions (loaded when triggered)」 | 2026-11-16 |
| 29 | Skills は、信頼できる出どころのものだけを使う（modules） | 正しい | 素材 #29。同ページ「Use Skills only from trusted sources: those you created yourself or obtained from Anthropic」 | 2026-11-16 |
| 30 | ミニクイズ: モデルを替える前に、実際のデータで評価し、基準を満たすと確かめてから替える。すぐ替えると品質の低下に気づくのが遅れ、本文の切り詰めは分類に必要な情報を捨てる（quiz） | 正しい | 素材 #30（#4、#5、#23 と同じ根拠）。素材のミニクイズを短くしたもの。自作の問題で、公式サンプル問題の転載・言い換えではない | 2026-11-16 |

## 画面だけに出るもの

- **プロンプトの例（template の場面）**: 「保険会社の問い合わせ窓口の担当」という役割、理由つきの指示、`<email>{{EMAIL}}</email>` で囲んだ差し込み欄は、説明のための自作の例。構成は #8〜#10 の書き方（役割、理由、可変の入力をタグで囲む）に沿う。特定のドキュメントの例の転載ではない。
- **キャッシュの並び（cache の場面）**: 「システムプロンプト → 参照文書 → 変わる入力」の3段は、#24 の「静的な内容を先頭に」を図にしたもの。
- **まとめの4項目**: 本題の場面の見出しと同じ内容で、新しい事実はない。

## 試験ガイドと現行ドキュメントの食い違い（素材と同じ扱い）

- **思考の連鎖**: 試験ガイド（タスク 2.3）は、ゼロショット、few-shot と並ぶ手法として挙げる。現行のドキュメントでは、新しいモデルは adaptive thinking が基本で、手作業の CoT は thinking が使えないときの代わり。台本はガイドの立場で手法として説明し（thinking の場面の左列）、現行の扱いを「2026年11月時点の新しいモデルでは」と時点つきで添えた（右列を「思考の機能（現行）」とした）。
- **モデル選択の手段**: 試験ガイドはモデルの選択だけを挙げる。`effort` はガイドに名前がないので、「現行のドキュメントは…も勧めています」と一言添えるにとどめた。
- **テンプレート**: 現行のドキュメントにプロンプトテンプレートの専用ページがないため、素材と同じく「固定の指示と可変の入力を分け、可変の部分をタグで囲む」という説明にした。

## 素材（ch02.md）から変えた点

- **「試験でよく狙われるのは、評価なしのモデル変更です」を、「公式のサンプル問題でも、評価なしのモデル変更は、誤りの選択肢です」に変えた。** 出題傾向の言い方を避け、素材 #6 の根拠（サンプル1・2の解説）に合わせた。
- **「最も確実な手の1つ」を「確実な手の1つ」にした。** 長さの都合。公式の「one of the most reliable ways」より弱い言い方で、誤りではない。
- **章の参照を、動画のシリーズに合わせて「第6章」から「第6回」に変えた**（同じ内容の回。outline.md の章立てで1対1に対応）。「第3章の段階的ディスカバリーにつながります」は、長さの都合で省いた。
- **ミニクイズの選択肢は、1〜3番を A〜C にした**（画面のマークシートの記号に合わせた）。正解は B（素材の2番）。問題文の「大量に」は長さの都合で省いた。
- **冒頭の「この章で学ぶこと」の要点（配点、タスク数、扱う範囲）は、冒頭の場面のナレーションだけで言った。** 画面には配点の数字を出していない。
- 長さを6分台に収めるため、各節の文を短く切り、重複する言い回しを削った。事実の追加はない。

## 未確認のまま残っている主張

なし。#27（モジュール型プロンプトの説明）は素材の時点で「一部推論」で、台本でも言い切りの強さを素材より上げていない。

## 参照した URL

- https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
- https://platform.claude.com/docs/en/build-with-claude/context-windows
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- 試験ガイド v1.0（日本語版・英語版。`CCAR-P/reference/`）

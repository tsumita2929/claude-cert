# 事実確認：ep04-rag-and-observability（RAG と運用の見える化）

確認日: 2026-11-16

根拠は、講座の本文 `CCAR-P/course/ch04.md` の「事実確認」の表（2026-11-16 に公式の試験ガイドと公式ドキュメントで照合済み）。
下の表の「素材 #」は、その表の番号。台本に入れた主張だけを引いた。素材の表にない主張は「追加」として、自分で一次情報を確かめた。

- この動画は、公式の試験ガイド バージョン1.0（2026年7月発効）に基づく。**2026年12月7日に試験内容が更新される予定**（更新版の試験ガイドは 2026年11月17日に公開予定）。台本では、配点を言う箇所に「現行の試験ガイド、バージョン1.0 では」と添えた。見出しとサムネイルには、配点の数字や問題数を入れていない。
- 公開前に、末尾の URL を開いて、動画の内容と食い違いがないかを見直すこと。特に、12月7日以降は新しい試験ガイドとの差分を確かめる。

## 台本の主張

| # | 台本の主張（場面） | 判定 | 根拠（素材 # と URL、該当箇所の要旨） |
|---|---|---|---|
| 1 | 現行の試験ガイド v1.0 では、分野3 統合の配点は19%で、7つの分野の中で最大。この回の範囲は4つのタスク（精度とレイテンシ、チャンキングとインデックス、検索戦略、大規模なオブザーバビリティ）（scope） | 正しい | 素材 #1。試験ガイド日本語版 §6「分野3：統合（19%）」、各タスクの文面。`reference/outline.md` の配点表 |
| 2 | まず制約なしで、うまく動くプロンプトを作る。レイテンシを削るのはそのあと。先に削ると最高の性能が分からなくなる（latency） | 正しい | 素材 #2。https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency 「It's always better to first engineer a prompt that works well without model or prompt constraints, and then try latency reduction strategies afterward. Trying to reduce latency prematurely might prevent you from discovering what top performance looks like.」 |
| 3 | 手段: 速いモデルを選ぶ、プロンプトと出力を短くする。ストリーミングは利用者が感じる待ち時間を縮める（latency） | 正しい | 素材 #3。同ページ「1. Choose the right model」「2. Optimize prompt and output length」「3. Stream responses … improve the perceived responsiveness」 |
| 4 | effort を下げると速く安くなる。品質と引き換え（latency の画面） | 正しい | 素材 #4。https://platform.claude.com/docs/en/build-with-claude/effort 「optimizing for speed and cost while accepting some reduction in capability」「low effort can significantly reduce response times and costs」 |
| 5 | プロンプトキャッシングは、くり返す部分を再利用する（latency の画面） | 正しい | 素材 #5。https://platform.claude.com/docs/en/build-with-claude/prompt-caching 「significantly reduces processing time and costs for repetitive tasks」／試験ガイド サンプル2の解説 |
| 6 | 「速くしたいから最小のモデルに」は根拠にならない。必要な文書を切り捨てる高速化は誤答の定番（basis） | 正しい | 素材 #6。試験ガイド サンプル2の解説（切り詰めは必要なポリシーが失われる、やみくもな小型化は品質を損なう）／blueprint.md 7-1 |
| 7 | 実際のデータで精度とレイテンシを測り、要件を満たす中で最も軽い構成を選ぶ（basis） | 正しい | 素材 #7。https://www.anthropic.com/research/building-effective-agents 「finding the simplest solution possible, and only increasing complexity when needed」／effort のページ「Step down … where your evals show quality holds」 |
| 8 | チャンクに切ると文脈が落ちる（売上が前の四半期から3%伸びた、の例）。Anthropic の Contextual Retrieval では、文書全体から見た説明を Claude に書かせ、各チャンクの先頭に付けてからインデックスを作る（chunk） | 正しい | 素材 #8。https://www.anthropic.com/engineering/contextual-retrieval 「traditional RAG solutions remove context when encoding information」「prepending chunk-specific explanatory context to each chunk before embedding」（BM25 のインデックスも文脈付きのチャンクから作る）。例文「The company's revenue grew by 3% over the previous quarter」 |
| 9 | チャンクの大きさ、区切り、重なりは精度に影響し、正解はなく、自分の文書と質問で試して決める（kb） | 正しい | 素材 #9。同記事 Implementation considerations「The choice of chunk size, chunk boundary, and chunk overlap can affect retrieval performance」 |
| 10 | 知識ベースが小さいなら、全部をプロンプトに載せてキャッシュを使うほうが簡単。同じ記事の目安は20万トークン未満（kb） | 正しい | 素材 #10。同記事: 知識ベースが 200,000 トークン未満なら「you can just include the entire knowledge base in the prompt that you give the model」。数値は記事の時点の目安なので、台本では「同じ記事の目安は」と出どころを添えた |
| 11 | 埋め込みは意味の近さ、BM25 のようなキーワードのインデックスは言葉の一致で探す。埋め込みは言い換えに強い反面、型番やエラーコードのような一致を取りこぼすことがある。キーワードはその逆（index） | 正しい | 素材 #11。同記事 BM25 の説明「particularly effective for queries that include unique identifiers or technical terms」、例「Error code TS-999」 |
| 12 | Anthropic は埋め込みモデルを提供していない。提供元を選んで比べる（index） | 正しい | 素材 #12。https://platform.claude.com/docs/en/build-with-claude/embeddings 「Anthropic does not offer its own embedding model.」「you should assess a variety of embeddings vendors」 |
| 13 | 公式のサンプル問題: 文書の更新後に RAG が自信を持って誤答し始め、モデルもレイテンシも変わっていない。まず検索とインデックスの段を疑う（インデックスの作り直しの失敗、埋め込みの不一致）（fresh） | 正しい | 素材 #13。試験ガイド サンプル3と解説（日本語版「インデックスの再作成の失敗や、埋め込みの不一致など」）。問題文は写さず、要旨だけを述べた |
| 14 | 2つの検索を並べ、結果を順位で統合する（search） | 正しい | 素材 #14。Contextual Retrieval の記事「Combine and deduplicate results from (3) and (4) using rank fusion techniques」 |
| 15 | リランカーは関連の強さで候補を採点し直すモデル。記事の評価では、ここまでの手法（チャンクの説明、キーワードの検索、リランカー）を重ねると、検索の失敗率がおよそ3分の1。その分レイテンシとコストが増える（search） | 正しい | 素材 #15。同記事: 上位20件の検索失敗率が 5.7% から 1.9%（67%減）。「it inevitably adds a small amount of latency」「trade-off between reranking more chunks for better performance vs. reranking fewer for lower latency and cost」。数値は記事の評価環境の値なので「記事の評価では」と添えた |
| 16 | 在庫や口座の残高のように刻々と変わる値は検索に向かない。元のシステムにツールや API で問い合わせる。現在の状態を検索に担わせていないかは、公式の対策講座も挙げる観点（live） | 正しい（講座） | 素材 #16。公式 Prep Course 講座1の学習目標（blueprint.md 4章 Domain 1 (a)）。試験ガイドそのものの記載ではないので、台本でも「公式の対策講座」と出どころを言った |
| 17 | LLM のシステムは、同じ入力でも同じ動きをするとは限らない（hard） | 正しい | 素材 #17。https://www.anthropic.com/engineering/multi-agent-research-system 「Agents make dynamic decisions and are non-deterministic between runs, even with identical prompts」 |
| 18 | 失敗がエラーに現れない。応答は正常で、答えだけが間違う（hard）。画面の「エラー率: 応答は、正常に返ってくる」（quality） | 正しい | 素材 #18。試験ガイド サンプル3の状況／https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons（`stop_reason` は成功した応答に含まれ、エラーとは別） |
| 19 | Anthropic の記事も、本番の全体の追跡で、失敗を体系的に直せたと述べている（trace） | 正しい | 素材 #19。multi-agent-research-system「Adding full production tracing let us diagnose why agents failed and fix issues systematically」 |
| 20 | `request-id` は応答ごとに付く一意の ID。`usage` にトークン数がある（trace） | 正しい | 素材 #20。https://platform.claude.com/docs/en/api/errors 「Every API response includes a unique `request-id` header」／prompt-caching「within `usage`」 |
| 21 | `stop_reason` は、応答が止まった理由（trace の画面） | 正しい（追加） | 素材 #20 は「応答ごとに付く」まで。意味は 2026-11-16 に一次情報で確認: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons 「Every Messages API response includes a `stop_reason` field that tells you why Claude stopped generating.」 |
| 22 | 記録する項目の例（返したチャンクと出どころの文書、`request-id`、`usage` のトークン数、`stop_reason`、各段の所要時間）（trace） | 本教材の設計例 | 素材 #21。個別の公式記載ではなく、サンプル3と #19 から導いた例。台本でも「たとえば」、画面でも「記録する項目の例」とした |
| 23 | レイテンシとエラー率だけのモニタリングでは、品質の崩れを見逃す。画面の「レイテンシ: 誤答しても、変わらないことがある」（quality） | 正しい | 素材 #23。試験ガイド サンプル3（レイテンシは不変のまま誤答）から直接いえること |
| 24 | 規模が大きいとプライバシーも課題。同じ記事では、会話の中身は見ずに、判断のパターンとやり取りの構造をモニタリングした（quality） | 正しい | 素材 #22。multi-agent-research-system「we monitor agent decision patterns and interaction structures」「without monitoring the contents of individual conversations, to maintain user privacy」 |

## 一般的な説明（数値や固有の主張を含まないもの）

次は、素材の本文にある言葉の説明で、特定の出典に依らない。

- レイテンシは、応答が返るまでの待ち時間（latency）
- RAG は、検索で取ってきた文書の断片（チャンク）をプロンプトに加えて答えさせる方式（chunk）
- インデックスはチャンクを速く探すための索引。埋め込みは、文章の意味を数値の並びにしたもの（index）
- オブザーバビリティは、システムの中を外から観測できる度合い。段が多いと、どこで崩れたかを答えだけでは切り分けられない（hard）
- 評価の指標とモニタリングの実務は、次回（第5回）で扱う（quality。講座の章立て `reference/outline.md`）

## 試験ガイドと現行ドキュメントの食い違い

- 素材と同じく、なし。試験ガイドのこの範囲は1行ずつのタスクだけで、製品の機能名に触れていない。台本で使った effort、プロンプトキャッシング、`request-id`、`usage`、`stop_reason` は、素材が 2026年11月時点の現行ドキュメントで確かめている。
- effort の既定値（モデルによって違う）は、素材と同じく台本では触れていない。

## 素材（ch04.md）から変えた点

- **動画用に文を短く切り、場面の変化に合わせて並べ直した。** 「精度とレイテンシ」の節は、「根拠にならない／根拠になる」の対比（basis）で、最小のモデルの話と文書の切り捨ての話を先にまとめ、測って選ぶ話をあとに置いた。
- **見える化の節の最後は、「レイテンシとエラー率だけでは見逃す」を先に、プライバシーの話をあとにした**（quality。画面の対比の順に合わせた）。
- **省いたもの（長さの都合）**: 「前の第3章と分け合う」、「変わったのは文書だけ、という事実が手がかり」（画面の流れの1つ目の箱の説明には残した）、クイズの「モデルを大きくしても、渡すチャンクが違えば答えは直らない」。
- **声では「LLM」を「大規模言語モデル」と読ませた。** 音声エンジンが「エルエル／エム」と語の途中で区切るため。字幕と画面の表記は「LLM」のまま。
- **「第5章」は「第5回」と言った。** 動画のシリーズの回の呼び方に合わせた。
- **チャンクの例（chunk の画面）は、説明の部分を「（どの会社の、いつの文書かの説明）」と伏せた。** 記事にある具体的な会社名や金額は、素材にないので足していない。
- **ミニクイズは素材の問題を短くした。** 選択肢は素材と同じ3つ（順番も同じ）で、正解は B（素材の「2番」）。

## 未確認のまま残っている主張

なし。素材の「確認できなかった点」と同じく、#16 は試験ガイドではなく公式の対策講座の学習目標、#22 は公式の記載ではなく本教材の設計例。Contextual Retrieval の記事の数値（失敗率、20万トークン）は記事の時点の評価環境の値で、台本では出どころを添えた。

## 参照した URL

- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency
- https://platform.claude.com/docs/en/build-with-claude/effort
- https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- https://www.anthropic.com/research/building-effective-agents
- https://www.anthropic.com/engineering/contextual-retrieval
- https://platform.claude.com/docs/en/build-with-claude/embeddings
- https://www.anthropic.com/engineering/multi-agent-research-system
- https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons
- https://platform.claude.com/docs/en/api/errors
- 公式の試験ガイド（日本語版）v1.0 の §6 とサンプル問題2・3（`CCAR-P/reference/` の PDF とテキスト）

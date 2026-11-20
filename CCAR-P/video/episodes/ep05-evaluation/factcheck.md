# 事実確認：ep05-evaluation（評価・テスト・最適化）

確認日: 2026-11-16

台本の主張は、すべて講座の本文 `course/ch05.md` の範囲に収めた。根拠は、同ファイルの「## 事実確認」の表（2026-11-16 に、公式の試験ガイドと公式ドキュメントで照合済み）から、台本に入れた主張に当たる行を引いたもの。表の番号（素材#）は ch05.md の表の番号。素材にない主張は足していないので、この回で新たに一次情報を取得した項目はない。

根拠の種類:

- **試験ガイド**: Claude Certified Architect – Professional Exam Guide v1.0（2026年7月発効。英語版と日本語版。`reference/CCAR-P_exam_guide_v1.0_ja.txt` で分野4のタスクとサンプル問題2・3の解説を読み直した）
- **公式ドキュメント**: platform.claude.com/docs の各ページ（URL は表と末尾の一覧）
- **公式記事**: Anthropic Engineering「Demystifying evals for AI agents」
- **公式の対策講座**: Partner Academy の CCAR-P Prep Course の学習目標（`reference/blueprint.md` の4章 (a)。公式だが試験ガイドではない）

公開前に、末尾の URL を開いて、動画の内容と食い違いがないかを見直すこと。**2026年12月7日に試験内容が更新される（更新版の試験ガイドは 2026年11月17日に公開予定）。** 配点・タスクの行（#1、#3、#15）は、新しいガイドで変わっていないかを確かめる。

## 試験の範囲と配点

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 1 | 現行の試験ガイド、バージョン1.0 では、分野4の配点は16%で、タスクは6つ（指標を決める、評価データセットを作る、A/B テストで改善する、問題を診断する、コストと速さを詰める、本番を見張る） | 正しい | 試験ガイド v1.0（日本語版・英語版）§6 分野4「評価、テスト、最適化（16%）」と6つのタスク。outline.md の値と一致 | 1 |
| 2 | 試験ガイドは評価の軸として、精度、レイテンシ、コスト、安全性、セキュリティを挙げている | 正しい | 試験ガイド 分野4 タスク 4.1「評価指標（精度、レイテンシ、コスト、安全性、セキュリティ）を定義する」 | 3 |
| 3 | 問題の種類は、プロンプトの失敗、ハルシネーション、モデルの不適合の3つ（画面の項目） | 正しい | 試験ガイド タスク 4.4「システムの問題（プロンプトの失敗、ハルシネーション、モデルの不適合）を診断する」 | 15 |

## 成功基準と評価データセット

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 4 | 成功基準は、何ができたら成功かを測れる形で書く。「性能が良い」では足りず、「感情の分類が正確」のように何を測るかまで決める | 正しい | https://platform.claude.com/docs/en/test-and-evaluate/develop-tests 「Good success criteria are: Specific / Measurable / Achievable / Relevant」。例「Instead of "good performance," specify "accurate sentiment classification."」 | 2 |
| 5 | あいまいな安全性も数字にできる。1万回の試行で、有害と判定された出力が0.1%未満、のように書く | 正しい | 同ページ「Even "hazy" topics such as ethics and safety can be quantified」の表。Good の例「Less than 0.1% of outputs out of 10,000 trials flagged for toxicity by the content filter.」 | 4 |
| 6 | 成功基準は、本番のコードを書く前に決める（画面の補足: 完成の条件を、あとから都合よく決めないため） | 正しい | 公式の対策講座（講座2）の学習目標「本番のコードを書く前に成功基準を決め、評価スイートを作る」（blueprint.md 4章 (a)）。https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview 「Before prompt engineering … A clear definition of the success criteria … If not, spend time establishing that first.」。あとから都合よく決める、という理由づけは教材の説明 | 5 |
| 7 | 評価データセットは本番で実際に来る入力に似せ、極端に長い入力や、人でも判断が割れる入力を加える | 正しい | develop-tests「Design evals that mirror your real-world task distribution. Don't forget to factor in edge cases!」。例: Overly long input data / Ambiguous test cases where even humans would find it hard to reach an assessment consensus | 6 |
| 8 | ドキュメントは、手作業で採点する少数より、自動で採点できる多数をすすめている | 正しい | develop-tests「Prioritize volume over quality: More questions with slightly lower signal automated grading is better than fewer questions with high-quality human hand-graded evals.」 | 7 |
| 9 | 最初は、実際の失敗から取った20件から50件でも良い出発点になる | 正しい | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents 「20-50 simple tasks drawn from real failures is a great start.」 | 8 |
| 10 | 採点の方法は3つあり、組み合わせて使う | 正しい | 試験ガイド タスク 4.2「複数の方法論を組み合わせて」。demystifying-evals「Agent evaluations typically combine three types of graders」 | 10 |
| 11 | コードによる採点は速く、安く、毎回同じ結果。表現が違うだけの正しい答えを誤りにしがち。モデルによる採点は柔軟で細かな質も見られるが、結果が揺れるので、明確な採点基準を与え、人の採点と突き合わせてから広げる。人による評価は最も質が高いが、遅く費用がかかる | 正しい | demystifying-evals「Code-based: Fast, Cheap, Objective, Reproducible / Brittle to valid variations」「Model-based: Flexible, Scalable, Captures nuance / Non-deterministic, Requires calibration with human graders」「Human: Gold standard quality / Expensive, Slow」。develop-tests「Human grading: Most flexible and high quality, but slow and expensive.」「LLM-based grading: … Test to ensure reliability first, then scale.」「Have detailed, clear rubrics」 | 9 |

## A/B テストと診断

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 12 | A/B テストは、今の版と新しい版を本番で比べる方法 | 正しい | demystifying-evals「A/B testing validates significant changes once you have sufficient traffic.」（台本では「十分な利用量があるとき」の部分は長さの都合で省いた） | 11 |
| 13 | 始める前に、仮説、主に見る指標、必要な件数を決め、結果は言いすぎずに読む（画面: 小さな差や1つの指標の改善を、言いすぎない） | 正しい | 公式の対策講座（講座2）の学習目標「仮説を立て、指標を選び、必要なサンプルサイズを見積もり、結果を言いすぎずに読む」（blueprint.md 4章 (a)）。「1つの指標の改善を言いすぎない」は、言いすぎの具体例として教材が補った説明（画面の補足だけで、ナレーションでは言っていない） | 12 |
| 14 | Claude の出力は、同じ入力でも毎回少し変わる。少ない件数での小さな差は、たまたまかもしれない | 正しい | demystifying-evals「Because model outputs vary between runs, we run multiple trials to produce more consistent results.」。「たまたまかもしれない」はそこからの教材の説明 | 13 |
| 15 | 本番で見つかった失敗は評価データセットに足し、直した問題の再発を確かめる回帰テストが育つ | 正しい | demystifying-evals の regression evals「should have a nearly 100% pass rate」、自動評価を「running on each agent change and model upgrade」。同記事の「tasks drawn from real failures」 | 14 |
| 16 | 診断は、何が変わり、何が変わっていないかから始める（画面の見出し: 原因は、変わったことにつなげる）。RAG で文書の更新直後に誤答が増え、モデルもレイテンシも変わっていないなら、まず検索とインデックスの段を疑う | 正しい | 試験ガイド §8 サンプル3と解説（「モデルとレイテンシが変わらないまま、文書の更新後に確信に満ちた誤った回答が生じていることは、検索がモデルに質の低いコンテキストを渡していることを示しています」。インデックスの再作成の失敗や埋め込みの不一致）。問題文の転載はしていない。「何が変わったかから始める」という一般化は教材の説明 | 16 |
| 17 | プロンプトの失敗は、指示があいまいで形式や範囲がずれるもの。プロンプトを直し、評価データセットで確かめる | 正しい（教材の説明） | 種類の名前は試験ガイド タスク 4.4。中身の説明は教材の本文（ch05.md「診断は…」の節）。直したら評価で確かめる考え方は #10・#11 と同じ根拠 | 15 |
| 18 | ハルシネーションの対策として、分からなければ分からないと答えてよいと伝え、根拠の引用を示させる | 正しい | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations 「Allow Claude to say "I don't know"」「Use direct quotes for factual grounding」「Verify with citations」 | 17 |
| 19 | モデルの不適合は、能力が足りない、または大きすぎて遅く高い状態。同じ評価データセットで、モデルを比べて判断する | 正しい | prompt-engineering/overview「Not every success criterion or failing eval is best solved by prompt engineering. … improve latency and cost more easily by choosing a different model.」。https://platform.claude.com/docs/en/about-claude/models/choosing-a-model 「Create benchmark tests specific to your use case」「Compare performance across models」 | 18 |

## 最適化

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 20 | まずよく動くプロンプトを作り、速さとコストはそのあとで詰める | 正しい | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency 「It's always better to first engineer a prompt that works well without model or prompt constraints, and then try latency reduction strategies afterward. Trying to reduce latency prematurely might prevent you from discovering what top performance looks like.」 | 19 |
| 21 | 毎回同じ長い前置きを送るなら、プロンプトキャッシング | 正しい | 試験ガイド §8 サンプル2の解説。https://platform.claude.com/docs/en/build-with-claude/prompt-caching 「Cache prompt prefixes … to cut costs and latency」 | 20 |
| 22 | 急ぎでない大量の処理は、Message Batches API に回すとコストが半分 | 正しい | https://platform.claude.com/docs/en/build-with-claude/batch-processing 「tasks that do not require immediate responses … reducing costs by 50 percent」 | 21 |
| 23 | 出力は短く頼み、`max_tokens` で上限を決める。体感の速さには、答えを少しずつ返すストリーミング | 正しい | reduce-latency「Ask for shorter responses」「Set appropriate output limits: Use the max_tokens parameter」「Stream responses … significantly improve the perceived responsiveness」 | 22 |
| 24 | タスクに合うかを確かめずに一番小さいモデルにすると、品質を損なう | 正しい | 試験ガイド §8 サンプル2の解説「やみくもな小型化（B）は品質を損なうリスクがあります」 | 23 |
| 25 | 簡単な処理は安いモデル、難しい部分だけ能力の高いモデル、という組み合わせがある | 正しい | choosing-a-model「Multimodel strategies pair a lower-cost model with a frontier model so that most tokens are billed at the lower rate.」 | 24 |
| 26 | 必要な情報を捨てて軽くするのは誤り（画面:「情報を削って軽くする」→「必要な情報まで失われる」） | 正しい | 試験ガイド §8 サンプル2の解説「必要なコンテキストを捨てることなく」「切り詰め（A）では必要なポリシーが失われます」 | 25 |
| 27 | 変えたら、同じ評価データセットで確かめる | 正しい | #19 と同じ根拠（choosing-a-model のベンチマークでの比較）。教材の本文の要点 | 18 |

## モニタリング

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 28 | 本番では入力の傾向が変わったり、想定外の失敗が起きたりする。それをログとオブザーバビリティのツールで見つける | 正しい | demystifying-evals「Production monitoring kicks in post-launch to detect distribution drift and unanticipated real-world failures.」。試験ガイド タスク 4.6「ロギングツールとオブザーバビリティツールを使用してシステムのパフォーマンスをモニタリングする」 | 26 |
| 29 | リクエストごとに、モデル、トークン数、かかった時間、`stop_reason` を残す | 正しい | トークン数は応答の usage（input_tokens、output_tokens）: https://platform.claude.com/docs/en/api/messages/create 。`stop_reason` は #30。何を残すかの組み合わせは教材の説明 | 27, 28 |
| 30 | `stop_reason` は出力を止めた理由。エラーでなくても、`max_tokens` で止まっていれば答えは途中で切れている | 正しい | https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons 「Every Messages API response includes a stop_reason field that tells you why Claude stopped generating.」「max_tokens: The response reached your max_tokens limit.」「Unlike errors…」 | 27 |
| 31 | 画面のコード例: 応答の `"stop_reason": "max_tokens"` と `usage` の `input_tokens`・`output_tokens` | 正しい | フィールド名は messages/create の応答の定義と handling-stop-reasons。数値（1200、1024）は説明用の値 | 27, 28 |
| 32 | 集めた数字は成功基準と同じ物差しで見て、外れたら知らせが届くようにし、失敗は評価データセットに戻す | 正しい（教材の説明） | 教材の本文（ch05.md「ログは…」の節）。失敗を評価に戻す点は #15、本番のモニタリングと自動評価を組み合わせる点は demystifying-evals「automated evals for fast iteration, production monitoring for ground truth, and periodic human review for calibration」 | 10, 14 |

## ミニクイズ

- 素材のミニクイズ（小売企業が問い合わせ対応をすべて小さいモデルに切り替え、複雑な問い合わせだけ正答率が下がった）をそのまま使い、選択肢の文を短くした。番号（1番〜3番）は画面の記号に合わせて A〜C にした。正解は B（素材の2番）。
- 根拠は #19（モデルの不適合は同じ評価データセットで比べる）、#24（確かめずに小型化すると品質を損なう）、#25（モデルの組み合わせ）。自作の問題で、実際の試験問題ではない。

## 素材の「試験ガイドと現行ドキュメントの食い違い」の扱い

- 内容の食い違いはなし（素材の記載どおり）。
- 組織単位の使用量とコストを取る API の名前の変化（Usage and Cost API → Usage and Cost Analytics API）は、素材と同じく、この回では触れていない。
- ドキュメントの「成功基準の定義」と「評価の作成」は、現在は1つのページ（develop-tests）にまとまっている。台本では「ドキュメントは…」と言うだけで、ページ名は出していない。

## 素材から変えた点

- 冒頭の配点は「現行の試験ガイド、バージョン1.0 では」と添えた。画面の見出しとサムネイルには、配点の数字を入れていない（12月7日の更新後も使えるように）。
- 「十分な利用量があるときに、大きな変更を確かめるのに使う」（#12）は、長さの都合で省いた。
- 「オブザーバビリティとは、外から見える情報で中の状態をつかめること」という定義は、長さの都合で省いた。
- 同じく長さの都合で、次の説明も省いた（最初の音声が 7:39 になったため、6:44 まで削った）: 冒頭の6つのタスクの読み上げ（画面の3つの箱には残した）、「基準がないと、完成の条件をあとから都合よく決めてしまう」（画面の項目には残した）、「1つの指標が良くなっても、コストや安全性が悪化すれば良い変更ではない」（画面の補足に残した）、「先に削ると、最高の性能がどこにあるかが分からなくなる」、「試験ガイドは問題の種類として3つを挙げている」の前置き。
- ミニクイズの問題文は、素材の2文（簡単な問い合わせは変わらず、複雑な問い合わせだけが下がった）を「評価データセットでは、返品の条件が絡む、複雑な問い合わせだけ、正答率が下がりました」の1文にまとめた。考える時間は4秒。
- 「大規模なモニタリングの戦略は第4章で扱った」「第2章で扱ったプロンプトキャッシング」の章の参照は、長さの都合で省いた。
- 診断の節は、RAG の例（変わったこと／変わっていないこと）を先に見せ、そのあとで問題の3種類を並べた。素材ではハルシネーションの説明の中にある例を、「何が変わったかから始める」の具体例として前に出した。内容は変えていない。
- 「最適化」のうち、選んではいけない手（確かめずに最小モデル、情報を捨てる）と選ぶ手（モデルの組み合わせ、同じ評価で確かめる）を、左右の対比の画面にまとめた。

## 未確認のまま残っている主張

なし。素材の「確認できなかった点」（A/B テストの統計手法や件数の見積もり方、モデルの採点を人と突き合わせる頻度）は、台本でも具体的な手法や数値を言っていない。

## 参照した URL

- https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency
- https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- https://platform.claude.com/docs/en/build-with-claude/batch-processing
- https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons
- https://platform.claude.com/docs/en/api/messages/create
- 試験ガイド v1.0（英語版）: https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542810%2FClaude+Certified+Architect+%E2%80%93+Professional+Exam+Guide.pdf
- 試験ガイド v1.0（日本語版）: https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1792453714%2FClaude+Certified+Architect+-+Professional+Exam+Guide+%28Japanese%29.pdf
- 試験内容の更新の告知（Pearson VUE）: https://www.pearsonvue.com/us/en/anthropic.html

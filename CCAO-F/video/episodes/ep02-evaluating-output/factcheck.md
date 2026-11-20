# 事実確認：ep02-evaluating-output（出力を確かめる）

確認日: 2026-11-16

素材は `CCAO-F/course/ch02.md`（2026-11-16 に、公式の試験ガイド v1.0（日本語版・英語版）と公式ドキュメントで照合済み）。
下の表は、台本に入れた主張について、素材の「事実確認」の表から該当する行を引いたもの（# は素材の表の番号）。
台本には、素材にない事実を足していない。そのため、この回で新たに一次情報を取得した行はない。

公開前に、末尾の URL を開いて、動画の内容と食い違いがないかを見直すこと。
特に、2026-12-07 に試験内容が更新される（更新版の試験ガイドは 2026-11-17 公開予定）。この回は試験ガイド v1.0 に基づく。

## 台本の主張と根拠

| # | 台本の主張（場面） | 判定 | 根拠 | 確認日 |
|---|---|---|---|---|
| 1 | この回は分野2「出力の評価と検証」。現行の試験ガイド v1.0 では配点21%で、7分野の中で最大。前半の3つのタスク（正確性と網羅性の評価、ハルシネーション・不整合・バイアスの特定、ファクトチェックと検証の手法）を扱う（scope） | 正しい | 試験ガイド v1.0 日本語版 §6「分野2：出力の評価と検証（21%）」の箇条書き1〜3番目（英語版 Domain 2 の Evaluate ... for accuracy and completeness ／ Identify hallucinations, inconsistencies, and biases ／ Apply fact-checking and validation techniques）。配点表で21%が最大。`reference/outline.md` の章立て | 2026-11-16 |
| 2 | 正確性は事実や資料と合っているか、網羅性は入るべきことが抜けていないか。2つは別々に確かめる。正しいことだけでも、抜けがあれば使えない（accuracy） | 正しい（教え方としての整理） | 試験ガイドのタスク文が accuracy と completeness を並べている。Claude 101「Getting better results」 https://academy.claude.com/courses/claude-101/getting-better-results 「Does Claude capture the key information?」「What's missing or could be improved?」 | 2026-11-16 |
| 3 | 入るべき項目（決定事項、期限、担当者など）を先に挙げ、一つずつ探すと、抜けに気づける（checklist） | 正しい（手法の推奨） | Claude Academy「How people check Claude's work」 https://academy.claude.com/tutorials/discernment-toolkit 「Build tests or rubrics」 | 2026-11-16 |
| 4 | ハルシネーションは、もっともらしいのに実は間違っている内容を、AI が自信をもって述べる誤り（hallucination） | 正しい | AI Fluency Key Terminology Cheat Sheet https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf 「Hallucination: A type of error when AI confidently states something that sounds plausible, but is actually incorrect.」 | 2026-11-16 |
| 6 | 数字、名前、日付、条項の番号、アドレスなどの具体的な細部も作られうる。具体的なこと、流ちょうなこと、言い切りは、正しさの証拠ではない（hallucination、まとめ） | 正しい | 試験ガイド サンプル1の解説「言語モデルは、引用番号のような具体的に見える詳細を捏造することがあり、これがハルシネーション」。Claude 101「Claude occasionally generates plausible but incorrect information, especially with specific facts or niche topics.」 | 2026-11-16 |
| 7 | Claude の知識には学習した時点の区切りがあり、ウェブ検索を使わないと、新しい情報を古いまま答えることがある（hallucination） | 正しい | Cheat Sheet「Knowledge cutoff date: The point after which an AI model has no built-in knowledge of the world」。ヘルプセンター https://support.claude.com/en/articles/8525154 （最新の情報、特に時事を持っていないことがある）。Claude 101「Enable web search to ground responses in current information.」 | 2026-11-16 |
| 8 | 不整合は、出力の中、渡した資料、同じ依頼の繰り返しで比べて見つける。毎回違う部分は、作られた内容かもしれない（inconsistency） | 正しい | Claude Docs「Reduce hallucinations」 https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations 冒頭「factually incorrect or inconsistent with the given context」、Best-of-N verification「Run Claude through the same prompt multiple times and compare the outputs. Inconsistencies across outputs could indicate hallucinations.」。出力内部の食い違いは Cheat Sheet の「coherence」「logical errors」 | 2026-11-16 |
| 9 | バイアスは、特定の人々や立場を不公平に有利または不利に扱う偏りで、学習したデータの偏りが出力に表れることがある（bias） | 正しい | Cheat Sheet「Bias: Systematic patterns in AI outputs that unfairly favor or disadvantage certain groups or perspectives, often reflecting patterns in training data.」。求人の文面と利点だけの例は、この定義に沿った素材の例 | 2026-11-16 |
| 10 | 聞き方が偏りを生む。相手が聞きたそうな答えに寄る傾向を迎合と呼ぶ。対策は、中立的に聞く、反対の意見も出させる、聞き方を変えて答えが変わるかを見る（bias、neutral） | 正しい | Claude Academy「What is sycophancy in AI models?」 https://academy.claude.com/tutorials/what-is-sycophancy-in-ai-models 「Sycophancy is when someone tells you what they think you want to hear」、「The question is framed around a specific point of view」、対策「neutral, fact-seeking language」「prompt for accuracy or counter arguments」「Rephrase your question and see whether the answer changes」。「迎合」は sycophancy の素材の訳語（試験ガイドには出てこない） | 2026-11-16 |
| 11 | ファクトチェックの基本は、一次情報（元のデータ、規程の原文、公式の条文）と照らすこと（primary） | 正しい | 試験ガイド サンプル1の正解「引用された項を規制の公式な条文と照合して確認する」、解説「信頼できる情報源と照合して検証する」。discernment-toolkit「verifying Claude's output against something external」 | 2026-11-16 |
| 12 | 主張ごとに資料の文を引用させ、根拠のない主張に印を付けさせると、確かめる場所が絞れる（citations） | 正しい | Reduce hallucinations「Verify with citations: ... have it cite quotes and sources for each of its claims ... If it can't find a quote, it must retract the claim」。discernment-toolkit「Ask for source grounding」 | 2026-11-16 |
| 14 | 引用や出典が付いていても、それだけで確認済みにはならない。自分で開いて確かめる（citations、まとめ） | 正しい | discernment-toolkit（出典の明示は、その出典を確かめて初めて役に立つ、という趣旨）。Reduce hallucinations の Note「they don't eliminate them entirely. Always validate critical information」 | 2026-11-16 |
| 15 | 公式のサンプル問題の誤りの型。Claude の自己申告の自信は正確さの指標にならない。自信のない箇所を挙げさせるのは手がかりになるが、確かめることの代わりにはならない（traps） | 正しい | 試験ガイド サンプル1の解説「自己申告の確信度（A、C）は正確性の信頼できる指標ではなく」。Claude 101 は「Ask Claude to cite sources or indicate confidence level」を勧めつつ「For high-stakes work, verify key facts independently」 | 2026-11-16 |
| 16 | 言い回しや書式を整えても、中身の正しさは変わらない（traps） | 正しい | 試験ガイド サンプル1の解説「体裁の変更（D）は正しさの問題に対処しません」 | 2026-11-16 |
| 17 | 間違いがあっても使うのをやめる必要はなく、確かめる手順を入れれば業務は続けられる（traps） | 正しい（試験の判断の型） | 試験ガイド サンプル3の解説「タスクを断念すること（D）は不要」と、サンプル2の極端な対処が誤答とされる型（blueprint.md 7.1）。分野2の範囲での当てはめは素材の整理 | 2026-11-16 |
| 18 | 自分の名前で出す成果物には、自分が責任を持つ（traps） | 正しい | Cheat Sheet「Deployment Diligence: Taking responsibility for verifying and vouching for the outputs you use or share」。Claude 101「Validation builds confidence, but it doesn't eliminate responsibility.」 | 2026-11-16 |
| Q | ミニクイズ（社内報の記事。数字が一致しても、要点を挙げて抜けと資料にない話を確かめるのが正解） | 正しい（自作の問題） | 素材のミニクイズを短くしたもの。根拠は #2・#3・#8 の考え方の当てはめ。実際の試験問題ではない | 2026-11-16 |

## 試験ガイドと現行ドキュメントの食い違い

- 素材のとおり、この回の範囲では、試験ガイド v1.0 と、2026年11月時点の Claude Docs、ヘルプセンター、Claude Academy の記述に食い違いは見つかっていない。
- Claude 101 は「出典や確信度を示させる」ことを勧め、試験ガイドは自己申告の確信度を正確性の指標にしない。矛盾ではないので、台本は素材と同じく「手がかりにはなるが、確かめることの代わりにはならない」と書き分けた（traps）。

## 素材（course/ch02.md）から変えた点

- **配点の数字は、声と字幕だけで言い、「現行の試験ガイド、バージョン1.0 では」と添えた。** 2026-12-07 の試験内容の更新に備え、場面の見出しと補足、サムネイルには配点の数字を出していない。
- **「Anthropic のヘルプセンターも、権威がありそうな引用を作ることがあると注意している」（素材 #5）は、長さの都合で省いた。** ハルシネーションの説明は #4・#6 で足りている。参考の URL には残した。
- **「ウェブ検索の答えは、示された出典を開いて読む。元のページには要約で落ちた前提がある」（素材 #13）も、長さ（7分以内）の都合で省いた。** 「引用や出典は、自分で開いて確かめる」（#14）は残している。
- **規程の条項の番号などの例は「数字、名前、日付、条項の番号、ウェブのアドレス」に短くした。**
- **議事録の例は、正確性と網羅性の対比の画面（compare）に分けて見せた。** 内容は素材のまま。
- **「抜けを見つける手順」を3つの箱（項目を挙げる → 一つずつ探す → 抜けに気づく）で見せた。** 3つ目の箱の説明「読み流すだけでは、抜けには気づけない」は素材の文。
- **迎合への3つの対策の画面の説明（「答えの向きを決めない言葉で頼む」など）は、素材の対策の言い換え。** 新しい事実ではない。
- **ミニクイズは、選択肢に A・B・C の記号を付けた（素材は 1番・2番・3番）。** 動画の解答用紙の形に合わせた。問題文と選択肢は短くした。正解は素材と同じ（素材の2番＝B）。

## 未確認のまま残っている主張

なし。素材の「確認できなかった点」のとおり、公式の対策講座「Evaluating & Validating Claude's Output」はログインが必要で読めていないが、台本はその講座の内容には依拠していない。

## 参照した URL

- 試験ガイド v1.0（日本語版・英語版。`CCAO-F/reference/` に保存のもの）
- https://academy.claude.com/courses/claude-101/getting-better-results
- https://academy.claude.com/tutorials/discernment-toolkit
- https://academy.claude.com/tutorials/what-is-sycophancy-in-ai-models
- https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf
- https://support.claude.com/en/articles/8525154
- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations

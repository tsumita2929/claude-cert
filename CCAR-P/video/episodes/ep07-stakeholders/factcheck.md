# 事実確認：ep07-stakeholders（ステークホルダーと合意形成）

確認日: 2026-11-16

素材は `CCAR-P/course/ch07.md`（2026-11-16 に、公式の試験ガイドと公式ドキュメント・公式の対策講座で照合済み）。
下の表は、台本に入れた主張について、素材の「事実確認」の表から該当する行を引いたもの（「素材#」は素材の表の番号）。
素材にない主張は、成功基準の4条件の説明（画面の項目の説明文）だけで、これは 2026-11-16 に一次情報を取得して確かめた（表の末尾）。

根拠は次の3種類。

- **試験ガイド**: Claude Certified Architect – Professional 試験ガイド v1.0（日本語版・英語版）。2026年12月7日に試験内容の更新が予定され、更新版のガイドは 2026年11月17日に公開予定。動画は v1.0 に基づく
- **公式の対策講座**: Anthropic Partner Academy の学習目標（試験ガイドではない。台本では「公式の対策講座」と言っている）
- **公式ドキュメント・公式記事**: platform.claude.com/docs と Anthropic Engineering の記事

## 試験の範囲

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 1 | 分野6は「ステークホルダーとのコミュニケーションとライフサイクル管理」。現行の試験ガイド v1.0 では配点14%、タスクは5つ | 正しい | 試験ガイド v1.0（日本語版・英語版）§6 分野6。outline.md の表とも一致 | 1 |
| 2 | 5つのタスク（ディスカバリーと要件収集、決定とトレードオフの伝え方、フィードバックループと期待値の調整〔SLA を含む〕、文書化と実装のガイダンス、ライフサイクルの各フェーズの支援） | 正しい | 試験ガイド 分野6 の箇条書き5つ（日本語版の訳語に合わせた） | 2 |
| 3 | ライフサイクルのフェーズは、ディスカバリー、設計、引き継ぎ、モニタリング、反復の5つ | 正しい | 試験ガイド 分野6「ライフサイクルの各フェーズ（ディスカバリー、設計、引き継ぎ、モニタリング、反復）を支援する」 | 3 |

## ディスカバリーと成功基準

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 4 | 非技術のステークホルダーに、決まった観点で聞き、聞いたことを要件と文書にした前提に変え、設計をビジネスケースから説明できるようにする | 正しい（公式・講座） | https://anthropic-partners.skilljar.com/stakeholder-engagement-lifecycle-gtm 学習目標「Run a structured discovery conversation with a non-technical stakeholder」…要件と documented assumptions に変え、business case に結びつける | 4 |
| 5 | 良い成功基準は、具体的、測れる、達成できる、目的に合っている。「性能が良いこと」では基準にならない | 正しい | https://platform.claude.com/docs/en/test-and-evaluate/develop-tests 「Good success criteria are: Specific… Measurable… Achievable… Relevant」。Specific の説明に「Instead of "good performance," specify…」 | 5 |
| 6 | 要件を固める前に、デモやモデルの比較に飛びつく選択肢は劣る | 正しい（趣旨） | 同ページ「Building a successful LLM-based application starts with clearly defining your success criteria」／ https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview 「Before prompt engineering」に成功基準と経験的なテストの用意を前提として挙げる | 6 |

## トレードオフの伝え方

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 7 | 選択肢ごとに、コスト、リスク、元に戻すのに何が要るかを添え、ビジネス側が動ける形で示す | 正しい（公式・講座） | 対策講座の学習目標「Present an architectural trade-off in terms a business stakeholder can act on」…cost, risk, reversal effort（https://anthropic-partners.skilljar.com/stakeholder-engagement-lifecycle-gtm ） | 7 |
| 8 | エージェント型は、レイテンシとコストを払って、成果を高めることが多い | 正しい | https://www.anthropic.com/engineering/building-effective-agents 「Agentic systems often trade latency and cost for better task performance」 | 8 |
| 9 | 劣る伝え方は、推す案だけを技術の詳細とともに示すことと、ベンチマークの数字を並べて判断を丸投げすること | 正しい（傾向） | blueprint.md 7章「問題の傾向」（公式サンプル問題の解説から読み取った誤答の型） | 16 |

## 期待値と SLA、フィードバックループ

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 10 | 最も高度な言語モデルでも事実と違う答えを返すことがあり、対策で減らせてもなくしきれない | 正しい | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations 冒頭「Even the most advanced language models, such as Claude, can sometimes generate text that is factually incorrect…」、Note「significantly reduce hallucinations, they don't eliminate them entirely」 | 9 |
| 11 | 正確さだけでなく、レイテンシや安全性も並べて水準を決める | 正しい | develop-tests「Most use cases need multidimensional evaluation along several success criteria.」例に F1、非有害な出力の割合、レイテンシ | 10 |
| 12 | レビューのきっかけ、SLA を守れないときの対応、反復で直すか作り直すかを先に決め、ガバナンスの確認も同じループに組み込む | 正しい（公式・講座） | 対策講座の学習目標「Build and operate a stakeholder feedback loop across the deployment lifecycle」…review triggers、SLA breach responses、iterate-versus-re-architect、governance checkpoints | 11 |
| 13 | 「プロンプトや検索の調整で水準に戻せるなら反復、前提が崩れていれば設計に戻る」 | 教材の説明（判断の目安） | 公式資料は「反復か作り直しかを決める」ことまでを言い、見分け方の具体は示していない。素材と同じく、見分け方の例として述べた | 12 |

## 文書化とライフサイクル

| # | 台本の主張 | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 14 | 公式の対策講座は、アーキテクトにしか分からない設計は、その人が部屋を出た途端に崩れる、と注意している。引き継ぎは自分がいなくても回るように設計する | 正しい（公式・講座） | https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional 「a design that only the Architect understands falls apart the moment they leave the room」「design a handoff that survives your absence」 | 13 |
| 15 | 読む人に合わせて書き分ける（出資する経営層には、どんな価値がいつ出るかを示す） | 正しい（公式・講座、趣旨） | 対策講座の学習目標「sponsor-friendly outcome document」（stakeholder-engagement-lifecycle-gtm） | 14 |
| 16 | モニタリングで見つけたずれを次の反復に回す（性能を測り、改善を繰り返す） | 正しい（趣旨） | building-effective-agents「The key to success, as with any LLM features, is measuring performance and iterating on implementations.」 | 15 |
| 17 | ミニクイズ（前提が崩れたら、プロンプトやモデルの変更ではなく設計を見直す） | 自作の問題 | 素材のミニクイズを短くしたもの。誤答の型（筋違いのモデル変更、症状への対処）は blueprint.md 7章 | 16 |

## 素材にない主張（この動画で足したもの）

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| A | 成功基準の4条件の画面上の説明：具体的＝何を目指すかをはっきり決める、測れる＝数字か明確な尺度で確かめる、達成できる＝実験や知見に基づく現実的な目標、目的に合う＝用途と使う人のニーズに合わせる | 正しい（要旨） | https://platform.claude.com/docs/en/test-and-evaluate/develop-tests （2026-11-16 に取得）「Specific: Clearly define what you want to achieve」「Measurable: Use quantitative metrics or well-defined qualitative scales」「Achievable: Base your targets on industry benchmarks, prior experiments, AI research, or expert knowledge」「Relevant: Align your criteria with your application's purpose and user needs」 |

## 素材から変えた点

- **本文の「Anthropic のエンジニアリング記事は…」は「Anthropic の記事は…」と短くした。** 同じ記事（Building effective agents）。
- **「性能を測って改善を繰り返すことが成功の鍵」の引用は、声では言っていない。** 長さの都合。ライフサイクルの「ずれを次の反復に回す」に趣旨を残した。
- **画面の項目の説明文**（コスト「その案を選んだときに、かかるもの」、リスク「その案で、起こりうること」、文書の4項目、書き分けの項目など）は、素材の本文を言い換えたもので、新しい事実は足していない。
- **ミニクイズは、素材の三択をそのまま使い、選択肢の文を短くした。** 番号（1番〜3番）は、画面の形に合わせて A〜C にした。

## 試験ガイドと現行ドキュメントの食い違い

- 素材と同じく、なし。台本では SLA を「サービスの水準についての取り決め」という一般的な意味でだけ使い、モデル提供側の可用性の保証（Service tiers、Priority Tier）には触れていない（素材の注記: Service tiers のページは 2026-11-16 時点で「legacy」）。

## 未確認のまま残っている主張

- なし。ただし、素材の「確認できなかった点」のとおり、タスクの具体的な進め方（聞く観点、文書に書く項目、反復と作り直しの見分け方）は試験ガイドに詳細がなく、公式の対策講座の学習目標と Anthropic のドキュメントの趣旨から組み立てたもの。講座本編（動画）の中身は確認していない。

## 参照した URL

- https://anthropic-partners.skilljar.com/stakeholder-engagement-lifecycle-gtm
- https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional
- https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- https://www.anthropic.com/engineering/building-effective-agents

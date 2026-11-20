# 事実確認：ep06-governance（ガバナンスとリスク管理）

確認日: 2026-11-16

台本の主張は、講座の本文 `CCAR-P/course/ch06.md` の「事実確認」の表（2026-11-16 に、公式の試験ガイドと公式ドキュメントで照合済み）から、該当する行を引いた。
表の番号（#）は、素材の表の番号と同じ。素材にない主張は台本に足していないので、この回で新たに一次情報を取得した行はない。

根拠は次の3種類。

- **試験ガイド**: CCAR-P 試験ガイド v1.0（日本語版・英語版。`CCAR-P/reference/CCAR-P_exam_guide_v1.0_ja.txt`、`_en.txt`）
- **公式の対策講座**: Partner Academy「Responsible AI, Safety & Risk for Architects」の学習目標（`CCAR-P/reference/blueprint.md` 4章 Domain 5 の (a)、出典 O7）。公式だが、試験ガイドではない
- **公式ドキュメント・公式ページ**: platform.claude.com、code.claude.com、anthropic.com、privacy.claude.com、claude.com の各ページ。URL は表と末尾の一覧

公開前に、末尾の URL を開いて、動画の内容と食い違いがないかを見直すこと。特に、FedRAMP の認可の状況（#16）は変わりやすい。

## 試験の範囲

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 1 | 現行の試験ガイド v1.0 では、分野5「ガバナンス、安全性、リスク管理」の配点は14%。タスクは、ガードレールと安全管理策、リスク・障害モード、ヒューマン・イン・ザ・ループによる検証、規制（GDPR、HIPAA、FedRAMP など）へのコンプライアンス、倫理的な AI（バイアス、公平性、透明性）の5つ（overview） | 正しい | 試験ガイド v1.0 日本語版・英語版 §6 分野5（`_ja.txt` 153行目以降、`_en.txt` 181行目以降）／ `reference/outline.md` |
| – | 試験ガイド v1.0 は現行版。2026-12-07 に試験内容が更新され、更新版のガイドは 2026-11-17 に公開予定（youtube.md の「この動画について」） | 正しい（2026-11-16 時点の予定） | `reference/outline.md`「試験の基本情報」の「今後の変更」。台本では「現行の試験ガイド、バージョン1.0 では」と添え、サムネイルと見出しには配点の数字を入れていない |

## リスクと障害モード

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 2 | リスクは、モデルの訓練で減らせるものと、アプリで強制すべきものに分ける。公式の対策講座が挙げる壊れ方は、与えていないルールを Claude が守ると思い込むこと（failures） | 正しい（公式の対策講座。試験ガイドではない） | 対策講座の学習目標（`blueprint.md` 4章 Domain 5 の (a)、出典 O7）。台本でも「公式の対策講座が挙げる」と出典を言っている |
| 3 | ハルシネーションは、事実と違う内容をもっともらしく作ること。引用させるなどで減らせるが、なくせない。重要な情報は必ず検証する（failures） | 正しい | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations 「Allow Claude to say "I don't know"」「Use direct quotes for factual grounding」、Note「they don't eliminate them entirely. Always validate critical information, especially for high-stakes decisions」 |
| 4 | プロンプトインジェクションでは、命令が文書やツールの結果に紛れることもある（failures） | 正しい | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks 「Jailbreaks and direct prompt injection, where the user … is the adversary」「Indirect prompt injection, where the user is trusted but Claude processes third-party content (webpages, emails, documents, tool results)」 |
| 5 | 注入の被害は、渡した権限の大きさで決まる（failures） | 正しい | 同上「Apply the principle of least privilege so that a successful injection can do minimal damage」／試験ガイド §8 サンプル問題1（最小権限） |

## ガードレール

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 6 | ガードレールはリクエストの経路に層で置く。置き場所は、入力のスクリーニング、ツール呼び出しの認可、出力のスクリーニングの3つ。モデルによるチェックと決定的なチェックを使い分け、閉じた状態で失敗（fail closed）させる（placement、checks、failclosed） | 正しい（公式の対策講座） | `blueprint.md` 4章 Domain 5 の (a)（出典 O7） |
| 7 | Haiku のような軽いモデルで、先に検査する方法を公式ドキュメントが示している。ツール呼び出しの結果も検査する（checks、placement の画面） | 正しい | mitigate-jailbreaks「Harmlessness screens: Use a lightweight model such as Claude Haiku 5.5 to pre-screen user input」「Screen tool outputs before Claude acts on them」 |
| 8 | 決定的なチェックは、許可リストや権限の判定のようなコードで書いた規則で、毎回同じ結果を出す。判断が要るものはモデルで評価する（checks） | 正しい | https://code.claude.com/docs/en/hooks-guide 「gives you deterministic control: certain actions always happen rather than relying on the LLM」「For decisions that require judgment rather than deterministic rules, you can also use prompt-based hooks …」（考え方の裏付け。台本では Claude Code の機能名は出していない） |
| 9 | 検査で問題がないと分かったときだけ先へ渡す。公式ドキュメントの例では、検査役のモデルが拒否したら、有害という判定として扱う（failclosed） | 正しい | mitigate-jailbreaks「treat a response with `stop_reason: "refusal"` as a harmful verdict」「only return the content as a `tool_result` block if the screen reports no injection attempt」 |

## 人の確認

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 10 | 人の確認は、確信度、取り消せるかどうか、誤ったときのコストで振り分け、適切な担当者や決裁者に回す（hitl） | 正しい（公式の対策講座） | `blueprint.md` 4章 Domain 5 の (a)（出典 O7）／ https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents 「humans should retain control … particularly before high-stakes decisions are made」 |
| 11 | すべてを人が見ると、確認が形だけになり、自動化の価値も消える（hitl の説明と見出しの下の補足） | 一般的な設計判断（一次情報の直接の記述はない） | 対策講座の「判断を確信度などで振り分ける」という学習目標からの説明。数値などの事実の主張は含めていない |
| 12 | 利用ポリシーは、医療、金融、雇用のように個人に大きく影響する高リスクの用途で、資格のある人が、本人に届く前に AI の提案を実質的に確認し、変える権限を持つことを求める。法律が認める範囲で、本人に完全に有利な結果には不要（aup。クイズの前提にも使用） | 正しい | https://www.anthropic.com/legal/aup High-risk Use Case Requirements「A qualified person must meaningfully review a High-risk AI Recommendation, with the authority to change or modify it」、例外「wholly favorable to the individual, such as paying an insurance claim」（対象分野に Medical、Finance、Employment、Housing ほか） |

## 規制

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 13 | 規制へのコンプライアンスは、方針の文書だけでは満たせない。義務の一つひとつを、名前の付いた管理策、責任者、監査で示せる証跡に対応づける（mapping） | 正しい（公式の対策講座） | `blueprint.md` 4章 Domain 5 の (a)（出典 O7）。法の条文には踏み込まない（`reference/outline.md` 6章の補足） |
| 14 | GDPR では、業務で使う顧客企業がデータの管理者、Anthropic は顧客の指示に従って処理する処理者。義務の責任者は顧客の側に残る（gdpr-hipaa） | 正しい | https://privacy.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller 「Anthropic acts as a "Processor" of the data on behalf of the customer」「the customer is the "Controller" of the data submitted by its Users」 |
| 15 | HIPAA では、健康情報を扱う前に BAA を結び、組織の設定を HIPAA に対応させ、対象の機能だけを使う。ベータの機能は原則として対象外（gdpr-hipaa） | 正しい | https://platform.claude.com/docs/en/manage-claude/api-and-data-retention HIPAA readiness「With a signed BAA and a HIPAA-enabled organization, you can use supported API features to process PHI」「Beta features: Features in beta are generally not covered under the BAA unless explicitly listed as eligible」 |
| 16 | 政府向けの FedRAMP は、提供ルートの選択。2026年11月時点で、Anthropic の直接の API は認可を受けていない。Claude for Government や、政府向けクラウドの Amazon Bedrock など、認可されたルートを選ぶ（routes） | 正しい（2026-11-16 時点） | https://claude.com/solutions/government 「Claude for Government is Anthropic's FedRAMP-High authorized product」「Claude via Amazon Bedrock in AWS GovCloud and Google Vertex with Assured Workloads are all FedRAMP-High」「Claude Enterprise and the Claude API from Anthropic are not FedRAMP authorized today」 |
| 17 | Anthropic の認証の報告書は、Trust Center で請求できる（routes） | 正しい | https://privacy.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained 「request copies … through the Trust Portal at https://trust.anthropic.com/」（台本では認証の名前は出していない） |
| 18 | データを保存しない Zero Data Retention という取り決めにも、対象外の機能がある。どの取り決めも、使う機能ごとに対象かを確かめる（routes） | 正しい | api-and-data-retention「Under a ZDR arrangement, Anthropic does not store customer prompts or responses at rest after the API response is returned」、What ZDR does not cover（Console、Files API、MCP connector など）。取り決めがあっても法律上の要請などで保持されることがある点（Retention regardless of arrangement）は、台本では触れていない |

## 倫理

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 19 | Anthropic の研究は、判断を求めるプロンプトの、人の属性の情報だけを入れ替えて、結果が変わるかを調べた（fairness） | 正しい | https://www.anthropic.com/research/evaluating-and-mitigating-discrimination-in-language-model-decisions 「systematically vary the demographic information in each prompt」 |
| 20 | 不公平な結果がどこで生じうるかを特定する。利用者、規制当局、自分たちのデバッグチームのそれぞれに必要な説明を決める（fairness、transparency） | 正しい（公式の対策講座） | `blueprint.md` 4章 Domain 5 の (a)（出典 O7） |
| 21 | 利用ポリシーは、高リスクの用途で AI を使ったことの本人への明示と、チャットボットでは AI であることの開示を求める（transparency） | 正しい | https://www.anthropic.com/legal/aup Disclosure「must be clearly told that AI was used to produce it」、「Consumer-facing chatbots and AI agents must tell users they are interacting with AI rather than a human」 |
| 22 | 開発チームには、エージェントの計画や手順が見えるようにする（transparency） | 正しい | https://www.anthropic.com/engineering/building-effective-agents 「Prioritize transparency by explicitly showing the agent's planning steps」／our-framework…「Humans need visibility into agents' problem-solving processes」 |

## ミニクイズ

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 23 | 正解は B（断る判断と確信度の低い判断を、変更の権限を持つ資格者が確認してから通知する）。A は確認が形だけになる。C はモデルが守ると思い込んでおり、ログは後から気づく仕組みで、誤りは防げない | 正しい | 正解の理由は #10・#12（支払いを認める判断は「本人に完全に有利な結果」の例外に当たる）。C の解説は、試験ガイド §8 サンプル問題1の解説の型（`blueprint.md` 7-1: ログを足すのは発見的な統制で、権限は減らない）。問題は素材のミニクイズを短くした自作の問題で、実際の試験問題ではない |

## 図解の整理（素材の文言そのままではないもの）

- 「入力 → ツール呼び出し → 出力」の3つの箱（placement）は、素材の3つの置き場所を、リクエストの経路の順に並べた図解。素材は「入力、出力、ツール呼び出しの認可」の順で挙げている。
- 「検査 → 失敗・判定なし → 通さない」（failclosed）と「義務 → 管理策 → 責任者 → 証跡」（mapping）、「場所を特定 → 属性を入れ替え → 結果を比べる」（fairness）は、素材の文を箱に分けた図解。

## 素材（course/ch06.md）から変えた点

- **動画用に文を短く切り、場面の順に並べ直した。** 節の順番と内容は素材のまま。
- **ハルシネーションの減らし方は「引用させるなど」にまとめた。**「分からないと答えてよいと伝える」は長さの都合で省いた（#3 の根拠には両方ある）。
- **プロンプトインジェクションは「文書やツールの結果に紛れることもある」とした。** 利用者が直接仕掛ける型は、声では省いた（長さの都合）。
- **「Haiku で先に検査する」は、ガードレールの置き場所の場面ではなく、モデルによるチェックの場面で言った。**
- **FedRAMP の前に「政府向けの」を付けた。** 音声エンジンが「フェ/ドランプ」と語の途中で区切るのを避けるため。FedRAMP が政府向けの認可であることは #16 の根拠のページの文脈どおりで、新しい事実の主張ではない。
- **「この確認はいりません」は「この確認は不要です」にした。** 音声エンジンが「は いりません」を「はいりません」と読むため。
- **ミニクイズの選択肢を短くした。** 素材の1番〜3番を A〜C とした。中身は同じ。
- 用語は、公式の日本語版ガイドの訳語にそろえた素材の言葉を使った（安全管理策、ヒューマン・イン・ザ・ループ、コンプライアンス など）。

## 試験ガイドと現行ドキュメントの食い違い

- 素材のとおり、直接の食い違いはない（試験ガイドの分野5はタスクの1行だけで、製品の仕様に踏み込んでいない）。
- FedRAMP の認可の状況は変わりやすいので、台本では「2026年11月時点で」と添えた。

## 未確認のまま残っている主張

なし。ただし、次の点は素材の確認の範囲に限りがある。

- Trust Center（https://trust.anthropic.com/）のページ本体は、スクリプトで描画されるため素材の作成時に本文を取得できていない。報告書を請求できることは privacy.claude.com のヘルプ記事で確認されている。
- 「全件を人が見る設計は確認が形だけになる」（#11）は、一次情報に同じ文面はない。設計判断の説明で、事実の主張（数値など）は入れていない。

## 参照した URL

- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
- https://code.claude.com/docs/en/hooks-guide
- https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents
- https://www.anthropic.com/legal/aup
- https://privacy.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller
- https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
- https://claude.com/solutions/government
- https://privacy.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained
- https://www.anthropic.com/research/evaluating-and-mitigating-discrimination-in-language-model-decisions
- https://www.anthropic.com/engineering/building-effective-agents

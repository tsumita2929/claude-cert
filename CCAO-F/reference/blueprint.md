# CCAO-F（Claude Certified Associate – Foundations）出題範囲メモ

> **追記（2026-11-18）:** 更新版の試験ガイドは 2026-11-17 に公開された。このフォルダに、`CCAO-F_exam_guide_v1.1-2026-11_*`（現行の版。申し込み・本人確認・サポートの章だけが変わり、分野・配点・問題数は v1.0 と同じ）と、`CCAO-F_exam_guide_v1.1-2026-12-07_*`（12/7 発効の版。70問になり、分野の配点とスキルが再編された）を保存した。差分のまとめは `shared/program.md` の冒頭の追記にある。**このメモと教材は、改訂前のガイドに基づいたまま**（2026-11-18 時点の方針）。以下の「公開予定」「不明」という記述は、2026-11-16 時点のもの。

- 作成: 2026-11-16（調査日。下の出典もすべてこの日に確認）
- 目的: 非公式の日本語教材（練習問題 約100問、音声講座 約50分、スライド、解説動画）の土台にする「試験の設計図」
- 表記: **［公式］** は Anthropic 公式の文書・ページ（Pearson VUE の Anthropic 用ページを含む）を直接読んで確認した事実。**［第三者］** は対策サイトや報道の情報。「［第三者が公式ガイドの内容として引用］」は今回は不要だった（公式ガイドを直接読めたため）。
- 出典記号（O1、T1 など）は「9. 出典一覧」に対応する。

---

## ⚠ 最初に読むこと：2026-12-07 に出題内容が更新される

- **［公式・O10］** Pearson VUE の Anthropic ページの告知（原文の要旨）: Associate – Foundations、Developer – Foundations、Architect – Professional の3試験は **2026-12-07 から更新後の内容で出題**される。**更新版の試験ガイドは 2026-11-17 に公開**。12-07 以降に受ける人は更新版で準備すること。
- 今日（11-16）の時点で Partner Academy に置かれているのは、まだ **v1.0（2026年7月発効）**だけ（O1・O2。Partner Academy のページに埋め込まれたリンク先も v1.0 の PDF）。
- **このメモは v1.0 にもとづく。** 11-17 以降に更新版ガイドを入手し、ドメイン名、配点、タスクステートメントの差分を確かめてから問題を確定すること。更新版の中身はまだ誰も公開しておらず、**不明**（T4〔studytech〕も「変更点はまだ公表されていない」と明記）。
- 試験ガイドには「内容が大きく変わったときは、無料の更新アセスメントではなく再受験を求めることがある」とも書かれている（O1 §14）。

---

## 1. 基本情報

| 項目 | 内容 | 根拠 |
|---|---|---|
| 正式名称 | **Claude Certified Associate – Foundations** | ［公式］O1 表紙・§5、O4、O10 |
| 試験コード | **CCAO-F**（Pearson VUE 上の表記は「Claude Certified Associate - Foundations (CCAO-F)」） | ［公式］O1 §5、O10 |
| 別の呼び方 | 「**CCA-A**」は第三者サイトの略称で、公式ではない（T1 は「CCA-A (CCAO-F)」と併記）。Learning Tree の講座名は「CCA-F」としており、Architect – Foundations の俗称（CCA-F）とぶつかる。公式 FAQ は料金の説明で「Claude Certified Associate ($99)」と Foundations を省いて書くこともある | ［第三者］T1、検索結果（Learning Tree）／［公式］O3 |
| 位置づけ・レベル | Foundations（入門レベル）。Associate、Developer、Architect の3つの役割のうち、Associate ロールの資格 | ［公式］O4、O11 |
| 対象者（公式ガイド） | Claude を生産性ツールとして使い、日常業務で **Claude Projects を作る**実務者。職種はオペレーション、マーケティング、プロジェクト管理、教育、コミュニケーション、一般のナレッジワーク。社内で AI ワークフローを保守・最適化する人と、導入、ユースケースの特定、プロセスの再設計を支援する**社外コンサルタント**の両方を含む | ［公式］O1 §1・§3 |
| 対象者（Partner Academy の説明） | 「顧客を適切な Claude のユースケースに導き、案件を成功に向けて立ち上げる**コンサルタント、営業、デリバリーリード**」向け | ［公式］O4 |
| 対象者（発表記事） | 「Claude 関連のプロジェクトに関わる人の、実践的な日常利用」を認定する。コンサルタント、プロジェクトリードなど、ビジネス系と技術系の両方を含む | ［公式］O11 |
| 想定する技術レベル | 技術の専門知識は「限定的〜中程度」。「気軽にプロンプトを使うユーザー」と「技術的な AI 実務者」の中間 | ［公式］O1 §3 |
| 対象外の人 | API を使って開発する開発者、エージェントシステムの設計者、機械学習・ソフトウェア工学・高度な AI システム設計の専門家。エンタープライズ規模の AI アーキテクチャや統合の設計は求めない（それは Architect と Developer の範囲で、Associate はそちらへ**エスカレーションする**側） | ［公式］O1 §3 |
| 推奨経験（必須ではない） | ① 業務での Claude の日常的な実使用 ② 構造化された問題解決、ワークフロー設計、デジタルツール活用の基礎理解 ③ ビジネスアナリスト、PM、オペレーションリード、マーケティング／広報／人事／教育の実務者、コンサルタント、ナレッジワーカーなどの職務経験 ④ ハルシネーション、コンテキストの制約、データの機密性など、AI の限界の実践的な理解 | ［公式］O1 §4 |
| 前提条件（学習面） | 必須の前提条件も必修コースもない。ソフトウェア開発や API の経験も不要。合否は試験の成績だけで決まる | ［公式］O1 §4 |
| **受験資格（重要）** | **Claude Partner Network に加盟している組織の人だけ**が受けられる。登録には、パートナー記録に登録された会社ドメインのメールアドレスが必要（個人のアドレスは不可）。顧客企業の社員や非パートナーは受けられない。18歳以上。Anthropic が対応している国・地域でのみ受験可 | ［公式］O3「Eligibility and access」、O5 |
| パートナーランクへの算入 | **Associate はパートナーランクの算定に数えられない**（Developer – Foundations、Architect の2試験は数えられる） | ［公式］O3、O4 |
| 受験方法 | Pearson VUE による監督付き試験。オンライン（OnVUE）またはテストセンター | ［公式］O1 §5・§10、O3 |
| 申し込みの流れ（現行） | 2026-11-12 から、Partner Academy にサインイン → Register → **SSO で Pearson へ移り、Pearson の決済画面で支払う** → 日程を予約。v1.0 ガイド §10 の「Partner Academy で決済したあと Pearson VUE アカウントを作る」という手順は古い | ［公式］O3「Moving to single sign-on」 |
| 料金 | **99 USD**（パートナー割引の前の価格。4資格で最も安い）。Registered ランクは定価。Select、Preferred、Global Premier は50%引き。Global Premier は 2026-12-31 まで100%引き。再受験も毎回定価がかかる（割引は適用される） | ［公式］O1 §5、O3、O4 |
| 言語 | **英語と日本語**（試験も対策コンテンツも）。予約済みの英語版を日本語版に変えることもできる（キャンセルして取り直す）。日本語版の試験ガイドがある（O2、v1.0）。ブラウザの翻訳機能は使えない。英語が第二言語の人は Pearson に時間延長を申請できる | ［公式］O3、O2、O10（言語選択に Japanese） |
| 有効期間 | 取得日から **12か月** | ［公式］O1 §5・§14、O3 |
| 更新 | 期限内なら、取得後の変更点を確認し、Partner Academy で**無料・監督なしの評価**を受ける。失効すると定価で本試験を受け直す。内容が大きく変わったときは、更新評価ではなく再受験を求めることがある | ［公式］O1 §14、O3 |
| 開始時期 | 試験ガイド v1.0 の発効は「**2026年7月**」。公式の発表記事は **2026-07-23** 付で、3つの新資格（Associate: Foundations、Developer: Foundations、Architect: Professional）のひとつとして紹介。開始日を正確に書いた公式文書は見つからず、**不明**。第三者は「2026-07-08 に発表（Reddit の告知）」「7月13日に開始」などと書いている | ［公式］O1、O11／［第三者］T10（claudelog）、検索結果の抜粋 |
| CCAR-P・CCDV-F と同時の追加か | 正しい。7月の拡充で Associate – Foundations、Developer – Foundations、Architect – Professional の3つが加わり、全部で4資格になった。Architect – Foundations（3月開始）はそのまま残る | ［公式］O11／［第三者］T12（IT Brief） |
| 再受験 | 待機期間は、1回目の不合格後14日、2回目の後30日、3回目の後90日。同じ試験は連続する12か月で4回まで | ［公式］O1 §11、O3、O10 |
| 受験規則 | クローズドブック。メモ、資料、翻訳ツール、AI アシスタントは不可。受験前に秘密保持契約（NDA）に同意する。問題、選択肢、シナリオの開示や複製は禁止。試験ポリシーは試験中に AI 製品を使うことも明示的に禁じている | ［公式］O1 §12・§13、O3、O9 |
| 合格後 | Credly のデジタルバッジ（PDF の証明書も出せる） | ［公式］O3 |

---

## 2. 形式

| 項目 | 内容 | 根拠 |
|---|---|---|
| 問題数 | **60問**（ガイドの表記は「Number of items 60」） | ［公式］O1 §5 |
| 採点対象と非採点の内訳 | **公式ガイドに記載なし。不明。** ガイドは「パーセンテージは、採点対象の問題（scored items）のうち各分野から出る割合」と書くだけで、非採点問題（事前テスト用の問題）があるかどうかは書いていない。T1 は「60 scored questions」と書くが、それはサイト側の解釈 | ［公式］O1 §6／［第三者］T1 |
| 時間 | **120分**。受付、説明、終了後の簡単なアンケートを含めると、着席時間は約135分を見込む | ［公式］O1 §5、O3 |
| 問題の種類 | **択一（multiple-choice）と複数選択（multiple-response）**。各問題に、選ぶ数が書かれている。FAQ は全試験について「択一と、**シナリオ形式の複数選択**」と説明している | ［公式］O1 §5、O3 |
| スコア | **100〜1,000 のスケールスコア、720 で合格**（4資格共通）。スケールスコアは、難易度の少し違う複数の問題セット（フォーム）の間でスコアをそろえるためのもの | ［公式］O1 §5・§9、O3 |
| 合格基準の決め方 | 基準準拠型（他の受験者との比較ではない）。訓練を受けた専門家（SME）が「最低限の能力を備えた受験者（MQC）」の水準を判定する基準設定調査で決めた | ［公式］O1 §9 |
| 結果の通知 | 試験の終了直後に画面に出る。合否とスケールスコアに加え、**分野ごとの正答率**が出る。分野別の正答率は参考情報で、合否は総合のスケールスコアだけで決まる | ［公式］O1 §9、O3 |
| 正答率とスコアの換算 | 公表されていない（「720 = 72%正解」ではない、と第三者も注意している） | ［第三者］T6（trainingcamp）。公式の換算表は見当たらず、**不明** |
| 推測へのペナルティ | **公式ガイドにも FAQ にも記載がない。不明。** | — |
| 公式の模擬試験 | **ない**。前のプラットフォームにあった模擬試験は、Pearson への移行で廃止された。試験ガイドの**サンプル問題3問**が出題形式の見本になる | ［公式］O3「Exam content and prep」、O1 §8 |
| 分野ごとの出題数の目安 | 配点×60 を計算すると、D1 約8.4、D2 約12.6、D3 約7.2、D4 約9.6、D5 約7.2、D6 約9.0、D7 約6.0。第三者は 8／13／7／10／7／9／6（合計60）に丸めている。**公式の問題数ではない** | 計算／［第三者］T1 |

---

## 3. ドメインと配点（v1.0）

**［公式・O1 §6］** 試験ブループリントの表。順番も公式のとおり。日本語名は公式の日本語版ガイド（O2）の訳語。

| # | 英語の正式名（O1） | 公式の日本語名（O2） | 配点 |
|---|---|---|---|
| 1 | **Prompting and Task Execution** | プロンプト作成とタスク実行 | **14%** |
| 2 | **Output Evaluation and Validation** | 出力の評価と検証 | **21%** |
| 3 | **Product and Model Selection** | 製品とモデルの選択 | **12%** |
| 4 | **Workflow Integration and Solution Design** | ワークフロー統合とソリューション設計 | **16%** |
| 5 | **Configuration and Knowledge Management** | 設定とナレッジ管理 | **12%** |
| 6 | **Governance, Risk, and Responsible Use** | ガバナンス、リスク、責任ある利用 | **15%** |
| 7 | **Troubleshooting and Optimization** | トラブルシューティングと最適化 | **10%** |
| | Total | 合計 | **100%**（14+21+12+16+12+15+10 = 100 を確認） |

- 配点は、職務タスク分析で決めた、各分野の相対的な重要度を表す。数字は**おおよその**割合（O1 §6）。
- 公式の日本語版は domain を「**分野**」と訳している（例:「分野1：プロンプト作成とタスク実行（14%）」）。教材の用語は、この公式の訳語にそろえるのがよい。
- 第三者の表記ゆれ: 「&」と「and」（T1、T3 など）、「Optimisation」（英国式のつづり。T9）、「Output Evaluation & Quality」（T3 の小テストの選択肢）。いずれも公式名ではない。
- 聞きかじり情報との照合: Output Evaluation 21%、Workflow Integration 16%、Governance & Risk 15%、プロンプト関連 14% は、すべて公式の数字と一致する。残りの3つは Product and Model Selection 12%、Configuration and Knowledge Management 12%、Troubleshooting and Optimization 10%。

---

## 4. 各ドメインのタスクステートメント

### 4.0 前提（重要）

- **［公式・O1 §6］** ガイドの見出しは「Detailed objectives by domain」。「各分野には、受験者がこなせることを期待されるタスクを挙げる。試験問題はこれらの目標に対して書かれる」と説明がある。FAQ（O3）もこれを「task statements」と呼び、「出題範囲を決める正式な資料」としている。
- **v1.0 のガイドには、タスクステートメントの番号がない**（箇条書きだけ）。下の「1.1」などの番号は、**このメモが箇条書きの順に振った仮の番号**で、公式のものではない。教材で「公式の番号」として見せないこと。
- **v1.0 のガイドには、タスクステートメントの下に付く「知識・スキル（Knowledge of / Skills in）」の細目がない。** ガイドにあるのはタスクステートメントの文だけ。ほかに使える公式の資料は、**Partner Academy の公式対策講座（8モジュール）の学習目標と講座説明**（O6）。これを「［公式・講座］」として下に併記した。さらに細かい論点は第三者の独自の整理しかないので「［第三者］」と明記して分けた。第三者の細目は試験範囲の根拠にならない。
- 下の各項目には、公式の英語原文（O1）、公式の日本語訳（O2）、補足の順に書く。

---

### 分野1　Prompting and Task Execution／プロンプト作成とタスク実行（14%）

**タスクステートメント［公式・O1/O2］**

| 仮番号 | 英語原文（O1） | 公式日本語訳（O2） |
|---|---|---|
| 1.1 | Create effective prompts for business and technical tasks | ビジネスタスクおよび技術タスクのための効果的なプロンプトを作成する |
| 1.2 | Apply task decomposition techniques to structure complex requests | タスク分解の手法を適用して、複雑な依頼を構造化する |
| 1.3 | Iterate prompts to improve output quality | プロンプトを反復的に改良して出力の品質を高める |
| 1.4 | Adapt prompting strategies based on task type (analysis, research, drafting, brainstorming) | タスクの種類（分析、調査、下書き、ブレインストーミング）に応じてプロンプト作成の戦略を調整する |

**［公式・講座］モジュール「Prompting & Task Execution」（53分）の要旨**
- プロンプト作成を「学べる構造を持つ、コミュニケーションの技術」として扱う。例: 「第3四半期の結果について何か書いて」では一般的な段落しか出てこない。**対象読者、重要な結果3つ、形式、長さ**を指定すれば、そのまま共有できる下書きになる。
- 学習目標: **繰り返し使える部品の構造（repeatable component structure）**でプロンプトを作る／複数の部分からなる複雑な依頼を分解する／**診断しながら**反復改良する（iterate diagnostically）／タスクの種類（分析、調査、下書き、ブレインストーミング）に合わせて戦略を変える。
- AI Fluency Framework の4つの能力のうち「**Description**（記述）」がこのモジュールの柱だと明記されている。

**［第三者］の細目（参考。公式の根拠なし）**
- 役割、文脈、目標、制約、形式を指定する構成。XML タグによる区切り。few-shot（例示）。会話の中での軌道修正（T3〔open-exam-prep〕）。※ XML タグや few-shot は開発者向けの色が強く、Associate に出るかどうかは不明。
- 「1つのテンプレートをすべてのタスクに使い回さない。ブレインストーミングなら発想を広げる指示にする」という場面（T1 の PDF の D1 の例）。

---

### 分野2　Output Evaluation and Validation／出力の評価と検証（21%）※最大の分野

**タスクステートメント［公式・O1/O2］**

| 仮番号 | 英語原文（O1） | 公式日本語訳（O2） |
|---|---|---|
| 2.1 | Evaluate Claude-generated outputs for accuracy and completeness | Claudeが生成した出力の正確性と網羅性を評価する |
| 2.2 | Identify hallucinations, inconsistencies, and biases in responses | 応答に含まれるハルシネーション、不整合、バイアスを特定する |
| 2.3 | Apply fact-checking and validation techniques | ファクトチェックと検証の手法を適用する |
| 2.4 | Determine when human review or additional verification is required | 人間によるレビューや追加の検証が必要な場面を判断する |
| 2.5 | Edit, adapt, refine, and compare outputs for the intended audience | 想定する対象者に合わせて出力を編集、調整、改良、比較する |
| 2.6 | Organize and curate information and select appropriate output formats (artifacts, inline, structured data) | 情報を整理、選別し、適切な出力形式（アーティファクト、インライン、構造化データ）を選択する |

**［公式・講座］モジュール「Evaluating & Validating Claude's Output」（74分。いちばん長いモジュール）の要旨**
- 「自分の名前で出す成果物に責任を持てるようにする」ための講座。出力を**情報源と基準に照らして**批判的に評価する／ハルシネーションや不整合といったよくある失敗の型を見分ける／必要な**品質の基準を満たしているか**を判断する／使われる文脈に合わせて出力を手直しする。
- 学習目標はタスクステートメント 2.1〜2.5 とほぼ同じ文。2.6 は講座では「適切な出力形式を選び、情報を整理する」となっている。

**［公式・サンプル問題1］（O1 §8）** は、この分野の典型。→ 7章を参照。

**［第三者］の細目（参考）**
- 正確性、網羅性、関連性の確認。存在しない引用や URL、数字の捏造の発見。計算や論理の一貫性の確認。提供された資料の範囲を超えていないかの確認。トーンやバイアスの確認。人間によるレビューに回す基準（T3）。
- 「流ちょうで自信のある文章は、正確さの証拠にならない」「正確性と網羅性は別々に確かめる」（T1）。
- 「表面的な体裁を整えても、主張の検証にはならない」（T1、T7〔Tutorials Dojo〕）。

---

### 分野3　Product and Model Selection／製品とモデルの選択（12%）

**タスクステートメント［公式・O1/O2］**

| 仮番号 | 英語原文（O1） | 公式日本語訳（O2） |
|---|---|---|
| 3.1 | Select appropriate Claude product features (Projects, research mode, chat, artifacts) | Claudeの適切な製品機能（プロジェクト、リサーチ、チャット、アーティファクト）を選択する |
| 3.2 | Differentiate between Claude model types (Haiku, Sonnet, Opus) | Claudeのモデルの種類（Haiku、Sonnet、Opus）を区別する |
| 3.3 | Align model selection with task requirements (cost, speed, quality) | モデルの選択をタスクの要件（コスト、速度、品質）に合わせる |
| 3.4 | Understand and manage context limitations and memory considerations (when to restart, summarize, or persist) | コンテキストの制限とメモリに関する考慮事項（やり直す、要約する、保持するタイミング）を理解し、管理する |

- 公式の日本語版は「research mode」を「**リサーチ**」と訳している。

**［公式・講座］モジュール「Claude Platform & Model Foundations」（59分）の要旨**
- プロンプトを書く前に決める**4つの判断**（①どの**入口（entry point）**を使うか ②どの**機能（capability features）**を有効にするか ③どの**モデル**を選ぶか ④セッション全体で**コンテキスト**をどう管理するか）が、出力の品質の上限を決める、という枠組み。
- 学習目標: 仕事に合った入口と機能の組み合わせを選ぶ／Haiku、Sonnet、Opus を能力の特徴と向いているタスクで区別する／品質、速度、**量（volume）**のトレードオフを踏まえてモデルを選ぶ／コンテキストの制限を管理し、**メモリ機能**でセッションをまたいで継続性を保つ。
- 「entry point」が何を指すか（Web、デスクトップ、モバイル、Cowork、Chrome 拡張など）は、講座の概要だけでは**不明**。

**［公式・サンプル問題2］（O1 §8）** は 3.3 の典型。→ 7章。

**［第三者］の細目（参考）**
- Free、Pro、Team、Enterprise の違い（席の管理、管理コンソール、SSO、データ保持の設定など）。特定のモデルの版番号（T3）。→ **公式ガイドはプラン名も版番号も挙げていない**。T3 の記述は独自の拡張。
- 「Research は有料プランの機能」を正解の根拠にする練習問題（T1 の PDF の D3 の例）。→ プランごとの提供状況は**公式ガイドの範囲として確認できない**。仕様は変わりやすいので、問題の正解の根拠にするのは避けたい。
- 「Projects、Research、チャット、Artifacts は互いに排他的ではない（Project の中で Research を使って Artifact を作れる）」という論点（T1 の PDF、10分レビュー）。

---

### 分野4　Workflow Integration and Solution Design／ワークフロー統合とソリューション設計（16%）

**タスクステートメント［公式・O1/O2］**

| 仮番号 | 英語原文（O1） | 公式日本語訳（O2） |
|---|---|---|
| 4.1 | Apply Claude to analyze requirements and use cases | 要件とユースケースの分析にClaudeを適用する |
| 4.2 | Leverage Claude for research, planning, and process optimization | 調査、計画、プロセスの最適化にClaudeを活用する |
| 4.3 | Use Claude to support solution design, development, and iteration | ソリューションの設計、開発、反復的な改善を支援するためにClaudeを使用する |
| 4.4 | Integrate Claude into existing workflows to augment or redesign them | 既存のワークフローにClaudeを統合し、ワークフローを強化または再設計する |
| 4.5 | Communicate Claude's value and limitations to stakeholders | Claudeの価値と限界をステークホルダーに伝える |

**［公式・講座］モジュール「Workflow Integration & Solution Design」（63分。製品タグは Claude Enterprise と **Claude Cowork**）の要旨**
- 「私は Claude を使っている」から「私たちのワークフローが Claude を使っている」へ移る。繰り返しのプロセスに Claude を組み込む価値は、意図して切り替えたときにだけ積み上がる。**間違った手順を自動化すると逆効果**になる。
- AI Fluency Framework の「**Delegation**（委任）」が柱。手順ごとに、AI に任せる／人が担う／協働する、を決める。
- 学習目標はタスクステートメント 4.1〜4.5 と同じ（4.5 は講座では「accurately（正確に）」が付く）。

**［第三者］の細目（参考）**
- 業務を「自動化」「補助（augment）」「人だけ」に分ける。前の出力を次の入力にする多段のプロンプト。標準手順書とプロンプト集。経営層への期待値の調整（T3）。
- 「いきなり全面的に再設計せず、1つの手順を補助する小さな検証済みのパイロットから始める」という場面（T1 の PDF の D4 の例。T1 は根拠を「Anthropic の展開ガイダンス」としているが、出典は示されておらず未確認）。

---

### 分野5　Configuration and Knowledge Management／設定とナレッジ管理（12%）

**タスクステートメント［公式・O1/O2］**

| 仮番号 | 英語原文（O1） | 公式日本語訳（O2） |
|---|---|---|
| 5.1 | Configure Claude Projects with instructions and knowledge sources | 指示とナレッジソースを使ってClaudeのプロジェクトを設定する |
| 5.2 | Manage uploaded knowledge and connectors (e.g., Google Drive, Gmail) | アップロードしたナレッジとコネクタ（Google Drive、Gmailなど）を管理する |
| 5.3 | Create effective system-level instructions | 効果的なシステムレベルの指示を作成する |
| 5.4 | Inform, maintain, and update Claude configurations, knowledge sources, and instructions | Claudeの設定、ナレッジソース、指示に情報を反映し、維持、更新する |

**［公式・講座］モジュール「Configuration & Knowledge Management」（47分）の要旨**
- 「良いプロンプトは一度だけ役に立つ。良い設定は毎回役に立つ」。会話より前に行う準備（Project、指示、ナレッジソース）で、Claude が最初から必要な文脈を持った状態にする。この準備が、**1人のスキルをチームに広げる**手段にもなる。設定が知らないうちに古くならないよう、**保守の周期**も扱う。
- 学習目標の 5.3 は、講座では「**project-level** instructions（プロジェクト単位の指示）」と書かれている（ガイドは「system-level」）。教材では「Project の指示（カスタム指示）」として扱えばよいと考えられる（解釈）。

**［第三者］の細目（参考）**
- 同じ Project の中でもチャット同士は履歴を共有しない。再利用したい内容は**プロジェクトナレッジ**に要約して保存する（T1 の PDF の D5 の例）。
- ナレッジ同士の矛盾や古いデータを避ける。コンテキストの希釈（T3）。
- 「Gmail コネクタは単独でメールを送れるか」「Calendar コネクタで何を削除できるか」といった、コネクタの権限の論点（T1 の PDF の10分レビュー）。→ 製品仕様の暗記になりやすい。仕様は変わるので注意。

---

### 分野6　Governance, Risk, and Responsible Use／ガバナンス、リスク、責任ある利用（15%）

**タスクステートメント［公式・O1/O2］**

| 仮番号 | 英語原文（O1） | 公式日本語訳（O2） |
|---|---|---|
| 6.1 | Identify appropriate and inappropriate use cases | 適切なユースケースと不適切なユースケースを特定する |
| 6.2 | Apply data sensitivity, regulatory, and privacy considerations | データの機密性、規制、プライバシーに関する考慮事項を適用する |
| 6.3 | Follow organizational AI policies and governance standards | 組織のAIポリシーとガバナンス基準に従う |
| 6.4 | Understand the ethical implications of AI usage | AI利用の倫理的な影響を理解する |

**［公式・講座］モジュール「Governance, Risk & Responsible Use」（55分）の要旨**
- ガバナンスは、何か起きてから考えがち。例: **ファイルを上げてはいけない場所に上げた**、**アクセス範囲の広すぎる Skill**。どちらもチーム全体の Claude 利用が止まる原因になる。
- 防ぐのは学べる判断力: **何なら扱ってよいか**、**自社のデータと業界の規制が何を許すか**、**組織にどんなルールがあるか**。
- 学習目標はタスクステートメント 6.1〜6.4 と同じ（6.2 は「Claude の利用に適用する」と具体化されている）。

**［公式・サンプル問題3］（O1 §8）** は 6.2 と 6.3 の典型。→ 7章。

**［第三者］の細目（参考）**
- 個人情報（PII）や医療情報（PHI）の識別と削除、GDPR・HIPAA・SOC 2、知的財産と著作権、プロンプトインジェクション（直接・間接）、利用規程（T3）。T2 の学習項目には「GDPR/HIPAA/FedRAMP」がある。→ **公式ガイドは特定の法規制の名前を挙げていない**。プロンプトインジェクションも公式ガイドには出てこない。
- 「AI ベンダーの安全方針」と「自社のデータ取り扱いのルール」は別の層。ベンダーの方針は自社のコンプライアンスを代わりに満たさない（T1 の PDF の D6 の例）。
- 「Claude が出力できる」ことは、そのユースケースが適切だという意味ではない（T1 の PDF の10分レビュー）。
- 「組織のルールも製品の機能も、権限のないデータを使ってよい理由にはならない」（T5〔aguidetocloud〕）。

---

### 分野7　Troubleshooting and Optimization／トラブルシューティングと最適化（10%）

**タスクステートメント［公式・O1/O2］**

| 仮番号 | 英語原文（O1） | 公式日本語訳（O2） |
|---|---|---|
| 7.1 | Identify, diagnose, and resolve issues with underperforming prompts or poor outputs | 期待どおりに機能しないプロンプトや質の低い出力の問題を特定、診断、解決する |
| 7.2 | Adjust approach based on feedback and results | フィードバックと結果に基づいてアプローチを調整する |
| 7.3 | Optimize workflows for efficiency and effectiveness | 効率と効果を高めるためにワークフローを最適化する |

**［公式・講座］モジュール「Troubleshooting & Optimization」（30分）の要旨**（ここは学習目標が具体的で、問題作成に役立つ）
- 出力が期待外れのとき、多くの人は「Claude にはできない」とあきらめるか、手当たり次第に変える。そのどちらでもなく、よくある失敗の型を見分け、**一度きりの修正を恒久的な修正に格上げする**。
- 学習目標:
  - 不調の原因を**根本原因**までたどる。挙げられている根本原因は4つ。**① 指示の不足（under-specification）② コンテキストの詰め込みすぎ（context overload）③ 機能やモデルの選び間違い（wrong feature or model）④ 設定が古い（stale configuration）**。
  - 得られた出力をもとにやり方を変え、**繰り返し出てくる手直しを、持続する修正に変える**（同じ手作業を繰り返さない）。
  - 共通の文脈、形式、検証の手順を **Projects、Skills、常設の指示（standing instructions）**へ移して、ワークフローを効率化する。

**［第三者］の細目（参考）**
- 「同じプロンプトを何度も実行して、いちばん良いものを選ぶ」のは修正ではない。欠けている要件を特定し、その指示を変えて比べる（T1 の PDF の D7 の例）。
- 内容は正しいのに形式が毎回変わる → 形式を明示するか例を示す。上位モデルへの変更や「一貫させて」という曖昧な指示は誤答（T7〔Tutorials Dojo〕のサンプル）。
- 長い会話でずれてきたら、分岐する、要約する、新しいセッションで始め直す（T3）。

---

## 5. シナリオ（業務の場面の例）

- **［公式］v1.0 の CCAO-F 試験ガイドには、「シナリオ」の一覧の章がない。** Architect – Foundations のガイドにあるような「6つのシナリオから4つが出る」といった仕組みは、CCAO-F のガイドには書かれていない（O1 を全文確認）。シナリオ形式で出るかどうかは、FAQ の「シナリオ形式の複数選択」（O3）とサンプル問題の作りから分かる程度。
- **［公式］ガイドが挙げる職種や場面（問題の登場人物に使える）**
  - 職種: オペレーション、マーケティング、プロジェクト管理、教育、コミュニケーション、一般のナレッジワーク（§1・§3）。ビジネスアナリスト、PM、オペレーションリード、マーケティング／広報／人事／教育の実務者、コンサルタント、ナレッジワーカー（§4）。
  - 立場: AI を使ったワークフローを保守・最適化する**社内スタッフ**／導入、ユースケースの特定、プロセスの再設計を支援する**社外コンサルタント**（§3）。
  - 求められる行動: 業務の目標を AI とのやり取りに落とし込む、ツールと機能を選ぶ、構造化されたプロンプトを作る、AI の出力を批判的に評価する、対象者に合わせて出力を調整する、人の専門知識・検証・エスカレーションが必要な場面を見分ける（§3）。一問一答を超えて、**プロセスの再構想、タスクの自動化、プロジェクトの開発**まで進む（§4 MQC）。
  - サンプル問題の場面（O1 §8）: ①アソシエイトが新しい規制の要約を作り、コンプライアンスチームに送る前 ②アソシエイトが短い顧客返信の下書きを大量に作る ③PM が顧客の個人情報を含む表を分析させたい。
- **［公式・講座］の場面**: 「繰り返しの業務、チームの成果物、上層部の厳しいレビューが必要な成果物」（O6 の講座説明）。
- **［第三者］T1（claudearchitectcertification.com）の独自シナリオ5本**（公式ではない）: Client Deliverable Drafting and Validation（顧客向け成果物の作成と検証）／Choosing the Right Claude Product and Model（製品とモデルの選択）／Embedding Claude in a Delivery Workflow（デリバリーのワークフローへの組み込み）／Responsible Use and Governance Decision（責任ある利用とガバナンスの判断）／Troubleshooting a Weak Claude Output（弱い出力の立て直し）。いずれもコードを使わない業務の流れ（素材 → 検証 → 承認の記録）として書かれている。
- **［第三者］T1 の PDF にある分野別の場面（要旨）**: D1 コンサルタントが1つのテンプレートを使い回し、製品名のブレインストーミングにも使う／D2 レビュー担当が流ちょうなレポートの冒頭だけ読んで承認する／D3 無料プランの利用者が Research の使い方を尋ねる／D4 パイロットなしで受付業務の再設計に進もうとする部署／D5 Project 内で長く議論した内容を、新しいチャットでも Claude が知っていると思い込む／D6 ベンダーの安全方針を理由に人事記録を貼り付けていたスタッフ／D7 毎週の要約プロンプトを変えずに3回実行し、いちばん良いものを選ぶ担当者。
- **［第三者］T7（Tutorials Dojo）のサンプルの場面**: 請求書の項目を抜き出す処理で、出力形式が毎回変わる／人材育成の担当者が、管理職が編集・再利用できる社員ハンドブックを作る（出力形式の選択）。

---

## 6. 範囲内と範囲外

### 6.1 公式ガイド（v1.0）が名前を挙げている製品・機能［公式・O1］

| 機能・概念 | ガイドのどこに出るか |
|---|---|
| **Projects**（Claude Projects） | §3 対象者（「Claude Projects を作る」）、§4 MQC、分野3（3.1）、分野5（5.1）、§7 準備方法 |
| **Artifacts** | §4 MQC、分野2（2.6 出力形式）、分野3（3.1）、§7 |
| **research mode**（日本語版は「リサーチ」） | 分野3（3.1） |
| **chat** | 分野3（3.1） |
| **Haiku、Sonnet、Opus**（モデルの種類） | 分野3（3.2） |
| **コンテキストの制限とメモリ**（やり直す、要約する、保持する） | 分野3（3.4） |
| **Memory** | §7（公式ドキュメントで確認すべき機能として） |
| **Skills** | §7 |
| **Code Execution** | §7 |
| **コネクタ**（例: **Google Drive、Gmail**） | 分野5（5.2） |
| システムレベルの指示、ナレッジソース、アップロードしたナレッジ | 分野5 |
| 出力形式: **アーティファクト、インライン、構造化データ** | 分野2（2.6） |
| 「workflow-based interactions」、タスクのオーケストレーション | §4 MQC |
| 品質、効率、コストのバランス／限界の認識とエスカレーション | §1、§2 |

### 6.2 公式ガイドが名前を挙げて**いない**もの（v1.0 で範囲かどうかは不明）

- **Cowork、Claude in Chrome、Claude in Excel、Claude in Slack、Claude for Microsoft 365／Google Workspace、デスクトップアプリ、モバイルアプリ、claude.ai という名前**: いずれもガイドの本文に**出てこない**。
  - ただし公式の学習教材には出てくる［公式・O6/O7］。Partner Academy の「Claude Associate」学習パスには「**Introduction to Claude Cowork**」がある（Chrome、Word、Excel、PowerPoint、Outlook で Claude を使う内容）。対策講座の Workflow Integration モジュールには「Product: Claude Cowork」のタグが付いている。ただし **Cowork 講座は CCAO-F 対策講座の8モジュールには入っていない**。
  - Platform & Model Foundations モジュールは、プロンプトの前に決める判断として「**entry point（入口）**」を挙げている。どの製品面を指すのかは**不明**。
- **プラン（Free、Pro、Max、Team、Enterprise）**: ガイドに**出てこない**。対策講座は、まとめの回（Course Summary）を除く7モジュールすべてに「Product: Claude Enterprise」のタグが付いている（O6）。プランの違いを範囲とする第三者の記述（T3）や、「Research は有料プラン」を正解の根拠にする第三者の練習問題（T1）は、**公式の根拠がない**。
- **管理機能（管理コンソール、SSO、データ保持の設定、席の管理など）**: ガイドに**出てこない**。T3 は範囲としているが根拠はない。
- **データの扱い・プライバシー**: 分野6（6.2）の「データの機密性、規制、プライバシーの考慮事項」と 6.3「組織の AI ポリシー」は**範囲内**［公式］。サンプル3が示すのは「**Claude にデータを入れる前に**、ポリシーに沿って識別情報を削除・匿名化する」という**利用者の判断**。Claude 側のプライバシー設定（学習への利用の可否、保持期間など）の操作が問われるかどうかは、**ガイドに記載がなく不明**。サンプル3の解説は「モデルに保持しないよう指示しても、ポリシー上の管理要件は満たさない」としている。
- **具体的な法規制の名前（GDPR、HIPAA など）**: ガイドに**出てこない**（「regulatory considerations」とだけある）。
- **モデルの版番号**: ガイドは種類（Haiku、Sonnet、Opus）を挙げるだけ。現在の製品には **Fable** などもある（T8〔AItomation〕。claude.com のメニューにも「Mythos (including Fable)」がある）が、v1.0 の範囲には入っていない。12月の更新で変わるかどうかは不明。

### 6.3 範囲外（または対象外）と読める記述

- **［公式・O1 §3］** 対象外の人として: API を使って開発する開発者、エージェントシステムの設計者、機械学習・ソフトウェア工学・高度な AI システム設計の専門家。「エンタープライズ規模の AI アーキテクチャや統合の設計は求めない（Architect と Developer の範囲）」。
- **［公式］ガイドには「範囲外のトピック一覧（Out-of-scope）」という独立した章はない**（O1 を全文確認）。
- **［公式］「エスカレーションすること」自体は範囲内**: 限界を認識し、複雑な作業や技術的な作業を Architect／Developer に渡す（§1、§2、§3）。教材では「自分で API 連携を作る」選択肢は誤答側に、「技術担当へ渡す」選択肢は正答側になりやすい（解釈）。
- **［第三者］** 「API 開発と高度なシステムアーキテクチャは、この Associate 用問題集の範囲外」（T5）。「v1.0 ガイドは Claude Code に一度も触れていない」（T8）。→ ガイドの本文を確認すると、**Claude Code、MCP、Agent SDK という語は出てこない**。「API」は2か所だけで、どちらも「API で開発する人は対象外」「API の経験は不要」という対象者の説明（§3、§4）。ただし §7 は Code Execution の機能に触れている。Cowork、Chrome、Excel、Slack、デスクトップ、claude.ai、プラン名（Free、Pro、Team、Enterprise）も本文に出てこないことを確認した。

---

## 7. 問題の傾向

### 7.1 公式サンプル問題3問の要旨と狙い（O1 §8。全文は写さず、自分の言葉でまとめた）

ガイドは「本番の問題バンクから取ったものではない。出題のスタイルと**認知レベル**を示すための例」としている。3問とも **4択の単一選択**で、問い方は「最も適切な行動は？」「最も適した選択は？」。

| # | 分野 | 場面の要旨 | 正答の考え方 | 誤答の作り方 |
|---|---|---|---|---|
| S1 | 2 出力の評価と検証 | Claude が新しい規制を要約し、具体的な**項番号を自信ありげに引用**した。コンプライアンスチームに送る前に何をするか | 引用された項を**公式の条文と照らし合わせて確かめてから**共有する。番号のような具体的に見える細部も捏造されうる（ハルシネーション）。相手がコンプライアンス担当なのでなおさら | ① Claude の自信を信じてそのまま送る ② Claude に自分の確信度を採点させ、高ければ送る（**自己申告の確信度は正確さの指標にならない**）③ 言い回しをフォーマルにしてから送る（**体裁を変えても正しさは変わらない**） |
| S2 | 3 製品とモデルの選択 | 短い顧客返信の下書きを**大量に**作る。深い推論より**速さとコスト**が大事 | 単純で大量の作業には**より速く安いモデル**を選び、最上位のモデルは複雑な推論のために取っておく | ① 品質を最大にするため、すべてに最上位の高価なモデルを使う（コストと遅延の予算を無駄にする）② 製品の機能をすべて止めてコストを下げる ③ 別の AI に乗り換える（②と③は**トレードオフに答えていない**、的外れな極端策） |
| S3 | 6 ガバナンス、リスク、責任ある利用 | PM が傾向分析のため、**顧客名と口座番号を含む表**を上げたい。組織のポリシーは規制対象の個人データの共有を制限している | ポリシーに従い、**上げる前に識別情報を削除または匿名化**する。保護すべきデータを出さずに分析を進められる | ① 社内の分析だからそのまま上げる（ポリシー違反）② 上げたうえで「保持しないで」と Claude に指示する（**モデルへの指示は組織の管理措置の代わりにならない**）③ 分析そのものをやめる（匿名化でできるので**やめる必要はない**） |

**3問から読み取れる型（このメモの分析）**
- 正答は「**業務の目的を達成しつつ、検証できる、ポリシーに沿った、ちょうどよい大きさの手**」。やりすぎ（全部止める、乗り換える、最上位モデルを常に使う）も、やらなさすぎ（そのまま送る、そのまま上げる）も誤答になる。
- 誤答のパターン:
  1. **流ちょうさや自信を信じる**（そのまま送る、自己採点させる）
  2. **見た目だけの対処**（言い換え、書式の整え直し）
  3. **極端な対処**（業務をやめる、機能を全部止める、ほかの製品に替える）
  4. **本当の管理措置の代わりに「モデルに頼む」**（保持しないよう指示する）
  5. **過剰なスペック**（いつも最上位のモデル）
- 求められる知識は製品仕様の暗記ではなく、**判断**（確かめてから出す、タスクに合わせて選ぶ、規制対象のデータを守る）。第三者も同じ見方をしている（T8、T4）。
- 日本語版ガイドの訳の違い: S1 の解説の「the diligence step required」を、日本語版は「倫理的責任として求められる手順」と訳している（O2）。「diligence」は AI Fluency の4D の Diligence を指している可能性がある（解釈）。

### 7.2 本番の形式についての公式情報

- 択一と複数選択。複数選択では**選ぶ数が問題に書かれている**（O1 §5）。FAQ は「シナリオ形式の複数選択」と書いている（O3）。
- 問題の比率（択一と複数選択の割合、シナリオ問題の数）は**公表されておらず不明**。T5 も「出題の比率は公表されていない」と注意している。

### 7.3 ［第三者］による傾向の分析（参考）

- T1: 問題は「状況 → **制約**（『インフラを足さずに』『監査できること』など、選択肢を絞り込む言葉）→ 問い（『最も効果的なのは』＝唯一の正解ではなく最適なもの）→ 選択肢」の順。選択肢は「正解1つ、**やりすぎ**1つ、**症状だけを抑える**もの1つ、**惜しい**もの1つ」になりやすい。間違いの原因を、知らなかった／制約を見落とした／大きすぎる道具を選んだ／症状だけ抑えた／時間切れ、の5つに分けて振り返ることを勧めている。
- T3（open-exam-prep）: 認知レベルの配分を「想起 約15%、応用 約50%、分析・評価 約35%」としている。→ **公式の根拠はない**（ガイドは「認知レベルを示す」としか書いていない）。
- T7（Tutorials Dojo）: 練習問題は「近い誤答（closely related distractors）」を含む択一と複数選択。
- T4（studytech）: 「効率的に聞こえる答えより、責任ある答えが正解になりやすい」。

---

## 8. 公式の学習リソース

### 8.1 試験ガイドが勧める準備（O1 §7）［公式］
- 必修のコースはない。特定の教材で合格できるとは保証しない。
- §6 のブループリントを読み、目標ごとに自己評価する。
- Projects、Artifacts、Memory、Skills、Code Execution などについて、**Anthropic の公式ドキュメントとヘルプ記事**を確認する。
- プロンプトの構造化、タスクの分解、反復を練習する。
- 実際のワークフローを作る。指示とナレッジソースで Project を設定し、出力の正確さとバイアスを評価する。
- 責任ある利用の判断を練習する（データの機密性、適切なユースケース、エスカレーションや人によるレビューを求めるタイミング）。
- §8 のサンプル問題を解く。

### 8.2 Anthropic Partner Academy（パートナー限定）［公式・O6/O7/O8］

**「Claude Certified Associate - Foundations Prep Course」**（8モジュール。合計は約389分 ≈ 6.5時間。合計は計算）
- 説明: 「プロとしての規律で Claude を使いこなし、日々の業務課題を、責任を持てる信頼できる Claude ワークフローに変える」
- 受講前の推奨: **Claude 101**、**AI Fluency: Framework & Foundations**、**AI Capabilities and Limitations**

| モジュール | 時間 | 対応する分野（このメモの対応づけ） |
|---|---|---|
| Claude Platform & Model Foundations | 59分 | 分野3 |
| Prompting & Task Execution | 53分 | 分野1 |
| Evaluating & Validating Claude's Output | 74分 | 分野2 |
| Workflow Integration & Solution Design | 63分 | 分野4 |
| Configuration & Knowledge Management | 47分 | 分野5 |
| Governance, Risk & Responsible Use | 55分 | 分野6 |
| Troubleshooting & Optimization | 30分 | 分野7 |
| Course Summary & Next Steps | 8分 | 7つのスキルを1つの規律としてまとめる |

- 講座全体の学習目標（要旨）: 仕事に合った入口、モデル、機能を選び、セッションの文脈を管理する／部品の枠組みで構造化されたプロンプトを書き、依頼を分解し、診断しながら反復する／正確性と網羅性を評価し、ハルシネーションとバイアスを見つけ、人による検証が要る場面を知る／どの手順を任せるかを決めてチームのワークフローに組み込み、価値と限界を正しく伝える／Projects を指示とナレッジで設定し、正確に保つ／ガバナンス、データの機密性、責任ある利用の判断を日々の仕事に当てはめる／不調を根本原因までたどり、修正が持続するようにワークフローを最適化する。

**「Claude Associate」学習パス**（Partner Academy）: AI Capabilities and Limitations／Claude 101／Claude Platform & Model Foundations／Prompting & Task Execution／Evaluating & Validating Claude's Output／**Introduction to Claude Cowork**／Workflow Integration & Solution Design／Governance, Risk & Responsible Use

### 8.3 一般公開の Anthropic Academy（anthropic.skilljar.com。第三者の T8 は academy.claude.com の「Claude Academy」と書いている）［公式・O12］
- **Claude 101**: 日常業務での使い方。カリキュラムに projects、artifacts、skills、ツールの接続、エンタープライズ検索、Research、職種別のユースケースがある。
- **AI Fluency: Framework & Foundations**: 4D フレームワーク＝**Delegation（委任）、Description（記述）、Discernment（見極め）、Diligence（誠実な注意）**と、「Description と Discernment のループ」。※ 日本語訳はこのメモの仮訳。対策講座は、Prompting に **Description**、Workflow に **Delegation** を対応させていると明記している（O6）。
- **AI Capabilities and Limitations**: 4D の「人の能力」に対し、それが向き合う「機械の性質」（次のトークンの予測、知識、作業記憶、操縦しやすさ）を教える。
- **Introduction to Claude Cowork**: Cowork の作業の流れ、Projects、Skills、プラグイン、Claude in Chrome、Claude for Microsoft 365、安全な使い方。講座ページには「Claude Cowork is now just Claude」という告知がある。
- そのほか関連しそうな講座: Deploying Claude Enterprise with Confidence（導入時の5つの判断。管理者向け）、AI Fluency の職種別版（教育、非営利、小規模事業など）。
- 公開講座の「修了証」と、監督付きの「認定資格」は別物（O5）。

### 8.4 公式の練習手段
- 公式の模擬試験はない（廃止）。サンプル問題3問だけ（O3、O1 §8）。

---

## 9. 出典一覧（確認日はすべて 2026-11-16）

### 公式（Anthropic、およびその配信事業者 Pearson VUE）

| 記号 | 出典 | URL | 種別 | 根拠にした事実 |
|---|---|---|---|---|
| O1 | Claude Certified Associate – Foundations Exam Guide（英語、**v1.0、2026年7月発効**。PDF の作成日 2026-07-09 JST） | https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542847%2FClaude+Certified+Associate+%E2%80%93+Foundations+Exam+Guide.pdf | 公式（**全文を直接確認**） | 名称、コード、対象者、MQC、形式、配点、タスクステートメント、準備方法、サンプル問題、採点、規則、更新 |
| O2 | 同じ試験ガイドの日本語版（v1.0。PDF の作成日 2026-10-20 JST） | https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1792453741%2FClaude+Certified+Associate+-+Foundations+Exam+Guide+%28Japanese%29.pdf | 公式（全文を直接確認） | 公式の日本語訳（分野名、タスクステートメント） |
| O3 | Partner Academy の「FAQ - Certifications」 | https://anthropic-partners.skilljar.com/page/faq-certifications | 公式 | 受験資格、料金と割引、言語、形式（シナリオ形式の複数選択、着席135分）、採点、再受験、更新、SSO 化、キャンセルの期限、模擬試験の廃止、パートナーランクへの不算入 |
| O4 | Partner Academy の「Partner Certifications」 | https://anthropic-partners.skilljar.com/page/partner-certifications | 公式 | 3つのロール、Associate の対象（コンサルタント、営業、デリバリーリード）、料金一覧 |
| O5 | 「Who can take a Claude certification exam」 | https://anthropic-partners.skilljar.com/page/certification-eligibility | 公式 | パートナー限定、18歳以上、修了証と認定資格の違い |
| O6 | 「Claude Certified Associate - Foundations Prep Course」と各モジュールのページ | https://anthropic-partners.skilljar.com/path/claude-certified-associate-foundations （モジュール: .../path/claude-associate/claude-platform-model-foundations、.../prompting-task-execution、.../evaluating-validating-claudes-output、.../workflow-integration-solution-design、.../governance-risk-responsible-use、.../path/claude-certified-associate-foundations/configuration-knowledge-management、.../troubleshooting-optimization） | 公式（講座の概要と学習目標のページ。講座の中身はログインが必要で未確認） | 8モジュールの構成、時間、学習目標、根本原因の4分類、AI Fluency との対応 |
| O7 | 「Claude Associate」学習パス | https://anthropic-partners.skilljar.com/path/claude-associate | 公式 | Cowork 講座を含む学習パス |
| O8 | 「Claude Certification Exam Prep Courses」 | https://anthropic-partners.skilljar.com/page/claude-certification-exam-prep-courses | 公式 | 対策講座の一覧（Associate は8講座） |
| O9 | Anthropic Certification Exam Policy（2026-06-25 更新） | https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1782870704%2FAnthropic+Certification+Exam+Policy.pdf | 公式 | 試験内容の秘密保持、試験中の AI 利用の禁止、不正への処分 |
| O10 | Pearson VUE「Claude Certification Program by Anthropic」 | https://www.pearsonvue.com/us/en/anthropic.html | 公式（配信事業者） | **2026-12-07 の内容更新と、11-17 の新ガイド公開**、試験コード一覧、再受験、キャンセルは48時間前まで、言語の選択肢に日本語 |
| O11 | claude.com の記事「Four role-based certifications for the people who put Claude to work for customers」（**2026-07-23**） | https://claude.com/resources/articles/four-role-based-claude-certifications | 公式 | 3つの新資格の追加、Associate の位置づけ、Pearson と Credly |
| O12 | Anthropic Academy（公開版）のカタログと講座ページ | https://anthropic.skilljar.com/ 、/claude-101、/ai-fluency-framework-foundations、/ai-capabilities-and-limitations、/introduction-to-claude-cowork | 公式 | 公開講座の名前とカリキュラム、4D |

### 第三者

| 記号 | 出典 | URL | 根拠にした事実・使い方 |
|---|---|---|---|
| T1 | claudearchitectcertification.com（独立系。PDF に「Facts as of 2 Oct 2026」） | https://claudearchitectcertification.com/exam-guide/ccao-f.md 、https://claudearchitectcertification.com/certifications/ccao-f.md 、https://claudearchitectcertification.com/downloads/cca-a-exam-guide.pdf | 「CCA-A」という呼び方、分野別の学習項目、独自シナリオ5本、分野ごとの例題の場面、誤答の型、問題数の丸め |
| T2 | 同じサイトの学習項目一覧（T1 の certifications ページ内） | 同上 | 「GDPR/HIPAA/FedRAMP」「Debugging LLM System Failures」など、公式にない項目（他試験と共通の項目と思われる） |
| T3 | OpenExamPrep（2026年10月更新） | https://open-exam-prep.com/study-guides/anthropic-ccao-f/introduction/blueprint-domains | 独自の細目（プラン、プロンプトインジェクション、XML、few-shot など）と認知レベルの配分。**公式の根拠なし** |
| T4 | StudyTech AI（2026-11-07） | https://studytech.ai/blog/claude-certified-associate-exam-guide | 12月の更新に触れている。v1.0 の要約。「責任ある答えが正解」という見方 |
| T5 | A Guide to Cloud & AI | https://www.aguidetocloud.com/cert-tracker/anthropic-ccao-f/ | 「API とアーキテクチャは範囲外」とする問題集、出題比率は非公表という注意 |
| T6 | Training Camp | https://trainingcamp.com/what-is-claude-certified-associate/ | 720は72%ではない、4試験の問題数（Developer 53、Architect – Professional 63）、「Anthropic に直接払う」（→ 11-12 以降は Pearson の決済画面。情報が古い） |
| T7 | Tutorials Dojo（2026-08-11 更新） | https://tutorialsdojo.com/ccao-f-claude-certified-associate-foundations-study-guide/ | 重点機能の一覧（チャット、Projects、Research、Artifacts、モデル、Memory）、分野別の論点、練習問題2問 |
| T8 | AItomation Academy | https://www.aitomationacademy.com/blog/claude-certified-associate | キャンセル期限の食い違いの指摘、v1.0 に Claude Code が出ないこと、公開講座の時間、Fable への言及 |
| T9 | AI Cert Guides（claudecertificationguide.com） | https://claudecertificationguide.com/associate-foundations | v1.0 の分野表（「Optimisation」表記） |
| T10 | ClaudeLog | https://claudelog.com/faqs/what-are-claude-certifications/ | 2026-07-08 の発表（Reddit）、07-21 に4資格に合格した人の投稿。※「Anthropic は料金、問題数、合格点を公表していない」という記述は**誤り、または古い**（O1、O3 で公表されている） |
| T11 | vanja.io | https://vanja.io/claude-certification/ | 4資格の概要、英語と日本語（公式 FAQ の引用） |
| T12 | IT Brief Australia（報道） | https://itbrief.com.au/story/pearson-anthropic-expand-claude-certification-programme | 3資格の追加、Pearson の役割 |
| — | FindSkill.ai | https://findskill.ai/blog/claude-certified-associate-exam-cost-format-domains/ | v1.0 の要約と12月の更新（T4 と同じ内容）。「2026年7月に開始」 |
| — | 検索で見つけたが本文は未読 | k21academy、jiangren.com.au、Udemy、Learning Tree（講座名が「CCA-F」）、qiita.com の記事、open-exam-prep のブログ | — |

### 出典どうしの食い違い

| 論点 | 食い違い | 見立て |
|---|---|---|
| キャンセル・予約変更の期限 | O1（v1.0 ガイド）は「24時間前まで」。O3（FAQ。11-12 以降の内容）は「テストセンターは48時間前、OnVUE は1時間前まで」。O10（Pearson）は「48時間前まで」 | **O3 がいちばん新しく、有力**。ガイドの24時間は古い。T8 も「厳しいほう（48時間）で考えるべき」としている。教材では細かい数字を問わないのが無難 |
| 申し込み・支払いの流れ | O1 は「Partner Academy で決済したあと Pearson VUE アカウントを作る」。O10 は「初回は Pearson のユーザー名とパスワードがメールで届く」。O3 は「11-12 から SSO、Pearson の決済画面で支払う」 | **O3 が現行**。O1 と O10 の記述は古い |
| 略称 | 公式は CCAO-F。T1 は CCA-A。Learning Tree は CCA-F | **CCAO-F を使う**。CCA-F は Architect – Foundations（公式コードは CCAR-F）の俗称とぶつかるので避ける |
| 開始日 | 公式ガイドは「2026年7月」。公式記事は 07-23 付。T10 は 07-08 発表。検索の抜粋に 07-13 開始 | 正確な受験開始日は**不明**。教材では「2026年7月」とだけ書くのが安全 |
| ロールの呼び方 | O10 の冒頭は「Practitioner, Architect, and Developer」。O4 と O11 は「Associate, Developer, Architect」 | O10 の「Practitioner」は書き間違いか古い呼び方とみられる。**Associate が正しい** |
| 対象者の書き方 | O1 は「オペレーション、マーケティング、PM、教育、広報などの実務者」。O4 は「コンサルタント、営業、デリバリーリード」 | 矛盾ではなく強調点の違い。ガイド（O1）を基準にし、パートナー企業の顧客対応の場面も含めるとよい |
| 5.3 の用語 | O1 は「system-level instructions」。O6 は「project-level instructions」 | 中身は同じ（Project の指示）と解釈。教材は公式の訳語「システムレベルの指示」を見出しに使い、説明で Project の指示だと補う |
| 「60問はすべて採点対象」 | T1 は「60 scored」。O1 は「Number of items 60」とだけ書く | 非採点の問題があるかどうかは**不明**。教材では「60問」とだけ書く |
| 範囲の細目 | T3 と T2 は、プラン、管理機能、プロンプトインジェクション、GDPR/HIPAA/FedRAMP、XML、few-shot などを範囲に含める | **公式ガイドに根拠はない**。問題を作るときは参考にとどめる |
| 料金などの公表 | T10 は「公表されていない」 | 誤り。O1 と O3 で公表されている |
| 支払先 | T6 は「Anthropic に直接払う」 | 11-12 以降は Pearson の決済画面（O3）。T6 は古い |

---

## 付記：教材づくりで気をつけること（調査担当の所見）

1. **12-07 の更新**: 11-17 公開の新しいガイドで、ドメイン名、配点、タスクステートメントが変わるかもしれない。問題データには「分野」と「仮番号」を持たせ、差し替えやすくしておく。変更点が分かるまでは、v1.0 を前提にしていることを教材にも明記する。
2. **仮番号を公式扱いしない**: v1.0 にはタスクステートメントの番号も、知識・スキルの細目もない。
3. **公式の訳語を使う**: 分野、プロンプト作成とタスク実行、出力の評価と検証、製品とモデルの選択、ワークフロー統合とソリューション設計、設定とナレッジ管理、ガバナンス、リスク、責任ある利用、トラブルシューティングと最適化。製品名は、プロジェクト、アーティファクト、リサーチ、チャット、コネクタ。日本語で受験する人がそのまま本番の用語で読める。
4. **製品仕様の暗記問題を避ける**: v1.0 は判断を問う作りで、サンプル問題にプラン名や数値の上限は出てこない。プランの提供状況、コネクタの権限、モデルの版番号などは変わりやすく、公式の範囲としても確認できない。正解の根拠は「検証する、タスクに合わせる、ポリシーに従う、エスカレーションする」に置く。
5. **Cowork、Chrome、Excel、Slack を扱うかどうか**: v1.0 のガイド本文には出てこない（公式の学習パスには Cowork 講座がある）。主軸は Projects、Artifacts、リサーチ、チャット、モデルの選択、メモリとコンテキスト、コネクタ、Skills、Memory。Cowork などは「周辺知識」として扱いを軽めにするのが安全。
6. **受験資格**: 受けられるのは Claude Partner Network 加盟組織の社員だけ。教材の利用者が受験できない可能性があることを、前置きに書いておくとよい。Associate はパートナーランクに数えられない、という点も事実として正しく書く。
7. **誤答の作り方**: 公式サンプルの型（自信や流ちょうさを信じる、見た目だけ直す、極端な対処、「モデルに頼む」で済ませる、過剰なスペック）に沿うと、本番の認知レベルに近づく。
8. **著作権と守秘義務**: 公式のサンプル問題3問は、全文を載せず、要旨と狙いだけにする（7章はその方針で書いた）。第三者の練習問題の文面も転用しない。

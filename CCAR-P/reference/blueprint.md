# CCAR-P（Claude Certified Architect – Professional）試験の設計図

> **追記（2026-11-18）:** 更新版の試験ガイドは 2026-11-17 に公開された。このフォルダに、`CCAR-P_exam_guide_v1.1-2026-11_*`（現行の版。申し込み・本人確認・サポートの章だけが変わり、分野・配点・問題数は v1.0 と同じ）と、`CCAR-P_exam_guide_v1.1-2026-12-07_*`（12/7 発効の版。70問になり、分野の配点とスキルが再編された）を保存した。差分のまとめは `shared/program.md` の冒頭の追記にある。**このメモと教材は、改訂前のガイドに基づいたまま**（2026-11-18 時点の方針）。以下の「公開予定」「不明」という記述は、2026-11-16 時点のもの。

- 調査日: 2026-11-16
- 目的: 非公式の日本語教材（練習問題 約100問、音声講座、スライド、解説動画）の土台
- 表記ルール: **［公式］** は Anthropic・Pearson VUE の一次資料を直接読んで確かめた事実。**［公式・講座］** は公式の準備講座ページ（試験ガイドではない）にある事実。**［第三者］** は対策サイトなどの記述。**［推計］** は公式の数字からこのメモで計算した値。

> ### 最重要の注意：12月7日に出題内容が変わる
> - Pearson VUE の Anthropic ページと Partner Academy の告知バナーによると、**Architect – Professional を含む3試験は 2026-12-07 から出題内容が更新される。更新版の試験ガイドは 2026-11-17（調査日の翌日）に公開予定。**12月7日以降に受験するなら新しいガイドで準備するよう案内している。［公式］
> - 何が変わるかはまだ公表されていない。［第三者］も同じ見解（claudecertifiedarchitects.com、Whizlabs）。
> - このメモは**現行の試験ガイド v1.0（2026年7月発効）**に基づく。11月17日以降に新ガイドと突き合わせ、配点やタスクステートメントの差分を確かめること。

---

## 1. 基本情報

| 項目 | 内容 | 根拠 |
|---|---|---|
| 正式名称 | **Claude Certified Architect – Professional** | ［公式］試験ガイド v1.0 |
| 試験コード | **CCAR-P**。試験ガイドの表紙と §5、Pearson VUE のページの表記が一致している。「CCA-P」はコミュニティでの略称で、正式コードではない。 | ［公式］ガイド、Pearson VUE ／ CCA-P という略し方は［第三者］claudelog、claudearchitectcertification など |
| 同じシリーズのコード | CCAO-F（Associate – Foundations）、CCAR-F（Architect – Foundations）、CCDV-F（Developer – Foundations）、CCAR-P | ［公式］Pearson VUE |
| レベル | Professional。Architect ロールの上位で、4資格のうち Professional は CCAR-P だけ | ［公式］Partner Academy の資格一覧表 |
| 位置づけ | Foundations は「Claude で構築できる」ことを、Professional は「エンタープライズ規模で Claude ソリューションを設計し、統制できる」ことを証明する（FAQ の要旨）。Foundations から Professional への自動の格上げはない。 | ［公式］FAQ |
| 認定の趣旨 | Anthropic の Claude プラットフォームで、本番レベルの AI ソリューションを設計・構築・提供できることを検証する。モデル、アーキテクチャ、API パターンの選定、プロンプトとコンテキストのエンジニアリング、エンタープライズシステムへの統合、評価・セキュリティ・コンプライアンス・ガバナンスの設計への組み込みを含む。 | ［公式］ガイド §1 |
| 対象者 | 中堅〜上級の技術職。ソリューションアーキテクト、AI/ML エンジニア、テクニカルリード、シニアソフトウェアエンジニアなど、ビジネス要件と技術実装の接点で働く人。ステークホルダー対応、顧客や社内への助言、アーキテクチャ判断の主導、セキュリティ・法務・経営層との議論にも関わる。想定業界は金融、医療、小売、テクノロジー、教育、政府。 | ［公式］ガイド §3 |
| 対象外 | 初級の開発者、Claude アプリを時々使うだけの人、E2E の AI システムを設計した経験のない人、純粋に非技術的な役割、システム設計の責任を伴わないプロンプト作成だけの役割 | ［公式］ガイド §3 |
| 最低限の能力を備えた受験者（MQC） | エンジニアリングの考え方と本番デプロイの実務経験を持つ。プロンプトとコンテキストのエンジニアリング、RAG、API 統合、オーケストレーション、評価フレームワークを含む E2E のシステムを設計でき、コスト・レイテンシ・性能・安全性・保守性のトレードオフを理解している。 | ［公式］ガイド §4 |
| 推奨経験（必須ではない） | ① ソフトウェア工学のベストプラクティス（モジュール設計、関心の分離、スケーラビリティ）の基礎 ② システムアーキテクチャまたはプラットフォームエンジニアリングで3年以上 ③ 本番環境での Claude または同等の LLM システムの実務で6か月以上 ④ ディスカバリーからデプロイ、運用化まで E2E で提供した経験 | ［公式］ガイド §4 |
| 前提条件 | **なし。**必須の前提資格や講座はなく、試験の成績だけで授与される。CCAR-F を持っていなくても受験できる。 | ［公式］ガイド §4、FAQ |
| 受験資格（実質的な前提） | **Claude Partner Network に加盟している組織の人だけが受験できる。**登録には、パートナー記録に載っている会社ドメインのメールが必要（個人のメールは不可）。18歳以上で、Anthropic がサポートする国・地域に住んでいること。 | ［公式］FAQ |
| 受験方法 | Pearson VUE。オンライン監督（OnVUE）かテストセンター。クローズドブックで、メモ、資料、翻訳ツール、AI アシスタントは使えない。着席時間はチェックインなどを含めて約135分を見込む。 | ［公式］ガイド §5・§12、FAQ |
| 申込の流れ | Partner Academy にサインインして Register を選ぶと、2026-11-12 以降はシングルサインオンで Pearson に移り、そこで予約と支払いをする。（ガイド v1.0 には「Pearson VUE アカウントを作る」とあるが、FAQ の新しい手順が優先。） | ［公式］FAQ（新）、ガイド §10（旧） |
| 料金 | **175 USD**（パートナー割引前）。Select、Preferred、Global Premier のパートナーは50%割引。Global Premier は 2026-12-31 まで100%割引。Registered ティアは定価。 | ［公式］ガイド §5、FAQ |
| 言語 | **英語と日本語。**試験も準備コンテンツも日本語版がある。**公式の日本語版試験ガイドもある**（PDF の作成は 2026-10-20、版は v1.0）。英語が第二言語の受験者は、Pearson に時間延長を申請できる。 | ［公式］FAQ、日本語版ガイド |
| 有効期間と更新 | 授与日から12か月。期限内なら、変更点を確認したうえで Partner Academy の無料・監督なしのアセスメントで更新できる。失効すると定価で再受験。試験内容が大きく変わった場合は、更新アセスメントではなく再受験を求めることがある。 | ［公式］ガイド §14、FAQ |
| 再受験 | 待機期間は1回目の不合格後14日、2回目の後30日、3回目の後90日。同じ試験は連続する12か月で4回まで。毎回定価がかかる（パートナー割引は効く）。 | ［公式］ガイド §11、FAQ |
| キャンセルと変更 | テストセンターは48時間前まで、OnVUE は1時間前まで。（ガイド v1.0 は「24時間前まで」。FAQ と Pearson VUE のページが新しい。） | ［公式］FAQ・Pearson VUE（新）、ガイド §10（旧） |
| バッジ | Credly | ［公式］FAQ |
| パートナー評価 | Partner Network の資格要件に数えられる（Associate だけは対象外） | ［公式］FAQ |
| 開始時期 | 試験ガイド v1.0 は「2026年7月発効」。PDF のメタデータの作成日時は 2026-07-09 JST（米国時間で7月8日）。claude.com の公式記事は 2026-07-23 付け。第三者は「7月8日に拡大を発表」（claudelog、Reddit 経由）、「7月10日の週に最初の合格者」（FindSkill）と書いている。 | ［公式］ガイド、claude.com ／［第三者］ |
| 出題者 | Anthropic の Applied AI チームを含む専門家（SME）が、実務を反映するよう設計した | ［公式］claude.com の記事 |

---

## 2. 形式

| 項目 | 内容 | 根拠 |
|---|---|---|
| 問題数 | **63問** | ［公式］ガイド §5 |
| 採点対象と非採点の内訳 | **不明。**ガイドは「Number of items 63」とだけ書き、配点の説明で「採点対象の問題のうち各分野から出題される割合」と言っている。非採点（事前テスト）の問題があるかどうかの記載はない。claudearchitectcertification は「63 scored items」と書くが、公式の裏付けはない。 | ［公式］／［第三者］ |
| 時間 | **120分**（1問あたり約1.9分）。第三者の練習模試には、1問90秒に絞ったものもある。 | ［公式］ガイド §5 ／［推計］ |
| スコア | 100〜1,000 のスケールスコアで、**720 が合格**。基準準拠型で、他の受験者との比較ではない。カットスコアは、訓練を受けた SME が MQC の水準を判定する基準設定調査で決めた。スケーリングは、難しさの違うフォーム間で点をそろえるため。 | ［公式］ガイド §9、FAQ |
| 720 は72%か | 違う。素点からの換算は公表されていない。「72%で合格」とうたう練習問題は疑うべき、と第三者は書いている。 | ［第三者］Training Camp、Whizlabs（公式の「スケールスコア」の説明と矛盾しない） |
| 問題の種類 | **択一（multiple-choice）と複数選択（multiple-response）。各問に選ぶ数が書いてある。**FAQ は「択一と、シナリオに基づく複数選択」と表現している。 | ［公式］ガイド §5、FAQ |
| シナリオとケーススタディ | CCAR-P のガイドには、CCAR-F の「6本のシナリオから4本が出題される」のような、複数の問題をまとめるシナリオ構成の記述が**ない**。公式サンプルは、短い状況説明が1問ずつ完結する形（→ 5章）。 | ［公式］ |
| 推測へのペナルティ | **不明（公式資料に記載なし）。**ガイド、FAQ、Exam Policy、Pearson VUE のページのどれにも書かれていない。 | ［公式］資料の全文確認 |
| 結果の通知 | 試験の終了時に画面に表示される（テストセンターでは紙のレポートも）。合否とスケールスコアに加え、**分野ごとの正答率**も示される。分野ごとの数字は合否の判定には使われない。 | ［公式］ガイド §9、FAQ |
| 試験中の規則 | カメラの視界から出ない。机に物を置かない。誰とも連絡しない。内容を記録しない。携帯、スマートウォッチ、ヘッドホン、学習資料、録音・録画機器は持ち込めない。不正行為をすると、結果の無効、資格の取り消し、受験禁止。開始前に秘密保持契約（NDA）に同意する必要がある（問題、選択肢、シナリオはすべて Anthropic の機密）。Exam Policy は試験中の AI 利用も明示的に禁じている。 | ［公式］ガイド §12・§13、Exam Policy |

**分野ごとの問題数の目安**［推計］（63問 × 配点。ガイドは配点を「おおよその割合」としている）: D1 ≈ 11、D2 ≈ 8、D3 ≈ 12、D4 ≈ 10、D5 ≈ 9、D6 ≈ 9、D7 ≈ 4（合計63）。第三者の PDF（claudearchitectcertification）も同じ数を示している。

---

## 3. ドメインと配点（公式の順番）

| # | 英語の正式名 | 公式日本語版ガイドの名称 | 配点 | 63問での目安［推計］ | 100問の教材に換算 |
|---|---|---|---|---|---|
| 1 | **Solution Design & Architecture** | ソリューション設計とアーキテクチャ | **17%** | 約11問 | 17問 |
| 2 | **Claude Models, Prompting & Context Engineering** | Claudeモデル、プロンプト作成、コンテキストエンジニアリング | **13%** | 約8問 | 13問 |
| 3 | **Integration** | 統合 | **19%** | 約12問 | 19問 |
| 4 | **Evaluation, Testing & Optimization** | 評価、テスト、最適化 | **16%** | 約10問 | 16問 |
| 5 | **Governance, Safety & Risk Management** | ガバナンス、安全性、リスク管理 | **14%** | 約9問 | 14問 |
| 6 | **Stakeholder Communication & Lifecycle Management** | ステークホルダーとのコミュニケーションとライフサイクル管理 | **14%** | 約9問 | 14問 |
| 7 | **Developer Productivity & Operational Enablement** | 開発者の生産性と運用支援 | **7%** | 約4問 | 7問 |
| | 合計 | 合計 | **100%**（17+13+19+16+14+14+7＝100 を確認） | 63問 | 100問 |

- 配点は職務タスク分析で決めた相対的な重要度を反映し、採点対象の問題がおおよそどの割合で各分野から出るかを示す。［公式］ガイド §6
- 聞きかじり情報の検証: 「Integration 19%（最大）、Solution Design & Architecture 17%、Communication & Lifecycle Management 14%、Developer Productivity & Operational Enablement 7%」は**正しい**。ただし正式名は「**Stakeholder** Communication & Lifecycle Management」。残りの3つは D2 13%、D4 16%、D5 14%。
- 第三者サイトでは「Governance, Safety & Risk」「Stakeholder Communication & Lifecycle」のように、末尾の **Management** を落とした表記がある（claudearchitectcertification）。**教材では公式名を使うこと。**

---

## 4. 各ドメインのタスクステートメント

### 読む前に（重要）
- **公式ガイドのタスクには番号がない。**下の「1.1」などは、このメモで便宜上付けたもの。教材で「公式タスク 1.1」のように、公式の番号であるかのように書かないこと。
- **CCAR-P のガイドには、タスクごとの知識・スキルの箇条書き（Knowledge of / Skills in）がない。**この点が CCAR-F と違う。CCAR-F のガイドは30のタスクステートメントのそれぞれに詳しい箇条書きが付いた39ページの資料だが、CCAR-P は11ページで、タスクは1行ずつ。
- タスクは全部で **38**（6+5+8+6+5+5+3）。ガイドは「試験問題はこれらの目標に対して作られる（Exam items are written against these objectives）」と明記している。［公式］
- 問題作りの粒度を補うため、各ドメインに次の2つを添える。
  - (a) **公式の準備講座**「Claude Certified Architect – Professional Prep Course」（Partner Academy、5講座）の学習目標のうち、対応するもの。**［公式・講座］**（試験ガイドではない。講座とドメインの対応づけはこのメモの推定）
  - (b) 第三者の対策サイトが挙げる観点。**［第三者］**（出題されるかは未確認）

---

### Domain 1: Solution Design & Architecture（17%）／ソリューション設計とアーキテクチャ

| 便宜番号 | 英語原文［公式］ | 公式日本語訳［公式］ |
|---|---|---|
| 1.1 | Translate business problems into Claude-based AI solutions | ビジネス課題をClaudeベースのAIソリューションに落とし込む |
| 1.2 | Design end-to-end architectures (input → processing → output → feedback loops) | エンドツーエンドのアーキテクチャ（入力 → 処理 → 出力 → フィードバックループ）を設計する |
| 1.3 | Select appropriate architectural patterns (workflow, agentic, augmented LLM) | 適切なアーキテクチャパターン（ワークフロー、エージェント型、拡張LLM）を選択する |
| 1.4 | Design multi-agent systems and orchestration strategies | マルチエージェントシステムとオーケストレーション戦略を設計する |
| 1.5 | Apply decomposition techniques for complex problem solving | 複雑な問題解決のために分解の手法を適用する |
| 1.6 | Align solutions to business value pillars (efficiency, transformation, productivity, cost, performance SLAs) | ソリューションをビジネス価値の柱（効率性、変革、生産性、コスト、パフォーマンスSLA）に整合させる |

(a) 対応する講座の学習目標［公式・講座］（講座1「Claude Platform & Solution Design」238分、講座2「Enterprise Integration & Production」158分）
- 依頼を「Claude がやること」「既存システムがやること」「人がやること」に分ける。判断の軸は、AI Fluency 講座でいう「生成 AI の4つの性質」。
- augmented call、workflow、agent のどれにするかを、それぞれの**コストを言葉にして**選ぶ。
- 問題の形に合う参照アーキテクチャのパターンを選ぶ。本来はライブの状態（live-state）が担うべき役割を、検索（retrieval）に担わせていないかを見抜く。
- 構築前に決める4つ: Claude が担う仕事、その形、参照アーキテクチャ、モデルとコンテキスト戦略。それぞれをもっともな代替案に対して擁護できること。
- 呼び出し量、トークン消費、コストを見積もり、実現可能性を評価し、境界条件を明示したスコープに落とし込む（講座2）。

(b) 第三者の観点［第三者］
- workflow と agent の選び分け。手順が決まっていて監査が必要なら、固定のワークフロー（プロンプトチェーン）。並列化はサブタスクが独立なときだけ（Tutorials Dojo のサンプル）。
- 「agent のほうが常に高度で正しい」という思い込みを突く（claudearchitectcertification）。
- アーキテクチャを決める前に、要件（機能要件、インフラ要件、制約、成功指標）を固める（同）。
- サブエージェント、タスク分解の戦略、ビジネス価値の柱との整合（同のコンセプト一覧）。

---

### Domain 2: Claude Models, Prompting & Context Engineering（13%）／Claudeモデル、プロンプト作成、コンテキストエンジニアリング

| 便宜番号 | 英語原文［公式］ | 公式日本語訳［公式］ |
|---|---|---|
| 2.1 | Select appropriate Claude models based on trade-offs | トレードオフに基づいて適切なClaudeモデルを選択する |
| 2.2 | Design system prompts, templates, and guardrails | システムプロンプト、テンプレート、ガードレールを設計する |
| 2.3 | Apply prompt engineering techniques (zero-shot, few-shot, chain-of-thought) | プロンプトエンジニアリングの手法（ゼロショット、few-shot、思考の連鎖）を適用する |
| 2.4 | Optimize context windows and manage token usage | コンテキストウィンドウを最適化し、トークン使用量を管理する |
| 2.5 | Implement prompt reuse strategies (caching, modular prompts, Skills) | プロンプトの再利用戦略（キャッシング、モジュール型プロンプト、スキル）を実装する |

(a) 対応する講座の学習目標［公式・講座］（講座1）
- モデル、コンテキストウィンドウ、コンテキスト戦略を、根拠を示して決める。**モデルを替える前には、必ず評価（eval）を関門にする。**
- 入口（Claude.ai、API、SDK、Claude Code、MCP サーバー）のそれぞれがどこに合うか、どの層でどんなカスタマイズをするかを知る。
- 利用者が見る入口、エンジニアがコードを書くビルド時のインターフェース、企業が調達する提供ルートを区別する。そして、ガバナンスや規制業界の制約で使えなくなるものを、他のトレードオフより先に見極める。

(b) 第三者の観点［第三者］
- モデルの階層は習慣ではなく、タスクに合わせる。単純で大量の分類なら、まず小型モデル（Haiku）で足りるかを確かめる（claudearchitectcertification）。
- プロンプトキャッシュが何のコストを減らすか（同）。静的な指示や参照文書を毎回送る構成で、レイテンシとトークン費用を減らせる場面（Tutorials Dojo）。
- Skills で再利用できる指示をまとめ、毎回すべての指示を詰め込まない（Tutorials Dojo）。

---

### Domain 3: Integration（19%、最大）／統合

| 便宜番号 | 英語原文［公式］ | 公式日本語訳［公式］ |
|---|---|---|
| 3.1 | Evaluate tool/agent configuration for capability bloat | ツールやエージェントの構成を、機能の肥大化の観点から評価する |
| 3.2 | Analyze authentication and authorization requirements to identify security gaps | 認証と認可の要件を分析し、セキュリティ上のギャップを特定する |
| 3.3 | Evaluate accuracy-latency trade-offs and justify configuration decisions | 精度とレイテンシのトレードオフを評価し、構成に関する決定の根拠を示す |
| 3.4 | Analyze observability challenges and select monitoring strategies at scale | オブザーバビリティの課題を分析し、大規模環境でのモニタリング戦略を選択する |
| 3.5 | Design a RAG pipeline with appropriate chunking and indexing strategies | 適切なチャンキング戦略とインデックス作成戦略を備えたRAGパイプラインを設計する |
| 3.6 | Apply retrieval strategies matched to data shape and query pattern | データの形状とクエリパターンに合った検索戦略を適用する |
| 3.7 | Evaluate connection protocols and select the appropriate integration mechanism (MCP, API/CLI, agent-to-agent) | 接続プロトコルを評価し、適切な統合メカニズム（MCP、API/CLI、エージェント間）を選択する |
| 3.8 | Evaluate progressive discovery vs. monolithic context strategy | 段階的ディスカバリーと一括型コンテキスト戦略を比較評価する |

(a) 対応する講座の学習目標［公式・講座］（講座2「Enterprise Integration & Production」、講座4の一部）
- エンタープライズに耐えるデプロイを設計する。コンプライアンス、ID（**SSO／OAuth**）、認可、データの扱い、オブザーバビリティの計装について統合パターンを決め、統合点ごとに適切な手段（API、SDK、MCP、Claude Code）を置く。
- PoC から本番へのチェックリスト。コストとレイテンシを予算に対応づけ、信頼性のパターン（リトライ、フォールバック、サーキットブレーカー）を指定する。選んだアーキテクチャの障害モードとその緩和策を言えること。エージェント型のワークフローを本番で信頼できるものにする。
- マルチプラットフォームの本番システムで、デプロイの入口とプラットフォーム横断の戦略を選ぶ。**直接 API、Bedrock、Vertex、サードパーティ経由**を、レイテンシ、コンプライアンス、コストで比べる（講座4）。

(b) 第三者の観点［第三者］
- 最小権限。不要なツールや権限を与えない（Tutorials Dojo、公式サンプル1と同じ趣旨）。
- MCP の認可は仕様上オプションで、自動では保証されない。STDIO で起動したプロセスが環境から受け継ぐ資格情報と権限を監査する（claudearchitectcertification）。
- エージェントのオブザーバビリティを1つのダッシュボードで端から端まで覆えるか（同）。
- 文書の構造、データの性質、クエリパターンに合わせて、チャンキング、インデックス、検索を設計する（Tutorials Dojo）。
- コンセプト一覧（claudearchitectcertification）: MCP、Agentic Tool Design、Long Document Processing、Authentication & Access Control for Agent Systems、Accuracy-Latency-Cost Tradeoff、Observability & Monitoring for Agents at Scale、Progressive Discovery vs Monolithic Context。

---

### Domain 4: Evaluation, Testing & Optimization（16%）／評価、テスト、最適化

| 便宜番号 | 英語原文［公式］ | 公式日本語訳［公式］ |
|---|---|---|
| 4.1 | Define evaluation metrics (accuracy, latency, cost, safety, security) | 評価指標（精度、レイテンシ、コスト、安全性、セキュリティ）を定義する |
| 4.2 | Design evaluation datasets and test frameworks using mixed methodologies | 複数の方法論を組み合わせて、評価データセットとテストフレームワークを設計する |
| 4.3 | Conduct A/B testing and iterative improvements | A/Bテストと反復的な改善を実施する |
| 4.4 | Diagnose system issues (prompt failure, hallucinations, model mismatch) | システムの問題（プロンプトの失敗、ハルシネーション、モデルの不適合）を診断する |
| 4.5 | Optimize token usage, latency, and cost-performance trade-offs | トークン使用量、レイテンシ、コストとパフォーマンスのトレードオフを最適化する |
| 4.6 | Monitor system performance using logging and observability tools | ロギングツールとオブザーバビリティツールを使用してシステムのパフォーマンスをモニタリングする |

(a) 対応する講座の学習目標［公式・講座］（講座2）
- **本番のコードを書く前に**成功基準を決め、評価スイートを作る。モデルによる評価（model-based）とコードによる評価（code-based）を区別し、評価ワークフローの段階を選ぶ。本番システムへのどんな変更でも、評価を関門にする。
- 稼働中の Claude システムで A/B テストや構造化された実験を計画し、読み解く。仮説を立て、指標を選び、必要なサンプルサイズを見積もり、**結果を言いすぎずに**読む。

(b) 第三者の観点［第三者］
- 「何人かが読んで良いと言った」は根拠にならない。独立に検証した正解付きの保留ケース（held-out）で比べる（claudearchitectcertification）。
- HTTP 200 で返ってきても、stop_reason が想定外なら失敗として扱う。LLM システムの障害のデバッグ（同）。
- 自動評価と人による評価を組み合わせた代表的なデータセット（Tutorials Dojo）。

---

### Domain 5: Governance, Safety & Risk Management（14%）／ガバナンス、安全性、リスク管理

| 便宜番号 | 英語原文［公式］ | 公式日本語訳［公式］ |
|---|---|---|
| 5.1 | Implement guardrails and safety controls | ガードレールと安全管理策を実装する |
| 5.2 | Identify risks, limitations, and failure modes of LLM systems | LLMシステムのリスク、限界、障害モードを特定する |
| 5.3 | Apply human-in-the-loop validation strategies | ヒューマン・イン・ザ・ループによる検証戦略を適用する |
| 5.4 | Ensure compliance with regulations (e.g., GDPR, HIPAA, FedRAMP) | 規制（GDPR、HIPAA、FedRAMPなど）へのコンプライアンスを確保する |
| 5.5 | Address ethical AI considerations (bias, fairness, transparency) | 倫理的なAIに関する考慮事項（バイアス、公平性、透明性）に対処する |

(a) 対応する講座の学習目標［公式・講座］（講座3「Responsible AI, Safety & Risk for Architects」114分）
- モデルの訓練で減らせるリスクと、アプリケーション層がなお強制しなければならないものを区別する。講座の説明では、「Claude が、与えられてもいないルールを守ってくれると思い込むこと」が安全設計の壊れ方として最も多い。
- 入力のスクリーニング、出力のスクリーニング、ツール呼び出しの認可を、リクエスト経路の適切な場所に置く。モデルによるチェックと決定的なチェックを使い分け、システムが**開いた状態ではなく閉じた状態で失敗する（fail closed）**ようにする。
- 不公平な結果がどこで生じうるかを特定し、利用者、規制当局、自分たちのデバッグチームのそれぞれに必要な説明を定める（公平性と透明性を設計に組み込む）。
- 判断を、**確信度、取り消せるかどうか、誤ったときのコスト**に応じて適切なレビュアーや決裁者に回す。
- コンプライアンス上の義務の一つひとつを、**名前の付いた管理策、責任者、証跡**に対応づけ、監査できるようにする。

(b) 第三者の観点［第三者］
- ガードレールは層で考える。システムプロンプトだけに頼らず、権限ポリシーやサンドボックス、高リスクなツール呼び出しへの人の承認を組み合わせる（claudearchitectcertification）。
- リスクの例: プロンプトインジェクション、機密データの露出、過剰な権限、バイアス、信頼できない出力、不適切な自動化（Tutorials Dojo）。
- コンプライアンスは、文書ではなくシステムに組み込んだ実際の管理策で満たす（Whizlabs）。

---

### Domain 6: Stakeholder Communication & Lifecycle Management（14%）／ステークホルダーとのコミュニケーションとライフサイクル管理

| 便宜番号 | 英語原文［公式］ | 公式日本語訳［公式］ |
|---|---|---|
| 6.1 | Conduct structured discovery and requirement gathering | 体系的なディスカバリーと要件収集を実施する |
| 6.2 | Communicate architectural decisions and trade-offs | アーキテクチャ上の決定とトレードオフを伝える |
| 6.3 | Manage stakeholder feedback loops and expectation alignment (including SLAs) | ステークホルダーからのフィードバックループと期待値の調整（SLAを含む）を管理する |
| 6.4 | Document architectures and provide implementation guidance | アーキテクチャを文書化し、実装のガイダンスを提供する |
| 6.5 | Support lifecycle phases (discovery, design, handoff, monitoring, iteration) | ライフサイクルの各フェーズ（ディスカバリー、設計、引き継ぎ、モニタリング、反復）を支援する |

(a) 対応する講座の学習目標［公式・講座］（講座4「Stakeholder Engagement, Lifecycle & GTM」178分）
- 非技術のステークホルダーと構造化されたディスカバリーの会話をし、聞いたことをアーキテクチャの要件と**文書化した前提**に変える。設計が自分の技術的な好みではなく、ビジネスケースにさかのぼれるようにする。
- トレードオフを、ビジネス側が決められる形で示す。選択肢ごとに**コスト、リスク、元に戻すのに何が要るか**を添え、経営や調達のレビューで止まらずに結論が出るようにする。
- デプロイのライフサイクル全体で、ステークホルダーのフィードバックループを作って回す。何がレビューのきっかけになるか、SLA 違反のときに何が必要か、**反復で直すか、アーキテクチャから作り直すか**を決める。同じループにガバナンスのチェックポイントを組み込む。
- パートナーの GTM（市場投入）でのアーキテクトの役割。ディスカバリー、シナリオに沿ったデモ、技術的な反論への対応、Anthropic Applied AI チームとの共同スコーピング。
- 非技術のスポンサーにも価値が分かり、パートナーの知的財産として再利用できる成果文書を作る。
- 引き継ぎ: アーキテクトがいなくなっても続く引き継ぎを設計する（Prep Course 全体の目標）。

(b) 第三者の観点［第三者］
- キックオフを統合先の話だけで終わらせず、許容できる出力品質と、測れる精度の閾値（成功基準）を決める（claudearchitectcertification）。
- 非技術のスポンサーにモデルの選択を説明するときの3つの観点（同。出典が Anthropic の資料とあるが未確認）。
- 合格者の声として「顧客に何を勧めるかを問う、コンサル的な問題が多い」（Whizlabs。伝聞なので未検証）。

---

### Domain 7: Developer Productivity & Operational Enablement（7%、最小）／開発者の生産性と運用支援

| 便宜番号 | 英語原文［公式］ | 公式日本語訳［公式］ |
|---|---|---|
| 7.1 | Configure Claude tools and environments for teams (e.g., Claude Code) | チーム向けにClaudeのツールと環境（Claude Codeなど）を構成する |
| 7.2 | Improve developer workflows using AI-assisted tooling | AI支援ツールを使用して開発者のワークフローを改善する |
| 7.3 | Support debugging and operational issue resolution | デバッグと運用上の問題解決を支援する |

(a) 対応する講座の学習目標［公式・講座］（講座5「Team Enablement & Operational Productivity」45分）
- チームのために Claude のツールと環境を構成する。共有の設定、展開（ロールアウト）のパターン、**Skills の配布戦略**、チームの設定に含めるべき**支出の管理**。
- AI ツールで開発者のワークフローを改善し、AI が生成した成果物を本番の前に信頼できる状態に保つレビューの規律を定める。
- 症状をアーキテクチャ上の原因に結びつけて、デバッグと運用上の問題解決を支援する。チームが自走できるように育てる。

(b) 第三者の観点［第三者］（具体的な機能名は公式ガイドに書かれていない）
- 繰り返し使うレビュー手順は、リポジトリに入れたプロジェクトスキルで共有する。個人の CLAUDE.md や新しい MCP サーバーは不適（claudearchitectcertification）。
- Plan Mode を実行前にいつ使うか。Skill と CLAUDE.md のルールの違い（同）。
- 組織全体で、server-managed settings で上書きできないセキュリティ設定を強制し、管理されたプラグインマーケットプレイスで承認済みのツールを配る（Tutorials Dojo。複数選択のサンプル）。

---

## 5. シナリオ／ケーススタディ

- **CCAR-P の試験ガイドには、題名付きのシナリオの例示がない。**CCAR-F のような「6本から4本」のシナリオ構成の記述もない。［公式］
- 公式 FAQ は全試験について「択一と、シナリオに基づく複数選択」で出題すると書いている。［公式］
- 公式サンプルの3問は、どれも**短い状況説明が1問で完結する形**（→ 7章）。［公式］
- 想定される舞台: ガイドが挙げる業界は金融、医療、小売、テクノロジー、教育、政府。［公式］§3
- 参考までに、CCAR-F の公式シナリオ6本: Customer Support Resolution Agent、Code Generation with Claude Code、Multi-Agent Research System、Developer Productivity with Claude、Claude Code for Continuous Integration、Structured Data Extraction。［公式・CCAR-F ガイド］（**CCAR-P のものではない**）
- 第三者の記述（**公式の出題構成ではない**）:
  - claudearchitectcertification の「CCA-P は CCA-F と共通の4シナリオ（Developer Productivity Tools、Agentic Tool Design、Long Document Processing、Claude for Operations）を使う」は、**同サイトの学習用シナリオ集**の話。公式の試験構成と読み違えないこと。［第三者］
  - Educative の講座には、独自のケース「Atlas Financial Capstone Cross-Domain Scenario」がある。［第三者］
- 教材への示唆: 練習問題は「独立した短いシナリオ＋択一または複数選択（選ぶ数を明記）」を基本にするのが公式の形に近い。複数の問題で共有するケーススタディを作るなら、「教材独自の形式」と明記する。

---

## 6. 範囲内／範囲外

### 6-1. CCAR-P の公式ガイドが範囲として挙げるもの
- CCAR-P のガイドには、CCAR-F にある**技術一覧、In-Scope Topics、Out-of-Scope Topics の付録がない。**範囲は、本文と38のタスクステートメントから読み取るしかない。［公式］
- 本文やブループリントに明記されている語［公式］:
  - モデルの選択、アーキテクチャ、API パターン（§1、§2）
  - プロンプトとコンテキストのエンジニアリング。zero-shot、few-shot、CoT、システムプロンプト、テンプレート、ガードレール、コンテキストウィンドウ、トークン管理、キャッシング、モジュール型プロンプト、**Skills**（D2）
  - workflow、agentic、augmented LLM、マルチエージェントのオーケストレーション、分解（D1）
  - **MCP、API/CLI、エージェント間（agent-to-agent）**、認証と認可、オブザーバビリティ、**RAG（チャンキング、インデックス、検索戦略）**、段階的ディスカバリーと一括型コンテキスト（D3）
  - 評価指標、データセット、A/B テスト、診断、ロギング（D4）
  - **GDPR、HIPAA、FedRAMP**、バイアス、公平性、透明性、HITL（D5）
  - ディスカバリー、SLA、文書化、ライフサイクル（D6）
  - **Claude Code**（D7）
  - 準備の方法として、Claude API、モデル、プロンプトエンジニアリング、MCP、Skills の公式ドキュメントを読むこと（§7）
- 頼まれた項目の確認:

| 項目 | ガイドでの扱い | 補足 |
|---|---|---|
| Claude API | §7 で準備資料として名指し［公式］ | |
| Agent SDK | **ガイドに名前はない**［公式。全文検索で確認］ | 講座1が入口の一つとして「an SDK」を挙げる［公式・講座］ |
| Claude Code | D7 で名指し［公式］ | |
| MCP | D3、§7［公式］ | |
| Bedrock、Vertex AI、Foundry | **ガイドに記載なし**［公式］ | 講座4が「直接 API、Bedrock、Vertex、サードパーティ経由をレイテンシ、コンプライアンス、コストで比べる」を学習目標にしている［公式・講座］。Foundry はガイドにも講座ページにもない。Architect ロールの紹介文は「デプロイ先プラットフォームの選択」に触れている［公式・Partner Academy］ |
| ガバナンス | D5、§1、§2［公式］ | |
| コスト設計 | D1（コストの柱）、D2（トレードオフ）、D4（コストと性能の最適化）［公式］ | 呼び出し量、トークン、コストの見積もり、支出の管理［公式・講座］ |

### 6-2. 範囲外
- **CCAR-P の範囲外は公式には書かれていない（不明）。**
- CCAR-F の Out-of-Scope Topics を CCAR-P にそのまま当てはめてはいけない。CCAR-F で範囲外とされた次の項目は、CCAR-P では**範囲内になっている、またはそう読める**。［公式の文書どうしを比べた推定］
  - 「プロンプトキャッシュの実装の詳細（存在を知っている以上のこと）」→ CCAR-P のサンプル2がキャッシュの使い方そのものを問う。
  - 「OAuth、API キーのローテーション、認証プロトコルの詳細」「API の認証」→ CCAR-P の D3 に認証と認可がある。講座2は SSO／OAuth に触れる。
  - 「埋め込みモデルやベクトル DB の実装の詳細」→ CCAR-P の D3 に RAG のチャンキングとインデックスがあり、サンプル3の解説は埋め込みの不一致に触れる。どこまで深く問うかは不明。
  - 「特定のクラウド事業者の設定（AWS、GCP、Azure）」→ 講座4が Bedrock と Vertex を比べる。設定の細部まで問うかは不明。
  - 「性能のベンチマークやモデルの比較指標」→ CCAR-P の D2（モデル選択）と D4（指標）。
- CCAR-F で範囲外とされ、CCAR-P でどうなるか**分からない**もの: ファインチューニング、モデルの内部構造や訓練、Constitutional AI や RLHF、Computer use、画像（vision）、ストリーミングや SSE、トークン化の仕様、レート制限や料金の計算。（第三者の練習問題では、ファインチューニングが「やりすぎの誤答」としてよく使われる。［第三者］）

### 6-3. CCAR-F（Foundations）との違い

| 観点 | CCAR-F | CCAR-P |
|---|---|---|
| 問題数 | 60 | 63 |
| 構成 | 6本のシナリオから4本を出題 | シナリオ構成の記述なし |
| 料金 | $125（2026-06-30 に $99 から値上げ） | $175 |
| ドメイン | 5（Agentic Architecture & Orchestration 27%、Tool Design & MCP Integration 18%、Claude Code Configuration & Workflows 20%、Prompt Engineering & Structured Output 20%、Context Management & Reliability 15%） | 7（3章） |
| タスクの書き方 | 30のタスクステートメントに、詳しい知識・スキルの箇条書き付き | 38のタスクが1行ずつで、詳細はない |
| 付録 | 技術一覧、In-Scope、Out-of-Scope あり | なし |
| 想定経験 | Claude の API、Agent SDK、Claude Code、MCP で6か月以上の実務 | システムアーキテクチャで3年以上、本番 LLM で6か月以上 |
| ガイドの厚さ | 39ページ | 11ページ |

以上はすべて［公式］CCAR-F と CCAR-P のガイドを比べたもの。

Professional で新たに問われる、または比重が増えるもの（2つのガイドの比較）:
- 新しい領域: **D5 ガバナンス（規制、倫理、HITL）、D6 ステークホルダーとライフサイクル、D4 評価の体系（指標、データセット、A/B テスト）**。D5、D6、D7 の合計35%は CCAR-F のブループリントにない領域、と第三者（claudecertificationguide）は書いている。
- 技術の新しい論点: **RAG の設計、認証と認可、大規模なオブザーバビリティ、モデルの選択、プロンプトキャッシュ、統合手段の選び分け（MCP、API/CLI、agent-to-agent）、段階的ディスカバリーと一括型コンテキスト、ビジネス価値と SLA**。
- 比重が下がるもの: CCAR-F の中心だった Claude Code や Agent SDK の設定の細部（CLAUDE.md の階層、frontmatter、フック、Batches API など）。CCAR-P では D7 の7%に縮み、ガイドに具体的な設定名は出てこない。
- 問い方の違い: CCAR-F は「どう実装・設定するか」、CCAR-P は「どれを選び、どう統制し、どう説明するか」の色が濃い。日本の第三者（サーバーワークス）は、CCAR-P を AWS の Solutions Architect – Professional に相当する、複雑なシナリオへの対応力を問う資格と見ている。［第三者］

---

## 7. 問題の傾向

### 7-1. 公式サンプル問題（ガイド §8。全3問で、どれも4択の単一解答）
ガイドは、これらが実際の問題バンクから取ったものではなく、出題スタイルと認知レベルを示す例だと断っている。［公式］以下は要旨と狙いを自分の言葉でまとめたもので、文面の転載ではない。

| # | 分野 | 状況の要旨 | 正解の方向 | 誤答の作り方（公式の解説から） |
|---|---|---|---|---|
| 1 | D3 統合 | サポート用エージェントに、業務に要らない破壊的なツールまで付いている。最小権限の観点で、リスクを最も下げる変更は何か。 | 要らないツールを**構成から外す**（攻撃面そのものをなくす） | ① ログを足す＝発見的な統制で、権限は減らない ② 実行前の確認を足す＝補完的な統制 ③ もっと大きなモデルにする＝認可の範囲とは無関係 |
| 2 | D2 モデル、プロンプト | 毎回同じ大きな静的プロンプトと方針文書を送り、そのあとに短い可変の入力が続く。レイテンシとコストの両方を最も直接に改善するには。 | 静的な部分を前に置き、**プロンプトキャッシュを有効にする** | ① 文書を切り詰める＝必要な情報が消える ② タスクへの適合を無視して最小モデルにする＝品質のリスク ③ few-shot の欄に移す＝キャッシュできる接頭辞にはならない |
| 3 | D4 評価、最適化 | RAG が文書の更新後に急に、自信満々で誤った答えを返す。モデルもレイテンシも変わっていない。まずどこを調べるか。 | **検索・インデックスの段**（無関係な、または古いチャンクを返している。インデックスの再作成の失敗や埋め込みの不一致など） | ① 重みが黙って変わった ② temperature が低すぎる ③ コンテキストウィンドウが縮んだ。どれも「文書の更新」というきっかけと因果がつながらない |

公式サンプルから読み取れる狙い（このメモの分析）:
- **問いは最上級で聞く。**「最も効果的に下げる」「最も直接に」「最も可能性が高い、最初に調べる場所」。部分的には正しい選択肢がほかにもあり、その中から**最善の1つ**を選ばせる。
- **根本原因と的確な対処を選ばせる。**正解は「原因を取り除く」「必要なものを残したまま改善する」もの。誤答は、①監視や確認でリスクを「管理」するだけのもの、②モデルを大きく、または小さくするという筋違いのつまみ、③必要なものを捨てる乱暴な最適化、④観測された事実（何が変わり、何が変わっていないか）と因果がつながらない原因。
- **状況の中の事実が、手がかりや除外条件になる。**「サポート業務に必要なのは閲覧と下書きだけ」「モデルもレイテンシも変わっていない」「レイテンシとコストの両方が問題」などの1文で、選択肢が絞られる。
- 公式サンプルはすべて単一解答だが、本番には複数選択の問題もある（選ぶ数は明記される）。［公式］

### 7-2. 第三者の分析［第三者］（参考）
- 問題は「状況 → 制約 → 問い → 選択肢」の形。選択肢は多くの場合、**正解、やりすぎ、症状だけを抑えるもの、ほぼ合っているもの**の4種類。誤答の型として、制約の見落とし、大きすぎる手段、症状への対処を挙げている（claudearchitectcertification）。
- 「ログを足す」「確認を足す」「もっと大きく良いモデルを使う」は**繰り返し出る誤答**。リスクを取り除くことが論点の問題では、まず正解にならない。2つとも正しく見えるときは、たいていトレードオフ（コスト、レイテンシ、コンプライアンス、信頼性、監査しやすさのどれを優先する状況か）を問うている（Educative）。
- 合格者の声として「顧客に何を勧めるかを問う、コンサル的な問題が多く、技術と同じくらい業務の判断が要る」（Whizlabs。伝聞で未検証）。
- 第三者のサンプルの題材: 決まった順序の処理には固定のワークフロー（Tutorials Dojo の単一解答）。組織全体での Claude Code の統制は、managed settings とプラグインマーケットプレイスの組み合わせ（Tutorials Dojo の2つ選ぶ問題）。

### 7-3. 教材作りへの示唆（このメモの提案）
- 問題数は配点にそのまま比例させられる（100問なら 17/13/19/16/14/14/7）。
- 複数選択（「2つ選べ」など）も一定数入れ、選ぶ数を必ず書く。
- 誤答は上の型（発見的・補完的な統制、筋違いのモデル変更、必要な情報を捨てる最適化、状況と因果がつながらない原因、やりすぎ）で作ると、公式の問い方に近い。
- 公式の問題文や第三者の問題文の転載、言い換えにとどめた流用はしない。状況設定は自前で作る。

---

## 8. 公式の学習リソース

- **試験ガイド**（英語版 v1.0 と日本語版 v1.0。Partner Academy の資格ページから PDF でダウンロード）。FAQ は、試験範囲の正式な情報源はガイドだと明言している。［公式］
  - 2026-11-17 に更新版が公開される予定。［公式］
- **Claude Certified Architect – Professional Prep Course**（Anthropic Partner Academy、無料、パートナー限定、5講座）［公式］
  1. Claude Platform & Solution Design（238分）
  2. Enterprise Integration & Production（158分）
  3. Responsible AI, Safety & Risk for Architects（114分）
  4. Stakeholder Engagement, Lifecycle & GTM（178分）
  5. Team Enablement & Operational Productivity（45分）
  - 合計は約733分（約12.2時間）［推計］。講座ページの言語表示は English。日本語の準備コンテンツもあると FAQ は言うが、この講座の日本語版があるかは未確認。
  - 講座全体の学習目標（要旨）: 曖昧な課題をスコープの決まった解決策にする。PoC から本番へ進める。安全の仕組みを一通り設計する。評価を受け入れ基準と変更の関門にする。判断を適切なレビュアーに回す。コンプライアンスを管理策に対応づける。ディスカバリーをし、トレードオフを示し、引き継ぎを設計する。チームを自走させる。
  - 講座が事前に受けておくよう勧めるもの: Claude 101、Claude Code in Action、AI Fluency: Framework & Foundations、Building with the Claude API、Introduction to Model Context Protocol、AI Capabilities and Limitations。［公式・講座］
- ガイド §7 の準備の勧め: ブループリントで自己評価する。Claude API、モデル、プロンプトエンジニアリング、MCP、Skills の公式ドキュメントを読む。RAG、評価、オブザーバビリティを含む E2E の Claude ソリューションを1つ以上作って運用する。モデル選択、統合プロトコル、セキュリティのトレードオフについて判断の練習をする。サンプル問題を解く。［公式］
- 公式の模擬試験: 以前の配信基盤にあった模擬試験は、Pearson への移行で廃止された。今はガイドのサンプル問題だけ。［公式］FAQ
- 第三者の有料・無料の対策（参考）: Tutorials Dojo、Whizlabs（200問）、claudecertificationguide（38レッスン、模試5回）、aguidetocloud（250問、単一解答だけ）、claudearchitectcertification、Educative、Training Camp（ブートキャンプ）、FindSkill など。［第三者］

---

## 9. 出典一覧（確認日はすべて 2026-11-16）

### 公式（直接読んだもの）
| # | 出典 | URL | 根拠にした事実 |
|---|---|---|---|
| O1 | **Claude Certified Architect – Professional Exam Guide**（英語、v1.0、2026年7月発効。PDF の作成は 2026-07-09 JST） | https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542810%2FClaude+Certified+Architect+%E2%80%93+Professional+Exam+Guide.pdf （Partner Academy の資格一覧からのリンク） | 名称、コード、対象者、MQC、前提条件、形式、配点、タスクステートメント、サンプル問題、採点、ポリシー、更新 |
| O2 | 同ガイドの**日本語版**（v1.0。PDF の作成は 2026-10-20） | https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1792453714%2FClaude+Certified+Architect+-+Professional+Exam+Guide+%28Japanese%29.pdf | 公式の日本語のドメイン名とタスクの訳 |
| O3 | Anthropic Partner Academy の認定 FAQ | https://anthropic-partners.skilljar.com/page/faq-certifications | 料金、割引、受験資格、言語、形式、採点、有効期間、更新、再受験、キャンセル（48時間／1時間）、SSO の手順、模擬試験の廃止 |
| O4 | Pearson VUE「Claude Certification Program by Anthropic」（最終更新 2026-11-12） | https://www.pearsonvue.com/us/en/anthropic.html | 4試験のコード、**12月7日の出題更新と11月17日の新ガイド公開**、再受験、テストセンターの48時間ルール |
| O5 | Partner Academy の資格一覧と告知バナー | https://anthropic-partners.skilljar.com/page/partner-certifications | レベル、料金、Architect ロールの説明、12月7日の更新の告知、ガイドの PDF のリンク |
| O6 | Partner Academy の CCAR-P 資格ページ | https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification | 登録ページがあること |
| O7 | CCAR-P Prep Course（講座一覧と5講座それぞれのページ） | https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional （各講座は /claude-platform-solution-design、/enterprise-integration-production、/responsible-ai-safety-risk-for-architects、/stakeholder-engagement-lifecycle-gtm、/developer-productivity-enablement） | 講座名、時間、学習目標（4章の (a)、Bedrock と Vertex への言及） |
| O8 | Anthropic Certification Exam Policy（2026-06-25 更新） | Partner Academy の資格ページから PDF にリンク | 守秘義務、試験中の AI 利用の禁止、不正への処分 |
| O9 | Claude Certified Architect – Foundations Exam Guide（v1.0） | https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf | CCAR-F との比較（60問、6本から4本のシナリオ、5ドメイン、In-Scope と Out-of-Scope） |
| O10 | claude.com「Four role-based certifications for the people who put Claude to work for customers」（2026-07-23） | https://claude.com/resources/articles/four-role-based-claude-certifications | 4資格の位置づけ、Applied AI チームによる設計、Pearson と Credly |

### 第三者
| # | 出典 | URL | 使った点と評価 |
|---|---|---|---|
| T1 | claudearchitectcertification.com の試験ガイドページ | https://claudearchitectcertification.com/exam-guide/ccar-p.md | 形式と配点は公式と一致。「63 scored items」は公式の裏付けなし。シナリオ4本は同サイトの学習用 |
| T2 | 同サイトの資格ページ | https://claudearchitectcertification.com/certifications/ccar-p.md | ドメインごとのコンセプト一覧。ドメイン名の一部が短縮されている |
| T3 | 同サイトの PDF（題名は「Independent Exam Guide」。公式ガイドではない。2026-10-02 時点） | https://claudearchitectcertification.com/downloads/cca-p-exam-guide.pdf | 分野ごとの問題数の目安、独自のサンプル7問、誤答の型の分析 |
| T4 | Tutorials Dojo CCAR-P Study Guide（2026-08-11 更新） | https://tutorialsdojo.com/ccar-p-claude-certified-architect-professional-study-guide/ | ドメインごとの観点の補足、サンプル2問（うち1問は複数選択） |
| T5 | A Guide to Cloud（cert tracker） | https://www.aguidetocloud.com/cert-tracker/anthropic-ccar-p/ | 形式と配点は一致。Foundations は前提ではない |
| T6 | Training Camp | https://trainingcamp.com/what-is-claude-certified-architect-professional/ | 720≠72%。各試験の問題数（CCAO-F 60、CCDV-F 53、CCAR-F 60、CCAR-P 63） |
| T7 | claudecertificationguide.com（/ccar-p/learn、/architect-professional、/blog/claude-certified-architect-professional-exam-guide） | https://claudecertificationguide.com/ccar-p/learn ほか | 38レッスン＝38の目標。D5〜D7 の35%は Foundations にない |
| T8 | FindSkill | https://findskill.ai/blog/claude-certified-architect-professional-exam/ | 配点は一致。最初の合格者は7月10日の週 |
| T9 | Whizlabs | https://www.whizlabs.com/blog/?p=102175 | 12月7日の更新、言語、合格者の傾向の声（伝聞） |
| T10 | claudelog | https://claudelog.com/faqs/what-are-claude-certifications/ | CCA-P は通称であること。7月8日の発表（Reddit 経由） |
| T11 | vanja.io | https://vanja.io/claude-certification/ | FAQ の要約。前提条件なし |
| T12 | K21 Academy | https://k21academy.com/claude/claude-certified-architect-professional/ | 形式は一致 |
| T13 | Educative（CCAR-P 講座のレッスン「What this exam tests」） | https://www.educative.io/courses/claude-certified-architect-professional-exam/what-this-exam-tests | 誤答の型（ログ、確認、大きいモデル） |
| T14 | サーバーワークス エンジニアブログ（2026-07-09、日本語） | https://blog.serverworks.co.jp/anthropic-claude-certification-overview-2026-07-09 | 4資格の比較。ガイドのページ数（CCAR-F 39、ほかは11〜14） |
| T15 | IT Brief UK（2026-08-03） | https://itbrief.co.uk/story/pearson-anthropic-expand-claude-certification-programme | Pearson との提携の報道 |
| T16 | claudecertifiedarchitects.com（検索結果の要約だけで、本文は未読） | https://www.claudecertifiedarchitects.com/blog/claude-exam-update-december-2026/ | 12月の更新の中身は未公表 |
| — | Medium（@srinib100、@roanmonteiro） | — | 403 で読めず、使っていない |

### 出典どうしの食い違いと見立て
1. **試験コード**: 公式（O1、O2、O4）は **CCAR-P**。CCA-P は通称（T10）で、T1〜T3 は CCA-P を主に使う。→ **CCAR-P が正式**。教材では「CCAR-P（通称 CCA-P）」と書くのがよい。
2. **キャンセルの期限**: ガイド v1.0 は「24時間前まで」。FAQ と Pearson VUE（どちらも11月に更新）は「テストセンターは48時間前、OnVUE は1時間前」。T1 はガイドの24時間を引いている。→ **新しい FAQ と Pearson VUE が有力。**11月17日の新ガイドで確認する。
3. **申込の手順**: ガイドは「Pearson VUE アカウントを作る」。FAQ は「2026-11-12 から SSO で、別のアカウントは不要」。Pearson VUE のページには古い記述（ユーザー名とパスワードがメールで届く）も残っている。→ FAQ が最新。
4. **前提条件**: 聞きかじりの「前提条件がある」は、資格としては**誤り**（公式は「必須の前提なし、CCAR-F なしで受験できる」）。ただし**パートナー組織に所属していることは受験資格として必須**。この2つが混同されたものと思われる。claude.com と IT Brief の「どの道も Foundations から始まり Professional に進む」は道筋の説明で、受験の要件ではない。
5. **ドメイン名**: T1 と T2 は D5 と D6 の名前から「Management」を落としている。→ 公式名を使う。
6. **シナリオ**: T1 の「CCA-F と共通の4シナリオ」は同サイトの学習教材の話。公式の CCAR-P には、シナリオ束の構成の記述がない。
7. **採点対象の問題数**: T1 は「63 scored」、公式は「63 items」だけ。→ 非採点の問題があるかは不明。
8. **開始日**: 7月8日（T10）、7月9日 JST（T14 と PDF のメタデータ）、7月10日の週に最初の合格者（T8）、7月23日（O10 の公式記事）。→ **ガイドの公開と受験の開始は2026年7月上旬（7月8日ごろ）、公式記事は7月23日**と見るのが妥当。
9. **ロールの呼び方**: Pearson VUE は「Practitioner, Architect, Developer」、FAQ は「Associate, Developer, Architect」。CCAR-P には影響しない。

### 手元に保存した資料（中身を確かめるとき用。公式の試験ガイドはリポジトリに入れず、手元の `reference/` にだけ置く）
- 公式ガイド（英語）の PDF とテキスト: `CCAR-P/reference/CCAR-P_exam_guide_v1.0_en.pdf`（テキストは同じフォルダの `CCAR-P_exam_guide_v1.0_en.txt`）
- 公式ガイド（日本語）の PDF: `CCAR-P/reference/CCAR-P_exam_guide_v1.0_ja.pdf`
- CCAR-F のガイドの PDF: `CCAR-F/reference/CCAR-F_exam_guide_v1.0_en.pdf`

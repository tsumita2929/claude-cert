# Claude 認定資格（Claude Certification Program）制度全体メモ

- 確認日: 2026-11-16
- 表記: **［公式］** は Anthropic / Pearson VUE の公式ページ・公式 PDF を直接読んで確認したもの。**［第三者］** は対策サイトなどの非公式情報。**［見立て］** はこのメモを書いた側の判断。
- 公式の一次情報はほぼすべて直接読めた（Partner Academy の認定ページ・FAQ・ポリシー・受験資格ページ、4資格の公式試験ガイド PDF〔英語・日本語〕、試験ポリシー PDF、規約 PDF、Pearson VUE の Anthropic ページ、anthropic.com と claude.com の発表記事）。読めなかったのは Pearson VUE の試験一覧・テストセンター検索（対話型の画面で、自動取得ではセッション切れ）と、SSO 手順 PDF（未取得）だけ。

---

## 追記（2026-11-18）: 更新版ガイドの公開と、5つ目の資格

2026-11-18 に、認定ページ（`partner-certifications`）にリンクされている試験ガイドの PDF をすべて取得して読み、保存してある v1.0 と語単位で比べた。以下はすべて ［公式: 各試験ガイド PDF］。このメモの本文（0章以降）は 2026-11-16 時点のままなので、食い違う箇所はこの追記を正とする。

**教材の方針（2026-11-18、プロジェクトの持ち主の判断）: 教材は、改訂前（2026-12-06 までの試験）のガイドに基づいたままにする。** 12/7 発効版への付け替えは行っていない。付け替えるときの材料として、差分を下にまとめておく。

### A. 現行のガイドは4資格とも v1.1（2026年11月発効）になった

- 変わったのは、申し込み・本人確認・サポートの章だけ（改訂履歴は「Registration, identification, and support updates」）。**分野、配点、問題数、サンプル問題は v1.0 と同じ。** CCAR-F も v1.1 になっている。
- 申し込みの手順が、SSO で Pearson に移って Pearson で支払う流れに書き換わった（2-2 の FAQ の内容と一致）。
- キャンセルと予約変更の期限が、**OnVUE は1時間前まで、テストセンターは48時間前まで**になった（v1.0 の「24時間前まで」は消えた。2-4 の食い違いは解消）。予約変更では価格（割引を含む）が保たれる。キャンセルすると自動で返金が始まり、7〜10営業日かかる。
- 登録名の修正は、Partner Academy の受験プロフィールで自分で行う（自分で直せるのは1回。プロフィールを確定すると固定される）。テストセンターの予約には1日1回しか反映されないので、24時間以上前に直す。
- 持ち込み禁止の例に、スマートグラスが加わった。
- 保存先: 各試験の `reference/<試験>_exam_guide_v1.1-2026-11_{en,ja}.{pdf,txt}`。

### B. 2026-12-07 発効のガイド（CCAO-F・CCDV-F・CCAR-P）で変わること

表紙の表記は3つとも「Version 1.1 · Effective December 7, 2026」（改訂履歴は「Revised objectives, descriptions, and sample items」）。保存先は `reference/<試験>_exam_guide_v1.1-2026-12-07_{en,ja}.{pdf,txt}`。

| 項目 | CCAO-F | CCDV-F | CCAR-P |
|---|---|---|---|
| 問題数 | 60 → **70（採点対象 60 ＋ 採点対象外 10）** | 53 → **70（同左）** | 63 → **70（同左）** |
| 分野の数 | 7 → **6**（分野7「トラブルシューティングと最適化」がなくなり、内容はほかの分野へ） | 8（名称はほぼ同じ。分野8は「Tools and MCP」） | 7（名称はほぼ同じ） |
| 配点 | 15／20／15／18／15／17 | 17／20／8／10／12／15／8／10 | 18／13／21／17／16／7／8 |
| 改訂前の配点 | 14／21／12／16／12／15／10 | 14.7／33.1／3.1／2.6／16.8／11.0／8.1／10.6 | 17／13／19／16／14／14／7 |
| スキルの数 | 21（スキルごとの配点はない） | 24（改訂前は25で、スキルごとの配点があった。新版にはない） | 39 |
| 時間・合格点・料金 | 変更なし（120分、720、$99） | 変更なし（120分、720、$125） | 変更なし（120分、720、$175） |

- 採点対象外の問題は、どれかが示されず、スコアに影響しない（将来の出題のための試行）。配点の比率は、採点対象の問題についてのもの。
- 分野の新しい名称（英語／公式の日本語）:
  - CCAO-F: 1 Task Definition and Prompting／タスク定義とプロンプト作成、2 Output Evaluation and Quality Control／出力の評価と品質管理、3 Capability, Model, and Context Selection／機能、モデル、コンテキストの選択、4 Workflow Design and Integration／ワークフローの設計と統合、5 Configuration and Knowledge Management／設定とナレッジ管理、6 Responsible Use, Data Protection, and Governance／責任ある利用、データ保護、ガバナンス
  - CCDV-F: 1 Agents and Workflows、2 Applications and Integration、3 Claude Code、4 Eval, Testing, and Debugging、5 Model Selection and Optimization、6 Prompt and Context Engineering、7 Security and Safety、8 Tools and MCP（日本語名は改訂前と同じ）
  - CCAR-P: 1 Solution Design and Architecture、2 Claude Models, Prompting, and Context Engineering、3 Integration、4 Evaluation, Testing, and Optimization、5 Governance, Safety, and Risk Management、6 Stakeholder Communication and Lifecycle Management、7 Developer Productivity and Operational Enablement（日本語名は改訂前と同じ）
- 新しく名前が挙がった主な話題（改訂前の教材では薄い、または扱っていないもの）:
  - CCAO-F: AI Fluency の4つの能力（Delegation、Description、Discernment、Diligence）、コード実行による分析（code-executed analysis）、メモリの管理とシークレットチャット（incognito chats）、モデルとエフォート（effort）の選択、Skill の版、第三者の Skill やコネクタへの信頼、ポリシーの不備と教育の不備の区別。ガイドは「料金、コンテキストウィンドウのサイズ、レート制限など、公開されている数値の記憶は求めない」と明記している。
  - CCDV-F: 配点が大きく動いた（分野2が 33.1% → 20%、分野3 Claude Code が 3.1% → 8%、分野4 評価・テスト・デバッグが 2.6% → 10%）。Claude Managed Agents、プラグイン、Rules ファイル、Files API、adaptive thinking とエフォート、キャッシュのブレークポイントの置き方（単一・多層・ローリング）、人手のラベルで較正した LLM-as-judge とゴールデンセット、グラウンディングと出典の引用、ワークスペース単位のキーと Admin キー。
  - CCAR-P: 分野6（ステークホルダー）が 14% → 7% に半減。デプロイ先のサーフェス（Anthropic API、Amazon Bedrock、Google Vertex AI、Microsoft Foundry）とエージェントランタイム（Messages API のループ、自前の Agent SDK やヘッドレスの Claude Code、Claude Managed Agents）の選択、コンテキスト編集・メモリツール・コンパクション、contextual retrieval、冪等性キーなど本番の信頼性の制御、LLM-as-judge のバイアス、モデルの版の移行、プラグインとマーケットプレイスと managed settings、権限モード。
- 公式サンプル問題は3資格とも新しい3問に差し替わった（新しいガイドの7章）。

### C. 5つ目の資格: Claude Certified Developer – Professional（CCDV-P）

- 試験ガイド v1.0（2026年11月発効）の PDF（英語・日本語）が、認定ページの HTML からリンクされている。保存先は `shared/reference/CCDV-P_exam_guide_v1.0-2026-11_{en,ja}.{pdf,txt}`。
- 70問（採点対象 60 ＋ 採点対象外 10）、120分、720、$175、有効期間12か月。前提条件はなし（CCDV-F の取得を推奨）。
- 8分野: 1 Advanced Agent Architecture and Orchestration 17%／2 Production Integration, Reliability, and Knowledge Grounding 20%／3 Observability and Production Monitoring 12%／4 Advanced Debugging and Incident Response 10%／5 Evaluation Engineering and Quality Assurance 12%／6 Cost and Latency Optimization at Scale 8%／7 Runtime Guardrails and Production Security 11%／8 Agent Fleet Operations for Software Delivery 10%。
- 2026-11-18 の時点で、認定ページの一覧の表（料金・申し込み）と Pearson VUE のページには、まだ4資格しか載っていない。**受付の開始日は不明。** この資格の教材は作っていない。

---

## 0. いちばん大事な最新情報（教材づくりに直結）

（2026-11-16 時点の記述。更新版ガイドの中身は、冒頭の「追記（2026-11-18）」を参照。）

1. **2026-12-07 に試験内容が更新される。** 対象は **Associate – Foundations（CCAO-F）、Developer – Foundations（CCDV-F）、Architect – Professional（CCAR-P）** の3つ。**更新版の試験ガイドは 2026-11-17（このメモの翌日）に公開予定**。12/7 以降に受ける人は更新版ガイドで準備するように、とある。Architect – Foundations（CCAR-F）は対象として挙がっていない。［公式: Pearson VUE の Anthropic ページ "Certification exams update on December 7, 2026"］
   - 何が変わるか（問題数・ドメイン・配点）は、このメモの時点では**不明**。第三者サイトでこの更新に触れているものは見つからなかった。
   - 試験が新しいバージョンになると、再受験の待機期間と受験回数のカウントはリセットされる。［公式: Certification policies ページ］
2. 2026-11-12 から申し込みの流れが変わった。Partner Academy から Pearson に SSO（シングルサインオン）で入り、**支払いは Pearson のチェックアウトで行う**（それまでは Partner Academy で支払っていた）。［公式: FAQ］
3. 試験と対策コースは **英語と日本語** で提供される。4資格すべてに日本語版の公式試験ガイド PDF がある。［公式: FAQ、認定ページ］

---

## 1. 資格の一覧（2026-11-16 時点で存在するのは4つ）

公式試験ガイド（4資格とも Version 1.0、Effective July 2026）の "Exam Details at a Glance" と Partner Academy の認定ページから。

| 項目 | Associate – Foundations | Developer – Foundations | Architect – Foundations | Architect – Professional |
|---|---|---|---|---|
| 正式名称 | Claude Certified Associate – Foundations | Claude Certified Developer – Foundations | Claude Certified Architect – Foundations | Claude Certified Architect – Professional |
| 試験コード（公式） | **CCAO-F** | **CCDV-F** | **CCAR-F** | **CCAR-P** |
| コミュニティでの略称［第三者］ | CCA-A など | CCD-F | CCA-F | CCA-P |
| 役割（Role） | Associate | Developer | Architect | Architect |
| レベル（Level） | Foundations | Foundations | Foundations | Professional |
| 対象者（要旨） | Claude を日々の生産性ツールとして使い、Claude Projects を作る人。業務、マーケティング、PM、教育、広報、コンサルタントなど。技術力は「限られている〜中程度」。API で開発する人や、エージェント型システムを設計する人は対象外 | 本番品質の Claude アプリ、エージェント、ワークフローを作って出荷する AI/ML エンジニア、テックリード、シニアソフトウェアエンジニア | Claude で本番アプリを設計・実装するソリューションアーキテクト | エンタープライズ規模で Claude ソリューションを設計し、ガバナンスを担うアーキテクト |
| 推奨経験（必須ではない） | 職場で Claude を日常的に実務で使っていること。ソフトウェア開発や API の経験は不要 | ソフトウェアエンジニアリング 1〜5年、Claude などの LLM の実務 6か月以上、Python/TypeScript、REST API・CLI | Claude API、Agent SDK、Claude Code、MCP での実務 6か月以上 | システムアーキテクチャ／プラットフォームエンジニアリング 3年以上、本番環境での Claude などの LLM 経験 6か月以上 |
| 前提条件 | なし | なし | なし | なし（Foundations を持っていなくても受けられる） |
| 開始時期 | 2026-07-23 の公式記事で新設を発表［公式］。受付開始は 2026-07-13 とする第三者もある［第三者: findskill.ai］ | 同左 | **2026-03-12**（Claude Partner Network の発表と同時）［公式］ | 2026-07-23 の公式記事で新設を発表［公式］ |
| 料金（定価、USD） | **$99** | **$125** | **$125**（2026-06-30 に $99 から値上げ） | **$175** |
| 問題数 | **60** | **53** | **60**（6つのシナリオのうち4つが出る） | **63** |
| 時間 | 120分 | 120分 | 120分 | 120分 |
| 合格点 | スケールスコア 100〜1,000 のうち **720** | 720 | 720 | 720 |
| 出題形式 | 択一（multiple-choice）と複数選択（multiple-response）。複数選択は選ぶ数が問題に書いてある | 同左 | 同左 | 同左 |
| ドメイン数 | 7 | 8 | 5 | 7 |
| 有効期間 | 12か月 | 12か月 | 12か月 | 12か月 |
| パートナーの Tier 要件に数えられるか | **数えられない** | 数えられる | 数えられる | 数えられる |
| 2026-12-07 の内容更新 | **対象** | **対象** | 対象として挙がっていない | **対象** |

出典: 各資格の公式試験ガイド PDF（Version 1.0）［公式］、Partner Academy の認定ページと FAQ［公式］、Pearson VUE の Anthropic ページ［公式］。料金は「パートナー Tier 割引の前の米ドル価格」。［公式: FAQ］

### 1-1. 試験コードの表記について
- Pearson VUE の Anthropic ページと公式試験ガイドの表記は **CCAO-F / CCDV-F / CCAR-F / CCAR-P**。［公式］
- 「CCA-F」「CCA-P」はコミュニティの略称。公式の表記は CCAR-F / CCAR-P。［第三者: claudearchitectcertification.com、claudelog.com］
- Associate を「CCA-A」と書くサイトがある［第三者: claudearchitectcertification.com］が、公式コードは **CCAO-F**。教材では公式コードを使うのが安全。［見立て］
- 役割の呼び名: Partner Academy と FAQ は「Associate / Developer / Architect」の3つ。Pearson VUE のページだけ「Practitioner, Architect, and Developer」と書いている。［公式どうしの表記ゆれ］

### 1-2. 各資格のドメイン構成（一覧レベル。詳しい範囲は別担当）
いずれも Version 1.0 の公式試験ガイドから。［公式］ CCAO-F・CCDV-F・CCAR-P は 2026-12-07 に内容が更新されるので、11-17 公開の新ガイドで配点が変わる可能性がある（中身は**不明**）。

- **CCAO-F（Associate）**: 1 Prompting and Task Execution 14% / 2 Output Evaluation and Validation 21% / 3 Product and Model Selection 12% / 4 Workflow Integration and Solution Design 16% / 5 Configuration and Knowledge Management 12% / 6 Governance, Risk, and Responsible Use 15% / 7 Troubleshooting and Optimization 10%
- **CCDV-F（Developer）**: 1 Agents and Workflows 14.7% / 2 Applications and Integration 33.1% / 3 Claude Code 3.1% / 4 Eval, Testing, and Debugging 2.6% / 5 Model Selection and Optimization 16.8% / 6 Prompt and Context Engineering 11.0% / 7 Security and Safety 8.1% / 8 Tools and MCPs 10.6%（詳細は ccdv-f.md）
- **CCAR-F（Architect – Foundations）**: 1 Agentic Architecture & Orchestration 27% / 2 Tool Design & MCP Integration 18% / 3 Claude Code Configuration & Workflows 20% / 4 Prompt Engineering & Structured Output 20% / 5 Context Management & Reliability 15%。試験は6つのシナリオのうち4つで構成される。ガイドには「Task Statement 1.1」のような**タスクステートメントが 30 個**あり、**範囲外（out of scope）のリスト**もある。
- **CCAR-P（Architect – Professional）**: 1 Solution Design & Architecture 17% / 2 Claude Models, Prompting & Context Engineering 13% / 3 Integration 19% / 4 Evaluation, Testing & Optimization 16% / 5 Governance, Safety & Risk Management 14% / 6 Stakeholder Communication & Lifecycle Management 14% / 7 Developer Productivity & Operational Enablement 7%

ガイドの粒度の違い［公式、見立て］: タスクステートメントがあるのは CCAR-F だけ。CCAO-F・CCDV-F・CCAR-P のガイドは「ドメイン → スキル（配点つき）→ スキルの説明文」という粒度で、タスクステートメントや知識・スキルの箇条書きはない（CCDV-F で確認済み。CCAO-F・CCAR-P でも "Task Statement" という語は見つからなかった）。

### 1-3. 4つ以外の資格・バッジ
- **Claude Partner Badge: Claude Code**: Partner Academy の学習パス（8コース、約12時間）の最後にあるシナリオ型の修了アセスメント（capstone assessment）で得るパートナーバッジ。Pearson VUE の監督付き試験ではなく、認定資格（Certification）とは別物。［公式: partner-badge-claude-code パス］
- **Claude Forward Deployed Engineer（FDE）**: Partner Academy に学習パスはあるが、これに対応する認定資格は見つからなかった。［公式（パスがあること）／資格は**不明**］
- 今後の資格: 公式記事は「どの道筋も Foundation レベルの資格から始まり、Professional レベルへ進む」と書き、認定ページは「Professional がある場合は Professional へ進む（where available）」と書く。Associate や Developer の Professional 版が予告されているかは**不明**（具体的な発表は見つからなかった）。［公式の文面／予告は不明］
- 認定資格と修了証の違い: 一般公開の **Claude Academy**（academy.claude.com）のコースは、クイズに合格すると「修了証（certificate of completion）」が出る。これは監督付き試験の「認定資格（certification）」とは別物。［公式: 受験資格ページ］

---

## 2. 受験資格・申し込み・受験方法・言語・再受験・更新

### 2-1. 受験資格［公式］
- **Claude Partner Network（CPN）に加盟している組織の人だけが受けられる。** 顧客企業の人や、パートナーでない人は受けられない。資格による違いはない（4つとも同じ条件）。［公式: FAQ「Do I need to work at a partner organization?」「Can customers or non-partners get certified?」、受験資格ページ］
- 申し込みには、パートナー組織の記録に登録された会社ドメインのメールアドレスが要る。**個人のメールアドレスは使えない**。ドメインの追加には 7〜10 日かかる。［公式: FAQ］
- **18歳以上**。年齢はチェックイン時に政府発行の身分証で確認する。［公式: FAQ］
- 受験できるのは Anthropic のサービス提供国・地域だけ（日本は含まれる前提だが、国の一覧ページ自体は今回は開いていない）。ベラルーシ、キューバ、北朝鮮、ロシア、シリア、ウクライナの一部地域の身分証では、オンライン監督（OnVUE）は使えず、テストセンターでの受験になる。イラン居住者への試験は 2026-09-08 から停止されている。［公式: FAQ］
- パートナーでない組織については、受験資格ページが「公開の Claude Academy を使う」「顧客に Claude を届ける組織なら claude.com/partners から CPN に申し込む」と案内している。CPN の会費は無料。［公式: 受験資格ページ、anthropic.com の発表記事］
- 第三者の書き方もこれと同じ（パートナーの社員だけ、会社のメールが必要）。食い違いはない。［第三者: trainingcamp、vanja.io、aguidetocloud ほか］

### 2-2. 申し込みの流れ（2026-11-12 以降）［公式: FAQ］
1. 会社のメールで Anthropic Partner Academy（anthropic-partners.skilljar.com）にサインインし、受けたい資格のページで **Register** を選ぶ。
2. 氏名を確認する。身分証と完全に一致させる（ラテン文字で入力。自分で変えられるのは年1回だけで、確定すると1年間固定される）。
3. SSO で Pearson に移り、"Schedule an exam" で試験を選ぶ。
4. **OnVUE（オンライン監督）か Pearson のテストセンター**を選ぶ。ポリシーに同意し、**試験の言語を選び**、日時を選ぶ。
5. 金額を確認して支払う（パートナー割引は自動で適用される）。
6. Pearson から届く確認メールを保管する（オンライン受験はこのメールのリンクから始める）。

- 11-12 より前の流れ（Partner Academy で支払い、Pearson のユーザー名とパスワードがメールで届く）は、試験ガイド v1.0 の 10章と受験資格ページにまだ残っている。新しいのは FAQ とポリシーページの記述。［公式どうしの食い違い。FAQ が新しい］
- 11-12 の午前8時（PT）より前に申し込んで、まだ予約していない人は、申し込みが5年間有効。［公式: FAQ、ポリシー］

### 2-3. 料金と割引［公式: FAQ］
- 定価: $99（Associate）/ $125（Developer – Foundations）/ $125（Architect – Foundations）/ $175（Architect – Professional）。
- CPN の Tier ごとの割引: Registered は定価。Select、Preferred、Global Premier は **50% 引き**。**Global Premier は 2026-12-31 まで 100% 引き**。
- 価格は予約した時点で固定される。予約を変更しても価格は変わらない。キャンセルすると固定は外れる。
- 再受験も1回ごとに正規の受験料がかかる（パートナー割引は再受験にも効く）。
- まとめ買いのバウチャーはまだない（準備中）。

### 2-4. 受験方法・当日のこと［公式］
- オンライン監督（Pearson OnVUE）か Pearson のテストセンター。［公式: FAQ、試験ガイド］
- 試験時間は120分。チェックイン、説明、終了後の短いアンケートを含めると、**合計で約135分**を見ておく。［公式: FAQ］
- **クローズドブック**。メモ、ドキュメント、翻訳ツール、AI アシスタントは使えない。ブラウザの翻訳機能も使えない。［公式: FAQ、試験ポリシー PDF］
- スコアは試験の終わりに画面に出る（テストセンターでは紙のスコアレポートも出る）。合格すると Credly のバッジのメールが届く。［公式: FAQ］
- スコアレポートには、合否、スケールスコア、ドメイン（セクション）ごとの正答率が載る。合否は合計のスケールスコアだけで決まる。［公式: FAQ、試験ガイド］
- キャンセル・予約変更の期限: 現行は **テストセンターは48時間前まで、OnVUE は1時間前まで**。［公式: FAQ、ポリシーページ。Pearson ページはテストセンター48時間前まで］
  - 試験ガイド v1.0 の 10章は「24時間前まで」と書いている。これは古い記述とみられる。第三者（claudearchitectcertification.com）はガイドに合わせて24時間と書いている。［公式どうしの食い違い。FAQ とポリシーページが新しく、こちらが有力］
- 無断欠席や遅刻（許容時間を過ぎた到着）では受験料は返らない。［公式］
- 異議申し立ては14日以内に Pearson のサポートに出す。［公式］
- 受験上の配慮（accommodations）は、予約の前に Pearson で申請する（10日以上前が目安）。［公式: FAQ］

### 2-5. 言語［公式: FAQ］
- **試験と対策コースは英語と日本語で提供される。** 予約のときに試験の言語を選ぶ。
- 英語で予約した試験を日本語に変えたいときは、いったんキャンセルし、Partner Academy から入り直して日本語版で予約し直す。
- 4資格すべてに日本語版の公式試験ガイド PDF がある（例: 「Claude Certified Developer - Foundations Exam Guide (Japanese).pdf」）。［公式: 認定ページのリンク］
- 英語が第二言語の人は、Pearson に申請すると試験時間を延長してもらえる（ESL request form と第三者の署名入りの手紙を出す。処理に3〜5営業日）。予約済みの試験には後から延長を付けられないので、いったんキャンセルが要る。［公式: FAQ］
- 日本のテストセンターの有無や場所は**未確認**（Pearson の検索画面は自動取得できなかった）。

### 2-6. 再受験［公式: FAQ、ポリシー、試験ガイド］
- 不合格後の待機期間: **1回目のあと14日、2回目のあと30日、3回目のあと90日**。
- 同じ試験は、**任意の連続する12か月で最大4回**まで。上限は試験ごとにかかる（ある試験に落ちても別の試験は受けられる）。
- 受験料は毎回かかる。
- 合格したあとに、点数を上げるための再受験はできない。［公式: ポリシーページ］
- 試験が新しいバージョンになると、待機期間と受験回数のカウントはリセットされる。［公式: ポリシーページ］

### 2-7. 有効期間と更新［公式］
- 有効期間は、取得した日から **12か月**。2026-06-30 より前に取った人（当時の有効期間は6か月）は、自動で12か月に延ばされた。［公式: FAQ］
- 更新: 期限が切れる前に、取得後に変わった点を確認し、Partner Academy で**無料の、監督なしのアセスメント**を受ける。期限内の更新は無料。［公式: FAQ、試験ガイド14章］
  - ポリシーページには、このアセスメントは**オープンブックのオンライン形式**で、合格すると**今の有効期限からさらに12か月**延び、**何回でも受け直せる**とある。［公式: ポリシーページ］
  - FAQ には「詳しいことは、最初の資格が更新の時期を迎える前に案内する」とある。［公式］
- 期限が切れると、更新はできず、正規の受験料で本試験を受け直すことになる。［公式］
- 試験内容が大きく変わったときは、更新アセスメントではなく、最新版の本試験の合格を求めることがある。［公式: 試験ガイド14章、ポリシーページ］

### 2-8. 制度の経緯［公式］
- 2026-03-12: Claude Partner Network を発表（初年度 1億ドル）。最初の技術資格として Claude Certified Architect – Foundations をパートナー向けに同日公開。「年内に、セールス、アーキテクト、デベロッパー向けの資格を追加する」と予告した。［公式: anthropic.com/news/claude-partner-network］
- 2026-06-30: 試験の配信が Pearson に、デジタルバッジが Credly に移った（それまでは Skilljar 上の ProctorFree）。CCAR-F は $99 から $125 に値上げ。有効期間は6か月から12か月に延びた。［公式: FAQ］
- 2026-07: 4資格の試験ガイド Version 1.0（Effective July 2026）を公開。［公式: 各ガイド］
- 2026-07-23: 新しい3資格（Associate – Foundations、Developer – Foundations、Architect – Professional）を発表。この時点で、1,300 を超える組織の 36,000 人超が認定済み。［公式: claude.com の記事（datePublished 2026-07-23）］
- 2026-11-12: Pearson への SSO と、Pearson での支払いに切り替わった。［公式: FAQ］
- 2026-11-17: 更新版の試験ガイドを公開する予定。［公式: Pearson VUE］
- 2026-12-07: CCAO-F・CCDV-F・CCAR-P の内容を更新する予定。［公式: Pearson VUE］

---

## 3. 公式の一次情報の場所と、誰でも見られるか

| 情報 | URL | 誰でも見られるか（2026-11-16 確認） |
|---|---|---|
| 認定資格の一覧（料金、試験ガイド、対策コース、申し込みへのリンク） | https://anthropic-partners.skilljar.com/page/partner-certifications | **見られる**（サインインなしで取得できた） |
| 各資格のページ | https://anthropic-partners.skilljar.com/claude-certified-developer-foundations-certification など4つ | ページは見られる。**申し込み（Register）にはパートナーのアカウントが必要** |
| 受験資格 | https://anthropic-partners.skilljar.com/page/certification-eligibility | 見られる |
| 認定資格の FAQ | https://anthropic-partners.skilljar.com/page/faq-certifications | 見られる |
| ポリシーのまとめ | https://anthropic-partners.skilljar.com/page/policies-certifications | 見られる |
| 対策コースの一覧 | https://anthropic-partners.skilljar.com/page/claude-certification-exam-prep-courses | 一覧は見られる。**受講は CPN の会員だけ**（Pearson ページに "Training is available to members of the Claude Partner Network" とある） |
| **公式試験ガイド PDF（英語）** | 認定ページの "Exam guide" リンク。実体は Skilljar のコンテンツ配信（everpath-course-content.s3-accelerate.amazonaws.com）。例: CCDV-F → `.../instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542875%2FClaude+Certified+Developer+%E2%80%93+Foundations+Exam+Guide.pdf` | **見られる**（直接ダウンロードできた）。ドメインは S3 だが、公式の認定ページからリンクされている公式ファイル |
| **公式試験ガイド PDF（日本語）** | 同じページの HTML 内のリンク。例: `.../instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1792453728%2FClaude+Certified+Developer+-+Foundations+Exam+Guide+%28Japanese%29.pdf` | 見られる（4資格分を取得できた） |
| 認定の規約（Certification Terms and Conditions）PDF | `.../instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1782870634%2FCertification+Terms+and+Conditions.pdf` | 見られる |
| 試験ポリシー（Anthropic Certification Exam Policy）PDF（最終更新 2026-06-25） | `.../instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1782870704%2FAnthropic+Certification+Exam+Policy.pdf` | 見られる |
| Pearson VUE の Anthropic ページ | https://www.pearsonvue.com/us/en/anthropic.html（https://www.pearsonvue.com/anthropic からリダイレクト） | 見られる。12/7 の更新予告はここにある |
| Pearson の試験一覧・テストセンター検索 | https://wsr.pearsonvue.com/testtaker/registration/examlist/ANTHROPIC ほか | 自動取得できなかった（ブラウザでの操作が要る） |
| CPN と CCAR-F の発表（2026-03-12） | https://www.anthropic.com/news/claude-partner-network | 見られる |
| 3資格の新設の発表（2026-07-23） | https://claude.com/resources/articles/four-role-based-claude-certifications | 見られる |
| 一般公開の学習サイト Claude Academy | https://academy.claude.com/（https://www.anthropic.com/learn もここにリダイレクト。旧 Anthropic Academy の https://anthropic.skilljar.com/ も応答はある） | 誰でも見られる。修了証は出るが、認定資格ではない |

- 注意: Pearson ページで「Anthropic Partner Academy」と書かれたリンクの先は anthropic.com/learn で、これは一般公開の Claude Academy にリダイレクトされる。パートナー向けの Partner Academy（anthropic-partners.skilljar.com）とは別物。［公式ページのリンクの実際の挙動］
- 規約について（教材づくりで気にかけておく点）［公式: 規約 PDF、試験ポリシー PDF、見立て］: 試験の内容（問題、選択肢、シナリオ）は機密で、受験者には開示しない義務がある。規約には「Anthropic に雇われている、提携している、推奨されていると偽って言ったり、ほのめかしたりしない」という条項もある。非公式教材には「非公式であり、Anthropic とは無関係」と明記しておくのが安全。［見立て］

---

## 4. 4資格の関係（学習の順番、範囲の重なりと違い）

### 4-1. 公式の位置づけ［公式］
- 「どの道筋も Foundation レベルの資格から始まり、Professional レベルへ進む」。［claude.com の記事］
- 「Foundations から始め、Professional がある場合は Professional へ進む」。［認定ページ］
- Architect の Foundations と Professional は別の資格で、試験も別。Foundations は「Claude で作れる」ことを、Professional は「エンタープライズ規模で設計し、ガバナンスを担える」ことを示す。Foundations から始めるのが自然だが、前提条件ではない。Foundations が Professional に自動で上がることはない。［FAQ］
- Associate は非技術者向け。複雑な仕事や技術的な仕事は Architect や Developer の資格者に任せる（エスカレーションする）、と位置づけられている。［CCAO-F ガイド］
- パートナーの Tier の要件に数えられるのは、Developer – Foundations、Architect – Foundations、Architect – Professional。Associate は数えられない。［FAQ、認定ページ］

### 4-2. 学習の順番の目安［見立て］
- 非技術系の人: CCAO-F だけ、または CCAO-F から入る。
- 開発者: CCDV-F と CCAR-F はどちらも Foundations で、範囲がかなり重なる（エージェント、ツール／MCP、プロンプト／コンテキスト、Claude Code）。実装寄りなら CCDV-F が先、設計判断寄りなら CCAR-F が先。そのあと CCAR-P へ進む。
- 教材を作る順番としては、CCDV-F の教材と範囲が重なる CCAR-F を次に作ると、素材を流用しやすい。CCAR-P は CCAR-F と CCDV-F の上に、ガバナンスや関係者とのコミュニケーションを足した形になっている。

### 4-3. 範囲の重なりと違い（ドメイン名と配点からの見立て）［見立て。根拠は 1-2 の公式ドメイン一覧］

| テーマ | CCAO-F | CCDV-F | CCAR-F | CCAR-P |
|---|---|---|---|---|
| プロンプト／コンテキスト | D1 Prompting and Task Execution 14% | D6 Prompt and Context Engineering 11.0% | D4 Prompt Engineering & Structured Output 20%、D5 Context Management & Reliability 15% | D2 Claude Models, Prompting & Context Engineering 13% |
| エージェント／アーキテクチャ | （D4 Workflow Integration and Solution Design 16% は非技術者向けのワークフロー設計） | D1 Agents and Workflows 14.7% | D1 Agentic Architecture & Orchestration 27% | D1 Solution Design & Architecture 17% |
| ツール／MCP／統合 | — | D8 Tools and MCPs 10.6%、D2 Applications and Integration 33.1% | D2 Tool Design & MCP Integration 18% | D3 Integration 19% |
| Claude Code | — | D3 Claude Code 3.1%（ほかに D2 の Configuration Management） | D3 Claude Code Configuration & Workflows 20% | D7 Developer Productivity & Operational Enablement 7% |
| 評価／テスト | D2 Output Evaluation and Validation 21%（出力のチェック） | D4 Eval, Testing, and Debugging 2.6% | （D5 の Reliability に含まれる） | D4 Evaluation, Testing & Optimization 16% |
| モデル選択・コスト | D3 Product and Model Selection 12% | D5 Model Selection and Optimization 16.8% | — | （D2・D4 に含まれる） |
| セキュリティ／ガバナンス | D6 Governance, Risk, and Responsible Use 15% | D7 Security and Safety 8.1% | — | D5 Governance, Safety & Risk Management 14% |
| 関係者との対話・ライフサイクル | — | （D2 の Systems Life Cycle 2.8%） | — | D6 Stakeholder Communication & Lifecycle Management 14% |
| 設定・ナレッジ管理 | D5 Configuration and Knowledge Management 12% | D2 の Configuration Management 4.1% | D3 に含まれる | — |
| トラブルシューティング | D7 Troubleshooting and Optimization 10% | D4 の Debugging and Error Handling | D5 に含まれる | — |

- CCDV-F は「API・SDK・ソフトウェア工学の実装力」（D2 が33.1%）と「モデルの基礎・コスト」（D5）が重い。CCAR-F は Claude Code と、エージェントの設計判断（シナリオ型）が重い。CCAR-P はガバナンス、関係者とのコミュニケーション、評価が重い。CCAO-F はコードを書かずに使う力（出力の評価、プロンプト、ガバナンス）が中心。
- 試験の形式: CCAR-F だけ「6つのシナリオのうち4つ」という構成をガイドに明記している。ほかの3つのガイドにはシナリオ構成の記載がない（第三者はこれを「item pool（項目プール）」と呼んでいる）。［公式、第三者: claudearchitectcertification.com］

---

## 5. 出典一覧（確認日はすべて 2026-11-16）

| # | URL | 種別 | 根拠にした事実 | 備考・食い違い |
|---|---|---|---|---|
| 1 | https://www.pearsonvue.com/us/en/anthropic.html | 公式 | 4資格の公式コード、12/7 の内容更新と 11/17 のガイド公開、再受験ルール、テストセンターのキャンセルは48時間前まで、CPN 限定 | 役割の名前を「Practitioner, Architect, and Developer」と書いている（ほかの公式ページは Associate） |
| 2 | https://anthropic-partners.skilljar.com/page/faq-certifications | 公式 | 受験資格、18歳以上、対象の国、SSO と支払い（11/12〜）、申し込みの手順、言語（英語と日本語）、ESL の時間延長、クローズドブック、135分の在席時間、キャンセルの期限（48時間／1時間）、割引、スコア、再受験、有効期間、更新、経緯（6/30 の移行、値上げ）、Tier 要件に数えられる資格 | 「practice exam は廃止された。ガイドのサンプル問題を使う」 |
| 3 | https://anthropic-partners.skilljar.com/page/partner-certifications | 公式 | 4資格の料金、レベル、試験ガイド PDF（英語・日本語）へのリンク、役割の説明 | — |
| 4 | https://anthropic-partners.skilljar.com/page/certification-eligibility | 公式 | CPN 限定、Claude Academy との違い | 支払いと Pearson リンクの説明が 11/12 より前の流れのまま（FAQ と食い違う。FAQ が新しい） |
| 5 | https://anthropic-partners.skilljar.com/page/policies-certifications | 公式 | キャンセル（1時間／48時間）、再受験、バージョン更新でのリセット、合格後は受け直せない、更新アセスメント（オープンブック、何度でも、12か月延長）、異議申し立て、機密保持 | — |
| 6 | https://anthropic-partners.skilljar.com/page/claude-certification-exam-prep-courses | 公式 | 対策コースのパス（Associate 8コース、Developer 5コース、Architect – Professional 5コース、Architect – Foundations は別ページ） | — |
| 7 | https://anthropic-partners.skilljar.com/path/partner-badge-claude-code 、https://anthropic-partners.skilljar.com/path/claude-fde | 公式 | Claude Code パートナーバッジ、FDE の学習パス | — |
| 8 | 公式試験ガイド PDF（英語）4つ（#3 のページからリンク。everpath-course-content.s3-accelerate.amazonaws.com） | 公式 | 問題数（60/53/60/63）、120分、720、料金、有効期間、ドメインと配点、推奨経験、前提条件なし、CCAR-F のシナリオ構成・タスクステートメント・範囲外リスト | 4つとも Version 1.0, Effective July 2026。CCDV-F ガイドのキャンセル期限（24時間）と申し込みの流れは古い記述 |
| 9 | 公式試験ガイド PDF（日本語）4つ（#3 のページの HTML 内のリンク） | 公式 | 日本語版ガイドがあること、日本語の公式用語 | 日本語版も Version 1.0。公開日は不明 |
| 10 | Anthropic Certification Exam Policy PDF（最終更新 2026-06-25） | 公式 | 機密保持、不正行為の例（AI の利用禁止など）、異議申し立て14日、更新、受験できない地域 | — |
| 11 | Certification Terms and Conditions PDF | 公式 | 制度の定義、資格は個人に付く、提携していると偽らない義務 | — |
| 12 | https://www.anthropic.com/news/claude-partner-network | 公式 | 2026-03-12 の CPN と CCAR-F の公開、年内に資格を追加する予告、CPN の会費は無料 | — |
| 13 | https://claude.com/resources/articles/four-role-based-claude-certifications | 公式 | 2026-07-23 の3資格の新設、36,000人・1,300組織、Pearson と Credly、Foundation から Professional へ進む方針 | — |
| 14 | https://academy.claude.com/ | 公式 | 一般公開の学習サイト | — |
| 15 | https://claudearchitectcertification.com/certifications.md | 第三者 | 4資格の比較（略称 CCA-F/CCA-P/CCD-F/CCA-A） | 数値は公式と一致。Associate の略称「CCA-A」は公式コード（CCAO-F）と違う |
| 16 | https://claudelog.com/faqs/what-are-claude-certifications/ （2026-10-24 更新） | 第三者 | 公式表記は CCAR-F/CCAR-P という説明、「2026-07-24 時点で4資格がある」 | 「Anthropic は料金・問題数・合格点を公表していない」と書いているが、**公式ガイドと FAQ が公表しているので誤り**（古い） |
| 17 | https://trainingcamp.com/articles/claude-certifications-explained-all-four-anthropic-exams-costs-and-who-can-take-them/ （2026-09-17） | 第三者 | 2026-03-12 開始、6/30 の Pearson 移行、CPN 限定 | 公式と矛盾はない |
| 18 | https://vanja.io/claude-certification/ | 第三者 | 4資格の料金、CPN 限定、Claude Academy に無料コースがある | 公式と矛盾はない |
| 19 | https://www.cloudthat.com/resources/blog/claude-certification-guide-2026 | 第三者 | 料金、120分、720 | 公式と矛盾はない |
| 20 | https://blog.udemy.com/claude-certifications-guide/ | 第三者 | 4資格の表、会社のメールが必要 | 「about 120 minutes」とぼかしている |
| 21 | https://findskill.ai/blog/claude-certified-developer-exam-cost-format-domains/ （2026-07-12） | 第三者 | CCAO-F と CCDV-F の受付開始は 2026-07-13 | 公式の発表記事は 2026-07-23。受付開始日の公式の裏付けはない（**未確認**） |

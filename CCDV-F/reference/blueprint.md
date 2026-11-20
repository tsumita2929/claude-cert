# CCDV-F（Claude Certified Developer – Foundations）出題範囲メモ

> **追記（2026-11-18）:** 更新版の試験ガイドは 2026-11-17 に公開された。このフォルダに、`CCDV-F_exam_guide_v1.1-2026-11_*`（現行の版。申し込み・本人確認・サポートの章だけが変わり、分野・配点・問題数は v1.0 と同じ）と、`CCDV-F_exam_guide_v1.1-2026-12-07_*`（12/7 発効の版。70問になり、分野の配点とスキルが再編された）を保存した。差分のまとめは `shared/program.md` の冒頭の追記にある。**このメモと教材は、改訂前のガイドに基づいたまま**（2026-11-18 時点の方針）。以下の「公開予定」「不明」という記述は、2026-11-16 時点のもの。

- 確認日: 2026-11-16
- 表記: **［公式］** は公式の試験ガイド PDF や Partner Academy・Pearson VUE のページを直接読んで確認したもの。**［第三者］** は対策サイトの情報。**［見立て］** はこのメモを書いた側の判断や計算。
- 根拠の中心: **公式試験ガイド「Claude Certified Developer – Foundations Exam Guide」Version 1.0（Effective July 2026、Exam code: CCDV-F、全8ページ）の英語版と日本語版を直接読んだ。** 入手先は Partner Academy の認定ページ（https://anthropic-partners.skilljar.com/page/partner-certifications）の "Exam guide" リンク（誰でもダウンロードできる）。
- 制度全体（受験資格、再受験、更新など）は program.md にまとめた。

---

## 0. 結論（先に要点）

1. **教材が前提にした数字は、すべて公式ガイド v1.0 と一致する。** 53問、120分、スケールスコア 100〜1,000 で 720 が合格、択一と複数選択、Pearson VUE、$125、8ドメインと配点。［公式］
2. ドメイン名の英語表記は、公式では少し違う（下の表）。とくに D4 は公式では **"Eval, Testing, and Debugging"**（"Evaluation, Testing & Debugging" ではない）。公式の日本語訳もある（例: 分野4「評価、テスト、デバッグ」）。［公式］
3. **公式ガイドに「タスクステートメント」はない。** いちばん細かい粒度は、ドメインの下にある **25個の「スキル」**（それぞれ配点と説明文がつく）。知識やスキルの箇条書きもない。CCAR-F のガイドにあるようなタスクステートメントの形式は、CCDV-F のガイドにはない。［公式］
4. **範囲外（out of scope）のリストもない。** ［公式: ガイドに記載なし］
5. **2026-12-07 に CCDV-F の試験内容が更新される。更新版の試験ガイドは 2026-11-17 に公開される予定。** 12/7 以降に受ける人向けには、教材を新ガイドと照らし合わせ直す必要がある。何が変わるかは**不明**。［公式: Pearson VUE の Anthropic ページ］
6. 第三者の要約（claudearchitectcertification.com など）は、ドメインと配点は正しい。ただし、スキルの説明文にある要素のうちかなりの数が、要約から抜けている（4章で ※ を付けた）。教材の100問がこれらを覆っているかを点検するとよい。［公式と第三者の比較］

---

## 1. 教材の前提の正誤

| 項目 | 教材の前提 | 公式ガイド v1.0 の記載 | 判定 | 根拠 |
|---|---|---|---|---|
| 問題数 | 53問 | Number of items: 53 | ✅ 一致 | ［公式］ガイド5章 |
| 採点対象外の問題（試行問題）があるか | — | 記載なし | 不明 | 第三者は "53 scored questions" と書く［第三者］が、公式は「53 items」とだけ書いている |
| 時間 | 120分 | Time limit: 120 minutes | ✅ 一致 | ［公式］ガイド5章。在席時間の目安は約135分［公式: FAQ］ |
| 合格点 | 100〜1,000 のスケールで 720 | Scaled score of 720 on a scale of 100–1,000 | ✅ 一致 | ［公式］ガイド5章・9章。基準準拠型（criterion-referenced）で、標準設定の調査で決めた点数 |
| 出題形式 | 択一と複数選択 | Multiple-choice and multiple-response items; each item states how many responses to select | ✅ 一致（補足: 複数選択は選ぶ数が問題に書いてある） | ［公式］ガイド5章。FAQ では "multiple choice and scenario-based multiple response questions" と書いている |
| 実施 | Pearson VUE | Proctored: online proctored and/or test center。配信は Pearson VUE | ✅ 一致 | ［公式］ガイド5章・10章 |
| 料金 | 125ドル | Exam fee: $125 USD | ✅ 一致（パートナー Tier の割引前の価格。Select 以上は50%引き、Global Premier は 2026-12-31 まで100%引き） | ［公式］ガイド5章、FAQ |
| 有効期間 | — | 取得から12か月 | （参考） | ［公式］ |
| ドメイン数 | 8 | 8 | ✅ 一致 | ［公式］ガイド6章 |
| D1 | Agents & Workflows 14.7% | **Agents and Workflows** 14.7%（公式日本語: エージェントとワークフロー） | ✅ 配点は一致。英語表記がわずかに違う | ［公式］ |
| D2 | Applications & Integration 33.1% | **Applications and Integration** 33.1%（アプリケーションと統合） | ✅ 同上 | ［公式］ |
| D3 | Claude Code 3.1% | **Claude Code** 3.1%（Claude Code） | ✅ 一致 | ［公式］ |
| D4 | Evaluation, Testing & Debugging 2.6% | **Eval, Testing, and Debugging** 2.6%（評価、テスト、デバッグ） | ✅ 配点は一致。⚠ 英語表記が違う | ［公式］ |
| D5 | Model Selection & Optimization 16.8% | **Model Selection and Optimization** 16.8%（モデルの選択と最適化） | ✅ 配点は一致 | ［公式］ |
| D6 | Prompt & Context Engineering 11.0% | **Prompt and Context Engineering** 11.0%（プロンプトとコンテキストのエンジニアリング） | ✅ 配点は一致 | ［公式］ |
| D7 | Security & Safety 8.1% | **Security and Safety** 8.1%（セキュリティと安全性） | ✅ 配点は一致 | ［公式］ |
| D8 | Tools & MCPs 10.6% | **Tools and MCPs** 10.6%（ツールとMCP） | ✅ 配点は一致 | ［公式］ |
| ガイドの版 | — | Version 1.0、Effective July 2026、最初の版 | （参考） | ［公式］ガイド16章 |
| **今後の変更** | — | **2026-12-07 に試験内容を更新。2026-11-17 に更新版ガイドを公開予定** | ⚠ **前提が変わる可能性がある** | ［公式: Pearson VUE］ |

- 誤っていた前提: **なし**（数字はすべて公式と一致した）。
- 変わった、または変わる点: (a) 12/7 の内容更新（11/17 に新ガイド）。(b) 申し込みの流れ（2026-11-12 から SSO になり、Pearson で支払う。ガイド v1.0 の10章の書き方は古い）。(c) キャンセル期限（ガイドは「24時間前まで」。今の FAQ とポリシーでは**テストセンターは48時間前、OnVUE は1時間前まで**）。［公式どうしの食い違い。新しい FAQ が有力］
- 当時の出典5つのうち、数字と配点を公式ガイドどおりに書いていたのは claudearchitectcertification.com、claudecertificationguide.com、tutorialsdojo.com。claudelog.com は「Anthropic は問題数や合格点を公表していない」と書いているが、これは誤り（古い）。［第三者を公式と照らし合わせた結果］

---

## 2. 公式ガイドの構成（全16章）［公式］

1 About This Certification ／ 2 Purpose and Value of the Credential ／ 3 Intended Audience ／ 4 Minimally Qualified Candidate Profile ／ 5 Exam Details at a Glance ／ 6 Exam Content Outline (Blueprint) ／ 7 How to Prepare ／ 8 Sample Questions（3問）／ 9 How the Exam Is Scored ／ 10 Registration and Scheduling ／ 11 Exam Policies ／ 12 Exam-Day Experience and Rules of Conduct ／ 13 Confidentiality and NDA ／ 14 Credential Maintenance and Recertification ／ 15 Candidate Support, Appeals, and Privacy ／ 16 Document Control

### 2-1. 資格を取った人が「できる」と示せること（2章の8項目。要旨）［公式］
範囲の点検に使える。ブループリントの説明文に出てこない語（太字）も入っている。
1. Claude Agent SDK、エージェント型フレームワーク、カスタムのエージェントループでエージェントとワークフローを作る
2. API、クライアント SDK、サードパーティ経由の統合で Claude をアプリに組み込む（ストリーミング、エラー処理、**複数形式の入力（multi-format input）**を含む）
3. いろいろなインターフェースで Claude Code を使い、**Claude Skills を書き**、CLAUDE.md、settings.json、**プラグイン**を設定する
4. 効果的なプロンプトを書き、コンテキストエンジニアリングでモデルの振る舞いを制御し、コンテキストのドリフトを防ぐ
5. **eval を設計・実行し**、トレース分析で障害モードをデバッグし、構造化出力を検証し、**本番の品質を監視する**
6. モデルのティアを選び、トークン、キャッシュ、**バッチ処理**を管理して、コストとレイテンシを最適化する
7. セキュア・バイ・デザインの原則を使い、フックでガードレールを入れて、プロンプトインジェクションと破壊的な操作を防ぐ
8. カスタムツール、**関数スキーマ（function schemas）**、MCP サーバーを作り、組み込みツール、カスタムツール、Skills、MCP のトレードオフを比べる

［見立て］ D4（Eval, Testing, and Debugging）のスキルは「Debugging and Error Handling」の1つだけだが、2章では「eval の設計・実行」「本番の品質監視」も挙がっている。eval の設計そのものを問う問題が出る可能性はあるが、配点は小さい（D4 全体で2.6%）。

### 2-2. 対象者と MQC（最低限の合格者像）［公式］
- 対象: AI/ML エンジニア、テックリード、シニアソフトウェアエンジニア。ビジネス要件と技術的な実装の間に立つ人。
- MQC: Claude を使ったアプリ、エージェント、ワークフローを作り、組み込み、出荷する実務者。技術要件を動くアプリに落とし込む。Agent SDK とフレームワークでのエージェント構築、API と SDK での統合、**コードベースのモダナイゼーションのための Claude Code の運用**、プロンプトとコンテキストエンジニアリング、eval の設計と実行、カスタムツールと MCP サーバーの構築ができる。モデル選択（コスト、レイテンシ、能力）とツールの種類（組み込み、カスタム、Skills、MCP）のトレードオフを理解している。
- 推奨経験（必須ではない）: ソフトウェアエンジニアリング1〜5年。Claude などの LLM の実務6か月以上。Python と TypeScript の一方または両方。REST API と CLI。LLM の基礎、エージェント、コンテキスト管理、MCP の実務的な理解。
- 対象外: 非技術者やライトユーザー、実務の開発経験がない人。プロンプト作成だけ、などの限られた役割の人。
- 前提条件: なし。資格は試験の成績だけで決まる。

---

## 3. 配点の目安（53問と100問に換算）［見立て: 公式の配点 × 問題数］

公式ガイドは「配点は、採点対象の問題のうち各ドメインから出るおおよその割合」と書いている。［公式］ 下の問題数はその割合を掛けただけの目安で、公式の数字ではない。

| ドメイン | 配点 | 53問なら | 100問なら |
|---|---|---|---|
| D1 Agents and Workflows | 14.7% | 約7.8問 | 約15問 |
| D2 Applications and Integration | 33.1% | 約17.5問 | 約33問 |
| D3 Claude Code | 3.1% | 約1.6問 | 約3問 |
| D4 Eval, Testing, and Debugging | 2.6% | 約1.4問 | 約3問 |
| D5 Model Selection and Optimization | 16.8% | 約8.9問 | 約17問 |
| D6 Prompt and Context Engineering | 11.0% | 約5.8問 | 約11問 |
| D7 Security and Safety | 8.1% | 約4.3問 | 約8問 |
| D8 Tools and MCPs | 10.6% | 約5.6問 | 約11問 |

スキル別の目安は4章の各スキルに書いた（53問換算／100問換算）。

---

## 4. ブループリントの全項目（8ドメイン・25スキル）［公式］

- ガイドの書き方: 「Each domain below lists the skills against which exam items are written. Skill descriptions summarize the knowledge and competencies measured. Skill weights show each skill's share of the overall exam.」（各ドメインには、試験問題を書くもとになるスキルが並ぶ。スキルの説明は、測る知識と能力の要約。スキルの配点は、試験全体に占める割合）［公式］
- **スキルに番号は付いていない。** 下の「D1-1」などの番号は、このメモが点検のために付けたもの。
- 各スキルは「英語名（公式の日本語名）配点」の形で示し、説明文に並ぶ要素を箇条書きにした（英語の原語と、日本語版ガイドの訳語）。
- **※ の付いた要素**は、第三者の要約（claudearchitectcertification.com の exam-guide/ccdv-f のドメイン表）に出てこないもの。第三者の要約をもとに作った教材では抜けやすい。［公式と第三者の比較］
- 配点の合計は、スキルの配点を足すとドメインの配点と一致する（検算済み）。［見立て］

### D1 Agents and Workflows（エージェントとワークフロー）14.7%

**D1-1 Agent Architecture（エージェントアーキテクチャ）4.5%**（53問換算 約2.4問／100問換算 約4.5問）
- エージェントとワークフローのアーキテクチャの原則、パターン、トレードオフ（principles, patterns, and tradeoffs）
- ワークフローとエージェントのどちらを使うかの判断基準（decision criteria for using a workflow versus an agent）
- ※ マネージャー／スーパーバイザーの階層構造（structure of manager/supervisor hierarchies）
- ※ タスクの実行をよくするためのサブエージェントの役割（role of subagents in improving task execution）

**D1-2 Agent Construction with Claude（Claude によるエージェントの構築）5.3%**（約2.8問／約5.3問）
- Claude Agent SDK
- カスタムのエージェントループとハーネス（custom agent loops and harnesses）
- マネージドエージェントのデプロイモデル: セルフホストか、Anthropic ホストか（managed agent deployment models, self-hosted vs. Anthropic-hosted）
- ※ 決定論的な動作のためのフック（hooks for deterministic actions）

**D1-3 Agent Patterns and Frameworks（エージェントのパターンとフレームワーク）4.9%**（約2.6問／約4.9問）
- よく使うエージェントの設計パターン: ツール使用ループ、サブエージェント、メモリ、コンテキストウィンドウの管理（tool-use loops, sub-agents, memory, context-window management）
- エージェント向けの抽象化フレームワーク（例: Strands、LangGraph、PydanticAI）
- 複数ステップのタスクのためのエージェントとワークフローの構築

### D2 Applications and Integration（アプリケーションと統合）33.1%

**D2-1 Understanding Requirements（要件の理解）3.4%**（約1.8問／約3.4問）
- ビジネス要件とソリューションアーキテクチャから導く機能要件と、※ インフラストラクチャ要件（functional and infrastructure requirements）

**D2-2 Systems Life Cycle（システムライフサイクル）2.8%**（約1.5問／約2.8問）
- IT システムを開発、導入、運用、保守するための、システムライフサイクル管理の概念とフレームワーク

**D2-3 Claude API Mechanics（Claude API の仕組み）6.8%**（約3.6問／約6.8問）
- メッセージ（messages）、ツール（tools）、ストリーミング（streaming）、ビジョン（vision）、思考（thinking）、キャッシュ（caching）
- サードパーティのベンダー経由での Claude の呼び出し（invoking Claude through third-party vendors）
- ※ Messages API のデータアクセスパターン（Messages API data access patterns）
- バッチ API の使い方（batch API use）
- ※ リアルタイム API とバッチ API の選び方のトレードオフ（tradeoffs between realtime and batch API selection）（公式サンプル問題1もこの論点）

**D2-4 Software Engineering Foundations（ソフトウェアエンジニアリングの基礎）7.4%**（約3.9問／約7.4問）
- REST API、JSON、非同期プログラミング（asynchronous programming）、バージョン管理（version control）
- ※ SDLC への組み込み（SDLC integration）
- コードレビュー（code review）
- ※ 小規模と大規模のリファクタリング（small- and large-scale refactoring）

**D2-5 Claude Application Design（Claude アプリケーションの設計）8.6%**（約4.6問／約8.6問。**スキル単体では最大の配点**）
- インターフェース（Claude Code、Desktop、claude.ai、API、SDK）ごとに Claude が指示をどう解釈するか（how Claude interprets instructions across interfaces）
- ※ コンテンツの境界（content boundaries）
- ※ スキーマ設計（schema design）
- ※ セッションの衛生管理（session hygiene。公式の日本語訳は「セッションの適切な管理（セッションハイジーン）」）
- ※ プラグイン管理（plugin management）

**D2-6 Configuration Management（構成管理）4.1%**（約2.2問／約4.1問）
- CLAUDE.md ファイル、settings.json
- モデルバージョンの固定（model version pinning）
- ※ プロンプトのバージョン管理（prompt versioning）
- プラグインの依存関係（plugin dependencies）

### D3 Claude Code（Claude Code）3.1%

**D3-1 Claude Code Operation（Claude Code の操作）3.1%**（約1.6問／約3.1問）
- コアコンポーネント: Rules、Skills、Commands、Agents、Agent Memory（公式日本語: ルール、スキル、コマンド、エージェント、エージェントメモリ）
- 機能: セッション管理、組み込みとカスタムのスラッシュコマンド、ヘッドレスモード（headless mode）、ストリーミングモード（streaming mode）、自動モード（auto-mode）
- CLAUDE.md の階層（CLAUDE.md hierarchy）
- リポジトリの初期化（repository initialization）
- settings.json の設定

（D2-6 の Configuration Management、D7-3 の Claude Hooks、D8-3 の Agentic Customization も Claude Code の機能に関わる。Claude Code 関連の出題は、D3 の3.1%より実質的には多いかもしれない。［見立て］）

### D4 Eval, Testing, and Debugging（評価、テスト、デバッグ）2.6%

**D4-1 Debugging and Error Handling（デバッグとエラー処理）2.6%**（約1.4問／約2.6問）
- エラーの種類を見分ける（error type identification）
- 復旧の戦略を選ぶ（recovery strategy selection）
- トレース分析で障害モードを特定する（trace analysis to identify failure modes）
- 問題の原因が統合レイヤーにあるのか、モデルの出力にあるのかを切り分ける（problem origin isolation between the integration layer and model output）

### D5 Model Selection and Optimization（モデルの選択と最適化）16.8%

**D5-1 LLM Fundamentals（LLM の基礎）5.2%**（約2.8問／約5.2問）
- トークン、コンテキストウィンドウ、サンプリング、非決定性（non-determinism）、※ 次トークン生成（next-token generation）
- モデルのオプション: ※ 高速モード（fast mode）、※ 拡張思考（extended thinking）、適応型思考（adaptive thinking）、※ エフォートレベル（effort levels）
- ※ 基本的なプロンプト手法: ゼロショット、シングルショット、マルチショット（zero-shot, single-shot, multi-shot）

**D5-2 Technical Fundamentals（技術的な基礎）6.1%**（約3.2問／約6.1問）
- AI アプリ開発を支える基礎技術。REST API をラップする SDK との統合（integrating with SDKs that wrap REST APIs）、WebSocket

**D5-3 Model Selection and Tradeoffs（モデルの選択とトレードオフ）2.7%**（約1.4問／約2.7問）
- Claude モデルの能力: Opus、Sonnet、Haiku の使いどころ、適応型思考への対応（adaptive thinking support）
- 品質、レイテンシ、コストのトレードオフ
- ※ モデルのリリース間で起きる、互換性のない振る舞いの変化（breaking behavior changes across model releases）

**D5-4 Cost and Token Management（コストとトークンの管理）2.8%**（約1.5問／約2.8問）
- トークン予算（token budgeting）とコスト管理
- ※ トークン使用量の追跡（token usage tracking）
- ※ コストのモデル化（cost modeling）
- キャッシュの手法: プロンプトキャッシュ（prompt caching）、キャッシュのチェックポイント（cache check-pointing）

### D6 Prompt and Context Engineering（プロンプトとコンテキストのエンジニアリング）11.0%

**D6-1 Context Engineering（コンテキストエンジニアリング）3.8%**（約2.0問／約3.8問）
- コンテキストウィンドウの管理
- コンテキストのドリフトと肥大化（drift and bloat）を防ぐ: ツール出力の刈り込み（tool output pruning）、コンパクション（compaction）
- サブエージェント、または ※ 複数ステップのエージェント型ワークフローによる、コンテキストの分離（context isolation）

**D6-2 Prompt Engineering（プロンプトエンジニアリング）4.6%**（約2.4問／約4.6問）
- 指示の明確さ（instruction clarity）、少数ショットの例（few-shot examples）
- ※ システムとユーザーのどちらに置くか（system versus user placement）
- ※ 出力の制約（output constraints）
- ※ コンポーネントをまたいだプロンプトと指示の配置（prompt and instruction placement across components）
- 反復的な改良（iterative refinement）、※ プロンプトの調整（prompt adjustment）
- 入力のサニタイズ（input sanitization）

**D6-3 Output Handling（出力の処理）2.6%**（約1.4問／約2.6問）
- 構造化出力のパターン（structured output patterns）
- 応答の検証（response validation）
- 防御的なパース（defensive parsing）
- 自信のありそうな出力をうのみにしない姿勢（skepticism toward confident output）

### D7 Security and Safety（セキュリティと安全性）8.1%

**D7-1 AI Application Security（AI アプリケーションのセキュリティ）3.2%**（約1.7問／約3.2問）
- データのプライバシーとセキュリティのベストプラクティス
- プロンプトインジェクションの認識と緩和（prompt injection awareness and mitigation）（公式サンプル問題2もこの論点）
- ※ ジェイルブレイクへの防御（jailbreak defense）
- 信頼できない入力の扱い（untrusted input handling）
- データ漏えいの防止、PII の扱い
- ※ 認証、認可、機密性、プライバシー、完全性の確保（authentication, authorization, confidentiality, privacy, and integrity）

**D7-2 Guardrails and Safe Deployment（ガードレールと安全なデプロイ）2.3%**（約1.2問／約2.3問）
- 安全で責任あるデプロイの実践: コンテンツポリシー（content policy）、ガードレールの多層化（guardrail layering）
- セキュア・バイ・デザインの原則: プライバシー、ID とアクセスの管理（identity and access management）、最小権限（least privilege）

**D7-3 Claude Hooks（Claude のフック）1.0%**（約0.5問／約1問）
- フックを使って、Claude アプリ内での破壊的な操作を防ぐガードレールと安全制御を入れる（leveraging hooks for guardrails and safety controls to prevent destructive actions）

**D7-4 Identity, Secrets, and Key Management（ID、シークレット、キーの管理）1.6%**（約0.8問／約1.6問）
- ※ 開発環境と本番環境にまたがる、シークレット、認証情報、API キーの管理
- ※ ID の検証と認証（identity validation and authentication）
- ※ アクセスの承認とレベルの確認（access approval and level verification）
- ※ 認可されたアクセスの監視（authorized access monitoring）

### D8 Tools and MCPs（ツールとMCP）10.6%

**D8-1 Tool Implementation（ツールの実装）4.4%**（約2.3問／約4.4問）
- ツール使用と関数呼び出し（tool use and function calling）
- ※ 外部システムとやりとりするための設定（configuration for external system interaction）
- ツールの説明の書き方（tool description writing）
- エラー処理
- ツールの使い方のパターン: ※ エージェントハーネスによるディスパッチ（agentic harness dispatch）、クライアント側ツールとサーバー側ツール（client-side vs. server-side tools）、※ 承認のパターン（approval patterns）
- ※ ツールセットを組み立てるときのベストプラクティス（tool set construction best practices）

**D8-2 MCP Server Development（MCP サーバーの開発）2.1%**（約1.1問／約2.1問）
- サーバーの作成（authoring）、デプロイ、※ Claude アプリとの統合
- MCP のリソース（resources）、※ ツール（tools）、プロンプト（prompts）
- 通信のパターン: stdio、ソケット（sockets）、※ クライアントとサーバー（client vs. server）

**D8-3 Agentic Customization（エージェントのカスタマイズ）4.1%**（約2.2問／約4.1問）
- 組み込みの Tools、カスタムの Tools、Skills、MCP のトレードオフ。ユースケースに合った方法を選んで使う（公式サンプル問題3もこの論点）

（D8 の中では、MCP サーバーの開発（2.1%）より、「どれを使うかの選択」（4.1%）と「ツールの実装」（4.4%）の配点が大きい。［公式の配点からの見立て］）

---

## 5. 範囲内の技術・機能と、範囲外

### 5-1. ガイドが名前を挙げている技術・機能（範囲内）［公式: 2〜4章・6〜7章から集めたもの］
- **エージェント**: Claude Agent SDK、カスタムのエージェントループとハーネス、マネージドエージェント（セルフホスト／Anthropic ホスト）、サブエージェント、マネージャー／スーパーバイザーの階層、メモリ、フック、Strands、LangGraph、PydanticAI
- **API**: Messages API（メッセージ、ツール、ストリーミング、ビジョン、思考、キャッシュ）、Message Batches API（サンプル問題での名前）、リアルタイムとバッチの使い分け、サードパーティのベンダー経由での呼び出し（どのベンダーかは書いていない）、クライアント SDK、REST、WebSocket、JSON、非同期処理
- **モデル**: Opus、Sonnet、Haiku、fast mode、extended thinking、adaptive thinking、effort levels、モデルバージョンの固定、リリース間の互換性のない変化
- **コスト**: トークン予算、使用量の追跡、コストのモデル化、プロンプトキャッシュ、キャッシュのチェックポイント、バッチ処理
- **Claude Code とその周辺**: Rules、Skills、Commands（組み込みとカスタムのスラッシュコマンド）、Agents、Agent Memory、セッション管理、headless mode、streaming mode、auto-mode、CLAUDE.md の階層、リポジトリの初期化、settings.json、プラグイン（管理と依存関係）、フック、Claude Desktop、claude.ai
- **プロンプトとコンテキスト**: system と user の配置、few-shot、出力の制約、入力のサニタイズ、コンパクション、ツール出力の刈り込み、構造化出力、防御的なパース
- **セキュリティ**: プロンプトインジェクション、ジェイルブレイク、PII、データ漏えい、コンテンツポリシー、ガードレールの多層化、IAM、最小権限、シークレットと API キーの管理
- **ツールと MCP**: 関数呼び出し、ツールの説明、クライアント側とサーバー側のツール、承認のパターン、MCP サーバー（リソース、ツール、プロンプト、stdio とソケット）、組み込みツール、カスタムツール、Skills の比較
- **ソフトウェア工学**: バージョン管理、SDLC、コードレビュー、リファクタリング、システムライフサイクル、要件定義
- **言語**: Python と TypeScript の一方または両方（推奨経験として）

### 5-2. 範囲外
- **CCDV-F のガイドに範囲外（Out-of-Scope Topics）の章はない。** 何が範囲外かは**不明**。［公式: 記載なし］
- 第三者で、CCDV-F の範囲外を列挙している情報は見つからなかった。［第三者: 見つからず］
- 参考（取り違えに注意）: **CCAR-F のガイドには範囲外のリストがある**が、そこに挙がっているものの多くは **CCDV-F では範囲内**になっている。たとえば CCAR-F の範囲外には「ビジョン（画像分析）」「ストリーミング API の実装」「プロンプトキャッシュの実装の細部（存在を知っている以上のこと）」「MCP サーバーのデプロイやホスティング」「OAuth や API キーのローテーション」がある。しかし CCDV-F では、D2-3（vision、streaming）、D5-4（prompt caching、cache check-pointing）、D8-2（deployment）、D7-4（API キーの管理）で、はっきり範囲に入っている。CCAR-F の範囲外リストを CCDV-F にそのまま当てはめてはいけない。［公式: 2つのガイドの比較］

---

## 6. 公式サンプル問題の傾向（ガイド8章、3問）［公式。要旨はこのメモの言葉で書いた］

ガイドは、サンプル問題は「試験のスタイルと認知レベルを示す例で、本番の問題バンクからとったものではない」と書いている。正解と解説も載っている。

| # | ドメイン | 問われていること（要旨） | 正解の考え方 | 誤答の作り方 |
|---|---|---|---|---|
| 1 | D2 Applications and Integration | 急がない大量の夜間処理で、コストを最優先にするとき、どの処理方式を選ぶか | 遅れてもよく、量が多い処理には、非同期で安く処理できるバッチ API を選ぶ（リアルタイムとバッチのトレードオフ） | 速さを追う方法（同期呼び出しを並列にする）で、1トークンあたりの単価は下がらない。別の「つまみ」をいじる（出力の上限を下げる）。極端な割り切り（品質を無視して最小のモデルにする） |
| 2 | D7 Security and Safety | ユーザーが送ってきた Web ページの中に、隠れた指示（プロンプトインジェクション）が入っていたとき、最も効く対策は何か | 取ってきたコンテンツを信頼できない入力として扱い、信頼できる指示とは分ける。そのうえで、ガードレールやフック（最小権限）で、注入された指示が重要な操作を起こせないようにする | 関係のない設定を変える（温度）。強制力のないお願い（システムプロンプトに「悪意ある指示を入れないで」と書く）。逆効果になりうる思い込み（大きいモデルなら安全。指示によく従うモデルほど、注入された指示にも従いやすい） |
| 3 | D8 Tools and MCPs | 社内の REST API を、複数の Claude アプリから再利用でき、アプリとは別に保守できる形で使わせたいとき、何を作るか | MCP サーバーを作り、その操作をツールとして公開する（再利用でき、独立して保守できる） | 保守できない方法（ロジックをプロンプトに書き込む）。生きたデータにアクセスできず、コンテキストを無駄にする方法（毎回データを貼り付ける）。能力を大きく見すぎる（組み込みツールならどんな社内 API にも届く） |

傾向［見立て］:
- 問題文に**制約が1つはっきり書いてある**（コスト最優先で急がない、信頼できない入力、再利用と独立した保守）。その制約に**合わせて作られた仕組み**が正解になる。
- 誤答には型がある。(1) 一見よさそうだが論点がずれている（速さ、温度、プロンプトにロジックを書き込む）。(2) 強制力がない、または一部しか効かない（お願い文、出力上限を下げる、データを貼る）。(3) 「〜すれば必ずよくなる」という言い切りや思い込み（最小モデル、大きいモデル、組み込みツールなら何でもできる）。
- 解説では、セキュリティは「プロンプトでのお願い」より「決定論的で強制できる制御（ガードレール、フック、最小権限）」を重く見ている。これは D1-2（フックによる決定論的な動作）と D7-3（Claude Hooks）の範囲とつながる。
- 3問とも択一の4択。複数選択のサンプルはない。
- 3問とも正解は B だが、本番の正解の位置について何かが分かるわけではない。
- サンプルがあるのは D2、D7、D8 だけ。ほかのドメインの問題の形式は**不明**。

（注: サンプル問題の本文と選択肢は書き写していない。本番の試験内容は機密で、受験者には開示しない義務がある。［公式: ガイド13章、試験ポリシー］）

---

## 7. 公式の学習リソース

### 7-1. ガイド7章「How to Prepare」（要旨）［公式］
- 必修のコースはない。Anthropic は、どのリソースでも合格を保証しない。
- 6章のブループリントを読み、目標ごとに自分の力を確かめる。
- Claude API、モデル、プロンプトエンジニアリング、Claude Code、Skills、MCP の公式ドキュメントを読む。
- API を使い、ツールを1つ以上組み込み、基本的なプロンプトとコンテキストエンジニアリングを使い、簡単なセキュリティと評価の仕組みを入れた Claude アプリを、少なくとも1つ作って動かす。
- プロンプトとシステム指示を書く、エージェントとワークフローを作る、Claude Code を設定する、トークンとコストを管理する、ガードレールを入れる、カスタムツールか MCP サーバーを作る、を実際にやってみる。
- 8章のサンプル問題で、出題のスタイルに慣れる。
- 練習試験はない（以前の配信基盤にあった練習試験は、Pearson への移行のときに廃止された）。［公式: FAQ］

### 7-2. Partner Academy の公式対策コース「Claude Certified Developer - Foundations Prep Course」（5コース）［公式］
URL: https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations （一覧は誰でも見られる。受講は CPN の会員向け）

| コース | 時間 | 内容（要旨） | 主に関係するドメイン［見立て］ |
|---|---|---|---|
| MSO Foundations | 57分 | モデルの基礎と技術的な基礎（このコース全体の土台） | D5（MSO = Model Selection and Optimization と思われる） |
| Production-Grade Prompting, Agents & Tool Use | 209分 | 最初の本番統合。信頼できるプロンプト、ツール、コンテキスト管理、エージェントループ | D1、D2、D6、D8 |
| Claude Code, MCP & Integration | 142分 | 動く統合を、設定でき、共有でき、実際のシステムに安全につなげる形にする | D2、D3、D8 |
| Production Engineering, Evals & Security | 211分 | 開発で動いたエージェントが、本番のトラフィックでも持ちこたえることを示す | D4、D7、D5 |
| Accelerators & IP Contribution | 155分 | 動くビルドを、再利用、レビュー、案件の外へのデプロイに耐える形にまとめる | （パートナー業務の色が強い） |

- 合計は約774分（約13時間）。［見立て: 合計しただけ］
- パスに書かれた学習目標（要旨）［公式］: トークン、固定予算としてのコンテキストウィンドウ、サンプリングと非決定性、モデルのティア、SDK と REST の違い／system プロンプト、XML、few-shot、制約／ツールスキーマ、ツール使用ループ、複数ターンでの extended thinking の扱い／オーケストレーション、メモリの範囲、取り消せない操作の前に人が確認する（human-in-the-loop）チェックポイント／権限モデルのもとでの Claude Code、プロジェクトの永続的なコンテキスト、Skills とプラグインへのまとめ方、認証情報を漏らさない MCP の接続／「完了」を定義する eval、トレース、回帰の検出、コスト・レイテンシ・信頼性の予算／プロンプトインジェクション、信頼できない入力、シークレットの露出への対策／再利用できるアクセラレーターにまとめる、どのプラットフォームで動かすかを選ぶ。
- 先に受けておくとよいコース（パスに書かれているもの）［公式］: Claude 101、Claude Code 101、Claude Platform 101、Claude Code in Action、AI Fluency: Framework & Foundations、Building with the Claude API、Introduction to Model Context Protocol、Model Context Protocol: Advanced Topics、AI Capabilities and Limitations。

### 7-3. Partner Academy の学習パス「Claude Developer」［公式］
https://anthropic-partners.skilljar.com/path/claude-developer に並んでいるコース（今回確認できた範囲）: AI Capabilities and Limitations ／ AI Fluency for Builders ／ Claude Platform & Model Foundations（59分）／ Claude Platform 101 ／ Claude Code 101 ／ Claude Code in Action ／ Introduction to Model Context Protocol ／ Introduction to agent skills ／ Introduction to subagents

### 7-4. 誰でも使えるもの［公式］
- **Claude Academy**（https://academy.claude.com/）: 一般公開。Claude、Claude Code、Claude API での開発を教える。クイズに合格すると修了証が出る（認定資格ではない）。どのコースが公開されているかは、ページが JavaScript で描かれるため、今回は一覧にできなかった。
- **公式ドキュメント**（Claude API、モデル、プロンプトエンジニアリング、Claude Code、Skills、MCP）: ガイド7章で読むように勧められている。
- 対策コースが日本語で用意されているかは、FAQ が「試験と対策コンテンツは英語と日本語」と書いている［公式］。ただし、CCDV-F の5コースそれぞれに日本語版があるかは**未確認**（パスのページでは各コースが "Language: English" となっている）。

---

## 8. 採点と運用（CCDV-F のガイドから。制度全体は program.md）［公式］
- 基準準拠型（criterion-referenced）の試験で、ほかの受験者との比較ではない。合格点（720）は、専門家による標準設定の調査で決めた。
- スコアレポートには、合否、スケールスコア、ドメインごとの正答率が載る。ドメイン別の数字は合否の判定には使わない。
- 再受験の待機期間は 14日、30日、90日。12か月で4回まで。毎回受験料がかかる。
- 有効期間は12か月。期限内の更新は、Partner Academy での無料の、監督なしのアセスメント。内容が大きく変わったときは、本試験の受け直しを求めることがある。
- 受験の前に機密保持契約（NDA）に同意する。同意しないと試験は終わり、返金されない。

---

## 9. 第三者サイトとの照合

| サイト | 書いてあること | 公式との関係 |
|---|---|---|
| claudearchitectcertification.com（exam-guide/ccdv-f.md、certifications/ccdv-f.md） | 53問、120分、720、$125、12か月、Pearson VUE、8ドメインと配点、「Guide v1.0・July 2026」、受験には CPN が必要、再受験と更新のルール、キャンセルは24時間前まで、申し込み後に Pearson のアカウントを作る | 数字と配点は公式と一致。ドメインの説明は公式の要約だが、要素が抜けている（4章の ※）。キャンセル24時間と申し込みの流れはガイド v1.0 のままで、今の FAQ（48時間／1時間、SSO）とは違う。「6つのシナリオ」はこのサイト独自の教材で、公式の試験の構成ではない |
| claudecertificationguide.com（2026-07-24 公開、10-01 更新） | 53問、120分、720、12か月、「25 weighted sub-skills（配点つきのサブスキルが25）」 | 一致（公式のスキルは25個） |
| tutorialsdojo.com の CCDV-F 学習ガイド | 8ドメインと配点を公式の名前で書いている（"Eval, Testing, and Debugging" など） | 一致 |
| aguidetocloud.com の cert-tracker | 53問、120分、720、$125、受験資格は CPN の社員（認められた会社のドメインのメール）、公式ガイドへのリンク | 一致 |
| findskill.ai（2026-07-12） | $125、53問、720、受付開始は 2026-07-13 | 数字は一致。受付開始日は公式の裏付けがない（公式の発表記事は 2026-07-23） |
| claudelog.com（2026-10-24 更新） | 「料金、問題数、合格点は公式に出ていない」 | **誤り**（公式ガイドに書いてある） |

12/7 の内容更新と 11/17 の新ガイドに触れている第三者は、見つからなかった。［第三者: 見つからず］

---

## 10. 出典一覧（確認日はすべて 2026-11-16）

| # | URL | 種別 | 根拠にした事実 | 備考・食い違い |
|---|---|---|---|---|
| 1 | https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542875%2FClaude+Certified+Developer+%E2%80%93+Foundations+Exam+Guide.pdf | 公式（Partner Academy の認定ページからリンクされた試験ガイド。英語、v1.0） | 1〜8章の全部（形式、配点、25スキル、サンプル問題、準備の方法、採点、ポリシー） | 10章のキャンセル期限（24時間前）と申し込みの流れは、今の FAQ と違う |
| 2 | https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F34hhd92iyp94a0gtbr15cy5jk%2Fpublic%2F1792453728%2FClaude+Certified+Developer+-+Foundations+Exam+Guide+%28Japanese%29.pdf | 公式（日本語版の試験ガイド、v1.0） | ドメインとスキルの公式の日本語名、日本語版があること | 中身は英語版と同じ（キャンセル期限も24時間） |
| 3 | https://anthropic-partners.skilljar.com/page/partner-certifications | 公式 | $125、Foundations、ガイドと対策コースへのリンク、Developer の役割の説明 | — |
| 4 | https://www.pearsonvue.com/us/en/anthropic.html | 公式 | **2026-12-07 の内容更新（CCDV-F が対象）、2026-11-17 の新ガイド公開**、公式コード CCDV-F | — |
| 5 | https://anthropic-partners.skilljar.com/page/faq-certifications | 公式 | 出題形式（multiple choice と scenario-based multiple response）、135分、720 は4資格共通、言語（英語と日本語）、練習試験の廃止、「ガイドにはドメインとタスクステートメントが書いてある」 | FAQ は「task statements」と書いているが、CCDV-F のガイド v1.0 にあるのはスキルで、タスクステートメントはない |
| 6 | https://anthropic-partners.skilljar.com/page/policies-certifications | 公式 | キャンセル（1時間／48時間）、再受験、バージョンが変わるとリセット、更新 | — |
| 7 | https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations | 公式 | 公式対策コース5つと時間、学習目標、先に受けるとよいコース | 各コースは "Language: English" と表示されている |
| 8 | https://anthropic-partners.skilljar.com/path/claude-developer | 公式 | Claude Developer の学習パスのコース | — |
| 9 | https://claude.com/resources/articles/four-role-based-claude-certifications | 公式（2026-07-23） | CCDV-F の新設、「Claude API、ツール使用、エージェント開発」の資格であること | — |
| 10 | CCAR-F の公式試験ガイド PDF（英語、v1.0。#3 のページからリンク） | 公式 | 範囲外リストの比較（5-2）、タスクステートメントがあるのは CCAR-F だけ | — |
| 11 | https://claudearchitectcertification.com/exam-guide/ccdv-f.md 、https://claudearchitectcertification.com/certifications/ccdv-f.md | 第三者 | 教材の前提にした数字と配点 | 公式と一致。要素の抜けとキャンセル期限の違いは 9章 |
| 12 | https://claudecertificationguide.com/blog/claude-certified-developer-foundations-exam-guide | 第三者 | 25のサブスキル | 一致 |
| 13 | https://tutorialsdojo.com/ccdv-f-claude-certified-developer-foundations-study-guide/ | 第三者 | 公式のドメイン名と配点 | 一致 |
| 14 | https://claudelog.com/faqs/what-are-claude-certifications/ | 第三者 | — | 「公式が問題数などを出していない」は誤り |
| 15 | https://www.aguidetocloud.com/cert-tracker/anthropic-ccdv-f/ | 第三者 | 形式、受験資格 | 一致 |
| 16 | https://findskill.ai/blog/claude-certified-developer-exam-cost-format-domains/ | 第三者 | 受付開始 2026-07-13（未確認） | 公式の発表日（07-23）と食い違う。どちらが正しいかは不明。発表より前に受付を始めた可能性もあり、決められない |

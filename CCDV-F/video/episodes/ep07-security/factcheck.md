# 事実確認：ep07-security（セキュリティと安全性）

確認日: 2026-11-14

根拠は2種類。どちらも 2026-11-14 に読んだ。

- **公式ドキュメント**（Web で取得。本文を逐語で読んだもの）
  - [A] Mitigate jailbreaks and prompt injections: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks （全文）
  - [B] Authentication: https://platform.claude.com/docs/en/manage-claude/authentication （全文）
  - [C] Refusals and fallback: https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback （前半。refusal の形、分類の表、課金、フォールバックの選び方まで）
  - [D] API and data retention: https://platform.claude.com/docs/en/manage-claude/api-and-data-retention （ZDR の節、モデル別の要件、機能の一覧表）
  - [E] Workspaces: https://platform.claude.com/docs/en/manage-claude/workspaces （上限と使い分けの節）
  - [F] Claude Code: Hooks reference https://code.claude.com/docs/en/hooks （前半3分の1）、Hooks guide https://code.claude.com/docs/en/hooks-guide 、Memory https://code.claude.com/docs/en/memory 、Permissions https://code.claude.com/docs/en/permissions （いずれも該当箇所）
- **Claude Code 同梱の資料**（claude-api、2026-11-03 時点）
  - [G] `shared/tool-use-concepts.md`（ツールランナーの Security の注記、bash ツールとテキストエディタツールの Security の注記）
  - [H] `shared/agent-design.md`（Bash vs. dedicated tools）
  - [I] `shared/model-migration.md`（`refusal` stop reason の節）、`python/claude-api/README.md`（Client Initialization）

公開前に、上のページが変わっていないかを見直すこと。

## 一次情報で確認できたもの

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 1 | プロンプトインジェクションは、モデルに指示を無視させようとする攻撃 | 正しい | [A]「attempts to make Claude ignore its guidelines or your instructions」 |
| 2 | 入り口は2つ。ユーザー自身が入力で仕掛ける「直接」と、ユーザーは味方だが第三者のコンテンツに指示が紛れる「間接」 | 正しい | [A]「two categories with different threat models」。直接は「the *user* of your application is the adversary」、間接は「the user is trusted but Claude processes *third-party content*」 |
| 3 | 間接の入り口は、メール、ウェブページ、文書、ツールの結果 | 正しい | [A]「(webpages, emails, documents, tool results)」 |
| 4 | 外部から来たデータは `tool_result` ブロックで渡す。システムプロンプトやユーザーのテキストには入れない | 正しい | [A]「Put untrusted content only in tool results. Deliver third-party content to Claude inside `tool_result` blocks, never in `system` prompts or plain user `text` blocks.」 |
| 5 | Claude は、ツールの結果に含まれる指示を慎重に扱うよう訓練されている | 正しい | [A]「Claude is trained to treat instructions that appear inside tool results with appropriate skepticism.」 |
| 6 | 何のデータで、どこから来たのかを伝える | 正しい | [A]「Tell Claude what the content is and where it came from.」 |
| 7 | システムプロンプトに「ツールが返す内容は信頼できないデータ」という方針を書く | 正しい | [A]「State the policy in your system prompt.」 |
| 8 | 自分の指示は、ツールの結果には入れない。無視されることがある | 正しい | [A]「Don't put your own instructions in tool results. … instructions you place there might be ignored or flagged as a potential injection.」 |
| 9 | ツールが返した内容を軽量なモデルで検査し、注入の疑いがあればそのままは渡さない | 正しい | [A]「Screen tool outputs before Claude acts on them.」「If `injection_suspected` is `true`, return an error or a stripped summary」 |
| 10 | 取り消しにくい操作（メールの送信、データの削除など）の前に、人間の承認を置く | 正しい | [G]「gate destructive operations behind human approval」、[H]「hard-to-reverse actions (external API calls, sending messages, deleting data) can be gated behind user confirmation」 |
| 11 | 最小権限。不要な秘密や権限は渡さず、隔離した環境で実行する。注入が成功しても被害を小さくするため | 正しい | [A]「Apply the principle of least privilege so that a successful injection can do minimal damage: don't give Claude access to secrets it doesn't need, run tools in sandboxed environments, and scope permissions as narrowly as possible.」 |
| 12 | 対策は1つに頼らず重ねる | 正しい | [A]「Advanced: Chain safeguards」「By layering these strategies, you create a robust defense」 |
| 13 | モデルが作ったコマンドやファイルのパスは、信頼できない出力として扱う | 正しい | [G]「commands are untrusted model output」「`path` is untrusted model output」 |
| 14 | 通すコマンドは許可リストで決める。禁止リストでは不十分 | 正しい | [G]「apply an **allowlist** of permitted executables … A blocklist is not sufficient.」（bash ツールについての記述） |
| 15 | 承認が必要な操作は専用のツールに分けると、実行前に止めやすい（メール送信のツールの例） | 正しい | [H]「A `send_email` tool is easy to gate; `bash -c "curl -X POST ..."` is not.」 |
| 16 | 認証の方式は3つ：API キー、Workload Identity Federation、App Attest | 正しい | [B] 冒頭の表 |
| 17 | API キーは静的な秘密。開発や、秘密を自分で管理できるサーバー向き | 正しい | [B]「Static `sk-ant-api...` secret」「Local development, prototyping, scripts, and servers where you control secret storage」 |
| 18 | WIF は、ID プロバイダーが発行する ID を短命のトークンに交換する。静的なキーを置かずに済み、本番環境や CI 向き | 正しい | [B]「Short-lived bearer token exchanged from your identity provider's identity token」「Production workloads on cloud platforms …, CI/CD pipelines, and Kubernetes, where you want to eliminate static secrets」 |
| 19 | App Attest は、iOS と macOS のアプリが、キーを同梱せずに API を直接呼ぶ方式 | 正しい | [B]「iOS and macOS apps distributed to end users, where the app calls the Claude API directly with no back end or proxy」「without shipping an API key」 |
| 20 | 環境変数 `ANTHROPIC_API_KEY` に置けば、SDK が自動で読み込む。コードの `Anthropic(api_key="…")` と `Anthropic()` | 正しい | [B]「set the `ANTHROPIC_API_KEY` environment variable and the client SDK picks it up automatically」と Python の例。[I]「don't hardcode a key」 |
| 21 | キーはシークレットマネージャーに保管する | 正しい | [B]「Store API keys in a secrets manager」 |
| 22 | ブラウザで動くコードにキーを置かない。ページを使う人なら誰でも読める。自社のバックエンドから呼ぶ | 正しい | [B]「Call the Claude API from your own back end, not from code that runs in your users' browsers. Anyone who uses a webpage can read an API key in that page's code.」 |
| 23 | キーには有効期限を付けられる。定期的に入れ替え、漏れた疑いがあれば無効化する | 正しい | [B]「rotate them periodically, and disable or delete any key you suspect has leaked」「set an expiration when you create a key to limit how long a leaked credential stays usable」 |
| 24 | 開発用と本番用でワークスペースを分け、ワークスペースごとに利用額の上限を設定できる | 正しい | [E]「Create separate workspaces for development, staging, and production」「Spend limits: Cap monthly spending for a workspace」。Default Workspace には利用額の上限を付けられない点は、台本では触れていない |
| 25 | ZDR は、データを保存しない取り決め | 正しい | [D]「Under a ZDR arrangement, Anthropic does not store customer prompts or responses at rest after the API response is returned.」申し込みは営業窓口経由、組織ごと |
| 26 | ZDR には対象外の機能やモデルがある。公式の一覧で確認する | 正しい | [D] 機能の一覧表（Batch、Files API、コード実行、メッセージスレッドなどが「No」）。Fable・Mythos の各モデルは30日の保持が必要で、明示の許可がない限り ZDR では使えない |
| 27 | 最近のモデルには安全性の分類器が入っていて、リクエストを断ることがある | 正しい | [C]「Claude Fable 5.2, …, Claude Sonnet 5.5, and Claude Haiku 5.5 include safety classifiers that can decline a request.」 |
| 28 | 断られたとき返るのはエラーではなく、HTTP 200 の通常のレスポンス。`stop_reason` が `refusal` | 正しい | [C]「A refusal is a successful HTTP 200 response with `stop_reason: "refusal"`」 |
| 29 | 出力は何もないか途中まで。途中までの出力は使わずに捨てる | 正しい | [C]「A refusal can arrive before any output, or mid-stream after partial output. In either case, treat any partial output as incomplete and discard it.」 |
| 30 | 断られた理由の分類は `stop_details` に入る | 正しい | [C]「Its `stop_details.category` names the policy area」。分類に当てはまらない場合は `category` が `null` になる（台本では触れていない） |
| 31 | 別のモデルでやり直すフォールバックの仕組みがある | 正しい | [C]「Picking a fallback approach」。サーバー側のフォールバックはベータで、既定では無効（自分で有効にする）。Claude Haiku 5.5 にはサーバー側のフォールバックがない |
| 32 | コード例：`stop_reason` を先に見て、`refusal` なら出力を使わない | 正しい | [I] の例を元に、`content` をブロックごとに `type` で見分ける形（第1回と同じ読み方）に直した。`handle_refusal` はアプリ側で用意する関数の仮の名前 |
| 33 | CLAUDE.md の指示は文脈として読まれるだけで、強制力はない | 正しい | [F] Memory「Claude treats them as context, not enforced configuration.」「CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer.」 |
| 34 | 確実に止めたい操作にはフックを使う。`PreToolUse` フックはツールの実行前に動き、終了コード 2 でブロックできる | 正しい | [F] Memory「To block an action regardless of what Claude decides, use a PreToolUse hook instead.」、Hooks「Exit with code 2 to block the action … a `PreToolUse` hook blocks the tool call」 |
| 35 | ブロックした理由は Claude に伝わる | 正しい | [F] Hooks「Claude receives the hook's stderr as the tool's error」 |
| 36 | 権限の `deny` ルールは、モデルの判断によらず適用される | 正しい | [F] Permissions「Permission rules are enforced by Claude Code, not by the model.」、Memory「Settings rules are enforced by the client regardless of what Claude decides to do.」 |
| 37 | クイズ：メール本文は `tool_result` で渡し、送信の前に人の承認を置く。注意書きだけ、モデルを替えるだけ、では足りない | 正しい | 4・7・10・12 の組み合わせ。[A] 冒頭「Although Claude is inherently resilient to such attacks, the additional steps on this page strengthen your guardrails」 |

## 設計上の助言（API の仕様ではないもの）

次は既存の教材（音声講座の第7章）に基づく一般的なセキュリティの考え方で、公式ドキュメントの文言と照合したものではない。
内容は実務で広く使われる原則だが、「公式がこう定めている」という言い方はしていない。

- 個人情報はデータの最小化が原則。タスクに不要な情報は送らない
- カード番号などは送る前に検出してマスクし、ログにも生のデータを残さない
- SQL を生成させる場合は、読み取り専用のユーザーで実行し、許可した操作だけを通す（考え方は 13・14 と同じだが、SQL についての公式の記述は確認していない）
- コード例の付箋「キーが漏れやすい」（キーをコードに直接書かない理由の説明）
- 見出し「API キーは、漏れる前提で守る」という言い方（個々の対策は 22〜24 で確認済み）

## 元の教材から変えた点

- **外部のデータの置き場所を変えた（教材が古くなっていた点）。** 教材は「外部のデータは、ユーザーのメッセージの側に、XML のタグで囲んで入れる」としていた。現在の公式ドキュメントは「`tool_result` ブロックだけに入れる。`system` にも、ユーザーの `text` ブロックにも入れない」としている（上の 4）。動画は公式に合わせた。
- **「必ず自社のバックエンドを経由させる」を言い切らなくした（教材が古くなっていた点）。** 教材は「ブラウザやスマホのアプリにはキーを含めず、必ずバックエンドを経由させる」としていた。現在は、iOS と macOS のアプリがキーを同梱せずに API を直接呼べる App Attest がある（上の 19）。動画は「ブラウザで動くコードにはキーを置かない」に範囲を絞り、認証の方式として App Attest を紹介した。
- **認証の方式を足した。** 教材は API キーだけを扱っていた。公式ドキュメントは API キー、Workload Identity Federation、App Attest の3つを挙げている（上の 16）。
- **「最大の脅威は、間接プロンプトインジェクション」は使っていない。** 「最大」の根拠が公式にない。直接と間接の2つの入り口として説明した。
- **「プロンプトの工夫だけでは完全には防げない」は、そのままは使っていない。** 公式の言い方に合わせ、「1つの対策には頼らず、重ねる」「注入が成功しても被害を小さくする」とした。
- **「承認疲れ」は入れていない。** 一般的な指摘だが、公式の資料で確認できず、長さも抑えたかったため。
- **Markdown の画像やリンクによるデータの持ち出しは入れていない。** 手元の公式資料で確認できなかったことと、攻撃の具体的な手口の説明になるため。
- **フックの `deny` の判定（JSON 出力の `permissionDecision`）は入れていない。** 公式ページで確認できたが、終了コード 2 の説明だけに絞った。
- **`settings.json` という名前は読み上げていない。** 権限の `deny` ルールとして説明した。設定ファイルの話は第8回の範囲。
- **クイズを差し替えた。** 教材のクイズ（CLAUDE.md に禁止と書けば確実に防げるか）ではなく、この回の中心であるプロンプトインジェクションへの備えを問う問題にした。自作の問題集の D7-01 を短く作り直し、正解を現在の公式の内容（`tool_result`）に合わせた。
- **refusal の場面を足した。** 教材の第7章にはないが、安全性に関わる現在の API の挙動なので入れた（上の 27〜32）。
- **「出題されます」などの出題傾向の話は入れていない。** 根拠がない。

## 言い切っていないこと

- フックは「確実に止めたい操作に使う」と説明したが、公式のフックのページには、条件の絞り込み（`if`）は最善努力であること、タイムアウトしたフックはツールの実行を止めないこと、Bash のコマンドの引数を縛る権限ルールは破られやすいことが書かれている。動画はそこまで踏み込んでいない。厳密な強制には、権限ルールやサンドボックスとの併用が勧められている。
- refusal のフォールバックは「仕組みがある」とだけ言っている。有効にする方法（ベータのパラメータ、SDK のミドルウェア）や、対応するモデルとプラットフォームには触れていない。
- ZDR は「対象外の機能やモデルがある」とだけ言っている。個別の機能名やモデル名は挙げていない。
- 既定のデータ保持の日数には触れていない。公式の商用データ保持ポリシー（privacy.claude.com）を読んでいないため。

## 第2回との関係（シリーズ全体で確認してほしい点）

- 公式の認証のページ [B] は、API キーの送り方を「`Authorization` ヘッダーにベアラートークンとして送る」と説明し、`x-api-key` を「legacy（従来の形式）」と呼んでいる。ただし `x-api-key` も引き続き使え、同じページの cURL の例は `x-api-key` を使っている。第2回の「API キーは `x-api-key` というヘッダーで送ります」は誤りではないが、現在の公式の説明の中心は `Authorization: Bearer`。第7回ではヘッダーの話をしていない。

## 未確認のまま残っている主張

なし（設計上の助言は、上のとおり仕様としては扱っていない）。

# 事実確認：ep08-team-enablement（開発チームの生産性と運用）

確認日: 2026-11-16

この回の台本は、講座の本文 `CCAR-P/course/ch08.md`（第8章）を動画用に組み直したもの。
下の表は、本文の「事実確認」の表（2026-11-16 に、公式の試験ガイド v1.0 と Claude Code の公式ドキュメントで照合済み）から、
台本に入れた主張に当たる行を引いたもの。表の「#」は、本文の表の番号。本文にない事実は台本に足していないので、追加の確認はない。

根拠は次の2つ。

- **公式の試験ガイド**: Claude Certified Architect – Professional 試験ガイド v1.0（日本語版・英語版）。2026-12-07 に試験内容の更新が予定され、更新版のガイドは 2026-11-17 に公開予定。配点の数字は v1.0 のもので、台本では「現行の試験ガイド、バージョン1.0 では」と添えた。サムネイルと場面の見出しには、配点の数字を入れていない
- **Claude Code の公式ドキュメント**: code.claude.com/docs の各ページ（URL は表と末尾の一覧）

## 試験の範囲

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 1 | 分野7は「開発者の生産性と運用支援」。現行の試験ガイド v1.0 では配点7%で、いちばん小さい分野。タスクは、チーム向けに Claude のツールと環境を構成する、AI 支援ツールで開発者のワークフローを改善する、デバッグと運用上の問題解決を支援する、の3つ。題材は、試験ガイドが例に挙げる Claude Code | 正しい | 試験ガイド v1.0 日本語版・英語版 セクション6「分野7：開発者の生産性と運用支援（7%）」。タスクの文面に「（Claude Codeなど）」とある。7%は7分野の中で最小（outline.md の配点表）。番号 7.1〜7.3 は教材の便宜上のもので、台本では使っていない |

## チームの設定（場面 layers・deploy）

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 3 | 設定の置き場所には、自分だけに効くユーザー設定（ホームディレクトリ）、コミットしてチーム全員に効く `.claude/settings.json`、組織が配る管理設定がある | 正しい（ほかに、個人の上書き用の `.claude/settings.local.json` があるが、本文と同じく省いた。台本では置き場所の数を言っていない） | https://code.claude.com/docs/en/settings 「Settings files and who they affect」の表。日本語版ドキュメントは managed settings を「管理設定」と訳す（https://code.claude.com/docs/ja/admin-setup） |
| 4 | 管理設定はいちばん優先され、開発者は上書きできない | 正しい（例外あり。台本では触れない） | https://code.claude.com/docs/en/settings 「Settings precedence」: Managed settings が最上位。「Nothing in your own settings files or `--settings` overrides a managed key」。一部のセキュリティ上のキーは、下位のより厳しい値が優先される例外がある（厳しくする方向だけなので、主張は崩れない） |
| 5 | 許可や拒否のルールの一覧は、すべての置き場所の分が合わさる。開発者はルールを足せても、組織のルールは外せない | 正しい | https://code.claude.com/docs/en/admin-setup 「Array settings such as permissions.allow and permissions.deny merge entries from all sources, so developers can extend managed lists but not remove from them」 |
| 6 | 管理設定の配り方は2つ。claude.ai の管理コンソールから配るサーバー管理の設定と、MDM や決まった場所のファイル | 正しい（サーバー管理の設定には Teams または Enterprise のプランが要る。本文と同じく省いた） | https://code.claude.com/docs/en/admin-setup 「Decide how settings reach devices」。https://code.claude.com/docs/en/server-managed-settings 「Requirements: Claude for Teams or Claude for Enterprise plan」 |
| 7 | サーバー管理の設定は端末の側で効く仕組みで、セキュリティの境界ではない。強く守らせたいなら、MDM で管理する端末に配る | 正しい | https://code.claude.com/docs/en/server-managed-settings 「Security considerations」: 「they operate as a client-side control, not a security boundary. On unmanaged devices, a user doesn't need admin or sudo access to bypass them」「For stronger enforcement guarantees, use endpoint-managed settings on devices enrolled in an MDM solution」 |
| 8 | 配ったあとは `/status` で、組織の設定が効いているかを確かめる | 正しい | https://code.claude.com/docs/en/admin-setup 「Verify and onboard」: `/status` の `Setting sources` 行に `Enterprise managed settings` と出る |

## スキルの配布と支出の管理（場面 skills・spend）

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 9 | リリースや障害対応の手順書はスキルにまとめる。ふだんは名前と説明だけがコンテキストに入り、本文は必要なときに読まれる。CLAUDE.md に長く書くより、ほかの作業の邪魔をしない | 正しい | https://code.claude.com/docs/en/best-practices 「Put team procedures in skills」: 「how your team does a release, what your incident runbook says … goes in a skill」「it sees the name and description in every session, but only reads the full file when the task calls for it」 |
| 10 | 1つのリポジトリなら `.claude/skills` にコミット、広く配るならプラグイン、組織全体には管理設定。個人のホームディレクトリに置くだけでは、チームに届かない | 正しい | https://code.claude.com/docs/en/skills 「Share skills」: Project skills、Plugins、Managed。「Choose where skills load」の表: Personal は自分の端末の全プロジェクトだけ |
| 11 | 管理設定で、プラグインを全員の端末で有効にできる。入手先のマーケットプレイスを、承認したものに絞れる | 正しい | https://code.claude.com/docs/en/plugins/org 「Pre-install and require plugins」: `extraKnownMarketplaces` と `enabledPlugins` を管理設定に置く。https://code.claude.com/docs/en/admin-setup 「Plugin marketplace control」: `strictKnownMarketplaces` などで、追加・インストールできるマーケットプレイスを制限 |
| 12 | Teams と Enterprise では、席ごとの利用枠を超えた分に、組織、グループ、メンバーの単位で上限を決められる | 正しい | https://code.claude.com/docs/en/costs 「Claude for Teams and Enterprise」: 「the seat allowance is the default ceiling. To let members continue past it, turn on usage credits and set spend limits at the organization, group, or individual member level」 |
| 13 | ダッシュボードでは利用者の数のような定着の度合いが見え、メンバーごとの支出はレポートで確かめる | 正しい | https://code.claude.com/docs/en/analytics: 日々の利用者数、セッション、PR などの貢献の指標（GitHub 連携が必要、公開ベータ）。https://code.claude.com/docs/en/admin-setup: 「per-user usage and spend numbers come from the spend report … not the analytics dashboard」 |
| 14 | どの提供ルートでも、OpenTelemetry で、自社のモニタリングの仕組みへ利用のデータを送れる | 正しい | https://code.claude.com/docs/en/admin-setup 「Set up usage visibility」: Usage monitoring「OpenTelemetry export of sessions, tools, and tokens」「All providers」。https://code.claude.com/docs/en/monitoring-usage |

## レビューの規律（場面 review・rules）

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 15 | Claude は作業が終わったように見えたところで止まる。テストやビルドのような、合格か不合格かを返す確かめ方を渡す。完了の報告には、実行したコマンドと出力という証拠を求める。要約だけを信じない | 正しい | https://code.claude.com/docs/en/best-practices 「Give Claude a check to run」: 「Claude stops when the work looks done」「Give Claude something it can run that comes back pass or fail」「ask Claude for evidence: the command it ran and its output」「"All tests pass" on its own tells you very little」 |
| 16 | `/code-review` は、会話を見ていないサブエージェントで差分を確かめるので、コードを生んだ推論に引きずられない | 正しい | https://code.claude.com/docs/en/best-practices: 「`/code-review` reviews the diff in a fresh subagent that never saw your conversation. It isn't swayed by the reasoning that produced the code」 |
| 17 | CLAUDE.md やスキルはモデルが読んで判断する指示で、守られないことがある。毎回必ず守らせたいことは、フック、拒否のルール、管理設定のように Claude Code が強制する仕組みに置く。最後の決定は、ブランチの保護とマージを承認する人に残す | 正しい | https://code.claude.com/docs/en/best-practices 「Deterministic and non-deterministic instructions」の表（Who has the last word: Branch protection, a person who approves the merge）、「If something has to happen every time, make it a hook, a deny rule, or a managed setting」 |

## 問題の切り分け（場面 status・layer）

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 18 | 設定がある開発者にだけ効かないときは、まず `/status` で読み込まれた設定を見る。上の層が同じ項目を決めていることがある。許可のルールは、その人がフォルダーを信頼するまで効かない | 正しい | https://code.claude.com/docs/en/settings 「Troubleshoot a setting that doesn't apply」: 「start with /status」「A higher level sets it」「permissions.allow rules … apply only after each teammate trusts the folder … deny and ask rules apply right away」 |
| 17 | CLAUDE.md のルールがときどき破られるなら、言葉を強めても直らない。強制する仕組みへ移す | 正しい | 同上 best-practices: 「If you keep adding emphasis to a CLAUDE.md line and Claude still misses it, that's a sign the line belongs in a hook」 |
| 19 | コードの不具合は、再現の手順とエラーの全文を渡して調べ、毎回か、ときどきかを伝える | 正しい | https://code.claude.com/docs/en/common-workflows 「Fix bugs efficiently」Tips: 「Tell Claude the command to reproduce the issue and get a stack trace」「Mention any steps to reproduce」「Let Claude know if the error is intermittent or consistent」 |

## ミニクイズ（場面 quiz）

| # | 台本の主張 | 判定 | 根拠 |
|---|---|---|---|
| 20 | 正解は C（拒否のルールを管理設定に入れて配る）。管理設定の拒否のルールは Claude Code が毎回強制し、開発者は外せない。A はモデルの判断に任せたまま。B（記録を集めてあとで見つける）は発見的な統制で、違反そのものは防げない | 正しい | #5、#17 と同じ根拠。誤答の型は試験ガイドのサンプル1の解説（ロギングは発見的統制）と blueprint.md 7章。問題は講座の本文の自作問題で、実際の試験問題ではない |

## 事実の主張ではないもの

- 場面 axis「どの章でも、判断の軸は同じ」（原因を取り除く、必要なものは捨てない、必ず守らせたいことは仕組みで強制する）は、講座の本文の結びの一文を画面にしたもの。講座全体のまとめで、試験ガイドやドキュメントの記述ではない。
- 場面 review の「確かめ方を渡す → 証拠を求める → 別の目で見る」を左から右の3段にしたのは、#15・#16 を1枚にまとめた図解。ドキュメントに同じ図はない。

## 試験ガイドと現行ドキュメントの食い違い

- 本文の記録どおり、なし。試験ガイドの分野7はタスクが1行ずつで、Claude Code の設定名や機能名を挙げていない。台本の機能の説明は、2026年11月時点の Claude Code のドキュメントに基づく。
- 参考: 第三者の対策サイトには「サーバー管理の設定で、上書きできないセキュリティ設定を強制する」という趣旨の記述がある。台本は本文と同じくドキュメントに従い、「サーバー管理の設定はセキュリティの境界ではない。強く守らせたいなら MDM で管理する端末に配る」とした。

## 講座の本文から変えた点

- 1文を短く切り、場面の画面の変化に合わせて並べ直した。支出の場面は、見える化を先、上限を後に話す順にした（内容は同じ）。
- 「英語では managed settings」は、長さの都合で声では言っていない（読みの辞書には残した）。
- 「マーケットプレイス、つまりプラグインの目録」の言い換えは、長さの都合で省いた。
- ミニクイズの選択肢の「1番・2番・3番」は、画面のマークシートに合わせて「A・B・C」にした。選択肢と正解の内容は同じ。
- 本文の「この章で学ぶこと」の「配点は7%」には、「現行の試験ガイド、バージョン1.0 では」を添えた（2026-12-07 の試験内容の更新に備えて）。

## 未確認のまま残っている主張

なし。台本の主張は、すべて本文の事実確認の表（2026-11-16 照合済み）の行に対応する。この回で新たに WebFetch で確かめた主張はない。

## 参照した URL

- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/admin-setup
- https://code.claude.com/docs/ja/admin-setup
- https://code.claude.com/docs/en/server-managed-settings
- https://code.claude.com/docs/en/best-practices
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/plugins/org
- https://code.claude.com/docs/en/costs
- https://code.claude.com/docs/en/analytics
- https://code.claude.com/docs/en/monitoring-usage
- https://code.claude.com/docs/en/common-workflows

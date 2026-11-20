# 事実確認：ep04-claude-code-config（Claude Code の設定）

確認日: 2026-11-16

根拠は、素材 `CCAR-F/course/ch04.md` の「事実確認」の表（2026-11-16 に公式の試験ガイド v1.0 と公式ドキュメントで照合済み）。
台本に入れた主張ごとに、素材の表の該当行（素材の # の番号）を引いた。素材にない主張は台本に足していないので、追加の取得はしていない。

- **試験ガイド**: CCAR-F 公式試験ガイド v1.0（2026年7月発効）。`CCAR-F/reference/` の PDF とテキスト
- **公式ドキュメント**（2026-11-16 時点）: code.claude.com/docs の memory、skills、claude-directory、features-overview の各ページ。URL は末尾の一覧

## 台本の主張

| # | 台本の主張（場面） | 判定 | 根拠（素材の #） |
|---|---|---|---|
| 1 | 第4回は分野3の前半、タスク3.1〜3.3。分野3の配点は20%（open） | 正しい | 素材 #1。`reference/outline.md` の分野の表と章立て ／ 試験ガイド v1.0 分野3 |
| 2 | CLAUDE.md は Claude Code が読み込む指示のファイル。試験ガイドは3つの階層を挙げる（tiers） | 正しい | 素材 #2。試験ガイド タスク 3.1 知識1 |
| 3 | ユーザーレベル `~/.claude/CLAUDE.md` は全プロジェクトで効くが、効くのは自分だけ（tiers） | 正しい | 素材 #2・#3。memory ページ「User instructions `~/.claude/CLAUDE.md` … Only you (all projects)」 |
| 4 | プロジェクトレベルはリポジトリのルートか `.claude/CLAUDE.md`。バージョン管理でチームに共有（tiers） | 正しい | 素材 #2。memory ページ「Project instructions `./CLAUDE.md` or `./.claude/CLAUDE.md` … Team members via source control」 |
| 5 | ディレクトリレベルは、サブディレクトリに置いた CLAUDE.md（tiers） | 正しい | 素材 #4。memory ページ「Files in subdirectories load on demand」「Claude Code loads each one once Claude reads, writes, or edits another file in that subdirectory」 |
| 6 | 新メンバーにだけ規約が届かないなら、ユーザーレベルに書かれていると疑い、プロジェクトの CLAUDE.md に移す（missing） | 正しい | 素材 #3。試験ガイド タスク 3.1 知識2、スキル1 ／ memory ページの表「Shared with: Only you」 |
| 7 | セッションごとに挙動が違うときは `/memory` で読み込まれたメモリファイルを確かめる。現行は確認に `/context` も案内（missing） | 正しい（現行の違いを添えた） | 素材 #5。試験ガイド タスク 3.1 スキル4 ／ memory ページ「The `/memory` command lists your CLAUDE.md, CLAUDE.local.md, and other memory file locations …」「Run `/context all` and check the list under Memory files …」 |
| 8 | `@import` 構文。アットマークに続けてパスを書くと、そのファイルを取り込める（split） | 正しい | 素材 #6。試験ガイド タスク 3.1 知識3 ／ memory ページ「CLAUDE.md files can import additional files using `@path/to/import` syntax」 |
| 9 | 各パッケージの CLAUDE.md で、関係する規約ファイルだけを選んで取り込む（split） | 正しい | 素材 #7。試験ガイド タスク 3.1 スキル2 |
| 10 | `.claude/rules/` に、巨大な CLAUDE.md の代わりにトピック別のファイル（`testing.md`、`deployment.md`）を置く（split） | 正しい | 素材 #8。試験ガイド タスク 3.1 知識4、スキル3 ／ memory ページ「Each file should cover one topic, with a descriptive filename like `testing.md` or `api-design.md`」 |
| 11 | `.claude/rules/` のファイルの先頭の YAML フロントマターの `paths` に glob パターンを書く。一致するファイルを扱うときだけ読み込まれ、関係のない文脈とトークンを減らす（paths、wrong） | 正しい | 素材 #9。試験ガイド タスク 3.3 知識1・2 ／ memory ページ「Rules can be scoped to specific files using YAML frontmatter with the `paths` field」「only load into context when Claude works with matching files, reducing noise and saving context space」 |
| 12 | `**/*.test.tsx` のようなパターンなら、テストファイルが散らばっていても場所に関係なく当たる（paths） | 正しい | 素材 #10。試験ガイド タスク 3.3 スキル1・2 ／ memory ページの表「`**/*.ts` … files anywhere under the base directory」 |
| 13 | 散らばったファイルには、サブディレクトリの CLAUDE.md（場所に縛られ、何か所にも書く）よりパス指定のルール。規約をスキルにすると、呼び出されたときしか読み込まれない（wrong） | 正しい | 素材 #11。試験ガイド タスク 3.3 知識3、スキル3 ／ 公式サンプル問題6の誤答の型 ／ features-overview「Skill: Loads On demand, when invoked or relevant」 |
| 14 | 試験ガイドは「一致するファイルを編集するとき」に読み込まれるとする。現行では読むときにも読み込まれる（wrong） | 正しい（食い違いを添えた） | 素材 #12 と「食い違い」の項。memory ページ「A path-scoped rule loads when Claude uses the Read, Write, or Edit tool on a matching file」 |
| 15 | カスタムスラッシュコマンドは、スラッシュと名前で呼び出す決まった手順のプロンプト。`.claude/commands/` はバージョン管理で共有、クローンした全員が使える。`~/.claude/commands/` は個人用（commands） | 正しい | 素材 #13。試験ガイド タスク 3.2 知識1 ／ claude-directory ページ「`commands/*.md` Project and global … Single-file prompts; same mechanism as skills」 |
| 16 | スキルは `.claude/skills/` のフォルダに `SKILL.md` を置く（commands） | 正しい | 素材 #15。試験ガイド タスク 3.2 知識2 ／ skills ページ「Project `.claude/skills/<skill-name>/SKILL.md` … Commit it so your team gets it too」 |
| 17 | チームのスキルを自分好みに変えたいときは、共有のファイルを書き換えず、`~/.claude/skills/` に別の名前で作る（commands） | 正しい | 素材 #16。試験ガイド タスク 3.2 知識4 ／ skills ページ「Personal `~/.claude/skills/<skill-name>/SKILL.md`」 |
| 18 | CLAUDE.md は指示を書く場所で、コマンドを定義する場所ではない（commands） | 正しい | 素材 #14。公式サンプル問題4の解説の要旨 ／ features-overview「CLAUDE.md … Can trigger workflows: No」 |
| 19 | 現在は、カスタムコマンドはスキルに統合されている。従来のファイルもそのまま動く（commands） | 正しい | 素材 #17。skills ページ「Custom commands have been merged into skills. Your existing `.claude/commands/` files keep working.」 |
| 20 | `context: fork` は、分離されたサブエージェントの文脈で実行する。長い出力や探索的な作業をメインの会話から切り離せる（frontmatter） | 正しい | 素材 #18。試験ガイド タスク 3.2 知識3、スキル2 ／ skills ページ「Set to `fork` to run in a forked subagent context」 |
| 21 | `allowed-tools` は、試験ガイドではツールを絞って破壊的な操作を防ぐ設定。現行では確認なしで使えるツールの許可にあたり、取り除くには `disallowed-tools`（frontmatter） | 正しい（食い違いを添えた） | 素材 #19 と「食い違い」の項。試験ガイド タスク 3.2 スキル3 ／ skills ページ「Tools Claude can use without asking permission during the turn that invokes this skill」「It does not restrict which tools are available」「`disallowed-tools`: Tools removed from Claude's available pool while this skill is active」 |
| 22 | `argument-hint` は、必要な引数の入力を促すヒント（frontmatter） | 正しい | 素材 #20。試験ガイド タスク 3.2 スキル4 ／ skills ページ「Hint shown during autocomplete to indicate expected arguments」 |
| 23 | 使い分けの軸は毎回要るか。全体共通の標準は常に読み込まれる CLAUDE.md、特定のファイルだけの規約はパス指定のルール、特定の作業の手順は必要なときに呼ぶスキル（choose） | 正しい | 素材 #21。試験ガイド タスク 3.2 スキル5 ／ features-overview「CLAUDE.md: Loads Every session, automatically … Skill: On demand」 ／ skills ページ「Unlike CLAUDE.md content, a skill's body loads only when it's used」 |
| 24 | まれにしか使わない長い手順を CLAUDE.md に書くと、毎回の文脈を圧迫する（choose） | 正しい | 素材 #22。memory ページ「If an entry is a multi-step procedure or only matters for one part of the codebase, move it to a skill or a path-scoped rule instead」「Longer files consume more context and reduce adherence」 |
| 25 | ミニクイズ: 長い出力で会話が埋まるスキルには `context: fork`。分離したサブエージェントで動き、結果だけがメインの会話に戻る（quiz） | 正しい | 素材 #18・#23。skills ページ「The subagent summarizes its results and returns them to your main conversation when it finishes」 |
| 26 | 次回（第5回）は「Claude Code の進め方と CI」（wrap） | 正しい | `reference/outline.md` の章立て |

## 画面の例について

- `paths` の場面のコード（`paths:` の下に `"**/*.test.tsx"` を1つ書き、本文に「# テストの規約」）は、説明用に作った最小の例。`paths` を YAML のリストで書く形は memory ページの例と同じ。ファイル名 `testing.md` との組み合わせは、素材の2つの例（`testing.md` と `**/*.test.tsx`）をつないだもの。

## 試験ガイドと現行ドキュメントの食い違い（素材と同じ立場で扱った）

- `allowed-tools`: ガイドの立場（ツールの制限）を主にし、現行は「確認なしで使えるツールの許可」で、取り除くには `disallowed-tools` と一言添えた。画面の説明も「ガイドでは制限。現行は確認なしの許可」。
- パス指定のルールが読み込まれる時: 本文は「扱うとき」と言い、ガイドの「編集するとき」と、現行の「読むときにも」を添えた。
- `/memory`: ガイドの立場（読み込まれているメモリファイルの確認）を主にし、現行は `/context` も案内されていると添えた。
- カスタムコマンド: ガイドの立場（`.claude/commands/` とスキルは別）で説明し、現行はスキルに統合、従来のファイルも動くと添えた。
- `argument-hint`: 素材と同じく「必要な引数の入力を促すヒント」と、両方に合う言い方にした。
- 個人用スキルの名前: ガイドどおり「別の名前で」作るとした（現行では、同名なら個人用が優先される点は扱っていない）。

## 素材（音声講座の第4章）から変えた点

- 1文を短く切り、場面ごとに組み直した。事実は足していない。
- 「巨大な CLAUDE.md の代わりに」は、画面と声の文から外した（素材 #8 の趣旨は「トピック別のファイルに分けて置く」で残した）。
- `context: fork` の使いどころの例（コードベースの分析、別案の検討）は、「長い出力や、探索的な作業」にまとめた。
- 「プランモードなど、進め方の話は第5章で扱う」は、まとめの次回予告（「Claude Code の進め方と CI」）に置き換えた。
- ミニクイズは素材の3択のまま。問題文を短くし（「依存関係を洗い出して」を省いた）、選択肢の番号（1〜3番）を A〜C にした。

## 未確認のまま残っている主張

なし。

## 参照した URL

- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/claude-directory
- https://code.claude.com/docs/en/features-overview

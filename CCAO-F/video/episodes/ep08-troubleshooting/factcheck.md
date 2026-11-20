# 事実確認：ep08-troubleshooting（うまくいかないときの直し方）

確認日: 2026-11-16

根拠は、講座の本文 `CCAO-F/course/ch08.md` の「事実確認」の表（2026-11-16 に、公式の試験ガイド v1.0 と公式ドキュメント・ヘルプセンター・Partner Academy の対策講座のページで照合済み）。台本の主張ごとに、該当する行を引いた。表の「#」は ch08.md の表の番号。台本には、素材にない事実を足していない。

この試験は 2026年12月7日に試験内容が更新される予定（更新版の試験ガイドは 2026年11月17日に公開予定）。この回は試験ガイド v1.0 に基づく。配点を言う箇所は「現行の試験ガイド、バージョン1.0 では」と添え、サムネイルと場面の見出しには配点の数字を入れていない。公開前に、更新版のガイドで分野7 の名前・配点・タスクを見直すこと。

## 試験ガイドの範囲

| # | 台本の主張 | 場面 | 判定 | 根拠 |
|---|---|---|---|---|
| 1 | 分野7 はトラブルシューティングと最適化。現行の試験ガイド v1.0 では配点は10% | open | 正しい | 試験ガイド v1.0 §6（日本語版「分野7：トラブルシューティングと最適化（10%）」、英語版「Domain 7: Troubleshooting and Optimization (10%)」）／ `CCAO-F/reference/outline.md` |
| 2 | 扱うのは3つ: 原因を見つけて直す、結果を見て変える、ワークフローを良くする | open、feedback、settings | 正しい | 試験ガイド v1.0 §6 分野7 の3つの箇条（原因を特定・診断・解決する、フィードバックと結果に基づいて調整する、効率と効果のためにワークフローを最適化する） |

## 原因を見つけて直す（タスク 7.1）

| # | 台本の主張 | 場面 | 判定 | 根拠 |
|---|---|---|---|---|
| 3 | 期待外れの出力に対し、多くの人は「Claude にはできない」とあきらめるか、思いつくままに変える。公式の対策講座はどちらでもなく、よくある失敗の型を見分けて、原因から直すことを勧める | attitude | 正しい | https://anthropic-partners.skilljar.com/path/claude-certified-associate-foundations/troubleshooting-optimization 「give up and conclude "Claude can't do this," or start changing random things until something works」「identify common failure patterns」 |
| 5 | 同じ依頼のまま作り直して、いちばん良いものを選ぶのは修正ではない。まず、ずれの中身を言葉にする | describe | 正しい（考え方として） | 同上「start changing random things」を退け、根本原因まで「trace」することを求める。試験ガイド タスク 7.1「特定、診断、解決する」 |
| 4 | 不調の根本原因は4つ: 指示の不足、コンテキストの詰め込みすぎ、機能やモデルの選び間違い、設定が古い | causes | 正しい | 同上の学習目標「under-specification, context overload, the wrong feature or model, or stale configuration」 |
| 7 | 指示の不足は、誰に向け、何のため、形式と長さが伝わっていない状態。Claude は足りない部分を推測して埋める | underspec | 正しい | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices 「Be clear and direct」「If you want Claude to do more than the task strictly requires, explicitly request it rather than relying on the model to infer this from vague prompts」「Be specific about the output format and constraints」。`reference/outline.md` 第1章の補足（対象読者、目的、形式、長さ） |
| 6 | 公式のプロンプトのガイドは、依頼文を事情を知らない同僚に見せることを勧める。同僚が迷うなら Claude も迷う | underspec | 正しい | 同上「Key test: Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too.」 |
| 8 | 形式のばらつきには、「そろえて」と頼むより、見本を示すほうが確実 | underspec | 正しい | 同上「Examples are one of the most reliable ways to steer Claude's output format, tone, and structure. … improve accuracy and consistency.」 |
| 9 | 詰め込みすぎには、話題が変わったら始め直す、要約して持ち越す、資料を絞る。何を渡し、いつ始め直すかは使う人が判断する | overload | 正しい（ガイドの立場） | 試験ガイド タスク 3.4「やり直す、要約する、保持するタイミング」。対策講座の根本原因「context overload」 |
| 10 | Claude が長い会話を自動で要約する場合もある（2026年11月時点の製品の動き） | overload | 正しい（条件つき） | https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work 「When your conversation approaches the context window limit, Claude summarizes earlier messages」（コード実行が有効な場合）。台本は「場合もありますが、何を渡し、いつ始め直すかは、使う人が判断します」と、ガイドの立場を主にして弱めた |
| 11 | 最新の業界の動きを調べるなら、何度も調べながら進めるリサーチが向く | tool-stale | 正しい | https://support.claude.com/en/articles/11088861-use-research-on-claude 「It runs multiple searches that build on each other」「Claude researches the web and your connected tools」 |
| 13 | 古い設定: プロジェクトの資料や指示が現実に追いついていないと、Claude はそれをもとに答える。依頼の工夫では直らず、資料と指示を更新する | tool-stale、match | 正しい | 対策講座の根本原因「stale configuration」。試験ガイド タスク 5.4「設定、ナレッジソース、指示に情報を反映し、維持、更新する」。プロジェクトのナレッジがチャットの背景として使われること（#12） |
| 4・7・13 | 原因に合わない対策では直らない（指示の不足に上位のモデル、古い資料に言い回しの整え直し）。見た目だけの対処や大きすぎる対処は、試験の誤答の定番 | match | 正しい（素材の本文の整理） | 根本原因と対策の対応は #4・#8・#13。誤答の定番は `reference/outline.md`「問題集の配分」の「誤答の定番: … 見た目だけの対処（言い換え、書式の整え直し）、極端な対処 … いつも最上位のモデルを使う」と同じ整理 |

## 結果で確かめる（タスク 7.2）

| # | 台本の主張 | 場面 | 判定 | 根拠 |
|---|---|---|---|---|
| 2 | 直したら新しい出力を前の出力と比べる。一度に変えるのは原因と考えた点だけ。読み手の指摘は次の依頼の条件にする | feedback | 正しい（ガイドの立場） | 試験ガイド v1.0 分野7「フィードバックと結果に基づいて調整する」。`reference/outline.md` 第1章 1.3（当てずっぽうではなく、何が足りなかったかを見て直す） |
| 14 | 対策講座は、繰り返しの手直しを、持続する修正に変えることを求める。設定に入れれば、次からは最初から正しい形で出る | persist、quiz | 正しい | 対策講座の学習目標「turning recurring corrections into fixes that persist instead of repeating the same manual work」「promote a one-time fix into a permanent one」 |

## 設定に移す（タスク 7.3）

| # | 台本の主張 | 場面 | 判定 | 根拠 |
|---|---|---|---|---|
| 15 | 共通の文脈、形式、検証の手順を、プロジェクト、スキル、常設の指示へ移す | settings、verify | 正しい | 対策講座の学習目標「promoting shared context, format, and verification steps into Projects, Skills, and standing instructions」。日本語版ガイド §7 の訳語「スキル」に合わせた |
| 12 | プロジェクトは仕事ごとの作業場。ルールと資料を置く（画面の項目） | settings | 正しい | https://support.claude.com/en/articles/9517075-what-are-projects 「self-contained workspaces with their own chat histories and knowledge bases」「define project instructions for each project」／ https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features 「These instructions only apply to chats within that project.」 |
| 16 | スキルは、決まった作業を毎回同じやり方でこなすための手順で、必要な場面でだけ読み込まれる | settings | 正しい | https://support.claude.com/en/articles/12512176-what-are-skills 「teach Claude how to complete specific tasks in a repeatable way」「load only when relevant」 |
| 18 | いまは画面上で、スキルがプラグインのページにまとめられつつある | settings | 正しい | https://support.claude.com/en/articles/17740565-manage-plugins-skills-and-connectors-from-one-plugins-page 「Plugins, skills, and connectors are coming together in one Plugins experience」（個人・Team は11月9日に一般提供、Enterprise は11月30日） |
| 17 | 常設の指示は、すべての会話に効く | settings | 正しい | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features 「Any instructions you add here will be applied to all of your conversations with Claude.」（プロフィールの指示） |
| 19 | 効率化は人の確認をなくすことではない。手に余る作り込みは技術の担当者に相談する | verify | 正しい（ガイドの立場） | 試験ガイド タスク 2.4（人間によるレビューが必要な場面の判断）、§1・§3（複雑または技術的な作業は Architect や Developer にエスカレーションする） |

## 振り返りとミニクイズ

| # | 台本の主張 | 場面 | 判定 | 根拠 |
|---|---|---|---|---|
| — | 講座全体の振り返り（書く、確かめる、選ぶ、組み込む・設定する、守る、直す） | review | 正しい（講座の構成） | `reference/outline.md` の章立て（第1〜8章の範囲） |
| 20 | 試験が問うのは機能の暗記ではなく判断。迷ったら、目的を果たしつつ、確かめられ、ルールに沿った、ちょうどよい大きさの手を選ぶ | rightsize、wrap | 解釈（公式サンプル問題の分析） | 試験ガイド §8 のサンプル問題3問と解説。`reference/blueprint.md` 7.1 の分析。台本では「試験ガイドに書かれた決まり」とは言っていない |
| 14・4 | ミニクイズ: 毎回同じ指摘を受ける案内文は、締め切りと文体のルールをプロジェクトの指示に書く。原因は指示の不足なので、モデルを替えても直らない | quiz | 正しい（自作の問題） | #14（繰り返しの手直しを持続する修正に）、#4・#12（指示の不足、プロジェクトの指示）。問題は素材の自作のミニクイズを短くしたもので、実際の試験問題ではない |

## 試験ガイドと現行の製品の食い違い（素材と同じ扱い）

- **コンテキストの管理。** 試験ガイド（タスク 3.4）と対策講座は、詰め込みすぎを使う人が管理すべき原因として扱う。2026年11月時点のヘルプセンターでは、コード実行が有効なら、長い会話が上限に近づくと Claude が前の部分を自動で要約して続ける。台本はガイドの立場（使う人が判断する）を主にし、自動の要約は「場合もあります」と一言添えた。
- **スキルの画面。** 試験ガイド §7 は「スキル」を独立した機能として挙げる。2026年11月時点では、スキル、コネクタ、プラグインが1つの「プラグイン」のページにまとめられつつある。台本は「スキル」の名前で説明し、「いまは画面上で、プラグインのページにまとめられつつあります」と一言添えた。
- **常設の指示。** 「常設の指示（standing instructions）」は試験ガイドにない対策講座の用語。現行の製品では、すべての会話に効く「プロフィールの指示」と、プロジェクト内だけに効く「プロジェクトの指示」がある。台本は「すべての会話に効く指示」として説明し、プロジェクトの指示はプロジェクトの項とクイズで別に扱った。

## 素材（ch08.md）から変えた点

- 動画用に、1文を短く切り、場面ごとに組み直した。事実は足していない。
- 長さ（7分以内）の都合で、次を省いた: 「詳しくは第4章で扱いました」（リサーチ）、プロジェクトの例（広報チームの表記ルールと過去の発表資料）、「社内のシステムとの連携のように」、自動の要約と画面の変化の文の「2026年11月時点では」（概要欄に「2026年11月時点の情報」と書く）。
- 1つ目の原因の「Claude は、足りない部分をもっともらしく推測して埋めます」は「推測で埋めます」に縮めた。
- 「原因に合わない対策」の場面の左の列（指示の不足なら条件や見本を足す、古い資料なら資料を更新する）は、素材の同じ節の対策（#8・#13）を対比のために並べたもの。
- 振り返りの「書く・確かめる／選ぶ・組み込む／守る・直す」を3つの箱にまとめたのは、素材の本文の6つの動詞を画面用に組にした図解。
- 「ちょうどよい大きさの手」の3つの条件の説明（仕事の目的に届いている、人が中身を確かめられる、データと社内のルールを守っている）は、素材の言葉を画面用に言い換えたもの。
- ミニクイズは、素材の3択をそのまま使い、問題文を短くした（選択肢は A〜C で表示）。

## 確認できなかった点

- 対策講座の中身（ログインが必要）は読めていない。素材と同じく、講座の説明と学習目標のページだけを根拠にした。
- ヘルプセンターで「新しい話題は新しいチャットで」という明示の記述は、素材の確認でも見つかっていない。台本ではヘルプセンターの記述として言わず、試験ガイド（タスク 3.4）の立場として扱った。

## 参照した URL

- https://anthropic-partners.skilljar.com/path/claude-certified-associate-foundations/troubleshooting-optimization
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work
- https://support.claude.com/en/articles/11088861-use-research-on-claude
- https://support.claude.com/en/articles/9517075-what-are-projects
- https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features
- https://support.claude.com/en/articles/12512176-what-are-skills
- https://support.claude.com/en/articles/17740565-manage-plugins-skills-and-connectors-from-one-plugins-page

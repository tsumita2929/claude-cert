# 事実確認：ep05-claude-code-workflows（Claude Code の進め方と CI）

確認日: 2026-11-16

根拠は、素材 `CCAR-F/course/ch05.md` の「事実確認」の表（2026-11-16 に、公式の試験ガイド v1.0 と code.claude.com/docs の各ページで照合済み）。台本に入れた主張ごとに、該当する行を引いた。表の「素材#」は、素材の表の番号。

素材にない要素はコード例の2つだけで、どちらも 2026-11-16 に headless.md を取得して書き方を確かめた（末尾の「台本で足したもの」）。

## 台本の主張

| # | 台本の主張（場面） | 判定 | 根拠 | 素材# |
|---|---|---|---|---|
| 1 | 第5回は分野3「Claude Code の設定とワークフロー」の後半（open） | 正しい | reference/outline.md の分野と配点の表、章立ての表（タスク 3.4、3.5、3.6） | 1 |
| 2 | プランモードは、変更する前に調べて計画を立てる。Claude はファイルを読んでコードベースを調べ、計画を書くが、ソースコードは編集しない。計画を承認してから編集に移る（planflow） | 正しい | https://code.claude.com/docs/en/permission-modes.md「Plan mode tells Claude to research and propose changes without making them. Claude reads files, runs shell commands to explore, and writes a plan, but does not edit your source.」「Approving a plan exits plan mode … so Claude starts editing.」／ https://code.claude.com/docs/en/common-workflows.md「Claude reads files and proposes a plan but makes no edits until you approve.」 | 2 |
| 3 | プランモードが向くのは、大規模な変更、多くのファイルにまたがる作業、方法が複数ある作業、アーキテクチャの判断が要る作業。例はマイクロサービスへの再構成、45以上のファイルのライブラリ移行（planfit） | 正しい | 試験ガイド タスク 3.4 の知識1、スキル1 | 3 |
| 4 | 先に設計すれば、高くつく手戻りを防げる（planfit） | 正しい | 試験ガイド タスク 3.4 の知識3「コストのかかる手戻りを防げる」 | 4 |
| 5 | 直接実行は、範囲がはっきりした単純な変更向け。例は原因が分かっている（スタックトレースが明確な）1ファイルのバグ修正、日付の検証（日付バリデーションの条件分岐）を1つ足す作業（planfit） | 正しい | 試験ガイド タスク 3.4 の知識2、スキル2 | 5 |
| 6 | 「直接実行で始め、難しくなったら切り替える」は、複雑さが最初から分かっているときの誤答（mistake） | 正しい | reference/blueprint.md 7-1 の Q5 と 7-3 の型 L（公式サンプル問題の誤答の要旨） | 6 |
| 7 | 計画はプランモード、実装は直接実行と組み合わせられる（mistake） | 正しい | 試験ガイド タスク 3.4 のスキル4 | 7 |
| 8 | Explore は、検索と分析のための、読み取り専用のサブエージェント（explore） | 正しい | https://code.claude.com/docs/en/sub-agents.md「A fast, read-only agent optimized for searching and analyzing codebases.」「read-only tools; Write and Edit are denied」 | 8 |
| 9 | サブエージェントは別のコンテキストで作業し、結果（要約）だけを返す。メインの会話には要約だけが戻る（explore） | 正しい | 試験ガイド タスク 3.4 の知識4 ／ https://code.claude.com/docs/en/sub-agents.md「This keeps exploration results out of your main conversation context.」「does that work in its own context and returns only the summary」／ common-workflows.md「The subagent reads files in its own context window and reports a summary.」 | 9 |
| 10 | 多段階のタスクでは、Explore でコンテキストの枯渇を防ぐ（explore） | 正しい（ガイドの立場） | 試験ガイド タスク 3.4 のスキル3。現行の違いは下の「食い違い」の1 | 10 |
| 11 | 2026年11月時点のドキュメントは、使い切ることはまれになったとしている。ただ、長い出力を切り離す使い方は今も勧めている（explore） | 正しい | https://code.claude.com/docs/en/best-practices.md「What you can stop doing」の表「Running out of context is rarely the problem anymore. Subagents are still great for parallel work, keeping noisy output out of your way, and independent review」 | 11 |
| 12 | 文章の説明で受け取り方がぶれるなら、入出力の例を2〜3個見せる。期待する変換を伝えるにはこれがいちばん効く（examples） | 正しい | 試験ガイド タスク 3.5 の知識1、スキル1 | 12 |
| 13 | テスト駆動の反復：実装の前に、期待する動作、エッジケース、性能の要件のテストを書き、失敗したテストの結果を伝えて直させる（examples） | 正しい | 試験ガイド タスク 3.5 の知識2、スキル2 ／ https://code.claude.com/docs/en/best-practices.md「write a failing test that reproduces it, then fix it」「If you give it something that comes back pass or fail, Claude can close that loop itself.」 | 13 |
| 14 | null 値のようなエッジケースも、入力と期待する出力をテストケースで渡す（examples） | 正しい | 試験ガイド タスク 3.5 のスキル4（移行スクリプトの null 値の例） | 14 |
| 15 | インタビューパターン：実装の前に Claude に質問させ、見落としていた考慮点を洗い出す。例はキャッシュの無効化のタイミング、障害時のふるまい（interview） | 正しい | 試験ガイド タスク 3.5 の知識3、スキル3 ／ https://code.claude.com/docs/en/best-practices.md「Ask Claude to interview you instead … Claude comes back with multiple-choice questions about the parts you haven't pinned down」 | 15 |
| 16 | 影響し合う問題は1つの詳しいメッセージにまとめ、独立した問題は1つずつ順番に直して確かめる。別々に直すと、一方の修正がもう一方を壊しかねない（multi） | 正しい | 試験ガイド タスク 3.5 の知識4、スキル5。「壊しかねない」は、ガイドの「修正が相互に影響する」を言い換えた説明 | 16 |
| 17 | CI では `-p` を付ける。長い形は `--print`。これで非対話モードになる。付けないと、対話の入力を待ったままジョブが止まる（cli） | 正しい | 試験ガイド タスク 3.6 の知識1、スキル1 ／ https://code.claude.com/docs/en/headless.md「Add the -p (or --print) flag to any claude command to run it non-interactively.」／ https://code.claude.com/docs/en/cli-reference.md「--print, -p: Print response without interactive mode」 | 17 |
| 18 | もっともらしいが存在しない環境変数やフラグは、誤答（cli） | 正しい | reference/blueprint.md 7-1 の Q10 と 7-3 の型 D | 18 |
| 19 | `--output-format json` で、結果がセッション ID などと一緒に JSON で返る（cli、output） | 正しい | https://code.claude.com/docs/en/headless.md「json: structured JSON with result, session ID, and metadata」 | 19 |
| 20 | `--json-schema` でスキーマを渡すと、それに合った出力が `structured_output` という項目に入る（cli、output） | 正しい | 試験ガイド タスク 3.6 の知識2 ／ https://code.claude.com/docs/en/headless.md「use --output-format json with --json-schema … with the structured output in the structured_output field」／ cli-reference.md「--json-schema: Get validated JSON output matching a JSON Schema … (print mode only)」 | 20 |
| 21 | 指摘ごとにファイル、行、内容を持たせれば、PR のインラインコメントとして自動で投稿できる（output） | 正しい | 試験ガイド タスク 3.6 のスキル2 | 21 |
| 22 | CLAUDE.md は、CI の Claude Code にプロジェクトの決まりを伝える手段。テストの標準、価値のあるテストの基準、フィクスチャを書くと、テスト生成の質が上がり、価値の低いテストが減る（claudemd） | 正しい（ガイドの立場） | 試験ガイド タスク 3.6 の知識3、スキル5 ／ https://code.claude.com/docs/en/github-actions.md「Create a CLAUDE.md file in your repository root to define code style guidelines, review criteria … Claude follows these guidelines」／ headless.md「Without it [--bare], claude -p discovers and loads them as an interactive session would」。現行の違いは「食い違い」の2 | 22 |
| 23 | 既存のテストを渡せば、同じシナリオを重ねて提案しない（claudemd） | 正しい | 試験ガイド タスク 3.6 のスキル4 | 23 |
| 24 | 2026年11月時点のドキュメントは、CI では `--bare` モードを勧めている。このモードは CLAUDE.md を自動では読まないので、文脈はフラグで渡す（claudemd） | 正しい | https://code.claude.com/docs/en/headless.md「Add --bare to reduce startup time by skipping auto-discovery of … CLAUDE.md」「In CI or other scripted environments, add --bare」「Pass the context you need with a flag: --append-system-prompt, --append-system-prompt-file …」「--bare is the recommended mode for scripted and SDK calls, and will become the default for -p in a future release.」（2026-11-16 に再取得して同じ記述を確認） | 24 |
| 25 | コードを書いたのと同じセッションは、自分の変更のレビューが苦手。書いたときの考え方に引きずられるため。独立したインスタンスに任せる（review） | 正しい | 試験ガイド タスク 3.6 の知識4 ／ https://code.claude.com/docs/en/best-practices.md「/code-review reviews the diff in a fresh subagent that never saw your conversation. It isn't swayed by the reasoning that produced the code.」「A second session is also the easiest independent reviewer you can get.」 | 25 |
| 26 | 新しいコミットのあとの再レビューでは、前回の指摘を文脈に入れ、新しい問題とまだ直っていない問題だけを報告させる。これでコメントの重複を防げる（review） | 正しい | 試験ガイド タスク 3.6 のスキル3 | 26 |
| 27 | ミニクイズ（自作）：正解は B「前回の指摘を渡し、新規と未対応だけを報告させる」。A では前回の指摘を Claude が知らない。C ではあとのコミットの問題を見逃す（quiz） | 正しい | 試験ガイド タスク 3.6 のスキル3。素材のミニクイズ（公式サンプル問題とは別の状況で作ったもの）を、1番〜3番を A〜C に置き換えて使った | 27 |

## 試験ガイドと現行ドキュメントの食い違い（素材と同じ扱い）

- **1. コンテキストウィンドウの枯渇。** ガイド（タスク 3.4 スキル3）は、Explore を「コンテキストウィンドウの枯渇を防ぐ」ために使うとする。2026年11月時点の best-practices.md は、使い切ることはまれになったとしている（長い出力を切り離す用途は今も勧めている）。台本はガイドの立場で書き、explore の場面で現行の違いを2文で添えた。
- **2. CI での CLAUDE.md。** ガイド（タスク 3.6 知識3）は、CLAUDE.md を CI の Claude Code に文脈を渡す仕組みとする。2026年11月時点の headless.md は CI で `--bare` を勧め、これは CLAUDE.md を自動で読まない（文脈は `--append-system-prompt-file` などのフラグで渡す）。台本はガイドの立場で書き、claudemd の場面で `--bare` の違いを添え、画面の補足（lead）にも出した。「試験では、ガイドどおり CLAUDE.md を答えにする」と明言した。
- **3.** プランモードの承認時の切り替え先（自動モードなど）は、素材と同じく扱っていない。「計画を承認してから、編集に移ります」とだけ言っている。

## 台本で足したもの（素材にない要素）

| # | 台本の内容 | 判定 | 根拠 |
|---|---|---|---|
| A | コード例 `claude -p "この PR の変更をレビューして" --output-format json --json-schema "$SCHEMA"`（cli） | 書き方は正しい | https://code.claude.com/docs/en/headless.md（2026-11-16 取得）の例「claude -p "Extract the main function names from auth.py" --output-format json --json-schema '{"type":"object",…}'」と同じ形。`$SCHEMA` は、JSON スキーマの文字列を入れたシェル変数という想定の、説明用の書き方。`--json-schema` には JSON スキーマの定義そのものを渡す（ファイルのパスではない） |
| B | 出力例 `{"result": …, "session_id": …, "structured_output": {"findings": [{"file", "line", "comment"}]}}`（output） | 項目名は正しい | 同ページ「with the text result in the `result` field」「jq -r '.session_id'」「with the structured output in the `structured_output` field」。`findings` 以下は、レビュー用に自分で決めたスキーマの例（Claude Code が決める項目名ではない）。実際の出力には、ほかに使用量やコストなどの項目も入る（画面では省略） |

## 素材から変えた点

- **長さに合わせて、例を一部だけにした。** 「途中で依存関係が見つかってやり直す」は「高くつく手戻り」にまとめた。ライブラリ移行を計画と実装に分ける例は、画面の項目「計画はプランモード、実装は直接実行」で示し、声では言っていない。
- **ミニクイズは、選択肢を1番〜3番から A〜C にした。** 内容と正解は素材のまま。
- **「1文を短く」のため、言い換えた箇所がある。** 意味は変えていない（例：「日付を検証する条件を1つ足す」→ 声では「日付の検証を1つ足す」）。

## 未確認のまま残っている主張

なし。素材の「確認できなかった点」と同じく、入出力の例が「いちばん効く」こと、影響し合う問題をまとめて伝えること、前回の指摘を渡す再レビュー、既存テストを渡して重複を防ぐことは、試験ガイドの記述が根拠（現行ドキュメントに同じ趣旨の直接の記述はないが、矛盾する記述もない）。

## 参照した URL

- https://code.claude.com/docs/en/permission-modes.md
- https://code.claude.com/docs/en/common-workflows.md
- https://code.claude.com/docs/en/sub-agents.md
- https://code.claude.com/docs/en/best-practices.md
- https://code.claude.com/docs/en/headless.md
- https://code.claude.com/docs/en/cli-reference.md
- https://code.claude.com/docs/en/github-actions.md
- 公式の試験ガイド（Claude Certified Architect – Foundations、v1.0）タスク 3.4〜3.6

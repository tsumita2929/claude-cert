# 事実確認：ep05-workflow-integration（業務への組み込み）

確認日: 2026-11-16

素材は `course/ch05.md`（2026-11-16 に、公式の試験ガイドと公式ドキュメントで照合済み）。下の表は、台本に入れた主張について、素材の「事実確認」の表から該当する行を引いたもの（右端の # は素材の表の番号）。台本には、素材にない事実を足していない。

- 試験ガイド: Claude Certified Associate – Foundations 試験ガイド v1.0（日本語版・英語版、2026年7月発効）。同じフォルダの `reference/` にある PDF とテキスト
- この試験は 2026年12月7日に試験内容が更新される予定（更新版の試験ガイドは 2026年11月17日に公開予定）。配点の数字は、台本で「現行の試験ガイド、バージョン1.0 では」と添えている。サムネイルと場面の見出しには、配点の数字を入れていない

## 台本の主張と根拠

| # | 台本の主張 | 判定 | 根拠 | 確認日 | 素材 |
|---|---|---|---|---|---|
| 1 | 分野4は、ワークフロー統合とソリューション設計。現行の試験ガイド v1.0 では配点16%で、2番目に大きい分野 | 正しい | 試験ガイド v1.0 日本語版 §6 の配点表（14、21、12、16、12、15、10%。最大は分野2の21%）／ `reference/outline.md` | 2026-11-16 | 1 |
| 2 | 分野4のタスクは5つ（要件とユースケースの分析、調査・計画・プロセスの最適化、ソリューションの設計・開発・反復的な改善の支援、既存のワークフローへの組み込み、価値と限界をステークホルダーに伝える） | 正しい | 試験ガイド v1.0 日本語版・英語版 §6「分野4」の5項目 | 2026-11-16 | 2 |
| 3 | 判断の軸は、Anthropic の AI Fluency という枠組みにある「委任」。どの仕事を AI に任せ、どの仕事を人が担うかを決めること | 正しい | Partner Academy の対策講座「Workflow Integration & Solution Design」（https://anthropic-partners.skilljar.com/path/claude-associate/workflow-integration-solution-design）「The anchoring competency ... is Delegation」／ AI Fluency Key Terminology Cheat Sheet（https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf）「Delegation: Deciding on what work should be done by humans, what work should be done by AI, and how to distribute tasks between them」 | 2026-11-16 | 3 |
| 4 | 公式の対策講座は、委任を、手順ごとに「任せる、人が担う、協働する」の3つから選ぶことだと説明している | 正しい | 同じ対策講座のページ「deciding, for each step, whether the work is AI-appropriate, human-retained, or collaborative」 | 2026-11-16 | 4 |
| 5 | 間違った手順の自動化は逆効果 | 正しい | 同じ対策講座のページ「When the wrong steps are automated, it can backfire.」 | 2026-11-16 | 5 |
| 6 | Claude は、文章の手順書から、判断の分かれ目や、並行して進む作業を読み取れる | 正しい | https://academy.claude.com/use-cases/create-a-process-flowchart 「Claude identifies decision points, parallel workflows, and conditional logic from narrative descriptions」 | 2026-11-16 | 6 |
| 8 | アーティファクトなら、文書や図、小さなツールを会話の横に出して、何度も直せる | 正しい | https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them 「documents, code snippets, single-page websites, images, diagrams and flowcharts」「opens in a panel beside your chat, where you can revise it」 | 2026-11-16 | 8 |
| 9 | 技術的な実装が要るときは、技術の担当者に引き継ぐ（エスカレーション）。試験ガイドも、これをアソシエイトの役割としている | 正しい | 試験ガイド v1.0 §1「より複雑または技術的な作業をClaudeのアーキテクトやデベロッパーにエスカレーション」、§3「アソシエイトはより複雑または技術的な作業をそれらの資格保有者にエスカレーションします」 | 2026-11-16 | 9 |
| 10 | 試験ガイドは「強化」と「再設計」の2つを並べている | 正しい | 試験ガイド v1.0 分野4「既存のワークフローにClaudeを統合し、ワークフローを強化または再設計する」（英語版 augment or redesign） | 2026-11-16 | 10 |
| 11 | Anthropic のヘルプセンターも、Claude を唯一の情報源として頼るべきではない、としている（誤りが見つかると信頼を失う、の裏付け） | 正しい | https://support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on 「Claude can occasionally produce responses that are incorrect or misleading」「should not rely on Claude as a singular source of truth」 | 2026-11-16 | 11 |
| 12 | 一度に全部を切り替えず、1つの手順から試して、効果を確かめてから進めるのが手堅い進め方 | 判断（公式の直接の記載なし） | 試験ガイドの「反復的な改善」（分野4）、対策講座「compounds only when the shift is made deliberately」、https://www.anthropic.com/engineering/building-effective-agents 「finding the simplest solution possible, and only increasing complexity when needed」。台本では「手堅い進め方」という判断として言い、公式の決まりとしては言っていない | 2026-11-16 | 12 |
| 13 | 5つ目のタスクは、Claude の価値と限界を、ステークホルダーに（正確に）伝えること | 正しい | 試験ガイド 分野4「Claudeの価値と限界をステークホルダーに伝える」。対策講座の学習目標「... to stakeholders accurately」 | 2026-11-16 | 13 |

## 事実ではなく、説明や例として書いたもの

- 用語の言い換え（要件、ユースケース、プロセスの最適化、ソリューション、ワークフロー、ステークホルダー）は、素材の本文の説明をそのまま短くしたもの。
- 画面の補足（ステークホルダーの言い換え「上司や他部署、顧客など」、例の「今の手順書と、困っている点を渡す」）も、素材の本文の言葉。
- 例（総務の問い合わせ窓口の見直し、経費の申請の分担、価値の伝え方の「どの手順で、どれだけ時間が減ったか」）は、素材の本文の例をそのまま使った。
- ミニクイズ（新入社員研修の名簿の確認）は、素材のミニクイズを短くした自作の問題で、実際の試験問題ではない。選択肢の並びは素材と同じで、素材の「2番」が動画の「B」にあたる。

## 試験ガイドと現行ドキュメントの食い違い

- なし（素材と同じ）。分野4のタスクは製品仕様にほとんど依らない判断の話で、2026年11月時点のヘルプセンターと食い違う点は見つかっていない。

## 素材から変えた点

- 「調べものにはリサーチも使えます。使い分けは第4章、確かめ方は第2章で扱いました」は、長さの都合で省いた（素材の表の #7 は台本で使っていない）。
- 「Anthropic の活用例にも、手順書から流れ図を作る使い方があります」は、長さの都合で省いた（読み取れる、という主張の根拠は #6 のまま）。
- エスカレーション先の「Claude のアーキテクトやデベロッパーの資格を持つ人」は、ナレーションでは「技術の担当者」とだけ言い、試験ガイドが「これをアソシエイトの役割としている」とまとめた。
- 「分野2に次いで」は、聞き取りやすさのため「2番目に大きい分野」とだけ言った。
- ステークホルダーの例のうち「顧客」は、ナレーションでは省き、画面の補足にだけ出した。

## 確認できなかった点（素材と同じ）

- 「全面的な切り替えの前に、1つの手順で小さく試す」ことを、アソシエイト向けの公式資料が明文で勧めている箇所は見つかっていない。台本では判断として書いた（#12）。
- 対策講座の本編（ログインが必要）は読めていない。対策講座について台本で言ったのは、公開されている講座説明の範囲だけ。

## 参照した URL

- https://anthropic-partners.skilljar.com/path/claude-associate/workflow-integration-solution-design
- https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf
- https://academy.claude.com/use-cases/create-a-process-flowchart
- https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them
- https://support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on
- https://www.anthropic.com/engineering/building-effective-agents

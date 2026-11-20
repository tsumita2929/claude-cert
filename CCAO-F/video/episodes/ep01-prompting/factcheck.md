# 事実確認：ep01-prompting（伝わるプロンプトの作り方）

確認日: 2026-11-16

台本は、講座の本文 `CCAO-F/course/ch01.md`（2026-11-16 に一次情報で事実確認済み）を素材にしている。
下の表は、台本に入れた主張ごとに、素材の「事実確認」の表から該当する行（素材の番号を #欄の括弧内に示す）を引いたもの。
台本に、素材にない事実は足していない。そのため、この回で新たに一次情報を確かめた行はない。

根拠は次のとおり。

- **試験ガイド**: Claude Certified Associate – Foundations 試験ガイド v1.0（日本語版・英語版。2026年7月発効）。2026-12-07 に試験内容の更新が予定されている（更新版のガイドは 2026-11-17 公開予定）
- **公式ドキュメント**: Prompting best practices（platform.claude.com）
- **ヘルプセンター**: support.claude.com の記事
- **公式記事**: claude.com の Best practices for prompt engineering
- **公式の対策講座**: Partner Academy（anthropic-partners.skilljar.com）の Prompting and Task Execution のページ
- **AI Fluency**: Anthropic の学習教材（用語集、6 Techniques for Effective Prompt Engineering）

公開前に、末尾の URL を開いて、動画の内容と食い違いがないかを見直すこと。特に、12月7日の試験内容の更新後は、配点とタスクの書き方を新しいガイドと照らす。

## 台本の主張

| # | 台本の主張（場面） | 判定 | 根拠 | 確認日 |
|---|---|---|---|---|
| 1（素材1） | 分野1 は「プロンプト作成とタスク実行」。現行の試験ガイド v1.0 で配点14%。タスクは、効果的なプロンプトの作成、タスク分解、反復的な改良、タスクの種類に応じた戦略の調整の4つ（scope） | 正しい | 試験ガイド v1.0（日本語版・英語版）§6「分野1：プロンプト作成とタスク実行（14%）」の4つの箇条。reference/outline.md | 2026-11-16 |
| 2（素材2） | 「第3四半期の結果について何か書いて」では、当たり障りのない一般的な文章になる。目的、対象者、結果3つ、形式、長さを書くと、そのまま共有できる下書きに近づく（vague） | 正しい（公式の対策講座の例） | https://anthropic-partners.skilljar.com/path/claude-associate/prompting-task-execution 「write something about our Q3 results … generic paragraph」「specify the audience, the three results that matter, the format, and the length … a draft ready to share」。役員会・A4の半分という具体は、素材の作例 | 2026-11-16 |
| 3（素材3） | 公式ドキュメントは、Claude を、優秀だが入社したばかりで、職場の決まりや事情を知らない社員のように考えるよう勧めている（parts） | 正しい | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices 「Be clear and direct」節「Think of Claude as a brilliant but new employee who lacks context on your norms and workflows」 | 2026-11-16 |
| 4（素材5） | 伝える部品は、目的、対象者、要点、形式、長さ。理由を一言添えると、Claude は細かい判断も目的に合わせる（parts、balance） | 正しい | 対策講座（#2）。https://claude.com/resources/articles/best-practices-for-prompt-engineering 「Explaining why something matters helps AI models better understand your goals」、具体性として長さ・形式などの制約、目的と対象者を挙げる。ドキュメント「Add context to improve performance」節「Claude can generalize from the explanation」 | 2026-11-16 |
| 5（素材6） | Anthropic の学習教材 AI Fluency では、こうして伝える力を Description と呼ぶ（balance） | 正しい | AI Fluency 用語集（Anthropic、CC BY-NC-SA）https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf 「Description: Effectively communicating with AI systems」「Product Description: Defining what you want in terms of outputs, format, audience, and style」。対策講座のページ「Description … is the backbone of this module」 | 2026-11-16 |
| 6（素材7） | 部品の型はくり返し使える。ただし、長く複雑なプロンプトほど良いわけではない（balance） | 正しい | 対策講座の学習目標「using a repeatable component structure」。claude.com の記事「the best prompt isn't the longest or most complex」「Not every prompt needs every technique」 | 2026-11-16 |
| 7（素材8） | 部品の型は、技術的な仕事でも同じように使える（balance） | 正しい（範囲の確認） | 試験ガイドのタスク「ビジネスタスクおよび技術タスクのための効果的なプロンプトを作成する」 | 2026-11-16 |
| 8（素材19） | プロジェクトの指示は第6回、より深い診断は第8回で扱う（balance、symptoms） | 正しい（章立て） | reference/outline.md の章立て（講座の章と動画の回は1対1で対応する） | 2026-11-16 |
| 9（素材9） | 複雑な依頼を段階に分け、前の段階の結果を次の段階の材料にする。分けると途中で確かめられる（decompose、check） | 正しい | claude.com の記事「Chaining breaks down complex tasks into smaller sequential steps with separate prompts」「the output feeds into the next」。ドキュメント「Chain complex prompts」節「still useful when you need to inspect intermediate outputs」 | 2026-11-16 |
| 10（素材10） | 1つのプロンプトの中で、手順を順番に書き並べて示すのも分解の方法（check） | 正しい | AI Fluency の「6 Techniques for Effective Prompt Engineering」https://www-cdn.anthropic.com/62df988c101af71291b06843b63d39bbd600bed8.pdf「4. Break complex tasks into steps」。ドキュメント「Provide instructions as sequential steps using numbered lists」 | 2026-11-16 |
| 11（素材11） | 2026年11月時点の公式ドキュメントは、最近のモデルは多くの段階を自分の中で進められるとし、途中を確かめたいときは分けて頼むのが有効としている（check） | 正しい | ドキュメント「Chain complex prompts」節「Claude handles most multistep reasoning internally. Explicit prompt chaining … is still useful when you need to inspect intermediate outputs」 | 2026-11-16 |
| 12（素材12） | Anthropic の解説記事は、最初のプロンプトが完璧に働くことはまれだとしている（refine） | 正しい | claude.com の記事「The first prompt rarely works perfectly. Test and refine.」 | 2026-11-16 |
| 13（素材13） | 何も変えずに頼み直したり、手当たりしだいに足したりせず、結果を見て足りなかった部品を見極めて足し、効いたかを確かめる。症状（一般的すぎる、難しすぎる、形式がばらばら）から、足りない部品（目的や条件、対象者、形式の指定や例）を見極める（refine、symptoms） | 正しい | 対策講座の学習目標「Iterate prompts diagnostically」。claude.com の記事「Start simple and add complexity only when needed. Test each addition」、症状と対処の対応（一般的すぎる→具体性や例を足す、形式が不一致→例など） | 2026-11-16 |
| 14（素材14） | 形式がばらばらなら、見本になる例が効く。下書きでは過去のよい文面を見本として見せる（symptoms、types2） | 正しい | ドキュメント「Use examples effectively」節「Examples are one of the most reliable ways to steer Claude's output format, tone, and structure」 | 2026-11-16 |
| 15（素材15） | 試験ガイドは、タスクの種類として、分析、調査、下書き、ブレインストーミングの4つを挙げている（types1） | 正しい | 試験ガイド タスク「タスクの種類（分析、調査、下書き、ブレインストーミング）に応じてプロンプト作成の戦略を調整する」 | 2026-11-16 |
| 16（素材10・16） | 分析では、何を見てほしいかを手順で示す。データが足りないときは、推測せずにそう言ってほしいと伝える（types1） | 正しい | 手順: AI Fluency「6 Techniques」の売上分析の例（#10）。推測しない: claude.com の記事「If the data is insufficient to draw conclusions, say so rather than speculating」 | 2026-11-16 |
| 17（素材17） | 調査では、十分な答えの基準を先に伝え、複数の情報源で確かめるよう頼む（types1） | 正しい | ドキュメント「Research and information gathering」節「Provide clear success criteria」「Ask Claude to verify information across multiple sources」 | 2026-11-16 |
| 18（素材5・14） | 下書きでは、対象者、口調、形式、長さといった仕上がりの姿を具体的に伝える（types2） | 正しい | claude.com の記事（#4、長さ・形式などの制約、対象者）。ドキュメント「Use examples effectively」（形式、口調、構成） | 2026-11-16 |
| 19（素材18） | ブレインストーミングでは、絞り込みすぎず、方向の違う案をたくさん出すようはっきり頼み、やり取りを重ねて広げる（types2） | 正しい（根拠は一般原則） | ドキュメント「If you want Claude to do more than the task strictly requires, explicitly request it」。AI Fluency 用語集の「Augmentation」「humans and AI collaborate as thinking partners … iterative back-and-forth」 | 2026-11-16 |

## 台本での整理（素材の文言そのままではないもの）

- **ミニクイズ**は、素材のミニクイズ（広報担当、発表文の要約が専門用語だらけ）をそのまま使い、選択肢を短くした。正解の根拠は #13（足りない部品＝対象者を足し、効いたかを確かめる）。自作の問題で、実際の試験問題ではない。
- 「部品をそろえた依頼」の画面の文（「役員会の資料。結果3つを箇条書きで」）は、素材の作例（#2）を短くしたもの。
- 「Claude は、優秀だが職場の事情を知らない新人」（parts の補足）は、#3 の言い換え。
- 素材の「第6章」「第8章」は、動画のシリーズに合わせて「第6回」「第8回」と言った（章と回は1対1で対応する）。
- 素材にあった「ヘルプセンターも、予備知識のない人に指示するつもりで書くよう勧めている」（素材4）は、長さの都合で省いた。
- 分析の例（よく売れた商品、前の四半期との比較、目立つ変化、理由の候補）は、長さの都合で省き、「何を見てほしいかを手順で示す」だけを言った。

## 試験ガイドと現行ドキュメントの食い違い

- タスク分解について、素材と同じ立場で扱った。試験ガイドは「タスク分解の手法を適用して、複雑な依頼を構造化する」とだけ書く。2026年11月時点の Prompting best practices は「最近のモデルは多段階の推論の大半を内部で進める。明示的に分けるのは、途中の結果を確かめたいときなどに今も有効」としている。台本はガイドの立場（分けて頼む）を主にし、利点を「途中で確かめられること」に置いたうえで、現行の記述を一言添えた（check の場面）。

## 試験の更新について

- 試験内容は 2026-12-07 に更新される予定（更新版の試験ガイドは 2026-11-17 公開予定）。台本で配点を言うところは「現行の試験ガイド、バージョン1.0 では」と添えた。サムネイルと場面の見出しには、配点の数字と問題数を入れていない。

## 未確認のまま残っている主張

なし。素材の「確認できなかった点」のうち、台本に関わるものは次のとおり。

- AI Fluency の Description の公式の日本語訳は確認できていない。台本でも英語のまま Description と言い、訳語は付けていない。
- ブレインストーミングに特化した公式のプロンプトの指針は見つかっていない。台本は素材と同じく一般原則（はっきり頼む、対話で広げる）だけを言っている。

## 参照した URL

- https://anthropic-partners.skilljar.com/path/claude-associate/prompting-task-execution
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- https://claude.com/resources/articles/best-practices-for-prompt-engineering
- https://support.claude.com/en/articles/7996857-my-prompt-isn-t-giving-me-a-helpful-answer
- https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf（AI Fluency 用語集）
- https://www-cdn.anthropic.com/62df988c101af71291b06843b63d39bbd600bed8.pdf（6 Techniques for Effective Prompt Engineering）

# 事実確認：ep06-configuration（設定とナレッジ管理）

確認日: 2026-11-16

根拠は、講座の本文 `CCAO-F/course/ch06.md` の「事実確認」の表（2026-11-16 に公式の試験ガイドと公式ドキュメントで照合済み）。
台本の主張ごとに、その表の該当する行（素材の # 番号）を引いた。台本には、素材にない事実は足していない。

- **試験ガイド**: Claude Certified Associate – Foundations 試験ガイド v1.0（日本語版・英語版）。2026年7月発効
- **公式の対策講座**: Partner Academy（anthropic-partners.skilljar.com）の Prep Course。公式だが、試験ガイドではない
- **ヘルプセンター**: support.claude.com の各記事
- **Claude 101**: Anthropic Academy の講座「Introduction to projects」

この試験は **2026年12月7日に試験内容の更新が予定されている**（更新版の試験ガイドは 2026年11月17日に公開予定）。
台本の配点（12%）は v1.0 の数字で、ナレーションでも「現行の試験ガイド、バージョン1.0 では」と添えた。サムネイルと場面の見出しには数字を入れていない。

## 台本の主張と根拠

| # | 台本の主張（場面） | 判定 | 根拠（素材の #） |
|---|---|---|---|
| 1 | 範囲は分野5「設定とナレッジ管理」。現行の試験ガイド v1.0 では配点 12%。学ぶのは指示、ナレッジ、コネクタ、設定を最新に保つ方法（scope） | 正しい | 素材 #1: 試験ガイド v1.0 日本語版・英語版 §6 分野5（Configure Claude Projects with instructions and knowledge sources ほか4項目）／ reference/outline.md |
| 2 | 公式の対策講座に「良いプロンプトは一度だけ役に立つ。良い設定は毎回役に立つ」。会話を始める前の準備の話（open） | 正しい（公式の対策講座。試験ガイドではない） | 素材 #2: https://anthropic-partners.skilljar.com/path/claude-certified-associate-foundations/configuration-knowledge-management 「A good prompt helps you once, while a good configuration helps you every time」「the setup work that runs before any single conversation」 |
| 3 | プロジェクトはテーマごとに作る作業場所で、チャットの履歴と資料をプロジェクトごとに持つ（project） | 正しい | 素材 #3: https://support.claude.com/en/articles/9517075-what-are-projects 「workspaces with their own chat histories and knowledge bases」 |
| 4 | 設定の柱は、指示（ふるまい）とナレッジ（参照してほしい資料）。どちらもプロジェクト内のすべてのチャットに効く（project, reach, wrap） | 正しい | 素材 #4: https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects 「Files uploaded there are used in all chats」「Claude applies these instructions to all chats in the project」／ Claude 101「Project instructions tell Claude how to behave across all conversations」 |
| 5 | チャット同士は会話の中身を共有しない。前のチャットで決めたことは、要約してナレッジに入れる（reach） | 正しい | 素材 #5: 9519177「Context is not shared across chats within a project unless the information is added into the project knowledge base」 |
| 6 | プロジェクトの名前と説明は Claude に見えない。伝えたいことは指示かナレッジに（reach） | 正しい | 素材 #6: 9519177 の作成手順「Give the project a name and description. Claude cannot see these details」 |
| 7 | 試験ガイドの「システムレベルの指示」は、プロジェクトの指示のことだと考える（instructions） | 解釈（公式講座が裏づけ） | 素材 #7: 試験ガイドは system-level instructions。公式対策講座の学習目標は「Create effective project-level instructions」。下の「食い違い」も参照 |
| 8 | 指示は、仕事の背景、作業の手順、口調と文体、必ず守る決まりの4つで整理できる。あいまいな指示は結果をばらつかせる。具体的に書く（instructions） | 正しい | 素材 #8: Claude 101「Introduction to projects」が Context、Process、Tone and style、Requirements の4つを挙げる。具体性の必要も同ページの趣旨。営業チームの例（中小企業向けの提案書、構成案→確認→本文、最後に次の打ち合わせの提案）は素材の自作の例。画面の「口調と文体」の説明（どんな言葉づかいで書いてほしいか）は項目の言い換えで、事実の主張ではない |
| 9 | 自分の好みはアカウント全体の設定、特定の仕事の決まりはプロジェクトの指示、その日だけの依頼はチャット。一度きりの依頼を指示に書くと、関係のないチャットまで影響を受ける（placement） | 正しい（チャットの部分と影響の部分は、指示が全チャットに効く仕様からの帰結） | 素材 #9: https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features 「Instructions for Claude」は全会話、project instructions はそのプロジェクトのチャットだけ |
| 10 | ナレッジに入れるのは繰り返し参照する資料。ブランドの指針、文体の手引き、ひな形、まねしてほしい過去の良い成果物（knowledge） | 正しい | 素材 #10: Claude 101「Reference documents (brand guidelines, style guides, templates)」「Examples of work you want Claude to emulate」 |
| 11 | 多ければ良いわけではない。古い版と新しい版が並ぶと、古い内容で答えることがある。入れる前に今も正しいかを確かめる（knowledge）／古い資料は古い答えのもと（maintain） | 正しい（「並ぶと」の部分は解釈。台本は「ことがある」と弱めた） | 素材 #11: Claude 101「Outdated documents can lead to outdated responses」、定期的な見直しを勧める |
| 12 | 中身が分かるファイル名を付ける（「資料1」ではなく「2026年度ブランド指針」）。質問で資料の名前を挙げると、探す場所を絞れる（names） | 正しい（ファイル名の例は素材の自作） | 素材 #12: https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects 「Well-named files help Claude…」「reference specific documents by name to help Claude focus its search」 |
| 13 | チャットの中でアップロードしたファイルは、プロジェクトのナレッジには入らない（names） | 正しい | 素材 #13: Claude 101「Files uploaded during a single conversation stay separate from project knowledge」 |
| 14 | コネクタは Claude をほかのアプリやサービスにつなぐ仕組み。例: Drive の文書を探す、Gmail のメールを読む（connectors） | 正しい | 素材 #14: https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities ／ https://support.claude.com/en/articles/10166901-use-google-workspace-connectors |
| 15 | Claude が見られるのは、自分のアカウントが見られる範囲だけ。コネクタは元のサービスの権限を受け継ぐ（connectors） | 正しい | 素材 #15: 11176164「Claude inherits each person's permissions from the connected service」／ 10166901「Claude mirrors your existing Google Workspace permissions」 |
| 16 | つなぐのは信頼できるサービスだけ。使わなくなったら外す（connectors） | 正しい | 素材 #16: 11176164 のセキュリティの項「Only connect services you trust… review the access… Disconnect services you no longer use」 |
| 17 | チャットごとに、必要なコネクタだけをオンにする（connectors） | 正しい | 素材 #17: 11176164「+」メニューの Connectors から、その会話で使うものを切り替える |
| 18 | チームでは、まず管理者が組織として有効にし、それから一人ひとりが自分のアカウントで接続する（team） | 正しい | 素材 #18: 11176164「An Owner or Primary Owner must first enable…」「Each person still needs to authenticate individually」（Team と Enterprise） |
| 19 | 見当たらないときは、自分で抜け道を探さず、管理者に相談する（team） | 解釈（ガイドの「エスカレーション」と組織のポリシーに従う姿勢からの判断） | 素材 #19: 試験ガイド §1〜§3（限界を認識し、適切に渡す）、分野6 |
| 20 | Drive からナレッジに加えた Google ドキュメントは、最新の内容に同期される（sync） | 正しい | 素材 #20: 10166901「Google Docs added to chats and projects sync from Drive, so Claude works with the latest version」 |
| 21 | アップロードしたファイルは、元を直しても、入れ替えるまで古いまま（sync） | 解釈（ヘルプセンターに明文はない。アップロードはその時点のファイルを置く操作で、Drive の同期と対比した） | 素材 #21: 9519177 と 11473015（「Add and remove content at any time」）。自動更新の記述は Drive の同期についてだけ |
| 22 | 設定が昔のままなら、Claude は古い前提でもっともらしく答える。毎回チャットで訂正せず、元の設定を直す（古い版を外して入れ替え、指示の古いルールも直す）（maintain, quiz） | 正しい（直し方は #11 と #4 からの帰結。素材本文の主張） | 素材 #11（Outdated documents can lead to outdated responses）、#4（指示とナレッジは全チャットに効く） |
| 23 | 共有のプロジェクトでは、編集の権限を持つ人が指示とナレッジを変えられ、その変更は全員のチャットに効く（review） | 正しい | 素材 #22: 9519177「"Can edit" lets members change instructions and knowledge」（Team と Enterprise） |
| 24 | 誰が、いつ見直すかを決めておく。たとえば四半期ごと（review） | 正しい（「四半期ごと」は例として素材の自作） | 素材 #23: 対策講座「the maintenance cadence that keeps a configuration from quietly going stale」／ Claude 101 の定期的な見直し |
| 25 | 機密の判断は第7章で扱う（names） | 講座内の参照 | outline.md の章立て（第7章 ガバナンスと責任ある利用、分野6 タスク 6.2） |

## 試験ガイドと現行ドキュメントの食い違い（素材と同じ扱い）

- **用語**: 試験ガイドは「システムレベルの指示（system-level instructions）」。2026年11月時点のヘルプセンターでは、プロジェクト単位のものは「project instructions」、アカウント全体のものは「Instructions for Claude」と呼ぶ。台本はガイドの言葉を使い、「プロジェクトの指示のことだと考えてください」と補った（素材と同じ）。
- **プロジェクトの新しい形（beta）**: ヘルプセンター 9517075 に「New version (beta)」がある。試験ガイドは従来の形を前提にしていると考えられ、指示とナレッジで設定する考え方は同じなので、台本では触れていない（素材と同じ）。
- **コネクタの範囲**: 現行では Gmail の送信や Drive のファイル操作などもできるが、台本は「探す・読む」だけを例にした（素材と同じ）。
- **Drive からナレッジに加える操作**: 現行では個人用のプロジェクトだけで、共有プロジェクトでは使えない（10166901）。仕様の細部なので台本には入れていない。クイズの正解の根拠にもしていない。

## 素材（ch06.md）から変えた点

- 動画用に1文を短く切り、言い回しを縮めた。事実は足していない。
- 「古い設定を疑う見方は第8章でも扱う」は、長さの都合で省いた。
- 本文の「判断の軸は3つ」「アクセスの範囲を確かめる」は、コネクタの場面で「信頼できるサービスだけ」「使わなくなったら外す」に縮めた（画面の項目にも残した）。
- 指示の4つの要素のうち「口調と文体」は、素材の営業チームの例に具体例がないため、画面では「どんな言葉づかいで書いてほしいか」と項目の説明にとどめた。
- ミニクイズは、素材の3択をそのまま使い、選択肢と問題文を短くした（番号は A〜C で読む）。

## 未確認のまま残っている主張

なし。素材の「確認できなかった点」（#21 アップロードしたファイルが元の変更に追従しないことの明文がない、#11 古い版と新しい版を並べたときのふるまいの公式の記述がない）は、台本でも同じ範囲の言い方（「入れ替えるまで古いまま」「古い内容で答えることがあります」）にとどめた。

## 参照した URL

- https://anthropic-partners.skilljar.com/path/claude-certified-associate-foundations/configuration-knowledge-management
- https://support.claude.com/en/articles/9517075-what-are-projects
- https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects
- https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features
- https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects
- https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities
- https://support.claude.com/en/articles/10166901-use-google-workspace-connectors
- https://academy.claude.com/courses/claude-101/introduction-to-projects

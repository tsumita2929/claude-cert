# 事実確認：ep03-review-and-refine（人の確認と仕上げ）

確認日: 2026-11-16

素材は `CCAO-F/course/ch03.md`（第3章 人の確認と仕上げ）。素材の「事実確認」の表は、2026-11-16 に公式の試験ガイド（v1.0、2026年7月発効。日本語版と英語版）と公式ドキュメントで照合済み。
下の表は、台本に入れた主張ごとに、素材の表の該当する行（素材の # を併記）を引いたもの。台本には、素材にない事実は足していない（そのため、自分で一次情報を取り直した行はない）。

根拠の種類:

- **試験ガイド**: Claude Certified Associate – Foundations 試験ガイド v1.0（日本語版・英語版。`CCAO-F/reference/` にある PDF とテキスト）
- **ヘルプセンター**: support.claude.com の記事
- **利用ポリシー**: https://www.anthropic.com/legal/aup （2026-11-12 発効の現行版）
- **プロンプトのガイド**: platform.claude.com のドキュメントと claude.com のブログ
- **blueprint.md**: `CCAO-F/reference/blueprint.md`（公式の対策講座 Prep Course の学習目標をまとめたもの。公式だが試験ガイドではない）

**この試験は 2026-12-07 に試験内容の更新が予定されている（更新版の試験ガイドは 2026-11-17 に公開予定）。** 台本の配点の数字は「現行の試験ガイド、バージョン1.0 では」と添えて言っている。サムネイルと場面の見出しには、配点の数字を入れていない。更新版のガイドが出たら、分野2の配点・範囲・名称が変わっていないかを照合すること。

## 主張と根拠

| # | 台本の主張（場面） | 判定 | 根拠（素材の #） |
|---|---|---|---|
| 1 | 範囲は分野2「出力の評価と検証」の後半。現行の試験ガイド v1.0 では配点は21%で、7つの分野で最も大きい（scope） | 正しい | 素材 #1: 試験ガイド v1.0 日本語版 §6 の配点表（14、21、12、16、12、15、10%）／ `reference/outline.md` |
| 2 | この回は3つの判断を扱う。人の確認が必要かを見極める、読み手に合わせて手直しし案を比べる、情報を選んでふさわしい形で出す（scope） | 正しい | 素材 #2: 試験ガイド v1.0 §6 分野2 の箇条書きの4〜6番目「Determine when human review or additional verification is required」「Edit, adapt, refine, and compare outputs for the intended audience」「Organize and curate information and select appropriate output formats (artifacts, inline, structured data)」 |
| 3 | 人の確認の要否は、誰に届くかと、間違えたときの影響の大きさで決める。お金、契約、採用、健康、法令は誤りが損害に直結する（axes） | 正しい（判断の枠組み） | 素材 #3: 試験ガイド §3「人間の専門知識、検証、エスカレーションが必要な場面を認識する」、サンプル1の解説（コンプライアンス担当に向けた引用は検証が必要） |
| 4 | Anthropic のヘルプセンターは、Claude を唯一の情報源にしないよう呼びかけている。重大な助言は注意深く確かめる（who） | 正しい | 素材 #4: https://support.claude.com/en/articles/8525154 「Users should not rely on Claude as a singular source of truth」「carefully scrutinize any high-stakes advice given by Claude」 |
| 5 | 契約の条件の説明を取引先に送るとき、採用の候補者を絞り込む資料を作るときは、人の確認が欠かせない。その分野の知識を持ち、内容を直す権限のある人に見てもらう。契約なら法務の担当者（who） | 正しい | 素材 #3、#6: AUP「qualified person ... with the authority to change or modify it」「relevant training or experience」／試験ガイド §3「人間の専門知識」。場面の例（契約、採用、法務）は素材の本文のまま |
| 6 | Anthropic の利用ポリシーも、採用や融資のような重大な判断では、資格のある人の確認を求めている。詳しくは第7回（who） | 正しい | 素材 #5: https://www.anthropic.com/legal/aup （2026-11-12 発効）High-risk use cases に Employment（hiring など）、Credit（loan など）。「A qualified person must meaningfully review a High-risk AI Recommendation, with the authority to change or modify it, before it is delivered as advice ... or before it is used to implement a decision」。試験ガイドは AUP に触れていない（下の「食い違い」） |
| 7 | すべての出力を同じ重さで確かめる必要はない。社内のアイデア出しのメモまで法務に回さない。確認の手間はリスクに見合わせる（proportion） | 正しい（判断の枠組み） | 素材 #3: blueprint.md 7.1「ちょうどよい大きさの手。やりすぎも誤答」／ AUP の例外規定「Internal drafting, research, summarization, or analysis that is not the ultimate High-risk AI Recommendation delivered」（社内の下書きは人による確認の義務の対象外） |
| 8 | Claude の自信を理由に確認を省く、Claude 自身に確認の要否を判断させる、はどちらも誤り。自信や自己評価は正しさの証拠にならない。要否を決めるのは出力を使う人（proportion） | 正しい | 素材 #7: 試験ガイド サンプル1の解説「自己申告の確信度は正確性の信頼できる指標ではなく」 |
| 9 | 読み手に合わせて伝え方を変える。手直しの軸は長さ、言葉の難しさ、語調、情報の順番（例: 仕様変更の文書。経営層向けは結論と影響を先に短く、顧客向けは社内の言葉や内部の事情を外して丁寧に）（audience） | 正しい（試験ガイドのタスクの言い換え） | 素材 #10: 試験ガイド §6 分野2「想定する対象者に合わせて出力を編集、調整、改良、比較する」、§3「さまざまな対象者に合わせて出力を調整する」／ blueprint.md 4章 分野2。例は素材の本文のまま |
| 10 | Claude に頼むときは、読み手が誰か、何を知っているか、読んだあと何をしてほしいかを伝える。目的や対象者を伝えると狙いに合った応答になりやすい。公式のプロンプトのガイドの勧め（request） | 正しい | 素材 #9: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices 「Add context to improve performance」／ https://claude.com/blog/best-practices-for-prompt-engineering 「Relevant context (who's the audience, what's the goal)」「Explaining the purpose or audience for the output」 |
| 11 | 言い回しを整えても、中身が正しくなるわけではない（recheck） | 正しい | 素材 #8: 試験ガイド サンプル1の解説「体裁の変更は正しさの問題に対処しません」 |
| 12 | 書き直しの途中で数字や条件が抜け落ちることがある。手直しのあとは元の版と比べ、大事な事実が変わっていないかを確かめる（recheck） | 正しい（実務上の注意。素材の本文のまま） | 素材の本文「書き直す途中で、数字や条件が抜け落ちることもあります」。素材の表に専用の行はない。仕様や数値の主張ではなく、分野2（出力の評価と検証）の手順を手直しの後に当てはめたもの。素材 #8、#10 の範囲 |
| 13 | 直すときは「もっと良くして」ではなく、「結論を最初に」「専門用語を言い換えて」のように、直す箇所と方向を具体的に伝える（refine） | 正しい（試験ガイドのタスクの言い換え） | 素材 #10（「改良する」の具体化）。素材の本文のまま。画面の「いい感じに」は、あいまいな頼み方の例として台本で足した表示（事実の主張ではない） |
| 14 | 語調の違う案を2つか3つ作らせて並べて比べる。基準は印象ではなく読み手の必要（知りたいことに答えているか、誤解されない言葉か、次に何をすればよいか分かるか）（choose） | 正しい（試験ガイドの「比較する」の具体化） | 素材 #10。**複数案の比較という手法そのものは、公式ドキュメントに明記された箇所は見つかっていない**（素材の「確認できなかった点」）。製品の機能の主張は含めていない |
| 15 | 最後に仕上げるのは人。自分の名前で出す成果物には自分が責任を持つ（choose） | 正しい | 素材 #11: blueprint.md 4章 分野2 の対策講座の要旨「自分の名前で出す成果物に責任を持てるようにする」 |
| 16 | 全部載せが親切とは限らない。読み手が判断に使う情報を選び、関係の薄い情報は外す。大事なものから並べ、決めてほしいことを明記。細かな記録は別に添える（例: 競合の調査を部長に報告。10社分の記録より、重要な違い3つと次の一手が先）（curate） | 正しい（試験ガイドのタスクの言い換え） | 素材 #2: 試験ガイド 分野2「Organize and curate information」。例は素材の本文のまま |
| 17 | 試験ガイドは、出力の形式として、アーティファクト、インライン、構造化データの3つを挙げている（formats） | 正しい | 素材 #2: 試験ガイド v1.0 §6 分野2「select appropriate output formats (artifacts, inline, structured data)」 |
| 18 | インラインは会話の中にそのまま返す形で、短い答えや一度読めば済む内容に向く（formats、pick） | 正しい（判断の枠組み） | 素材 #15: 試験ガイド 分野2 の3つの形式の区別／ヘルプセンターのアーティファクトの基準の裏返し。**インラインの定義を明記した公式の記事は見つかっていない**（素材の「確認できなかった点」） |
| 19 | アーティファクトは会話の横の別の画面に開く成果物。ある程度長く、それだけで意味が通じ、あとで編集や使い回しをしそうな内容に向く（formats） | 正しい | 素材 #13: https://support.claude.com/en/articles/9487310 「They open in a separate panel next to the chat」「significant and self-contained, typically over 15 lines」「likely to want to edit, iterate on, or reuse outside the conversation」「stands on its own without needing extra context」 |
| 20 | アーティファクトは2026年9月に新しくなり、今（2026年11月時点）はひな形から作って直接編集できる。判断の軸は変わらない（formats） | 正しい（2026年11月時点） | 素材 #14: 同上「Legacy artifacts are artifacts made in a chat before September 16, 2026」「The Docs, Slides, and Design templates are available on all plans」「In an artifact made from a template, edit directly」 |
| 21 | 構造化データは、表計算ソフトに貼れる表のように項目をそろえて並べた形。集計、並べ替え、ほかの仕組みへの取り込みに使うときに選ぶ（formats） | 正しい（判断の枠組み） | 素材 #15、#12: https://claude.com/blog/best-practices-for-prompt-engineering 「Desired output structure (table, list, paragraph)」 |
| 22 | 決め手は見た目ではなく、受け取った人が次に何をするか。何でもアーティファクトにする、集計に使うデータを文章で返す、は誤り。問い合わせ100件の分類は、件名、分類、緊急度の列をそろえた表にする（pick） | 正しい（判断の枠組み） | 素材 #15。例は素材の本文のまま |
| 23 | ミニクイズ: 応募者30人の書類の要約から作った面接候補の案は、判断に責任を持つ担当者が元の書類と照らして確かめ、直してから会議に出す（quiz） | 正しい（自作の問題） | 素材のミニクイズを短くしたもの。根拠は素材 #3、#5、#6（採用は影響が大きく、知識と直す権限のある人が確かめる）。実際の試験問題ではない |

## 試験ガイドと現行ドキュメントの食い違い（素材と同じ立場で扱った）

- **アーティファクト**: 試験ガイド v1.0（2026年7月）は、出力形式の1つとして「アーティファクト」を挙げるだけで、仕組みには触れない。2026年11月時点のヘルプセンターでは、2026-09-16 以降にアーティファクトが刷新され、テンプレート（ひな形）から作り、直接編集できる形になった。台本では、ガイドの判断の軸（長く、単独で通じ、使い回す成果物はアーティファクト）を主にし、「2026年9月に新しくなり、今はひな形から作って直接編集できる。判断の軸は変わらない」と一言添えた。テンプレートごとの提供プランは、変わりやすいので入れていない。素材の「11月時点では」は、声では「今は」と言っている（概要欄に「2026年11月時点」と書く）。素材の「文書やスライドなどのひな形」は、長さの都合で「ひな形」とだけ言っている。
- **利用ポリシー（AUP）**: 人による確認の義務は 2026-11-12 発効の現行版で確認済み（素材）。試験ガイドは AUP に触れていない。台本では補強の根拠として1文だけ触れ、詳細は第7回に送った。

## 素材から変えた点（動画用の組み直し）

- 文を短く切り、画面の段階（step）に合わせて並べ直した。節の順番と内容は素材のとおり。
- 「この章で学ぶこと」は、オープニングの次の場面（scope）にした。素材の「前の章で学んだ、正しさを確かめる方法の先にある」は「前の回の確かめ方の先にある」に縮めた。
- ヘルプセンターの呼びかけと、確認が欠かせない場面の例・利用ポリシーを、1つの場面（who）にまとめた。
- 素材の「劣る選択肢」は、視聴者に伝わりやすいよう「誤りになるのは」と言い換えた（中身は同じ）。
- 長さ（7分以内）の都合で、次は声では言っていない。
  - 「基準を先に決めておくと、選んだ理由を説明できます」（省いた）
  - 「報告書や研修資料のように、人に見せたり、何度も手を入れたりするものに向きます」（省いた）
  - 「契約なら法務の担当者」「細かな記録は別に添える」「インラインは一度読めば済む内容に向く」「大事なものから並べる」（画面の項目にだけ出している）
  - ミニクイズの解説の「採用は人の将来にかかわり」（「誤りの影響が大きい場面」だけにした）。3番（C）の「確かめれば使える下書きまで捨てる」は「使える下書きまで捨てている」に縮めた
  - 「Anthropic のヘルプセンター」「Anthropic のプロンプトのガイド」は、声では「ヘルプセンター」「公式のプロンプトのガイド」と縮めた
- 「直すときは具体的に」の場面の画面に、あいまいな頼み方の例として「いい感じに」を足した（左右の項目数をそろえるため。事実の主張ではない）。
- 「出力の形」の比較の場面の右列に「ひと言で済む答え → 会話の中にそのまま返す」を置いた。素材のインラインの説明（短い答え）を当てはめたもの。
- ミニクイズは、素材の3択をそのまま使い、問題文と選択肢を短くした。正解は2番（画面では B）。
- 配点の数字は「現行の試験ガイド、バージョン1.0 では」と添えて声で言い、画面の見出しとサムネイルには入れていない。

## 確認できなかった点（素材と同じ）

- 「語調の違う案を複数作らせて比べる」という手法を、Anthropic の公式ドキュメントで明記した箇所は見つかっていない。試験ガイドのタスク「比較する」の具体化として、製品の機能の主張を含めずに扱った。
- 「インライン」の定義を書いた公式の記事は見つかっていない。ガイドの3分類と、ヘルプセンターのアーティファクトの基準から、判断の枠組みとして扱った。

## 参照した URL（素材の表から）

- https://support.claude.com/en/articles/8525154
- https://support.claude.com/en/articles/9487310
- https://www.anthropic.com/legal/aup
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- https://claude.com/blog/best-practices-for-prompt-engineering
- 試験ガイド v1.0（日本語版・英語版）: `CCAO-F/reference/` の PDF とテキスト

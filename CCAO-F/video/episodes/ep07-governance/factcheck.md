# 事実確認：ep07-governance（ガバナンスと責任ある利用）

確認日: 2026-11-16

台本は、講座の本文 `CCAO-F/course/ch07.md`（2026-11-16 に一次情報で事実確認済み）から作った。下の表は、台本に入れた主張について、素材の「事実確認」の表から該当する行を引いたもの（# は素材の表の番号）。素材にない事実は台本に足していないので、新しく確かめた行はない。

根拠は次の3つ。

- **試験ガイド**: Claude Certified Associate – Foundations 試験ガイド v1.0（2026年7月発効。日本語版と英語版）。2026-12-07 に試験内容が更新される予定で、更新版のガイドは 2026-11-17 に公開予定。台本は v1.0 に基づく
- **Anthropic の利用ポリシー**: https://www.anthropic.com/legal/aup （2026-11-12 発効の版）
- **AI Fluency の資料**: https://www-cdn.anthropic.com/34612aacbf37f6aa12140fc0a1aa216b63263aac.pdf
- **プライバシーのヘルプ**: https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data

## 台本の主張と根拠

| # | 台本の主張（場面） | 判定 | 根拠 | 確認日 |
|---|---|---|---|---|
| 1 | 範囲は分野6「ガバナンス、リスク、責任ある利用」。現行の試験ガイド v1.0 では配点15%。範囲は4つ（使い道の見分け、データの機密性・規制・プライバシー、組織の AI ポリシー、倫理的な影響）（scope） | 正しい | 試験ガイド v1.0（日本語版 §6「分野6：ガバナンス、リスク、責任ある利用（15%）」の4項目、英語版 Domain 6 の4項目）。outline.md の値と一致。配点はナレーションでだけ言い、「現行の試験ガイド、バージョン1.0 では」と添えた。見出しとサムネイルには数字を入れていない | 2026-11-16 |
| 2 | Claude が出力できることは、その使い方が適切だという意味ではない（usecase） | 正しい（判断の原則） | 試験ガイド タスク 6.1「適切なユースケースと不適切なユースケースを特定する」。Anthropic の利用ポリシーが、Claude で出力できる使い方の中に禁止や追加の要件があるものを定めていること（https://www.anthropic.com/legal/aup） | 2026-11-16 |
| 3 | 採用の合否、人事評価、融資や保険の審査などでは、資格のある人が中身を確かめ、変える権限を持ち、結果に責任を持つことを、Anthropic が利用ポリシーで求めている（2026年11月時点）。Claude には要約や論点の整理を任せ、決めるのは人（usecase、highrisk） | 正しい | https://www.anthropic.com/legal/aup （Effective Nov 12, 2026）High-risk Use Case Requirements:「A qualified person must meaningfully review a High-risk AI Recommendation, with the authority to change or modify it」「The qualified person remains responsible for the accuracy and appropriateness of what is delivered or decided」。High-risk Areas に Employment（screening… hiring… evaluating a worker's performance）、Credit、Insurance を含む。社内の下書き・要約・分析は要件の対象外（Exclusions「Internal drafting, research, summarization, or analysis that is not the ultimate High-risk AI Recommendation」） | 2026-11-16 |
| 4 | 架空の客になりすました口コミのような、人をだます使い方は選ばない（usecase） | 正しい | https://www.anthropic.com/legal/aup Universal Usage Standards「… in order to mislead people about their origin or attribution … (e.g., sockpuppets, astroturfing, fake reviews, or bots that claim to be human)」 | 2026-11-16 |
| 5 | 規制対象の識別情報は、入れる前に削除または匿名化する。社内だけで使う分析でも同じ。匿名化で進められるなら、分析をやめる必要はない（anonymize、noretain、right、wrap） | 正しい | 試験ガイド サンプル3の解説「規制対象の識別情報を使用前に削除または匿名化する…そのままアップロードすること（A）はポリシーに違反…タスクを断念すること（D）は不要」。選択肢Aの「分析は社内向けなので」が誤答 | 2026-11-16 |
| 6 | モデルに「保持しないで」と指示しても、ポリシー上の管理要件を満たさない（noretain、traps） | 正しい | 試験ガイド サンプル3の解説「モデルにデータを保持しないよう指示すること（C）は、ポリシー上の管理要件を満たしません」 | 2026-11-16 |
| 7 | データがどう保存されるかは、組織の契約や製品の設定で決まる（noretain） | 正しい | https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data 保存期間は標準の扱い、利用者による削除、長期保存のサービスの設定、契約（「unless … you and we have agreed otherwise (e.g. zero data retention agreement)」）などで決まると説明。チャットでの指示で変わるという記載はない。具体的な日数は台本に入れていない | 2026-11-16 |
| 8 | まず組織の AI ポリシーに従う。提供元の方針は、自社のルールの代わりにならない（layers） | 正しい | 試験ガイド タスク 6.3「組織のAIポリシーとガバナンス基準に従う」、サンプル3（組織のポリシーが基準）。blueprint.md 分野6 の整理（ベンダーの安全方針と自社のルールは別の層。第三者の整理だが、ガイドの 6.3 と矛盾しない判断として採用） | 2026-11-16 |
| 9 | Anthropic の利用ポリシー自身が、各地の法律の要件を置き換えるものではないと書いている（layers） | 正しい | https://www.anthropic.com/legal/aup High-risk Use Case Requirements「they do not replace local legal requirements and restrictions. Users should always default to following local laws…」。この記述は高リスクの要件の節にある。台本も「各地の法律の要件を置き換えるものではない」とだけ言い、範囲を広げていない | 2026-11-16 |
| 10 | ルールに書かれていない場面は、自己判断で進めず、担当部署に確かめる。許可のないサービスや個人のアカウントで済ませない（escalate、right、wrap） | 正しい（判断の原則） | 試験ガイド §3「人間の専門知識、検証、エスカレーションが必要な場面を見極める」、§7「エスカレーションや人間によるレビューを求めるタイミング」、タスク 6.3。部署名（情報システム、法務）は例として挙げただけ | 2026-11-16 |
| 11 | AI Fluency の Diligence は「AI で何をし、どう使うかに責任を持つこと」で、3つの側面（どの AI をどう使うか考えて選ぶ、AI の役割を知る必要のある人に正直に伝える、使う・共有する出力を自分で確かめて責任を持つ）がある（diligence） | 正しい | AI Fluency 資料「Diligence is taking responsibility for what we do with AI and how we do it.」Creation Diligence「Being thoughtful about which AI systems you use and how you interact with them.」Transparency Diligence「Being honest about AI's role in your work with everyone who needs to know.」Deployment Diligence「Taking responsibility for verifying and vouching for the outputs you use or share.」 | 2026-11-16 |
| 12 | AI を使ったことは、社内の決まりに沿って伝える（proposal） | 正しい | 同じ AI Fluency 資料「Different contexts (personal, academic, professional) may have different expectations for disclosure and verification.」。台本も「必ず伝える」と言い切らず、社内の決まりに沿うとした | 2026-11-16 |
| 13 | 人について書いた部分は、不利な決めつけ（バイアス）がないかも見る（proposal） | 正しい | 試験ガイド タスク 6.4「AI利用の倫理的な影響を理解する」、§7「出力の正確性とバイアスを評価する」。見つけ方そのものは分野2（第2回・第3回）の範囲なので、一言にとどめた | 2026-11-16 |
| 14 | 誤答の型（何もしない、極端、モデルに頼む）と、正解の型（目的を果たしつつルールに沿い、人が確かめられる手）（traps、right） | 正しい（ガイドのサンプルからの分析） | 試験ガイド サンプル3の選択肢A、C、Dと解説。blueprint.md 7.1 の分析と同じ。台本では「出題傾向」とは言わず、「誤答には型がある」という整理として話している | 2026-11-16 |
| 15 | ミニクイズ: 採用の合否は人が確かめて決める。「公平に評価して」と指示するだけでは管理策にならない。一切使わないのは極端（quiz） | 正しい | #3（利用ポリシーの Employment と人の確認、内部の要約は対象外）、#6 と #14（モデルへの指示は管理策の代わりにならない、極端な対処は誤答）。問題は自作で、実際の試験問題ではない | 2026-11-16 |

## 台本での整理（素材の文言そのままではないもの）

- **「データの守り方」の場面の表（顧客名・口座番号）は、説明用の架空の例。** 素材の「顧客名を『顧客A』に置き換えても、売上の傾向はそのまま分析できる」と、「顧客の名前や口座番号」を1枚の表にし、売上の傾向の話は見出しの下の補足に置いた。名前（山田 花子）と番号は架空。
- **「人の生活に関わる判断は、人が決める」の3段の図（Claude が材料 → 人が確かめる → 人が決める）** は、#3 の利用ポリシーの要件を、素材の「Claude には書類の要約や論点の整理を任せ、決めるのは人です」に沿って図にしたもの。
- **提案書の4段の図** は、素材の段落（中身を確かめる、AI を使ったことを伝える、不利な決めつけを見る、「Claude が書いたから」は言い訳にならない）を、顧客に出すまでの順に並べたもの。素材の順序（伝える → 決めつけを見る）を、「確かめる」の中に決めつけの確認を入れる形に組み替えた。
- **3つ目の誤答の例は、ナレーションでは「公平に判断して」だけを言い、画面に「保持しないで」と並べた。** 長さの都合。

## 試験ガイドと現行ドキュメントの食い違い

- なし（素材と同じ）。試験ガイドは Anthropic の利用ポリシーに触れていない。台本で引いた利用ポリシーは 2026-11-12 発効の版で、ガイドの立場（人が確かめて責任を持つ、組織のポリシーに従う）を補う例としてだけ使い、正解の根拠をポリシーの細目に置いていない。台本では「2026年11月時点の利用ポリシー」と時点を添えた。

## 未確認のまま残っている主張

なし。素材の事実確認（2026-11-16）の範囲を引き継いでいる。

- 2026-12-07 の試験内容の更新で、分野の名前・配点・タスクが変わる可能性がある。更新版のガイド（2026-11-17 公開予定）が出たら、scope の場面（分野6の名前と範囲、配点15%）を見直すこと。

## 参照した URL

- https://www.anthropic.com/legal/aup
- https://www-cdn.anthropic.com/34612aacbf37f6aa12140fc0a1aa216b63263aac.pdf
- https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data

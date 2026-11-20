# 公開用の文面：第6回 ガバナンスとリスク管理

## 題名（案）

1. 【CCAR-P】ガバナンスとリスク管理｜ガードレール・人の確認・規制（第6回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-P 対策】AI の安全策は、モデル任せにしない｜ガバナンスとリスク管理（第6回）
   - サムネイルの言葉と合わせ、この回の結論を前に出した形。
3. Claude を業務に入れる前に｜ガードレール、人の確認、GDPR・HIPAA・FedRAMP【CCAR-P 第6回】
   - 資格を受けない設計者にも届く形。規制の名前で検索する人を狙う。

## 概要欄

```
CCAR-P の分野5「ガバナンス、安全性、リスク管理」を整理します。モデルが守ると思い込まずアプリで強制する考え方、ガードレールの置き場所と fail closed、人の確認の振り分け方、規制の義務と管理策・責任者・証跡の対応づけ、公平性と透明性まで。CCAR-P（Claude Certified Architect – Professional）の学習用です。

▼ 目次
0:00 オープニング
0:33 リスク
1:14 ガードレール
2:25 人の確認
3:13 規制
4:47 倫理
5:34 ミニクイズ
6:21 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・試験の範囲と配点は、CCAR-P 試験ガイド バージョン1.0 に基づいています。2026年12月7日に試験内容の更新が予定されています（更新版の試験ガイドは2026年11月17日に公開予定）。12月7日以降に受験する方は、新しい試験ガイドを確認してください。
・製品と規制対応の情報は、2026年11月時点の公式ドキュメントと公式ページに基づいています。特に FedRAMP の認可の状況（どの提供ルートが認可されているか）は変わることがあります。
・「訓練で減るリスクとアプリが強制すべきリスクを分ける」「ガードレールの3つの置き場所」「人の確認の3つの軸」「義務を管理策・責任者・証跡に対応づける」は、公式の対策講座（Partner Academy）の学習目標に基づく整理です。試験ガイドそのものの記述ではありません。
・法律の条文の解釈には踏み込んでいません。実際の規制対応は、自社の法務・コンプライアンスの担当者に確認してください。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Reduce hallucinations: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
・Mitigate jailbreaks and prompt injections: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
・Anthropic Usage Policy: https://www.anthropic.com/legal/aup
・Our framework for developing safe and trustworthy agents: https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents
・Does Anthropic act as a data processor or controller?: https://privacy.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller
・API and data retention: https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
・Claude for Government: https://claude.com/solutions/government
・What certifications has Anthropic obtained?: https://privacy.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained
・Evaluating and mitigating discrimination in language model decisions: https://www.anthropic.com/research/evaluating-and-mitigating-discrimination-in-language-model-decisions
・Building effective agents: https://www.anthropic.com/engineering/building-effective-agents

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-P, CCA-P, Claude Certified Architect, Claude, Anthropic, AIガバナンス, ガードレール, ヒューマン・イン・ザ・ループ, プロンプトインジェクション, GDPR, HIPAA, FedRAMP, 資格対策

## アップロードするファイル

- 動画: `out/ep06-governance/ep06-governance.mp4`
- サムネイル: `out/ep06-governance/thumbnail.png`
- 字幕: `out/ep06-governance/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。特に FedRAMP の認可の状況）
- [ ] 2026年11月17日公開予定の更新版の試験ガイドと、この回の範囲・用語に食い違いがないかを確かめた（12月7日以降に公開する場合は必須）
- [ ] 資格の正式名称「Claude Certified Architect – Professional」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「GDPR」（ジーディーピーアール）、「HIPAA」（ヒッパ）、「BAA」（ビーエーエー）。「規制」の章
- 「FedRAMP」（フェドランプ）。単独だと音声エンジンが「フェ/ドランプ」と区切るので、「政府向けの FedRAMP は」と前に語を足している。「規制」の章
- 「Zero Data Retention」（ゼロデータリテンション）。カタカナだと「リテン/ション」と区切れるので、読みを「ゼロデータりてんしょん」と指定している。同じ章
- 「Claude for Government」「Trust Center」。同じ章
- 「fail closed」（フェイルクローズド）。「ガードレール」の章
- 「ヒューマン・イン・ザ・ループ」。中黒で間が入らないよう、読みでは中黒を外している。「人の確認」の章
- 「バージョン1.0」「14%」（ジュウ／ヨンパーセント）。冒頭の配点の文
- ミニクイズの「正解は B」（ビー）と、解説の「A は」「C は」（エー、シー）

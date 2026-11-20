# 公開用の文面：第8回 開発チームの生産性と運用

## 題名（案）

1. 【CCAR-P】開発チームの生産性と運用｜管理設定・スキル配布・レビューの規律（第8回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-P 対策】CLAUDE.md のルールが破られる？｜必ず守らせるなら仕組みで（第8回・最終回）
   - 問いかけで興味を引く形。ミニクイズの内容と対応している。最終回であることも入れた。
3. Claude Code をチームで使うときの設定と運用｜管理設定、スキル、/code-review【CCAR-P 第8回】
   - 資格を受けない開発チームのリーダーにも届く形。

## 概要欄

```
Claude Code をチームで使うときの、設定の共有と管理設定、スキルの配り方、支出の管理、AI が書いた成果物のレビューの規律、症状を原因の層に結びつける問題の切り分けを整理します。CCAR-P（Claude Certified Architect – Professional）の分野7「開発者の生産性と運用支援」の学習用で、全8回の講座の最終回です。

▼ 目次
0:00 オープニング
0:44 チームの設定
1:57 スキルと支出
3:17 レビューの規律
4:24 問題の切り分け
5:42 ミニクイズ
6:28 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・試験の範囲と配点は、公式の試験ガイド バージョン1.0 に基づいています。2026年12月7日に試験内容の更新が予定されています（更新版の試験ガイドは2026年11月17日に公開予定）。
・Claude Code の機能の説明は、2026年11月時点の公式ドキュメントに基づいています。仕様は変わることがあります。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Claude Code settings: https://code.claude.com/docs/en/settings
・Set up Claude Code for your organization: https://code.claude.com/docs/en/admin-setup
・Server-managed settings: https://code.claude.com/docs/en/server-managed-settings
・Best practices for Claude Code: https://code.claude.com/docs/en/best-practices
・Skills: https://code.claude.com/docs/en/skills
・Plugins for organizations: https://code.claude.com/docs/en/plugins/org
・Manage costs: https://code.claude.com/docs/en/costs
・Analytics: https://code.claude.com/docs/en/analytics
・Monitoring usage: https://code.claude.com/docs/en/monitoring-usage
・Common workflows: https://code.claude.com/docs/en/common-workflows

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-P, Claude Certified Architect, Claude Code, Anthropic, 管理設定, managed settings, スキル, プラグイン, コードレビュー, 資格対策

## アップロードするファイル

- 動画: `out/ep08-team-enablement/ep08-team-enablement.mp4`
- サムネイル: `out/ep08-team-enablement/thumbnail.png`
- 字幕: `out/ep08-team-enablement/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する）
- [ ] 2026年11月17日公開予定の更新版の試験ガイドで、分野7の名前・タスクが変わっていないかを確かめた（変わっていれば、概要欄の「この動画について」に差分を書き足す）
- [ ] 資格の正式名称「Claude Certified Architect – Professional」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「MDM」（エムディーエム）。カタカナの読みを辞書に入れると「エム／ディー／エム」と区切れたので、英字のままエンジンに読ませている。「MDM で管理する端末」は一続きに読まれる。「チームの設定」の章
- 「.claude/settings.json」（ドットクロードの、セッティングスジェイソン）と「.claude/skills」（ドットクロードの、スキルズフォルダー）。「チームの設定」「スキルと支出」の章
- 「/status」（スラッシュステータス）、「/code-review」（スラッシュコードレビュー）
- 「OpenTelemetry」（オープンテレメトリー）、「Teams」「Enterprise」、「claude.ai」（クロードドットエーアイ）。「スキルと支出」の章
- 「改善の要は」。エンジンが「よう」と読んだので、読みを「かなめ」に指定している。「レビューの規律」の章の冒頭
- 「バージョン1.0」（バージョンいってんぜろ）、「分野7」「7%」。オープニング
- ミニクイズの「正解は C」（シー）と、「A は」「B は」（エー、ビー）

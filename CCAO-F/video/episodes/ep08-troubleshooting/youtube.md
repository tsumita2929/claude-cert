# 公開用の文面：第8回 うまくいかないときの直し方

## 題名（案）

1. 【CCAO-F】うまくいかないときの直し方｜原因は4つの型（第8回）
   - 検索重視。資格名と、動画でいちばん覚えてほしいことを入れた形。
2. 【CCAO-F 対策】Claude の出力がいまいちなとき、どう直す？｜トラブルシューティングと最適化（第8回）
   - 問いかけの形。分野7 の公式の名前も入れた。
3. 同じ手直しを毎回していませんか｜Claude の不調を原因から直す【CCAO-F 第8回・最終回】
   - 資格を受けない Claude の利用者にも届く形。最終回であることを入れた。

## 概要欄

```
Claude の出力が期待外れだったときに、あきらめず、手当たり次第にも変えず、原因から直す方法を整理します。不調の4つの根本原因（指示の不足、詰め込みすぎ、選び間違い、古い設定）、結果で確かめる直し方、繰り返す手直しをプロジェクト・スキル・常設の指示に移す考え方、そして講座全体の振り返りまで。CCAO-F（Claude Certified Associate – Foundations）の分野7「トラブルシューティングと最適化」の学習用です。全8回の最終回です。

▼ 目次
0:00 オープニング
0:24 まず言葉に
1:09 4つの原因
3:24 結果で確かめる
4:18 設定に移す
5:19 振り返り
5:56 ミニクイズ
6:35 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は、公式の試験ガイド バージョン1.0 と、2026年11月時点の公式ドキュメント・ヘルプセンター・公式の対策講座の説明ページに基づいています。試験内容は 2026年12月7日に更新される予定です（更新版の試験ガイドは 2026年11月17日に公開予定）。12月7日以降に受験する方は、新しい試験ガイドを確認してください。
・「4つの根本原因」「繰り返す手直しを持続する修正に」「共通の文脈、形式、検証の手順をプロジェクト・スキル・常設の指示へ」は、公式の対策講座（Partner Academy）の学習目標に基づきます。対策講座は試験ガイドそのものではありません。
・「ちょうどよい大きさの手を選ぶ」は、公式のサンプル問題をもとにした、この講座の整理です。
・製品の画面や機能は変わることがあります（スキルは、2026年11月時点でプラグインのページにまとめられつつあります）。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・公式の対策講座「Troubleshooting and Optimization」（Anthropic Partner Academy）: https://anthropic-partners.skilljar.com/path/claude-certified-associate-foundations/troubleshooting-optimization
・Prompting best practices（Claude Docs）: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
・How do usage and length limits work?（ヘルプセンター）: https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work
・Using Research on Claude（ヘルプセンター）: https://support.claude.com/en/articles/11088861-use-research-on-claude
・What are projects?（ヘルプセンター）: https://support.claude.com/en/articles/9517075-what-are-projects
・Understanding Claude's personalization features（ヘルプセンター）: https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features
・What are Skills?（ヘルプセンター）: https://support.claude.com/en/articles/12512176-what-are-skills
・Manage plugins, skills, and connectors from one Plugins page（ヘルプセンター）: https://support.claude.com/en/articles/17740565-manage-plugins-skills-and-connectors-from-one-plugins-page

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAO-F, Claude Certified Associate, Claude, Anthropic, 生成AI, AI活用, トラブルシューティング, プロンプト, Claude プロジェクト, 資格対策

## アップロードするファイル

- 動画: `out/ep08-troubleshooting/ep08-troubleshooting.mp4`
- サムネイル: `out/ep08-troubleshooting/thumbnail.png`
- 字幕: `out/ep08-troubleshooting/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 2026年11月17日公開の更新版の試験ガイドで、分野7 の名前・配点・タスクに変更がないかを確かめた（変更があれば、冒頭の配点の文と概要欄を直す）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。スキルとプラグインの画面の変化が進んでいないかも見る）
- [ ] 資格の正式名称「Claude Certified Associate – Foundations」が公式の表記と合っている
- [ ] 事実確認の記録（factcheck.md）に、未確認の項目が残っていない
- [ ] 概要欄に、断り書き・情報の時点・試験の更新の予定・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「最適化」（さいてきか）。音声エンジンが「パーソナライズ」と読み替えたため、台本の `lexicon` で読みを指定している。「オープニング」と「設定に移す」の章
- 「CCAO-F」（シーシーエーオーエフ）と「バージョン1.0」「10%」。オープニング
- 「次の依頼の条件にします」。「次の」が「じの」と読まれたため、文を「それを次の依頼の条件にします」に変えて直した。「結果で確かめる」の章
- 「長すぎるのか」「大きすぎる対処」。「すぎる」の前で区切って読まれる（読み自体は正しい）。「まず言葉に」「4つの原因」の章
- 「トラブルシューティング」「詰め込みすぎ」「常設の指示」
- ミニクイズの「正解は C」（シー）

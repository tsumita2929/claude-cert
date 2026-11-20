# 公開用の文面：第1回 ソリューション設計

## 題名（案）

1. 【CCAR-P】ソリューション設計｜役割分け・構成のパターン・価値の柱（第1回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-P 対策】その課題、エージェントにすべき？｜ソリューション設計（第1回）
   - 問いかけで興味を引く形。ミニクイズの内容と対応している。
3. Claude のソリューション設計は、まず単純な構成から｜拡張LLM・ワークフロー・エージェント型【CCAR-P 第1回】
   - 資格を受けないアーキテクトにも届く形。サムネイルの言葉と対応している。

## 概要欄

```
Claude を使ったソリューションの設計を整理します。課題を Claude・既存のシステム・人の役割に分ける考え方、入力からフィードバックループまでの全体の流れ、拡張LLM・ワークフロー・エージェント型の選び方、分解の手法、マルチエージェントの向き不向き、ビジネス価値の柱と成功基準まで。CCAR-P（Claude Certified Architect – Professional）の分野1「ソリューション設計とアーキテクチャ」の学習用です。

▼ 目次
0:00 オープニング
0:23 役割と流れ
1:55 パターンと分解
3:38 マルチエージェント
4:42 ビジネス価値
5:31 ミニクイズ
6:15 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は、公式の試験ガイド バージョン1.0 と、2026年11月時点の公式ドキュメント・公式記事に基づいています。この試験は 2026年12月7日に試験内容の更新が予定されています（更新版の試験ガイドは 2026年11月17日に公開予定）。12月7日以降に受験する方は、新しい試験ガイドとの違いを確認してください。
・「単純な構成から始める」「分解の手法」「マルチエージェントの向き不向き」は、API の仕様ではなく、Anthropic の公式記事（下記の2本）に書かれた設計の考え方をまとめたものです。「トークンの消費は、ふつうのチャットの約15倍」は、公式記事に書かれた Anthropic の自社のデータです。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Building effective agents（Anthropic Engineering）: https://www.anthropic.com/engineering/building-effective-agents
・How we built our multi-agent research system（Anthropic Engineering）: https://www.anthropic.com/engineering/multi-agent-research-system
・Ticket routing: https://platform.claude.com/docs/en/about-claude/use-case-guides/ticket-routing
・Define success criteria and build evaluations: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-P, Claude Certified Architect, Claude, Anthropic, ソリューション設計, AIアーキテクチャ, AIエージェント, ワークフロー, マルチエージェント, 資格対策

## アップロードするファイル

- 動画: `out/ep01-solution-design/ep01-solution-design.mp4`
- サムネイル: `out/ep01-solution-design/thumbnail.png`
- 字幕: `out/ep01-solution-design/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する）
- [ ] 2026年11月17日公開予定の更新版の試験ガイドで、分野1の名前・範囲・訳語が変わっていないかを確かめた（配点の数字は「バージョン1.0 では」と添えている。サムネイルと見出しには入れていない）
- [ ] 資格の正式名称「Claude Certified Architect – Professional」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「拡張LLM」（かくちょう、エルエルエム）。カタカナの読みでは語の途中で区切れたため、読みをひらがなで指定している。「パターンと分解」の章
- 「パフォーマンスSLA」（エスエルエー）。読みをひらがなで指定している。「ビジネス価値」の章
- 「数千件」（すうせんけん）。音声エンジンが「スウセンゲン」と読んだため、読みを直している。ミニクイズ
- 「次の段」（つぎのだん）。音声エンジンが「ジノ」と読んだため、読みを直している。「パターンと分解」の章
- 「元のシステム」（もとの）。読みを指定している。「役割と流れ」の章
- 「バージョン1.0」「17%」「約15倍」。数字の途中（ジュウ／ナナ、ジュウ／ゴ）にアクセントの区切りが入っている
- 「オーケストレーター・ワーカー」。中黒のところで短い間が入る
- 「正本」（しょうほん）、「刻々と」、「CCAR-P」（シーシーエーアールピー）
- ミニクイズの「正解は B」（ビー）

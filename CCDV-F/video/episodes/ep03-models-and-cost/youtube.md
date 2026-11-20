# 公開用の文面：第3回 モデルの選び方とコスト

## 題名（案）

1. 【CCDV-F】モデルの選び方とコスト｜effort とプロンプトキャッシュ（第3回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCDV-F 対策】安いモデルに替えたのに高くなる？｜モデルの選び方とコスト（第3回）
   - 問いかけで興味を引く形。「コストは完了したタスクで比べる」の場面と対応している。
3. Claude API のコストを下げる｜モデル選択・effort・プロンプトキャッシュ【CCDV-F 第3回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
Claude のモデルをどう選び、コストをどう下げるかを整理します。4つの系統（Fable／Opus／Sonnet／Haiku）の位置づけ、effort での調整、完了したタスクあたりで比べるコストの考え方、プロンプトキャッシュの仕組みと数字まで。CCDV-F（Claude Certified Developer – Foundations）の学習用です。

▼ 目次
0:00 オープニング
0:20 モデルの選び方
1:26 思考と effort
2:46 コストの考え方
3:38 プロンプトキャッシュ
5:30 待ち時間
5:52 ミニクイズ
6:21 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式ドキュメントに基づいています。モデルの顔ぶれ、effort の既定値、料金の倍率は特に変わりやすいので、最新の情報は公式ドキュメントで確認してください。
・「出力のばらつきは、指示と例、構造化出力で抑える」「ツールの定義は途中で変えない」は、API の仕様ではなく、運用の考え方をまとめたものです。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式ドキュメント）
・Models overview: https://platform.claude.com/docs/en/models/overview
・Choosing the right model: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
・Effort: https://platform.claude.com/docs/en/build-with-claude/effort
・Optimizing for cost and intelligence: https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence
・Token counting: https://platform.claude.com/docs/en/build-with-claude/token-counting
・Prompt caching: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCDV-F, Claude Certified Developer, Claude API, Anthropic, モデル選択, effort, プロンプトキャッシュ, コスト最適化, adaptive thinking, 資格対策

## アップロードするファイル

- 動画: `out/ep03-models-and-cost/ep03-models-and-cost.mp4`
- サムネイル: `out/ep03-models-and-cost/thumbnail.png`
- 字幕: `out/ep03-models-and-cost/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 現行のモデルが、今も Fable／Opus／Sonnet／Haiku の4系統で、「迷ったら Opus から」の案内が変わっていない（Models overview）。変わっていたら、「モデルの選び方」の章を作り直す
- [ ] キャッシュの数字（ブレークポイント4つ、既定5分、書き込み 1.25倍と2倍、読み込み 0.1倍）が変わっていない（Prompt caching の Pricing）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた
- [ ] 資格の正式名称「Claude Certified Developer – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- モデルの系統名（フェイブル、オーパス、ソネット、ハイク）。「モデルの選び方」の章に出る。Fable を「フェイブル」と読ませているが、日本語での公式の呼び方は確認できていない
- 「effort」（エフォート）。全編に出る
- effort の値（ロー、ミディアム、ハイ、エックスハイ、マックス）。「思考と effort」の章の2つ目の場面
- 「adaptive thinking」（アダプティブシンキング）、「temperature」（テンパラチャー）、「cache_control」（キャッシュコントロール）、「usage」（ユーセージ）
- 数字の読み。「2026年11月時点」「1.25倍」（いってんにーごーばい）「およそ10分の1」（じゅうぶんのいち）「4つ」（よっつ）

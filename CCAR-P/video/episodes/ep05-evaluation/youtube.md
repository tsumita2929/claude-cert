# 公開用の文面：第5回 評価・テスト・最適化

## 題名（案）

1. 【CCAR-P】評価・テスト・最適化｜成功基準から本番のモニタリングまで（第5回）
   - 検索重視。資格名と、試験の分野名をそのまま入れた形。
2. 【CCAR-P 対策】変更の良し悪しは「感想より物差し」｜評価・テスト・最適化（第5回）
   - サムネイルの言葉と合わせた形。この回でいちばん覚えてほしいことを前に出す。
3. Claude の評価と最適化の進め方｜成功基準・採点・診断・コスト削減【CCAR-P 第5回】
   - 資格を受けない開発者・アーキテクトにも届く形。

## 概要欄

```
Claude を使ったシステムの評価、テスト、最適化を整理します。測れる成功基準の決め方、評価データセットと3つの採点方法、A/B テストの読み方、問題の診断（プロンプトの失敗、ハルシネーション、モデルの不適合）、品質を落とさない最適化、本番のモニタリングと stop_reason まで。CCAR-P（Claude Certified Architect – Professional）の分野4の学習用です。

▼ 目次
0:00 オープニング
0:29 成功基準
1:10 評価データ
2:13 改善と診断
3:49 最適化と監視
5:28 ミニクイズ
6:17 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・試験の範囲と配点は、公式の試験ガイド バージョン1.0（2026年7月発効）に基づいています。この試験は 2026年12月7日に試験内容の更新が予定されています（更新版の試験ガイドは 2026年11月17日に公開予定）。12月7日以降に受験する方は、新しい試験ガイドを確認してください。
・製品の仕様は、2026年11月時点の公式ドキュメントと公式記事に基づいています。仕様は変わることがあります。
・「成功基準はコードを書く前に決める」「A/B テストの結果を言いすぎずに読む」は、公式の対策講座（Partner Academy）の学習目標と、公式ドキュメント・記事の考え方をまとめたものです。
・画面のコード例の数値は、説明用の値です。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・成功基準の定義と評価の作成（Claude Docs）: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
・Demystifying evals for AI agents（Anthropic Engineering）: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
・Reduce hallucinations: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
・Choosing a model: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
・Reduce latency: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency
・Prompt caching: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
・Batch processing: https://platform.claude.com/docs/en/build-with-claude/batch-processing
・Handling stop reasons: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons
・Pearson VUE（試験内容の更新の告知）: https://www.pearsonvue.com/us/en/anthropic.html

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-P, Claude Certified Architect, Claude Certified Architect Professional, Claude API, Anthropic, LLM 評価, 評価データセット, A/B テスト, ハルシネーション, プロンプトキャッシング, 資格対策

## アップロードするファイル

- 動画: `out/ep05-evaluation/ep05-evaluation.mp4`
- サムネイル: `out/ep05-evaluation/thumbnail.png`
- 字幕: `out/ep05-evaluation/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 2026年11月17日公開予定の更新版の試験ガイドを読み、分野4の名前・配点・タスクが動画の内容と食い違っていないかを確かめた（12月7日以降に公開するなら、概要欄の「この動画について」も直す）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する）
- [ ] 資格の正式名称「Claude Certified Architect – Professional」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「最適化」（さいてきか）。音声エンジンが「パーソナライズ」と読み替えたので、この回の辞書でひらがなを指定している。冒頭、「最適化と監視」の章、まとめ
- 「RAG」（ラグ）、「A/B テスト」（エービーテスト）。この回の辞書で指定。「改善と診断」の章
- 「配点は16%」（ジュウ／ロクパーセント）、「バージョン1.0」（バージョン、イッテン、ゼロ）。冒頭
- 「0.1%未満」「1万回の試行」「20件から50件」。「成功基準」「評価データ」の章
- 「Message Batches API」（メッセージバッチズエーピーアイ）、「max_tokens」「stop_reason」。「最適化と監視」の章
- 「オブザーバビリティ」「ハルシネーション」「レイテンシ」
- ミニクイズの「正解は B」（ビー）

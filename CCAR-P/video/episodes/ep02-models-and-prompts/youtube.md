# 公開用の文面：第2回 モデルとプロンプトの設計

## 題名（案）

1. 【CCAR-P】モデルとプロンプトの設計｜選び方・コンテキスト・キャッシュ（第2回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-P 対策】モデルを替える前に、評価する｜プロンプトとコンテキストの設計（第2回）
   - サムネイルとミニクイズの結論を前に出した形。
3. Claude のモデル選びとプロンプト設計の考え方｜キャッシュ・Skills まで【CCAR-P 第2回】
   - 資格を受けない設計者・開発者にも届く形。

## 概要欄

```
Claude のモデルの選び方と、プロンプト・コンテキストの設計を整理します。品質・速度・コストのトレードオフと評価、システムプロンプトとガードレール、ゼロショット・few-shot・思考の連鎖、コンテキストウィンドウの管理、プロンプトキャッシングとモジュール型プロンプト・Skills による再利用まで。CCAR-P（Claude Certified Architect – Professional）の分野2の学習用です。

▼ 目次
0:00 オープニング
0:22 モデルの選択
1:33 プロンプト設計
2:34 手法の使い分け
3:40 コンテキスト
4:41 再利用
5:51 ミニクイズ
6:31 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・試験の範囲と配点は、公式の試験ガイド バージョン1.0 に基づいています。2026年12月7日に試験内容の更新が予定されています（更新版の試験ガイドは2026年11月17日に公開予定）。12月7日以降に受験する方は、新しい試験ガイドで範囲を確認してください。
・製品の仕様は、2026年11月時点の公式ドキュメントに基づいています。仕様は変わることがあります。
・「思考の連鎖」は試験ガイドが挙げる手法として説明しています。2026年11月時点のドキュメントでは、新しいモデルは思考の機能（adaptive thinking）に任せるのが基本です。
・プロンプトの例とクイズは自作のもので、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Choosing a model: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
・Prompt engineering overview: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
・Prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
・Reduce hallucinations: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
・Mitigate jailbreaks and prompt injections: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
・Context windows: https://platform.claude.com/docs/en/build-with-claude/context-windows
・Effective context engineering for AI agents（Anthropic Engineering）: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
・Prompt caching: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
・Agent Skills overview: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-P, CCA-P, Claude Certified Architect, Claude, Anthropic, プロンプトエンジニアリング, コンテキストエンジニアリング, プロンプトキャッシング, few-shot, Agent Skills, 資格対策

## アップロードするファイル

- 動画: `out/ep02-models-and-prompts/ep02-models-and-prompts.mp4`
- サムネイル: `out/ep02-models-and-prompts/thumbnail.png`
- 字幕: `out/ep02-models-and-prompts/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 2026年11月17日公開予定の更新版の試験ガイドを見て、分野2の範囲と配点の言い方（「現行の試験ガイド、バージョン1.0 では13%」）を、公開日の時点でそのまま使えるか確かめた
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する）
- [ ] 資格の正式名称「Claude Certified Architect – Professional」が公式の表記と合っている
- [ ] 事実確認の記録（factcheck.md）に、未確認の項目が残っていない
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「最適化」（さいてきか）。音声エンジンが「パーソナライズ」と読み替えたので、この回の辞書で読みを指定している。「コンテキスト」の章の冒頭（3:40 ごろ）
- 「癖」（くせ）。エンジンが「へき」と読んだので指定している。「手法の使い分け」の章
- 「context rot」（コンテキストロット）、「few-shot」（フューショット）、「Skills」（スキルズ）、`effort`（エフォート）
- 「バージョン1.0」「13%」（ジュウ/サンパーセント。区切りが入る）。オープニング
- 「CCAR-P キャッチアップ講座」（シーシーエーアールピー）。オープニング
- ミニクイズの「正解は B」（ビー）、「A は…、C は…」（エー、シー）

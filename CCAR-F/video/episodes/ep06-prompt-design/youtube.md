# 公開用の文面：第6回 プロンプト設計とレビュー

## 題名（案）

1. 【CCAR-F】プロンプト設計とレビュー｜明示的な基準と few-shot（第6回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-F 対策】「保守的に」は効かない｜誤検知を減らすプロンプト設計（第6回）
   - サムネイルと同じ結論を前に出す形。ミニクイズの内容と対応している。
3. Claude のコードレビューを設計する｜基準・few-shot・マルチパス【CCAR-F 第6回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
誤検知を減らす明示的な基準の書き方、出力の形をそろえる few-shot の例、そしてレビューを独立したインスタンスと複数のパスに分ける設計を整理します。CCAR-F（Claude Certified Architect – Foundations）の分野4「プロンプトエンジニアリングと構造化出力」の前半、タスク 4.1・4.2・4.6 の学習用です。

▼ 目次
0:00 オープニング
0:25 明示的な基準
2:15 few-shot の例
4:00 レビューの分け方
5:25 ミニクイズ
6:07 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は、公式の試験ガイド（v1.0）と、2026年11月時点の公式ドキュメントに基づいています。仕様や試験の内容は変わることがあります。
・試験ガイドと現在の公式ドキュメントで目安が違う点（few-shot の例の数、確信度によるふるい分け）は、試験ガイドの立場を主にして、現在の助言を添えています。
・動画内のコード例とクイズは自作で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Prompting best practices（Use examples effectively）: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
・Prompting Claude Opus 4.8（Code review harnesses）: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8
・Claude Certified Architect – Foundations 試験ガイド（公式）

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-F, Claude Certified Architect, Claude, Anthropic, プロンプトエンジニアリング, few-shot, コードレビュー, 誤検知, Claude Code, 資格対策

## アップロードするファイル

- 動画: `out/ep06-prompt-design/ep06-prompt-design.mp4`
- サムネイル: `out/ep06-prompt-design/thumbnail.png`
- 字幕: `out/ep06-prompt-design/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。few-shot の目安「3〜5個」や Code review harnesses の助言が変わっていないかも見る）
- [ ] 試験ガイドの入手先（公式の URL）を概要欄の「参考」に足した
- [ ] 資格の正式名称「Claude Certified Architect – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「重大度」（じゅうだいど）。音声エンジンが「ジュウタイド」と読んだので、この回の辞書でひらがなを指定している。「明示的な基準」と「few-shot の例」の章
- 「null」（ヌル）。「空欄や null」の続きの間。「few-shot の例」の章の抽出の場面
- 「few-shot」（フューショット）、「ハルシネーション」、「レビューインスタンス」、「コンテキストウィンドウ」
- 「タスク4.1、4.2、4.6」（ヨンテンイチ など）。オープニング
- かぎ括弧で囲んだ指示の例（「保守的に判断して」「確信度の高いものだけ」）の前後の間。「明示的な基準」の章
- ミニクイズの「正解は B」（ビー）と「A のような」（エー）

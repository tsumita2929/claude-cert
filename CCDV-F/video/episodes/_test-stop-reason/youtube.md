# 公開用の文面：ep02-stop-reason

## 題名（案）

1. 【CCDV-F】stop_reason の読み方｜content の前に確認する（第2回）
   — 検索重視。資格の略称とテーマを前に置き、結論を後ろに添えた
2. 【CCDV-F 第2回】stop_reason の読み方｜max_tokens は途中で切れている
   — 内容の具体性重視。クイズでも問う、いちばん間違えやすい点を出した
3. Claude API の stop_reason 入門｜止まった理由の読み方【CCDV-F 第2回】
   — 資格名を知らずに「Claude API stop_reason」で探す人向け

※ 資格の正式名称は、この回の素材からは確認できなかったので入れていない。正式名でも検索されるので、入れるならユーザーが決める。

## 概要欄

```
Claude の Messages API が返す stop_reason の読み方を、約2分で整理します。
content を読む前に確認する理由と、end_turn・max_tokens・stop_sequence・tool_use・pause_turn・refusal の意味がわかります。

▼ 目次
0:00 オープニング
0:13 stop_reason とは
0:29 止まり方の種類
1:02 pause_turn と refusal
1:34 ミニクイズ
2:04 まとめ

▼ この動画について
・非公式の学習用教材です。試験の主催者が作成・公認したものではありません。受験前に、公式の試験ガイドを確認してください。
・内容は 2026年11月時点の公式ドキュメントに基づいています。API の仕様は変わることがあります。
・公式ドキュメントには、この動画で扱った6つのほかに model_context_window_exceeded という値も載っています。
・動画内のクイズは自作の問題です。実際の試験問題ではありません。

▼ 参考（公式）
・Handling stop reasons（Claude Platform ドキュメント）
  https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCDV-F, Claude, Claude API, Anthropic, Messages API, stop_reason, max_tokens, tool_use, pause_turn, refusal, 資格試験, 試験対策

## アップロードするファイル

- 動画: out/ep02-stop-reason/ep02-stop-reason.mp4（2分22秒）
- サムネイル: out/ep02-stop-reason/thumbnail.png
- 字幕: out/ep02-stop-reason/captions.srt（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
  - [ ] 1:27 ごろ「HTTP 200」— 初めは「ニイゼロゼロ」と読まれたので、`read` で「二百」に直した。聞いて確かめる
  - [ ] 英字の用語のアクセント: エンドターン、マックストークンズ、ストップシーケンス、ツールユース、ポーズターン、リフューザル、コンテント
- [ ] 事実確認の記録（episodes/ep02-stop-reason/factcheck.md）に、未確認の項目が残っていない
- [ ] 公開日の時点で、公式ページの `stop_reason` の値の一覧と `pause_turn` の定義が変わっていない
- [ ] まとめの次回予告「ストリーミング」が、第3回の題材と合っている（素材の並び順からの推定で入れた）
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] 声の利用規約（コハクは Aivis Common Model License 1.0）と Remotion のライセンス（https://remotion.dev/docs/license）を、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

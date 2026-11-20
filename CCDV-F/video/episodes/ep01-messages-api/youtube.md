# 公開用の文面：第1回 Messages API の基本

## 題名（案）

1. 【CCDV-F】Messages API の基本｜必須パラメータ・stop_reason・ストリーミング（第1回）
   - 検索重視。資格名と、動画で扱う用語をすべて入れた形。
2. 【CCDV-F 対策】Messages API の基本を6分で整理｜第1回
   - 短さを前に出した形。用語を知らない人にも入りやすい。
3. Claude API 入門｜リクエストの形とレスポンスの読み方【CCDV-F 第1回】
   - 資格を受けない人にも届く形。検索の間口が広い。

## 概要欄

```
Claude の Messages API の基本を、6分で整理します。必須パラメータ、system の渡し方、会話の続け方、レスポンスの読み方、stop_reason、ストリーミングまで。CCDV-F（Claude Certified Developer – Foundations）の学習用です。

▼ 目次
0:00 オープニング
0:19 リクエストの形
1:02 会話の続け方
1:30 レスポンスの読み方
2:15 stop_reason
3:46 ストリーミング
5:12 ミニクイズ
5:34 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式ドキュメントに基づいています。仕様は変わることがあります。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・stop_reason には、動画で取り上げた6つのほかに、コンテキストウィンドウの上限で止まった場合の model_context_window_exceeded があります。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式ドキュメント）
・Create a Message: https://platform.claude.com/docs/en/api/messages/create
・Handling stop reasons: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons
・Streaming: https://platform.claude.com/docs/en/build-with-claude/streaming

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCDV-F, Claude Certified Developer, Claude API, Messages API, Anthropic, stop_reason, max_tokens, ストリーミング, 資格対策, 生成AI

## アップロードするファイル

- 動画: `out/ep01-messages-api/ep01-messages-api.mp4`
- サムネイル: `out/ep01-messages-api/thumbnail.png`
- 字幕: `out/ep01-messages-api/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL 3つが開けることと、動画の内容と食い違いがないことを確かめた
- [ ] 資格の正式名称「Claude Certified Developer – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 0:00 「CCDV-F」（シーシーディーブイエフ）
- 2:15〜3:25 `stop_reason` の値（エンドターン、マックストークンズ、ストップシーケンス、ツールユース、ポーズターン、リフューザル）
- 3:52 「Server-Sent Events、略して SSE」（サーバーセントイベント、エスエスイー）
- 5:25 「正解は C」（シー）

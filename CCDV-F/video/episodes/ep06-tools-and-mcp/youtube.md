# 公開用の文面：第6回 ツールと MCP

## 題名（案）

1. 【CCDV-F】ツールと MCP｜定義・tool_result の返し方・tool_choice・MCP の基本（第6回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCDV-F 対策】ツールの結果、正しく返せますか？｜ツールと MCP（第6回）
   - 問いかけで興味を引く形。ミニクイズの内容と対応している。
3. Claude API のツール使用と MCP を6分で整理｜tool_choice の注意点も【CCDV-F 第6回】
   - 資格を受けない開発者にも届く形。新しいモデルでの変更点を前に出した。

## 概要欄

```
Claude にツールを使わせる仕組みと、MCP（Model Context Protocol）の基本を整理します。ツールの定義、tool_result の返し方、tool_choice と新しいモデルでの注意点、クライアントツールとサーバーツール、MCP の3つのプリミティブと通信方式まで。CCDV-F（Claude Certified Developer – Foundations）の学習用です。

▼ 目次
0:00 オープニング
0:18 ツールの定義
1:07 結果の返し方
2:16 使わせ方と種類
3:56 MCP
5:39 ミニクイズ
6:10 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は 2026年11月時点の公式ドキュメントに基づいています。仕様は変わることがあります。
・「説明文の書き方」「ツールの結果を必要な項目に絞る」「エラーの内容の書き方」は、API の仕様ではなく、公式ドキュメントのガイドにある設計上の助言です。
・tool_choice の any と tool がエラーになるモデルは、2026年11月時点で Claude Fable 5.2、Claude Mythos 5.2、Claude Opus 5.5、Claude Sonnet 5.5、Claude Fable 5.1、Claude Mythos 5.1 です。最新の一覧は公式ドキュメントで確認してください。
・MCP コネクタはベータの機能です。MCP の仕様は、版 2026-07-28 を参照しました。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式ドキュメント）
・Tool use with Claude: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
・Define tools: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
・Handle tool calls: https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls
・Parallel tool use: https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use
・Tool search tool: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool
・MCP connector: https://platform.claude.com/docs/en/agents-and-tools/mcp-connector
・Model Context Protocol（公式サイト）: https://modelcontextprotocol.io/
・MCP Architecture overview: https://modelcontextprotocol.io/docs/learn/architecture

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCDV-F, Claude Certified Developer, Claude API, Anthropic, ツール使用, tool use, tool_choice, MCP, Model Context Protocol, 資格対策

## アップロードするファイル

- 動画: `out/ep06-tools-and-mcp/ep06-tools-and-mcp.mp4`
- サムネイル: `out/ep06-tools-and-mcp/thumbnail.png`
- 字幕: `out/ep06-tools-and-mcp/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL 8つが開けることと、動画の内容と食い違いがないことを確かめた（特に、tool_choice の強制指定がエラーになるモデルの一覧と、MCP の仕様の版）
- [ ] 資格の正式名称「Claude Certified Developer – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 0:05 「MCP」（エムシーピー）。全編で何度も出る
- 0:34 `input_schema`（インプットスキーマ）
- 1:23 `tool_result`（ツールリザルト）
- 2:00 `is_error: true`（イズエラー・トゥルー）
- 2:22〜2:41 `tool_choice` の値（オート、エニー、ツール、ノン）。`none` は元の教材に合わせて「ノン」と読ませている。「ナン」のほうがよければ、台本の `lexicon` を直す
- 3:01 `strict: true`（ストリクト・トゥルー）
- 3:21 「bash」（バッシュ）
- 3:57 「Model Context Protocol」（モデルコンテキストプロトコル）
- 4:52〜5:03 「stdio」（エスティーディーアイオー。元の教材に合わせた読み）と「Streamable HTTP」（ストリーマブルエイチティーティーピー）
- 5:56 「正解は C」（シー）

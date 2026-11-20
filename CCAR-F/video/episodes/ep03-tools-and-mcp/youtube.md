# 公開用の文面：第3回 ツール設計と MCP 統合

## 題名（案）

1. 【CCAR-F】ツール設計と MCP 統合｜説明・エラー・tool_choice（第3回）
   - 検索重視。資格名と、試験ガイドの分野名、よく検索される用語を入れた形。
2. 【CCAR-F 対策】ツール選択は「説明」が決め手｜MCP のエラーと設定（第3回）
   - サムネイルの言葉と合わせ、何が得られるかを前に出した形。
3. Claude のツールと MCP を設計する前に｜説明・エラー・.mcp.json【CCAR-F 第3回】
   - 資格を受けない開発者にも届く形。

## 概要欄

```
Claude にツールを正しく選ばせる設計を整理します。ツールの説明の書き方、MCP ツールのエラーの返し方、ツールの配り方と tool_choice、MCP サーバーの設定（.mcp.json と ~/.claude.json）、Claude Code の組み込みツールの選び方まで。CCAR-F（Claude Certified Architect – Foundations）の分野2「ツール設計と MCP 統合」の学習用です。

▼ 目次
0:00 オープニング
0:18 ツールの説明
1:27 エラーの返し方
2:25 ツールの配り方
3:36 MCP の設定
4:39 組み込みツール
5:43 ミニクイズ
6:21 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は、CCAR-F 試験ガイド v1.0 と、2026年11月時点の公式ドキュメントに基づいています。仕様は変わることがあります。
・試験ガイドは、2026年3月時点の製品を前提にしています。その後に変わった点（新しいモデルの一部で tool_choice の強制指定がエラーになること、Claude Code の MCP ツール検索、macOS などで Grep と Glob が既定のツールから外れたこと）は、ガイドの立場を主にして、現行の違いを一言添えています。
・errorCategory と isRetryable は、MCP の仕様が定める項目ではなく、自分で決める項目名の例です。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Define tools（Claude API ドキュメント）: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
・Writing effective tools for agents（Anthropic Engineering）: https://www.anthropic.com/engineering/writing-tools-for-agents
・MCP 仕様 Tools: https://modelcontextprotocol.io/specification/latest/server/tools
・MCP 仕様 Resources: https://modelcontextprotocol.io/specification/2025-06-18/server/resources
・Claude Code の MCP: https://code.claude.com/docs/en/mcp
・Claude Code のツール一覧: https://code.claude.com/docs/en/tools-reference
・Agent SDK のサブエージェント: https://code.claude.com/docs/en/agent-sdk/subagents

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-F, CCA-F, Claude Certified Architect, Claude, Anthropic, MCP, Model Context Protocol, ツール設計, tool_choice, Claude Code, 資格対策

## アップロードするファイル

- 動画: `out/ep03-tools-and-mcp/ep03-tools-and-mcp.mp4`
- サムネイル: `out/ep03-tools-and-mcp/thumbnail.png`
- 字幕: `out/ep03-tools-and-mcp/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。tool_choice の強制指定、ツール検索、Grep と Glob の扱いが、公開時点でも同じかを見る）
- [ ] 資格の正式名称「Claude Certified Architect – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「空の結果」（からのけっか）。エンジンが「そら」「くう」と読んだので、読みを「から」に指定している。「エラーの返し方」の章の終わりと、ミニクイズの問題文
- 「~/.claude.json」（ドットクロードドットジェイソン）と「.mcp.json」（ドット、エムシーピージェイソン）。「MCP の設定」の章とまとめ
- 「配点は18%」（ジュウ、ハチパーセント。数字の途中で区切りが入る）。オープニング
- 「macOS」（マック、オーエス）。「組み込みツール」の章の最後
- 「`strict: true`」（ストリクト、トゥルー）、「`tool_choice`」「`auto`」「`any`」。「ツールの配り方」の章
- 「Operation failed」（オペレーションフェイルド）、「isError」（イズエラー）、「verify_fact」「fetch_url」「load_document」。「エラーの返し方」「ツールの配り方」の章
- 「Grep」「Glob」「Bash」「Read」「Write」「Edit」（グレップ、グロブ、バッシュ、リード、ライト、エディット）
- 「Jira」（ジラ）
- ミニクイズの「正解は B」（ビー）と「A は…、C は…」（エー、シイ）
- 素材の「LLM」は、音声エンジンが語の途中で区切るため、声でも画面でも「モデル」と言い換えている
- 題名「ツール設計と MCP 統合」は、冒頭の画面で「ツール設計と MCP ／ 統合」と2行に折れる（題名は章立てで決まっているので変えていない）

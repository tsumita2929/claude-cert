# 公開用の文面：第3回 統合の設計と認証・認可

## 題名（案）

1. 【CCAR-P】統合の設計と認証・認可｜最小権限・MCP の認可・段階的ディスカバリー（第3回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-P 対策】要らない機能は外す｜統合の設計と認証・認可（第3回）
   - サムネイルの言葉と合わせた形。結論を先に見せる。
3. MCP・API/CLI・エージェント間をどう選ぶ？｜統合の設計と認証・認可【CCAR-P 第3回】
   - 試験を受けないアーキテクトや開発者にも届く形。

## 概要欄

```
Claude を使ったシステムの「統合」の前半を整理します。機能の肥大化と最小権限、認証と認可（MCP の認可、STDIO のサーバー、トークンの受け渡しの禁止、スコープ、SSO、短期の資格情報）、統合の手段の選び方（MCP、API/CLI、エージェント間、提供ルート）、段階的ディスカバリーと一括型の使い分けまで。CCAR-P（Claude Certified Architect – Professional）の学習用です。

▼ 目次
0:00 オープニング
0:27 機能の肥大化
1:32 認証と認可
2:54 統合の手段
4:23 段階的ディスカバリー
5:40 ミニクイズ
6:17 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・試験の範囲と配点は、現行の試験ガイド（バージョン1.0）に基づいています。試験内容は 2026年12月7日に更新される予定です（更新版の試験ガイドは 2026年11月17日に公開予定）。12月7日以降に受験する方は、新しい試験ガイドとの違いを確認してください。
・内容は 2026年11月時点の公式ドキュメントと公式記事に基づいています。仕様は変わることがあります。ツールの数の目安（30〜50個）は、2026年11月時点のドキュメントの記述です。
・MCP の認可の説明は、MCP の仕様 2025-11-25 版に基づいています。
・「SSO でつなぐ」「提供ルートをレイテンシ、コンプライアンス、コストで比べる」は、公式の対策講座の学習目標に基づく設計の勧めです。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・MCP 仕様 Authorization（2025-11-25）: https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization
・MCP 仕様 Security Best Practices（2025-11-25）: https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices
・What is the Model Context Protocol?: https://modelcontextprotocol.io/docs/getting-started/intro
・Tool search tool: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool
・Agent Skills overview: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
・Authentication（Claude Platform）: https://platform.claude.com/docs/en/manage-claude/authentication
・Claude Code best practices: https://code.claude.com/docs/en/best-practices
・Writing effective tools for agents（Anthropic Engineering）: https://www.anthropic.com/engineering/writing-tools-for-agents
・Effective context engineering for AI agents（Anthropic Engineering）: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
・How we built our multi-agent research system（Anthropic Engineering）: https://www.anthropic.com/engineering/multi-agent-research-system

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-P, Claude Certified Architect, Claude, Anthropic, MCP, Model Context Protocol, 認証と認可, 最小権限, OAuth, Agent Skills, 段階的ディスカバリー, 資格対策

## アップロードするファイル

- 動画: `out/ep03-integration/ep03-integration.mp4`
- サムネイル: `out/ep03-integration/thumbnail.png`
- 字幕: `out/ep03-integration/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 公開日が 2026年12月7日以降なら、更新版の試験ガイドで、分野3の範囲と配点（動画では「現行の試験ガイド、バージョン1.0 では 19%」）が変わっていないかを確かめた。変わっていれば、概要欄に一言添える
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。MCP の仕様に新しい版が出ていないかも見る）
- [ ] 資格の正式名称「Claude Certified Architect – Professional」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「最小権限の原則」（げんそく）。音声エンジンが「ケンソク」と読んだので、ひらがなで指定している。「機能の肥大化」の章
- 「ツールが多すぎると」。「おお／すぎると」と途中で区切れている。同じ章
- 「実行の前に挟む確認」。教材の「実行の前に確認を挟む」を、音声エンジンが「実行前」を「じっこうまえ」と読むのを避けるため言い換えた
- 「OAuth 2.1」（オーオース ニーテンイチ）、「STDIO」（スタンダード アイオー）。「認証と認可」の章
- 「SSO」（エスエスオー）、「API キー」
- 「並べて進める」（ならべて）。音声エンジンが「なべて」と読んだので、ひらがなで指定している。「統合の手段」の章
- 「約15倍」（やくじゅうごばい）、「19%」（じゅうきゅうパーセント）。数字の途中で区切れないよう、ひらがなで指定している
- 「判断を鈍らせます」（にぶらせ）。音声エンジンが「なまらせ」と読んだので、ひらがなで指定している。「段階的ディスカバリー」の章
- 「SKILL.md」（スキル エムディー）、「defer_loading」（ディファーローディング）、「Skills」（スキルズ）
- ミニクイズの「正解は B」（ビー）
- オープニングの「分野3「統合」の前半」は、かぎかっこの所で不自然に区切れたため、声では「分野3、統合の前半」と読ませている

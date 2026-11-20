# 公開用の文面：第6回 設定とナレッジ管理

## 題名（案）

1. 【CCAO-F】設定とナレッジ管理｜プロジェクトの指示・ナレッジ・コネクタ（第6回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAO-F 対策】良い設定は毎回役に立つ｜古い資料はチャットで直さない（第6回）
   - サムネイルの言葉と、ミニクイズの内容（元の設定を直す）に寄せた形。
3. Claude のプロジェクト、設定の基本｜指示とナレッジの使い分けと見直し方【CCAO-F 第6回】
   - 資格を受けない、Claude を仕事で使う人にも届く形。

## 概要欄

```
Claude のプロジェクトを、指示とナレッジで設定する方法を整理します。指示の書き方と置き場所、ナレッジに入れる資料とファイル名、コネクタをつなぐときの判断、そして設定を最新に保つ見直し方まで。CCAO-F（Claude Certified Associate – Foundations）の分野5「設定とナレッジ管理」の学習用です。

▼ 目次
0:00 オープニング
0:48 プロジェクト
1:37 指示の書き方
2:44 ナレッジ
3:41 コネクタ
4:46 見直し
5:42 ミニクイズ
6:27 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は、公式の試験ガイド バージョン1.0 と、2026年11月時点の公式ヘルプセンター・公式講座に基づいています。この試験は 2026年12月7日に試験内容の更新が予定されています（更新版の試験ガイドは 2026年11月17日に公開予定）。12月7日以降に受験する方は、新しい試験ガイドで範囲と配点を確認してください。
・「良いプロンプトは一度だけ役に立つ。良い設定は毎回役に立つ」は、公式の対策講座の紹介文の言葉です（試験ガイドの文言ではありません）。
・試験ガイドの「システムレベルの指示」は、動画ではプロジェクトの指示として説明しています。現在のヘルプセンターでは「プロジェクトの指示（project instructions）」と呼ばれています。
・製品の機能や画面は変わることがあります。最新の仕様は公式のヘルプセンターで確認してください。
・動画内の例とクイズは自作で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・What are projects?（Claude ヘルプセンター）: https://support.claude.com/en/articles/9517075-what-are-projects
・How can I create and manage projects?（Claude ヘルプセンター）: https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects
・Understanding Claude's personalization features（Claude ヘルプセンター）: https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features
・Retrieval augmented generation (RAG) for projects（Claude ヘルプセンター）: https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects
・Use connectors to extend Claude's capabilities（Claude ヘルプセンター）: https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities
・Use Google Workspace connectors（Claude ヘルプセンター）: https://support.claude.com/en/articles/10166901-use-google-workspace-connectors
・Claude 101「Introduction to projects」（Anthropic Academy）: https://academy.claude.com/courses/claude-101/introduction-to-projects

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAO-F, Claude Certified Associate, Claude, Anthropic, Claude プロジェクト, プロジェクトの指示, ナレッジ管理, コネクタ, 生成AI 業務活用, 資格対策

## アップロードするファイル

- 動画: `out/ep06-configuration/ep06-configuration.mp4`
- サムネイル: `out/ep06-configuration/thumbnail.png`
- 字幕: `out/ep06-configuration/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 2026年11月17日に公開予定の更新版の試験ガイドを確かめ、分野5の範囲や名前が変わっていないかを見た（12月7日以降に公開する場合は特に。配点 12% はバージョン1.0 の数字としてナレーションで言っている）
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する。コネクタやプロジェクトの仕様は変わりやすい）
- [ ] 資格の正式名称「Claude Certified Associate – Foundations」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「Google Drive」「Gmail」「Google ドキュメント」（グーグルドライブ、ジーメール）。この回の台本の辞書で読みを指定した。「コネクタ」の章
- 「現行の試験ガイド、バージョン1.0 では、配点は12%です」。「12%」が「ジュウ／ニパーセント」と区切れたので、この行は読みを「じゅうにパーセント」に指定した。オープニング
- 「最後に、次の打ち合わせの提案を入れます」。「次の」が「じの」と読まれたので、読みを「つぎの」に指定した。「指示の書き方」の章
- まとめの「置き場所を選ぶ」。「おき／ばしょ」と区切れたので、読みを「おきばしょ」に指定した
- 「一度きり」（イチド／キリ）。区切りがわずかに入る。「指示の書き方」「見直し」の章とクイズ
- 「2026年度ブランド指針」（ニセンニジュウロクネンド）。「ナレッジ」の章
- ミニクイズの「正解は B」（ビー）と、「A は…、C は…」（エー、シー）

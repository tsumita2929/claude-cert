# 公開用の文面：第4回 RAG と運用の見える化

## 題名（案）

1. 【CCAR-P】RAG と運用の見える化｜チャンク・検索・モニタリング（第4回）
   - 検索重視。資格名と、動画で扱う用語を入れた形。
2. 【CCAR-P 対策】RAG が誤答したら、まず検索を疑う｜運用の見える化（第4回）
   - サムネイルと公式サンプル問題の論点に合わせ、内容の具体性を前に出した形。
3. RAG の検索と運用の見える化｜精度とレイテンシの決め方【CCAR-P 第4回】
   - 資格を受けない設計者にも届く形。

## 概要欄

```
RAG の設計（チャンクとインデックス）、データと質問に合った検索戦略、精度とレイテンシのトレードオフ、大規模な運用でのオブザーバビリティとモニタリングを整理します。CCAR-P（Claude Certified Architect – Professional）の分野3「統合」の後半です。

▼ 目次
0:00 オープニング
0:31 精度とレイテンシ
1:31 チャンクとインデックス
3:37 検索戦略
4:30 運用の見える化
5:55 ミニクイズ
6:29 まとめ

▼ この動画について
・非公式の学習用教材です。Anthropic が作成または公認したものではありません。
・内容は、公式の試験ガイド バージョン1.0 と、2026年11月時点の公式ドキュメント・公式記事に基づいています。試験内容は 2026年12月7日に更新される予定です（更新版の試験ガイドは 2026年11月17日に公開予定）。12月7日以降に受験する方は、新しい試験ガイドで差分を確認してください。
・配点（分野3は19%）は、試験ガイド バージョン1.0 の値です。
・検索の失敗率（およそ3分の1）と、知識ベースの目安（20万トークン未満）は、Anthropic の記事「Contextual Retrieval」の評価の時点の値です。
・「刻々と変わる値を検索に担わせない」は、試験ガイドではなく、公式の対策講座（Prep Course）の学習目標にある観点です。
・「記録する項目の例」は、本講座が示す設計例で、公式に定められた一覧ではありません。
・動画内のクイズは自作の問題で、実際の試験問題ではありません。
・受験の前に、公式の試験ガイドで最新の情報を確認してください。

▼ 参考（公式）
・Reduce latency: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency
・Effort: https://platform.claude.com/docs/en/build-with-claude/effort
・Prompt caching: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
・Introducing Contextual Retrieval（Anthropic）: https://www.anthropic.com/engineering/contextual-retrieval
・Embeddings: https://platform.claude.com/docs/en/build-with-claude/embeddings
・How we built our multi-agent research system（Anthropic）: https://www.anthropic.com/engineering/multi-agent-research-system
・Handling stop reasons: https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons
・Errors（request-id）: https://platform.claude.com/docs/en/api/errors
・Building effective agents（Anthropic）: https://www.anthropic.com/research/building-effective-agents

▼ クレジット
・音声: AivisSpeech（コハク）
・書体: Zen Kaku Gothic New / IBM Plex Sans JP / IBM Plex Mono（SIL Open Font License）
```

## タグ

CCAR-P, Claude Certified Architect, Claude, Anthropic, RAG, Contextual Retrieval, ハイブリッド検索, リランカー, オブザーバビリティ, モニタリング, レイテンシ, 資格対策

## アップロードするファイル

- 動画: `out/ep04-rag-and-observability/ep04-rag-and-observability.mp4`
- サムネイル: `out/ep04-rag-and-observability/thumbnail.png`
- 字幕: `out/ep04-rag-and-observability/captions.srt`（言語は日本語）

## 公開前の確認

- [ ] 動画を最初から最後まで、音を出して見た（誤読、アクセント、間）
- [ ] 2026年11月17日公開の新しい試験ガイドと、12月7日の試験内容の更新で、この回の範囲（分野3のタスク）や配点が変わっていないかを確かめた。変わっていれば、概要欄の注記を直す
- [ ] 参考の URL が開けることと、動画の内容と食い違いがないことを確かめた（factcheck.md の引用と照合する）
- [ ] 資格の正式名称「Claude Certified Architect – Professional」が公式の表記と合っている
- [ ] 概要欄に、断り書き・情報の時点・クレジットが入っている
- [ ] AivisSpeech の声（コハク）の利用規約と、Remotion のライセンスを、公開日の時点で確認した
- [ ] 字幕ファイル（captions.srt）をアップロードした
- [ ] YouTube の「改変または合成されたコンテンツ」の申告が必要かを、現在の案内で確認した

## 聞いて確かめてほしい箇所

読みはカタカナの表で確認済みだが、アクセントと間は聞かないとわからない。

- 「BM25」（ビーエムニジュウゴ）。音声エンジンが「ビー／エムニジュウゴ」と区切る。「チャンクとインデックス」の章、2:31 ごろ
- 「Contextual Retrieval」（コンテクスチュアルリトリーバル）。同じ章、1:31 ごろ
- 「LLM のシステム」は、声では「大規模言語モデルのシステム」と読ませている（「エルエル／エム」と語の途中で区切れるため）。字幕は「LLM」のまま。「運用の見える化」の章
- 「19%」は「じゅうきゅうパーセント」と読ませている（そのままだと「ジュウ／キュウ」と区切れる）。オープニング
- 「その分」は「そのぶん」と読ませている（「そのわけ」と誤読されたため）。「検索戦略」の章
- 「評価・テスト・最適化」の「最適化」（さいてきか）。音声エンジンが別の語に読み替えたので、この回の辞書でひらがなを指定。まとめ
- 「request-id」（リクエストアイディー）、「usage」（ユーセージ）、「stop_reason」（ストップリーズン）、「effort」（エフォート）、「RAG」（ラグ）、「オブザーバビリティ」「リランカー」
- ミニクイズの「正解は B」（ビー）

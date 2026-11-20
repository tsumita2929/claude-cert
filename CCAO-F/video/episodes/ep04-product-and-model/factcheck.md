# 事実確認：ep04-product-and-model（製品とモデルの選び方）

確認日: 2026-11-16

素材は `CCAO-F/course/ch04.md`（2026-11-16 に、公式の試験ガイドと公式ドキュメントで事実確認済み）。
下の表は、台本に入れた主張について、素材の「事実確認」の表から該当する行を引いたもの（# は素材の表の番号）。
台本に、素材にない事実は足していない。

試験の配点は、現行の試験ガイド バージョン1.0（2026年7月発効）に基づく。2026年12月7日に試験内容の更新が予定されている
（更新版の試験ガイドは 2026年11月17日に公開予定）。台本では、配点を言うときに「現行の試験ガイド、バージョン1.0 では」と添え、
サムネイルと場面の見出しには配点の数字や問題数を入れていない。

## 台本の主張と根拠

| # | 台本の主張（場面） | 判定 | 根拠 | 確認日 |
|---|---|---|---|---|
| 1 | 範囲は分野3の製品とモデルの選択。現行の試験ガイド バージョン1.0 では配点は12%（open）。機能の選択、モデルの区別、要件に合わせた選択、コンテキストとメモリの管理を扱う | 正しい | 試験ガイド v1.0 §6 分野3（日本語版「Claudeの適切な製品機能（プロジェクト、リサーチ、チャット、アーティファクト）を選択する」ほか3項目）／ reference/outline.md | 2026-11-16 |
| 1 | 試験ガイドが挙げる機能は、チャット、プロジェクト、リサーチ、アーティファクトの4つ（features） | 正しい | 同上 | 2026-11-16 |
| 2 | プロジェクトに置いた資料と指示は、そのプロジェクトの中のすべてのチャットで使われる（combine） | 正しい | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects「Anything you upload to this space will be used across all of your chats within that project.」「Claude will use these instructions for all the chats within the project.」 | 2026-11-16 |
| 3 | プロジェクトの中のチャットどうしは内容を共有しない。共有したい情報はナレッジに入れる（manage） | 正しい | 同上「Context is not shared across chats within a project unless the information is added into the project knowledge base.」 | 2026-11-16 |
| 4 | リサーチは検索を重ねて深く調べる。利用の上限を早く使う（features） | 正しい | https://support.claude.com/en/articles/11088861-using-research-on-claude「It runs multiple searches that build on each other and decides what to look into next based on what it finds.」「research sessions can use up your limits faster」 | 2026-11-16 |
| 5 | アーティファクトは会話の横に独立した成果物として表示され、手直しして使い回すものに向く（features） | 正しい | https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them「An artifact opens in its own window beside your conversation.」「likely to want to edit, iterate on, or reuse outside the conversation」 | 2026-11-16 |
| 6 | 4つの機能は組み合わせて使える。プロジェクトの中のチャットで、報告書の下書きをアーティファクトとして作れる（combine） | 正しい（推論を含む） | プロジェクトの中で会話を始められること（#2 の記事）と、アーティファクトは会話の中で作られること（#5 の記事）から。ヘルプセンターのプロジェクトの例（研究のプロジェクトで、論文の要約をアーティファクトにする）にも同じ使い方がある（素材の記録では、検索結果の抜粋で確認。ページ本体は 2026-11-16 時点で 404） | 2026-11-16 |
| 7 | Haiku は最も速く費用が小さく、分類や抜き出しなどの単純で大量の処理に向く。Sonnet は速さと賢さのつり合いがよい。Opus は3つの中で最も能力が高く、費用は大きく、応答にも時間がかかる（models） | 正しい | https://platform.claude.com/docs/en/about-claude/models/overview（Haiku「For high-volume, latency-sensitive tasks such as classification, extraction, and routing」、Latency「Fastest」／ Sonnet「The best combination of speed and intelligence」、「Fast」／ Opus「For long-running agentic coding and knowledge work」、「Moderate」。価格は Haiku < Sonnet < Opus）／ https://platform.claude.com/docs/en/about-claude/models/choosing-a-model の選び方の表 | 2026-11-16 |
| 8 | 2026年11月時点では Opus の上に Fable がある。試験ガイドが挙げるのは3種類（models） | 正しい | models/overview（Fable「For demanding reasoning and long-horizon agentic work」、最も高価）／ choosing-a-model「Claude Fable 5.2 … Anthropic's most capable model open to all customers」／ 試験ガイド 分野3 | 2026-11-16 |
| 9 | 単純で大量の作業には速く安いモデル。いつも最上位のモデルを使うのは費用と待ち時間の無駄。機能を全部止める、別の AI に乗り換えるは、つり合いの問題に答えていない（choose・traps） | 正しい | 試験ガイド §8 サンプル2の解説（要旨。問題文は写していない）／ choosing-a-model の Option 1「High-volume, straightforward tasks」 | 2026-11-16 |
| 10 | 迷ったら、同じ依頼を2つのモデルで試して比べる（traps） | 正しい | https://academy.claude.com/tutorials/choosing-the-right-claude-model（同じプロンプトとファイルで Opus と Sonnet を試し、使える結果までの往復の回数を比べる）／ choosing-a-model「Test with your actual prompts and data」 | 2026-11-16 |
| 11 | 2026年11月時点のアプリには、考える深さを変える effort の設定があり、公式の案内はモデルを替える前にまずこの設定を調整するよう勧めている（traps） | 正しい | https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings「The effort level controls how much thinking Claude applies to a response.」／ academy の同上の記事（effort から先に、1つずつ変える。利用を抑えるならまず effort を下げる）／ choosing-a-model「Tuning effort is often a better lever than switching models.」 | 2026-11-16 |
| 12 | コンテキストは Claude が1つのチャットで扱える情報で、その量にはモデルごとの上限がある（context） | 正しい | https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work「Length limits relate to Claude's context window—the amount of information Claude can work with in a single chat.」（最大量はモデルによる） | 2026-11-16 |
| 13 | 会話が長くなるほど、前のほうの情報を正確に思い出しにくくなる（context） | 正しい | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents「as the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases」 | 2026-11-16 |
| 14 | 話題が変わったら新しいチャットでやり直す。続きは要約を確かめて新しいチャットへ。繰り返し使う前提は会話の外（プロジェクトのナレッジ）に保持する（manage・quiz） | 正しい | 試験ガイド 分野3「やり直す、要約する、保持するタイミング」／ usage-and-length-limits の記事「Try starting a new conversation if you're approaching your usage limit in a longer chat.」／ #3 の記事 | 2026-11-16 |
| 15 | 2026年11月時点のアプリには、設定によって前の部分を自動で要約する仕組みがある（manage） | 正しい | usage-and-length-limits の記事（code execution が有効なとき「Claude summarizes earlier messages to continue the conversation seamlessly.」） | 2026-11-16 |
| 16 | メモリはチャットをまたいで仕事の背景などを覚える。プロジェクトごとに別のメモリを持つ。覚えた内容は利用者が見て、直して、消せる（memory） | 正しい | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context「Claude remembers the everyday context that helps it work with you」「Each project has its own memory.」「select "Delete" to remove it」「You maintain control over Claude's ability to search past chats and use memory.」 | 2026-11-16 |
| 17 | メモリは Claude が会話の中から覚えるもので、チームの全員が守るべき決まりは、プロジェクトの指示やナレッジに書いて置く（memory・wrap） | 判断（教材の勧め） | メモリが会話から作られることは #16 の記事。指示とナレッジがプロジェクトの全チャットに使われることは #2 の記事。「指示やナレッジに書く」は両者からの判断で、試験の分野5の考え方（設定は毎回役に立つ）とも一致 | 2026-11-16 |

## 試験ガイドと現行ドキュメントの食い違い（素材と同じ立場で扱った）

- **モデルの種類**: ガイド v1.0 は Haiku、Sonnet、Opus の3種類。2026年11月時点の製品には Opus の上に Fable もある。台本はガイドの3種類を主にし、Fable は一言だけ添えた（場面の補足の1行と、ナレーションの1文）。
- **モデルの選び方の勧め**: ガイド（サンプル2）は、タスクに合わせた使い分け（単純で大量なら速く安いモデル）。2026年11月時点のアプリの案内（academy の記事）は「多くの知識労働はまず Opus から始め、モデルを替える前に effort を調整する」。台本はガイドの使い分けを主にし、effort の設定とその勧めを一言添えた。
- **コンテキストの管理**: ガイドは利用者が「やり直す、要約する、保持する」を判断する前提。2026年11月時点のアプリには、設定によって自動で要約する仕組みがある。台本は利用者の判断を主にし、自動の要約を一言添えた。

## 素材から変えた点

- **ミニクイズの選択肢の記号を、1番・2番・3番から A・B・C に変えた。** 画面のマークシートが A〜E の記号を使うため。正解は B（素材の2番）。選択肢は画面に収まるよう短くした。
- **素材の「第6章で扱います」（プロジェクトの設定のやり方）は、長さの都合で省いた。**
- **場面の補足（画面の文字）として、具体例を添えた**: 機能の組み合わせの図で「毎週の報告書を、同じ前提で頼む」、長い会話の図で「最初に、方針や前提を伝える」。どちらも素材の本文の例（毎週の報告書、最初に決めた条件）を言い換えたもので、新しい事実ではない。
- **メモリと指示・ナレッジの対比の右側「何を置くかを、こちらで決める」** は、素材の「何が残るかを、こちらで毎回決めているわけではありません」を裏返した表現（#17 の判断の範囲）。

## 未確認のまま残っている主張

なし（素材の「確認できなかった点」に挙がった、リサーチの所要時間、プロジェクトの中でのリサーチの可否、プランごとの提供状況と上限の数字は、台本に入れていない）。

## 参照した URL

- https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects
- https://support.claude.com/en/articles/11088861-using-research-on-claude
- https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them
- https://platform.claude.com/docs/en/about-claude/models/overview
- https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
- https://academy.claude.com/tutorials/choosing-the-right-claude-model
- https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings
- https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context
- 試験ガイド v1.0（CCAO-F/reference/ の PDF とテキスト）

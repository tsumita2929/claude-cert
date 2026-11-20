// CCAR-F キャッチアップ講座のスライド（pptx）を生成する。
// 使い方: node slides/build_deck.js [出力.pptx]   （省略時は ../CCAR-F_キャッチアップ講座.pptx）
// 共通部品は ../../shared/slides/deck_lib.js。確認用の画像は shared/slides/render.py で作る。
// 内容の「正」は course/ の本文（ch00a・ch00b・ch01〜ch08・ch99）。本文にない事実は足さない。
const path = require("path");
const { createDeck } = require("../../shared/slides/deck_lib.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "CCAR-F_キャッチアップ講座.pptx");
const deck = createDeck({
  code: "CCAR-F",
  title: "CCAR-F キャッチアップ講座",
  subject: "Claude Certified Architect – Foundations 学習用（非公式）",
});
const { pres, C, SH, HEX, W, M, CW, Y0, YB, T, box, bubble, arrow, pill, card, trap, stat, section, slide, contentSlide, check, emWidth } = deck;

// ---------- この講座で使う小さな部品 ----------
// n 列に分けたときの1列の幅
const colW = (n, g = 0.3, w = CW) => (w - (n - 1) * g) / n;
// ×（劣る対応）と ○（よい対応）の横長の枠
function mark(s, { x, y, w, h }, kind, text, { size = 14 } = {}) {
  const bad = kind === "bad";
  box(s, { x, y, w, h, fill: bad ? C.background1 : C.background2, line: bad ? C.accent2 : undefined, lineW: 1.75, name: bad ? "Bad" : "Good" });
  bubble(s, x + 0.25, y + (h - 0.54) / 2, bad ? "×" : "○", { red: bad, size: 16 });
  T(s, text, { x: x + 0.85, y: y + 0.12, w: w - 1.1, h: h - 0.24, size, valign: "middle", name: bad ? "Bad text" : "Good text" });
}
// 横に並ぶ流れ図。items は [見出し, 説明]。hi に入れた番号の箱を強調する
function flow(s, items, { x = M, y, w = CW, h, gap = 0.5, hi = [], titleSize = 15, descSize = 13, titleH = 0.7 }) {
  const bw = (w - (items.length - 1) * gap) / items.length;
  items.forEach(([t, d], i) => {
    const bx = x + i * (bw + gap), on = hi.includes(i);
    box(s, { x: bx, y, w: bw, h, fill: on ? C.accent1 : C.background2, name: "Flow step" });
    const fg = on ? C.background1 : C.text1, cc = on ? C.background1 : C.accent1;
    T(s, t, { x: bx + 0.18, y: y + 0.15, w: bw - 0.36, h: titleH, size: titleSize, bold: true, color: fg, codeColor: cc, name: "Flow title" });
    if (d) T(s, d, { x: bx + 0.18, y: y + 0.2 + titleH, w: bw - 0.36, h: h - titleH - 0.32, size: descSize, color: fg, codeColor: cc, name: "Flow desc" });
    if (i < items.length - 1) arrow(s, bx + bw + 0.06, y + h / 2, bx + bw + gap - 0.06, y + h / 2);
  });
  return bw;
}
// 小さな注記（灰色の12pt）
const note = (s, text, o) => T(s, text, { size: 12, color: C.accent4, name: "Note", ...o });
// 区切りのスライド。meta が1行に収まるかも見積もる
function chapter(num, title, domain, weight, audio, topics) {
  const meta = `${domain} ・ 配点 ${weight}% ・ 音声 ${audio}〜`;
  // 分野の名前が長いので、全章とも 15pt にそろえて1行に収める（マスターの既定は 16pt）
  check("divider meta", [meta], 15, 9.7, 0.45);
  deck.divider(num, title, [{ text: meta, options: { fontSize: 15 } }], topics);
}

// =====================================================================
// 1. 表紙
section("はじめに");
{
  const s = slide("TITLE");
  s.addText("CCAR-F\nキャッチアップ講座", { placeholder: "title" });
  s.addText("Claude Certified Architect – Foundations の出題範囲を、5つの分野・8つの章で復習する", { placeholder: "subtitle" });
  T(s, "非公式の学習用教材 ・ 音声講座（約61分）と同じ章立て", { x: 0.8, y: 5.75, w: 8, h: 0.4, size: 14, color: C.accent5, name: "Title note" });
  // 解答用紙のモチーフ
  const marks = [1, 3, 0, 2, 1];
  marks.forEach((m, r) => {
    const yy = 1.45 + r * 0.9;
    T(s, String(r + 1), { x: 9.2, y: yy, w: 0.4, h: 0.54, size: 14, color: C.accent5, bold: true, align: "right", valign: "middle", name: "Sheet row" });
    ["A", "B", "C", "D"].forEach((l, k) => bubble(s, 9.85 + k * 0.72, yy, k === m ? "" : l, { dark: true, filled: k === m, size: 12 }));
  });
  // 赤ペンの丸
  s.addShape(SH.OVAL, { x: 9.85 + 1 * 0.72 - 0.16, y: 1.45 - 0.14, w: 0.72, h: 0.82, fill: { type: "none" }, line: { color: C.accent2, width: 2.5 }, objectName: "Red pen mark" });
}

// 2. 試験の形式
{
  const s = contentSlide("60問を120分で解き、スケールスコア720以上で合格", "択一式と複数選択式。6つのシナリオのうち、4つが無作為に選ばれて出る");
  const w = colW(4);
  [
    { value: "60", unit: "問", label: "問題数", sub: "択一式と複数選択式。選ぶ数は問題に書いてある" },
    { value: "120", unit: "分", label: "試験時間", sub: "1問あたり2分" },
    { value: "720", unit: "点", label: "合格点", sub: "100〜1,000のスケールスコア。「72%正解」という意味ではない" },
    { value: "5", unit: "分野", label: "出題範囲", sub: "最大は分野1の27%" },
  ].forEach((d, i) => stat(s, { x: M + i * (w + 0.3), y: Y0 + 0.1, w, h: 3.0, ...d }));
  T(s, "公式の試験ガイド バージョン1.0（2026年7月発効）に基づく。受験前に、公式の試験ガイドで最新の内容を確認してください。", { x: M, y: 5.45, w: CW, h: 0.6, size: 12, color: C.accent4, name: "Caveat" });
}

// 3. 配点
{
  const s = contentSlide("分野1・3・4で、全体のおよそ3分の2", "5つの分野の配点（公式の試験ガイド）。27＋20＋20＝67%");
  const labels = ["分野1 エージェントアーキテクチャ", "分野3 Claude Code の設定とワークフロー", "分野4 プロンプトと構造化出力", "分野2 ツール設計と MCP 統合", "分野5 コンテキスト管理と信頼性"];
  const values = [27, 20, 20, 18, 15];
  s.addChart(pres.charts.BAR, [{ name: "配点（%）", labels, values }], {
    x: M, y: Y0, w: 7.6, h: 4.8, barDir: "bar", catAxisOrientation: "maxMin",
    chartColors: [HEX.accent1, HEX.accent1, HEX.accent1, "7FB2AD", "7FB2AD"],
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', dataLabelFontSize: 12, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
    catAxisLabelFontSize: 12, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", catAxisLineShow: false,
    valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 32, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: false, barGapWidthPct: 45,
    showTitle: true, title: "分野別の配点（%）", titleFontSize: 14, titleColor: HEX.accent4, titleFontFace: "+mn-lt",
  });
  const x = 8.55, w = W - M - x;
  card(s, { x, y: Y0, w, h: 1.55, num: 1, title: "最大は分野1の27%", body: "第1章（ループと制御）と第2章（マルチエージェント）の2章で扱う" });
  card(s, { x, y: Y0 + 1.65, w, h: 1.55, num: 2, title: "分野3・4 は各20%", body: "Claude Code は第4・5章、プロンプトと構造化出力は第6・7章" });
  card(s, { x, y: Y0 + 3.3, w, h: 1.55, num: 3, title: "用語より判断の軸", body: "もっともらしいが劣る選択肢も並ぶ。なぜそれを選ぶのかを持つ" });
}

// 4. 6つのシナリオ
{
  const s = contentSlide("6つのシナリオのうち、4つが無作為に出る", "各シナリオが一連の問題の前提になる。業務の場面から、最も適切な対応を選ぶ");
  const w = colW(3), h = 2.25;
  [
    ["S1", "カスタマーサポート解決エージェント", [1, 2, 5]],
    ["S2", "Claude Code によるコード生成", [3, 5]],
    ["S3", "マルチエージェントリサーチシステム", [1, 2, 5]],
    ["S4", "Claude による開発者の生産性向上", [2, 3, 1]],
    ["S5", "継続的インテグレーションのための Claude Code", [3, 4]],
    ["S6", "構造化データ抽出", [4, 5]],
  ].forEach(([id, name, ds], i) => {
    const x = M + (i % 3) * (w + 0.3), y = Y0 + Math.floor(i / 3) * (h + 0.2);
    box(s, { x, y, w, h, fill: C.background2, name: "Scenario" });
    pill(s, id, { x: x + 0.25, y: y + 0.25, w: 0.62, h: 0.34, fill: C.text2 });
    T(s, name, { x: x + 0.25, y: y + 0.72, w: w - 0.5, h: 0.8, size: 18, bold: true, color: C.text1, name: "Scenario name" });
    T(s, "主な分野", { x: x + 0.25, y: y + h - 0.58, w: 0.95, h: 0.32, size: 12, bold: true, color: C.accent4, valign: "middle", name: "Scenario label" });
    ds.forEach((d, k) => pill(s, `分野${d}`, { x: x + 1.2 + k * 0.85, y: y + h - 0.58, w: 0.75, fill: C.accent1 }));
  });
}

// =====================================================================
// 第1章
chapter(1, "エージェントループと制御", "分野1 エージェントアーキテクチャとオーケストレーション", 27, "3:23",
  "エージェントループ ／ 終了の判定 ／ 前提条件ゲート\n人への引き継ぎ ／ Agent SDK のフック");

{
  const s = contentSlide("ループは `stop_reason` を見て回す", "`tool_use` なら続け、`end_turn` なら終える。次に呼ぶツールは Claude が文脈から選ぶ");
  const y = 2.45, h = 1.5;
  const bw = flow(s, [
    ["リクエストを送る", "Claude に判断させる"],
    ["`stop_reason` を確認", "1周ごとに確かめる"],
    ["`tool_use` なら実行", "求められたツールを実行"],
    ["結果を履歴に足す", "応答と `tool_result` を次の周へ"],
  ], { y, h, gap: 0.64, hi: [1], titleH: 0.62 });
  // ④ → ① に戻る線（上側）
  const cx = (i) => M + i * (bw + 0.64) + bw / 2, ly = 2.17;
  arrow(s, cx(3), y - 0.04, cx(3), ly, { head: false, color: C.accent1, width: 2 });
  arrow(s, cx(3), ly, cx(0), ly, { head: false, color: C.accent1, width: 2 });
  arrow(s, cx(0), ly, cx(0), y - 0.04, { color: C.accent1, width: 2 });
  T(s, "`tool_use` の間は繰り返す", { x: cx(1) - 0.5, y: 1.83, w: cx(2) - cx(1) + 1.0, h: 0.3, size: 12, bold: true, color: C.accent1, align: "center", name: "Loop label" });
  // ② から下へ：終了
  arrow(s, cx(1), y + h + 0.04, cx(1), 4.3, { color: C.accent1, width: 2 });
  box(s, { x: cx(1) - 1.7, y: 4.32, w: 3.4, h: 0.55, fill: C.text2, name: "Exit" });
  T(s, "`end_turn` なら、ループを終える", { x: cx(1) - 1.7, y: 4.32, w: 3.4, h: 0.55, size: 14, bold: true, color: C.background1, align: "center", valign: "middle", name: "Exit text" });
  const w2 = colW(2);
  card(s, { x: M, y: 5.1, w: w2, h: 1.7, title: "結果は `tool_use_id` で対応づける", body: "Claude の応答をツールの呼び出しごと履歴に戻し、続くユーザーのメッセージで `tool_result` を返す" });
  card(s, { x: M + w2 + 0.3, y: 5.1, w: w2, h: 1.7, title: "モデル主導の意思決定", body: "次に呼ぶツールを、Claude が文脈から推論する。決めておいた決定木や、固定のツールの順番とは違う" });
}

{
  const s = contentSlide("終了を、文章の中身や回数の上限で決めない", "試験ガイドが挙げる3つのアンチパターン。判断の軸は、いつも `stop_reason`");
  const w = colW(3), h = 2.4;
  [
    ["「完了しました」を解析する", "言い回しは毎回変わるので、確実ではない"],
    ["テキストの有無で判定する", "前置きの文章とツールの呼び出しが、同じ応答に入ることがある"],
    ["回数の上限で止める", "根拠のない上限を主な停止手段にすると、作業の途中でも切れてしまう"],
  ].forEach(([t, b], i) => card(s, { x: M + i * (w + 0.3), y: Y0, w, h, num: "×", red: true, fill: C.background1, line: C.accent2, title: t, body: b }));
  mark(s, { x: M, y: 4.6, w: CW, h: 1.15 }, "good", "回数の上限は、暴走を防ぐ安全網として置く。Agent SDK の `max_turns` も、その用途の上限", { size: 16 });
  note(s, "2026年11月時点のドキュメント：`tool_use` 以外の理由で止まればループを抜け、`max_tokens` による打ち切りなどは、完了と区別して扱う", { x: M, y: 6.0, w: CW, h: 0.55 });
}

{
  const s = contentSlide("必ず守らせる順序は、前提条件ゲートで強制する", "プロンプトの指示だけでは、失敗率はゼロにならない。外せない規則はコードで止める");
  const y = Y0, h = 1.45, bw = 3.4, gap = (CW - 3 * bw) / 2;
  const steps = [
    ["`get_customer`", ["本人確認のツール", "確認済みの顧客IDを返す"], C.background2],
    ["前提条件ゲート", ["確認済みの顧客IDが返るまで", "後ろのツールをコードで止める"], C.accent1],
    ["`process_refund`", ["返金のツール", "ゲートを通るまで実行させない"], C.background2],
  ];
  steps.forEach(([t, d, fill], i) => {
    const x = M + i * (bw + gap), on = fill === C.accent1;
    box(s, { x, y, w: bw, h, fill, name: "Gate step" });
    T(s, t, { x: x + 0.22, y: y + 0.15, w: bw - 0.44, h: 0.42, size: 18, bold: true, color: on ? C.background1 : C.accent1, codeColor: on ? C.background1 : C.accent1, name: "Gate title" });
    T(s, d, { x: x + 0.22, y: y + 0.65, w: bw - 0.44, h: 0.65, size: 14, color: on ? C.background1 : C.text1, name: "Gate desc" });
    if (i < 2) arrow(s, x + bw + 0.08, y + h / 2, x + bw + gap - 0.08, y + h / 2, { color: C.accent1, width: 2 });
  });
  const w2 = colW(2), cy = 3.75, ch = 3.05;
  card(s, { x: M, y: cy, w: w2, h: ch, title: "プロンプトで誘導する（確率的）", titleColor: C.accent4, fill: C.background1, line: C.accent6, bullet: true, after: 6, body: [
    "システムプロンプトに書けば、Claude はたいてい従う",
    "プロンプトを強める・例を足すのも、確率的な手当て",
    "多少ぶれてよいことに使う",
  ] });
  card(s, { x: M + w2 + 0.3, y: cy, w: w2, h: ch, title: "プログラムで強制する（決定論的）", titleColor: C.accent1, fill: C.background2, bullet: true, after: 6, body: [
    "毎回必ず守らせる、外せない規則に使う",
    "お金の操作でまれにでも順番が飛ぶと、別人の口座への返金のような事故になる",
    "必ず守らせる場面では、プロンプトの強化より強制を選ぶ",
  ] });
}

{
  const s = contentSlide("フックで、ツールの呼び出しと結果に割り込む", "フックはアプリ側で動くコード。モデルの判断に左右されず、決定論的に効く");
  flow(s, [
    ["Claude", "ツールを呼ぶ"],
    ["`PreToolUse`", "実行の前"],
    ["ツールの実行", ""],
    ["`PostToolUse`", "結果が返ったあと"],
    ["Claude", "結果を処理する"],
  ], { y: Y0, h: 1.1, gap: 0.42, hi: [1, 3], titleH: 0.36, descSize: 12 });
  const w2 = colW(2), cy = 3.3, ch = 2.0;
  card(s, { x: M, y: cy, w: w2, h: ch, title: "`PreToolUse` ― 呼び出しを横取りする", body: "たとえば500ドルを超える返金を止め、人へのエスカレーションに回す。止めた理由は Claude に伝わり、別のやり方に切り替えられる" });
  card(s, { x: M + w2 + 0.3, y: cy, w: w2, h: ch, title: "`PostToolUse` ― 結果をそろえる", body: "MCP ツールごとにばらばらな日時の形式（Unix タイムスタンプと ISO 8601 など）を、モデルが処理する前に1つにそろえる（正規化）" });
  const by = 5.55, bh = 1.25;
  box(s, { x: M, y: by, w: CW, h: bh, fill: C.background1, line: C.accent6, name: "Handoff" });
  T(s, "人に回すときは", { x: M + 0.25, y: by, w: 2.2, h: bh, size: 16, bold: true, color: C.accent1, valign: "middle", name: "Handoff label" });
  T(s, ["担当者は、会話の記録を見られない前提", "顧客ID・根本原因・返金額・推奨する対応を、構造化したサマリーで渡す"], { x: M + 2.5, y: by + 0.15, w: CW - 2.75, h: bh - 0.3, size: 14, valign: "middle", name: "Handoff text" });
}

// =====================================================================
// 第2章
chapter(2, "マルチエージェントの設計", "分野1 エージェントアーキテクチャとオーケストレーション", 27, "10:05",
  "ハブアンドスポーク ／ 分解の抜け ／ 文脈の渡し方 ／ 並列の起動\nタスク分解の2つの型 ／ セッションの再開と分岐");

{
  const s = contentSlide("コーディネーターが、すべての通信を仲介する", "ハブアンドスポーク型。サブエージェントどうしは、直接やり取りしない");
  const lw = 6.3;
  const cw = 3.1, cx = M + (lw - cw) / 2, cyy = Y0, chh = 0.85;
  box(s, { x: cx, y: cyy, w: cw, h: chh, fill: C.accent1, name: "Coordinator" });
  T(s, "コーディネーター", { x: cx, y: cyy, w: cw, h: chh, size: 18, bold: true, color: C.background1, align: "center", valign: "middle", name: "Coordinator text" });
  const sw = 1.85, sg = (lw - 3 * sw) / 2, sy = 3.55, sh = 0.95;
  ["検索", "文書分析", "統合"].forEach((t, i) => {
    const x = M + i * (sw + sg);
    arrow(s, cx + cw / 2, cyy + chh + 0.04, x + sw / 2, sy - 0.04, { head: false, color: C.accent1, width: 2 });
    box(s, { x, y: sy, w: sw, h: sh, fill: C.background2, name: "Subagent" });
    T(s, ["サブエージェント", t], { x: x + 0.1, y: sy + 0.1, w: sw - 0.2, h: sh - 0.2, size: 14, bold: true, align: "center", valign: "middle", name: "Subagent text" });
  });
  // サブエージェントどうしの間に × を置く
  [0, 1].forEach((i) => bubble(s, M + (i + 1) * sw + i * sg + (sg - 0.36) / 2, sy + (sh - 0.48) / 2, "×", { red: true, w: 0.36, h: 0.48, size: 13 }));
  T(s, "サブエージェントどうしは直接やり取りしない", { x: M, y: sy + sh + 0.1, w: lw, h: 0.32, size: 12, bold: true, color: C.accent2, align: "center", name: "No direct" });
  trap(s, { x: M, y: 5.3, w: lw, h: 1.5 }, "レポートに抜けがあるなら、まずコーディネーターの分解を疑う。各サブエージェントは正しく動いていても、テーマを狭く分けすぎると一部しか扱えない");
  const rx = M + lw + 0.35, rw = W - M - rx, h = 1.5, g = 0.175;
  card(s, { x: rx, y: Y0, w: rw, h, title: "分解・委任・集約を受け持つ", body: "呼ぶサブエージェントは、問い合わせの要件を見て、その都度動的に選ぶ" });
  card(s, { x: rx, y: Y0 + h + g, w: rw, h, title: "通信を1か所に集める理由", body: "何が起きたかを1か所で観察でき、エラーを同じ方針で扱え、情報の流れを制御できる" });
  card(s, { x: rx, y: Y0 + 2 * (h + g), w: rw, h, title: "抜けは的を絞って再委任する", body: "サブトピックや情報源の種類で割り当てる。統合の結果を評価し、抜けに絞ってもう一度任せる" });
}

{
  const s = contentSlide("必要な文脈は、プロンプトで丸ごと渡す", "サブエージェントは分離されたコンテキストで動き、親の会話履歴もメモリも引き継がない");
  const w2 = colW(2), h = 1.45;
  mark(s, { x: M, y: Y0, w: w2, h }, "bad", "検索役の結果を短く要約して、統合役に渡す。出典が届かず、統合役はレポートに書けない");
  mark(s, { x: M + w2 + 0.3, y: Y0, w: w2, h }, "good", "前の調査結果を丸ごと、本文とメタデータ（出典の URL・文書名・ページ番号）を分けた構造化データで渡す");
  const w3 = colW(3), cy = 3.65, ch = 2.45;
  card(s, { x: M, y: cy, w: w3, h: ch, num: 1, title: "`Task` ツールで起動", body: "コーディネーターの `allowedTools` に `Task` を含める。種類ごとの説明・システムプロンプト・ツールの制限は `AgentDefinition` に書く" });
  card(s, { x: M + w3 + 0.3, y: cy, w: w3, h: ch, num: 2, title: "独立した調査は並列に", body: "1回の応答で、複数の `Task` 呼び出しを出す。順番なら全部の合計、並列ならいちばん遅い1つの時間で済む" });
  card(s, { x: M + 2 * (w3 + 0.3), y: cy, w: w3, h: ch, num: 3, title: "手順ではなく目標で任せる", body: "調査の目標と品質の基準を書く。手順を固定すると、途中で見つけたことに合わせて動けない" });
  note(s, "2026年11月時点のドキュメントでは、`Task` ツールは `Agent` ツールに名前が変わり（古い名前も設定で使える）、会話を丸ごと写すフォークも加わった。試験では、ガイドのとおりに考える", { x: M, y: 6.2, w: CW, h: 0.55 });
}

{
  const s = contentSlide("手順が決まればチェーン、読めなければ動的に分解", "タスク分解の2つの型。作業の先を予測できるかどうかで選ぶ");
  const w2 = colW(2), h = 4.4;
  const col = (x, fill, line, title, desc, ex, steps, extra) => {
    box(s, { x, y: Y0, w: w2, h, fill, line, name: "Decomp col" });
    T(s, title, { x: x + 0.3, y: Y0 + 0.2, w: w2 - 0.6, h: 0.45, size: 20, bold: true, color: C.accent1, name: "Decomp title" });
    T(s, desc, { x: x + 0.3, y: Y0 + 0.75, w: w2 - 0.6, h: 0.9, size: 14, name: "Decomp desc" });
    T(s, ex, { x: x + 0.3, y: Y0 + 1.8, w: w2 - 0.6, h: 0.32, size: 12, bold: true, color: C.accent4, name: "Decomp example" });
    const g = 0.3, sw = (w2 - 0.6 - (steps.length - 1) * g) / steps.length, sy = Y0 + 2.2, sh = 1.15;
    steps.forEach((t, i) => {
      const bx = x + 0.3 + i * (sw + g);
      box(s, { x: bx, y: sy, w: sw, h: sh, fill: fill === C.background2 ? C.background1 : C.background2, line: C.accent6, name: "Decomp step" });
      T(s, t, { x: bx + 0.12, y: sy + 0.08, w: sw - 0.24, h: sh - 0.16, size: 13, bold: true, align: "center", valign: "middle", name: "Decomp step text" });
      if (i < steps.length - 1) arrow(s, bx + sw + 0.05, sy + sh / 2, bx + sw + g - 0.05, sy + sh / 2);
    });
    extra(sy + sh, sw, g);
  };
  col(M, C.background2, undefined, "プロンプトチェーン", "決まった順番のステップに分け、前の出力を次の入力にする。予測できる多観点のレビューに向く",
    "例：大きなコードレビュー", [["ファイルごとに", "分析するパス"], ["ファイルをまたぐ問題を", "見る統合のパス"]], (yb) => {
      note(s, "一度に全部見せると、注意が分散して見落としが出る", { x: M + 0.3, y: yb + 0.3, w: w2 - 0.6, h: 0.35 });
    });
  const rx = M + w2 + 0.3;
  col(rx, C.background1, C.accent6, "動的な分解", "各ステップで分かったことから、次のサブタスクを作る。終わりの見えない調査に向く",
    "例：レガシーなコードベースに網羅的なテストを足す", [["構造を", "把握する"], ["影響の大きい", "領域を見つける"], ["優先順位を", "付けた計画"]], (yb, sw, g) => {
      const x0 = rx + 0.3 + sw / 2, x2 = rx + 0.3 + 2 * (sw + g) + sw / 2, ly = yb + 0.35;
      arrow(s, x2, yb + 0.04, x2, ly, { head: false, color: C.accent1, width: 2 });
      arrow(s, x2, ly, x0, ly, { head: false, color: C.accent1, width: 2 });
      arrow(s, x0, ly, x0, yb + 0.04, { color: C.accent1, width: 2 });
      T(s, "依存関係が見つかるたびに、計画を組み替える", { x: rx + 0.3, y: ly + 0.1, w: w2 - 0.6, h: 0.35, size: 12, bold: true, color: C.accent1, align: "center", name: "Replan" });
    });
}

{
  const s = contentSlide("前の結果が古ければ、要約を持って新しく始める", "セッションが保存するのは会話で、ファイルではない。再開・分岐・新規を使い分ける");
  const w3 = colW(3), h = 2.75;
  [
    ["`--resume`", "名前付きの会話を再開する", "セッション名を付けて再開する。作業日をまたぐ調査に便利"],
    ["`fork_session`", "共通の分析から分岐を作る", "元のセッションは残る。たとえば2つのテスト戦略を比べる"],
    ["新しいセッション", "構造化した要約を渡して始める", "前の結果の多くが古いとき。大事な事実をまとめた要約を持っていく"],
  ].forEach(([n, tag, d], i) => {
    const x = M + i * (w3 + 0.3), on = i === 2;
    box(s, { x, y: Y0, w: w3, h, fill: on ? C.background1 : C.background2, line: on ? C.accent1 : undefined, lineW: 1.75, name: "Session" });
    T(s, n, { x: x + 0.25, y: Y0 + 0.22, w: w3 - 0.5, h: 0.5, size: 22, bold: true, color: C.accent1, name: "Session name" });
    T(s, tag, { x: x + 0.25, y: Y0 + 0.85, w: w3 - 0.5, h: 0.35, size: 14, bold: true, color: C.accent4, name: "Session tag" });
    T(s, d, { x: x + 0.25, y: Y0 + 1.35, w: w3 - 0.5, h: h - 1.55, size: 14, name: "Session desc" });
  });
  card(s, { x: M, y: 5.0, w: CW, h: 1.5, title: "コードを変えたあとに再開するなら", fill: C.background1, line: C.accent6, body: "ツールの結果が古くないかに気をつける。変えたファイルを具体的に伝え、そこだけを分析し直させる" });
}

// =====================================================================
// 第3章
chapter(3, "ツール設計と MCP 統合", "分野2 ツール設計と MCP 統合", 18, "16:57",
  "ツールの説明と配り方 ／ 構造化されたエラー\nMCP サーバーの設定 ／ 組み込みツールの選び方");

{
  const s = contentSlide("説明を充実させ、ツールは役割に必要な分だけ渡す", "LLM はツールの説明を主な手がかりに選ぶ。数が多すぎても、選択の信頼性が下がる");
  const w2 = colW(2);
  const col = (x, head, bad, goodTitle, good) => {
    T(s, head, { x, y: Y0, w: w2, h: 0.4, size: 18, bold: true, color: C.accent1, name: "Col head" });
    mark(s, { x, y: Y0 + 0.5, w: w2, h: 1.1 }, "bad", bad);
    card(s, { x, y: Y0 + 1.75, w: w2, h: 2.0, num: "○", title: goodTitle, bullet: true, body: good });
  };
  col(M, "説明で迷わせない", "`analyze_content` と `analyze_document` に、ほぼ同じ短い説明しかない → 呼び先の取り違え", "説明に書くこと", [
    "目的・入力の形式・例・エッジケース・使い分け",
    "重なるなら `extract_web_results` のように改名",
    "システムプロンプトのキーワード指示も見直す",
  ]);
  col(M + w2 + 0.3, "数で迷わせない", "4〜5個ではなく18個ものツールを渡す → 統合エージェントがウェブ検索を始める", "役割に必要なツールだけ", [
    "`fetch_url` は、検証付きの `load_document` に",
    "頻度の高い用途にだけ `verify_fact` を渡す",
    "複雑な確認は、コーディネーター経由のまま",
  ]);
  trap(s, { x: M, y: 5.95, w: CW, h: 0.85 }, "最初の一手は説明の充実。few-shot の例やキーワードの振り分け層は、重いうえに原因に届かない");
}

{
  const s = contentSlide("エラーは、種類とリトライの可否を付けて返す", "失敗は `isError` で伝える。どれも「Operation failed」では、次の手を決められない");
  const lw = 6.4, h = 3.0;
  box(s, { x: M, y: Y0, w: lw, h, fill: C.text2, name: "Error payload" });
  T(s, "失敗したときに返す中身", { x: M + 0.3, y: Y0 + 0.2, w: lw - 0.6, h: 0.4, size: 16, bold: true, color: C.background1, name: "Payload title" });
  [
    ["`isError`", "`true`（失敗を伝える）"],
    ["`errorCategory`", "一時的・検証・ビジネス・権限"],
    ["`isRetryable`", "リトライできるか"],
    ["説明", "人が読める説明"],
  ].forEach(([k, v], i) => {
    const y = Y0 + 0.78 + i * 0.52;
    T(s, k, { x: M + 0.3, y, w: 2.0, h: 0.45, size: 14, bold: true, color: C.accent5, codeColor: C.accent5, valign: "middle", name: "Payload key" });
    T(s, v, { x: M + 2.4, y, w: lw - 2.65, h: 0.45, size: 14, color: C.background1, codeColor: C.accent5, valign: "middle", name: "Payload val" });
  });
  note(s, "`errorCategory` と `isRetryable` は MCP の仕様ではなく、自分で決める項目", { x: M, y: Y0 + h + 0.1, w: lw, h: 0.5 });
  const rx = M + lw + 0.3, rw = W - M - rx;
  card(s, { x: rx, y: Y0, w: rw, h, title: "一時的な失敗は、サブエージェント内で立て直す", bullet: true, after: 6, body: [
    "解決できないものだけを、途中の結果と試したことと一緒に、コーディネーターへ伝える",
    "ビジネスのルール違反には、リトライできないという印と、顧客向けの説明を付ける",
  ] });
  trap(s, { x: M, y: 5.65, w: CW, h: 1.15 }, "該当なしという正常な空の結果と、アクセスの失敗を区別して返す。同じ空の結果を返すと、エージェントは接続の失敗に気づかず「該当なし」と答えてしまう");
}

{
  const s = contentSlide("共有のサーバーはプロジェクトに、個人用はユーザーに", "設定したすべてのサーバーのツールは、接続時に検出され、同時に使える");
  const w2 = colW(2), h = 1.75;
  [
    ["プロジェクト（チームで共有）", "`.mcp.json`", "チームで共有するサーバーを書いて、コミットする", true],
    ["ユーザー（自分だけ）", "`~/.claude.json`", "個人用や、試験的なサーバーを置く", false],
  ].forEach(([lab, file, d, on], i) => {
    const x = M + i * (w2 + 0.3);
    box(s, { x, y: Y0, w: w2, h, fill: on ? C.background2 : C.background1, line: on ? undefined : C.accent6, name: "Scope" });
    T(s, lab, { x: x + 0.3, y: Y0 + 0.2, w: w2 - 0.6, h: 0.35, size: 14, bold: true, color: C.accent4, name: "Scope label" });
    T(s, file, { x: x + 0.3, y: Y0 + 0.62, w: w2 - 0.6, h: 0.55, size: 26, bold: true, color: C.accent1, name: "Scope file" });
    T(s, d, { x: x + 0.3, y: Y0 + 1.25, w: w2 - 0.6, h: 0.35, size: 14, name: "Scope desc" });
  });
  const by = 4.2, bh = 0.85;
  box(s, { x: M, y: by, w: CW, h: bh, fill: C.background1, line: C.accent1, name: "Env band" });
  T(s, "トークンは", { x: M + 0.25, y: by, w: 1.4, h: bh, size: 16, bold: true, color: C.accent1, valign: "middle", name: "Env label" });
  T(s, "直接書かず、`${GITHUB_TOKEN}` のような環境変数の展開で渡す。秘密をコミットしない", { x: M + 1.7, y: by, w: CW - 1.95, h: bh, size: 14, valign: "middle", name: "Env text" });
  const w3 = colW(3), cy = 5.25, ch = 1.55;
  card(s, { x: M, y: cy, w: w3, h: ch, title: "組み込みの Grep に負けるなら", body: "MCP ツールの説明に、機能と出力を詳しく書く" });
  card(s, { x: M + w3 + 0.3, y: cy, w: w3, h: ch, title: "標準の連携はコミュニティ製", body: "Jira のような連携は既存のサーバー。自作はチーム固有の作業に" });
  card(s, { x: M + 2 * (w3 + 0.3), y: cy, w: w3, h: ch, title: "目録は MCP リソースで", body: "課題の要約や DB のスキーマを公開し、手探りの呼び出しを減らす" });
  note(s, "2026年11月時点の Claude Code では、ツールの定義を必要なときに読み込むツール検索が既定", { x: M, y: by - 0.12 - 0.3, w: CW, h: 0.3 });
}

{
  const s = contentSlide("中身は Grep、名前は Glob、部分の修正は Edit", "組み込みツールは、何を探し、どう書き換えるかで選ぶ");
  const w3 = colW(3), h = 1.22, g = 0.15;
  [
    ["Grep", ["ファイルの中身を検索", "例：関数の呼び出し元"]],
    ["Glob", ["名前や拡張子の", "パターンで探す"]],
    ["Bash", "コマンドを実行する"],
    ["Read", "ファイル全体を読む"],
    ["Write", "ファイル全体を書く"],
    ["Edit", ["一意に一致する目印で", "部分を置き換える"]],
  ].forEach(([n, d], i) => {
    const x = M + (i % 3) * (w3 + 0.3), y = Y0 + Math.floor(i / 3) * (h + g);
    box(s, { x, y, w: w3, h, fill: C.background2, name: "Tool" });
    T(s, n, { x: x + 0.25, y, w: 1.1, h, size: 22, bold: true, color: C.accent1, valign: "middle", name: "Tool name" });
    T(s, d, { x: x + 1.4, y: y + 0.1, w: w3 - 1.55, h: h - 0.2, size: 14, valign: "middle", name: "Tool desc" });
  });
  note(s, "2026年11月時点の Claude Code では、macOS などで Grep と Glob が既定から外れ、Bash で検索する", { x: M, y: Y0 + 2 * h + g + 0.08, w: CW, h: 0.3 });
  const by = 5.0, bh = 1.8, lw = 6.4;
  trap(s, { x: M, y: by, w: lw, h: bh }, "Edit は、同じテキストが何か所もあると失敗する。そのときは Read で全体を読んでから、Write で書く");
  const rx = M + lw + 0.3;
  card(s, { x: rx, y: by, w: W - M - rx, h: bh, title: "コードベースは、最初に全部を読まない", body: "Grep で入口を見つけ、Read で import をたどる。ラッパーを経由する関数は、エクスポートされた名前を洗い出してから検索する" });
}

// =====================================================================
// 第4章
chapter(4, "Claude Code の設定", "分野3 Claude Code の設定とワークフロー", 20, "23:52",
  "CLAUDE.md の階層 ／ `@import` と `.claude/rules/` ／\nパスを指定したルール ／ コマンドとスキル ／ 使い分け");

{
  const s = contentSlide("チームの規約は、プロジェクトの CLAUDE.md に書く", "ユーザーレベルは自分だけ。新しいメンバーにだけ届かないなら、階層の取り違えを疑う");
  const lw = 6.6, h = 1.25, g = 0.15;
  [
    ["ユーザー", "`~/.claude/CLAUDE.md`", "すべてのプロジェクトで効く。ただし自分だけ", false],
    ["プロジェクト", "ルートか `.claude/CLAUDE.md`", "バージョン管理で、チームに共有される", true],
    ["ディレクトリ", "サブディレクトリの CLAUDE.md", "サブディレクトリに置いた CLAUDE.md", false],
  ].forEach(([lv, p, d, on], i) => {
    const y = Y0 + i * (h + g);
    box(s, { x: M, y, w: lw, h, fill: on ? C.background1 : C.background2, line: on ? C.accent1 : undefined, lineW: 1.75, name: "Level" });
    T(s, lv, { x: M + 0.25, y, w: 1.55, h, size: 16, bold: true, color: on ? C.accent1 : C.text1, valign: "middle", name: "Level name" });
    T(s, p, { x: M + 1.9, y: y + 0.18, w: lw - 2.1, h: 0.42, size: 16, bold: true, name: "Level path" });
    T(s, d, { x: M + 1.9, y: y + 0.66, w: lw - 2.1, h: 0.42, size: 14, color: C.accent4, name: "Level desc" });
  });
  note(s, "セッションごとに挙動が違うなら、`/memory` で読み込まれているメモリファイルを確かめる（2026年11月時点は `/context` も案内されている）", { x: M, y: Y0 + 3 * h + 2 * g + 0.15, w: lw, h: 0.55 });
  const rx = M + lw + 0.3, rw = W - M - rx, ch = 2.1;
  card(s, { x: rx, y: Y0, w: rw, h: ch, num: 1, title: "大きくなったら `@import` で分ける", body: "アットマークに続けてパスを書き、ファイルを取り込む。各パッケージの CLAUDE.md で、関係する規約ファイルだけを選ぶ" });
  card(s, { x: rx, y: Y0 + ch + 0.25, w: rw, h: ch, num: 2, title: "`.claude/rules/` にトピック別に置く", body: "巨大な CLAUDE.md の代わりに、`testing.md`、`deployment.md` のようなトピック別のファイルに分ける" });
}

{
  const s = contentSlide("散らばるファイルの規約は、`paths` で当てる", "フロントマターの `paths` に glob パターンを書くと、一致するファイルを扱うときだけ読み込まれる");
  const lw = 4.9, h = 2.45;
  box(s, { x: M, y: Y0, w: lw, h, fill: C.text2, name: "Rule file" });
  T(s, "`.claude/rules/` のルールファイル", { x: M + 0.3, y: Y0 + 0.2, w: lw - 0.6, h: 0.35, size: 14, bold: true, color: C.accent5, codeColor: C.accent5, name: "Rule head" });
  T(s, ["`---`", "`paths:`", "`  - \"**/*.test.tsx\"`", "`---`", "テストの規約を書く"], { x: M + 0.3, y: Y0 + 0.65, w: lw - 0.6, h: 1.65, size: 14, color: C.background1, codeColor: C.background1, name: "Rule body" });
  const ax = M + lw + 0.1, rx = M + lw + 0.65, rw = W - M - rx;
  arrow(s, ax, Y0 + h / 2, rx - 0.1, Y0 + h / 2, { color: C.accent1, width: 2.5 });
  const rows = [
    ["`src/components/Button.test.tsx`", true],
    ["`src/pages/home/Home.test.tsx`", true],
    ["`packages/ui/Card.test.tsx`", true],
    ["`src/pages/home/Home.tsx`", false],
  ];
  rows.forEach(([p, hit], i) => {
    const y = Y0 + i * 0.63, rh = 0.53;
    box(s, { x: rx, y, w: rw, h: rh, fill: hit ? C.background2 : C.background1, line: hit ? undefined : C.accent6, name: "Match row" });
    T(s, p, { x: rx + 0.2, y, w: rw - 2.0, h: rh, size: 14, valign: "middle", codeColor: hit ? C.text1 : C.accent4, name: "Match path" });
    pill(s, hit ? "当たる" : "当たらない", { x: rx + rw - 1.6, y: y + (rh - 0.32) / 2, w: 1.4, fill: hit ? C.accent1 : C.accent4 });
  });
  note(s, "場所に関係なく、すべてのテストファイルに当たる", { x: rx, y: Y0 + 2.52, w: rw, h: 0.3 });
  const w2 = colW(2), cy = 4.9, ch = 1.4;
  card(s, { x: M, y: cy, w: w2, h: ch, num: "×", red: true, fill: C.background1, line: C.accent2, title: "サブディレクトリごとの CLAUDE.md", body: "場所に縛られ、同じ内容を何か所にも書くことになる" });
  card(s, { x: M + w2 + 0.3, y: cy, w: w2, h: ch, num: "×", red: true, fill: C.background1, line: C.accent2, title: "規約をスキルにする", body: "呼び出されたときしか読み込まれず、確実には当たらない" });
  note(s, "試験ガイドは「一致するファイルを編集するとき」に読み込むとする。2026年11月時点のドキュメントでは、読むときにも読み込まれる", { x: M, y: 6.35, w: CW, h: 0.4 });
}

{
  const s = contentSlide("コマンドとスキルは、置き場所で届く範囲が決まる", "チームのものはプロジェクトの `.claude/` に、自分だけのものはホームの `~/.claude/` に置く");
  const head = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 } } });
  const cell = (t, i, extra = {}) => ({ text: deck.runs([t], { codeColor: C.accent1 }), options: { fill: { color: i % 2 ? C.background2 : C.background1 }, ...extra } });
  const rows = [
    [head(""), head("チームで共有（バージョン管理）"), head("自分だけ（個人用）")],
    ...[
      ["カスタムスラッシュコマンド", "`.claude/commands/`", "`~/.claude/commands/`"],
      ["スキル", "`.claude/skills/` のフォルダに `SKILL.md`", "`~/.claude/skills/`（チームのものの変種は別の名前で）"],
    ].map((r, i) => r.map((t, k) => cell(t, i, k === 0 ? { bold: true } : {}))),
  ];
  s.addTable(rows, {
    x: M, y: Y0, w: CW, colW: [3.1, 4.4, CW - 7.5], fontSize: 14, color: C.text1, valign: "middle",
    border: { type: "solid", pt: 0.75, color: HEX.accent6 }, margin: [6, 8, 6, 8], rowH: [0.5, 0.65, 0.9],
    objectName: "Command table",
  });
  note(s, "CLAUDE.md は指示を書く場所で、コマンドを定義する場所ではない。2026年11月時点では、カスタムコマンドはスキルに統合されているが、従来のファイルもそのまま動く", { x: M, y: 4.15, w: CW, h: 0.5 });
  T(s, "`SKILL.md` のフロントマターで、実行のしかたを決める", { x: M, y: 4.72, w: CW, h: 0.36, size: 16, bold: true, name: "Fm head" });
  const w3 = colW(3), cy = 5.15, ch = 1.65;
  card(s, { x: M, y: cy, w: w3, h: ch, title: "`context: fork`", titleColor: C.accent1, body: "分離したサブエージェントで動かす。長い出力や探索的な作業を、メインの会話から切り離す" });
  card(s, { x: M + w3 + 0.3, y: cy, w: w3, h: ch, title: "`allowed-tools`", titleColor: C.accent1, body: "ガイドでは、実行中のツールを絞る設定。2026年11月時点は、確認なしで使えるツールの許可" });
  card(s, { x: M + 2 * (w3 + 0.3), y: cy, w: w3, h: ch, title: "`argument-hint`", titleColor: C.accent1, body: "必要な引数の入力を促すヒント" });
}

{
  const s = contentSlide("毎回要る標準は CLAUDE.md、必要なときの手順はスキル", "使い分けの軸は、その指示が毎回要るかどうか");
  const ay = Y0 + 0.2;
  T(s, "毎回要る", { x: M, y: ay - 0.17, w: 1.4, h: 0.34, size: 14, bold: true, color: C.accent1, valign: "middle", name: "Scale left" });
  T(s, "必要なときだけ", { x: W - M - 2.0, y: ay - 0.17, w: 2.0, h: 0.34, size: 14, bold: true, color: C.accent4, align: "right", valign: "middle", name: "Scale right" });
  arrow(s, M + 1.5, ay, W - M - 2.1, ay, { color: C.accent4, width: 2 });
  const w3 = colW(3), y = Y0 + 0.65, h = 2.85;
  [
    ["CLAUDE.md", "常に読み込まれる", "全体共通の標準を書く"],
    ["パスを指定したルール", "一致するファイルを扱うとき", "特定のファイルだけの規約を書く"],
    ["スキル", "必要なときに呼ぶ", "デプロイのような、特定の作業の手順を書く"],
  ].forEach(([n, when, d], i) => {
    const x = M + i * (w3 + 0.3);
    box(s, { x, y, w: w3, h, fill: i === 0 ? C.text2 : C.background2, name: "Place" });
    const fg = i === 0 ? C.background1 : C.text1;
    T(s, n, { x: x + 0.25, y: y + 0.25, w: w3 - 0.5, h: 0.5, size: 22, bold: true, color: i === 0 ? C.background1 : C.accent1, name: "Place name" });
    T(s, "いつ読み込まれるか", { x: x + 0.25, y: y + 0.95, w: w3 - 0.5, h: 0.3, size: 12, bold: true, color: i === 0 ? C.accent5 : C.accent4, name: "Place label" });
    T(s, when, { x: x + 0.25, y: y + 1.27, w: w3 - 0.5, h: 0.38, size: 16, bold: true, color: fg, name: "Place when" });
    T(s, d, { x: x + 0.25, y: y + 1.85, w: w3 - 0.5, h: h - 2.05, size: 14, color: fg, name: "Place desc" });
  });
  trap(s, { x: M, y: 5.75, w: CW, h: 1.05 }, "まれにしか使わない長い手順を CLAUDE.md に書くと、毎回の文脈を圧迫する。そうした手順はスキルにする");
}

// =====================================================================
// 第5章
chapter(5, "Claude Code の進め方と CI", "分野3 Claude Code の設定とワークフロー", 20, "30:12",
  "プランモードと直接実行 ／ Explore サブエージェント\n入出力の例とテスト ／ インタビューパターン\nCI への組み込み ／ 独立したレビュー");

{
  const s = contentSlide("複雑さが見えている作業は、プランモードから始める", "プランモードは調べて計画するだけで、ソースコードは編集しない。計画を承認してから編集に移る");
  const w2 = colW(2), h = 2.85;
  card(s, { x: M, y: Y0, w: w2, h, title: "プランモード ― 先に調べて設計する", titleColor: C.accent1, fill: C.background1, line: C.accent1, bullet: true, after: 6, body: [
    "向く：大規模な変更、妥当な方法が複数ある作業、設計の判断、多くのファイルにまたがる作業",
    "例：マイクロサービスへの再構成、45以上のファイルに及ぶライブラリの移行",
    "組み合わせ：計画はプランモード、実装は直接実行",
  ] });
  card(s, { x: M + w2 + 0.3, y: Y0, w: w2, h, title: "直接実行 ― すぐに直す", bullet: true, after: 6, body: [
    "向く：範囲がはっきりした、単純な変更",
    "例：スタックトレースで原因が分かっている、1ファイルのバグ修正",
    "例：日付を検証する条件を1つ足す",
  ] });
  const by = 5.0, bh = 1.8, lw = 7.2;
  trap(s, { x: M, y: by, w: lw, h: bh }, "「まず直接実行で始め、難しくなったら切り替える」は誤り。複雑さが最初から分かっているなら、最初から計画する");
  const rx = M + lw + 0.3;
  card(s, { x: rx, y: by, w: W - M - rx, h: bh, title: "長い調査は Explore に任せる", body: "読み取り専用のサブエージェント。大量の出力を切り離し、メインには要約だけが戻る" });
}

{
  const s = contentSlide("言葉で伝わらないときは、入出力の例とテストで示す", "結果を少しずつ良くする伝え方。不慣れな分野では、実装の前に Claude に質問させる");
  const w3 = colW(3), h = 2.55;
  card(s, { x: M, y: Y0, w: w3, h, num: 1, title: "入出力の例を2〜3個", body: "説明しても受け取り方がぶれ続けるなら、具体的な入力と期待する出力を見せる。期待する変換を伝えるのに、いちばん効く" });
  card(s, { x: M + w3 + 0.3, y: Y0, w: w3, h, num: 2, title: "テストを先に書く", body: "期待する動作・エッジケース・性能の要件のテストを書き、失敗の結果を伝えて直させる。null を含む入力も、テストケースで渡す" });
  card(s, { x: M + 2 * (w3 + 0.3), y: Y0, w: w3, h, num: 3, title: "インタビューパターン", body: "実装の前に Claude に質問させ、見落としを洗い出す。例：キャッシュをいつ無効にするか、障害のときにどうふるまうか" });
  T(s, "直す問題が複数あるとき", { x: M, y: 4.75, w: CW, h: 0.36, size: 16, bold: true, name: "Multi head" });
  const w2 = colW(2), y = 5.2, bh = 1.6;
  [
    ["影響し合う問題", "1つの詳しいメッセージにまとめて伝える。別々に直すと、一方の修正がもう一方を壊しかねない", C.background1, C.accent1],
    ["独立した問題", "1つずつ順番に直して、確かめる", C.background2, undefined],
  ].forEach(([t, d, fill, line], i) => {
    const x = M + i * (w2 + 0.3);
    box(s, { x, y, w: w2, h: bh, fill, line, lineW: 1.75, name: "Multi" });
    T(s, t, { x: x + 0.25, y, w: 2.1, h: bh, size: 16, bold: true, color: C.accent1, valign: "middle", name: "Multi title" });
    T(s, d, { x: x + 2.4, y: y + 0.12, w: w2 - 2.6, h: bh - 0.24, size: 14, valign: "middle", name: "Multi desc" });
  });
}

{
  const s = contentSlide("CI では `-p` を付け、構造化された出力を受け取る", "`-p`（長い形は `--print`）で非対話モードに。付けないと、対話の入力を待ったままジョブが止まる");
  const y = Y0, h = 3.0;
  box(s, { x: M, y, w: CW, h, fill: C.background1, line: C.accent1, dash: "dash", name: "CI job" });
  T(s, "CI のジョブで動かす Claude Code", { x: M + 0.25, y: y + 0.15, w: 6, h: 0.35, size: 14, bold: true, color: C.accent1, name: "CI label" });
  flow(s, [
    ["`-p`", "非対話モードで実行する"],
    ["`--output-format json`", ["結果やセッション ID が", "JSON で返る"]],
    ["`--json-schema`", "スキーマに合った出力が `structured_output` に入る"],
    ["PR に自動で投稿", "指摘ごとにファイル・行・内容を持たせ、インラインコメントにする"],
  ], { x: M + 0.25, y: y + 0.65, w: CW - 0.5, h: 2.1, gap: 0.45, hi: [3], titleH: 0.68, descSize: 14 });
  trap(s, { x: M, y: 5.25, w: CW, h: 1.2 }, "もっともらしいが存在しない環境変数やフラグは、誤答。非対話にするのは `-p`");
}

{
  const s = contentSlide("生成したセッションに、自分のレビューをさせない", "CI の Claude Code には CLAUDE.md で決まりを渡し、レビューは独立したインスタンスに任せる");
  const lw = 5.9;
  T(s, "CI に決まりを渡す", { x: M, y: Y0, w: lw, h: 0.4, size: 18, bold: true, color: C.accent1, name: "Col head" });
  card(s, { x: M, y: Y0 + 0.5, w: lw, h: 2.05, title: "CLAUDE.md に書くこと", bullet: true, body: [
    "テストの標準と、価値のあるテストの基準",
    "使えるフィクスチャ（テスト用の決まったデータ）",
    "テスト生成の質が上がり、価値の低いテストが減る",
  ] });
  card(s, { x: M, y: Y0 + 2.7, w: lw, h: 1.3, title: "既存のテストファイルも渡す", body: "同じシナリオを重ねて提案しなくなる" });
  note(s, "2026年11月時点のドキュメントは、CI で `--bare` モードを勧める。CLAUDE.md を自動では読まないので、文脈はフラグで渡す。試験では、ガイドどおり CLAUDE.md を答えにする", { x: M, y: Y0 + 4.15, w: lw, h: 0.75 });
  const rx = M + lw + 0.35, rw = W - M - rx;
  T(s, "レビューは別のインスタンスで", { x: rx, y: Y0, w: rw, h: 0.4, size: 18, bold: true, color: C.accent1, name: "Col head" });
  mark(s, { x: rx, y: Y0 + 0.5, w: rw, h: 1.2 }, "bad", "コードを書いたのと同じセッションでレビューする。書いたときの考え方に引きずられる");
  mark(s, { x: rx, y: Y0 + 1.85, w: rw, h: 0.7 }, "good", "独立したレビューのインスタンスに任せる");
  card(s, { x: rx, y: Y0 + 2.7, w: rw, h: 2.15, title: "新しいコミットのあとの再レビュー", fill: C.background1, line: C.accent1, body: "前回の指摘を文脈に入れ、新しい問題と、まだ直っていない問題だけを報告させる。同じ指摘のコメントが重ならない" });
}

// =====================================================================
// 第6章
chapter(6, "プロンプト設計とレビュー", "分野4 プロンプトエンジニアリングと構造化出力", 20, "37:09",
  "明示的な基準 ／ 誤検知の多いカテゴリ ／ few-shot の例\n抽出の例 ／ 独立したレビュー ／ マルチパスレビュー");

{
  const s = contentSlide("「保守的に」ではなく、報告する条件を書く", "一般的な指示では、精度は上がらない。何を報告すべきかという基準が示されていないから");
  const lw = 6.6;
  box(s, { x: M, y: Y0, w: lw, h: 1.45, fill: C.background1, line: C.accent2, lineW: 1.75, name: "Bad" });
  bubble(s, M + 0.25, Y0 + (1.45 - 0.54) / 2, "×", { red: true, size: 16 });
  T(s, ["「コメントが正しいか確認して」", "「保守的に判断して」", "「確信度の高い指摘だけを報告して」"], { x: M + 0.85, y: Y0 + 0.12, w: lw - 1.1, h: 1.21, size: 14, valign: "middle", name: "Bad text" });
  mark(s, { x: M, y: Y0 + 1.6, w: lw, h: 1.05 }, "good", "コメントが説明する動作が、実際のコードの動作と矛盾するときだけ指摘する");
  const ry = Y0 + 2.8, rh = 1.2;
  box(s, { x: M, y: ry, w: lw, h: rh, fill: C.background2, name: "Categories" });
  pill(s, "報告する", { x: M + 0.25, y: ry + 0.18, w: 1.3, fill: C.accent1 });
  T(s, "バグ、セキュリティの問題", { x: M + 1.75, y: ry + 0.12, w: lw - 2.0, h: 0.44, size: 14, bold: true, valign: "middle", name: "Report" });
  pill(s, "見送る", { x: M + 0.25, y: ry + 0.7, w: 1.3, fill: C.accent4 });
  T(s, "軽微なスタイル、その場所だけの書き方の癖", { x: M + 1.75, y: ry + 0.64, w: lw - 2.0, h: 0.44, size: 14, bold: true, valign: "middle", name: "Skip" });
  note(s, "2026年11月時点のドキュメントも、「重大な問題だけ」は報告漏れにつながるとし、報告の線を具体的に書くか、確信度と重大度つきで出させて別の段階でふるい分ける形を勧める", { x: M, y: ry + rh + 0.15, w: lw, h: 0.75 });
  const rx = M + lw + 0.35, rw = W - M - rx;
  T(s, "誤検知の多いカテゴリは、いったん止める", { x: rx, y: Y0, w: rw, h: 0.4, size: 16, bold: true, color: C.accent1, name: "FP head" });
  const fh = 0.95, fg = 0.35;
  [
    ["あるカテゴリで、外れの指摘が続く", C.background2, C.text1],
    ["開発者がレビュー全体を信用しなくなる。正確なセキュリティの指摘まで読み飛ばす", C.background1, C.text1],
    ["そのカテゴリだけ一時的に無効にし、その間にプロンプトを直す", C.accent1, C.background1],
  ].forEach(([t, fill, fgc], i) => {
    const y = Y0 + 0.5 + i * (fh + fg);
    box(s, { x: rx, y, w: rw, h: fh, fill, line: fill === C.background1 ? C.accent2 : undefined, name: "FP step" });
    T(s, t, { x: rx + 0.2, y: y + 0.08, w: rw - 0.4, h: fh - 0.16, size: 14, bold: true, color: fgc, valign: "middle", name: "FP text" });
    if (i < 2) arrow(s, rx + rw / 2, y + fh + 0.04, rx + rw / 2, y + fh + fg - 0.04);
  });
  note(s, "重大度の分類は、レベルごとに具体的なコード例を付けた基準を書くと、そろう", { x: rx, y: Y0 + 0.5 + 3 * fh + 2 * fg + 0.15, w: rw, h: 0.55 });
}

{
  const s = contentSlide("指示でそろわない形式は、few-shot の例で示す", "望む入力と出力の見本を見せる。試験ガイドは、形式をそろえる最も効果的な手法とする");
  const lw = 5.4, fh = 3.0;
  box(s, { x: M, y: Y0, w: lw, h: fh, fill: C.background1, line: C.accent6, name: "Sample" });
  T(s, "指摘の見本（1件分）", { x: M + 0.25, y: Y0 + 0.18, w: lw - 0.5, h: 0.36, size: 14, bold: true, color: C.accent4, name: "Sample head" });
  ["場所", "問題", "重大度", "修正案"].forEach((k, i) => {
    const y = Y0 + 0.7 + i * 0.55;
    T(s, k, { x: M + 0.25, y, w: 1.0, h: 0.42, size: 14, bold: true, color: C.accent1, valign: "middle", name: "Sample key" });
    box(s, { x: M + 1.3, y: y + 0.07, w: lw - 1.55, h: 0.28, fill: C.background2, r: 0.06, name: "Sample field" });
  });
  card(s, { x: M, y: Y0 + fh + 0.15, w: lw, h: 1.7, title: "抽出にも効く", body: "形の違う文書ごとに、正しい抽出例を見せる。必須の項目が空や null になる問題と、値のでっち上げを減らす" });
  const rx = M + lw + 0.3, rw = W - M - rx, ch = 1.55, g = 0.1;
  card(s, { x: rx, y: Y0, w: rw, h: ch, num: 1, title: "あいまいな場面に絞って2〜4個", body: "ガイドの目安。2026年11月時点のドキュメントの一般的な目安は3〜5個で、偏りのない多様な例を勧める" });
  card(s, { x: rx, y: Y0 + ch + g, w: rw, h: ch, num: 2, title: "選んだ理由まで書く", body: "もっともらしい別の選択肢ではなく、なぜその対応なのかを示す" });
  card(s, { x: rx, y: Y0 + 2 * (ch + g), w: rw, h: ch, num: 3, title: "問題のないパターンも入れる", body: "本当の問題と見分ける例を入れる。理由が分かると、例にない新しいパターンにも判断を広げられる" });
}

{
  const s = contentSlide("セルフレビューより、独立したインスタンスに任せる", "生成したときの推論の文脈を持ったままでは、自分の判断を疑いにくい");
  const bw = 5.4, h = 3.35;
  const side = (x, title, inner, rows, good) => {
    box(s, { x, y: Y0, w: bw, h, fill: good ? C.background1 : C.background2, line: good ? C.accent1 : undefined, lineW: 1.75, name: "Review side" });
    T(s, title, { x: x + 0.25, y: Y0 + 0.2, w: bw - 0.5, h: 0.4, size: 18, bold: true, color: C.accent1, name: "Side title" });
    box(s, { x: x + 0.25, y: Y0 + 0.75, w: bw - 0.5, h: 0.6, fill: good ? C.background2 : C.background1, line: C.accent4, dash: good ? undefined : "dash", r: 0.08, name: "Context" });
    T(s, inner, { x: x + 0.25, y: Y0 + 0.75, w: bw - 0.5, h: 0.6, size: 14, bold: true, color: C.accent4, align: "center", valign: "middle", name: "Context text" });
    rows.forEach((t, i) => {
      const y = Y0 + 1.55 + i * 0.85;
      bubble(s, x + 0.25, y + 0.08, good ? "○" : "×", { red: !good, w: 0.36, h: 0.48, size: 13 });
      T(s, t, { x: x + 0.75, y, w: bw - 1.0, h: 0.64, size: 14, valign: "middle", name: "Side row" });
    });
  };
  side(M, "同じセッションでセルフレビュー", "生成時の推論の文脈を持ったまま", ["見直しを頼んでも、自分の判断を疑いにくい", "拡張思考で考える量を増やしても、生成時の文脈は残ったまま"], false);
  const rx = W - M - bw;
  arrow(s, M + bw + 0.15, Y0 + h / 2, rx - 0.15, Y0 + h / 2, { color: C.accent1, width: 2.5 });
  side(rx, "独立したレビューインスタンス", "生成側の推論の文脈を持たない", ["セルフレビューの指示や拡張思考より、微妙な問題を見つけるのに効果的（試験ガイド）"], true);
  card(s, { x: M, y: 5.55, w: CW, h: 1.25, title: "Claude Code の公式ドキュメントも同じ立場", fill: C.background1, line: C.accent6, body: "会話を見ていない新しいサブエージェントのレビューは、コードを生んだ推論に引きずられない" });
}

{
  const s = contentSlide("大きなレビューは、ファイル単位と統合のパスに分ける", "1回で全部見せると注意が分散し、深さがばらつき、同じコードに矛盾した指摘も出る");
  const y = Y0, fw = 3.0, fh = 0.62, fg = 0.15;
  T(s, "① ファイル単位の局所パス", { x: M, y, w: fw + 0.5, h: 0.35, size: 14, bold: true, color: C.accent1, name: "Pass label" });
  ["ファイル A", "ファイル B", "ファイル C"].forEach((t, i) => {
    const yy = y + 0.45 + i * (fh + fg);
    box(s, { x: M, y: yy, w: fw, h: fh, fill: C.background2, name: "File pass" });
    T(s, `${t}の中の問題を見る`, { x: M + 0.15, y: yy, w: fw - 0.3, h: fh, size: 14, bold: true, align: "center", valign: "middle", name: "File pass text" });
  });
  const midY = y + 0.45 + (3 * fh + 2 * fg) / 2, ix = M + fw + 0.8, iw = 3.9, ih = 2.1;
  [0, 1, 2].forEach((i) => arrow(s, M + fw + 0.06, y + 0.45 + i * (fh + fg) + fh / 2, ix - 0.06, midY, { color: C.accent4 }));
  T(s, "② ファイル横断の統合パス", { x: ix, y, w: iw, h: 0.35, size: 14, bold: true, color: C.accent1, name: "Pass label" });
  box(s, { x: ix, y: midY - ih / 2, w: iw, h: ih, fill: C.accent1, name: "Integration pass" });
  T(s, ["別のパスで、", "ファイルの間の", "データの流れを確かめる"], { x: ix + 0.25, y: midY - ih / 2, w: iw - 0.5, h: ih, size: 16, bold: true, color: C.background1, align: "center", valign: "middle", name: "Integration text" });
  const vx = ix + iw + 0.6, vw = W - M - vx;
  arrow(s, ix + iw + 0.06, midY, vx - 0.06, midY, { color: C.accent4 });
  T(s, "③ 検証パス（足してもよい）", { x: vx, y, w: vw, h: 0.35, size: 14, bold: true, color: C.accent1, name: "Pass label" });
  box(s, { x: vx, y: midY - ih / 2, w: vw, h: ih, fill: C.background1, line: C.accent1, dash: "dash", name: "Verify pass" });
  T(s, ["各指摘にモデル自身の", "確信度を添えさせ、", "人が確かめる指摘を", "振り分ける"], { x: vx + 0.25, y: midY - ih / 2 + 0.1, w: vw - 0.5, h: ih - 0.2, size: 14, valign: "middle", name: "Verify text" });
  const w2 = colW(2), ty = 4.95, th = 1.6;
  trap(s, { x: M, y: ty, w: w2, h: th }, "コンテキストウィンドウの大きいモデルに変えても、注意の質の問題は解決しない");
  trap(s, { x: M + w2 + 0.3, y: ty, w: w2, h: th }, ["何回か回して一致した指摘だけ残すと、", "まれにしか出ない本物のバグが消える"]);
}

// =====================================================================
// 第7章
chapter(7, "構造化出力とバッチ処理", "分野4 プロンプトエンジニアリングと構造化出力", 20, "44:14",
  "`tool_use` と JSON スキーマ ／ スキーマの設計 ／ 意味の検証\nリトライの限界 ／ バッチ処理 ／ 投入の間隔と出し直し");

{
  const s = contentSlide("抽出は、`tool_use` と JSON スキーマで形を強制する", "抽出用ツールの入力を JSON スキーマで定義する。`tool_use` ブロックの入力が、そのまま抽出結果");
  flow(s, [
    ["抽出用のツールを定義", "入力の形を JSON スキーマで書く"],
    ["Claude がツールを呼ぶ", "`tool_choice` で確実に呼ばせる"],
    ["`tool_use` の入力＝結果", "JSON の構文の誤りがなくなる"],
  ], { y: Y0, h: 1.3, gap: 0.6, hi: [2], titleH: 0.4, descSize: 14 });
  T(s, "`tool_choice` の3つの違い", { x: M, y: 3.5, w: CW, h: 0.38, size: 16, bold: true, name: "Choice head" });
  const w3 = colW(3), cy = 3.95, ch = 2.15;
  card(s, { x: M, y: cy, w: w3, h: ch, title: "`auto`", titleSize: 18, titleColor: C.accent2, fill: C.background1, line: C.accent6, body: "使うかどうかをモデルに任せる。ツールを呼ばずに、テキストで答えることがある" });
  card(s, { x: M + w3 + 0.3, y: cy, w: w3, h: ch, title: "`any`", titleSize: 18, titleColor: C.accent1, body: "必ずどれかのツールを呼ぶ。スキーマが複数あり、文書の種類が分からないときに向く" });
  card(s, { x: M + 2 * (w3 + 0.3), y: cy, w: w3, h: ch, title: "名前を指定する", titleSize: 18, titleColor: C.accent1, body: "そのツールを必ず呼ぶ。ほかの処理の前に、`extract_metadata` での抽出を必ず済ませたいとき" });
  note(s, "2026年11月時点では、新しいモデルの一部で、この2つの強制（`any` と名前の指定）が400のエラーになる。その場合は `auto` にして、ツールに `strict: true` を付ける", { x: M, y: 6.25, w: CW, h: 0.5 });
}

{
  const s = contentSlide("スキーマは、値をでっち上げさせない形にする", "文書にないかもしれない項目まで必須にすると、Claude は必須を満たそうとして値を作り上げる");
  const lw = 5.9;
  T(s, "例：請求書の支払い期日", { x: M, y: Y0, w: lw, h: 0.36, size: 14, bold: true, color: C.accent4, name: "Example head" });
  box(s, { x: M, y: Y0 + 0.45, w: lw, h: 1.1, fill: C.background2, name: "Doc" });
  T(s, ["「期日は基本契約書による」とだけある", "その契約書は、入力にない"], { x: M + 0.25, y: Y0 + 0.55, w: lw - 0.5, h: 0.9, size: 14, bold: true, valign: "middle", name: "Doc text" });
  arrow(s, M + lw / 2, Y0 + 1.6, M + lw / 2, Y0 + 1.9, { color: C.accent4 });
  mark(s, { x: M, y: Y0 + 1.95, w: lw, h: 1.2 }, "bad", "必須のまま。必須を満たそうとして値を作り上げる");
  mark(s, { x: M, y: Y0 + 3.3, w: lw, h: 1.2 }, "good", "任意の項目にして、`null` を許す");
  const rx = M + lw + 0.3, rw = W - M - rx, ch = 1.5, g = 0.17;
  card(s, { x: rx, y: Y0, w: rw, h: ch, title: "`enum` ＋ `other` ＋ 詳細の文字列", titleColor: C.accent1, body: "分類は選べる値の一覧で。一覧にない値に備えて、`other` と詳細を書く文字列を組み合わせる" });
  card(s, { x: rx, y: Y0 + ch + g, w: rw, h: ch, title: "判断できないときの `unclear`", titleColor: C.accent1, body: "判断がつかない場合のための値も、`enum` に用意する" });
  card(s, { x: rx, y: Y0 + 2 * (ch + g), w: rw, h: ch, title: "書式の正規化ルール", titleColor: C.accent1, body: ["元の書式がばらばらなら、", "日付や金額のそろえ方をプロンプトに書く"] });
}

{
  const s = contentSlide("スキーマで防げるのは構文だけ。意味は別に検証する", "検証で誤りが見つかったら、元の文書・失敗した結果・具体的な検証エラーを渡してリトライする");
  const lw = 4.9, h = 2.25;
  box(s, { x: M, y: Y0, w: lw, h, fill: C.background1, line: C.accent2, lineW: 1.75, name: "Semantic" });
  T(s, "意味の誤り（スキーマ上は正しい JSON）", { x: M + 0.25, y: Y0 + 0.2, w: lw - 0.5, h: 0.36, size: 14, bold: true, color: C.accent2, name: "Semantic head" });
  T(s, ["明細を足しても、合計と合わない", "請求先の住所が、送付先の項目に入っている"], { x: M + 0.25, y: Y0 + 0.7, w: lw - 0.5, h: 1.35, size: 14, bullet: true, after: 6, name: "Semantic body" });
  const rx = M + lw + 0.35, rw = W - M - rx, tw = (rw - 0.8) / 2, th = 1.1;
  [["`stated_total`", "文書に書かれた合計"], ["`calculated_total`", "明細から計算した合計"]].forEach(([k, d], i) => {
    const x = rx + i * (tw + 0.8);
    box(s, { x, y: Y0, w: tw, h: th, fill: C.background2, name: "Total" });
    T(s, k, { x: x + 0.2, y: Y0 + 0.15, w: tw - 0.4, h: 0.4, size: 16, bold: true, align: "center", name: "Total key" });
    T(s, d, { x: x + 0.2, y: Y0 + 0.6, w: tw - 0.4, h: 0.36, size: 14, color: C.accent4, align: "center", name: "Total desc" });
  });
  T(s, "≠", { x: rx + tw, y: Y0, w: 0.8, h: th, size: 32, bold: true, color: C.accent2, align: "center", valign: "middle", name: "Neq" });
  T(s, "並べて抽出させ、食い違いをプログラムで見つける。元の文書そのものの矛盾は、`conflict_detected`（真偽値）で示す", { x: rx, y: Y0 + th + 0.2, w: rw, h: 0.95, size: 14, name: "Total note" });
  const w2 = colW(2), cy = 4.5, ch = 1.7;
  card(s, { x: M, y: cy, w: w2, h: ch, title: "リトライで直る", titleColor: C.accent1, body: "書式の食い違いや、構造の誤り。何がどう違うかが分かれば、Claude は自分で直せる" });
  card(s, { x: M + w2 + 0.3, y: cy, w: w2, h: ch, title: "リトライしても直らない", titleColor: C.accent2, fill: C.background1, line: C.accent2, body: "必要な情報が、そもそも文書にない。たとえば、渡していない別紙にしか書かれていない情報" });
  note(s, "指摘を出すタスクでは、各指摘に `detected_pattern` を持たせ、開発者が却下した指摘をパターンごとに分析する", { x: M, y: 6.35, w: CW, h: 0.4 });
}

{
  const s = contentSlide("バッチは、誰も結果を待っていない処理に使う", "Message Batches API は、リクエストをまとめて送り、非同期で処理させる");
  const w3 = colW(3);
  [
    { value: "50", unit: "%", label: "コストの削減", sub: "大量の文書を処理するときの候補" },
    { value: "24", unit: "時間", label: "処理の最大時間", sub: "待ち時間の保証（SLA）はない" },
    { value: "4", unit: "時間ごと", label: "投入の間隔の例", sub: "30時間の SLA を守る、ガイドの例" },
  ].forEach((d, i) => stat(s, { x: M + i * (w3 + 0.3), y: Y0, w: w3, h: 2.6, ...d }));
  const w4 = colW(4), cy = 4.8, ch = 2.0;
  card(s, { x: M, y: cy, w: w4, h: ch, title: "待てる処理だけ", body: "夜間のレポートや週次の監査はバッチ。マージ前のチェックは同期の API" });
  card(s, { x: M + w4 + 0.3, y: cy, w: w4, h: ch, title: "`custom_id` で対応", body: "結果は送った順に返るとは限らない。各リクエストの `custom_id` で対応を取る" });
  card(s, { x: M + 2 * (w4 + 0.3), y: cy, w: w4, h: ch, title: "失敗分だけ出し直す", body: "全体ではなく失敗分を出し直す。上限を超えた文書は分割してから" });
  card(s, { x: M + 3 * (w4 + 0.3), y: cy, w: w4, h: ch, title: "ツールの往復は不可", titleColor: C.accent2, fill: C.background1, line: C.accent2, body: "1つのリクエストの途中で、アプリがツールを実行して結果を返せない" });
}

// =====================================================================
// 第8章
chapter(8, "コンテキスト管理と信頼性", "分野5 コンテキスト管理と信頼性", 15, "50:46",
  "事実の保持 ／ エスカレーション ／ エラーの伝え方\n大きなコードベースの探索 ／ 区分ごとの精度 ／ 主張と出典");

{
  const s = contentSlide("大事な事実は、要約やコンテキストの外に残す", "長い対話でも長い探索でも、情報は縮み、劣化する。落としたくないものは別に置く");
  const w2 = colW(2), rh = 1.3, g = 0.15;
  const col = (x, head, rows) => {
    T(s, head, { x, y: Y0, w: w2, h: 0.4, size: 18, bold: true, color: C.accent1, name: "Col head" });
    rows.forEach(([t, d, kind], i) => {
      const y = Y0 + 0.5 + i * (rh + g);
      box(s, { x, y, w: w2, h: rh, fill: kind === "hi" ? C.background1 : C.background2, line: kind === "hi" ? C.accent1 : kind === "bad" ? C.accent2 : undefined, lineW: 1.75, name: "Ctx row" });
      T(s, t, { x: x + 0.25, y: y + 0.12, w: w2 - 0.5, h: 0.36, size: 16, bold: true, color: kind === "bad" ? C.accent2 : C.text1, name: "Ctx title" });
      T(s, d, { x: x + 0.25, y: y + 0.55, w: w2 - 0.5, h: rh - 0.65, size: 14, name: "Ctx desc" });
    });
  };
  col(M, "長い対話", [
    ["「ケースの事実情報」ブロック", "要約を重ねると、金額や日付、顧客の期待が縮む。取引の事実は別に抜き出し、毎回渡す", "hi"],
    ["ツールの結果は、たまる前に削る", "注文を1回調べると40以上の項目が返るのに、返品に要るのは5つだけ"],
    ["真ん中を落とす（lost in the middle）", "主な発見の要約を先頭に置き、詳細は見出しで整理する"],
  ]);
  col(M + w2 + 0.3, "長い探索", [
    ["劣化のサイン", "前に見つけた具体的なクラスではなく、「よくあるパターン」の話をし始める", "bad"],
    ["スクラッチパッドとサブエージェント", "主な発見はファイルに書き留める。特定の問いはサブエージェントに任せ、長い出力を切り離す", "hi"],
    ["マニフェストと `/compact`", "クラッシュに備え状態を決まった場所に書き、再開時に目録を読む。文脈が埋まったら要約"],
  ]);
}

{
  const s = contentSlide("人を求められたら、調べる前にすぐ引き継ぐ", "引き継ぎのきっかけは3つ。単に複雑なだけでは、きっかけにならない");
  const lw = 6.6, h = 3.0;
  box(s, { x: M, y: Y0, w: lw, h, fill: C.background2, name: "Escalate" });
  T(s, "人の担当者に引き継ぐ", { x: M + 0.25, y: Y0 + 0.2, w: lw - 0.5, h: 0.4, size: 18, bold: true, color: C.accent1, name: "Esc head" });
  [
    "顧客がはっきり人を求めた。調べる前に、すぐ応じる",
    "方針に例外や抜けがある。例：自社サイトの価格調整しか決めていないのに、競合の価格に合わせてほしい",
    "前進できない",
  ].forEach((t, i) => {
    const y = Y0 + 0.75 + [0, 0.62, 1.55][i];
    bubble(s, M + 0.25, y + 0.04, i + 1, { w: 0.36, h: 0.48, size: 13 });
    T(s, t, { x: M + 0.8, y, w: lw - 1.05, h: i === 1 ? 0.88 : 0.56, size: 14, valign: i === 1 ? "top" : "middle", name: "Esc row" });
  });
  const rx = M + lw + 0.3, rw = W - M - rx;
  box(s, { x: rx, y: Y0, w: rw, h, fill: C.background1, line: C.accent6, name: "Handle" });
  T(s, "まず対応する", { x: rx + 0.25, y: Y0 + 0.2, w: rw - 0.5, h: 0.4, size: 18, bold: true, color: C.accent4, name: "Handle head" });
  T(s, ["不満を述べているだけで、対応できる問題なら、気持ちを受け止めて解決を申し出る", "重ねて求められたら、引き継ぐ"], { x: rx + 0.25, y: Y0 + 0.75, w: rw - 0.5, h: 2.05, size: 14, bullet: true, after: 8, name: "Handle body" });
  const by = 5.2, bh = 1.6, tw = 8.0;
  trap(s, { x: M, y: by, w: tw, h: bh }, ["顧客の感情や、モデルが自己申告する確信度で決めない。どちらも複雑さの目安にならない", "システムプロンプトに、明示的な基準と few-shot の例を書く"]);
  const cx = M + tw + 0.3;
  card(s, { x: cx, y: by, w: W - M - cx, h: bh, title: "候補の顧客が複数なら", body: ["推測で選ばず、", "追加の識別情報を尋ねる"] });
}

{
  const s = contentSlide("エラーは、文脈ごとコーディネーターに返す", "サブエージェントの失敗は、コーディネーターが立て直し方を判断できる形で伝える");
  const lw = 6.0, tw = (lw - 0.2) / 2, th = 0.95, g = 0.15;
  T(s, "構造化して返す4つ", { x: M, y: Y0, w: lw, h: 0.38, size: 16, bold: true, name: "Err head" });
  ["失敗の種類", "試した問い合わせ", "途中までの結果", "別のやり方"].forEach((t, i) => {
    const x = M + (i % 2) * (tw + 0.2), y = Y0 + 0.5 + Math.floor(i / 2) * (th + g);
    box(s, { x, y, w: tw, h: th, fill: C.accent1, name: "Err item" });
    T(s, t, { x: x + 0.15, y, w: tw - 0.3, h: th, size: 16, bold: true, color: C.background1, align: "center", valign: "middle", name: "Err item text" });
  });
  const rx = M + lw + 0.35, rw = W - M - rx;
  T(s, "誤答の型", { x: rx, y: Y0, w: rw, h: 0.38, size: 16, bold: true, color: C.accent2, name: "Anti head" });
  [
    "空の結果を成功として返し、エラーを握りつぶす",
    "1つの失敗で、全体を止める",
    "「検索を利用できません」とだけ返す",
  ].forEach((t, i) => {
    const y = Y0 + 0.5 + i * 0.7;
    box(s, { x: rx, y, w: rw, h: 0.6, fill: C.background1, line: C.accent2, name: "Anti row" });
    bubble(s, rx + 0.15, y + 0.06, "×", { red: true, w: 0.36, h: 0.48, size: 13 });
    T(s, t, { x: rx + 0.65, y, w: rw - 0.85, h: 0.6, size: 14, valign: "middle", name: "Anti text" });
  });
  const w3 = colW(3), cy = 4.85, ch = 1.95;
  card(s, { x: M, y: cy, w: w3, h: ch, num: "○", title: "アクセスの失敗と空の結果", body: "タイムアウトのようなアクセスの失敗と、検索は成功したが該当がない、有効な空の結果を区別する" });
  card(s, { x: M + w3 + 0.3, y: cy, w: w3, h: ch, num: "○", title: "一時的な障害は手元で", body: "サブエージェントの中で立て直し、直らないものだけをコーディネーターへ上げる" });
  card(s, { x: M + 2 * (w3 + 0.3), y: cy, w: w3, h: ch, num: "○", title: "足りない領域を注記", body: "最後のレポートに、情報源が足りなかった領域を書いておく" });
}

{
  const s = contentSlide("精度は区分ごとに確かめ、主張は出典と対応させる", "人のレビューを減らすときも、情報源をまとめるときも、判断の材料を消さない");
  const lw = 5.7;
  stat(s, { x: M, y: Y0, w: lw, h: 2.6, value: "97", unit: "%", label: "全体の精度が高くても", sub: "特定の文書の種類や項目で、低い精度が隠れていることがある" });
  T(s, [
    "レビューを減らす前に、文書の種類と項目ごとに確かめる",
    "確信度は、項目ごとにモデルに出させる",
    "しきい値は、ラベル付きの検証用データで調整する",
    "確信度の高い抽出も、層化無作為抽出でエラー率を測り続ける",
  ], { x: M, y: Y0 + 2.8, w: lw, h: 2.05, size: 14, bullet: true, after: 8, name: "Review bullets" });
  const rx = M + lw + 0.4, rw = W - M - rx, sw = (rw - 0.3) / 2, sh = 1.05;
  [["報告書 A ・ 2年前", "市場規模 X"], ["報告書 B ・ 今年", "市場規模 Y"]].forEach(([t, v], i) => {
    const x = rx + i * (sw + 0.3);
    box(s, { x, y: Y0, w: sw, h: sh, fill: C.background2, name: "Source" });
    T(s, t, { x: x + 0.2, y: Y0 + 0.12, w: sw - 0.4, h: 0.34, size: 14, bold: true, color: C.accent4, name: "Source name" });
    T(s, v, { x: x + 0.2, y: Y0 + 0.5, w: sw - 0.4, h: 0.4, size: 16, bold: true, name: "Source value" });
  });
  arrow(s, rx + rw / 2, Y0 + sh + 0.06, rx + rw / 2, Y0 + sh + 0.36, { color: C.accent1, width: 2 });
  box(s, { x: rx, y: Y0 + sh + 0.42, w: rw, h: 1.2, fill: C.accent1, name: "Keep both" });
  T(s, "一方を選ばず、両方を出典と公表日付きで残し、食い違いを注記する。折り合いはコーディネーターが決める", { x: rx + 0.25, y: Y0 + sh + 0.5, w: rw - 0.5, h: 1.04, size: 14, bold: true, color: C.background1, valign: "middle", name: "Keep text" });
  T(s, [
    "主張ごとに、出典の URL・文書名・抜粋を構造化して出させる",
    "公表日で、時期の違いを矛盾と取り違えない",
    "確立した発見と、議論のある発見を分けて書く",
  ], { x: rx, y: Y0 + 2.9, w: rw, h: 1.95, size: 14, bullet: true, after: 8, name: "Source bullets" });
}

// =====================================================================
// まとめ
section("まとめ");
{
  const s = slide("CLOSING");
  s.addText("試験直前チェック10", { placeholder: "title" });
  const items = [
    "`stop_reason` で回す。上限は安全網",
    "必ず守らせることは、ゲートとフックで強制",
    "サブエージェントには文脈を丸ごと構造化して渡す",
    ["ツールの説明が選択の決め手。", "ツールは役割に必要な分だけ"],
    ["エラーは種類とリトライ可否を付け、", "空の結果と区別"],
    ["チームの規約はプロジェクトの CLAUDE.md、", "散らばるなら `paths`"],
    "複雑ならプランモード。CI は `-p` と JSON 出力",
    ["報告条件は具体的に。", "レビューは独立したインスタンス"],
    ["スキーマで形を、検証で意味を。", "ない情報は `null` 可"],
    "事実はブロックで保持。人の要求はすぐ引き継ぐ",
  ];
  const cw = (CW - 0.5) / 2, rh = 1.0;
  items.forEach((t, i) => {
    const x = M + Math.floor(i / 5) * (cw + 0.5), y = 1.45 + (i % 5) * (rh + 0.06);
    bubble(s, x, y + 0.23, i + 1, { dark: true, size: 13 });
    T(s, t, { x: x + 0.6, y, w: cw - 0.6, h: rh, size: 15, color: C.background1, valign: "middle", name: "Check item" });
  });
}
{
  const s = slide("CLOSING");
  s.addText("次のステップ", { placeholder: "title" });
  const steps = [["音声で全体像をつかむ", "約61分。章ごとのミニクイズ付き"], ["問題集アプリで解く", "120問。模擬試験は本番と同じく、4つのシナリオから60問・120分"], ["間違えた分野を復習する", "このスライドと解説で弱点を埋める"]];
  const bw = 3.45, gap = (CW - 3 * bw) / 2;
  steps.forEach(([t, d], i) => {
    const x = M + i * (bw + gap), y = 2.1;
    bubble(s, x + bw / 2 - 0.55, y, i + 1, { dark: true, filled: i === 1, w: 1.1, h: 1.5, size: 40, lineW: 2.5 });
    T(s, t, { x, y: y + 1.8, w: bw, h: 0.45, size: 20, bold: true, color: C.background1, align: "center", name: "Next title" });
    T(s, d, { x, y: y + 2.35, w: bw, h: 0.9, size: 14, color: C.accent5, align: "center", name: "Next desc" });
    if (i < 2) arrow(s, x + bw + 0.1, y + 0.75, x + bw + gap - 0.1, y + 0.75, { color: C.accent5, width: 2 });
  });
  T(s, "非公式の学習用教材です。試験の形式と配点は、公式の試験ガイド バージョン1.0（2026年7月発効）に基づきます。内容は2026年11月時点の公式ドキュメントで確認していますが、受験前に公式の試験ガイドで最新の内容を確認してください。", { x: M, y: 6.0, w: CW, h: 0.65, size: 12, color: C.accent5, name: "Disclaimer" });
}
deck.save(OUT).catch((e) => { console.error(e); process.exit(1); });

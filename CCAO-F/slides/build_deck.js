// CCAO-F キャッチアップ講座のスライド（pptx）を生成する。
// 使い方: node slides/build_deck.js [出力.pptx]   （省略時は ../CCAO-F_キャッチアップ講座.pptx）
// 共通部品は ../../shared/slides/deck_lib.js。確認用の画像は shared/slides/render.py で作る。
// 内容の「正」は course/ の本文（ch00a・ch00b・ch01〜ch08・ch99）。本文にない事実は足さない。
const path = require("path");
const { createDeck } = require("../../shared/slides/deck_lib.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "CCAO-F_キャッチアップ講座.pptx");
const deck = createDeck({
  code: "CCAO-F",
  title: "CCAO-F キャッチアップ講座",
  subject: "Claude Certified Associate – Foundations 学習用（非公式）",
});
const { pres, C, SH, HEX, W, M, CW, Y0, T, box, bubble, arrow, pill, card, trap, stat, section, slide, contentSlide, divider, estHeight } = deck;

// ---------- この試験用の小さな部品 ----------
const cw = (n, gap = 0.3, w = CW) => (w - (n - 1) * gap) / n;

// ×（誤り）と ○（正しい）の枠
function verdict(s, { x, y, w, h, good = false, title, text, size = 14 }) {
  box(s, { x, y, w, h, fill: good ? C.background2 : C.background1, line: good ? undefined : C.accent2, lineW: 1.75, name: good ? "Good" : "Bad" });
  bubble(s, x + 0.25, y + (h - 0.54) / 2, good ? "○" : "×", { red: !good, size: 16 });
  const tx = x + 0.85, tw = w - 1.1;
  if (title) {
    const th = estHeight([title], 16, tw);
    const bh = text ? estHeight([text], size, tw) : 0;
    const total = th + (text ? 0.08 + bh : 0);
    const ty = y + Math.max(0.12, (h - total) / 2);
    T(s, title, { x: tx, y: ty, w: tw, h: th, size: 16, bold: true, color: good ? C.accent1 : C.accent2, name: "Verdict title" });
    if (text) T(s, text, { x: tx, y: ty + th + 0.08, w: tw, h: y + h - 0.12 - (ty + th + 0.08), size, name: "Verdict text" });
  } else {
    T(s, text, { x: tx, y: y + 0.12, w: tw, h: h - 0.24, size, valign: "middle", name: "Verdict text" });
  }
}

// 番号付きの流れ図（横）。items: [見出し, 説明, タグ]。hi は強調する箱の番号（0始まり）
function flow(s, items, { x = M, y, w = CW, h, gap = 0.45, hi = [], titleSize = 15, descSize = 12, th = 0.65 }) {
  const n = items.length, bw = (w - (n - 1) * gap) / n;
  items.forEach(([t, d, tag], i) => {
    const bx = x + i * (bw + gap), on = hi.includes(i);
    const fg = on ? C.background1 : C.text1, cc = on ? C.background1 : C.accent1;
    box(s, { x: bx, y, w: bw, h, fill: on ? C.accent1 : C.background2, name: "Flow step" });
    bubble(s, bx + 0.18, y + 0.15, i + 1, { w: 0.36, h: 0.48, size: 13 });
    if (tag) T(s, tag, { x: bx + 0.66, y: y + 0.15, w: bw - 0.84, h: 0.48, size: 12, bold: true, color: on ? C.accent5 : C.accent4, valign: "middle", name: "Flow tag" });
    T(s, t, { x: bx + 0.18, y: y + 0.72, w: bw - 0.36, h: th, size: titleSize, bold: true, color: fg, codeColor: cc, name: "Flow title" });
    if (d) T(s, d, { x: bx + 0.18, y: y + 0.72 + th + 0.05, w: bw - 0.36, h: y + h - 0.12 - (y + 0.72 + th + 0.05), size: descSize, color: on ? C.background1 : C.text1, name: "Flow desc" });
    if (i < n - 1) arrow(s, bx + bw + 0.06, y + h / 2, bx + bw + gap - 0.06, y + h / 2);
  });
  return bw;
}

// 小見出し（本文の上のラベル）
function label(s, text, { x = M, y, w = CW, color = C.accent4, size = 14 }) {
  T(s, text, { x, y, w, h: size >= 16 ? 0.4 : 0.35, size, bold: true, color, name: "Label" });
}

// =====================================================================
// 1. 表紙
section("はじめに");
{
  const s = slide("TITLE");
  s.addText("CCAO-F\nキャッチアップ講座", { placeholder: "title" });
  s.addText("Claude Certified Associate – Foundations の\n出題範囲を、7つの分野・8つの章で復習する", { placeholder: "subtitle" });
  T(s, "非公式の学習用教材 ・ 音声講座（約64分）と同じ章立て", { x: 0.8, y: 5.75, w: 8, h: 0.4, size: 14, color: C.accent5, name: "Title note" });
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
  const s = contentSlide("60問・120分、スコア720で合格", "スコアは100〜1000。720は「72%正解」という意味ではなく、換算の方法は公開されていない");
  const w = cw(4);
  [
    { value: "60", unit: "問", label: "問題数", sub: ["択一式と複数選択式", "選ぶ数は問題に明記"] },
    { value: "120", unit: "分", label: "試験時間", sub: ["業務の場面から、", "最も適切な行動を選ぶ"] },
    { value: "720", unit: "点", label: "合格点", sub: ["100〜1000のスコア", "「72%正解」ではない"] },
    { value: "7", unit: "分野", label: "出題範囲", sub: ["最大は分野2の21%", "（出力の評価と検証）"] },
  ].forEach((d, i) => stat(s, { x: M + i * (w + 0.3), y: Y0 + 0.1, w, h: 3.0, ...d }));
  T(s, ["公式の試験ガイド バージョン1.0（2026年7月発効）に基づく。2026年12月7日に試験内容の更新が予定されている。", "受験前に最新の試験ガイドを確認してください。"], { x: M, y: 5.45, w: CW, h: 0.6, size: 12, color: C.accent4, name: "Caveat" });
}

// 3. 配点
{
  const s = contentSlide("分野2・4・6 で全体の半分を超える", "最大は分野2 出力の評価と検証。確かめる、組み込む、守るを厚めに学ぶ");
  const labels = ["分野2 出力の評価と検証", "分野4 ワークフロー統合とソリューション設計", "分野6 ガバナンス、リスク、責任ある利用", "分野1 プロンプト作成とタスク実行", "分野3 製品とモデルの選択", "分野5 設定とナレッジ管理", "分野7 トラブルシューティングと最適化"];
  const values = [21, 16, 15, 14, 12, 12, 10];
  s.addChart(pres.charts.BAR, [{ name: "配点（%）", labels, values }], {
    x: M, y: Y0, w: 7.6, h: 4.8, barDir: "bar", catAxisOrientation: "maxMin",
    chartColors: [HEX.accent1, HEX.accent1, HEX.accent1, "7FB2AD", "7FB2AD", "7FB2AD", "7FB2AD"],
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', dataLabelFontSize: 12, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
    catAxisLabelFontSize: 12, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", catAxisLineShow: false,
    valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 25, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: false, barGapWidthPct: 45,
    showTitle: true, title: "分野別の配点（%）", titleFontSize: 14, titleColor: HEX.accent4, titleFontFace: "+mn-lt",
  });
  const x = 8.55, w = W - M - x, h = 1.55;
  card(s, { x, y: Y0, w, h, num: 1, title: "分野2 だけで5分の1超", body: "出力の評価と検証。第2章と第3章の2つに分けて学ぶ" });
  card(s, { x, y: Y0 + 1.65, w, h, num: 2, title: "分野2・4・6 で52%", body: "確かめる、組み込む、守るを厚めに" });
  card(s, { x, y: Y0 + 3.3, w, h, num: 3, title: "問われるのは判断", body: "仕様の暗記より、業務の場面で最も適切な行動を選ぶ" });
}

// =====================================================================
// 第1章
divider(1, "伝わるプロンプトの作り方", "分野1 プロンプト作成とタスク実行 ・ 配点 14% ・ 音声 3:48〜", "目的・対象者・要点・形式・長さ ／ 段階に分けて頼む\n足りなかった部品を足す ／ タスクの種類で頼み方を変える");

{
  const s = contentSlide("依頼には、目的・対象者・要点・形式・長さを書く", "Claude は優秀だが、職場の事情を知らない新人。予備知識のない人に頼むつもりで書く");
  const w5 = cw(5, 0.2), ch = 1.25;
  [
    ["目的", "何のための文章か"],
    ["対象者", "誰が読むのか"],
    ["要点", "必ず入れたい要点"],
    ["形式", "箇条書きか、メールか"],
    ["長さ", "例: A4の半分に収める"],
  ].forEach(([t, d], i) => {
    const x = M + i * (w5 + 0.2);
    box(s, { x, y: Y0, w: w5, h: ch, fill: C.background2, name: "Part" });
    T(s, t, { x: x + 0.18, y: Y0 + 0.14, w: w5 - 0.36, h: 0.42, size: 20, bold: true, color: C.accent1, name: "Part name" });
    T(s, d, { x: x + 0.18, y: Y0 + 0.62, w: w5 - 0.36, h: 0.52, size: 12, name: "Part desc" });
  });
  // 頼み方の前後
  const y = 3.4, h = 1.8, lw = 4.75, rx = M + lw + 0.55, rw = W - M - rx;
  box(s, { x: M, y, w: lw, h, fill: C.background1, line: C.accent2, lineW: 1.75, name: "Bad" });
  bubble(s, M + 0.25, y + 0.22, "×", { red: true, size: 16 });
  T(s, ["「第3四半期の結果について", "何か書いて」"], { x: M + 0.85, y: y + 0.2, w: lw - 1.1, h: 0.7, size: 16, bold: true, name: "Bad prompt" });
  T(s, ["誰に、何のためにが書かれていない", "→ 当たり障りのない一般的な文章"], { x: M + 0.85, y: y + 1.0, w: lw - 1.1, h: 0.62, size: 14, color: C.accent4, name: "Bad result" });
  arrow(s, M + lw + 0.08, y + h / 2, rx - 0.08, y + h / 2, { color: C.accent1, width: 2.5 });
  box(s, { x: rx, y, w: rw, h, fill: C.background2, name: "Good" });
  bubble(s, rx + 0.25, y + 0.22, "○", { size: 16 });
  T(s, "「来週の役員会で配る資料です。読むのは役員です。伝えたい結果は3つです。箇条書きで、A4の半分に収めてください」", { x: rx + 0.85, y: y + 0.2, w: rw - 1.1, h: 0.62, size: 14, bold: true, name: "Good prompt" });
  T(s, "→ そのまま共有できる下書きに近づく", { x: rx + 0.85, y: y + 1.05, w: rw - 1.1, h: 0.35, size: 14, bold: true, color: C.accent1, name: "Good result" });
  const w3 = cw(3), cy = 5.4, chh = 1.4;
  card(s, { x: M, y: cy, w: w3, h: chh, title: "理由を一言添える", body: "細かい判断も、目的に沿ってくれる" });
  card(s, { x: M + w3 + 0.3, y: cy, w: w3, h: chh, title: "長いほど良いわけではない", body: "必要な部品を、過不足なく入れる" });
  card(s, { x: M + 2 * (w3 + 0.3), y: cy, w: w3, h: chh, title: "部品の型はくり返し使える", body: "技術的な仕事でも同じ。プロジェクトの指示に入れる方法は第6章" });
}

{
  const s = contentSlide("大きな依頼は段階に分け、途中で確かめる", "前の段階の結果が、次の段階の材料になる。ずれをその時点で直せる");
  label(s, "例: 社内の規程集から、新入社員向けの研修資料をまとめる", { y: Y0 });
  const bw = flow(s, [
    ["項目を書き出してもらう", "規程集から、知るべき項目を"],
    ["一覧を人が見て直す", "足りない・不要な項目を直す", "人が確かめる"],
    ["説明文を書いてもらう", "項目ごとに"],
    ["言葉づかいをそろえる", "最後に全体を通して"],
  ], { y: 2.45, h: 2.05, hi: [1] });
  T(s, "抜けがあれば、ここで直せる", { x: M + bw + 0.45 - 0.3, y: 4.56, w: bw + 0.6, h: 0.32, size: 12, bold: true, color: C.accent2, align: "center", name: "Check note" });
  const w3 = cw(3), y = 5.0, h = 1.8;
  card(s, { x: M, y, w: w3, h, num: "×", red: true, fill: C.background1, line: C.accent2, title: "一度にまとめて頼む", body: ["「規程集から研修資料を作って」", "では、ずれた場所が分かりにくい"] });
  card(s, { x: M + w3 + 0.3, y, w: w3, h, title: "手順を並べて示すのも分解", body: "1つのプロンプトの中で、手順を順番に書き並べる" });
  card(s, { x: M + 2 * (w3 + 0.3), y, w: w3, h, title: "最近のモデルでも有効", body: "多くの段階を自分の中で進められる。途中を確かめたいなら分けて頼む（2026年11月時点）" });
}

{
  const s = contentSlide("直すときは、足りなかった部品を見つけて足す", "最初から完璧な結果が出ることはまれ。大事なのは直し方");
  const lw = 4.4, lh = 3.2;
  box(s, { x: M, y: Y0, w: lw, h: lh, fill: C.background1, line: C.accent2, lineW: 1.75, name: "Bad way" });
  T(s, "よくない直し方", { x: M + 0.25, y: Y0 + 0.2, w: lw - 0.5, h: 0.42, size: 18, bold: true, color: C.accent2, name: "Bad title" });
  [["何も変えずに", "「もう一度」と頼み直す"], ["思いついた指示を、", "手当たりしだいに足す"]].forEach((t, i) => {
    const y = Y0 + 0.8 + i * 0.85;
    bubble(s, M + 0.25, y + 0.08, "×", { red: true, size: 16 });
    T(s, t, { x: M + 0.85, y, w: lw - 1.1, h: 0.7, size: 14, valign: "middle", name: "Bad item" });
  });
  T(s, "これでは、何が効いたのかが分からない", { x: M + 0.25, y: Y0 + 2.55, w: lw - 0.5, h: 0.45, size: 14, bold: true, color: C.accent4, name: "Bad note" });
  const rx = M + lw + 0.3, rw = W - M - rx;
  T(s, "よい直し方: 結果を見て、足りなかった部品を見極める", { x: rx, y: Y0, w: rw, h: 0.42, size: 18, bold: true, color: C.accent1, name: "Good title" });
  const sw = 3.0, pw = rw - sw - 0.5;
  T(s, "結果の症状", { x: rx, y: Y0 + 0.55, w: sw, h: 0.3, size: 12, bold: true, color: C.accent4, name: "Col head" });
  T(s, "足りなかった部品", { x: rx + sw + 0.5, y: Y0 + 0.55, w: pw, h: 0.3, size: 12, bold: true, color: C.accent4, name: "Col head" });
  [["内容が一般的すぎる", "目的や具体的な条件"], ["言葉が難しすぎる", "対象者の説明"], ["形式が毎回ばらばら", "形式の指定や、見本になる例"]].forEach(([a, b], i) => {
    const y = Y0 + 0.9 + i * 0.6;
    box(s, { x: rx, y, w: sw, h: 0.5, fill: C.background2, r: 0.08, name: "Symptom" });
    T(s, a, { x: rx + 0.2, y, w: sw - 0.4, h: 0.5, size: 14, bold: true, valign: "middle", name: "Symptom text" });
    arrow(s, rx + sw + 0.08, y + 0.25, rx + sw + 0.42, y + 0.25, { color: C.accent1 });
    box(s, { x: rx + sw + 0.5, y, w: pw, h: 0.5, fill: C.background1, line: C.accent1, r: 0.08, name: "Part" });
    T(s, b, { x: rx + sw + 0.7, y, w: pw - 0.4, h: 0.5, size: 14, bold: true, color: C.accent1, valign: "middle", name: "Part text" });
  });
  box(s, { x: rx, y: Y0 + 2.7, w: rw, h: 0.5, fill: C.text2, r: 0.08, name: "Then" });
  T(s, "そこを足し、直したあとの結果で、効いたかを確かめる", { x: rx + 0.2, y: Y0 + 2.7, w: rw - 0.4, h: 0.5, size: 14, bold: true, color: C.background1, valign: "middle", name: "Then text" });
  label(s, "例: 発表文の要約が専門用語だらけで、お客さま向けのメールに使えない", { y: 5.32 });
  const w2 = cw(2);
  verdict(s, { x: M, y: 5.72, w: w2, h: 1.08, text: "同じプロンプトで生成し直す、上位のモデルに替える ― ずれの原因に手を付けていない" });
  verdict(s, { x: M + w2 + 0.3, y: 5.72, w: w2, h: 1.08, good: true, text: ["読むのは一般のお客さまだと伝え、", "言い換えを頼んで、結果を確かめる"] });
}

{
  const s = contentSlide("タスクの種類で、頼み方を変える", "試験ガイドが挙げる4つ。1つの型を、どの仕事にもそのまま使い回さない");
  const w2 = cw(2), h = 1.5;
  [
    ["分析", "何を見てほしいかを、手順で示す", "データ不足なら、推測せず「分からない」と言ってもらう"],
    ["調査", "何が分かれば十分か、基準を先に伝える", "そのうえで、複数の情報源で確かめるよう頼む"],
    ["下書き", "対象者、口調、形式、長さを具体的に伝える", "過去のよい文面を、見本として見せる"],
    ["ブレインストーミング", "絞り込みすぎず、方向の違う案をたくさん頼む", "出てきた案に意見を返し、対話で広げる"],
  ].forEach(([n, head, d], i) => {
    const x = M + (i % 2) * (w2 + 0.3), y = Y0 + Math.floor(i / 2) * (h + 0.2);
    box(s, { x, y, w: w2, h, fill: C.background2, name: "Task type" });
    T(s, n, { x: x + 0.25, y: y + 0.16, w: w2 - 0.5, h: 0.42, size: 20, bold: true, color: C.accent1, name: "Type name" });
    T(s, head, { x: x + 0.25, y: y + 0.64, w: w2 - 0.5, h: 0.32, size: 14, bold: true, name: "Type head" });
    T(s, d, { x: x + 0.25, y: y + 1.0, w: w2 - 0.5, h: 0.32, size: 14, color: C.accent4, name: "Type desc" });
  });
  label(s, "分析の手順の例（売上の表）", { y: 5.38 });
  const steps = ["よく売れた商品を挙げる", "前の四半期と比べる", "目立つ変化を探す", "理由の候補を挙げる"];
  const gap = 0.45, bw = cw(4, gap), y = 5.8, bh = 1.0;
  steps.forEach((t, i) => {
    const x = M + i * (bw + gap);
    box(s, { x, y, w: bw, h: bh, fill: C.background1, line: C.accent1, name: "Analysis step" });
    T(s, t, { x: x + 0.15, y, w: bw - 0.3, h: bh, size: 14, bold: true, align: "center", valign: "middle", name: "Analysis text" });
    if (i < 3) arrow(s, x + bw + 0.06, y + bh / 2, x + bw + gap - 0.06, y + bh / 2);
  });
}

// =====================================================================
// 第2章
divider(2, "出力を確かめる", "分野2 出力の評価と検証（前半） ・ 配点 21% ・ 音声 11:01〜", "正確性と網羅性 ／ ハルシネーション ／ 不整合とバイアス\n一次情報との照合 ／ 検証にならない対処");

{
  const s = contentSlide("正確さと抜けのなさは、別々に確かめる", "正しいことだけが書かれていても、抜けがあれば、読んだ人は判断を誤る");
  const w2 = cw(2), h = 1.45;
  [["正確性", "事実や元の資料と合っているか"], ["網羅性", "入るべきことが抜けていないか"]].forEach(([n, d], i) => {
    const x = M + i * (w2 + 0.3);
    box(s, { x, y: Y0, w: w2, h, fill: C.background2, name: "Axis" });
    T(s, n, { x: x + 0.3, y: Y0, w: 1.9, h, size: 28, bold: true, color: C.accent1, valign: "middle", name: "Axis name" });
    T(s, d, { x: x + 2.3, y: Y0, w: w2 - 2.5, h, size: 16, bold: true, valign: "middle", name: "Axis desc" });
  });
  const y = 3.65, bh = 3.15;
  // 例
  box(s, { x: M, y, w: w2, h: bh, fill: C.background1, line: C.accent6, name: "Example" });
  T(s, "例: 会議の書き起こし → 議事録の要約", { x: M + 0.25, y: y + 0.2, w: w2 - 0.5, h: 0.4, size: 16, bold: true, name: "Example title" });
  [
    ["○", false, "数字や日付は、すべて正しい", "正確性は合格"],
    ["×", true, "期限や担当者が抜けている", "網羅性で不合格"],
  ].forEach(([mk, red, t, tag], i) => {
    const ry = y + 0.8 + i * 0.8;
    bubble(s, M + 0.25, ry + 0.03, mk, { red, size: 16 });
    T(s, t, { x: M + 0.85, y: ry, w: w2 - 3.0, h: 0.6, size: 14, bold: true, valign: "middle", name: "Example row" });
    T(s, tag, { x: M + w2 - 2.05, y: ry, w: 1.8, h: 0.6, size: 12, bold: true, color: red ? C.accent2 : C.accent1, align: "right", valign: "middle", name: "Example tag" });
  });
  T(s, "→ 使えない議事録。読んだ人が判断を誤る", { x: M + 0.25, y: y + 2.45, w: w2 - 0.5, h: 0.4, size: 16, bold: true, color: C.accent2, name: "Example result" });
  // 抜けの見つけ方
  const rx = M + w2 + 0.3;
  box(s, { x: rx, y, w: w2, h: bh, fill: C.background2, name: "How" });
  T(s, "抜けの見つけ方", { x: rx + 0.25, y: y + 0.2, w: w2 - 0.5, h: 0.4, size: 16, bold: true, name: "How title" });
  bubble(s, rx + 0.25, y + 0.75, 1, { w: 0.36, h: 0.48, size: 13 });
  T(s, "入っているべき項目を、先に挙げる", { x: rx + 0.75, y: y + 0.75, w: w2 - 1.0, h: 0.48, size: 14, bold: true, valign: "middle", name: "How step" });
  ["決定事項", "期限", "担当者"].forEach((t, i) => pill(s, t, { x: rx + 0.75 + i * 1.45, y: y + 1.35, w: 1.3, h: 0.36, fill: C.accent1, size: 13 }));
  bubble(s, rx + 0.25, y + 1.9, 2, { w: 0.36, h: 0.48, size: 13 });
  T(s, "一つずつ探す", { x: rx + 0.75, y: y + 1.9, w: w2 - 1.0, h: 0.48, size: 14, bold: true, valign: "middle", name: "How step" });
  T(s, "なんとなく読み流すだけでは、抜けには気づけない", { x: rx + 0.25, y: y + 2.5, w: w2 - 0.5, h: 0.35, size: 14, color: C.accent4, name: "How note" });
}

{
  const s = contentSlide("具体的な細部ほど、作られていないか疑う", "ハルシネーション: もっともらしいのに実は間違っている内容を、AI が自信をもって述べる誤り");
  const lw = 7.0;
  label(s, "本物らしく見える細部", { y: Y0, w: lw, size: 16, color: C.text1 });
  const chips = [[["数字", 1.2], ["人や会社の名前", 2.45], ["日付", 1.2]], [["規程の条項の番号", 2.75], ["ウェブページのアドレス", 3.3]]];
  chips.forEach((row, r) => {
    let x = M;
    row.forEach(([t, w]) => {
      box(s, { x, y: Y0 + 0.5 + r * 0.65, w, h: 0.5, fill: C.background2, r: 0.25, name: "Detail chip" });
      T(s, t, { x, y: Y0 + 0.5 + r * 0.65, w, h: 0.5, size: 16, bold: true, color: C.accent1, align: "center", valign: "middle", name: "Detail text" });
      x += w + 0.2;
    });
  });
  const rx = M + lw + 0.3, rw = W - M - rx;
  card(s, { x: rx, y: Y0, w: rw, h: 1.65, title: "権威がありそうな引用", fill: C.background1, line: C.accent6, body: "ヘルプセンターも、Claude が権威がありそうな引用を作ることがあると注意している" });
  label(s, "どれも、正しさの証拠にならない", { y: 3.8, color: C.accent2, size: 16 });
  const w3 = cw(3);
  ["具体的であること", "文章が流ちょうなこと", "言い切っていること"].forEach((t, i) => verdict(s, { x: M + i * (w3 + 0.3), y: 4.25, w: w3, h: 0.9, title: t }));
  card(s, { x: M, y: 5.4, w: CW, h: 1.4, title: "最近の出来事にも注意", body: "Claude の知識には、学習した時点という区切りがある。ウェブ検索を使わないと、新しい制度や数字を古いまま答えることがある" });
}

{
  const s = contentSlide("食い違いは比べて見つけ、偏りは聞き方も疑う", "不整合は内容どうしの食い違い。バイアスは、特定の人々や立場への不公平な偏り");
  const lw = 5.9;
  label(s, "不整合: 3つの比べ方", { y: Y0, w: lw, size: 18, color: C.accent1 });
  [
    ["出力の中で比べる", "本文では売上が増えたのに、表では減っている"],
    ["渡した資料と比べる", "資料にない話や、資料と違う数字が混ざっていないか"],
    ["繰り返して比べる", "同じ依頼を何度かする。毎回違う部分は、作られた内容かもしれない"],
  ].forEach(([t, d], i) => {
    const y = Y0 + 0.6 + i * 1.4;
    box(s, { x: M + 0.6, y, w: lw - 0.6, h: 1.25, fill: C.background2, name: "Compare row" });
    bubble(s, M, y + 0.36, i + 1);
    T(s, t, { x: M + 0.85, y: y + 0.12, w: lw - 1.1, h: 0.36, size: 16, bold: true, name: "Compare title" });
    T(s, d, { x: M + 0.85, y: y + 0.52, w: lw - 1.1, h: 0.62, size: 14, name: "Compare desc" });
  });
  const rx = M + lw + 0.3, rw = W - M - rx;
  card(s, { x: rx, y: Y0, w: rw, h: 2.2, title: "バイアス: 人や立場への不公平な偏り", bullet: true, body: [
    "学習したデータの偏りが、出力に表れることがある",
    "例: 求人の文面に、特定の年齢や性別を思わせる言い回し",
    "例: ある案の利点だけが並び、リスクが書かれていない",
  ] });
  const y = Y0 + 2.4, h = 2.45;
  box(s, { x: rx, y, w: rw, h, fill: C.background1, line: C.accent1, lineW: 1.5, name: "Sycophancy" });
  T(s, "迎合: 相手が聞きたそうな答えに寄る", { x: rx + 0.22, y: y + 0.18, w: rw - 0.44, h: 0.36, size: 16, bold: true, color: C.accent1, name: "Syc title" });
  T(s, "「この案の良いところを教えて」と聞けば、良いところばかりが並ぶ", { x: rx + 0.22, y: y + 0.62, w: rw - 0.44, h: 0.6, size: 14, name: "Syc desc" });
  T(s, ["中立的な言葉で聞く", "反対の意見も出させる", "聞き方を変えて、答えが変わるかを見る"], { x: rx + 0.22, y: y + 1.3, w: rw - 0.44, h: 1.0, size: 14, bold: true, bullet: true, after: 2, name: "Syc fixes" });
}

{
  const s = contentSlide("一次情報と照らす。自己採点は検証ではない", "社内の数字は元のデータ、ルールは規程の原文、法令は公式の条文と照らす");
  label(s, "Claude に手伝わせて、確かめる場所を絞る", { y: Y0 });
  const gap = 0.5, bw = cw(3, gap), y = 2.4, h = 1.35;
  ["主張ごとに、資料の文をそのまま引用させる", "根拠が見つからない主張に、印を付けさせる", "引用と出典を、自分で開いて確かめる"].forEach((t, i) => {
    const x = M + i * (bw + gap), on = i === 2;
    box(s, { x, y, w: bw, h, fill: on ? C.accent1 : C.background2, name: "Verify step" });
    bubble(s, x + 0.2, y + (h - 0.48) / 2, i + 1, { w: 0.36, h: 0.48, size: 13 });
    T(s, t, { x: x + 0.75, y: y + 0.1, w: bw - 0.95, h: h - 0.2, size: 15, bold: true, color: on ? C.background1 : C.text1, valign: "middle", name: "Verify text" });
    if (i < 2) arrow(s, x + bw + 0.06, y + h / 2, x + bw + gap - 0.06, y + h / 2);
  });
  T(s, "引用や出典が付いていても、それだけで確認済みではない。ウェブ検索の答えは出典を開く（要約で落ちた前提や条件がある）", { x: M, y: 3.88, w: CW, h: 0.6, size: 14, color: C.accent4, name: "Verify note" });
  label(s, "検証にならない対処（誤答の型）", { y: 4.6, size: 16, color: C.accent2 });
  const w3 = cw(3), cy = 5.05, ch = 1.75;
  [
    ["Claude に自己採点させる", ["自信の自己申告は、", "正確さの指標ではない"]],
    ["言い回しや書式を整える", ["印象は良くなるが、", "中身の正しさは変わらない"]],
    ["Claude を使うのをやめる", "やりすぎ。確かめる手順を入れれば、業務は続けられる"],
  ].forEach(([t, b], i) => card(s, { x: M + i * (w3 + 0.3), y: cy, w: w3, h: ch, num: "×", red: true, fill: C.background1, line: C.accent2, title: t, body: b }));
}

// =====================================================================
// 第3章
divider(3, "人の確認と仕上げ", "分野2 出力の評価と検証（後半） ・ 配点 21%（第2章と共通） ・ 音声 18:09〜", "人の確認が要る場面 ／ 確認の重さ ／ 読み手に合わせた手直し\n案の比較 ／ 情報の選別と出力の形式");

{
  const s = contentSlide("人の確認は、届く先と影響の大きさで決める", "確認の手間は、リスクに見合った大きさに。確認の要否を決めるのは、出力を使う人");
  const w2 = cw(2), h = 1.55;
  card(s, { x: M, y: Y0, w: w2, h, num: 1, title: "誰に届くか", body: "自分だけが読むメモと、顧客に届く文書では、求められる確かさが違う" });
  card(s, { x: M + w2 + 0.3, y: Y0, w: w2, h, num: 2, title: "間違えたときの影響", body: "お金、契約、採用、健康、法令にかかわる内容は、誤りが損害に直結する" });
  const y = 3.7, bh = 1.75, lw = 4.3, gap = 1.83, rx = M + lw + gap, rw = W - M - rx;
  box(s, { x: M, y, w: lw, h: bh, fill: C.background2, name: "Light" });
  pill(s, "軽い確認でよい", { x: M + 0.22, y: y + 0.2, w: 1.8, fill: C.accent4 });
  T(s, "社内のアイデア出しのメモ。法務に回していては、仕事が進まない", { x: M + 0.22, y: y + 0.65, w: lw - 0.44, h: 0.95, size: 14, name: "Light desc" });
  T(s, "リスクに合わせる", { x: M + lw + 0.1, y: y + bh / 2 - 0.45, w: gap - 0.2, h: 0.3, size: 12, bold: true, color: C.accent1, align: "center", name: "Scale label" });
  arrow(s, M + lw + 0.12, y + bh / 2, rx - 0.12, y + bh / 2, { color: C.accent1, width: 3 });
  box(s, { x: rx, y, w: rw, h: bh, fill: C.background1, line: C.accent1, lineW: 1.75, name: "Heavy" });
  pill(s, "知識と直す権限のある人が確かめる", { x: rx + 0.22, y: y + 0.2, w: 3.3, fill: C.accent1 });
  T(s, ["契約の条件の説明を取引先に送る（法務の担当者が見る）", "採用の候補者を絞り込む資料を作る"], { x: rx + 0.22, y: y + 0.65, w: rw - 0.44, h: 0.95, size: 14, bullet: true, after: 4, name: "Heavy items" });
  const vw = cw(2);
  verdict(s, { x: M, y: 5.7, w: vw, h: 1.1, text: "Claude が自信を持って答えているから、確認を省く" });
  verdict(s, { x: M + vw + 0.3, y: 5.7, w: vw, h: 1.1, text: "Claude 自身に、人の確認が要るかを判断させる" });
}

{
  const s = contentSlide("読み手に合わせて伝え方を変え、事実は変えない", "読み手が誰で、何を知っていて、読んだあと何をしてほしいかを伝える");
  const sw = 3.4, sy = Y0 + 0.55, sh = 1.25;
  box(s, { x: M, y: sy, w: sw, h: sh, fill: C.text2, name: "Source" });
  T(s, "同じ内容", { x: M + 0.25, y: sy + 0.15, w: sw - 0.5, h: 0.3, size: 12, bold: true, color: C.accent5, name: "Source label" });
  T(s, ["サービスの", "仕様変更のお知らせ"], { x: M + 0.25, y: sy + 0.48, w: sw - 0.5, h: 0.65, size: 16, bold: true, color: C.background1, name: "Source text" });
  const tx = M + sw + 1.0, tw = W - M - tx, th = 1.0;
  [["経営層向け", "結論と影響を先に、短くまとめる"], ["顧客向け", "社内の言葉や内部の事情を外し、丁寧な言葉にする"]].forEach(([who, d], i) => {
    const y = Y0 + i * (th + 0.35);
    box(s, { x: tx, y, w: tw, h: th, fill: C.background2, name: "Target" });
    pill(s, who, { x: tx + 0.25, y: y + (th - 0.36) / 2, w: 1.6, h: 0.36, fill: C.accent1, size: 13 });
    T(s, d, { x: tx + 2.1, y, w: tw - 2.3, h: th, size: 16, bold: true, valign: "middle", name: "Target text" });
    arrow(s, M + sw + 0.08, sy + sh / 2, tx - 0.08, y + th / 2, { color: C.accent1, width: 2 });
  });
  label(s, "手直しの軸", { y: 4.6, w: 1.6, size: 16, color: C.text1 });
  ["長さ", "言葉の難しさ", "語調", "情報の順番"].forEach((t, i) => {
    const x = M + 1.7 + i * 2.25;
    box(s, { x, y: 4.55, w: 2.05, h: 0.5, fill: C.background1, line: C.accent1, r: 0.25, name: "Axis chip" });
    T(s, t, { x, y: 4.55, w: 2.05, h: 0.5, size: 14, bold: true, color: C.accent1, align: "center", valign: "middle", name: "Axis chip text" });
  });
  trap(s, { x: M, y: 5.45, w: CW, h: 1.25 }, "言い回しを整えても、中身は正しくならない。書き直しの途中で、数字や条件が抜け落ちることもある。元の版と比べて確かめる");
}

{
  const s = contentSlide("具体的に直させ、案は読み手の必要で比べる", "どこをどう変えたいかを伝え、2〜3案を並べて選ぶ。最後の仕上げと責任は人");
  const lw = 5.2;
  label(s, "直してほしい箇所と方向を伝える", { y: Y0, w: lw, size: 16, color: C.text1 });
  verdict(s, { x: M, y: Y0 + 0.5, w: lw, h: 0.95, text: "「もっと良くして」とだけ頼む" });
  verdict(s, { x: M, y: Y0 + 1.6, w: lw, h: 1.25, good: true, text: "「結論を最初に」「専門用語を言い換えて」のように、どこをどう変えるかを書く" });
  card(s, { x: M, y: Y0 + 3.1, w: lw, h: 1.75, title: "最後に仕上げるのは人", fill: C.text2, titleColor: C.background1, body: "" });
  T(s, "自分の名前で出す成果物には、自分が責任を持つ", { x: M + 0.22, y: Y0 + 3.7, w: lw - 0.44, h: 0.62, size: 14, color: C.background1, name: "Owner text" });
  const rx = M + lw + 0.35, rw = W - M - rx;
  label(s, "語調の違う案を2〜3つ作らせ、並べて比べる", { x: rx, y: Y0, w: rw, size: 16, color: C.text1 });
  const by = Y0 + 0.55;
  ["A", "B", "C"].forEach((l, i) => {
    const bx = rx + 0.3 + i * 1.2;
    bubble(s, bx, by, l, { w: 0.62, h: 0.84, size: 22 });
    T(s, `案${l}`, { x: bx - 0.2, y: by + 1.0, w: 1.02, h: 0.3, size: 12, bold: true, color: C.accent4, align: "center", name: "Draft label" });
  });
  s.addShape(SH.OVAL, { x: rx + 0.3 + 1.2 - 0.15, y: by - 0.13, w: 0.92, h: 1.1, fill: { type: "none" }, line: { color: C.accent2, width: 2.5 }, objectName: "Red pen mark" });
  T(s, ["印象ではなく、", "読み手の必要で選ぶ"], { x: rx + 3.9, y: by, w: rw - 3.9, h: 0.84, size: 16, bold: true, color: C.accent2, valign: "middle", name: "Pick note" });
  const cy = Y0 + 1.75, ch = 3.1;
  box(s, { x: rx, y: cy, w: rw, h: ch, fill: C.background2, name: "Criteria" });
  T(s, "比べる基準（先に決めておく）", { x: rx + 0.25, y: cy + 0.18, w: rw - 0.5, h: 0.38, size: 16, bold: true, name: "Criteria title" });
  ["知りたいことに答えているか", "誤解されない言葉か", "次に何をすればよいかが分かるか"].forEach((t, i) => {
    const y = cy + 0.72 + i * 0.62;
    bubble(s, rx + 0.25, y, i + 1, { w: 0.36, h: 0.48, size: 13 });
    T(s, t, { x: rx + 0.8, y, w: rw - 1.05, h: 0.48, size: 16, bold: true, valign: "middle", name: "Criteria item" });
  });
  T(s, "基準を先に決めておくと、選んだ理由を説明できる", { x: rx + 0.25, y: cy + 2.6, w: rw - 0.5, h: 0.35, size: 14, color: C.accent4, name: "Criteria note" });
}

{
  const s = contentSlide("情報は選んで並べ、形は次の作業で選ぶ", "全部載せるのが親切とは限らない。形の決め手は見た目ではなく、受け取った人が次に何をするか");
  label(s, "例: 競合の調査を部長に報告する", { y: Y0 });
  const lw = 4.9;
  verdict(s, { x: M, y: Y0 + 0.45, w: lw, h: 1.0, text: "10社分の細かな記録を、全部載せる" });
  verdict(s, { x: M + lw + 0.3, y: Y0 + 0.45, w: CW - lw - 0.3, h: 1.0, good: true, text: "重要な違い3つと、提案したい次の一手を先に。決めてほしいことを明記し、細かな記録は別に添える" });
  label(s, "出力の形式は3つ（試験ガイド）", { y: 3.6, size: 16, color: C.text1 });
  const w3 = cw(3), y = 4.02, h = 2.35;
  [
    ["インライン", "会話の中にそのまま返す", "短い答えや、一度読めば済む内容"],
    ["アーティファクト", "会話の横の別の画面に開く成果物", ["長く、単独で通じ、", "あとで編集や使い回しをする", "例: 報告書、研修資料"]],
    ["構造化データ", "項目をそろえて並べた形（表など）", ["集計、並べ替え、取り込みに", "例: 問い合わせ100件を、", "件名・分類・緊急度の列で"]],
  ].forEach(([n, def, d], i) => {
    const x = M + i * (w3 + 0.3);
    box(s, { x, y, w: w3, h, fill: C.background2, name: "Format" });
    T(s, n, { x: x + 0.22, y: y + 0.18, w: w3 - 0.44, h: 0.45, size: 20, bold: true, color: C.accent1, name: "Format name" });
    T(s, def, { x: x + 0.22, y: y + 0.7, w: w3 - 0.44, h: 0.32, size: 14, bold: true, name: "Format def" });
    T(s, d, { x: x + 0.22, y: y + 1.12, w: w3 - 0.44, h: 1.05, size: 14, name: "Format desc" });
  });
  T(s, "アーティファクトは2026年9月に新しくなり、11月時点ではひな形から作って直接編集できる。判断の軸は変わらない", { x: M, y: 6.45, w: CW, h: 0.3, size: 12, color: C.accent4, name: "Artifact note" });
}

// =====================================================================
// 第4章
divider(4, "製品とモデルの選び方", "分野3 製品とモデルの選択 ・ 配点 12% ・ 音声 25:34〜", "チャット・プロジェクト・リサーチ・アーティファクト ／ Haiku・Sonnet・Opus\nコスト・速度・品質 ／ コンテキストとメモリ");

{
  const s = contentSlide("機能は、仕事の形に合わせて選ぶ", "試験ガイドが挙げる4つの機能。互いに組み合わせて使える");
  const w4 = cw(4), h = 2.85;
  [
    ["チャット", ["その場で完結する", "一回きりの仕事"], ["例: メールの", "言い回しの相談"]],
    ["プロジェクト", "同じ前提で繰り返す仕事", "資料と指示を一度置けば、中のすべてのチャットで使われる。例: 毎週の報告書"],
    ["リサーチ", ["検索を重ねて", "深く調べる仕事"], "例: 競合の動向。利用の上限を早く使うので、簡単な事実の確認ならチャットで足りる"],
    ["アーティファクト", "手直しして使い回す成果物", "会話の横に、独立した成果物として表示される。例: 人に見せる文書"],
  ].forEach(([n, tag, d], i) => {
    const x = M + i * (w4 + 0.3);
    box(s, { x, y: Y0, w: w4, h, fill: C.background2, name: "Feature" });
    T(s, n, { x: x + 0.22, y: Y0 + 0.2, w: w4 - 0.44, h: 0.5, size: 20, bold: true, color: C.accent1, name: "Feature name" });
    T(s, tag, { x: x + 0.22, y: Y0 + 0.78, w: w4 - 0.44, h: 0.6, size: 14, bold: true, name: "Feature tag" });
    T(s, d, { x: x + 0.22, y: Y0 + 1.45, w: w4 - 0.44, h: 1.2, size: 14, color: C.accent4, name: "Feature desc" });
  });
  const y = 5.05, h2 = 1.75, ow = 8.6;
  box(s, { x: M, y, w: ow, h: h2, fill: C.background1, line: C.accent1, dash: "dash", name: "Project frame" });
  T(s, "組み合わせの例: プロジェクトの中で", { x: M + 0.3, y: y + 0.12, w: ow - 0.6, h: 0.35, size: 14, bold: true, color: C.accent1, name: "Combo label" });
  const iy = y + 0.6, ih = 0.95;
  box(s, { x: M + 0.3, y: iy, w: 3.0, h: ih, fill: C.background2, name: "Combo chat" });
  T(s, "チャットで報告書を頼む", { x: M + 0.45, y: iy, w: 2.7, h: ih, size: 14, bold: true, align: "center", valign: "middle", name: "Combo text" });
  arrow(s, M + 3.36, iy + ih / 2, M + 3.84, iy + ih / 2);
  box(s, { x: M + 3.9, y: iy, w: ow - 4.2, h: ih, fill: C.accent1, name: "Combo artifact" });
  T(s, "下書きをアーティファクトとして作る", { x: M + 4.05, y: iy, w: ow - 4.5, h: ih, size: 14, bold: true, color: C.background1, align: "center", valign: "middle", name: "Combo text" });
  T(s, "試験では、仕事の形に合う機能を選ぶ力が問われる", { x: M + ow + 0.3, y, w: CW - ow - 0.3, h: h2, size: 16, bold: true, color: C.accent4, valign: "middle", name: "Combo note" });
}

{
  const s = contentSlide("モデルは3種類。速さと能力の違いで覚える", "試験ガイドが挙げるのは Haiku・Sonnet・Opus。版の番号は変わりやすいので、特徴で覚える");
  const w3 = cw(3), h = 2.55;
  [
    ["Haiku", "最も速く、費用も小さい", ["分類や抜き出しのような、", "単純で大量の処理に向く"]],
    ["Sonnet", "速さと賢さのつり合い型", ["日々の文章作成や分析を、", "幅広く任せられる"]],
    ["Opus", "3つの中で最も能力が高い", ["複雑な推論に向く。", "費用は大きく、時間もかかる"]],
  ].forEach(([n, tag, d], i) => {
    const x = M + i * (w3 + 0.3);
    box(s, { x, y: Y0, w: w3, h, fill: C.background2, name: "Model" });
    T(s, n, { x: x + 0.25, y: Y0 + 0.15, w: w3 - 0.5, h: 0.78, size: 36, bold: true, color: C.accent1, name: "Model name" });
    T(s, tag, { x: x + 0.25, y: Y0 + 0.98, w: w3 - 0.5, h: 0.38, size: 16, bold: true, color: C.accent4, name: "Model tag" });
    T(s, d, { x: x + 0.25, y: Y0 + 1.45, w: w3 - 0.5, h: 0.9, size: 14, name: "Model desc" });
  });
  const ay = 4.95;
  T(s, "速い・費用が小さい", { x: M, y: ay - 0.38, w: 3, h: 0.3, size: 12, bold: true, color: C.accent4, name: "Scale left" });
  T(s, "能力が高い", { x: W - M - 3, y: ay - 0.38, w: 3, h: 0.3, size: 12, bold: true, color: C.accent4, align: "right", name: "Scale right" });
  arrow(s, W / 2, ay, M, ay, { color: C.accent4, width: 2 });
  arrow(s, W / 2, ay, W - M, ay, { color: C.accent4, width: 2 });
  card(s, { x: M, y: 5.4, w: CW, h: 1.4, title: "現行には Fable もある", fill: C.background1, line: C.accent6, body: "2026年11月時点では、Opus の上に Fable というモデルもある。ただし、試験ガイドが挙げるのは3種類" });
}

{
  const s = contentSlide("単純で大量なら速く安いモデル、深い推論には上位", "モデルはタスクの要件（コスト・速度・品質）のつり合いで選ぶ");
  const w2 = cw(2), h = 2.45;
  [
    ["単純で大量", ["問い合わせのメールを部署ごとに仕分ける", "作業が、毎日数百件"], "1件の判断は単純で、早く回すことが大事", "→ 速くて費用の小さいモデル"],
    ["深い推論", "役員会に出す事業計画の論点整理", "件数が少なくても、深い推論が要る", "→ 上位のモデルを使う価値がある"],
  ].forEach(([tag, sc, d, res], i) => {
    const x = M + i * (w2 + 0.3);
    box(s, { x, y: Y0, w: w2, h, fill: C.background2, name: "Scenario" });
    pill(s, tag, { x: x + 0.25, y: Y0 + 0.2, w: 1.6, h: 0.34, fill: C.accent4, size: 13 });
    T(s, sc, { x: x + 0.25, y: Y0 + 0.65, w: w2 - 0.5, h: 0.68, size: 16, bold: true, name: "Scenario text" });
    T(s, d, { x: x + 0.25, y: Y0 + 1.38, w: w2 - 0.5, h: 0.32, size: 14, name: "Scenario desc" });
    T(s, res, { x: x + 0.25, y: Y0 + 1.82, w: w2 - 0.5, h: 0.45, size: 18, bold: true, color: C.accent1, name: "Scenario result" });
  });
  trap(s, { x: M, y: 4.6, w: CW, h: 0.95 }, ["いつも最上位のモデル（単純で大量なら、費用と待ち時間の無駄）", "機能を全部止める、別の AI に乗り換える ― どれも誤り"]);
  T(s, [
    "迷ったら、同じ依頼を2つのモデルで試して比べる",
    "2026年11月時点のアプリには、同じモデルのまま考える深さを変える effort の設定もある。公式の案内は、モデルを替える前にまずこれを調整するよう勧めている",
  ], { x: M, y: 5.75, w: CW, h: 1.05, size: 14, bullet: true, after: 4, name: "Model notes" });
}

{
  const s = contentSlide("長い会話は3つの手で管理し、決まりは書いて置く", "コンテキストは1つのチャットの作業用の記憶。長い会話では、前の条件が守られにくくなる");
  const w3 = cw(3), h = 2.4;
  card(s, { x: M, y: Y0, w: w3, h, num: 1, title: "やり直す", body: "話題が変わったら、新しいチャットを始める" });
  card(s, { x: M + w3 + 0.3, y: Y0, w: w3, h, num: 2, title: "要約する", body: "決まったことを要約させ、自分で確かめてから新しいチャットへ。設定によっては自動で要約する仕組みもある（2026年11月時点）" });
  card(s, { x: M + 2 * (w3 + 0.3), y: Y0, w: w3, h, num: 3, title: "保持する", body: "何度も使う前提は会話の外へ。プロジェクトの中のチャットどうしは内容を共有しないので、ナレッジに入れる" });
  const y = 4.6, bh = 2.2, lw = 5.7, rx = M + lw + 0.73, rw = W - M - rx;
  card(s, { x: M, y, w: lw, h: bh, title: "メモリ: チャットをまたいで背景を覚える", fill: C.background1, line: C.accent6, bullet: true, body: [
    "プロジェクトごとに別のメモリを持つ",
    "覚えた内容は、利用者が見て、直して、消せる",
    "ただし、何が残るかは Claude が会話の中から覚える",
  ] });
  arrow(s, M + lw + 0.1, y + bh / 2, rx - 0.1, y + bh / 2, { color: C.accent1, width: 2.5 });
  box(s, { x: rx, y, w: rw, h: bh, fill: C.text2, name: "Write it" });
  T(s, "必ず守る決まりは、書いて置く", { x: rx + 0.25, y: y + 0.2, w: rw - 0.5, h: 0.38, size: 16, bold: true, color: C.background1, name: "Write title" });
  T(s, "チームの全員が守るべき決まりは、プロジェクトの指示やナレッジに。誰がどのチャットで始めても同じ前提に", { x: rx + 0.25, y: y + 0.7, w: rw - 0.5, h: 1.3, size: 14, color: C.background1, name: "Write text" });
}

// =====================================================================
// 第5章
divider(5, "業務への組み込み", "分野4 ワークフロー統合とソリューション設計 ・ 配点 16% ・ 音声 32:40〜", "要件の整理 ／ 調査と計画 ／ 小さな試作\n手順ごとの分担（委任） ／ 価値と限界の伝え方");

{
  const s = contentSlide("Claude は抜けを見つける相手、決めるのは人", "要件の整理も改善のたたき台も、最後は業務の目的を知る人と現場が確かめる");
  label(s, "要件の整理（例: 社内の問い合わせ窓口を見直す）", { y: Y0 });
  flow(s, [
    ["各部署の要望のメモ", "重なりや食い違いがある", "材料"],
    ["種類ごとに整理し、矛盾と未決の点を挙げる", "", "Claude"],
    [["関係者に確かめる", "質問の一覧を作る"], "", "Claude"],
    ["優先順位を決める", "業務の目的を知る人", "人"],
  ], { y: Y0 + 0.42, h: 1.85, hi: [3], titleSize: 14, th: 0.6 });
  label(s, "調査と計画（プロセスの最適化）", { y: 4.4 });
  flow(s, [
    ["今の手順書と、困っている点", "", "材料"],
    ["待ちが生じるところや、重なった確認をたたき台に", "", "Claude"],
    [["現場の担当者に見てもらい、", "実際の件数や時間で確かめる"], "", "人"],
  ], { y: 4.8, h: 1.45, hi: [2], titleSize: 14, th: 0.6 });
  T(s, "Claude は職場の事情を、渡された資料と会話の範囲でしか知らない。手順書と現場の実際も、よくずれている", { x: M, y: 6.42, w: CW, h: 0.35, size: 14, color: C.accent4, name: "Scope note" });
}

{
  const s = contentSlide("小さく試作して直し、技術的な実装は引き継ぐ", "最初から完成品を狙わない。使う人の意見で直す繰り返しが、反復的な改善");
  const lw = 7.1, gap = 0.45, bw = cw(3, gap, lw), y = Y0 + 0.05, h = 1.95;
  [
    ["小さく試作する", ["アーティファクトで", "会話の横に表示し、", "何度も直せる"]],
    ["使う人に見せる", "完成品を目指さない"],
    ["意見で直す", "使う人の意見をもとに"],
  ].forEach(([t, d], i) => {
    const x = M + i * (bw + gap);
    box(s, { x, y, w: bw, h, fill: i === 0 ? C.accent1 : C.background2, name: "Cycle step" });
    bubble(s, x + 0.18, y + 0.15, i + 1, { w: 0.36, h: 0.48, size: 13 });
    T(s, t, { x: x + 0.18, y: y + 0.72, w: bw - 0.36, h: 0.35, size: 15, bold: true, color: i === 0 ? C.background1 : C.text1, name: "Cycle title" });
    T(s, d, { x: x + 0.18, y: y + 1.12, w: bw - 0.36, h: 0.75, size: 12, color: i === 0 ? C.background1 : C.text1, name: "Cycle desc" });
    if (i < 2) arrow(s, x + bw + 0.06, y + h / 2, x + bw + gap - 0.06, y + h / 2);
  });
  const x1 = M + bw / 2, x3 = M + 2 * (bw + gap) + bw / 2, yl = y + h + 0.45;
  arrow(s, x3, y + h + 0.05, x3, yl, { head: false, color: C.accent1, width: 2 });
  arrow(s, x3, yl, x1, yl, { head: false, color: C.accent1, width: 2 });
  arrow(s, x1, yl, x1, y + h + 0.06, { color: C.accent1, width: 2 });
  T(s, "繰り返す", { x: x1 + 0.2, y: yl + 0.08, w: x3 - x1 - 0.4, h: 0.32, size: 12, bold: true, color: C.accent1, align: "center", name: "Loop label" });
  label(s, "ソリューションの例（業務の課題を解く仕組みや成果物）", { y: 5.3, w: lw });
  ["返信のひな形", "研修の資料", "簡単なツール"].forEach((t, i) => {
    const x = M + i * (bw + gap);
    box(s, { x, y: 5.75, w: bw, h: 0.6, fill: C.background1, line: C.accent6, name: "Solution" });
    T(s, t, { x, y: 5.75, w: bw, h: 0.6, size: 14, bold: true, align: "center", valign: "middle", name: "Solution text" });
  });
  const rx = M + lw + 0.35, rw = W - M - rx;
  box(s, { x: rx, y: Y0, w: rw, h: 4.85, fill: C.text2, name: "Escalation" });
  T(s, "エスカレーション", { x: rx + 0.25, y: Y0 + 0.22, w: rw - 0.5, h: 0.45, size: 20, bold: true, color: C.background1, name: "Esc title" });
  T(s, [
    "社内のシステムと自動でつなぐような、技術的な実装が必要になったら、技術の担当者に引き継ぐ",
    "試験ガイドも、複雑な作業や技術的な作業を、Claude のアーキテクトやデベロッパーの資格を持つ人へエスカレーションすることを、アソシエイトの役割としている",
  ], { x: rx + 0.25, y: Y0 + 0.85, w: rw - 0.5, h: 3.7, size: 14, color: C.background1, after: 10, name: "Esc text" });
}

{
  const s = contentSlide("手順ごとに、任せる・人が担う・協働するを決める", "判断の軸は AI Fluency の「委任」。公式の対策講座は、手順ごとに3つから選ぶと説明している");
  label(s, "例: 経費の申請", { y: Y0 });
  const w3 = cw(3), y = Y0 + 0.42, h = 1.95;
  [
    ["AI に任せる", C.accent1, C.background1, "領収書の内容を、一覧に起こす", ""],
    ["人が担う", C.text2, C.background1, "規程に照らした、例外の判断", ""],
    ["協働する", C.accent3, C.text1, "差し戻しの連絡文", "Claude が下書きし、人が直して送る"],
  ].forEach(([tag, fill, fg, t, d], i) => {
    const x = M + i * (w3 + 0.3);
    box(s, { x, y, w: w3, h, fill: C.background2, name: "Role" });
    pill(s, tag, { x: x + 0.22, y: y + 0.2, w: 1.6, h: 0.36, fill, color: fg, size: 13 });
    T(s, t, { x: x + 0.22, y: y + 0.72, w: w3 - 0.44, h: 0.68, size: 16, bold: true, name: "Role text" });
    if (d) T(s, d, { x: x + 0.22, y: y + 1.15, w: w3 - 0.44, h: 0.62, size: 14, color: C.accent4, name: "Role desc" });
  });
  const w2 = cw(2), y2 = 4.55, h2 = 1.05;
  [["強化", "今の手順のまま、一部を Claude で助ける"], ["再設計", "手順そのものを、組み立て直す"]].forEach(([n, d], i) => {
    const x = M + i * (w2 + 0.3);
    box(s, { x, y: y2, w: w2, h: h2, fill: C.background1, line: C.accent6, name: "Mode" });
    T(s, n, { x: x + 0.25, y: y2, w: 1.2, h: h2, size: 22, bold: true, color: C.accent1, valign: "middle", name: "Mode name" });
    T(s, d, { x: x + 1.5, y: y2, w: w2 - 1.7, h: h2, size: 14, bold: true, valign: "middle", name: "Mode desc" });
  });
  trap(s, { x: M, y: 5.8, w: CW, h: 1.0 }, "間違った手順の自動化は逆効果。不要な確認を速くしても、むだが速く回るだけ。一度に切り替えず、1つの手順から試して確かめる");
}

{
  const s = contentSlide("価値と限界は、試した結果のまま伝える", "ステークホルダー（上司、他部署、顧客など）に、盛らず、小さく見せず");
  const lw = 5.6;
  label(s, "よくある失敗は2つ", { y: Y0, w: lw, size: 16, color: C.accent2 });
  card(s, { x: M, y: Y0 + 0.5, w: lw, h: 1.6, num: "×", red: true, fill: C.background1, line: C.accent2, title: "期待を膨らませすぎる", body: "「全部自動で正確にできる」と言い切ると、誤りが見つかったときに、導入そのものへの信頼を失う" });
  card(s, { x: M, y: Y0 + 2.3, w: lw, h: 1.6, num: "×", red: true, fill: C.background1, line: C.accent2, title: "慎重になりすぎる", body: "役に立つ場面まで、小さく見せてしまう" });
  T(s, "ヘルプセンターも、Claude は誤った内容を返すことがあり、唯一の情報源として頼るべきではない、としている", { x: M, y: Y0 + 4.1, w: lw, h: 0.6, size: 12, color: C.accent4, name: "Help note" });
  const rx = M + lw + 0.3, rw = W - M - rx;
  box(s, { x: rx, y: Y0, w: rw, h: 4.85, fill: C.background2, name: "Show" });
  T(s, "正確に伝える ＝ 試した結果を、そのまま示す", { x: rx + 0.3, y: Y0 + 0.25, w: rw - 0.6, h: 0.42, size: 18, bold: true, color: C.accent1, name: "Show title" });
  ["どの手順で、どれだけ時間が減ったか", "どんな誤りが起こりうるか", "どこに人の確認が残るか"].forEach((t, i) => {
    const y = Y0 + 1.0 + i * 1.0;
    box(s, { x: rx + 0.85, y, w: rw - 1.15, h: 0.8, fill: C.background1, name: "Show row" });
    bubble(s, rx + 0.3, y + 0.13, i + 1);
    T(s, t, { x: rx + 1.1, y, w: rw - 1.6, h: 0.8, size: 16, bold: true, valign: "middle", name: "Show item" });
  });
  T(s, "具体的に伝えれば、相手は導入を判断できる", { x: rx + 0.3, y: Y0 + 4.1, w: rw - 0.6, h: 0.4, size: 16, bold: true, name: "Show note" });
}

// =====================================================================
// 第6章
divider(6, "設定とナレッジ管理", "分野5 設定とナレッジ管理 ・ 配点 12% ・ 音声 39:49〜", "指示とナレッジ ／ システムレベルの指示 ／ ナレッジの整理\nコネクタ ／ 設定の見直し");

{
  const s = contentSlide("プロジェクトは、指示とナレッジの2つで設定する", "良いプロンプトは一度だけ役に立つ。良い設定は毎回役に立つ（公式の対策講座）");
  const lw = 5.0, lh = 1.4;
  [
    ["指示", 1.2, "＝ ふるまい", "Claude にどうふるまってほしいかを書く"],
    ["ナレッジ", 1.85, "＝ 参照する資料", "ブランドの指針、文体の手引き、ひな形、まねしてほしい過去の良い成果物"],
  ].forEach(([n, nw, eq, d], i) => {
    const y = Y0 + i * (lh + 0.2);
    box(s, { x: M, y, w: lw, h: lh, fill: C.background2, name: "Setting" });
    T(s, n, { x: M + 0.25, y: y + 0.15, w: nw, h: 0.5, size: 24, bold: true, color: C.accent1, name: "Setting name" });
    T(s, eq, { x: M + 0.25 + nw, y: y + 0.15, w: lw - 0.5 - nw, h: 0.5, size: 18, bold: true, valign: "middle", name: "Setting eq" });
    T(s, d, { x: M + 0.25, y: y + 0.72, w: lw - 0.5, h: 0.6, size: 14, name: "Setting desc" });
  });
  const px = M + lw + 0.75, pw = W - M - px, ph = 3.0;
  box(s, { x: px, y: Y0, w: pw, h: ph, fill: C.background1, line: C.accent1, dash: "dash", name: "Project frame" });
  T(s, "プロジェクト内の、すべてのチャットに効く", { x: px + 0.3, y: Y0 + 0.2, w: pw - 0.6, h: 0.38, size: 16, bold: true, color: C.accent1, name: "Project label" });
  const cwid = 1.75, cg = (pw - 0.7 - 3 * cwid) / 2;
  for (let i = 0; i < 3; i++) {
    const x = px + 0.35 + i * (cwid + cg);
    box(s, { x, y: Y0 + 0.9, w: cwid, h: 1.75, fill: C.background2, name: "Chat" });
    T(s, "チャット", { x, y: Y0 + 0.9, w: cwid, h: 1.75, size: 16, bold: true, align: "center", valign: "middle", name: "Chat text" });
  }
  [Y0 + lh / 2, Y0 + lh + 0.2 + lh / 2].forEach((ay) => arrow(s, M + lw + 0.08, ay, px - 0.08, ay, { color: C.accent1, width: 2.5 }));
  label(s, "見落としやすい3点", { y: 5.12, size: 16, color: C.accent2 });
  const w3 = cw(3), y = 5.55, h = 1.25;
  [
    ["チャット同士は、会話を共有しない", "残したい決定は、要約してナレッジへ"],
    ["プロジェクトの名前と説明は、", "Claude には見えない", "伝えたいことは指示かナレッジへ"],
    ["チャットでアップロードした", "ファイルは、ナレッジに入らない"],
  ].forEach((t, i) => {
    const x = M + i * (w3 + 0.3);
    box(s, { x, y, w: w3, h, fill: C.background1, line: C.accent2, lineW: 1.5, name: "Pitfall" });
    T(s, t, { x: x + 0.22, y: y + 0.12, w: w3 - 0.44, h: h - 0.24, size: 14, valign: "middle", name: "Pitfall text" });
  });
}

{
  const s = contentSlide("指示は具体的に書き、効かせたい範囲に置く", "試験ガイドの「システムレベルの指示」は、プロジェクトの指示のことと考える");
  const lw = 6.0;
  label(s, "4つの部品で、具体的に書く", { y: Y0, w: lw, size: 16, color: C.text1 });
  let px = M;
  [["背景", 1.1], ["手順", 1.1], ["口調と文体", 1.65], ["必ず守る決まり", 1.9]].forEach(([t, w]) => {
    pill(s, t, { x: px, y: Y0 + 0.5, w, h: 0.4, fill: C.accent1, size: 14 });
    px += w + 0.08;
  });
  card(s, { x: M, y: Y0 + 1.1, w: lw, h: 2.05, title: "例: 営業チームのプロジェクトの指示", fill: C.background2, bullet: true, body: [
    "中小企業向けサービスの提案書を作る場です",
    "まず構成案を出し、確認を受けてから本文を書きます",
    "最後に、次の打ち合わせの提案を必ず入れます",
  ] });
  verdict(s, { x: M, y: Y0 + 3.35, w: lw, h: 1.5, title: "「いい感じに」", text: "あいまいな指示は、結果のばらつきにつながる" });
  const rx = M + lw + 0.35, rw = W - M - rx;
  label(s, "効かせたい範囲で、置き場所を選ぶ", { x: rx, y: Y0, w: rw, size: 16, color: C.text1 });
  [
    ["アカウント全体の設定", "どの会話にも効かせたい、自分の好み", C.text2, C.background1],
    ["プロジェクトの指示", "特定の仕事だけの決まり", C.accent1, C.background1],
    ["チャット", "その日だけの依頼", C.accent6, C.text1],
  ].forEach(([t, d, fill, fg], i) => {
    const inset = i * 0.3, y = Y0 + 0.55 + i * 1.08;
    box(s, { x: rx + inset, y, w: rw - 2 * inset, h: 0.95, fill, r: 0.08, name: "Scope level" });
    T(s, t, { x: rx + inset + 0.22, y: y + 0.1, w: rw - 2 * inset - 0.44, h: 0.35, size: 16, bold: true, color: fg, name: "Scope title" });
    T(s, d, { x: rx + inset + 0.22, y: y + 0.5, w: rw - 2 * inset - 0.44, h: 0.32, size: 14, color: fg, name: "Scope desc" });
  });
  T(s, "広い ↑　↓ 狭い", { x: rx, y: Y0 + 3.85, w: rw, h: 0.3, size: 12, bold: true, color: C.accent4, align: "center", name: "Scope axis" });
  T(s, ["一度きりの依頼を指示に書き込むと、", "関係のないチャットまで影響を受ける"], { x: rx, y: Y0 + 4.2, w: rw, h: 0.62, size: 14, bold: true, color: C.accent2, name: "Scope warn" });
}

{
  const s = contentSlide("コネクタは、自分の権限の範囲で必要なものだけ", "コネクタは Claude をほかのアプリにつなぐ仕組み。例: Google Drive の文書を探す、Gmail のメールを読む");
  const w3 = cw(3), h = 2.4;
  card(s, { x: M, y: Y0, w: w3, h, num: 1, title: "権限を受け継ぐ", body: ["Claude が見られるのは、", "あなたのアカウントが", "見られる範囲だけ"] });
  card(s, { x: M + w3 + 0.3, y: Y0, w: w3, h, num: 2, title: "信頼できるものだけ", body: ["求められるアクセスの範囲を", "接続のときに確かめる", "使わなくなったら外す"] });
  card(s, { x: M + 2 * (w3 + 0.3), y: Y0, w: w3, h, num: 3, title: "必要なものだけオン", body: ["チャットごとに、オンとオフを", "切り替えられる。その会話に", "必要なものだけオンにする"] });
  label(s, "チームで使うとき", { y: 4.6, size: 16, color: C.text1 });
  const fy = 5.1, fh = 1.4, fw = 3.6, fgap = 0.5;
  [["管理者が", "組織として有効にする"], ["一人ひとりが", "自分のアカウントで接続する"]].forEach(([who, d], i) => {
    const x = M + i * (fw + fgap);
    box(s, { x, y: fy, w: fw, h: fh, fill: C.background2, name: "Team step" });
    T(s, who, { x: x + 0.22, y: fy + 0.18, w: fw - 0.44, h: 0.35, size: 14, bold: true, color: C.accent1, name: "Team who" });
    T(s, d, { x: x + 0.22, y: fy + 0.58, w: fw - 0.44, h: 0.65, size: 16, bold: true, name: "Team desc" });
    if (i === 0) arrow(s, x + fw + 0.06, fy + fh / 2, x + fw + fgap - 0.06, fy + fh / 2);
  });
  const rx = M + 2 * fw + fgap + 0.4, rw = W - M - rx;
  verdict(s, { x: rx, y: fy, w: rw, h: fh, good: true, title: "見当たらないとき", text: "自分で抜け道を探さず、管理者に相談する" });
}

{
  const s = contentSlide("古い資料は古い答えのもと。元の設定を直す", "規程や料金表が変わっても設定が昔のままなら、Claude は古い前提で、もっともらしい答えを返し続ける");
  const w2 = cw(2), h = 1.6;
  verdict(s, { x: M, y: Y0, w: w2, h, title: "チャットで毎回書き添える", text: "一度きりの修正。書き忘れた人の出力は、古いまま" });
  verdict(s, { x: M + w2 + 0.3, y: Y0, w: w2, h, good: true, title: "元の設定を直す", text: "古い版を外して新しい版に入れ替える。指示に古いルールがあれば、指示も直す" });
  const w4 = cw(4), y = 3.85, ch = 2.95;
  [
    ["古い版を並べない", "新旧が並ぶと、どちらに従うかがあいまいになり、古い内容で答えることがある"],
    ["分かる名前を付ける", "「資料1」ではなく「2026年度ブランド指針」。質問で資料の名前を挙げると絞れる"],
    ["手動で入れ替える", "アップロードしたファイルは、入れ替えるまで古いまま。Drive から加えた Google ドキュメントは最新に同期される"],
    ["見直しの担当と周期", "共有プロジェクトの変更は全員のチャットに効く。例: 四半期ごとに確かめる"],
  ].forEach(([t, b], i) => card(s, { x: M + i * (w4 + 0.3), y, w: w4, h: ch, title: t, body: b, size: 16, fill: i === 3 ? C.background1 : C.background2, line: i === 3 ? C.accent1 : undefined }));
}

// =====================================================================
// 第7章
divider(7, "ガバナンスと責任ある利用", "分野6 ガバナンス、リスク、責任ある利用 ・ 配点 15% ・ 音声 46:45〜", "任せてよい仕事 ／ 規制対象のデータ ／ 組織の AI ポリシー\n結果の責任 ／ ちょうどよい大きさの手");

{
  const s = contentSlide("出力できることと、任せてよいことは別", "人があとで確かめられる仕事は任せ、人の生活に関わる判断は人が決める");
  const h = 1.5, gap = 0.17, lw = 2.2;
  [
    ["任せられる", C.accent1, "下書き、要約、アイデア出し、資料の整理", ["人があとで確かめられる仕事。", "間違いがあっても、使う前に直せる"]],
    ["人が決める", C.text2, "採用の合否、人事評価、融資や保険の審査", "Claude には書類の要約や論点の整理を任せる。資格のある人が中身を確かめ、変える権限と結果の責任を持つ（2026年11月時点の利用ポリシー）"],
    ["選ばない", C.accent2, ["人をだます使い方", "例: 架空の客になりすました口コミづくり"], "効率が上がっても、適切なユースケースではない"],
  ].forEach(([tag, fill, ex, d], i) => {
    const y = Y0 + i * (h + gap);
    box(s, { x: M, y, w: CW, h, fill: C.background2, name: "Use row" });
    box(s, { x: M, y, w: lw, h, fill, name: "Use tag" });
    T(s, tag, { x: M, y, w: lw, h, size: 20, bold: true, color: C.background1, align: "center", valign: "middle", name: "Use tag text" });
    T(s, ex, { x: M + lw + 0.3, y: y + 0.1, w: 4.6, h: h - 0.2, size: 16, bold: true, valign: "middle", name: "Use examples" });
    T(s, d, { x: M + lw + 5.1, y: y + 0.1, w: CW - lw - 5.3, h: h - 0.2, size: 14, valign: "middle", name: "Use desc" });
  });
}

{
  const s = contentSlide("規制対象のデータは、入れる前に削除か匿名化", "社内だけで使う分析でも、ルールは同じ。匿名化で進められるなら、分析をやめる必要はない");
  const gap = 0.55, bw = cw(3, gap), y = Y0, h = 1.85;
  [
    ["元のデータ", ["顧客の名前や口座番号、", "社員の健康の情報など", "法令や規程で守るべきデータ"]],
    ["入れる前に、削除か匿名化", ["分析に要らない識別情報を", "取り除く", "例: 顧客名 →「顧客A」"]],
    ["Claude で分析する", "売上の傾向は、そのまま分析できる"],
  ].forEach(([t, d], i) => {
    const x = M + i * (bw + gap), on = i === 1;
    box(s, { x, y, w: bw, h, fill: on ? C.accent1 : C.background2, name: "Data step" });
    T(s, t, { x: x + 0.22, y: y + 0.18, w: bw - 0.44, h: 0.4, size: 18, bold: true, color: on ? C.background1 : C.text1, name: "Data title" });
    T(s, d, { x: x + 0.22, y: y + 0.7, w: bw - 0.44, h: 0.95, size: 14, color: on ? C.background1 : C.text1, name: "Data desc" });
    if (i < 2) arrow(s, x + bw + 0.06, y + h / 2, x + bw + gap - 0.06, y + h / 2);
  });
  T(s, "匿名化: 誰のデータか分からない形に置き換えること", { x: M + bw + gap - 0.6, y: y + h + 0.1, w: bw + 1.2, h: 0.35, size: 12, bold: true, color: C.accent1, align: "center", name: "Anon def" });
  trap(s, { x: M, y: 4.55, w: CW, h: 1.3 }, "ファイルをそのまま上げて「このデータは保持しないで」と頼む → モデルへの指示では、ポリシー上の管理要件を満たさない（試験ガイド）。保存のされ方は、組織の契約や製品の設定で決まる");
  const w2 = cw(2);
  verdict(s, { x: M, y: 6.0, w: w2, h: 0.8, text: "社内向けだから、そのまま入れる" });
  verdict(s, { x: M + w2 + 0.3, y: 6.0, w: w2, h: 0.8, text: "リスクがあるので、分析そのものをやめる" });
}

{
  const s = contentSlide("まず組織のルール。結果の責任は人が持つ", "提供元の方針は、自社のルールの代わりにならない。「Claude が書いた」は言い訳にならない");
  const w2 = cw(2), h = 4.85;
  box(s, { x: M, y: Y0, w: w2, h, fill: C.background2, name: "Policy" });
  T(s, "組織の AI ポリシーに、まず従う", { x: M + 0.25, y: Y0 + 0.2, w: w2 - 0.5, h: 0.42, size: 18, bold: true, color: C.accent1, name: "Policy title" });
  T(s, "多くの組織がルールで決めていること", { x: M + 0.25, y: Y0 + 0.72, w: w2 - 0.5, h: 0.3, size: 14, color: C.accent4, name: "Policy sub" });
  T(s, ["使ってよいツール", "入れてよいデータの種類", "人の確認が必要な場面"], { x: M + 0.25, y: Y0 + 1.08, w: w2 - 0.5, h: 1.0, size: 14, bold: true, bullet: true, after: 2, name: "Policy items" });
  const ry = Y0 + 2.2;
  box(s, { x: M + 0.25, y: ry, w: w2 - 0.5, h: 1.15, fill: C.background1, line: C.accent2, lineW: 1.5, name: "Policy trap" });
  T(s, ["Anthropic の利用ポリシーは、自社ルールの代わりではない", "利用ポリシー自身も、各地の法律の要件を", "置き換えるものではない、と書いている"], { x: M + 0.45, y: ry + 0.1, w: w2 - 0.9, h: 0.95, size: 12, valign: "middle", after: 2, name: "Policy trap text" });
  T(s, [
    "書かれていない場面は、自己判断で進めず、情報システムや法務など、ルールを決めている部署に確かめる",
    "許可のない AI サービスや個人のアカウントで済ませない",
  ], { x: M + 0.25, y: ry + 1.3, w: w2 - 0.5, h: 1.25, size: 14, bullet: true, after: 4, name: "Policy rules" });
  const rx = M + w2 + 0.3;
  box(s, { x: rx, y: Y0, w: w2, h, fill: C.background1, line: C.accent6, name: "Diligence" });
  T(s, "Diligence ― 使い方に責任を持つ", { x: rx + 0.25, y: Y0 + 0.2, w: w2 - 0.5, h: 0.42, size: 18, bold: true, color: C.accent1, name: "Dil title" });
  T(s, "AI Fluency の枠組み。3つの側面", { x: rx + 0.25, y: Y0 + 0.72, w: w2 - 0.5, h: 0.3, size: 14, color: C.accent4, name: "Dil sub" });
  ["どの AI を、どう使うかを考えて選ぶ", ["透明性: 仕事の中で AI が果たした役割を、", "知る必要のある人に正直に伝える"], ["使ったり共有したりする出力を、", "自分で確かめ、責任を持つ"]].forEach((t, i) => {
    const y = Y0 + 1.15 + i * 0.85;
    bubble(s, rx + 0.25, y + 0.08, i + 1, { w: 0.36, h: 0.48, size: 13 });
    T(s, t, { x: rx + 0.8, y, w: w2 - 1.05, h: 0.7, size: 14, valign: "middle", name: "Dil item" });
  });
  box(s, { x: rx + 0.25, y: Y0 + 3.85, w: w2 - 0.5, h: 0.8, fill: C.text2, name: "Excuse" });
  T(s, "「Claude が書いたから」は言い訳にならない", { x: rx + 0.45, y: Y0 + 3.85, w: w2 - 0.9, h: 0.8, size: 16, bold: true, color: C.background1, align: "center", valign: "middle", name: "Excuse text" });
}

{
  const s = contentSlide("正解は、目的を果たしつつルールに沿う手", "分野6の誤答には3つの型がある。どれも、業務の目的とルールの両立に答えていない");
  const w3 = cw(3), h = 1.85;
  [
    ["何もしない", "そのまま上げる、そのまま送る"],
    ["極端な対処", "分析をやめる、AI の利用を全部止める"],
    ["モデルに頼む", "「保持しないで」「公平に判断して」と指示するだけ。本当の管理策の代わりにならない"],
  ].forEach(([t, b], i) => card(s, { x: M + i * (w3 + 0.3), y: Y0, w: w3, h, num: "×", red: true, fill: C.background1, line: C.accent2, title: t, body: b }));
  const y = 4.05, bh = 2.75;
  box(s, { x: M, y, w: CW, h: bh, fill: C.text2, name: "Right answer" });
  T(s, "ちょうどよい大きさの手 ― 目的を果たしつつ、ルールに沿い、人が確かめられる", { x: M + 0.3, y: y + 0.28, w: CW - 0.6, h: 0.42, size: 18, bold: true, color: C.background1, name: "Right title" });
  [["データを匿名化して", "から分析する"], ["判断は人が下し、", "AI は材料をそろえる"], ["迷ったら、", "担当部署に確かめる"]].forEach((t, i) => {
    const x = M + 0.3 + i * ((CW - 0.6 - 0.6) / 3 + 0.3), iw = (CW - 0.6 - 0.6) / 3;
    bubble(s, x, y + 1.13, "○", { dark: true, size: 16 });
    T(s, t, { x: x + 0.55, y: y + 1.0, w: iw - 0.55, h: 0.8, size: 16, bold: true, color: C.background1, valign: "middle", name: "Right item" });
  });
  T(s, "例: 採用 → 要約と質問案には Claude を使い、合否は担当者が書類を確かめて決める", { x: M + 0.3, y: y + 2.1, w: CW - 0.6, h: 0.35, size: 14, color: C.accent5, name: "Right example" });
}

// =====================================================================
// 第8章
divider(8, "うまくいかないときの直し方", "分野7 トラブルシューティングと最適化 ・ 配点 10% ・ 音声 53:51〜", "あきらめず、手当たり次第にも変えない ／ 4つの根本原因\n結果で確かめて恒久化 ／ 設定に移す ／ 講座の振り返り");

{
  const s = contentSlide("不調は、4つの根本原因のどれかにたどる", "「できない」とあきらめず、思いつくままにも変えない。まず、ずれの中身を言葉にする");
  const w2 = cw(2), h = 1.85;
  [
    ["指示の不足", "誰に、何のために、どんな形式と長さかが伝わっていない → 事情を知らない同僚に見せて試す。形式のばらつきには見本を示す"],
    ["詰め込みすぎ", "1つの会話に話題や資料が多く、肝心の点がぼやける → 話題が変わったら新しいチャット。続きは要約して持ち越し、資料は絞る"],
    ["機能やモデルの選び間違い", "道具が仕事に合っていない（例: 最新の業界の動きを、ふつうのチャットで聞く）→ 何度も調べながら進めるリサーチへ"],
    ["古い設定", "資料や指示が現実に追いついていない（例: 去年の料金表）→ 依頼の工夫では直らない。資料と指示を更新する"],
  ].forEach(([t, b], i) => card(s, { x: M + (i % 2) * (w2 + 0.3), y: Y0 + Math.floor(i / 2) * (h + 0.15), w: w2, h, num: i + 1, title: t, body: b }));
  trap(s, { x: M, y: 5.95, w: CW, h: 0.85 }, "原因に合わない対策では直らない。指示の不足に上位のモデル、古い資料に言い回しの手直し");
}

{
  const s = contentSlide("直したら比べて確かめ、繰り返す手直しは設定へ", "その場で直せば、役に立つのは一度だけ。設定に入れれば、次からは最初から正しい形で出る");
  flow(s, [
    ["ずれの中身を言葉にする", "抜け？ 長すぎ？ 読み手に合わない？"],
    ["原因の点だけ変える", "一度に変えると、どれが効いたか分からない"],
    ["前の出力と比べる", "新しい出力で、効いたかを確かめる"],
    ["繰り返す手直しは設定へ", ["毎回、敬語を直す", "毎回、表を足す"]],
  ], { y: Y0, h: 2.05, hi: [3] });
  const w3 = cw(3), y = 4.2, h = 2.6;
  card(s, { x: M, y, w: w3, h, num: "×", red: true, fill: C.background1, line: C.accent2, title: "作り直しは修正ではない", body: "同じ依頼で3回作り直し、良いものを選んでも、何が足りないかは分からない。来週も同じことが起きる" });
  card(s, { x: M + w3 + 0.3, y, w: w3, h, title: "読み手の指摘は次の条件に", body: "上司に「結論が後ろにある」と言われたら、それを次の依頼に足す" });
  card(s, { x: M + 2 * (w3 + 0.3), y, w: w3, h, num: "○", title: "同じ指摘は指示に書く", body: "毎回「締め切りが書かれていない」「です・ます体に」と言われるなら、プロジェクトの指示に書いておく" });
}

{
  const s = contentSlide("共通の文脈・形式・検証の手順を、設定に移す", "効率化は、人の確認をなくすことではなく、確かめやすくすること");
  const w3 = cw(3), h = 3.1;
  [
    ["プロジェクト", "共通の文脈と資料", "仕事ごとの作業場。例: 広報チームの表記のルールと過去の発表資料を置いておく", ""],
    ["スキル", "決まった作業の手順", "毎回同じやり方でこなすための手順。必要な場面でだけ読み込まれる。例: 月次報告の作り方", "2026年11月時点では、画面の上でプラグインのページにまとめられつつある。考え方は同じ"],
    ["常設の指示", "いつも守る書き方", "すべての会話に効く指示。いつも守ってほしい書き方を書いておく", ""],
  ].forEach(([n, tag, d, foot], i) => {
    const x = M + i * (w3 + 0.3);
    box(s, { x, y: Y0, w: w3, h, fill: C.background2, name: "Place" });
    T(s, n, { x: x + 0.22, y: Y0 + 0.2, w: w3 - 0.44, h: 0.5, size: 22, bold: true, color: C.accent1, name: "Place name" });
    T(s, tag, { x: x + 0.22, y: Y0 + 0.78, w: w3 - 0.44, h: 0.32, size: 14, bold: true, color: C.accent4, name: "Place tag" });
    T(s, d, { x: x + 0.22, y: Y0 + 1.18, w: w3 - 0.44, h: 1.2, size: 14, name: "Place desc" });
    if (foot) T(s, foot, { x: x + 0.22, y: Y0 + 2.2, w: w3 - 0.44, h: 0.78, size: 12, color: C.accent4, name: "Place foot" });
  });
  const y = 5.3, bh = 1.5, lw = 7.6;
  card(s, { x: M, y, w: lw, h: bh, title: "検証の手順も移す", fill: C.background1, line: C.accent1, body: "「数字には元の資料の名前を添える」と決めれば、人の確認が速くなる" });
  card(s, { x: M + lw + 0.3, y, w: CW - lw - 0.3, h: bh, title: "手に余る作り込みは相談", fill: C.background1, line: C.accent6, body: ["社内のシステムとの連携などは、", "技術の担当者に相談する"] });
}

{
  const s = contentSlide("迷ったら、ちょうどよい大きさの手を選ぶ", "試験が問うのは、機能の暗記ではなく判断。講座全体を6つの動詞で振り返る");
  const gap = 0.3, bw = cw(6, gap), y = Y0 + 0.1, h = 2.1;
  [
    ["第1章", "伝わる依頼を", "書く"],
    ["第2・3章", "出力を", "確かめる"],
    ["第4章", "仕事に合った製品とモデルを", "選ぶ"],
    ["第5・6章", "業務に組み込み、プロジェクトを設定して", "組み込む"],
    ["第7章", "データとルールを", "守る"],
    ["第8章", "原因をたどり、仕組みに残す", "直す"],
  ].forEach(([ch, d, v], i) => {
    const x = M + i * (bw + gap);
    box(s, { x, y, w: bw, h, fill: C.background2, name: "Recap" });
    T(s, ch, { x: x + 0.15, y: y + 0.15, w: bw - 0.3, h: 0.3, size: 12, bold: true, color: C.accent4, name: "Recap ch" });
    T(s, d, { x: x + 0.15, y: y + 0.5, w: bw - 0.3, h: 0.78, size: 12, name: "Recap desc" });
    T(s, v, { x: x + 0.15, y: y + 1.35, w: bw - 0.3, h: 0.55, size: 24, bold: true, color: C.accent1, name: "Recap verb" });
  });
  const by = 4.55, bh = 2.25;
  box(s, { x: M, y: by, w: CW, h: bh, fill: C.text2, name: "Rule" });
  T(s, "迷ったときに選ぶのは", { x: M + 0.4, y: by + 0.25, w: CW - 0.8, h: 0.35, size: 16, color: C.accent5, name: "Rule lead" });
  T(s, ["目的を果たしつつ、確かめられて、", "ルールに沿った、ちょうどよい大きさの手"], { x: M + 0.4, y: by + 0.7, w: CW - 0.8, h: 1.1, size: 26, bold: true, color: C.background1, name: "Rule text" });
}

// =====================================================================
// まとめ
section("まとめ");
{
  const s = slide("CLOSING");
  s.addText("試験直前チェック10", { placeholder: "title" });
  const items = [
    "目的、対象者、要点、形式、長さを伝える",
    "正確性と網羅性は別々に確かめる",
    "自信や流ちょうさは証拠ではない。原文と照らす",
    "人の確認は、届く先と影響の大きさで決める",
    "単純で大量なら速く安いモデル。いつも最上位は誤り",
    "手順ごとに、任せる、人が担う、協働するを決める",
    "古い版は外して入れ替え、指示も直す",
    "規制対象のデータは、入れる前に削除か匿名化",
    "人の生活に関わる判断は、人が決めて責任を持つ",
    "4つの原因にたどり、繰り返す手直しは設定へ",
  ];
  const colW = (CW - 0.5) / 2, rh = 1.0;
  items.forEach((t, i) => {
    const x = M + Math.floor(i / 5) * (colW + 0.5), y = 1.45 + (i % 5) * (rh + 0.06);
    bubble(s, x, y + 0.23, i + 1, { dark: true, size: 13 });
    T(s, t, { x: x + 0.6, y, w: colW - 0.6, h: rh, size: 15, color: C.background1, valign: "middle", name: "Check item" });
  });
}
{
  const s = slide("CLOSING");
  s.addText("次のステップ", { placeholder: "title" });
  const steps = [["音声で全体像をつかむ", "約64分。章ごとのミニクイズ付き"], ["問題集アプリで解く", ["100問。模擬試験は本番と同じ", "60問・120分"]], ["間違えた分野を復習する", "このスライドと解説で弱点を埋める"]];
  const bw = 3.45, gap = (CW - 3 * bw) / 2;
  steps.forEach(([t, d], i) => {
    const x = M + i * (bw + gap), y = 2.1;
    bubble(s, x + bw / 2 - 0.55, y, i + 1, { dark: true, filled: i === 1, w: 1.1, h: 1.5, size: 40, lineW: 2.5 });
    T(s, t, { x, y: y + 1.8, w: bw, h: 0.45, size: 20, bold: true, color: C.background1, align: "center", name: "Next title" });
    T(s, d, { x, y: y + 2.35, w: bw, h: 0.8, size: 14, color: C.accent5, align: "center", name: "Next desc" });
    if (i < 2) arrow(s, x + bw + 0.1, y + 0.75, x + bw + gap - 0.1, y + 0.75, { color: C.accent5, width: 2 });
  });
  T(s, "非公式の学習用教材です。公式の試験ガイド バージョン1.0（2026年7月発効）と2026年11月時点の公式ドキュメントに基づいています。2026年12月7日に試験内容の更新が予定されています。受験前に公式の試験ガイドで最新の内容を確認してください。", { x: M, y: 6.05, w: CW, h: 0.6, size: 12, color: C.accent5, name: "Disclaimer" });
}
deck.save(OUT).catch((e) => { console.error(e); process.exit(1); });

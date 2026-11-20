// CCAR-P キャッチアップ講座のスライド（pptx）を生成する。
// 使い方: node slides/build_deck.js [出力.pptx]   （省略時は ../CCAR-P_キャッチアップ講座.pptx）
// 共通部品は ../../shared/slides/deck_lib.js。確認用の画像は shared/slides/render.py で作る。
// 内容の「正」は ../course/ の本文。本文にない事実は足さない。
const path = require("path");
const { createDeck } = require("../../shared/slides/deck_lib.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "CCAR-P_キャッチアップ講座.pptx");
const deck = createDeck({
  code: "CCAR-P",
  title: "CCAR-P キャッチアップ講座",
  subject: "Claude Certified Architect – Professional 学習用（非公式）",
});
const { pres, C, SH, HEX, W, M, CW, Y0, YB, T, box, bubble, arrow, pill, card, trap, stat, section, slide, contentSlide, divider, check } = deck;

// ---------- この講座で使う小さな部品 ----------
const W2 = (CW - 0.3) / 2, W3 = (CW - 2 * 0.3) / 3, W4 = (CW - 3 * 0.3) / 4;
// 区切りのスライド。meta（分野・配点・音声の開始時刻）が1行に収まるかも見積もる
function chapter(num, title, meta, topics) {
  divider(num, title, meta, topics);
  check("meta", [meta], 16, 9.7, 0.45);
}
// ×（誤り）と○（正しい）の横長の箱
function verdict(s, { x, y, w, h, ok, text, size = 14 }) {
  box(s, { x, y, w, h, fill: ok ? C.background2 : C.background1, line: ok ? undefined : C.accent2, lineW: 1.75, name: ok ? "Good" : "Bad" });
  bubble(s, x + 0.25, y + (h - 0.54) / 2, ok ? "○" : "×", { red: !ok, size: 16 });
  T(s, text, { x: x + 0.85, y: y + 0.1, w: w - 1.1, h: h - 0.2, size, valign: "middle", name: ok ? "Good text" : "Bad text" });
}
// 流れ図の1段（見出し＋説明）
function step(s, { x, y, w, h, title, desc, hl = false, titleSize = 16, descSize = 14, pad = 0.2 }) {
  box(s, { x, y, w, h, fill: hl ? C.accent1 : C.background2, name: "Step" });
  const fg = hl ? C.background1 : C.text1, cc = hl ? C.background1 : C.accent1;
  const th = Math.max(0.36, deck.estHeight([title], titleSize, w - 2 * pad));
  T(s, title, { x: x + pad, y: y + pad - 0.02, w: w - 2 * pad, h: th, size: titleSize, bold: true, color: fg, codeColor: cc, name: "Step title" });
  if (desc) T(s, desc, { x: x + pad, y: y + pad + th + 0.08, w: w - 2 * pad, h: h - 2 * pad - th - 0.06, size: descSize, color: fg, codeColor: cc, name: "Step desc" });
}
// 横に並べた箱の x 座標（幅の配列と、すき間）
function xsOf(ws, x0 = M, total = CW) {
  const gap = (total - ws.reduce((a, b) => a + b, 0)) / (ws.length - 1);
  let x = x0;
  return { gap, xs: ws.map((w) => { const v = x; x += w + gap; return v; }) };
}

// =====================================================================
// 1. 表紙
section("はじめに");
{
  const s = slide("TITLE");
  s.addText("CCAR-P\nキャッチアップ講座", { placeholder: "title" });
  s.addText("Claude Certified Architect – Professional の出題範囲を、7つの分野・8つの章で復習する", { placeholder: "subtitle" });
  T(s, "非公式の学習用教材 ・ 音声講座（約62分）と同じ章立て", { x: 0.8, y: 5.75, w: 8, h: 0.4, size: 14, color: C.accent5, name: "Title note" });
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
  const s = contentSlide("63問・120分。合格はスケールスコア720", "100〜1000のスケールスコア。720は「72%正解」という意味ではない");
  [
    { value: "63", unit: "問", label: "問題数", sub: "択一式と複数選択式。選ぶ数は問題に書いてある" },
    { value: "120", unit: "分", label: "試験時間", sub: "1問あたり2分弱" },
    { value: "720", unit: "点", label: "合格ライン", sub: "100〜1000のスケールスコア" },
    { value: "7", unit: "分野", label: "出題範囲", sub: "最大は分野3 統合の19%" },
  ].forEach((d, i) => stat(s, { x: M + i * (W4 + 0.3), y: Y0 + 0.1, w: W4, h: 3.0, ...d }));
  T(s, "問題は、短い状況説明が1問ごとに完結する形。問われるのは、どう実装するかより、どれを選び、どう統制し、どう説明するか", { x: M, y: 5.3, w: CW, h: 0.6, size: 14, name: "Question style" });
  T(s, "公式の試験ガイド バージョン1.0（2026年7月発効）に基づく。2026年12月7日に試験内容の更新が予定されている。受験前に公式の試験ガイドで最新の内容を確認してください。", { x: M, y: 6.05, w: CW, h: 0.6, size: 12, color: C.accent4, name: "Caveat" });
}

// 3. 配点
{
  const s = contentSlide("分野3・1・4 で、全体の半分を超える", "最大は分野3 統合の19%。分野3は第3章と第4章の2つに分けて学ぶ");
  const labels = ["分野3 統合", "分野1 ソリューション設計とアーキテクチャ", "分野4 評価、テスト、最適化", "分野5 ガバナンス、安全性、リスク管理", "分野6 ステークホルダーとライフサイクル", "分野2 モデル、プロンプト、コンテキスト", "分野7 開発者の生産性と運用支援"];
  const values = [19, 17, 16, 14, 14, 13, 7];
  s.addChart(pres.charts.BAR, [{ name: "配点（%）", labels, values }], {
    x: M, y: Y0, w: 7.6, h: 4.8, barDir: "bar", catAxisOrientation: "maxMin",
    chartColors: [HEX.accent1, HEX.accent1, HEX.accent1, "7FB2AD", "7FB2AD", "7FB2AD", "7FB2AD"],
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', dataLabelFontSize: 12, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
    catAxisLabelFontSize: 12, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", catAxisLineShow: false,
    valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 24, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: false, barGapWidthPct: 45,
    showTitle: true, title: "分野別の配点（%）", titleFontSize: 14, titleColor: HEX.accent4, titleFontFace: "+mn-lt",
  });
  const x = 8.55, w = W - M - x;
  card(s, { x, y: Y0, w, h: 1.55, num: 1, title: "分野3・1・4 で52%", body: "統合、ソリューション設計、評価。第1・3・4・5章を最優先で固める" });
  card(s, { x, y: Y0 + 1.65, w, h: 1.55, num: 2, title: "分野5・6・2 で41%", body: "ガバナンス、ステークホルダー、モデルとプロンプト。第6・7・2章" });
  card(s, { x, y: Y0 + 3.3, w, h: 1.55, num: 3, title: "分野7 は7%で最小", body: "第8章。Claude Code のチーム設定と、レビューの規律" });
}

// =====================================================================
// 第1章
chapter(1, "ソリューション設計", "分野1 ソリューション設計とアーキテクチャ ・ 配点 17% ・ 音声 3:28〜", "役割の分担 ／ 入力からフィードバックループまで ／ 3つのパターン\n分解 ／ マルチエージェント ／ ビジネス価値の柱");

{
  const s = contentSlide("課題は Claude・既存システム・人に分ける", "分ける前に、今の業務を人がどう回し、例外をどう扱っているかを調べる");
  const h = 2.6;
  [
    ["Claude", "意味の理解が要る判断", "形の決まっていない文章の分類や、基準がよく変わる分類"],
    ["既存システム", "記録の正本と、刻々と変わる値", "在庫や口座の残高は、元のシステムにツールで問い合わせる"],
    ["人", "確かめて、承認する", "確信度が低いもの、取り消せない操作、誤ると被害が大きいものを確認する（第6章）"],
  ].forEach(([n, tag, d], i) => {
    const x = M + i * (W3 + 0.3);
    box(s, { x, y: Y0, w: W3, h, fill: C.background2, name: "Role" });
    T(s, n, { x: x + 0.25, y: Y0 + 0.2, w: W3 - 0.5, h: 0.5, size: 24, bold: true, color: C.accent1, name: "Role name" });
    T(s, tag, { x: x + 0.25, y: Y0 + 0.8, w: W3 - 0.5, h: 0.35, size: 14, bold: true, color: C.accent4, name: "Role tag" });
    T(s, d, { x: x + 0.25, y: Y0 + 1.25, w: W3 - 0.5, h: h - 1.4, size: 14, name: "Role desc" });
  });
  const y = 4.85, h2 = 1.95;
  card(s, { x: M, y, w: W2, h: h2, title: "分ける前に調べること", fill: C.background1, line: C.accent6, bullet: true, body: [
    "今の業務を、人がどう回しているか",
    "例外や曖昧な案件を、どう扱っているか",
    "既存のルールが、どこで失敗しているか",
  ] });
  trap(s, { x: M + W2 + 0.3, y, w: W2, h: h2 }, "在庫や残高を検索用のインデックスに写して答えさせると、値が古くなる。元のシステムにツールで問い合わせる");
}

{
  const s = contentSlide("流れはフィードバックまで、成果は価値の柱で測る", "入力 → 処理 → 出力 → フィードバックループ。狙う柱を決め、測れる成功基準にする");
  const y = Y0, h = 1.75;
  const ws = [2.45, 2.45, 2.45, 3.35];
  const { gap, xs } = xsOf(ws);
  [
    ["入力", "どのシステムから、どんな形で届くか"],
    ["処理", "Claude とツールが何をするか"],
    ["出力", "結果をどこへ渡し、誰が使うか"],
    ["フィードバックループ", "人が直した箇所と失敗した事例を集め、評価とプロンプトの見直しに使う"],
  ].forEach(([t, d], i) => {
    step(s, { x: xs[i], y, w: ws[i], h, title: t, desc: d, hl: i === 3, titleSize: 18 });
    if (i < 3) arrow(s, xs[i] + ws[i] + 0.05, y + h / 2, xs[i] + ws[i] + gap - 0.05, y + h / 2);
  });
  // 戻りの矢印（フィードバックループ → 入力）
  const ly = y + h + 0.3, x4 = xs[3] + ws[3] / 2, x1 = xs[0] + ws[0] / 2;
  arrow(s, x4, y + h + 0.04, x4, ly, { head: false, color: C.accent1, width: 2 });
  arrow(s, x4, ly, x1, ly, { head: false, color: C.accent1, width: 2 });
  arrow(s, x1, ly, x1, y + h + 0.06, { color: C.accent1, width: 2 });
  T(s, "本番の結果を、次の改善に戻す（見落としやすい）", { x: x1 + 0.3, y: ly + 0.06, w: 6, h: 0.35, size: 12, bold: true, color: C.accent1, name: "Loop label" });
  const by = 4.75, bh = 2.05, lw = 7.4;
  box(s, { x: M, y: by, w: lw, h: bh, fill: C.background2, name: "Pillars" });
  T(s, "ビジネス価値の柱（試験ガイドの5つ）", { x: M + 0.25, y: by + 0.2, w: lw - 0.5, h: 0.36, size: 16, bold: true, name: "Pillars title" });
  const pills = [["効率性", 1.05], ["変革", 0.85], ["生産性", 1.05], ["コスト", 1.05], ["パフォーマンス SLA", 2.1]];
  let px = M + 0.25;
  pills.forEach(([t, w]) => { pill(s, t, { x: px, y: by + 0.7, w, h: 0.36, size: 13 }); px += w + 0.15; });
  T(s, "主に狙う柱を決め、測れる基準に。例: 問い合わせの振り分けなら、1件あたりのコストと、上位の窓口に回した割合", { x: M + 0.25, y: by + 1.2, w: lw - 0.5, h: 0.7, size: 14, name: "Pillars desc" });
  card(s, { x: M + lw + 0.3, y: by, w: CW - lw - 0.3, h: bh, title: "柱どうしはぶつかる", fill: C.background1, line: C.accent6, body: "精度を上げる構成は、遅く、高くなりがち。どの柱を優先する状況かを読み取って選ぶ" });
}

{
  const s = contentSlide("いちばん単純なパターンから始める", "必要なときだけ複雑さを足す。多くの用途は、拡張LLMで足りる");
  const bw = 3.55, { gap, xs } = xsOf([bw, bw, bw]), y = Y0, h = 2.55;
  [
    ["拡張LLM", "検索、ツール、メモリで補強した、1回のモデル呼び出し", "多くの用途は、これで足りる"],
    ["ワークフロー", "モデルとツールを、あらかじめコードで決めた経路で動かす", "手順が決まっている。予測しやすく一貫性がある"],
    ["エージェント型", "モデルが自分で、手順とツールの使い方を決める", "必要な手順の数を、前もって読めない問題"],
  ].forEach(([n, d, when], i) => {
    const x = xs[i];
    box(s, { x, y, w: bw, h, fill: i === 0 ? C.background1 : C.background2, line: i === 0 ? C.accent1 : undefined, lineW: 1.75, name: "Pattern" });
    T(s, n, { x: x + 0.25, y: y + 0.2, w: bw - 0.5, h: 0.5, size: 22, bold: true, color: C.accent1, name: "Pattern name" });
    T(s, d, { x: x + 0.25, y: y + 0.8, w: bw - 0.5, h: 0.9, size: 14, name: "Pattern desc" });
    T(s, `向く: ${when}`, { x: x + 0.25, y: y + 1.75, w: bw - 0.5, h: 0.62, size: 14, bold: true, color: C.accent4, name: "Pattern when" });
    if (i < 2) arrow(s, x + bw + 0.08, y + h / 2, x + bw + gap - 0.08, y + h / 2);
  });
  // 右へ行くほど
  const sy = 4.75;
  arrow(s, M, sy, W - M, sy, { color: C.accent2, width: 2.5 });
  T(s, "右へ行くほど柔軟になるが、レイテンシとコストが増え、誤りが積み重なるおそれも出る", { x: M, y: sy + 0.12, w: CW, h: 0.35, size: 14, bold: true, color: C.accent2, align: "center", name: "Scale note" });
  trap(s, { x: M, y: 5.55, w: CW, h: 1.25 }, "「エージェントのほうが常に高度で正しい」という選択肢は疑う。選ぶときは、それぞれのコストを言葉にする");
}

{
  const s = contentSlide("分解の形が、パターンを決める", "マルチエージェントは、価値が高く、並列にしやすい仕事に限る");
  const lw = 7.2, rh = 1.08, gap = 0.17;
  [
    ["決まった順番の手順に分かれる", "プロンプトチェーン", "前の段の出力を次の入力に。段の間にコードのチェックを置ける"],
    ["はっきり違う種類の入力が混ざる", "ルーティング", "種類ごとに振り分ける"],
    ["互いに独立した部分に分かれる", "並列化", "同時に処理する"],
    ["サブタスクを事前に決められない", "オーケストレーター・ワーカー", "中心のモデルが、その場で分けて任せる"],
  ].forEach(([k, n, d], i) => {
    const y = Y0 + i * (rh + gap);
    box(s, { x: M, y, w: lw, h: rh, fill: C.background2, name: "Decomp row" });
    T(s, k, { x: M + 0.2, y, w: 3.1, h: rh, size: 14, bold: true, valign: "middle", name: "Decomp key" });
    arrow(s, M + 3.3, y + rh / 2, M + 3.7, y + rh / 2, { color: C.accent1 });
    T(s, n, { x: M + 3.85, y: y + 0.13, w: lw - 3.95, h: 0.36, size: 15, bold: true, color: C.accent1, name: "Decomp name" });
    T(s, d, { x: M + 3.85, y: y + 0.5, w: lw - 3.95, h: rh - 0.58, size: 12, color: C.accent4, name: "Decomp desc" });
  });
  const rx = M + lw + 0.3, rw = W - M - rx;
  stat(s, { x: rx, y: Y0, w: rw, h: 2.3, value: "約15", unit: "倍", label: "マルチエージェントのトークン消費", sub: "ふつうのチャットと比べて（公式の記事）" });
  card(s, { x: rx, y: Y0 + 2.5, w: rw, h: 2.35, fill: C.background1, line: C.accent6, bullet: true, body: [
    "向く: 価値が高く、並列にしやすく、1つのコンテキストに収まらない情報を扱う仕事",
    "向かない: コンテキストの共有や、エージェントどうしの依存が多い仕事",
    "任せるときは、目的・出力の形式・ツールと情報源・境界を渡す",
  ] });
}

// =====================================================================
// 第2章
chapter(2, "モデルとプロンプトの設計", "分野2 モデル、プロンプト、コンテキスト ・ 配点 13% ・ 音声 10:24〜", "モデルの選択 ／ システムプロンプトとガードレール ／ プロンプトの手法\nコンテキストの管理 ／ キャッシュ・モジュール・Skills");

{
  const s = contentSlide("モデルは評価で選び、替える前にも評価を通す", "比べる軸は品質・速度・コスト。決め手は、実際のプロンプトとデータを使った評価");
  const lw = 4.9, bh = 1.2;
  [["始め方 1", "速くて安いモデルから始め、足りないときだけ上げる"], ["始め方 2", "高性能なモデルから始め、あとで効率のよいモデルに移す"]].forEach(([t, d], i) => {
    const y = Y0 + i * (bh + 0.25);
    box(s, { x: M, y, w: lw, h: bh, fill: C.background2, name: "Start" });
    T(s, t, { x: M + 0.25, y: y + 0.14, w: lw - 0.5, h: 0.32, size: 14, bold: true, color: C.accent4, name: "Start label" });
    T(s, d, { x: M + 0.25, y: y + 0.48, w: lw - 0.5, h: 0.66, size: 15, bold: true, name: "Start text" });
  });
  const gx = M + lw + 0.75, gw = 3.4, gy = Y0, gh = 2 * bh + 0.25;
  arrow(s, M + lw + 0.06, Y0 + bh / 2, gx - 0.06, gy + gh / 2 - 0.2, { color: C.accent1 });
  arrow(s, M + lw + 0.06, Y0 + bh + 0.25 + bh / 2, gx - 0.06, gy + gh / 2 + 0.2, { color: C.accent1 });
  box(s, { x: gx, y: gy, w: gw, h: gh, fill: C.accent1, name: "Gate" });
  T(s, "評価という関門", { x: gx + 0.25, y: gy + 0.25, w: gw - 0.5, h: 0.4, size: 18, bold: true, color: C.background1, name: "Gate title" });
  T(s, "実際のプロンプトとデータで、品質・速度・コストを比べる", { x: gx + 0.25, y: gy + 0.8, w: gw - 0.5, h: 1.6, size: 15, color: C.background1, name: "Gate text" });
  const fx = gx + gw + 0.55, fw = W - M - fx;
  arrow(s, gx + gw + 0.06, gy + gh / 2, fx - 0.06, gy + gh / 2, { color: C.accent1 });
  step(s, { x: fx, y: gy + 0.45, w: fw, h: gh - 0.9, title: "選ぶ・替える", desc: "基準を満たすと確かめてから" });
  T(s, "2026年11月時点: Haiku が最も速く安い系統。同じモデルのまま `effort` で考える深さを変える手も勧められている", { x: M, y: 4.85, w: CW, h: 0.4, size: 14, color: C.accent4, name: "Model note" });
  trap(s, { x: M, y: 5.5, w: CW, h: 1.3 }, "評価なしのモデル変更は誤答の定番。最小のモデルへ替えると品質を損ない、大きなモデルへ替えても、原因が権限や検索にあれば効かない");
}

{
  const s = contentSlide("プロンプトは土台を固め、手法は課題で選ぶ", "役割・テンプレート・ガードレールで土台を作り、例や思考は、評価で足りない点が見えたら足す");
  const h = 2.2;
  [
    ["役割", "システムプロンプトで役割を与える。1文でも振る舞いと口調が合う。指示には理由を添える"],
    ["テンプレート", "毎回変わらない指示と、入れ替わる入力を分ける。入れ替わる部分は XML のタグで囲む"],
    ["ガードレール", "「分からない」と答えてよいと明示。外部の文書やツールの結果は、信頼できないデータとして扱わせる"],
    ["ゼロショット", "例を見せず、指示だけで頼む。まずこれで試し、足りない点が見えたら手を足す"],
    ["few-shot", "入力と出力の例を見せる。形式や口調をそろえる確実な手。例は3〜5個、用途に近く互いに違うもの"],
    ["思考の連鎖", "答える前に段階を追って考えさせる。時間とトークンが増える。新しいモデルでは思考の機能に任せるのが基本"],
  ].forEach(([t, b], i) => {
    const row = Math.floor(i / 3);
    card(s, { x: M + (i % 3) * (W3 + 0.3), y: Y0 + row * (h + 0.15), w: W3, h, num: i + 1, title: t, body: b,
      fill: row ? C.background1 : C.background2, line: row ? C.accent6 : undefined });
  });
  T(s, "上の段が土台、下の段が手法。ガードレールはプロンプトだけでは完全に防げないので、権限を絞る統制と組み合わせる（第6章）", { x: M, y: 6.6, w: CW, h: 0.3, size: 12, color: C.accent4, name: "Grid note" });
}

{
  const s = contentSlide("コンテキストは、量より信号の濃さで管理する", "必要で信号の濃いトークンを、できるだけ少なく渡す");
  T(s, "コンテキストウィンドウ（作業用の記憶）には、出力も含めて、すべてが数えられる", { x: M, y: Y0, w: CW, h: 0.36, size: 16, bold: true, name: "Window label" });
  const y = Y0 + 0.5, h = 0.85;
  const segs = [["システムプロンプト", 2.9, C.accent1], ["履歴", 2.4, C.accent1], ["ツールの結果", 2.9, C.accent1], ["出力", 2.0, C.accent3]];
  let x = M;
  segs.forEach(([t, w, fill]) => {
    box(s, { x, y, w, h, fill, r: 0, name: "Window seg" });
    T(s, t, { x, y, w, h, size: 14, bold: true, color: fill === C.accent3 ? C.text1 : C.background1, align: "center", valign: "middle", name: "Seg text" });
    x += w + 0.06;
  });
  box(s, { x, y, w: W - M - x, h, fill: C.background1, line: C.accent4, dash: "dash", r: 0, name: "Window rest" });
  T(s, "上限", { x, y, w: W - M - x, h, size: 14, bold: true, color: C.accent4, align: "center", valign: "middle", name: "Rest text" });
  T(s, "増やすほど、正確に思い出す力が落ちる（context rot）。多ければよいわけではない", { x: M, y: y + h + 0.12, w: CW, h: 0.36, size: 14, bold: true, color: C.accent2, name: "Rot note" });
  const cy = 4.35, ch = 1.25;
  [
    ["長い文書は上に、質問は最後に置く"],
    ["長い会話では、古いツールの結果を消し、やり取りを要約する"],
    ["送る前にトークン数を見積もる"],
  ].forEach(([b], i) => card(s, { x: M + i * (W3 + 0.3), y: cy, w: W3, h: ch, num: i + 1, title: b, titleSize: 14 }));
  trap(s, { x: M, y: 5.8, w: CW, h: 1.0 }, "必要な方針文書を切り詰めて軽くするのは、誤答の定番。答えに要る情報まで消える");
}

{
  const s = contentSlide("繰り返す部分は、先頭に固定して再利用する", "キャッシュは先頭からの一致で効く。情報を捨てずに、待ち時間とコストを両方下げる");
  const y = 2.55, h = 0.85;
  const segs = [["変わらないシステムプロンプト", 3.9], ["参照文書", 2.6]];
  let x = M;
  segs.forEach(([t, w]) => {
    box(s, { x, y, w, h, fill: C.accent1, r: 0, name: "Prefix seg" });
    T(s, t, { x, y, w, h, size: 14, bold: true, color: C.background1, align: "center", valign: "middle", name: "Seg text" });
    x += w + 0.06;
  });
  T(s, "キャッシュが効く部分（先頭から一致）", { x: M, y: y - 0.45, w: x - M, h: 0.35, size: 14, bold: true, color: C.accent1, align: "center", name: "Prefix label" });
  const restX = x + 0.2;
  box(s, { x: restX, y, w: W - M - restX, h, fill: C.background1, line: C.accent4, dash: "dash", r: 0, name: "Variable seg" });
  T(s, "毎回変わる入力は後ろに", { x: restX, y, w: W - M - restX, h, size: 14, bold: true, color: C.accent4, align: "center", valign: "middle", name: "Var text" });
  T(s, "先頭に現在時刻などを入れると、毎回キャッシュが外れる", { x: M, y: y + h + 0.1, w: CW, h: 0.35, size: 14, bold: true, color: C.accent2, name: "Miss note" });
  const cy = 4.2, ch = 2.6;
  card(s, { x: M, y: cy, w: W3, h: ch, num: 1, title: "プロンプトキャッシング", body: "最初のトークンが返るまでの時間と、1回あたりのコストが下がる。切り詰めと違い、情報を捨てない" });
  card(s, { x: M + W3 + 0.3, y: cy, w: W3, h: ch, num: 2, title: "モジュール型のプロンプト", body: "役割、方針、出力の形式といった部品に分けて使い回す。並び順を固定すると、キャッシュとの相性もよい" });
  card(s, { x: M + 2 * (W3 + 0.3), y: cy, w: W3, h: ch, num: 3, title: "Skills", body: "ふだんは名前と説明だけが載り、課題に合ったときだけ中身を読む。信頼できる出どころのものだけを使う" });
}

// =====================================================================
// 第3章
chapter(3, "統合の設計と認証・認可", "分野3 統合（前半） ・ 配点 19% ・ 音声 17:27〜", "機能の肥大化 ／ 認証と認可 ／ 統合メカニズムと提供ルート\n段階的ディスカバリーと一括型");

{
  const s = contentSlide("要らない機能は、構成から外す", "判断の軸は最小権限。ログや確認を足しても、危ない機能は残ったまま");
  const lw = 6.1, rh = 1.12, gap = 0.18;
  T(s, "もっともらしい誤答", { x: M, y: Y0, w: lw, h: 0.4, size: 18, bold: true, color: C.accent2, name: "Wrong title" });
  [
    ["ログを足す", "後から不正を見つける、発見的な統制"],
    ["実行の前に確認を挟む", "補完的な統制。機能は残る"],
    ["大きなモデルに替える", "モデルの大きさは、認可の範囲と無関係"],
  ].forEach(([t, d], i) => {
    const y = Y0 + 0.55 + i * (rh + gap);
    box(s, { x: M, y, w: lw, h: rh, fill: C.background1, line: C.accent2, lineW: 1.25, name: "Wrong row" });
    bubble(s, M + 0.22, y + (rh - 0.54) / 2, "×", { red: true, size: 16 });
    T(s, t, { x: M + 0.85, y: y + 0.14, w: lw - 1.05, h: 0.36, size: 16, bold: true, name: "Wrong name" });
    T(s, d, { x: M + 0.85, y: y + 0.55, w: lw - 1.05, h: 0.45, size: 14, color: C.accent4, name: "Wrong desc" });
  });
  const rx = M + lw + 0.3, rw = W - M - rx;
  box(s, { x: rx, y: Y0, w: rw, h: 2.2, fill: C.accent1, name: "Right answer" });
  bubble(s, rx + 0.25, Y0 + 0.22, "○", { dark: true, size: 16 });
  T(s, "要らないツールと権限を、構成から外す", { x: rx + 0.85, y: Y0 + 0.2, w: rw - 1.1, h: 0.75, size: 17, bold: true, color: C.background1, name: "Right title" });
  T(s, "例: 問い合わせを要約するだけのエージェントに、顧客データを書き換えるツールが付いていたら、外す", { x: rx + 0.25, y: Y0 + 1.1, w: rw - 0.5, h: 0.95, size: 14, color: C.background1, name: "Right example" });
  stat(s, { x: rx, y: Y0 + 2.45, w: rw, h: 2.4, value: "30〜50", unit: "個を超えると", label: "ツール選択の精度が落ちる", sub: "2026年11月時点のドキュメントの目安" });
}

{
  const s = contentSlide("認証と認可を分けて、すき間を探す", "認証は相手が誰か、認可は何を許すか。MCP は、つないだだけでは守られない");
  const y = Y0 + 0.35, h = 1.0, bw = 2.9;
  const xs = [M, (W - bw) / 2, W - M - bw];
  ["MCP クライアント", "MCP サーバー", "先のサービス"].forEach((t, i) => {
    box(s, { x: xs[i], y, w: bw, h, fill: i === 1 ? C.text2 : C.background2, name: "Party" });
    T(s, t, { x: xs[i], y, w: bw, h, size: 16, bold: true, color: i === 1 ? C.background1 : C.text1, align: "center", valign: "middle", name: "Party name" });
  });
  T(s, "トークン A", { x: xs[0] + bw - 0.3, y: y - 0.36, w: xs[1] - xs[0] - bw + 0.6, h: 0.32, size: 12, bold: true, color: C.accent1, align: "center", name: "Token A" });
  arrow(s, xs[0] + bw + 0.08, y + h / 2, xs[1] - 0.08, y + h / 2, { color: C.accent1, width: 2 });
  T(s, "トークン B（別に発行）", { x: xs[1] + bw - 0.3, y: y - 0.36, w: xs[2] - xs[1] - bw + 0.6, h: 0.32, size: 12, bold: true, color: C.accent1, align: "center", name: "Token B" });
  arrow(s, xs[1] + bw + 0.08, y + h / 2, xs[2] - 0.08, y + h / 2, { color: C.accent1, width: 2 });
  T(s, "自分あてに発行されたトークンだけを受け付ける", { x: xs[1] - 0.6, y: y + h + 0.1, w: bw + 1.2, h: 0.35, size: 12, bold: true, color: C.accent1, align: "center", name: "Server note" });
  verdict(s, { x: M + 1.6, y: y + h + 0.6, w: CW - 3.2, h: 0.75, ok: false, text: "受け取ったトークンを、そのまま先のサービスへ渡す（MCP の仕様で禁止）" });
  const cy = 4.75, ch = 2.05;
  card(s, { x: M, y: cy, w: W3, h: ch, title: "MCP の認可は任意", body: "HTTP のサーバーは OAuth 2.1 をもとにした仕様に沿う。スコープは最小から始め、必要なときに広げる" });
  card(s, { x: M + W3 + 0.3, y: cy, w: W3, h: ch, title: "STDIO は資格情報を受け継ぐ", body: "資格情報を環境から受け取り、クライアントと同じ権限で動く。何を受け継いでいるかを監査する" });
  card(s, { x: M + 2 * (W3 + 0.3), y: cy, w: W3, h: ch, title: "人と仕組みを分ける", body: "社員の入口は組織の ID 基盤と SSO で。サーバーどうしは、使い回す API キーより短期の資格情報" });
}

{
  const s = contentSlide("統合の手段は、つなぐ相手と使い方で選ぶ", "使い回すなら MCP、CLI があれば CLI、独立した並列の仕事ならエージェント間");
  const h = 3.05;
  [
    ["MCP", "多くのアプリで使い回す", "AI のアプリと外部のシステムをつなぐ、オープンな標準。同じ社内システムを、いくつものアプリやチームで使うときに向く"],
    ["API ・ CLI", "より直接につなぐ", "相手に CLI があれば、たいていそれがいちばん簡単な入り口。自分のアプリだけで使う連携なら、API を呼ぶ自作ツールで足りる"],
    ["エージェント間", "別のエージェントに任せる", "任された側は自分のコンテキストで作業し、結果をまとめて返す。独立した調べものに向く。文脈の共有や依存が多い仕事には向かない"],
  ].forEach(([n, tag, d], i) => {
    const x = M + i * (W3 + 0.3);
    box(s, { x, y: Y0, w: W3, h, fill: i === 0 ? C.text2 : C.background2, name: "Mechanism" });
    const dark = i === 0;
    T(s, n, { x: x + 0.25, y: Y0 + 0.2, w: W3 - 0.5, h: 0.5, size: 22, bold: true, color: dark ? C.background1 : C.accent1, name: "Mech name" });
    T(s, tag, { x: x + 0.25, y: Y0 + 0.78, w: W3 - 0.5, h: 0.32, size: 14, bold: true, color: dark ? C.accent5 : C.accent4, name: "Mech tag" });
    T(s, d, { x: x + 0.25, y: Y0 + 1.2, w: W3 - 0.5, h: h - 1.35, size: 14, color: dark ? C.background1 : C.text1, name: "Mech desc" });
  });
  card(s, { x: M, y: 5.25, w: CW, h: 1.55, title: "提供ルートも選ぶ", fill: C.background1, line: C.accent6, body: "直接の API のほか、Amazon Bedrock や Google Cloud のようなクラウド経由でも使える。レイテンシ、コンプライアンス、コストで比べ、必要な機能がそのルートで使えるかを先に確かめる" });
}

{
  const s = contentSlide("いつも要る小さな情報は先、時々要る大きな情報は後", "一括型は最初に全部載せる。段階的ディスカバリーは目次だけを渡し、必要な分をあとから読み込む");
  const h = 2.35;
  const col = (x, title, good, bad, when) => {
    box(s, { x, y: Y0, w: W2, h, fill: C.background2, name: "Strategy" });
    T(s, title, { x: x + 0.25, y: Y0 + 0.18, w: W2 - 0.5, h: 0.42, size: 20, bold: true, color: C.accent1, name: "Strategy title" });
    T(s, [`○ ${good}`, `× ${bad}`, `向く: ${when}`], { x: x + 0.25, y: Y0 + 0.72, w: W2 - 0.5, h: h - 0.9, size: 14, after: 4, name: "Strategy body" });
  };
  col(M, "一括型コンテキスト", "単純で、実行中に探す手間がない", "量が増えるとコンテキストを圧迫し、関係のない情報が判断を鈍らせる", "ツールが10個に満たず、毎回すべてを使う");
  col(M + W2 + 0.3, "段階的ディスカバリー", "必要な分だけ載せ、コンテキストを節約できる", "実行中に探すぶん遅く、説明文があいまいだと見落とす", "量が多く、ときどきしか使わない");
  // Skills の読み込みの段階
  const fy = 4.6, fh = 1.0;
  T(s, "代表例: Skills", { x: M, y: fy, w: 2.0, h: fh, size: 16, bold: true, color: C.accent1, valign: "middle", name: "Skills label" });
  const ws = [3.0, 3.0, 3.0], { gap, xs } = xsOf(ws, M + 2.05, CW - 2.05);
  [["名前と説明", "最初から読む"], ["`SKILL.md` の本文", "作業に合えば読む"], ["付属のファイル", "さらに必要なら読む"]].forEach(([t, d], i) => {
    step(s, { x: xs[i], y: fy, w: ws[i], h: fh, title: t, desc: d, hl: i === 0, titleSize: 15, descSize: 12, pad: 0.16 });
    if (i < 2) arrow(s, xs[i] + ws[i] + 0.05, fy + fh / 2, xs[i] + ws[i] + gap - 0.05, fy + fh / 2);
  });
  T(s, ["ツールも同じ: ツール検索ツールを使い、`defer_loading` を付けた定義は、検索されて初めて載る", "実際は組み合わせる: Claude Code は CLAUDE.md を最初に読み、ほかのファイルは必要なときに探す"], { x: M, y: 5.8, w: CW, h: 0.95, size: 14, bullet: true, after: 4, name: "Discovery notes" });
}

// =====================================================================
// 第4章
chapter(4, "RAG と運用の見える化", "分野3 統合（後半） ・ 配点 19% ・ 音声 24:20〜", "精度とレイテンシ ／ チャンキング ／ インデックス\n検索戦略 ／ オブザーバビリティ");

{
  const s = contentSlide("精度を出してから、レイテンシを削る", "先に削ると、最高の性能が分からなくなる。構成の根拠は、実データで測った数字");
  const bw = 3.55, { gap, xs } = xsOf([bw, bw, bw]), y = Y0, h = 1.45;
  ["制約を付けずに、うまく動くプロンプトを作る", "実際のデータで、精度とレイテンシを測る", "要件を満たす中で、最も軽い構成を選ぶ"].forEach((t, i) => {
    box(s, { x: xs[i], y, w: bw, h, fill: i === 2 ? C.accent1 : C.background2, name: "Order step" });
    bubble(s, xs[i] + 0.2, y + (h - 0.48) / 2, i + 1, { w: 0.36, h: 0.48, size: 13 });
    T(s, t, { x: xs[i] + 0.72, y: y + 0.12, w: bw - 0.9, h: h - 0.24, size: 16, bold: true, color: i === 2 ? C.background1 : C.text1, valign: "middle", name: "Order text" });
    if (i < 2) arrow(s, xs[i] + bw + 0.06, y + h / 2, xs[i] + bw + gap - 0.06, y + h / 2);
  });
  T(s, "減らす手段", { x: M, y: 3.75, w: CW, h: 0.36, size: 16, bold: true, name: "Means title" });
  const mw = (CW - 4 * 0.2) / 5;
  [["速いモデルを選ぶ", ""], ["`effort` を下げる", ""], ["プロンプトと出力を短くする", ""], ["プロンプトキャッシング", ""], ["ストリーミング", "（体感の待ち時間）"]].forEach(([t, d], i) => {
    const x = M + i * (mw + 0.2);
    box(s, { x, y: 4.2, w: mw, h: 1.05, fill: C.background1, line: C.accent6, name: "Mean" });
    T(s, d ? [t, d] : t, { x: x + 0.15, y: 4.25, w: mw - 0.3, h: 0.95, size: d ? 13 : 14, bold: !d, align: "center", valign: "middle", name: "Mean text" });
  });
  trap(s, { x: M, y: 5.55, w: CW, h: 1.25 }, "「速くしたいから最小のモデル」は根拠にならない。必要な文書を切り捨てて速くする案は、誤答の定番");
}

{
  const s = contentSlide("チャンクは、文脈が切れない形で作る", "切り出した1文だけでは、どの会社の、いつの話かが分からない");
  const y = Y0, h = 2.4, lw = 5.0;
  box(s, { x: M, y, w: lw, h, fill: C.background1, line: C.accent6, name: "Plain chunk" });
  T(s, "ふつうのチャンク", { x: M + 0.25, y: y + 0.18, w: lw - 0.5, h: 0.36, size: 14, bold: true, color: C.accent4, name: "Plain label" });
  box(s, { x: M + 0.25, y: y + 0.7, w: lw - 0.5, h: 0.75, fill: C.background2, r: 0.05, name: "Chunk" });
  T(s, "売上が前の四半期から3%伸びた", { x: M + 0.4, y: y + 0.7, w: lw - 0.8, h: 0.75, size: 15, bold: true, valign: "middle", name: "Chunk text" });
  T(s, "どの会社の、いつの話か分からない", { x: M + 0.25, y: y + 1.65, w: lw - 0.5, h: 0.4, size: 14, bold: true, color: C.accent2, name: "Plain problem" });
  const rx = M + lw + 0.9, rw = W - M - rx;
  arrow(s, M + lw + 0.12, y + h / 2, rx - 0.12, y + h / 2, { color: C.accent1, width: 2.5 });
  box(s, { x: rx, y, w: rw, h, fill: C.background2, name: "Context chunk" });
  T(s, "Contextual Retrieval（Anthropic の手法）", { x: rx + 0.25, y: y + 0.18, w: rw - 0.5, h: 0.36, size: 14, bold: true, color: C.accent1, name: "CR label" });
  box(s, { x: rx + 0.25, y: y + 0.7, w: rw - 0.5, h: 0.5, fill: C.accent1, r: 0.05, name: "Context prefix" });
  T(s, "文書全体から見た短い説明（Claude が書く）", { x: rx + 0.4, y: y + 0.7, w: rw - 0.8, h: 0.5, size: 14, bold: true, color: C.background1, valign: "middle", name: "Prefix text" });
  box(s, { x: rx + 0.25, y: y + 1.2, w: rw - 0.5, h: 0.6, fill: C.background1, r: 0.05, name: "Chunk" });
  T(s, "売上が前の四半期から3%伸びた", { x: rx + 0.4, y: y + 1.2, w: rw - 0.8, h: 0.6, size: 15, bold: true, valign: "middle", name: "Chunk text" });
  T(s, "各チャンクの先頭に付けてから、インデックスを作る", { x: rx + 0.25, y: y + 1.9, w: rw - 0.5, h: 0.36, size: 14, color: C.accent4, name: "CR note" });
  const cy = 4.5, ch = 2.3;
  card(s, { x: M, y: cy, w: W2, h: ch, title: "大きさ・区切る位置・前後の重なり", body: "どれも検索の精度に影響する。決まった正解はなく、自分の文書と質問で試して決める" });
  stat(s, { x: M + W2 + 0.3, y: cy, w: W2, h: ch, value: "20万", unit: "トークン未満", label: "なら RAG が要らない場合も", sub: "全部をプロンプトに載せてキャッシュ（記事の目安）" });
}

{
  const s = contentSlide("検索は、データの形と質問の型で選ぶ", "型番やエラーコードはキーワード、言い換えは意味の検索。両方来るなら組み合わせる");
  const y = Y0, sh = 1.2, sg = 0.15;
  const qx = M, qw = 1.2, sx = M + 1.6, sw = 3.9, mx = sx + sw + 0.5, mw = 1.55, rx = mx + mw + 0.45, rw = 2.1, fx = rx + rw + 0.45, fw = W - M - fx;
  const cy = y + sh + sg / 2;
  step(s, { x: qx, y: cy - 0.5, w: qw, h: 1.0, title: "質問", titleSize: 16 });
  [["意味で探す（埋め込み）", "言い換えに強い。型番などの一致を取りこぼすことも"], ["言葉の一致で探す（BM25 など）", "型番やエラーコードのような、文字どおりの一致に強い"]].forEach(([t, d], i) => {
    const yy = y + i * (sh + sg);
    step(s, { x: sx, y: yy, w: sw, h: sh, title: t, desc: d, titleSize: 15, descSize: 12, pad: 0.12 });
    arrow(s, qx + qw + 0.05, cy, sx - 0.06, yy + sh / 2, { color: C.accent1 });
    arrow(s, sx + sw + 0.06, yy + sh / 2, mx - 0.06, cy, { color: C.accent1 });
  });
  step(s, { x: mx, y: cy - 0.6, w: mw, h: 1.2, title: "順位で統合", titleSize: 15, pad: 0.16 });
  arrow(s, mx + mw + 0.05, cy, rx - 0.05, cy, { color: C.accent1 });
  step(s, { x: rx, y: cy - 0.65, w: rw, h: 1.3, title: "リランカー", desc: "関連度で採点し直す", hl: true, titleSize: 15, descSize: 12, pad: 0.16 });
  arrow(s, rx + rw + 0.05, cy, fx - 0.05, cy, { color: C.accent1 });
  step(s, { x: fx, y: cy - 0.5, w: fw, h: 1.0, title: "プロンプトへ", titleSize: 14, pad: 0.14 });
  T(s, "Anthropic は埋め込みモデルを提供していないので、提供元を選んで比べる", { x: M, y: y + 2 * sh + sg + 0.08, w: CW, h: 0.32, size: 12, color: C.accent4, name: "Embed note" });
  const by = 4.95, bh = 1.85;
  box(s, { x: M, y: by, w: W3, h: bh, fill: C.background2, name: "Rerank stat" });
  s.addText([{ text: "約1/3", options: { fontSize: 44, bold: true, color: C.accent1 } }], { x: M + 0.25, y: by + 0.15, w: W3 - 0.5, h: 0.8, valign: "bottom", margin: 0, isTextBox: true, objectName: "Rerank value" });
  T(s, "検索の失敗率（記事の評価）", { x: M + 0.25, y: by + 1.0, w: W3 - 0.5, h: 0.32, size: 14, bold: true, name: "Rerank label" });
  T(s, "説明・キーワード・リランカーを重ねた結果。その分、レイテンシとコストが増える", { x: M + 0.25, y: by + 1.32, w: W3 - 0.5, h: 0.45, size: 11, color: C.accent4, name: "Rerank sub" });
  card(s, { x: M + W3 + 0.3, y: by, w: W3, h: bh, title: "インデックスの新しさ", fill: C.background1, line: C.accent2, body: "文書の更新後に誤答が始まり、モデルもレイテンシも不変なら、まず検索とインデックスの段を疑う" });
  card(s, { x: M + 2 * (W3 + 0.3), y: by, w: W3, h: bh, title: "刻々と変わる値は検索しない", body: "在庫や口座の残高は、元のシステムにツールや API で問い合わせる" });
}

{
  const s = contentSlide("見える化は、段ごとの追跡で作る", "LLM のシステムでは、失敗がエラーとして現れない。リクエストごとに全段を1本につなぐ");
  const h = 1.6;
  [
    ["毎回同じとは限らない", "同じ入力でも、毎回同じ動きをするとは限らない"],
    ["失敗がエラーに現れない", "応答は正常に返り、答えだけが間違う"],
    ["段が多い", "検索・モデル・ツールのどこで崩れたか、答えだけでは分からない"],
  ].forEach(([t, b], i) => card(s, { x: M + i * (W3 + 0.3), y: Y0, w: W3, h, num: i + 1, title: t, body: b }));
  const ty = 3.85, th = 0.75;
  box(s, { x: M, y: ty - 0.12, w: CW, h: th + 0.24, fill: C.background1, line: C.accent1, dash: "dash", name: "Trace" });
  T(s, "1つのリクエスト", { x: M + 0.2, y: ty, w: 2.0, h: th, size: 14, bold: true, color: C.accent1, valign: "middle", name: "Trace label" });
  const ws = [2.7, 2.7, 2.7], { gap, xs } = xsOf(ws, M + 2.4, CW - 2.6);
  ["検索", "モデル", "ツール"].forEach((t, i) => {
    box(s, { x: xs[i], y: ty, w: ws[i], h: th, fill: C.background2, name: "Stage" });
    T(s, t, { x: xs[i], y: ty, w: ws[i], h: th, size: 16, bold: true, align: "center", valign: "middle", name: "Stage name" });
    if (i < 2) arrow(s, xs[i] + ws[i] + 0.05, ty + th / 2, xs[i] + ws[i] + gap - 0.05, ty + th / 2);
  });
  T(s, "残す項目の例", { x: M, y: 4.95, w: 1.6, h: 0.36, size: 14, bold: true, valign: "middle", name: "Log label" });
  const items = [["返したチャンクと出どころ", 2.85], ["`request-id`", 1.6], ["`usage` のトークン数", 2.2], ["`stop_reason`", 1.65], ["各段の所要時間", 1.75]];
  let px = M + 1.65;
  items.forEach(([t, w]) => {
    box(s, { x: px, y: 4.95, w, h: 0.36, fill: C.text2, r: 0.18, name: "Log pill" });
    T(s, t, { x: px, y: 4.95, w, h: 0.36, size: 12, bold: true, color: C.background1, codeColor: C.accent5, align: "center", valign: "middle", name: "Log pill text" });
    px += w + 0.12;
  });
  const by = 5.45, bh = 1.35;
  card(s, { x: M, y: by, w: W2, h: bh, title: "規模が大きいとプライバシーも課題", body: "会話の中身は見ずに、判断のパターンとやり取りの構造をモニタリングする", size: 13 });
  trap(s, { x: M + W2 + 0.3, y: by, w: W2, h: bh }, "レイテンシとエラー率だけのモニタリングでは、品質の崩れを見逃す");
}

// =====================================================================
// 第5章
chapter(5, "評価・テスト・最適化", "分野4 評価、テスト、最適化 ・ 配点 16% ・ 音声 31:21〜", "成功基準 ／ 評価データセットと採点 ／ A/B テスト\n問題の診断 ／ 最適化 ／ ログとモニタリング");

{
  const s = contentSlide("成功基準は、測れる形で、複数の軸に決める", "変更の良し悪しは、感想ではなく、先に決めた物差しで判断する");
  verdict(s, { x: M, y: Y0, w: W2, h: 1.1, ok: false, text: "「性能が良い」 ― 何を測るかが決まっていない", size: 15 });
  verdict(s, { x: M + W2 + 0.3, y: Y0, w: W2, h: 1.1, ok: true, text: "「感情の分類が正確」 ― 何を測るかまで決める", size: 15 });
  T(s, "軸は1つでは足りない（試験ガイドの5つ）", { x: M, y: 3.3, w: CW, h: 0.36, size: 16, bold: true, name: "Axes title" });
  const aw = (CW - 4 * 0.2) / 5;
  ["精度", "レイテンシ", "コスト", "安全性", "セキュリティ"].forEach((t, i) => {
    const x = M + i * (aw + 0.2);
    box(s, { x, y: 3.75, w: aw, h: 0.85, fill: i === 3 ? C.accent1 : C.background2, name: "Axis" });
    T(s, t, { x, y: 3.75, w: aw, h: 0.85, size: 18, bold: true, color: i === 3 ? C.background1 : C.accent1, align: "center", valign: "middle", name: "Axis name" });
  });
  const by = 4.95, bh = 1.85, lw = 6.6;
  box(s, { x: M, y: by, w: lw, h: bh, fill: C.background2, name: "Safety stat" });
  s.addText([
    { text: "0.1", options: { fontSize: 48, bold: true, color: C.accent1 } },
    { text: " %未満", options: { fontSize: 18, bold: true, color: C.accent1 } },
  ], { x: M + 0.25, y: by + 0.2, w: 2.8, h: 0.95, valign: "bottom", margin: 0, isTextBox: true, objectName: "Safety value" });
  T(s, "安全性も数字にできる", { x: M + 0.25, y: by + 1.25, w: 2.9, h: 0.4, size: 14, bold: true, name: "Safety label" });
  T(s, "例: 1万回の試行で、有害と判定された出力の割合が0.1%未満", { x: M + 3.3, y: by + 0.2, w: lw - 3.55, h: bh - 0.4, size: 14, valign: "middle", name: "Safety desc" });
  card(s, { x: M + lw + 0.3, y: by, w: CW - lw - 0.3, h: bh, title: "基準は、本番のコードを書く前に", fill: C.background1, line: C.accent6, body: "基準がないと、何をもって完成とするかを、あとから都合よく決めてしまう" });
}

{
  const s = contentSlide("評価データは本番に似せ、採点は3つを組み合わせる", "少数を手作業で採点するより、自動で採点できる問題を数多く用意する");
  const lw = 7.6, th = 1.45;
  card(s, { x: M, y: Y0, w: lw, h: th, title: "本番に似せて、難しいケースを足す", body: "実際に来る入力に、極端に長い入力や、人でも判断が割れる入力のような、まれで難しいケースを加える" });
  const rx = M + lw + 0.3, rw = W - M - rx;
  box(s, { x: rx, y: Y0, w: rw, h: th, fill: C.background2, name: "Start size" });
  s.addText([
    { text: "20〜50", options: { fontSize: 36, bold: true, color: C.accent1 } },
    { text: " 件", options: { fontSize: 16, bold: true, color: C.accent1 } },
  ], { x: rx + 0.22, y: Y0 + 0.12, w: rw - 0.44, h: 0.7, valign: "bottom", margin: 0, isTextBox: true, objectName: "Start value" });
  T(s, "実際の失敗から取れば、良い出発点", { x: rx + 0.22, y: Y0 + 0.9, w: rw - 0.44, h: 0.4, size: 14, bold: true, name: "Start label" });
  const cy = 3.65, ch = 3.15;
  [
    ["コードで採点", "速く、安く、毎回同じ結果", "表現が違うだけの正しい答えを、誤りにしがち"],
    ["モデルで採点", "柔軟で、細かな質も見られる", "結果が揺れる。明確な採点基準を与え、人の採点と突き合わせてから広げる"],
    ["人が評価", "最も質が高い", "遅く、費用がかかる"],
  ].forEach(([n, good, bad], i) => {
    const x = M + i * (W3 + 0.3);
    box(s, { x, y: cy, w: W3, h: ch, fill: C.background1, line: C.accent6, name: "Grader" });
    T(s, n, { x: x + 0.25, y: cy + 0.2, w: W3 - 0.5, h: 0.45, size: 20, bold: true, color: C.accent1, name: "Grader name" });
    T(s, "強み", { x: x + 0.25, y: cy + 0.8, w: W3 - 0.5, h: 0.3, size: 12, bold: true, color: C.accent1, name: "Good label" });
    T(s, good, { x: x + 0.25, y: cy + 1.1, w: W3 - 0.5, h: 0.62, size: 14, name: "Good text" });
    T(s, "弱み", { x: x + 0.25, y: cy + 1.78, w: W3 - 0.5, h: 0.3, size: 12, bold: true, color: C.accent2, name: "Bad label" });
    T(s, bad, { x: x + 0.25, y: cy + 2.08, w: W3 - 0.5, h: ch - 2.2, size: 14, name: "Bad text" });
  });
}

{
  const s = contentSlide("原因は変化から探し、最適化は品質のあとで", "何が変わり、何が変わっていないかを見て、その変化と因果がつながる原因を選ぶ");
  const lw = 7.1, rh = 1.48, gap = 0.2;
  [
    ["プロンプトの失敗", "指示があいまいで、形式や範囲がずれる", "プロンプトを直し、評価データセットで確かめる"],
    ["ハルシネーション", "根拠のない内容を、もっともらしく答える", "RAG で文書の更新直後なら、まず検索とインデックス。「分からない」と答えてよいと伝え、引用を示させる"],
    ["モデルの不適合", "能力が足りない。または簡単なタスクに大きすぎて、遅く高い", "同じ評価データセットで、モデルを比べる"],
  ].forEach(([n, sym, fix], i) => {
    const y = Y0 + i * (rh + gap);
    box(s, { x: M, y, w: lw, h: rh, fill: C.background2, name: "Diag row" });
    T(s, n, { x: M + 0.2, y, w: 1.95, h: rh, size: 16, bold: true, color: C.accent1, valign: "middle", name: "Diag name" });
    T(s, [sym, `→ ${fix}`], { x: M + 2.25, y: y + 0.1, w: lw - 2.45, h: rh - 0.2, size: 13, valign: "middle", after: 3, name: "Diag text" });
  });
  const rx = M + lw + 0.3, rw = W - M - rx;
  box(s, { x: rx, y: Y0, w: rw, h: 4.85, fill: C.text2, name: "Opt" });
  T(s, "最適化の順番", { x: rx + 0.25, y: Y0 + 0.18, w: rw - 0.5, h: 0.4, size: 18, bold: true, color: C.background1, name: "Opt title" });
  T(s, "① まず、よく動くプロンプトを作る", { x: rx + 0.25, y: Y0 + 0.7, w: rw - 0.5, h: 0.35, size: 14, bold: true, color: C.background1, name: "Opt step" });
  T(s, "② 速さとコストを詰める", { x: rx + 0.25, y: Y0 + 1.2, w: rw - 0.5, h: 0.35, size: 14, bold: true, color: C.background1, name: "Opt step" });
  T(s, ["同じ長い前置きはキャッシュ", "急ぎでない大量処理はバッチで半額", "出力は短く頼み、`max_tokens` で上限", "体感の速さはストリーミング", "簡単な処理は安いモデルに"], { x: rx + 0.45, y: Y0 + 1.6, w: rw - 0.7, h: 1.95, size: 13, color: C.background1, bullet: true, after: 2, name: "Opt items" });
  T(s, "③ 同じ評価データセットで確かめる", { x: rx + 0.25, y: Y0 + 3.6, w: rw - 0.5, h: 0.35, size: 14, bold: true, color: C.background1, name: "Opt step" });
  T(s, "× 必要な情報を捨てる、確かめずに最小のモデルにする", { x: rx + 0.25, y: Y0 + 4.05, w: rw - 0.5, h: 0.62, size: 13, bold: true, color: C.accent3, name: "Opt wrong" });
}

{
  const s = contentSlide("本番の結果も、先に決めた物差しで読む", "A/B テストもログも、成功基準と同じ物差しで見る。見つかった失敗は評価データセットに戻す");
  const h = 3.4;
  box(s, { x: M, y: Y0, w: W2, h, fill: C.background2, name: "AB" });
  T(s, "A/B テスト", { x: M + 0.25, y: Y0 + 0.18, w: W2 - 0.5, h: 0.42, size: 20, bold: true, color: C.accent1, name: "AB title" });
  T(s, "今の版と新しい版に利用者を振り分け、本番で比べる。十分な利用量があるときに、大きな変更を確かめる", { x: M + 0.25, y: Y0 + 0.7, w: W2 - 0.5, h: 0.9, size: 14, name: "AB desc" });
  T(s, "始める前に決める", { x: M + 0.25, y: Y0 + 1.65, w: 1.5, h: 0.34, size: 12, bold: true, color: C.accent4, valign: "middle", name: "AB pre" });
  [["仮説", 0.8], ["主に見る指標", 1.45], ["必要な件数", 1.25]].reduce((px, [t, w]) => { pill(s, t, { x: px, y: Y0 + 1.66, w, h: 0.32 }); return px + w + 0.12; }, M + 1.8);
  T(s, "言いすぎない: 少ない件数の小さな差は、たまたまかもしれない。1つの指標が良くなっても、コストや安全性が悪くなっていれば、良い変更とは言えない", { x: M + 0.25, y: Y0 + 2.15, w: W2 - 0.5, h: 1.1, size: 14, name: "AB caution" });
  const rx = M + W2 + 0.3;
  card(s, { x: rx, y: Y0, w: W2, h: 2.05, title: "ログ: リクエストごとに残す", bullet: true, body: ["モデル、入力と出力のトークン数、かかった時間、`stop_reason`", "成功基準と同じ物差しで見て、外れたら知らせが届くようにする"] });
  trap(s, { x: rx, y: Y0 + 2.2, w: W2, h: 1.2 }, "エラーにならずに返っても、`stop_reason` が `max_tokens` なら、答えは途中で切れている");
  // 回帰テストのループ
  const ly = 5.65, lh = 1.1, ws = [3.6, 3.6, 3.6], { gap, xs } = xsOf(ws);
  [["本番で見つかった失敗", ""], ["評価データセットに足す", ""], ["変更のたびに確かめる", "回帰テストが育つ"]].forEach(([t, d], i) => {
    step(s, { x: xs[i], y: ly, w: ws[i], h: lh, title: t, desc: d || undefined, hl: i === 2, titleSize: 16, descSize: 12, pad: 0.18 });
    if (i < 2) arrow(s, xs[i] + ws[i] + 0.06, ly + lh / 2, xs[i] + ws[i] + gap - 0.06, ly + lh / 2);
  });
}

// =====================================================================
// 第6章
chapter(6, "ガバナンスとリスク管理", "分野5 ガバナンス、安全性、リスク管理 ・ 配点 14% ・ 音声 38:35〜", "リスクと障害モード ／ ガードレールと fail closed\nヒューマン・イン・ザ・ループ ／ 規制へのコンプライアンス ／ 倫理的な AI");

{
  const s = contentSlide("モデルが守ると思い込まず、アプリの側で強制する", "訓練で減らせるリスクと、アプリケーションの側で強制すべきリスクを、最初に分ける");
  trap(s, { x: M, y: Y0, w: CW, h: 1.0 }, "よくある壊れ方: 与えてもいないルールを、Claude が守ると思い込む（公式の対策講座）");
  T(s, "代表的な障害モード", { x: M, y: 3.2, w: CW, h: 0.36, size: 16, bold: true, name: "Modes title" });
  const cy = 3.7, ch = 3.1;
  [
    ["ハルシネーション", "事実と違う内容を、もっともらしく生成する。「分からない」と答えてよいと伝え、文書から引用させると減るが、なくせない。重要な判断に使う情報は検証する"],
    ["プロンプトインジェクション", "利用者が直接仕掛ける場合と、Claude が読む文書やツールの結果に命令が紛れている場合がある"],
    ["過剰な権限", "注入が成功したときの被害は、渡した権限の大きさで決まる。権限を絞れば、被害も小さくなる"],
  ].forEach(([t, b], i) => card(s, { x: M + i * (W3 + 0.3), y: cy, w: W3, h: ch, num: i + 1, title: t, body: b, fill: i === 2 ? C.background1 : C.background2, line: i === 2 ? C.accent1 : undefined }));
}

{
  const s = contentSlide("ガードレールは3か所に置き、閉じた状態で失敗させる", "置き場所は、入力のスクリーニング、ツール呼び出しの認可、出力のスクリーニング");
  const r1 = Y0 + 0.1, bh = 0.95;
  const ws = [1.5, 2.6, 1.6, 2.6, 1.5], { gap, xs } = xsOf(ws);
  const guard = [false, true, false, true, false];
  ["入力", "① 入力のスクリーニング", "Claude", "② ツール呼び出しの認可", "ツール"].forEach((t, i) => {
    box(s, { x: xs[i], y: r1, w: ws[i], h: bh, fill: guard[i] ? C.accent1 : C.background2, name: guard[i] ? "Guard" : "Node" });
    T(s, t, { x: xs[i] + 0.1, y: r1, w: ws[i] - 0.2, h: bh, size: 15, bold: true, color: guard[i] ? C.background1 : C.text1, align: "center", valign: "middle", name: "Node text" });
    if (i < 4) arrow(s, xs[i] + ws[i] + 0.05, r1 + bh / 2, xs[i] + ws[i] + gap - 0.05, r1 + bh / 2);
  });
  const r2 = r1 + bh + 0.45, cx = xs[2] + ws[2] / 2;
  arrow(s, cx, r1 + bh + 0.05, cx, r2 + bh / 2, { head: false });
  arrow(s, cx, r2 + bh / 2, xs[3] - 0.05, r2 + bh / 2);
  box(s, { x: xs[3], y: r2, w: ws[3], h: bh, fill: C.accent1, name: "Guard" });
  T(s, "③ 出力のスクリーニング", { x: xs[3] + 0.1, y: r2, w: ws[3] - 0.2, h: bh, size: 15, bold: true, color: C.background1, align: "center", valign: "middle", name: "Node text" });
  arrow(s, xs[3] + ws[3] + 0.05, r2 + bh / 2, xs[4] - 0.05, r2 + bh / 2);
  box(s, { x: xs[4], y: r2, w: ws[4], h: bh, fill: C.background2, name: "Node" });
  T(s, "出力", { x: xs[4], y: r2, w: ws[4], h: bh, size: 15, bold: true, align: "center", valign: "middle", name: "Node text" });
  T(s, "Haiku のような軽いモデルで、入力やツールの結果を先に検査する方法もある（公式ドキュメント）", { x: M, y: r2 + 0.1, w: xs[2] - M - 0.3, h: bh - 0.2, size: 12, color: C.accent4, valign: "middle", name: "Screen note" });
  const cy = 4.6, ch = 2.2;
  card(s, { x: M, y: cy, w: W2, h: ch, title: "決定的なチェックと、モデルのチェック", bullet: true, body: ["決定的: 許可リストや権限の判定のように、コードで書いた規則。毎回同じ結果", "規則で決まるものは決定的に、文脈の判断が要るものはモデルで"] });
  card(s, { x: M + W2 + 0.3, y: cy, w: W2, h: ch, title: "fail closed（閉じた状態で失敗）", titleColor: C.accent2, fill: C.background1, line: C.accent2, bullet: true, body: ["検査が失敗したり、判定が出なかったりしたら、通さない側に倒す", "公式の例: 検査役のモデルが検査を拒否したら、有害と判定されたものとして扱う"] });
}

{
  const s = contentSlide("人の確認は、3つの軸で振り分ける", "すべてを人が見ると、確認が形だけになり、自動化の価値も消える");
  const aw = 2.6, ag = 0.2, ah = 1.9;
  [["確信度", "低いもの"], ["取り消せるか", "取り消せない操作"], ["誤ったときのコスト", "被害が大きいもの"]].forEach(([t, d], i) => {
    const x = M + i * (aw + ag);
    box(s, { x, y: Y0, w: aw, h: ah, fill: C.background2, name: "Axis" });
    T(s, t, { x: x + 0.2, y: Y0 + 0.25, w: aw - 0.4, h: 0.45, size: 16, bold: true, color: C.accent1, name: "Axis name" });
    T(s, d, { x: x + 0.2, y: Y0 + 0.85, w: aw - 0.4, h: 0.8, size: 16, bold: true, name: "Axis route" });
  });
  const ex = M + 3 * aw + 2 * ag, dx = ex + 0.7, dw = W - M - dx;
  arrow(s, ex + 0.08, Y0 + ah / 2, dx - 0.08, Y0 + ah / 2, { color: C.accent1, width: 2.5 });
  box(s, { x: dx, y: Y0, w: dw, h: ah, fill: C.accent1, name: "Reviewer" });
  T(s, ["人に回す", "適切な担当者や決裁者へ"], { x: dx + 0.2, y: Y0 + 0.2, w: dw - 0.4, h: ah - 0.4, size: 16, bold: true, color: C.background1, valign: "middle", after: 4, name: "Reviewer text" });
  card(s, { x: M, y: 4.15, w: CW, h: 1.55, title: "高リスクの用途（医療、金融、雇用など） ― Anthropic の利用ポリシー", fill: C.background1, line: C.accent6, body: "資格のある人が、本人に届く前に AI の提案を実質的に確認する。その人は、提案を変える権限を持つ。法律が認める範囲なら、本人に完全に有利な結果には、この確認はいらない" });
  trap(s, { x: M, y: 5.9, w: CW, h: 0.9 }, "「慎重に判断して」とプロンプトに書き、ログを残すだけでは、誤りは防げない");
}

{
  const s = contentSlide("規制の義務は、管理策・責任者・証跡に対応づける", "方針を書いた文書だけでは満たせない。問われるのは、条文の細部より、この対応づけ");
  const lw = 7.75;
  // 対応づけの鎖
  const cw = [1.3, 2.0, 1.5, 2.25], { gap, xs } = xsOf(cw, M, lw);
  ["義務", "名前の付いた管理策", "責任者", "監査で示せる証跡"].forEach((t, i) => {
    box(s, { x: xs[i], y: Y0, w: cw[i], h: 0.5, fill: i === 0 ? C.text2 : C.accent1, name: "Chain" });
    T(s, t, { x: xs[i], y: Y0, w: cw[i], h: 0.5, size: 14, bold: true, color: C.background1, align: "center", valign: "middle", name: "Chain text" });
    if (i === 0) arrow(s, xs[0] + cw[0] + 0.04, Y0 + 0.25, xs[1] - 0.04, Y0 + 0.25, { color: C.accent1 });
  });
  const rows = [
    ["GDPR", "顧客企業がデータの管理者、Anthropic は指示に従って処理する処理者。義務の責任者は顧客の側に残る", 0.8],
    ["HIPAA", "BAA を結び、組織の設定を HIPAA に対応させ、対象の機能だけを使う。ベータの機能は原則として対象外", 0.8],
    ["FedRAMP", "認可されたルートを選ぶ。直接の API は未認可（2026年11月時点）。Claude for Government や政府向けクラウドの Amazon Bedrock", 1.05],
    ["ZDR", "Zero Data Retention（データを保存しない取り決め）にも、対象外の機能がある", 0.7],
  ];
  let y = Y0 + 0.65;
  rows.forEach(([k, v, h]) => {
    box(s, { x: M, y, w: lw, h, fill: C.background2, r: 0.08, name: "Reg row" });
    T(s, k, { x: M + 0.2, y, w: 1.3, h, size: 16, bold: true, color: C.accent1, valign: "middle", name: "Reg name" });
    T(s, v, { x: M + 1.55, y: y + 0.06, w: lw - 1.75, h: h - 0.12, size: 13, valign: "middle", name: "Reg desc" });
    y += h + 0.08;
  });
  T(s, "どの取り決めも、使う機能ごとに対象かを確かめる。認証の報告書は Trust Center で請求できる", { x: M, y: y + 0.02, w: lw, h: 0.55, size: 12, color: C.accent4, name: "Reg note" });
  const rx = M + lw + 0.3, rw = W - M - rx;
  card(s, { x: rx, y: Y0, w: rw, h: 4.85, title: "倫理: 公平性と透明性", fill: C.background1, line: C.accent6, bullet: true, after: 6, body: [
    "不公平な結果が生じうる場所を、先に特定する",
    "判断を求めるプロンプトの、人の属性の情報だけを入れ替えて、結果が変わるかを測る（Anthropic の研究）",
    "利用者には、AI が関わっていることを伝える",
    "規制当局には、判断の根拠と管理策を示す記録を残す",
    "開発チームには、エージェントの計画や手順が見えるようにする",
  ] });
}

// =====================================================================
// 第7章
chapter(7, "ステークホルダーと合意形成", "分野6 ステークホルダーとライフサイクル ・ 配点 14% ・ 音声 45:36〜", "ディスカバリーと要件 ／ トレードオフの伝え方 ／ 期待値と SLA\n文書化と実装のガイダンス ／ ライフサイクル");

{
  const s = contentSlide("聞いたことを、要件と文書にした前提に変える", "設計を、自分の技術の好みではなく、ビジネスケースにさかのぼって説明できるようにする");
  const bw = 3.6, { gap, xs } = xsOf([bw, bw, bw]), y = Y0, h = 3.3;
  const cols = [
    ["業務の言葉で、観点を決めて聞く", ["いまの業務はどう流れているか", "誤った答えが出たら、何が起きるか", "データや規制には、どんな制約があるか"], true],
    ["要件と、文書にした前提", ["前提とは、確かめきれていないが、設計の土台にしたこと", "例: 「在庫の情報は1日1回の更新で足りる」"], false],
    ["成功基準を、測れる形で", ["具体的", "測れる", "達成できる", "目的に合っている"], false],
  ];
  cols.forEach(([t, b, bullet], i) => {
    card(s, { x: xs[i], y, w: bw, h, num: i + 1, title: t, body: b, bullet: i !== 1, after: 6, fill: i === 2 ? C.background1 : C.background2, line: i === 2 ? C.accent1 : undefined });
    if (i < 2) arrow(s, xs[i] + bw + 0.06, y + h / 2, xs[i] + bw + gap - 0.06, y + h / 2);
  });
  trap(s, { x: M, y: 5.5, w: CW, h: 1.3 }, "要件を固める前に、デモやモデルの比較に飛びつく選択肢は劣る。「性能が良いこと」は成功基準にならない");
}

{
  const s = contentSlide("トレードオフは、決める人が動ける形で示す", "経営層や調達の担当者は、仕組みの細部では判断しない。選択肢ごとに3つを添える");
  [["コスト", ""], ["リスク", ""], ["元に戻すのに何が要るか", "戻しにくい決定ほど、早めに合意を取る"]].forEach(([t, d], i) => {
    const x = M + i * (W3 + 0.3);
    box(s, { x, y: Y0, w: W3, h: 1.35, fill: C.text2, name: "Attr" });
    bubble(s, x + 0.25, Y0 + 0.4, i + 1, { dark: true, size: 14 });
    T(s, d ? [t] : t, { x: x + 0.85, y: Y0 + (d ? 0.16 : 0), w: W3 - 1.05, h: d ? 0.42 : 1.35, size: 17, bold: true, color: C.background1, valign: d ? "top" : "middle", name: "Attr name" });
    if (d) T(s, d, { x: x + 0.85, y: Y0 + 0.62, w: W3 - 1.05, h: 0.55, size: 12, color: C.accent5, name: "Attr note" });
  });
  const ty = 3.55, th = 1.45, tw = 5.4;
  box(s, { x: M, y: ty, w: tw, h: th, fill: C.background1, line: C.accent6, name: "Tech words" });
  T(s, "技術の言葉", { x: M + 0.25, y: ty + 0.15, w: tw - 0.5, h: 0.3, size: 12, bold: true, color: C.accent4, name: "Tech label" });
  T(s, "エージェント型は、レイテンシとコストを払って、タスクの成果を高めることが多い", { x: M + 0.25, y: ty + 0.5, w: tw - 0.5, h: th - 0.65, size: 14, name: "Tech text" });
  const bx = W - M - tw;
  arrow(s, M + tw + 0.1, ty + th / 2, bx - 0.1, ty + th / 2, { color: C.accent1, width: 2.5 });
  box(s, { x: bx, y: ty, w: tw, h: th, fill: C.background2, name: "Biz words" });
  T(s, "業務の言葉に直す", { x: bx + 0.25, y: ty + 0.15, w: tw - 0.5, h: 0.3, size: 12, bold: true, color: C.accent1, name: "Biz label" });
  T(s, "応答は遅く、費用も高くなるが、手順にない案件まで処理できる", { x: bx + 0.25, y: ty + 0.5, w: tw - 0.5, h: th - 0.65, size: 16, bold: true, name: "Biz text" });
  const by = 5.25, bh = 1.55, b3 = W3;
  verdict(s, { x: M, y: by, w: b3, h: bh, ok: false, text: "推す案だけを、技術の詳細とともに示す" });
  verdict(s, { x: M + b3 + 0.3, y: by, w: b3, h: bh, ok: false, text: "ベンチマークの数字を並べて、判断を丸投げする" });
  verdict(s, { x: M + 2 * (b3 + 0.3), y: by, w: b3, h: bh, ok: true, text: "選択肢と、その意味と、推奨とその理由をそろえて示す" });
}

{
  const s = contentSlide("期待値は、測れる水準と SLA で合わせ続ける", "最も高度な言語モデルでも、事実と違う答えを返すことがある。減らせても、なくしきれない");
  const lw = 5.6;
  verdict(s, { x: M, y: Y0, w: lw, h: 1.05, ok: false, text: "「必ず正しく答える」という期待を受ける", size: 15 });
  box(s, { x: M, y: Y0 + 1.25, w: lw, h: 2.05, fill: C.background2, name: "Good" });
  bubble(s, M + 0.25, Y0 + 1.45, "○", { size: 16 });
  T(s, "どの指標で、どの水準を目指すかを合意する", { x: M + 0.85, y: Y0 + 1.42, w: lw - 1.1, h: 0.6, size: 15, valign: "middle", name: "Good text" });
  T(s, "正確さだけでなく、並べて決める", { x: M + 0.85, y: Y0 + 2.2, w: lw - 1.1, h: 0.3, size: 12, bold: true, color: C.accent4, name: "Good sub" });
  [["正確さ", 1.1], ["レイテンシ", 1.4], ["安全性", 1.1]].reduce((px, [t, w]) => { pill(s, t, { x: px, y: Y0 + 2.6, w, h: 0.38, size: 13 }); return px + w + 0.15; }, M + 0.85);
  card(s, { x: M, y: Y0 + 3.5, w: lw, h: 1.35, title: "フィードバックループ", body: "使う人や決める人の声を集め、改善に戻す。ガバナンスの確認も同じループに", size: 13 });
  const rx = M + lw + 0.35, rw = W - M - rx;
  T(s, "前もって決めておく3つ", { x: rx, y: Y0, w: rw, h: 0.4, size: 18, bold: true, color: C.accent1, name: "Pre title" });
  const rows = [
    ["何がレビューのきっかけになるか", ""],
    ["SLA を守れなかったとき、何をするか", ""],
    ["反復で直すか、作り直すかの見分け方", "プロンプトや検索の調整で水準に戻せるなら反復。設計の前提そのものが崩れていれば、設計に戻る"],
  ];
  let y = Y0 + 0.55;
  rows.forEach(([t, d], i) => {
    const h = d ? 1.95 : 1.0;
    box(s, { x: rx + 0.6, y, w: rw - 0.6, h, fill: i === 2 ? C.background1 : C.background2, line: i === 2 ? C.accent1 : undefined, name: "Pre row" });
    bubble(s, rx, y + (d ? 0.2 : (h - 0.54) / 2), i + 1);
    T(s, t, { x: rx + 0.85, y: y + (d ? 0.18 : 0), w: rw - 1.05, h: d ? 0.4 : h, size: 16, bold: true, valign: d ? "top" : "middle", name: "Pre text" });
    if (d) T(s, d, { x: rx + 0.85, y: y + 0.7, w: rw - 1.05, h: h - 0.85, size: 14, name: "Pre desc" });
    y += h + 0.2;
  });
}

{
  const s = contentSlide("ライフサイクルは、引き継いだあとも続く", "引き継ぎは、自分がいなくても回るように設計する");
  const pw = 2.15, { gap, xs } = xsOf([pw, pw, pw, pw, pw]), y = Y0, h = 1.85;
  [
    ["ディスカバリー", "課題と制約を聞き、要件と前提にする"],
    ["設計", "決定と理由、捨てた案、前提を文書に"],
    ["引き継ぎ", "成功基準、評価のやり方、連絡の手順を渡す"],
    ["モニタリング", "合意した水準を、本番で見続ける"],
    ["反復", "見つかったずれを、次の反復に回す"],
  ].forEach(([t, d], i) => {
    step(s, { x: xs[i], y, w: pw, h, title: t, desc: d, hl: i === 2, titleSize: 16, descSize: 13, pad: 0.16 });
    if (i < 4) arrow(s, xs[i] + pw + 0.04, y + h / 2, xs[i] + pw + gap - 0.04, y + h / 2);
  });
  const ly = y + h + 0.3, x5 = xs[4] + pw / 2, x2 = xs[1] + pw / 2, x1 = xs[0] + pw / 2;
  arrow(s, x5, y + h + 0.04, x5, ly, { head: false, color: C.accent2, width: 2 });
  arrow(s, x5, ly, x1, ly, { head: false, color: C.accent2, width: 2 });
  arrow(s, x1, ly, x1, y + h + 0.06, { color: C.accent2, width: 2 });
  arrow(s, x2, ly, x2, y + h + 0.06, { color: C.accent2, width: 2 });
  T(s, "前提が崩れたと分かれば、設計やディスカバリーに戻る", { x: x2 + 0.3, y: ly + 0.06, w: 6.5, h: 0.35, size: 13, bold: true, color: C.accent2, name: "Loop label" });
  const by = 4.85, bh = 1.95;
  box(s, { x: M, y: by, w: W2, h: bh, fill: C.text2, name: "Quote" });
  T(s, "公式の対策講座の注意", { x: M + 0.25, y: by + 0.2, w: W2 - 0.5, h: 0.32, size: 12, bold: true, color: C.accent5, name: "Quote label" });
  T(s, "アーキテクトにしか分からない設計は、その人が部屋を出た途端に崩れる", { x: M + 0.25, y: by + 0.6, w: W2 - 0.5, h: 1.15, size: 18, bold: true, color: C.background1, name: "Quote text" });
  card(s, { x: M + W2 + 0.3, y: by, w: W2, h: bh, title: "文書は読む人で書き分ける", bullet: true, body: ["開発チーム: 構成と手順。成功基準と評価のやり方、Claude・既存システム・人の役割分担", "出資する経営層: どんな価値が、いつ出るか"] });
}

// =====================================================================
// 第8章
chapter(8, "開発チームの生産性と運用", "分野7 開発者の生産性と運用支援 ・ 配点 7% ・ 音声 52:40〜", "チームの設定と管理設定 ／ スキルとプラグインの配布 ／ 支出の管理\nレビューの規律 ／ 症状と原因の層");

{
  const s = contentSlide("守らせたい方針は、管理設定で配る", "管理設定は最優先で、開発者は上書きできない。許可と拒否の一覧は、すべての置き場所の分が合わさる");
  const lw = 6.2;
  T(s, "Claude Code の設定の置き場所（上ほど強い）", { x: M, y: Y0, w: lw, h: 0.4, size: 16, bold: true, name: "Tier title" });
  const tiers = [
    ["管理設定（managed settings）", "組織が配る。最優先", C.text2, C.background1, C.accent5],
    ["`.claude/settings.json`", "リポジトリにコミット。チーム全員に効く", C.accent1, C.background1, C.accent5],
    ["ユーザー設定", "ホームディレクトリ。自分だけに効く", C.background2, C.text1, C.accent4],
  ];
  tiers.forEach(([t, d, fill, fg, sub], i) => {
    const inset = i * 0.25, y = Y0 + 0.55 + i * 0.95;
    box(s, { x: M + inset, y, w: lw - 2 * inset, h: 0.82, fill, r: 0.08, name: "Tier" });
    T(s, t, { x: M + inset + 0.2, y: y + 0.08, w: lw - 2 * inset - 0.4, h: 0.36, size: 15, bold: true, color: fg, codeColor: fg, name: "Tier name" });
    T(s, d, { x: M + inset + 0.2, y: y + 0.45, w: lw - 2 * inset - 0.4, h: 0.3, size: 12, color: sub, name: "Tier desc" });
  });
  T(s, "開発者はルールを足せても、組織のルールは外せない", { x: M, y: Y0 + 3.45, w: lw, h: 0.36, size: 14, bold: true, color: C.accent1, name: "Merge note" });
  const rx = M + lw + 0.3, rw = W - M - rx;
  T(s, "配り方は2つ", { x: rx, y: Y0, w: rw, h: 0.4, size: 16, bold: true, name: "Dist title" });
  card(s, { x: rx, y: Y0 + 0.55, w: rw, h: 1.25, title: "サーバー管理の設定", body: "claude.ai の管理コンソールから配る", size: 14 });
  card(s, { x: rx, y: Y0 + 1.95, w: rw, h: 1.25, title: "MDM ・ 決まった場所のファイル", body: "端末を一括で管理する仕組みなどで配る", size: 14 });
  T(s, "配ったら `/status` で、組織の設定が効いているかを確かめる", { x: rx, y: Y0 + 3.3, w: rw, h: 0.62, size: 14, bold: true, color: C.accent1, name: "Status note" });
  trap(s, { x: M, y: 5.75, w: CW, h: 1.05 }, "サーバー管理の設定は端末の側で効く仕組みで、セキュリティの境界ではない。強く守らせたいなら、MDM で管理する端末に配る");
}

{
  const s = contentSlide("手順はスキルで配り、支出には上限を決める", "スキルはふだん名前と説明だけ。CLAUDE.md に長く書くより、ほかの作業の邪魔をしない");
  const lw = 7.3, rh = 1.0, gap = 0.15;
  T(s, "届けたい範囲で、配り方を選ぶ", { x: M, y: Y0, w: lw, h: 0.4, size: 16, bold: true, name: "Range title" });
  const rows = [
    ["1つのリポジトリ", "`.claude/skills` にコミットする", true],
    ["広く配る", "プラグインにまとめ、マーケットプレイス（プラグインの目録）から配る", true],
    ["組織全体", "管理設定で、指定したプラグインを全員の端末で有効に。追加できるマーケットプレイスも制限できる", true],
    ["ホームだけ", "担当者のホームディレクトリに置くだけでは、チームに届かない", false],
  ];
  rows.forEach(([k, v, ok], i) => {
    const y = Y0 + 0.5 + i * (rh + gap);
    box(s, { x: M, y, w: lw, h: rh, fill: ok ? C.background2 : C.background1, line: ok ? undefined : C.accent2, name: "Range row" });
    if (!ok) bubble(s, M + 0.2, y + (rh - 0.54) / 2, "×", { red: true, size: 16 });
    T(s, k, { x: M + (ok ? 0.25 : 0.8), y, w: ok ? 2.0 : 1.55, h: rh, size: 15, bold: true, color: ok ? C.accent1 : C.accent2, valign: "middle", name: "Range key" });
    T(s, v, { x: M + 2.4, y: y + 0.06, w: lw - 2.6, h: rh - 0.12, size: 14, valign: "middle", name: "Range val" });
  });
  const rx = M + lw + 0.3, rw = W - M - rx;
  card(s, { x: rx, y: Y0, w: rw, h: 4.85, title: "支出の管理: 見える化と上限", fill: C.background1, line: C.accent6, bullet: true, after: 8, body: [
    "Team と Enterprise のプランでは、席ごとの利用枠を超えた分に、組織・グループ・メンバーの単位で上限を決められる",
    "定着の度合い（利用者の数など）はダッシュボード、メンバーごとの支出はレポートで見る",
    "どの提供ルートでも、OpenTelemetry で利用のデータを自社のモニタリングの仕組みへ送れる",
  ] });
}

{
  const s = contentSlide("AI が書いた成果物は、書き手と別の検証を通す", "Claude は、作業が終わったように見えたところで止まる。レビューの規律が要になる");
  const h = 2.35;
  [
    ["合否を返す確かめ方を渡す", "テストやビルドのように、合格か不合格かを返すもの"],
    ["完了の報告には証拠を求める", "実行したコマンドと出力。「テストは通りました」の要約だけを信じない"],
    ["書いた本人ではない目で見る", "`/code-review` は、会話を見ていない新しいサブエージェントで差分を確かめる"],
  ].forEach(([t, b], i) => card(s, { x: M + i * (W3 + 0.3), y: Y0, w: W3, h, num: i + 1, title: t, body: b }));
  const y = 4.6, bh = 2.2;
  const ws = [3.55, 4.45, 3.33], { gap, xs } = xsOf(ws);
  const cols = [
    ["モデルが読んで判断する", "CLAUDE.md、スキル", "守られないことがある", C.background1, C.accent6],
    ["Claude Code が強制する", "フック、拒否のルール、管理設定", "毎回必ず守らせたいことは、ここに置く", C.background2, C.accent1],
    ["最後の決定", "ブランチの保護と、マージを承認する人", "", C.text2, null],
  ];
  cols.forEach(([t, what, note, fill, line], i) => {
    const dark = fill === C.text2;
    box(s, { x: xs[i], y, w: ws[i], h: bh, fill, line: line || undefined, lineW: 1.75, name: "Layer" });
    T(s, t, { x: xs[i] + 0.25, y: y + 0.18, w: ws[i] - 0.5, h: 0.32, size: 12, bold: true, color: dark ? C.accent5 : C.accent4, name: "Layer label" });
    T(s, what, { x: xs[i] + 0.25, y: y + 0.55, w: ws[i] - 0.5, h: 0.8, size: dark ? 16 : 18, bold: true, color: dark ? C.background1 : C.accent1, name: "Layer what" });
    if (note) T(s, note, { x: xs[i] + 0.25, y: y + 1.4, w: ws[i] - 0.5, h: bh - 1.55, size: 14, color: i === 0 ? C.accent2 : C.text1, bold: i === 0, name: "Layer note" });
    if (i === 0) arrow(s, xs[0] + ws[0] + 0.06, y + bh / 2, xs[1] - 0.06, y + bh / 2, { color: C.accent1, width: 2.5 });
  });
}

{
  const s = contentSlide("症状を、原因のある層に結びつける", "言葉を強める前に、どの層で起きているかを切り分ける");
  const kw = 4.1, rh = 0.9, gap = 0.12;
  [
    ["リポジトリの設定が、ある開発者にだけ効かない", "`/status` で読み込まれた設定を見る。上の層が同じ項目を決めていないか。許可のルールは、フォルダーを信頼するまで効かない"],
    ["CLAUDE.md のルールが、ときどき破られる", "モデルが判断する層に置いたことが原因。言葉を強めても直らない。強制する仕組みへ移す"],
    ["コードの不具合を調べる", "再現の手順とエラーの全文を渡し、毎回起きるのか、ときどきなのかも伝える"],
    ["よく起きる問題", "切り分け方をスキルにまとめ、チームが自分たちで解決できるようにする"],
  ].forEach(([k, v], i) => {
    const y = Y0 + i * (rh + gap);
    box(s, { x: M, y, w: kw, h: rh, fill: C.background2, name: "Symptom" });
    T(s, k, { x: M + 0.2, y: y + 0.06, w: kw - 0.4, h: rh - 0.12, size: 15, bold: true, valign: "middle", name: "Symptom text" });
    arrow(s, M + kw + 0.06, y + rh / 2, M + kw + 0.5, y + rh / 2, { color: C.accent1 });
    box(s, { x: M + kw + 0.56, y, w: CW - kw - 0.56, h: rh, fill: C.background1, line: C.accent6, name: "Cause" });
    T(s, v, { x: M + kw + 0.76, y: y + 0.06, w: CW - kw - 0.96, h: rh - 0.12, size: 14, valign: "middle", name: "Cause text" });
  });
  const by = 6.15, bh = 0.65;
  box(s, { x: M, y: by, w: CW, h: bh, fill: C.text2, name: "Axis band" });
  T(s, "どの章でも軸は同じ: 原因を取り除く対応を選び、必要なものは捨てず、必ず守らせたいことは仕組みで強制する", { x: M + 0.25, y: by, w: CW - 0.5, h: bh, size: 15, bold: true, color: C.background1, valign: "middle", name: "Axis text" });
}

// =====================================================================
// まとめ
section("まとめ");
{
  const s = slide("CLOSING");
  s.addText("試験直前チェック10", { placeholder: "title" });
  const items = [
    "役割は Claude、既存システム、人に分ける",
    "変わり続ける値は、元のシステムに問い合わせる",
    "単純な構成から。手順が決まればワークフロー",
    "モデルを替える前に、評価を関門にする",
    "要らないツールは外す。トークンは先へ渡さない",
    "RAG の誤答は、まず検索とインデックスを疑う",
    "成功基準は本番のコードより先に、測れる形で",
    "何が変わったかから診断し、同じ評価で確かめる",
    "入口、出口、ツールに置き、判定不能なら通さない",
    "必ず守らせたいことは、仕組みで強制する",
  ];
  const colW = (CW - 0.5) / 2, rh = 1.0;
  items.forEach((t, i) => {
    const x = M + Math.floor(i / 5) * (colW + 0.5), y = 1.45 + (i % 5) * (rh + 0.06);
    bubble(s, x, y + 0.23, i + 1, { dark: true, size: 13 });
    T(s, t, { x: x + 0.6, y, w: colW - 0.6, h: rh, size: 16, color: C.background1, valign: "middle", name: "Check item" });
  });
}
{
  const s = slide("CLOSING");
  s.addText("次のステップ", { placeholder: "title" });
  const steps = [["音声で全体像をつかむ", "約62分。章ごとのミニクイズ付き"], ["問題集アプリで解く", ["100問", "模擬試験は本番と同じ63問・120分"]], ["間違えた分野を復習する", "このスライドと解説で弱点を埋める"]];
  const bw = 3.8, gap = (CW - 3 * bw) / 2;
  steps.forEach(([t, d], i) => {
    const x = M + i * (bw + gap), y = 2.1;
    bubble(s, x + bw / 2 - 0.55, y, i + 1, { dark: true, filled: i === 1, w: 1.1, h: 1.5, size: 40, lineW: 2.5 });
    T(s, t, { x, y: y + 1.8, w: bw, h: 0.45, size: 20, bold: true, color: C.background1, align: "center", name: "Next title" });
    T(s, d, { x, y: y + 2.35, w: bw, h: 0.8, size: 14, color: C.accent5, align: "center", name: "Next desc" });
    if (i < 2) arrow(s, x + bw / 2 + 0.75, y + 0.75, x + bw + gap + bw / 2 - 0.75, y + 0.75, { color: C.accent5, width: 2 });
  });
  T(s, "非公式の学習用教材です。公式の試験ガイド バージョン1.0（2026年7月発効）と、2026年11月時点の公式ドキュメントに基づきます。2026年12月7日に試験内容の更新が予定されています。受験前に公式の試験ガイドで最新の内容を確認してください。", { x: M, y: 5.95, w: CW, h: 0.7, size: 12, color: C.accent5, name: "Disclaimer" });
}
deck.save(OUT).catch((e) => { console.error(e); process.exit(1); });

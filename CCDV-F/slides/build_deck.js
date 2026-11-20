// CCDV-F キャッチアップ講座のスライド（pptx）を生成する。
// 使い方: node slides/build_deck.js [出力.pptx]   （省略時は ../CCDV-F_キャッチアップ講座.pptx）
// 共通部品は ../../shared/slides/deck_lib.js。確認用の画像は shared/slides/render.py で作る。
const path = require("path");
const { createDeck } = require("../../shared/slides/deck_lib.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "CCDV-F_キャッチアップ講座.pptx");
const deck = createDeck({
  code: "CCDV-F",
  title: "CCDV-F キャッチアップ講座",
  subject: "Claude Certified Developer – Foundations 学習用（非公式）",
});
const { pres, C, SH, HEX, W, M, CW, Y0, YB, T, runs, box, bubble, arrow, pill, card, trap, stat, section, slide, contentSlide, divider, check, estHeight } = deck;

// =====================================================================
// 1. 表紙
section("はじめに");
{
  const s = slide("TITLE");
  s.addText("CCDV-F\nキャッチアップ講座", { placeholder: "title" });
  s.addText("Claude Certified Developer – Foundations の出題範囲を、8つのドメインで復習する", { placeholder: "subtitle" });
  T(s, "非公式の学習用教材 ・ 音声講座（約66分）と同じ章立て", { x: 0.8, y: 5.75, w: 8, h: 0.4, size: 14, color: C.accent5, name: "Title note" });
  // 解答用紙のモチーフ
  const marks = [2, 0, 3, 1, 2];
  marks.forEach((m, r) => {
    const yy = 1.45 + r * 0.9;
    T(s, String(r + 1), { x: 9.2, y: yy, w: 0.4, h: 0.54, size: 14, color: C.accent5, bold: true, align: "right", valign: "middle", name: "Sheet row" });
    ["A", "B", "C", "D"].forEach((l, k) => bubble(s, 9.85 + k * 0.72, yy, k === m ? "" : l, { dark: true, filled: k === m, size: 12 }));
  });
  // 赤ペンの丸
  s.addShape(SH.OVAL, { x: 9.85 + 2 * 0.72 - 0.16, y: 1.45 - 0.14, w: 0.72, h: 0.82, fill: { type: "none" }, line: { color: C.accent2, width: 2.5 }, objectName: "Red pen mark" });
}

// 2. 試験の形式
{
  const s = contentSlide("試験の形式", "53問を120分で解き、100〜1000のスケールスコアで720以上が合格");
  const w = (CW - 3 * 0.3) / 4;
  [
    { value: "53", unit: "問", label: "問題数", sub: "択一と複数選択（選ぶ数は問題に書いてある）" },
    { value: "120", unit: "分", label: "試験時間", sub: "1問あたり2分強" },
    { value: "720", unit: "点", label: "合格ライン", sub: "スケールは100〜1000" },
    { value: "8", unit: "ドメイン", label: "出題範囲", sub: "最大は D2 の約33%" },
  ].forEach((d, i) => stat(s, { x: M + i * (w + 0.3), y: Y0 + 0.1, w, h: 3.0, ...d }));
  T(s, "形式と配点は、公式の試験ガイド v1.0（2026年7月発効）で確認済み。2026年12月7日に試験内容の更新が予定されている（更新版のガイドは11月17日に公開予定）。12月7日より後に受ける人は、新しいガイドを確かめること。", { x: M, y: 5.35, w: CW, h: 0.8, size: 12, color: C.accent4, name: "Caveat" });
}

// 3. 配点
{
  const s = contentSlide("8ドメインの配点", "API の実務（D2）とモデル選択（D5）だけで、全体のほぼ半分を占める");
  const labels = ["D2 アプリケーションと統合", "D5 モデル選択と最適化", "D1 エージェントとワークフロー", "D6 プロンプトとコンテキスト", "D8 ツールと MCP", "D7 セキュリティと安全性", "D3 Claude Code", "D4 評価・テスト・デバッグ"];
  const values = [33.1, 16.8, 14.7, 11.0, 10.6, 8.1, 3.1, 2.6];
  s.addChart(pres.charts.BAR, [{ name: "配点（%）", labels, values }], {
    x: M, y: Y0, w: 7.6, h: 4.8, barDir: "bar", catAxisOrientation: "maxMin",
    chartColors: [HEX.accent1, HEX.accent1, "7FB2AD", "7FB2AD", "7FB2AD", "7FB2AD", "7FB2AD", "7FB2AD"],
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0.0"%"', dataLabelFontSize: 12, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
    catAxisLabelFontSize: 12, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", catAxisLineShow: false,
    valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 40, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    showLegend: false, barGapWidthPct: 45,
    showTitle: true, title: "ドメイン別の配点（%）", titleFontSize: 14, titleColor: HEX.accent4, titleFontFace: "+mn-lt",
  });
  const x = 8.55, w = W - M - x;
  card(s, { x, y: Y0, w, h: 1.5, pad: 0.2, num: 1, title: "D2 だけで約3分の1", body: "API の仕組み、エラー処理、キャッシュ、バッチ、運用。最優先で固める" });
  card(s, { x, y: Y0 + 1.65, w, h: 1.5, pad: 0.2, num: 2, title: "D5・D1・D6・D8 で約半分", body: "モデルとコスト、エージェント、プロンプト、ツールと MCP" });
  card(s, { x, y: Y0 + 3.3, w, h: 1.5, pad: 0.2, num: 3, title: "ドメインの下に25のスキル", body: "D2 ではアプリ設計 8.6%、ソフトウェア工学 7.4%、API の仕組み 6.8%" });
}

// =====================================================================
// 第1章
divider(1, "Messages API の基本", "D2 アプリケーションと統合（前半） ・ 配点 33.1% ・ 音声 4:37〜", "リクエストとレスポンス ／ `stop_reason` ／ ストリーミング");

{
  const s = contentSlide("必須パラメータは3つ", "API はステートレス。モデルが見るのは、そのリクエストの `system` と `messages` だけ");
  const w = (CW - 2 * 0.3) / 3;
  [
    ["`model`", "使うモデルの ID。本番では設定ファイルで固定する"],
    ["`max_tokens`", "1回の応答で生成する出力の上限。超えると打ち切られる"],
    ["`messages`", "user と assistant のやり取り。履歴も毎回ここに入れる"],
  ].forEach(([t, b], i) => card(s, { x: M + i * (w + 0.3), y: Y0, w, h: 1.75, title: t, titleSize: 20, titleColor: C.accent1, body: b }));
  const w2 = (CW - 0.3) / 2;
  card(s, { x: M, y: Y0 + 2.0, w: w2, h: 2.85, title: "`system` はトップレベルで渡す", fill: C.background1, line: C.accent6, bullet: true, body: [
    "システムプロンプトは `messages` の外にある `system` パラメータで渡す",
    "`messages` の先頭に `role: \"system\"` を入れるのは、他社 API から移植するときの典型的な誤り",
  ] });
  card(s, { x: M + w2 + 0.3, y: Y0 + 2.0, w: w2, h: 2.85, title: "会話の履歴はサーバー側に保存する", fill: C.background1, line: C.accent6, bullet: true, body: [
    "バックエンドが会話 ID ごとに履歴を保存し、毎回まとめて送る",
    "ブラウザからは会話 ID と新しい発言だけを受け取り、改ざんされた assistant ターンの混入を防ぐ",
    "長くなったらキャッシュやコンパクションで入力量を管理する",
  ] });
}

{
  const s = contentSlide("`stop_reason` を先に確認する", "`content` はブロックの配列。読む前に「なぜ止まったか」を見る（主な値は次の6つ）");
  const w = (CW - 2 * 0.3) / 3, h = 1.6;
  [
    ["`end_turn`", "自然に話し終えた。そのまま使える"],
    ["`max_tokens`", "上限で打ち切られた。完成品として扱わず、上限を上げるか出力を分ける"],
    ["`stop_sequence`", "指定した停止シーケンスに一致して止まった"],
    ["`tool_use`", "ツールの実行を求めている。実行して `tool_result` を返す"],
    ["`pause_turn`", "サーバーツールの処理が上限で一時停止。応答を履歴に足して再送する"],
    ["`refusal`", "安全性の判定で応答を断った。エラーではなく通常の応答"],
  ].forEach(([t, b], i) => card(s, { x: M + (i % 3) * (w + 0.3), y: Y0 + Math.floor(i / 3) * (h + 0.2), w, h, title: t, titleSize: 18, titleColor: C.accent1, body: b }));
  trap(s, { x: M, y: 5.6, w: CW, h: 1.15 }, "`max_tokens` は1回の応答の出力上限で、モデル自身には見えない。入力と出力を合わせたコンテキストウィンドウとは別の制限");
}

{
  const s = contentSlide("ストリーミングのイベント順", "`stop_reason` と出力トークン数が確定するのは、終盤の `message_delta`");
  const y = Y0 + 0.05, h = 1.75, gap = 0.45;
  const ws = [2.25, 3.95, 2.35, 2.2];
  let x = M;
  const xs = ws.map((w) => { const v = x; x += w + gap; return v; });
  box(s, { x: xs[0], y, w: ws[0], h, fill: C.background2, name: "Event" });
  T(s, "`message_start`", { x: xs[0], y, w: ws[0], h, size: 14, align: "center", valign: "middle", name: "Event" });
  box(s, { x: xs[1], y, w: ws[1], h, fill: C.background1, line: C.accent1, dash: "dash", name: "Block group" });
  T(s, ["`content_block_start`", "`content_block_delta` × N", "`content_block_stop`"], { x: xs[1] + 0.2, y: y + 0.15, w: ws[1] - 0.4, h: 1.05, size: 14, align: "center", name: "Block events" });
  T(s, "ブロックごとに繰り返す", { x: xs[1] + 0.2, y: y + 1.25, w: ws[1] - 0.4, h: 0.35, size: 12, color: C.accent4, align: "center", name: "Block caption" });
  box(s, { x: xs[2], y, w: ws[2], h, fill: C.accent1, name: "Event highlight" });
  T(s, "`message_delta`", { x: xs[2], y, w: ws[2], h, size: 14, bold: true, color: C.background1, codeColor: C.background1, align: "center", valign: "middle", name: "Event" });
  box(s, { x: xs[3], y, w: ws[3], h, fill: C.background2, name: "Event" });
  T(s, "`message_stop`", { x: xs[3], y, w: ws[3], h, size: 14, align: "center", valign: "middle", name: "Event" });
  for (let i = 0; i < 3; i++) arrow(s, xs[i] + ws[i] + 0.06, y + h / 2, xs[i + 1] - 0.06, y + h / 2);
  T(s, "`stop_reason` と `usage` が確定", { x: xs[2] - 0.3, y: y + h + 0.1, w: ws[2] + 0.6, h: 0.35, size: 12, color: C.accent2, bold: true, codeColor: C.accent2, align: "center", name: "Delta note" });
  T(s, "途中に `ping` や `error` のイベントが入ることもある。想定外のイベントでも落ちないパーサーにする", { x: M, y: 4.3, w: CW, h: 0.4, size: 14, color: C.accent4, name: "Ping note" });
  const w2 = (CW - 0.3) / 2;
  card(s, { x: M, y: 4.95, w: w2, h: 1.85, title: "ツール入力のストリーミング", body: "`input_json_delta` の `partial_json` は JSON の断片。同じ `index` ごとに連結し、`content_block_stop` の後で1回だけ解析する" });
  card(s, { x: M + w2 + 0.3, y: 4.95, w: w2, h: 1.85, title: "長い出力はストリーミングで受け取る", body: "大きな `max_tokens` はタイムアウトを避けるためストリーミングで。完成形は `get_final_message()` などのヘルパーで取得できる" });
}

// =====================================================================
// 第2章
divider(2, "アプリケーションと統合の実務", "D2 アプリケーションと統合（後半） ・ 音声 10:18〜", "エラー処理 ／ 画像・PDF・ファイル ／ バッチ ／ 構造化出力 ／ 本番運用");

{
  const s = contentSlide("再試行するエラー、直すエラー", "判断の軸は「時間をおけば直るか」。直らないエラーは何度送っても失敗する");
  const w2 = (CW - 0.3) / 2, y = Y0, h = 3.0;
  const col = (x, title, color, fill, line, rows, note) => {
    box(s, { x, y, w: w2, h, fill, line, lineW: 1.75, name: "Error column" });
    T(s, title, { x: x + 0.3, y: y + 0.2, w: w2 - 0.6, h: 0.42, size: 20, bold: true, color, name: "Error title" });
    rows.forEach(([code, label], i) => {
      const ry = y + 0.72 + i * 0.62;
      T(s, code, { x: x + 0.3, y: ry, w: 1.2, h: 0.6, size: 28, bold: true, color, valign: "middle", name: "Error code" });
      T(s, label, { x: x + 1.6, y: ry, w: w2 - 1.9, h: 0.6, size: 14, valign: "middle", codeColor: C.accent4, name: "Error label" });
    });
    if (note) T(s, note, { x: x + 0.3, y: y + h - 0.4, w: w2 - 0.6, h: 0.3, size: 12, color: C.accent4, name: "Error note" });
  };
  col(M, "再試行する", C.accent1, C.background2, null, [["429", "レート制限 `rate_limit_error`"], ["500", "サーバーエラー `api_error`"], ["529", "過負荷 `overloaded_error`"]]);
  col(M + w2 + 0.3, "直す（再試行しない）", C.accent2, C.background1, C.accent2, [["400", "リクエストの誤り `invalid_request_error`"], ["401", "認証エラー（API キーを確認）"], ["413", "リクエストが大きすぎる"]], "403（権限）や 404（存在しない）も同じく直す側");
  const w3 = (CW - 2 * 0.3) / 3;
  card(s, { x: M, y: 5.2, w: w3, h: 1.6, title: "バックオフ＋ジッター", size: 13, body: "待ち時間を伸ばしつつランダムにずらす。429 は `retry-after` を尊重し、回数に上限" });
  card(s, { x: M + w3 + 0.3, y: 5.2, w: w3, h: 1.6, title: "SDK の自動再試行", size: 13, body: "429 と 5xx を既定で2回。同時実行数の制御はアプリ側（セマフォなど）" });
  card(s, { x: M + 2 * (w3 + 0.3), y: 5.2, w: w3, h: 1.6, title: "HTTP で直接呼ぶとき", size: 13, body: "キーは `Authorization: Bearer` か従来の `x-api-key` で。`anthropic-version` も付ける" });
}

{
  const s = contentSlide("入力の種類と大量処理", "同じ資料を何度も使うなら Files API、急がない大量処理なら Message Batches");
  const w2 = (CW - 0.3) / 2, h = 2.3;
  const cells = [
    ["画像 ― `image` ブロック", ["渡し方は base64・URL・`file_id` の3通り", "画像を先に、質問のテキストを後に置く", "画像もトークンを使う。大きすぎる画像は縮小"]],
    ["PDF と引用 ― `document` ブロック", ["`citations` を有効にすると `cited_text` とページ位置が付く", "UI から原文にリンクできる", "引用機能は構造化出力と併用できない"]],
    ["Files API ― `file_id` で参照", ["一度アップロードし、各リクエストで `file_id` を参照", "中身は参照のたびに入力トークンとして処理される", "トークンも減らすならプロンプトキャッシュと併用"]],
    ["Message Batches ― 非同期で約半額", ["最大24時間以内に結果が揃い、料金は約半額", "一意の `custom_id` で結果を元データと突き合わせる", "`processing_status` で終了を確認する"]],
  ];
  cells.forEach(([t, b], i) => card(s, { x: M + (i % 2) * (w2 + 0.3), y: Y0 + Math.floor(i / 2) * (h + 0.2), w: w2, h, title: t, body: b, bullet: true }));
}

{
  const s = contentSlide("出力の形式は構造化出力で保証する", "下流のプログラムが読むなら、形式はプロンプトではなく仕組みで保証する");
  const w2 = (CW - 0.3) / 2;
  card(s, { x: M, y: Y0, w: w2, h: 1.9, title: "`output_config.format`", titleSize: 18, titleColor: C.accent1, body: "応答そのものを JSON Schema（`json_schema` タイプ）に沿わせる。SDK の `parse()` ヘルパーで検証済みの結果を受け取れる" });
  card(s, { x: M + w2 + 0.3, y: Y0, w: w2, h: 1.9, title: "`strict: true`", titleSize: 18, titleColor: C.accent1, body: "ツール定義に付けると、ツールの入力がスキーマどおりになる" });
  // ×と○
  const y = 4.1, h = 1.15;
  box(s, { x: M, y, w: w2, h, fill: C.background1, line: C.accent2, lineW: 1.75, name: "Bad" });
  bubble(s, M + 0.25, y + (h - 0.54) / 2, "×", { red: true, size: 16 });
  T(s, "assistant のプリフィルで「{」から書き出させる ― 新しいモデルでは使えない", { x: M + 0.85, y: y + 0.12, w: w2 - 1.1, h: h - 0.24, size: 14, valign: "middle", name: "Bad text" });
  box(s, { x: M + w2 + 0.3, y, w: w2, h, fill: C.background2, name: "Good" });
  bubble(s, M + w2 + 0.55, y + (h - 0.54) / 2, "○", { size: 16 });
  T(s, "構造化出力を使う。または `system` で形式を具体的に指示する", { x: M + w2 + 1.15, y: y + 0.12, w: w2 - 1.4, h: h - 0.24, size: 14, valign: "middle", name: "Good text" });
  const w3 = (CW - 2 * 0.3) / 3;
  [
    "スキーマに `required` と `additionalProperties: false` を指定する",
    "パース前に `stop_reason` を確認。`max_tokens` なら出力は不完全",
    "`content[0]` を決め打ちせず、`type` で目的のブロックを探す",
  ].forEach((b, i) => card(s, { x: M + i * (w3 + 0.3), y: 5.5, w: w3, h: 1.3, body: b, fill: C.background1, line: C.accent6 }));
}

{
  const s = contentSlide("本番運用の5つのポイント", "モデルもプロンプトも「評価してから、戻せる形で」変える");
  const rows = [
    ["モデル ID を設定で固定", "移行は、評価セットで比較 → 一部のトラフィックで検証（カナリア）→ 段階的に拡大。いつでも戻せるようにする"],
    ["提供終了に備える", "非推奨のモデルは終了日以降エラーになる。コード・設定・バッチジョブの使用箇所を洗い出し、前もって移行"],
    ["プロンプトはコード", "バージョン管理・レビュー・CI の回帰評価を経てデプロイし、ログにプロンプトのバージョンを残す"],
    ["ログに残す項目", "`request-id`、モデル ID、`usage`、`stop_reason`、レイテンシ。秘密情報は残さず、個人情報はマスク"],
    ["人間のレビューの位置", "外部送信や本番変更など、取り消しにくい操作の直前に置く。根拠（引用・出典）も一緒に見せる"],
  ];
  const h = 0.86, gap = 0.12;
  rows.forEach(([t, d], i) => {
    const y = Y0 + i * (h + gap);
    box(s, { x: M + 0.65, y, w: CW - 0.65, h, fill: C.background2, name: "Row" });
    bubble(s, M, y + (h - 0.54) / 2, i + 1);
    T(s, t, { x: M + 0.9, y, w: 3.3, h, size: 16, bold: true, valign: "middle", name: "Row title" });
    T(s, d, { x: M + 4.3, y: y + 0.08, w: CW - 4.5, h: h - 0.16, size: 14, valign: "middle", name: "Row desc" });
  });
}

{
  const s = contentSlide("利用形態の選び分け", "誰が、何のために使うかで提供形態を選ぶ");
  const w4 = (CW - 3 * 0.3) / 4, h = 2.65;
  [
    ["社員の業務利用", "claude.ai / Claude Desktop", "Projects で資料を共有して日常業務に使う"],
    ["開発者のコーディング", "Claude Code", "ターミナルや IDE でコードを読み書きする"],
    ["自社製品への組み込み", "Claude API ＋ SDK", "Messages API を自社のアプリから呼ぶ"],
    ["自社環境のエージェント", "Claude Agent SDK", "Claude Code と同じ部品で独自のエージェントを作る"],
  ].forEach(([who, prod, d], i) => {
    const x = M + i * (w4 + 0.3);
    box(s, { x, y: Y0, w: w4, h, fill: C.background2, name: "Product" });
    T(s, who, { x: x + 0.22, y: Y0 + 0.2, w: w4 - 0.44, h: 0.32, size: 12, color: C.accent4, bold: true, name: "Who" });
    T(s, prod, { x: x + 0.22, y: Y0 + 0.58, w: w4 - 0.44, h: 0.75, size: 18, bold: true, color: C.accent1, name: "Product name" });
    T(s, d, { x: x + 0.22, y: Y0 + 1.42, w: w4 - 0.44, h: h - 1.62, size: 14, name: "Product desc" });
  });
  card(s, { x: M, y: 4.85, w: CW, h: 1.65, title: "クラウド経由で使うとき（Amazon Bedrock ・ Google Cloud Vertex AI ・ Microsoft Foundry）", fill: C.background1, line: C.accent6, bullet: true, body: [
    "各プラットフォーム専用の SDK クライアントを使う。リクエストの形は Messages API とほぼ共通",
    "モデル ID の形式と認証方式（AWS IAM、Google Cloud の ADC など）が異なる。ベータ機能などは提供状況を確認する",
  ] });
}

// =====================================================================
// 第3章
divider(3, "モデル選択と最適化", "D5 モデル選択と最適化 ・ 配点 16.8% ・ 音声 17:32〜", "モデルの選び方 ／ adaptive thinking と effort ／ プロンプトキャッシュ ／ コストとレイテンシ");

{
  const s = contentSlide("迷ったら Opus から始め、評価で決める", "2026年11月時点の現行モデルは4系統。左ほど高性能、右ほど速く低コスト");
  const w4 = (CW - 3 * 0.3) / 4;
  [
    ["Fable", "最も高性能", "難しい推論や、長時間のエージェント作業"],
    ["Opus", "多くの用途の出発点", "迷ったらまずここから（公式の案内）"],
    ["Sonnet", "速さと賢さのバランス型", "速さと性能の両方が要る、幅広い本番用途"],
    ["Haiku", "最速・最安", "大量の分類や抽出。低レイテンシが重要な処理"],
  ].forEach(([n, tag, d], i) => {
    const x = M + i * (w4 + 0.3);
    box(s, { x, y: Y0, w: w4, h: 2.3, fill: i === 1 ? C.background1 : C.background2, line: i === 1 ? C.accent1 : undefined, lineW: 1.75, name: "Model" });
    T(s, n, { x: x + 0.25, y: Y0 + 0.2, w: w4 - 0.5, h: 0.6, size: 28, bold: true, color: C.accent1, name: "Model name" });
    T(s, tag, { x: x + 0.25, y: Y0 + 0.85, w: w4 - 0.5, h: 0.35, size: 14, bold: true, color: C.accent4, name: "Model tag" });
    T(s, d, { x: x + 0.25, y: Y0 + 1.3, w: w4 - 0.5, h: 0.85, size: 14, name: "Model desc" });
  });
  [
    ["進め方は2通り", "軽いモデルから上げるか、高性能なモデルから effort やモデルを下げるか。決め手は評価"],
    ["完了タスクで比べる", "失敗したタスクにも再試行にも料金がかかる。単価が安くても総額は増えうる"],
    ["まず effort から", "モデルを替える前に effort を調整する。複数モデルの構成も、まず1モデルと比べる"],
    ["トークン数の見積もり", "`count_tokens` に、本番と同じモデル・`system`・`tools` で送る。数えるだけなら無料"],
  ].forEach(([t, b], i) => card(s, { x: M + i * (w4 + 0.3), y: 4.5, w: w4, h: 2.3, title: t, body: b, fill: C.background1, line: C.accent6 }));
}

{
  const s = contentSlide("思考は adaptive thinking と effort で制御", "新しいモデルでは、思考の量をトークン数ではなく effort で調整する");
  const wl = 5.55, y = Y0, h = 2.15;
  box(s, { x: M, y, w: wl, h, fill: C.background1, line: C.accent6, name: "Before" });
  T(s, "以前（固定の思考予算）", { x: M + 0.25, y: y + 0.18, w: wl - 0.5, h: 0.36, size: 14, bold: true, color: C.accent4, name: "Before label" });
  T(s, ["`thinking: {type: \"enabled\",`", "`          budget_tokens: 10000}`"], { x: M + 0.25, y: y + 0.65, w: wl - 0.5, h: 0.75, size: 14, name: "Before code" });
  T(s, "最新のモデルではエラー（400）", { x: M + 0.25, y: y + 1.6, w: wl - 0.5, h: 0.35, size: 14, bold: true, color: C.accent2, name: "Before note" });
  arrow(s, M + wl + 0.15, y + h / 2, W - M - wl - 0.15, y + h / 2, { color: C.accent1, width: 2.5 });
  const xr = W - M - wl;
  box(s, { x: xr, y, w: wl, h, fill: C.background2, name: "After" });
  T(s, "新しいモデル", { x: xr + 0.25, y: y + 0.18, w: wl - 0.5, h: 0.36, size: 14, bold: true, color: C.accent1, name: "After label" });
  T(s, ["`thinking: {type: \"adaptive\"}`", "`output_config: {effort: \"low\"〜\"max\"}`"], { x: xr + 0.25, y: y + 0.65, w: wl - 0.5, h: 0.75, size: 14, name: "After code" });
  T(s, "深さとコストは effort で調整する", { x: xr + 0.25, y: y + 1.6, w: wl - 0.5, h: 0.35, size: 14, bold: true, color: C.accent1, name: "After note" });
  const w3 = (CW - 2 * 0.3) / 3;
  card(s, { x: M, y: 4.35, w: w3, h: 2.45, title: "effort は5段階", body: "`low`・`medium`・`high`・`xhigh`・`max`。`xhigh` は長時間のエージェント作業向け。既定値はモデルで違う" });
  card(s, { x: M + w3 + 0.3, y: 4.35, w: w3, h: 2.45, title: "思考の表示", body: "思考の内容は既定で返されない（`omitted`）。要約を見せたいなら `display: \"summarized\"`" });
  card(s, { x: M + 2 * (w3 + 0.3), y: 4.35, w: w3, h: 2.45, title: "サンプリング設定は使えない", body: "`temperature`・`top_p`・`top_k` は既定以外の値でエラー。新しい API バージョンでは送るだけでエラー。指示・例・構造化出力で安定させる" });
}

{
  const s = contentSlide("キャッシュはプレフィックスの完全一致", "プロンプトは tools → system → messages の順につながり、先頭から一致した部分を再利用する");
  const y = 2.45, h = 0.85;
  const segs = [["`tools`", 2.0], ["`system`", 2.6], ["共有の指示・例・資料", 3.65]];
  let x = M;
  segs.forEach(([t, w]) => {
    box(s, { x, y, w, h, fill: C.accent1, r: 0, name: "Prefix seg" });
    T(s, t, { x, y, w, h, size: 14, bold: true, color: C.background1, codeColor: C.background1, align: "center", valign: "middle", name: "Seg text" });
    x += w + 0.06;
  });
  const bpX = x + 0.12;
  s.addShape(SH.DIAMOND, { x: bpX - 0.2, y: y + h / 2 - 0.2, w: 0.4, h: 0.4, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "Breakpoint" });
  const restX = bpX + 0.35;
  box(s, { x: restX, y, w: W - M - restX, h, fill: C.background1, line: C.accent4, dash: "dash", r: 0, name: "Variable seg" });
  T(s, "毎回変わる質問・時刻", { x: restX, y, w: W - M - restX, h, size: 14, bold: true, color: C.accent4, align: "center", valign: "middle", name: "Var text" });
  T(s, "キャッシュされるプレフィックス（ここまで少しでも違えばミス）", { x: M, y: y - 0.45, w: x - M, h: 0.35, size: 14, bold: true, color: C.accent1, align: "center", name: "Prefix label" });
  T(s, "`cache_control`（ブレークポイント）", { x: bpX - 1.6, y: y + h + 0.1, w: 3.2, h: 0.35, size: 12, bold: true, color: C.accent2, codeColor: C.accent2, align: "center", name: "BP label" });
  const w3 = (CW - 2 * 0.3) / 3, cy = 4.05, ch = 2.75;
  card(s, { x: M, y: cy, w: w3, h: ch, num: "×", red: true, fill: C.background1, line: C.accent2, title: "system に現在時刻", body: "先頭が毎回変わり、毎回ミスする。変わる値は最後のブレークポイントより後ろ（messages 側）へ" });
  card(s, { x: M + w3 + 0.3, y: cy, w: w3, h: ch, num: "×", red: true, fill: C.background1, line: C.accent2, title: "ツールの追加・並べ替え", body: "後ろの system も含めて全体が無効になる。ツール一覧は固定し、同じ順で送る" });
  card(s, { x: M + 2 * (w3 + 0.3), y: cy, w: w3, h: ch, num: "○", title: "共有部分の末尾に置く", body: "変わる部分に置くと毎回書き込みだけが起き、割増料金を払う。`cache_read_input_tokens` が 0 なら無効化を疑う" });
}

{
  const s = contentSlide("キャッシュとバッチの数字", "キャッシュとバッチの仕様を、数字で押さえる（2026年11月時点）");
  const w4 = (CW - 3 * 0.3) / 4;
  [
    { value: "4", unit: "個まで", label: "ブレークポイント", sub: "1リクエストに置ける上限" },
    { value: "5", unit: "分", label: "既定の TTL", sub: "読まれるたびに延長" },
    { value: "1", unit: "時間", label: "選べる長い TTL", sub: "書き込みは入力の2倍" },
    { value: "約半額", unit: "", label: "バッチの割引", sub: "キャッシュの読み書きにも適用。併用できる" },
  ].forEach((d, i) => stat(s, { x: M + i * (w4 + 0.3), y: Y0, w: w4, h: 2.75, ...d }));
  const w3 = (CW - 2 * 0.3) / 3;
  card(s, { x: M, y: 4.95, w: w3, h: 1.85, title: "最小長に満たないとき", body: "エラーにならず、キャッシュされないだけ。`usage` で必ず確認" });
  card(s, { x: M + w3 + 0.3, y: 4.95, w: w3, h: 1.85, title: "料金のかかり方", body: "書き込みは通常の入力の1.25倍。読み込みは約0.1倍で、さらに安いモデルもある" });
  card(s, { x: M + 2 * (w3 + 0.3), y: 4.95, w: w3, h: 1.85, title: "レイテンシ", body: "人が待つ画面はストリーミングで体感を短く。実時間は出力を短く、速いモデルや低い effort で" });
}

// =====================================================================
// 第4章
divider(4, "エージェントとワークフロー", "D1 エージェントとワークフロー ・ 配点 14.7% ・ 音声 24:46〜", "ワークフローとエージェント ／ 5つのパターン ／ ループと停止条件 ／ コンテキスト管理");

{
  const s = contentSlide("ワークフローか、エージェントか", "判断の軸は「手順を事前に決められるか」");
  const w2 = (CW - 0.3) / 2, h = 3.15;
  card(s, { x: M, y: Y0, w: w2, h, title: "ワークフロー ― コードで決めた経路で動かす", titleColor: C.accent1, bullet: true, body: [
    "向く: 毎回同じ手順のタスク（例: 請求書の抽出 → 検証 → 登録）",
    "利点: 予測しやすく、一貫性があり、監査しやすい",
    "例: プロンプトチェーン、ルーティング、並列化",
  ] });
  card(s, { x: M + w2 + 0.3, y: Y0, w: w2, h, title: "エージェント ― LLM が手順を動的に決める", titleColor: C.accent1, fill: C.background1, line: C.accent6, bullet: true, body: [
    "向く: 必要なステップ数を事前に読めない、オープンエンドな問題",
    "代償: コストが高く、誤りが積み重なりやすい。止める条件が必須",
    "例: 複数ファイルにまたがるコード修正、幅広い調査",
  ] });
  const y = 5.35, h2 = 1.45;
  T(s, ["シンプルに始める", "評価で不足が見えたときだけ次へ"], { x: M, y: y + 0.2, w: 2.6, h: 1.1, size: 14, bold: true, color: C.accent1, name: "Simple label" });
  const steps = ["検索や例で補強した1回の呼び出し", "ワークフロー", "エージェント"];
  const cw = 2.75, ag = 0.55;
  steps.forEach((t, i) => {
    const x = M + 2.85 + i * (cw + ag);
    box(s, { x, y: y + 0.15, w: cw, h: h2 - 0.3, fill: i === 0 ? C.accent1 : C.background2, name: "Step" });
    T(s, t, { x: x + 0.15, y: y + 0.15, w: cw - 0.3, h: h2 - 0.3, size: 14, bold: true, color: i === 0 ? C.background1 : C.text1, align: "center", valign: "middle", name: "Step text" });
    if (i < 2) arrow(s, x + cw + 0.06, y + h2 / 2, x + cw + ag - 0.06, y + h2 / 2);
  });
}

{
  const s = contentSlide("ワークフローの5つのパターン", "違いは「サブタスクを誰がいつ決めるか」と「ループがあるか」");
  const w3 = (CW - 2 * 0.3) / 3, h = 2.3;
  const pats = [
    ["プロンプトチェーン", "順番のステップに分け、前の出力を次の入力に。途中にゲートを置ける", "手順が固定で、各ステップを簡単にしたいとき"],
    ["ルーティング", "入力を分類して、種類ごとの専用プロンプトやモデルへ振り分ける", "カテゴリが明確なとき。簡単なものは小型モデルへ"],
    ["並列化", "独立部分を同時に処理する「セクショニング」と、同じタスクを繰り返す「投票」", "高速化や見逃しの削減"],
    ["オーケストレーター・ワーカー", "中央の LLM がサブタスクを動的に決めて任せ、結果を統合する", "サブタスクを事前に決められないとき"],
    ["評価者・最適化者", "生成役と評価役がフィードバックを繰り返す", "明確な評価基準があり、反復で品質が上がるとき"],
  ];
  pats.forEach(([n, d, when], i) => {
    const x = M + (i % 3) * (w3 + 0.3), y = Y0 + Math.floor(i / 3) * (h + 0.2);
    card(s, { x, y, w: w3, h, num: i + 1, title: n, body: [d, `向く: ${when}`], after: 3, size: 13 });
  });
  const x = M + 2 * (w3 + 0.3), y = Y0 + h + 0.2;
  box(s, { x, y, w: w3, h, fill: C.text2, name: "Tip" });
  T(s, "見分け方", { x: x + 0.22, y: y + 0.18, w: w3 - 0.44, h: 0.36, size: 16, bold: true, color: C.background1, name: "Tip title" });
  T(s, ["サブタスクが事前に決まる → 並列化", "入力ごとに LLM が決める → オーケストレーター・ワーカー"], { x: x + 0.22, y: y + 0.65, w: w3 - 0.44, h: h - 0.85, size: 14, color: C.background1, bullet: true, after: 6, name: "Tip body" });
}

{
  const s = contentSlide("エージェントループと止める条件", "`stop_reason` が `tool_use` の間ループし、必ず止める条件を置く");
  const bx = M + 0.55, bw = 5.4, bh = 0.92, gap = 0.3;
  const steps = [
    "① 会話を送る（`messages`）",
    "② `stop_reason` を確認（`end_turn` なら完了）",
    "③ `tool_use` ならアプリがツールを実行",
    "④ 応答全体と `tool_result` を履歴に足す",
  ];
  steps.forEach((t, i) => {
    const y = Y0 + i * (bh + gap);
    box(s, { x: bx, y, w: bw, h: bh, fill: i === 1 ? C.accent1 : C.background2, name: "Loop step" });
    T(s, t, { x: bx + 0.25, y, w: bw - 0.5, h: bh, size: 14, bold: true, color: i === 1 ? C.background1 : C.text1, codeColor: i === 1 ? C.background1 : C.accent1, valign: "middle", name: "Loop text" });
    if (i < 3) arrow(s, bx + bw / 2, y + bh + 0.04, bx + bw / 2, y + bh + gap - 0.04);
  });
  const yTop = Y0 + bh / 2, yBot = Y0 + 3 * (bh + gap) + bh / 2, lx = M + 0.15;
  arrow(s, bx, yBot, lx, yBot, { head: false, color: C.accent1, width: 2 });
  arrow(s, lx, yBot, lx, yTop, { head: false, color: C.accent1, width: 2 });
  arrow(s, lx, yTop, bx - 0.04, yTop, { color: C.accent1, width: 2 });
  const rx = 6.95, rw = W - M - rx, ch = 1.55;
  card(s, { x: rx, y: Y0, w: rw, h: ch, title: "応答はそのまま履歴へ", body: "`content` を `tool_use` や thinking ごと assistant として戻す。テキストだけ抜き出さない" });
  card(s, { x: rx, y: Y0 + ch + 0.1, w: rw, h: ch, title: "止める条件を必ず置く", body: "基本はループの回数に上限を設ける（Tool Runner の `max_iterations` など）" });
  card(s, { x: rx, y: Y0 + 2 * (ch + 0.1), w: rw, h: ch, title: "`task_budget` と `max_tokens`", body: "`max_tokens` は1応答の強制的な上限。`task_budget`（ベータ）はループ全体の目安で、強制ではない" });
}

{
  const s = contentSlide("長い作業はコンテキストを管理する", "コンテキストは有限の資源。トークンが増えるほど、モデルの精度は落ちる");
  const w3 = (CW - 2 * 0.3) / 3, h = 3.05;
  card(s, { x: M, y: Y0, w: w3, h, num: 1, title: "サブエージェント", body: "調査を任せ、それぞれが自分のコンテキストで資料を読み、要点の要約だけを返す。メインは統合と判断に集中できる" });
  card(s, { x: M + w3 + 0.3, y: Y0, w: w3, h, num: 2, title: "メモリ", body: "決定事項・進捗・未解決事項をメモリツールやファイルに書き出し、次のセッションで読み戻す。メモリツールの保存先はアプリ側で用意する" });
  card(s, { x: M + 2 * (w3 + 0.3), y: Y0, w: w3, h, num: 3, title: "編集とコンパクション", bullet: true, body: ["コンテキスト編集: 古いツール結果を要約せずに消去する", "コンパクション: 古いやり取りを要約に置き換える"] });
  const y = 5.25, h2 = 1.55;
  box(s, { x: M, y, w: CW, h: h2, fill: C.background1, line: C.accent6, name: "Choose" });
  T(s, "違い", { x: M + 0.25, y, w: 1.6, h: h2, size: 16, bold: true, color: C.accent1, valign: "middle", name: "Choose label" });
  const half = (CW - 2.1) / 2;
  T(s, ["古いツール結果を消す", "→ コンテキスト編集"], { x: M + 1.9, y: y + 0.2, w: half - 0.2, h: h2 - 0.4, size: 16, bold: true, valign: "middle", name: "Choose A" });
  T(s, ["古いやり取りを要約する", "→ コンパクション"], { x: M + 1.9 + half, y: y + 0.2, w: half - 0.2, h: h2 - 0.4, size: 16, bold: true, valign: "middle", name: "Choose B" });
}

{
  const s = contentSlide("エージェントの作り方を選ぶ", "「ハーネスを誰が提供するか」と「実行環境を誰が持つか」で整理する");
  const head = (t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 } } });
  const cell = (t, i, extra = {}) => ({ text: runs(Array.isArray(t) ? t : [t], { codeColor: C.accent1 }), options: { fill: { color: i % 2 ? C.background2 : C.background1 }, ...extra } });
  const rows = [
    [head("方法"), head("ハーネス（ループ・コンテキスト管理）"), head("実行環境"), head("特徴")],
    ...[
      ["手動ループ", "自前", "自前", "最も柔軟。`stop_reason` を見てツールを実行し、結果を返すループを自分で書く"],
      ["Tool Runner（クライアント SDK）", "SDK", "自前", "ベータ。自分で定義したツールに対してループを回す補助機能"],
      ["Claude Agent SDK", "SDK", "自前", "Claude Code と同じループと、ファイル操作や Bash などの組み込みツール"],
      ["Managed Agents", "Anthropic", ["Anthropic", "（自社運用も可）"], "ベータ。設定を一度作り ID で参照、実行ごとにセッション開始。スケジュール実行も可"],
    ].map((r, i) => r.map((t, k) => cell(t, i, k === 0 ? { bold: true } : {}))),
  ];
  s.addTable(rows, {
    x: M, y: Y0, w: CW, colW: [3.0, 2.6, 2.0, CW - 7.6], fontSize: 14, color: C.text1, valign: "middle",
    border: { type: "solid", pt: 0.75, color: HEX.accent6 }, margin: [6, 8, 6, 8], rowH: [0.5, 0.95, 0.85, 0.95, 0.95],
    objectName: "Agent options table",
  });
  T(s, "フレームワークを使う場合も、内部で送られるプロンプトと応答を把握しておく。まずは API を直接使って始めるのが推奨", { x: M, y: 6.25, w: CW, h: 0.5, size: 14, color: C.accent4, name: "Table note" });
}

// =====================================================================
// 第5章
divider(5, "プロンプトとコンテキストの設計", "D6 プロンプトとコンテキスト ・ 配点 11.0% ・ 音声 31:15〜", "伝わるプロンプトの原則 ／ 根拠付けと評価 ／ コンテキストロットと JIT 取得");

{
  const s = contentSlide("伝わるプロンプトの6原則", "文脈を知らない優秀な新人に頼むつもりで、具体的に書く");
  const w3 = (CW - 2 * 0.3) / 3, h = 2.3;
  [
    ["明確・直接に", "出力の形式と制約を具体的に書き、理由や背景も伝える。順番が大事なら番号付きの手順に"],
    ["強調より理由", "強い言葉は今のモデルに効きすぎることがある。「読み上げるので省略記号は使わない」のように理由を添える"],
    ["例は3〜5個", "実際の用途に近い多様な例を `<example>` タグで囲む。偏った例は意図しない特徴まで真似される"],
    ["XML タグで区切る", "指示・文脈・例・入力を種類ごとのタグで囲む。タグ名は内容を表す名前で一貫させる"],
    ["長文は先頭、質問は最後", "文書は1つずつ `<document>` で囲み出典を添える。質問を最後に置くと品質が最大30%向上（公式のテスト）"],
    ["役割は `system` に", "役割だけで済ませず、読み手や用途も伝える。書式は「〜しないで」より望む形を書く"],
  ].forEach(([t, b], i) => card(s, { x: M + (i % 3) * (w3 + 0.3), y: Y0 + Math.floor(i / 3) * (h + 0.2), w: w3, h, num: i + 1, title: t, body: b }));
}

{
  const s = contentSlide("根拠を出させ、評価で改善する", "もっともらしい誤りは、根拠を示させる仕組みと評価セットで減らす");
  const lw = 5.7;
  T(s, "根拠付けの3つの基本", { x: M, y: Y0, w: lw, h: 0.4, size: 18, bold: true, color: C.accent1, name: "Ground title" });
  ["情報がなければ「わかりません」と答えてよいと明示する", "長い文書では、先に該当箇所を引用させる", "主張ごとに引用と出典を示させる"].forEach((t, i) => {
    const y = Y0 + 0.65 + i * 1.3;
    box(s, { x: M + 0.6, y, w: lw - 0.6, h: 1.1, fill: C.background2, name: "Ground row" });
    bubble(s, M, y + 0.28, i + 1);
    T(s, t, { x: M + 0.85, y, w: lw - 1.1, h: 1.1, size: 16, bold: true, valign: "middle", name: "Ground text" });
  });
  T(s, "誤りは減るがゼロにはならない。重要な情報は検証する", { x: M, y: Y0 + 4.45, w: lw, h: 0.35, size: 12, color: C.accent4, name: "Ground note" });
  const rx = 7.0, rw = W - M - rx;
  T(s, "評価駆動の改善サイクル", { x: rx, y: Y0, w: rw, h: 0.4, size: 18, bold: true, color: C.accent1, name: "Cycle title" });
  const cw = (rw - 0.7) / 2, chh = 1.6;
  const pos = [[rx, Y0 + 0.65], [rx + cw + 0.7, Y0 + 0.65], [rx + cw + 0.7, Y0 + 0.65 + chh + 0.6], [rx, Y0 + 0.65 + chh + 0.6]];
  const labels = ["測れる成功基準を決め、評価セットを作る", "変更を1つだけ加える", "同じ評価セットでスコアを測る", "良くなれば採用、悪くなれば戻して②へ"];
  pos.forEach(([x, y], i) => {
    box(s, { x, y, w: cw, h: chh, fill: i === 0 ? C.accent1 : C.background2, name: "Cycle step" });
    bubble(s, x + 0.2, y + 0.2, i + 1, { w: 0.36, h: 0.48, size: 13 });
    T(s, labels[i], { x: x + 0.2, y: y + 0.75, w: cw - 0.4, h: chh - 0.9, size: 14, bold: true, color: i === 0 ? C.background1 : C.text1, name: "Cycle text" });
  });
  arrow(s, rx + cw + 0.08, Y0 + 0.65 + chh / 2, rx + cw + 0.62, Y0 + 0.65 + chh / 2, { color: C.accent1 });
  arrow(s, rx + cw + 0.7 + cw / 2, Y0 + 0.65 + chh + 0.08, rx + cw + 0.7 + cw / 2, Y0 + 0.65 + chh + 0.52, { color: C.accent1 });
  arrow(s, rx + cw + 0.62, Y0 + 0.65 + chh + 0.6 + chh / 2, rx + cw + 0.08, Y0 + 0.65 + chh + 0.6 + chh / 2, { color: C.accent1 });
}

{
  const s = contentSlide("コンテキストは少なく、高シグナルに", "多ければ良いわけではない。トークンが増えるほど精度は落ちる（コンテキストロット）");
  const w2 = (CW - 0.3) / 2;
  card(s, { x: M, y: Y0, w: w2, h: 2.6, num: 1, title: "ジャストインタイムで取得する", body: "ファイルパスやクエリなど軽い識別子だけを持たせ、必要になった時点でツールで中身を読む。すべてを前もって読み込まない" });
  card(s, { x: M + w2 + 0.3, y: Y0, w: w2, h: 2.6, num: 2, title: "少量で高シグナルに保つ", body: "大量に読む調査はサブエージェントに任せ、要約だけを返させる。古いツール結果は消去・要約する" });
  trap(s, { x: M, y: 4.85, w: CW, h: 1.3 }, "キャッシュは料金と速度のための機能。キャッシュした部分もコンテキストウィンドウに数えられる");
}

// =====================================================================
// 第6章
divider(6, "ツールと MCP", "D8 ツールと MCP ・ 配点 10.6% ・ 音声 35:38〜", "ツール呼び出しの流れ ／ ツールの種類 ／ MCP の構成とプリミティブ ／ 使い分け");

{
  const s = contentSlide("`tool_use` には必ず `tool_result` を返す", "同じ `tool_use_id` の結果を、次の user メッセージの先頭で返す");
  const bw = 2.6, gap = (CW - 4 * bw) / 3, y = Y0, h = 1.65;
  [
    ["① ツールを定義", "`name`・`description`・`input_schema`"],
    ["② `tool_use` が返る", "`stop_reason` は `tool_use`"],
    ["③ アプリが実行", "入力はスキーマで検証してから"],
    ["④ 結果を返す", "`tool_result` を同じ ID で user の先頭に"],
  ].forEach(([t, d], i) => {
    const x = M + i * (bw + gap);
    box(s, { x, y, w: bw, h, fill: i === 3 ? C.accent1 : C.background2, name: "Flow step" });
    const fg = i === 3 ? C.background1 : C.text1, cc = i === 3 ? C.background1 : C.accent1;
    T(s, t, { x: x + 0.18, y: y + 0.15, w: bw - 0.36, h: 0.75, size: 15, bold: true, color: fg, codeColor: cc, name: "Flow title" });
    T(s, d, { x: x + 0.18, y: y + 0.92, w: bw - 0.36, h: 0.6, size: 12, color: fg, codeColor: cc, name: "Flow desc" });
    if (i < 3) arrow(s, x + bw + 0.05, y + h / 2, x + bw + gap - 0.05, y + h / 2);
  });
  const w4 = (CW - 3 * 0.3) / 4, cy = 3.85, ch = 2.95;
  card(s, { x: M, y: cy, w: w4, h: ch, title: "並列ツール使用", body: "複数の `tool_use` には、すべての `tool_result` を1つの user メッセージで返す。テキストは結果の後ろに（前だと 400）" });
  card(s, { x: M + w4 + 0.3, y: cy, w: w4, h: ch, title: "失敗も結果で返す", body: "`is_error: true` と、何が起きたか・次に何ができるかを書く。結果は呼び出しごとに1つずつ必要" });
  card(s, { x: M + 2 * (w4 + 0.3), y: cy, w: w4, h: ch, title: "`tool_choice`", body: ["`auto`: 任せる（既定）", "`any`: 何か必ず使う", "`tool`: 指定のツール", "`none`: 使わない"], after: 2 });
  card(s, { x: M + 3 * (w4 + 0.3), y: cy, w: w4, h: ch, title: "強制指定に注意", titleColor: C.accent2, fill: C.background1, line: C.accent2, body: "新しいモデルの一部では `any` と `tool` が 400。`auto` のままプロンプトで指示し、入力は `strict: true` で守る" });
}

{
  const s = contentSlide("ツールは実行する場所で2種類", "説明文と結果はモデルが読むプロンプトの一部。実行するのはアプリか Anthropic か");
  const lw = 5.9;
  card(s, { x: M, y: Y0, w: lw, h: 4.85, title: "書き方のポイント", bullet: true, after: 8, body: [
    "入力の形: `input_schema` に JSON Schema で書く（`parameters` ではない）",
    "説明文: 何をするか、いつ使う・使わないか、各パラメータの意味と形式、制約。Claude はこれを手がかりに使うかを判断する",
    "結果: 判断に必要な項目に絞り、人が読める名前を含める。件数が多ければページングや切り詰め",
    "ツールが数百・数千あるとき: ツール検索ツールと `defer_loading: true` で、必要なものだけ読み込む",
  ] });
  const rx = M + lw + 0.3, rw = W - M - rx, h = 1.5;
  [
    ["自分で定義するツール", "アプリ", "クライアントツール。開発者が定義し、アプリが実行する"],
    ["Anthropic 定義のツール", "アプリ", "bash・テキストエディタ・メモリなど。これもクライアントツールで、実行と安全対策はアプリ側"],
    ["サーバーツール", "Anthropic", "Web 検索・Web フェッチ・コード実行・ツール検索など。Anthropic 側で実行される"],
  ].forEach(([t, who, d], i) => {
    const y = Y0 + i * (h + 0.175);
    box(s, { x: rx, y, w: rw, h, fill: C.background1, line: C.accent6, name: "Tool type" });
    T(s, t, { x: rx + 0.22, y: y + 0.16, w: rw - 2.3, h: 0.36, size: 16, bold: true, name: "Tool type title" });
    pill(s, `実行: ${who}`, { x: rx + rw - 1.95, y: y + 0.16, w: 1.75, fill: who === "Anthropic" ? C.accent1 : C.accent4 });
    T(s, d, { x: rx + 0.22, y: y + 0.62, w: rw - 0.44, h: h - 0.75, size: 14, name: "Tool type desc" });
  });
}

{
  const s = contentSlide("MCP は「誰が制御するか」で整理する", "MCP サーバーが公開する3つのプリミティブ");
  const w3 = (CW - 2 * 0.3) / 3, h = 2.2;
  [
    ["ツール（Tools）", "モデルが制御", "モデルが判断して呼び出す操作。検索や更新など"],
    ["リソース（Resources）", "アプリが制御", "文脈として渡すデータ。ファイルや DB のレコードなど"],
    ["プロンプト（Prompts）", "ユーザーが制御", "ユーザーが選んで使う定型テンプレート。スラッシュコマンドなど"],
  ].forEach(([t, who, d], i) => {
    const x = M + i * (w3 + 0.3);
    box(s, { x, y: Y0, w: w3, h, fill: C.background2, name: "Primitive" });
    T(s, t, { x: x + 0.22, y: Y0 + 0.2, w: w3 - 0.44, h: 0.42, size: 18, bold: true, color: C.accent1, name: "Primitive name" });
    pill(s, who, { x: x + 0.22, y: Y0 + 0.75, w: 1.7, fill: C.text2 });
    T(s, d, { x: x + 0.22, y: Y0 + 1.25, w: w3 - 0.44, h: h - 1.4, size: 14, name: "Primitive desc" });
  });
  const cy = 4.4, ch = 2.4;
  card(s, { x: M, y: cy, w: w3, h: ch, title: "構成とトランスポート", fill: C.background1, line: C.accent6, body: "ホストがサーバーごとにクライアントを作る。ローカルは `stdio`、リモートは Streamable HTTP（旧 HTTP+SSE は非推奨）" });
  card(s, { x: M + w3 + 0.3, y: cy, w: w3, h: ch, title: "2種類のエラー", fill: C.background1, line: C.accent6, bullet: true, body: ["プロトコルの誤り → JSON-RPC のエラー", "ツール実行の失敗 → 結果に `isError: true`（モデルに見える）"] });
  card(s, { x: M + 2 * (w3 + 0.3), y: cy, w: w3, h: ch, title: "MCP コネクタ", fill: C.background1, line: C.accent6, body: "ベータ。`mcp_servers` と `mcp_toolset` の両方を書く。Anthropic 側から接続するので、サーバーは HTTP で公開が必要（`stdio` は不可）" });
}

{
  const s = contentSlide("Skills・MCP・ツールの使い分け", "何を再利用したいかで仕組みを選ぶ");
  const w4 = (CW - 3 * 0.3) / 4, h = 3.0;
  [
    ["Skills", "手順書・テンプレート・スクリプトをまとめ、関連する作業のときだけ読み込ませたい"],
    ["MCP", "外部システムやデータへの接続を、複数のアプリで再利用したい"],
    ["カスタムツール", "自分のアプリ固有の関数を Claude に呼ばせたい"],
    ["組み込みツール", "Web 検索のように、Anthropic が提供する機能を使いたい"],
  ].forEach(([n, d], i) => {
    const x = M + i * (w4 + 0.3);
    box(s, { x, y: Y0, w: w4, h, fill: i === 0 ? C.text2 : C.background2, name: "Choice" });
    const fg = i === 0 ? C.background1 : C.text1;
    T(s, n, { x: x + 0.22, y: Y0 + 0.22, w: w4 - 0.44, h: 0.5, size: 22, bold: true, color: i === 0 ? C.background1 : C.accent1, name: "Choice name" });
    T(s, "こんなとき", { x: x + 0.22, y: Y0 + 0.85, w: w4 - 0.44, h: 0.32, size: 12, bold: true, color: i === 0 ? C.accent5 : C.accent4, name: "Choice label" });
    T(s, d, { x: x + 0.22, y: Y0 + 1.22, w: w4 - 0.44, h: h - 1.4, size: 14, color: fg, name: "Choice desc" });
  });
  card(s, { x: M, y: 5.2, w: CW, h: 1.6, title: "Skills の段階的開示", body: "起動時は `description` などのメタデータだけがコンテキストに入り、関連するタスクのときに `SKILL.md` の本文や補助ファイルが読み込まれる" });
}

// =====================================================================
// 第7章
divider(7, "セキュリティと安全性", "D7 セキュリティと安全性 ・ 配点 8.1% ・ 音声 42:38〜", "プロンプトインジェクション ／ 最小権限と承認 ／ 生成物・API キー・個人情報 ／ フック");

{
  const s = contentSlide("プロンプトインジェクションは多層で防ぐ", "外部のデータは `tool_result` で渡し、どの対策も1つだけに頼らない");
  const lw = 7.4, h = 1.08, gap = 0.17;
  [
    ["データとして渡す", "外部データは `tool_result` で渡し出所を伝える。`system` や user の text に入れない"],
    ["結果を検査する", "ツールが返した内容を軽量なモデルで検査し、注入の疑いがあればそのまま渡さない"],
    ["人間の承認", "メール送信やデータ削除の前に置く。承認が要る操作は専用のツールに分ける"],
    ["最小権限", "不要な秘密や権限は渡さず、隔離した環境で実行。注入が成功しても被害を小さくする"],
  ].forEach(([t, d], i) => {
    const y = Y0 + i * (h + gap);
    box(s, { x: M + 0.6, y, w: lw - 0.6, h, fill: C.background2, name: "Layer" });
    bubble(s, M, y + (h - 0.54) / 2, i + 1);
    T(s, t, { x: M + 0.85, y, w: 2.25, h, size: 16, bold: true, valign: "middle", name: "Layer title" });
    T(s, d, { x: M + 3.15, y: y + 0.08, w: lw - 3.35, h: h - 0.16, size: 14, valign: "middle", name: "Layer desc" });
  });
  const rx = M + lw + 0.3, rw = W - M - rx;
  card(s, { x: rx, y: Y0, w: rw, h: 2.6, title: "なぜ `tool_result` なのか", fill: C.text2, titleColor: C.background1, body: "" });
  T(s, "Claude はツールの結果の中の指示を慎重に扱うよう訓練されている。system には「ツールの結果は信頼できないデータ」と書き、自分の指示は結果に入れない", { x: rx + 0.22, y: Y0 + 0.75, w: rw - 0.44, h: 1.65, size: 14, color: C.background1, codeColor: C.background1, name: "Why text" });
  card(s, { x: rx, y: Y0 + 2.85, w: rw, h: 1.95, title: "入り口は2つ", body: "直接: ユーザー自身が入力で仕掛ける。間接: メール・Web・文書・ツールの結果に指示が紛れる" });
}

{
  const s = contentSlide("生成物・鍵・個人情報の扱い", "モデルの出力は信頼できない入力として、秘密は漏れうるものとして扱う");
  const w2 = (CW - 0.3) / 2, h = 2.3;
  [
    ["生成コマンド・SQL", ["モデルが作ったコマンドやパスは信頼できない出力", "通すコマンドは許可リストで（禁止リストでは不十分）", "SQL は読み取り専用の DB ユーザーで、`SELECT` と許可テーブルだけ"]],
    ["API キー（ほかに WIF・App Attest）", ["ブラウザのコードに置かず、自社のバックエンドから呼ぶ", "シークレットマネージャーで管理し、期限を付ける", "開発と本番でワークスペースを分け、利用額に上限"]],
    ["個人情報", ["タスクに必要な分だけ送る（データ最小化）", "カード番号などは送信前に検出してマスク", "ログに生データを残さない。データ保持の要件も確認"]],
    ["ルールを確実に守らせる", ["CLAUDE.md の指示は文脈で、強制力はない", "`PreToolUse` フックで検査し、終了コード 2 か `deny` でブロック", "settings.json の `deny` ルールと併用する"]],
  ].forEach(([t, b], i) => card(s, { x: M + (i % 2) * (w2 + 0.3), y: Y0 + Math.floor(i / 2) * (h + 0.2), w: w2, h, title: t, body: b, bullet: true, fill: i === 3 ? C.background1 : C.background2, line: i === 3 ? C.accent1 : undefined }));
}

// =====================================================================
// 第8章
divider(8, "Claude Code と評価", "D3 Claude Code 3.1% ＋ D4 評価・テスト・デバッグ 2.6% ・ 音声 47:27〜", "CLAUDE.md・settings.json ／ Skills・サブエージェント・CI ／ 評価とデバッグ");

{
  const s = contentSlide("CLAUDE.md と settings.json の階層", "CLAUDE.md は文脈として読まれ、settings.json は上の階層ほど優先される");
  const lw = 5.75;
  box(s, { x: M, y: Y0, w: lw, h: 4.85, fill: C.background2, name: "Claude md" });
  T(s, "CLAUDE.md の階層", { x: M + 0.25, y: Y0 + 0.2, w: lw - 0.5, h: 0.4, size: 16, bold: true, name: "Md title" });
  [["組織", "managed policy"], ["ユーザー", "`~/.claude/CLAUDE.md`"], ["プロジェクト", "`./CLAUDE.md` か `./.claude/CLAUDE.md`"], ["ローカル", "`CLAUDE.local.md`（gitignore）"]].forEach(([k, v], i) => {
    const y = Y0 + 0.75 + i * 0.6;
    T(s, k, { x: M + 0.25, y, w: 1.3, h: 0.5, size: 14, bold: true, color: C.accent1, valign: "middle", name: "Md key" });
    T(s, v, { x: M + 1.6, y, w: lw - 1.8, h: 0.5, size: 13, valign: "middle", name: "Md val" });
  });
  T(s, ["`@path` で別ファイルを取り込める。パスは書いたファイルからの相対", "強制力はない。確実に止めたい操作はフックや権限ルールで"], { x: M + 0.25, y: Y0 + 3.3, w: lw - 0.5, h: 1.4, size: 14, bullet: true, after: 6, name: "Md notes" });
  const rx = M + lw + 0.35, rw = W - M - rx;
  T(s, "settings.json の優先順位（上ほど強い）", { x: rx, y: Y0, w: rw, h: 0.4, size: 16, bold: true, name: "Prec title" });
  const levels = [
    ["managed settings（組織）", C.text2, C.background1],
    ["コマンドライン（`--settings` など）", C.accent1, C.background1],
    ["`.claude/settings.local.json`（個人）", C.accent5, C.text1],
    ["`.claude/settings.json`（チーム共有）", C.accent6, C.text1],
    ["`~/.claude/settings.json`（ユーザー）", C.background2, C.text1],
  ];
  levels.forEach(([t, fill, fg], i) => {
    const inset = i * 0.18;
    const y = Y0 + 0.55 + i * 0.62;
    box(s, { x: rx + inset, y, w: rw - 2 * inset, h: 0.52, fill, r: 0.08, name: "Level" });
    T(s, t, { x: rx + inset + 0.2, y, w: rw - 2 * inset - 0.4, h: 0.52, size: 14, bold: true, color: fg, codeColor: fg, valign: "middle", name: "Level text" });
  });
  T(s, ["`permissions.allow` などの配列は上書きではなくマージ", "`--model` や `ANTHROPIC_MODEL` は `model` の設定より優先"], { x: rx, y: Y0 + 3.75, w: rw, h: 1.1, size: 14, bullet: true, after: 6, name: "Prec notes" });
}

{
  const s = contentSlide("共有・拡張・自動化の仕組み", "チームで共有するものはコミットし、個人用は local に置く");
  const w2 = (CW - 0.3) / 2, h = 2.3;
  [
    ["チームで共有する設定", ["MCP サーバー: ルートの `.mcp.json`", "権限・フック・プラグイン: `.claude/settings.json`", "個人の上書き: `settings.local.json` や `~/.claude/`"]],
    ["Skills", ["`.claude/skills/<名前>/SKILL.md` に置く", "ふだんは `description` だけがコンテキストに入る", "以前のカスタムコマンドはスキルに統合された"]],
    ["サブエージェント", ["`.claude/agents/` に Markdown で定義", "`name` と `description` は必須。`tools` でツールを絞る", "独立したコンテキストで作業し、要約だけを返す"]],
    ["CI では `claude -p`（対話なしで実行）", ["`--output-format json` で結果と `session_id`", "`--allowedTools`: 確認なしで使えるツール", "`--tools`: 使える組み込みツールを絞る", "`--resume` にセッション ID を渡して再開"]],
  ].forEach(([t, b], i) => card(s, { x: M + (i % 2) * (w2 + 0.3), y: Y0 + Math.floor(i / 2) * (h + 0.2), w: w2, h, num: i + 1, title: t, body: b, bullet: true }));
}

{
  const s = contentSlide("評価セットで判断し、症状から切り分けて直す", "成功基準を数値で決め、変更のたびに同じ評価セットで測る");
  const lw = 5.75;
  card(s, { x: M, y: Y0, w: lw, h: 1.8, title: "良い評価セット", bullet: true, body: ["成功基準を先に、数値で決める", "代表的なケース＋エッジケース＋過去の失敗", "変更のたびに同じセットを再実行する"] });
  [
    ["コードで採点", "最速で確実。形式や完全一致など機械的に判定できるものはまずこれ"],
    ["LLM で採点", "正確さや丁寧さ。ルーブリックを与え、信頼性を確かめてから広げる"],
    ["人が採点", "柔軟で質は高いが、遅くコストがかかる"],
  ].forEach(([t, d], i) => {
    const y = Y0 + 2.0 + i * 0.97;
    box(s, { x: M, y, w: lw, h: 0.85, fill: C.background1, line: C.accent6, name: "Grader" });
    T(s, t, { x: M + 0.2, y, w: 1.8, h: 0.85, size: 14, bold: true, color: C.accent1, valign: "middle", name: "Grader name" });
    T(s, d, { x: M + 2.05, y: y + 0.06, w: lw - 2.25, h: 0.73, size: 14, valign: "middle", name: "Grader desc" });
  });
  const rx = M + lw + 0.35, rw = W - M - rx;
  T(s, "デバッグの切り分け", { x: rx, y: Y0, w: rw, h: 0.4, size: 16, bold: true, name: "Debug title" });
  [
    ["出力が途中で切れる", "`stop_reason` が `max_tokens` か確認。上限を上げるか出力を分ける"],
    ["400 エラー", "`invalid_request_error` は形式か内容の誤り。再試行せず直す"],
    ["ツールの直後にエラー", "`tool_result` の返し忘れを疑う。失敗時も `is_error: true` で"],
    ["原因を追う", "ログの `request-id`・モデル ID・`usage`・`stop_reason`"],
  ].forEach(([k, v], i) => {
    const y = Y0 + 0.55 + i * 1.08;
    box(s, { x: rx, y, w: rw, h: 0.95, fill: C.background2, name: "Debug row" });
    T(s, k, { x: rx + 0.2, y: y + 0.08, w: 2.35, h: 0.79, size: 14, bold: true, valign: "middle", name: "Debug key" });
    T(s, v, { x: rx + 2.65, y: y + 0.08, w: rw - 2.85, h: 0.79, size: 13, valign: "middle", name: "Debug val" });
  });
}

// =====================================================================
// 第9章（補講1）
divider(9, "補講1 開発の進め方と\nソフトウェア工学の基礎", "スキル 2.1・2.2・2.4（D2）＋ 5.2（D5）・ 配点 計19.7% ・ 音声 52:32〜", "要件の理解 ／ ライフサイクルとモデルの移行 ／ REST・JSON・SDK・非同期 ／ バージョン管理・レビュー・リファクタリング");

{
  const s = contentSlide("要件は「機能」と「インフラ」の両面から決める", "ビジネス要件とソリューションアーキテクチャから、2種類の要件を導く（スキル 2.1）");
  const w2 = (CW - 0.3) / 2, h = 2.55;
  card(s, { x: M, y: Y0, w: w2, h, title: "機能要件 ― 何をするか", titleColor: C.accent1, bullet: true, body: [
    "どんな入力を受け取り、何をどんな形式で返すか",
    "成功基準を、具体的で測れる形で決める（評価の出発点）",
  ] });
  card(s, { x: M + w2 + 0.3, y: Y0, w: w2, h, title: "インフラストラクチャ要件 ― どこで、どれだけ", titleColor: C.accent1, fill: C.background1, line: C.accent6, bullet: true, body: [
    "Claude API を直接使うか、クラウド経由か",
    "量はレート制限に収まるか",
    "データを保存しない取り決め（ZDR）が要るか",
    "すぐ応答が要るか、待てるか（待てる大量処理はバッチ）",
  ] });
  const steps = ["ビジネス要件", ["ソリューション", "アーキテクチャ"], ["機能要件と", "インフラ要件"], ["成功基準と", "評価セット"]];
  const y = 4.8, bh = 1.05, bw = 2.65, ag = (CW - 4 * bw) / 3;
  steps.forEach((t, i) => {
    const x = M + i * (bw + ag);
    box(s, { x, y, w: bw, h: bh, fill: i === 3 ? C.accent1 : C.background2, name: "Req step" });
    T(s, t, { x: x + 0.12, y, w: bw - 0.24, h: bh, size: 14, bold: true, color: i === 3 ? C.background1 : C.text1, align: "center", valign: "middle", name: "Req step text" });
    if (i < 3) arrow(s, x + bw + 0.06, y + bh / 2, x + bw + ag - 0.06, y + bh / 2);
  });
  T(s, "リアルタイムで呼ぶか、バッチで処理するかも、インフラの要件（急ぐか、量はどれだけか）で決まる", { x: M, y: 6.1, w: CW, h: 0.4, size: 12, color: C.accent4, name: "Req note" });
}

{
  const s = contentSlide("モデル ID は固定。提供終了の前に移行する", "ライフサイクル（開発・導入・運用・保守）の保守の中心は、モデルの入れ替え（スキル 2.2・5.3）");
  const stages = [["Active", "推奨"], ["Legacy", "更新されない"], ["Deprecated", "非推奨。終了日が決まる"], ["Retired", "リクエストは失敗する"]];
  const y = Y0, bh = 1.25, bw = 2.65, ag = (CW - 4 * bw) / 3;
  stages.forEach(([n, d], i) => {
    const x = M + i * (bw + ag);
    box(s, { x, y, w: bw, h: bh, fill: i === 3 ? C.background1 : C.background2, line: i === 3 ? C.accent2 : undefined, lineW: 1.75, name: "Stage" });
    T(s, n, { x: x + 0.18, y: y + 0.12, w: bw - 0.36, h: 0.42, size: 18, bold: true, color: i === 3 ? C.accent2 : C.accent1, name: "Stage name" });
    T(s, d, { x: x + 0.18, y: y + 0.58, w: bw - 0.36, h: 0.55, size: 12, name: "Stage desc" });
    if (i < 3) arrow(s, x + bw + 0.06, y + bh / 2, x + bw + ag - 0.06, y + bh / 2);
  });
  T(s, "モデル ID は固定された版を指す。公開モデルの提供終了は少なくとも60日前に通知。どこで使っているかは Console の使用量を API キー・モデル別に書き出して確かめる", { x: M, y: y + bh + 0.15, w: CW, h: 0.65, size: 12, color: C.accent4, name: "Lifecycle note" });
  const w2 = (CW - 0.3) / 2, cy = 4.25, ch = 2.55;
  card(s, { x: M, y: cy, w: w2, h: ch, title: "リリース間の互換性のない変化（例）", titleColor: C.accent2, fill: C.background1, line: C.accent2, bullet: true, body: [
    "プリフィルや `tool_choice` の強制指定が 400 になる",
    "`effort` の既定値が変わる（例: `high` → `medium`）",
    "トークナイザーの変更（トークン数が約3割増えた例）",
  ] });
  card(s, { x: M + w2 + 0.3, y: cy, w: w2, h: ch, title: "移行の進め方", bullet: true, body: [
    "公式の移行ガイドで、変わる点を確かめる",
    "後継モデルで評価セットを回し、品質とコストを測り直す",
    "提供終了日より前に切り替える",
  ] });
}

{
  const s = contentSlide("SDK は REST API を包み、面倒を引き受ける", "REST・JSON・非同期処理は Claude アプリの土台（スキル 2.4・5.2）");
  const w3 = (CW - 2 * 0.3) / 3, h = 2.55;
  card(s, { x: M, y: Y0, w: w3, h, num: 1, title: "REST と JSON", bullet: true, body: [
    "HTTP でやり取りする REST API",
    "`POST /v1/messages` に JSON を送り、JSON が返る",
  ] });
  card(s, { x: M + w3 + 0.3, y: Y0, w: w3, h, num: 2, title: "SDK が引き受けること", bullet: true, body: [
    "認証とバージョンのヘッダー",
    "型付きのリクエストとレスポンス",
    "再試行とエラー処理",
    "ストリーミング、タイムアウト",
  ] });
  card(s, { x: M + 2 * (w3 + 0.3), y: Y0, w: w3, h, num: 3, title: "非同期と並行", bullet: true, body: [
    "Python SDK の `AsyncAnthropic` で待ちの長い呼び出しを並行に",
    "急がない大量処理は Message Batches",
  ] });
  const w2 = (CW - 0.3) / 2, y = 4.7, bh = 1.45;
  [["SSE", ["Messages API のストリーミング", "サーバーから一方向に届く"]], ["WebSocket", ["一般に、つながったまま", "双方向にやり取りする通信方式", "（ブラウザとサーバーの間など）"]]].forEach(([t, d], i) => {
    const x = M + i * (w2 + 0.3);
    box(s, { x, y, w: w2, h: bh, fill: C.background1, line: C.accent6, name: "Proto" });
    T(s, t, { x: x + 0.22, y: y + 0.15, w: 1.9, h: bh - 0.3, size: 20, bold: true, color: C.accent1, valign: "middle", name: "Proto name" });
    T(s, d, { x: x + 2.15, y: y + 0.12, w: w2 - 2.35, h: bh - 0.24, size: 14, valign: "middle", name: "Proto desc" });
  });
  T(s, "どちらの場合も、API キーはブラウザに置かず、自社のサーバーから Claude を呼ぶ", { x: M, y: 6.3, w: CW, h: 0.4, size: 12, color: C.accent4, name: "Proto note" });
}

{
  const s = contentSlide("Claude Code を開発の流れに組み込む", "バージョン管理、SDLC、コードレビュー、リファクタリング（スキル 2.4）");
  const w2 = (CW - 0.3) / 2, h = 2.3;
  [
    ["バージョン管理", ["`CLAUDE.md`・`.claude/settings.json` をコミット", "プロンプトもコードと同じく管理する"]],
    ["SDLC への組み込み", ["GitHub Actions: `@claude` で変更やレビューを頼む", "CI やスクリプトからは `claude -p`"]],
    ["コードレビュー", ["`/code-review`: 手元でブランチの変更を調べる", "Code Review: PR ごとに自動でレビューする"]],
    ["リファクタリング", ["小: 振る舞いを保ち、小さな単位で、毎回テスト", "大: まずプランモードで計画し、承認してから進める", "調査はサブエージェント、並行作業は worktree"]],
  ].forEach(([t, b], i) => card(s, { x: M + (i % 2) * (w2 + 0.3), y: Y0 + Math.floor(i / 2) * (h + 0.2), w: w2, h, num: i + 1, title: t, body: b, bullet: true }));
}

// =====================================================================
// 第10章（補講2）
divider(10, "補講2 アプリケーション設計と\nLLM の基礎", "スキル 2.5（8.6%）・2.6（D2）＋ 5.1（D5）ほか ・ 音声 57:43〜", "インターフェースと指示 ／ スキーマ・セッション・プラグイン ／ 次トークン生成とモデルのオプション ／ 階層・承認・シークレット");

{
  const s = contentSlide("インターフェースで、Claude が受け取る指示は違う", "同じモデルでも、どこから使うかでシステムプロンプトが変わる（スキル 2.5）");
  const w4 = (CW - 3 * 0.3) / 4, h = 2.9;
  [
    ["claude.ai・モバイル", "Anthropic の system", "日付などを会話の最初に渡す。API には適用されない"],
    ["Claude API", "開発者が書く", "`system` パラメータに自分で書く"],
    ["Claude Code", "独自の system ＋ CLAUDE.md", "CLAUDE.md は文脈として読まれる。強制力はない"],
    ["Agent SDK", "既定は最小限", "`claude_code` プリセットで Claude Code と同じに。`claude -p` は既定で Claude Code のもの"],
  ].forEach(([who, what, d], i) => {
    const x = M + i * (w4 + 0.3);
    box(s, { x, y: Y0, w: w4, h, fill: C.background2, name: "Iface" });
    T(s, who, { x: x + 0.22, y: Y0 + 0.2, w: w4 - 0.44, h: 0.4, size: 15, bold: true, color: C.accent1, name: "Iface name" });
    T(s, what, { x: x + 0.22, y: Y0 + 0.68, w: w4 - 0.44, h: 0.62, size: 14, bold: true, color: C.accent4, name: "Iface what" });
    T(s, d, { x: x + 0.22, y: Y0 + 1.38, w: w4 - 0.44, h: h - 1.55, size: 14, name: "Iface desc" });
  });
  card(s, { x: M, y: 5.1, w: CW, h: 1.6, title: "コンテンツの境界", fill: C.background1, line: C.accent6, body: "指示とデータの境目をはっきりさせる。種類の違う内容は XML タグで区切り、外部から来たデータは `tool_result` で渡す" });
}

{
  const s = contentSlide("スキーマ・セッション・プラグインを管理する", "出力の形、会話の中身、拡張機能と依存関係を、設計の段階で決めておく（スキル 2.5・2.6）");
  const w2 = (CW - 0.3) / 2, h = 2.3;
  [
    ["スキーマ設計", ["JSON Schema の一部の機能だけに対応", "`additionalProperties: false` が必須", "返してほしいキーはすべて書き出す", "`minimum` や `maxLength` などの制約は 400"]],
    ["セッションの適切な管理", ["関係のない作業の前に `/clear`", "2回直して駄目なら `/clear` して指示を書き直す", "続けるなら `/compact` で残す内容を指定"]],
    ["プラグイン", ["スキル・サブエージェント・フック・MCP をまとめた単位", "`/plugin` で導入。範囲は user・project・local"]],
    ["依存関係とプロンプトの版", ["`plugin.json` の `dependencies` に範囲（`^2.0` など）", "固定しないと、依存先の更新で壊れうる", "プロンプトも版を管理し、モデルを替えたら見直す"]],
  ].forEach(([t, b], i) => card(s, { x: M + (i % 2) * (w2 + 0.3), y: Y0 + Math.floor(i / 2) * (h + 0.2), w: w2, h, num: i + 1, title: t, body: b, bullet: true }));
}

{
  const s = contentSlide("LLM は次のトークンを予測して1つずつ生成する", "選び方にはランダムさがあり、出力は完全には決定的にならない（スキル 5.1）");
  const steps = ["それまでの文脈", "次のトークンを予測", "1つ選ぶ（サンプリング）", "文脈に足して繰り返す"];
  const y = Y0, bh = 1.05, bw = 2.65, ag = (CW - 4 * bw) / 3;
  steps.forEach((t, i) => {
    const x = M + i * (bw + ag);
    box(s, { x, y, w: bw, h: bh, fill: i === 2 ? C.accent1 : C.background2, name: "Gen step" });
    T(s, t, { x: x + 0.12, y, w: bw - 0.24, h: bh, size: 14, bold: true, color: i === 2 ? C.background1 : C.text1, align: "center", valign: "middle", name: "Gen step text" });
    if (i < 3) arrow(s, x + bw + 0.06, y + bh / 2, x + bw + ag - 0.06, y + bh / 2);
  });
  trap(s, { x: M, y: 3.25, w: CW, h: 0.95 }, "`temperature` を 0 にしても完全には決定的にならない（公式の用語集）。品質は評価セットで測る");
  const w3 = (CW - 2 * 0.3) / 3, cy = 4.45, ch = 2.35;
  card(s, { x: M, y: cy, w: w3, h: ch, title: "高速モード", body: ["同じモデルを速い推論の設定で動かす", "出力の速さは最大2.5倍", "賢さは同じ。料金は割増"] });
  card(s, { x: M + w3 + 0.3, y: cy, w: w3, h: ch, title: "拡張思考", body: ["`budget_tokens` で思考量を固定する、以前の方式", "非推奨。Claude 4.7 以降は 400", "いまは adaptive thinking と effort"] });
  card(s, { x: M + 2 * (w3 + 0.3), y: cy, w: w3, h: ch, title: "プロンプトに入れる例の数", body: ["ゼロショット: 例を入れない", "シングルショット: 例を1つ", "マルチショット: 例を複数", "例の目安は3〜5個（第5章）"] });
}

{
  const s = contentSlide("ガイドの要素：階層・フレームワーク・承認・鍵", "第三者の要約から抜けやすい要素を押さえる（スキル 1.1・1.3・8.1・7.4）");
  const w2 = (CW - 0.3) / 2, h = 2.3;
  [
    ["マネージャー／スーパーバイザーの階層", ["リードが仕事を割り振り、結果をまとめる", "Claude Code: サブエージェントを3層まで入れ子に"]],
    ["エージェントのフレームワーク", ["ガイドの例: Strands、LangGraph、PydanticAI", "使うなら、中で送られるプロンプトと応答を把握する"]],
    ["ツールの承認のパターン", ["毎回人が確認する／許可したものだけ通す", "別のモデルが判定する（Claude Code の自動モード）", "Agent SDK は `canUseTool` でアプリが判断"]],
    ["シークレットとアクセスの管理", ["開発と本番でワークスペースとキーを分ける", "役割（User・Developer・Admin）で権限を絞る", "使用量を API キーとモデルごとに確かめる"]],
  ].forEach(([t, b], i) => card(s, { x: M + (i % 2) * (w2 + 0.3), y: Y0 + Math.floor(i / 2) * (h + 0.2), w: w2, h, num: i + 1, title: t, body: b, bullet: true }));
}

// =====================================================================
// まとめ
section("まとめ");
{
  const s = slide("CLOSING");
  s.addText("試験直前チェック10", { placeholder: "title" });
  const items = [
    "必須は `model`・`max_tokens`・`messages`。`system` はトップレベル。API はステートレスで履歴は毎回送る",
    "モデル ID は固定された版。提供終了の前に、後継を評価セットで測り直す",
    "`content` より先に `stop_reason`。`max_tokens` は途中切れ、`pause_turn` は再送で再開",
    "429・500・529 は指数バックオフで再試行。400・401 は直す",
    "`tool_use` には同じ ID の `tool_result` を次の user の先頭で返す。失敗も `is_error`",
    "キャッシュは tools → system → messages の完全一致。変わる値は後ろへ。最大4つ、TTL は5分か1時間",
    "急がない大量処理はバッチで約半額。結果は `custom_id` で突き合わせる",
    "迷ったら Opus から評価で。思考は adaptive と effort。`budget_tokens`・プリフィル・`temperature` 変更は不可",
    "シンプルに始める。手順が決まるならワークフロー。エージェントには止める条件",
    "外部データは `tool_result` で渡す。最小権限、取り消しにくい操作は人間が承認、強制はフックで",
  ];
  const colW = (CW - 0.5) / 2, rh = 1.0;
  items.forEach((t, i) => {
    const x = M + Math.floor(i / 5) * (colW + 0.5), y = 1.45 + (i % 5) * (rh + 0.06);
    bubble(s, x, y + 0.12, i + 1, { dark: true, size: 13 });
    T(s, t, { x: x + 0.6, y, w: colW - 0.6, h: rh, size: 14, color: C.background1, valign: "middle", name: "Check item" });
  });
}
{
  const s = slide("CLOSING");
  s.addText("次のステップ", { placeholder: "title" });
  const steps = [["音声で全体像をつかむ", "約66分。章ごとのミニクイズ付き"], ["問題集アプリで解く", "131問。模擬試験は本番と同じ53問・120分"], ["間違えた分野を復習する", "このスライドと解説で弱点を埋める"]];
  const bw = 3.45, gap = (CW - 3 * bw) / 2;
  steps.forEach(([t, d], i) => {
    const x = M + i * (bw + gap), y = 2.1;
    bubble(s, x + bw / 2 - 0.55, y, i + 1, { dark: true, filled: i === 1, w: 1.1, h: 1.5, size: 40, lineW: 2.5 });
    T(s, t, { x, y: y + 1.8, w: bw, h: 0.45, size: 20, bold: true, color: C.background1, align: "center", name: "Next title" });
    T(s, d, { x, y: y + 2.35, w: bw, h: 0.8, size: 14, color: C.accent5, align: "center", name: "Next desc" });
    if (i < 2) arrow(s, x + bw + 0.1, y + 0.75, x + bw + gap - 0.1, y + 0.75, { color: C.accent5, width: 2 });
  });
  T(s, "非公式の学習用教材です。試験の形式と配点は公式の試験ガイド v1.0（2026年7月発効）で確認しました。2026年12月7日に試験内容が更新される予定なので、それより後に受ける人は新しいガイドを確かめてください。", { x: M, y: 6.05, w: CW, h: 0.6, size: 12, color: C.accent5, name: "Disclaimer" });
}
// 補講の区切りは題名を2行にしているので、セクション名からは改行を除く（全スライドを足し終えてから直す）
pres.sections.forEach((sec) => { sec.title = sec.title.replace(/\n/g, " "); });
deck.save(OUT).catch((e) => { console.error(e); process.exit(1); });

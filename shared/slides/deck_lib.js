// キャッチアップ講座のスライド（pptx）を作るための共通部品。全試験で共用する。
// 見た目は「答案用紙」：印刷インクの青緑、マークシートの楕円、採点の赤ペン。
//
// 使い方（各試験の slides/build_deck.js から）:
//   const { createDeck } = require("../../shared/slides/deck_lib.js");
//   const deck = createDeck({ code: "CCDV-F", title: "CCDV-F キャッチアップ講座", subject: "…" });
//   const { pres, C, T, card, contentSlide, divider, ... } = deck;
//   …スライドを追加…
//   deck.save(出力.pptx);
//
// 文字のはみ出しは、追加のたびに文字幅から見積もって deck.warnings にためる（save が表示する）。
// 見積もりなので、最後は shared/slides/render.py で画像にして目で確かめる。
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const JSZip = require("jszip");

function createDeck({ code, title, subject = "", footer } = {}) {
  if (!code || !title) throw new Error("createDeck: code と title が必要です");
  const FONT = "Hiragino Sans";
  const MONO = "Menlo";
  const THEME = {
    name: `${code} Answer Sheet`,
    headFontFace: FONT,
    bodyFontFace: FONT,
    colors: {
      dk1: "1D2B2F", lt1: "FFFFFF", dk2: "0B4A50", lt2: "EAF3F2",
      accent1: "127A80", accent2: "D1432C", accent3: "E8A33D", accent4: "5E6E73",
      accent5: "8FC7C1", accent6: "C9DCDA", hlink: "127A80", folHlink: "5E6E73",
    },
  };
  const HEX = THEME.colors;

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
  pres.title = title;
  pres.subject = subject;
  const C = pres.SchemeColor;
  const SH = pres.shapes;

  const W = 13.333, M = 0.6, CW = W - 2 * M; // 12.133
  const Y0 = 1.95, YB = 6.8;

  // ---------- 文字幅の見積もり（はみ出し検出用） ----------
  const warnings = [];
  function emWidth(s) {
    let w = 0;
    for (const ch of String(s).replace(/`/g, "")) w += ch.codePointAt(0) >= 0x2000 ? 1 : 0.6;
    return w;
  }
  function estHeight(items, size, w, { lh = 1.5, after = 0, indent = 0 } = {}) {
    let lines = 0;
    for (const s of items) lines += Math.max(1, Math.ceil((emWidth(s) * size / 72 * 1.04) / (w - indent) - 1e-9));
    return (lines * size * lh) / 72 + (items.length - 1) * after / 72;
  }
  function check(label, items, size, w, h, opts) {
    const need = estHeight(items, size, w, opts);
    if (need > h + 0.02) warnings.push(`slide ${pres.slides.length}: 「${String(items[0]).slice(0, 18)}…」 needs ${need.toFixed(2)}in > ${h.toFixed(2)}in (${label})`);
    return need;
  }

  // ---------- テキスト ----------
  // `code` を Menlo の別ランにする。items は段落の配列。
  function runs(items, { codeColor, bullet, after, lineSpacingMultiple } = {}) {
    const out = [];
    items.forEach((s, i) => {
      const parts = String(s).split("`").map((t, k) => ({ t, code: k % 2 === 1 })).filter((p) => p.t.length);
      parts.forEach((p, j) => {
        const o = {};
        if (p.code) { o.fontFace = MONO; if (codeColor) o.color = codeColor; }
        if (bullet) o.bullet = { indent: 14 };
        if (after) o.paraSpaceAfter = after;
        if (lineSpacingMultiple) o.lineSpacingMultiple = lineSpacingMultiple;
        if (j === parts.length - 1 && i < items.length - 1) o.breakLine = true;
        out.push({ text: p.t, options: o });
      });
    });
    return out;
  }
  let nObj = 0;
  function T(slide, content, { x, y, w, h, size = 14, color = C.text1, bold = false, codeColor, bullet = false, after = 0, align = "left", valign = "top", name = "Text", noCheck = false }) {
    const items = Array.isArray(content) ? content : [content];
    if (!noCheck) check(name, items, size, w, h, { after, indent: bullet ? 0.25 : 0 });
    slide.addText(runs(items, { codeColor: codeColor || (color === C.background1 ? C.accent5 : C.accent1), bullet, after }), {
      x, y, w, h, fontSize: size, color, bold, align, valign, margin: 0, isTextBox: true, objectName: `${name} ${++nObj}`,
    });
  }

  // ---------- 図形 ----------
  function box(slide, { x, y, w, h, fill, line, lineW = 1.25, r = 0.12, dash, name = "Box" }) {
    slide.addShape(r ? SH.ROUNDED_RECTANGLE : SH.RECTANGLE, {
      x, y, w, h,
      fill: fill ? { color: fill } : { type: "none" },
      line: line ? { color: line, width: lineW, ...(dash ? { dashType: dash } : {}) } : { type: "none" },
      ...(r ? { rectRadius: r } : {}),
      objectName: `${name} ${++nObj}`,
    });
  }
  // マークシートの楕円（モチーフ）
  function bubble(slide, x, y, label, { w = 0.4, h = 0.54, size = 14, dark = false, filled = false, red = false, lineW = 1.5 } = {}) {
    const ink = red ? C.accent2 : dark ? C.accent5 : C.accent1;
    slide.addShape(SH.OVAL, {
      x, y, w, h,
      fill: filled ? { color: ink } : dark ? { type: "none" } : { color: C.background1 },
      line: { color: ink, width: lineW },
      objectName: `Bubble ${label} ${++nObj}`,
    });
    if (label !== "") {
      slide.addText(String(label), {
        x: x - 0.1, y, w: w + 0.2, h, fontSize: size, bold: true, align: "center", valign: "middle", margin: 0,
        color: filled ? (dark ? C.text2 : C.background1) : ink, isTextBox: true, objectName: `Bubble label ${label} ${++nObj}`,
      });
    }
  }
  function arrow(slide, x1, y1, x2, y2, { color = C.accent4, width = 1.75, head = true } = {}) {
    slide.addShape(SH.LINE, {
      x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
      flipH: x2 < x1, flipV: y2 < y1,
      line: { color, width, ...(head ? { endArrowType: "triangle" } : {}) },
      objectName: `Arrow ${++nObj}`,
    });
  }
  // 小さなラベル（ピル）
  function pill(slide, text, { x, y, w, h = 0.32, fill = C.accent1, color = C.background1, size = 12 }) {
    box(slide, { x, y, w, h, fill, r: h / 2, name: "Pill" });
    T(slide, text, { x, y, w, h, size, color, bold: true, align: "center", valign: "middle", name: "Pill text", noCheck: true });
  }

  // カード：見出し＋本文
  function card(slide, o) {
    const { x, y, w, h, title, body = [], fill = C.background2, line, titleColor = C.text1, titleSize = 16, size = 14, pad = 0.22, bullet = false, num, red = false, after = 4, codeTitle = false } = o;
    box(slide, { x, y, w, h, fill, line, name: `Card ${title || ""}`.slice(0, 40) });
    let tx = x + pad, tw = w - 2 * pad, ty = y + pad - 0.04;
    if (num !== undefined) {
      bubble(slide, tx, ty, num, { red, w: 0.36, h: 0.48, size: 13 });
      tx += 0.5; tw -= 0.5;
    }
    let th = 0;
    if (title) {
      th = Math.max(estHeight([title], titleSize, tw), num !== undefined ? 0.48 : 0);
      T(slide, title, { x: tx, y: ty, w: tw, h: th, size: titleSize, bold: true, color: titleColor, valign: num !== undefined ? "middle" : "top", name: "Card title" });
    }
    const items = Array.isArray(body) ? body : [body];
    if (items.length && items[0] !== "") {
      const by = ty + th + (title ? 0.1 : 0);
      const bx = x + pad;
      T(slide, items, { x: bx, y: by, w: w - 2 * pad, h: y + h - pad + 0.04 - by, size, bullet, after: bullet || items.length > 1 ? after : 0, name: "Card body" });
    }
  }
  // 赤ペンの「ここに注意」（まぎらわしい点、取り違えやすい点）
  function trap(slide, { x, y, w, h }, text) {
    box(slide, { x, y, w, h, fill: C.background1, line: C.accent2, lineW: 1.75, name: "Trap" });
    pill(slide, "ここに注意", { x: x + 0.25, y: y + (h - 0.34) / 2, w: 1.45, h: 0.34, fill: C.accent2 });
    T(slide, text, { x: x + 1.95, y: y + 0.14, w: w - 2.2, h: h - 0.28, size: 14, valign: "middle", name: "Trap text" });
  }
  // 大きな数字
  function stat(slide, { x, y, w, h, value, unit, label, sub }) {
    box(slide, { x, y, w, h, fill: C.background2, name: "Stat" });
    slide.addText([
      { text: value, options: { fontSize: 54, bold: true, color: C.accent1 } },
      { text: unit ? ` ${unit}` : "", options: { fontSize: 18, bold: true, color: C.accent1 } },
    ], { x: x + 0.25, y: y + 0.25, w: w - 0.5, h: 1.0, valign: "bottom", margin: 0, isTextBox: true, objectName: `Stat value ${++nObj}` });
    T(slide, label, { x: x + 0.25, y: y + 1.35, w: w - 0.5, h: 0.36, size: 16, bold: true, name: "Stat label" });
    if (sub) T(slide, sub, { x: x + 0.25, y: y + 1.78, w: w - 0.5, h: h - 2.0, size: 14, color: C.accent4, name: "Stat sub" });
  }

  // ---------- レイアウト ----------
  const FOOTER = footer || `${title} ・ 非公式の学習用教材`;
  pres.defineSlideMaster({
    title: "TITLE",
    background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 1.55, w: 8.0, h: 2.3, fontSize: 48, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "subtitle", type: "body", x: 0.8, y: 4.1, w: 8.0, h: 1.1, fontSize: 18, color: C.accent5, valign: "top", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "SECTION",
    background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 3.0, y: 2.05, w: 9.7, h: 1.25, fontSize: 40, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "meta", type: "body", x: 3.0, y: 3.5, w: 9.7, h: 0.45, fontSize: 16, color: C.accent5, valign: "top", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "topics", type: "body", x: 3.0, y: 4.25, w: 9.7, h: 1.3, fontSize: 18, color: C.background1, valign: "top", margin: 0 }, text: "" } },
      { text: { text: FOOTER, options: { x: M, y: 7.0, w: 7, h: 0.3, fontSize: 10, color: C.accent5, margin: 0 } } },
    ],
  });
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: C.background1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: M, y: 0.42, w: CW, h: 0.75, fontSize: 32, bold: true, color: C.text1, valign: "middle", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "lead", type: "body", x: M, y: 1.22, w: CW, h: 0.48, fontSize: 16, color: C.accent1, valign: "top", margin: 0 }, text: "" } },
      { text: { text: FOOTER, options: { x: M, y: 7.0, w: 7, h: 0.3, fontSize: 10, color: C.accent4, margin: 0 } } },
    ],
    slideNumber: { x: 12.23, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: C.accent4 },
  });
  pres.defineSlideMaster({
    title: "CLOSING",
    background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: M, y: 0.42, w: CW, h: 0.75, fontSize: 32, bold: true, color: C.background1, valign: "middle", align: "left", margin: 0 }, text: "" } },
      { text: { text: FOOTER, options: { x: M, y: 7.0, w: 7, h: 0.3, fontSize: 10, color: C.accent5, margin: 0 } } },
    ],
    slideNumber: { x: 12.23, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: C.accent5 },
  });

  let SECTION = "";
  function section(title) { SECTION = title; pres.addSection({ title }); }
  // マスター（"TITLE"・"CONTENT"・"SECTION"・"CLOSING"）を指定して、いまの章に1枚足す
  function slide(masterName) { return pres.addSlide({ masterName, sectionTitle: SECTION }); }
  function contentSlide(title, lead) {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: SECTION });
    check("title", [title], 32, CW, 0.75);
    s.addText(runs([title]), { placeholder: "title" });
    if (lead) {
      check("lead", [lead], 16, CW, 0.48);
      s.addText(runs([lead], { codeColor: C.accent1 }), { placeholder: "lead" });
    }
    return s;
  }
  function divider(num, title, meta, topics) {
    section(`${num}. ${title}`);
    const s = pres.addSlide({ masterName: "SECTION", sectionTitle: SECTION });
    bubble(s, 1.05, 2.05, num, { dark: true, w: 1.35, h: 1.9, size: 60, lineW: 3 });
    s.addText(runs([title]), { placeholder: "title" });
    s.addText(meta, { placeholder: "meta" });
    check("topics", [topics], 18, 9.7, 1.3);
    s.addText(runs([topics], { codeColor: C.accent5 }), { placeholder: "topics" });
    return s;
  }

  // ---------- 書き出し ----------
  // pptxgenjs は配色を Office 既定のまま書くので、テーマの配色・名前・日本語フォントを書き換える。
  async function save(out) {
    await pres.writeFile({ fileName: out });
    const zip = await JSZip.loadAsync(fs.readFileSync(out));
    const part = "ppt/theme/theme1.xml";
    let xml = await zip.file(part).async("string");
    const slots = ["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"];
    const scheme = `<a:clrScheme name="${THEME.name}">` + slots.map((k) => `<a:${k}><a:srgbClr val="${HEX[k]}"/></a:${k}>`).join("") + "</a:clrScheme>";
    xml = xml
      .replace(/<a:clrScheme\b[\s\S]*?<\/a:clrScheme>/, () => scheme)
      .replace(/(<a:(?:theme|fontScheme)\b[^>]*?\bname=")[^"]*"/g, (_, head) => `${head}${THEME.name}"`)
      .replace(/<a:ea typeface=""\/>/g, `<a:ea typeface="${FONT}"/>`)
      .replace(/<a:font script="Jpan" typeface="[^"]*"\/>/g, `<a:font script="Jpan" typeface="${FONT}"/>`);
    if (!xml.includes(scheme)) throw new Error("テーマの配色を書き換えられませんでした");
    zip.file(part, xml);
    for (const name of Object.keys(zip.files)) {
      if (zip.files[name].dir) { delete zip.files[name]; continue; } // フォルダだけの項目は不要
      if (!name.endsWith(".xml")) continue;
      const x = await zip.file(name).async("string");
      const bad = x.match(/<a:srgbClr val="((?![0-9A-Fa-f]{6}")[^"]*)"/);
      if (bad) throw new Error(`${name}: 色 "${bad[1]}" が16進6桁ではありません（グラフの色などには HEX.accent1 のような16進の値を渡す）`);
      if (x.includes('<c:crossesAt val="autoZero"/>')) zip.file(name, x.replaceAll('<c:crossesAt val="autoZero"/>', '<c:crosses val="autoZero"/>'));
    }
    fs.writeFileSync(out, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
    console.log(`${out}: ${pres.slides.length} slides`);
    if (warnings.length) { console.log("FIT WARNINGS:"); warnings.forEach((w) => console.log("  " + w)); }
    return { slides: pres.slides.length, warnings };
  }

  return {
    pres, C, SH, HEX, THEME, FONT, MONO, W, M, CW, Y0, YB, warnings,
    emWidth, estHeight, check, runs, T, box, bubble, arrow, pill, card, trap, stat,
    section, slide, contentSlide, divider, save,
  };
}

module.exports = { createDeck };

const bare = (text: string) => text.replace(/`|==/g, '');

/** 見た目の文字数（全角1、半角0.5）。記法の記号は数えない */
export const units = (text: string) => {
  let n = 0;
  for (const ch of bare(text)) {
    n += ch.charCodeAt(0) < 0x2000 ? 0.5 : 1;
  }
  return n;
};

/** 横幅の見積もり（px）。全角は size、半角は等幅なら 0.6、それ以外は 0.55 倍。certvideo.py の px_width と同じ式 */
export const pxWidth = (text: string, size: number, mono = false) => {
  let w = 0;
  for (const ch of bare(text)) {
    w += size * (ch.charCodeAt(0) < 0x2000 ? (mono ? 0.6 : 0.55) : 1);
  }
  return w;
};

/** box の幅で折り返したときの行数の見積もり */
export const wrappedLines = (text: string, size: number, box: number) => Math.max(1, Math.ceil((pxWidth(text, size) * 1.04) / box));

/** 本文に使える高さ（px）。見出しの下から字幕の上まで。lead があると1行ぶん狭い */
export const bodyRoom = (lead?: string) => (lead ? 590 : 647);
export const BODY_WIDTH = 1680;

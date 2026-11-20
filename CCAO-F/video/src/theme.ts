// 見た目の基準値。シリーズごとに色や書体を変えるときは、このファイルだけを直す。
// 題材は「答案用紙」: 印刷インクの青緑、鉛筆の黒、採点の赤ペン、蛍光ペンの黄。
export const theme = {
  color: {
    paper: '#F1F6F5', // 紙
    sheet: '#FFFFFF', // 用紙の白
    ink: '#1D2B2F', // 本文
    muted: '#56666B', // 補足
    print: '#127A80', // 印刷インク（罫線、設問番号、枠）
    printDeep: '#0B4A50',
    printSoft: '#DCEBE9',
    line: '#C4D8D6',
    graphite: '#2B3138', // 鉛筆で塗った部分
    pen: '#D1432C', // 採点の赤ペン（いちばん大事な1か所だけに使う）
    marker: '#F8D777', // 蛍光ペン
    codeBg: '#152126',
    codeInk: '#E4EDEE',
    codeDim: '#7F9599',
  },
  font: {
    display: '"Zen Kaku Gothic New", sans-serif',
    body: '"IBM Plex Sans JP", sans-serif',
    mono: '"IBM Plex Mono", "IBM Plex Sans JP", monospace',
  },
  // 画面の割り付け（1920×1080）
  layout: {
    margin: 120,
    header: 84,
    caption: 150,
  },
} as const;

import React from 'react';
import {theme} from './theme';

const c = theme.color;

/**
 * 文中の `コード` を等幅に、==強調== を蛍光ペンに、\n を改行にする。
 * 台本の表示用の文（見出し、説明、字幕）はすべてこの記法が使える。
 */
export const Rich: React.FC<{children: string; onDark?: boolean; plainCode?: boolean}> = ({children, onDark, plainCode}) => {
  const parts = children.split(/(`[^`]+`|==[^=]+==|\n)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('`')) {
          return (
            <code
              key={i}
              style={{
                fontFamily: theme.font.mono,
                fontWeight: 600,
                fontSize: '0.9em',
                color: plainCode ? 'inherit' : onDark ? c.marker : c.printDeep,
                backgroundColor: onDark || plainCode ? 'transparent' : c.printSoft,
                padding: onDark || plainCode ? 0 : '0.04em 0.28em',
                margin: '0 0.1em',
                borderRadius: 6,
              }}
            >
              {p.slice(1, -1)}
            </code>
          );
        }
        if (p === '\n') {
          return <br key={i} />;
        }
        if (p.startsWith('==')) {
          return (
            <mark
              key={i}
              style={{
                color: 'inherit',
                fontWeight: 700,
                background: `linear-gradient(transparent 56%, ${c.marker} 56%)`,
                padding: '0 0.08em',
              }}
            >
              {p.slice(2, -2)}
            </mark>
          );
        }
        return <React.Fragment key={i}>{p}</React.Fragment>;
      })}
    </>
  );
};

/**
 * マークシートの楕円。fill（0→1）で、鉛筆で左から塗りつぶされる。
 * 進行状況、箇条書きの印、クイズの選択肢で共通して使う。
 */
export const Oval: React.FC<{
  w: number;
  h: number;
  fill?: number;
  label?: string;
  stroke?: number;
  color?: string;
  fontSize?: number;
}> = ({w, h, fill = 0, label, stroke = 3, color = c.print, fontSize}) => (
  <div
    style={{
      position: 'relative',
      width: w,
      height: h,
      flex: 'none',
      borderRadius: '50%',
      border: `${stroke}px solid ${color}`,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: theme.font.mono,
      fontWeight: 600,
      fontSize: fontSize ?? Math.round(h * 0.58),
      lineHeight: 1,
      color,
      overflow: 'hidden',
    }}
  >
    {label}
    {fill > 0 ? (
      <div
        style={{
          position: 'absolute',
          inset: -stroke,
          borderRadius: '50%',
          // 鉛筆の筆跡に見えるよう、斜めのむらを入れる
          background: `repeating-linear-gradient(112deg, ${c.graphite} 0 6px, #3B434B 6px 8px)`,
          clipPath: `inset(0 ${Math.max(0, 100 - fill * 100)}% 0 0)`,
        }}
      />
    ) : null}
  </div>
);

// 赤ペンの線は、いつも全体を描いておき、見える範囲を広げて「書いている」ように見せる。
// （線を破線にして伸ばす方法は、縦横の比率が変わる SVG では線が途切れる）
const penStroke = (widthPx: number): React.SVGProps<SVGPathElement> => ({
  fill: 'none',
  stroke: c.pen,
  strokeWidth: widthPx,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
});

const wipe = (progress: number, bleed: number): React.CSSProperties => ({
  clipPath: `inset(-${bleed}px ${(1 - progress) * 100}% -${bleed}px -${bleed}px)`,
});

/** 赤ペンの下線。親要素（position: relative）の下端に重ねる */
export const PenUnderline: React.FC<{progress: number; offset?: number; width?: number}> = ({progress, offset = 8, width = 6}) =>
  progress > 0 ? (
    <svg
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      style={{position: 'absolute', left: -6, bottom: -offset - 10, width: 'calc(100% + 12px)', height: 16, overflow: 'visible', ...wipe(progress, width * 2)}}
    >
      <path d="M1,6 C22,2 41,8 60,5 S90,3 99,6" {...penStroke(width)} />
    </svg>
  ) : null;

/** 赤ペンの丸（正解の印）。親要素（position: relative）を囲むように重ねる。上から時計回りに書く */
export const PenCircle: React.FC<{progress: number; pad?: number; width?: number}> = ({progress, pad = 16, width = 7}) => {
  if (progress <= 0) {
    return null;
  }
  const sweep = `conic-gradient(from 5deg, #000 ${progress * 360}deg, transparent ${progress * 360}deg)`;
  return (
    <div
      style={{
        position: 'absolute',
        left: -pad - width,
        top: -pad - width,
        width: `calc(100% + ${(pad + width) * 2}px)`,
        height: `calc(100% + ${(pad + width) * 2}px)`,
        padding: width,
        boxSizing: 'border-box',
        maskImage: progress >= 1 ? 'none' : sweep,
        WebkitMaskImage: progress >= 1 ? 'none' : sweep,
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{display: 'block', width: '100%', height: '100%', overflow: 'visible'}}>
        <path d="M58,5 C83,4 98,22 96,47 C94,74 80,94 52,95 C26,96 5,80 4,50 C3,22 24,2 48,8" {...penStroke(width)} />
      </svg>
    </div>
  );
};

/** 赤ペンのチェック */
export const PenCheck: React.FC<{progress: number; size?: number}> = ({progress, size = 44}) => (
  <svg viewBox="0 0 32 28" style={{width: size, height: size * 0.875, flex: 'none', overflow: 'visible', ...wipe(progress, 12), opacity: progress > 0 ? 1 : 0}}>
    <path d="M4,15 L12,23 L28,4" {...penStroke(Math.max(5, size / 8))} />
  </svg>
);

/** 場面の見出し。1場面につき伝えることは1つ */
export const Heading: React.FC<{heading: string; lead?: string}> = ({heading, lead}) => (
  <div style={{flex: 'none', marginBottom: 34}}>
    <h1
      style={{
        margin: 0,
        fontFamily: theme.font.display,
        fontWeight: 900,
        fontSize: 68,
        lineHeight: 1.25,
        letterSpacing: '0.01em',
      }}
    >
      <Rich>{heading}</Rich>
    </h1>
    {lead ? (
      <p style={{margin: '8px 0 0', fontSize: 34, lineHeight: 1.45, color: c.muted, fontWeight: 500}}>
        <Rich>{lead}</Rich>
      </p>
    ) : null}
  </div>
);

/** 解答用紙の一部分。タイトルとサムネイルで、題材を一目で伝えるために使う */
export const AnswerSheet: React.FC<{rows: number; filled: (row: number) => number; scale?: number}> = ({rows, filled, scale = 1}) => {
  const letters = ['A', 'B', 'C', 'D'];
  // 行ごとに塗る位置を変える（毎回同じ並びになるよう、乱数は使わない）
  const picks = [1, 3, 0, 2, 1, 0, 3, 2];
  return (
    <div
      style={{
        width: 470 * scale,
        backgroundColor: c.sheet,
        border: `${3 * scale}px solid ${c.print}`,
        padding: `${26 * scale}px ${30 * scale}px ${26 * scale}px ${54 * scale}px`,
        position: 'relative',
        boxShadow: `${10 * scale}px ${14 * scale}px 0 ${c.printSoft}`,
      }}
    >
      {/* 読み取り機が位置を合わせるための黒い目印 */}
      <div style={{position: 'absolute', left: 14 * scale, top: 30 * scale, bottom: 30 * scale, width: 14 * scale, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        {Array.from({length: rows}).map((_, i) => (
          <div key={i} style={{height: 12 * scale, backgroundColor: c.ink}} />
        ))}
      </div>
      {Array.from({length: rows}).map((_, r) => (
        <div
          key={r}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16 * scale,
            padding: `${13 * scale}px 0`,
            borderTop: r === 0 ? 'none' : `${2 * scale}px solid ${c.printSoft}`,
          }}
        >
          <span style={{width: 44 * scale, fontFamily: theme.font.mono, fontWeight: 600, fontSize: 30 * scale, color: c.print, textAlign: 'right'}}>{r + 1}</span>
          {letters.map((l, i) => (
            <Oval key={l} w={68 * scale} h={40 * scale} stroke={3 * scale} label={l} fill={i === picks[r % picks.length] ? filled(r) : 0} />
          ))}
        </div>
      ))}
    </div>
  );
};

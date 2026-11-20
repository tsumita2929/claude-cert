import React from 'react';
import {Heading, Rich} from '../parts';
import {theme} from '../theme';
import {useSteps} from '../timing';
import {pxWidth} from '../util';

const c = theme.color;

type Row = {label: string; desc?: string; mono?: boolean};
type Column = {title: string; items: Row[]; tone?: 'plain' | 'ng'};

const COLUMN_INNER = 758;
const BIG = {title: 46, label: 46, mono: 42, desc: 36, padY: 28};
const NORMAL = {title: 40, label: 38, mono: 34, desc: 30, padY: 16};

/**
 * 2つを並べて比べる場面（する／しない、A方式／B方式）。
 * step 1 で左、step 2 で右の中身が出る。枠と見出しは最初から見せる。
 * 右を「してはいけない側」にするときだけ tone: "ng" を付けて赤にする。
 */
export const Compare: React.FC<{heading: string; lead?: string; left: Column; right: Column}> = ({heading, lead, left, right}) => {
  const {enter} = useSteps();
  const rows = [...left.items, ...right.items];
  // 各列2項目までで、どの行も1行に収まるなら大きく組む
  const roomy =
    Math.max(left.items.length, right.items.length) <= 2 &&
    rows.every((r) => pxWidth(r.label, r.mono ? BIG.mono : BIG.label, r.mono) <= COLUMN_INNER && pxWidth(r.desc ?? '', BIG.desc) * 1.04 <= COLUMN_INNER);
  const size = roomy ? BIG : NORMAL;

  return (
    <>
      <Heading heading={heading} lead={lead} />
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40}}>
        {[left, right].map((col, side) => {
          const tone = col.tone === 'ng' ? c.pen : side === 0 ? c.print : c.printDeep;
          const p = enter(side + 1);
          return (
            <div key={side} style={{border: `3px solid ${tone}`, backgroundColor: c.sheet}}>
              <div style={{backgroundColor: tone, color: '#fff', fontFamily: theme.font.display, fontWeight: 700, fontSize: size.title, lineHeight: 1.3, padding: '12px 28px'}}>{col.title}</div>
              <div style={{opacity: p}}>
                {col.items.map((it, i) => (
                  <div key={i} style={{padding: `${size.padY}px 28px`, borderTop: i === 0 ? 'none' : `2px solid ${c.line}`}}>
                    <div
                      style={{
                        fontFamily: it.mono ? theme.font.mono : theme.font.display,
                        fontWeight: it.mono ? 600 : 700,
                        fontSize: it.mono ? size.mono : size.label,
                        lineHeight: 1.35,
                        color: it.mono ? c.printDeep : c.ink,
                      }}
                    >
                      {it.label}
                    </div>
                    {it.desc ? (
                      <div style={{fontSize: size.desc, lineHeight: 1.45, color: c.muted, marginTop: 2}}>
                        <Rich>{it.desc}</Rich>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

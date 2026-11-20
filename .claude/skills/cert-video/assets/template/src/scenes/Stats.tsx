import React from 'react';
import {Heading, PenUnderline, Rich} from '../parts';
import {theme} from '../theme';
import {useMark, useSteps} from '../timing';

const c = theme.color;

type Stat = {value: string | number; unit?: string; label: string; note?: string};

/**
 * 数字で伝える場面（問題数、試験時間、合格点など）。答案用紙の記入欄の形にする。
 * step k で k 番目までの欄に数字が入る。mark に欄の番号（0始まり）を書くと、数字に赤ペンの下線を引く。
 */
export const Stats: React.FC<{heading: string; lead?: string; items: Stat[]}> = ({heading, lead, items}) => {
  const {enter} = useSteps();
  const mark = useMark();
  const n = items.length;
  const valueSize = n <= 2 ? 176 : n === 3 ? 150 : 112;

  return (
    <>
      <Heading heading={heading} lead={lead} />
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 36, marginTop: 26}}>
        {items.map((it, i) => {
          const p = enter(i + 1);
          return (
            <div key={i} style={{position: 'relative', border: `3px solid ${c.print}`, backgroundColor: c.sheet, padding: '48px 30px 30px', minHeight: 300}}>
              <span
                style={{
                  position: 'absolute',
                  top: -24,
                  left: 20,
                  backgroundColor: c.paper,
                  padding: '0 12px',
                  fontFamily: theme.font.display,
                  fontWeight: 700,
                  fontSize: 32,
                  lineHeight: 1.4,
                  color: c.print,
                }}
              >
                {it.label}
              </span>
              <div style={{opacity: p}}>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
                  <span style={{position: 'relative', fontFamily: theme.font.display, fontWeight: 900, fontSize: valueSize, lineHeight: 1.1, color: c.graphite}}>
                    {it.value}
                    <PenUnderline progress={mark(i)} offset={2} width={8} />
                  </span>
                  {it.unit ? <span style={{fontFamily: theme.font.display, fontWeight: 700, fontSize: 44}}>{it.unit}</span> : null}
                </div>
                {it.note ? (
                  <p style={{margin: '22px 0 0', fontSize: 28, lineHeight: 1.5, color: c.muted}}>
                    <Rich>{it.note}</Rich>
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

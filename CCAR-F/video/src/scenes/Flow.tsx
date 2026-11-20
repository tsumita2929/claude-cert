import React from 'react';
import {Heading, Rich} from '../parts';
import {theme} from '../theme';
import {useSteps} from '../timing';

const c = theme.color;

type Node = {label: string; desc?: string; mono?: boolean};

// 箱の数ごとの組み方。箱が少ないほど大きくする。certvideo.py の文字数の上限はこの大きさに合わせてある
const SIZES: Record<number, {box: number; label: number; mono: number; desc: number}> = {
  3: {box: 132, label: 46, mono: 42, desc: 34},
  4: {box: 112, label: 36, mono: 32, desc: 30},
  5: {box: 96, label: 28, mono: 24, desc: 26},
};

/**
 * 順番に進むものを左から右へ並べる場面（処理の流れ、イベントの順序）。
 * step k で k 番目の箱までが出て、k 番目の箱が塗られる。順序のない一覧には points を使う。
 */
export const Flow: React.FC<{heading: string; lead?: string; nodes: Node[]}> = ({heading, lead, nodes}) => {
  const {enter, step} = useSteps();
  const size = SIZES[Math.min(5, Math.max(3, nodes.length))];
  return (
    <>
      <Heading heading={heading} lead={lead} />
      {/* 図は残りの高さの中央より少し上に置く */}
      <div style={{flex: 1, display: 'flex', alignItems: 'center', paddingBottom: 70}}>
        <div style={{display: 'flex', alignItems: 'flex-start', width: '100%'}}>
          {nodes.map((nd, i) => {
            const p = enter(i + 1);
            const current = step === i + 1;
            return (
              <React.Fragment key={i}>
                {i > 0 ? (
                  <svg viewBox="0 0 56 96" style={{width: 56, height: size.box, flex: 'none', opacity: p}}>
                    <path d="M6,48 H44 M32,34 L46,48 L32,62" fill="none" stroke={c.print} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
                <div style={{flex: 1, minWidth: 0, opacity: p}}>
                  <div
                    style={{
                      height: size.box,
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      border: `3px solid ${c.print}`,
                      backgroundColor: current ? c.print : c.sheet,
                      color: current ? '#fff' : nd.mono ? c.printDeep : c.ink,
                      fontFamily: nd.mono ? theme.font.mono : theme.font.display,
                      fontWeight: nd.mono ? 600 : 700,
                      fontSize: nd.mono ? size.mono : size.label,
                      lineHeight: 1.25,
                      padding: '0 10px',
                    }}
                  >
                    {nd.label}
                  </div>
                  {nd.desc ? (
                    <p style={{margin: '20px 4px 0', fontSize: size.desc, lineHeight: 1.5, color: c.ink}}>
                      <Rich>{nd.desc}</Rich>
                    </p>
                  ) : null}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

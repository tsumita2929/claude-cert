import React from 'react';
import {interpolate} from 'remotion';
import {Heading, PenCheck, Rich} from '../parts';
import {theme} from '../theme';
import {useSteps} from '../timing';

const c = theme.color;

/**
 * 動画の最後のまとめ。step k で k 番目までの項目に赤ペンのチェックが入る。
 * next を書くと、最後に次回の予告を出す（最後の step の次の段階で出る）。
 */
export const Summary: React.FC<{heading?: string; lead?: string; items: string[]; next?: string}> = ({heading = '今回のまとめ', lead, items, next}) => {
  const {enter, since} = useSteps();
  const big = items.length <= 3;
  return (
    <>
      <Heading heading={heading} lead={lead} />
      <div>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 34,
              padding: big ? '34px 0 34px 12px' : '22px 0 22px 12px',
              borderTop: `2px solid ${c.line}`,
              borderBottom: i === items.length - 1 ? `2px solid ${c.line}` : 'none',
            }}
          >
            <PenCheck size={big ? 56 : 44} progress={interpolate(since(i + 1), [0, 9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
            <div style={{fontFamily: theme.font.display, fontWeight: 700, fontSize: big ? 54 : 44, lineHeight: 1.4, opacity: 0.35 + 0.65 * enter(i + 1)}}>
              <Rich>{it}</Rich>
            </div>
          </div>
        ))}
      </div>
      {next ? (
        <div style={{marginTop: 44, display: 'flex', alignItems: 'center', gap: 26, opacity: enter(items.length + 1)}}>
          <span style={{backgroundColor: c.print, color: '#fff', fontFamily: theme.font.display, fontWeight: 700, fontSize: 34, lineHeight: 1.6, padding: '0 20px'}}>次回</span>
          <span style={{fontSize: 44, fontWeight: 500}}>
            <Rich>{next}</Rich>
          </span>
        </div>
      ) : null}
    </>
  );
};

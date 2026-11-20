import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {AnswerSheet, Oval} from '../parts';
import {theme} from '../theme';
import {useScene} from '../timing';
import {units} from '../util';

const c = theme.color;

/**
 * 動画の冒頭。題名は最初のコマから出しておき、動きは「解答用紙が鉛筆で塗られていく」1つだけにする。
 * 表示する文字はすべて台本のトップレベル（series / number / of / title / subtitle）から取る。
 */
export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const {meta} = useScene();
  const u = units(meta.title);
  const size = u <= 8 ? 140 : u <= 13 ? 116 : 94;
  const pencil = (start: number, length = 9) => interpolate(frame, [start, start + length], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const total = meta.of && meta.of <= 12 ? meta.of : 0;

  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: `0 ${theme.layout.margin}px`}}>
      <div style={{width: 1130}}>
        <div style={{fontFamily: theme.font.display, fontWeight: 700, fontSize: 40, color: c.print}}>{meta.series}</div>
        {meta.number ? (
          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 18}}>
            <span style={{fontFamily: theme.font.display, fontWeight: 700, fontSize: 40}}>第{meta.number}回</span>
            {total ? (
              <div style={{display: 'flex', gap: 10}}>
                {Array.from({length: total}).map((_, i) => (
                  <Oval key={i} w={50} h={30} stroke={2.5} label={String(i + 1)} fill={i + 1 < meta.number! ? 1 : i + 1 === meta.number ? pencil(14, 12) : 0} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        {/* 2行に折れる題名は、行の長さをそろえる（「見える／化」のように、最後の1〜2字だけが落ちるのを防ぐ） */}
        <h1 style={{margin: '34px 0 0', fontFamily: theme.font.display, fontWeight: 900, fontSize: size, lineHeight: 1.2, letterSpacing: '0.005em', textWrap: 'balance'} as React.CSSProperties}>{meta.title}</h1>
        {meta.subtitle ? <p style={{margin: '30px 0 0', fontSize: 44, lineHeight: 1.5, fontWeight: 500, color: c.muted}}>{meta.subtitle}</p> : null}
      </div>

      <div style={{position: 'absolute', right: 150, top: '50%', transform: 'translateY(-50%) rotate(3deg)'}}>
        <AnswerSheet rows={6} filled={(row) => pencil(8 + row * 8)} />
      </div>

      {meta.disclaimer ? (
        <div style={{position: 'absolute', left: theme.layout.margin, bottom: 44, display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: c.muted}}>
          <span style={{width: 14, height: 14, backgroundColor: c.print}} />
          {meta.disclaimer}
        </div>
      ) : null}
    </div>
  );
};

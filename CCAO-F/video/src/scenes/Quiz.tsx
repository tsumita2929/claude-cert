import React from 'react';
import {interpolate, useVideoConfig} from 'remotion';
import {Oval, PenCircle, Rich} from '../parts';
import {theme} from '../theme';
import {useSteps} from '../timing';

const c = theme.color;
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

/**
 * ミニクイズ。この動画の見せ場。
 *   step 1: 選択肢を出す
 *   step 2: 考える時間（台本では {"wait": 5, "step": 2}）。1秒ごとに楕円が塗られる
 *   step 3: 正解の楕円を鉛筆で塗り、赤ペンで丸を付ける
 *   step 4: 解説を出す（step 4 の行がなければ、step 3 と同時に出す）
 */
export const Quiz: React.FC<{question: string; options: string[]; answer: number | number[]; explain?: string; label?: string}> = ({
  question,
  options,
  answer,
  explain,
  label = 'ミニクイズ',
}) => {
  const {frame, enter, since, event, reachedAt} = useSteps();
  const {fps} = useVideoConfig();
  const answers = Array.isArray(answer) ? answer : [answer];
  const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
  const think = event(2);
  const seconds = think ? Math.max(1, Math.round(think.duration / fps)) : 0;
  const revealed = since(3) >= 0;
  const pencil = interpolate(since(3), [0, 10], [0, 1], clamp);
  const circle = interpolate(since(3), [8, 24], [0, 1], clamp);
  const fade = interpolate(since(3), [0, 10], [1, 0.36], clamp);
  const explainAt = reachedAt(4) === Infinity ? 3 : 4;
  // 選択肢が4つまでなら大きく組む。5つのときは解説まで収まるように詰める
  const size = options.length >= 5 ? {q: 44, opt: 36, pad: 10, oval: 72, explain: 32} : {q: 50, opt: 42, pad: 19, oval: 84, explain: 38};

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', gap: 28, height: 56, flex: 'none'}}>
        <span style={{border: `3px solid ${c.print}`, color: c.print, fontFamily: theme.font.display, fontWeight: 700, fontSize: 30, lineHeight: 1.5, padding: '0 18px'}}>{label}</span>
        {think && frame >= think.at && !revealed ? (
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto'}}>
            <span style={{fontSize: 28, color: c.muted, marginRight: 8}}>考える時間</span>
            {Array.from({length: seconds}).map((_, i) => (
              <Oval key={i} w={50} h={30} stroke={2.5} fill={interpolate(frame, [think.at + i * fps, think.at + (i + 1) * fps], [0, 1], clamp)} />
            ))}
          </div>
        ) : null}
      </div>

      <h1 style={{margin: '20px 0 26px', fontFamily: theme.font.display, fontWeight: 700, fontSize: size.q, lineHeight: 1.45, flex: 'none'}}>
        <Rich>{question}</Rich>
      </h1>

      <div style={{opacity: enter(1), flex: 'none'}}>
        {options.map((opt, i) => {
          const right = answers.includes(i);
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 30,
                padding: `${size.pad}px 0 ${size.pad}px 22px`,
                borderTop: `2px solid ${c.line}`,
                borderBottom: i === options.length - 1 ? `2px solid ${c.line}` : 'none',
                opacity: revealed && !right ? fade : 1,
              }}
            >
              <div style={{position: 'relative', flex: 'none'}}>
                <Oval w={size.oval} h={Math.round(size.oval * 0.58)} label={LETTERS[i]} fill={right ? pencil : 0} />
                {right ? <PenCircle progress={circle} pad={size.pad > 12 ? 13 : 8} /> : null}
              </div>
              <div style={{fontSize: size.opt, lineHeight: 1.4, fontWeight: revealed && right ? 700 : 500}}>
                <Rich>{opt}</Rich>
              </div>
            </div>
          );
        })}
      </div>

      {explain ? (
        <div style={{marginTop: 24, display: 'flex', gap: 24, alignItems: 'baseline', opacity: enter(explainAt), flex: 'none'}}>
          <span style={{fontFamily: theme.font.display, fontWeight: 700, fontSize: size.explain - 4, color: c.print, flex: 'none'}}>解説</span>
          <p style={{margin: 0, fontSize: size.explain, lineHeight: 1.45}}>
            <Rich>{explain}</Rich>
          </p>
        </div>
      ) : null}
    </>
  );
};

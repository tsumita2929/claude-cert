import React from 'react';
import {Heading, Oval, PenUnderline, Rich} from '../parts';
import {theme} from '../theme';
import {useMark, useSteps} from '../timing';
import {BODY_WIDTH, bodyRoom, pxWidth, wrappedLines} from '../util';

const c = theme.color;

type Item = {label: string; desc?: string; mono?: boolean};

// 文字の大きさの候補（大きい順）。画面に収まるいちばん大きい組み方を選び、下半分を空けない。
// certvideo.py の検査も同じ表で「いちばん小さい組み方なら収まるか」を見ている。
const TIERS = [
  {label: 66, mono: 58, desc: 50, pad: 50, oval: 74, upTo: 2}, // 2項目までのときだけ使う
  {label: 56, mono: 50, desc: 44, pad: 36, oval: 64},
  {label: 46, mono: 40, desc: 36, pad: 23, oval: 56},
  {label: 44, mono: 38, desc: 34, pad: 15, oval: 52},
];

const measure = (items: Item[], t: (typeof TIERS)[number]) => {
  const widest = Math.max(...items.map((it) => pxWidth(it.label, it.mono ? t.mono : t.label, it.mono) + 34));
  const labelCol = Math.min(680, Math.max(200, Math.round(widest)));
  const descCol = BODY_WIDTH - t.oval - 34 - labelCol - 34;
  const rows = items.map((it) => (it.desc ? wrappedLines(it.desc, t.desc, descCol) : 1));
  const height = items.reduce((sum, _it, i) => sum + Math.max(rows[i] * t.desc * 1.5, t.label * 1.3) + t.pad * 2 + 2, 0);
  return {labelCol, height, fitsLabel: widest <= 680, oneLine: rows.every((r) => r === 1)};
};

/**
 * 要点の一覧（用語と説明の表）。
 * step k で k 番目までの行が埋まる。罫線と空の楕円は最初から見せて、いくつ説明があるかを先に伝える。
 * mark に行の番号（0始まり）を書くと、その行の用語に赤ペンの下線を引く。
 */
export const Points: React.FC<{heading: string; lead?: string; items: Item[]; ordered?: boolean}> = ({heading, lead, items, ordered}) => {
  const {enter} = useSteps();
  const mark = useMark();
  const room = bodyRoom(lead);
  const size =
    TIERS.find((t) => {
      const m = measure(items, t);
      // いちばん大きい組み方は、2項目までで、説明がどれも1行に収まるときだけ
      if ('upTo' in t && (items.length > (t.upTo as number) || !m.oneLine)) {
        return false;
      }
      return m.fitsLabel && m.height <= room;
    }) ?? TIERS[TIERS.length - 1];
  const {labelCol} = measure(items, size);

  return (
    <>
      <Heading heading={heading} lead={lead} />
      <div>
        {items.map((it, i) => {
          const p = enter(i + 1);
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 34,
                padding: `${size.pad}px 0`,
                borderTop: `2px solid ${c.line}`,
                borderBottom: i === items.length - 1 ? `2px solid ${c.line}` : 'none',
              }}
            >
              <Oval w={size.oval} h={Math.round(size.oval * 0.59)} fill={p} label={ordered ? String(i + 1) : undefined} />
              <div style={{width: labelCol, flex: 'none', opacity: p}}>
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    fontFamily: it.mono ? theme.font.mono : theme.font.display,
                    fontWeight: it.mono ? 600 : 700,
                    fontSize: it.mono ? size.mono : size.label,
                    lineHeight: 1.3,
                    color: it.mono ? c.printDeep : c.ink,
                  }}
                >
                  {it.label}
                  <PenUnderline progress={mark(i)} />
                </span>
              </div>
              <div style={{flex: 1, fontSize: size.desc, lineHeight: 1.5, opacity: p, minHeight: size.desc * 1.5}}>{it.desc ? <Rich>{it.desc}</Rich> : null}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

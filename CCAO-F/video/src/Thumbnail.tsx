import React from 'react';
import {AbsoluteFill} from 'remotion';
import type {LectureProps} from './Lecture';
import {AnswerSheet, PenUnderline} from './parts';
import {theme} from './theme';
import {units} from './util';

const c = theme.color;

/**
 * YouTube のサムネイル（1280×720）。小さく表示されても読めるよう、大きな文字は1つだけにする。
 * 台本の thumbnail.headline（2行まで、1行は全角6字まで。`\n` で改行）と thumbnail.sub を使う。なければ題名と副題。
 * 右側の解答用紙は x=775 あたりから始まるので、文字は幅 670px までに収める。
 */
export const Thumbnail: React.FC<LectureProps> = ({timeline}) => {
  if (!timeline) {
    return <AbsoluteFill style={{backgroundColor: c.paper}} />;
  }
  const {meta} = timeline;
  const headline = meta.thumbnail?.headline ?? meta.title;
  const rows = headline.split('\n');
  const widest = Math.max(...rows.map(units));
  const size = Math.min(165, Math.floor(670 / Math.max(widest, 4)));
  const sub = meta.thumbnail?.sub ?? meta.subtitle;

  return (
    <AbsoluteFill lang="ja" style={{backgroundColor: c.paper, color: c.ink, fontFamily: theme.font.body, overflow: 'hidden', wordBreak: 'auto-phrase'} as React.CSSProperties}>
      <div style={{position: 'absolute', right: -70, top: 86, transform: 'rotate(5deg)'}}>
        <AnswerSheet rows={6} filled={() => 1} scale={1.18} />
      </div>
      <div style={{position: 'absolute', left: 64, top: 54, right: 420}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <span style={{backgroundColor: c.print, color: '#fff', fontFamily: theme.font.display, fontWeight: 700, fontSize: 38, lineHeight: 1.6, padding: '0 20px'}}>{meta.series}</span>
          {meta.number ? <span style={{fontFamily: theme.font.display, fontWeight: 700, fontSize: 40}}>第{meta.number}回</span> : null}
        </div>
        <h1 style={{margin: '40px 0 0', fontFamily: theme.font.display, fontWeight: 900, fontSize: size, lineHeight: 1.18, letterSpacing: '-0.005em'}}>
          {rows.map((row, i) => (
            <span key={i} style={{display: 'block'}}>
              <span style={{position: 'relative', display: 'inline-block'}}>
                {row}
                {i === rows.length - 1 ? <PenUnderline progress={1} offset={4} width={12} /> : null}
              </span>
            </span>
          ))}
        </h1>
      </div>
      {sub ? (
        <div style={{position: 'absolute', left: 64, bottom: 54, right: 520, fontFamily: theme.font.display, fontWeight: 700, fontSize: 44, lineHeight: 1.35}}>{sub}</div>
      ) : null}
    </AbsoluteFill>
  );
};

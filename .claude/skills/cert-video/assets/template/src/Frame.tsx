import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Oval, Rich} from './parts';
import {Code} from './scenes/Code';
import {Compare} from './scenes/Compare';
import {Flow} from './scenes/Flow';
import {Points} from './scenes/Points';
import {Quiz} from './scenes/Quiz';
import {Stats} from './scenes/Stats';
import {Summary} from './scenes/Summary';
import {Title} from './scenes/Title';
import {theme} from './theme';
import {SceneContext} from './timing';
import type {SceneData, Timeline} from './types';
import {units} from './util';

const c = theme.color;
const L = theme.layout;

// 台本の type と部品の対応。場面の種類を足すときは、ここと certvideo.py の検査と references/scenes.md に足す。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SCENES: Record<string, React.FC<any>> = {
  title: Title,
  points: Points,
  stats: Stats,
  code: Code,
  compare: Compare,
  flow: Flow,
  quiz: Quiz,
  summary: Summary,
};

/** 上端の帯。シリーズ名と題名、いまどの章にいるかを楕円の塗りで示す */
const Header: React.FC<{timeline: Timeline; scene: SceneData}> = ({timeline, scene}) => {
  const frame = useCurrentFrame() + scene.from;
  const {meta, sections, totalFrames} = timeline;
  const currentIndex = sections.reduce((acc, s, i) => (s.from <= frame ? i : acc), 0);
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: L.header,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: `0 ${L.margin}px`,
        backgroundColor: c.sheet,
        borderBottom: `3px solid ${c.print}`,
      }}
    >
      <span style={{fontFamily: theme.font.display, fontWeight: 700, fontSize: 28, color: c.print, whiteSpace: 'nowrap', flex: 'none'}}>{meta.series}</span>
      <span style={{width: 2, height: 28, backgroundColor: c.line, flex: 'none'}} />
      <span style={{fontSize: 28, fontWeight: 500, whiteSpace: 'nowrap', flex: 'none'}}>
        {meta.number ? `第${meta.number}回　` : ''}
        {meta.title}
      </span>
      {sections.length > 1 ? (
        <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 9, minWidth: 0}}>
          {/* 章名は、入りきらなければ「…」で省略する（帯を2行にしない） */}
          <span style={{fontSize: 26, color: c.muted, marginRight: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0}}>{sections[currentIndex]?.title}</span>
          {sections.map((s, i) => {
            const end = sections[i + 1]?.from ?? totalFrames;
            const fill = interpolate(frame, [s.from, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return <Oval key={i} w={46} h={27} stroke={2.5} fill={fill} />;
          })}
        </div>
      ) : null}
    </div>
  );
};

// 字幕の1行に入る文字数（全角換算）。等幅の語は少し幅を取るので、控えめにしてある
const CAPTION_LINE = 33;

/**
 * 2行になる字幕を、句読点の位置で2つに分ける。行の長さがなるべくそろう位置を選び、「。」を「、」より優先する。
 * 分けられる句読点がなければ null（そのときはブラウザに任せて、文節の切れ目で折る）。
 */
const splitCaption = (text: string): [string, string] | null => {
  if (units(text) <= CAPTION_LINE + 2) {
    return null;
  }
  let best: [string, string] | null = null;
  let bestScore = Infinity;
  let inCode = false;
  for (let i = 0; i < text.length - 1; i++) {
    const ch = text[i];
    if (ch === '`') {
      inCode = !inCode;
    }
    if (inCode || (ch !== '、' && ch !== '。')) {
      continue;
    }
    const first = text.slice(0, i + 1);
    const second = text.slice(i + 1).trimStart();
    const a = units(first);
    const b = units(second);
    if (a < 8 || a > CAPTION_LINE || b < 4 || b > CAPTION_LINE) {
      continue;
    }
    const score = Math.abs(a - b) + (ch === '、' ? 5 : 0);
    if (score < bestScore) {
      bestScore = score;
      best = [first, second];
    }
  }
  return best;
};

/** 下端の字幕。いま読んでいる1文を出す。次の文までの短い間は消さずに残す */
const Caption: React.FC<{scene: SceneData}> = ({scene}) => {
  const frame = useCurrentFrame();
  const started = scene.lines.filter((l) => l.from <= frame);
  const line = started[started.length - 1];
  const visible = line && frame < line.from + line.duration + 18;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: L.caption,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 170px',
        backgroundColor: c.sheet,
        borderTop: `2px solid ${c.line}`,
      }}
    >
      {visible ? (
        <p
          style={
            {
              margin: 0,
              fontSize: 44,
              lineHeight: 1.36,
              fontWeight: 500,
              textAlign: 'center',
              // 2行になるときは、行の長さをそろえる
              textWrap: 'balance',
            } as React.CSSProperties
          }
        >
          {(() => {
            const parts = splitCaption(line.text);
            return parts ? (
              <>
                <span style={{display: 'block', whiteSpace: 'nowrap'}}>
                  <Rich>{parts[0]}</Rich>
                </span>
                <span style={{display: 'block', whiteSpace: 'nowrap'}}>
                  <Rich>{parts[1]}</Rich>
                </span>
              </>
            ) : (
              <Rich>{line.text}</Rich>
            );
          })()}
        </p>
      ) : null}
    </div>
  );
};

export const SceneFrame: React.FC<{timeline: Timeline; scene: SceneData}> = ({timeline, scene}) => {
  const frame = useCurrentFrame();
  const Body = SCENES[scene.type];
  const isTitle = scene.type === 'title';
  // 場面の切り替えは短いフェードだけ。動きはナレーションに合わせた出現と、赤ペン・鉛筆に絞る
  const fadeIn = interpolate(frame, [0, 7], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <SceneContext.Provider value={{scene, meta: timeline.meta}}>
      {/* lang="ja" と auto-phrase の組み合わせで、折り返しが文節の切れ目になる（「メッ／セージ」のように割れない） */}
      <AbsoluteFill lang="ja" style={{backgroundColor: c.paper, color: c.ink, fontFamily: theme.font.body, wordBreak: 'auto-phrase', lineBreak: 'strict'} as React.CSSProperties}>
        {isTitle ? null : <Header timeline={timeline} scene={scene} />}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: isTitle ? 0 : L.header,
            bottom: timeline.captions ? L.caption : 0,
            boxSizing: 'border-box',
            padding: isTitle ? 0 : `50px ${L.margin}px 30px`,
            display: 'flex',
            flexDirection: 'column',
            opacity: isTitle ? 1 : fadeIn,
          }}
        >
          {Body ? <Body {...scene.props} /> : <div style={{fontSize: 40, color: c.pen}}>未対応の場面です: {scene.type}</div>}
        </div>
        {timeline.captions ? <Caption scene={scene} /> : null}
      </AbsoluteFill>
    </SceneContext.Provider>
  );
};

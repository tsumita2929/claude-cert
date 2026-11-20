import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {SceneFrame} from './Frame';
import {theme} from './theme';
import type {Timeline} from './types';

export type LectureProps = {episode: string; timeline: Timeline | null};

/** 講義動画の本体。timeline.json の場面を順に並べ、ナレーションを1本の音声として重ねる */
export const Lecture: React.FC<LectureProps> = ({timeline}) => {
  if (!timeline) {
    return <AbsoluteFill style={{backgroundColor: theme.color.paper}} />;
  }
  return (
    <AbsoluteFill style={{backgroundColor: theme.color.paper}}>
      <Audio src={staticFile(timeline.audio)} />
      {timeline.bgm ? <Audio src={staticFile(timeline.bgm.file)} volume={timeline.bgm.volume ?? 0.05} loop /> : null}
      {timeline.scenes.map((scene) => (
        <Sequence key={scene.id} from={scene.from} durationInFrames={scene.duration} name={`${scene.id}（${scene.type}）`}>
          <SceneFrame timeline={timeline} scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

import React from 'react';
import {type CalculateMetadataFunction, Composition, staticFile} from 'remotion';
import {loadFonts} from './fonts';
import {Lecture, type LectureProps} from './Lecture';
import {Thumbnail} from './Thumbnail';
import type {Timeline} from './types';

loadFonts();

// 動画の長さや中身は、certvideo.py voice が作る public/ep/<回>/timeline.json から決まる
const loadTimeline = async (episode: string): Promise<Timeline> => {
  const res = await fetch(staticFile(`ep/${episode}/timeline.json`));
  if (!res.ok) {
    throw new Error(`public/ep/${episode}/timeline.json がありません。先に certvideo.py voice を実行してください`);
  }
  return res.json();
};

const lectureMetadata: CalculateMetadataFunction<LectureProps> = async ({props}) => {
  const timeline = await loadTimeline(props.episode);
  return {
    durationInFrames: timeline.totalFrames,
    fps: timeline.fps,
    width: timeline.width,
    height: timeline.height,
    props: {...props, timeline},
  };
};

const thumbnailMetadata: CalculateMetadataFunction<LectureProps> = async ({props}) => {
  return {props: {...props, timeline: await loadTimeline(props.episode)}};
};

export const Root: React.FC = () => (
  <>
    <Composition
      id="Lecture"
      component={Lecture}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={300}
      defaultProps={{episode: 'example', timeline: null}}
      calculateMetadata={lectureMetadata}
    />
    <Composition
      id="Thumbnail"
      component={Thumbnail}
      width={1280}
      height={720}
      fps={30}
      durationInFrames={1}
      defaultProps={{episode: 'example', timeline: null}}
      calculateMetadata={thumbnailMetadata}
    />
  </>
);

import {createContext, useContext} from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Meta, SceneData, StepEvent} from './types';

export const SceneContext = createContext<{scene: SceneData; meta: Meta} | null>(null);

export const useScene = () => {
  const ctx = useContext(SceneContext);
  if (!ctx) {
    throw new Error('場面の部品は SceneFrame の中で使ってください');
  }
  return ctx;
};

/**
 * ナレーションに合わせた画面の段階（step）を扱う。
 * 台本の行に step を1つも書かなかった場面は、最初から全部を順に出す。
 */
export const useSteps = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {scene} = useScene();

  let step = scene.stepped ? 0 : 99;
  let current: StepEvent | null = null;
  for (const e of scene.events) {
    if (e.at <= frame) {
      step = e.step;
      current = e;
    }
  }

  /** 段階 k に初めて到達するコマ。到達しないなら Infinity */
  const reachedAt = (k: number) => {
    if (!scene.stepped) {
      return (k - 1) * 5;
    }
    const e = scene.events.find((ev) => ev.step >= k);
    return e ? e.at : Infinity;
  };

  /** 段階 k で現れる要素の出現の進み具合（0→1） */
  const enter = (k: number, delay = 0) => {
    const at = reachedAt(k);
    if (at === Infinity) {
      return 0;
    }
    return spring({frame: frame - at - delay, fps, config: {damping: 200}, durationInFrames: 10});
  };

  /** 段階 k に到達してからのコマ数（未到達は負の値） */
  const since = (k: number) => frame - reachedAt(k);

  const event = (k: number) => scene.events.find((ev) => ev.step === k) ?? null;

  return {frame, step, current, reachedAt, enter, since, event};
};

/** 赤ペンの印の進み具合（0→1）。target が一致する印がなければ 0 */
export const useMark = () => {
  const frame = useCurrentFrame();
  const {scene} = useScene();
  return (target: number | string, length = 14) => {
    const m = scene.marks.find((mk) => mk.target === target);
    if (!m) {
      return 0;
    }
    return interpolate(frame, [m.at, m.at + length], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
  };
};

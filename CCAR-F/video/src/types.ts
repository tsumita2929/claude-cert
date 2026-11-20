// certvideo.py voice が書き出す timeline.json の形。コマ数はすべて 1/fps 秒単位。

export type Line = {text: string; from: number; duration: number};

// ナレーションのある行に step を付けると、その行が始まるコマで画面の段階が切り替わる
export type StepEvent = {at: number; step: number; duration: number};

// 赤ペンの印を入れるコマと、その対象（場面の種類ごとに意味が決まる）
export type Mark = {at: number; target: number | string};

export type SceneData = {
  id: string;
  type: string;
  chapter?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  from: number;
  duration: number;
  lines: Line[];
  events: StepEvent[];
  marks: Mark[];
  stepped: boolean;
};

export type Meta = {
  series: string;
  disclaimer: string;
  number?: number | null;
  of?: number | null;
  title: string;
  subtitle: string;
  thumbnail?: {headline?: string; sub?: string};
};

export type Timeline = {
  episode: string;
  fps: number;
  width: number;
  height: number;
  totalFrames: number;
  meta: Meta;
  audio: string;
  bgm?: {file: string; volume?: number} | null;
  captions: boolean;
  sections: {title: string; from: number}[];
  scenes: SceneData[];
};

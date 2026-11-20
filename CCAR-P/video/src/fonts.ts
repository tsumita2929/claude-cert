import {continueRender, delayRender, staticFile} from 'remotion';

// 書体は public/fonts に同梱したファイルから読む（すべて SIL Open Font License。商用利用可）。
// ネットワークに頼らないので、何度書き出しても同じ見た目になる。
const FILES: [family: string, weight: string, file: string][] = [
  ['Zen Kaku Gothic New', '700', 'fonts/ZenKakuGothicNew-Bold.ttf'],
  ['Zen Kaku Gothic New', '900', 'fonts/ZenKakuGothicNew-Black.ttf'],
  ['IBM Plex Sans JP', '400', 'fonts/IBMPlexSansJP-Regular.ttf'],
  ['IBM Plex Sans JP', '500', 'fonts/IBMPlexSansJP-Medium.ttf'],
  ['IBM Plex Sans JP', '700', 'fonts/IBMPlexSansJP-Bold.ttf'],
  ['IBM Plex Mono', '400', 'fonts/IBMPlexMono-Regular.ttf'],
  ['IBM Plex Mono', '600', 'fonts/IBMPlexMono-SemiBold.ttf'],
];

let started = false;

export const loadFonts = () => {
  if (started || typeof document === 'undefined') {
    return;
  }
  started = true;
  const handle = delayRender('書体を読み込んでいます');
  Promise.all(
    FILES.map(async ([family, weight, file]) => {
      const face = new FontFace(family, `url(${staticFile(file)})`, {weight});
      await face.load();
      document.fonts.add(face);
    }),
  ).then(() => continueRender(handle));
};

// 動画を書き出さずに、指定したコマだけを画像にする（certvideo.py preview が使う）。
//
//   node stills.cjs <まとめ済みの部品のフォルダ> <回の名前> <出力フォルダ> <コマ番号の JSON 配列> [サムネイルの出力先.png]
//   （動画プロジェクトのフォルダで実行する。部品のフォルダは `npx remotion bundle` で作ったもの）
//
// 同じブラウザで続けて描くので、全体の書き出しよりずっと速い。
// Remotion の部品は、このファイルの場所ではなく、動画プロジェクトの node_modules から読み込む。
const path = require('path');
const fs = require('fs');
const {createRequire} = require('module');

const projectRequire = createRequire(path.join(process.cwd(), 'package.json'));
const {renderStill, selectComposition, openBrowser} = projectRequire('@remotion/renderer');

const [serveUrl, episode, outDir, framesJson, thumbnailPath] = process.argv.slice(2);
if (!serveUrl || !episode || !outDir || !framesJson) {
  console.error('usage: node stills.cjs <bundle dir> <episode> <outDir> <frames JSON> [thumbnail.png]');
  process.exit(2);
}
const frames = JSON.parse(framesJson);

(async () => {
  fs.mkdirSync(outDir, {recursive: true});
  const inputProps = {episode};
  const browser = await openBrowser('chrome');
  try {
    const composition = await selectComposition({serveUrl, id: 'Lecture', inputProps, puppeteerInstance: browser});
    for (let i = 0; i < frames.length; i++) {
      const frame = Math.max(0, Math.min(composition.durationInFrames - 1, frames[i]));
      await renderStill({
        composition, serveUrl, inputProps, frame, puppeteerInstance: browser,
        output: path.join(outDir, `f${String(i).padStart(3, '0')}.jpg`),
        imageFormat: 'jpeg', jpegQuality: 85, scale: 0.5, overwrite: true,
      });
    }
    if (thumbnailPath) {
      const thumb = await selectComposition({serveUrl, id: 'Thumbnail', inputProps, puppeteerInstance: browser});
      await renderStill({composition: thumb, serveUrl, inputProps, puppeteerInstance: browser, output: thumbnailPath, imageFormat: 'png', overwrite: true});
    }
  } finally {
    await browser.close({silent: true});
  }
})().catch((e) => {
  console.error(String((e && e.stack) || e).slice(-1500));
  process.exit(1);
});

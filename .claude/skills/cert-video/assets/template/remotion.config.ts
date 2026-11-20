import {Config} from '@remotion/cli/config';

// 文字の輪郭がにじまないよう、コマ画像は高品質の JPEG で書き出す
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
// YouTube が前提にしている色空間。指定しないと色がわずかにずれる
Config.setColorSpace('bt709');
Config.setOverwriteOutput(true);

# 解説動画プロジェクト

台本（`episodes/<回>/episode.json`）から、ナレーション付きの解説動画を書き出すフォルダです。
Claude Code の cert-video スキルが使います。手で動かすこともできます。

## フォルダの中身

| 場所 | 中身 |
|---|---|
| `project.json` | シリーズ名、冒頭の断り書き、声、クレジット |
| `lexicon.json` | 用語の読み方辞書（表記 → 読み） |
| `episodes/<回>/episode.json` | 台本。画面の内容とナレーション |
| `episodes/<回>/factcheck.md` | 事実確認の記録 |
| `src/` | 画面の部品。色と書体は `src/theme.ts` |
| `public/fonts/` | 書体（SIL Open Font License） |
| `out/<回>/` | 完成した動画、サムネイル、字幕、チャプター、確認用の画像 |

`node_modules/`、`out/`、`.cache/`、`public/ep/` は作り直せるので、消してもかまいません。

## 手で動かす

```bash
cv() { python3 <cert-video スキルのフォルダ>/scripts/certvideo.py "$@"; }
cv check  . example    # 台本の検査
cv voice  . example    # 音声の合成
cv render . example    # 動画とサムネイルの書き出し
cv qa     . example    # 確認用の画像と音量の測定
```

画面を見ながら調整したいときは `npm run studio`（先に `voice` を実行しておく）。

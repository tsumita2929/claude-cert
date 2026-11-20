#!/usr/bin/env python3
"""音声講座のビルドツール（全試験で共用）。

試験フォルダの audio/script.txt を macOS の say コマンドで読み上げ、章ごとのチャプター付き m4a
（audio/<試験コード>_audio.m4a）にまとめる。ffmpeg / ffprobe が必要（Homebrew なら `brew install ffmpeg`）。
各試験フォルダの audio/build_audio.py からも呼べる。

使い方:
  python3 shared/audio/build_audio.py CCDV-F                      # 既定（声 Kyoko、標準の速さ）
  python3 shared/audio/build_audio.py CCDV-F --rate 200           # 少し速く
  python3 shared/audio/build_audio.py CCDV-F --voice "Kyoko (Enhanced)"  # 高音質の声を入れている場合
  python3 shared/audio/build_audio.py CCDV-F --check              # 台本の書式と分量だけ確かめる（音声は作らない）

台本（script.txt）の書式:
  "# タイトル"  … ここから新しい章。タイトルはチャプター名になり、読み上げない
  空行          … 段落の区切り（短い間）
  "@pause 秒"   … その秒数だけ無音（クイズの考える時間など）
"""
import argparse
import json
import pathlib
import re
import subprocess
import sys
import tempfile

PARA_PAUSE_MS = 700
CHAPTER_PAUSE_MS = 1500
SCRIPT = pathlib.Path("script.txt")  # main() で試験フォルダの台本に差し替える


def parse(text):
    chapters = []
    for n, line in enumerate(text.splitlines(), 1):
        s = line.strip()
        if s.startswith("# "):
            chapters.append({"title": s[2:].strip(), "parts": []})
        elif not chapters:
            if s:
                raise SystemExit(f"{SCRIPT.name}:{n}: 台本の先頭は '# 章タイトル' にしてください")
        elif s.startswith("@pause"):
            try:
                sec = float(s.split()[1])
            except (IndexError, ValueError):
                raise SystemExit(f"{SCRIPT.name}:{n}: '@pause 秒数' の形で書いてください")
            chapters[-1]["parts"].append(f"[[slnc {int(sec * 1000)}]]")
        elif s:
            chapters[-1]["parts"].append(s)
        elif chapters[-1]["parts"]:
            chapters[-1]["parts"].append(f"[[slnc {PARA_PAUSE_MS}]]")
    return [c for c in chapters if c["parts"]]


def duration_ms(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout.strip()
    return int(float(out) * 1000)


def meta_escape(s):
    for ch in ("\\", "=", ";", "#", "\n"):
        s = s.replace(ch, "\\" + ch)
    return s


def main():
    global SCRIPT
    ap = argparse.ArgumentParser(description="台本から音声講座の m4a を作る")
    ap.add_argument("exam_dir", help="試験フォルダ（exam.json と audio/script.txt がある場所）")
    ap.add_argument("--voice", default="Kyoko")
    ap.add_argument("--rate", type=int, help="読み上げの速さ（1分あたりの語数。省略時は声の標準）")
    ap.add_argument("--out", help="出力ファイル（省略時は audio/<試験コード>_audio.m4a）")
    ap.add_argument("--check", action="store_true", help="台本の書式と分量だけ確かめる")
    args = ap.parse_args()

    exam_dir = pathlib.Path(args.exam_dir).resolve()
    code = json.loads((exam_dir / "exam.json").read_text(encoding="utf-8"))["code"]
    SCRIPT = exam_dir / "audio" / "script.txt"
    album = f"{code} 音声キャッチアップ講座"
    args.out = args.out or str(exam_dir / "audio" / f"{code}_audio.m4a")

    chapters = parse(SCRIPT.read_text(encoding="utf-8"))
    if not chapters:
        raise SystemExit("台本に章がありません")
    if args.check:
        # say は英字の読みが不安定なので、台本は読みどおりのカタカナで書く。英字が残っていれば知らせる
        total = 0
        for ch in chapters:
            text = "".join(p for p in ch["parts"] if not p.startswith("[[slnc"))
            total += len(text)
            latin = sorted(set(re.findall(r"[A-Za-z][A-Za-z0-9_.\-]*", text)))
            print(f"  {len(text):5d}字  {ch['title']}" + (f"   英字: {' '.join(latin)}" if latin else ""))
        print(f"合計 {total}字（Kyoko の標準の速さで、およそ {total / 355:.0f}分）、{len(chapters)}チャプター")
        return 0

    with tempfile.TemporaryDirectory() as tmp:
        tmp = pathlib.Path(tmp)
        files, starts, t = [], [], 0
        for i, ch in enumerate(chapters, 1):
            txt = tmp / f"ch{i:02d}.txt"
            aiff = tmp / f"ch{i:02d}.aiff"
            txt.write_text("\n".join(ch["parts"]) + f"\n[[slnc {CHAPTER_PAUSE_MS}]]\n", encoding="utf-8")
            cmd = ["say", "-v", args.voice, "-o", str(aiff), "-f", str(txt)]
            if args.rate:
                cmd[1:1] = ["-r", str(args.rate)]
            print(f"  [{i}/{len(chapters)}] {ch['title']}", flush=True)
            subprocess.run(cmd, check=True)
            d = duration_ms(aiff)
            starts.append((t, t + d, ch["title"]))
            files.append(aiff)
            t += d

        concat = tmp / "list.txt"
        concat.write_text("".join(f"file '{f}'\n" for f in files), encoding="utf-8")
        meta = [";FFMETADATA1", f"title={meta_escape(album)}", f"album={meta_escape(album)}",
                f"artist={meta_escape(code)} 学習用（非公式）", "genre=Speech"]
        for start, end, title in starts:
            meta += ["[CHAPTER]", "TIMEBASE=1/1000", f"START={start}", f"END={end}", f"title={meta_escape(title)}"]
        meta_file = tmp / "meta.txt"
        meta_file.write_text("\n".join(meta) + "\n", encoding="utf-8")

        subprocess.run(
            ["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(concat),
             "-i", str(meta_file), "-map", "0:a", "-map_metadata", "1", "-map_chapters", "1",
             "-c:a", "aac", "-b:a", "96k", "-ac", "1", "-movflags", "+faststart", args.out],
            check=True,
        )

    total = t // 1000
    print(f"{args.out} を書き出しました（{total // 60}分{total % 60:02d}秒、{len(chapters)}チャプター）")
    for start, _, title in starts:
        s = start // 1000
        print(f"  {s // 60:2d}:{s % 60:02d}  {title}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

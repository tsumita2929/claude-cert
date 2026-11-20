#!/usr/bin/env python3
"""スライドの章の区切りにある「音声 m:ss〜」を、音声ファイルの各章の開始時刻に合わせる。

音声（audio/<試験>_audio.m4a）を作り直すと、章の開始時刻が少しずれる。区切りのスライドの時刻を、
m4a のチャプター（「第1章 …」「第2章 …」）の開始時刻で書き換える。変わったら pptx を作り直すこと。

  python3 shared/slides/sync_audio_times.py CCAR-F          # 書き換える
  python3 shared/slides/sync_audio_times.py CCAR-F --check  # 食い違いを表示するだけ
"""
import json
import pathlib
import re
import subprocess
import sys


def main(argv):
    if not argv or argv[0].startswith("-"):
        print(__doc__)
        return 1
    exam_dir = pathlib.Path(argv[0]).resolve()
    code = json.loads((exam_dir / "exam.json").read_text(encoding="utf-8"))["code"]
    m4a = exam_dir / "audio" / f"{code}_audio.m4a"
    deck = exam_dir / "slides" / "build_deck.js"
    out = subprocess.run(["ffprobe", "-v", "error", "-show_chapters", "-of", "json", str(m4a)], check=True, capture_output=True, text=True).stdout
    starts = {}
    for ch in json.loads(out)["chapters"]:
        m = re.match(r"第(\d+)章", ch["tags"].get("title", ""))
        if m:
            sec = int(float(ch["start_time"]))
            starts[int(m.group(1))] = f"{sec // 60}:{sec % 60:02d}"
    total = int(float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(m4a)], check=True, capture_output=True, text=True).stdout))
    # 区切りのスライドは、行の先頭が divider(章番号, … か chapter(章番号, … の呼び出し。その行の最初の m:ss が音声の時刻
    lines = deck.read_text(encoding="utf-8").split("\n")
    changes, seen = [], set()
    for i, line in enumerate(lines):
        m = re.match(r"\s*(?:deck\.)?(?:divider|chapter)\(\s*(\d+)\s*,", line)
        if not m or int(m.group(1)) not in starts:
            continue
        n = int(m.group(1))
        t = re.search(r"(?<![\d:])(\d{1,2}:\d\d)(?![\d:])", line)
        if not t:
            continue
        seen.add(n)
        if t.group(1) != starts[n]:
            changes.append(f"第{n}章 {t.group(1)} → {starts[n]}")
            lines[i] = line[:t.start(1)] + starts[n] + line[t.end(1):]
    if seen != set(starts):
        print(f"{deck}: 区切りのスライドの時刻が見つからない章があります（見つかった章: {sorted(seen)}、音声の章: {sorted(starts)}）。手で確かめてください")
        return 1
    new = "\n".join(lines)
    print(f"{code}: 音声 {total // 60}分{total % 60:02d}秒、章の開始 " + " ".join(f"{n}={t}" for n, t in sorted(starts.items())))
    if not changes:
        print("  スライドの時刻は音声と合っています")
        return 0
    print("  食い違い: " + "、".join(changes))
    if "--check" in argv:
        return 2
    deck.write_text(new, encoding="utf-8")
    print(f"  {deck} を書き換えました。`node {deck.relative_to(exam_dir.parent)}` で pptx を作り直してください")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

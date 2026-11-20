#!/usr/bin/env python3
"""講座の本文（course/ch*.md）から、音声講座の台本（audio/script.txt）を作る。全試験で共用。

  python3 shared/audio/make_script.py CCAR-F          # CCAR-F/course/ch*.md → CCAR-F/audio/script.txt
  python3 shared/audio/make_script.py CCAR-F --stdout  # ファイルに書かず、結果を表示する
  python3 shared/audio/make_script.py CCAR-F --stdout --only ch03   # ch03.md だけを変換して表示する（書いている途中の確認用）

course/chNN.md の書式（shared/guides/course-guide.md に詳しい説明がある）:
  # 第1章 章の題名          … 音声のチャプター名になる（読み上げない）
  ## 本文                   … ここから次の「## 」までが読み上げの対象
  ### 節の見出し            … 読み上げない（段落の区切りになる）
  地の文                    … 読み上げる。空行で段落を分ける
  **要点** と箇条書き・表   … 読み上げない（スライドと動画の画面に使う）
  @pause 4                  … その秒数の無音（クイズの考える時間）
  ## 読み                   … | 表記 | 読み | の表。英字の用語を、読みどおりのカタカナに置き換える

読みの置き換えは、その試験の全章の「## 読み」の表と、shared/audio/lexicon.json を合わせて使う。
長い表記から先に置き換える。英数字だけの表記は、単語として現れたときだけ置き換える。
置き換えたあとに英字が残っていないかは、`python3 shared/audio/build_audio.py <試験> --check` で確かめる。
"""
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
ASCII_WORD = re.compile(r"^[A-Za-z0-9_.\-/ ]+$")


def read_table(lines):
    """| 表記 | 読み | の表を辞書にする。見出し行と区切り行は飛ばす。"""
    out = {}
    for line in lines:
        if not line.strip().startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 2 or set(cells[0]) <= set("-: ") or cells[0] in ("表記", ""):
            continue
        key = cells[0].replace("`", "").replace("\\|", "|").strip()
        if key and cells[1]:
            out[key] = cells[1].replace("`", "").strip()
    return out


def strip_markup(line):
    """太字の記号とバッククォートを外す。バッククォートの中（`**/*.test.tsx` など）は、そのまま残す。"""
    parts = line.split("`")
    return "".join(seg if i % 2 else re.sub(r"\*\*(.+?)\*\*", r"\1", seg) for i, seg in enumerate(parts))


def parse_chapter(path):
    """1つの章のファイルから、題名、読み上げる行、読みの表を取り出す。"""
    title, body, table, section = None, [], [], None
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.rstrip()
        if line.startswith("# ") and title is None:
            title = line[2:].strip()
            continue
        if line.startswith("## "):
            section = line[3:].strip()
            continue
        if section == "読み":
            table.append(line)
        elif section == "本文":
            s = line.strip()
            if s.startswith("###"):
                body.append("")  # 見出しは読まない。段落を区切る
            elif not s:
                body.append("")
            elif s.startswith(("- ", "* ", "|", ">")) or re.match(r"^\d+\.\s", s) or s.replace("*", "").strip() in ("要点", "要点:", "要点："):
                continue  # 箇条書き・表・引用は画面用
            elif s.startswith("@pause"):
                body.append(s)
            else:
                body.append(strip_markup(s))
    if title is None:
        raise SystemExit(f"{path}: 先頭に '# 章の題名' がありません")
    # 連続する空行をまとめ、前後の空行を落とす
    lines = []
    for s in body:
        if s or (lines and lines[-1]):
            lines.append(s)
    while lines and not lines[-1]:
        lines.pop()
    if not lines:
        raise SystemExit(f"{path}: '## 本文' に読み上げる文がありません")
    return title, lines, read_table(table)


def apply_readings(text, readings):
    for key in sorted(readings, key=len, reverse=True):
        if ASCII_WORD.match(key):
            text = re.sub(r"(?<![A-Za-z0-9_])" + re.escape(key) + r"(?![A-Za-z0-9_])", lambda m: readings[key], text)
        else:
            text = text.replace(key, readings[key])
    # 和文と英字の間に置いた空白は、読みに置き換えたあとは不要（不自然な間になる）
    return re.sub(r"(?<=[^\x00-\x7F]) +| +(?=[^\x00-\x7F])", "", text)


def main(argv):
    if not argv or argv[0].startswith("-"):
        print(__doc__)
        return 1
    exam_dir = pathlib.Path(argv[0]).resolve()
    files = sorted((exam_dir / "course").glob("ch*.md"))
    if "--only" in argv:
        i = argv.index("--only")
        if i + 1 >= len(argv) or argv[i + 1].startswith("-"):
            raise SystemExit("--only のあとに、章のファイル名（例: ch03）を書いてください")
        name = argv[i + 1].removesuffix(".md")
        files = [f for f in files if f.stem == name]
        if "--stdout" not in argv:
            raise SystemExit("--only は --stdout と一緒に使ってください（台本の一部だけを書き出すと、ほかの章が消えるため）")
    if not files:
        raise SystemExit(f"{exam_dir / 'course'} に、対象の ch*.md がありません")
    readings = {k: v for k, v in json.loads((HERE / "lexicon.json").read_text(encoding="utf-8")).items() if not k.startswith("//")}
    chapters = []
    for f in files:
        title, lines, table = parse_chapter(f)
        chapters.append((title, lines))
        readings.update(table)
    out = []
    for title, lines in chapters:
        out.append(f"# {title}")
        out += [s if s.startswith("@pause") else apply_readings(s, readings) for s in lines]
        out.append("")
    text = "\n".join(out).rstrip() + "\n"
    if "--stdout" in argv:
        sys.stdout.write(text)
        return 0
    dst = exam_dir / "audio" / "script.txt"
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(text, encoding="utf-8")
    print(f"{dst} を書き出しました（{len(chapters)} 章、読みの辞書 {len(readings)} 語）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

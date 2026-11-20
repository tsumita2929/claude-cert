#!/usr/bin/env python3
"""教材全体の点検を、1回のコマンドでまとめて行う（何も書き換えない）。

  python3 shared/check_all.py            # 全試験
  python3 shared/check_all.py CCAR-F     # 指定した試験だけ

試験フォルダ（exam.json がある場所）ごとに、次を確かめる。
  問題      data/*.json が書式の検査（shared/quiz/build.py）を通るか
  偏り      正解の選択肢だけが長い問題がないか（あれば注意として出す。失敗にはしない）
  アプリ    index.html が、data/*.json とひな形から作り直したものと一致するか（古いままになっていないか）
  動作      問題集アプリの動作テスト（shared/quiz/smoke.js）が通るか
  台本      audio/script.txt が course/ch*.md から作り直したものと一致するか（course/ がある試験だけ）
  読み      台本に、読みに置き換えていない英字が残っていないか
  スライド  スライドが作れて、文字のはみ出しの警告（FIT WARNINGS）が出ないか
  時刻      スライドの「音声 m:ss〜」が、音声ファイルの章の開始時刻と合っているか

直し方は、それぞれの行に出る。node、ffprobe がない環境では、その項目を飛ばす。
"""
import importlib.util
import json
import pathlib
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.dont_write_bytecode = True  # 点検では何も書き換えない（build.py を読み込むときに __pycache__ を作らない）


def load_build():
    spec = importlib.util.spec_from_file_location("quiz_build", ROOT / "shared" / "quiz" / "build.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def run(cmd):
    p = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    return p.returncode, (p.stdout + p.stderr).strip()


def check_exam(code, build, tmp):
    """1つの試験を点検する。戻り値は [(項目, 状態, 説明)]。状態は "OK"・"注意"・"NG"・"飛ばす"。"""
    d = ROOT / code
    out = []
    try:
        exam = build.load_exam(d)
    except SystemExit as e:
        return [("問題", "NG", str(e))]

    # 問題・偏り・アプリ
    errors, questions, page = build.render(d, exam)
    if errors:
        out.append(("問題", "NG", f"{len(errors)} 件のエラー。`python3 {code}/build.py` で内容を確認（例: {errors[0]}）"))
    else:
        out.append(("問題", "OK", f"{len(questions)} 問"))
        singles = [q for q in questions if q["type"] == "single"]
        longest = sum(1 for q in singles if len(q["options"][q["answer"][0]]) == max(map(len, q["options"])))

        def ratio(q):
            right = [len(q["options"][i]) for i in q["answer"]]
            wrong = [len(o) for i, o in enumerate(q["options"]) if i not in q["answer"]]
            return (sum(right) / len(right)) / (sum(wrong) / len(wrong))
        long_ids = [q["id"] for q in questions if ratio(q) >= 1.3]
        share = longest / len(singles) if singles else 0
        if long_ids or share > 0.4:
            out.append(("偏り", "注意", f"択一で正解が最長 {share:.0%}（25%前後が目安）。正解が3割以上長い問題: {', '.join(long_ids) or 'なし'}"))
        else:
            out.append(("偏り", "OK", f"択一で正解が最長の選択肢 {share:.0%}（25%前後が目安）"))
        index = d / "index.html"
        if not index.exists():
            out.append(("アプリ", "NG", f"index.html がない。`python3 {code}/build.py` で作る"))
        elif index.read_text(encoding="utf-8") != build.wrap(page):
            out.append(("アプリ", "NG", f"index.html が古い（data/*.json かひな形のほうが新しい）。`python3 {code}/build.py` で作り直す"))
        else:
            out.append(("アプリ", "OK", "index.html は素材と一致"))

    # 動作テスト
    if not shutil.which("node"):
        out.append(("動作", "飛ばす", "node がない"))
    elif (d / "index.html").exists():
        rc, text = run(["node", "shared/quiz/smoke.js", f"{code}/index.html"])
        out.append(("動作", "OK" if rc == 0 else "NG", text.splitlines()[-1] if text else ""))

    # 台本
    script = d / "audio" / "script.txt"
    if (d / "course").is_dir():
        rc, text = run([sys.executable, "shared/audio/make_script.py", code, "--stdout"])
        if rc != 0:
            out.append(("台本", "NG", text.splitlines()[-1] if text else "make_script.py が失敗"))
        elif not script.exists() or script.read_text(encoding="utf-8").strip() != text.strip():
            out.append(("台本", "NG", f"audio/script.txt が course/ch*.md と合わない。`python3 shared/audio/make_script.py {code}` で作り直し、音声も作り直す"))
        else:
            out.append(("台本", "OK", "script.txt は course/ と一致"))
    if script.exists():
        rc, text = run([sys.executable, "shared/audio/build_audio.py", code, "--check"])
        latin = [line.strip() for line in text.splitlines() if "英字:" in line]
        if rc != 0:
            out.append(("読み", "NG", text.splitlines()[-1] if text else "build_audio.py --check が失敗"))
        elif latin:
            out.append(("読み", "NG", f"読みに置き換えていない英字が残っている（{len(latin)} 章。例: {latin[0]}）"))
        else:
            out.append(("読み", "OK", text.splitlines()[-1] if text else ""))

    # スライド
    deck = d / "slides" / "build_deck.js"
    if deck.exists():
        if not shutil.which("node"):
            out.append(("スライド", "飛ばす", "node がない"))
        else:
            rc, text = run(["node", f"{code}/slides/build_deck.js", str(pathlib.Path(tmp) / f"{code}.pptx")])
            warns = text.split("FIT WARNINGS:")[1].strip().splitlines() if "FIT WARNINGS:" in text else []
            if rc != 0:
                out.append(("スライド", "NG", text.splitlines()[-1] if text else "build_deck.js が失敗"))
            elif warns:
                out.append(("スライド", "注意", f"文字のはみ出しの警告 {len(warns)} 件（例: {warns[0].strip()}）"))
            else:
                out.append(("スライド", "OK", text.splitlines()[-1].split(": ")[-1] if text else ""))
        m4a = d / "audio" / f"{exam['code']}_audio.m4a"
        if not shutil.which("ffprobe") or not m4a.exists():
            out.append(("時刻", "飛ばす", "ffprobe か音声ファイルがない"))
        else:
            rc, text = run([sys.executable, "shared/slides/sync_audio_times.py", code, "--check"])
            last = text.splitlines()[-1].strip() if text else ""
            out.append(("時刻", "OK" if rc == 0 else "NG", last if rc == 0 else f"{last}。`python3 shared/slides/sync_audio_times.py {code}` で直し、スライドを作り直す"))
    return out


def main(argv):
    if argv and argv[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    codes = argv or sorted(p.parent.name for p in ROOT.glob("*/exam.json"))
    build = load_build()
    failed = False
    with tempfile.TemporaryDirectory() as tmp:
        for code in codes:
            if not (ROOT / code / "exam.json").exists():
                print(f"{code}: exam.json がありません")
                failed = True
                continue
            print(f"== {code}")
            for item, state, note in check_exam(code, build, tmp):
                failed = failed or state == "NG"
                print(f"  {state:<4} {item:<5} {note}")
    print("点検の結果: " + ("NG の項目があります" if failed else "NG はありません"))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

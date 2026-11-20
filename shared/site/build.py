#!/usr/bin/env python3
"""公開用のサイト（GitHub Pages）を組み立てる。

  python3 shared/site/build.py          # _site/ に書き出す
  python3 shared/site/build.py OUT      # 出力先を指定する

書き出すもの:
  OUT/index.html           入口のページ（試験の一覧）。ひな形は shared/site/home.html、中身は各試験の exam.json
  OUT/<試験>/index.html    問題集。data/*.json とひな形（shared/quiz/app.html）から作り直す

公開するのは、この2種類だけ。公式の試験ガイド（reference/）や音声・スライド・動画は、リポジトリにあっても書き出さない。
問題集はリポジトリの <試験>/index.html を写すのではなく素材から作るので、index.html を作り直し忘れていても、古い内容は公開されない。
問題の書式の検査（shared/quiz/build.py）に通らない試験が1つでもあれば、何も書き出さずに失敗する。

GitHub Actions（.github/workflows/pages.yml）が main への push のたびにこれを実行して、GitHub Pages に公開する。
"""
import html
import importlib.util
import pathlib
import sys

sys.dont_write_bytecode = True  # build.py を読み込むときに __pycache__ を作らない

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
TEMPLATE = HERE / "home.html"
ORDER = ["CCAO-F", "CCDV-F", "CCAR-F", "CCAR-P"]  # 一覧に並べる順。ここにない試験は、そのあとにコード順で並ぶ
PLACEHOLDERS = ("__EXAMS__", "__EXAM_COUNT__", "__QUESTION_COUNT__", "__CODES__")

ITEM = """      <li><a class="opt" href="{code}/">
        <span class="bubble" aria-hidden="true">{letter}</span>
        <span class="opt-body">
          <span class="opt-title"><b class="opt-code">{code}</b><span class="opt-name">{name}</span></span>
          <span class="facts">
            <span><span class="k">本番</span><b>{questions}</b> 問・<b>{minutes}</b> 分</span>
            <span><span class="k">合格ライン</span><b>{pass_score}</b> / {scale_max}</span>
            <span><span class="k">収録</span><b>{total}</b> 問</span>
          </span>
        </span>
        <span class="opt-go" aria-hidden="true">開く →</span>
      </a></li>"""


def load_quiz_build():
    spec = importlib.util.spec_from_file_location("quiz_build", ROOT / "shared" / "quiz" / "build.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def exam_dirs():
    """exam.json と data/ がある試験フォルダを、一覧に並べる順で返す。"""
    dirs = [p.parent for p in ROOT.glob("*/exam.json") if (p.parent / "data").is_dir()]
    rank = {code: i for i, code in enumerate(ORDER)}
    return sorted(dirs, key=lambda d: (rank.get(d.name, len(ORDER)), d.name))


def home_page(exams):
    """入口のページを作る。exams は [(exam.json の中身, 収録している問題の数)]。"""
    template = TEMPLATE.read_text(encoding="utf-8")
    missing = [ph for ph in PLACEHOLDERS if ph not in template]
    if missing:
        raise SystemExit(f"{TEMPLATE}: {missing} がありません")
    esc = lambda v: html.escape(str(v), quote=True)
    items = "\n".join(
        ITEM.format(
            letter=chr(ord("A") + i), code=esc(exam["code"]), name=esc(exam["name"]),
            questions=esc(exam["questions"]), minutes=esc(exam["minutes"]),
            pass_score=esc(exam["passScore"]), scale_max=esc(exam["scaleMax"]), total=total,
        )
        for i, (exam, total) in enumerate(exams)
    )
    return (template.replace("__EXAMS__", items)
            .replace("__EXAM_COUNT__", str(len(exams)))
            .replace("__QUESTION_COUNT__", str(sum(total for _, total in exams)))
            .replace("__CODES__", esc("、".join(exam["code"] for exam, _ in exams))))


def main(argv):
    if argv and argv[0].startswith("-"):
        print(__doc__)
        return 1
    out = pathlib.Path(argv[0] if argv else ROOT / "_site").resolve()
    if out == ROOT or (ROOT in out.parents and out.parent != ROOT):
        # リポジトリの直下や試験フォルダの中に書くと、素材や index.html を上書きしてしまう
        print(f"NG: 出力先はリポジトリ直下の新しいフォルダ（例: _site）か、リポジトリの外にしてください: {out}")
        return 1
    if out.parent == ROOT and (out / "exam.json").exists():
        print(f"NG: 出力先が試験フォルダです: {out}")
        return 1

    build = load_quiz_build()
    dirs = exam_dirs()
    if not dirs:
        print("NG: 試験フォルダ（exam.json と data/ がある場所）が見つかりません")
        return 1

    # 先に全部を組み立てて、1つでも検査に通らなければ何も書き出さない
    pages, exams, failed = [], [], 0
    for d in dirs:
        exam = build.load_exam(d)
        if exam["code"] != d.name:
            print(f"NG: {d.name}/exam.json の code が {exam['code']} です（フォルダ名と同じにしてください。公開先の URL になります）")
            failed += 1
            continue
        errors, questions, page = build.render(d, exam)
        if errors:
            print("\n".join(errors))
            print(f"NG: {d.name} の問題に {len(errors)} 件のエラーがあります")
            failed += 1
            continue
        pages.append((d.name, build.wrap(page)))
        exams.append((exam, len(questions)))
    if failed:
        print("サイトは書き出していません")
        return 1
    home = home_page(exams)

    out.mkdir(parents=True, exist_ok=True)
    (out / "index.html").write_text(home, encoding="utf-8")
    for code, page in pages:
        (out / code).mkdir(exist_ok=True)
        (out / code / "index.html").write_text(page, encoding="utf-8")
    print(f"{out} にサイトを書き出しました")
    for exam, total in exams:
        print(f"  {exam['code']}/index.html（{total} 問）")
    print("  index.html（入口のページ）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

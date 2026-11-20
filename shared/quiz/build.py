#!/usr/bin/env python3
"""問題集のビルドツール（全試験で共用）。

試験フォルダ（exam.json と data/*.json がある場所）を指定して使う。各試験フォルダの build.py からも呼べる。

  python3 shared/quiz/build.py CCDV-F                 # data/*.json を検証して CCDV-F/index.html を生成
  python3 shared/quiz/build.py CCDV-F --check FILE..  # 指定した JSON ファイルだけ検証
  python3 shared/quiz/build.py CCDV-F --artifact OUT  # index.html に加えて、外枠なしの公開用ページも書き出す

exam.json の項目:
  code        試験コード（例: "CCDV-F"）          name      正式名称
  storage     学習記録の保存キーの接頭辞（例: "ccdvf"。変えると記録が引き継がれない）
  questions   本番の問題数                        minutes   試験時間（分）
  passScore / scaleMin / scaleMax   合格点とスコアの範囲
  passRate    模擬試験で合格の目安にする正答率（0〜1）
  format      出題形式の短い説明（例: "単一・複数"）
  types       使える問題の形式。["single"] か ["single", "multi"]
  domains     [{code: "D1", name: 日本語名, en: 英語名, weight: 配点%}, ...]
  scenarios   （任意）[{id: "S1", name: 題名, summary: 概要}, ...]。問題の scenario から参照する
  scenarioPick（任意）模擬試験で使うシナリオの数。指定すると、その数だけ無作為に選んで出題する
  scenarioNote（任意）シナリオの説明（ホームの「シナリオ別に練習する」に出す）
  domainLabel （任意）出題範囲の区分の呼び方。省略時は公式の日本語版ガイドと同じ「分野」
  skills      （任意）試験ガイドがスキルごとの配点を示している場合の一覧。[{code: "2.3", name: 日本語名, en: 英語名, weight: 配点%}, ...]
              code は「分野の番号.連番」。これがあると、全問に skill が必要になり、模擬試験はスキルの配点で抽出する
  weightNote  （任意）配点の出どころの説明
  _artifact   （任意）問題集を公開している Artifact の URL。_ で始まる項目は覚え書きで、ページには埋め込まれない
"""
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
TEMPLATE = HERE / "app.html"
PLACEHOLDER = "/*__QUESTIONS__*/[]"
EXAM_PLACEHOLDER = "/*__EXAM__*/{}"
TITLE_PLACEHOLDER = "__EXAM_TITLE__"
DOC_HEAD = (
    "<!doctype html>\n<html lang=\"ja\">\n<head>\n<meta charset=\"utf-8\">\n"
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n"
)

ID_RE = re.compile(r"^(D\d)-(\d{2})$")
BANNED_OPTIONS = ("上記すべて", "上記のすべて", "すべて正しい", "いずれも正しくない", "上記のいずれでもない")
ALLOWED_KEYS = {"id", "domain", "topic", "type", "question", "code", "options", "answer", "notes", "explanation", "ref", "scenario", "skill"}
EXAM_REQUIRED = ("code", "name", "storage", "questions", "minutes", "passScore", "scaleMin", "scaleMax", "passRate", "format", "types", "domains")


def load_exam(exam_dir):
    path = exam_dir / "exam.json"
    if not path.exists():
        raise SystemExit(f"{path} がありません")
    exam = load(path)
    missing = [k for k in EXAM_REQUIRED if k not in exam]
    if missing:
        raise SystemExit(f"{path}: 項目が足りません {missing}")
    codes = [d.get("code") for d in exam["domains"]]
    if len(set(codes)) != len(codes) or not all(re.match(r"^D\d$", str(c)) for c in codes):
        raise SystemExit(f"{path}: domains の code は D1〜D9 の重複のない値にしてください")
    for d in exam["domains"]:
        if not all(k in d for k in ("name", "en", "weight")):
            raise SystemExit(f"{path}: domains の各要素には name・en・weight が必要です（{d.get('code')}）")
    total = sum(d["weight"] for d in exam["domains"])
    if abs(total - 100) > 0.6:
        raise SystemExit(f"{path}: 配点の合計が {total:g}% です（100% になるようにしてください）")
    if not set(exam["types"]) <= {"single", "multi"} or not exam["types"]:
        raise SystemExit(f"{path}: types は single / multi から選んでください")
    ids = [s.get("id") for s in exam.get("scenarios", [])]
    if len(set(ids)) != len(ids):
        raise SystemExit(f"{path}: scenarios の id が重複しています")
    skills = exam.get("skills", [])
    if skills:
        for k in skills:
            if not re.match(r"^\d\.\d+$", str(k.get("code", ""))) or f"D{str(k['code'])[0]}" not in codes or not all(x in k for x in ("name", "en", "weight")):
                raise SystemExit(f"{path}: skills の各要素には code（例 \"2.3\"）・name・en・weight が必要です（{k.get('code')}）")
        if len({k["code"] for k in skills}) != len(skills):
            raise SystemExit(f"{path}: skills の code が重複しています")
        for d in exam["domains"]:
            sub = sum(k["weight"] for k in skills if str(k["code"]).startswith(d["code"][1] + "."))
            if abs(sub - d["weight"]) > 0.11:
                raise SystemExit(f"{path}: {d['code']} のスキルの配点の合計が {sub:g}% で、分野の配点 {d['weight']:g}% と合いません")
    return exam


def validate(questions, src, exam):
    errors = []
    domains = {d["code"] for d in exam["domains"]}
    scenarios = {s["id"] for s in exam.get("scenarios", [])}
    skills = {str(k["code"]) for k in exam.get("skills", [])}
    if not isinstance(questions, list):
        return [f"{src}: トップレベルは配列である必要があります"]
    for i, q in enumerate(questions):
        where = f"{src}[{i}] {q.get('id', '?') if isinstance(q, dict) else '?'}"
        if not isinstance(q, dict):
            errors.append(f"{where}: オブジェクトではありません")
            continue
        extra = set(q) - ALLOWED_KEYS
        if extra:
            errors.append(f"{where}: 未知のキー {sorted(extra)}")
        m = ID_RE.match(str(q.get("id", "")))
        if not m:
            errors.append(f"{where}: id は 'D2-01' 形式にしてください")
        elif q.get("domain") != m.group(1):
            errors.append(f"{where}: domain と id の接頭辞が一致しません")
        if q.get("domain") not in domains:
            errors.append(f"{where}: domain が不正です（この試験は {sorted(domains)}）")
        for key in ("topic", "question", "explanation"):
            if not isinstance(q.get(key), str) or not q[key].strip():
                errors.append(f"{where}: {key} が空です")
        if "code" in q and (not isinstance(q["code"], str) or not q["code"].strip()):
            errors.append(f"{where}: code は空でない文字列にするか、キーごと省略してください")
        if "ref" in q and not isinstance(q["ref"], str):
            errors.append(f"{where}: ref は文字列にしてください")
        if skills:
            if str(q.get("skill", "")) not in skills:
                errors.append(f"{where}: skill は exam.json の skills の code にしてください（例 \"2.3\"）")
            elif "D" + str(q["skill"])[0] != q.get("domain"):
                errors.append(f"{where}: skill（{q['skill']}）と domain（{q.get('domain')}）が合いません")
        elif "skill" in q:
            errors.append(f"{where}: この試験の exam.json に skills がないので、skill は書けません")
        if "scenario" in q and q["scenario"] not in scenarios:
            errors.append(f"{where}: scenario は exam.json の scenarios の id にしてください（{sorted(scenarios) or 'この試験にシナリオはありません'}）")
        qtype = q.get("type")
        opts = q.get("options")
        ans = q.get("answer")
        notes = q.get("notes")
        if qtype not in ("single", "multi"):
            errors.append(f"{where}: type は single か multi です")
            continue
        if qtype not in exam["types"]:
            errors.append(f"{where}: この試験では {qtype} 形式は使いません（{exam['types']}）")
        if not isinstance(opts, list) or not all(isinstance(o, str) and o.strip() for o in opts):
            errors.append(f"{where}: options は空でない文字列の配列にしてください")
            continue
        want = 4 if qtype == "single" else 5
        if len(opts) != want:
            errors.append(f"{where}: {qtype} の選択肢は {want} 個です（現在 {len(opts)} 個）")
        if len(set(opts)) != len(opts):
            errors.append(f"{where}: 重複した選択肢があります")
        for o in opts:
            if any(b in o for b in BANNED_OPTIONS):
                errors.append(f"{where}: 『上記すべて』系の選択肢は使えません: {o}")
            if re.match(r"^\s*[A-EＡ-Ｅ][.)．）:：]", o):
                errors.append(f"{where}: 選択肢に記号の接頭辞は付けないでください: {o[:20]}")
        if not isinstance(ans, list) or not all(isinstance(a, int) for a in ans):
            errors.append(f"{where}: answer は整数の配列にしてください")
            continue
        if len(set(ans)) != len(ans) or any(a < 0 or a >= len(opts) for a in ans):
            errors.append(f"{where}: answer の添字が不正です")
        if qtype == "single" and len(ans) != 1:
            errors.append(f"{where}: single の answer は 1 個です")
        if qtype == "multi":
            if len(ans) != 2:
                errors.append(f"{where}: multi の answer は 2 個です")
            if "2つ選択" not in q.get("question", ""):
                errors.append(f"{where}: multi の問題文には「（2つ選択）」を含めてください")
        if not isinstance(notes, list) or len(notes) != len(opts) or not all(isinstance(n, str) and n.strip() for n in notes):
            errors.append(f"{where}: notes は選択肢と同じ数の空でない文字列にしてください")
    return errors


def load(path):
    try:
        return json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        raise SystemExit(f"{path}: JSON の構文エラー: {e}")


def check(paths, exam):
    all_errors, seen, total = [], {}, 0
    for p in paths:
        qs = load(p)
        all_errors += validate(qs, pathlib.Path(p).name, exam)
        for q in qs if isinstance(qs, list) else []:
            if isinstance(q, dict) and "id" in q:
                if q["id"] in seen:
                    all_errors.append(f"id の重複: {q['id']}（{seen[q['id']]} と {pathlib.Path(p).name}）")
                seen[q["id"]] = pathlib.Path(p).name
                total += 1
    return all_errors, total


def summarize(questions, exam):
    by_domain, by_type, pos = {}, {"single": 0, "multi": 0}, [0] * 5
    by_scn = {}
    for q in questions:
        by_domain[q["domain"]] = by_domain.get(q["domain"], 0) + 1
        by_type[q["type"]] += 1
        if "scenario" in q:
            by_scn[q["scenario"]] = by_scn.get(q["scenario"], 0) + 1
        for a in q["answer"]:
            pos[a] += 1
    n = len(questions) or 1
    doms = ", ".join(f"{d['code']}:{by_domain.get(d['code'], 0)}（配点{d['weight']:g}%→収録{by_domain.get(d['code'], 0) / n * 100:.0f}%）" for d in exam["domains"])
    print(f"  {exam.get('domainLabel', '分野')}別 {doms}")
    if exam.get("skills"):
        by_skill = {}
        for q in questions:
            by_skill[str(q.get("skill"))] = by_skill.get(str(q.get("skill")), 0) + 1
        want = exam["questions"]
        print("  スキル別（収録数／模擬試験での出題数の目安） " + ", ".join(
            f"{k['code']}:{by_skill.get(str(k['code']), 0)}／{want * k['weight'] / 100:.1f}" for k in exam["skills"]))
        thin = [str(k["code"]) for k in exam["skills"] if by_skill.get(str(k["code"]), 0) < max(2, round(want * k["weight"] / 100 * 1.5))]
        if thin:
            print(f"  注意: 収録数が少ないスキル（模擬試験で同じ問題が毎回出やすい）: {', '.join(thin)}")
    if by_scn:
        print("  シナリオ別 " + ", ".join(f"{k}:{v}" for k, v in sorted(by_scn.items())) + f" / なし:{len(questions) - sum(by_scn.values())}")
    print(f"  形式 単一:{by_type['single']} 複数:{by_type['multi']} / 正解位置 A-E {pos}")
    # 正解だけが長い・詳しいと、内容を知らなくても選べてしまう（question-guide.md の「避けるもの」）
    def length_ratio(q):
        right = [len(q["options"][i]) for i in q["answer"]]
        wrong = [len(o) for i, o in enumerate(q["options"]) if i not in q["answer"]]
        return (sum(right) / len(right)) / (sum(wrong) / len(wrong))
    singles = [q for q in questions if q["type"] == "single"]
    if singles:
        longest = sum(1 for q in singles if len(q["options"][q["answer"][0]]) == max(map(len, q["options"])))
        print(f"  択一で正解が最長の選択肢 {longest}/{len(singles)}（{longest / len(singles):.0%}。偏りがなければ25%前後）")
    long_ids = [q["id"] for q in questions if length_ratio(q) >= 1.3]
    if long_ids:
        print(f"  注意: 正解が誤答の平均より3割以上長い問題（長さで選べてしまう）: {', '.join(long_ids)}")


def render(exam_dir, exam):
    """data/*.json とテンプレートから、問題集のページを組み立てる（ファイルには書かない）。

    戻り値は (エラーの一覧, 問題の一覧, 公開用のページ本体)。index.html の中身は wrap(ページ本体)。
    shared/check_all.py が、index.html が素材から作り直したものと一致するかを確かめるのにも使う。
    """
    files = sorted((exam_dir / "data").glob("*.json"))
    if not files:
        return [f"{exam_dir / 'data'}/*.json が見つかりません"], [], None
    errors, _ = check(files, exam)
    if errors:
        return errors, [], None
    questions = [q for f in files for q in load(f)]
    questions.sort(key=lambda q: (q["domain"], q["id"]))
    template = TEMPLATE.read_text(encoding="utf-8")
    missing = [ph for ph in (PLACEHOLDER, EXAM_PLACEHOLDER, TITLE_PLACEHOLDER) if ph not in template]
    if missing:
        return [f"テンプレートに {ph} がありません" for ph in missing], questions, None
    dump = lambda v: json.dumps(v, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    config = {k: v for k, v in exam.items() if not k.startswith("_")}
    page = (template.replace(TITLE_PLACEHOLDER, f"{exam['code']} 問題集")
            .replace(EXAM_PLACEHOLDER, dump(config))
            .replace(PLACEHOLDER, dump(questions)))
    return [], questions, page


def wrap(page):
    """公開用のページ本体に、外枠（doctype と head の先頭）を付けて index.html の中身にする。"""
    return DOC_HEAD + page + "\n</html>\n"


def main(argv):
    if not argv or argv[0].startswith("-"):
        print(__doc__)
        return 1
    exam_dir = pathlib.Path(argv[0]).resolve()
    argv = argv[1:]
    exam = load_exam(exam_dir)

    if argv and argv[0] == "--check":
        files = argv[1:]
        errors, total = check(files, exam)
        if errors:
            print("\n".join(errors))
            print(f"NG: {len(errors)} 件のエラー")
            return 1
        qs = [q for f in files for q in load(f)]
        print(f"OK: {total} 問")
        summarize(qs, exam)
        return 0

    errors, questions, page = render(exam_dir, exam)
    if errors:
        print("\n".join(errors))
        print(f"NG: {len(errors)} 件のエラー。index.html は更新していません")
        return 1
    output = exam_dir / "index.html"
    output.write_text(wrap(page), encoding="utf-8")
    print(f"{output} を生成しました（{len(questions)} 問）")
    if len(argv) >= 2 and argv[0] == "--artifact":
        # 公開用：外枠（doctype / head）なしのページ本体だけを書き出す
        pathlib.Path(argv[1]).write_text(page, encoding="utf-8")
        print(f"公開用ページを書き出しました: {argv[1]}")
    summarize(questions, exam)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

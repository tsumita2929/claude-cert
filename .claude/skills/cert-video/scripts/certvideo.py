#!/usr/bin/env python3
"""資格の解説動画を、台本（episode.json）から書き出すためのコマンド集。

標準ライブラリだけで動く。外部コマンドは ffmpeg / ffprobe / npx（Remotion）/ docker（音声エンジン）。

  certvideo.py init     <project>                 テンプレートから動画プロジェクトを作る
  certvideo.py engine   start|stop|status [name]  音声エンジン（voicevox / aivis）を Docker で起動・停止
  certvideo.py speakers <engine>                  その音声エンジンで使える声の一覧と利用規約
  certvideo.py audition <project> --text ... --voices voicevox:13 aivis:888753760 ...
                                                  同じ文を複数の声で読ませ、聴き比べページを作る
  certvideo.py reading  <project> "文"            1文だけ、エンジンがどう読むかを表示する（読みを直すときの試し用）
  certvideo.py check    <project> <episode>       台本の形式と文字数を検査する（音声は作らない）
  certvideo.py readings <project> <episode>       全文の読みだけを先に出す（音声は作らない。数十秒）
  certvideo.py voice    <project> <episode>       音声を合成し、タイムラインと読みの確認表を作る
  certvideo.py preview  <project> <episode>       動画を書き出さずに、確認用のコマ画像だけを作る（数十秒）
  certvideo.py render   <project> <episode>       動画・サムネイル・字幕・チャプターを書き出す
  certvideo.py qa       <project> <episode>       コマ画像の一覧と音量の測定結果を作る
  certvideo.py wait     <project> <episode> voice|render
                                                  --detach で切り離した voice / render が終わるのを待つ

voice と render は時間がかかる。`--detach` を付けると切り離して実行し、すぐ戻る。`wait` で終わるのを待つ
（最長9分。まだ終わっていなければ終了コード 3 で戻るので、もう一度 `wait` を実行する）。

<project> は Remotion プロジェクトのフォルダ（例: video）。<episode> は episodes/ の下のフォルダ名。
"""
import argparse
import fcntl
import hashlib
import html
import json
import math
import os
import pathlib
import re
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import wave

SKILL_DIR = pathlib.Path(__file__).resolve().parent.parent
TEMPLATE_DIR = SKILL_DIR / "assets" / "template"

SAMPLE_RATE = 48000
# 書き出しは CPU をよく使うので、このマシンで同時に走るのは2本までにする（1本が CPU の半分ほどを使う）。
# 動画プロジェクトが複数あっても共通で数える
RENDER_SLOTS = 2
LOCK_DIR = pathlib.Path.home() / ".cache" / "cert-video"
DEFAULTS = {"fps": 30, "width": 1920, "height": 1080, "before": 0.5, "gap": 0.3, "after": 0.7}
LOUDNESS = {"I": -14.0, "TP": -1.5, "LRA": 11.0}  # YouTube は -14 LUFS を基準に音量をそろえる

ENGINES = {
    "voicevox": {
        "port": 50021,
        "image": "voicevox/voicevox_engine:cpu-latest",
        "container": "cert-video-voicevox",
        "run_args": [],
    },
    "aivis": {
        "port": 10101,
        "image": "ghcr.io/aivis-project/aivisspeech-engine:cpu-latest",
        "container": "cert-video-aivis",
        # 音声モデルを Mac 側に保存し、コンテナを作り直しても再ダウンロードしない
        "run_args": ["-v", str(pathlib.Path.home() / ".local/share/AivisSpeech-Engine") + ":/home/user/.local/share/AivisSpeech-Engine-Dev"],
    },
}

# 場面の種類ごとの決まり。src/scenes/ の部品と references/scenes.md に対応する。
# 文字数は全角1・半角0.5で数える。上限を超えると画面からはみ出すか、文字が小さくなりすぎる。
LIMITS = {"heading": 24, "lead": 44, "caption": 58}


class Problem(Exception):
    """利用者に見せる、原因と直し方がわかるエラー。"""


def die(msg):
    print(f"エラー: {msg}", file=sys.stderr)
    sys.exit(1)


def run(cmd, **kw):
    return subprocess.run(cmd, check=True, capture_output=True, text=True, **kw)


def need(tool, hint):
    if not shutil.which(tool):
        raise Problem(f"{tool} が見つかりません。{hint}")


def width(text):
    """見た目の文字数（全角1、半角0.5）。"""
    return sum(0.5 if ord(c) < 0x2000 else 1 for c in plain(text))


def plain(text):
    """表示用の記法（`コード` と ==強調==）を外した文。"""
    return text.replace("`", "").replace("==", "")


def fmt_time(seconds):
    s = int(seconds)
    return f"{s // 60}:{s % 60:02d}"


# ---------------------------------------------------------------- プロジェクトと台本

def load_json(path):
    try:
        return json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
    except FileNotFoundError:
        raise Problem(f"{path} がありません")
    except json.JSONDecodeError as e:
        raise Problem(f"{path}: JSON の書き方に誤りがあります（{e}）")


class Project:
    def __init__(self, root):
        self.root = pathlib.Path(root).resolve()
        if not (self.root / "package.json").exists():
            raise Problem(f"{self.root} は動画プロジェクトではありません。先に `certvideo.py init {root}` を実行してください")
        self.config = load_json(self.root / "project.json")
        lex = self.root / "lexicon.json"
        self.lexicon = load_json(lex) if lex.exists() else {}
        self.lexicon = {k: v for k, v in self.lexicon.items() if not k.startswith("//")}

    @property
    def passthrough(self):
        """読みを空文字で登録した語。カタカナにすると区切りが崩れるので、そのままエンジンに読ませると決めた語。"""
        return {k for k, v in self.lexicon.items() if v == ""}

    def unknown_terms(self, reading):
        return [t for t in re.findall(r"[A-Za-z][A-Za-z0-9_.+#/-]*", reading) if t not in self.passthrough]

    def use_episode_lexicon(self, data):
        """台本のトップレベルの lexicon を、プロジェクトの辞書に重ねる（その回だけに効く）。"""
        extra = data.get("lexicon") or {}
        if not isinstance(extra, dict) or not all(isinstance(v, str) for v in extra.values()):
            raise Problem("台本の lexicon は {\"表記\": \"読み\"} の形で書いてください")
        self.lexicon = {**self.lexicon, **extra}

    def episode_path(self, ep):
        return self.root / "episodes" / ep / "episode.json"

    def public_dir(self, ep):
        return self.root / "public" / "ep" / ep

    def out_dir(self, ep):
        return self.root / "out" / ep

    def reading(self, line):
        """読み上げエンジンに渡す文。line.read があればそれを、なければ辞書で置き換えた文を使う。"""
        if line.get("read"):
            return line["read"]
        text = plain(line["text"])
        for term in sorted((t for t in self.lexicon if self.lexicon[t]), key=len, reverse=True):
            # 英数字の語は、単語として現れたときだけ置き換える（"text" が "context" の中で置き換わらないように）
            pattern = re.escape(term)
            if re.match(r"[A-Za-z0-9_]", term[0]):
                pattern = r"(?<![A-Za-z0-9_])" + pattern
            if re.match(r"[A-Za-z0-9_]", term[-1]):
                pattern += r"(?![A-Za-z0-9_])"
            text = re.sub(pattern, lambda _m, t=term: self.lexicon[t], text)
        # 日本語の隣にある半角の空白は、エンジンが「間」として読んでしまうので取り除く
        # （英数字どうしの間の空白は単語の区切りなので残す）
        return re.sub(r"(?<![A-Za-z0-9]) +| +(?![A-Za-z0-9])", "", text)


# 本文に使える高さ（px）。見出しの下から字幕の上まで。lead があると1行ぶん狭くなる
BODY_HEIGHT = {"with_lead": 590, "no_lead": 647}
BODY_WIDTH = 1680


def px_width(text, size, mono=False):
    """文字列の横幅の見積もり（px）。全角は size、半角は等幅なら 0.6、それ以外は 0.55 倍。"""
    half = 0.6 if mono else 0.55
    return sum(size * (half if ord(ch) < 0x2000 else 1) for ch in plain(text))


def wrapped_lines(text, size, box):
    return max(1, math.ceil(px_width(text, size) * 1.04 / box))


def check_scene_props(scene, where, errors, warns):
    """場面の種類ごとに、必須の項目と「画面に収まるか」を調べる。数値は src/scenes/ の部品の組み方に合わせてある。"""
    t, p = scene.get("type"), scene.get("props", {})
    room = BODY_HEIGHT["with_lead" if p.get("lead") else "no_lead"]

    def req(key, kind=str):
        v = p.get(key)
        if not isinstance(v, kind) or (kind in (str, list) and not v):
            errors.append(f"{where}: props.{key} が必要です")
            return None
        return v

    def cap(label, text, limit):
        if isinstance(text, str) and width(text) > limit:
            errors.append(f"{where}: {label} が長すぎます（{width(text):g}字、上限{limit:g}字）: {plain(text)[:24]}…")

    def count(label, items, lo, hi):
        if isinstance(items, list) and not lo <= len(items) <= hi:
            errors.append(f"{where}: {label} は {lo}〜{hi} 個にしてください（現在 {len(items)} 個）")

    def fits(height, hint):
        if height > room:
            errors.append(f"{where}: 画面の高さに収まりません（見積もり {int(height)}px、使える高さ {room}px）。{hint}")

    if t != "title":
        if t == "summary":
            cap("heading", p.get("heading"), LIMITS["heading"])  # 省略すると「今回のまとめ」
        elif t != "quiz":
            cap("heading", req("heading"), LIMITS["heading"])
        cap("lead", p.get("lead"), LIMITS["lead"])

    if t == "title":
        pass
    elif t == "points":
        items = req("items", list) or []
        count("items", items, 2, 5)
        for i, it in enumerate(items):
            if not it.get("label"):
                errors.append(f"{where}: items[{i}].label が必要です")
        items = [it for it in items if it.get("label")]
        if items:
            # src/scenes/Points.tsx の TIERS と同じ表（大きい順）。部品は、収まるいちばん大きい組み方を選ぶ
            tiers = ([{"label": 66, "mono": 58, "desc": 50, "pad": 50, "oval": 74}] if len(items) <= 2 else []) + [
                {"label": 56, "mono": 50, "desc": 44, "pad": 36, "oval": 64},
                {"label": 46, "mono": 40, "desc": 36, "pad": 23, "oval": 56},
                {"label": 44, "mono": 38, "desc": 34, "pad": 15, "oval": 52},
            ]

            def measure(sz):
                widest = max(px_width(it["label"], sz["mono"] if it.get("mono") else sz["label"], it.get("mono")) + 34 for it in items)
                desc_w = BODY_WIDTH - sz["oval"] - 34 - min(680, max(200, round(widest))) - 34
                rows = [wrapped_lines(it["desc"], sz["desc"], desc_w) if it.get("desc") else 1 for it in items]
                total = sum(max(r * sz["desc"] * 1.5, sz["label"] * 1.3) + sz["pad"] * 2 + 2 for r in rows)
                return widest, desc_w, rows, total

            def usable(sz):
                widest, _w, rows, total = measure(sz)
                if sz["label"] == 66 and any(r > 1 for r in rows):  # いちばん大きい組み方は、説明が全部1行のときだけ
                    return False
                return widest <= 680 and total <= room

            chosen = next((sz for sz in tiers if usable(sz)), tiers[-1])
            widest, desc_w, rows, total = measure(chosen)
            if measure(tiers[-1])[0] > 680:
                long = max(items, key=lambda it: px_width(it["label"], 38 if it.get("mono") else 44, it.get("mono")))
                errors.append(f"{where}: label が長すぎます。短い用語にして、説明は desc に書いてください: {long['label']}")
            for it, r in zip(items, rows):
                if r > 2:
                    errors.append(f"{where}: desc が3行以上になります。2行までに短くしてください: {plain(it['desc'])[:20]}…")
                elif r == 2:
                    over = px_width(it["desc"], chosen["desc"]) * 1.04 - desc_w
                    if over < desc_w * 0.15:
                        warns.append(f"{where}: desc の最後の数文字だけが2行目に落ちます。{math.ceil(over / chosen['desc']) + 1}字ほど削ると1行に収まります: {plain(it['desc'])[:20]}…")
            fits(total, "desc を短くするか、項目を減らすか、lead を外してください")
    elif t == "stats":
        items = req("items", list) or []
        count("items", items, 2, 4)
        n = len(items)
        value_size = 176 if n <= 2 else 150 if n == 3 else 112
        box = (BODY_WIDTH - 36 * (n - 1)) / n - 66
        for i, it in enumerate(items):
            for key in ("value", "label"):
                if it.get(key) in (None, ""):
                    errors.append(f"{where}: items[{i}].{key} が必要です")
            used = px_width(str(it.get("value", "")), value_size) * 1.08 + 10 + px_width(it.get("unit", ""), 44)
            if used > box:
                errors.append(f"{where}: items[{i}] の数字と単位が欄からはみ出します（{it.get('value')}{it.get('unit', '')}）。桁か単位を短くしてください")
            cap(f"items[{i}].label", it.get("label", ""), 10)
            if it.get("note") and wrapped_lines(it["note"], 28, box) > 2:
                errors.append(f"{where}: items[{i}].note は2行までにしてください")
    elif t == "code":
        code = req("code") or ""
        rows = code.split("\n")
        if len(rows) > 11:
            errors.append(f"{where}: code は11行以内にしてください（現在 {len(rows)} 行）。説明に必要な部分だけ残します")
        size = 44 if len(rows) <= 6 else 40 if len(rows) <= 8 else 34 if len(rows) <= 10 else 30
        panel = BODY_WIDTH - 88
        focus, notes = p.get("focus", []), p.get("notes", [])
        for n, row in enumerate(rows, 1):
            if px_width(row, size, mono=True) > panel:
                errors.append(f"{where}: code の {n} 行目が長すぎて右にはみ出します。行を分けるか、値を短くしてください")
        for k, step in enumerate(focus):
            if any(not 1 <= n <= len(rows) for n in step):
                errors.append(f"{where}: focus の行番号が code の範囲外です: {step}")
                continue
            note = notes[k] if k < len(notes) else None
            if note and step:
                first = rows[min(step) - 1]
                if px_width(first, size, mono=True) + px_width(note, size * 0.8) + 110 > panel:
                    errors.append(f"{where}: notes[{k}] が {min(step)} 行目のコードと重なります。注釈かコードを短くしてください: {note}")
        fits(len(rows) * round(size * 1.55) + 56, "行を減らしてください")
    elif t == "compare":
        heights = []
        for side in ("left", "right"):
            col = req(side, dict) or {}
            cap(f"{side}.title", col.get("title", ""), 16)
            count(f"{side}.items", col.get("items", []), 1, 4)
            h = 78
            for i, it in enumerate(col.get("items", [])):
                if not it.get("label"):
                    errors.append(f"{where}: {side}.items[{i}].label が必要です")
                cap(f"{side}.items[{i}].label", it.get("label", ""), 18)
                rows = wrapped_lines(it["desc"], 30, 758) if it.get("desc") else 0
                if rows > 2:
                    errors.append(f"{where}: {side}.items[{i}].desc は2行までにしてください")
                h += 51 + rows * 44 + 34
            heights.append(h)
        fits(max(heights or [0]), "項目か説明を減らしてください")
        cols = [p.get(side) or {} for side in ("left", "right")]
        rows_all = [it for col in cols for it in col.get("items", [])]
        if rows_all and max(len(col.get("items", [])) for col in cols) <= 2:
            # src/scenes/Compare.tsx の BIG と同じ条件。各列2項目までで、どの行も1行に収まると大きく組まれる
            wide = [it for it in rows_all
                    if px_width(it.get("label", ""), 42 if it.get("mono") else 46, it.get("mono")) > 758
                    or px_width(it.get("desc", ""), 36) * 1.04 > 758]
            if wide:
                warns.append(f"{where}: 説明を1行（全角およそ20字）に収めると、文字が大きく組まれます。いまは小さい組みになります: {plain(wide[0].get('desc') or wide[0].get('label'))[:22]}…")
    elif t == "flow":
        nodes = req("nodes", list) or []
        count("nodes", nodes, 3, 5)
        n = max(3, min(5, len(nodes)))
        # src/scenes/Flow.tsx の SIZES に合わせた上限。箱が多いほど1つの箱は狭い
        label_cap = {3: 10, 4: 9, 5: 9}[n]
        desc_cap = {3: 42, 4: 34, 5: 30}[n]
        desc_size = {3: 34, 4: 30, 5: 26}[n]
        desc_box = (BODY_WIDTH - 56 * (n - 1)) / n - 8
        if len(nodes) == 5:
            warns.append(f"{where}: flow に5個並べると文字がかなり小さくなります。4個までにするか、points に \"ordered\": true を付けて縦に並べてください")
        for i, nd in enumerate(nodes):
            if not nd.get("label"):
                errors.append(f"{where}: nodes[{i}].label が必要です")
            cap(f"nodes[{i}].label", nd.get("label", ""), label_cap)
            cap(f"nodes[{i}].desc", nd.get("desc", ""), desc_cap)
            desc = nd.get("desc", "")
            if desc and "\n" not in desc:
                last = (px_width(desc, desc_size) * 1.04) % desc_box
                if px_width(desc, desc_size) * 1.04 > desc_box and last < desc_box * 0.3:
                    warns.append(f"{where}: nodes[{i}].desc の最後の数文字だけが次の行に落ちます。削るか、\\n で折る位置を指定してください: {plain(desc)[:20]}…")
    elif t == "quiz":
        cap("question", req("question"), 62)
        opts = req("options", list) or []
        count("options", opts, 2, 5)
        for i, o in enumerate(opts):
            cap(f"options[{i}]", o, 34)
        ans = p.get("answer")
        ans = ans if isinstance(ans, list) else [ans]
        if not all(isinstance(a, int) and 0 <= a < len(opts) for a in ans):
            errors.append(f"{where}: answer は options の添字（0始まり）で指定してください")
        cap("explain", p.get("explain"), 40)
        steps = {ln.get("step") for ln in scene.get("lines", [])}
        if not {1, 3} <= steps:
            errors.append(f"{where}: quiz は step 1（選択肢を出す）と step 3（正解を出す）の行が必要です")
        if not any("wait" in ln and ln.get("step") == 2 for ln in scene.get("lines", [])):
            warns.append(f"{where}: 考える時間（{{\"wait\": 5, \"step\": 2}}）がありません")
    elif t == "summary":
        items = req("items", list) or []
        count("items", items, 2, 4)
        for i, it in enumerate(items):
            cap(f"items[{i}]", it, 27)
        cap("next", p.get("next"), 30)
    else:
        errors.append(f"{where}: type '{t}' は未対応です（title / points / stats / code / compare / flow / quiz / summary）")


def check_episode(project, ep):
    """台本を検査する。戻り値は (台本, エラー一覧, 注意一覧)。"""
    data = load_json(project.episode_path(ep))
    project.use_episode_lexicon(data)
    errors, warns = [], []
    for key in ("title", "scenes"):
        if not data.get(key):
            errors.append(f"トップレベルに {key} が必要です")
    seen, chapters, chars = set(), 0, 0
    unknown_terms = {}
    for i, sc in enumerate(data.get("scenes", [])):
        where = f"scenes[{i}] {sc.get('id', '?')}"
        if not sc.get("id") or sc["id"] in seen:
            errors.append(f"{where}: id は必須で、重複できません")
        seen.add(sc.get("id"))
        chapters += bool(sc.get("chapter"))
        check_scene_props(sc, where, errors, warns)
        lines = sc.get("lines", [])
        if not lines:
            errors.append(f"{where}: lines（ナレーション）が空です")
        for j, ln in enumerate(lines):
            lw = f"{where} lines[{j}]"
            if "wait" in ln:
                if not isinstance(ln["wait"], (int, float)) or not 0 < ln["wait"] <= 15:
                    errors.append(f"{lw}: wait は 0〜15 秒で指定してください")
                continue
            text = ln.get("text")
            if not isinstance(text, str) or not text.strip():
                errors.append(f"{lw}: text か wait のどちらかが必要です")
                continue
            chars += len(plain(text))
            if width(text) > LIMITS["caption"]:
                errors.append(f"{lw}: 1文が長すぎて字幕が2行に収まりません（{width(text):g}字、上限{LIMITS['caption']}字）。文を分けてください: {plain(text)[:20]}…")
            # src/Frame.tsx の splitCaption と同じ条件（1行は全角33字まで）
            if width(text) > 35 and not any(8 <= width(text[:k + 1]) <= 33 and 4 <= width(text[k + 1:]) <= 33 for k, c in enumerate(text[:-1]) if c in "、。"):
                warns.append(f"{lw}: 字幕が2行になり、読点で折り返せません（文節の途中で折れることがあります）。35字以内にするか、中ほどに読点を打ってください: {plain(text)[:22]}…")
            for tok in project.unknown_terms(project.reading(ln)):
                unknown_terms.setdefault(tok, f"{sc.get('id')}[{j}]")
    if width(data.get("title", "")) > 20:
        errors.append(f"title は全角20字までにしてください（現在 {width(data['title']):g}字）。冒頭の画面で2行に収まりません")
    headline = (data.get("thumbnail") or {}).get("headline", "")
    rows = headline.split("\n") if headline else []
    if len(rows) > 2 or any(width(r) > 6 for r in rows):
        warns.append("thumbnail.headline は2行まで、1行は全角6字まで（4字以下がいちばん大きい）にしてください。長いと文字が小さくなります")
    series = data.get("series", project.config.get("series", ""))
    for sc in data.get("scenes", []):
        ch = sc.get("chapter")
        if ch and width(series) + width(data.get("title", "")) + width(ch) > 36:
            warns.append(f"chapter「{ch}」が長く、上端の帯に収まりません。章名は省略して表示されます。全角{max(2, int(36 - width(series) - width(data.get('title', ''))))}字以内にすると全部出ます")
    if data.get("scenes") and data["scenes"][0].get("type") != "title":
        warns.append("最初の場面は title にすると、動画の冒頭で主題が伝わります")
    if data.get("scenes") and not data["scenes"][0].get("chapter"):
        warns.append("最初の場面に chapter を付けてください（YouTube のチャプターは 0:00 から始める必要があります）")
    if chapters < 3:
        warns.append(f"chapter が {chapters} 個です。YouTube のチャプターは3個以上で有効になります")
    if unknown_terms:
        sample = "、".join(f"{k}（{v}）" for k, v in list(unknown_terms.items())[:12])
        warns.append(f"読み方が辞書（lexicon.json）にない英字が {len(unknown_terms)} 語あります。エンジン任せの読みになります: {sample}")
    return data, errors, warns, chars


def cmd_check(args):
    project = Project(args.project)
    data, errors, warns, chars = check_episode(project, args.episode)
    for w in warns:
        print(f"注意: {w}")
    if errors:
        print("\n".join(f"NG: {e}" for e in errors))
        die(f"{len(errors)} 件の問題があります。台本を直してから、もう一度実行してください")
    n_lines = sum(1 for sc in data["scenes"] for ln in sc["lines"] if "text" in ln)
    print(f"OK: {len(data['scenes'])} 場面、{n_lines} 文、ナレーション {chars} 字（およそ {fmt_time(chars / 5.2)}。声と速さで1〜2割変わります）")


# ---------------------------------------------------------------- 音声エンジン

def http(url, data=None, timeout=120, headers=None, retries=0):
    """retries を指定すると、接続の失敗・タイムアウト・サーバー側のエラーのときに、間隔を空けてやり直す。"""
    for attempt in range(retries + 1):
        req = urllib.request.Request(url, data=data, headers=headers or {}, method="POST" if data is not None else "GET")
        try:
            with urllib.request.urlopen(req, timeout=timeout) as res:
                return res.read()
        except urllib.error.HTTPError as e:
            if e.code < 500 or attempt == retries:
                raise
        except (urllib.error.URLError, OSError):
            if attempt == retries:
                raise
        time.sleep(5 * (attempt + 1))


def engine_url(name):
    if name not in ENGINES:
        raise Problem(f"音声エンジン '{name}' は未対応です（{' / '.join(ENGINES)} / say）")
    return f"http://127.0.0.1:{ENGINES[name]['port']}"


def engine_alive(name):
    try:
        http(engine_url(name) + "/version", timeout=3)
        return True
    except (urllib.error.URLError, OSError):
        return False


def engine_start(name, wait=900):
    if engine_alive(name):
        return
    need("docker", "Docker Desktop を起動するか、VOICEVOX / AivisSpeech のアプリを開いてください")
    spec = ENGINES[name]
    port = spec["port"]
    exists = subprocess.run(["docker", "inspect", spec["container"]], capture_output=True).returncode == 0
    if exists:
        cmd = ["docker", "start", spec["container"]]
    else:
        # -v で渡す Mac 側のフォルダは先に作っておく（Docker に作らせると持ち主が変わることがある）
        for flag, value in zip(spec["run_args"], spec["run_args"][1:]):
            if flag == "-v":
                pathlib.Path(value.split(":")[0]).mkdir(parents=True, exist_ok=True)
        cmd = ["docker", "run", "-d", "--name", spec["container"], "-p", f"127.0.0.1:{port}:{port}", *spec["run_args"], spec["image"]]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise Problem(f"{name} を起動できませんでした: {r.stderr.strip()[:300]}")
    print(f"{name} を起動しています（初回は音声モデルのダウンロードで数分かかります）…", flush=True)
    t0 = time.time()
    while time.time() - t0 < wait:
        if engine_alive(name):
            print(f"{name} の準備ができました（{int(time.time() - t0)}秒）")
            return
        time.sleep(3)
    raise Problem(f"{name} が {wait} 秒たっても応答しません。`docker logs {spec['container']}` で状況を確認してください")


def cmd_engine(args):
    names = [args.name] if args.name else list(ENGINES)
    for name in names:
        engine_url(name)
        if args.action == "start":
            engine_start(name)
        elif args.action == "stop":
            subprocess.run(["docker", "stop", ENGINES[name]["container"]], capture_output=True)
            print(f"{name}: 停止しました")
        else:
            print(f"{name}: {'起動中' if engine_alive(name) else '停止中'}（ポート {ENGINES[name]['port']}）")


def cmd_speakers(args):
    engine_start(args.engine)
    base = engine_url(args.engine)
    speakers = json.loads(http(base + "/speakers"))
    for sp in speakers:
        styles = "、".join(f"{st['name']}={st['id']}" for st in sp["styles"])
        print(f"{sp['name']}: {styles}")
        if args.policy:
            info = json.loads(http(base + "/speaker_info?" + urllib.parse.urlencode({"speaker_uuid": sp["speaker_uuid"]})))
            policy = re.sub(r"\s+", " ", info.get("policy", "")).strip()
            print(f"    規約: {policy[:args.policy]}")


def to_standard_wav(src, dst):
    """どんな音声ファイルも 48kHz・モノラル・16bit の wav にそろえる。"""
    with wave.open(str(src), "rb") if str(src).endswith(".wav") else _NoWave() as w:
        if w and (w.getframerate(), w.getnchannels(), w.getsampwidth()) == (SAMPLE_RATE, 1, 2):
            if src != dst:
                shutil.copyfile(src, dst)
            return
    tmp = dst.with_suffix(".tmp.wav")
    run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-ar", str(SAMPLE_RATE), "-ac", "1", "-c:a", "pcm_s16le", str(tmp)])
    tmp.replace(dst)


class _NoWave:
    def __enter__(self):
        return None

    def __exit__(self, *a):
        return False


def kana_of(query):
    """エンジンが決めた読みを、カタカナで返す。アクセント句の区切りは「/」。

    VOICEVOX は kana にも読みを入れるが、AivisSpeech は kana に元の文をそのまま入れて返す。
    どちらでも読みが取れるよう、アクセント句（accent_phrases）の音から組み立てる。
    """
    parts = []
    for phrase in query.get("accent_phrases", []):
        sound = "".join(m.get("text", "") for m in phrase.get("moras", []))
        sound = sound.replace(",", "、").replace(".", "。")
        if phrase.get("pause_mora") and not sound.endswith(("、", "。")):
            sound += "、"
        parts.append(sound)
    return "/".join(parts) or query.get("kana", "")


def synth_compat(engine, voice, text, dst):
    """VOICEVOX 互換の API（VOICEVOX / AivisSpeech）で1文を合成する。エンジンが決めた読み（カナ）を返す。"""
    base = engine_url(engine)
    speaker = voice["speaker"]
    q = urllib.parse.urlencode({"text": text, "speaker": speaker})
    query = json.loads(http(f"{base}/audio_query?{q}", data=b"", retries=4))
    query.update({
        "speedScale": voice.get("speed", 1.0),
        "pitchScale": voice.get("pitch", 0.0),
        "intonationScale": voice.get("intonation", 1.0),
        "volumeScale": 1.0,
        # 文の前後の無音は最小にして、間はタイムライン側で管理する
        "prePhonemeLength": 0.05,
        "postPhonemeLength": 0.05,
        "outputSamplingRate": SAMPLE_RATE,
        "outputStereo": False,
    })
    if "pause" in voice:
        query["pauseLengthScale"] = voice["pause"]
    audio = http(f"{base}/synthesis?speaker={speaker}", data=json.dumps(query).encode(), headers={"Content-Type": "application/json"}, timeout=600, retries=4)
    dst.write_bytes(audio)
    to_standard_wav(dst, dst)
    return kana_of(query)


def synth_say(voice, text, dst):
    """macOS 標準の読み上げ。音声エンジンを入れる前の仮音声用。"""
    aiff = dst.with_suffix(".aiff")
    cmd = ["say", "-v", str(voice.get("speaker", "Kyoko")), "-o", str(aiff)]
    if voice.get("rate"):
        cmd += ["-r", str(voice["rate"])]
    run(cmd + [text])
    to_standard_wav(aiff, dst)
    aiff.unlink()
    return ""


def synthesize(project, voice, text):
    """1文を合成して (wavのパス, カナ読み) を返す。同じ声・同じ文は作り直さない。"""
    key = hashlib.sha1(json.dumps([2, voice, text], sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:20]
    cache = project.root / ".cache" / "vo"
    cache.mkdir(parents=True, exist_ok=True)
    wav, meta = cache / f"{key}.wav", cache / f"{key}.json"
    if wav.exists() and meta.exists():
        return wav, json.loads(meta.read_text(encoding="utf-8")).get("kana", ""), True
    engine = voice.get("engine", "voicevox")
    kana = synth_say(voice, text, wav) if engine == "say" else synth_compat(engine, voice, text, wav)
    meta.write_text(json.dumps({"voice": voice, "text": text, "kana": kana}, ensure_ascii=False), encoding="utf-8")
    return wav, kana, False


def read_pcm(path):
    with wave.open(str(path), "rb") as w:
        return w.readframes(w.getnframes())


def write_wav(path, pcm):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SAMPLE_RATE)
        w.writeframes(pcm)


def loudness_of(path):
    """ffmpeg の loudnorm で、統合ラウドネスなどを測る。"""
    r = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", str(path), "-map", "0:a:0", "-af",
         f"loudnorm=I={LOUDNESS['I']}:TP={LOUDNESS['TP']}:LRA={LOUDNESS['LRA']}:print_format=json", "-f", "null", "-"],
        capture_output=True, text=True)
    m = re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr)
    if not m:
        raise Problem(f"音量を測れませんでした: {r.stderr[-300:]}")
    return json.loads(m.group(0))


def normalize_loudness(src, dst):
    """ナレーションを YouTube の基準音量（-14 LUFS）にそろえる。

    全体の音量を上げ、基準を超える瞬間的なピークだけをリミッターで抑える。
    （ピークを抑えずに上げると、合成音声は子音のピークが邪魔をして -14 LUFS に届かない）
    """
    m = loudness_of(src)
    if m["input_i"] == "-inf":
        shutil.copyfile(src, dst)
        return
    gain = LOUDNESS["I"] - float(m["input_i"])
    limit = 10 ** ((LOUDNESS["TP"] - 0.5) / 20)
    tmp = pathlib.Path(dst).with_suffix(".norm.wav")
    for _ in range(3):
        af = f"volume={gain:.2f}dB,alimiter=limit={limit:.4f}:attack=5:release=50:level=0"
        run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-af", af, "-ar", str(SAMPLE_RATE), "-ac", "1", "-c:a", "pcm_s16le", str(tmp)])
        miss = LOUDNESS["I"] - float(loudness_of(tmp)["input_i"])
        if abs(miss) <= 0.3:
            break
        gain += miss  # リミッターで下がった分を足して、もう一度
    tmp.replace(dst)


# ---------------------------------------------------------------- 音声とタイムライン

def cmd_voice(args):
    project = Project(args.project)
    data, errors, warns, _ = check_episode(project, args.episode)
    for w in warns:
        print(f"注意: {w}")
    if errors:
        print("\n".join(f"NG: {e}" for e in errors))
        die("台本に問題があります。`check` が通るように直してください")
    need("ffmpeg", "`brew install ffmpeg` で入れてください")

    cfg = {**DEFAULTS, **{k: project.config[k] for k in DEFAULTS if k in project.config}}
    fps = cfg["fps"]
    spf = SAMPLE_RATE // fps  # 1コマあたりのサンプル数
    voice = {**project.config.get("voice", {}), **data.get("voice", {})}
    if args.voice:
        engine, _, speaker = args.voice.partition(":")
        voice.update({"engine": engine, "speaker": int(speaker) if speaker.isdigit() else speaker})
    if not voice.get("engine"):
        raise Problem("声が決まっていません。project.json の voice に engine と speaker を書くか、--voice voicevox:13 のように指定してください")
    if voice["engine"] != "say":
        engine_start(voice["engine"])

    frames = lambda sec: int(round(sec * fps))
    scenes_out, clips, readings = [], [], []
    cursor, made = 0, 0
    total_lines = sum(1 for sc in data["scenes"] for ln in sc["lines"] if "text" in ln)
    done = 0
    for sc in data["scenes"]:
        t = frames(sc.get("before", cfg["before"]))
        lines_out, events, marks = [], [], []
        last_gap = 0
        for j, ln in enumerate(sc["lines"]):
            if "wait" in ln:
                dur = frames(ln["wait"])
                if "step" in ln:
                    events.append({"at": t, "step": ln["step"], "duration": dur})
                t += dur
                last_gap = 0
                continue
            reading = project.reading(ln)
            wav, kana, cached = synthesize(project, voice, reading)
            made += not cached
            done += 1
            print(f"\r  音声 {done}/{total_lines}", end="", flush=True)
            pcm = read_pcm(wav)
            dur = math.ceil(len(pcm) / 2 / spf)
            clips.append((cursor + t, pcm))
            lines_out.append({"text": ln["text"], "from": t, "duration": dur})
            if "step" in ln:
                events.append({"at": t, "step": ln["step"], "duration": dur})
            if "mark" in ln:
                marks.append({"at": t + frames(ln.get("markAt", 0.0)), "target": ln["mark"]})
            unknown = project.unknown_terms(reading)
            readings.append((sc["id"], j, plain(ln["text"]), reading, kana, unknown))
            last_gap = frames(ln.get("pause", cfg["gap"]))
            t += dur + last_gap
        duration = t - (last_gap if "pause" not in sc["lines"][-1] else 0) + frames(sc.get("after", cfg["after"]))
        scenes_out.append({
            "id": sc["id"], "type": sc["type"], "chapter": sc.get("chapter"), "props": sc.get("props", {}),
            "from": cursor, "duration": duration, "lines": lines_out, "events": events, "marks": marks,
            "stepped": bool(events),
        })
        cursor += duration
    print()

    pub = project.public_dir(args.episode)
    pub.mkdir(parents=True, exist_ok=True)
    out = project.out_dir(args.episode)
    out.mkdir(parents=True, exist_ok=True)

    track = bytearray(cursor * spf * 2)
    for at, pcm in clips:
        start = at * spf * 2
        track[start:start + len(pcm)] = pcm
    raw = out / "narration_raw.wav"
    write_wav(raw, bytes(track))
    normalize_loudness(raw, pub / "narration.wav")
    raw.unlink()

    sections = [{"title": s["chapter"], "from": s["from"]} for s in scenes_out if s["chapter"]]
    meta = {
        "series": data.get("series", project.config.get("series", "")),
        "disclaimer": data.get("disclaimer", project.config.get("disclaimer", "")),
        "number": data.get("number"),
        "of": data.get("of", project.config.get("episodes")),
        "title": data["title"],
        "subtitle": data.get("subtitle", ""),
        "thumbnail": data.get("thumbnail", {}),
    }
    bgm = data.get("bgm", project.config.get("bgm"))
    timeline = {
        "episode": args.episode, "fps": fps, "width": cfg["width"], "height": cfg["height"],
        "totalFrames": cursor, "meta": meta, "audio": f"ep/{args.episode}/narration.wav", "bgm": bgm,
        "captions": data.get("captions", project.config.get("captions", True)),
        "sections": sections, "scenes": scenes_out,
    }
    (pub / "timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=1), encoding="utf-8")

    # 読みの確認表：エンジンが実際にどう読むか（カナ）を、聞く前に文字で確認できる
    rows = ["# 読みの確認表", "",
            f"声: {json.dumps(voice, ensure_ascii=False)}", "",
            "「エンジンの読み」に誤読がないか確認する。直すときは lexicon.json に用語を足すか、その行に `read` を書く。", "",
            "表の見方: 「/」はアクセントの区切り、「、」「。」は間。長音は母音で書かれる（成功＝セエコオ）。助詞の「は」は「ワ」、「を」は「オ」。",
            "1つの語の途中に「/」があれば、区切りを間違えている。読みが元の文のまま（漢字かな）なら、エンジンから読みを取れていない。", "",
            "| 場面 | 表示 | エンジンの読み | 辞書にない英字 |", "|---|---|---|---|"]
    for sid, j, text, reading, kana, unknown in readings:
        shown = kana or reading
        rows.append(f"| {sid}[{j}] | {text} | {shown} | {'、'.join(unknown)} |")
    (out / "readings.md").write_text("\n".join(rows) + "\n", encoding="utf-8")

    # 字幕（YouTube にアップロードする用）とチャプター
    def stamp(frame):
        ms = int(round(frame * 1000 / fps))
        return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"

    srt, n = [], 0
    for s in scenes_out:
        for ln in s["lines"]:
            n += 1
            a = s["from"] + ln["from"]
            srt += [str(n), f"{stamp(a)} --> {stamp(a + ln['duration'])}", plain(ln["text"]), ""]
    (out / "captions.srt").write_text("\n".join(srt), encoding="utf-8")
    (out / "chapters.txt").write_text("".join(f"{fmt_time(c['from'] / fps)} {c['title']}\n" for c in sections), encoding="utf-8")

    print(f"音声: {done} 文（新しく合成 {made}、再利用 {done - made}）")
    print(f"長さ: {fmt_time(cursor / fps)}（{cursor} コマ）")
    for s in scenes_out:
        print(f"  {fmt_time(s['from'] / fps):>5}  {s['duration'] / fps:5.1f}秒  {s['id']}（{s['type']}）")
    short = [c for a, c in zip(sections, sections[1:] + [{"from": cursor}]) if (c["from"] - a["from"]) / fps < 10]
    if sections and short:
        print("注意: 10秒未満のチャプターがあります。YouTube では各チャプター10秒以上が必要です")
    print(f"読みの確認表: {out / 'readings.md'}")
    print("次は読みの確認表を読んで誤読を直し、`render` で書き出します")


# ---------------------------------------------------------------- 書き出し

def remotion(project, *argv):
    need("npx", "Node.js を入れてください")
    r = subprocess.run(["npx", "remotion", *argv], cwd=project.root, capture_output=True, text=True)
    if r.returncode != 0:
        raise Problem("Remotion の書き出しに失敗しました:\n" + (r.stderr or r.stdout)[-1500:])
    return r.stdout


def acquire_render_slot():
    """書き出しの枠を1つ取る。このマシンで同時に走る書き出しを RENDER_SLOTS 本までにし、空くまで待つ。"""
    LOCK_DIR.mkdir(parents=True, exist_ok=True)
    waited = False
    while True:
        for i in range(RENDER_SLOTS):
            f = open(LOCK_DIR / f"render{i}.lock", "w")
            try:
                fcntl.flock(f, fcntl.LOCK_EX | fcntl.LOCK_NB)
                return f
            except BlockingIOError:
                f.close()
        if not waited:
            print("ほかの回の書き出しが終わるのを待っています（そのまま待ってください）…", flush=True)
            waited = True
        time.sleep(2)


def cmd_render(args):
    project = Project(args.project)
    pub = project.public_dir(args.episode)
    if not (pub / "timeline.json").exists():
        raise Problem("先に `voice` を実行して、音声とタイムラインを作ってください")
    timeline = load_json(pub / "timeline.json")
    out = project.out_dir(args.episode)
    out.mkdir(parents=True, exist_ok=True)
    props = json.dumps({"episode": args.episode})
    # 一部だけの書き出しは、完成した動画を上書きしないよう別の名前にする
    video = out / (f"{args.episode}.part.mp4" if args.frames else f"{args.episode}.mp4")
    lock = acquire_render_slot()  # 終わるまで持っておく（プロセスが終わると自動で外れる）
    t0 = time.time()
    print(f"動画を書き出しています（{fmt_time(timeline['totalFrames'] / timeline['fps'])}）…", flush=True)
    extra = ["--frames", args.frames] if args.frames else []
    remotion(project, "render", "src/index.ts", "Lecture", str(video), "--props", props, "--audio-bitrate", "192K", "--log", "error", *extra)
    print(f"  {video}（{int(time.time() - t0)}秒）")
    if not args.frames:
        thumb = out / "thumbnail.png"
        remotion(project, "still", "src/index.ts", "Thumbnail", str(thumb), "--props", props, "--log", "error")
        print(f"  {thumb}")
    print("次は `qa` でコマ画像と音量を確認します")


# ---------------------------------------------------------------- 確認

def qa_shots(timeline, scenes=None):
    """確認するコマを選ぶ。場面ごとに「各ステップが出そろった瞬間」と「最後のコマ」。(コマ番号, ラベル) の一覧を返す。"""
    shots = []
    for s in timeline["scenes"]:
        if scenes and s["id"] not in scenes:
            continue
        ats = sorted({e["at"] for e in s["events"]} | {m["at"] for m in s["marks"]})
        ends = [a - 2 for a in ats[1:] if a - 2 > 0] + [s["duration"] - 6]
        if s["type"] == "quiz":
            ends += [e["at"] + e["duration"] // 2 for e in s["events"] if e["step"] == 2]
        for k, local in enumerate(sorted(set(ends))):
            shots.append((s["from"] + local, f"{s['id']} #{k + 1}"))
    return shots


def make_sheets(files, shots, fps, folder):
    """コマ画像を4枚ずつ1枚の一覧にまとめる。(一覧のパス, どのコマがどこにあるか) の一覧を返す。

    画像に文字を焼き込むと ffmpeg の drawtext（入っていない環境が多い）が要るので、
    どのコマがどこにあるかは文字の一覧で示す。
    """
    sheets = []
    places = ["左上", "右上", "左下", "右下"]
    for n in range(0, len(files), 4):
        group = files[n:n + 4]
        sheet = folder / f"sheet{n // 4 + 1:02d}.jpg"
        inputs = [x for f in group for x in ("-i", str(f))]
        if len(group) == 1:
            shutil.copyfile(group[0], sheet)
        else:
            layout = "|".join(["0_0", "w0_0", "0_h0", "w0_h0"][:len(group)])
            run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex",
                 f"xstack=inputs={len(group)}:layout={layout}:fill=white", "-q:v", "3", str(sheet)])
        legend = "、".join(f"{places[k]}={shots[n + k][1]}（{fmt_time(shots[n + k][0] / fps)}）" for k in range(len(group)))
        sheets.append((sheet, legend))
    for f in files:
        f.unlink()
    return sheets


def cmd_preview(args):
    """動画を書き出さずに、qa と同じコマだけを画像にする。

    全体の書き出しは数分かかり、同じプロジェクトでは1本ずつ順番待ちになる。見た目の直しを繰り返す間は
    こちらで確かめ、問題がなくなってから render → qa で仕上げると、書き出しは1回で済む。
    """
    project = Project(args.project)
    pub = project.public_dir(args.episode)
    if not (pub / "timeline.json").exists():
        raise Problem("先に `voice` を実行して、音声とタイムラインを作ってください")
    timeline = load_json(pub / "timeline.json")
    need("node", "Node.js を入れてください（https://nodejs.org/）")
    need("ffmpeg", "`brew install ffmpeg` で入れてください")
    shots = qa_shots(timeline, args.scene)
    if not shots:
        raise Problem("その名前の場面がありません")
    folder = project.out_dir(args.episode) / "preview"
    if folder.exists():
        shutil.rmtree(folder)
    folder.mkdir(parents=True)
    t0 = time.time()
    print(f"確認用のコマ画像を作っています（{len(shots)} コマ）…", flush=True)
    thumb = folder / "thumbnail.png"
    # 画面の部品を1回だけまとめ、そのあと必要なコマだけを描く。回ごとに別のフォルダにまとめるので、同時に実行できる
    bundle_dir = project.root / ".cache" / "preview-bundle" / args.episode
    if bundle_dir.exists():
        shutil.rmtree(bundle_dir)
    bundle_dir.parent.mkdir(parents=True, exist_ok=True)
    remotion(project, "bundle", "src/index.ts", "--out-dir", str(bundle_dir), "--log", "error")
    cmd = ["node", str(SKILL_DIR / "scripts" / "stills.cjs"), str(bundle_dir), args.episode, str(folder), json.dumps([f for f, _ in shots])]
    if not args.scene:
        cmd.append(str(thumb))
    r = subprocess.run(cmd, cwd=project.root, capture_output=True, text=True)
    if r.returncode != 0:
        raise Problem("コマ画像を作れませんでした:\n" + (r.stderr or r.stdout)[-1500:])
    shutil.rmtree(bundle_dir, ignore_errors=True)
    files = [folder / f"f{i:03d}.jpg" for i in range(len(shots))]
    sheets = make_sheets(files, shots, timeline["fps"], folder)
    print(f"コマ画像の一覧（{len(shots)} コマ、4コマずつ1枚。{int(time.time() - t0)}秒）:")
    for sheet, legend in sheets:
        print(f"  {sheet}\n      {legend}")
    if thumb.exists():
        print(f"サムネイル: {thumb}")
    print("一覧の画像を開いて、文字のはみ出し・重なり・読みにくさ・字幕の改行を確認してください")
    print("直したら `voice` → `preview` を繰り返し、問題がなくなってから `render` → `qa` で仕上げます")


def cmd_qa(args):
    project = Project(args.project)
    timeline = load_json(project.public_dir(args.episode) / "timeline.json")
    out = project.out_dir(args.episode)
    video = out / f"{args.episode}.mp4"
    if not video.exists():
        raise Problem("先に `render` を実行してください")
    fps = timeline["fps"]
    # 場面を絞った確認は qa/partial/ に出す。全体のコマ画像（qa/sheetNN.jpg）は消さない
    qa = out / "qa" / "partial" if args.scene else out / "qa"
    if qa.exists():
        shutil.rmtree(qa)
    qa.mkdir(parents=True)

    shots = qa_shots(timeline, args.scene)
    files = []
    for i, (frame, label) in enumerate(shots):
        t = frame / fps
        dst = qa / f"f{i:03d}.jpg"
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", str(video), "-frames:v", "1", "-vf", "scale=960:-2", "-q:v", "3", str(dst)])
        files.append(dst)
    sheets = make_sheets(files, shots, fps, qa)

    m = loudness_of(video)
    dur = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(video)]).stdout)
    size = video.stat().st_size / 1e6
    i, tp = float(m["input_i"]), float(m["input_tp"])
    print(f"動画: {video.name}  {fmt_time(dur)}  {size:.1f}MB")
    ok_i = abs(i - LOUDNESS["I"]) <= 1.0
    print(f"音量: {i:.1f} LUFS（目標 {LOUDNESS['I']:.0f}±1）{'OK' if ok_i else '要調整'} / 最大ピーク {tp:.1f} dBTP {'OK' if tp <= -1.0 else '高すぎ'}")
    print(f"コマ画像の一覧（{len(shots)} コマ、4コマずつ1枚）:")
    for sheet, legend in sheets:
        print(f"  {sheet}\n      {legend}")
    print("一覧の画像を開いて、文字のはみ出し・重なり・読みにくさ・字幕の改行を確認してください")


# ---------------------------------------------------------------- 聴き比べ

def cmd_audition(args):
    project = Project(args.project)
    out = project.root / "out" / "_audition"
    out.mkdir(parents=True, exist_ok=True)
    text = project.reading({"text": args.text})
    cards = []
    for n, spec in enumerate(args.voices, 1):
        parts = spec.split(":")
        engine, speaker = parts[0], parts[1] if len(parts) > 1 else "Kyoko"
        voice = {"engine": engine, "speaker": int(speaker) if speaker.lstrip("-").isdigit() else speaker}
        for extra in parts[2:]:
            k, _, v = extra.partition("=")
            voice[k] = float(v)
        name = f"Mac 標準の読み上げ（{speaker}）"
        if engine != "say":
            engine_start(engine)
            for sp in json.loads(http(engine_url(engine) + "/speakers")):
                for st in sp["styles"]:
                    if st["id"] == voice["speaker"]:
                        name = f"{sp['name']}（{st['name']}）"
        wav, _, _ = synthesize(project, voice, text)
        dst = out / f"{n:02d}_{engine}_{speaker}.m4a"
        tmp = out / "tmp.wav"
        normalize_loudness(wav, tmp)
        run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp), "-c:a", "aac", "-b:a", "160k", str(dst)])
        tmp.unlink()
        cards.append((n, name, engine, spec, dst.name))
        print(f"  {n:2d}. {name}  [{spec}]")
    items = "\n".join(
        f'<li><div class="n">{n}</div><div><b>{html.escape(name)}</b><span>{html.escape(engine)} ／ 指定: <code>{html.escape(spec)}</code></span>'
        f'<audio controls preload="auto" src="{html.escape(fn)}"></audio></div></li>' for n, name, engine, spec, fn in cards)
    page = f"""<!doctype html><html lang="ja"><meta charset="utf-8"><title>声の聴き比べ</title>
<style>body{{font:16px/1.7 -apple-system,"Hiragino Sans",sans-serif;max-width:760px;margin:40px auto;padding:0 20px;color:#1d2b2f;background:#f4f7f6}}
h1{{font-size:26px;margin:0 0 4px}}p{{color:#5e6e73;margin:0 0 24px}}blockquote{{margin:0 0 28px;padding:14px 18px;background:#fff;border-left:4px solid #127a80}}
ul{{list-style:none;padding:0;margin:0}}li{{display:flex;gap:16px;padding:16px 0;border-top:1px solid #c9dcda}}
.n{{font:700 22px/40px ui-monospace,Menlo,monospace;width:40px;height:40px;text-align:center;border:2px solid #127a80;border-radius:50%;color:#127a80;flex:none}}
b{{display:block;font-size:18px}}span{{display:block;color:#5e6e73;font-size:13px;margin-bottom:8px}}audio{{width:100%}}code{{font-size:12px}}</style>
<h1>声の聴き比べ</h1><p>同じ文を、音量をそろえて読ませています。気に入った番号を教えてください。</p>
<blockquote>{html.escape(plain(args.text))}</blockquote><ul>{items}</ul></html>"""
    (out / "index.html").write_text(page, encoding="utf-8")
    print(f"聴き比べページ: {out / 'index.html'}")


def cmd_reading(args):
    """1文だけ、エンジンがどう読むかを表示する。read や lexicon.json を直すときに、音声を作らずに試せる。"""
    project = Project(args.project)
    if args.episode:
        project.use_episode_lexicon(load_json(project.episode_path(args.episode)))
    voice = dict(project.config.get("voice", {}))
    if args.voice:
        engine, _, speaker = args.voice.partition(":")
        voice.update({"engine": engine, "speaker": int(speaker) if speaker.isdigit() else speaker})
    if voice.get("engine") in (None, "say"):
        raise Problem("読みを表示できるのは voicevox と aivis だけです。--voice voicevox:13 のように指定してください")
    engine_start(voice["engine"])
    for text in args.text:
        sent = project.reading({"text": text})
        q = urllib.parse.urlencode({"text": sent, "speaker": voice["speaker"]})
        query = json.loads(http(f"{engine_url(voice['engine'])}/audio_query?{q}", data=b""))
        print(f"表示　　　　　: {plain(text)}")
        print(f"エンジンに渡す: {sent}")
        print(f"エンジンの読み: {kana_of(query)}")
        unknown = project.unknown_terms(sent)
        if unknown:
            print(f"辞書にない英字: {'、'.join(unknown)}")
        print()


def cmd_readings(args):
    """音声を作らずに、台本の全文について、エンジンがどう読むかを一覧にする。

    voice の前に誤読を直しておくと、合成のやり直しが減る。結果は voice と同じ out/<ep>/readings.md に書く。
    """
    project = Project(args.project)
    data, errors, warns, _ = check_episode(project, args.episode)
    if errors:
        print("\n".join(f"NG: {e}" for e in errors))
        die("台本に問題があります。`check` が通るように直してください")
    voice = {**project.config.get("voice", {}), **data.get("voice", {})}
    if voice.get("engine") in (None, "say"):
        raise Problem("読みを表示できるのは voicevox と aivis だけです")
    engine_start(voice["engine"])
    base = engine_url(voice["engine"])
    rows = ["# 読みの確認表（音声を作る前の下見）", "",
            "表の見方: 「/」はアクセントの区切り、「、」「。」は間。長音は母音で書かれる（成功＝セエコオ）。助詞の「は」は「ワ」、「を」は「オ」。",
            "1つの語の途中に「/」があれば、区切りを間違えている。", "",
            "| 場面 | 表示 | エンジンの読み | 辞書にない英字 |", "|---|---|---|---|"]
    n = 0
    for sc in data["scenes"]:
        for j, ln in enumerate(sc["lines"]):
            if "text" not in ln:
                continue
            sent = project.reading(ln)
            q = urllib.parse.urlencode({"text": sent, "speaker": voice["speaker"]})
            kana = kana_of(json.loads(http(f"{base}/audio_query?{q}", data=b"", retries=4)))
            rows.append(f"| {sc['id']}[{j}] | {plain(ln['text'])} | {kana} | {'、'.join(project.unknown_terms(sent))} |")
            n += 1
    out = project.out_dir(args.episode)
    out.mkdir(parents=True, exist_ok=True)
    (out / "readings.md").write_text("\n".join(rows) + "\n", encoding="utf-8")
    print(f"{n} 文の読みを書き出しました: {out / 'readings.md'}")
    print("誤読と、語の途中の「/」を直してから、`voice` で音声を作ります")


# ---------------------------------------------------------------- 切り離して実行する

def detach(args):
    """voice / render を切り離して実行する。ログと状態を out/<回>/ に書いて、すぐ戻る。

    時間のかかる工程を、呼び出した側の待ち時間の上限（10分など）に縛られずに走らせるため。終わるのは `wait` で待つ。
    """
    project = Project(args.project)
    out = project.out_dir(args.episode)
    out.mkdir(parents=True, exist_ok=True)
    log, status = out / f"{args.cmd}.log", out / f"{args.cmd}.status"
    argv = [sys.executable, str(pathlib.Path(__file__).resolve()), args.cmd, args.project, args.episode, "--status-file", str(status)]
    if getattr(args, "voice", None):
        argv += ["--voice", args.voice]
    if getattr(args, "frames", None):
        argv += ["--frames", args.frames]
    with open(log, "w") as fh:
        proc = subprocess.Popen(argv, stdout=fh, stderr=subprocess.STDOUT, stdin=subprocess.DEVNULL, start_new_session=True)
    status.write_text(f"running {proc.pid}\n", encoding="utf-8")
    print(f"`{args.cmd}` を切り離して実行しています（ログ: {log}）")
    print(f"終わるのを待つには: certvideo.py wait {args.project} {args.episode} {args.cmd}")


def cmd_wait(args):
    """切り離した voice / render が終わるのを待つ。終わったらログの最後を表示する。"""
    project = Project(args.project)
    out = project.out_dir(args.episode)
    log, status = out / f"{args.step}.log", out / f"{args.step}.status"
    if not status.exists():
        raise Problem(f"`{args.step} --detach` がまだ実行されていません")

    def state():
        parts = status.read_text(encoding="utf-8").split()
        st = parts[0] if parts else "running"
        if st == "running" and len(parts) > 1:
            try:
                os.kill(int(parts[1]), 0)
            except (ProcessLookupError, ValueError):
                time.sleep(1)  # ちょうど終わったところかもしれないので、状態を読み直す
                st = (status.read_text(encoding="utf-8").split() or ["running"])[0]
                if st == "running":
                    st = "failed"  # 状態を書かずに消えた（外から止められた、など）
            except PermissionError:
                pass
        return st

    t0 = time.time()
    st = state()
    while st == "running" and time.time() - t0 < args.timeout:
        time.sleep(2)
        st = state()
    text = log.read_text(encoding="utf-8", errors="replace").replace("\r", "\n") if log.exists() else ""
    lines = [ln for ln in text.splitlines() if ln.strip()]
    print("\n".join(lines[-40:]))
    if st == "running":
        print(f"（まだ実行中です。もう一度 `wait {args.project} {args.episode} {args.step}` を実行してください）")
        sys.exit(3)
    if st != "done":
        print(f"（`{args.step}` は失敗しました。上のログを確認してください）")
        sys.exit(1)


# ---------------------------------------------------------------- 初期化

def cmd_init(args):
    dst = pathlib.Path(args.project).resolve()
    if (dst / "package.json").exists():
        raise Problem(f"{dst} にはすでにプロジェクトがあります")
    if not TEMPLATE_DIR.exists():
        raise Problem(f"テンプレートが見つかりません: {TEMPLATE_DIR}")
    shutil.copytree(TEMPLATE_DIR, dst, dirs_exist_ok=True)
    print(f"{dst} にプロジェクトを作りました。パッケージを入れています（1〜2分）…", flush=True)
    need("npm", "Node.js を入れてください（https://nodejs.org/）")
    r = subprocess.run(["npm", "install", "--no-audit", "--no-fund"], cwd=dst, capture_output=True, text=True)
    if r.returncode != 0:
        raise Problem("npm install に失敗しました:\n" + r.stderr[-800:])
    print("準備ができました。project.json にシリーズ名と声を書き、episodes/ に台本を作ってください")


def main():
    ap = argparse.ArgumentParser(description="資格の解説動画を台本から書き出す")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("init")
    p.add_argument("project")
    p.set_defaults(fn=cmd_init)

    p = sub.add_parser("engine")
    p.add_argument("action", choices=["start", "stop", "status"])
    p.add_argument("name", nargs="?")
    p.set_defaults(fn=cmd_engine)

    p = sub.add_parser("speakers")
    p.add_argument("engine")
    p.add_argument("--policy", type=int, nargs="?", const=1200, default=0, help="利用規約も表示する（文字数。長い規約は 4000 など大きめに）")
    p.set_defaults(fn=cmd_speakers)

    p = sub.add_parser("audition")
    p.add_argument("project")
    p.add_argument("--text", required=True)
    p.add_argument("--voices", nargs="+", required=True, help="engine:speaker[:speed=1.1] の形で並べる")
    p.set_defaults(fn=cmd_audition)

    p = sub.add_parser("reading")
    p.add_argument("project")
    p.add_argument("text", nargs="+", help="試す文。`read` に書く文をそのまま渡してもよい")
    p.add_argument("--voice", help="project.json と違う声で試す（例: voicevox:13）")
    p.add_argument("--episode", help="その回の台本に書いた lexicon も使う")
    p.set_defaults(fn=cmd_reading)

    for name, fn in (("check", cmd_check), ("readings", cmd_readings), ("voice", cmd_voice), ("preview", cmd_preview), ("render", cmd_render), ("qa", cmd_qa)):
        p = sub.add_parser(name)
        p.add_argument("project")
        p.add_argument("episode")
        if name == "voice":
            p.add_argument("--voice", help="この回だけ声を変える（例: aivis:888753760）")
        if name == "render":
            p.add_argument("--frames", help="一部だけ書き出す（例: 0-299）。確認用")
        if name in ("voice", "render"):
            p.add_argument("--detach", action="store_true", help="切り離して実行し、すぐ戻る。終わるのは `wait` で待つ")
            p.add_argument("--status-file", help=argparse.SUPPRESS)
        if name in ("qa", "preview"):
            p.add_argument("--scene", nargs="*", help="この場面だけ確認する")
        p.set_defaults(fn=fn)

    p = sub.add_parser("wait")
    p.add_argument("project")
    p.add_argument("episode")
    p.add_argument("step", choices=["voice", "render"])
    p.add_argument("--timeout", type=int, default=540, help="待つ時間の上限（秒）。既定は9分")
    p.set_defaults(fn=cmd_wait)

    args = ap.parse_args()
    status_file = getattr(args, "status_file", None)

    def finish(state):
        if status_file:
            pathlib.Path(status_file).write_text(state + "\n", encoding="utf-8")

    try:
        if getattr(args, "detach", False):
            detach(args)
            return
        args.fn(args)
        finish("done")
    except Problem as e:
        finish("failed")
        die(str(e))
    except subprocess.CalledProcessError as e:
        finish("failed")
        die(f"{' '.join(map(str, e.cmd[:3]))} … が失敗しました:\n{(e.stderr or '')[-800:]}")
    except BaseException:
        finish("failed")
        raise


if __name__ == "__main__":
    main()

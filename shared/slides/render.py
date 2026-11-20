#!/usr/bin/env python3
"""スライド（pptx）を画像にして、目で確認するための一覧（2×2のグリッド）を作る。

pptx を1枚ずつの pptx に分け、macOS の Quick Look（qlmanage）でサムネイルにする。
PowerPoint や Keynote での実際の表示とは細部が違うことがあるが、文字のはみ出しや重なりは十分に見つけられる。

使い方:
  python3 shared/slides/render.py <deck.pptx> <出力フォルダ> [スライド番号 ...]
  例) python3 shared/slides/render.py CCA-F/CCA-F_キャッチアップ講座.pptx /tmp/qa        # 全スライド
      python3 shared/slides/render.py CCA-F/CCA-F_キャッチアップ講座.pptx /tmp/qa 5 6 12  # 指定のスライドだけ
出力: <出力フォルダ>/grid_NN.png（4枚ずつ。左上の桃色の数字がスライド番号）。Pillow が必要（pip install pillow）。
"""
import pathlib
import re
import shutil
import subprocess
import sys
import zipfile

from PIL import Image, ImageDraw


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 1
    src, out = pathlib.Path(argv[0]), pathlib.Path(argv[1])
    only = [int(a) for a in argv[2:]]
    singles, shots = out / "singles", out / "shots"
    for d in (singles, shots):
        shutil.rmtree(d, ignore_errors=True)
        d.mkdir(parents=True)
    for old in out.glob("grid_*.png"):
        old.unlink()
    z = zipfile.ZipFile(src)
    pres = z.read("ppt/presentation.xml").decode()
    ids = re.findall(r"<p:sldId [^>]*/>", pres)
    nums = only or list(range(1, len(ids) + 1))
    id_list = re.search(r"<p:sldIdLst>.*?</p:sldIdLst>", pres, re.S).group(0)
    files = []
    for n in nums:
        one = pres.replace(id_list, "<p:sldIdLst>" + ids[n - 1] + "</p:sldIdLst>")
        f = singles / f"s{n:02d}.pptx"
        with zipfile.ZipFile(f, "w", zipfile.ZIP_DEFLATED) as o:
            for item in z.infolist():
                o.writestr(item.filename, one if item.filename == "ppt/presentation.xml" else z.read(item.filename))
        files.append(f)
    subprocess.run(["qlmanage", "-t", "-s", "1600", "-o", str(shots)] + [str(f) for f in files], check=True, capture_output=True)
    imgs = [(n, Image.open(shots / f"s{n:02d}.pptx.png").convert("RGB")) for n in nums]
    w, h = 1000, 563
    for g in range(0, len(imgs), 4):
        chunk = imgs[g:g + 4]
        sheet = Image.new("RGB", (2 * w + 30, 2 * h + 30), "#888888")
        for k, (n, im) in enumerate(chunk):
            x, y = 10 + (k % 2) * (w + 10), 10 + (k // 2) * (h + 10)
            sheet.paste(im.resize((w, h)), (x, y))
            draw = ImageDraw.Draw(sheet)
            draw.rectangle([x, y, x + 46, y + 26], fill="#ff00ff")
            draw.text((x + 6, y + 6), str(n), fill="white")
        path = out / f"grid_{chunk[0][0]:02d}.png"
        sheet.save(path)
        print(path)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

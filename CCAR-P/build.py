#!/usr/bin/env python3
"""CCAR-P 問題集のビルド。

  python3 build.py                 # data/*.json を検証して index.html を生成
  python3 build.py --check FILE..  # 指定した JSON ファイルだけ検証
  python3 build.py --artifact OUT  # index.html に加えて、外枠なしの公開用ページも書き出す

本体は ../shared/quiz/build.py、画面のテンプレートは ../shared/quiz/app.html（どちらも全試験で共用）。
この試験の設定（名称、問題数、分野と配点）は exam.json にある。
"""
import pathlib
import runpy
import sys

ROOT = pathlib.Path(__file__).resolve().parent
sys.argv = [sys.argv[0], str(ROOT), *sys.argv[1:]]
runpy.run_path(str(ROOT.parent / "shared" / "quiz" / "build.py"), run_name="__main__")

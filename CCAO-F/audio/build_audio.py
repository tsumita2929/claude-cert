#!/usr/bin/env python3
"""CCAO-F 音声講座のビルド。script.txt を読み上げて、チャプター付きの CCAO-F_audio.m4a を作る。

  python3 audio/build_audio.py              # 既定（声 Kyoko、標準の速さ）
  python3 audio/build_audio.py --rate 200   # 少し速く
  python3 audio/build_audio.py --check      # 台本の書式と分量だけ確かめる（音声は作らない）

本体は ../../shared/audio/build_audio.py（全試験で共用）。台本の書式もそちらに書いてある。
"""
import pathlib
import runpy
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.argv = [sys.argv[0], str(ROOT), *sys.argv[1:]]
runpy.run_path(str(ROOT.parent / "shared" / "audio" / "build_audio.py"), run_name="__main__")

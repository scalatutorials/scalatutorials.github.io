#!/usr/bin/env bash
# Local development for scalatutorials.com
#
#   ./dev.sh         start Tailwind (watch) + Jekyll with live reload
#   ./dev.sh build   one-shot production build (CSS + site)
#
# Requires Ruby + Bundler (rvm/rbenv both fine). The Tailwind standalone
# binary is downloaded to .bin/ on first run — no Node/npm needed.
set -euo pipefail
cd "$(dirname "$0")"

TW=.bin/tailwindcss
if [ ! -x "$TW" ]; then
  case "$(uname -s)-$(uname -m)" in
    Darwin-arm64)  target=macos-arm64 ;;
    Darwin-x86_64) target=macos-x64 ;;
    Linux-aarch64) target=linux-arm64 ;;
    Linux-x86_64)  target=linux-x64 ;;
    *) echo "Unsupported platform: $(uname -s)-$(uname -m)"; exit 1 ;;
  esac
  echo "Downloading Tailwind standalone CLI ($target)..."
  mkdir -p .bin
  curl -fL -o "$TW" "https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-$target"
  chmod +x "$TW"
fi

if ! command -v bundle >/dev/null; then
  echo "Bundler not found. Install Ruby (rvm/rbenv/brew), then: gem install bundler"
  exit 1
fi
bundle check >/dev/null 2>&1 || bundle install

"$TW" --input assets/css/tailwind.css --output assets/css/site.css --minify

if [ "${1:-}" = "build" ]; then
  bundle exec jekyll build
  echo "Built to _site/. Remember to commit assets/css/site.css if it changed."
  exit 0
fi

"$TW" --input assets/css/tailwind.css --output assets/css/site.css --watch &
TW_PID=$!
trap 'kill "$TW_PID" 2>/dev/null || true' EXIT

bundle exec jekyll serve --livereload

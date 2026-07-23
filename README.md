# Scala Tutorials

[scalatutorials.com](https://scalatutorials.com) — interactive, bite-sized Scala
tutorials that run in the browser. The tour pairs each lesson with a live editor
powered by [Scastie](https://scastie.scala-lang.org), and targets **Scala 3**.

## Running locally

```sh
./dev.sh
```

That's it. The script:

1. downloads the [Tailwind CSS standalone CLI](https://tailwindcss.com/blog/standalone-cli)
   to `.bin/` on first run (no Node/npm needed),
2. installs the Jekyll gems via Bundler (`github-pages`, matching what GitHub Pages runs),
3. starts Tailwind in watch mode and `jekyll serve --livereload` on
   [http://localhost:4000](http://localhost:4000).

One-shot production build: `./dev.sh build`. If `assets/css/site.css` changed, commit it —
GitHub Pages doesn't run Tailwind, so the built stylesheet lives in the repo.

Prerequisite: Ruby with Bundler (rvm, rbenv, or Homebrew Ruby all work).

## How it's put together

- Plain Jekyll (built automatically by GitHub Pages from `master`), no theme framework.
- `_data/tour.yml` is the single source of truth for tour ordering — the Contents
  dialog, `/tour/` page, and prev/next links all derive from it. To add a lesson,
  drop a markdown file in `tour/` (front matter: `layout: tour`, `title`, `code`,
  optional `links`) and add one line to `_data/tour.yml`.
- The editor pane renders the lesson's `code` as a plain `<pre>`, which Scastie's
  `embedded.js` upgrades to a live editor (worksheet mode, Scala 3). If Scastie is
  down, the code is still readable.

## Contributing

Fork, edit, and send a pull request. For tutorial content, keep snippets runnable
in Scastie worksheet mode and valid Scala 3.

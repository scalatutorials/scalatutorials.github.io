# scalatutorials.com modernization — design spec

Date: 2026-07-23
Status: approved (user: "go for it, don't stop" — review gates waived)

## Goal

Make the tour's Run button work again (the old ScalaKata backend is dead), modernize the
2013-era jekyll-bootstrap/Bootstrap 2 site with vanilla Tailwind, update the tutorial content
to Scala 3, add a "What's new in Scala 3" section, and provide a local dev script.

## Decisions (user-approved)

1. **Generator:** keep Jekyll; classic GitHub Pages keeps building `master`. jekyll-bootstrap
   machinery is removed entirely.
2. **CSS:** Tailwind v4 via the standalone CLI; the built stylesheet is committed so the Pages
   deployment is untouched.
3. **Scala target:** Scala 3 for all snippets; Scastie embed pinned to Scala 3.
4. **Scope:** whole site (homepage, tour, TOC, about, blog restyle, 404) + prune boilerplate.

## Architecture

### Removed
- `_includes/JB/`, `_includes/themes/`, `assets/themes/` (Bootstrap 2, Flat UI, jQuery,
  ScalaKata assets), `Rakefile`, `_plugins/debug.rb`
- Boilerplate pages: `1_pages.html`, `2_categories.html`, `3_tags.html`, `4_archive.html`,
  `index-old.html`, `homepage_editor.html`
- Dead ga.js analytics include (no replacement unless user provides a GA4 ID)

### Added / rewritten
- **Layouts** (from scratch, Tailwind): `default` (shell: header nav + footer), `page`,
  `post`, `tour` (two-pane: lesson left, editor right; stacked on mobile)
- **Includes**: `header.html`, `footer.html`, editor include for the Scastie embed
- **`_data/tour.yml`** — single source of truth for tour ordering: list of
  `{file, title, topic, section}`. TOC page, in-tour TOC `<dialog>`, and prev/next links all
  derive from it. Per-page `pageNumber`/`nextPage`/`prevPage`/`isLast` front matter is deleted;
  pages keep `title`, `lead`, `code`, `links`.
- **Tailwind input** `assets/css/tailwind.css` (v4 syntax: `@import "tailwindcss"`, `@source`
  globs, `@plugin "@tailwindcss/typography"`), built to committed `assets/css/site.css`.
  Small component layer: `.callout` (replaces Bootstrap `.alert` markup inside markdown),
  base styles for `kbd`.
- **JS**: small vanilla script (no jQuery): native `<dialog>` TOC, localStorage
  visited-page tracking, Scastie embed bootstrapping with theme matching
  `prefers-color-scheme`.
- **`Gemfile`** with `github-pages` gem (local parity with Pages build), `dev.sh` local dev
  script: bundle install, download Tailwind standalone binary for the host platform on first
  run, then Tailwind `--watch` + `jekyll serve --livereload` together.

### Visual language
Vanilla Tailwind: system font stack, neutral zinc palette, Scala red (`#DC322F` family) as the
single accent, clean type scale, generous whitespace. Dark mode via `prefers-color-scheme`
only (no toggle). Explicitly excluded: eyebrow labels, gradient heroes, glassmorphism,
emoji-pill feature grids.

### Run button (Scastie embedded)
The editor pane renders the snippet as a plain `<pre>` first; `embedded.js` from
`https://scastie.scala-lang.org` upgrades it to a live editor (worksheet mode, Scala 3,
theme matched to color scheme). If Scastie is unreachable the plain code remains readable
(progressive enhancement). Exact Scala 3 embed parameter verified against current
embedded.js during implementation.

## Content

### Scala 3 fixes (main tour, ~31 pages)
Every snippet must compile on Scala 3 (compile-checked with `scala-cli` if available):
procedure syntax, `f(x)_` eta-expansion, `math.random`, structural-type reflection imports,
etc. Prose touched only where factually stale (fun-facts list, dead links such as
codebrew.io, http→https). Bootstrap markup inside markdown (`.alert`, old button HTML)
replaced with `.callout` / plain elements. 2013 blog posts restyled, content untouched.

### New section: "What's new in Scala 3" (~8 pages, same interactive format)
1. Intro/overview  2. Optional braces + new control syntax  3. Top-level definitions +
`@main`  4. Enums & ADTs  5. Extension methods  6. `given`/`using`  7. Union & intersection
types  8. Smaller niceties roundup (creator applications, `export`, trait parameters).
Own TOC group + homepage entry point.

## Error handling
- Scastie down → plain code block remains (progressive enhancement).
- toc/dialog JS failure → TOC page (`toc.html`) still works as a plain page.

## Testing / verification
- `jekyll build` clean locally with the `github-pages` gem.
- All tour snippets compile under Scala 3 (`scala-cli` when available).
- Click-through of tour navigation, TOC, homepage links in a real browser.
- Old URLs (`/tour/interactive_tour_of_scala_*.html`, `/tour/toc.html`) unchanged.

## Implementation order
1. Branch; commit spec.
2. Infra: Gemfile, dev.sh, Tailwind input, `_config.yml` cleanup, deletions.
3. Layouts/includes/JS; `_data/tour.yml`.
4. Tour page front-matter migration + Scala 3 code fixes.
5. New Scala 3 section pages.
6. Homepage, about, TOC, 404, post restyle.
7. Build CSS + site; compile-check snippets; browser verification; commit.

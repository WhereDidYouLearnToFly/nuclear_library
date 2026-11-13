# Blog — Working Reference

## Run locally

```
python -m http.server 8080 --directory D:\Projects\Blog
```
Then open `http://localhost:8080/en/index.html`

Opening HTML files directly by double-click also works for reading,
but the shared nav components need a server to load correctly.

---

## Imported articles (from YouTube)

Track progress in `ARTICLES_CHECKLIST.txt`. Russian is the master version;
the other languages are translated from it. Generator: `pipeline/import_articles.py`.

---

## Add a new article

**1. Create the file**

Copy `en/articles/radioactivity.html` → `en/articles/your-slug.html`

Update at the top:
- `<title>` tag
- breadcrumb text
- `.article-meta` — date, read time, difficulty
- `.article-title` and `.article-subtitle`
- tags at the bottom

**2. Register it in the index**

Add an entry to `articles.json` (order = display order, newest first):

```json
{
  "date": "2025.06.20",
  "title": "YOUR TITLE IN CAPS",
  "desc": "One sentence that makes someone want to read it",
  "url": "articles/your-slug.html",
  "tags": ["TAG1", "TAG2"]
}
```

The home page renders the list from this file automatically.

**3. Preview, then upload**

Open in browser, check it looks right, upload the new `.html` and
the updated `articles.json` to your host.

---

## Article components

### Section heading

```html
<h2>HEADING TEXT</h2>
```

Renders with `//` prefix automatically via CSS.

### Callout boxes

```html
<!-- Info / definition (green) -->
<div class="callout">
  <div class="callout-label">// DEFINITION</div>
  Your text here.
</div>

<!-- Warning / note (amber) -->
<div class="callout warning">
  <div class="callout-label">⚠ NOTE</div>
  Your text here.
</div>

<!-- Danger / hazard (red) -->
<div class="callout danger">
  <div class="callout-label">☢ HAZARD</div>
  Your text here.
</div>
```

Other label ideas: `// FUN FACT`, `// HISTORY`, `// MATH`, `⚡ KEY POINT`

### Formula / equation block

```html
<div class="formula">
  E = mc²
</div>
```

Plain text, centered, green monospace. Good enough for simple equations.
For complex multi-line math, add KaTeX later (see below).

### Inline emphasis

```html
<strong>term</strong>   — bright white, for key terms
<em>word</em>           — amber color, for subtle highlight (not italic)
<code>symbol</code>     — green monospace box, for notation
```

### Embedded video (self-hosted)

```html
<div class="embed-wrap">
  <div class="embed-label">ARCHIVE FOOTAGE // 1952</div>
  <video controls width="100%">
    <source src="../../assets/video/filename.mp4" type="video/mp4">
  </video>
</div>
```

Place video files in `assets/video/`. Re-encode with HandBrake before
uploading (RF 28, H.264, mono AAC 96kbps — see help section below).

### Embedded interactive (iframe)

```html
<div class="embed-wrap">
  <div class="embed-label">INTERACTIVE // CHART OF NUCLIDES</div>
  <iframe src="../../table/index.html" height="480"
          title="Interactive Chart of Nuclides"></iframe>
</div>
```

Adjust `height` as needed.

---

## Tags

Keep tags short, all caps. Suggested vocabulary:

| Tag | Use for |
|-----|---------|
| `FUNDAMENTALS` | Basic concepts, definitions |
| `HISTORY` | Historical events, people |
| `FISSION` | Fission reactions, reactors, bombs |
| `FUSION` | Fusion, stars, tokamaks |
| `DECAY` | Radioactive decay, half-life |
| `WEAPONS` | Bomb design, tests, arsenals |
| `REACTORS` | Power plants, design |
| `MEDICINE` | Medical applications |
| `BEGINNER` | No prior knowledge needed |
| `DEEP DIVE` | Technical or detailed |
| `ARCHIVE` | Video/document archive posts |

---

## Video compression (HandBrake)

Settings for 1950s archival footage before uploading:

```
Format:     MP4
Codec:      H.264 (x264)
Quality:    RF 26–28
Resolution: keep original, or scale to 480p max
Framerate:  same as source
Audio:      AAC, 96 kbps, Mono, Stereo Mixdown
```

Expected output: ~30–80 MB per 10-minute clip.

---

## Adding KaTeX (when needed)

For articles with real math, add to the `<head>`:

```html
<link rel="stylesheet" href="../../assets/katex/katex.min.css">
<script defer src="../../assets/katex/katex.min.js"></script>
<script defer src="../../assets/katex/auto-render.min.js"
  onload="renderMathInElement(document.body)"></script>
```

Download KaTeX from `katex.org` (Releases page) and place in
`assets/katex/`. Then write math inline with `$...$` or `$$...$$`.

---

## File structure

```
site/
├── help.md                   ← this file
├── ARCHITECTURE.md           ← project structure, CSS system, nav pattern
├── MAPS.md                   ← map tools reference
├── DATA.md                   ← data formats + encoding rules
├── I18N.md                   ← translation system
├── articles.json             ← article index (edit when adding posts)
├── en/ fr/ ru/ ua/           ← blog pages per language
│   ├── index.html
│   ├── about.html
│   └── articles/
├── table/                    ← Chart of Nuclides (tool)
├── powerplants/              ← Power Plant Map (tool)
├── detonations/              ← Nuclear Detonations Map (tool)
├── incidents/                ← Nuclear Incidents Map (tool)
└── assets/
    ├── css/
    │   ├── style.css         ← blog page styles (CSS variables)
    │   └── nav.css           ← shared nav for tool pages (hardcoded hex)
    ├── js/
    │   ├── nav.js            ← header/footer injection, all languages
    │   └── i18n.js           ← shared translations
    ├── video/                ← self-hosted video files
    └── katex/                ← math library (add when needed)
```

---

## Publishing

Upload the contents of the `site/` folder to your host via FTP or file manager.
Only files that changed need re-uploading:
- New article → upload the new `.html` + updated `articles.json`
- Style change → upload `assets/css/style.css`
- New video → upload the `.mp4` to `assets/video/`

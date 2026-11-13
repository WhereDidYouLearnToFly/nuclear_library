# ISOTOPEDIA — Architecture

## What it is

Static HTML/CSS/JS blog about nuclear physics. Fallout Terminal aesthetic.
No build step. Served with `python -m http.server 8080 --directory D:\Projects\Blog`.

---

## File structure

```
site/
├── en/ fr/ ru/ ua/          ← blog pages per language
│   ├── index.html           ← home page
│   ├── about.html           ← about page
│   └── articles/            ← article pages
│       └── *.html
├── table/                   ← interactive nuclide table (tool)
│   ├── index.html
│   ├── data.js
│   └── element-names.js
├── powerplants/             ← power plant map (tool)
│   ├── index.html
│   └── data.js
├── detonations/             ← nuclear detonations map (tool)
│   ├── index.html
│   └── data.js
├── incidents/               ← nuclear incidents map (tool)
│   ├── index.html
│   └── data.js
├── assets/
│   ├── css/
│   │   ├── style.css        ← blog-page styles (uses CSS variables)
│   │   └── nav.css          ← shared nav styles for tool pages (hardcoded hex)
│   └── js/
│       ├── nav.js           ← injects header + footer into every page
│       └── i18n.js          ← shared translations (used by blog pages)
├── help.md                  ← article authoring guide
├── ARCHITECTURE.md          ← this file
├── MAPS.md                  ← map tools reference
├── DATA.md                  ← data formats + encoding rules
└── I18N.md                  ← translation system
```

---

## Two page types

### Blog pages (`/en/`, `/fr/`, `/ru/`, `/ua/`)

- Load `../assets/css/style.css` — full palette + article CSS using CSS variables
- Load `/assets/js/nav.js` — injects `<header>` and `<footer>` via `DOMContentLoaded`
- Language detected from URL path (`/en/` → `en`, `/ru/` → `ru`, etc.)
- Lang switcher swaps the path prefix: `/en/about.html` ↔ `/fr/about.html`

### Tool pages (`/table/`, `/powerplants/`, `/detonations/`, `/incidents/`)

- Do NOT load `style.css` — they define their own `:root` variables inline
- Load `/assets/css/nav.css` — nav-specific styles with hardcoded hex values
  (nav.css uses hardcoded values, not CSS variables, to avoid palette conflicts
  e.g. `table/` uses a GitHub-dark blue/gray palette that would clash)
- Load `/assets/js/nav.js` — same injection pattern as blog pages
- Language detected from `?lang=` query param (default `en`)
- Lang switcher updates the `?lang=` param in place

---

## Nav injection (`assets/js/nav.js`)

`nav.js` listens for `DOMContentLoaded`, then:
1. Detects language (path vs `?lang=`)
2. Detects active page from `location.pathname`
3. Builds `<header>` HTML with site title, lang switcher, main nav, tools nav
4. Builds `<footer>` HTML
5. Replaces `<div id="site-header">` and `<div id="site-footer">` via `outerHTML`

Every page must have `<div id="site-header"></div>` near the top of `<body>`.

### Link helpers in nav.js

```js
langHref(lang)   // blog: swaps /en/ prefix; tool: updates ?lang= param
toolHref(path)   // adds ?lang=XX suffix when lang !== 'en'
a(page, href, label)  // returns <a> with class="active" when page matches
```

### Active page keys

| Key | Matches path |
|-----|-------------|
| `home` | `/index.html` |
| `about` | `/about` |
| `table` | `/table/` |
| `plants` | `/powerplants/` |
| `detonations` | `/detonations/` |
| `incidents` | `/incidents/` |
| `experiments` | `/experiments` |
| `articles` | `/articles/` |

---

## CSS hierarchy

```
style.css           ← blog palette via CSS variables, article components
nav.css             ← nav/header/footer, hardcoded hex, loaded by tool pages only
tool inline <style> ← tool-specific layout + colors (each tool's own :root)
```

**Blog palette** (defined in `style.css :root` and repeated in each tool's inline `:root`):

```
--bg:         #080c07    dark background
--surface:    #0e160c    panels / header
--border:     #1e3018    borders
--green:      #4ec94e    primary accent (green phosphor)
--green-dim:  #2a6b2a    muted green
--amber:      #d4820a    secondary accent
--text:       #c2d4b0    body text
--text-dim:   #6a8a5a    muted text
```

**Fonts** (Google Fonts CDN):
- `VT323` — display headers, site title, section headings
- `Share Tech Mono` — body text, nav links, data labels

---

## CRT scanline effect

```css
body::after {
  content: '';
  position: fixed; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px,
    rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px);
  pointer-events: none;
  z-index: 9999;
}
```

Present in detonations. Optional in other pages.

---

## Local development

```
python -m http.server 8080 --directory D:\Projects\Blog
```

Open `http://localhost:8080/en/index.html`

**Important**: always use the server, never open files directly. Nav injection
and relative asset paths only work under a real HTTP origin.

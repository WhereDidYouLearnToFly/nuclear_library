"""Import generated Markdown articles into the ISOTOPEDIA blog.

Reads  content/articles/{en,fr,ru,ua}/*.md
Writes site/{lang}/articles/<slug>.html   (same slug in every language,
                                           so the nav language switcher works)
Updates the home page site/{lang}/index.html between
<!-- ARTICLES:START --> and <!-- ARTICLES:END -->.

PUBLISHING: every article page is generated; slugs/languages in READY
(by default all of them) appear on the home page. Drafts are still reachable by direct URL for
preview (and carry a noindex tag). While a language has no ready articles,
its home page keeps the "Under construction" notice.

HAND EDITS: re-running regenerates the article HTML from Markdown. Once you
start editing an article's HTML (illustrations, fixes), add it to LOCKED:
its file is then never overwritten, but it still follows READY for the
home page list (the noindex tag is removed from it when it becomes ready).

Workflow:  edit HTML → add slug to LOCKED → when finished, add it to READY
           → run this script → upload the article + {lang}/index.html.

Usage:  python import_articles.py
"""
import html
import os
import re
import sys

import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "content", "articles")
BLOG = os.path.join(HERE, "..", "site")
LANGS = ["en", "fr", "ru", "ua"]

# Source file date + start of filename  ->  (slug, tags)
SLUGS = {
    "20170427": ("uk-nuclear-tests-part-1", ["WEAPONS", "HISTORY"]),
    "20170430": ("uk-nuclear-tests-part-2", ["WEAPONS", "HISTORY"]),
    "20170508 - Ядерные Взрывы Франции (часть-1)": ("france-nuclear-tests-part-1", ["WEAPONS", "HISTORY"]),
    "20170508 - Ядерные Взрывы Франции (часть-2)": ("france-nuclear-tests-part-2", ["WEAPONS", "HISTORY"]),
    "20171105": ("castle-bravo", ["WEAPONS", "FUSION", "HISTORY"]),
    "20171219": ("little-boy", ["WEAPONS", "FISSION"]),
    "20180103": ("fat-man", ["WEAPONS", "FISSION"]),
    "20180204": ("trinity-test", ["WEAPONS", "HISTORY"]),
    "20180310": ("operation-sandstone", ["WEAPONS", "HISTORY"]),
    "20180326": ("demon-core", ["FISSION", "HISTORY", "SAFETY"]),
    "20180511": ("ivy-mike", ["WEAPONS", "FUSION", "HISTORY"]),
    "20180627": ("neutron-bomb", ["WEAPONS", "FUSION"]),
    "20181231": ("mk-18-king", ["WEAPONS", "FISSION"]),
    "20190110": ("cannikin", ["WEAPONS", "HISTORY"]),
    "20190203": ("wigwam", ["WEAPONS", "HISTORY"]),
    "20190421": ("first-british-atomic-bomb", ["WEAPONS", "HISTORY"]),
    "20190507": ("windscale-fire", ["REACTORS", "SAFETY", "HISTORY"]),
    "20190716": ("the-conqueror", ["HISTORY", "SAFETY"]),
    "20190730": ("three-mile-island", ["REACTORS", "SAFETY"]),
    "20190908": ("fukushima", ["REACTORS", "SAFETY"]),
    "20191012": ("space-nuclear-explosions", ["WEAPONS", "HISTORY"]),
    "20191024": ("project-gnome", ["HISTORY", "FISSION"]),
    "20191119": ("atomic-cannon", ["WEAPONS", "HISTORY"]),
    "20191202": ("goiania-accident", ["SAFETY", "MEDICINE"]),
    "20191220": ("w88-warhead", ["WEAPONS", "FUSION"]),
    "20200205": ("sl-1-accident", ["REACTORS", "SAFETY"]),
    "20200221": ("orange-herald", ["WEAPONS", "HISTORY"]),
}

# Original YouTube video of each article (channel "Radiation Hazard").
CHANNEL_NAME = "Radiation Hazard"
CHANNEL_URL = "https://www.youtube.com/channel/UCocSPp2haPIl0_edFrDimPw"
VIDEOS = {
    "uk-nuclear-tests-part-1": "DiOEqEa-mYQ",
    "uk-nuclear-tests-part-2": "yokaTiAJ5MQ",
    "france-nuclear-tests-part-1": "Ano-C9Uvyls",
    "france-nuclear-tests-part-2": "tFyPdyE6_Qg",
    "castle-bravo": "WtN2BpC9pe4",
    "little-boy": "pb23zLZA8tU",
    "fat-man": "N2cmOZGRIew",
    "trinity-test": "4evKMs8__po",
    "operation-sandstone": "yVqkgIahUmk",
    "demon-core": "e3-IGaR5e5o",
    "ivy-mike": "H34ulMVnp0Q",
    "neutron-bomb": "LaC85dh8nJc",
    "mk-18-king": "QsBOa9ttXyw",
    "cannikin": "zK7hXJUoFO0",
    "wigwam": "ZzMFjifsTEk",
    "first-british-atomic-bomb": "bzXhWpy-uSU",
    "windscale-fire": "n3H9kFCC_Ls",
    "the-conqueror": "Y0fnCZLL-N4",
    "three-mile-island": "E__pLkt4-jA",
    "fukushima": "uF39Q9QwRxI",
    "space-nuclear-explosions": "GeLsK4VAIsM",
    "project-gnome": "Si2Z7eNn6QQ",
    "atomic-cannon": "9cedO50-2OY",
    "goiania-accident": "ezmvtBFRefI",
    "w88-warhead": "h3-niB5VHcs",
    "sl-1-accident": "_bDIXK30TlA",
    "orange-herald": "Uzf5pqafXA4",
}

SOURCE_TEXT = {
    "en": ("// SOURCE", "Based on the video {video} from the {channel} YouTube channel."),
    "fr": ("// SOURCE", "D'après la vidéo {video} de la chaîne YouTube {channel}."),
    "ru": ("// ИСТОЧНИК", "По материалам видео {video} с YouTube-канала {channel}."),
    "ua": ("// ДЖЕРЕЛО", "За матеріалами відео {video} з YouTube-каналу {channel}."),
}

# Slugs that are published on the home page. Default: everything, all languages.
# To hide one, set e.g. READY["castle-bravo"] = ["ru"]  (only RU listed).
READY = {slug: list(LANGS) for slug, _ in SLUGS.values()}

# Slugs whose HTML you have edited by hand: never overwritten.
# Map slug -> languages, e.g. "castle-bravo": ["en"].
LOCKED = {
}

# Shown on a home page while it has no ready articles (the original notice).
UNDER_CONSTRUCTION = {
    "en": ("SYSTEM STATUS", "⚠ UNDER CONSTRUCTION",
           "Articles and written content are being prepared. Interactive tools are already online."),
    "fr": ("ÉTAT DU SYSTÈME", "⚠ EN CONSTRUCTION",
           "Les articles et le contenu écrit sont en cours de préparation. Les outils interactifs sont déjà en ligne."),
    "ru": ("СТАТУС СИСТЕМЫ", "⚠ В РАЗРАБОТКЕ",
           "Статьи и текстовый контент готовятся. Интерактивные инструменты уже доступны."),
    "ua": ("СТАТУС СИСТЕМИ", "⚠ У РОЗРОБЦІ",
           "Статті та текстовий контент готуються. Інтерактивні інструменти вже доступні."),
}

BOOT = {
    "en": ("ARTICLES MODULE — LOADING", "ARTICLES MODULE ONLINE"),
    "fr": ("MODULE ARTICLES — CHARGEMENT", "MODULE ARTICLES EN LIGNE"),
    "ru": ("МОДУЛЬ СТАТЕЙ — ЗАГРУЗКА", "МОДУЛЬ СТАТЕЙ ЗАГРУЖЕН"),
    "ua": ("МОДУЛЬ СТАТЕЙ — ЗАВАНТАЖЕННЯ", "МОДУЛЬ СТАТЕЙ ЗАВАНТАЖЕНО"),
}

UI = {
    "en": dict(home="HOME", articles="ARTICLES", read="EST. READ TIME", min="MIN",
               end="END OF TRANSMISSION", section="ARTICLES"),
    "fr": dict(home="ACCUEIL", articles="ARTICLES", read="TEMPS DE LECTURE", min="MIN",
               end="FIN DE TRANSMISSION", section="ARTICLES"),
    "ru": dict(home="ГЛАВНАЯ", articles="СТАТЬИ", read="ВРЕМЯ ЧТЕНИЯ", min="МИН",
               end="КОНЕЦ ПЕРЕДАЧИ", section="СТАТЬИ"),
    "ua": dict(home="ГОЛОВНА", articles="СТАТТІ", read="ЧАС ЧИТАННЯ", min="ХВ",
               end="КІНЕЦЬ ПЕРЕДАЧІ", section="СТАТТІ"),
}

# Hand-written articles that exist only in some languages (kept in the list)
EXTRA = {
    "en": [dict(date="2025.06.20", title="WHAT IS RADIOACTIVITY?",
                desc="Why atoms fall apart — and why that's actually useful",
                slug="radioactivity", tags=["FUNDAMENTALS", "DECAY", "BEGINNER"])],
}

GREEK = {r"\alpha": "α", r"\beta": "β", r"\gamma": "γ", r"\mu": "μ", r"\to": "→",
         r"\rightarrow": "→", r"\times": "×", r"\approx": "≈", r"\sim": "~", r"\cdot": "·"}


def latex_to_html(expr: str) -> str:
    """Convert the small inline LaTeX the LLM produced ($^{240}\\text{Pu}$ etc.)."""
    s = expr
    for k, v in GREEK.items():
        s = s.replace(k, v)
    s = re.sub(r"\\(?:text|mathrm)\{([^}]*)\}", r"\1", s)
    s = re.sub(r"\^\{([^}]*)\}", r"<sup>\1</sup>", s)
    s = re.sub(r"\^(.)", r"<sup>\1</sup>", s)
    s = re.sub(r"_\{([^}]*)\}", r"<sub>\1</sub>", s)
    s = re.sub(r"_(.)", r"<sub>\1</sub>", s)
    return s.replace("\\", "").replace("{", "").replace("}", "")


def find_slug(fname: str):
    for key in sorted(SLUGS, key=len, reverse=True):
        if fname.startswith(key):
            return key
    return None


def split_title(md_text: str):
    lines = md_text.strip().splitlines()
    for i, line in enumerate(lines):
        m = re.match(r"^#{1,3}\s+(.*)", line)
        if m:
            title = m.group(1).strip().strip("*")
            return title, "\n".join(lines[i + 1:])
        if line.strip():
            break
    return "UNTITLED", md_text


def first_paragraph(body: str) -> str:
    for block in re.split(r"\n\s*\n", body):
        b = block.strip()
        if b and not b.startswith(("#", "*", "-", "|", ">")) and not re.match(r"\d+\.", b):
            text = re.sub(r"\$([^$]+)\$", lambda m: re.sub("<[^>]+>", "", latex_to_html(m.group(1))), b)
            text = re.sub(r"[*_`]", "", text)
            first = re.split(r"(?<=[.!?])\s", text)[0]
            return first if len(first) <= 200 else first[:197].rsplit(" ", 1)[0] + "…"
    return ""


def render_body(body: str) -> str:
    # Protect inline math from the Markdown parser, then restore as HTML.
    maths = []

    def stash(m):
        maths.append(latex_to_html(m.group(1)))
        return f"\x00{len(maths) - 1}\x00"

    body = re.sub(r"\$([^$\n]+)\$", stash, body)
    # Every heading in the body becomes h2 (### -> h3), never h1.
    body = re.sub(r"^#\s+", "## ", body, flags=re.M)
    out = markdown.markdown(body, extensions=["extra", "sane_lists"])
    out = re.sub(r"\x00(\d+)\x00", lambda m: maths[int(m.group(1))], out)
    # The blog's h2 style expects caps; strip bold wrappers inside headings.
    out = re.sub(r"<h([23])>(?:<strong>)?(.*?)(?:</strong>)?</h\1>",
                 lambda m: f"<h{m.group(1)}>{m.group(2).upper()}</h{m.group(1)}>", out)
    return "\n".join("    " + line if line else "" for line in out.splitlines())


def source_html(lang, slug, video_title):
    vid = VIDEOS.get(slug)
    if not vid:
        return ""
    label, text = SOURCE_TEXT[lang]
    video = (f'<a href="https://www.youtube.com/watch?v={vid}" target="_blank" rel="noopener">'
             f'«{html.escape(video_title)}»</a>')
    channel = f'<a href="{CHANNEL_URL}" target="_blank" rel="noopener">{CHANNEL_NAME}</a>'
    return (f'\n\n    <div class="callout">\n      <div class="callout-label">{label}</div>\n'
            f'      {text.format(video=video, channel=channel)}\n    </div>')


def build_page(lang, slug, date, title, subtitle, body_html, minutes, tags, draft, source=""):
    ui = UI[lang]
    t_main = html.escape(title.upper())
    crumb = html.escape(title.upper() if len(title) < 60 else title.upper()[:57] + "…")
    sub_html = f'\n    <p class="article-subtitle">\n      {html.escape(subtitle)}\n    </p>' if subtitle else ""
    tags_html = "\n".join(f'      <span class="tag">{t}</span>' for t in tags)
    return f"""<!DOCTYPE html>
<html lang="{'uk' if lang == 'ua' else lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{html.escape(title)} // ISOTOPEDIA</title>
{'<meta name="robots" content="noindex">' + chr(10) if draft else ''}<link rel="stylesheet" href="../../assets/css/style.css">
<script src="/assets/js/nav.js"></script>
</head>
<body>
<!-- {'DRAFT' if draft else 'READY'}: imported from content/articles/{lang} by import_articles.py.
     Machine-generated text: check facts before publishing. -->

<div id="site-header"></div>

<main>

  <div class="prompt" style="margin-bottom:24px">
    > <a href="../index.html" style="color:var(--green-dim);text-decoration:none">{ui['home']}</a>
    / <a href="../index.html#articles" style="color:var(--green-dim);text-decoration:none">{ui['articles']}</a>
    / <span style="color:var(--text-dim)">{crumb}</span>
  </div>

  <!-- Article header -->
  <div class="article-header">
    <div class="article-meta">
      <span>{date}</span>
      <span>// {ui['read']}: {minutes} {ui['min']}</span>
    </div>
    <h1 class="article-title glow">{t_main}</h1>{sub_html}
  </div>

  <hr class="terminal">

  <!-- Article body -->
  <div class="article-body">

{body_html}{source}

  </div>

  <hr class="terminal">

  <!-- Article footer -->
  <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--text-dim)">
    <span>> {ui['end']}</span>
    <div style="display:flex;gap:16px">
{tags_html}
    </div>
  </div>

</main>

<div id="site-footer"></div>
</body>
</html>
"""


def card(a):
    tags = "".join(f'<span class="tag">{t}</span>' for t in a["tags"])
    return f"""    <a class="article-card" href="articles/{a['slug']}.html">
      <div class="card-date">{a['date']}</div>
      <div class="card-body">
        <div class="card-title">{html.escape(a['title'])}</div>
        <div class="card-desc">{html.escape(a['desc'])}</div>
        <div class="card-tags">{tags}</div>
      </div>
    </a>
"""


def update_index(lang, articles):
    path = os.path.join(BLOG, lang, "index.html")
    with open(path, encoding="utf-8") as f:
        page = f.read()
    items = sorted(articles + EXTRA.get(lang, []), key=lambda a: a["date"], reverse=True)

    if items:
        block = (f'  <div class="section-label" id="articles">{UI[lang]["section"]}</div>\n\n'
                 f'  <div class="article-list" style="margin-top:16px">\n\n'
                 + "\n".join(card(a) for a in items) + '\n  </div>\n')
        boot = f'<div class="boot-line ok" data-articles>{BOOT[lang][1]} — {len(items)}</div>'
    else:
        label, title, text = UNDER_CONSTRUCTION[lang]
        block = (f'  <div class="section-label">{label}</div>\n\n'
                 f'  <div class="callout warning">\n'
                 f'    <div class="callout-label">{title}</div>\n'
                 f'    {text}\n  </div>\n')
        boot = f'<div class="boot-line warn" data-articles>{BOOT[lang][0]}</div>'
    block = ('<!-- ARTICLES:START (generated by pipeline/import_articles.py) -->\n'
             + block + '\n  <!-- ARTICLES:END -->')

    # Boot line: first run matches the original warn line, later runs the tagged one.
    page, n = re.subn(r'<div class="boot-line (?:warn|ok)" data-articles>[^<]*</div>', boot, page)
    if not n:
        page, n = re.subn(r'<div class="boot-line warn">[^<]*</div>', boot, page, count=1)

    if "<!-- ARTICLES:START" in page:
        page = re.sub(r"<!-- ARTICLES:START.*?<!-- ARTICLES:END -->", lambda _: block, page, flags=re.S)
    else:
        # First run: replace the original status section (1st section-label up to the 2nd).
        idx = [m.start() for m in re.finditer(r'  <div class="section-label">', page)]
        if len(idx) < 2:
            sys.exit(f"Can't find insertion point in {path}")
        page = page[:idx[0]] + "  " + block + "\n\n" + page[idx[1]:]
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(page)


def main():
    for lang in LANGS:
        src_dir = os.path.join(SRC, lang)
        out_dir = os.path.join(BLOG, lang, "articles")
        os.makedirs(out_dir, exist_ok=True)
        listed = []
        for fname in sorted(os.listdir(src_dir)):
            if not fname.endswith(".md"):
                continue
            key = find_slug(fname)
            if key is None:
                print(f"  ! no slug for {lang}/{fname} — add it to SLUGS")
                continue
            slug, tags = SLUGS[key]
            with open(os.path.join(src_dir, fname), encoding="utf-8") as f:
                md_text = f.read()
            title, body = split_title(md_text)
            main_t, _, subtitle = title.partition(": ")
            if not subtitle:
                main_t, subtitle = title, ""
            d = fname[:8]
            date = f"{d[:4]}.{d[4:6]}.{d[6:8]}"
            minutes = max(1, round(len(body.split()) / 200))
            ready = lang in READY.get(slug, [])
            out_path = os.path.join(out_dir, slug + ".html")
            if lang in LOCKED.get(slug, []) and os.path.exists(out_path):
                if ready:  # hand-edited file goes live: drop the draft noindex tag
                    with open(out_path, encoding="utf-8") as f:
                        page = f.read()
                    page = page.replace('<meta name="robots" content="noindex">\n', "")
                    with open(out_path, "w", encoding="utf-8", newline="\n") as f:
                        f.write(page)
            else:
                video_title = fname[11:-3].replace("＂", '"').strip()  # "YYYYMMDD - <title>.md"
                page = build_page(lang, slug, date, main_t, subtitle, render_body(body), minutes, tags,
                                  not ready, source_html(lang, slug, video_title))
                with open(out_path, "w", encoding="utf-8", newline="\n") as f:
                    f.write(page)
            if not ready:
                continue
            listed.append(dict(date=date, title=main_t.upper(), slug=slug, tags=tags,
                               desc=subtitle or first_paragraph(body)))
        update_index(lang, listed)
        print(f"{lang}: {len(listed)} ready on home page")


if __name__ == "__main__":
    main()

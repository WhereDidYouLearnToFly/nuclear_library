# Notes for Claude

See README.md for the layout. Details in docs/ (help.md = authoring guide,
ARCHITECTURE.md, MAPS.md, DATA.md, I18N.md).

## Article workflow (agreed with the owner)

- The 27 imported articles in `site/{en,fr,ru,ua}/articles/` were written by a local LLM,
  each language **separately** from the transcript, so they are not translations of
  each other and contain factual errors.
- **Russian is the master.** The owner rereads, fixes and illustrates the RU article.
  Then Claude translates that RU article into EN, FR and UA (replacing the generated
  text), places the same pictures in the same spots, keeps the source box, and adds
  the slug for all 4 languages to `LOCKED` in `pipeline/import_articles.py`.
- Images go in `site/assets/img/<slug>/`, shared by all languages.
- After locking/translating, tick steps 4 and 5 in `docs/ARTICLES_CHECKLIST.txt`
  (fixed-width text, UTF-8 with BOM, CRLF — the owner edits it in Far Manager).
- Re-running `pipeline/import_articles.py` regenerates every unlocked article page.

## Other facts

- Maps use Esri World_Dark_Gray_Base tiles; CARTO basemaps now return an
  "API KEY REQUIRED" watermark without a key.
- Source videos (channel "Radiation Hazard") are archived at
  `F:\Archive\YouTube\Radiation Hazard\` — not in git.
- The site uses root-relative paths; serve `site/` as the web root.

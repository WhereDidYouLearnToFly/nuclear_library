# ISOTOPEDIA — Nuclear Library

A static, multilingual (EN / FR / RU / UA) educational site about nuclear physics,
nuclear weapons history and nuclear accidents, styled like a retro terminal.
No build step: plain HTML, CSS and JavaScript.

## Layout

| Folder | What it holds |
|--------|---------------|
| `site/` | The website. Upload the **contents** of this folder to the web root. |
| `docs/` | Working notes: authoring guide, architecture, maps, data formats, translations, the article checklist. |
| `pipeline/` | Scripts that turn YouTube videos into articles. |
| `content/` | Pipeline inputs: video transcripts and the generated Markdown articles. |

## Run locally

```
python -m http.server 8080 --directory site
```

Open <http://localhost:8080/en/index.html>. The site uses root-relative paths
(`/assets/...`), so it must be served from the web root, not a subfolder.

## Tools on the site

- **Nuclide table**: all 3,436 known nuclides (NUBASE2016)
- **Power plant map**, **detonations map**, **incidents map** (Leaflet, Esri dark-gray tiles)

## Article pipeline

1. `pipeline/download_channel.py <channel-url>`: downloads the videos with yt-dlp
2. `pipeline/transcribe_videos.py <folder>`: speech-to-text transcripts (`content/transcripts/`)
3. `pipeline/generate_articles.py <folder>`: a local LLM via Ollama writes one Markdown article per language (`content/articles/`)
4. `pipeline/import_articles.py`: converts them into site pages and rebuilds the article lists on the home pages

Articles are based on videos by the YouTube channel
[Radiation Hazard](https://www.youtube.com/channel/UCocSPp2haPIl0_edFrDimPw);
every article links its source video. The videos themselves are not stored in this repository.

Progress on reviewing, illustrating and translating each article is tracked in
`docs/ARTICLES_CHECKLIST.txt`.

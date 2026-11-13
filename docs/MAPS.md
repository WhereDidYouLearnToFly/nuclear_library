# Map Tools — Reference

Three interactive Leaflet.js maps, each in its own root subfolder.
All share the same structural pattern; see differences below.

---

## Common pattern

### HTML structure

```html
<div class="app-body">
  <div id="sidebar">...</div>   ← always LEFT (first in DOM)
  <div id="map"></div>          ← fills remaining space
</div>
```

### CSS layout

```css
html, body { height: 100%; overflow: hidden; }
body { display: flex; flex-direction: column; }   /* NOT html — breaks height */
.app-body { display: flex; flex: 1; overflow: hidden; }
#sidebar { width: Xpx; flex-shrink: 0; border-right: 1px solid var(--border); }
#map { flex: 1; }
```

### Leaflet initialization

```js
const map = L.map('map', { center: [25, 10], zoom: 2, minZoom: 2, maxZoom: 10 });
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
  maxZoom: 16,
}).addTo(map);
```

**Do not use CARTO basemaps** (`basemaps.cartocdn.com`): since late 2026 they serve an "API KEY REQUIRED" watermark tile without a key. Note Esri uses `{z}/{y}/{x}` order (y before x).
Do not use `maxBounds` or `worldCopyJump: false` — both working maps omit these.

### Sidebar sources section

Each map has a `.sb-sources` block pinned at the sidebar bottom (`flex-shrink: 0`).
CSS lives in the page's inline `<style>`. See `ARCHITECTURE.md` for CSS classes.

---

## Power Plant Map (`/powerplants/`)

**Data:** `PLANTS` array — ~130 plants worldwide  
**Marker:** amber circle, size = `sqrt(capacity_mwe / 200)` clamped 4–16px  
**Filters:** Status (operating / construction / shutdown), Reactor type, Country  
**Popup:** plant name, type, capacity MWe, status, year  
**Sources:** IAEA PRIS, World Nuclear Association, Wikipedia

### Reactor types

`PWR` `BWR` `VVER` `CANDU` `RBMK` `AGR` `BN` `PHWR` `EPR` `AP1000` `OTHER`

---

## Detonations Map (`/detonations/`)

**Data:** `DETONATIONS` array — 110+ tests across all nations  
**Marker:** colored circle per country, size = `log10(yield_kt + 1) * 5` clamped 4–22px  
**Grouping:** one marker per `site` (field index 7). Popup scrolls through all tests at that site.  
**Filters:** Country (colored chips), Delivery type (chips), Decade (chips)  
**Popup:** site name (translated), list of tests with year / yield / delivery / notable tag  
**Sources:** Johnston's Archive, CTBTO, SIPRI, Wikipedia

### Site name translation

`SITE_NAMES` object in `index.html` inline script:
```js
const SITE_NAMES = {
  fr: { "Nevada Test Site": "Site d'essais du Nevada", ... },
  ru: { "Nevada Test Site": "Невадский испытательный полигон", ... },
  ua: { ... },
  // NO 'en' key — fallback to the English name in data.js
};
```

### Notable tag translation

`NOTABLE_TRANS` object in `index.html`:
```js
const NOTABLE_TRANS = {
  fr: { "First nuclear detonation": "Première détonation nucléaire", ... },
  ru: { "First nuclear detonation": "Первое ядерное испытание", ... },
  ua: { ... },
};
```

Test name auto-translation: if `name.startsWith(siteName)`, the site-name prefix is
replaced with the translated site name. Suffix stays in English.

---

## Incidents Map (`/incidents/`)

**Data:** `INCIDENTS` array — 62 incidents, 4 categories  
**Marker:** colored circle by INES level, size = `5 + ines * 2.5` (unrated = 8px)  
**Grouping:** one marker per `site` (field index 8).  
**Filters:** INES level (toggle rows with color dots), Category (chips), Decade (chips), Country (chips)  
**Popup:** site name (translated), list of incidents each with INES bar + category badge + description  
**Sources:** IAEA INES Database, NRC Event Reports, IAEA Radiological Accident Reports, Wikipedia

### Categories

| Key | Meaning |
|-----|---------|
| `reactor` | Reactor accidents and meltdowns |
| `criticality` | Uncontrolled fission chain reactions |
| `broken_arrow` | Military accidents involving nuclear weapons |
| `lost_source` | Lost, stolen, or orphaned radioactive sources |

### INES scale

| Level | Name | Examples |
|-------|------|---------|
| 7 | Major accident | Chernobyl, Fukushima |
| 6 | Serious accident | Kyshtym |
| 5 | Accident | Windscale, TMI, Chalk River |
| 4 | Accident | SL-1, Tokaimura, Goiânia |
| 3 | Serious incident | Browns Ferry, Vandellos |
| 2 | Incident | Forsmark, Lilo |
| 1 | Anomaly | minor deviations |
| 0 | Below scale | no safety significance |
| null | Unrated | pre-1990 events, broken arrows |

---

## Adding a new map

1. Create `/<name>/data.js` — ASCII only (see `DATA.md`)
2. Create `/<name>/index.html` — copy structure from `incidents/index.html`
3. Add `<link rel="stylesheet" href="/assets/css/nav.css">` in `<head>`
4. Add nav keys to `assets/js/nav.js`:
   - Add translation key to TR for all 4 languages
   - Add path detection in `active` computation
   - Add `${a('key', toolHref('/name/index.html'), tr.key)}` in the tools nav row

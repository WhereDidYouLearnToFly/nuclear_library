# Data Files — Formats & Rules

## Critical encoding rule

**All `.js` data files must contain ASCII text only. No Cyrillic, no special characters.**

**Why:** Python's `http.server` does not send `charset=utf-8` in the `Content-Type` header
for `.js` files. The browser uses a default encoding (often latin-1), which breaks any
multi-byte characters and causes a parse error. The entire array becomes `undefined` and
the map shows nothing.

**Fix:** All translated strings (Cyrillic site names, translated labels) live inside
`<script>` blocks directly in the corresponding `index.html`. HTML files declare
`<meta charset="UTF-8">` in `<head>`, which covers all inline script content.

```
data.js      ← ASCII only: English names, numbers, codes
index.html   ← Cyrillic and all translations safe here (meta charset covers it)
```

---

## powerplants/data.js

```js
// PLANTS[i] = [name, country_code, lat, lon, type, capacity_mwe, status, year_operational]
const PLANTS = [
  ["Gravelines",  "FR", 51.01, 2.13, "PWR", 5460, "operating", 1980],
  ...
];
```

| Index | Field | Type | Notes |
|-------|-------|------|-------|
| 0 | name | string | Plant name, ASCII |
| 1 | country | string | 2-letter code (see COUNTRY_META) |
| 2 | lat | number | Latitude |
| 3 | lon | number | Longitude |
| 4 | type | string | `PWR` `BWR` `VVER` `CANDU` `RBMK` `AGR` `BN` `PHWR` `OTHER` |
| 5 | capacity_mwe | number | Total site capacity in MWe |
| 6 | status | string | `operating` `construction` `shutdown` |
| 7 | year | number | Year first unit went online |

Marker size: `Math.sqrt(capacity / 200)` clamped 4–16px (amber circles).

---

## detonations/data.js

```js
// DETONATIONS[i] = [name, country_code, lat, lon, year, yield_kt, delivery, site, notable]
const DETONATIONS = [
  ["Trinity",  "US", 33.68, -106.48, 1945, 21, "tower", "Trinity", "First nuclear detonation"],
  ...
];
```

| Index | Field | Type | Notes |
|-------|-------|------|-------|
| 0 | name | string | Test name, ASCII |
| 1 | country | string | 2-letter code: `US` `SU` `RU` `FR` `GB` `CN` `IN` `PK` `KP` |
| 2 | lat | number | |
| 3 | lon | number | |
| 4 | year | number | |
| 5 | yield_kt | number | Yield in kilotons; 0 = sub-kt or unknown |
| 6 | delivery | string | `atmospheric` `airdrop` `underground` `underwater` `surface` `exoatmospheric` `tower` |
| 7 | site | string | Physical test site name — **groups multiple tests into one marker** |
| 8 | notable | string | Short English note; translated via NOTABLE_TRANS in index.html |

Marker size: `Math.log10(yield_kt + 1) * 5` clamped 4–22px.
Grouping: one Leaflet marker per unique `site` value. Popup lists all tests at that site.

**Country colors:**
```
US #4a9eff   SU #ef4444   RU #ff8a80   GB #06b6d4
FR #a78bfa   CN #f59e0b   IN #f97316   PK #10b981   KP #ec4899
```

---

## incidents/data.js

```js
// INCIDENTS[i] = [name, country_code, lat, lon, year, ines, category, notable, site]
const INCIDENTS = [
  ["Chernobyl Unit 4", "SU", 51.39, 30.09, 1986, 7, "reactor", "...", "Chernobyl NPP"],
  ...
];
```

| Index | Field | Type | Notes |
|-------|-------|------|-------|
| 0 | name | string | Incident name, ASCII |
| 1 | country | string | 2-letter code |
| 2 | lat | number | |
| 3 | lon | number | |
| 4 | year | number | |
| 5 | ines | number\|null | INES level 0–7; `null` = unrated or pre-INES era |
| 6 | category | string | `reactor` `criticality` `broken_arrow` `lost_source` |
| 7 | notable | string | Short English description, ASCII |
| 8 | site | string | Facility name — groups multiple incidents into one marker |

INES color scale:
```
7 #ef4444   6 #f97316   5 #f59e0b   4 #eab308
3 #84cc16   2 #22c55e   1 #4ade80   0/null #6b7280
```

Marker size: `5 + ines * 2.5` (radius px); unrated = 8px.
Grouping: one Leaflet marker per unique `site` value.

---

## Adding new records

1. Edit `data.js` — add a row to the array, ASCII only
2. If the record needs translated names, add entries to `SITE_NAMES` (or `NOTABLE_TRANS`
   for detonations) inside the inline `<script>` in `index.html`
3. If a new country code is needed, add it to `COUNTRY_META` in `data.js` AND add
   `country_XX` keys to every language in the `TR` object in `index.html`

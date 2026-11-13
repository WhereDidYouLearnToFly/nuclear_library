# Interactive Chart of Nuclides

An interactive, browser-based Chart of Nuclides built with vanilla HTML/CSS/Canvas.  
No framework, no build step — open `index.html` and it works.

**Data source:** NUBASE2016 (Atomic Mass Data Center, AMDC) — 3,436 ground-state nuclides.

---

## What it shows

- Every known nuclide plotted on a 2D grid: **N (neutrons)** on the X axis, **Z (protons)** on the Y axis
- Color-coded by **decay mode** (Beta⁻, Beta⁺, Alpha, EC, Proton, Neutron, SF, 2β⁻, Stable)
- **Valley of stability** guideline (Bethe-Weizsäcker approximation)
- **Magic number** lines (N or Z = 2, 8, 20, 28, 50, 82, 126)
- Click any cell → detailed info panel (half-life, decay mode, abundance, common name, applications)
- Hover → tooltip
- Left sidebar: decay mode legend (click to toggle visibility) + element search list

## Controls

| Action | How |
|--------|-----|
| Pan | Drag (horizontal = natural grab, vertical = inverted) |
| Zoom | Scroll wheel, or `+` / `-` keys |
| Reset view | `R` key, or the ⊙ button |
| Go to element | Type in the search box, or click the element list |
| Deselect | `Esc` |
| Arrow keys | Pan by fixed step |

---

## File structure

```
NucPhysTable/
├── index.html      ← single-page app (HTML + CSS + JS, ~750 lines)
├── data.js         ← nuclear data (generated — do not edit by hand)
└── make-data.py    ← script that downloads NUBASE and regenerates data.js
```

### `data.js` contents

Four JavaScript constants, all loaded as a `<script>` in `index.html`:

| Constant | Description |
|----------|-------------|
| `ELEMENTS` | `{ Z: { symbol, name } }` for Z = 1–118 |
| `NUCLIDES` | Array of `[Z, A, halflife_s, decay_mode, abundance_pct]` |
| `ISOTOPE_NAMES` | `{ "Z-A": "common name" }` — e.g. `"1-3": "Tritium"` |
| `ISOTOPE_USES` | `{ "Z-A": "application text" }` shown in the info panel |
| `ISOTOPE_CATS` | `{ "Z-A": ["medical","weapons",...] }` — usage category badges |

**Decay mode strings** used in `NUCLIDES`:
`"stable"`, `"B-"`, `"B+"`, `"EC"`, `"B+/EC"`, `"A"`, `"SF"`, `"P"`, `"n"`, `"2B-"`

**Half-life** is in seconds; `Infinity` for stable nuclides.

---

## Regenerating data.js from NUBASE

```bash
# Downloads NUBASE2016 from AMDC and rewrites data.js
python make-data.py

# Or use a locally downloaded file
python make-data.py nubase2016.txt
```

Requires Python 3.6+, no external packages.

The script preserves `ISOTOPE_NAMES`, `ISOTOPE_USES`, `ISOTOPE_CATS`, and `ELEMENTS`  
from the existing `data.js` and only replaces `NUCLIDES`.

### Upgrading to NUBASE2020

When AMDC publishes NUBASE2020 as a plain-text file, change one line in `make-data.py`:

```python
NUBASE_URL = "https://amdc.impcas.ac.cn/nubase/nubase2020/nubase2020.txt"
```

The format is identical between editions; the same parser handles it.

---

## Adding isotope names / uses / categories

Edit the three objects at the top of `data.js` directly.

**Common name** (`ISOTOPE_NAMES`):
```js
const ISOTOPE_NAMES = {
  '1-1': 'Protium',
  '1-2': 'Deuterium',
  '1-3': 'Tritium',
  '6-14': 'Radiocarbon',
  // ...
};
```

**Application text** (`ISOTOPE_USES`):
```js
const ISOTOPE_USES = {
  '92-235': 'Used as fissile fuel in nuclear reactors and weapons...',
  // ...
};
```

**Usage categories** (`ISOTOPE_CATS`):
```js
const ISOTOPE_CATS = {
  '92-235': ['power', 'weapons', 'research'],
  // ...
};
```

Available category keys: `medical`, `power`, `weapons`, `space`, `industrial`, `research`, `dating`, `hazardous`

---

## Adding a new decay mode color

1. Add an entry to `DECAY_META` in `index.html`:
```js
const DECAY_META = {
  // ...
  'your-mode': { label: 'Your Label', color: '#hexbg', text: '#hextext' },
};
```
2. Add `'your-mode'` to `DECAY_ORDER`.
3. Make sure your data has that string as the `decay_mode` field in `NUCLIDES`.

---

## Coordinate system

```
cy = H - MARGIN_B - view.y - z * scale      // canvas Y for proton number z
cx = MARGIN_L + view.x + n * scale           // canvas X for neutron number n
```

- `view.x`, `view.y` — pan offsets in pixels
- `view.scale` — pixels per cell (1.5 – 60)
- `MARGIN_L = 40`, `MARGIN_B = 28` — axis label space

Centering cell (z, n0) on screen:
```js
view.x = canvas.width  / 2 - scale/2 - MARGIN_L - n0 * scale;
view.y = canvas.height / 2 + scale/2 - MARGIN_B  - z  * scale;
```

---

## Data credits

- **NUBASE2016** — G. Audi et al., *Chinese Physics C* **41**, 030001 (2017)  
  Hosted by AMDC at `amdc.impcas.ac.cn`
- **Isotope abundances** — extracted from the `IS=` field in NUBASE2016 (IUPAC values)
- Common names, uses, and category tags are manually curated

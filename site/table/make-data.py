#!/usr/bin/env python3
"""
Converts NUBASE2016 → data.js for the Interactive Chart of Nuclides.
NUBASE2016 has ~3437 nuclides (vs ~980 in the handwritten dataset).

Usage:
    python make-data.py                  # downloads automatically
    python make-data.py nubase2016.txt   # use a local file
"""

import sys, re, os, ssl, urllib.request

NUBASE_URL = "https://amdc.impcas.ac.cn/nubase/nubase2016/nubase2016.txt"
OUT_FILE   = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.js")

# ── Half-life unit → seconds ──────────────────────────────────────────────────
UNIT_S = {
    'ys': 1e-24, 'zs': 1e-21, 'as': 1e-18, 'fs': 1e-15, 'ps': 1e-12,
    'ns': 1e-9,  'us': 1e-6,  'ms': 1e-3,  's':  1.0,
    'm':  60.0,  'h': 3600.0, 'd': 86400.0,
    'y':  3.15576e7,  'ky': 3.15576e10, 'My': 3.15576e13,
    'Gy': 3.15576e16, 'Ty': 3.15576e19, 'Py': 3.15576e22,
    'Ey': 3.15576e25, 'Zy': 3.15576e28, 'Yy': 3.15576e31,
}
# Regex that matches a half-life value + unit
# Handles: "613.9 s", "500# ys", "<260ns", ">910 ys", "12.32 y"
HL_RE = re.compile(
    r'[#<>~]?\s*(\d+\.?\d*(?:e[+\-]?\d+)?)\s*#?\s*'
    r'(ys|zs|as|fs|ps|ns|us|ms|ky|My|Gy|Ty|Py|Ey|Zy|Yy|[smhdy])\b'
)

def parse_halflife(line):
    """Return half-life in seconds, or None if not determinable."""
    tail = line[40:]          # half-life is always after the mass-excess section

    if re.search(r'\bstbl\b', tail, re.I):
        return float('inf')
    if re.search(r'\bp-unst\b|\bn-unst\b', tail, re.I):
        return 1e-20          # effectively instantaneous

    m = HL_RE.search(tail)
    if m:
        val  = float(m.group(1))
        unit = m.group(2)
        factor = UNIT_S.get(unit)
        if factor:
            return val * factor
    return None

# ── Decay mode extraction ─────────────────────────────────────────────────────
# Regex to find "MODE=PCT" or "MODE ?" style entries at end of line
MODE_RE = re.compile(
    r'\b(2[Bb][‐\-]|[Bb][‐\-]d?|[Bb]\+|[Ee][Cc]|[Aa]lpha|(?<![a-zA-Z])[Aa](?![a-zA-Z])'
    r'|[Ii][Tt]|[Ss][Ff]|2[Pp]|(?<![a-zA-Z])[Pp](?![a-zA-Z])'
    r'|2[Nn]|(?<![a-zA-Z])[Nn](?![a-zA-Z]))\s*[=~]?\s*([0-9.]*)'
)

def parse_decay(line, is_stable):
    if is_stable:
        return 'stable'
    tail = line[80:] if len(line) > 80 else line[40:]

    if re.search(r'\bp-unst\b', tail, re.I):
        return 'P'
    if re.search(r'\bn-unst\b', tail, re.I):
        return 'n'

    modes = []
    for m in MODE_RE.finditer(tail):
        raw = m.group(1).upper().replace('‐', '-').replace('D', '')  # strip delayed-neutron suffix
        raw = raw.strip()
        pct_str = m.group(2)
        pct = float(pct_str) if pct_str else 0.0
        modes.append((raw, pct))

    if not modes:
        return 'stable'

    # Sort by percentage descending; entries without pct (0.0) stay last
    modes.sort(key=lambda x: -x[1])
    dominant = modes[0][0]

    # Normalise
    has_bplus = any(r == 'B+' for r, _ in modes)
    has_ec    = any(r == 'EC' for r, _ in modes)
    if has_bplus and has_ec:
        return 'B+/EC'

    MAP = {
        'B-':'B-', 'B+':'B+', 'EC':'EC',
        'A':'A', 'ALPHA':'A',
        'IT':'IT', 'SF':'SF',
        'P':'P', '2P':'P',
        'N':'n', '2N':'n',
        '2B-':'2B-',
    }
    return MAP.get(dominant, 'stable')

# ── Abundance from IS= field ──────────────────────────────────────────────────
IS_RE = re.compile(r'\bIS\s*=\s*([0-9.]+(?:#)?)')

def parse_abundance(line):
    m = IS_RE.search(line)
    if m:
        return float(m.group(1).rstrip('#'))
    return 0.0

# ── Download ──────────────────────────────────────────────────────────────────
def download(url):
    print(f"Downloading {url} …")
    ctx = ssl._create_unverified_context()
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
        return r.read().decode('latin-1')

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    if len(sys.argv) > 1:
        with open(sys.argv[1], encoding='latin-1') as f:
            raw = f.read()
        print(f"Loaded {sys.argv[1]}")
    else:
        raw = download(NUBASE_URL)

    lines = raw.splitlines()
    print(f"Total lines in file: {len(lines)}")

    nuclides = []
    skipped_isomers = 0
    unknown_hl = 0
    seen = set()

    for line in lines:
        if len(line) < 15:
            continue
        # First 8 chars must look like "NNN ZZZL"
        try:
            A = int(line[0:3])
            Z = int(line[4:7])
        except ValueError:
            continue
        if A < 1 or Z < 0 or Z > 120:
            continue

        # Col 7: isomer level. '0' = ground state. Skip all isomers.
        isomer_flag = line[7] if len(line) > 7 else '0'
        if isomer_flag != '0':
            skipped_isomers += 1
            continue

        # Skip duplicates (shouldn't happen in NUBASE but be safe)
        key = (Z, A)
        if key in seen:
            continue
        seen.add(key)

        hl = parse_halflife(line)
        if hl is None:
            unknown_hl += 1
            hl = 1e-20    # unbound / unmeasured — effectively instantaneous

        stable = (hl == float('inf'))
        dm     = parse_decay(line, stable)
        ab     = parse_abundance(line)

        # Format hl for JS
        if hl == float('inf'):
            hl_js = 'Infinity'
        else:
            hl_js = f'{hl:.6g}'

        nuclides.append((Z, A, hl_js, dm, ab))

    print(f"Ground-state nuclides parsed: {len(nuclides)}")
    print(f"Isomers skipped: {skipped_isomers}")
    print(f"Unknown half-life (set to 0): {unknown_hl}")

    # ── Preserve the existing JS objects from data.js ─────────────────────────
    existing = {}
    if os.path.exists(OUT_FILE):
        with open(OUT_FILE, encoding='utf-8') as f:
            content = f.read()
        for key in ('ISOTOPE_NAMES', 'ISOTOPE_USES', 'ISOTOPE_CATS', 'ELEMENTS'):
            # Match "const KEY = { ... };" spanning multiple lines
            m = re.search(rf'(const {key}\s*=\s*\{{[\s\S]*?\n\}};)', content)
            if m:
                existing[key] = m.group(1)
                print(f"  Preserved {key}")
            else:
                print(f"  WARNING: {key} not found in data.js")

    # ── Build new NUCLIDES array ───────────────────────────────────────────────
    rows = []
    for Z, A, hl_js, dm, ab in sorted(nuclides, key=lambda x: (x[0], x[1])):
        rows.append(f'  [{Z},{A},{hl_js},"{dm}",{ab}]')
    nuclides_js = 'const NUCLIDES = [\n' + ',\n'.join(rows) + '\n];'

    parts = []
    for key in ('ISOTOPE_NAMES', 'ISOTOPE_USES', 'ISOTOPE_CATS', 'ELEMENTS'):
        if key in existing:
            parts.append(existing[key])
    parts.append(nuclides_js)

    with open(OUT_FILE, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(parts) + '\n')

    print(f"\nWrote {OUT_FILE}  ({len(nuclides)} nuclides, was ~980)")

if __name__ == '__main__':
    main()

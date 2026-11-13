// Nuclear Power Plant data
// PLANTS[i] = [name, country, lat, lon, type, capacity_mwe, status, year_first_op]
// status: 'operating' | 'shutdown' | 'construction'
// type: PWR | BWR | VVER | CANDU | RBMK | AGR | BN | EPR | AP1000 | PHWR | EGP | HTGR
// capacity: total net MWe for all units at site
// year: first unit commercial operation (or expected for construction)

const PLANTS = [
  // ── United States ──────────────────────────────────────────────────────────
  ["Palo Verde",          "US", 33.389, -112.862, "PWR",    3937, "operating",    1986],
  ["South Texas Project", "US", 28.796,  -96.049, "PWR",    2820, "operating",    1988],
  ["Braidwood",           "US", 41.241,  -88.226, "PWR",    2356, "operating",    1988],
  ["Byron",               "US", 42.075,  -89.278, "PWR",    2350, "operating",    1985],
  ["Callaway",            "US", 38.767,  -91.781, "PWR",    1236, "operating",    1984],
  ["Clinton",             "US", 40.159,  -88.834, "BWR",    1065, "operating",    1987],
  ["Comanche Peak",       "US", 32.299,  -97.786, "PWR",    2430, "operating",    1990],
  ["Dresden",             "US", 41.388,  -88.265, "BWR",    1824, "operating",    1970],
  ["Fermi 2",             "US", 41.961,  -83.258, "BWR",    1122, "operating",    1988],
  ["Grand Gulf",          "US", 32.024,  -91.048, "BWR",    1433, "operating",    1985],
  ["Limerick",            "US", 40.222,  -75.582, "BWR",    2317, "operating",    1986],
  ["Nine Mile Point",     "US", 43.523,  -76.411, "BWR",    1899, "operating",    1969],
  ["Peach Bottom",        "US", 39.757,  -76.269, "BWR",    2776, "operating",    1974],
  ["Perry",               "US", 41.799,  -81.149, "BWR",    1261, "operating",    1987],
  ["Point Beach",         "US", 44.278,  -87.538, "PWR",    1197, "operating",    1970],
  ["Quad Cities",         "US", 41.718,  -90.331, "BWR",    1876, "operating",    1972],
  ["Salem / Hope Creek",  "US", 39.463,  -75.540, "PWR",    3459, "operating",    1977],
  ["Seabrook",            "US", 42.899,  -70.850, "PWR",    1246, "operating",    1990],
  ["Surry",               "US", 37.166,  -76.699, "PWR",    1676, "operating",    1972],
  ["Turkey Point",        "US", 25.434,  -80.332, "PWR",    1530, "operating",    1973],
  ["Vogtle",              "US", 33.141,  -81.762, "AP1000", 4420, "operating",    1987],
  ["Watts Bar",           "US", 35.604,  -84.787, "PWR",    2436, "operating",    1996],
  ["Wolf Creek",          "US", 38.238,  -96.101, "PWR",    1200, "operating",    1985],
  ["Oconee",              "US", 34.792,  -82.898, "PWR",    2538, "operating",    1973],
  ["Catawba",             "US", 35.054,  -81.073, "PWR",    2258, "operating",    1985],
  ["McGuire",             "US", 35.431,  -80.943, "PWR",    2200, "operating",    1981],
  ["Prairie Island",      "US", 44.617,  -92.634, "PWR",    1102, "operating",    1973],
  ["Monticello",          "US", 45.335,  -93.845, "BWR",     671, "operating",    1971],
  ["Diablo Canyon",       "US", 35.210, -120.854, "PWR",    2289, "operating",    1985],
  ["Three Mile Island 1", "US", 40.153,  -76.725, "PWR",     835, "operating",    1974],
  ["Robinson",            "US", 34.404,  -80.157, "PWR",     759, "operating",    1971],
  ["Indian Point",        "US", 41.270,  -73.952, "PWR",    2069, "shutdown",     1974],
  ["San Onofre",          "US", 33.368, -117.556, "PWR",    2200, "shutdown",     1983],
  ["Zion",                "US", 42.446,  -87.798, "PWR",    2072, "shutdown",     1973],

  // ── France ─────────────────────────────────────────────────────────────────
  ["Blayais",             "FR", 45.254,  -0.697, "PWR",    3640, "operating",    1981],
  ["Bugey",               "FR", 45.797,   5.270, "PWR",    3584, "operating",    1979],
  ["Cattenom",            "FR", 49.403,   6.218, "PWR",    5448, "operating",    1987],
  ["Chinon",              "FR", 47.237,   0.173, "PWR",    3516, "operating",    1984],
  ["Chooz B",             "FR", 50.090,   4.789, "PWR",    3120, "operating",    1997],
  ["Civaux",              "FR", 46.457,   0.654, "PWR",    2990, "operating",    1999],
  ["Cruas-Meysse",        "FR", 44.626,   4.760, "PWR",    3660, "operating",    1983],
  ["Dampierre",           "FR", 47.734,   2.514, "PWR",    3560, "operating",    1980],
  ["Flamanville",         "FR", 49.536,  -1.878, "EPR",    3330, "operating",    1986],
  ["Golfech",             "FR", 44.107,   0.840, "PWR",    2620, "operating",    1990],
  ["Gravelines",          "FR", 51.013,   2.131, "PWR",    5460, "operating",    1980],
  ["Nogent-sur-Seine",    "FR", 48.516,   3.519, "PWR",    2620, "operating",    1988],
  ["Paluel",              "FR", 49.855,   0.634, "PWR",    5320, "operating",    1985],
  ["Penly",               "FR", 49.982,   1.211, "PWR",    2660, "operating",    1990],
  ["Saint-Alban",         "FR", 45.404,   4.848, "PWR",    2670, "operating",    1985],
  ["Saint-Laurent-B",     "FR", 47.721,   1.575, "PWR",    1830, "operating",    1981],
  ["Tricastin",           "FR", 44.333,   4.731, "PWR",    3660, "operating",    1980],
  ["Fessenheim",          "FR", 47.903,   7.567, "PWR",    1760, "shutdown",     1978],

  // ── China ──────────────────────────────────────────────────────────────────
  ["Daya Bay",            "CN", 22.600, 114.547, "PWR",    1968, "operating",    1994],
  ["Ling'ao (Guangdong)", "CN", 22.601, 114.556, "PWR",    4036, "operating",    2002],
  ["Taishan",             "CN", 21.985, 112.805, "EPR",    3400, "operating",    2018],
  ["Yangjiang",           "CN", 21.739, 111.637, "PWR",    6516, "operating",    2014],
  ["Qinshan",             "CN", 30.437, 120.958, "PWR",    4388, "operating",    1994],
  ["Tianwan",             "CN", 34.694, 119.465, "VVER",   6120, "operating",    2007],
  ["Hongyanhe",           "CN", 39.793, 121.487, "PWR",    6240, "operating",    2013],
  ["Fuqing",              "CN", 25.419, 119.391, "PWR",    5368, "operating",    2014],
  ["Ningde",              "CN", 27.085, 120.414, "PWR",    4356, "operating",    2013],
  ["Fangchenggang",       "CN", 21.666, 108.348, "PWR",    4356, "operating",    2016],
  ["Changjiang",          "CN", 19.474, 109.100, "PWR",    1300, "operating",    2015],
  ["Sanmen",              "CN", 29.092, 121.671, "AP1000", 2230, "operating",    2018],
  ["Haiyang",             "CN", 36.808, 121.036, "AP1000", 2500, "operating",    2018],
  ["Shidao Bay",          "CN", 37.096, 122.546, "HTGR",    210, "operating",    2023],
  ["Lianyungang",         "CN", 34.601, 119.200, "PWR",    1000, "construction", 2030],

  // ── Russia ─────────────────────────────────────────────────────────────────
  ["Balakovo",            "RU", 52.101,  47.954, "VVER",   4000, "operating",    1986],
  ["Beloyarsk",           "RU", 56.842,  61.333, "BN",     1380, "operating",    1980],
  ["Bilibino",            "RU", 68.055, 166.450, "EGP",      48, "operating",    1974],
  ["Kalinin",             "RU", 57.914,  35.053, "VVER",   4000, "operating",    1984],
  ["Kola",                "RU", 67.461,  32.477, "VVER",   1760, "operating",    1973],
  ["Kursk",               "RU", 51.667,  35.607, "RBMK",   4000, "operating",    1977],
  ["Leningrad",           "RU", 59.893,  29.029, "RBMK",   4400, "operating",    1974],
  ["Novovoronezh",        "RU", 51.301,  39.222, "VVER",   2844, "operating",    1965],
  ["Rostov",              "RU", 47.578,  42.069, "VVER",   4000, "operating",    2001],
  ["Smolensk",            "RU", 54.153,  33.230, "RBMK",   3000, "operating",    1982],
  ["Akademik Lomonosov",  "RU", 64.720,  177.51, "PWR",     140, "operating",    2020],

  // ── Ukraine ────────────────────────────────────────────────────────────────
  ["Khmelnytska",         "UA", 50.300,  26.650, "VVER",   2000, "operating",    1987],
  ["Rivne",               "UA", 51.331,  25.898, "VVER",   2835, "operating",    1980],
  ["South Ukraine",       "UA", 47.833,  31.200, "VVER",   3000, "operating",    1983],
  ["Zaporizhzhia",        "UA", 47.510,  34.585, "VVER",   6000, "operating",    1985],
  ["Chernobyl",           "UA", 51.389,  30.100, "RBMK",   4000, "shutdown",     1978],

  // ── Japan ──────────────────────────────────────────────────────────────────
  ["Sendai",              "JP", 31.834, 130.188, "PWR",    1780, "operating",    1984],
  ["Takahama",            "JP", 35.524, 135.495, "PWR",    3392, "operating",    1974],
  ["Ikata",               "JP", 33.493, 132.311, "PWR",    2202, "operating",    1977],
  ["Mihama",              "JP", 35.704, 135.917, "PWR",    1566, "operating",    1970],
  ["Ohi",                 "JP", 35.534, 135.641, "PWR",    4710, "operating",    1979],
  ["Kashiwazaki-Kariwa",  "JP", 37.433, 138.593, "BWR",    8212, "operating",    1985],
  ["Onagawa",             "JP", 38.400, 141.494, "BWR",    2174, "operating",    1984],
  ["Fukushima Daiichi",   "JP", 37.421, 141.033, "BWR",    4696, "shutdown",     1971],
  ["Fukushima Daini",     "JP", 37.317, 141.025, "BWR",    4400, "shutdown",     1982],

  // ── South Korea ────────────────────────────────────────────────────────────
  ["Kori / Shin-Kori",    "KR", 35.327, 129.293, "PWR",    8376, "operating",    1978],
  ["Hanbit (Yeonggwang)", "KR", 35.405, 126.416, "PWR",    5878, "operating",    1986],
  ["Hanul (Uljin)",       "KR", 37.094, 129.384, "PWR",    6800, "operating",    1988],
  ["Wolseong",            "KR", 35.710, 129.468, "CANDU",  2779, "operating",    1983],

  // ── India ──────────────────────────────────────────────────────────────────
  ["Rajasthan (RAPS)",    "IN", 24.875,  75.589, "PHWR",   1180, "operating",    1973],
  ["Kakrapar",            "IN", 21.238,  73.346, "PHWR",   880,  "operating",    1993],
  ["Kaiga",               "IN", 14.867,  74.441, "PHWR",   880,  "operating",    2000],
  ["Kudankulam",          "IN",  8.169,  77.713, "VVER",   2000, "operating",    2013],
  ["Madras (Kalpakkam)",  "IN", 12.553,  80.169, "PHWR",    440, "operating",    1984],
  ["Narora",              "IN", 28.194,  78.391, "PHWR",    440, "operating",    1991],
  ["Tarapur",             "IN", 19.835,  72.665, "BWR",     320, "operating",    1969],

  // ── Canada ─────────────────────────────────────────────────────────────────
  ["Bruce",               "CA", 44.322,  -81.598, "CANDU", 6430, "operating",    1977],
  ["Darlington",          "CA", 43.870,  -78.720, "CANDU", 3512, "operating",    1990],
  ["Pickering",           "CA", 43.811,  -79.070, "CANDU", 3084, "shutdown",     1971],
  ["Point Lepreau",       "CA", 45.065,  -66.458, "CANDU",  705, "operating",    1983],

  // ── United Kingdom ─────────────────────────────────────────────────────────
  ["Hartlepool",          "GB", 54.634,  -1.177, "AGR",    1180, "operating",    1983],
  ["Heysham",             "GB", 54.027,  -2.912, "AGR",    2364, "operating",    1983],
  ["Hinkley Point B",     "GB", 51.207,  -3.130, "AGR",    1220, "operating",    1976],
  ["Hinkley Point C",     "GB", 51.209,  -3.131, "EPR",    3260, "construction", 2027],
  ["Sizewell B",          "GB", 52.207,   1.621, "PWR",    1198, "operating",    1995],
  ["Torness",             "GB", 55.971,  -2.442, "AGR",    1250, "operating",    1988],
  ["Dungeness B",         "GB", 50.915,   0.962, "AGR",    1040, "shutdown",     1983],

  // ── Belgium ────────────────────────────────────────────────────────────────
  ["Doel",                "BE", 51.324,   4.259, "PWR",    2991, "operating",    1975],
  ["Tihange",             "BE", 50.526,   5.268, "PWR",    3000, "operating",    1975],

  // ── Spain ──────────────────────────────────────────────────────────────────
  ["Almaraz",             "ES", 39.808,  -5.698, "PWR",    2010, "operating",    1981],
  ["Ascó",                "ES", 41.203,   0.567, "PWR",    2016, "operating",    1984],
  ["Cofrentes",           "ES", 39.251,  -1.061, "BWR",    1092, "operating",    1984],
  ["Vandellós II",        "ES", 40.921,   0.878, "PWR",    1087, "operating",    1988],
  ["Trillo",              "ES", 40.685,  -2.592, "PWR",    1066, "operating",    1988],

  // ── Sweden ─────────────────────────────────────────────────────────────────
  ["Forsmark",            "SE", 60.403,  18.172, "BWR",    3139, "operating",    1980],
  ["Oskarshamn",          "SE", 57.421,  16.673, "BWR",    1400, "operating",    1972],
  ["Ringhals",            "SE", 57.266,  12.109, "PWR",    2940, "operating",    1975],

  // ── Finland ────────────────────────────────────────────────────────────────
  ["Loviisa",             "FI", 60.402,  26.367, "VVER",    976, "operating",    1977],
  ["Olkiluoto",           "FI", 61.235,  21.444, "BWR",    2780, "operating",    1979],

  // ── Czech Republic ─────────────────────────────────────────────────────────
  ["Dukovany",            "CZ", 49.088,  16.148, "VVER",   2040, "operating",    1985],
  ["Temelín",             "CZ", 49.183,  14.376, "VVER",   2160, "operating",    2002],

  // ── Slovakia ───────────────────────────────────────────────────────────────
  ["Bohunice",            "SK", 48.492,  17.682, "VVER",    942, "operating",    1984],
  ["Mochovce",            "SK", 48.415,  18.527, "VVER",   1940, "operating",    1998],

  // ── Hungary ────────────────────────────────────────────────────────────────
  ["Paks",                "HU", 46.573,  18.856, "VVER",   2000, "operating",    1982],

  // ── Romania ────────────────────────────────────────────────────────────────
  ["Cernavodă",           "RO", 44.321,  28.056, "CANDU",  1413, "operating",    1996],

  // ── Bulgaria ───────────────────────────────────────────────────────────────
  ["Kozloduy",            "BG", 43.783,  23.785, "VVER",   2000, "operating",    1974],

  // ── Switzerland ────────────────────────────────────────────────────────────
  ["Beznau",              "CH", 47.523,   8.229, "PWR",     730, "operating",    1969],
  ["Gösgen",              "CH", 47.366,   7.963, "PWR",    1010, "operating",    1979],
  ["Leibstadt",           "CH", 47.597,   8.183, "BWR",    1220, "operating",    1984],
  ["Mühleberg",           "CH", 46.969,   7.275, "BWR",     373, "shutdown",     1972],

  // ── Armenia ────────────────────────────────────────────────────────────────
  ["Metsamor",            "AM", 40.175,  44.143, "VVER",    376, "operating",    1980],

  // ── Iran ───────────────────────────────────────────────────────────────────
  ["Bushehr",             "IR", 28.831,  50.889, "VVER",    915, "operating",    2011],

  // ── UAE ────────────────────────────────────────────────────────────────────
  ["Barakah",             "AE", 23.964,  52.235, "PWR",    5380, "operating",    2020],

  // ── Pakistan ───────────────────────────────────────────────────────────────
  ["Chashma",             "PK", 32.393,  71.460, "PWR",    1200, "operating",    2000],
  ["Karachi (KANUPP)",    "PK", 24.912,  66.766, "PWR",     637, "operating",    1972],

  // ── South Africa ───────────────────────────────────────────────────────────
  ["Koeberg",             "ZA",-33.658,  18.438, "PWR",    1860, "operating",    1984],

  // ── Brazil ─────────────────────────────────────────────────────────────────
  ["Angra",               "BR",-22.967, -44.456, "PWR",    1884, "operating",    1982],

  // ── Argentina ──────────────────────────────────────────────────────────────
  ["Atucha",              "AR",-33.967, -59.209, "PHWR",   1064, "operating",    1974],
  ["Embalse",             "AR",-32.218, -64.433, "CANDU",   648, "operating",    1984],

  // ── Mexico ─────────────────────────────────────────────────────────────────
  ["Laguna Verde",        "MX", 19.725, -96.388, "BWR",    1610, "operating",    1990],

  // ── Taiwan ─────────────────────────────────────────────────────────────────
  ["Maanshan",            "TW", 22.001, 120.609, "PWR",    1902, "operating",    1984],
  ["Kuosheng",            "TW", 25.207, 121.667, "BWR",    1970, "operating",    1981],

  // ── Germany (all shutdown April 2023) ──────────────────────────────────────
  ["Isar 2",              "DE", 48.605,  12.292, "PWR",    1485, "shutdown",     1988],
  ["Emsland",             "DE", 52.472,   7.323, "PWR",    1400, "shutdown",     1988],
  ["Neckarwestheim 2",    "DE", 49.038,   9.173, "PWR",    1310, "shutdown",     1989],
  ["Brokdorf",            "DE", 53.852,   9.347, "PWR",    1480, "shutdown",     1986],
  ["Grohnde",             "DE", 52.026,   9.406, "PWR",    1430, "shutdown",     1984],

  // ── Netherlands ────────────────────────────────────────────────────────────
  ["Borssele",            "NL", 51.418,   3.718, "PWR",     512, "operating",    1973],

  // ── Slovenia ───────────────────────────────────────────────────────────────
  ["Krško",               "SI", 45.834,  15.872, "PWR",     727, "operating",    1983],
];

// Country display names
const COUNTRY_NAMES = {
  US: "United States", FR: "France",      CN: "China",
  RU: "Russia",        UA: "Ukraine",     JP: "Japan",
  KR: "South Korea",   IN: "India",       CA: "Canada",
  GB: "United Kingdom",BE: "Belgium",     ES: "Spain",
  SE: "Sweden",        FI: "Finland",     CZ: "Czech Republic",
  SK: "Slovakia",      HU: "Hungary",     RO: "Romania",
  BG: "Bulgaria",      CH: "Switzerland", AM: "Armenia",
  IR: "Iran",          AE: "UAE",         PK: "Pakistan",
  ZA: "South Africa",  BR: "Brazil",      AR: "Argentina",
  MX: "Mexico",        TW: "Taiwan",      DE: "Germany",
  NL: "Netherlands",   SI: "Slovenia",
};

// Reactor type display names
const TYPE_NAMES = {
  PWR:    "Pressurized Water (PWR)",
  BWR:    "Boiling Water (BWR)",
  VVER:   "VVER (Russian PWR)",
  CANDU:  "CANDU (Heavy Water)",
  RBMK:   "RBMK (Graphite Channel)",
  AGR:    "Advanced Gas-cooled (AGR)",
  BN:     "Fast Breeder (BN)",
  EPR:    "European PR (EPR)",
  AP1000: "Westinghouse AP1000",
  PHWR:   "Pressurized HW (PHWR)",
  EGP:    "EGP (Small Graphite)",
  HTGR:   "High-Temp Gas (HTGR)",
};

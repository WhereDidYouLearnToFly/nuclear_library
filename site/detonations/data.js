// Nuclear Detonations data
// DETONATIONS[i] = [name, country, lat, lon, year, yield_kt, delivery, site, notable]
// delivery: 'atmospheric' | 'airdrop' | 'underground' | 'underwater' | 'exoatmospheric'
// yield_kt: kilotons (Tsar Bomba = 50000). 0 = sub-kt or unknown.
// notable: short label string, or null

const DETONATIONS = [

  // ── Combat use ────────────────────────────────────────────────────────────
  ["Little Boy (Hiroshima)",    "US",  34.396,  132.455, 1945,    15, "airdrop",        "Hiroshima, Japan",             "First combat use"],
  ["Fat Man (Nagasaki)",        "US",  32.750,  129.864, 1945,    21, "airdrop",        "Nagasaki, Japan",              "Second combat use"],

  // ── USA — Trinity ─────────────────────────────────────────────────────────
  ["Trinity",                   "US",  33.675, -106.475, 1945,    19, "atmospheric",    "Trinity Site, New Mexico",     "World's first nuclear test"],

  // ── USA — Bikini Atoll (Operation Crossroads) ─────────────────────────────
  ["Crossroads Able",           "US",  11.566,  165.384, 1946,    23, "airdrop",        "Bikini Atoll",                 null],
  ["Crossroads Baker",          "US",  11.566,  165.384, 1946,    23, "underwater",     "Bikini Atoll",                 null],
  ["Castle Bravo",              "US",  11.699,  165.274, 1954, 15000, "atmospheric",    "Bikini Atoll",                 "Largest US test — 2.5× design yield"],
  ["Castle Romeo",              "US",  11.655,  165.360, 1954, 11000, "atmospheric",    "Bikini Atoll",                 null],
  ["Castle Yankee",             "US",  11.655,  165.360, 1954, 13500, "airdrop",        "Bikini Atoll",                 null],
  ["Redwing Zuni",              "US",  11.566,  165.384, 1956,   3500, "atmospheric",   "Bikini Atoll",                 null],
  ["Hardtack Poplar",           "US",  11.566,  165.384, 1958,   9300, "airdrop",       "Bikini Atoll",                 null],

  // ── USA — Enewetak Atoll ──────────────────────────────────────────────────
  ["Greenhouse George",         "US",  11.517,  162.294, 1951,   225, "airdrop",        "Enewetak Atoll",               null],
  ["Ivy Mike",                  "US",  11.517,  162.294, 1952, 10400, "atmospheric",    "Enewetak Atoll",               "World's first thermonuclear device"],
  ["Ivy King",                  "US",  11.517,  162.294, 1952,   500, "airdrop",        "Enewetak Atoll",               "Largest pure-fission weapon ever"],
  ["Castle Nectar",             "US",  11.517,  162.294, 1954,  1690, "airdrop",        "Enewetak Atoll",               null],
  ["Redwing Navajo",            "US",  11.517,  162.294, 1956,  4500, "airdrop",        "Enewetak Atoll",               null],

  // ── USA — Nevada Test Site ────────────────────────────────────────────────
  ["Able (first NTS test)",     "US",  37.104, -116.049, 1951,     1, "airdrop",        "Nevada Test Site",             "First Nevada test"],
  ["Tumbler-Snapper George",    "US",  37.104, -116.049, 1952,    19, "airdrop",        "Nevada Test Site",             null],
  ["Upshot-Knothole Grable",    "US",  37.180, -115.910, 1953,    15, "airdrop",        "Nevada Test Site",             "Only nuclear artillery shell ever fired"],
  ["Teapot Tesla",              "US",  37.104, -116.049, 1955,     7, "atmospheric",    "Nevada Test Site",             null],
  ["Plumbbob Hood",             "US",  37.104, -116.049, 1957,    74, "atmospheric",    "Nevada Test Site",             "Largest atmospheric NTS shot"],
  ["Plumbbob John",             "US",  37.180, -115.910, 1957,     2, "airdrop",        "Nevada Test Site",             null],
  ["Hardtack II Coulomb-B",     "US",  37.104, -116.049, 1958,     0, "underground",    "Nevada Test Site",             "First fully contained underground test"],
  ["Storax Sedan",              "US",  37.176, -116.047, 1962,   104, "underground",    "Nevada Test Site",             "Largest crater from any US test"],
  ["NTS Boxcar",                "US",  37.104, -116.049, 1968,  1300, "underground",    "Nevada Test Site",             "Largest underground NTS test"],
  ["NTS Milrow",                "US",  51.411, -179.175, 1969,  1000, "underground",    "Amchitka Island, Alaska",      null],
  ["NTS Cannikin",              "US",  51.411, -179.175, 1971,  5000, "underground",    "Amchitka Island, Alaska",      "Largest underground US test ever"],
  ["NTS Divider",               "US",  37.104, -116.049, 1992,    20, "underground",    "Nevada Test Site",             "Last US nuclear test"],

  // ── USA — Johnston Atoll ──────────────────────────────────────────────────
  ["Starfish Prime",            "US",  16.737, -169.524, 1962,  1400, "exoatmospheric", "Johnston Atoll",               "High-altitude EMP — disabled satellites"],

  // ── USSR — Semipalatinsk (Kazakhstan) ────────────────────────────────────
  ["Joe-1 (RDS-1)",             "SU",  50.073,   78.943, 1949,    22, "atmospheric",    "Semipalatinsk",                "First Soviet nuclear test"],
  ["Joe-2 (RDS-2)",             "SU",  50.073,   78.943, 1951,    38, "airdrop",        "Semipalatinsk",                null],
  ["Joe-3 (RDS-3)",             "SU",  50.073,   78.943, 1951,    41, "airdrop",        "Semipalatinsk",                null],
  ["Joe-4 (RDS-6s)",            "SU",  50.073,   78.943, 1953,   400, "atmospheric",    "Semipalatinsk",                "First Soviet thermonuclear test"],
  ["RDS-37",                    "SU",  50.073,   78.943, 1955,  1600, "airdrop",        "Semipalatinsk",                null],
  ["Totsk Exercise Snowball",   "SU",  52.660,   52.770, 1954,    40, "airdrop",        "Totsk, Orenburg Oblast",       "Live military exercise with 45,000 troops"],
  ["Semipalatinsk (1956)",      "SU",  50.100,   79.000, 1956,   890, "airdrop",        "Semipalatinsk",                null],
  ["Semipalatinsk UG (1961)",   "SU",  50.073,   78.943, 1961,    50, "underground",    "Semipalatinsk",                null],
  ["Chagan PNE",                "SU",  49.986,   79.004, 1965,   140, "underground",    "Shagan River, Kazakhstan",     "Peaceful Nuclear Explosion — lake still exists"],
  ["Semipalatinsk UG (1989)",   "SU",  50.073,   78.943, 1989,    75, "underground",    "Semipalatinsk",                null],

  // ── USSR — Novaya Zemlya ──────────────────────────────────────────────────
  ["Novaya Zemlya (1955)",      "SU",  73.408,   53.958, 1955,  1600, "airdrop",        "Novaya Zemlya",                null],
  ["Novaya Zemlya (1957)",      "SU",  73.408,   53.958, 1957,  2900, "airdrop",        "Novaya Zemlya",                null],
  ["Novaya Zemlya (1958 Sep)",  "SU",  73.482,   54.502, 1958,  8900, "airdrop",        "Novaya Zemlya",                null],
  ["Novaya Zemlya (1958 Oct)",  "SU",  73.408,   53.958, 1958, 12500, "airdrop",        "Novaya Zemlya",                null],
  ["Novaya Zemlya (1961 Sep)",  "SU",  73.408,   53.958, 1961, 24700, "airdrop",        "Novaya Zemlya",                null],
  ["Tsar Bomba (AN602)",        "SU",  73.482,   54.502, 1961, 50000, "airdrop",        "Novaya Zemlya",                "Largest nuclear device ever detonated — 50 Mt"],
  ["Novaya Zemlya (1962)",      "SU",  73.408,   53.958, 1962, 21400, "airdrop",        "Novaya Zemlya",                null],
  ["Novaya Zemlya UG (1964)",   "SU",  73.300,   54.500, 1964,   100, "underground",    "Novaya Zemlya",                null],
  ["Novaya Zemlya (last, 1990)","SU",  73.482,   54.502, 1990,    70, "underground",    "Novaya Zemlya",                "Last Soviet nuclear test"],

  // ── USSR — Other sites ────────────────────────────────────────────────────
  ["Kapustin Yar (1957)",       "SU",  48.580,   46.200, 1957,     3, "airdrop",        "Kapustin Yar",                 null],
  ["Azgir PNE (1966)",          "SU",  47.900,   48.600, 1966,    64, "underground",    "Azgir, Kazakhstan",            null],
  ["Dnepr PNE (1972)",          "SU",  48.200,   33.600, 1972,     3, "underground",    "Dnepr, Ukraine",               "Peaceful nuclear excavation"],

  // ── France — Algeria ──────────────────────────────────────────────────────
  ["Gerboise Bleue",            "FR",  26.714,    0.060, 1960,    70, "atmospheric",    "Reggane, Algeria",             "First French nuclear test"],
  ["Gerboise Blanche",          "FR",  26.714,    0.060, 1960,     3, "atmospheric",    "Reggane, Algeria",             null],
  ["Gerboise Rouge",            "FR",  26.714,    0.060, 1960,     3, "atmospheric",    "Reggane, Algeria",             null],
  ["Gerboise Verte",            "FR",  26.714,    0.060, 1961,     1, "atmospheric",    "Reggane, Algeria",             null],
  ["Agathe (In Ekker)",         "FR",  23.855,    5.067, 1961,     1, "underground",    "In Ekker, Algeria",            null],
  ["Béryl (accident)",          "FR",  23.855,    5.067, 1962,    19, "underground",    "In Ekker, Algeria",            "Containment failure — radioactive cloud released"],
  ["In Ekker (1963)",           "FR",  23.855,    5.067, 1963,    15, "underground",    "In Ekker, Algeria",            null],
  ["In Ekker (last, 1966)",     "FR",  23.855,    5.067, 1966,    30, "underground",    "In Ekker, Algeria",            null],

  // ── France — Pacific ──────────────────────────────────────────────────────
  ["Aldébaran (Mururoa #1)",    "FR", -21.855, -138.832, 1966,    28, "airdrop",        "Mururoa Atoll",                "First Mururoa test"],
  ["Canopus",                   "FR", -22.244, -138.762, 1968,  2600, "airdrop",        "Fangataufa Atoll",             "First French thermonuclear test"],
  ["Mururoa (1970)",            "FR", -21.855, -138.832, 1970,   914, "airdrop",        "Mururoa Atoll",                null],
  ["Mururoa (1971)",            "FR", -21.855, -138.832, 1971,  1000, "atmospheric",    "Mururoa Atoll",                null],
  ["Mururoa (1972)",            "FR", -21.855, -138.832, 1972,   400, "atmospheric",    "Mururoa Atoll",                null],
  ["Mururoa UG (1975)",         "FR", -21.855, -138.832, 1975,   120, "underground",    "Mururoa Atoll",                "First French underground test"],
  ["Mururoa UG (1980)",         "FR", -21.855, -138.832, 1980,   110, "underground",    "Mururoa Atoll",                null],
  ["Fangataufa UG (1988)",      "FR", -22.244, -138.762, 1988,   150, "underground",    "Fangataufa Atoll",             null],
  ["Mururoa UG (1990)",         "FR", -21.855, -138.832, 1990,   100, "underground",    "Mururoa Atoll",                null],
  ["Xouthos (last French test)","FR", -22.244, -138.762, 1996,   120, "underground",    "Fangataufa Atoll",             "Last French nuclear test"],

  // ── United Kingdom — Australia ────────────────────────────────────────────
  ["Hurricane",                 "GB", -20.453,  115.523, 1952,    25, "underwater",     "Monte Bello Islands",          "First British nuclear test"],
  ["Totem 1",                   "GB", -29.475,  132.313, 1953,     9, "atmospheric",    "Emu Field, South Australia",   null],
  ["Totem 2",                   "GB", -29.475,  132.313, 1953,     7, "atmospheric",    "Emu Field, South Australia",   null],
  ["Mosaic G1",                 "GB", -20.453,  115.523, 1956,    15, "atmospheric",    "Monte Bello Islands",          null],
  ["Mosaic G2",                 "GB", -20.453,  115.523, 1956,    60, "atmospheric",    "Monte Bello Islands",          null],
  ["Buffalo Round 1",           "GB", -30.167,  131.600, 1956,    15, "atmospheric",    "Maralinga, South Australia",   null],
  ["Buffalo Round 2",           "GB", -30.167,  131.600, 1956,     3, "atmospheric",    "Maralinga, South Australia",   null],
  ["Buffalo Round 3",           "GB", -30.185,  131.540, 1956,    10, "airdrop",        "Maralinga, South Australia",   null],
  ["Buffalo Round 4",           "GB", -30.167,  131.600, 1956,    10, "atmospheric",    "Maralinga, South Australia",   null],
  ["Antler Round 1",            "GB", -30.185,  131.540, 1957,     1, "atmospheric",    "Maralinga, South Australia",   null],
  ["Antler Round 2",            "GB", -30.185,  131.540, 1957,     6, "atmospheric",    "Maralinga, South Australia",   null],
  ["Antler Round 3",            "GB", -30.185,  131.540, 1957,    25, "atmospheric",    "Maralinga, South Australia",   null],

  // ── United Kingdom — Pacific ──────────────────────────────────────────────
  ["Grapple 1 Short Granite",   "GB",   1.980, -157.453, 1957,   300, "airdrop",        "Christmas Island",             null],
  ["Grapple X",                 "GB",   1.980, -157.453, 1957,  1800, "airdrop",        "Christmas Island",             "First British thermonuclear test"],
  ["Grapple Y",                 "GB",   1.980, -157.453, 1958,  3000, "airdrop",        "Christmas Island",             "Largest British test"],
  ["Grapple Z Pennant",         "GB",   1.980, -157.453, 1958,  1000, "airdrop",        "Christmas Island",             null],
  ["Grapple Z Burgee",          "GB",   1.980, -157.453, 1958,   25,  "airdrop",        "Christmas Island",             "Last British atmospheric test"],

  // ── China — Lop Nur ───────────────────────────────────────────────────────
  ["596",                       "CN",  40.168,   89.163, 1964,    22, "atmospheric",    "Lop Nur, Xinjiang",            "First Chinese nuclear test"],
  ["Test No.2",                 "CN",  40.168,   89.163, 1965,    35, "airdrop",        "Lop Nur, Xinjiang",            null],
  ["Test No.3",                 "CN",  40.200,   89.200, 1966,   200, "airdrop",        "Lop Nur, Xinjiang",            null],
  ["Test No.4",                 "CN",  40.168,   89.163, 1966,   220, "airdrop",        "Lop Nur, Xinjiang",            null],
  ["Test No.6",                 "CN",  40.168,   89.163, 1967,  3300, "airdrop",        "Lop Nur, Xinjiang",            "First Chinese thermonuclear test"],
  ["Test No.9",                 "CN",  40.200,   89.100, 1969,  3000, "atmospheric",    "Lop Nur, Xinjiang",            "Largest Chinese atmospheric test"],
  ["Test No.14 (first UG)",     "CN",  40.168,   89.163, 1969,    20, "underground",    "Lop Nur, Xinjiang",            "First Chinese underground test"],
  ["Test No.23",                "CN",  40.168,   89.163, 1976,   200, "atmospheric",    "Lop Nur, Xinjiang",            "Last Chinese atmospheric test"],
  ["Test No.32",                "CN",  40.168,   89.163, 1984,   100, "underground",    "Lop Nur, Xinjiang",            null],
  ["Test No.45",                "CN",  40.168,   89.163, 1996,    40, "underground",    "Lop Nur, Xinjiang",            "Last Chinese nuclear test"],

  // ── India — Pokhran ───────────────────────────────────────────────────────
  ["Smiling Buddha",            "IN",  27.068,   71.733, 1974,     8, "underground",    "Pokhran, Rajasthan",           "First Indian nuclear test"],
  ["Shakti I",                  "IN",  27.068,   71.733, 1998,    45, "underground",    "Pokhran, Rajasthan",           null],
  ["Shakti II",                 "IN",  27.068,   71.733, 1998,    12, "underground",    "Pokhran, Rajasthan",           null],
  ["Shakti III",                "IN",  27.075,   71.730, 1998,   0.3, "underground",    "Pokhran, Rajasthan",           null],
  ["Shakti IV",                 "IN",  27.075,   71.730, 1998,   0.5, "underground",    "Pokhran, Rajasthan",           null],
  ["Shakti V",                  "IN",  27.075,   71.730, 1998,   0.2, "underground",    "Pokhran, Rajasthan",           null],

  // ── Pakistan — Chagai ─────────────────────────────────────────────────────
  ["Chagai-I",                  "PK",  28.951,   64.644, 1998,    36, "underground",    "Koh Kambaran, Balochistan",    "First Pakistani nuclear test"],
  ["Chagai-II",                 "PK",  28.761,   65.202, 1998,    12, "underground",    "Kharan Desert, Balochistan",   null],

  // ── North Korea — Punggye-ri ──────────────────────────────────────────────
  ["DPRK Test 1",               "KP",  41.288,  129.134, 2006,     1, "underground",    "Punggye-ri, North Hamgyong",   "First North Korean nuclear test"],
  ["DPRK Test 2",               "KP",  41.288,  129.134, 2009,     2, "underground",    "Punggye-ri, North Hamgyong",   null],
  ["DPRK Test 3",               "KP",  41.290,  129.078, 2013,     6, "underground",    "Punggye-ri, North Hamgyong",   null],
  ["DPRK Test 4",               "KP",  41.299,  129.078, 2016,     7, "underground",    "Punggye-ri, North Hamgyong",   null],
  ["DPRK Test 5",               "KP",  41.310,  129.134, 2016,    10, "underground",    "Punggye-ri, North Hamgyong",   null],
  ["DPRK Test 6",               "KP",  41.299,  129.078, 2017,   160, "underground",    "Punggye-ri, North Hamgyong",   "Claimed thermonuclear — largest DPRK test"],
];

// Country metadata
const COUNTRY_META = {
  US: { name: "United States",       color: "#4a9eff" },
  SU: { name: "USSR",                color: "#ef4444" },
  RU: { name: "Russian Federation",   color: "#ff8a80" },
  FR: { name: "France",              color: "#a78bfa" },
  GB: { name: "United Kingdom",      color: "#06b6d4" },
  CN: { name: "China",               color: "#f59e0b" },
  IN: { name: "India",               color: "#f97316" },
  PK: { name: "Pakistan",            color: "#10b981" },
  KP: { name: "North Korea",         color: "#ec4899" },
};

// Delivery type metadata
const DELIVERY_META = {
  atmospheric:     { label: "Atmospheric",      icon: "☁" },
  airdrop:         { label: "Airdrop",           icon: "✈" },
  underground:     { label: "Underground",       icon: "⬇" },
  underwater:      { label: "Underwater",        icon: "≋" },
  exoatmospheric:  { label: "Exoatmospheric",    icon: "★" },
};


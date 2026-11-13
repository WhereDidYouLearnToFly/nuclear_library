// D:\Projects\Blog\incidents\data.js
// INCIDENTS array: [name, country, lat, lon, year, ines, category, notable, site]
// ALL TEXT MUST BE ASCII ONLY — no Cyrillic, no special characters.
// Translated strings live in index.html inline <script> (UTF-8 via HTML charset).
//
// ines   : 0-7 (INES scale) or null (pre-INES era / INES not applicable)
// category: 'reactor' | 'criticality' | 'broken_arrow' | 'lost_source'
// site   : physical facility name — groups multiple events at same location

const INCIDENTS = [
  // ── Reactor accidents ───────────────────────────────────────────────────────
  ["Chernobyl Unit 4",            "SU",  51.39,  30.09, 1986, 7, "reactor",      "Reactor explosion and graphite fire; worst nuclear disaster ever",             "Chernobyl NPP"],
  ["Fukushima Daiichi",           "JP",  37.42, 141.03, 2011, 7, "reactor",      "Tsunami overwhelmed cooling; 3 reactors melted down",                         "Fukushima Daiichi"],
  ["Kyshtym Explosion",           "SU",  55.72,  60.85, 1957, 6, "reactor",      "Chemical explosion in high-level waste tank; 20 towns evacuated",             "Mayak Plant"],
  ["Windscale Fire",              "GB",  54.42,  -3.50, 1957, 5, "reactor",      "Graphite moderator fire released iodine-131 across UK",                       "Windscale"],
  ["Three Mile Island",           "US",  40.15, -76.73, 1979, 5, "reactor",      "Partial core meltdown; largest US commercial reactor accident",                "Three Mile Island"],
  ["Chalk River NRX",             "CA",  45.99, -77.43, 1952, 5, "reactor",      "Operator error caused fuel rupture; young Jimmy Carter helped decontaminate", "Chalk River Labs"],
  ["Chalk River NRU Fire",        "CA",  45.99, -77.43, 1958, 5, "reactor",      "Fuel rod caught fire during removal; workers contaminated",                   "Chalk River Labs"],
  ["Lucens Reactor",              "CH",  46.70,   6.85, 1969, 5, "reactor",      "Loss of coolant meltdown in underground cavern",                              "Lucens"],
  ["SL-1 Explosion",              "US",  43.59,-112.86, 1961, 4, "criticality",  "Control rod ejected manually; steam explosion killed all 3 operators",        "SL-1 Reactor"],
  ["Fermi 1 Meltdown",            "US",  41.96, -83.26, 1966, 4, "reactor",      "Zirconium fragment blocked coolant; partial fuel meltdown",                   "Fermi 1"],
  ["Saint-Laurent A1",            "FR",  47.72,   1.57, 1969, 4, "reactor",      "Fuel channel blockage caused fuel melt in gas-cooled reactor",                "Saint-Laurent NPP"],
  ["Saint-Laurent A2",            "FR",  47.72,   1.57, 1980, 4, "reactor",      "Accidental water flooding of reactor; fuel damaged",                          "Saint-Laurent NPP"],
  ["Bohunice A1",                 "CS",  48.49,  17.67, 1977, 4, "reactor",      "Operator error during refueling left sealing plugs in core",                  "Bohunice NPP"],
  ["Beloyarsk Unit 2",            "SU",  56.84,  61.32, 1978, 4, "reactor",      "Roof collapse in machine hall; half the fuel channels damaged",               "Beloyarsk NPP"],
  ["Mayak Criticality 1968",      "SU",  55.72,  60.85, 1968, null,"criticality","Criticality during plutonium processing; several workers irradiated",         "Mayak Plant"],
  ["Leningrad NPP 1974",          "SU",  59.92,  28.95, 1974, 3, "reactor",      "Steam pipe failure released radioactive gases to environment",                 "Leningrad NPP"],
  ["Leningrad NPP 1975",          "SU",  59.92,  28.95, 1975, 3, "reactor",      "Partial meltdown of fuel assembly; channel depressurized",                    "Leningrad NPP"],
  ["Browns Ferry Fire",           "US",  34.70, -87.12, 1975, 3, "reactor",      "Candle flame ignited cable insulation; disabled safety systems",              "Browns Ferry NPP"],
  ["Vandellos 1",                 "ES",  40.92,   0.88, 1989, 3, "reactor",      "Turbine fire damaged multiple safety systems; unit eventually shut down",      "Vandellos NPP"],
  ["Kozloduy Unit 2",             "BG",  43.79,  23.78, 1992, 3, "reactor",      "Loss of coolant flow; reactor automatically shut down",                       "Kozloduy NPP"],
  ["Davis-Besse Corrosion",       "US",  41.59, -83.09, 2002, 3, "reactor",      "Boric acid ate through reactor head; 1.9cm liner only barrier left",          "Davis-Besse"],
  ["Paks Fuel Damage",            "HU",  46.57,  18.85, 2003, 3, "reactor",      "30 fuel rods damaged in cleaning tank; radioactive gas released",             "Paks NPP"],
  ["Forsmark Power Failure",      "SE",  60.41,  18.17, 2006, 2, "reactor",      "Backup power failure left reactor without full safety coverage for 20 min",   "Forsmark NPP"],
  ["Chapelcross Fuel Fire",       "GB",  54.91,  -3.36, 1967, 3, "reactor",      "Fuel melt in one channel of graphite-moderated reactor",                      "Chapelcross"],

  // ── Criticality accidents ───────────────────────────────────────────────────
  ["Demon Core — Daghlian",       "US",  35.87,-106.30, 1945, null,"criticality","Harry Daghlian accidentally assembled critical mass; died 25 days later",     "Los Alamos"],
  ["Demon Core — Slotin",         "US",  35.87,-106.30, 1946, null,"criticality","Louis Slotin's screwdriver slipped; died 9 days after criticality exposure",   "Los Alamos"],
  ["Cecil Kelley Accident",       "US",  35.87,-106.30, 1958, null,"criticality","Plutonium solution mixing tank went critical; operator died",                  "Los Alamos"],
  ["Vinca Reactor Excursion",     "YU",  44.89,  20.62, 1958, null,"criticality","Research reactor went supercritical during experiment; 6 researchers irradiated","Vinca Institute"],
  ["Y-12 Oak Ridge",              "US",  36.02, -84.08, 1958, null,"criticality","Uranyl nitrate solution excursion in a tank; 8 workers exposed",              "Y-12 Plant"],
  ["Hanford Recuplex",            "US",  46.56,-119.54, 1962, null,"criticality","Plutonium precipitation bowl went critical; 3 workers received high doses",    "Hanford Site"],
  ["Wood River Junction",         "US",  41.50, -71.45, 1964, null,"criticality","Highly enriched uranium in solvent went critical; 1 death",                   "Wood River Junction"],
  ["Sarov 1953",                  "SU",  54.92,  43.33, 1953, null,"criticality","Accidental criticality at Soviet nuclear weapons design bureau",               "Sarov (Arzamas-16)"],
  ["Sarov 1997",                  "RU",  54.92,  43.33, 1997, null,"criticality","Experimenter assembled critical configuration by hand; died",                  "Sarov (Arzamas-16)"],
  ["Tokaimura",                   "JP",  36.47, 140.60, 1999, 4, "criticality",  "Workers poured uranium into bucket to speed process; 2 died, 439 exposed",    "JCO Tokaimura"],
  ["Idaho Chemical Processing",   "US",  43.59,-112.39, 1959, null,"criticality","Uranium solution criticality during solvent extraction; workers irradiated",   "ICPP Idaho"],

  // ── Broken arrows ───────────────────────────────────────────────────────────
  ["BC Broken Arrow",             "CA",  50.49,-126.41, 1950, null,"broken_arrow","B-36 jettisoned Mark 4 bomb to avoid crash; HE detonated, plutonium released","BC Broken Arrow 1950"],
  ["RAF Lakenheath",              "GB",  52.41,   0.56, 1956, null,"broken_arrow","B-47 crashed into igloo storing 3 Mark 6 bombs; fire averted nuclear explosion","RAF Lakenheath"],
  ["Kirtland AFB Drop",           "US",  35.04,-106.59, 1957, null,"broken_arrow","Mark 17 H-bomb fell from B-36; high explosive detonated, no nuclear yield",   "Kirtland AFB"],
  ["Tybee Island Lost Bomb",      "US",  31.97, -80.85, 1958, null,"broken_arrow","Mark 15 H-bomb jettisoned in sea off Savannah; never recovered",              "Tybee Island"],
  ["Mars Bluff",                  "US",  34.22, -79.66, 1958, null,"broken_arrow","Mark 6 accidentally released over civilian area; HE detonated, 6 injured",    "Mars Bluff SC"],
  ["Goldsboro Crash",             "US",  35.55, -77.99, 1961, null,"broken_arrow","Two Mark 39 H-bombs fell; one deployed parachute and armed — 1 switch from detonation","Goldsboro NC"],
  ["Yuba City B-52",              "US",  39.13,-121.62, 1961, null,"broken_arrow","B-52 broke apart in mid-air; nuclear weapons fell into Sacramento Valley",    "Yuba City CA"],
  ["Palomares",                   "ES",  37.25,  -1.78, 1966, null,"broken_arrow","B-52 mid-air collision scattered 4 H-bombs; 2 ruptured, plutonium contaminated farmland","Palomares"],
  ["Thule AFB Crash",             "GL",  76.53, -68.68, 1968, null,"broken_arrow","B-52 crashed; 4 H-bombs broke apart; widespread Greenland ice contamination", "Thule AFB"],
  ["Damascus Titan II",           "US",  35.37, -92.36, 1980, null,"broken_arrow","Dropped socket punctured fuel tank; explosion ejected warhead 200m away",     "Damascus AR"],
  ["McGuire BOMARC",              "US",  40.01, -74.59, 1960, null,"broken_arrow","BOMARC missile fuel exploded and burned; radioactive contamination of site",  "McGuire AFB"],

  // ── Lost / orphan sources ───────────────────────────────────────────────────
  ["Juarez Cobalt-60",            "MX",  31.74,-106.49, 1983, 4, "lost_source",  "Medical Co-60 source recycled as scrap; pellets scattered, contaminated steel shipped across US","Ciudad Juarez"],
  ["Goiania Cesium-137",          "BR", -16.72, -49.27, 1987, 5, "lost_source",  "Abandoned radiotherapy unit stolen from clinic; Cs-137 capsule opened; 4 deaths, 249 contaminated","Goiania"],
  ["Kramatorsk Cs-137",           "SU",  48.72,  37.55, 1989, 4, "lost_source",  "Cs-137 capsule unknowingly sealed into apartment wall during construction; 4 deaths over 10 years","Kramatorsk"],
  ["San Salvador Cs-137",         "SV",  13.69, -89.19, 1989, 3, "lost_source",  "Cancer therapy Cs-137 source dismantled; 3 deaths, 23 received high doses",   "San Salvador"],
  ["Tammiku Sr-90",               "EE",  59.20,  25.07, 1994, 3, "lost_source",  "Sr-90 source stolen from military storage; thief died, family members irradiated","Tammiku Estonia"],
  ["Yanango Ir-192",              "PE", -11.36, -75.37, 1999, 3, "lost_source",  "Ir-192 industrial radiography source; worker carried it in pocket; 3.5 Gy dose","Yanango Peru"],
  ["Samut Prakan Co-60",          "TH",  13.59, 100.60, 2000, 3, "lost_source",  "Disused Co-60 radiotherapy unit sold for scrap; 3 deaths, 10 hospitalized",   "Samut Prakan"],
  ["Lilo Sr-90",                  "GE",  41.70,  44.82, 1997, 2, "lost_source",  "Abandoned Soviet RTG sources; Georgian soldiers suffered radiation burns",     "Lilo Georgia"],
  ["Lia Sr-90",                   "GE",  42.10,  42.92, 2001, 3, "lost_source",  "Soviet-era Sr-90 thermoelectric generators abandoned in forest; soldiers burned","Lia Georgia"],
  ["Algeciras Co-60",             "ES",  36.13,  -5.45, 1998, 3, "lost_source",  "Co-60 source melted in steel mill; contaminated products shipped across Europe","Algeciras"],
  ["Istanbul Co-60",              "TR",  41.05,  28.82, 1999, 3, "lost_source",  "Co-60 from dismantled device found at scrap dealer; 10 workers irradiated",    "Istanbul"],
  ["Gilan Ir-192",                "IR",  37.28,  49.58, 1996, 2, "lost_source",  "Industrial radiography source; workers exposed to Ir-192",                    "Gilan Iran"],
  ["Baku Ir-192",                 "AZ",  40.41,  49.87, 2006, 2, "lost_source",  "Lost Ir-192 source found by construction workers; 7 irradiated",              "Baku Azerbaijan"],
];

const COUNTRY_META = {
  US: { name: "United States",       color: "#4a9eff" },
  SU: { name: "USSR",                color: "#ef4444" },
  RU: { name: "Russia",              color: "#ff8a80" },
  GB: { name: "United Kingdom",      color: "#06b6d4" },
  FR: { name: "France",              color: "#a78bfa" },
  JP: { name: "Japan",               color: "#f97316" },
  CA: { name: "Canada",              color: "#10b981" },
  CH: { name: "Switzerland",         color: "#e2e8f0" },
  CS: { name: "Czechoslovakia",      color: "#f59e0b" },
  YU: { name: "Yugoslavia",          color: "#84cc16" },
  ES: { name: "Spain",               color: "#ec4899" },
  HU: { name: "Hungary",             color: "#d97706" },
  SE: { name: "Sweden",              color: "#fbbf24" },
  BG: { name: "Bulgaria",            color: "#8b5cf6" },
  MX: { name: "Mexico",              color: "#34d399" },
  BR: { name: "Brazil",              color: "#22d3ee" },
  SV: { name: "El Salvador",         color: "#fb923c" },
  EE: { name: "Estonia",             color: "#a3e635" },
  PE: { name: "Peru",                color: "#facc15" },
  TH: { name: "Thailand",            color: "#38bdf8" },
  GE: { name: "Georgia",             color: "#c084fc" },
  GL: { name: "Greenland",           color: "#94a3b8" },
  TR: { name: "Turkey",              color: "#fb7185" },
  AZ: { name: "Azerbaijan",          color: "#4ade80" },
  IR: { name: "Iran",                color: "#fde68a" },
};

const CATEGORY_META = {
  reactor:      { label: "Reactor Accident",     icon: "R" },
  criticality:  { label: "Criticality Accident", icon: "C" },
  broken_arrow: { label: "Broken Arrow",          icon: "B" },
  lost_source:  { label: "Lost / Orphan Source",  icon: "L" },
};

// INES_META: color scale only — labels are in index.html for i18n
const INES_META = {
  7: "#ef4444",
  6: "#f97316",
  5: "#f59e0b",
  4: "#eab308",
  3: "#84cc16",
  2: "#22c55e",
  1: "#4ade80",
  0: "#6b7280",
};
const INES_UNRATED_COLOR = "#6b7280";

const knownTableBody = document.getElementById("knownTableBody");
const unknownTableBody = document.getElementById("unknownTableBody");
const resultsContainer = document.getElementById("resultsContainer");
const narrativeContainer = document.getElementById("narrativeContainer");
const botConsole = document.getElementById("botConsole");
const calcDisplay = document.getElementById("calcDisplay");

const constants = {
  G: 6.6743e-11,
  c: 2.99792458e8,
  sigma: 5.670374419e-8,
  pi: Math.PI,
  AU: 1.495978707e11,
  ly: 9.460730472e15,
  pc: 3.085677581e16,
  Lsun: 3.828e26,
  Msun: 1.98847e30,
  Mearth: 5.9722e24,
  Mjup: 1.89813e27,
  Rsun: 6.957e8,
  Rearth: 6.371e6,
  Rjup: 7.1492e7
};

const expressionScope = {
  pi: Math.PI,
  e: Math.E,
  G: constants.G,
  c: constants.c,
  sigma: constants.sigma,
  AU: constants.AU,
  ly: constants.ly,
  pc: constants.pc,
  Lsun: constants.Lsun,
  Msun: constants.Msun,
  Mearth: constants.Mearth,
  Mjup: constants.Mjup,
  Rsun: constants.Rsun,
  Rearth: constants.Rearth,
  Rjup: constants.Rjup,
  day: 86400,
  hour: 3600,
  minute: 60,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
  exp: Math.exp,
  pow: Math.pow,
  ln: Math.log,
  log: Math.log10,
  log10: Math.log10
};

const variableMeta = {
  Ms: { label: "Massa stellare o centrale", canonicalUnit: "kg", aliases: ["ms", "massa", "massa centrale", "massa stellare"] },
  M1: { label: "Massa maggiore", canonicalUnit: "kg", aliases: ["massa maggiore", "massa 1", "massa primaria"] },
  M2: { label: "Massa minore", canonicalUnit: "kg", aliases: ["massa minore", "massa 2", "massa secondaria"] },
  m1: { label: "Massa del corpo minore 1", canonicalUnit: "kg", aliases: ["massa piccola 1", "massa corpo 1"] },
  m2: { label: "Massa del corpo minore 2", canonicalUnit: "kg", aliases: ["massa piccola 2", "massa corpo 2"] },
  P: { label: "Periodo orbitale", canonicalUnit: "s", aliases: ["periodo", "periodo orbitale"] },
  a: { label: "Semiasse maggiore", canonicalUnit: "m", aliases: ["semiasse", "orbita", "raggio orbitale"] },
  b: { label: "Semiasse minore", canonicalUnit: "m", aliases: ["semiasse minore", "b"] },
  c: { label: "Distanza focale", canonicalUnit: "m", aliases: ["c", "distanza focale", "distanza tra fuoco e centro"] },
  e: { label: "Eccentricita", canonicalUnit: "", aliases: ["eccentricita", "eccentricity"] },
  r: { label: "Distanza istantanea dal fuoco", canonicalUnit: "m", aliases: ["r", "distanza istantanea", "distanza orbitale"] },
  r_a: { label: "Distanza all'afelio", canonicalUnit: "m", aliases: ["afelio", "distanza all'afelio", "ra"] },
  r_p: { label: "Distanza al perielio", canonicalUnit: "m", aliases: ["perielio", "distanza al perielio", "rp"] },
  v: { label: "Velocita orbitale", canonicalUnit: "m/s", aliases: ["velocita orbitale"] },
  v_t: { label: "Velocita tangenziale", canonicalUnit: "m/s", aliases: ["velocita tangenziale", "vt", "tangenziale"] },
  v_i: { label: "Velocita istantanea", canonicalUnit: "m/s", aliases: ["velocita istantanea", "vi", "velocita istantanea orbitale"] },
  omega: { label: "Velocita angolare", canonicalUnit: "rad/s", aliases: ["velocita angolare", "omega"] },
  alpha: { label: "Diametro angolare apparente del corpo occultato", canonicalUnit: "rad", aliases: ["alpha", "diametro angolare", "diametro angolare stella"] },
  beta: { label: "Diametro angolare apparente del corpo occultante", canonicalUnit: "rad", aliases: ["beta", "diametro angolare pianeta", "diametro angolare occultante"] },
  gamma: { label: "Spazio apparente angolare del transito", canonicalUnit: "rad", aliases: ["gamma", "spazio apparente angolare", "arco apparente del transito"] },
  theta: { label: "Angolo orbitale percorso nel transito", canonicalUnit: "rad", aliases: ["theta", "teta", "angolo percorso", "angolo del transito"] },
  v_escape: { label: "Velocita di fuga", canonicalUnit: "m/s", aliases: ["velocita di fuga"] },
  v_r: { label: "Velocita radiale", canonicalUnit: "m/s", aliases: ["velocita radiale", "radial velocity"] },
  r_s: { label: "Raggio di Schwarzschild", canonicalUnit: "m", aliases: ["raggio di schwarzschild"] },
  z: { label: "Redshift", canonicalUnit: "", aliases: ["redshift"] },
  lambda_obs: { label: "Lunghezza d'onda osservata", canonicalUnit: "m", aliases: ["lambda osservata"] },
  lambda_rest: { label: "Lunghezza d'onda a riposo", canonicalUnit: "m", aliases: ["lambda a riposo"] },
  L: { label: "Luminosita", canonicalUnit: "W", aliases: ["luminosita"] },
  F: { label: "Flusso radiativo", canonicalUnit: "W/m^2", aliases: ["flusso", "irradianza"] },
  d: { label: "Distanza", canonicalUnit: "m", aliases: ["distanza"] },
  T: { label: "Temperatura", canonicalUnit: "K", aliases: ["temperatura"] },
  R: { label: "Raggio stellare", canonicalUnit: "m", aliases: ["raggio", "raggio stellare"] },
  R_p: { label: "Raggio planetario", canonicalUnit: "m", aliases: ["raggio planetario", "raggio pianeta", "rplanet"] },
  delta_tr: { label: "Profondita di transito", canonicalUnit: "", aliases: ["profondita di transito", "transit depth", "delta transit"] },
  T_tr: { label: "Durata del transito", canonicalUnit: "s", aliases: ["durata del transito", "durata transito", "transit duration"] },
  P1: { label: "Primo periodo", canonicalUnit: "s", aliases: ["periodo 1", "primo periodo", "p1"] },
  P2: { label: "Secondo periodo", canonicalUnit: "s", aliases: ["periodo 2", "secondo periodo", "p2"] },
  P_syn: { label: "Periodo sinodico", canonicalUnit: "s", aliases: ["periodo sinodico", "sinodico", "psyn"] },
  m: { label: "Magnitudine apparente", canonicalUnit: "mag", aliases: ["magnitudine apparente", "m apparente", "mapp"] },
  M: { label: "Magnitudine assoluta", canonicalUnit: "mag", aliases: ["magnitudine assoluta", "m assoluta", "mabs"] },
  mu: { label: "Modulo di distanza", canonicalUnit: "mag", aliases: ["modulo di distanza", "distance modulus"] },
  delta_m: { label: "Differenza di magnitudine", canonicalUnit: "mag", aliases: ["differenza di magnitudine", "delta m"] },
  flux_ratio: { label: "Rapporto di flusso", canonicalUnit: "", aliases: ["rapporto di flusso", "flux ratio"] },
  F1: { label: "Flusso 1", canonicalUnit: "W/m^2", aliases: ["flusso 1", "f1"] },
  F2: { label: "Flusso 2", canonicalUnit: "W/m^2", aliases: ["flusso 2", "f2"] },
  F_g: { label: "Forza gravitazionale", canonicalUnit: "N", aliases: ["forza gravitazionale", "forza di gravita", "fg"] },
  F_cp: { label: "Forza centripeta", canonicalUnit: "N", aliases: ["forza centripeta", "fcp"] },
  F_cf: { label: "Forza centrifuga", canonicalUnit: "N", aliases: ["forza centrifuga", "fcf"] },
  mu_s: { label: "Magnitudine superficiale", canonicalUnit: "mag/arcsec^2", aliases: ["magnitudine superficiale", "brillantezza superficiale", "surface brightness"] },
  m_int: { label: "Magnitudine integrata", canonicalUnit: "mag", aliases: ["magnitudine integrata", "magnitudine totale", "integrated magnitude"] },
  A_ang: { label: "Area angolare apparente", canonicalUnit: "arcsec^2", aliases: ["area angolare", "area apparente", "area angolare apparente"] }
};

function unit(label, factor, aliases = []) {
  return {
    label,
    aliases,
    toBase: (value) => value * factor,
    fromBase: (value) => value / factor
  };
}

function identityUnit(label, aliases = []) {
  return {
    label,
    aliases,
    toBase: (value) => value,
    fromBase: (value) => value
  };
}

const timeUnits = {
  s: unit("s", 1, ["s", "sec", "secondo", "secondi"]),
  min: unit("min", 60, ["min", "minuto", "minuti"]),
  h: unit("h", 3600, ["h", "hr", "ora", "ore"]),
  d: unit("giorni", 86400, ["d", "giorno", "giorni", "day"]),
  yr: unit("anni", 31557600, ["yr", "anno", "anni", "year"])
};

const distanceUnits = {
  m: unit("m", 1, ["m", "metro", "metri"]),
  km: unit("km", 1e3, ["km", "chilometro", "chilometri"]),
  au: unit("AU", constants.AU, ["au", "ua", "unitaastronomica"]),
  ly: unit("ly", constants.ly, ["ly", "annoluce", "anniluce"]),
  pc: unit("pc", constants.pc, ["pc", "parsec"])
};

const speedUnits = {
  "m/s": unit("m/s", 1, ["m/s", "ms^-1", "m*s^-1"]),
  "km/s": unit("km/s", 1e3, ["km/s", "kms^-1", "km*s^-1"]),
  "km/h": unit("km/h", 1000 / 3600, ["km/h", "kmh"]),
  c: unit("c", constants.c, ["c"])
};

const wavelengthUnits = {
  m: unit("m", 1, ["m", "metro", "metri"]),
  cm: unit("cm", 1e-2, ["cm"]),
  mm: unit("mm", 1e-3, ["mm"]),
  um: unit("um", 1e-6, ["um", "micron", "micrometro", "micrometri"]),
  nm: unit("nm", 1e-9, ["nm", "nanometro", "nanometri"]),
  angstrom: unit("A", 1e-10, ["a", "angstrom"])
};

const angleUnits = {
  rad: identityUnit("rad", ["rad", "radianti", "radiante"]),
  deg: {
    label: "deg",
    aliases: ["deg", "grado", "gradi"],
    toBase: (value) => value * Math.PI / 180,
    fromBase: (value) => value * 180 / Math.PI
  },
  arcmin: {
    label: "arcmin",
    aliases: ["arcmin", "primo", "primi"],
    toBase: (value) => value * Math.PI / 180 / 60,
    fromBase: (value) => value * 180 / Math.PI * 60
  },
  arcsec: {
    label: "arcsec",
    aliases: ["arcsec", "secondo d'arco", "secondi d'arco"],
    toBase: (value) => value * Math.PI / 180 / 3600,
    fromBase: (value) => value * 180 / Math.PI * 3600
  }
};

const magnitudeUnits = {
  mag: identityUnit("mag", ["mag"])
};

const massUnits = {
  kg: unit("kg", 1, ["kg", "chilogrammo", "chilogrammi"]),
  g: unit("g", 1e-3, ["g", "grammo", "grammi"]),
  msun: unit("M_sun", constants.Msun, ["msun", "msole", "massa solare"]),
  mearth: unit("M_earth", constants.Mearth, ["mearth", "mterra", "massa terrestre"]),
  mjup: unit("M_jup", constants.Mjup, ["mjup", "mjupiter", "massa gioviana"])
};

const forceUnits = {
  n: unit("N", 1, ["n", "newton"]),
  kn: unit("kN", 1e3, ["kn"]),
  mn: unit("MN", 1e6, ["mn"])
};

const surfaceBrightnessUnits = {
  "mag/arcsec^2": identityUnit("mag/arcsec^2", ["mag/arcsec^2", "mag arcsec^-2", "mag arcsec-2"])
};

const angularAreaUnits = {
  "arcsec^2": identityUnit("arcsec^2", ["arcsec^2", "arcsec2", "secondi d'arco quadrati"]),
  "arcmin^2": unit("arcmin^2", 3600, ["arcmin^2", "arcmin2", "primi d'arco quadrati"]),
  "deg^2": unit("deg^2", 12960000, ["deg^2", "deg2", "gradi quadrati"])
};

const ratioUnits = {
  ratio: identityUnit("", ["", "ratio"]),
  percent: {
    label: "%",
    aliases: ["%", "percento", "percent"],
    toBase: (value) => value / 100,
    fromBase: (value) => value * 100
  },
  ppm: {
    label: "ppm",
    aliases: ["ppm"],
    toBase: (value) => value / 1e6,
    fromBase: (value) => value * 1e6
  }
};

const unitConfigs = {
  Ms: massUnits,
  M1: massUnits,
  M2: massUnits,
  m1: massUnits,
  m2: massUnits,
  P: timeUnits,
  P1: timeUnits,
  P2: timeUnits,
  P_syn: timeUnits,
  T_tr: timeUnits,
  a: distanceUnits,
  b: distanceUnits,
  c: distanceUnits,
  r: distanceUnits,
  r_a: distanceUnits,
  r_p: distanceUnits,
  d: distanceUnits,
  R: {
    ...distanceUnits,
    rsun: unit("R_sun", constants.Rsun, ["rsun", "rsole", "raggio solare"])
  },
  R_p: {
    ...distanceUnits,
    rearth: unit("R_earth", constants.Rearth, ["rearth", "rterra", "raggio terrestre"]),
    rjup: unit("R_jup", constants.Rjup, ["rjup", "rjupiter", "raggio gioviano"]),
    rsun: unit("R_sun", constants.Rsun, ["rsun", "rsole", "raggio solare"])
  },
  r_s: {
    ...distanceUnits,
    rsun: unit("R_sun", constants.Rsun, ["rsun", "rsole", "raggio solare"])
  },
  v: speedUnits,
  v_t: speedUnits,
  v_i: speedUnits,
  v_escape: speedUnits,
  v_r: speedUnits,
  alpha: angleUnits,
  beta: angleUnits,
  gamma: angleUnits,
  theta: angleUnits,
  omega: {
    "rad/s": identityUnit("rad/s", ["rad/s"]),
    "deg/s": {
      label: "deg/s",
      aliases: ["deg/s", "gradi/s"],
      toBase: (value) => value * Math.PI / 180,
      fromBase: (value) => value * 180 / Math.PI
    },
    "deg/h": {
      label: "deg/h",
      aliases: ["deg/h", "gradi/h"],
      toBase: (value) => value * Math.PI / 180 / 3600,
      fromBase: (value) => value * 180 / Math.PI * 3600
    }
  },
  lambda_obs: wavelengthUnits,
  lambda_rest: wavelengthUnits,
  L: {
    w: unit("W", 1, ["w", "watt"]),
    kw: unit("kW", 1e3, ["kw"]),
    lsun: unit("L_sun", constants.Lsun, ["lsun", "lsole", "luminosita solare"])
  },
  F: {
    "w/m^2": unit("W/m^2", 1, ["w/m^2", "w/m2", "wm^-2"]),
    "kw/m^2": unit("kW/m^2", 1e3, ["kw/m^2", "kw/m2"])
  },
  F1: {
    "w/m^2": unit("W/m^2", 1, ["w/m^2", "w/m2", "wm^-2"]),
    "kw/m^2": unit("kW/m^2", 1e3, ["kw/m^2", "kw/m2"])
  },
  F2: {
    "w/m^2": unit("W/m^2", 1, ["w/m^2", "w/m2", "wm^-2"]),
    "kw/m^2": unit("kW/m^2", 1e3, ["kw/m^2", "kw/m2"])
  },
  T: {
    k: identityUnit("K", ["k", "kelvin"]),
    c: {
      label: "degC",
      aliases: ["c", "degc", "celsius"],
      toBase: (value) => value + 273.15,
      fromBase: (value) => value - 273.15
    }
  },
  z: ratioUnits,
  e: ratioUnits,
  delta_tr: ratioUnits,
  flux_ratio: ratioUnits,
  m: magnitudeUnits,
  M: magnitudeUnits,
  mu: magnitudeUnits,
  delta_m: magnitudeUnits,
  m_int: magnitudeUnits,
  F_g: forceUnits,
  F_cp: forceUnits,
  F_cf: forceUnits,
  mu_s: surfaceBrightnessUnits,
  A_ang: angularAreaUnits
};

const resultVariantUnits = {
  Ms: ["kg", "msun", "mearth", "mjup"],
  M1: ["kg", "msun", "mearth", "mjup"],
  M2: ["kg", "msun", "mearth", "mjup"],
  m1: ["kg", "mearth", "mjup"],
  m2: ["kg", "mearth", "mjup"],
  P: ["s", "min", "h", "d", "yr"],
  P1: ["s", "min", "h", "d", "yr"],
  P2: ["s", "min", "h", "d", "yr"],
  P_syn: ["s", "min", "h", "d", "yr"],
  T_tr: ["s", "min", "h", "d"],
  a: ["m", "km", "au", "ly"],
  b: ["m", "km", "au", "ly"],
  c: ["m", "km", "au", "ly"],
  r: ["m", "km", "au", "ly"],
  r_a: ["m", "km", "au", "ly"],
  r_p: ["m", "km", "au", "ly"],
  d: ["m", "km", "au", "pc", "ly"],
  R: ["m", "km", "rsun"],
  R_p: ["m", "km", "rearth", "rjup"],
  r_s: ["m", "km", "rsun"],
  v: ["m/s", "km/s", "km/h", "c"],
  v_t: ["m/s", "km/s", "km/h", "c"],
  v_i: ["m/s", "km/s", "km/h", "c"],
  v_escape: ["m/s", "km/s", "km/h", "c"],
  v_r: ["m/s", "km/s", "km/h", "c"],
  alpha: ["rad", "deg", "arcmin", "arcsec"],
  beta: ["rad", "deg", "arcmin", "arcsec"],
  gamma: ["rad", "deg", "arcmin", "arcsec"],
  theta: ["rad", "deg", "arcmin", "arcsec"],
  omega: ["rad/s", "deg/s", "deg/h"],
  lambda_obs: ["m", "nm", "angstrom"],
  lambda_rest: ["m", "nm", "angstrom"],
  L: ["w", "lsun"],
  F: ["w/m^2", "kw/m^2"],
  F1: ["w/m^2", "kw/m^2"],
  F2: ["w/m^2", "kw/m^2"],
  T: ["k", "c"],
  delta_tr: ["percent", "ppm"],
  flux_ratio: ["ratio", "percent"],
  z: ["ratio", "percent"],
  e: ["ratio", "percent"],
  m: ["mag"],
  M: ["mag"],
  mu: ["mag"],
  delta_m: ["mag"],
  m_int: ["mag"],
  F_g: ["n", "kn", "mn"],
  F_cp: ["n", "kn", "mn"],
  F_cf: ["n", "kn", "mn"],
  mu_s: ["mag/arcsec^2"],
  A_ang: ["arcsec^2", "arcmin^2", "deg^2"]
};

const variableLookup = new Map();
Object.entries(variableMeta).forEach(([key, meta]) => {
  variableLookup.set(normalizeText(key), key);
  meta.aliases.forEach((alias) => variableLookup.set(normalizeText(alias), key));
});

const unitAliasLookup = {};
Object.entries(unitConfigs).forEach(([variable, configSet]) => {
  unitAliasLookup[variable] = new Map();
  Object.entries(configSet).forEach(([configKey, config]) => {
    unitAliasLookup[variable].set(normalizeUnitKey(config.label), { key: configKey, config });
    config.aliases.forEach((alias) => {
      unitAliasLookup[variable].set(normalizeUnitKey(alias), { key: configKey, config });
    });
  });
});

function clampUnitless(value) {
  return Math.max(-1, Math.min(1, value));
}

function safeDivide(a, b) {
  if (b === 0) {
    throw new Error("Divisione per zero");
  }
  return a / b;
}

function createRule(key, formulaName, inputs, unitName, compute, formulaText) {
  return {
    key,
    formulaName,
    inputs,
    unit: unitName,
    compute,
    formulaText
  };
}

const gravityMassPairs = [
  ["M1", "M2"],
  ["M1", "m1"],
  ["M1", "m2"],
  ["M2", "m1"],
  ["M2", "m2"],
  ["m1", "m2"]
];

function createGravityRules() {
  return gravityMassPairs.flatMap(([left, right]) => ([
    createRule("F_g", `forza gravitazionale tra ${left} e ${right}`, [left, right, "r"], "N",
      (values) => constants.G * values[left] * values[right] / (values.r * values.r),
      `F_g = G ${left} ${right} / r^2`),
    createRule("r", `forza gravitazionale tra ${left} e ${right}`, [left, right, "F_g"], "m",
      (values) => Math.sqrt(constants.G * values[left] * values[right] / values.F_g),
      `r = sqrt(G ${left} ${right} / F_g)`),
    createRule(left, `forza gravitazionale tra ${left} e ${right}`, ["F_g", right, "r"], "kg",
      (values) => values.F_g * values.r * values.r / (constants.G * values[right]),
      `${left} = F_g r^2 / (G ${right})`),
    createRule(right, `forza gravitazionale tra ${left} e ${right}`, ["F_g", left, "r"], "kg",
      (values) => values.F_g * values.r * values.r / (constants.G * values[left]),
      `${right} = F_g r^2 / (G ${left})`)
  ]));
}

const solverRules = [
  createRule("F", "legge del flusso radiativo", ["L", "d"], "W/m^2", ({ L, d }) => L / (4 * constants.pi * d * d), "F = L / (4 pi d^2)"),
  createRule("L", "legge del flusso radiativo", ["F", "d"], "W", ({ F, d }) => F * 4 * constants.pi * d * d, "L = 4 pi d^2 F"),
  createRule("d", "legge del flusso radiativo", ["L", "F"], "m", ({ L, F }) => Math.sqrt(L / (4 * constants.pi * F)), "d = sqrt(L / (4 pi F))"),
  createRule("a", "terza legge di Keplero", ["Ms", "P"], "m", ({ Ms, P }) => Math.cbrt(constants.G * Ms * P * P / (4 * constants.pi * constants.pi)), "a = ((G Ms P^2) / (4 pi^2))^(1/3)"),
  createRule("P", "terza legge di Keplero", ["Ms", "a"], "s", ({ Ms, a }) => 2 * constants.pi * Math.sqrt((a * a * a) / (constants.G * Ms)), "P = 2 pi sqrt(a^3 / (G Ms))"),
  createRule("Ms", "terza legge di Keplero", ["a", "P"], "kg", ({ a, P }) => (4 * constants.pi * constants.pi * a * a * a) / (constants.G * P * P), "Ms = 4 pi^2 a^3 / (G P^2)"),
  createRule("r_p", "orbita ellittica", ["a", "e"], "m", ({ a, e }) => a * (1 - e), "r_p = a (1 - e)"),
  createRule("r_a", "orbita ellittica", ["a", "e"], "m", ({ a, e }) => a * (1 + e), "r_a = a (1 + e)"),
  createRule("a", "geometria dell'ellisse", ["r_a", "r_p"], "m", ({ r_a, r_p }) => (r_a + r_p) / 2, "a = (r_a + r_p) / 2"),
  createRule("e", "geometria dell'ellisse", ["r_a", "r_p"], "", ({ r_a, r_p }) => (r_a - r_p) / (r_a + r_p), "e = (r_a - r_p) / (r_a + r_p)"),
  createRule("c", "distanza focale dell'ellisse", ["a", "e"], "m", ({ a, e }) => a * e, "c = a e"),
  createRule("e", "distanza focale dell'ellisse", ["c", "a"], "", ({ c, a }) => c / a, "e = c / a"),
  createRule("b", "semiasse minore dell'ellisse", ["a", "e"], "m", ({ a, e }) => a * Math.sqrt(1 - e * e), "b = a sqrt(1 - e^2)"),
  createRule("e", "semiasse minore dell'ellisse", ["a", "b"], "", ({ a, b }) => Math.sqrt(1 - (b * b) / (a * a)), "e = sqrt(1 - b^2 / a^2)"),
  createRule("c", "relazione tra semiassi dell'ellisse", ["a", "b"], "m", ({ a, b }) => Math.sqrt(a * a - b * b), "c = sqrt(a^2 - b^2)"),
  createRule("b", "relazione tra semiassi dell'ellisse", ["a", "c"], "m", ({ a, c }) => Math.sqrt(a * a - c * c), "b = sqrt(a^2 - c^2)"),
  createRule("a", "relazione tra semiassi dell'ellisse", ["b", "c"], "m", ({ b, c }) => Math.sqrt(b * b + c * c), "a = sqrt(b^2 + c^2)"),
  createRule("r_p", "distanza focale dell'ellisse", ["a", "c"], "m", ({ a, c }) => a - c, "r_p = a - c"),
  createRule("r_a", "distanza focale dell'ellisse", ["a", "c"], "m", ({ a, c }) => a + c, "r_a = a + c"),
  createRule("c", "geometria dell'ellisse", ["r_a", "r_p"], "m", ({ r_a, r_p }) => (r_a - r_p) / 2, "c = (r_a - r_p) / 2"),
  createRule("v", "velocita orbitale", ["Ms", "a"], "m/s", ({ Ms, a }) => Math.sqrt(constants.G * Ms / a), "v = sqrt(G Ms / a)"),
  createRule("v_t", "definizione di velocita tangenziale", ["omega", "r"], "m/s", ({ omega, r }) => omega * r, "v_t = omega r"),
  createRule("omega", "definizione di velocita tangenziale", ["v_t", "r"], "rad/s", ({ v_t, r }) => v_t / r, "omega = v_t / r"),
  createRule("r", "definizione di velocita tangenziale", ["v_t", "omega"], "m", ({ v_t, omega }) => v_t / omega, "r = v_t / omega"),
  createRule("v_t", "moto circolare uniforme", ["P", "r"], "m/s", ({ P, r }) => 2 * constants.pi * r / P, "v_t = 2 pi r / P"),
  createRule("P", "moto circolare uniforme", ["r", "v_t"], "s", ({ r, v_t }) => 2 * constants.pi * r / v_t, "P = 2 pi r / v_t"),
  createRule("r", "moto circolare uniforme", ["P", "v_t"], "m", ({ P, v_t }) => v_t * P / (2 * constants.pi), "r = v_t P / (2 pi)"),
  createRule("v_t", "equivalenza velocita orbitale tangenziale", ["v"], "m/s", ({ v }) => v, "v_t = v"),
  createRule("v", "equivalenza velocita orbitale tangenziale", ["v_t"], "m/s", ({ v_t }) => v_t, "v = v_t"),
  createRule("v_i", "equazione di vis-viva", ["Ms", "a", "r"], "m/s", ({ Ms, a, r }) => Math.sqrt(constants.G * Ms * ((2 / r) - (1 / a))), "v_i = sqrt(G Ms (2 / r - 1 / a))"),
  createRule("v_i", "vis-viva al perielio", ["Ms", "a", "r_p"], "m/s", ({ Ms, a, r_p }) => Math.sqrt(constants.G * Ms * ((2 / r_p) - (1 / a))), "v_i = sqrt(G Ms (2 / r_p - 1 / a))"),
  createRule("v_i", "vis-viva all'afelio", ["Ms", "a", "r_a"], "m/s", ({ Ms, a, r_a }) => Math.sqrt(constants.G * Ms * ((2 / r_a) - (1 / a))), "v_i = sqrt(G Ms (2 / r_a - 1 / a))"),
  createRule("omega", "moto angolare uniforme", ["P"], "rad/s", ({ P }) => 2 * constants.pi / P, "omega = 2 pi / P"),
  createRule("omega", "definizione di velocita angolare", ["v", "a"], "rad/s", ({ v, a }) => v / a, "omega = v / a"),
  createRule("v", "definizione di velocita tangenziale", ["omega", "a"], "m/s", ({ omega, a }) => omega * a, "v = omega a"),
  createRule("P", "moto angolare uniforme", ["omega"], "s", ({ omega }) => 2 * constants.pi / omega, "P = 2 pi / omega"),
  createRule("alpha", "diametro angolare apparente", ["R", "d"], "rad", ({ R, d }) => 2 * Math.asin(clampUnitless(R / d)), "alpha = 2 asin(R / d)"),
  createRule("R", "diametro angolare apparente", ["alpha", "d"], "m", ({ alpha, d }) => d * Math.sin(alpha / 2), "R = d sin(alpha / 2)"),
  createRule("d", "diametro angolare apparente", ["alpha", "R"], "m", ({ alpha, R }) => R / Math.sin(alpha / 2), "d = R / sin(alpha / 2)"),
  createRule("beta", "diametro angolare apparente dell'occultante", ["R_p", "d"], "rad", ({ R_p, d }) => 2 * Math.asin(clampUnitless(R_p / d)), "beta = 2 asin(R_p / d)"),
  createRule("R_p", "diametro angolare apparente dell'occultante", ["beta", "d"], "m", ({ beta, d }) => d * Math.sin(beta / 2), "R_p = d sin(beta / 2)"),
  createRule("d", "diametro angolare apparente dell'occultante", ["beta", "R_p"], "m", ({ beta, R_p }) => R_p / Math.sin(beta / 2), "d = R_p / sin(beta / 2)"),
  createRule("R", "Stefan-Boltzmann", ["L", "T"], "m", ({ L, T }) => Math.sqrt(L / (4 * constants.pi * constants.sigma * Math.pow(T, 4))), "R = sqrt(L / (4 pi sigma T^4))"),
  createRule("L", "Stefan-Boltzmann", ["R", "T"], "W", ({ R, T }) => 4 * constants.pi * R * R * constants.sigma * Math.pow(T, 4), "L = 4 pi R^2 sigma T^4"),
  createRule("T", "Stefan-Boltzmann", ["L", "R"], "K", ({ L, R }) => Math.pow(L / (4 * constants.pi * R * R * constants.sigma), 0.25), "T = (L / (4 pi R^2 sigma))^(1/4)"),
  createRule("z", "formula del redshift", ["lambda_obs", "lambda_rest"], "", ({ lambda_obs, lambda_rest }) => (lambda_obs - lambda_rest) / lambda_rest, "z = (lambda_obs - lambda_rest) / lambda_rest"),
  createRule("lambda_obs", "formula del redshift", ["lambda_rest", "z"], "m", ({ lambda_rest, z }) => lambda_rest * (1 + z), "lambda_obs = lambda_rest (1 + z)"),
  createRule("lambda_rest", "formula del redshift", ["lambda_obs", "z"], "m", ({ lambda_obs, z }) => lambda_obs / (1 + z), "lambda_rest = lambda_obs / (1 + z)"),
  createRule("v_escape", "velocita di fuga", ["Ms", "R"], "m/s", ({ Ms, R }) => Math.sqrt(2 * constants.G * Ms / R), "v_escape = sqrt(2 G Ms / R)"),
  createRule("r_s", "raggio di Schwarzschild", ["Ms"], "m", ({ Ms }) => (2 * constants.G * Ms) / (constants.c * constants.c), "r_s = 2 G Ms / c^2"),
  createRule("v_r", "approssimazione relativistica a basso redshift", ["z"], "m/s", ({ z }) => z * constants.c, "v_r = z c"),
  createRule("z", "approssimazione relativistica a basso redshift", ["v_r"], "", ({ v_r }) => v_r / constants.c, "z = v_r / c"),
  createRule("P_syn", "periodo sinodico", ["P1", "P2"], "s", ({ P1, P2 }) => 1 / Math.abs((1 / P1) - (1 / P2)), "1 / P_syn = |1 / P1 - 1 / P2|"),
  createRule("delta_tr", "profondita del transito", ["R_p", "R"], "", ({ R_p, R }) => Math.pow(R_p / R, 2), "delta_tr = (R_p / R)^2"),
  createRule("delta_tr", "profondita del transito in termini angolari", ["alpha", "beta"], "", ({ alpha, beta }) => Math.pow(Math.sin(beta / 2) / Math.sin(alpha / 2), 2), "delta_tr = [sin(beta / 2) / sin(alpha / 2)]^2"),
  createRule("R_p", "profondita del transito", ["delta_tr", "R"], "m", ({ delta_tr, R }) => R * Math.sqrt(delta_tr), "R_p = R sqrt(delta_tr)"),
  createRule("R", "profondita del transito", ["R_p", "delta_tr"], "m", ({ R_p, delta_tr }) => R_p / Math.sqrt(delta_tr), "R = R_p / sqrt(delta_tr)"),
  createRule("beta", "profondita del transito in termini angolari", ["delta_tr", "alpha"], "rad", ({ delta_tr, alpha }) => 2 * Math.asin(clampUnitless(Math.sqrt(delta_tr) * Math.sin(alpha / 2))), "beta = 2 asin(sqrt(delta_tr) sin(alpha / 2))"),
  createRule("T_tr", "durata del transito centrale", ["P", "a", "R", "R_p"], "s", ({ P, a, R, R_p }) => (P / constants.pi) * Math.asin(clampUnitless((R + R_p) / a)), "T_tr = (P / pi) asin((R + R_p) / a)"),
  createRule("a", "durata del transito centrale", ["P", "T_tr", "R", "R_p"], "m", ({ P, T_tr, R, R_p }) => (R + R_p) / Math.sin(constants.pi * T_tr / P), "a = (R + R_p) / sin(pi T_tr / P)"),
  createRule("gamma", "spazio apparente angolare del transito", ["R", "R_p", "d"], "rad", ({ R, R_p, d }) => 2 * Math.asin(clampUnitless((R + R_p) / d)), "gamma = 2 asin((R + R_p) / d)"),
  createRule("gamma", "spazio apparente angolare del transito", ["alpha", "beta"], "rad", ({ alpha, beta }) => 2 * Math.asin(clampUnitless(Math.sin(alpha / 2) + Math.sin(beta / 2))), "gamma = 2 asin(sin(alpha / 2) + sin(beta / 2))"),
  createRule("theta", "angolo orbitale percorso nel transito", ["omega", "T_tr"], "rad", ({ omega, T_tr }) => omega * T_tr, "theta = omega T_tr"),
  createRule("theta", "angolo orbitale percorso nel transito", ["P", "T_tr"], "rad", ({ P, T_tr }) => 2 * constants.pi * T_tr / P, "theta = 2 pi T_tr / P"),
  createRule("T_tr", "angolo orbitale percorso nel transito", ["theta", "omega"], "s", ({ theta, omega }) => theta / omega, "T_tr = theta / omega"),
  createRule("T_tr", "angolo orbitale percorso nel transito", ["theta", "P"], "s", ({ theta, P }) => theta * P / (2 * constants.pi), "T_tr = theta P / (2 pi)"),
  createRule("omega", "angolo orbitale percorso nel transito", ["theta", "T_tr"], "rad/s", ({ theta, T_tr }) => theta / T_tr, "omega = theta / T_tr"),
  createRule("mu", "modulo di distanza", ["m", "M"], "mag", ({ m, M }) => m - M, "mu = m - M"),
  createRule("m", "modulo di distanza", ["M", "mu"], "mag", ({ M, mu }) => M + mu, "m = M + mu"),
  createRule("M", "modulo di distanza", ["m", "mu"], "mag", ({ m, mu }) => m - mu, "M = m - mu"),
  createRule("mu", "modulo di distanza", ["d"], "mag", ({ d }) => 5 * Math.log10(d / constants.pc) - 5, "mu = 5 log10(d_pc) - 5"),
  createRule("d", "modulo di distanza", ["mu"], "m", ({ mu }) => constants.pc * Math.pow(10, (mu + 5) / 5), "d = 10^((mu + 5) / 5) pc"),
  createRule("m", "modulo di distanza", ["M", "d"], "mag", ({ M, d }) => M + 5 * Math.log10(d / constants.pc) - 5, "m = M + 5 log10(d_pc) - 5"),
  createRule("M", "modulo di distanza", ["m", "d"], "mag", ({ m, d }) => m - 5 * Math.log10(d / constants.pc) + 5, "M = m - 5 log10(d_pc) + 5"),
  createRule("delta_m", "formula di Pogson", ["flux_ratio"], "mag", ({ flux_ratio }) => -2.5 * Math.log10(flux_ratio), "delta_m = -2.5 log10(flux_ratio)"),
  createRule("flux_ratio", "formula di Pogson", ["delta_m"], "", ({ delta_m }) => Math.pow(10, -delta_m / 2.5), "flux_ratio = 10^(-delta_m / 2.5)"),
  createRule("delta_m", "formula di Pogson", ["F1", "F2"], "mag", ({ F1, F2 }) => -2.5 * Math.log10(F2 / F1), "delta_m = -2.5 log10(F2 / F1)"),
  createRule("flux_ratio", "rapporto di flusso", ["F1", "F2"], "", ({ F1, F2 }) => F2 / F1, "flux_ratio = F2 / F1"),
  createRule("F2", "formula di Pogson", ["F1", "delta_m"], "W/m^2", ({ F1, delta_m }) => F1 * Math.pow(10, -delta_m / 2.5), "F2 = F1 10^(-delta_m / 2.5)"),
  createRule("F1", "formula di Pogson", ["F2", "delta_m"], "W/m^2", ({ F2, delta_m }) => F2 / Math.pow(10, -delta_m / 2.5), "F1 = F2 / 10^(-delta_m / 2.5)"),
  createRule("mu_s", "relazione tra magnitudine superficiale e integrata", ["m_int", "A_ang"], "mag/arcsec^2", ({ m_int, A_ang }) => m_int + 2.5 * Math.log10(A_ang), "mu_s = m_int + 2.5 log10(A_ang)"),
  createRule("m_int", "relazione tra magnitudine superficiale e integrata", ["mu_s", "A_ang"], "mag", ({ mu_s, A_ang }) => mu_s - 2.5 * Math.log10(A_ang), "m_int = mu_s - 2.5 log10(A_ang)"),
  createRule("A_ang", "relazione tra magnitudine superficiale e integrata", ["mu_s", "m_int"], "arcsec^2", ({ mu_s, m_int }) => Math.pow(10, (mu_s - m_int) / 2.5), "A_ang = 10^((mu_s - m_int) / 2.5)"),
  createRule("F_cp", "forza centripeta", ["m1", "v_t", "r"], "N", ({ m1, v_t, r }) => m1 * v_t * v_t / r, "F_cp = m1 v_t^2 / r"),
  createRule("F_cp", "forza centripeta", ["m1", "omega", "r"], "N", ({ m1, omega, r }) => m1 * omega * omega * r, "F_cp = m1 omega^2 r"),
  createRule("v_t", "forza centripeta", ["F_cp", "m1", "r"], "m/s", ({ F_cp, m1, r }) => Math.sqrt(F_cp * r / m1), "v_t = sqrt(F_cp r / m1)"),
  createRule("omega", "forza centripeta", ["F_cp", "m1", "r"], "rad/s", ({ F_cp, m1, r }) => Math.sqrt(F_cp / (m1 * r)), "omega = sqrt(F_cp / (m1 r))"),
  createRule("r", "forza centripeta", ["m1", "v_t", "F_cp"], "m", ({ m1, v_t, F_cp }) => m1 * v_t * v_t / F_cp, "r = m1 v_t^2 / F_cp"),
  createRule("r", "forza centripeta", ["m1", "omega", "F_cp"], "m", ({ m1, omega, F_cp }) => F_cp / (m1 * omega * omega), "r = F_cp / (m1 omega^2)"),
  createRule("m1", "forza centripeta", ["F_cp", "v_t", "r"], "kg", ({ F_cp, v_t, r }) => F_cp * r / (v_t * v_t), "m1 = F_cp r / v_t^2"),
  createRule("m1", "forza centripeta", ["F_cp", "omega", "r"], "kg", ({ F_cp, omega, r }) => F_cp / (omega * omega * r), "m1 = F_cp / (omega^2 r)"),
  createRule("F_cf", "equilibrio centripeto-centrifugo", ["F_cp"], "N", ({ F_cp }) => F_cp, "F_cf = F_cp"),
  createRule("F_cp", "equilibrio centripeto-centrifugo", ["F_cf"], "N", ({ F_cf }) => F_cf, "F_cp = F_cf"),
  createRule("F_cf", "forza centrifuga", ["m1", "v_t", "r"], "N", ({ m1, v_t, r }) => m1 * v_t * v_t / r, "F_cf = m1 v_t^2 / r"),
  createRule("F_cf", "forza centrifuga", ["m1", "omega", "r"], "N", ({ m1, omega, r }) => m1 * omega * omega * r, "F_cf = m1 omega^2 r"),
  ...createGravityRules()
];

const defaultKnowns = [
  ["P", "3.52474859", "giorni"],
  ["a", "0.047", "AU"],
  ["R", "1", "R_sun"],
  ["delta_tr", "1.5", "%"],
  ["M", "4.83", "mag"],
  ["d", "10", "pc"]
];

const defaultUnknowns = [
  ["R_p", "R_jup"],
  ["T_tr", "ore"],
  ["m", "mag"],
  ["omega", "deg/h"],
  ["alpha", "arcsec"],
  ["beta", "arcsec"],
  ["gamma", "arcsec"],
  ["theta", "deg"]
];

function normalizeText(value) {
  return (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeUnitKey(value) {
  return normalizeText(value).replace(/\s+/g, "");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "non definito";
  }
  if (Math.abs(value) >= 1e4 || (Math.abs(value) > 0 && Math.abs(value) < 1e-3)) {
    return value.toExponential(6);
  }
  return value.toFixed(6).replace(/\.?0+$/, "");
}

function resolveVariableKey(value) {
  const raw = (value || "").trim();
  if (!raw) {
    return null;
  }
  if (variableMeta[raw]) {
    return raw;
  }
  return variableLookup.get(normalizeText(raw)) || null;
}

function normalizeExpression(expression) {
  return (expression || "")
    .toString()
    .trim()
    .replace(/\u2212/g, "-")
    .replace(/\u00d7/g, "*")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/(\d)\s*[xX]\s*10\s*\^?\s*([+-]?\d+)/g, "($1*10^$2)")
    .replace(/\^/g, "**");
}

function evaluateMathExpression(expression, scopeOverrides = {}) {
  const normalized = normalizeExpression(expression);
  if (!normalized) {
    throw new Error("Espressione vuota");
  }

  const scope = { ...expressionScope, ...scopeOverrides };
  const tokens = normalized.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) || [];
  const allowed = new Set(Object.keys(scope));

  for (const token of tokens) {
    if (!allowed.has(token)) {
      throw new Error(`Simbolo non riconosciuto: ${token}`);
    }
  }

  const evaluator = Function(...Object.keys(scope), `"use strict"; return (${normalized});`);
  const result = evaluator(...Object.values(scope));
  const numericResult = Number(result);

  if (!Number.isFinite(numericResult)) {
    throw new Error("Risultato non numerico");
  }

  return numericResult;
}

function listUnitAliases(variable) {
  const configSet = unitConfigs[variable];
  if (!configSet) {
    return [];
  }

  const aliases = [];
  Object.values(configSet).forEach((config) => {
    aliases.push(config.label, ...config.aliases);
  });

  return [...new Set(aliases)].filter(Boolean).sort((a, b) => b.length - a.length);
}

function splitExpressionAndUnit(rawValue, variable) {
  const trimmed = (rawValue || "").trim();
  if (!trimmed) {
    return { expression: "", inlineUnit: "" };
  }

  for (const alias of listUnitAliases(variable)) {
    const match = trimmed.match(new RegExp(`^(.*?)(?:\\s+)(${escapeRegex(alias)})$`, "i"));
    if (match && match[1].trim()) {
      return {
        expression: match[1].trim(),
        inlineUnit: match[2].trim()
      };
    }
  }

  return { expression: trimmed, inlineUnit: "" };
}

function findUnitConfig(variable, unitText) {
  const lookup = unitAliasLookup[variable];
  if (!lookup) {
    return null;
  }
  return lookup.get(normalizeUnitKey(unitText)) || null;
}

function parseQuantity(variable, rawValue, rawUnit, scopeOverrides = {}) {
  const { expression, inlineUnit } = splitExpressionAndUnit(rawValue, variable);
  const numericValue = evaluateMathExpression(expression, scopeOverrides);
  const chosenUnit = (rawUnit || "").trim() || inlineUnit;
  const unitMatch = chosenUnit ? findUnitConfig(variable, chosenUnit) : null;

  if (!chosenUnit) {
    return {
      value: numericValue,
      inputUnit: variableMeta[variable]?.canonicalUnit || "",
      displayUnit: variableMeta[variable]?.canonicalUnit || ""
    };
  }

  if (!unitMatch) {
    return {
      value: numericValue,
      inputUnit: chosenUnit,
      displayUnit: chosenUnit
    };
  }

  return {
    value: unitMatch.config.toBase(numericValue),
    inputUnit: chosenUnit,
    displayUnit: unitMatch.config.label
  };
}

function convertFromBase(variable, value, unitKeyOrAlias) {
  const unitMatch = findUnitConfig(variable, unitKeyOrAlias);
  if (!unitMatch) {
    return null;
  }

  return {
    value: unitMatch.config.fromBase(value),
    unit: unitMatch.config.label,
    key: unitMatch.key
  };
}

function formatDurationHms(totalSeconds) {
  const sign = totalSeconds < 0 ? "-" : "";
  let remaining = Math.abs(totalSeconds);
  const hours = Math.floor(remaining / 3600);
  remaining -= hours * 3600;
  const minutes = Math.floor(remaining / 60);
  remaining -= minutes * 60;
  return `${sign}${hours} h ${minutes} min ${formatNumber(remaining)} s`;
}

function formatAngleDms(totalRadians) {
  const totalDegrees = totalRadians * 180 / Math.PI;
  const sign = totalDegrees < 0 ? "-" : "";
  const absolute = Math.abs(totalDegrees);
  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = (minutesFloat - minutes) * 60;
  return `${sign}${degrees} deg ${minutes} arcmin ${formatNumber(seconds)} arcsec`;
}

function formatQuantity(variable, baseValue, preferredUnit) {
  const converted = preferredUnit ? convertFromBase(variable, baseValue, preferredUnit) : null;
  if (converted) {
    return `${formatNumber(converted.value)} ${converted.unit}`.trim();
  }
  const unitLabel = variableMeta[variable]?.canonicalUnit || preferredUnit || "";
  return `${formatNumber(baseValue)} ${unitLabel}`.trim();
}

function buildResultVariants(variable, value, primaryUnit) {
  const variants = [];
  const seen = new Set();
  const primaryNormalized = normalizeUnitKey(primaryUnit);
  const unitList = resultVariantUnits[variable] || [];

  unitList.forEach((unitKey) => {
    const converted = convertFromBase(variable, value, unitKey);
    if (!converted) {
      return;
    }
    if (normalizeUnitKey(converted.unit) === primaryNormalized) {
      return;
    }

    const line = `${converted.unit || "valore"}: ${formatNumber(converted.value)} ${converted.unit}`.trim();
    if (!seen.has(line)) {
      seen.add(line);
      variants.push(line);
    }
  });

  if (["P", "P1", "P2", "P_syn", "T_tr"].includes(variable)) {
    variants.push(`Formato ore/minuti/secondi: ${formatDurationHms(value)}`);
  }

  if (["alpha", "beta", "gamma", "theta"].includes(variable)) {
    variants.push(`Formato gradi/primi/secondi: ${formatAngleDms(value)}`);
  }

  if (["v", "v_t", "v_i", "v_escape", "v_r"].includes(variable)) {
    variants.push(`Frazione di c: ${formatNumber(value / constants.c)} c`);
  }

  return [...new Set(variants)];
}

function formatPrimaryResult(variable, value, expectedUnit) {
  if (expectedUnit) {
    const converted = convertFromBase(variable, value, expectedUnit);
    if (converted) {
      return converted;
    }
  }

  return {
    value,
    unit: variableMeta[variable]?.canonicalUnit || expectedUnit || ""
  };
}

function createKnownRow(variable = "", value = "", unitValue = "") {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="text" value="${variable}" placeholder="Es. Ms oppure delta_tr"></td>
    <td><input type="text" value="${value}" placeholder="Es. 2*pi*60 oppure 1.5"></td>
    <td><input type="text" value="${unitValue}" placeholder="giorni, AU, %, km/s"></td>
    <td><button class="row-delete" title="Elimina">x</button></td>
  `;
  tr.querySelector(".row-delete").addEventListener("click", () => tr.remove());
  knownTableBody.appendChild(tr);
}

function createUnknownRow(variable = "", unitValue = "") {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="text" value="${variable}" placeholder="Es. R_p oppure m"></td>
    <td><input type="text" value="${unitValue}" placeholder="R_jup, mag, ore"></td>
    <td><button class="row-delete" title="Elimina">x</button></td>
  `;
  tr.querySelector(".row-delete").addEventListener("click", () => tr.remove());
  unknownTableBody.appendChild(tr);
}

function logConsole(message, accent = false) {
  const line = document.createElement("div");
  line.className = `console-line${accent ? " accent" : ""}`;
  line.textContent = message;
  botConsole.appendChild(line);
  botConsole.scrollTop = botConsole.scrollHeight;
}

function gatherKnowns() {
  const rows = [...knownTableBody.querySelectorAll("tr")];
  const knowns = {};
  const issues = [];
  const entries = [];
  const expressionValues = {};

  rows.forEach((row, index) => {
    const inputs = row.querySelectorAll("input");
    const variableName = inputs[0].value.trim();
    const rawValue = inputs[1].value.trim();
    const rawUnit = inputs[2].value.trim();

    if (!variableName && !rawValue && !rawUnit) {
      return;
    }

    const variable = resolveVariableKey(variableName);
    if (!variable) {
      issues.push(`Riga dati ${index + 1}: variabile non riconosciuta (${variableName || "vuota"}).`);
      return;
    }

    if (!rawValue) {
      issues.push(`Riga dati ${index + 1}: manca il valore per ${variable}.`);
      return;
    }

    try {
      const parsed = parseQuantity(variable, rawValue, rawUnit, expressionValues);
      knowns[variable] = {
        value: parsed.value,
        unit: parsed.displayUnit
      };
      expressionValues[variable] = parsed.value;
      entries.push({
        variable,
        value: parsed.value,
        displayUnit: rawUnit || parsed.displayUnit
      });
    } catch (error) {
      issues.push(`Riga dati ${index + 1} (${variable}): ${error.message}.`);
    }
  });

  return { knowns, issues, entries };
}

function gatherUnknowns() {
  const rows = [...unknownTableBody.querySelectorAll("tr")];
  const issues = [];
  const unknownMap = new Map();

  rows.forEach((row, index) => {
    const inputs = row.querySelectorAll("input");
    const variableName = inputs[0].value.trim();
    const expectedUnit = inputs[1].value.trim();

    if (!variableName && !expectedUnit) {
      return;
    }

    const variable = resolveVariableKey(variableName);
    if (!variable) {
      issues.push(`Riga incognite ${index + 1}: variabile non riconosciuta (${variableName || "vuota"}).`);
      return;
    }

    if (!unknownMap.has(variable)) {
      unknownMap.set(variable, { variable, expectedUnit });
    }
  });

  return {
    unknowns: [...unknownMap.values()],
    issues
  };
}

function initializeState(knowns) {
  const state = {
    values: {},
    derivedSteps: {},
    stepOrder: []
  };

  Object.entries(knowns).forEach(([key, value]) => {
    state.values[key] = value;
  });

  return state;
}

function solveVariable(variable, state, activePath = new Set()) {
  if (state.values[variable]) {
    return true;
  }

  if (activePath.has(variable)) {
    return false;
  }

  activePath.add(variable);
  const candidateRules = solverRules.filter((rule) => rule.key === variable);

  for (const rule of candidateRules) {
    let canSolve = true;

    for (const input of rule.inputs) {
      if (!state.values[input] && !solveVariable(input, state, activePath)) {
        canSolve = false;
        break;
      }
    }

    if (!canSolve) {
      continue;
    }

    try {
      const inputValues = {};
      rule.inputs.forEach((input) => {
        inputValues[input] = state.values[input].value;
      });

      const computedValue = Number(rule.compute(inputValues));
      if (!Number.isFinite(computedValue)) {
        continue;
      }

      state.values[variable] = { value: computedValue, unit: rule.unit };
      if (!state.derivedSteps[variable]) {
        state.derivedSteps[variable] = {
          variable,
          value: computedValue,
          unit: rule.unit,
          ruleName: rule.formulaName,
          formulaText: rule.formulaText
        };
        state.stepOrder.push(state.derivedSteps[variable]);
      }

      activePath.delete(variable);
      return true;
    } catch (error) {
      continue;
    }
  }

  activePath.delete(variable);
  return false;
}

function renderResults(entries) {
  const resolved = entries.filter((entry) => !entry.unresolved);

  if (!resolved.length) {
    resultsContainer.className = "results-list empty";
    resultsContainer.textContent = "Il bot non ha trovato combinazioni risolvibili con i dati correnti.";
    return;
  }

  resultsContainer.className = "results-list";
  resultsContainer.innerHTML = "";

  entries.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "result-item";

    if (entry.unresolved) {
      card.innerHTML = `
        <strong>${entry.variable} non risolta</strong>
        <div>Servono altri dati compatibili con le relazioni del solver.</div>
      `;
      resultsContainer.appendChild(card);
      return;
    }

    const primary = formatPrimaryResult(entry.variable, entry.value, entry.expectedUnit);
    const variants = buildResultVariants(entry.variable, entry.value, primary.unit);

    card.innerHTML = `
      <strong>${entry.variable} = ${formatNumber(primary.value)} ${primary.unit}</strong>
      <div>${entry.formulaText}</div>
      ${variants.length ? `<div class="result-variants">${variants.map((line) => `<div>${line}</div>`).join("")}</div>` : ""}
    `;
    resultsContainer.appendChild(card);
  });
}

function renderNarrative(inputEntries, state, resultEntries, issues) {
  const paragraphs = [];

  if (inputEntries.length) {
    const dataText = inputEntries
      .map((entry) => `${entry.variable} = ${formatQuantity(entry.variable, entry.value, entry.displayUnit)}`)
      .join("; ");
    paragraphs.push(`Dati del problema: ${dataText}.`);
  }

  if (issues.length) {
    paragraphs.push(`Note del solver: ${issues.join(" ")}`);
  }

  if (state.stepOrder.length) {
    state.stepOrder.forEach((step) => {
      const rendered = formatQuantity(step.variable, step.value, step.unit);
      paragraphs.push(`Dalla ${step.ruleName} otteniamo ${step.variable} = ${rendered}. Formula usata: ${step.formulaText}.`);
    });
  }

  const resolved = resultEntries.filter((entry) => !entry.unresolved);
  if (resolved.length) {
    const summary = resolved
      .map((entry) => `${entry.variable} = ${formatQuantity(entry.variable, entry.value, entry.expectedUnit || entry.unit)}`)
      .join("; ");
    paragraphs.push(`Conclusione: ${summary}.`);
  }

  const unresolved = resultEntries.filter((entry) => entry.unresolved);
  if (unresolved.length) {
    paragraphs.push(`Grandezze non risolte: ${unresolved.map((entry) => entry.variable).join(", ")}.`);
  }

  if (!paragraphs.length) {
    narrativeContainer.className = "narrative-output empty";
    narrativeContainer.textContent = "Quando risolvi un problema, qui compare il testo commentato con le formule utilizzate.";
    return;
  }

  narrativeContainer.className = "narrative-output";
  narrativeContainer.innerHTML = paragraphs.map((text) => `<p>${text}</p>`).join("");
}

function runSolver() {
  const { knowns, issues: knownIssues, entries: inputEntries } = gatherKnowns();
  const { unknowns, issues: unknownIssues } = gatherUnknowns();
  const allIssues = [...knownIssues, ...unknownIssues];
  const state = initializeState(knowns);

  resultsContainer.classList.remove("empty");
  resultsContainer.innerHTML = "";
  botConsole.innerHTML = "";

  logConsole(`Analisi avviata. Dati noti: ${Object.keys(knowns).length}, incognite: ${unknowns.length}`, true);
  allIssues.forEach((issue) => logConsole(issue));

  if (!unknowns.length) {
    resultsContainer.className = "results-list empty";
    resultsContainer.textContent = "Aggiungi almeno una incognita.";
    renderNarrative(inputEntries, state, [], allIssues);
    logConsole("Nessuna incognita disponibile.");
    return;
  }

  const resultEntries = [];

  unknowns.forEach((unknown) => {
    logConsole(`Cerco una formula per ${unknown.variable}...`);
    const solved = solveVariable(unknown.variable, state);
    if (!solved || !state.values[unknown.variable]) {
      logConsole(`Non trovo dati sufficienti per ${unknown.variable}.`);
      resultEntries.push({ variable: unknown.variable, unresolved: true });
      return;
    }

    const step = state.derivedSteps[unknown.variable];
    if (step) {
      logConsole(`Risolto ${unknown.variable} con ${step.ruleName}.`, true);
      resultEntries.push({
        ...step,
        expectedUnit: unknown.expectedUnit
      });
      return;
    }

    logConsole(`${unknown.variable} era gia presente tra i dati inseriti.`, true);
    resultEntries.push({
      variable: unknown.variable,
      value: state.values[unknown.variable].value,
      unit: state.values[unknown.variable].unit,
      formulaText: "Valore gia fornito nei dati.",
      ruleName: "dato iniziale",
      expectedUnit: unknown.expectedUnit
    });
  });

  renderResults(resultEntries);
  renderNarrative(inputEntries, state, resultEntries, allIssues);
}

function insertCalculatorValue(value) {
  calcDisplay.value = calcDisplay.value === "0" ? value : `${calcDisplay.value}${value}`;
}

function evaluateExpression() {
  try {
    calcDisplay.value = formatNumber(evaluateMathExpression(calcDisplay.value));
  } catch (error) {
    calcDisplay.value = "Errore";
  }
}

function setConversionResult(element, lines) {
  element.innerHTML = lines.map((line) => `<div>${line}</div>`).join("");
}

function convertDecimalDegrees() {
  const value = Number(document.getElementById("decimalDegreesInput").value);
  if (!Number.isFinite(value)) {
    setConversionResult(document.getElementById("degreeResults"), ["Inserisci un numero valido."]);
    return;
  }

  const sign = value < 0 ? -1 : 1;
  const abs = Math.abs(value);
  const degrees = Math.floor(abs);
  const minutesFloat = (abs - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = (minutesFloat - minutes) * 60;
  const radians = value * Math.PI / 180;

  setConversionResult(document.getElementById("degreeResults"), [
    `DMS: ${degrees * sign} deg ${minutes} arcmin ${formatNumber(seconds)} arcsec`,
    `Radianti: ${formatNumber(radians)} rad`
  ]);
}

function convertDms() {
  const deg = Number(document.getElementById("dmsDeg").value);
  const min = Number(document.getElementById("dmsMin").value);
  const sec = Number(document.getElementById("dmsSec").value);
  if (![deg, min, sec].every(Number.isFinite)) {
    setConversionResult(document.getElementById("dmsResults"), ["Compila gradi, primi e secondi."]);
    return;
  }

  const sign = deg < 0 ? -1 : 1;
  const absDegrees = Math.abs(deg) + (Math.abs(min) / 60) + (Math.abs(sec) / 3600);
  const decimalDegrees = absDegrees * sign;
  const radians = decimalDegrees * Math.PI / 180;

  setConversionResult(document.getElementById("dmsResults"), [
    `Gradi decimali: ${formatNumber(decimalDegrees)} deg`,
    `Radianti: ${formatNumber(radians)} rad`
  ]);
}

function convertScientific() {
  const mantissa = Number(document.getElementById("sciMantissa").value);
  const exponent = Number(document.getElementById("sciExponent").value);
  if (!Number.isFinite(mantissa) || !Number.isFinite(exponent)) {
    setConversionResult(document.getElementById("scientificResults"), ["Inserisci coefficiente ed esponente."]);
    return;
  }

  const result = mantissa * Math.pow(10, exponent);
  setConversionResult(document.getElementById("scientificResults"), [
    `${mantissa} x 10^${exponent} = ${formatNumber(result)}`,
    `Forma esponenziale JS: ${result.toExponential(8)}`
  ]);
}

function loadDemoData() {
  knownTableBody.innerHTML = "";
  unknownTableBody.innerHTML = "";
  defaultKnowns.forEach((entry) => createKnownRow(...entry));
  defaultUnknowns.forEach((entry) => createUnknownRow(...entry));
  resultsContainer.className = "results-list empty";
  resultsContainer.textContent = "Esempio caricato. Premi \"Risolvi tutto\".";
  narrativeContainer.className = "narrative-output empty";
  narrativeContainer.textContent = "Dataset demo pronto: transito, magnitudini e velocita angolare.";
  botConsole.innerHTML = "";
  logConsole("Dataset demo pronto: prova un problema di transito con grandezze fotometriche.", true);
}

document.getElementById("addKnownBtn").addEventListener("click", () => createKnownRow());
document.getElementById("addUnknownBtn").addEventListener("click", () => createUnknownRow());
document.getElementById("loadDemoBtn").addEventListener("click", loadDemoData);
document.getElementById("solveBtn").addEventListener("click", runSolver);

document.querySelectorAll(".calc-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const insert = button.dataset.insert;
    const constant = button.dataset.constant;

    if (insert) {
      insertCalculatorValue(insert);
      return;
    }

    if (constant) {
      insertCalculatorValue(constant);
      return;
    }

    if (action === "clear") {
      calcDisplay.value = "0";
    } else if (action === "backspace") {
      calcDisplay.value = calcDisplay.value.length > 1 ? calcDisplay.value.slice(0, -1) : "0";
    } else if (action === "evaluate") {
      evaluateExpression();
    } else if (action === "scientific") {
      insertCalculatorValue("*10^");
    }
  });
});

document.getElementById("convertDegreesBtn").addEventListener("click", convertDecimalDegrees);
document.getElementById("convertDmsBtn").addEventListener("click", convertDms);
document.getElementById("convertScientificBtn").addEventListener("click", convertScientific);

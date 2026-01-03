function getByPath(obj, path) {
  // supports: a.b[0].c
  const parts = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  let cur = obj;
  for (const p of parts) {
    if (cur == null || !(p in cur)) return undefined;
    cur = cur[p];
  }
  return cur;
}

function flattenToString(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return JSON.stringify(v);
}

function extractIsoDates(text) {
  return text.match(/\b\d{4}-\d{2}-\d{2}\b/g) || [];
}

function extractPhoneLike(text) {
  // simple “phone-ish” capture; governance is from factsUsed verification anyway
  const matches = text.match(/(\+?\d[\d\s\-()]{7,}\d)/g) || [];
  return matches.map((m) => m.trim());
}

function assertFactsUsedPathsExist(facts, factsUsed) {
  const missing = [];
  for (const p of factsUsed || []) {
    if (getByPath(facts, p) === undefined) missing.push(p);
  }
  return missing;
}

function assertSensitiveValuesAreCited(facts, aiJson) {
  const citedValues = (aiJson.factsUsed || [])
    .map((p) => flattenToString(getByPath(facts, p)));

  const answer = aiJson.answer || "";

  // if answer includes ISO dates, ensure at least one cited value contains each date
  for (const d of extractIsoDates(answer)) {
    const ok = citedValues.some((v) => v.includes(d));
    if (!ok) {
      return { ok: false, reason: `Date "${d}" not backed by factsUsed.` };
    }
  }

  // if answer includes phone-like strings, ensure each phone-like substring appears in cited values
  for (const ph of extractPhoneLike(answer)) {
    const ok = citedValues.some((v) => v.replace(/\s+/g, "").includes(ph.replace(/\s+/g, "")));
    if (!ok) {
      // Don’t hard-fail on every number, but do fail if it looks like a phone and not cited
      if (ph.replace(/\D/g, "").length >= 10) {
        return { ok: false, reason: `Phone-like value "${ph}" not backed by factsUsed.` };
      }
    }
  }

  return { ok: true };
}

module.exports = {
  getByPath,
  assertFactsUsedPathsExist,
  assertSensitiveValuesAreCited
};

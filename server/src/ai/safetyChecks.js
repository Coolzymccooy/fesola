function pathExists(obj, path) {
  // supports dot paths + [index]
  const tokens = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  let cur = obj;
  for (const t of tokens) {
    if (cur == null) return false;
    if (!(t in cur)) return false;
    cur = cur[t];
  }
  return true;
}

function containsDateLike(text) {
  // catches 2026-01-05, 05/01/2026, January 5, 2026-ish
  return /\b(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4})\b/.test(text);
}

function validateAiJson({ aiJson, facts }) {
  const issues = [];

  // factsUsed must exist
  const factsUsed = Array.isArray(aiJson?.factsUsed) ? aiJson.factsUsed : [];
  for (const p of factsUsed) {
    if (!pathExists(facts, p)) issues.push(`factsUsed path not found: ${p}`);
  }

  // if answer contains date-like strings, there MUST be at least one calendar path cited
  if (typeof aiJson?.answer === "string" && containsDateLike(aiJson.answer)) {
    const hasCalendarCitation = factsUsed.some((p) => p.startsWith("calendar."));
    if (!hasCalendarCitation) issues.push("Answer contains a date-like value but no calendar.* citation in factsUsed");
  }

  return issues;
}

module.exports = { validateAiJson };

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const factsPath = path.join(__dirname, "school_facts.json");
const schoolFactsSchema = require("./schemas/schoolFacts.schema.json");

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const validateFacts = ajv.compile(schoolFactsSchema);

let cache = null;
let cacheMtimeMs = 0;

function readFactsFile() {
  const stat = fs.statSync(factsPath);
  if (cache && stat.mtimeMs === cacheMtimeMs) return cache;

  const raw = fs.readFileSync(factsPath, "utf-8");
  const data = JSON.parse(raw);

  const ok = validateFacts(data);
  if (!ok) {
    const err = new Error("SCHOOL_FACTS schema validation failed");
    err.details = validateFacts.errors;
    throw err;
  }

  cache = data;
  cacheMtimeMs = stat.mtimeMs;
  return cache;
}

function getFacts() {
  return readFactsFile();
}

function setFacts(nextFacts) {
  const ok = validateFacts(nextFacts);
  if (!ok) {
    const err = new Error("SCHOOL_FACTS schema validation failed");
    err.details = validateFacts.errors;
    throw err;
  }

  fs.writeFileSync(factsPath, JSON.stringify(nextFacts, null, 2), "utf-8");
  cache = nextFacts;
  cacheMtimeMs = fs.statSync(factsPath).mtimeMs;
  return cache;
}

module.exports = { getFacts, setFacts };

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const FACTS_PATH = path.join(__dirname, "school_facts.json");
const FACTS_SCHEMA_PATH = path.join(__dirname, "../schemas/schoolFacts.schema.json");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

let cached = null;
let cachedMtimeMs = 0;

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function validateFactsOrThrow(facts) {
  if (!fs.existsSync(FACTS_SCHEMA_PATH)) return; // allow running without schema
  const schema = readJson(FACTS_SCHEMA_PATH);
  const validate = ajv.compile(schema);
  const ok = validate(facts);
  if (!ok) {
    const msg = ajv.errorsText(validate.errors, { separator: "\n" });
    throw new Error(`SCHOOL_FACTS schema validation failed:\n${msg}`);
  }
}

function getFacts() {
  const stat = fs.statSync(FACTS_PATH);
  if (!cached || stat.mtimeMs !== cachedMtimeMs) {
    const facts = readJson(FACTS_PATH);
    validateFactsOrThrow(facts);
    cached = facts;
    cachedMtimeMs = stat.mtimeMs;
  }
  return cached;
}

function saveFacts(nextFacts) {
  validateFactsOrThrow(nextFacts);
  fs.writeFileSync(FACTS_PATH, JSON.stringify(nextFacts, null, 2), "utf8");
  cached = nextFacts;
  cachedMtimeMs = fs.statSync(FACTS_PATH).mtimeMs;
}

module.exports = {
  getFacts,
  saveFacts,
  FACTS_PATH
};

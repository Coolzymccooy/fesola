const Ajv = require("ajv");
const aiResponseSchema = require("../facts/schemas/aiResponse.schema.json");
const {
  systemPrompt,
  userPrompt,
  enrollmentSystemPrompt,
  enrollmentUserPrompt,
  feedbackAnalysisPrompt,
  campusMatcherSystemPrompt,
  campusMatcherUserPrompt,
} = require("./promptTemplates");
const { validateAiJson } = require("./safetyChecks");

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const validateResponse = ajv.compile(aiResponseSchema);

const MODEL = "gemini-2.5-flash";

function extractJson(text) {
  try { return JSON.parse(text); } catch {}
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return JSON.parse(text.slice(start, end + 1));
  }
  throw new Error("Model did not return valid JSON");
}

async function callGemini(ai, systemInstruction, userMessage) {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: "user", parts: [{ text: userMessage }] }],
    config: { systemInstruction, responseMimeType: "application/json" },
  });
  return (
    response?.text ||
    response?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join("") ||
    ""
  );
}

// ── Standard admissions chat ──────────────────
async function respond({ ai, facts, message, language = "en" }) {
  const text = await callGemini(ai, systemPrompt(facts, language), userPrompt(message));
  const aiJson = extractJson(text);

  const ok = validateResponse(aiJson);
  if (!ok) {
    const err = new Error("AI response JSON did not match schema");
    err.details = validateResponse.errors;
    throw err;
  }

  const issues = validateAiJson({ aiJson, facts });
  if (issues.length) {
    const err = new Error("AI response failed safety checks");
    err.details = issues;
    throw err;
  }

  return aiJson;
}

// ── Enrollment wizard ─────────────────────────
async function enrollmentTurn({ ai, facts, message, collectedData, language = "en" }) {
  const text = await callGemini(
    ai,
    enrollmentSystemPrompt(facts, language),
    enrollmentUserPrompt(message, collectedData)
  );
  return extractJson(text);
}

// ── Feedback intelligence ─────────────────────
async function analyseFeedback({ ai, feedbackEntries }) {
  const text = await callGemini(ai, feedbackAnalysisPrompt(feedbackEntries), "Analyse now.");
  return extractJson(text);
}

// ── Campus matcher ────────────────────────────
async function matchCampus({ ai, facts, age, location, requirements }) {
  const text = await callGemini(
    ai,
    campusMatcherSystemPrompt(facts),
    campusMatcherUserPrompt(age, location, requirements)
  );
  return extractJson(text);
}

module.exports = { respond, enrollmentTurn, analyseFeedback, matchCampus };

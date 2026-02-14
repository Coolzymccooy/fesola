


const Ajv = require("ajv");
const aiResponseSchema = require("../schemas/aiResponse.schema.json");
const { systemPrompt, userPrompt } = require("./promptTemplates");
const { validateAiJson } = require("./safetyChecks");

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const validateResponse = ajv.compile(aiResponseSchema);

function extractJson(text) {
  // try direct parse first
  try { return JSON.parse(text); } catch {}

  // try to find the first JSON object in the text
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) {
    const slice = text.slice(start, end + 1);
    return JSON.parse(slice);
  }
  throw new Error("Model did not return valid JSON");
}

async function respond({ ai, facts, message }) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: "user", parts: [{ text: userPrompt(message) }] }],
    config: {
      systemInstruction: systemPrompt(facts),
      // (If your SDK supports it, keep it. If not, harmless.)
      responseMimeType: "application/json"
    }
  });

  const text =
    response?.text ||
    response?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join("") ||
    "";

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

module.exports = { respond };

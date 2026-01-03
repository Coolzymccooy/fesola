const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");
const { buildSystemInstruction, buildUserPrompt } = require("./promptTemplates");
const { assertFactsUsedPathsExist, assertSensitiveValuesAreCited } = require("./safetyChecks");

const schemaPath = path.join(process.cwd(), "server", "schemas", "aiResponse.schema.json");
const responseSchema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
addFormats(ajv);
const validateResponse = ajv.compile(responseSchema);

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function extractModelText(response) {
  return (
    response?.text ||
    response?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join("") ||
    ""
  );
}

async function generateJsonOnce({ getAI, message, facts }) {
  const ai = getAI();
  const systemInstruction = buildSystemInstruction();
  const userPrompt = buildUserPrompt(message, facts);

  const resp = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    config: {
      systemInstruction,
      // Many Gemini SDKs honor this for strict JSON output:
      responseMimeType: "application/json",
      temperature: 0.2
    }
  });

  const text = extractModelText(resp).trim();
  const parsed = safeJsonParse(text);
  return { text, parsed };
}

function normalizeFallback(facts, message) {
  const campus0 = facts?.campuses?.[0] || {};
  return {
    answer:
      "I don’t have the latest update for that yet. Please contact the school office to confirm.",
    factsUsed: [
      campus0?.whatsapp ? "campuses[0].whatsapp" : null,
      campus0?.phone ? "campuses[0].phone" : null
    ].filter(Boolean),
    unknowns: [message ? `Requested: ${message}` : "Requested info not available"],
    handoff: {
      needed: true,
      message: "Please contact the school office to confirm this information.",
      whatsapp: campus0?.whatsapp || null,
      phone: (campus0?.phone && campus0.phone[0]) || null
    }
  };
}

async function respondAdmissionsJson({ getAI, message, facts }) {
  // 1st attempt
  const a1 = await generateJsonOnce({ getAI, message, facts });
  let out = a1.parsed;

  // If model didn’t return JSON, retry once with a stronger “repair” instruction
  if (!out) {
    const repairedMessage =
      message +
      "\n\nIMPORTANT: Return ONLY valid JSON. Do not include markdown or extra text.";
    const a2 = await generateJsonOnce({ getAI, message: repairedMessage, facts });
    out = a2.parsed;
  }

  // If still not JSON, fallback
  if (!out) return normalizeFallback(facts, message);

  // Validate schema
  const ok = validateResponse(out);
  if (!ok) return normalizeFallback(facts, message);

  // Verify factsUsed paths exist
  const missingPaths = assertFactsUsedPathsExist(facts, out.factsUsed);
  if (missingPaths.length) {
    return normalizeFallback(facts, `Missing factsUsed paths: ${missingPaths.join(", ")}`);
  }

  // Verify dates/phones in answer are backed by cited values
  const backed = assertSensitiveValuesAreCited(facts, out);
  if (!backed.ok) {
    return normalizeFallback(facts, backed.reason);
  }

  return out;
}

module.exports = { respondAdmissionsJson };

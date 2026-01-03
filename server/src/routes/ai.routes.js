const express = require("express");
const { loadFacts } = require("../facts/factsStore");
const { respondAdmissionsJson } = require("../ai/aiResponder");

module.exports = function admissionsRoutes({ getAI }) {
  const router = express.Router();

  router.post("/chat", async (req, res) => {
    try {
      const message = String(req.body?.message || "").trim();
      if (!message) return res.status(400).json({ error: "message is required" });

      const facts = loadFacts();
      const aiJson = await respondAdmissionsJson({ getAI, message, facts });

      // ✅ return strict JSON schema, plus "text" so your current UI doesn’t break
      return res.json({ ...aiJson, text: aiJson.answer });
    } catch (e) {
      const status = e?.status || 500;
      return res.status(status).json({
        error: e?.message || "Server error",
        details: e?.details || undefined
      });
    }
  });

  return router;
};

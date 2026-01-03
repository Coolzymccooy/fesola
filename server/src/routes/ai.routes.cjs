


const express = require("express");
const { getFacts } = require("../facts/factsStore");
const { respond } = require("../ai/aiResponder");

module.exports = function aiRoutes({ getAI }) {
  const router = express.Router();

  router.post("/chat", async (req, res) => {
    try {
      const message = String(req.body?.message || "").trim();
      if (!message) return res.status(400).json({ error: "message is required" });

      const facts = getFacts();
      const ai = getAI();

      const out = await respond({ ai, facts, message });

      // IMPORTANT: keep backward compatibility for your current UI
      res.json({ ...out, text: out.answer });
    } catch (e) {
      res.status(500).json({
        error: e?.message || "Server error",
        details: e?.details || null
      });
    }
  });

  return router;
};

const express = require("express");
const { getFacts } = require("../facts/factsStore");
const { respond, enrollmentTurn, matchCampus } = require("../ai/aiResponder");

module.exports = function aiRoutes({ getAI }) {
  const router = express.Router();

  // ── Admissions chat (supports language param) ─────────────────
  router.post("/chat", async (req, res) => {
    try {
      const message = String(req.body?.message || "").trim();
      const language = String(req.body?.language || "en").trim();
      if (!message) return res.status(400).json({ error: "message is required" });

      const facts = getFacts();
      const ai = getAI();
      const out = await respond({ ai, facts, message, language });
      res.json({ ...out, text: out.answer });
    } catch (e) {
      console.error("[Gemini API Error]:", e);
      res.status(500).json({ error: e?.message || "Server error", details: e?.details || null });
    }
  });

  // ── Enrollment wizard (multi-turn, stateless) ─────────────────
  router.post("/enroll", async (req, res) => {
    try {
      const message = String(req.body?.message || "").trim();
      const language = String(req.body?.language || "en").trim();
      const collectedData = req.body?.collectedData || {
        childName: null, dateOfBirth: null, parentName: null,
        parentPhone: null, parentEmail: null, gradeApplying: null,
        admissionType: null, previousSchool: null, specialNotes: null,
      };

      if (!message) return res.status(400).json({ error: "message is required" });

      const facts = getFacts();
      const ai = getAI();
      const out = await enrollmentTurn({ ai, facts, message, collectedData, language });
      res.json(out);
    } catch (e) {
      console.error("[Gemini API Error]:", e);
      res.status(500).json({ error: e?.message || "Server error", details: e?.details || null });
    }
  });

  // ── Enrollment submit (save completed application) ────────────
  router.post("/enroll/submit", async (req, res) => {
    try {
      const { collectedData } = req.body || {};
      if (!collectedData?.childName || !collectedData?.parentPhone) {
        return res.status(400).json({ error: "Incomplete application data" });
      }
      const entry = { ...collectedData, submittedAt: new Date().toISOString() };
      console.log("[enrollment] New application submitted:", JSON.stringify(entry));
      res.json({ ok: true, message: "Application received. The admissions team will contact you shortly." });
    } catch (e) {
      res.status(500).json({ error: e?.message || "Server error" });
    }
  });

  // ── Campus matcher ────────────────────────────────────────────
  router.post("/match-campus", async (req, res) => {
    try {
      const age = String(req.body?.age || "").trim();
      const location = String(req.body?.location || "").trim();
      const requirements = String(req.body?.requirements || "").trim();
      if (!age) return res.status(400).json({ error: "age is required" });

      const facts = getFacts();
      const ai = getAI();
      const out = await matchCampus({ ai, facts, age, location, requirements });
      res.json(out);
    } catch (e) {
      console.error("[Gemini API Error]:", e);
      res.status(500).json({ error: e?.message || "Server error", details: e?.details || null });
    }
  });

  return router;
};

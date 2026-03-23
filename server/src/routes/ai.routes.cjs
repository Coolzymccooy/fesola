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

      const fs = require('fs');
      const path = require('path');
      const CRM_FILE = path.join(__dirname, "../facts/crm_store.json");
      let all = [];
      if (fs.existsSync(CRM_FILE)) {
        try { all = JSON.parse(fs.readFileSync(CRM_FILE, "utf-8")); } catch{}
      }

      const logEntry = {
        id: Date.now(),
        type: "Enrollment",
        name: collectedData?.parentName || "Unknown Parent",
        email: collectedData?.parentEmail || "No Email",
        phone: collectedData?.parentPhone || "",
        subject: `Enrollment: ${collectedData?.childName} (Grade: ${collectedData?.gradeApplying})`,
        message: `Child DOB: ${collectedData?.dateOfBirth}\nAdmission Type: ${collectedData?.admissionType}\nPrevious School: ${collectedData?.previousSchool}\nNotes: ${collectedData?.specialNotes}`,
        status: "New",
        receivedAt: new Date().toISOString()
      };
      all.unshift(logEntry);
      fs.writeFileSync(CRM_FILE, JSON.stringify(all, null, 2), "utf-8");

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

  // ── Public Facts (For UI Data Binding) ───────────────────────
  router.get("/public-facts", (req, res) => {
    try {
      const facts = getFacts();
      res.json(facts);
    } catch (e) {
      res.status(500).json({ error: "Could not load public facts" });
    }
  });

  return router;
};

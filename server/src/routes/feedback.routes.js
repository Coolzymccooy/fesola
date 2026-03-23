const express = require("express");
const fs = require("fs");
const path = require("path");
const { analyseFeedback } = require("../ai/aiResponder");

const FEEDBACK_FILE = path.join(__dirname, "../facts/feedback_store.json");

function loadFeedback() {
  if (!fs.existsSync(FEEDBACK_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(FEEDBACK_FILE, "utf-8")); }
  catch { return []; }
}

function saveFeedback(entries) {
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

module.exports = function feedbackRoutes({ getAI }) {
  const router = express.Router();

  // ── Submit feedback ───────────────────────────────────────────
  router.post("/submit", async (req, res) => {
    try {
      const { rating, comment, category, name } = req.body || {};
      if (!rating || !comment) {
        return res.status(400).json({ error: "rating and comment are required" });
      }

      const entry = {
        id: Date.now(),
        rating: Number(rating),
        comment: String(comment),
        category: String(category || "General"),
        name: name ? String(name) : "Anonymous",
        submittedAt: new Date().toISOString(),
      };

      const all = loadFeedback();
      all.push(entry);
      saveFeedback(all);

      console.log("[feedback] New entry:", JSON.stringify(entry));

      // Run AI analysis on most recent 20 entries (fast, cheap)
      let analysis = null;
      try {
        const ai = getAI();
        const recent = all.slice(-20);
        analysis = await analyseFeedback({ ai, feedbackEntries: recent });
      } catch (e) {
        console.error("[feedback] AI analysis error:", e?.message);
      }

      res.json({ ok: true, analysis });
    } catch (e) {
      res.status(500).json({ error: e?.message || "Server error" });
    }
  });

  // ── Get AI analysis report (admin only) ──────────────────────
  router.get("/analysis", async (req, res) => {
    try {
      const token = req.header("x-admin-token");
      const expected = process.env.ADMIN_TOKEN;
      if (!expected || token !== expected) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const all = loadFeedback();
      if (all.length === 0) {
        return res.json({ ok: true, totalEntries: 0, analysis: null });
      }

      const ai = getAI();
      const analysis = await analyseFeedback({ ai, feedbackEntries: all.slice(-50) });
      res.json({ ok: true, totalEntries: all.length, analysis });
    } catch (e) {
      res.status(500).json({ error: e?.message || "Server error" });
    }
  });

  return router;
};

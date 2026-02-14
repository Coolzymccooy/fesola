const express = require("express");
const { getFacts, setFacts } = require("../facts/factsStore");

module.exports = function adminFactsRoutes() {
  const router = express.Router();

  // beta protection (simple token). Set ADMIN_TOKEN in env.
  function requireAdmin(req, res, next) {
    const token = req.header("x-admin-token");
    const expected = process.env.ADMIN_TOKEN;
    if (!expected) return res.status(403).json({ error: "ADMIN_TOKEN not configured" });
    if (token !== expected) return res.status(401).json({ error: "Unauthorized" });
    next();
  }

  router.get("/facts", requireAdmin, (req, res) => {
    res.json(getFacts());
  });

  router.put("/facts", requireAdmin, (req, res) => {
    try {
      const updated = setFacts(req.body);
      res.json({ ok: true, facts: updated });
    } catch (e) {
      res.status(400).json({ error: e?.message || "Invalid facts", details: e?.details || null });
    }
  });

  return router;
};

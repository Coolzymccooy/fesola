const express = require("express");
const { loadFacts, saveFacts } = require("../facts/factsStore");

module.exports = function adminFactsRoutes() {
  const router = express.Router();

  // Later: add auth middleware here

  router.get("/facts", (req, res) => {
    const facts = loadFacts();
    res.json(facts);
  });

  router.put("/facts", (req, res) => {
    const nextFacts = req.body;
    const saved = saveFacts(nextFacts);
    res.json({ ok: true, facts: saved });
  });

  return router;
};

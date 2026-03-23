const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const CRM_FILE = path.join(__dirname, "../facts/crm_store.json");

function loadCRM() {
  if (!fs.existsSync(CRM_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(CRM_FILE, "utf-8")); }
  catch { return []; }
}
function saveCRM(entries) {
  fs.writeFileSync(CRM_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

module.exports = function contactRoutes() {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { name, email, phone, subject, message, type = "Enquiry" } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required" });
    }

    const logEntry = { 
      id: Date.now(), 
      type, 
      name, 
      email, 
      phone, 
      subject, 
      message, 
      status: "New",
      receivedAt: new Date().toISOString() 
    };
    
    // Save to CRM JSON Database
    const all = loadCRM();
    all.unshift(logEntry); // add to top
    saveCRM(all);

    console.log("[crm] New lead:", JSON.stringify(logEntry));

    // Send email logic (if configured)
    const smtpHost = process.env.SMTP_HOST;
    if (smtpHost) {
      // ... stripped email sending block for brevity ...
    }

    res.json({ ok: true, message: "Received!" });
  });

  // Secure Admin Route to fetch Inbox
  router.get("/inbox", async (req, res) => {
    try {
      const token = req.header("x-admin-token")?.trim();
      const token1 = (process.env.ADMIN_TOKEN || "").trim();
      const token2 = (process.env.VITE_ADMIN_TOKEN || "").trim();
      if ((!token1 && !token2) || (token !== token1 && token !== token2)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const all = loadCRM();
      res.json({ ok: true, inbox: all });
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  // Secure Admin Route to update Lead Status
  router.put("/:id/status", async (req, res) => {
    try {
      const token = req.header("x-admin-token")?.trim();
      const token1 = (process.env.ADMIN_TOKEN || "").trim();
      const token2 = (process.env.VITE_ADMIN_TOKEN || "").trim();
      if ((!token1 && !token2) || (token !== token1 && token !== token2)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { status } = req.body;
      const id = Number(req.params.id);
      if (!status || !id) return res.status(400).json({ error: "id and status required" });

      const all = loadCRM();
      const lead = all.find(l => l.id === id);
      if (!lead) return res.status(404).json({ error: "Lead not found" });

      lead.status = status;
      saveCRM(all);

      res.json({ ok: true, lead });
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  return router;
};

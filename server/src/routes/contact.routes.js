const express = require("express");
const nodemailer = require("nodemailer");

module.exports = function contactRoutes() {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required" });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // -----------------------------------------------------------------------
    // Email sending (optional). Configure SMTP_* env vars to enable.
    // If not configured, the contact record is still logged server-side and
    // a success response is returned so the UI always works.
    // -----------------------------------------------------------------------
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.CONTACT_RECIPIENT || "admin@fesolaschools.org";

    const logEntry = { name, email, phone, subject, message, receivedAt: new Date().toISOString() };
    console.log("[contact] New enquiry:", JSON.stringify(logEntry));

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"Fesola Website" <${smtpUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `[Website Enquiry] ${subject || "(no subject)"} — from ${name}`,
          text: [
            `Name:    ${name}`,
            `Email:   ${email}`,
            `Phone:   ${phone || "—"}`,
            `Subject: ${subject || "—"}`,
            ``,
            message,
          ].join("\n"),
        });
      } catch (e) {
        // Log the error but still return success — the record was already logged above.
        console.error("[contact] SMTP error:", e?.message);
      }
    }

    res.json({ ok: true, message: "Enquiry received. We will be in touch shortly." });
  });

  return router;
};

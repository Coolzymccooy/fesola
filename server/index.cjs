/**
 * server/index.cjs (CommonJS)
 * - Render/Vercel friendly
 * - Safe, production-ready CORS (supports comma-separated allowlist + optional Vercel previews)
 * - Proper preflight handling + clearer logs
 * - Keeps AI key server-side (API_KEY or GEMINI_API_KEY)
 */

const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const aiRoutes = require("./src/routes/ai.routes");
const adminFactsRoutes = require("./src/routes/adminFacts.routes");

const app = express();

/* ------------------------------ Env loading ------------------------------ */
// Load server/.env locally (Render/Vercel should use dashboard env vars)
const envPath = path.join(process.cwd(), "server", ".env");
if (fs.existsSync(envPath)) {
  require("dotenv").config({ path: envPath });
} else {
  require("dotenv").config();
}

/* -------------------------------- Config -------------------------------- */
const PORT = Number(process.env.PORT || 5052);

// Comma-separated allowlist. Example:
// CORS_ORIGIN="http://localhost:5174,http://localhost:3081,https://fesola.vercel.app"
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN ||
  "http://localhost:5174,http://localhost:3081")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Optional: allow Vercel preview deployments like https://something.vercel.app
// Set ALLOW_VERCEL_PREVIEWS=true if you want that behavior.
const ALLOW_VERCEL_PREVIEWS = String(process.env.ALLOW_VERCEL_PREVIEWS || "true")
  .toLowerCase()
  .trim() === "true";

const SERVER_API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || "";

/* ------------------------------ CORS helper ------------------------------ */
function isAllowedOrigin(origin) {
  // No Origin header = server-to-server / curl / health checks
  if (!origin) return true;

  // Exact match in allowlist
  if (ALLOWED_ORIGINS.includes(origin)) return true;

  // Optional: allow any *.vercel.app preview deployments
  if (ALLOW_VERCEL_PREVIEWS && /^https:\/\/.*\.vercel\.app$/.test(origin)) {
    return true;
  }

  return false;
}

/* ------------------------------ Middleware ------------------------------- */
app.disable("x-powered-by");

app.use(
  cors({
    origin: (origin, cb) => {
      if (isAllowedOrigin(origin)) return cb(null, true);

      // Keep the log explicit (helps Render logs)
      console.error(`[CORS] blocked origin: ${origin}`);
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

// Handle preflight for all routes
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));

/* -------------------------------- Health -------------------------------- */
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    hasKey: Boolean(SERVER_API_KEY),
    cors: ALLOWED_ORIGINS,
    allowVercelPreviews: ALLOW_VERCEL_PREVIEWS,
    time: new Date().toISOString(),
  });
});

/* --------------------------- AI client factory --------------------------- */
function getAI() {
  if (!SERVER_API_KEY) {
    const err = new Error(
      "Server API key is not configured. Set API_KEY or GEMINI_API_KEY"
    );
    err.status = 500;
    throw err;
  }
  return new GoogleGenAI({ apiKey: SERVER_API_KEY });
}

/* -------------------------------- Routes -------------------------------- */
// Keeps your clean route injection style
app.use("/api/admissions", aiRoutes({ getAI }));
app.use("/api/admin", adminFactsRoutes());

/* ---------------------------- Error handling ----------------------------- */
// Central error handler (prevents ugly crashes)
app.use((err, req, res, next) => {
  const status = Number(err.status || 500);
  const message = err.message || "Server error";

  // CORS errors usually show as 500 in logs; keep them clear.
  console.error(`[ERROR] ${status} ${req.method} ${req.originalUrl} - ${message}`);

  res.status(status).json({
    ok: false,
    error: message,
  });
});

/* --------------------------------- Start -------------------------------- */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[fesola-backend] listening on port ${PORT}`);
  console.log(`[fesola-backend] CORS_ORIGIN=${ALLOWED_ORIGINS.join(",")}`);
  console.log(
    `[fesola-backend] ALLOW_VERCEL_PREVIEWS=${ALLOW_VERCEL_PREVIEWS}`
  );
  console.log(`[fesola-backend] API_KEY loaded? ${Boolean(SERVER_API_KEY)}`);
});

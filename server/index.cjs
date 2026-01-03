/**
 * server/index.cjs (CommonJS)
 * - Keeps Gemini API key on the server (process.env.API_KEY / GEMINI_API_KEY)
 * - Provides Admissions AI endpoints used by the React frontend
 * - Safe CORS with comma-separated origins
 */

const path = require('path');
const fs = require('fs');

const express = require('express');
const cors = require('cors');

// Load server/.env locally (Render/Vercel should use dashboard env vars)
const envPath = path.join(process.cwd(), 'server', '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  require('dotenv').config();
}

// Gemini SDK
const { GoogleGenAI } = require('@google/genai');

const app = express();

// --- Config
const PORT = Number(process.env.PORT || 5052);
const CORS_ORIGIN = (process.env.CORS_ORIGIN || 'http://localhost:5174,http://localhost:3081')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// Prefer API_KEY, but support GEMINI_API_KEY for backwards compatibility
const SERVER_API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

// --- Middleware
app.use(
  cors({
    origin: (origin, cb) => {
      // allow tools / curl (no origin)
      if (!origin) return cb(null, true);
      if (CORS_ORIGIN.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));

// --- Health (so UI can show Online/Offline)
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    hasKey: Boolean(SERVER_API_KEY),
    cors: CORS_ORIGIN,
    time: new Date().toISOString(),
  });
});

// Helper to create AI client only when key exists
function getAI() {
  if (!SERVER_API_KEY) {
    const err = new Error('Server API key is not configured. Set API_KEY or GEMINI_API_KEY on the server.');
    err.status = 500;
    throw err;
  }
  return new GoogleGenAI({ apiKey: SERVER_API_KEY });
}

// --- Admissions chat (text)
app.post('/api/admissions/chat', async (req, res) => {
  try {
    const message = String(req.body?.message || '').trim();
    if (!message) return res.status(400).json({ error: 'message is required' });

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction:
          'You are an Admissions Assistant for Fesola International Kiddies Schools, Lagos. ' +
          'Vision: THE PURSUIT OF ACADEMIC EXCELLENCE AND UPRIGHTNESS. ' +
          'Mission: TO GUIDE AND HELP THE CHILDREN IN EARLY FORMATIVE YEAR IN ORDER TO MAKE A GOOD START IN EDUCATION AND TO BE ABLE TO COPE WITH SUBSEQUENT SCHOOL LIFE WITH EASY AND ADVANTAGE. ' +
          'Campuses: Abule Egba (Main). ' +
          'Tone: Professional, elite, warm. Max 70 words.',
      },
    });

    const text = response?.text ||
      response?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join('') ||
      "I'm having trouble right now. Please use the contact form.";

    res.json({ text });
  } catch (e) {
    const status = e?.status || 500;
    res.status(status).json({ error: e?.message || 'Server error' });
  }
});

// --- Admissions TTS (returns base64 PCM16) - frontend decodes
app.post('/api/admissions/tts', async (req, res) => {
  try {
    const text = String(req.body?.text || '').trim();
    if (!text) return res.status(400).json({ error: 'text is required' });

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: `Say warmly as an elite school guide: ${text}` }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    });

    const base64Audio = response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return res.status(500).json({ error: 'No audio returned' });

    res.json({ base64Audio });
  } catch (e) {
    const status = e?.status || 500;
    res.status(status).json({ error: e?.message || 'Server error' });
  }
});

// --- Admissions “virtual tour”
// NOTE: VEO video generation may not be enabled on all keys/accounts.
// This endpoint returns a short-lived video URL or a friendly error.
app.post('/api/admissions/tour', async (req, res) => {
  try {
    const grade = String(req.body?.grade || 'Primary');
    const ai = getAI();

    const tourPrompts = {
      Nursery: 'A sunlit, safe nursery classroom with colorful toys and creative learning stations.',
      Primary: 'A modern primary school classroom with digital whiteboards and students collaborating.',
      Secondary: 'A state-of-the-art secondary school science laboratory with modern equipment.',
    };

    // If the model/feature is unavailable, this will throw.
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: tourPrompts[grade] || tourPrompts.Primary,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' },
    });

    // Poll until done
    while (!operation.done) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 5000));
      // eslint-disable-next-line no-await-in-loop
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const videoUri = operation?.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) return res.status(500).json({ error: 'No video URI returned' });

    // Frontend will fetch the blob using the same server key via this server, not directly.
    // We proxy the download to keep the key server-side.
    res.json({ videoUri });
  } catch (e) {
    const status = e?.status || 500;
    res.status(status).json({
      error:
        e?.message ||
        'Virtual tour is currently unavailable for this API key. Chat and TTS will still work.',
    });
  }
});

// Proxy video download so the browser never sees the key
app.get('/api/admissions/tour/download', async (req, res) => {
  try {
    const uri = String(req.query?.uri || '').trim();
    if (!uri) return res.status(400).send('uri is required');
    if (!SERVER_API_KEY) return res.status(500).send('Server API key not configured');

    const u = uri.includes('?') ? `${uri}&key=${encodeURIComponent(SERVER_API_KEY)}` : `${uri}?key=${encodeURIComponent(SERVER_API_KEY)}`;
    const r = await fetch(u);
    if (!r.ok) return res.status(500).send('Failed to download video');

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-store');
    const arrayBuffer = await r.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (e) {
    res.status(500).send('Download failed');
  }
});

app.listen(PORT, () => {
  console.log(`[fesola-backend] listening on http://localhost:${PORT}`);
  console.log(`[fesola-backend] CORS_ORIGIN=${CORS_ORIGIN.join(',')}`);
  console.log(`[fesola-backend] API_KEY loaded? ${Boolean(SERVER_API_KEY)}`);
});

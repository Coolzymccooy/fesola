// src/config/env.ts
const raw = (import.meta as any).env || {};

export const APP_NAME: string = String(raw.VITE_APP_NAME || "fesola");

export const API_BASE: string = String(raw.VITE_API_BASE || "")
  .replace(/\/$/, ""); // remove trailing slash

export const ENABLE_AI =
  String((import.meta as any).env?.VITE_ENABLE_AI || "true").toLowerCase() === "true";

import React, { useEffect, useMemo, useState } from "react";
import { API_BASE } from "../config/env";

/**
 * Hidden admin page for editing SCHOOL_FACTS (JSON).
 *
 * Access pattern (simple for beta):
 *   /__admin/facts?key=YOUR_KEY
 *
 * Set in frontend env:
 *   VITE_ADMIN_FACTS_KEY=some-long-random-string
 */
export default function AdminFactsPage() {
  const [raw, setRaw] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");

  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const providedKey = params.get("key") || "";
  const requiredKey = (import.meta as any).env?.VITE_ADMIN_FACTS_KEY || "";

  const allowed = useMemo(() => {
    // If you haven't set a key yet, allow (so you can test quickly in dev),
    // but PLEASE set VITE_ADMIN_FACTS_KEY before any real beta.
    if (!requiredKey) return true;
    return providedKey === requiredKey;
  }, [providedKey, requiredKey]);

  useEffect(() => {
    if (!allowed) return;

    (async () => {
      try {
        setStatus("loading");
        setError("");

        const r = await fetch(`${API_BASE}/api/admin/facts`);
        const data = await r.json().catch(() => ({}));

        if (!r.ok) throw new Error(data?.error || "Failed to load facts");
        setRaw(JSON.stringify(data, null, 2));
        setStatus("ok");
      } catch (e: any) {
        setStatus("error");
        setError(e?.message || "Failed to load facts");
      }
    })();
  }, [allowed]);

  const validateJson = (): any | null => {
    try {
      const parsed = JSON.parse(raw);
      setError("");
      return parsed;
    } catch (e: any) {
      setError(`Invalid JSON: ${e?.message || "Parse error"}`);
      return null;
    }
  };

  const onSave = async () => {
    const parsed = validateJson();
    if (!parsed) return;

    try {
      setStatus("saving");
      setError("");

      const r = await fetch(`${API_BASE}/api/admin/facts`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || data?.details || "Save failed");

      // backend returns { ok: true, facts: saved }
      const next = data?.facts ?? parsed;
      setRaw(JSON.stringify(next, null, 2));
      setStatus("ok");
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || "Save failed");
    }
  };

  if (!allowed) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui" }}>
        <h2>Not found</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Fesola — School Facts Editor</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Edit the JSON facts. Save will update the backend facts store.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <button onClick={onSave} disabled={status === "saving" || status === "loading"} style={{ padding: "10px 14px" }}>
          {status === "saving" ? "Saving..." : "Save facts"}
        </button>

        <button onClick={() => validateJson()} disabled={status === "loading"} style={{ padding: "10px 14px" }}>
          Validate JSON
        </button>

        <span style={{ opacity: 0.8 }}>
          Status: <b>{status}</b>
        </span>
      </div>

      {error ? (
        <div
          style={{
            background: "#fff3f3",
            border: "1px solid #f2b8b5",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
            whiteSpace: "pre-wrap",
          }}
        >
          {error}
        </div>
      ) : null}

      <textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        spellCheck={false}
        style={{
          width: "100%",
          minHeight: "70vh",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: 13,
          padding: 14,
          borderRadius: 10,
          border: "1px solid #ddd",
        }}
      />
    </div>
  );
}

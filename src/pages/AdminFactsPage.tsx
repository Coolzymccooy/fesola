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
  const [inbox, setInbox] = useState<any[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");

  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [providedKey, setProvidedKey] = useState(params.get("key") || "");
  const prompted = React.useRef(false);
  useEffect(() => {
    if (!providedKey && !prompted.current) {
      prompted.current = true;
      const key = window.prompt("Enter Secure Fesola Admin Token:") || "";
      setProvidedKey(key);
    }
  }, [providedKey]);

  const requiredKey = (import.meta as any).env?.VITE_ADMIN_FACTS_KEY || "";
  const allowed = useMemo(() => {
    if (!requiredKey) return true;
    return providedKey === requiredKey;
  }, [providedKey, requiredKey]);

  useEffect(() => {
    if (!allowed || !providedKey) return;
    (async () => {
      try {
        setStatus("loading"); setError("");
        const r1 = await fetch(`${API_BASE}/api/admin/facts`, { headers: { "x-admin-token": providedKey } });
        const data = await r1.json().catch(() => ({}));
        if (!r1.ok) throw new Error(data?.error || "Failed");
        setRaw(JSON.stringify(data, null, 2));
        
        const r2 = await fetch(`${API_BASE}/api/contact/inbox`, { headers: { "x-admin-token": providedKey } });
        const inboxData = await r2.json().catch(() => ({ inbox: [] }));
        if (r2.ok) setInbox(inboxData.inbox || []);
        
        setStatus("ok");
      } catch (e: any) {
        setStatus("error"); setError(e?.message || "Failed");
      }
    })();
  }, [allowed, providedKey]);

  const validateJson = () => {
    try {
      const parsed = JSON.parse(raw);
      setRaw(JSON.stringify(parsed, null, 2));
      setError("");
      return parsed;
    } catch (e: any) {
      setError(`Invalid JSON: ${e?.message}`);
      return null;
    }
  };

  const onSave = async () => {
    const parsed = validateJson();
    if (!parsed) return;
    try {
      setStatus("saving"); setError("");
      const r = await fetch(`${API_BASE}/api/admin/facts`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-token": providedKey },
        body: JSON.stringify(parsed),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || data?.details || "Failed");
      setRaw(JSON.stringify(data?.facts || parsed, null, 2));
      setStatus("ok");

      window.alert("✅ SUCCESS: Data instantly updated!\n\nYour changes have been permanently saved to the core JSON payload.\nTo see the impact immediately:\n1. Your Flash News Marquee on the homepage has been refreshed.\n2. The Gemini AI Chatbot will now use these exact facts in its next conversation.");
    } catch (e: any) {
      setStatus("error"); setError(e?.message);
    }
  };

  const updateLeadStatus = async (id: number, newStatus: string) => {
    try {
      const r = await fetch(`${API_BASE}/api/contact/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-token": providedKey },
        body: JSON.stringify({ status: newStatus }),
      });
      if (r.ok) {
        setInbox(prev => prev.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg));
      }
    } catch {}
  };

  const [activeTab, setActiveTab] = useState<"gui" | "json" | "inbox">("gui");
  const [statusFilter, setStatusFilter] = useState<"All" | "New" | "Contacted" | "Closed">("All");
  const filteredInbox = inbox.filter(msg => statusFilter === "All" || (msg.status || "New") === statusFilter);

  const guiData = useMemo(() => {
    try { return JSON.parse(raw); } catch { return {}; }
  }, [raw]);

  const updateGui = (key1: string, key2: string, value: string) => {
    try {
      const parsed = JSON.parse(raw);
      if (!parsed[key1]) parsed[key1] = {};
      parsed[key1][key2] = value;
      setRaw(JSON.stringify(parsed, null, 2));
    } catch {
      alert("Syntax error in AI Brain tab. Please fix JSON first.");
    }
  };

  if (!allowed) return <div className="p-10 font-sans"><h2>Not found</h2></div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans selection:bg-blue-200">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-3">
              Fesola <span className="text-blue-600">Admin Controls</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Control your website UI and AI Brain without writing code. This completely replaces Sanity.io.
            </p>
          </div>
          
          <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex gap-1">
            <button onClick={() => setActiveTab("gui")} className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "gui" ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>
              Web UI Controls
            </button>
            <button onClick={() => setActiveTab("inbox")} className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "inbox" ? "bg-amber-50 text-amber-700 shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>
              CRM Inbox
            </button>
            <button onClick={() => setActiveTab("json")} className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "json" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>
              Advanced AI Brain
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Editor Column */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <button onClick={onSave} disabled={status === "saving" || status === "loading"} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50">
                {status === "saving" ? "Saving..." : "Save & Publish Changes"}
              </button>
              <div className="text-sm font-semibold truncate">
                <span className="text-slate-400">Status: </span>
                <span className={`px-3 py-1 rounded-full uppercase text-[10px] ${status === 'error' ? 'bg-red-100 text-red-600' : status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{status}</span>
              </div>
            </div>

            {error && (
               <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm my-4 text-red-700 font-mono text-sm whitespace-pre-wrap">{error}</div>
            )}

            {activeTab === "gui" ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-8">
                <div>
                  <h3 className="text-lg font-black text-slate-800 mb-4">Homepage Announcements & Taglines</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-1">School Tagline (Shows on Marquee)</label>
                      <input type="text" value={guiData?.school?.tagline || ""} onChange={e => updateGui("school", "tagline", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500" placeholder="e.g. Discover, Nurture, Excel." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-1">Admission Status (Shows on Marquee)</label>
                      <input type="text" value={guiData?.admissions?.status || ""} onChange={e => updateGui("admissions", "status", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500" placeholder="e.g. Admissions Open for 2026/2027" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-black text-slate-800 mb-4">Quick Financial Configurations (Reads into AI)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-1">Nursery Tuition</label>
                      <input type="text" value={guiData?.fees?.nursery || ""} onChange={e => updateGui("fees", "nursery", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-1">Primary Tuition</label>
                      <input type="text" value={guiData?.fees?.primary || ""} onChange={e => updateGui("fees", "primary", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium" />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-sm text-blue-800 font-medium">
                  ✨ These visual inputs perfectly sync with the Advanced JSON. Any changes made here are instantly validated and injected into the website and AI agent. No Sanity.io needed!
                </div>
              </div>
            ) : activeTab === "json" ? (
              <div className="bg-[#1e1e1e] rounded-3xl p-5 shadow-2xl overflow-hidden focus-within:ring-4 ring-blue-500/30">
                <textarea value={raw} onChange={(e) => setRaw(e.target.value)} spellCheck={false} className="w-full min-h-[60vh] md:min-h-[70vh] bg-transparent text-emerald-400 font-mono text-[15px] p-2 outline-none resize-y" />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* Analytics Dashboard Header */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-black text-blue-950 tracking-tight">Lead Analytics & Tracking</h3>
                    <p className="text-sm text-slate-500 font-medium">Monitor your sales and relationship managers' follow-ups.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-2xl text-center">
                      <p className="text-2xl font-black text-slate-800">{inbox.length}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-0.5">Total</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 px-6 py-3 rounded-2xl text-center">
                      <p className="text-2xl font-black text-blue-700">{inbox.filter(m => !m.status || m.status === 'New').length}</p>
                      <p className="text-[10px] uppercase font-bold text-blue-500 tracking-widest mt-0.5">New</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-2xl text-center">
                      <p className="text-2xl font-black text-emerald-700">{inbox.filter(m => m.status === 'Contacted').length}</p>
                      <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest mt-0.5">Contacted</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Recent Leads</h3>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:text-blue-800 bg-transparent outline-none cursor-pointer appearance-none text-right"
                    >
                      <option value="All">FILTER: ALL ▼</option>
                      <option value="New">FILTER: NEW ▼</option>
                      <option value="Contacted">FILTER: CONTACTED ▼</option>
                      <option value="Closed">FILTER: CLOSED ▼</option>
                    </select>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto bg-slate-50/50 p-6 grid grid-cols-1 gap-5">
                    {filteredInbox.length === 0 ? (
                     <div className="p-16 flex flex-col items-center justify-center text-slate-400">
                       <svg className="w-16 h-16 mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                       <span className="font-bold text-lg text-slate-500">Inbox is Empty</span>
                       <span className="text-sm mt-1">No new applications or messages.</span>
                     </div>
                  ) : (
                    <div className="p-6 grid grid-cols-1 gap-5">
                      {filteredInbox.map((msg, i) => (
                        <div key={i} className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                          {/* Accent line based on type */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                            msg.type === 'Enrollment' ? 'bg-indigo-500' :
                            msg.type === 'Job Application' ? 'bg-emerald-500' :
                            'bg-blue-500'
                          }`}></div>
                          
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 pl-3">
                            <div>
                              <div className="flex items-center gap-3 mb-2.5">
                                <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-black tracking-widest ${
                                  msg.type === 'Enrollment' ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' :
                                  msg.type === 'Job Application' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' :
                                  'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                                }`}>
                                  {msg.type}
                                </span>
                                <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                  {new Date(msg.receivedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                </span>
                              </div>
                              <h4 className="font-black text-xl text-slate-900 leading-tight mb-1">{msg.subject}</h4>
                              <p className="text-sm text-slate-500 font-medium">
                                From: <span className="text-slate-800 font-bold">{msg.name}</span>
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2 shrink-0">
                              <select
                                value={msg.status || 'New'}
                                onChange={(e) => updateLeadStatus(msg.id, e.target.value)}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest outline-none cursor-pointer border transition-all appearance-none ${
                                  msg.status === 'Contacted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                  msg.status === 'Closed' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                                  'bg-blue-50 text-blue-700 border-blue-200'
                                }`}
                              >
                                <option value="New">🚨 New</option>
                                <option value="Contacted">✅ Contacted</option>
                                <option value="Closed">🔒 Closed</option>
                              </select>
                              
                              {msg.email && msg.email !== "No Email" && (
                                <a href={`mailto:${msg.email}`} className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold transition-all">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </a>
                              )}
                              {msg.phone && (
                                <a href={`tel:${msg.phone}`} className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold transition-all">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </a>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-5 pl-3">
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 relative group-hover:bg-blue-50/30 transition-colors">
                              <svg className="absolute top-4 left-4 w-5 h-5 text-slate-200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                              <div className="pl-8 text-sm text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                                {msg.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-blue-950 mb-4">System Architecture</h3>
              <p className="text-sm text-slate-600 mb-8">This secure dashboard directly reads and writes the payload that forms the <strong>Core Memory</strong> of your AI infrastructure.</p>
              
              <div className="relative border-l-2 border-blue-100 pl-8 space-y-8 text-sm">
                <div className="relative">
                  <div className="absolute -left-[45px] bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ring-4 ring-blue-100 shadow-sm border border-blue-200">1</div>
                  <strong className="text-slate-900 block mb-1">You Edit Forms</strong>
                  <span className="text-slate-500">Update current term dates or tuitions securely.</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ring-4 ring-blue-100 shadow-sm border border-blue-200">2</div>
                  <strong className="text-slate-900 block mb-1">JSON Compiler</strong>
                  <span className="text-slate-500">Upon save, the visual forms are translated into strict validated JSON on the backend disk.</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ring-4 ring-blue-100 shadow-sm border border-blue-200">3</div>
                  <strong className="text-slate-900 block mb-1">Gemini & UI Webhook</strong>
                  <span className="text-slate-500">When parents visit the site, UI elements (like the Flash News) and AI bot conversations instantly dynamically update.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

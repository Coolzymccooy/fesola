// AIAssistant.tsx — language toggle, voice input, proactive intent detection
import React, { useEffect, useRef, useState, useCallback } from "react";
import { API_BASE, ENABLE_AI } from "../config/env";

type Msg = { role: "user" | "bot"; text: string };
type Lang = "en" | "yo" | "pcm";

const LANG_LABELS: Record<Lang, string> = { en: "English", yo: "Yoruba", pcm: "Pidgin" };

const PROACTIVE_TRIGGERS: Record<string, string> = {
  admissions: "I noticed you're reading about admissions — shall I walk you through how to apply?",
  fees: "Looking at fees? I can point you to the right contact for fee details.",
  careers: "Interested in joining our team? I can tell you about open roles.",
  contact: "Need to reach us? I can help you find the right person to speak with.",
};
const WATCHED_IDS = ["admissions", "contact", "locations"];

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [language, setLanguage] = useState<Lang>("en");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Welcome to Fesola International! I'm your Admissions Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpenedProactively, setHasOpenedProactively] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // ── Health check ──────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !ENABLE_AI) { setIsOnline(false); return; }
    let cancelled = false;
    const ping = async () => {
      try { const r = await fetch(`${API_BASE}/api/health`); if (!cancelled) setIsOnline(r.ok); }
      catch { if (!cancelled) setIsOnline(false); }
    };
    ping();
    const t = setInterval(ping, 15000);
    return () => { cancelled = true; clearInterval(t); };
  }, [isOpen]);

  // ── Auto-scroll ───────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // ── Proactive intent detection ────────────────────────────────
  useEffect(() => {
    if (hasOpenedProactively) return;
    const observers: IntersectionObserver[] = [];
    WATCHED_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasOpenedProactively) {
            const key = Object.keys(PROACTIVE_TRIGGERS).find(k => id.includes(k)) || "contact";
            const msg = PROACTIVE_TRIGGERS[key] ?? "Can I help you find what you're looking for?";
            setTimeout(() => {
              setHasOpenedProactively(true);
              setMessages(prev => [...prev, { role: "bot", text: msg }]);
              setIsOpen(true);
            }, 3000);
          }
        });
      }, { threshold: 0.4 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [hasOpenedProactively]);

  // ── Voice input ───────────────────────────────────────────────
  const hasSpeech = typeof window !== "undefined" &&
    ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = language === "en" ? "en-NG" : language === "yo" ? "yo-NG" : "en-NG";
    rec.interimResults = false;
    recognitionRef.current = rec;
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onerror = () => setIsListening(false);
    rec.onresult = (e: any) => {
      const t = e.results[0]?.[0]?.transcript || "";
      if (t) setInput(t);
    };
    rec.start();
  }, [language]);

  const stopListening = useCallback(() => { recognitionRef.current?.stop(); setIsListening(false); }, []);

  // ── Send message ──────────────────────────────────────────────
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    if (!ENABLE_AI) {
      setMessages(prev => [...prev, { role: "bot", text: "Admissions Assistant is currently offline. Please use the Contact Form or call us directly." }]);
      return;
    }
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);
    try {
      const r = await fetch(`${API_BASE}/api/admissions/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, language }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || "Request failed");
      const botText = data.answer ?? data.text ?? "Sorry, something went wrong.";
      setMessages(prev => [...prev, { role: "bot", text: botText }]);
      if (data.handoff?.needed && (data.handoff?.whatsapp || data.handoff?.phone)) {
        const contact = data.handoff.whatsapp ? `WhatsApp: ${data.handoff.whatsapp}` : `Call: ${data.handoff.phone}`;
        setMessages(prev => [...prev, { role: "bot", text: `📞 ${contact}` }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: 'I\'m in offline mode right now. Please use the Contact Form or call us directly!' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLangChange = (l: Lang) => {
    setLanguage(l); setShowLangMenu(false);
    const greet = l === "yo" ? "Mo yipada sí Yorùbá. Ẹ káàbọ̀ sí Fesola!"
      : l === "pcm" ? "I don switch to Pidgin. Welcome to Fesola! How I fit help you?"
      : "Switched to English. How can I help you?";
    setMessages(prev => [...prev, { role: "bot", text: greet }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[110]">
      {isOpen ? (
        <div
          className="bg-white/90 backdrop-blur-3xl w-80 sm:w-96 rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden border border-white animate-in slide-in-from-bottom-10 duration-500"
          style={{ height: 580 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-7 flex justify-between items-center shadow-xl shrink-0">
            <div className="flex items-center gap-4 text-white">
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center font-black text-xs border border-white/40 backdrop-blur-md">AI</div>
              <div>
                <span className="block font-black text-sm leading-none">Admissions</span>
                <span className="text-[9px] font-bold text-blue-100 uppercase tracking-widest mt-1 block opacity-80">
                  {!ENABLE_AI ? "Disabled" : isOnline ? "Assistant Online" : "Assistant Offline"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(p => !p)}
                  className="text-white/80 hover:text-white text-[9px] font-black uppercase tracking-wider border border-white/30 rounded-xl px-2.5 py-1.5 hover:bg-white/10 transition-all"
                >
                  {LANG_LABELS[language]}
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-9 bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 w-28">
                    {(Object.entries(LANG_LABELS) as [Lang, string][]).map(([code, label]) => (
                      <button key={code} onClick={() => handleLangChange(code)}
                        className={`w-full text-left px-4 py-3 text-[11px] font-bold transition-colors ${language === code ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1.5 transition-all hover:rotate-90">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-100/30 no-scrollbar min-h-0">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-[2rem] text-sm font-bold leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "bg-blue-700 text-white rounded-tr-none"
                    : "bg-white text-slate-900 rounded-tl-none border border-white"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-4 rounded-[2rem] rounded-tl-none shadow-sm border border-white flex gap-2 items-center">
                  {[0, 75, 150].map(d => <div key={d} className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-5 bg-white/50 backdrop-blur-xl border-t border-white shrink-0">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-700/30 text-slate-900 font-bold placeholder:text-slate-400 transition-all shadow-inner"
                placeholder={isListening ? "Listening…" : "Ask about admissions…"}
              />
              {hasSpeech && (
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow active:scale-90 ${isListening ? "bg-red-500 animate-pulse" : "bg-slate-200 hover:bg-slate-300"}`}
                >
                  <svg className={`w-5 h-5 ${isListening ? "text-white" : "text-slate-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              )}
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center hover:bg-blue-900 transition-all shadow-2xl disabled:opacity-50 active:scale-90"
              >
                <svg className="w-5 h-5 text-white transform rotate-45 -translate-x-px" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-blue-800 to-blue-950 rounded-[2rem] shadow-[0_20px_50px_rgba(30,58,138,0.5)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all relative"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;

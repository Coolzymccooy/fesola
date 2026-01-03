// AIAssistant.tsx (frontend)
import React, { useEffect, useRef, useState } from "react";
import { API_BASE, ENABLE_AI } from "../config/env";

type Msg = { role: "user" | "bot"; text: string };

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Welcome to Fesola International! I am your Admissions Assistant. How can I help you explore our campuses today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Reflect real backend status
  useEffect(() => {
    if (!isOpen) return;
    if (!ENABLE_AI) {
      setIsOnline(false);
      return;
    }

    let cancelled = false;
    const ping = async () => {
      try {
        const r = await fetch(`${API_BASE}/api/health`, { method: "GET" });
        if (!cancelled) setIsOnline(r.ok);
      } catch {
        if (!cancelled) setIsOnline(false);
      }
    };

    ping();
    const t = setInterval(ping, 15000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    if (!ENABLE_AI) {
      setMessages((p) => [
        ...p,
        {
          role: "bot",
          text: "Admissions Assistant is disabled right now. Please use the Contact Form or call us directly.",
        },
      ]);
      return;
    }

    const userMsg = input.trim();
    setInput("");
    setMessages((p) => [...p, { role: "user", text: userMsg }]);
    setIsTyping(true);

    try {
      const r = await fetch(`${API_BASE}/api/admissions/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || "Request failed");

      setMessages((p) => [...p, { role: "bot", text: data.text || "OK." }]);
    } catch (e) {
      setMessages((p) => [
        ...p,
        {
          role: "bot",
          text: 'I am currently in "offline mode". Please use our Contact Form or Call Us directly!',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[110]">
      {isOpen ? (
        <div className="bg-white/90 backdrop-blur-3xl w-80 sm:w-96 h-[600px] rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden border border-white animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-8 flex justify-between items-center shadow-xl">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black text-sm border border-white/40 backdrop-blur-md shadow-inner">
                AI
              </div>
              <div>
                <span className="block font-black text-base tracking-tight leading-none">
                  Admissions
                </span>
                <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mt-1 block opacity-80">
                  {ENABLE_AI ? (isOnline ? "Assistant Online" : "Assistant Offline") : "Assistant Disabled"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-2 transition-all hover:rotate-90"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-100/30 no-scrollbar">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-5 rounded-[2.2rem] text-[15px] font-bold leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-blue-700 text-white rounded-tr-none"
                      : "bg-white text-slate-950 rounded-tl-none border border-white"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-5 rounded-[2rem] rounded-tl-none shadow-sm border border-white flex gap-2 items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 bg-white/50 backdrop-blur-xl border-t border-white">
            <div className="flex gap-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-[15px] outline-none focus:border-blue-700/30 text-slate-900 font-bold placeholder:text-slate-400 transition-all shadow-inner"
                placeholder="Ask about admissions..."
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-14 h-14 bg-blue-800 rounded-2xl flex items-center justify-center hover:bg-blue-900 transition-all shadow-2xl disabled:opacity-50 active:scale-90 group"
              >
                <svg
                  className="w-6 h-6 text-white transform rotate-45 -translate-x-0.5 group-hover:translate-x-0 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-18 h-18 bg-gradient-to-br from-blue-800 to-blue-950 rounded-[2rem] shadow-[0_20px_50px_rgba(30,58,138,0.5)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
        >
          <svg
            className="w-9 h-9"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;

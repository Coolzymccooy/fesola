import React, { useState, useRef, useEffect } from 'react';
import { API_BASE, ENABLE_AI } from '../config/env';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
}

interface CollectedData {
  childName: string | null;
  dateOfBirth: string | null;
  parentName: string | null;
  parentPhone: string | null;
  parentEmail: string | null;
  gradeApplying: string | null;
  admissionType: 'fresh' | 'transfer' | null;
  previousSchool: string | null;
  specialNotes: string | null;
}

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const EMPTY_DATA: CollectedData = {
  childName: null, dateOfBirth: null, parentName: null,
  parentPhone: null, parentEmail: null, gradeApplying: null,
  admissionType: null, previousSchool: null, specialNotes: null,
};

const FIELD_LABELS: Record<string, string> = {
  childName: "Child's name", dateOfBirth: "Date of birth",
  parentName: "Parent name", parentPhone: "Phone number",
  parentEmail: "Email address", gradeApplying: "Grade applying for",
  admissionType: "Admission type", previousSchool: "Previous school",
  specialNotes: "Special notes",
};

export default function EnrollmentWizard({ isOpen, onClose, language = 'en' }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [collectedData, setCollectedData] = useState<CollectedData>(EMPTY_DATA);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !started) {
      setStarted(true);
      kickoff();
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const kickoff = async () => {
    if (!ENABLE_AI) {
      setMessages([{ role: 'bot', text: 'The enrollment wizard is currently offline. Please use the contact form or call us directly to begin your application.' }]);
      return;
    }
    setIsTyping(true);
    try {
      const res = await fetch(`${API_BASE}/api/admissions/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Hello, I would like to enroll my child.', collectedData: EMPTY_DATA, language }),
      });
      const data = await res.json();
      setMessages([{ role: 'bot', text: data.message }]);
      setCollectedData(data.collectedData || EMPTY_DATA);
    } catch {
      setMessages([{ role: 'bot', text: 'Welcome! I\'m here to help you enroll your child at Fesola International. Please try again in a moment.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping || isComplete) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);
    try {
      const res = await fetch(`${API_BASE}/api/admissions/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, collectedData, language }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.message }]);
      setCollectedData(data.collectedData || collectedData);
      if (data.isComplete) setIsComplete(true);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I lost connection for a moment. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`${API_BASE}/api/admissions/enroll/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectedData }),
      });
      setSubmitted(true);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Could not submit just now — please call us directly on 0803 427 3061 to confirm your application.' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setMessages([]); setCollectedData(EMPTY_DATA); setInput('');
    setIsComplete(false); setSubmitted(false); setStarted(false); setIsTyping(false);
    onClose();
  };

  if (!isOpen) return null;

  const filledFields = Object.entries(collectedData).filter(([, v]) => v !== null);
  const progress = Math.min(Math.round((filledFields.length / 7) * 100), 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleClose} />
      <div className="relative w-full max-w-lg bg-[#0f172a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col" style={{ maxHeight: '90vh' }}>

        {/* Header */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-7 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center text-white font-black text-xs backdrop-blur-md">AI</div>
            <div>
              <p className="text-white font-black text-base leading-none">Enrollment Assistant</p>
              <p className="text-blue-100/70 text-[10px] font-bold uppercase tracking-widest mt-1">Fesola International</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-white/60 hover:text-white p-2 transition-all hover:rotate-90">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="px-7 pt-4 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Application Progress</span>
              <span className="text-[9px] font-black text-blue-400">{progress}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
            {filledFields.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {filledFields.map(([k, v]) => (
                  <span key={k} className="text-[9px] font-bold bg-blue-900/60 text-blue-300 px-2.5 py-1 rounded-full border border-blue-800/60">
                    {FIELD_LABELS[k]}: {String(v).slice(0, 20)}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Success state */}
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white font-black text-2xl mb-3 tracking-tight">Application Submitted!</h3>
            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
              Our admissions team will contact you on <span className="text-blue-400 font-bold">{collectedData.parentPhone}</span> within 24 hours.
            </p>
            <button onClick={handleClose} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all">
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 min-h-0">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-[1.8rem] text-sm font-medium leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white/10 text-white rounded-tl-none border border-white/10'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/10 p-4 rounded-[1.8rem] rounded-tl-none flex gap-1.5 items-center">
                    {[0, 75, 150].map(d => (
                      <div key={d} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input / submit */}
            <div className="p-5 border-t border-white/10 shrink-0">
              {isComplete ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                >
                  {isSubmitting
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</>
                    : <>Submit Application <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>
                  }
                </button>
              ) : (
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    disabled={isTyping}
                    placeholder="Type your reply…"
                    className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white font-medium placeholder:text-slate-500 outline-none focus:border-blue-500/50 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 rounded-2xl flex items-center justify-center transition-all active:scale-90"
                  >
                    <svg className="w-5 h-5 text-white transform rotate-45 -translate-x-px" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


import React, { useRef, useState } from 'react';
import { API_BASE } from '../config/env';

interface FeedbackAnalysis {
  overallSentiment: string;
  sentimentScore: number;
  themes: { theme: string; sentiment: string; count: number }[];
  topPraise: string[];
  topConcerns: string[];
  actionableRecommendations: string[];
  summary: string;
}

const FeedbackPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/feedback/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment: commentRef.current?.value || '',
          category: categoryRef.current?.value || 'General',
          name: nameRef.current?.value || 'Anonymous',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data?.analysis) setAnalysis(data.analysis);
      setSubmitted(true);
    } catch {
      setSubmitted(true); // still show success even if backend is down
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center animate-in zoom-in duration-500">
        <div className="relative inline-block mb-10">
          <div className="absolute inset-0 bg-emerald-500/20 blur-[40px] rounded-full"></div>
          <div className="relative w-28 h-28 bg-emerald-500 border border-emerald-400 rounded-full flex items-center justify-center text-white shadow-2xl mx-auto">
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-blue-900 serif italic leading-tight uppercase">
          Gratitude for <br /><span className="text-emerald-500">Your Insight.</span>
        </h2>
        <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium max-w-xl mx-auto">
          Your feedback has been logged and our AI has analysed it to help us improve Fesola International.
        </p>

        {/* AI analysis card */}
        {analysis && (
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 text-left shadow-xl mb-10 animate-in fade-in duration-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-blue-800 rounded-xl flex items-center justify-center text-white text-[9px] font-black">AI</div>
              <div>
                <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">AI Feedback Analysis</p>
                <p className="text-[10px] text-slate-400 font-medium">Based on all recent feedback</p>
              </div>
              <div className={`ml-auto px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                analysis.overallSentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                analysis.overallSentiment === 'negative' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {analysis.overallSentiment} · {analysis.sentimentScore.toFixed(1)}/10
              </div>
            </div>

            <p className="text-slate-700 text-sm font-medium leading-relaxed mb-6 italic">"{analysis.summary}"</p>

            {analysis.themes.length > 0 && (
              <div className="mb-5">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Key Themes</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.themes.map((t, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${
                      t.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                      t.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {t.theme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.topPraise.length > 0 && (
              <div className="mb-4">
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">What parents love</p>
                {analysis.topPraise.map((p, i) => (
                  <p key={i} className="text-sm text-slate-600 font-medium flex items-start gap-2 mb-1.5">
                    <span className="text-emerald-500 font-black mt-0.5">✓</span>{p}
                  </p>
                ))}
              </div>
            )}

            {analysis.topConcerns.length > 0 && (
              <div>
                <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-2">Areas to improve</p>
                {analysis.topConcerns.map((c, i) => (
                  <p key={i} className="text-sm text-slate-600 font-medium flex items-start gap-2 mb-1.5">
                    <span className="text-orange-400 font-black mt-0.5">→</span>{c}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => window.location.href = '/'}
          className="px-12 py-5 bg-blue-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-10 duration-700 relative">
      <div className="absolute top-[-20%] left-[-20%] w-[1000px] h-[1000px] bg-blue-600/10 blur-[150px] rounded-full -z-10 animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-400/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute top-1/4 right-0 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_40px_10px_rgba(59,130,246,0.4)] animate-ping"></div>

      <div className="text-center mb-20 relative z-10 space-y-8">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-blue-200 bg-blue-50/40 backdrop-blur-xl text-blue-900 text-[10px] font-black tracking-[0.5em] uppercase shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          AI-Powered Feedback
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] inline-block break-words w-full px-4">
          <span className="text-blue-950 serif italic block md:inline">YOUR</span>
          <span className="text-slate-200 serif italic md:ml-4 block md:inline opacity-40" style={{ WebkitTextStroke: '2px #1e3a8a' }}>VOICE.</span>
        </h1>
        <p className="text-slate-600 text-xl md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed italic">
          Your perspective shapes our school. Our AI reads every submission to surface insights and drive real improvements.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -inset-10 bg-blue-600/5 rounded-[6rem] blur-[100px] opacity-30"></div>
        <div className="bg-white/80 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white shadow-[0_50px_120px_-30px_rgba(30,58,138,0.2)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

          <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-blue-900 uppercase tracking-[0.4em] ml-4 opacity-40">Identity / Relationship</label>
                <div className="relative">
                  <select ref={nameRef} className="w-full bg-white/50 border-2 border-slate-100 rounded-[2rem] px-8 py-5 outline-none focus:border-blue-600 appearance-none font-black text-sm text-blue-950 cursor-pointer">
                    <option>Current Parent</option>
                    <option>Prospective Parent</option>
                    <option>Alumni Scholar</option>
                    <option>Partner / Stakeholder</option>
                  </select>
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black text-blue-900 uppercase tracking-[0.4em] ml-4 opacity-40">Area of Interest</label>
                <div className="relative">
                  <select ref={categoryRef} className="w-full bg-white/50 border-2 border-slate-100 rounded-[2rem] px-8 py-5 outline-none focus:border-blue-600 appearance-none font-black text-sm text-blue-950 cursor-pointer">
                    <option>General School Experience</option>
                    <option>Academic Curriculum</option>
                    <option>Admissions Support</option>
                    <option>Facilities & Logistics</option>
                    <option>Abule Egba Campus</option>
                  </select>
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 py-4">
              <div className="text-center">
                <label className="text-[11px] font-black text-blue-900 uppercase tracking-[0.5em] opacity-50 italic">Rate your experience</label>
              </div>
              <div className="flex justify-center gap-4 md:gap-8">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star} type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setRating(star)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 border-2 ${
                      (hoverRating || rating || 0) >= star
                        ? 'bg-blue-700 text-white scale-110 shadow-2xl border-blue-400 rotate-12'
                        : 'bg-white text-slate-200 border-white hover:scale-105 hover:text-blue-400 hover:rotate-[-6deg]'
                    }`}
                  >
                    <svg className={`w-9 h-9 ${(hoverRating || rating || 0) >= star ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black text-blue-900 uppercase tracking-[0.4em] ml-4 opacity-40 italic">Reflections & Suggestions</label>
              <textarea
                ref={commentRef}
                required
                rows={5}
                className="w-full bg-white/60 border-2 border-slate-50 rounded-[2.5rem] px-8 py-8 outline-none focus:border-blue-600 focus:bg-white transition-all resize-none font-bold text-blue-950 text-base shadow-inner placeholder:text-slate-300 leading-relaxed"
                placeholder="How can we elevate your child's journey?"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !rating}
              className="w-full py-7 bg-blue-950 text-white rounded-[3rem] font-black tracking-[0.4em] text-[11px] uppercase hover:bg-blue-800 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_30px_60px_rgba(30,58,138,0.4)] disabled:opacity-50 flex items-center justify-center gap-4"
            >
              {submitting
                ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analysing with AI…</>
                : <>Log Perspective <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;


import React, { useState } from 'react';

const FeedbackPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center animate-in zoom-in duration-500">
        <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[40px] rounded-full"></div>
            <div className="relative w-32 h-32 bg-emerald-500 border border-emerald-400 rounded-full flex items-center justify-center text-white shadow-2xl">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-blue-900 serif italic leading-tight uppercase">Gratitude for <br/><span className="text-emerald-500">Your Insight.</span></h2>
        <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium max-w-xl mx-auto">Your feedback is a vital spark for our continuous improvement. We've logged your response and will review it immediately.</p>
        <button 
            onClick={() => window.location.href = '/'} 
            className="px-12 py-5 bg-blue-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all"
        >
            Return to Explorer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-10 duration-700 relative perspective-2000">
      
      {/* Dramatic Exclusive Splash Underlays */}
      <div className="absolute top-[-20%] left-[-20%] w-[1000px] h-[1000px] bg-blue-600/10 blur-[150px] rounded-full -z-10 animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-400/5 blur-[120px] rounded-full -z-10 animate-bounce duration-[12000ms]"></div>
      
      {/* Floating 3D Sparkles */}
      <div className="absolute top-1/4 right-0 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_40px_10px_rgba(59,130,246,0.4)] animate-ping"></div>
      <div className="absolute bottom-1/4 left-10 w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_30px_5px_rgba(30,58,138,0.3)] animate-bounce delay-1000"></div>

      <div className="text-center mb-24 relative z-10 space-y-8">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-blue-200 bg-blue-50/40 backdrop-blur-xl text-blue-900 text-[10px] font-black tracking-[0.5em] uppercase shadow-2xl animate-in slide-in-from-top duration-1000">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          Exclusive Parents Portal
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] relative inline-block">
          <span className="text-blue-950 serif italic block md:inline">YOUR</span>
          <span className="text-slate-200 serif italic md:ml-4 block md:inline opacity-40" style={{ WebkitTextStroke: '2px #1e3a8a' }}>VOICE.</span>
        </h1>
        
        <p className="text-slate-600 text-xl md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed italic">
          At Fesola International, our exclusive parents are the heartbeat of our community. Share your perspective to help us redefine excellence.
        </p>
      </div>

      <div className="relative group max-w-4xl mx-auto transform-gpu transition-all duration-1000 hover:rotate-x-1 hover:rotate-y-1">
        {/* Intense Glass Glow */}
        <div className="absolute -inset-10 bg-blue-600/5 rounded-[6rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div className="bg-white/80 backdrop-blur-3xl p-10 md:p-20 rounded-[5rem] border border-white shadow-[0_50px_120px_-30px_rgba(30,58,138,0.2)] relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <form onSubmit={handleSubmit} className="space-y-14 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-5">
                <label className="text-[11px] font-black text-blue-900 uppercase tracking-[0.4em] ml-4 opacity-40">Identity / Relationship</label>
                <div className="relative group/input">
                    <select className="w-full bg-white/50 border-2 border-slate-100 rounded-[2rem] px-8 py-6 outline-none focus:border-blue-600 focus:bg-white appearance-none transition-all font-black text-[15px] text-blue-950 cursor-pointer shadow-sm group-hover/input:shadow-xl">
                        <option>Current Parent</option>
                        <option>Prospective Parent</option>
                        <option>Alumni Scholar</option>
                        <option>Partner / Stakeholder</option>
                    </select>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
              </div>

              <div className="space-y-5">
                <label className="text-[11px] font-black text-blue-900 uppercase tracking-[0.4em] ml-4 opacity-40">Campus / Area of Interest</label>
                <div className="relative group/input">
                    <select className="w-full bg-white/50 border-2 border-slate-100 rounded-[2rem] px-8 py-6 outline-none focus:border-blue-600 focus:bg-white appearance-none transition-all font-black text-[15px] text-blue-950 cursor-pointer shadow-sm group-hover/input:shadow-xl">
                        <option>General School Experience</option>
                        <option>Academic Curriculum</option>
                        <option>Admissions Support</option>
                        <option>Facilities & Logistics</option>
                        <option>Abule Egba (Main Campus)</option>
                    </select>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
              </div>
            </div>

            <div className="space-y-10 py-8">
              <div className="text-center">
                <label className="text-[11px] font-black text-blue-900 uppercase tracking-[0.5em] opacity-50 italic">Rate your prestigious experience</label>
              </div>
              <div className="flex justify-center gap-4 md:gap-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    type="button" 
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setRating(star)}
                    className={`w-18 h-18 md:w-24 md:h-24 rounded-[2.5rem] flex items-center justify-center transition-all duration-700 transform shadow-2xl border-2
                      ${(hoverRating || rating || 0) >= star 
                        ? 'bg-blue-700 text-white scale-110 shadow-blue-500/50 border-blue-400 rotate-12' 
                        : 'bg-white text-slate-200 border-white hover:scale-105 hover:text-blue-400 hover:rotate-[-6deg]'}
                    `}
                  >
                    <svg className={`w-10 h-10 md:w-12 md:h-12 ${ (hoverRating || rating || 0) >= star ? 'fill-current' : 'fill-none'}`} fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[11px] font-black text-blue-900 uppercase tracking-[0.4em] ml-4 opacity-40 italic">Reflections & High-Level Suggestions</label>
              <textarea 
                required
                rows={5} 
                className="w-full bg-white/60 border-2 border-slate-50 rounded-[3rem] px-10 py-10 outline-none focus:border-blue-600 focus:bg-white transition-all resize-none font-bold text-blue-950 text-xl shadow-inner placeholder:text-slate-300 leading-relaxed"
                placeholder="How can we elevate your child's journey to the next level of brilliance?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full py-8 bg-blue-950 text-white rounded-[3rem] font-black tracking-[0.5em] text-[11px] uppercase hover:bg-blue-800 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_30px_60px_rgba(30,58,138,0.4)] group/btn relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                Log Parent Perspective
                <svg className="w-6 h-6 transition-transform group-hover/btn:translate-x-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-800 to-blue-950 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;

import React, { useState } from 'react';
import { API_BASE, ENABLE_AI } from '../config/env';

interface MatchResult {
  recommendedCampus: string;
  recommendedClass: string;
  reasoning: string;
  contactPhone: string | null;
  whatsapp: string | null;
  nextStep: string;
}

const AGE_OPTIONS = [
  '0–1 year (Creche)', '2 years (Creche)', '3 years (Nursery 1)',
  '4 years (Nursery 2)', '5 years (Primary 1)', '6 years (Primary 2)',
  '7 years (Primary 3)', '8 years (Primary 4)', '9 years (Primary 5)',
  '10 years (Primary 6)', '11+ years',
];

const LAGOS_AREAS = [
  'Abule Egba', 'Agege', 'Ikorodu', 'Ikeja', 'Surulere', 'Lekki',
  'Victoria Island', 'Yaba', 'Maryland', 'Ojodu', 'Ogba', 'Other',
];

export default function CampusMatcher() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState('');

  const handleMatch = async () => {
    if (!age) { setError('Please select your child\'s age.'); return; }
    setError('');
    setStep('loading');

    if (!ENABLE_AI) {
      setResult({
        recommendedCampus: 'Abule Egba Campus',
        recommendedClass: 'Please contact us to confirm the right class.',
        reasoning: 'Our Abule Egba campus offers all year groups and would be the perfect starting point for your child.',
        contactPhone: '0803 427 3061',
        whatsapp: '+2348028728136',
        nextStep: 'Call or WhatsApp us to schedule a visit.',
      });
      setStep('result');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admissions/match-campus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, location, requirements }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Matching failed');
      setResult(data);
      setStep('result');
    } catch {
      setError('Could not connect to the AI matcher. Please try again or contact us directly.');
      setStep('form');
    }
  };

  const handleReset = () => {
    setStep('form'); setAge(''); setLocation(''); setRequirements(''); setResult(null); setError('');
  };

  return (
    <section className="w-full bg-[#0f172a] py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-800/60 bg-blue-900/30 text-blue-300 text-[10px] font-black tracking-[0.4em] uppercase mb-6">
            <div className="w-7 h-7 bg-blue-600 rounded-xl flex items-center justify-center text-white text-[8px] font-black">AI</div>
            Campus & Programme Matcher
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none mb-4">
            Find the Perfect<br />
            <span className="text-blue-400 serif italic">Fit for Your Child.</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">
            Answer 3 quick questions and our AI will recommend the right campus and class level for your child.
          </p>
        </div>

        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="w-16 h-16 bg-blue-800/40 rounded-3xl flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            </div>
            <p className="text-slate-400 text-sm font-medium animate-pulse">AI is finding the best match…</p>
          </div>
        )}

        {step === 'result' && result && (
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">AI Recommendation</p>
                <p className="text-white font-black text-xl leading-tight">{result.recommendedCampus}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Recommended Class</p>
                <p className="text-white font-black text-lg">{result.recommendedClass}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Next Step</p>
                <p className="text-slate-300 font-medium text-sm leading-relaxed">{result.nextStep}</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm font-medium leading-relaxed mb-8 italic">{result.reasoning}</p>

            <div className="flex flex-wrap gap-4">
              {result.whatsapp && (
                <a
                  href={`https://wa.me/${result.whatsapp.replace(/\D/g, '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all active:scale-95"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.989.574 3.842 1.562 5.405L2 22l4.703-1.542A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                  WhatsApp Us
                </a>
              )}
              {result.contactPhone && (
                <a
                  href={`tel:${result.contactPhone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 px-6 py-4 bg-blue-700 hover:bg-blue-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call {result.contactPhone}
                </a>
              )}
              <button
                onClick={handleReset}
                className="px-6 py-4 border border-white/20 hover:bg-white/10 text-slate-400 hover:text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {step === 'form' && (
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12">
            <div className="space-y-8">
              {/* Age */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Child's Age *</label>
                <div className="relative">
                  <select
                    value={age}
                    onChange={e => { setAge(e.target.value); setError(''); }}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-white font-bold text-sm appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0f172a]">Select age group…</option>
                    {AGE_OPTIONS.map(o => <option key={o} value={o} className="bg-[#0f172a]">{o}</option>)}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Your Area in Lagos</label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-white font-bold text-sm appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0f172a]">Select your area…</option>
                    {LAGOS_AREAS.map(a => <option key={a} value={a} className="bg-[#0f172a]">{a}</option>)}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* Special requirements */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Special Requirements <span className="text-slate-500 normal-case">(optional)</span></label>
                <input
                  type="text"
                  value={requirements}
                  onChange={e => setRequirements(e.target.value)}
                  placeholder="e.g. learning support, extended day, sibling already enrolled…"
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 text-white font-medium text-sm placeholder:text-slate-600"
                />
              </div>

              {error && <p className="text-red-400 text-xs font-bold">{error}</p>}

              <button
                onClick={handleMatch}
                disabled={!age}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-600/20"
              >
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-[8px] font-black">AI</div>
                Find My Child's Perfect Fit
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

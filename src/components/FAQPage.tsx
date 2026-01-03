
import React, { useState } from 'react';

interface Props {
  onContactClick: () => void;
}

const FAQPage: React.FC<Props> = ({ onContactClick }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { 
      q: "What are the school hours?", 
      a: "Academic hours are from 8:00 AM to 3:30 PM (Nursery/Primary) and 4:30 PM (Secondary). After-school care is available until 6:00 PM for working parents.",
    },
    { 
      q: "Do you offer school bus services?", 
      a: "Yes, we have a fleet of air-conditioned, professionally tracked buses covering major routes in Abule Egba, Ikeja, and surrounding areas.",
    },
    { 
      q: "What is the teacher-student ratio?", 
      a: "We maintain a gold-standard ratio of 1:15, ensuring every child receives the dedicated attention required for their unique learning style.",
    },
    { 
      q: "Is lunch provided by the school?", 
      a: "Our in-house nutritionists prepare balanced, hot Nigerian and continental meals daily in our ultra-hygienic kitchen facilities.",
    },
    { 
      q: "What extracurricular activities do you offer?", 
      a: "Our diverse program includes Robotics & Coding, Music, Swimming, Taekwondo, Ballet, and the Young Orators Club.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-10 duration-700 relative perspective-2000">
      {/* 3D Liquid Splash Blobs */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full -z-10 animate-pulse duration-[10000ms]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-bounce duration-[15000ms]"></div>

      <div className="text-center mb-32 space-y-10 relative z-10">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-blue-200 bg-blue-50/40 backdrop-blur-2xl text-blue-900 text-[10px] font-black tracking-[0.4em] uppercase shadow-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
          Prestigious Information Desk
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
          <span className="text-blue-950 serif italic block">COMMON</span>
          <span className="text-slate-300 serif italic opacity-40" style={{ WebkitTextStroke: '2px #1e3a8a' }}>ANSWERS.</span>
        </h1>
        <p className="text-slate-600 text-xl md:text-2xl max-w-2xl mx-auto font-bold leading-relaxed italic">
          Everything you need to know about life, learning, and the Fesola International community.
        </p>
      </div>

      <div className="space-y-10 mb-40 relative z-20">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`group rounded-[4rem] transition-all duration-700 border-2 overflow-hidden shadow-2xl transform-gpu
              ${openIdx === idx 
                ? 'bg-white border-blue-100 ring-[20px] ring-blue-500/5 rotate-x-1 scale-[1.02]' 
                : 'bg-white/50 backdrop-blur-xl border-white hover:bg-white hover:border-blue-50 hover:scale-[1.01]'}
            `}
          >
            <button 
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-10 md:p-14 text-left flex justify-between items-center group/btn"
            >
              <div className="flex items-center gap-10">
                <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all duration-1000 shadow-3xl
                  ${openIdx === idx ? 'bg-blue-600 text-white rotate-y-[360deg]' : 'bg-white text-slate-400 group-hover/btn:text-blue-600'}
                `}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className={`font-black text-2xl md:text-3xl serif italic transition-colors leading-tight
                  ${openIdx === idx ? 'text-blue-950' : 'text-slate-600 group-hover/btn:text-blue-900'}
                `}>
                  {faq.q}
                </span>
              </div>
              
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 shadow-inner
                ${openIdx === idx ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-300'}
              `}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </button>
            
            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${openIdx === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-10 md:px-20 pb-16 ml-0 md:ml-[6.5rem] pr-10 md:pr-32">
                <div className="w-full h-px bg-blue-100/50 mb-12"></div>
                <p className="text-slate-600 text-xl md:text-2xl leading-relaxed font-bold italic">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative p-20 rounded-[6rem] text-center overflow-hidden group shadow-3xl bg-blue-950 transform-gpu transition-all duration-1000 hover:rotate-y-[-1deg]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <p className="text-blue-300 font-black text-[11px] uppercase tracking-[0.5em] mb-8 italic">Need more clarity?</p>
        <h2 className="text-4xl md:text-6xl font-black text-white serif italic mb-14 leading-tight uppercase">Our admissions <br/>team is <span className="text-blue-400">WAITING.</span></h2>
        
        <button 
          onClick={onContactClick}
          className="bg-white text-blue-950 px-16 py-8 rounded-[3rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-3xl hover:scale-110 active:scale-95 transition-all flex items-center gap-4 mx-auto group/btn overflow-hidden relative"
        >
          <span className="relative z-10">Speak with us</span>
          <svg className="w-6 h-6 relative z-10 transition-transform group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FAQPage;

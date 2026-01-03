
import React from 'react';

interface Props {
  onContactClick: () => void;
}

const AboutPage: React.FC<Props> = ({ onContactClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative overflow-hidden perspective-1000">
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full -z-10 animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-emerald-400/10 blur-[100px] rounded-full -z-10 animate-bounce duration-[10000ms]"></div>
      
      <div className="text-center mb-32 relative z-10 animate-in fade-in zoom-in duration-1000">
        <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-blue-200 bg-white/50 backdrop-blur-md text-blue-900 text-[10px] font-black tracking-[0.4em] uppercase shadow-xl mb-10">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          World-Class Educational Foundation
        </div>
        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-blue-950 serif italic leading-none uppercase">
          Our <span className="text-slate-300 font-normal opacity-50">Legacy.</span>
        </h1>
        <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-semibold leading-relaxed">
          Building a good start in the formative years. We empower children to cope with subsequent school life with ease and advantage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-40 relative z-20">
        <div className="space-y-16">
          <div className="group relative perspective-1000">
            <div className="relative glass bg-white/70 backdrop-blur-3xl p-16 rounded-[4rem] border border-white shadow-2xl transition-all duration-700">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-blue-200"></div>
                <h2 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">School Vision</h2>
              </div>
              <p className="text-4xl md:text-6xl font-black text-blue-950 serif italic leading-[1.05] tracking-tight">
                The Pursuit of <br/>
                <span className="text-blue-700">Academic Excellence</span> <br/>
                & Uprightness.
              </p>
            </div>
          </div>
          
          <div className="group relative perspective-1000">
             <div className="relative glass bg-white/70 backdrop-blur-3xl p-16 rounded-[4rem] border border-white shadow-2xl transition-all duration-700">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-px bg-emerald-200"></div>
                  <h2 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.5em]">School Mission</h2>
                </div>
                <p className="text-slate-800 leading-relaxed text-xl md:text-2xl font-bold italic">
                  "To guide and help the children in early formative year in order to make a good start in education and to be able to cope with subsequent school life with ease and advantage."
                </p>
             </div>
          </div>
        </div>
        
        <div className="relative group sticky top-[200px] perspective-1000">
          <div className="relative rounded-[5rem] overflow-hidden aspect-[4/5] shadow-3xl border-[16px] border-white glass bg-white transform-gpu transition-all duration-1000 group-hover:rotate-y-[-5deg] group-hover:scale-105">
            <img 
              src="./proprietress.jpg" 
              alt="Mrs. Sola Iyiola - School Proprietress" 
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop';
              }}
            />
            <div className="absolute bottom-10 left-10 right-10 p-12 glass bg-white/95 backdrop-blur-2xl rounded-[3.5rem] border border-white shadow-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-blue-950 font-black text-4xl serif italic leading-none mb-4">Mrs. Sola Iyiola</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-blue-200"></div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Proprietress / Visionary Lead</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center relative z-30 pb-20">
        <button 
          onClick={onContactClick}
          className="bg-blue-950 text-white px-20 py-8 rounded-[3rem] font-black text-[11px] uppercase tracking-[0.5em] hover:bg-blue-800 hover:scale-110 active:scale-95 transition-all shadow-[0_30px_60px_rgba(30,58,138,0.4)]"
        >
          Join Our Legacy Today
        </button>
      </div>
    </div>
  );
};

export default AboutPage;

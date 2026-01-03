
import React from 'react';

interface Props {
  onNavigate: (target: string) => void;
}

const InfoLinks: React.FC<Props> = ({ onNavigate }) => {
  const links = [
    { name: 'Admissions Process', target: 'admissions' },
    { name: 'Frequently Asked Questions', target: 'faq' },
    { name: 'About Our Vision', target: 'about' },
    { name: 'Resource Downloads', target: 'resources' },
    { name: 'Join Our Team', target: 'careers' },
    { name: 'Leave Feedback', target: 'feedback' },
  ];

  return (
    <section id="links" className="py-24 px-6 md:px-12 lg:px-20 w-full bg-[#0f172a]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="max-w-xl text-center lg:text-left space-y-6">
          <div className="inline-block px-4 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
            <span className="text-blue-400 text-[10px] font-black tracking-widest uppercase">Quick Portals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black serif italic text-white leading-tight">Helpful <br/><span className="text-blue-500">Resources.</span></h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            Access our latest updates, academic calendars, and portals for parents and students in one place. We're committed to transparency and world-class support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
          {links.map((link) => (
            <button 
              key={link.name} 
              onClick={() => onNavigate(link.target)}
              className="px-10 py-8 bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 hover:border-blue-600 rounded-3xl text-left text-xs font-black tracking-widest transition-all active:scale-95 flex items-center justify-between min-w-[280px] group shadow-2xl"
            >
              {link.name.toUpperCase()}
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoLinks;

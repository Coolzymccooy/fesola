
import React from 'react';

interface Props {
  onNavClick: (target: string) => void;
}

const Footer: React.FC<Props> = ({ onNavClick }) => {
  const handleSocialClick = (e: React.MouseEvent) => {
    if ((e.currentTarget as HTMLAnchorElement).getAttribute('href') === '#') {
      e.preventDefault();
    }
  };

  return (
    <footer className="py-20 px-6 md:px-12 lg:px-20 bg-[#020617] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavClick('home')}>
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500 overflow-hidden p-1">
                <img src="/images/logoimg.png" alt="Fesola International Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-black italic serif text-white leading-none uppercase tracking-tight">Fesola International</h1>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1.5">Kiddies Schools</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Building the future through academic excellence, character building, and innovative learning experiences. Shaping tomorrow's leaders today in a nurturing and world-class environment.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-500">Quick Exploration</h4>
            <div className="flex flex-col gap-4">
              {['About Us', 'Admission', 'Student Life', 'Teaching & Learning', 'Resource Center'].map((item) => (
                <button 
                  key={item}
                  onClick={() => onNavClick(item.toLowerCase().includes('about') ? 'about' : item.toLowerCase().includes('admission') ? 'admissions' : 'resources')} 
                  className="text-xs text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-left flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-6 md:items-end">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-500">Connect</h4>
            <div className="space-y-4 md:text-right">
              <p className="text-white text-base font-black tracking-wider hover:text-blue-500 transition-colors cursor-pointer">admin@fesolaschools.org</p>
              <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">5, Puposola Street, off Amusan Road, Abule Egba, Lagos State</p>
              <div className="flex gap-4 md:justify-end pt-2">
                <a href="https://www.instagram.com/fesolaint.school/" target="_blank" rel="noopener noreferrer" onClick={handleSocialClick} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E1306C] hover:bg-white hover:shadow-xl transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" onClick={handleSocialClick} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#1DA1F2] hover:bg-white hover:shadow-xl transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" onClick={handleSocialClick} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#1877F2] hover:bg-white hover:shadow-xl transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.25em]">© {new Date().getFullYear()} Fesola International. Shaping Leaders.</p>
          <div className="flex gap-6">
            <button className="text-[10px] text-slate-600 font-bold hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</button>
            <button className="text-[10px] text-slate-600 font-bold hover:text-white transition-colors uppercase tracking-widest">Terms of Use</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

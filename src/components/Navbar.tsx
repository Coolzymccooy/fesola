
import React, { useState } from 'react';

interface Props {
  activeView: string;
  onApplyClick: () => void;
  onNavClick: (target: string) => void;
}

const Navbar: React.FC<Props> = ({ activeView, onApplyClick, onNavClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const subNavItems = [
    { label: 'Home', target: 'home' },
    { label: 'About Us', target: 'about', hasDropdown: true },
    { label: 'Admission', target: 'admissions', hasDropdown: true, isDramatic: true },
    { label: 'Student Life', target: 'resources', hasDropdown: true, isDramatic: true },
    { label: 'Teaching & Learning', target: 'about', hasDropdown: true, isDramatic: true },
    { label: 'Information', target: 'faq', hasDropdown: true, isDramatic: true },
    { label: 'Exclusive Parents', target: 'feedback', isExclusive: true },
  ];

  const handleNav = (target: string) => {
    onNavClick(target);
    setIsMobileMenuOpen(false);
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    if ((e.currentTarget as HTMLAnchorElement).getAttribute('href') === '#') {
      e.preventDefault();
    }
  };

  return (
    <header className="flex flex-col w-full shadow-2xl perspective-1000 relative">
      {/* Top Header - White Background */}
      <nav className="px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between bg-white border-b border-gray-100 relative z-[80]">
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer group shrink-0" onClick={() => handleNav('home')}>
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-500 overflow-hidden p-1 border border-slate-100">
            <img 
              src="/images/logoimg.jpeg" 
              alt="Fesola International Logo" 
              className="w-full h-full object-contain block"
              onError={(e) => {               
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-black italic serif text-blue-900 leading-[0.9] uppercase tracking-tighter">
              Fesola International
            </h1>
            <p className="text-[8px] md:text-[11px] lg:text-[13px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">
              Kiddies Schools
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden xl:flex items-center gap-4 border-r border-gray-100 pr-8">
            <a href="https://www.instagram.com/fesolaint.school/" onClick={handleSocialClick} className="text-[#E1306C] hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg></a>
            <a href="#" onClick={handleSocialClick} className="text-[#1877F2] hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
          </div>

          <button 
            onClick={onApplyClick}
            className="hidden sm:flex bg-blue-600 hover:bg-blue-800 text-white px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black shadow-2xl shadow-blue-600/40 transition-all active:scale-95 items-center gap-3 group whitespace-nowrap"
          >
            APPLY NOW
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-slate-50 rounded-xl"
          >
            <span className={`w-6 h-1 bg-blue-900 rounded-full transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`w-6 h-1 bg-blue-900 rounded-full transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-1 bg-blue-900 rounded-full transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Desktop Sub-Nav - Dark Background */}
      <div className="hidden xl:block bg-[#0f172a] overflow-x-auto no-scrollbar border-t border-white/5 relative z-[70]">
        <div className="w-full flex items-stretch h-14 whitespace-nowrap px-20">
          {subNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.target)}
              className={`flex items-center gap-2 px-6 text-[11px] font-black tracking-widest transition-all border-r border-white/5 relative group transform-gpu overflow-hidden
                ${(item.isDramatic || item.isExclusive)
                  ? 'bg-gradient-to-b from-blue-900/40 to-transparent text-white border-x border-white/5' 
                  : activeView === item.target ? 'text-white bg-blue-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                hover:scale-105 hover:z-30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]
              `}
            >
              {(item.isDramatic || item.isExclusive) && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              )}
              <span className="relative z-10 flex items-center gap-2">
                {(item.isDramatic || item.isExclusive) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6]"></span>
                )}
                {item.label.toUpperCase()}
              </span>
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className="ml-auto flex items-center gap-2.5 px-8 text-[11px] font-black tracking-widest text-gray-100 hover:bg-blue-500/20 border-l border-white/5 transition-all group"
          >
            CONTACT US
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[150] xl:hidden">
          <div className="absolute inset-0 bg-blue-950/95 backdrop-blur-3xl" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative h-full flex flex-col p-10 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-16">
              <span className="text-white font-black serif italic text-2xl">Menu.</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {subNavItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.target)}
                  className="text-4xl font-black text-left text-white/50 hover:text-white transition-all serif italic uppercase tracking-tighter"
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-white/10 my-4"></div>
              <button 
                onClick={() => handleNav('contact')}
                className="text-2xl font-black text-left text-blue-400 uppercase tracking-[0.2em]"
              >
                CONTACT US
              </button>
              <button 
                onClick={() => { onApplyClick(); setIsMobileMenuOpen(false); }}
                className="mt-8 w-full py-6 bg-blue-600 rounded-3xl font-black text-white text-xs tracking-widest uppercase"
              >
                APPLY FOR ADMISSION
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

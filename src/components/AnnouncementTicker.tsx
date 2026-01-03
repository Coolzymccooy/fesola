
import React from 'react';

const AnnouncementTicker: React.FC = () => {
  return (
    <div className="w-full bg-[#1a1a1a] text-white py-2 overflow-hidden whitespace-nowrap relative z-[70] flex items-center">
      <div className="px-6 bg-burgundy font-black text-[9px] tracking-[0.2em] h-full flex items-center uppercase absolute left-0 z-10 shadow-xl">
        FLASH NEWS
      </div>
      <div className="animate-marquee inline-block pl-[100%] hover:pause">
        <span className="inline-block px-12 text-[10px] font-black tracking-widest uppercase text-gray-300">
          • Admissions for 2025/2026 Session Now Open 
        </span>
        <span className="inline-block px-12 text-[10px] font-black tracking-widest uppercase text-gray-300">
          • Inter-House Sports Competition set for April 9th 
        </span>
        <span className="inline-block px-12 text-[10px] font-black tracking-widest uppercase text-gray-300">
          • Virtual Open House scheduled for next Saturday 
        </span>
        <span className="inline-block px-12 text-[10px] font-black tracking-widest uppercase text-gray-300">
          • New STEM Laboratory now commissioned 
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementTicker;

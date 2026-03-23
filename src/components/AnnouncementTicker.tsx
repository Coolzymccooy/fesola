import React, { useEffect, useState } from 'react';
import { API_BASE } from '../config/env';

const AnnouncementTicker: React.FC = () => {
  const [news, setNews] = useState<string[]>([
    "• Initializing Fesola Systems...",
  ]);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/api/admissions/public-facts`);
        if (!r.ok) return;
        const facts = await r.json();
        
        const dynamicNews: string[] = [];
        if (facts?.admissions?.status) {
          dynamicNews.push(`• Admissions: ${facts.admissions.status}`);
        }
        if (facts?.calendar?.upcomingEvents && Array.isArray(facts.calendar.upcomingEvents)) {
          facts.calendar.upcomingEvents.forEach((ev: any) => {
            dynamicNews.push(`• Upcoming Event: ${ev.event} (${ev.date})`);
          });
        }
        if (facts?.school?.tagline) {
          dynamicNews.push(`• ${facts.school.tagline}`);
        }

        if (dynamicNews.length > 0) {
          setNews(dynamicNews);
        }
      } catch (e) {
        console.error("Failed to load news", e);
      }
    })();
  }, []);

  return (
    <div className="w-full bg-[#1a1a1a] text-white py-2 overflow-hidden whitespace-nowrap relative z-[70] flex items-center">
      <div className="px-6 bg-burgundy font-black text-[9px] tracking-[0.2em] h-full flex items-center uppercase absolute left-0 z-10 shadow-xl">
        FLASH NEWS
      </div>
      <div className="animate-marquee inline-block pl-[100%] hover:pause">
        {news.map((n, i) => (
          <span key={i} className="inline-block px-12 text-[10px] font-black tracking-widest uppercase text-gray-300">
            {n}
          </span>
        ))}
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

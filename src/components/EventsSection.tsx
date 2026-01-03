
import React from 'react';

interface Props {
  onSeeAll?: () => void;
}

const EventsSection: React.FC<Props> = ({ onSeeAll }) => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 w-full bg-white border-y border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Upcoming Events */}
        <div className="space-y-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight serif italic text-blue-900">
            Upcoming <span className="text-slate-300 font-normal">Events</span>
          </h2>
          <div className="text-slate-500 font-black tracking-widest uppercase py-8 border-2 border-dashed border-slate-100 rounded-[2rem] text-center">
            Stay Tuned for Term 2 Announcements!
          </div>
        </div>

        {/* News & Happenings */}
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight serif italic text-blue-900">
              Latest <span className="text-slate-300 font-normal">& News</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* News Item 1 */}
            <div className="group cursor-pointer">
              <div className="flex gap-5 items-start mb-4">
                <div className="bg-blue-800 text-white p-4 rounded-2xl text-center min-w-[80px] shadow-2xl shadow-blue-800/30 group-hover:scale-105 group-hover:bg-blue-900 transition-all duration-500">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Apr 2025</div>
                  <div className="text-3xl font-black serif">09</div>
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="text-lg font-black leading-tight group-hover:text-blue-700 transition-colors serif italic text-slate-800">
                    Inter-house Sports Competition
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Main Field • 09:00 AM</p>
                </div>
              </div>
            </div>

            {/* News Item 2 */}
            <div className="group cursor-pointer">
              <div className="flex gap-5 items-start mb-4">
                <div className="bg-blue-800 text-white p-4 rounded-2xl text-center min-w-[80px] shadow-2xl shadow-blue-800/30 group-hover:scale-105 group-hover:bg-blue-900 transition-all duration-500">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Jan 2025</div>
                  <div className="text-3xl font-black serif">22</div>
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="text-lg font-black leading-tight uppercase group-hover:text-blue-700 transition-colors serif italic text-slate-800">
                    PAS Presentation Ceremony
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Great Hall • 11:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={onSeeAll}
            className="inline-flex items-center gap-3 text-blue-700 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-all mt-6 py-2 border-b-2 border-blue-700/10 cursor-pointer"
          >
            Explore All News & Happenings
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

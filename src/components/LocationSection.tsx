
import React from 'react';
import { CampusLocation } from '../types';

interface Props {
  locations: CampusLocation[];
  onInquire: (campusName: string) => void;
}

const LocationSection: React.FC<Props> = ({ locations, onInquire }) => {
  const events = [
    {
      title: "Academic Excellence Symposium",
      desc: "Annual presentation of research and creative projects by our senior scholars.",
      date: "May 20, 2025",
      type: "Academic"
    },
    {
      title: "Cultural Diversity Festival",
      desc: "Celebrating the rich heritage of our students through food, dance, and fashion.",
      date: "June 12, 2025",
      type: "Culture"
    },
    {
      title: "Fesola Kiddies Funfair",
      desc: "A day of games, laughter, and community bonding for all families and friends.",
      date: "July 05, 2025",
      type: "Social"
    }
  ];

  const mainLocation = locations[0];

  return (
    <section id="life-events" className="py-24 px-6 md:px-12 lg:px-20 w-full bg-[#fdfcfb]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight text-blue-900 serif italic">School Events & Life</h2>
          <p className="text-slate-500 max-w-2xl text-lg font-medium">Experience the vibrant atmosphere of Fesola International through our curated seasonal events and daily activities.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
                <div className="w-20 h-1.5 bg-blue-700 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
                <div className="w-8 h-1.5 bg-slate-200 rounded-full"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Find us at: {mainLocation.addressLines[0]}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event, idx) => (
          <div key={idx} className="group relative flex flex-col h-full perspective-1000">
            <div className="absolute -inset-2 bg-blue-500/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            
            <div className="relative glass p-10 rounded-[3rem] border-white flex flex-col flex-grow transition-all duration-500 group-hover:-translate-y-3 group-hover:bg-white shadow-2xl group-hover:shadow-blue-500/10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-700 transition-all duration-500 group-hover:bg-blue-700 group-hover:text-white">
                  {idx === 0 ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  ) : idx === 1 ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  )}
                </div>
                <div className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[9px] font-black uppercase tracking-widest border border-blue-100">
                  {event.type}
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-[#0f172a] mb-4 group-hover:text-blue-700 transition-colors serif italic leading-tight">{event.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{event.desc}</p>
              
              <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Scheduled Date</h4>
                    <p className="text-blue-800 font-black text-sm">{event.date}</p>
                </div>
                <button 
                  onClick={() => onInquire(`Information about ${event.title}`)}
                  className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-all"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Location Information - Awards Photo */}
<div className="mt-20 glass p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center gap-12 bg-white/50 shadow-2xl">
  {/* Image */}
  <div className="w-full md:w-1/4 max-w-[340px] aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white">
    <img
      src="/images/award2.jpeg"
      alt="Academic Excellence Awards"
      className="w-full h-full object-cover object-center"
      loading="lazy"
      decoding="async"
    />
  </div>
          <div className="flex-1 space-y-6">
              <div>
                  <h3 className="text-3xl font-black text-blue-900 serif italic mb-2">{mainLocation.name}</h3>
                  <div className="flex items-start gap-2 text-slate-500 font-bold uppercase text-[11px] tracking-widest">
                      <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                      {mainLocation.addressLines.join(', ')}
                  </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {mainLocation.contacts.map((contact, idx) => (
                      <div key={idx} className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{contact.label}</p>
                          <div className="flex flex-col">
                              {contact.phones.map((phone, pIdx) => (
                                  <a key={pIdx} href={`tel:${phone}`} className="text-sm font-black text-blue-800 hover:text-blue-600 transition-colors">{phone}</a>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
              <div className="pt-4">
                  <button 
                    onClick={() => onInquire(mainLocation.name)}
                    className="bg-blue-800 text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-800/20 hover:scale-105 transition-all active:scale-95"
                  >
                      Book a School Visit
                  </button>
              </div>
          </div>
      </div>
    </section>
  );
};

export default LocationSection;


import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const GalleryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

 const images = [
  { url: "/images/CommunityandLeadership.jpeg", title: "Community & Leadership" },
  { url: "/images/classroomlife.jpeg", title: "Traditional Classroom Life" },
  { url: "/images/musicalperformance.jpeg", title: "Musical Performance" },
  { url: "/images/careershowcase.jpeg", title: "Future Careers Showcase" },
  { url: "/images/celebrationandjoy.jpeg", title: "Celebrations & Joy" },
  { url: "/images/awards.jpg", title: "Recognizing Excellence" },
  { url: "/images/christmas-card.jpg", title: "Holiday Spirit" },
  { url: "/images/proprietress.jpg", title: "Dedicated Leadership" },
];


  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
      <div 
        className="absolute inset-0 bg-[#020617]/95 backdrop-blur-2xl animate-in fade-in duration-500" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-7xl h-full flex flex-col animate-in zoom-in slide-in-from-bottom-10 duration-500">
        <div className="flex justify-between items-center mb-8 shrink-0">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">
              Scholar <span className="text-blue-50">Life</span>
            </h2>
            <p className="text-slate-500 text-xs font-bold tracking-[0.3em] uppercase mt-2">Authentic Moments • High Achievement</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 no-scrollbar perspective-1000">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-700 hover:z-50 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)]
                ${idx % 5 === 0 ? 'lg:col-span-2 aspect-[16/10]' : 'aspect-square'}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-8">
                  <h3 className="text-white font-black text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 serif italic">{img.title}</h3>
                  <div className="flex items-center gap-2 mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Fesola International Kiddies Schools</p>
                  </div>
                </div>
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[150px] -z-10 rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

export default GalleryModal;

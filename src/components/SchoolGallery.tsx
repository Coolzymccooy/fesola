
import React from 'react';

const SchoolGallery: React.FC = () => {
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
    <section className="py-24 px-6 md:px-12 lg:px-20 w-full bg-white">
      <div className="max-w-7xl mx-auto mb-16">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-100 bg-blue-50/50 text-blue-800 text-[11px] font-black tracking-[0.15em] uppercase mb-6">
          Visual Journey
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight serif italic text-blue-900">Scholar <span className="text-slate-300 font-normal">Life.</span></h2>
        <p className="text-slate-500 mt-4 max-w-2xl font-medium text-lg">A glimpse into the daily excellence, creativity, and joy at Fesola International.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden rounded-[2.5rem] bg-slate-50 aspect-square shadow-xl transition-all duration-700 hover:-translate-y-2"
          >
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <p className="text-white font-black text-lg serif italic translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SchoolGallery;

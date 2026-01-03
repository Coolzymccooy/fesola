
import React from 'react';

const NewsPage: React.FC = () => {
const news = [
  {
    title: "Champions of the Field: Inter-House Sports Highlights",
    date: "March 15, 2025",
    category: "Sports",
    excerpt: "Relive the excitement of our annual sports festival where teamwork and excellence were on full display across all grade levels.",
    img: "/images/celebration.jpg",
  },
  {
    title: "Musical Excellence: Recorder Performance Day",
    date: "February 28, 2025",
    category: "Creative Arts",
    excerpt: "Our scholars showcased their musical prowess with a mesmerizing recorder performance during the founder's day celebration.",
    img: "/images/recorders.jpg",
  },
  {
    title: "Seasonal Wishes: Merry Christmas from Fesola",
    date: "December 20, 2024",
    category: "Community",
    excerpt: "The Fesola International family wishes all our parents and partners a joyous holiday season and a prosperous new year.",
    img: "/images/christmas-card.jpg",
  },
];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight serif italic text-blue-900 uppercase">School <span className="text-slate-200 font-normal italic">News.</span></h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Stories of excellence, innovation, and community from Fesola International.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {news.map((item, idx) => (
          <div key={idx} className="group glass border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col bg-white">
            <div className="aspect-[16/10] overflow-hidden relative">
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-blue-800 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">{item.category}</span>
              </div>
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{item.date}</p>
              <h3 className="text-2xl font-black text-slate-800 serif italic leading-tight mb-4 group-hover:text-blue-700 transition-colors">{item.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{item.excerpt}</p>
              <button className="mt-auto text-blue-800 font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                Read Full Story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-[#0f172a] rounded-[3rem] text-center border border-white/5 relative overflow-hidden group shadow-3xl">
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <h2 className="text-2xl font-black text-white serif italic mb-4">Stay Connected</h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-8 font-medium">Subscribe to our monthly digital newsletter to receive campus updates directly in your inbox.</p>
        <div className="flex max-w-md mx-auto gap-2">
            <input className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-blue-500 transition-all" placeholder="Email Address" />
            <button className="bg-blue-600 text-white px-8 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-600/20 hover:bg-blue-700">Join</button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;

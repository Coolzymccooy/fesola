import React from "react";

interface Props {
  onContactClick: () => void;
}

const AlumniPage: React.FC<Props> = ({ onContactClick }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-900 to-[#0f172a] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
        
        <div className="relative z-10text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md mb-6 animate-fade-in-up">
            <span className="text-blue-200 text-xs font-black tracking-[0.2em] uppercase">The Fesola Legacy</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4 text-center leading-tight [text-shadow:0_4px_24px_rgba(0,0,0,0.4)]">
            Old Students <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300 italic serif">Association.</span>
          </h1>
          <p className="text-blue-100/80 text-lg md:text-xl font-medium max-w-2xl text-center leading-relaxed">
            Reconnecting generations of Fesola Alumni. Relive the memories, expand your network, and give back to the citadel that shaped your foundation.
          </p>
        </div>
      </section>

      {/* Stats/Metrics Block */}
      <section className="py-12 bg-blue-600 relative z-20 -mt-8 mx-6 md:mx-12 lg:mx-20 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-around items-center gap-8 px-10 text-white">
        <div className="text-center">
          <p className="text-4xl font-black mb-1">2,500+</p>
          <p className="text-xs uppercase tracking-widest text-blue-200 font-bold">Global Alumni</p>
        </div>
        <div className="hidden md:block w-px h-12 bg-blue-400"></div>
        <div className="text-center">
          <p className="text-4xl font-black mb-1">15+</p>
          <p className="text-xs uppercase tracking-widest text-blue-200 font-bold">Years of Excellence</p>
        </div>
        <div className="hidden md:block w-px h-12 bg-blue-400"></div>
        <div className="text-center">
          <p className="text-4xl font-black mb-1">30+</p>
          <p className="text-xs uppercase tracking-widest text-blue-200 font-bold">Countries Reached</p>
        </div>
      </section>

      {/* Core Initiatives Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight mb-4">Why Join the Association?</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">Membership gives you exclusive access to networking events, mentorship programs, and opportunities to shape the future of Fesola.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Networking Hub",
              desc: "Connect with classmates in diverse industries globally.",
              icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
              color: "bg-blue-50 text-blue-600"
            },
            {
              title: "Mentorship",
              desc: "Guide current Fesola students or find a mentor for your career.",
              icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              color: "bg-emerald-50 text-emerald-600"
            },
            {
              title: "Give Back",
              desc: "Contribute to scholarship funds and infrastructural development.",
              icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
              color: "bg-rose-50 text-rose-600"
            }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl hover:-translate-y-2 transition-transform duration-500 cursor-pointer group">
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Call to Action */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-blue-950 italic serif tracking-tight mb-6">Reconnect With Your Roots.</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">Fill out the official registration form to join the directory, gain access to the private portal, and stay updated on reunions.</p>
          
          <a 
            href="https://wa.me/2348033221100?text=Hello,%20I%20would%20like%20to%20register%20for%20the%20Fesola%20Old%20Students%20Association." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] text-white rounded-full font-black tracking-widest uppercase text-sm shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-105 hover:bg-[#1ebd5a] transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Connect via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default AlumniPage;

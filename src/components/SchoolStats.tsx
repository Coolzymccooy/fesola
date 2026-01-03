
import React from 'react';

const SchoolStats: React.FC = () => {
  const stats = [
    { label: 'Student-Teacher Ratio', value: '15:1', color: 'text-blue-400' },
    { label: 'Years of Excellence', value: '25+', color: 'text-white' },
    { label: 'Success Rate', value: '99%', color: 'text-sky-400' },
    { label: 'Global Partnerships', value: '10+', color: 'text-indigo-400' },
  ];

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Decorative background element using blue colors */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-900/20 blur-[100px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] -z-10 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center group cursor-default space-y-4">
            <div className={`text-5xl md:text-7xl font-black ${stat.color} serif italic group-hover:scale-110 transition-all duration-700`}>
              {stat.value}
            </div>
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-slate-200 transition-colors">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SchoolStats;

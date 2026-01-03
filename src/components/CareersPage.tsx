
import React from 'react';

interface Props {
  onContactClick: () => void;
  onApply: (jobTitle: string) => void;
}

const CareersPage: React.FC<Props> = ({ onContactClick, onApply }) => {
  const roles = [
    { title: 'Class Teacher (Primary)', type: 'Full-time', location: 'Omole Phase 1' },
    { title: 'STEM Coordinator', type: 'Full-time', location: 'Alausa Campus' },
    { title: 'School Nurse', type: 'Full-time', location: 'Omole Phase 2' },
    { title: 'French Teacher', type: 'Part-time', location: 'Multiple' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">Join Our <span className="gradient-text">Faculty.</span></h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">We are always looking for passionate educators and administrators to help build the future.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-8 rounded-[2rem] border-blue-500/20">
            <h3 className="text-xl font-bold mb-4">Why Work With Us?</h3>
            <ul className="space-y-4">
              {['Continuous Professional Development', 'Competitive Remuneration', 'Supportive Community', 'Modern Teaching Facilities'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass p-8 rounded-[2rem] bg-gradient-to-br from-emerald-600/10 to-transparent">
            <h3 className="text-xl font-bold mb-4">Recruitment Process</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">Our selection process involves initial screening, panel interviews, and practical teaching demonstrations for academic roles.</p>
            <button onClick={onContactClick} className="w-full py-4 bg-white text-black rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors">CONTACT HR</button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          {roles.map((role, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl flex items-center justify-between border-white/5 hover:border-blue-500/20 transition-all group">
              <div>
                <h4 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{role.title}</h4>
                <div className="flex gap-4 mt-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{role.type}</span>
                  <span className="text-[10px] font-bold text-blue-500 uppercase">{role.location}</span>
                </div>
              </div>
              <button 
                onClick={() => onApply(role.title)}
                className="px-6 py-2 glass rounded-lg text-[10px] font-bold hover:bg-white hover:text-black transition-all active:scale-95"
              >
                APPLY
              </button>
            </div>
          ))}
          <div className="p-8 text-center text-gray-500 italic text-sm border border-dashed border-white/10 rounded-2xl mt-8">
            Don't see a role that fits? Send your CV to careers@fesolaschools.org for future consideration.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;

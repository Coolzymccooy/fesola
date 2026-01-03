
import React, { useState } from 'react';

interface Resource {
  name: string;
  type: string;
  size: string;
  accent: string;
  fileName: string;
  content: string[];
}

interface Props {
  onApplyClick?: () => void;
  onContactClick?: () => void;
}

const ResourcesPage: React.FC<Props> = ({ onApplyClick, onContactClick }) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [viewingResource, setViewingResource] = useState<Resource | null>(null);

  const resources: Resource[] = [
    { 
      name: '2024/2025 Academic Calendar', 
      type: 'PDF', size: '1.2MB', accent: 'from-blue-500 to-indigo-600', fileName: 'Calendar.html',
      content: ["Term 1: Resumption - Sept 11, 2024", "Term 2: Resumption - Jan 8, 2025", "Term 3: Resumption - April 28, 2025"]
    },
    { 
      name: 'PTA Official Handbook', 
      type: 'PDF', size: '2.4MB', accent: 'from-emerald-400 to-teal-600', fileName: 'PTA.html',
      content: ["Article I: Mission - To foster parent-teacher synergy.", "Article II: Membership - Automated for all parents."]
    },
    { 
      name: 'Student Code of Conduct', 
      type: 'DOCX', size: '850KB', accent: 'from-violet-500 to-purple-700', fileName: 'Conduct.html',
      content: ["1. Academic Honesty: Absolute integrity is the core value.", "2. Appearance: Neat uniforms reflect discipline."]
    }
  ];

  const handleDownload = (res: Resource) => {
    setDownloading(res.name);
    setTimeout(() => {
      const html = `<html><body style="font-family:serif;padding:50px;"><h1>${res.name}</h1>${res.content.map(p => `<p>${p}</p>`).join('')}</body></html>`;
      const blob = new Blob([html], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = res.fileName;
      link.click();
      setDownloading(null);
    }, 1200);
  };

  const handlePrint = () => {
    // The print engine in index.html specifically isolates the .printable-area
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-32 no-print">
        <h1 className="text-5xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] text-blue-950">RESOURCES.</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 no-print">
        {resources.map((res) => (
          <div key={res.name} className="glass bg-white p-12 rounded-[3rem] border shadow-3xl flex flex-col h-full hover:-translate-y-4 transition-all">
            <div className={`w-16 h-16 bg-gradient-to-br ${res.accent} rounded-2xl flex items-center justify-center text-white mb-10`}>
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-blue-950 serif italic mb-4">{res.name}</h3>
            <button onClick={() => setViewingResource(res)} className="mt-auto w-full py-5 bg-blue-950 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl">VIEW DOCUMENT</button>
          </div>
        ))}
      </div>

      {viewingResource && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-xl no-print-bg">
          <div className="absolute inset-0 no-print" onClick={() => setViewingResource(null)}></div>
          <div className="relative w-full max-w-4xl h-full flex flex-col animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6 text-white no-print">
              <h2 className="text-2xl font-black serif italic uppercase">{viewingResource.name}</h2>
              <button onClick={() => setViewingResource(null)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>

            <div className="flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white printable-area">
              <div className="p-10 md:p-20 overflow-y-auto no-scrollbar flex-1 space-y-12">
                <div className="flex justify-between border-b-2 border-slate-50 pb-8">
                  <div className="text-blue-900 font-black serif italic uppercase">Fesola Official Records</div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase">{new Date().toLocaleDateString()}</div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 serif italic border-l-4 border-blue-600 pl-6">{viewingResource.name}</h3>
                {viewingResource.content.map((p, i) => (
                  <p key={i} className="text-slate-600 font-medium italic text-lg leading-relaxed">{p}</p>
                ))}
                <div className="pt-20 border-t border-slate-50 text-[10px] text-slate-400 uppercase italic">
                    This document is a digital verified copy of Fesola International.
                </div>
              </div>

              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex gap-4 justify-end items-center no-print">
                 <button onClick={handlePrint} className="px-10 py-4 border-2 border-slate-200 rounded-xl text-[10px] font-black uppercase hover:bg-white shadow-sm transition-all">Print Document</button>
                 <button onClick={() => handleDownload(viewingResource)} className="px-10 py-4 bg-blue-950 text-white rounded-xl text-[10px] font-black uppercase shadow-xl">Download</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;

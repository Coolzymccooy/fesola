
import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  jobTitle: string;
  onClose: () => void;
}

const JobApplyModal: React.FC<Props> = ({ isOpen, jobTitle, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setStep(3);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative glass w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 p-1 bg-gradient-to-br from-gray-900 via-black to-blue-900/20">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">Faculty Application</h2>
              <p className="text-sky-400 text-xs font-bold uppercase tracking-widest mt-1">Applying for: {jobTitle}</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {step < 3 && (
            <div className="flex gap-2 mb-10">
              <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'bg-white/10'}`}></div>
              <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'bg-white/10'}`}></div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  Personal Details
                </h3>
                <div className="space-y-4">
                  <input 
                    className="w-full glass bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-sky-500/50 transition-all" 
                    placeholder="Your Full Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    className="w-full glass bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-sky-500/50 transition-all" 
                    placeholder="Email Address" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <input 
                    className="w-full glass bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-sky-500/50 transition-all" 
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <button 
                onClick={handleNext} 
                disabled={!formData.name || !formData.email}
                className="w-full py-5 bg-sky-600 rounded-2xl font-black text-sm tracking-widest hover:bg-sky-500 transition-all shadow-xl shadow-sky-600/20 active:scale-95 disabled:opacity-50"
              >
                NEXT STEP
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  Professional Experience
                </h3>
                <textarea 
                  className="w-full glass bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-sky-500/50 transition-all min-h-[120px] resize-none" 
                  placeholder="Briefly describe your teaching/professional experience..."
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                ></textarea>
                
                <div className="p-6 glass border-dashed border-white/20 rounded-2xl text-center group cursor-pointer hover:border-sky-500/50 transition-all">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-500 group-hover:text-sky-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  <p className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-tighter transition-colors">Upload CV / Portfolio (PDF)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleBack} className="flex-1 py-5 glass border border-white/10 rounded-2xl font-black text-sm tracking-widest hover:bg-white/5 transition-all">BACK</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting} 
                  className="flex-[2] py-5 bg-emerald-600 rounded-2xl font-black text-sm tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        SUBMITTING...
                      </>
                    ) : 'FINISH APPLICATION'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-sky-500/10 border border-sky-500/40 rounded-full flex items-center justify-center mx-auto mb-8 text-sky-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">Application Sent</h3>
              <p className="text-gray-400 mb-10 text-sm leading-relaxed max-w-xs mx-auto">
                Thank you for your interest in joining Fesola International. Our HR team will review your credentials and contact you if your profile matches our needs.
              </p>
              <button onClick={onClose} className="px-10 py-4 bg-white text-black rounded-2xl font-black text-xs tracking-widest transition-all hover:bg-gray-200 shadow-xl shadow-white/10 active:scale-95">CLOSE PORTAL</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplyModal;

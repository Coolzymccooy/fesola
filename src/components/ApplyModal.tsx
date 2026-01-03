
import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setStep(3);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative glass w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 p-1 bg-[#0f172a]">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black tracking-tight text-white serif italic">Student Application</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {step < 3 && (
            <div className="flex gap-2 mb-10">
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-white/10'}`}></div>
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-white/10'}`}></div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-100 uppercase tracking-[0.3em] ml-1">STUDENT INFORMATION</h3>
                <div className="space-y-4">
                  <input 
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white/15 transition-all text-white placeholder:text-slate-400 font-medium" 
                    placeholder="Student Full Name" 
                  />
                  <select className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white/15 transition-all text-white font-medium appearance-none cursor-pointer">
                      <option className="bg-[#0f172a]" value="">Select Grade Level</option>
                      <option className="bg-[#0f172a]" value="creche">Creche / Nursery</option>
                      <option className="bg-[#0f172a]" value="primary">Primary</option>
                      <option className="bg-[#0f172a]" value="highschool">High School</option>
                  </select>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
                    <input 
                      className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white/15 transition-all text-white font-medium block" 
                      type="date" 
                    />
                  </div>
                </div>
              </div>
              <button 
                onClick={handleNext} 
                className="w-full py-5 bg-blue-600 rounded-2xl font-black text-white hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95 text-xs uppercase tracking-widest"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-100 uppercase tracking-[0.3em] ml-1">PARENT / GUARDIAN</h3>
                <div className="space-y-4">
                  <input className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white/15 transition-all text-white placeholder:text-slate-400 font-medium" placeholder="Parent Name" />
                  <input className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white/15 transition-all text-white placeholder:text-slate-400 font-medium" placeholder="Email Address" type="email" />
                  <input className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white/15 transition-all text-white placeholder:text-slate-400 font-medium" placeholder="Primary Phone Number" />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleBack} className="flex-1 py-5 border border-white/10 rounded-2xl font-black text-slate-200 hover:bg-white/5 transition-all text-xs uppercase tracking-widest">Back</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting} 
                  className="flex-[2] py-5 bg-blue-600 rounded-2xl font-black text-white hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : 'Submit Application'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 serif italic">Application Logged</h3>
              <p className="text-slate-300 mb-10 text-sm font-medium leading-relaxed max-w-xs mx-auto">Your application has been logged in our system. You will receive an email shortly with the next steps for documentation.</p>
              <button onClick={onClose} className="px-10 py-4 bg-white text-[#0f172a] rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-slate-100 active:scale-95 shadow-xl">Close Window</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;

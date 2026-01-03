
import React, { useState, useEffect } from 'react';
import { FormData, FormStatus } from '../types';

interface Props {
  prefilledSubject?: string;
}

const ContactForm: React.FC<Props> = ({ prefilledSubject }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (prefilledSubject) {
      setFormData(prev => ({ ...prev, subject: prefilledSubject }));
    }
  }, [prefilledSubject]);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-blue-500/10 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative glass p-10 rounded-[2.5rem] shadow-2xl border-slate-100">
        <h2 className="text-3xl font-black text-blue-900 mb-2 tracking-tight serif italic">Enquiry Form</h2>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-10">Direct access to our admissions office</p>
        
        {status === 'success' ? (
          <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-[2rem] text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-emerald-600/20">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-emerald-900 font-black text-xl mb-4 uppercase tracking-tighter">Application Logged</h3>
            <p className="text-emerald-800/70 text-sm font-medium">Thank you. An admissions officer will contact you on the provided phone number within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-800 uppercase ml-2 tracking-widest opacity-60">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 rounded-2xl px-6 py-4 outline-none transition-all text-[#1a1a1a] font-bold text-sm"
                  placeholder="Parent or Guardian Name"
                />
                {errors.name && <p className="text-blue-600 text-[10px] ml-2 font-bold uppercase mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-800 uppercase ml-2 tracking-widest opacity-60">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 rounded-2xl px-6 py-4 outline-none transition-all text-[#1a1a1a] font-bold text-sm"
                  placeholder="contact@email.com"
                />
                {errors.email && <p className="text-blue-600 text-[10px] ml-2 font-bold uppercase mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-800 uppercase ml-2 tracking-widest opacity-60">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 rounded-2xl px-6 py-4 outline-none transition-all text-[#1a1a1a] font-bold text-sm"
                  placeholder="+234 ..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-800 uppercase ml-2 tracking-widest opacity-60">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 rounded-2xl px-6 py-4 outline-none transition-all text-[#1a1a1a] font-bold text-sm"
                  placeholder="e.g. Nursery Admissions"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-800 uppercase ml-2 tracking-widest opacity-60">Your Enquiry *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 rounded-2xl px-6 py-4 outline-none transition-all resize-none text-[#1a1a1a] font-bold text-sm"
                placeholder="How can we assist your child's education today?"
              ></textarea>
              {errors.message && <p className="text-blue-600 text-[10px] ml-2 font-bold uppercase mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-black py-5 rounded-[1.5rem] shadow-2xl shadow-blue-800/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 tracking-[0.2em] text-xs uppercase"
            >
              {status === 'submitting' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  SUBMITTING...
                </>
              ) : 'Send Enquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;

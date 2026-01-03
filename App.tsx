
import React, { useState, useRef } from 'react';
import Navbar from './src/components/Navbar';
import Hero from './src/components/Hero';
import LocationSection from './src/components/LocationSection';
import ContactForm from './src/components/ContactForm';
import SocialSection from './src/components/SocialSection';
import InfoLinks from './src/components/InfoLinks';
import EventsSection from './src/components/EventsSection';
import SchoolStats from './src/components/SchoolStats';
import Testimonials from './src/components/Testimonials';
import AnnouncementTicker from './src/components/AnnouncementTicker';
import Footer from './src/components/Footer';
import ApplyModal from './src/components/ApplyModal';
import JobApplyModal from './src/components/JobApplyModal';
import GalleryModal from './src/components/GalleryModal';
import AIAssistant from './src/components/AIAssistant';
import AboutPage from './src/components/AboutPage';
import AdmissionsPage from './src/components/AdmissionsPage';
import FAQPage from './src/components/FAQPage';
import ResourcesPage from './src/components/ResourcesPage';
import CareersPage from './src/components/CareersPage';
import FeedbackPage from './src/components/FeedbackPage';
import NewsPage from './src/components/NewsPage';
import SchoolGallery from './src/components/SchoolGallery';
import { locations } from './data/locations';
import AdminFactsPage from "./src/pages/AdminFactsPage";

export type View = 'home' | 'about' | 'admissions' | 'faq' | 'resources' | 'careers' | 'feedback' | 'news' | '__admin_facts'; 

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [prefilledSubject, setPrefilledSubject] = useState('');

  // --- hidden admin route via URL
React.useEffect(() => {
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);

  // Allow either:
  // 1) /__admin/facts?key=...
  // 2) /?view=adminFacts&key=...
  const wantsAdmin =
    path === "/__admin/facts" || params.get("view") === "adminFacts";

  if (wantsAdmin) {
    setCurrentView("adminFacts");
  }
}, []);


  
  const contactRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleNavigateToContact = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      scrollTo(contactRef);
    } else {
      scrollTo(contactRef);
    }
  };

  const handleInquireCampus = (campusName: string) => {
    setPrefilledSubject(`Enquiry about ${campusName}`);
    handleNavigateToContact();
  };

  const handleJobApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsJobModalOpen(true);
  };

  const handleNavClick = (target: string) => {
    const viewTargets: View[] = ['about', 'admissions', 'faq', 'resources', 'careers', 'feedback', 'home', 'news'];
    
    if (viewTargets.includes(target as View)) {
      setCurrentView(target as View);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'contact') {
      handleNavigateToContact();
    } else if (target === 'locations') {
      if (currentView !== 'home') {
        setCurrentView('home');
        scrollTo(locationsRef);
      } else {
        scrollTo(locationsRef);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1a1a1a] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-[70]">
        <AnnouncementTicker />
        
     {currentView !== '__admin_facts' && (
  <Navbar
    activeView={currentView}
    onApplyClick={() => setIsApplyModalOpen(true)}
    onNavClick={handleNavClick}
  />
)}
      </div>
      
      <main className="relative pt-[180px]">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero 
              onApplyClick={() => setIsApplyModalOpen(true)} 
              onContactClick={handleNavigateToContact}
              onGalleryClick={() => setIsGalleryOpen(true)}
            />

            <SchoolStats />

            <EventsSection onSeeAll={() => handleNavClick('news')} />

            <div className="bg-[#0f172a] py-2">
              <div className="w-full h-px bg-white/5"></div>
            </div>

            <Testimonials />

            <SchoolGallery />
            
            <div 
              id="contact"
              ref={contactRef} 
              className="w-full px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 py-32 bg-[#fafafa] border-t border-slate-100 scroll-mt-24"
            >
              <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-1 bg-blue-50 rounded-full border border-blue-100">
                    <span className="text-blue-700 text-[10px] font-black tracking-widest uppercase">Contact Us</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-blue-900 serif italic leading-none">Get in <br/>Touch.</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  Experience the warm welcome of Fesola International. Our administrative team is here to guide your family through every step of the admission process.
                </p>
                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.location.href='mailto:admin@fesolaschools.org'}>
                    <div className="w-16 h-16 bg-[#0f172a] rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-500">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase font-black text-blue-700 tracking-[0.3em] mb-1">Direct Admission Desk</p>
                      <p className="text-xl font-black text-[#1a1a1a]">admin@fesolaschools.org</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Our Location</p>
                    <p className="text-sm font-bold text-slate-700">1, Puposola Street, off Amusan Road, Abule Egba, Lagos State</p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <ContactForm prefilledSubject={prefilledSubject} />
              </div>
            </div>

            <div id="locations" ref={locationsRef} className="scroll-mt-24 bg-white">
              <LocationSection locations={locations} onInquire={handleInquireCampus} />
            </div>

            <SocialSection />

            <InfoLinks onNavigate={handleNavClick} />
          </div>
        )}

        {currentView === 'about' && <AboutPage onContactClick={handleNavigateToContact} />}
        {currentView === 'admissions' && <AdmissionsPage onApplyClick={() => setIsApplyModalOpen(true)} />}
        {currentView === 'faq' && <FAQPage onContactClick={handleNavigateToContact} />}
        {currentView === 'resources' && (
          <ResourcesPage 
            onApplyClick={() => setIsApplyModalOpen(true)} 
            onContactClick={handleNavigateToContact} 
          />
        )}
        {currentView === 'careers' && <CareersPage onContactClick={handleNavigateToContact} onApply={handleJobApply} />}
        {currentView === 'feedback' && <FeedbackPage />}
        {currentView === 'news' && <NewsPage />}
        {currentView === '__admin_facts' && <AdminFactsPage />}
      </main>

      {currentView !== '__admin_facts' && <Footer onNavClick={handleNavClick} />}
      
      <AIAssistant />
      <ApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />
      <JobApplyModal isOpen={isJobModalOpen} jobTitle={selectedJob} onClose={() => setIsJobModalOpen(false)} />
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />

      <div className="fixed top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] -z-20 pointer-events-none"></div>
    </div>
  );
};

export default App;

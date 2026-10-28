import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { WhyInvestSection } from './components/WhyInvestSection';
import { ConnectivitySection } from './components/ConnectivitySection';
import { AboutNeopolisSection } from './components/AboutNeopolisSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertiesPage } from './components/PropertiesPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { ContactPage } from './components/ContactPage';
import { ThankYouPage } from './components/ThankYouPage';
import { PropertyEnquiryForm } from './components/PropertyEnquiryForm';
import { RiseBy9Modal } from './components/RiseBy9Modal';
import { PROJECTS_DATA, ProjectData } from './data/projectsData';
import { X } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [preselectedLeadProject, setPreselectedLeadProject] = useState<string>('all');
  const [showMobileBottomBar, setShowMobileBottomBar] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalProjectName, setModalProjectName] = useState<string | undefined>(undefined);
  const [riseBy9ModalOpen, setRiseBy9ModalOpen] = useState(false);

  // Ensure Home page is ALWAYS the main and default page on page load or refresh
  useEffect(() => {
    // Clear any hash from earlier sessions or refreshes so user always starts on the Home page
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch {
        window.location.hash = '';
      }
    }
    setCurrentRoute('/');
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileBottomBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to easily close the enquiry modal & lock background scrolling
  useEffect(() => {
    if (!enquiryModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEnquiryModalOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enquiryModalOpen]);

  const navigateTo = (route: string) => {
    if (route === '/') {
      setSelectedProject(null);
      setCurrentRoute('/');
      if (window.location.hash) {
        try {
          window.history.replaceState(null, '', window.location.pathname);
        } catch {
          window.location.hash = '';
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === '/properties/') {
      setSelectedProject(null);
      setCurrentRoute('/properties/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === '/contact/') {
      setSelectedProject(null);
      setCurrentRoute('/contact/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === '/thank-you/') {
      setSelectedProject(null);
      setEnquiryModalOpen(false);
      setCurrentRoute('/thank-you/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route.startsWith('/properties/')) {
      const slug = route.replace('/properties/', '').replace('/', '');
      const found = PROJECTS_DATA.find((p) => p.id === slug);
      if (found) {
        handleOpenProjectDetails(found);
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (currentRoute !== '/') {
      setCurrentRoute('/');
      setSelectedProject(null);
      if (window.location.hash) {
        try {
          window.history.replaceState(null, '', window.location.pathname);
        } catch {
          window.location.hash = '';
        }
      }
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenProjectDetails = (project: ProjectData) => {
    if (project.id === 'rise-by-9') {
      setRiseBy9ModalOpen(true);
      return;
    }
    setSelectedProject(project);
    setCurrentRoute(`/properties/${project.id}/`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquireProject = (project: ProjectData) => {
    if (project.id === 'rise-by-9') {
      setRiseBy9ModalOpen(true);
      return;
    }
    setModalProjectName(project.name);
    setEnquiryModalOpen(true);
  };

  const handleOpenGeneralEnquiry = () => {
    if (selectedProject) {
      setModalProjectName(selectedProject.name);
    } else {
      setModalProjectName(undefined);
    }
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden w-full relative">
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenEnquiry={handleOpenGeneralEnquiry}
        onNavigateSection={scrollToSection}
        onNavigateRoute={navigateTo}
        isProjectDetailView={!!selectedProject || currentRoute !== '/'}
        onBackToHome={() => navigateTo('/')}
      />

      {/* 2. Main Page Content */}
      <main className="w-full overflow-x-hidden">
        {selectedProject ? (
          /* Individual Property Page */
          <ProjectDetailPage
            project={selectedProject}
            onBackToHome={() => navigateTo('/')}
            onNavigateProperties={() => navigateTo('/properties/')}
            onSelectProject={handleOpenProjectDetails}
          />
        ) : currentRoute === '/properties/' ? (
          /* Properties Listing Archive Page */
          <PropertiesPage
            onSelectProject={handleOpenProjectDetails}
            onEnquireProject={handleEnquireProject}
            onNavigateHome={() => navigateTo('/')}
          />
        ) : currentRoute === '/contact/' ? (
          /* Dedicated Contact Page */
          <ContactPage
            onNavigateHome={() => navigateTo('/')}
            onNavigateProperties={() => navigateTo('/properties/')}
            preselectedProject={preselectedLeadProject}
          />
        ) : currentRoute === '/thank-you/' ? (
          /* Thank You Confirmation Page */
          <ThankYouPage
            onNavigateHome={() => navigateTo('/')}
            onNavigateProperties={() => navigateTo('/properties/')}
            onSelectProject={handleOpenProjectDetails}
          />
        ) : (
          /* Standalone Homepage (Default) */
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onExploreProjects={() => navigateTo('/properties/')}
              onOpenEnquiry={handleOpenGeneralEnquiry}
            />

            {/* 2. Featured Projects Grid */}
            <FeaturedProjectsSection
              projects={PROJECTS_DATA}
              onSelectProjectDetails={handleOpenProjectDetails}
              onEnquireProject={handleEnquireProject}
            />

            {/* 3. Why Invest in Neopolis? */}
            <WhyInvestSection
              onExploreProjects={() => navigateTo('/properties/')}
            />

            {/* 4. Nearby Locations & Connectivity (No Map) */}
            <ConnectivitySection />

            {/* 5. About Neopolis, Kokapet */}
            <AboutNeopolisSection />

            {/* 6. Frequently Asked Questions */}
            <FaqSection />

            {/* 7. Contact Us Section */}
            <ContactSection
              preselectedProject={preselectedLeadProject}
            />
          </>
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onNavigateRoute={navigateTo}
      />

      {/* 4. Quick Enquiry Modal (opens on 'Enquire Now') */}
      {enquiryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEnquiryModalOpen(false);
            }
          }}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full my-auto shadow-2xl border border-slate-200 flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[min(90vh,760px)] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header with Title and Prominent, Easy-to-Tap Close Button */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-4 sm:px-6 sm:py-4.5 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0 flex-1 pr-2">
                <span className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-wider block">
                  Official Project Enquiry
                </span>
                <h3 id="enquiry-modal-title" className="text-base sm:text-lg font-bold text-slate-900 truncate">
                  {modalProjectName ? `Enquire: ${modalProjectName}` : 'Find Your Ideal Property in Neopolis'}
                </h3>
              </div>

              {/* Close Button: prominent tap target (40x40px), high contrast */}
              <button
                type="button"
                onClick={() => setEnquiryModalOpen(false)}
                aria-label="Close enquiry popup"
                className="shrink-0 w-10 h-10 text-slate-500 hover:text-slate-900 active:text-slate-950 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-full transition-colors cursor-pointer flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="overflow-y-auto overscroll-contain flex-1 p-4 sm:p-6">
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Please enter your details to receive developer price sheets, availability, and escorted site visit scheduling.
              </p>
              <PropertyEnquiryForm
                propertyName={modalProjectName}
                inModal={true}
                isCompact={true}
                onClose={() => setEnquiryModalOpen(false)}
                onSuccess={() => {
                  setEnquiryModalOpen(false);
                  navigateTo('/thank-you/');
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Rise By 9 Launching Soon Interactive Popup Modal */}
      <RiseBy9Modal
        isOpen={riseBy9ModalOpen}
        onClose={() => setRiseBy9ModalOpen(false)}
        onSuccess={() => {
          setRiseBy9ModalOpen(false);
          navigateTo('/thank-you/');
        }}
      />

      {/* 6. Mobile App-Style Fixed Bottom Navigation Bar */}
      {/* Permanently fixed across ALL pages in mobile view (always visible while scrolling) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3 md:hidden">
        <button
          onClick={() => navigateTo('/properties/')}
          className="flex-1 flex items-center justify-center py-3 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-xs"
        >
          <span>View Projects</span>
        </button>

        <button
          onClick={() => {
            if (selectedProject) {
              setModalProjectName(selectedProject.name);
              setEnquiryModalOpen(true);
            } else {
              handleOpenGeneralEnquiry();
            }
          }}
          className="flex-1 flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer"
        >
          <span>Enquire Now</span>
        </button>
      </div>
    </div>
  );
}

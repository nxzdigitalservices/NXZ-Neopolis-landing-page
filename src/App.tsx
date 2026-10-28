import React, { useState, useEffect, useCallback } from 'react';
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
import { NotFoundPage } from './components/NotFoundPage';
import { PropertyEnquiryForm } from './components/PropertyEnquiryForm';
import { RiseBy9Modal } from './components/RiseBy9Modal';
import { PROJECTS_DATA, ProjectData } from './data/projectsData';
import { getProjectBySlug, getProjectSlug } from './utils/slug';
import { getPageMetadata, updateDocumentSEO } from './utils/seo';
import { X } from 'lucide-react';

type RouteType = 'home' | 'properties' | 'project' | 'contact' | 'thank-you' | 'not-found';

interface ResolvedRoute {
  type: RouteType;
  pathname: string;
  project: ProjectData | null;
  requestedSlug?: string;
}

function resolveRouteFromPath(rawPathname: string): ResolvedRoute {
  let cleanPath = rawPathname.split('?')[0].split('#')[0].trim();
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  if (!cleanPath) cleanPath = '/';

  if (cleanPath === '/' || cleanPath === '') {
    return { type: 'home', pathname: '/', project: null };
  }
  if (cleanPath === '/properties') {
    return { type: 'properties', pathname: '/properties', project: null };
  }
  if (cleanPath === '/contact') {
    return { type: 'contact', pathname: '/contact', project: null };
  }
  if (cleanPath === '/thank-you') {
    return { type: 'thank-you', pathname: '/thank-you', project: null };
  }
  if (cleanPath.startsWith('/properties/')) {
    const slug = cleanPath.replace(/^\/properties\//, '');
    const project = getProjectBySlug(slug);
    if (project) {
      return { type: 'project', pathname: `/properties/${getProjectSlug(project)}`, project };
    } else {
      return { type: 'not-found', pathname: cleanPath, project: null, requestedSlug: slug };
    }
  }
  return { type: 'not-found', pathname: cleanPath, project: null, requestedSlug: cleanPath };
}

export default function App() {
  const [routeState, setRouteState] = useState<ResolvedRoute>(() => {
    const initialPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    return resolveRouteFromPath(initialPath);
  });

  const [preselectedLeadProject] = useState<string>('all');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalProjectName, setModalProjectName] = useState<string | undefined>(undefined);
  const [riseBy9ModalOpen, setRiseBy9ModalOpen] = useState(false);

  // Client-side navigation handler: updates history.pushState and updates UI state
  const navigateTo = useCallback((targetUrl: string, replace = false) => {
    let cleanPath = targetUrl.split('?')[0].split('#')[0].trim();
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }
    if (!cleanPath) cleanPath = '/';

    if (typeof window !== 'undefined') {
      if (replace) {
        window.history.replaceState({}, '', cleanPath);
      } else if (window.location.pathname !== cleanPath) {
        window.history.pushState({}, '', cleanPath);
      }
    }

    const resolved = resolveRouteFromPath(cleanPath);
    setRouteState(resolved);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for browser Back and Forward button events (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveRouteFromPath(window.location.pathname);
      setRouteState(resolved);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document head metadata, title, canonical link, and JSON-LD structured data on route changes
  useEffect(() => {
    const meta = getPageMetadata(routeState.pathname, routeState.project);
    updateDocumentSEO(meta);

    // Track SPA pageview in Google Analytics
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-DK9PN9M05H', {
        page_path: routeState.pathname,
        page_title: meta.title,
      });
    }
  }, [routeState.pathname, routeState.project]);

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

  const scrollToSection = (sectionId: string) => {
    if (routeState.type !== 'home') {
      navigateTo('/');
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
    navigateTo(`/properties/${getProjectSlug(project)}`);
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
    if (routeState.project) {
      setModalProjectName(routeState.project.name);
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
        isProjectDetailView={routeState.type !== 'home'}
        onBackToHome={() => navigateTo('/')}
      />

      {/* 2. Main Page Content with proper URL routing */}
      <main className="w-full overflow-x-hidden">
        {routeState.type === 'project' && routeState.project ? (
          /* Individual Property Page at /properties/:slug */
          <ProjectDetailPage
            project={routeState.project}
            onBackToHome={() => navigateTo('/')}
            onNavigateProperties={() => navigateTo('/properties')}
            onSelectProject={handleOpenProjectDetails}
          />
        ) : routeState.type === 'properties' ? (
          /* Properties Listing Archive Page at /properties */
          <PropertiesPage
            onSelectProject={handleOpenProjectDetails}
            onEnquireProject={handleEnquireProject}
            onNavigateHome={() => navigateTo('/')}
          />
        ) : routeState.type === 'contact' ? (
          /* Dedicated Contact Page at /contact */
          <ContactPage
            onNavigateHome={() => navigateTo('/')}
            onNavigateProperties={() => navigateTo('/properties')}
            preselectedProject={preselectedLeadProject}
          />
        ) : routeState.type === 'thank-you' ? (
          /* Dedicated Thank You Page at /thank-you */
          <ThankYouPage
            onNavigateHome={() => navigateTo('/')}
            onNavigateProperties={() => navigateTo('/properties')}
            onSelectProject={handleOpenProjectDetails}
          />
        ) : routeState.type === 'not-found' ? (
          /* 404 Not Found Page for invalid URLs */
          <NotFoundPage
            onNavigateHome={() => navigateTo('/')}
            onNavigateProperties={() => navigateTo('/properties')}
            onSelectProject={handleOpenProjectDetails}
            requestedSlug={routeState.requestedSlug}
          />
        ) : (
          /* Standalone Homepage at / */
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onExploreProjects={() => navigateTo('/properties')}
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
              onExploreProjects={() => navigateTo('/properties')}
            />

            {/* 4. Nearby Locations & Connectivity */}
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
                  navigateTo('/thank-you');
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
          navigateTo('/thank-you');
        }}
      />

      {/* 6. Mobile App-Style Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3 md:hidden">
        <button
          onClick={() => navigateTo('/properties')}
          className="flex-1 flex items-center justify-center py-3 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-xs"
        >
          <span>View Projects</span>
        </button>

        <button
          onClick={() => {
            if (routeState.project) {
              setModalProjectName(routeState.project.name);
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

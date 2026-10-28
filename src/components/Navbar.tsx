import React, { useState } from 'react';
import { Building2, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateRoute: (route: string) => void;
  isProjectDetailView?: boolean;
  onBackToHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnquiry,
  onNavigateSection,
  onNavigateRoute,
  isProjectDetailView = false,
  onBackToHome
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId === 'properties') {
      onNavigateRoute('/properties/');
    } else if (sectionId === 'contact') {
      onNavigateRoute('/contact/');
    } else {
      if (isProjectDetailView && onBackToHome) {
        onBackToHome();
        setTimeout(() => {
          onNavigateSection(sectionId);
        }, 100);
      } else {
        onNavigateSection(sectionId);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          {/* 1. Company Logo on the left */}
          <button
            onClick={() => onNavigateRoute('/')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-hidden cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                NEOPOLIS
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-blue-600 tracking-wider uppercase">
                Kokapet, Hyderabad
              </span>
            </div>
          </button>

          {/* 2. Minimal Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigateRoute('/')}
              className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateRoute('/properties/')}
              className="hover:text-blue-600 transition-colors py-1 cursor-pointer font-semibold text-slate-800"
            >
              Properties
            </button>
            <button
              onClick={() => handleLinkClick('why-invest')}
              className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
            >
              Why Invest
            </button>
            <button
              onClick={() => handleLinkClick('location')}
              className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
            >
              Location
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
            >
              About Neopolis
            </button>
            <button
              onClick={() => handleLinkClick('faqs')}
              className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
            >
              FAQs
            </button>
          </nav>

          {/* 3. Action Button: Prominent "Enquire Now" */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenEnquiry}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenEnquiry}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigateRoute('/'); }}
              className="text-left py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigateRoute('/properties/'); }}
              className="text-left py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors font-bold text-blue-700"
            >
              Properties in Neopolis
            </button>
            <button
              onClick={() => handleLinkClick('why-invest')}
              className="text-left py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Why Invest
            </button>
            <button
              onClick={() => handleLinkClick('location')}
              className="text-left py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Location &amp; Connectivity
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-left py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              About Neopolis, Kokapet
            </button>
            <button
              onClick={() => handleLinkClick('faqs')}
              className="text-left py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Frequently Asked Questions
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenEnquiry(); }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-xs transition-colors cursor-pointer"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

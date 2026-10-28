import React from 'react';
import { Building2, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onNavigateRoute: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onNavigateRoute }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* 1. Company Logo & Short Description */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <button
              onClick={() => onNavigateRoute('/')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-500 transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  NEOPOLIS
                </span>
                <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
                  Kokapet, Hyderabad
                </span>
              </div>
            </button>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              A premium residential real estate discovery portal showcasing iconic high-rise apartments and luxury developments in Neopolis, Kokapet, Hyderabad.
            </p>
          </div>

          {/* 2. Navigation & Contact Us */}
          <div className="md:col-span-3 lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigateRoute('/properties/')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Properties in Neopolis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('why-invest')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Why Invest in Neopolis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('location')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Location &amp; Connectivity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  About Neopolis, Kokapet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faqs')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateRoute('/contact/')}
                  className="hover:text-blue-400 transition-colors cursor-pointer font-medium text-blue-300"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Site Office & Advisory Details */}
          <div className="md:col-span-3 lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Office Address
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Sandhu Apartments, Mahatma Gandhi Rd, Tobacco Bazar, General Bazaar, Kalasiguda, Secunderabad, Telangana 500003</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Contact */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Neopolis Properties. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigateRoute('/contact/')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* RERA Legal Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed text-center sm:text-left">
          <p>
            Disclaimer: The information provided on this website is for informational and educational purposes only and does not constitute a legal offering or contract. Project details, specifications, floor plans, and pricing are subject to revision as per developer disclosures and Telangana RERA regulations. Please verify all details directly with the official developer sales team before making purchase decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

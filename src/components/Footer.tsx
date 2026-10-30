import React from 'react';
import { Building2, MapPin } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { getProjectSlug } from '../utils/slug';

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
          <div className="md:col-span-5 lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateRoute('/');
              }}
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
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              A premium residential real estate discovery portal showcasing iconic high-rise apartments and luxury developments in Neopolis, Kokapet, Hyderabad.
            </p>
          </div>

          {/* 2. Navigation & Quick Links */}
          <div className="md:col-span-3 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/properties"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateRoute('/properties');
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  All Properties
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('why-invest')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Why Invest
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('location')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  Location &amp; Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  About Neopolis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faqs')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  FAQs
                </button>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateRoute('/contact');
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer font-medium text-blue-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateRoute('/privacy-policy');
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Featured Properties Deep Links */}
          <div className="md:col-span-4 lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Featured Properties
            </h4>
            <ul className="space-y-2 text-xs">
              {PROJECTS_DATA.map((p) => {
                const slug = getProjectSlug(p);
                return (
                  <li key={p.id}>
                    <a
                      href={`/properties/${slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateRoute(`/properties/${slug}`);
                      }}
                      className="hover:text-blue-400 transition-colors cursor-pointer truncate block"
                      title={p.name}
                    >
                      {p.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 4. Site Office & Advisory Details */}
          <div className="md:col-span-12 lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Office Address
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Sandhu Apartments, Mahatma Gandhi Rd, General Bazaar, Secunderabad, Telangana 500003</span>
              </div>
              <div className="pt-2 text-slate-500">
                Operating Hours: 9:30 AM – 7:30 PM (7 Days a week)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Contact */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Neopolis Properties. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="/properties"
              onClick={(e) => {
                e.preventDefault();
                onNavigateRoute('/properties');
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Properties
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigateRoute('/contact');
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Contact Us
            </a>
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onNavigateRoute('/privacy-policy');
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Sitemap
            </a>
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

import React from 'react';
import { PropertyEnquiryForm } from './PropertyEnquiryForm';
import { Building2, MapPin, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
  preselectedProject?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onNavigateProperties,
  preselectedProject = 'all'
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 w-full pb-20">
      {/* 1. Header Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Direct Real Estate Advisory Desk</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Contact Neopolis Luxury Residences
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about pricing, unit availability, or scheduling a private site visit to Neopolis Kokapet? Reach out to our certified property advisors.
          </p>

          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={onNavigateProperties}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Properties
            </button>
            <span>/</span>
            <span className="text-blue-400 font-semibold">Contact Us</span>
          </div>
        </div>
      </div>

      {/* 2. Main Content Split: Info Left + Enquiry Form Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Details & Office Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Get In Touch
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our sales gallery is open 7 days a week. We provide verified developer cost sheets, comprehensive floor plan blueprints, and escorted site tours across all 7 Neopolis developments.
              </p>

              {/* Information Items */}
              <div className="pt-4 border-t border-slate-100 space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Address:</div>
                    <div>Sandhu Apartments, Mahatma Gandhi Rd, Tobacco Bazar, General Bazaar, Kalasiguda, Secunderabad, Telangana 500003</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Operating Hours:</div>
                    <div>Monday to Sunday: 9:30 AM – 7:30 PM IST</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">TS RERA Advisory:</div>
                    <div>Only marketing official RERA registered and verified developments.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Property Enquiry Form connected to Google Sheets */}
          <div className="lg:col-span-7">
            <PropertyEnquiryForm
              propertyName={preselectedProject !== 'all' ? preselectedProject : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

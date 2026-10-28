import React from 'react';
import { Shield, Clock, MapPin } from 'lucide-react';
import { PropertyEnquiryForm } from './PropertyEnquiryForm';

interface ContactSectionProps {
  preselectedProject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedProject }) => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Advisory Context & Instant Contact Options */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 tracking-wider uppercase mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Private Advisory & Site Visits</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
                Find Your Ideal Property in Neopolis
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
                Connect directly with our dedicated Kokapet real estate consultants to receive verified developer brochures, unit availability, and schedule an escorted site tour.
              </p>
            </div>

            {/* Private Consultation Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200">
                <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">Direct Advisor Desk</div>
                <div className="text-sm font-semibold text-slate-800 mt-1">Dedicated Neopolis Property Specialists</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Site Visits & Tours</div>
                <div className="text-sm font-semibold text-slate-800 mt-1">Escorted Experience Center Visits</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <span>100% TS RERA registered developments with verified developer pricing</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Rapid response within 15 minutes during business hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Property Enquiry Form */}
          <div className="lg:col-span-7">
            <PropertyEnquiryForm
              propertyName={preselectedProject !== 'all' ? preselectedProject : undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

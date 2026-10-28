import React, { useEffect } from 'react';
import { CheckCircle2, Building2, Phone, MessageSquare, ArrowRight, Home, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { PROJECTS_DATA, ProjectData } from '../data/projectsData';

interface ThankYouPageProps {
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
  onSelectProject: (project: ProjectData) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  onNavigateHome,
  onNavigateProperties,
  onSelectProject
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 w-full pb-20">
      {/* 1. Header Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          {/* Success Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Enquiry Successfully Received</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Thank You for Your Form Submission!
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Thank you for your form submission, we will get back to you soon. A dedicated Neopolis luxury property advisor is reviewing your request.
          </p>

          {/* Quick Breadcrumbs */}
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
            <span className="text-emerald-400 font-semibold">Thank You</span>
          </div>
        </div>
      </div>

      {/* 2. Main Content Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
          {/* Status Alert Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                Your enquiry has been securely logged with our advisory team.
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                You will receive a call or WhatsApp message within 15 to 30 minutes during standard business hours with official developer cost sheets and floor plans.
              </p>
            </div>
          </div>

          {/* What to Expect Next (3 Steps) */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>What Happens Next?</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center">
                  1
                </div>
                <h4 className="text-sm font-bold text-slate-900">Direct Consultation</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our certified advisor will connect with you to understand your configuration requirements (3 BHK, 4 BHK, or Sky Villa) and preferred tower orientation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center">
                  2
                </div>
                <h4 className="text-sm font-bold text-slate-900">Cost Sheets &amp; Floor Plans</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You will receive verified developer price lists, current floor-rise charges, parking allocations, and the 20:20:20:20:20 payment breakdown.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center">
                  3
                </div>
                <h4 className="text-sm font-bold text-slate-900">VIP Site Visit</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We schedule an escorted visit to the Neopolis site and developer experience center at your preferred date and time.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onNavigateProperties}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Explore All Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateHome}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-semibold text-sm transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>

            {/* Instant Contact Options */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <a
                href="https://api.whatsapp.com/send?phone=919876543210&text=Hi%2C%20I%20just%20submitted%20an%20enquiry%20for%20Neopolis%20properties%20and%20would%20like%20more%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Advisory</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Featured Portfolio Preview while waiting */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Featured Residential Developments</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Explore iconic high-rise towers in Neopolis while you wait.</p>
            </div>
            <button
              onClick={onNavigateProperties}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              View All ({PROJECTS_DATA.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-blue-600 text-white shadow-xs">
                    {project.statusBadge}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {project.propertyType} · {project.location}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="font-semibold text-slate-600">{project.configurations.join(', ')}</span>
                    <span className="font-extrabold text-blue-700">{project.startingPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

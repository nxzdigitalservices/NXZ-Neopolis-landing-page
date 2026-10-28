import React from 'react';
import { Building, ShieldCheck, Trees, Compass, CheckCircle2 } from 'lucide-react';

export const AboutNeopolisSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 tracking-wider uppercase mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Master-Planned Micro-Market</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            About Neopolis, Kokapet
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Spanning over 530 prime acres in western Hyderabad, Neopolis at Kokapet is Telangana’s flagship urban transformation project designed to redefine luxury residential living and high-density commercial growth.
          </p>
        </div>

        {/* 2-Column Split: Deep SEO-Friendly Narrative + Key Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Comprehensive Editorial Content */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-base">
            <p>
              Envisioned by the Hyderabad Metropolitan Development Authority (HMDA), <strong>Neopolis Kokapet</strong> represents an unprecedented leap in urban engineering. Unlike organic city expansions, Neopolis has been planned with wide 45-meter (150-foot) 8-lane boulevards, a 100% subterranean utility corridor, dedicated cycling lanes, and grade-separated trumpet interchanges linking directly to the Outer Ring Road (ORR).
            </p>

            <p>
              The micro-market has quickly established itself as the crown jewel of Hyderabad’s luxury residential corridor. Premium developments here boast heights ranging from 37 to 57 storeys, developed by premier national real estate conglomerates including <strong>Sattva Group</strong>, <strong>Brigade Group</strong>, and <strong>Godrej Properties</strong>.
            </p>

            <p>
              Surrounded by natural ecological buffer zones near the Osman Sagar and Gandipet lake catchments, residents enjoy cooler micro-climates, unhindered lake breezes, and permanent green vistas—all while living merely five minutes away from Microsoft, Google, Amazon, and Salesforce corporate campuses in the Financial District.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">100% Subterranean Utilities & Telecom</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">Direct Kokapet Trumpet Flyover (ORR Exit 1)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">50+ Storey Architectural Landmarks</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">High Long-Term Capital Appreciation</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Key Pillars Bento Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Elite Developers</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Flagship master developments by Sattva, Brigade, and Godrej with institutional architectural rigor.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">World-Class Roads</h3>
              <p className="text-xs text-slate-600 leading-normal">
                45-meter wide 8-lane road grid eliminates traffic bottlenecks with pedestrian boulevards.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Zero Clutter Grid</h3>
              <p className="text-xs text-slate-600 leading-normal">
                No overhead electric wires or cables; all utility lines are tucked safely beneath wide pavements.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Lake Horizons</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Permanent scenic catchments of Gandipet and Osman Sagar ensuring pristine airflow and views.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Building2, School, Hospital, 
  Plane, Clock, MapPin, Compass, Car, Train, Navigation, ShieldCheck, ArrowRight
} from 'lucide-react';
import { CONNECTIVITY_DESTINATIONS } from '../data/projectsData';

export const ConnectivitySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (category: string) => {
    if (category.includes('IT')) return <Building2 className="w-5 h-5 text-blue-600" />;
    if (category.includes('School')) return <School className="w-5 h-5 text-blue-600" />;
    if (category.includes('Hospital')) return <Hospital className="w-5 h-5 text-blue-600" />;
    return <Plane className="w-5 h-5 text-blue-600" />;
  };

  const categories = [
    { id: 'all', label: 'All Destinations' },
    ...CONNECTIVITY_DESTINATIONS.map(c => ({ id: c.category, label: c.category }))
  ];

  const displayedDestinations = selectedCategory === 'all'
    ? CONNECTIVITY_DESTINATIONS
    : CONNECTIVITY_DESTINATIONS.filter(c => c.category === selectedCategory);

  return (
    <section id="location" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 tracking-wider uppercase mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Strategic Location & Travel Times</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            Excellent Connectivity & Nearby Destinations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Strategically located at the intersection of Kokapet and the Financial District with direct 8-lane Outer Ring Road signal-free connectivity to major work, education, and entertainment hubs.
          </p>
        </div>

        {/* 1. Quick Travel Time Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">5 Mins</div>
            <div className="text-sm font-bold text-slate-900 mt-1">Financial District</div>
            <div className="text-xs text-slate-500 mt-0.5">3.2 km · Amazon, Apple, Microsoft</div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Car className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">2 Mins</div>
            <div className="text-sm font-bold text-slate-900 mt-1">Kokapet Trumpet ORR</div>
            <div className="text-xs text-slate-500 mt-0.5">0.8 km · Direct Exit 1 Access</div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Train className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">12 Mins</div>
            <div className="text-sm font-bold text-slate-900 mt-1">HITEC City</div>
            <div className="text-xs text-slate-500 mt-0.5">8.5 km · Cyber Towers & Metro</div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Plane className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">22 Mins</div>
            <div className="text-sm font-bold text-slate-900 mt-1">RGIA Airport</div>
            <div className="text-xs text-slate-500 mt-0.5">24 km · Signal-free ORR Corridor</div>
          </div>
        </div>

        {/* 2. Category Filter Controls */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Comprehensive Destinations Grid (Clean Cards, No Map) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {displayedDestinations.map((categoryGroup) => (
            <div
              key={categoryGroup.category}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  {getCategoryIcon(categoryGroup.category)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {categoryGroup.category}
                  </h3>
                  <span className="text-xs text-slate-500">Key proximate landmarks</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {categoryGroup.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 hover:bg-blue-50/40 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate" title={item.name}>
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Distance: <span className="font-medium text-slate-700">{item.distance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold shrink-0">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{item.travelTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 4. Infrastructure Highlights Card */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-800/40">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Future-Ready Urban Engineering
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Why Neopolis Kokapet Offers Hyderabad’s Most Seamless Commute
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Designed from scratch by HMDA, Neopolis eliminates traffic bottlenecks through master-planned road grids and direct expressway connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs">
              <div className="text-blue-400 font-extrabold text-lg mb-1">45-Meter Boulevards</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                150-ft wide 8-lane arterial sector roads with dedicated bicycle lanes and wide pedestrian walkways.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs">
              <div className="text-blue-400 font-extrabold text-lg mb-1">Trumpet Interchange</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Direct grade-separated trumpet flyover connects directly to ORR Exit 1 with zero traffic signals.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs">
              <div className="text-blue-400 font-extrabold text-lg mb-1">Subterranean Ducts</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                100% underground utility corridors ensuring no overhead cables, zero trench digging, and clean streets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

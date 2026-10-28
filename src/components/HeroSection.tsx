import React from 'react';
import { ArrowDown, Building, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onOpenEnquiry
}) => {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-slate-900 text-white">
      {/* Background Architectural Real Estate Image with White & Blue Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85"
          alt="Properties in Neopolis, Kokapet, Hyderabad"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Clean white & royal blue gradient overlay for exceptional legibility and modern luxury aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-950/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-blue-950/30 to-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 flex flex-col items-start justify-center min-h-[640px] lg:min-h-[720px]">
        {/* Top Tagline / Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-semibold tracking-wide mb-6 backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span>KOKAPET, HYDERABAD · TS RERA REGISTERED</span>
        </div>

        {/* Main Heading as requested */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6 text-balance">
          Properties in <span className="text-blue-400">Neopolis</span>, Kokapet
        </h1>

        {/* Subtitle as requested */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          Explore premium apartments and luxury residences in one of Hyderabad’s most sought-after investment destinations.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onExploreProjects}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenEnquiry}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-semibold rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Enquire Now
          </button>
        </div>

        {/* Value Highlights Strip */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/15">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">7 Projects</div>
              <div className="text-xs sm:text-sm text-slate-300">Curated Neopolis Portfolio</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">3, 4 & 5 BHK</div>
              <div className="text-xs sm:text-sm text-slate-300">Large-Format Sky Residences</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">₹2.95 Cr*</div>
              <div className="text-xs sm:text-sm text-slate-300">Starting Investment Prices</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">~5 Mins</div>
              <div className="text-xs sm:text-sm text-slate-300">To Financial District</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

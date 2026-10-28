import React from 'react';
import { 
  Building2, TrendingUp, Sparkles, Globe, 
  ShieldCheck, Compass, ArrowUpRight 
} from 'lucide-react';
import { WHY_INVEST_NEOPOLIS } from '../data/projectsData';

interface WhyInvestSectionProps {
  onExploreProjects: () => void;
}

export const WhyInvestSection: React.FC<WhyInvestSectionProps> = ({ onExploreProjects }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-blue-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'Globe':
      default:
        return <Globe className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="why-invest" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 tracking-wider uppercase mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Investment Outlook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            Why Is Neopolis the Best Place to Invest?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            A 530+ acre master-planned urban transformation delivering high-density luxury living, global corporate adjacency, and unparalleled long-term capital growth.
          </p>
        </div>

        {/* 6 Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_INVEST_NEOPOLIS.map((benefit) => (
            <div
              key={benefit.id}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {getIcon(benefit.iconName)}
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-md">
                    {benefit.metric}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Growth Catalyst</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold">Looking to invest in high-yield luxury real estate?</h4>
            <p className="text-slate-300 text-sm mt-1">
              Connect with our property specialists for institutional insights, rental yield projections, and developer payment schemes.
            </p>
          </div>
          <button
            onClick={onExploreProjects}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Explore Featured Projects
          </button>
        </div>
      </div>
    </section>
  );
};

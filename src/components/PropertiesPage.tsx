import React, { useState } from 'react';
import { ProjectData, PROJECTS_DATA } from '../data/projectsData';
import { 
  Building2, MapPin, ArrowRight, Check, Sparkles, 
  Layers, Phone, MessageSquare, ExternalLink, Filter 
} from 'lucide-react';

interface PropertiesPageProps {
  onSelectProject: (project: ProjectData) => void;
  onEnquireProject: (project: ProjectData) => void;
  onNavigateHome: () => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  onSelectProject,
  onEnquireProject,
  onNavigateHome
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ready' | 'upcoming'>('all');

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (activeFilter === 'ready') return p.isDetailed;
    if (activeFilter === 'upcoming') return !p.isDetailed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 w-full pb-20">
      {/* 1. Archive Hero Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Neopolis Residential Portfolio · TS RERA Approved</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Properties in Neopolis, Kokapet
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover {PROJECTS_DATA.length} premier high-rise residential towers and luxury developments in Neopolis, Kokapet. Click any project card to view floor plans, pricing sheets, and master specifications.
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
            <span className="text-blue-400 font-semibold">Properties (/properties/)</span>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar & Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 self-start md:self-auto">
            <Filter className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Filter By Status:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Projects ({PROJECTS_DATA.length})
            </button>
            <button
              onClick={() => setActiveFilter('ready')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'ready'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Detailed Projects ({PROJECTS_DATA.filter(p => p.isDetailed).length})
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'upcoming'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Launching Soon ({PROJECTS_DATA.filter(p => !p.isDetailed).length})
            </button>
          </div>

          <div className="hidden lg:block text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{filteredProjects.length}</span> of {PROJECTS_DATA.length} projects
          </div>
        </div>
      </div>

      {/* 3. Manageable Property Cards Grid (Responsive 3-Column Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Status Badge */}
              <div
                className="relative aspect-16/10 overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm ${
                    project.statusType === 'featured'
                      ? 'bg-blue-600 text-white'
                      : project.statusType === 'premium'
                      ? 'bg-indigo-600 text-white'
                      : project.statusType === 'upcoming'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-800 text-white'
                  }`}>
                    {project.statusBadge}
                  </span>
                </div>

                {/* Developer Tag Top Right */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                    {project.developerName}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-white/20 backdrop-blur-xs font-semibold">
                    {project.propertyType}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {project.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {project.headline}
                  </p>

                  {/* Pricing & Key Specs Strip */}
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                        Starting Price
                      </span>
                      <span className="text-base font-extrabold text-blue-700 block">
                        {project.startingPrice}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                        Configurations
                      </span>
                      <span className="text-xs font-bold text-slate-800 block truncate">
                        {project.configurations.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Size & Possession Tags */}
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Sizes: <strong className="text-slate-700">{project.areaRange}</strong></span>
                    <span>Possession: <strong className="text-slate-700">{project.possessionYear}</strong></span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className={`w-full py-2.5 px-3 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                      project.id === 'rise-by-9'
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <span>{project.id === 'rise-by-9' ? 'Launching Soon' : 'View Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onEnquireProject(project)}
                    className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

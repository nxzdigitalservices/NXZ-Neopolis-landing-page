import React, { useState } from 'react';
import { ProjectData } from '../data/projectsData';
import { MapPin, Building, ArrowRight, Check, Home, Shield, Sparkles } from 'lucide-react';

interface FeaturedProjectsSectionProps {
  projects: ProjectData[];
  onSelectProjectDetails: (project: ProjectData) => void;
  onEnquireProject: (project: ProjectData) => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  projects,
  onSelectProjectDetails,
  onEnquireProject
}) => {
  const [filter, setFilter] = useState<'all' | 'ready' | 'upcoming'>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const filteredProjects = projects.filter(p => {
    if (filter === 'ready') return p.isDetailed;
    if (filter === 'upcoming') return !p.isDetailed;
    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Residential Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Explore Properties in Neopolis
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl">
              Discover iconic high-rise residential developments in Kokapet, Hyderabad. Click any project to view complete floor plans, pricing sheets, and master amenities.
            </p>
          </div>

          {/* Clean Segmented Filter Controls */}
          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-xs self-start md:self-auto overflow-x-auto max-w-full shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('ready')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === 'ready'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Detailed Projects ({projects.filter(p => p.isDetailed).length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === 'upcoming'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Launching Soon ({projects.filter(p => !p.isDetailed).length})
            </button>
          </div>
        </div>

        {/* Responsive Grid Layout: 3 Columns Desktop, 2 Tablet, 1 Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const hasImgError = imageErrors[project.id];

            return (
              <div
                key={project.id}
                onClick={() => onSelectProjectDetails(project)}
                className="group relative bg-white border border-slate-200 hover:border-blue-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-blue-600"
              >
                {/* 1. Project Image Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                  {!hasImgError ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt || project.name}
                      onError={() => handleImageError(project.id)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 text-center">
                      <Building className="w-12 h-12 text-blue-400 mb-2" />
                      <span className="font-bold text-lg">{project.name}</span>
                      <span className="text-xs text-blue-200 mt-1">Kokapet, Hyderabad</span>
                    </div>
                  )}

                  {/* Gradient scrim for badge clarity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold tracking-wide uppercase shadow-sm ${
                        project.statusType === 'featured'
                          ? 'bg-blue-600 text-white'
                          : project.statusType === 'premium'
                          ? 'bg-indigo-600 text-white'
                          : project.statusType === 'landmark'
                          ? 'bg-slate-900 text-white'
                          : project.statusType === 'prelaunch'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Starting Price Overlay on Image */}
                  <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                    <div className="text-[10px] uppercase font-semibold text-slate-500 leading-none">Starting from</div>
                    <div className="text-base font-extrabold text-blue-700 leading-tight tabular-nums">{project.startingPrice}</div>
                  </div>
                </div>

                {/* 2. Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location & Property Type */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <div className="flex items-center gap-1.5 font-medium text-slate-600 truncate">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <span className="font-semibold text-blue-600 shrink-0 ml-2">
                        {project.isDetailed ? 'Verified Details' : 'Launching Soon'}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                      {project.name}
                    </h3>

                    {/* Property Type description */}
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4">
                      {project.propertyType}
                    </p>

                    {/* Specifications Grid: Configuration & Area */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 mb-5">
                      <div className="flex items-start gap-2">
                        <Home className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[11px] font-semibold text-slate-400 uppercase">Config</div>
                          <div className="text-xs font-bold text-slate-800">
                            {project.configurations.join(', ')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Building className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[11px] font-semibold text-slate-400 uppercase">Area Range</div>
                          <div className="text-xs font-bold text-slate-800 truncate" title={project.areaRange}>
                            {project.areaRange}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Project Highlights */}
                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Key Highlights:
                      </div>
                      <ul className="space-y-1.5">
                        {project.keyHighlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions: View Project Details & Quick Enquire */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProjectDetails(project);
                      }}
                      className={`flex-1 py-3 px-4 text-white text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        project.id === 'rise-by-9'
                          ? 'bg-amber-600 hover:bg-amber-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      <span>{project.id === 'rise-by-9' ? 'Launching Soon · Register' : 'View Project Details'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnquireProject(project);
                      }}
                      className="py-3 px-4 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                      title="Enquire directly about this project"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

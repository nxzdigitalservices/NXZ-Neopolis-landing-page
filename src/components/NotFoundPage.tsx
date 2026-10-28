import React from 'react';
import { Building2, ArrowRight, Home, Compass } from 'lucide-react';
import { PROJECTS_DATA, ProjectData } from '../data/projectsData';
import { getProjectSlug } from '../utils/slug';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
  onSelectProject: (project: ProjectData) => void;
  requestedSlug?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onNavigateProperties,
  onSelectProject,
  requestedSlug,
}) => {
  const suggestedProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 w-full pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>404   Location Not Found</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {requestedSlug ? 'Property Not Found' : 'Page Not Found'}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {requestedSlug ? (
              <>
                The property slug <code className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 text-sm font-mono">{requestedSlug}</code> is not listed in our verified Neopolis portfolio.
              </>
            ) : (
              'The page you are looking for has been moved, renamed, or does not exist.'
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={onNavigateProperties}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Browse All Neopolis Properties</span>
            </button>
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Featured Real Estate in Neopolis</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Explore active luxury residential towers in Kokapet:</p>
            </div>
            <button
              onClick={onNavigateProperties}
              className="text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({PROJECTS_DATA.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-600 text-white">
                    {project.statusBadge}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {project.propertyType} • {project.location}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="font-semibold text-slate-700">{project.configurations.join(', ')}</span>
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

import React, { useState, useEffect } from 'react';
import { ProjectData, PROJECTS_DATA } from '../data/projectsData';
import { 
  MapPin, Building, ShieldCheck, Check, 
  Sparkles, Layers, CreditCard, ChevronLeft, ChevronRight
} from 'lucide-react';
import { PropertyEnquiryForm } from './PropertyEnquiryForm';

interface ProjectDetailPageProps {
  project: ProjectData;
  onBackToHome: () => void;
  onNavigateProperties?: () => void;
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBackToHome,
  onNavigateProperties,
  onSelectProject
}) => {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [slideTimerKey, setSlideTimerKey] = useState<number>(0);
  const [activePlanIndex, setActivePlanIndex] = useState<number>(0);

  // Reset slide index whenever project changes
  useEffect(() => {
    setActiveSlideIndex(0);
  }, [project.id]);

  // Slideshow timer: advances every 3 seconds; after the 5th image (last image), loops back to image 1
  useEffect(() => {
    if (gallery.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSlideIndex((prevIndex) => (prevIndex + 1) % gallery.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [gallery.length, project.id, slideTimerKey]);

  const goToSlide = (index: number) => {
    setActiveSlideIndex(index);
    setSlideTimerKey((k) => k + 1); // restarts the 3-second cycle cleanly
  };

  const handleNextSlide = () => {
    goToSlide((activeSlideIndex + 1) % gallery.length);
  };

  const handlePrevSlide = () => {
    goToSlide((activeSlideIndex - 1 + gallery.length) % gallery.length);
  };

  const floorPlans = project.floorPlans || [];
  const currentPlan = floorPlans[activePlanIndex] || floorPlans[0];
  const otherProjects = PROJECTS_DATA.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 w-full pb-28 md:pb-20">
      {/* Main Layout Container: Full-width single column in both mobile & desktop view */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 space-y-8 sm:space-y-12">
        
        {/* Breadcrumb Navigation for SEO & Context */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button
            onClick={onBackToHome}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={onNavigateProperties || onBackToHome}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Properties
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs sm:max-w-md">{project.name}</span>
        </nav>

        {/* 1. Header Metadata & Quick Facts */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold uppercase tracking-wide bg-blue-600 text-white">
              {project.statusBadge}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-semibold bg-slate-100 text-slate-700">
              {project.propertyType}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-semibold bg-blue-50 text-blue-700">
              RERA: {project.reraNumber}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight break-words">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-slate-600 text-xs sm:text-sm mt-2">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
              <span>{project.location}</span>
              <span className="text-slate-300">·</span>
              <span className="font-medium text-slate-700">By {project.developerName}</span>
            </div>
          </div>

          {/* Key Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase">Starting Price</div>
              <div className="text-base sm:text-lg font-extrabold text-blue-700 tabular-nums truncate">{project.startingPrice}</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase">Configurations</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">{project.configurations.join(', ')}</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase">Size Range</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">{project.areaRange}</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase">Possession</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">{project.possessionYear}</div>
            </div>
          </div>
        </div>

        {/* 2. PROJECT IMAGES SLIDESHOW: Changes every 3 seconds, loops 1 to 5 to 1, Positioned ABOVE Description */}
        <div className="space-y-3">
          {/* Main Slideshow Frame */}
          <div className="aspect-16/10 sm:aspect-21/9 w-full rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-200 relative group select-none">
            {/* Stacked Images for Seamless Crossfade Transitions */}
            {gallery.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`${project.name} - Slide ${idx + 1}`}
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                  idx === activeSlideIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 pointer-events-none'
                }`}
              />
            ))}

            {/* Left Navigation Arrow */}
            {gallery.length > 1 && (
              <button
                onClick={handlePrevSlide}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-lg hover:scale-110 cursor-pointer border border-white/20"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Right Navigation Arrow */}
            {gallery.length > 1 && (
              <button
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-lg hover:scale-110 cursor-pointer border border-white/20"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Top Badge: Slide Counter & 3s Loop Status */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
              <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2 border border-white/10 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Image {activeSlideIndex + 1} of {gallery.length}</span>
                <span className="text-slate-400 text-[10px] hidden sm:inline">· 3s Loop</span>
              </div>
            </div>

            {/* Bottom Center Indicator Dots */}
            {gallery.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeSlideIndex
                        ? 'w-7 bg-blue-500 shadow-xs shadow-blue-500/50'
                        : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 5 Clickable Thumbnails with Active Outline (All 5 project images) */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Switch to ${project.name} image ${i + 1}`}
                  className={`relative aspect-16/10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeSlideIndex === i 
                      ? 'border-blue-600 scale-95 shadow-md ring-2 ring-blue-500/40 opacity-100' 
                      : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
                  }`}
                >
                  <img src={imgUrl} alt={`${project.name} View ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute top-1 left-1.5 bg-slate-950/70 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {i + 1}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Detailed Project Description (Positioned directly BELOW the images as requested) */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Project Overview &amp; Description</span>
          </div>
          {project.headline && (
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {project.headline}
            </h2>
          )}
          <div className="space-y-3 pt-1">
            {project.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>

        {/* 4. Key Highlights & Specifications Table */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Project Highlights</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {project.keyHighlights.map((hl, index) => (
              <div key={index} className="flex items-start gap-2.5 sm:gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{hl}</span>
              </div>
            ))}
          </div>

          {/* Specifications Table */}
          <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">Detailed Project Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.keySpecs.map((spec, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase">{spec.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Apartment Configurations & Layouts Section */}
        {floorPlans.length > 0 ? (
          <div id="floor-plans" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>Apartment Configurations &amp; Layouts</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Select a configuration to view room dimensions, areas, and floor plan blueprint details.
                </p>
              </div>

              {/* Configuration Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto overflow-x-auto max-w-full">
                {floorPlans.map((plan, idx) => (
                  <button
                    key={plan.id}
                    onClick={() => setActivePlanIndex(idx)}
                    className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activePlanIndex === idx
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {plan.bhk}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Floor Plan Details */}
            {currentPlan && (
              <div className="space-y-6">
                {/* Header info for selected configuration */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold text-slate-900">{currentPlan.name}</div>
                    <div className="text-xs text-slate-500">Super Built-Up Area: <span className="font-semibold text-slate-800">{currentPlan.superBuiltUpArea}</span></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 font-medium">Bedrooms: {currentPlan.bedrooms}</span>
                    <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 font-medium">Baths: {currentPlan.bathrooms}</span>
                    <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 font-medium">Facing: {currentPlan.facing}</span>
                  </div>
                </div>

                {/* Room Dimensions Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 font-bold text-xs uppercase text-slate-700">
                    Room Dimensions &amp; Key Layout Areas
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3.5">Zone</th>
                          <th className="py-2.5 px-3.5">Dimensions (ft)</th>
                          <th className="py-2.5 px-3.5">Flooring / Finish</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-900">Grand Living &amp; Dining</td>
                          <td className="py-2.5 px-3.5 font-mono">{currentPlan.roomDimensions.livingDining}</td>
                          <td className="py-2.5 px-3.5">Imported Marble / Premium Vitrified</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-900">Master Bedroom Suite</td>
                          <td className="py-2.5 px-3.5 font-mono">{currentPlan.roomDimensions.masterBedroom}</td>
                          <td className="py-2.5 px-3.5">Laminated Wooden Flooring / Marble</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-900">Bedroom 2</td>
                          <td className="py-2.5 px-3.5 font-mono">{currentPlan.roomDimensions.bedroom2}</td>
                          <td className="py-2.5 px-3.5">Large Format Vitrified Tiles</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-900">Bedroom 3</td>
                          <td className="py-2.5 px-3.5 font-mono">{currentPlan.roomDimensions.bedroom3}</td>
                          <td className="py-2.5 px-3.5">Large Format Vitrified Tiles</td>
                        </tr>
                        {currentPlan.roomDimensions.bedroom4 && (
                          <tr>
                            <td className="py-2.5 px-3.5 font-semibold text-slate-900">Bedroom 4</td>
                            <td className="py-2.5 px-3.5 font-mono">{currentPlan.roomDimensions.bedroom4}</td>
                            <td className="py-2.5 px-3.5">Vitrified Tiles</td>
                          </tr>
                        )}
                        <tr>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-900">Gourmet Kitchen</td>
                          <td className="py-2.5 px-3.5 font-mono">{currentPlan.roomDimensions.kitchen}</td>
                          <td className="py-2.5 px-3.5">Granite Platform with Anti-Skid Ceramic</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-900">Viewing Balconies</td>
                          <td className="py-2.5 px-3.5 font-mono">{currentPlan.roomDimensions.balconies}</td>
                          <td className="py-2.5 px-3.5">Wood-Finish Exterior Anti-Skid Tiles</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center">
            <Building className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-slate-900">Floor Plans Announcement</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
              Official architectural floor plans and brochure for {project.name} will be released shortly. Register below to receive the priority launch kit.
            </p>
          </div>
        )}

        {/* 6. Master Amenities */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Amenities &amp; Lifestyle Facilities</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {project.amenities.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-blue-600">{item.category}</span>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Official Pricing Structure & Cost Sheets */}
        {project.pricingBreakdown && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>Official Cost Sheets &amp; Pricing Structure</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Developer base pricing and standard charges for {project.name}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.pricingBreakdown.towerA && (
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">
                      {project.pricingBreakdown.towerA.title}
                    </span>
                    {project.pricingBreakdown.towerA.ceilingHeight && (
                      <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                        Height: {project.pricingBreakdown.towerA.ceilingHeight}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Base Price:</span>
                      <span className="font-bold text-slate-900">{project.pricingBreakdown.towerA.basePrice}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Floor Rise:</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerA.floorRise}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Facing Premium:</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerA.facingPremium}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Corner Premium:</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerA.cornerPremium}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Amenities:</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerA.amenities}</span>
                    </div>
                    {project.pricingBreakdown.towerA.ac && (
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">AC Charges:</span>
                        <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerA.ac}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Car Parking (Lump Sum):</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerA.carParking}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-bold text-slate-700">Indicative Range:</span>
                      <span className="font-extrabold text-blue-700">{project.pricingBreakdown.towerA.range}</span>
                    </div>
                  </div>
                </div>
              )}

              {project.pricingBreakdown.towerBC && (
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">
                      {project.pricingBreakdown.towerBC.title}
                    </span>
                    {project.pricingBreakdown.towerBC.ceilingHeight && (
                      <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                        Height: {project.pricingBreakdown.towerBC.ceilingHeight}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Base Price:</span>
                      <span className="font-bold text-slate-900">{project.pricingBreakdown.towerBC.basePrice}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Floor Rise:</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerBC.floorRise}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Facing Premium:</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerBC.facingPremium}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Corner Premium:</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerBC.cornerPremium}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Amenities:</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerBC.amenities}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Car Parking (Lump Sum):</span>
                      <span className="font-semibold text-slate-800">{project.pricingBreakdown.towerBC.carParking}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-bold text-slate-700">Indicative Range:</span>
                      <span className="font-extrabold text-blue-700">{project.pricingBreakdown.towerBC.range}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 8. Payment Schedule Card */}
        {project.paymentPlan && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">{project.paymentPlan.scheme}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.paymentPlan.details}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {project.paymentPlan.instalments.map((inst, i) => (
                <div key={i} className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-blue-700 uppercase">Instalment {i + 1}</span>
                  <div className="text-xl font-black text-blue-900 my-1">{inst.percentage}</div>
                  <span className="text-[11px] text-slate-600 font-medium leading-tight">{inst.milestone}</span>
                </div>
              ))}
            </div>

            {project.paymentPlan.notes && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                ⚡ {project.paymentPlan.notes}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 9. HORIZONTAL ENQUIRY FORM: Below images and ABOVE "Explore More Neopolis Properties" */}
        {/* Neat, simple, professional horizontal form in both mobile view & desktop view */}
        {/* ========================================================================= */}
        <div id="enquiry-form-section" className="pt-2">
          <PropertyEnquiryForm
            propertyName={project.name}
            propertyLocation={project.location}
            layout="horizontal"
          />
        </div>

        {/* ========================================================================= */}
        {/* 10. Explore More Neopolis Properties */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Explore More Neopolis Properties</h3>
              <p className="text-sm text-slate-500 mt-0.5">Compare other premium residential towers in Kokapet.</p>
            </div>
            <button
              onClick={onNavigateProperties || onBackToHome}
              className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              View All {PROJECTS_DATA.length} Projects →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProject(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">{p.statusBadge}</span>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                    {p.name}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1">{p.configurations.join(', ')}</div>
                  <div className="text-sm font-extrabold text-blue-700 mt-2">{p.startingPrice}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

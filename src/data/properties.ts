import { Property, LocationLandmark } from '../types';

export const PROPERTIES: Property[] = [
  {
    id: 'brigade-barcelona',
    name: 'Brigade Barcelona',
    developer: 'Brigade Group',
    tagline: 'Spanish Architectural Grandeur in Neopolis Phase III',
    location: 'Neopolis Phase III, Kokapet, Hyderabad',
    subLocation: 'Kokapet Golden Triangle',
    coordinates: [17.4068, 78.3341],
    landArea: 'Approximately 4.04 Acres',
    towers: 'T-Shaped Iconic Mono Tower',
    floors: '52 Floors (2 Basements + 5 Podium Levels)',
    totalUnits: '666 Ultra-Luxury Residences',
    configurations: ['3 BHK', '3.5 BHK', '4 BHK'],
    sizeRange: '2,790 – 3,764 sq. ft. super built-up area',
    amenitiesArea: 'Approx 1.5 Lakh sq. ft. (150,000 sq. ft.)',
    possession: 'July 2032',
    priceStarting: '₹ 4.18 Cr* onwards',
    pricePerSqft: '₹ 14,999 / sq. ft.',
    reraStatus: 'RERA Registered & Approved',
    architecturalStyle: 'Spanish Contemporary Renaissance',
    summary: 'Inspired by authentic Spanish architectural elegance, Brigade Barcelona blends contemporary structural design, expansive palatial residences, and upscale lifestyle amenities across 52 grand storeys.',
    keyHighlights: [
      'Iconic 52-storey T-shaped single mono tower with panoramic 360° horizon views',
      'Massive 1.5 Lakh sq. ft. clubhouse featuring international club and sky lounges',
      'Lavish 2,790 to 3,764 sq. ft. super built-up residences with bespoke double-height balconies',
      'Exclusive 5 podium levels dedicated to pedestrian greens, Spanish courtyards, and tranquil fountains',
      'Prime Neopolis Phase III location with direct signal-free access to Kokapet Trumpet Interchange',
      'Crafted by Brigade Group, a premier multi-decade South Indian luxury developer'
    ],
    amenities: [
      { icon: 'Crown', name: '1.5 Lakh Sq. Ft. Club', description: 'One of Hyderabad’s largest dedicated resident clubhouses with multi-tier amenities.' },
      { icon: 'Coffee', name: 'Sky Lounges & Decks', description: 'High-altitude panoramic observation lounges overlooking Gandipet Lake and city lights.' },
      { icon: 'Waves', name: 'Olympic-Length Pool', description: 'Resort-style temperature balanced swimming pool with cabanas and sun loungers.' },
      { icon: 'Dumbbell', name: 'Elite Fitness Arena', description: 'TechnoGym-equipped multi-level gym, CrossFit deck, and indoor squash courts.' },
      { icon: 'Sparkles', name: 'Spanish Courtyards', description: 'Handcrafted terracotta paved pergolas, Mediterranean flora, and water cascading plazas.' },
      { icon: 'Film', name: 'Private Preview Theatre', description: 'Acoustically engineered 40-seat private cinema for resident screening events.' }
    ],
    gallery: [
      {
        id: 'bb-1',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
        title: 'Iconic T-Shaped 52-Storey Elevation',
        category: 'Exterior',
        description: 'Monumental Spanish-inspired architectural silhouette dominating Neopolis skyline.'
      },
      {
        id: 'bb-2',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        title: 'Grand Living & Dining Room',
        category: 'Interior',
        description: 'Vast column-free 3.5 BHK living salon with Italian marble and floor-to-ceiling glass.'
      },
      {
        id: 'bb-3',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
        title: '150,000 Sq. Ft. Luxury Clubhouse',
        category: 'Amenities',
        description: 'Grand resort clubhouse with Spanish archways, heated indoor pools, and ballrooms.'
      },
      {
        id: 'bb-4',
        url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80',
        title: 'Master Bedroom Suite',
        category: 'Interior',
        description: 'Expansive master chamber with walk-in wardrobe and sunrise view balcony.'
      },
      {
        id: 'bb-5',
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80',
        title: 'Sky Lounge at 50th Floor',
        category: 'Amenities',
        description: 'Stargazing deck and private resident sunset cocktail lounge.'
      },
      {
        id: 'bb-6',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        title: 'Masterplan & Pedestrian Podium',
        category: 'Master Plan',
        description: '4.04-acre layout with vehicle-free podiums and Spanish landscape courts.'
      }
    ],
    floorPlans: [
      {
        id: 'bb-fp-1',
        name: 'Type A - 3 BHK Grand Luxury',
        type: '3 BHK + Maid Room',
        sft: '2,790 Sq. Ft.',
        bedrooms: 3,
        bathrooms: 3,
        balconies: '2 Expansive Sit-outs',
        highlights: ['East-facing Vaastu compliant entry', 'Spacious formal living with 11ft clear ceiling', 'Dedicated utility and separate staff toilet']
      },
      {
        id: 'bb-fp-2',
        name: 'Type B - 3.5 BHK Spanish Royale',
        type: '3.5 BHK + Study/Pooja',
        sft: '3,240 Sq. Ft.',
        bedrooms: 3,
        bathrooms: 4,
        balconies: '3 Wraparound Balconies',
        highlights: ['Private lift foyer access', 'Executive home office / study room', 'Zero dead corridor floor efficiency']
      },
      {
        id: 'bb-fp-3',
        name: 'Type C - 4 BHK Presidential Suite',
        type: '4 BHK + Home Lounge + Servant',
        sft: '3,764 Sq. Ft.',
        bedrooms: 4,
        bathrooms: 5,
        balconies: 'Corner 360° Viewing Terraces',
        highlights: ['Triple exposure corner residence', 'Dual master bedroom suites', 'Private chef dry kitchen & wet preparation kitchen']
      }
    ],
    distanceMetrics: [
      { destination: 'Financial District (Waverock / Amazon)', distance: '3.2 km', time: '5 mins' },
      { destination: 'HITEC City & Cyber Towers', distance: '8.4 km', time: '12 mins' },
      { destination: 'Continental Hospital', distance: '4.1 km', time: '7 mins' },
      { destination: 'Rajiv Gandhi Int. Airport (RGIA)', distance: '28 km', time: '22 mins (ORR)' }
    ]
  },
  {
    id: 'godrej-epoque',
    name: 'Godrej Epoque',
    developer: 'Godrej Properties',
    tagline: 'Iconic 57-Storey Art Deco Landmark in the Heart of Neopolis',
    location: 'Heart of Neopolis, Kokapet, Hyderabad',
    subLocation: 'Central Boulevard, Neopolis',
    coordinates: [17.4095, 78.3312],
    landArea: 'Prime High-Rise Enclave',
    towers: 'Ultra-Luxury High-Rise Sky Towers',
    floors: '57 Storey Landmark Towers',
    totalUnits: 'Exclusive Curated Residences',
    configurations: ['3 BHK', '3.5 BHK', '4 BHK', 'Sky Mansions'],
    sizeRange: '2,850 – 4,200 sq. ft. super built-up area',
    amenitiesArea: 'Over 100,000 sq. ft. Multi-Tiered Amenities',
    possession: 'December 2030',
    priceStarting: '₹ 4.35 Cr* onwards',
    pricePerSqft: '₹ 15,250 / sq. ft.',
    reraStatus: 'RERA Registered & Approved',
    architecturalStyle: 'Timeless Manhattan Art Deco',
    summary: 'A dramatic 57-storey skyline statement in the heart of Neopolis. Godrej Epoque celebrates the grandeur of 1920s Art Deco with high-altitude Sky Bridges, a private Miyawaki forest, and an observatory terrace.',
    keyHighlights: [
      '57-storey landmark towers with sweeping unhindered views of Gandipet Lake & Kokapet skyline',
      'Architectural masterpiece featuring an iconic Sky Bridge connecting sky decks and retreat lounges',
      'Exclusive temperature-controlled indoor swimming pool alongside rooftop infinity pool',
      '100% vehicle-free landscaped podium with native Miyawaki micro-forest and zen gardens',
      'Located 5 mins from Financial District and 10-15 mins from HITEC City with direct ORR connectivity',
      'Celebrated Godrej Properties legacy of trust, architectural excellence, and green building design'
    ],
    amenities: [
      { icon: 'Compass', name: 'High-Altitude Observatory', description: 'Stargazing telescope deck at 57th floor for breathtaking celestial and city views.' },
      { icon: 'Layers', name: 'Iconic Sky Bridge & Retreat', description: 'Suspended architectural marvel with sky gardens, reading lounges, and private cabanas.' },
      { icon: 'Waves', name: 'Dual Swimming Pools', description: 'Rooftop infinity pool plus heated indoor pool for year-round aquatic leisure.' },
      { icon: 'Trees', name: 'Dense Miyawaki Forest', description: 'Biodiverse tranquil micro-forest filtering fresh air with shaded meditation trails.' },
      { icon: 'ShieldCheck', name: 'Vehicle-Free Podium', description: 'Zero vehicular movement at surface level, ensuring complete safety for kids and elders.' },
      { icon: 'Film', name: 'Mini Theatre & Café', description: 'Private Dolby Atmos screening salon and European artisanal coffee house on premises.' }
    ],
    gallery: [
      {
        id: 'ge-1',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1600&q=80',
        title: '57-Storey Art Deco Tower Elevation',
        category: 'Exterior',
        description: 'Iconic vertical piers, geometric crown, and dramatic nocturnal facade lighting.'
      },
      {
        id: 'ge-2',
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
        title: 'Art Deco Luxury Living Space',
        category: 'Interior',
        description: 'Double-glazed expansive windows with panoramic sunrise and sunset vistas.'
      },
      {
        id: 'ge-3',
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
        title: 'Rooftop Infinity Pool & Sky Bridge',
        category: 'Amenities',
        description: 'Suspended bridge lounge floating 50 floors above Neopolis boulevard.'
      },
      {
        id: 'ge-4',
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        title: 'Designer Gourmet Kitchen & Dining',
        category: 'Interior',
        description: 'German modular cabinetry with quartz countertops and butler pantry.'
      },
      {
        id: 'ge-5',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
        title: 'Heated Indoor Swimming Pool',
        category: 'Amenities',
        description: 'Temperature-regulated all-weather lap pool surrounded by acoustic stone cladding.'
      },
      {
        id: 'ge-6',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
        title: 'Miyawaki Forest Trails',
        category: 'Exterior',
        description: 'Lush green biophilic trails designed for serene evening walking and yoga.'
      }
    ],
    floorPlans: [
      {
        id: 'ge-fp-1',
        name: 'The Manhattan - 3 BHK Residence',
        type: '3 BHK Luxury',
        sft: '2,850 Sq. Ft.',
        bedrooms: 3,
        bathrooms: 3,
        balconies: 'Wide Sky Verandah',
        highlights: ['Art Deco foyer with private entry corridor', 'Large master bedroom with dresser', 'Acoustic double glazing for zero road noise']
      },
      {
        id: 'ge-fp-2',
        name: 'The Empire - 3.5 BHK Residence',
        type: '3.5 BHK + Den',
        sft: '3,450 Sq. Ft.',
        bedrooms: 3,
        bathrooms: 4,
        balconies: 'Dual Sundeck Balconies',
        highlights: ['Dedicated library / media den', 'Servant room with independent entrance', 'Panoramic city view living room']
      },
      {
        id: 'ge-fp-3',
        name: 'The Sovereign - 4 BHK Sky Mansion',
        type: '4 BHK + Family Lounge + Maid',
        sft: '4,200 Sq. Ft.',
        bedrooms: 4,
        bathrooms: 5,
        balconies: 'Wraparound Sky Deck',
        highlights: ['Spectacular corner 270-degree vista', 'Two opulent master suites with spa tubs', 'Expansive 42ft wide continuous balcony']
      }
    ],
    distanceMetrics: [
      { destination: 'Financial District Hub', distance: '2.8 km', time: '4 mins' },
      { destination: 'HITEC City Mindspace', distance: '9.1 km', time: '13 mins' },
      { destination: 'Oakridge & DPS Schools', distance: '5.2 km', time: '8 mins' },
      { destination: 'Star & Continental Hospitals', distance: '3.8 km', time: '6 mins' }
    ]
  },
  {
    id: 'sattva-lago',
    name: 'SATTVA LAGO – Phase 2',
    developer: 'Sattva Group',
    tagline: 'Pre-Launch Lagoon-Front Luxury across 10 Acres at Neopolis, Kokapet',
    location: 'Neopolis, Kokapet, Hyderabad',
    subLocation: 'Phase II, Waterfront Sector',
    coordinates: [17.4041, 78.3285],
    landArea: 'Spread across 10 Acres',
    towers: '5 Magnificent Towers (T3, T4 & T5 Open for Sale)',
    floors: 'G + 46 Floors',
    totalUnits: '1,261 Ultra-Premium Residences',
    configurations: ['3 BHK', '3.5 BHK', '4 BHK'],
    sizeRange: '3,100 – 4,900 sft (Plus Private Terraces)',
    amenitiesArea: '120,000+ sq. ft. Biophilic Waterfront Club',
    possession: 'Pre-Launch Phase 2 (March 2031)',
    priceStarting: '₹ 4.65 Cr* onwards',
    pricePerSqft: '₹ 14,800 / sq. ft.',
    reraStatus: 'Pre-Launch Registration in Progress',
    openTowers: 'Tower 3, Tower 4 & Tower 5',
    architecturalStyle: 'Contemporary Biophilic Waterfront Architecture',
    summary: 'A visionary 10-acre ultra-luxury lakefront enclave in Kokapet Neopolis. Featuring 5 soaring 46-storey towers, Sattva Lago Phase 2 introduces sprawling 3,100 to 4,900 sq. ft. homes with dramatic private sky terraces.',
    keyHighlights: [
      'Expansive 10-acre mega-development with 80% open landscaped greens and serene water bodies',
      'Soaring G+46 storeys offering unhindered natural ventilation and uninterrupted lakefront views',
      'Exclusive Phase 2 Pre-Launch units now booking in Tower 3, Tower 4, and Tower 5',
      'Spacious palatial residences ranging from 3,100 sft to 4,900 sft plus unique cantilevered private terraces',
      '1,261 meticulously planned luxury apartments with ultra-low density per floor',
      'Strategic Neopolis Kokapet positioning with immediate access to Outer Ring Road and SEZ hubs'
    ],
    amenities: [
      { icon: 'Droplets', name: 'Curated Lagoon & Cascades', description: 'Central naturalistic water feature with stepping stones, aquatic lotus ponds, and deck seating.' },
      { icon: 'Maximize2', name: 'Private Sky Terraces', description: 'Double-height landscaped personal terraces creating seamless indoor-outdoor living.' },
      { icon: 'Clubhouse', name: 'Grand Lago Clubhouse', description: '4-level lifestyle clubhouse with squash courts, badminton, card rooms, and banquet halls.' },
      { icon: 'Flame', name: 'Barbecue & Sunken Decks', description: 'Social gathering decks sunken into serene reflecting pools for evening resident dinners.' },
      { icon: 'Heart', name: 'Spa, Sauna & Wellness', description: 'Therapeutic hydro-massage pools, steam rooms, and professional ayurvedic wellness suites.' },
      { icon: 'Zap', name: 'High-Speed Elevators', description: 'German Schindler elevators with destination control systems and minimal wait time.' }
    ],
    gallery: [
      {
        id: 'sl-1',
        url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80',
        title: 'Lago 10-Acre Waterfront Towers',
        category: 'Exterior',
        description: 'G+46 soaring residential towers rising alongside lush lagoon pools.'
      },
      {
        id: 'sl-2',
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
        title: 'Sprawling 4,900 Sft Living Salon',
        category: 'Interior',
        description: 'Vast open-concept great room with integrated terrace dining and marble floors.'
      },
      {
        id: 'sl-3',
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
        title: 'Private Sky Terraces',
        category: 'Exterior',
        description: 'Cantilevered private gardens with glass parapets providing panoramic vistas.'
      },
      {
        id: 'sl-4',
        url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
        title: 'Presidential Master Suite',
        category: 'Interior',
        description: 'Ultra-luxurious bedroom with sunrise orientation and private study nook.'
      },
      {
        id: 'sl-5',
        url: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=80',
        title: 'Waterfront Lagoon Pools',
        category: 'Amenities',
        description: 'Lagoon pools winding across the 10-acre estate with tropical palm trees.'
      },
      {
        id: 'sl-6',
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
        title: 'Towers 3, 4 & 5 Master Layout',
        category: 'Master Plan',
        description: 'Site master layout illustrating open greens, club, and tower placement.'
      }
    ],
    floorPlans: [
      {
        id: 'sl-fp-1',
        name: 'Type 1 - 3 BHK + Terrace Residence',
        type: '3 BHK + Terrace',
        sft: '3,100 Sq. Ft.',
        bedrooms: 3,
        bathrooms: 4,
        balconies: 'Private Sky Terrace (220 sft)',
        highlights: ['Open courtyard concept inside apartment', 'Vaastu compliant North-East entry', 'Expansive walk-in dressing suites']
      },
      {
        id: 'sl-fp-2',
        name: 'Type 2 - 3.5 BHK Lagoon View',
        type: '3.5 BHK + Family Space',
        sft: '3,850 Sq. Ft.',
        bedrooms: 3,
        bathrooms: 4,
        balconies: 'Dual Waterfront Balconies',
        highlights: ['Direct view of central lagoon and Gandipet lake', 'Separate domestic help quarters with service elevator access', 'High-speed acoustic insulation']
      },
      {
        id: 'sl-fp-3',
        name: 'Type 3 - 4 BHK Grand Lago Sky Villa',
        type: '4 BHK + Home Lounge + Terrace',
        sft: '4,900 Sq. Ft.',
        bedrooms: 4,
        bathrooms: 5,
        balconies: 'Panoramic Wrap Terrace (410 sft)',
        highlights: ['Palatial 4,900 sft single floor layout', 'Massive double-height private sky terrace', 'Show kitchen + heavy cooking wet kitchen']
      }
    ],
    distanceMetrics: [
      { destination: 'ORR Exit 1 (Kokapet Interchange)', distance: '1.2 km', time: '2 mins' },
      { destination: 'Financial District & US Consulate', distance: '3.5 km', time: '6 mins' },
      { destination: 'Cyber Gateway / HITEC City', distance: '9.5 km', time: '14 mins' },
      { destination: 'Gandipet Park & Lakefront', distance: '4.0 km', time: '7 mins' }
    ]
  }
];

export const NEOPOLIS_LOCATION_HIGHLIGHTS = [
  {
    title: 'Highest Real Estate Land Value in South India',
    stat: '₹100+ Cr / Acre',
    description: 'HMDA’s high-profile auctions marked Neopolis as Telangana’s premier golden real estate corridor, attracting India’s top tier institutional developers.'
  },
  {
    title: 'Underground Infrastructure & Green Grid',
    stat: '100% Underground',
    description: '45-meter wide master roads, dedicated utility ducts with zero overhead wires, dual water lines, pneumatic waste chutes, and cycle tracks.'
  },
  {
    title: 'Immediate Access to Global Tech Titans',
    stat: '5 Mins',
    description: 'Just 5 minutes to Financial District hosting Microsoft, Google, Amazon, Apple, Micron, Salesforce, and the US Consulate General.'
  },
  {
    title: 'Signal-Free Airport Connectivity',
    stat: '22 Mins to RGIA',
    description: 'Direct Kokapet Trumpet Interchange to the 8-lane Outer Ring Road (ORR) ensures swift 22-minute transit to Rajiv Gandhi International Airport.'
  }
];

export const NEOPOLIS_LANDMARKS: LocationLandmark[] = [
  { name: 'Neopolis Phase III (Brigade Barcelona)', category: 'Commercial', distance: '0 km', travelTime: 'On site', coordinates: [17.4068, 78.3341] },
  { name: 'Central Neopolis (Godrej Epoque)', category: 'Commercial', distance: '0.4 km', travelTime: '1 min', coordinates: [17.4095, 78.3312] },
  { name: 'Neopolis Lagoon Sector (Sattva Lago)', category: 'Commercial', distance: '0.6 km', travelTime: '2 mins', coordinates: [17.4041, 78.3285] },
  { name: 'Kokapet Trumpet Interchange (ORR Exit 1)', category: 'Transit', distance: '1.2 km', travelTime: '2 mins', coordinates: [17.4002, 78.3395] },
  { name: 'Financial District (Waverock / Amazon / US Consulate)', category: 'Commercial', distance: '3.2 km', travelTime: '5 mins', coordinates: [17.4150, 78.3490] },
  { name: 'Continental Hospital, Nanakramguda', category: 'Hospital', distance: '4.1 km', travelTime: '7 mins', coordinates: [17.4182, 78.3580] },
  { name: 'Oakridge International School, Gachibowli', category: 'School', distance: '5.2 km', travelTime: '9 mins', coordinates: [17.4290, 78.3620] },
  { name: 'HITEC City / Cyber Towers', category: 'Commercial', distance: '8.8 km', travelTime: '13 mins', coordinates: [17.4485, 78.3800] },
  { name: 'Gandipet Lake & Osman Sagar Scenic View', category: 'Recreation', distance: '4.0 km', travelTime: '7 mins', coordinates: [17.3910, 78.3120] },
  { name: 'Rajiv Gandhi International Airport (RGIA)', category: 'Transit', distance: '28 km', travelTime: '22 mins', coordinates: [17.2403, 78.4294] }
];

export const NEOPOLIS_WHY_INVEST_FACTORS = [
  {
    number: '01',
    title: 'Future-Ready Mega Master Plan',
    body: 'Designed by international urban planning authorities across 533 greenfield acres, Neopolis is built with 36m to 45m arterial avenues, stormwater drainage reservoirs, optical fiber ducts, and strict zoning for high-rise towers.'
  },
  {
    number: '02',
    title: 'High Rental Yields & Capital Appreciation',
    body: 'With over 500,000 top IT, fintech, and semiconductor professionals working in the adjoining Financial District and HITEC City, Kokapet commands South India’s highest executive rental demand and fastest capital appreciation.'
  },
  {
    number: '03',
    title: 'Pristine Eco-Buffer & Lake Vistas',
    body: 'Positioned close to Osman Sagar (Gandipet Lake) and Himayat Sagar green catchment zones, Neopolis guarantees permanent fresh air, unblocked sunset horizons, and zero industrial contamination.'
  },
  {
    number: '04',
    title: 'World-Class Healthcare & Academics',
    body: 'Minutes away from premier international schools like Oakridge, DPS, Phoenix Greens, and The Gaudium, alongside JCI-accredited healthcare hospitals including Continental, Star, and AIG.'
  }
];

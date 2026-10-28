export interface ProjectSpec {
  label: string;
  value: string;
}

export interface FloorPlan {
  id: string;
  bhk: string;
  name: string;
  superBuiltUpArea: string;
  carpetArea?: string;
  bedrooms: string;
  bathrooms: string;
  balconies: string;
  facing: string;
  keyFeatures: string[];
  roomDimensions: {
    livingDining: string;
    masterBedroom: string;
    bedroom2: string;
    bedroom3: string;
    bedroom4?: string;
    bedroom5?: string;
    kitchen: string;
    balconies: string;
  };
}

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  location: string;
  propertyType: string;
  configurations: string[];
  startingPrice: string;
  priceNote?: string;
  statusBadge: string;
  statusType: 'featured' | 'premium' | 'landmark' | 'prelaunch' | 'upcoming';
  isDetailed: boolean;
  areaRange: string;
  image: string;
  imageAlt: string;
  gallery: string[];
  headline: string;
  description: string;
  keyHighlights: string[];
  keySpecs: ProjectSpec[];
  amenities: { name: string; category: string }[];
  floorPlans?: FloorPlan[];
  reraNumber: string;
  possessionYear: string;
  ctaLabel: string;
  developerName: string;
  paymentPlan?: {
    scheme: string;
    details: string;
    instalments: { milestone: string; percentage: string }[];
    notes?: string;
  };
  pricingBreakdown?: {
    towerA?: {
      title: string;
      basePrice: string;
      floorRise: string;
      facingPremium: string;
      cornerPremium: string;
      amenities: string;
      ac?: string;
      carParking: string;
      ceilingHeight?: string;
      range: string;
    };
    towerBC?: {
      title: string;
      basePrice: string;
      floorRise: string;
      facingPremium: string;
      cornerPremium: string;
      amenities: string;
      carParking: string;
      ceilingHeight?: string;
      range: string;
    };
  };
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'msn-neopolis',
    name: 'MSN Neopolis',
    tagline: 'Upcoming 56-Storey Landmark Luxury Residences with 2,30,000 SFT Iconic Clubhouse',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Ultra-Luxury High-Rise Residences',
    configurations: ['3 BHK', '4 BHK'],
    startingPrice: '₹3.26 Cr*',
    priceNote: 'Pre-launch base price ₹10,499 – ₹10,699/sq.ft. (Exclusive to first 200 bookings)',
    statusBadge: 'Pre-Launch Landmark',
    statusType: 'prelaunch',
    isDetailed: true,
    areaRange: '2,424 – 4,545 sq.ft.',
    image: '/projects/msn-neopolis/1.webp',
    imageAlt: 'MSN Neopolis 56-Storey Landmark Residences in Kokapet Hyderabad',
    gallery: [
      '/projects/msn-neopolis/1.webp',
      '/projects/msn-neopolis/2.webp',
      '/projects/msn-neopolis/3.webp',
      '/projects/msn-neopolis/4.webp',
      '/projects/msn-neopolis/5.webp'
    ],
    headline: 'Upcoming Landmark Luxury Residential Development in Neopolis, Kokapet',
    description: 'MSN Neopolis is an upcoming landmark residential development by MSN Group, situated on a prime 7-acre parcel in Neopolis, Kokapet, Hyderabad. This monumental project features three soaring 56-storey towers—Tower A, Tower B, and Tower C—offering high-end 3 and 4 BHK luxury residences sized between 2,424 and 4,545 sq.ft.\n\nDesigned for elevated living, the project features 8 panoramic Sky Pavilions with sweeping 360-degree skyline views. Residences boast grand 11.4-foot ceiling heights in Tower A and 10.5-foot heights in Towers B and C. Premium finishes include imported engineered marble flooring, Delta CP fittings, and TOTO sanitaryware suites alongside an iconic 2,30,000 sq.ft. mega clubhouse.\n\nAttractive pre-launch base pricing starts from ₹10,499/sq.ft for Towers B & C and ₹10,699/sq.ft for Tower A. With a buyer-friendly 20:20:20:20:20 five-year instalment payment plan, this pre-launch offer is exclusively available to the first 200 bookings.',
    keyHighlights: [
      '7 Acres expansive land parcel with 3 monumental towers rising 56 floors',
      'Expansive 3 & 4 BHK luxury residences ranging from 2,424 to 4,545 SFT',
      'Iconic Clubhouse & Amenities spanning 2,30,000 SFT with world-class facilities',
      '8 exclusive Sky Pavilions across 56 storeys offering panoramic skyline vistas',
      'Tower A: 11.4 ft floor-to-floor height; Towers B & C: 10.5 ft floor-to-floor height',
      'Premium specifications: Engineered marble flooring, Delta CP fittings & TOTO sanitaryware',
      'Attractive 20:20:20:20:20 payment plan (5 equal instalments across 4 years)',
      'Exclusive Pre-Launch Offer applicable to the first 200 bookings only'
    ],
    keySpecs: [
      { label: 'Land Area', value: '7 Acres' },
      { label: 'Towers', value: '3 Towers (A, B & C)' },
      { label: 'Floors', value: '56 Floors' },
      { label: 'Configurations', value: '3 & 4 BHK Residences' },
      { label: 'Unit Sizes', value: '2,424 – 4,545 sq.ft.' },
      { label: 'Clubhouse', value: '2,30,000 sq.ft. (Iconic)' },
      { label: 'Sky Pavilions', value: '8 Sky Pavilions' },
      { label: 'Tower A Height', value: '11.4 ft Floor-to-Floor' },
      { label: 'Towers B&C Height', value: '10.5 ft Floor-to-Floor' },
      { label: 'Flooring', value: 'Engineered Marble' },
      { label: 'Sanitaryware', value: 'TOTO / Delta or Equiv.' },
      { label: 'Tower A Base Price', value: '₹10,699 / sq.ft' },
      { label: 'Tower B & C Base', value: '₹10,499 / sq.ft' },
      { label: 'Payment Plan', value: '20:20:20:20:20 Plan' },
      { label: 'Pre-Launch Offer', value: 'First 200 Bookings' },
      { label: 'Possession', value: 'Pre-Launch / Under Construction' }
    ],
    amenities: [
      { name: '2,30,000 sq.ft. Iconic Mega Clubhouse', category: 'Leisure' },
      { name: '8 Sky Pavilions Across 56 Floors', category: 'Skyline' },
      { name: 'Engineered Marble Living & Drawing Spaces', category: 'Interiors' },
      { name: 'Delta CP Fittings & TOTO Sanitaryware', category: 'Fittings' },
      { name: 'Temperature Controlled Lap Pool & Aqua Deck', category: 'Wellness' },
      { name: 'Indoor Badminton & Squash Courts', category: 'Sports' },
      { name: 'Private Banquet Lounge & Celebrations Lawn', category: 'Hospitality' },
      { name: 'Thematic Gardens, Walking & Jogging Loops', category: 'Greenery' },
      { name: 'High-Speed Elevators with Separate Service Core', category: 'Transit' },
      { name: 'EV Charging Equipped Dedicated Car Parking', category: 'Infrastructure' }
    ],
    paymentPlan: {
      scheme: '20:20:20:20:20 Payment Plan',
      details: '20% each across five instalments, ranging from within 30 days of DOB up to the 4th year.',
      instalments: [
        { milestone: 'Within 30 Days of Date of Booking (DOB)', percentage: '20%' },
        { milestone: 'On Completion of 1st Year', percentage: '20%' },
        { milestone: 'On Completion of 2nd Year', percentage: '20%' },
        { milestone: 'On Completion of 3rd Year', percentage: '20%' },
        { milestone: 'On Completion of 4th Year', percentage: '20%' }
      ],
      notes: 'Please note that the pre-launch offer is applicable exclusively to the first 200 bookings.'
    },
    pricingBreakdown: {
      towerA: {
        title: 'Tower A (Floor-to-Floor Height: 11.4 ft)',
        basePrice: '₹10,699 / sq.ft',
        floorRise: '₹25 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹200 / sq.ft (East Facing)',
        cornerPremium: '₹150 / sq.ft',
        amenities: '₹700 / sq.ft',
        ac: '₹400 / sq.ft',
        carParking: '₹15 Lakh lump sum',
        ceilingHeight: '11.4 ft',
        range: '₹5.00 Cr (3,888 SFT) to ₹5.97 Cr (4,545 SFT East)'
      },
      towerBC: {
        title: 'Towers B & C (Floor-to-Floor Height: 10.5 ft)',
        basePrice: '₹10,499 / sq.ft',
        floorRise: '₹25 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹150 / sq.ft (North) · ₹200 / sq.ft (East)',
        cornerPremium: '₹150 / sq.ft',
        amenities: '₹700 / sq.ft',
        carParking: '₹10 Lakh (3 BHK) / ₹15 Lakh (4 BHK) lump sum',
        ceilingHeight: '10.5 ft',
        range: '₹3.26 Cr (2,666 SFT) to ₹5.21 Cr (4,141 SFT East)'
      }
    },
    floorPlans: [
      {
        id: 'msn-3bhk-2424',
        bhk: '3 BHK',
        name: '3 BHK Luxury Suite (Unit 3 · Tower B)',
        superBuiltUpArea: '2,424 sq.ft.',
        carpetArea: '1,745 sq.ft.',
        bedrooms: '3 Beds',
        bathrooms: '3 Baths',
        balconies: 'Living Deck (20’ 0” × 6’ 0”) + Utility',
        facing: 'East Facing',
        keyFeatures: [
          'Vastu-compliant East entrance opening into dedicated entry foyer',
          'Spacious 20’ 0” × 16’ 1” Living & Dining hall opening onto grand viewing deck',
          'All 3 bedrooms equipped with attached dress areas and en-suite bathrooms'
        ],
        roomDimensions: {
          livingDining: '20’ 0” × 16’ 1”',
          masterBedroom: '12’ 4” × 17’ 5”',
          bedroom2: '12’ 2” × 13’ 0”',
          bedroom3: '14’ 0” × 12’ 0”',
          kitchen: '9’ 5” × 12’ 9”',
          balconies: '20’ 0” × 6’ 0” (Balcony Deck)'
        }
      },
      {
        id: 'msn-3bhk-2666',
        bhk: '3 BHK',
        name: '3 BHK Signature Suite (Unit 2 · Tower B)',
        superBuiltUpArea: '2,666 sq.ft.',
        carpetArea: '1,920 sq.ft.',
        bedrooms: '3 Beds',
        bathrooms: '3 Baths + Powder Room',
        balconies: 'Panoramic Deck (20’ 0” × 6’ 0”) + Utility',
        facing: 'West Facing',
        keyFeatures: [
          'Pre-launch starting total price ₹3.26 Cr in Towers B & C',
          'Separate formal drawing room (12’ 0” × 17’ 7”) plus family living & dining space',
          'Master suite (12’ 4” × 17’ 2”) with walk-in dressing lounge and 4-fixture toilet'
        ],
        roomDimensions: {
          livingDining: '20’ 0” × 16’ 1”',
          masterBedroom: '12’ 4” × 17’ 2”',
          bedroom2: '12’ 2” × 13’ 0”',
          bedroom3: '14’ 0” × 12’ 0”',
          kitchen: '9’ 5” × 12’ 9”',
          balconies: '20’ 0” × 6’ 0” (Deck)'
        }
      },
      {
        id: 'msn-4bhk-3600',
        bhk: '4 BHK',
        name: '4 BHK Royal Manor (Unit 1 & 8 · Tower B)',
        superBuiltUpArea: '3,600 sq.ft.',
        carpetArea: '2,590 sq.ft.',
        bedrooms: '4 Beds',
        bathrooms: '4 Baths + Powder Room + Maid/Store',
        balconies: 'Double Decks (19’ 0” × 7’ 8” & 8’ 0” × 15’ 4”)',
        facing: 'East Facing',
        keyFeatures: [
          'Total cost approx. ₹4.55 Cr in Towers B & C with East-facing orientation',
          'Dual viewing decks overlooking the 2,30,000 sq.ft. central clubhouse landscape',
          'Master bedroom (13’ 5” × 17’ 0”) with extended private outdoor terrace & puja'
        ],
        roomDimensions: {
          livingDining: '24’ 7” × 15’ 4”',
          masterBedroom: '13’ 5” × 17’ 0”',
          bedroom2: '12’ 0” × 12’ 4”',
          bedroom3: '12’ 0” × 17’ 0”',
          bedroom4: '14’ 7” × 12’ 4”',
          kitchen: '12’ 0” × 13’ 0”',
          balconies: '19’ 0” × 7’ 8” (Main Deck)'
        }
      },
      {
        id: 'msn-4bhk-4545',
        bhk: '4 BHK',
        name: '4 BHK + Maid Presidential Sky Villa (Tower A)',
        superBuiltUpArea: '4,545 sq.ft.',
        carpetArea: '3,275 sq.ft.',
        bedrooms: '4 Beds + Maid Suite',
        bathrooms: '5 Baths + Powder Room',
        balconies: 'Grand Sky Terrace (10’ 0” × 15’ 6”) + Multiple Viewing Decks',
        facing: 'East / West Corner',
        keyFeatures: [
          'Tower A flagship residence with towering 11.4 ft floor-to-floor ceiling heights',
          'Base price ₹10,699/sq.ft with total cost ₹5.88 Cr (West) to ₹5.97 Cr (East)',
          'Grand master suite (18’ 0” × 16’ 8”) with dual dressing suites & luxury ensuite'
        ],
        roomDimensions: {
          livingDining: '33’ 10” × 15’ 6”',
          masterBedroom: '18’ 0” × 16’ 8”',
          bedroom2: '12’ 0” × 17’ 10”',
          bedroom3: '12’ 4” × 13’ 6”',
          bedroom4: '16’ 6” × 12’ 0”',
          kitchen: '12’ 0” × 15’ 10”',
          balconies: '10’ 0” × 15’ 6” (Sky Deck)'
        }
      }
    ],
    reraNumber: 'TS RERA Under Registration / Application',
    possessionYear: '2028-2029',
    ctaLabel: 'Enquire About MSN Neopolis',
    developerName: 'MSN Group'
  },
  {
    id: 'sattva-lakeridge',
    name: 'Sattva Lakeridge',
    tagline: 'High-Rise Waterfront Luxury Overlooking Pristine Lakes in Kokapet',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Ultra-Luxury High-Rise Apartments',
    configurations: ['3 BHK', '4 BHK', '5 BHK'],
    startingPrice: '₹2.95 Cr*',
    priceNote: 'Starting Price (All-Inclusive on request)',
    statusBadge: 'Featured Project',
    statusType: 'featured',
    isDetailed: true,
    areaRange: '2,744 – 5,472 sq.ft.',
    image: '/projects/sattva-lakeridge/1.webp',
    imageAlt: 'Sattva Lakeridge luxury residential towers in Kokapet Neopolis',
    gallery: [
      '/projects/sattva-lakeridge/1.webp',
      '/projects/sattva-lakeridge/2.webp',
      '/projects/sattva-lakeridge/3.webp',
      '/projects/sattva-lakeridge/4.webp',
      '/projects/sattva-lakeridge/5.webp'
    ],
    headline: 'High-Rise Luxury in Hyderabad’s Most Promising Location',
    description: 'Sattva Lakeridge is an ultra-luxury waterfront residential community by Sattva Group, situated along the tranquil Osman Sagar corridor in Neopolis, Kokapet. Spanning 9.5 acres of landscaped grounds, this gated enclave features six monumental towers rising 37 storeys, comprising expansive 3, 4, and 5 BHK sky residences ranging from 2,744 to 5,472 sq.ft.\n\nThe residences feature soaring 12-foot floor-to-floor ceiling clearances, imported Italian marble flooring, and acoustic double-glazed glass with panoramic lake views. A lavish multi-level clubhouse spanning 65,000 sq.ft. offers a temperature-controlled indoor lap pool, squash courts, sensory nature trails, and vehicle-free podium landscapes designed for ultimate peace and family well-being.\n\nStrategically positioned with direct access to the Kokapet Trumpet Flyover, Sattva Lakeridge offers a swift 5-minute commute to the Financial District. Fully registered under Telangana RERA (P02400005820), the project offers transparent construction-linked payment milestones and possession scheduled for December 2027.',
    keyHighlights: [
      '9.5 Acres expansive lakefront development with 6 soaring 37-storey towers',
      'Uninterrupted, panoramic vistas overlooking pristine Osman Sagar lake horizon',
      '65,000 sq.ft. multi-level recreational clubhouse with temperature-controlled pool',
      'Soaring 12-ft floor-to-floor ceiling clearances with acoustic double glazing',
      'Imported Italian marble flooring across formal drawing and living rooms',
      'Direct signal-free connectivity to the Kokapet Outer Ring Road Trumpet Flyover',
      'Over 80% open landscaped greens featuring dense native Miyawaki woodlands',
      'Telangana RERA registered and verified (RERA ID: P02400005820)'
    ],
    keySpecs: [
      { label: 'Land Area', value: '9.5 Acres' },
      { label: 'Towers', value: '6 Landmark Towers' },
      { label: 'Floors', value: 'G + 37 Floors' },
      { label: 'Configurations', value: '3, 4 & 5 BHK' },
      { label: 'Sizes', value: '2,744 – 5,472 sq.ft.' },
      { label: 'Clubhouse', value: '65,000 sq.ft.' },
      { label: 'Ceiling Height', value: '12.0 ft Floor-to-Floor' },
      { label: 'Flooring', value: 'Italian Marble' },
      { label: 'Sanitaryware', value: 'Kohler / Grohe or Equiv.' },
      { label: 'Facing', value: 'East / West / Lake View' },
      { label: 'RERA Number', value: 'P02400005820' },
      { label: 'Possession', value: 'December 2027 (RERA)' }
    ],
    amenities: [
      { name: 'Heated Indoor Lap Pool & Aqua Lounge', category: 'Wellness' },
      { name: '65,000 sq.ft. Multi-Tier Grand Clubhouse', category: 'Leisure' },
      { name: 'Sky Observation Terraces & Stargazing Deck', category: 'Skyline' },
      { name: 'Glass Squash Courts & Indoor Badminton Arena', category: 'Sports' },
      { name: 'Miyawaki Forest Trails & Shaded Reflexology Paths', category: 'Greenery' },
      { name: 'Banquet Hall & Private Resident Dining Suites', category: 'Hospitality' },
      { name: 'Hydrotherapy Spa, Sauna & Steam Rooms', category: 'Wellness' },
      { name: 'Children Cognitive Play Park & Creche', category: 'Family' }
    ],
    pricingBreakdown: {
      towerA: {
        title: 'Towers 1 & 2 (Lakefront Signature Towers)',
        basePrice: '₹10,750 / sq.ft',
        floorRise: '₹30 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹250 / sq.ft (Lake View East)',
        cornerPremium: '₹150 / sq.ft',
        amenities: '₹650 / sq.ft',
        carParking: '₹12 Lakh lump sum',
        ceilingHeight: '12.0 ft',
        range: '₹4.15 Cr (3,850 SFT) to ₹6.20 Cr (5,472 SFT)'
      },
      towerBC: {
        title: 'Towers 3, 4, 5 & 6 (City & Garden Towers)',
        basePrice: '₹10,250 / sq.ft',
        floorRise: '₹25 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹150 / sq.ft (East / North)',
        cornerPremium: '₹125 / sq.ft',
        amenities: '₹650 / sq.ft',
        carParking: '₹10 Lakh lump sum',
        ceilingHeight: '11.5 ft',
        range: '₹2.95 Cr (2,744 SFT) to ₹4.25 Cr (3,850 SFT)'
      }
    },
    paymentPlan: {
      scheme: 'Construction-Linked Milestone Plan (CLP)',
      details: 'Transparent stage-wise payment schedule mapped to physical structural progress.',
      instalments: [
        { milestone: 'Booking Advance & Application', percentage: '10%' },
        { milestone: 'Execution of Agreement of Sale (Within 30 Days)', percentage: '10%' },
        { milestone: 'On Completion of Foundation & Basement Slabs', percentage: '15%' },
        { milestone: 'Slab-wise Progress Across Superstructure', percentage: '55%' },
        { milestone: 'Notice of Possession & Handover', percentage: '10%' }
      ],
      notes: 'Custom subvention and bank pre-approved mortgage schemes available through leading private lenders.'
    },
    floorPlans: [
      {
        id: 'sl-3bhk',
        bhk: '3 BHK',
        name: '3 Bedroom Lake Suite',
        superBuiltUpArea: '2,744 sq.ft.',
        carpetArea: '1,960 sq.ft.',
        bedrooms: '3 Beds',
        bathrooms: '3 Baths',
        balconies: '2 Viewing Balconies',
        facing: 'East / North-East',
        keyFeatures: [
          'Direct lake-facing living and master suite with acoustic glass',
          'Acoustic double-glazed floor-to-ceiling windows with sound isolation',
          'Dry and wet kitchen separation with dedicated utility deck'
        ],
        roomDimensions: {
          livingDining: '28’ 6” × 17’ 0”',
          masterBedroom: '18’ 4” × 14’ 6”',
          bedroom2: '15’ 0” × 13’ 0”',
          bedroom3: '14’ 0” × 12’ 6”',
          kitchen: '14’ 0” × 10’ 6”',
          balconies: '22’ 0” × 6’ 6”'
        }
      },
      {
        id: 'sl-4bhk',
        bhk: '4 BHK',
        name: '4 Bedroom Grand Residence',
        superBuiltUpArea: '3,850 sq.ft.',
        carpetArea: '2,780 sq.ft.',
        bedrooms: '4 Beds',
        bathrooms: '5 Baths',
        balconies: 'Corner 360° Viewing Terraces',
        facing: 'Corner East-Facing',
        keyFeatures: [
          'Dual master suites with walk-in designer dressing lounges',
          'Expansive formal and family double living salons',
          'Independent maid suite with separate external service entrance'
        ],
        roomDimensions: {
          livingDining: '34’ 0” × 20’ 0”',
          masterBedroom: '21’ 0” × 16’ 0”',
          bedroom2: '17’ 0” × 14’ 0”',
          bedroom3: '16’ 0” × 13’ 0”',
          bedroom4: '14’ 6” × 12’ 6”',
          kitchen: '16’ 6” × 12’ 0”',
          balconies: '30’ 0” × 7’ 6”'
        }
      },
      {
        id: 'sl-5bhk',
        bhk: '5 BHK',
        name: '5 Bedroom Sky Manor',
        superBuiltUpArea: '5,472 sq.ft.',
        carpetArea: '4,020 sq.ft.',
        bedrooms: '5 Beds',
        bathrooms: '6 Baths',
        balconies: 'Full Wraparound Sky Deck',
        facing: 'Panoramic Corner',
        keyFeatures: [
          'Full-floor panoramic footprint with unhindered 270° lake horizon',
          'Private elevator lobby opening directly into the grand foyer',
          'Bespoke entertainment lounge and family cinema zone'
        ],
        roomDimensions: {
          livingDining: '42’ 0” × 24’ 0”',
          masterBedroom: '25’ 0” × 18’ 0”',
          bedroom2: '19’ 0” × 15’ 0”',
          bedroom3: '18’ 0” × 14’ 6”',
          bedroom4: '16’ 0” × 14’ 0”',
          bedroom5: '15’ 6” × 13’ 0”',
          kitchen: '20’ 0” × 14’ 0”',
          balconies: '45’ 0” × 9’ 0”'
        }
      }
    ],
    reraNumber: 'P02400005820',
    possessionYear: 'December 2027',
    ctaLabel: 'Enquire About Sattva Lakeridge',
    developerName: 'Sattva Group'
  },
  {
    id: 'brigade-barcelona',
    name: 'Brigade Barcelona',
    tagline: 'Spanish-Inspired Architecture Meets 52-Storey Modern Luxury',
    location: 'Neopolis Phase III, Kokapet, Hyderabad',
    propertyType: 'Spanish-Themed Luxury Condominiums',
    configurations: ['3 BHK', '3.5 BHK', '4 BHK'],
    startingPrice: '₹3.10 Cr*',
    priceNote: 'Estimated indicative launch pricing',
    statusBadge: 'Premium Residence',
    statusType: 'premium',
    isDetailed: true,
    areaRange: '2,790 – 3,764 sq.ft.',
    image: '/projects/brigade-barcelona/1.webp',
    imageAlt: 'Brigade Barcelona Spanish inspired luxury high-rise condominium in Neopolis',
    gallery: [
      '/projects/brigade-barcelona/1.webp',
      '/projects/brigade-barcelona/2.webp',
      '/projects/brigade-barcelona/3.webp',
      '/projects/brigade-barcelona/4.webp',
      '/projects/brigade-barcelona/5.webp'
    ],
    headline: 'Spanish-Inspired Architecture. Contemporary Luxury.',
    description: 'Brigade Barcelona is an architectural triumph by Brigade Group in Neopolis Phase III, Kokapet, Hyderabad. Seamlessly blending Spanish Mediterranean charm with modern high-rise engineering, this iconic 52-storey T-shaped mono-tower sits on a prime 4.04-acre parcel, housing 666 curated 3, 3.5, and 4 BHK luxury condominiums ranging from 2,790 to 3,764 sq.ft.\n\nResidences feature authentic Spanish design accents, including arched viewing balconies, terracotta highlights, acoustic glass facades, and 11.5-foot clear ceiling heights. Residents enjoy access to a massive 1,50,000 sq.ft. clubhouse featuring Catalan gardens, sky observation decks, Olympic-standard badminton arenas, screening theaters, and hydrotherapy wellness suites.\n\nDirectly fronting Neopolis\'s 45-meter arterial boulevard, Brigade Barcelona provides swift signal-free transit to the Outer Ring Road and HITEC City. Fully compliant with TS RERA registration P02400007812, this landmark development promises exceptional European elegance and long-term capital appreciation in Hyderabad\'s premier district.',
    keyHighlights: [
      'Iconic Spanish architectural motifs blended with sleek contemporary glass facades',
      'Single landmark 52-storey T-shaped mono tower ensuring three-sided ventilation',
      'Monumental ~1.5 Lakh sq.ft. mega clubhouse and high-altitude rooftop sky retreats',
      'Spacious large-format configurations ranging from 2,790 to 3,764 sq.ft.',
      'Classic arched balcony viewing portals with rustic terracotta finishes',
      'Direct frontage along Neopolis 45-meter 8-lane arterial boulevard',
      'TS RERA approved and legally sanctioned (RERA Reg: P02400007812)',
      'Constructed by Grade-A developer Brigade Group with proven pan-India delivery'
    ],
    keySpecs: [
      { label: 'Land Area', value: '4.04 Acres' },
      { label: 'Residences', value: '666 Luxury Homes' },
      { label: 'Floors', value: '52 Storeys (2B + 5P + 52F)' },
      { label: 'Clubhouse', value: 'Approx. 150,000 sq.ft.' },
      { label: 'Ceiling Height', value: '11.5 ft Clear' },
      { label: 'Flooring', value: 'Large Format Vitrified / Marble' },
      { label: 'Sanitaryware', value: 'Toto / Grohe or Equiv.' },
      { label: 'Sizes', value: '2,790 – 3,764 sq.ft.' },
      { label: 'RERA Number', value: 'P02400007812' },
      { label: 'Possession', value: 'July 2032' }
    ],
    amenities: [
      { name: '150,000 sq.ft. Mediterranean Mega Club', category: 'Hospitality' },
      { name: 'Catalan Garden Pavilions & Floral Courtyards', category: 'Greenery' },
      { name: 'Sky Observation Terraces & Sunset Deck', category: 'Skyline' },
      { name: 'Olympic-Standard Badminton & Basketball Arenas', category: 'Sports' },
      { name: 'Private Resident Cinema & Preview Screening', category: 'Entertainment' },
      { name: 'Hydrotherapy Spa Cabins & Heated Sauna', category: 'Wellness' },
      { name: 'Co-Working Lounges & Boardrooms', category: 'Business' },
      { name: 'Infinity Lap Pool with Sunken Sun Loungers', category: 'Wellness' }
    ],
    pricingBreakdown: {
      towerA: {
        title: 'Barcelona Sky Suites (Floors 30–52)',
        basePrice: '₹10,800 / sq.ft',
        floorRise: '₹30 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹200 / sq.ft (East / Boulevard)',
        cornerPremium: '₹150 / sq.ft',
        amenities: '₹700 / sq.ft',
        carParking: '₹12 Lakh lump sum',
        ceilingHeight: '11.5 ft',
        range: '₹4.10 Cr (3,764 SFT) to ₹4.45 Cr'
      },
      towerBC: {
        title: 'Barcelona Classic Residences (Floors 6–29)',
        basePrice: '₹10,350 / sq.ft',
        floorRise: '₹25 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹150 / sq.ft (East / North)',
        cornerPremium: '₹125 / sq.ft',
        amenities: '₹700 / sq.ft',
        carParking: '₹10 Lakh lump sum',
        ceilingHeight: '11.0 ft',
        range: '₹3.10 Cr (2,790 SFT) to ₹3.65 Cr (3,240 SFT)'
      }
    },
    paymentPlan: {
      scheme: 'Milestone Construction Payment Schedule',
      details: 'Structured across milestone completions with transparent progress verification.',
      instalments: [
        { milestone: 'On Booking Token & Registration', percentage: '15%' },
        { milestone: 'Within 45 Days of Booking (Agreement of Sale)', percentage: '10%' },
        { milestone: 'On Completion of 10th Floor Structural Slab', percentage: '20%' },
        { milestone: 'On Completion of 30th & 50th Floor Slabs', percentage: '45%' },
        { milestone: 'On Possession Notice & Key Handover', percentage: '10%' }
      ],
      notes: 'No pre-EMI subvention options also available with premier financial institutions.'
    },
    floorPlans: [
      {
        id: 'bb-3bhk',
        bhk: '3 BHK',
        name: '3 Bedroom Spanish Classic',
        superBuiltUpArea: '2,790 sq.ft.',
        carpetArea: '1,985 sq.ft.',
        bedrooms: '3 Beds',
        bathrooms: '3 Baths',
        balconies: '2 Viewing Balconies',
        facing: 'East / West',
        keyFeatures: [
          'Spanish-inspired arched balcony portals with terracotta detailing',
          'Dual living and dining pavilion with 11 ft clear ceiling heights',
          'Spacious kitchen layout with utility wash and store area'
        ],
        roomDimensions: {
          livingDining: '29’ 0” × 16’ 8”',
          masterBedroom: '18’ 0” × 14’ 0”',
          bedroom2: '15’ 4” × 13’ 2”',
          bedroom3: '14’ 2” × 12’ 6”',
          kitchen: '13’ 6” × 10’ 4”',
          balconies: '20’ 0” × 6’ 6”'
        }
      },
      {
        id: 'bb-35bhk',
        bhk: '3.5 BHK',
        name: '3.5 Bedroom Catalan Elite',
        superBuiltUpArea: '3,240 sq.ft.',
        carpetArea: '2,320 sq.ft.',
        bedrooms: '3.5 Beds (3 Beds + Study)',
        bathrooms: '4 Baths',
        balconies: '2 Extended Terraces',
        facing: 'North-East',
        keyFeatures: [
          'Dedicated executive study / private home office room',
          'Corner orientation offering continuous cross-ventilation',
          'Private family lounge separating guest and personal quarters'
        ],
        roomDimensions: {
          livingDining: '32’ 0” × 18’ 6”',
          masterBedroom: '19’ 6” × 15’ 0”',
          bedroom2: '16’ 0” × 13’ 6”',
          bedroom3: '15’ 0” × 13’ 0”',
          bedroom4: '11’ 0” × 10’ 0” (Executive Study)',
          kitchen: '15’ 0” × 11’ 0”',
          balconies: '24’ 0” × 7’ 0”'
        }
      },
      {
        id: 'bb-4bhk',
        bhk: '4 BHK',
        name: '4 Bedroom Barcelona Grandeur',
        superBuiltUpArea: '3,764 sq.ft.',
        carpetArea: '2,710 sq.ft.',
        bedrooms: '4 Beds',
        bathrooms: '5 Baths',
        balconies: 'Corner 360° Viewing Terraces',
        facing: 'Triple-Aspect Corner',
        keyFeatures: [
          'Grand entrance foyer leading to palatial salon living area',
          'Corner 360° viewing terraces capturing Neopolis skyline and lake',
          'Five en-suite luxury bathrooms with Italian marble specifications'
        ],
        roomDimensions: {
          livingDining: '36’ 4” × 20’ 0”',
          masterBedroom: '22’ 0” × 16’ 6”',
          bedroom2: '17’ 6” × 14’ 0”',
          bedroom3: '16’ 0” × 13’ 6”',
          bedroom4: '15’ 0” × 13’ 0”',
          kitchen: '17’ 0” × 12’ 0”',
          balconies: '28’ 0” × 7’ 6”'
        }
      }
    ],
    reraNumber: 'P02400007812',
    possessionYear: 'July 2032',
    ctaLabel: 'Enquire About Brigade Barcelona',
    developerName: 'Brigade Group'
  },
  {
    id: 'godrej-epoque',
    name: 'Godrej Epoque',
    tagline: '57-Storey Art Deco Landmark Dominating the Neopolis Skyline',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Art Deco Iconic Sky Residences',
    configurations: ['3 BHK', '4 BHK'],
    startingPrice: '₹3.80 Cr*',
    priceNote: 'Starting price upon request',
    statusBadge: 'Luxury Landmark',
    statusType: 'landmark',
    isDetailed: true,
    areaRange: '3,200 – 4,800 sq.ft.',
    image: '/projects/godrej-epoque/1.webp',
    imageAlt: 'Godrej Epoque 57-storey art deco luxury skyscraper in Neopolis Kokapet',
    gallery: [
      '/projects/godrej-epoque/1.webp',
      '/projects/godrej-epoque/2.webp',
      '/projects/godrej-epoque/3.webp',
      '/projects/godrej-epoque/4.webp',
      '/projects/godrej-epoque/5.webp'
    ],
    headline: 'An Iconic Expression of Contemporary Luxury',
    description: 'Godrej Epoque is a prestigious 57-storey luxury landmark by Godrej Properties, dominating the vibrant skyline of Neopolis, Kokapet. Drawing inspiration from classic Art Deco geometric elegance, the development features striking vertical lines and grand colonnades, presenting 3 and 4 BHK palatial residences spanning from 3,200 to 4,800 sq.ft.\n\nA standout feature of this landmark is the high-altitude Sky Bridge connecting the towers, featuring exclusive resident lounges and stargazing platforms. The community includes a 100% vehicle-free landscaped podium with Miyawaki forest trails, a rooftop heated infinity pool overlooking the Financial District, and biometric smart access for every home.\n\nLocated just minutes from the Kokapet Trumpet Interchange, Godrej Epoque ensures effortless connectivity to major tech hubs and international schools. Registered under Telangana RERA (P02400006240), the project features flexible milestone payment options, representing an elite investment in Hyderabad\'s premier skyscraper enclave.',
    keyHighlights: [
      '57-Storey landmark towers with Art Deco architectural geometry and ornamental crowns',
      'High-altitude Sky Bridge connecting towers with panoramic sky lounges and observation decks',
      '100% vehicle-free landscaped podium with native Miyawaki woodlands and water features',
      'Palatial 3 & 4 BHK residences offering ultra-spacious layouts from 3,200 to 4,800 sq.ft.',
      'Rooftop heated infinity pool with sweeping views across the Financial District horizon',
      'Biometric smart lock access, imported marble flooring, and acoustic sound insulation',
      'Merely ~5 minutes from Kokapet Trumpet Interchange and the Outer Ring Road corridor',
      'Registered with Telangana RERA (Registration No: P02400006240)'
    ],
    keySpecs: [
      { label: 'Floors', value: '57 Storeys' },
      { label: 'Architecture', value: 'Art Deco Geometric Design' },
      { label: 'Signature Feature', value: 'High-Altitude Sky Bridge' },
      { label: 'Podium', value: '100% Vehicle-Free Landscaped' },
      { label: 'Ceiling Height', value: '12.0 ft Floor-to-Floor' },
      { label: 'Configurations', value: '3 & 4 BHK Luxury Residences' },
      { label: 'Sizes', value: '3,200 – 4,800 sq.ft.' },
      { label: 'RERA Number', value: 'P02400006240' },
      { label: 'Possession', value: '2028 (Under Construction)' }
    ],
    amenities: [
      { name: 'Sky Bridge & Sky Observatory Retreat', category: 'Skyline' },
      { name: 'Rooftop Infinity Edge Panoramic Pool', category: 'Wellness' },
      { name: 'Indoor Badminton & Glass Squash Arena', category: 'Sports' },
      { name: 'Native Miyawaki Forest & Zen Meditation Groves', category: 'Greenery' },
      { name: 'Private Resident Library & Business Suites', category: 'Leisure' },
      { name: 'Hydrotherapy Spa Suites & Turkish Hamam', category: 'Wellness' },
      { name: 'Banquet Hall & Al Fresco Dining Courtyards', category: 'Hospitality' },
      { name: 'EV Charging Enabled Covered Multi-Level Parking', category: 'Infrastructure' }
    ],
    pricingBreakdown: {
      towerA: {
        title: 'Sky Bridge Signature Towers (Floors 35–57)',
        basePrice: '₹11,200 / sq.ft',
        floorRise: '₹35 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹250 / sq.ft (Financial District Skyline)',
        cornerPremium: '₹175 / sq.ft',
        amenities: '₹750 / sq.ft',
        carParking: '₹15 Lakh lump sum',
        ceilingHeight: '12.0 ft',
        range: '₹5.50 Cr (4,800 SFT) to ₹6.10 Cr'
      },
      towerBC: {
        title: 'Horizon Residences (Floors 5–34)',
        basePrice: '₹10,650 / sq.ft',
        floorRise: '₹30 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹200 / sq.ft (East / Green Vista)',
        cornerPremium: '₹150 / sq.ft',
        amenities: '₹750 / sq.ft',
        carParking: '₹12 Lakh lump sum',
        ceilingHeight: '11.5 ft',
        range: '₹3.80 Cr (3,200 SFT) to ₹4.60 Cr'
      }
    },
    paymentPlan: {
      scheme: '25:25:25:25 Flexible Stage Plan',
      details: 'Four equal quarter instalments aligned with milestone foundation, mid-tower, and final finishing.',
      instalments: [
        { milestone: 'On Booking & Agreement Execution', percentage: '25%' },
        { milestone: 'On Completion of 20th Structural Floor Slab', percentage: '25%' },
        { milestone: 'On Completion of Superstructure Terrace Slab', percentage: '25%' },
        { milestone: 'On Notice of Possession & Keys Allotment', percentage: '25%' }
      ],
      notes: 'No floor rise escalation charges on selected early allotment inventory.'
    },
    floorPlans: [
      {
        id: 'ge-3bhk',
        bhk: '3 BHK',
        name: '3 Bedroom Art Deco Suite',
        superBuiltUpArea: '3,200 sq.ft.',
        carpetArea: '2,310 sq.ft.',
        bedrooms: '3 Beds',
        bathrooms: '3 Baths',
        balconies: 'Skyline Viewing Deck',
        facing: 'East / North',
        keyFeatures: [
          'High-altitude living room with expansive skyline horizons',
          'Bespoke Art Deco geometric finishes and tall double-glazed glass',
          'Private foyer with smart biometric entry lock'
        ],
        roomDimensions: {
          livingDining: '30’ 0” × 18’ 0”',
          masterBedroom: '19’ 6” × 15’ 0”',
          bedroom2: '16’ 0” × 13’ 6”',
          bedroom3: '15’ 0” × 13’ 0”',
          kitchen: '14’ 6” × 11’ 0”',
          balconies: '24’ 0” × 7’ 0”'
        }
      },
      {
        id: 'ge-4bhk',
        bhk: '4 BHK',
        name: '4 Bedroom Epoque Presidential',
        superBuiltUpArea: '4,800 sq.ft.',
        carpetArea: '3,520 sq.ft.',
        bedrooms: '4 Beds',
        bathrooms: '5 Baths',
        balconies: 'Corner 360° Viewing Terraces',
        facing: 'Corner Skyline View',
        keyFeatures: [
          'Direct access to 57th-floor observatory and Sky Bridge',
          'Double-height ceiling option in formal living salon',
          'Corner 360° viewing terraces with panoramic Financial District views'
        ],
        roomDimensions: {
          livingDining: '38’ 0” × 22’ 0”',
          masterBedroom: '23’ 0” × 17’ 0”',
          bedroom2: '18’ 0” × 14’ 6”',
          bedroom3: '17’ 0” × 14’ 0”',
          bedroom4: '15’ 6” × 13’ 0”',
          kitchen: '18’ 0” × 12’ 6”',
          balconies: '32’ 0” × 8’ 0”'
        }
      }
    ],
    reraNumber: 'P02400006240',
    possessionYear: '2028',
    ctaLabel: 'Enquire About Godrej Epoque',
    developerName: 'Godrej Properties'
  },
  {
    id: 'sattva-lago-phase-2',
    name: 'Sattva Lago — Phase 2',
    tagline: 'Waterfront Living with Expansive Private Sky Terraces',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Waterfront Large-Format Residences',
    configurations: ['3 BHK', '3.5 BHK', '4 BHK'],
    startingPrice: '₹3.25 Cr*',
    priceNote: 'Pre-Launch Offer (Towers 3, 4 & 5)',
    statusBadge: 'Pre-Launch',
    statusType: 'prelaunch',
    isDetailed: true,
    areaRange: '3,100 – 4,900 sq.ft.',
    image: '/projects/sattva-lago-phase-2/1.webp',
    imageAlt: 'Sattva Lago Phase 2 high-rise towers in Kokapet Neopolis Hyderabad',
    gallery: [
      '/projects/sattva-lago-phase-2/1.webp',
      '/projects/sattva-lago-phase-2/2.webp',
      '/projects/sattva-lago-phase-2/3.webp',
      '/projects/sattva-lago-phase-2/4.webp',
      '/projects/sattva-lago-phase-2/5.webp'
    ],
    headline: 'Elevated Living. Expansive Spaces.',
    description: 'Sattva Lago Phase 2 is an expansive 10-acre waterfront master development by Sattva Group in the serene lakefront sector of Neopolis, Kokapet. Following the tremendous success of Phase 1, this phase introduces soaring G+46 storey towers with reflective glass facades that maximize unhindered water and skyline vistas.\n\nThe project presents large-format 3, 3.5, and 4 BHK sky residences ranging from 3,100 to 4,900 sq.ft., with select flagship homes featuring private open-to-sky terrace gardens. Interiors boast Vastu-compliant layouts, 11.5-foot ceilings, and full acoustic glazing, complemented by a lakeside promenade, multi-level clubhouse, and tennis courts.\n\nEquipped with complete underground utility cabling and continuous green corridors, Sattva Lago Phase 2 offers a tranquil resort lifestyle minutes from the Outer Ring Road. With introductory pre-launch pricing on Towers 3, 4, and 5, it presents an exceptional high-growth investment opportunity.',
    keyHighlights: [
      '10-Acre expansive waterfront master plan with G+46 storey monumental towers',
      'Uninterrupted water views with peaceful lakefront promenade walks',
      'Large-format configurations from 3,100 to 4,900 sq.ft. with expansive room volumes',
      'Flagship units featuring private open-to-sky landscaped terrace gardens',
      'Multi-level contemporary clubhouse with wellness spa, gym, and heated pool',
      'Sports zone including floodlit tennis, pickleball, and half basketball courts',
      'Underground utility ducts with zero visible cables or overhead poles',
      'Direct arterial link to Outer Ring Road Kokapet Trumpet Flyover'
    ],
    keySpecs: [
      { label: 'Land Area', value: '10 Acres' },
      { label: 'Towers', value: '5 Landmark Towers' },
      { label: 'Structure', value: 'G + 46 Floors' },
      { label: 'Total Units', value: '1,261 Residences' },
      { label: 'Configurations', value: '3, 3.5 & 4 BHK' },
      { label: 'Ceiling Height', value: '11.5 ft Clear' },
      { label: 'Active Phase', value: 'Towers 3, 4 & 5 Open' },
      { label: 'RERA Status', value: 'P02400008450 (Applied)' },
      { label: 'Possession', value: '2029' }
    ],
    amenities: [
      { name: 'Waterfront Lakeside Promenade', category: 'Nature' },
      { name: 'Infinity Lake-View Pool with Sun Deck', category: 'Wellness' },
      { name: 'Multi-Level Central Clubhouse', category: 'Leisure' },
      { name: 'Private Open-to-Sky Terraces (Select)', category: 'Architecture' },
      { name: 'Floodlit Tennis & Pickleball Courts', category: 'Sports' },
      { name: 'Children Sensory Play Park & Sandpit', category: 'Family' },
      { name: 'Executive Business Center & Conference', category: 'Business' },
      { name: 'Full Power Backup & Dual Water Supply', category: 'Infrastructure' }
    ],
    pricingBreakdown: {
      towerA: {
        title: 'Waterfront Towers 3 & 4 (Prime Lakefront)',
        basePrice: '₹10,450 / sq.ft',
        floorRise: '₹25 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹200 / sq.ft (Lake Facing East)',
        cornerPremium: '₹150 / sq.ft',
        amenities: '₹650 / sq.ft',
        carParking: '₹12 Lakh lump sum',
        ceilingHeight: '11.5 ft',
        range: '₹4.20 Cr (3,850 SFT) to ₹5.45 Cr (4,900 SFT Terrace Villa)'
      },
      towerBC: {
        title: 'Park View Tower 5',
        basePrice: '₹10,150 / sq.ft',
        floorRise: '₹25 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹150 / sq.ft (East / North)',
        cornerPremium: '₹125 / sq.ft',
        amenities: '₹650 / sq.ft',
        carParking: '₹10 Lakh lump sum',
        ceilingHeight: '11.0 ft',
        range: '₹3.25 Cr (3,100 SFT) to ₹4.15 Cr (3,850 SFT)'
      }
    },
    paymentPlan: {
      scheme: 'Pre-Launch Special 20:80 Linked Plan',
      details: 'Initial 20% commitment followed by 80% distributed across structural milestones.',
      instalments: [
        { milestone: 'On Booking Token Confirmation', percentage: '10%' },
        { milestone: 'Within 30 Days of Booking (Agreement Execution)', percentage: '10%' },
        { milestone: 'On Completion of Raft Foundation', percentage: '15%' },
        { milestone: 'Across Floor Slab Milestones (10th, 20th, 35th, 45th)', percentage: '55%' },
        { milestone: 'On Final Notice of Possession & Registration', percentage: '10%' }
      ],
      notes: 'Special introductory pre-launch pricing valid exclusively for Towers 3, 4 and 5.'
    },
    floorPlans: [
      {
        id: 'slago-3bhk',
        bhk: '3 BHK',
        name: '3 Bedroom Lago Vista',
        superBuiltUpArea: '3,100 sq.ft.',
        carpetArea: '2,240 sq.ft.',
        bedrooms: '3 Beds',
        bathrooms: '3 Baths',
        balconies: '2 Balconies',
        facing: 'East / Lake View',
        keyFeatures: [
          'Open-concept living room with 11.5 ft ceiling clearance',
          'Panoramic glass frontage looking toward lake corridors',
          'Spacious kitchen and dedicated utility balcony'
        ],
        roomDimensions: {
          livingDining: '30’ 6” × 18’ 0”',
          masterBedroom: '19’ 0” × 15’ 0”',
          bedroom2: '16’ 0” × 13’ 6”',
          bedroom3: '15’ 0” × 13’ 0”',
          kitchen: '14’ 6” × 11’ 0”',
          balconies: '22’ 0” × 7’ 0”'
        }
      },
      {
        id: 'slago-35bhk',
        bhk: '3.5 BHK',
        name: '3.5 Bedroom Family Residence',
        superBuiltUpArea: '3,850 sq.ft.',
        carpetArea: '2,790 sq.ft.',
        bedrooms: '3.5 Beds (3 Beds + Lounge)',
        bathrooms: '4 Baths',
        balconies: '2 Expansive Decks',
        facing: 'North-East',
        keyFeatures: [
          'Separate private family entertainment room',
          'Three sprawling ensuite bedroom chambers',
          'Expansive outdoor deck with landscaped planter boxes'
        ],
        roomDimensions: {
          livingDining: '35’ 0” × 19’ 6”',
          masterBedroom: '21’ 6” × 16’ 0”',
          bedroom2: '17’ 0” × 14’ 0”',
          bedroom3: '16’ 0” × 13’ 6”',
          bedroom4: '13’ 0” × 11’ 0” (Lounge)',
          kitchen: '16’ 0” × 11’ 6”',
          balconies: '26’ 0” × 7’ 6”'
        }
      },
      {
        id: 'slago-4bhk',
        bhk: '4 BHK',
        name: '4 Bedroom Sky Villa with Private Terrace',
        superBuiltUpArea: '4,900 sq.ft.',
        carpetArea: '3,580 sq.ft.',
        bedrooms: '4 Beds',
        bathrooms: '5 Baths',
        balconies: 'Corner 360° Viewing Terraces',
        facing: 'Corner Lake Horizon',
        keyFeatures: [
          'Exclusive private open-to-sky terrace garden in select units',
          'Double master suites with private terrace access',
          'Direct service elevator access for staff and delivery'
        ],
        roomDimensions: {
          livingDining: '40’ 0” × 22’ 0”',
          masterBedroom: '24’ 0” × 17’ 6”',
          bedroom2: '19’ 0” × 15’ 0”',
          bedroom3: '17’ 6” × 14’ 0”',
          bedroom4: '16’ 0” × 13’ 6”',
          kitchen: '18’ 6” × 13’ 0”',
          balconies: '34’ 0” × 8’ 6”'
        }
      }
    ],
    reraNumber: 'P02400008450 (Applied)',
    possessionYear: '2029',
    ctaLabel: 'Register Your Interest',
    developerName: 'Sattva Group'
  },
  {
    id: 'cascades',
    name: 'Cascades',
    tagline: 'Upcoming Architectural Statement in Neopolis High-Rise District',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Biophilic High-Rise Residences',
    configurations: ['3 BHK', '4 BHK'],
    startingPrice: '₹3.15 Cr*',
    priceNote: 'Pre-Launch Indicative Base Price',
    statusBadge: 'Upcoming Landmark',
    statusType: 'upcoming',
    isDetailed: true,
    areaRange: '2,900 – 4,200 sq.ft.',
    image: '/projects/cascades/1.webp',
    imageAlt: 'Cascades upcoming luxury high-rise development in Neopolis Kokapet',
    gallery: [
      '/projects/cascades/1.webp',
      '/projects/cascades/2.webp',
      '/projects/cascades/3.webp',
      '/projects/cascades/4.webp',
      '/projects/cascades/5.webp'
    ],
    headline: 'A New Architectural Icon on the Horizon',
    description: 'Cascades is a distinctive upcoming biophilic residential development located in Sector 2 of Neopolis, Kokapet, Hyderabad. Designed to harmoniously blend nature with high-rise luxury, the project features stepped vertical green terraces, hanging botanical sky gardens, and cascading water courtyards that create a peaceful microclimate for residents.\n\nThe development offers spacious 3 and 4 BHK luxury residences ranging from 2,900 to 4,200 sq.ft. Each residence enjoys 11.5-foot ceiling clearances, grand entrance foyers, gourmet kitchens, and sweeping corner balconies with unobstructed views of the surrounding lake and skyline horizons.\n\nResidents benefit from an elevated multi-tier clubhouse, infinity lap pool with floating cabanas, co-working business lounges, and outdoor amphitheater. Located along the 45-meter wide boulevard with instant access to the Kokapet Trumpet Interchange, Cascades offers an outstanding pre-launch opportunity for discerning homebuyers.',
    keyHighlights: [
      'Prime master-planned location in the heart of Neopolis Sector 2',
      'Biophilic architecture with vertical gardens and cascading water features',
      'Generous 3 & 4 BHK residences with expansive layouts from 2,900 to 4,200 sq.ft.',
      'Stepped landscaped viewing terraces with unhindered lake and skyline horizons',
      'Modern clubhouse featuring co-working suites, lap pool, and wellness spa',
      '11.5 ft clear floor-to-floor heights with acoustic high-performance glazing',
      'Direct signal-free connectivity to Kokapet Trumpet Interchange and ORR',
      'Priority expression of interest (EOI) currently accepting early applications'
    ],
    keySpecs: [
      { label: 'Project Status', value: 'Pre-Launch Planning' },
      { label: 'Configurations', value: '3 & 4 BHK' },
      { label: 'Sizes', value: '2,900 – 4,200 sq.ft.' },
      { label: 'Location', value: 'Neopolis Sector 2, Kokapet' },
      { label: 'Ceiling Height', value: '11.5 ft Floor-to-Floor' },
      { label: 'Flooring', value: 'Vitrified Large Format / Marble' },
      { label: 'RERA Status', value: 'Registration In Progress' },
      { label: 'Possession', value: '2029 (Estimated)' }
    ],
    amenities: [
      { name: 'Cascading Water Courtyards & Fountains', category: 'Architecture' },
      { name: 'Elevated Multi-Tier Clubhouse', category: 'Leisure' },
      { name: 'Infinity Lap Pool with Floating Cabanas', category: 'Wellness' },
      { name: 'Children Adventure Zone & Treehouse Park', category: 'Family' },
      { name: 'Indoor Badminton & Squash Arena', category: 'Sports' },
      { name: 'Co-Working Business Lounges & Library', category: 'Business' },
      { name: 'Open-Air Amphitheater & Event Lawn', category: 'Entertainment' },
      { name: '100% Subterranean Utilities & 24/7 Security', category: 'Infrastructure' }
    ],
    pricingBreakdown: {
      towerA: {
        title: 'Cascades Signature Sky Villas (Floors 25–48)',
        basePrice: '₹10,600 / sq.ft',
        floorRise: '₹30 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹200 / sq.ft (East / Boulevard)',
        cornerPremium: '₹150 / sq.ft',
        amenities: '₹700 / sq.ft',
        carParking: '₹12 Lakh lump sum',
        ceilingHeight: '11.5 ft',
        range: '₹4.40 Cr (4,200 SFT) to ₹4.85 Cr'
      },
      towerBC: {
        title: 'Cascades Premium Residences (Floors 5–24)',
        basePrice: '₹10,250 / sq.ft',
        floorRise: '₹25 / sq.ft per floor (from 5th floor)',
        facingPremium: '₹150 / sq.ft (East / North)',
        cornerPremium: '₹125 / sq.ft',
        amenities: '₹700 / sq.ft',
        carParking: '₹10 Lakh lump sum',
        ceilingHeight: '11.0 ft',
        range: '₹3.15 Cr (2,900 SFT) to ₹3.80 Cr (3,450 SFT)'
      }
    },
    paymentPlan: {
      scheme: 'Priority EOI Investor Milestone Plan',
      details: 'Special introductory milestone schedule for pre-registration expression of interest.',
      instalments: [
        { milestone: 'On Priority EOI Registration', percentage: '10%' },
        { milestone: 'On Agreement of Sale Execution', percentage: '10%' },
        { milestone: 'On Basement & Podium Slab Completion', percentage: '15%' },
        { milestone: 'Across Superstructure Structural Progress', percentage: '50%' },
        { milestone: 'On Key Handover & Possession Notice', percentage: '15%' }
      ],
      notes: 'Priority EOI holders receive early choice of tower, floor, and orientation.'
    },
    floorPlans: [
      {
        id: 'cascades-3bhk',
        bhk: '3 BHK',
        name: '3 Bedroom Cascades Haven',
        superBuiltUpArea: '2,900 sq.ft.',
        carpetArea: '2,080 sq.ft.',
        bedrooms: '3 Beds',
        bathrooms: '3 Baths',
        balconies: '2 Viewing Balconies',
        facing: 'East Facing',
        keyFeatures: [
          'Expansive drawing & dining pavilion opening onto garden balcony',
          'Vastu-compliant East entry with dedicated foyer',
          'Three all-ensuite bedrooms with private dressing spaces'
        ],
        roomDimensions: {
          livingDining: '30’ 0” × 17’ 6”',
          masterBedroom: '18’ 6” × 14’ 6”',
          bedroom2: '15’ 6” × 13’ 0”',
          bedroom3: '14’ 6” × 12’ 6”',
          kitchen: '14’ 0” × 11’ 0”',
          balconies: '22’ 0” × 7’ 0”'
        }
      },
      {
        id: 'cascades-4bhk',
        bhk: '4 BHK',
        name: '4 Bedroom Sky Garden Villa',
        superBuiltUpArea: '4,200 sq.ft.',
        carpetArea: '3,050 sq.ft.',
        bedrooms: '4 Beds + Maid Suite',
        bathrooms: '5 Baths',
        balconies: 'Stepped Vertical Garden Terraces',
        facing: 'Corner North-East',
        keyFeatures: [
          'Stepped botanical terrace balcony designed for vertical gardening',
          'Master suite with panoramic corner glazing and luxury dressing salon',
          'Maid suite with independent service core access'
        ],
        roomDimensions: {
          livingDining: '36’ 0” × 21’ 0”',
          masterBedroom: '22’ 0” × 16’ 0”',
          bedroom2: '18’ 0” × 14’ 0”',
          bedroom3: '16’ 6” × 13’ 6”',
          bedroom4: '15’ 0” × 13’ 0”',
          kitchen: '17’ 0” × 12’ 0”',
          balconies: '32’ 0” × 8’ 0”'
        }
      }
    ],
    reraNumber: 'Registration In Progress',
    possessionYear: '2029 (Estimated)',
    ctaLabel: 'Get Launch Updates',
    developerName: 'Prominent Real Estate Developers'
  },
  {
    id: 'rise-by-9',
    name: 'Rise By 9',
    tagline: 'Bespoke Boutique High-Rise Living in Neopolis',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Bespoke Sky Residences',
    configurations: ['4 & 5 BHK (Expected)'],
    startingPrice: 'Contact for Price',
    priceNote: 'Launching Soon — Limited Edition Residences',
    statusBadge: 'Launching Soon',
    statusType: 'upcoming',
    isDetailed: false,
    areaRange: '3,500 – 6,000 sq.ft. (Est.)',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Rise By 9 luxury high-rise residences concept in Neopolis',
    gallery: [
      'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    headline: 'Your Next Luxury Address Could Be Here',
    description: 'Rise By 9 is an ultra-exclusive boutique luxury high-rise development coming soon to the elite Neopolis corridor in Kokapet, Hyderabad. Designed around low-density architectural philosophy, the development offers limited-edition 4 and 5 BHK sky villas ranging from 3,500 to 6,000 sq.ft.\n\nOffering unparalleled privacy, each floor hosts only two sprawling residences served by dedicated high-speed elevators and private entrance vestibules. Expansive wrap-around balconies and panoramic glass walls provide breathtaking views of Hyderabad\'s skyline, accompanied by a rooftop observatory and temperature-controlled swimming pool.\n\nSituated in the heart of Kokapet with seamless access to the Financial District, Rise By 9 represents a private sanctuary for distinguished homeowners. Expressions of interest are currently being registered for exclusive, invitation-only preview allocations prior to the official launch.',
    keyHighlights: [
      'Limited-edition high-rise residences with maximum privacy',
      'Exclusive 2 residences per floor with dedicated dual elevators',
      'Ultra-expansive 4 and 5 BHK sky villas overlooking city horizon',
      'Register interest for private invitation-only unveiling'
    ],
    keySpecs: [
      { label: 'Project Status', value: 'Upcoming Launch' },
      { label: 'Expected Configurations', value: '4 & 5 BHK Sky Villas' },
      { label: 'Estimated Sizes', value: '3,500 – 6,000 sq.ft.' },
      { label: 'Density', value: 'Low-Density Luxury (2 Units / Floor)' },
      { label: 'Location', value: 'Neopolis Corridor, Kokapet' }
    ],
    amenities: [
      { name: 'Private Elevator Lobbies', category: 'Architecture' },
      { name: 'Sky Observatory', category: 'Skyline' },
      { name: 'Temperature Controlled Pool', category: 'Wellness' },
      { name: 'Private Banquet Lounge', category: 'Hospitality' }
    ],
    reraNumber: 'Registration In Progress',
    possessionYear: 'To Be Announced',
    ctaLabel: 'Register Interest',
    developerName: 'Rise Group'
  }
];

export const WHY_INVEST_NEOPOLIS = [
  {
    id: 'infrastructure',
    title: 'World-Class Infrastructure',
    description: 'Master-planned layout by HMDA with 45-meter (150-ft) wide 8-lane boulevards, 100% subterranean utility ducts, and zero overhead wires.',
    iconName: 'Building2',
    metric: '45m Wide Roads'
  },
  {
    id: 'connectivity',
    title: 'Trump Card Connectivity',
    description: 'Direct signal-free Kokapet Trumpet Interchange linking Outer Ring Road (ORR) in under 2 minutes, reaching Financial District in 5 mins.',
    iconName: 'Compass',
    metric: '~5 Min to Fin District'
  },
  {
    id: 'roi',
    title: 'High Investment & Capital Growth',
    description: 'Hyderabad’s highest land auction value corridor with institutional backing, assuring rapid capital appreciation and blue-chip tenant demand.',
    iconName: 'TrendingUp',
    metric: 'Top Tier ROI Corridor'
  },
  {
    id: 'luxury',
    title: 'Premium High-Rise Living',
    description: 'Strict high-rise zoning allows 50+ storey architectural icons with panoramic green vistas of Osman Sagar and Gandipet lake horizons.',
    iconName: 'ShieldCheck',
    metric: '50+ Storey Landmarks'
  },
  {
    id: 'lifestyle',
    title: 'Integrated Modern Lifestyle',
    description: 'Minutes away from premier international schools, multi-specialty hospitals, golf courses, luxury retail malls, and fine-dining clubs.',
    iconName: 'Sparkles',
    metric: 'Elite Social Fabric'
  },
  {
    id: 'future',
    title: 'Future Development Hub',
    description: 'Planned commercial tech towers and corporate headquarters adjacent to residential sectors ensure walk-to-work convenience.',
    iconName: 'Globe',
    metric: '530+ Acre Masterplan'
  }
];

export const CONNECTIVITY_DESTINATIONS = [
  {
    category: 'IT & Business Hubs',
    items: [
      { name: 'Financial District (Microsoft, Amazon, Apple)', distance: '3.2 km', travelTime: '5 Mins' },
      { name: 'Wipro Circle & Waverock SEZ', distance: '4.8 km', travelTime: '7 Mins' },
      { name: 'HITEC City & Cyber Towers', distance: '8.5 km', travelTime: '12 Mins' },
      { name: 'Knowledge City & Mindspace', distance: '9.2 km', travelTime: '14 Mins' }
    ]
  },
  {
    category: 'Top International Schools',
    items: [
      { name: 'The Gaudium School (Kokapet)', distance: '2.5 km', travelTime: '4 Mins' },
      { name: 'Oakridge International School', distance: '6.0 km', travelTime: '8 Mins' },
      { name: 'Chirec International School', distance: '8.0 km', travelTime: '12 Mins' },
      { name: 'Delhi Public School (Gachibowli)', distance: '7.5 km', travelTime: '10 Mins' }
    ]
  },
  {
    category: 'Hospitals & Healthcare',
    items: [
      { name: 'Continental Hospitals (Financial District)', distance: '4.0 km', travelTime: '6 Mins' },
      { name: 'Care Hospitals (Gachibowli)', distance: '7.0 km', travelTime: '10 Mins' },
      { name: 'AIG Hospitals (Gachibowli)', distance: '8.5 km', travelTime: '12 Mins' },
      { name: 'Apollo Cradle (Kondapur)', distance: '9.8 km', travelTime: '15 Mins' }
    ]
  },
  {
    category: 'Transit & Arterial Roads',
    items: [
      { name: 'Kokapet ORR Trumpet Flyover (Exit 1)', distance: '0.8 km', travelTime: '2 Mins' },
      { name: 'Outer Ring Road (ORR 8-Lane)', distance: '1.0 km', travelTime: '2 Mins' },
      { name: 'Rajiv Gandhi Int. Airport (RGIA)', distance: '24 km', travelTime: '22 Mins' },
      { name: 'Raidurg Metro Station', distance: '9.0 km', travelTime: '14 Mins' }
    ]
  }
];

export const FAQS = [
  {
    question: 'What is the starting price range for apartments in Neopolis, Kokapet?',
    answer: 'Apartment prices in Neopolis Kokapet typically start from ₹2.95 Cr for premium 3 BHK residences, extending to ₹6.5 Cr+ for large-format 4 and 5 BHK sky manors. Ultra-luxury penthouses and duplex residences can range from ₹8 Cr to ₹14 Cr depending on the developer, tower height, floor rise, and lake views.'
  },
  {
    question: 'What configurations are available across Neopolis properties?',
    answer: 'Residential offerings primarily focus on luxury large-format configurations including 3 BHK, 3.5 BHK (with dedicated home office/study), 4 BHK, and 5 BHK sky villas ranging in size from approximately 2,424 sq.ft. to upwards of 5,472 sq.ft.'
  },
  {
    question: 'Are all projects in Neopolis registered with Telangana RERA?',
    answer: 'Yes, all projects currently marketed in Neopolis comply with Telangana State Real Estate Regulatory Authority (TS RERA) guidelines. Registered projects feature official RERA registration numbers (e.g. Sattva Lakeridge: P02400005820, Brigade Barcelona: P02400007812). Upcoming projects are marked as "Under Registration / Application".'
  },
  {
    question: 'What makes the infrastructure of Neopolis, Kokapet unique in Hyderabad?',
    answer: 'Neopolis is an ultra-modern 530+ acre master-planned greenfield development executed by HMDA. It features 45-meter (150-ft) wide multi-lane arterial roads, a 100% subterranean utility corridor (meaning zero hanging electrical or telecom cables), dedicated cycle tracks, advanced storm-water drainage, and a direct grade-separated trumpet interchange with the Outer Ring Road.'
  },
  {
    question: 'How fast can I reach the Financial District and Rajiv Gandhi Airport?',
    answer: 'The Kokapet Trumpet Interchange connects directly to the 8-lane Outer Ring Road. Travel time to the Financial District is merely 5 minutes (3.2 km), HITEC City is approximately 12–15 minutes (8.5 km), and RGIA Shamshabad Airport is reached in 20–25 minutes signal-free.'
  },
  {
    question: 'What are the expected possession dates for the featured projects?',
    answer: 'Possession timelines vary: Sattva Lakeridge is slated for December 2027; Godrej Epoque is scheduled for 2028; Sattva Lago Phase 2 is targeting 2029; MSN Neopolis is targeting 2028-2029; and Brigade Barcelona is scheduled for 2032. Please contact our advisory desk for specific tower and phase completion schedules.'
  },
  {
    question: 'How can I schedule a private site visit or receive official brochures?',
    answer: 'You can submit the online enquiry form on this website with your preferred project and contact information. A dedicated Neopolis luxury property advisor will assist you with verified developer floor plans, pricing sheets, and arrange an escorted visit.'
  }
];

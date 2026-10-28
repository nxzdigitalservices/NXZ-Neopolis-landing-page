export type PropertyId = 'brigade-barcelona' | 'godrej-epoque' | 'sattva-lago';

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Amenities' | 'Master Plan';
  description?: string;
}

export interface FloorPlan {
  id: string;
  name: string;
  type: string;
  sft: string;
  bedrooms: number;
  bathrooms: number;
  balconies: string;
  highlights: string[];
}

export interface Property {
  id: PropertyId;
  name: string;
  developer: string;
  tagline: string;
  location: string;
  subLocation: string;
  coordinates: [number, number]; // [lat, lng]
  landArea: string;
  towers: string;
  floors: string;
  totalUnits: string;
  configurations: string[];
  sizeRange: string;
  amenitiesArea: string;
  possession: string;
  priceStarting: string;
  pricePerSqft?: string;
  reraStatus?: string;
  openTowers?: string;
  architecturalStyle: string;
  summary: string;
  keyHighlights: string[];
  amenities: {
    icon: string;
    name: string;
    description: string;
  }[];
  gallery: GalleryItem[];
  floorPlans: FloorPlan[];
  distanceMetrics: {
    destination: string;
    distance: string;
    time: string;
  }[];
}

export interface LeadSubmission {
  id: string;
  timestamp: string;
  fullName: string;
  phone: string;
  email: string;
  propertyInterest: string;
  configuration: string;
  budget?: string;
  preferredVisitDate?: string;
  notes?: string;
  sourcePage: string;
  syncedToGoogleSheets: boolean;
}

export interface EnquiryFormData {
  fullName: string;
  phone: string;
  email?: string;
  enquiryType?: string;
  propertyName?: string;
  propertyLocation?: string;
  message: string;
  pageUrl?: string;
  leadSource?: string;
}

export interface EnquirySubmissionRecord extends EnquiryFormData {
  id: string;
  submissionDateTime: string;
  submissionStatus: 'Submitted to Google Sheets' | 'Saved to Local Queue' | 'Failed';
  syncedToGoogleSheets: boolean;
  rowNumber?: number;
}

export interface LocationLandmark {
  name: string;
  category: 'Commercial' | 'Hospital' | 'School' | 'Transit' | 'Recreation';
  distance: string;
  travelTime: string;
  coordinates: [number, number];
}

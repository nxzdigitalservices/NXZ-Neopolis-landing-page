import { ProjectData, FAQS, PROJECTS_DATA } from '../data/projectsData';
import { getCanonicalUrl, getProjectSlug } from './slug';

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  og: {
    title: string;
    description: string;
    url: string;
    image: string;
    type: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  jsonLd: Record<string, any>;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&h=630&q=85';
const BRAND_NAME = 'Neopolis Luxury Residences';

export function getPageMetadata(
  pathname: string,
  project?: ProjectData | null,
  domain?: string
): PageMetadata {
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const canonical = getCanonicalUrl(cleanPath, domain);

  // 1. Individual Property Detail Page
  if (project) {
    const slug = getProjectSlug(project);
    const propertyCanonical = getCanonicalUrl(`/properties/${slug}`, domain);
    const title = `${project.name} | Luxury Apartments in Neopolis, Kokapet`;
    const description = `${project.name} in Neopolis, Kokapet: ${project.configurations.join(', ')} ultra-luxury apartments from ${project.startingPrice}. Floor plans, price lists & site visits.`.slice(0, 160);
    const image = project.image.startsWith('http') 
      ? project.image 
      : getCanonicalUrl(project.image, domain);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ApartmentComplex',
      'name': project.name,
      'description': project.headline || project.description.slice(0, 200),
      'url': propertyCanonical,
      'image': image,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': project.location,
        'addressLocality': 'Kokapet',
        'addressRegion': 'Telangana',
        'postalCode': '500075',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 17.4068,
        'longitude': 78.3341
      },
      'numberOfRooms': project.configurations.join(', '),
      'floorSize': {
        '@type': 'QuantitativeValue',
        'value': project.areaRange
      },
      ...(project.reraNumber && !project.reraNumber.includes('Progress') ? {
        'legalName': `TS RERA: ${project.reraNumber}`
      } : {}),
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'INR',
        'lowPrice': project.startingPrice.replace(/[^0-9.]/g, '') || undefined,
        'availability': 'https://schema.org/InStock'
      }
    };

    return {
      title,
      description,
      canonical: propertyCanonical,
      robots: 'index, follow',
      og: {
        title,
        description,
        url: propertyCanonical,
        image,
        type: 'article',
        siteName: BRAND_NAME
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        image
      },
      jsonLd
    };
  }

  // 2. Properties Archive Listing Page (/properties)
  if (cleanPath === '/properties') {
    const title = 'Properties in Neopolis, Kokapet | Luxury High-Rise Residences';
    const description = `Explore all ${PROJECTS_DATA.length} luxury residential towers in Neopolis, Kokapet, Hyderabad: MSN Neopolis, Sattva Lakeridge, Brigade Barcelona & more with verified prices.`.slice(0, 160);
    
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Luxury Residential Projects in Neopolis, Kokapet',
      'description': description,
      'url': canonical,
      'numberOfItems': PROJECTS_DATA.length,
      'itemListElement': PROJECTS_DATA.map((p, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': p.name,
        'url': getCanonicalUrl(`/properties/${getProjectSlug(p)}`, domain)
      }))
    };

    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      og: {
        title,
        description,
        url: canonical,
        image: DEFAULT_IMAGE,
        type: 'website',
        siteName: BRAND_NAME
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        image: DEFAULT_IMAGE
      },
      jsonLd
    };
  }

  // 3. Contact Page (/contact)
  if (cleanPath === '/contact') {
    const title = 'Contact Us | Neopolis Luxury Real Estate Advisory, Kokapet';
    const description = 'Contact our certified Neopolis Kokapet property advisors for developer cost sheets, VIP site visits, unit availability, and investment consultation.'.slice(0, 160);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': title,
      'description': description,
      'url': canonical,
      'mainEntity': {
        '@type': 'RealEstateAgent',
        'name': BRAND_NAME,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Sandhu Apartments, Mahatma Gandhi Rd, General Bazaar',
          'addressLocality': 'Secunderabad',
          'addressRegion': 'Telangana',
          'postalCode': '500003',
          'addressCountry': 'IN'
        }
      }
    };

    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      og: {
        title,
        description,
        url: canonical,
        image: DEFAULT_IMAGE,
        type: 'website',
        siteName: BRAND_NAME
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        image: DEFAULT_IMAGE
      },
      jsonLd
    };
  }

  // 4. Thank You Page (/thank-you)
  if (cleanPath === '/thank-you') {
    const title = 'Thank You | Neopolis Luxury Residences';
    const description = 'Thank you for your enquiry. A dedicated Neopolis luxury property advisor is reviewing your request and will connect with you shortly.';

    return {
      title,
      description,
      canonical,
      robots: 'noindex, follow', // Do not index thank-you pages
      og: {
        title,
        description,
        url: canonical,
        image: DEFAULT_IMAGE,
        type: 'website',
        siteName: BRAND_NAME
      },
      twitter: {
        card: 'summary',
        title,
        description,
        image: DEFAULT_IMAGE
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': title,
        'description': description
      }
    };
  }

  // 5. 404 Not Found Page
  if (cleanPath === '/404' || cleanPath.startsWith('/404')) {
    const title = 'Page Not Found (404) | Neopolis Luxury Residences';
    const description = 'The requested property or page could not be found. Explore current luxury residential apartments in Neopolis, Kokapet, Hyderabad.';

    return {
      title,
      description,
      canonical,
      robots: 'noindex, follow',
      og: {
        title,
        description,
        url: canonical,
        image: DEFAULT_IMAGE,
        type: 'website',
        siteName: BRAND_NAME
      },
      twitter: {
        card: 'summary',
        title,
        description,
        image: DEFAULT_IMAGE
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': title
      }
    };
  }

  // 6. Home Page (/) - Default
  const title = 'Neopolis Luxury Living | Premier Hyderabad Real Estate';
  const description = 'Exclusive luxury residential properties in Neopolis, Kokapet, Hyderabad: MSN Neopolis, Brigade Barcelona, Godrej Epoque & Sattva Lago Phase 2.'.slice(0, 160);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${canonical}#website`,
        'url': canonical,
        'name': BRAND_NAME,
        'description': description
      },
      {
        '@type': 'RealEstateAgent',
        '@id': `${canonical}#organization`,
        'name': BRAND_NAME,
        'url': canonical,
        'logo': DEFAULT_IMAGE,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Sandhu Apartments, Mahatma Gandhi Rd, General Bazaar',
          'addressLocality': 'Secunderabad',
          'addressRegion': 'Telangana',
          'postalCode': '500003',
          'addressCountry': 'IN'
        },
        'areaServed': {
          '@type': 'Place',
          'name': 'Neopolis, Kokapet, Hyderabad'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        'mainEntity': FAQS.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  };

  return {
    title,
    description,
    canonical,
    robots: 'index, follow',
    og: {
      title,
      description,
      url: canonical,
      image: DEFAULT_IMAGE,
      type: 'website',
      siteName: BRAND_NAME
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: DEFAULT_IMAGE
    },
    jsonLd
  };
}

/**
 * Updates DOM head elements in client-side React during route transitions.
 */
export function updateDocumentSEO(meta: PageMetadata): void {
  if (typeof document === 'undefined') return;

  // 1. Document title
  document.title = meta.title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attribute, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Primary Meta Tags
  setMetaTag('name', 'description', meta.description);
  setMetaTag('name', 'robots', meta.robots);

  // 4. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', meta.canonical);

  // 5. OpenGraph Tags
  setMetaTag('property', 'og:title', meta.og.title);
  setMetaTag('property', 'og:description', meta.og.description);
  setMetaTag('property', 'og:url', meta.og.url);
  setMetaTag('property', 'og:image', meta.og.image);
  setMetaTag('property', 'og:type', meta.og.type);
  setMetaTag('property', 'og:site_name', meta.og.siteName);

  // 6. Twitter Card Tags
  setMetaTag('name', 'twitter:card', meta.twitter.card);
  setMetaTag('name', 'twitter:title', meta.twitter.title);
  setMetaTag('name', 'twitter:description', meta.twitter.description);
  setMetaTag('name', 'twitter:image', meta.twitter.image);

  // 7. JSON-LD Structured Data script
  let scriptEl = document.querySelector('script#structured-data-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'structured-data-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(meta.jsonLd);
}

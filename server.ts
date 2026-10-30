import express from 'express';
import path from 'path';
import fs from 'fs';

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxG6c7yggSzX17KYZ_76gEJo9Fsh1W8vitwtqyAXQgr5coWIloEVm7lF36leDcZYmw/exec';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&h=630&q=85';
const BRAND_NAME = 'Neopolis Luxury Residences';

interface ProjectInfo {
  id: string;
  name: string;
  headline: string;
  description: string;
  location: string;
  propertyType: string;
  configurations: string[];
  startingPrice: string;
  image: string;
  areaRange: string;
  reraNumber?: string;
}

const PROJECTS: ProjectInfo[] = [
  {
    id: 'msn-neopolis',
    name: 'MSN Neopolis',
    headline: 'Upcoming Landmark Luxury Residential Development in Neopolis, Kokapet',
    description: 'Upcoming 56-storey landmark residential development by MSN Group on a prime 7-acre parcel in Neopolis, Kokapet, Hyderabad featuring 3 and 4 BHK luxury residences and an iconic 2,30,000 sq.ft. clubhouse.',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Ultra-Luxury High-Rise Residences',
    configurations: ['3 BHK', '4 BHK'],
    startingPrice: '₹3.26 Cr*',
    image: '/projects/msn-neopolis/1.webp',
    areaRange: '2,424 – 4,545 sq.ft.',
    reraNumber: 'TS RERA Under Registration'
  },
  {
    id: 'sattva-lakeridge',
    name: 'Sattva Lakeridge',
    headline: 'High-Rise Luxury in Hyderabad’s Most Promising Location',
    description: 'Ultra-luxury lakefront residential community by Sattva Group spanning 9.5 acres with 6 soaring 37-storey towers overlooking Osman Sagar lake in Neopolis, Kokapet.',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Ultra-Luxury High-Rise Apartments',
    configurations: ['3 BHK', '4 BHK', '5 BHK'],
    startingPrice: '₹2.95 Cr*',
    image: '/projects/sattva-lakeridge/1.webp',
    areaRange: '2,744 – 5,472 sq.ft.',
    reraNumber: 'P02400005820'
  },
  {
    id: 'brigade-barcelona',
    name: 'Brigade Barcelona',
    headline: 'Spanish-Inspired Architecture. Contemporary Luxury.',
    description: 'Spanish-inspired 52-storey luxury condominium tower by Brigade Group in Neopolis Phase III, Kokapet, Hyderabad featuring 666 curated residences and 1.5 Lakh sq.ft. mega clubhouse.',
    location: 'Neopolis Phase III, Kokapet, Hyderabad',
    propertyType: 'Spanish-Themed Luxury Condominiums',
    configurations: ['3 BHK', '3.5 BHK', '4 BHK'],
    startingPrice: '₹3.10 Cr*',
    image: '/projects/brigade-barcelona/1.webp',
    areaRange: '2,790 – 3,764 sq.ft.',
    reraNumber: 'P02400007812'
  },
  {
    id: 'godrej-epoque',
    name: 'Godrej Epoque',
    headline: 'An Iconic Expression of Contemporary Luxury',
    description: 'Prestigious 57-storey luxury landmark by Godrej Properties featuring Art Deco geometry, high-altitude Sky Bridge, and palatial residences in Neopolis, Kokapet.',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Art Deco Iconic Sky Residences',
    configurations: ['3 BHK', '4 BHK'],
    startingPrice: '₹3.80 Cr*',
    image: '/projects/godrej-epoque/1.webp',
    areaRange: '3,200 – 4,800 sq.ft.',
    reraNumber: 'P02400006240'
  },
  {
    id: 'sattva-lago-phase-2',
    name: 'Sattva Lago — Phase 2',
    headline: 'Elevated Living. Expansive Spaces.',
    description: 'Waterfront master development across 10 acres by Sattva Group with G+46 storey towers and large-format sky residences with private terraces in Neopolis, Kokapet.',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Waterfront Large-Format Residences',
    configurations: ['3 BHK', '3.5 BHK', '4 BHK'],
    startingPrice: '₹3.25 Cr*',
    image: '/projects/sattva-lago-phase-2/1.webp',
    areaRange: '3,100 – 4,900 sq.ft.',
    reraNumber: 'P02400008450'
  },
  {
    id: 'cascades',
    name: 'Cascades',
    headline: 'A New Architectural Icon on the Horizon',
    description: 'Biophilic high-rise residences in Sector 2 of Neopolis, Kokapet featuring cascading water features, vertical green gardens, and luxury 3 & 4 BHK apartments.',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Biophilic High-Rise Residences',
    configurations: ['3 BHK', '4 BHK'],
    startingPrice: '₹3.15 Cr*',
    image: '/projects/cascades/1.webp',
    areaRange: '2,900 – 4,200 sq.ft.',
    reraNumber: 'Registration In Progress'
  },
  {
    id: 'rise-by-9',
    name: 'Rise By 9',
    headline: 'Your Next Luxury Address Could Be Here',
    description: 'Ultra-exclusive boutique sky villas in Neopolis, Kokapet featuring low-density luxury with only 2 residences per floor and private elevator lobbies.',
    location: 'Neopolis, Kokapet, Hyderabad',
    propertyType: 'Bespoke Sky Residences',
    configurations: ['4 & 5 BHK'],
    startingPrice: 'Contact for Price',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=85',
    areaRange: '3,500 – 6,000 sq.ft.',
    reraNumber: 'Registration In Progress'
  }
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function findProjectBySlug(slug: string): ProjectInfo | undefined {
  if (!slug) return undefined;
  const clean = slugify(slug);
  return (
    PROJECTS.find((p) => slugify(p.id) === clean) ||
    PROJECTS.find((p) => slugify(p.name) === clean) ||
    PROJECTS.find((p) => slugify(p.id).startsWith(clean) || clean.startsWith(slugify(p.id)))
  );
}

function getBaseUrl(req: express.Request): string {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/+$/, '');
  }
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.get('host') || 'localhost:3000';
  return `${protocol}://${host}`;
}

function generateSitemapXml(baseUrl: string): string {
  const today = new Date().toISOString().split('T')[0];
  const urls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/properties`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/privacy-policy`, priority: '0.5', changefreq: 'monthly' },
    ...PROJECTS.map((p) => ({
      loc: `${baseUrl}/properties/${p.id}`,
      priority: '0.8',
      changefreq: 'weekly'
    }))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

function resolveSeoMetadata(cleanPath: string, project: ProjectInfo | null, baseUrl: string) {
  if (project) {
    const canonical = `${baseUrl}/properties/${project.id}`;
    const title = `${project.name} | Luxury Apartments in Neopolis, Kokapet`;
    const description = `${project.name} in Neopolis, Kokapet: ${project.configurations.join(', ')} ultra-luxury apartments from ${project.startingPrice}. Floor plans, price lists & site visits.`.slice(0, 160);
    const image = project.image.startsWith('http') ? project.image : `${baseUrl}${project.image}`;

    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      og: { title, description, url: canonical, image, type: 'article' },
      twitter: { card: 'summary_large_image', title, description, image },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ApartmentComplex',
        name: project.name,
        description: project.headline || project.description,
        url: canonical,
        image,
        address: {
          '@type': 'PostalAddress',
          streetAddress: project.location,
          addressLocality: 'Kokapet',
          addressRegion: 'Telangana',
          postalCode: '500075',
          addressCountry: 'IN'
        },
        numberOfRooms: project.configurations.join(', '),
        floorSize: { '@type': 'QuantitativeValue', value: project.areaRange }
      }
    };
  }

  if (cleanPath === '/properties') {
    const canonical = `${baseUrl}/properties`;
    const title = 'Properties in Neopolis, Kokapet | Luxury High-Rise Residences';
    const description = 'Explore all 7 luxury residential towers in Neopolis, Kokapet, Hyderabad: MSN Neopolis, Sattva Lakeridge, Brigade Barcelona & more with verified prices.'.slice(0, 160);
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      og: { title, description, url: canonical, image: DEFAULT_IMAGE, type: 'website' },
      twitter: { card: 'summary_large_image', title, description, image: DEFAULT_IMAGE },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Luxury Residential Projects in Neopolis, Kokapet',
        url: canonical,
        numberOfItems: PROJECTS.length
      }
    };
  }

  if (cleanPath === '/contact') {
    const canonical = `${baseUrl}/contact`;
    const title = 'Contact Us | Neopolis Luxury Real Estate Advisory, Kokapet';
    const description = 'Contact our certified Neopolis Kokapet property advisors for developer cost sheets, VIP site visits, unit availability, and investment consultation.'.slice(0, 160);
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      og: { title, description, url: canonical, image: DEFAULT_IMAGE, type: 'website' },
      twitter: { card: 'summary_large_image', title, description, image: DEFAULT_IMAGE },
      jsonLd: { '@context': 'https://schema.org', '@type': 'ContactPage', name: title, url: canonical }
    };
  }

  if (cleanPath === '/thank-you') {
    const canonical = `${baseUrl}/thank-you`;
    const title = 'Thank You | Neopolis Luxury Residences';
    const description = 'Thank you for your enquiry. A dedicated Neopolis luxury property advisor is reviewing your request and will connect with you shortly.';
    return {
      title,
      description,
      canonical,
      robots: 'noindex, follow',
      og: { title, description, url: canonical, image: DEFAULT_IMAGE, type: 'website' },
      twitter: { card: 'summary', title, description, image: DEFAULT_IMAGE },
      jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: title }
    };
  }

  if (cleanPath === '/privacy-policy') {
    const canonical = `${baseUrl}/privacy-policy`;
    const title = 'Privacy Policy – Neopolis Properties | Data Protection & Terms';
    const description = 'Privacy policy and data protection practices of Neopolis Properties, operated by NXZ Designing & Engineering Services, in compliance with DPDP Act 2023.'.slice(0, 160);
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      og: { title, description, url: canonical, image: DEFAULT_IMAGE, type: 'website' },
      twitter: { card: 'summary', title, description, image: DEFAULT_IMAGE },
      jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Privacy Policy – Neopolis Properties', description, url: canonical }
    };
  }

  if (cleanPath === '/404') {
    const canonical = `${baseUrl}/404`;
    const title = 'Page Not Found (404) | Neopolis Luxury Residences';
    const description = 'The requested property or page could not be found. Explore current luxury residential apartments in Neopolis, Kokapet, Hyderabad.';
    return {
      title,
      description,
      canonical,
      robots: 'noindex, follow',
      og: { title, description, url: canonical, image: DEFAULT_IMAGE, type: 'website' },
      twitter: { card: 'summary', title, description, image: DEFAULT_IMAGE },
      jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: title }
    };
  }

  // Home Page default
  const canonical = `${baseUrl}/`;
  const title = 'Neopolis Luxury Living | Premier Hyderabad Real Estate';
  const description = 'Exclusive luxury residential properties in Neopolis, Kokapet, Hyderabad: MSN Neopolis, Brigade Barcelona, Godrej Epoque & Sattva Lago Phase 2.'.slice(0, 160);
  return {
    title,
    description,
    canonical,
    robots: 'index, follow',
    og: { title, description, url: canonical, image: DEFAULT_IMAGE, type: 'website' },
    twitter: { card: 'summary_large_image', title, description, image: DEFAULT_IMAGE },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: BRAND_NAME,
      url: canonical,
      image: DEFAULT_IMAGE
    }
  };
}

function injectMetadataIntoHtml(html: string, meta: ReturnType<typeof resolveSeoMetadata>): string {
  let modified = html;

  // Title
  modified = modified.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // Description
  if (/<meta\s+name="description"[^>]*>/i.test(modified)) {
    modified = modified.replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />`
    );
  } else {
    modified = modified.replace(
      '</head>',
      `    <meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />\n  </head>`
    );
  }

  // Robots
  if (/<meta\s+name="robots"[^>]*>/i.test(modified)) {
    modified = modified.replace(/<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="${meta.robots}" />`);
  } else {
    modified = modified.replace('</head>', `    <meta name="robots" content="${meta.robots}" />\n  </head>`);
  }

  // Canonical
  if (/<link\s+rel="canonical"[^>]*>/i.test(modified)) {
    modified = modified.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${meta.canonical}" />`);
  } else {
    modified = modified.replace('</head>', `    <link rel="canonical" href="${meta.canonical}" />\n  </head>` );
  }

  // Social & JSON-LD
  const tags = `
    <meta property="og:title" content="${meta.og.title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${meta.og.description.replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${meta.og.url}" />
    <meta property="og:image" content="${meta.og.image}" />
    <meta property="og:type" content="${meta.og.type}" />
    <meta property="og:site_name" content="${BRAND_NAME}" />
    <meta name="twitter:card" content="${meta.twitter.card}" />
    <meta name="twitter:title" content="${meta.twitter.title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${meta.twitter.description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${meta.twitter.image}" />
    <script id="structured-data-jsonld" type="application/ld+json">
${JSON.stringify(meta.jsonLd, null, 2)}
    </script>
`;

  modified = modified
    .replace(/<meta\s+property="og:[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^>]*>/gi, '')
    .replace(/<script\s+id="structured-data-jsonld"[^>]*>[\s\S]*?<\/script>/gi, '');

  modified = modified.replace('</head>', `${tags}\n  </head>`);
  return modified;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(path.resolve(process.cwd(), 'dist', 'index.html'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 1. Robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = getBaseUrl(req);
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nDisallow: /thank-you\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  // 2. Sitemap.xml
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = getBaseUrl(req);
    res.type('application/xml');
    res.send(generateSitemapXml(baseUrl));
  });

  // 3. Google Sheets Proxy API
  app.post('/api/enquiry', async (req, res) => {
    try {
      const payload = req.body;
      const scriptResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      const responseText = await scriptResponse.text();
      let parsedData: any = {};
      try {
        parsedData = JSON.parse(responseText);
      } catch {
        parsedData = { raw: responseText };
      }

      return res.json({
        success: true,
        message: 'Enquiry submitted to Google Sheets successfully.',
        data: parsedData
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to forward enquiry to Google Sheets.',
        error: error.message
      });
    }
  });

  // 4. Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 5. Serving Frontend
  if (isProduction) {
    const distPath = path.resolve(process.cwd(), 'dist');
    const indexHtmlPath = path.resolve(distPath, 'index.html');

    app.use(express.static(distPath, { index: false }));

    app.get('*', (req, res) => {
      try {
        let html = fs.readFileSync(indexHtmlPath, 'utf-8');
        const baseUrl = getBaseUrl(req);
        const reqPath = req.path;
        const cleanPath = reqPath === '/' ? '/' : reqPath.replace(/\/+$/, '');

        let matchedProject: ProjectInfo | null = null;
        if (cleanPath.startsWith('/properties/')) {
          const slug = cleanPath.replace(/^\/properties\/?/, '');
          matchedProject = findProjectBySlug(slug) || null;
        }

        const isKnownStatic = cleanPath === '/' || cleanPath === '/properties' || cleanPath === '/contact' || cleanPath === '/thank-you' || cleanPath === '/privacy-policy';
        const isKnownProperty = cleanPath.startsWith('/properties/') && !!matchedProject;
        const isNotFound = !isKnownStatic && !isKnownProperty;

        const effectivePath = isNotFound ? '/404' : cleanPath;
        const meta = resolveSeoMetadata(effectivePath, matchedProject, baseUrl);
        html = injectMetadataIntoHtml(html, meta);

        if (isNotFound) {
          res.status(404);
        }

        res.type('html').send(html);
      } catch (err) {
        res.sendFile(indexHtmlPath);
      }
    });
  } else {
    // Development mode with dynamic Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'custom'
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const templatePath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);

        const baseUrl = getBaseUrl(req);
        const cleanPath = url.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';

        let matchedProject: ProjectInfo | null = null;
        if (cleanPath.startsWith('/properties/')) {
          const slug = cleanPath.replace(/^\/properties\/?/, '');
          matchedProject = findProjectBySlug(slug) || null;
        }

        const isKnownStatic = cleanPath === '/' || cleanPath === '/properties' || cleanPath === '/contact' || cleanPath === '/thank-you' || cleanPath === '/privacy-policy';
        const isKnownProperty = cleanPath.startsWith('/properties/') && !!matchedProject;
        const isNotFound = !isKnownStatic && !isKnownProperty;

        const effectivePath = isNotFound ? '/404' : cleanPath;
        const meta = resolveSeoMetadata(effectivePath, matchedProject, baseUrl);
        template = injectMetadataIntoHtml(template, meta);

        if (isNotFound) {
          res.status(404);
        }

        res.status(res.statusCode || 200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { PROJECTS_DATA } from './src/data/projectsData';
import { getProjectBySlug, getProjectSlug, getCanonicalUrl } from './src/utils/slug';
import { getPageMetadata, PageMetadata } from './src/utils/seo';

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxG6c7yggSzX17KYZ_76gEJo9Fsh1W8vitwtqyAXQgr5coWIloEVm7lF36leDcZYmw/exec';

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
  const staticUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/properties`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
  ];

  const projectUrls = PROJECTS_DATA.map((p) => ({
    loc: `${baseUrl}/properties/${getProjectSlug(p)}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const allUrls = [...staticUrls, ...projectUrls];

  const xmlEntries = allUrls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

function injectMetadataIntoHtml(html: string, meta: PageMetadata): string {
  let modified = html;

  // Replace Title
  modified = modified.replace(
    /<title>.*?<\/title>/i,
    `<title>${meta.title}</title>`
  );

  // Replace or add Meta Description
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

  // Replace or add Robots
  if (/<meta\s+name="robots"[^>]*>/i.test(modified)) {
    modified = modified.replace(
      /<meta\s+name="robots"[^>]*>/i,
      `<meta name="robots" content="${meta.robots}" />`
    );
  } else {
    modified = modified.replace(
      '</head>',
      `    <meta name="robots" content="${meta.robots}" />\n  </head>`
    );
  }

  // Replace or add Canonical
  if (/<link\s+rel="canonical"[^>]*>/i.test(modified)) {
    modified = modified.replace(
      /<link\s+rel="canonical"[^>]*>/i,
      `<link rel="canonical" href="${meta.canonical}" />`
    );
  } else {
    modified = modified.replace(
      '</head>',
      `    <link rel="canonical" href="${meta.canonical}" />\n  </head>`
    );
  }

  // Inject or update OpenGraph and Twitter tags
  const socialMetaTags = `
    <!-- Dynamic Open Graph & Social Cards -->
    <meta property="og:title" content="${meta.og.title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${meta.og.description.replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${meta.og.url}" />
    <meta property="og:image" content="${meta.og.image}" />
    <meta property="og:type" content="${meta.og.type}" />
    <meta property="og:site_name" content="${meta.og.siteName.replace(/"/g, '&quot;')}" />
    <meta name="twitter:card" content="${meta.twitter.card}" />
    <meta name="twitter:title" content="${meta.twitter.title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${meta.twitter.description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${meta.twitter.image}" />
    <!-- Structured Data JSON-LD -->
    <script id="structured-data-jsonld" type="application/ld+json">
${JSON.stringify(meta.jsonLd, null, 2)}
    </script>
`;

  // Remove previous og/twitter tags if any
  modified = modified
    .replace(/<meta\s+property="og:[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^>]*>/gi, '')
    .replace(/<script\s+id="structured-data-jsonld"[^>]*>[\s\S]*?<\/script>/gi, '');

  modified = modified.replace('</head>', `${socialMetaTags}\n  </head>`);

  return modified;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 1. Robots.txt endpoint
  app.get('/robots.txt', (req, res) => {
    const baseUrl = getBaseUrl(req);
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /thank-you
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`);
  });

  // 2. Sitemap.xml endpoint
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = getBaseUrl(req);
    const sitemapXml = generateSitemapXml(baseUrl);
    res.type('application/xml');
    res.send(sitemapXml);
  });

  // 3. Server-side proxy for enquiry submissions
  app.post('/api/enquiry', async (req, res) => {
    try {
      const payload = req.body;
      console.log('Forwarding enquiry to Google Sheets:', payload);

      const scriptResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });

      const responseText = await scriptResponse.text();
      console.log('Google Apps Script response:', responseText);

      let parsedData: any = {};
      try {
        parsedData = JSON.parse(responseText);
      } catch {
        parsedData = { raw: responseText };
      }

      return res.json({
        success: true,
        message: 'Enquiry submitted to Google Sheets successfully.',
        data: parsedData,
      });
    } catch (error: any) {
      console.error('Error in /api/enquiry:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to forward enquiry to Google Sheets.',
        error: error.message,
      });
    }
  });

  // 4. Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 5. Client & SPA Route Serving (with server-side SEO metadata injection)
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(process.cwd(), 'dist');
    const indexHtmlPath = path.resolve(distPath, 'index.html');

    app.use(express.static(distPath, { index: false }));

    app.get('*', (req, res) => {
      try {
        let html = fs.readFileSync(indexHtmlPath, 'utf-8');
        const baseUrl = getBaseUrl(req);
        const reqPath = req.path;

        const cleanPath = reqPath === '/' ? '/' : reqPath.replace(/\/+$/, '');
        let matchedProject: any = null;
        if (cleanPath.startsWith('/properties/')) {
          const slug = cleanPath.replace(/^\/properties\/?/, '');
          matchedProject = getProjectBySlug(slug) || null;
        }
        const isKnownStaticRoute = cleanPath === '/' || cleanPath === '/properties' || cleanPath === '/contact' || cleanPath === '/thank-you';
        const isKnownPropertyRoute = cleanPath.startsWith('/properties/') && !!matchedProject;
        const isNotFound = !isKnownStaticRoute && !isKnownPropertyRoute;

        const effectivePath = isNotFound ? '/404' : cleanPath;
        const meta = getPageMetadata(effectivePath, matchedProject, baseUrl);
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
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    // Fallback HTML handler in dev to inject SEO tags for direct curls & bots
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const templatePath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);

        const baseUrl = getBaseUrl(req);
        const cleanPath = url.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
        let matchedProject: any = null;
        if (cleanPath.startsWith('/properties/')) {
          const slug = cleanPath.replace(/^\/properties\/?/, '');
          matchedProject = getProjectBySlug(slug) || null;
        }

        const isKnownStaticRoute = cleanPath === '/' || cleanPath === '/properties' || cleanPath === '/contact' || cleanPath === '/thank-you';
        const isKnownPropertyRoute = cleanPath.startsWith('/properties/') && !!matchedProject;
        const isNotFound = !isKnownStaticRoute && !isKnownPropertyRoute;

        const effectivePath = isNotFound ? '/404' : cleanPath;
        const meta = getPageMetadata(effectivePath, matchedProject, baseUrl);
        template = injectMetadataIntoHtml(template, meta);

        if (isNotFound) {
          res.status(404);
        }

        res.set({ 'Content-Type': 'text/html' }).end(template);
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

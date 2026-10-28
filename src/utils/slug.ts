import { ProjectData, PROJECTS_DATA } from '../data/projectsData';

/**
 * Normalizes any string into a clean, lowercase, hyphen-separated SEO slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove special characters
    .replace(/[\s_-]+/g, '-') // replace spaces, underscores with single hyphen
    .replace(/^-+|-+$/g, ''); // trim leading & trailing hyphens
}

/**
 * Gets the canonical URL slug for a given project.
 */
export function getProjectSlug(project: ProjectData): string {
  if (project.id && project.id.trim()) {
    return slugify(project.id);
  }
  return slugify(project.name);
}

/**
 * Finds a project by its URL slug reliably.
 * Supports matching against project.id, slugified project name, and variations.
 */
export function getProjectBySlug(slug: string): ProjectData | undefined {
  if (!slug) return undefined;
  const cleanSlug = slugify(slug);

  // 1. Direct match on project.id
  const directMatch = PROJECTS_DATA.find(
    (p) => slugify(p.id) === cleanSlug
  );
  if (directMatch) return directMatch;

  // 2. Match on slugified project name
  const nameMatch = PROJECTS_DATA.find(
    (p) => slugify(p.name) === cleanSlug
  );
  if (nameMatch) return nameMatch;

  // 3. Fallback partial match for common aliases (e.g., "sattva-lago" for "sattva-lago-phase-2")
  return PROJECTS_DATA.find((p) => {
    const idSlug = slugify(p.id);
    const nSlug = slugify(p.name);
    return idSlug.startsWith(cleanSlug) || cleanSlug.startsWith(idSlug) || nSlug.includes(cleanSlug);
  });
}

/**
 * Builds a clean canonical URL for a path.
 */
export function getCanonicalUrl(path: string, domain?: string): string {
  const baseDomain = domain || 
    (typeof window !== 'undefined' ? window.location.origin : '') || 
    'https://neopolisproperties.in';
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Standardize: no trailing slash for sub-paths, root is '/'
  const normalizedPath = cleanPath === '/' ? '/' : cleanPath.replace(/\/+$/, '');
  
  return `${baseDomain.replace(/\/+$/, '')}${normalizedPath}`;
}

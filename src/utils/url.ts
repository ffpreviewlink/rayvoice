/**
 * Prefixes an internal path with the configured `base` (see BASE_PATH in astro.config.mjs).
 * With the default base ('/') it returns the path unchanged, so production output is identical.
 * Use it for every internal href / src / fetch; never for external URLs, mailto: or astro:assets imports.
 */
export const url = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p);

/** Strips the `base` prefix from a pathname, e.g. '/rayvoice/showreels/' -> '/showreels/'. */
export const stripBase = (pathname: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base && (pathname === base || pathname.startsWith(base + '/')) ? pathname.slice(base.length) || '/' : pathname;
};

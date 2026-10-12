import type { APIRoute } from 'astro';
import { isPreview } from '../data/site';
import { url } from '../utils/url';

export const GET: APIRoute = ({ site }) =>
  new Response(
    // Previews (any SITE_URL other than the production domain) are never indexable.
    isPreview(site) ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(url('/sitemap.xml'), site).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );

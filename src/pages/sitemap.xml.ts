import type { APIRoute } from 'astro';
import { url } from '../utils/url';

/** Public routes, same URLs as the original site. */
const routes = ['/', '/showreels', '/contacts'];

export const GET: APIRoute = ({ site }) => {
  const urls = routes.map((route) => `  <url><loc>${new URL(url(route), site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

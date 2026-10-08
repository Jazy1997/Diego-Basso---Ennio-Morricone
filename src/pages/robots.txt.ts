// robots.txt (ARCHITECTURE.md §12): aperto con la sitemap solo quando PUBLIC_INDICIZZA=true (go-live, T41),
// altrimenti chiuso a tutti, come il noindex di Seo.astro.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const indicizza = import.meta.env.PUBLIC_INDICIZZA === 'true';
  const testo = indicizza
    ? `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(testo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

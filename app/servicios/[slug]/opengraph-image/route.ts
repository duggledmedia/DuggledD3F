import { serviceCatalog } from '@/lib/service-catalog';
import { siteOrigin } from '@/lib/site-url';

// Keep previously shared image URLs working, without runtime image generation.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!serviceCatalog.some(service => service.id === slug)) {
    return new Response('Not found', { status: 404 });
  }
  return Response.redirect(`${siteOrigin}/services-og/${slug}.jpg`, 307);
}

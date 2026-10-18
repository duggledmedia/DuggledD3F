import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/site-url';
import { serviceCatalog } from '@/lib/service-catalog';

// Todas las landings comparten la ruta dinámica /servicios/[slug].
// El catálogo es la única fuente de URLs para evitar omisiones o duplicados.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteOrigin, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteOrigin}/automatizaciones`, changeFrequency: 'monthly', priority: 0.9 },
    ...serviceCatalog.map(service => ({
      url: `${siteOrigin}/servicios/${service.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}

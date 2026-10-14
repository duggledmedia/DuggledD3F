import type {MetadataRoute} from 'next';
import {siteOrigin} from '@/lib/site-url';
import {serviceCatalog} from '@/lib/service-catalog';
export default function sitemap():MetadataRoute.Sitemap{return [{url:siteOrigin,lastModified:new Date(),changeFrequency:'monthly',priority:1},...serviceCatalog.map(service=>({url:`${siteOrigin}/servicios/${service.id}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:.8}))]}

import type {MetadataRoute} from 'next';
import {siteOrigin} from '@/lib/site-url';
export default function sitemap():MetadataRoute.Sitemap{return [{url:siteOrigin,lastModified:new Date(),changeFrequency:'monthly',priority:1}]}

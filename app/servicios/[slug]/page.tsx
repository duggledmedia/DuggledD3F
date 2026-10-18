import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import ShareService from '@/components/duggled/share-service';
import { contact } from '@/lib/content';
import { serviceCatalog } from '@/lib/service-catalog';
import { siteOrigin } from '@/lib/site-url';
import styles from './service-page.module.css';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return serviceCatalog.map(service => ({ slug: service.id })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceCatalog.find(item => item.id === slug);
  if (!service) return {};
  const url = `${siteOrigin}/servicios/${service.id}`;
  const image = `${siteOrigin}/services-og/${service.id}.jpg`;
  const title = `${service.label} en Argentina | Duggled`;
  return {
    title,
    description: `${service.description} Consultá el alcance y presupuesto con Duggled, Argentina.`,
    alternates: { canonical: url },
    openGraph: { type: 'website', locale: 'es_AR', siteName: 'Duggled', url, title, description: service.description, images: [{ url: image, width: 394, height: 700, type: 'image/jpeg', alt: `${service.label} — Duggled` }] },
    twitter: { card: 'summary_large_image', title, description: service.description, images: [image] },
  };
}

function inquiry(label: string) {
  const url = new URL(contact);
  url.searchParams.set('text', `Hola Duggled, me interesa ${label}. Quiero contarles sobre mi negocio y pedir un presupuesto.`);
  return url.toString();
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceCatalog.find(item => item.id === slug);
  if (!service) notFound();
  return <main className={styles.page}>
    <header className={styles.header}><Link href="/" className={styles.brand} aria-label="Duggled, volver al inicio"><span className={styles.mark} aria-hidden="true" /><span>duggled<span>.</span></span></Link><Link href="/#servicios" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Todos los servicios</Link></header>
    <section className={styles.hero}>
      <div className={styles.visual}><div className={styles.visualMeta}><span>{service.category}</span><span>{String(serviceCatalog.indexOf(service) + 1).padStart(2, '0')} / 08</span></div><Image src={service.image} width={941} height={1672} sizes="(max-width: 760px) calc(100vw - 36px), 38vw" priority alt={service.imageAlt} /></div>
      <div className={styles.content}>
        <span className={styles.eyebrow}>{service.label}</span>
        <h1>{service.title[0]}<br/><em>{service.title[1]}</em></h1>
        <p className={styles.description}>{service.description}</p>
        <div className={styles.commercial}><div><span>DESDE</span><strong><small>USD</small> {service.price}</strong><p>{service.unit}</p></div><div><span>{service.setup ? 'PUESTA EN MARCHA' : 'ENTREGA ESTIMADA'}</span><strong className={styles.deadline}>{service.deadline}</strong><p>{service.setup ? '+ gestión continua' : 'implementación por única vez'}</p></div></div>
        {service.setup && <p className={styles.setup}>Configuración inicial: <strong>USD {service.setup}</strong> por única vez.</p>}
        <div className={styles.actions}><a href={inquiry(service.label)} target="_blank" rel="noopener noreferrer">Quiero esta solución <ArrowUpRight size={21} aria-hidden="true" /></a><ShareService className={styles.share} slug={service.id} label={service.label} /></div>
        <div className={styles.includes}><span>QUÉ INCLUYE</span><ul>{service.includes.map(item => <li key={item}><Check size={16} aria-hidden="true"/><span>{item}</span></li>)}</ul><p>{service.exclusions}</p></div>
      </div>
    </section>
    <nav aria-label="Otros servicios" className={styles.related}><p>Otras soluciones para hacer crecer tu negocio</p><Link href="/automatizaciones">Automatizaciones para empresas ↗</Link>{serviceCatalog.filter(item=>item.id!==service.id).slice(0,3).map(item=><Link key={item.id} href={`/servicios/${item.id}`}>{item.label} ↗</Link>)}</nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'Service',name:service.label,description:service.description,provider:{'@type':'ProfessionalService',name:'Duggled',url:siteOrigin},areaServed:{'@type':'Country',name:'Argentina'},offers:{'@type':'Offer',price:service.price,priceCurrency:'USD',url:`${siteOrigin}/servicios/${service.id}`}}, {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Inicio',item:siteOrigin},{'@type':'ListItem',position:2,name:service.label,item:`${siteOrigin}/servicios/${service.id}` }]}]})}} />
  </main>;
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { contact } from '@/lib/content';
import { siteOrigin } from '@/lib/site-url';
import styles from './page.module.css';

const title='Automatizaciones para empresas e integraciones con IA | Duggled';
const description='Automatizamos consultas, formularios, seguimientos y tareas repetitivas. Conectamos WhatsApp, CRM y herramientas digitales para negocios en Argentina.';
const url=siteOrigin+'/automatizaciones';
export const metadata: Metadata={title,description,alternates:{canonical:url},openGraph:{title,description,url,type:'website',locale:'es_AR',images:[{url:'/opengraph-image',width:1200,height:630}]},twitter:{card:'summary_large_image',title,description}};
const questions=[
{q:'¿Qué puede automatizar Duggled?',a:'Podemos conectar formularios, consultas comerciales, avisos, recordatorios, gestión de prospectos y tareas repetitivas, según las herramientas que utilice cada negocio.'},
{q:'¿Se pueden integrar WhatsApp, un CRM y una página web?',a:'Sí, evaluamos el sistema actual, sus accesos y las integraciones disponibles. La implementación depende de las APIs y permisos de cada plataforma.'},
{q:'¿Usan inteligencia artificial?',a:'Cuando aporta valor, incorporamos IA para clasificar información, asistir en respuestas o agilizar procesos con revisión y controles adecuados.'},
{q:'¿Cuánto cuesta una automatización?',a:'El presupuesto depende del alcance, las plataformas, el volumen de operaciones y el mantenimiento necesario. Primero revisamos el proceso que querés resolver.'}];
export default function Automatizaciones(){
const wa=new URL(contact);wa.searchParams.set('text','Hola Duggled, quiero consultar por automatizaciones para mi negocio.');
const structured={'@context':'https://schema.org','@graph':[{'@type':'Service','@id':url+'#service',name:'Automatizaciones para empresas',serviceType:'Automatización de procesos e integraciones con IA',url,description,areaServed:{'@type':'Country',name:'Argentina'},provider:{'@type':'ProfessionalService',name:'Duggled',url:siteOrigin}},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Inicio',item:siteOrigin},{'@type':'ListItem',position:2,name:'Automatizaciones',item:url}]}]};
return <main className={styles.page}>
<header className={styles.header}><Link href="/" className={styles.brand}>duggled<span>.</span></Link><Link href="/#servicios">← Todos los servicios</Link></header>
<article className={styles.wrap}>
<span className={styles.kicker}>AUTOMATIZACIONES · INTEGRACIONES · IA</span>
<h1>Automatizaciones para empresas.<br/><em>Menos tareas repetitivas. Más tiempo para crecer.</em></h1>
<p className={styles.lead}>Conectamos las herramientas de tu negocio para que consultas, datos y seguimiento trabajen juntos. Diseñamos soluciones de automatización a medida para empresas y emprendedores en Argentina.</p>
<a className={styles.cta} href={wa.toString()} target="_blank" rel="noopener noreferrer">Consultar mi proyecto ↗</a>
<section><h2>¿Qué podemos conectar?</h2><div className={styles.grid}><div><h3>Consultas y seguimiento</h3><p>Integración de formularios web, contactos comerciales, notificaciones y seguimiento de prospectos.</p></div><div><h3>WhatsApp y CRM</h3><p>Organización de conversaciones y datos entre canales y sistemas, según las integraciones disponibles.</p></div><div><h3>Procesos con IA</h3><p>Asistencia para clasificación, organización de información y tareas que necesitan menos intervención manual.</p></div></div></section>
<section><h2>De una tarea manual a un proceso conectado</h2><ol><li>Relevamos el proceso actual, los problemas y los objetivos.</li><li>Definimos las herramientas, integraciones y controles.</li><li>Implementamos, probamos y documentamos la solución.</li><li>Medimos los resultados y proponemos mejoras.</li></ol></section>
<section><h2>Preguntas frecuentes</h2>{questions.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>
<section><h2>Una solución pensada para tu operación</h2><p>El alcance se define en función de tus canales, las herramientas que ya usás y la información que necesitás gestionar. Si además necesitás captar consultas, podemos complementar el proyecto con <Link href="/servicios/web-corporativa">diseño web corporativo</Link>, <Link href="/servicios/google-ads">Google Ads</Link> o <Link href="/servicios/meta-ads">Meta Ads</Link>.</p><a className={styles.cta} href={wa.toString()} target="_blank" rel="noopener noreferrer">Hablemos de tu negocio ↗</a></section>
</article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured)}} /></main>;
}
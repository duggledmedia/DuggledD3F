'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react';
import { contact } from '@/lib/content';
import { serviceCatalog } from '@/lib/service-catalog';
import styles from './service-showroom.module.css';
import ShareService from './share-service';

const number = (index: number) => String(index + 1).padStart(2, '0');

export default function ServiceShowroom() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const mobileRail = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileCards = useRef<(HTMLElement | null)[]>([]);
  const current = serviceCatalog[active];

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.dataset.entered = 'true';
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function choose(index: number, focus = false) {
    const next = (index + serviceCatalog.length) % serviceCatalog.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus({ preventScroll: true });
    const tab = tabs.current[next];
    const container = rail.current;
    if (tab && container && container.scrollWidth > container.clientWidth) {
      container.scrollTo({
        left: tab.offsetLeft - container.offsetLeft - (container.clientWidth - tab.clientWidth) / 2,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
    const card = mobileCards.current[next];
    const mobileContainer = mobileRail.current;
    if (card && mobileContainer && mobileContainer.scrollWidth > mobileContainer.clientWidth) {
      mobileContainer.scrollTo({
        left: card.offsetLeft - mobileContainer.offsetLeft - (mobileContainer.clientWidth - card.clientWidth) / 2,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  }

  function syncMobileActive() {
    const container = mobileRail.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let distance = Number.POSITIVE_INFINITY;
    mobileCards.current.forEach((card, index) => {
      if (!card) return;
      const nextDistance = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
      if (nextDistance < distance) { distance = nextDistance; closest = index; }
    });
    setActive(previous => previous === closest ? previous : closest);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const destinations: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: serviceCatalog.length - 1 };
    if (event.key in destinations) {
      event.preventDefault();
      choose(destinations[event.key], true);
    }
  }

  function inquiry(label: string) {
    const url = new URL(contact);
    url.searchParams.set('text', `Hola Duggled, me interesa ${label}. Quiero contarles sobre mi negocio y pedir un presupuesto.`);
    return url.toString();
  }

  return (
    <section id="servicios" className={styles.showroom} ref={root} aria-labelledby="services-title">
      <div className={styles.inner}>
        <div className={styles.topline}><span>01 / SOLUCIONES DUGGLED</span><span>DISEÑO + TECNOLOGÍA + ESTRATEGIA</span></div>
        <div className={styles.intro}>
          <h2 id="services-title">Tu próximo paso.<br /><em>Bien conectado.</em></h2>
          <div className={styles.introAside}><p>Ocho formas de hacer avanzar tu negocio.<br />Encontrá la que necesitás hoy.</p><span><ArrowDown size={16} aria-hidden="true" /> EXPLORÁ LAS SOLUCIONES</span></div>
        </div>

        <div className={styles.tabs} ref={rail} role="tablist" aria-label="Elegí un servicio">
          {serviceCatalog.map((service, index) => (
            <button key={service.id} type="button" role="tab" id={`tab-${service.id}`} aria-controls={`panel-${service.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1}
              ref={element => { tabs.current[index] = element; }} onClick={() => choose(index)} onKeyDown={event => onTabKey(event, index)}>
              <span>{number(index)}</span>{service.label}<ArrowUpRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className={styles.stage}>
          {serviceCatalog.map((service, index) => (
            <article key={service.id} id={`panel-${service.id}`} role="tabpanel" aria-labelledby={`tab-${service.id}`} tabIndex={0} hidden={active !== index} className={styles.panel}>
              {active === index && <>
                <div className={styles.visual}>
                  <div className={styles.visualTop}><span>{service.category}</span><span>{number(index)} / 08</span></div>
                  <div className={styles.art} data-service={service.id}>
                    {/* The central illustration from the approved carousel, with all offer text rendered as accessible HTML below. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={service.image} width={941} height={1672} alt={service.imageAlt} loading="lazy" decoding="async" />
                  </div>
                  <div className={styles.visualBottom}><span className={styles.signal} aria-hidden="true" /><span>{service.label}</span><span>DISEÑADO PARA TU NEGOCIO</span></div>
                </div>

                <div className={styles.offer}>
                  <span className={styles.eyebrow}>{service.label}</span>
                  <h3>{service.title[0]}<br /><em>{service.title[1]}</em></h3>
                  <p className={styles.description}>{service.description}</p>
                  <div className={styles.commercial}>
                    <div><span className={styles.metaLabel}>{service.setup ? 'HONORARIOS DESDE' : 'DESDE'}</span><p className={styles.price}><span>USD</span> {service.price}</p><span className={styles.unit}>{service.unit}</span></div>
                    <div className={styles.deadline}><span className={styles.metaLabel}>{service.setup ? 'PUESTA EN MARCHA' : 'ENTREGA ESTIMADA'}</span><strong>{service.deadline}</strong><span className={styles.unit}>{service.setup ? '+ gestión continua' : 'implementación por única vez'}</span></div>
                  </div>
                  {service.setup && <p className={styles.setup}>Configuración inicial: <strong>USD {service.setup}</strong> por única vez.</p>}
                  <div className={styles.actions}><a className={styles.cta} href={inquiry(service.label)} target="_blank" rel="noopener noreferrer">Quiero esta solución <ArrowUpRight size={21} aria-hidden="true" /></a><ShareService className={styles.shareButton} slug={service.id} label={service.label} /></div>
                  <details className={styles.scope}>
                    <summary>Qué incluye y qué cotizamos aparte <Plus size={19} aria-hidden="true" /></summary>
                    <ul>{service.includes.map(item => <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>)}</ul>
                    <p>{service.exclusions}</p>
                  </details>
                </div>
              </>}
            </article>
          ))}
        </div>

        <div className={styles.mobileCarousel} ref={mobileRail} onScroll={syncMobileActive} aria-label="Servicios de Duggled. Deslizá hacia los costados para recorrerlos.">
          {serviceCatalog.map((service, index) => (
            <article className={styles.mobileCard} key={`mobile-${service.id}`} ref={element => { mobileCards.current[index] = element; }} aria-label={`${number(index)} de 08: ${service.label}`}>
              <div className={styles.visual}>
                <div className={styles.visualTop}><span>{service.category}</span><span>{number(index)} / 08</span></div>
                <div className={styles.art} data-service={service.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} width={941} height={1672} alt={service.imageAlt} loading="lazy" decoding="async" />
                </div>
                <div className={styles.visualBottom}><span className={styles.signal} aria-hidden="true" /><span>{service.label}</span><span>DESLIZÁ PARA VER MÁS</span></div>
              </div>
              <div className={styles.offer}>
                <span className={styles.eyebrow}>{service.label}</span>
                <h3>{service.title[0]}<br /><em>{service.title[1]}</em></h3>
                <p className={styles.description}>{service.description}</p>
                <div className={styles.commercial}>
                  <div><span className={styles.metaLabel}>{service.setup ? 'HONORARIOS DESDE' : 'DESDE'}</span><p className={styles.price}><span>USD</span> {service.price}</p><span className={styles.unit}>{service.unit}</span></div>
                  <div className={styles.deadline}><span className={styles.metaLabel}>{service.setup ? 'PUESTA EN MARCHA' : 'ENTREGA ESTIMADA'}</span><strong>{service.deadline}</strong><span className={styles.unit}>{service.setup ? '+ gestión continua' : 'implementación por única vez'}</span></div>
                </div>
                {service.setup && <p className={styles.setup}>Configuración inicial: <strong>USD {service.setup}</strong> por única vez.</p>}
                <div className={styles.actions}><a className={styles.cta} href={inquiry(service.label)} target="_blank" rel="noopener noreferrer">Quiero esta solución <ArrowUpRight size={21} aria-hidden="true" /></a><ShareService className={styles.shareButton} slug={service.id} label={service.label} /></div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.mobileDots} aria-label="Elegir servicio">
          {serviceCatalog.map((service, index) => <button key={service.id} type="button" aria-label={`Ver ${service.label}`} aria-current={active === index ? 'true' : undefined} onClick={() => choose(index)} />)}
        </div>

        <div className={styles.pager}>
          <div className={styles.progress} aria-hidden="true"><span style={{ width: `${((active + 1) / serviceCatalog.length) * 100}%` }} /></div>
          <span className={styles.current} aria-live="polite" aria-atomic="true">{number(active)} <span>/ 08</span><span className={styles.currentName}>{current.label}</span></span>
          <div className={styles.arrows}><button type="button" onClick={() => choose(active - 1)} aria-label="Servicio anterior"><ArrowLeft size={20} /></button><button type="button" onClick={() => choose(active + 1)} aria-label="Servicio siguiente"><ArrowRight size={20} /></button></div>
        </div>

        <div className={styles.bespoke}>
          <div><span className={styles.eyebrow}>CADA NEGOCIO ES UN MUNDO</span><h3>¿Necesitás conectar<br /><em>varias piezas?</em></h3><p>También hacemos branding, automatizaciones y proyectos a medida. Armemos la combinación que tenga sentido para vos.</p></div>
          <a href={contact} target="_blank" rel="noopener noreferrer">Pensemos tu proyecto <ArrowUpRight size={24} aria-hidden="true" /></a>
        </div>
        <p className={styles.conditions}>Precios base en USD según el alcance indicado. Presupuesto final a confirmar. Los plazos comienzan con la aprobación del alcance y la entrega de contenidos y accesos; las aprobaciones de terceros pueden extenderlos. Mantenimiento y costos externos se cotizan aparte. Las imágenes son ilustrativas.</p>
      </div>
    </section>
  );
}

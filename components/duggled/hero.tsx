'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import GlassLens from '@/components/duggled/glass-lens';
import { Progress } from '@/components/ui/progress';
import { contact } from '@/lib/content';
import { startNarrative } from '@/lib/narrative';

const story = [
  { label: 'Idea', lines: ['Una idea.', 'Todo por conectar.'], text: 'Tu negocio tiene algo para contar. Empezamos por encontrar su forma.', progress: .075 },
  { label: 'Diseño', lines: ['Se ve bien.', 'Se siente mejor.'], text: 'Identidad, diseño web y una experiencia pensada desde el primer toque.', progress: .24 },
  { label: 'Alcance', lines: ['Que te encuentren.', 'Que te elijan.'], text: 'Tu propuesta frente a las personas correctas. Con búsqueda, contenido y campañas.', progress: .44 },
  { label: 'Conexión', lines: ['Cada consulta.', 'Un próximo paso.'], text: 'Conectamos conversaciones, seguimiento y herramientas para ordenar el trabajo.', progress: .64 },
  { label: 'Negocio', lines: ['Del caos', 'al orden.'], text: 'Diseño, marketing y tecnología. Cada pieza trabajando con el mismo propósito.', progress: .94 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState({ progress: 0, ready: false });
  useEffect(() => {
    if (!root.current) return;
    return startNarrative(root.current, (progress, ready) => setLoading({ progress, ready }));
  }, []);

  function goToChapter(progress: number, index: number) {
    const section = root.current;
    if (!section) return;
    const mobileStops = [.18, .36, .54, .72, .9];
    const destination = window.matchMedia('(max-width: 699px)').matches ? mobileStops[index] : progress;
    window.scrollTo({ top: section.offsetTop + destination * (section.offsetHeight - window.innerHeight), behavior: 'smooth' });
  }

  return (
    <section className="narrative cinema" id="inicio" ref={root} data-ready={loading.ready} aria-label="De una idea a un negocio conectado">
      <GlassLens id="cta-lens" target=".cinema-cta" />
      <noscript><style>{`.site-preloader,.intro-brand,.intro-curtain,.hero-story-nav,.cinema-world,.cinema-fallback{display:none!important}.cinema{height:auto!important}.cinema-stage{position:relative!important;height:auto!important;min-height:0!important}.cinema-copy{position:relative!important;display:grid!important;gap:45px!important;padding:30px 0!important}.cinema-chapter{position:static!important;transform:none!important;opacity:1!important;visibility:visible!important}.hero-eyebrow,.header,.fixed-studio{visibility:visible!important;opacity:1!important}.cinema .cinema-copy{visibility:visible!important}`}</style></noscript>
      <div className="hero-sticky cinema-stage">
        <div className={`site-preloader${loading.ready ? ' is-complete' : ''}`} aria-hidden={loading.ready}>
          <div className="loader-signature"><span className="brand-mark" aria-hidden="true" /><span>duggled<span className="loader-dot">.</span></span></div>
          <span className="loader-caption">CONECTANDO LAS PIEZAS</span>
          <Progress className="preloader-bar" value={loading.progress} aria-label="Cargando experiencia" />
          <span className="preloader-percent">{Math.round(loading.progress)}%</span>
        </div>
        <div className="intro-curtain" aria-hidden="true" />
        <div className="cinema-world" aria-hidden="true" />
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="cinema-fallback" aria-hidden="true">
          <div className="fallback-orbit">
            <span className="fallback-ring fallback-ring-a" />
            <span className="fallback-ring fallback-ring-b" />
            <span className="fallback-mark" />
            <i className="fallback-node fallback-node-a" />
            <i className="fallback-node fallback-node-b" />
            <i className="fallback-node fallback-node-c" />
          </div>
          <p><span>DISEÑO</span><span>MARKETING</span><span>TECNOLOGÍA</span></p>
        </div>
        <div className="intro-brand">
          <span className="intro-kicker">UNA IDEA ES SOLO EL COMIENZO.</span>
          <div className="intro-word" aria-label="Duggled"><span className="intro-d" aria-hidden="true">D</span><span className="intro-letters">uggled<span className="intro-period">.</span></span></div>
          <p className="intro-manifesto">Diseño que te distingue.<br />Conexiones que hacen avanzar tu negocio.</p>
          <a className="intro-explore" href="#servicios">Explorá nuestras soluciones <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <div className="cinema-copy">{story.map((chapter, index) => (
          <div className={`cinema-chapter cinema-chapter-${index}`} key={chapter.label}>
            <span className="chapter-tag">0{index + 1} <span>/</span> {chapter.label.toUpperCase()}</span>
            {index === 0 ? <h1>{chapter.lines[0]}<br /><em>{chapter.lines[1]}</em></h1> : <h2>{chapter.lines[0]}<br /><em>{chapter.lines[1]}</em></h2>}
            <p>{chapter.text}</p>
            {index === 4 && <a className="button cinema-cta" href={contact} target="_blank" rel="noopener noreferrer">Construyamos el tuyo <ArrowUpRight size={20} aria-hidden="true" /></a>}
          </div>
        ))}</div>
        <div className="cinema-scroll-cue" aria-hidden="true"><span>SCROLL PARA CONECTAR</span><svg viewBox="0 0 32 44" fill="none"><path d="M5 9L16 20L27 9M5 23L16 34L27 23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <nav className="hero-story-nav" aria-label="Etapas de la experiencia">
          <div className="hero-story-track" aria-hidden="true"><span /></div>
          {story.map((chapter, index) => <button key={chapter.label} type="button" data-story-step={index} onClick={() => goToChapter(chapter.progress, index)}><span>0{index + 1}</span><span>{chapter.label}</span></button>)}
          <a href="#servicios" aria-label="Ir a las soluciones de Duggled"><ArrowDown size={18} aria-hidden="true" /></a>
        </nav>
      </div>
    </section>
  );
}

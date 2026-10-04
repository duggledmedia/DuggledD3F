'use client';
import {useEffect,useState} from 'react';
import GlassLens from '@/components/duggled/glass-lens';
import {MessageCircle} from 'lucide-react';
import {contact,navigation} from '@/lib/content';
export default function Header(){
 const [active,setActive]=useState('#inicio');const [studioVisible,setStudioVisible]=useState(false);
 useEffect(()=>{
  let raf=0;const sections=navigation.map(([,id])=>document.querySelector<HTMLElement>(id)).filter((s):s is HTMLElement=>!!s);
  const update=()=>{raf=0;setStudioVisible(window.scrollY>1);const marker=innerHeight*.36;let current='#inicio';for(const section of [...sections].sort((a,b)=>a.offsetTop-b.offsetTop)){if(section.getBoundingClientRect().top<=marker)current='#'+section.id}setActive(current)};
  const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
 },[]);
 return <><a className={`fixed-studio${studioVisible?' is-visible':''}`} href="#inicio" aria-label="Duggled, volver al inicio"><span className="brand-mark" aria-hidden="true"/><span className="fixed-studio-caption">Estudio creativo<br/>y digital</span></a><GlassLens id="header-lens" target=".contact-glass"/><header className="header contact-glass"><a className="header-cta" href={contact} target="_blank" rel="noopener noreferrer">Hablemos <MessageCircle size={21} strokeWidth={1.7} aria-hidden="true"/></a></header><nav className="section-timeline" aria-label="Navegación por secciones">{navigation.map(([label,url],i)=><a className={`timeline-stop${i===navigation.length-1?' timeline-contact':''}`} href={i===navigation.length-1?contact:url} target={i===navigation.length-1?'_blank':undefined} rel={i===navigation.length-1?'noopener noreferrer':undefined} key={label} aria-label={i===navigation.length-1?'Contacto por WhatsApp':label} aria-current={active===url?'location':undefined}><span className="timeline-label">{label}</span>{i===navigation.length-1?<span className="timeline-chat"><MessageCircle size={21} strokeWidth={1.7} aria-hidden="true"/></span>:<span className="timeline-dot" aria-hidden="true"/>}</a>)}</nav></>;
}

'use client';
import {useEffect,useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import ProjectVisual from '@/components/duggled/project-visual';
import {projects} from '@/lib/content';
export default function SelectedWork(){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  const section=root.current;const warmup=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting)||!section)return;section.querySelectorAll<HTMLImageElement>('img').forEach(img=>{img.loading='eager'});warmup.disconnect()},{rootMargin:'1800px 0px'});if(section)warmup.observe(section);
  gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{root.current?.querySelectorAll<HTMLElement>('.project-banner').forEach(banner=>{gsap.fromTo(banner.querySelector('.case-banner-background'),{yPercent:-12},{yPercent:12,ease:'none',scrollTrigger:{trigger:banner,start:'top bottom',end:'bottom top',scrub:.6}});gsap.fromTo(banner.querySelector('.case-web, .case-brand-surface'),{yPercent:-24},{yPercent:24,ease:'none',scrollTrigger:{trigger:banner,start:'top bottom',end:'bottom top',scrub:.6}});gsap.fromTo(banner.querySelector('.case-social'),{yPercent:26},{yPercent:-26,ease:'none',scrollTrigger:{trigger:banner,start:'top bottom',end:'bottom top',scrub:.6}})})},root);return()=>ctx.revert()});
  return()=>{warmup.disconnect();mm.revert()};
 },[]);
 return <section ref={root} id="trabajos" className="work section work-gallery work-banners"><div className="section-top"><span className="eyebrow">01 / TRABAJOS SELECCIONADOS</span></div><div className="section-heading"><h2>Menos promesas.<br/><em>Más diseño.</em></h2></div><div className="projects">{projects.map(p=><figure className={`project project-banner project-${p.theme}`} key={p.name}><div className="project-stage project-showcase"><ProjectVisual project={p}/></div><figcaption className="project-info"><h3>{p.name}</h3><p className="case-type">{p.type}</p>{p.disciplines.length>0&&<p className="case-deliverables">{p.disciplines.join(' · ')}</p>}</figcaption></figure>)}</div></section>;
}

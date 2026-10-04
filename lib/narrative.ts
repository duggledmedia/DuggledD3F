import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export function startNarrative(root:HTMLElement,onLoad:(progress:number,ready:boolean)=>void){
 gsap.registerPlugin(ScrollTrigger);
 const mm=gsap.matchMedia();let disposed=false;let destroyWorld:(()=>void)|undefined;let currentProgress=0;let ready=false;
 const previousOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';
 const cue=()=>root.classList.toggle('has-scrolled',window.scrollY>1||currentProgress>.0001);
 window.addEventListener('scroll',cue,{passive:true});cue();
 const report=(p:number)=>{if(!disposed&&!ready)onLoad(p,false)};
 const finish=()=>{if(disposed||ready)return;ready=true;clearTimeout(watchdog);document.documentElement.style.overflow=previousOverflow;onLoad(100,true);ScrollTrigger.refresh();cue()};
 // A failed device or asset must never leave navigation locked behind the loader.
 const watchdog=window.setTimeout(()=>{root.classList.add('webgl-fallback');finish()},12000);
 report(8);
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
  let active=true;const q=gsap.utils.selector(root);const driver={progress:0};let updateWorld:((p:number)=>void)|undefined;
  root.classList.add('cinema-running');const chapters=Array.from(root.querySelectorAll<HTMLElement>('.cinema-chapter'));const cta=root.querySelector<HTMLElement>('.cinema-cta');chapters.forEach((chapter,i)=>chapter.inert=i!==0);if(cta)cta.inert=true;
  gsap.set(q('.cinema-chapter'),{y:()=>innerHeight*1.05});
  const choreography=gsap.timeline({paused:true});choreography.to({clock:0},{clock:1,duration:1,ease:'none'},0);
  choreography.fromTo(q('.intro-brand'),{scale:1,autoAlpha:1},{scale:1.06,autoAlpha:0,duration:.022,ease:'none'},0);
  choreography.fromTo(q('.intro-curtain'),{autoAlpha:1},{autoAlpha:0,duration:.006,ease:'none'},0);
  const segments=[[0,.045,.1,.15],[.15,.20,.29,.35],[.35,.40,.49,.55],[.55,.60,.69,.75],[.75,.82,.96,1]];
  segments.forEach(([start,arrive,hold,end],i)=>{choreography.fromTo(q(`.cinema-chapter-${i}`),{y:()=>innerHeight*1.05},{y:0,duration:arrive-start,ease:'none',immediateRender:false},start);if(i<4)choreography.fromTo(q(`.cinema-chapter-${i}`),{y:0},{y:()=>-innerHeight*1.25,duration:end-hold,ease:'none',immediateRender:false},hold)});
  gsap.set(q('.cinema-cta'),{y:()=>innerHeight});choreography.fromTo(q('.cinema-cta'),{y:()=>innerHeight},{y:0,duration:.06,ease:'none',immediateRender:false},.88);
  const advance=()=>{currentProgress=driver.progress;choreography.progress(currentProgress);updateWorld?.(currentProgress);const step=currentProgress<.15?0:currentProgress<.35?1:currentProgress<.55?2:currentProgress<.75?3:4;chapters.forEach((chapter,i)=>chapter.inert=i!==step);if(cta)cta.inert=currentProgress<.94;cue()};
  const timeline=gsap.fromTo(driver,{progress:0},{progress:1,duration:1,ease:'none',onUpdate:advance,scrollTrigger:{trigger:root,start:'top top',end:'bottom bottom',scrub:.45,invalidateOnRefresh:true,onRefresh:()=>{choreography.invalidate();advance()}}});
  import('./cinema-world').then(async({createCinemaWorld})=>{if(disposed||!active)return;report(22);try{const world=createCinemaWorld(root.querySelector('.cinema-world') as HTMLElement,p=>report(25+p*70));destroyWorld=world.dispose;updateWorld=world.setProgress;world.setProgress(currentProgress);await world.ready;if(disposed||!active)return;root.classList.remove('webgl-fallback');root.classList.add('webgl-ready');await document.fonts.ready;finish()}catch{root.classList.add('webgl-fallback');finish()}}).catch(()=>{root.classList.add('webgl-fallback');finish()});
  return()=>{active=false;timeline.kill();choreography.kill();chapters.forEach(chapter=>chapter.inert=false);if(cta)cta.inert=false;destroyWorld?.();root.classList.remove('cinema-running','webgl-ready','webgl-fallback')};
 });
 mm.add('(prefers-reduced-motion: reduce)',()=>{document.fonts.ready.then(finish)});
 return()=>{disposed=true;clearTimeout(watchdog);document.documentElement.style.overflow=previousOverflow;mm.revert();window.removeEventListener('scroll',cue);destroyWorld?.()};
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function startNarrative(root: HTMLElement, onLoad: (progress: number, ready: boolean) => void) {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  let disposed = false;
  let destroyWorld: (() => void) | undefined;
  let currentProgress = 0;
  let ready = false;
  const previousOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  const cue = () => root.classList.toggle('has-scrolled', window.scrollY > 1 || currentProgress > .0001);
  window.addEventListener('scroll', cue, { passive: true });
  cue();
  const report = (progress: number) => { if (!disposed && !ready) onLoad(progress, false); };
  const finish = () => {
    if (disposed || ready) return;
    ready = true;
    clearTimeout(watchdog);
    document.documentElement.style.overflow = previousOverflow;
    onLoad(100, true);
    ScrollTrigger.refresh();
    cue();
  };
  const watchdog = window.setTimeout(() => { root.classList.add('webgl-fallback'); finish(); }, 10000);
  report(8);

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    let active = true;
    const q = gsap.utils.selector(root);
    const driver = { progress: 0 };
    let updateWorld: ((progress: number) => void) | undefined;
    root.classList.add('cinema-running');
    const chapters = Array.from(root.querySelectorAll<HTMLElement>('.cinema-chapter'));
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-story-step]'));
    const intro = root.querySelector<HTMLElement>('.intro-brand');
    const cta = root.querySelector<HTMLElement>('.cinema-cta');
    chapters.forEach(chapter => { chapter.inert = true; });
    if (cta) cta.inert = true;
    gsap.set(chapters, { y: 38, autoAlpha: 0 });
    const choreography = gsap.timeline({ paused: true });
    choreography.to({ clock: 0 }, { clock: 1, duration: 1, ease: 'none' }, 0);
    choreography.fromTo(q('.intro-brand'), { y: 0, autoAlpha: 1 }, { y: -35, autoAlpha: 0, duration: .042, ease: 'none' }, 0);
    const segments = [[.035, .065, .11, .15], [.16, .20, .30, .35], [.36, .40, .50, .55], [.56, .60, .70, .75], [.79, .85, 1, 1]];
    segments.forEach(([start, arrive, hold, end], index) => {
      const chapter = chapters[index];
      choreography.fromTo(chapter, { y: 38, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: arrive - start, ease: 'none', immediateRender: false }, start);
      if (index < 4) choreography.to(chapter, { y: -30, autoAlpha: 0, duration: end - hold, ease: 'none' }, hold);
    });
    gsap.set(q('.cinema-cta'), { y: 16, autoAlpha: 0 });
    choreography.to(q('.cinema-cta'), { y: 0, autoAlpha: 1, duration: .055, ease: 'none' }, .865);
    const advance = () => {
      currentProgress = driver.progress;
      choreography.progress(currentProgress);
      updateWorld?.(currentProgress);
      root.style.setProperty('--story-progress', currentProgress.toFixed(4));
      const step = currentProgress < .15 ? 0 : currentProgress < .35 ? 1 : currentProgress < .55 ? 2 : currentProgress < .75 ? 3 : 4;
      chapters.forEach((chapter, index) => { chapter.inert = index !== step || currentProgress < .035; });
      buttons.forEach((button, index) => {
        if (index === step) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
      if (intro) intro.inert = currentProgress > .035;
      if (cta) cta.inert = currentProgress < .92;
      cue();
    };
    const timeline = gsap.fromTo(driver, { progress: 0 }, {
      progress: 1, duration: 1, ease: 'none', onUpdate: advance,
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: .6, invalidateOnRefresh: true, onRefresh: () => { choreography.invalidate(); advance(); } },
    });
    import('./cinema-world').then(async ({ createCinemaWorld }) => {
      if (disposed || !active) return;
      report(22);
      try {
        const world = createCinemaWorld(root.querySelector('.cinema-world') as HTMLElement, progress => report(25 + progress * 70));
        destroyWorld = world.dispose;
        updateWorld = world.setProgress;
        world.setProgress(currentProgress);
        await world.ready;
        if (disposed || !active) return;
        root.classList.remove('webgl-fallback');
        root.classList.add('webgl-ready');
        await document.fonts.ready;
        finish();
      } catch { root.classList.add('webgl-fallback'); finish(); }
    }).catch(() => { root.classList.add('webgl-fallback'); finish(); });
    return () => {
      active = false;
      timeline.kill(); choreography.kill();
      chapters.forEach(chapter => { chapter.inert = false; });
      if (intro) intro.inert = false;
      if (cta) cta.inert = false;
      destroyWorld?.();
      root.classList.remove('cinema-running', 'webgl-ready', 'webgl-fallback');
    };
  });
  mm.add('(prefers-reduced-motion: reduce)', () => { document.fonts.ready.then(finish); });
  return () => {
    disposed = true;
    clearTimeout(watchdog);
    document.documentElement.style.overflow = previousOverflow;
    mm.revert();
    window.removeEventListener('scroll', cue);
    destroyWorld?.();
  };
}

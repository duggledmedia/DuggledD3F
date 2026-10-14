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
    const mobile = window.matchMedia('(max-width: 699px)').matches;
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
    choreography.fromTo(q('.intro-brand'), { y: 0, autoAlpha: 1 }, { y: -35, autoAlpha: 0, duration: mobile ? .08 : .042, ease: 'none' }, mobile ? .04 : 0);
    const segments = mobile
      ? [[.10, .16, .25, .29], [.29, .34, .43, .47], [.47, .52, .61, .65], [.65, .70, .79, .83], [.83, .88, 1, 1]]
      : [[.035, .065, .11, .15], [.16, .20, .30, .35], [.36, .40, .50, .55], [.56, .60, .70, .75], [.79, .85, 1, 1]];
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
      const step = mobile
        ? currentProgress < .28 ? 0 : currentProgress < .46 ? 1 : currentProgress < .64 ? 2 : currentProgress < .82 ? 3 : 4
        : currentProgress < .15 ? 0 : currentProgress < .35 ? 1 : currentProgress < .55 ? 2 : currentProgress < .75 ? 3 : 4;
      const introThreshold = mobile ? .1 : .035;
      chapters.forEach((chapter, index) => { chapter.inert = index !== step || currentProgress < introThreshold; });
      buttons.forEach((button, index) => {
        if (index === step) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
      if (intro) intro.inert = currentProgress > introThreshold;
      if (cta) cta.inert = currentProgress < (mobile ? .88 : .92);
      cue();
    };
    const mobileStops = [0, .18, .36, .54, .72, .9];
    let mobileSnapStep = 0;
    const timeline = gsap.fromTo(driver, { progress: 0 }, {
      progress: 1, duration: 1, ease: 'none', onUpdate: advance,
      scrollTrigger: {
        trigger: root, start: 'top top', end: 'bottom bottom', scrub: mobile ? .22 : .6, invalidateOnRefresh: true,
        onRefresh: self => {
          choreography.invalidate();
          if (mobile) mobileSnapStep = mobileStops.reduce((best, point, index) => Math.abs(point - self.progress) < Math.abs(mobileStops[best] - self.progress) ? index : best, 0);
          advance();
        },
        ...(mobile ? {
          snap: {
            snapTo: (value: number, self?: ScrollTrigger) => {
              const settled = mobileStops[mobileSnapStep];
              if (Math.abs(value - settled) < .02) return settled;
              const direction = self?.direction ?? (value < settled ? -1 : 1);
              mobileSnapStep = Math.max(0, Math.min(mobileStops.length - 1, mobileSnapStep + (direction < 0 ? -1 : 1)));
              return mobileStops[mobileSnapStep];
            },
            duration: { min: .16, max: .34 }, delay: .035, ease: 'power2.out', inertia: false,
          },
          onSnapComplete: self => {
            mobileSnapStep = mobileStops.reduce((best, point, index) => Math.abs(point - self.progress) < Math.abs(mobileStops[best] - self.progress) ? index : best, 0);
          },
        } : {}),
      },
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

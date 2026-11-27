export const NAV_OFFSET = 76;

export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (window.__lenis) {
    window.__lenis.resize(); // page height may have changed (lazy routes, images)
    window.__lenis.scrollTo(el, { offset: -NAV_OFFSET, immediate });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
  }
  return true;
}

/** Pause/resume page scrolling (modals, drawers). Works with and without Lenis. */
export function lockScroll(locked) {
  if (window.__lenis) {
    if (locked) window.__lenis.stop();
    else window.__lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

'use client';
import Script from 'next/script';

export function PageScripts() {
  return (
    <>
      
      <Script id="page-script-0" strategy="afterInteractive">
        {`
(() => {
  function initMarquee() {
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn("[Marquee] GSAP + ScrollTrigger required.");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = document.querySelector("[data-animate='marquee']");
    if (!wrapper) return;
    const sections = [...wrapper.querySelectorAll("[data-marquee='line']")];
    if (!sections.length) return;
    // 1) Prevent horizontal overflow from creating page-level scroll/zoom-out on mobile
    // Prefer clip (no scrollbars), fallback to hidden.
    wrapper.style.overflowX = "clip";
    if (getComputedStyle(wrapper).overflowX !== "clip") {
      wrapper.style.overflowX = "hidden";
    }
    // Helps avoid any accidental width expansion from inner content
    wrapper.style.maxWidth = "100%";
    // Smoother paints
    gsap.set(sections, { willChange: "transform" });
    // 2) Compute a sane travel distance per line (clamped for mobile safety)
    const getTravel = (el) => {
      const w = el.scrollWidth || el.offsetWidth || 0; // scrollWidth handles long inline content better
      const base = w / 4;
      // Clamp so mobile doesn't translate absurdly far (tweak as desired)
      const max = window.matchMedia("(max-width: 479px)").matches ? 120 : 240;
      return Math.min(base, max);
    };
    sections.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          x: () => (i % 2 === 0 ?  getTravel(el) : -getTravel(el)),
        },
        {
          x: () => (i % 2 === 0 ? -getTravel(el) :  getTravel(el)),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    // Refresh after late-loading images/fonts or wrapper resize
    const debounce = (() => { let t; return () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 60); };})();
    wrapper.querySelectorAll("img").forEach(img => {
      if (!img.complete) {
        img.addEventListener("load",  debounce, { once: true });
        img.addEventListener("error", debounce, { once: true });
      }
    });
    document.fonts?.ready?.then?.(debounce);
    new ResizeObserver(debounce).observe(wrapper);
  }
  window.addEventListener("GSAPReady", initMarquee, { once: true });
  if (document.readyState !== "loading") initMarquee();
  else document.addEventListener("DOMContentLoaded", initMarquee, { once: true });
})();
`}
      </Script>
    </>
  );
}

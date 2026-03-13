'use client';
import Script from 'next/script';

export function PageScripts() {
  return (
    <>
      
      <Script id="page-script-0" strategy="afterInteractive">
        {`// Run immediately - NOT on DOMContentLoaded
  // This ensures attributes are set before the animation script reads them
  (function() {
    // Wait for body to exist (should be immediate since this is in <head>)
    function setAttributes() {
      if (document.body) {
        document.body.setAttribute('data-page-type', 'project');
        document.body.setAttribute('data-project-slug', 'us-hab-cti');
        document.body.setAttribute('data-project-title', 'US HAB-CTI');
      } else {
        // Body doesn't exist yet, try again in a moment
        requestAnimationFrame(setAttributes);
      }
    }
    setAttributes();
  })();`}
      </Script>

      <Script id="page-script-1" strategy="afterInteractive">
        {`// Pause videos when not in viewport (mobile only)
  (function() {
    if (window.innerWidth > 768) return;
    document.addEventListener('DOMContentLoaded', function() {
      const videos = document.querySelectorAll('video');
      if (!videos.length) return;
      // Use IntersectionObserver to pause/play videos
      const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(function() {});
          } else {
            video.pause();
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1
      });
      videos.forEach(function(video) {
        videoObserver.observe(video);
      });
      console.log('[HAB-CTI] Mobile video optimization active for', videos.length, 'videos');
    });
  })();`}
      </Script>

      <Script id="page-script-2" strategy="afterInteractive">
        {`
  // Lazy load iframe using Intersection Observer
  document.addEventListener("DOMContentLoaded", function () {
    const iframes = document.querySelectorAll(".figma-embed-wrapper iframe");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            const src = iframe.getAttribute("data-src");
            if (src) {
              iframe.setAttribute("src", src);
              iframe.removeAttribute("data-src");
            }
            obs.unobserve(iframe);
          }
        });
      });
      iframes.forEach(iframe => observer.observe(iframe));
    } else {
      // Fallback for browsers that don’t support IntersectionObserver
      iframes.forEach(iframe => {
        const src = iframe.getAttribute("data-src");
        if (src) iframe.setAttribute("src", src);
      });
    }
  });
`}
      </Script>

      <Script id="page-script-3" strategy="afterInteractive">
        {`
  (function(){
    const iframe = document.currentScript.previousElementSibling.querySelector('iframe');
    if ("IntersectionObserver" in window && iframe) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute("data-src");
            obs.unobserve(iframe);
          }
        });
      });
      observer.observe(iframe);
    } else {
      // Fallback: load immediately
      if (iframe && iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute("data-src");
      }
    }
  })();
`}
      </Script>

      <Script id="page-script-4" strategy="afterInteractive">
        {`
  (function(){
    const iframe = document.currentScript.previousElementSibling.querySelector('iframe');
    if ("IntersectionObserver" in window && iframe) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute("data-src");
            obs.unobserve(iframe);
          }
        });
      });
      observer.observe(iframe);
    } else {
      if (iframe && iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute("data-src");
      }
    }
  })();
`}
      </Script>
    </>
  );
}

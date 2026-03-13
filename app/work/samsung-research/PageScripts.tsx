'use client';
import Script from 'next/script';

export function PageScripts() {
  return (
    <>
      
      <Script id="page-script-0" strategy="afterInteractive">
        {`// Set page context data attributes on body when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    document.body.setAttribute('data-page-type', 'project');
    document.body.setAttribute('data-project-slug', 'samsung-research');
    document.body.setAttribute('data-project-title', 'Samsung Research - Search & Share');
  });`}
      </Script>

      <Script id="page-script-1" strategy="afterInteractive">
        {`
  document.addEventListener('DOMContentLoaded', function() {
    const sectionOrder = [
      'background',
      'approach', 
      'research',
      'insights',
      'brainstorming',
      'iterations'
    ];
    sectionOrder.forEach(function(sectionId, index) {
      const img = document.getElementById(sectionId);
      if (img) {
        img.addEventListener('click', function(e) {
          e.preventDefault();
          const nextIndex = (index + 1) % sectionOrder.length;
          const nextSectionId = sectionOrder[nextIndex];
          const nextSection = document.getElementById(nextSectionId);
          if (nextSection) {
            nextSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
            console.log('[Samsung] Navigated from', sectionId, '→', nextSectionId);
          }
        });
        img.style.cursor = 'pointer';
        img.setAttribute('title', 'Click to jump to next section');
      }
    });
  });
`}
      </Script>

      <Script id="page-script-2" strategy="afterInteractive">
        {`
(function() {
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Force enable scroll on mobile
      if (window.matchMedia('(pointer: coarse), (max-width: 991px)').matches) {
        document.documentElement.style.overflow = 'auto';
        document.documentElement.style.overflowY = 'auto';
        document.body.style.overflow = 'auto';
        document.body.style.overflowY = 'auto';
      }
      // Show chatbot
      const chatbot = document.getElementById('portfolio-chatbot');
      if (chatbot) {
        chatbot.classList.add('ready');
      }
    }, 300);
  });
  // Handle orientation change
  window.addEventListener('orientationchange', function() {
    setTimeout(function() {
      if (window.matchMedia('(pointer: coarse), (max-width: 991px)').matches) {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
      }
    }, 200);
  });
})();
`}
      </Script>
    </>
  );
}

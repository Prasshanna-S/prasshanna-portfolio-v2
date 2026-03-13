'use client';
import Script from 'next/script';

export function PageScripts() {
  return (
    <>
      
      <Script id="page-script-0" strategy="afterInteractive">
        {`
  // Set page context for chatbot - NO header code needed!
  document.addEventListener('DOMContentLoaded', function() {
    document.body.setAttribute('data-page-type', 'project');
    document.body.setAttribute('data-project-slug', 'uyir');
    document.body.setAttribute('data-project-title', 'UYIR - Voice Companion for Kids Mental Health');
  });
`}
      </Script>

      <Script id="page-script-1" strategy="afterInteractive">
        {`
document.addEventListener('DOMContentLoaded', function() {
  // Create progress bar
  const progress = document.createElement('div');
  progress.className = 'section-progress';
  progress.innerHTML = '<div class="section-progress__bar"></div>';
  document.body.appendChild(progress);
  // Update progress bar on scroll
  const progressBar = progress.querySelector('.section-progress__bar');
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }, { passive: true });
});
`}
      </Script>
    </>
  );
}

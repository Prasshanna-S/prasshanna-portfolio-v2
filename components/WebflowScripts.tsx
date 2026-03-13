'use client';
import Script from 'next/script';

export function WebflowScripts() {
  return (
    <>
      {/* Google Analytics - Tag 1 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2L5EM5KYF4"
        strategy="afterInteractive"
      />
      <Script id="ga-config-1" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('set','developer_id.dZGVlNj',true);gtag('js',new Date());gtag('config','G-2L5EM5KYF4');`}
      </Script>

      {/* Google Analytics - Tag 2 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-K0K55CTNXL"
        strategy="afterInteractive"
      />
      <Script id="ga-config-2" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-K0K55CTNXL');`}
      </Script>

      {/* Flowbase Boosters */}
      <Script
        src="https://cdn.jsdelivr.net/npm/@flowbase-co/boosters-tooltip@1.1.2/dist/tooltip.js"
        integrity="sha384-IIHHs5EyPKqUFNFkmDdboHa7DYH7IF6Cv1v2MqazjClAzrfbpMBVPyz6h7nmw5GS"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@flowbase-co/boosters-real-time-clock@1.1.2/dist/real-time-clock.js"
        integrity="sha384-2yaJ1b3ijFGXBIH+y7rQdLahvrvrpUWpl0IJvW1rekS5F032Jm5WKJhsuOwb372P"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@flowbase-co/boosters-carousel-ticker@1.3.3/dist/carousel-ticker.js"
        integrity="sha384-KD0ti3dyN68nyVKMkol+NwdznZeOBUdI2k64A6Me3wCh+PANgAOY5pc36m437da9"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@flowbase-co/boosters-before-after-slider@1.0.3/dist/before-after-slider.js"
        integrity="sha384-/RSm0Qu1NXGqCSO4ctpC2/GhhnzNR+54P5yc578u1mPFLEozEnAhXVdCg1CdEO0F"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* jQuery (required by webflow.js) */}
      <Script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=695afa44576c42dc837b0739"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Webflow IX2 Runtime */}
      <Script src="/js/webflow.js" strategy="afterInteractive" />

      {/* GSAP Core + Plugins from Webflow CDN */}
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/Flip.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/SplitText.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/ScrollToPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/Draggable.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/DrawSVGPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/InertiaPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/MorphSVGPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/MotionPathPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/MotionPathHelper.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/Observer.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/PhysicsPropsPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/Physics2DPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/ScrollSmoother.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/ScrambleTextPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/TextPlugin.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/CustomEase.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/CustomBounce.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/CustomWiggle.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.prod.website-files.com/gsap/3.14.2/EasePack.min.js" strategy="afterInteractive" />

      {/* Register GSAP plugins */}
      <Script id="gsap-register" strategy="afterInteractive">
        {`if(typeof gsap!=='undefined'){gsap.registerPlugin(Flip,ScrollTrigger,SplitText,ScrollToPlugin,Draggable,DrawSVGPlugin,InertiaPlugin,MorphSVGPlugin,MotionPathPlugin,MotionPathHelper,Observer,PhysicsPropsPlugin,Physics2DPlugin,ScrollSmoother,ScrambleTextPlugin,TextPlugin,CustomEase,CustomBounce,CustomWiggle,EasePack);}`}
      </Script>

      {/* Additional CDN dependencies for portfolio-animations.js */}
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/split-type@0.3.3/umd/index.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/lenis@1.0.42/dist/lenis.min.js" strategy="afterInteractive" />

      {/* Production URL variable */}
      <Script id="vercel-url" strategy="afterInteractive">
        {`var VERCEL_URL='https://portfolio-navigator-kappa.vercel.app';`}
      </Script>

      {/* Custom animation scripts */}
      <Script src="/webflow/portfolio-animations.js" strategy="afterInteractive" />
      <Script src="/webflow/chatbot.js" strategy="afterInteractive" />
      <Script src="/webflow/sticker-game.js" strategy="afterInteractive" />
    </>
  );
}

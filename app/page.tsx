// @ts-nocheck
import type { Metadata } from "next";
import { PageScripts } from './PageScripts';

export const metadata: Metadata = {
  title: 'Prasshanna\'s Playground',
  description: 'UX / Product Designer working at the intersection of interaction design, accessibility, and AI-driven systems.',
  openGraph: {
    title: 'Prasshanna\'s Playground',
    description: 'UX / Product Designer working at the intersection of interaction design, accessibility, and AI-driven systems.',
  },
  twitter: {
    title: 'Prasshanna\'s Playground',
    description: 'UX / Product Designer working at the intersection of interaction design, accessibility, and AI-driven systems.',
  },
};

export default function HomePage() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `@media (min-width:992px) {html.w-mod-js:not(.w-mod-ix) [data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0ac3"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0bb0"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0af8"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b2c"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0be4"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b60"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea46"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea4d"] {opacity:0;display:none;}html.w-mod-js:not(.w-mod-ix) [data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea53"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea5a"] {opacity:0;display:none;}html.w-mod-js:not(.w-mod-ix) [data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea6d"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea74"] {opacity:0;display:none;}html.w-mod-js:not(.w-mod-ix) [data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea60"] {display:none;opacity:0;}html.w-mod-js:not(.w-mod-ix) [data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea67"] {opacity:0;display:none;}}@media (max-width:991px) and (min-width:768px) {html.w-mod-js:not(.w-mod-ix) [data-w-id="aed2385a-48f4-c393-97ab-6bdcb14296c1"] {-webkit-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);}}@media (max-width:767px) and (min-width:480px) {html.w-mod-js:not(.w-mod-ix) [data-w-id="aed2385a-48f4-c393-97ab-6bdcb14296c1"] {-webkit-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);}}@media (max-width:479px) {html.w-mod-js:not(.w-mod-ix) [data-w-id="aed2385a-48f4-c393-97ab-6bdcb14296c1"] {-webkit-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);}}
html.w-mod-js:not(.w-mod-ix3) :is(.circle-wrapper, .label-wrap-signal, .heading-signal, .button-wrap-signal, .spline-section, [data-wf-target*='["695afa45576c42dc837b074a","151a4d7e-f4fa-362f-f2d3-0e3d5e088ee8"]'], [data-wf-target*='["695afa45576c42dc837b074a","00de3c42-482b-754e-6147-1b6e8055b131"]'], .text-h1-10, .label-16, .body-10) {visibility: hidden !important;}` }} />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .preloader { pointer-events: none; z-index: 99999; }
        html.wf-design-mode .preloader { display: none; }
        .marquee-text-master-3 .text-h0-4 { opacity: 0; }
        .headline-about-a .label-10 { opacity: 0; }
        .navbar-master { visibility: hidden; opacity: 0; }
        .icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .icon-6-wrap, .cta-icon-3, .cta-icon-5 {
          opacity: 0; transform: scale(0);
        }
        .circle-wrapper { visibility: hidden; }
        #portfolio-chatbot { opacity: 0; pointer-events: none; }
      ` }} />
      
  <div className="preloader">
    <div className="preloader__items">
      <div className="preloader__lottie" data-w-id="65c72a66-538c-386c-d46f-24d48c9199a5" data-animation-type="lottie" data-src="https://cdn.prod.website-files.com/6722c9846b76c67b67acccff/6866ad95c024f5940b752490_643f225844b77e0a6c375673_loading_lottie.lottie" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="0"></div>
      <div className="preloader__text">BUILDING …</div>
    </div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
    <div className="preloader__content"></div>
  </div>
  <div className="navbar-master">
    <div data-animation="default" className="navbar w-nav" data-easing2="ease-in-back" data-easing="ease-out" data-collapse="medium" data-w-id="aed2385a-48f4-c393-97ab-6bdcb1429693" role="banner" data-duration="400" data-doc-height="1">
      <div className="w-layout-grid nav-container">
        <div className="nav-left">
          <div className="menu-button w-nav-button"><img loading="lazy" src="/images/WhiteNav.svg" alt="" className="menu-hamburger-icon" /><img loading="lazy" src="/images/X.svg" alt="" className="menu-close-icon" /></div>
          <div className="brand-menu-wrap">
            <a href="/" aria-current="page" className="brand-link-navbar w-nav-brand w--current"><img width="Auto" loading="lazy" alt="" src="/images/Logo-Small_1.svg" className="brand-navbar" /></a>
          </div>
        </div>
        <div id="w-node-aed2385a-48f4-c393-97ab-6bdcb142969c-837b074a" className="nav-middle">
          <div className="nav-menu-wrap">
            <nav role="navigation" className="nav-menu w-nav-menu">
              <div className="nav-link-wrap">
                <a href="#projects" className="link-underline-hover w-inline-block">
                  <div className="nav-link">Projects,</div>
                  <div className="link-under-line">
                    <div className="link-under-line-filled white"></div>
                  </div>
                </a>
              </div>
              <div className="nav-link-wrap">
                <a href="#about" className="link-underline-hover w-inline-block">
                  <div className="nav-link">About me,</div>
                  <div className="link-under-line">
                    <div className="link-under-line-filled white"></div>
                  </div>
                </a>
              </div>
              <div className="nav-link-wrap">
                <a href="/explorations" className="link-underline-hover w-inline-block">
                  <div className="nav-link">Explorations</div>
                  <div className="link-under-line">
                    <div className="link-under-line-filled white"></div>
                  </div>
                </a>
              </div>
            </nav>
          </div>
          <div className="nav-middle-right">
            <div className="nav-time"><img loading="lazy" src="/images/Clock1.svg" alt="" className="icon-time" />
              <div fb-clock-format="12-hour" fb-clock="true" fb-clock-timezone="America/New_York" className="clock">
                <div className="clock-time">
                  <div fb-clock-hour="hh" className="clock-time-block">00</div>
                  <div className="clock-colon">:</div>
                  <div fb-clock-minute="mm" className="clock-time-block">00</div>
                  <div className="clock-colon">:</div>
                  <div fb-clock-second="ss" className="clock-time-block">00</div>
                </div>
              </div>
            </div>
            <div className="nav-language"><img loading="lazy" src="/images/Globe.svg" alt="" className="icon-language" />
              <div className="nav-link">English</div>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <div className="menu-cta-wrap desktop">
            <a href="https://www.linkedin.com/in/prasshannas/" data-w-id="aed2385a-48f4-c393-97ab-6bdcb14296bc" target="_blank" className="nav-cta w-inline-block">
              <div className="nav-cta-circle"></div>
              <div fb-tooltip-trigger="hover" fb-tooltip="true" fb-tooltip-animation="shift-away" fb-tooltip-message="Visit my LinkedIn" fb-tooltip-position="bottom" fb-tooltip-show-delay="250" fb-tooltip-theme="light" className="nav-right-link text-underline">Available for new opportunities</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="nav-side-master">
      <div data-w-id="aed2385a-48f4-c393-97ab-6bdcb14296c1" className="nav-side-menu">
        <div className="side-menu-logo"><img loading="lazy" src="/images/Logo-Small.svg" alt="" className="brand-navbar" /></div><img loading="lazy" src="/images/X.svg" alt="" className="nav-close-icon" />
        <div className="nav-side-menu-list">
          <div className="nav-side-item">
            <div className="nav-side-link text-h4">Home</div>
            <div className="nav-link-variations">
              <div className="link-underline-hover">
                <a href="#" className="label-2 text-dark-64 link-sidebar">(01)</a>
                <div className="link-under-line">
                  <div className="link-under-line-filled"></div>
                </div>
              </div>
              <div className="link-underline-hover">
                <a href="#" className="label-2 text-dark-64 link-sidebar">(02)</a>
                <div className="link-under-line">
                  <div className="link-under-line-filled"></div>
                </div>
              </div>
              <div className="link-underline-hover">
                <a href="#" className="label-2 text-dark-64 link-sidebar">(03)</a>
                <div className="link-under-line">
                  <div className="link-under-line-filled"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-side-item">
            <div className="nav-side-link text-h4">About</div>
            <div className="nav-link-variations">
              <div className="link-underline-hover">
                <a href="#" className="label-2 text-dark-64 link-sidebar">(01)</a>
                <div className="link-under-line">
                  <div className="link-under-line-filled"></div>
                </div>
              </div>
              <div className="link-underline-hover">
                <a href="#" className="label-2 text-dark-64 link-sidebar">(02)</a>
                <div className="link-under-line">
                  <div className="link-under-line-filled"></div>
                </div>
              </div>
              <div className="link-underline-hover">
                <a href="#" className="label-2 text-dark-64 link-sidebar">(03)</a>
                <div className="link-under-line">
                  <div className="link-under-line-filled"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-side-item">
            <div className="nav-side-link text-h4">Work</div>
            <div className="nav-link-variations">
              <div className="link-underline-hover">
                <a href="#" className="label-2 text-dark-64 link-sidebar">(01)</a>
                <div className="link-under-line">
                  <div className="link-under-line-filled"></div>
                </div>
              </div>
              <div className="link-underline-hover">
                <a href="#" className="label-2 text-dark-64 link-sidebar">(02)</a>
                <div className="link-under-line">
                  <div className="link-under-line-filled"></div>
                </div>
              </div>
              <div className="link-underline-hover">
                <a href="#" className="label-2 text-dark-64 link-sidebar">(03)</a>
                <div className="link-under-line">
                  <div className="link-under-line-filled"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="link-underline-hover">
            <a href="/project/sporto-motivo" className="nav-side-link text-h4 big-link-sidebar">Project</a>
            <div className="link-under-line bigger">
              <div className="link-under-line-filled"></div>
            </div>
          </div>
          <div className="link-underline-hover">
            <a href="#" className="nav-side-link text-h4 big-link-sidebar">Contact</a>
            <div className="link-under-line bigger">
              <div className="link-under-line-filled"></div>
            </div>
          </div>
        </div>
        <div className="side-nav-bottom-tile"></div>
      </div>
    </div>
  </div>
  
  <div className="wrap-hero-4">
    <section className="section-18 about-a-hero">
      <div className="w-layout-blockcontainer main-container-15 w-container">
        <div className="headline-about-a">
          <div className="label-10">UX Designer · Accessibility · Human-Centered Systems</div>
        </div>
      </div>
      <div className="marquee-text-master-3">
        <div data-w-id="18ce3a6c-7abe-5092-f178-2d3048a4c54f" style={{ WebkitTransform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="marquee-text-master-2 main">
          <div className="single-text-marquee-2">
            <div className="text-h0-4 tamil"> பிரசன்னா</div>
            <div className="text-h0-4"> / Prasshanna</div>
            <div className="text-h0-4"> / pruh-SUN-nāh / </div>
            <div className="text-h0-4 tamil"> பிரசன்னா</div>
            <div className="text-h0-4"> / Prasshanna</div>
            <div className="text-h0-4"> / pruh-SUN-nāh / </div>
            <div className="text-h0-4 tamil"> பிரசன்னா</div>
            <div className="text-h0-4"> / Prasshanna</div>
            <div className="text-h0-4"> / pruh-SUN-nāh / </div>
          </div>
          <div className="single-text-marquee-2">
            <div className="text-h0-4 tamil"> பிரசன்னா</div>
            <div className="text-h0-4"> / Prasshanna</div>
            <div className="text-h0-4"> / pruh-SUN-nāh / </div>
            <div className="text-h0-4 tamil"> பிரசன்னா</div>
            <div className="text-h0-4"> / Prasshanna</div>
            <div className="text-h0-4"> / pruh-SUN-nāh / </div>
            <div className="text-h0-4 tamil"> பிரசன்னா</div>
            <div className="text-h0-4"> / Prasshanna</div>
            <div className="text-h0-4"> / pruh-SUN-nāh / </div>
          </div>
          <div className="single-text-marquee-2">
            <div className="text-h0-4 tamil"> பிரசன்னா</div>
            <div className="text-h0-4"> / Prasshanna</div>
            <div className="text-h0-4"> / pruh-SUN-nāh / </div>
            <div className="text-h0-4 tamil"> பிரசன்னா</div>
            <div className="text-h0-4"> / Prasshanna</div>
            <div className="text-h0-4"> / pruh-SUN-nāh / </div>
            <div className="text-h0-4 tamil"> பிரசன்னா</div>
            <div className="text-h0-4"> / Prasshanna</div>
            <div className="text-h0-4"> / pruh-SUN-nāh / </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section-11 cta-section">
      <div className="section-10">
        <div className="padding-global-2">
          <div className="spacer-2">
            <div className="max-width-medium align-center">
              <div className="margin-top margin-xxlarge"></div>
            </div>
          </div>
        </div>
        <div className="cta-image-wrap">
          <div className="icon-1-wrap"><img loading="lazy" src="/images/spirited-away-no-face-drinking-tea-512x512.avif" alt="" className="cta-icon" /></div>
          <div className="icon-2-wrap"><img sizes="(max-width: 1181px) 100vw, 1181px" srcSet="/images/experiments-2-p-500.avif 500w, /images/experiments-2.avif 1181w" alt="" src="/images/experiments-2.avif" loading="lazy" className="cta-icon-2" /></div>
          <div className="icon-3-wrap"><img sizes="(max-width: 1919px) 100vw, 1920px" srcSet="/images/experiments-1920-x-1080-px-1-p-500.avif 500w, /images/experiments-1920-x-1080-px-1-p-800.avif 800w, /images/experiments-1920-x-1080-px-1.avif 1920w" alt="" src="/images/experiments-1920-x-1080-px-1.avif" loading="lazy" className="cta-icon-3" /></div>
          <div className="icon-4-wrap"><img sizes="(max-width: 1181px) 100vw, 1181px" srcSet="/images/experiments-p-500.avif 500w, /images/experiments.avif 1181w" alt="" src="/images/experiments.avif" loading="lazy" className="cta-icon-4" /></div>
          <div className="icon-5-wrap"><img sizes="(max-width: 1919px) 100vw, 1920px" srcSet="/images/experiments-1920-x-1080-px-p-500.avif 500w, /images/experiments-1920-x-1080-px-p-800.avif 800w, /images/experiments-1920-x-1080-px.avif 1920w" alt="" src="/images/experiments-1920-x-1080-px.avif" loading="lazy" className="cta-icon-5" /></div>
          <div className="icon-6-wrap"><img sizes="(max-width: 1181px) 100vw, 1181px" srcSet="/images/experiments-1-p-500.avif 500w, /images/experiments-1.avif 1181w" alt="" src="/images/experiments-1.avif" loading="lazy" className="cta-icon-6" /></div>
        </div>
      </div>
    </section>
  </div>
  <div className="page-wrapper-3">
    <div className="global-styles w-embed">
      <style dangerouslySetInnerHTML={{ __html: `
/* Make text look crisper and more legible in all browsers */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
/* Focus state style for keyboard navigation for the focusable elements */
*[tabindex]:focus-visible,
  input[type="file"]:focus-visible {
   outline: 0.125rem solid #4d65ff;
   outline-offset: 0.125rem;
}
/* Get rid of top margin on first element in any rich text element */
.w-richtext > :not(div):first-child, .w-richtext > div:first-child > :first-child {
  margin-top: 0 !important;
}
/* Get rid of bottom margin on last element in any rich text element */
.w-richtext>:last-child, .w-richtext ol li:last-child, .w-richtext ul li:last-child {
	margin-bottom: 0 !important;
}
/* Prevent all click and hover interaction with an element */
.pointer-events-off {
	pointer-events: none;
}
/* Enables all click and hover interaction with an element */
.pointer-events-on {
  pointer-events: auto;
}
/* Create a class of .div-square which maintains a 1:1 dimension of a div */
.div-square::after {
	content: "";
	display: block;
	padding-bottom: 100%;
}
/* Make sure containers never lose their center alignment */
.container-medium,.container-small, .container-large {
	margin-right: auto !important;
  margin-left: auto !important;
}
/* 
Make the following elements inherit typography styles from the parent and not have hardcoded values. 
Important: You will not be able to style for example "All Links" in Designer with this CSS applied.
Uncomment this CSS to use it in the project. Leave this message for future hand-off.
*/
/*
a,
.w-input,
.w-select,
.w-tab-link,
.w-nav-link,
.w-dropdown-btn,
.w-dropdown-toggle,
.w-dropdown-link {
  color: inherit;
  text-decoration: inherit;
  font-size: inherit;
}
*/
/* Apply "..." after 3 lines of text */
.text-style-3lines {
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
/* Apply "..." after 2 lines of text */
.text-style-2lines {
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
/* Adds inline flex display */
.display-inlineflex {
  display: inline-flex;
}
/* These classes are never overwritten */
.hide {
  display: none !important;
}
@media screen and (max-width: 991px) {
    .hide, .hide-tablet {
        display: none !important;
    }
}
  @media screen and (max-width: 767px) {
    .hide-mobile-landscape{
      display: none !important;
    }
}
  @media screen and (max-width: 479px) {
    .hide-mobile{
      display: none !important;
    }
}
.margin-0 {
  margin: 0rem !important;
}
.padding-0 {
  padding: 0rem !important;
}
.spacing-clean {
padding: 0rem !important;
margin: 0rem !important;
}
.margin-top {
  margin-right: 0rem !important;
  margin-bottom: 0rem !important;
  margin-left: 0rem !important;
}
.padding-top {
  padding-right: 0rem !important;
  padding-bottom: 0rem !important;
  padding-left: 0rem !important;
}
.margin-right {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  margin-left: 0rem !important;
}
.padding-right {
  padding-top: 0rem !important;
  padding-bottom: 0rem !important;
  padding-left: 0rem !important;
}
.margin-bottom {
  margin-top: 0rem !important;
  margin-right: 0rem !important;
  margin-left: 0rem !important;
}
.padding-bottom {
  padding-top: 0rem !important;
  padding-right: 0rem !important;
  padding-left: 0rem !important;
}
.margin-left {
  margin-top: 0rem !important;
  margin-right: 0rem !important;
  margin-bottom: 0rem !important;
}
.padding-left {
  padding-top: 0rem !important;
  padding-right: 0rem !important;
  padding-bottom: 0rem !important;
}
.margin-horizontal {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
}
.padding-horizontal {
  padding-top: 0rem !important;
  padding-bottom: 0rem !important;
}
.margin-vertical {
  margin-right: 0rem !important;
  margin-left: 0rem !important;
}
.padding-vertical {
  padding-right: 0rem !important;
  padding-left: 0rem !important;
}
` }} />
    </div>
  </div>
  <div id="projects" className="wrap-cms-grid-4">
    <section className="section-17 work-sticky-scroll-section">
      <div className="sticky-overlay">
        <div className="marquee-sticky">
          <div className="master-marquees-2">
            <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0a75" style={{ WebkitTransform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="marquee-text-master-2">
              <div className="single-text-marquee-2">
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
              </div>
              <div className="single-text-marquee-2">
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
              </div>
              <div className="single-text-marquee-2">
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
              </div>
              <div className="single-text-marquee-2">
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
              </div>
              <div className="single-text-marquee-2">
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
              </div>
              <div className="single-text-marquee-2">
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
                <div className="text-h0-4">+</div>
                <div className="text-h0-4">Work</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-layout-blockcontainer main-container-13 w-container">
        <div className="project-list work-a">
          <div className="project-1">
            <div className="project-list-a">
              <a data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0ab3" href="/work/us-hab-cti" className="project-tile-v1 w-inline-block">
                <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0ab4" className="project-v1-image-wrap widescreen">
                  <div data-poster-url="videos/video_2x_postspark_2026-01-19_17-50-11_poster.0000000.jpg" data-video-urls="videos/video_2x_postspark_2026-01-19_17-50-11_mp4.mp4,videos/video_2x_postspark_2026-01-19_17-50-11_webm.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="background-video-17 w-background-video w-background-video-atom"><video id="04af4ff1-1ed2-8d69-f1f1-ecb99dbc15b9-video" autoPlay={true} loop="" style={{ backgroundImage: 'url(videos/video_2x_postspark_2026-01-19_17-50-11_poster.0000000.jpg)' }} muted="" playsInline="" data-wf-ignore="true" data-object-fit="cover">
                      <source src="/videos/video_2x_postspark_2026-01-19_17-50-11_mp4.mp4" data-wf-ignore="true" />
                      <source src="/videos/video_2x_postspark_2026-01-19_17-50-11_webm.webm" data-wf-ignore="true" />
                    </video></div><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/device-mockup_1.5x_postspark_2026-01-13_01-25-04-p-500.avif 500w, /images/device-mockup_1.5x_postspark_2026-01-13_01-25-04-p-800.avif 800w, /images/device-mockup_1.5x_postspark_2026-01-13_01-25-04.avif 1920w" alt="" src="/images/device-mockup_1.5x_postspark_2026-01-13_01-25-04.avif" loading="lazy" className="image-cover parallax" />
                  <div style={{ height: '100%' }} className="mask-image"></div>
                </div>
                <div className="project-info-bottom-tile">
                  <div className="project-name-tile">
                    <div className="text-big-4">US-HABCTI Clearing House Web Platform</div>
                    <div className="project-services">
                      <div className="project-service-tile">
                        <div className="text-big-4 text-dark-64 sub">UX Research</div>
                        <div className="text-big-4 text-dark-64 sub">,</div>
                      </div>
                      <div className="project-service-tile">
                        <div className="text-big-4 text-dark-64 sub">Interaction Design</div>
                        <div className="text-big-4 text-dark-64 sub">,</div>
                      </div>
                      <div className="text-big-4 text-dark-64 sub">Web Design</div>
                    </div>
                  </div>
                  <div className="text-big-4 sub">Designing a clearing house website for the US-HABCTI as part of the yearly capstone</div>
                </div>
                <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0ac3" className="project-link-overlay">
                  <div className="cta-main-3 light">
                    <div className="text-block-10">View project</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="w-layout-grid project-grid-1">
            <div className="project-2">
              <div className="project-list-a">
                <a data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0ae6" href="/work/samsung-research" className="project-tile-v1 w-inline-block">
                  <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0ae7" className="project-v1-image-wrap _3">
                    <div data-poster-url="videos/4_5-1_poster.0000000.jpg" data-video-urls="videos/4_5-1_mp4.mp4,videos/4_5-1_webm.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="samsung-vide w-background-video w-background-video-atom"><video id="634fd99d-64fb-c6c8-230d-c5b7b4b64ad7-video" autoPlay={true} loop="" style={{ backgroundImage: 'url(videos/4_5-1_poster.0000000.jpg)' }} muted="" playsInline="" data-wf-ignore="true" data-object-fit="cover">
                        <source src="/videos/4_5-1_mp4.mp4" data-wf-ignore="true" />
                        <source src="/videos/4_5-1_webm.webm" data-wf-ignore="true" />
                      </video></div><img loading="lazy" src="/images/vRu9fwqeg-Q_1vRu9fwqeg-Q.avif" alt="Samsung building through pink-petaled flowers" className="image-cover parallax" />
                    <div style={{ height: '100%' }} className="mask-image"></div>
                  </div>
                  <div className="project-info-bottom-tile vertical">
                    <div className="project-name-tile">
                      <div className="text-big-4">Interaction Redefined: Rethinking Media &amp; Meetings at Samsung</div>
                      <div className="project-services">
                        <div className="project-service-tile">
                          <div className="text-big-4 text-dark-64 sub">Mobile UX</div>
                          <div className="text-big-4 text-dark-64">,</div>
                        </div>
                        <div className="project-service-tile">
                          <div className="text-big-4 text-dark-64 sub">Interaction Design</div>
                          <div className="text-big-4 text-dark-64">,</div>
                        </div>
                        <div className="text-big-4 text-dark-64 sub">Multimodal</div>
                      </div>
                    </div>
                    <div className="text-big-4 sub">Exploring multimodal interaction and video conferencing redesigns to make everyday media and meetings more intuitive, accessible, and human-centered.</div>
                  </div>
                  <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0af8" className="project-link-overlay">
                    <div className="cta-main-3 light">
                      <div>View project</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="project-3">
              <div className="project-list-a">
                <a data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b1a" href="/work/xr-museum" className="project-tile-v1 w-inline-block">
                  <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b1b" className="project-v1-image-wrap">
                    <div data-poster-url="videos/Scene-1---Cinematic-1-1_poster.0000000.jpg" data-video-urls="videos/Scene-1---Cinematic-1-1_mp4.mp4,videos/Scene-1---Cinematic-1-1_webm.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="xr-video w-background-video w-background-video-atom"><video id="af7f19e5-3c56-c125-b474-792a0028521a-video" autoPlay={true} loop="" style={{ backgroundImage: 'url(videos/Scene-1---Cinematic-1-1_poster.0000000.jpg)' }} muted="" playsInline="" data-wf-ignore="true" data-object-fit="cover">
                        <source src="/videos/Scene-1---Cinematic-1-1_mp4.mp4" data-wf-ignore="true" />
                        <source src="/videos/Scene-1---Cinematic-1-1_webm.webm" data-wf-ignore="true" />
                      </video></div><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/XR-Museum-Final-p-500.avif 500w, /images/XR-Museum-Final-p-800.avif 800w, /images/XR-Museum-Final.avif 1947w" alt="" src="/images/XR-Museum-Final.avif" loading="lazy" className="image-cover parallax" />
                    <div style={{ height: '100%' }} className="mask-image"></div>
                  </div>
                  <div className="project-info-bottom-tile">
                    <div className="project-name-tile">
                      <div className="text-big-4">XR Museum</div>
                      <div className="project-services">
                        <div className="project-service-tile">
                          <div className="text-big-4 text-dark-64 sub">XR Design</div>
                          <div className="text-big-4 text-dark-64 sub">,</div>
                        </div>
                        <div className="project-service-tile">
                          <div className="text-big-4 text-dark-64 sub">UI Design</div>
                          <div className="text-big-4 text-dark-64 sub">,</div>
                        </div>
                        <div className="text-big-4 text-dark-64 sub">Concept</div>
                      </div>
                    </div>
                    <div className="text-big-4 sub">An extended reality system built to be used in museums to view data in a visually beautiful way, like never before.</div>
                  </div>
                  <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b2c" className="project-link-overlay">
                    <div className="cta-main-3 light">
                      <div>View project</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="project-4">
              <div className="project-list-a">
                <a data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b4e" href="#" className="project-tile-v1 w-inline-block">
                  <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b4f" className="project-v1-image-wrap">
                    <div data-poster-url="videos/Gradient-background-remix_poster.0000000.jpg" data-video-urls="videos/Gradient-background-remix_mp4.mp4,videos/Gradient-background-remix_webm.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="mercor w-background-video w-background-video-atom"><video id="6d75b5aa-f078-5455-095d-475ba49274bb-video" autoPlay={true} loop="" style={{ backgroundImage: 'url(videos/Gradient-background-remix_poster.0000000.jpg)' }} muted="" playsInline="" data-wf-ignore="true" data-object-fit="cover">
                        <source src="/videos/Gradient-background-remix_mp4.mp4" data-wf-ignore="true" />
                        <source src="/videos/Gradient-background-remix_webm.webm" data-wf-ignore="true" />
                      </video></div><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/Proj5-p-500.avif 500w, /images/Proj5-p-800.avif 800w, /images/Proj5.avif 1536w" alt="" src="/images/Proj5.avif" loading="lazy" className="image-cover parallax" />
                    <div style={{ height: '100%' }} className="mask-image"></div>
                  </div>
                  <div className="project-info-bottom-tile">
                    <div className="project-name-tile">
                      <div className="text-big-4">Mercor AI: User Interface Design and Development Explorations</div>
                      <div className="project-services">
                        <div className="project-service-tile">
                          <div className="text-big-4 text-dark-64 sub">AI Design</div>
                          <div className="text-big-4 text-dark-64 sub">,</div>
                        </div>
                        <div className="project-service-tile">
                          <div className="text-big-4 text-dark-64 sub">Interaction Design</div>
                          <div className="text-big-4 text-dark-64 sub">,</div>
                        </div>
                        <div className="text-big-4 text-dark-64 sub">Web Design</div>
                      </div>
                    </div>
                    <div className="text-big-4 sub">A series of design and development experiments exploring how users interact with AI systems through thoughtfully designed interfaces.</div>
                  </div>
                  <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b60" className="project-link-overlay">
                    <div className="cta-main-3 light">
                      <div>Reach out to me for info :)</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="project-5">
              <div className="project-list-a">
                <a data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b9e" href="/work/uyir" className="project-tile-v1 w-inline-block">
                  <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0b9f" className="project-v1-image-wrap">
                    <div data-poster-url="videos/Frame-80---Bold_poster.0000000.jpg" data-video-urls="videos/Frame-80---Bold_mp4.mp4,videos/Frame-80---Bold_webm.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="uyir-video w-background-video w-background-video-atom"><video id="9be4e0a2-112a-bc48-8499-fcfeabd81d5d-video" autoPlay={true} loop="" style={{ backgroundImage: 'url(videos/Frame-80---Bold_poster.0000000.jpg)' }} muted="" playsInline="" data-wf-ignore="true" data-object-fit="cover">
                        <source src="/videos/Frame-80---Bold_mp4.mp4" data-wf-ignore="true" />
                        <source src="/videos/Frame-80---Bold_webm.webm" data-wf-ignore="true" />
                      </video></div><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/Uyir_1Uyir.avif 500w, /images/Uyir_1Uyir.avif 800w, /images/Uyir_1Uyir.avif 1706w" alt="" src="/images/Uyir_1Uyir.avif" loading="lazy" className="image-cover parallax less" />
                    <div style={{ height: '100%' }} className="mask-image"></div>
                  </div>
                  <div className="project-info-bottom-tile">
                    <div className="project-name-tile">
                      <div className="text-big-4">UYIR: Kids Mental Health Companion</div>
                      <div className="project-services">
                        <div className="project-service-tile">
                          <div className="text-big-4 text-dark-64 sub">NLP &amp; LLM</div>
                          <div className="text-big-4 text-dark-64 sub">,</div>
                        </div>
                        <div className="project-service-tile">
                          <div className="text-big-4 text-dark-64 sub">User Research</div>
                          <div className="text-big-4 text-dark-64 sub">,</div>
                        </div>
                        <div className="text-big-4 text-dark-64 sub">Mobile &amp; Web App</div>
                      </div>
                    </div>
                    <div className="text-big-4 sub">A voice-based AI mental health companion for people and kids to talk to and express their feelings about.</div>
                  </div>
                  <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0bb0" className="project-link-overlay">
                    <div className="cta-main-3 light">
                      <div>View project</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="project-6">
            <div className="project-list-a">
              <a data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0bd2" href="#" className="project-tile-v1 w-inline-block">
                <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0bd3" className="project-v1-image-wrap"><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/63b016c73593734c233f7b75_homejam-banner-min_163b016c73593734c233f7b75_homejam-banner-min.avif 500w, /images/63b016c73593734c233f7b75_homejam-banner-min_163b016c73593734c233f7b75_homejam-banner-min.avif 800w, /images/63b016c73593734c233f7b75_homejam-banner-min_163b016c73593734c233f7b75_homejam-banner-min.avif 1080w, /images/63b016c73593734c233f7b75_homejam-banner-min_163b016c73593734c233f7b75_homejam-banner-min.avif 1600w, /images/63b016c73593734c233f7b75_homejam-banner-min_163b016c73593734c233f7b75_homejam-banner-min.avif 2000w, /images/63b016c73593734c233f7b75_homejam-banner-min_163b016c73593734c233f7b75_homejam-banner-min.avif 2881w" alt="" src="/images/63b016c73593734c233f7b75_homejam-banner-min_163b016c73593734c233f7b75_homejam-banner-min.avif" loading="lazy" className="image-cover parallax" />
                  <div style={{ height: '100%' }} className="mask-image"></div>
                </div>
                <div className="project-info-bottom-tile">
                  <div className="project-name-tile">
                    <div className="text-big-4">Homejam: Platform for Online Concerts</div>
                    <div className="project-services">
                      <div className="project-service-tile">
                        <div className="text-big-4 text-dark-64 sub">UI Design</div>
                        <div className="text-big-4 text-dark-64 sub">,</div>
                      </div>
                      <div className="project-service-tile">
                        <div className="text-big-4 text-dark-64 sub">User Testing</div>
                        <div className="text-big-4 text-dark-64 sub">,</div>
                      </div>
                      <div className="text-big-4 text-dark-64 sub">Prototyping</div>
                    </div>
                  </div>
                  <div className="text-big-4 sub">An online audio-video platform enabling users to both teach and learn arts like music and dance live</div>
                </div>
                <div data-w-id="f5368858-d3b5-b2f5-4c2f-8c261f9f0be4" className="project-link-overlay">
                  <div className="cta-main-3 light">
                    <div>View project</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <section id="marquee" data-animate="marquee" className="sec">
    <div className="comp scroller">
      <div data-marquee="line" className="scroller-line first">
        <div className="div-block-2"></div>
        <div className="scroller-text larger">    Previously</div>
        <div className="marquee-img larger">
          <div className="dual-img"><img sizes="(max-width: 1181px) 100vw, 1181px" srcSet="/images/experiments-1_1-p-500.avif 500w, /images/experiments-1_1.avif 1181w" alt="" src="/images/experiments-1_1.avif" loading="eager" className="dual-img-img" /><img loading="eager" src="/images/socks-shadow_1socks-shadow.avif" alt="" className="dual-img-shadow" /></div>
        </div>
        <div className="scroller-text larger">@  </div>
        <div className="div-block-2"></div>
      </div>
      <div data-marquee="line" className="scroller-line second">
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/6722d058364ed9fe302e3cc7_University_of_Maryland_seal.svg_16722d058364ed9fe302e3cc7_University_of_Maryland_seal.svg.avif" alt="" className="dual-img-img" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/Samsung_logo_wordmark.svg_1Samsung_logo_wordmark.svg.avif" alt="" className="dual-img-img" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/logo-imet_1logo-imet.avif" alt="" className="dual-img-img" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img sizes="(max-width: 1206px) 100vw, 1206px" srcSet="/images/mercor-logo-p-500.png 500w, /images/mercor-logo.avif 1206w" alt="" src="/images/mercor-logo.avif" loading="eager" className="dual-img-img smaller" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/6722d058364ed9fe302e3cc7_University_of_Maryland_seal.svg_16722d058364ed9fe302e3cc7_University_of_Maryland_seal.svg.avif" alt="" className="dual-img-img smaller" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/Samsung_logo_wordmark.svg_1Samsung_logo_wordmark.svg.avif" alt="" className="dual-img-img" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/iitg_logo_w_1iitg_logo_w.avif" alt="" className="dual-img-img" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/homejam-logo_1homejam-logo.avif" alt="" className="dual-img-img" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/BPF-Full-White_1BPF-Full-White.avif" alt="" className="dual-img-img" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img sizes="(max-width: 1206px) 100vw, 1206px" srcSet="/images/mercor-logo-p-500.png 500w, /images/mercor-logo.avif 1206w" alt="" src="/images/mercor-logo.avif" loading="eager" className="dual-img-img" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/6722d058364ed9fe302e3cc7_University_of_Maryland_seal.svg_16722d058364ed9fe302e3cc7_University_of_Maryland_seal.svg.avif" alt="" className="dual-img-img" /></div>
        </div>
        <div className="marquee-img">
          <div className="dual-img"><img loading="eager" src="/images/Samsung_logo_wordmark.svg_1Samsung_logo_wordmark.svg.avif" alt="" className="dual-img-img" /></div>
        </div>
      </div>
    </div>
    <div className="code-block-2 w-embed w-script">
      
    </div>
  </section>
  <section id="about" data-w-id="f8cff155-b3b5-002f-b376-3e089aa40dde" className="section-37 hero-home-b">
    <div className="home-b-hero-master">
      <div className="w-layout-blockcontainer main-container-35 w-container">
        <div data-w-id="f8cff155-b3b5-002f-b376-3e089aa40de1" style={{ opacity: 0 }} className="home-b-hero-wrap-2">
          <div className="label-16">my design ideology</div>
          <h1 className="text-h1-10">Clarity emerges when interaction replaces explanation.</h1>
          <p className="body-10"><strong>UX / Product Designer working at the intersection of interaction design, accessibility, and AI-driven systems. <br />‍</strong>I design experiences where complex technology feels intuitive, usable, and human.</p>
        </div>
      </div>
      <div className="home-b-video-master"><img data-wf-target="[[[&quot;695afa45576c42dc837b074a&quot;,&quot;00de3c42-482b-754e-6147-1b6e8055b131&quot;],[]]]" sizes="(max-width: 1181px) 100vw, 1181px" alt="" src="/images/experiments-4.avif" loading="lazy" srcSet="/images/experiments-4-p-500.avif 500w, /images/experiments-4.avif 1181w" className="home-b-video-bg" />
        <div data-wf-target="[[[&quot;695afa45576c42dc837b074a&quot;,&quot;151a4d7e-f4fa-362f-f2d3-0e3d5e088ee8&quot;],[]]]" className="image-wrap">
          <div data-poster-url="videos/my-animated-head-video_poster.0000000.jpg" data-video-urls="videos/my-animated-head-video_mp4.mp4,videos/my-animated-head-video_webm.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="home-b-video w-background-video w-background-video-atom"><video id="f8cff155-b3b5-002f-b376-3e089aa40df6-video" autoPlay={true} loop="" style={{ backgroundImage: 'url(videos/my-animated-head-video_poster.0000000.jpg)' }} muted="" playsInline="" data-wf-ignore="true" data-object-fit="cover">
              <source src="/videos/my-animated-head-video_mp4.mp4" data-wf-ignore="true" />
              <source src="/videos/my-animated-head-video_webm.webm" data-wf-ignore="true" />
            </video></div>
          <div className="shine"></div>
        </div>
      </div>
    </div>
  </section>
  <div id="fun" mask="true" className="mask section">
    <section id="signal" color="bg" section="marquee" className="section-6 signal">
      <div className="w-layout-blockcontainer main-container-2 w-container">
        <div className="master-signal">
          <div className="content-signal">
            <div className="label-wrap-signal">
              <div className="label">in other news</div>
            </div>
            <div className="headline-signal">
              <div className="heading-signal">
                <div className="heading-large-7">Sometimes<br />I have fun too</div>
              </div>
            </div>
            <div className="button-wrap-signal">
              <a href="/explorations" className="nav-link cta w-inline-block">
                <div className="button-label-3">Explore now</div>
              </a>
              <div className="label margin">and other projects and explorations <br />That didn&#x27;t make the cut for the front page</div>
            </div>
          </div>
          <div className="circle-wrapper"><img loading="lazy" src="/images/WhatsApp-Image-2024-02-28-at-17.13.39_1WhatsApp-Image-2024-02-28-at-17.13.39.avif" alt="" className="circle-image" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/Capstone-Students-63_1Capstone-Students-63.avif 500w, /images/Capstone-Students-63_1Capstone-Students-63.avif 800w, /images/Capstone-Students-63_1Capstone-Students-63.avif 1080w, /images/Capstone-Students-63_1Capstone-Students-63.avif 2000w" alt="" src="/images/Capstone-Students-63_1Capstone-Students-63.avif" loading="lazy" className="circle-image" /><img loading="lazy" src="/images/samsung-tower-1_1samsung-tower-1.avif" alt="" className="circle-image" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/Amaran_1Amaran.avif 500w, /images/Amaran_1Amaran.avif 800w, /images/Amaran_1Amaran.avif 1502w" alt="" src="/images/Amaran_1Amaran.avif" loading="lazy" className="circle-image" /><img loading="lazy" src="/images/thisisasite7_1thisisasite7.avif" alt="" className="circle-image" /><img loading="lazy" src="/images/Bahmini-Redesign-main-page_1Bahmini-Redesign-main-page.avif" alt="" className="circle-image" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/672e89fb74dbeffde100c4c3_20230430_124330-min_1672e89fb74dbeffde100c4c3_20230430_124330-min.avif 500w, /images/672e89fb74dbeffde100c4c3_20230430_124330-min_1672e89fb74dbeffde100c4c3_20230430_124330-min.avif 800w, /images/672e89fb74dbeffde100c4c3_20230430_124330-min_1672e89fb74dbeffde100c4c3_20230430_124330-min.avif 1080w, /images/672e89fb74dbeffde100c4c3_20230430_124330-min_1672e89fb74dbeffde100c4c3_20230430_124330-min.avif 1600w, /images/672e89fb74dbeffde100c4c3_20230430_124330-min_1672e89fb74dbeffde100c4c3_20230430_124330-min.avif 2000w, /images/672e89fb74dbeffde100c4c3_20230430_124330-min_1672e89fb74dbeffde100c4c3_20230430_124330-min.avif 4000w" alt="" src="/images/672e89fb74dbeffde100c4c3_20230430_124330-min_1672e89fb74dbeffde100c4c3_20230430_124330-min.avif" loading="lazy" className="circle-image" /><img loading="lazy" src="/images/Disai-temp-banner_1Disai-temp-banner.avif" alt="" className="circle-image" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/63ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min_163ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min.avif 500w, /images/63ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min_163ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min.avif 800w, /images/63ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min_163ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min.avif 1080w, /images/63ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min_163ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min.avif 2030w" alt="" src="/images/63ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min_163ca61dcd3cc943b0d728918_8F92C0F6-A1A3-43A6-94E9-A615858510E3-min.avif" loading="lazy" className="circle-image" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 769px, 769px" srcSet="/images/B41918D6-6D9D-49EC-867C-E72F71B658FC_1_105_c_1B41918D6-6D9D-49EC-867C-E72F71B658FC_1_105_c.avif 500w, /images/B41918D6-6D9D-49EC-867C-E72F71B658FC_1_105_c_1B41918D6-6D9D-49EC-867C-E72F71B658FC_1_105_c.avif 769w" alt="" src="/images/B41918D6-6D9D-49EC-867C-E72F71B658FC_1_105_c_1B41918D6-6D9D-49EC-867C-E72F71B658FC_1_105_c.avif" loading="lazy" className="circle-image" /><img loading="lazy" src="/images/Banner-mental-health.svg" alt="" className="circle-image" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 768px" srcSet="/images/68670502-970C-4939-AFE7-D7AB6EA2173F_1_105_c_168670502-970C-4939-AFE7-D7AB6EA2173F_1_105_c.avif 500w, /images/68670502-970C-4939-AFE7-D7AB6EA2173F_1_105_c_168670502-970C-4939-AFE7-D7AB6EA2173F_1_105_c.avif 768w" alt="" src="/images/68670502-970C-4939-AFE7-D7AB6EA2173F_1_105_c_168670502-970C-4939-AFE7-D7AB6EA2173F_1_105_c.avif" loading="lazy" className="circle-image" /><img loading="lazy" src="/images/loading-gif.gif" alt="" className="circle-image" /><img loading="lazy" src="/images/Fractal-Thumb-min_1Fractal-Thumb-min.avif" alt="" className="circle-image" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/HAP-Logo-T-Shirt-Mockup_1-p-500.avif 500w, /images/HAP-Logo-T-Shirt-Mockup_1-p-800.avif 800w, /images/HAP-Logo-T-Shirt-Mockup_1HAP-Logo-T-Shirt-Mockup.avif 1600w" alt="" src="/images/HAP-Logo-T-Shirt-Mockup_1HAP-Logo-T-Shirt-Mockup.avif" loading="lazy" className="circle-image" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px, 800px" srcSet="/images/26805_126805.avif 500w, /images/26805_126805.avif 4675w" alt="" src="/images/26805_126805.avif" loading="lazy" className="circle-image" /></div>
        </div>
      </div>
    </section>
  </div>
  <div className="wrap-hero-1">
    <section className="section hero-home-a">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="w-layout-grid hero-thirds">
          <div className="home-a-left-column"></div>
          <div id="w-node-_95cc218c-0f5e-5a07-8c6d-ab625d11ea2a-837b074a" className="hero-a-right-column">
            <div className="heading-home">
              <h1 className="text-h1">Designed beautifully.</h1>
              <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea2e" className="heading-animation-hidden">
                <div className="heading-rotating-wrap _1">
                  <div className="text-h1 text-dark-32">Built boldly.</div>
                </div>
                <div className="heading-rotating-wrap _2">
                  <div className="text-h1 text-dark-32">Simplified smartly.</div>
                </div>
                <div className="heading-rotating-wrap _3">
                  <div className="text-h1 text-dark-32">Crafted minimally.</div>
                </div>
                <div className="heading-rotating-wrap _4">
                  <div className="text-h1 text-dark-32">Engineered precisely.</div>
                </div>
                <div className="heading-rotating-wrap _5">
                  <div className="text-h1 text-dark-32">Shaped purposefully.</div>
                </div>
              </div>
            </div>
            <div className="home-a-project-master">
              <div className="label">(latest <br />projects)</div>
              <div className="projects">
                <div className="project-grid-home">
                  <a data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea45" href="/work/us-hab-cti" className="project-tile-small w-inline-block">
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea46" className="project-link-overlay">
                      <div className="cta-main light">
                        <div className="text-block">View project</div>
                      </div>
                    </div>
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea4a" className="project-v2-image-wrap"><img loading="lazy" src="/images/device-mockup_1.5x_postspark_2026-01-13_01-13-53.avif" alt="" className="image-cover parallax" /></div>
                    <div className="project-dark-overlay"></div>
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea4d" className="project-small-overlay">
                      <div className="text-big">US HAB-CTI Clearinghouse Web app</div>
                      <div className="text-big">2024-25</div>
                    </div>
                  </a>
                  <a data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea52" href="/work/xr-museum" className="project-tile-small w-inline-block">
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea53" className="project-link-overlay">
                      <div className="cta-main light">
                        <div className="text-block-2">View project</div>
                      </div>
                    </div>
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea57" className="project-v2-image-wrap"><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/XR-Museum-Final-p-500.avif 500w, /images/XR-Museum-Final-p-800.avif 800w, /images/XR-Museum-Final.avif 1947w" alt="" src="/images/XR-Museum-Final.avif" loading="lazy" className="image-cover parallax" /></div>
                    <div className="project-dark-overlay"></div>
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea5a" className="project-small-overlay">
                      <div className="text-big">XR Museum</div>
                      <div className="text-big">(2024)</div>
                    </div>
                  </a>
                  <a data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea5f" href="/work/samsung-research" className="project-tile-small w-inline-block">
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea60" className="project-link-overlay">
                      <div className="cta-main light">
                        <div className="text-block-3">View project</div>
                      </div>
                    </div>
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea64" className="project-v2-image-wrap"><img loading="lazy" src="/images/vRu9fwqeg-Q_1vRu9fwqeg-Q.avif" alt="Samsung building through pink-petaled flowers" className="image-cover parallax" /></div>
                    <div className="project-dark-overlay"></div>
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea67" className="project-small-overlay">
                      <div className="text-big">Samsung</div>
                      <div className="text-big">(2022)</div>
                    </div>
                  </a>
                  <a data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea6c" href="/work/uyir" className="project-tile-small w-inline-block">
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea6d" className="project-link-overlay">
                      <div className="cta-main light">
                        <div className="text-block-4">View project</div>
                      </div>
                    </div>
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea71" className="project-v2-image-wrap"><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/Uyir_1Uyir.avif 500w, /images/Uyir_1Uyir.avif 800w, /images/Uyir_1Uyir.avif 1706w" alt="" src="/images/Uyir_1Uyir.avif" loading="lazy" className="image-cover parallax" /></div>
                    <div className="project-dark-overlay"></div>
                    <div data-w-id="95cc218c-0f5e-5a07-8c6d-ab625d11ea74" className="project-small-overlay">
                      <div className="text-big">UYIR<br />Mental Health Companion</div>
                      <div className="text-big">(2023)</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="home-a-logo-tile"><img loading="lazy" src="/images/Logo-Large.svg" alt="" className="home-a-logo" />
          <div className="logo-label">
            <div className="label">2026</div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div className="grid-container is--background">
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bca-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bcb-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bcc-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bcd-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bce-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bcf-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bd0-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bd1-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bd2-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bd3-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bd4-837b074a" className="grid-background__item"></div>
    <div id="w-node-_8dcd1127-0c16-7347-faf7-43b285144bd5-837b074a" className="grid-background__item"></div>
  </div>
  <div className="global-css w-embed">
    <style dangerouslySetInnerHTML={{ __html: `
  ::selection {
    color: #fff;
    background: #5739FB;
  }
  /* Scrollbar styling (Chrome/Safari) */
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-thumb { background: #5739fb; cursor: pointer; }
  ::-webkit-scrollbar-thumb:hover { background: #5739fb; }
  ::-webkit-scrollbar-track { background: #1f1f1f; }
  :root {
    --step-0: clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem);
    --step-1: clamp(1.35rem, 0.95rem + 2vw, 2.5rem);
    --step-2: clamp(1.62rem, 0.4443rem + 5.8783vw, 5rem);
    --step-3: clamp(1.9438rem, -0.8584rem + 14.0109vw, 10rem);
    --step-4: clamp(3.3325rem, -3.8127rem + 30.7261vw, 16rem);
  }
  body { overflow-x: hidden; }
  /* Button hover fill */
  .button__icon,
  .button__text {
    position: relative;
    z-index: 5;
  }
  .button::before {
    content: "";
    width: 0%;
    transition: 0.5s ease all;
    position: absolute;
    z-index: -1;
    inset: 0 0 -100% 0;
    border-radius: 50%;
    background: #5739fb;
  }
  .button:hover::before {
    width: 100%;
    inset: 0 0 0 0;
    scale: 2;
  }
  /* Preloader exists in export */
  .preloader { pointer-events: none; }
  /* If you actually have this in your CSS/HTML, keep it; otherwise safe to remove */
  .section-title { font-size: var(--step-3); }
  /* Webflow Designer-only safety */
  html.wf-design-mode .preloader { display: none; }
` }} />
  </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  {/*   ═══════════════════════════════════════════════════════════════════════════
     PORTFOLIO ANIMATIONS - PRODUCTION VERSION (Vercel)
     ═══════════════════════════════════════════════════════════════════════════   */}
  {/*   ═══ DEPENDENCIES (CDN) ═══   */}
  
  
  
  
  
  {/*   ═══ FOUC PREVENTION ═══   */}
  <style dangerouslySetInnerHTML={{ __html: `
  .preloader { pointer-events: none; z-index: 99999; }
  html.wf-design-mode .preloader { display: none; }
  .marquee-text-master-3 .text-h0-4 { opacity: 0; }
  .headline-about-a .label-10 { opacity: 0; }
  .navbar-master { visibility: hidden; opacity: 0; }
  .icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .icon-6-wrap, .cta-icon-3, .cta-icon-5 {
    opacity: 0; transform: scale(0);
  }
  .circle-wrapper { visibility: hidden; }
  #portfolio-chatbot { opacity: 0; pointer-events: none; }
` }} />
  {/*   ═══ PRODUCTION URL ═══   */}
  
  {/*   ═══ CHATBOT IFRAME ═══   */}
  
  {/*   ═══ ANIMATION SCRIPTS ═══   */}
  

      <PageScripts />
    </>
  );
}

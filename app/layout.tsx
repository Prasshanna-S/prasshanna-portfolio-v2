import type { Metadata } from "next";
import "./globals.css";
import { WebflowScripts } from "@/components/WebflowScripts";

export const metadata: Metadata = {
  title: "Prasshanna's Playground",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/webclip.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-wf-page="695afa45576c42dc837b074a" data-wf-site="695afa44576c42dc837b0739">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/webflow-css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/webflow-css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/webflow-css/portfolio-new-e1d9d8.webflow.css" rel="stylesheet" type="text/css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="" />
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="" />
        <link
          rel="preload"
          as="font"
          href="/fonts/Panchang-Variable.ttf"
          type="font/ttf"
          crossOrigin=""
        />
        {/* Google Fonts WebFont loader - must be in head */}
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" />
        <script dangerouslySetInnerHTML={{ __html: `WebFont.load({google:{families:["Inconsolata:400,700","Merriweather:300,300italic,400,400italic,700,700italic,900,900italic","Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic","Instrument Serif:300,400,500,600,700"]}});` }} />
        {/* Touch detection - must be in head */}
        <script dangerouslySetInnerHTML={{ __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);` }} />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            -webkit-font-smoothing: antialiased;
            --step-0: clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem);
            --step-1: clamp(1.35rem, 0.95rem + 2vw, 2.5rem);
            --step-2: clamp(1.62rem, 0.4443rem + 5.8783vw, 5rem);
            --step-3: clamp(1.9438rem, -0.8584rem + 14.0109vw, 10rem);
            --step-4: clamp(3.3325rem, -3.8127rem + 30.7261vw, 16rem);
          }
          body { overflow-x: hidden; }
          html.lenis { height: auto; }
          .lenis.lenis-smooth { scroll-behavior: auto; }
          .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
          .lenis.lenis-stopped { overflow: hidden; }
          @media (min-width: 769px) {
            .lenis.lenis-scrolling iframe { pointer-events: none; }
          }
          .preloader { pointer-events: none; }
          .section {
            content-visibility: auto;
            contain-intrinsic-size: 800px 1000px;
          }
          ::selection { color: #fff; background: #5739FB; }
          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-thumb { background: #5739fb; cursor: pointer; }
          ::-webkit-scrollbar-thumb:hover { background: #5739fb; }
          ::-webkit-scrollbar-track { background: #1f1f1f; }
          .button__icon, .button__text { position: relative; z-index: 5; }
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
          .section-title { font-size: var(--step-3); }
          html.wf-design-mode .preloader { display: none; }
          #heading { visibility: hidden; }
          body.chatbot-expanded {
            overflow: hidden !important;
          }
        `}} />
      </head>
      <body>
        {children}
        {/* Chatbot iframe - static element replacing document.write */}
        <iframe
          id="portfolio-chatbot"
          src="https://portfolio-navigator-kappa.vercel.app/"
          title="Portfolio Assistant"
          allow="clipboard-write"
          loading="eager"
          style={{
            position: 'fixed',
            zIndex: 9999,
            border: 'none',
            background: 'transparent',
            pointerEvents: 'none',
            opacity: 0,
            width: '100%',
            height: '100%',
          }}
        />
        <WebflowScripts />
      </body>
    </html>
  );
}

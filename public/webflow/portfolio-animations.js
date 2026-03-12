/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PORTFOLIO ANIMATIONS - External Script for Webflow
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Version: 4.8.0
 * 
 * Fixes in this version:
 * - Restructured docked/interim modes with proper AnimatePresence
 * - Docked input bar: frosted glass on input-wrapper (like original)
 * - Interim container: separate animated frosted glass panel
 * - Background properly animates in/out when switching modes
 * 
 * Previous (4.7.0):
 * - Interim height reduced to fit content: 260px (desktop) / 240px (mobile)
 * - Scroll threshold for closing interim: 80px from open position
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════════════

  const CDN_BASE = 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739';
  
  const STICKER_CONFIG = {
    baseStickers: [
      // Emojis
      { id: 'emoji1', src: `${CDN_BASE}/695dab4297ec296bdc4b9d6a_Emoji1.svg`, alt: 'Emoji 1', category: 'emoji' },
      { id: 'emoji2', src: `${CDN_BASE}/695dab4297ec296bdc4b9d67_Emoji2.svg`, alt: 'Emoji 2', category: 'emoji' },
      { id: 'emoji3', src: `${CDN_BASE}/695dab4297ec296bdc4b9d69_Emoji3.svg`, alt: 'Emoji 3', category: 'emoji' },
      { id: 'emoji4', src: `${CDN_BASE}/695dab4297ec296bdc4b9d6b_Emoji4.svg`, alt: 'Emoji 4', category: 'emoji' },
      { id: 'emoji5', src: `${CDN_BASE}/695dab4297ec296bdc4b9d68_Emoji5.svg`, alt: 'Emoji 5', category: 'emoji' },
    ],
    // Additional inline SVG stickers for variety
    inlineStickers: [
      { id: 'star', svg: '<svg viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>', alt: 'Star', category: 'shapes' },
      { id: 'heart', svg: '<svg viewBox="0 0 24 24" fill="#FF6B6B"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>', alt: 'Heart', category: 'shapes' },
      { id: 'sparkle', svg: '<svg viewBox="0 0 24 24" fill="#A855F7"><path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7z"/></svg>', alt: 'Sparkle', category: 'shapes' },
      { id: 'lightning', svg: '<svg viewBox="0 0 24 24" fill="#F59E0B"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>', alt: 'Lightning', category: 'shapes' },
      { id: 'fire', svg: '<svg viewBox="0 0 24 24" fill="#EF4444"><path d="M12 23c-4.97 0-9-4.03-9-9 0-3.53 2.04-6.59 5-8.05-.12 1.57.62 3.13 1.93 4.05C9.64 8.08 9 6.12 9 4c0-.26.01-.52.04-.78C10.31 1.88 12 .84 14 .84c0 2.5 1 4.32 2.5 5.82C17.5 7.66 18 8.82 18 10c0 1.18-.47 2.25-1.24 3.06.5.3.98.64 1.44 1.03C19.35 15.54 20 17.21 20 19c0 2.21-1.79 4-4 4h-4z"/></svg>', alt: 'Fire', category: 'shapes' },
      { id: 'peace', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M12 12l-7 7M12 12l7 7"/></svg>', alt: 'Peace', category: 'vibes' },
      { id: 'yin-yang', svg: '<svg viewBox="0 0 24 24" fill="#1a1a1a"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 000 20 5 5 0 010-10 5 5 0 000-10z" fill="#f4f4f4"/><circle cx="12" cy="7" r="1.5" fill="#f4f4f4"/><circle cx="12" cy="17" r="1.5" fill="#1a1a1a"/></svg>', alt: 'Yin Yang', category: 'vibes' },
      { id: 'coffee', svg: '<svg viewBox="0 0 24 24" fill="#8B4513"><path d="M2 21h18v-2H2v2zm16-9v-2c2.21 0 4 1.79 4 4s-1.79 4-4 4H4V8h14v4zm0 4c1.1 0 2-.9 2-2s-.9-2-2-2v4zM6 4h12v2H6V4z"/></svg>', alt: 'Coffee', category: 'vibes' },
      { id: 'music', svg: '<svg viewBox="0 0 24 24" fill="#8B5CF6"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>', alt: 'Music', category: 'vibes' },
      { id: 'rocket', svg: '<svg viewBox="0 0 24 24" fill="#3B82F6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93V4.07z"/><path d="M8 11l4-7 4 7H8z"/></svg>', alt: 'Rocket', category: 'vibes' },
    ],
    defaultSize: 60,
    categories: [
      { id: 'emoji', name: 'Emojis' },
      { id: 'shapes', name: 'Shapes' },
      { id: 'vibes', name: 'Vibes' },
    ]
  };

  // Correct selectors based on Webflow export (Jan 2026)
  // NOTE: The header is now a marquee - no more #heading element
  const HERO_SELECTORS = {
    // The marquee in wrap-hero-4 > section-18 about-a-hero > marquee-text-master-3
    marqueeContainer: '.marquee-text-master-3',
    marqueeText: '.marquee-text-master-3 .text-h0-4',
    // The subtitle is .label-10 inside .headline-about-a
    subtitle: '.headline-about-a .label-10',
    // Hero wrapper
    heroWrapper: '.wrap-hero-4'
  };

  const CHATBOT_CONFIG = {
    iframeId: 'portfolio-chatbot',
    // Origins are dynamically built from window.TUNNEL_URL or window.VERCEL_URL
    allowedOrigins: [
      window.TUNNEL_URL,
      window.VERCEL_URL,
      'http://localhost:3000'
    ].filter(Boolean),
    sizing: {
      resolutionBreakpoints: [
        { minWidth: 2560, percent: 0.60 },
        { minWidth: 1920, percent: 0.65 },
        { minWidth: 1280, percent: 0.75 },
        { minWidth: 768, percent: 0.85 },
        { minWidth: 0, percent: 0.92 }
      ],
      defaultScale: 0.75,
      maxWidth: 1200,
      minWidth: 320,
      aspectRatio: 4 / 3,
      mobile: { breakpoint: 768, navbarHeight: 60, padding: 12 },
      collapsed: { height: 56, mobileHeight: 52 }
    }
  };

  // Page type detection
  const PAGE_CONFIG = {
    isHomePage: () => {
      const path = window.location.pathname;
      return path === '/' || path === '/index.html' || path === '';
    },
    isProjectPage: () => {
      const path = window.location.pathname;
      return path.includes('/project') || path.includes('/work/');
    },
    getPageType: () => {
      if (PAGE_CONFIG.isHomePage()) return 'home';
      if (PAGE_CONFIG.isProjectPage()) return 'project';
      return 'other';
    },
    // Extract project slug from URL for project pages
    getProjectSlug: () => {
      const path = window.location.pathname;
      // Handle paths like /work/us-hab-cti or /project/us-hab-cti
      const match = path.match(/(?:\/work\/|\/project\/)([^\/]+)/);
      return match ? match[1] : null;
    },
    // Get page context for messaging to iframe
    getPageContext: () => {
      const pageType = PAGE_CONFIG.getPageType();
      const context = { pageType };
      
      if (pageType === 'project') {
        context.projectSlug = PAGE_CONFIG.getProjectSlug();
        // Try to get project title from page if available
        const heroTitle = document.querySelector('.hero-story-section h1, .h1-heading-2, [class*="hero"] h1');
        if (heroTitle) {
          context.projectTitle = heroTitle.textContent?.trim();
        }
      }
      
      return context;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // GLOBAL STATE
  // ═══════════════════════════════════════════════════════════════════════════

  const AppState = {
    preloaderDone: false,
    heroSequenceComplete: false,
    chatView: 'hidden',
    userMinimized: false, // Track if user explicitly minimized (vs scroll-based)
    iframeReady: false,
    iframeSynced: false, // Track if iframe has confirmed receiving our state
    isMaximized: false,
    isAnimating: false,
    lastExpandedTime: 0, // Timestamp when chatbot was last expanded (for grace period)
    pendingState: null, // Track pending state change during animation
    // Text animation state
    marqueeElements: [],
    subtitleElement: null,
    scrollTrigger: null,
    pageType: 'home',
    // Track if we came from another page (for transition-in)
    needsTransitionIn: false
  };

  // Check if we came from an internal page transition
  if (sessionStorage.getItem('pageTransitionPending')) {
    AppState.needsTransitionIn = true;
    sessionStorage.removeItem('pageTransitionPending');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INJECT CSS ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  
  (function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes slideInFromBottom {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          transform: scale(1.05);
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      
      @keyframes gentlePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      
      /* Project dock smooth transitions */
      #project-dock {
        will-change: transform, opacity;
      }
      
      #dock-nav-bar {
        will-change: height, opacity;
      }
      
      #mini-chat-window {
        will-change: max-height, opacity;
      }
      
      .dock-pill {
        will-change: transform;
      }
      
      /* Pill icon SVG styling */
      .pill-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }
      
      .pill-icon svg {
        width: 14px;
        height: 14px;
        stroke: currentColor;
      }
      
      /* Expanded nav children background */
      .dock-pill-children {
        background: rgba(0, 0, 0, 0.06);
        border-radius: 16px;
        padding: 3px 6px;
        margin-left: 3px;
      }
      
      /* Tighter pill wrapper spacing */
      .dock-pill-wrapper {
        gap: 0 !important;
      }
      
      /* Nav pill states - improved contrast */
      .dock-pill-parent {
        color: #666 !important;
        background: transparent !important;
      }
      
      .dock-pill-parent:hover {
        color: #333 !important;
        background: rgba(0, 0, 0, 0.08) !important;
      }
      
      .dock-pill-parent.active {
        color: white !important;
        background: #1a1a1a !important;
        font-weight: 600 !important;
      }
      
      .dock-pill-child {
        color: #555 !important;
        background: rgba(255, 255, 255, 0.7) !important;
      }
      
      .dock-pill-child:hover {
        color: #111 !important;
        background: rgba(255, 255, 255, 0.95) !important;
      }
      
      .dock-pill-child.active {
        color: white !important;
        background: #333 !important;
        font-weight: 600 !important;
      }
      
      /* Nav scroll indicators - Use dedicated elements instead of pseudo-elements */
      #dock-nav {
        position: relative;
      }
      
      /* Scroll indicator overlays - fixed position relative to nav container */
      .dock-scroll-indicator {
        position: sticky;
        top: 0;
        bottom: 0;
        width: 32px;
        min-width: 32px;
        height: 100%;
        pointer-events: none;
        z-index: 15;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s ease;
        flex-shrink: 0;
      }
      
      .dock-scroll-indicator.left {
        left: 0;
        background: linear-gradient(to right, rgba(244, 244, 244, 1) 30%, rgba(244, 244, 244, 0.8) 60%, transparent);
        margin-right: -32px;
        border-radius: 16px 0 0 16px;
      }
      
      .dock-scroll-indicator.right {
        right: 0;
        background: linear-gradient(to left, rgba(244, 244, 244, 1) 30%, rgba(244, 244, 244, 0.8) 60%, transparent);
        margin-left: -32px;
        border-radius: 0 16px 16px 0;
      }
      
      .dock-scroll-indicator.visible {
        opacity: 1;
      }
      
      .dock-scroll-indicator svg {
        width: 14px;
        height: 14px;
        color: #888;
        flex-shrink: 0;
      }
      
      .dock-scroll-indicator.visible svg {
        animation: scrollHintPulse 1.5s ease-in-out infinite;
      }
      
      @keyframes scrollHintPulse {
        0%, 100% { opacity: 0.5; transform: translateX(0); }
        50% { opacity: 1; transform: translateX(2px); }
      }
      
      .dock-scroll-indicator.left.visible svg {
        animation: scrollHintPulseLeft 1.5s ease-in-out infinite;
      }
      
      @keyframes scrollHintPulseLeft {
        0%, 100% { opacity: 0.5; transform: translateX(0); }
        50% { opacity: 1; transform: translateX(-2px); }
      }
      
      /* Child count badge on collapsed pills */
      .pill-child-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        margin-left: 4px;
        font-size: 10px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.5);
        background: rgba(0, 0, 0, 0.06);
        border-radius: 8px;
        transition: all 0.25s ease;
      }
      
      .dock-pill-parent.active .pill-child-count {
        color: rgba(255, 255, 255, 0.7);
        background: rgba(255, 255, 255, 0.15);
      }
      
      .dock-pill-parent.expanded .pill-child-count {
        opacity: 0;
        width: 0;
        min-width: 0;
        padding: 0;
        margin: 0;
      }
      
      /* Chat button mascot hover pulse */
      #dock-chat-btn:hover img {
        animation: gentlePulse 0.6s ease-in-out;
      }
      
      /* Mini-chat scrollbar styling */
      #mini-chat-messages::-webkit-scrollbar {
        width: 4px;
      }
      #mini-chat-messages::-webkit-scrollbar-track {
        background: transparent;
      }
      #mini-chat-messages::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 2px;
      }
      
      /* Enhanced mobile scroll for mini-chat messages */
      #mini-chat-messages {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-y: contain;
        scroll-behavior: auto; /* Use auto for more responsive scroll */
        touch-action: pan-y;
        will-change: scroll-position;
      }
      
      /* Hide scrollbar in suggestions */
      #mini-chat-suggestions::-webkit-scrollbar {
        display: none;
      }
      
      /* Dock responsive adjustments */
      @media (max-width: 768px) {
        #project-dock {
          max-width: calc(100vw - 24px) !important;
          bottom: 12px !important;
        }
        
        #dock-chat-input {
          width: 140px !important;
          min-width: 100px !important;
        }
        
        .dock-pill {
          padding: 6px 10px !important;
          font-size: 11px !important;
        }
        
        /* Mobile touch scrolling fixes */
        #dock-nav {
          -webkit-overflow-scrolling: touch !important;
          scroll-snap-type: x proximity;
        }
        
        #mini-chat-messages {
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: contain;
          scroll-behavior: smooth;
        }
        
        #mini-chat-suggestions {
          -webkit-overflow-scrolling: touch !important;
          touch-action: pan-x !important;
        }
      }
      
      /* Full chat backdrop - only this should lock body scroll */
      body.full-chat-open {
        overflow: hidden !important;
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
      }
      
      /* ═══════════════════════════════════════════════════════════════════════
         Mobile touch handling - SIMPLIFIED
         Let native scroll work, only stickers get touch-action: none
         ═══════════════════════════════════════════════════════════════════════ */
      @media (max-width: 768px), (pointer: coarse) {
        /* Touch targets for buttons */
        .dock-pill,
        .suggestion-chip {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* ONLY stickers should block touch for GSAP Draggable */
        .sticker-item,
        .icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .icon-6-wrap, .cta-icon-3, .cta-icon-5 {
          touch-action: none;
        }
        
        /* Reasonable sticker sizes on mobile - NO transform override */
        .icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .icon-6-wrap, .cta-icon-3, .cta-icon-5 {
          min-width: 80px;
          min-height: 80px;
          max-width: 100px;
          max-height: 100px;
        }
      }
      
      /* TABLET: Even larger stickers for better touch targets on iPads */
      @media (min-width: 769px) and (max-width: 1024px), (pointer: coarse) and (min-width: 600px) {
        .icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .icon-6-wrap, .cta-icon-3, .cta-icon-5 {
          min-width: 100px;
          min-height: 100px;
          max-width: 130px;
          max-height: 130px;
        }
        
        /* Chatbot iframe needs to allow touch scrolling inside */
        #portfolio-chatbot {
          touch-action: auto;
        }
      }
    `;
    document.head.appendChild(style);
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // GSAP & LENIS INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════

  function initGSAP() {
    if (!window.gsap) return false;
    gsap.config({ autoSleep: 60 });
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (window.Draggable) gsap.registerPlugin(Draggable);
    return true;
  }

  // Re-enable Lenis for smooth scroll - it's needed for desktop experience
  // Mobile issues were from CSS overrides, not Lenis itself
  function initLenis() {
    if (!window.Lenis || !window.gsap || !window.ScrollTrigger) return null;
    
    // Detect mobile/touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth <= 768;
    
    // On mobile, use native scroll for better touch experience
    if (isTouchDevice && isMobile) {
      console.log('[Portfolio] Mobile detected - using native scroll');
      return null;
    }
    
    // Desktop: use Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;
    return lenis;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE TRANSITIONS - Using Barba.js for smooth AJAX transitions
  // ═══════════════════════════════════════════════════════════════════════════
  
  const PageTransition = {
    overlay: null,
    bars: [],
    isInitialized: false,
    barbaInstance: null,
    
    init() {
      if (this.isInitialized) return;
      this.isInitialized = true;
      
      // Create overlay container for transition animation
      this.overlay = document.createElement('div');
      this.overlay.id = 'page-transition-overlay';
      this.overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 100000;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 1fr;
        pointer-events: none;
        overflow: hidden;
      `;
      
      // Create 12 bars for transition visual
      for (let i = 0; i < 12; i++) {
        const bar = document.createElement('div');
        bar.className = 'transition-bar';
        bar.style.cssText = `
          background: #1f1f1f;
          width: 100%;
          height: 100vh;
          border-right: 1px solid #242424;
        `;
        this.bars.push(bar);
        this.overlay.appendChild(bar);
      }
      
      document.body.appendChild(this.overlay);
      
      // Set initial state based on whether we need transition-in
      if (AppState.needsTransitionIn) {
        console.log('[PageTransition] Showing bars for transition-in');
        gsap.set(this.bars, { y: '0%' });
        this.overlay.style.pointerEvents = 'auto';
      } else {
        gsap.set(this.bars, { y: '-100%' });
      }
    },
    
    // Barba.js integration disabled for now
    initBarba() {
      console.log('[PageTransition] Using manual transitions');
    },
    
    animateIn() {
      return new Promise(resolve => {
        console.log('[PageTransition] Bars animate IN');
        this.overlay.style.pointerEvents = 'auto';
        gsap.fromTo(this.bars, 
          { y: '100%' },
          {
            y: '0%',
            duration: 0.5,
            stagger: { amount: 0.3, from: 'random' },
            ease: 'power3.inOut',
            onComplete: resolve
          }
        );
      });
    },
    
    animateOut() {
      return new Promise(resolve => {
        console.log('[PageTransition] Bars animate OUT');
        gsap.to(this.bars, {
          y: '-100%',
          duration: 0.5,
          stagger: { amount: 0.3, from: 'random' },
          ease: 'power3.inOut',
          onComplete: () => {
            this.overlay.style.pointerEvents = 'none';
            resolve();
          }
        });
      });
    },
    
    // Fallback navigate for non-Barba pages
    async navigate(url) {
      // If Barba is handling transitions, let it do its thing
      if (this.barbaInstance) {
        this.barbaInstance.go(url);
        return;
      }
      
      // Fallback: manual transition
      sessionStorage.setItem('pageTransitionPending', 'true');
      await this.animateIn();
      window.location.href = url;
    }
  };

  // Intercept link clicks for page transitions (fallback if Barba not available)
  function setupPageTransitions() {
    // If Barba is loaded and initialized, it handles link clicks automatically
    if (typeof barba !== 'undefined' && PageTransition.barbaInstance) {
      console.log('[PageTransition] Barba.js handling link clicks');
      return;
    }
    
    // Fallback: manual link interception
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      // Skip external links, anchors, mailto, tel
      if (href.startsWith('http') || href.startsWith('#') || 
          href.startsWith('mailto') || href.startsWith('tel')) return;
      
      // Skip if modifier keys held
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
      
      e.preventDefault();
      PageTransition.navigate(href);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRELOADER - Bars peel away animation
  // ═══════════════════════════════════════════════════════════════════════════

  function initPreloader() {
    return new Promise((resolve) => {
      const preloader = document.querySelector(".preloader");
      
      // If we're doing a page transition-in, skip the preloader
      if (AppState.needsTransitionIn) {
        if (preloader) {
          gsap.set(preloader, { autoAlpha: 0, display: "none" });
        }
        AppState.preloaderDone = true;
        console.log('[Preloader] Skipped (page transition)');
        window.dispatchEvent(new CustomEvent("PreloaderComplete"));
        resolve();
        return;
      }
      
      if (!preloader) {
        console.log('[Preloader] No preloader found');
        AppState.preloaderDone = true;
        window.dispatchEvent(new CustomEvent("PreloaderComplete"));
        resolve();
        return;
      }

      // Get the bar elements
      const bars = preloader.querySelectorAll(".preloader__content");
      const preloaderItems = preloader.querySelector(".preloader__items");
      const preloaderText = preloader.querySelector(".preloader__text");
      
      console.log('[Preloader] Found', bars.length, 'bars');

      // Ensure preloader is properly styled as a grid
      preloader.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99999;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 1fr;
        width: 100%;
        height: 100vh;
        overflow: hidden;
      `;
      
      // Style each bar
      bars.forEach(bar => {
        bar.style.cssText = `
          width: 100%;
          height: 100%;
          background-color: #1f1f1f;
          border-right: 1px solid #242424;
        `;
      });
      
      // Ensure preloader items stay centered
      if (preloaderItems) {
        preloaderItems.style.cssText = `
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
        `;
      }

      // Rotating text
      if (preloaderText) {
        const words = ["Building 3D...", "Loading assets...", "Almost there...", "Setting the stage..."];
        for (let i = words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [words[i], words[j]] = [words[j], words[i]];
        }
        let k = 0;
        const interval = setInterval(() => {
          preloaderText.textContent = words[k++ % words.length];
        }, 600);
        preloader._textInterval = interval;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

      if (preloaderItems) {
        tl.from(preloaderItems, { y: 150, duration: 1 })
          .to(preloaderItems, { opacity: 1, duration: 0.5 }, "<0.2");
      }

      // Wait for resources
      const resourcePromise = new Promise(r => {
        const promises = [];
        if (document.fonts?.ready) promises.push(document.fonts.ready);
        
        document.querySelectorAll('.section-11 img, .section-10 img, .wrap-hero-4 img').forEach(img => {
          if (!img.complete) {
            promises.push(new Promise(imgR => { img.onload = imgR; img.onerror = imgR; }));
          }
        });
        
        promises.push(new Promise(t => setTimeout(t, 1000)));
        Promise.all(promises).then(r);
      });

      resourcePromise.then(() => {
        if (preloader._textInterval) clearInterval(preloader._textInterval);

        // Fade out the items first
        tl.to(preloaderItems, { 
          opacity: 0, 
          y: -50,
          duration: 0.4 
        });
        
        // Then animate bars peeling away one by one
        tl.to(bars, {
          yPercent: -100,
          duration: 0.6,
          stagger: { 
            amount: 0.4, 
            from: "random" 
          },
          ease: "power3.inOut"
        }, "-=0.2")
        .set(preloader, { display: "none" });

        tl.eventCallback("onComplete", () => {
          AppState.preloaderDone = true;
          console.log('[Preloader] Complete');
          window.dispatchEvent(new CustomEvent("PreloaderComplete"));
          resolve();
        });
      });

      // Failsafe - reduced to 5 seconds for better UX
      setTimeout(() => {
        if (!AppState.preloaderDone) {
          console.log('[Preloader] Failsafe triggered');
          if (preloader._textInterval) clearInterval(preloader._textInterval);
          gsap.to(preloader, { 
            autoAlpha: 0, 
            duration: 0.3,
            onComplete: () => {
              gsap.set(preloader, { display: "none" });
            }
          });
          AppState.preloaderDone = true;
          window.dispatchEvent(new CustomEvent("PreloaderComplete"));
          resolve();
        }
      }, 5000);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CIRCULAR IMAGE LAYOUT
  // ═══════════════════════════════════════════════════════════════════════════

  function initCircularImages() {
    const wrapper = document.querySelector(".circle-wrapper");
    const items = document.querySelectorAll(".circle-image");
    
    if (!wrapper || !items.length) {
      console.log('[Circular] No circle-wrapper or circle-image found');
      return;
    }
    
    console.log('[Circular] Setting up', items.length, 'images');
    
    const r = (Math.min(wrapper.offsetWidth, wrapper.offsetHeight) / 2) - 50;
    const stepDeg = 360 / items.length;
    
    items.forEach((item, i) => {
      const angle = stepDeg * i;
      const rad = angle * Math.PI / 180;
      gsap.set(item, {
        x: Math.cos(rad) * r,
        y: Math.sin(rad) * r,
        rotation: angle + 90,
        transformOrigin: "50% 50%",
        position: "absolute"
      });
    });
    
    // Make wrapper visible
    gsap.set(wrapper, { visibility: 'visible', opacity: 1 });
    console.log('[Circular] Layout complete');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // STICKER SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════

  const StickerManager = {
    stickers: new Map(),
    pickerOpen: false,
    pickerElement: null,
    buttonElement: null,
    tooltipElement: null,
    isTrashMode: false,
    activeDragCount: 0,
    collapsedRect: null,
    hasShownTooltip: false,
    heroHeight: 0, // Track hero section height for sticker visibility
    stickersVisible: true,
    
    stickerIcon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>`,
    
    trashIcon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>`,
    
    init() {
      this.createButton();
      this.createPickerPanel();
      this.createTooltip();
      this.initExistingStickers();
      this.setupScrollVisibility();
      // Check if user has seen tooltip before
      this.hasShownTooltip = localStorage.getItem('stickerTooltipShown') === 'true';
      console.log('[Stickers] System initialized');
    },
    
    // Hide stickers AND sticker button when scrolling past hero section
    setupScrollVisibility() {
      const hero = document.querySelector('.wrap-hero-4'); // Only the actual hero section
      if (hero) {
        this.heroHeight = hero.offsetHeight;
      }
      
      window.addEventListener('scroll', () => {
        const shouldHide = window.scrollY > (this.heroHeight * 0.7); // Hide when 70% scrolled past hero
        if (shouldHide && this.stickersVisible) {
          this.hideAllStickers();
          this.hideStickerButton(); // Also hide the button outside hero
        } else if (!shouldHide && !this.stickersVisible) {
          this.showAllStickers();
          // Re-show button only if chatbot is collapsed
          if (window.AppState?.chatView === 'collapsed') {
            this.showButton(this.collapsedRect);
          }
        }
      }, { passive: true });
    },
    
    hideAllStickers() {
      this.stickersVisible = false;
      // Hide user-placed stickers
      this.stickers.forEach((sticker) => {
        gsap.to(sticker, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in' });
      });
      // Hide existing page stickers
      const pageStickers = document.querySelectorAll('.icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .icon-6-wrap, .cta-icon-3, .cta-icon-5');
      pageStickers.forEach((sticker) => {
        gsap.to(sticker, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in' });
      });
    },
    
    // Hide all stickers except the Figma icon (used during game mode)
    hideAllStickersExceptFigma() {
      this.stickersVisible = false;
      // Hide user-placed stickers
      this.stickers.forEach((sticker) => {
        gsap.to(sticker, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in' });
      });
      // Hide existing page stickers EXCEPT the Figma icon (.icon-6-wrap)
      const pageStickers = document.querySelectorAll('.icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .cta-icon-3, .cta-icon-5');
      pageStickers.forEach((sticker) => {
        gsap.to(sticker, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in' });
      });
    },
    
    showAllStickers() {
      this.stickersVisible = true;
      // Show user-placed stickers
      this.stickers.forEach((sticker) => {
        // CRITICAL: Kill any pending GSAP animations that might override our visibility changes
        gsap.killTweensOf(sticker);
        sticker.style.visibility = 'visible';
        sticker.style.pointerEvents = 'auto';
        gsap.to(sticker, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
      });
      // Show existing page stickers - IMPORTANT: Reset visibility and pointerEvents first
      const pageStickers = document.querySelectorAll('.icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .icon-6-wrap, .cta-icon-3, .cta-icon-5');
      pageStickers.forEach((sticker) => {
        // CRITICAL: Kill any pending GSAP animations that might override our visibility changes
        gsap.killTweensOf(sticker);
        sticker.style.visibility = 'visible';
        sticker.style.pointerEvents = 'auto';
        gsap.to(sticker, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
      });
      // Re-show button - always show when returning to hero (chatbot state will show/hide appropriately)
      if (this.buttonElement && this.collapsedRect) {
        this.showButton(this.collapsedRect);
      }
    },
    
    // Hide sticker button (when outside hero section)
    hideStickerButton() {
      if (!this.buttonElement) return;
      if (this.pickerOpen) this.togglePicker(); // Close picker if open
      
      gsap.to(this.buttonElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => { this.buttonElement.style.pointerEvents = 'none'; }
      });
    },
    
    createTooltip() {
      const tooltip = document.createElement('div');
      tooltip.id = 'sticker-tooltip';
      tooltip.innerHTML = `
        <div class="tooltip-content">
          <span class="tooltip-icon">✨</span>
          <span class="tooltip-text">Click here to add more stickers!</span>
        </div>
        <div class="tooltip-arrow"></div>
      `;
      tooltip.style.cssText = `
        position: fixed;
        z-index: 10002;
        background: #f4f4f4;
        color: #121212;
        padding: 14px 18px;
        border-radius: 16px;
        font-size: 13px;
        font-weight: 500;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1);
        white-space: nowrap;
        border: 1px solid rgba(0, 0, 0, 0.06);
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        #sticker-tooltip .tooltip-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        #sticker-tooltip .tooltip-icon {
          font-size: 18px;
        }
        #sticker-tooltip .tooltip-text {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 14px;
        }
        #sticker-tooltip .tooltip-arrow {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #f4f4f4;
          filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.05));
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(tooltip);
      this.tooltipElement = tooltip;
    },
    
    showTooltip() {
      if (this.hasShownTooltip || !this.tooltipElement || !this.buttonElement) return;
      
      // Check if button is actually visible (not just checking style.opacity)
      const btnStyle = window.getComputedStyle(this.buttonElement);
      const btnOpacity = parseFloat(btnStyle.opacity);
      if (btnOpacity < 0.5 || btnStyle.pointerEvents === 'none') return;
      
      const btnRect = this.buttonElement.getBoundingClientRect();
      const tooltipX = btnRect.left + btnRect.width / 2;
      const tooltipY = btnRect.top - 54;
      
      // Set initial position with GSAP for consistent animation
      gsap.set(this.tooltipElement, {
        left: tooltipX,
        top: tooltipY,
        xPercent: -50,
        y: 10,
        opacity: 0,
        display: 'block'
      });
      
      gsap.to(this.tooltipElement, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.5)'
      });
      
      // Auto-hide after 4 seconds
      setTimeout(() => this.hideTooltip(), 4000);
      
      // Mark as shown
      this.hasShownTooltip = true;
      localStorage.setItem('stickerTooltipShown', 'true');
    },
    
    hideTooltip() {
      if (!this.tooltipElement) return;
      gsap.to(this.tooltipElement, {
        opacity: 0,
        y: 10,
        duration: 0.25,
        ease: 'power2.in'
      });
    },
    
    initExistingStickers() {
      const selectors = '.icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .icon-6-wrap, .cta-icon-3, .cta-icon-5';
      const stickers = document.querySelectorAll(selectors);
      
      stickers.forEach((sticker, i) => {
        // Disable native browser drag on all images inside the sticker
        const imgs = sticker.querySelectorAll('img');
        imgs.forEach(img => {
          img.setAttribute('draggable', 'false');
          img.style.pointerEvents = 'none';
        });
        
        gsap.set(sticker, { scale: 0, opacity: 0, rotation: -15 + Math.random() * 30 });
        this.makeDraggable(sticker, `existing-${i}`, false);
      });
      
      return stickers;
    },
    
    createButton() {
      const btn = document.createElement('button');
      btn.id = 'sticker-btn';
      btn.innerHTML = this.stickerIcon;
      btn.style.cssText = `
        position: fixed;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        cursor: pointer;
        color: #1a1a1a;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      `;
      
      btn.addEventListener('mouseenter', () => {
        if (!this.isTrashMode) {
          btn.style.transform = 'scale(1.05)';
          btn.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.15)';
        }
      });
      
      btn.addEventListener('mouseleave', () => {
        if (!this.isTrashMode) {
          btn.style.transform = 'scale(1)';
          btn.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
      });
      
      btn.addEventListener('click', () => {
        if (!this.isTrashMode) this.togglePicker();
      });
      
      document.body.appendChild(btn);
      this.buttonElement = btn;
    },
    
    positionButton(collapsedRect) {
      if (!this.buttonElement || !collapsedRect) return;
      this.collapsedRect = collapsedRect;
      
      const vw = window.innerWidth;
      const isMobile = vw <= 768;
      
      // Adjust button size for mobile
      const btnWidth = isMobile ? 44 : 56;
      const btnHeight = collapsedRect.height;
      const gap = isMobile ? 8 : 12;
      
      // Calculate position - ensure it stays within viewport
      let leftPos = collapsedRect.x - btnWidth - gap;
      
      // On mobile, if button would go off-screen, position it above the chatbot
      if (leftPos < 12) {
        // Position above the chatbot dock instead of to the left
        this.buttonElement.style.left = `${collapsedRect.x + collapsedRect.width - btnWidth}px`;
        this.buttonElement.style.top = `${collapsedRect.y - btnHeight - gap}px`;
      } else {
        this.buttonElement.style.left = `${leftPos}px`;
        this.buttonElement.style.top = `${collapsedRect.y}px`;
      }
      
      this.buttonElement.style.width = `${btnWidth}px`;
      this.buttonElement.style.height = `${btnHeight}px`;
    },
    
    showButton(collapsedRect) {
      if (!this.buttonElement) return;
      // Don't show button if we're outside the hero section
      if (!this.stickersVisible) return;
      
      if (collapsedRect) this.positionButton(collapsedRect);
      
      gsap.to(this.buttonElement, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        onStart: () => { this.buttonElement.style.pointerEvents = 'auto'; }
      });
    },
    
    hideButton() {
      if (!this.buttonElement) return;
      if (this.pickerOpen) this.togglePicker();
      
      gsap.to(this.buttonElement, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => { this.buttonElement.style.pointerEvents = 'none'; }
      });
    },
    
    enterTrashMode() {
      if (this.isTrashMode || !this.buttonElement) return;
      this.isTrashMode = true;
      if (this.pickerOpen) this.togglePicker();
      
      gsap.killTweensOf(this.buttonElement);
      
      this.buttonElement.innerHTML = this.trashIcon;
      this.buttonElement.style.background = 'rgba(239, 68, 68, 0.9)';
      this.buttonElement.style.color = 'white';
      this.buttonElement.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      
      gsap.to(this.buttonElement, {
        scale: 1.1,
        duration: 0.2,
        ease: 'back.out(1.5)'
      });
    },
    
    exitTrashMode() {
      if (!this.buttonElement) return;
      
      // Force reset regardless of isTrashMode state
      this.isTrashMode = false;
      
      gsap.killTweensOf(this.buttonElement);
      
      this.buttonElement.innerHTML = this.stickerIcon;
      this.buttonElement.style.background = 'rgba(255, 255, 255, 0.95)';
      this.buttonElement.style.color = '#1a1a1a';
      this.buttonElement.style.borderColor = 'rgba(0, 0, 0, 0.08)';
      
      gsap.to(this.buttonElement, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    },
    
    highlightTrash(highlight) {
      if (!this.isTrashMode || !this.buttonElement) return;
      gsap.to(this.buttonElement, {
        scale: highlight ? 1.2 : 1.1,
        background: highlight ? 'rgba(220, 38, 38, 1)' : 'rgba(239, 68, 68, 0.9)',
        duration: 0.15
      });
    },
    
    isOverTrash(x, y) {
      if (!this.buttonElement || !this.isTrashMode) return false;
      const rect = this.buttonElement.getBoundingClientRect();
      const buffer = 15;
      return x >= rect.left - buffer && x <= rect.right + buffer &&
             y >= rect.top - buffer && y <= rect.bottom + buffer;
    },
    
    createPickerPanel() {
      const panel = document.createElement('div');
      panel.id = 'sticker-picker';
      panel.style.cssText = `
        position: fixed;
        z-index: 10001;
        width: 280px;
        max-height: 400px;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 16px;
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
        opacity: 0;
        pointer-events: none;
        transform: translateY(10px) scale(0.95);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      `;
      
      const header = document.createElement('div');
      header.style.cssText = `padding: 12px 14px; border-bottom: 1px solid rgba(0, 0, 0, 0.05); font-weight: 600; font-size: 13px; color: #1a1a1a;`;
      header.textContent = 'Add Stickers';
      
      // Scrollable content area
      const content = document.createElement('div');
      content.style.cssText = `flex: 1; overflow-y: auto; padding: 12px;`;
      
      // Add category sections
      STICKER_CONFIG.categories.forEach(category => {
        const section = document.createElement('div');
        section.style.cssText = `margin-bottom: 16px;`;
        
        const categoryLabel = document.createElement('div');
        categoryLabel.style.cssText = `font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: rgba(0,0,0,0.4); margin-bottom: 8px;`;
        categoryLabel.textContent = category.name;
        section.appendChild(categoryLabel);
        
        const grid = document.createElement('div');
        grid.style.cssText = `display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;`;
        
        // Add base stickers for this category
        STICKER_CONFIG.baseStickers.filter(s => s.category === category.id).forEach(sticker => {
          const item = this.createStickerItem(sticker, 'img');
          grid.appendChild(item);
        });
        
        // Add inline SVG stickers for this category
        STICKER_CONFIG.inlineStickers.filter(s => s.category === category.id).forEach(sticker => {
          const item = this.createStickerItem(sticker, 'svg');
          grid.appendChild(item);
        });
        
        section.appendChild(grid);
        content.appendChild(section);
      });
      
      // Footer with "Remove All" button
      const footer = document.createElement('div');
      footer.style.cssText = `padding: 10px 12px; border-top: 1px solid rgba(0, 0, 0, 0.05);`;
      
      const removeAllBtn = document.createElement('button');
      removeAllBtn.style.cssText = `
        width: 100%;
        padding: 8px 12px;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 8px;
        font-size: 12px;
        font-weight: 500;
        color: #dc2626;
        cursor: pointer;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      `;
      removeAllBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
        Remove All Stickers
      `;
      
      removeAllBtn.addEventListener('mouseenter', () => {
        removeAllBtn.style.background = 'rgba(239, 68, 68, 0.2)';
        removeAllBtn.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      });
      removeAllBtn.addEventListener('mouseleave', () => {
        removeAllBtn.style.background = 'rgba(239, 68, 68, 0.1)';
        removeAllBtn.style.borderColor = 'rgba(239, 68, 68, 0.2)';
      });
      removeAllBtn.addEventListener('click', () => {
        this.removeAllStickers();
        this.togglePicker(); // Close picker after removing
      });
      
      footer.appendChild(removeAllBtn);
      
      panel.appendChild(header);
      panel.appendChild(content);
      panel.appendChild(footer);
      document.body.appendChild(panel);
      this.pickerElement = panel;
    },
    
    createStickerItem(sticker, type) {
      const item = document.createElement('div');
      item.style.cssText = `width: 54px; height: 54px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.02); border-radius: 10px; cursor: pointer; transition: transform 0.15s, background 0.15s;`;
      item.setAttribute('data-sticker-type', type);
      item.setAttribute('data-sticker-id', sticker.id);
      
      if (type === 'img') {
        // Add draggable="false" to prevent native browser drag behavior
        item.innerHTML = `<img src="${sticker.src}" alt="${sticker.alt}" draggable="false" style="width: 36px; height: 36px; object-fit: contain; pointer-events: none;">`;
        item.setAttribute('data-sticker-src', sticker.src);
        // Simple click handler - add sticker on click
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          this.addSticker(sticker.src, sticker.id);
        });
      } else {
        item.innerHTML = `<div style="width: 36px; height: 36px; pointer-events: none;">${sticker.svg}</div>`;
        item.setAttribute('data-sticker-svg', sticker.svg);
        // Simple click handler - add sticker on click
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          this.addInlineSticker(sticker.svg, sticker.id);
        });
      }
      
      item.addEventListener('mouseenter', () => { item.style.transform = 'scale(1.1)'; item.style.background = 'rgba(26, 26, 26, 0.08)'; });
      item.addEventListener('mouseleave', () => { item.style.transform = 'scale(1)'; item.style.background = 'rgba(0,0,0,0.02)'; });
      
      return item;
    },
    
    // Add sticker at a specific position (for drag-and-drop)
    addStickerAtPosition(src, id, x, y) {
      const sticker = document.createElement('div');
      const uniqueId = `sticker-${id}-${Date.now()}`;
      sticker.id = uniqueId;
      sticker.className = 'user-sticker';
      sticker.innerHTML = `<img src="${src}" alt="Sticker" draggable="false" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;">`;
      
      const hero = document.querySelector('.wrap-hero-4');
      if (hero) {
        if (window.getComputedStyle(hero).position === 'static') {
          hero.style.position = 'relative';
        }
        
        // Clamp position within hero bounds
        const heroRect = hero.getBoundingClientRect();
        const clampedX = Math.max(0, Math.min(x, heroRect.width - STICKER_CONFIG.defaultSize));
        const clampedY = Math.max(0, Math.min(y, heroRect.height - STICKER_CONFIG.defaultSize));
        
        sticker.style.cssText = `
          position: absolute;
          width: ${STICKER_CONFIG.defaultSize}px;
          height: ${STICKER_CONFIG.defaultSize}px;
          z-index: 100;
          cursor: grab;
          user-select: none;
          touch-action: none;
          left: ${clampedX}px;
          top: ${clampedY}px;
        `;
        
        hero.appendChild(sticker);
      }
      
      gsap.fromTo(sticker, { scale: 0, rotation: -10, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.3, ease: 'back.out(2)' });
      
      this.makeDraggable(sticker, uniqueId, true);
      this.stickers.set(uniqueId, sticker);
    },
    
    // Add inline sticker at a specific position (for drag-and-drop)
    addInlineStickerAtPosition(svg, id, x, y) {
      const uniqueId = `${id}-${Date.now()}`;
      const sticker = document.createElement('div');
      sticker.id = uniqueId;
      sticker.className = 'user-sticker';
      sticker.innerHTML = svg;
      sticker.querySelector('svg').style.cssText = 'width: 100%; height: 100%; pointer-events: none;';
      
      const hero = document.querySelector('.wrap-hero-4');
      if (hero) {
        if (window.getComputedStyle(hero).position === 'static') {
          hero.style.position = 'relative';
        }
        
        // Clamp position within hero bounds
        const heroRect = hero.getBoundingClientRect();
        const clampedX = Math.max(0, Math.min(x, heroRect.width - STICKER_CONFIG.defaultSize));
        const clampedY = Math.max(0, Math.min(y, heroRect.height - STICKER_CONFIG.defaultSize));
        
        sticker.style.cssText = `
          position: absolute;
          width: ${STICKER_CONFIG.defaultSize}px;
          height: ${STICKER_CONFIG.defaultSize}px;
          z-index: 100;
          cursor: grab;
          user-select: none;
          touch-action: none;
          left: ${clampedX}px;
          top: ${clampedY}px;
        `;
        
        hero.appendChild(sticker);
      }
      
      gsap.fromTo(sticker, { scale: 0, rotation: -10, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.3, ease: 'back.out(2)' });
      
      this.makeDraggable(sticker, uniqueId, true);
      this.stickers.set(uniqueId, sticker);
    },
    
    addInlineSticker(svg, id) {
      const uniqueId = `${id}-${Date.now()}`;
      const sticker = document.createElement('div');
      sticker.id = uniqueId;
      sticker.className = 'user-sticker';
      sticker.innerHTML = svg;
      sticker.querySelector('svg').style.cssText = 'width: 100%; height: 100%; pointer-events: none;';
      
      // Position sticker relative to hero section
      const hero = document.querySelector('.wrap-hero-4');
      if (hero) {
        // Ensure hero has position relative for absolute children
        if (window.getComputedStyle(hero).position === 'static') {
          hero.style.position = 'relative';
        }
        
        // Calculate random position within hero bounds (avoiding edges)
        const heroRect = hero.getBoundingClientRect();
        const padding = 50; // Keep stickers away from edges
        const stickerSize = STICKER_CONFIG.defaultSize;
        
        // Position within the hero section
        const maxX = heroRect.width - stickerSize - padding * 2;
        const maxY = heroRect.height - stickerSize - padding * 2;
        const randomX = padding + Math.random() * maxX;
        const randomY = padding + Math.random() * Math.min(maxY, 300); // Keep in upper part of hero
        
        sticker.style.cssText = `
          position: absolute;
          width: ${STICKER_CONFIG.defaultSize}px;
          height: ${STICKER_CONFIG.defaultSize}px;
          z-index: 100;
          cursor: grab;
          user-select: none;
          touch-action: none;
          left: ${randomX}px;
          top: ${randomY}px;
        `;
        
        hero.appendChild(sticker);
      } else {
        // Fallback to body if hero not found
        sticker.style.cssText = `position: fixed; width: ${STICKER_CONFIG.defaultSize}px; height: ${STICKER_CONFIG.defaultSize}px; z-index: 9000; cursor: grab; user-select: none; touch-action: none; left: 100px; top: 150px;`;
        document.body.appendChild(sticker);
      }
      
      gsap.set(sticker, { scale: 0, opacity: 0, rotation: -20 + Math.random() * 40 });
      gsap.to(sticker, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' });
      
      this.makeDraggable(sticker, uniqueId, true);
      this.stickers.set(uniqueId, sticker);
      this.togglePicker();
    },
    
    // Remove all user-placed stickers
    removeAllStickers() {
      if (this.stickers.size === 0) return;
      
      // Animate and remove each sticker
      this.stickers.forEach((sticker, id) => {
        gsap.to(sticker, {
          scale: 0,
          opacity: 0,
          rotation: 20,
          duration: 0.25,
          ease: 'back.in(2)',
          onComplete: () => {
            sticker.remove();
          }
        });
      });
      
      // Clear the map
      this.stickers.clear();
      console.log('[Stickers] All stickers removed');
    },
    
    togglePicker() {
      if (this.isTrashMode) return;
      this.pickerOpen = !this.pickerOpen;
      
      if (this.pickerOpen && this.buttonElement) {
        const btnRect = this.buttonElement.getBoundingClientRect();
        this.pickerElement.style.left = `${btnRect.left}px`;
        this.pickerElement.style.bottom = `${window.innerHeight - btnRect.top + 8}px`;
        this.pickerElement.style.top = 'auto';
      }
      
      if (this.pickerOpen) {
        gsap.to(this.pickerElement, { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'back.out(1.5)', onStart: () => { this.pickerElement.style.pointerEvents = 'auto'; } });
      } else {
        gsap.to(this.pickerElement, { opacity: 0, y: 10, scale: 0.95, duration: 0.15, ease: 'power2.in', onComplete: () => { this.pickerElement.style.pointerEvents = 'none'; } });
      }
    },
    
    addSticker(src, id) {
      const sticker = document.createElement('div');
      const uniqueId = `sticker-${id}-${Date.now()}`;
      sticker.id = uniqueId;
      sticker.className = 'user-sticker';
      // Add draggable="false" to prevent native browser drag behavior (which shows tooltips)
      sticker.innerHTML = `<img src="${src}" alt="Sticker" draggable="false" style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;">`;
      
      // Position sticker relative to hero section
      const hero = document.querySelector('.wrap-hero-4');
      if (hero) {
        // Ensure hero has position relative for absolute children
        if (window.getComputedStyle(hero).position === 'static') {
          hero.style.position = 'relative';
        }
        
        // Calculate random position within hero bounds (avoiding edges)
        const heroRect = hero.getBoundingClientRect();
        const padding = 50; // Keep stickers away from edges
        const stickerSize = STICKER_CONFIG.defaultSize;
        
        // Position within the hero section
        const maxX = heroRect.width - stickerSize - padding * 2;
        const maxY = heroRect.height - stickerSize - padding * 2;
        const randomX = padding + Math.random() * maxX;
        const randomY = padding + Math.random() * Math.min(maxY, 300); // Keep in upper part of hero
        
        sticker.style.cssText = `
          position: absolute;
          width: ${STICKER_CONFIG.defaultSize}px;
          height: ${STICKER_CONFIG.defaultSize}px;
          z-index: 100;
          cursor: grab;
          user-select: none;
          touch-action: none;
          left: ${randomX}px;
          top: ${randomY}px;
        `;
        
        hero.appendChild(sticker);
      } else {
        // Fallback to body if hero not found
        sticker.style.cssText = `position: fixed; width: ${STICKER_CONFIG.defaultSize}px; height: ${STICKER_CONFIG.defaultSize}px; z-index: 9000; cursor: grab; user-select: none; touch-action: none; left: 100px; top: 150px;`;
        document.body.appendChild(sticker);
      }
      
      gsap.fromTo(sticker, { scale: 0, rotation: -20, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' });
      
      this.makeDraggable(sticker, uniqueId, true);
      this.stickers.set(uniqueId, sticker);
      this.togglePicker();
    },
    
    deleteSticker(element, id) {
      gsap.to(element, { scale: 0, opacity: 0, rotation: 20, duration: 0.25, ease: 'back.in(2)', onComplete: () => { element.remove(); this.stickers.delete(id); } });
    },
    
    makeDraggable(element, id, canDelete) {
      const self = this;
      const DRAG_THRESHOLD = 5;
      let dragStartPos = null;
      let isDragging = false;
      
      // Check if this is the Figma icon (for game integration)
      const isFigmaIcon = element.classList.contains('icon-6-wrap');
      
      // Check if this is a user-placed sticker (in hero) vs a page sticker
      const isUserSticker = element.classList.contains('user-sticker');
      
      // Get the hero section for bounds
      const hero = document.querySelector('.wrap-hero-4');
      const boundsElement = isUserSticker && hero ? hero : document.body;
      
      // Prevent native dragstart event on the element (this prevents browser tooltips)
      element.addEventListener('dragstart', (e) => e.preventDefault());
      
      Draggable.create(element, {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: boundsElement,
        inertia: true,
        cursor: 'grab',
        activeCursor: 'grabbing',
        zIndexBoost: true,
        // Stickers need touch-action: none to be draggable, handled via CSS
        
        onPress: function(e) {
          dragStartPos = { x: e.clientX || e.touches?.[0]?.clientX, y: e.clientY || e.touches?.[0]?.clientY };
          isDragging = false;
          gsap.to(this.target, { scale: 1.1, duration: 0.15, ease: 'power2.out' });
        },
        
        onDragStart: function() {
          // Drag has actually started
          if (isFigmaIcon) {
            console.log('[StickerManager] Figma onDragStart fired');
          }
        },
        
        onDrag: function(e) {
          if (!isDragging && dragStartPos) {
            const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
            const currentY = e.clientY || e.touches?.[0]?.clientY || 0;
            const dx = Math.abs(currentX - dragStartPos.x);
            const dy = Math.abs(currentY - dragStartPos.y);
            
            if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
              isDragging = true;
              self.activeDragCount++;
              if (canDelete) self.enterTrashMode();
            }
          }
          
          const dir = this.getDirection('velocity');
          const rot = dir === 'left' ? -8 : dir === 'right' ? 8 : 0;
          gsap.to(this.target, { rotation: rot, duration: 0.1 });
          
          if (canDelete && self.isTrashMode) {
            const rect = this.target.getBoundingClientRect();
            self.highlightTrash(self.isOverTrash(rect.left + rect.width/2, rect.top + rect.height/2));
          }
        },
        
        onRelease: function() {
          const wasActuallyDragging = isDragging;
          
          if (wasActuallyDragging) {
            self.activeDragCount = Math.max(0, self.activeDragCount - 1);
            
            // Show tooltip hint about adding more stickers (first time only)
            if (!self.hasShownTooltip && self.buttonElement) {
              const btnOpacity = parseFloat(window.getComputedStyle(self.buttonElement).opacity);
              if (btnOpacity > 0.5) {
                setTimeout(() => self.showTooltip(), 500);
              }
            }
          }
          
          if (canDelete && self.isTrashMode && wasActuallyDragging) {
            const rect = this.target.getBoundingClientRect();
            if (self.isOverTrash(rect.left + rect.width/2, rect.top + rect.height/2)) {
              self.deleteSticker(this.target, id);
            }
          }
          
          if (self.isTrashMode && self.activeDragCount === 0) {
            self.exitTrashMode();
          }
          
          isDragging = false;
          dragStartPos = null;
          
          gsap.to(this.target, { scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        }
      });
      
      if (!('ontouchstart' in window)) {
        element.addEventListener('mouseenter', () => { 
          if (!Draggable.get(element)?.isDragging && !isDragging) 
            gsap.to(element, { scale: 1.05, duration: 0.2 }); 
        });
        element.addEventListener('mouseleave', () => { 
          if (!Draggable.get(element)?.isDragging && !isDragging) 
            gsap.to(element, { scale: 1, duration: 0.2 }); 
        });
      }
    },
    
    animateStickerSlap() {
      return new Promise(resolve => {
        const stickers = document.querySelectorAll('.icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .icon-6-wrap, .cta-icon-3, .cta-icon-5');
        if (!stickers.length) { resolve(); return; }
        
        const tl = gsap.timeline({ onComplete: resolve });
        stickers.forEach((sticker, i) => {
          const rot = -15 + Math.random() * 30;
          tl.to(sticker, { scale: 1, opacity: 1, rotation: rot, duration: 0.4, ease: 'back.out(2.5)' }, i * 0.06);
        });
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PROJECT DOCK - Integrated Navigation + Mini-Chat for Project Pages
  // ═══════════════════════════════════════════════════════════════════════════
  // 
  // Design: Matches chatbot's squared-off frosted glass style
  // States:
  //   - 'nav': Navigation pills visible, chat button on right
  //   - 'mini-chat': Nav condensed to icon, mini chat input + suggestions shown
  //   - 'chat-active': Mini chat window open with conversation
  //   - 'full-chat': Dock hidden, full chatbot visible
  // ═══════════════════════════════════════════════════════════════════════════
  
  const ProjectDock = {
    container: null,
    navContainer: null,
    chatContainer: null,
    miniChatWindow: null,
    navButton: null,
    pills: [],
    chatInput: null,
    isVisible: false,
    activeSection: null,
    scrollObserver: null,
    state: 'nav', // 'nav' | 'mini-chat' | 'chat-active' | 'full-chat'
    messages: [],
    isLoading: false,
    projectContext: null,
    questionBank: null,         // Loaded from API for training-enabled questions
    questionBankIndex: 0,       // Current index in question bank rotation
    questionBankLoaded: false,  // Track if API questions have been fetched
    
    // Design tokens matching chatbot
    styles: {
      borderRadius: '12px',
      innerRadius: '8px',
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(40px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      accentColor: '#1a1a1a',
    },
    
    // Project-specific suggestions with comprehensive keywords for intelligent matching
    suggestions: [
      { label: 'What is this?', prompt: 'overview', keywords: ['what', 'about', 'overview', 'summary', 'project', 'this', 'tell', 'explain', 'describe', 'hab', 'cti', 'platform', 'clearinghouse'] },
      { label: 'Your role', prompt: 'role', keywords: ['role', 'responsibility', 'did', 'work', 'contribution', 'job', 'lead', 'ux', 'designer', 'your', 'you', 'prasshanna', 'imet'] },
      { label: 'Worth it?', prompt: 'worthIt', keywords: ['worth', 'value', 'success', 'satisfied', 'proud', 'happy', 'feel', 'think'] },
      { label: 'Challenges', prompt: 'challenges', keywords: ['challenge', 'problem', 'difficult', 'hard', 'issue', 'obstacle', 'struggle', 'pain', 'frustration', 'confus'] },
      { label: 'Learnings', prompt: 'learnings', keywords: ['learn', 'lesson', 'insight', 'discover', 'realize', 'growth', 'takeaway', 'reflection'] },
    ],
    
    // Section navigation hints - maps keywords to section IDs
    sectionHints: {
      'hero': ['overview', 'intro', 'summary', 'what', 'about', 'project'],
      'timeline': ['process', 'timeline', 'sprint', 'phases', 'when', 'step'],
      'problem': ['problem', 'challenge', 'issue', 'pain', 'struggle'],
      'solution': ['solution', 'design', 'approach', 'how', 'built'],
      'research': ['research', 'user', 'interview', 'findings', 'insights', 'data'],
      'outcome': ['outcome', 'result', 'impact', 'metric', 'success', 'number'],
      'retrospective': ['retrospective', 'learn', 'takeaway', 'reflection', 'next']
    },
    
    // ═══════════════════════════════════════════════════════════════════════════
    // PROJECT KNOWLEDGE BASE - COMPREHENSIVE
    // This is the mini-chatbot's brain for project-specific questions
    // Every aspect of the project should be answerable from this knowledge base
    // ═══════════════════════════════════════════════════════════════════════════
    projectKnowledge: {
      'us-hab-cti': {
        name: 'US HAB-CTI Clearinghouse',
        fullTitle: 'Federal Clearinghouse for Harmful Algal Bloom (HAB) Mitigation Technologies',
        client: 'Institute of Marine and Environmental Technology (IMET) via iConsultancy, in collaboration with NOAA and MOTE',
        timeline: 'September 2024 – May 2025',
        domain: 'Federal government, Environmental science, Regulatory decision-making, Data-heavy public-sector platforms',
        myRole: 'UX Design Lead',
        shortDescription: 'Federal clearinghouse platform transforming fragmented HAB regulatory information into intuitive, task-based decision guidance',
        
        // ═══ CORE PROBLEM ═══
        coreProblem: "Information about harmful algal bloom mitigation technologies was scattered across agencies, written in dense regulatory language, inconsistent across federal and state levels, and difficult to navigate without expert support. This made even simple decisions feel high-risk and opaque for users under time and environmental pressure.",
        
        problemSymptoms: "Users didn't know where to start. Permitting pathways differed by location, usage, and technology type. Approval status and regulatory requirements were fragmented. Decision confidence was low despite high expertise.",
        
        // ═══ USER GROUPS ═══
        userGroups: "Three distinct user types: (1) Researchers - need to identify which permits apply to specific studies, struggle with no clear entry point and rely on informal guidance; (2) Technology Developers - navigate commercialization and regulatory alignment, face conflicting guidance between agencies; (3) Environmental Managers - implement already-approved solutions safely, need centralized source of approved technologies for time-sensitive decisions.",
        
        researchers: "Researchers need to identify which permits apply to a specific study. Their pain points: no clear entry point, reliance on informal guidance, risk of early-stage planning errors. As one said: 'I don't even know where to begin.'",
        
        techDevelopers: "Technology Developers need to navigate commercialization and regulatory alignment. Pain points: conflicting guidance between agencies, unclear progression from research to deployment, heavy reliance on consultants. Quote: 'Every agency says something different.'",
        
        envManagers: "Environmental Managers need to implement already-approved solutions safely and legally. Pain points: no centralized source of approved technologies, time-sensitive decisions with regulatory risk. Quote: 'I just want to know what's approved and usable.'",
        
        // ═══ RESEARCH APPROACH ═══
        researchApproach: "Sprint 1 methodology: stakeholder interviews, co-working workflow mapping sessions, and real-world task deconstruction (not personas). Users mapped their own decision paths, focused on bottlenecks, delays, and confusion points. Instead of hypothetical journeys, we documented where decisions stalled, where users guessed, and where they sought external help.",
        
        coreInsights: "Structural failures identified: regulatory knowledge is distributed not centralized, terminology changes across agencies, users discover requirements late not early, finding the right document is often trial-and-error. Critical insight: Users don't need more information—they need contextual sequencing and decision guidance.",
        
        // ═══ DESIGN STRATEGY ═══
        designStrategy: "Goal: transform fragmented regulatory knowledge into clear entry points, context-aware pathways, and actionable next steps. Key shift: from document navigation to decision navigation. Created consolidated workflows from multiple interviews and harmonized task flows across user types.",
        
        // ═══ INFORMATION ARCHITECTURE ═══
        iaDesign: "Design principles: task-first not role-first, progressive disclosure, location and usage-aware filtering, reduce cognitive load before increasing depth. Entry points based on what the user is trying to do. Filters for technology type, geographic location, and regulatory status. Clear separation between research, permitting, and implementation phases.",
        
        iaForManagers: "Managers could quickly determine: what is approved, where it is approved, and under what conditions it is usable.",
        
        // ═══ SYSTEM DESIGN ═══
        designSystem: "U.S. Web Design System (USWDS) for federal compliance, WCAG accessibility, pre-built tested components, and faster development alignment. Designed for clarity not minimalism—emphasis on legibility and hierarchy, reduced reliance on institutional knowledge.",
        
        dataTransformation: "Transformed regulatory spreadsheets, agency PDFs, and disconnected guidance documents into structured interface. Dense text became scannable, actionable UI. Every screen maps back to a real data source and a validated user need.",
        
        // ═══ TESTING ═══
        testing: "High-fidelity testing in Sprint 4: think-aloud sessions, real-time co-design feedback, iterative refinement. 9 sessions across all 3 user roles. Key findings: ~60% of users paused at permit/map entry points, labels and cues required clarification, role-based grouping caused confusion. Major structural change: role-based navigation became task-based navigation.",
        
        // ═══ OUTCOMES ═══
        outcomes: "What improved: clarity of starting points, confidence in regulatory pathways, ability to identify next actions without external help, reduced ambiguity across user roles. Explicitly NOT claimed: no validated percentage reductions, no post-launch analytics yet, no fabricated efficiency numbers.",
        
        // ═══ REFLECTIVE QUESTIONS ═══
        worthIt: "Absolutely worth it. This project taught me how to navigate federal complexity while keeping user needs central. Working with NOAA scientists and EPA regulators showed me that even the most technical domains can benefit from human-centered design. The shift from role-based to task-based navigation was a breakthrough moment—validated by real users struggling with the original approach.",
        
        challenges: "Biggest challenge was the distributed nature of regulatory knowledge. Every agency had different terminology, different requirements, different approval processes. We couldn't just aggregate information—we had to transform how users think about finding it. Another challenge was balancing federal compliance requirements with usability.",
        
        learnings: "Key learnings: (1) Don't assume users need more information—they often need better sequencing; (2) Co-working sessions where users map their own workflows reveal insights that interviews miss; (3) Task-based navigation beats role-based navigation when users have overlapping needs; (4) USWDS provides a solid foundation but needs customization for complex regulatory flows.",
        
        proudOf: "Most proud of the structural insight that led to task-based navigation. Our card sorting with 15 participants revealed strong preference for organizing by what users are trying to DO, not who they ARE. This fundamentally changed the architecture and improved usability across all user types.",
        
        // ═══ QUICK ANSWERS ═══
        overview: "The US HAB-CTI is a federal clearinghouse helping researchers, tech developers, and environmental managers navigate Harmful Algal Bloom control technologies and permits. I led the UX redesign to transform scattered regulatory information into clear, task-based decision guidance.",
        
        role: "UX Design Lead at IMET via iConsultancy (Sep 2024–May 2025). Owned the complete design process: stakeholder research, information architecture, USWDS wireframing, high-fidelity prototypes, and usability validation with NOAA scientists and EPA regulators.",
        
        process: "Four sprints over 9 months: Sprint 1 (Research)—stakeholder interviews and co-working workflow mapping. Sprint 2 (IA)—card sorting, user flows, task-based architecture. Sprint 3 (Wireframes)—USWDS components. Sprint 4 (Hi-Fi & Testing)—9 validation sessions revealing the need for task-based over role-based navigation.",
        
        problem: "HAB regulatory information was fragmented across agencies, written in dense language, and impossible to navigate without consultants. Users couldn't find starting points, permitting pathways varied by location, and decision confidence was low.",
        
        solution: "Task-first navigation with clear entry points, progressive disclosure, and location-aware filtering. Questionnaire-based flow that asks role, location, and use case, then outputs customized permit checklists.",
        
        users: "Three user groups: Researchers (need permit guidance for studies), Technology Developers (navigate commercialization compliance), and Environmental Managers (implement approved solutions quickly).",
        
        timeline: "September 2024 – May 2025. Four structured sprints: Research, Information Architecture, Wireframes, Hi-Fi Design & Testing.",
        
        tools: "Figma for design and prototyping, Miro for workshops and card sorting, remote interviews for stakeholder research.",
        
        team: "Collaborated with IMET, NOAA scientists, EPA regulators, and state environmental managers through iConsultancy.",
        
        accessibility: "Section 508 compliant, WCAG 2.1 AA. Used U.S. Web Design System (USWDS) for accessible federal components.",
        
        research: "Stakeholder interviews plus co-working sessions where participants mapped their actual workflows in real-time, revealing confusion points, bottlenecks, and where they sought external help.",
        
        hab: "Harmful Algal Blooms produce toxins affecting water quality, recreation, and fisheries. The platform helps users navigate control technologies and the complex permitting process.",
        
        permits: "Questionnaire flow asks about role, location, and use case, then outputs a customized permit checklist based on federal and state requirements.",
        
        wireframes: "Mid-fidelity wireframes in Sprint 3 using USWDS components, testing layout, navigation logic, and task-based organization.",
        
        prototype: "Figma high-fidelity prototype with homepage entry points, personalized questionnaire, research database, and permit wizard.",
        
        sprints: "S1: Research & interviews. S2: Information Architecture & card sorting. S3: Wireframes with USWDS. S4: Hi-Fi design & 9 usability sessions."
      },
      'xr-museum': {
        name: 'XR Museum: Mixed Reality Data Experience',
        fullTitle: 'XR Museum: Mixed Reality Data Experience for Context-Rich Artifact Exploration',
        client: 'Class project for Visual Design Course under Prof. Jason Aston',
        timeline: 'January – February 2024 (2 months)',
        domain: 'Extended Reality, Museum Technology, Spatial UI Design, Data Visualization',
        myRole: 'UI Designer',
        shortDescription: 'Designing an immersive XR museum experience that transforms how visitors explore artifacts through spatial interfaces and context-rich data visualization',
        deliverables: 'Interactive Figma Prototype',
        
        // ═══ CORE PROBLEM ═══
        coreProblem: "Traditional museum displays suffer from information overload—too much data presented at once, no visual hierarchy, and displays not designed for spatial presentation. The existing Hope Diamond data visualization dashboard focused too heavily on raw data without considering how users actually want to explore artifacts.",
        
        problemSymptoms: "Reflecting on a Smithsonian visit, the overwhelming amount of information sparked the need for improved visualizations. Museum displays create barriers—visitors can't examine objects closely, and contextual information competes for attention rather than complementing exploration.",
        
        inspiration: "The Hope Diamond became a beacon of inspiration—a pivotal moment inspiring the vision for this project. How could XR technology transform the way visitors experience this iconic artifact?",
        
        // ═══ DESIGN AUDIT ═══
        designAudit: "Audited the existing data visualization dashboard for the Hope Diamond artifact data. Key issues identified: (1) Too much focus on data, (2) No visual hierarchy, (3) Too much presented to the user in one go, (4) Not designed for spatial presentation.",
        
        // ═══ DESIGN EXPLORATION ═══
        designExploration: "Explored visual language, layout, and XR readability. Typography: Futura PT for titles and display, Proxima Nova for body—chosen to maintain a sleek and modern feel. Layout: 10pt grid with 20 margin, providing creative freedom in utilizing the available space.",
        
        designDecisions: "Glassmorphism was employed to create an immersive visual experience, leveraging depth and translucency to enhance the mixed reality environment. Larger and thicker fonts ensure optimal legibility across diverse museum XR setups. Enhanced contrast applied to buttons based on design critique feedback.",
        
        typography: "Futura PT for Title and display, Proxima Nova for Body. These fonts were chosen to maintain a sleek and modern feel in the design.",
        
        layout: "For the layout grid, a 10pt grid with 20 Margin was chosen, primarily to give creative freedom towards utilizing the available space.",
        
        // ═══ XR INTERACTION MODEL ═══
        interactionModel: "Defined a core XR interaction model with two distinct experience modes: Explore Mode and All Artifact Mode. The system features 8+ core interaction surfaces designed for intuitive spatial navigation.",
        
        welcomeScreen: "The initial splash screen presents the user with two distinct ways to experience the system: Explore Mode for wandering discovery and All Artifact Mode for structured browsing.",
        
        exploreMode: "In Explore Mode, users wander through the museum, discovering artifacts at their own pace. The mode leverages spatial recognition to highlight artifacts as they come into view, creating an immersive, interactive experience.",
        
        allArtifactMode: "All Artifact Mode offers a comprehensive list of museum artifacts at users' fingertips. Designed for accessibility and efficiency, visitors can quickly locate specific artifacts or browse the collection. Addresses the needs of those preferring a more structured approach.",
        
        mainDashboard: "The Main Artifact Data Dashboard showcases rich information about the selected artifact. Using the Hope Diamond as the default case, users can explore a 3D model across different time periods, learn about various owners, view detailed information, and trace locations over the years.",
        
        enlargedMapView: "The Enlarged Map View expands from the Main Dashboard, offering detailed exploration of artifact history. The panoramic mode wraps the map around the user for a 360-degree view, giving the sense of being in the artifact's historical locations.",
        
        enlargedGlobeView: "A 3D globe visualization was included as an alternative to address the need for diverse perspectives in understanding global artifact histories. This enhances user engagement through interactive visualizations offering multiple ways to connect with the artifact's story.",
        
        enlargedArtifactView: "Users engage with a 3D model of the artifact within the mixed reality space. This provides an interactive experience allowing close examination of details, textures, and inscriptions.",
        
        // ═══ KEY FEATURES ═══
        features: "Two XR experience modes, 8+ core interaction surfaces, 3D artifact models with time-period views, interactive panoramic map view, 3D globe visualization, glassmorphism visual design, spatial-first navigation.",
        
        // ═══ OUTCOMES ═══
        outcomes: "Created a comprehensive interactive Figma prototype demonstrating the full XR museum experience. The prototype is accessible with fullscreen mode and restart functionality (press R).",
        
        nextSteps: "As part of a web programming course, the prototype is under development as a website/web-app using JavaScript frameworks like A-Frame.",
        
        // ═══ QUICK ANSWERS ═══
        overview: "XR Museum is a mixed reality data experience for context-rich artifact exploration. I designed an immersive interface that transforms how museum visitors explore artifacts like the Hope Diamond through spatial UI and interactive data visualization.",
        
        role: "UI Designer for a Visual Design Course project under Prof. Jason Aston (Jan–Feb 2024). Owned the complete design process from design audit through high-fidelity interactive prototype.",
        
        process: "Design audit of existing dashboard → Typography and layout exploration → Glassmorphism visual language → Core XR interaction model → High-fidelity Figma prototype with multiple spatial views.",
        
        problem: "Traditional museum displays create information overload with no visual hierarchy. Existing data visualizations focused too heavily on raw data without considering spatial presentation or user exploration patterns.",
        
        solution: "Two-mode XR experience: Explore Mode for discovery-based wandering with spatial artifact detection, and All Artifact Mode for structured browsing. Glassmorphism visuals with enhanced legibility for XR environments.",
        
        users: "Museum visitors seeking immersive artifact exploration—both those who prefer free-form discovery (Explore Mode) and those wanting structured access to specific artifacts (All Artifact Mode).",
        
        tools: "Figma for design and interactive prototyping, with plans for A-Frame JavaScript framework implementation.",
        
        worthIt: "Definitely worth it. Designing for spatial interfaces required completely rethinking how information should be presented. The challenge of making data accessible without overwhelming users in a 3D space was incredibly rewarding.",
        
        learnings: "Key learnings: (1) Spatial UX requires different mental models than 2D interfaces; (2) Glassmorphism enhances depth perception in XR; (3) Users need multiple modes to accommodate different exploration styles; (4) Visual hierarchy is even more critical in spatial interfaces.",
        
        proudOf: "Most proud of the dual-mode approach—recognizing that museum visitors have fundamentally different exploration preferences and designing separate but cohesive experiences for both. The panoramic map view that wraps around users was a breakthrough spatial interaction.",
        
        // ═══ NAVIGATION STRUCTURE ═══
        navStructure: "Hero > TL;DR | Project Context (stacking cards) | Design Audit | Design Exploration (typeface, layout, decisions) | High Fidelity (XR interaction model) | Interactive Prototype | Next Steps"
      },
      
      // ═══════════════════════════════════════════════════════════════════════
      // SAMSUNG R&D PROJECT - Multimodal Interaction Design
      // ═══════════════════════════════════════════════════════════════════════
      'samsung-multimodal': {
        name: 'Interaction Redefined: Rethinking Media & Meetings at Samsung Research',
        shortDescription: 'Exploring multimodal interaction design for smartphones—rethinking how voice, touch, and context combine to improve searching and sharing.',
        
        // ═══ QUICK FACTS ═══
        role: "UX Designer at Samsung R&D. Conducted exploratory research, developed concept features, and iterated through 4 design iterations combining voice and touch modalities.",
        client: "Samsung R&D",
        timeline: "2 months",
        tools: "Prototyping tools, user interview frameworks, think-aloud protocols",
        team: "Worked within Samsung Research exploring next-generation interaction paradigms.",
        
        // ═══ THE PROBLEM ═══
        coreProblem: "Searching and sharing files on smartphones—especially older photos or similarly named files—is painful. Retrieval is difficult, sharing flows are messy, and users struggle to find what they remember but can't visually recognize.",
        
        problemSymptoms: "Users reported frustration with: (1) Finding photos by scrolling through galleries, (2) Remembering which folder contains what, (3) Multi-step sharing flows that require app switching, (4) Recognition-based interfaces when recall is actually stronger.",
        
        problemStatement: "Design a solution that improves searching and sharing experiences on smartphones for Millennials and Gen Z users.",
        
        // ═══ USER RESEARCH ═══
        userGroups: "Interviewed 10 participants across two user segments. Used questionnaires and think-aloud sessions to understand behaviors and preferences around voice vs touch.",
        
        researchApproach: "Combined user interviews with think-aloud sessions. Identified behavioral patterns around developing habits, voice vs touch preferences, and contextual modality switching.",
        
        // ═══ INSIGHTS ═══
        coreInsights: "Two major insight clusters emerged: (1) DEVELOPING HABITS—voice adoption has friction including midas effect risk (unintended triggers), simplicity requirements, and the need to beat touch flows in usefulness. (2) TOUCH VS VOICE—privacy concerns favor touch; busy hands favor voice; repeating tasks suit voice; short tasks lean touch; personal preference varies widely.",
        
        insights: "Key finding: Users remember events, topics, times, places, and people better than folder locations. Voice aligns with recall cues (e.g., 'photos from Paris') while galleries force recognition. This insight shaped our voice-first approach.",
        
        // ═══ PROBLEM PATTERNS ═══
        problemPatterns: "Identified 8 problem patterns from research: Multitasking, Screenshot, Email, Notification, Search & Share, Camera, App Finding, and Calling. Selected 'Search & Share' as the focus area due to frequency and pain intensity.",
        
        // ═══ APPROACH ═══
        designStrategy: "Four-step model: (1) Domain Search—map the task space, (2) Pick Scenario—choose a common workflow, (3) Design Solution—solve the focused case, (4) Scale Solution—expand to the domain. This systematic approach ensured we solved a real problem deeply before generalizing.",
        
        chosenScenario: "User is chatting on WhatsApp and wants to send photos to a friend. This scenario was chosen because 'Photos to friends' was the most common sharing task across participants (#1, #3, #4, #5, #7, #8).",
        
        // ═══ MULTIMODALITY ═══
        multimodality: "Multimodality means interacting using multiple input methods—touch, voice, camera/vision, and contextual sensors. The right modality depends on four factors: State (user + device state), Environment (noise/social context), Proximity (distance to device), and Mood (emotional tolerance for interaction types).",
        
        voiceDesign: "We chose voice for photo search because users remember by recall (event, topic, time, place, people) not recognition (visual scanning). Voice aligns naturally with recall cues like 'photos from Paris trip' or 'pictures with mom from Christmas.'",
        
        modalityDecision: "Principle: Use voice where recall is stronger than recognition. For photos, recall (remembering the event) beats recognition (visually scanning thumbnails). This made voice the natural modality for search, while touch remained optimal for selection and confirmation.",
        
        // ═══ ITERATIONS ═══
        iterations: "Four design iterations: (1) Voice assistant (Bixby) to search photos—but flow remained identical to touch; (2) Display Bixby results within sharing app—reduced app switching; (3) Share directly via drop target on results—but breaks without active context; (4) Floating icon as portable 'share object'—adds steps but enables cross-context sharing.",
        
        iteration1: "Iteration 1: Use voice assistant (Bixby) to search photos. Issue: Flow remained almost identical to manual—still required entering gallery and doing share steps separately.",
        
        iteration2: "Iteration 2: Display Bixby results within the sharing app (WhatsApp). Improvement: Search happens in-context, reducing app switching and cognitive friction.",
        
        iteration3: "Iteration 3: Share directly on Bixby results screen via a drop target. Mechanic: Select items → drag to top sink to share. Issue: Breaks if recipient/app context isn't active in the background.",
        
        iteration4: "Iteration 4: Floating icon as a portable 'share object'. Mechanic: Create floating icon from selected items, tap to view contents/options, carry across screens. Trade-off: Adds steps but increases naturalness if combined with Iteration 3.",
        
        // ═══ FINAL SOLUTION ═══
        solution: "Combined Iterations 3 + 4: If background screen/app is shareable, allow direct floating icon creation + send-to-others flow. If background isn't shareable, provide floating icon pathway as fallback. Goal: Increase naturalness and reduce steps without forcing app-switching.",
        
        finalSolution: "Hybrid approach combining drag-to-share (Iteration 3) with portable floating object (Iteration 4). Context-aware: uses direct share when possible, floating icon when context is unavailable.",
        
        // ═══ OUTCOMES ═══
        outcomes: "Developed 4 progressive concept iterations. Identified 8 problem patterns from user research. Created a framework for modality decision-making based on State, Environment, Proximity, and Mood.",
        
        testing: "Concept validation through walkthrough discussions with users. Each iteration was evaluated against the baseline touch-only flow for step reduction and naturalness.",
        
        // ═══ REFLECTIONS ═══
        worthIt: "Absolutely worth it. Working at Samsung R&D on next-gen interaction gave me hands-on experience with multimodal design thinking. The research-heavy approach taught me to ground concepts in actual user behavior rather than tech-first assumptions.",
        
        challenges: "Biggest challenge was resisting the urge to design for technology's sake. Voice assistants are cool, but if they don't beat the existing touch flow, they add friction. Had to constantly validate against 'is this actually better?'",
        
        learnings: "Key learnings: (1) Modality choice is context-dependent—there's no 'best' input method; (2) Recall vs recognition shapes modality fit; (3) Incremental iteration reveals where value actually emerges; (4) Even in R&D, user research prevents overengineering.",
        
        proudOf: "Most proud of the insight that voice aligns with recall while galleries force recognition. This reframing changed the entire concept direction from 'add voice to existing flow' to 'redesign the flow around how memory actually works.'",
        
        // ═══ NAVIGATION STRUCTURE ═══
        navStructure: "Overview > TL;DR, Role/Client/Duration, Prototype | Research Framing > How it started, Understanding multimodality, Multimodality on smartphones, Opportunities, User interviews | Synthesis > Insights, Problem patterns, Problem statement | Approach > Domain search, Choosing scenario | Concept Generation > Deciding modalities, Why voice for photos | Iterations > 1-4 | Final Solution"
      }
    },
    
    // Hierarchical navigation structure for case studies
    // This defines the 2-stage navigation: major sections and their sub-sections
    // Icons are SVG data URIs for high-quality rendering (no emojis)
    getHierarchicalSections() {
      // SVG icons as data URIs for consistency and quality
      const icons = {
        home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        summary: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
        research: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
        architecture: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
        wireframe: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
        design: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
        target: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
        overview: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
      };
      
      return {
        'us-hab-cti': [
          { 
            id: 'title', 
            label: 'Title', 
            icon: icons.home,
            children: []
          },
          { 
            id: 'tldr', 
            label: 'TL;DR', 
            icon: icons.summary,
            children: []
          },
          { 
            id: 'sprint-1', 
            label: 'Sprint 1', 
            icon: icons.research,
            children: [
              { id: 'sprint-1-research', label: 'Research' },
              { id: 'sprint-1-interviews', label: 'Interviews' },
              { id: 'sprint-1-insights', label: 'Insights' }
            ]
          },
          { 
            id: 'sprint-2', 
            label: 'Sprint 2', 
            icon: icons.architecture,
            children: [
              { id: 'sprint-2-ia', label: 'Information Architecture' },
              { id: 'sprint-2-flows', label: 'User Flows' }
            ]
          },
          { 
            id: 'sprint-3', 
            label: 'Sprint 3', 
            icon: icons.wireframe,
            children: [
              { id: 'sprint-3-wireframes', label: 'Wireframes' },
              { id: 'sprint-3-sketches', label: 'Sketches' }
            ]
          },
          { 
            id: 'sprint-4', 
            label: 'Sprint 4', 
            icon: icons.design,
            children: [
              { id: 'sprint-4-hifi', label: 'High-Fidelity' },
              { id: 'sprint-4-testing', label: 'Testing' },
              { id: 'sprint-4-outcomes', label: 'Outcomes' }
            ]
          }
        ],
        'xr-museum': [
          { id: 'title', label: 'Title', icon: icons.home, children: [] },
          { id: 'overview', label: 'Overview', icon: icons.overview, children: [] },
          { id: 'design', label: 'Design', icon: icons.design, children: [] },
          { id: 'outcomes', label: 'Outcomes', icon: icons.target, children: [] }
        ]
      };
    },
    
    getSections() {
      const sections = [];
      document.querySelectorAll('[data-nav-pill]').forEach(el => {
        sections.push({
          id: el.id || el.getAttribute('data-nav-pill').toLowerCase().replace(/\s+/g, '-'),
          label: el.getAttribute('data-nav-pill'),
          element: el
        });
      });
      return sections;
    },
    
    // SIMULATION: Generate fake sections for projects without data-nav-pill setup
    // This creates a working scroll nav experience while the user sets up proper sections
    generateSimulatedSections() {
      const simulatedLabels = ['Overview', 'Process', 'Design', 'Outcomes'];
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = pageHeight - viewportHeight;
      
      // Create simulated sections at equal intervals
      return simulatedLabels.map((label, index) => {
        const scrollPercent = index / (simulatedLabels.length - 1);
        const targetScroll = scrollableHeight * scrollPercent;
        
        return {
          id: `simulated-${label.toLowerCase()}`,
          label: label,
          element: null, // No real element
          isSimulated: true,
          targetScroll: targetScroll
        };
      });
    },
    
    // Handle click on simulated section pill
    scrollToSimulatedSection(section) {
      if (!section.isSimulated) return;
      
      window.scrollTo({
        top: section.targetScroll,
        behavior: 'smooth'
      });
      
      // Update active state
      this.setActivePill(section.id);
    },
    
    isMobile() {
      return window.innerWidth <= 768;
    },
    
    init() {
      if (AppState.pageType !== 'project') {
        console.log('[ProjectDock] Not a project page, skipping');
        return;
      }
      
      if (this.container) {
        console.log('[ProjectDock] Already initialized');
        return;
      }
      
      // Get project context
      this.projectContext = PAGE_CONFIG.getPageContext();
      
      let sections = this.getSections();
      console.log('[ProjectDock] Found', sections.length, 'sections');
      
      // If no real sections found, use SIMULATED sections for a working nav experience
      if (sections.length === 0) {
        sections = this.generateSimulatedSections();
        this.usingSimulatedSections = true;
        console.log('[ProjectDock] Using SIMULATED sections:', sections.map(s => s.label).join(', '));
      }
      
      this.createDock();
      this.createNavSection(sections);
      this.createChatSection();
      this.createMiniChatWindow();
      this.setupResizeHandler();
      this.setupMiniChatScrollMinimize(); // Add scroll minimize for mini-chat
      
      if (sections.length > 0) {
        if (this.usingSimulatedSections) {
          this.setupSimulatedScrollObserver(sections);
        } else {
          this.setupScrollObserver(sections);
        }
      } else {
        // Retry for sections
        setTimeout(() => {
          sections = this.getSections();
          if (sections.length > 0) {
            this.addPills(sections);
            this.setupScrollObserver(sections);
          }
        }, 600);
      }
      
      console.log('[ProjectDock] Initialized');
    },
    
    // Setup scroll-based minimize for mini-chat (like the main chatbot)
    setupMiniChatScrollMinimize() {
      let lastScrollY = window.scrollY;
      let miniChatOpenScrollY = 0;
      const SCROLL_THRESHOLD = 80; // pixels to scroll to trigger minimize
      
      window.addEventListener('scroll', () => {
        if (this.isAnimating) return;
        
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        
        // Only process in mini-chat or chat-active states
        if (this.state === 'mini-chat' || this.state === 'chat-active') {
          // Track when mini-chat was opened at current scroll position
          if (miniChatOpenScrollY === 0) {
            miniChatOpenScrollY = currentScrollY;
          }
          
          // If user scrolled down significantly from when mini-chat opened, minimize to nav
          const scrolledFromOpen = currentScrollY - miniChatOpenScrollY;
          
          if (scrollDelta > 5 && scrolledFromOpen > SCROLL_THRESHOLD) {
            console.log('[ProjectDock] Scroll minimize triggered');
            this.animateToNav();
            miniChatOpenScrollY = 0; // Reset
          }
        } else if (this.state === 'nav') {
          // Reset the open scroll position when in nav mode
          miniChatOpenScrollY = 0;
        }
        
        lastScrollY = currentScrollY;
      }, { passive: true });
    },
    
    createDock() {
      const s = this.styles;
      const isMobile = this.isMobile();
      
      this.container = document.createElement('div');
      this.container.id = 'project-dock';
      this.container.style.cssText = `
        position: fixed;
        bottom: ${isMobile ? '12px' : '20px'};
        left: 50%;
        transform: translateX(-50%);
        z-index: 9997;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        max-width: ${isMobile ? 'calc(100vw - 24px)' : '600px'};
        width: auto;
        background: ${s.background};
        backdrop-filter: ${s.backdropFilter};
        -webkit-backdrop-filter: ${s.backdropFilter};
        border-radius: ${s.borderRadius};
        box-shadow: ${s.shadow};
        border: ${s.border};
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        font-family: ${s.fontFamily};
        overflow: hidden;
      `;
      document.body.appendChild(this.container);
    },
    
    createNavSection(sections) {
      const s = this.styles;
      const isMobile = this.isMobile();
      
      // Nav bar wrapper with better padding for mobile
      const navBar = document.createElement('div');
      navBar.id = 'dock-nav-bar';
      navBar.style.cssText = `
        display: flex;
        align-items: center;
        gap: ${isMobile ? '6px' : '8px'};
        padding: ${isMobile ? '8px 10px' : '8px 12px'};
        min-height: ${isMobile ? '52px' : '48px'};
        background: rgba(255, 255, 255, 0.6);
        border-radius: ${isMobile ? '24px' : '26px'};
      `;
      
      // Nav collapse button (shown when mini-chat is open)
      this.navButton = document.createElement('button');
      this.navButton.id = 'dock-nav-btn';
      this.navButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
      this.navButton.style.cssText = `
        width: 36px;
        height: 36px;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.05);
        color: #666;
        border: none;
        border-radius: ${s.innerRadius};
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      `;
      
      // Add tooltip
      this.navButton.setAttribute('title', 'Back to sections');
      this.navButton.addEventListener('click', () => this.setState('nav'));
      this.navButton.addEventListener('mouseenter', () => {
        this.navButton.style.background = 'rgba(0, 0, 0, 0.1)';
        this.navButton.style.color = '#333';
      });
      this.navButton.addEventListener('mouseleave', () => {
        this.navButton.style.background = 'rgba(0, 0, 0, 0.05)';
        this.navButton.style.color = '#666';
      });
      
      navBar.appendChild(this.navButton);
      
      // Nav container - holds pills with better spacing
      this.navContainer = document.createElement('div');
      this.navContainer.id = 'dock-nav';
      this.navContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: ${isMobile ? '4px' : '6px'};
        flex: 1;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        scroll-behavior: smooth;
        padding: ${isMobile ? '2px 4px' : '4px 6px'};
      `;
      this.navContainer.style.cssText += '::-webkit-scrollbar { display: none; }';
      
      // Create scroll indicators (left chevron)
      this.scrollIndicatorLeft = document.createElement('div');
      this.scrollIndicatorLeft.className = 'dock-scroll-indicator left';
      this.scrollIndicatorLeft.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      `;
      
      // Create scroll indicators (right chevron)
      this.scrollIndicatorRight = document.createElement('div');
      this.scrollIndicatorRight.className = 'dock-scroll-indicator right';
      this.scrollIndicatorRight.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;
      
      // Add pills
      this.addPills(sections);
      
      // Add scroll listener to update scroll indicators
      this.navContainer.addEventListener('scroll', () => this.updateScrollIndicators());
      
      // Initial scroll indicator check (after pills are added)
      setTimeout(() => this.updateScrollIndicators(), 100);
      
      navBar.appendChild(this.scrollIndicatorLeft);
      navBar.appendChild(this.navContainer);
      navBar.appendChild(this.scrollIndicatorRight);
      
      // Separator
      const separator = document.createElement('div');
      separator.id = 'dock-separator';
      separator.style.cssText = `
        width: 1px;
        height: 24px;
        background: rgba(0, 0, 0, 0.1);
        margin: 0 4px;
        flex-shrink: 0;
      `;
      navBar.appendChild(separator);
      
      // Chat section container
      this.chatContainer = document.createElement('div');
      this.chatContainer.id = 'dock-chat';
      this.chatContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      `;
      
      navBar.appendChild(this.chatContainer);
      
      this.container.appendChild(navBar);
    },
    
    addPills(sections) {
      const s = this.styles;
      const isMobile = this.isMobile();
      const slug = this.projectContext?.projectSlug || 'us-hab-cti';
      const hierarchy = this.getHierarchicalSections()[slug];
      
      // If we have hierarchical structure, use it; otherwise fall back to flat pills
      const sectionsToUse = hierarchy || sections.map(sec => ({ ...sec, children: [] }));
      
      // Track which parent is currently expanded
      this.expandedParent = null;
      this.parentPills = [];
      this.childPillContainers = {};
      
      sectionsToUse.forEach((section, index) => {
        // Create parent pill wrapper
        const pillWrapper = document.createElement('div');
        pillWrapper.className = 'dock-pill-wrapper';
        pillWrapper.setAttribute('data-parent-id', section.id);
        pillWrapper.style.cssText = `
          display: flex;
          align-items: center;
          gap: 2px;
          position: relative;
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        `;
        
        // Create parent pill
        const pill = document.createElement('button');
        pill.className = 'dock-pill dock-pill-parent';
        pill.setAttribute('data-section', section.id);
        pill.setAttribute('data-has-children', section.children && section.children.length > 0 ? 'true' : 'false');
        
        // Icon + Label + Child count badge
        const hasIcon = section.icon;
        const hasChildren = section.children && section.children.length > 0;
        const childCount = hasChildren ? section.children.length : 0;
        
        let pillHTML = hasIcon 
          ? `<span class="pill-icon">${section.icon}</span><span class="pill-label">${section.label}</span>`
          : `<span class="pill-label">${section.label}</span>`;
        
        // Add child count badge if has children
        if (hasChildren) {
          pillHTML += `<span class="pill-child-count">${childCount}</span>`;
        }
        
        pill.innerHTML = pillHTML;
        
        pill.style.cssText = `
          display: flex;
          align-items: center;
          gap: ${isMobile ? '4px' : '6px'};
          padding: ${isMobile ? '6px 10px' : '8px 14px'};
          font-size: ${isMobile ? '11px' : '12px'};
          font-weight: 500;
          font-family: ${s.fontFamily};
          color: #555;
          background: transparent;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          white-space: nowrap;
          flex-shrink: 0;
          transform-origin: center;
        `;
        
        // Parent pill click - scroll and potentially expand children
        pill.addEventListener('click', () => {
          // Find matching DOM element
          const targetEl = document.querySelector(`[data-nav-pill="${section.label}"], #${section.id}`);
          if (targetEl) {
            this.scrollToSection({ id: section.id, label: section.label, element: targetEl });
          }
          // If has children, expand
          if (section.children && section.children.length > 0) {
            this.expandParentPill(section.id);
          }
        });
        
        pill.addEventListener('mouseenter', () => {
          if (!pill.classList.contains('active')) {
            pill.style.background = 'rgba(0, 0, 0, 0.06)';
            pill.style.color = '#333';
            pill.style.transform = 'scale(1.02)';
          }
        });
        pill.addEventListener('mouseleave', () => {
          if (!pill.classList.contains('active')) {
            pill.style.background = 'transparent';
            pill.style.color = '#555';
            pill.style.transform = 'scale(1)';
          }
        });
        
        pillWrapper.appendChild(pill);
        this.pills.push(pill);
        this.parentPills.push({ pill, section, wrapper: pillWrapper });
        
        // Create child pills container (hidden by default)
        if (section.children && section.children.length > 0) {
          const childContainer = document.createElement('div');
          childContainer.className = 'dock-pill-children';
          childContainer.setAttribute('data-parent', section.id);
          childContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 2px;
            overflow: hidden;
            max-width: 0;
            opacity: 0;
            transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          `;
          
          section.children.forEach((child, childIndex) => {
            const childPill = document.createElement('button');
            childPill.className = 'dock-pill dock-pill-child';
            childPill.setAttribute('data-section', child.id);
            childPill.setAttribute('data-parent', section.id);
            childPill.textContent = child.label;
            childPill.style.cssText = `
              padding: ${isMobile ? '4px 8px' : '6px 12px'};
              font-size: ${isMobile ? '10px' : '11px'};
              font-weight: 500;
              font-family: ${s.fontFamily};
              color: #666;
              background: rgba(0, 0, 0, 0.04);
              border: none;
              border-radius: 16px;
              cursor: pointer;
              transition: all 0.2s ease;
              white-space: nowrap;
              flex-shrink: 0;
              opacity: 0;
              transform: translateX(-10px) scale(0.9);
            `;
            
            childPill.addEventListener('click', (e) => {
              e.stopPropagation();
              // Find matching DOM element - try multiple selectors
              const targetEl = document.querySelector(`#${child.id}, [data-nav-pill="${child.label}"], .${child.id}`);
              if (targetEl) {
                this.scrollToSection({ id: child.id, label: child.label, element: targetEl });
              }
            });
            
            childPill.addEventListener('mouseenter', () => {
              if (!childPill.classList.contains('active')) {
                childPill.style.background = 'rgba(0, 0, 0, 0.1)';
                childPill.style.color = '#333';
              }
            });
            childPill.addEventListener('mouseleave', () => {
              if (!childPill.classList.contains('active')) {
                childPill.style.background = 'rgba(0, 0, 0, 0.04)';
                childPill.style.color = '#666';
              }
            });
            
            childContainer.appendChild(childPill);
            this.pills.push(childPill);
          });
          
          pillWrapper.appendChild(childContainer);
          this.childPillContainers[section.id] = childContainer;
        }
        
        this.navContainer.appendChild(pillWrapper);
      });
    },
    
    // Expand a parent pill to show its children with beautiful animation
    expandParentPill(parentId) {
      const isMobile = this.isMobile();
      
      // If already expanded, collapse it
      if (this.expandedParent === parentId) {
        this.collapseAllChildPills();
        return;
      }
      
      // Collapse any currently expanded parent
      if (this.expandedParent) {
        this.collapseAllChildPills();
      }
      
      const childContainer = this.childPillContainers[parentId];
      if (!childContainer) return;
      
      this.expandedParent = parentId;
      
      // Animate parent pill to active/expanded state
      const parentInfo = this.parentPills.find(p => p.section.id === parentId);
      if (parentInfo) {
        parentInfo.pill.style.background = this.styles.accentColor;
        parentInfo.pill.style.color = 'white';
        parentInfo.pill.classList.add('active', 'expanded');
      }
      
      // Expand child container
      const childPills = childContainer.querySelectorAll('.dock-pill-child');
      const targetWidth = (childPills.length * (isMobile ? 70 : 85)) + ((childPills.length - 1) * 2);
      
      // Animate container expansion
      gsap.to(childContainer, {
        maxWidth: targetWidth,
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out'
      });
      
      // Staggered animation for child pills
      gsap.to(childPills, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        delay: 0.1
      });
      
      console.log('[ProjectDock] Expanded parent:', parentId);
    },
    
    // Collapse all child pills
    collapseAllChildPills() {
      if (!this.expandedParent) return;
      
      const childContainer = this.childPillContainers[this.expandedParent];
      if (childContainer) {
        const childPills = childContainer.querySelectorAll('.dock-pill-child');
        
        // Animate children out
        gsap.to(childPills, {
          opacity: 0,
          x: -10,
          scale: 0.9,
          duration: 0.2,
          stagger: 0.03,
          ease: 'power2.in'
        });
        
        // Collapse container
        gsap.to(childContainer, {
          maxWidth: 0,
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
          ease: 'power2.inOut'
        });
      }
      
      // Reset parent pill style and remove expanded class
      const parentInfo = this.parentPills.find(p => p.section.id === this.expandedParent);
      if (parentInfo) {
        parentInfo.pill.style.background = 'transparent';
        parentInfo.pill.style.color = '#666';
        parentInfo.pill.classList.remove('active', 'expanded');
      }
      
      this.expandedParent = null;
    },
    
    // Update scroll indicators based on scroll position
    updateScrollIndicators() {
      if (!this.navContainer) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = this.navContainer;
      const canScrollLeft = scrollLeft > 5;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 5;
      
      // Update dedicated indicator elements instead of pseudo-elements
      if (this.scrollIndicatorLeft) {
        this.scrollIndicatorLeft.classList.toggle('visible', canScrollLeft);
      }
      if (this.scrollIndicatorRight) {
        this.scrollIndicatorRight.classList.toggle('visible', canScrollRight);
      }
    },
    
    // Scroll nav to show a specific pill
    scrollToPill(pillId) {
      if (!this.navContainer) return;
      
      const pill = this.navContainer.querySelector(`[data-section="${pillId}"]`);
      if (pill) {
        const containerRect = this.navContainer.getBoundingClientRect();
        const pillRect = pill.getBoundingClientRect();
        const scrollOffset = pillRect.left - containerRect.left - (containerRect.width / 2) + (pillRect.width / 2);
        
        this.navContainer.scrollBy({ left: scrollOffset, behavior: 'smooth' });
      }
    },
    
    // Auto-expand based on scroll position
    handleScrollExpansion(activeSectionId) {
      // Find which parent this section belongs to
      const slug = this.projectContext?.projectSlug || 'us-hab-cti';
      const hierarchy = this.getHierarchicalSections()[slug];
      if (!hierarchy) return;
      
      for (const parent of hierarchy) {
        if (parent.id === activeSectionId) {
          // Scrolled to a parent section
          if (parent.children && parent.children.length > 0) {
            this.expandParentPill(parent.id);
          } else {
            this.collapseAllChildPills();
          }
          // Auto-scroll nav to show active pill
          this.scrollToPill(parent.id);
          return;
        }
        
        // Check if it's a child section
        const childMatch = parent.children?.find(c => c.id === activeSectionId);
        if (childMatch) {
          this.expandParentPill(parent.id);
          this.scrollToPill(parent.id);
          return;
        }
      }
    },
    
    createChatSection() {
      const s = this.styles;
      const isMobile = this.isMobile();
      
      // Check if this project has mini-chat knowledge
      const slug = this.projectContext?.projectSlug;
      const hasProjectKnowledge = slug && this.projectKnowledge[slug];
      this.hasProjectKnowledge = hasProjectKnowledge; // Store for later use
      
      // Chat button with mascot + "Ask Prasshanna" text (icon only on mobile)
      const chatBtn = document.createElement('button');
      chatBtn.id = 'dock-chat-btn';
      chatBtn.setAttribute('title', hasProjectKnowledge ? 'Chat with Prasshanna' : 'Ask me about this project');
      chatBtn.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${isMobile ? '0' : '8px'};
        padding: ${isMobile ? '8px' : '6px 14px 6px 6px'};
        background: ${s.accentColor};
        color: white;
        border: none;
        border-radius: ${isMobile ? '50%' : '20px'};
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        flex-shrink: 0;
        font-family: ${s.fontFamily};
        transform-origin: center;
        min-width: ${isMobile ? '36px' : 'auto'};
        min-height: ${isMobile ? '36px' : 'auto'};
        position: relative;
      `;
      
      // Mascot image
      const mascotImg = document.createElement('img');
      mascotImg.src = 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739/69699aead48088fc6fddb07b_Smiling%20Main.avif';
      mascotImg.alt = 'Chat mascot';
      mascotImg.style.cssText = `
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
      `;
      chatBtn.appendChild(mascotImg);
      
      // Button text (hidden on mobile for more nav space)
      const btnText = document.createElement('span');
      btnText.textContent = 'Ask Prasshanna';
      btnText.style.cssText = `
        font-size: ${isMobile ? '12px' : '13px'};
        font-weight: 500;
        white-space: nowrap;
        letter-spacing: -0.01em;
        display: ${isMobile ? 'none' : 'inline'};
      `;
      chatBtn.appendChild(btnText);
      
      // Store reference for animations
      this.chatBtnMascot = mascotImg;
      this.chatBtnText = btnText;
      
      // Create tooltip for projects without mini-chat knowledge
      let tooltip = null;
      if (!hasProjectKnowledge) {
        tooltip = document.createElement('div');
        tooltip.id = 'dock-chat-tooltip';
        tooltip.style.cssText = `
          position: absolute;
          bottom: calc(100% + 12px);
          right: 0;
          background: #1a1a1a;
          color: white;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 500;
          font-family: ${s.fontFamily};
          white-space: nowrap;
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.2s ease;
          pointer-events: none;
          z-index: 100;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        `;
        tooltip.textContent = 'Chat about this project';
        
        // Arrow pointing down
        const arrow = document.createElement('div');
        arrow.style.cssText = `
          position: absolute;
          bottom: -6px;
          right: 16px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #1a1a1a;
        `;
        tooltip.appendChild(arrow);
        chatBtn.appendChild(tooltip);
        this.chatTooltip = tooltip;
      }
      
      // Different behavior based on whether project has mini-chat knowledge
      if (hasProjectKnowledge) {
        // Has mini-chat: use existing mini-chat flow
        chatBtn.addEventListener('click', () => this.animateToMiniChat());
      } else {
        // No mini-chat: open full chatbot directly
        chatBtn.addEventListener('click', () => this.openFullChat());
      }
      
      chatBtn.addEventListener('mouseenter', () => {
        chatBtn.style.background = '#333';
        chatBtn.style.transform = 'scale(1.03)';
        chatBtn.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        mascotImg.style.transform = 'scale(1.1) rotate(-5deg)';
        // Show tooltip if present
        if (tooltip) {
          tooltip.style.opacity = '1';
          tooltip.style.transform = 'translateY(0)';
        }
      });
      chatBtn.addEventListener('mouseleave', () => {
        chatBtn.style.background = s.accentColor;
        chatBtn.style.transform = 'scale(1)';
        chatBtn.style.boxShadow = 'none';
        mascotImg.style.transform = 'scale(1) rotate(0deg)';
        // Hide tooltip if present
        if (tooltip) {
          tooltip.style.opacity = '0';
          tooltip.style.transform = 'translateY(8px)';
        }
      });
      
      this.chatBtn = chatBtn;
      this.chatContainer.appendChild(chatBtn);
      
      // Input wrapper (shown when mini-chat is active)
      const inputWrapper = document.createElement('div');
      inputWrapper.id = 'dock-input-wrapper';
      inputWrapper.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        width: 0;
        opacity: 0;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      `;
      
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'dock-chat-input';
      input.placeholder = 'Ask me anything...';
      input.style.cssText = `
        width: ${isMobile ? '160px' : '220px'};
        min-width: ${isMobile ? '140px' : '200px'};
        padding: 10px 16px;
        font-size: 13px;
        font-family: ${s.fontFamily};
        color: #333;
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 20px;
        outline: none;
        transition: all 0.2s ease;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      `;
      
      input.addEventListener('focus', () => {
        input.style.borderColor = s.accentColor;
        input.style.boxShadow = '0 0 0 3px rgba(26,26,26,0.08)';
      });
      input.addEventListener('blur', () => {
        input.style.borderColor = 'rgba(0, 0, 0, 0.08)';
        input.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
          this.handleUserInput(input.value.trim());
          input.value = '';
        } else if (e.key === 'Escape') {
          this.setState('nav');
        }
      });
      
      this.chatInput = input;
      inputWrapper.appendChild(input);
      
      // Send button (circular like chatbot)
      const sendBtn = document.createElement('button');
      sendBtn.id = 'dock-send-btn';
      sendBtn.setAttribute('title', 'Send message');
      sendBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;
      sendBtn.style.cssText = `
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${s.accentColor};
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      `;
      
      sendBtn.addEventListener('click', () => {
        if (input.value.trim()) {
          this.handleUserInput(input.value.trim());
          input.value = '';
        }
      });
      sendBtn.addEventListener('mouseenter', () => sendBtn.style.background = '#333');
      sendBtn.addEventListener('mouseleave', () => sendBtn.style.background = s.accentColor);
      
      inputWrapper.appendChild(sendBtn);
      this.chatContainer.appendChild(inputWrapper);
    },
    
    createMiniChatWindow() {
      const s = this.styles;
      const isMobile = this.isMobile();
      
      // Get project name for title
      const slug = this.projectContext?.projectSlug || 'us-hab-cti';
      const knowledge = this.projectKnowledge[slug];
      const projectName = knowledge?.name || this.projectContext?.projectTitle || 'This Project';
      
      // Mini chat window container
      this.miniChatWindow = document.createElement('div');
      this.miniChatWindow.id = 'mini-chat-window';
      this.miniChatWindow.style.cssText = `
        display: none;
        flex-direction: column;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        background: rgba(252, 252, 252, 0.98);
      `;
      
      // ═══ HEADER: Title + Action buttons ═══
      const header = document.createElement('div');
      header.id = 'mini-chat-header';
      header.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${isMobile ? '10px 12px' : '12px 14px'};
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        background: rgba(255, 255, 255, 0.95);
        gap: ${isMobile ? '8px' : '10px'};
        min-height: 48px;
        flex-wrap: nowrap;
      `;
      
      // Left side container (mascot + title inline)
      const headerLeft = document.createElement('div');
      headerLeft.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
        overflow: hidden;
      `;
      
      // Mascot avatar in header
      const mascotAvatar = document.createElement('div');
      mascotAvatar.style.cssText = `
        width: ${isMobile ? '24px' : '28px'};
        height: ${isMobile ? '24px' : '28px'};
        border-radius: 4px;
        overflow: hidden;
        flex-shrink: 0;
      `;
      const mascotImg = document.createElement('img');
      mascotImg.src = 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739/69699aead48088fc6fddb07b_Smiling%20Main.avif';
      mascotImg.alt = 'Chat';
      mascotImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        animation: mascotBreathe 4s ease-in-out infinite;
      `;
      // Add keyframes for mascot animation
      if (!document.getElementById('mini-chat-keyframes')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'mini-chat-keyframes';
        styleSheet.textContent = `
          @keyframes mascotBreathe {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-1px) scale(1.02); }
          }
          @keyframes handWave {
            0%, 100% { transform: rotate(0deg); }
            10% { transform: rotate(14deg); }
            20% { transform: rotate(-8deg); }
            30% { transform: rotate(14deg); }
            40% { transform: rotate(-4deg); }
            50% { transform: rotate(10deg); }
            60%, 100% { transform: rotate(0deg); }
          }
        `;
        document.head.appendChild(styleSheet);
      }
      mascotAvatar.appendChild(mascotImg);
      headerLeft.appendChild(mascotAvatar);
      
      // Title - properly inline with mascot
      const titleEl = document.createElement('span');
      titleEl.id = 'mini-chat-title';
      titleEl.textContent = `Ask about ${projectName}`;
      titleEl.style.cssText = `
        font-size: ${isMobile ? '12px' : '13px'};
        font-weight: 600;
        font-family: ${s.fontFamily};
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-width: 0;
      `;
      headerLeft.appendChild(titleEl);
      header.appendChild(headerLeft);
      
      // Button container (right side)
      const btnContainer = document.createElement('div');
      btnContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: ${isMobile ? '2px' : '4px'};
        flex-shrink: 0;
      `;
      
      // Minimize button
      const minimizeBtn = document.createElement('button');
      minimizeBtn.id = 'mini-chat-minimize';
      minimizeBtn.setAttribute('title', 'Back to sections');
      minimizeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      `;
      minimizeBtn.style.cssText = `
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #888;
        background: transparent;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s ease;
      `;
      minimizeBtn.addEventListener('click', () => this.animateToNav());
      minimizeBtn.addEventListener('mouseenter', () => {
        minimizeBtn.style.background = 'rgba(0,0,0,0.06)';
        minimizeBtn.style.color = '#333';
      });
      minimizeBtn.addEventListener('mouseleave', () => {
        minimizeBtn.style.background = 'transparent';
        minimizeBtn.style.color = '#888';
      });
      btnContainer.appendChild(minimizeBtn);
      
      // Full version toggle - stays visible in both mini and full chat modes
      const toggleContainer = document.createElement('div');
      toggleContainer.id = 'mini-chat-toggle';
      toggleContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 10px 4px 12px;
        background: rgba(0,0,0,0.03);
        border: 1px solid rgba(0,0,0,0.06);
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s ease;
      `;
      
      const toggleLabel = document.createElement('span');
      toggleLabel.id = 'mini-chat-toggle-label';
      toggleLabel.textContent = 'Full chat';
      toggleLabel.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        font-family: ${s.fontFamily};
        color: #666;
        white-space: nowrap;
      `;
      toggleContainer.appendChild(toggleLabel);
      
      // Toggle switch
      const toggleSwitch = document.createElement('div');
      toggleSwitch.id = 'mini-chat-toggle-switch';
      toggleSwitch.style.cssText = `
        width: 32px;
        height: 18px;
        background: rgba(0,0,0,0.15);
        border-radius: 9px;
        position: relative;
        transition: all 0.2s ease;
      `;
      
      const toggleKnob = document.createElement('div');
      toggleKnob.id = 'mini-chat-toggle-knob';
      toggleKnob.style.cssText = `
        width: 14px;
        height: 14px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: 2px;
        transition: all 0.2s ease;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      `;
      toggleSwitch.appendChild(toggleKnob);
      toggleContainer.appendChild(toggleSwitch);
      
      // Store reference for updating state
      this.toggleSwitch = toggleSwitch;
      this.toggleKnob = toggleKnob;
      this.toggleLabel = toggleLabel;
      this.toggleContainer = toggleContainer;
      
      toggleContainer.addEventListener('click', () => this.toggleFullChat());
      toggleContainer.addEventListener('mouseenter', () => {
        toggleContainer.style.background = 'rgba(0,0,0,0.06)';
        toggleContainer.style.borderColor = 'rgba(0,0,0,0.1)';
      });
      toggleContainer.addEventListener('mouseleave', () => {
        toggleContainer.style.background = 'rgba(0,0,0,0.03)';
        toggleContainer.style.borderColor = 'rgba(0,0,0,0.06)';
      });
      btnContainer.appendChild(toggleContainer);
      
      header.appendChild(btnContainer);
      this.miniChatWindow.appendChild(header);
      
      // ═══ SUGGESTIONS ROW (at top, like expanded chatbot) ═══
      const suggestionsRow = document.createElement('div');
      suggestionsRow.id = 'mini-chat-suggestions';
      suggestionsRow.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: ${isMobile ? '6px' : '8px'};
        padding: ${isMobile ? '10px 12px' : '12px 14px'};
        background: rgba(255, 255, 255, 0.6);
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      `;
      
      this.suggestions.forEach(suggestion => {
        const chip = document.createElement('button');
        chip.className = 'suggestion-chip';
        chip.style.cssText = `
          display: inline-flex;
          align-items: center;
          padding: ${isMobile ? '8px 12px' : '10px 14px'};
          font-family: ${s.fontFamily};
          font-size: ${isMobile ? '12px' : '13px'};
          font-weight: 500;
          color: #1a1a1a;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        `;
        chip.textContent = suggestion.label;
        
        chip.addEventListener('click', () => this.handleSuggestionClick(suggestion.prompt));
        chip.addEventListener('mouseenter', () => {
          chip.style.background = '#1a1a1a';
          chip.style.borderColor = '#1a1a1a';
          chip.style.color = 'white';
          chip.style.transform = 'translateY(-1px)';
          chip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        chip.addEventListener('mouseleave', () => {
          chip.style.background = 'rgba(255, 255, 255, 0.95)';
          chip.style.borderColor = 'rgba(0, 0, 0, 0.1)';
          chip.style.color = '#1a1a1a';
          chip.style.transform = 'translateY(0)';
          chip.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
        });
        suggestionsRow.appendChild(chip);
      });
      
      this.miniChatWindow.appendChild(suggestionsRow);
      
      // ═══ MESSAGES CONTAINER (shows greeting by default, then conversation) ═══
      const messagesContainer = document.createElement('div');
      messagesContainer.id = 'mini-chat-messages';
      messagesContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: ${isMobile ? '12px' : '14px'};
        min-height: ${isMobile ? '120px' : '160px'};
        max-height: ${isMobile ? '180px' : '220px'};
        overflow-y: auto;
        scrollbar-width: thin;
        background: rgba(248, 248, 248, 0.5);
        flex: 1;
      `;
      
      // ═══ GREETING MESSAGE (shown initially, hidden after first user message) ═══
      const greetingMessage = document.createElement('div');
      greetingMessage.id = 'mini-chat-greeting';
      greetingMessage.className = 'mini-chat-message assistant greeting';
      greetingMessage.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        animation: fadeInUp 0.25s ease;
        width: 100%;
      `;
      
      const greetingBubble = document.createElement('div');
      greetingBubble.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 90%;
        padding: ${isMobile ? '12px 14px' : '14px 18px'};
        font-size: ${isMobile ? '12px' : '13px'};
        line-height: 1.55;
        font-family: ${s.fontFamily};
        color: #2a2a2a;
        background: white;
        border: 1px solid rgba(0,0,0,0.08);
        border-radius: 18px 18px 18px 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      `;
      
      const greetingWave = document.createElement('span');
      greetingWave.textContent = '👋';
      greetingWave.style.cssText = `
        font-size: ${isMobile ? '16px' : '18px'};
        animation: handWave 1.5s ease-in-out;
        display: inline-block;
        transform-origin: 70% 70%;
        flex-shrink: 0;
      `;
      greetingBubble.appendChild(greetingWave);
      
      const greetingText = document.createElement('span');
      greetingText.textContent = 'Ask about the design process, outcomes, or my role';
      greetingBubble.appendChild(greetingText);
      
      greetingMessage.appendChild(greetingBubble);
      messagesContainer.appendChild(greetingMessage);
      
      this.miniChatWindow.appendChild(messagesContainer);
      
      // ═══ INPUT AREA (matching main chatbot exactly) ═══
      const inputArea = document.createElement('div');
      inputArea.id = 'mini-chat-input-area';
      inputArea.style.cssText = `
        padding: ${isMobile ? '10px 12px' : '12px 14px'};
        background: transparent;
      `;
      
      // Input wrapper (matching .input-wrapper from chat.css)
      const inputWrapper = document.createElement('div');
      inputWrapper.style.cssText = `
        display: flex;
        gap: 6px;
        align-items: center;
        width: 100%;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 6px;
        padding: 6px 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
        border: 1px solid rgba(0, 0, 0, 0.12);
        transition: all 0.15s ease;
        box-sizing: border-box;
      `;
      
      const chatInput = document.createElement('input');
      chatInput.type = 'text';
      chatInput.id = 'mini-chat-input';
      chatInput.placeholder = isMobile ? 'Ask a question...' : 'So, what would you like to know?';
      chatInput.style.cssText = `
        flex: 1;
        height: ${isMobile ? '26px' : '28px'};
        padding: 0 10px;
        border: none;
        border-radius: 4px;
        background: transparent;
        color: #1a1a1a;
        font-family: ${s.fontFamily};
        font-size: ${isMobile ? '13px' : '14px'};
        outline: none;
        min-width: 0;
      `;
      
      inputWrapper.addEventListener('focusin', () => {
        inputWrapper.style.borderColor = 'rgba(255, 255, 255, 0.7)';
        inputWrapper.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
      });
      inputWrapper.addEventListener('focusout', () => {
        inputWrapper.style.borderColor = 'rgba(0, 0, 0, 0.12)';
        inputWrapper.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
      });
      
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
          this.handleUserInput(chatInput.value.trim());
          chatInput.value = '';
        } else if (e.key === 'Escape') {
          this.setState('nav');
        }
      });
      
      this.miniChatInput = chatInput;
      inputWrapper.appendChild(chatInput);
      
      // Send button (matching .send-button-square)
      const sendBtn = document.createElement('button');
      sendBtn.id = 'mini-chat-send';
      sendBtn.setAttribute('title', 'Send');
      sendBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      `;
      sendBtn.style.cssText = `
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        color: #1a1a1a;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s ease;
        flex-shrink: 0;
      `;
      sendBtn.addEventListener('click', () => {
        if (chatInput.value.trim()) {
          this.handleUserInput(chatInput.value.trim());
          chatInput.value = '';
        }
      });
      sendBtn.addEventListener('mouseenter', () => {
        sendBtn.style.background = '#1a1a1a';
        sendBtn.style.color = 'white';
        sendBtn.style.borderColor = '#1a1a1a';
      });
      sendBtn.addEventListener('mouseleave', () => {
        sendBtn.style.background = 'transparent';
        sendBtn.style.color = '#1a1a1a';
        sendBtn.style.borderColor = 'rgba(0, 0, 0, 0.1)';
      });
      inputWrapper.appendChild(sendBtn);
      
      inputArea.appendChild(inputWrapper);
      this.miniChatWindow.appendChild(inputArea);
      this.container.appendChild(this.miniChatWindow);
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // INTELLIGENT RESPONSE SYSTEM
    // Always uses AI API for intelligent, contextual responses
    // Project knowledge provides context to the AI, not pre-canned answers
    // ═══════════════════════════════════════════════════════════════════════════
    
    handleUserInput(message) {
      console.log('[ProjectDock] User input:', message);
      
      // Add user message to UI
      this.addMessage('user', message);
      
      // Always use AI API for intelligent responses
      // This ensures every question gets a thoughtful, contextual answer
      this.fetchFromAPI(message);
    },
    
    findExactMatchWithType(message, knowledge) {
      const lower = message.toLowerCase();
      for (const suggestion of this.suggestions) {
        if (lower.includes(suggestion.prompt) || lower === suggestion.label.toLowerCase()) {
          if (knowledge[suggestion.prompt]) {
            return { response: knowledge[suggestion.prompt], type: suggestion.prompt };
          }
        }
      }
      return null;
    },
    
    findKeywordMatchWithType(message, knowledge) {
      const lower = message.toLowerCase();
      const words = lower.split(/\s+/);
      
      for (const suggestion of this.suggestions) {
        if (!suggestion.keywords) continue;
        const matchCount = suggestion.keywords.filter(kw => 
          words.some(word => word.includes(kw) || kw.includes(word))
        ).length;
        // Need at least 2 keyword matches for confidence
        if (matchCount >= 2 && knowledge[suggestion.prompt]) {
          return { response: knowledge[suggestion.prompt], type: suggestion.prompt };
        }
      }
      return null;
    },
    
    trySimpleAnswerWithType(message, knowledge) {
      const lower = message.toLowerCase();
      
      // ═══ COMPREHENSIVE KEYWORD MATCHING ═══
      // Each pattern checks for related words and returns the most relevant knowledge
      
      // Timeline/Duration questions
      if (lower.match(/\b(when|timeline|duration|how long|months?|time|start|end|finish)\b/)) {
        const response = knowledge.timeline || knowledge.process;
        if (response) return { response, type: 'process' };
      }
      
      // Sprint questions
      if (lower.match(/\b(sprint|phase|stage)\b/)) {
        const response = knowledge.sprints || knowledge.process;
        if (response) return { response, type: 'process' };
      }
      
      // Team/Collaboration questions
      if (lower.match(/\b(team|collaborat|who|work with|partner|stakeholder|imet|client)\b/)) {
        const response = knowledge.team || knowledge.client || knowledge.role;
        if (response) return { response, type: 'role' };
      }
      
      // Tools/Technology questions  
      if (lower.match(/\b(tool|figma|miro|software|technology|tech|use|stack)\b/)) {
        if (knowledge.tools) return { response: knowledge.tools, type: 'process' };
      }
      
      // User/Audience questions
      if (lower.match(/\b(user|audience|target|customer|persona|who use|for whom|stakeholder type)\b/)) {
        if (knowledge.users) return { response: knowledge.users, type: 'research' };
      }
      
      // Problem/Challenge questions
      if (lower.match(/\b(problem|challenge|issue|difficult|hard|struggle|pain|obstacle|frustrat)\b/)) {
        if (knowledge.problem) return { response: knowledge.problem, type: 'problem' };
      }
      
      // Solution/Design questions
      if (lower.match(/\b(solution|solve|fix|approach|design|creat|build|made)\b/)) {
        if (knowledge.solution) return { response: knowledge.solution, type: 'solution' };
      }
      
      // Research questions
      if (lower.match(/\b(research|interview|findings|insight|discover|learn|user study|co-working|co-design)\b/)) {
        if (knowledge.research) return { response: knowledge.research, type: 'research' };
      }
      
      // Accessibility/Compliance questions
      if (lower.match(/\b(accessib|508|wcag|complian|federal|ada|screen reader)\b/)) {
        if (knowledge.accessibility) return { response: knowledge.accessibility, type: 'solution' };
      }
      
      // Testing questions
      if (lower.match(/\b(test|usability|validat|feedback|session|participant)\b/)) {
        if (knowledge.testing) return { response: knowledge.testing, type: 'outcomes' };
      }
      
      // Design system questions
      if (lower.match(/\b(design system|uswds|us web|component|pattern library)\b/)) {
        if (knowledge.designSystem) return { response: knowledge.designSystem, type: 'solution' };
      }
      
      // Wireframe/Prototype questions
      if (lower.match(/\b(wireframe|prototype|mockup|lo-fi|hi-fi|mid-fi|fidelity)\b/)) {
        const response = knowledge.wireframes || knowledge.prototype;
        if (response) return { response, type: 'process' };
      }
      
      // HAB-specific questions
      if (lower.match(/\b(hab|algal|bloom|algae|harmful)\b/)) {
        if (knowledge.hab) return { response: knowledge.hab, type: 'overview' };
      }
      
      // Permit questions
      if (lower.match(/\b(permit|regulat|compliance|legal|law|policy|federal|state)\b/)) {
        if (knowledge.permits) return { response: knowledge.permits, type: 'solution' };
      }
      
      // Client questions
      if (lower.match(/\b(client|imet|iconsultancy|who hired|contract|engag)\b/)) {
        if (knowledge.client) return { response: knowledge.client, type: 'role' };
      }
      
      // "Tell me about" patterns
      if (lower.match(/^tell me (about|more)/)) {
        // Try to extract the subject
        const subject = lower.replace(/^tell me (about|more) /, '').trim();
        return this.findAnswerForSubject(subject, knowledge);
      }
      
      // "What is/are" patterns
      if (lower.match(/^what (is|are|was|were)/)) {
        const subject = lower.replace(/^what (is|are|was|were) (the |a |an )?/, '').replace(/\?$/, '').trim();
        return this.findAnswerForSubject(subject, knowledge);
      }
      
      // "How did you" patterns
      if (lower.match(/^how did (you|the team)/)) {
        const action = lower.replace(/^how did (you|the team) /, '').replace(/\?$/, '').trim();
        if (action.match(/research|discover|learn|find out/)) {
          if (knowledge.research) return { response: knowledge.research, type: 'research' };
        }
        if (action.match(/test|validat|check/)) {
          if (knowledge.testing) return { response: knowledge.testing, type: 'outcomes' };
        }
        if (action.match(/design|creat|build|approach/)) {
          const response = knowledge.process || knowledge.solution;
          if (response) return { response, type: 'process' };
        }
      }
      
      // "Why" questions
      if (lower.match(/^why/)) {
        // Usually relates to problem or approach
        const response = knowledge.problem || knowledge.solution;
        if (response) return { response, type: 'problem' };
      }
      
      return null;
    },
    
    // Helper to find answer for a specific subject
    findAnswerForSubject(subject, knowledge) {
      const subjectLower = subject.toLowerCase();
      
      // Map subjects to knowledge keys
      const subjectMap = {
        'project': 'overview',
        'platform': 'overview',
        'hab': 'hab',
        'algal bloom': 'hab',
        'users': 'users',
        'personas': 'users',
        'audience': 'users',
        'research': 'research',
        'testing': 'testing',
        'test results': 'testing',
        'findings': 'outcomes',
        'results': 'outcomes',
        'outcomes': 'outcomes',
        'process': 'process',
        'sprints': 'sprints',
        'timeline': 'timeline',
        'duration': 'timeline',
        'problem': 'coreProblem',
        'challenge': 'challenges',
        'challenges': 'challenges',
        'solution': 'solution',
        'design': 'solution',
        'approach': 'solution',
        'wireframes': 'wireframes',
        'prototype': 'prototype',
        'tools': 'tools',
        'team': 'team',
        'role': 'role',
        'your role': 'role',
        'your job': 'role',
        'client': 'client',
        'imet': 'client',
        'accessibility': 'accessibility',
        'compliance': 'accessibility',
        'design system': 'designSystem',
        'uswds': 'designSystem',
        'permits': 'permits',
        'regulations': 'permits',
        // Reflective questions - maps to new comprehensive knowledge
        'worth': 'worthIt',
        'worth it': 'worthIt',
        'satisfied': 'worthIt',
        'value': 'worthIt',
        'learn': 'learnings',
        'learned': 'learnings',
        'learnings': 'learnings',
        'takeaway': 'learnings',
        'lesson': 'learnings',
        'proud': 'proudOf',
        'proud of': 'proudOf',
        'favorite': 'proudOf',
        'best part': 'proudOf',
        'insight': 'coreInsights',
        'insights': 'coreInsights',
        'user groups': 'userGroups',
        'researchers': 'researchers',
        'tech developers': 'techDevelopers',
        'developers': 'techDevelopers',
        'env managers': 'envManagers',
        'environmental managers': 'envManagers',
        'ia': 'iaDesign',
        'information architecture': 'iaDesign',
        'strategy': 'designStrategy'
      };
      
      // Check for exact or partial matches
      for (const [key, knowledgeKey] of Object.entries(subjectMap)) {
        if (subjectLower.includes(key) && knowledge[knowledgeKey]) {
          return { response: knowledge[knowledgeKey], type: knowledgeKey };
        }
      }
      
      return null;
    },
    
    async fetchFromAPI(message) {
      // Show loading
      this.isLoading = true;
      this.addMessage('assistant', '...', true);
      
      try {
        const response = await this.callChatAPI(message);
        this.removeLoadingMessage();
        this.addMessage('assistant', response);
      } catch (error) {
        console.error('[ProjectDock] API error:', error);
        this.removeLoadingMessage();
        // INTELLIGENT FALLBACK - Use local knowledge base when API fails
        const smartAnswer = this.getSmartLocalAnswer(message);
        if (smartAnswer) {
          this.addMessage('assistant', smartAnswer);
        } else {
          // Only show generic message if we truly have no relevant knowledge
          this.addMessage('assistant', 'I\'m having trouble connecting right now. Try asking about the project overview, my role, the challenges, or what I learned from this project.');
        }
      }
      this.isLoading = false;
    },
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SMART LOCAL ANSWER - Intelligent fallback when API is unavailable
    // Uses comprehensive pattern matching against the knowledge base
    // ═══════════════════════════════════════════════════════════════════════════
    getSmartLocalAnswer(message) {
      const slug = this.projectContext?.projectSlug || 'us-hab-cti';
      const knowledge = this.projectKnowledge[slug];
      if (!knowledge) return null;
      
      const lower = message.toLowerCase();
      
      // ═══ INFORMATION ARCHITECTURE / IA QUESTIONS ═══
      if (lower.match(/\b(information architecture|ia|navigation|structure|organize|hierarchy|sitemap|taxonomy)\b/)) {
        if (knowledge.iaDesign) return knowledge.iaDesign;
        if (knowledge.iaForManagers) return `For this project, ${knowledge.iaForManagers}`;
      }
      
      // ═══ REFLECTIVE / PERSONAL QUESTIONS ═══
      if (lower.match(/\b(worth|value|meaningful|proud|satisfy|reward|fulfil)\b/)) {
        if (knowledge.worthIt) return knowledge.worthIt;
        if (knowledge.proudOf) return knowledge.proudOf;
      }
      
      if (lower.match(/\b(learn|lesson|takeaway|grow|insight|realiz)\b/)) {
        if (knowledge.learnings) return knowledge.learnings;
        if (knowledge.coreInsights) return knowledge.coreInsights;
      }
      
      if (lower.match(/\b(challenge|difficult|hard|struggle|obstacle|problem)\b/)) {
        if (knowledge.challenges) return knowledge.challenges;
        if (knowledge.coreProblem) return knowledge.coreProblem;
      }
      
      if (lower.match(/\b(proud|best|favorite|highlight|accomplish)\b/)) {
        if (knowledge.proudOf) return knowledge.proudOf;
      }
      
      // ═══ USER / AUDIENCE QUESTIONS ═══
      if (lower.match(/\b(user|audience|persona|who use|target|customer|stakeholder)\b/)) {
        if (knowledge.userGroups) return knowledge.userGroups;
        if (knowledge.users) return knowledge.users;
        // Try to combine user group info
        let userInfo = '';
        if (knowledge.researchers) userInfo += `Researchers: ${knowledge.researchers} `;
        if (knowledge.techDevelopers) userInfo += `Technology Developers: ${knowledge.techDevelopers} `;
        if (knowledge.envManagers) userInfo += `Environmental Managers: ${knowledge.envManagers}`;
        if (userInfo) return userInfo.trim();
      }
      
      // ═══ RESEARCH QUESTIONS ═══
      if (lower.match(/\b(research|interview|study|discover|finding|method|qualitative|quantitative)\b/)) {
        if (knowledge.researchApproach) return knowledge.researchApproach;
        if (knowledge.research) return knowledge.research;
        if (knowledge.coreInsights) return `Our research revealed: ${knowledge.coreInsights}`;
      }
      
      // ═══ DESIGN QUESTIONS ═══
      if (lower.match(/\b(design|solution|approach|strategy|creat|concept|visual)\b/)) {
        if (knowledge.designStrategy) return knowledge.designStrategy;
        if (knowledge.solution) return knowledge.solution;
      }
      
      // ═══ DESIGN SYSTEM QUESTIONS ═══
      if (lower.match(/\b(design system|component|uswds|pattern|token|reusable)\b/)) {
        if (knowledge.designSystem) return knowledge.designSystem;
      }
      
      // ═══ TESTING / OUTCOMES QUESTIONS ═══
      if (lower.match(/\b(test|usability|result|outcome|impact|success|metric|validat)\b/)) {
        if (knowledge.testing) return knowledge.testing;
        if (knowledge.outcomes) return knowledge.outcomes;
      }
      
      // ═══ ROLE QUESTIONS ═══
      if (lower.match(/\b(role|responsib|did you|your job|contribution|lead|manage)\b/)) {
        if (knowledge.role) return knowledge.role;
      }
      
      // ═══ PROBLEM QUESTIONS ═══
      if (lower.match(/\b(problem|issue|pain|frustrat|symptom|why|need)\b/)) {
        if (knowledge.coreProblem) return knowledge.coreProblem;
        if (knowledge.problemSymptoms) return knowledge.problemSymptoms;
        if (knowledge.problem) return knowledge.problem;
      }
      
      // ═══ OVERVIEW / SUMMARY QUESTIONS ═══
      if (lower.match(/\b(overview|summary|about|what is|describe|explain|tldr|tl;dr)\b/)) {
        if (knowledge.shortDescription) return knowledge.shortDescription;
        if (knowledge.overview) return knowledge.overview;
      }
      
      // ═══ TOOLS / TECH QUESTIONS ═══
      if (lower.match(/\b(tool|tech|figma|miro|software|stack|use)\b/)) {
        if (knowledge.tools) return knowledge.tools;
      }
      
      // ═══ TEAM / CLIENT QUESTIONS ═══
      if (lower.match(/\b(team|client|collaborat|work with|partner|stakeholder|who)\b/)) {
        if (knowledge.team) return knowledge.team;
        if (knowledge.client) return knowledge.client;
      }
      
      // ═══ TIMELINE / PROCESS QUESTIONS ═══
      if (lower.match(/\b(timeline|process|sprint|phase|how long|duration|step)\b/)) {
        if (knowledge.timeline) return knowledge.timeline;
        if (knowledge.process) return knowledge.process;
      }
      
      // ═══ DATA QUESTIONS ═══
      if (lower.match(/\b(data|transform|database|schema|model|content)\b/)) {
        if (knowledge.dataTransformation) return knowledge.dataTransformation;
      }
      
      // ═══ HAB-SPECIFIC QUESTIONS ═══
      if (lower.match(/\b(hab|algal|bloom|algae|harmful|cyanobacteria)\b/)) {
        if (knowledge.hab) return knowledge.hab;
      }
      
      // ═══ MULTIMODAL / VOICE / INTERACTION QUESTIONS (Samsung) ═══
      if (lower.match(/\b(multimodal|voice|interaction|modality|touch|gesture|bixby)\b/)) {
        if (knowledge.multimodality) return knowledge.multimodality;
        if (knowledge.voiceDesign) return knowledge.voiceDesign;
      }
      
      // ═══ ITERATION / PROTOTYPE QUESTIONS ═══
      if (lower.match(/\b(iteration|prototype|version|evolv|refine|improve)\b/)) {
        if (knowledge.iterations) return knowledge.iterations;
        if (knowledge.prototype) return knowledge.prototype;
      }
      
      return null;
    },
    
    async callChatAPI(message) {
      // Build comprehensive context-aware prompt for intelligent responses
      const slug = this.projectContext?.projectSlug || 'us-hab-cti';
      const knowledge = this.projectKnowledge[slug];
      
      // Build detailed project context for the AI with ALL available knowledge
      let projectDetails = '';
      if (knowledge) {
        projectDetails = `
PROJECT: ${knowledge.name || slug}
SHORT DESCRIPTION: ${knowledge.shortDescription || ''}

=== THE PROBLEM ===
CORE PROBLEM: ${knowledge.coreProblem || knowledge.problem || ''}
PROBLEM SYMPTOMS: ${knowledge.problemSymptoms || ''}

=== USER GROUPS ===
${knowledge.userGroups || ''}
RESEARCHERS: ${knowledge.researchers || ''}
TECH DEVELOPERS: ${knowledge.techDevelopers || ''}
ENVIRONMENTAL MANAGERS: ${knowledge.envManagers || ''}

=== RESEARCH & INSIGHTS ===
RESEARCH APPROACH: ${knowledge.researchApproach || knowledge.process || ''}
CORE INSIGHTS: ${knowledge.coreInsights || ''}

=== DESIGN SOLUTION ===
DESIGN STRATEGY: ${knowledge.designStrategy || knowledge.solution || ''}
IA DESIGN: ${knowledge.iaDesign || ''}
IA FOR MANAGERS: ${knowledge.iaForManagers || ''}
DESIGN SYSTEM: ${knowledge.designSystem || ''}
DATA TRANSFORMATION: ${knowledge.dataTransformation || ''}

=== TESTING & OUTCOMES ===
TESTING: ${knowledge.testing || ''}
OUTCOMES: ${knowledge.outcomes || ''}

=== MY REFLECTIONS ===
WAS IT WORTH IT: ${knowledge.worthIt || ''}
CHALLENGES: ${knowledge.challenges || ''}
LEARNINGS: ${knowledge.learnings || ''}
PROUD OF: ${knowledge.proudOf || ''}

=== QUICK FACTS ===
ROLE: ${knowledge.role || 'Lead UX Designer'}
TOOLS: ${knowledge.tools || ''}
TEAM: ${knowledge.team || ''}
CLIENT: ${knowledge.client || ''}
`;
      }
      
      const contextPrompt = `You are Prasshanna, a UX Designer. This is the mini chatbot on your project page, and you should ONLY answer questions about THIS SPECIFIC PROJECT.

${projectDetails}

CRITICAL INSTRUCTIONS:
1. ONLY answer questions related to this project (${knowledge?.name || slug})
2. If asked about other projects, Prasshanna's background, skills, or anything not about this project, politely say: "This chat is focused on the ${knowledge?.name || 'current project'}. Click the 'Explore More' button to open the full chat where I can tell you about my other work and experience!"
3. Answer in first person as the designer who worked on this project
4. Be conversational, insightful, and give specific details from the project
5. For subjective questions (was it worth it, challenges, learnings), share your genuine reflections
6. Keep responses concise but substantive (2-4 sentences)
7. Sound natural and human, not like a corporate FAQ

USER QUESTION: ${message}`;
      
      // Try iframe communication first (talks to main chatbot)
      const iframe = document.getElementById(CHATBOT_CONFIG.iframeId);
      
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          window.removeEventListener('message', messageHandler);
          // Fallback to direct API
          this.directAPICall(message, contextPrompt)
            .then(resolve)
            .catch(reject);
        }, 5000);
        
        const messageHandler = (event) => {
          if (event.data?.type === 'MINI_CHAT_RESPONSE') {
            clearTimeout(timeoutId);
            window.removeEventListener('message', messageHandler);
            resolve(event.data.message);
          }
        };
        
        window.addEventListener('message', messageHandler);
        
        if (iframe?.contentWindow) {
          iframe.contentWindow.postMessage({
            type: 'MINI_CHAT_REQUEST',
            message: message,
            projectContext: this.projectContext,
            contextPrompt: contextPrompt
          }, '*');
        } else {
          clearTimeout(timeoutId);
          window.removeEventListener('message', messageHandler);
          this.directAPICall(message, contextPrompt)
            .then(resolve)
            .catch(reject);
        }
      });
    },
    
    async directAPICall(message, contextPrompt) {
      const apiUrl = CHATBOT_CONFIG.allowedOrigins[0] + '/api/chat';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          messages: [{ role: 'user', content: message }],
          instructions: contextPrompt,
          context: this.projectContext,
          projectContext: this.projectContext
        })
      });
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      // Extract the message text from various response formats
      if (typeof data.message === 'string') {
        return data.message;
      } else if (data.message?.message) {
        return data.message.message;
      } else if (data.content) {
        return data.content;
      }
      return 'I received your message but had trouble processing it.';
    },
    
    setupResizeHandler() {
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.updateMobileLayout();
        }, 150);
      });
    },
    
    updateMobileLayout() {
      if (!this.container) return;
      const isMobile = this.isMobile();
      
      // Update container positioning
      this.container.style.bottom = isMobile ? '12px' : '20px';
      this.container.style.maxWidth = isMobile ? 'calc(100vw - 24px)' : '600px';
      
      // Update dock input width
      if (this.chatInput) {
        this.chatInput.style.width = isMobile ? '150px' : '200px';
        this.chatInput.style.minWidth = isMobile ? '120px' : '180px';
      }
      
      // Update pills
      this.pills.forEach(pill => {
        pill.style.padding = isMobile ? '6px 10px' : '8px 14px';
        pill.style.fontSize = isMobile ? '11px' : '12px';
      });
      
      // Update mini chat window elements
      if (this.miniChatWindow) {
        const suggestions = this.miniChatWindow.querySelector('#mini-chat-suggestions');
        const messagesContainer = this.miniChatWindow.querySelector('#mini-chat-messages');
        const inputArea = this.miniChatWindow.querySelector('#mini-chat-input-area');
        
        if (suggestions) {
          suggestions.style.gap = isMobile ? '6px' : '8px';
          suggestions.style.padding = isMobile ? '10px 12px' : '12px 14px';
        }
        
        if (messagesContainer) {
          messagesContainer.style.padding = isMobile ? '12px' : '14px';
          messagesContainer.style.minHeight = isMobile ? '120px' : '160px';
          messagesContainer.style.maxHeight = isMobile ? '180px' : '220px';
        }
        
        if (inputArea) {
          inputArea.style.padding = isMobile ? '10px 12px' : '12px 14px';
        }
        
        // Update mini chat input
        if (this.miniChatInput) {
          this.miniChatInput.style.fontSize = isMobile ? '13px' : '14px';
          this.miniChatInput.style.height = isMobile ? '26px' : '28px';
          this.miniChatInput.placeholder = isMobile ? 'Ask a question...' : 'So, what would you like to know?';
        }
        
        // Update suggestion chips
        const chips = this.miniChatWindow.querySelectorAll('.suggestion-chip');
        chips.forEach(chip => {
          chip.style.padding = isMobile ? '8px 12px' : '10px 14px';
          chip.style.fontSize = isMobile ? '12px' : '13px';
        });
      }
      
      // Update chat button text for mobile (icon only on mobile)
      if (this.chatBtnText) {
        this.chatBtnText.style.display = isMobile ? 'none' : 'inline';
        this.chatBtnText.textContent = 'Ask Prasshanna';
        this.chatBtnText.style.fontSize = '13px';
      }
      
      // Update chat button shape for mobile (circular icon-only)
      if (this.chatBtn) {
        this.chatBtn.style.borderRadius = isMobile ? '50%' : '20px';
        this.chatBtn.style.padding = isMobile ? '8px' : '6px 14px 6px 6px';
        this.chatBtn.style.gap = isMobile ? '0' : '8px';
        this.chatBtn.style.minWidth = isMobile ? '36px' : 'auto';
        this.chatBtn.style.minHeight = isMobile ? '36px' : 'auto';
      }
    },
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SMOOTH STATE TRANSITION ANIMATIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    // Smooth transition: Nav → Mini Chat
    animateToMiniChat() {
      if (this.isAnimating || this.state === 'mini-chat') return;
      
      this.isAnimating = true;
      const oldState = this.state;
      console.log('[ProjectDock] Animating:', oldState, '→ mini-chat');
      
      // Add mobile scroll lock to prevent body scroll while mini-chat is open
      if (this.isMobile()) {
        document.body.classList.add('mini-chat-open');
      }
      
      const navBar = this.container.querySelector('#dock-nav-bar');
      const chatBtn = this.chatBtn;
      const separator = this.container.querySelector('#dock-separator');
      
      // Create a smooth orchestrated timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          this.state = 'mini-chat';
          this.isAnimating = false;
          setTimeout(() => this.miniChatInput?.focus(), 100);
        }
      });
      
      // Phase 1: Shrink chat button with satisfying pop
      tl.to(chatBtn, {
        scale: 0.85,
        opacity: 0.5,
        duration: 0.15,
        ease: 'power2.in'
      });
      
      // Phase 2: Collapse nav elements in parallel
      tl.to(this.navContainer, {
        width: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      }, 0.1);
      
      tl.to(chatBtn, {
        width: 0,
        padding: 0,
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
        ease: 'power2.in'
      }, 0.15);
      
      if (separator) {
        tl.to(separator, {
          opacity: 0,
          width: 0,
          duration: 0.15
        }, 0.1);
      }
      
      // Phase 3: Collapse nav bar height smoothly
      if (navBar) {
        tl.to(navBar, {
          height: 0,
          padding: 0,
          minHeight: 0,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.inOut'
        }, 0.2);
      }
      
      // Phase 4: Expand mini chat window with spring feel
      tl.add(() => {
        this.showMiniChatWindowAnimated();
      }, 0.35);
    },
    
    // Smooth transition: Mini Chat → Nav (return)
    animateToNav() {
      if (this.isAnimating || this.state === 'nav') return;
      
      this.isAnimating = true;
      console.log('[ProjectDock] Animating: mini-chat → nav');
      
      // Remove mobile scroll lock
      document.body.classList.remove('mini-chat-open');
      
      const navBar = this.container.querySelector('#dock-nav-bar');
      const chatBtn = this.chatBtn;
      const separator = this.container.querySelector('#dock-separator');
      
      // Phase 1: Collapse mini chat window first
      const collapsePromise = new Promise(resolve => {
        if (!this.miniChatWindow) {
          resolve();
          return;
        }
        
        const header = this.miniChatWindow.querySelector('#mini-chat-header');
        const inputArea = this.miniChatWindow.querySelector('#mini-chat-input-area');
        const suggestions = this.miniChatWindow.querySelector('#mini-chat-suggestions');
        const messagesContainer = this.miniChatWindow.querySelector('#mini-chat-messages');
        
        const tl = gsap.timeline({
          defaults: { ease: 'power2.in' },
          onComplete: () => {
            this.miniChatWindow.style.display = 'none';
            resolve();
          }
        });
        
        // Fade out elements quickly
        tl.to([suggestions, inputArea, messagesContainer, header].filter(Boolean), {
          opacity: 0,
          duration: 0.15
        }, 0);
        
        // Collapse container
        tl.to(this.miniChatWindow, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.2
        }, 0.1);
      });
      
      collapsePromise.then(() => {
        // Phase 2: Set up nav bar elements with proper initial state
        if (navBar) {
          // Reset nav bar to proper initial state before animating
          gsap.set(navBar, { 
            height: 'auto', 
            padding: '6px', 
            minHeight: '48px', 
            opacity: 0,
            clearProps: 'none' // Don't clear, we need height:auto
          });
        }
        
        gsap.set(this.navContainer, { width: 'auto', opacity: 0 });
        
        // Reset pills opacity
        this.pills.forEach(pill => {
          gsap.set(pill, { opacity: 0, y: 5 });
        });
        
        if (separator) {
          separator.style.display = 'block';
          gsap.set(separator, { opacity: 0 });
        }
        
        // Reset chat button with proper padding
        if (chatBtn) {
          const isMobile = this.isMobile();
          gsap.set(chatBtn, { 
            width: 'auto', 
            padding: isMobile ? '6px 12px 6px 6px' : '6px 14px 6px 6px', // Explicit padding
            scale: 0.8, 
            opacity: 0 
          });
        }
        
        this.navButton.style.display = 'none';
        
        // Phase 3: Animate everything in
        const showTl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          onComplete: () => {
            this.state = 'nav';
            this.isAnimating = false;
          }
        });
        
        // Show nav bar
        if (navBar) {
          showTl.to(navBar, {
            opacity: 1,
            duration: 0.25
          }, 0);
        }
        
        // Show nav container
        showTl.to(this.navContainer, {
          opacity: 1,
          duration: 0.25
        }, 0.05);
        
        // Stagger pills
        showTl.to(this.pills, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.03
        }, 0.1);
        
        // Show separator
        if (separator) {
          showTl.to(separator, {
            opacity: 1,
            duration: 0.15
          }, 0.15);
        }
        
        // Pop in chat button with spring
        if (chatBtn) {
          showTl.to(chatBtn, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          }, 0.2);
        }
      });
    },
    
    // Animated mini chat window expansion
    showMiniChatWindowAnimated() {
      if (!this.miniChatWindow) return;
      
      // Load question bank for smart suggestions (async, doesn't block UI)
      this.loadQuestionBank();
      
      const isMobile = this.isMobile();
      const header = this.miniChatWindow.querySelector('#mini-chat-header');
      const inputArea = this.miniChatWindow.querySelector('#mini-chat-input-area');
      const messagesContainer = this.miniChatWindow.querySelector('#mini-chat-messages');
      const suggestions = this.miniChatWindow.querySelector('#mini-chat-suggestions');
      const greetingMessage = this.miniChatWindow.querySelector('#mini-chat-greeting');
      
      // Set initial state
      this.miniChatWindow.style.display = 'flex';
      gsap.set(this.miniChatWindow, { maxHeight: 0, opacity: 0 });
      if (header) gsap.set(header, { opacity: 0, y: -10, display: 'flex' });
      if (suggestions) gsap.set(suggestions, { opacity: 0, y: -5, display: 'flex' });
      if (messagesContainer) gsap.set(messagesContainer, { opacity: 0, display: 'flex' });
      if (inputArea) gsap.set(inputArea, { opacity: 0, y: 10, display: 'block' });
      
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Expand container
      tl.to(this.miniChatWindow, {
        maxHeight: isMobile ? '400px' : '450px',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      // Fade in header
      if (header) {
        tl.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.25
        }, 0.1);
      }
      
      // Suggestions slide in (now at top)
      if (suggestions) {
        tl.to(suggestions, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        }, 0.15);
      }
      
      // Fade in messages/greeting
      if (messagesContainer) {
        tl.to(messagesContainer, {
          opacity: 1,
          duration: 0.25
        }, 0.2);
      }
      
      // Greeting visibility
      if (greetingMessage) {
        greetingMessage.style.display = this.messages.length === 0 ? 'flex' : 'none';
      }
      
      // Input area slides up last
      if (inputArea) {
        tl.to(inputArea, {
          opacity: 1,
          y: 0,
          duration: 0.3
        }, 0.3);
      }
    },
    
    // Animated mini chat window collapse
    hideMiniChatWindowAnimated(callback) {
      if (!this.miniChatWindow) {
        callback?.();
        return;
      }
      
      const header = this.miniChatWindow.querySelector('#mini-chat-header');
      const inputArea = this.miniChatWindow.querySelector('#mini-chat-input-area');
      const suggestions = this.miniChatWindow.querySelector('#mini-chat-suggestions');
      const messagesContainer = this.miniChatWindow.querySelector('#mini-chat-messages');
      
      const tl = gsap.timeline({
        defaults: { ease: 'power2.in' },
        onComplete: () => {
          this.miniChatWindow.style.display = 'none';
          callback?.();
        }
      });
      
      // Fade out elements in reverse order
      if (suggestions) {
        tl.to(suggestions, {
          opacity: 0,
          y: 10,
          duration: 0.15
        }, 0);
      }
      
      if (inputArea) {
        tl.to(inputArea, {
          opacity: 0,
          y: 10,
          duration: 0.15
        }, 0);
      }
      
      if (messagesContainer) {
        tl.to(messagesContainer, {
          opacity: 0,
          duration: 0.15
        }, 0.05);
      }
      
      if (header) {
        tl.to(header, {
          opacity: 0,
          y: -10,
          duration: 0.15
        }, 0.1);
      }
      
      // Collapse container
      tl.to(this.miniChatWindow, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.25
      }, 0.15);
    },
    
    // Legacy setState for backward compatibility (non-animated)
    setState(newState) {
      if (this.state === newState) return;
      
      const oldState = this.state;
      this.state = newState;
      
      console.log('[ProjectDock] State:', oldState, '->', newState);
      
      const inputWrapper = this.container.querySelector('#dock-input-wrapper');
      const chatBtn = this.chatBtn || this.container.querySelector('#dock-chat-btn');
      const separator = this.container.querySelector('#dock-separator');
      
      if (newState === 'nav') {
        // Show nav bar and pills, hide mini chat
        const navBar = this.container.querySelector('#dock-nav-bar');
        if (navBar) {
          gsap.to(navBar, {
            height: 'auto',
            padding: '6px',
            minHeight: '48px',
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
        gsap.to(this.navContainer, {
          width: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        // Keep dock input hidden (we use mini-chat-window input instead)
        if (inputWrapper) {
          gsap.to(inputWrapper, {
            width: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
          });
        }
        gsap.set(chatBtn, { width: 'auto' });
        gsap.to(chatBtn, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'back.out(1.5)'
        });
        if (separator) separator.style.display = 'block';
        this.navButton.style.display = 'none';
        
        // Hide mini chat window
        this.hideMiniChatWindow();
        
      } else if (newState === 'mini-chat') {
        // Hide entire top nav bar - mini-chat window has its own header
        const navBar = this.container.querySelector('#dock-nav-bar');
        if (navBar) {
          gsap.to(navBar, {
            height: 0,
            padding: 0,
            minHeight: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
          });
        }
        gsap.to(this.navContainer, {
          width: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in'
        });
        // Keep dock input wrapper hidden - mini chat window has the input
        gsap.to(inputWrapper, {
          width: 0,
          opacity: 0,
          duration: 0.2
        });
        gsap.to(chatBtn, {
          width: 0,
          opacity: 0,
          duration: 0.2
        });
        if (separator) separator.style.display = 'none';
        // Hide nav button too - mini chat header has its own minimize button
        this.navButton.style.display = 'none';
        
        // Show suggestions
        this.showMiniChatWindow(false);
        
        // Focus input in mini-chat window after animation
        setTimeout(() => this.miniChatInput?.focus(), 300);
        
      } else if (newState === 'chat-active') {
        // Keep mini-chat state but show messages
        this.showMiniChatWindow(true);
        
      } else if (newState === 'full-chat') {
        // Will be handled by openFullChat
      }
    },
    
    showMiniChatWindow(showMessages) {
      if (!this.miniChatWindow) return;
      
      const isMobile = this.isMobile();
      const header = this.miniChatWindow.querySelector('#mini-chat-header');
      const inputArea = this.miniChatWindow.querySelector('#mini-chat-input-area');
      const messagesContainer = this.miniChatWindow.querySelector('#mini-chat-messages');
      const suggestions = this.miniChatWindow.querySelector('#mini-chat-suggestions');
      const greetingMessage = this.miniChatWindow.querySelector('#mini-chat-greeting');
      
      this.miniChatWindow.style.display = 'flex';
      if (header) header.style.display = 'flex';
      if (suggestions) suggestions.style.display = 'flex';
      if (messagesContainer) messagesContainer.style.display = 'flex';
      if (inputArea) inputArea.style.display = 'block';
      
      // Show greeting only if no messages have been sent yet
      if (greetingMessage) {
        greetingMessage.style.display = this.messages.length === 0 ? 'flex' : 'none';
      }
      
      // Responsive height
      const targetHeight = isMobile ? '400px' : '450px';
      
      gsap.to(this.miniChatWindow, {
        maxHeight: targetHeight,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Focus input
      setTimeout(() => this.miniChatInput?.focus(), 100);
    },
    
    // Hide greeting message when user sends first message
    hideGreetingMessage() {
      const greetingMessage = this.miniChatWindow?.querySelector('#mini-chat-greeting');
      if (greetingMessage && greetingMessage.style.display !== 'none') {
        gsap.to(greetingMessage, {
          opacity: 0,
          height: 0,
          padding: 0,
          margin: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            greetingMessage.style.display = 'none';
          }
        });
      }
    },
    
    hideMiniChatWindow() {
      if (!this.miniChatWindow) return;
      
      gsap.to(this.miniChatWindow, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          this.miniChatWindow.style.display = 'none';
        }
      });
    },
    
    // Handle suggestion clicks - use local knowledge for instant response with section hints
    handleSuggestionClick(prompt) {
      const slug = this.projectContext?.projectSlug || 'us-hab-cti';
      const knowledge = this.projectKnowledge[slug];
      
      if (knowledge && knowledge[prompt]) {
        this.addMessage('user', this.suggestions.find(s => s.prompt === prompt)?.label || prompt);
        const sectionHint = this.findRelevantSection(prompt, prompt);
        setTimeout(() => this.addMessage('assistant', knowledge[prompt], false, sectionHint), 250);
      } else {
        this.handleUserInput(prompt);
      }
      
      // After answering, rotate to show new question suggestions
      this.rotateQuestionSuggestions();
    },
    
    // ═══════════════════════════════════════════════════════════════════════════
    // QUESTION BANK INTEGRATION
    // Fetches training-enabled questions from API for smarter suggestions
    // ═══════════════════════════════════════════════════════════════════════════
    
    async loadQuestionBank() {
      if (this.questionBankLoaded) return;
      
      const slug = this.projectContext?.projectSlug || 'us-hab-cti';
      try {
        // Fetch approved questions for this project
        const response = await fetch(`/api/case-study-questions?project=${slug}&status=approved`);
        if (response.ok) {
          const data = await response.json();
          this.questionBank = data.questions || [];
          this.questionBankLoaded = true;
          console.log(`[ProjectDock] Loaded ${this.questionBank.length} questions from bank`);
        }
      } catch (error) {
        console.log('[ProjectDock] Question bank not available, using defaults');
        this.questionBank = [];
      }
    },
    
    // Rotate suggestion chips to show new questions after user interaction
    rotateQuestionSuggestions() {
      if (!this.questionBank || this.questionBank.length === 0) return;
      
      const suggestionsRow = this.miniChatWindow?.querySelector('#mini-chat-suggestions');
      if (!suggestionsRow) return;
      
      // Get next batch of questions (show 3 at a time)
      const batchSize = 3;
      const startIndex = (this.questionBankIndex * batchSize) % this.questionBank.length;
      const nextQuestions = [];
      
      for (let i = 0; i < batchSize && i < this.questionBank.length; i++) {
        const idx = (startIndex + i) % this.questionBank.length;
        nextQuestions.push(this.questionBank[idx]);
      }
      
      if (nextQuestions.length === 0) return;
      
      // Animate out old chips
      const chips = suggestionsRow.querySelectorAll('.suggestion-chip');
      chips.forEach((chip, i) => {
        chip.style.transition = 'all 0.2s ease';
        chip.style.opacity = '0';
        chip.style.transform = 'translateY(-10px)';
      });
      
      // After fade out, replace with new questions
      setTimeout(() => {
        // Clear existing chips
        suggestionsRow.innerHTML = '';
        
        // Add new question chips from bank
        nextQuestions.forEach(q => {
          const chip = this.createQuestionChip(q);
          suggestionsRow.appendChild(chip);
          
          // Animate in
          requestAnimationFrame(() => {
            chip.style.opacity = '1';
            chip.style.transform = 'translateY(0)';
          });
        });
        
        // Add "More questions" chip
        const moreChip = this.createMoreQuestionsChip();
        suggestionsRow.appendChild(moreChip);
        requestAnimationFrame(() => {
          moreChip.style.opacity = '1';
          moreChip.style.transform = 'translateY(0)';
        });
        
        this.questionBankIndex++;
      }, 200);
    },
    
    createQuestionChip(question) {
      const s = this.styles;
      const isMobile = this.isMobile();
      
      const chip = document.createElement('button');
      chip.className = 'suggestion-chip question-bank-chip';
      chip.dataset.questionId = question.id;
      chip.dataset.linkedSection = question.linkedSection || '';
      chip.style.cssText = `
        display: inline-flex;
        align-items: center;
        padding: ${isMobile ? '8px 12px' : '10px 14px'};
        font-family: ${s.fontFamily};
        font-size: ${isMobile ? '12px' : '13px'};
        font-weight: 500;
        color: #1a1a1a;
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        opacity: 0;
        transform: translateY(10px);
      `;
      
      // Truncate long questions for chip display
      const displayText = question.question.length > 40 
        ? question.question.substring(0, 37) + '...' 
        : question.question;
      chip.textContent = displayText;
      chip.setAttribute('title', question.question);
      
      chip.addEventListener('click', () => this.handleQuestionBankClick(question));
      chip.addEventListener('mouseenter', () => {
        chip.style.background = '#1a1a1a';
        chip.style.borderColor = '#1a1a1a';
        chip.style.color = 'white';
        chip.style.transform = 'translateY(-1px)';
        chip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      });
      chip.addEventListener('mouseleave', () => {
        chip.style.background = 'rgba(255, 255, 255, 0.95)';
        chip.style.borderColor = 'rgba(0, 0, 0, 0.1)';
        chip.style.color = '#1a1a1a';
        chip.style.transform = 'translateY(0)';
        chip.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
      });
      
      return chip;
    },
    
    createMoreQuestionsChip() {
      const s = this.styles;
      const isMobile = this.isMobile();
      
      const chip = document.createElement('button');
      chip.className = 'suggestion-chip more-questions-chip';
      chip.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: ${isMobile ? '8px 12px' : '10px 14px'};
        font-family: ${s.fontFamily};
        font-size: ${isMobile ? '12px' : '13px'};
        font-weight: 500;
        color: #666;
        background: rgba(248, 248, 248, 0.95);
        border: 1px dashed rgba(0, 0, 0, 0.15);
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
        white-space: nowrap;
        opacity: 0;
        transform: translateY(10px);
      `;
      chip.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 4v6h-6M1 20v-6h6"/>
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
        </svg>
        More questions
      `;
      
      chip.addEventListener('click', () => this.rotateQuestionSuggestions());
      chip.addEventListener('mouseenter', () => {
        chip.style.background = '#f0f0f0';
        chip.style.borderColor = 'rgba(0, 0, 0, 0.2)';
        chip.style.color = '#333';
      });
      chip.addEventListener('mouseleave', () => {
        chip.style.background = 'rgba(248, 248, 248, 0.95)';
        chip.style.borderColor = 'rgba(0, 0, 0, 0.15)';
        chip.style.color = '#666';
      });
      
      return chip;
    },
    
    handleQuestionBankClick(question) {
      // Show user's question
      this.addMessage('user', question.question);
      
      // Use expected answer if available, otherwise fetch from API
      if (question.expectedAnswer) {
        const sectionHint = question.linkedSection || null;
        setTimeout(() => {
          this.addMessage('assistant', question.expectedAnswer, false, sectionHint);
          // Rotate to show new questions after answering
          setTimeout(() => this.rotateQuestionSuggestions(), 500);
        }, 250);
      } else {
        // Fall back to API for complex questions
        this.handleUserInput(question.question);
      }
    },

    addMessage(role, content, isLoading = false, sectionHint = null) {
      const messagesContainer = this.miniChatWindow?.querySelector('#mini-chat-messages');
      if (!messagesContainer) return;
      
      // Hide greeting message when first real message is sent
      if (this.messages.length === 0) {
        this.hideGreetingMessage();
      }
      
      const s = this.styles;
      const isMobile = this.isMobile();
      const isUser = role === 'user';
      
      const messageEl = document.createElement('div');
      messageEl.className = `mini-chat-message ${role}${isLoading ? ' loading' : ''}`;
      messageEl.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: ${isUser ? 'flex-end' : 'flex-start'};
        animation: fadeInUp 0.25s ease;
        width: 100%;
        gap: 6px;
      `;
      
      const bubble = document.createElement('div');
      bubble.style.cssText = `
        max-width: ${isMobile ? '90%' : '85%'};
        padding: ${isMobile ? '10px 14px' : '12px 16px'};
        font-size: ${isMobile ? '12px' : '13px'};
        line-height: 1.55;
        font-family: ${s.fontFamily};
        color: ${isUser ? 'white' : '#2a2a2a'};
        background: ${isUser ? '#1a1a1a' : 'white'};
        border: ${isUser ? 'none' : '1px solid rgba(0,0,0,0.08)'};
        border-radius: ${isUser ? '18px 4px 18px 18px' : '4px 18px 18px 18px'};
        box-shadow: ${isUser ? '0 2px 8px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.06)'};
        word-wrap: break-word;
        text-align: left;
      `;
      
      if (isLoading) {
        bubble.innerHTML = '<span class="loading-dots" style="display: inline-flex; gap: 4px;"><span style="animation: pulse 1s infinite;">•</span><span style="animation: pulse 1s infinite 0.2s;">•</span><span style="animation: pulse 1s infinite 0.4s;">•</span></span>';
      } else {
        bubble.textContent = content;
      }
      
      messageEl.appendChild(bubble);
      
      // Add section navigation hint if provided (only for assistant messages)
      if (!isUser && !isLoading && sectionHint) {
        const hintBtn = document.createElement('button');
        hintBtn.className = 'section-hint-btn';
        hintBtn.style.cssText = `
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 500;
          font-family: ${s.fontFamily};
          color: #666;
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        `;
        hintBtn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
          <span>View ${sectionHint.label} section</span>
        `;
        
        hintBtn.addEventListener('click', () => {
          this.scrollToSectionById(sectionHint.id);
        });
        hintBtn.addEventListener('mouseenter', () => {
          hintBtn.style.background = '#1a1a1a';
          hintBtn.style.color = 'white';
          hintBtn.style.borderColor = '#1a1a1a';
        });
        hintBtn.addEventListener('mouseleave', () => {
          hintBtn.style.background = 'rgba(0, 0, 0, 0.04)';
          hintBtn.style.color = '#666';
          hintBtn.style.borderColor = 'rgba(0, 0, 0, 0.08)';
        });
        
        messageEl.appendChild(hintBtn);
      }
      
      messagesContainer.appendChild(messageEl);
      
      // Store message
      if (!isLoading) {
        this.messages.push({ role, content });
      }
      
      // Show messages container (suggestions stay visible)
      messagesContainer.style.display = 'flex';
      
      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    // Scroll to section by ID with smooth animation
    scrollToSectionById(sectionId) {
      const section = document.querySelector(`#${sectionId}, [data-nav-pill="${sectionId}"]`);
      if (section) {
        // First minimize to nav for better viewing
        if (this.state !== 'nav') {
          this.animateToNav();
        }
        
        // Scroll with offset
        setTimeout(() => {
          const offset = 80;
          const targetY = section.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          
          // Highlight the section briefly
          gsap.fromTo(section, 
            { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
            { 
              boxShadow: '0 0 0 3px rgba(26, 26, 26, 0.15)', 
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut'
            }
          );
        }, this.state !== 'nav' ? 400 : 0);
      }
    },
    
    // Find relevant section for a response based on keywords
    findRelevantSection(message, responseType) {
      const lower = message.toLowerCase();
      
      // Map response types to section IDs directly
      const typeToSection = {
        'overview': { id: 'hero', label: 'Overview' },
        'role': { id: 'hero', label: 'Overview' },
        'process': { id: 'timeline', label: 'Timeline' },
        'problem': { id: 'problem', label: 'Problem' },
        'solution': { id: 'solution', label: 'Solution' },
        'outcomes': { id: 'outcome', label: 'Outcomes' },
        'research': { id: 'research', label: 'Research' },
        'users': { id: 'research', label: 'Research' }
      };
      
      // Check if responseType maps to a section
      if (responseType && typeToSection[responseType]) {
        const section = typeToSection[responseType];
        // Verify the section exists on the page
        const el = document.querySelector(`#${section.id}, [data-nav-pill]`);
        if (el) return section;
      }
      
      // Fallback: scan keywords
      for (const [sectionId, keywords] of Object.entries(this.sectionHints)) {
        if (keywords.some(kw => lower.includes(kw))) {
          // Find the actual section label from pills
          const pill = this.pills.find(p => p.getAttribute('data-section')?.toLowerCase().includes(sectionId));
          if (pill) {
            return { id: pill.getAttribute('data-section'), label: pill.textContent };
          }
        }
      }
      
      return null;
    },
    
    removeLoadingMessage() {
      const loadingMsg = this.miniChatWindow?.querySelector('.mini-chat-message.loading');
      if (loadingMsg) loadingMsg.remove();
    },
    
    // Toggle between mini chat and full chat modes
    toggleFullChat() {
      console.log('[ProjectDock] toggleFullChat called - current state:', this.state, 'isAnimating:', this.isAnimating);
      
      // Safety: Reset animating flag if it's been stuck for more than 2 seconds
      if (this.isAnimating && this._lastAnimationStart && Date.now() - this._lastAnimationStart > 2000) {
        console.warn('[ProjectDock] Animation flag was stuck, resetting');
        this.isAnimating = false;
      }
      
      if (this.isAnimating) {
        console.log('[ProjectDock] Blocked due to animation in progress');
        return;
      }
      
      if (this.state === 'full-chat') {
        // Switch back to mini chat
        this.closeFullChat();
      } else {
        // Switch to full chat
        this.openFullChat();
      }
    },
    
    // Update toggle visual state
    updateToggleState(isFullMode) {
      if (!this.toggleSwitch || !this.toggleKnob || !this.toggleLabel) return;
      
      if (isFullMode) {
        this.toggleSwitch.style.background = '#1a1a1a';
        this.toggleKnob.style.left = '16px';
        this.toggleLabel.textContent = 'Full chat ON';
      } else {
        this.toggleSwitch.style.background = 'rgba(0,0,0,0.15)';
        this.toggleKnob.style.left = '2px';
        this.toggleLabel.textContent = 'Full chat';
      }
    },
    
    openFullChat() {
      if (this.isAnimating) {
        console.log('[ProjectDock] openFullChat blocked - already animating');
        return;
      }
      
      console.log('[ProjectDock] Opening full chat with project context');
      console.log('[ProjectDock] Current state:', this.state);
      this.isAnimating = true;
      this._lastAnimationStart = Date.now();
      
      // Get full project knowledge for context
      const slug = this.projectContext?.projectSlug || 'us-hab-cti';
      const knowledge = this.projectKnowledge[slug];
      console.log('[ProjectDock] Slug:', slug, 'Has knowledge:', !!knowledge);
      
      // Get the chatbot iframe
      let iframe = document.getElementById(CHATBOT_CONFIG.iframeId);
      console.log('[ProjectDock] Found iframe:', !!iframe, iframe?.id);
      
      if (!iframe) {
        // Try to find any chatbot iframe
        iframe = document.querySelector('iframe[src*="vercel"], iframe[src*="cloudflare"], iframe[src*="localhost"]');
        console.log('[ProjectDock] Found alternative iframe:', !!iframe);
        
        if (!iframe) {
          console.error('[ProjectDock] FATAL: No chatbot iframe found!');
          this.isAnimating = false;
          return;
        }
      }
      
      // Create or show backdrop for full chat mode
      let backdrop = document.getElementById('full-chat-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'full-chat-backdrop';
        backdrop.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 9999;
          opacity: 0;
          pointer-events: auto;
          transition: opacity 0.3s ease;
        `;
        backdrop.addEventListener('click', () => this.closeFullChat());
        document.body.appendChild(backdrop);
      }
      
      // Position and size for expanded state
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const padding = vw <= 480 ? 12 : vw <= 768 ? 16 : 24;
      const width = Math.min(960, vw - padding * 2);
      const height = Math.min(720, vh - padding * 2);
      const x = (vw - width) / 2;
      const y = vh - height - padding;
      
      console.log('[ProjectDock] Iframe position - x:', x, 'y:', y, 'w:', width, 'h:', height);
      
      // Ensure iframe is set up correctly with proper CSS
      iframe.style.position = 'fixed';
      iframe.style.left = '0';
      iframe.style.top = '0';
      iframe.style.zIndex = '10000';
      iframe.style.display = 'block';
      iframe.style.visibility = 'visible';
      iframe.style.background = 'white'; // Add white background
      iframe.style.borderRadius = '16px';
      iframe.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      
      // Set initial state for animation (override any CSS opacity: 0)
      gsap.set(iframe, {
        opacity: 0,
        scale: 0.9,
        x: x,
        y: y + 50,
        width: width,
        height: height,
        pointerEvents: 'auto',
        clearProps: 'none'
      });
      
      // Animate backdrop in
      gsap.to(backdrop, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Send context and expand command to chatbot
      if (iframe.contentWindow) {
        console.log('[ProjectDock] Sending LOAD_PROJECT_CONTEXT to iframe');
        iframe.contentWindow.postMessage({
          type: 'CHATBOT_CMD',
          action: 'LOAD_PROJECT_CONTEXT',
          messages: this.messages,
          projectContext: {
            ...this.projectContext,
            knowledge: knowledge,
            isFromProjectPage: true,
            suggestions: this.suggestions // Include suggestions for full chat
          }
        }, '*');
        
        // Small delay to ensure context is processed before expand
        setTimeout(() => {
          // Tell chatbot to switch to expanded mode
          console.log('[ProjectDock] Sending EXPAND command to iframe');
          iframe.contentWindow.postMessage({
            type: 'CHATBOT_CMD',
            action: 'EXPAND'
          }, '*');
        }, 100);
      } else {
        console.warn('[ProjectDock] iframe.contentWindow not available');
      }
      
      this.state = 'full-chat';
      this.updateToggleState(true);
      
      // Animate dock out and iframe in together
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          console.log('[ProjectDock] Full chat animation complete');
          this.container.style.pointerEvents = 'none';
          this.isVisible = false;
          this.isAnimating = false;
        }
      });
      
      // Animate dock out
      tl.to(this.container, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.35,
        ease: 'power2.in'
      }, 0);
      
      // Animate iframe in
      tl.to(iframe, {
        opacity: 1,
        scale: 1,
        y: y, // Animate to final Y position directly
        duration: 0.45,
        ease: 'power2.out'
      }, 0.15);
    },
    
    closeFullChat() {
      if (this.isAnimating) return;
      
      console.log('[ProjectDock] Closing full chat, returning to NAV mode (docked state)');
      this.isAnimating = true;
      this._lastAnimationStart = Date.now();
      
      const iframe = document.getElementById(CHATBOT_CONFIG.iframeId);
      const backdrop = document.getElementById('full-chat-backdrop');
      
      // Animate backdrop out
      if (backdrop) {
        gsap.to(backdrop, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            backdrop.style.display = 'none';
          }
        });
      }
      
      // Animate the iframe out and hide it completely
      if (iframe) {
        gsap.to(iframe, {
          opacity: 0,
          scale: 0.9,
          y: '+=30',
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            // Signal to collapse the chatbot state
            if (iframe.contentWindow) {
              iframe.contentWindow.postMessage({
                type: 'CHATBOT_CMD',
                action: 'COLLAPSE'
              }, '*');
            }
            // CRITICAL: Completely hide iframe on project pages
            iframe.style.pointerEvents = 'none';
            iframe.style.visibility = 'hidden';
            iframe.style.display = 'none';
            gsap.set(iframe, { opacity: 0, visibility: 'hidden' });
          }
        });
      }
      
      // Also hide the wrapper
      const wrapper = document.getElementById('chatbot-wrapper');
      if (wrapper) {
        gsap.to(wrapper, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            wrapper.style.visibility = 'hidden';
            wrapper.style.display = 'none';
          }
        });
      }
      
      // Return to NAV state (not mini-chat) - this is the proper minimized state
      this.state = 'nav';
      this.updateToggleState(false);
      
      // Remove body scroll lock if it was set (mobile)
      document.body.classList.remove('mini-chat-open');
      
      // Prepare dock container for animated entrance
      gsap.set(this.container, {
        y: 40,
        opacity: 0,
        scale: 0.95
      });
      this.container.style.pointerEvents = 'auto';
      this.isVisible = true;
      
      // Setup NAV mode: Show nav bar with pills and chat button
      const navBar = this.container.querySelector('#dock-nav-bar');
      if (navBar) {
        gsap.set(navBar, { height: 'auto', padding: '6px', minHeight: '48px', opacity: 0 });
      }
      gsap.set(this.navContainer, { width: 'auto', opacity: 0 });
      
      // Reset pills for animation
      this.pills.forEach(pill => {
        gsap.set(pill, { opacity: 0, y: 5 });
      });
      
      // Setup chat button for animation
      const isMobile = this.isMobile();
      if (this.chatBtn) {
        gsap.set(this.chatBtn, { 
          width: 'auto', 
          opacity: 0, 
          scale: 0.8,
          padding: isMobile ? '6px 12px 6px 6px' : '6px 14px 6px 6px'
        });
      }
      
      const separator = this.container.querySelector('#dock-separator');
      if (separator) {
        separator.style.display = 'block';
        gsap.set(separator, { opacity: 0 });
      }
      
      // Hide nav button (not needed in nav mode)
      this.navButton.style.display = 'none';
      
      // Hide mini chat window (we're going to nav mode, not mini-chat)
      if (this.miniChatWindow) {
        this.miniChatWindow.style.display = 'none';
        gsap.set(this.miniChatWindow, { maxHeight: 0, opacity: 0 });
      }
      
      // Animate dock in with full nav state
      const showTl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          this.isAnimating = false;
          this.container.style.pointerEvents = 'auto';
          console.log('[ProjectDock] Dock restored to nav mode');
        }
      });
      
      // Dock container slides up
      showTl.to(this.container, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4
      }, 0);
      
      // Nav bar fades in
      if (navBar) {
        showTl.to(navBar, {
          opacity: 1,
          duration: 0.25
        }, 0.1);
      }
      
      // Nav container fades in
      showTl.to(this.navContainer, {
        opacity: 1,
        duration: 0.25
      }, 0.15);
      
      // Pills stagger in
      showTl.to(this.pills, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        stagger: 0.03
      }, 0.2);
      
      // Separator fades in
      if (separator) {
        showTl.to(separator, {
          opacity: 1,
          duration: 0.15
        }, 0.25);
      }
      
      // Chat button pops in
      if (this.chatBtn) {
        showTl.to(this.chatBtn, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'back.out(2)'
        }, 0.3);
      }
    },
    
    setupScrollObserver(sections) {
      const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      };
      
      this.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);
      
      sections.forEach(section => {
        if (section.element) {
          this.scrollObserver.observe(section.element);
        }
      });
    },
    
    // SIMULATED scroll observer - tracks scroll position to highlight pills
    // Used when real sections aren't set up yet
    setupSimulatedScrollObserver(sections) {
      this.simulatedSections = sections;
      
      const updateActiveSection = () => {
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollableHeight = pageHeight - viewportHeight;
        const scrollPercent = scrollableHeight > 0 ? scrollY / scrollableHeight : 0;
        
        // Find which simulated section we're closest to
        let activeSection = sections[0];
        for (let i = 0; i < sections.length; i++) {
          const sectionPercent = i / (sections.length - 1);
          if (scrollPercent >= sectionPercent - 0.1) {
            activeSection = sections[i];
          }
        }
        
        if (activeSection && this.activeSection !== activeSection.id) {
          this.setActiveSection(activeSection.id);
        }
      };
      
      // Throttled scroll listener
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateActiveSection();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
      
      // Initial state
      updateActiveSection();
    },
    
    setActiveSection(sectionId) {
      this.activeSection = sectionId;
      const s = this.styles;
      
      // Update pill active states
      this.pills.forEach(pill => {
        const pillSectionId = pill.getAttribute('data-section');
        const isActive = pillSectionId === sectionId;
        const isParent = pill.classList.contains('dock-pill-parent');
        const isChild = pill.classList.contains('dock-pill-child');
        
        pill.classList.toggle('active', isActive);
        
        // Different styling for parent vs child pills
        if (isActive) {
          pill.style.background = s.accentColor;
          pill.style.color = 'white';
          if (isChild) {
            pill.style.transform = 'scale(1.05)';
          }
        } else {
          // Check if this parent has an active child
          if (isParent && this.expandedParent === pillSectionId) {
            pill.style.background = 'rgba(0, 0, 0, 0.08)';
            pill.style.color = '#333';
          } else {
            pill.style.background = isChild ? 'rgba(0, 0, 0, 0.04)' : 'transparent';
            pill.style.color = isChild ? '#666' : '#555';
          }
          pill.style.transform = 'scale(1)';
        }
      });
      
      // Auto-expand parent if scrolling to a child section
      this.handleScrollExpansion(sectionId);
    },
    
    scrollToSection(section) {
      if (!section.element) return;
      
      const headerOffset = 80;
      const targetPosition = section.element.getBoundingClientRect().top + window.scrollY - headerOffset;
      
      // Use native smooth scroll - Lenis disabled for better mobile compatibility
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      
      this.setActiveSection(section.id);
    },
    
    show() {
      if (this.isVisible || !this.container) return;
      this.isVisible = true;
      
      gsap.to(this.container, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => { this.container.style.pointerEvents = 'auto'; }
      });
    },
    
    hide() {
      if (!this.isVisible || !this.container) return;
      this.isVisible = false;
      
      gsap.to(this.container, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => { this.container.style.pointerEvents = 'none'; }
      });
    },
    
    // Reset to nav state and show with smooth animation (called when returning from full chat)
    showFromFullChat() {
      // Use animated close if coming from full chat
      if (this.state === 'full-chat') {
        this.closeFullChat();
        return;
      }
      
      // Otherwise just show in nav state
      this.setState('nav');
      this.animateIn();
    },
    
    // Smooth entrance animation for dock
    animateIn() {
      if (!this.container || this.isVisible) return;
      
      this.isVisible = true;
      
      gsap.set(this.container, {
        y: 40,
        opacity: 0,
        scale: 0.9
      });
      this.container.style.pointerEvents = 'auto';
      
      const tl = gsap.timeline();
      
      tl.to(this.container, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'back.out(1.5)'
      });
      
      // Stagger pills
      tl.from(this.pills, {
        opacity: 0,
        y: 8,
        duration: 0.2,
        stagger: 0.04,
        ease: 'power2.out'
      }, 0.2);
      
      // Pop chat button
      if (this.chatBtn) {
        tl.from(this.chatBtn, {
          scale: 0.7,
          duration: 0.3,
          ease: 'back.out(2)'
        }, 0.3);
      }
    },
    
    destroy() {
      if (this.scrollObserver) {
        this.scrollObserver.disconnect();
      }
      if (this.container) {
        this.container.remove();
      }
      this.container = null;
      this.miniChatWindow = null;
      this.pills = [];
      this.messages = [];
      this.isVisible = false;
      this.state = 'nav';
    }
  };
  
  // Alias for backward compatibility
  const NavPillManager = ProjectDock;

  // ═══════════════════════════════════════════════════════════════════════════
  // CHATBOT CHOREOGRAPHY
  // ═══════════════════════════════════════════════════════════════════════════

  function initChatbotChoreography() {
    const iframe = document.getElementById(CHATBOT_CONFIG.iframeId);
    // Get the CORRECT elements based on Webflow structure
    const marqueeContainer = document.querySelector(HERO_SELECTORS.marqueeContainer);
    const subtitle = document.querySelector(HERO_SELECTORS.subtitle);

    if (!iframe) {
      console.warn('[Chatbot] No iframe found');
      return;
    }

    console.log('[Chatbot] Found elements:', {
      iframe: !!iframe,
      marqueeContainer: !!marqueeContainer,
      subtitle: !!subtitle
    });

    // Create wrapper - STARTS COMPLETELY INVISIBLE
    const wrapper = document.createElement('div');
    wrapper.id = 'chatbot-wrapper';
    wrapper.style.cssText = `
      position: fixed;
      z-index: 9998;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      border-radius: 12px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.55);
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      contain: layout paint;
      transform: translateZ(0);
    `;
    document.body.appendChild(wrapper);

    // Iframe also starts hidden
    iframe.style.background = 'transparent';
    iframe.style.visibility = 'hidden';
    iframe.style.opacity = '0';
    iframe.setAttribute('allowtransparency', 'true');

    function getMetrics() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { sizing } = CHATBOT_CONFIG;
      const isMobile = vw <= sizing.mobile.breakpoint;

      let basePercent = 0.92;
      for (const bp of sizing.resolutionBreakpoints) {
        if (vw >= bp.minWidth) { basePercent = bp.percent; break; }
      }

      let expandedWidth, expandedHeight, maxW, maxH, padding;

      if (isMobile) {
        padding = sizing.mobile.padding;
        expandedWidth = Math.round(vw * basePercent) - padding * 2;
        maxW = expandedWidth;
        expandedHeight = vh - sizing.mobile.navbarHeight - padding * 2;
        maxH = expandedHeight;
      } else {
        padding = 24;
        maxW = Math.min(sizing.maxWidth, Math.round(vw * basePercent));
        maxH = Math.min(Math.round(maxW / sizing.aspectRatio), vh - padding * 2);
        expandedWidth = Math.round(maxW * sizing.defaultScale);
        expandedHeight = Math.round(maxH * sizing.defaultScale);
      }

      const collapsedW = AppState.isMaximized ? maxW : expandedWidth;
      const collapsedH = isMobile ? sizing.collapsed.mobileHeight : sizing.collapsed.height;
      
      // Interim mode: taller than collapsed, shows header + suggestions + input
      // Height = header (~48px) + suggestions area (~120px) + input area (~56px) + padding = ~260px
      const interimH = isMobile ? 240 : 260;

      return {
        expanded: { width: expandedWidth, height: expandedHeight },
        maximized: { width: maxW, height: maxH },
        collapsed: { width: collapsedW, height: collapsedH },
        interim: { width: collapsedW, height: interimH },
        padding, isMobile
      };
    }

    function getRect(mode) {
      const m = getMetrics();
      let size;
      if (mode === 'collapsed') size = m.collapsed;
      else if (mode === 'interim') size = m.interim;
      else if (mode === 'maximized' || AppState.isMaximized) size = m.maximized;
      else size = m.expanded;

      return {
        width: size.width,
        height: size.height,
        x: (window.innerWidth - size.width) / 2,
        y: window.innerHeight - size.height - m.padding
      };
    }

    function setRect(rect, visible = true) {
      iframe.style.position = 'fixed';
      iframe.style.left = '0';
      iframe.style.top = '0';
      iframe.style.zIndex = '9999';
      wrapper.style.left = '0';
      wrapper.style.top = '0';

      gsap.set([iframe, wrapper], {
        x: rect.x, y: rect.y, width: rect.width, height: rect.height,
        opacity: visible ? 1 : 0
      });
      
      // Handle visibility - hidden state must be truly invisible
      if (visible) {
        iframe.style.visibility = 'visible';
        wrapper.style.visibility = 'visible';
        iframe.style.pointerEvents = 'auto';
      } else {
        iframe.style.pointerEvents = 'none';
        // Keep visibility hidden until first show
      }
    }

    const isAllowed = (origin) => CHATBOT_CONFIG.allowedOrigins.includes(origin);
    const postCmd = (payload) => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(payload, CHATBOT_CONFIG.allowedOrigins[0] || '*');
      }
    };

    // Init hidden - position at expanded size but completely invisible
    setRect(getRect('expanded'), false);
    
    // ─────────────────────────────────────────────────────────────────────────
    // EARLY SCROLL LISTENER - Send scroll position to iframe immediately
    // This runs before dependencies load so iframe can track scroll progress
    // ─────────────────────────────────────────────────────────────────────────
    window.addEventListener('scroll', () => {
      postCmd({ type: 'CHATBOT_CMD', action: 'SCROLL', scrollY: window.scrollY });
    }, { passive: true });

    // ─────────────────────────────────────────────────────────────────────────
    // WAIT FOR DEPENDENCIES
    // ─────────────────────────────────────────────────────────────────────────

    function waitForDeps(callback) {
      const start = Date.now();
      const tick = () => {
        const ready = window.gsap && window.ScrollTrigger && window.SplitType;
        if (ready) {
          console.log('[Deps] All loaded');
          callback();
          return;
        }
        if (Date.now() - start > 8000) {
          console.warn('[Deps] Timeout');
          // Show fallback - make everything visible
          showFallbackState();
          return;
        }
        setTimeout(tick, 50);
      };
      tick();
    }

    function showFallbackState() {
      if (marqueeContainer) gsap.set(marqueeContainer, { visibility: 'visible', opacity: 1 });
      if (subtitle) gsap.set(subtitle, { visibility: 'visible', opacity: 1 });
      const navbar = document.querySelector('.navbar-master');
      if (navbar) gsap.set(navbar, { visibility: 'visible', opacity: 1 });
      setRect(getRect('collapsed'), true);
      AppState.chatView = 'collapsed';
    }

    waitForDeps(() => {
      gsap.registerPlugin(ScrollTrigger);

      // ═══════════════════════════════════════════════════════════════════════
      // TEXT ANIMATIONS - Using CORRECT selectors
      // ═══════════════════════════════════════════════════════════════════════

      function initTextSplits() {
        return new Promise(resolve => {
          console.log('[Split] Initializing text splits...');
          
          // Split the marquee text elements
          const marqueeTexts = document.querySelectorAll(HERO_SELECTORS.marqueeText);
          if (marqueeTexts.length) {
            console.log('[Split] Found', marqueeTexts.length, 'marquee text elements');
            AppState.marqueeElements = Array.from(marqueeTexts);
            // Set initial state - hidden
            gsap.set(AppState.marqueeElements, { 
              opacity: 0, 
              y: 30,
              filter: 'blur(8px)'
            });
          }
          
          // Subtitle element
          if (subtitle) {
            console.log('[Split] Found subtitle:', subtitle.textContent?.slice(0, 30));
            AppState.subtitleElement = subtitle;
            gsap.set(subtitle, { opacity: 0, y: 20 });
          }
          
          setTimeout(resolve, 50);
        });
      }

      // Animate marquee text in
      function animateMarqueeIn() {
        return new Promise(resolve => {
          if (!AppState.marqueeElements.length) { 
            console.log('[Marquee] No elements to animate');
            resolve(); 
            return; 
          }
          
          // Make container visible
          if (marqueeContainer) {
            gsap.set(marqueeContainer, { visibility: 'visible', autoAlpha: 1 });
          }
          
          console.log('[Marquee] Animating', AppState.marqueeElements.length, 'elements');
          
          gsap.to(AppState.marqueeElements, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.02,
            onComplete: resolve
          });
        });
      }

      // Animate subtitle in
      function animateSubtitleIn() {
        return new Promise(resolve => {
          if (!AppState.subtitleElement) { 
            console.log('[Subtitle] No element to animate');
            resolve(); 
            return; 
          }
          
          gsap.set(AppState.subtitleElement, { visibility: 'visible', autoAlpha: 1 });
          
          console.log('[Subtitle] Animating');
          gsap.to(AppState.subtitleElement, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: resolve
          });
        });
      }

      // Animate heading out (for chatbot expand) - NOT USED anymore, headline stays visible
      function animateHeadingOut() {
        return new Promise(resolve => {
          const tl = gsap.timeline({ onComplete: resolve });
          
          // Fade out marquee
          if (AppState.marqueeElements.length) {
            tl.to(AppState.marqueeElements, {
              opacity: 0,
              y: -20,
              filter: 'blur(4px)',
              duration: 0.4,
              ease: 'power2.in',
              stagger: 0.01
            }, 0);
          }
          
          // Fade out subtitle
          if (AppState.subtitleElement) {
            tl.to(AppState.subtitleElement, {
              opacity: 0,
              y: -10,
              duration: 0.3,
              ease: 'power2.in'
            }, 0);
          }
        });
      }

      // Animate heading return (when chatbot collapses) - NOT USED anymore, headline stays visible
      function animateHeadingReturn() {
        return new Promise(resolve => {
          const tl = gsap.timeline({ onComplete: resolve });
          
          // Bring back marquee
          if (AppState.marqueeElements.length) {
            gsap.set(AppState.marqueeElements, { opacity: 0, y: -20, filter: 'blur(4px)' });
            tl.to(AppState.marqueeElements, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.02
            }, 0);
          }
          
          // Bring back subtitle
          if (AppState.subtitleElement) {
            gsap.set(AppState.subtitleElement, { opacity: 0, y: -10 });
            tl.to(AppState.subtitleElement, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out'
            }, 0.1);
          }
        });
      }

      function animateNavbarIn() {
        return new Promise(resolve => {
          const navbar = document.querySelector('.navbar-master') || document.querySelector('.navbar');
          
          if (!navbar) { resolve(); return; }
          
          gsap.set(navbar, { autoAlpha: 1, visibility: 'visible' });
          
          const navLeft = navbar.querySelector('.nav-left');
          const navMiddle = navbar.querySelector('.nav-middle');
          const navRight = navbar.querySelector('.nav-right');
          
          let elements = [navLeft, navMiddle, navRight].filter(Boolean);
          
          if (elements.length === 0) {
            elements = Array.from(navbar.children).filter(el => el.tagName !== 'STYLE');
          }
          
          if (elements.length === 0) {
            gsap.fromTo(navbar, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', onComplete: resolve });
            return;
          }
          
          gsap.fromTo(elements, 
            { opacity: 0, y: -25 }, 
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', onComplete: resolve }
          );
        });
      }

      // ═══════════════════════════════════════════════════════════════════════
      // CHATBOT TRANSITIONS
      // ═══════════════════════════════════════════════════════════════════════

      function waitForIframeReady(timeout = 3000) {
        return new Promise(resolve => {
          if (AppState.iframeReady) { resolve(); return; }
          
          const timer = setTimeout(() => {
            console.warn('[Iframe] Ready timeout, proceeding anyway');
            resolve();
          }, timeout);
          
          const handler = (e) => {
            if (!isAllowed(e.origin)) return;
            if (e.data?.type === 'CHATBOT_READY') {
              AppState.iframeReady = true;
              clearTimeout(timer);
              window.removeEventListener('message', handler);
              console.log('[Iframe] Ready signal received');
              resolve();
            }
          };
          
          window.addEventListener('message', handler);
        });
      }

      // NEW: Show chatbot in docked state first, then expand
      function showChatbotFirstTime() {
        return new Promise(async resolve => {
          // STEP 1: Show in collapsed/docked state first
          const collapsedRect = getRect('collapsed');
          
          // Set to collapsed size, invisible
          setRect(collapsedRect, false);
          postCmd({ type: 'CHATBOT_CMD', action: 'COLLAPSE' });
          
          // Wait for iframe to be ready
          await waitForIframeReady(2000);
          await new Promise(r => setTimeout(r, 100));
          
          // Make visible in collapsed state
          iframe.style.visibility = 'visible';
          wrapper.style.visibility = 'visible';
          
          console.log('[Chatbot] Showing docked state first');
          await new Promise(r => {
            gsap.to([iframe, wrapper], {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: r
            });
          });
          
          AppState.chatView = 'collapsed';
          
          // STEP 2: After a brief moment, expand to full view
          await new Promise(r => setTimeout(r, 250));
          
          console.log('[Chatbot] Expanding to full view');
          const expandedRect = getRect('expanded');
          postCmd({ type: 'CHATBOT_CMD', action: 'EXPAND' });
          
          await new Promise(r => {
            gsap.to([iframe, wrapper], {
              x: expandedRect.x, 
              y: expandedRect.y, 
              width: expandedRect.width, 
              height: expandedRect.height,
              duration: 0.5,
              ease: 'power2.inOut',
              onComplete: () => {
                iframe.style.pointerEvents = 'auto';
                AppState.chatView = 'expanded';
                AppState.lastExpandedTime = Date.now();
                resolve();
              }
            });
          });
        });
      }

      async function setChatState(newState, sendCommand = true) {
        // Guardrail 1: Don't process if already in this state
        if (AppState.chatView === newState) {
          console.log('[ChatState] Already in state:', newState);
          return;
        }
        
        // Guardrail 2: Don't process if animation is in progress
        if (AppState.isAnimating) {
          console.log('[ChatState] Animation in progress, ignoring:', newState);
          return;
        }
        
        // Guardrail 3: Don't process if hero sequence hasn't completed
        if (!AppState.heroSequenceComplete) {
          console.log('[ChatState] Hero sequence not complete, ignoring:', newState);
          return;
        }
        
        // Lock animation state BEFORE any changes
        AppState.isAnimating = true;
        const previousState = AppState.chatView;
        
        console.log('[ChatState] Transitioning:', previousState, '->', newState);

        if (newState === 'expanded') {
          // Hide ProjectDock when chatbot expands
          if (AppState.pageType === 'project') {
            ProjectDock.state = 'full-chat';
            ProjectDock.hide();
          }
          
          window.StickerManager?.hideButton();
          
          const rect = getRect('expanded');
          if (sendCommand) postCmd({ type: 'CHATBOT_CMD', action: 'EXPAND' });
          
          // Update wrapper class for mobile CSS
          wrapper.classList.remove('collapsed', 'interim');
          wrapper.classList.add('expanded');
          
          await new Promise(r => {
            gsap.to([iframe, wrapper], {
              x: rect.x, y: rect.y, width: rect.width, height: rect.height,
              duration: 0.5, ease: 'power2.inOut', 
              onComplete: () => {
                AppState.chatView = newState;
                AppState.lastExpandedTime = Date.now();
                iframe.style.pointerEvents = 'auto';  // Enable pointer events when expanded
                wrapper.style.pointerEvents = 'auto';
                r();
              }
            });
          });
        }

        if (newState === 'collapsed') {
          const rect = getRect('collapsed');
          if (sendCommand) postCmd({ type: 'CHATBOT_CMD', action: 'COLLAPSE' });
          
          // Update wrapper class for mobile CSS - collapsed should NOT block scroll
          wrapper.classList.remove('expanded', 'interim');
          wrapper.classList.add('collapsed');
          
          await new Promise(r => {
            gsap.to([iframe, wrapper], {
              x: rect.x, y: rect.y, width: rect.width, height: rect.height,
              duration: 0.4, ease: 'power2.inOut', 
              onComplete: () => {
                AppState.chatView = newState;
                // Disable pointer events on wrapper when collapsed to allow page scroll
                wrapper.style.pointerEvents = 'none';
                r();
              }
            });
          });
          
          // On project pages: smoothly transition chatbot out and dock in
          if (AppState.pageType === 'project') {
            // First, animate chatbot to dock position (bottom center, smaller)
            const dockRect = {
              width: 400,
              height: 56,
              x: (window.innerWidth - 400) / 2,
              y: window.innerHeight - 56 - 20
            };
            
            // Morph chatbot towards dock area
            await new Promise(r => {
              gsap.to([iframe, wrapper], {
                x: dockRect.x,
                y: dockRect.y,
                width: dockRect.width,
                height: dockRect.height,
                opacity: 0,
                duration: 0.35,
                ease: 'power2.inOut',
                onComplete: () => {
                  iframe.style.visibility = 'hidden';
                  wrapper.style.visibility = 'hidden';
                  r();
                }
              });
            });
            
            // Now show dock with a slight delay for seamless feel
            await new Promise(r => setTimeout(r, 50));
            ProjectDock.showFromFullChat();
            AppState.chatView = 'navpills';
          } else {
            // On home page, show sticker button
            window.StickerManager?.showButton(rect);
          }
        }

        // Unlock animation state AFTER everything is done
        AppState.isAnimating = false;
        console.log('[ChatState] Transition complete:', newState);
      }

      // ═══════════════════════════════════════════════════════════════════════
      // HERO SEQUENCE
      // ═══════════════════════════════════════════════════════════════════════

      async function runHeroSequence() {
        if (!AppState.preloaderDone || AppState.heroSequenceComplete || AppState.isAnimating) return;
        
        AppState.isAnimating = true;
        console.log('[Hero] ═══ Starting sequence ═══');

        // Initialize text splits first
        await initTextSplits();

        await new Promise(r => setTimeout(r, 100));

        // Navbar first
        console.log('[Hero] Navbar');
        await animateNavbarIn();

        // Then subtitle (the label above marquee)
        console.log('[Hero] Subtitle');
        await animateSubtitleIn();

        // Then marquee title (the main title animation)
        console.log('[Hero] Marquee');
        await animateMarqueeIn();

        // Stickers
        console.log('[Hero] Stickers');
        if (window.StickerManager?.animateStickerSlap) {
          await window.StickerManager.animateStickerSlap();
        }

        await new Promise(r => setTimeout(r, 200));

        // Chatbot - headline stays visible
        console.log('[Hero] Chatbot');
        await showChatbotFirstTime();

        AppState.heroSequenceComplete = true;
        AppState.isAnimating = false;
        console.log('[Hero] ═══ Complete ═══');
      }

      // ═══════════════════════════════════════════════════════════════════════
      // PROJECT PAGE SEQUENCE - Chatbot starts minimized with nav pills
      // ═══════════════════════════════════════════════════════════════════════

      async function runProjectPageSequence() {
        if (!AppState.preloaderDone || AppState.heroSequenceComplete || AppState.isAnimating) return;
        
        AppState.isAnimating = true;
        console.log('[Project] ═══ Starting project page sequence ═══');

        // CRITICAL: Ensure chatbot iframe is completely hidden on project pages
        // It should only show when user toggles to full chat mode
        if (iframe) {
          iframe.style.visibility = 'hidden';
          iframe.style.opacity = '0';
          iframe.style.pointerEvents = 'none';
          iframe.style.display = 'none';
          gsap.set(iframe, { opacity: 0, visibility: 'hidden' });
        }
        if (wrapper) {
          wrapper.style.visibility = 'hidden';
          wrapper.style.opacity = '0';
          wrapper.style.pointerEvents = 'none';
          wrapper.style.display = 'none';
          gsap.set(wrapper, { opacity: 0, visibility: 'hidden' });
        }

        // Navbar animation (simpler for project pages)
        console.log('[Project] Navbar');
        await animateNavbarIn();

        // Wait for any header scripts to add data-nav-pill attributes
        // This ensures DOMContentLoaded handlers in header code have run
        await new Promise(r => setTimeout(r, 500));

        // Debug: Log found sections
        const sections = document.querySelectorAll('[data-nav-pill]');
        console.log('[Project] Found sections with data-nav-pill:', sections.length);
        sections.forEach(s => console.log('  -', s.id, '→', s.getAttribute('data-nav-pill')));

        // Initialize and show ProjectDock (combined nav + mini-chat)
        console.log('[Project] ProjectDock init');
        ProjectDock.init();
        
        // Wait a bit more for delayed init to complete
        await new Promise(r => setTimeout(r, 300));
        
        // Show dock (chatbot is hidden, dock is visible with nav pills)
        ProjectDock.show();
        console.log('[Project] ProjectDock shown, container exists:', !!ProjectDock.container);

        // Send page context to iframe (but don't show chatbot yet - it stays hidden)
        const pageContext = PAGE_CONFIG.getPageContext();
        console.log('[Project] Sending page context:', pageContext);
        postCmd({ type: 'PAGE_CONTEXT', ...pageContext });

        AppState.heroSequenceComplete = true;
        AppState.chatView = 'navpills'; // State: dock visible, chatbot hidden
        AppState.isAnimating = false;
        console.log('[Project] ═══ Complete ═══');
      }

      // Show chatbot directly in minimized/collapsed state for project pages
      async function showChatbotMinimized() {
        return new Promise(async resolve => {
          if (AppState.chatView !== 'hidden' && AppState.chatView !== 'navpills') { 
            resolve(); 
            return; 
          }
          
          const collapsedRect = getRect('collapsed');
          setRect(collapsedRect, false);
          
          // Make visible in collapsed state
          iframe.style.visibility = 'visible';
          wrapper.style.visibility = 'visible';
          
          console.log('[Chatbot] Showing in minimized state');
          
          // Send COLLAPSE command so iframe knows to render collapsed state
          postCmd({ type: 'CHATBOT_CMD', action: 'COLLAPSE' });
          
          await new Promise(r => {
            gsap.to([iframe, wrapper], {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: r
            });
          });
          
          AppState.chatView = 'collapsed';
          
          // Hide ProjectDock when chatbot is visible
          ProjectDock.state = 'full-chat';
          ProjectDock.hide();
          
          // Show sticker button next to chatbot (if in hero area)
          window.StickerManager?.showButton(collapsedRect);
          
          resolve();
        });
      }
      
      // Show expanded chatbot from nav pills (project page)
      async function showChatbotFromNavPills() {
        if (AppState.chatView === 'expanded') return;
        
        console.log('[Chatbot] Expanding from ProjectDock');
        
        // Hide dock first
        ProjectDock.state = 'full-chat';
        ProjectDock.hide();
        
        await new Promise(r => setTimeout(r, 200));
        
        // Show chatbot in expanded state
        const expandedRect = getRect('expanded');
        setRect(expandedRect, false);
        
        iframe.style.visibility = 'visible';
        wrapper.style.visibility = 'visible';
        
        postCmd({ type: 'CHATBOT_CMD', action: 'EXPAND' });
        
        await new Promise(r => {
          gsap.to([iframe, wrapper], {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: r
          });
        });
        
        iframe.style.pointerEvents = 'auto';
        AppState.chatView = 'expanded';
        AppState.lastExpandedTime = Date.now(); // Track expansion time for grace period
      }

      // ═══════════════════════════════════════════════════════════════════════
      // EVENT LISTENERS
      // ═══════════════════════════════════════════════════════════════════════

      function waitForPreloader() {
        return new Promise(resolve => {
          if (AppState.preloaderDone) { resolve(); return; }
          window.addEventListener('PreloaderComplete', () => resolve(), { once: true });
          setTimeout(resolve, 8000);
        });
      }

      // Message listener - Handle iframe communication
      // Important: Only respond to STATE messages AFTER hero sequence is complete
      // This prevents the iframe's initial state from conflicting with the hero animation
      window.addEventListener('message', (e) => {
        // Allow messages from self (nav pills)
        const isSelfMessage = e.source === window;
        if (!isSelfMessage && !isAllowed(e.origin)) return;
        const data = e.data || {};
        
        if (data.type === 'CHATBOT_READY') {
          AppState.iframeReady = true;
          console.log('[Message] Iframe ready');
        }
        
        // Handle nav pill chat button click (from NavPillManager)
        if (data.type === 'NAV_PILL_CHAT_CLICK') {
          console.log('[Message] Nav pill chat click');
          showChatbotFromNavPills();
          return;
        }
        
        // Handle scroll-to-section commands from iframe (for project page navigation)
        if (data.type === 'CHATBOT_CMD' && data.action === 'SCROLL' && data.section) {
          console.log('[Message] Scroll to section:', data.section);
          const targetSection = document.querySelector(data.section);
          if (targetSection) {
            // Use smooth scroll with offset for fixed headers
            const headerOffset = 80; // Account for fixed navbar
            const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;
            
            // Use native smooth scroll - Lenis disabled for better mobile compatibility
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          }
          return;
        }
        
        // Handle toggle explore mode from full chatbot back to mini chat (project pages only)
        if (data.type === 'TOGGLE_EXPLORE_MODE' && data.mode === 'mini') {
          console.log('[Message] Toggle explore mode: returning to mini chat');
          if (AppState.pageType === 'project' && ProjectDock) {
            ProjectDock.closeFullChat();
          }
          return;
        }
        
        // Handle CLOSE_FULL_CHAT from minimize button in full chatbot (project pages only)
        if (data.type === 'CLOSE_FULL_CHAT') {
          console.log('[Message] Close full chat, returning to nav dock');
          if (AppState.pageType === 'project' && ProjectDock) {
            ProjectDock.closeFullChat();
          }
          return;
        }
        
        // Only process STATE messages after hero sequence is complete
        // This prevents race conditions during initial animation
        if (data.type === 'CHATBOT_STATE' && AppState.heroSequenceComplete) {
          console.log('[Message] State change:', data.mode, 'current:', AppState.chatView, 'userMinimized:', AppState.userMinimized);
          
          // Handle maximize/restore
          if (data.mode === 'maximized' || data.mode === 'restored') {
            const isMaximized = data.mode === 'maximized';
            AppState.isMaximized = isMaximized;
            console.log('[Message] Maximize state:', isMaximized);
            
            // Resize to new dimensions
            if (AppState.chatView === 'expanded') {
              const rect = getRect('expanded');
              gsap.to([iframe, wrapper], {
                x: rect.x, y: rect.y, width: rect.width, height: rect.height,
                duration: 0.3, ease: 'power2.inOut'
              });
            }
            return;
          }
          
          // Interim mode no longer changes iframe size - suggestions float above
          // Just ignore interim mode messages, the dropdown handles itself
          if (data.mode === 'interim' || data.mode === 'collapsed' && AppState.chatView === 'interim') {
            return;
          }
          
          // Handle collapse - user clicked minimize button in iframe
          if (data.mode === 'collapsed' && AppState.chatView === 'expanded') {
            AppState.userMinimized = true;
            setChatState('collapsed', false);
            return;
          }
          
          // Handle expand - ONLY if user explicitly clicked to expand (userClick flag from iframe)
          // This prevents spurious expansion from iframe state sync
          if (data.mode === 'expanded' && AppState.chatView === 'collapsed' && data.userClick === true) {
            AppState.userMinimized = false;
            setChatState('expanded', false);
          }
          
          // Note: interim mode no longer exists as a separate iframe state
          // The floating dropdown appears within the collapsed iframe
        }
      });

      // Start sequence
      waitForPreloader().then(async () => {
        if (AppState.needsTransitionIn) {
          console.log('[Transition] Animating bars out');
          await PageTransition.animateOut();
        }
        
        const fontReady = document.fonts?.ready || Promise.resolve();
        await fontReady;
        
        if (!AppState.preloaderDone) AppState.preloaderDone = true;
        
        // Run appropriate sequence based on page type
        if (AppState.pageType === 'project') {
          console.log('[Sequence] Running project page sequence');
          runProjectPageSequence();
        } else {
          console.log('[Sequence] Running hero sequence (home page)');
          runHeroSequence();
        }
      });

      // ═══════════════════════════════════════════════════════════════════════
      // SCROLL BEHAVIOR - MINIMIZE ONLY
      // Scroll down: minimize to docked (only after grace period)
      // Scroll up: NEVER auto-expand (user must click)
      // ═══════════════════════════════════════════════════════════════════════
      
      const SCROLL_THRESHOLD = 100; // pixels of scroll to trigger minimize
      const EXPAND_GRACE_PERIOD = 2000; // 2 seconds after expansion before scroll-minimize is allowed
      
      // Track if mouse is over the chatbot (to prevent accidental minimize while reading)
      let mouseOverChatbot = false;
      const iframe = document.getElementById('portfolio-chatbot');
      if (iframe) {
        iframe.addEventListener('mouseenter', () => { mouseOverChatbot = true; });
        iframe.addEventListener('mouseleave', () => { mouseOverChatbot = false; });
      }
      
      // Scroll-based minimize (but never expand)
      window.addEventListener('scroll', () => {
        // Basic guards
        if (!AppState.heroSequenceComplete || AppState.isAnimating) return;
        if (window.StickerGame?.isPlaying?.()) return;
        if (mouseOverChatbot) return;
        if (AppState.chatView !== 'expanded') return;
        
        // CRITICAL: Grace period after expansion
        // This prevents minimize on page reload at non-zero scroll position
        const timeSinceExpand = Date.now() - AppState.lastExpandedTime;
        if (timeSinceExpand < EXPAND_GRACE_PERIOD) {
          return;
        }
        
        const scrollY = window.scrollY || 0;
        
        // Minimize when scrolling down past threshold
        if (scrollY > SCROLL_THRESHOLD) {
          console.log('[Scroll] Minimizing - past threshold after grace period');
          AppState.userMinimized = true;
          setChatState('collapsed', true);
        }
      }, { passive: true });

      // Resize
      window.addEventListener('resize', () => {
        if (AppState.chatView !== 'hidden' && !AppState.isAnimating) {
          const rect = getRect(AppState.chatView);
          setRect(rect, true);
          if (AppState.chatView === 'collapsed') {
            window.StickerManager?.positionButton(rect);
          }
        }
      }, { passive: true });

      console.log('[Chatbot] Choreography ready');
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════

  async function init() {
    console.log('[Portfolio] ═══ Init v4.2.0 ═══');
    console.log('[Portfolio] Transition pending:', AppState.needsTransitionIn);
    
    if (!initGSAP()) {
      console.error('[Portfolio] GSAP not available');
      return;
    }
    
    AppState.pageType = PAGE_CONFIG.getPageType();
    console.log('[Portfolio] Page type:', AppState.pageType);
    
    initLenis();
    
    // Page transitions
    PageTransition.init();
    setupPageTransitions();
    
    // Circular images
    initCircularImages();
    
    // Stickers
    if (window.gsap && window.Draggable) {
      StickerManager.init();
      window.StickerManager = StickerManager;
    }
    
    // Chatbot
    initChatbotChoreography();
    
    // Preloader
    await initPreloader();
    
    console.log('[Portfolio] ═══ Ready ═══');
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  // Export global state and controls for external scripts (e.g., sticker-game.js)
  window.PageTransition = PageTransition;
  window.AppState = AppState;
  window.ProjectDock = ProjectDock;
  
  // Provide a simple chatbot control interface for external scripts
  window.ChatbotControl = {
    collapse: () => {
      const iframe = document.getElementById(CHATBOT_CONFIG.iframeId);
      const wrapper = document.getElementById('chatbot-wrapper');
      if (iframe && wrapper) {
        gsap.to([iframe, wrapper], {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            iframe.style.visibility = 'hidden';
            iframe.style.pointerEvents = 'none';
            wrapper.style.visibility = 'hidden';
            wrapper.style.pointerEvents = 'none';
          }
        });
      }
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'CHATBOT_CMD', action: 'COLLAPSE' }, '*');
      }
    },
    restore: () => {
      const iframe = document.getElementById(CHATBOT_CONFIG.iframeId);
      const wrapper = document.getElementById('chatbot-wrapper');
      if (iframe && wrapper) {
        iframe.style.visibility = 'visible';
        wrapper.style.visibility = 'visible';
        gsap.to([iframe, wrapper], {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            iframe.style.pointerEvents = 'auto';
            wrapper.style.pointerEvents = 'auto';
          }
        });
      }
    }
  };

})();

/**
 * Webflow Chatbot Choreography - Hosted Version
 * Include in Webflow: <script src="YOUR_TUNNEL_URL/webflow/chatbot.js"></script>
 * 
 * This script handles the chatbot iframe animation and integration.
 * Load this AFTER body.js
 */

(() => {
  'use strict';
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIGURATION - Uses TUNNEL_URL or VERCEL_URL set in embed code
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Origin is set by the embed code (either TUNNEL_URL or VERCEL_URL)
  const CHATBOT_ORIGIN = window.TUNNEL_URL || window.VERCEL_URL || 'http://localhost:3000';
  
  const CONFIG = {
    iframeId: 'portfolio-chatbot',
    headingId: 'heading',
    allowedOrigins: [
      CHATBOT_ORIGIN,
      window.TUNNEL_URL,
      window.VERCEL_URL,
      'http://localhost:3000'
    ].filter(Boolean),
    sizing: {
      expanded: { maxWidth: 960, height: 720 },
      collapsed: { maxWidth: 960, height: 86 }
    },
    animation: {
      duration: 0.55,
      ease: 'power3.out'
    }
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════
  
  const state = {
    chatView: 'hidden', // 'hidden' | 'expanded' | 'collapsed'
    preloaderDone: false,
    splitReady: false,
    isAnimating: false,
    chars: [],
    scrollTrigger: null,
    heroTimeline: null
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DOM ELEMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  
  const iframe = document.getElementById(CONFIG.iframeId);
  const heading = document.getElementById(CONFIG.headingId);
  
  if (!iframe || !heading) {
    console.warn('[Chatbot] Missing iframe or heading element');
    return;
  }
  
  // Initial heading state
  heading.style.visibility = 'hidden';
  heading.style.opacity = '0';
  heading.style.transform = 'translateY(0px)';
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SIZING UTILITIES
  // ═══════════════════════════════════════════════════════════════════════════
  
  function getMetrics() {
    const vw = window.innerWidth || 1200;
    const vh = window.innerHeight || 800;
    const isMobile = vw <= 480;
    const isTablet = vw > 480 && vw <= 1024;
    
    // Responsive padding - tighter on mobile
    let padding;
    if (isMobile) padding = 12;
    else if (isTablet) padding = 20;
    else padding = 24;
    
    // TABLET FIX: Ensure chatbot is properly sized on tablets (not too small)
    // Use percentage-based sizing for better responsiveness
    let expandedWidth, expandedHeight;
    
    if (isMobile) {
      // Mobile: Nearly full width, taller height for better experience
      expandedWidth = Math.min(vw - padding * 2, vw * 0.95);
      expandedHeight = Math.min(vh * 0.85, vh - padding * 2 - 50); // Taller on mobile - 85% of viewport
    } else if (isTablet) {
      // TABLET (iPad): Use much more screen real estate - 80% width, 80% height minimum
      expandedWidth = Math.min(CONFIG.sizing.expanded.maxWidth, Math.max(vw * 0.80, 600));
      expandedHeight = Math.min(CONFIG.sizing.expanded.height, Math.max(vh * 0.80, 600));
    } else {
      // Desktop: Standard sizing with max constraints
      expandedWidth = Math.min(CONFIG.sizing.expanded.maxWidth, vw - padding * 2);
      expandedHeight = Math.min(CONFIG.sizing.expanded.height, vh - padding * 2);
    }
    
    // Collapsed width follows expanded, height is fixed
    const collapsedWidth = Math.min(CONFIG.sizing.collapsed.maxWidth, expandedWidth);
    const collapsedHeight = isMobile ? 76 : CONFIG.sizing.collapsed.height; // Slightly taller touch target on mobile
    
    return {
      expanded: { width: expandedWidth, height: expandedHeight },
      collapsed: { width: collapsedWidth, height: collapsedHeight },
      padding,
      isMobile,
      isTablet
    };
  }
  
  let metrics = getMetrics();
  
  // ═══════════════════════════════════════════════════════════════════════════
  // IFRAME POSITIONING & ANIMATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  function getFrameRect(mode) {
    const size = mode === 'expanded' ? metrics.expanded : metrics.collapsed;
    const vh = window.innerHeight;
    
    // Always anchor to bottom - y is distance from top, so calculate from bottom up
    // This ensures the input bar stays at the same position when height changes
    const bottomPadding = metrics.padding;
    const y = vh - size.height - bottomPadding;
    
    return {
      width: size.width,
      height: size.height,
      x: (window.innerWidth - size.width) / 2,
      y: y
    };
  }
  
  function setFrameRect(rect, visible = true) {
    iframe.style.position = 'fixed';
    iframe.style.left = '0';
    iframe.style.top = '0';
    iframe.style.right = 'auto';
    iframe.style.bottom = 'auto';
    iframe.style.transform = 'none';
    iframe.style.zIndex = '9999';
    
    // FLICKER FIX: Use transform3d for GPU acceleration and prevent repaints
    // Also use visibility instead of just opacity for cleaner transitions
    if (window.gsap) {
      gsap.set(iframe, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        // Force GPU layer to prevent flickering during animations
        force3D: true,
        // Prevent sub-pixel rendering issues
        rotation: 0.01
      });
    }
    iframe.style.pointerEvents = visible ? 'auto' : 'none';
  }
  
  function transitionFrame(toMode, sendCommand = true) {
    return new Promise((resolve) => {
      const toRect = getFrameRect(toMode);
      
      // FLICKER FIX: Use will-change sparingly and force GPU layer
      iframe.style.willChange = 'transform, width, height, opacity';
      
      // Common animation config to prevent flickering
      const animConfig = {
        x: toRect.x,
        y: toRect.y,
        width: toRect.width,
        height: toRect.height,
        force3D: true, // Keeps it on GPU layer
        rotation: 0.01, // Prevents sub-pixel jittering
        onComplete: () => {
          iframe.style.pointerEvents = 'auto';
          // Delay removing will-change to prevent flicker on completion
          setTimeout(() => {
            iframe.style.willChange = 'auto';
          }, 100);
          resolve();
        }
      };
      
      if (toMode === 'expanded') {
        if (sendCommand) {
          postToChatbot({ type: 'CHATBOT_CMD', action: 'EXPAND' });
        }
        
        gsap.to(iframe, {
          ...animConfig,
          duration: 0.5,
          ease: 'power3.out'
        });
      } else {
        if (sendCommand) {
          postToChatbot({ type: 'CHATBOT_CMD', action: 'COLLAPSE' });
        }
        
        gsap.to(iframe, {
          ...animConfig,
          duration: 0.45,
          ease: 'power3.out'
        });
      }
    });
  }
  
  function initFrame() {
    const rect = getFrameRect('collapsed');
    setFrameRect(rect, false);
  }
  
  initFrame();
  
  // ═══════════════════════════════════════════════════════════════════════════
  // IFRAME COMMUNICATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  const isAllowedOrigin = (origin) => {
    // For now, allow all origins during development to debug interim mode
    // TODO: Tighten this up after debugging
    const allowed = CONFIG.allowedOrigins.length === 0 || 
                    CONFIG.allowedOrigins.includes(origin) ||
                    origin.includes('trycloudflare.com') ||
                    origin.includes('localhost');
    return allowed;
  };
  
  function postToChatbot(payload) {
    if (!iframe.contentWindow) return;
    const targetOrigin = CONFIG.allowedOrigins[0] || '*';
    iframe.contentWindow.postMessage(payload, targetOrigin);
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DEPENDENCY LOADING
  // ═══════════════════════════════════════════════════════════════════════════
  
  function waitForDeps(callback) {
    const start = Date.now();
    
    const tick = () => {
      if (window.gsap && window.ScrollTrigger && window.SplitType) {
        callback();
        return;
      }
      
      if (Date.now() - start > 8000) {
        console.warn('[Chatbot] Dependencies timeout, showing fallback');
        heading.style.visibility = 'visible';
        heading.style.opacity = '1';
        const rect = getFrameRect('collapsed');
        setFrameRect(rect, true);
        state.chatView = 'collapsed';
        return;
      }
      
      setTimeout(tick, 50);
    };
    
    tick();
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  waitForDeps(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const SplitType = window.SplitType;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // ─────────────────────────────────────────────────────────────────────────
    // HEADING ANIMATIONS
    // ─────────────────────────────────────────────────────────────────────────
    
    function initSplit() {
      if (state.splitReady) return;
      
      const split = new SplitType(`#${CONFIG.headingId}`, { types: "chars" });
      state.chars = split.chars || [];
      
      gsap.set(state.chars, { yPercent: 100, opacity: 0 });
      state.splitReady = true;
    }
    
    function activateScrollTrigger() {
      if (state.scrollTrigger || !state.chars.length) return;
      
      const tween = gsap.to(state.chars, {
        yPercent: -100,
        stagger: { from: "center", amount: 1 },
        scrollTrigger: {
          trigger: `#${CONFIG.headingId}`,
          start: "top top",
          end: () => `+=${heading.offsetHeight * 0.25}`,
          scrub: 1
        }
      });
      
      state.scrollTrigger = tween.scrollTrigger;
      if (state.scrollTrigger) state.scrollTrigger.disable(false);
    }
    
    function enableScroll() {
      if (state.scrollTrigger) {
        state.scrollTrigger.enable(false);
        ScrollTrigger.refresh();
      }
    }
    
    function disableScroll() {
      if (state.scrollTrigger) state.scrollTrigger.disable(false);
    }
    
    function introHeading() {
      initSplit();
      activateScrollTrigger();
      disableScroll();
      
      gsap.killTweensOf(state.chars);
      
      gsap.set(heading, {
        autoAlpha: 1,
        visibility: "visible",
        y: 0,
        x: 0,
        clearProps: "transform"
      });
      
      return gsap.to(state.chars, {
        yPercent: 0,
        opacity: 1,
        ease: "sine.out",
        duration: 0.6,
        stagger: { from: "center", amount: 0.5, ease: "power1.out" },
        onComplete: enableScroll
      });
    }
    
    function hideHeading() {
      if (!state.splitReady) return gsap.to({}, { duration: 0 });
      
      disableScroll();
      gsap.killTweensOf(state.chars);
      
      return gsap.to(state.chars, {
        yPercent: -100,
        duration: 0.6,
        ease: "sine.in",
        stagger: { from: "center", amount: 0.4 }
      });
    }
    
    function showHeadingReturn() {
      if (!state.splitReady) return gsap.to({}, { duration: 0 });
      
      activateScrollTrigger();
      disableScroll();
      
      gsap.killTweensOf(state.chars);
      gsap.set(heading, {
        autoAlpha: 1,
        visibility: "visible",
        y: 0,
        x: 0,
        clearProps: "transform"
      });
      
      return gsap.fromTo(state.chars,
        { yPercent: -100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "sine.out",
          stagger: { from: "center", amount: 0.5, ease: "power1.out" },
          onComplete: enableScroll
        }
      );
    }
    
    // ─────────────────────────────────────────────────────────────────────────
    // CHAT STATE MANAGEMENT
    // ─────────────────────────────────────────────────────────────────────────
    
    async function setChatState(newState, sendCommand = true) {
      if (state.chatView === newState || state.isAnimating) return;
      
      state.isAnimating = true;
      state.chatView = newState;
      
      if (newState === 'expanded') {
        hideHeading();
        await transitionFrame('expanded', sendCommand);
        state.isAnimating = false;
      }
      
      if (newState === 'collapsed') {
        await transitionFrame('collapsed', sendCommand);
        showHeadingReturn();
        state.isAnimating = false;
      }
    }
    
    function showChatbotFirstTime() {
      return new Promise((resolve) => {
        const rect = getFrameRect('expanded');
        setFrameRect(rect, false);
        
        postToChatbot({ type: 'CHATBOT_CMD', action: 'EXPAND' });
        
        gsap.delayedCall(0.15, () => {
          gsap.to(iframe, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              iframe.style.pointerEvents = 'auto';
              state.chatView = 'expanded';
              resolve();
            }
          });
        });
      });
    }
    
    // ─────────────────────────────────────────────────────────────────────────
    // HERO SEQUENCE
    // ─────────────────────────────────────────────────────────────────────────
    
    async function runHeroSequence() {
      if (!state.preloaderDone) return;
      if (state.isAnimating) return;
      
      state.isAnimating = true;
      
      if (state.heroTimeline) state.heroTimeline.kill();
      
      await new Promise(resolve => {
        const tween = introHeading();
        tween.eventCallback('onComplete', resolve);
      });
      
      await new Promise(resolve => gsap.delayedCall(0.4, resolve));
      
      hideHeading();
      await showChatbotFirstTime();
      
      state.isAnimating = false;
    }
    
    // ─────────────────────────────────────────────────────────────────────────
    // PRELOADER WAIT
    // ─────────────────────────────────────────────────────────────────────────
    
    function waitForPreloader() {
      return new Promise((resolve) => {
        if (!document.querySelector('.preloader')) {
          resolve();
          return;
        }
        
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          resolve();
        };
        
        window.addEventListener('PreloaderComplete', finish, { once: true });
        setTimeout(finish, 10000);
      });
    }
    
    waitForPreloader().then(() => {
      const fontReady = document.fonts?.ready ? document.fonts.ready : Promise.resolve();
      fontReady.then(() => {
        state.preloaderDone = true;
        runHeroSequence();
      });
    });
    
    // ─────────────────────────────────────────────────────────────────────────
    // MESSAGE LISTENER (from chatbot iframe)
    // ─────────────────────────────────────────────────────────────────────────
    
    window.addEventListener('message', (event) => {
      console.log('[Webflow] Message received from:', event.origin, '| Allowed:', CONFIG.allowedOrigins, '| Data:', event.data);
      if (!isAllowedOrigin(event.origin)) {
        console.log('[Webflow] Origin not allowed, ignoring message');
        return;
      }
      
      const data = event.data || {};
      
      if (data.type === 'CHATBOT_READY') {
        console.log('[Webflow] Chatbot ready');
        if (state.chatView === 'expanded') {
          postToChatbot({ type: 'CHATBOT_CMD', action: 'EXPAND' });
        }
      }
      
      if (data.type === 'CHATBOT_STATE') {
        const chatbotMode = data.mode;
        console.log('[Webflow] Chatbot state changed:', chatbotMode, '| Current state:', state.chatView, '| isAnimating:', state.isAnimating);
        
        if (chatbotMode === 'collapsed' && state.chatView !== 'collapsed') {
          console.log('[Webflow] Collapsing from:', state.chatView);
          setChatState('collapsed', false);
        } else if (chatbotMode === 'expanded' && state.chatView !== 'expanded') {
          console.log('[Webflow] Expanding to full');
          setChatState('expanded', false);
        } else {
          console.log('[Webflow] No state change needed');
        }
      }
    });
    
    // ─────────────────────────────────────────────────────────────────────────
    // SCROLL BEHAVIOR
    // ─────────────────────────────────────────────────────────────────────────
    
    window.addEventListener('scroll', () => {
      if (!state.preloaderDone || state.isAnimating) return;
      
      if (window.scrollY > 6 && state.chatView === 'expanded') {
        setChatState('collapsed', true);
      }
    }, { passive: true });
    
    const heroTrigger = heading.closest('.section-10') || heading.closest('section') || heading;
    
    ScrollTrigger.create({
      trigger: heroTrigger,
      start: 'top top',
      end: 'bottom top',
      onEnterBack: () => {
        if (!state.preloaderDone || state.isAnimating) return;
        runHeroSequence();
      }
    });
    
    // ─────────────────────────────────────────────────────────────────────────
    // RESIZE HANDLER
    // ─────────────────────────────────────────────────────────────────────────

    window.addEventListener('resize', () => {
      metrics = getMetrics();
      
      if (state.preloaderDone && state.chatView !== 'hidden' && !state.isAnimating) {
        const rect = getFrameRect(state.chatView);
        setFrameRect(rect, true);
      }
      
      if (state.scrollTrigger) ScrollTrigger.refresh();
    }, { passive: true });
    
    // ─────────────────────────────────────────────────────────────────────────
    // GLOBAL API FOR EXTERNAL SCRIPTS
    // ─────────────────────────────────────────────────────────────────────────
    
    window.ChatbotAPI = {
      // Reinitialize chatbot to collapsed state - replays init like page refresh
      reinitCollapsed: function() {
        return new Promise((resolve) => {
          console.log('[ChatbotAPI] Reinitializing to collapsed state...');
          
          // Step 1: Reset state
          state.chatView = 'hidden';
          state.isAnimating = true;
          
          // Step 2: Kill any running animations and clear transforms
          gsap.killTweensOf(iframe);
          
          // Step 3: Calculate fresh collapsed position FIRST
          metrics = getMetrics(); // Refresh metrics for current viewport
          const rect = getFrameRect('collapsed');
          const vh = window.innerHeight;
          
          console.log('[ChatbotAPI] Calculated position:', {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            vh: vh,
            expectedBottom: vh - rect.height - metrics.padding
          });
          
          // Step 4: Reset iframe to clean state with explicit positioning
          iframe.style.cssText = `
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            right: auto !important;
            bottom: auto !important;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            z-index: 9999;
            border: none;
            border-radius: 16px;
            background: transparent;
          `;
          
          // Step 5: Use GSAP to set the transform position
          gsap.set(iframe, {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            force3D: true,
            rotation: 0.01 // Prevent sub-pixel issues
          });
          
          // Step 6: Tell iframe to show collapsed UI
          postToChatbot({ type: 'CHATBOT_CMD', action: 'COLLAPSE' });
          
          // Step 7: Fade in after brief delay (like first load)
          gsap.delayedCall(0.2, () => {
            iframe.style.visibility = 'visible';
            gsap.to(iframe, {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: () => {
                iframe.style.pointerEvents = 'auto';
                state.chatView = 'collapsed';
                state.isAnimating = false;
                console.log('[ChatbotAPI] Reinitialized to collapsed at y:', rect.y);
                resolve();
              }
            });
          });
        });
      },
      
      // Get current state
      getState: function() {
        return state.chatView;
      },
      
      // Force expand
      expand: function() {
        return setChatState('expanded', true);
      },
      
      // Force collapse
      collapse: function() {
        return setChatState('collapsed', true);
      }
    };
    
    console.log('[Webflow] Chatbot choreography initialized with API');
  });
})();

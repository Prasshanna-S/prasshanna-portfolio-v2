/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PROBLEM SQUASHER - Easter Egg Mini-Game v4.0
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * NARRATIVE: You're a Figma Wizard. Design & dev problems come at you from 
 * all sides. Squash them before they derail the project.
 * 
 * "If you hire me, I squash all problems that come your way."
 * 
 * Version: 4.0.0
 * - Redesigned: Enemies are now design/dev problems, not competing tools
 * - Added: Narrative intro before countdown
 * - Improved: Fluid mounting animation with gun assembly feel
 * - Updated: All copy reflects problem-squashing theme
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════════════

  const CONFIG = {
    design: {
      fontBody: 'Thegoodmonolith, Arial, sans-serif',
      fontTitle: 'Instrument Serif, Georgia, serif',
      colorDark: '#121212',
      colorLight: '#f4f4f4',
      colorAccent: '#1a1a1a',
      colorSuccess: '#0ACF83',
      colorWarning: '#F24E1E',
      colorFigma: '#F24E1E',
    },
    mountPoint: {
      xPercent: 0.88,
      yPercent: 0.35,
      snapRadius: 100,
    },
    gun: {
      fireRate: 150,
      projectileSpeed: 1400,
      projectileSize: 32,
    },
    enemies: {
      spawnRate: 550,
      baseSpeed: 100,
      speedVariation: 30,
      size: 180,
      wavePattern: true,
      speedRampUp: 1.5,  // Speed multiplier by end of game
    },
    game: {
      duration: 30000,
      warmupTime: 1200,
    },
    scoring: {
      basePoints: 10,
      comboMultiplier: 0.2,
      maxCombo: 10,
    },
    audio: {
      enabled: true,
      volume: 0.3,
    },
    narrative: {
      lines: [
        "You're a Figma Wizard.",
        "Problems are coming from all sides.",
        "Squash them before they reach the project."
      ],
      duration: 3500,
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN/DEV PROBLEMS - Custom enemy monster assets
  // ═══════════════════════════════════════════════════════════════════════════
  
  const ENEMY_ASSETS = [
    { 
      name: 'contrast-vampire', 
      label: 'Contrast Vampire',
      color: '#8B5CF6', 
      image: 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739/696f18ab07ed1fc6a1ee8f75_contrast%20vampire.avif'
    },
    { 
      name: 'margin-monster', 
      label: 'Margin Monster',
      color: '#F97316', 
      image: 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739/696f18ac76ba6e61cb87bc9c_margin%20monster.avif'
    },
    { 
      name: 'layer-monster', 
      label: 'Layer Monster',
      color: '#3B82F6', 
      image: 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739/696f18acb3de47aa27373504_layer%20monster.avif'
    },
    { 
      name: 'final-final', 
      label: 'Final Final',
      color: '#EF4444', 
      image: 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739/696f18acb26189f50fcb038e_final%20final.avif'
    },
    { 
      name: 'z-index-monster', 
      label: 'Z-Index Monster',
      color: '#10B981', 
      image: 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739/696f18acf04fa48923fbc576_z%20index%20monster.avif'
    },
    { 
      name: 'lorem-ipsum', 
      label: 'Lorem Ipsum',
      color: '#6B7280', 
      image: 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739/696f18ac919b34f17f82e765_lorem%20ipsum.avif'
    },
    { 
      name: 'instance-monster', 
      label: 'Instance Monster',
      color: '#EC4899', 
      image: 'https://cdn.prod.website-files.com/695afa44576c42dc837b0739/696f18acd36d55620ae5e7c3_instance%20monster.avif'
    },
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // FIGMA SOLUTIONS - Your weapons against problems
  // ═══════════════════════════════════════════════════════════════════════════
  
  const PROJECTILE_TOOLS = [
    { name: 'component', svg: `<svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="${CONFIG.design.colorFigma}" opacity="0.2"/>
      <path d="M8 16L16 8L24 16L16 24L8 16ZM16 11L12 16L16 21L20 16L16 11Z" fill="${CONFIG.design.colorFigma}"/>
    </svg>` },
    { name: 'autolayout', svg: `<svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="${CONFIG.design.colorFigma}" opacity="0.2"/>
      <rect x="8" y="10" width="16" height="4" rx="1" fill="${CONFIG.design.colorFigma}"/>
      <rect x="8" y="16" width="12" height="3" rx="1" fill="${CONFIG.design.colorFigma}"/>
      <rect x="8" y="21" width="8" height="3" rx="1" fill="${CONFIG.design.colorFigma}"/>
    </svg>` },
    { name: 'variants', svg: `<svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="${CONFIG.design.colorFigma}" opacity="0.2"/>
      <path d="M16 6L8 10v12l8 4 8-4V10l-8-4z" fill="${CONFIG.design.colorFigma}"/>
    </svg>` },
    { name: 'prototype', svg: `<svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="${CONFIG.design.colorFigma}" opacity="0.2"/>
      <path d="M12 8v16l12-8L12 8z" fill="${CONFIG.design.colorFigma}"/>
    </svg>` },
    { name: 'devmode', svg: `<svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="${CONFIG.design.colorFigma}" opacity="0.2"/>
      <path d="M12 20L6 16l6-4v8zm8 0l6-4-6-4v8z" fill="${CONFIG.design.colorFigma}"/>
    </svg>` },
    { name: 'style', svg: `<svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="${CONFIG.design.colorFigma}" opacity="0.2"/>
      <circle cx="16" cy="16" r="8" fill="${CONFIG.design.colorFigma}"/>
    </svg>` },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // AUDIO SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════

  const AudioSystem = {
    ctx: null,
    init() {
      if (this.ctx || !CONFIG.audio.enabled) return;
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    },
    play(freq, duration, type = 'sine') {
      if (!this.ctx || !CONFIG.audio.enabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);
      gain.gain.setValueAtTime(CONFIG.audio.volume * 0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration);
    },
    shoot() { this.play(880, 0.1); },
    hit() { this.play(200, 0.15, 'square'); },
    combo(level) { this.play(440 + level * 100, 0.2); },
    gameStart() { [0, 0.1, 0.2].forEach((d, i) => setTimeout(() => this.play(330 * (i+1), 0.15), d * 1000)); },
    gameEnd() { [0, 0.15, 0.3].forEach((d, i) => setTimeout(() => this.play(440 - i*80, 0.2), d * 1000)); }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // GAME STATE
  // ═══════════════════════════════════════════════════════════════════════════

  const GameState = {
    phase: 'idle', // idle | dragging | countdown | playing | ended
    score: 0,
    combo: 0,
    maxCombo: 0,
    enemiesDestroyed: 0,
    shotsFired: 0,
    shotsHit: 0,
    startTime: 0,
    lastFireTime: 0,
    lastSpawnTime: 0,
    mousePos: { x: 0, y: 0 },
    figmaOriginalTransform: null,
    figmaOriginalParent: null,    // Store original parent element for DOM restoration
    figmaNextSibling: null,       // Store next sibling for exact position restoration
    hintShown: false,
  };

  const pools = { projectiles: [], enemies: [] };

  // DOM references
  let figmaIcon = null;
  let mountIndicator = null;
  let gameContainer = null;
  let scoreDisplay = null;
  let comboDisplay = null;
  let crosshair = null;
  let rafId = null;
  let hintElement = null;

  // ═══════════════════════════════════════════════════════════════════════════
  // STYLES
  // ═══════════════════════════════════════════════════════════════════════════

  function injectStyles() {
    if (document.getElementById('sticker-game-styles')) return;
    
    const css = `
      /* Mount Point Indicator - Simple inviting dock design */
      .game-mount {
        position: fixed;
        width: 140px;
        height: 140px;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .game-mount-inner {
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: 3px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.5);
      }
      .game-mount-icon {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(242, 78, 30, 0.1);
        border-radius: 50%;
        transition: all 0.3s ease;
      }
      .game-mount-icon svg {
        width: 32px;
        height: 32px;
        fill: rgba(242, 78, 30, 0.8);
      }
      .game-mount-text {
        font-family: ${CONFIG.design.fontBody};
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: rgba(0, 0, 0, 0.7);
      }
      .game-mount-hint {
        display: none;
      }
      .game-mount.visible {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      .game-mount.ready .game-mount-inner {
        background: rgba(10, 207, 131, 0.15);
        border: 3px solid ${CONFIG.design.colorSuccess};
        box-shadow: 0 8px 32px rgba(10, 207, 131, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .game-mount.ready .game-mount-icon svg {
        fill: ${CONFIG.design.colorSuccess};
      }
      .game-mount.ready .game-mount-icon {
        background: rgba(10, 207, 131, 0.15);
      }
      .game-mount.ready .game-mount-text {
        color: ${CONFIG.design.colorSuccess};
        font-weight: 600;
      }
      @keyframes mount-pulse {
        0%, 100% { 
          transform: scale(1); 
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.5);
        }
        50% { 
          transform: scale(1.03); 
          box-shadow: 0 12px 40px rgba(242, 78, 30, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 0 25px rgba(255, 255, 255, 0.6);
        }
      }
      .game-mount.visible .game-mount-inner {
        animation: mount-pulse 2s ease-in-out infinite;
      }
      .game-mount.ready .game-mount-inner {
        animation: none;
      }
      
      /* Figma Hint - Small, compact tooltip near the sticker */
      .game-figma-hint {
        position: fixed;
        background: ${CONFIG.design.colorLight};
        color: ${CONFIG.design.colorDark};
        padding: 10px 14px;
        border-radius: 12px;
        font-family: ${CONFIG.design.fontBody};
        font-size: 11px;
        letter-spacing: 0.01em;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(8px);
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 8px 24px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08);
        max-width: 160px;
        text-align: center;
        border: 1px solid rgba(0,0,0,0.06);
      }
      .game-figma-hint.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .game-figma-hint::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        border: 8px solid transparent;
        border-top-color: ${CONFIG.design.colorLight};
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.05));
      }
      .game-figma-hint .hint-icon {
        display: block;
        margin-bottom: 4px;
        color: ${CONFIG.design.colorFigma};
      }
      .game-figma-hint .hint-icon svg {
        width: 16px;
        height: 16px;
      }
      .game-figma-hint .hint-text {
        font-family: ${CONFIG.design.fontTitle};
        font-style: italic;
        font-size: 11px;
        line-height: 1.3;
      }
      
      /* Clean Figma icon during game - removes any overlays but keeps image visible */
      .game-figma-clean {
        box-shadow: none !important;
        filter: none !important;
        backdrop-filter: none !important;
        background-color: transparent !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      /* Target only non-img descendants */
      .game-figma-clean > *:not(img),
      .game-figma-clean div,
      .game-figma-clean span {
        box-shadow: none !important;
        filter: none !important;
        backdrop-filter: none !important;
        background-color: transparent !important;
      }
      /* Ensure the image itself is fully visible */
      .game-figma-clean img {
        opacity: 1 !important;
        visibility: visible !important;
        filter: none !important;
        display: block !important;
      }
      .game-figma-clean::before,
      .game-figma-clean::after,
      .game-figma-clean *::before,
      .game-figma-clean *::after {
        display: none !important;
        content: none !important;
        opacity: 0 !important;
      }
      
      /* Game Container */
      #game-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9998;
        overflow: hidden;
      }
      
      /* Crosshair */
      .game-crosshair {
        position: fixed;
        width: 40px;
        height: 40px;
        pointer-events: none;
        z-index: 10002;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .game-crosshair.visible { opacity: 1; }
      .game-crosshair::before,
      .game-crosshair::after {
        content: '';
        position: absolute;
        background: ${CONFIG.design.colorAccent};
      }
      .game-crosshair::before {
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        transform: translateY(-50%);
      }
      .game-crosshair::after {
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        transform: translateX(-50%);
      }
      .game-crosshair .dot {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        background: ${CONFIG.design.colorAccent};
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
      
      /* Scoreboard */
      .game-scoreboard {
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: ${CONFIG.design.colorDark};
        color: ${CONFIG.design.colorLight};
        padding: 16px 32px;
        border-radius: 16px;
        font-family: ${CONFIG.design.fontBody};
        z-index: 10000;
        pointer-events: auto;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 24px;
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .game-scoreboard.visible {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .game-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .game-stat-label {
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        opacity: 0.6;
      }
      .game-stat-value {
        font-family: ${CONFIG.design.fontTitle};
        font-size: 24px;
        font-style: italic;
        color: ${CONFIG.design.colorLight};
      }
      .game-stat-value.time { color: ${CONFIG.design.colorSuccess}; min-width: 32px; text-align: center; }
      
      /* Sound Toggle - Custom icon */
      .game-sound-toggle {
        width: 36px;
        height: 36px;
        background: rgba(255,255,255,0.1);
        border: none;
        border-radius: 50%;
        color: ${CONFIG.design.colorLight};
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
      .game-sound-toggle svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }
      .game-sound-toggle:hover { background: rgba(255,255,255,0.2); }
      .game-sound-toggle.muted { opacity: 0.5; }
      
      /* Action Buttons in Scoreboard */
      .game-actions {
        display: flex;
        gap: 8px;
        margin-left: 16px;
        padding-left: 16px;
        border-left: 1px solid rgba(255,255,255,0.2);
      }
      .game-btn {
        padding: 8px 16px;
        border-radius: 100vw;
        font-family: ${CONFIG.design.fontBody};
        font-size: 11px;
        letter-spacing: 0.02em;
        border: 1px solid;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
      }
      .game-btn-end {
        background: transparent;
        color: ${CONFIG.design.colorLight};
        border-color: rgba(255,255,255,0.3);
      }
      .game-btn-end:hover { border-color: ${CONFIG.design.colorWarning}; color: ${CONFIG.design.colorWarning}; }
      
      /* Combo Display */
      .game-combo {
        position: fixed;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        font-family: ${CONFIG.design.fontTitle};
        font-size: 20px;
        font-style: italic;
        color: ${CONFIG.design.colorSuccess};
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: all 0.2s ease;
      }
      .game-combo.visible { opacity: 1; }
      .game-combo.big { font-size: 28px; color: ${CONFIG.design.colorWarning}; }
      
      /* Narrative Intro Screen */
      .game-narrative {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(18, 18, 18, 0.95);
        z-index: 10001;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      .game-narrative.visible { opacity: 1; }
      .game-narrative-line {
        font-family: ${CONFIG.design.fontTitle};
        font-size: clamp(20px, 4vw, 32px);
        font-style: italic;
        color: ${CONFIG.design.colorLight};
        text-align: center;
        max-width: 600px;
        padding: 0 24px;
        opacity: 0;
        transform: translateY(20px);
        line-height: 1.4;
      }
      .game-narrative-line.visible {
        animation: narrative-fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      @keyframes narrative-fade-in {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .game-narrative-cta {
        margin-top: 40px;
        font-family: ${CONFIG.design.fontBody};
        font-size: 14px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: ${CONFIG.design.colorSuccess};
        opacity: 0;
      }
      .game-narrative-cta.visible {
        animation: narrative-fade-in 0.6s 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      
      /* Mount Animation Overlay */
      .game-mount-animation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
      }
      .game-mount-base {
        position: fixed;
        width: 120px;
        height: 60px;
        background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
        border-radius: 8px 8px 0 0;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.1);
        transform: translate(-50%, 0);
        opacity: 0;
      }
      .game-mount-base::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
        border: 3px solid ${CONFIG.design.colorFigma};
        border-radius: 50%;
        opacity: 0.5;
      }
      
      /* Countdown */
      .game-countdown {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: ${CONFIG.design.fontTitle};
        font-size: 120px;
        font-style: italic;
        color: ${CONFIG.design.colorDark};
        z-index: 10001;
        pointer-events: none;
        text-shadow: none;
      }
      .game-countdown.pop {
        animation: countdown-pop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }
      @keyframes countdown-pop {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
      }
      
      /* Projectile - Clean flat design - appears behind logo */
      .game-projectile {
        position: fixed;
        width: ${CONFIG.gun.projectileSize}px;
        height: ${CONFIG.gun.projectileSize}px;
        pointer-events: none;
        z-index: 9997;
      }
      .game-projectile svg {
        width: 100%;
        height: 100%;
      }
      
      /* Muzzle Flash Effect */
      .game-muzzle-flash {
        position: fixed;
        width: 40px;
        height: 40px;
        pointer-events: none;
        z-index: 9996;
        animation: muzzle-flash 0.15s ease-out forwards;
      }
      .game-muzzle-flash::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 30px;
        height: 30px;
        background: ${CONFIG.design.colorFigma};
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.8;
      }
      @keyframes muzzle-flash {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
      
      /* Projectile Trail - behind logo */
      .game-projectile-trail {
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${CONFIG.design.colorFigma};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9995;
        opacity: 0.6;
        animation: trail-fade 0.3s ease-out forwards;
      }
      @keyframes trail-fade {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(0.3); opacity: 0; }
      }
      
      /* Enemy - Image-based monsters */
      .game-enemy {
        position: fixed;
        width: ${CONFIG.enemies.size}px;
        height: ${CONFIG.enemies.size}px;
        pointer-events: none;
        z-index: 9998;
      }
      .game-enemy img { 
        width: 100%; 
        height: 100%;
        object-fit: contain;
      }
      
      /* Explosion - Clean burst effect */
      .game-explosion {
        position: fixed;
        width: 80px;
        height: 80px;
        pointer-events: none;
        z-index: 10000;
        border-radius: 50%;
        animation: explosion 0.4s ease-out forwards;
      }
      .game-explosion::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 3px solid currentColor;
      }
      @keyframes explosion {
        0% { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
      }
      
      /* Score Popup */
      .game-score-popup {
        position: fixed;
        font-family: ${CONFIG.design.fontBody};
        font-size: 16px;
        font-weight: bold;
        color: ${CONFIG.design.colorSuccess};
        pointer-events: none;
        z-index: 10001;
        animation: score-float 0.8s ease-out forwards;
      }
      @keyframes score-float {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-40px); }
      }
      
      /* Game Over - Redesigned with website colors */
      .game-over {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(18, 18, 18, 0.98);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10002;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
        padding: 24px;
        box-sizing: border-box;
        overflow-y: auto;
      }
      .game-over.visible { opacity: 1; pointer-events: auto; }
      .game-over h2 {
        font-family: ${CONFIG.design.fontTitle};
        font-size: clamp(36px, 6vw, 64px);
        font-style: italic;
        color: ${CONFIG.design.colorLight};
        margin: 0 0 32px;
        font-weight: 400;
      }
      .game-over-stats {
        display: flex;
        gap: 40px;
        margin-bottom: 32px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .game-over-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        min-width: 80px;
      }
      .game-over-stat-value {
        font-family: ${CONFIG.design.fontTitle};
        font-size: clamp(32px, 5vw, 48px);
        font-style: italic;
        color: ${CONFIG.design.colorLight};
      }
      .game-over-stat-value.highlight {
        color: ${CONFIG.design.colorSuccess};
      }
      .game-over-stat-label {
        font-family: ${CONFIG.design.fontBody};
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.5);
      }
      .game-over-accuracy {
        font-family: ${CONFIG.design.fontBody};
        font-size: 13px;
        color: rgba(255,255,255,0.4);
        margin-bottom: 24px;
      }
      
      /* Scoreboard Name Entry */
      .game-over-scoreboard {
        width: 100%;
        max-width: 400px;
        margin-bottom: 32px;
        padding: 20px 24px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
      }
      .scoreboard-title {
        font-family: ${CONFIG.design.fontBody};
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.6);
        margin-bottom: 16px;
        text-align: center;
      }
      .scoreboard-input-row {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
      }
      .scoreboard-input {
        flex: 1;
        padding: 12px 16px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        font-family: ${CONFIG.design.fontBody};
        font-size: 14px;
        color: ${CONFIG.design.colorLight};
        outline: none;
        transition: border-color 0.2s ease;
      }
      .scoreboard-input::placeholder {
        color: rgba(255,255,255,0.3);
      }
      .scoreboard-input:focus {
        border-color: rgba(255,255,255,0.3);
      }
      .scoreboard-submit {
        padding: 12px 20px;
        background: ${CONFIG.design.colorLight};
        color: ${CONFIG.design.colorDark};
        border: none;
        border-radius: 12px;
        font-family: ${CONFIG.design.fontBody};
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .scoreboard-submit:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(255,255,255,0.1);
      }
      .scoreboard-submit:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      /* Leaderboard */
      .leaderboard-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .leaderboard-item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        font-family: ${CONFIG.design.fontBody};
        font-size: 13px;
        color: rgba(255,255,255,0.8);
      }
      .leaderboard-item:last-child {
        border-bottom: none;
      }
      .leaderboard-rank {
        width: 28px;
        font-weight: 600;
        color: rgba(255,255,255,0.4);
      }
      .leaderboard-rank.top-3 {
        color: ${CONFIG.design.colorSuccess};
      }
      .leaderboard-name {
        flex: 1;
      }
      .leaderboard-score {
        font-family: ${CONFIG.design.fontTitle};
        font-style: italic;
        font-size: 15px;
        color: ${CONFIG.design.colorLight};
      }
      .leaderboard-you {
        background: rgba(10, 207, 131, 0.1);
        margin: 0 -12px;
        padding: 10px 12px;
        border-radius: 8px;
      }
      
      .game-over-actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .game-btn-primary {
        background: ${CONFIG.design.colorLight};
        color: ${CONFIG.design.colorDark};
        border: 2px solid ${CONFIG.design.colorLight};
        padding: 14px 28px;
        font-weight: 600;
      }
      .game-btn-primary:hover { 
        background: transparent; 
        color: ${CONFIG.design.colorLight}; 
      }
      .game-btn-secondary {
        background: transparent;
        color: ${CONFIG.design.colorLight};
        border: 2px solid rgba(255,255,255,0.2);
        padding: 14px 28px;
      }
      .game-btn-secondary:hover { 
        border-color: ${CONFIG.design.colorLight}; 
      }
      
      /* Mobile Responsive Styles */
      @media (max-width: 768px) {
        .game-scoreboard {
          top: 12px;
          padding: 12px 16px;
          gap: 12px;
          width: calc(100% - 24px);
          max-width: 400px;
        }
        .game-stat-value {
          font-size: 18px;
        }
        .game-stat-label {
          font-size: 9px;
        }
        .game-actions {
          margin-left: 8px;
          padding-left: 8px;
        }
        .game-btn {
          padding: 6px 12px;
          font-size: 10px;
        }
        .game-countdown {
          font-size: 80px;
        }
        .game-over h2 {
          font-size: clamp(28px, 8vw, 48px);
        }
        .game-over-stats {
          gap: 20px;
        }
        .game-over-stat-value {
          font-size: clamp(24px, 6vw, 36px);
        }
        .game-narrative-line {
          font-size: clamp(16px, 5vw, 24px);
          padding: 0 16px;
        }
        .game-crosshair {
          width: 50px;
          height: 50px;
        }
        .game-combo {
          top: 100px;
          font-size: 16px;
        }
        .game-combo.big {
          font-size: 22px;
        }
        .game-btn-primary,
        .game-btn-secondary {
          padding: 12px 20px;
          font-size: 12px;
        }
      }
      
      /* Touch-friendly adjustments */
      @media (hover: none) {
        .game-crosshair {
          width: 60px;
          height: 60px;
        }
        .game-crosshair .dot {
          width: 10px;
          height: 10px;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.id = 'sticker-game-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HINT SYSTEM - Shows hints near Figma sticker after chatbot minimizes
  // ═══════════════════════════════════════════════════════════════════════════

  function createHintElement() {
    if (hintElement) return;
    
    hintElement = document.createElement('div');
    hintElement.className = 'game-figma-hint';
    hintElement.innerHTML = `
      <span class="hint-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
      <span class="hint-text">Drag me to the right to become a Problem Squasher!</span>
    `;
    document.body.appendChild(hintElement);
  }

  function showFigmaHint() {
    if (!figmaIcon || GameState.hintShown || GameState.phase !== 'idle') return;
    
    // Only show if Figma icon is in the viewport
    const rect = figmaIcon.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) return;
    
    createHintElement();
    
    // Position hint ABOVE and slightly to the right of the Figma icon
    // Closer to the sticker - only 50px above
    hintElement.style.left = `${rect.left + rect.width / 2}px`;
    hintElement.style.top = `${rect.top - 55}px`;
    hintElement.style.transform = 'translateX(-50%)';
    
    // Show hint
    requestAnimationFrame(() => {
      hintElement.classList.add('visible');
    });
    
    // Hide after 6 seconds
    setTimeout(() => {
      hideHint();
    }, 6000);
    
    GameState.hintShown = true;
  }

  function hideHint() {
    if (hintElement) {
      hintElement.classList.remove('visible');
    }
  }

  // Listen for chatbot state changes to show hint
  function listenForChatbotMinimize() {
    // Poll for AppState changes (chatbot collapsed)
    let lastChatView = null;
    let hintTriggered = false;
    
    const checkState = () => {
      const currentView = window.AppState?.chatView;
      
      // When chatbot collapses (transitions from expanded to collapsed)
      if (lastChatView === 'expanded' && currentView === 'collapsed' && !hintTriggered) {
        hintTriggered = true;
        // Show hint after a short delay
        setTimeout(() => {
          if (GameState.phase === 'idle' && !GameState.hintShown) {
            showFigmaHint();
          }
        }, 2000);
      }
      
      lastChatView = currentView;
    };
    
    // Check every 500ms
    setInterval(checkState, 500);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // UI CREATION
  // ═══════════════════════════════════════════════════════════════════════════

  function createMountIndicator() {
    if (mountIndicator) return;
    mountIndicator = document.createElement('div');
    mountIndicator.className = 'game-mount';
    mountIndicator.innerHTML = `
      <div class="game-mount-inner">
        <div class="game-mount-icon">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <span class="game-mount-text">Drop here</span>
      </div>
    `;
    mountIndicator.style.left = `${window.innerWidth * CONFIG.mountPoint.xPercent}px`;
    mountIndicator.style.top = `${window.innerHeight * CONFIG.mountPoint.yPercent}px`;
    document.body.appendChild(mountIndicator);
  }

  function showMountIndicator() {
    if (!mountIndicator) createMountIndicator();
    mountIndicator.style.left = `${window.innerWidth * CONFIG.mountPoint.xPercent}px`;
    mountIndicator.style.top = `${window.innerHeight * CONFIG.mountPoint.yPercent}px`;
    mountIndicator.classList.add('visible');
    mountIndicator.classList.remove('ready');
    // Update text for default state
    const textEl = mountIndicator.querySelector('.game-mount-text');
    if (textEl) textEl.textContent = 'Drop here';
  }

  function hideMountIndicator() {
    if (mountIndicator) {
      mountIndicator.classList.remove('visible', 'ready');
    }
  }

  function updateMountIndicator(isNear) {
    if (mountIndicator) {
      mountIndicator.classList.toggle('ready', isNear);
      // Update text for ready state
      const textEl = mountIndicator.querySelector('.game-mount-text');
      if (isNear) {
        if (textEl) textEl.textContent = 'Release!';
      } else {
        if (textEl) textEl.textContent = 'Drop here';
      }
    }
  }

  function createGameUI() {
    gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    document.body.appendChild(gameContainer);
    
    scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'game-scoreboard';
    scoreDisplay.innerHTML = `
      <div class="game-stat">
        <span class="game-stat-label">Score</span>
        <span class="game-stat-value" id="game-score">0</span>
      </div>
      <div class="game-stat">
        <span class="game-stat-label">Time</span>
        <span class="game-stat-value time" id="game-time">30</span>
      </div>
      <div class="game-stat">
        <span class="game-stat-label">Squashed</span>
        <span class="game-stat-value" id="game-hits">0</span>
      </div>
      <button class="game-sound-toggle" id="sound-toggle" title="Toggle Sound">
        ${CONFIG.audio.enabled 
          ? '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
        }
      </button>
      <div class="game-actions">
        <button class="game-btn game-btn-end" id="end-game-btn">End</button>
      </div>
    `;
    document.body.appendChild(scoreDisplay);
    
    scoreDisplay.querySelector('#sound-toggle').addEventListener('click', () => {
      CONFIG.audio.enabled = !CONFIG.audio.enabled;
      const btn = scoreDisplay.querySelector('#sound-toggle');
      btn.innerHTML = CONFIG.audio.enabled 
        ? '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
      btn.classList.toggle('muted', !CONFIG.audio.enabled);
    });
    
    scoreDisplay.querySelector('#end-game-btn').addEventListener('click', () => {
      if (GameState.phase === 'playing') endGame();
    });
    
    comboDisplay = document.createElement('div');
    comboDisplay.className = 'game-combo';
    document.body.appendChild(comboDisplay);
    
    crosshair = document.createElement('div');
    crosshair.className = 'game-crosshair';
    crosshair.innerHTML = '<div class="dot"></div>';
    document.body.appendChild(crosshair);
  }

  function showGameUI() {
    requestAnimationFrame(() => {
      scoreDisplay?.classList.add('visible');
      crosshair?.classList.add('visible');
    });
  }

  function hideGameUI() {
    scoreDisplay?.classList.remove('visible');
    comboDisplay?.classList.remove('visible');
    crosshair?.classList.remove('visible');
  }

  function cleanupGameUI() {
    pools.projectiles.forEach(p => p.el.remove());
    pools.enemies.forEach(e => e.el.remove());
    pools.projectiles = [];
    pools.enemies = [];
    
    gameContainer?.remove();
    scoreDisplay?.remove();
    comboDisplay?.remove();
    crosshair?.remove();
    gameContainer = scoreDisplay = comboDisplay = crosshair = null;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DRAGGABLE EVENT LISTENERS
  // ═══════════════════════════════════════════════════════════════════════════

  function setupDragListeners() {
    if (!figmaIcon) {
      console.log('[ProblemSquasher] Figma icon not ready, retrying...');
      setTimeout(setupDragListeners, 500);
      return;
    }
    
    // Get the GSAP Draggable instance attached to the figma icon
    const figmaDraggable = window.Draggable?.get(figmaIcon);
    if (!figmaDraggable) {
      console.log('[ProblemSquasher] Draggable not ready on figmaIcon, retrying...');
      setTimeout(setupDragListeners, 500);
      return;
    }
    
    console.log('[ProblemSquasher] Setting up drag listeners using GSAP Draggable.addEventListener');
    console.log('[ProblemSquasher] Figma Draggable instance:', figmaDraggable);
    
    // Use GSAP Draggable's native addEventListener API (this is how v3.1 worked!)
    figmaDraggable.addEventListener('drag', function() {
      // First drag event triggers the mount indicator show
      if (GameState.phase === 'idle') {
        console.log('[ProblemSquasher] First drag detected, showing mount indicator');
        GameState.phase = 'dragging';
        showMountIndicator();
        hideHint();
        
        // Auto-minimize chatbot when user starts dragging Figma
        if (window.AppState?.chatView === 'expanded') {
          const chatFrame = document.getElementById('chatbot-frame');
          if (chatFrame?.contentWindow) {
            chatFrame.contentWindow.postMessage({ type: 'COLLAPSE' }, '*');
          }
        }
      }
      
      if (GameState.phase !== 'dragging') return;
      
      // Check proximity to mount point
      const rect = figmaIcon.getBoundingClientRect();
      const iconX = rect.left + rect.width / 2;
      const iconY = rect.top + rect.height / 2;
      const mountX = window.innerWidth * CONFIG.mountPoint.xPercent;
      const mountY = window.innerHeight * CONFIG.mountPoint.yPercent;
      const dist = Math.hypot(mountX - iconX, mountY - iconY);
      
      updateMountIndicator(dist < CONFIG.mountPoint.snapRadius);
    });
    
    figmaDraggable.addEventListener('dragend', function() {
      console.log('[ProblemSquasher] dragend received! GameState.phase:', GameState.phase);
      if (GameState.phase !== 'dragging') {
        console.log('[ProblemSquasher] Not in dragging phase, ignoring dragend');
        return;
      }
      
      // Check if dropped on mount point
      const rect = figmaIcon.getBoundingClientRect();
      const iconX = rect.left + rect.width / 2;
      const iconY = rect.top + rect.height / 2;
      const mountX = window.innerWidth * CONFIG.mountPoint.xPercent;
      const mountY = window.innerHeight * CONFIG.mountPoint.yPercent;
      const dist = Math.hypot(mountX - iconX, mountY - iconY);
      
      console.log('[ProblemSquasher] Distance to mount:', dist, 'Snap radius:', CONFIG.mountPoint.snapRadius);
      
      hideMountIndicator();
      
      if (dist < CONFIG.mountPoint.snapRadius) {
        // Store current transform for restoration later
        GameState.figmaOriginalTransform = {
          x: gsap.getProperty(figmaIcon, 'x'),
          y: gsap.getProperty(figmaIcon, 'y'),
          rotation: gsap.getProperty(figmaIcon, 'rotation'),
          scale: gsap.getProperty(figmaIcon, 'scale'),
        };
        console.log('[ProblemSquasher] Dropped on mount! Starting game...');
        startCountdown();
      } else {
        console.log('[ProblemSquasher] Not on mount, resetting to idle');
        GameState.phase = 'idle';
      }
    });
    
    console.log('[ProblemSquasher] GSAP Draggable event listeners attached');
    console.log('[ProblemSquasher] Ready! Drag the Figma icon to mount point to play.');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GAME PREPARATION - Hide overlays (chatbot stays in place)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Prepare for game - hide other UI elements but leave chatbot alone
   * The chatbot stays exactly where it is during the game
   */
  function dockChatbotForGame() {
    console.log('[ProblemSquasher] Preparing for game (chatbot stays in place)...');
    
    // Only hide the project dock if it exists (mini-chat navigation)
    const projectDock = document.getElementById('project-dock');
    const fullChatBackdrop = document.getElementById('full-chat-backdrop');
    
    // Hide the full chat backdrop if it exists
    if (fullChatBackdrop) {
      gsap.to(fullChatBackdrop, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          fullChatBackdrop.style.display = 'none';
        }
      });
    }
    
    // Hide project dock only
    if (projectDock) {
      gsap.to(projectDock, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          projectDock.style.visibility = 'hidden';
          projectDock.style.pointerEvents = 'none';
        }
      });
    }
    
    // DO NOT touch the chatbot iframe at all - it stays where it is
    console.log('[ProblemSquasher] Game prep complete (chatbot untouched)');
  }

  /**
   * Hide all stickers AND any overlay effects they might have
   * This ensures a clean game canvas without dark overlays
   */
  function hideAllStickersAndOverlays() {
    console.log('[ProblemSquasher] Hiding all stickers and overlays...');
    
    // Use StickerManager's method if available
    window.StickerManager?.hideAllStickersExceptFigma?.() || window.StickerManager?.hideAllStickers?.();
    window.StickerManager?.hideStickerButton?.();
    
    // CRITICAL: Also hide any stickers that might have been missed
    const allStickers = document.querySelectorAll('.icon-1-wrap, .icon-2-wrap, .icon-4-wrap, .cta-icon-3, .cta-icon-5');
    allStickers.forEach(sticker => {
      gsap.to(sticker, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          sticker.style.visibility = 'hidden';
          sticker.style.pointerEvents = 'none';
        }
      });
    });
    
    // Remove any dark overlays or backdrop effects
    const overlaySelectors = [
      '.sticker-overlay',
      '.dark-overlay',
      '.backdrop-overlay',
      '[data-overlay]',
      '.overlay-active'
    ];
    
    overlaySelectors.forEach(selector => {
      const overlays = document.querySelectorAll(selector);
      overlays.forEach(overlay => {
        if (overlay.classList.contains('icon-6-wrap')) return; // Don't touch Figma icon
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            overlay.style.display = 'none';
          }
        });
      });
    });
    
    // Also remove overlay classes from any elements that might have them
    const elementsWithOverlay = document.querySelectorAll('.has-overlay, .overlay-active');
    elementsWithOverlay.forEach(el => {
      if (!el.classList.contains('icon-6-wrap')) {
        el.classList.remove('has-overlay', 'overlay-active');
      }
    });
    
    console.log('[ProblemSquasher] Stickers and overlays hidden');
  }

  /**
   * Restore UI after game ends - chatbot was never touched, just restore dock
   */
  function restoreChatbot() {
    console.log('[ProblemSquasher] Restoring UI after game...');
    
    const projectDock = document.getElementById('project-dock');
    
    // Restore project dock only (chatbot was never hidden)
    if (projectDock) {
      projectDock.style.visibility = 'visible';
      projectDock.style.pointerEvents = 'auto';
      gsap.to(projectDock, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    console.log('[ProblemSquasher] UI restored (chatbot was untouched)');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GAME FLOW - Narrative → Mount Animation → Countdown → Game
  // ═══════════════════════════════════════════════════════════════════════════

  function showNarrative(callback) {
    const narrative = document.createElement('div');
    narrative.className = 'game-narrative';
    
    // Create narrative lines
    CONFIG.narrative.lines.forEach((line, i) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'game-narrative-line';
      lineEl.textContent = line;
      lineEl.style.animationDelay = `${i * 0.6}s`;
      narrative.appendChild(lineEl);
    });
    
    // Add CTA
    const cta = document.createElement('div');
    cta.className = 'game-narrative-cta';
    cta.textContent = 'Get Ready...';
    cta.style.animationDelay = `${CONFIG.narrative.lines.length * 0.6}s`;
    narrative.appendChild(cta);
    
    document.body.appendChild(narrative);
    
    // Show narrative
    requestAnimationFrame(() => {
      narrative.classList.add('visible');
      // Stagger the line animations
      narrative.querySelectorAll('.game-narrative-line').forEach((line, i) => {
        setTimeout(() => line.classList.add('visible'), i * 600);
      });
      // Show CTA
      setTimeout(() => cta.classList.add('visible'), CONFIG.narrative.lines.length * 600);
    });
    
    // After narrative duration, fade out and callback
    setTimeout(() => {
      gsap.to(narrative, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          narrative.remove();
          callback();
        }
      });
    }, CONFIG.narrative.duration);
  }

  function performMountAnimation(callback) {
    const mountX = window.innerWidth * CONFIG.mountPoint.xPercent;
    const mountY = window.innerHeight * CONFIG.mountPoint.yPercent;
    const iconRect = figmaIcon.getBoundingClientRect();
    const iconCenterX = iconRect.left + iconRect.width / 2;
    const iconCenterY = iconRect.top + iconRect.height / 2;
    
    // Streamlined mount animation - faster and more fluid
    // Note: figmaIcon is now position:fixed in document.body
    const tl = gsap.timeline({
      onComplete: callback
    });
    
    // 1. Quick lift with subtle shadow
    tl.to(figmaIcon, {
      scale: 1.08,
      boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
      duration: 0.2,
      ease: 'power2.out'
    });
    
    // 2. Smooth move to mount position (use direct left/top for fixed positioning)
    tl.to(figmaIcon, {
      left: mountX - iconRect.width / 2,
      top: mountY - iconRect.height / 2,
      duration: 0.5,
      ease: 'power2.inOut'
    });
    
    // 3. Quick snap into place
    tl.to(figmaIcon, {
      scale: 1.15,
      duration: 0.08,
      ease: 'power2.in'
    });
    
    tl.to(figmaIcon, {
      scale: 1.2,
      duration: 0.12,
      ease: 'back.out(2)'
    });
    
    // 4. Brief glow effect using drop-shadow instead of brightness
    tl.to(figmaIcon, {
      boxShadow: '0 0 30px rgba(242, 78, 30, 0.6), 0 16px 48px rgba(0,0,0,0.35)',
      duration: 0.08,
      yoyo: true,
      repeat: 1
    });
  }

  function startCountdown() {
    GameState.phase = 'countdown';
    AudioSystem.init();
    
    // STEP 1: Dock the chatbot to clear the game area
    dockChatbotForGame();
    
    // STEP 2: Hide ALL stickers (including any overlays they might have)
    hideAllStickersAndOverlays();
    
    // STEP 3: Hide specific non-game page elements for a clean canvas
    const elementsToHide = [
      '.marquee-text-master-3',       // Main marquee text
      '.headline-about-a',            // Headline container
      '.navigation',                  // Navigation bar
      '.nav-wrapper',                 // Alternative nav
      '.hero-content',                // Hero text content
      '.hero-cta',                    // Hero CTAs
      '.headline-hero',               // Hero headline
      '.button-main',                 // Main buttons
      '.sticker-button',              // Sticker button
    ];
    
    // Store hidden elements for restoration
    GameState.hiddenElements = [];
    
    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Skip the Figma icon wrapper
        if (el.classList.contains('icon-6-wrap')) return;
        
        GameState.hiddenElements.push({
          el: el,
          originalOpacity: el.style.opacity || '',
          originalVisibility: el.style.visibility || '',
          originalPointerEvents: el.style.pointerEvents || '',
          originalTransform: el.style.transform || ''
        });
        gsap.to(el, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            el.style.visibility = 'hidden';
            el.style.pointerEvents = 'none';
          }
        });
      });
    });
    
    // STEP 4: Dim the hero background for better game visibility
    const heroWrap = document.querySelector('.wrap-hero-4');
    if (heroWrap) {
      GameState.originalHeroFilter = heroWrap.style.filter || '';
      gsap.to(heroWrap, {
        filter: 'brightness(0.3)',
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
    
    // STEP 5: Move the Figma icon OUT of the hero wrapper to the body
    // CSS filters on parents affect all children - moving it out prevents dimming
    if (figmaIcon) {
      // Store the original parent for later restoration
      GameState.figmaOriginalParent = figmaIcon.parentElement;
      GameState.figmaNextSibling = figmaIcon.nextElementSibling;
      
      // Get the current position BEFORE moving
      const rect = figmaIcon.getBoundingClientRect();
      
      // Move to body (outside the brightness-filtered hero)
      document.body.appendChild(figmaIcon);
      
      // Apply fixed positioning to keep it in the same visual position
      gsap.set(figmaIcon, { 
        position: 'fixed',
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        opacity: 1, 
        visibility: 'visible',
        zIndex: 10001,
        boxShadow: 'none',
        background: 'transparent',
        filter: 'none',
        backdropFilter: 'none',
        transform: 'none'  // Clear any transforms that might hide it
      });
      
      // CRITICAL: Ensure the image inside is fully visible
      const imgEl = figmaIcon.querySelector('img');
      if (imgEl) {
        gsap.set(imgEl, {
          filter: 'none',
          opacity: 1,
          visibility: 'visible',
          display: 'block',
          width: '100%',
          height: '100%'
        });
      }
      
      // Remove any overlay classes
      figmaIcon.classList.add('game-figma-clean');
      figmaIcon.classList.remove('has-overlay', 'overlay-active', 'dimmed', 'hidden');
      
      console.log('[ProblemSquasher] Figma icon moved to body, rect:', rect);
    }
    
    // Step 1: Show narrative
    showNarrative(() => {
      // Step 2: Mount animation
      performMountAnimation(() => {
        // Step 3: Countdown
        runCountdown();
      });
    });
  }

  function runCountdown() {
    const countdown = document.createElement('div');
    countdown.className = 'game-countdown';
    document.body.appendChild(countdown);
    
    let count = 3;
    const tick = () => {
      countdown.textContent = count;
      countdown.classList.remove('pop');
      void countdown.offsetWidth;
      countdown.classList.add('pop');
      
      if (count > 0) {
        count--;
        setTimeout(tick, 600); // Faster countdown
      } else {
        countdown.textContent = 'SQUASH!';
        countdown.style.color = CONFIG.design.colorSuccess;
        countdown.style.fontSize = '64px';
        setTimeout(() => {
          countdown.remove();
          startGame();
        }, 400); // Faster transition
      }
    };
    tick();
  }

  function startGame() {
    GameState.phase = 'playing';
    GameState.score = 0;
    GameState.combo = 0;
    GameState.maxCombo = 0;
    GameState.enemiesDestroyed = 0;
    GameState.shotsFired = 0;
    GameState.shotsHit = 0;
    GameState.startTime = performance.now();
    GameState.lastFireTime = 0;
    GameState.lastSpawnTime = performance.now();
    
    createGameUI();
    showGameUI();
    
    // Icon should already be at mount position from performMountAnimation
    // Keep it clean without any overlays
    // Note: figmaIcon is now in document.body, so no filter needed
    gsap.set(figmaIcon, { 
      scale: 1.2,
      opacity: 1,
      zIndex: 10001,
      filter: 'none',
      boxShadow: 'none',
      background: 'transparent'
    });
    
    // Disable the Draggable during gameplay
    const draggableInstance = window.Draggable?.get(figmaIcon);
    if (draggableInstance) draggableInstance.disable();
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleShoot);
    document.addEventListener('touchstart', handleShoot);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    AudioSystem.gameStart();
    rafId = requestAnimationFrame(gameLoop);
    console.log('[ProblemSquasher] Game started!');
  }

  function handleMouseMove(e) {
    GameState.mousePos.x = e.clientX;
    GameState.mousePos.y = e.clientY;
    
    if (crosshair) {
      crosshair.style.left = `${e.clientX}px`;
      crosshair.style.top = `${e.clientY}px`;
    }
    
    const rect = figmaIcon.getBoundingClientRect();
    const gunX = rect.left + rect.width / 2;
    const gunY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - gunY, e.clientX - gunX) * (180 / Math.PI);
    gsap.set(figmaIcon, { rotation: angle - 90 });
  }

  function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    GameState.mousePos.x = touch.clientX;
    GameState.mousePos.y = touch.clientY;
    if (crosshair) {
      crosshair.style.left = `${touch.clientX}px`;
      crosshair.style.top = `${touch.clientY}px`;
    }
  }

  function handleShoot(e) {
    if (GameState.phase !== 'playing') return;
    
    const now = performance.now();
    if (now - GameState.lastFireTime < CONFIG.gun.fireRate) return;
    GameState.lastFireTime = now;
    GameState.shotsFired++;
    
    const rect = figmaIcon.getBoundingClientRect();
    const gunX = rect.left + rect.width / 2;
    const gunY = rect.top + rect.height / 2;
    
    const dx = GameState.mousePos.x - gunX;
    const dy = GameState.mousePos.y - gunY;
    const len = Math.hypot(dx, dy);
    
    // Create muzzle flash effect
    const muzzleFlash = document.createElement('div');
    muzzleFlash.className = 'game-muzzle-flash';
    muzzleFlash.style.left = `${gunX}px`;
    muzzleFlash.style.top = `${gunY}px`;
    gameContainer.appendChild(muzzleFlash);
    setTimeout(() => muzzleFlash.remove(), 150);
    
    // Use random Figma tool as projectile
    const tool = PROJECTILE_TOOLS[Math.floor(Math.random() * PROJECTILE_TOOLS.length)];
    
    const projectile = document.createElement('div');
    projectile.className = 'game-projectile';
    projectile.innerHTML = tool.svg;
    projectile.style.left = `${gunX}px`;
    projectile.style.top = `${gunY}px`;
    
    // Rotate projectile in direction of travel
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    projectile.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    
    gameContainer.appendChild(projectile);
    
    // Add recoil animation to Figma icon
    gsap.to(figmaIcon, {
      scale: 1.3,
      duration: 0.05,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });
    
    pools.projectiles.push({
      el: projectile,
      x: gunX,
      y: gunY,
      vx: (dx / len) * CONFIG.gun.projectileSpeed,
      vy: (dy / len) * CONFIG.gun.projectileSpeed,
      angle: angle,
      lastTrailTime: performance.now(),
    });
    
    AudioSystem.shoot();
  }
  
  // Create trail effect for projectiles
  function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'game-projectile-trail';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    gameContainer.appendChild(trail);
    setTimeout(() => trail.remove(), 300);
  }

  function spawnEnemy() {
    const enemyData = ENEMY_ASSETS[Math.floor(Math.random() * ENEMY_ASSETS.length)];
    const y = 100 + Math.random() * (window.innerHeight - 200);
    
    // Gradual speed increase throughout the game
    const elapsed = performance.now() - GameState.startTime;
    const progressRatio = elapsed / CONFIG.game.duration;  // 0 to 1
    const speedMultiplier = 1 + progressRatio * (CONFIG.enemies.speedRampUp - 1);  // Ramps from 1x to speedRampUp
    const baseWithVariation = CONFIG.enemies.baseSpeed + (Math.random() - 0.5) * CONFIG.enemies.speedVariation * 2;
    const speed = baseWithVariation * speedMultiplier;
    
    const enemy = document.createElement('div');
    enemy.className = 'game-enemy';
    
    // Use image element for custom monster assets
    enemy.innerHTML = `<img src="${enemyData.image}" alt="${enemyData.label}" draggable="false" />`;
    
    enemy.style.left = '-120px';
    enemy.style.top = `${y}px`;
    gameContainer.appendChild(enemy);
    
    pools.enemies.push({
      el: enemy,
      x: -120,
      y: y,
      vx: speed,
      waveOffset: Math.random() * Math.PI * 2,
      color: enemyData.color,
    });
  }

  function gameLoop() {
    if (GameState.phase !== 'playing') return;
    
    const now = performance.now();
    const elapsed = now - GameState.startTime;
    const delta = 1 / 60;
    
    if (elapsed >= CONFIG.game.duration) {
      endGame();
      return;
    }
    
    const remaining = Math.max(0, Math.ceil((CONFIG.game.duration - elapsed) / 1000));
    const timeEl = document.getElementById('game-time');
    if (timeEl) timeEl.textContent = remaining;
    
    if (elapsed > CONFIG.game.warmupTime && now - GameState.lastSpawnTime > CONFIG.enemies.spawnRate) {
      spawnEnemy();
      GameState.lastSpawnTime = now;
    }
    
    for (let i = pools.projectiles.length - 1; i >= 0; i--) {
      const p = pools.projectiles[i];
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.el.style.left = `${p.x - CONFIG.gun.projectileSize / 2}px`;
      p.el.style.top = `${p.y - CONFIG.gun.projectileSize / 2}px`;
      
      // Create trail effect every 30ms
      if (now - (p.lastTrailTime || 0) > 30) {
        createTrail(p.x, p.y);
        p.lastTrailTime = now;
      }
      
      if (p.x < -50 || p.x > window.innerWidth + 50 || p.y < -50 || p.y > window.innerHeight + 50) {
        p.el.remove();
        pools.projectiles.splice(i, 1);
        if (GameState.combo > 0) {
          GameState.combo = 0;
          comboDisplay?.classList.remove('visible');
        }
      }
    }
    
    for (let i = pools.enemies.length - 1; i >= 0; i--) {
      const e = pools.enemies[i];
      e.x += e.vx * delta;
      if (CONFIG.enemies.wavePattern) {
        e.y += Math.sin(now / 500 + e.waveOffset) * 1;
      }
      e.el.style.left = `${e.x}px`;
      e.el.style.top = `${e.y}px`;
      
      if (e.x > window.innerWidth + 80) {
        e.el.remove();
        pools.enemies.splice(i, 1);
        GameState.combo = 0;
        comboDisplay?.classList.remove('visible');
      }
    }
    
    for (let pi = pools.projectiles.length - 1; pi >= 0; pi--) {
      const p = pools.projectiles[pi];
      for (let ei = pools.enemies.length - 1; ei >= 0; ei--) {
        const e = pools.enemies[ei];
        const dist = Math.hypot(p.x - (e.x + CONFIG.enemies.size / 2), p.y - (e.y + CONFIG.enemies.size / 2));
        
        if (dist < CONFIG.enemies.size / 2 + CONFIG.gun.projectileSize / 2) {
          GameState.combo++;
          GameState.maxCombo = Math.max(GameState.maxCombo, GameState.combo);
          GameState.enemiesDestroyed++;
          GameState.shotsHit++;
          
          const comboBonus = Math.min(GameState.combo - 1, CONFIG.scoring.maxCombo) * CONFIG.scoring.comboMultiplier;
          const points = Math.round(CONFIG.scoring.basePoints * (1 + comboBonus));
          GameState.score += points;
          
          document.getElementById('game-score').textContent = GameState.score;
          document.getElementById('game-hits').textContent = GameState.enemiesDestroyed;
          
          if (GameState.combo > 1) {
            const comboTexts = ['NICE!', 'STREAK!', 'ON FIRE!', 'UNSTOPPABLE!', 'LEGENDARY!'];
            const textIndex = Math.min(GameState.combo - 2, comboTexts.length - 1);
            comboDisplay.textContent = `${GameState.combo}x ${comboTexts[textIndex]}`;
            comboDisplay.classList.toggle('big', GameState.combo >= 5);
            comboDisplay.classList.add('visible');
            AudioSystem.combo(GameState.combo);
          }
          
          const explosion = document.createElement('div');
          explosion.className = 'game-explosion';
          explosion.style.left = `${e.x + CONFIG.enemies.size / 2}px`;
          explosion.style.top = `${e.y + CONFIG.enemies.size / 2}px`;
          explosion.style.background = `radial-gradient(circle, ${e.color} 0%, rgba(255,255,255,0.5) 40%, transparent 70%)`;
          gameContainer.appendChild(explosion);
          setTimeout(() => explosion.remove(), 400);
          
          const popup = document.createElement('div');
          popup.className = 'game-score-popup';
          popup.textContent = `+${points}`;
          popup.style.left = `${e.x + CONFIG.enemies.size / 2}px`;
          popup.style.top = `${e.y}px`;
          gameContainer.appendChild(popup);
          setTimeout(() => popup.remove(), 800);
          
          AudioSystem.hit();
          
          p.el.remove();
          e.el.remove();
          pools.projectiles.splice(pi, 1);
          pools.enemies.splice(ei, 1);
          break;
        }
      }
    }
    
    rafId = requestAnimationFrame(gameLoop);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SCOREBOARD SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  // GAME END & CLEANUP
  // ═══════════════════════════════════════════════════════════════════════════

  function endGame() {
    GameState.phase = 'ended';
    cancelAnimationFrame(rafId);
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleShoot);
    document.removeEventListener('touchstart', handleShoot);
    document.removeEventListener('touchmove', handleTouchMove);
    
    AudioSystem.gameEnd();
    hideGameUI();
    
    const accuracy = GameState.shotsFired > 0 ? Math.round((GameState.shotsHit / GameState.shotsFired) * 100) : 0;
    
    // Generate a fun title based on performance
    let title = 'Mission Complete';
    let subtitle = '';
    if (GameState.score >= 500) {
      title = 'Problem Squashing Legend!';
      subtitle = 'You\'d make any team unstoppable.';
    } else if (GameState.score >= 300) {
      title = 'Figma Wizard!';
      subtitle = 'Problems don\'t stand a chance.';
    } else if (GameState.score >= 150) {
      title = 'Solid Performance!';
      subtitle = 'Ready to tackle real challenges.';
    } else {
      title = 'Good Effort!';
      subtitle = 'Every expert was once a beginner.';
    }
    
    const gameOver = document.createElement('div');
    gameOver.className = 'game-over';
    gameOver.innerHTML = `
      <h2>${title}</h2>
      ${subtitle ? `<p style="font-family: ${CONFIG.design.fontTitle}; font-style: italic; color: rgba(255,255,255,0.6); margin-bottom: 24px; font-size: 18px;">${subtitle}</p>` : ''}
      <div class="game-over-stats">
        <div class="game-over-stat">
          <span class="game-over-stat-value highlight">${GameState.score}</span>
          <span class="game-over-stat-label">Problems Squashed</span>
        </div>
        <div class="game-over-stat">
          <span class="game-over-stat-value">${GameState.enemiesDestroyed}</span>
          <span class="game-over-stat-label">Direct Hits</span>
        </div>
        <div class="game-over-stat">
          <span class="game-over-stat-value">${GameState.maxCombo}x</span>
          <span class="game-over-stat-label">Max Streak</span>
        </div>
      </div>
      <p class="game-over-accuracy">Accuracy: ${accuracy}%</p>
      
      <div class="game-over-actions">
        <button class="game-btn game-btn-primary" id="play-again-btn">Squash More Problems</button>
        <button class="game-btn game-btn-secondary" id="close-btn">Back to Portfolio</button>
      </div>
    `;
    document.body.appendChild(gameOver);
    requestAnimationFrame(() => gameOver.classList.add('visible'));
    
    gameOver.querySelector('#play-again-btn').addEventListener('click', () => {
      gameOver.remove();
      cleanupGameUI();
      startCountdown();
    });
    
    gameOver.querySelector('#close-btn').addEventListener('click', () => {
      gameOver.remove();
      cleanupGameUI();
      resetFigmaIcon();
      restorePage();
    });
  }

  function resetFigmaIcon() {
    if (!figmaIcon) return;
    
    // CRITICAL: Move the Figma icon back to its original parent in the DOM
    if (GameState.figmaOriginalParent) {
      // Remove fixed positioning before moving back
      figmaIcon.style.removeProperty('position');
      figmaIcon.style.removeProperty('left');
      figmaIcon.style.removeProperty('top');
      
      // Insert back into original position
      if (GameState.figmaNextSibling) {
        GameState.figmaOriginalParent.insertBefore(figmaIcon, GameState.figmaNextSibling);
      } else {
        GameState.figmaOriginalParent.appendChild(figmaIcon);
      }
      
      GameState.figmaOriginalParent = null;
      GameState.figmaNextSibling = null;
    }
    
    if (GameState.figmaOriginalTransform) {
      console.log('[ProblemSquasher] Restoring icon to:', GameState.figmaOriginalTransform);
      gsap.to(figmaIcon, {
        x: GameState.figmaOriginalTransform.x,
        y: GameState.figmaOriginalTransform.y,
        rotation: GameState.figmaOriginalTransform.rotation || 0,
        scale: GameState.figmaOriginalTransform.scale || 1,
        filter: 'none',
        zIndex: '',
        opacity: 1,
        clearProps: 'boxShadow,border,background,filter,position,left,top',
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(figmaIcon, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        filter: 'none',
        zIndex: '',
        opacity: 1,
        clearProps: 'boxShadow,border,background,filter,position,left,top',
        duration: 0.5,
        ease: 'power2.out'
      });
    }
    
    // Also clear any inline styles that might cause visual artifacts
    figmaIcon.style.removeProperty('z-index');
    figmaIcon.style.removeProperty('box-shadow');
    figmaIcon.style.removeProperty('border');
    figmaIcon.style.removeProperty('background');
    figmaIcon.style.removeProperty('filter');
    figmaIcon.classList.remove('game-figma-clean');
  }

  function restorePage() {
    GameState.phase = 'idle';
    GameState.figmaOriginalTransform = null;
    
    // Re-enable Figma draggable
    const draggableInstance = window.Draggable?.get(figmaIcon);
    if (draggableInstance) {
      draggableInstance.enable();
    }
    
    // Restore all stickers visibility
    window.StickerManager?.showAllStickers();
    
    // IMPORTANT: Restore the chatbot after game ends
    restoreChatbot();
    
    // Restore sticker button if chatbot is collapsed
    if (window.AppState?.chatView === 'collapsed' && window.StickerManager?.collapsedRect) {
      window.StickerManager?.showButton(window.StickerManager?.collapsedRect);
    }
    
    // Restore all hidden elements
    if (GameState.hiddenElements && GameState.hiddenElements.length > 0) {
      GameState.hiddenElements.forEach(item => {
        item.el.style.visibility = item.originalVisibility || 'visible';
        item.el.style.pointerEvents = item.originalPointerEvents || 'auto';
        gsap.to(item.el, {
          opacity: item.originalOpacity || 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
      GameState.hiddenElements = [];
    }
    
    // Restore hero background brightness
    const heroWrap = document.querySelector('.wrap-hero-4');
    if (heroWrap) {
      gsap.to(heroWrap, {
        filter: GameState.originalHeroFilter || 'brightness(1)',
        duration: 0.5,
        ease: 'power2.out'
      });
    }
    
    // Re-initialize drag listeners in case they got disconnected
    setTimeout(() => {
      const draggable = window.Draggable?.get(figmaIcon);
      if (!draggable || !draggable.enabled()) {
        setupDragListeners();
      }
    }, 500);
    
    console.log('[ProblemSquasher] Page restored, stickers re-enabled');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════

  function init() {
    console.log('[ProblemSquasher] v4.0 initializing...');
    
    // Try multiple selectors for the Figma icon
    figmaIcon = document.querySelector('.icon-6-wrap') || 
                document.querySelector('[data-sticker-id="figma-icon"]') ||
                document.querySelector('.figma-sticker');
    
    if (!figmaIcon) {
      console.log('[ProblemSquasher] Figma icon not found, retrying in 1s...');
      if (window._problemSquasherRetries === undefined) {
        window._problemSquasherRetries = 0;
      }
      window._problemSquasherRetries++;
      
      // Only retry up to 10 times
      if (window._problemSquasherRetries < 10) {
        setTimeout(init, 1000);
      } else {
        console.warn('[ProblemSquasher] Could not find Figma icon after 10 retries');
      }
      return;
    }
    
    // Wait for Draggable to be initialized on the figmaIcon
    // StickerManager sets up the draggable with custom events
    const checkDraggable = () => {
      const draggableInstance = window.Draggable?.get(figmaIcon);
      if (!draggableInstance) {
        console.log('[ProblemSquasher] Waiting for Draggable on figmaIcon...');
        setTimeout(checkDraggable, 500);
        return;
      }
      console.log('[ProblemSquasher] Draggable found on figmaIcon, continuing init');
      finishInit();
    };
    
    checkDraggable();
  }
  
  function finishInit() {
    console.log('[ProblemSquasher] Found Figma icon:', figmaIcon);
    
    injectStyles();
    createMountIndicator();
    setupDragListeners();
    listenForChatbotMinimize();
    
    console.log('[ProblemSquasher] v4.0 ready! Drag Figma sticker to mount point to play.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 2000), { once: true });
  } else {
    setTimeout(init, 2000);
  }

  // Export as both names for compatibility
  window.StickerGame = window.ProblemSquasher = { 
    state: GameState, 
    config: CONFIG, 
    reset: restorePage, 
    showHint: showFigmaHint,
    isPlaying: () => GameState.phase === 'playing' || GameState.phase === 'countdown'
  };

})();

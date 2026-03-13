# prasshanna-portfolio-v2 — Project State

## Overview
Standalone Next.js 14 port of prasshanna.com, migrated from Webflow hosting.

## Live URLs
- **Vercel**: https://prasshanna-portfolio-v2.vercel.app
- **GitHub**: https://github.com/Prasshanna-S/prasshanna-portfolio-v2

## Architecture
- **Framework**: Next.js 14 App Router with static export
- **Approach**: HTML-First with Surgical Next.js Wrapping — Webflow's compiled CSS is preserved verbatim, HTML body content is converted to JSX via automated script
- **Converter**: `scripts/convert-webflow.js` — automated HTML→JSX converter handling 30+ transformation rules

## Pages (6 routes)
| Route | Source | Component |
|-------|--------|-----------|
| `/` | index.html | HomePage |
| `/explorations` | explorations.html | ExplorationsPage |
| `/work/samsung-research` | work/samsung-research.html | SamsungResearchPage |
| `/work/us-hab-cti` | work/us-hab-cti.html | USHabCTIPage |
| `/work/uyir` | work/uyir.html | UyirPage |
| `/work/xr-museum` | work/xr-museum.html | XRMuseumPage |

## Key Files
- `app/layout.tsx` — Root layout with Webflow CSS, fonts, head scripts, chatbot iframe
- `components/WebflowScripts.tsx` — Client component loading all JS (jQuery, GSAP plugins, Lenis, SplitType, webflow.js, portfolio-animations.js, chatbot.js, sticker-game.js)
- `scripts/convert-webflow.js` — Source HTML → JSX converter
- `public/webflow-css/` — 3 CSS files (normalize, webflow, custom)
- `public/webflow/` — 3 custom JS files (portfolio-animations, chatbot, sticker-game)
- `public/js/webflow.js` — Webflow IX2 runtime
- `public/images/` — 375+ image assets
- `public/videos/` — 32 video assets
- `public/fonts/` — 4 custom font files

## External Dependencies (CDN)
- GSAP 3.14.2 with 20 plugins (Club license via cdn.prod.website-files.com)
- Lenis smooth scroll (unpkg)
- SplitType (unpkg)
- Flowbase boosters (cdn.prod.website-files.com)
- jQuery 3.5.1 (ajax.googleapis.com)
- Google Fonts: Inconsolata, Merriweather, Montserrat, Instrument Serif

## Known Issues
1. **Chatbot iframe CSP**: The portfolio-navigator iframe only allows framing from `prasshanna.com` — blocked on Vercel's `.vercel.app` domain. Will work once custom domain is configured.
2. **Hydration warnings**: Minor React hydration mismatches from HTML→JSX conversion (suppressed via `@ts-nocheck`).
3. **Webflow IX2 warnings**: "Interaction with ID already exists" — harmless duplicate IX2 interaction registration.

## To Re-convert Pages
If Webflow source HTML is updated:
1. Extract new Webflow export to `/tmp/webflow-source/`
2. Run `node scripts/convert-webflow.js`
3. Build: `npx next build`

## Custom Domain Setup
To point `prasshanna.com` to this deployment:
1. In Vercel dashboard → Settings → Domains → Add `prasshanna.com`
2. Update DNS records as instructed by Vercel
3. Update chatbot iframe CSP in portfolio-navigator to allow the new domain

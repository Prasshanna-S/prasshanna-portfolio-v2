# Editing Guide

## How Pages Are Generated
Pages are NOT hand-written. They're auto-generated from Webflow HTML source files using `scripts/convert-webflow.js`.

**Do not manually edit `app/page.tsx` or `app/work/*/page.tsx`** — your changes will be overwritten the next time the converter runs.

## Making Content Changes

### Option A: Edit the Converter (for structural changes)
If you need to change how HTML is transformed (e.g., new attribute mappings, different link rewrites):
1. Edit `scripts/convert-webflow.js`
2. Re-run: `node scripts/convert-webflow.js`
3. Test: `npx next build && npx next dev`

### Option B: Edit in Webflow, Re-export (for content changes)
1. Make changes in Webflow Designer
2. Export the site (Site Settings → Export Code)
3. Extract to `/tmp/webflow-source/` using: `ditto -x -k export.zip /tmp/webflow-source/`
4. Run: `node scripts/convert-webflow.js`
5. Check for new image/video files and copy to `public/`

### Option C: Direct Page Edits (for quick fixes)
If you need a quick fix that won't survive re-conversion:
1. Edit the page file directly (e.g., `app/page.tsx`)
2. Know that running the converter again will overwrite your changes

## Editing Layout & Scripts
These files ARE safe to edit directly:
- `app/layout.tsx` — Root layout, head tags, CSS links
- `app/globals.css` — Custom font-face declarations
- `components/WebflowScripts.tsx` — Script loading order and configuration

## Editing Styles
- **Webflow CSS** (`public/webflow-css/`): Don't edit — these are Webflow's compiled output
- **Custom overrides**: Add to `app/globals.css` or create a new CSS file and import it in `layout.tsx`

## Adding a New Page
1. Add the HTML source to `/tmp/webflow-source/`
2. Add a new `convertPage()` call in `scripts/convert-webflow.js`
3. Add link rewrites for the new page in the `htmlToJsx()` function
4. Run the converter and build

## Deploying
The project auto-deploys from GitHub via Vercel integration:
- Push to `main` → automatic production deployment
- Or manual: `vercel deploy --prod`

#!/usr/bin/env node
/**
 * Webflow HTML → Next.js JSX Converter
 * Extracts body content from Webflow HTML and converts to valid JSX
 */

const fs = require('fs');
const path = require('path');

function extractBody(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) throw new Error('No <body> found');

  // Get body class
  const bodyClassMatch = html.match(/<body[^>]*class="([^"]*)"[^>]*>/i);
  const bodyClass = bodyClassMatch ? bodyClassMatch[1] : '';

  let body = bodyMatch[1];

  // Remove script tags at the end of body
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');

  return { body, bodyClass };
}

function extractIX2Styles(html) {
  // Extract the IX2 visibility style blocks from head
  const styles = [];
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (!headMatch) return '';

  const head = headMatch[1];
  // Get the w-mod-js IX2 styles
  const styleRegex = /<style>([\s\S]*?)<\/style>/g;
  let match;
  while ((match = styleRegex.exec(head)) !== null) {
    const content = match[1];
    if (content.includes('w-mod-js') || content.includes('w-mod-ix')) {
      styles.push(content);
    }
  }
  return styles.join('\n');
}

function cssPropertyToJS(prop) {
  const clean = prop.trim();
  if (clean.startsWith('-webkit-')) {
    const rest = clean.substring(8); // remove -webkit-
    return 'Webkit' + rest.charAt(0).toUpperCase() + rest.substring(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  }
  if (clean.startsWith('-moz-')) {
    const rest = clean.substring(5);
    return 'Moz' + rest.charAt(0).toUpperCase() + rest.substring(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  }
  if (clean.startsWith('-ms-')) {
    const rest = clean.substring(4);
    return 'ms' + rest.charAt(0).toUpperCase() + rest.substring(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  }
  return clean.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function convertInlineStyle(styleStr) {
  // Decode HTML entities first (e.g. &quot; in url() values)
  styleStr = decodeHtmlEntities(styleStr);
  // Parse CSS style string into React style object
  // Split on semicolons but respect url() and parentheses
  const parts = [];
  let current = '';
  let parenDepth = 0;
  for (let i = 0; i < styleStr.length; i++) {
    const ch = styleStr[i];
    if (ch === '(') parenDepth++;
    else if (ch === ')') parenDepth--;
    else if (ch === ';' && parenDepth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());

  const props = [];
  for (const part of parts) {
    const colonIdx = part.indexOf(':');
    if (colonIdx === -1) continue;
    const prop = part.substring(0, colonIdx).trim();
    let val = part.substring(colonIdx + 1).trim();

    const jsProp = cssPropertyToJS(prop);

    // Remove inner quotes from url() values: url("path") → url(path)
    val = val.replace(/url\(\s*["']([^"']*?)["']\s*\)/g, 'url($1)');
    // Quote the value - escape single quotes
    val = val.replace(/'/g, "\\'");
    // If value is purely numeric (without units), keep as number
    if (/^-?\d+(\.\d+)?$/.test(val)) {
      props.push(`${jsProp}: ${val}`);
    } else {
      props.push(`${jsProp}: '${val}'`);
    }
  }
  return `{ ${props.join(', ')} }`;
}

function htmlToJsx(html, isSubpage = false) {
  let jsx = html;

  // Convert inline <style>...</style> blocks inside body to dangerouslySetInnerHTML
  jsx = jsx.replace(/<style>([\s\S]*?)<\/style>/g, (match, content) => {
    // Escape backticks and dollar signs in CSS content for template literals
    const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `<style dangerouslySetInnerHTML={{ __html: \`${escaped}\` }} />`;
  });

  // Remove the chatbot iframe w-embed from body (it's in the layout already)
  jsx = jsx.replace(/<div className="chatbot-shell">[\s\S]*?<\/div>\s*<\/div>/i, '');
  // Also handle class= version before conversion
  jsx = jsx.replace(/<div class="chatbot-shell">[\s\S]*?<\/div>\s*<\/div>/i, '');

  // Convert inline style attributes to React style objects
  jsx = jsx.replace(/\bstyle="([^"]*?)"/gs, (match, styleContent) => {
    const singleLine = styleContent.replace(/\s+/g, ' ').trim();
    if (!singleLine) return '';
    try {
      const styleObj = convertInlineStyle(singleLine);
      return `style={${styleObj}}`;
    } catch (e) {
      // Fallback: keep as string with ts-ignore
      return `style="${singleLine}"`;
    }
  });

  // Convert class= to className= (but not inside strings or data attributes)
  jsx = jsx.replace(/\bclass="/g, 'className="');

  // Convert for= to htmlFor=
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');

  // Fix image paths: src="images/ → src="/images/
  jsx = jsx.replace(/src="images\//g, 'src="/images/');
  // Fix srcset: replace all bare "images/" with "/images/" inside srcset attributes
  jsx = jsx.replace(/srcset="([^"]*)"/g, (match, val) => {
    const fixed = val.replace(/(?<!\/)images\//g, '/images/');
    return `srcset="${fixed}"`;
  });

  // Fix video paths: src="videos/ → src="/videos/
  jsx = jsx.replace(/src="videos\//g, 'src="/videos/');

  // Fix background-image url paths in inline styles
  jsx = jsx.replace(/url\(&quot;videos\//g, 'url(&quot;/videos/');

  // For subpages: fix ../images/ and ../videos/ paths
  if (isSubpage) {
    jsx = jsx.replace(/src="\.\.\/images\//g, 'src="/images/');
    jsx = jsx.replace(/src="\.\.\/videos\//g, 'src="/videos/');
    // Fix srcset for subpages: ../images/ → /images/
    jsx = jsx.replace(/srcset="([^"]*)"/g, (match, val) => {
      const fixed = val.replace(/\.\.\/images\//g, '/images/');
      return `srcset="${fixed}"`;
    });
  }

  // Fix internal links
  jsx = jsx.replace(/href="index\.html"/g, 'href="/"');
  jsx = jsx.replace(/href="explorations\.html"/g, 'href="/explorations"');
  jsx = jsx.replace(/href="work\/samsung-research\.html"/g, 'href="/work/samsung-research"');
  jsx = jsx.replace(/href="work\/us-hab-cti\.html"/g, 'href="/work/us-hab-cti"');
  jsx = jsx.replace(/href="work\/uyir\.html"/g, 'href="/work/uyir"');
  jsx = jsx.replace(/href="work\/xr-museum\.html"/g, 'href="/work/xr-museum"');
  // For subpages with ../ prefix
  jsx = jsx.replace(/href="\.\.\/index\.html"/g, 'href="/"');
  jsx = jsx.replace(/href="\.\.\/explorations\.html"/g, 'href="/explorations"');
  jsx = jsx.replace(/href="\.\.\/work\/samsung-research\.html"/g, 'href="/work/samsung-research"');
  jsx = jsx.replace(/href="\.\.\/work\/us-hab-cti\.html"/g, 'href="/work/us-hab-cti"');
  jsx = jsx.replace(/href="\.\.\/work\/uyir\.html"/g, 'href="/work/uyir"');
  jsx = jsx.replace(/href="\.\.\/work\/xr-museum\.html"/g, 'href="/work/xr-museum"');

  // Self-closing void elements that JSX requires
  // img tags - make self-closing if not already
  jsx = jsx.replace(/<img([^>]*[^\/])>/g, '<img$1 />');

  // br tags
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<br\/>/g, '<br />');
  jsx = jsx.replace(/<br \/>/g, '<br />');

  // hr tags
  jsx = jsx.replace(/<hr>/g, '<hr />');
  jsx = jsx.replace(/<hr([^>]*[^\/])>/g, '<hr$1 />');

  // input tags
  jsx = jsx.replace(/<input([^>]*[^\/])>/g, '<input$1 />');

  // source tags - self-close
  jsx = jsx.replace(/<source([^>]*[^\/])>/g, '<source$1 />');

  // link tags inside body
  jsx = jsx.replace(/<link([^>]*[^\/])>/g, '<link$1 />');

  // meta tags inside body
  jsx = jsx.replace(/<meta([^>]*[^\/])>/g, '<meta$1 />');

  // Convert HTML comments to JSX comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // Handle aria-current="page" (valid JSX)
  // Handle data-* attributes (valid in JSX)
  // Handle tabindex → tabIndex
  jsx = jsx.replace(/\btabindex="/g, 'tabIndex="');

  // Handle autocomplete → autoComplete
  jsx = jsx.replace(/\bautocomplete="/g, 'autoComplete="');

  // Handle maxlength → maxLength
  jsx = jsx.replace(/\bmaxlength="/g, 'maxLength="');

  // Handle crossorigin → crossOrigin
  jsx = jsx.replace(/\bcrossorigin="/g, 'crossOrigin="');

  // Handle autoplay, muted, loop, playsinline attributes (boolean in JSX)
  // These are fine as-is for HTML elements in JSX when they have no value
  // But when they appear as standalone: autoplay="" → autoPlay
  jsx = jsx.replace(/\bautoplay=""/g, 'autoPlay={true}');
  jsx = jsx.replace(/\bautoplay\b(?!=)/g, 'autoPlay');
  jsx = jsx.replace(/\bplaysinline\b/g, 'playsInline');

  // Handle colspan → colSpan, rowspan → rowSpan
  jsx = jsx.replace(/\bcolspan="/g, 'colSpan="');
  jsx = jsx.replace(/\browspan="/g, 'rowSpan="');

  // Handle frameborder → frameBorder (for iframes)
  jsx = jsx.replace(/\bframeborder="/g, 'frameBorder="');

  // Handle allowfullscreen → allowFullScreen
  jsx = jsx.replace(/\ballowfullscreen\b/g, 'allowFullScreen');

  // HTML attributes that need camelCase in React
  jsx = jsx.replace(/\bsrcset="/g, 'srcSet="');
  jsx = jsx.replace(/\bdatetime="/g, 'dateTime="');
  jsx = jsx.replace(/\benctype="/g, 'encType="');
  jsx = jsx.replace(/\bformaction="/g, 'formAction="');
  jsx = jsx.replace(/\bhttpequiv="/g, 'httpEquiv="');
  jsx = jsx.replace(/\bnovalidate\b/g, 'noValidate');
  jsx = jsx.replace(/\breadonly\b/g, 'readOnly');
  jsx = jsx.replace(/\bcellpadding="/g, 'cellPadding="');
  jsx = jsx.replace(/\bcellspacing="/g, 'cellSpacing="');
  jsx = jsx.replace(/\bcharset="/g, 'charSet="');

  // SVG namespace fixes - JSX doesn't support XML namespaces
  jsx = jsx.replace(/\bxmlns:xlink="[^"]*"/g, '');
  jsx = jsx.replace(/\bxlink:href="/g, 'xlinkHref="');
  jsx = jsx.replace(/\bxml:space="/g, 'xmlSpace="');

  // SVG attribute case fixes
  jsx = jsx.replace(/\bviewbox="/gi, 'viewBox="');
  jsx = jsx.replace(/\bpatterncontentunits="/gi, 'patternContentUnits="');
  jsx = jsx.replace(/\bpreserveaspectratio="/gi, 'preserveAspectRatio="');
  jsx = jsx.replace(/\bfill-rule="/g, 'fillRule="');
  jsx = jsx.replace(/\bclip-rule="/g, 'clipRule="');
  jsx = jsx.replace(/\bstroke-width="/g, 'strokeWidth="');
  jsx = jsx.replace(/\bstroke-linecap="/g, 'strokeLinecap="');
  jsx = jsx.replace(/\bstroke-linejoin="/g, 'strokeLinejoin="');
  jsx = jsx.replace(/\bstroke-dasharray="/g, 'strokeDasharray="');
  jsx = jsx.replace(/\bstroke-dashoffset="/g, 'strokeDashoffset="');
  jsx = jsx.replace(/\bstroke-miterlimit="/g, 'strokeMiterlimit="');
  jsx = jsx.replace(/\bstroke-opacity="/g, 'strokeOpacity="');
  jsx = jsx.replace(/\bfill-opacity="/g, 'fillOpacity="');
  jsx = jsx.replace(/\bstop-color="/g, 'stopColor="');
  jsx = jsx.replace(/\bstop-opacity="/g, 'stopOpacity="');
  jsx = jsx.replace(/\bclip-path="/g, 'clipPath="');
  jsx = jsx.replace(/\bfont-size="/g, 'fontSize="');
  jsx = jsx.replace(/\bfont-family="/g, 'fontFamily="');
  jsx = jsx.replace(/\btext-anchor="/g, 'textAnchor="');
  jsx = jsx.replace(/\bdominant-baseline="/g, 'dominantBaseline="');

  // Convert HTML entities that JSX handles differently
  // &#x27; is fine in JSX, but { and } in text need escaping
  // Actually in JSX, curly braces in text content are interpreted as expressions
  // We need to escape them ONLY in text content, not in attribute values

  return jsx;
}

function convertPage(inputPath, outputPath, componentName, isSubpage = false, pageMetadata = null) {
  const html = fs.readFileSync(inputPath, 'utf-8');
  const { body, bodyClass } = extractBody(html);
  const ix2Styles = extractIX2Styles(html);

  const jsxBody = htmlToJsx(body, isSubpage);

  // Extract page-specific head scripts (data-page-type, data-project-slug, video observers, etc.)
  const headScripts = [];
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    const headContent = headMatch[1];
    const headScriptRegex = /<script>([\s\S]*?)<\/script>/g;
    let hsMatch;
    while ((hsMatch = headScriptRegex.exec(headContent)) !== null) {
      const scriptContent = hsMatch[1].trim();
      // Only include custom page scripts (not WebFont, GA, touch detection)
      if (scriptContent.includes('data-page-type') ||
          scriptContent.includes('data-project-slug') ||
          scriptContent.includes('IntersectionObserver') ||
          scriptContent.includes('data-nav-section')) {
        headScripts.push(scriptContent);
      }
    }
  }

  // Build the page component

  // Check if there's an inline script in the body (like marquee)
  // Already removed by extractBody, but we need to capture it first
  const scriptMatches = [];
  const bodyFull = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1];
  const inlineScriptRegex = /<script>([\s\S]*?)<\/script>/g;
  let scriptMatch;
  while ((scriptMatch = inlineScriptRegex.exec(bodyFull)) !== null) {
    // Skip the document.write scripts
    if (!scriptMatch[1].includes('document.write') && !scriptMatch[1].includes('VERCEL_URL')) {
      scriptMatches.push(scriptMatch[1]);
    }
  }

  // Merge head scripts and body scripts
  const allScripts = [...headScripts, ...scriptMatches];
  const needsClientComponent = allScripts.length > 0;

  let pageContent;

  if (needsClientComponent) {
    // Create a separate client component for the scripts
    const scriptsComponentPath = outputPath.replace('page.tsx', 'PageScripts.tsx');
    const scriptsDir = path.dirname(scriptsComponentPath);

    let scriptsComponent = `'use client';
import Script from 'next/script';

export function PageScripts() {
  return (
    <>
      ${allScripts.map((script, i) => `
      <Script id="page-script-${i}" strategy="afterInteractive">
        {\`${script.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}
      </Script>`).join('\n')}
    </>
  );
}
`;

    fs.mkdirSync(scriptsDir, { recursive: true });
    fs.writeFileSync(scriptsComponentPath, scriptsComponent);
  }

  const ix2StyleBlock = ix2Styles ? `
      <style dangerouslySetInnerHTML={{ __html: \`${ix2Styles.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />` : '';

  // FOUC prevention styles (only for homepage)
  const foucStyles = inputPath.includes('index.html') ? `
      <style dangerouslySetInnerHTML={{ __html: \`
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
      \` }} />` : '';

  const imports = ['// @ts-nocheck'];
  if (pageMetadata) imports.push(`import type { Metadata } from "next";`);
  if (needsClientComponent) imports.push(`import { PageScripts } from './PageScripts';`);

  const metaBlock = pageMetadata ? `
export const metadata: Metadata = {
  title: '${(pageMetadata.title || '').replace(/'/g, "\\'")}',
  description: '${(pageMetadata.description || '').replace(/'/g, "\\'")}',
  openGraph: {
    title: '${(pageMetadata.ogTitle || pageMetadata.title || '').replace(/'/g, "\\'")}',
    description: '${(pageMetadata.description || '').replace(/'/g, "\\'")}',
  },
  twitter: {
    title: '${(pageMetadata.twitterTitle || pageMetadata.title || '').replace(/'/g, "\\'")}',
    description: '${(pageMetadata.description || '').replace(/'/g, "\\'")}',
  },
};
` : '';

  pageContent = `${imports.join('\n')}
${metaBlock}
export default function ${componentName}() {
  return (
    <>
      ${ix2StyleBlock}
      ${foucStyles}
      ${jsxBody}
      ${needsClientComponent ? '<PageScripts />' : ''}
    </>
  );
}
`;

  const dir = path.dirname(outputPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, pageContent);
  console.log(`✓ Converted: ${inputPath} → ${outputPath}`);
}

// Run conversions
const sourceDir = '/tmp/webflow-source';
const outDir = path.join(__dirname, '..', 'app');

// Homepage
convertPage(
  path.join(sourceDir, 'index.html'),
  path.join(outDir, 'page.tsx'),
  'HomePage',
  false,
  {
    title: "Prasshanna's Playground",
    description: 'UX / Product Designer working at the intersection of interaction design, accessibility, and AI-driven systems.',
    ogTitle: "Prasshanna's Playground",
    twitterTitle: "Prasshanna's Playground",
  }
);

// Explorations
convertPage(
  path.join(sourceDir, 'explorations.html'),
  path.join(outDir, 'explorations', 'page.tsx'),
  'ExplorationsPage',
  false,
  {
    title: 'Explorations',
    description: 'Fun projects and explorations by Prasshanna — design experiments, creative coding, and more.',
    ogTitle: 'Explorations',
    twitterTitle: 'Explorations',
  }
);

// Case study pages
const caseStudies = [
  {
    file: 'samsung-research.html', component: 'SamsungResearchPage',
    title: 'Samsung Research',
    description: 'Interaction Redefined: Rethinking Media & Meetings at Samsung Research — exploring multimodal interaction and video conferencing redesigns.',
    ogTitle: 'Samsung Research — Interaction Redefined',
    twitterTitle: 'Samsung Research — Interaction Redefined',
  },
  {
    file: 'us-hab-cti.html', component: 'USHabCTIPage',
    title: 'US HAB-CTI',
    description: 'Designing a clearing house website for the US Harmful Algal Bloom and Cyanotoxins Interagency program.',
    ogTitle: 'US HAB-CTI Clearinghouse',
    twitterTitle: 'US HAB-CTI Clearinghouse',
  },
  {
    file: 'uyir.html', component: 'UyirPage',
    title: 'UYIR',
    description: 'A voice-based AI mental health companion for kids to talk to and express their feelings.',
    ogTitle: 'UYIR — Kids Mental Health Companion',
    twitterTitle: 'UYIR — Kids Mental Health Companion',
  },
  {
    file: 'xr-museum.html', component: 'XRMuseumPage',
    title: 'XR Museum',
    description: 'An extended reality system built for museums to view data in a visually beautiful way, like never before.',
    ogTitle: 'XR Museum Experience',
    twitterTitle: 'XR Museum Experience',
  },
];

for (const cs of caseStudies) {
  convertPage(
    path.join(sourceDir, 'work', cs.file),
    path.join(outDir, 'work', cs.file.replace('.html', ''), 'page.tsx'),
    cs.component,
    true,
    { title: cs.title, description: cs.description, ogTitle: cs.ogTitle, twitterTitle: cs.twitterTitle }
  );
}

console.log('\n✅ All pages converted successfully!');

import fs from 'node:fs';
import path from 'node:path';
import { SITE_THEMES, DEFAULT_THEME } from '../src/lib/themes.js';
const read=p=>fs.readFileSync(p,'utf8');
const checks={
  tenThemes: SITE_THEMES.length===10 && new Set(SITE_THEMES.map(t=>t.id)).size===10,
  skyBlue: SITE_THEMES.some(t=>t.primary.toLowerCase()==='#279cfc') && DEFAULT_THEME==='sky-blue',
  singleAccent: SITE_THEMES.every(t=>t.primary===t.accent && t.primary===t.alt),
  whiteNeutrals: SITE_THEMES.every(t=>t.surface==='#FFFFFF' && t.tint==='#FFFFFF'),
  cssTokens: SITE_THEMES.every(t=>read('src/app/themes.generated.css').includes(`html[data-theme="${t.id}"]`)),
  skinImported: read('src/app/layout.jsx').includes('transparent-v8.css'),
  heroUnfiltered: !read('src/components/site/Hero.jsx').includes('linear-gradient(') && read('src/components/site/Hero.jsx').includes('v9-home-photo'),
  innerBannersUnfiltered: read('src/components/site/Elements.jsx').includes('v9-banner-photo'),
  mobileDrawer: read('src/components/site/SiteHeader.jsx').includes('v8-mobile-drawer') && read('src/components/site/SiteHeader.jsx').includes('"Escape"'),
  adminPreview: read('src/components/admin/ThemeGallery.jsx').includes('ThemeMiniPreview') && read('src/components/admin/ThemeGallery.jsx').includes('Publish selected theme'),
  publicPreview: read('src/components/site/PublicThemePicker.jsx').includes('ThemeMiniPreview'),
  transparentFooter: read('src/app/transparent-v8.css').includes('.site-footer { background: transparent !important'),
  noCredentials: !fs.existsSync('.env.local'),
};
console.log(JSON.stringify({status:Object.values(checks).every(Boolean)?'PASS':'FAIL',checks},null,2));
if(Object.values(checks).some(v=>!v))process.exit(1);

import { readFileSync, existsSync } from "node:fs";
import {
  SITE_THEMES,
  THEME_MAP,
  DEFAULT_THEME,
  themeId,
} from "../src/lib/themes.js";
const read = (p) => readFileSync(p, "utf8");
const issues = [];
const assert = (ok, msg) => {
  if (!ok) issues.push(msg);
};
const fields = [
  "dark",
  "ink",
  "primary",
  "accent",
  "alt",
  "surface",
  "tint",
  "border",
];
assert(
  SITE_THEMES.length >= 10,
  `Expected at least 10 palettes, got ${SITE_THEMES.length}`,
);
assert(
  new Set(SITE_THEMES.map((t) => t.id)).size === SITE_THEMES.length,
  "Duplicate theme IDs",
);
assert(Boolean(THEME_MAP[DEFAULT_THEME]), "Default theme missing");
assert(
  themeId("invalid") === DEFAULT_THEME,
  "Unknown theme must fall back to a safe preset",
);
for (const t of SITE_THEMES) {
  for (const field of fields)
    assert(
      /^#[a-f\d]{6}$/i.test(t[field]),
      `${t.id}: ${field} is not a HEX color`,
    );
  assert(t.id !== "__proto__", `${t.id}: reserved theme key`);
}
const css = read("src/app/themes.generated.css");
for (const t of SITE_THEMES)
  assert(css.includes(`html[data-theme="${t.id}"]`), `CSS missing ${t.id}`);
const root = read("src/app/layout.jsx"),
  header = read("src/components/site/SiteHeader.jsx"),
  footer = read("src/components/site/SiteFooter.jsx"),
  hero = read("src/components/site/Hero.jsx"),
  cards = read("src/components/site/Elements.jsx"),
  api = read("src/app/api/admin/settings/route.js"),
  settings = read("src/components/admin/SettingsForm.jsx"),
  gallery = read("src/components/admin/ThemeGallery.jsx"),
  admin = read("src/components/admin/AdminShell.jsx");
assert(
  root.includes("data-theme={selected}") &&
    root.includes("themes.generated.css"),
  "Root layout missing SSR global theme",
);
assert(
  header.includes("v5-nav-button") && header.includes("v8-mobile-drawer"),
  "Header does not include animated side drawer",
);
assert(
  footer.includes("v9-footer") && footer.includes("BrandMark"),
  "Footer not theme-bound",
);
assert(
  hero.includes("v9-home-photo") && !hero.includes("linear-gradient("),
  "Hero must render clear image without colored overlay",
);
assert(
  cards.includes("PageBanner") && cards.includes("v9-banner-photo"),
  "Inner page image-first banner missing",
);
assert(
  cards.includes("spectrum-card") && cards.includes("editorial-card"),
  "Practice and blog cards not themed",
);
assert(
  api.includes("Settings.schema.path(key)") && api.includes("themeId"),
  "MongoDB update route missing theme persistence",
);
assert(
  settings.includes("data.themeId"),
  "General admin settings missing theme choice",
);
assert(
  gallery.includes("previewTheme") &&
    gallery.includes("Publish selected theme"),
  "Theme studio missing preview/publish workflow",
);
assert(admin.includes("v8-admin-shell"), "Admin shell is missing V8 neutral styling");
assert(
  existsSync("src/app/admin/(dashboard)/themes/page.jsx"),
  "No protected theme gallery route",
);
assert(
  existsSync("src/app/(site)/theme-preview/page.jsx"),
  "No public visual theme preview route",
);
assert(existsSync("src/app/theme-system.css"), "Semantic page tokens missing");
const v8skin = read("src/app/transparent-v8.css");
assert(v8skin.includes(".site-footer") && v8skin.includes(".v8-mobile-drawer"), "V8 global transparent skin missing");
assert(SITE_THEMES.length === 10, "V8 must have exactly ten single-accent themes");
for (const theme of SITE_THEMES) assert(theme.primary === theme.accent && theme.primary === theme.alt, `${theme.id} has mixed accent colors`);
assert(SITE_THEMES.some(t => t.primary.toUpperCase() === "#279CFC"), "Requested #279CFC theme missing");
const result = {
  status: issues.length ? "FAIL" : "PASS",
  themes: SITE_THEMES.length,
  cssSelectors: SITE_THEMES.length,
  themeStorage: "MongoDB Settings.themeId",
  areas: [
    "Public pages",
    "Header",
    "Mega menu",
    "Hero",
    "Practice cards",
    "Blog pages",
    "FAQ",
    "Footer",
    "Admin dashboard",
  ],
  issues,
};
console.log(JSON.stringify(result, null, 2));
if (issues.length) process.exit(1);

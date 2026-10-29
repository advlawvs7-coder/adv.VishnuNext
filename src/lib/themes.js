/** V8: ten restrained, one-accent themes. Neutrals stay fixed across themes. */
export const DEFAULT_THEME = "sky-blue";
export const SITE_THEMES = [
  { id: "sky-blue", name: "Signature Sky Blue", caption: "Clean digital blue · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#279CFC", accent: "#279CFC", alt: "#279CFC", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
  { id: "cobalt", name: "Cobalt Blue", caption: "Confident modern blue · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#245EDB", accent: "#245EDB", alt: "#245EDB", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
  { id: "petrol", name: "Petrol Teal", caption: "Quiet professional teal · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#067F87", accent: "#067F87", alt: "#067F87", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
  { id: "emerald", name: "Emerald Green", caption: "Calm legal green · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#167A59", accent: "#167A59", alt: "#167A59", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
  { id: "amethyst", name: "Amethyst Purple", caption: "Refined modern purple · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#8455C8", accent: "#8455C8", alt: "#8455C8", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
  { id: "wine", name: "Wine Rose", caption: "Understated wine red · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#A34765", accent: "#A34765", alt: "#A34765", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
  { id: "copper", name: "Burnished Copper", caption: "Contemporary copper · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#AF633B", accent: "#AF633B", alt: "#AF633B", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
  { id: "indigo", name: "Classic Indigo", caption: "Minimal indigo · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#5157A7", accent: "#5157A7", alt: "#5157A7", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
  { id: "steel", name: "Steel Blue", caption: "Architectural blue · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#3C718C", accent: "#3C718C", alt: "#3C718C", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
  { id: "graphite", name: "Graphite", caption: "Neutral graphite · transparent surfaces", dark: "#18202C", ink: "#18202C", primary: "#343D4B", accent: "#343D4B", alt: "#343D4B", surface: "#FFFFFF", tint: "#FFFFFF", border: "#E1E5EA" },
 ];
export const THEME_MAP = Object.fromEntries(SITE_THEMES.map((t) => [t.id, t]));
export function themeId(id) {
  return typeof id === "string" && Object.prototype.hasOwnProperty.call(THEME_MAP, id) ? id : DEFAULT_THEME;
}

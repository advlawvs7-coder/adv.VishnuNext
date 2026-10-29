"use client";
import { useEffect } from "react";
import { themeId } from "@/lib/themes";
/** Preview is browser-local; the admin's saved choice is always the SSR default. */
export default function ThemeSync({ savedTheme }) {
  useEffect(() => {
    const allowed = themeId(savedTheme);
    try {
      const preview = window.sessionStorage.getItem("avs-preview-theme");
      document.documentElement.dataset.theme = preview
        ? themeId(preview)
        : allowed;
    } catch {
      document.documentElement.dataset.theme = allowed;
    }
  }, [savedTheme]);
  return null;
}
/** Change theme everywhere without replacing client navigation state. */
export function previewTheme(id) {
  const selected = themeId(id);
  document.documentElement.dataset.theme = selected;
  try {
    window.sessionStorage.setItem("avs-preview-theme", selected);
  } catch {}
}
export function clearThemePreview(savedTheme) {
  try {
    window.sessionStorage.removeItem("avs-preview-theme");
  } catch {}
  document.documentElement.dataset.theme = themeId(savedTheme);
}

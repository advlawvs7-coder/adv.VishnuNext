import ThemeGallery from "@/components/admin/ThemeGallery";
export const metadata = { title: "Site Themes | Admin" };
export default function ThemesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Design and Branding</p>
        <h1 className="mt-2 font-serif text-4xl">Website Theme Studio</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--theme-muted)]">
          Theme switching is global, not page-specific. Preview on any page and
          publish when ready.
        </p>
      </div>
      <ThemeGallery />
    </div>
  );
}

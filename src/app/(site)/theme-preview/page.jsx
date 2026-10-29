import { PageBanner } from "@/components/site/Elements";
import PublicThemePicker from "@/components/site/PublicThemePicker";
import { getSettings } from "@/lib/content";
import { themeId } from "@/lib/themes";
export const metadata = {
  title: "Website Theme Preview | Dr. Advocate Vishnu Sharma",
  robots: { index: false, follow: false },
};
export default async function ThemePreviewPage() {
  const settings = await getSettings();
  return (
    <>
      <PageBanner
        eyebrow="DESIGN PREVIEW"
        title="10 Transparent Premium Themes"
        description="Preview a complete website color system—not just individual buttons."
      />
      <PublicThemePicker publishedTheme={themeId(settings.themeId)} />
    </>
  );
}

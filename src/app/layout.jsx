import "./globals.css";
import "./themes.generated.css";
import "./theme-system.css";
import "./transparent-v8.css";
import "./premium-v9.css";
import ThemeSync from "@/components/site/ThemeSync";
import { getSettings } from "@/lib/content";
import { themeId } from "@/lib/themes";
export const metadata = {
  title: "Dr. Advocate Vishnu Sharma",
  description: "Legal information and consultation enquiries.",
};
export default async function RootLayout({ children }) {
  const settings = await getSettings();
  const selected = themeId(settings?.themeId);
  return (
    <html lang="en" data-theme={selected} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeSync savedTheme={selected} />
        {children}
      </body>
    </html>
  );
}

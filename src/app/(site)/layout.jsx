import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Disclaimer from "@/components/site/Disclaimer";
import { getSiteShell } from "@/lib/content";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import MotionRoot from "@/components/site/MotionRoot";
import ChatMount from "@/components/chat/ChatMount";
import RouteProgressMount from "@/components/site/RouteProgressMount";
import ScrollTools from "@/components/site/ScrollTools";
export const dynamic = "force-dynamic";
export default async function PublicLayout({ children }) {
  const { settings, services, navigation } = await getSiteShell();
  const structured = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: settings.brandName || "Dr. Advocate Vishnu Sharma",
    url: settings.siteUrl || "https://advocatevishnusharma.com",
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address || undefined,
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader
        settings={settings}
        services={services}
        navigation={navigation}
      />
      <MotionRoot />
      <RouteProgressMount />
      <ChatMount />
      <ScrollTools />
      <main>{children}</main>
      <SiteFooter
        settings={settings}
        services={services}
        navigation={navigation}
      />
      <WhatsAppButton whatsapp={settings.whatsapp} />
      <Disclaimer text={settings.disclaimerText} />
    </>
  );
}

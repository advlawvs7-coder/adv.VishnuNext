
// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://advocatevishnu.com"),

  title: {
    default: "Advocate Dr. Vishnu Sharma | Senior Legal Practitioner",
    template: "%s ",
  },

  description:
    "Official website of Advocate Dr. Vishnu Sharma, offering experienced civil, criminal, matrimonial and corporate legal representation in Delhi.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advocate Dr. Vishnu Sharma | Senior Legal Practitioner",
    description:
      "Official website of Advocate Dr. Vishnu Sharma, offering experienced civil, criminal, matrimonial and corporate legal representation in Delhi.",
    url: "https://advocatevishnu.com/",
    siteName: "Advocate Dr. Vishnu Sharma",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/logo512.png",
        width: 512,
        height: 512,
        alt: "Advocate Dr. Vishnu Sharma",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Advocate Dr. Vishnu Sharma | Senior Legal Practitioner",
    description:
      "Official website of Advocate Dr. Vishnu Sharma, offering experienced civil, criminal, matrimonial and corporate legal representation in Delhi.",
    images: ["/logo512.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://advocatevishnu.com"),
  title: {
    default: "Advocate Dr. Vishnu Sharma | Senior Legal Practitioner",
    template: "%s | Advocate Vishnu Sharma",
  },
  description:
    "Official website of Advocate Dr. Vishnu Sharma, offering experienced civil, criminal, matrimonial and corporate legal representation in Delhi.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar /> {/* Yeh poori website par top par dikhega */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

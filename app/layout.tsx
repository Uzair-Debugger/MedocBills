import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import JsonLd from "../src/components/JsonLd";
import { SITE_CONFIG, organizationSchema, websiteSchema } from "../src/constants/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Medical Billing & RCM Services",
    template: "%s | MedocBills",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "medical billing",
    "medical billing services",
    "healthcare revenue cycle management",
    "RCM",
    "medical coding",
    "insurance claim management",
    "healthcare billing",
    "medical credentialing",
    "prior authorization",
    "denial management",
    "telehealth billing",
    "HIPAA compliant billing",
    "medical billing company",
    "revenue cycle",
    "claims processing",
    "medical billing outsourcing",
  ],
  authors: [{ name: "MedocBills" }],
  creator: "MedocBills",
  publisher: "MedocBills",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: "MedocBills",
    title: "Medical Billing & RCM Services | MedocBills",
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "MedocBills - Healthcare Revenue Cycle Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@medocbills",
    creator: "@medocbills",
    title: "Medical Billing & RCM Services | MedocBills",
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", sizes: "any", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  category: "Healthcare",
  applicationName: "MedocBills",
  alternates: {
    languages: {
      "en-US": "https://www.medocbills.com/",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: SITE_CONFIG.colors.primary },
    { media: "(prefers-color-scheme: dark)", color: SITE_CONFIG.colors.primary },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-white text-black font-poppins">
        <Navbar />
        {children}
        <Footer />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </body>
    </html>
  );
}

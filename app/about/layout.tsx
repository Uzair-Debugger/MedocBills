import type { Metadata } from "next";
import { SITE_CONFIG } from "@/src/constants/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MEDOCBILLS LLC is a premier provider of comprehensive healthcare revenue cycle management, medical billing, and digital marketing services. Learn about our mission and values.",
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
  openGraph: {
    title: "About Us | MedocBills",
    description:
      "MEDOCBILLS LLC is a premier provider of comprehensive healthcare revenue cycle management, medical billing, and digital marketing services. Learn about our mission and values.",
    url: `${SITE_CONFIG.url}/about`,
    type: "website",
    images: [{ url: SITE_CONFIG.ogImage, alt: "MedocBills - About Us" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | MedocBills",
    description: "Learn about MEDOCBILLS LLC mission and values in healthcare revenue cycle management.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/src/constants/seo";

export const metadata: Metadata = {
  title: "Medical Billing & RCM Services",
  description:
    "Comprehensive healthcare billing solutions including medical billing, coding, credentialing, compliance support, and telehealth billing. Maximize your revenue cycle performance.",
  alternates: { canonical: `${SITE_CONFIG.url}/services` },
  openGraph: {
    title: "Medical Billing & RCM Services | MedocBills",
    description:
      "Comprehensive healthcare billing solutions including medical billing, coding, credentialing, compliance support, and telehealth billing. Maximize your revenue cycle performance.",
    url: `${SITE_CONFIG.url}/services`,
    type: "website",
    images: [{ url: SITE_CONFIG.ogImage, alt: "MedocBills - Our Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Billing & RCM Services | MedocBills",
    description: "Maximize your revenue cycle with our comprehensive healthcare billing solutions.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

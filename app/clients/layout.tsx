import type { Metadata } from "next";
import { SITE_CONFIG } from "@/src/constants/seo";

export const metadata: Metadata = {
  title: "Healthcare Systems - Medical Billing Services",
  description:
    "MedocBills provides comprehensive medical billing services to healthcare systems, hospitals, and clinics nationwide. Trusted RCM solutions with end-to-end revenue cycle management.",
  alternates: { canonical: `${SITE_CONFIG.url}/clients` },
  openGraph: {
    title: "Healthcare Systems - Medical Billing Services | MedocBills",
    description:
      "MedocBills provides comprehensive medical billing services to healthcare systems, hospitals, and clinics nationwide. Trusted RCM solutions.",
    url: `${SITE_CONFIG.url}/clients`,
    type: "website",
    images: [{ url: SITE_CONFIG.ogImage, alt: "MedocBills - Healthcare Systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Systems - Medical Billing Services | MedocBills",
    description: "Trusted medical billing services for healthcare systems nationwide.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/src/constants/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact MedocBills for professional medical billing services and healthcare revenue cycle management. Call us at (201) 371-3521 or email info@medocbills.com today.",
  alternates: { canonical: `${SITE_CONFIG.url}/contactus` },
  openGraph: {
    title: "Contact Us | MedocBills",
    description:
      "Contact MedocBills for professional medical billing services and healthcare revenue cycle management. Call us today.",
    url: `${SITE_CONFIG.url}/contactus`,
    type: "website",
    images: [{ url: SITE_CONFIG.ogImage, alt: "MedocBills - Contact Us" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MedocBills",
    description: "Contact MedocBills for medical billing services and healthcare RCM solutions.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

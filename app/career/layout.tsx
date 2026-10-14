import type { Metadata } from "next";
import { SITE_CONFIG } from "@/src/constants/seo";

export const metadata: Metadata = {
  title: "Careers in Healthcare Billing & RCM",
  description:
    "Explore career information and current openings at MedocBills, a healthcare billing and revenue cycle management company. Contact us to express interest in future opportunities.",
  alternates: { canonical: `${SITE_CONFIG.url}/career` },
  openGraph: {
    title: "Careers in Healthcare Billing & RCM | MedocBills",
    description:
      "Explore career information and current openings at MedocBills, a healthcare billing and revenue cycle management company.",
    url: `${SITE_CONFIG.url}/career`,
    type: "website",
    images: [{ url: SITE_CONFIG.ogImage, alt: "MedocBills Careers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers in Healthcare Billing & RCM | MedocBills",
    description: "Explore career information and current openings at MedocBills.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/src/constants/seo";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join MedocBills' team of healthcare billing experts. Explore career opportunities in medical billing, coding, and healthcare revenue cycle management across the US.",
  alternates: { canonical: `${SITE_CONFIG.url}/career` },
  openGraph: {
    title: "Careers | MedocBills",
    description:
      "Join MedocBills' team of healthcare billing experts. Explore career opportunities in medical billing, coding, and healthcare revenue cycle management.",
    url: `${SITE_CONFIG.url}/career`,
    type: "website",
    images: [{ url: SITE_CONFIG.ogImage, alt: "MedocBills Careers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | MedocBills",
    description: "Explore healthcare billing career opportunities at MedocBills.",
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

import type { MetadataRoute } from "next";
import { faqs, jobs } from "./data";

const parseDateString = (dateStr: string): string => {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
  }
  return new Date().toISOString().split("T")[0];
};

// ============================================================================
// SITE CONFIGURATION
// ============================================================================
export const SITE_CONFIG = {
  name: "MedocBills",
  displayName: "MEDOCBILLS LLC",
  description:
    "MedocBills offers professional medical billing services, claim management, and healthcare revenue solutions. Simplify your billing process with our expert team.",
  shortDescription:
    "Professional medical billing services, claim management, and healthcare revenue solutions.",
  url: "https://www.medocbills.com",
  contact: {
    phone: "+1 201-371-3521",
    phoneE164: "tel:+12013713521",
    phoneDisplay: "(201) 371-3521",
    email: "info@medocbills.com",
    address: {
      streetAddress: "835 Wilshire Blvd, Ste 500 #513",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90017",
      addressCountry: "US",
      full: "835 Wilshire Blvd, Ste 500 #513, Los Angeles, CA 90017",
    },
  },
  colors: {
    primary: "#8B1538",
    primaryDark: "#6B0F28",
    secondary: "#1B7C8C",
  },
  social: {
    facebook: "https://www.facebook.com/medocbills",
    linkedin: "https://www.linkedin.com/company/medocbills",
    instagram: "https://www.instagram.com/medocbills",
    twitter: "https://twitter.com/medocbills",
    youtube: "https://www.youtube.com/@medocbills",
  },
  logo: "https://www.medocbills.com/logo.png",
  ogImage: "https://www.medocbills.com/main.png",
  locale: "en_US",
  language: "en",
} as const;

// ============================================================================
// SITEMAP ROUTES
// ============================================================================
export const ROUTES: MetadataRoute.Sitemap = [
  {
    url: `${SITE_CONFIG.url}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_CONFIG.url}/services`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_CONFIG.url}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_CONFIG.url}/clients`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_CONFIG.url}/contactus`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_CONFIG.url}/career`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

// ============================================================================
// ORGANIZATION SCHEMA (Global)
// ============================================================================
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.displayName,
  url: SITE_CONFIG.url,
  logo: SITE_CONFIG.logo,
  description: SITE_CONFIG.shortDescription,
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Muhammad Younas Khan",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.contact.address.streetAddress,
    addressLocality: SITE_CONFIG.contact.address.addressLocality,
    addressRegion: SITE_CONFIG.contact.address.addressRegion,
    postalCode: SITE_CONFIG.contact.address.postalCode,
    addressCountry: SITE_CONFIG.contact.address.addressCountry,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    availableLanguage: ["English"],
  },
  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.instagram,
    SITE_CONFIG.social.twitter,
  ],
};

// ============================================================================
// WEBSITE SCHEMA (Global)
// ============================================================================
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.shortDescription,
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    logo: SITE_CONFIG.logo,
  },
};

// ============================================================================
// MEDICAL ORGANIZATION SCHEMA (Global variant for healthcare context)
// ============================================================================
export const medicalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: SITE_CONFIG.displayName,
  url: SITE_CONFIG.url,
  logo: SITE_CONFIG.logo,
  description: SITE_CONFIG.shortDescription,
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Muhammad Younas Khan",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.contact.address.streetAddress,
    addressLocality: SITE_CONFIG.contact.address.addressLocality,
    addressRegion: SITE_CONFIG.contact.address.addressRegion,
    postalCode: SITE_CONFIG.contact.address.postalCode,
    addressCountry: SITE_CONFIG.contact.address.addressCountry,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    availableLanguage: ["English"],
  },
  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.instagram,
    SITE_CONFIG.social.twitter,
  ],
};

// ============================================================================
// FAQ PAGE SCHEMA (Services page)
// ============================================================================
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

// ============================================================================
// JOB POSTING SCHEMA (Career page)
// ============================================================================
export const jobPostingSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: jobs.map((job, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "JobPosting",
      title: job.title,
      description: `${job.category} position at MedocBills. Location: ${job.location}. Apply today to join our team of healthcare billing experts.`,
      datePosted: new Date().toISOString().split("T")[0],
      validThrough: parseDateString(job.lastDate),
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        sameAs: SITE_CONFIG.url,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location.split(",")[0],
          addressCountry: "US",
        },
      },
    },
  })),
};

// ============================================================================
// LOCAL BUSINESS SCHEMA (Contact page)
// ============================================================================
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_CONFIG.name,
  image: SITE_CONFIG.logo,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.contact.phone,
  email: SITE_CONFIG.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.contact.address.streetAddress,
    addressLocality: SITE_CONFIG.contact.address.addressLocality,
    addressRegion: SITE_CONFIG.contact.address.addressRegion,
    postalCode: SITE_CONFIG.contact.address.postalCode,
    addressCountry: SITE_CONFIG.contact.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.0489,
    longitude: -118.2512,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:00",
    },
  ],
  priceCategory: "$$",
};

// ============================================================================
// MEDICAL BUSINESS SCHEMA (Clients page)
// ============================================================================
export const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE_CONFIG.name,
  description:
    "Comprehensive medical billing services for healthcare systems, specializing in Revenue Cycle Management (RCM).",
  url: SITE_CONFIG.url,
  medicalSpecialty: "Medical Billing",
  availableService: [
    {
      "@type": "Service",
      name: "Medical Billing",
      description:
        "Accurate billing and coding services designed to minimize errors, ensure compliance, and maximize reimbursements.",
    },
    {
      "@type": "Service",
      name: "Insurance Claim Management",
      description:
        "Streamlined claim submission, tracking, and follow-up that improves approval rates and reduces denials.",
    },
    {
      "@type": "Service",
      name: "Patient Support & Assistance",
      description:
        "Compassionate guidance to help patients navigate healthcare bills, insurance policies, and payment options.",
    },
    {
      "@type": "Service",
      name: "Compliance & Reporting",
      description:
        "HIPAA-compliant processes and detailed reporting to safeguard patient data and maintain financial transparency.",
    },
    {
      "@type": "Service",
      name: "Revenue Cycle Management",
      description:
        "End-to-end management of the revenue cycle, from scheduling to collections, for increased efficiency and profitability.",
    },
    {
      "@type": "Service",
      name: "Telehealth Billing",
      description:
        "Specialized billing solutions tailored for virtual care and telehealth services.",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    contactType: "customer service",
  },
};

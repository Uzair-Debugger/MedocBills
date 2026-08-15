import React, { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import Image1 from '../assets/Hero/1.webp'
import Image2 from '../assets/Hero/2.webp'
import Image3 from '../assets/Hero/3.webp'

// IMPORTANT: Don't import icons directly anymore
// Just import their NAMES as strings
import { 
  IconSyringe, IconBrain, IconEye, IconHead, 
  IconHeart, IconKnee, IconPain, IconSpine, IconTooth 
} from "./icons";

// ============================================================================
// NAVBAR
// ============================================================================
export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Our Services', path: '/services' },
  { label: 'Contact us', path: '/contactus' },
  { label: 'About us', path: '/about' },
  { label: 'Career', path: '/career' },
  { label: 'Our Clients', path: '/clients' },
];

// ============================================================================
// REACHUS
// ============================================================================
export const services_reachus = [
  "Medical Billing",
  "Medical Coding",
  "Medical Credentialing",
  "Verification of Benefits",
  "Prior Authorization",
  "Patient Billing"
];

export const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

// ============================================================================
// HERO
// ============================================================================
type Slide = {
  title: ReactNode;
  description: string;
  button: string;
  image: StaticImageData | string;
};

export const slides: Slide[] = [
  {
    title: "Welcome, Doctors! Your Billing is Our Priority",
    description: "We welcome new clients and are committed to delivering high-quality, reliable service to all customers. Thank you for trusting our experienced team with your medical billing needs.",
    button: "Get in Touch",
    image: Image1,
  },
  {
    title: "MEDOCBILLS LLC- Your Trusted Partner in US Healthcare Billing.",
    description: "From clean claim submission to denial follow-up, we ensure you get paid on time, every time.",
    button: "Get consultation",
    image: Image2,
  },
  {
    title: "Increase Your Practice Revenue With Accurate & Fast Medical Billing",
    description: "Focus on exceptional patient care while we manage claims, coding, denials, and collections with unmatched accuracy.",
    button: "Free Audit",
    image: Image3,
  },
];

// CHANGE: Use icon names as strings instead of components
export const clientBase = {
  heading: "Trusted by Healthcare Providers Nationwide",
  paragraph: "Clinics and practices nationwide rely on MedocBills to simplify billing, reduce denials, and consistently boost revenue with dependable end-to-end RCM solutions.",
  buttonText: "Get Started Today",
  icons: ['Hospital', 'BriefcaseMedical', 'Stethoscope', 'ShieldPlus', 'Bed', 'Siren'] as const,
};

export const successRate = [
  { value: "98%", description: "Clean Claim Rate" },
  { value: "45%", description: "Revenue Increase" },
  { value: "24hrs", description: "Average Turnaround" }
];

export const whyToChoose = {
  heading: "Why Healthcare Providers Choose MedocBills",
  points: [
    {
      title: "We Reduce Your Administrative Burden",
      para: "Focus on patients â€” we take care of the billing complexities."
    },
    {
      title: "We Improve Your Revenue Performance",
      para: "Optimized workflows and expert coding help you capture every dollar you've earned."
    },
    {
      title: "We Deliver Consistency",
      para: "From claim submission to payment posting, our process ensures predictable and reliable results."
    },
    {
      title: "We Offer a Personal Touch",
      para: "Your practice gets a dedicated billing partner, not a generic support desk."
    }
  ]
};

// CHANGE: Use icon names as strings
export const services = [
  { icon: 'SquareActivity', title: "Medical Billing", description: "Accurate billing and clean claims that get you paid faster." },
  { icon: 'Hospital', title: "Practice Management", description: "Streamlined workflows that keep your practice efficient and organized." },
  { icon: 'BriefcaseMedical', title: "Revenue Cycle Management", description: "Optimized financial processes for stronger, predictable cash flow." },
  { icon: 'ShieldPlus', title: "Compliance Support", description: "HIPAA-aligned guidance that keeps your practice protected and audit-ready." }
];

export const testimonials = [
  { name: "Family Practice, Texas", text: "MedocBills has completely transformed our billing process. Our claim approvals are faster, and denials have dropped noticeably. Highly recommended!" },
  { name: "Pediatrics Clinic, Florida", text: "Their team is responsive, accurate, and easy to work with. We finally have clear visibility into our revenue cycle." },
  { name: "Specialty Clinic, California", text: "Outsourcing to MedocBills has saved us so much time. Our collections improved within the first few months." },
  { name: "Internal Medicine Practice, New York", text: "Professional, dependable, and detail-oriented. Their billing support allows us to focus fully on patient care." }
];

export const testimonialVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.5 } }
};

// ============================================================================
// CLIENTS
// ============================================================================
export const whyChoose = [
  'Allow health freedom',
  'Efficiently maintain health ID/MSN',
  'Medical codes',
  'Accurate Medicaid',
  'Cost-effective',
  'Trusted partner'
];

export const keyPoints = [
  'Our team arrives that your fixed cost places you 30% less',
  'Reduce your administrative burden and allows RCM highest efficiency',
  'Supports the compliance of the RCM audit team',
  'Use of Advance Technologies',
  'Our professionals hold their years of high-level experience',
  'Assured coverage reimbursements at your requirements',
  'Provide high quality care three billing and collections departments',
  'We help you in finding the best ways and ensure a better account receivable practice and your time follow up',
  'Use advance technology and tools',
  'Professional trained people available at all time',
  'Our quality related procedures and structured billing processes to ensure error free billing'
];

export const rcmSteps = [
  'Registration/ RCM Software',
  'Financial Eligibility verification',
  'Medical coding and charge submission',
  'Claims transmission',
  'Co-payment and Deductibles',
  'EOBs',
  'Payment posting and claim denial re-reversal',
  'Manage denials',
  'Billing & collection activities',
  'Reporting',
  'Refund'
];

export const jobs = [
  { id: 1, title: 'UI UX Designer', category: 'Digital Solutions', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 2, title: 'SEO SPECIALIST', category: 'Digital Solutions', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 3, title: 'Medical Coder', category: 'Medical Coding', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 4, title: 'HR EXECUTIVE', category: 'Administration & HR', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 5, title: 'BACKUP TEAM LEAD', category: 'Medical Billing', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 6, title: 'VIDEO EDITOR', category: 'Digital Solutions', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 7, title: 'Chartered Accountant (CA)', category: 'Accounts and Finance', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 8, title: 'Medical Billing Certification Program', category: 'Medical Billing', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 9, title: 'Medical Coding Assistant', category: 'Medical Coding', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 10, title: "Workers' Compensation Collections Specialist / AR Negotiator", category: 'WC Collections', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 11, title: 'Team Lead & Backup', category: 'Medical Billing', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 12, title: 'VOB - Auth Specialists - AR Representatives', category: 'Medical Billing', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 13, title: 'Medical Coding Department', category: 'Medical Coding', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 14, title: 'SR. BILLING EXECUTIVE - BILLING EXECUTIVE', category: 'Medical Billing', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
  { id: 15, title: 'IT OPERATIONS EXECUTIVE', category: 'IT', location: '6th Road, Rawalpindi', lastDate: '20 Dec 2025' },
];

// CHANGE: Use icon names as strings
export const whatwedo = [
  { title: "Medical Billing", description: "Credentialing specialists assist healthcare providers in enrollment, ensuring insurance reimbursement eligibility. We offer comprehensive credentialing solutions for all practices.", icon: 'DollarSign' },
  { title: "Medical Coding", description: "With the help of our certified medical coding specialists working on your project, your claim denial rate is significantly reduced. Our coders use the best-in-class coding tools and resources available in the industry.", icon: 'Laptop' },
  { title: "Medical Credentialing", description: "AllStars can handle any specialty including laboratories and DMEs. Our experts send error free applications to insurances and do proper follow-up till the case is closed.", icon: 'Stethoscope' },
  { title: "Verification of Benefits", description: "Our Insurance Benefits Verification Services provide a hassle-free provider experience with accurate and timely eligibility checks.", icon: 'ShieldPlus' },
  { title: "Prior Authorization Services", description: "Our Prior Authorization Services take the complexity out of obtaining insurance approvals, ensuring faster patient care.", icon: 'Lock' },
  { title: "Patient Billing", description: "Our Patient Billing Services are designed to make healthcare billing transparent and patient-friendly.", icon: 'User' },
];

// Specialty Data Array (keep as is - using custom icons)
export const specialties = [
  { title: 'Anesthesiology', icon: IconSyringe },
  { title: 'Cardiology', icon: IconHeart },
  { title: 'Chiropractor', icon: IconSpine },
  { title: 'Dental', icon: IconTooth },
  { title: 'Dermatology', icon: IconSyringe },
  { title: 'Neurology', icon: IconHead },
  { title: 'Neurosurgery', icon: IconBrain },
  { title: 'Ophthalmology', icon: IconEye },
  { title: 'Orthopedics', icon: IconKnee },
  { title: 'Pain Management', icon: IconPain },
];

// ============================================================================
// SERVICES
// ============================================================================
export const servicesData = [
  { title: 'Medical Billing & Coding', description: "Accurate billing and coding services designed to minimize errors, ensure compliance, and maximize reimbursements." },
  { title: 'Insurance Claim Management', description: "Streamlined claim submission, tracking, and follow-up that improves approval rates and reduces denials." },
  { title: 'Patient Support & Assistance', description: "Compassionate guidance to help patients navigate healthcare bills, insurance policies, and payment options with ease." },
  { title: 'Compliance & Reporting', description: "HIPAA-compliant processes and detailed reporting to safeguard patient data and maintain financial transparency." },
  { title: 'Revenue Cycle Management', description: "End-to-end management of the revenue cycle, from scheduling to collections, for increased efficiency and profitability." },
  { title: 'Telehealth Billing', description: "Specialized billing solutions tailored for virtual care and telehealth services, aligned with modern insurance policies." },
];

export const statsData = [
  { value: 98, label: "Accuracy Rate", suffix: "%" },
  { value: 500, label: "Clients Served", suffix: "+" },
  { value: 15, label: "Years Experience", suffix: "+" },
  { value: 95, label: "Client Satisfaction", suffix: "%" }
];

export const doctorsData = [
  { name: "Dr. Sarah Mitchell", specialty: "Chief Medical Officer", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=400&fit=crop&crop=face" },
  { name: "Dr. James Chen", specialty: "Billing Specialist", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=400&fit=crop&crop=face" },
  { name: "Dr. Emily Rodriguez", specialty: "Compliance Director", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=400&fit=crop&crop=face" }
];

export const faqs = [
  { question: 'How do we get started?', answer: 'Getting started is simple. Share your practice details, including your specialty, practice model, and any specific concerns. Let us know the best time to contact you so we can prepare a tailored healthcare management solution designed specifically for your practice.' },
  { question: 'Why should I trust MedocBills for billing?', answer: 'MedocBills serves a wide range of medical specialties, providing customized billing solutions that comply with HIPAA and industry standards. Our trained and experienced team has consistently helped practices improve revenue, reduce denials, and eliminate the stress of managing an in-house billing department.' },
  { question: 'What makes MedocBills different from other billing services?', answer: 'We operate as an extension of your practice, with hands-on management that ensures smooth operations and maximized revenue. Our focus is on reducing your revenue cycle time while delivering measurable results. With MedocBills, your success is our top priority â€” and our proven track record demonstrates it.' },
  { question: 'Is MedocBills ICD-10 ready?', answer: 'Yes. We are fully ICD-10 compliant and ensure accurate coding for every claim.' },
  { question: 'What reports does MedocBills provide?', answer: 'We provide monthly reports covering account activity, aging, and other key metrics. Custom reports can also be designed based on your needs. We recommend monthly review meetings to compare past and current collections, track trends, evaluate practice performance, and measure how MedocBills is contributing to your practiceâ€™s success.' }
];

// ============================================================================
// ABOUTUS
// ============================================================================
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "MEDOCBILLS LLC",
  "url": "https://www.medocbills.com",
  "logo": "https://www.medocbills.com/logo.png",
  "description": "Premier provider of comprehensive business solutions specializing in Business Process Outsourcing (BPO), expert healthcare revenue cycle management (RCM), and results-driven digital marketing services.",
  "foundingDate": "2025",
  "founder": { "@type": "Person", "name": "Muhammad Younas Khan" },
  "address": { "@type": "PostalAddress", "addressCountry": "US" },
  "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "availableLanguage": ["English"] }
};

// CHANGE: Use icon names as strings
export const pillars = [
  { icon: 'Users', title: 'Be Curious', text: 'We continuously seek better, efficient solutions and stay ahead of industry trends, especially in complex areas of healthcare coding and reimbursement.', bg: 'from-primary-medium to-primary', gradient: 'bg-gradient-to-br from-primary-medium to-primary' },
  { icon: 'Heart', title: 'Be Empathetic', text: 'MedocBills understand the unique challenges faced by each client and tailor our BPO and RCM solutions to meet specific organizational needs.', bg: 'from-secondary to-secondary-dark', gradient: 'bg-gradient-to-br from-secondary to-secondary-dark' },
  { icon: 'Award', title: 'Keep Promises', text: 'We are committed to delivering on our promises, ensuring transparency, timely execution, and reliable results in every service we provide.', bg: 'from-primary to-primary-dark', gradient: 'bg-gradient-to-br from-primary to-primary-dark' }
];

export const stats = [
  { number: '100+', label: 'Employees', description: 'Dedicated professionals' },
  { number: '1+', label: 'Years in Business', description: 'Industry experience' },
  { number: '100+', label: 'Clients Dealt To', description: 'Satisfied clients' },
  { number: '95%', label: 'Accuracy', description: 'Service precision' }
];

// CHANGE: Use icon names as strings
export const solutions = [
  { icon: 'Phone', title: 'Inbound Calls', text: 'Inbound calls are essential for providing excellent customer service. MedocBills can help you improve your customer service by providing professional and efficient call handling services and patient and client satisfaction.', gradient: 'from-secondary to-secondary-dark', category: 'bpo' },
  { icon: 'PhoneOutgoing', title: 'Outbound Calls', text: 'Outbound call centers can be a great way to reach new customers and grow your business. However, outsourcing your outbound call center operations to MedocBills can be more cost-effective and efficient solution.', gradient: 'from-secondary to-secondary-dark', category: 'bpo' },
  { icon: 'Mail', title: 'Email and Chat Support', text: 'MedocBills LLC can help you to create and deploy effective and chat platforms. Their team of experts will help you develop marketing strategies that are beneficial and chat to engage customers and drive sales.', gradient: 'from-primary to-primary-dark', category: 'digital' },
  { icon: 'MessageSquare', title: 'SMS Support', text: 'Small texts about their platforms are essential for engaging customers in today\'s business world. MedocBills can help you to develop and deploy SMS marketing messages, while chat platforms can be used to provide real-time customer support.', gradient: 'from-primary to-primary-dark', category: 'digital' }
];

// ============================================================================
// CAREERS
// ============================================================================
export const jobPostingSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": jobs.map((job, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "JobPosting",
      "title": job.title,
      "description": `${job.category} position at MedocBills`,
      "datePosted": new Date().toISOString().split('T')[0],
      "validThrough": job.lastDate,
      "employmentType": "FULL_TIME",
      "hiringOrganization": { "@type": "Organization", "name": "MedocBills", "sameAs": "https://www.medocbills.com" },
      "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": job.location.split(',')[0], "addressCountry": "US" } }
    }
  }))
};

// ============================================================================
// CLIENTS SCHEMA
// ============================================================================
export const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Right Medical Billing",
  "description": "Comprehensive medical billing services for healthcare systems, specializing in Revenue Cycle Management (RCM)",
  "url": "https://www.rightmedicalbilling.com/clients",
  "medicalSpecialty": "Medical Billing",
  "availableService": services.map(service => ({ "@type": "Service", "name": service.title, "description": service.description })),
  "contactPoint": { "@type": "ContactPoint", "telephone": "+923087658325", "email": "info@rightmedicalbilling.com", "contactType": "customer service" }
};

export const heroParagraphs = [
  `In the last decade, hospitals have seen charges come ever more and with rising costs, shortage of trained staff, and tightening of billing regulations, RCM is here to be an extension of your team and free the time to practicing care for patients.`,
  `Revenue Cycle Management is defined as a process of identifying errors of claims, appealing denied claims, and keeping up with patient's insurance eligibility at every touchpoint where the patient and providers intersect, resulting in smoother payment to match your healthcare system's unique requirements.`,
  `A discerning healthcare payments lifecycle begins with admission of a patient or encounter and finishes up till all the claims are accurately paid in full. Our team gives you the authority of medical procedures, quality care, and effective revenue cycle software together.`
];


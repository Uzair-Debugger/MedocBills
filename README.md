# 🏥 MedocBills – Healthcare RCM & Medical Billing Platform

**MedocBills** is a modern, SEO-optimized, full-stack web application built for a Healthcare Revenue Cycle Management (RCM) and Medical Billing company. It features a highly animated, accessible public-facing website to attract healthcare clients, alongside a secure, role-based Admin Dashboard to manage job postings, candidate applications, and client inquiries.

## Live Demo

- Website: [www.medocbills.com](https://www.medocbills.com)

## Preview

![MedocBills Main Page](public/main.png)

## 🌟 Key Features

### 🌐 Public-Facing Website
- **Dynamic UI & Animations:** Smooth, scroll-triggered animations and interactive carousels powered by Framer Motion.
- **Service Portfolios:** Dedicated sections for Medical Billing, Coding, Credentialing, and Telehealth Billing.
- **Careers & Recruitment:** Live job board with real-time search, detailed job views, and a secure application form with resume/cover letter uploads.
- **Advanced SEO:** Fully optimized with dynamic metadata, `sitemap.xml`, `robots.txt`, and JSON-LD Structured Data (Organization, MedicalBusiness, FAQ, JobPosting) for rich search results.
- **Interactive Contact Forms:** Service inquiry forms with automated email confirmations via the Resend API.

### 🛡️ Admin Dashboard (Protected)
- **Secure Authentication:** NextAuth.js integration supporting Credentials and GitHub OAuth, with JWT-based session management.
- **Job Management (CRUD):** Create, edit, and publish job listings with custom deadlines and statuses.
- **Application Tracking:** Review candidate submissions, view uploaded resumes, and update hiring statuses (Pending, Interview, Selected, etc.).
- **Email History:** Track all outbound automated emails (application receipts, status updates, inquiry confirmations) and their delivery statuses.
- **Role-Based Routing:** Middleware-protected `/admin/*` routes ensuring only authorized personnel can access the dashboard.

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React |
| **Backend / API** | Next.js Route Handlers, Zod (Schema Validation), Resend (Transactional Email) |
| **Database & ORM** | PostgreSQL, Prisma ORM |
| **Authentication** | NextAuth.js (Credentials + GitHub), JWT, Bcrypt |
| **Cloud Storage** | AWS S3-Compatible API (for secure Resume/Cover Letter uploads) |
| **SEO & Analytics** | JSON-LD Structured Data, Vercel Analytics, Dynamic OpenGraph/Twitter Cards |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & npm
- PostgreSQL Database (Local or Cloud like Supabase/Neon)
- S3-Compatible Storage (e.g., Supabase Storage, AWS S3)
- Resend API Key (for email delivery)

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/medocbills"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_super_secret_key"
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"

# S3 Storage (Resumes/Cover Letters)
S3_ENDPOINT="https://your-s3-endpoint.com"
S3_ACCESS_KEY_ID="your_access_key"
S3_SECRET_ACCESS_KEY="your_secret_key"
S3_BUCKET="your_bucket_name"

# Email (Resend)
RESEND_API_KEY="re_your_resend_api_key"
EMAIL_FROM="MedocBills <onboarding@resend.dev>"
```

### 3. Database Setup
```bash
npx prisma migrate dev --name init
npx prisma db seed # Seeds the initial Admin user
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

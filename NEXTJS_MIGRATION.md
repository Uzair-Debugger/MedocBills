# MedocBills — Next.js Migration Roadmap

High-level phased roadmap for migrating the Vite + React SPA to Next.js App Router.

---

## Phase 1: Initial Next.js Migration (Design Parity)
**Goal:** Port the existing Vite SPA to Next.js with zero visual or functional changes. Every page, animation, form, and route must behave identically to the current build.

- Scaffold a Next.js App Router project (TypeScript, Tailwind CSS, ESLint) alongside the existing Vite project.
- Remove all Vite-specific configuration: `vite.config.js`, `tsconfig.node.json`, root `index.html`, `vite-env.d.ts`, and Vite devDependencies.
- Migrate the existing theme system (`:root` CSS variables and `@theme` block) into `app/globals.css` so all Tailwind utility classes (`bg-primary`, `text-secondary`, etc.) work without modification.
- Port all static data, types, and utility functions from `src/constants/` and `src/utils/` into the Next.js project as-is.
- Convert every existing page into a Next.js route file (`app/page.tsx`, `app/services/page.tsx`, etc.) with `'use client'` boundaries only where state or browser APIs are used.
- Replace `react-router-dom` with Next.js file-system routing. Every existing route (`/`, `/services`, `/contactus`, `/about`, `/career`, `/clients`) must resolve correctly.
- Replace `react-helmet-async` with Next.js Metadata API and `<Script>` tags so per-page SEO, canonical URLs, Open Graph, Twitter Cards, and JSON-LD structured data render server-side.
- Replace all `<img>` tags with `next/image` and configure remote image patterns for external assets (Unsplash).
- Remove `vercel.json` SPA rewrites and rely on Next.js native routing.
- Verify production build parity: `next build` succeeds, all 6 routes render, and Lighthouse scores meet or exceed the current Vite baseline.

---

## Phase 2: Component Architecture Refactor
**Goal:** Transform the migrated code into a clean, reusable, and maintainable component library without changing the shipped UI.

- Consolidate the three overlapping icon systems (custom SVGs, lazy-loaded lucide via Suspense, and name-based `IconFromData`) into a single unified approach. Remove dead code and unnecessary `<Suspense>` boundaries.
- Delete duplicate components (`Animation.tsx` vs `AnimatedSection.tsx`) and standardize on one intersection-observer animation primitive.
- Audit and remove all dead links and unused routes (e.g., `/consultation`, `/specialties/*`) to prevent 404s.
- Extract repeated layout patterns (forms, cards, sections, CTAs) into shared, well-typed components with clear prop interfaces.
- Standardize client/server component boundaries: move pure presentational components to Server Components by default; mark interactive pieces with `'use client'` only.
- Fix hardcoded inconsistencies (contact info, phone numbers, brand copy) by centralizing content in a single source of truth.
- Introduce a barrel-export strategy for shared components and utilities to simplify imports.
- Run a full regression pass to confirm zero visual or behavioral changes from Phase 1.

---

## Phase 3: Performance & Asset Optimization
**Goal:** Leverage Next.js built-in optimizations to improve Core Web Vitals and reduce bundle size.

- Migrate font loading from manual `<link>` tags in HTML to `next/font` (Google Fonts + local custom fonts) for zero layout shift.
- Apply `next/image` optimizations: add `placeholder="blur"` and `blurDataURL` for hero images, tune `sizes` attributes, and verify AVIF/WebP serving.
- Analyze bundle composition with `@next/bundle-analyzer`. Ensure vendor libraries (React, Framer Motion, Lucide) are automatically code-split by route.
- Remove any remaining Vite-specific polyfills or type references from `tsconfig.json`.
- Optimize Framer Motion usage: replace manual `requestAnimationFrame` counters with `useMotionValue` / `useTransform` where appropriate.
- Validate LCP < 2.5s, FID < 100ms, and CLS < 0.1 across all pages in production mode.

---

## Phase 4: SEO & Structured Data Hardening
**Goal:** Ensure every page has bulletproof server-rendered SEO and structured data.

- Audit and validate JSON-LD schemas (Organization, FAQPage, JobPosting, MedicalBusiness) using Google Rich Results Test.
- Ensure all metadata (title, description, canonical, OG, Twitter) is generated server-side with no client-side hydration mismatch.
- Implement a consistent metadata strategy: organization-level defaults in root `layout.tsx`, page-level overrides in each `page.tsx`.
- Add `sitemap.ts` and `robots.ts` route handlers for dynamic sitemap and robots.txt generation.
- Set up canonical URL logic to prevent duplicate content issues across routes.
- Run a full Lighthouse SEO audit (target >= 90 on all pages).

---

## Phase 5: Testing, Validation & Deployment
**Goal:** Establish confidence in the migrated codebase and ship to production.

- Build and run a manual regression checklist covering all routes, animations, forms, carousels, search/filter, FAQ accordion, and mobile navigation.
- Run accessibility audits (axe DevTools, Lighthouse) and fix any contrast, focus, or keyboard-navigation violations.
- Deploy to a Vercel preview environment and validate automatic Next.js detection, build logs, and route behavior.
- Run production SEO validation with curl / view-source to confirm metadata and JSON-LD are present in raw HTML.
- Promote preview to production via PR merge. Monitor Vercel Analytics and error rates for 24-48 hours.
- Archive the old Vite branch and update `README.md` with Next.js setup, run, and deploy instructions.

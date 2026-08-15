# Phase 1: Initial Next.js Migration (Design Parity) — Step-by-Step Execution Plan

**Source of Truth:** `NEXTJS_MIGRATION.md` Phase 1  
**Goal:** Port the existing Vite SPA to Next.js with zero visual or functional changes.  
**Estimated effort:** 2–3 days for 1 senior developer.  
**Working directory:** `D:\MedocBills-Healthcare--main`

---

## Prerequisites

- Node.js 18+ installed and active.
- npm available.
- Current Vite project builds and runs cleanly (`npm run build` succeeds, `npm run preview` works).
- A feature branch created from `main`: `git checkout -b feat/nextjs-migration-phase1`.
- Team has access to the repo and a Vercel preview environment (or local Next.js production testing).

---

## Step 1: Scaffold Next.js App Router Project

**Actions:**
1. Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm`.
   - When prompted about existing files, merge carefully. Keep existing `src/` data but allow Next.js to overwrite root config files (`tsconfig.json`, `package.json`, etc.).
2. If `create-next-app` refuses to run in a non-empty directory, create in a temp folder and copy files:
   - `npx create-next-app@latest tmp-next --typescript --tailwind --eslint --app --use-npm`
   - Copy `tmp-next/package.json`, `tmp-next/tsconfig.json`, `tmp-next/postcss.config.js`, `tmp-next/next.config.js`, `tmp-next/app/` skeleton into the project root.
   - Delete `tmp-next/`.
3. Install dependencies: `npm install`.
4. Verify the dev server starts: `npm run dev` → `http://localhost:3000`.

**Breaking changes / cautions:**
- `create-next-app` will overwrite `tsconfig.json` and `package.json`. Backup or note current versions before running.
- The `--no-src-dir` flag places `app/` at the project root. If the team prefers `src/app/`, adjust paths accordingly, but be consistent.

**Validation checkpoint 1:**
- [ ] `npm run dev` starts without errors.
- [ ] Visiting `http://localhost:3000` shows the default Next.js landing page.
- [ ] `npm run build` completes successfully.
- [ ] `npm start` serves the built app without runtime errors.

---

## Step 2: Remove Vite-Specific Configuration and Artifacts

**Actions:**
1. Delete the following files (do not skip):
   - `vite.config.js`
   - `tsconfig.node.json`
   - `index.html` (root-level Vite shell)
   - `src/vite-env.d.ts`
2. Delete duplicate CSS files:
   - `src/App.css`
   - `src/global.css`
3. Update `src/index.css`:
   - Remove `@import 'tailwindcss';` if `app/globals.css` already imports it.
   - Keep only the `:root` CSS variables and `@theme` block. Delete any duplicate utility classes (`.maroon`, `.c_green`, `.brooklyn`, `.input`, `body { font-family }`) that are now in `globals.css`.
4. Uninstall Vite packages:
   - `npm uninstall vite @vitejs/plugin-react vite-bundle-analyzer terser @tailwindcss/vite`
5. Remove Vite-specific scripts from `package.json` (`dev`, `build`, `preview`).
6. Confirm `tsconfig.json` has:
   - `"types": ["node"]` (replace any `"vite/client"`)
   - `"moduleResolution": "bundler"`
   - No references to `vite` or `vite/client`.

**Breaking changes / cautions:**
- Any import referencing `src/App.css` or `src/global.css` will break. Ensure `main.tsx` and all entry points only import `src/index.css`.
- If `tsconfig.json` had custom path aliases, they must be replicated in `next.config.js` or the imports will fail.

**Validation checkpoint 2:**
- [ ] `vite.config.js`, `tsconfig.node.json`, root `index.html`, `src/vite-env.d.ts`, `src/App.css`, and `src/global.css` do not exist.
- [ ] `npm run dev` starts cleanly with no “module not found” errors for deleted files.
- [ ] `npm run build` succeeds.

---

## Step 3: Migrate Tailwind Theme System to `app/globals.css`

**Actions:**
1. Create `app/globals.css` (if `create-next-app` did not create it).
2. Add the following content:
   - `@import "tailwindcss";`
   - The `:root` CSS variable block from `src/index.css`.
   - The `@theme` block from `src/index.css`.
3. Ensure `app/layout.tsx` imports `./globals.css`.
4. Verify Tailwind classes in the codebase resolve correctly:
   - `bg-primary` → should map to `#8B1538`
   - `text-secondary` → should map to `#1B7C8C`
   - `bg-white`, `text-black`, etc. → standard Tailwind utilities should work.

**Breaking changes / cautions:**
- If Tailwind v4 PostCSS plugin is not configured, custom theme tokens will not generate. Ensure `postcss.config.js` exists with:
  ```js
  module.exports = {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  }
  ```
- If using Tailwind v3, the `@theme` block syntax is invalid. This project uses Tailwind v4 (`@tailwindcss/vite` was v4), so PostCSS plugin must be v4.

**Validation checkpoint 3:**
- [ ] `app/globals.css` exists and imports `tailwindcss`.
- [ ] `app/layout.tsx` imports `./globals.css`.
- [ ] Starting `npm run dev` shows the site (or a blank page if no content yet) with correct colors.
- [ ] Inspecting an element with `bg-primary` in dev tools shows the expected `rgb(139, 21, 56)` value.

---

## Step 4: Port Static Data, Types, and Utilities

**Actions:**
1. Copy `src/constants/` into the Next.js project (keep at `src/constants/` or move to `lib/constants/` — do not change imports yet).
2. Copy `src/utils/` into the Next.js project.
3. Copy `src/helper/` into the Next.js project.
4. Verify imports resolve:
   - `import { navItems } from '../constants/data'` should work from `src/pages/` or `app/`.
   - If using `src/app/`, adjust relative paths or configure `@/*` path alias in `tsconfig.json` and `next.config.js`.
5. Ensure image imports in `src/constants/data.ts` (e.g., `import Image1 from '../assets/Hero/1.webp'`) still resolve. If `next/image` is used later, these may need to become `import Image1 from '@/assets/Hero/1.webp'` with a path alias.

**Breaking changes / cautions:**
- If `create-next-app` used `--no-src-dir`, the existing `src/` folder is fine. If it used `src/`, paths may already align.
- If the team uses path aliases (`@/`), ensure `tsconfig.json` and `next.config.js` both define them identically.

**Validation checkpoint 4:**
- [ ] All imports from `constants/`, `utils/`, and `helper/` resolve without TypeScript errors.
- [ ] `npm run build` compiles all files without “module not found” errors.

---

## Step 5: Convert Pages to Next.js Routes

**Actions:**
1. Create the directory structure under `app/`:
   ```
   app/
   ├── layout.tsx
   ├── page.tsx
   ├── services/
   │   └── page.tsx
   ├── contactus/
   │   └── page.tsx
   ├── about/
   │   └── page.tsx
   ├── career/
   │   └── page.tsx
   └── clients/
       └── page.tsx
   ```
2. For each existing page file in `src/pages/`:
   a. Copy the file contents into the corresponding `app/.../page.tsx`.
   b. Add `'use client';` at the very top **only** if the component uses:
      - `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`
      - Browser APIs (`window`, `document`, `IntersectionObserver`, `requestAnimationFrame`)
      - Event handlers (`onClick`, `onChange`, `onSubmit`)
   c. If a page is purely presentational with no state (rare in this codebase), leave it as a Server Component (no directive).
3. For the home page (`app/page.tsx`), copy `src/pages/Hero.tsx` contents. This file uses extensive client-side state, so it **must** have `'use client';`.
4. For `app/layout.tsx`:
   - Import `./globals.css`.
   - Create a root `<html>` and `<body>` wrapper.
   - Do **not** wrap in `<BrowserRouter>` or `<HelmetProvider>`.
   - Do **not** import `react-router-dom`.
   - Example structure:
     ```tsx
     import type { Metadata } from 'next';
     import './globals.css';

     export const metadata: Metadata = {
       title: 'MedocBills | US Healthcare and IT Solutions',
       description: 'MedocBills provides reliable medical billing services...',
     };

     export default function RootLayout({ children }: { children: React.ReactNode }) {
       return (
         <html lang="en">
           <body>{children}</body>
         </html>
       );
     }
     ```

**Breaking changes / cautions:**
- `react-router-dom` imports (`Link`, `NavLink`, `Routes`, `Route`, `BrowserRouter`) will fail. Do not import them in any page or component.
- `Helmet` from `react-helmet-async` will fail. Remove all `<Helmet>` blocks from pages in this step; SEO migration happens in Step 6.
- `window.location.href` in `Career.tsx` will fail during SSR. Wrap the component in `'use client'` and replace with `useRouter().push()` later (Step 6 or Phase 2).

**Validation checkpoint 5:**
- [ ] `app/layout.tsx` exists and renders without errors.
- [ ] `app/page.tsx` and all 5 sub-route pages exist.
- [ ] Visiting `/`, `/services`, `/contactus`, `/about`, `/career`, `/clients` in dev mode loads the correct page content (even if styling or SEO is incomplete).
- [ ] No runtime errors about `react-router-dom` or `react-helmet-async` in the browser console.
- [ ] `npm run build` completes without server/client boundary errors.

---

## Step 6: Replace Routing and Navigation

**Actions:**
1. Audit every component and page for `react-router-dom` usage. Search the entire `src/` directory:
   ```bash
   grep -r "react-router-dom" src/
   ```
2. Replace routing imports:
   - `import { Link, NavLink } from 'react-router-dom'` → `import Link from 'next/link'`
   - `import { useNavigate } from 'react-router-dom'` → `import { useRouter } from 'next/navigation'`
3. Replace JSX:
   - `<Link to="/services">` → `<Link href="/services">`
   - `<NavLink to="/about" className={...}>` → `<Link href="/about" className={...}>` (active state logic must be rewritten using `usePathname` if needed).
4. Fix dead links identified in Phase 0 cleanup:
   - `/consultation` → `/contactus` or remove.
   - `/contact` → `/contactus`.
   - `/specialties/*` → remove or create placeholder route.
5. Update `Navbar.tsx`:
   - Import `usePathname` from `next/navigation`.
   - Implement active link highlighting by comparing `pathname` to `item.path`.

**Breaking changes / cautions:**
- `NavLink`'s `className={({ isActive }) => ...}` API does not exist in Next.js `Link`. Active state must be computed manually via `usePathname()`.
- `<BrowserRouter>` must be completely removed from the app. It cannot wrap Server Components.
- Any `navigate("/path")` calls must become `router.push("/path")`.

**Validation checkpoint 6:**
- [ ] `grep -r "react-router-dom" src/` returns zero results.
- [ ] All internal navigation links use `next/link`.
- [ ] Clicking nav links updates the URL without a full page reload.
- [ ] Mobile menu open/close still works.
- [ ] Active nav link highlighting works (or is gracefully absent if not yet implemented).

---

## Step 7: Replace `react-helmet-async` with Next.js Metadata API

**Actions:**
1. For each page that currently uses `<Helmet>` (`Services.tsx`, `Contactus.tsx`, `Aboutus.tsx`, `Career.tsx`, `Clients.tsx`):
   a. Remove the `import { Helmet } from 'react-helmet-async'` statement.
   b. Remove all `<Helmet>...</Helmet>` JSX blocks.
   c. Add a `generateMetadata()` export at the bottom of the file (or top, after `'use client'`).
   d. Map the old `<Helmet>` content to Next.js `Metadata` type:
      - `<title>` → `title`
      - `<meta name="description">` → `description`
      - `<link rel="canonical" href="...">` → `canonical`
      - `<meta property="og:title">` → `openGraph.title`
      - `<meta name="twitter:card">` → `twitter.card`
   Example:
   ```tsx
   export const metadata = {
     title: 'Medical Billing Services | MedocBills',
     description: 'Explore MedocBills\' comprehensive medical billing...',
     canonical: 'https://www.medocbills.com/services',
     openGraph: {
       title: 'Medical Billing Services | MedocBills',
       description: 'Comprehensive healthcare billing solutions...',
       url: 'https://www.medocbills.com/services',
       type: 'website',
     },
     twitter: {
       card: 'summary_large_image',
       title: 'Medical Billing Services | MedocBills',
       description: 'Comprehensive healthcare billing solutions...',
     },
   };
   ```
2. For the home page (`app/page.tsx`), add `export const metadata = { ... }` with the home page SEO content.
3. For the root `app/layout.tsx`, add organization-level metadata defaults (title template, OG defaults).

**Breaking changes / cautions:**
- `generateMetadata` can be async. If metadata depends on runtime data, use `generateMetadata()` function; otherwise, a static `export const metadata` object is simpler.
- JSON-LD structured data is **not** handled by the Metadata API. It must be migrated to `<Script type="application/ld+json">` in Step 8.
- If a page needs both metadata and client-side interactivity, `export const metadata` works at the top of a `'use client'` file in Next.js 14+. Verify this works; if not, move metadata to a parent Server Component.

**Validation checkpoint 7:**
- [ ] No `<Helmet>` imports remain in the codebase.
- [ ] Each page exports `metadata` (or `generateMetadata`).
- [ ] Viewing page source (or using `curl`) shows correct `<title>` and `<meta>` tags in raw HTML.
- [ ] No hydration warnings related to `<head>` in the browser console.

---

## Step 8: Migrate JSON-LD Structured Data to `<Script>` Tags

**Actions:**
1. For each page with JSON-LD schemas, import `Script` from `next/script`:
   ```tsx
   import Script from 'next/script';
   ```
2. Replace old `<script type="application/ld+json">{JSON.stringify(schema)}</script>` blocks (which were inside `<Helmet>`) with:
   ```tsx
   <Script
     type="application/ld+json"
     strategy="beforeInteractive"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
   />
   ```
   - Use `strategy="afterInteractive"` for non-critical schemas (FAQ, JobPosting).
   - Use `strategy="beforeInteractive"` for critical schemas (Organization, MedicalBusiness).
3. Add the organization schema to `app/layout.tsx` so it appears on every page.

**Breaking changes / cautions:**
- `dangerouslySetInnerHTML` is required because `<Script>` with JSON content cannot use children.
- Ensure schemas are plain objects (no circular references). The existing schemas in `data.ts` are plain objects, so this is safe.
- In Server Components, `<Script>` with `type="application/ld+json"` does **not** require `'use client'`. Keep pages as Server Components where possible, or add `'use client'` only if the page already needs it for other reasons.

**Validation checkpoint 8:**
- [ ] All JSON-LD schemas render in raw HTML (view-source).
- [ ] Google Rich Results Test passes for `/services` (FAQPage) and `/career` (JobPosting).
- [ ] No hydration warnings related to `<script>` tags.

---

## Step 9: Replace `<img>` Tags with `next/image`

**Actions:**
1. Audit all `<img>` tags across pages and components. Common locations:
   - `Hero.tsx` (slide images)
   - `Contactus.tsx` (background image, contact info icons)
   - `Services.tsx` (doctor images)
   - `Clients.tsx` (Unsplash image)
   - `Navbar.tsx` and `Footer.tsx` (logo)
2. Replace each `<img>` with `next/image` `<Image>`:
   ```tsx
   import Image from 'next/image';
   ```
3. For local assets (`.webp`, `.png`):
   - Keep the import: `import Logo from '@/assets/logo.webp'` (ensure path alias `@` is configured).
   - Use:
     ```tsx
     <Image src={Logo} alt="MedocBills Logo" width={182} height={48} priority />
     ```
4. For remote assets (Unsplash):
   - Add to `next.config.js`:
     ```js
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'images.unsplash.com',
         },
       ],
     }
     ```
   - Use:
     ```tsx
     <Image
       src="https://images.unsplash.com/photo-..."
       alt="..."
       width={800}
       height={500}
       loading="lazy"
     />
     ```
5. For background images (e.g., `Contactus.tsx` uses `style={{ backgroundImage: ... }}`), keep the inline style or use a `<div>` with a `bg-image` class. `next/image` does not support CSS background images.

**Breaking changes / cautions:**
- `next/image` requires `width` and `height` (or `fill` + relative parent). Missing props will throw build errors.
- `next/image` in Server Components requires `remotePatterns` for external URLs. Missing config will throw build errors.
- If images are imported from `src/assets/`, ensure the Next.js bundler resolves them. If not, move assets to `public/` or configure `webpack` in `next.config.js`.

**Validation checkpoint 9:**
- [ ] All `<img>` tags are replaced with `<Image>` (except iframes and CSS backgrounds).
- [ ] `next.config.js` includes `images.remotePatterns` for Unsplash.
- [ ] Hero images load correctly in dev and production.
- [ ] Logo images render without layout shift.
- [ ] `npm run build` completes without image-related errors.

---

## Step 10: Remove `vercel.json` SPA Rewrites

**Actions:**
1. Delete `vercel.json` from the project root.
2. Verify `package.json` does not reference `vercel.json` in scripts.
3. If any custom redirects were defined in `vercel.json`, move them to `next.config.js`:
   ```ts
   redirects: async () => {
     return [
       {
         source: '/contact',
         destination: '/contactus',
         permanent: true,
       },
     ];
   },
   ```
4. If no custom redirects are needed, no replacement is required.

**Breaking changes / cautions:**
- Removing `vercel.json` means Vercel will auto-detect Next.js. This is desired behavior.
- If the project uses a custom Vercel configuration for environment variables or region, those must be moved to Vercel project settings or `next.config.js`.

**Validation checkpoint 10:**
- [ ] `vercel.json` is deleted.
- [ ] `npm run build` succeeds.
- [ ] If redirects were needed, they work in dev (`npm run dev`) and production.

---

## Step 11: Final Build Parity and Verification

**Actions:**
1. Run `npm run build`. Fix any TypeScript errors, build warnings, or lint errors.
2. Run `npm start` to serve the production build locally.
3. Create a manual regression checklist and verify each item:
   - [ ] Home page loads with hero slider, testimonial carousel, client base section, services preview, why-choose section, medical specialties grid, and callback form.
   - [ ] `/services` loads with services grid, stats counters, doctors slider, and FAQ accordion.
   - [ ] `/contactus` loads with contact form, validation, and background image.
   - [ ] `/about` loads with hero, leadership, pillars, stats, solutions, and CTA.
   - [ ] `/career` loads with search, job cards, and why-join section.
   - [ ] `/clients` loads with hero, services, RCM steps, why-choose, key points, and CTA.
   - [ ] Navbar is sticky, mobile menu opens/closes, outside click closes menu, ESC closes menu.
   - [ ] Footer contact form validates and submits.
   - [ ] All animations trigger on scroll (IntersectionObserver).
   - [ ] Framer Motion slider auto-advances and manual controls work.
   - [ ] FAQ accordion toggles open/closed.
   - [ ] Career search filters jobs in real-time.
   - [ ] No console errors in production mode.
4. Run Lighthouse (Chrome DevTools) on each page in production mode:
   - Performance: target ≥ 90 (or match/exceed current Vite baseline).
   - SEO: target ≥ 90.
   - Accessibility: target ≥ 90.
5. Compare bundle size: check `.next/static/chunks/` to ensure no unexpectedly large bundles.

**Breaking changes / cautions:**
- Framer Motion animations may behave differently in Next.js if `'use client'` boundaries are missing or inconsistent. Watch for hydration mismatches.
- `requestAnimationFrame` in the `Counter` component may warn if executed during SSR. Ensure the `Counter` component is inside a `'use client'` file.
- If images are missing `width`/`height`, `next/image` will throw during build, not just in dev.

**Validation checkpoint 11 (Phase 1 gate):**
- [ ] `npm run build` completes with zero errors and zero warnings.
- [ ] All 6 routes render correctly in production mode (`npm start`).
- [ ] No console errors in production.
- [ ] Lighthouse scores meet or exceed current Vite baseline.
- [ ] No visual regressions compared to the Vite build.
- [ ] All forms, carousels, sliders, accordions, and animations function identically.
- [ ] Team sign-off that Phase 1 is complete and ready for Phase 2.

---

## Potential Breaking Changes Summary

| Area | Risk | Mitigation |
|------|------|-----------|
| `react-router-dom` removal | High — routing breaks everywhere | Replace with `next/link` and `next/navigation` immediately; search/replace across codebase. |
| `react-helmet-async` removal | Medium — SEO metadata missing | Replace with `export const metadata` per page and `<Script>` for JSON-LD. Validate with view-source. |
| Vite config deletion | High — build fails | Ensure all Vite deps are uninstalled and `tsconfig.json` is updated before deleting configs. |
| CSS file consolidation | Low — styles break | Keep `src/index.css` as single source of truth until `globals.css` is verified. |
| `<img>` → `<Image>` | Medium — layout shift or build errors | Always specify `width` and `height`. Use `priority` for above-the-fold images. |
| `window.location.href` in Career | Medium — SSR crash or full reload | Wrap Career page in `'use client'` and replace with `useRouter().push()` in Phase 2 (or immediately if it blocks build). |
| Font loading changes | Low — FOUC or layout shift | Use `next/font` in Phase 3; for Phase 1, keep manual `<link>` tags in `layout.tsx` to preserve current behavior. |

---

## Rollback Strategy

If Phase 1 encounters an unrecoverable blocker:
1. Keep the `feat/nextjs-migration-phase1` branch untouched.
2. Continue development on `main` (Vite) if urgent fixes are needed.
3. Return to Phase 1 after resolving blockers. Do not proceed to Phase 2 until all validation checkpoints pass.

---

## Next Steps After Phase 1

Once all validation checkpoints pass, proceed to **Phase 2: Component Architecture Refactor** as defined in `NEXTJS_MIGRATION.md`.

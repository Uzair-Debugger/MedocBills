import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { SITE_CONFIG } from '@/src/constants/seo';

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_CONFIG.url}/`,
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/`,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}

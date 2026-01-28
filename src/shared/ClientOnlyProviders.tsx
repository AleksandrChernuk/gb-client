'use client';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClarityInit from '@/shared/ui/ClarityInit';
import ProfileCheckProvider from '@/shared/providers/ProfileCheck.provider';
import LocationsInitializer from '@/entities/locations/LocationsInitializer';

export default function ClientOnlyProviders() {
  return (
    <>
      <ProfileCheckProvider />
      <LocationsInitializer />
      <Toaster richColors position="top-center" closeButton duration={4000} />

      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MXK3BV2C'} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-QL65KW5KP6'} />

      <SpeedInsights />
      <ClarityInit />
    </>
  );
}

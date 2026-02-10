'use client';

import dynamic from 'next/dynamic';

import { GoogleTagManager } from '@next/third-parties/google';

const Toaster = dynamic(() => import('sonner').then((m) => m.Toaster), { ssr: false });
const LocationsInitializer = dynamic(() => import('@/entities/locations/LocationsInitializer'), { ssr: false });
const ProfileCheckProvider = dynamic(() => import('@/shared/providers/ProfileCheck.provider'), { ssr: false });

export default function ClientOnlyProviders() {
  return (
    <>
      <ProfileCheckProvider />
      <LocationsInitializer />
      <Toaster richColors position="top-center" closeButton duration={4000} />

      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MXK3BV2C'} />
    </>
  );
}

'use client';

import { BusLoader } from '@/shared/ui/BusLoader';
import dynamic from 'next/dynamic';

const CheckoutForm = dynamic(() => import('./ui/Form'), {
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <BusLoader />
    </div>
  ),
  ssr: false,
});

export default CheckoutForm;

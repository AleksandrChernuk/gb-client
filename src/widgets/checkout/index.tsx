'use client';

import { BusLoader } from '@/shared/ui/BusLoader';
import dynamic from 'next/dynamic';

const CheckoutForm = dynamic(() => import('./ui/Form'), {
  loading: () => (
    <div className="flex items-center justify-center flex-1">
      <BusLoader />
    </div>
  ),
  ssr: false,
});

export default CheckoutForm;

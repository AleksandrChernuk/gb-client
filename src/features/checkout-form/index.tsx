'use client';

import LoaderPage from '@/entities/checkout/LoaderPage';
import dynamic from 'next/dynamic';

const CheckoutForm = dynamic(() => import('./ui/Form'), {
  loading: () => <LoaderPage />,
  ssr: false,
});

export default CheckoutForm;

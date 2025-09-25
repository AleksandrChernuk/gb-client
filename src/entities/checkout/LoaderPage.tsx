import { BusLoader } from '@/shared/ui/BusLoader';
import React from 'react';

export default function LoaderPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <BusLoader />
    </div>
  );
}

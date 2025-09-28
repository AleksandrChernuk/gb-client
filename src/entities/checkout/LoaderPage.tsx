import { BusLoader } from '@/shared/ui/BusLoader';
import React from 'react';

export default function LoaderPage() {
  return (
    <div className="flex items-center justify-center flex-1">
      <BusLoader />
    </div>
  );
}

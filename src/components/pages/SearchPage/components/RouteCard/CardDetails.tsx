 import DetailsAmenities from '@/components/pages/SearchPage/components/Details/DetailsAmenities';
import DetailsBus from '@/components/pages/SearchPage/components/Details/DetailsBus';
import DetailsDiscounts from '@/components/pages/SearchPage/components/Details/DetailsDiscounts';
import DetailsInfo from '@/components/pages/SearchPage/components/Details/DetailsInfo';
import DetailsLuggage from '@/components/pages/SearchPage/components/Details/DetailsLuggage';
import DetailsReturnPolicy from '@/components/pages/SearchPage/components/Details/DetailsReturnPolicy';
import DetailsStops from '@/components/pages/SearchPage/components/Details/DetailsStops';
import React from 'react';

export default function CardDetails() {
  return (
    <div className='mt-8 grid grid-cols-2 gap-2'>
      <div className='space-y-4'>
        <DetailsInfo />
        <DetailsStops />
      </div>
      <div className='space-y-2'>
        <DetailsLuggage />
        <DetailsReturnPolicy />
        <DetailsAmenities />
        <DetailsDiscounts />
        <DetailsBus />
      </div>
    </div>
  );
}

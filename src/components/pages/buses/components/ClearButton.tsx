'use client';

import { Button } from '@/components/ui/button';
import { useRoutesStore } from '@/store/useRouter';
import React from 'react';

export default function ClearButton() {
  const resetSortBy = useRoutesStore((state) => state.resetSortBy);

  return (
    <Button variant={'link'} onClick={() => resetSortBy()}>
      Clear all
    </Button>
  );
}

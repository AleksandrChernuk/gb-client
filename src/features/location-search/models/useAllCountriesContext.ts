'use client';

import { AllCountriesContext } from '@/features/location-search/AllCountriesProvider';
import { useContext } from 'react';

export const useAllCountries = () => {
  const ctx = useContext(AllCountriesContext);
  if (!ctx) {
    throw new Error('useAllCountries must be used within AllCountriesProvider');
  }
  return ctx;
};

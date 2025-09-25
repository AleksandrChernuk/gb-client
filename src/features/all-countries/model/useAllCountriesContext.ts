'use client';

import { useContext } from 'react';
import { AllCountriesContext } from './AllCountriesProvider';

export const useAllCountriesContext = () => {
  const ctx = useContext(AllCountriesContext);
  if (!ctx) {
    throw new Error('useAllCountriesContext must be used within AllCountriesProvider');
  }
  return ctx;
};

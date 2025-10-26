'use server';

import { IProviderRoutes } from '@/shared/types/providerRoutes-interface';
import { IGetRouteDetailsBody, IGetRoutesBody, IRouteDetailsResponse } from '@/shared/types/route.types';

const BASE_URL = 'https://greenbus-backend.onrender.com/api/v1';

export const getRoutes = async (body: IGetRoutesBody): Promise<IProviderRoutes[]> => {
  const response = await fetch(`${BASE_URL}/routes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error');
  }

  const data = await response.json();
  return data;
};

export const getRouteDetails = async (body: IGetRouteDetailsBody): Promise<IRouteDetailsResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/routes/route-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching route details:', error);
    return null;
  }
};

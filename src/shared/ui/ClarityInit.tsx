'use client';
import Clarity from '@microsoft/clarity';
import { useEffect } from 'react';

export default function ClarityInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(process.env.NEXT_PUBLIC_CLARITY);
      Clarity.init(process.env.NEXT_PUBLIC_CLARITY!);
    }
  }, []);

  return null;
}

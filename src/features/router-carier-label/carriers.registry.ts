import { IconKLR } from '@/assets/icons/IconKLR';

export const CARRIER_REGISTRY = [
  {
    match: (name: string) => name.includes('klr bus'),
    Logo: IconKLR,
  },
  ,
] as const;

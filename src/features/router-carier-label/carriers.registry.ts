import { PROVIDERS } from '@/features/router-carier-label/providers.constants';

export const CARRIER_REGISTRY = [
  {
    provider: PROVIDERS.STECIK,
    match: (name: string) => name.includes(PROVIDERS.STECIK.toLowerCase().trim()),
    logoSrc: '/images/zubustik.png',
    alt: 'zubustik',
  },
  {
    provider: PROVIDERS.TRANSTEMPO,
    match: (name: string) => name.includes(PROVIDERS.TRANSTEMPO.toLowerCase().trim()),
    logoSrc: '/images/transtempo.png',
    alt: 'transtempo',
  },
  {
    provider: PROVIDERS.PAVLUK,
    match: (name: string) => name.includes(PROVIDERS.PAVLUK.toLowerCase().trim()),
    logoSrc: '/images/pavluks-trans.png',
    alt: 'pavluks-trans',
  },
  {
    provider: PROVIDERS.TUCAN,
    match: (name: string) => name.includes(PROVIDERS.TUCAN.toLowerCase().trim()),
    logoSrc: '/images/tucan.png',
    alt: 'tucan',
  },
  {
    provider: PROVIDERS.ZESEN,
    match: (name: string) => name.includes(PROVIDERS.ZESEN.toLowerCase().trim()),
    logoSrc: '/images/zesen.png',
    alt: 'ZESEN',
  },

  {
    provider: PROVIDERS.VTS,
    match: (name: string) => name.includes(PROVIDERS.VTS.toLowerCase().trim()),
    logoSrc: '/images/vts.png',
    alt: 'VTS',
  },
  {
    provider: PROVIDERS.ORIONBUS,
    match: (name: string) => name.includes(PROVIDERS.ORIONBUS.toLowerCase().trim()),
    logoSrc: '/images/orionbus.png',
    alt: 'orionbus',
  },
  {
    provider: PROVIDERS.LIKEBUS,
    match: (name: string) => name.includes(PROVIDERS.LIKEBUS.toLowerCase().trim()),
    logoSrc: '/images/likeBus.png',
    alt: 'likeBus',
  },
  {
    provider: PROVIDERS.MUSILTOUR,
    match: (name: string) => name.includes(PROVIDERS.MUSILTOUR.toLowerCase().trim()),
    logoSrc: '/images/east.png',
    alt: 'MUSILTOUR',
  },
  {
    provider: PROVIDERS.EWE,
    match: (name: string) => name.includes(PROVIDERS.EWE.toLowerCase().trim()),
    logoSrc: '/images/ewe.png',
    alt: 'ewe',
  },
  {
    provider: PROVIDERS.DMD,
    match: (name: string) => name.includes(PROVIDERS.DMD.toLowerCase().trim()),
    logoSrc: '/images/dmd.png',
    alt: 'dmd',
  },
  {
    provider: PROVIDERS.KLR,
    match: (name: string) => name.includes(PROVIDERS.KLR.toLowerCase().trim()),
    logoSrc: '/images/klr.png',
    alt: 'klr',
  },
  {
    provider: PROVIDERS.VASILKIV,
    match: (name: string) => name.includes(PROVIDERS.VASILKIV.toLowerCase().trim()),
    logoSrc: '/images/vasilkiv.png',
    alt: 'VASILKIV',
  },
  {
    provider: PROVIDERS.REGA,
    match: (name: string) => name.includes(PROVIDERS.REGA.toLowerCase().trim()),
    logoSrc: '/images/rega.png',
    alt: 'regabus',
  },
  {
    provider: PROVIDERS.PROSTOBUS,
    match: (name: string) => name.includes(PROVIDERS.PROSTOBUS.toLowerCase().trim()),
    logoSrc: '/images/prostobus.png',
    alt: 'prostobus',
  },

  {
    provider: PROVIDERS.SEMBUS,
    match: (name: string) => name.includes(PROVIDERS.SEMBUS.toLowerCase().trim()),
    logoSrc: '/images/sembus.png',
    alt: 'sembus',
  },

  {
    provider: PROVIDERS.VITALTRANS,
    match: (name: string) => name.includes(PROVIDERS.VITALTRANS.toLowerCase().trim()),
    logoSrc: '/images/vilartrans.png',
    alt: 'VITALTRANS',
  },
] as const;

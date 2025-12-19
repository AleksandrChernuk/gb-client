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
    match: (name: string) =>
      ['EAST WEST EUROLINES/ТзОВ "Гал-Всесвіт"', PROVIDERS.EWE].some((alias) =>
        name.includes(alias.toLowerCase().trim()),
      ),
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

  {
    provider: PROVIDERS.MONOBUS,
    match: (name: string) => name.includes(PROVIDERS.MONOBUS.toLowerCase().trim()),
    logoSrc: '/images/MONOBUS.png',
    alt: 'VITALTRANS',
  },

  {
    provider: PROVIDERS.LUXBUS,
    match: (name: string) => name.includes(PROVIDERS.LUXBUS.toLowerCase().trim()),
    logoSrc: '/images/luxbus.png',
    alt: 'luxbus',
  },
  {
    provider: PROVIDERS.TOUR,
    match: (name: string) => name.includes(PROVIDERS.TOUR.toLowerCase().trim()),
    logoSrc: '/images/tour.png',
    alt: 'tour',
  },
  {
    provider: PROVIDERS.KANTOL,
    match: (name: string) => name.includes(PROVIDERS.KANTOL.toLowerCase().trim()),
    logoSrc: '/images/kantol.png',
    alt: 'KANTOL',
  },

  {
    provider: PROVIDERS.ELITEXPRESS,
    match: (name: string) => name.includes(PROVIDERS.ELITEXPRESS.toLowerCase().trim()),
    logoSrc: '/images/elittrans.png',
    alt: 'ELITEXPRESS',
  },
  {
    provider: PROVIDERS.TERNVOYAGE,
    match: (name: string) => name.includes(PROVIDERS.TERNVOYAGE.toLowerCase().trim()),
    logoSrc: '/images/elittrans.png',
    alt: 'ternvoyage',
  },
  {
    provider: PROVIDERS.ZTIME,
    match: (name: string) => name.includes(PROVIDERS.ZTIME.toLowerCase().trim()),
    logoSrc: '/images/ztime.png',
    alt: 'ZTIME',
  },
  {
    provider: PROVIDERS.BORYSPIL,
    match: (name: string) => name.includes(PROVIDERS.BORYSPIL.toLowerCase().trim()),
    logoSrc: '/images/boryspil.png',
    alt: 'boryspil',
  },
  {
    provider: PROVIDERS.LIS,
    match: (name: string) => name.includes(PROVIDERS.LIS.toLowerCase().trim()),
    logoSrc: '/images/lisautotrans.png',
    alt: 'LIS',
  },
  {
    provider: PROVIDERS.PANBUS,
    match: (name: string) => name.includes(PROVIDERS.PANBUS.toLowerCase().trim()),
    logoSrc: '/images/panbus.png',
    alt: 'panbus',
  },
  {
    provider: PROVIDERS.MAXBUS,
    match: (name: string) => name.includes(PROVIDERS.MAXBUS.toLowerCase().trim()),
    logoSrc: '/images/maxbus.png',
    alt: 'maxbus',
  },
  {
    provider: PROVIDERS.VOLYNEXPRESS,
    match: (name: string) => name.includes(PROVIDERS.VOLYNEXPRESS.toLowerCase().trim()),
    logoSrc: '/images/volynekspres.png',
    alt: 'VOLYNEXPRESS',
  },
  {
    provider: PROVIDERS.MUSTANG,
    match: (name: string) => name.includes(PROVIDERS.MUSTANG.toLowerCase().trim()),
    logoSrc: '/images/mustang.png',
    alt: 'mustang',
  },
  {
    provider: PROVIDERS.ITRAVELBUS,
    match: (name: string) => name.includes(PROVIDERS.ITRAVELBUS.toLowerCase().trim()),
    logoSrc: '/images/itravelbus.png',
    alt: 'ITRAVELBUS',
  },
  {
    provider: PROVIDERS.ATLASTRAVELBUS,
    match: (name: string) => name.includes(PROVIDERS.ATLASTRAVELBUS.toLowerCase().trim()),
    logoSrc: '/images/atlastravelbus.png',
    alt: 'ATLASTRAVELBUS/AVTOEKSPRES',
  },
  {
    provider: PROVIDERS.KAZNA,
    match: (name: string) => name.includes(PROVIDERS.KAZNA.toLowerCase().trim()),
    logoSrc: '/images/cazna.png',
    alt: 'KAZNA',
  },
  {
    provider: PROVIDERS.EUROVOYAGE,
    match: (name: string) => name.includes(PROVIDERS.EUROVOYAGE.toLowerCase().trim()),
    logoSrc: '/images/eurovoyage.png',
    alt: 'eurovoyage',
  },
  {
    provider: PROVIDERS.SUNSUN,
    match: (name: string) => name.includes(PROVIDERS.SUNSUN.toLowerCase().trim()),
    logoSrc: '/images/sunsunbus.png',
    alt: 'SUNSUN',
  },
] as const;

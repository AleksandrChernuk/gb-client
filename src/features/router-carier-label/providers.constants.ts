export const PROVIDERS = {
  STECIK: 'СТЕЦИК Т.В. ФОП',
  TRANSTEMPO: 'ТрансТемпо',
  PAVLUK: 'Павлюкс-Транс',
  TUCAN: 'TocoBus',
  ZESEN: 'ТОВ МКТ Зесен Транс',
  VTS: 'ВолодимирецьТрансСервіс',
  ORIONBUS: 'orionbus',
  LIKEBUS: 'LIKEBUS',
  MUSILTOUR: 'Musil Tour',
  EWE: 'EAST WEST EUROLINES/ТзОВ "Львівське АТП-14631',
  DMD: 'D.M.D. Group',
  KLR: 'KLR Bus',
} as const;

export type ProviderName = (typeof PROVIDERS)[keyof typeof PROVIDERS];

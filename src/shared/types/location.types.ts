export interface ILocationQueryParams {
  query?: string;
  page?: number;
  perPage?: number;
}

export interface ILocationDetails {
  locationName: string;
  locationType: string;
  countryName: string;
  regionName: string;
}

export interface ILocation {
  id: number;
  locationTypeId: number;
  timezoneId: number;
  lat: number;
  lon: number;
  isFavorite: boolean;
  countryId: number;
  regionId: number;
  createdAt: Date;
  updatedAt: Date;
  translations: ILocationTranslations[];
  locationType: ILocationType;
  timezone: ITimezone;
  country: ICountry;
  region: IRegion;
}

export interface ILocationTranslations {
  id: number;
  language: string;
  locationName: string;
  locationId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILocationType {
  id: number;
  defaultType: string;
  createdAt: Date;
  updatedAt: Date;
  translations: ILocationTypeTranslations[];
}

export interface ILocationTypeTranslations {
  id: number;
  language: string;
  typeName: string;
  locationTypeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITimezone {
  id: number;
  zoneName: string;
  code: string;
  utcOffsetMinutes: number;
  dstOffsetMinutes: number;
  isDst: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICountry {
  id: number;
  code: string;
  currencyId: number;
  createdAt: Date;
  updatedAt: Date;
  translations: ICountryTranslations[];
}

export interface ICountryTranslations {
  id: number;
  language: string;
  countryName: string;
  countryFullName: string;
  countryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegion {
  id: number;
  code: string;
  countryId: number;
  createdAt: Date;
  updatedAt: Date;
  translations: IRegionTranslations[];
}

export interface IRegionTranslations {
  id: number;
  language: string;
  regionName: string;
  regionId: number;
  createdAt: Date;
  updatedAt: Date;
}

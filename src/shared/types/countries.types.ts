import { ILocation } from '@/shared/types/location.types';

export interface ICountryTranslation {
  id: number;
  language: string;
  countryName: string;
  countryFullName: string;
  countryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICountryDescription {
  language: string;
  description: string;
}

export interface ICurrency {
  id: number;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRegionTranslation {
  id: number;
  language: string;
  regionName: string;
  regionId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICountryPhoto {
  [key: string]: unknown;
}

export interface ICountryRegion {
  id: number;
  code: string;
  countryId: number;
  createdAt: string;
  updatedAt: string;
  translations: IRegionTranslation[];
}

export interface ICountry {
  id: number;
  code: string;
  currencyId: number;
  createdAt: string;
  updatedAt: string;
  translations: ICountryTranslation[];
  description: ICountryDescription[];
  currency: ICurrency;
  regions: ICountryRegion[];
  locations: ILocation[];
  countryPhotos: ICountryPhoto[];
}

export type ICountryListItem = Omit<ICountry, 'regions' | 'description' | 'currency' | 'locations' | 'countryPhotos'>;

export interface ICountriesResponse {
  data: ICountry[];
  totalCountries: number;
  page: number;
  perPage: number;
  totalPages: number;
}

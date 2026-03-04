import { ILocation } from './location.types';

export interface IFavoriteRouteBySlugParams {
  slug: string;
}

export interface IFavoriteRouteSlug {
  slug: string;
}

export interface IFavoriteRouteDescription {
  language: string;
  description: string;
}

export interface IFavoriteRoute {
  id: number;
  slug: string;
  fromLocation: ILocation;
  toLocation: ILocation;
  description: IFavoriteRouteDescription[];
  price?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface IFavoriteRoutesResponse {
  data: IFavoriteRoute[];
  totalFavoriteRoutes: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface IFavoriteRouteCreate {
  slug: string;
  fromLocationId: number;
  toLocationId: number;
  price?: number;
  description?: IFavoriteRouteDescription[];
}

export interface IFavoriteRouteUpdate {
  description?: IFavoriteRouteDescription[];
  price?: number | null;
}

export interface IFavoriteRouteDeleteResponse {
  success: boolean;
  id: number;
}

export interface IArticleRequest {
  slug: string;
  hashtags: string[];
  descriptions: IArticleDescription[];
  photos?: IArticlePhoto[];
  countryId?: number;
  locationId?: number;
}

interface IArticleDescription {
  language: string;
  title: string;
  description: string;
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

interface IArticlePhoto {
  url: string;
  alt: string;
  order?: number;
  isCover?: boolean;
}

export type IUpdateArticle = Partial<IArticleRequest>;

export interface IFindAllArticlesOptions {
  page?: number;
  perPage?: number;
  language?: string;
  countryId?: number;
  locationId?: number;
  hashtag?: string;
}

export interface IArticleResponse {
  slug: string;
  id: number;
  hashtags: string[];
  descriptions: IArticleDescriptionResponse[];
  photos: IArticlePhotoResponse[];
  countryId: number | null;
  locationId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface IArticleDescriptionResponse {
  id: number;
  language: string;
  title: string;
  description: string;
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  articleId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IArticlePhotoResponse {
  id: number;
  url: string;
  alt: string;
  order: number;
  isCover: boolean;
  articleId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TGetArticlesResponse = {
  data: IArticleResponse[];
  pagination?: { page: number; perPage: number; totalPages: number };
};

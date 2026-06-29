export interface IAuthorNameTranslation {
  language: string;
  authorName: string;
}

export interface IAuthorRoleTranslation {
  language: string;
  authorRole: string;
}

export interface IAuthorBioTranslation {
  language: string;
  authorBio: string;
}

export interface IAuthorCredentialsTranslation {
  language: string;
  authorCredentials: string;
}

export interface IAuthorSocialLink {
  socialName: string;
  socialLink: string;
}

export interface IAuthorArticleDescription {
  language: string;
  title: string;
}

export interface IAuthorArticle {
  id: number;
  slug: string;
  descriptions: IAuthorArticleDescription | null;
}

export interface IAuthorSimpleResponse {
  id: number;
  slug: string;
  name: IAuthorNameTranslation | null;
  role: IAuthorRoleTranslation | null;
  photo: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface IAuthorFullResponse {
  id: number;
  slug: string;
  name: IAuthorNameTranslation | null;
  role: IAuthorRoleTranslation | null;
  bio: IAuthorBioTranslation | null;
  credentials: IAuthorCredentialsTranslation | null;
  socialLinks: IAuthorSocialLink[];
  photo: string | null;
  articles: IAuthorArticle[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindAllAuthorsOptions {
  language?: string;
  query?: string;
  page?: number;
  perPage?: number;
}

export type TGetAuthorsResponse = {
  data: IAuthorSimpleResponse[];
  totalAuthors: number;
  page: number;
  perPage: number;
  totalPages: number;
};

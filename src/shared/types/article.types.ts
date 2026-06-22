// ===== Запросы (create / update) =====
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
  authorId?: number;
  hashtag?: string;
}

// ===== Автор в составе статьи (локализованный, лёгкий) =====
export interface IArticleAuthorName {
  language: string;
  authorName: string;
}

export interface IArticleAuthorRole {
  language: string;
  authorRole: string;
}

export interface IArticleAuthor {
  id: number;
  slug: string;
  name: IArticleAuthorName | null;
  role: IArticleAuthorRole | null;
  photo: string | null;
}

// ===== Лёгкий ответ списка статей (GET /articles) =====
export interface IArticleListItemTexts {
  title: string;
  description: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface IArticleListItemPhoto {
  url: string;
  alt: string;
}

export interface IArticleListItem {
  id: number;
  slug: string;
  hashtags: string[];
  texts: IArticleListItemTexts;
  photo: IArticleListItemPhoto | null;
  authorId: number | null;
  author: IArticleAuthor | null;
  ratingAverage: string;
  createdAt: Date;
  updatedAt: Date;
}

// ===== Полный ответ статьи (GET /articles/:slug) =====
export interface IArticleFullDescription {
  language: string;
  title: string;
  description: string;
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface IArticlePhotoResponse {
  id: number;
  url: string;
  alt: string;
  order: number;
  isCover: boolean;
  articleId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IArticleResponse {
  id: number;
  slug: string;
  hashtags: string[];
  descriptions: IArticleFullDescription[];
  photos: IArticlePhotoResponse[];
  countryId: number | null;
  locationId: number | null;
  authorId: number | null;
  author: IArticleAuthor | null;
  ratingAverage: string;
  createdAt: Date;
  updatedAt: Date;
}

// ===== Ответ списка с плоской пагинацией =====
export type TGetArticlesResponse = {
  data: IArticleListItem[];
  totalArticles: number;
  page: number;
  perPage: number;
  totalPages: number;
};

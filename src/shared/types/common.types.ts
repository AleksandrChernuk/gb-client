export type Params = Promise<{ lng: string; email?: string }>;

export type TParams = { params: Promise<{ lng: string }> };

export type TLng = Promise<{ lng: string }>;

export type TSearchParams = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export type TSParams = Promise<Record<string, string | string[] | undefined>>;

export type TSlug = Promise<{ slug: string }>;

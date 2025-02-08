export const locales = ["en", "ru", "uk"] as const;

export const defaultLocale = "uk" as const;

export type Locale = (typeof locales)[number];

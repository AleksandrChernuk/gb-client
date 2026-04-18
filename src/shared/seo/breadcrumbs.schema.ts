type BreadcrumbItem = {
  name: string;
  url: string;
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[], lang?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(lang ? { inLanguage: lang } : {}),
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        // Для последней крошки (текущая страница) item не обязателен
        ...(isLast ? {} : { item: item.url }),
      };
    }),
  };
}

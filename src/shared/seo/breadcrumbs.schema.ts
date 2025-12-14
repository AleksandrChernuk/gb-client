type BreadcrumbItem = {
  name: string;
  url: string;
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[], lang?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(lang ? { inLanguage: lang } : {}),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

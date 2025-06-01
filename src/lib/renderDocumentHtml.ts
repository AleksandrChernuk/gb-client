export function renderDocumentHtml(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (key.endsWith('_title')) {
        return `<h2>${value}</h2>`;
      }
      const clean = value.replace(/^<h[34][^>]*>|<\/h[34]>$/gi, '');
      return `<p>${clean}</p>`;
    })
    .join('\n');
}

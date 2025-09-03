export function sanitizeEmail(input: unknown): string {
  if (typeof input !== 'string') return '';

  const s = input
    .normalize('NFKC')
    .replace(/[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g, '')
    .trim();

  const at = s.lastIndexOf('@');
  if (at === -1) return '';

  if (at === 0 || at === s.length - 1) return '';

  const local = s.slice(0, at);
  const domain = s.slice(at + 1).toLowerCase();

  // Базовая проверка домена
  if (!domain || !domain.includes('.')) return '';

  return `${local}@${domain}`;
}

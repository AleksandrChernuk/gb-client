export function sanitizeUsername(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .normalize('NFKC')
    .replace(/[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

export const USERNAME_RX = /^[\p{L}\p{M}]+(?:[ \u2011\-’'][\p{L}\p{M}]+)*$/u;

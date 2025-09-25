import { MAX_LOCATION_DESC_LEN } from '@/shared/configs/limitsChar';
import * as sanitizeHtml from 'sanitize-html';

export function sanitizePlainText(input: unknown, maxLen = MAX_LOCATION_DESC_LEN, keepNewlines = false): string {
  if (typeof input !== 'string') return '';
  let s = input;
  if (/%[0-9a-f]{2}/gi.test(s) && s !== decodeURIComponent(s)) {
    try {
      s = decodeURIComponent(s);
    } catch {}
  }
  s = sanitizeHtml.default(s, { allowedTags: [], allowedAttributes: {} });
  s = s.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '');
  s = s.replace(/[\u200B-\u200D\uFEFF]/g, '');
  s = s.normalize('NFKC');
  s = keepNewlines
    ? s
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    : s.replace(/\s+/g, ' ').trim();
  if (s.length > maxLen) s = s.slice(0, maxLen);
  return s;
}

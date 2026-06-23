import fs from 'node:fs';
import path from 'node:path';
import { FavoriteRouteNotFoundError, isFavoriteRouteNotFoundError } from '@/shared/api/favoriteRoutes.server';

function readProjectFile(filePath: string) {
  return fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
}

describe('regression guards', () => {
  describe('FavoriteRouteNotFoundError', () => {
    it('is recognized by type guard and rejected for other error types', () => {
      const err = new FavoriteRouteNotFoundError('kyiv-prague');

      expect(isFavoriteRouteNotFoundError(err)).toBe(true);
      expect(isFavoriteRouteNotFoundError(new Error('generic error'))).toBe(false);
      expect(isFavoriteRouteNotFoundError('string error')).toBe(false);
      expect(isFavoriteRouteNotFoundError(null)).toBe(false);
      expect(isFavoriteRouteNotFoundError(undefined)).toBe(false);
    });

    it('includes the slug in the error message', () => {
      const err = new FavoriteRouteNotFoundError('kyiv-prague');

      expect(err.message).toContain('kyiv-prague');
      expect(err.name).toBe('FavoriteRouteNotFoundError');
    });
  });

  describe('getAllFavoriteRoutes pagination', () => {
    it('uses cache-safe pagination while still walking all favorite-route pages', () => {
      const src = readProjectFile('src/shared/api/favoriteRoutes.server.ts');

      // Keep each response under the Next data cache limit; the loop still walks every backend page.
      expect(src).not.toMatch(/perPage:\s*10[^0]/);
      expect(src).toMatch(/perPage:\s*20/);
      expect(src).toContain('while (page <= totalPages');
    });
  });

  describe('FaqSearch form', () => {
    it('reads initial value from URL search params instead of always starting empty', () => {
      const src = readProjectFile('src/features/faq-search/ui/FaqSeach.tsx');

      expect(src).toContain('useSearchParams');
      expect(src).toContain("searchParams.get('q')");
      expect(src).toContain('defaultValues: { query: searchParams.get');
    });

    it('syncs form value when URL search params change', () => {
      const src = readProjectFile('src/features/faq-search/ui/FaqSeach.tsx');

      expect(src).toContain('useEffect');
      expect(src).toContain('form.setValue');
      expect(src).toContain('[searchParams]');
    });

    it('navigates to clean URL when input is cleared, removing ?q= from the address bar', () => {
      const src = readProjectFile('src/features/faq-search/ui/FaqSeach.tsx');

      expect(src).toContain("router.push('/faq/search')");
      expect(src).toContain('handleChange');
    });

    it('does not reset the form after submit, keeping the query visible in the input', () => {
      const src = readProjectFile('src/features/faq-search/ui/FaqSeach.tsx');

      expect(src).not.toContain('form.reset()');
    });
  });
});

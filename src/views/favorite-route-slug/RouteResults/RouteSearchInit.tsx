'use client';

import { useEffect } from 'react';
import { useQueryStates, parseAsString } from 'nuqs';

interface RouteSearchInitProps {
  from?: number | null;
  to?: number | null;
}

// Якщо на сторінку маршруту зайшли без from/to (чисте посилання /routes/{slug}/),
// підставляємо id міст з даних маршруту в URL (history: replace) — щоб форма
// заповнилась і рейси з цінами завантажились автоматично. URL-канонікал лишається
// чистим, query-версія має noindex.
export function RouteSearchInit({ from, to }: RouteSearchInitProps) {
  const [q, setQ] = useQueryStates({ from: parseAsString, to: parseAsString }, { history: 'replace' });

  useEffect(() => {
    if (from && to && !q.from && !q.to) {
      setQ({ from: String(from), to: String(to) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

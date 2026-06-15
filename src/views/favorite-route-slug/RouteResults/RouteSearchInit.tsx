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

  // Залежність від from/to: при клієнтській навігації між маршрутами компонент
  // не перемонтовується, тож ефект із [] раніше спрацьовував лише після повного
  // перезавантаження. Тепер синхронізуємо URL щоразу, коли id міст маршруту
  // відрізняються від поточних параметрів.
  useEffect(() => {
    if (!from || !to) return;

    const nextFrom = String(from);
    const nextTo = String(to);

    if (q.from !== nextFrom || q.to !== nextTo) {
      setQ({ from: nextFrom, to: nextTo });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  return null;
}

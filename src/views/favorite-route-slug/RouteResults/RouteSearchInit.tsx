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

  // Підставляємо id міст маршруту, лише коли в URL немає from/to:
  //  • не перебиваємо ручний вибір користувача (тоді q.from/q.to вже не порожні);
  //  • q.from/q.to у залежностях самовідновлюють параметри після клієнтської
  //    навігації — роутер Next інколи фіналізує URL уже після ефекту й затирає
  //    запис (через це раніше працювало лише після повного перезавантаження).
  //    Щойно q знову порожній — ефект спрацьовує й вписує параметри. Без циклу:
  //    після успішного запису q заповнений і умова вже не виконується.
  useEffect(() => {
    if (from && to && !q.from && !q.to) {
      setQ({ from: String(from), to: String(to) });
    }
  }, [from, to, q.from, q.to, setQ]);

  return null;
}

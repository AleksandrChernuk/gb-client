'use client';

import { useLocale } from 'next-intl';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import TicketRouteMobile from '@/components/shared/TicketRouteMobile';
import { Skeleton } from '@/components/ui/skeleton';

export default function Trip() {
  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  const isHydrated = useCurrentTicketStore((state) => state.isHydrated);

  const locale = useLocale();

  return (
    <div>
      {isHydrated ? (
        <TicketRouteMobile route={selectedTicket} locale={locale} className="tablet:flex" />
      ) : (
        <Skeleton className="w-full h-28" />
      )}
    </div>
  );
}

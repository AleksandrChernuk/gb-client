'use client';

import { useCurrentTicket } from '@/store/useCurrentTicket';
import TicketRouteMobile from '@/components/shared/TicketRouteMobile';
import { Skeleton } from '@/components/ui/skeleton';

export default function Trip() {
  const selectedTicket = useCurrentTicket((state) => state.selectedTicket);
  const isHydrated = useCurrentTicket((state) => state.isHydrated);

  return (
    <div>
      {isHydrated ? (
        <TicketRouteMobile route={selectedTicket} className="tablet:flex" />
      ) : (
        <Skeleton className="w-full h-28" />
      )}
    </div>
  );
}

'use client';

import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import TicketRouteMobile from '@/components/shared/TicketRouteMobile';
import { Skeleton } from '@/components/ui/skeleton';

export default function Trip() {
  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  const isHydrated = useCurrentTicketStore((state) => state.isHydrated);

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

'use client';

import { useFilterTickets } from '@/shared/store/useFilterTickets';
import { TicketCard } from '@/features/ticket-card/TicketCard';

import { useSearchStore } from '@/shared/store/useSearch';
import useTicketsSearch from '@/shared/hooks/useTicketsSearch';
import { BusLoader } from '@/shared/ui/BusLoader';
import RouteNotFound from '@/shared/ui/RouteNotFound';
import { CustomError } from '@/entities/common/CustomError';

export default function ResultList() {
  const { isFetching, data, error } = useTicketsSearch();
  const filteredTickets = useFilterTickets((state) => state.filteredTickets);
  const isHydrated = useSearchStore((state) => state.isHydrated);
  const from = useSearchStore((state) => state.from);
  const to = useSearchStore((state) => state.to);

  if (isFetching || !isHydrated) {
    return <BusLoader className={'flex items-center justify-center my-2'} />;
  }

  if (error) return <CustomError />;

  if (!isFetching && data && data.length === 0) return <RouteNotFound text="no_travel" />;

  if (!from && !to) return <CustomError />;
  return (
    <div className="flex flex-col space-y-10">
      {filteredTickets.map((route) => {
        return <TicketCard key={`${route.ticketId}`} element={route} />;
      })}
    </div>
  );
}

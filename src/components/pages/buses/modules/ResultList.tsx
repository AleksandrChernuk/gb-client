'use client';

import { useFilterTickets } from '@/store/useFilterTickets';
import { TicketCard } from '@/components/modules/ticket-card';
import { BusLoader } from '../../../shared/BusLoader';
import { ErrorTravel } from '../components/ErrorTravel';
import { NoTravel } from '../components/NoTravel';
import useTicketsSearch from '../hooks/useTicketsSearch';
import { useSearchStore } from '@/store/useSearch';
import NoLocations from '../components/NoLocations';

export default function ResultList() {
  const { isFetching, data, error } = useTicketsSearch();
  const filteredTickets = useFilterTickets((state) => state.filteredTickets);
  const isHydrated = useSearchStore((state) => state.isHydrated);
  const from = useSearchStore((state) => state.from);
  const to = useSearchStore((state) => state.to);

  if (isFetching || !isHydrated) {
    return <BusLoader className={'flex items-center justify-center my-2'} />;
  }

  if (error) return <ErrorTravel />;

  if (!isFetching && data && data.length === 0) return <NoTravel />;

  if (!from && !to) return <NoLocations />;

  return (
    <div className="flex flex-col space-y-10">
      {filteredTickets.map((route) => {
        return <TicketCard key={`${route.ticket_id}`} element={route} />;
      })}
    </div>
  );
}

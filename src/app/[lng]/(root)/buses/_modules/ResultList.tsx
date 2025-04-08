'use client';

import { useFilterTicketsStore } from '@/store/useFilterTickets';
import { TicketCard } from '@/components/modules/ticket-card';
import useTicketsSearch from './hooks/useTicketsSearch';
import { Loader } from './components/Loader';
import { ErrorTravel } from './components/ErrorTravel';
import { NoTravel } from './components/NoTravel';

export default function ResultList() {
  const { isFetching, data, error } = useTicketsSearch();
  const filteredTickets = useFilterTicketsStore((state) => state.filteredTickets);

  if (isFetching) {
    return <Loader />;
  }

  if (error) return <ErrorTravel />;

  if (!isFetching && data && data.length === 0) return <NoTravel />;

  return (
    <div className="flex flex-col space-y-10">
      {filteredTickets.map((route) => {
        return <TicketCard key={`${route.ticket_id}`} element={route} />;
      })}
    </div>
  );
}

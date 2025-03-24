'use client';

import { Loader } from '../components/Loader';
import { NoTravel } from '../components/NoTravel';
import { ErrorTravel } from '../components/ErrorTravel';
import useTicketsSearch from '../hooks/useTicketsSearch';
import { useFilterTicketsStore } from '@/store/useFilterTickets';
import { TicketCard } from '@/components/modules/ticket-card';

export default function ResultList() {
  const { isFetching, data, error } = useTicketsSearch();
  const filteredTickets = useFilterTicketsStore((state) => state.filteredTickets);
  if (isFetching) {
    return <Loader />;
  }

  if (error) return <ErrorTravel />;

  if (!isFetching && data && data.length === 0) return <NoTravel />;

  return (
    <ul className="flex flex-col space-y-10">
      {filteredTickets.map((route) => {
        return <TicketCard key={`${route.ticket_id}`} element={route} />;
      })}
    </ul>
  );
}

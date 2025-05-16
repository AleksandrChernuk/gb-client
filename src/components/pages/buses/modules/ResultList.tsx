'use client';

import { useFilterTickets } from '@/store/useFilterTickets';
import { TicketCard } from '@/components/modules/ticket-card';
import { Loader } from '../components/Loader';
import { ErrorTravel } from '../components/ErrorTravel';
import { NoTravel } from '../components/NoTravel';
import useTicketsSearch from '../hooks/useTicketsSearch';

export default function ResultList() {
  const { isFetching, data, error } = useTicketsSearch();
  const filteredTickets = useFilterTickets((state) => state.filteredTickets);

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

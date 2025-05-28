'use client';

import { useFilterTickets } from '@/store/useFilterTickets';
import { TicketCard } from '@/components/modules/ticket-card';
import { BusLoader } from '../../../shared/BusLoader';
import { ErrorTravel } from '../components/ErrorTravel';
import { NoTravel } from '../components/NoTravel';
import useTicketsSearch from '../hooks/useTicketsSearch';

export default function ResultList() {
  const { isFetching, data, error } = useTicketsSearch();
  console.log(data);
  const filteredTickets = useFilterTickets((state) => state.filteredTickets);
  console.log(filteredTickets);

  if (isFetching) {
    return <BusLoader className={'flex items-center justify-center my-2'} />;
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

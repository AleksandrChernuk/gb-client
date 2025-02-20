import { IRouteResponse } from '@/types/route.types';
import {  TicketCard } from '../../../components/TicketCard';

type Props = {
  routersList: IRouteResponse[];
};
export default function TicketsList({ routersList }: Props) {
  return (
    <ul className='flex flex-col space-y-10'>
      {routersList.map((route, i) => {
        return <TicketCard key={`${route.identificators.route_id}_${i}`} element={route} />
      })}
    </ul>
  );
}

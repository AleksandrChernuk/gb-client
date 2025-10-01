import { IFreeSeats } from '@/shared/types/free.seats.interface';
import { TypeSeatsMap } from '@/shared/types/seat.interface';

type Props = {
  seatsMap?: TypeSeatsMap[] | null | string;
  freeSeats?: IFreeSeats[] | null;
  providerName?: string;
};

export const seatsMaper = ({ seatsMap, freeSeats }: Props): TypeSeatsMap[] => {
  if (!seatsMap || !Array.isArray(seatsMap) || !Array.isArray(freeSeats)) return [];

  return seatsMap.map((floor) => ({
    seats: floor.seats.map((row) =>
      row.map((seat) => {
        const isFree = freeSeats.some(
          (free) =>
            (seat.seatId && seat.seatId === free.seatId) ||
            (seat.seatNumber && seat.seatNumber === free.seatNumber?.toString()),
        );

        return {
          ...seat,
          isSelected: false,
          status: isFree ? 'FREE' : 'BUSY',
        };
      }),
    ),
  }));
};

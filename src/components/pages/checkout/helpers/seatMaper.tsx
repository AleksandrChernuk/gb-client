import { IFreeSeats } from '@/types/free.seats.interface';
import { SeatBlock } from '../types';
import { TypeSeatsMap } from '@/types/seat.interface';

type Props = {
  seatsMap?: TypeSeatsMap[] | null | string;
  freeSeats?: IFreeSeats[] | null;
  providerName?: string;
};

export const seatsMaper = ({ seatsMap, freeSeats }: Props): SeatBlock[] => {
  if (!Array.isArray(seatsMap) || !Array.isArray(freeSeats)) return [];

  return seatsMap.map((floor) => ({
    seats: floor.seats.map((row) =>
      row.map((seat) => {
        const isFree = freeSeats.some(
          (free) =>
            (seat.id && seat.id === free.seatId) || (seat.number && seat.number === free.seatNumber?.toString()),
        );

        return {
          ...seat,
          seatId: seat.id,
          seatNumber: seat.number,
          isSelected: false,
          status: isFree ? 'FREE' : 'BUSY',
        };
      }),
    ),
  }));
};

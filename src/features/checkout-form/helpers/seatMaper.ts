import { IFreeSeats } from '@/shared/types/free.seats.interface';
import { TypeSeatsMap } from '@/shared/types/seat.interface';

type Props = {
  seatsMap?: TypeSeatsMap[] | string | null;
  freeSeats?: IFreeSeats[] | null;
};

const seatsMapper = ({ seatsMap, freeSeats }: Props): TypeSeatsMap[] => {
  if (!Array.isArray(seatsMap) || !Array.isArray(freeSeats)) {
    return [];
  }

  return seatsMap.map((floor) => ({
    ...floor,
    seats: floor.seats.map((row) =>
      row.map((seat) => {
        const isFree = freeSeats.some((freeSeat) => {
          const matchById = seat.seatId && seat.seatId === freeSeat.seatId;
          const matchByNumber = seat.seatNumber && seat.seatNumber === freeSeat.seatNumber?.toString();
          return matchById || matchByNumber;
        });

        return {
          ...seat,
          isSelected: false,
          status: isFree ? 'FREE' : 'BUSY',
        };
      }),
    ),
  }));
};

export default seatsMapper;

import { IFreeSeats } from '@/shared/types/free.seats.interface';
import { TypeSeatsMap } from '@/shared/types/seat.interface';

type Props = {
  seatsMap?: TypeSeatsMap[] | string | null;
  freeSeatsMap?: IFreeSeats[] | null;
};

const seatsMapper = ({ seatsMap, freeSeatsMap }: Props): TypeSeatsMap[] => {
  if (!seatsMap || !freeSeatsMap || !Array.isArray(seatsMap) || !Array.isArray(freeSeatsMap)) {
    return [];
  }

  return seatsMap.map((floor) => {
    // Перевіряємо чи є seats і чи це масив
    if (!floor.seats || !Array.isArray(floor.seats)) {
      return floor;
    }

    return {
      ...floor,
      seats: floor.seats
        .filter((row) => row !== null && Array.isArray(row)) // Фільтруємо null елементи
        .map((row) =>
          row.map((seat) => {
            // Перевіряємо чи seat валідний
            if (!seat || !seat.seatId) {
              return {
                ...seat,
                isSelected: false,
                status: seat?.status || 'BUSY',
              };
            }

            const isFree = freeSeatsMap.some((freeSeat) => {
              const matchById = seat.seatId && seat.seatId === freeSeat.seatId;
              const matchByNumber =
                seat.seatNumber && freeSeat.seatNumber && seat.seatNumber === freeSeat.seatNumber.toString();
              return matchById || matchByNumber;
            });

            return {
              ...seat,
              isSelected: false,
              status: isFree ? 'FREE' : seat.status || 'BUSY',
            };
          }),
        ),
    };
  });
};

export default seatsMapper;

import { IFreeSeats } from '@/types/free.seats.interface';
import { TypeSeatsMap, ISeat } from '@/types/seat.interface';

type Props = {
  seatsMap?: TypeSeatsMap[] | null | string;
  freeSeats?: IFreeSeats[] | null;
  providerName?: string;
};

export const seatsMaper = ({ seatsMap, freeSeats, providerName }: Props): TypeSeatsMap[] => {
  if (providerName === 'INFOBUS') {
    if (!Array.isArray(freeSeats)) return [];

    const maxFreeSeatNumber = Math.max(80, ...freeSeats.map((s) => Number(s.seat_number)).filter((n) => !isNaN(n)));

    const totalSeats = maxFreeSeatNumber;
    const seatsPerRow = 5;
    const rowsPerFloor = 4;
    const seatsPerFloor = seatsPerRow * rowsPerFloor;
    const floorCount = Math.ceil(totalSeats / seatsPerFloor);

    const allSeats: ISeat[] = Array.from({ length: totalSeats }, (_, index) => {
      const seatNumber = (index + 1).toString();
      const isFree = freeSeats.some((free) => free.seat_number?.toString() === seatNumber);

      return {
        id: null,
        number: seatNumber,
        type: 'SEAT',
        coords: null,
        status: isFree ? 'FREE' : 'BUSY',
        isSelected: null,
      };
    });

    const generatedMap: TypeSeatsMap[] = [];

    for (let floorIndex = 0; floorIndex < floorCount; floorIndex++) {
      const floorSeats: ISeat[][] = [];

      const startIdx = floorIndex * seatsPerFloor;
      const endIdx = Math.min(startIdx + seatsPerFloor, allSeats.length);
      const floorSlice = allSeats.slice(startIdx, endIdx);

      for (let i = 0; i < floorSlice.length; i += seatsPerRow) {
        floorSeats.push(floorSlice.slice(i, i + seatsPerRow));
      }

      generatedMap.push({
        seats: floorSeats,
      });
    }

    return generatedMap;
  }

  if (!Array.isArray(seatsMap) || !Array.isArray(freeSeats)) return [];

  return seatsMap.map((floor) => ({
    seats: floor.seats.map((row) =>
      row.map((seat) => {
        const isFree = freeSeats.some(
          (free) =>
            (seat.id && seat.id === free.seat_id) || (seat.number && seat.number === free.seat_number?.toString()),
        );

        return {
          ...seat,
          status: isFree ? 'FREE' : 'BUSY',
        };
      }),
    ),
  }));
};

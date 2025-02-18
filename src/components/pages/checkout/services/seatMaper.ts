 import { IFreeSeats } from "@/types/free_seats-interface";
import { IRouteResponse } from "@/types/route.types";
import { ISeat } from "@/types/seat-interface";
import { v4 as uuidv4 } from 'uuid';


type NormalizeSeatsMap = {
  id: string | null;
  type: string | null;
  number: string | null;
  coords: string | null;
  status: string | null;
  floor: string | null;
  isSelected: boolean;
  free: boolean;
};


const getFreeSeatSet = (freeFseatsPmap: IFreeSeats[] | null | undefined) => {
  if (!freeFseatsPmap) return new Set<string>();

  const seats = freeFseatsPmap
    .map((freeSeat) => freeSeat.seat_coords || freeSeat.seat_number || freeSeat.seat_id || null)
    .filter(Boolean) as string[];

  return new Set(seats); // Преобразуем в Set для быстрого поиска
};

const mapSeats = (
  seats: ISeat[] | null,
  isFreeSeatNumber: Set<string> | null,
  shouldSortByCoords: boolean,
  shouldExcludePath: boolean,
) => {
  if (!seats) return [];

  // Фильтруем места с type: "path" (если требуется)
  const filteredSeats = shouldExcludePath ? seats.filter((seat) => seat.type === "seat") : seats;

  // Сортировка по координатам (если требуется)
  if (shouldSortByCoords) {
    filteredSeats.sort((a, b) => {
      const [rowA, colA] = a.coords ? a.coords.split(":").map(Number) : [0, 0];
      const [rowB, colB] = b.coords ? b.coords.split(":").map(Number) : [0, 0];

      if (rowA === rowB) {
        return colA - colB;
      }
      return rowA - rowB;
    });
  }

  // Разделяем на строки
  const arr: NormalizeSeatsMap[][] = [];
  const rowLength = Math.ceil(filteredSeats.length / 4);

  for (let row = 1; row <= rowLength; row += 1) {
    const rowSeats: NormalizeSeatsMap[] = [];

    for (let col = 0; col < 4; col += 1) {
      const seatNumber = (row - 1) * 4 + col;

      if (filteredSeats[seatNumber]) {
        const { id, type, number, coords, status, floor } = filteredSeats[seatNumber] as ISeat;

        rowSeats.push({
          id: id && uuidv4(),
          type,
          number,
          coords,
          status,
          floor,
          isSelected: false,
          free: isFreeSeatNumber ? isFreeSeatNumber.has(number || "") : false,
        });
      }
    }

    if (rowSeats.length > 0) {
      arr.push(rowSeats);
    }
  }

  return arr;
};

export const seatMaper = (route: IRouteResponse): NormalizeSeatsMap[][] => {
  const seats = Array.isArray(route.details?.seats_map) ? route.details?.seats_map : [];
  const freeSeatsMap = route.details?.free_seats_map;
  const isFreeSeatNumber = getFreeSeatSet(freeSeatsMap);

  switch (route.provider_name) {
    case "Octobus": {
      // Для Octobus сортировка по координатам и исключение "path" не нужны
      return mapSeats(seats, isFreeSeatNumber, false, false);
    }

     

    case "EWE": {
      // Для EWE нужна сортировка по координатам, но не нужно исключать "path"
      return mapSeats(seats, isFreeSeatNumber, true, false);
    }

    case "ODRI": {
      // Для ODRI нужно исключать "path" и сортировать по координатам
      return mapSeats(seats, isFreeSeatNumber, true, true);
    }

    default:
      return [];
  }
};


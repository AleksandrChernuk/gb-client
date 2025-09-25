export interface ISeat {
  seatId: string | null;
  type: 'SEAT' | 'NOT SEAT' | null;
  seatNumber: string | null;
  seatCoords: string | null;
  status: 'FREE' | 'BUSY' | null;
  isSelected: boolean | null;
}

export type ISeatRow = ISeat[];

export interface TypeSeatsMap {
  seats: ISeatRow[];
}

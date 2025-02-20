export interface ISeat {
  id: string | null;
  type: 'SEAT' | 'NOT SEAT' | null;
  number: string | null;
  coords: string | null;
  status: 'FREE' | 'BUSY' | null;
  isSelected: boolean | null;
}

export type ISeatRow = ISeat[];

export interface TypeSeatsMap {
  seats: ISeatRow[];
}

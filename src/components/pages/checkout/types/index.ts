export type TPassengersProps = {
  adult?: string;
  childrenPass?: string;
};

export type Seat = {
  id: string;
  type: string | null;
  number: string | null;
  coords: string | null;
  status: string | null;
  isSelected: boolean | null;
};

export type SeatRow = Seat[][];

export type SeatBlock = {
  seats: SeatRow;
};

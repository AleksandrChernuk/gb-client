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

export type Passenger = {
  firstName: '';
  isChildren: boolean;
  lastName: '';
  price: number;
  bday?: string;
  discount?: string;
  discountDescription?: string;
  discountId?: string;
  discountPercent?: string;
  documentType?: string;
  expiryDate?: string;
  gender?: 'M' | 'F';
  citizenship?: string;
  middlename?: string;
  documentNumber?: string;
};

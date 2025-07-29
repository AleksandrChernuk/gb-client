export type TPassengersProps = {
  adult?: string;
  childrenPass?: string;
};

export type ISeat = {
  seatId: string | null;
  type: string | null;
  seatNumber: string | null;
  coords: string | null;
  status: 'FREE' | 'BUSY';
  isSelected: boolean;
};

export type SeatRow = ISeat[];

export type SeatBlock = {
  seats: SeatRow[];
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

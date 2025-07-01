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
  first_name: '';
  isChildren: boolean;
  last_name: '';
  price: number;
  bday?: string;
  discount?: string;
  discount_description?: string;
  discount_id?: string;
  discount_percent?: string;
  document_type?: string;
  expiry_date?: string;
  gender?: 'M' | 'F';
  citizenship?: string;
  middlename?: string;
  document_number?: string;
};

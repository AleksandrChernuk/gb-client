import { IFreeSeats } from '@/shared/types/free.seats.interface';

export function getFreeSeatData(freeSeatItem: IFreeSeats | string | number | null | undefined): {
  seatId: string;
  seatNumber: string;
} {
  if (freeSeatItem == null) return { seatId: '', seatNumber: '' };

  if (typeof freeSeatItem === 'object') {
    const seatId = (freeSeatItem as Partial<IFreeSeats> & { seatId?: string | number }).seatId;
    const seatNumber = (freeSeatItem as Partial<IFreeSeats> & { seatNumber?: string | number }).seatNumber;
    return { seatId: String(seatId ?? ''), seatNumber: String(seatNumber ?? '') };
  }

  const seat = String(freeSeatItem);
  return { seatId: seat, seatNumber: seat };
}

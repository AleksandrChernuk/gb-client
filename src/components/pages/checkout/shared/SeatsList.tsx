/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { ISeat, ISeatRow } from '@/types/seat.interface';
import IconHelm from '../icons/IconHelm';
import { toast } from 'sonner';
import { memo, useState } from 'react';
import Seat from '../components/Seat';

type Props = {
  helm?: boolean;
  seatRows: ISeatRow[];
};

const SeatsList = memo(function SeatsList({ helm, seatRows }: Props) {
  const { control } = useFormContext();
  const [loadingSeatId, setLoadingSeatId] = useState<string | null>(null);

  const [selectedSeats, passengers] = useWatch({
    control,
    name: ['selected_seats', 'passengers'],
  });
  const passengersCount = passengers.length;

  const { append, remove } = useFieldArray({
    name: 'selected_seats',
    control: control,
  });

  const handleSetSeats = (seat: ISeat | null) => {
    if (!seat) return;

    const isSelectedIndex = selectedSeats.findIndex(
      (el: ISeat) => (seat.id && el.id === seat.id) || (seat.number && el.number === seat.number),
    );

    setLoadingSeatId(seat.id ?? null);

    if (isSelectedIndex !== -1) {
      remove(isSelectedIndex);
      setTimeout(() => {
        setLoadingSeatId(null);
      }, 1000);
      return;
    }

    if (selectedSeats.length < passengersCount) {
      append(seat);
      setTimeout(() => {
        setLoadingSeatId(null);
      }, 1000);
      return;
    }

    setLoadingSeatId(null);
    toast.error('Место выбрано');
  };

  return (
    <div className="mx-auto mt-5 mb-10 w-fit">
      <ul className="flex flex-col gap-4 px-2 tablet:px-4 py-4 tablet:p-8 border-2 w-full border-slate-200 dark:border-slate-700 rounded-[50px]">
        {helm && (
          <li className="pb-4 border border-b-slate-200 dark:border-b-slate-700 w-fit">
            <div className={`w-[72px] h-[72px] [&_svg]:fill-slate-200 dark:[&_svg]:fill-slate-700 mb-2`}>
              <IconHelm />
            </div>
          </li>
        )}
        {seatRows.map((row, rowIndex) => (
          <li key={rowIndex} className="flex justify-between gap-2 tablet:gap-1">
            {row.map((seat, seatIndex) =>
              seat.type ? (
                <Seat
                  onClick={() => handleSetSeats(seat)}
                  key={`${rowIndex}-${seatIndex}`}
                  seat_number={seat.number}
                  available={seat.type === 'SEAT' && seat.status === 'FREE'}
                  loading={loadingSeatId === seat.id}
                  isFree={seat.status === 'FREE'}
                  //@ts-ignore
                  isSelected={selectedSeats.some(
                    //@ts-ignore

                    (e) => (seat.id && e.id === seat.id) || (seat.number && e.number === seat.number),
                  )}
                />
              ) : (
                <div
                  key={`empty-${rowIndex}-${seatIndex}`}
                  className="w-[45px] h-[55px] tablet:w-[55px] tablet:h-[65px]"
                ></div>
              ),
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SeatsList;

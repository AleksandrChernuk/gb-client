/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { memo } from 'react';
import { ISeat, TypeSeatsMap } from '@/shared/types/seat.interface';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import Seat from '@/features/checkout-form/ui/Seat';
import IconHelm from '@/assets/icons/IconHelm';

type Props = {
  helm?: boolean;
  seatRows: TypeSeatsMap;
};

const SeatsList = memo(function SeatsList({ helm, seatRows }: Props) {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const { control } = useFormContext();

  const [selectedSeats, passengers] = useWatch({
    control,
    name: ['selectedSeats', 'passengers'],
  });
  const passengersCount = passengers.length;

  const { append, remove } = useFieldArray({
    name: 'selectedSeats',
    control: control,
  });

  const handleSetSeats = (seat: ISeat | null) => {
    if (!seat) return;

    const isSelectedIndex = selectedSeats.findIndex(
      (el: ISeat) =>
        (seat.seatId && el.seatId === seat.seatId) || (seat.seatNumber && el.seatNumber === seat.seatNumber),
    );

    if (isSelectedIndex !== -1) {
      remove(isSelectedIndex);

      return;
    }

    if (selectedSeats.length < passengersCount) {
      append(seat);

      return;
    }

    toast.error(t('deselect_seat'));
  };

  return (
    <div className="mx-auto mt-5 mb-10 w-fit">
      <ul className="flex flex-col gap-4 px-6 py-4 tablet:p-8 border-2 w-full border-slate-200 dark:border-slate-700 rounded-2xl">
        {helm && (
          <li className="pb-4 border border-b-slate-200 dark:border-b-slate-700 w-fit">
            <div className={`w-[72px] h-[72px] [&_svg]:fill-slate-200 dark:[&_svg]:fill-slate-700 mb-2`}>
              <IconHelm />
            </div>
          </li>
        )}
        {seatRows.seats.map((row, rowIndex) => (
          <li key={rowIndex} className="flex justify-between gap-2 tablet:gap-2">
            {row.map((seat, seatIndex) =>
              seat.type ? (
                <Seat
                  onClick={() => handleSetSeats(seat)}
                  key={`${rowIndex}-${seatIndex}`}
                  seatNumber={seat.seatNumber}
                  available={seat.type === 'SEAT' && seat.status === 'FREE'}
                  isFree={seat.status === 'FREE'}
                  //@ts-ignore
                  isSelected={selectedSeats.some(
                    //@ts-ignore

                    (e) =>
                      (seat.seatId && e.seatId === seat.seatId) ||
                      (seat.seatNumber && e.seatNumber === seat.seatNumber),
                  )}
                />
              ) : (
                <div
                  key={`empty-${rowIndex}-${seatIndex}`}
                  className="min-w-[20px] max-w-[45px] h-[55px] tablet:w-[55px] tablet:h-[65px]"
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

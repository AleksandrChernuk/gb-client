import { useFieldArray, useFormContext } from 'react-hook-form';
import { ISeat, ISeatRow } from '@/types/seat-interface';
import IconHelm from '../icons/IconHelm';
import Seat from './Seat';

type Props = {
  helm?: boolean;
  floorText?: string | false | undefined | null;
  seatRows: ISeatRow[];
};

export default function SeatsList({ floorText, helm, seatRows }: Props) {
  const { watch, control } = useFormContext();

  const { append, remove } = useFieldArray({
    name: 'selected_seats',
    control: control,
  });

  const handleSetSeats = (seat: ISeat | null) => {
    const selectedSeats = watch('selected_seats');
    const isSelectedIndex = selectedSeats.findIndex((el: ISeat) => el.id === seat?.id);
    const passengersCount = watch('passengers').length;
    if (isSelectedIndex !== -1) {
      remove(isSelectedIndex);
      return;
    }

    if (selectedSeats.length < passengersCount) {
      append(seat);
      return;
    }
  };

  return (
    <div className="mx-auto mb-10 last:mb-0 w-fit">
      <div className="mb-1 text-base font-bold leading-6 tracking-normal text-center text-slate-700 dark:text-slate-50">
        {floorText && <div>{floorText}</div>}
      </div>
      <ul className="flex flex-col gap-4 px-2 xs:px-4  md:px-8 py-8 tablet:p-8 border-2 w-full border-slate-200 dark:border-slate-700 rounded-[50px]">
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
                  isFree={seat.status === 'FREE'}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  isSelected={watch('selected_seats').some((e) => e.id === seat.id)}
                />
              ) : (
                <div
                  key={`empty-${rowIndex}-${seatIndex}`}
                  className="  w-[45px] h-[55px] tablet:w-[55px] tablet:h-[65px]"
                ></div>
              ),
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

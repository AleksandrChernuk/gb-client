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
    <div className="mb-10 last:mb-0 w-fit mx-auto">
      <div className="text-center h5 text-text_prymery mb-1">{floorText && <div>{floorText}</div>}</div>
      <ul className="flex flex-col gap-4 px-2 xs:px-4  md:px-8 py-8 tablet:p-8 border-2 w-full border-gray_1 dark:border-black_2_for_text rounded-[50px]">
        {helm && (
          <li className="pb-4 border border-b-gray_1 dark:border-b-black_2_for_text w-fit">
            <div className={`w-[72px] h-[72px] [&_svg]:fill-gray_1 dark:[&_svg]:fill-black_2_for_text mb-2`}>
              <IconHelm />
            </div>
          </li>
        )}
        {seatRows.map((row, rowIndex) => (
          <li key={rowIndex} className="flex gap-2 justify-between tablet:gap-1">
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

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { ISeat, ISeatRow } from '@/types/seat-interface';
import IconHelm from '../icons/IconHelm';
import Seat from './Seat';
import { toast } from 'sonner';

type Props = {
  helm?: boolean;
  seatRows: ISeatRow[];
};

export default function SeatsList({ helm, seatRows }: Props) {
  const { control } = useFormContext();
  const selectedSeats = useWatch({ control, name: 'selected_seats' });
  const passengersCount = useWatch({ control, name: 'passengers' }).length;

  const { append, remove } = useFieldArray({
    name: 'selected_seats',
    control: control,
  });

  const handleSetSeats = (seat: ISeat | null) => {
    const isSelectedIndex = selectedSeats.findIndex((el: ISeat) => el.id === seat?.id);

    if (isSelectedIndex !== -1) {
      remove(isSelectedIndex);
      return;
    }

    if (selectedSeats.length < passengersCount) {
      append(seat);
      return;
    }
    toast.error('Form Submitted:', {
      description: 'Max lengs',
      action: {
        label: 'Undo',
        onClick: () => console.log('Close'),
      },
    });
  };

  return (
    <div className="mx-auto mb-10 last:mb-0 w-fit">
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
                  isSelected={selectedSeats.some((e) => e.id === seat.id)}
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
}

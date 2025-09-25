import { Button } from '@/shared/ui/button';
import { ChevronDown } from 'lucide-react';

type Props = {
  isOpen?: boolean;
  text: string;
  onClick?: () => void;
};

export default function TicketDetailsButton({ isOpen, onClick, text }: Props) {
  return (
    <div className="items-center justify-center hidden tablet:flex tablet:order-2 tablet:justify-self-center">
      <Button
        variant={'link'}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
        className="flex items-center self-end gap-px p-2 underline cursor-pointer text-green-300 text-[12px] font-bold tracking-normal leading-[18px] text-nowrap"
      >
        <span>{text}</span>
        <ChevronDown
          size={16}
          className={`rotate-0 stroke-primary ${isOpen && 'rotate-180'} transition-all data-state:[:open]`}
        />
      </Button>
    </div>
  );
}

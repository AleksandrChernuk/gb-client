import { ChevronDown, Loader2 } from 'lucide-react';

interface TicketDetailsToggleProps {
  isOpen: boolean;
  toggleOpen: () => void;
  isLoading?: boolean;
  openText?: string;
  closeText?: string;
  className?: string;
  disabled?: boolean;
}

const TicketDetailsToggle: React.FC<TicketDetailsToggleProps> = ({
  isOpen,
  toggleOpen,
  isLoading = false,
  openText = 'details',
  closeText = 'collapse_details',
  className = '',
  disabled = false,
}) => {
  const baseClasses =
    'flex items-center self-end gap-px p-2 text-green-300 underline cursor-pointer text-[12px] font-bold tracking-normal leading-[18px] text-nowrap transition-all duration-200';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-green-400';
  const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`.trim();

  return (
    <button onClick={toggleOpen} className={combinedClasses} aria-expanded={isOpen}>
      <span>{isOpen ? closeText : openText}</span>

      {isLoading ? (
        <Loader2 size={16} className="animate-spin stroke-green-300" />
      ) : (
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 stroke-green-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      )}
    </button>
  );
};

export default TicketDetailsToggle;

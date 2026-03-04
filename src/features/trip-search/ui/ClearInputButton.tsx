import { X } from 'lucide-react';

type Props = {
  onClear: () => void;
};

export const ClearInputButton = ({ onClear }: Props) => {
  return (
    <button
      type="button"
      aria-label="Clear input"
      onClick={(e) => {
        e.stopPropagation();
        onClear();
      }}
      className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
    >
      <X size={24} className="stroke-black dark:stroke-slate-50" />
    </button>
  );
};

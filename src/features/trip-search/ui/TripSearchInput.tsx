// shared/ui/TripSearchInput.tsx
import { cn } from '@/shared/lib/utils';
import { forwardRef, ReactNode } from 'react';

interface TripSearchInputProps extends React.ComponentProps<'input'> {
  name: string;
  value: string;
  className?: string;
  error?: string | null;
  errorMessage?: string;
  startIcon: ReactNode;
  endIcon?: ReactNode;
  swap?: () => void;
}

export const TripSearchInput = forwardRef<HTMLInputElement, TripSearchInputProps>(
  ({ name, value, placeholder, error, errorMessage, startIcon, endIcon, className, swap, ...props }, ref) => {
    return (
      <div className={cn('relative', className)}>
        {/* start icon */}
        <div className="absolute left-1 tablet:left-2 laptop:left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          {startIcon}
        </div>

        <input
          ref={ref}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          className={cn(
            'z-0 min-h-10 rounded-md size-full h-auto',
            'px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4',
            'outline-hidden bg-transparent',
            'focus:bg-slate-100 active:bg-slate-100',
            'dark:focus:bg-slate-700 dark:active:bg-slate-700',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'text-base laptop:text-lg font-medium tracking-tighter',
            'leading-[21.6px] laptop:leading-[24px]',
            'text-left text-nowrap truncate',
            'text-slate-900 dark:text-slate-50',
            'border border-transparent',
            'aria-invalid:border-red-500 dark:aria-invalid:border-red-500',
            'transition-colors duration-150',
          )}
          {...props}
        />

        {/* end icon / swap */}
        {endIcon && (
          <div
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              e.preventDefault();
              swap?.();
            }}
            className="absolute right-1 tablet:right-2 laptop:right-5 top-1/2 -translate-y-1/2 z-20 cursor-pointer rotate-90 tablet:rotate-0"
          >
            {endIcon}
          </div>
        )}

        {/* error badge */}
        {error && (
          <div
            className="absolute top-0 right-0 z-50 px-1.5 py-0.5 text-xs text-white rounded-tr-lg rounded-bl-lg bg-red-500 cursor-default"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {props['aria-errormessage'] ?? errorMessage}
          </div>
        )}
      </div>
    );
  },
);

TripSearchInput.displayName = 'TripSearchInput';

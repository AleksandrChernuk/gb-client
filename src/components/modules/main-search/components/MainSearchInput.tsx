import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MainSearchInputProps extends React.ComponentProps<'input'> {
  name: string;
  value: string;
  classNames?: string;
  open?: boolean;
  error?: string | null;
  readOnly?: boolean;
  startIcon: ReactNode;
  endIcon?: ReactNode;
  onInputChange?: (value: string) => void;
  swap?: () => void;
  handleBlur?: () => void;
  handleToggleOpen?: () => void;
  setErrors?: (name: string, error: string | null) => void;
  errorMassage?: string;
}

export const MainSearchInput = forwardRef<HTMLInputElement, MainSearchInputProps>(
  (
    {
      name,
      value,
      placeholder,
      error,
      startIcon,
      readOnly,
      endIcon,
      classNames,
      onInputChange,
      onFocus,
      onBlur,
      swap,
      handleBlur,
      handleToggleOpen,
      setErrors,
      errorMassage,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('relative', classNames)} role="input-wrapp">
        <div className="absolute transform -translate-y-1/2 pointer-events-none left-1 tablet:left-2 laptop:left-5 top-1/2">
          {startIcon}
        </div>
        <input
          ref={ref}
          type={readOnly ? 'button' : 'text'}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={(e) => {
            if (!readOnly && onInputChange) {
              onInputChange(e.target.value);
            }
          }}
          onFocus={(e) => {
            if (error && setErrors) {
              setErrors(name, null);
            }
            handleToggleOpen?.();
            onFocus?.(e);
          }}
          onBlur={(e) => {
            handleBlur?.();
            onBlur?.(e);
          }}
          className={cn(
            `z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 
            outline-hidden bg-transparent focus:bg-slate-200 active:bg-slate-200 
            dark:focus:bg-slate-700 dark:active:bg-slate-700 
            placeholder:text-slate-700 dark:placeholder:text-slate-50 
            text-base laptop:text-lg font-medium tracking-tighter 
            laptop:leading-[24px] leading-[21.6px] text-left text-nowrap truncate 
            text-black dark:text-slate-50 border-[1px] border-transparent 
         aria-invalid:border-[#de2a1a] dark:aria-invalid:border-[#de2a1a] `,
          )}
          {...props}
          onKeyDown={(e) => {
            if (props.onKeyDown) props.onKeyDown(e);
          }}
          aria-invalid={Boolean(error)}
        />

        {endIcon && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              swap?.();
            }}
            className="absolute transform rotate-90 -translate-y-1/2 cursor-pointer tablet:rotate-0 target:rotate-180 right-1 tablet:right-2 laptop:right-5 top-1/2"
          >
            {endIcon}
          </div>
        )}

        {!!error && (
          <div
            className="absolute top-0 right-0 z-50 p-1 text-xs text-white transform rounded-tr-lg rounded-bl-lg cursor-pointer w-fit h-fit bg-[#de2a1a]"
            onClick={(e) => e.stopPropagation()}
          >
            {errorMassage}
          </div>
        )}
      </div>
    );
  },
);

MainSearchInput.displayName = 'MainSearchInput';

import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
    error?: boolean;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, error, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn('flex', className)}
      flagComponent={FlagComponent}
      countrySelectComponent={(p) => <CountrySelect {...p} error={error} />}
      inputComponent={InputComponent}
      smartCaret={false}
      /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
      {...props}
    />
  );
});
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <Input className={cn('rounded-e-lg rounded-s-none', className)} {...props} ref={ref} />
  ),
);
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
  error?: boolean;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
  error,
}: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={`${error && 'border-red-400'} flex gap-1 rounded-none rounded-s-lg border-r-0 px-3 focus:z-10   border border-slate-200 dark:border-slate-700 dark:hover:bg-black  dark:hover:border-slate-700 dark:focus:bg-slate-600 dark:focus:border-slate-900  bg-background text-sm font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-50 disabled:cursor-not-allowed disabled:opacity-50 outline-hidden hover:bg-slate-50 hover:border-slate-200 focus:border-slate-700`}
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-1 bg-white" side="bottom" align="start">
        <ScrollArea className="h-72">
          <div className="space-y-1 p-4">
            {countryList.map(({ value, label }) =>
              value ? (
                <CountrySelectOption
                  key={value}
                  country={value}
                  countryName={label}
                  selectedCountry={selectedCountry}
                  onChange={onChange}
                />
              ) : null,
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({ country, countryName, onChange }: CountrySelectOptionProps) => {
  return (
    <div className="gap-2 flex items-center p-1 cursor-pointer" onClick={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm text-slate-700 dark:text-slate-50">{countryName}</span>
      <span className="text-sm text-slate-700 dark:text-slate-50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden bg-inherit [&_svg]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };

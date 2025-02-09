"use client";

import { memo } from "react";
import { IconFrom } from "@/components/icons/IconFrom";
import { IconTo } from "@/components/icons/IconTo";
import { IconSwap } from "@/components/icons/IconSwap";
import { useCitySearch } from "../../hooks/useCitySearch";
import { InputError, EndIcon, StartIcon, DropdownWrapper } from '../../ui';
import { useTranslation } from 'react-i18next';
import { useSearchStore } from '@/store/useSearch';
 
export const DesctopCitySearch = memo(({ name }: { name: 'from' | 'to' }) => {
  const { t } = useTranslation();

  const {
    open,
    handleToggleOpen,
    inputRef,
    handleBlur,
    value,
    onInputChange,
    list,
    placeholder,
    onKeyDown,
  } = useCitySearch({
    name,
  });

  const swap = useSearchStore((state) => state.swap);
  const errors = useSearchStore((state) => state.errors[name]);
  const setErrors = useSearchStore((state) => state.setErrors);

  return (
    <div role='dropdown-warapp' className='relative' onKeyDown={onKeyDown}>
      <div
        className={`relative border-r border-gray_1 dark:border-black_2_for_text ${
          open && 'dark:border-r-transparent border-r-transparent'
        }`}
        role='input-wrapp'
      >
        <StartIcon icon={name === 'from' ? <IconFrom /> : <IconTo />} />
        <input
          ref={inputRef}
          type='text'
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={(e) => {
            onInputChange(e.target.value);
          }}
          autoComplete='off'
          autoCapitalize='off'
          className={`${errors && 'border-red'} z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-gray_1 active:bg-gray_1 dark:focus:bg-black_2_for_text dark:active:bg-black_2_for_text placeholder-black dark:placeholder-gray_0 body_medium laptop:filter_input_medium_text text-black dark:text-grayy text-left text-nowrap truncate border-[1px] border-transparent`}
          spellCheck='false'
          onBlur={handleBlur}
          onFocus={() => {
            if (errors) {
              setErrors(name, null);
            }
            handleToggleOpen();
          }}
        />
        <EndIcon icon={name === 'from' && <IconSwap />} onClick={swap} />
        <InputError inputError={errors && t(`${errors}`)} />
      </div>

      <DropdownWrapper open={open}>{list}</DropdownWrapper>
    </div>
  );
});

DesctopCitySearch.displayName = "DesctopCitySearch";

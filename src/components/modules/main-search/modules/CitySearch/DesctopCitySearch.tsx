'use client'

import { IconFrom } from '@/components/icons/IconFrom'
import { IconTo } from '@/components/icons/IconTo'
import { IconSwap } from '@/components/icons/IconSwap'
import { useCitySearch } from '../../hooks/useCitySearch'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { useSearchStore } from '@/store/useSearch'
import { useLocale, useTranslations } from 'next-intl'
import { extractLocationDetails } from '@/lib/extractLocationDetails'
import { StartIcon } from '../../components/StartIcon'
import { EndIcon } from '../../components/EndIcon'
import { InputError } from '../../components/InputError'
import { LoaderCity } from '../../components/LoaderCity'
import { NotFoundCity } from '../../components/NotFoundCity'
import { CityItem } from '../../components/CityItem'

export const DesktopCitySearch = ({ name }: { name: 'from' | 'to' }) => {
  const {
    open,
    value,
    onInputChange,
    cities,
    loading,
    placeholder,
    onSelectCity,
    highlightedIndex,
    handleToggleOpen,
    onKeyDown,
    handleBlur,
    inputRef,
  } = useCitySearch({
    name,
  })
  const t = useTranslations('common')
  const city = useSearchStore((state) => state[name])
  const swap = useSearchStore((state) => state.swap)
  const errors = useSearchStore((state) => state.errors[name])
  const setErrors = useSearchStore((state) => state.setErrors)
  const locale = useLocale()

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
            onInputChange(e.target.value)
          }}
          autoComplete='off'
          autoCapitalize='off'
          className={`${
            errors && 'border-red!'
          } z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-gray_1 active:bg-gray_1 dark:focus:bg-black_2_for_text dark:active:bg-black_2_for_text placeholder-black dark:placeholder-gray_0 body_medium laptop:filter_input_medium_text text-black dark:text-grayy text-left text-nowrap truncate border-[1px] border-transparent`}
          spellCheck='false'
          onBlur={handleBlur}
          onFocus={() => {
            if (errors) {
              setErrors(name, null)
            }
            handleToggleOpen()
          }}
        />
        <EndIcon icon={name === 'from' && <IconSwap />} onClick={swap} />
        <InputError inputError={errors && t(`${errors}`)} />
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='absolute   left-0 top-full mt-5 w-fit p-4 rounded-2xl bg-white dark:bg-dark_main shadow space-y-2 z-50'
            key='box'
            onMouseDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
          >
            {!loading &&
              cities &&
              cities.map((el, index) => {
                const element = extractLocationDetails(el, locale)
                return (
                  <div key={el.id}>
                    <CityItem
                      el={element}
                      isSelected={city?.id === el.id}
                      isHighlighted={highlightedIndex === index}
                      handleSelectCity={() => onSelectCity(el)}
                    />
                  </div>
                )
              })}
            {!loading && !cities.length && <NotFoundCity />}
            {loading && <LoaderCity />}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

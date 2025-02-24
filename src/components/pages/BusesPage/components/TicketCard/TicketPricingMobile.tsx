'use client'

import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

type Props = {
  price: string
  loading?: boolean
  disabled?: boolean
  handleSelect: () => void
}

export default function TicketPricingMobile({ handleSelect, loading, price, disabled }: Props) {
  return (
    <div className='tablet:hidden'>
      <Button
        variant={'default'}
        disabled={disabled}
        onClick={handleSelect}
        className='w-full text-amber-50  py-3 px-4 laptop:py-[14px] rounded-none rounded-b-2xl '
      >
        {loading ? (
          <LoaderCircle className='animate-spin' />
        ) : (
          <>
            {price}
            <span className='text-xs ml-[2px]'>UAH</span>
          </>
        )}
      </Button>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

type Props = {
  price: string
  loading?: boolean
  handleSelect: () => void
}

export default function TicketPricingMobile({ handleSelect, loading, price }: Props) {
  return (
    <div className='tablet:hidden'>
      <Button
        variant={'default'}
        disabled={loading}
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

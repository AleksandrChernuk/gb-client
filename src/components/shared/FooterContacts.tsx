'use client'

import { supportNavlinks } from '@/constans/constans.supportNavlinks'
import { ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export default function FooterContacts() {
  return (
    <Popover>
      <PopoverTrigger asChild className='group'>
        <Button
          className={`px-3 py-2 rounded-md flex items-center text-black secondary_text gap-1 dark:text-gray_1 hover:text-gray_3 dark:hover:text-gray_1 data-[state=open]:text-gray_2_for_body data-[state=open]:text-gray_2_for_body dark:text-grayy`}
          variant={'outline'}
        >
          <div className='w-6 h-6 '>{supportNavlinks[0].icon}</div>
          {supportNavlinks[0].title}
          <ChevronUp
            size={24}
            className={`stroke-black group-data-[state=open]:stroke-gray_2_for_body group-data-[state=open]:dark:stroke-grayy  group-hover:stroke-gray_3 dark:stroke-gray_1 dark:group-hover:stroke-gray_1 group-data-[state=open]:rotate-180`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} side='bottom' className='w-full'>
        <ul className=' space-y-2'>
          {supportNavlinks.map((item, idx) => (
            <li key={`${item.title}+${idx}`}>
              <Button
                asChild
                variant={'link'}
                className='justify-start text-text_prymery secondary_text'
              >
                <Link href={item.src}>
                  <div className='w-4 h-4'>{item.icon}</div>
                  {item.title}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

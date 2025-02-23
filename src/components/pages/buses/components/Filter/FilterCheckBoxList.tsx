'use client'

import React from 'react'
import FilterCheckBoxItem from './FilterCheckBoxItem'
import { useFilterTicketsStore } from '@/store/useFilterTickets'

export default function FilterCheckBoxList() {
  const carriers = useFilterTicketsStore((state) => state.carriers)
  const setFilterCarriers = useFilterTicketsStore((state) => state.setFilterCarriers)
  const filterCarriers = useFilterTicketsStore((state) => state.filterCarriers)

  const handleChange = (value: string) => {
    setFilterCarriers(value)
  }

  return (
    <ul className='space-y-6'>
      {carriers.map((el) => (
        <li key={el.id}>
          <FilterCheckBoxItem
            name={el.name}
            count={el.count}
            handleChange={() => handleChange(el.name)}
            checked={filterCarriers.includes(el.name)}
          />
        </li>
      ))}
    </ul>
  )
}

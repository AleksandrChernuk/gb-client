'use client';

import React from 'react';
import FilterCheckBoxItem from './FilterCheckBoxItem';
import { useRoutesStore } from '@/store/useRouter';

export default function FilterCheckBoxList() {
  const carriers = useRoutesStore((state) => state.carriers);
  const setSortCarriers = useRoutesStore((state) => state.setSortCarriers);
  const sortCarriers = useRoutesStore((state) => state.sortCarriers);

  const handleChange = (value: string) => {
    setSortCarriers(value);
  };

  return (
    <ul className='space-y-6'>
      {carriers.map((el) => (
        <li key={el.id}>
          <FilterCheckBoxItem
            name={el.name}
            count={el.count}
            handleChange={() => handleChange(el.name)}
            checked={sortCarriers.includes(el.name)}
          />
        </li>
      ))}
    </ul>
  );
}

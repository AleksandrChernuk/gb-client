'use client';

import FilterCheckBoxItem from './FilterCheckBoxItem';
import { useFilterTickets } from '@/store/useFilterTickets';

export default function FilterCheckBoxList() {
  const carriers = useFilterTickets((state) => state.carriers);
  const setFilterCarriers = useFilterTickets((state) => state.setFilterCarriers);
  const filterCarriers = useFilterTickets((state) => state.filterCarriers);

  const handleChange = (value: string) => {
    setFilterCarriers(value);
  };

  return (
    <ul className="space-y-6">
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
  );
}

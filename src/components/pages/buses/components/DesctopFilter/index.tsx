import { Suspense } from 'react'
import FilterSortByList from '../Filter/FilterRadioGroup'
import FilterCheckBoxList from '../Filter/FilterCheckBoxList'

export default async function DestopFilter({}: { locale: string }) {
  return (
    <aside>
      <ul className='space-y-4'>
        <li className='p-5'>
          <div className='flex items-center justify-between mb-6'>
            <h5 className='h5 text-text_prymery'>{'sort_by'}:</h5>
            {/* <ClearButton /> */}
          </div>
          <Suspense>
            <FilterSortByList />
          </Suspense>
        </li>
        <li className='p-5'>
          <h5 className='mb-6 h5 text-text_prymery'>{'bus_companies'}:</h5>
          <FilterCheckBoxList />
        </li>
      </ul>
    </aside>
  )
}

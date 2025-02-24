import DetailsAmenities from '@/components/pages/Buses/components/Details/DetailsAmenities'
import DetailsBus from '@/components/pages/Buses/components/Details/DetailsBus'
import DetailsDiscounts from '@/components/pages/Buses/components/Details/DetailsDiscounts'
import DetailsInfo from '@/components/pages/Buses/components/Details/DetailsInfo'
import DetailsLuggage from '@/components/pages/Buses/components/Details/DetailsLuggage'
import DetailsReturnPolicy from '@/components/pages/Buses/components/Details/DetailsReturnPolicy'
import DetailsStops from '@/components/pages/Buses/components/Details/DetailsStops'

export default function TicketDetails() {
  return (
    <div className='mt-8 grid grid-cols-2 gap-2'>
      <div className='space-y-4'>
        <DetailsInfo />
        <DetailsStops />
      </div>
      <div className='space-y-2'>
        <DetailsLuggage />
        <DetailsReturnPolicy />
        <DetailsAmenities />
        <DetailsDiscounts />
        <DetailsBus />
      </div>
    </div>
  )
}

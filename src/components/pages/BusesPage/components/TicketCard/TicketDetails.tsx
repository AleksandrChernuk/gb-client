import DetailsAmenities from '@/components/pages/BusesPage/components/Details/DetailsAmenities';
import DetailsBus from '@/components/pages/BusesPage/components/Details/DetailsBus';
import DetailsDiscounts from '@/components/pages/BusesPage/components/Details/DetailsDiscounts';
import DetailsInfo from '@/components/pages/BusesPage/components/Details/DetailsInfo';
import DetailsLuggage from '@/components/pages/BusesPage/components/Details/DetailsLuggage';
import DetailsReturnPolicy from '@/components/pages/BusesPage/components/Details/DetailsReturnPolicy';
import DetailsStops from '@/components/pages/BusesPage/components/Details/DetailsStops';

export default function TicketDetails() {
  return (
    <div className="grid grid-cols-2 gap-2 mt-8">
      <div className="space-y-4">
        <DetailsInfo />
        <DetailsStops />
      </div>
      <div className="space-y-2">
        <DetailsLuggage />
        <DetailsReturnPolicy />
        <DetailsAmenities />
        <DetailsDiscounts />
        <DetailsBus />
      </div>
    </div>
  );
}

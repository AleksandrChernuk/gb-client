import DetailsAmenities from '../../components/DetailsAmenities';
import DetailsBus from '../../components/DetailsBus';
import DetailsDiscounts from '../../components/DetailsDiscounts';
import DetailsInfo from '../../components/DetailsInfo';
import DetailsLuggage from '../../components/DetailsLuggage';
import DetailsReturnPolicy from '../../components/DetailsReturnPolicy';
import DetailsStops from '../../components/DetailsStops';

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

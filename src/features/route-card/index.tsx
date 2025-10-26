import { pickRouteCard } from '@/features/route-card/helpers/pickRouteCard';
import { TAdaptedRoute } from '@/shared/lib/adaptRoutesForRender';

export function RouteCard({ element }: { element: TAdaptedRoute }) {
  const CardComponent = pickRouteCard(element);

  return CardComponent;
}

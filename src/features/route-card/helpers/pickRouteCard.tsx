import { TAdaptedRoute } from '@/shared/lib/adaptRoutesForRender';
import { SingleRouteCard } from '@/features/route-card/variants-ui/SingleRouteCard';

export function pickRouteCard(route: TAdaptedRoute) {
  switch (route.type) {
    case 'single':
      return <SingleRouteCard data={route.data} />;
    case 'combined':
      return null;
    case 'error':
      return null;
    default:
      return null;
  }
}

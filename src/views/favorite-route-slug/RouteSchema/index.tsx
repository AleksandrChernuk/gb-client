import { buildRouteSchema } from '@/shared/seo/route.schema';
import { IFavoriteRoute } from '@/shared/types/favoriteRoutes';
import { Locale } from 'next-intl';

interface RouteSchemaProps {
  route: IFavoriteRoute;
  lng: Locale;
  host: string;
}

export function RouteSchema({ route, lng, host }: RouteSchemaProps) {
  const schema = buildRouteSchema(route, lng, host);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

'use client';

import { useQuery } from '@tanstack/react-query';
import SkeletonRote from './SkeletonRote';
import { getLocations } from '@/shared/api/location.actions';
import { buildRoutes } from '@/shared/utils/buildRoutes';
import RoutersItem from '@/widgets/homepage/ui/RoutersItem';
import RoutersDropdownList from '@/widgets/homepage/ui/RoutersDropdownList';

export default function PopularRoutesList() {
  const { isFetching, data } = useQuery({
    queryKey: ['locations'],
    queryFn: () => getLocations({ query: '', perPage: 99 }),
  });

  if (!data?.data) {
    return <SkeletonRote />;
  }
  const allRoutes = buildRoutes(data.data);

  const initialRouters = allRoutes.slice(0, 6);
  const dropdownRouters = allRoutes.slice(6);

  return (
    <div>
      {isFetching ? (
        <SkeletonRote />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 laptop:grid-cols-2  ">
            {initialRouters.map((router, i) => (
              <div className="w-full" key={i + 1}>
                <RoutersItem from={router?.from} to={router?.to} />
              </div>
            ))}
          </div>
          <RoutersDropdownList list={dropdownRouters} />
        </>
      )}
    </div>
  );
}

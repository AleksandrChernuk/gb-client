'use client';

import RoutersDropdownList from './RoutersDropdownList';
import RoutersItem from './RoutersItem';
import { getLocations } from '@/actions/location.actions';
import { buildRoutes } from '../helpers';
import { useQuery } from '@tanstack/react-query';
import SkeletonRote from './SkeletonRote';

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
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-4 laptop:grid-cols-2  ">
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

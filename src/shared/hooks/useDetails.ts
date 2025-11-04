// 'use client';

// import { getRouteDetails } from '@/shared/api/route.actions';
// import { UserCurrentTripType } from '@/shared/types/profile.trips';
// import { IRouteDetailsResponse } from '@/shared/types/route.types';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useLocale } from 'next-intl';
// import { useMemo, useState } from 'react';

// export const useDetails = ({ item }: { item: UserCurrentTripType }) => {
//   const locale = useLocale();
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const rowData = useMemo(() => {
//     const timetableId = item.timetableId ?? (item.intervalId ? String(item.intervalId) : undefined);

//     return {
//       ...(item.routeId && { routeId: String(item.routeId) }),
//       ...(item.intervalId && { intervalId: String(item.intervalId) }),
//       ...(item.busId && { busId: String(item.busId) }),
//       ...(item.fromCityId && { fromCityId: Number(item.fromCityId) }),
//       ...(item.toCityId && { toCityId: Number(item.toCityId) }),
//       ...(item.fromStationId && { fromStationId: String(item.fromStationId) }),
//       ...(item.toStationId && { toStationId: String(item.toStationId) }),
//       providerId: String(item.providerId),
//       travelDate: item.departureDateTime || undefined,
//       locale,
//       ...(timetableId && { timetableId }),
//       currency: item.currency ?? 'UAH',
//       ...(item.bustypeId && { bustypeId: String(item.bustypeId) }),
//     };
//   }, [item, locale]);

//   const queryKey = useMemo(
//     () => ['currentTripsDetails', item.providerId, item.routeId, item.intervalId, item.timetableId, locale] as const,
//     [item.providerId, item.routeId, item.intervalId, item.timetableId, locale],
//   );

//   const { data, isLoading } = useQuery<IRouteDetailsResponse | null | undefined>({
//     queryKey,
//     queryFn: () => getRouteDetails(rowData),
//     enabled: isOpen,
//     placeholderData: keepPreviousData,
//     refetchOnWindowFocus: false,
//   });
//   return { data, isLoading, setIsOpen, isOpen };
// };

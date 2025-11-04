// 'use client';

// import { seatsMapper } from '@/features/checkout-form/helpers';
// import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
// import { useMemo } from 'react';
// import { useShallow } from 'zustand/react/shallow';

// const useSeatMap = () => {
//   const { selectedTicket, isHydrated } = useSelectedTickets(
//     useShallow((state) => ({
//       selectedTicket: state.selectedTicket?.route,
//       isHydrated: state.isHydrated,
//     })),
//   );

//   const seatMapWithStatus = useMemo(
//     () =>
//       seatsMapper({
//         seatsMap: selectedTicket?.details?.seatsMap,
//         freeSeatsMap: selectedTicket?.details?.freeSeatsMap,
//       }),
//     [selectedTicket?.details?.seatsMap, selectedTicket?.details?.freeSeatsMap],
//   );

//   const hasSeatMap = seatMapWithStatus.length > 0;

//   return { isHydrated: false, seatMapWithStatus: [], hasSeatMap: false };
// };

// export default useSeatMap;

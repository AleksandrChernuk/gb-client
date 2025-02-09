// 'use client';

// import { getLocationById } from '@/actions/location-actions';
// import { useSearchStore } from '@/store/useSearch';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function SyncSearchParams() {
//   const [hydrated, setHydrated] = useState(false);
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const from = useSearchStore((state) => state.from);
//   const to = useSearchStore((state) => state.to);
//   const date = useSearchStore((state) => state.date);
//   const adult = useSearchStore((state) => state.adult);
//   const children = useSearchStore((state) => state.children);
//   const setCity = useSearchStore((state) => state.setCity);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   useEffect(() => {
//     if (!hydrated || !searchParams) return;

//     const params = {
//       from: searchParams.get('from'),
//       to: searchParams.get('to'),
//       date: searchParams.get('date'),
//       adult: searchParams.get('adult'),
//       children: searchParams.get('children'),
//     };

//     if (!from?.id || !to?.id) {
//       router.push('/');
//     }

//     const fetchAndSetLocation = async (paramKey: 'from' | 'to', id: string | null) => {
//       if (!id) return;

//       try {
//         const location = await getLocationById(Number(id));
//         setCity(paramKey, location);
//       } catch (error) {
//         console.error(`Failed to fetch location for ${paramKey}:`, error);
//       }
//     };

//     if (!from && params.from) fetchAndSetLocation('from', params.from);
//     if (!to && params.to) fetchAndSetLocation('to', params.to);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [hydrated]);

//   useEffect(() => {
//     if (!hydrated || !searchParams) return;

//     const newParams = new URLSearchParams(searchParams.toString());

//     const updateParam = (key: string, value?: string | number | null) => {
//       if (value !== undefined && value !== null && value !== '') {
//         newParams.set(key, String(value));
//       } else {
//         newParams.delete(key);
//       }
//     };

//     updateParam('from', from?.id);
//     updateParam('to', to?.id);
//     updateParam('date', date);
//     updateParam('adult', adult);
//     updateParam('children', children);

//     if (newParams.toString() !== searchParams.toString()) {
//       router.replace(`?${newParams.toString()}`);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [from, to, date, adult, children, hydrated]);

//   return null;
// }

export const createPassengers = (adultCount: number, childCount: number) =>
  Array(adultCount + childCount)
    .fill(null)
    .map((_, i) => ({
      id: `${i >= adultCount ? i + 11 : i + 1}`,
      name: '',
      surname: '',
      dob: '',
      document: { type: 'UNKNOWN', number: '' },
      notes: '',
      discount: '',
      citizenship: '',
      isChildren: i >= adultCount,
      seat: '',
    }));

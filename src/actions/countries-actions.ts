'use server';

const baseUrl = 'https://greenbus-backend.onrender.com/api/v1/countries';

export const getAllCountries = async () => {
  const response = await fetch(`${baseUrl}`, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    return 'Network response was not ok';
  }

  const data = await response.json();
  return data;
  // try {
  //   const response = await fetch(`${baseUrl}`, {
  //     next: { revalidate: 10 },
  //   });

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }

  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Error fetching Countries:', error);
  //   throw error;
  // }
};

export const getCountryById = async (id: string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    return 'Network response was not ok';
  }

  const data = await response.json();
  return data;
  // try {
  //   const response = await fetch(`${baseUrl}/${id}`, {
  //     next: { revalidate: 10 },
  //   });

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }

  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Error fetching Country:', error);
  //   throw error;
  // }
};

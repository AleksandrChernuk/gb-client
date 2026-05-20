import { getLocations, getLocationById } from "@/shared/api/location.actions";

export const fetchLocations = async (query: string) => {
  const res = await getLocations({ query });
  return res?.data ?? [];
};

export const fetchLocationById = async (id: number) => {
  return await getLocationById(id);
};

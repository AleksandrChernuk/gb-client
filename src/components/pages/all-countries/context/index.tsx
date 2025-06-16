'use client';

import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { ILocation } from '@/types/location.types';
import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export type AllCountriesContent = {
  locations: ILocation[];
  countrys: string[];
  cities: string[];
  selectedCountry: ILocation | null;
  searchCities: (query: string) => void;
  searchCountry: (query: string) => void;
  searchByQuery: (query: string) => void;
  getCitiesByCountry: (country: string) => string[];
  selectCountry: (loc: ILocation) => void;
};

export const AllCountriesContext = createContext<AllCountriesContent>({
  locations: [],
  countrys: [],
  cities: [],
  selectedCountry: null,
  searchCities: () => {},
  searchCountry: () => {},
  searchByQuery: () => {},
  getCitiesByCountry: () => [],
  selectCountry: () => {},
});

type Props = {
  children: ReactNode;
  locations: ILocation[];
  locale: string;
};

export const AllCountriesProvider = ({ children, locations, locale }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<ILocation | null>(null);

  const { allCountries, allCities, countryToCitiesMap } = useMemo(() => {
    const countrySet = new Set<string>();
    const citySet = new Set<string>();
    const map = new Map<string, Set<string>>();

    locations.forEach((el) => {
      const { countryName, locationName } = extractLocationDetails(el, locale);
      if (!countryName || !locationName) return;

      countrySet.add(countryName);
      citySet.add(locationName);

      if (!map.has(countryName)) {
        map.set(countryName, new Set());
      }
      map.get(countryName)?.add(locationName);
    });

    const sort = (arr: string[]) => arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    const sortedMap = new Map<string, string[]>();
    for (const [country, cities] of map.entries()) {
      sortedMap.set(country, sort(Array.from(cities)));
    }

    return {
      allCountries: sort(Array.from(countrySet)),
      allCities: sort(Array.from(citySet)),
      countryToCitiesMap: sortedMap,
    };
  }, [locations, locale]);

  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const [filteredCities, setFilteredCities] = useState(allCities);

  const searchCities = (query: string) => {
    if (!query) {
      if (selectedCountry) {
        const { countryName } = extractLocationDetails(selectedCountry, locale);
        setFilteredCities(countryToCitiesMap.get(countryName) || []);
      } else {
        setFilteredCities(allCities);
      }
      return;
    }

    const list = selectedCountry
      ? countryToCitiesMap.get(extractLocationDetails(selectedCountry, locale).countryName) || []
      : allCities;

    setFilteredCities(list.filter((c) => c.toLowerCase().includes(query.toLowerCase())));
  };

  const searchCountry = (query: string) => {
    if (!query) return setFilteredCountries(allCountries);
    setFilteredCountries(allCountries.filter((c) => c.toLowerCase().includes(query.toLowerCase())));
  };

  const searchByQuery = (query: string) => {
    if (!query) {
      setFilteredCountries(allCountries);
      if (selectedCountry) {
        const { countryName } = extractLocationDetails(selectedCountry, locale);
        setFilteredCities(countryToCitiesMap.get(countryName) || []);
      } else {
        setFilteredCities(allCities);
      }
      return;
    }

    const lowerQuery = query.toLowerCase();

    const matchedCountries = allCountries.filter((country) => country.toLowerCase().includes(lowerQuery));
    setFilteredCountries(matchedCountries);

    const cityList = selectedCountry
      ? countryToCitiesMap.get(extractLocationDetails(selectedCountry, locale).countryName) || []
      : allCities;

    const matchedCities = cityList.filter((city) => city.toLowerCase().includes(lowerQuery));
    setFilteredCities(matchedCities);
  };

  const getCitiesByCountry = (country: string): string[] => {
    return countryToCitiesMap.get(country) || [];
  };

  const selectCountry = (countryLoc: ILocation) => {
    setSelectedCountry(countryLoc);
    const { countryName } = extractLocationDetails(countryLoc, locale);
    const cities = countryToCitiesMap.get(countryName) || [];
    setFilteredCities(cities);
  };

  return (
    <AllCountriesContext.Provider
      value={{
        locations,
        countrys: filteredCountries,
        cities: filteredCities,
        selectedCountry,
        searchCities,
        searchCountry,
        searchByQuery,
        getCitiesByCountry,
        selectCountry,
      }}
    >
      {children}
    </AllCountriesContext.Provider>
  );
};

export const useAllCountriesContext = () => useContext(AllCountriesContext);

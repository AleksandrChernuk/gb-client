import { getFavoriteLocations, getLocations } from '@/actions/location-actions'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { ILocation } from '@/types/location.types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useLocationsQuery = (value: string) => {
  const matches = useMediaQuery('(max-width: 767px)')

  const queryClient = useQueryClient()
  const {
    data: favoriteData,
    isLoading: loadingFavorite,
    error: errorFavorite,
  } = useQuery<ILocation[]>({
    queryKey: ['favorite-locations'],
    queryFn: getFavoriteLocations,
    initialData: queryClient.getQueryData(['favorite-locations']),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const {
    data: searchData,
    isFetching: fetchingSearch,
    error: errorSearch,
  } = useQuery({
    queryKey: ['search-locations', value],
    queryFn: async () => {
      const response = await getLocations({ query: value, page: 1, perPage: 10 })
      return response.data
    },
    enabled: value.length > 1,
  })

  const cities = useMemo(() => {
    if (searchData) {
      return searchData
    }
    return !matches ? favoriteData?.slice(0, 4) || [] : favoriteData || []
  }, [favoriteData, matches, searchData])

  return {
    cities,
    loading: loadingFavorite || fetchingSearch,
    errorSearch,
    errorFavorite,
  }
}

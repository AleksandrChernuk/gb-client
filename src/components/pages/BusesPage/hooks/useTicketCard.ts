import { useSearchStore } from '@/store/useSearch'
import { IRouteResponse } from '@/types/route.types'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { useCurrentTicketStore } from '@/store/useCurrentTicket'
import { useShallow } from 'zustand/react/shallow'
import { useRouter } from '@/i18n/routing'
import { setCookie } from '@/actions/cookie-actions'

export default function useTicketCard({ element }: { element?: IRouteResponse }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const setCurrentTicket = useCurrentTicketStore((state) => state.setCurrentTicket)

  const from = useSearchStore(useShallow((state) => state.from))
  const to = useSearchStore(useShallow((state) => state.to))
  const adult = useSearchStore(useShallow((state) => state.adult))
  const children = useSearchStore(useShallow((state) => state.children))
  const date = useSearchStore(useShallow((state) => state.date))
  const loadingDetails = useCurrentTicketStore((state) => state.loadingDetails)

  const currentLocale = useLocale()
  const router = useRouter()

  const handleSelect = async () => {
    if (loadingDetails) return
    setLoading(true)
    await setCookie({
      name: '_p',
      value: JSON.stringify({ adult, children }),
    })

    if (element) {
      await setCurrentTicket({
        route: element,
        toCityId: to?.id,
        fromCityId: from?.id,
        locale: currentLocale,
        passCount: adult + children,
        travelDate: date,
      })
    }

    router.push('/checkout')
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false)
    }
  }

  const handleOpenDetails = () => {
    if (element) {
      setCurrentTicket({
        route: element,
        toCityId: to?.id,
        fromCityId: from?.id,
        locale: currentLocale,
        passCount: adult + children,
        travelDate: date,
      })
    }

    setIsOpen(!isOpen)
  }

  const handleSetCurretRoute = () => {
    if (element) {
      setCurrentTicket({
        route: element,
        toCityId: to?.id,
        fromCityId: from?.id,
        locale: currentLocale,
        passCount: adult + children,
        travelDate: date,
      })
    }
  }

  return {
    handleOpenDetails,
    handleBlur,
    handleSelect,
    loading,
    isOpen,
    handleSetCurretRoute,
  }
}

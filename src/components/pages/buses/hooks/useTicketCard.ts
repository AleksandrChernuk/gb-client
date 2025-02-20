import { useCurrentRouteStore } from '@/store/useCurrentRoute'
import { useSearchStore } from '@/store/useSearch'
import { IRouteResponse } from '@/types/route.types'
import { useLocale } from 'next-intl'
import  { useState } from 'react'
import { setCookie } from '@/actions/setCookie'
import { useRouter } from 'next/navigation'


export default function useTicketCard({element}:{element:IRouteResponse}) {
const [isOpen, setIsOpen] = useState<boolean>(false)
const [loading, setLoading] = useState<boolean>(false)
const router = useRouter()
const adult = useSearchStore((state) => state.adult)
const children = useSearchStore((state) => state.children)
const from = useSearchStore((state) => state.from)
const to = useSearchStore((state) => state.to)
const date = useSearchStore((state) => state.date)
  
  const currentLocale = useLocale()
  
 const setCurrentRoute = useCurrentRouteStore((state) => state.setCurrentRoute)
 const loadingDetails = useCurrentRouteStore((state) => state.loadingDetails)
  
 const handleSelect = async () => {
setLoading(true)
setCurrentRoute({
  route: element,
  toCityId: to?.id,
  fromCityId: from?.id,
  locale: currentLocale,
  passCount: adult + children,
  travelDate: date,
})
  
await setCookie({ name: '_a', value: `${adult}` })
await setCookie({ name: '_c', value: `${children}` })
  
router.push(`/${currentLocale}/checkout`)
}
  
 const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
if (!event.currentTarget.contains(event.relatedTarget)) {
  setIsOpen(false)
}
}
  
 const handleOpenDetails = () => {
  if (!isOpen) {
  setCurrentRoute({
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
  
const handleSetCurretRoute=() => {
setCurrentRoute({
 route: element,
 toCityId: to?.id,
 fromCityId: from?.id,
 locale: currentLocale,
 passCount: adult + children,
 travelDate: date,
})
}
  
  return {
    handleOpenDetails,
    handleBlur,
    handleSelect,
    loadingDetails,
    loading,
    isOpen,
    handleSetCurretRoute,
  }
}

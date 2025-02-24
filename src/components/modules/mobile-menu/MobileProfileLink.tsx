'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { User } from 'lucide-react'
import { useTranslations } from 'next-intl'

const isAuth = false

export default function MobileProfileLink() {
  const t = useTranslations('common')

  if (!isAuth) {
    return (
      <Button asChild variant={'link'} className='justify-start text-text_prymery body_medium'>
        <Link href={'/signin'} replace>
          <User size={24} className='stroke-primary' />
          {t('mainNavProfileLink')}
        </Link>
      </Button>
    )
  }

  if (isAuth) {
    return (
      <Button asChild variant={'link'} className='justify-start text-text_prymery body_medium'>
        <Link href={'/profile'} replace>
          {t('mainNavProfileLink')}
        </Link>
        <User size={24} className='stroke-primary' />
      </Button>
    )
  }
}

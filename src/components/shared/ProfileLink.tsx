import { Link } from '@/i18n/routing'
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

type IProfile = {
  isMobile?: boolean
  locale: string
}

export const ProfileLink = async ({ isMobile }: IProfile) => {
  const t = await getTranslations('common')
  return (
    <Button asChild variant={'link'}>
      <Link
        href={'/signin'}
        className='group text-black! body_medium gap-1 dark:text-gray_1 hover:text-gray_3! dark:hover:text-gray_1 dark:text-grayy!'
      >
        <div
          className={`flex items-center justify-center ${!isMobile && 'group-hover:fill-gray_medium bg-gray_1 rounded-full p-1'}`}
        >
          <User
            size={20}
            className={`${
              isMobile ? 'stroke-primary_1' : ' stroke-black group-hover:stroke-gray_3'
            }`}
          />
        </div>
        <div className={`${!isMobile && 'hidden laptop:block'}`}>{t('mainNavProfileLink')}</div>
      </Link>
    </Button>
  )
}

//  <span
//           className={`${!isMobile && 'group-hover:fill-gray_medium bg-gray_1 rounded-full p-1'}`}
//         ></span>

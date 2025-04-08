import { Link } from '@/i18n/routing';
import { Button } from '../ui/button';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  variant: 'mobile' | 'desktop';
};

const isAuth = false;

export const ProfileLink = ({ variant }: Props) => {
  const t = useTranslations('common');

  switch (variant) {
    case 'mobile':
      return (
        <Button
          asChild
          variant={'link'}
          className="justify-start text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px]"
        >
          <Link prefetch={false} href={isAuth ? '/profile' : '/signin'} replace>
            <User size={24} className="stroke-green-300" />
            {t('mainNavProfileLink')}
          </Link>
        </Button>
      );

    case 'desktop':
      return (
        <Button asChild variant={'link'}>
          <Link
            prefetch={false}
            href={isAuth ? '/profile' : '/signin'}
            className="group text-black! text-base font-medium tracking-normal leading-[24px] gap-1 hover:text-[#8e8e8e]! dark:hover:text-slate-200 dark:text-slate-50!"
          >
            <div
              className={`flex items-center justify-center group-hover:fill-gray_medium bg-gray-1 p-1 dark:bg-gray rounded-full`}
            >
              <User size={20} className={` stroke-slate-700 dark:stroke-slate-50`} />
            </div>
            <div className={`hidden laptop:block`}>{t('mainNavProfileLink')}</div>
          </Link>
        </Button>
      );
    default:
      return null;
  }
};

import { Link } from '@/i18n/routing';
import { Button } from '../ui/button';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  type: 'mobile' | 'desctop';
};

const isAuth = false;

export const ProfileLink = ({ type }: Props) => {
  const t = useTranslations('common');

  if (type === 'mobile') {
    return (
      <Button
        asChild
        variant={'link'}
        className="justify-start text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px]"
      >
        <Link prefetch={false} href={isAuth ? '/profile' : '/signin'} replace>
          <User size={24} className="stroke-primary" />
          {t('mainNavProfileLink')}
        </Link>
      </Button>
    );
  }

  if (type === 'desctop') {
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
            <User size={20} className={`stroke-green-300`} />
          </div>
          <div className={`hidden laptop:block`}>{t('mainNavProfileLink')}</div>
        </Link>
      </Button>
    );
  }
};

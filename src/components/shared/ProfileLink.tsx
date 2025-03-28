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
      <Button asChild variant={'link'} className="justify-start text-text_prymery body_medium">
        <Link href={isAuth ? '/profile' : '/signin'} replace>
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
          href={isAuth ? '/profile' : '/signin'}
          className="group text-black! body_medium gap-1 hover:text-gray_3! dark:hover:text-gray_1 dark:text-grayy!"
        >
          <div
            className={`flex items-center justify-center ${type === 'desctop' && 'group-hover:fill-gray_medium bg-gray_1 rounded-full p-1'}`}
          >
            <User
              size={20}
              className={`${type !== 'desctop' ? 'stroke-primary_1' : ' stroke-black group-hover:stroke-gray_3'}`}
            />
          </div>
          <div className={`${type === 'desctop' && 'hidden laptop:block'}`}>{t('mainNavProfileLink')}</div>
        </Link>
      </Button>
    );
  }
};

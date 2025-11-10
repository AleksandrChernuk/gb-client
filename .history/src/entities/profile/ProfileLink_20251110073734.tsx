import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { Button } from '@/shared/ui/button';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  variant: 'mobile' | 'desktop';
};

export const ProfileLink = ({ variant }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  switch (variant) {
    case 'mobile':
      return (
        <Button
          asChild
          variant={'link'}
          size={'icon'}
          className="outline-1 justify-start text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px] p-0 py-2 "
        >
          <Link href={'/profile'} scroll prefetch>
            <User size={24} className="stroke-green-300 " />
            {t('mainNavProfileLink')}
          </Link>
        </Button>
      );

    case 'desktop':
      return (
        <Link
          href={'/profile'}
          scroll
          prefetch
          className="hover:underline flex items-center group text-black! text-base font-medium tracking-normal leading-[24px] gap-1 hover:text-[#8e8e8e]! dark:hover:text-slate-200 dark:text-slate-50!"
        >
          <div
            className={`flex items-center justify-center group-hover:fill-gray_medium p-1 rounded-full bg-slate-200 dark:bg-slate-50`}
          >
            <User
              size={20}
              className={`stroke-black group-data-[state=open]:stroke-[#6f8b90] group-data-[state=open]:dark:stroke-slate-800 group-hover:stroke-[#8e8e8e] dark:stroke-black dark:group-hover:stroke-slate-200 transition-all`}
            />
          </div>
          <div className={`hidden laptop:block`}>{t('mainNavProfileLink')}</div>
        </Link>
      );

    default:
      return null;
  }
};

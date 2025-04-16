import { AccountActionsList } from '@/constans/account-actions-list.constans';
import { Link } from '@/i18n/routing';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AccountActions() {
  const t = useTranslations('common');
  return (
    <div>
      <h5 className="mb-4 text-base font-bold leading-6 tracking-normal text-[#6f8b90] dark:text-[#e6e6e6]">
        {t('authYouCan')}
      </h5>

      <ul className="flex flex-col gap-2 mb-6 tablet:gap-4 text-slate-700 dark:text-slate-200 text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6">
        {AccountActionsList.map((el) => (
          <li key={el.id} className="flex flex-row items-center gap-2 ">
            <CircleCheck className="w-4 h-4 tablet:w-6 tablet:h-6 stroke-primary" />
            <p>{t(el.text)}</p>
          </li>
        ))}
      </ul>

      <div className="flex flex-row items-center gap-2">
        <CircleAlert className="w-4 h-4 stroke-[#6f8b90]" />

        <p className="text-xs font-normal tracking-normal leading-[18px] text-slate-400 dark:text-slate-200">
          {t('auth_terms_of_the')}{' '}
          <Link href={'/'} prefetch={false} replace aria-label="go home page" className="text-primary">
            {t('auth_public_offer')}
          </Link>
          , {t('auth_and')}{' '}
          <Link href={'/'} prefetch={false} className="text-primary">
            {t('auth_returns_policy')}
          </Link>
        </p>
      </div>
    </div>
  );
}

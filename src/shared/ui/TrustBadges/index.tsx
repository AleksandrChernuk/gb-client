import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { CreditCard, Mail, ShieldCheck, RotateCcw } from 'lucide-react';

// Trust-сигнали для комерційних хабів: знімають частину YMYL-сумнівів
// (оплата, e-квиток, перевізники, повернення) перед кроком покупки.
export default async function TrustBadges({ className = '' }: { className?: string }) {
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  const items = [
    { icon: CreditCard, label: t('trust_no_fee') },
    { icon: Mail, label: t('trust_eticket') },
    { icon: ShieldCheck, label: t('trust_carriers') },
    { icon: RotateCcw, label: t('trust_refund'), href: '/faq/ticket-refund/' as const },
  ];

  return (
    <ul className={`grid grid-cols-1 gap-3 tablet:grid-cols-2 laptop:grid-cols-4 ${className}`}>
      {items.map(({ icon: Icon, label, href }, i) => {
        const content = (
          <span className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <Icon className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
            {label}
          </span>
        );

        return (
          <li key={i}>
            {href ? (
              <Link href={href} className="block transition-colors hover:border-green-500">
                {content}
              </Link>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}

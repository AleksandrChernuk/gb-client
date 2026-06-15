import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { CreditCard, Mail, ShieldCheck, RotateCcw } from 'lucide-react';

// Trust-сигнали для комерційних хабів: знімають частину YMYL-сумнівів
// (оплата, e-квиток, перевізники, повернення) перед кроком покупки.
// Стиль узгоджений з картками міст: rounded-2xl, м'яка іконка в кружку, зелений акцент.
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
        const inner = (
          <div className="flex h-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors group-hover:border-green-500 dark:border-slate-800 dark:bg-slate-900 dark:group-hover:border-green-400">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium leading-snug text-slate-700 dark:text-slate-200">{label}</span>
          </div>
        );

        return (
          <li key={i} className="group">
            {href ? (
              <Link href={href} className="block h-full">
                {inner}
              </Link>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}

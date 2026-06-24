import { getTranslations } from 'next-intl/server';
import { Locale } from 'next-intl';
import { CreditCard, Mail, Bus } from 'lucide-react';
import { Container } from '@/shared/ui/Container';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

interface RouteLeadProps {
  fromName: string;
  toName: string;
  price?: number | null;
  lng: Locale;
}

export default async function RouteLead({ fromName, toName, price, lng }: RouteLeadProps) {
  if (fromName === '—' || toName === '—') return null;

  const t = await getTranslations({ locale: lng, namespace: MESSAGE_FILES.METADATA });
  const lead = price
    ? t('route_slug.lead', { fromName, toName, price })
    : t('route_slug.lead_no_price', { fromName, toName });

  const trust = [
    { icon: CreditCard, label: t('route_slug.trust_payment') },
    { icon: Mail, label: t('route_slug.trust_eticket') },
    { icon: Bus, label: t('route_slug.trust_carriers') },
  ];

  return (
    <section className="pt-6 laptop:pt-8" aria-labelledby="route-summary-heading">
      <Container size="l">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 laptop:p-6">
          <h2 id="route-summary-heading" className="sr-only">
            {t('route_slug.results_heading', { fromName, toName })}
          </h2>
          <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{lead}</p>

          <ul className="mt-5 grid grid-cols-1 gap-3 tablet:grid-cols-3">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

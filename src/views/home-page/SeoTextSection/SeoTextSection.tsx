import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/routing';
import { useTranslations } from 'next-intl';
import { MapPin, ArrowRight, Route, Globe2 } from 'lucide-react';

export default function SeoTextSection() {
  const t = useTranslations(MESSAGE_FILES.MAIN_PAGE);

  const hubs = [
    { href: '/routes/', label: t('seo_link_routes'), icon: Route },
    { href: '/all-countries/', label: t('seo_link_all'), icon: Globe2 },
  ];

  const countries = [
    { href: '/all-countries/ukraine/', label: t('c_ukraine') },
    { href: '/all-countries/poland/', label: t('c_poland') },
    { href: '/all-countries/germany/', label: t('c_germany') },
    { href: '/all-countries/czech-republic/', label: t('c_czech') },
    { href: '/all-countries/austria/', label: t('c_austria') },
    { href: '/all-countries/slovakia/', label: t('c_slovakia') },
  ];

  return (
    <section className="py-12">
      <Container size="m">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 tablet:p-8">
          <h2 className="mb-4 text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('seoText.title')}</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>{t('seoText.p1')}</p>
            <p>{t('seoText.p2')}</p>
            <p>{t('seoText.p3')}</p>
            <p>{t('seoText.p4')}</p>
          </div>

          <h3 className="mb-3 mt-8 text-base font-bold text-slate-700 dark:text-slate-50">{t('seo_links_title')}</h3>

          <div className="mb-4 grid grid-cols-1 gap-3 tablet:grid-cols-2">
            {hubs.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                prefetch={false}
                className="group flex items-center justify-between gap-3 rounded-2xl bg-green-500 px-5 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5" />
                  {label}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {countries.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                prefetch={false}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white py-2 pl-3 pr-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-green-500 hover:text-green-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-green-400 dark:hover:text-green-400"
              >
                <MapPin className="h-4 w-4 text-slate-400" />
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

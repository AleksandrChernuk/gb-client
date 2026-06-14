import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/routing';
import { useTranslations } from 'next-intl';

export default function SeoTextSection() {
  const t = useTranslations(MESSAGE_FILES.MAIN_PAGE);

  const links = [
    { href: '/routes/', label: t('seo_link_routes') },
    { href: '/all-countries/', label: t('seo_link_all') },
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
        <h2 className="mb-4 text-2xl font-semibold text-slate-800 dark:text-slate-100">{t('seoText.title')}</h2>
        <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <p>{t('seoText.p1')}</p>
          <p>{t('seoText.p2')}</p>
          <p>{t('seoText.p3')}</p>
          <p>{t('seoText.p4')}</p>
        </div>

        <h3 className="mb-3 mt-8 text-base font-bold text-slate-700 dark:text-slate-50">{t('seo_links_title')}</h3>
        <div className="flex flex-wrap gap-2.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch={false}
              className="inline-flex items-center rounded-full border border-green-500/30 bg-green-50 px-3.5 py-1.5 text-sm font-medium text-green-700 transition-colors hover:border-green-500 hover:bg-green-100 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

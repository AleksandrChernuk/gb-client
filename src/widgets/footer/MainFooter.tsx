import Logo from '@/entities/company/Logo';
import Support from '@/entities/company/Support';
import FooterLinksList from '@/entities/footer/FooterLinksList';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { footerNavLinks } from '@/shared/constans/footer-nav-links.constans';
import { Link } from '@/shared/i18n/routing';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';

type TMainFooter = {
  className?: string;
};

export default async function MainFooter({ className }: TMainFooter) {
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <footer
      role="contentinfo"
      aria-label={t('footer_aria_label') ?? 'Website footer'}
      className={cn('w-full py-6 laptop:py-8 border-t border-[#e6e6e6] dark:border-slate-700', className)}
    >
      <Container size="m">
        <nav className="grid grid-cols-2 gap-x-4 gap-y-8 tablet:grid-cols-3 laptop:grid-cols-4 laptop:gap-x-[114px] pb-8">
          <div>
            <h5 className="mb-4 text-base font-bold leading-6 text-slate-700 dark:text-slate-50">
              {t('forPassengersTitle')}
            </h5>
            <FooterLinksList navLinks={footerNavLinks['passengers']} />
          </div>

          <div>
            <h5 className="mb-4 text-base font-bold leading-6 text-slate-700 dark:text-slate-50">
              {t('for_cooperation')}
            </h5>
            <FooterLinksList navLinks={footerNavLinks['employees']} />
          </div>

          <div>
            <h5 className="mb-4 text-base font-bold leading-6 text-slate-700 dark:text-slate-50">{t('contacts')}</h5>
            <div className="flex flex-col gap-4">
              <Support variant="footer" />
              <Link
                href="mailto:greenbus.ukraine@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="greenbus.ukraine@gmail.com"
                className="text-sm tablet:text-base text-slate-400 dark:text-slate-200"
                prefetch={false}
              >
                greenbus.ukraine@gmail.com
              </Link>
            </div>
          </div>

          <div className="hidden laptop:block">
            <h5 className="mb-4 text-base font-bold leading-6 text-slate-700 dark:text-slate-50">{t('follow_us')}</h5>
            <FooterLinksList navLinks={footerNavLinks['social']} className="flex flex-row gap-2" />
          </div>
        </nav>

        <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-6 border-t border-gray_light pt-8 pb-6">
          <div className="flex items-center justify-between">
            <Logo location="footer" />
            <div className="laptop:hidden">
              <FooterLinksList navLinks={footerNavLinks['social']} className="flex flex-row gap-2" />
            </div>
          </div>

          <FooterLinksList navLinks={footerNavLinks['documents']} className="flex flex-row items-center gap-2" />
        </div>
      </Container>
    </footer>
  );
}

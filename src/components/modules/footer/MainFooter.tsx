import { Container } from '@/components/shared/Container';
import FooterLinksList from '@/components/shared/FooterLinksList';

import Logo from '@/components/shared/Logo';
import { Support } from '@/components/shared/Support';
import { footerNavLinks } from '@/constans/footer-nav-links.constans';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

type TMainFooter = {
  className?: string;
};

export default async function MainFooter({ className }: TMainFooter) {
  const t = await getTranslations('common');
  return (
    <footer aria-label="Footer" className={cn('w-full py-6 laptop:py-8', className)}>
      <Container size="m">
        <ul className="grid grid-cols-2 gap-x-[17px] gap-y-[32px] gap-4 tablet:grid-cols-3 laptop:grid-cols-4 laptop:gap-[114px] pb-8">
          <li>
            <h5 className="mb-4 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50 ">
              {t('forPassengersTitle')}
            </h5>
            <FooterLinksList navLinks={footerNavLinks['passengers']} />
          </li>
          <li>
            <h5 className="mb-4 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50 ">
              {t('for_cooperation')}
            </h5>
            <FooterLinksList navLinks={footerNavLinks['employees']} />
          </li>

          <li className="col-span-2 tablet:col-span-1">
            <ul className="flex flex-col size-full">
              <li>
                <h5 className="mb-4 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
                  {t('contacts')}
                </h5>
                <ul>
                  <li className="mb-2">
                    <Support variant="footer" />
                  </li>

                  <li>
                    <Link
                      href={'mailto:greenbus.ukraine@gmail.com'}
                      target="_blank"
                      aria-label="greenbus.ukraine@gmail.com"
                      className="block text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6 text-slate-400 dark:text-slate-200"
                      prefetch={false}
                    >
                      greenbus.ukraine@gmail.com
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="my-8 laptop:hidden tablet:my-0 tablet:mt-auto">
                <FooterLinksList navLinks={footerNavLinks['social']} className="flex flex-row gap-4 " />
              </li>
            </ul>
          </li>
          <li className="hidden laptop:block">
            <h4 className="mb-4 text-base font-bold tablet:text-lg text-slate-700 dark:text-slate-50">Follow us</h4>
            <FooterLinksList navLinks={footerNavLinks['social']} className="flex flex-row gap-2" />
          </li>
        </ul>

        <ul className="flex flex-col tablet:flex-row gap-6 laptop:gap-[84px] tablet:grid-cols-2 tablet:items-center border-t-[1px] border-gray_light pt-8 pb-6">
          <li className="tablet:order-last">
            <FooterLinksList
              navLinks={footerNavLinks['documents']}
              className="flex flex-row items-center justify-between tablet:justify-normal"
            />
          </li>
          <li className="tablet:row-start-1 tablet:col-start-1">
            <Logo />
          </li>
        </ul>
      </Container>
    </footer>
  );
}

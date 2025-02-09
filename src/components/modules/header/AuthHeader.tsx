import { Container } from '@/components/shared/Container';
import SelectLocale from '@/components/shared/LanguageChanger';
import Logo from '@/components/shared/Logo';
import { Support } from '@/components/shared/Support';
import { SwitchTheme } from '@/components/shared/SwitchTheme';
import { MobileMenu } from '../mobile-menu/MobileMenu';
import { Suspense } from 'react';

export default async function AuthHeader() {
  return (
    <header className='bg-white border-b-[1px] border-b-gray_0 dark:border-b-dark_mode_main1 dark:bg-dark_mode_main1'>
      <Container size='l' className='flex items-center justify-between py-4'>
        <Logo />

        <nav>
          <ul className='items-center hidden tablet:flex tablet:gap-6 laptop:gap-8'>
            <li className='laptop:hidden'>
              <Support />
            </li>
            <li>
              <Suspense>
                <SelectLocale />
              </Suspense>
            </li>
            <li>
              <SwitchTheme />
            </li>

            <li className='hidden laptop:block'>
              <Support />
            </li>
          </ul>
        </nav>
        <MobileMenu isAuthHeader />
      </Container>
    </header>
  );
}

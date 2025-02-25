import { Container } from '@/components/shared/Container';
import SelectLocale from '@/components/shared/LanguageChanger';
import Logo from '@/components/shared/Logo';
import { ProfileLink } from '@/components/shared/ProfileLink';
import { Support } from '@/components/shared/Support';
import { SwitchTheme } from '@/components/shared/SwitchTheme';
import { Suspense } from 'react';
import BackRouteButton from '@/components/shared/BackRouteButton'

export default async function СheckoutHeader({ locale }: { locale: string }) {
  return (
    <header className='bg-white border-b-2 dark:bg-dark_main'>
      <Container size='l' className='flex items-center justify-between py-4'>
        <div className='tablet:hidden'>
          <BackRouteButton />
        </div>

        <div className='hidden tablet:block'>
          <Logo />
        </div>

        <nav className='hidden tablet:block'>
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

            <li>
              <ProfileLink locale={locale} />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

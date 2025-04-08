import { Container } from '@/components/shared/Container';
import SelectLocale from '@/components/shared/LanguageChanger';
import Logo from '@/components/shared/Logo';
import { ProfileLink } from '@/components/shared/ProfileLink';
import { Support } from '@/components/shared/Support';
import { SwitchTheme } from '@/components/shared/SwitchTheme';
import { MobileMenu } from '../mobile-menu/MobileMenu';

export default async function MainHeader() {
  return (
    <header className="bg-white border-b-2 dark:bg-slate-800 border-b-[#e6e6e6] dark:border-b-slate-700 ">
      <Container size="l" className="flex items-center justify-between py-4">
        <Logo />

        <nav>
          <ul className="items-center hidden tablet:flex tablet:gap-6 laptop:gap-8">
            <li className="laptop:hidden">
              <Support type="desctop" />
            </li>
            <li>
              <SelectLocale type="desctop" />
            </li>
            <li>
              <SwitchTheme />
            </li>

            <li className="hidden laptop:block">
              <Support type="desctop" />
            </li>

            <li>
              <ProfileLink type="desctop" />
            </li>
          </ul>
        </nav>
        <MobileMenu />
      </Container>
    </header>
  );
}

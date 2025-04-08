import { Container } from '@/components/shared/Container';
import SelectLocale from '@/components/shared/LanguageChanger';
import Logo from '@/components/shared/Logo';
import { Support } from '@/components/shared/Support';
import { SwitchTheme } from '@/components/shared/SwitchTheme';
import { MobileMenu } from '../mobile-menu/MobileMenu';

export default async function AuthHeader() {
  return (
    <header className="bg-white border-b-[1px] border-b-[#e6e6e6] dark:border-b-slate-800 dark:bg-slate-800">
      <Container size="l" className="flex items-center justify-between py-4">
        <Logo />

        <nav>
          <ul className="items-center hidden tablet:flex tablet:gap-6 laptop:gap-8">
            <li className="laptop:hidden">
              <Support variant="desktop" />
            </li>
            <li>
              <SelectLocale variant="desktop" />
            </li>
            <li>
              <SwitchTheme />
            </li>

            <li className="hidden laptop:block">
              <Support variant="desktop" />
            </li>
          </ul>
        </nav>
        <MobileMenu isAuthHeader />
      </Container>
    </header>
  );
}

// import SelectLocale from '@/entities/common/SelectLocale';
import Logo from '@/entities/company/Logo';
import Support from '@/entities/company/Support';
import { ProfileLink } from '@/entities/profile/ProfileLink';
import { Container } from '@/shared/ui/Container';
import SwitchTheme from '@/shared/ui/SwitchTheme';
import { HeaderMobileMenu } from '@/widgets/header/MobileMenu';

export default function MainHeader() {
  return (
    <header className="bg-white border-b-2 dark:bg-slate-800 border-b-[#e6e6e6] dark:border-b-slate-700 ">
      <Container size="l" className="flex items-center justify-between py-4">
        <Logo location="header" />

        <nav>
          <ul className="items-center hidden tablet:flex tablet:gap-6 laptop:gap-8">
            <li className="laptop:hidden">
              <Support variant="desktop" />
            </li>
            <li>
              {/* <Suspense>
                <SelectLocale variant="desktop" />
              </Suspense> */}
            </li>
            <li>
              <SwitchTheme />
            </li>
            <li className="hidden laptop:block">
              <Support variant="desktop" />
            </li>
            <li>
              <ProfileLink variant="desktop" />
            </li>
          </ul>
        </nav>

        <HeaderMobileMenu />
      </Container>
    </header>
  );
}

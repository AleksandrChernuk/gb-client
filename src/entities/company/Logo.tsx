import { IconLogo } from '@/assets/icons/IconLogo';
import { Link } from '@/shared/i18n/routing';
import { Mulish } from 'next/font/google';

const mullish = Mulish({
  variable: '--font-mulish',
  subsets: ['latin'],
  weight: '800',
  display: 'swap',
  adjustFontFallback: true,
});

const Logo = () => {
  return (
    <Link
      href={'/'}
      aria-label="На головну сторінку GreenBus"
      scroll
      className={`flex items-center font-mulish text-[26.838px] font-extrabold tracking-normal leading-normal tablet:text-[31.88px] tablet:leading-[33.68px] ${mullish.className}`}
    >
      <div className="w-[38px] h-[47px]">
        <IconLogo />
      </div>
      <span className="ml-1 text-primary">Green</span>
      <span className="text-secondary">Bus</span>
    </Link>
  );
};

export default Logo;

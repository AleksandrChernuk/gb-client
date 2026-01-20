import { IconLogo } from '@/assets/icons/IconLogo';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Mulish } from 'next/font/google';

const mullish = Mulish({
  variable: '--font-mulish',
  subsets: ['latin'],
  weight: '800',
  display: 'swap',
  adjustFontFallback: true,
});

interface LogoProps {
  location?: 'header' | 'footer' | 'mobile';
}

const Logo = async ({ location = 'header' }: LogoProps) => {
  const t = await getTranslations(MESSAGE_FILES.COMMON);
  const ariaLabels = {
    header: t('logo_aria_label_header'),
    footer: t('logo_aria_label_footer'),
    mobile: t('logo_aria_label_mobile'),
  };

  const ariaLabel = ariaLabels[location];

  return (
    <Link
      href={'/'}
      aria-label={ariaLabel}
      scroll
      className={`flex items-center font-mulish text-[26.838px] font-extrabold tracking-normal leading-normal tablet:text-[31.88px] tablet:leading-[33.68px] ${mullish.className}`}
    >
      <div className="w-[38px] h-[47px] " aria-hidden="true">
        <IconLogo />
      </div>
      <span className="ml-1">
        <span className="text-primary">Green</span>
        <span className="text-secondary">Bus</span>
      </span>
    </Link>
  );
};

export default Logo;

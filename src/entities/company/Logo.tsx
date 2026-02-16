'use client';

import { GreenBusLogoIcon } from '@/assets/icons/GreenBusLogoIcon';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { useTranslations } from 'next-intl';

interface LogoProps {
  location?: 'header' | 'footer' | 'mobile';
}

const Logo = ({ location = 'header' }: LogoProps) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const ariaLabels = {
    header: t('logo_aria_label_header'),
    footer: t('logo_aria_label_footer'),
    mobile: t('logo_aria_label_mobile'),
  };

  const ariaLabel = ariaLabels[location];

  return (
    <Link
      href={'/'}
      prefetch={location === 'header'}
      rel={location !== 'header' ? 'noopener noreferrer nofollow' : undefined}
      aria-label={ariaLabel}
      scroll
      className="flex items-center"
    >
      <GreenBusLogoIcon className={`w-48 h-12`} aria-hidden="true" />
    </Link>
  );
};

export default Logo;

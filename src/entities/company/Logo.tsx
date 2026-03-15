'use client';

import { GreenBusLogoIcon } from '@/assets/icons/GreenBusLogoIcon';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { useTranslations } from 'next-intl';

type Props = {
  location?: 'header' | 'footer' | 'mobile';
};

export default function Logo({ location = 'header' }: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <Link
      href="/"
      prefetch={location === 'header'}
      rel={location !== 'header' ? 'noopener noreferrer nofollow' : undefined}
      aria-label={t(`logo_aria_label_${location}`)}
      scroll
      className="flex items-center"
    >
      <GreenBusLogoIcon className="w-48 h-12" aria-hidden="true" />
    </Link>
  );
}

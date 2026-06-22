import { IAuthorSocialLink } from '@/shared/types/author.types';
import { IconFacebook } from '@/assets/icons/IconFacebook';
import { IconInstagram } from '@/assets/icons/IconInstagram';
import { IconTikTok } from '@/assets/icons/IconTikTok';
import { IconX } from '@/assets/icons/IconX';
import { ComponentType } from 'react';

// Монохромні іконки (fill="black"), які чисто перефарбовуються у currentColor.
const ICONS: Record<string, ComponentType> = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  tiktok: IconTikTok,
  twitter: IconX,
  x: IconX,
};

const ABBR: Record<string, string> = {
  linkedin: 'IN',
  telegram: 'TG',
  youtube: 'YT',
  threads: 'TH',
  pinterest: 'PT',
  viber: 'VB',
  whatsapp: 'WA',
};

function abbr(socialName: string): string {
  const key = socialName.trim().toLowerCase();
  return ABBR[key] ?? key.slice(0, 2).toUpperCase();
}

export function AuthorSocials({ links }: { links: IAuthorSocialLink[] }) {
  if (links.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((link) => {
        const key = link.socialName.trim().toLowerCase();
        const Icon = ICONS[key];

        return (
          <li key={link.socialLink}>
            <a
              href={link.socialLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label={link.socialName}
              title={link.socialName}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-green-300 text-xs font-semibold text-green-600 transition-colors hover:bg-green-500 hover:text-white dark:border-green-700 dark:text-green-300 [&_path]:fill-current [&_svg]:h-5 [&_svg]:w-5"
            >
              {Icon ? <Icon /> : abbr(link.socialName)}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

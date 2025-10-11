import { IconFacebook } from '@/assets/icons/IconFacebook';
import { IconInstagram } from '@/assets/icons/IconInstagram';
import { IconTikTok } from '@/assets/icons/IconTikTok';
import { IconX } from '@/assets/icons/IconX';

export const footerNavLinks = {
  documents: [
    {
      title: 'oferta',
      href: '/oferta',
    },
    {
      title: 'privacy_policy',
      href: '/privacy-policy',
    },
  ],
  employees: [
    {
      title: 'about',
      href: '/about',
    },
    {
      title: 'for_carriers',
      href: '/for-carriers',
    },
    {
      title: 'for_agents',
      href: '/for-agents',
    },
  ],
  passengers: [
    {
      title: 'faq',
      href: '/faq',
    },
    {
      title: 'blog',
      href: '/blog',
    },
    {
      title: 'bus_routes',
      href: '/route-planner',
    },
    {
      title: 'oll_countries',
      href: '/all-countries',
    },
    {
      title: 'carriers',
      href: '/carriers',
    },
    {
      title: 'agents',
      href: '/agents',
    },
  ],
  social: [
    {
      title: 'instagram',
      href: 'https://instagram.com/',
      icon: <IconInstagram aria-label="Instagram" />,
      ariaLabel: 'instagram_aria',
    },
    {
      title: 'tiktok',
      href: 'https://www.tiktok.com/@greenbusukraine',
      icon: <IconTikTok aria-label="TikTok" />,
      ariaLabel: 'tiktok_aria',
    },
    {
      title: 'x',
      href: 'https://x.com/@GreenBusUkraine',
      icon: <IconX aria-label="X (Twitter)" />,
      ariaLabel: 'x_aria',
    },
    {
      title: 'facebook',
      href: 'https://www.facebook.com/',
      icon: <IconFacebook aria-label="Facebook" />,
      ariaLabel: 'facebook_aria',
    },
  ],
};

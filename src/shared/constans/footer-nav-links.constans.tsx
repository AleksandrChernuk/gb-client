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
      href: 'http://instagram.com/',
      icon: <IconInstagram />,
    },
    {
      title: 'tiktok',
      href: 'https://www.tiktok.com/',
      icon: <IconTikTok />,
    },
    {
      title: 'x',
      href: 'https://x.com/',
      icon: <IconX />,
    },
    {
      title: 'facebook',
      href: 'https://www.facebook.com/',
      icon: <IconFacebook />,
    },
  ],
};

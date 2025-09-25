import { IconTelegram } from '@/assets/icons/IconTelegram';
import { IconFlagUA } from '@/assets/icons/IconFlagUA';
import { IconWhatsapp } from '@/assets/icons/IconWhatsapp';
import { IconViber } from '@/assets/icons/IconViber';

export const supportNavlinks = [
  {
    title: '+380 (98) 744 64 19',
    icon: <IconFlagUA />,
    src: 'tel:+380987446419',
  },
  {
    title: 'Telegram',
    icon: <IconTelegram />,
    src: 'https://t.me/+380987446419',
  },
  {
    title: 'WhatsApp',
    icon: <IconWhatsapp />,
    src: 'https://wa.me/380987446419',
  },
  {
    title: 'Viber',
    icon: <IconViber />,
    src: 'viber://chat?number=380987446419',
  },
];

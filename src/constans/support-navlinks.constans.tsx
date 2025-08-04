import { IconTelegram } from '@/components/icons/IconTelegram';
import { IconFlagUA } from '../components/icons/IconFlagUA';
import { IconWhatsapp } from '@/components/icons/IconWhatsapp';
import { IconVber } from '@/components/icons/IconVber';

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
    icon: <IconVber />,
    src: 'viber://chat?number=380987446419',
  },
];

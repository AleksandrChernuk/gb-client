export type SupportIconType = 'IconFlagUA' | 'IconTelegram' | 'IconWhatsapp' | 'IconViber';

export const supportNavlinks = [
  {
    title: '+380 (98) 744 64 19',
    titleKey: 'contact_phone_1',
    icon: 'IconFlagUA' as SupportIconType,
    src: 'tel:+380987446419',
  },
  {
    title: '+380 (99) 603 38 32',
    titleKey: 'contact_phone_2',
    icon: 'IconFlagUA' as SupportIconType,
    src: 'tel:+380996033832',
  },
  {
    title: 'Telegram',
    titleKey: 'contact_telegram',
    icon: 'IconTelegram' as SupportIconType,
    src: 'https://t.me/+380987446419',
  },
  {
    title: 'WhatsApp',
    titleKey: 'contact_whatsapp',
    icon: 'IconWhatsapp' as SupportIconType,
    src: 'https://wa.me/380987446419',
  },
  {
    title: 'Viber',
    titleKey: 'contact_viber',
    icon: 'IconViber' as SupportIconType,
    src: 'viber://chat?number=380987446419',
  },
];

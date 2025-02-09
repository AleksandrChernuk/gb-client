import { IconFacebook } from "@/components/icons/IconFacebook";
import { IconInstagram } from "@/components/icons/IconInstagram";
import { IconTikTok } from "@/components/icons/IconTikTok";
import { IconX } from "@/components/icons/IconX";

export const footerNavLinks = {
  documents: [
    {
      title: "Договір оферта",
      href: "/oferta",
    },
    {
      title: "Політика конфіденційності",
      href: "/privacy-policy",
    },
  ],
  employees: [
    {
      title: "Про нас",
      href: "/about",
    },
    {
      title: "Перевізникам",
      href: "/for-carriers",
    },
    {
      title: "Агентам",
      href: "/for-agents",
    },
  ],
  passengers: [
    {
      title: "Питання та відповіді",
      href: "/faq",
    },
    {
      title: "Блог",
      href: "/blog",
    },
    {
      title: "Автобусні маршрути",
      href: "/bus-routes",
    },
    {
      title: "Всі Міста",
      href: "/oll-countries",
    },
    {
      title: "Перевізники",
      href: "/carriers",
    },
    {
      title: "Агенства",
      href: "/agents",
    },
  ],
  social: [
    {
      title: "instagram",
      href: "http://instagram.com/",
      icon: <IconInstagram />,
    },
    {
      title: "tiktok",
      href: "https://www.tiktok.com/",
      icon: <IconTikTok />,
    },
    {
      title: "x",
      href: "https://x.com/",
      icon: <IconX />,
    },
    {
      title: "facebook",
      href: "https://www.facebook.com/",
      icon: <IconFacebook />,
    },
  ],
};

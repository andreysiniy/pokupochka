export type FooterNavLink = {
  label: string;
  to: string;
};

export type FooterAccountLink = {
  label: string;
  to: string;
};

export type FooterContactItem = {
  label: string;
  value: string;
  href?: string;
  icon: "office" | "phone" | "email";
};

export const footerNavLinks: FooterNavLink[] = [
  { label: "Доставка", to: "/delivery" },
  { label: "О нас", to: "/about" },
  { label: "Вакансии", to: "/jobs" },
];

export const footerAccountLinks: FooterAccountLink[] = [
  { label: "Избранное", to: "/wishlist" },
  { label: "Корзина", to: "/checkout" },
  { label: "Акции", to: "/sale" },
];

export const footerContactItems: FooterContactItem[] = [
  {
    label: "Офис",
    value: "Москва, ул. Лесная, 14",
    icon: "office",
  },
  {
    label: "Телефон",
    value: "+7 (800) 555-35-35",
    href: "tel:+78005553535",
    icon: "phone",
  },
  {
    label: "Email",
    value: "hello@pokupochka.ru",
    href: "mailto:hello@pokupochka.ru",
    icon: "email",
  },
];

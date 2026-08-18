export type NavItem = {
  href: string;
  label: string;
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Αρχική" },
  { href: "/about", label: "About me" },
  { href: "/services", label: "Διαιτολογικές Υπηρεσίες" },
  { href: "/contact", label: "Επικοινωνία" },
];

export const siteBrand = {
  name: "Άρια",
  personName: "Άρια Τσιάκα",
  personNameDisplay: "Άρια ΤΣΙΑΚΑ",
  tagline: "Διατροφή & ευεξία",
  /** Temporary until CMS / client provides final contact details */
  phone: "",
  email: "",
  address: "",
  instagramUrl: "https://www.instagram.com/",
  ctaLabel: "Κλείστε Ραντεβού",
  ctaHref: "/contact",
} as const;

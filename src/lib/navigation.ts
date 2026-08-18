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
  ctaLabel: "Κλείστε Ραντεβού",
  ctaHref: "/contact",
} as const;

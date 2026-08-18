/** Demo contact placeholders until CMS fields are filled. */
export const CONTACT_PLACEHOLDERS = {
  phone: "+30 210 123 4567",
  email: "info@ariatsiaka.gr",
  address: "Αθήνα, Ελλάδα",
  openingHours: ["Δευ–Παρ: 10:00–18:00", "Σάβ: κατόπιν ραντεβού"],
} as const;

export function withContactPlaceholders(input: {
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}): { phone: string; email: string; address: string } {
  return {
    phone: input.phone?.trim() || CONTACT_PLACEHOLDERS.phone,
    email: input.email?.trim() || CONTACT_PLACEHOLDERS.email,
    address: input.address?.trim() || CONTACT_PLACEHOLDERS.address,
  };
}

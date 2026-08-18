import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteContact } from "@/lib/wordpress/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contact = await getSiteContact();

  return (
    <>
      <Header contact={contact} />
      <main className="flex-1">{children}</main>
      <Footer contact={contact} />
    </>
  );
}

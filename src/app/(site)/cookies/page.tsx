import type { Metadata } from "next";
import {
  buildLegalMetadata,
  LegalDocumentPage,
} from "@/components/legal/LegalDocumentPage";

export async function generateMetadata(): Promise<Metadata> {
  return buildLegalMetadata("cookies");
}

export default function CookiesPage() {
  return <LegalDocumentPage slug="cookies" />;
}

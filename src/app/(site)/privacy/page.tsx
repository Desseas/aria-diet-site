import type { Metadata } from "next";
import {
  buildLegalMetadata,
  LegalDocumentPage,
} from "@/components/legal/LegalDocumentPage";

export async function generateMetadata(): Promise<Metadata> {
  return buildLegalMetadata("privacy");
}

export default function PrivacyPage() {
  return <LegalDocumentPage slug="privacy" />;
}

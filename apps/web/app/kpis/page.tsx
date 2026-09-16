import type { Metadata } from "next";
import { KpisPage } from "@/src/features/kpis/KpisPage";
import { KPIS_PAGE_CONTENT } from "@/src/features/kpis/kpisContent";

export const metadata: Metadata = {
  title: KPIS_PAGE_CONTENT.seo.title,
  description: KPIS_PAGE_CONTENT.seo.description,
};

export default function Kpis() {
  return <KpisPage />;
}

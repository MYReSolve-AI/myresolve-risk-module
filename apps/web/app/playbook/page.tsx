import type { Metadata } from "next";
import { PlaybookPage } from "@/src/features/playbook/PlaybookPage";
import { PLAYBOOK_PAGE_CONTENT } from "@/src/features/playbook/playbookContent";

export const metadata: Metadata = {
  title: PLAYBOOK_PAGE_CONTENT.seo.title,
  description: PLAYBOOK_PAGE_CONTENT.seo.description,
};

export default function Playbook() {
  return <PlaybookPage />;
}

import type { Metadata } from "next";
import { LandingPage } from "@/src/features/home/LandingPage";
import { getLandingPageContent } from "@/src/features/home/landingContent.server";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingPageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

export default async function Home() {
  const content = await getLandingPageContent();
  return <LandingPage content={content} />;
}

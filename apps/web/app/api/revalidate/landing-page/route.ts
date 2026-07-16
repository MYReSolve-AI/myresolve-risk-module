import { revalidateTag } from "next/cache";
import { handleLandingPageWebhook } from "@/src/features/home/landingWebhook";

export async function POST(request: Request) {
  return handleLandingPageWebhook(request, {
    secret: process.env.SANITY_REVALIDATE_SECRET,
    revalidate: () => revalidateTag("landing-page", "max"),
  });
}

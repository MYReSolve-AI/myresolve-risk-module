import { OrganisationProfileClient } from "@/src/features/organisation-profile";

export const metadata = {
  title: "MYReSolve Organisation Profile",
  description:
    "Capture the minimum organisation context for MYReSolve executive insight.",
};

export default function OrganisationProfilePage() {
  return <OrganisationProfileClient />;
}

import { ExecutiveDashboardClient } from "@/src/features/executive-dashboard/components/ExecutiveDashboardClient";

export const metadata = {
  title: "MYReSolve Executive Dashboard",
  description:
    "Executive operational health, value at risk and priorities from the MYReSolve assessment engine.",
};

export default function DashboardPage() {
  return <ExecutiveDashboardClient />;
}

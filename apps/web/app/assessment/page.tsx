import { AssessmentClient } from "@/src/features/assessment";

export const metadata = {
  title: "MYReSolve Assessment",
  description:
    "Executive operational maturity, risk and cost-of-failure assessment.",
};

export default function AssessmentPage() {
  return <AssessmentClient />;
}

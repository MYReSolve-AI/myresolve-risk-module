/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExecutiveDashboard } from "./ExecutiveDashboard";
import {
  mixedAssessment,
  emptyAssessment,
} from "@/src/domain/assessment/__fixtures__/states";
import { mixed } from "@/src/domain/assessment/__fixtures__/golden";
import { formatGbp } from "../lib/format";

describe("ExecutiveDashboard", () => {
  it("renders the board-level Sprint 004 surface from domain values", () => {
    render(<ExecutiveDashboard state={mixedAssessment()} />);

    expect(screen.getByRole("heading", { name: "MYReSolve" })).toBeTruthy();
    expect(screen.getByText("Executive Health Score")).toBeTruthy();
    expect(screen.getByTestId("metric-health")).toHaveTextContent(
      `${mixed.overall} / 100`,
    );
    expect(screen.getByTestId("metric-health")).toHaveTextContent(
      "not an industry benchmark",
    );
    expect(
      screen
        .getByTestId("metric-health")
        .querySelector('[data-tone="gold"]'),
    ).toHaveTextContent("Established");
    expect(
      screen
        .getByTestId("metric-health")
        .querySelector('[data-tone="danger"]'),
    ).toHaveTextContent("RISK: HIGH");
    expect(screen.getByTestId("metric-health")).not.toHaveTextContent(
      "CRITICAL",
    );
    expect(
      screen.queryByLabelText(/Maturity scale\. Current position/),
    ).toBeNull();
    expect(screen.getByTestId("metric-health")).not.toHaveTextContent(
      "LeadingStrongEstablishedDevelopingCritical",
    );
    expect(screen.getByTestId("metric-var")).toHaveTextContent(
      formatGbp(mixed.totalCost),
    );
    expect(screen.getByTestId("metric-var")).toHaveTextContent(
      "not an audited loss calculation or financial forecast",
    );
    expect(screen.getByTestId("metric-confidence")).toHaveTextContent(
      "Medium confidence",
    );
    expect(screen.getByTestId("metric-confidence")).toHaveTextContent(
      "24 responses",
    );
    expect(screen.queryByLabelText("Confidence mix")).toBeNull();
    expect(screen.getByTestId("metric-confidence").textContent).not.toMatch(
      /Average factor|1\.07/,
    );
    expect(screen.getByTestId("metric-highest-risk")).toHaveTextContent(
      mixed.top3[0],
    );
    expect(screen.queryByTestId("risk-heat-map")).toBeNull();
    expect(
      screen.getByRole("heading", { name: "Department Risk Overview" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Top Three Risk Areas" }),
    ).toBeTruthy();
    expect(screen.getByTestId("priorities-list").textContent).toContain(
      "People",
    );
    expect(screen.getByTestId("priorities-list").textContent).not.toContain(
      "Prioritise evidence",
    );
    expect(screen.getByTestId("priorities-list")).not.toHaveTextContent(
      "Risk score",
    );
    expect(screen.getByTestId("priorities-list")).toHaveTextContent(
      "lowest current health scores",
    );
    expect(screen.getByTestId("priorities-list").children).toHaveLength(3);
    expect(screen.queryByTestId("executive-narrative")).toBeNull();
    expect(screen.getByTestId("department-score-grid").children).toHaveLength(
      6,
    );
    expect(screen.getByTestId("assessment-progress")).toHaveTextContent(
      "24/24",
    );
  });

  it("hides company and date when unavailable", () => {
    render(<ExecutiveDashboard state={mixedAssessment()} />);
    expect(screen.queryByText("Company")).toBeNull();
    expect(screen.queryByText("Date")).toBeNull();
    expect(screen.getByText("Assessment completed")).toBeTruthy();
    expect(screen.queryByText("Version")).toBeNull();
    expect(screen.queryByText("v0.3.1")).toBeNull();
  });

  it("shows company and date only when supplied", () => {
    render(
      <ExecutiveDashboard
        state={mixedAssessment()}
        companyName="Acme Ltd"
        assessmentDate="15 Jul 2026"
      />,
    );
    expect(screen.getByText("Company")).toBeTruthy();
    expect(screen.getByText("Acme Ltd")).toBeTruthy();
    expect(screen.getByText("Date")).toBeTruthy();
    expect(screen.getByText("15 Jul 2026")).toBeTruthy();
  });

  it("shows empty guidance when no answers are present", () => {
    render(<ExecutiveDashboard state={emptyAssessment} />);
    expect(screen.getByTestId("empty-banner")).toBeTruthy();
    expect(screen.getByTestId("priorities-empty")).toBeTruthy();
    expect(screen.getByTestId("metric-highest-risk")).toHaveTextContent("—");
    expect(screen.getByTestId("metric-confidence")).toHaveTextContent("—");
  });
});

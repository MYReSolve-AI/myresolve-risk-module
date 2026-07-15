/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressBar, scoreBarColor } from "./ProgressBar";
import { MetricCard } from "./MetricCard";

describe("ProgressBar", () => {
  it("exposes accessible progress semantics", () => {
    render(
      <ProgressBar value={48} label="Assessment progress" valueLabel="48%" />,
    );
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("48");
    expect(bar.getAttribute("aria-label")).toBe("Assessment progress");
  });

  it("matches locked score colour thresholds", () => {
    expect(scoreBarColor(75)).toBe("var(--mr-good)");
    expect(scoreBarColor(50)).toBe("var(--mr-amber)");
    expect(scoreBarColor(49)).toBe("var(--mr-danger)");
  });
});

describe("MetricCard", () => {
  it("renders title and children", () => {
    render(
      <MetricCard title="Operational Health Score" eyebrow="Health">
        <span>42/100</span>
      </MetricCard>,
    );
    expect(screen.getByText("Operational Health Score")).toBeTruthy();
    expect(screen.getByText("42/100")).toBeTruthy();
    expect(screen.getByText("Health")).toBeTruthy();
  });
});

/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { mixedAssessment } from "@/src/domain/assessment/__fixtures__/states";
import { overallScore } from "@/src/domain/assessment";
import {
  completeOrganisationProfile,
  fillRequiredOrganisationProfile,
} from "@/src/domain/organisationProfile/__fixtures__/profile";
import {
  clearOrganisationProfile,
  saveOrganisationProfile,
} from "@/src/lib/organisationProfilePersistence";
import { saveAssessmentAnswers } from "@/src/lib/assessmentPersistence";
import { buildExecutiveDashboard } from "../model/buildExecutiveDashboard";
import { ExecutiveDashboardApp } from "./ExecutiveDashboardApp";
import { ExecutiveDashboard } from "./ExecutiveDashboard";
import { mixed } from "@/src/domain/assessment/__fixtures__/golden";
import { formatGbp } from "../lib/format";

describe("ExecutiveDashboard Company display (Sprint 005)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows Company only when profile is explicitly completed", () => {
    saveOrganisationProfile(completeOrganisationProfile());
    saveAssessmentAnswers(mixedAssessment());
    render(<ExecutiveDashboardApp />);
    expect(screen.getByText("Company")).toBeTruthy();
    expect(screen.getByText("Acme Operations Ltd")).toBeTruthy();
    expect(screen.queryByText("Date")).toBeNull();
  });

  it("hides Company when fields are filled but completedAt is missing", () => {
    saveOrganisationProfile(fillRequiredOrganisationProfile());
    saveAssessmentAnswers(mixedAssessment());
    render(<ExecutiveDashboardApp />);
    expect(screen.queryByText("Company")).toBeNull();
  });

  it("hides Company when no valid completed profile exists", () => {
    clearOrganisationProfile();
    saveAssessmentAnswers(mixedAssessment());
    render(<ExecutiveDashboardApp />);
    expect(screen.queryByText("Company")).toBeNull();
    expect(screen.queryByText("Date")).toBeNull();
  });

  it("hides Company when profile exists but is incomplete", () => {
    saveOrganisationProfile({
      ...completeOrganisationProfile(),
      organisation: {
        ...completeOrganisationProfile().organisation,
        name: "",
      },
    });
    saveAssessmentAnswers(mixedAssessment());
    render(<ExecutiveDashboardApp />);
    expect(screen.queryByText("Company")).toBeNull();
  });

  it("does not change scoring outputs with or without a profile", () => {
    const state = mixedAssessment();
    const withoutProfile = buildExecutiveDashboard(state);

    saveOrganisationProfile(
      completeOrganisationProfile({
        organisation: {
          ...completeOrganisationProfile().organisation,
          name: "Different Co",
        },
      }),
    );
    const withProfile = buildExecutiveDashboard(state);

    expect(withProfile.executiveHealth.score).toBe(
      withoutProfile.executiveHealth.score,
    );
    expect(withProfile.executiveHealth.score).toBe(overallScore(state.answers));
    expect(withProfile.annualValueAtRisk.current).toBe(
      withoutProfile.annualValueAtRisk.current,
    );
    expect(withProfile.topPriorities.map((p) => p.name)).toEqual(
      withoutProfile.topPriorities.map((p) => p.name),
    );

    render(<ExecutiveDashboard state={state} companyName="Different Co" />);
    expect(screen.getByTestId("metric-health")).toHaveTextContent(
      `${mixed.overall}/100`,
    );
    expect(screen.getByTestId("metric-var")).toHaveTextContent(
      formatGbp(mixed.totalCost),
    );
  });
});

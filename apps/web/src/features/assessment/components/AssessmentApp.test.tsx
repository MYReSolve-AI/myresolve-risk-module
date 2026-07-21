/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  STORAGE_KEY,
  TOTAL_QUESTIONS,
  allQuestions,
  SECTIONS,
  overallScore,
} from "@/src/domain/assessment";
import {
  loadAssessmentAnswers,
  saveAssessmentAnswers,
} from "@/src/lib/assessmentPersistence";
import { completeOrganisationProfile } from "@/src/domain/organisationProfile/__fixtures__/profile";
import { saveOrganisationProfile } from "@/src/lib/organisationProfilePersistence";
import { AssessmentApp } from "./AssessmentApp";
import { buildExecutiveDashboard } from "@/src/features/executive-dashboard";
import { ExecutiveDashboard } from "@/src/features/executive-dashboard";
import {
  assessmentQuestionGuidance,
  assessmentQuestionTitle,
} from "../constants";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

function storage(): Storage {
  return window.localStorage;
}

function seedCompleteProfile() {
  saveOrganisationProfile(completeOrganisationProfile());
}

describe("AssessmentApp", () => {
  beforeEach(() => {
    storage().clear();
    pushMock.mockReset();
    seedCompleteProfile();
  });

  it("gates assessment when required fields are filled but not explicitly completed", async () => {
    storage().clear();
    const { fillRequiredOrganisationProfile } = await import(
      "@/src/domain/organisationProfile/__fixtures__/profile"
    );
    saveOrganisationProfile(fillRequiredOrganisationProfile());
    render(<AssessmentApp />);
    expect(
      await screen.findByTestId("assessment-profile-gate"),
    ).toBeTruthy();
  });

  it("gates assessment when organisation profile is incomplete", async () => {
    storage().clear();
    render(<AssessmentApp />);
    expect(
      await screen.findByTestId("assessment-profile-gate"),
    ).toBeTruthy();
    expect(screen.getByTestId("assessment-profile-gate-link")).toHaveAttribute(
      "href",
      "/organisation-profile",
    );
    expect(screen.queryByTestId("question-text")).toBeNull();
  });

  it("preserves assessment answers when showing the profile gate", async () => {
    storage().clear();
    saveAssessmentAnswers({
      answers: { "0-0": 4 },
      confidence: { "0-0": "high" },
    });
    render(<AssessmentApp />);
    expect(await screen.findByTestId("assessment-profile-gate")).toBeTruthy();
    expect(loadAssessmentAnswers().answers["0-0"]).toBe(4);
    expect(loadAssessmentAnswers().confidence["0-0"]).toBe("high");
  });

  it("renders all 24 questions in correct domain order via navigation", async () => {
    const user = userEvent.setup();
    render(<AssessmentApp />);
    await waitFor(() =>
      expect(screen.getByTestId("question-text")).toBeTruthy(),
    );
    const expected = allQuestions();

    for (let i = 0; i < expected.length; i++) {
      expect(screen.getByTestId("question-text")).toHaveTextContent(
        assessmentQuestionTitle(expected[i]!.id, expected[i]!.text),
      );
      expect(screen.getByTestId("progress-header")).toHaveTextContent(
        SECTIONS[expected[i]!.sectionIndex]!.name,
      );
      expect(screen.getByTestId("progress-header")).toHaveTextContent(
        `Viewing question ${i + 1} of ${TOTAL_QUESTIONS}`,
      );
      expect(screen.getByTestId("question-guidance")).toHaveTextContent(
        assessmentQuestionGuidance(expected[i]!.id),
      );
      if (i < expected.length - 1) {
        await user.click(screen.getByTestId("nav-next"));
      }
    }
  });

  it("uses the approved five-level colours in assessment and review", async () => {
    const user = userEvent.setup();
    render(<AssessmentApp />);
    await waitFor(() => expect(screen.getByTestId("maturity-1")).toBeTruthy());

    expect(screen.getByTestId("maturity-1")).toHaveAttribute(
      "data-rating",
      "critical",
    );
    expect(screen.getByTestId("maturity-5")).toHaveAttribute(
      "data-rating",
      "leading",
    );

    await user.click(screen.getByTestId("maturity-1"));
    await user.click(screen.getByTestId("nav-review"));

    const reviewRating = screen.getByTestId("review-rating-0-0");
    expect(reviewRating).toHaveTextContent("1 · Critical");
    expect(reviewRating).toHaveAttribute("data-rating", "critical");
  });

  it("selects maturity and confidence and autosaves to locked storage", async () => {
    const user = userEvent.setup();
    render(<AssessmentApp />);
    await waitFor(() => expect(screen.getByTestId("maturity-3")).toBeTruthy());

    await user.click(screen.getByTestId("maturity-3"));
    await user.click(screen.getByTestId("confidence-high"));

    const stored = JSON.parse(storage().getItem(STORAGE_KEY) || "{}");
    expect(stored.answers["0-0"]).toBe(3);
    expect(stored.confidence["0-0"]).toBe("high");
    expect(screen.getByTestId("save-status")).toHaveTextContent("Saved");

    const restored = loadAssessmentAnswers();
    expect(restored.answers["0-0"]).toBe(3);
    expect(restored.confidence["0-0"]).toBe("high");
  });

  it("defaults confidence to medium when maturity is chosen first", async () => {
    const user = userEvent.setup();
    render(<AssessmentApp />);
    await waitFor(() => expect(screen.getByTestId("maturity-4")).toBeTruthy());
    await user.click(screen.getByTestId("maturity-4"));
    const stored = JSON.parse(storage().getItem(STORAGE_KEY) || "{}");
    expect(stored.answers["0-0"]).toBe(4);
    expect(stored.confidence["0-0"]).toBe("medium");
  });

  it("supports next/previous navigation", async () => {
    const user = userEvent.setup();
    render(<AssessmentApp />);
    await waitFor(() =>
      expect(screen.getByTestId("nav-previous")).toBeTruthy(),
    );
    expect(screen.getByTestId("nav-previous")).toBeDisabled();
    await user.click(screen.getByTestId("nav-next"));
    expect(screen.getByTestId("question-text")).toHaveTextContent(
      allQuestions()[1]!.text,
    );
    await user.click(screen.getByTestId("nav-previous"));
    expect(screen.getByTestId("question-text")).toHaveTextContent(
      allQuestions()[0]!.text,
    );
  });

  it("restores an incomplete assessment from localStorage", async () => {
    saveAssessmentAnswers({
      answers: { "0-0": 2, "1-0": 5 },
      confidence: { "0-0": "low", "1-0": "high" },
    });
    render(<AssessmentApp />);
    await waitFor(() => expect(screen.getByTestId("maturity-2")).toBeTruthy());
    expect(screen.getByTestId("maturity-2")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByTestId("confidence-low")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByTestId("progress-header")).toHaveTextContent(
      "Viewing question 1 of 24",
    );
    expect(screen.getByTestId("progress-header")).toHaveTextContent(
      "2 of 24 answered",
    );
  });

  it("handles incomplete completion with unanswered review", async () => {
    const user = userEvent.setup();
    render(<AssessmentApp />);
    await waitFor(() => expect(screen.getByTestId("nav-review")).toBeTruthy());
    await user.click(screen.getByTestId("nav-review"));
    expect(screen.getByTestId("review-answers")).toBeTruthy();
    await user.click(screen.getByTestId("review-complete"));
    expect(screen.getByTestId("review-validation")).toHaveTextContent(
      "24 questions still unanswered",
    );
    expect(pushMock).not.toHaveBeenCalled();
    expect(
      within(screen.getByTestId("review-item-0-0")).getByText("Unanswered"),
    ).toBeTruthy();
  });

  it("routes to dashboard when complete and persists answers for dashboard", async () => {
    const user = userEvent.setup();
    const answers: Record<string, number> = {};
    const confidence: Record<string, string> = {};
    allQuestions().forEach((q) => {
      answers[q.id] = 3;
      confidence[q.id] = "medium";
    });
    saveAssessmentAnswers({ answers, confidence });

    render(<AssessmentApp />);
    await waitFor(() => expect(screen.getByTestId("nav-review")).toBeTruthy());
    await user.click(screen.getByTestId("nav-review"));
    await user.click(screen.getByTestId("review-complete"));

    expect(pushMock).toHaveBeenCalledWith("/dashboard");

    const saved = loadAssessmentAnswers();
    const model = buildExecutiveDashboard(saved);
    expect(model.executiveHealth.score).toBe(overallScore(saved.answers));
    expect(model.departments).toHaveLength(6);

    render(<ExecutiveDashboard state={saved} />);
    expect(screen.getByTestId("metric-health")).toHaveTextContent(
      `${model.executiveHealth.score}/100`,
    );
  });

  it("save and exit keeps answers and returns home", async () => {
    const user = userEvent.setup();
    render(<AssessmentApp />);
    await waitFor(() => expect(screen.getByTestId("maturity-1")).toBeTruthy());
    await user.click(screen.getByTestId("maturity-1"));
    await user.click(screen.getByTestId("nav-save-exit"));
    expect(pushMock).toHaveBeenCalledWith("/");
    expect(loadAssessmentAnswers().answers["0-0"]).toBe(1);
  });

  it("does not duplicate scoring logic in the assessment UI", async () => {
    const answers: Record<string, number> = {};
    const confidence: Record<string, string> = {};
    allQuestions().forEach((q) => {
      answers[q.id] = 5;
      confidence[q.id] = "high";
    });
    const state = { answers, confidence };
    expect(buildExecutiveDashboard(state).executiveHealth.score).toBe(
      overallScore(state.answers),
    );
    expect(buildExecutiveDashboard(state).executiveHealth.score).toBe(100);
  });
});

/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mixedAssessment } from "@/src/domain/assessment/__fixtures__/states";
import { saveAssessmentAnswers } from "@/src/lib/assessmentPersistence";
import { loadEvidenceAssurance } from "@/src/lib/evidenceAssurancePersistence";
import { EvidenceAssuranceApp } from "./EvidenceAssuranceApp";

describe("EvidenceAssuranceApp", () => {
  beforeEach(() => {
    localStorage.clear();
    saveAssessmentAnswers(mixedAssessment());
  });

  it("orders all departments by risk and autosaves a review", async () => {
    const user = userEvent.setup();
    render(<EvidenceAssuranceApp />);

    const list = screen.getByTestId("assurance-department-list");
    expect(list.children).toHaveLength(6);
    expect(list.children[0]).toHaveTextContent("People");
    expect(screen.getByText(/synthetic or redacted references only/i)).toBeTruthy();

    await user.click(screen.getByTestId("review-department-0"));
    expect(screen.getByTestId("assurance-editor")).toHaveTextContent("People");
    await user.click(screen.getByRole("radio", { name: /Partly evidenced/ }));
    await user.type(
      screen.getByLabelText("Reviewer name or role"),
      "People lead",
    );
    await user.type(
      screen.getByLabelText("Redacted evidence references and notes"),
      "Redacted workforce dashboard",
    );

    expect(loadEvidenceAssurance().reviews["0"]).toMatchObject({
      status: "partly_evidenced",
      reviewer: "People lead",
      evidenceReferences: "Redacted workforce dashboard",
    });
  });
});

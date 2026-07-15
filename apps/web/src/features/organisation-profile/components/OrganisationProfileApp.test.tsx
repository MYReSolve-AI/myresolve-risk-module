/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ORGANISATION_PROFILE_PRIVACY_COPY,
  SECTION_ORDER,
} from "@/src/domain/organisationProfile";
import {
  completeOrganisationProfile,
  fillRequiredOrganisationProfile,
} from "@/src/domain/organisationProfile/__fixtures__/profile";
import {
  ORGANISATION_PROFILE_STORAGE_KEY,
  loadOrganisationProfile,
  saveOrganisationProfile,
} from "@/src/lib/organisationProfilePersistence";
import { STORAGE_KEY as ASSESSMENT_STORAGE_KEY } from "@/src/domain/assessment";
import { OrganisationProfileApp } from "./OrganisationProfileApp";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("OrganisationProfileApp", () => {
  beforeEach(() => {
    localStorage.clear();
    pushMock.mockReset();
  });

  it("shows privacy guidance near the first step", () => {
    render(<OrganisationProfileApp />);
    expect(screen.getByTestId("organisation-profile-privacy")).toHaveTextContent(
      ORGANISATION_PROFILE_PRIVACY_COPY,
    );
  });

  it("renders all profile sections in order", async () => {
    const user = userEvent.setup();
    render(<OrganisationProfileApp />);

    for (let i = 0; i < SECTION_ORDER.length; i++) {
      expect(
        screen.getByTestId(`profile-section-${SECTION_ORDER[i]}`),
      ).toBeTruthy();
      if (i < SECTION_ORDER.length - 1) {
        await user.click(screen.getByTestId("profile-next"));
      }
    }
  });

  it("supports previous/next navigation and review", async () => {
    const user = userEvent.setup();
    render(<OrganisationProfileApp />);
    expect(screen.getByTestId("profile-previous")).toBeDisabled();
    await user.click(screen.getByTestId("profile-next"));
    expect(screen.getByTestId("profile-section-customers")).toBeTruthy();
    await user.click(screen.getByTestId("profile-previous"));
    expect(screen.getByTestId("profile-section-organisation")).toBeTruthy();
    await user.click(screen.getByTestId("profile-open-review"));
    expect(screen.getByTestId("profile-review")).toBeTruthy();
    expect(screen.getByTestId("profile-status-incomplete")).toBeTruthy();
  });

  it("autosaves field changes", async () => {
    const user = userEvent.setup();
    render(<OrganisationProfileApp />);
    await user.type(screen.getByTestId("organisation.name"), "Northwind");
    const raw = JSON.parse(
      localStorage.getItem(ORGANISATION_PROFILE_STORAGE_KEY) || "{}",
    );
    expect(raw.organisation.name).toBe("Northwind");
    expect(screen.getByTestId("profile-save-status")).toHaveTextContent(
      "Saved",
    );
  });

  it("keeps Organisation Profile numeric placeholders free of fake zero values", async () => {
    const user = userEvent.setup();
    render(<OrganisationProfileApp />);

    // Organisation counts
    expect(
      screen.getByTestId("organisation.operatingLocations"),
    ).not.toHaveAttribute("placeholder", "0");

    await user.click(screen.getByTestId("profile-next")); // customers
    for (const id of [
      "customers.activeCustomers",
      "customers.nps",
      "customers.customerRetentionPercent",
      "customers.serviceLevelPercent",
      "customers.complaintRatePercent",
    ]) {
      const el = screen.getByTestId(id);
      expect(el.getAttribute("placeholder") || "").not.toBe("0");
      expect(el).toHaveValue(null);
    }

    await user.click(screen.getByTestId("profile-next")); // operations
    const capacity = screen.getByTestId("operations.capacityUtilisationPercent");
    expect(capacity).toHaveAttribute("placeholder", "e.g. 75");
    expect(capacity).toHaveValue(null);
    for (const id of [
      "operations.sitesOrWarehouses",
      "operations.weeklyTransactions",
    ]) {
      expect(screen.getByTestId(id).getAttribute("placeholder") || "").not.toBe(
        "0",
      );
    }

    await user.click(screen.getByTestId("profile-next")); // people
    for (const id of [
      "people.totalHeadcount",
      "people.leadershipTeamSize",
      "people.employeeTurnoverPercent",
      "people.absenceRatePercent",
      "people.engagementScore",
    ]) {
      const el = screen.getByTestId(id);
      expect(el.getAttribute("placeholder") || "").not.toBe("0");
      expect(el).toHaveValue(null);
    }
  });

  it("accepts an explicit zero on Capacity utilisation without treating placeholder as a value", async () => {
    const user = userEvent.setup();
    render(<OrganisationProfileApp />);
    await user.click(screen.getByTestId("profile-next"));
    await user.click(screen.getByTestId("profile-next"));
    const capacity = screen.getByTestId("operations.capacityUtilisationPercent");
    await user.clear(capacity);
    await user.type(capacity, "0");
    expect(capacity).toHaveValue(0);
  });

  it("supports chip selection, removal, and Other description", async () => {
    const user = userEvent.setup();
    render(<OrganisationProfileApp />);
    await user.click(screen.getByTestId("profile-next"));
    await user.click(screen.getByTestId("profile-next"));

    await user.click(screen.getByTestId("operating-models-add-manufacturing"));
    await user.click(screen.getByTestId("operating-models-add-retail"));
    await user.click(screen.getByTestId("operating-models-add-other"));

    expect(screen.getByTestId("operating-models-chips")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Remove Manufacturing" }),
    ).toBeTruthy();
    expect(screen.getByTestId("operations.operatingModelOther")).toBeTruthy();

    await user.type(
      screen.getByTestId("operations.operatingModelOther"),
      "Franchise",
    );

    await user.click(screen.getByTestId("operating-models-remove-other"));
    expect(screen.queryByTestId("operations.operatingModelOther")).toBeNull();

    const raw = JSON.parse(
      localStorage.getItem(ORGANISATION_PROFILE_STORAGE_KEY) || "{}",
    );
    expect(raw.operations.operatingModels).toEqual(["manufacturing", "retail"]);
    expect(raw.operations.operatingModelOther).toBe("");
  });

  it("moves focus predictably after chip removal", async () => {
    const user = userEvent.setup();
    render(<OrganisationProfileApp />);
    await user.click(screen.getByTestId("profile-next"));
    await user.click(screen.getByTestId("profile-next"));

    await user.click(screen.getByTestId("operating-models-add-manufacturing"));
    await user.click(screen.getByTestId("operating-models-add-retail"));
    await user.click(screen.getByTestId("operating-models-remove-manufacturing"));

    await waitFor(() => {
      expect(document.activeElement).toBe(
        screen.getByTestId("operating-models-remove-retail"),
      );
    });
  });

  it("prevents duplicate selections", async () => {
    const user = userEvent.setup();
    render(<OrganisationProfileApp />);
    await user.click(screen.getByTestId("profile-next"));
    await user.click(screen.getByTestId("profile-next"));
    await user.click(screen.getByTestId("operating-models-add-manufacturing"));
    expect(
      screen.getByTestId("operating-models-add-manufacturing"),
    ).toBeDisabled();
    const raw = JSON.parse(
      localStorage.getItem(ORGANISATION_PROFILE_STORAGE_KEY) || "{}",
    );
    expect(raw.operations.operatingModels).toEqual(["manufacturing"]);
  });

  it("restores an incomplete profile after remount", async () => {
    saveOrganisationProfile({
      ...fillRequiredOrganisationProfile(),
      organisation: {
        ...fillRequiredOrganisationProfile().organisation,
        name: "Restored Co",
      },
      completedAt: null,
    });
    render(<OrganisationProfileApp />);
    expect(screen.getByTestId("organisation.name")).toHaveValue("Restored Co");
  });

  it("shows validation when required fields are missing", async () => {
    const user = userEvent.setup();
    render(<OrganisationProfileApp />);
    await user.click(screen.getByTestId("profile-open-review"));
    await user.click(screen.getByTestId("profile-review-complete"));
    expect(screen.getByTestId("profile-validation")).toBeTruthy();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("shows ready status when fields are filled but not completed", async () => {
    const user = userEvent.setup();
    saveOrganisationProfile(fillRequiredOrganisationProfile());
    render(<OrganisationProfileApp />);
    await user.click(screen.getByTestId("profile-open-review"));
    expect(screen.getByTestId("profile-status-ready")).toBeTruthy();
    expect(loadOrganisationProfile().completedAt).toBeNull();
  });

  it("records completedAt on complete and routes to assessment", async () => {
    const user = userEvent.setup();
    saveOrganisationProfile(fillRequiredOrganisationProfile());
    render(<OrganisationProfileApp />);
    await user.click(screen.getByTestId("profile-open-review"));
    await user.click(screen.getByTestId("profile-review-complete"));
    expect(pushMock).toHaveBeenCalledWith("/assessment");
    const stored = loadOrganisationProfile();
    expect(stored.completedAt).toBeTruthy();
    expect(Number.isFinite(Date.parse(stored.completedAt!))).toBe(true);
  });

  it("clears completedAt when a completed profile is edited", async () => {
    const user = userEvent.setup();
    saveOrganisationProfile(completeOrganisationProfile());
    render(<OrganisationProfileApp />);
    expect(loadOrganisationProfile().completedAt).toBeTruthy();
    await user.type(screen.getByTestId("organisation.name"), " Updated");
    expect(loadOrganisationProfile().completedAt).toBeNull();
  });

  it("save and exit returns home without clearing assessment storage", async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      ASSESSMENT_STORAGE_KEY,
      JSON.stringify({ answers: { "0-0": 2 }, confidence: { "0-0": "low" } }),
    );
    render(<OrganisationProfileApp />);
    await user.type(screen.getByTestId("organisation.name"), "KeepAssessment");
    await user.click(screen.getByTestId("profile-save-exit"));
    expect(pushMock).toHaveBeenCalledWith("/");
    expect(
      JSON.parse(localStorage.getItem(ASSESSMENT_STORAGE_KEY) || "{}"),
    ).toEqual({
      answers: { "0-0": 2 },
      confidence: { "0-0": "low" },
    });
  });
});

/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LandingPage } from "./LandingPage";
import { LANDING_PAGE_FALLBACK } from "./landingContent";

describe("Landing Page V2", () => {
  it("renders validated publisher wording without allowing route changes", () => {
    const content = structuredClone(LANDING_PAGE_FALLBACK);
    content.hero.headline = "Publisher-approved headline";
    content.primaryCta.label = "Begin now";

    render(<LandingPage content={content} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Publisher-approved headline" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("home-primary-cta")).toHaveTextContent("Begin now");
    expect(screen.getByTestId("home-primary-cta")).toHaveAttribute(
      "href",
      "/organisation-profile",
    );
  });

  it("shows the approved editorial hero and primary CTA to Organisation Profile", () => {
    render(<LandingPage />);

    expect(screen.getByTestId("home-eyebrow")).toHaveTextContent(
      "Operational clarity for leaders",
    );
    expect(
      screen.queryByText("Operational clarity for owners, CEOs and COOs"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Less time reporting. More time improving.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("home-problem")).toHaveTextContent(
      "MYReSolve helps leaders understand where their business stands, what needs attention first and where value may be at risk.",
    );
    expect(screen.getByTestId("home-support")).toHaveTextContent(
      "Leaders can then choose expert support from MYReSolve or subscribe to the platform to track performance and lead improvement themselves.",
    );
    expect(screen.getByTestId("home-hero-tag")).toHaveTextContent(
      "One shared starting point for a better leadership conversation.",
    );

    const primary = screen.getByTestId("home-primary-cta");
    expect(primary).toHaveAttribute("href", "/organisation-profile");
    expect(primary).toHaveTextContent("Start your assessment");
    expect(screen.getByTestId("home-header-cta")).toHaveAttribute(
      "href",
      "/organisation-profile",
    );
    expect(screen.getByTestId("home-final-cta")).toHaveAttribute(
      "href",
      "/organisation-profile",
    );
  });

  it("exposes How it works as an in-page anchor with the human journey", () => {
    render(<LandingPage />);

    const how = screen.getByTestId("how-it-works");
    expect(how).toHaveAttribute("id", "how-it-works");

    const secondary = screen.getByTestId("home-secondary-cta");
    expect(secondary).toHaveAttribute("href", "#how-it-works");
    expect(secondary).toHaveTextContent("See how it works");

    expect(screen.getByTestId("home-step-org-profile")).toHaveAttribute(
      "href",
      "/organisation-profile",
    );
    expect(
      within(how).getByText("Bring leadership knowledge together"),
    ).toBeInTheDocument();
    expect(
      within(how).getByText(
        "Answer 24 structured questions across six operational areas.",
      ),
    ).toBeInTheDocument();
    expect(within(how).getByText("See where to focus first")).toBeInTheDocument();
  });

  it("includes leadership conversation copy and the financial qualification", () => {
    render(<LandingPage />);

    const clarity = screen.getByTestId("home-clarity");
    expect(
      within(clarity).getByRole("heading", {
        name: "A clearer leadership conversation",
      }),
    ).toBeInTheDocument();
    expect(within(clarity).getByText("What is working?")).toBeInTheDocument();
    expect(within(clarity).getByText("Where is risk building?")).toBeInTheDocument();
    expect(
      within(clarity).getByText("Where should we focus first?"),
    ).toBeInTheDocument();

    const qualification =
      "Estimated Annual Value at Risk is an illustrative modelled estimate. It is not an audited loss calculation or financial forecast.";
    expect(screen.getByTestId("home-var-qualification")).toHaveTextContent(
      qualification,
    );
    expect(
      screen.getByTestId("home-var-qualification-from-to"),
    ).toHaveTextContent(qualification);
  });

  it("shows From→To clarity and familiar observations without a product preview", () => {
    render(<LandingPage />);

    expect(screen.getByTestId("home-pull-statement")).toHaveTextContent(
      "Reporting creates visibility. MYReSolve is designed to create clarity.",
    );
    expect(
      screen.getByRole("heading", { name: "Does this feel familiar?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "From reporting activity to operational clarity",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("One structured executive assessment"),
    ).toBeInTheDocument();

    expect(screen.queryByTestId("home-product-preview")).not.toBeInTheDocument();
    expect(screen.queryByText(/dashboard layout/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/who it is for/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the reporting trap/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Executive Health Score/i)).not.toBeInTheDocument();
  });

  it("does not expose booking links, cloud-future wording or migration shortcuts", () => {
    render(<LandingPage />);

    const links = screen.getAllByRole("link");
    for (const link of links) {
      const href = link.getAttribute("href") ?? "";
      const text = link.textContent?.toLowerCase() ?? "";
      expect(href).not.toMatch(/book|calendly|schedule/i);
      expect(text).not.toMatch(/book a|schedule a|book demo|book a call/);
    }

    expect(screen.queryByTestId("home-assessment")).not.toBeInTheDocument();
    expect(screen.queryByTestId("home-dashboard")).not.toBeInTheDocument();
    expect(
      screen.queryByText(/migration environment/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/until cloud features exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/nothing promised beyond/i)).not.toBeInTheDocument();
  });

  it("includes the current browser-local privacy note near the final CTA", () => {
    render(<LandingPage />);
    expect(screen.getByTestId("home-privacy-note")).toHaveTextContent(
      "Your information is saved only in this browser on this device. It is not synced to a cloud account.",
    );
    expect(
      screen.getByRole("heading", {
        name: "Give your team a clearer place to start.",
      }),
    ).toBeInTheDocument();
  });

  it("uses no em or en dashes as sentence punctuation in customer-facing copy", () => {
    render(<LandingPage />);
    const pageText = screen.getByTestId("landing-page").textContent ?? "";
    expect(pageText).not.toMatch(/[—–]/);
    expect(
      screen.getByRole("heading", {
        name: "The report is finished. The first priority is still unclear.",
      }),
    ).toBeInTheDocument();
  });
});

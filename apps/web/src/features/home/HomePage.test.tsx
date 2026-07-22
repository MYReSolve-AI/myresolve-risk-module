/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ORGANISATION_PROFILE_PRIVACY_COPY } from "@/src/domain/organisationProfile";
import { LandingPage } from "./LandingPage";
import { LANDING_PAGE_FALLBACK } from "./landingContent";

describe("Landing Page V2", () => {
  it("renders validated publisher wording without allowing route changes", () => {
    const content = structuredClone(LANDING_PAGE_FALLBACK);
    content.hero.headline = "Publisher-approved headline";
    content.finalCta.buttonLabel = "Begin now";

    render(<LandingPage content={content} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Publisher-approved headline" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("home-final-cta")).toHaveTextContent("Begin now");
    expect(screen.getByTestId("home-final-cta")).toHaveAttribute(
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
        name: "Transform Your Business with MYReSolve: Less Reporting, Clearer Decisions, Better Results.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("home-problem")).toHaveTextContent(
      "Experience a clearer way to understand your business. MYReSolve brings leadership knowledge together in one structured view, helping you see what is working, what needs attention and where value may be at risk.",
    );
    expect(screen.getByTestId("home-support")).toHaveTextContent(
      "Subscribe to MYReSolve to track performance, focus improvement and keep leadership aligned. Expert support is available whenever you want help turning insight into action.",
    );
    expect(screen.getByTestId("home-hero-tag")).toHaveTextContent(
      "One shared starting point for a better leadership conversation.",
    );

    expect(screen.queryByTestId("home-primary-cta")).not.toBeInTheDocument();
    expect(screen.queryByTestId("home-header-cta")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Why MYReSolve?" }),
    ).toHaveAttribute("href", "#why-myresolve");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByTestId("home-final-cta")).toHaveAttribute(
      "href",
      "/organisation-profile",
    );
    expect(screen.getByTestId("home-final-cta")).toHaveTextContent(
      "Start your assessment now",
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
        name: "Lead with Clarity and Confidence",
      }),
    ).toBeInTheDocument();
    expect(within(clarity).getByText("What is working?")).toBeInTheDocument();
    expect(
      within(clarity).getByText(
        "Gain a panoramic view of your operations and quickly spot what’s working best.",
      ),
    ).toBeInTheDocument();
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
      screen.getByRole("heading", { name: "Sound familiar?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "For many leaders, weekly and monthly reporting has turned into a company-wide industry of its own.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Another meeting. The same numbers. Yet another rebuild.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "The experts, the people closest to the work, spend valuable time explaining instead of improving.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "From reporting activity to operational clarity",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("One structured executive assessment"),
    ).toBeInTheDocument();
    expect(screen.getByText("One version of the truth")).toBeInTheDocument();
    expect(screen.getByText("Focus on the big wins")).toBeInTheDocument();
    expect(screen.getByText("The real hidden cost of risk")).toBeInTheDocument();

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

  it("includes the private-preview guidance near the final CTA", () => {
    render(<LandingPage />);
    const privacyNote = screen.getByTestId("home-privacy-note");
    expect(privacyNote).toHaveTextContent("Private preview.");
    expect(privacyNote).toHaveTextContent(ORGANISATION_PROFILE_PRIVACY_COPY);
    expect(
      screen.getByRole("heading", {
        name: "Empower your team with a clear starting point.",
      }),
    ).toBeInTheDocument();
  });

  it("shows the founder experience and signature brand line", () => {
    render(<LandingPage />);

    const founder = screen.getByTestId("home-founder");
    expect(
      within(founder).getByRole("heading", {
        name: "Decades of Expertise, One Clear Vision.",
      }),
    ).toBeInTheDocument();
    expect(
      within(founder).getByText(/25\+ years navigating every level of business/i),
    ).toBeInTheDocument();
    expect(
      within(founder).getByText("“You can’t improve what you can’t see.”"),
    ).toBeInTheDocument();
    expect(
      within(founder)
        .getByAltText("Rob Pierce, founder of MYReSolve")
        .getAttribute("src"),
    ).toContain("rob-pierce-founder.png");
  });

  it("uses no em or en dashes as sentence punctuation in customer-facing copy", () => {
    render(<LandingPage />);
    const pageText = screen.getByTestId("landing-page").textContent ?? "";
    expect(pageText).not.toMatch(/[—–]/);
    expect(
      screen.getByRole("heading", {
        name: "When the report is finally done, the top priority still isn’t clear.",
      }),
    ).toBeInTheDocument();
  });

  it("offers the temporary contact details without collecting information", () => {
    render(<LandingPage />);

    expect(
      screen.getByRole("link", { name: "Contact MYReSolve" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: "rob.myresolve@gmail.com" }),
    ).toHaveAttribute("href", "mailto:rob.myresolve@gmail.com");
  });
});

/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { KpisPage } from "./KpisPage";
import { KPIS_PAGE_CONTENT } from "./kpisContent";

describe("KPIs page", () => {
  it("shows the approved eyebrow, headline and standfirst", () => {
    render(<KpisPage />);

    expect(screen.getByTestId("kpis-eyebrow")).toHaveTextContent(
      "MYReSolve · Operating Playbook · Companion",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "The twenty numbers" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("kpis-headline-accent")).toHaveTextContent(
      "numbers",
    );
    expect(screen.getByTestId("kpis-lead")).toHaveTextContent(
      "The KPIs a leadership team should see every week. One page, the same page, at every level, on the same day.",
    );
  });

  it("writes the brand name as MYReSolve everywhere, including the uppercased eyebrow", () => {
    const { container } = render(<KpisPage />);

    // The eyebrow is uppercased in CSS, so the brand name sits in its own
    // element that opts out. Guard the casing in the markup itself.
    expect(
      within(screen.getByTestId("kpis-eyebrow")).getByText("MYReSolve"),
    ).toBeInTheDocument();

    const markup = container.innerHTML;
    expect(markup).toContain("MYReSolve");
    expect(markup).not.toMatch(/MYRESOLVE/);
    expect(markup).not.toMatch(/Myresolve|myResolve|MyReSolve/);
  });

  it("states the body copy and the three things inside", () => {
    render(<KpisPage />);

    expect(screen.getByTestId("kpis-body")).toHaveTextContent(
      "Most businesses have every one of these numbers somewhere. Almost none has put two of them on the same page. Each of the twenty is the primary or supporting indicator from one of the twelve books of the MYReSolve Operating Playbook, chosen because it cannot be flattered. The PDF explains what each one counts, why it matters, and gives you the one-page template to copy.",
    );

    const inside = screen.getByTestId("kpis-inside");
    expect(
      within(inside).getByRole("heading", { level: 2, name: "Inside" }),
    ).toBeInTheDocument();
    const items = within(inside)
      .getAllByRole("listitem")
      .map((item) => item.textContent);
    expect(items).toEqual([
      "The twenty numbers, in four groups",
      "What each one counts and why it can't be flattered",
      "Your page, ready to fill in",
    ]);
  });

  it("renders the form with the approved fields, an unticked checkbox and the note", () => {
    render(<KpisPage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Send me the PDF" }),
    ).toBeInTheDocument();

    const email = screen.getByLabelText("Work email");
    expect(email).toHaveAttribute("type", "email");
    expect(email).toBeRequired();

    const name = screen.getByLabelText("Name (optional)");
    expect(name).not.toBeRequired();

    const checkbox = screen.getByRole("checkbox", {
      name: "Tell me when the MYReSolve subscription is ready. It keeps this page current, refreshed from the systems you already report from. In development, not yet on sale.",
    });
    expect(checkbox).not.toBeChecked();
    expect(checkbox).not.toHaveAttribute("checked");

    expect(screen.getByRole("button", { name: "Send the PDF" })).toBeEnabled();

    expect(screen.getByTestId("kpis-note")).toHaveTextContent(
      "We will email you the PDF and nothing else unless you tick the box. hello@myresolve.uk.",
    );
    expect(
      within(screen.getByTestId("kpis-note")).getByRole("link", {
        name: "hello@myresolve.uk",
      }),
    ).toHaveAttribute("href", "mailto:hello@myresolve.uk");
  });

  it("keeps the honeypot out of the accessibility tree and the tab order", () => {
    const { container } = render(<KpisPage />);

    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest("label")).toHaveAttribute("aria-hidden", "true");
  });

  it("links to the assessment and the Playbook below the form, and never to the PDF", () => {
    const { container } = render(<KpisPage />);

    const links = screen.getByTestId("kpis-links");
    expect(
      within(links).getByRole("link", {
        name: "The Structured Executive Assessment",
      }),
    ).toHaveAttribute("href", "/organisation-profile");
    expect(
      within(links).getByRole("link", {
        name: "The Operating Playbook, twelve books",
      }),
    ).toHaveAttribute("href", "/book");

    // The PDF is sent by email only. No direct link, no downloads path.
    expect(container.innerHTML).not.toMatch(/\.pdf/i);
    expect(container.innerHTML).not.toMatch(/\/downloads\//);
  });

  it("resolves the nav and footer destinations", () => {
    render(<KpisPage />);

    expect(screen.getByRole("link", { name: "Inside" })).toHaveAttribute(
      "href",
      "#inside",
    );
    expect(
      screen.getByRole("link", { name: "The Playbook series" }),
    ).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: "The assessment" })).toHaveAttribute(
      "href",
      "/organisation-profile",
    );
    expect(screen.getByTestId("kpis-header-request")).toHaveAttribute(
      "href",
      "#request",
    );

    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("link", { name: "Contact MYReSolve" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("anchors every nav target on the page", () => {
    const { container } = render(<KpisPage />);

    for (const id of ["top", "inside", "request"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("shows no prices, no dates and no subscription claims beyond the checkbox", () => {
    const { container } = render(<KpisPage />);
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/£|\$|€/);
    expect(text).not.toMatch(
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/,
    );
    expect(text).not.toMatch(/\b20\d{2}\b/);

    // The word "subscription" appears only in the checkbox wording.
    const mentions = text.match(/subscription/g) ?? [];
    expect(mentions).toHaveLength(1);
  });

  it("uses no em or en dashes as sentence punctuation in customer-facing copy", () => {
    render(<KpisPage />);

    const pageText = screen.getByTestId("kpis-page").textContent ?? "";
    expect(pageText).not.toMatch(/[—–]/);
  });

  it("publishes a search engine title that carries the brand name correctly", () => {
    expect(KPIS_PAGE_CONTENT.seo.title).toBe(
      "The twenty numbers, the free MYReSolve Operating Playbook companion",
    );
    expect(KPIS_PAGE_CONTENT.seo.description).toContain("MYReSolve");
  });
});

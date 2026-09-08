/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PlaybookPage } from "./PlaybookPage";
import { PLAYBOOK_PAGE_CONTENT } from "./playbookContent";

describe("Playbook series page", () => {
  it("leads with the approved eyebrow, headline and Book One call to action", () => {
    render(<PlaybookPage />);

    expect(screen.getByTestId("playbook-eyebrow")).toHaveTextContent(
      "The MYReSolve Operating Playbook",
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Twelve playbooks. Three lenses. One page a leader can act on.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("playbook-headline-accent")).toHaveTextContent(
      "Three lenses.",
    );
    expect(screen.getByTestId("playbook-hero-cta")).toHaveAttribute(
      "href",
      "/book",
    );
    expect(screen.getByTestId("playbook-hero-cta")).toHaveTextContent(
      "Start with Book One",
    );
  });

  it("writes the brand name as MYReSolve everywhere, including the uppercase eyebrow", () => {
    const { container } = render(<PlaybookPage />);

    // The eyebrow is uppercased in CSS, so the brand name sits in its own
    // element that opts out. Guard the casing in the markup itself.
    const eyebrow = screen.getByTestId("playbook-eyebrow");
    expect(within(eyebrow).getByText("MYReSolve")).toBeInTheDocument();

    const markup = container.innerHTML;
    expect(markup).toContain("MYReSolve");
    expect(markup).not.toMatch(/MYRESOLVE/);
    expect(markup).not.toMatch(/Myresolve|myResolve/);
  });

  it("names the three fixed lenses", () => {
    render(<PlaybookPage />);

    const lenses = screen.getByTestId("playbook-lenses");
    for (const name of ["Frontline", "Manager", "Executive"]) {
      expect(
        within(lenses).getByRole("heading", { level: 3, name }),
      ).toBeInTheDocument();
    }
  });

  it("lists twelve books with Book One linked and the rest marked Coming", () => {
    render(<PlaybookPage />);

    const books = screen.getByTestId("playbook-books");
    expect(within(books).getAllByRole("listitem")).toHaveLength(12);

    expect(screen.getByTestId("playbook-book-01-link")).toHaveAttribute(
      "href",
      "/book",
    );
    expect(screen.getByTestId("playbook-book-01-link")).toHaveTextContent(
      "The Perfect Culture Playbook: the seven behaviours",
    );
    expect(screen.getByTestId("playbook-book-01-tag")).toHaveTextContent(
      "Out now · £24",
    );

    // Books 02-12 carry no link and are tagged Coming.
    for (const book of PLAYBOOK_PAGE_CONTENT.books.items.slice(1)) {
      expect(
        screen.queryByTestId(`playbook-book-${book.number}-link`),
      ).not.toBeInTheDocument();
      expect(
        screen.getByTestId(`playbook-book-${book.number}-tag`),
      ).toHaveTextContent("Coming");
    }
  });

  it("shows no dates and no price other than £24 on Book One", () => {
    const { container } = render(<PlaybookPage />);
    const text = container.textContent ?? "";

    // Read prices per element: textContent runs adjacent nodes together, so
    // the Book 01 tag and the next book's number would read as "£2402".
    const priced = screen
      .getAllByText(/£/)
      .map((element) => element.textContent ?? "");
    expect(priced.length).toBeGreaterThan(0);
    for (const value of priced) {
      expect(value.match(/£\d+/g) ?? []).toEqual(["£24"]);
    }

    expect(text).not.toMatch(
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/,
    );
    expect(text).not.toMatch(/\b20\d{2}\b/);
    expect(text).not.toMatch(/\bQ[1-4]\b/);
  });

  it("closes with the approved band and sends buyers to /book and the assessment", () => {
    render(<PlaybookPage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Start with the behaviours." }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("playbook-final-cta")).toHaveAttribute(
      "href",
      "/book",
    );
    expect(screen.getByTestId("playbook-final-cta")).toHaveTextContent(
      "Buy Book One, £24",
    );
    expect(screen.getByTestId("playbook-final-assessment")).toHaveAttribute(
      "href",
      "/organisation-profile",
    );
  });

  it("never links to the Payhip checkout directly", () => {
    const { container } = render(<PlaybookPage />);
    expect(container.innerHTML).not.toContain("payhip.com");
  });
});

/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BookPage } from "./BookPage";
import { BOOK_PAGE_CONTENT, BOOK_PURCHASE_URL } from "./bookContent";

describe("Book page", () => {
  it("shows the approved hero with the gold italic headline accent", () => {
    render(<BookPage />);

    expect(screen.getByTestId("book-eyebrow")).toHaveTextContent(
      "The MYReSolve Operating Playbook · Book One",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Behaviour, not process." }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("book-headline-accent")).toHaveTextContent(
      "not process.",
    );
    expect(screen.getByTestId("book-lead")).toHaveTextContent(
      "The seven behaviours that build a culture your customers and colleagues can feel, with exactly how to deliver them from Monday morning. Book One of a twelve-book series, each one seen from the Frontline, the Manager and the Executive.",
    );
  });

  it("writes the brand name as MYReSolve everywhere, including both eyebrows", () => {
    const { container } = render(<BookPage />);

    // Both eyebrows are uppercased in CSS, so the brand name sits in its own
    // element that opts out. Guard the casing in the markup itself.
    for (const testId of ["book-eyebrow", "book-series-eyebrow"]) {
      expect(
        within(screen.getByTestId(testId)).getByText("MYReSolve"),
      ).toBeInTheDocument();
    }

    const markup = container.innerHTML;
    expect(markup).toContain("MYReSolve");
    expect(markup).not.toMatch(/MYRESOLVE/);
    expect(markup).not.toMatch(/Myresolve|myResolve/);
  });

  it("sends every buy action to Payhip in a new tab with rel noopener", () => {
    const { container } = render(<BookPage />);

    const payhipLinks = Array.from(
      container.querySelectorAll(`a[href="${BOOK_PURCHASE_URL}"]`),
    );
    // Hero, the Book 01 series tag and the closing band. The header pill is
    // not a buy action: it jumps to the series on this page.
    expect(payhipLinks).toHaveLength(3);
    for (const link of payhipLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toContain("noopener");
    }

    // Nothing else on the page points at Payhip by any other route.
    expect(container.innerHTML.match(/payhip\.com/g)).toHaveLength(3);
  });

  it("resolves every in-page and outbound destination in the approved table", () => {
    render(<BookPage />);

    // Nav anchors.
    expect(screen.getByRole("link", { name: "The behaviours" })).toHaveAttribute(
      "href",
      "#behaviours",
    );
    expect(screen.getByRole("link", { name: "Who it is for" })).toHaveAttribute(
      "href",
      "#who",
    );
    expect(screen.getByRole("link", { name: "The author" })).toHaveAttribute(
      "href",
      "#author",
    );

    // The dark nav pill jumps to the series; it is no longer a buy action.
    const seriesButton = screen.getByTestId("book-header-series");
    expect(seriesButton).toHaveTextContent("The Playbook series");
    expect(seriesButton).toHaveAttribute("href", "#series");
    expect(seriesButton).not.toHaveAttribute("target");
    expect(screen.queryByTestId("book-header-cta")).not.toBeInTheDocument();
    expect(screen.queryByText("The series")).not.toBeInTheDocument();

    // Hero "See the series" and the Book 01 title both stay on the page.
    expect(screen.getByTestId("book-hero-series-link")).toHaveAttribute(
      "href",
      "#series",
    );
    expect(screen.getByTestId("book-series-01-link")).toHaveAttribute(
      "href",
      "#top",
    );

    // Buy actions and the assessment.
    for (const testId of [
      "book-hero-cta",
      "book-series-01-tag",
      "book-final-cta",
    ]) {
      expect(screen.getByTestId(testId)).toHaveAttribute(
        "href",
        BOOK_PURCHASE_URL,
      );
    }
    expect(screen.getByTestId("book-final-assessment")).toHaveAttribute(
      "href",
      "/organisation-profile",
    );

    // Footer.
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("link", { name: "Contact MYReSolve" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: "hello@myresolve.uk" }),
    ).toHaveAttribute("href", "mailto:hello@myresolve.uk");
  });

  it("anchors every nav target on the page", () => {
    const { container } = render(<BookPage />);

    for (const id of ["top", "behaviours", "series", "who", "author"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("does not build a checkout of its own", () => {
    render(<BookPage />);

    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(document.querySelector("form")).toBeNull();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("states the problem, the seven behaviours and the three lenses", () => {
    render(<BookPage />);

    expect(
      within(screen.getByTestId("book-problem")).getByRole("heading", {
        name: "Most advice tells you what to do. This shows you how.",
      }),
    ).toBeInTheDocument();

    const behaviours = screen.getByTestId("book-behaviours");
    const names = within(behaviours)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(names).toEqual([
      "Listen",
      "Empathise",
      "Recover",
      "N+1",
      "Empowerment",
      "Happiness",
      "Ethics",
    ]);

    // Three lenses now, replacing Frontline / Leaders.
    const audience = screen.getByTestId("book-audience");
    const lenses = within(audience)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(lenses).toEqual(["Frontline", "Manager", "Executive"]);
    expect(within(audience).queryByText("Leaders")).not.toBeInTheDocument();
  });

  it("lists twelve books with Book One buyable and the rest marked Coming", () => {
    render(<BookPage />);

    const series = screen.getByTestId("book-series");
    expect(within(series).getAllByRole("listitem")).toHaveLength(12);

    expect(screen.getByTestId("book-series-01-link")).toHaveTextContent(
      "The Perfect Culture Playbook: the seven behaviours",
    );
    expect(screen.getByTestId("book-series-01-tag")).toHaveTextContent(
      "Buy now · £24",
    );

    for (const book of BOOK_PAGE_CONTENT.series.items.slice(1)) {
      expect(
        screen.queryByTestId(`book-series-${book.number}-link`),
      ).not.toBeInTheDocument();
      expect(
        screen.getByTestId(`book-series-${book.number}-tag`),
      ).toHaveTextContent("Coming");
    }
  });

  it("shows no dates and no price other than £24", () => {
    const { container } = render(<BookPage />);
    const text = container.textContent ?? "";

    // Read prices per element: textContent runs adjacent nodes together.
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

  it("closes the author block with the signature line", () => {
    render(<BookPage />);

    const author = screen.getByTestId("book-author");
    expect(within(author).getByText("Rob Pierce")).toBeInTheDocument();
    expect(within(author).getByText("Founder, MYReSolve")).toBeInTheDocument();
    expect(within(author).getByText(/The eleven books that follow/)).toBeInTheDocument();

    const signOff = screen.getByTestId("book-sign-off");
    expect(signOff).toHaveTextContent("Do it right, Do it once.");
    expect(signOff.nextElementSibling).toBeNull();
  });

  it("shows the price and the closing call to action", () => {
    render(<BookPage />);

    expect(screen.getByTestId("book-price")).toHaveTextContent("£24");
    expect(
      screen.getByRole("heading", { name: "Start with the behaviours." }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("book-final-cta")).toHaveTextContent(
      "Buy Book One, £24",
    );
  });

  it("uses no em or en dashes as sentence punctuation in customer-facing copy", () => {
    render(<BookPage />);

    const pageText = screen.getByTestId("book-page").textContent ?? "";
    expect(pageText).not.toMatch(/[—–]/);
  });

  it("publishes the agreed search engine title", () => {
    expect(BOOK_PAGE_CONTENT.seo.title).toBe(
      "Behaviour, not process — The Perfect Culture Playbook, Book One of the MYReSolve Operating Playbook",
    );
  });
});

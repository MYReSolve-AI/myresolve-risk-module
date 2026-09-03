/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BookPage } from "./BookPage";
import { BOOK_PAGE_CONTENT, BOOK_PURCHASE_URL } from "./bookContent";

describe("Book page", () => {
  it("shows the approved hero with the gold italic headline accent", () => {
    render(<BookPage />);

    expect(screen.getByTestId("book-eyebrow")).toHaveTextContent(
      "The Perfect Culture Playbook",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Behaviour, not process." }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("book-headline-accent")).toHaveTextContent(
      "not process.",
    );
    expect(screen.getByTestId("book-lead")).toHaveTextContent(
      "The seven behaviours that build a culture your customers and colleagues can feel, with exactly how to deliver them from Monday morning.",
    );
  });

  it("sends every Buy the book action to Payhip in a new tab", () => {
    render(<BookPage />);

    const buyLinks = screen.getAllByRole("link", { name: "Buy the book" });
    expect(buyLinks).toHaveLength(3);
    for (const link of buyLinks) {
      expect(link).toHaveAttribute("href", BOOK_PURCHASE_URL);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("does not build a checkout of its own", () => {
    render(<BookPage />);

    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(document.querySelector("form")).toBeNull();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("states the problem, the seven behaviours and both audiences", () => {
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

    const audience = screen.getByTestId("book-audience");
    expect(
      within(audience).getByRole("heading", { name: "Frontline" }),
    ).toBeInTheDocument();
    expect(
      within(audience).getByRole("heading", { name: "Leaders" }),
    ).toBeInTheDocument();
  });

  it("closes the author block with the signature line", () => {
    render(<BookPage />);

    const author = screen.getByTestId("book-author");
    expect(within(author).getByText("Rob Pierce")).toBeInTheDocument();
    expect(within(author).getByText("Founder, MYReSolve")).toBeInTheDocument();

    const signOff = screen.getByTestId("book-sign-off");
    expect(signOff).toHaveTextContent("Do it right, Do it once.");
    expect(signOff.nextElementSibling).toBeNull();
  });

  it("shows the price and the closing call to action", () => {
    render(<BookPage />);

    expect(screen.getByTestId("book-price")).toHaveTextContent("£24");
    expect(
      screen.getByRole("heading", {
        name: "Create the perfect flywheel of success, driving culture at every interaction.",
      }),
    ).toBeInTheDocument();
  });

  it("uses no em or en dashes as sentence punctuation in customer-facing copy", () => {
    render(<BookPage />);

    const pageText = screen.getByTestId("book-page").textContent ?? "";
    expect(pageText).not.toMatch(/[—–]/);
  });

  it("publishes the agreed search engine title", () => {
    expect(BOOK_PAGE_CONTENT.seo.title).toBe(
      "Behaviour, not process — The Perfect Culture Playbook",
    );
  });
});

/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactPage } from "./ContactPage";

describe("Contact page", () => {
  it("offers the three agreed enquiry routes through email", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("heading", { name: "Start a clearer conversation." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Discuss my company results" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Explore consultancy support" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Ask about the MYReSolve platform" }),
    ).toBeInTheDocument();

    const emailRob = screen.getByRole("link", { name: "Email Rob" });
    expect(emailRob).toHaveAttribute(
      "href",
      "mailto:rob.myresolve@gmail.com?subject=MYReSolve%20enquiry",
    );
    expect(screen.getAllByText("Email Rob")).toHaveLength(1);
  });

  it("warns customers not to email confidential company information", () => {
    render(<ContactPage />);

    expect(
      screen.getByText(/Please do not include confidential company/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

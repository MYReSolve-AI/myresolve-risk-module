/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactPage } from "./ContactPage";

describe("Contact page", () => {
  it("offers the three agreed enquiry routes through email", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("heading", {
        name: "Let’s Connect: Start a Clearer Conversation",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Get Clarity on Your Results" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Discover Tailored Consultancy Support",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Learn More About the MYReSolve Platform",
      }),
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
      screen.getByText(/Please don’t include confidential company/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactPage } from "./ContactPage";

describe("Contact page", () => {
  it("offers the three agreed enquiry routes and the booking form", () => {
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
    expect(screen.getByTestId("contact-organisation-nudge")).toHaveTextContent(
      "Tell me a little about your organisation and the biggest operational question on your mind.",
    );

    const emailRob = screen.getByRole("link", { name: "Email Rob" });
    expect(emailRob).toHaveAttribute(
      "href",
      "mailto:rob.myresolve@gmail.com?subject=MYReSolve%20enquiry",
    );
    expect(screen.getAllByText("Email Rob")).toHaveLength(1);
    expect(screen.getByTestId("booking-form")).toBeInTheDocument();
    expect(
      screen.getByText(/Your assessment answers and Organisation Profile stay on this device/i),
    ).toBeInTheDocument();
  });

  it("warns customers not to submit confidential company information", () => {
    render(<ContactPage />);

    expect(
      screen.getByText(/Please don’t include confidential company/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Request a 30-minute conversation" }),
    ).toBeDisabled();
    expect(screen.queryByRole("link", { name: /subscribe|checkout|pay/i })).not.toBeInTheDocument();
  });
});

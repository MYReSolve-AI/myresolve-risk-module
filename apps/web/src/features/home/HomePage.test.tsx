/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Homepage entry journey", () => {
  it("exposes Organisation Profile as the primary journey entry", () => {
    render(<Home />);
    const profile = screen.getByTestId("home-organisation-profile");
    expect(profile).toHaveAttribute("href", "/organisation-profile");
    expect(profile).toHaveTextContent("Organisation Profile");
    expect(screen.getByTestId("home-assessment")).toHaveAttribute(
      "href",
      "/assessment",
    );
    expect(screen.getByTestId("home-dashboard")).toHaveAttribute(
      "href",
      "/dashboard",
    );

    const links = screen.getAllByRole("link");
    expect(links[0]).toBe(profile);
  });
});

/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingForm } from "./BookingForm";

function addTurnstileToken() {
  const form = screen.getByTestId("booking-form");
  const token = document.createElement("input");
  token.name = "cf-turnstile-response";
  token.value = "verified-token";
  form.appendChild(token);
}

async function completeRequiredFields() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Name"), "Alex Leader");
  await user.type(screen.getByLabelText("Email"), "alex@example.com");
  await user.type(
    screen.getByLabelText("Organisation and role"),
    "Example Ltd, Operations Director",
  );
  await user.selectOptions(screen.getByLabelText("Company size"), "50-249");
  await user.type(
    screen.getByLabelText("Biggest operational question"),
    "Where should we focus first?",
  );
  return user;
}

describe("Booking form", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends only the approved contact fields and shows confirmed success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, emailSent: true }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(
      <BookingForm
        apiUrl="https://api.myresolve.uk/booking"
        turnstileSiteKey="public-site-key"
      />,
    );
    const user = await completeRequiredFields();
    addTurnstileToken();
    await user.click(
      screen.getByRole("button", { name: "Request a 30-minute conversation" }),
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.myresolve.uk/booking");
    const body = JSON.parse(options.body);
    expect(Object.keys(body).sort()).toEqual(
      [
        "companySize",
        "email",
        "message",
        "name",
        "organisationRole",
        "question",
        "toolFix",
        "turnstileToken",
        "website",
      ].sort(),
    );
    expect(JSON.stringify(body)).not.toMatch(/assessment|organisationProfile|answer/i);
    expect(screen.queryByLabelText(/Name or short code/i)).not.toBeInTheDocument();
    const dialog = await screen.findByRole("dialog", {
      name: "Thank you — your request is complete",
    });
    expect(dialog).toHaveTextContent(/Your request has been received/i);
    expect(dialog).toHaveTextContent(
      "A confirmation email has been sent to alex@example.com.",
    );
    expect(screen.getByRole("button", { name: "Close confirmation" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Close confirmation" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("confirms storage honestly when the email provider could not send", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            ok: true,
            emailSent: false,
            message: "Thank you. Your request has been received and Rob will be in touch.",
          }),
          { status: 201, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );
    render(<BookingForm apiUrl="/booking" turnstileSiteKey="public-site-key" />);
    const user = await completeRequiredFields();
    addTurnstileToken();
    await user.click(
      screen.getByRole("button", { name: "Request a 30-minute conversation" }),
    );

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent(/request is safely recorded/i);
    expect(dialog).toHaveTextContent(/confirmation email could not be sent/i);
    expect(dialog).not.toHaveTextContent(/has been sent to/i);
  });

  it("shows a retry route when the Worker does not confirm storage", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            ok: false,
            message: "We couldn’t save your request. Please try again.",
          }),
          { status: 502, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );
    render(
      <BookingForm apiUrl="/booking" turnstileSiteKey="public-site-key" />,
    );
    const user = await completeRequiredFields();
    addTurnstileToken();
    await user.click(
      screen.getByRole("button", { name: "Request a 30-minute conversation" }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "We couldn’t save your request",
    );
    expect(screen.getByRole("link", { name: "Email Rob instead" })).toHaveAttribute(
      "href",
      "mailto:rob.myresolve@gmail.com",
    );
  });

  it("does not submit without a Turnstile token", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(
      <BookingForm apiUrl="/booking" turnstileSiteKey="public-site-key" />,
    );
    const user = await completeRequiredFields();
    await user.click(
      screen.getByRole("button", { name: "Request a 30-minute conversation" }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "complete the security check",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails closed when the public Turnstile key is not configured", () => {
    render(<BookingForm apiUrl="/booking" turnstileSiteKey="" />);
    expect(
      screen.getByRole("button", { name: "Request a 30-minute conversation" }),
    ).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Online booking is being configured",
    );
  });
});

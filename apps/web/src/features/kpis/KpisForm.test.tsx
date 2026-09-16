/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KpisForm } from "./KpisForm";

const API_URL = "https://api.myresolve.uk/kpis";

function stubFetch(status: number, body: object = {}) {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("KPIs form", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("posts the email, name, checkbox and honeypot to /kpis and shows the success state", async () => {
    const fetchMock = stubFetch(201, { ok: true, emailSent: true });
    render(<KpisForm apiUrl={API_URL} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Work email"), "sam@example.com");
    await user.type(screen.getByLabelText("Name (optional)"), "Sam Leader");
    await user.click(screen.getByRole("button", { name: "Send the PDF" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe(API_URL);
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(options.body)).toEqual({
      email: "sam@example.com",
      name: "Sam Leader",
      subscriptionInterest: false,
      website: "",
    });

    const success = await screen.findByTestId("kpis-success");
    expect(success).toHaveTextContent(
      "Sent. Check your inbox for The twenty numbers. If it is not there in a few minutes, look in spam or email hello@myresolve.uk.",
    );
    expect(success).toHaveAttribute("role", "status");
    // The form is replaced by the confirmation, so nothing can be sent twice.
    expect(screen.queryByTestId("kpis-form")).not.toBeInTheDocument();
  });

  it("sends subscriptionInterest true only when the box is ticked", async () => {
    const fetchMock = stubFetch(201, { ok: true, emailSent: true });
    render(<KpisForm apiUrl={API_URL} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Work email"), "sam@example.com");
    await user.click(screen.getByTestId("kpis-subscription"));
    expect(screen.getByTestId("kpis-subscription")).toBeChecked();
    await user.click(screen.getByRole("button", { name: "Send the PDF" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      email: "sam@example.com",
      name: "",
      subscriptionInterest: true,
      website: "",
    });
  });

  it("shows the failure state when the Worker rejects the request and keeps the form", async () => {
    stubFetch(502, {
      ok: false,
      message: "Something went wrong. Email hello@myresolve.uk and we will send it by hand.",
    });
    render(<KpisForm apiUrl={API_URL} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Work email"), "sam@example.com");
    await user.click(screen.getByRole("button", { name: "Send the PDF" }));

    const failure = await screen.findByTestId("kpis-failure");
    expect(failure).toHaveTextContent(
      "Something went wrong. Email hello@myresolve.uk and we will send it by hand.",
    );
    expect(failure).toHaveAttribute("role", "alert");
    expect(screen.getByTestId("kpis-form")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send the PDF" })).toBeEnabled();
    expect(screen.queryByTestId("kpis-success")).not.toBeInTheDocument();
  });

  it("shows the same failure state when the network call itself fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    render(<KpisForm apiUrl={API_URL} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Work email"), "sam@example.com");
    await user.click(screen.getByRole("button", { name: "Send the PDF" }));

    expect(await screen.findByTestId("kpis-failure")).toHaveTextContent(
      "Something went wrong. Email hello@myresolve.uk and we will send it by hand.",
    );
  });

  it("does not submit without a work email", async () => {
    const fetchMock = stubFetch(201, { ok: true, emailSent: true });
    render(<KpisForm apiUrl={API_URL} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Send the PDF" }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Work email")).toBeInvalid();
  });
});

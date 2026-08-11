"use client";

import Script from "next/script";
import { FormEvent, useState } from "react";
import styles from "./ContactPage.module.css";

const COMPANY_SIZES = [
  "Just me / <10",
  "10-49",
  "50-249",
  "250-999",
  "1000+",
] as const;

type BookingFormProps = {
  apiUrl: string;
  turnstileSiteKey: string;
};

type SubmissionState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

function fieldValue(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

export function BookingForm({ apiUrl, turnstileSiteKey }: BookingFormProps) {
  const [state, setState] = useState<SubmissionState>({ kind: "idle" });
  const configured = Boolean(turnstileSiteKey);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const turnstileToken = fieldValue(form, "cf-turnstile-response");

    if (!turnstileToken) {
      setState({
        kind: "error",
        message: "Please complete the security check before sending your request.",
      });
      return;
    }

    const payload = {
      name: fieldValue(form, "name"),
      code: fieldValue(form, "code"),
      email: fieldValue(form, "email"),
      organisationRole: fieldValue(form, "organisationRole"),
      companySize: fieldValue(form, "companySize"),
      question: fieldValue(form, "question"),
      toolFix: fieldValue(form, "toolFix"),
      message: fieldValue(form, "message"),
      website: fieldValue(form, "website"),
      turnstileToken,
    };

    setState({ kind: "submitting" });
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
      };
      if (!response.ok) {
        throw new Error(
          result.message ?? "We couldn’t save your request. Please try again.",
        );
      }
      formElement.reset();
      setState({
        kind: "success",
        message: "Thank you. Your request has been received and I’ll be in touch.",
      });
    } catch (error) {
      setState({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "We couldn’t save your request. Please try again.",
      });
    }
  }

  return (
    <section className={styles.booking} aria-labelledby="booking-heading">
      <div className={styles.bookingIntro}>
        <p className={styles.eyebrow}>Free 30-minute conversation</p>
        <h2 id="booking-heading" className={styles.sectionTitle}>
          Tell me what your assessment surfaced
        </h2>
        <p>
          Share enough context for a useful first conversation. No pitch, just a
          closer look at your priorities and what would actually help.
        </p>
      </div>

      <form className={styles.form} onSubmit={submit} data-testid="booking-form">
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Name</span>
            <input name="name" autoComplete="name" maxLength={100} required />
          </label>
          <label className={styles.field}>
            <span>Name or short code</span>
            <input
              name="code"
              maxLength={80}
              required
              aria-describedby="code-help"
            />
            <small id="code-help">A short reference for our conversation.</small>
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>
          <label className={styles.field}>
            <span>Organisation and role</span>
            <input
              name="organisationRole"
              autoComplete="organization-title"
              maxLength={200}
              required
            />
          </label>
          <label className={styles.field}>
            <span>Company size</span>
            <select name="companySize" defaultValue="" required>
              <option value="" disabled>
                Select company size
              </option>
              {COMPANY_SIZES.map((size) => (
                <option value={size} key={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className={styles.field}>
          <span>Biggest operational question</span>
          <textarea name="question" rows={4} maxLength={1500} required />
        </label>
        <label className={styles.field}>
          <span>One thing a tool could fix (optional)</span>
          <textarea name="toolFix" rows={3} maxLength={1000} />
        </label>
        <label className={styles.field}>
          <span>Anything else (optional)</span>
          <textarea name="message" rows={3} maxLength={2000} />
        </label>

        <label className={styles.honeypot} aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" maxLength={200} />
        </label>

        {configured ? (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="afterInteractive"
            />
            <div
              className="cf-turnstile"
              data-sitekey={turnstileSiteKey}
              data-theme="light"
              data-action="booking"
            />
          </>
        ) : (
          <p className={styles.formNotice} role="status">
            Online booking is being configured. Please email Rob using the link
            below in the meantime.
          </p>
        )}

        <p className={styles.privacyNote}>
          Only the details you enter in this form are sent to MYReSolve and
          stored in its private enquiry tracker so Rob can respond. Your
          assessment answers and Organisation Profile stay on this device. Do
          not include confidential assessment, financial or company information.
        </p>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!configured || state.kind === "submitting"}
        >
          {state.kind === "submitting"
            ? "Sending…"
            : "Request a 30-minute conversation"}
        </button>

        {state.kind === "success" && (
          <p className={styles.successMessage} role="status">
            {state.message}
          </p>
        )}
        {state.kind === "error" && (
          <p className={styles.errorMessage} role="alert">
            {state.message}{" "}
            <a href="mailto:rob.myresolve@gmail.com">Email Rob instead</a>.
          </p>
        )}
      </form>
    </section>
  );
}

"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";
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
  | { kind: "success"; email: string; emailSent: boolean; message: string }
  | { kind: "error"; message: string };

function fieldValue(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

export function BookingForm({ apiUrl, turnstileSiteKey }: BookingFormProps) {
  const [state, setState] = useState<SubmissionState>({ kind: "idle" });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const configured = Boolean(turnstileSiteKey);

  useEffect(() => {
    if (state.kind !== "success") return;
    closeButtonRef.current?.focus();
    function handleDialogKeyDown(event: KeyboardEvent) {
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
        return;
      }
      if (event.key === "Escape") {
        setState({ kind: "idle" });
        submitButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleDialogKeyDown);
    return () => window.removeEventListener("keydown", handleDialogKeyDown);
  }, [state.kind]);

  function closeConfirmation() {
    setState({ kind: "idle" });
    submitButtonRef.current?.focus();
  }

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
        emailSent?: boolean;
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
        email: payload.email,
        emailSent: result.emailSent === true,
        message:
          result.message ??
          "Thank you. Your request has been received and I’ll be in touch.",
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
          name and email are also passed to Resend solely to send your
          confirmation. Your assessment answers and Organisation Profile stay
          on this device. Do not include confidential assessment, financial or
          company information.
        </p>

        <button
          ref={submitButtonRef}
          type="submit"
          className={styles.submitButton}
          disabled={!configured || state.kind === "submitting"}
        >
          {state.kind === "submitting"
            ? "Sending…"
            : "Request a 30-minute conversation"}
        </button>

        {state.kind === "error" && (
          <p className={styles.errorMessage} role="alert">
            {state.message}{" "}
            <a href="mailto:rob.myresolve@gmail.com">Email Rob instead</a>.
          </p>
        )}
      </form>

      {state.kind === "success" && (
        <div className={styles.confirmationBackdrop}>
          <section
            className={styles.confirmationDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            aria-describedby="confirmation-message confirmation-email-status"
            data-testid="booking-confirmation"
          >
            <p className={styles.eyebrow}>Request received</p>
            <h2 id="confirmation-title" className={styles.confirmationTitle}>
              Thank you — your request is complete
            </h2>
            <p id="confirmation-message">{state.message}</p>
            <p
              id="confirmation-email-status"
              className={
                state.emailSent
                  ? styles.confirmationEmailSent
                  : styles.confirmationEmailWarning
              }
            >
              {state.emailSent
                ? `A confirmation email has been sent to ${state.email}.`
                : "Your request is safely recorded, but the confirmation email could not be sent. Rob will still be in touch."}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.submitButton}
              onClick={closeConfirmation}
            >
              Close confirmation
            </button>
          </section>
        </div>
      )}
    </section>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { KPIS_PAGE_CONTENT } from "./kpisContent";
import styles from "./KpisPage.module.css";

type KpisFormProps = {
  apiUrl: string;
};

type SubmissionState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error" };

function fieldValue(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

/**
 * Posts to the booking Worker's /kpis endpoint. The Worker sends the PDF, so
 * the success and failure copy here only describes what the visitor should
 * do next; it never links to the file directly.
 */
export function KpisForm({ apiUrl }: KpisFormProps) {
  const { form: copy } = KPIS_PAGE_CONTENT;
  const [state, setState] = useState<SubmissionState>({ kind: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const payload = {
      email: fieldValue(form, "email"),
      name: fieldValue(form, "name"),
      subscriptionInterest: form.get("subscriptionInterest") === "on",
      website: fieldValue(form, "website"),
    };

    setState({ kind: "submitting" });
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      formElement.reset();
      setState({ kind: "success" });
    } catch {
      setState({ kind: "error" });
    }
  }

  if (state.kind === "success") {
    return (
      <p className={styles.formSuccess} role="status" data-testid="kpis-success">
        {copy.success}
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} data-testid="kpis-form">
      <label className={styles.field}>
        <span>{copy.emailLabel}</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
        />
      </label>
      <label className={styles.field}>
        <span>{copy.nameLabel}</span>
        <input name="name" autoComplete="name" maxLength={100} />
      </label>

      <label className={styles.checkbox}>
        <input
          name="subscriptionInterest"
          type="checkbox"
          data-testid="kpis-subscription"
        />
        <span>
          {copy.subscriptionLabelBefore}
          <span className={styles.brandName}>{copy.subscriptionLabelBrand}</span>
          {copy.subscriptionLabelAfter}
        </span>
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" maxLength={200} />
      </label>

      <button
        type="submit"
        className={styles.ctaPrimary}
        disabled={state.kind === "submitting"}
        data-testid="kpis-submit"
      >
        {state.kind === "submitting" ? copy.submittingLabel : copy.buttonLabel}
      </button>

      <p className={styles.formNote} data-testid="kpis-note">
        {copy.noteBefore}
        <a href={`mailto:${copy.noteEmail}`}>{copy.noteEmail}</a>
        {copy.noteAfter}
      </p>

      {state.kind === "error" && (
        <p className={styles.formError} role="alert" data-testid="kpis-failure">
          {copy.failure}
        </p>
      )}
    </form>
  );
}

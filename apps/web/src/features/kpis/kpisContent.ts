export const KPIS_PAGE_HREF = "/kpis";

/**
 * The booking Worker answers on api.myresolve.uk; /kpis is the companion PDF
 * endpoint beside the enquiry endpoint. Override locally with
 * NEXT_PUBLIC_KPIS_API_URL.
 */
export const KPIS_API_URL =
  process.env.NEXT_PUBLIC_KPIS_API_URL ?? "https://api.myresolve.uk/kpis";

/**
 * MYR-KPIS-PAGE: /kpis gives away the free companion PDF, The twenty numbers,
 * in exchange for a work email, and lets the same person register interest in
 * the MYReSolve subscription (in development, not on sale). Copy approved by
 * Rob on 16 September 2026, verbatim from 22_Task_Records /
 * MYR-KPIS-PAGE-TASK-BRIEF.md. Do not reword without a new approval record.
 *
 * No prices anywhere on the page. No claims about the subscription beyond the
 * checkbox wording.
 *
 * The brand name is always "MYReSolve". The eyebrow is uppercased in CSS, so
 * the name is rendered in its own element that opts out of text-transform.
 */
export const KPIS_PAGE_CONTENT = {
  seo: {
    title: "The twenty numbers, the free MYReSolve Operating Playbook companion",
    description:
      "The KPIs a leadership team should see every week. One page, the same page, at every level, on the same day. The free companion PDF to the MYReSolve Operating Playbook.",
  },
  nav: {
    inside: "Inside",
    playbook: "The Playbook series",
    assessment: "The assessment",
    // The dark pill in the header jumps to the form on this page.
    requestButton: "Send me the PDF",
  },
  hero: {
    eyebrowBrand: "MYReSolve",
    eyebrowAfter: " · Operating Playbook · Companion",
    headlineLead: "The twenty",
    headlineAccent: "numbers",
    headline: "The twenty numbers",
    lead: "The KPIs a leadership team should see every week. One page, the same page, at every level, on the same day.",
  },
  inside: {
    body: "Most businesses have every one of these numbers somewhere. Almost none has put two of them on the same page. Each of the twenty is the primary or supporting indicator from one of the twelve books of the MYReSolve Operating Playbook, chosen because it cannot be flattered. The PDF explains what each one counts, why it matters, and gives you the one-page template to copy.",
    heading: "Inside",
    items: [
      "The twenty numbers, in four groups",
      "What each one counts and why it can't be flattered",
      "Your page, ready to fill in",
    ],
  },
  form: {
    heading: "Send me the PDF",
    emailLabel: "Work email",
    nameLabel: "Name (optional)",
    subscriptionLabelBefore: "Tell me when the ",
    subscriptionLabelBrand: "MYReSolve",
    subscriptionLabelAfter:
      " subscription is ready. It keeps this page current, refreshed from the systems you already report from. In development, not yet on sale.",
    subscriptionLabel:
      "Tell me when the MYReSolve subscription is ready. It keeps this page current, refreshed from the systems you already report from. In development, not yet on sale.",
    buttonLabel: "Send the PDF",
    submittingLabel: "Sending…",
    noteBefore: "We will email you the PDF and nothing else unless you tick the box. ",
    noteEmail: "hello@myresolve.uk",
    noteAfter: ".",
    success:
      "Sent. Check your inbox for The twenty numbers. If it is not there in a few minutes, look in spam or email hello@myresolve.uk.",
    failure:
      "Something went wrong. Email hello@myresolve.uk and we will send it by hand.",
  },
  links: [
    {
      label: "The Structured Executive Assessment",
      href: "/organisation-profile",
      testId: "kpis-link-assessment",
    },
    {
      label: "The Operating Playbook, twelve books",
      href: "/book",
      testId: "kpis-link-book",
    },
  ],
  footer: {
    description:
      "MYReSolve gives leaders the clarity to make better decisions.",
  },
} as const;

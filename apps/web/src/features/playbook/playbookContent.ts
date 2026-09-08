import { BOOK_PAGE_HREF } from "@/src/features/book/bookContent";

export const PLAYBOOK_PAGE_HREF = "/playbook";

/**
 * Copy approved by Rob Pierce on 8 September 2026 (MYR-PLAYBOOK-PAGE).
 * Titles and one-line descriptions are verbatim from the approved reference,
 * 22_Task_Records / myresolve-playbook.html. Do not reword without a new
 * approval record in 21_Website_Approvals.
 *
 * The brand name is always "MYReSolve". The hero eyebrow is uppercased in CSS,
 * so the name is rendered in its own element that opts out of text-transform.
 */
export const PLAYBOOK_PAGE_CONTENT = {
  seo: {
    title:
      "The MYReSolve Operating Playbook — twelve playbooks, three lenses",
    description:
      "Twelve short, practical playbooks on the things that decide whether a business runs well. Each one seen from the Frontline, the Manager and the Executive. Book One, the seven behaviours, is out now.",
  },
  hero: {
    eyebrowBefore: "The ",
    eyebrowBrand: "MYReSolve",
    eyebrowAfter: " Operating Playbook",
    headline: "Twelve playbooks. Three lenses. One page a leader can act on.",
    headlineLead: "Twelve playbooks.",
    headlineAccent: "Three lenses.",
    headlineTrail: "One page a leader can act on.",
    lead: "Short, practical playbooks on the things that decide whether a business runs well. Each one is written for the whole organisation, not one audience, and each one ends in simple reporting a leader can act on. Book One is out now. The rest are listed below so you can see the shape of the series before you buy the first instalment.",
    ctaLabel: "Start with Book One",
  },
  lenses: {
    eyebrow: "How every book is written",
    heading: "Same operation, three views.",
    intro:
      "Most operational guidance is written for one audience, which is why change so often fails to stick. The three levels of a business are looking at the same operation and seeing different things. Every playbook in this series covers one topic from all three positions, in one document.",
    items: [
      {
        name: "Frontline",
        body: "The person doing the work. What you see from where you stand, what the behaviours look like in your hands, and what you can change.",
      },
      {
        name: "Manager",
        body: "The person checking it. What reaches you, what you push back down, and what you measure.",
      },
      {
        name: "Executive",
        body: "The person deciding on it. The lever only you hold, and the one page you should be shown each month.",
      },
    ],
  },
  books: {
    eyebrow: "The series",
    heading: "The twelve books.",
    intro:
      "Industry-agnostic, never generic. The operational skill set is transferable and the product is irrelevant. Each book opens with a pattern you will recognise from your own week, and ends with the two or three numbers that tell you whether it is working.",
    outNowTag: "Out now · £24",
    comingTag: "Coming",
    items: [
      {
        number: "01",
        title: "The Perfect Culture Playbook: the seven behaviours",
        line: "Behaviour, not process. Listen, Empathise, Recover, N+1, Empowerment, Happiness, Ethics, and exactly how to deliver them. The foundation for everything that follows.",
        href: BOOK_PAGE_HREF,
      },
      {
        number: "02",
        title: "Escalations and complaints",
        line: "Why most complaints climb the chain, and how the seven behaviours stop them.",
        href: null,
      },
      {
        number: "03",
        title: "Recruiting and keeping frontline people",
        line: "Why the people you most want to keep are the ones who leave, and how the seven behaviours become a hiring standard.",
        href: null,
      },
      {
        number: "04",
        title: "Daily operating rhythm",
        line: "The few fixed points in a day and a week that let an operation run itself, and what happens when they slip.",
        href: null,
      },
      {
        number: "05",
        title: "Delivery performance",
        line: "What on time means to the customer, why it rarely matches the report, and how to close the gap.",
        href: null,
      },
      {
        number: "06",
        title: "Warehouse flow and capacity",
        line: "Where a building stops moving, how to see it before the customer does, and what capacity really means.",
        href: null,
      },
      {
        number: "07",
        title: "Aftersales and returns",
        line: "The moment after the sale that decides whether there is a second one.",
        href: null,
      },
      {
        number: "08",
        title: "Outsourced and third-party partners",
        line: "What to do when the customer sits in the gap between two rule books.",
        href: null,
      },
      {
        number: "09",
        title: "Cost to serve",
        line: "What each customer contact actually costs, and which ones you are paying for twice.",
        href: null,
      },
      {
        number: "10",
        title: "Peak planning",
        line: "Planning for the weeks that decide the year without breaking the people who run them.",
        href: null,
      },
      {
        number: "11",
        title: "Systems change without chaos",
        line: "How to change the system without losing the operation for a quarter.",
        href: null,
      },
      {
        number: "12",
        title: "Reporting that leaders act on",
        line: "One page, three lenses, the numbers that move. The book that ties the series together.",
        href: null,
      },
    ],
  },
  finalCta: {
    heading: "Start with the behaviours.",
    body: "Everything in the series stands on Book One. Read it first. Then, if you want to see what your own operation currently shows before the next book arrives, the Structured Executive Assessment puts it on one page.",
    primaryLabel: "Buy Book One, £24",
    primaryHref: BOOK_PAGE_HREF,
    secondaryLabel: "Take the assessment",
    secondaryHref: "/organisation-profile",
  },
  footer: {
    description: "MYReSolve gives leaders the clarity to make better decisions.",
  },
} as const;

export type PlaybookPageContent = typeof PLAYBOOK_PAGE_CONTENT;

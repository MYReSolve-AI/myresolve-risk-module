export const BOOK_PURCHASE_URL = "https://payhip.com/b/bWv40";

export const BOOK_PAGE_HREF = "/book";

/**
 * MYR-PLAYBOOK-PAGE v2: /book sells Book One and shows the twelve-book series
 * on one page. Copy approved by Rob on 8 September 2026, verbatim from
 * 22_Task_Records / myresolve-book-merged.html. Do not reword without a new
 * approval record in 21_Website_Approvals.
 *
 * The brand name is always "MYReSolve". Both eyebrows are uppercased in CSS,
 * so the name is rendered in its own element that opts out of text-transform.
 */
export const BOOK_PAGE_CONTENT = {
  seo: {
    title:
      "Behaviour, not process — The Perfect Culture Playbook, Book One of the MYReSolve Operating Playbook",
    description:
      "The seven behaviours that build a culture your customers and colleagues can feel. Book One of the MYReSolve Operating Playbook: twelve playbooks, three lenses, one page a leader can act on. £24.",
  },
  nav: {
    behaviours: "The behaviours",
    audience: "Who it is for",
    author: "The author",
    // The dark pill in the header is the "see the whole thing" action: it jumps
    // to the series on this page. Buying is done by the three buy buttons.
    seriesButton: "The Playbook series",
  },
  hero: {
    eyebrowBefore: "The ",
    eyebrowBrand: "MYReSolve",
    eyebrowAfter: " Operating Playbook · Book One",
    headlineLead: "Behaviour,",
    headlineAccent: "not process.",
    headline: "Behaviour, not process.",
    lead: "The seven behaviours that build a culture your customers and colleagues can feel, with exactly how to deliver them from Monday morning. Book One of a twelve-book series, each one seen from the Frontline, the Manager and the Executive.",
    seriesLinkLabel: "See the series",
  },
  purchase: {
    buttonLabel: "Buy Book One",
    price: "£24",
    priceNote: "Secure checkout and instant delivery handled by Payhip.",
  },
  problem: {
    eyebrow: "Most advice tells you what to do. This shows you how.",
    openingQuote:
      "Culture is not a values poster, a quarterly survey or a process map. It is the sum of how your people behave when nobody is checking.",
    body: "Most books stop at the principle and leave you to work out the rest. The Perfect Culture Playbook takes seven behaviours and gives you the words, the timing and the practical steps that turn good intentions into something your customers can feel.",
    pullStatement:
      "Process tells your team what happened. Behaviour decides how it felt.",
  },
  behaviours: {
    eyebrow: "Book One",
    heading: "The seven behaviours.",
    intro:
      "The heart of the MYReSolve approach, and the foundation every later book stands on.",
    items: [
      {
        name: "Listen",
        body: "Give people your full attention so they only have to say it once. How to hear the need behind the words, and what to do with what you hear.",
      },
      {
        name: "Empathise",
        body: "Move from understanding the situation to understanding the person. Language and prompts you can use in the moment without sounding scripted.",
      },
      {
        name: "Recover",
        body: "Things will go wrong. Recovery is the part people remember. A repeatable way to own the problem, put it right and keep the relationship.",
      },
      {
        name: "N+1",
        body: "Deliver everything that was expected, then add one deliberate thing more. Small, specific and repeatable, so it becomes a habit rather than a heroic effort.",
      },
      {
        name: "Empowerment",
        body: "Give your team the authority to solve the problem in front of them. Clear boundaries, visible support and no queue for permission.",
      },
      {
        name: "Happiness",
        body: "Colleagues who feel good create customers who feel it too. How to protect energy, notice the warning signs and make the good days outnumber the hard ones.",
      },
      {
        name: "Ethics",
        body: "Do the right thing when it costs you something. A simple test to apply when the easy answer and the right answer are not the same.",
      },
    ],
  },
  audience: {
    eyebrow: "Who it is for",
    heading: "Same operation, three views.",
    intro:
      "Every book in the series is written for the whole organisation, not one audience, so the behaviour your leaders describe is the behaviour your customers actually meet.",
    groups: [
      {
        title: "Frontline",
        body: "For the people who meet customers every day. Behaviours you can use on your very next interaction, with words you can genuinely say out loud.",
      },
      {
        title: "Manager",
        body: "For the people who check the work and coach the team. What reaches you, what you push back down, and how to back a good call in public.",
      },
      {
        title: "Executive",
        body: "For the people who set the tone and sign off the budget. The lever only you hold, and the one page you should be shown each month.",
      },
    ],
  },
  series: {
    eyebrowBefore: "The ",
    eyebrowBrand: "MYReSolve",
    eyebrowAfter: " Operating Playbook",
    heading: "Twelve playbooks. Three lenses. One page a leader can act on.",
    intro:
      "Short, practical playbooks on the things that decide whether a business runs well. Industry-agnostic, never generic. Each one opens with a pattern you will recognise from your own week, and ends with the two or three numbers that tell you whether it is working. Book One is out now. The rest are listed so you can see the shape of the series before you buy the first instalment.",
    buyTag: "Buy now · £24",
    comingTag: "Coming",
    items: [
      {
        number: "01",
        title: "The Perfect Culture Playbook: the seven behaviours",
        line: "Behaviour, not process. Listen, Empathise, Recover, N+1, Empowerment, Happiness, Ethics, and exactly how to deliver them. The foundation for everything that follows.",
        live: true,
      },
      {
        number: "02",
        title: "Escalations and complaints",
        line: "Why most complaints climb the chain, and how the seven behaviours stop them.",
        live: false,
      },
      {
        number: "03",
        title: "Recruiting and keeping frontline people",
        line: "Why the people you most want to keep are the ones who leave, and how the seven behaviours become a hiring standard.",
        live: false,
      },
      {
        number: "04",
        title: "Daily operating rhythm",
        line: "The few fixed points in a day and a week that let an operation run itself, and what happens when they slip.",
        live: false,
      },
      {
        number: "05",
        title: "Delivery performance",
        line: "What on time means to the customer, why it rarely matches the report, and how to close the gap.",
        live: false,
      },
      {
        number: "06",
        title: "Warehouse flow and capacity",
        line: "Where a building stops moving, how to see it before the customer does, and what capacity really means.",
        live: false,
      },
      {
        number: "07",
        title: "Aftersales and returns",
        line: "The moment after the sale that decides whether there is a second one.",
        live: false,
      },
      {
        number: "08",
        title: "Outsourced and third-party partners",
        line: "What to do when the customer sits in the gap between two rule books.",
        live: false,
      },
      {
        number: "09",
        title: "Cost to serve",
        line: "What each customer contact actually costs, and which ones you are paying for twice.",
        live: false,
      },
      {
        number: "10",
        title: "Peak planning",
        line: "Planning for the weeks that decide the year without breaking the people who run them.",
        live: false,
      },
      {
        number: "11",
        title: "Systems change without chaos",
        line: "How to change the system without losing the operation for a quarter.",
        live: false,
      },
      {
        number: "12",
        title: "Reporting that leaders act on",
        line: "One page, three lenses, the numbers that move. The book that ties the series together.",
        live: false,
      },
    ],
  },
  author: {
    eyebrow: "About the author",
    heading: "Written from the shop floor, not the seminar room.",
    body1:
      "Rob Pierce has spent more than 25 years in customer facing and operational leadership, working with businesses including John Lewis, Rapha and Loaf.",
    body2:
      "The seven behaviours in this playbook are the ones he saw work again and again: simple enough for a first day, strong enough to hold a whole culture together. The eleven books that follow take the same three views to the rest of the operation.",
    name: "Rob Pierce",
    role: "Founder, MYReSolve",
    signOff: "Do it right, Do it once.",
  },
  finalCta: {
    heading: "Start with the behaviours.",
    body: "Seven behaviours, a shared language and a starting point your whole team can use from Monday morning. Everything in the series stands on Book One. Then, if you want to see what your own operation currently shows, the Structured Executive Assessment puts it on one page.",
    primaryLabel: "Buy Book One, £24",
    secondaryLabel: "Take the assessment",
    secondaryHref: "/organisation-profile",
  },
  footer: {
    description:
      "MYReSolve gives leaders the clarity to make better decisions.",
  },
} as const;

export type BookPageContent = typeof BOOK_PAGE_CONTENT;

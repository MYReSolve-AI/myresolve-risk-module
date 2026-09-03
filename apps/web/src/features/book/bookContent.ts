export const BOOK_PURCHASE_URL = "https://payhip.com/b/bWv40";

export const BOOK_PAGE_HREF = "/book";

export const BOOK_PAGE_CONTENT = {
  seo: {
    title: "Behaviour, not process — The Perfect Culture Playbook",
    description:
      "The seven behaviours that build a culture your customers and colleagues can feel, with exactly how to deliver them from Monday morning. By Rob Pierce, founder of MYReSolve.",
  },
  hero: {
    eyebrow: "The Perfect Culture Playbook",
    headlineLead: "Behaviour,",
    headlineAccent: "not process.",
    headline: "Behaviour, not process.",
    lead: "The seven behaviours that build a culture your customers and colleagues can feel, with exactly how to deliver them from Monday morning.",
    supportingLine:
      "A practical playbook for the people who serve customers and the leaders who set the tone.",
  },
  purchase: {
    buttonLabel: "Buy the book",
    price: "£24",
    priceNote: "Secure checkout and instant delivery handled by Payhip.",
  },
  problem: {
    heading: "Most advice tells you what to do. This shows you how.",
    intro:
      "Culture is not a values poster, a quarterly survey or a process map. It is the sum of how your people behave when nobody is checking.",
    body: "Most books stop at the principle and leave you to work out the rest. The Perfect Culture Playbook takes seven behaviours and gives you the words, the timing and the practical steps that turn good intentions into something your customers can feel.",
    pullStatement:
      "Process tells your team what happened. Behaviour decides how it felt.",
  },
  behaviours: {
    heading: "The seven behaviours",
    intro:
      "Each behaviour comes with what it means, why it matters and exactly how to deliver it in the next conversation you have.",
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
    heading: "Who it is for",
    intro:
      "Two audiences, one shared language, so the behaviour your leaders describe is the behaviour your customers actually meet.",
    groups: [
      {
        title: "Frontline",
        body: "For the people who meet customers every day. Behaviours you can use on your very next interaction, with words you can genuinely say out loud.",
      },
      {
        title: "Leaders",
        body: "For the people who set the tone. How to model, coach and reinforce the seven behaviours so the culture holds when you are not in the room.",
      },
    ],
  },
  author: {
    eyebrow: "About the author",
    heading: "Written from the shop floor, not the seminar room",
    body1:
      "Rob Pierce has spent more than 25 years in customer facing and operational leadership, working with businesses including John Lewis, Rapha and Loaf.",
    body2:
      "The seven behaviours in this playbook are the ones he saw work again and again: simple enough for a first day, strong enough to hold a whole culture together.",
    name: "Rob Pierce",
    role: "Founder, MYReSolve",
    signOff: "Do it right, Do it once.",
  },
  finalCta: {
    heading:
      "Create the perfect flywheel of success, driving culture at every interaction.",
    body: "Seven behaviours, a shared language and a starting point your whole team can use from Monday morning.",
  },
  footer: {
    description:
      "MYReSolve gives leaders the clarity to make better decisions.",
  },
} as const;

export type BookPageContent = typeof BOOK_PAGE_CONTENT;

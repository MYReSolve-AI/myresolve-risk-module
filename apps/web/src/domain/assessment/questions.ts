import type { AssessmentQuestion, AssessmentSection } from "./types";

type SectionDef = {
  name: string;
  intro: string;
  cost: readonly [number, number];
  questions: readonly string[];
};

/**
 * Exact department definitions, intros, cost ranges and question wording
 * from legacy/v0.3.1/index.html — order must not change.
 */
const SECTION_DEFS: readonly SectionDef[] = [
  {
    name: "People",
    intro:
      "Assess leadership depth, role clarity, capability and accountability.",
    cost: [750000, 1500000],
    questions: [
      "Do we have the right people in the right roles?",
      "Are teams clear on what good performance looks like?",
      "Do we invest in people consistently?",
      "Is accountability clear and reinforced?",
    ],
  },
  {
    name: "Process",
    intro:
      "Assess simplicity, consistency, hand-offs and continuous improvement.",
    cost: [1000000, 2200000],
    questions: [
      "Are our core processes simple, standard and followed?",
      "Do we eliminate or fix broken hand-offs?",
      "Is duplication or unnecessary work actively removed?",
      "Do we measure and improve key processes?",
    ],
  },
  {
    name: "Customer",
    intro:
      "Assess customer understanding, resolution, effort and lifetime value.",
    cost: [1200000, 2800000],
    questions: [
      "Do we understand our customers deeply?",
      "Are we easy to deal with at every touchpoint?",
      "Do we resolve issues first time?",
      "Are we creating loyalty rather than handling demand?",
    ],
  },
  {
    name: "Operations",
    intro:
      "Assess visibility, capacity, asset use and operating discipline.",
    cost: [800000, 1800000],
    questions: [
      "Do we have clear end-to-end operational visibility?",
      "Are we planning effectively and flexing fast enough?",
      "Are assets, space and people used well?",
      "Do we have a culture of continuous improvement?",
    ],
  },
  {
    name: "Technology",
    intro:
      "Assess whether systems, data and automation help people perform.",
    cost: [400000, 1000000],
    questions: [
      "Does technology help rather than hinder teams?",
      "Do systems talk to each other?",
      "Do leaders have the right data to make decisions?",
      "Are we automating the right things?",
    ],
  },
  {
    name: "Finance",
    intro:
      "Assess cost-to-serve, reporting confidence and investment discipline.",
    cost: [600000, 1400000],
    questions: [
      "Do we understand the true cost of serving customers?",
      "Are forecasts and reports trusted?",
      "Is commercial discipline consistently strong?",
      "Are we investing in the right areas?",
    ],
  },
] as const;

function buildQuestion(
  sectionIndex: number,
  questionIndex: number,
  text: string,
): AssessmentQuestion {
  return {
    id: `${sectionIndex}-${questionIndex}` as AssessmentQuestion["id"],
    sectionIndex,
    questionIndex,
    text,
  };
}

export const SECTIONS: readonly AssessmentSection[] = SECTION_DEFS.map(
  (def, index) => ({
    index,
    name: def.name,
    intro: def.intro,
    cost: def.cost,
    questions: def.questions.map((text, qi) =>
      buildQuestion(index, qi, text),
    ),
  }),
);

export const TOTAL_QUESTIONS = SECTIONS.reduce(
  (n, s) => n + s.questions.length,
  0,
);

export function getSection(index: number): AssessmentSection {
  const section = SECTIONS[index];
  if (!section) {
    throw new Error(`Unknown section index: ${index}`);
  }
  return section;
}

export function allQuestions(): AssessmentQuestion[] {
  return SECTIONS.flatMap((s) => [...s.questions]);
}

export function answerKey(sectionIndex: number, questionIndex: number): string {
  return `${sectionIndex}-${questionIndex}`;
}

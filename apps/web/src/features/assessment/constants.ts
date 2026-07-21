import type { AnswerKey } from "@/src/domain/assessment";

/**
 * Presentational constants for the assessment UX.
 * Question content itself always comes from the domain question bank.
 */

/**
 * Plain-English guidance approved in Customer Journey Review 001.
 * Stable answer keys preserve the locked assessment order and stored answers.
 */
export const ASSESSMENT_QUESTION_GUIDANCE: Readonly<Record<AnswerKey, string>> = {
  "0-0":
    "Think about whether responsibilities are clear, people have the right skills and leaders have enough capacity to deliver what the company needs today.",
  "0-1":
    "Think about whether every team has clear measures, goals and feedback, and whether people understand what good looks like in their role.",
  "0-2":
    "Consider whether coaching, training and development happen consistently, rather than only when a problem appears.",
  "0-3":
    "Consider whether people know what they own, decisions are followed through and performance issues are addressed fairly and consistently.",
  "1-0":
    "Think about whether important work follows a simple, understood and repeatable process in everyday practice.",
  "1-1":
    "Think about when work, decisions or information pass between teams. Are responsibilities clear, and are delays, mistakes or repeated work dealt with quickly?",
  "1-2":
    "Look for repeated data entry, unnecessary approvals, duplicate reports or manual work that could be simplified or removed.",
  "1-3":
    "Consider whether key processes have clear owners and measures, and whether results lead to practical improvements.",
  "2-0":
    "Think about what customers tell you, what their behaviour and service data show, and whether this insight improves decisions, products and service.",
  "2-1":
    "Consider whether customers can reach the right team through suitable channels, at appropriate times, and receive a timely, consistent response without repeating themselves.",
  "2-2":
    "Think about whether customer questions and problems are fully resolved without avoidable repeat contact, rework or escalation.",
  "2-3":
    "Consider whether customers choose to return, renew or recommend the company, and whether relationships are built proactively rather than only reacting to demand.",
  "3-0":
    "Think about whether leaders can see demand, capacity, performance and problems across the full flow of work, not only within individual teams.",
  "3-1":
    "Consider whether plans use realistic demand and capacity information, and whether resources can adjust quickly when conditions change.",
  "3-2":
    "Think about whether people, equipment and space are used productively, with bottlenecks, overload and unused capacity understood and managed.",
  "3-3":
    "Consider whether people are encouraged to identify, test and sustain improvements as part of normal work.",
  "4-0":
    "Think about whether systems are reliable, easy to use and designed around the work, reducing effort rather than creating workarounds.",
  "4-1":
    "Consider whether information flows between systems without repeated data entry, conflicting records or heavy spreadsheet workarounds.",
  "4-2":
    "Think about whether leaders receive accurate, timely and consistent information that they trust enough to use in decisions.",
  "4-3":
    "Consider whether repeatable, low-value work is automated with suitable controls, rather than automating a poorly designed process.",
  "5-0":
    "Think about whether direct and indirect costs are understood across products, services, channels and customer groups.",
  "5-1":
    "Consider whether forecasts and reports are timely, accurate and based on consistent definitions, and whether leaders confidently act on them.",
  "5-2":
    "Think about whether pricing, margin, discounts, contracts and spending decisions are managed consistently across the company.",
  "5-3":
    "Consider whether investment follows company strategy, uses clear evidence and ownership, and is reviewed against the benefits it was expected to deliver.",
};

export const ASSESSMENT_QUESTION_TITLES: Readonly<
  Partial<Record<AnswerKey, string>>
> = {
  "1-1": "Does work move smoothly between teams?",
  "2-0": "Do we understand what our customers need and experience?",
  "2-1": "Can customers contact us easily, when and how they need to?",
};

export function assessmentQuestionGuidance(id: AnswerKey): string {
  return ASSESSMENT_QUESTION_GUIDANCE[id];
}

export function assessmentQuestionTitle(id: AnswerKey, fallback: string): string {
  return ASSESSMENT_QUESTION_TITLES[id] ?? fallback;
}

export const ASSESSMENT_VERSION = "v0.3.1";

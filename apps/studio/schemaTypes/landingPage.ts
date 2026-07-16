import { defineField, defineType, type Rule } from "sanity";
import approvedContent from "../../../content/landing-page-v2.json";

const limits = {
  heading: 120,
  body: 400,
  label: 60,
  seoTitle: 60,
  seoDescription: 160,
} as const;

function noMarkup(value: string | undefined) {
  if (!value) return true;
  return /[<>]|javascript:|data:text\/html/i.test(value)
    ? "Use plain text only. HTML, scripts and embedded code are not allowed."
    : true;
}

function requiredText(rule: Rule, max: number) {
  return rule.required().max(max).custom(noMarkup);
}

function optionalText(rule: Rule, max: number) {
  return rule.max(max).custom(noMarkup);
}

function copyPair(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "title",
        title: "Heading",
        type: "string",
        validation: (rule) => requiredText(rule, limits.heading),
      }),
      defineField({
        name: "body",
        title: "Supporting text",
        type: "text",
        rows: 3,
        validation: (rule) => requiredText(rule, limits.body),
      }),
    ],
  });
}

function comparisonRow(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "from",
        title: "From",
        type: "string",
        validation: (rule) => requiredText(rule, limits.heading),
      }),
      defineField({
        name: "to",
        title: "With MYReSolve",
        type: "string",
        validation: (rule) => requiredText(rule, limits.body),
      }),
    ],
  });
}

function campaignText(rule: Rule, max: number) {
  return rule.max(max).custom((value, context) => {
    const parent = context.parent as { enabled?: boolean } | undefined;
    if (parent?.enabled && (typeof value !== "string" || !value.trim())) {
      return "Required when the campaign is enabled.";
    }
    return noMarkup(typeof value === "string" ? value : undefined);
  });
}

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  initialValue: approvedContent,
  groups: [
    { name: "seo", title: "SEO" },
    { name: "hero", title: "Hero" },
    { name: "story", title: "Page story" },
    { name: "cta", title: "Calls to action" },
  ],
  fields: [
    defineField({
      name: "seo",
      title: "Search appearance",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "SEO title",
          type: "string",
          validation: (rule) => requiredText(rule, limits.seoTitle),
        }),
        defineField({
          name: "description",
          title: "SEO description",
          type: "text",
          rows: 3,
          validation: (rule) => requiredText(rule, limits.seoDescription),
        }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: (rule) => requiredText(rule, limits.label),
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          validation: (rule) => requiredText(rule, limits.heading),
        }),
        defineField({
          name: "problemText",
          title: "Problem statement",
          type: "text",
          rows: 3,
          validation: (rule) => requiredText(rule, limits.body),
        }),
        defineField({
          name: "supportText",
          title: "Supporting statement",
          type: "text",
          rows: 3,
          validation: (rule) => requiredText(rule, limits.body),
        }),
        defineField({
          name: "supportingLine",
          title: "Supporting line",
          type: "string",
          validation: (rule) => optionalText(rule, limits.body),
        }),
      ],
    }),
    defineField({
      name: "primaryCta",
      title: "Primary button",
      type: "object",
      group: "cta",
      description: "The button destination is protected in the website code.",
      fields: [
        defineField({
          name: "label",
          title: "Button wording",
          type: "string",
          validation: (rule) => requiredText(rule, limits.label),
        }),
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary button",
      type: "object",
      group: "cta",
      description: "The button destination is protected in the website code.",
      fields: [
        defineField({
          name: "label",
          title: "Button wording",
          type: "string",
          validation: (rule) => requiredText(rule, limits.label),
        }),
      ],
    }),
    defineField({
      name: "campaign",
      title: "Announcement",
      type: "object",
      group: "story",
      description: "Optional fixed announcement. It cannot add links or new sections.",
      fields: [
        defineField({
          name: "enabled",
          title: "Show announcement",
          type: "boolean",
          initialValue: false,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          hidden: ({ parent }) => !parent?.enabled,
          validation: (rule) => campaignText(rule, limits.label),
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          hidden: ({ parent }) => !parent?.enabled,
          validation: (rule) => campaignText(rule, limits.heading),
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 3,
          hidden: ({ parent }) => !parent?.enabled,
          validation: (rule) => campaignText(rule, limits.body),
        }),
      ],
    }),
    defineField({
      name: "familiar",
      title: "Does this feel familiar?",
      type: "object",
      group: "story",
      fields: [
        defineField({
          name: "introHeading",
          title: "Section heading",
          type: "string",
          validation: (rule) => requiredText(rule, limits.heading),
        }),
        defineField({
          name: "intro",
          title: "Introduction",
          type: "text",
          rows: 2,
          validation: (rule) => requiredText(rule, limits.body),
        }),
        copyPair("observation1", "Observation 1"),
        copyPair("observation2", "Observation 2"),
        copyPair("observation3", "Observation 3"),
        defineField({
          name: "transitionStatement",
          title: "Transition statement",
          type: "string",
          validation: (rule) => requiredText(rule, limits.heading),
        }),
      ],
    }),
    defineField({
      name: "fromTo",
      title: "From reporting to clarity",
      type: "object",
      group: "story",
      fields: [
        defineField({
          name: "heading",
          title: "Section heading",
          type: "string",
          validation: (rule) => requiredText(rule, limits.heading),
        }),
        comparisonRow("row1", "Row 1"),
        comparisonRow("row2", "Row 2"),
        comparisonRow("row3", "Row 3"),
        comparisonRow("row4", "Row 4"),
      ],
    }),
    defineField({
      name: "howItWorks",
      title: "How it works",
      type: "object",
      group: "story",
      fields: [
        defineField({
          name: "heading",
          title: "Section heading",
          type: "string",
          validation: (rule) => requiredText(rule, limits.heading),
        }),
        copyPair("step1", "Step 1"),
        copyPair("step2", "Step 2"),
        copyPair("step3", "Step 3"),
      ],
    }),
    defineField({
      name: "clarity",
      title: "Leadership conversation",
      type: "object",
      group: "story",
      fields: [
        defineField({
          name: "heading",
          title: "Section heading",
          type: "string",
          validation: (rule) => requiredText(rule, limits.heading),
        }),
        defineField({
          name: "intro",
          title: "Introduction",
          type: "text",
          rows: 3,
          validation: (rule) => requiredText(rule, limits.body),
        }),
        copyPair("q1", "Question 1"),
        copyPair("q2", "Question 2"),
        copyPair("q3", "Question 3"),
      ],
    }),
    defineField({
      name: "finalCta",
      title: "Final call to action",
      type: "object",
      group: "cta",
      description: "The button destination is protected in the website code.",
      fields: [
        defineField({
          name: "title",
          title: "Heading",
          type: "string",
          validation: (rule) => requiredText(rule, limits.heading),
        }),
        defineField({
          name: "body",
          title: "Supporting text",
          type: "text",
          rows: 3,
          validation: (rule) => requiredText(rule, limits.body),
        }),
        defineField({
          name: "buttonLabel",
          title: "Button wording",
          type: "string",
          validation: (rule) => requiredText(rule, limits.label),
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "story",
      description: "Protected privacy, financial and legal wording remains in code.",
      fields: [
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
          validation: (rule) => requiredText(rule, limits.body),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "MYReSolve landing page" }),
  },
});

import approvedContent from "../../../../../content/landing-page-v2.json";

export const LANDING_CONTENT_LIMITS = {
  heading: 120,
  body: 400,
  label: 60,
  seoTitle: 60,
  seoDescription: 160,
} as const;

type Observation = { title: string; body: string };
type FromToRow = { from: string; to: string };
type Step = { title: string; body: string };
type Question = { title: string; body: string };

export type LandingPageContent = {
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: string;
    problemText: string;
    supportText: string;
    supportingLine?: string;
  };
  secondaryCta: { label: string };
  campaign: {
    enabled: boolean;
    label?: string;
    headline?: string;
    body?: string;
  };
  familiar: {
    introHeading: string;
    intro: string;
    observation1: Observation;
    observation2: Observation;
    observation3: Observation;
    transitionStatement: string;
  };
  fromTo: {
    heading: string;
    row1: FromToRow;
    row2: FromToRow;
    row3: FromToRow;
    row4: FromToRow;
  };
  howItWorks: {
    heading: string;
    step1: Step;
    step2: Step;
    step3: Step;
  };
  clarity: {
    heading: string;
    intro: string;
    q1: Question;
    q2: Question;
    q3: Question;
  };
  founder: {
    eyebrow: string;
    heading: string;
    body1: string;
    body2: string;
    quote: string;
    name: string;
    role: string;
  };
  finalCta: { title: string; body: string; buttonLabel: string };
  footer: { description: string };
};

type ValidationResult =
  | { success: true; content: LandingPageContent }
  | { success: false; errors: string[] };

const MARKUP = /[<>]|javascript:|data:text\/html/i;

function objectAt(value: unknown, path: string, errors: string[]) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    errors.push(`${path} must be an object`);
    return {} as Record<string, unknown>;
  }
  return value as Record<string, unknown>;
}

function textAt(
  value: unknown,
  path: string,
  max: number,
  errors: string[],
  optional?: false,
): string;
function textAt(
  value: unknown,
  path: string,
  max: number,
  errors: string[],
  optional: true,
): string | undefined;
function textAt(
  value: unknown,
  path: string,
  max: number,
  errors: string[],
  optional = false,
) {
  if (value === undefined || value === null || value === "") {
    if (optional) return undefined;
    errors.push(`${path} is required`);
    return "";
  }
  if (typeof value !== "string") {
    errors.push(`${path} must be plain text`);
    return "";
  }
  const text = value.trim();
  if (!text && !optional) errors.push(`${path} is required`);
  if (text.length > max) errors.push(`${path} exceeds ${max} characters`);
  if (MARKUP.test(text)) errors.push(`${path} contains disallowed markup`);
  return text;
}

function booleanAt(value: unknown, path: string, errors: string[]) {
  if (typeof value !== "boolean") {
    errors.push(`${path} must be true or false`);
    return false;
  }
  return value;
}

function pair(
  value: unknown,
  path: string,
  errors: string[],
  firstKey: "title" | "from",
  secondKey: "body" | "to",
) {
  const item = objectAt(value, path, errors);
  return {
    [firstKey]: textAt(
      item[firstKey],
      `${path}.${firstKey}`,
      LANDING_CONTENT_LIMITS.heading,
      errors,
    ),
    [secondKey]: textAt(
      item[secondKey],
      `${path}.${secondKey}`,
      LANDING_CONTENT_LIMITS.body,
      errors,
    ),
  } as Record<typeof firstKey | typeof secondKey, string>;
}

export function validateLandingPageContent(value: unknown): ValidationResult {
  const errors: string[] = [];
  const root = objectAt(value, "landingPage", errors);
  const seo = objectAt(root.seo, "seo", errors);
  const hero = objectAt(root.hero, "hero", errors);
  const secondaryCta = objectAt(root.secondaryCta, "secondaryCta", errors);
  const campaign = objectAt(root.campaign, "campaign", errors);
  const familiar = objectAt(root.familiar, "familiar", errors);
  const fromTo = objectAt(root.fromTo, "fromTo", errors);
  const howItWorks = objectAt(root.howItWorks, "howItWorks", errors);
  const clarity = objectAt(root.clarity, "clarity", errors);
  const founder = objectAt(
    root.founder ?? approvedContent.founder,
    "founder",
    errors,
  );
  const finalCta = objectAt(root.finalCta, "finalCta", errors);
  const footer = objectAt(root.footer, "footer", errors);
  const campaignEnabled = booleanAt(campaign.enabled, "campaign.enabled", errors);
  const campaignLabel = textAt(
    campaign.label,
    "campaign.label",
    LANDING_CONTENT_LIMITS.label,
    errors,
    true,
  );
  const campaignHeadline = textAt(
    campaign.headline,
    "campaign.headline",
    LANDING_CONTENT_LIMITS.heading,
    errors,
    true,
  );
  const campaignBody = textAt(
    campaign.body,
    "campaign.body",
    LANDING_CONTENT_LIMITS.body,
    errors,
    true,
  );

  if (campaignEnabled) {
    if (!campaignLabel) errors.push("campaign.label is required");
    if (!campaignHeadline) errors.push("campaign.headline is required");
    if (!campaignBody) errors.push("campaign.body is required");
  }

  const content: LandingPageContent = {
    seo: {
      title: textAt(
        seo.title,
        "seo.title",
        LANDING_CONTENT_LIMITS.seoTitle,
        errors,
      ),
      description: textAt(
        seo.description,
        "seo.description",
        LANDING_CONTENT_LIMITS.seoDescription,
        errors,
      ),
    },
    hero: {
      eyebrow: textAt(
        hero.eyebrow,
        "hero.eyebrow",
        LANDING_CONTENT_LIMITS.label,
        errors,
      ),
      headline: textAt(
        hero.headline,
        "hero.headline",
        LANDING_CONTENT_LIMITS.heading,
        errors,
      ),
      problemText: textAt(
        hero.problemText,
        "hero.problemText",
        LANDING_CONTENT_LIMITS.body,
        errors,
      ),
      supportText: textAt(
        hero.supportText,
        "hero.supportText",
        LANDING_CONTENT_LIMITS.body,
        errors,
      ),
      supportingLine: textAt(
        hero.supportingLine,
        "hero.supportingLine",
        LANDING_CONTENT_LIMITS.body,
        errors,
        true,
      ),
    },
    secondaryCta: {
      label: textAt(
        secondaryCta.label,
        "secondaryCta.label",
        LANDING_CONTENT_LIMITS.label,
        errors,
      ),
    },
    campaign: {
      enabled: campaignEnabled,
      label: campaignLabel,
      headline: campaignHeadline,
      body: campaignBody,
    },
    familiar: {
      introHeading: textAt(
        familiar.introHeading,
        "familiar.introHeading",
        LANDING_CONTENT_LIMITS.heading,
        errors,
      ),
      intro: textAt(
        familiar.intro,
        "familiar.intro",
        LANDING_CONTENT_LIMITS.body,
        errors,
      ),
      observation1: pair(
        familiar.observation1,
        "familiar.observation1",
        errors,
        "title",
        "body",
      ) as Observation,
      observation2: pair(
        familiar.observation2,
        "familiar.observation2",
        errors,
        "title",
        "body",
      ) as Observation,
      observation3: pair(
        familiar.observation3,
        "familiar.observation3",
        errors,
        "title",
        "body",
      ) as Observation,
      transitionStatement: textAt(
        familiar.transitionStatement,
        "familiar.transitionStatement",
        LANDING_CONTENT_LIMITS.heading,
        errors,
      ),
    },
    fromTo: {
      heading: textAt(
        fromTo.heading,
        "fromTo.heading",
        LANDING_CONTENT_LIMITS.heading,
        errors,
      ),
      row1: pair(fromTo.row1, "fromTo.row1", errors, "from", "to") as FromToRow,
      row2: pair(fromTo.row2, "fromTo.row2", errors, "from", "to") as FromToRow,
      row3: pair(fromTo.row3, "fromTo.row3", errors, "from", "to") as FromToRow,
      row4: pair(fromTo.row4, "fromTo.row4", errors, "from", "to") as FromToRow,
    },
    howItWorks: {
      heading: textAt(
        howItWorks.heading,
        "howItWorks.heading",
        LANDING_CONTENT_LIMITS.heading,
        errors,
      ),
      step1: pair(
        howItWorks.step1,
        "howItWorks.step1",
        errors,
        "title",
        "body",
      ) as Step,
      step2: pair(
        howItWorks.step2,
        "howItWorks.step2",
        errors,
        "title",
        "body",
      ) as Step,
      step3: pair(
        howItWorks.step3,
        "howItWorks.step3",
        errors,
        "title",
        "body",
      ) as Step,
    },
    clarity: {
      heading: textAt(
        clarity.heading,
        "clarity.heading",
        LANDING_CONTENT_LIMITS.heading,
        errors,
      ),
      intro: textAt(
        clarity.intro,
        "clarity.intro",
        LANDING_CONTENT_LIMITS.body,
        errors,
      ),
      q1: pair(clarity.q1, "clarity.q1", errors, "title", "body") as Question,
      q2: pair(clarity.q2, "clarity.q2", errors, "title", "body") as Question,
      q3: pair(clarity.q3, "clarity.q3", errors, "title", "body") as Question,
    },
    founder: {
      eyebrow: textAt(
        founder.eyebrow,
        "founder.eyebrow",
        LANDING_CONTENT_LIMITS.label,
        errors,
      ),
      heading: textAt(
        founder.heading,
        "founder.heading",
        LANDING_CONTENT_LIMITS.heading,
        errors,
      ),
      body1: textAt(
        founder.body1,
        "founder.body1",
        LANDING_CONTENT_LIMITS.body,
        errors,
      ),
      body2: textAt(
        founder.body2,
        "founder.body2",
        LANDING_CONTENT_LIMITS.body,
        errors,
      ),
      quote: textAt(
        founder.quote,
        "founder.quote",
        LANDING_CONTENT_LIMITS.heading,
        errors,
      ),
      name: textAt(
        founder.name,
        "founder.name",
        LANDING_CONTENT_LIMITS.label,
        errors,
      ),
      role: textAt(
        founder.role,
        "founder.role",
        LANDING_CONTENT_LIMITS.label,
        errors,
      ),
    },
    finalCta: {
      title: textAt(
        finalCta.title,
        "finalCta.title",
        LANDING_CONTENT_LIMITS.heading,
        errors,
      ),
      body: textAt(
        finalCta.body,
        "finalCta.body",
        LANDING_CONTENT_LIMITS.body,
        errors,
      ),
      buttonLabel: textAt(
        finalCta.buttonLabel,
        "finalCta.buttonLabel",
        LANDING_CONTENT_LIMITS.label,
        errors,
      ),
    },
    footer: {
      description: textAt(
        footer.description,
        "footer.description",
        LANDING_CONTENT_LIMITS.body,
        errors,
      ),
    },
  };

  return errors.length ? { success: false, errors } : { success: true, content };
}

const approved = validateLandingPageContent(approvedContent);

if (!approved.success) {
  throw new Error(`Approved landing fallback is invalid: ${approved.errors.join(", ")}`);
}

export const LANDING_PAGE_FALLBACK = approved.content;

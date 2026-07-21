import Image from "next/image";
import Link from "next/link";
import {
  LANDING_PAGE_FALLBACK,
  type LandingPageContent,
} from "./landingContent";
import styles from "./LandingPage.module.css";

const PRIMARY_HREF = "/organisation-profile";

const VAR_QUALIFICATION =
  "Estimated Annual Value at Risk is an illustrative modelled estimate. It is not an audited loss calculation or financial forecast.";

type LandingPageProps = {
  content?: LandingPageContent;
};

export function LandingPage({ content = LANDING_PAGE_FALLBACK }: LandingPageProps) {
  const {
    hero,
    secondaryCta,
    campaign,
    familiar,
    fromTo,
    howItWorks,
    clarity,
    founder,
    finalCta,
    footer,
  } = content;

  return (
    <div className={styles.page} data-testid="landing-page">
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brandLink} data-testid="home-brand">
            MYReSolve
          </Link>
          <nav className={styles.nav} aria-label="Page">
            <a href="#how-it-works" className={styles.navLink}>
              How it works
            </a>
            <a href="#clarity" className={styles.navLink}>
              Clarity
            </a>
            <a href="#why-myresolve" className={styles.navLink}>
              Why MYReSolve?
            </a>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {campaign.enabled ? (
          <section className={styles.campaign} aria-labelledby="campaign-heading">
            <div className={styles.campaignInner}>
              <p className={styles.campaignLabel}>{campaign.label}</p>
              <h2 id="campaign-heading" className={styles.campaignTitle}>
                {campaign.headline}
              </h2>
              <p className={styles.campaignBody}>{campaign.body}</p>
            </div>
          </section>
        ) : null}

        <section className={styles.hero} aria-labelledby="hero-headline">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-testid="home-eyebrow">
              {hero.eyebrow}
            </p>
            <h1 id="hero-headline" className={styles.headline}>
              {hero.headline}
            </h1>
            <p className={styles.problem} data-testid="home-problem">
              {hero.problemText}
            </p>
            <p className={styles.support} data-testid="home-support">
              {hero.supportText}
            </p>
            <div className={styles.ctaRow}>
              <a
                href="#how-it-works"
                className={styles.ctaSecondary}
                data-testid="home-secondary-cta"
              >
                {secondaryCta.label}
              </a>
            </div>
            {hero.supportingLine ? (
              <p className={styles.heroTag} data-testid="home-hero-tag">
                {hero.supportingLine}
              </p>
            ) : null}
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="familiar-heading"
          data-testid="home-familiar"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <h2 id="familiar-heading" className={styles.sectionTitle}>
                {familiar.introHeading}
              </h2>
              <p className={styles.sectionLead}>
                {familiar.intro}
              </p>
            </div>
            <div className={styles.observations}>
              <article className={styles.observation}>
                <h3 className={styles.observationTitle}>
                  {familiar.observation1.title}
                </h3>
                <p className={styles.observationBody}>
                  {familiar.observation1.body}
                </p>
              </article>
              <article className={styles.observation}>
                <h3 className={styles.observationTitle}>
                  {familiar.observation2.title}
                </h3>
                <p className={styles.observationBody}>
                  {familiar.observation2.body}
                </p>
              </article>
              <article className={styles.observation}>
                <h3 className={styles.observationTitle}>
                  {familiar.observation3.title}
                </h3>
                <p className={styles.observationBody}>
                  {familiar.observation3.body}
                </p>
              </article>
            </div>
            <p className={styles.pull} data-testid="home-pull-statement">
              {familiar.transitionStatement}
            </p>
          </div>
        </section>

        <section
          id="from-to"
          className={`${styles.section} ${styles.sectionContrast}`}
          aria-labelledby="from-to-heading"
          data-testid="home-from-to"
        >
          <div className={styles.sectionInnerWide}>
            <div className={styles.sectionIntro}>
              <h2 id="from-to-heading" className={styles.sectionTitle}>
                {fromTo.heading}
              </h2>
            </div>
            <div className={styles.compare} role="table" aria-label="From reporting to MYReSolve">
              <div className={styles.compareHead} role="row">
                <p className={styles.compareLabel} role="columnheader">
                  From
                </p>
                <p className={styles.compareLabelAccent} role="columnheader">
                  With MYReSolve
                </p>
              </div>
              <div className={styles.compareRow} role="row">
                <p role="cell">{fromTo.row1.from}</p>
                <p role="cell">{fromTo.row1.to}</p>
              </div>
              <div className={styles.compareRow} role="row">
                <p role="cell">{fromTo.row2.from}</p>
                <p role="cell">{fromTo.row2.to}</p>
              </div>
              <div className={styles.compareRow} role="row">
                <p role="cell">{fromTo.row3.from}</p>
                <p role="cell">{fromTo.row3.to}</p>
              </div>
              <div className={styles.compareRow} role="row">
                <p role="cell">{fromTo.row4.from}</p>
                <p role="cell">{fromTo.row4.to}</p>
              </div>
            </div>
            <p
              className={styles.qualification}
              data-testid="home-var-qualification-from-to"
            >
              {VAR_QUALIFICATION}
            </p>
          </div>
        </section>

        <section
          id="how-it-works"
          className={styles.section}
          aria-labelledby="how-it-works-heading"
          data-testid="how-it-works"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <h2 id="how-it-works-heading" className={styles.sectionTitle}>
                {howItWorks.heading}
              </h2>
            </div>
            <ol className={styles.steps}>
              <li className={styles.step}>
                <p className={styles.stepNumber}>1</p>
                <div>
                  <h3 className={styles.stepTitle}>
                    <Link
                      href={PRIMARY_HREF}
                      className={styles.stepLink}
                      data-testid="home-step-org-profile"
                    >
                      {howItWorks.step1.title}
                    </Link>
                  </h3>
                  <p className={styles.stepBody}>
                    {howItWorks.step1.body}
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <p className={styles.stepNumber}>2</p>
                <div>
                  <h3 className={styles.stepTitle}>
                    {howItWorks.step2.title}
                  </h3>
                  <p className={styles.stepBody}>
                    {howItWorks.step2.body}
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <p className={styles.stepNumber}>3</p>
                <div>
                  <h3 className={styles.stepTitle}>{howItWorks.step3.title}</h3>
                  <p className={styles.stepBody}>{howItWorks.step3.body}</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section
          id="clarity"
          className={`${styles.section} ${styles.sectionContrast}`}
          aria-labelledby="clarity-heading"
          data-testid="home-clarity"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <h2 id="clarity-heading" className={styles.sectionTitle}>
                {clarity.heading}
              </h2>
              <p className={styles.sectionLead}>
                {clarity.intro}
              </p>
            </div>
            <div className={styles.questions} data-testid="home-clarity-questions">
              <article className={styles.question}>
                <h3 className={styles.questionTitle}>{clarity.q1.title}</h3>
                <p className={styles.questionBody}>{clarity.q1.body}</p>
              </article>
              <article className={styles.question}>
                <h3 className={styles.questionTitle}>{clarity.q2.title}</h3>
                <p className={styles.questionBody}>{clarity.q2.body}</p>
              </article>
              <article className={styles.question}>
                <h3 className={styles.questionTitle}>
                  {clarity.q3.title}
                </h3>
                <p className={styles.questionBody}>
                  {clarity.q3.body}
                </p>
              </article>
            </div>
            <p
              className={styles.qualification}
              data-testid="home-var-qualification"
            >
              {VAR_QUALIFICATION}
            </p>
          </div>
        </section>

        <section
          id="why-myresolve"
          className={styles.section}
          aria-labelledby="founder-heading"
          data-testid="home-founder"
        >
          <div className={styles.founderInner}>
            <div className={styles.founderPortraitWrap}>
              <Image
                src="/images/rob-pierce-founder.png"
                alt="Rob Pierce, founder of MYReSolve"
                width={1024}
                height={1024}
                sizes="(max-width: 640px) 180px, 240px"
                className={styles.founderPortrait}
              />
            </div>
            <div className={styles.founderCopy}>
              <p className={styles.eyebrow}>{founder.eyebrow}</p>
              <h2 id="founder-heading" className={styles.sectionTitle}>
                {founder.heading}
              </h2>
              <p className={styles.founderBody}>{founder.body1}</p>
              <p className={styles.founderBody}>{founder.body2}</p>
              <blockquote className={styles.founderQuote}>
                “{founder.quote}”
              </blockquote>
              <p className={styles.founderName}>{founder.name}</p>
              <p className={styles.founderRole}>{founder.role}</p>
            </div>
          </div>
        </section>

        <section
          className={styles.finalCta}
          aria-labelledby="final-cta-heading"
        >
          <div className={styles.sectionInnerNarrow}>
            <div className={styles.sectionIntro}>
              <h2 id="final-cta-heading" className={styles.finalTitle}>
                {finalCta.title}
              </h2>
              <p className={styles.finalCopy}>
                {finalCta.body}
              </p>
            </div>
            <Link
              href={PRIMARY_HREF}
              className={styles.ctaPrimary}
              data-testid="home-final-cta"
            >
              {finalCta.buttonLabel}
            </Link>
            <p className={styles.privacy} data-testid="home-privacy-note">
              Your information is saved only in this browser on this device. It is
              not synced to a cloud account.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerBrand}>MYReSolve</p>
          <p className={styles.footerDesc}>
            {footer.description}
          </p>
          <p className={styles.footerContact}>
            <Link href="/contact">Contact MYReSolve</Link>
            <span aria-hidden="true"> · </span>
            <a href="mailto:rob.myresolve@gmail.com">rob.myresolve@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

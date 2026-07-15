import Link from "next/link";
import styles from "./LandingPage.module.css";

const PRIMARY_HREF = "/organisation-profile";

const VAR_QUALIFICATION =
  "Estimated Annual Value at Risk is an illustrative modelled estimate. It is not an audited loss calculation or financial forecast.";

export function LandingPage() {
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
            <Link
              href={PRIMARY_HREF}
              className={styles.navCta}
              data-testid="home-header-cta"
            >
              Start your assessment
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-headline">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-testid="home-eyebrow">
              Operational clarity for leaders
            </p>
            <h1 id="hero-headline" className={styles.headline}>
              Less time reporting. More time improving.
            </h1>
            <p className={styles.problem} data-testid="home-problem">
              Leadership needs confidence. But too often, your best people spend
              their time rebuilding updates, packs and slides instead of improving
              delivery.
            </p>
            <p className={styles.support} data-testid="home-support">
              MYReSolve gives leadership one structured view of operational
              health, risk and where attention should go first.
            </p>
            <div className={styles.ctaRow}>
              <Link
                href={PRIMARY_HREF}
                className={styles.ctaPrimary}
                data-testid="home-primary-cta"
              >
                Start your assessment
              </Link>
              <a
                href="#how-it-works"
                className={styles.ctaSecondary}
                data-testid="home-secondary-cta"
              >
                See how it works
              </a>
            </div>
            <p className={styles.heroTag} data-testid="home-hero-tag">
              One shared starting point for a better leadership conversation.
            </p>
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
                Does this feel familiar?
              </h2>
              <p className={styles.sectionLead}>
                For many leaders, the reporting cycle has become work in its own
                right.
              </p>
            </div>
            <div className={styles.observations}>
              <article className={styles.observation}>
                <h3 className={styles.observationTitle}>
                  Different meeting. Same information. Rebuilt again.
                </h3>
                <p className={styles.observationBody}>
                  Teams gather and reformat information from across the business
                  for different audiences.
                </p>
              </article>
              <article className={styles.observation}>
                <h3 className={styles.observationTitle}>
                  The people closest to the work are pulled into explaining it.
                </h3>
                <p className={styles.observationBody}>
                  Time spent preparing confidence packs is time not spent
                  improving performance.
                </p>
              </article>
              <article className={styles.observation}>
                <h3 className={styles.observationTitle}>
                  The report is finished. The first priority is still unclear.
                </h3>
                <p className={styles.observationBody}>
                  More information does not always create a clearer decision.
                </p>
              </article>
            </div>
            <p className={styles.pull} data-testid="home-pull-statement">
              Reporting creates visibility. MYReSolve is designed to create
              clarity.
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
                From reporting activity to operational clarity
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
                <p role="cell">Scattered operational updates</p>
                <p role="cell">One structured executive assessment</p>
              </div>
              <div className={styles.compareRow} role="row">
                <p role="cell">Different views of the same business</p>
                <p role="cell">A shared view of operational health</p>
              </div>
              <div className={styles.compareRow} role="row">
                <p role="cell">A long list of issues</p>
                <p role="cell">The three areas needing attention first</p>
              </div>
              <div className={styles.compareRow} role="row">
                <p role="cell">Financial exposure discussed in isolation</p>
                <p role="cell">
                  An illustrative estimate for comparing potential exposure
                </p>
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
                How it works
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
                      Describe your organisation
                    </Link>
                  </h3>
                  <p className={styles.stepBody}>
                    Give the assessment enough context to understand how your
                    operation works.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <p className={styles.stepNumber}>2</p>
                <div>
                  <h3 className={styles.stepTitle}>
                    Bring leadership knowledge together
                  </h3>
                  <p className={styles.stepBody}>
                    Answer 24 structured questions across six operational areas.
                  </p>
                </div>
              </li>
              <li className={styles.step}>
                <p className={styles.stepNumber}>3</p>
                <div>
                  <h3 className={styles.stepTitle}>See where to focus first</h3>
                  <p className={styles.stepBody}>
                    Get a shared view of operational health, risk, potential
                    exposure and priority areas.
                  </p>
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
                A clearer leadership conversation
              </h2>
              <p className={styles.sectionLead}>
                MYReSolve helps leadership move past “Are we in control?” It opens
                three more useful questions:
              </p>
            </div>
            <div className={styles.questions} data-testid="home-clarity-questions">
              <article className={styles.question}>
                <h3 className={styles.questionTitle}>What is working?</h3>
                <p className={styles.questionBody}>
                  See the overall operational picture and areas of strength.
                </p>
              </article>
              <article className={styles.question}>
                <h3 className={styles.questionTitle}>Where is risk building?</h3>
                <p className={styles.questionBody}>
                  Compare health and exposure across People, Process, Customer,
                  Operations, Technology and Finance.
                </p>
              </article>
              <article className={styles.question}>
                <h3 className={styles.questionTitle}>
                  Where should we focus first?
                </h3>
                <p className={styles.questionBody}>
                  Bring the three highest-risk areas into one shared
                  conversation.
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
          className={styles.finalCta}
          aria-labelledby="final-cta-heading"
        >
          <div className={styles.sectionInnerNarrow}>
            <div className={styles.sectionIntro}>
              <h2 id="final-cta-heading" className={styles.finalTitle}>
                Give your team a clearer place to start.
              </h2>
              <p className={styles.finalCopy}>
                Start with what your leadership team already knows. Turn that
                knowledge into a shared view of health, risk and priority.
              </p>
            </div>
            <Link
              href={PRIMARY_HREF}
              className={styles.ctaPrimary}
              data-testid="home-final-cta"
            >
              Start your assessment
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
            Structured executive assessment for operational health, risk and
            potential value at risk.
          </p>
        </div>
      </footer>
    </div>
  );
}

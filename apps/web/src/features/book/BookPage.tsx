import Image from "next/image";
import Link from "next/link";
import { BOOK_PAGE_CONTENT, BOOK_PURCHASE_URL } from "./bookContent";
import styles from "./BookPage.module.css";

type BuyButtonProps = {
  className: string;
  testId: string;
  label: string;
};

function BuyButton({ className, testId, label }: BuyButtonProps) {
  return (
    <a
      href={BOOK_PURCHASE_URL}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
    >
      {label}
    </a>
  );
}

export function BookPage() {
  const {
    hero,
    purchase,
    problem,
    behaviours,
    audience,
    author,
    finalCta,
    footer,
  } = BOOK_PAGE_CONTENT;

  return (
    <div className={styles.page} data-testid="book-page">
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brandLink}>
            MYReSolve
          </Link>
          <nav className={styles.nav} aria-label="Page">
            <a href="#behaviours" className={styles.navLink}>
              The behaviours
            </a>
            <a href="#audience" className={styles.navLink}>
              Who it is for
            </a>
            <a href="#author" className={styles.navLink}>
              The author
            </a>
            <BuyButton
              className={styles.ctaCompact}
              testId="book-header-cta"
              label={purchase.buttonLabel}
            />
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="book-headline">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-testid="book-eyebrow">
              {hero.eyebrow}
            </p>
            <h1
              id="book-headline"
              className={styles.headline}
              aria-label={hero.headline}
            >
              <span className={styles.headlineLead}>{hero.headlineLead}</span>
              <span
                className={styles.headlineAccent}
                data-testid="book-headline-accent"
              >
                {hero.headlineAccent}
              </span>
            </h1>
            <p className={styles.lead} data-testid="book-lead">
              {hero.lead}
            </p>
            <div className={styles.ctaRow}>
              <BuyButton
                className={styles.ctaPrimary}
                testId="book-hero-cta"
                label={purchase.buttonLabel}
              />
              <p className={styles.price} data-testid="book-price">
                {purchase.price}
              </p>
            </div>
            <p className={styles.priceNote}>{purchase.priceNote}</p>
            <p className={styles.heroTag}>{hero.supportingLine}</p>
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="book-problem-heading"
          data-testid="book-problem"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <h2 id="book-problem-heading" className={styles.sectionTitle}>
                {problem.heading}
              </h2>
              <p className={styles.sectionLead}>{problem.intro}</p>
            </div>
            <p className={styles.sectionBody}>{problem.body}</p>
            <p className={styles.pull}>{problem.pullStatement}</p>
          </div>
        </section>

        <section
          id="behaviours"
          className={`${styles.section} ${styles.sectionContrast}`}
          aria-labelledby="book-behaviours-heading"
          data-testid="book-behaviours"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <h2 id="book-behaviours-heading" className={styles.sectionTitle}>
                {behaviours.heading}
              </h2>
              <p className={styles.sectionLead}>{behaviours.intro}</p>
            </div>
            <ol className={styles.behaviours}>
              {behaviours.items.map((behaviour, index) => (
                <li className={styles.behaviour} key={behaviour.name}>
                  <p className={styles.behaviourNumber}>{index + 1}</p>
                  <div>
                    <h3 className={styles.behaviourTitle}>{behaviour.name}</h3>
                    <p className={styles.behaviourBody}>{behaviour.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="audience"
          className={styles.section}
          aria-labelledby="book-audience-heading"
          data-testid="book-audience"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <h2 id="book-audience-heading" className={styles.sectionTitle}>
                {audience.heading}
              </h2>
              <p className={styles.sectionLead}>{audience.intro}</p>
            </div>
            <div className={styles.audience}>
              {audience.groups.map((group) => (
                <article className={styles.audienceCard} key={group.title}>
                  <h3 className={styles.audienceTitle}>{group.title}</h3>
                  <p className={styles.audienceBody}>{group.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="author"
          className={`${styles.section} ${styles.sectionContrast}`}
          aria-labelledby="book-author-heading"
          data-testid="book-author"
        >
          <div className={styles.authorInner}>
            <div className={styles.authorPortraitWrap}>
              <Image
                src="/images/rob-pierce-founder.png"
                alt="Rob Pierce, founder of MYReSolve"
                width={1024}
                height={1024}
                sizes="(max-width: 640px) 180px, 240px"
                unoptimized
                className={styles.authorPortrait}
              />
            </div>
            <div className={styles.authorCopy}>
              <p className={styles.eyebrow}>{author.eyebrow}</p>
              <h2 id="book-author-heading" className={styles.sectionTitle}>
                {author.heading}
              </h2>
              <p className={styles.authorBody}>{author.body1}</p>
              <p className={styles.authorBody}>{author.body2}</p>
              <p className={styles.authorName}>{author.name}</p>
              <p className={styles.authorRole}>{author.role}</p>
              <p className={styles.authorSignOff} data-testid="book-sign-off">
                {author.signOff}
              </p>
            </div>
          </div>
        </section>

        <section
          className={styles.finalCta}
          aria-labelledby="book-final-cta-heading"
        >
          <div className={styles.sectionInnerNarrow}>
            <div className={styles.sectionIntro}>
              <h2 id="book-final-cta-heading" className={styles.finalTitle}>
                {finalCta.heading}
              </h2>
              <p className={styles.finalCopy}>{finalCta.body}</p>
            </div>
            <BuyButton
              className={styles.ctaPrimary}
              testId="book-final-cta"
              label={purchase.buttonLabel}
            />
            <p className={styles.finalPrice}>
              {purchase.price}
              <span aria-hidden="true"> · </span>
              {purchase.priceNote}
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerBrand}>MYReSolve</p>
          <p className={styles.footerDesc}>{footer.description}</p>
          <p className={styles.footerContact}>
            <Link href="/">Back to home</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/contact">Contact MYReSolve</Link>
            <span aria-hidden="true"> · </span>
            <a href="mailto:hello@myresolve.uk">hello@myresolve.uk</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { BOOK_PAGE_CONTENT, BOOK_PURCHASE_URL } from "./bookContent";
import styles from "./BookPage.module.css";

type BuyButtonProps = {
  className: string;
  testId: string;
  label: string;
};

/**
 * Every buy action goes to the Payhip checkout in a new tab. There is no
 * custom checkout: Payhip handles payment and delivery.
 */
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
    nav,
    hero,
    purchase,
    problem,
    behaviours,
    audience,
    series,
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
              {nav.behaviours}
            </a>
            <a href="#who" className={styles.navLink}>
              {nav.audience}
            </a>
            <a href="#author" className={styles.navLink}>
              {nav.author}
            </a>
            <a
              href="#series"
              className={styles.ctaCompact}
              data-testid="book-header-series"
            >
              {nav.seriesButton}
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className={styles.hero} aria-labelledby="book-headline">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-testid="book-eyebrow">
              {hero.eyebrowBefore}
              <span className={styles.brandName}>{hero.eyebrowBrand}</span>
              {hero.eyebrowAfter}
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
              <a
                href="#series"
                className={styles.ctaGhost}
                data-testid="book-hero-series-link"
              >
                {hero.seriesLinkLabel}
              </a>
            </div>
            <p className={styles.priceNote}>{purchase.priceNote}</p>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.sectionContrast}`}
          aria-labelledby="book-problem-heading"
          data-testid="book-problem"
        >
          <div className={styles.sectionInner}>
            <h2 id="book-problem-heading" className={styles.eyebrowHeading}>
              {problem.eyebrow}
            </h2>
            <blockquote className={styles.quote}>
              “{problem.openingQuote}”
            </blockquote>
            <p className={styles.sectionBody}>{problem.body}</p>
            <blockquote className={styles.quote}>
              “{problem.pullStatement}”
            </blockquote>
          </div>
        </section>

        <section
          id="behaviours"
          className={styles.section}
          aria-labelledby="book-behaviours-heading"
          data-testid="book-behaviours"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>{behaviours.eyebrow}</p>
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
          id="who"
          className={`${styles.section} ${styles.sectionContrast}`}
          aria-labelledby="book-audience-heading"
          data-testid="book-audience"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>{audience.eyebrow}</p>
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
          id="series"
          className={styles.section}
          aria-labelledby="book-series-heading"
          data-testid="book-series"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow} data-testid="book-series-eyebrow">
                {series.eyebrowBefore}
                <span className={styles.brandName}>{series.eyebrowBrand}</span>
                {series.eyebrowAfter}
              </p>
              <h2 id="book-series-heading" className={styles.sectionTitle}>
                {series.heading}
              </h2>
              <p className={styles.sectionLead}>{series.intro}</p>
            </div>
            <ol className={styles.series}>
              {series.items.map((book) => (
                <li
                  className={`${styles.seriesItem} ${book.live ? styles.seriesItemLive : ""}`}
                  key={book.number}
                >
                  <p className={styles.seriesNumber} aria-hidden="true">
                    {book.number}
                  </p>
                  <div>
                    <h3 className={styles.seriesTitle}>
                      {book.live ? (
                        <a
                          href="#top"
                          className={styles.seriesTitleLink}
                          data-testid={`book-series-${book.number}-link`}
                        >
                          {book.title}
                        </a>
                      ) : (
                        book.title
                      )}
                    </h3>
                    <p className={styles.seriesLine}>{book.line}</p>
                  </div>
                  {book.live ? (
                    <BuyButton
                      className={`${styles.tag} ${styles.tagLive}`}
                      testId={`book-series-${book.number}-tag`}
                      label={series.buyTag}
                    />
                  ) : (
                    <p
                      className={styles.tag}
                      data-testid={`book-series-${book.number}-tag`}
                    >
                      {series.comingTag}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="author"
          className={`${styles.section} ${styles.sectionContrast}`}
          aria-labelledby="book-author-heading"
          data-testid="book-author"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>{author.eyebrow}</p>
              <h2 id="book-author-heading" className={styles.sectionTitle}>
                {author.heading}
              </h2>
            </div>
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
                <p className={styles.authorBody}>{author.body1}</p>
                <p className={styles.authorBody}>{author.body2}</p>
                <p className={styles.authorName}>{author.name}</p>
                <p className={styles.authorRole}>{author.role}</p>
                <p className={styles.authorSignOff} data-testid="book-sign-off">
                  {author.signOff}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.finalCta}
          aria-labelledby="book-final-cta-heading"
        >
          <div className={styles.finalInner}>
            <h2 id="book-final-cta-heading" className={styles.finalTitle}>
              {finalCta.heading}
            </h2>
            <p className={styles.finalCopy}>{finalCta.body}</p>
            <div className={styles.finalActions}>
              <BuyButton
                className={styles.ctaPrimaryLight}
                testId="book-final-cta"
                label={finalCta.primaryLabel}
              />
              <Link
                href={finalCta.secondaryHref}
                className={styles.ctaGhostLight}
                data-testid="book-final-assessment"
              >
                {finalCta.secondaryLabel}
              </Link>
            </div>
            <p className={styles.finalPrice}>{purchase.priceNote}</p>
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

import Link from "next/link";
import { BOOK_PAGE_HREF } from "@/src/features/book/bookContent";
import { PLAYBOOK_PAGE_CONTENT, PLAYBOOK_PAGE_HREF } from "./playbookContent";
import styles from "./PlaybookPage.module.css";

export function PlaybookPage() {
  const { hero, lenses, books, finalCta, footer } = PLAYBOOK_PAGE_CONTENT;

  return (
    <div className={styles.page} data-testid="playbook-page">
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brandLink}>
            MYReSolve
          </Link>
          <nav className={styles.nav} aria-label="Page">
            <Link href={BOOK_PAGE_HREF} className={styles.navLink}>
              The book
            </Link>
            <Link
              href={PLAYBOOK_PAGE_HREF}
              className={styles.navLink}
              aria-current="page"
            >
              The playbook
            </Link>
            <Link href="/organisation-profile" className={styles.navLink}>
              Assessment
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="playbook-headline">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-testid="playbook-eyebrow">
              {hero.eyebrowBefore}
              <span className={styles.brandName}>{hero.eyebrowBrand}</span>
              {hero.eyebrowAfter}
            </p>
            <h1
              id="playbook-headline"
              className={styles.headline}
              aria-label={hero.headline}
            >
              {hero.headlineLead}{" "}
              <em
                className={styles.headlineAccent}
                data-testid="playbook-headline-accent"
              >
                {hero.headlineAccent}
              </em>{" "}
              {hero.headlineTrail}
            </h1>
            <p className={styles.lead} data-testid="playbook-lead">
              {hero.lead}
            </p>
            <Link
              href={BOOK_PAGE_HREF}
              className={styles.ctaPrimary}
              data-testid="playbook-hero-cta"
            >
              {hero.ctaLabel}
            </Link>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.sectionContrast}`}
          aria-labelledby="playbook-lenses-heading"
          data-testid="playbook-lenses"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>{lenses.eyebrow}</p>
              <h2 id="playbook-lenses-heading" className={styles.sectionTitle}>
                {lenses.heading}
              </h2>
              <p className={styles.sectionLead}>{lenses.intro}</p>
            </div>
            <div className={styles.lenses}>
              {lenses.items.map((lens) => (
                <article className={styles.lensCard} key={lens.name}>
                  <h3 className={styles.lensTitle}>{lens.name}</h3>
                  <p className={styles.lensBody}>{lens.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="playbook-books-heading"
          data-testid="playbook-books"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>{books.eyebrow}</p>
              <h2 id="playbook-books-heading" className={styles.sectionTitle}>
                {books.heading}
              </h2>
              <p className={styles.sectionLead}>{books.intro}</p>
            </div>
            <ol className={styles.books}>
              {books.items.map((book) => (
                <li className={styles.book} key={book.number}>
                  <p className={styles.bookNumber} aria-hidden="true">
                    {book.number}
                  </p>
                  <div>
                    <h3 className={styles.bookTitle}>
                      {book.href ? (
                        <Link
                          href={book.href}
                          className={styles.bookTitleLink}
                          data-testid={`playbook-book-${book.number}-link`}
                        >
                          {book.title}
                        </Link>
                      ) : (
                        book.title
                      )}
                    </h3>
                    <p className={styles.bookLine}>{book.line}</p>
                  </div>
                  <p
                    className={`${styles.tag} ${book.href ? styles.tagLive : ""}`}
                    data-testid={`playbook-book-${book.number}-tag`}
                  >
                    {book.href ? books.outNowTag : books.comingTag}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className={styles.finalCta}
          aria-labelledby="playbook-final-cta-heading"
        >
          <div className={styles.finalInner}>
            <h2 id="playbook-final-cta-heading" className={styles.finalTitle}>
              {finalCta.heading}
            </h2>
            <p className={styles.finalCopy}>{finalCta.body}</p>
            <div className={styles.finalActions}>
              <Link
                href={finalCta.primaryHref}
                className={styles.ctaPrimary}
                data-testid="playbook-final-cta"
              >
                {finalCta.primaryLabel}
              </Link>
              <Link
                href={finalCta.secondaryHref}
                className={styles.ctaSecondary}
                data-testid="playbook-final-assessment"
              >
                {finalCta.secondaryLabel}
              </Link>
            </div>
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

import Link from "next/link";
import { KpisForm } from "./KpisForm";
import { KPIS_API_URL, KPIS_PAGE_CONTENT } from "./kpisContent";
import styles from "./KpisPage.module.css";

/**
 * /kpis: the same header, hero, section and footer shapes as /book, with a
 * short form in place of the buy buttons. No prices anywhere on the page.
 */
export function KpisPage() {
  const { nav, hero, inside, form, links, footer } = KPIS_PAGE_CONTENT;

  return (
    <div className={styles.page} data-testid="kpis-page">
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brandLink}>
            MYReSolve
          </Link>
          <nav className={styles.nav} aria-label="Page">
            <a href="#inside" className={styles.navLink}>
              {nav.inside}
            </a>
            <Link href="/book" className={styles.navLink}>
              {nav.playbook}
            </Link>
            <Link href="/organisation-profile" className={styles.navLink}>
              {nav.assessment}
            </Link>
            <a
              href="#request"
              className={styles.ctaCompact}
              data-testid="kpis-header-request"
            >
              {nav.requestButton}
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className={styles.hero} aria-labelledby="kpis-headline">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-testid="kpis-eyebrow">
              <span className={styles.brandName}>{hero.eyebrowBrand}</span>
              {hero.eyebrowAfter}
            </p>
            <h1
              id="kpis-headline"
              className={styles.headline}
              aria-label={hero.headline}
            >
              <span className={styles.headlineLead}>{hero.headlineLead}</span>
              <span
                className={styles.headlineAccent}
                data-testid="kpis-headline-accent"
              >
                {hero.headlineAccent}
              </span>
            </h1>
            <p className={styles.lead} data-testid="kpis-lead">
              {hero.lead}
            </p>
          </div>
        </section>

        <section
          id="inside"
          className={`${styles.section} ${styles.sectionContrast}`}
          aria-labelledby="kpis-inside-heading"
          data-testid="kpis-inside"
        >
          <div className={styles.sectionInner}>
            <p className={styles.sectionBody} data-testid="kpis-body">
              {inside.body}
            </p>
            <h2 id="kpis-inside-heading" className={styles.sectionTitle}>
              {inside.heading}
            </h2>
            <ul className={styles.insideList}>
              {inside.items.map((item) => (
                <li className={styles.insideItem} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="request"
          className={styles.section}
          aria-labelledby="kpis-form-heading"
          data-testid="kpis-request"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <h2 id="kpis-form-heading" className={styles.sectionTitle}>
                {form.heading}
              </h2>
            </div>
            <KpisForm apiUrl={KPIS_API_URL} />
            <div className={styles.links} data-testid="kpis-links">
              {links.map((link) => (
                <Link
                  href={link.href}
                  className={styles.ctaGhost}
                  data-testid={link.testId}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
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

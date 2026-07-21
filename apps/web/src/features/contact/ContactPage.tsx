import Image from "next/image";
import Link from "next/link";
import styles from "./ContactPage.module.css";

const CONTACT_EMAIL = "rob.myresolve@gmail.com";

const ENQUIRIES = [
  {
    title: "Discuss my company results",
    body: "Talk through what your assessment is showing and where attention may be needed first.",
  },
  {
    title: "Explore consultancy support",
    body: "Discuss practical help to turn your priorities into measurable improvement.",
  },
  {
    title: "Ask about the MYReSolve platform",
    body: "Register your interest in future subscription access and ongoing performance tracking.",
  },
] as const;

export function ContactPage() {
  return (
    <div className={styles.page} data-testid="contact-page">
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brandLink}>
            MYReSolve
          </Link>
          <Link href="/" className={styles.backLink}>
            Back to home
          </Link>
        </div>
      </header>

      <main id="main-content" className={styles.main}>
        <section className={styles.intro} aria-labelledby="contact-heading">
          <div className={styles.portraitWrap}>
            <Image
              src="/images/rob-pierce-founder.png"
              alt="Rob Pierce, founder of MYReSolve"
              width={1024}
              height={1024}
              sizes="(max-width: 640px) 150px, 190px"
              className={styles.portrait}
              priority
            />
          </div>
          <div>
            <p className={styles.eyebrow}>Contact MYReSolve</p>
            <h1 id="contact-heading" className={styles.title}>
              Start a clearer conversation.
            </h1>
            <p className={styles.lead}>
              Whether you want to understand your assessment results, explore
              expert support or discuss the future MYReSolve platform, contact
              Rob directly.
            </p>
            <p className={styles.founder}>Rob Pierce, Founder of MYReSolve</p>
          </div>
        </section>

        <section className={styles.enquiries} aria-labelledby="enquiry-heading">
          <h2 id="enquiry-heading" className={styles.sectionTitle}>
            What would you like to discuss?
          </h2>
          <div className={styles.cardGrid}>
            {ENQUIRIES.map((enquiry) => (
              <article className={styles.card} key={enquiry.title}>
                <h3>{enquiry.title}</h3>
                <p>{enquiry.body}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className={styles.contactBox} aria-label="Contact details">
          <p className={styles.contactLabel}>Email</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.address}>
            {CONTACT_EMAIL}
          </a>
          <p className={styles.securityNote}>
            Please do not include confidential company, financial or assessment
            information in your first email. We can agree a secure way to share
            information if it is needed.
          </p>
        </aside>
      </main>

      <footer className={styles.footer}>
        <p>MYReSolve gives leaders the clarity to make better decisions.</p>
      </footer>

      <a
        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("MYReSolve enquiry")}`}
        className={styles.stickyEmail}
      >
        Email Rob
      </a>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import styles from "./ContactPage.module.css";

const CONTACT_EMAIL = "rob.myresolve@gmail.com";

const ENQUIRIES = [
  {
    title: "Get Clarity on Your Results",
    body: "Let’s review your assessment together and identify where your focus will have the greatest impact.",
  },
  {
    title: "Discover Tailored Consultancy Support",
    body: "Explore practical ways to turn your priorities into measurable improvements, with expert guidance every step of the way.",
  },
  {
    title: "Learn More About the MYReSolve Platform",
    body: "Register your interest for future subscription access and ongoing performance tracking; be the first to know when new features launch.",
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
              Let’s Connect: Start a Clearer Conversation
            </h1>
            <p className={styles.lead}>
              Have questions about your assessment results, want expert
              support, or are curious about the future MYReSolve platform?
              Reach out to Rob directly; he’s here to help you move forward.
            </p>
            <p className={styles.founder}>
              <strong>Rob Pierce</strong>
              <br />
              Founder, MYReSolve
            </p>
          </div>
        </section>

        <section className={styles.enquiries} aria-labelledby="enquiry-heading">
          <h2 id="enquiry-heading" className={styles.sectionTitle}>
            How can we help you move forward?
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
          <p className={styles.contactLabel}>Email:</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.address}>
            {CONTACT_EMAIL}
          </a>
          <p className={styles.securityNote}>
            Please don’t include confidential company, financial, or assessment
            information in your first message. If needed, we’ll arrange a
            secure way to share sensitive details.
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

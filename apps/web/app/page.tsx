import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.message}>
        MYReSolve Platform v1.0 migration environment
      </p>
      <p className={styles.linkWrap}>
        <Link
          href="/organisation-profile"
          className={styles.link}
          data-testid="home-organisation-profile"
        >
          Organisation Profile
        </Link>
      </p>
      <p className={styles.linkWrap}>
        <Link href="/assessment" className={styles.link} data-testid="home-assessment">
          Start assessment
        </Link>
      </p>
      <p className={styles.linkWrap}>
        <Link href="/dashboard" className={styles.link} data-testid="home-dashboard">
          Open executive dashboard
        </Link>
      </p>
    </main>
  );
}

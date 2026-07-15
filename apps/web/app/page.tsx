import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.message}>
        MYReSolve Platform v1.0 migration environment
      </p>
      <p className={styles.linkWrap}>
        <Link href="/assessment" className={styles.link}>
          Start assessment
        </Link>
      </p>
      <p className={styles.linkWrap}>
        <Link href="/dashboard" className={styles.link}>
          Open executive dashboard
        </Link>
      </p>
    </main>
  );
}

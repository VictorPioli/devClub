import styles from "./Nav.module.css";

export function Nav() {
  return (
    <header className={styles.nav}>
      <a href="#" className={styles.mark} data-cursor-hover>
        DEVCLUB<span className={styles.markDot}>.</span>
      </a>
      <span className={`${styles.status} mono`}>
        FULL&nbsp;STACK&nbsp;TRACK — OPEN
      </span>
      <a href="#become" className={styles.cta} data-cursor-hover>
        Apply
      </a>
    </header>
  );
}

import styles from "./Nav.module.css";

export function Nav() {
  return (
    <header className={styles.nav}>
      <a href="#" className={styles.mark}>
        DEVCLUB<span className={styles.markDot}>.</span>
      </a>
      <a href="#become" className={styles.cta}>
        Apply
      </a>
    </header>
  );
}

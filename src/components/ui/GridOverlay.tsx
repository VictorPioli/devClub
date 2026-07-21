import styles from "./GridOverlay.module.css";

/**
 * Purely structural: faint vertical hairlines and corner coordinates,
 * evoking an editor's ruler rather than a decorative pattern. Signals
 * "this was built with precision" without saying so.
 */
export function GridOverlay() {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.columns}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={styles.column} />
        ))}
      </div>
      <span className={`${styles.corner} ${styles.tl} mono`}>N 40.0</span>
      <span className={`${styles.corner} ${styles.br} mono`}>DEVCLUB.SYS</span>
    </div>
  );
}

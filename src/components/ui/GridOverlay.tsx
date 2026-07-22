import styles from "./GridOverlay.module.css";

/**
 * Purely structural: corner coordinates, evoking an editor's ruler
 * rather than a decorative pattern. Signals "this was built with
 * precision" without saying so.
 */
export function GridOverlay() {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <span className={`${styles.corner} ${styles.br} mono`}>DEVCLUB.SYS</span>
    </div>
  );
}

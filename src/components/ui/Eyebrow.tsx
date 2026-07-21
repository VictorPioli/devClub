import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  index: string;
  label: string;
}

export function Eyebrow({ index, label }: EyebrowProps) {
  return (
    <span className={`${styles.eyebrow} mono`}>
      <span className={styles.index}>{index}</span>
      <span className={styles.divider} aria-hidden="true" />
      {label}
    </span>
  );
}

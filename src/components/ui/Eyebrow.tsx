import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  label: string;
}

export function Eyebrow({ label }: EyebrowProps) {
  return <span className={`${styles.eyebrow} mono`}>{label}</span>;
}

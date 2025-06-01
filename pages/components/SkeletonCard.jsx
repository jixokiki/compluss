import styles from "../styles/SkeletonCard.module.scss";

export default function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.imagePlaceholder}></div>
      <div className={styles.lineMedium}></div>
      <div className={styles.lineShort}></div>
      <div className={styles.lineLong}></div>
    </div>
  );
}

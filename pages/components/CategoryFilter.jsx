"use client";
import styles from "../styles/CategoryFilter.module.scss";

const categories = ["Semua", "CCTV", "Panel", "Makanan", "Kesehatan", "Bayi"];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className={styles.categoryFilter}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${selected === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

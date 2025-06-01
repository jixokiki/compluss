"use client";
import styles from "../styles/FloatingChat.module.scss";

export default function FloatingChat() {
  return (
    <a
      href="https://wa.me/6281234567890"
      target="_blank"
      className={styles.chatButton}
    >
      💬 Chat Admin
    </a>
  );
}

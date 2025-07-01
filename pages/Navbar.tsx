// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Compluss</Link>
      </div>

      <div className={styles.rightControls}>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      </div>

      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
        <Link href="/">Beranda</Link>
        <Link href="/#produk">Produk</Link>
        <Link href="/tentang">Tentang Kami</Link>
        <Link href="/bookingnavbar">Booking</Link>
        <Link href="/kontak">Kontak</Link>
      </nav>
    </header>
  );
}

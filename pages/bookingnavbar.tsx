// import BookingWizard from "./components/SmeetBooking";

// export default function BookingNavbarPage() {
//   return (
//     <main style={{ padding: "2rem" }}>
//       <h2>Agendakan Bersama Compluss</h2>
//       <BookingWizard />
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import BookingWizard from "./components/SmeetBooking";
import styles from "./BookingNavbar.module.scss";
import Head from "next/head";


export default function BookingNavbarPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <Head>
  <title>Booking Konsultasi | PT. Complus Sistem Solusi</title>
  <meta name="description" content="Jadwalkan konsultasi Anda bersama PT. Complus Sistem Solusi. Solusi perangkat TIK terbaik untuk sekolah dan institusi pemerintah." />

  {/* OG Meta */}
  <meta property="og:title" content="Booking Konsultasi | PT. Complus Sistem Solusi" />
  <meta property="og:description" content="Segera jadwalkan diskusi atau demo produk Compluss. Partner resmi ACER, ZYREX, LENOVO, dan lainnya." />
  <meta property="og:image" content="https://www.compluscss.com/logo4.png" />
  <meta property="og:url" content="https://www.compluscss.com/bookingnavbar" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</Head>

      <header className={styles.header}>
        {/* <div className={styles.logo}>
          <Link href="/">Compluss</Link>
        </div> */}
        <div className={styles.logoContainer}>
                    <Link href="/">  <img src="/logo4.png" alt="Compluss Logo" className={styles.logoImage} /></Link>
  {/* <h1>Compluss</h1> */}
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

        <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
          <Link href="/">Beranda</Link>
          <Link href="/#produk">Produk</Link>
          <Link href="/TentangKami">Tentang Kami</Link>
          <Link href="/bookingnavbar">Booking</Link>
          <Link href="/kontak">Kontak</Link>
        </nav>
      </header>

      {/* 🎁 Bonus Fancy Feature: Blur Overlay */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <main className={styles.main}>
        <h2 className={styles.title}>✨ Agendakan Bersama Compluss ✨</h2>
        <BookingWizard />
      </main>
    </>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./headerNavbar.module.scss";
import FloatingChat from "./components/FloatingChat";
import BannerSlider from "./components/BannerSlider";
import SkeletonCard from "./components/SkeletonCard";
import CategoryFilter from "./components/CategoryFilter";
import KatalogScroll from "./components/KatalogScroll";
import BannerInformative from "./components/BannerInformative";
import SmeetBooking from "./components/SmeetBooking";
import Head from "next/head"; // tambahkan di atas kalau belum ada

export default function HEADERNAVBAR() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect(() => {
  //   const fetchProduk = async () => {
  //     const snapshot = await getDocs(collection(db, "produk"));
  //     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setProduk(data);
  //     setLoading(false);
  //   };
  //   fetchProduk();
  // }, []);

  // const produkTampil =
  //   selectedKategori === "Semua"
  //     ? produk
  //     : produk.filter((item) => item.kategori === selectedKategori);

  return (
    <div className={styles.container}>
      {/* SEO Head (diletakkan di dalam return atau sebelum div utama) */}
      <Head>
        <title>PT. Complus Sistem Solusi | Solusi TIK Terintegrasi</title>
        <meta
          name="description"
          content="Tingkatkan kualitas pendidikan dan operasional sekolah Anda dengan solusi perangkat TIK dari PT. Complus Sistem Solusi, partner resmi ACER, ZYREX, Lenovo, dan lainnya."
        />
        <meta
          property="og:title"
          content="PT. Complus Sistem Solusi | Solusi TIK Terintegrasi untuk Sekolah & Pemerintah"
        />
        <meta
          property="og:description"
          content="Upgrade sekolah Anda dengan perangkat digital terbaik dari partner resmi ACER, ZYREX, Lenovo, dan lainnya. Smart Classroom, Meubeler, hingga Sistem Keamanan."
        />
        <meta property="og:image" content="https://www.compluscss.com/wmk-logo.jpeg" />
        <meta property="og:url" content="https://www.compluscss.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src="/wmk-logo.jpeg" alt="Compluss Logo" className={styles.logoImage} />
          {/* <h1>Compluss</h1> */}
        </div>

        {/* <div
          className={styles.keranjangBelanja}
          onClick={async () => {
            const { db } = await import("../lib/firebase");
            const { collection, getDocs } = await import("firebase/firestore");
            const snapshot = await getDocs(collection(db, "keranjang"));
            const items = snapshot.docs.map((doc) => doc.data());
            const sidebar = document.createElement("div");
            sidebar.className = styles.cartSidebar;
            sidebar.innerHTML = `
                <div class="${styles.cartHeader}">🛒 Keranjang Anda</div>
                <ul class="${styles.cartList}">
                  ${items
                    .map(
                      (i) => `
                    <li>
                      <img src="${i.gambarUrl}" alt="${i.nama}"/>
                      <div>
                        <strong>${i.nama}</strong><br/>Rp ${i.harga.toLocaleString("id-ID")}
                      </div>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
                <button class="${styles.closeCart}">Tutup</button>
              `;
            document.body.appendChild(sidebar);
            document
              .querySelector(`.${styles.closeCart}`)
              ?.addEventListener("click", () => {
                sidebar.classList.add(styles.slideDown);
                setTimeout(() => sidebar.remove(), 400);
              });
          }}
        >
          🛒
        </div> */}

        <div className={styles.rightControls}>
          <div
            // className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}
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
          <Link href="/ProdukPage">Produk</Link>
          <Link href="/TentangKami">Tentang Kami</Link>
          <Link href="/bookingnavbar">Booking</Link>
          <Link href="/kontak">Kontak</Link>
        </nav>
      </header>

      <main className={styles.container}>
        <section className={styles.hero}>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tentang PT. WAE MANDIRI KARYA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Partner Teknologi Informasi Andal & Profesional Sejak 1999
          </motion.p>
        </section>

        <section className={styles.content}>
          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2>Identitas Brand</h2>
            <ul>
              <li><strong>Nama Brand:</strong> PT. Complus Sistem Solusi</li>
              <li><strong>Tahun Berdiri:</strong> 1999</li>
              <li><strong>Lokasi:</strong> Jakarta</li>
              <li><strong>Bidang:</strong> Teknologi Informasi & Penyedia Peralatan IT</li>
              <li><strong>Partner:</strong> ACER, ZYREX, AXIOO, LENOVO, HP, EPSON, dll.</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2>Citra & Nilai Brand</h2>
            <p>
              Kami dikenal sebagai mitra yang <strong>andal</strong>, <strong>berpengalaman</strong>,
              dan mengutamakan <strong>kepercayaan, kualitas, komitmen, serta hubungan jangka panjang</strong>.
            </p>
          </motion.div>

          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2>Profil Perusahaan</h2>
            <p>
              PT. Complus Sistem Solusi (CSS) adalah perusahaan teknologi informasi yang berdiri sejak tahun 1999 di Jakarta. Kami dipercaya dan didukung oleh berbagai distributor dan pabrikan terkemuka seperti MAGIC, ACER, ZYREX, LENOVO, HP, EPSON, SAMSUNG, DELL, SONY, Microsoft, dan Google.
            </p>
            <p>
              Dengan komitmen terhadap profesionalisme, CSS telah meraih berbagai penghargaan bergengsi dan terus berkembang menjadi mitra terpercaya di bidang teknologi informasi di Indonesia.
            </p>
          </motion.div>

          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2>Misi & Strategi</h2>
            <p>
              Kami berkomitmen mendukung klien dengan solusi bisnis yang mampu meningkatkan performa dan profitabilitas melalui pemanfaatan teknologi terkini. Strategi kami menggabungkan pengetahuan mendalam, nilai kerja stabil, serta proses adaptasi teknologi berkelanjutan demi Indonesia menghadapi Revolusi Industri 4.0.
            </p>
          </motion.div>

          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h2>Penghargaan</h2>
            <ul>
              <li>🏆 ACER Elite Partner – Outstanding Achievement 2024</li>
              <li>🏆 Samsung Best Growth Partner – Smart Signage 2021</li>
              <li>🏆 ACER Best Revenue – Server 2020</li>
              <li>🏆 Samsung Best Contribution Partner – Government Sector</li>
              <li>🏆 ACER Partner of The Year 2023</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h2>Jangkauan Cabang</h2>
            <p>
              CSS memiliki kantor cabang di berbagai kota besar seperti Banda Aceh, Medan, Jambi, Bengkulu, Bandar Lampung, Surabaya, Pontianak, dan Makassar, serta terus memperluas jaringan di seluruh Indonesia.
            </p>
          </motion.div>

          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <h2>Project Pemerintah</h2>
            <p>
              Sejak 2021, CSS menjadi penyedia resmi peralatan elektronik di e-Katalog LKPP. Beberapa pencapaian:
            </p>
            <ul>
              <li>📘 2019: Distribusi 70.000+ perangkat ke 12.000 sekolah</li>
              <li>💻 2021: 1.875 laptop ke 125 SMP</li>
              <li>🎓 2023 & 2024: Modernisasi teknologi di 100+ Perguruan Tinggi</li>
              <li>📚 2022: 3.639 Chromebook untuk pendidikan khusus</li>
            </ul>
          </motion.div>

          {/* NEW: Vision & Mission + Services (diinginkan user) */}
          <motion.section
            className={styles.visionMission}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <div className={styles.gridRow}>
              <div className={styles.card}>
                <h3>Vision</h3>
                <p>
                  To be a trusted and innovative partner in the manufacturing industry, providing value-added solutions for our customers.
                </p>
              </div>

              <div className={styles.card}>
                <h3>Mission</h3>
                <ul>
                  <li>Deliver high quality manufacturing products and services.</li>
                  <li>Build long term relationships with partners and customers based on trust and integrity.</li>
                  <li>Enhance efficiency and innovation in every aspect of our business.</li>
                  <li>Develop competent and professional human resources.</li>
                </ul>
              </div>
            </div>

            <div className={styles.budgetBanner}>
              <h4>UI/UX Concept — Budget: Rp 100.000.000</h4>
              <p>
                Desain UI/UX "kece": modern grid, micro-interactions (hover, focus), typography kuat (heading besar), warna utama kontras, dan layout responsif. Termasuk prototyping (Figma), handoff assets, dan style guide sederhana.
              </p>
            </div>
          </motion.section>

          <motion.section
            className={styles.servicesSection}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <h2>Our Services</h2>

            <div className={styles.servicesGrid}>
              <article className={styles.serviceCard}>
                <h4>General Supplier</h4>
                <p>
                  General Supplier provides efficient and reliable procurement for a wide range of goods. We source high-quality products from office essentials to specialized materials, leveraging our extensive network. We ensure a seamless supply chain, letting you focus on your core business while we handle your diverse procurement needs with professionalism.
                </p>
              </article>

              <article className={styles.serviceCard}>
                <h4>Maintenance and Repair</h4>
                <p>
                  Checking the machines for maintenance and product repair — preventive and corrective services to keep operations running smoothly.
                </p>
              </article>

              <article className={styles.serviceCard}>
                <h4>Rack / Tray Cable</h4>
                <p>
                  Manufacture of frames for racks or cable trays, and installation on site — from design to full implementation.
                </p>
              </article>

              <article className={styles.serviceCard}>
                <h4>Pipe, Fabrication and Installation</h4>
                <p>
                  Manufacture of modified products. Manufacturing/assembling, dismantling and installing pipes. Manufacturing/assembling, dismantling and installation of pipe and tank insulation. Provision of labor (welder, fitter and pipe insulation team), etc.
                </p>
              </article>

              <article className={styles.serviceCard}>
                <h4>Maintenance and Repair (Industrial)</h4>
                <p>
                  Comprehensive industrial maintenance: scheduled checks, spare parts management, and on-site technicians to reduce downtime.
                </p>
              </article>
            </div>
          </motion.section>

        </section>
      </main>


      {/* CTA */}
      <section className={styles.cta}>
        <h3>Butuh Bantuan atau Penawaran Khusus?</h3>
        <SmeetBooking />
        <a href="https://wa.me/6285817298071" target="_blank">
          Konsultasi Sekarang
        </a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} PT. Compluss Indonesia. All rights
        reserved.
      </footer>

      {/* Floating Chat Button */}
      <FloatingChat />


    </div>
  );
}

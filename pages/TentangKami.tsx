// "use client";

// import styles from "./TentangKami.module.scss";
// import Image from "next/image";
// import { motion } from "framer-motion";


// export default function TentangKami() {
//   return (
//     <main className={styles.container}>
    
//       <section className={styles.hero}>
//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           Tentang PT. Complus Sistem Solusi
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           Partner Teknologi Informasi Andal & Profesional Sejak 1999
//         </motion.p>
//       </section>

//       <section className={styles.content}>
//         <motion.div
//           className={styles.infoBox}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           <h2>Identitas Brand</h2>
//           <ul>
//             <li><strong>Nama Brand:</strong> PT. Complus Sistem Solusi</li>
//             <li><strong>Tahun Berdiri:</strong> 1999</li>
//             <li><strong>Lokasi:</strong> Jakarta</li>
//             <li><strong>Bidang:</strong> Teknologi Informasi & Penyedia Peralatan IT</li>
//             <li><strong>Partner:</strong> ACER, ZYREX, AXIOO, LENOVO, HP, EPSON, dll.</li>
//           </ul>
//         </motion.div>

//         <motion.div
//           className={styles.infoBox}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           <h2>Citra & Nilai Brand</h2>
//           <p>
//             Kami dikenal sebagai mitra yang <strong>andal</strong>, <strong>berpengalaman</strong>,
//             dan mengutamakan <strong>kepercayaan, kualitas, komitmen, serta hubungan jangka panjang</strong>.
//           </p>
//         </motion.div>

//         <motion.div
//           className={styles.infoBox}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7 }}
//         >
//           <h2>Voice & Tone</h2>
//           <ul>
//             <li>✔ Formal Professional</li>
//             <li>✔ Smart Friendly</li>
//             <li>✔ Solutif</li>
//           </ul>
//         </motion.div>

//         <motion.div
//           className={styles.infoBox}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//         >
//           <h2>Warna & Tipografi</h2>
//           <div className={styles.colorRow}>
//             <div className={styles.color} style={{ backgroundColor: "#F7941D" }} />
//             <div className={styles.color} style={{ backgroundColor: "#FD8913" }} />
//             <div className={styles.color} style={{ backgroundColor: "#000000" }} />
//             <div className={styles.color} style={{ backgroundColor: "#CCCCCC" }} />
//           </div>
//           <p>Font: <strong>Montserrat Classic</strong> & <strong>Open Sans</strong></p>
//         </motion.div>
//       </section>
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./TentangKami.module.scss";

export default function TentangKami() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        {/* <div className={styles.logo}>
          <Link href="/">Compluss</Link>
        </div> */}
        <div className={styles.logoContainer}>
  {/* <h1>Compluss</h1> */}
  <Link href="/"><img src="/logo4.png" alt="Compluss Logo" className={styles.logoImage} /></Link>
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
          <Link href="/tentang">Tentang Kami</Link>
          <Link href="/bookingnavbar">Booking</Link>
          <Link href="/kontak">Kontak</Link>
        </nav>
      </header>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>
      )}

      <main className={styles.container}>
        <section className={styles.hero}>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tentang PT. Complus Sistem Solusi
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

          {/* <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2>Voice & Tone</h2>
            <ul>
              <li>✔ Formal Professional</li>
              <li>✔ Smart Friendly</li>
              <li>✔ Solutif</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2>Warna & Tipografi</h2>
            <div className={styles.colorRow}>
              <div className={styles.color} style={{ backgroundColor: "#F7941D" }} />
              <div className={styles.color} style={{ backgroundColor: "#FD8913" }} />
              <div className={styles.color} style={{ backgroundColor: "#000000" }} />
              <div className={styles.color} style={{ backgroundColor: "#CCCCCC" }} />
            </div>
            <p>Font: <strong>Montserrat Classic</strong> & <strong>Open Sans</strong></p>
          </motion.div> */}
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
        </section>
      </main>
    </>
  );
}

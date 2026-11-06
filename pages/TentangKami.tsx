"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./TentangKami.module.scss";
import Head from "next/head";

import { useEffect } from "react";
function CartButton() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<{ id: string; [key: string]: any }[] | null>(null); // null = not loaded yet
  const [loading, setLoading] = useState(false);

  // function to open and lazy-load data
  const openCart = async () => {
    setCartOpen(true);
    if (items === null) {
      setLoading(true);
      try {
        const { db } = await import("../lib/firebase");
        const { collection, getDocs } = await import("firebase/firestore");
        const snapshot = await getDocs(collection(db, "keranjang"));
        const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(fetched);
      } catch (err) {
        console.error("Gagal load keranjang", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
  };

  // close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCartOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* <div
        className={styles.keranjangBelanja}
        onClick={openCart}
        style={{ cursor: "pointer" }}
        aria-label="Buka keranjang"
        title="Buka keranjang"
      >
        🛒
      </div>
      {cartOpen && (
        <div className={styles.cartSidebar}>
          <div className={styles.cartHeader}>🛒 Keranjang Anda</div>
          {loading ? (
            <div style={{ padding: 16 }}>Loading...</div>
          ) : (
            <ul className={styles.cartList}>
              {items && items.length > 0 ? (
                items.map((i) => (
                  <li key={i.id}>
                    <img src={i.gambarUrl} alt={i.nama} style={{ width: 40, height: 40, objectFit: "cover" }} />
                    <div>
                      <strong>{i.nama}</strong>
                      <br />
                      Rp {i.harga?.toLocaleString("id-ID")}
                    </div>
                  </li>
                ))
              ) : (
                <li style={{ padding: 16 }}>Keranjang kosong.</li>
              )}
            </ul>
          )}
          <button
            className={styles.closeCart}
            onClick={() => setCartOpen(false)}
            style={{ margin: 12, padding: "8px 16px", borderRadius: 8 }}
          >
            Tutup
          </button>
        </div>
      )} */}
      {/* <button className={styles.keranjangBelanja} onClick={openCart} aria-label="Buka Keranjang">
        🛒
      </button> */}

      {/* overlay */}
      {cartOpen && <div className={styles.cartOverlay} onClick={() => setCartOpen(false)} />}

      {/* sidebar */}
      <aside className={`${styles.cartSidebar} ${cartOpen ? styles.openSidebar : ""}`} role="dialog" aria-modal="true">
        <div className={styles.cartHeader}>
          <strong>Keranjang Anda</strong>
          <button className={styles.closeCartBtn} onClick={() => setCartOpen(false)}>Tutup</button>
        </div>

        <div className={styles.cartContent}>
          {loading && <div>Memuat...</div>}
          {!loading && (!items || items.length === 0) && <div>Keranjang kosong.</div>}

          {!loading && items && items.length > 0 && (
            <ul className={styles.cartList}>
              {items.map((i) => (
                <li key={i.id} className={styles.cartItem}>
                  <img src={i.gambarUrl || "/placeholder.png"} alt={i.nama} />
                  <div>
                    <div className={styles.cartItemName}>{i.nama}</div>
                    <div className={styles.cartItemPrice}>Rp {Number(i.harga || 0).toLocaleString("id-ID")}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.cartFooter}>
          <button className={styles.closeCartBtnPrimary} onClick={() => setCartOpen(false)}>
            Tutup
          </button>
        </div>
      </aside>
    </>
  );
}

export default function TentangKami() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Tentang Kami | PT. Wae Mandiri Karya</title>
        <meta
          name="description"
          content="Kenali lebih dekat PT. Wae Mandiri Karya – perusahaan General Supplier, Machinery dan Building Maintenance."
        />
        <meta property="og:title" content="Tentang Kami | PT. Wae Mandiri Karya" />
        <meta
          property="og:description"
          content="Partner TIK terpercaya di Indonesia sejak 2021. Dukungan untuk General Supplier, Machinery dan Building Maintenance."
        />
        <meta property="og:image" content="https://www.compluscss.com/logo4.png" />
        <meta property="og:url" content="https://www.compluscss.com/TentangKami" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/logo4.png" alt="Compluss Logo" className={styles.logoImage} />
          </Link>
        </div>

        <div className={styles.rightControls}>
          <div
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            role="button"
            aria-label="Toggle menu"
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
      </header> */}

      {/* <header className={styles.header}>
  <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/wmk-logo.jpeg" alt="Compluss Logo" className={styles.logoImage} />
          </Link>
        </div>

  <div className={styles.navCenter}>
    <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
      <Link href="/">Beranda</Link>
      <Link href="/#produk">Produk</Link>
      <Link href="/tentang">Tentang Kami</Link>
      <Link href="/bookingnavbar">Booking</Link>
      <Link href="/kontak">Kontak</Link>
    </nav>
  </div>

  <div className={styles.rightControls}>
    <div className={styles.keranjangBelanja}onClick={async () => {
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
              }}>🛒</div>
    <div className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  </div>
</header> */}

<header className={styles.header}>
  <div className={styles.logoContainer}>
    <Link href="/">
      <img src="/wmk-logo.jpeg" alt="Compluss Logo" className={styles.logoImage} />
    </Link>
  </div>

  <div className={styles.navCenter}>
    <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
      <Link href="/">Beranda</Link>
      <Link href="/ProdukPage">Produk</Link>
      <Link href="/TentangKami">Tentang Kami</Link>
      <Link href="/bookingnavbar">Booking</Link>
      <Link href="/kontak">Kontak</Link>
    </nav>
  </div>

  <div className={styles.rightControls}>
    {/* Keranjang — sekarang dikontrol oleh React */}
    <CartButton />
    <div
      className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle menu"
    >
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  </div>
</header>





      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

      <main className={styles.container}>
        {/* HERO / About header */}
        <section className={styles.hero}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tentang PT. Wae Mandiri Karya
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Solusi general supplier, mekanikal elektrikal mesin dan perawatan gedung sejak 2021.
          </motion.p>
        </section>

        {/* MAIN CONTENT */}
        <section id='tentangkami' className={styles.content}>
          {/* LEFT COLUMN — main sections */}
          <div>
            {/* Short About / Summary (mirip "About Us" tagline + mission short) */}
            <motion.div
              className={styles.infoBox}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>Tentang Kami</h2>
              <p>
PT. WAE MANDIRI KARYA, berdiri sebagai sebuah perusahan dengan fokus di bidang general supplier, mekanikal elektrikal mesin dan perawatan gedung. Perusahaan kami menawarkan kerja sama dengan berbagai perusahaan nasional maupun instansi pemerintah pada berbagai bentuk pekerjaan sesuai bidang keahlian perusahaan kami.
              </p>
            </motion.div>

            {/* Certifications / Partners */}
            <motion.div
              className={styles.infoBox}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <h2>Certifications & Partners</h2>
              <p style={{ marginBottom: 12 }}>
                Resmi bermitra dan bersertifikat dari beberapa vendor besar — bukti kapabilitas distribusi & layanan.
              </p>

              {/* simple horizontal logos (gunakan gambar asli jika tersedia) */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                {/* <img src="/partners/acer.png" alt="Acer" style={{ height: 36, objectFit: "contain" }} /> */}
                <img src="/banners/partner.png" alt="Acer" style={{ height: 336, objectFit: "contain" }} />
                {/* <img src="/partners/lenovo.png" alt="Lenovo" style={{ height: 36, objectFit: "contain" }} />
                <img src="/partners/samsung.png" alt="Samsung" style={{ height: 36, objectFit: "contain" }} />
                <img src="/partners/hp.png" alt="HP" style={{ height: 36, objectFit: "contain" }} />
                <img src="/partners/epson.png" alt="Epson" style={{ height: 36, objectFit: "contain" }} /> */}
                {/* Jika logo tidak ada, gantikan src ke logo yang ada atau hapus */}
              </div>
            </motion.div>

            {/* Our Value (Why we are different) */}
            <motion.div
              className={styles.infoBox}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2>Our Value</h2>
              <ul>
                <li><strong>Professionalism:</strong> Tim berpengalaman dan proses kerja yang terdokumentasi.</li>
                <li><strong>Reliability:</strong> Garansi produk & layanan after-sales yang responsif.</li>
                <li><strong>Scale:</strong> Kapasitas distribusi nasional untuk proyek besar (sekolah & instansi).</li>
                <li><strong>Compliance:</strong> Terdaftar di e-Katalog LKPP dan memenuhi standar pengadaan pemerintah.</li>
              </ul>
            </motion.div>

            {/* Vision & Mission side-by-side (stack on mobile) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <motion.div
                className={styles.infoBox}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                <h2>Vision</h2>
                <p>
Meningkatkan dan mengembangkan kemampuan
dalam bidang general supplier, mekanikal elektrikal
mesin, serta dalam bidang perawatan gedung untuk
memenuhi kebutuhan
dan bermanfaat
bagi
pengguna/konsumen.
                </p>
              </motion.div>

              <motion.div
                className={styles.infoBox}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h2>Mission</h2>
                <ul>
                  <li>1. Menciptakan lapangan pekerjaan.</li>
                  <li>2. Meningkatkan kemampuan SDM secara berkesinambungan.</li>
                  <li>3. Mengembangkan sistem menajemen secara

konsisten.</li>
<li>4. Memberikan pelayanan yang maksimal kepada
para konsumen.</li>
<li>5. Memberikan hasil pekerjaan yang memuaskan
kepada para konsumen.</li>
                </ul>
              </motion.div>
            </div>

            {/* Company Culture */}
            <motion.div
              className={styles.infoBox}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
            >
              <h2>Company Culture</h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                <div style={{ padding: 10, borderRadius: 10, background: "rgba(243,235,227,0.9)" }}>
                  <strong>Togetherness</strong>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Kerja tim yang erat dan saling mendukung.</div>
                </div>

                <div style={{ padding: 10, borderRadius: 10, background: "rgba(243,235,227,0.9)" }}>
                  <strong>Integrity</strong>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Transparansi & etika dalam bisnis.</div>
                </div>

                <div style={{ padding: 10, borderRadius: 10, background: "rgba(243,235,227,0.9)" }}>
                  <strong>Service Excellence</strong>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Prioritaskan kepuasan pelanggan.</div>
                </div>

                <div style={{ padding: 10, borderRadius: 10, background: "rgba(243,235,227,0.9)" }}>
                  <strong>Innovation</strong>
                  <div style={{ fontSize: 13, marginTop: 6 }}>Terus mencari solusi yang lebih baik.</div>
                </div>
              </div>
            </motion.div>

            {/* CTA / Need Help */}
            <motion.div
              className={styles.infoBox}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <h2>Butuh Bantuan?</h2>
              <p>Hubungi tim kami untuk konsultasi kebutuhan pengerjaan jasa & support material.</p>
              <div style={{ marginTop: 10 }}>
                <a href="mailto:info@compluscss.com" style={{ textDecoration: "none" }}>
                  <div style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "var(--primary)",
                    color: "var(--card-bg)",
                    fontWeight: 600
                  }}>
                    Kontak Kami
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — gunakan layout style yang sama (timeline area repurposed for highlights) */}
          <aside className={styles.rightColumn}>
            <motion.div
              className={styles.steps}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className={styles.stepRow}>
                <div className={styles.stepBadge}>01</div>
                <div className={styles.stepCard}>
                  <div>
                    <strong>Established 2021</strong>
                    <div className={styles.muted}>Lebih dari empat tahun pengalaman</div>
                  </div>
                  <div className={styles.bookmark}></div>
                </div>
              </div>

              <div className={styles.stepRow}>
                <div className={styles.stepBadge}>02</div>
                <div className={styles.stepCard}>
                  <div>
                    <strong>e-Katalog LKPP</strong>
                    <div className={styles.muted}>Penyedia resmi sejak 2021</div>
                  </div>
                  <div className={styles.bookmark}></div>
                </div>
              </div>

              <div className={styles.stepRow}>
                <div className={styles.stepBadge}>03</div>
                <div className={styles.stepCard}>
                  <div>
                    <strong>Distribusi Nasional</strong>
                    <div className={styles.muted}>Proyek general supplier, mekanikal elektrikal mesin dan perawatan gedung</div>
                  </div>
                  <div className={styles.bookmark}></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.rightSmallList}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className={styles.smallCard}>
                <strong>Kantor Utama</strong>
                <div>JI. BKKBN No. 7 RT.02 RW.07,
Mustika Jaya, Kota
Bekasi,17158</div>
              </div>
              <div className={styles.smallCard}>
                <strong>Kontak Cepat</strong>
                <div>marketingwae@wmk.co.id • (+62) 812-6888-8969</div>
              </div>
            </motion.div>
          </aside>
        </section>
      </main>
    </>
  );
}

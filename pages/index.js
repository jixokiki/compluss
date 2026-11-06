"use client";

import Link from "next/link";
import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
// import { collection, getDocs } from "firebase/firestore";
import styles from "./LandingPage.module.scss";
import FloatingChat from "./components/FloatingChat";
import BannerSlider from "./components/BannerSlider";
import SkeletonCard from "./components/SkeletonCard";
import CategoryFilter from "./components/CategoryFilter";
import KatalogScroll from "./components/KatalogScroll";
import BannerInformative from "./components/BannerInformative";
// import SmeetBooking from "./components/SmeetBooking";
import Head from "next/head"; // tambahkan di atas kalau belum ada
import ProdukPage2 from "./ProdukPage2.jsx";


import React, { useEffect, useState } from "react";    // buat styling sesuai projectmu 
 // gunakan komponen skeleton yang sudah ada 
// komponen filter kategori jika ada 
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";


import ProdukGridWithStorageResolve from "./ProdukPage.jsx";


function CartButton() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState(null); // null = not loaded yet
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
    function onKey(e) {
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

export default function LandingPage() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [menuOpen, setMenuOpen] = useState(false);
        const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://waemandirikarya-wmk.web.app";
const SITE_NAME = "PT. Wae Mandiri Karya";
const LOGO_URL = process.env.NEXT_PUBLIC_OG_IMAGE || `${SITE_URL}/wmk-logo.jpeg`;


  const [produkList, setProdukList] = useState([]); useEffect(() => { const q = query(collection(db, "produk"), orderBy("createdAt", "desc")); const unsub = onSnapshot(q, (snap) => { const arr = []; snap.forEach((d) => arr.push({ id: d.id, ...d.data() })); setProdukList(arr); setLoading(false); }, (err) => { console.error("Error fetching produk:", err); setLoading(false); }); return () => unsub(); }, []); const produkTampil = produkList.filter((p) => selectedKategori === "Semua" || !selectedKategori ? true : (p.kategori || "").toLowerCase().includes(selectedKategori.toLowerCase()) );

  useEffect(() => {
    const fetchProduk = async () => {
      const snapshot = await getDocs(collection(db, "produk"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProduk(data);
      setLoading(false);
    };
    fetchProduk();
  }, []);

  return (
    <div className={styles.container}>

<Head>
  {/* Basic meta */}
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

  {/* Primary SEO: title & description */}
  <title>{`${SITE_NAME} | Solusi Manufaktur & Instalasi`}</title>
  <meta
    name="description"
    content="PT. Wae Mandiri Karya — layanan fabrikasi pipa, cable tray/rack, instalasi, dan maintenance. Solusi custom untuk kebutuhan industri dan infrastruktur."
  />
  <meta name="keywords" content="PT Wae Mandiri Karya, fabrikasi pipa, cable tray, cable rack, instalasi, maintenance, fabrikasi industri" />
  <meta name="author" content={SITE_NAME} />

  {/* Canonical + robots */}
  <link rel="canonical" href={SITE_URL} />
  <meta name="robots" content="index, follow" />

  {/* Open Graph (Social) */}
  <meta property="og:locale" content="id_ID" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={`${SITE_NAME} | Solusi Manufaktur & Instalasi`} />
  <meta
    property="og:description"
    content="PT. Wae Mandiri Karya — solusi fabrikasi pipa, tray/rack kabel, instalasi, dan maintenance untuk sektor industri."
  />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:image" content={LOGO_URL} />
  <meta property="og:image:alt" content={`${SITE_NAME} logo`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@waemandirikarya" />
  <meta name="twitter:title" content={`${SITE_NAME} | Solusi Manufaktur & Instalasi`} />
  <meta name="twitter:description" content="Fabrikasi pipa, cable tray/rack, instalasi, modifikasi, dan maintenance." />
  <meta name="twitter:image" content={LOGO_URL} />

  {/* Mobile & PWA hints */}
  <meta name="theme-color" content="#0b63a6" />
  <meta name="mobile-web-app-capable" content="yes" />

  {/* Preconnect / Fonts */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Open+Sans:wght@400;600&display=swap"
    rel="stylesheet"
  />

  {/* Structured data JSON-LD for Organization */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": LOGO_URL,
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+6289506377440",
          "contactType": "customer service",
          "email": "Marketing@wmk.co.id",
          "areaServed": "ID"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. BKKBN No.7 RT.002/RW.007, Mustika Jaya",
        "addressLocality": "Bekasi",
        "addressRegion": "Jawa Barat",
        "postalCode": "17158",
        "addressCountry": "ID"
      },
      "description": "PT. Wae Mandiri Karya menyediakan layanan fabrikasi pipa, pembuatan cable tray/rack, instalasi, modifikasi, dan maintenance untuk sektor industri."
    }) }}
  />

  {/* Favicons (ganti path jika berbeda) */}
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  {/* Sitemap & hreflang */}
  <link rel="sitemap" type="application/xml" title="Sitemap" href={`${SITE_URL}/sitemap.xml`} />
  <link rel="alternate" href={SITE_URL} hrefLang="id" />
</Head>

      {/* // paste ini menggantikan bagian <header> ... </header> lama */}
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
    {/* <CartButton /> */}
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
      
{menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}


      {/* Hero Carousel */}
      <BannerSlider />
      <KatalogScroll />

    <div style={{ padding: 20 }}>
      {/* <h2 style={{ marginBottom: 12 }}>Daftar Produk</h2> */}

      {/* Jika kamu ingin memposisikan filter di luar komponen ProdukGridWithStorageResolve,
          tampilkan CategoryFilter di sini. Komponen yang aku kirim sebelumnya sudah
          memiliki select internal — jika ingin kontrol eksternal, minta aku bantu modifikasinya. */}
      {/* <CategoryFilter selected={selectedKategori} onSelect={setSelectedKategori} /> */}

      {/* Panggil komponen grid */}
      {/* <ProdukGridWithStorageResolve /> */}
      <ProdukPage2 />

      {/* Jika kamu mau, tambahkan komponen skeleton / placeholder global */}
      {/* <SkeletonCard /> */}
    </div>

      <BannerInformative />

      {/* CTA */}
      <section className={styles.cta}>
        <h3>Butuh Bantuan atau Penawaran Khusus?</h3>
        {/* <SmeetBooking /> */}
        <a href="https://wa.me/6281219122595" target="_blank">
          Konsultasi Sekarang
        </a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} PT. WAE MANDIRI KARYA. All rights
        reserved.
      </footer>

      {/* Floating Chat Button */}
      <FloatingChat />
    </div>
  );
}

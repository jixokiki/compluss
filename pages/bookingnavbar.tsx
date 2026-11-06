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

export default function BookingNavbar() {
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

      {/* <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Compluss</Link>
        </div>
        <div className={styles.logoContainer}>
                    <Link href="/">  <img src="/logo4.png" alt="Compluss Logo" className={styles.logoImage} /></Link>
  <h1>Compluss</h1>
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

      {/* 🎁 Bonus Fancy Feature: Blur Overlay */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* <main className={styles.main}>
        <h2 className={styles.title}>✨ Agendakan Bersama Compluss ✨</h2>
        <BookingWizard />
      </main> */}
      <main className={styles.main}>
  {/* <h2 className={styles.title}>✨ Agendakan Bersama Compluss ✨</h2> */}
  <h2 className={styles.title}>
  ✨ Agendakan Bersama WMK ✨
  {/* <span className="sparkle" />   optional */}
</h2>


  <div className={styles.bookingArea}>
    <div className={styles.bookingFrame}>
      {/* Kiri bisa jadi calendar/timeline, kanan form (BookingWizard sudah mengandung form)
          Jika ingin, bungkus BookingWizard supaya masuk ke .formWrap */}
      <BookingWizard />
    </div>
  </div>
</main>

    </>
  );
}

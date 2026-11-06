"use client";
import { useState } from "react";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../lib/firebase";
import styles from "./ProductDetailClient.module.scss";

export default function ProductDetailClient({ produk, onBack }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const gambarUrl = produk?.gambarUrl || "/placeholder-image.png";
  const namaProduk = produk?.nama || "Produk";

  const whatsappText = encodeURIComponent(`Saya tertarik dengan produk: ${namaProduk}`);
  const waLink = `https://wa.me/6281234567890?text=${whatsappText}`;

  const addToCart = async () => {
    await addDoc(collection(db, "keranjang"), {
      nama: produk.nama,
      kategori: produk.kategori,
      harga: produk.harga,
      gambarUrl: produk.gambarUrl,
      timestamp: serverTimestamp(),
    });
    alert("Produk ditambahkan ke keranjang!");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">WMK</Link>
        </div>

        <div className={styles.rightControls}>
          <div
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            role="button"
            aria-label="Toggle menu"
          >
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
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

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

      <div className={styles.container}>
        <div className={styles.card}>
          {!!gambarUrl && <img src={gambarUrl} alt={namaProduk} />}

          <div className={styles.details}>
            <h1>{namaProduk}</h1>

            {produk?.kategori && (
              <p className={styles.category}>
                Kategori: <span>{produk.kategori}</span>
              </p>
            )}

            {typeof produk?.harga === "number" && (
              <div className={styles.price}>Rp {produk.harga.toLocaleString("id-ID")}</div>
            )}

            <div
              className={
                produk?.deskripsi ? styles.description : `${styles.description} ${styles.placeholder}`
              }
            >
              {produk?.deskripsi || "(Belum ada deskripsi)"}
            </div>

            {typeof produk?.stok === "number" && (
              <div className={styles.stock}>
                Stok tersedia: <span>{produk.stok}</span>
              </div>
            )}

            <a href={waLink} target="_blank" rel="noreferrer noopener" className={styles.whatsapp}>
              Chat via WhatsApp
            </a>

            <button onClick={addToCart} className={styles.addCart}>
              + Keranjang
            </button>

            <button onClick={onBack} className={styles.backLink}>
              ← Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


// "use client"; import React, { useEffect, useState } from "react"; import Link from "next/link"; import styles from "./ProductDetailClient.module.scss"; // sesuaikan // same implementation as component earlier, but path relative for pages folder 
// export default function ProductDetailClient({ onBack }) { const [product, setProduct] = useState(null); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [menuOpen, setMenuOpen] = useState(false); useEffect(() => { const path = typeof window !== "undefined" ? window.location.pathname : ""; const parts = path.split("/").filter(Boolean); const id = parts[parts.length - 1]; if (!id) { setLoading(false); return; } (async () => { setLoading(true); try { const res = await fetch(`/api/getProduk/${id}`); if (res.ok) { const data = await res.json(); setProduct(data); } else { setProduct({ id, nama: "Produk Demo", kategori: "Demo", harga: 0, gambarUrl: "/placeholder.png", deskripsi: "Fallback data", diskon: 0, }); } } catch (err) { console.error(err); } finally { setLoading(false); } })(); }, []); async function addToCart(item) { if (saving) return; setSaving(true); try { const { collection, addDoc, serverTimestamp } = await import("firebase/firestore"); const { db } = await import("../../lib/firebase"); // sesuaikan 
// await addDoc(collection(db, "keranjang"), { nama: item.nama, kategori: item.kategori, harga: item.harga, gambarUrl: item.gambarUrl, timestamp: serverTimestamp(), }); alert("Produk ditambahkan ke keranjang!"); const msg = `Halo Admin, saya ingin membeli: ${item.nama}`; window.open(`https://wa.me/6285817298071?text=${encodeURIComponent(msg)}`, "_blank"); } catch (err) { console.error(err); alert("Gagal menambahkan ke keranjang"); } finally { setSaving(false); } } if (loading) return <div className={styles.container}><p>Memuat...</p></div>; const gambarUrl = product?.gambarUrl || "/placeholder.png"; const namaProduk = product?.nama || "Produk"; return ( <> <header className={styles.header}> <div className={styles.logo}><Link href="/">Compluss</Link></div> <div className={styles.rightControls}> <div className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`} onClick={() => setMenuOpen(!menuOpen)} role="button" aria-label="Toggle menu" tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setMenuOpen(!menuOpen)} > <div className={styles.bar} /><div className={styles.bar} /><div className={styles.bar} /> </div> </div> <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}> <Link href="/">Beranda</Link> <Link href="/#produk">Produk</Link> <Link href="/TentangKami">Tentang Kami</Link> <Link href="/bookingnavbar">Booking</Link> <Link href="/kontak">Kontak</Link> </nav> </header> {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />} <div className={styles.container}> <div className={styles.card}> <img src={gambarUrl} alt={namaProduk} /> <div className={styles.details}> <h1>{namaProduk}</h1> {product?.kategori && <p className={styles.category}>Kategori: <span>{product.kategori}</span></p>} {typeof product?.harga === "number" && <div className={styles.price}>Rp {product.harga.toLocaleString("id-ID")}</div>} <div className={product?.deskripsi ? styles.description : `${styles.description} ${styles.placeholder}`}> {product?.deskripsi || "(Belum ada deskripsi)"} </div> <a href={`https://wa.me/6285817298071?text=${encodeURIComponent(`Saya tertarik dengan produk: ${namaProduk}`)}`} target="_blank" rel="noreferrer noopener" className={styles.whatsapp}> Chat via WhatsApp </a> <button onClick={() => addToCart(product)} className={styles.addCart} disabled={saving}> {saving ? "Menyimpan..." : "+ Keranjang"} </button> {onBack && <button onClick={onBack} className={styles.backLink}>← Kembali</button>} </div> </div> </div> </> ); }


// // pages/produk/ProductDetailClient.jsx
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import styles from "./ProductDetailClient.module.scss"; // pastikan file scss berada di folder yang sama
// import { initFirebaseClient, getDb, getStorage } from "../../lib/firebase2"; // sesuaikan jika path berbeda
// import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { getDownloadURL, ref as storageRef } from "firebase/storage";

// export default function ProductDetailClient({ onBack }) {
//   const router = useRouter();
//   const { id } = router.query; // id dari url /produk/:id
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     // init firebase client (idempotent)
//     initFirebaseClient();
//   }, []);

//   useEffect(() => {
//     if (!id) return;
//     let canceled = false;

//     async function fetchProduct() {
//       setLoading(true);
//       try {
//         const db = getDb();
//         const docRef = doc(db, "produk", id);
//         const snap = await getDoc(docRef);
//         if (!snap.exists()) {
//           setProduct(null);
//         } else {
//           const data = snap.data();
//           // If you store storage path (e.g. "produk/abc.jpg") in field `gambarPath`,
//           // convert it to a download URL:
//           if (data.gambarPath && !data.gambarUrl) {
//             try {
//               const storage = getStorage();
//               const url = await getDownloadURL(storageRef(storage, data.gambarPath));
//               data.gambarUrl = url;
//             } catch (err) {
//               console.warn("Gagal resolve gambar dari Storage:", err);
//             }
//           }
//           if (!canceled) setProduct({ id: snap.id, ...data });
//         }
//       } catch (err) {
//         console.error("fetchProduct error:", err);
//         if (!canceled) setProduct(null);
//       } finally {
//         if (!canceled) setLoading(false);
//       }
//     }

//     fetchProduct();
//     return () => {
//       canceled = true;
//     };
//   }, [id]);

//   async function addToCart(item) {
//     if (saving) return;
//     setSaving(true);
//     try {
//       const db = getDb();
//       const keranjangCol = collection(db, "keranjang");
//       await addDoc(keranjangCol, {
//         nama: item.nama,
//         kategori: item.kategori,
//         harga: item.harga,
//         gambarUrl: item.gambarUrl || "",
//         timestamp: serverTimestamp(),
//       });

//       const msg = `Halo Admin, saya ingin membeli: ${item.nama}`;
//       window.open(`https://wa.me/6285817298071?text=${encodeURIComponent(msg)}`, "_blank");
//       alert("Produk ditambahkan ke keranjang!");
//     } catch (err) {
//       console.error("addToCart error:", err);
//       alert("Gagal menambahkan ke keranjang.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <p>Memuat produk...</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className={styles.container}>
//         <p>Produk tidak ditemukan.</p>
//         <Link href="/"><button className={styles.backLink}>← Kembali ke Beranda</button></Link>
//       </div>
//     );
//   }

//   const gambarUrl = product.gambarUrl || "/placeholder.png";
//   const namaProduk = product.nama || "Produk";

//   return (
//     <>
//       <header className={styles.header}>
//         <div className={styles.logo}><Link href="/">Compluss</Link></div>

//         <div className={styles.rightControls}>
//           <div
//             className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
//             onClick={() => setMenuOpen(!menuOpen)}
//             role="button"
//             aria-label="Toggle menu"
//             tabIndex={0}
//             onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setMenuOpen(!menuOpen)}
//           >
//             <div className={styles.bar} />
//             <div className={styles.bar} />
//             <div className={styles.bar} />
//           </div>
//         </div>

//         <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
//           <Link href="/">Beranda</Link>
//           <Link href="/#produk">Produk</Link>
//           <Link href="/TentangKami">Tentang Kami</Link>
//           <Link href="/bookingnavbar">Booking</Link>
//           <Link href="/kontak">Kontak</Link>
//         </nav>
//       </header>

//       {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

//       <main className={styles.container}>
//         <div className={styles.card}>
//           <img src={gambarUrl} alt={namaProduk} />

//           <div className={styles.details}>
//             <h1>{namaProduk}</h1>

//             {product.kategori && (
//               <p className={styles.category}>Kategori: <span>{product.kategori}</span></p>
//             )}

//             {typeof product.harga === "number" && (
//               <div className={styles.price}>Rp {product.harga.toLocaleString("id-ID")}</div>
//             )}

//             <div className={product.deskripsi ? styles.description : `${styles.description} ${styles.placeholder}`}>
//               {product.deskripsi || "(Belum ada deskripsi)"}
//             </div>

//             <a href={`https://wa.me/6285817298071?text=${encodeURIComponent(`Saya tertarik dengan produk: ${product.nama}`)}`} target="_blank" rel="noreferrer noopener" className={styles.whatsapp}>
//               Chat via WhatsApp
//             </a>

//             <button onClick={() => addToCart(product)} className={styles.addCart} disabled={saving}>
//               {saving ? "Menyimpan..." : "+ Keranjang"}
//             </button>

//             {onBack && <button onClick={onBack} className={styles.backLink}>← Kembali</button>}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }


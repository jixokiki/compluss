// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import styles from "./produk.module.scss";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../lib/firebase";

// /**
//  * Simple CartButton lokal — kamu bisa ganti dengan komponen penuh yang sudah kamu punya.
//  */
// function CartButton({ onClick }) {
//   const [count, setCount] = useState(0);
//   return (
//     <button
//       className={styles.keranjangBelanja}
//       onClick={() => {
//         setCount((c) => c + 1);
//         if (onClick) onClick();
//       }}
//       aria-label="Keranjang Belanja"
//       title="Keranjang Belanja"
//     >
//       🛒 {count > 0 && <span style={{ marginLeft: 6 }}>{count}</span>}
//     </button>
//   );
// }


// /* ====== DEFAULT WA NUMBER (ubah di sini jika perlu) ====== */
// const DEFAULT_WA_NUMBER = "6285817298071";

// /* ====== helpers untuk WA link (update) ====== */
// function isFullUrl(str = "") {
//   return /^https?:\/\//i.test(str);
// }
// function onlyDigits(str = "") {
//   return (str || "").replace(/\D/g, "");
// }

// /**
//  * buildWhatsAppLink(contact, item)
//  * - contact: bisa berupa full url (https://...), nomor telepon (string dengan angka/ + / 0), atau kosong
//  * - item: object produk (dipakai untuk menyisipkan nama/ path di pesan)
//  *
//  * Jika contact kosong / tidak valid, akan fallback ke DEFAULT_WA_NUMBER.
//  */
// function buildWhatsAppLink(contact = "", item = {}) {
//   const name = sanitizeName(item.name || "");
//   const kategori = item.kategori || "";
//   const path = item.fullPath || "";
//   const baseMessage = `Halo, saya ingin menanyakan tentang "${name}" (Path: ${path}) dengan (Contact Pearson: ${kategori}). Bisa bantu informasinya? Terima kasih.`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   // jika contact adalah url penuh (mis. https://wa.me/...), gunakan langsung (tambahkan text jika perlu)
//   if (isFullUrl(contact)) {
//     if (/wa\.me|api\.whatsapp\.com/i.test(contact)) {
//       if (/[?&]text=/i.test(contact)) return contact;
//       return contact + (contact.includes("?") ? "&" : "?") + "text=" + encodedMessage;
//     }
//     return contact;
//   }

//   // ambil digit dari contact
//   const digits = onlyDigits(contact);

//   // jika contact valid (cukup digit), normalisasi dan gunakan
//   if (digits.length >= 6) {
//     let normalized = digits;
//     if (/^0/.test(contact.trim())) {
//       normalized = digits.replace(/^0+/, "62"); // ubah leading 0 -> 62
//     }
//     return `https://wa.me/${normalized}?text=${encodedMessage}`;
//   }

//   // fallback: pakai DEFAULT_WA_NUMBER
//   const fallbackDigits = onlyDigits(DEFAULT_WA_NUMBER);
//   return `https://wa.me/${fallbackDigits}?text=${encodedMessage}`;
// }

// export default function ProdukPage({ storagePath = "produk_complus" }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);


// // useEffect(() => {
// //   let cancelled = false;

// //   async function fetchAll() {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       // Derive base URL safely (remove trailing slash jika ada)
// //       const rawBase = process.env.NEXT_PUBLIC_API_BASE || "";
// //       const base = rawBase ? rawBase.replace(/\/+$/, "") : "";

// //       // Jika frontend & API di domain sama (misal deploy di Vercel bersama),
// //       // lebih aman gunakan relative endpoint untuk menghindari CORS:
// //       const sameOrigin = typeof window !== "undefined" && base && window.location.origin === base;
// //       const url = sameOrigin
// //         ? "/listFiles"
// //         : base
// //         ? `${base}/listFiles`
// //         : "/listFiles"; // fallback ke relative supaya dev lokal tetap jalan

// //       const res = await fetch(url, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (!res.ok) {
// //         const text = await res.text().catch(() => "");
// //         throw new Error(`API error: ${res.status} ${text}`);
// //       }

// //       const data = await res.json();

// //       if (!cancelled) {
// //         setItems(
// //           Array.isArray(data)
// //             ? data.map((d) => ({
// //                 name: d.name,
// //                 url: d.url,
// //                 fullPath: d.fullPath || d.name,
// //               }))
// //             : []
// //         );
// //       }
// //     } catch (err) {
// //       console.error("Gagal mengambil data dari API:", err);
// //       if (!cancelled) setError(err?.message || "Gagal mengambil file dari API");
// //     } finally {
// //       if (!cancelled) setLoading(false);
// //     }
// //   }

// //   fetchAll();
// //   return () => {
// //     cancelled = true;
// //   };
// // }, [storagePath]);


// useEffect(() => {
// let cancelled = false;


// // fungsi baru: coba ambil dari Firestore (collection "produk")
// async function loadFromFirestore() {
//   try {
//     setLoading(true);
//     setError(null);
//     const snap = await getDocs(collection(db, "produk"));
//     const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     if (!cancelled) {
//       // map ke format yang dipakai komponen (name, url, fullPath)
//       const mapped = arr.map((p) => ({
//         name: p.nama || p.name || (p.gambarUrl ? p.gambarUrl.split("/").pop() : "unknown"),
//         url: p.gambarUrl || p.url || "",
//         kategori: p.kategori || "",
//         fullPath: p.path || p.fullPath || p.storagePath || (p.gambarUrl ? p.gambarUrl.split("/").pop() : ""),
//       }));
//       // set only jika ada hasil — jika kosong, biarkan fallback ke listFiles
//       if (mapped.length > 0) {
//         setItems(mapped);
//         return true; // menandakan sukses pakai firestore
//       }
//     }
//   } catch (e) {
//     console.warn("loadFromFirestore gagal:", e);
//     if (!cancelled) setError(String(e?.message || e));
//   } finally {
//     // jangan setLoading(false) di sini karena fetchAll/flow utama yang mengatur loading akhir
//   }
//   return false;
// }

// async function fetchAll() {
//   setLoading(true);
//   setError(null);

//   try {
//     // Derive base URL safely (remove trailing slash jika ada)
//     const rawBase = process.env.NEXT_PUBLIC_API_BASE || "";
//     const base = rawBase ? rawBase.replace(/\/+$/, "") : "";

//     // Jika frontend & API di domain sama (misal deploy di Vercel bersama),
//     // lebih aman gunakan relative endpoint untuk menghindari CORS:
//     const sameOrigin = typeof window !== "undefined" && base && window.location.origin === base;
//     const url = sameOrigin
//       ? "/listFiles"
//       : base
//       ? `${base}/listFiles`
//       : "/listFiles"; // fallback ke relative supaya dev lokal tetap jalan

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // debug: non-cache untuk memastikan tidak baca cache lama
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const text = await res.text().catch(() => "");
//       throw new Error(`API error: ${res.status} ${text}`);
//     }

//     const data = await res.json();

//     if (!cancelled) {
//       setItems(
//         Array.isArray(data)
//           ? data.map((d) => ({
//               name: d.name,
//               url: d.url,
//               kategori: d.kategori || "",
//               fullPath: d.fullPath || d.name,
//             }))
//           : []
//       );
//     }
//   } catch (err) {
//     console.error("Gagal mengambil data dari API:", err);
//     if (!cancelled) setError(err?.message || "Gagal mengambil file dari API");
//   } finally {
//     if (!cancelled) setLoading(false);
//   }
// }


// // Flow: coba Firestore dulu -> jika tidak berhasil (kosong/gagal) fallback ke listFiles
// (async () => {
//   const usedFirestore = await loadFromFirestore();
//   if (!cancelled) {
//     if (usedFirestore) {
//       // sudah set items dari Firestore; hentikan loading
//       setLoading(false);
//     } else {
//       // fallback ke listFiles jika Firestore kosong atau gagal
//       await fetchAll();
//     }
//   }
// })();

// return () => {
//   cancelled = true;
// };


// }, [storagePath]);


//   return (
//     <>
//       {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

//       <header className={styles.header}>
//         <div className={styles.logoContainer}>
//           <Link href="/">
//             <img src="/wmk-logo.jpeg" alt="Compluss Logo" className={styles.logoImage} />
//           </Link>
//         </div>

//         <div className={styles.navCenter}>
//           <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
//             <Link href="/">Beranda</Link>
//             <Link href="/produk">Produk</Link>
//             <Link href="/TentangKami">Tentang Kami</Link>
//             <Link href="/bookingnavbar">Booking</Link>
//             <Link href="/kontak">Kontak</Link>
//           </nav>
//         </div>

//         <div className={styles.rightControls}>
//           <CartButton onClick={() => setSidebarOpen(true)} />
//           <div
//             className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
//             onClick={() => setMenuOpen((s) => !s)}
//             aria-label="Toggle menu"
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") setMenuOpen((s) => !s);
//             }}
//           >
//             <div className={styles.bar}></div>
//             <div className={styles.bar}></div>
//             <div className={styles.bar}></div>
//           </div>
//         </div>
//       </header>

//       <main>
//         <section className={styles.produkSection}>
//           <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
//             <h3>KAMI MENAWARKAN</h3>

//             {loading && <div style={{ textAlign: "center", padding: "2rem 0" }}>Memuat produk...</div>}

//             {error && (
//               <div style={{ background: "#fee2e2", color: "#9b1c1c", padding: 12, borderRadius: 8, marginBottom: 16 }}>
//                 Terjadi error: {error}
//               </div>
//             )}

//             {!loading && items.length === 0 && <div style={{ textAlign: "center", padding: "2rem 0" }}>Tidak ada file di folder ini.</div>}

//             <div className={styles.grid}>
//               {items.map((it) => (
//                 <article key={it.fullPath + it.name + it.kategori} className={styles.card} onClick={() => window.open(it.url, "_blank")}>
//                   <div className={styles.badge}>PT WAE MANDIRI KARYA</div>

//                   <img src={it.url} alt={it.name} />

//                   <div className={styles.info}>
//                     <h4>{sanitizeName(it.name)}</h4>
//                     <div className={styles.kategori}>Path: {it.fullPath}</div>
//                     <div className={styles.kategori}>Contact Pearson : {it.kategori}</div>
//                     {/* <div className={styles.harga}>—</div> */}

//                     {/* <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//                       <a href={it.url} target="_blank" rel="noreferrer" className="link">
//                         Buka
//                       </a>
//                       <a href={it.url} download={it.name} className="link">
//                         Unduh
//                       </a>
//                     </div> */}
//                     <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//                       <a href={it.cetakporo} target="_blank" rel="noreferrer" className="link">
//                         Cetak
//                       </a>
//                       {/* <a href={it.contact} download={it.name} className="link">
//                         Contact
//                       </a> */}
//                       {/* Contact sekarang membuka WA dengan template pesan */} 
//                       <a href={buildWhatsAppLink(it.contact, it)} target="_blank" rel="noopener noreferrer" className="link" onClick={(e) => {  
//                       e.stopPropagation();  }} > Contact </a>
//                     </div>
//                   </div>

//                   <div style={{ position: "absolute", bottom: 12, right: 12 }}>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addToCart(it);
//                         setSidebarOpen(true);
//                       }}
//                     >
//                       Tambah
//                     </button>
//                   </div>
//                 </article>
//               ))}
//             </div>

//             <div style={{ marginTop: 36 }} className={styles.cta}>
//               <h3>Butuh bantuan pilih produk?</h3>
//               <a href="/kontak">Hubungi Kami</a>
//             </div>
//           </div>
//         </section>

//         <footer className={styles.footer}>© {new Date().getFullYear()} WMK — Semua hak dilindungi</footer>
//       </main>

//       {sidebarOpen && <div className={styles.cartOverlay} onClick={() => setSidebarOpen(false)}></div>}
//       <aside className={`${styles.cartSidebar} ${sidebarOpen ? styles.openSidebar : ""}`} aria-hidden={!sidebarOpen}>
//         <div className={styles.cartHeader}>
//           <strong>Keranjang</strong>
//           <button className={styles.closeCartBtn} onClick={() => setSidebarOpen(false)}>
//             Tutup
//           </button>
//         </div>

//         <div className={styles.cartContent}>
//           <p style={{ color: "#64748b" }}>Contoh keranjang sementara — ganti dengan implementasi state/Redux/Firebase kamu.</p>
//         </div>

//         <div className={styles.cartFooter}>
//           <button className={styles.closeCartBtnPrimary} onClick={() => alert("Proses checkout belum diimplementasikan")}>
//             Checkout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// /* helper kecil */
// function sanitizeName(name = "") {
//   return name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ");
// }

// function addToCart(item) {
//   try {
//     const prev = JSON.parse(localStorage.getItem("demo_cart") || "[]");
//     prev.push({ name: item.name, url: item.url, path: item.fullPath });
//     localStorage.setItem("demo_cart", JSON.stringify(prev));
//     console.info("Added to demo cart:", item.name);
//   } catch (e) {
//     console.error(e);
//   }
// }








//plis jangan dihapus yaa ikiii iniiiii karena males buat atau ngoding in fungsi lagi
// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import styles from "./produk.module.scss";
// // Firestore imports (ditambahkan)
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../lib/firebase";

// /**
//  * Simple CartButton lokal — kamu bisa ganti dengan komponen penuh yang sudah kamu punya.
//  */
// function CartButton({ onClick }) {
//   const [count, setCount] = useState(0);
//   return (
//     <button
//       className={styles.keranjangBelanja}
//       onClick={() => {
//         setCount((c) => c + 1);
//         if (onClick) onClick();
//       }}
//       aria-label="Keranjang Belanja"
//       title="Keranjang Belanja"
//     >
//       🛒 {count > 0 && <span style={{ marginLeft: 6 }}>{count}</span>}
//     </button>
//   );
// }

// // /* ====== NEW: helpers untuk WA link ====== */ function isFullUrl(str = "") { return /^https?:\/\//i.test(str); } function onlyDigits(str = "") { return (str || "").replace(/\D/g, ""); } /** * buildWhatsAppLink(contact, item) * - contact: bisa berupa full url (https://...), nomor telepon (string dengan angka/ + / 0), atau kosong * - item: object produk (dipakai untuk menyisipkan nama/ path di pesan) */ 
// // function buildWhatsAppLink(contact = "", item = {}) { const name = sanitizeName(item.name || ""); const path = item.fullPath || ""; const baseMessage = `Halo, saya ingin menanyakan tentang "${name}" (Path: ${path}). Bisa bantu informasinya? Terima kasih.`; const encodedMessage = encodeURIComponent(baseMessage); // jika contact adalah url penuh (mis. https://wa.me/...), gunakan langsung 
// // if (isFullUrl(contact)) { // jika url adalah wa.me atau api.whatsapp, tambahkan pesan jika belum ada 
// // if (/wa\.me|api\.whatsapp\.com/i.test(contact)) { // jika url sudah mengandung text=, biarkan; kalau tidak, tambahkan 
// // if (/[?&]text=/i.test(contact)) return contact; // tambahkan parameter text
// // return contact + (contact.includes("?") ? "&" : "?") + "text=" + encodedMessage; } return contact; } // kalau contact tampak seperti nomor telepon (ambil digit) 
// // const digits = onlyDigits(contact); if (digits.length >= 6) { // normalisasi: jika mulai dengan 0 -> ganti 0 dengan 62 (Indonesia) 
// // let normalized = digits; if (/^0/.test(contact.trim())) { normalized = digits.replace(/^0+/, "62"); } // jika kontak sudah berisi kode negara (mis. starts with 62 atau +62), digits sudah sesuai 
// // return `https://wa.me/${normalized}?text=${encodedMessage}`; } // fallback: buka chat WA tanpa nomor tetapi dengan pesan terisi (user bisa pilih kontak di WhatsApp Web) 
// // return `https://wa.me/?text=${encodedMessage}`; }

// /* ====== DEFAULT WA NUMBER (ubah di sini jika perlu) ====== */
// const DEFAULT_WA_NUMBER = "6285817298071";

// /* ====== helpers untuk WA link (update) ====== */
// function isFullUrl(str = "") {
//   return /^https?:\/\//i.test(str);
// }
// function onlyDigits(str = "") {
//   return (str || "").replace(/\D/g, "");
// }

// /**
//  * buildWhatsAppLink(contact, item)
//  * - contact: bisa berupa full url (https://...), nomor telepon (string dengan angka/ + / 0), atau kosong
//  * - item: object produk (dipakai untuk menyisipkan nama/ path di pesan)
//  *
//  * Jika contact kosong / tidak valid, akan fallback ke DEFAULT_WA_NUMBER.
//  */
// function buildWhatsAppLink(contact = "", item = {}) {
//   const name = sanitizeName(item.name || "");
//   const path = item.fullPath || "";
//   const kategori = item.kategori || "";
//   const baseMessage = `Halo, saya ingin menanyakan tentang "${name}" (Path: ${path}) dengan (Contact Pearson: ${kategori}). Bisa bantu informasinya? Terima kasih.`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   // jika contact adalah url penuh (mis. https://wa.me/...), gunakan langsung (tambahkan text jika perlu)
//   if (isFullUrl(contact)) {
//     if (/wa\.me|api\.whatsapp\.com/i.test(contact)) {
//       if (/[?&]text=/i.test(contact)) return contact;
//       return contact + (contact.includes("?") ? "&" : "?") + "text=" + encodedMessage;
//     }
//     return contact;
//   }

//   // ambil digit dari contact
//   const digits = onlyDigits(contact);

//   // jika contact valid (cukup digit), normalisasi dan gunakan
//   if (digits.length >= 6) {
//     let normalized = digits;
//     if (/^0/.test(contact.trim())) {
//       normalized = digits.replace(/^0+/, "62"); // ubah leading 0 -> 62
//     }
//     return `https://wa.me/${normalized}?text=${encodedMessage}`;
//   }

//   // fallback: pakai DEFAULT_WA_NUMBER
//   const fallbackDigits = onlyDigits(DEFAULT_WA_NUMBER);
//   return `https://wa.me/${fallbackDigits}?text=${encodedMessage}`;
// }



// /**
//  * buildWhatsAppLinkForNumber(number, item, jenis, note)
//  * - number: nomor telepon (string) — harus berisi angka dan/atau +/0
//  * - jenis: "RO" | "PO" | "Layanan"
//  * - note: string (opsional)
//  */
// function buildWhatsAppLinkForNumber(number = "", item = {}, jenis = "PO", note = "") {
//   const name = sanitizeName(item.name || "");
//   const path = item.fullPath || "";
//   const kategori = item.kategori || "";
//   // jika jenis Layanan, user mungkin menulis detail di note
//   const jenisLabel = jenis === "Layanan" ? "Layanan" : jenis;
//   const baseMessage = `Halo, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}" (Path: ${path}) dengan (Contact Pearson: ${kategori}). ${note ? "Catatan: " + note : ""} Mohon bantuannya. Terima kasih.`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   // normalisasi nomor
//   const digits = onlyDigits(number);
//   let normalized = digits;
//   if (/^0/.test(number.trim())) {
//     normalized = digits.replace(/^0+/, "62");
//   }
//   if (!normalized || normalized.length < 6) {
//     normalized = onlyDigits(DEFAULT_WA_NUMBER);
//   }

//   return `https://wa.me/${normalized}?text=${encodedMessage}`;
// }

// /* helper kecil */
// // function sanitizeName(name = "") {
// //   return name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ");
// // }

// // function addToCart(item) {
// //   try {
// //     const prev = JSON.parse(localStorage.getItem("demo_cart") || "[]");
// //     prev.push({ name: item.name, url: item.url, path: item.fullPath });
// //     localStorage.setItem("demo_cart", JSON.stringify(prev));
// //     console.info("Added to demo cart:", item.name);
// //   } catch (e) {
// //     console.error(e);
// //   }
// // }

// /* ================================================= */
// /* Kontak konfirmasi (ubah nomor di sini jika perlu) */
// const KONTAK_KONFIRM = [
//   { label: "Pidel", number: "6285215949622" },
//   { label: "Bahtiar", number: "6281111805974" },
//   { label: "Livia", number: "6289654378362" },
// ];

// /**
//  * ContactConfirmOneByOne
//  * - Menampilkan kontak satu-per-satu dari kontakList
//  * - Menambahkan swipe kiri/kanan (mobile) untuk ganti kontak
//  * - Menyertakan click pada nomor untuk langsung kirim WA
//  */
// function ContactConfirmOneByOne({
//   kontakList = KONTAK_KONFIRM,
//   item,            // sama dengan `it` di kode Anda
//   itemKey,         // sama dengan `key` di kode Anda (identifier item)
//   handleSendConfirmation, // function (itemKey, number, item)
//   autoAdvance = true,     // opsi: setelah kirim maju ke kontak selanjutnya
// }) {
//   const [index, setIndex] = useState(0);
//   const total = kontakList.length;
//   const current = kontakList[index];

//   // touch/swipe handlers
//   const touchStartXRef = useRef(null);
//   const touchCurrentXRef = useRef(null);
//   const SWIPE_THRESHOLD = 40; // px

//   const onTouchStart = (e) => {
//     if (!e.touches || e.touches.length === 0) return;
//     touchStartXRef.current = e.touches[0].clientX;
//     touchCurrentXRef.current = e.touches[0].clientX;
//   };

//   const onTouchMove = (e) => {
//     if (!e.touches || e.touches.length === 0) return;
//     touchCurrentXRef.current = e.touches[0].clientX;
//   };

//   const onTouchEnd = (e) => {
//     const start = touchStartXRef.current;
//     const end = touchCurrentXRef.current;
//     if (start == null || end == null) return;
//     const diff = end - start;
//     if (Math.abs(diff) > SWIPE_THRESHOLD) {
//       if (diff > 0) {
//         // swipe right -> prev
//         setIndex((i) => Math.max(0, i - 1));
//       } else {
//         // swipe left -> next
//         setIndex((i) => Math.min(total - 1, i + 1));
//       }
//     }
//     touchStartXRef.current = null;
//     touchCurrentXRef.current = null;
//   };

//   const onPrev = (e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     setIndex((i) => Math.max(0, i - 1));
//   };

//   const onNext = (e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     setIndex((i) => Math.min(total - 1, i + 1));
//   };

//   const onSend = (e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     if (typeof handleSendConfirmation === "function") {
//       handleSendConfirmation(itemKey, current.number, item);
//     }
//     if (autoAdvance && index < total - 1) {
//       setIndex((i) => i + 1);
//     }
//   };

//   // klik langsung pada nomor juga kirim WA
//   const onClickNumber = (e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     if (typeof handleSendConfirmation === "function") {
//       handleSendConfirmation(itemKey, current.number, item);
//     }
//   };

//   return (
//     <div
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEnd}
//       style={{ display: "flex", flexDirection: "column", gap: 8 }}
//     >
//       <div style={{ fontSize: 13, marginBottom: 4, color: "#374151" }}>Kontak {index + 1} dari {total}</div>

//       <div style={{
//         padding: 10,
//         borderRadius: 8,
//         border: "1px solid rgba(0,0,0,0.06)",
//         background: "#fafafa",
//         display: "flex",
//         flexDirection: "column",
//         gap: 6
//       }}>
//         <div style={{ fontWeight: 700 }}>{current.label}</div>
//         <div
//           style={{ fontSize: 13, color: "#4b5563", cursor: "pointer", userSelect: "text" }}
//           onClick={onClickNumber}
//           title="Klik untuk buka WhatsApp"
//         >
//           {current.number}
//         </div>

//         {/* <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//           <button
//             type="button"
//             onClick={onPrev}
//             style={{
//               padding: "6px 8px",
//               borderRadius: 6,
//               border: "1px solid rgba(0,0,0,0.06)",
//               background: "#fff",
//               cursor: index === 0 ? "not-allowed" : "pointer",
//               opacity: index === 0 ? 0.6 : 1
//             }}
//             disabled={index === 0}
//           >
//             Prev
//           </button>

//           <button
//             type="button"
//             onClick={onSend}
//             style={{
//               padding: "6px 10px",
//               borderRadius: 6,
//               border: "1px solid rgba(0,0,0,0.06)",
//               background: "#ecfdf5",
//               cursor: "pointer",
//               marginLeft: "auto"
//             }}
//           >
//             Kirim
//           </button>

//           <button
//             type="button"
//             onClick={onNext}
//             style={{
//               padding: "6px 8px",
//               borderRadius: 6,
//               border: "1px solid rgba(0,0,0,0.06)",
//               background: "#fff",
//               cursor: index === total - 1 ? "not-allowed" : "pointer",
//               opacity: index === total - 1 ? 0.6 : 1
//             }}
//             disabled={index === total - 1}
//           >
//             Next
//           </button>
//         </div> */}

//         <div style={{ fontSize: 12, color: "#6b7280" }}>
//           <em>Tip: geser (swipe) kiri/kanan untuk berpindah kontak di perangkat sentuh.</em>
//         </div>
//         <div style={{ display: "flex", gap: 2, marginTop: 18 }}>
//   <button
//     type="button"
//     onClick={onPrev}
//     style={{
//       position: "relative",
//       zIndex: 10010,
//       pointerEvents: "auto",
//       padding: "6px 8px",
//       left: 5,
//       borderRadius: 6,
//       border: "1px solid rgba(0,0,0,0.06)",
//       background: "#0d3a5b",
//       cursor: index === 0 ? "not-allowed" : "pointer",
//       opacity: index === 0 ? 0.6 : 1
//     }}
//     disabled={index === 0}
//   >
//     Prev
//   </button>

//   <button
//     type="button"
//     onClick={onSend}
//     style={{
//       position: "relative",
//       zIndex: 10010,
//       pointerEvents: "auto",
//       padding: "6px 10px",
//       borderRadius: 6,
//       border: "1px solid rgba(0,0,0,0.06)",
//       background: "##dc2626",
//       cursor: "pointer",
//       marginLeft: "auto"
//     }}
//   >
//     Kirim
//   </button>

//   <button
//     type="button"
//     onClick={onNext}
//     style={{
//       position: "relative",
//       zIndex: 10010,
//       pointerEvents: "auto",
//       padding: "6px 8px",
//       borderRadius: 6,
//       border: "1px solid rgba(0,0,0,0.06)",
//       background: "#0d3a5b",
//       cursor: index === total - 1 ? "not-allowed" : "pointer",
//       opacity: index === total - 1 ? 0.6 : 1
//     }}
//     disabled={index === total - 1}
//   >
//     Next
//   </button>
// </div>
//       </div>
//     </div>
//   );
// }
// /* ================================================= */


// function ContactConfirmOneByOnePlaceholder() {
//   // placeholder jika ingin, tidak digunakan langsung — tetap mempertahankan struktur file
//   return null;
// }

// export default function ProdukPage({ storagePath = "produk_complus" }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);


//     // state untuk popover Konfirmasi per item (store map of fullPath->open)
//   const [confirmOpenMap, setConfirmOpenMap] = useState({}); // { [key]: true }
//   // state detail untuk setiap popover: jenis + note
//   const [confirmStateMap, setConfirmStateMap] = useState({}); // { [key]: { jenis, note } }


//   // const [confirmOpenMap, setConfirmOpenMap] = useState({}); // object keyed by 'key'
// const [confStateMap, setConfStateMap] = useState({}); // optional, per-row conf state

//   // close popovers when clicking outside
//   const outerRef = useRef(null);
//   useEffect(() => {
//     function onDocClick(e) {
//       if (!outerRef.current) return;
//       if (!outerRef.current.contains(e.target)) {
//         setConfirmOpenMap({});
//       }
//     }
//     document.addEventListener("click", onDocClick);
//     return () => document.removeEventListener("click", onDocClick);
//   }, []);

  

// //   useEffect(() => {
// //   let cancelled = false;

// //   async function fetchAll() {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       // Derive base URL safely (remove trailing slash jika ada)
// //       const rawBase = process.env.NEXT_PUBLIC_API_BASE || "";
// //       const base = rawBase ? rawBase.replace(/\/+$/, "") : "";

// //       // Jika frontend & API di domain sama (misal deploy di Vercel bersama),
// //       // lebih aman gunakan relative endpoint untuk menghindari CORS:
// //       const sameOrigin = typeof window !== "undefined" && base && window.location.origin === base;
// //       const url = sameOrigin
// //         ? "/listFiles"
// //         : base
// //         ? `${base}/listFiles`
// //         : "/listFiles"; // fallback ke relative supaya dev lokal tetap jalan

// //       const res = await fetch(url, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (!res.ok) {
// //         const text = await res.text().catch(() => "");
// //         throw new Error(`API error: ${res.status} ${text}`);
// //       }

// //       const data = await res.json();

// //       if (!cancelled) {
// //         setItems(
// //           Array.isArray(data)
// //             ? data.map((d) => ({
// //                 name: d.name,
// //                 url: d.url,
// //                 fullPath: d.fullPath || d.name,
// //               }))
// //             : []
// //         );
// //       }
// //     } catch (err) {
// //       console.error("Gagal mengambil data dari API:", err);
// //       if (!cancelled) setError(err?.message || "Gagal mengambil file dari API");
// //     } finally {
// //       if (!cancelled) setLoading(false);
// //     }
// //   }

// //   fetchAll();
// //   return () => {
// //     cancelled = true;
// //   };
// // }, [storagePath]);

// useEffect(() => {
// let cancelled = false;


// // fungsi baru: coba ambil dari Firestore (collection "produk")
// async function loadFromFirestore() {
//   try {
//     setLoading(true);
//     setError(null);
//     const snap = await getDocs(collection(db, "produk"));
//     const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     if (!cancelled) {
//       // map ke format yang dipakai komponen (name, url, fullPath)
//       const mapped = arr.map((p) => ({
//         name: p.nama || p.name || (p.gambarUrl ? p.gambarUrl.split("/").pop() : "unknown"),
//         url: p.gambarUrl || p.url || "",
//         kategori: p.kategori || "",
//         fullPath: p.path || p.fullPath || p.storagePath || (p.gambarUrl ? p.gambarUrl.split("/").pop() : ""),
//       }));
//       // set only jika ada hasil — jika kosong, biarkan fallback ke listFiles
//       if (mapped.length > 0) {
//         setItems(mapped);
//         return true; // menandakan sukses pakai firestore
//       }
//     }
//   } catch (e) {
//     console.warn("loadFromFirestore gagal:", e);
//     if (!cancelled) setError(String(e?.message || e));
//   } finally {
//     // jangan setLoading(false) di sini karena fetchAll/flow utama yang mengatur loading akhir
//   }
//   return false;
// }

// async function fetchAll() {
//   setLoading(true);
//   setError(null);

//   try {
//     // Derive base URL safely (remove trailing slash jika ada)
//     const rawBase = process.env.NEXT_PUBLIC_API_BASE || "";
//     const base = rawBase ? rawBase.replace(/\/+$/, "") : "";

//     // Jika frontend & API di domain sama (misal deploy di Vercel bersama),
//     // lebih aman gunakan relative endpoint untuk menghindari CORS:
//     const sameOrigin = typeof window !== "undefined" && base && window.location.origin === base;
//     const url = sameOrigin
//       ? "/listFiles"
//       : base
//       ? `${base}/listFiles`
//       : "/listFiles"; // fallback ke relative supaya dev lokal tetap jalan

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // debug: non-cache untuk memastikan tidak baca cache lama
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const text = await res.text().catch(() => "");
//       throw new Error(`API error: ${res.status} ${text}`);
//     }

//     const data = await res.json();

//     if (!cancelled) {
//       setItems(
//         Array.isArray(data)
//           ? data.map((d) => ({
//               name: d.name,
//               url: d.url,
//               kategori: d.kategori || "",
//               fullPath: d.fullPath || d.name,
//             }))
//           : []
//       );
//     }
//   } catch (err) {
//     console.error("Gagal mengambil data dari API:", err);
//     if (!cancelled) setError(err?.message || "Gagal mengambil file dari API");
//   } finally {
//     if (!cancelled) setLoading(false);
//   }
// }

// // Flow: coba Firestore dulu -> jika tidak berhasil (kosong/gagal) fallback ke listFiles
// (async () => {
//   const usedFirestore = await loadFromFirestore();
//   if (!cancelled) {
//     if (usedFirestore) {
//       // sudah set items dari Firestore; hentikan loading
//       setLoading(false);
//     } else {
//       // fallback ke listFiles jika Firestore kosong atau gagal
//       await fetchAll();
//     }
//   }
// })();

// return () => {
//   cancelled = true;
// };


// }, [storagePath]);


//   // // helper untuk toggle popover konfirmasi untuk item key
//   // const toggleConfirm = (key) => {
//   //   setConfirmOpenMap((m) => ({ ...m, [key]: !m[key] }));
//   //   // init default confirmState bila belum ada
//   //   setConfirmStateMap((s) => ({ ...s, [key]: s[key] || { jenis: "PO", note: "" } }));
//   // };

//   // const updateConfirmState = (key, patch) => {
//   //   setConfirmStateMap((s) => ({ ...s, [key]: { ...(s[key] || {}), ...patch } }));
//   // };

//   const handleSendConfirmation = (key, contactNumber, item) => {
//     // Perbaikan: baca dari confirmStateMap (yang lama) atau confStateMap (yang kita pakai untuk input)
//     const stateA = confirmStateMap[key];
//     const stateB = confStateMap[key];
//     const state = stateA || stateB || { jenis: "PO", note: "" };
//     const jenis = state.jenis || "PO";
//     const note = state.note || "";

//     const waUrl = buildWhatsAppLinkForNumber(contactNumber, item, jenis, note);
//     // open WA in new tab
//     try {
//       window.open(waUrl, "_blank", "noopener,noreferrer");
//     } catch (e) {
//       // fallback - set location (untested but cover some environments)
//       window.location.href = waUrl;
//     }
//     // close popover
//     setConfirmOpenMap((m) => ({ ...m, [key]: false }));
//   };


// /* helper toggle per key (sesuaikan dengan implementasi Anda) */
// const toggleConfirm = (key) => {
//   setConfirmOpenMap(prev => ({ ...prev, [key]: !prev[key] }));
// };

// const setConfirmOpen = (key, value) => {
//   setConfirmOpenMap(prev => ({ ...prev, [key]: value }));
// };

// /* contoh updateConfirmState per-row */
// const updateConfirmState = (key, patch) => {
//   setConfStateMap(prev => ({ ...prev, [key]: { ...(prev[key] || {}), ...patch } }));
// };

// /* ubah open boolean menjadi per-key: */
// // const isOpen = !!confirmOpenMap[key];


//   return (
//     <>
//       {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

//        <header className={styles.header}>
//          <div className={styles.logoContainer}>
//            <Link href="/">
//              <img src="/wmk-logo.jpeg" alt="Compluss Logo" className={styles.logoImage} />
//            </Link>
//          </div>

//          <div className={styles.navCenter}>
//            <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
//              <Link href="/">Beranda</Link>
//              <Link href="/produk">Produk</Link>
//              <Link href="/TentangKami">Tentang Kami</Link>
//              <Link href="/bookingnavbar">Booking</Link>
//              <Link href="/kontak">Kontak</Link>
//            </nav>
//          </div>

//          <div className={styles.rightControls}>
//            <CartButton onClick={() => setSidebarOpen(true)} />
//            <div
//              className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
//              onClick={() => setMenuOpen((s) => !s)}
//              aria-label="Toggle menu"
//              role="button"
//              tabIndex={0}
//              onKeyDown={(e) => {
//                if (e.key === "Enter" || e.key === " ") setMenuOpen((s) => !s);
//              }}
//            >
//              <div className={styles.bar}></div>
//              <div className={styles.bar}></div>
//              <div className={styles.bar}></div>
//            </div>
//          </div>
//        </header>

//       <main>
//         <section className={styles.produkSection}>
//           <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
//             <h3>KAMI MENAWARKAN</h3>

//             {loading && <div style={{ textAlign: "center", padding: "2rem 0" }}>Memuat produk...</div>}

//             {error && (
//               <div style={{ background: "#fee2e2", color: "#9b1c1c", padding: 12, borderRadius: 8, marginBottom: 16 }}>
//                 Terjadi error: {error}
//               </div>
//             )}

//             {!loading && items.length === 0 && <div style={{ textAlign: "center", padding: "2rem 0" }}>Tidak ada file di folder ini.</div>}

//             <div className={styles.grid}>
//               {items.map((it) => {
//                 const key = `${it.fullPath}__${it.name}__${it.kategori}`;
//                 // const open = !!confirmOpenMap[key];
//                 const isOpen = !!confirmOpenMap[key];
//                 const confState = confirmStateMap[key] || { jenis: "PO", note: "" };

//                 return (
//                   // <article key={key} className={styles.card} onClick={() => window.open(it.url, "_blank")}>
//                   <article
//   key={key}
//   className={styles.card}
//   onClick={() => window.open(it.url, "_blank")}
//   style={{ overflow: "visible" }} // <- tambahan penting supaya popover tidak terpotong
// >

//                     <div className={styles.badge}>PT WAE MANDIRI KARYA</div>

//                     <img src={it.url} alt={it.name} />

//                     <div className={styles.info}>
//                       <h4>{sanitizeName(it.name)}</h4>
//                       <div className={styles.kategori}>Path: {it.fullPath}</div>
//                       <div className={styles.kategori}>Contact Pearson : {it.kategori}</div>

//                       <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//                         <a href={it.cetakporo} target="_blank" rel="noreferrer" className="link" onClick={(e) => e.stopPropagation()}>
//                           Cetak
//                         </a>

//                         <a
//                           href={buildWhatsAppLink(it.contact, it)}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="link"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                           }}
//                         >
//                           Contact
//                         </a>
//                       </div>
//                     </div>

//                     <div style={{ position: "absolute", bottom: 12, right: 12 }}>
//                       <div style={{ position: "relative" }}>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             // toggle popover untuk konfirmasi
//                             toggleConfirm(key);
//                           }}
//                         >
//                           Konfirmasi
//                         </button>

//                         {/* Popover kecil */}
//       {isOpen && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           // style={{
//           //   position: "absolute",
//           //   bottom: 44,
//           //   right: 0,
//           //   zIndex: 60,
//           //   minWidth: 260,
//           //   background: "#fff",
//           //   border: "1px solid rgba(0,0,0,0.08)",
//           //   boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
//           //   padding: 12,
//           //   borderRadius: 8,
//           //   // tambahan supaya semua kontak terlihat / bisa discroll
//           //   maxHeight: 360,
//           //   overflowY: "auto",
//           // }}
//            style={{
//       // position: "absolute",
//       // bottom: 44,
//       // right: 0,
//       // zIndex: 9999, // <- pastikan muncul di atas
//       // minWidth: 260,
//       // background: "#fff",
//       // border: "1px solid rgba(0,0,0,0.08)",
//       // boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
//       // padding: 12,
//       // borderRadius: 8,
//       // maxHeight: 320, // <- sedikit diperkecil agar tombol tetap terlihat
//       // overflowY: "auto",
//       // transform: "translateY(-6px)", // geser sedikit ke atas supaya tidak terlalu melekat di bawah
//             position: "absolute",
//         bottom: 44,
//         right: 0,
//         zIndex: 9999,               // tampil di atas semua
//         minWidth: 260,
//         background: "#fff",
//         border: "1px solid rgba(0,0,0,0.08)",
//         boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
//         padding: 12,
//         borderRadius: 8,
//         maxHeight: 320,            // batasi tinggi supaya muat di layar
//         overflowY: "auto",
//         pointerEvents: "auto",     // pastikan event klik diterima
//         paddingBottom: 72,         // beri ruang ekstra bawah supaya tombol tidak tertutup saat di-scroll
//         transform: "translateY(-6px)",
//     }}
//         >
//           <div style={{ marginBottom: 8, fontWeight: 600 }}>Konfirmasi lewat</div>

//           {/* jenis konfirmasi */}
//           <div style={{ marginBottom: 8 }}>
//             <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Jenis</label>
//             <select
//               value={(confStateMap[key] && confStateMap[key].jenis) || confState.jenis || "RO"}
//               onChange={(e) => updateConfirmState(key, { jenis: e.target.value })}
//               style={{ width: "100%", padding: 6 }}
//             >
//               <option value="RO">RO</option>
//               <option value="PO">PO</option>
//               <option value="Layanan">Layanan (sebutkan)</option>
//             </select>
//           </div>

//           {/* catatan */}
//           <div style={{ marginBottom: 8 }}>
//             <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Catatan (opsional)</label>
//             <input
//               value={(confStateMap[key] && confStateMap[key].note) ?? (confState.note || "")}
//               onChange={(e) => updateConfirmState(key, { note: e.target.value })}
//               placeholder="Contoh: jumlah / tanggal / catatan lain"
//               style={{ width: "100%", padding: 6 }}
//             />
//           </div>

//           {/* kontak list */}
//           {/* diganti: tampilkan satu-per-satu memakai ContactConfirmOneByOne */}
//           <div style={{ marginBottom: 8 }}>
//             <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Pilih Konfirmasi Kontak</label>

//             <ContactConfirmOneByOne
//               kontakList={KONTAK_KONFIRM}
//               item={it}
//               itemKey={key}
//               handleSendConfirmation={handleSendConfirmation}
//               autoAdvance={true}
//             />

//           </div>

//           {/* <div style={{ marginTop: 8, textAlign: "right" }}>
//             <button
//               type="button"
//               onClick={() => setConfirmOpen(key, false)}
//               style={{ padding: "6px 110px", borderRadius: 6, marginButtom: 322 }}
//             >
//               Batal
//             </button>
//           </div> */}
//                 {/* kita buat sticky supaya selalu terlihat di bagian bawah popover */}
//       <div
//         style={{
//           position: "sticky",
//           bottom: 100,
//           display: "flex",
//           justifyContent: "flex-end",
//           gap: 8,
//           marginTop: 8,
//           background: "transparent", // agar tidak menutupi content ketika di-scroll
//           zIndex: 10000,             // lebih atas dari isi popover
//         }}
//       >
//         <button
//           type="button"
//           onClick={() => setConfirmOpen(key, false)}
//           style={{ padding: "6px 10px", borderRadius: 6 }}
//         >
//           Batal
//         </button>

//         {/* Jika Anda masih ingin tombol Konfirmasi di sini (tambahan), contoh: */}
//         {/* <button
//           type="button"
//           onClick={() => handleSendConfirmation(key, KONTAK_KONFIRM[0].number, it)}
//           style={{ padding: "6px 10px", borderRadius: 6 }}
//         >
//           Konfirmasi
//         </button> */}
//       </div>
//         </div>
//       )}
//                       </div>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>

//             <div style={{ marginTop: 36 }} className={styles.cta}>
//               <h3>Butuh bantuan pilih produk?</h3>
//               <a href="/kontak">Hubungi Kami</a>
//             </div>
//           </div>
//         </section>

//         {/* <footer className={styles.footer}>© {new Date().getFullYear()} WMK — Semua hak dilindungi</footer> */}
//       </main>

//       {sidebarOpen && <div className={styles.cartOverlay} onClick={() => setSidebarOpen(false)}></div>}
//       <aside className={`${styles.cartSidebar} ${sidebarOpen ? styles.openSidebar : ""}`} aria-hidden={!sidebarOpen}>
//         <div className={styles.cartHeader}>
//           <strong>Keranjang</strong>
//           <button className={styles.closeCartBtn} onClick={() => setSidebarOpen(false)}>
//             Tutup
//           </button>
//         </div>

//         <div className={styles.cartContent}>
//           <p style={{ color: "#64748b" }}>Contoh keranjang sementara — ganti dengan implementasi state/Redux/Firebase kamu.</p>
//         </div>

//         <div className={styles.cartFooter}>
//           <button className={styles.closeCartBtnPrimary} onClick={() => alert("Proses checkout belum diimplementasikan")}>
//             Checkout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// /* helper kecil */
// function sanitizeName(name = "") {
//   return name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ");
// }

// function addToCart(item) {
//   try {
//     const prev = JSON.parse(localStorage.getItem("demo_cart") || "[]");
//     prev.push({ name: item.name, url: item.url, path: item.fullPath });
//     localStorage.setItem("demo_cart", JSON.stringify(prev));
//     console.info("Added to demo cart:", item.name);
//   } catch (e) {
//     console.error(e);
//   }
// }






// "use client"; PLISS BANGET IKI INI JANGAN DIHAPUS YAA IKI GANTENG

// import React, { useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import styles from "./produk.module.scss";
// // Firestore imports (ditambahkan)
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../lib/firebase";

// /**
//  * Simple CartButton lokal — kamu bisa ganti dengan komponen penuh yang sudah kamu punya.
//  */
// function CartButton({ onClick }) {
//   const [count, setCount] = useState(0);
//   // return (
//   //   <button
//   //     className={styles.keranjangBelanja}
//   //     onClick={() => {
//   //       setCount((c) => c + 1);
//   //       if (onClick) onClick();
//   //     }}
//   //     aria-label="Keranjang Belanja"
//   //     title="Keranjang Belanja"
//   //   >
//   //     🛒 {count > 0 && <span style={{ marginLeft: 6 }}>{count}</span>}
//   //   </button>
//   // );
// }

// // /* ====== NEW: helpers untuk WA link ====== */ function isFullUrl(str = "") { return /^https?:\/\//i.test(str); } function onlyDigits(str = "") { return (str || "").replace(/\D/g, ""); } /** * buildWhatsAppLink(contact, item) * - contact: bisa berupa full url (https://...), nomor telepon (string dengan angka/ + / 0), atau kosong * - item: object produk (dipakai untuk menyisipkan nama/ path di pesan) */ 
// // function buildWhatsAppLink(contact = "", item = {}) { const name = sanitizeName(item.name || ""); const path = item.fullPath || ""; const baseMessage = `Halo, saya ingin menanyakan tentang "${name}" (Path: ${path}). Bisa bantu informasinya? Terima kasih.`; const encodedMessage = encodeURIComponent(baseMessage); // jika contact adalah url penuh (mis. https://wa.me/...), gunakan langsung 
// // if (isFullUrl(contact)) { // jika url adalah wa.me atau api.whatsapp, tambahkan pesan jika belum ada 
// // if (/wa\.me|api\.whatsapp\.com/i.test(contact)) { // jika url sudah mengandung text=, biarkan; kalau tidak, tambahkan 
// // if (/[?&]text=/i.test(contact)) return contact; // tambahkan parameter text
// // return contact + (contact.includes("?") ? "&" : "?") + "text=" + encodedMessage; } return contact; } // kalau contact tampak seperti nomor telepon (ambil digit) 
// // const digits = onlyDigits(contact); if (digits.length >= 6) { // normalisasi: jika mulai dengan 0 -> ganti 0 dengan 62 (Indonesia) 
// // let normalized = digits; if (/^0/.test(contact.trim())) { normalized = digits.replace(/^0+/, "62"); } // jika kontak sudah berisi kode negara (mis. starts with 62 atau +62), digits sudah sesuai 
// // return `https://wa.me/${normalized}?text=${encodedMessage}`; } // fallback: buka chat WA tanpa nomor tetapi dengan pesan terisi (user bisa pilih kontak di WhatsApp Web) 
// // return `https://wa.me/?text=${encodedMessage}`; }

// /* ====== DEFAULT WA NUMBER (ubah di sini jika perlu) ====== */
// // const DEFAULT_WA_NUMBER = "6285817298071";
// const DEFAULT_WA_NUMBER = "+6285215949622";
// const DEFAULT_WA_NUMBER2 = "+6281111805974";

// /* ====== helpers untuk WA link (update) ====== */
// function isFullUrl(str = "") {
//   return /^https?:\/\//i.test(str);
// }
// function onlyDigits(str = "") {
//   return (str || "").replace(/\D/g, "");
// }

// /**
//  * buildWhatsAppLink(contact, item)
//  * - contact: bisa berupa full url (https://...), nomor telepon (string dengan angka/ + / 0), atau kosong
//  * - item: object produk (dipakai untuk menyisipkan nama/ path di pesan)
//  *
//  * Jika contact kosong / tidak valid, akan fallback ke DEFAULT_WA_NUMBER.
//  */
// function buildWhatsAppLink(contact = "", item = {}) {
//   const name = sanitizeName(item.name || "");
//   // const path = item.fullPath || "";
//   const kategori = item.kategori || "";
//   // const baseMessage = `Halo, saya ingin menanyakan tentang "${name}" (Path: ${path}) dengan (Contact Pearson: ${kategori}). Bisa bantu informasinya? Terima kasih.`;
//     const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin menanyakan tentang "${name}". Silahkan Mengisi Biodata dibawah ini: \n 

// Nama Lengkap: 
// Email: 
// Nama Perusahaan: 
// Posisi di Perusahaan: 
// Departemen: 
// Alamat Kantor: 
// Kontak Lain (opsional):
 
// dengan (Contact Person: ${kategori}). Bisa bantu informasinya? Terima kasih.`;
//   // const baseMessage = `Halo, saya ingin menanyakan tentang ${jenisLabel} untuk "${name}"\n Silahkan Mengii Biodata dibawah: \n Nama Lengkap: \n Email: \n Nama Perusahaan: \n Jabatan / Posisi di Perusahaan: \n Nama Divisi / Departemen: \n Alamat Kantor / Cabang: \n Nomor Darurat / Kontak Lain (opsional) \n  dengan (Contact Pearson: ${kategori}). ${note ? "Catatan: " + note : ""} Mohon bantuannya. Terima kasih.`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   // jika contact adalah url penuh (mis. https://wa.me/...), gunakan langsung (tambahkan text jika perlu)
//   if (isFullUrl(contact)) {
//     if (/wa\.me|api\.whatsapp\.com/i.test(contact)) {
//       if (/[?&]text=/i.test(contact)) return contact;
//       return contact + (contact.includes("?") ? "&" : "?") + "text=" + encodedMessage;
//     }
//     return contact;
//   }

//   // ambil digit dari contact
//   const digits = onlyDigits(contact);

//   // jika contact valid (cukup digit), normalisasi dan gunakan
//   if (digits.length >= 6) {
//     let normalized = digits;
//     if (/^0/.test(contact.trim())) {
//       normalized = digits.replace(/^0+/, "62"); // ubah leading 0 -> 62
//     }
//     return `https://wa.me/${normalized}?text=${encodedMessage}`;
//   }

//   // fallback: pakai DEFAULT_WA_NUMBER
//   const fallbackDigits = onlyDigits(DEFAULT_WA_NUMBER);
//   return `https://wa.me/${fallbackDigits}?text=${encodedMessage}`;
// }



// function buildWhatsAppLink2(contact = "", item = {}) {
//   const name = sanitizeName(item.name || "");
//   // const path = item.fullPath || "";
//   const kategori = item.kategori || "";
//   // const baseMessage = `Halo, saya ingin menanyakan tentang "${name}" (Path: ${path}) dengan (Contact Pearson: ${kategori}). Bisa bantu informasinya? Terima kasih.`;
//     const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin menanyakan tentang "${name}". Silahkan Mengisi Biodata dibawah ini: \n 

// Nama Lengkap: 
// Email: 
// Nama Perusahaan: 
// Posisi di Perusahaan: 
// Departemen: 
// Alamat Kantor: 
// Kontak Lain (opsional):

// dengan (Contact Person: ${kategori}). Bisa bantu informasinya? Terima kasih.`;
//   // const baseMessage = `Halo, saya ingin menanyakan tentang ${jenisLabel} untuk "${name}"\n Silahkan Mengii Biodata dibawah: \n Nama Lengkap: \n Email: \n Nama Perusahaan: \n Jabatan / Posisi di Perusahaan: \n Nama Divisi / Departemen: \n Alamat Kantor / Cabang: \n Nomor Darurat / Kontak Lain (opsional) \n  dengan (Contact Pearson: ${kategori}). ${note ? "Catatan: " + note : ""} Mohon bantuannya. Terima kasih.`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   // jika contact adalah url penuh (mis. https://wa.me/...), gunakan langsung (tambahkan text jika perlu)
//   if (isFullUrl(contact)) {
//     if (/wa\.me|api\.whatsapp\.com/i.test(contact)) {
//       if (/[?&]text=/i.test(contact)) return contact;
//       return contact + (contact.includes("?") ? "&" : "?") + "text=" + encodedMessage;
//     }
//     return contact;
//   }

//   // ambil digit dari contact
//   const digits = onlyDigits(contact);

//   // jika contact valid (cukup digit), normalisasi dan gunakan
//   if (digits.length >= 6) {
//     let normalized = digits;
//     if (/^0/.test(contact.trim())) {
//       normalized = digits.replace(/^0+/, "62"); // ubah leading 0 -> 62
//     }
//     return `https://wa.me/${normalized}?text=${encodedMessage}`;
//   }

//   // fallback: pakai DEFAULT_WA_NUMBER
//   const fallbackDigits = onlyDigits(DEFAULT_WA_NUMBER2);
//   return `https://wa.me/${fallbackDigits}?text=${encodedMessage}`;
// }


// /**
//  * buildWhatsAppLinkForNumber(number, item, jenis, note)
//  * - number: nomor telepon (string) — harus berisi angka dan/atau +/0
//  * - jenis: "RO" | "PO" | "Layanan"
//  * - note: string (opsional)
//  */
// function buildWhatsAppLinkForNumber(number = "", item = {}, jenis = "RO", note = "") {
//   const name = sanitizeName(item.name || "");
//   // const path = item.fullPath || "";
//   const kategori = item.kategori || "";
//   // jika jenis Layanan, user mungkin menulis detail di note
//   const jenisLabel = jenis === "Layanan" ? "Layanan" : jenis;
//   // const baseMessage = `Halo, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}" (Path: ${path}) dengan (Contact Pearson: ${kategori}). ${note ? "Catatan: " + note : ""} Mohon bantuannya. Terima kasih.`;
//   const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}". Silahkan Mengisi Biodata dibawah ini:
  
// Nama Lengkap: 
// Email:
// Nama Perusahaan:
// Posisi di Perusahaan:
// Departemen:
// Alamat Kantor:
// Kontak Lain (opsional):
  
// dengan (Contact Person: ${kategori}).

// Catatan : ${note}. Mohon bantuannya. Terima kasih.`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   // normalisasi nomor
//   const digits = onlyDigits(number);
//   let normalized = digits;
//   if (/^0/.test(number.trim())) {
//     normalized = digits.replace(/^0+/, "62");
//   }
//   if (!normalized || normalized.length < 6) {
//     normalized = onlyDigits(DEFAULT_WA_NUMBER);
//   }

//   return `https://wa.me/${normalized}?text=${encodedMessage}`;
// }

// function buildWhatsAppLinkForNumber2(number = "", item = {}, jenis = "RO", note = "") {
//   const name = sanitizeName(item.name || "");
//   // const path = item.fullPath || "";
//   const kategori = item.kategori || "";
//   // jika jenis Layanan, user mungkin menulis detail di note
//   const jenisLabel = jenis === "Layanan" ? "Layanan" : jenis;
//   // const baseMessage = `Halo, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}" (Path: ${path}) dengan (Contact Pearson: ${kategori}). ${note ? "Catatan: " + note : ""} Mohon bantuannya. Terima kasih.`;
//   const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}". Silahkan Mengisi Biodata dibawah:
  
//  Nama Lengkap: 
//  Email:
//  Nama Perusahaan:
//  Posisi di Perusahaan:
//  Departemen:
//  Alamat Kantor:
//  Kontak Lain (opsional):
  
//  dengan (Contact Pearson: ${kategori}).

//  Catatan : ${note}. Mohon bantuannya. Terima kasih.`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   // normalisasi nomor
//   const digits = onlyDigits(number);
//   let normalized = digits;
//   if (/^0/.test(number.trim())) {
//     normalized = digits.replace(/^0+/, "62");
//   }
//   if (!normalized || normalized.length < 6) {
//     normalized = onlyDigits(DEFAULT_WA_NUMBER2);
//   }

//   return `https://wa.me/${normalized}?text=${encodedMessage}`;
// }


// /* helper kecil */
// // function sanitizeName(name = "") {
// //   return name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ");
// // }

// // function addToCart(item) {
// //   try {
// //     const prev = JSON.parse(localStorage.getItem("demo_cart") || "[]");
// //     prev.push({ name: item.name, url: item.url, path: item.fullPath });
// //     localStorage.setItem("demo_cart", JSON.stringify(prev));
// //     console.info("Added to demo cart:", item.name);
// //   } catch (e) {
// //     console.error(e);
// //   }
// // }

// /* ================================================= */
// /* Kontak konfirmasi (ubah nomor di sini jika perlu) */
// const KONTAK_KONFIRM = [
//   { label: "Fidelya", number: "6285215949622" },
//   { label: "Bahtiar", number: "6281111805974" },
//   // { label: "Livia", number: "6289654378362" },
// ];

// /**
//  * ContactConfirmOneByOne
//  * - Menampilkan kontak satu-per-satu dari kontakList
//  * - Menambahkan swipe kiri/kanan (mobile) untuk ganti kontak
//  * - Menyertakan click pada nomor untuk langsung kirim WA
//  */
// function ContactConfirmOneByOne({
//   kontakList = KONTAK_KONFIRM,
//   item,            // sama dengan `it` di kode Anda
//   itemKey,         // sama dengan `key` di kode Anda (identifier item)
//   handleSendConfirmation, // function (itemKey, number, item)
//   autoAdvance = true,     // opsi: setelah kirim maju ke kontak selanjutnya
// }) {
//   const [index, setIndex] = useState(0);
//   const total = kontakList.length;
//   const current = kontakList[index];

//   // touch/swipe handlers
//   const touchStartXRef = useRef(null);
//   const touchCurrentXRef = useRef(null);
//   const SWIPE_THRESHOLD = 40; // px

//   const onTouchStart = (e) => {
//     if (!e.touches || e.touches.length === 0) return;
//     touchStartXRef.current = e.touches[0].clientX;
//     touchCurrentXRef.current = e.touches[0].clientX;
//   };

//   const onTouchMove = (e) => {
//     if (!e.touches || e.touches.length === 0) return;
//     touchCurrentXRef.current = e.touches[0].clientX;
//   };

//   const onTouchEnd = (e) => {
//     const start = touchStartXRef.current;
//     const end = touchCurrentXRef.current;
//     if (start == null || end == null) return;
//     const diff = end - start;
//     if (Math.abs(diff) > SWIPE_THRESHOLD) {
//       if (diff > 0) {
//         // swipe right -> prev
//         setIndex((i) => Math.max(0, i - 1));
//       } else {
//         // swipe left -> next
//         setIndex((i) => Math.min(total - 1, i + 1));
//       }
//     }
//     touchStartXRef.current = null;
//     touchCurrentXRef.current = null;
//   };

//   const onPrev = (e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     setIndex((i) => Math.max(0, i - 1));
//   };

//   const onNext = (e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     setIndex((i) => Math.min(total - 1, i + 1));
//   };

//   const onSend = (e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     if (typeof handleSendConfirmation === "function") {
//       handleSendConfirmation(itemKey, current.number, item);
//     }
//     if (autoAdvance && index < total - 1) {
//       setIndex((i) => i + 1);
//     }
//   };

//   // klik langsung pada nomor juga kirim WA
//   const onClickNumber = (e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     if (typeof handleSendConfirmation === "function") {
//       handleSendConfirmation(itemKey, current.number, item);
//     }
//   };

//   return (
//     <div
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEnd}
//       style={{ display: "flex", flexDirection: "column", gap: 8 }}
//     >
//       <div style={{ fontSize: 13, marginBottom: 4, color: "#374151" }}>Kontak {index + 1} dari {total}</div>

//       <div style={{
//         padding: 10,
//         borderRadius: 8,
//         border: "1px solid rgba(0,0,0,0.06)",
//         background: "#fafafa",
//         display: "flex",
//         flexDirection: "column",
//         gap: 6
//       }}>
//         <div style={{ fontWeight: 700 }}>{current.label}</div>
//         <div
//           style={{ fontSize: 13, color: "#4b5563", cursor: "pointer", userSelect: "text" }}
//           onClick={onClickNumber}
//           title="Klik untuk buka WhatsApp"
//         >
//           {current.number}
//         </div>

//         {/* <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//           <button
//             type="button"
//             onClick={onPrev}
//             style={{
//               padding: "6px 8px",
//               borderRadius: 6,
//               border: "1px solid rgba(0,0,0,0.06)",
//               background: "#fff",
//               cursor: index === 0 ? "not-allowed" : "pointer",
//               opacity: index === 0 ? 0.6 : 1
//             }}
//             disabled={index === 0}
//           >
//             Prev
//           </button>

//           <button
//             type="button"
//             onClick={onSend}
//             style={{
//               padding: "6px 10px",
//               borderRadius: 6,
//               border: "1px solid rgba(0,0,0,0.06)",
//               background: "#ecfdf5",
//               cursor: "pointer",
//               marginLeft: "auto"
//             }}
//           >
//             Kirim
//           </button>

//           <button
//             type="button"
//             onClick={onNext}
//             style={{
//               padding: "6px 8px",
//               borderRadius: 6,
//               border: "1px solid rgba(0,0,0,0.06)",
//               background: "#fff",
//               cursor: index === total - 1 ? "not-allowed" : "pointer",
//               opacity: index === total - 1 ? 0.6 : 1
//             }}
//             disabled={index === total - 1}
//           >
//             Next
//           </button>
//         </div> */}

//         <div style={{ fontSize: 12, color: "#6b7280" }}>
//           <em>Tip: geser (swipe) kiri/kanan untuk berpindah kontak di perangkat sentuh.</em>
//         </div>
//         <div style={{ display: "flex", gap: 2, marginTop: 18 }}>
//   <button
//     type="button"
//     onClick={onPrev}
//     style={{
//       position: "relative",
//       zIndex: 10010,
//       pointerEvents: "auto",
//       padding: "6px 8px",
//       left: 5,
//       borderRadius: 6,
//       border: "1px solid rgba(0,0,0,0.06)",
//       background: "#0d3a5b",
//       cursor: index === 0 ? "not-allowed" : "pointer",
//       opacity: index === 0 ? 0.6 : 1
//     }}
//     disabled={index === 0}
//   >
//     Prev
//   </button>

//   <button
//     type="button"
//     onClick={onSend}
//     style={{
//       position: "relative",
//       zIndex: 10010,
//       pointerEvents: "auto",
//       padding: "6px 10px",
//       borderRadius: 6,
//       border: "1px solid rgba(0,0,0,0.06)",
//       background: "##dc2626",
//       cursor: "pointer",
//       marginLeft: "auto"
//     }}
//   >
//     Kirim
//   </button>

//   <button
//     type="button"
//     onClick={onNext}
//     style={{
//       position: "relative",
//       zIndex: 10010,
//       pointerEvents: "auto",
//       padding: "6px 8px",
//       borderRadius: 6,
//       border: "1px solid rgba(0,0,0,0.06)",
//       background: "#0d3a5b",
//       cursor: index === total - 1 ? "not-allowed" : "pointer",
//       opacity: index === total - 1 ? 0.6 : 1
//     }}
//     disabled={index === total - 1}
//   >
//     Next
//   </button>
// </div>
//       </div>
//     </div>
//   );
// }
// /* ================================================= */


// function ContactConfirmOneByOnePlaceholder() {
//   // placeholder jika ingin, tidak digunakan langsung — tetap mempertahankan struktur file
//   return null;
// }

// export default function ProdukPage({ storagePath = "produk_complus" }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);


//     // state untuk popover Konfirmasi per item (store map of fullPath->open)
//   const [confirmOpenMap, setConfirmOpenMap] = useState({}); // { [key]: true }
//   // state detail untuk setiap popover: jenis + note
//   const [confirmStateMap, setConfirmStateMap] = useState({}); // { [key]: { jenis, note } }


//   // const [confirmOpenMap, setConfirmOpenMap] = useState({}); // object keyed by 'key'
// const [confStateMap, setConfStateMap] = useState({}); // optional, per-row conf state

//   // close popovers when clicking outside
//   const outerRef = useRef(null);
//   useEffect(() => {
//     function onDocClick(e) {
//       if (!outerRef.current) return;
//       if (!outerRef.current.contains(e.target)) {
//         setConfirmOpenMap({});
//       }
//     }
//     document.addEventListener("click", onDocClick);
//     return () => document.removeEventListener("click", onDocClick);
//   }, []);

  

// //   useEffect(() => {
// //   let cancelled = false;

// //   async function fetchAll() {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       // Derive base URL safely (remove trailing slash jika ada)
// //       const rawBase = process.env.NEXT_PUBLIC_API_BASE || "";
// //       const base = rawBase ? rawBase.replace(/\/+$/, "") : "";

// //       // Jika frontend & API di domain sama (misal deploy di Vercel bersama),
// //       // lebih aman gunakan relative endpoint untuk menghindari CORS:
// //       const sameOrigin = typeof window !== "undefined" && base && window.location.origin === base;
// //       const url = sameOrigin
// //         ? "/listFiles"
// //         : base
// //         ? `${base}/listFiles`
// //         : "/listFiles"; // fallback ke relative supaya dev lokal tetap jalan

// //       const res = await fetch(url, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (!res.ok) {
// //         const text = await res.text().catch(() => "");
// //         throw new Error(`API error: ${res.status} ${text}`);
// //       }

// //       const data = await res.json();

// //       if (!cancelled) {
// //         setItems(
// //           Array.isArray(data)
// //             ? data.map((d) => ({
// //                 name: d.name,
// //                 url: d.url,
// //                 fullPath: d.fullPath || d.name,
// //               }))
// //             : []
// //         );
// //       }
// //     } catch (err) {
// //       console.error("Gagal mengambil data dari API:", err);
// //       if (!cancelled) setError(err?.message || "Gagal mengambil file dari API");
// //     } finally {
// //       if (!cancelled) setLoading(false);
// //     }
// //   }

// //   fetchAll();
// //   return () => {
// //     cancelled = true;
// //   };
// // }, [storagePath]);

// useEffect(() => {
// let cancelled = false;


// // fungsi baru: coba ambil dari Firestore (collection "produk")
// async function loadFromFirestore() {
//   try {
//     setLoading(true);
//     setError(null);
//     const snap = await getDocs(collection(db, "produk"));
//     const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     if (!cancelled) {
//       // map ke format yang dipakai komponen (name, url, fullPath)
//       const mapped = arr.map((p) => ({
//         name: p.nama || p.name || (p.gambarUrl ? p.gambarUrl.split("/").pop() : "unknown"),
//         url: p.gambarUrl || p.url || "",
//         kategori: p.kategori || "",
//         fullPath: p.path || p.fullPath || p.storagePath || (p.gambarUrl ? p.gambarUrl.split("/").pop() : ""),
//       }));
//       // set only jika ada hasil — jika kosong, biarkan fallback ke listFiles
//       if (mapped.length > 0) {
//         setItems(mapped);
//         return true; // menandakan sukses pakai firestore
//       }
//     }
//   } catch (e) {
//     console.warn("loadFromFirestore gagal:", e);
//     if (!cancelled) setError(String(e?.message || e));
//   } finally {
//     // jangan setLoading(false) di sini karena fetchAll/flow utama yang mengatur loading akhir
//   }
//   return false;
// }

// async function fetchAll() {
//   setLoading(true);
//   setError(null);

//   try {
//     // Derive base URL safely (remove trailing slash jika ada)
//     const rawBase = process.env.NEXT_PUBLIC_API_BASE || "";
//     const base = rawBase ? rawBase.replace(/\/+$/, "") : "";

//     // Jika frontend & API di domain sama (misal deploy di Vercel bersama),
//     // lebih aman gunakan relative endpoint untuk menghindari CORS:
//     const sameOrigin = typeof window !== "undefined" && base && window.location.origin === base;
//     const url = sameOrigin
//       ? "/listFiles"
//       : base
//       ? `${base}/listFiles`
//       : "/listFiles"; // fallback ke relative supaya dev lokal tetap jalan

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // debug: non-cache untuk memastikan tidak baca cache lama
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const text = await res.text().catch(() => "");
//       throw new Error(`API error: ${res.status} ${text}`);
//     }

//     const data = await res.json();

//     if (!cancelled) {
//       setItems(
//         Array.isArray(data)
//           ? data.map((d) => ({
//               name: d.name,
//               url: d.url,
//               kategori: d.kategori || "",
//               fullPath: d.fullPath || d.name,
//             }))
//           : []
//       );
//     }
//   } catch (err) {
//     console.error("Gagal mengambil data dari API:", err);
//     if (!cancelled) setError(err?.message || "Gagal mengambil file dari API");
//   } finally {
//     if (!cancelled) setLoading(false);
//   }
// }

// // Flow: coba Firestore dulu -> jika tidak berhasil (kosong/gagal) fallback ke listFiles
// (async () => {
//   const usedFirestore = await loadFromFirestore();
//   if (!cancelled) {
//     if (usedFirestore) {
//       // sudah set items dari Firestore; hentikan loading
//       setLoading(false);
//     } else {
//       // fallback ke listFiles jika Firestore kosong atau gagal
//       await fetchAll();
//     }
//   }
// })();

// return () => {
//   cancelled = true;
// };


// }, [storagePath]);


//   // // helper untuk toggle popover konfirmasi untuk item key
//   // const toggleConfirm = (key) => {
//   //   setConfirmOpenMap((m) => ({ ...m, [key]: !m[key] }));
//   //   // init default confirmState bila belum ada
//   //   setConfirmStateMap((s) => ({ ...s, [key]: s[key] || { jenis: "PO", note: "" } }));
//   // };

//   // const updateConfirmState = (key, patch) => {
//   //   setConfirmStateMap((s) => ({ ...s, [key]: { ...(s[key] || {}), ...patch } }));
//   // };

//   const handleSendConfirmation = (key, contactNumber, item) => {
//     // Perbaikan: baca dari confirmStateMap (yang lama) atau confStateMap (yang kita pakai untuk input)
//     const stateA = confirmStateMap[key];
//     const stateB = confStateMap[key];
//     const state = stateA || stateB || { jenis: "RO", note: "" };
//     const jenis = state.jenis || "RO";
//     const note = state.note || "";

//     const waUrl = buildWhatsAppLinkForNumber(contactNumber, item, jenis, note);
//     // open WA in new tab
//     try {
//       window.open(waUrl, "_blank", "noopener,noreferrer");
//     } catch (e) {
//       // fallback - set location (untested but cover some environments)
//       window.location.href = waUrl;
//     }
//     // close popover
//     setConfirmOpenMap((m) => ({ ...m, [key]: false }));
//   };


// /* helper toggle per key (sesuaikan dengan implementasi Anda) */
// const toggleConfirm = (key) => {
//   setConfirmOpenMap(prev => ({ ...prev, [key]: !prev[key] }));
// };

// const setConfirmOpen = (key, value) => {
//   setConfirmOpenMap(prev => ({ ...prev, [key]: value }));
// };

// /* contoh updateConfirmState per-row */
// const updateConfirmState = (key, patch) => {
//   setConfStateMap(prev => ({ ...prev, [key]: { ...(prev[key] || {}), ...patch } }));
// };

// /* ubah open boolean menjadi per-key: */
// // const isOpen = !!confirmOpenMap[key];


//   return (
//     <>
//       {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
// {/* {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />} */}

//         <header className={styles.header}>
//           <div className={styles.logoContainer}>
//             <Link href="/">
//               <img src="/wmk-logo.jpeg" alt="Compluss Logo" className={styles.logoImage} />
//             </Link>
//           </div>

//           <div className={styles.navCenter}>
//             <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
//               <Link href="/">Beranda</Link>
//               <Link href="/produk">Produk</Link>
//               <Link href="/TentangKami">Tentang Kami</Link>
//               <Link href="/bookingnavbar">Booking</Link>
//               <Link href="/kontak">Kontak</Link>
//             </nav>
//           </div>
//           <div className={styles.rightControls}>
//             <CartButton onClick={() => setSidebarOpen(true)} />
//             <div
//               className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
//               onClick={() => setMenuOpen((s) => !s)}
//               aria-label="Toggle menu"
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") setMenuOpen((s) => !s);
//               }}
//             >
//               <div className={styles.bar}></div>
//               <div className={styles.bar}></div>
//               <div className={styles.bar}></div>
//             </div>
//           </div>
//         </header>
//       <main>
//         <section className={styles.produkSection}>
//           <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
//             <h3>HUBUNGI KAMI</h3>

//             {loading && <div style={{ textAlign: "center", padding: "2rem 0" }}>Memuat produk...</div>}

//             {error && (
//               <div style={{ background: "#fee2e2", color: "#9b1c1c", padding: 12, borderRadius: 8, marginBottom: 16 }}>
//                 Terjadi error: {error}
//               </div>
//             )}

//             {!loading && items.length === 0 && <div style={{ textAlign: "center", padding: "2rem 0" }}>Tidak ada file di folder ini.</div>}

//             <div className={styles.grid}>
//               {items.map((it) => {
//                 const key = `${it.fullPath}__${it.name}__${it.kategori}`;
//                 // const open = !!confirmOpenMap[key];
//                 const isOpen = !!confirmOpenMap[key];
//                 const confState = confirmStateMap[key] || { jenis: "PO", note: "" };

//                 return (
//                   // <article key={key} className={styles.card} onClick={() => window.open(it.url, "_blank")}>
//                   <article
//   key={key}
//   className={styles.card}
//   onClick={() => window.open(it.url, "_blank")}
//   style={{ overflow: "visible" }} // <- tambahan penting supaya popover tidak terpotong
// >

//                     <div className={styles.badge}>PT WAE MANDIRI KARYA</div>

//                     <img src={it.url} alt={it.name} />

//                     <div className={styles.info}>
//                       <h4>{sanitizeName(it.name)}</h4>
//                       {/* <div className={styles.kategori}>Path: {it.fullPath}</div> */}
//                       <div className={styles.kategori}>Contact Person : {it.kategori}</div>

//                       <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//                         <a href={it.cetakporo} target="_blank" rel="noreferrer" className="link" onClick={(e) => e.stopPropagation()}>
//                           Cetak
//                         </a>

//                         {/* <a
//                           href={buildWhatsAppLink(it.contact, it)}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="link"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                           }}
//                         >
//                           Contact
//                         </a> */}
//                         <a
//   href={
//     sanitizeName(it.name || "").toUpperCase() === "MATERIAL"
//       ? buildWhatsAppLink2(it.contact, it)
//       : buildWhatsAppLink(it.contact, it)
//   }
//   target="_blank"
//   rel="noopener noreferrer"
//   className="link"
//   onClick={(e) => {
//     e.stopPropagation();
//   }}
// >
//   Contact
// </a>

//                       </div>
//                     </div>

//                     <div style={{ position: "absolute", bottom: 12, right: 12 }}>
//                       <div style={{ position: "relative" }}>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             // toggle popover untuk konfirmasi
//                             toggleConfirm(key);
//                           }}
//                         >
//                           Konfirmasi
//                         </button>

//                         {/* Popover kecil */}
//       {isOpen && (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           // style={{
//           //   position: "absolute",
//           //   bottom: 44,
//           //   right: 0,
//           //   zIndex: 60,
//           //   minWidth: 260,
//           //   background: "#fff",
//           //   border: "1px solid rgba(0,0,0,0.08)",
//           //   boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
//           //   padding: 12,
//           //   borderRadius: 8,
//           //   // tambahan supaya semua kontak terlihat / bisa discroll
//           //   maxHeight: 360,
//           //   overflowY: "auto",
//           // }}
//            style={{
//       // position: "absolute",
//       // bottom: 44,
//       // right: 0,
//       // zIndex: 9999, // <- pastikan muncul di atas
//       // minWidth: 260,
//       // background: "#fff",
//       // border: "1px solid rgba(0,0,0,0.08)",
//       // boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
//       // padding: 12,
//       // borderRadius: 8,
//       // maxHeight: 320, // <- sedikit diperkecil agar tombol tetap terlihat
//       // overflowY: "auto",
//       // transform: "translateY(-6px)", // geser sedikit ke atas supaya tidak terlalu melekat di bawah
//             position: "absolute",
//         bottom: 44,
//         right: 0,
//         zIndex: 9999,               // tampil di atas semua
//         minWidth: 260,
//         background: "#fff",
//         border: "1px solid rgba(0,0,0,0.08)",
//         boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
//         padding: 12,
//         borderRadius: 8,
//         maxHeight: 320,            // batasi tinggi supaya muat di layar
//         overflowY: "auto",
//         pointerEvents: "auto",     // pastikan event klik diterima
//         paddingBottom: 72,         // beri ruang ekstra bawah supaya tombol tidak tertutup saat di-scroll
//         transform: "translateY(-6px)",
//     }}
//         >
//           <div style={{ marginBottom: 8, fontWeight: 600 }}>Konfirmasi lewat</div>

//           {/* jenis konfirmasi */}
//           <div style={{ marginBottom: 8 }}>
//             <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Jenis</label>
//             <select
//               value={(confStateMap[key] && confStateMap[key].jenis) || confState.jenis || "RO"}
//               onChange={(e) => updateConfirmState(key, { jenis: e.target.value })}
//               style={{ width: "100%", padding: 6 }}
//             >
//               <option value="RO">RO (Request Order)</option>
//               {/* <option value="PO">PO</option> */}
//               {/* <option value="Layanan">Layanan (sebutkan)</option> */}
//             </select>
//           </div>

//           {/* catatan */}
//           <div style={{ marginBottom: 8 }}>
//             <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Catatan (opsional)</label>
//             <input
//               value={(confStateMap[key] && confStateMap[key].note) ?? (confState.note || "")}
//               onChange={(e) => updateConfirmState(key, { note: e.target.value })}
//               placeholder="Contoh: jumlah / tanggal / catatan lain"
//               style={{ width: "100%", padding: 6 }}
//             />
//           </div>

//           {/* kontak list */}
//           {/* diganti: tampilkan satu-per-satu memakai ContactConfirmOneByOne */}
//           <div style={{ marginBottom: 8 }}>
//             <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Pilih Konfirmasi Kontak</label>

//             <ContactConfirmOneByOne
//               kontakList={KONTAK_KONFIRM}
//               item={it}
//               itemKey={key}
//               handleSendConfirmation={handleSendConfirmation}
//               autoAdvance={true}
//             />

//           </div>

//           {/* <div style={{ marginTop: 8, textAlign: "right" }}>
//             <button
//               type="button"
//               onClick={() => setConfirmOpen(key, false)}
//               style={{ padding: "6px 110px", borderRadius: 6, marginButtom: 322 }}
//             >
//               Batal
//             </button>
//           </div> */}
//                 {/* kita buat sticky supaya selalu terlihat di bagian bawah popover */}
//       <div
//         style={{
//           position: "sticky",
//           bottom: 100,
//           display: "flex",
//           justifyContent: "flex-end",
//           gap: 8,
//           marginTop: 8,
//           background: "transparent", // agar tidak menutupi content ketika di-scroll
//           zIndex: 10000,             // lebih atas dari isi popover
//         }}
//       >
//         <button
//           type="button"
//           onClick={() => setConfirmOpen(key, false)}
//           style={{ padding: "6px 10px", borderRadius: 6 }}
//         >
//           Batal
//         </button>

//         {/* Jika Anda masih ingin tombol Konfirmasi di sini (tambahan), contoh: */}
//         {/* <button
//           type="button"
//           onClick={() => handleSendConfirmation(key, KONTAK_KONFIRM[0].number, it)}
//           style={{ padding: "6px 10px", borderRadius: 6 }}
//         >
//           Konfirmasi
//         </button> */}
//       </div>
//         </div>
//       )}
//                       </div>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>

//             <div style={{ marginTop: 36 }} className={styles.cta}>
//               <h3>Butuh bantuan pilih produk?</h3>
//               <a href="/kontak">Hubungi Kami</a>
//             </div>
//           </div>
//         </section>

//         {/* <footer className={styles.footer}>© {new Date().getFullYear()} WMK — Semua hak dilindungi</footer> */}
//       </main>

//       {sidebarOpen && <div className={styles.cartOverlay} onClick={() => setSidebarOpen(false)}></div>}
//       <aside className={`${styles.cartSidebar} ${sidebarOpen ? styles.openSidebar : ""}`} aria-hidden={!sidebarOpen}>
//         <div className={styles.cartHeader}>
//           <strong>Keranjang</strong>
//           <button className={styles.closeCartBtn} onClick={() => setSidebarOpen(false)}>
//             Tutup
//           </button>
//         </div>

//         <div className={styles.cartContent}>
//           <p style={{ color: "#64748b" }}>Contoh keranjang sementara — ganti dengan implementasi state/Redux/Firebase kamu.</p>
//         </div>

//         <div className={styles.cartFooter}>
//           <button className={styles.closeCartBtnPrimary} onClick={() => alert("Proses checkout belum diimplementasikan")}>
//             Checkout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// /* helper kecil */
// function sanitizeName(name = "") {
//   return name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ");
// }

// function addToCart(item) {
//   try {
//     const prev = JSON.parse(localStorage.getItem("demo_cart") || "[]");
//     prev.push({ name: item.name, url: item.url, path: item.fullPath });
//     localStorage.setItem("demo_cart", JSON.stringify(prev));
//     console.info("Added to demo cart:", item.name);
//   } catch (e) {
//     console.error(e);
//   }
// }











"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "./produk.module.scss";
// Firestore imports (ditambahkan)
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { FALLBACK_ITEMS, getFallbackImage, handleImgError, withTimeout } from "../lib/localFallback";

/**
 * Simple CartButton lokal — kamu bisa ganti dengan komponen penuh yang sudah kamu punya.
 */
function CartButton({ onClick }) {
  const [count, setCount] = useState(0);
  // return (
  //   <button onClick={onClick} aria-label="Open cart" className={styles.cartBtn}>
  //     Keranjang ({count})
  //   </button>
  // );
}

/* ====== DEFAULT WA NUMBER (ubah di sini jika perlu) ====== */
// const DEFAULT_WA_NUMBER = "6285817298071";
const DEFAULT_WA_NUMBER = "+6285215949622";
const DEFAULT_WA_NUMBER2 = "+6281111805974";

/* ====== helpers untuk WA link (update) ====== */
function isFullUrl(str = "") {
  return /^https?:\/\//i.test(str);
}
function onlyDigits(str = "") {
  return (str || "").replace(/\D/g, "");
}



const PERCENT_EMOJI = "%F0%9F%99%8F"; // 🙏 sebagai percent-encoded

// --- helper: buat emoji runtime & ensure emoji di URL existing ---
function _getPrayerEmoji() {
  return String.fromCodePoint(0x1F64F); // 🙏
}

function _ensureEmojiInUrl(url, emoji, encodedBodyIfNeeded = "") {
  if (/[?&]text=/i.test(url)) {
    return url.replace(/([?&]text=)([^&]*)/, function(_, prefix, encVal) {
      try {
        const decoded = decodeURIComponent(encVal || "");
        const withEmoji = (decoded + " " + emoji).trim();
        return prefix + encodeURIComponent(withEmoji);
      } catch (e) {
        return prefix + encVal + "%20" + encodeURIComponent(emoji);
      }
    });
  }
  return url + (url.includes("?") ? "&" : "?") + "text=" + (encodedBodyIfNeeded ? encodedBodyIfNeeded + "%20" + PERCENT_EMOJI : PERCENT_EMOJI);
}

// --- helper: force-fix any replacement-char corruption in URL (quick & safe) ---
function _fixReplacementCharInUrl(url) {
  if (!url) return url;
  // 1) Replace percent-encoded U+FFFD sequences that became %EF%BF%BD
  url = url.replace(/%EF%BF%BD/g, '%F0%9F%99%8F');
  // 2) Replace any raw replacement character U+FFFD (�) with percent-encoded emoji
  url = url.replace(/\uFFFD/g, encodeURIComponent(String.fromCodePoint(0x1F64F)));
  return url;
}

// --- buildWhatsAppLinkForNumber (versi aman + fix replace) ---
function buildWhatsAppLinkForNumber(number = "", item = {}, jenis = "RO", note = "") {
  const EMOJI = _getPrayerEmoji();
  const name = sanitizeName(item.name || "");
  const kategori = item.kategori || "";
  const jenisLabel = jenis === "Layanan" ? "Layanan" : jenis;

  const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}". Mohon untuk mengisi form terlebih dahulu:
  
Nama: 
Email:
Nama Perusahaan:
Departemen:
Kontak Lain (opsional):
Jasa terkait:

dengan (Contact Person: ${kategori}).

Catatan : ${note}. Terima Kasih. Mohon untuk ketersediannya untuk menunggu respon dari tim kami.`;

  const encodedBody = encodeURIComponent(baseMessage);
  const digits = onlyDigits(number);
  let normalized = digits;
  if (/^0/.test(number.trim())) {
    normalized = digits.replace(/^0+/, "62");
  }
  if (!normalized || normalized.length < 6) {
    normalized = onlyDigits(DEFAULT_WA_NUMBER);
  }

  const url = `https://wa.me/${normalized}?text=${encodedBody}%20${PERCENT_EMOJI}`;
  return _fixReplacementCharInUrl(url);
}

// --- buildWhatsAppLink2 (versi aman + fix replace) ---
function buildWhatsAppLink2(contact = "", item = {}) {
  const EMOJI = _getPrayerEmoji();
  const name = sanitizeName(item.name || "");
  const kategori = item.kategori || "";
  const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin menanyakan tentang "${name}". Mohon untuk mengisi form terlebih dahulu: \n 

Nama: 
Email: 
Nama Perusahaan:  
Departemen:  
Kontak Lain (opsional):
Jasa terkait:

dengan (Contact Person: ${kategori}). Terima Kasih. Mohon untuk ketersediannya untuk menunggu respon dari tim kami.`;

  const encodedBody = encodeURIComponent(baseMessage);

  if (isFullUrl(contact)) {
    if (/wa\.me|api\.whatsapp\.com/i.test(contact)) {
      const updated = _ensureEmojiInUrl(contact, EMOJI, encodedBody);
      return _fixReplacementCharInUrl(updated);
    }
    return _fixReplacementCharInUrl(contact);
  }

  const digits = onlyDigits(contact);

  if (digits.length >= 6) {
    let normalized = digits;
    if (/^0/.test(contact.trim())) {
      normalized = digits.replace(/^0+/, "62");
    }
    const url = `https://wa.me/${normalized}?text=${encodedBody}%20${PERCENT_EMOJI}`;
    return _fixReplacementCharInUrl(url);
  }

  const fallbackDigits = onlyDigits(DEFAULT_WA_NUMBER2);
  const fallbackUrl = `https://wa.me/${fallbackDigits}?text=${encodedBody}%20${PERCENT_EMOJI}`;
  return _fixReplacementCharInUrl(fallbackUrl);
}

// --- buildWhatsAppLink (versi aman + fix replace) ---
function buildWhatsAppLink(contact = "", item = {}) {
  const EMOJI = _getPrayerEmoji();
  const name = sanitizeName(item.name || "");
  const kategori = item.kategori || "";
  const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin menanyakan tentang "${name}". Mohon untuk mengisi form terlebih dahulu: \n 

Nama: 
Email: 
Nama Perusahaan:  
Departemen:  
Kontak Lain (opsional):
Jasa terkait:
 
dengan (Contact Person: ${kategori}). Terima Kasih. Mohon untuk ketersediannya untuk menunggu respon dari tim kami.`;

  const encodedBody = encodeURIComponent(baseMessage);

  if (isFullUrl(contact)) {
    if (/wa\.me|api\.whatsapp\.com/i.test(contact)) {
      const updated = _ensureEmojiInUrl(contact, EMOJI, encodedBody);
      return _fixReplacementCharInUrl(updated);
    }
    return _fixReplacementCharInUrl(contact);
  }

  const digits = onlyDigits(contact);

  if (digits.length >= 6) {
    let normalized = digits;
    if (/^0/.test(contact.trim())) {
      normalized = digits.replace(/^0+/, "62");
    }
    const url = `https://wa.me/${normalized}?text=${encodedBody}%20${PERCENT_EMOJI}`;
    return _fixReplacementCharInUrl(url);
  }

  const fallbackDigits = onlyDigits(DEFAULT_WA_NUMBER);
  const fallbackUrl = `https://wa.me/${fallbackDigits}?text=${encodedBody}%20${PERCENT_EMOJI}`;
  return _fixReplacementCharInUrl(fallbackUrl);
}


/**
 * buildWhatsAppLink(contact, item)
 */
// function buildWhatsAppLink(contact = "", item = {}) {
//   const name = sanitizeName(item.name || "");
//   const kategori = item.kategori || "";
//   const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin menanyakan tentang "${name}". Mohon untuk mengisi form terlebih dahulu: \n 

// Nama: 
// Email: 
// Nama Perusahaan: 
// Departemen:  
// Kontak Lain (opsional):
// Jasa terkait:
 
// dengan (Contact Person: ${kategori}). Terima Kasih. Mohon untuk ketersediannya untuk menunggu respon dari tim kami 🙏.`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   if (isFullUrl(contact)) {
//     if (/wa\.me|api\.whatsapp\.com/i.test(contact)) {
//       if (/[?&]text=/i.test(contact)) return contact;
//       return contact + (contact.includes("?") ? "&" : "?") + "text=" + encodedMessage;
//     }
//     return contact;
//   }

//   const digits = onlyDigits(contact);

//   if (digits.length >= 6) {
//     let normalized = digits;
//     if (/^0/.test(contact.trim())) {
//       normalized = digits.replace(/^0+/, "62");
//     }
//     return `https://wa.me/${normalized}?text=${encodedMessage}`;
//   }

//   const fallbackDigits = onlyDigits(DEFAULT_WA_NUMBER);
//   return `https://wa.me/${fallbackDigits}?text=${encodedMessage}`;
// }

// function buildWhatsAppLink2(contact = "", item = {}) {
//   const name = sanitizeName(item.name || "");
//   const kategori = item.kategori || "";
//   const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin menanyakan tentang "${name}". Mohon untuk mengisi form terlebih dahulu: \n 

// Nama: 
// Email: 
// Nama Perusahaan: 
// Departemen: 
// Kontak Lain (opsional):
// Jasa terkait:

// dengan (Contact Person: ${kategori}). Terima Kasih. Mohon untuk ketersediannya untuk menunggu respon dari tim kami 🙏`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   if (isFullUrl(contact)) {
//     if (/wa\.me|api\.whatsapp\.com/i.test(contact)) {
//       if (/[?&]text=/i.test(contact)) return contact;
//       return contact + (contact.includes("?") ? "&" : "?") + "text=" + encodedMessage;
//     }
//     return contact;
//   }

//   const digits = onlyDigits(contact);

//   if (digits.length >= 6) {
//     let normalized = digits;
//     if (/^0/.test(contact.trim())) {
//       normalized = digits.replace(/^0+/, "62");
//     }
//     return `https://wa.me/${normalized}?text=${encodedMessage}`;
//   }

//   const fallbackDigits = onlyDigits(DEFAULT_WA_NUMBER2);
//   return `https://wa.me/${fallbackDigits}?text=${encodedMessage}`;
// }

/**
 * buildWhatsAppLinkForNumber(number, item, jenis, note)
 */
// function buildWhatsAppLinkForNumber(number = "", item = {}, jenis = "RO", note = "") {
//   const name = sanitizeName(item.name || "");
//   const kategori = item.kategori || "";
//   const jenisLabel = jenis === "Layanan" ? "Layanan" : jenis;
//   const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}". Mohon untuk mengisi form terlebih dahulu:
  
// Nama: 
// Email:
// Nama Perusahaan:
// Departemen:
// Kontak Lain (opsional):
// Jasa terkait:
  
// dengan (Contact Person: ${kategori}).

// Catatan : ${note}. Terima Kasih. Mohon untuk ketersediannya untuk menunggu respon dari tim kami 🙏.`;
//   const encodedMessage = encodeURIComponent(baseMessage);

//   const digits = onlyDigits(number);
//   let normalized = digits;
//   if (/^0/.test(number.trim())) {
//     normalized = digits.replace(/^0+/, "62");
//   }
//   if (!normalized || normalized.length < 6) {
//     normalized = onlyDigits(DEFAULT_WA_NUMBER);
//   }

//   return `https://wa.me/${normalized}?text=${encodedMessage}`;
// }

function buildWhatsAppLinkForNumber2(number = "", item = {}, jenis = "RO", note = "") {
  const name = sanitizeName(item.name || "");
  const kategori = item.kategori || "";
  const jenisLabel = jenis === "Layanan" ? "Layanan" : jenis;
  const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}". Mohon untuk mengisi form terlebih dahulu:
  
 Nama: 
 Email:
 Nama Perusahaan:
 Departemen:
 Kontak Lain (opsional):
 Jasa terkait:
  
 dengan (Contact Pearson: ${kategori}).

 Catatan : ${note}. Terima Kasih. Mohon untuk ketersediannya untuk menunggu respon dari tim kami 🙏.`;
  const encodedMessage = encodeURIComponent(baseMessage);

  const digits = onlyDigits(number);
  let normalized = digits;
  if (/^0/.test(number.trim())) {
    normalized = digits.replace(/^0+/, "62");
  }
  if (!normalized || normalized.length < 6) {
    normalized = onlyDigits(DEFAULT_WA_NUMBER2);
  }

  return `https://wa.me/${normalized}?text=${encodedMessage}`;
}

/* ================================================= */
/* Daftar kontak master — jangan ubah nama properti */
const KONTAK_MASTER = {
  DEFAULT: [
    { label: "FIDELYA NAZHIMAH", number: "6285215949622" },
    { label: "Bahtiar", number: "6281111805974" },
    // { label: "Livia", number: "6289654378362" },
        { label: "Admin", number: "6289654378362" },
  ],
  // khusus JASA => Fidelya + Livia
  JASA: [
    { label: "FIDELYA NAZHIMAH", number: "6285215949622" },
    // { label: "Livia", number: "6289654378362" },
        { label: "Admin", number: "6289654378362" },
  ],
  // khusus MATERIAL => Bahtiar + Livia
  MATERIAL: [
    { label: "Bahtiar", number: "6281111805974" },
    // { label: "Livia", number: "6289654378362" },
        { label: "Admin", number: "6289654378362" },
  ],
};

/* ================================================= */
/* Kontak konfirmasi (default) — tetap ada untuk fallback */
const KONTAK_KONFIRM = KONTAK_MASTER.DEFAULT;

/**
 * ContactConfirmOneByOne
 */
function ContactConfirmOneByOne({
  kontakList = KONTAK_KONFIRM,
  item,
  itemKey,
  handleSendConfirmation,
  autoAdvance = true,
}) {
  const [index, setIndex] = useState(0);
  const total = kontakList.length;
  const current = kontakList[index];

  const touchStartXRef = useRef(null);
  const touchCurrentXRef = useRef(null);
  const SWIPE_THRESHOLD = 40; // px

  const onTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchCurrentXRef.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchCurrentXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const start = touchStartXRef.current;
    const end = touchCurrentXRef.current;
    if (start == null || end == null) return;
    const diff = end - start;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        setIndex((i) => Math.max(0, i - 1));
      } else {
        setIndex((i) => Math.min(total - 1, i + 1));
      }
    }
    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
  };

  const onPrev = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setIndex((i) => Math.max(0, i - 1));
  };

  const onNext = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setIndex((i) => Math.min(total - 1, i + 1));
  };

  const onSend = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (typeof handleSendConfirmation === "function") {
      handleSendConfirmation(itemKey, current.number, item);
    }
    if (autoAdvance && index < total - 1) {
      setIndex((i) => i + 1);
    }
  };

  const onClickNumber = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (typeof handleSendConfirmation === "function") {
      handleSendConfirmation(itemKey, current.number, item);
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
    >
      <div style={{ fontSize: 13, marginBottom: 4, color: "#374151" }}>
        Kontak {index + 1} dari {total}
      </div>

      <div
        style={{
          padding: 10,
          borderRadius: 8,
          border: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ fontWeight: 700 }}>{current.label}</div>
        <div
          style={{ fontSize: 13, color: "#4b5563", cursor: "pointer", userSelect: "text" }}
          onClick={onClickNumber}
          title="Klik untuk buka WhatsApp"
        >
          {current.number}
        </div>

        <div style={{ fontSize: 12, color: "#6b7280" }}>
          <em>Tip: geser (swipe) kiri/kanan untuk berpindah kontak di perangkat sentuh.</em>
        </div>
        <div style={{ display: "flex", gap: 2, marginTop: 18 }}>
          <button
            type="button"
            onClick={onPrev}
            style={{
              position: "relative",
              zIndex: 10010,
              pointerEvents: "auto",
              padding: "6px 8px",
              left: 5,
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,0.06)",
              background: "#0d3a5b",
              cursor: index === 0 ? "not-allowed" : "pointer",
              opacity: index === 0 ? 0.6 : 1,
              color: "#fff",
            }}
            disabled={index === 0}
          >
            Prev
          </button>

          <button
            type="button"
            onClick={onSend}
            style={{
              position: "relative",
              zIndex: 10010,
              pointerEvents: "auto",
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,0.06)",
              background: "#dc2626",
              cursor: "pointer",
              marginLeft: "auto",
              color: "#fff",
            }}
          >
            Kirim
          </button>

          <button
            type="button"
            onClick={onNext}
            style={{
              position: "relative",
              zIndex: 10010,
              pointerEvents: "auto",
              padding: "6px 8px",
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,0.06)",
              background: "#0d3a5b",
              cursor: index === total - 1 ? "not-allowed" : "pointer",
              opacity: index === total - 1 ? 0.6 : 1,
              color: "#fff",
            }}
            disabled={index === total - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactConfirmOneByOnePlaceholder() {
  return null;
}

export default function ProdukPage({ storagePath = "produk_complus" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [confirmOpenMap, setConfirmOpenMap] = useState({});
  const [confirmStateMap, setConfirmStateMap] = useState({});
  const [confStateMap, setConfStateMap] = useState({});

  const outerRef = useRef(null);
  useEffect(() => {
    function onDocClick(e) {
      if (!outerRef.current) return;
      if (!outerRef.current.contains(e.target)) {
        setConfirmOpenMap({});
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadFromFirestore() {
      try {
        setLoading(true);
        setError(null);
        const snap = await withTimeout(getDocs(collection(db, "produk")), 6000);
        const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (!cancelled) {
          const mapped = arr.map((p) => ({
            name: p.nama || p.name || (p.gambarUrl ? p.gambarUrl.split("/").pop() : "unknown"),
            url: p.gambarUrl || p.url || "",
            kategori: p.kategori || "",
            fullPath: p.path || p.fullPath || p.storagePath || (p.gambarUrl ? p.gambarUrl.split("/").pop() : ""),
          }));
          if (mapped.length > 0) {
            setItems(mapped);
            return true;
          }
        }
      } catch (e) {
        console.warn("loadFromFirestore gagal:", e);
        /* error ditangani oleh fallback lokal */
      }
      return false;
    }

    async function fetchAll() {
      setLoading(true);
      setError(null);

      try {
        const rawBase = process.env.NEXT_PUBLIC_API_BASE || "";
        const base = rawBase ? rawBase.replace(/\/+$/, "") : "";

        const sameOrigin = typeof window !== "undefined" && base && window.location.origin === base;
        const url = sameOrigin ? "/listFiles" : base ? `${base}/listFiles` : "/listFiles";

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`API error: ${res.status} ${text}`);
        }

        const data = await res.json();

        if (!cancelled) {
          setItems(
            Array.isArray(data)
              ? data.map((d) => ({
                  name: d.name,
                  url: d.url,
                  kategori: d.kategori || "",
                  fullPath: d.fullPath || d.name,
                }))
              : FALLBACK_ITEMS
          );
        }
      } catch (err) {
        console.error("Gagal mengambil data dari API:", err);
        if (!cancelled) { setItems(FALLBACK_ITEMS); setError(null); } // server mati -> pakai data lokal
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    (async () => {
      const usedFirestore = await loadFromFirestore();
      if (!cancelled) {
        if (usedFirestore) {
          setLoading(false);
        } else {
          await fetchAll();
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [storagePath]);

  const handleSendConfirmation = (key, contactNumber, item) => {
    const stateA = confirmStateMap[key];
    const stateB = confStateMap[key];
    const state = stateA || stateB || { jenis: "RO", note: "" };
    const jenis = state.jenis || "RO";
    const note = state.note || "";

    const waUrl = buildWhatsAppLinkForNumber(contactNumber, item, jenis, note);
    try {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (e) {
      window.location.href = waUrl;
    }
    setConfirmOpenMap((m) => ({ ...m, [key]: false }));
  };

  const toggleConfirm = (key) => {
    setConfirmOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setConfirmOpen = (key, value) => {
    setConfirmOpenMap((prev) => ({ ...prev, [key]: value }));
  };

  const updateConfirmState = (key, patch) => {
    setConfStateMap((prev) => ({ ...prev, [key]: { ...(prev[key] || {}), ...patch } }));
  };

  /* helper untuk memilih kontak sesuai nama item */
  const pickKontakForItem = (it) => {
    const name = (sanitizeName(it.name || "") || "").trim().toUpperCase();
    if (name === "JASA") return KONTAK_MASTER.JASA;
    if (name === "MATERIAL") return KONTAK_MASTER.MATERIAL;
    // fallback: jika kategori atau it.kategori mengandung keyword, boleh sesuaikan
    // contoh: jika it.kategori === "JASA" etc. (tidak diubah sekarang)
    return KONTAK_KONFIRM;
  };

  return (
    <>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

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
          <CartButton onClick={() => setSidebarOpen(true)} />
          <div
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Toggle menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setMenuOpen((s) => !s);
            }}
          >
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.produkSection}>
          <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h3>LAYANAN KAMI</h3>

            {loading && <div style={{ textAlign: "center", padding: "2rem 0" }}>Memuat produk...</div>}

            {error && (
              <div style={{ background: "#fee2e2", color: "#9b1c1c", padding: 12, borderRadius: 8, marginBottom: 16 }}>
                Terjadi error: {error}
              </div>
            )}

            {!loading && items.length === 0 && <div style={{ textAlign: "center", padding: "2rem 0" }}>Tidak ada file di folder ini.</div>}

            <div className={styles.grid}>
              {items.map((it) => {
                const key = `${it.fullPath}__${it.name}__${it.kategori}`;
                const isOpen = !!confirmOpenMap[key];
                const confState = confirmStateMap[key] || { jenis: "PO", note: "" };

                // pilih kontak berdasarkan nama item (JASA / MATERIAL)
                const kontakToUse = pickKontakForItem(it);

                return (
                  <article
                    key={key}
                    className={styles.card}
                    onClick={(e) => { const im = e.currentTarget.querySelector("img"); window.open((im && (im.currentSrc || im.src)) || it.url, "_blank"); }}
                    style={{ overflow: "visible" }}
                  >
                    <div className={styles.badge}>PT WAE MANDIRI KARYA</div>

                    <img src={it.url || getFallbackImage(it.name)} alt={it.name} onError={(e) => handleImgError(e, it.name)} />

                    <div className={styles.info}>
                      <h4>{sanitizeName(it.name)}</h4>
                      <div className={styles.kategori}>Contact Person : {it.kategori}</div>

                      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <a href={it.cetakporo} target="_blank" rel="noreferrer" className="link" onClick={(e) => e.stopPropagation()}>
                          Cetak
                        </a>
                        <a
                          href={
                            sanitizeName(it.name || "").toUpperCase() === "MATERIAL"
                              ? buildWhatsAppLink2(it.contact, it)
                              : buildWhatsAppLink(it.contact, it)
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          Contact
                        </a>
                      </div>
                    </div>

                    <div style={{ position: "absolute", bottom: 12, right: 12 }}>
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleConfirm(key);
                          }}
                        >
                          Konfirmasi
                        </button>

                        {isOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: "absolute",
                              bottom: 44,
                              right: 0,
                              zIndex: 9999,
                              minWidth: 260,
                              background: "#fff",
                              border: "1px solid rgba(0,0,0,0.08)",
                              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                              padding: 12,
                              borderRadius: 8,
                              maxHeight: 320,
                              overflowY: "auto",
                              pointerEvents: "auto",
                              paddingBottom: 72,
                              transform: "translateY(-6px)",
                            }}
                          >
                            <div style={{ marginBottom: 8, fontWeight: 600 }}>Konfirmasi lewat</div>

                            <div style={{ marginBottom: 8 }}>
                              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Jenis</label>
                              <select
                                value={(confStateMap[key] && confStateMap[key].jenis) || confState.jenis || "RO"}
                                onChange={(e) => updateConfirmState(key, { jenis: e.target.value })}
                                style={{ width: "100%", padding: 6 }}
                              >
                                <option value="RO">RO (Request Order)</option>
                              </select>
                            </div>

                            <div style={{ marginBottom: 8 }}>
                              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Catatan (opsional)</label>
                              <input
                                value={(confStateMap[key] && confStateMap[key].note) ?? (confState.note || "")}
                                onChange={(e) => updateConfirmState(key, { note: e.target.value })}
                                placeholder="Contoh: jumlah / tanggal / catatan lain"
                                style={{ width: "100%", padding: 6 }}
                              />
                            </div>

                            <div style={{ marginBottom: 8 }}>
                              <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Pilih Konfirmasi Kontak</label>

                              <ContactConfirmOneByOne
                                kontakList={kontakToUse}
                                item={it}
                                itemKey={key}
                                handleSendConfirmation={handleSendConfirmation}
                                autoAdvance={true}
                              />
                            </div>

                            <div
                              style={{
                                position: "sticky",
                                bottom: 100,
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 8,
                                marginTop: 8,
                                background: "transparent",
                                zIndex: 10000,
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => setConfirmOpen(key, false)}
                                style={{ padding: "6px 10px", borderRadius: 6 }}
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div style={{ marginTop: 36 }} className={styles.cta}>
              <h3>Butuh bantuan pilih produk?</h3>
              <a href="/kontak">Hubungi Kami</a>
            </div>
          </div>
        </section>
      </main>

      {sidebarOpen && <div className={styles.cartOverlay} onClick={() => setSidebarOpen(false)}></div>}
      {/* <aside className={`${styles.cartSidebar} ${sidebarOpen ? styles.openSidebar : ""}`} aria-hidden={!sidebarOpen}>
        <div className={styles.cartHeader}>
          <strong>Keranjang</strong>
          <button className={styles.closeCartBtn} onClick={() => setSidebarOpen(false)}>
            Tutup
          </button>
        </div>

        <div className={styles.cartContent}>
          <p style={{ color: "#64748b" }}>Contoh keranjang sementara — ganti dengan implementasi state/Redux/Firebase kamu.</p>
        </div>

        <div className={styles.cartFooter}>
          <button className={styles.closeCartBtnPrimary} onClick={() => alert("Proses checkout belum diimplementasikan")}>
            Checkout
          </button>
        </div>
      </aside> */}
    </>
  );
}

/* helper kecil */
function sanitizeName(name = "") {
  return name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ");
}

function addToCart(item) {
  try {
    const prev = JSON.parse(localStorage.getItem("demo_cart") || "[]");
    prev.push({ name: item.name, url: item.url, path: item.fullPath });
    localStorage.setItem("demo_cart", JSON.stringify(prev));
    console.info("Added to demo cart:", item.name);
  } catch (e) {
    console.error(e);
  }
}

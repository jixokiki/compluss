// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function ProductDetailClient() {
//   const { id } = useParams();
//   const [produk, setProduk] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const docRef = doc(db, "produk", id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setProduk({ id: docSnap.id, ...docSnap.data() });
//       }
//     };
//     if (id) fetchData();
//   }, [id]);

//   if (!produk)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
//         Loading produk...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-4 py-16 font-sans">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
//         {/* Gambar Produk */}
//         <motion.div
//           className="w-full"
//           initial={{ opacity: 0, scale: 0.97 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <img
//             src={produk.gambarUrl}
//             alt={produk.nama}
//             className="w-full h-[400px] object-cover rounded-xl border shadow-sm"
//           />
//         </motion.div>

//         {/* Detail Produk */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{produk.nama}</h1>

//           <p className="text-sm text-gray-500 mb-3">Kategori: <span className="text-gray-700 font-medium">{produk.kategori}</span></p>

//           <div className="text-2xl font-semibold text-blue-700 mb-6">
//             Rp {produk.harga.toLocaleString("id-ID")}
//           </div>

//           <div className="text-gray-700 leading-relaxed text-sm mb-6">
//             {produk.deskripsi ? (
//               <p>{produk.deskripsi}</p>
//             ) : (
//               <p className="italic text-gray-400">(Belum ada deskripsi)</p>
//             )}
//           </div>

//           <div className="mb-4 text-sm">
//             <span className="text-gray-600">Stok tersedia:</span>{" "}
//             <span className="font-semibold text-green-600">{produk.stok}</span>
//           </div>

//           <a
//             href={`https://wa.me/6281234567890?text=Saya tertarik dengan produk: ${produk.nama}`}
//             target="_blank"
//             className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition font-semibold shadow-md"
//           >
//             Chat via WhatsApp
//           </a>

//           <div className="mt-6">
//             <Link
//               href="/"
//               className="text-blue-600 text-sm hover:underline hover:text-blue-800 transition"
//             >
//               ← Kembali ke Beranda
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


//JANGAN DIHAPUS INI IKIII
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { db } from "../../../lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import Link from "next/link";
// import styles from "./ProductDetailClient.module.scss";

// export default function ProductDetailClient() {
//   const { id } = useParams();
//   const [produk, setProduk] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const docRef = doc(db, "produk", id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setProduk({ id: docSnap.id, ...docSnap.data() });
//       }
//     };
//     if (id) fetchData();
//   }, [id]);

//   if (!produk)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
//         Loading produk...
//       </div>
//     );

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <img src={produk.gambarUrl} alt={produk.nama} />
//         <div className={styles.details}>
//           <h1>{produk.nama}</h1>
//           <p className={styles.category}>
//             Kategori: <span>{produk.kategori}</span>
//           </p>
//           <div className={styles.price}>
//             Rp {produk.harga.toLocaleString("id-ID")}
//           </div>
//           <div
//             className={
//               produk.deskripsi ? styles.description : `${styles.description} ${styles.placeholder}`
//             }
//           >
//             {produk.deskripsi || "(Belum ada deskripsi)"}
//           </div>
//           <div className={styles.stock}>
//             Stok tersedia: <span>{produk.stok}</span>
//           </div>
//           <a
//             href={`https://wa.me/6281234567890?text=Saya tertarik dengan produk: ${produk.nama}`}
//             target="_blank"
//             className={styles.whatsapp}
//           >
//             Chat via WhatsApp
//           </a>
//           <Link href="/" className={styles.backLink}>
//             ← Kembali ke Beranda
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import styles from "./ProductDetailClient.module.scss";

export default function ProductDetailClient() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "produk", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduk({ id: docSnap.id, ...docSnap.data() });
      }
    };
    if (id) fetchData();
  }, [id]);

  if (!produk)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading produk...
      </div>
    );

  return (
    <>
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

      <div className={styles.container}>
        <div className={styles.card}>
          <img src={produk.gambarUrl} alt={produk.nama} />
          <div className={styles.details}>
            <h1>{produk.nama}</h1>
            <p className={styles.category}>
              Kategori: <span>{produk.kategori}</span>
            </p>
            <div className={styles.price}>
              Rp {produk.harga.toLocaleString("id-ID")}
            </div>
            <div
              className={
                produk.deskripsi
                  ? styles.description
                  : `${styles.description} ${styles.placeholder}`
              }
            >
              {produk.deskripsi || "(Belum ada deskripsi)"}
            </div>
            <div className={styles.stock}>
              Stok tersedia: <span>{produk.stok}</span>
            </div>
            <a
              href={`https://wa.me/6281234567890?text=Saya tertarik dengan produk: ${produk.nama}`}
              target="_blank"
              className={styles.whatsapp}
            >
              Chat via WhatsApp
            </a>
            <Link href="/" className={styles.backLink}>
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

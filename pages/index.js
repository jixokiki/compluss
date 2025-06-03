// // /app/page.tsx (Landing Page Publik Super Elegan)
// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import Image from "next/image";

// export default function LandingPage() {
//   const [produk, setProduk] = useState([]);

//   useEffect(() => {
//     const fetchProduk = async () => {
//       const snapshot = await getDocs(collection(db, "produk"));
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setProduk(data);
//     };
//     fetchProduk();
//   }, []);

//   return (
//     <div className="bg-gradient-to-b from-white to-blue-50 font-sans text-gray-800 min-h-screen">
//       {/* Navbar */}
//       <header className="sticky top-0 bg-white shadow z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-blue-700">BrandStore</h1>
//           <nav className="space-x-6 hidden md:flex">
//             <Link href="/" className="hover:text-blue-600">Beranda</Link>
//             <Link href="/#produk" className="hover:text-blue-600">Produk</Link>
//             <Link href="/tentang" className="hover:text-blue-600">Tentang Kami</Link>
//             <Link href="/kontak" className="hover:text-blue-600">Kontak</Link>
//           </nav>
//           <a href="https://wa.me/6281234567890" target="_blank" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm">
//             Chat WhatsApp
//           </a>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative text-center py-24 px-6 overflow-hidden bg-white">
//         <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
//           Solusi Produk Digital & Teknologi Terkini
//         </h2>
//         <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
//           Produk berkualitas dengan harga bersaing, bergaransi, dan dukungan penuh dari teknisi handal.
//         </p>
//         <Link href="#produk" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">
//           Lihat Produk
//         </Link>
//         <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
//         <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
//       </section>

//       {/* Produk Section */}
//       <section id="produk" className="py-20 px-6 bg-blue-50">
//         <div className="max-w-7xl mx-auto">
//           <h3 className="text-3xl font-semibold mb-8">Produk Terbaru</h3>
//           <div className="grid md:grid-cols-3 gap-8">
//             {produk.map((item) => (
//               <motion.div
//                 key={item.id}
//                 whileHover={{ scale: 1.03 }}
//                 className="bg-white rounded-xl shadow hover:shadow-xl overflow-hidden border transition"
//               >
//                 <Link href={`/produk/${item.id}`}>
//                   <img
//                     src={item.gambarUrl}
//                     alt={item.nama}
//                     className="h-48 w-full object-cover"
//                   />
//                   <div className="p-4">
//                     <h4 className="text-lg font-bold mb-1">{item.nama}</h4>
//                     <p className="text-sm text-gray-500 mb-2">{item.kategori}</p>
//                     <p className="text-blue-600 font-semibold text-md">Rp {item.harga.toLocaleString()}</p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="text-center bg-blue-600 text-white py-12">
//         <h3 className="text-2xl font-bold mb-4">Butuh Bantuan atau Penawaran Khusus?</h3>
//         <a
//           href="https://wa.me/6281234567890"
//           target="_blank"
//           className="bg-white text-blue-700 px-6 py-2 rounded font-medium hover:bg-gray-100"
//         >
//           Konsultasi Sekarang
//         </a>
//       </section>

//       {/* Footer */}
//       <footer className="text-sm text-center text-gray-600 py-6 bg-white">
//         &copy; {new Date().getFullYear()} PT. BrandStore Indonesia. All rights reserved.
//       </footer>
//     </div>
//   );
// }



// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import styles from "./LandingPage.module.scss";

// export default function LandingPage() {
//   const [produk, setProduk] = useState([]);

//   useEffect(() => {
//     const fetchProduk = async () => {
//       const snapshot = await getDocs(collection(db, "produk"));
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setProduk(data);
//     };
//     fetchProduk();
//   }, []);

//   return (
//     <div className={styles.container}>
//       {/* Navbar */}
//       <header className={styles.navbar}>
//         <h1>BrandStore</h1>
//         <nav>
//           <Link href="/">Beranda</Link>
//           <Link href="/#produk">Produk</Link>
//           <Link href="/tentang">Tentang Kami</Link>
//           <Link href="/kontak">Kontak</Link>
//         </nav>
//         <a
//           href="https://wa.me/6281234567890"
//           target="_blank"
//           className={styles.waBtn}
//         >
//           Chat WhatsApp
//         </a>
//       </header>

//       {/* Hero Section */}
//       <section className={styles.hero}>
//         <h2>Solusi Produk Digital & Teknologi Terkini</h2>
//         <p>
//           Produk berkualitas dengan harga bersaing, bergaransi, dan dukungan
//           penuh dari teknisi handal.
//         </p>
//         <Link href="#produk">Lihat Produk</Link>
//         <div className={`${styles.blob} ${styles.blob1}`}></div>
//         <div className={`${styles.blob} ${styles.blob2}`}></div>
//       </section>

//       {/* Produk Section */}
//       <section id="produk" className={styles.produkSection}>
//         <h3>Produk Terbaru</h3>
//         <div className={styles.grid}>
//           {produk.map((item) => (
//             <motion.div
//               key={item.id}
//               whileHover={{ scale: 1.02 }}
//               className={styles.card}
//             >
//               <Link href={`/produk/${item.id}`}>
//                 <img src={item.gambarUrl} alt={item.nama} />
//                 <div className={styles.info}>
//                   <h4>{item.nama}</h4>
//                   <p className={styles.kategori}>{item.kategori}</p>
//                   <p className={styles.harga}>
//                     Rp {item.harga.toLocaleString("id-ID")}
//                   </p>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className={styles.cta}>
//         <h3>Butuh Bantuan atau Penawaran Khusus?</h3>
//         <a href="https://wa.me/6281234567890" target="_blank">
//           Konsultasi Sekarang
//         </a>
//       </section>

//       {/* Footer */}
//       <footer className={styles.footer}>
//         &copy; {new Date().getFullYear()} PT. BrandStore Indonesia. All rights reserved.
//       </footer>
//     </div>
//   );
// }



// app/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./LandingPage.module.scss";
import FloatingChat from "./components/FloatingChat";
import BannerSlider from "./components/BannerSlider";
import SkeletonCard from "./components/SkeletonCard";
import CategoryFilter from "./components/CategoryFilter";
import KatalogScroll from "./components/KatalogScroll";
import BannerInformative from "./components/BannerInformative";


export default function LandingPage() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState("Semua");

  useEffect(() => {
    const fetchProduk = async () => {
      const snapshot = await getDocs(collection(db, "produk"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProduk(data);
      setLoading(false);
    };
    fetchProduk();
  }, []);

  const produkTampil = selectedKategori === "Semua"
    ? produk
    : produk.filter((item) => item.kategori === selectedKategori);

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <h1>BrandStore</h1>
        <nav>
          <Link href="/">Beranda</Link>
          <Link href="/#produk">Produk</Link>
          <Link href="/tentang">Tentang Kami</Link>
          <Link href="/kontak">Kontak</Link>
        </nav>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          className={styles.waBtn}
        >
          Chat WhatsApp
        </a>
      </header>

      {/* Hero Carousel */}
      {/* <section className={styles.heroCarousel}>
        <BannerSlider />
      </section> */}
      <BannerSlider />
      <KatalogScroll />


      {/* Produk Section */}
      <section id="produk" className={styles.produkSection}>
        <h3>Produk Terbaru</h3>
        <div className="sticky top-16 bg-white z-40 shadow px-4 py-2">
          <CategoryFilter selected={selectedKategori} onSelect={setSelectedKategori} />
        </div>
        <div className={styles.grid}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            produkTampil.map((item) => (
              // <motion.div
              //   key={item.id}
              //   whileHover={{ scale: 1.02 }}
              //   className={styles.card}
              // >
              //   <Link href={`/produk/${item.id}`}>
              //     <div className="relative">
              //       <img src={item.gambarUrl} alt={item.nama} />
              //       {item.diskon && (
              //         <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
              //           {item.diskon}% OFF
              //         </span>
              //       )}
              //       <button className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              //         + Keranjang
              //       </button>
              //     </div>
              //     <div className={styles.info}>
              //       <h4>{item.nama}</h4>
              //       <p className={styles.kategori}>{item.kategori}</p>
              //       <p className={styles.harga}>
              //         Rp {item.harga.toLocaleString("id-ID")}
              //       </p>
              //     </div>
              //   </Link>
              // </motion.div>
  //             <motion.div
  //   key={item.id}
  //   whileHover={{ scale: 1.02 }}
  //   className={styles.card}
  // >
  //   <div className="relative">
  //     <Link href={`/produk/${item.id}`}>
  //       <img src={item.gambarUrl} alt={item.nama} />
  //       {item.diskon && (
  //         <span className={styles.badge}>{item.diskon}% OFF</span>
  //       )}
  //       <div className={styles.info}>
  //         <h4>{item.nama}</h4>
  //         <p className={styles.kategori}>{item.kategori}</p>
  //         <p className={styles.harga}>Rp {item.harga.toLocaleString("id-ID")}</p>
  //       </div>
  //     </Link>

  //     {/* ✅ Tombol berada di luar Link */}
  //     <button
  //       onClick={(e) => {
  //         e.stopPropagation(); // hindari trigger link
  //         e.preventDefault();  // hindari redirect
  //         console.log("Tambah ke keranjang:", item.nama);
  //         // tambahkan logika keranjang di sini
  //       }}
  //     >
  //       + Keranjang
  //     </button>
  //   </div>
  // </motion.div>
//   <motion.div key={item.id} className={styles.card} whileHover={{ scale: 1.02 }}>
//   {/* SET wrapper RELATIVE */}
//   <div className="relative">
//     <Link href={`/produk/${item.id}`}>
//       <img src={item.gambarUrl} alt={item.nama} />
//       {item.diskon >= 30 && <span className={styles.badge}>{item.diskon}% OFF</span>}
//       <div className={styles.info}>
//         <h4>{item.nama}</h4>
//         <p className={styles.kategori}>{item.kategori}</p>
//         <p className={styles.harga}>Rp {item.harga.toLocaleString("id-ID")}</p>
//       </div>
//     </Link>

//     {/* ✅ Posisikan di dalam .relative wrapper */}
//     <button
//       onClick={(e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         alert(`Tambah ke keranjang: ${item.nama}`);
//       }}
//     >
//       + Keranjang
//     </button>
//   </div>
// </motion.div>

<motion.div
  key={item.id}
  className={styles.card}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  whileHover={{ scale: 1.03 }}
>
  <div className="relative">
    <Link href={`/produk/${item.id}`}>
      <img src={item.gambarUrl} alt={item.nama} />
      {item.diskon >= 30 && <span className={styles.badge}>{item.diskon}% OFF</span>}
      {item.diskon >= 30 && <span className={styles["label-flash"]}>🔥 Flash Sale</span>}
      {item.kategori?.toLowerCase().includes("populer") && <span className={styles["label-best"]}>⭐ Best Seller</span>}

      <div className={styles.info}>
        <h4>{item.nama}</h4>
        <p className={styles.kategori}>{item.kategori}</p>
        <p className={styles.harga}>Rp {item.harga.toLocaleString("id-ID")}</p>
      </div>
    </Link>

    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        alert(`Tambah ke keranjang: ${item.nama}`);

        const cartEl = document.querySelector(`.${styles.floatingCart}`);
        cartEl?.classList.add("clicked");
        setTimeout(() => {
          cartEl?.classList.remove("clicked");
        }, 300);
      }}
    >
      + Keranjang
    </button>
  </div>
</motion.div>

            ))
            
          )}
          {/* Floating Cart Icon */}
<div className={styles.floatingCart}>
  🛒 Keranjang
</div>


        </div>
      </section>

      <BannerInformative/>

      {/* CTA */}
      <section className={styles.cta}>
        <h3>Butuh Bantuan atau Penawaran Khusus?</h3>
        <a href="https://wa.me/6285817298071" target="_blank">
          Konsultasi Sekarang
        </a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} PT. BrandStore Indonesia. All rights reserved.
      </footer>

      {/* Floating Chat Button */}
      <FloatingChat />
    </div>
  );
}

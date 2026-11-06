"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductDetailClient from "./ProductDetailClient";
import styles from "./ProdukPage.module.scss";

export default function ProdukPage() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduk, setSelectedProduk] = useState(null);

  useEffect(() => {
    async function fetchProduk() {
      const snapshot = await getDocs(collection(db, "produk"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProduk(data);
      setLoading(false);
    }
    fetchProduk();
  }, []);

  // Klik produk → tampil detail
  if (selectedProduk) {
    return <ProductDetailClient produk={selectedProduk} onBack={() => setSelectedProduk(null)} />;
  }

  return (
    <section id="produk" className={styles.produkSection}>
      <h3>Produk Terbaru</h3>
      <div className={styles.grid}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className={styles.skeleton} />)
          : produk.map(item => (
              <motion.div
                key={item.id}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedProduk(item)}
              >
                <div className={styles.imageWrapper}>
                  <img src={item.gambarUrl} alt={item.nama} />
                </div>
                <div className={styles.info}>
                  <h4>{item.nama}</h4>
                  <p>{item.kategori}</p>
                  <p>Rp {Number(item.harga || 0).toLocaleString("id-ID")}</p>
                </div>
              </motion.div>
            ))}
      </div>
    </section>
  );
}

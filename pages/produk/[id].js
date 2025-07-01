// pages/produk/[id].js
import Head from "next/head";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // pastikan path ini benar
import Link from "next/link";
import styles from "@/styles/ProductDetail.module.scss"; // custom styling kamu

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const docRef = doc(db, "produk", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { notFound: true };
    }

    const produk = { id: docSnap.id, ...docSnap.data() };
    return { props: { produk } };
  } catch (error) {
    return { notFound: true };
  }
}

export default function ProductDetailPage({ produk }) {
  return (
    <>
      <Head>
        <title>{produk.nama} | PT. Complus Sistem Solusi</title>
        <meta name="description" content={`Kategori: ${produk.kategori}. Harga Rp ${produk.harga.toLocaleString("id-ID")}`} />
        <meta property="og:title" content={produk.nama} />
        <meta property="og:description" content={`Kategori: ${produk.kategori}`} />
        <meta property="og:image" content={produk.gambarUrl} />
        <meta property="og:url" content={`https://www.compluscss.com/produk/${produk.id}`} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.container}>
        <div className={styles.card}>
          <img src={produk.gambarUrl} alt={produk.nama} />
          <div className={styles.details}>
            <h1>{produk.nama}</h1>
            <p className={styles.category}>Kategori: {produk.kategori}</p>
            <p className={styles.price}>Rp {produk.harga.toLocaleString("id-ID")}</p>
            <p className={styles.description}>{produk.deskripsi || "Belum ada deskripsi"}</p>
            <p className={styles.stock}>Stok: {produk.stok}</p>
            <a
              href={`https://wa.me/6281234567890?text=Saya tertarik dengan produk: ${produk.nama}`}
              target="_blank"
              className={styles.whatsapp}
            >
              Chat via WhatsApp
            </a>
            <Link href="/">← Kembali ke Beranda</Link>
          </div>
        </div>
      </main>
    </>
  );
}

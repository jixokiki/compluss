// "use client";
// import ProductDetailClient from "./ProductDetail";

// export default function Page() {
//   return <ProductDetailClient />;
// }


import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import ProductDetailClient from "./ProductDetail";

// ✅ Fungsi untuk generate <head> dinamis (dibaca WhatsApp/Facebook)
export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const docRef = doc(db, "produk", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return {
        title: "Produk tidak ditemukan | Compluss",
        description: "Produk ini tidak tersedia di katalog kami.",
      };
    }

    const produk = docSnap.data();

    return {
      title: `${produk.nama} | Compluss`,
      description: produk.deskripsi || `Kategori: ${produk.kategori}`,
      openGraph: {
        title: produk.nama,
        description: produk.deskripsi || `Kategori: ${produk.kategori}`,
        url: `https://www.compluscss.com/produk/${id}`,
        images: [
          {
            url: produk.gambarUrl,
            width: 1200,
            height: 630,
            alt: produk.nama,
          },
        ],
        type: "product",
      },
      twitter: {
        card: "summary_large_image",
        title: produk.nama,
        description: produk.deskripsi || "",
        images: [produk.gambarUrl],
      },
    };
  } catch (e) {
    return {
      title: "Produk tidak ditemukan",
      description: "Terjadi kesalahan.",
    };
  }
}

// ✅ SSR component utama, tetap gunakan komponen client-mu
export default function Page() {
  return <ProductDetailClient />;
}

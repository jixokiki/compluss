// // lib/firebaseAdminProxy.mjs
// import { createRequire } from "module";
// import path from "path";

// const require = createRequire(import.meta.url);

// // path ke file CommonJS firebaseAdmin kamu
// const cjsPath = path.join(process.cwd(), "complus-backend", "firebaseAdmin.js");

// // require file CJS
// const adminModule = require(cjsPath);

// // export sebagai ESM
// export const admin = adminModule.admin;
// export const db = adminModule.db;
// export const bucket = adminModule.bucket;

// // default export (opsional)
// export default { admin, db, bucket };
// // lib/firebaseAdminProxy.mjs
// import { createRequire } from "module";
// import path from "path";
// import fs from "fs";
// import adminPkg from "firebase-admin";

// const require = createRequire(import.meta.url);

// // jika kamu punya CommonJS firebaseAdmin yang lain, kita abaikan dan inisialisasi di sini
// let admin = null;

// if (!adminPkg.apps?.length) {
//   // cari file service account di project root atau di folder complus-backend
//   const candidates = [
//     path.join(process.cwd(), "GOOGLE_APPLICATION_CREDENTIALS.json"),
//     path.join(process.cwd(), "complus-backend", "GOOGLE_APPLICATION_CREDENTIALS.json"),
//     path.join(process.cwd(), "complus-backend", "google-service-account.json"),
//     path.join(process.cwd(), "serviceAccountKey.json"),
//   ];

//   let found = null;
//   for (const c of candidates) {
//     if (fs.existsSync(c)) {
//       found = c;
//       break;
//     }
//   }

//   if (found) {
//     const json = JSON.parse(fs.readFileSync(found, "utf8"));
//     admin = adminPkg.initializeApp({
//       credential: adminPkg.credential.cert(json),
//       // optional: storageBucket jika kamu butuh
//       storageBucket: json.project_id ? `${json.project_id}.appspot.com` : undefined,
//     });
//   } else {
//     // fallback: jika tidak ada file, coba applicationDefault (ADC)
//     try {
//       admin = adminPkg.initializeApp({
//         credential: adminPkg.credential.applicationDefault(),
//       });
//     } catch (err) {
//       // rethrow to make failure visible
//       console.error("Failed to initialize firebase-admin (no SA file & ADC failed):", err?.message || err);
//       throw err;
//     }
//   }
// } else {
//   admin = adminPkg;
// }

// const db = admin.firestore();
// const bucket = admin.storage ? admin.storage().bucket() : null;

// export { admin, db, bucket };
// export default { admin, db, bucket };
// app/produk/[id]/page.jsx
import ProductDetailClient from "../app/produk/[id]/ProductDetailClient";
// alias import supaya tidak bentrok dengan variable lain bernama `db`
// import { db as adminDb } from "../../../lib/firebaseAdminProxy.mjs";

/**
 * Helper: fetch produk langsung dari Firestore (server-side)
 */
async function fetchProdukById(id) {
  if (!adminDb) throw new Error("Firestore db unavailable on server (adminDb is falsy)");
  const docRef = adminDb.collection("produk").doc(id);
  const snap = await docRef.get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Dynamic metadata — await params (Next requirement)
 */
export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const produk = await fetchProdukById(id);

    if (!produk) {
      return {
        title: "Produk tidak ditemukan | Compluss",
        description: "Produk ini tidak tersedia di database kami.",
      };
    }

    return {
      title: produk.nama ? `${produk.nama} | Compluss` : "Produk | Compluss",
      description: produk.deskripsi || `Produk dari Compluss`,
      openGraph: {
        title: produk.nama || "Compluss",
        description: produk.deskripsi || "",
        images: produk.gambarUrl ? [{ url: produk.gambarUrl }] : [],
        type: "product",
        url: `https://www.compluscss.com/produk/${id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: produk.nama || "Compluss",
        description: produk.deskripsi || "",
        images: produk.gambarUrl ? [produk.gambarUrl] : [],
      },
    };
  } catch (err) {
    return {
      title: "Produk | Compluss",
      description: "Produk dari Compluss",
    };
  }
}

/**
 * Page server component — ambil langsung dari Firestore via admin SDK
 */
export default async function Page({ params }) {
  try {
    const { id } = await params;
    const produk = await fetchProdukById(id);

    if (!produk) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Produk tidak ditemukan</h2>
          <p>ID yang dicari: <code>{id}</code></p>
          <p>Pastikan Document ID benar (buka Firebase Console → Firestore → koleksi <strong>produk</strong>).</p>
          <p>
            Jika kamu ingin daftar sample IDs untuk debugging, buka <a href="/api/getProduk/list">/api/getProduk/list</a>.
          </p>
        </div>
      );
    }

    return <ProductDetailClient produk={produk} id={id} />;
  } catch (err) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Terjadi kesalahan saat memuat produk</h2>
        <pre>{String(err)}</pre>
        <p>Pastikan service account (GOOGLE_APPLICATION_CREDENTIALS.json) tersedia dan `lib/firebaseAdminProxy.mjs` berhasil menginisialisasi admin SDK.</p>
      </div>
    );
  }
}
// import admin from "firebase-admin";
// import serviceAccount from "./GOOGLE_APPLICATION_CREDENTIALS.json" assert { type: "json" };

// if (!admin.apps?.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// export const db = admin.firestore();
// export default admin;

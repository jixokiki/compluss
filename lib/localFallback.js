// lib/localFallback.js
// Cadangan gambar & data lokal (dari folder /public) kalau Firebase mati / error.

// Gambar cadangan per jenis layanan (file ada di public/katalog & public/banners)
export const FALLBACK_BY_NAME = {
  JASA: "/katalog/15.jpg",
  MATERIAL: "/katalog/47.jpg",
};

// Gambar umum kalau nama produk tidak dikenal
export const FALLBACK_POOL = [
  "/katalog/15.jpg",
  "/katalog/16.jpg",
  "/katalog/47.jpg",
  "/katalog/49.jpg",
  "/banners/50.png",
  "/banners/48.jpg",
];

// Data cadangan kalau Firestore gagal / kosong
export const FALLBACK_ITEMS = [
  { name: "JASA", url: FALLBACK_BY_NAME.JASA, kategori: "FIDELYA", fullPath: "local/JASA" },
  { name: "MATERIAL", url: FALLBACK_BY_NAME.MATERIAL, kategori: "BAHTIAR", fullPath: "local/MATERIAL" },
];

export function getFallbackImage(name = "") {
  const key = String(name).replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").trim().toUpperCase();
  if (FALLBACK_BY_NAME[key]) return FALLBACK_BY_NAME[key];
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return FALLBACK_POOL[h % FALLBACK_POOL.length];
}

// Dipakai di <img onError={(e) => handleImgError(e, nama)} />
export function handleImgError(e, name) {
  const img = e.currentTarget;
  if (img.dataset.fallbackUsed) return; // cegah loop tak berhingga
  img.dataset.fallbackUsed = "1";
  img.src = getFallbackImage(name);
}

// Supaya getDocs tidak menggantung selamanya kalau server mati
export function withTimeout(promise, ms = 6000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore timeout")), ms)),
  ]);
}

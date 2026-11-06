"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "./produk.module.scss";
// Firestore imports (ditambahkan)
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { FALLBACK_ITEMS, getFallbackImage, handleImgError, withTimeout } from "../lib/localFallback";
// import html2pdf from "html2pdf.js";
// import { P } from "framer-motion/dist/types.d-DsEeKk6G";
// // SALAH (mengimpor internal file)
// import { motion } from 'framer-motion/dist/types.d-DsEeKk6G';

// // BENAR
// import { motion } from 'framer-motion';


/**
 * Simple CartButton lokal — kamu bisa ganti dengan komponen penuh yang sudah kamu punya.
 */
function CartButton({ onClick }) {
  const [count, setCount] = useState(0);
  return (
    <button onClick={onClick} aria-label="Open cart" className={styles.cartBtn}>
      Keranjang ({count})
    </button>
  );
}

// const downloadPDF = () => {
//   const element = document.getElementById("pnr-preview");

//   html2pdf().from(element).save(`PNR-${nomorPNR}.pdf`);
// };
// const downloadPDF = async () => {
//   const html2pdf = (await import("html2pdf.js")).default;

//   const element = document.getElementById("pnr-preview");

//   html2pdf().from(element).save(`PNR-${nomorPNR}.pdf`);
// };


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

function buildWhatsAppLinkForNumber2(number = "", item = {}, jenis = "RO", note = "") {
  const name = sanitizeName(item.name || "");
  // const path = item.fullPath || "";
  const kategori = item.kategori || "";
  // jika jenis Layanan, user mungkin menulis detail di note
  const jenisLabel = jenis === "Layanan" ? "Layanan" : jenis;
  // const baseMessage = `Halo, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}" (Path: ${path}) dengan (Contact Pearson: ${kategori}). ${note ? "Catatan: " + note : ""} Mohon bantuannya. Terima kasih.`;
  const baseMessage = `Halo PT. WAE MANDIRI KARYA, saya ingin KONFIRMASI ${jenisLabel} untuk "${name}". Mohon untuk mengisi form terlebih dahulu:
  
 Nama: 
 Email:
 Nama Perusahaan:
 Departemen:
 Kontak Lain (opsional):
 Jasa terkait:
  
 dengan (Contact Pearson: ${kategori}).

 Catatan : ${note}. Terima Kasih. Mohon untuk ketersediannya untuk menunggu respon dari tim kami 🙏`;
  const encodedMessage = encodeURIComponent(baseMessage);

  // normalisasi nomor
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
/* Daftar kontak master — jangan ubah nama properti
   NOTE: saya memakai nama kontak sesuai daftar asli kamu
   sebagai DEFAULT, dan menambahkan mapping untuk JASA/MATERIAL */
const KONTAK_MASTER = {
  DEFAULT: [
    { label: "FIDELYA NAZHIMAH", number: "6285215949622" },
    { label: "Bahtiar", number: "6281111805974" },
            { label: "Admin", number: "6289654378362" },
  ],
  // khusus JASA => Pidel + Livia (sesuai permintaan sebelumnya: Fidelya/Livia)
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
/* Kontak konfirmasi (ubah nomor di sini jika perlu) — fallback tetap sama */
const KONTAK_KONFIRM = KONTAK_MASTER.DEFAULT;
// const [jenisKontak, setJenisKontak] = useState("DEFAULT");
// const selectedContactName =
//   KONTAK_MASTER[jenisKontak]?.[0]?.label || "PIC";
// const selectedNumber =
//   KONTAK_MASTER[jenisKontak]?.[0]?.number;



// // State untuk modal PNR
// const [pnrModalItem, setPnrModalItem] = useState(null); // item yang sedang di-cetak
// const [pnrItems, setPnrItems] = useState([{ name: '', qty: '' }]);
// const [showPnrPreview, setShowPnrPreview] = useState(false);
/**
 * ContactConfirmOneByOne
 * - Menampilkan kontak satu-per-satu dari kontakList
 * - Menambahkan swipe kiri/kanan (mobile) untuk ganti kontak
 * - Menyertakan click pada nomor untuk langsung kirim WA
 */
function ContactConfirmOneByOne({
  kontakList = KONTAK_KONFIRM,
  item,            // sama dengan `it` di kode Anda
  itemKey,         // sama dengan `key` di kode Anda (identifier item)
  handleSendConfirmation, // function (itemKey, number, item)
  autoAdvance = true,     // opsi: setelah kirim maju ke kontak selanjutnya
  onCetak, // tambahkan ini: callback untuk buka modal cetak
}) {
  const [index, setIndex] = useState(0);
  const total = kontakList.length;
  const current = kontakList[index];

  // touch/swipe handlers
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

  const onTouchEnd = (e) => {
    const start = touchStartXRef.current;
    const end = touchCurrentXRef.current;
    if (start == null || end == null) return;
    const diff = end - start;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        // swipe right -> prev
        setIndex((i) => Math.max(0, i - 1));
      } else {
        // swipe left -> next
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

  // klik langsung pada nomor juga kirim WA
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
      <div style={{ fontSize: 13, marginBottom: 4, color: "#374151" }}>Kontak {index + 1} dari {total}</div>

      <div style={{
        padding: 10,
        borderRadius: 8,
        border: "1px solid rgba(0,0,0,0.06)",
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        gap: 6
      }}>
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
      opacity: index === 0 ? 0.6 : 1
    }}
    disabled={index === 0}
  >
    Prev
  </button>

  {/* <button
  className="link"
  onClick={(e) => {
    e.stopPropagation();
    setPnrModalItem(it); // buka modal untuk item ini
  }}
  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
>
  Cetak
</button> */}

<button
  className="link"
  onClick={(e) => {
    e.stopPropagation();
    if (onCetak) onCetak(item); // buka modal untuk item ini
  }}
  // style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
  style={{
      position: "relative",
      zIndex: 10010,
      pointerEvents: "auto",
      padding: "2px 7px",
      left: -2,
      borderRadius: 6,
      border: "1px solid rgba(0,0,0,0.06)",
      background: "##dc2626",
      cursor: "pointer",
      marginLeft: "auto"
    }}
>
  Cetak
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
      background: "##dc2626",
      cursor: "pointer",
      marginLeft: "auto"
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
      opacity: index === total - 1 ? 0.6 : 1
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
/* ================================================= */


function ContactConfirmOneByOnePlaceholder() {
  // placeholder jika ingin, tidak digunakan langsung — tetap mempertahankan struktur file
  return null;
}

// function PnrModal({ produkItem, onClose }) {
//   const [formItems, setFormItems] = useState([{ name: '', qty: '' }]);
//   const [showPreview, setShowPreview] = useState(false);

//   const [jenisKontak, setJenisKontak] = useState("DEFAULT");
// const selectedContactName =
//   KONTAK_MASTER[jenisKontak]?.[0]?.label || "PIC";
// const selectedNumber =
//   KONTAK_MASTER[jenisKontak]?.[0]?.number;

// //   const downloadPDF = async () => {
// //   const html2pdf = (await import("html2pdf.js")).default;

// //   html2pdf().set({
// //   html2canvas: { ignoreElements: el => el.classList?.contains('no-print') }
// // })


// //   const element = document.getElementById("pnr-preview");

// //   html2pdf().from(element).save(`PNR-${nomorPNR}.pdf`);
// // };

// const downloadPDF = async () => {
//   const html2pdf = (await import("html2pdf.js")).default;

//   const element = document.getElementById("pnr-preview");

//   html2pdf()
//     .set({
//       margin: 0,
//       filename: `PNR-${nomorPNR}.pdf`,
//       html2canvas: {
//         scale: 2,
//         ignoreElements: (el) => el.classList?.contains("no-print")
//       },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
//     })
//     .from(element)
//     .save();
// };


//   const now = new Date();
//   const bulan = String(now.getMonth() + 1).padStart(2, '0');
//   const tahun = now.getFullYear();
//   const nomorPNR = `PNR006-WMK-${bulan}-${tahun}-SPV`;
//   const rePNR = formItems.map(i => i.name).filter(Boolean).join(', ');

//   const updateItem = (index, field, value) => {
//     const next = [...formItems];
//     next[index][field] = value;
//     setFormItems(next);
//   };

//   const addItem = () => setFormItems([...formItems, { name: '', qty: '' }]);
//   const removeItem = (i) => setFormItems(formItems.filter((_, idx) => idx !== i));

//   return (
//     <div style={{
//       position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
//       display: 'flex', justifyContent: 'center', alignItems: 'center',
//       zIndex: 99999
//     }}>
//       <div style={{
//         background: '#fff', width: '90%', maxWidth: 680,
//         maxHeight: '90vh', overflowY: 'auto',
//         borderRadius: 10, padding: 32,
//         fontFamily: '"Times New Roman", serif'
//       }}>

//         {!showPreview ? (
//           <>
//             <h3 style={{ marginTop: 0 }}>Form Input Barang — {sanitizeName(produkItem?.name || '')}</h3>

//             {formItems.map((item, i) => (
//               <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
//                 <input
//                   placeholder="Nama Barang"
//                   value={item.name}
//                   onChange={(e) => updateItem(i, 'name', e.target.value)}
//                   style={{ flex: 2, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc' }}
//                 />
//                 <input
//                   placeholder="QTY"
//                   value={item.qty}
//                   onChange={(e) => updateItem(i, 'qty', e.target.value)}
//                   style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc' }}
//                 />
//                 {formItems.length > 1 && (
//                   <button onClick={() => removeItem(i)}
//                     style={{ padding: '6px 10px', background: '#fee2e2', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
//                     ✕
//                   </button>
//                 )}
//               </div>
//             ))}

//             <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
//               <button onClick={addItem}
//                 style={{ padding: '8px 16px', background: '#e0f2fe', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
//                 + Tambah Barang
//               </button>
//               <button
//                 onClick={() => setShowPreview(true)}
//                 disabled={formItems.every(i => !i.name)}
//                 style={{
//                   padding: '8px 16px', background: '#0d3a5b', color: '#fff',
//                   border: 'none', borderRadius: 6, cursor: 'pointer', marginLeft: 'auto'
//                 }}>
//                 Buat Laporan →
//               </button>
//             </div>

//             <button onClick={onClose}
//               style={{ marginTop: 16, padding: '6px 14px', background: '#f3f4f6', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
//               Batal
//             </button>
//           </>
//         ) : (
//           // ---- PREVIEW SURAT PNR ----
//           // <>
//           //   <div style={{ textAlign: 'center', marginBottom: 8 }}>
//           //     <strong style={{ fontSize: 15, letterSpacing: 1 }}>PT. WAE MANDIRI KARYA</strong>
//           //   </div>
//           //   <hr />
//           //   <p style={{ margin: '4px 0' }}><strong>Nomor PNR</strong> : {nomorPNR}</p>
//           //   <p style={{ margin: '4px 0' }}><strong>Re PNR</strong> : {rePNR}</p>
//           //   <p style={{ margin: '12px 0 4px' }}>Dengan Hormat,</p>
//           //   <p style={{ margin: '0 0 12px', lineHeight: 1.6 }}>
//           //     Berikut ini kami ajukan penawaran harga Barang kepada Bapak/Ibu,
//           //     dengan rincian sebagai berikut:
//           //   </p>

//           //   <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
//           //     <thead>
//           //       <tr style={{ background: '#f1f5f9' }}>
//           //         {['NO', 'NAMA BARANG', 'QTY', 'HARGA SATUAN', 'TOTAL'].map(h => (
//           //           <th key={h} style={{ border: '1px solid #000', padding: '6px 8px' }}>{h}</th>
//           //         ))}
//           //       </tr>
//           //     </thead>
//           //     <tbody>
//           //       {formItems.map((item, i) => (
//           //         <tr key={i}>
//           //           <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center' }}>{i + 1}</td>
//           //           <td style={{ border: '1px solid #000', padding: '6px 8px' }}>{item.name}</td>
//           //           <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center' }}>{item.qty}</td>
//           //           <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center' }}>-</td>
//           //           <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center' }}>-</td>
//           //         </tr>
//           //       ))}
//           //     </tbody>
//           //   </table>

//           //   <div style={{ marginTop: 16, lineHeight: 2 }}>
//           //     <p style={{ margin: 0 }}>TOTAL : -</p>
//           //     <p style={{ margin: 0 }}>Disc 10% : -</p>
//           //     <p style={{ margin: 0 }}><strong>Jumlah Total : -</strong></p>
//           //   </div>

//           //   <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
//           //     <button onClick={() => setShowPreview(false)}
//           //       style={{ padding: '8px 14px', background: '#f3f4f6', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
//           //       ← Edit
//           //     </button>
//           //     <button onClick={() => window.print()}
//           //       style={{ padding: '8px 16px', background: '#0d3a5b', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', marginLeft: 'auto' }}>
//           //       Print / Simpan PDF
//           //     </button>
//           //     <button onClick={onClose}
//           //       style={{ padding: '8px 14px', background: '#fee2e2', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
//           //       Tutup
//           //     </button>
//           //   </div>
//           // </>
//           // <>
//           <div id="pnr-preview">
//   <div style={{
//     background: '#fff',
//     padding: '28mm 22mm',
//     border: '1px solid #ccc',
//     boxShadow: '0 0 8px rgba(0,0,0,0.15)',
//     lineHeight: 1.5,
//     fontSize: 13
//   }}>

//     {/* HEADER */}
//     {/* <div style={{ textAlign: 'center' }}>
//       <div style={{ fontWeight: 'bold', fontSize: 16 }}>PT. WAE MANDIRI KARYA</div>
//       <div style={{ fontSize: 12 }}>
//         JL. BKKBN No. 7 RT. 02 RW.07, Mustika Jaya, Bekasi 17158
//       </div>
//       <div style={{ fontSize: 12 }}>
//         Email : pt.waemandirikarya@gmail.com | Phone : 0812 6888 8969
//       </div>
//     </div> */}
//     {/* HEADER */}
// <div style={{
//   display: 'flex',
//   alignItems: 'center',
//   gap: 12
// }}>
//   <img
//     src="/wmk.png" // ganti sesuai path logo kamu
//     style={{ width: 60, height: 'auto' }}
//   />

//   <div style={{ textAlign: 'left' }}>
//     <div style={{ fontWeight: 'bold', fontSize: 14 }}>
//       PT. WAE MANDIRI KARYA
//     </div>
//     <div style={{ fontSize: 12 }}>
//       JL. BKKBN No. 7 RT. 02 RW.07, Mustika Jaya, Bekasi 17158
//     </div>
//     <div style={{ fontSize: 12 }}>
//       Email : pt.waemandirikarya@gmail.com | Phone : 0812 6888 8969
//     </div>
//   </div>
// </div>

// <hr style={{ marginTop: 10, border: '1px solid #000' }} />


//     <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
//       <div>
//         <div>Kepada :</div>
//         <div>Alamat :</div>
//         <div>Attn :</div>
//       </div>

//       {/* <div style={{ textAlign: 'right' }}> */}
//       <div style={{ textAlign: 'left' }}>
//         <div>Tanggal : Bekasi, {new Date().toLocaleDateString('id-ID')}</div>
//         <div>Nomor PNR : {nomorPNR}</div>
//         <div>Revisi PNR : 0</div>
//       </div>
//     </div>

//     <div style={{ marginTop: 10 }}>
//       <strong>Re PNR :</strong> {rePNR}
//     </div>

//     <p style={{ marginTop: 16 }}>Dengan Hormat,</p>

//     <p>
//       Berikut ini kami ajukan penawaran harga Barang kepada Bapak/Ibu,
//       dengan rincian sebagai berikut :
//     </p>

//     {/* TABLE */}
//     {/* <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
//       <thead>
//         <tr>
//           {['NO', 'NAMA BARANG', 'QTY', 'HARGA SATUAN', 'TOTAL'].map(h => (
//             <th key={h} style={{
//               border: '1px solid #000',
//               padding: '6px',
//               textAlign: 'center'
//             }}>
//               {h}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {formItems.map((item, i) => (
//           <tr key={i}>
//             <td style={{ border: '1px solid #000', textAlign: 'center' }}>{i + 1}</td>
//             <td style={{ border: '1px solid #000', padding: 4 }}>{item.name}</td>
//             <td style={{ border: '1px solid #000', textAlign: 'center' }}>{item.qty}</td>
//             <td style={{ border: '1px solid #000', textAlign: 'center' }}>-</td>
//             <td style={{ border: '1px solid #000', textAlign: 'center' }}>-</td>
//           </tr>
//         ))}
//       </tbody>
//     </table> */}

//     <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
//   <thead>
//     <tr>
//       {['NO', 'NAMA BARANG', 'QTY', 'HARGA SATUAN', 'TOTAL'].map(h => (
//         <th key={h} style={{ border: '1px solid #000', padding: 6, textAlign: 'center' }}>
//           {h}
//         </th>
//       ))}
//     </tr>
//   </thead>

//   <tbody>
//     {formItems.map((item, i) => (
//       <tr key={i}>
//         <td style={{ border: '1px solid #000', textAlign: 'center' }}>{i + 1}</td>
//         <td style={{ border: '1px solid #000', padding: 4 }}>{item.name}</td>
//         <td style={{ border: '1px solid #000', textAlign: 'center' }}>{item.qty}</td>
//         <td style={{ border: '1px solid #000', textAlign: 'center' }}>-</td>
//         <td style={{ border: '1px solid #000', textAlign: 'center' }}>-</td>
//       </tr>
//     ))}

//     {/* TOTAL SECTION */}
//     {/* <tr>
//       <td colSpan="1" style={{ border: '1px solid #000' }}></td>
//             <td colSpan="2" style={{ border: '1px solid #000' }}></td>
//                   <td colSpan="3" style={{ border: '1px solid #000' }}></td>
//       <td  style={{ border: '1px solid #000', padding: 6 }}>TOTAL :</td>
//       <td  style={{ border: '1px solid #000', padding: 6 }}>-</td>
//     </tr>

//     <tr>
//       <td colSpan="1" style={{ border: '1px solid #000' }}></td>
//             <td colSpan="2" style={{ border: '1px solid #000' }}></td>
//       <td colSpan="3" style={{ border: '1px solid #000' }}></td>
//       <td style={{ border: '1px solid #000', padding: 6 }}>disc 10% :</td>
//       <td style={{ border: '1px solid #000', padding: 6 }}>-</td>
//     </tr>

//     <tr>
//       <td colSpan="1" style={{ border: '1px solid #000' }}></td>
//             <td colSpan="2" style={{ border: '1px solid #000' }}></td>
//       <td colSpan="3" style={{ border: '1px solid #000' }}></td>
//       <td style={{ border: '1px solid #000', padding: 6 }}>
//         <strong>Jumlah Total :</strong>
//       </td>
//       <td style={{ border: '1px solid #000', padding: 6 }}>
//         <strong>-</strong>
//       </td>
//     </tr> */}
//       <tr>
//     <td colSpan="3" style={{ border: '1px solid #000', height: 30 }}></td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>TOTAL :</td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>-</td>
//   </tr>

//   <tr>
//     <td colSpan="3" style={{ border: '1px solid #000', height: 30 }}></td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>disc 10% :</td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>-</td>
//   </tr>

//   <tr>
//     <td colSpan="3" style={{ border: '1px solid #000', height: 30 }}></td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>
//       <strong>Jumlah Total :</strong>
//     </td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>
//       <strong>-</strong>
//     </td>
//   </tr>

//   </tbody>
// </table>


//     {/* SUMMARY */}
//     {/* <div style={{ marginTop: 12, textAlign: 'right' }}>
//       <div>TOTAL : -</div>
//       <div>disc 10% : -</div>
//       <div><strong>Jumlah Total : -</strong></div>
//     </div> */}
//     {/* <tfoot>
//   <tr>
//     <td style={{ border: '1px solid #000', padding: 20 }}>
//     </td>
//     <td style={{ border: '1px solid #000', padding: 20 }}>
//     </td>
//     <td colSpan="3"></td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>TOTAL :</td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>-</td>
//   </tr>

//   <tr>
//     <td style={{ border: '1px solid #000', padding: 20 }}>
//     </td>
//     <td style={{ border: '1px solid #000', padding: 20 }}>
//     </td>
//     <td colSpan="3"></td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>disc 10% :</td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>-</td>
//   </tr>

//   <tr>
//     <td style={{ border: '1px solid #000', padding: 20 }}>
//     </td>
//     <td style={{ border: '1px solid #000', padding: 20 }}>
//     </td>
//     <td colSpan="3"></td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>
//       <strong>Jumlah Total :</strong>
//     </td>
//     <td style={{ border: '1px solid #000', padding: 6 }}>
//       <strong>-</strong>
//     </td>
//   </tr>
// </tfoot> */}


//     <p style={{ marginTop: 20 }}>
//       Demikian surat penawaran harga ini kami ajukan, semoga dapat menjadi bahan pertimbangan Bapak/Ibu,
//       atas perhatian dan kerjasamanya kami ucapkan terima kasih.
//     </p>

//     <div style={{ marginTop: 16 }}>
//       <strong>Keterangan :</strong>
//       <ul style={{ marginTop: 6 }}>
//         <li>Harga diatas belum termasuk PPN 11%</li>
//         <li>Penawaran ini berlaku selama 30 hari</li>
//       </ul>
//     </div>

//     {/* <div style={{ marginTop: 40, textAlign: 'right' }}>
//       Hormat Kami,
//       <img
//     src="/wmk.png" // ganti sesuai path logo kamu
//     style={{ width: 100, height: 'auto', position: 'right'}}
//   />
//       <div style={{ marginTop: 10, textAlign: 'right' }}>
//         <strong>FIDELYA NAZHIMAH</strong>
//         <strong>KONTAK_MASTER{}</strong> 
//         harusnya berdasarkan jenis kontak dari KONTAK_MASTER (JASA/MATERIAL) yang dipilih sebelumnya
//         <hr style={{ marginTop: 10, border: '1px solid #000' }} />
//       </div>
//     </div> */}
//     <div style={{ marginTop: 40, textAlign: 'right' }}>
//   Hormat Kami,

//   <div style={{ marginTop: 10, marginLeft: '370px', textAlign: 'center' }}>
//     <img src="/wmk.png" style={{ width: 90 }} />
//   </div>

//   <div style={{
//     display: 'inline-block',
//     borderBottom: '1px solid #000',
//     marginTop: 10,
//     paddingBottom: 2,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   }}>
//     {selectedContactName}
//   </div>
//   <div>
//     {selectedNumber}
//   </div>
// </div>


// <div className="no-print" style={{ display: 'flex', gap: 8, marginTop: 20 }}>
//                <button onClick={() => setShowPreview(false)}
//                  style={{ padding: '8px 14px', background: '#f3f4f6', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
//                  ← Edit
//                </button>
//                {/* <button onClick={() => window.print()} */}
//                               <button onClick={downloadPDF}
//                               className="no-print"
//                  style={{ padding: '8px 16px', background: '#0d3a5b', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', marginLeft: 'auto' }}>
//                  Print / Simpan PDF
//                </button>
//                <button onClick={onClose}
//                className="no-print"
//                  style={{ padding: '8px 14px', background: '#fee2e2', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
//                  Tutup
//                </button>
//              </div>
//   </div>
// {/* </> */}
// </div>

//         )}
//       </div>
//     </div>
//   );
// }


function PnrModal({ produkItem, onClose }) {
  const [formItems, setFormItems] = useState([{ name: '', qty: '', unit: 'EA' }]);
  const [showPreview, setShowPreview] = useState(false);
  const [jenisKontak, setJenisKontak] = useState("DEFAULT");

  const selectedContactName = KONTAK_MASTER[jenisKontak]?.[0]?.label || "PIC";
  const selectedNumber = KONTAK_MASTER[jenisKontak]?.[0]?.number;

  const downloadPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = document.getElementById("pnr-preview");

    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: `PNR-${nomorPNR}.pdf`,
        html2canvas: {
          scale: 2,
          ignoreElements: (el) => el.classList?.contains("no-print")
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(element)
      .save();
  };

  const now = new Date();
  const bulan = String(now.getMonth() + 1).padStart(2, '0');
  const tahun = now.getFullYear();
  const nomorPNR = `PNR006-WMK-${bulan}-${tahun}-SPV`;
  const rePNR = formItems.map(i => i.name).filter(Boolean).join(', ');

  const updateItem = (index, field, value) => {
    const next = [...formItems];
    next[index][field] = value;
    setFormItems(next);
  };

  const addItem = () => setFormItems([...formItems, { name: '', qty: '', unit: 'EA' }]);
  const removeItem = (i) => setFormItems(formItems.filter((_, idx) => idx !== i));

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 99999
    }}>
      <div style={{
        background: '#fff', width: '90%', maxWidth: 800,
        maxHeight: '95vh', overflowY: 'auto',
        borderRadius: 10, padding: 32,
        fontFamily: '"Times New Roman", serif'
      }}>

        {!showPreview ? (
          <>
            <h3 style={{ marginTop: 0 }}>Form Input Barang — {sanitizeName(produkItem?.name || '')}</h3>

            {/* Pilih Jenis Kontak */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 4, fontWeight: 600 }}>
                Pilih Contact Person (akan muncul di tanda tangan)
              </label>
              <select
                value={jenisKontak}
                onChange={(e) => setJenisKontak(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
              >
                <option value="DEFAULT">Default (Pidel/Bahtiar)</option>
                <option value="JASA">JASA (Pidel/Admin)</option>
                <option value="MATERIAL">MATERIAL (Bahtiar/Admin)</option>
              </select>
            </div>

            {formItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
                <input
                  placeholder="Nama Barang"
                  value={item.name}
                  onChange={(e) => updateItem(i, 'name', e.target.value)}
                  style={{ flex: 3, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc' }}
                />
                <input
                  placeholder="QTY"
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateItem(i, 'qty', e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc' }}
                />
                <select
                  value={item.unit}
                  onChange={(e) => updateItem(i, 'unit', e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc' }}
                >
                  <option value="EA">EA</option>
                  <option value="PCS">PCS</option>
                  <option value="UNIT">UNIT</option>
                  <option value="SET">SET</option>
                  <option value="LOT">LOT</option>
                </select>
                {formItems.length > 1 && (
                  <button onClick={() => removeItem(i)}
                    style={{ padding: '6px 10px', background: '#fee2e2', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                    ✕
                  </button>
                )}
              </div>
            ))}

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={addItem}
                style={{ padding: '8px 16px', background: '#e0f2fe', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                + Tambah Barang
              </button>
              <button
                onClick={() => setShowPreview(true)}
                disabled={formItems.every(i => !i.name)}
                style={{
                  padding: '8px 16px', background: '#0d3a5b', color: '#fff',
                  border: 'none', borderRadius: 6, cursor: 'pointer', marginLeft: 'auto',
                  opacity: formItems.every(i => !i.name) ? 0.5 : 1
                }}>
                Buat Laporan →
              </button>
            </div>

            <button onClick={onClose}
              style={{ marginTop: 16, padding: '6px 14px', background: '#f3f4f6', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
              Batal
            </button>
          </>
        ) : (
          <div id="pnr-preview">
            <div style={{
              background: '#fff',
              padding: '20mm 15mm',
              lineHeight: 1.4,
              fontSize: 11,
              fontFamily: 'Arial, sans-serif'
            }}>

              {/* HEADER dengan Logo */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 15,
                borderBottom: '3px solid #000',
                paddingBottom: 10
              }}>
                <img
                  src="/wmk.png"
                  alt="Logo WMK"
                  style={{ width: 80, height: 80, objectFit: 'contain' }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>
                    PT. WAE MANDIRI KARYA
                  </div>
                  <div style={{ fontSize: 10 }}>
                    JL. BKKBN No. 7 RT. 02 RW.07, Mustika Jaya, Mustika Jaya, Bekasi 17158
                  </div>
                  <div style={{ fontSize: 10 }}>
                    Email : pt.waemandirikarya@gmail.com
                  </div>
                  <div style={{ fontSize: 10 }}>
                    Phone : 0812 6888 8969
                  </div>
                </div>
              </div>

              {/* Kepada & Detail PNR */}
              <div style={{ 
                marginTop: 20, 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
                fontSize: 11
              }}>
                <div>
                  <div style={{ marginBottom: 3 }}>Kepada : -</div>
                  <div style={{ marginBottom: 3 }}>Alamat : -</div>
                  <div>Attn : -</div>
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div style={{ marginBottom: 3 }}>
                    Tanggal : Bekasi, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div style={{ marginBottom: 3 }}>Nomor PNR : {nomorPNR}</div>
                  <div>Revisi PNR : 0</div>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 11 }}>
                <strong>Re PNR :</strong> {rePNR}
              </div>

              <p style={{ marginTop: 16, marginBottom: 8, fontSize: 11 }}>
                Dengan Hormat,
              </p>

              <p style={{ marginBottom: 16, fontSize: 11, lineHeight: 1.5 }}>
                Berikut ini kami ajukan penawaran harga <strong>Barang</strong> kepada Bapak/Ibu, dengan rincian sebagai berikut :
              </p>

              {/* TABEL BARANG */}
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse', 
                marginTop: 12,
                fontSize: 11,
                border: '2px solid #000'
              }}>
                <thead>
                  <tr style={{ background: '#fff' }}>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '8px 6px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      width: '5%'
                    }}>NO</th>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '8px 6px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      width: '45%'
                    }}>NAMA BARANG</th>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '8px 6px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      width: '10%'
                    }}>QTY</th>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '8px 6px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      width: '20%'
                    }}>HARGA SATUAN</th>
                    <th style={{ 
                      border: '1px solid #000', 
                      padding: '8px 6px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      width: '20%'
                    }}>TOTAL</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Baris Header MATERIAL */}
                  <tr>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px', 
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>A</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px',
                      fontWeight: 'bold'
                    }}>MATERIAL</td>
                    <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}>-</td>
                      <td colSpan="1" style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}>-</td>
                      <td colSpan="1" style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}>-</td>
                  </tr>

                  {/* Data Barang */}
                  {formItems.map((item, i) => (
                    <tr key={i}>
                      <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}>{i + 1}</td>
                      <td style={{ 
                        border: '1px solid #000', 
                        padding: '6px 8px'
                      }}>{item.name}</td>
                      <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}>{item.qty} {item.unit}</td>
                      <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}>-</td>
                      <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}>-</td>
                    </tr>
                  ))}

                  {/* Baris kosong sebagai spacer (opsional, bisa dihapus) */}
                  <tr>
                    <td style={{ 
                      border: '1px solid #000', 
                      height: 20 
                    }}></td>
                    <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                      <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                      <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                      <td colSpan="1" style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                  </tr>

                  {/* TOTAL */}
                  <tr>
                    <td style={{ 
                      border: '1px solid #000', 
                      height: 30 
                    }}></td>
                    <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                      <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px',
                      textAlign: 'left',
                      fontWeight: 'normal'
                    }}>TOTAL</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px',
                      textAlign: 'center'
                    }}>-</td>
                  </tr>

                  {/* disc 10% */}
                  <tr>
                    <td style={{ 
                      border: '1px solid #000', 
                      height: 30 
                    }}></td>
                    <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                      <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px',
                      textAlign: 'left',
                      fontWeight: 'normal'
                    }}>disc 10%</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px',
                      textAlign: 'center'
                    }}>-</td>
                  </tr>

                  {/* Jumlah Total */}
                  <tr>
                    <td  style={{ 
                      border: '1px solid #000', 
                      height: 30 
                    }}></td>
                    <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                      <td style={{ 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        padding: '6px'
                      }}></td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px',
                      textAlign: 'left',
                      fontWeight: 'bold'
                    }}>Jumlah Total</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px',
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>-</td>
                  </tr>
                </tbody>
              </table>

              {/* Penutup */}
              <p style={{ marginTop: 20, fontSize: 11, lineHeight: 1.5 }}>
                Demikian surat penawaran harga ini kami ajukan, semoga dapat menjadi bahan pertimbangan Bapak/Ibu, 
                atas perhatian dan kerjasamanya kami ucapkan terima kasih.
              </p>

              {/* Keterangan */}
              <div style={{ marginTop: 16, fontSize: 11 }}>
                <strong>Keterangan :</strong>
                <ul style={{ marginTop: 6, marginLeft: 20, lineHeight: 1.6 }}>
                  <li>Harga diatas belum termasuk PPN 11%</li>
                  <li>Penawaran ini berlaku selama 30 hari</li>
                </ul>
              </div>

              {/* Tanda Tangan */}
              <div style={{ 
                marginTop: 50, 
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <div style={{ textAlign: 'center', minWidth: 200 }}>
                  <div style={{ fontSize: 11, marginBottom: 10 }}>
                    Hormat Kami,
                  </div>

                  <div style={{ marginBottom: 10, marginLeft: '60px' }}>
                    <img src="/wmk.png" alt="Logo" style={{ width: 80, height: 80 }} />
                  </div>

                  <div style={{
                    fontWeight: 'bold',
                    fontSize: 11,
                    borderBottom: '1px solid #000',
                    display: 'inline-block',
                    paddingBottom: 2,
                    marginBottom: 10,
                    minWidth: 180,
                    textAlign: 'center'
                  }}>
                    {selectedContactName.toUpperCase()}
                  </div>

                  <div style={{ fontSize: 10, marginTop: 10 }}>
                    {selectedNumber}
                  </div>
                </div>
              </div>

              {/* Tombol Aksi (tidak akan tercetak) */}
              <div className="no-print" style={{ 
                display: 'flex', 
                gap: 8, 
                marginTop: 30,
                paddingTop: 20,
                borderTop: '2px dashed #ccc'
              }}>
                <button 
                  onClick={() => setShowPreview(false)}
                  style={{ 
                    padding: '10px 16px', 
                    background: '#f3f4f6', 
                    border: 'none', 
                    borderRadius: 6, 
                    cursor: 'pointer',
                    fontSize: 13
                  }}>
                  ← Edit
                </button>

                <button 
                  onClick={downloadPDF}
                  className="no-print"
                  style={{ 
                    padding: '10px 20px', 
                    background: '#0d3a5b', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 6, 
                    cursor: 'pointer', 
                    marginLeft: 'auto',
                    fontSize: 13,
                    fontWeight: 600
                  }}>
                  📄 Download PDF
                </button>

                <button 
                  onClick={onClose}
                  className="no-print"
                  style={{ 
                    padding: '10px 16px', 
                    background: '#fee2e2', 
                    border: 'none', 
                    borderRadius: 6, 
                    cursor: 'pointer',
                    fontSize: 13
                  }}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProdukPage2({ storagePath = "produk_complus" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [pnrModalItem, setPnrModalItem] = useState(null); // item yang sedang di-cetak

    // state untuk popover Konfirmasi per item (store map of fullPath->open)
  const [confirmOpenMap, setConfirmOpenMap] = useState({}); // { [key]: true }
  // state detail untuk setiap popover: jenis + note
  const [confirmStateMap, setConfirmStateMap] = useState({}); // { [key]: { jenis, note } }

  // const [confirmOpenMap, setConfirmOpenMap] = useState({}); // object keyed by 'key'
const [confStateMap, setConfStateMap] = useState({}); // optional, per-row conf state

  // close popovers when clicking outside
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


// fungsi baru: coba ambil dari Firestore (collection "produk")
async function loadFromFirestore() {
  try {
    setLoading(true);
    setError(null);
    const snap = await withTimeout(getDocs(collection(db, "produk")), 6000);
    const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (!cancelled) {
      // map ke format yang dipakai komponen (name, url, fullPath)
      const mapped = arr.map((p) => ({
        name: p.nama || p.name || (p.gambarUrl ? p.gambarUrl.split("/").pop() : "unknown"),
        url: p.gambarUrl || p.url || "",
        kategori: p.kategori || "",
        fullPath: p.path || p.fullPath || p.storagePath || (p.gambarUrl ? p.gambarUrl.split("/").pop() : ""),
      }));
      // set only jika ada hasil — jika kosong, biarkan fallback ke listFiles
      if (mapped.length > 0) {
        setItems(mapped);
        return true; // menandakan sukses pakai firestore
      }
    }
  } catch (e) {
    console.warn("loadFromFirestore gagal:", e);
    /* error ditangani oleh fallback lokal */
  } finally {
    // jangan setLoading(false) di sini karena fetchAll/flow utama yang mengatur loading akhir
  }
  return false;
}

async function fetchAll() {
  setLoading(true);
  setError(null);

  try {
    // Derive base URL safely (remove trailing slash jika ada)
    const rawBase = process.env.NEXT_PUBLIC_API_BASE || "";
    const base = rawBase ? rawBase.replace(/\/+$/, "") : "";

    // Jika frontend & API di domain sama (misal deploy di Vercel bersama),
    // lebih aman gunakan relative endpoint untuk menghindari CORS:
    const sameOrigin = typeof window !== "undefined" && base && window.location.origin === base;
    const url = sameOrigin
      ? "/listFiles"
      : base
      ? `${base}/listFiles`
      : "/listFiles"; // fallback ke relative supaya dev lokal tetap jalan

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // debug: non-cache untuk memastikan tidak baca cache lama
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

// Flow: coba Firestore dulu -> jika tidak berhasil (kosong/gagal) fallback ke listFiles
(async () => {
  const usedFirestore = await loadFromFirestore();
  if (!cancelled) {
    if (usedFirestore) {
      // sudah set items dari Firestore; hentikan loading
      setLoading(false);
    } else {
      // fallback ke listFiles jika Firestore kosong atau gagal
      await fetchAll();
    }
  }
})();

return () => {
  cancelled = true;
};


}, [storagePath]);

  const handleSendConfirmation = (key, contactNumber, item) => {
    // Perbaikan: baca dari confirmStateMap (yang lama) atau confStateMap (yang kita pakai untuk input)
    const stateA = confirmStateMap[key];
    const stateB = confStateMap[key];
    const state = stateA || stateB || { jenis: "RO", note: "" };
    const jenis = state.jenis || "RO";
    const note = state.note || "";

    const waUrl = buildWhatsAppLinkForNumber(contactNumber, item, jenis, note);
    // open WA in new tab
    try {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (e) {
      // fallback - set location (untested but cover some environments)
      window.location.href = waUrl;
    }
    // close popover
    setConfirmOpenMap((m) => ({ ...m, [key]: false }));
  };


/* helper toggle per key (sesuaikan dengan implementasi Anda) */
const toggleConfirm = (key) => {
  setConfirmOpenMap(prev => ({ ...prev, [key]: !prev[key] }));
};

const setConfirmOpen = (key, value) => {
  setConfirmOpenMap(prev => ({ ...prev, [key]: value }));
};

/* contoh updateConfirmState per-row */
const updateConfirmState = (key, patch) => {
  setConfStateMap(prev => ({ ...prev, [key]: { ...(prev[key] || {}), ...patch } }));
};

/* helper untuk memilih kontak sesuai nama item */
const pickKontakForItem = (it) => {
  const name = (sanitizeName(it.name || "") || "").trim().toUpperCase();
  if (name === "JASA") return KONTAK_MASTER.JASA;
  if (name === "MATERIAL") return KONTAK_MASTER.MATERIAL;
  return KONTAK_KONFIRM;
};

// State untuk modal PNR
const [pnrItems, setPnrItems] = useState([{ name: '', qty: '' }]);
const [showPnrPreview, setShowPnrPreview] = useState(false);

  return (
    <>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

      <main>
        <section id="layanankami" className={styles.produkSection}>
          <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h3>KAMI MENAWARKAN</h3>

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
  style={{ overflow: "visible" }} // <- tambahan penting supaya popover tidak terpotong
>

                    <div className={styles.badge}>PT WAE MANDIRI KARYA</div>

                    <img src={it.url || getFallbackImage(it.name)} alt={it.name} onError={(e) => handleImgError(e, it.name)} />

                    <div className={styles.info}>
                      <h4>{sanitizeName(it.name)}</h4>
                      {/* <div className={styles.kategori}>Path: {it.fullPath}</div> */}
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
                            // toggle popover untuk konfirmasi
                            toggleConfirm(key);
                          }}
                        >
                          Konfirmasi
                        </button>

                        {/* Popover kecil */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
           style={{
            position: "absolute",
        bottom: 44,
        right: 0,
        zIndex: 9999,               // tampil di atas semua
        minWidth: 260,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        padding: 12,
        borderRadius: 8,
        maxHeight: 320,            // batasi tinggi supaya muat di layar
        overflowY: "auto",
        pointerEvents: "auto",     // pastikan event klik diterima
        paddingBottom: 72,         // beri ruang ekstra bawah supaya tombol tidak tertutup saat di-scroll
        transform: "translateY(-6px)",
    }}
        >
          <div style={{ marginBottom: 8, fontWeight: 600 }}>Konfirmasi lewat</div>

          {/* jenis konfirmasi */}
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

          {/* catatan */}
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Catatan (opsional)</label>
            <input
              value={(confStateMap[key] && confStateMap[key].note) ?? (confState.note || "")}
              onChange={(e) => updateConfirmState(key, { note: e.target.value })}
              placeholder="Contoh: jumlah / tanggal / catatan lain"
              style={{ width: "100%", padding: 6 }}
            />
          </div>

          {/* kontak list */}
          {/* diganti: tampilkan satu-per-satu memakai ContactConfirmOneByOne */}
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Pilih Konfirmasi Kontak</label>

            <ContactConfirmOneByOne
              kontakList={kontakToUse}
              item={it}
              itemKey={key}
              handleSendConfirmation={handleSendConfirmation}
              autoAdvance={true}
              onCetak={() => setPnrModalItem(it)} // tambahkan ini: pass callback untuk set state modal
            />

          </div>
                {/* kita buat sticky supaya selalu terlihat di bagian bawah popover */}
      <div
        style={{
          position: "sticky",
          bottom: 100,
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 8,
          background: "transparent", // agar tidak menutupi content ketika di-scroll
          zIndex: 10000,             // lebih atas dari isi popover
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
              <h3>Butuh bantuan pilih layanan?</h3>
              <a href="/kontak">Layanan Kami</a>
            </div>
          </div>
        </section>

        {/* <footer className={styles.footer}>© {new Date().getFullYear()} WMK — Semua hak dilindungi</footer> */}
      </main>

      {sidebarOpen && <div className={styles.cartOverlay} onClick={() => setSidebarOpen(false)}></div>}
      <aside className={`${styles.cartSidebar} ${sidebarOpen ? styles.openSidebar : ""}`} aria-hidden={!sidebarOpen}>
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
      </aside>
      {/* Modal PNR */}
{pnrModalItem && (
  <PnrModal
    produkItem={pnrModalItem}
    onClose={() => setPnrModalItem(null)}
  />
)}
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

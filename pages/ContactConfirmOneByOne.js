import React, { useState, useEffect } from "react";

const KONTAK_KONFIRM = [
  { label: "Pidel", number: "6285215949622" },
  { label: "Bahtiar", number: "6281111805974" },
//   { label: "Livia", number: "6289654378362" },
];

function ContactConfirmOneByOne({
  kontakList = KONTAK_KONFIRM,
  item,            // sama dengan `it` di kode Anda
  itemKey,         // sama dengan `key` di kode Anda (identifier item)
  note,
  handleSendConfirmation, // function (itemKey, number, item)
  autoAdvance = true,     // opsi: setelah kirim maju ke kontak selanjutnya
}) {
  const [index, setIndex] = useState(0);
  const total = Array.isArray(kontakList) ? kontakList.length : 0;

  // Jika daftar berubah (mis. menjadi lebih pendek), sesuaikan index agar valid
  useEffect(() => {
    if (index >= total) {
      setIndex(Math.max(0, total - 1));
    }
  }, [total, index]);

  // Jika tidak ada kontak, tampilkan pesan singkat
  if (total === 0) {
    return (
      <div style={{ marginBottom: 8, maxWidth: 420 }}>
        <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
          Pilih Konfirmasi Kontak
        </label>
        <div
          style={{
            padding: "12px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.06)",
            background: "#fff",
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          Tidak ada kontak untuk dikonfirmasi.
        </div>
      </div>
    );
  }

  // current aman karena total > 0 dan index telah disesuaikan oleh useEffect
  const current = kontakList[index];

  const onPrev = () => setIndex((i) => Math.max(0, i - 1));
  const onNext = () => setIndex((i) => Math.min(total - 1, i + 1));

  const onSend = () => {
    if (typeof handleSendConfirmation === "function") {
      handleSendConfirmation(itemKey, current.number, item, note);
    }
    if (autoAdvance && index < total - 1) {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div style={{ marginBottom: 8, maxWidth: 420 }}>
      <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
        Pilih Konfirmasi Kontak
      </label>

      <div
        style={{
          padding: "12px",
          borderRadius: 8,
          border: "1px solid rgba(0,0,0,0.06)",
          background: "#fff",
        }}
      >
        {/* Header indikator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 13 }}>
            <strong>{current?.label ?? "—"}</strong>
            <div style={{ fontSize: 12, color: "#4b5563" }}>{current?.number ?? ""}</div>
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{index + 1} / {total}</div>
        </div>

        {/* Aksi */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={onPrev}
            disabled={index === 0}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,0.06)",
              background: index === 0 ? "#f3f4f6" : "#fafafa",
              cursor: index === 0 ? "not-allowed" : "pointer",
            }}
          >
            Prev
          </button>

          <button
            type="button"
            onClick={onSend}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,0.06)",
              background: "#ecfdf5",
              cursor: "pointer",
              color: "#065f46",
              fontWeight: 600,
            }}
          >
            Kirim
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={index === total - 1}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,0.06)",
              background: index === total - 1 ? "#f3f4f6" : "#fafafa",
              cursor: index === total - 1 ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactConfirmOneByOne;

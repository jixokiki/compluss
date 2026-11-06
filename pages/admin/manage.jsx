// ✅ Final Full Code (Card Style Layout) for Next.js
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSuccessToast, showErrorToast, showInfoToast } from "../../lib/toast";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from "framer-motion";
import styles from "./manageProduk.module.scss";
import axios from "axios"; // tambahkan axios (opsional, bisa pakai fetch)

export default function ManageProduk() {
  const [produk, setProduk] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    const snapshot = await getDocs(collection(db, "produk"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProduk(data);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditData({ ...item });
  };

  // const handleEditSubmit = async () => {
  //   await updateDoc(doc(db, "produk", editId), editData);
  //   toast.success("✏️ Produk berhasil diupdate!");
  //   setEditId(null);
  //   fetchProduk();
  // };
  // --- bagian atas tetap (imports dll) ---

// const handleEditSubmit = async () => {
//   try {
//     // Validasi sederhana
//     if (!editData.nama) {
//       showErrorToast("Nama produk tidak boleh kosong");
//       return;
//     }

//     // Ambil dokumen yang sedang diedit dari produk state (biar ada data lama)
//     const original = produk.find((p) => p.id === editId);
//     if (!original) {
//       showErrorToast("Data produk tidak ditemukan");
//       return;
//     }

//     // Jika gambarUrl tidak ada atau tidak mengandung path storage, kita hanya update Firestore
//     const oldPath = original.path || original.storagePath || ""; // nama field path di Firestore (sesuaikan)
//     const oldUrl = original.gambarUrl || original.url || "";

//     // Fungsi pembantu untuk membuat file name baru berdasarkan nama produk
//     const makeFileNameFromName = (name, ext) => {
//       const safe = name
//         .toString()
//         .trim()
//         .toLowerCase()
//         .replace(/\s+/g, "-")
//         .replace(/[^a-z0-9\-\.]/g, "");
//       return `${safe}${ext}`;
//     };

//     let newPath = oldPath;     // default: tetap
//     let newDownloadUrl = oldUrl; // default: tetap

//     // Jika ada oldPath (artinya file di storage) dan nama berubah => rename storage
//     const nameChanged =
//       editData.nama !== original.nama ||
//       (editData.path && editData.path !== original.path);

//     if (oldPath && nameChanged) {
//       // tangkap ekstensi dari oldPath / oldUrl (fallback .png)
//       const extMatch = (oldPath.match(/\.[^/.]+$/) || [".png"])[0];
//       const newFileName = makeFileNameFromName(editData.nama, extMatch);
//       // contoh struktur folder yang kamu pakai: produk_complus/<filename>
//       const folder = (oldPath.split("/").slice(0, -1).join("/") || "produk_complus");
//       newPath = `${folder}/${newFileName}`;

//       // Panggil API server untuk rename (copy -> delete)
//       const apiUrl = "/api/renameStorage"; // harus ter-deploy di backend (lihat server code di bawah)
//       const payload = {
//         oldPath, // misal produk_complus/old-name.png
//         newPath, // produk_complus/new-name.png
//       };

//       // gunakan axios atau fetch
//       const resp = await axios.post(apiUrl, payload);
//       if (!resp.data || !resp.data.downloadUrl) {
//         throw new Error("Rename di storage gagal: tidak ada downloadUrl balikannya");
//       }
//       newDownloadUrl = resp.data.downloadUrl;
//     }

//     // Update Firestore doc (update fields nama, gambarUrl, path / storagePath)
//     const docRef = doc(db, "produk", editId);
//     // pastikan import updateDoc & doc dari firebase/firestore (sudah ada di file)
//     await updateDoc(docRef, {
//       nama: editData.nama,
//       kategori: editData.kategori ?? original.kategori,
//       harga: editData.harga ?? original.harga,
//       stok: editData.stok ?? original.stok,
//       gambarUrl: newDownloadUrl,
//       path: newPath,
//       updatedAt: new Date(),
//     });

//     showSuccessToast("✏️ Produk berhasil diupdate (termasuk rename storage jika ada)");
//     setEditId(null);
//     await fetchProduk();
//   } catch (err) {
//     console.error("handleEditSubmit error:", err);
//     showErrorToast(String(err?.message || err));
//   }
// };

// pastikan axios, doc, updateDoc, collection, addDoc sudah di-import
// import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
// import axios from "axios";

const handleEditSubmit = async () => {
  try {
    if (!editData.nama) {
      showErrorToast("Nama produk tidak boleh kosong");
      return;
    }

    const original = produk.find((p) => p.id === editId);
    if (!original) {
      showErrorToast("Data produk tidak ditemukan");
      return;
    }

    const oldPath = original.path || original.storagePath || "";
    const oldUrl = original.gambarUrl || original.url || "";

    const makeFileNameFromName = (name, ext) => {
      const safe = name
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-\.]/g, "");
      return `${safe}${ext}`;
    };

    let newPath = oldPath;
    let newDownloadUrl = oldUrl;

    const nameChanged =
      editData.nama !== original.nama ||
      (editData.path && editData.path !== original.path);

    if (oldPath && nameChanged) {
      const extMatch = (oldPath.match(/\.[^/.]+$/) || [".png"])[0];
      const newFileName = makeFileNameFromName(editData.nama, extMatch);
      const folder = (oldPath.split("/").slice(0, -1).join("/") || "produk_complus");
      newPath = `${folder}/${newFileName}`;

      const apiUrl = "/api/renameStorage";
      const payload = { oldPath, newPath };

      const resp = await axios.post(apiUrl, payload);
      console.log("renameStorage response:", resp?.data);
      if (!resp.data || !resp.data.downloadUrl) {
        throw new Error("Rename di storage gagal: tidak ada downloadUrl balikannya");
      }
      newDownloadUrl = resp.data.downloadUrl;
    }

    // --- update Firestore ---
    const docRef = doc(db, "produk", editId);
    const updatedFields = {
      nama: editData.nama,
      kategori: editData.kategori ?? original.kategori,
      harga: editData.harga ?? original.harga,
      stok: editData.stok ?? original.stok,
      gambarUrl: newDownloadUrl,
      path: newPath,
      updatedAt: new Date(),
    };

    await updateDoc(docRef, updatedFields);

    // --- optimistic update UI (supaya admin UI langsung berubah tanpa fetch lagi) ---
    setProduk((prev) =>
      prev.map((p) => (p.id === editId ? { ...p, ...updatedFields } : p))
    );

    // --- simpan riwayat perubahan (optional, berguna untuk audit) ---
    try {
      await addDoc(collection(db, "product_updates"), {
        productId: editId,
        updatedBy: "admin", // ganti dengan user id jika ada auth
        before: {
          nama: original.nama,
          kategori: original.kategori,
          harga: original.harga,
          stok: original.stok,
          gambarUrl: original.gambarUrl,
          path: original.path,
        },
        after: updatedFields,
        timestamp: new Date(),
      });
    } catch (logErr) {
      console.warn("Gagal simpan product_updates:", logErr);
      // bukan blocking error — tetap lanjut
    }

    showSuccessToast("✏️ Produk berhasil diupdate (termasuk rename storage jika ada)");
    setEditId(null);
    // optional: await fetchProduk(); // jika ingin sinkron penuh dari server
  } catch (err) {
    console.error("handleEditSubmit error:", err);
    showErrorToast(String(err?.message || err));
  }
};



  const handleCancelEdit = () => {
    setEditId(null);
    showInfoToast("Edit dibatalkan.");
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "produk", confirmDeleteId));
    toast.success("🗑️ Produk berhasil dihapus!");
    setConfirmDeleteId(null);
    fetchProduk();
  };

  const filteredProduk = produk
    .filter(
      (item) =>
        item.nama.toLowerCase().includes(search.toLowerCase()) &&
        (kategoriFilter === "" || item.kategori === kategoriFilter)
    )
    .sort((a, b) => {
      if (sortKey === "stok") return b.stok - a.stok;
      if (sortKey === "harga") return b.harga - a.harga;
      return 0;
    });


  return(
  <motion.div
  className={styles.container}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <ToastContainer position="top-right" autoClose={3000} />

  <h1 className={styles.heading}>📦 Kelola Produk</h1>

  {/* Filter */}
  <div className={styles.filterBox}>
    <input
      type="text"
      placeholder="🔍 Cari produk..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles.input}
    />
    <select
      value={kategoriFilter}
      onChange={(e) => setKategoriFilter(e.target.value)}
      className={styles.select}
    >
      <option value="">Semua Kategori</option>
      {[...new Set(produk.map((p) => p.kategori))].map((kat) => (
        <option key={kat} value={kat}>{kat}</option>
      ))}
    </select>
    <select
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
      className={styles.select}
    >
      <option value="">Sortir</option>
      <option value="stok">Stok Terbanyak</option>
      <option value="harga">Harga Tertinggi</option>
    </select>
  </div>

  {/* Produk Cards */}
  <div className={styles.productGrid}>
    {filteredProduk.map((item) => (
      <motion.div
        key={item.id}
        className={styles.productCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {editId === item.id ? (
          <div className={styles.editForm}>
            <input type="text" value={editData.nama} onChange={(e) => setEditData({ ...editData, nama: e.target.value })} />
            <input type="text" value={editData.kategori} onChange={(e) => setEditData({ ...editData, kategori: e.target.value })} />
            <input type="number" value={editData.harga} onChange={(e) => setEditData({ ...editData, harga: +e.target.value })} />
            <input type="number" value={editData.stok} onChange={(e) => setEditData({ ...editData, stok: +e.target.value })} />
            <input type="text" value={editData.gambarUrl} onChange={(e) => setEditData({ ...editData, gambarUrl: e.target.value })} />
            <div className={styles.buttonGroup}>
              <button onClick={handleEditSubmit} className={styles.btnSave}>Simpan</button>
              <button onClick={handleCancelEdit} className={styles.btnCancel}>Batal</button>
            </div>
          </div>
        ) : (
          <>
            <img src={item.gambarUrl} alt={item.nama} className={styles.productImage} />
            <h2 className={styles.productTitle}>{item.nama}</h2>
            <p className={styles.productCategory}>{item.kategori}</p>
            <p className={styles.productPrice}>Rp {item.harga.toLocaleString()}</p>
            <p className={styles.productStock}>Stok: {item.stok}</p>
            <div className={styles.actionButtons}>
              <button onClick={() => handleEdit(item)} className={styles.editBtn}><PencilSquareIcon className={styles.icon} /></button>
              <button onClick={() => setConfirmDeleteId(item.id)} className={styles.deleteBtn}><TrashIcon className={styles.icon} /></button>
            </div>
          </>
        )}
      </motion.div>
    ))}
  </div>

  {/* Modal Konfirmasi */}
  <AnimatePresence>
    {confirmDeleteId && (
      <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className={styles.modalBox} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.3 }}>
          <h2 className={styles.modalTitle}>Konfirmasi Hapus</h2>
          <p className={styles.modalText}>Apakah kamu yakin ingin menghapus produk ini?</p>
          <div className={styles.modalActions}>
            <button onClick={() => setConfirmDeleteId(null)} className={styles.modalCancel}>Batal</button>
            <button onClick={confirmDelete} className={styles.modalDelete}>Ya, Hapus</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
  );
}

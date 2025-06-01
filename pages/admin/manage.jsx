// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   getDocs,
//   doc,
//   deleteDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function ManageProduk() {
//   const [produk, setProduk] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [search, setSearch] = useState("");
//   const [kategoriFilter, setKategoriFilter] = useState("");
//   const [sortKey, setSortKey] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchProduk();
//   }, []);

//   const fetchProduk = async () => {
//     const snapshot = await getDocs(collection(db, "produk"));
//     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setProduk(data);
//   };

//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, "produk", id));
//     toast.success("Produk berhasil dihapus!");
//     fetchProduk();
//   };

//   const handleEdit = (item) => {
//     setEditId(item.id);
//     setEditData({ ...item });
//   };

//   const handleEditSubmit = async () => {
//     await updateDoc(doc(db, "produk", editId), editData);
//     toast.success("Produk berhasil diupdate!");
//     setEditId(null);
//     fetchProduk();
//   };

//   const filteredProduk = produk
//     .filter(
//       (item) =>
//         item.nama.toLowerCase().includes(search.toLowerCase()) &&
//         (kategoriFilter === "" || item.kategori === kategoriFilter)
//     )
//     .sort((a, b) => {
//       if (sortKey === "stok") return b.stok - a.stok;
//       if (sortKey === "harga") return b.harga - a.harga;
//       return 0;
//     });

//   const paginatedProduk = filteredProduk.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="p-6">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-2xl font-bold mb-4">Kelola Produk</h1>

//       <div className="flex flex-wrap items-center gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Cari produk..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-3 py-2 rounded w-64"
//         />
//         <select
//           value={kategoriFilter}
//           onChange={(e) => setKategoriFilter(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="">Semua Kategori</option>
//           {[...new Set(produk.map((p) => p.kategori))].map((kat) => (
//             <option key={kat} value={kat}>
//               {kat}
//             </option>
//           ))}
//         </select>
//         <select
//           value={sortKey}
//           onChange={(e) => setSortKey(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="">Sortir</option>
//           <option value="stok">Stok Terbanyak</option>
//           <option value="harga">Harga Tertinggi</option>
//         </select>
//       </div>

//       <table className="w-full table-auto border-collapse border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-4 py-2">Nama</th>
//             <th className="border px-4 py-2">Kategori</th>
//             <th className="border px-4 py-2">Harga</th>
//             <th className="border px-4 py-2">Stok</th>
//             <th className="border px-4 py-2">Aksi</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedProduk.map((item) => (
//             <tr key={item.id}>
//               <td className="border px-4 py-2">
//                 {editId === item.id ? (
//                   <input
//                     value={editData.nama}
//                     onChange={(e) =>
//                       setEditData({ ...editData, nama: e.target.value })
//                     }
//                     className="border px-2 py-1 w-full"
//                   />
//                 ) : (
//                   item.nama
//                 )}
//               </td>
//               <td className="border px-4 py-2">
//                 {editId === item.id ? (
//                   <input
//                     value={editData.kategori}
//                     onChange={(e) =>
//                       setEditData({ ...editData, kategori: e.target.value })
//                     }
//                     className="border px-2 py-1 w-full"
//                   />
//                 ) : (
//                   item.kategori
//                 )}
//               </td>
//               <td className="border px-4 py-2">
//                 {editId === item.id ? (
//                   <input
//                     type="number"
//                     value={editData.harga}
//                     onChange={(e) =>
//                       setEditData({ ...editData, harga: +e.target.value })
//                     }
//                     className="border px-2 py-1 w-full"
//                   />
//                 ) : (
//                   `Rp ${item.harga}`
//                 )}
//               </td>
//               <td className="border px-4 py-2">
//                 {editId === item.id ? (
//                   <input
//                     type="number"
//                     value={editData.stok}
//                     onChange={(e) =>
//                       setEditData({ ...editData, stok: +e.target.value })
//                     }
//                     className="border px-2 py-1 w-full"
//                   />
//                 ) : (
//                   item.stok
//                 )}
//               </td>
//               <td className="border px-4 py-2 space-x-2">
//                 {editId === item.id ? (
//                   <>
//                     <button
//                       onClick={handleEditSubmit}
//                       className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
//                     >
//                       Simpan
//                     </button>
//                     <button
//                       onClick={() => setEditId(null)}
//                       className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
//                     >
//                       Batal
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
//                     >
//                       Hapus
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex justify-between items-center mt-4">
//         <p className="text-sm text-gray-600">
//           Menampilkan {paginatedProduk.length} dari {filteredProduk.length} produk
//         </p>
//         <div className="space-x-2">
//           {Array.from({
//             length: Math.ceil(filteredProduk.length / itemsPerPage),
//           }).map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrentPage(idx + 1)}
//               className={`px-3 py-1 rounded border ${
//                 currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-white"
//               }`}
//             >
//               {idx + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


//JANGAN DIHAPUS YA IKIII
// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   getDocs,
//   doc,
//   deleteDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import { showSuccessToast, showErrorToast, showInfoToast } from "@/lib/toast";
// import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';



// export default function ManageProduk() {
//   const [produk, setProduk] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [search, setSearch] = useState("");
//   const [kategoriFilter, setKategoriFilter] = useState("");
//   const [sortKey, setSortKey] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchProduk();
//   }, []);

//   const fetchProduk = async () => {
//     const snapshot = await getDocs(collection(db, "produk"));
//     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setProduk(data);
//   };

// //   const handleDelete = async (id) => {
// //     await deleteDoc(doc(db, "produk", id));
// //     toast.success("🗑️ Produk berhasil dihapus!");
// //     fetchProduk();
// //   };

//   const handleEdit = (item) => {
//     setEditId(item.id);
//     setEditData({ ...item });
//   };

// //   const handleEditSubmit = async () => {
// //     await updateDoc(doc(db, "produk", editId), editData);
// //     toast.success("✏️ Produk berhasil diupdate!");
// //     setEditId(null);
// //     fetchProduk();
// //   };

//   const handleEditSubmit = async () => {
//   await updateDoc(doc(db, "produk", editId), editData);
// //   showSuccessToast("Produk berhasil diupdate!");
//   toast.success("✏️ Produk berhasil diupdate!");
//   setEditId(null);
//   fetchProduk();
// };

// const handleDelete = async (id) => {
//   await deleteDoc(doc(db, "produk", id));
// //   showErrorToast("Produk berhasil dihapus!");
//   toast.success("🗑️ Produk berhasil dihapus!");
//   fetchProduk();
// };

// const handleCancelEdit = () => {
//   setEditId(null);
//   showInfoToast("Edit dibatalkan.");
// };

// const [confirmDeleteId, setConfirmDeleteId] = useState(null);

// const confirmDelete = async () => {
//   await deleteDoc(doc(db, "produk", confirmDeleteId));
//   toast.success("🗑️ Produk berhasil dihapus!");
//   setConfirmDeleteId(null);
//   fetchProduk();
// };

//   const filteredProduk = produk
//     .filter(
//       (item) =>
//         item.nama.toLowerCase().includes(search.toLowerCase()) &&
//         (kategoriFilter === "" || item.kategori === kategoriFilter)
//     )
//     .sort((a, b) => {
//       if (sortKey === "stok") return b.stok - a.stok;
//       if (sortKey === "harga") return b.harga - a.harga;
//       return 0;
//     });

//   const paginatedProduk = filteredProduk.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <motion.div
//       className="p-6 font-sans bg-gradient-to-b from-gray-50 to-white min-h-screen"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
      
//       <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
//   {/* table goes here */}
//   <motion.div
//   className="p-6 min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100"
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
// >
//   <ToastContainer position="top-right" autoClose={3000} />
  
//   <div className="max-w-7xl mx-auto">
//     <h1 className="text-4xl font-bold mb-6 text-gray-800">📦 Kelola Produk</h1>

//     {/* Filter */}
//     <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-3 items-center">
//       <input
//         type="text"
//         placeholder="🔍 Cari produk..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <select
//         value={kategoriFilter}
//         onChange={(e) => setKategoriFilter(e.target.value)}
//         className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none"
//       >
//         <option value="">Semua Kategori</option>
//         {[...new Set(produk.map((p) => p.kategori))].map((kat) => (
//           <option key={kat} value={kat}>{kat}</option>
//         ))}
//       </select>
//       <select
//         value={sortKey}
//         onChange={(e) => setSortKey(e.target.value)}
//         className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none"
//       >
//         <option value="">Sortir</option>
//         <option value="stok">Stok Terbanyak</option>
//         <option value="harga">Harga Tertinggi</option>
//       </select>
//     </div>

//     {/* Table */}
//     <div className="bg-white rounded-xl shadow overflow-hidden">
//       <table className="min-w-full text-sm text-gray-800 table-auto">
//         <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
//           <tr>
//             {["📷 Gambar", "📦 Nama", "🏷️ Kategori", "💰 Harga", "📊 Stok", "⚙️ Aksi"].map((text, idx) => (
//               <th key={idx} className="px-6 py-3 border-b border-gray-200 font-semibold text-left">
//                 {text}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedProduk.map((item) => (
//             <tr key={item.id} className="hover:bg-gray-50 transition-all duration-150 border-b last:border-none">
//               <td className="px-6 py-4 align-middle">
//                 {editId === item.id ? (
//                   <input
//                     type="text"
//                     value={editData.gambarUrl}
//                     onChange={(e) =>
//                       setEditData({ ...editData, gambarUrl: e.target.value })
//                     }
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 ) : (
//                   <img
//                     src={item.gambarUrl}
//                     alt={item.nama}
//                     className="h-14 w-14 object-cover rounded shadow"
//                   />
//                 )}
//               </td>
//               <td className="px-6 py-4 align-middle">
//                 {editId === item.id ? (
//                   <input
//                     value={editData.nama}
//                     onChange={(e) =>
//                       setEditData({ ...editData, nama: e.target.value })
//                     }
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 ) : (
//                   item.nama
//                 )}
//               </td>
//               <td className="px-6 py-4 align-middle">
//                 {editId === item.id ? (
//                   <input
//                     value={editData.kategori}
//                     onChange={(e) =>
//                       setEditData({ ...editData, kategori: e.target.value })
//                     }
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 ) : (
//                   item.kategori
//                 )}
//               </td>
//               <td className="px-6 py-4 align-middle">
//                 {editId === item.id ? (
//                   <input
//                     type="number"
//                     value={editData.harga}
//                     onChange={(e) =>
//                       setEditData({ ...editData, harga: +e.target.value })
//                     }
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 ) : (
//                   `Rp ${item.harga.toLocaleString()}`
//                 )}
//               </td>
//               <td className="px-6 py-4 align-middle">
//                 {editId === item.id ? (
//                   <input
//                     type="number"
//                     value={editData.stok}
//                     onChange={(e) =>
//                       setEditData({ ...editData, stok: +e.target.value })
//                     }
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 ) : (
//                   item.stok
//                 )}
//               </td>
//               <td className="px-6 py-4 align-middle text-center space-x-2">
//                 {editId === item.id ? (
//                   <>
//                     <button
//                       onClick={handleEditSubmit}
//                       className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
//                     >
//                       Simpan
//                     </button>
//                     <button
//                     //   onClick={() => setEditId(null)}
//                     onClick={handleCancelEdit}
//                       className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded transition"
//                     >
//                       Batal
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     {/* <button
//                       onClick={() => handleEdit(item)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
//                     >
//                       Edit
//                     </button> */}
//                     <button
//   onClick={() => handleEdit(item)}
//   className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-2 rounded-full transition hover:scale-105"
//   title="Edit Produk"
// >
//   <PencilSquareIcon className="w-5 h-5" />
// </button>
//                     {/* <button
//                       onClick={() => handleDelete(item.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
//                     >
//                       Hapus
//                     </button> */}
//                     <button
//   onClick={() => setConfirmDeleteId(item.id)}
//   className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full transition hover:scale-105"
//   title="Hapus Produk"
// >
//   <TrashIcon className="w-5 h-5" />
// </button>
//                   </>
//                 )}
//                 {confirmDeleteId && (
//   <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
//       <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
//       <p className="text-sm text-gray-600 mb-6">Apakah kamu yakin ingin menghapus produk ini?</p>
//       <div className="flex justify-end space-x-3">
//         <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm font-medium">Batal</button>
//         <button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium">Ya, Hapus</button>
//       </div>
//     </div>
//   </div>
// )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* Pagination */}
//     <div className="flex justify-between items-center mt-6">
//       <p className="text-sm text-gray-600">
//         Menampilkan {paginatedProduk.length} dari {filteredProduk.length} produk
//       </p>
//       <div className="space-x-1">
//         {Array.from({ length: Math.ceil(filteredProduk.length / itemsPerPage) }).map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentPage(idx + 1)}
//             className={`px-3 py-1 rounded border text-sm shadow transition-all ${
//               currentPage === idx + 1
//                 ? "bg-blue-600 text-white"
//                 : "bg-white hover:bg-gray-100"
//             }`}
//           >
//             {idx + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   </div>
// </motion.div>


// </div>

//     </motion.div>
//   );
// }


// // ✅ Final Full Code with Fixes for Next.js
// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   getDocs,
//   doc,
//   deleteDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { showSuccessToast, showErrorToast, showInfoToast } from "@/lib/toast";
// import dynamic from 'next/dynamic';
// import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
// import { motion, AnimatePresence } from "framer-motion";

// // 🛠 FIX: Use dynamic import for react-table to avoid Next.js SSR error
// const useTable = dynamic(() => import('react-table').then(mod => mod.useTable), { ssr: false });
// const useSortBy = dynamic(() => import('react-table').then(mod => mod.useSortBy), { ssr: false });
// const useGlobalFilter = dynamic(() => import('react-table').then(mod => mod.useGlobalFilter), { ssr: false });

// export default function ManageProduk() {
//   const [produk, setProduk] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [search, setSearch] = useState("");
//   const [kategoriFilter, setKategoriFilter] = useState("");
//   const [sortKey, setSortKey] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchProduk();
//   }, []);

//   const fetchProduk = async () => {
//     const snapshot = await getDocs(collection(db, "produk"));
//     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setProduk(data);
//   };

//   const handleEdit = (item) => {
//     setEditId(item.id);
//     setEditData({ ...item });
//   };

//   const handleEditSubmit = async () => {
//     await updateDoc(doc(db, "produk", editId), editData);
//     toast.success("✏️ Produk berhasil diupdate!");
//     setEditId(null);
//     fetchProduk();
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//     showInfoToast("Edit dibatalkan.");
//   };

//   const confirmDelete = async () => {
//     await deleteDoc(doc(db, "produk", confirmDeleteId));
//     toast.success("🗑️ Produk berhasil dihapus!");
//     setConfirmDeleteId(null);
//     fetchProduk();
//   };

//   const filteredProduk = produk
//     .filter(
//       (item) =>
//         item.nama.toLowerCase().includes(search.toLowerCase()) &&
//         (kategoriFilter === "" || item.kategori === kategoriFilter)
//     )
//     .sort((a, b) => {
//       if (sortKey === "stok") return b.stok - a.stok;
//       if (sortKey === "harga") return b.harga - a.harga;
//       return 0;
//     });

//   const paginatedProduk = filteredProduk.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <motion.div
//       className="p-6 font-sans bg-gradient-to-b from-gray-50 to-white min-h-screen"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-4xl font-bold mb-6 text-gray-800">📦 Kelola Produk</h1>

//           {/* Filter */}
//           <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-3 items-center">
//             <input
//               type="text"
//               placeholder="🔍 Cari produk..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <select
//               value={kategoriFilter}
//               onChange={(e) => setKategoriFilter(e.target.value)}
//               className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none"
//             >
//               <option value="">Semua Kategori</option>
//               {[...new Set(produk.map((p) => p.kategori))].map((kat) => (
//                 <option key={kat} value={kat}>{kat}</option>
//               ))}
//             </select>
//             <select
//               value={sortKey}
//               onChange={(e) => setSortKey(e.target.value)}
//               className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none"
//             >
//               <option value="">Sortir</option>
//               <option value="stok">Stok Terbanyak</option>
//               <option value="harga">Harga Tertinggi</option>
//             </select>
//           </div>

//           {/* Table */}
//           <div className="bg-white rounded-xl shadow overflow-hidden">
//             <table className="min-w-full text-sm text-gray-800 table-auto">
//               <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
//                 <tr>
//                   {['📷 Gambar', '📦 Nama', '🏷️ Kategori', '💰 Harga', '📊 Stok', '⚙️ Aksi'].map((text, idx) => (
//                     <th key={idx} className="px-6 py-3 border-b border-gray-200 font-semibold text-left">
//                       {text}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedProduk.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50 transition-all duration-150 border-b last:border-none">
//                     <td className="px-6 py-4">
//                       {editId === item.id ? (
//                         <input
//                           type="text"
//                           value={editData.gambarUrl}
//                           onChange={(e) => setEditData({ ...editData, gambarUrl: e.target.value })}
//                           className="border px-2 py-1 rounded w-full"
//                         />
//                       ) : (
//                         <img src={item.gambarUrl} alt={item.nama} className="h-14 w-14 object-cover rounded shadow" />
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       {editId === item.id ? (
//                         <input
//                           value={editData.nama}
//                           onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
//                           className="border px-2 py-1 rounded w-full"
//                         />
//                       ) : item.nama}
//                     </td>
//                     <td className="px-6 py-4">
//                       {editId === item.id ? (
//                         <input
//                           value={editData.kategori}
//                           onChange={(e) => setEditData({ ...editData, kategori: e.target.value })}
//                           className="border px-2 py-1 rounded w-full"
//                         />
//                       ) : item.kategori}
//                     </td>
//                     <td className="px-6 py-4">
//                       {editId === item.id ? (
//                         <input
//                           type="number"
//                           value={editData.harga}
//                           onChange={(e) => setEditData({ ...editData, harga: +e.target.value })}
//                           className="border px-2 py-1 rounded w-full"
//                         />
//                       ) : `Rp ${item.harga.toLocaleString()}`}
//                     </td>
//                     <td className="px-6 py-4">
//                       {editId === item.id ? (
//                         <input
//                           type="number"
//                           value={editData.stok}
//                           onChange={(e) => setEditData({ ...editData, stok: +e.target.value })}
//                           className="border px-2 py-1 rounded w-full"
//                         />
//                       ) : item.stok}
//                     </td>
//                     <td className="px-6 py-4 text-center space-x-2">
//                       {editId === item.id ? (
//                         <>
//                           <button
//                             onClick={handleEditSubmit}
//                             className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//                           >
//                             Simpan
//                           </button>
//                           <button
//                             onClick={handleCancelEdit}
//                             className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
//                           >
//                             Batal
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleEdit(item)}
//                             className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-2 rounded-full hover:scale-105"
//                             title="Edit Produk"
//                           >
//                             <PencilSquareIcon className="w-5 h-5" />
//                           </button>
//                           <button
//                             onClick={() => setConfirmDeleteId(item.id)}
//                             className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full hover:scale-105"
//                             title="Hapus Produk"
//                           >
//                             <TrashIcon className="w-5 h-5" />
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-between items-center mt-6">
//             <p className="text-sm text-gray-600">
//               Menampilkan {paginatedProduk.length} dari {filteredProduk.length} produk
//             </p>
//             <div className="space-x-1">
//               {Array.from({ length: Math.ceil(filteredProduk.length / itemsPerPage) }).map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setCurrentPage(idx + 1)}
//                   className={`px-3 py-1 rounded border text-sm shadow ${
//                     currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
//                   }`}
//                 >
//                   {idx + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {confirmDeleteId && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -50, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md"
//             >
//               <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
//               <p className="text-sm text-gray-600 mb-6">Apakah kamu yakin ingin menghapus produk ini?</p>
//               <div className="flex justify-end space-x-3">
//                 <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm font-medium">Batal</button>
//                 <button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium">Ya, Hapus</button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }




// ✅ Final Full Code (Card Style Layout) for Next.js
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSuccessToast, showErrorToast, showInfoToast } from "@/lib/toast";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from "framer-motion";

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

  const handleEditSubmit = async () => {
    await updateDoc(doc(db, "produk", editId), editData);
    toast.success("✏️ Produk berhasil diupdate!");
    setEditId(null);
    fetchProduk();
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

  return (
    <motion.div
      className="p-6 font-sans bg-gradient-to-b from-gray-50 to-white min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-4xl font-bold mb-6 text-gray-800">📦 Kelola Produk</h1>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="🔍 Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={kategoriFilter}
          onChange={(e) => setKategoriFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none"
        >
          <option value="">Semua Kategori</option>
          {[...new Set(produk.map((p) => p.kategori))].map((kat) => (
            <option key={kat} value={kat}>{kat}</option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none"
        >
          <option value="">Sortir</option>
          <option value="stok">Stok Terbanyak</option>
          <option value="harga">Harga Tertinggi</option>
        </select>
      </div>

      {/* Produk Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduk.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-xl shadow p-4 relative border hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {editId === item.id ? (
              <div>
                <input
                  type="text"
                  value={editData.nama}
                  onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  value={editData.kategori}
                  onChange={(e) => setEditData({ ...editData, kategori: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  value={editData.harga}
                  onChange={(e) => setEditData({ ...editData, harga: +e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  value={editData.stok}
                  onChange={(e) => setEditData({ ...editData, stok: +e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  value={editData.gambarUrl}
                  onChange={(e) => setEditData({ ...editData, gambarUrl: e.target.value })}
                  className="w-full mb-3 px-3 py-2 border rounded"
                />
                <div className="flex gap-2">
                  <button onClick={handleEditSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Simpan</button>
                  <button onClick={handleCancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded">Batal</button>
                </div>
              </div>
            ) : (
              <>
                <img src={item.gambarUrl} alt={item.nama} className="h-40 w-full object-cover rounded mb-3" />
                <h2 className="text-xl font-semibold">{item.nama}</h2>
                <p className="text-sm text-gray-500">{item.kategori}</p>
                <p className="mt-1 font-medium">Rp {item.harga.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Stok: {item.stok}</p>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-2 rounded-full"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDeleteId && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md"
            >
              <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
              <p className="text-sm text-gray-600 mb-6">Apakah kamu yakin ingin menghapus produk ini?</p>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm font-medium">Batal</button>
                <button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium">Ya, Hapus</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

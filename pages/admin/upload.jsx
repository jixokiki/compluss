// pages/admin/upload.js

// import { useState } from "react"
// import { db, storage } from "@/lib/firebase"
// import { collection, addDoc } from "firebase/firestore"
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
// import * as XLSX from "xlsx"
// import { v4 as uuidv4 } from "uuid"

// export default function UploadExcel() {
//   const [file, setFile] = useState(null)
//   const [imageFiles, setImageFiles] = useState([])
//   const [uploadedImageUrls, setUploadedImageUrls] = useState([])
//   const [uploading, setUploading] = useState(false)
//   const [message, setMessage] = useState("")

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0])
//   }

//   const handleImageDrop = async (e) => {
//     e.preventDefault()
//     const files = Array.from(e.dataTransfer.files)
//     const urls = []

//     for (const file of files) {
//       const imageRef = ref(storage, `produk/${uuidv4()}`)
//       await uploadBytes(imageRef, file)
//       const downloadUrl = await getDownloadURL(imageRef)
//       urls.push(downloadUrl)
//     }
//     setUploadedImageUrls(urls)
//     setImageFiles(files)
//   }

//   const handleUpload = async () => {
//     if (!file) return
//     setUploading(true)
//     setMessage("")

//     const reader = new FileReader()
//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result)
//       const workbook = XLSX.read(data, { type: "array" })
//       const sheet = workbook.Sheets[workbook.SheetNames[0]]
//       const rows = XLSX.utils.sheet_to_json(sheet)

//       for (const row of rows) {
//         const {
//           GambarProduk,
//           NamaProduk,
//           Kategori,
//           Harga,
//           Deskripsi,
//           Stok
//         } = row

//         let gambarUrl = GambarProduk || ""

//         try {
//           if (gambarUrl.startsWith("http") === false) {
//             // If GambarProduk is an index, match with uploadedImageUrls
//             const index = parseInt(GambarProduk)
//             if (!isNaN(index) && uploadedImageUrls[index]) {
//               gambarUrl = uploadedImageUrls[index]
//             }
//           }

//           await addDoc(collection(db, "produk"), {
//             nama: NamaProduk,
//             kategori: Kategori,
//             harga: Number(Harga),
//             deskripsi: Deskripsi,
//             stok: Number(Stok),
//             gambarUrl
//           })
//         } catch (error) {
//           console.error("Gagal upload baris:", row, error)
//         }
//       }

//       setMessage("Upload selesai!")
//       setUploading(false)
//     }

//     reader.readAsArrayBuffer(file)
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
//         <h1 className="text-xl font-bold mb-4">Upload Produk via Excel & Gambar</h1>

//         <div
//           onDrop={handleImageDrop}
//           onDragOver={(e) => e.preventDefault()}
//           className="mb-4 p-6 border-2 border-dashed border-blue-400 rounded text-center bg-blue-50"
//         >
//           <p className="text-sm text-gray-600">Drag & drop gambar produk di sini</p>
//         </div>

//         {uploadedImageUrls.length > 0 && (
//           <div className="mb-4">
//             <p className="text-sm font-semibold mb-2">Link Gambar Terupload:</p>
//             <ul className="text-sm text-blue-600 list-disc list-inside">
//               {uploadedImageUrls.map((url, idx) => (
//                 <li key={idx}>{url}</li>
//               ))}
//             </ul>
//             <p className="text-xs text-gray-500 mt-2">Gunakan link ini di kolom "GambarProduk" Excel, atau gunakan urutan angka (0, 1, 2...)</p>
//           </div>
//         )}

//         <input
//           type="file"
//           accept=".xlsx"
//           onChange={handleFileChange}
//           className="mb-4"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {uploading ? "Mengunggah..." : "Upload"}
//         </button>

//         {message && <p className="mt-4 text-green-600">{message}</p>}
//       </div>
//     </div>
//   )
// }




import { useState } from "react"
import { db } from "../../lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import * as XLSX from "xlsx"
import styles from "./UploadExcel.module.scss"

export default function UploadExcel() {
  const [file, setFile] = useState(null)
  const [uploadedImageUrls, setUploadedImageUrls] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const [uploadedData, setUploadedData] = useState([]);


  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleImageDrop = async (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const urls = []

    for (const file of files) {
      const formData = new FormData()
      formData.append("image", file)

      try {
        const res = await fetch("http://localhost:5050/api/upload-image", {
          method: "POST",
          body: formData,
        })

        const data = await res.json()
        urls.push(data.url)
      } catch (err) {
        console.error("Upload gagal:", err)
      }
    }

    setUploadedImageUrls(urls)
  }

  // const handleUpload = async () => {
  //   if (!file) return
  //   setUploading(true)
  //   setMessage("")

  //   const reader = new FileReader()
  //   reader.onload = async (e) => {
  //     const data = new Uint8Array(e.target.result)
  //     const workbook = XLSX.read(data, { type: "array" })
  //     const sheet = workbook.Sheets[workbook.SheetNames[0]]
  //     const rows = XLSX.utils.sheet_to_json(sheet)

  //     for (const row of rows) {
  //       const {
  //         GambarProduk,
  //         NamaProduk,
  //         Kategori,
  //         Harga,
  //         Deskripsi,
  //         Stok,
  //       } = row

  //       let gambarUrl = GambarProduk || ""

  //       try {
  //         if (gambarUrl.startsWith("http") === false) {
  //           const index = parseInt(GambarProduk)
  //           if (!isNaN(index) && uploadedImageUrls[index]) {
  //             gambarUrl = uploadedImageUrls[index]
  //           }
  //         }

  //         await addDoc(collection(db, "produk"), {
  //           nama: NamaProduk,
  //           kategori: Kategori,
  //           harga: Number(Harga),
  //           deskripsi: Deskripsi,
  //           stok: Number(Stok),
  //           gambarUrl,
  //         })
  //       } catch (error) {
  //         console.error("Gagal upload baris:", row, error)
  //       }
  //     }

  //     setMessage("✅ Upload selesai!")
  //     setUploading(false)
  //   }

  //   reader.readAsArrayBuffer(file)
  // }


  const convertUrlToFormData = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append("image", blob, "downloaded.jpg");
  return formData;
};


//   const handleUpload = async () => {
//   if (!file) return;

//   setUploading(true);
//   setMessage("");
//   setUploadedData([]);

//   const reader = new FileReader();
//   reader.onload = async (e) => {
//     const data = new Uint8Array(e.target.result);
//     const workbook = XLSX.read(data, { type: "array" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
    
//     // 🟡 Lewati 2 baris awal: baris 0 kosong, baris 1 = header
//     const rows = XLSX.utils.sheet_to_json(sheet, { range: 1 });

//     const preview = [];

//     for (const row of rows) {
//       const {
//         "Nama Produk": nama,
//         Merk: merk,
//         Links: linkProduk,
//         Status: status,
//         TKDN,
//         BMP,
//         "Harga Tayang": harga,
//         "Spesifikasi Teknis": spesifikasi,
//         Processor,
//         RAM,
//         Storage,
//         VGA,
//         "Image Url": imageUrl
//       } = row;

//       let finalImageUrl = imageUrl || "";

//       // 🚀 Upload ulang gambar jika URL valid
//       try {
//         if (imageUrl && imageUrl.startsWith("http")) {
//           const res = await fetch("http://localhost:8080/api/upload-image", {
//             method: "POST",
//             body: await convertUrlToFormData(imageUrl),
//           });
//           const data = await res.json();
//           if (data.url) finalImageUrl = data.url;
//         }
//       } catch (err) {
//         console.warn(`Gagal upload gambar: ${imageUrl}`, err);
//       }

//       // 💾 Upload ke Firestore
//       try {
//         await addDoc(collection(db, "produk"), {
//           nama,
//           merk,
//           linkProduk,
//           status,
//           tkdn: TKDN,
//           bmp: BMP,
//           harga: Number(harga),
//           spesifikasi,
//           processor: Processor,
//           ram: RAM,
//           storage: Storage,
//           vga: VGA,
//           gambarUrl: finalImageUrl
//         });

//         // Untuk preview
//         preview.push({ nama, harga, gambarUrl: finalImageUrl });
//       } catch (err) {
//         console.error("Gagal upload produk:", row, err);
//       }
//     }

//     setUploadedData(preview);
//     setMessage("✅ Semua produk berhasil diupload!");
//     setUploading(false);
//   };

//   reader.readAsArrayBuffer(file);
// };


const handleUpload = async () => {
  if (!file) {
    alert("❗ Mohon pilih file Excel terlebih dahulu.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json(sheet, {
      range: 1, // Lewati baris header visual
      header: [
        "No", "Merk", "Nama Produk", "Links", "Status", "Ket",
        "TKDN", "BMP", "Harga Tayang", "Spesifikasi Teknis",
        "Processor", "RAM", "Storage", "VGA", "Image Url"
      ]
    });

    let sukses = 0, gagal = 0;
    const uploaded = [];

    for (const row of rows) {
      const nama = row["Nama Produk"];
      const harga = Number(row["Harga Tayang"]);
      const gambarUrl = row["Image Url"];

      if (!nama || !harga || !gambarUrl) {
        console.warn("⛔ Baris dilewati karena data tidak lengkap:", row);
        gagal++;
        continue;
      }

      try {
        await addDoc(collection(db, "produk"), {
          nama,
          harga,
          gambarUrl,
          deskripsi: row["Spesifikasi Teknis"] || "",
          merk: row["Merk"] || "",
          linkKatalog: row["Links"] || "",
          processor: row["Processor"] || "",
          ram: row["RAM"] || "",
          storage: row["Storage"] || "",
          vga: row["VGA"] || "",
          status: row["Status"] || "Tayang",
          createdAt: new Date()
        });
        uploaded.push({ nama, harga, gambarUrl });
        sukses++;
      } catch (error) {
        console.error("Gagal upload produk:", row, error);
        gagal++;
      }
    }

    setUploadedData(uploaded);
    setMessage(`✅ Berhasil upload ${sukses} produk. ❌ Gagal upload ${gagal} baris.`);
  };

  reader.readAsArrayBuffer(file);
};



  return (
    // <div className="min-h-screen bg-gray-100 p-8">
    //   <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
    //     <h1 className="text-xl font-bold mb-4">Upload Produk via Excel & Gambar</h1>

    //     <div
    //       onDrop={handleImageDrop}
    //       onDragOver={(e) => e.preventDefault()}
    //       className="mb-4 p-6 border-2 border-dashed border-blue-400 rounded text-center bg-blue-50"
    //     >
    //       <p className="text-sm text-gray-600">Drag & drop gambar produk di sini</p>
    //     </div>

    //     {uploadedImageUrls.length > 0 && (
    //       <div className="mb-4">
    //         <p className="text-sm font-semibold mb-2">Link Gambar Terupload:</p>
    //         <ul className="text-sm text-blue-600 list-disc list-inside">
    //           {uploadedImageUrls.map((url, idx) => (
    //             <li key={idx} className="mb-1 flex items-center space-x-2">
    //               <span className="break-all">{url}</span>
    //               <button
    //                 onClick={() => {
    //                   navigator.clipboard.writeText(url)
    //                   alert("✅ Link berhasil disalin!")
    //                 }}
    //                 className="text-xs text-white bg-green-500 px-2 py-0.5 rounded hover:bg-green-600"
    //               >
    //                 Copy
    //               </button>
    //             </li>
    //           ))}
    //         </ul>
    //         <p className="text-xs text-gray-500 mt-2">
    //           Gunakan link ini di kolom <strong>"GambarProduk"</strong> Excel,
    //           atau gunakan angka urutan (0, 1, 2...) sesuai urutan gambar.
    //         </p>
    //       </div>
    //     )}

    //     <input
    //       type="file"
    //       accept=".xlsx"
    //       onChange={handleFileChange}
    //       className="mb-4"
    //     />

    //     <button
    //       onClick={handleUpload}
    //       disabled={uploading}
    //       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    //     >
    //       {uploading ? "Mengunggah..." : "Upload Excel"}
    //     </button>

    //     {message && <p className="mt-4 text-green-600">{message}</p>}
    //   </div>
    // </div>
//     <div className={styles.container}>
//   <div className={styles.card}>
//     <h1 className={styles.title}>Upload Produk via Excel & Gambar</h1>

//     <div
//       onDrop={handleImageDrop}
//       onDragOver={(e) => e.preventDefault()}
//       className={styles.dropzone}
//     >
//       <p className={styles.dropText}>Drag & drop gambar produk di sini</p>
//     </div>

//     {uploadedImageUrls.length > 0 && (
//       <div className={styles.uploadedSection}>
//         <p className={styles.uploadedTitle}>Link Gambar Terupload:</p>
//         <ul className={styles.urlList}>
//           {uploadedImageUrls.map((url, idx) => (
//             <li key={idx} className={styles.urlItem}>
//               <span className={styles.urlText}>{url}</span>
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(url)
//                   alert("✅ Link berhasil disalin!")
//                 }}
//                 className={styles.copyButton}
//               >
//                 Copy
//               </button>
//             </li>
//           ))}
//         </ul>
//         <p className={styles.hintText}>
//           Gunakan link ini di kolom <strong>"GambarProduk"</strong> Excel,
//           atau gunakan angka urutan (0, 1, 2...) sesuai urutan gambar.
//         </p>
//       </div>
//     )}

//     <input
//       type="file"
//       accept=".xlsx"
//       onChange={handleFileChange}
//       className={styles.fileInput}
//     />

//     <button
//       onClick={handleUpload}
//       disabled={uploading}
//       className={styles.uploadButton}
//     >
//       {uploading ? "Mengunggah..." : "Upload Excel"}
//     </button>

//     {message && <p className={styles.successMessage}>{message}</p>}
//   </div>
// </div>


<div className={styles.container}>
  <div className={styles.card}>
    <h1 className={styles.title}>Upload Produk via Excel & Gambar</h1>

    <div
      onDrop={handleImageDrop}
      onDragOver={(e) => e.preventDefault()}
      className={styles.dropzone}
    >
      <p className={styles.dropText}>Drag & drop gambar produk di sini</p>
    </div>

    {uploadedImageUrls.length > 0 && (
      <div className={styles.uploadedSection}>
        <p className={styles.uploadedTitle}>Link Gambar Terupload:</p>
        <ul className={styles.urlList}>
          {uploadedImageUrls.map((url, idx) => (
            <li key={idx} className={styles.urlItem}>
              <span className={styles.urlText}>{url}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(url)
                  alert("✅ Link berhasil disalin!")
                }}
                className={styles.copyButton}
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
        <p className={styles.hintText}>
          Gunakan link ini di kolom <strong>"GambarProduk"</strong> Excel,
          atau gunakan angka urutan (0, 1, 2...) sesuai urutan gambar.
        </p>
      </div>
    )}

    <input
      type="file"
      accept=".xlsx"
      onChange={handleFileChange}
      className={styles.fileInput}
    />

    <button
      onClick={handleUpload}
      disabled={uploading}
      className={styles.uploadButton}
    >
      {uploading ? "Mengunggah..." : "Upload Excel"}
    </button>

    {message && <p className={styles.successMessage}>{message}</p>}
  </div>

  {/* ✅ Preview Produk yang Diunggah */}
  {uploadedData.length > 0 && (
    <div className={styles.previewSection}>
      <h3 className={styles.previewTitle}>📦 Preview Produk yang Diunggah:</h3>
      <div className={styles.grid}>
        {uploadedData.map((item, i) => (
          <div key={i} className={styles.cardItem}>
            <img src={item.gambarUrl} alt={item.nama} className={styles.imgPreview} />
            <h4>{item.nama}</h4>
            <p>Rp {Number(item.harga).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


  )
}





// Langkah 1: Ganti Firebase jadi API lokal
// Misal kamu sudah punya backend Node.js dengan endpoint:
// POST /api/upload-image --> untuk upload gambar
// POST /api/upload-produk --> untuk simpan data produk

// import { useState } from "react"
// import * as XLSX from "xlsx"

// export default function UploadExcel() {
//   const [file, setFile] = useState(null)
//   const [imageFiles, setImageFiles] = useState([])
//   const [uploadedImageUrls, setUploadedImageUrls] = useState([])
//   const [uploading, setUploading] = useState(false)
//   const [message, setMessage] = useState("")

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0])
//   }

//   const handleImageDrop = async (e) => {
//     e.preventDefault()
//     const files = Array.from(e.dataTransfer.files)
//     const urls = []

//     for (const file of files) {
//       const formData = new FormData()
//       formData.append("image", file)

//       try {
//         const res = await fetch("/api/upload-image", {
//           method: "POST",
//           body: formData
//         })
//         const data = await res.json()
//         urls.push(data.url) // contoh: http://localhost:3000/uploads/gambar1.jpg
//       } catch (err) {
//         console.error("Upload gagal:", err)
//       }
//     }
//     setUploadedImageUrls(urls)
//     setImageFiles(files)
//   }

//   const handleUpload = async () => {
//     if (!file) return
//     setUploading(true)
//     setMessage("")

//     const reader = new FileReader()
//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result)
//       const workbook = XLSX.read(data, { type: "array" })
//       const sheet = workbook.Sheets[workbook.SheetNames[0]]
//       const rows = XLSX.utils.sheet_to_json(sheet)

//       for (const row of rows) {
//         const {
//           GambarProduk,
//           NamaProduk,
//           Kategori,
//           Harga,
//           Deskripsi,
//           Stok
//         } = row

//         let gambarUrl = GambarProduk || ""

//         if (!gambarUrl.startsWith("http")) {
//           const index = parseInt(GambarProduk)
//           if (!isNaN(index) && uploadedImageUrls[index]) {
//             gambarUrl = uploadedImageUrls[index]
//           }
//         }

//         try {
//           await fetch("/api/upload-produk", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               nama: NamaProduk,
//               kategori: Kategori,
//               harga: Number(Harga),
//               deskripsi: Deskripsi,
//               stok: Number(Stok),
//               gambar_url: gambarUrl
//             })
//           })
//         } catch (err) {
//           console.error("Gagal simpan data:", err)
//         }
//       }

//       setMessage("Upload selesai!")
//       setUploading(false)
//     }

//     reader.readAsArrayBuffer(file)
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
//         <h1 className="text-xl font-bold mb-4">Upload Produk via Excel & Gambar</h1>

//         <div
//           onDrop={handleImageDrop}
//           onDragOver={(e) => e.preventDefault()}
//           className="mb-4 p-6 border-2 border-dashed border-blue-400 rounded text-center bg-blue-50"
//         >
//           <p className="text-sm text-gray-600">Drag & drop gambar produk di sini</p>
//         </div>

//         {uploadedImageUrls.length > 0 && (
//           <div className="mb-4">
//             <p className="text-sm font-semibold mb-2">Link Gambar Terupload:</p>
//             <ul className="text-sm text-blue-600 list-disc list-inside">
//               {uploadedImageUrls.map((url, idx) => (
//                 <li key={idx}>{url}</li>
//               ))}
//             </ul>
//             <p className="text-xs text-gray-500 mt-2">Gunakan link ini di kolom "GambarProduk" Excel, atau gunakan urutan angka (0, 1, 2...)</p>
//           </div>
//         )}

//         <input
//           type="file"
//           accept=".xlsx"
//           onChange={handleFileChange}
//           className="mb-4"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {uploading ? "Mengunggah..." : "Upload"}
//         </button>

//         {message && <p className="mt-4 text-green-600">{message}</p>}
//       </div>
//     </div>
//   )
// }



// // ✅ FILE: pages/admin/upload.jsx
// import { useState } from "react"
// import * as XLSX from "xlsx"

// export default function UploadExcel() {
//   const [file, setFile] = useState(null)
//   const [uploadedImageUrls, setUploadedImageUrls] = useState([])
//   const [uploading, setUploading] = useState(false)
//   const [message, setMessage] = useState("")

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0])
//   }

//   const baseUrl = process.env.NEXT_PUBLIC_API_BASE

//   const handleImageDrop = async (e) => {
//     e.preventDefault()
//     const files = Array.from(e.dataTransfer.files)
//     const urls = []

//     for (const file of files) {
//       const formData = new FormData()
//       formData.append("image", file)

//       try {
//         const res = await fetch("http://localhost:5050/api/upload-image", {
//           method: "POST",
//           body: formData,
//         })
//         const data = await res.json()
//         urls.push(data.url)
//       } catch (err) {
//         console.error("Upload gagal:", err)
//       }
//     }
//     setUploadedImageUrls(urls)
//   }

//   const handleUpload = async () => {
//     if (!file) return
//     setUploading(true)
//     setMessage("")

//     const reader = new FileReader()
//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result)
//       const workbook = XLSX.read(data, { type: "array" })
//       const sheet = workbook.Sheets[workbook.SheetNames[0]]
//       const rows = XLSX.utils.sheet_to_json(sheet)

//       for (const row of rows) {
//         const {
//           GambarProduk,
//           NamaProduk,
//           Kategori,
//           Harga,
//           Deskripsi,
//           Stok,
//         } = row

//         let gambarUrl = GambarProduk || ""

//         if (!gambarUrl.startsWith("http")) {
//           const index = parseInt(GambarProduk)
//           if (!isNaN(index) && uploadedImageUrls[index]) {
//             gambarUrl = uploadedImageUrls[index]
//           }
//         }

//         try {
//           await fetch("http://localhost:5050/api/upload-produk", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               nama: NamaProduk,
//               kategori: Kategori,
//               harga: Number(Harga),
//               deskripsi: Deskripsi,
//               stok: Number(Stok),
//               gambar_url: gambarUrl,
//             }),
//           })
//         } catch (err) {
//           console.error("Gagal simpan data:", err)
//         }
//       }

//       setMessage("Upload selesai!")
//       setUploading(false)
//     }
//     reader.readAsArrayBuffer(file)
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
//         <h1 className="text-xl font-bold mb-4">Upload Produk via Excel & Gambar</h1>

//         <div
//           onDrop={handleImageDrop}
//           onDragOver={(e) => e.preventDefault()}
//           className="mb-4 p-6 border-2 border-dashed border-blue-400 rounded text-center bg-blue-50"
//         >
//           <p className="text-sm text-gray-600">Drag & drop gambar produk di sini</p>
//         </div>

//         {uploadedImageUrls.length > 0 && (
//           <div className="mb-4">
//             <p className="text-sm font-semibold mb-2">Link Gambar Terupload:</p>
//             <ul className="text-sm text-blue-600 list-disc list-inside">
//               {uploadedImageUrls.map((url, idx) => (
//                 <li key={idx}>{url}</li>
//               ))}
//             </ul>
//             <p className="text-xs text-gray-500 mt-2">
//               Gunakan link ini di kolom "GambarProduk" Excel, atau gunakan urutan angka (0, 1, 2...)
//             </p>
//           </div>
//         )}

//         <input type="file" accept=".xlsx" onChange={handleFileChange} className="mb-4" />

//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {uploading ? "Mengunggah..." : "Upload"}
//         </button>

//         {message && <p className="mt-4 text-green-600">{message}</p>}
//       </div>
//     </div>
//   )
// }

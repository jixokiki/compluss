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
        const res = await fetch("http://localhost:8080/api/upload-image", {
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


  const convertUrlToFormData = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append("image", blob, "downloaded.jpg");
  return formData;
};


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
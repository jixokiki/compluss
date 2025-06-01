// // routes/uploadProduk.js
// const express = require('express');
// const db = require('../db');

// const router = express.Router();

// router.post('/upload-produk', (req, res) => {
//   const { nama, kategori, harga, deskripsi, stok, gambarUrl } = req.body;

//   const sql = `INSERT INTO produk (nama, kategori, harga, deskripsi, stok, gambar_url)
//                VALUES (?, ?, ?, ?, ?, ?)`;

//   db.query(sql, [nama, kategori, harga, deskripsi, stok, gambarUrl], (err, result) => {
//     if (err) {
//       console.error('❌ Gagal insert:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }

//     res.json({ success: true, insertedId: result.insertId });
//   });
// });

// module.exports = router;



// routes/uploadProduk.js
const express = require("express")
const db = require("../db")
const router = express.Router()

router.post("/upload-produk", (req, res) => {
  const { nama, kategori, harga, deskripsi, stok, gambar_url } = req.body

  const sql = `
    INSERT INTO produk (nama, kategori, harga, deskripsi, stok, gambar_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  db.query(sql, [nama, kategori, harga, deskripsi, stok, gambar_url], (err, result) => {
    if (err) {
      console.error("❌ Gagal insert:", err)
      return res.status(500).json({ error: "Database error" })
    }

    res.json({ success: true, insertedId: result.insertId })
  })
})

module.exports = router

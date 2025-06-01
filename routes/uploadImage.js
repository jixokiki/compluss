// // routes/uploadImage.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const name = Date.now() + ext;
//     cb(null, name);
//   },
// });

// const upload = multer({ storage });

// router.post('/upload-image', upload.single('image'), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//   const imageUrl = `/uploads/${req.file.filename}`;
//   res.json({ url: imageUrl });
// });

// module.exports = router;



// routes/uploadImage.js
const express = require("express")
const multer = require("multer")
const path = require("path")
const router = express.Router()

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = Date.now() + ext
    cb(null, name)
  },
})

const upload = multer({ storage })

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" })

  const imageUrl = `http://localhost:5050/uploads/${req.file.filename}`
  res.json({ url: imageUrl })
})

module.exports = router

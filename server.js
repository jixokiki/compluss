// // server.js
// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// const uploadImageRoutes = require('./routes/uploadImage');
// const uploadProdukRoutes = require('./routes/uploadProduk');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // API routes
// app.use('/api', uploadImageRoutes);
// app.use('/api', uploadProdukRoutes);

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
// });



// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// const uploadImageRoutes = require('./routes/uploadImage');
// const uploadProdukRoutes = require('./routes/uploadProduk');

// const app = express();

// // ✅ FIXED: Tambahkan header cors dengan origin yang diizinkan
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type'],
// }));

// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api', uploadImageRoutes);
// app.use('/api', uploadProdukRoutes);

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
// });



// const express = require("express")
// const cors = require("cors")
// const path = require("path")

// const uploadImageRoutes = require("./routes/uploadImage")
// const uploadProdukRoutes = require("./routes/uploadProduk")

// const app = express()

// // ✅ Middleware CORS
// app.use(cors())
// app.options("/api/*", cors()) // 💡 ini FIX error di Node.js v23+

// // ✅ JSON dan file statik
// app.use(express.json())
// app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// // ✅ Routes
// app.use("/api", uploadImageRoutes)
// app.use("/api", uploadProdukRoutes)

// const PORT = 5000
// app.listen(PORT, () => {
//   console.log(`🚀 Server berjalan di http://localhost:${PORT}`)
// })



const express = require("express");
const cors = require("cors");
const path = require("path");

const uploadImageRoutes = require("./routes/uploadImage");
const uploadProdukRoutes = require("./routes/uploadProduk");

const app = express();

// ✅ Gunakan CORS secara global dan fleksibel
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server aktif dan menerima koneksi" });
});


// ✅ Routes
app.use("/api", uploadImageRoutes);
app.use("/api", uploadProdukRoutes);

// ✅ Start server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

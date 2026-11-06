// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import styles from "./Kontak.module.scss";

// function CartButton() {
//   const [cartOpen, setCartOpen] = useState(false);
//   const [items, setItems] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const openCart = async () => {
//     setCartOpen(true);
//     if (items === null) {
//       setLoading(true);
//       try {
//         const { db } = await import("../lib/firebase");
//         const { collection, getDocs } = await import("firebase/firestore");
//         const snapshot = await getDocs(collection(db, "keranjang"));
//         const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setItems(fetched);
//       } catch (err) {
//         console.error("Gagal load keranjang", err);
//         setItems([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     function onKey(e) {
//       if (e.key === "Escape") setCartOpen(false);
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   return (
//     <>
//       <button className={styles.keranjangBelanja} onClick={openCart} aria-label="Buka Keranjang">
//         🛒
//       </button>

//       {cartOpen && <div className={styles.cartOverlay} onClick={() => setCartOpen(false)} />}

//       <aside className={`${styles.cartSidebar} ${cartOpen ? styles.openSidebar : ""}`}>
//         <div className={styles.cartHeader}>
//           <strong>Keranjang Anda</strong>
//           <button className={styles.closeCartBtn} onClick={() => setCartOpen(false)}>Tutup</button>
//         </div>

//         <div className={styles.cartContent}>
//           {loading && <div>Memuat...</div>}
//           {!loading && (!items || items.length === 0) && <div>Keranjang kosong.</div>}

//           {!loading && items && items.length > 0 && (
//             <ul className={styles.cartList}>
//               {items.map((i) => (
//                 <li key={i.id} className={styles.cartItem}>
//                   <img src={i.gambarUrl || "/placeholder.png"} alt={i.nama} />
//                   <div>
//                     <div className={styles.cartItemName}>{i.nama}</div>
//                     <div className={styles.cartItemPrice}>Rp {Number(i.harga || 0).toLocaleString("id-ID")}</div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className={styles.cartFooter}>
//           <button className={styles.closeCartBtnPrimary} onClick={() => setCartOpen(false)}>
//             Tutup
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// export default function Kontak() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     nama: "",
//     email: "",
//     telepon: "",
//     subjek: "",
//     pesan: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulasi pengiriman
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     setIsSubmitting(false);
//     setSubmitSuccess(true);
//     setFormData({ nama: "", email: "", telepon: "", subjek: "", pesan: "" });

//     setTimeout(() => setSubmitSuccess(false), 5000);
//   };

//   return (
//     <>
//       <style jsx global>{`
//         :root {
//           --primary: #667eea;
//           --primary-dark: #5568d3;
//           --secondary: #764ba2;
//           --card-bg: #ffffff;
//           --text-primary: #1f2937;
//           --text-secondary: #6b7280;
//           --bg-gray: #f9fafb;
//           --border-gray: #e5e7eb;
//         }

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//           background: var(--bg-gray);
//           color: var(--text-primary);
//         }

//         .gradient-bg {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           position: relative;
//           overflow: hidden;
//         }

//         .hero-section {
//           padding: 80px 20px;
//           text-align: center;
//           color: white;
//         }

//         .hero-title {
//           font-size: clamp(2rem, 5vw, 3.5rem);
//           font-weight: 700;
//           margin-bottom: 24px;
//         }

//         .hero-subtitle {
//           font-size: clamp(1rem, 2vw, 1.25rem);
//           color: rgba(255, 255, 255, 0.9);
//           max-width: 700px;
//           margin: 0 auto 32px;
//         }

//         .contact-info-hero {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 24px;
//           justify-content: center;
//           align-items: center;
//         }

//         .contact-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           color: white;
//           font-size: 1.1rem;
//         }

//         .contact-icon {
//           font-size: 1.3rem;
//           opacity: 0.8;
//         }

//         .form-section {
//           padding: 64px 20px;
//           background: white;
//         }

//         .section-header {
//           text-align: center;
//           margin-bottom: 48px;
//         }

//         .section-title {
//           font-size: clamp(1.75rem, 4vw, 2.25rem);
//           font-weight: 700;
//           margin-bottom: 16px;
//           color: var(--text-primary);
//         }

//         .section-description {
//           font-size: 1.1rem;
//           color: var(--text-secondary);
//         }

//         .contact-form-wrapper {
//           max-width: 900px;
//           margin: 0 auto;
//           background: white;
//           border-radius: 16px;
//           padding: 48px;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
//           border: 1px solid var(--border-gray);
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 24px;
//           margin-bottom: 24px;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//         }

//         .form-label {
//           font-size: 0.9rem;
//           font-weight: 600;
//           color: var(--text-primary);
//           margin-bottom: 8px;
//         }

//         .form-input, .form-select, .form-textarea {
//           padding: 14px 16px;
//           border: 1px solid var(--border-gray);
//           border-radius: 10px;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//           outline: none;
//         }

//         .form-input:focus, .form-select:focus, .form-textarea:focus {
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//           transform: translateY(-2px);
//         }

//         .form-textarea {
//           resize: vertical;
//           min-height: 140px;
//         }

//         .submit-btn {
//           width: 100%;
//           padding: 16px;
//           background: var(--primary);
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-size: 1.1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 10px;
//         }

//         .submit-btn:hover:not(:disabled) {
//           background: var(--primary-dark);
//           transform: scale(1.02);
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
//         }

//         .submit-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .submit-btn.success {
//           background: #10b981;
//         }

//         .map-section {
//           padding: 64px 20px;
//           background: var(--bg-gray);
//         }

//         .map-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           background: white;
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
//         }

//         .map-grid {
//           display: grid;
//           grid-template-columns: 2fr 1fr;
//           gap: 0;
//         }

//         @media (max-width: 968px) {
//           .map-grid {
//             grid-template-columns: 1fr;
//           }
//         }

//         .map-iframe-wrapper {
//           height: 450px;
//         }

//         .map-iframe-wrapper iframe {
//           width: 100%;
//           height: 100%;
//           border: none;
//         }

//         .contact-info-sidebar {
//           padding: 48px 32px;
//           background: linear-gradient(135deg, #f0f4ff 0%, #f3e8ff 100%);
//         }

//         .sidebar-title {
//           font-size: 1.75rem;
//           font-weight: 700;
//           margin-bottom: 32px;
//           color: var(--text-primary);
//         }

//         .info-list {
//           display: flex;
//           flex-direction: column;
//           gap: 24px;
//         }

//         .info-item {
//           display: flex;
//           gap: 16px;
//         }

//         .info-icon {
//           color: var(--primary);
//           font-size: 1.3rem;
//           margin-top: 4px;
//           flex-shrink: 0;
//         }

//         .info-content h4 {
//           font-size: 1.1rem;
//           font-weight: 600;
//           margin-bottom: 6px;
//           color: var(--text-primary);
//         }

//         .info-content p {
//           color: var(--text-secondary);
//           line-height: 1.6;
//         }

//         .troubleshoot-section {
//           padding: 64px 20px;
//           background: white;
//         }

//         .cards-grid {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 32px;
//         }

//         .trouble-card {
//           background: white;
//           border-radius: 16px;
//           padding: 32px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
//           border: 1px solid var(--border-gray);
//           transition: all 0.3s ease;
//         }

//         .trouble-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
//         }

//         .card-icon-wrapper {
//           width: 64px;
//           height: 64px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 20px;
//           font-size: 1.8rem;
//         }

//         .icon-red { background: #fee2e2; color: #dc2626; }
//         .icon-yellow { background: #fef3c7; color: #d97706; }
//         .icon-blue { background: #dbeafe; color: #2563eb; }
//         .icon-green { background: #d1fae5; color: #059669; }
//         .icon-purple { background: #e9d5ff; color: #9333ea; }
//         .icon-indigo { background: #e0e7ff; color: #4f46e5; }

//         .card-title {
//           font-size: 1.35rem;
//           font-weight: 700;
//           margin-bottom: 12px;
//           color: var(--text-primary);
//         }

//         .card-description {
//           color: var(--text-secondary);
//           margin-bottom: 16px;
//           line-height: 1.6;
//         }

//         .card-list {
//           list-style: none;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }

//         .card-list li {
//           color: var(--text-secondary);
//           font-size: 0.95rem;
//           padding-left: 20px;
//           position: relative;
//         }

//         .card-list li::before {
//           content: "•";
//           position: absolute;
//           left: 0;
//           color: var(--primary);
//           font-weight: bold;
//         }

//         @media (max-width: 768px) {
//           .contact-form-wrapper {
//             padding: 32px 24px;
//           }

//           .contact-info-sidebar {
//             padding: 32px 24px;
//           }
//         }
//       `}</style>

//       <header className={styles.header}>
//         <div className={styles.logoContainer}>
//           <Link href="/">
//             <img src="/wmk-logo.jpeg" alt="WMK Logo" className={styles.logoImage} />
//           </Link>
//         </div>

//         <div className={styles.navCenter}>
//           <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
//             <Link href="/">Beranda</Link>
//             <Link href="/#produk">Produk</Link>
//             <Link href="/TentangKami">Tentang Kami</Link>
//             <Link href="/bookingnavbar">Booking</Link>
//             <Link href="/kontak">Kontak</Link>
//           </nav>
//         </div>

//         <div className={styles.rightControls}>
//           <CartButton />
//           <div
//             className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle menu"
//           >
//             <div className={styles.bar}></div>
//             <div className={styles.bar}></div>
//             <div className={styles.bar}></div>
//           </div>
//         </div>
//       </header>

//       {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

//       <main>
//         {/* Hero Section */}
//         <section className="gradient-bg">
//           <motion.div 
//             className="hero-section"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="hero-title">Hubungi Kami</h1>
//             <p className="hero-subtitle">
//               Kami siap membantu Anda dengan solusi general supplier, mekanikal elektrikal mesin dan perawatan gedung terbaik. 
//               Jangan ragu untuk menghubungi tim profesional kami.
//             </p>
//             <div className="contact-info-hero">
//               <div className="contact-item">
//                 <span className="contact-icon">📞</span>
//                 <span>(+62) 812-6888-8969</span>
//               </div>
//               <div className="contact-item">
//                 <span className="contact-icon">✉️</span>
//                 <span>marketingwae@wmk.co.id</span>
//               </div>
//             </div>
//           </motion.div>
//         </section>

//         {/* Form Section */}
//         <section className="form-section">
//           <div className="section-header">
//             <h2 className="section-title">Kirim Pesan Kepada Kami</h2>
//             <p className="section-description">
//               Isi formulir di bawah ini dan kami akan merespons dalam 24 jam
//             </p>
//           </div>

//           <motion.div 
//             className="contact-form-wrapper"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//           >
//             <form onSubmit={handleSubmit}>
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label className="form-label">Nama Lengkap</label>
//                   <input
//                     type="text"
//                     name="nama"
//                     className="form-input"
//                     placeholder="Masukkan nama lengkap Anda"
//                     value={formData.nama}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-input"
//                     placeholder="nama@email.com"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-grid">
//                 <div className="form-group">
//                   <label className="form-label">Nomor Telepon</label>
//                   <input
//                     type="tel"
//                     name="telepon"
//                     className="form-input"
//                     placeholder="+62 812 3456 7890"
//                     value={formData.telepon}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Subjek</label>
//                   <select
//                     name="subjek"
//                     className="form-select"
//                     value={formData.subjek}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Pilih subjek</option>
//                     <option value="konsultasi">Konsultasi Bisnis</option>
//                     <option value="layanan">Informasi Layanan</option>
//                     <option value="support">Technical Support</option>
//                     <option value="kerjasama">Kerjasama</option>
//                     <option value="lainnya">Lainnya</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group" style={{ marginBottom: '24px' }}>
//                 <label className="form-label">Pesan</label>
//                 <textarea
//                   name="pesan"
//                   className="form-textarea"
//                   placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
//                   value={formData.pesan}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className={`submit-btn ${submitSuccess ? 'success' : ''}`}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span>⏳</span>
//                     <span>Mengirim...</span>
//                   </>
//                 ) : submitSuccess ? (
//                   <>
//                     <span>✓</span>
//                     <span>Pesan Terkirim!</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>✉️</span>
//                     <span>Kirim Pesan</span>
//                   </>
//                 )}
//               </button>
//             </form>
//           </motion.div>
//         </section>

//         {/* Map Section */}
//         <section className="map-section">
//           <div className="section-header">
//             <h2 className="section-title">Lokasi Kantor Kami</h2>
//             <p className="section-description">
//               Kunjungi kantor kami untuk konsultasi langsung
//             </p>
//           </div>

//           <motion.div 
//             className="map-container"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//           >
//             <div className="map-grid">
//               <div className="map-iframe-wrapper">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3276849899645!2d106.99822067499658!3d-6.348183493638774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6993dc9f96cf5b%3A0x7c90d20c59f2a7c7!2sJl.%20BKKBN%20No.7%2C%20RT.002%2FRW.007%2C%20Mustika%20Jaya%2C%20Kec.%20Mustika%20Jaya%2C%20Kota%20Bks%2C%20Jawa%20Barat%2017158!5e0!3m2!1sen!2sid!4v1704067200000!5m2!1sen!2sid"
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                 />
//               </div>

//               <div className="contact-info-sidebar">
//                 <h3 className="sidebar-title">Informasi Kontak</h3>
//                 <div className="info-list">
//                   <div className="info-item">
//                     <div className="info-icon">📍</div>
//                     <div className="info-content">
//                       <h4>Alamat</h4>
//                       <p>Jl. BKKBN No.7, RT.002/RW.007<br />Mustika Jaya, Kec. Mustika Jaya<br />Kota Bekasi, Jawa Barat 17158</p>
//                     </div>
//                   </div>

//                   <div className="info-item">
//                     <div className="info-icon">📞</div>
//                     <div className="info-content">
//                       <h4>Telepon</h4>
//                       <p>(+62) 812-6888-8969</p>
//                     </div>
//                   </div>

//                   <div className="info-item">
//                     <div className="info-icon">✉️</div>
//                     <div className="info-content">
//                       <h4>Email</h4>
//                       <p>marketingwae@wmk.co.id</p>
//                     </div>
//                   </div>

//                   <div className="info-item">
//                     <div className="info-icon">🕐</div>
//                     <div className="info-content">
//                       <h4>Jam Operasional</h4>
//                       <p>Senin - Jumat: 09:00 - 18:00<br />Sabtu: 09:00 - 15:00</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </section>

//         {/* Troubleshooting Section */}
//         <section className="troubleshoot-section">
//           <div className="section-header">
//             <h2 className="section-title">Mengalami Kendala?</h2>
//             <p className="section-description">
//               Berikut adalah panduan untuk mengatasi masalah umum dalam menghubungi kami
//             </p>
//           </div>

//           <motion.div 
//             className="cards-grid"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//           >
//             <div className="trouble-card">
//               <div className="card-icon-wrapper icon-red">📵</div>
//               <h3 className="card-title">Telepon Tidak Tersambung</h3>
//               <p className="card-description">Jika panggilan telepon tidak tersambung atau sibuk:</p>
//               <ul className="card-list">
//                 <li>Coba hubungi di luar jam sibuk (10:00-12:00 atau 14:00-16:00)</li>
//                 <li>Gunakan WhatsApp Business: (+62) 812-6888-8969</li>
//                 <li>Kirim email untuk jadwal callback</li>
//                 <li>Gunakan form kontak di atas</li>
//               </ul>
//             </div>

//             <div className="trouble-card">
//               <div className="card-icon-wrapper icon-yellow">📧</div>
//               <h3 className="card-title">Email Tidak Dibalas</h3>
//               <p className="card-description">Jika email Anda belum mendapat balasan:</p>
//               <ul className="card-list">
//                 <li>Periksa folder spam/junk email Anda</li>
//                 <li>Tunggu maksimal 24 jam untuk respons</li>
//                 <li>Pastikan subjek email jelas dan spesifik</li>
//                 <li>Kirim ulang dengan detail lebih lengkap</li>
//               </ul>
//             </div>

//             <div className="trouble-card">
//               <div className="card-icon-wrapper icon-blue">💬</div>
//               <h3 className="card-title">Layanan Chat Offline</h3>
//               <p className="card-description">Jika layanan chat tidak tersedia:</p>
//               <ul className="card-list">
//                 <li>Gunakan WhatsApp sebagai alternatif</li>
//                 <li>Coba refresh halaman website</li>
//                 <li>Nonaktifkan ad-blocker sementara</li>
//                 <li>Hubungi melalui email atau telepon</li>
//               </ul>
//             </div>

//             <div className="trouble-card">
//               <div className="card-icon-wrapper icon-green">⏱️</div>
//               <h3 className="card-title">Respons Lambat</h3>
//               <p className="card-description">Jika respons admin terlalu lama:</p>
//               <ul className="card-list">
//                 <li>Periksa jam operasional kami</li>
//                 <li>Gunakan prioritas "Urgent" untuk hal mendesak</li>
//                 <li>Hubungi langsung via telepon</li>
//                 <li>Kunjungi kantor langsung untuk konsultasi</li>
//               </ul>
//             </div>

//             <div className="trouble-card">
//               <div className="card-icon-wrapper icon-purple">⚠️</div>
//               <h3 className="card-title">Masalah Teknis</h3>
//               <p className="card-description">Jika mengalami error pada website:</p>
//               <ul className="card-list">
//                 <li>Clear cache dan cookies browser</li>
//                 <li>Coba gunakan browser berbeda</li>
//                 <li>Periksa koneksi internet Anda</li>
//                 <li>Laporkan ke tim IT melalui email</li>
//               </ul>
//             </div>

//             <div className="trouble-card">
//               <div className="card-icon-wrapper icon-indigo">🎧</div>
//               <h3 className="card-title">Bantuan Prioritas</h3>
//               <p className="card-description">Untuk bantuan segera:</p>
//               <ul className="card-list">
//                 <li>WhatsApp: (+62) 812-6888-8969</li>
//                 <li>Email: marketingwae@wmk.co.id</li>
//                 <li>Kunjungi kantor kami langsung</li>
//                 <li>Hubungi di jam operasional untuk respons cepat</li>
//               </ul>
//             </div>
//           </motion.div>
//         </section>
//       </main>
//     </>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Kontak.module.scss";

function CartButton() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const openCart = async () => {
    setCartOpen(true);
    if (items === null) {
      setLoading(true);
      try {
        const { db } = await import("../lib/firebase");
        const { collection, getDocs } = await import("firebase/firestore");
        const snapshot = await getDocs(collection(db, "keranjang"));
        const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(fetched);
      } catch (err) {
        console.error("Gagal load keranjang", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setCartOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* <button className={styles.keranjangBelanja} onClick={openCart} aria-label="Buka Keranjang">
        🛒
      </button> */}

      {cartOpen && <div className={styles.cartOverlay} onClick={() => setCartOpen(false)} />}

      <aside className={`${styles.cartSidebar} ${cartOpen ? styles.openSidebar : ""}`}>
        <div className={styles.cartHeader}>
          <strong>Keranjang Anda</strong>
          <button className={styles.closeCartBtn} onClick={() => setCartOpen(false)}>Tutup</button>
        </div>

        <div className={styles.cartContent}>
          {loading && <div>Memuat...</div>}
          {!loading && (!items || items.length === 0) && <div>Keranjang kosong.</div>}

          {!loading && items && items.length > 0 && (
            <ul className={styles.cartList}>
              {items.map((i) => (
                <li key={i.id} className={styles.cartItem}>
                  <img src={i.gambarUrl || "/placeholder.png"} alt={i.nama} />
                  <div>
                    <div className={styles.cartItemName}>{i.nama}</div>
                    <div className={styles.cartItemPrice}>Rp {Number(i.harga || 0).toLocaleString("id-ID")}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.cartFooter}>
          <button className={styles.closeCartBtnPrimary} onClick={() => setCartOpen(false)}>
            Tutup
          </button>
        </div>
      </aside>
    </>
  );
}

export default function Kontak() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    subjek: "",
    pesan: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

//   // === MODIFIED handleSubmit: POST ke /api/send-email ===
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         // response not ok — tampilkan pesan error singkat
//         console.error("Gagal mengirim:", data);
//         window.alert("Gagal mengirim pesan. Coba lagi nanti.");
//         setIsSubmitting(false);
//         return;
//       }

//       // sukses
//       setIsSubmitting(false);
//       setSubmitSuccess(true);
//       setFormData({ nama: "", email: "", telepon: "", subjek: "", pesan: "" });

//       setTimeout(() => setSubmitSuccess(false), 5000);
//     } catch (err) {
//       console.error("Error saat mengirim:", err);
//       window.alert("Terjadi kesalahan saat mengirim. Periksa koneksi Anda dan coba lagi.");
//       setIsSubmitting(false);
//     }
//   };
//   // =======================================================

//   useEffect(() => {
//     // nothing else changed here — keep behaviour the same if you had something
//   }, []);
// === MODIFIED handleSubmit: POST ke /api/send-email ===
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);

//   try {
//     // gunakan NEXT_PUBLIC_API_BASE agar mudah konfigurasi dev / production
//     const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://listfileswmk.vercel.app"; // default: "" (relatif)
//     // const res = await fetch(`${API_BASE}/api/send-email`, {
//     const res = await fetch(`${API_BASE}/sendEmail`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(formData),
//       body: JSON.stringify({
//   ...formData,
//   adminEmail: "ptwaemandirikarya@wmk.co.id",
//   source: "kontak-page",
// }),

//     });

//     const data = await res.json();

//     if (!res.ok) {
//       // response not ok — tampilkan pesan error singkat
//       console.error("Gagal mengirim:", data);
//       window.alert("Gagal mengirim pesan. Coba lagi nanti.");
//       setIsSubmitting(false);
//       return;
//     }

//     // sukses
//     setIsSubmitting(false);
//     setSubmitSuccess(true);
//     setFormData({ nama: "", email: "", telepon: "", subjek: "", pesan: "" });

//     setTimeout(() => setSubmitSuccess(false), 5000);
//   } catch (err) {
//     console.error("Error saat mengirim:", err);
//     window.alert("Terjadi kesalahan saat mengirim. Periksa koneksi Anda dan coba lagi.");
//     setIsSubmitting(false);
//   }
// };
// =======================================================


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE || "https://listfileswmk.vercel.app";

    const res = await fetch(`${API_BASE}/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        adminEmail: "ptwaemandirikarya@wmk.co.id",
        source: "kontak-page",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Gagal mengirim:", data);
      alert("Gagal mengirim pesan. Coba lagi nanti.");
      setIsSubmitting(false);
      return;
    }

    setSubmitSuccess(true);
    setFormData({
      nama: "",
      email: "",
      telepon: "",
      subjek: "",
      pesan: "",
    });

    setTimeout(() => setSubmitSuccess(false), 5000);
  } catch (err) {
    console.error("Error saat mengirim:", err);
    alert("Terjadi kesalahan saat mengirim.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <>
      <style jsx global>{`
        :root {
            --primary: #0d3a5b;
  --accent: #F3EBE3;
  --muted: #6b7a85;
  --card-bg: #F3EBE3;
  --shadow: 0 10px 30px rgba(13, 58, 91, 0.08);
  --radius: 14px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: var(--bg-gray);
          color: var(--text-primary);
        }

        .gradient-bg {
          background: #0d3a5b;
          position: relative;
          overflow: hidden;
        }

        .hero-section {
          padding: 80px 20px;
          text-align: center;
          color: white;
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 24px;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.9);
          max-width: 700px;
          margin: 0 auto 32px;
        }

        .contact-info-hero {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: center;
          align-items: center;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          font-size: 1.1rem;
        }

        .contact-icon {
          font-size: 1.3rem;
          opacity: 0.8;
        }

        .form-section {
          padding: 64px 20px;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-title {
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .section-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .contact-form-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--border-gray);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .form-input, .form-select, .form-textarea {
          padding: 14px 16px;
          border: 1px solid var(--border-gray);
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .form-textarea {
          resize: vertical;
          min-height: 140px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--primary-dark);
          transform: scale(1.02);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn.success {
          background: #10b981;
        }

        .map-section {
          padding: 64px 20px;
          background: var(--bg-gray);
        }

        .map-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .map-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 0;
        }

        @media (max-width: 968px) {
          .map-grid {
            grid-template-columns: 1fr;
          }
        }

        .map-iframe-wrapper {
          height: 450px;
        }

        .map-iframe-wrapper iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .contact-info-sidebar {
          padding: 48px 32px;
          background: linear-gradient(135deg, #f0f4ff 0%, #f3e8ff 100%);
        }

        .sidebar-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 32px;
          color: var(--text-primary);
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-item {
          display: flex;
          gap: 16px;
        }

        .info-icon {
          color: var(--primary);
          font-size: 1.3rem;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .info-content h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 6px;
          color: var(--text-primary);
        }

        .info-content p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .troubleshoot-section {
          padding: 64px 20px;
          background: white;
        }

        .cards-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .trouble-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--border-gray);
          transition: all 0.3s ease;
        }

        .trouble-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
        }

        .card-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 1.8rem;
        }

        .icon-red { background: #fee2e2; color: #dc2626; }
        .icon-yellow { background: #fef3c7; color: #d97706; }
        .icon-blue { background: #dbeafe; color: #2563eb; }
        .icon-green { background: #d1fae5; color: #059669; }
        .icon-purple { background: #e9d5ff; color: #9333ea; }
        .icon-indigo { background: #e0e7ff; color: #4f46e5; }

        .card-title {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .card-description {
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .card-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .card-list li {
          color: var(--text-secondary);
          font-size: 0.95rem;
          padding-left: 20px;
          position: relative;
        }

        .card-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--primary);
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .contact-form-wrapper {
            padding: 32px 24px;
          }

          .contact-info-sidebar {
            padding: 32px 24px;
          }
        }
      `}</style>

      {/* <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/wmk-logo.jpeg" alt="WMK Logo" className={styles.logoImage} />
          </Link>
        </div>

        <div className={styles.navCenter}>
          <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
            <Link href="/">Beranda</Link>
            <Link href="/#produk">Produk</Link>
            <Link href="/TentangKami">Tentang Kami</Link>
            <Link href="/bookingnavbar">Booking</Link>
            <Link href="/kontak">Kontak</Link>
          </nav>
        </div>

        <div className={styles.rightControls}>
          <CartButton />
          <div
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
      </header> */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/wmk-logo.jpeg" alt="Compluss Logo" className={styles.logoImage} />
          </Link>
        </div>
      
        <div className={styles.navCenter}>
          <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
            <Link href="/">Beranda</Link>
            <Link href="/ProdukPage">Produk</Link>
            <Link href="/TentangKami">Tentang Kami</Link>
            <Link href="/bookingnavbar">Booking</Link>
            <Link href="/kontak">Kontak</Link>
          </nav>
        </div>
      
        <div className={styles.rightControls}>
          {/* Keranjang — sekarang dikontrol oleh React */}
          {/* <CartButton /> */}
          <div
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
      </header>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

      <main>
        {/* Hero Section */}
        <section className="gradient-bg">
          <motion.div 
            className="hero-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">Hubungi Kami</h1>
            <p className="hero-subtitle">
              Kami siap membantu Anda dengan solusi general supplier, mekanikal elektrikal mesin dan perawatan gedung terbaik. 
              Jangan ragu untuk menghubungi tim profesional kami.
            </p>
            <div className="contact-info-hero">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>(+62) 812-1912-2595</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>ptwaemandirikarya@wmk.co.id</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Form Section */}
        <section className="form-section">
          <div className="section-header">
            <h2 className="section-title">Kirim Pesan Kepada Kami</h2>
            <p className="section-description">
              Isi formulir di bawah ini dan kami akan merespons dalam 24 jam
            </p>
          </div>

          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama"
                    className="form-input"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nomor Telepon</label>
                  <input
                    type="tel"
                    name="telepon"
                    className="form-input"
                    placeholder="+62 812 3456 7890"
                    value={formData.telepon}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subjek</label>
                  <select
                    name="subjek"
                    className="form-select"
                    value={formData.subjek}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih subjek</option>
                    <option value="konsultasi">Konsultasi Bisnis</option>
                    <option value="layanan">Informasi Layanan</option>
                    <option value="support">Technical Support</option>
                    <option value="kerjasama">Kerjasama</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Pesan</label>
                <textarea
                  name="pesan"
                  className="form-textarea"
                  placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                  value={formData.pesan}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={`submit-btn ${submitSuccess ? 'success' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span>⏳</span>
                    <span>Mengirim...</span>
                  </>
                ) : submitSuccess ? (
                  <>
                    <span>✓</span>
                    <span>Pesan Terkirim!</span>
                  </>
                ) : (
                  <>
                    <span>✉️</span>
                    <span>Kirim Pesan</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <div className="section-header">
            <h2 className="section-title">Lokasi Kantor Kami</h2>
            <p className="section-description">
              Kunjungi kantor kami untuk konsultasi langsung
            </p>
          </div>

          <motion.div 
            className="map-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="map-grid">
              <div className="map-iframe-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3276849899645!2d106.99822067499658!3d-6.348183493638774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6993dc9f96cf5b%3A0x7c90d20c59f2a7c7!2sJl.%20BKKBN%20No.7%2C%20RT.002%2FRW.007%2C%20Mustika%20Jaya%2C%20Kec.%20Mustika%20Jaya%2C%20Kota%20Bks%2C%20Jawa%20Barat%2017158!5e0!3m2!1sen!2sid!4v1704067200000!5m2!1sen!2sid"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="contact-info-sidebar">
                <h3 className="sidebar-title">Informasi Kontak</h3>
                <div className="info-list">
                  <div className="info-item">
                    <div className="info-icon">📍</div>
                    <div className="info-content">
                      <h4>Alamat</h4>
                      <p>Jl. BKKBN No.7, RT.002/RW.007<br />Mustika Jaya, Kec. Mustika Jaya<br />Kota Bekasi, Jawa Barat 17158</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">📞</div>
                    <div className="info-content">
                      <h4>Telepon</h4>
                      <p>(+62) 812-1912-2595</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">✉️</div>
                    <div className="info-content">
                      <h4>Email</h4>
                      <p>ptwaemandirikarya@wmk.co.id</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">🕐</div>
                    <div className="info-content">
                      <h4>Jam Operasional</h4>
                      <p>Senin - Jumat: 09:00 - 18:00<br />Sabtu: 09:00 - 15:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Troubleshooting Section */}
        <section className="troubleshoot-section">
          <div className="section-header">
            <h2 className="section-title">Mengalami Kendala?</h2>
            <p className="section-description">
              Berikut adalah panduan untuk mengatasi masalah umum dalam menghubungi kami
            </p>
          </div>

          <motion.div 
            className="cards-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="trouble-card">
              <div className="card-icon-wrapper icon-red">📵</div>
              <h3 className="card-title">Telepon Tidak Tersambung</h3>
              <p className="card-description">Jika panggilan telepon tidak tersambung atau sibuk:</p>
              <ul className="card-list">
                <li>Coba hubungi di luar jam sibuk (10:00-12:00 atau 14:00-16:00)</li>
                <li>Gunakan WhatsApp Business: (+62) 812-1912-2595</li>
                <li>Kirim email untuk jadwal callback</li>
                <li>Gunakan form kontak di atas</li>
              </ul>
            </div>

            <div className="trouble-card">
              <div className="card-icon-wrapper icon-yellow">📧</div>
              <h3 className="card-title">Email Tidak Dibalas</h3>
              <p className="card-description">Jika email Anda belum mendapat balasan:</p>
              <ul className="card-list">
                <li>Periksa folder spam/junk email Anda</li>
                <li>Tunggu maksimal 24 jam untuk respons</li>
                <li>Pastikan subjek email jelas dan spesifik</li>
                <li>Kirim ulang dengan detail lebih lengkap</li>
              </ul>
            </div>

            <div className="trouble-card">
              <div className="card-icon-wrapper icon-blue">💬</div>
              <h3 className="card-title">Layanan Chat Offline</h3>
              <p className="card-description">Jika layanan chat tidak tersedia:</p>
              <ul className="card-list">
                <li>Gunakan WhatsApp sebagai alternatif</li>
                <li>Coba refresh halaman website</li>
                <li>Nonaktifkan ad-blocker sementara</li>
                <li>Hubungi melalui email atau telepon</li>
              </ul>
            </div>

            <div className="trouble-card">
              <div className="card-icon-wrapper icon-green">⏱️</div>
              <h3 className="card-title">Respons Lambat</h3>
              <p className="card-description">Jika respons admin terlalu lama:</p>
              <ul className="card-list">
                <li>Periksa jam operasional kami</li>
                <li>Gunakan prioritas "Urgent" untuk hal mendesak</li>
                <li>Hubungi langsung via telepon</li>
                <li>Kunjungi kantor langsung untuk konsultasi</li>
              </ul>
            </div>

            <div className="trouble-card">
              <div className="card-icon-wrapper icon-purple">⚠️</div>
              <h3 className="card-title">Masalah Teknis</h3>
              <p className="card-description">Jika mengalami error pada website:</p>
              <ul className="card-list">
                <li>Clear cache dan cookies browser</li>
                <li>Coba gunakan browser berbeda</li>
                <li>Periksa koneksi internet Anda</li>
                <li>Laporkan ke tim IT melalui email</li>
              </ul>
            </div>

            <div className="trouble-card">
              <div className="card-icon-wrapper icon-indigo">🎧</div>
              <h3 className="card-title">Bantuan Prioritas</h3>
              <p className="card-description">Untuk bantuan segera:</p>
              <ul className="card-list">
                <li>WhatsApp: (+62) 812-1912-2595</li>
                <li>Email: ptwaemandirikarya@wmk.co.id</li>
                <li>Kunjungi kantor kami langsung</li>
                <li>Hubungi di jam operasional untuk respons cepat</li>
              </ul>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

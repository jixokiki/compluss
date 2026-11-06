// "use client";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
// import { KeenSliderPlugin } from "keen-slider/react";
// import styles from "../styles/BannerSlider.module.scss";
// import React, { useState } from "react";
// import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

// const autoplay: KeenSliderPlugin = (slider) => {
//   let timeout: ReturnType<typeof setTimeout>;
//   let mouseOver = false;

//   function clearNextTimeout() {
//     clearTimeout(timeout);
//   }
//   function nextTimeout() {
//     clearTimeout(timeout);
//     if (mouseOver) return;
//     timeout = setTimeout(() => {
//       slider.next();
//     }, 3500);
//   }

//   slider.on("created", () => {
//     slider.container.addEventListener("mouseover", () => {
//       mouseOver = true;
//       clearNextTimeout();
//     });
//     slider.container.addEventListener("mouseout", () => {
//       mouseOver = false;
//       nextTimeout();
//     });
//     nextTimeout();
//   });
//   slider.on("dragStarted", clearNextTimeout);
//   slider.on("animationEnded", nextTimeout);
//   slider.on("updated", nextTimeout);
// };

// export default function BannerSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
//     {
//       loop: true,
//       slides: { perView: 1 },
//       slideChanged(slider) {
//         setCurrentSlide(slider.track.details.rel);
//       },
//     },
//     [autoplay]
//   );

//   return (
//     <div className={styles.sliderWrapper}>
//       <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
//         {[
//           {
//             // src: "/banners/promo1.png",
//                         // src: "/banners/pm17.png",
//                         src: "/banners/50.png",
//             title: "SparePart Premium Akhir Tahun",
//             desc: "Dapatkan sparepart premium dalam waktu terbatas.",
//             cta: "Lihat Layanan",
//           },
//           {
//             src: "/banners/48.jpg",
//             title: "Premium Sparepart",
//             desc: "Solusi sparepart terlengkap & terpercaya.",
//             cta: "Selengkapnya",
//           },
//           {
//             // src: "/banners/promo3.png",
//             // src: "/banners/6.jpg",
//                         src: "/banners/37.jpg",
//             title: "Industrial Grade Supply",
//             desc: "Gunakan Industrial Grade Supply yang terjamin kuat dan tahan waktu.",
//             cta: "Hubungi Kami",
//           },
//           {
//             // src: "/banners/promo4.png",
//             // src: "/banners/7.jpg",
//                         src: "/banners/38.jpg",
//             title: "Engineering Material",
//             desc: "Kami percayai bahwa kekuatan sejati lahir dari Precision Engineering.", 
//             cta: "Safe & Convenient",
//           },
//           {
//             // src: "/banners/promo5.png",
//                         // src: "/banners/bod1compluss.jpg",
//                         // src: "/banners/8.jpg",
//                                                 src: "/banners/39.jpg",
//             title: "Custom Fabrication Service",
//             desc: "Setiap detail kami hasilkan melalui Engineering Works presisi tinggi.",
//             cta: "Lihat Selengkapnya",
//           },
//           {
//             // src: "/banners/promo6.png",
//                         // src: "/banners/bod2compluss.jpg",
//                         // src: "/banners/9.jpg",
//                                                 src: "/banners/40.jpg",
//             title: "Manufacturing Excellence",
//             desc: "Kami wujudkan Manufacturing Excellence di setiap proyek.",
//             cta: "Cek Detail",
//           },
//           {
//             // src: "/banners/promo7.png",
//             // src: "/banners/10.jpg",
//                         src: "/banners/41.jpg",
//             title: "Smart Material & Fabrication",
//             desc: "Bangunan kuat berawal dari Smart Material yang tepat & Fabrikasi pintar untuk dunia industri yang tak berhenti bergerak.",
//             cta: "Pelajari Lebih Lanjut",
//           },
//           {
//             // src: "/banners/promo8.png",
//             // src: "/banners/11.jpg",
//                         src: "/banners/42.jpg",
//             title: "Industrial Workshop Solution",
//             desc: "Hadir sebagai Industrial Workshop Solution terpercaya di setiap pengadaan Anda.",
//             cta: "Shop Now",
//           },
//           {
//             // src: "/banners/promo9.png",
//             // src: "/banners/12.jpg",
//                         src: "/banners/43.jpg",
//             title: "Engineering Works",
//             desc: "Setiap detail kami hasilkan melalui Engineering Works presisi tinggi.",
//             cta: "Lihat Koleksi",
//           },
//           {
//             // src: "/banners/promo10.png",
//             // src: "/banners/13.jpg",
//                         src: "/banners/44.jpg",
//             title: "Material Solution",
//             desc: "Kami menghadirkan Precision Material demi ketahanan dan presisi produk Anda.",
//             cta: "Lihat Selengkapnya",
//           },
//         ].map((item, i) => (
//           <div
//             className={`keen-slider__slide ${styles.zoomSlide}`}
//             key={i}
//             style={{ animation: "fadeSlide 1s ease" }}
//           >
//             <img src={item.src} alt={item.title} />
//             <div className={styles.overlay}>
//               <h2>{item.title}</h2>
//               <p>{item.desc}</p>
//               <a href="#produk">{item.cta}</a>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         className={styles.prev}
//         onClick={() => instanceRef.current?.prev()}
//       >
//         <ChevronLeftCircle size={32} />
//       </button>
//       <button
//         className={styles.next}
//         onClick={() => instanceRef.current?.next()}
//       >
//         <ChevronRightCircle size={32} />
//       </button>

//       <div className={styles.dots}>
//         {[...Array(10)].map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => instanceRef.current?.moveToIdx(idx)}
//             className={currentSlide === idx ? styles.activeDot : ""}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



// "use client";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
// import { KeenSliderPlugin } from "keen-slider/react";
// import styles from "../styles/BannerSlider.module.scss";
// import React, { useState } from "react";
// import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

// const autoplay: KeenSliderPlugin = (slider) => {
//   let timeout: ReturnType<typeof setTimeout>;
//   let mouseOver = false;

//   function clearNextTimeout() {
//     clearTimeout(timeout);
//   }
//   function nextTimeout() {
//     clearTimeout(timeout);
//     if (mouseOver) return;
//     timeout = setTimeout(() => {
//       slider.next();
//     }, 3500);
//   }

//   slider.on("created", () => {
//     slider.container.addEventListener("mouseover", () => {
//       mouseOver = true;
//       clearNextTimeout();
//     });
//     slider.container.addEventListener("mouseout", () => {
//       mouseOver = false;
//       nextTimeout();
//     });
//     nextTimeout();
//   });
//   slider.on("dragStarted", clearNextTimeout);
//   slider.on("animationEnded", nextTimeout);
//   slider.on("updated", nextTimeout);
// };

// /**
//  * Helper: scroll ke section Produk dan (opsional) klik link Contact pertama.
//  * - Mencari header H3 dengan teks 'KAMI MENAWARKAN' (sesuai ProdukPage2)
//  * - Jika ditemukan, scrollIntoView; lalu coba klik anchor .link yang mengandung 'contact'
//  */
// function gotoProdukAndTriggerContact() {
//   try {
//     // cari header H3 yang ada pada ProdukPage2
//     const headers = Array.from(document.querySelectorAll("h3"));
//     const produkHeader = headers.find((h) => h.textContent && h.textContent.trim().toUpperCase() === "KAMI MENAWARKAN");

//     if (produkHeader) {
//       const section = produkHeader.closest("section") || produkHeader.parentElement;
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth", block: "start" });
//       } else {
//         // fallback: scroll ke header langsung
//         produkHeader.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     } else {
//       // fallback: scroll to top of element with id 'produk' if any
//       const byId = document.getElementById("produk");
//       if (byId) byId.scrollIntoView({ behavior: "smooth", block: "start" });
//     }

//     // beri jeda kecil supaya ProdukPage2 punya waktu render (produk biasanya sudah ada)
//     setTimeout(() => {
//       // cari link Contact pertama (class .link dipakai di ProdukPage2)
//       const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a.link, a"));
//       const contactAnchor = anchors.find((a) => /contact/i.test((a.textContent || "") + (a.getAttribute("href") || "")));
//       if (contactAnchor) {
//         // trigger klik (stopPropagation tidak diperlukan di sini)
//         contactAnchor.click();
//       }
//     }, 350); // 350ms - kecil dan biasanya cukup
//   } catch (e) {
//     // jika ada error, jangan crash aplikasi — hanya log
//     // console.warn("gotoProdukAndTriggerContact:", e);
//   }
// }


// /**
//  * Helper: scroll ke halaman TentangKami dan (opsional) klik tombol "Kontak Kami"
//  * - Mencari H1/elemen yang mengandung teks 'Tentang PT. Wae Mandiri Karya' atau 'Tentang Kami'
//  * - Scroll ke sana; lalu coba klik anchor yang mengandung 'mailto:' atau teks 'Kontak Kami'
//  */
// function gotoTentangKamiAndTriggerContact() {
//   try {
//     // cari heading yang relevan (cocokkan beberapa variasi teks)
//     const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
//     const tentangs = headings.find((h) => {
//       const t = (h.textContent || "").trim().toUpperCase();
//       return t.includes("TENTANG PT. WAE MANDIRI KARYA") || t.includes("TENTANG KAMI") || t.includes("TENTANG KAMI");
//     });

//     if (tentangs) {
//       const section = tentangs.closest("section") || tentangs.parentElement;
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth", block: "start" });
//       } else {
//         tentangs.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     } else {
//       // fallback: cari route/path atau id spesifik
//       const byId = document.getElementById("tentangkami") || document.getElementById("TentangKami");
//       if (byId) byId.scrollIntoView({ behavior: "smooth", block: "start" });
//     }

//     // beri jeda kecil agar DOM/animasi selesai, lalu coba klik CTA kontak
//     setTimeout(() => {
//       // Prioritas: mailto link, lalu anchor dengan teks 'Kontak' atau tombol yang tampak seperti kontak
//       const mailto = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href^='mailto:']"))[0];
//       if (mailto) {
//         mailto.click();
//         return;
//       }

//       // cari elemen dengan teks 'Kontak Kami' atau 'Kontak' (case-insensitive)
//       const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a, button, [role='button']"));
//       const contactEl = anchors.find((el) => /kontak kami|kontak|contact us|contact/i.test((el.textContent || "").trim()));
//       if (contactEl) {
//         // jika anchor, klik; jika button/element lain, dispatch klik
//         (contactEl as HTMLElement).click();
//         return;
//       }

//       // fallback ringan: jika ada link ke /kontak, klik
//       const linkToKontak = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).find((a) =>
//         /\/kontak|kontak/i.test(a.getAttribute("href") || "")
//       );
//       if (linkToKontak) linkToKontak.click();
//     }, 350);
//   } catch (err) {
//     // jangan lempar error ke UI — hanya log
//     // console.warn("gotoTentangKamiAndTriggerContact:", err);
//   }
// }


// export default function BannerSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
//     {
//       loop: true,
//       slides: { perView: 1 },
//       slideChanged(slider) {
//         setCurrentSlide(slider.track.details.rel);
//       },
//     },
//     [autoplay]
//   );

//   const slides = [
//     {
//       src: "/banners/50.png",
//       title: "SparePart Premium Akhir Tahun",
//       desc: "Dapatkan sparepart premium dalam waktu terbatas.",
//       cta: "Hubungi Kami",
//     },
//     {
//       src: "/banners/48.jpg",
//       title: "Premium Sparepart",
//       desc: "Solusi sparepart terlengkap & terpercaya.",
//       cta: "Selengkapnya",
//     },
//     {
//       src: "/banners/37.jpg",
//       title: "Industrial Grade Supply",
//       desc: "Gunakan Industrial Grade Supply yang terjamin kuat dan tahan waktu.",
//       cta: "Hubungi Kami",
//     },
//     {
//       src: "/banners/38.jpg",
//       title: "Engineering Material",
//       desc: "Kami percayai bahwa kekuatan sejati lahir dari Precision Engineering.",
//       cta: "Safe & Convenient",
//     },
//     {
//       src: "/banners/39.jpg",
//       title: "Custom Fabrication Service",
//       desc: "Setiap detail kami hasilkan melalui Engineering Works presisi tinggi.",
//       cta: "Lihat Selengkapnya",
//     },
//     {
//       src: "/banners/40.jpg",
//       title: "Manufacturing Excellence",
//       desc: "Kami wujudkan Manufacturing Excellence di setiap proyek.",
//       cta: "Cek Detail",
//     },
//     {
//       src: "/banners/41.jpg",
//       title: "Smart Material & Fabrication",
//       desc: "Bangunan kuat berawal dari Smart Material yang tepat & Fabrikasi pintar untuk dunia industri yang tak berhenti bergerak.",
//       cta: "Pelajari Lebih Lanjut",
//     },
//     {
//       src: "/banners/42.jpg",
//       title: "Industrial Workshop Solution",
//       desc: "Hadir sebagai Industrial Workshop Solution terpercaya di setiap pengadaan Anda.",
//       cta: "Shop Now",
//     },
//     {
//       src: "/banners/43.jpg",
//       title: "Engineering Works",
//       desc: "Setiap detail kami hasilkan melalui Engineering Works presisi tinggi.",
//       cta: "Lihat Koleksi",
//     },
//     {
//       src: "/banners/44.jpg",
//       title: "Material Solution",
//       desc: "Kami menghadirkan Precision Material demi ketahanan dan presisi produk Anda.",
//       cta: "Lihat Selengkapnya",
//     },
//   ];

//   return (
//     <div className={styles.sliderWrapper}>
//       <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
//         {slides.map((item, i) => (
//           <div
//             className={`keen-slider__slide ${styles.zoomSlide}`}
//             key={i}
//             style={{ animation: "fadeSlide 1s ease" }}
//           >
//             <img src={item.src} alt={item.title} />
//             <div className={styles.overlay}>
//               <h2>{item.title}</h2>
//               <p>{item.desc}</p>

//               {/* CTA: kalau teks CTA mengandung 'Hubungi' -> jalankan fungsi interaksi ke ProdukPage2.
//                   Jika bukan, tetap pakai anchor biasa menuju #produk atau href '#' */}
//               {/(hubungi|contact)/i.test(item.cta) ? (
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     gotoProdukAndTriggerContact();
//                   }}
//                   className={styles.ctaBtn}
//                 >
//                   {item.cta}
//                 </button>
//               ) : (
//                 <a href="#produk" onClick={(e) => { /* default behaviour: anchor scroll */ }}>
//                   {item.cta}
//                 </a>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         className={styles.prev}
//         onClick={() => instanceRef.current?.prev()}
//       >
//         <ChevronLeftCircle size={32} />
//       </button>
//       <button
//         className={styles.next}
//         onClick={() => instanceRef.current?.next()}
//       >
//         <ChevronRightCircle size={32} />
//       </button>

//       <div className={styles.dots}>
//         {[...Array(slides.length)].map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => instanceRef.current?.moveToIdx(idx)}
//             className={currentSlide === idx ? styles.activeDot : ""}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }






// "use client";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
// import { KeenSliderPlugin } from "keen-slider/react";
// import styles from "../styles/BannerSlider.module.scss";
// import React, { useState } from "react";
// import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

// const autoplay: KeenSliderPlugin = (slider) => {
//   let timeout: ReturnType<typeof setTimeout>;
//   let mouseOver = false;

//   function clearNextTimeout() {
//     clearTimeout(timeout);
//   }
//   function nextTimeout() {
//     clearTimeout(timeout);
//     if (mouseOver) return;
//     timeout = setTimeout(() => {
//       slider.next();
//     }, 3500);
//   }

//   slider.on("created", () => {
//     slider.container.addEventListener("mouseover", () => {
//       mouseOver = true;
//       clearNextTimeout();
//     });
//     slider.container.addEventListener("mouseout", () => {
//       mouseOver = false;
//       nextTimeout();
//     });
//     nextTimeout();
//   });
//   slider.on("dragStarted", clearNextTimeout);
//   slider.on("animationEnded", nextTimeout);
//   slider.on("updated", nextTimeout);
// };

// /**
//  * Helper: scroll ke section Produk dan (opsional) klik link Contact pertama.
//  * - Mencari header H3 dengan teks 'KAMI MENAWARKAN' (sesuai ProdukPage2)
//  * - Jika ditemukan, scrollIntoView; lalu coba klik anchor .link yang mengandung 'contact'
//  */
// // function gotoProdukAndTriggerContact() {
// //   try {
// //     // cari header H3 yang ada pada ProdukPage2
// //     const headers = Array.from(document.querySelectorAll("h3"));
// //     const produkHeader = headers.find((h) => h.textContent && h.textContent.trim().toUpperCase() === "KAMI MENAWARKAN");

// //     if (produkHeader) {
// //       const section = produkHeader.closest("section") || produkHeader.parentElement;
// //       if (section) {
// //         section.scrollIntoView({ behavior: "smooth", block: "start" });
// //       } else {
// //         // fallback: scroll ke header langsung
// //         produkHeader.scrollIntoView({ behavior: "smooth", block: "start" });
// //       }
// //     } else {
// //       // fallback: scroll to top of element with id 'produk' if any
// //       const byId = document.getElementById("produk");
// //       if (byId) byId.scrollIntoView({ behavior: "smooth", block: "start" });
// //     }

// //     // beri jeda kecil supaya ProdukPage2 punya waktu render (produk biasanya sudah ada)
// //     setTimeout(() => {
// //       // cari link Contact pertama (class .link dipakai di ProdukPage2)
// //       const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a.link, a"));
// //       const contactAnchor = anchors.find((a) =>
// //         /contact|selengkapnya|pelajari lebih lanjut|hubungi/i.test(((a.textContent || "") + (a.getAttribute("href") || "")).toLowerCase())
// //       );
// //       if (contactAnchor) {
// //         // trigger klik (stopPropagation tidak diperlukan di sini)
// //         contactAnchor.click();
// //       }
// //     }, 350); // 350ms - kecil dan biasanya cukup
// //   } catch (e) {
// //     // jika ada error, jangan crash aplikasi — hanya log
// //     // console.warn("gotoProdukAndTriggerContact:", e);
// //   }
// // }


// // function gotoProdukAndTriggerContact() {
// //   try {
// //     // cari heading yang relevan (cocokkan beberapa variasi teks)
// //     const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
// //     const tentangs = headings.find((h) => {
// //       const t = (h.textContent || "").trim().toUpperCase();
// //       return t.includes("TENTANG PT. WAE MANDIRI KARYA") || t.includes("TENTANG KAMI") || t.includes("TENTANG KAMI");
// //     });

// //     if (tentangs) {
// //       const section = tentangs.closest("section") || tentangs.parentElement;
// //       if (section) {
// //         section.scrollIntoView({ behavior: "smooth", block: "start" });
// //       } else {
// //         tentangs.scrollIntoView({ behavior: "smooth", block: "start" });
// //       }
// //     } else {
// //       // fallback: cari route/path atau id spesifik
// //       const byId = document.getElementById("tentangkami") || document.getElementById("TentangKami");
// //       if (byId) byId.scrollIntoView({ behavior: "smooth", block: "start" });
// //     }

// //     // beri jeda kecil agar DOM/animasi selesai, lalu coba klik CTA kontak
// //     setTimeout(() => {
// //       // Prioritas: mailto link, lalu anchor dengan teks 'Kontak' atau tombol yang tampak seperti kontak
// //       const mailto = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href^='mailto:']"))[0];
// //       if (mailto) {
// //         mailto.click();
// //         return;
// //       }

// //       // cari elemen dengan teks 'Kontak Kami' atau 'Kontak' (case-insensitive)
// //       const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a, button, [role='button']"));
// //       const contactEl = anchors.find((el) => /kontak kami|kontak|contact us|contact/i.test((el.textContent || "").trim()));
// //       if (contactEl) {
// //         // jika anchor, klik; jika button/element lain, dispatch klik
// //         (contactEl as HTMLElement).click();
// //         return;
// //       }

// //       // fallback ringan: jika ada link ke /kontak, klik
// //       const linkToKontak = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).find((a) =>
// //         /\/kontak|kontak/i.test(a.getAttribute("href") || "")
// //       );
// //       if (linkToKontak) linkToKontak.click();
// //     }, 350);
// //   } catch (err) {
// //     // jangan lempar error ke UI — hanya log
// //     // console.warn("gotoTentangKamiAndTriggerContact:", err);
// //   }
// // }

// function gotoProdukAndTriggerContact() {
//   try {
//     // cari header H3 yang ada pada ProdukPage2
//     const headers = Array.from(document.querySelectorAll("h3"));
//     const produkHeader = headers.find((h) => h.textContent && h.textContent.trim().toUpperCase() === "KAMI MENAWARKAN");

//     if (produkHeader) {
//       const section = produkHeader.closest("section") || produkHeader.parentElement;
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth", block: "start" });
//       } else {
//         // fallback: scroll ke header langsung
//         produkHeader.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     } else {
//       // fallback: scroll to top of element with id 'produk' if any
//       const byId = document.getElementById("produk");
//       if (byId) byId.scrollIntoView({ behavior: "smooth", block: "start" });
//     }

//     // beri jeda kecil supaya ProdukPage2 punya waktu render (produk biasanya sudah ada)
//     setTimeout(() => {
//       // cari link Contact pertama (class .link dipakai di ProdukPage2)
//       const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a.link, a"));
//       const contactAnchor = anchors.find((a) => /contact/i.test((a.textContent || "") + (a.getAttribute("href") || "")));
//       if (contactAnchor) {
//         // trigger klik (stopPropagation tidak diperlukan di sini)
//         contactAnchor.click();
//       }
//     }, 350); // 350ms - kecil dan biasanya cukup
//   } catch (e) {
//     // jika ada error, jangan crash aplikasi — hanya log
//     // console.warn("gotoProdukAndTriggerContact:", e);
//   }
// }


// /**
//  * Helper: scroll ke halaman TentangKami dan (opsional) klik tombol "Kontak Kami"
//  * - Mencari H1/elemen yang mengandung teks 'Tentang PT. Wae Mandiri Karya' atau 'Tentang Kami'
//  * - Scroll ke sana; lalu coba klik anchor yang mengandung 'mailto:' atau teks 'Kontak Kami'
//  */
// function gotoTentangKamiAndTriggerContact() {
//   try {
//     // cari heading yang relevan (cocokkan beberapa variasi teks)
//     const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
//     const tentangs = headings.find((h) => {
//       const t = (h.textContent || "").trim().toUpperCase();
//       return t.includes("TENTANG PT. WAE MANDIRI KARYA") || t.includes("TENTANG KAMI");
//     });

//     if (tentangs) {
//       const section = tentangs.closest("section") || tentangs.parentElement;
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth", block: "start" });
//       } else {
//         tentangs.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     } else {
//       // fallback: cari route/path atau id spesifik
//       const byId = document.getElementById("tentangkami") || document.getElementById("TentangKami");
//       if (byId) byId.scrollIntoView({ behavior: "smooth", block: "start" });
//     }

//     // beri jeda kecil agar DOM/animasi selesai, lalu coba klik CTA kontak
//     setTimeout(() => {
//       // Prioritas: mailto link, lalu anchor dengan teks 'Kontak' atau tombol yang tampak seperti kontak
//       const mailto = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href^='mailto:']"))[0];
//       if (mailto) {
//         mailto.click();
//         return;
//       }

//       // cari elemen dengan teks 'Kontak Kami' atau 'Kontak' (case-insensitive)
//       const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a, button, [role='button']"));
//       const contactEl = anchors.find((el) => /kontak kami|kontak|contact us|contact/i.test((el.textContent || "").trim().toLowerCase()));
//       if (contactEl) {
//         // jika anchor, klik; jika button/element lain, dispatch klik
//         (contactEl as HTMLElement).click();
//         return;
//       }

//       // fallback ringan: jika ada link ke /kontak, klik
//       const linkToKontak = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).find((a) =>
//         /\/kontak|kontak/i.test(a.getAttribute("href") || "")
//       );
//       if (linkToKontak) linkToKontak.click();
//     }, 350);
//   } catch (err) {
//     // jangan lempar error ke UI — hanya log
//     // console.warn("gotoTentangKamiAndTriggerContact:", err);
//   }
// }

// /* Utility: normalisasi href/identifier agar tidak men-trigger navigation ke route */
// function normalizeHrefForAnchor(h?: string) {
//   if (!h) return "#produk";
//   const s = String(h).trim();
//   // jika sudah berisi #, gunakan apa adanya
//   if (s.startsWith("#")) return s;
//   // jika user menulis "produk" atau "tentang" (tanpa #), ubah ke id anchor
//   if (/^produk$/i.test(s)) return "#produk";
//   if (/^tentang$/i.test(s) || /^tentangkami$/i.test(s)) return "#tentangkami";
//   // jika path absolute (startsWith /) treat as external route — return as-is
//   if (s.startsWith("/")) return s;
//   // jika http(s) => external
//   if (/^https?:\/\//i.test(s)) return s;
//   // default fallback jadi hash
//   return s.includes(".") ? s : `#${s}`;
// }

// /* Helper untuk melakukan scroll ke id (dipanggil ketika klik anchor internal).
//    Ini mencegah navigasi ke route dan tidak mengubah history. */
// function scrollToHash(href: string) {
//   try {
//     if (!href) return;
//     // if full url or path -> just open (prevent if we don't want)
//     if (/^https?:\/\//i.test(href) || href.startsWith("/")) {
//       // open external/path normally
//       window.location.href = href;
//       return;
//     }
//     const id = href.replace(/^#/, "");
//     if (!id) return;
//     const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//     } else {
//       // fallback: top of page
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   } catch (e) {
//     // console.warn("scrollToHash:", e);
//   }
// }

// export default function BannerSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
//     {
//       loop: true,
//       slides: { perView: 1 },
//       slideChanged(slider) {
//         setCurrentSlide(slider.track.details.rel);
//       },
//     },
//     [autoplay]
//   );

//   const slides = [
//     {
//       src: "/banners/50.png",
//       title: "SparePart Premium Akhir Tahun",
//       desc: "Dapatkan sparepart premium dalam waktu terbatas.",
//       cta: "Hubungi Kami",
//       action: "produk",
//     },
//     {
//       src: "/banners/48.jpg",
//       title: "Premium Sparepart",
//       desc: "Solusi sparepart terlengkap & terpercaya.",
//       // cta: "Selengkapnya",
//             cta: "Hubungi Kami",
//       action: "produk",
//     },
//     {
//       src: "/banners/37.jpg",
//       title: "Industrial Grade Supply",
//       desc: "Gunakan Industrial Grade Supply yang terjamin kuat dan tahan waktu.",
//       cta: "Hubungi Kami",
//       action: "produk",
//     },
//     {
//       src: "/banners/38.jpg",
//       title: "Engineering Material",
//       desc: "Kami percayai bahwa kekuatan sejati lahir dari Precision Engineering.",
//       cta: "Safe & Convenient",
//       action: "anchor",
//       href: "#produk",
//     },
//     {
//       src: "/banners/39.jpg",
//       title: "Custom Fabrication Service",
//       desc: "Setiap detail kami hasilkan melalui Engineering Works presisi tinggi.",
//       cta: "Lihat Selengkapnya",
//       action: "anchor",
//       href: "#produk",
//     },
//     {
//       src: "/banners/40.jpg",
//       title: "Manufacturing Excellence",
//       desc: "Kami wujudkan Manufacturing Excellence di setiap proyek.",
//       cta: "Tentang Kami",
//       action: "anchor",
//       href: "tentang",
//     },
//     {
//       src: "/banners/41.jpg",
//       title: "Smart Material & Fabrication",
//       desc: "Bangunan kuat berawal dari Smart Material yang tepat & Fabrikasi pintar untuk dunia industri yang tak berhenti bergerak.",
//       cta: "Pelajari Lebih Lanjut",
//       action: "anchor",
//       href: "#produk",
//     },
//     {
//       src: "/banners/42.jpg",
//       title: "Industrial Workshop Solution",
//       desc: "Hadir sebagai Industrial Workshop Solution terpercaya di setiap pengadaan Anda.",
//       cta: "Tentang Kami",
//       action: "tentang",
//     },
//     {
//       src: "/banners/43.jpg",
//       title: "Engineering Works",
//       desc: "Setiap detail kami hasilkan melalui Engineering Works presisi tinggi.",
//       cta: "Lihat Koleksi",
//       action: "anchor",
//       href: "#produk",
//     },
//     {
//       src: "/banners/44.jpg",
//       title: "Material Solution",
//       desc: "Kami menghadirkan Precision Material demi ketahanan dan presisi produk Anda.",
//       // cta: "Lihat Selengkapnya",
//             cta: "Hubungi Kami",
//       action: "produk",
//     },
//     // contoh slide yang khusus mengarah ke TentangKami (memanggil helper)
//     {
//       src: "/banners/partner.png",
//       title: "Kenali Kami Lebih Dekat",
//       desc: "Tentang PT. Wae Mandiri Karya — visi, misi, dan nilai kami.",
//       cta: "Tentang Kami",
//       action: "tentang",
//     },
//   ];

//   return (
//     <div className={styles.sliderWrapper}>
//       <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
//         {slides.map((item, i) => (
//           <div
//             className={`keen-slider__slide ${styles.zoomSlide}`}
//             key={i}
//             style={{ animation: "fadeSlide 1s ease" }}
//           >
//             <img src={item.src} alt={item.title} />
//             <div className={styles.overlay}>
//               <h2>{item.title}</h2>
//               <p>{item.desc}</p>

//               {/* action-based CTA (produk tetap panggil gotoProduk..., tentang panggil gotoTentang..., anchor -> scroll lokal) */}
//               {/* {item.action === "produk" ? (
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     gotoProdukAndTriggerContact();
//                   }}
//                   className={styles.ctaBtn}
//                 >
//                   {item.cta}
//                 </button> */}
//                 {/(hubungi|contact)/i.test(item.cta) ? (
//                  <button
//                    onClick={(e) => {
//                      e.preventDefault();
//                      gotoProdukAndTriggerContact();
//                    }}
//                    className={styles.ctaBtn}
//                  >
//                    {item.cta}
//                  </button>
//               ) : item.action === "tentang" ? (
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     gotoTentangKamiAndTriggerContact();
//                   }}
//                   className={styles.ctaBtn}
//                 >
//                   {item.cta}
//                 </button>
//               ) : item.action === "external" && (item.href || (item as any).url) ? (
//                 <a href={item.href || (item as any).url} target="_blank" rel="noopener noreferrer">
//                   {item.cta}
//                 </a>
//               ) : (
//                 // anchor internal: preventDefault + local scroll (tidak menavigasi router)
//                 <a
//                   href={normalizeHrefForAnchor(item.href)}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     const normalized = normalizeHrefForAnchor(item.href);
//                     scrollToHash(normalized);
//                   }}
//                 >
//                   {item.cta}
//                 </a>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         className={styles.prev}
//         onClick={() => instanceRef.current?.prev()}
//       >
//         <ChevronLeftCircle size={32} />
//       </button>
//       <button
//         className={styles.next}
//         onClick={() => instanceRef.current?.next()}
//       >
//         <ChevronRightCircle size={32} />
//       </button>

//       <div className={styles.dots}>
//         {[...Array(slides.length)].map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => instanceRef.current?.moveToIdx(idx)}
//             className={currentSlide === idx ? styles.activeDot : ""}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }






"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { KeenSliderPlugin } from "keen-slider/react";
import styles from "../styles/BannerSlider.module.scss";
import React, { useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import Link from "next/link";


const autoplay: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 3500);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

// function gotoProdukAndTriggerContact() {
//   try {
//     // cari header H3 yang ada pada ProdukPage2
//     const headers = Array.from(document.querySelectorAll("h3"));
//     const produkHeader = headers.find((h) => h.textContent && h.textContent.trim().toUpperCase() === "KAMI MENAWARKAN");

//     if (produkHeader) {
//       const section = produkHeader.closest("section") || produkHeader.parentElement;
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth", block: "start" });
//       } else {
//         // fallback: scroll ke header langsung
//         produkHeader.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     } else {
//       // fallback: scroll to top of element with id 'produk' if any
//       const byId = document.getElementById("produk");
//       if (byId) byId.scrollIntoView({ behavior: "smooth", block: "start" });
//     }

//     // beri jeda kecil supaya ProdukPage2 punya waktu render (produk biasanya sudah ada)
//     setTimeout(() => {
//       // cari link Contact pertama (class .link dipakai di ProdukPage2)
//       const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a.link, a"));
//       const contactAnchor = anchors.find((a) => /contact/i.test((a.textContent || "") + (a.getAttribute("href") || "")));
//       if (contactAnchor) {
//         // trigger klik (stopPropagation tidak diperlukan di sini)
//         contactAnchor.click();
//       }
//     }, 350); // 350ms - kecil dan biasanya cukup
//   } catch (e) {
//     // jika ada error, jangan crash aplikasi — hanya log
//     // console.warn("gotoProdukAndTriggerContact:", e);
//   }
// }

function gotoProdukAndTriggerContact() {
  try {
    // prioritas: cari elemen dengan id 'produk'
    const targetById = document.getElementById("layanankami");
    let target = targetById || null;

    // jika tidak ada id, fallback ke header H3 "KAMI MENAWARKAN"
    if (!target) {
      const headers = Array.from(document.querySelectorAll("h3"));
      const produkHeader = headers.find((h) => h.textContent && h.textContent.trim().toUpperCase() === "KAMI MENAWARKAN");
      if (produkHeader) {
        target = produkHeader.closest("section") || produkHeader.parentElement || produkHeader;
      }
    }

    if (target) {
      // scroll ke target
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // beri efek highlight sementara supaya pengguna langsung sadar lokasinya
      try {
        const prevOutline = target.style.outline;
        target.style.transition = "box-shadow 300ms ease, outline 300ms ease";
        target.style.outline = "4px solid rgba(59,130,246,0.18)"; // soft blue highlight
        // kembalikan setelah 2.5s
        setTimeout(() => {
          target.style.outline = prevOutline || "";
        }, 2500);
      } catch (err) {
        // ignore if styling fails
      }
    } else {
      // jika tidak ditemukan sama sekali, scroll ke top halaman sebagai fallback
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // jangan klik apapun di sini — biarkan user atau flow internal yang buka Contact
  } catch (e) {
    // jangan crash app
    // console.warn("gotoProdukAndTriggerContact:", e);
  }
}



/**
 * Helper: scroll ke halaman TentangKami dan (opsional) klik tombol "Kontak Kami"
 * - Mencari H1/elemen yang mengandung teks 'Tentang PT. Wae Mandiri Karya' atau 'Tentang Kami'
 * - Scroll ke sana; lalu coba klik anchor yang mengandung 'mailto:' atau teks 'Kontak Kami'
 */
function gotoTentangKamiAndTriggerContact() {
  try {
    // cari heading yang relevan (cocokkan beberapa variasi teks)
    // const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
        const headings = Array.from(document.querySelectorAll("h2"));
    const tentangs = headings.find((h) => {
      const t = (h.textContent || "").trim().toUpperCase();
      return t.includes("TENTANG PT. WAE MANDIRI KARYA") || t.includes("TENTANG KAMI");
    });

    if (tentangs) {
      const section = tentangs.closest("section") || tentangs.parentElement;
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        tentangs.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // fallback: cari route/path atau id spesifik
      const byId = document.getElementById("tentangkami") || document.getElementById("TentangKami");
      if (byId) byId.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // beri jeda kecil agar DOM/animasi selesai, lalu coba klik CTA kontak
    setTimeout(() => {
      // Prioritas: mailto link, lalu anchor dengan teks 'Kontak' atau tombol yang tampak seperti kontak
      const mailto = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href^='mailto:']"))[0];
      if (mailto) {
        mailto.click();
        return;
      }

      // cari elemen dengan teks 'Kontak Kami' atau 'Kontak' (case-insensitive)
      const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a, button, [role='button']"));
      const contactEl = anchors.find((el) => /kontak kami|kontak|contact us|contact/i.test((el.textContent || "").trim().toLowerCase()));
      if (contactEl) {
        // jika anchor, klik; jika button/element lain, dispatch klik
        (contactEl as HTMLElement).click();
        return;
      }

      // fallback ringan: jika ada link ke /kontak, klik
      const linkToKontak = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).find((a) =>
        /\/kontak|kontak/i.test(a.getAttribute("href") || "")
      );
      if (linkToKontak) linkToKontak.click();
    }, 350);
  } catch (err) {
    // jangan lempar error ke UI — hanya log
    // console.warn("gotoTentangKamiAndTriggerContact:", err);
  }
}

/* Utility: normalisasi href/identifier agar tidak men-trigger navigation ke route */
function normalizeHrefForAnchor(h?: string) {
  if (!h) return "#produk";
  const s = String(h).trim();
  // jika sudah berisi #, gunakan apa adanya
  if (s.startsWith("#")) return s;
  // jika user menulis "produk" atau "tentang" (tanpa #), ubah ke id anchor
  if (/^produk$/i.test(s)) return "#produk";
  if (/^tentang$/i.test(s) || /^tentangkami$/i.test(s)) return "#tentangkami";
  // jika path absolute (startsWith /) treat as external route — return as-is
  if (s.startsWith("/")) return s;
  // jika http(s) => external
  if (/^https?:\/\//i.test(s)) return s;
  // default fallback jadi hash
  return s.includes(".") ? s : `#${s}`;
}

/* Helper untuk melakukan scroll ke id (dipanggil ketika klik anchor internal).
   Ini mencegah navigasi ke route dan tidak mengubah history. */
function scrollToHash(href: string) {
  try {
    if (!href) return;
    // if full url or path -> just open (prevent if we don't want)
    if (/^https?:\/\//i.test(href) || href.startsWith("/")) {
      // open external/path normally
      window.location.href = href;
      return;
    }
    const id = href.replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback: top of page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (e) {
    // console.warn("scrollToHash:", e);
  }
}

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [autoplay]
  );

  const slides = [
    {
      src: "/banners/50.png",
      title: "SparePart Premium Akhir Tahun",
      desc: "Dapatkan sparepart premium dalam waktu terbatas.",
      cta: "Hubungi Kami",
      action: "produk",
    },
    {
      src: "/banners/48.jpg",
      title: "Premium Sparepart",
      desc: "Solusi sparepart terlengkap & terpercaya.",
      // cta: "Selengkapnya",
            cta: "Hubungi Kami",
      action: "produk",
    },
    {
      src: "/banners/37.jpg",
      title: "Industrial Grade Supply",
      desc: "Gunakan Industrial Grade Supply yang terjamin kuat dan tahan waktu.",
      cta: "Hubungi Kami",
      action: "produk",
    },
    {
      src: "/banners/38.jpg",
      title: "Engineering Material",
      desc: "Kami percayai bahwa kekuatan sejati lahir dari Precision Engineering.",
      cta: "Seputar Layanan",
      action: "anchor",
      href: "#produk",
    },
    {
      src: "/banners/39.jpg",
      title: "Custom Fabrication Service",
      desc: "Setiap detail kami hasilkan melalui Engineering Works presisi tinggi.",
      cta: "Lihat Selengkapnya",
      action: "anchor",
      href: "#produk",
    },
    {
      src: "/banners/40.jpg",
      title: "Manufacturing Excellence",
      desc: "Kami wujudkan Manufacturing Excellence di setiap proyek.",
      cta: "Tentang Kami",
      action: "tentang",
    },
    {
      src: "/banners/41.jpg",
      title: "Smart Material & Fabrication",
      desc: "Bangunan kuat berawal dari Smart Material yang tepat & Fabrikasi pintar untuk dunia industri yang tak berhenti bergerak.",
      cta: "Pelajari Lebih Lanjut",
      action: "anchor",
      href: "#produk",
    },
    {
      src: "/banners/42.jpg",
      title: "Industrial Workshop Solution",
      desc: "Hadir sebagai Industrial Workshop Solution terpercaya di setiap pengadaan Anda.",
      cta: "Tentang Kami",
      action: "tentang",
    },
    {
      src: "/banners/43.jpg",
      title: "Engineering Works",
      desc: "Setiap detail kami hasilkan melalui Engineering Works presisi tinggi.",
      cta: "Lihat Koleksi",
      action: "anchor",
      href: "#produk",
    },
    {
      src: "/banners/44.jpg",
      title: "Material Solution",
      desc: "Kami menghadirkan Precision Material demi ketahanan dan presisi produk Anda.",
      // cta: "Lihat Selengkapnya",
            cta: "Hubungi Kami",
      action: "produk",
    },
    // contoh slide yang khusus mengarah ke TentangKami (memanggil helper)
    {
      src: "/banners/partner.png",
      title: "Kenali Kami Lebih Dekat",
      desc: "Tentang PT. Wae Mandiri Karya — visi, misi, dan nilai kami.",
      cta: "Tentang Kami",
      // action: "tentang",
      action:"route",
            href: "/TentangKami",

    },
  ];

  return (
    <div className={styles.sliderWrapper}>
      <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
        {slides.map((item, i) => (
          <div
            className={`keen-slider__slide ${styles.zoomSlide}`}
            key={i}
            style={{ animation: "fadeSlide 1s ease" }}
          >
            <img src={item.src} alt={item.title} />
            <div className={styles.overlay}>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
                {/(hubungi|contact)/i.test(item.cta) ? (
                 <button
                   onClick={(e) => {
                     e.preventDefault();
                     gotoProdukAndTriggerContact();
                   }}
                   className={styles.ctaBtn}
                 >
                   {item.cta}
                 </button>
              ) : item.action === "tentang" ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    gotoTentangKamiAndTriggerContact();
                  }}
                  className={styles.ctaBtn}
                >
                  {item.cta}
                </button>
              ) : item.action === "external" && (item.href || (item as any).url) ? (
                <a href={item.href || (item as any).url} target="_blank" rel="noopener noreferrer">
                  {item.cta}
                </a>
              ): item.action === "route" && item.href ? (
  // client-side navigation via next/link (no full reload, no 404 if route exists)
  <Link href={item.href} className={styles.ctaBtn}>
    {item.cta}
  </Link>
) : (
                // anchor internal: preventDefault + local scroll (tidak menavigasi router)
                <a
                  href={normalizeHrefForAnchor(item.href)}
                  onClick={(e) => {
                    e.preventDefault();
                    const normalized = normalizeHrefForAnchor(item.href);
                    scrollToHash(normalized);
                  }}
                >
                  {item.cta}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className={styles.prev}
        onClick={() => instanceRef.current?.prev()}
      >
        <ChevronLeftCircle size={32} />
      </button>
      <button
        className={styles.next}
        onClick={() => instanceRef.current?.next()}
      >
        <ChevronRightCircle size={32} />
      </button>

      <div className={styles.dots}>
        {[...Array(slides.length)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={currentSlide === idx ? styles.activeDot : ""}
          />
        ))}
      </div>
    </div>
  );
}

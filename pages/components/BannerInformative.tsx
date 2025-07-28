// "use client";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
// import { KeenSliderPlugin } from "keen-slider/react";
// import styles from "../styles/BannerInformative.module.scss";
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

// export default function BannerInformative() {
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
//     src: "/banners/promo11.png",
//     title: "Mengapa Digital Learning Semakin Penting?",
//     desc: "Pelajari bagaimana teknologi edukasi bisa meningkatkan hasil belajar hingga 50%.",
//     cta: "Temukan Jawabannya",
//   },
//   {
//     src: "/banners/promo12.png",
//     title: "Kelas Canggih, Hasil Lebih Baik?",
//     desc: "Apa yang terjadi jika ruang kelas dipenuhi teknologi AI dan interaktif?",
//     cta: "Lihat Fitur SmartClass",
//   },
//   {
//     src: "/banners/promo13.png",
//     title: "Ancaman Nyata, Perlindungan Nyata.",
//     desc: "Tahukah kamu, 87% kasus kejahatan bisa dicegah dengan sistem keamanan aktif?",
//     cta: "Lihat Solusinya",
//   },
//   {
//     src: "/banners/promo14.png",
//     title: "Tanpa Sentuh, Tetap Aman.",
//     desc: "Kenapa teknologi touchless jadi standar baru di kantor modern?",
//     cta: "Cari Tahu Sekarang",
//   },
//   {
//     src: "/banners/promo15.png",
//     title: "Apa Rahasia Presentasi yang Mengesankan?",
//     desc: "Visual bukan hanya gambar—tapi cara menyampaikan ide secara powerful.",
//     cta: "Lihat Teknologinya",
//   },
//   {
//     src: "/banners/promo16.png",
//     title: "Bisakah Semua Sistem Keamanan Disatukan?",
//     desc: "Jawabannya: Bisa. Tapi hanya jika teknologinya saling terintegrasi.",
//     cta: "Buktikan Di Sini",
//   },
//   {
//     src: "/banners/promo17.png",
//     title: "Gate Otomatis = Hemat Waktu?",
//     desc: "Lihat bagaimana gate cerdas bisa mengatur ribuan pengguna per hari.",
//     cta: "Pelajari Lebih Lanjut",
//   },
//   {
//     src: "/banners/promo19.png",
//     title: "Apakah CCTV Anda Sudah Cerdas?",
//     desc: "Kenali teknologi CCTV yang bisa mendeteksi gerakan, wajah, hingga suhu.",
//     cta: "Lihat Sistemnya",
//   },
//   {
//     src: "/banners/promo20.png",
//     title: "Furnitur Biasa vs. Ergonomis?",
//     desc: "Kursi dan meja bisa menentukan produktivitas. Sudahkah kantor Anda siap?",
//     cta: "Lihat Koleksi Kami",
//   },
//   {
//     src: "/banners/promo21.png",
//     title: "Berapa Hematnya Pakai Panel Surya?",
//     desc: "Energi bersih bisa hemat jutaan per bulan. Tapi bagaimana caranya?",
//     cta: "Lihat Detailnya",
//   },
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
// import { motion } from "framer-motion";
// import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
// import React, { useState } from "react";
// import styles from "../styles/BannerInformative.module.scss";

// const autoplay: KeenSliderPlugin = (slider) => {
//   let timeout: ReturnType<typeof setTimeout>;
//   let mouseOver = false;

//   const clearNextTimeout = () => clearTimeout(timeout);
//   const nextTimeout = () => {
//     clearTimeout(timeout);
//     if (!mouseOver) {
//       timeout = setTimeout(() => slider.next(), 3500);
//     }
//   };

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

// export default function BannerInformative() {
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

//   const bannerItems = [
//     {
//       src: "/banners/promo11.png",
//       title: "Mengapa Digital Learning Semakin Penting?",
//       desc: "Pelajari bagaimana teknologi edukasi bisa meningkatkan hasil belajar hingga 50%.",
//       cta: "Temukan Jawabannya",
//     },
//     {
//       src: "/banners/promo12.png",
//       title: "Kelas Canggih, Hasil Lebih Baik?",
//       desc: "Apa yang terjadi jika ruang kelas dipenuhi teknologi AI dan interaktif?",
//       cta: "Lihat Fitur SmartClass",
//     },
//     {
//       src: "/banners/promo13.png",
//       title: "Ancaman Nyata, Perlindungan Nyata.",
//       desc: "Tahukah kamu, 87% kasus kejahatan bisa dicegah dengan sistem keamanan aktif?",
//       cta: "Lihat Solusinya",
//     },
//     {
//       src: "/banners/promo14.png",
//       title: "Tanpa Sentuh, Tetap Aman.",
//       desc: "Kenapa teknologi touchless jadi standar baru di kantor modern?",
//       cta: "Cari Tahu Sekarang",
//     },
//     {
//       src: "/banners/promo15.png",
//       title: "Apa Rahasia Presentasi yang Mengesankan?",
//       desc: "Visual bukan hanya gambar—tapi cara menyampaikan ide secara powerful.",
//       cta: "Lihat Teknologinya",
//     },
//     {
//       src: "/banners/promo16.png",
//       title: "Bisakah Semua Sistem Keamanan Disatukan?",
//       desc: "Jawabannya: Bisa. Tapi hanya jika teknologinya saling terintegrasi.",
//       cta: "Buktikan Di Sini",
//     },
//     {
//       src: "/banners/promo17.png",
//       title: "Gate Otomatis = Hemat Waktu?",
//       desc: "Lihat bagaimana gate cerdas bisa mengatur ribuan pengguna per hari.",
//       cta: "Pelajari Lebih Lanjut",
//     },
//     {
//       src: "/banners/promo19.png",
//       title: "Apakah CCTV Anda Sudah Cerdas?",
//       desc: "Kenali teknologi CCTV yang bisa mendeteksi gerakan, wajah, hingga suhu.",
//       cta: "Lihat Sistemnya",
//     },
//     {
//       src: "/banners/promo20.png",
//       title: "Furnitur Biasa vs. Ergonomis?",
//       desc: "Kursi dan meja bisa menentukan produktivitas. Sudahkah kantor Anda siap?",
//       cta: "Lihat Koleksi Kami",
//     },
//     {
//       src: "/banners/promo21.png",
//       title: "Berapa Hematnya Pakai Panel Surya?",
//       desc: "Energi bersih bisa hemat jutaan per bulan. Tapi bagaimana caranya?",
//       cta: "Lihat Detailnya",
//     },
//   ];

//   return (
//     <div className={styles.sliderWrapper}>
//       <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
//         {bannerItems.map((item, i) => {
//           const isEven = i % 2 === 0;
//           return (
//             // <motion.div
//             //   className={`keen-slider__slide ${styles.zoomSlide}`}
//             //   key={i}
//             //   initial={{ opacity: 0, x: isEven ? -100 : 100 }}
//             //   animate={{ opacity: 1, x: 0 }}
//             //   transition={{ duration: 0.8, ease: "easeOut" }}
//             // >
//             //   <div className={styles.dualContent}>
//             //     <img src={item.src} alt={item.title} className={styles.imageHalf} />
//             //     <div className={styles.overlayHalf}>
//             //       <h2>{item.title}</h2>
//             //       <p>{item.desc}</p>
//             //       <a href="#produk">{item.cta}</a>
//             //     </div>
//             //   </div>
//             // </motion.div>
//             <motion.div
//   key={i}
//   className={`keen-slider__slide ${styles.splitSlide}`}
//   initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.6, ease: "easeOut" }}
// >
//   <div className={styles.splitContainer}>
//     Gambar - kiri
//     <motion.div
//       className={styles.imageSide}
//       initial={{ x: -100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.6, delay: 0.1 }}
//     >
//       <img src={item.src} alt={item.title} />
//     </motion.div>

//     Teks - kanan
//     <motion.div
//       className={styles.textSide}
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.6, delay: 0.3 }}
//     >
//       <h2>{item.title}</h2>
//       <p>{item.desc}</p>
//       <a href="#produk"> {item.cta} </a>
//     </motion.div>
//   </div>
// </motion.div>

//           );
//         })}
//       </div>

//       <button className={styles.prev} onClick={() => instanceRef.current?.prev()}>
//         <ChevronLeftCircle size={32} />
//       </button>
//       <button className={styles.next} onClick={() => instanceRef.current?.next()}>
//         <ChevronRightCircle size={32} />
//       </button>

//       <div className={styles.dots}>
//         {bannerItems.map((_, idx) => (
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
import { motion } from "framer-motion";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import React, { useState } from "react";
import styles from "../styles/BannerInformative.module.scss";

const autoplay: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  const clearNextTimeout = () => clearTimeout(timeout);
  const nextTimeout = () => {
    clearTimeout(timeout);
    if (!mouseOver) {
      timeout = setTimeout(() => slider.next(), 3500);
    }
  };

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

export default function BannerInformative() {
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

  const bannerItems = [
    {
      // src: "/banners/promo11.png",
            src: "/banners/pm16.png",
      title: "Mengapa Digital Learning Semakin Penting?",
      desc: "Pelajari bagaimana teknologi edukasi bisa meningkatkan hasil belajar hingga 50%.",
      cta: "Temukan Jawabannya",
    },
    {
      // src: "/banners/promo12.png",
            src: "/banners/pm2.png",
      title: "Kelas Canggih, Hasil Lebih Baik?",
      desc: "Apa yang terjadi jika ruang kelas dipenuhi teknologi AI dan interaktif?",
      cta: "Lihat Fitur SmartClass",
    },
    {
      // src: "/banners/promo13.png",
            src: "/banners/pm3.png",
      title: "Ancaman Nyata, Perlindungan Nyata.",
      desc: "Tahukah kamu, 87% kasus kejahatan bisa dicegah dengan sistem keamanan aktif?",
      cta: "Lihat Solusinya",
    },
    {
      // src: "/banners/promo14.png",
            src: "/banners/pm4.png",
      title: "Tanpa Sentuh, Tetap Aman.",
      desc: "Kenapa teknologi touchless jadi standar baru di kantor modern?",
      cta: "Cari Tahu Sekarang",
    },
    {
      // src: "/banners/promo15.png",
            src: "/banners/pm6.png",
      title: "Apa Rahasia Presentasi yang Mengesankan?",
      desc: "Visual bukan hanya gambar—tapi cara menyampaikan ide secara powerful.",
      cta: "Lihat Teknologinya",
    },
    {
      // src: "/banners/promo16.png",
            src: "/banners/pm9.png",
      title: "Bisakah Semua Sistem Keamanan Disatukan?",
      desc: "Jawabannya: Bisa. Tapi hanya jika teknologinya saling terintegrasi.",
      cta: "Buktikan Di Sini",
    },
    {
      // src: "/banners/promo17.png",
            src: "/banners/pm12.png",
      title: "Gate Otomatis = Hemat Waktu?",
      desc: "Lihat bagaimana gate cerdas bisa mengatur ribuan pengguna per hari.",
      cta: "Pelajari Lebih Lanjut",
    },
    {
      // src: "/banners/promo19.png",
            src: "/banners/pm13.png",
      title: "Apakah CCTV Anda Sudah Cerdas?",
      desc: "Kenali teknologi CCTV yang bisa mendeteksi gerakan, wajah, hingga suhu.",
      cta: "Lihat Sistemnya",
    },
    {
      // src: "/banners/promo20.png",
            src: "/banners/pm14.png",
      title: "Furnitur Biasa vs. Ergonomis?",
      desc: "Kursi dan meja bisa menentukan produktivitas. Sudahkah kantor Anda siap?",
      cta: "Lihat Koleksi Kami",
    },
    {
      // src: "/banners/promo21.png",
            src: "/banners/pm15.png",
      title: "Berapa Hematnya Pakai Panel Surya?",
      desc: "Energi bersih bisa hemat jutaan per bulan. Tapi bagaimana caranya?",
      cta: "Lihat Detailnya",
    },
  ];

  return (
    <div className={styles.sliderWrapper}>
      <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
        {bannerItems.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className={`keen-slider__slide ${styles.slide}`}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className={styles.slideContent}>
                {isEven && (
                  <div className={styles.imageWrapper}>
                    <img src={item.src} alt={item.title} className={styles.image} />
                  </div>
                )}
                <div className={styles.textContent}>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <a href="#produk">{item.cta}</a>
                </div>
                {!isEven && (
                  <div className={styles.imageWrapper}>
                    <img src={item.src} alt={item.title} className={styles.image} />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className={styles.prev} onClick={() => instanceRef.current?.prev()}>
        <ChevronLeftCircle size={32} />
      </button>
      <button className={styles.next} onClick={() => instanceRef.current?.next()}>
        <ChevronRightCircle size={32} />
      </button>

      <div className={styles.dots}>
        {bannerItems.map((_, idx) => (
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

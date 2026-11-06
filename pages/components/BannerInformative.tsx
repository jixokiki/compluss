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
//       // src: "/banners/promo11.png",
//             // src: "/banners/pm16.png",
//                         // src: "/banners/1.png",
//                                                 src: "/banners/15.jpg",
//       title: "Mengapa Perawatan Bangunan Semakin Penting?",
//       desc: "Apa yang terjadi jika bangunan tidak dirawat.",
//       cta: "Temukan Jawabannya",
//     },
//     {
//       // src: "/banners/promo12.png",
//             // src: "/banners/pm2.png",
//                         // src: "/banners/2.png",
//                                                                         src: "/banners/16.jpg",
//       title: "Bangunan Tua Bisa Menjadi Tahan Lama?",
//       desc: "Kenapa Bangunan Bisa Kokoh, Perawatan atau Materialnya?",
//       cta: "Lihat Fitur Perawatannya",
//     },
//     {
//       // src: "/banners/promo13.png",
//             // src: "/banners/pm3.png",
//                         // src: "/banners/3.png",
//                                                                         src: "/banners/17.jpg",
//       // title: "Ancaman Nyata, Perlindungan Nyata.",
//       title: "Fabrikasi Di Workshop, Pemasangan Cepat.",
//       // desc: "Tahukah kamu, 87% kasus kejahatan bisa dicegah dengan sistem keamanan aktif?",
//       desc:"Mengapa pre-fabrikasi pipa di luar lokasi dapat mengurangi waktu proyek hingga 50% di lapangan?",
//       cta: "Lihat Solusinya",
//     },
//     {
//       // src: "/banners/promo14.png",
//             // src: "/banners/pm4.png",
//                         // src: "/banners/4.png",
//                                                                         src: "/banners/18.jpg",
//       // title: "Tanpa Sentuh, Tetap Aman.",
//       title:"Apa Rahasia Instalasi Yang Awet?",
//       // desc: "Kenapa teknologi touchless jadi standar baru di kantor modern?",
//       desc:"Material bukan hanya besi—tapi kombinasi yang tepat untuk ketahanan korosi dan umur pakai yang panjang.",
//       cta: "Cari Tahu Sekarang",
//     },
//     {
//   src: "/banners/19.jpg",
//   title: "Kualitas Konstruksi Dimulai dari Ketelitian.",
//   desc: "Setiap sambungan, setiap detail—kami rancang dengan presisi tinggi untuk hasil sempurna.",
//   cta: "Lihat Detail Konstruksinya",
// },
// {
//   src: "/banners/20.jpg",
//   title: "Solusi Cepat, Tanpa Kompromi Kualitas.",
//   desc: "Efisiensi waktu bukan berarti menurunkan standar. Kami buktikan keduanya bisa berjalan bersama.",
//   cta: "Pelajari Metode Kami",
// },
// {
//   src: "/banners/21.jpg",
//   title: "Proyek Besar Dimulai dari Sistem yang Rapi.",
//   desc: "Manajemen fabrikasi dan instalasi yang tertata memastikan semua berjalan tanpa hambatan.",
//   cta: "Telusuri Proses Kami",
// },
// {
//   src: "/banners/22.jpg",
//   title: "Teknologi Modern, Hasil Maksimal.",
//   desc: "Dari workshop hingga site, kami gunakan teknologi mutakhir untuk hasil presisi dan tahan lama.",
//   cta: "Jelajahi Inovasi Kami",
// },
// {
//   src: "/banners/23.jpg",
//   title: "Tim Profesional, Standar Internasional.",
//   desc: "Bersama tenaga ahli bersertifikasi, kami pastikan setiap proyek sesuai standar global.",
//   cta: "Kenali Tim Kami",
// },
// {
//   src: "/banners/24.jpg",
//   title: "Dari Rencana ke Realita.",
//   desc: "Kami ubah blueprint menjadi struktur nyata yang kuat, efisien, dan siap pakai.",
//   cta: "Lihat Hasil Proyek Kami",
// },
// {
//   src: "/banners/25.jpg",
//   title: "Bangun Masa Depan, Bukan Sekadar Bangunan.",
//   desc: "Kami berfokus pada keberlanjutan—karena setiap proyek adalah investasi jangka panjang.",
//   cta: "Lihat Komitmen Kami",
// },
// {
//   src: "/banners/26.jpg",
//   title: "Kemitraan yang Tumbuh Bersama.",
//   desc: "Kami percaya kolaborasi kuat menciptakan hasil luar biasa untuk semua pihak.",
//   cta: "Mulai Kerja Sama Sekarang",
// },
// {
//   src: "/banners/27.jpg",
//   title: "Desain Hebat Butuh Eksekusi yang Tepat.",
//   desc: "Kami tidak hanya membangun—kami memastikan setiap desain diwujudkan dengan akurasi dan tanggung jawab.",
//   cta: "Lihat Cara Kami Bekerja",
// },
// {
//   src: "/banners/28.jpg",
//   title: "Efisiensi Bukan Pilihan, Tapi Keunggulan.",
//   desc: "Setiap proyek kami optimalkan dari sisi waktu, material, dan tenaga agar hasilnya maksimal tanpa pemborosan.",
//   cta: "Temukan Efisiensinya",
// },
// {
//   src: "/banners/47.jpg",
//   title: "Setiap Struktur Punya Cerita.",
//   desc: "Dari baja pertama yang dipotong hingga instalasi terakhir—semua adalah bagian dari komitmen kami pada kualitas.",
//   cta: "Baca Cerita Proyek Kami",
// },
// {
//   src: "/banners/49.jpg",
//   title: "Dari Workshop ke Lapangan, Tanpa Hambatan.",
//   desc: "Koordinasi antar tim kami memastikan setiap bagian terpasang sempurna dan tepat waktu.",
//   cta: "Lihat Alur Pengerjaannya",
// },

//     // {
//     //   // src: "/banners/promo15.png",
//     //         // src: "/banners/pm6.png",
//     //                     // src: "/banners/5.png",
//     //                                                                     src: "/banners/19.jpg",
//     //   title: "Apa Rahasia Kantor yang Mengesankan?",
//     //   desc: "Visual bukan hanya gambar—tapi cara menyampaikan ide secara powerful.",
//     //   cta: "Lihat Teknologinya",
//     // },
//     // {
//     //   // src: "/banners/promo16.png",
//     //         // src: "/banners/pm9.png",
//     //                                                         src: "/banners/20.jpg",
//     //   title: "Bisakah Semua Sistem Keamanan Disatukan?",
//     //   desc: "Jawabannya: Bisa. Tapi hanya jika teknologinya saling terintegrasi.",
//     //   cta: "Buktikan Di Sini",
//     // },
//     // {
//     //   // src: "/banners/promo17.png",
//     //         // src: "/banners/pm12.png",
//     //                                                         src: "/banners/21.jpg",
//     //   title: "Gate Otomatis = Hemat Waktu?",
//     //   desc: "Lihat bagaimana gate cerdas bisa mengatur ribuan pengguna per hari.",
//     //   cta: "Pelajari Lebih Lanjut",
//     // },
//     // {
//     //   // src: "/banners/promo19.png",
//     //         // src: "/banners/pm13.png",
//     //                                                         src: "/banners/22.jpg",
//     //   title: "Apakah CCTV Anda Sudah Cerdas?",
//     //   desc: "Kenali teknologi CCTV yang bisa mendeteksi gerakan, wajah, hingga suhu.",
//     //   cta: "Lihat Sistemnya",
//     // },
//     // {
//     //   // src: "/banners/promo20.png",
//     //         // src: "/banners/pm14.png",
//     //                                                         src: "/banners/23.jpg",
//     //   title: "Furnitur Biasa vs. Ergonomis?",
//     //   desc: "Kursi dan meja bisa menentukan produktivitas. Sudahkah kantor Anda siap?",
//     //   cta: "Lihat Koleksi Kami",
//     // },
//     // {
//     //   // src: "/banners/promo21.png",
//     //         // src: "/banners/pm15.png",
//     //                                                         src: "/banners/24.jpg",
//     //   title: "Berapa Hematnya Pakai Panel Surya?",
//     //   desc: "Energi bersih bisa hemat jutaan per bulan. Tapi bagaimana caranya?",
//     //   cta: "Lihat Detailnya",
//     // },
//   ];

//   return (
//     <div className={styles.sliderWrapper}>
//       <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
//         {bannerItems.map((item, i) => {
//           const isEven = i % 2 === 0;
//           return (
//             <motion.div
//               key={i}
//               className={`keen-slider__slide ${styles.slide}`}
//               initial={{ opacity: 0, x: isEven ? -50 : 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             >
//               <div className={styles.slideContent}>
//                 {isEven && (
//                   <div className={styles.imageWrapper}>
//                     <img src={item.src} alt={item.title} className={styles.image} />
//                   </div>
//                 )}
//                 <div className={styles.textContent}>
//                   <h2>{item.title}</h2>
//                   <p>{item.desc}</p>
//                   <a href="#produk">{item.cta}</a>
//                 </div>
//                 {!isEven && (
//                   <div className={styles.imageWrapper}>
//                     <img src={item.src} alt={item.title} className={styles.image} />
//                   </div>
//                 )}
//               </div>
//             </motion.div>
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

type BannerLink =
  | { type: "anchor"; value: string }
  | { type: "katalog"; value: number }
  | { type: "external"; value: string }
  | { type: "route"; value: string };

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

  const bannerItems: Array<{
    src: string;
    title: string;
    desc: string;
    cta: string;
    link?: BannerLink;
  }> = [
    {
      src: "/banners/15.jpg",
      title: "Mengapa Perawatan Bangunan Semakin Penting?",
      desc: "Apa yang terjadi jika bangunan tidak dirawat.",
      cta: "Temukan Jawabannya",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 1 } // <-- buka katalog id 15
    },
    {
      src: "/banners/16.jpg",
      title: "Bangunan Tua Bisa Menjadi Tahan Lama?",
      desc: "Kenapa Bangunan Bisa Kokoh, Perawatan atau Materialnya?",
      cta: "Lihat Fitur Perawatannya",
      // link: { type: "route", value: "/fitur/perawatan" },
      link: { type: "katalog", value: 9 } // <-- buka katalog id 15
    },
    {
      src: "/banners/17.jpg",
      title: "Fabrikasi Di Workshop, Pemasangan Cepat.",
      desc:"Mengapa pre-fabrikasi pipa di luar lokasi dapat mengurangi waktu proyek hingga 50% di lapangan?",
      cta: "Lihat Solusinya",
      link: { type: "katalog", value: 15 },
    },
    {
      src: "/banners/18.jpg",
      title:"Apa Rahasia Instalasi Yang Awet?",
      desc:"Material bukan hanya besi—tapi kombinasi yang tepat untuk ketahanan korosi dan umur pakai yang panjang.",
      cta: "Cari Tahu Sekarang",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 16 } // <-- buka katalog id 15
    },
    {
      src: "/banners/19.jpg",
      title: "Kualitas Konstruksi Dimulai dari Ketelitian.",
      desc: "Setiap sambungan, setiap detail—kami rancang dengan presisi tinggi untuk hasil sempurna.",
      cta: "Lihat Detail Konstruksinya",
      // link: { type: "external", value: "https://example.com/detail-konstruksi" }
      link: { type: "katalog", value: 1 } // <-- buka katalog id 15
    },
//     {
//   src: "/banners/19.jpg",
//   title: "Kualitas Konstruksi Dimulai dari Ketelitian.",
//   desc: "Setiap sambungan, setiap detail—kami rancang dengan presisi tinggi untuk hasil sempurna.",
//   cta: "Lihat Detail Konstruksinya",
//   link: { type: "katalog", value: 15 } // <-- buka katalog id 15
// },

    {
      src: "/banners/20.jpg",
      title: "Solusi Cepat, Tanpa Kompromi Kualitas.",
      desc: "Efisiensi waktu bukan berarti menurunkan standar. Kami buktikan keduanya bisa berjalan bersama.",
      cta: "Pelajari Metode Kami",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 9 } // <-- buka katalog id 15
    },
    {
      src: "/banners/21.jpg",
      title: "Proyek Besar Dimulai dari Sistem yang Rapi.",
      desc: "Manajemen fabrikasi dan instalasi yang tertata memastikan semua berjalan tanpa hambatan.",
      cta: "Telusuri Proses Kami",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 15 } // <-- buka katalog id 15
    },
    {
      src: "/banners/22.jpg",
      title: "Teknologi Modern, Hasil Maksimal.",
      desc: "Dari workshop hingga site, kami gunakan teknologi mutakhir untuk hasil presisi dan tahan lama.",
      cta: "Jelajahi Inovasi Kami",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 16 } // <-- buka katalog id 15
    },
    {
      src: "/banners/23.jpg",
      title: "Tim Profesional, Standar Internasional.",
      desc: "Bersama tenaga ahli bersertifikasi, kami pastikan setiap proyek sesuai standar global.",
      cta: "Kenali Tim Kami",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 16 } // <-- buka katalog id 15
    },
    {
      src: "/banners/24.jpg",
      title: "Dari Rencana ke Realita.",
      desc: "Kami ubah blueprint menjadi struktur nyata yang kuat, efisien, dan siap pakai.",
      cta: "Lihat Hasil Proyek Kami",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 1 } // <-- buka katalog id 15
    },
    {
      src: "/banners/25.jpg",
      title: "Bangun Masa Depan, Bukan Sekadar Bangunan.",
      desc: "Kami berfokus pada keberlanjutan—karena setiap proyek adalah investasi jangka panjang.",
      cta: "Lihat Komitmen Kami",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 9 } // <-- buka katalog id 15
    },
    {
      src: "/banners/26.jpg",
      title: "Kemitraan yang Tumbuh Bersama.",
      desc: "Kami percaya kolaborasi kuat menciptakan hasil luar biasa untuk semua pihak.",
      cta: "Mulai Kerja Sama Sekarang",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 15 } // <-- buka katalog id 15
    },
    {
      src: "/banners/27.jpg",
      title: "Desain Hebat Butuh Eksekusi yang Tepat.",
      desc: "Kami tidak hanya membangun—kami memastikan setiap desain diwujudkan dengan akurasi dan tanggung jawab.",
      cta: "Lihat Cara Kami Bekerja",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 16 } // <-- buka katalog id 15
    },
    {
      src: "/banners/28.jpg",
      title: "Efisiensi Bukan Pilihan, Tapi Keunggulan.",
      desc: "Setiap proyek kami optimalkan dari sisi waktu, material, dan tenaga agar hasilnya maksimal tanpa pemborosan.",
      cta: "Temukan Efisiensinya",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 1 } // <-- buka katalog id 15
    },
    {
      src: "/banners/47.jpg",
      title: "Setiap Struktur Punya Cerita.",
      desc: "Dari baja pertama yang dipotong hingga instalasi terakhir—semua adalah bagian dari komitmen kami pada kualitas.",
      cta: "Baca Cerita Proyek Kami",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 9 } // <-- buka katalog id 15
    },
    {
      src: "/banners/49.jpg",
      title: "Dari Workshop ke Lapangan, Tanpa Hambatan.",
      desc: "Koordinasi antar tim kami memastikan setiap bagian terpasang sempurna dan tepat waktu.",
      cta: "Lihat Alur Pengerjaannya",
      // link: { type: "anchor", value: "produk" },
      link: { type: "katalog", value: 15 } // <-- buka katalog id 15
    },
  ];

  const handleCTAClick = (link?: BannerLink, e?: React.MouseEvent) => {
    if (e) {
      // jika elemen adalah <a>, cegah default supaya handler JS berjalan
      e.preventDefault();
    }

    if (!link) {
      const el = document.getElementById("produk");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    switch (link.type) {
      case "anchor": {
        const el = document.getElementById(link.value);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        break;
      }
      case "katalog": {
        // dispatch event that KatalogScroll listens to
        window.dispatchEvent(
          new CustomEvent("open-katalog", { detail: { id: link.value } })
        );
        // try to scroll to katalog card if present
        const card = document.querySelector<HTMLElement>(`[data-katalog-id="${link.value}"]`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          const produk = document.getElementById("produk");
          if (produk) produk.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        break;
      }
      case "external": {
        window.open(link.value, "_blank", "noopener,noreferrer");
        break;
      }
      case "route": {
        // tanpa import router agar tidak ubah arsitektur; gunakan href fallback
        window.location.href = link.value;
        break;
      }
      default:
        break;
    }
  };

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
                  {/* Tetap gunakan <a> supaya style tidak berubah; tambahkan onClick */}
                  <a
                    href="#produk"
                    onClick={(e) => handleCTAClick(item.link, e)}
                    aria-label={item.cta}
                  >
                    {item.cta}
                  </a>
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

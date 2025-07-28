// "use client";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
// import styles from "../styles/BannerSlider.module.scss";

// export default function BannerSlider() {
//   const [sliderRef] = useKeenSlider<HTMLDivElement>({
//     loop: true,
//     slides: { perView: 1 },
//     autoplay: true,
//   });

//   return (
//     <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
//       <div className="keen-slider__slide">
//         <img src="/banners/promo1.jpg" alt="Promo 1" />
//       </div>
//       <div className="keen-slider__slide">
//         <img src="/banners/promo2.jpg" alt="Promo 2" />
//       </div>
//       <div className="keen-slider__slide">
//         <img src="/banners/promo3.jpg" alt="Promo 3" />
//       </div>
//     </div>
//   );
// }


// "use client";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
// import { KeenSliderPlugin } from "keen-slider/react";
// import styles from "../styles/BannerSlider.module.scss";
// import React from "react";

// // 🔧 Plugin autoplay (manual)
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
//     }, 3000);
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
//   const [sliderRef] = useKeenSlider<HTMLDivElement>(
//     {
//       loop: true,
//       slides: { perView: 1 },
//     },
//     [autoplay] // ✅ tambahkan plugin
//   );

//   return (
//     <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
//       <div className="keen-slider__slide">
//         <img src="/banners/promo1.jpg" alt="Promo 1" />
//       </div>
//       <div className="keen-slider__slide">
//         <img src="/banners/promo2.jpg" alt="Promo 2" />
//       </div>
//       <div className="keen-slider__slide">
//         <img src="/banners/promo3.jpg" alt="Promo 3" />
//       </div>
//     </div>
    
//   );
// }


//JANGAN DIHAPUS YAA IKII
// "use client";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
// import { KeenSliderPlugin } from "keen-slider/react";
// import styles from "../styles/BannerSlider.module.scss";
// import React from "react";

// // 🔁 Autoplay manual
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
//   const [sliderRef] = useKeenSlider<HTMLDivElement>(
//     {
//       loop: true,
//       slides: { perView: 1 },
//     },
//     [autoplay]
//   );

//   return (
//     <div className={styles.slider}>
//       {/* WRAPPER CLASS slider DI SINI */}
//       <div ref={sliderRef} className="keen-slider">
//         <div className="keen-slider__slide">
//           <img src="/banners/promo1.png" alt="Promo 1" />
//         </div>
//         <div className="keen-slider__slide">
//           <img src="/banners/promo2.png" alt="Promo 2" />
//         </div>
//         <div className="keen-slider__slide">
//           <img src="/banners/promo3.png" alt="Promo 3" />
//         </div>
//       </div>
//     </div>
//   );
// }



//JANGAN DIHAPUS YA IKI STYLING FIX KEDUA NI
// "use client";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
// import { KeenSliderPlugin } from "keen-slider/react";
// import styles from "../styles/BannerSlider.module.scss";
// import React from "react";

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
//   const [sliderRef] = useKeenSlider<HTMLDivElement>(
//     {
//       loop: true,
//       slides: { perView: 1 },
//       renderMode: "performance",
//     },
//     [autoplay]
//   );

//   return (
//     <div className={styles.slider}>
//       <div ref={sliderRef} className={`keen-slider ${styles.sliderContainer}`}>
//         <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo1.png" alt="Promo 1" />
//         </div>
//         <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo2.png" alt="Promo 2" />
//         </div>
//         <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo3.png" alt="Promo 3" />
//         </div>
//                 <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo4.png" alt="Promo 3" />
//         </div>
//                 <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo5.png" alt="Promo 3" />
//         </div>
//                 <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo6.png" alt="Promo 3" />
//         </div>
//                 <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo7.png" alt="Promo 3" />
//         </div>
//                 <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo8.png" alt="Promo 3" />
//         </div>
//                 <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo9.png" alt="Promo 3" />
//         </div>
//                 <div className={`keen-slider__slide ${styles.zoomTransition}`}>
//           <img src="/banners/promo10.png" alt="Promo 3" />
//         </div>
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
// import { ArrowLeft, ArrowRight } from "lucide-react";


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
//             src: "/banners/promo1.png",
//             title: "Diskon Akhir Tahun",
//             desc: "Dapatkan promo spesial hingga 50% untuk produk edukasi digital.",
//             cta: "Lihat Produk",
//           },
//           {
//             src: "/banners/promo2.png",
//             title: "Smart Classroom Package",
//             desc: "Solusi digitalisasi ruang kelas terlengkap & termurah.",
//             cta: "Selengkapnya",
//           },
//           {
//             src: "/banners/promo3.png",
//             title: "Sistem Keamanan Modern",
//             desc: "Pantau seluruh area sekolah dan kantor secara real-time.",
//             cta: "Hubungi Kami",
//           },
//           {
//             src: "/banners/promo4.png",
//             title: "Touchless Technology",
//             desc: "Teknologi sensor otomatis untuk keamanan & kenyamanan.",
//             cta: "Safe & Convenient",
//           },
//           {
//             src: "/banners/promo5.png",
//             title: "Tampilan Visual Berkualitas",
//             desc: "Solusi layar besar, proyektor & LED untuk kebutuhan presentasi.",
//             cta: "Lihat Selengkapnya",
//           },
//           {
//             src: "/banners/promo6.png",
//             title: "Sistem Keamanan Terintegrasi",
//             desc: "Turnstile, CCTV, dan akses kontrol dalam satu solusi.",
//             cta: "Cek Detail",
//           },
//           {
//             src: "/banners/promo7.png",
//             title: "Passenger Gate System",
//             desc: "Solusi akses gerbang penumpang modern dan efisien.",
//             cta: "Pelajari Lebih Lanjut",
//           },
//           {
//             src: "/banners/promo8.png",
//             title: "CCTV & NVR System",
//             desc: "Pengawasan menyeluruh dengan kualitas gambar tinggi.",
//             cta: "Shop Now",
//           },
//           {
//             src: "/banners/promo9.png",
//             title: "Produk Meubeler",
//             desc: "Meja, kursi, dan rak modern untuk kantor & ruang kelas.",
//             cta: "Lihat Koleksi",
//           },
//           {
//             src: "/banners/promo10.png",
//             title: "Energi Terbarukan - Panel Surya",
//             desc: "Gunakan energi bersih untuk lingkungan lebih hijau.",
//             cta: "Lihat Selengkapnya",
//           },
//         ].map((item, i) => (
//           <div className={`keen-slider__slide ${styles.zoomSlide}`} key={i}>
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
//         <ArrowLeft size={24} />
//       </button>
//       <button
//         className={styles.next}
//         onClick={() => instanceRef.current?.next()}
//       >
//         <ArrowRight size={24} />
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


"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { KeenSliderPlugin } from "keen-slider/react";
import styles from "../styles/BannerSlider.module.scss";
import React, { useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

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

  return (
    <div className={styles.sliderWrapper}>
      <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
        {[
          {
            // src: "/banners/promo1.png",
                        src: "/banners/pm1.png",
            title: "Diskon Akhir Tahun",
            desc: "Dapatkan promo spesial hingga 50% untuk produk edukasi digital.",
            cta: "Lihat Produk",
          },
          {
            src: "/banners/promo2.png",
            title: "Smart Classroom Package",
            desc: "Solusi digitalisasi ruang kelas terlengkap & termurah.",
            cta: "Selengkapnya",
          },
          {
            src: "/banners/promo3.png",
            title: "Sistem Keamanan Modern",
            desc: "Pantau seluruh area sekolah dan kantor secara real-time.",
            cta: "Hubungi Kami",
          },
          {
            src: "/banners/promo4.png",
            title: "Touchless Technology",
            desc: "Teknologi sensor otomatis untuk keamanan & kenyamanan.",
            cta: "Safe & Convenient",
          },
          {
            // src: "/banners/promo5.png",
                        src: "/banners/bod1compluss.jpg",
            title: "Tampilan Visual Berkualitas",
            desc: "Solusi layar besar, proyektor & LED untuk kebutuhan presentasi.",
            cta: "Lihat Selengkapnya",
          },
          {
            // src: "/banners/promo6.png",
                        src: "/banners/bod2compluss.jpg",
            title: "Sistem Keamanan Terintegrasi",
            desc: "Turnstile, CCTV, dan akses kontrol dalam satu solusi.",
            cta: "Cek Detail",
          },
          {
            src: "/banners/promo7.png",
            title: "Passenger Gate System",
            desc: "Solusi akses gerbang penumpang modern dan efisien.",
            cta: "Pelajari Lebih Lanjut",
          },
          {
            src: "/banners/promo8.png",
            title: "CCTV & NVR System",
            desc: "Pengawasan menyeluruh dengan kualitas gambar tinggi.",
            cta: "Shop Now",
          },
          {
            src: "/banners/promo9.png",
            title: "Produk Meubeler",
            desc: "Meja, kursi, dan rak modern untuk kantor & ruang kelas.",
            cta: "Lihat Koleksi",
          },
          {
            src: "/banners/promo10.png",
            title: "Energi Terbarukan - Panel Surya",
            desc: "Gunakan energi bersih untuk lingkungan lebih hijau.",
            cta: "Lihat Selengkapnya",
          },
        ].map((item, i) => (
          <div
            className={`keen-slider__slide ${styles.zoomSlide}`}
            key={i}
            style={{ animation: "fadeSlide 1s ease" }}
          >
            <img src={item.src} alt={item.title} />
            <div className={styles.overlay}>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <a href="#produk">{item.cta}</a>
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
        {[...Array(10)].map((_, idx) => (
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

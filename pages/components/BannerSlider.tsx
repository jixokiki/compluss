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


"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { KeenSliderPlugin } from "keen-slider/react";
import styles from "../styles/BannerSlider.module.scss";
import React from "react";

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
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
      renderMode: "performance",
    },
    [autoplay]
  );

  return (
    <div className={styles.slider}>
      <div ref={sliderRef} className={`keen-slider ${styles.sliderContainer}`}>
        <div className={`keen-slider__slide ${styles.zoomTransition}`}>
          <img src="/banners/promo1.png" alt="Promo 1" />
        </div>
        <div className={`keen-slider__slide ${styles.zoomTransition}`}>
          <img src="/banners/promo2.png" alt="Promo 2" />
        </div>
        <div className={`keen-slider__slide ${styles.zoomTransition}`}>
          <img src="/banners/promo3.png" alt="Promo 3" />
        </div>
      </div>
    </div>
  );
}

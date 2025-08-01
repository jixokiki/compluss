// // app/components/KatalogScroll.tsx
// "use client";

// import { motion } from "framer-motion";
// import styles from "../styles/KatalogScroll.module.scss";
// import Image from "next/image";
// import React from "react";

// const katalogList = [
//   {
//     id: 1,
//     gambar: "/katalog/magic-display.jpg",
//     judul: "Magic Interactive Display",
//   },
//   {
//     id: 2,
//     gambar: "/katalog/smart-classroom.jpg",
//     judul: "Smart Classroom",
//   },
//   {
//     id: 3,
//     gambar: "/katalog/security-system.jpg",
//     judul: "Integrated Security System",
//   },
//   {
//     id: 4,
//     gambar: "/katalog/passenger-gate.jpg",
//     judul: "Passenger Gate System",
//   },
//   {
//     id: 5,
//     gambar: "/katalog/cctv-nvr.jpg",
//     judul: "CCTV & NVR System",
//   },
// ];

// const fadeFrom = (direction: "left" | "right") => ({
//   hidden: {
//     opacity: 0,
//     x: direction === "left" ? -100 : 100,
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// });

// export default function KatalogScroll() {
//   return (
//     <section className={styles.sectionKatalog}>
//       <h2 className={styles.heading}>Katalog Produk Unggulan</h2>
//       <div className={styles.container}>
//         {katalogList.map((item, index) => (
//           <motion.div
//             key={item.id}
//             className={styles.katalogCard}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.4 }}
//             variants={fadeFrom(index % 2 === 0 ? "left" : "right")}
//           >
//             <Image
//               src={item.gambar}
//               alt={item.judul}
//               width={1200}
//               height={800}
//               className={styles.image}
//             />
//             <div className={styles.overlay}>{item.judul}</div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }




//JANGAN DIHAPUS YAA IKII
// // app/components/KatalogScroll.tsx
// "use client";

// import { motion } from "framer-motion";
// import styles from "../styles/KatalogScroll.module.scss";
// import Image from "next/image";
// import React from "react";

// const katalogList = [
//   {
//     id: 1,
//     gambar: "/katalog/magic-display.png",
//     judul: "Magic Interactive Display",
//   },
//   {
//     id: 2,
//     gambar: "/katalog/smart-classroom.png",
//     judul: "Smart Classroom",
//   },
//   {
//     id: 3,
//     gambar: "/katalog/security-system.png",
//     judul: "Integrated Security System",
//   },
//   {
//     id: 4,
//     gambar: "/katalog/passenger-gate.png",
//     judul: "Passenger Gate System",
//   },
//   {
//     id: 5,
//     gambar: "/katalog/cctv-nvr.png",
//     judul: "CCTV & NVR System",
//   },
// ];

// const fadeFrom = (direction: "left" | "right") => ({
//   hidden: {
//     opacity: 0,
//     x: direction === "left" ? -100 : 100,
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// });

// export default function KatalogScroll() {
//   return (
//     <section className={styles.sectionKatalog}>
//       <h2 className={styles.heading}>Katalog Produk Unggulan</h2>
//       <div className={styles.scrollWrapper}>
//         <div className={styles.container}>
//           {katalogList.map((item, index) => (
//             <motion.div
//               key={item.id}
//               className={styles.katalogCard}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.4 }}
//               variants={fadeFrom(index % 2 === 0 ? "left" : "right")}
//             >
//               <div className={styles.imageWrapper}>
//                 <Image
//                   src={item.gambar}
//                   alt={item.judul}
//                   width={1200}
//                   height={800}
//                   className={styles.image}
//                 />
//                 <div className={styles.overlay}>{item.judul}</div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// app/components/KatalogScroll.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import styles from "../styles/KatalogScroll.module.scss";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { V } from "framer-motion/dist/types.d-CtuPurYT";

const katalogList = [
  {
    id: 1,
    // gambar: "/katalog/magic-display.png",
    gambar: "/katalog/pm10.png",
    judul: "Magic Interactive Display",
  },
  {
    id: 2,
    // gambar: "/katalog/smart-classroom.png",
    gambar: "/katalog/pm7.png",
    judul: "Smart Classroom",
  },
  {
    id: 3,
    // gambar: "/katalog/security-system.png",
    gambar: "/katalog/pm8.png",
    judul: "Integrated Security System",
  },
  {
    id: 4,
    // gambar: "/katalog/passenger-gate.png",
    gambar: "/katalog/pm11.png",
    judul: "Passenger Gate System",
  },
  {
    id: 5,
    // gambar: "/katalog/cctv-nvr.png",
    gambar: "/katalog/pm5.png",
    judul: "CCTV & NVR System",
  },
];

const fadeFrom = (direction: "left" | "right") => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -100 : 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: direction === "left" ? 100 : -100,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
});

export default function KatalogScroll() {
  return (
    <section className={styles.sectionKatalog}>
      <h2 className={styles.heading}>Katalog Produk Unggulan</h2>
      <div className={styles.scrollWrapper}>
        <div className={styles.container}>
          {katalogList.map((item, index) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: false, amount: 0.4 });
            const controls = useAnimation();

            useEffect(() => {
              if (inView) {
                controls.start("visible");
              } else {
                controls.start("exit");
              }
            }, [inView, controls]);

            const direction = index % 2 === 0 ? "left" : "right";

            return (
              <motion.div
                key={item.id}
                ref={ref}
                className={styles.katalogCard}
                initial="hidden"
                animate={controls}
                variants={fadeFrom(direction)}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.gambar}
                    alt={item.judul}
                    width={1200}
                    height={800}
                    className={styles.image}
                  />
                  <div className={styles.overlay}>{item.judul}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

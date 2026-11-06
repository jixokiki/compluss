// // app/components/KatalogScroll.tsx
// "use client";

// import { motion, useAnimation, useInView } from "framer-motion";
// import styles from "../styles/KatalogScroll.module.scss";
// import Image from "next/image";
// import React, { useRef, useEffect } from "react";
// import { V } from "framer-motion/dist/types.d-CtuPurYT";

// const katalogList = [
//   {
//     id: 1,
//     // gambar: "/katalog/magic-display.png",
//     gambar: "/katalog/pm10.png",
//     judul: "Magic Interactive Display",
//   },
//   {
//     id: 2,
//     // gambar: "/katalog/smart-classroom.png",
//     gambar: "/katalog/pm7.png",
//     judul: "Smart Classroom",
//   },
//   {
//     id: 3,
//     // gambar: "/katalog/security-system.png",
//     gambar: "/katalog/pm8.png",
//     judul: "Integrated Security System",
//   },
//   {
//     id: 4,
//     // gambar: "/katalog/passenger-gate.png",
//     gambar: "/katalog/pm11.png",
//     judul: "Passenger Gate System",
//   },
//   {
//     id: 5,
//     // gambar: "/katalog/cctv-nvr.png",
//     gambar: "/katalog/pm5.png",
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
//   exit: {
//     opacity: 0,
//     x: direction === "left" ? 100 : -100,
//     transition: {
//       duration: 0.6,
//       ease: "easeIn",
//     },
//   },
// });

// export default function KatalogScroll() {
//   return (
//     <section className={styles.sectionKatalog}>
//       <h2 className={styles.heading}>Katalog Produk Unggulan</h2>
//       <div className={styles.scrollWrapper}>
//         <div className={styles.container}>
//           {katalogList.map((item, index) => {
//             const ref = useRef(null);
//             const inView = useInView(ref, { once: false, amount: 0.4 });
//             const controls = useAnimation();

//             useEffect(() => {
//               if (inView) {
//                 controls.start("visible");
//               } else {
//                 controls.start("exit");
//               }
//             }, [inView, controls]);

//             const direction = index % 2 === 0 ? "left" : "right";

//             return (
//               <motion.div
//                 key={item.id}
//                 ref={ref}
//                 className={styles.katalogCard}
//                 initial="hidden"
//                 animate={controls}
//                 variants={fadeFrom(direction)}
//               >
//                 <div className={styles.imageWrapper}>
//                   <Image
//                     src={item.gambar}
//                     alt={item.judul}
//                     width={1200}
//                     height={800}
//                     className={styles.image}
//                   />
//                   <div className={styles.overlay}>{item.judul}</div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
// app/components/KatalogScroll.tsx
// "use client";

// import { motion, useAnimation, useInView } from "framer-motion";
// import styles from "../styles/KatalogScroll.module.scss";
// import Image from "next/image";
// import React, { useRef, useEffect } from "react";
// import { V } from "framer-motion/dist/types.d-CtuPurYT";

// const katalogList = [
//   {
//     id: 1,
//     // gambar: "/katalog/magic-display.png",
//     gambar: "/katalog/pm10.png",
//     judul: "Magic Interactive Display",
//   },
//   {
//     id: 2,
//     // gambar: "/katalog/smart-classroom.png",
//     gambar: "/katalog/pm7.png",
//     judul: "Smart Classroom",
//   },
//   {
//     id: 3,
//     // gambar: "/katalog/security-system.png",
//     gambar: "/katalog/pm8.png",
//     judul: "Integrated Security System",
//   },
//   {
//     id: 4,
//     // gambar: "/katalog/passenger-gate.png",
//     gambar: "/katalog/pm11.png",
//     judul: "Passenger Gate System",
//   },
//   {
//     id: 5,
//     // gambar: "/katalog/cctv-nvr.png",
//     gambar: "/katalog/pm5.png",
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
//   exit: {
//     opacity: 0,
//     x: direction === "left" ? 100 : -100,
//     transition: {
//       duration: 0.6,
//       ease: "easeIn",
//     },
//   },
// });

// export default function KatalogScroll() {
//   return (
//     <section className={styles.sectionKatalog}>
//       <h2 className={styles.heading}>Katalog Produk Unggulan</h2>
//       <div className={styles.scrollWrapper}>
//         <div className={styles.container}>
//           {katalogList.map((item, index) => {
//             const ref = useRef(null);
//             const inView = useInView(ref, { once: false, amount: 0.4 });
//             const controls = useAnimation();

//             useEffect(() => {
//               if (inView) {
//                 controls.start("visible");
//               } else {
//                 controls.start("exit");
//               }
//             }, [inView, controls]);

//             const direction = index % 2 === 0 ? "left" : "right";

//             return (
//               <motion.div
//                 key={item.id}
//                 ref={ref}
//                 className={styles.katalogCard}
//                 initial="hidden"
//                 animate={controls}
//                 variants={fadeFrom(direction)}
//               >
//                 <div className={styles.imageWrapper}>
//                   <Image
//                     src={item.gambar}
//                     alt={item.judul}
//                     width={1200}
//                     height={800}
//                     className={styles.image}
//                   />
//                   <div className={styles.overlay}>{item.judul}</div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
// // app/components/KatalogScroll.tsx ini full codenya ya iki yang bener yang ini
// "use client";

// import { motion, useAnimation, useInView } from "framer-motion";
// import styles from "../styles/KatalogScroll.module.scss";
// import Image from "next/image";
// import React, { useRef, useEffect } from "react";
// // import { V } from "framer-motion/dist/types.d-CtuPurYT";

// const katalogList = [
//   {
//     id: 1,
//     // gambar: "/katalog/magic-display.png",
//     // gambar: "/katalog/pm10.png",
//     gambar: "/katalog/1.png",
//     // judul: "Magic Interactive Display",
//         judul: "PT WAE MANDIRI KARYA",
//   },
//   {
//     id: 2,
//     // gambar: "/katalog/smart-classroom.png",
//     // gambar: "/katalog/pm7.png",
//     gambar: "/katalog/2.png",
//     // judul: "Smart Classroom",
//         judul: "PT WAE MANDIRI KARYA",
//   },
//   {
//     id: 3,
//     // gambar: "/katalog/security-system.png",
//     // gambar: "/katalog/pm8.png",
//     gambar: "/katalog/3.png",
//     // judul: "Integrated Security System",
//         judul: "PT WAE MANDIRI KARYA",
//   },
//   {
//     id: 4,
//     // gambar: "/katalog/passenger-gate.png",
//     // gambar: "/katalog/pm11.png",
//     gambar: "/katalog/4.png",
//     // judul: "Passenger Gate System",
//         judul: "PT WAE MANDIRI KARYA",
//   },
//   {
//     id: 5,
//     // gambar: "/katalog/cctv-nvr.png",
//     // gambar: "/katalog/pm5.png",
//     gambar: "/katalog/5.png",
//     // judul: "CCTV & NVR System",
//         judul: "PT WAE MANDIRI KARYA",
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
//   exit: {
//     opacity: 0,
//     x: direction === "left" ? 100 : -100,
//     transition: {
//       duration: 0.6,
//       ease: "easeIn",
//     },
//   },
// });

// export default function KatalogScroll() {
//   return (
//     <section className={styles.sectionKatalog}>
//       <h2 className={styles.heading}>Layanan Unggulan</h2>
//       <div className={styles.scrollWrapper}>
//         <div className={styles.container}>
//           {katalogList.map((item, index) => {
//             const ref = useRef(null);
//             const inView = useInView(ref, { once: false, amount: 0.4 });
//             const controls = useAnimation();

//             useEffect(() => {
//               if (inView) {
//                 controls.start("visible");
//               } else {
//                 controls.start("exit");
//               }
//             }, [inView, controls]);

//             const direction = index % 2 === 0 ? "left" : "right";

//             return (
//               <motion.div
//                 key={item.id}
//                 ref={ref}
//                 className={styles.katalogCard}
//                 initial="hidden"
//                 animate={controls}
//                 // variants={fadeFrom(direction)}
//               >
//                 <div className={styles.imageWrapper}>
//                   <Image
//                     src={item.gambar}
//                     alt={item.judul}
//                     width={1200}
//                     height={800}
//                     className={styles.image}
//                   />
//                   <div className={styles.overlay}>{item.judul}</div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }





// // app/components/KatalogScroll.tsx jangan di hapus ya iki full code nyo dengan transistion smooth
// "use client";

// import React, { useEffect, useRef } from "react";
// import { motion, useAnimation, useInView, Variants } from "framer-motion";
// import Image from "next/image";
// import styles from "../styles/KatalogScroll.module.scss";

// const katalogList = [
//   { id: 1, gambar: "/katalog/15.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 2, gambar: "/katalog/16.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 3, gambar: "/katalog/17.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 4, gambar: "/katalog/18.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 5, gambar: "/katalog/19.jpg", judul: "PT WAE MANDIRI KARYA" },
//     { id: 6, gambar: "/katalog/20.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 7, gambar: "/katalog/21.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 8, gambar: "/katalog/22.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 9, gambar: "/katalog/23.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 10, gambar: "/katalog/24.jpg", judul: "PT WAE MANDIRI KARYA" },
//     { id: 11, gambar: "/katalog/25.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 12, gambar: "/katalog/26.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 13, gambar: "/katalog/27.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 14, gambar: "/katalog/28.jpg", judul: "PT WAE MANDIRI KARYA" },
// ];

// const getVariants = (direction: "left" | "right"): Variants => ({
//   hidden: {
//     opacity: 0,
//     x: direction === "left" ? -150 : 150,
//     scale: 0.98,
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     scale: 1,
//     transition: {
//       duration: 0.8,
//       // use string easing to satisfy TS typing
//       ease: "easeOut",
//     },
//   },
//   exit: {
//     opacity: 0,
//     x: direction === "left" ? 100 : -100,
//     transition: {
//       duration: 0.6,
//       ease: "easeIn",
//     },
//   },
// });

// type KatalogItemProps = {
//   item: { id: number; gambar: string; judul: string };
//   index: number;
// };

// function KatalogItem({ item, index }: KatalogItemProps) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const inView = useInView(ref, { once: false, amount: 0.45 });
//   const controls = useAnimation();

//   const direction = index % 2 === 0 ? "left" : "right";
//   const variants = getVariants(direction as "left" | "right");

//   useEffect(() => {
//     // first item appears immediately from left -> center
//     if (index === 0) {
//       controls.start("visible");
//       return;
//     }

//     if (inView) {
//       controls.start("visible");
//     } else {
//       controls.start("exit");
//     }
//   }, [inView, index, controls]);

//   return (
//     <motion.div
//       ref={ref}
//       className={styles.katalogCard}
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//       // optional: smooth layout changes if parent reflows
//       layout
//     >
//       <div className={styles.imageWrapper}>
//         <Image
//           src={item.gambar}
//           alt={item.judul}
//           width={1200}
//           height={800}
//           className={styles.image}
//           priority={index === 0}
//         />
//         <div className={styles.overlay}>{item.judul}</div>
//       </div>
//     </motion.div>
//   );
// }

// export default function KatalogScroll() {
//   return (
//     <section className={styles.sectionKatalog}>
//       <h2 className={styles.heading}>Layanan Unggulan</h2>
//       <div className={styles.scrollWrapper}>
//         <div className={styles.container}>
//           {katalogList.map((item, index) => (
//             <KatalogItem key={item.id} item={item} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// // app/components/KatalogScroll.tsx ini style yang udah smooth tanpa jump
// "use client";

// import React, { useEffect, useRef } from "react";
// import { motion, useAnimation, useInView, Variants } from "framer-motion";
// import Image from "next/image";
// import styles from "../styles/KatalogScroll.module.scss";

// const katalogList = [
//   { id: 1, gambar: "/katalog/15.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 2, gambar: "/katalog/16.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 3, gambar: "/katalog/17.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 4, gambar: "/katalog/18.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 5, gambar: "/katalog/19.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 6, gambar: "/katalog/20.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 7, gambar: "/katalog/21.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 8, gambar: "/katalog/22.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 9, gambar: "/katalog/23.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 10, gambar: "/katalog/24.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 11, gambar: "/katalog/25.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 12, gambar: "/katalog/26.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 13, gambar: "/katalog/27.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 14, gambar: "/katalog/28.jpg", judul: "PT WAE MANDIRI KARYA" },
// ];

// const getVariants = (direction: "left" | "right"): Variants => {
//   const offX = direction === "left" ? -160 : 160;
//   return {
//     hidden: {
//       opacity: 0,
//       x: offX,
//       // no scale, no spring -> avoids 'settle'
//       transition: {
//         x: { type: "tween", duration: 0.28, ease: "linear" },
//         opacity: { type: "tween", duration: 0.18, ease: "linear" },
//       },
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         x: { type: "tween", duration: 0.32, ease: "linear" },
//         opacity: { type: "tween", duration: 0.18, ease: "linear" },
//       },
//     },
//   };
// };

// type KatalogItemProps = {
//   item: { id: number; gambar: string; judul: string };
//   index: number;
// };

// function KatalogItem({ item, index }: KatalogItemProps) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   // sedikit lebih tinggi threshold supaya tidak toggle cepat ketika scroll cepat
//   const inView = useInView(ref, { once: false, amount: 0.6 });
//   const controls = useAnimation();

//   const direction = index % 2 === 0 ? "left" : "right";
//   const variants = getVariants(direction);

//   useEffect(() => {
//     if (index === 0) {
//       // langsung set ke visible tanpa animasi (snap to center)
//       controls.set("visible");
//       return;
//     }

//     if (inView) {
//       // animate to center using linear tween (no spring, no settle)
//       controls.start("visible");
//     } else {
//       // animate back offscreen (linear tween)
//       controls.start("hidden");
//     }
//   }, [inView, index, controls]);

//   return (
//     <motion.div
//       ref={ref}
//       className={styles.katalogCard}
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//     >
//       <div className={styles.imageWrapper}>
//         <Image
//           src={item.gambar}
//           alt={item.judul}
//           width={1200}
//           height={800}
//           className={styles.image}
//           priority={index === 0}
//         />
//         <div className={styles.overlay}>{item.judul}</div>
//       </div>
//     </motion.div>
//   );
// }

// export default function KatalogScroll() {
//   return (
//     <section className={styles.sectionKatalog}>
//       <h2 className={styles.heading}>Layanan Unggulan</h2>
//       <div className={styles.scrollWrapper}>
//         <div className={styles.container}>
//           {katalogList.map((item, index) => (
//             <KatalogItem key={item.id} item={item} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


// // app/components/KatalogScroll.tsx full code tanpa di hapus
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { motion, useAnimation, useInView, Variants } from "framer-motion";
// import Image from "next/image";
// import styles from "../styles/KatalogScroll.module.scss";

// const katalogList = [
//   { id: 1, gambar: "/katalog/15.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 2, gambar: "/katalog/16.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 3, gambar: "/katalog/17.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 4, gambar: "/katalog/18.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 5, gambar: "/katalog/19.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 6, gambar: "/katalog/20.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 7, gambar: "/katalog/21.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 8, gambar: "/katalog/22.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 9, gambar: "/katalog/23.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 10, gambar: "/katalog/24.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 11, gambar: "/katalog/25.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 12, gambar: "/katalog/26.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 13, gambar: "/katalog/27.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 14, gambar: "/katalog/28.jpg", judul: "PT WAE MANDIRI KARYA" },
// ];

// const RACK_DESC = `Rack / Tray cable
// manufacture of frames for racks or cable trays, and installation on site`;

// const PIPE_DESC = `Pipe, Fabrication and instalation
// • Manufacture of modified products.
// • Manufacturing/assembling, dismantling and installing pipes.
// • Manufacturing/assembling, dismantling and installation of pipe and tank insulation.
// • Provision of labor (welder, fitter and pipe insulation team), etc.`;

// const getVariants = (direction: "left" | "right"): Variants => {
//   const offX = direction === "left" ? -160 : 160;
//   return {
//     hidden: {
//       opacity: 0,
//       x: offX,
//       transition: {
//         x: { type: "tween", duration: 0.28, ease: "linear" },
//         opacity: { type: "tween", duration: 0.18, ease: "linear" },
//       },
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         x: { type: "tween", duration: 0.32, ease: "linear" },
//         opacity: { type: "tween", duration: 0.18, ease: "linear" },
//       },
//     },
//   };
// };

// type KatalogItemProps = {
//   item: { id: number; gambar: string; judul: string };
//   index: number;
// };

// function getDescriptionForId(id: number) {
//   // Based on your final instruction: id 1 & 7 => RACK, others (2-6 & 8-14) => PIPE
//   if (id === 1 || id === 7) return RACK_DESC;
//   return PIPE_DESC;
// }

// function KatalogItem({ item, index }: KatalogItemProps) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   // threshold higher to avoid flicker when fast scrolling
//   const inView = useInView(ref, { once: false, amount: 0.6 });
//   const controls = useAnimation();

//   const direction = index % 2 === 0 ? "left" : "right";
//   const variants = getVariants(direction);

//   // local open state for the info panel
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (index === 0) {
//       // snap first item to visible immediately without animation
//       controls.set("visible");
//       return;
//     }

//     if (inView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [inView, index, controls]);

//   // decide description by id
//   const description = getDescriptionForId(item.id);

//   // click handler: toggle open
//   const handleClick = (e: React.MouseEvent) => {
//     // prevent scroll/drag side effects
//     e.stopPropagation();
//     setOpen((s) => !s);
//   };

//   // close when clicking outside the open panel — attach simple listener
//   useEffect(() => {
//     if (!open) return;
//     const onDocClick = () => setOpen(false);
//     document.addEventListener("click", onDocClick);
//     return () => document.removeEventListener("click", onDocClick);
//   }, [open]);

//   return (
//     <motion.div
//       ref={ref}
//       className={styles.katalogCard}
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//       // prevent pointer events pass-through when panel is open
//       style={{ position: "relative" }}
//     >
//       <div
//         className={styles.imageWrapper}
//         onClick={handleClick}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             e.preventDefault();
//             setOpen((s) => !s);
//           }
//         }}
//       >
//         {/* <Image
//           src={item.gambar}
//           alt={item.judul}
//           width={1200}
//           height={800}
//           className={styles.image}
//           priority={index === 0}
//         /> */}
        
// <Image
//   src={item.gambar}
//   alt={item.judul}
//   width={1200}
//   height={800}
//   className={styles.image}
//   priority={index === 0}
//   sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
// />
//         <div className={styles.overlay}>{item.judul}</div>
//       </div>

//       {/* Info panel: appears directly in place (no settle). Renders instantly. */}
//       {open && (
//         <div
//           className={styles.infoPanel}
//           // stop propagation so clicking inside panel doesn't close it via document listener
//           onClick={(e) => e.stopPropagation()}
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className={styles.infoImageWrap}>
//             {/* <Image
//               src={item.gambar}
//               alt={item.judul}
//               width={1200}
//               height={800}
//               className={styles.infoImage}
//               priority
//             /> */}
            
// <Image
//   src={item.gambar}
//   alt={item.judul}
//   width={1200}
//   height={800}
//   className={styles.infoImage}
//   priority
//   sizes="(max-width: 480px) 100vw, (max-width: 1024px) 60vw, 45vw"
// />
//           </div>
//           <div className={styles.infoContent}>
//             <h3 className={styles.infoTitle}>{item.judul}</h3>
//             <p className={styles.infoDescription} style={{ whiteSpace: "pre-line" }}>
//               {description}
//             </p>
//             <div className={styles.infoActions}>
//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className={styles.closeButton}
//               >
//                 Tutup
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }

// export default function KatalogScroll() {
//   return (
//     <section className={styles.sectionKatalog}>
//       <h2 className={styles.heading}>Layanan Unggulan</h2>
//       <div className={styles.scrollWrapper}>
//         <div className={styles.container}>
//           {katalogList.map((item, index) => (
//             <KatalogItem key={item.id} item={item} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }









//INGAT JANGAN DI RUBAH2 BOCAH PUKI
// // app/components/KatalogScroll.tsx
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";
// import { motion, useAnimation, useInView, Variants } from "framer-motion";
// import Image from "next/image";
// import styles from "../styles/KatalogScroll.module.scss";

// const katalogList = [
//   { id: 1, gambar: "/katalog/15.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 2, gambar: "/katalog/16.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 3, gambar: "/katalog/17.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 4, gambar: "/katalog/18.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 5, gambar: "/katalog/19.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 6, gambar: "/katalog/20.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 7, gambar: "/katalog/21.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 8, gambar: "/katalog/22.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 9, gambar: "/katalog/23.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 10, gambar: "/katalog/24.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 11, gambar: "/katalog/25.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 12, gambar: "/katalog/26.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 13, gambar: "/katalog/27.jpg", judul: "PT WAE MANDIRI KARYA" },
//   // { id: 14, gambar: "/katalog/28.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 15, gambar: "/katalog/47.jpg", judul: "PT WAE MANDIRI KARYA" },
//   { id: 16, gambar: "/katalog/49.jpg", judul: "PT WAE MANDIRI KARYA" },
// ];

// const RACK_DESC = `Rack / Tray cable
// manufacture of frames for racks or cable trays, and installation on site`;

// const PIPE_DESC = `Pipe, Fabrication and instalation
// • Manufacture of modified products.
// • Manufacturing/assembling, dismantling and installing pipes.
// • Manufacturing/assembling, dismantling and installation of pipe and tank insulation.
// • Provision of labor (welder, fitter and pipe insulation team), etc.`;

// const SPAREPART_DESC = `PT. WAE MANDIRI KARYA is also dedicated to supporting your project needs by providing the best quality materials and ensuring fast and reliable delivery.`;
// const MAINTAINANCE_DESC = `Maintenance and Repair
// Checking the machines for maintenances, and product.`;


// const getVariants = (direction: "left" | "right"): Variants => {
//   const offX = direction === "left" ? -160 : 160;
//   return {
//     hidden: {
//       opacity: 0,
//       x: offX,
//       transition: {
//         x: { type: "tween", duration: 0.28, ease: "linear" },
//         opacity: { type: "tween", duration: 0.18, ease: "linear" },
//       },
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         x: { type: "tween", duration: 0.32, ease: "linear" },
//         opacity: { type: "tween", duration: 0.18, ease: "linear" },
//       },
//     },
//   };
// };

// type KatalogItemProps = {
//   item: { id: number; gambar: string; judul: string };
//   index: number;
//   openId: number | null;
//   setOpenId: (id: number | null) => void;
// };

// function getDescriptionForId(id: number) {
//   // gunakan mapping final: 1 & 8 => RACK, others => PIPE
//   if (id === 1 || id === 8) return RACK_DESC;
//   if(id === 15) return SPAREPART_DESC;
//   if (id === 16) return MAINTAINANCE_DESC;
//   return PIPE_DESC;
// }

// function KatalogItem({ item, index, openId, setOpenId }: KatalogItemProps) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const inView = useInView(ref, { once: false, amount: 0.6 });
//   const controls = useAnimation();
//   const direction = index % 2 === 0 ? "left" : "right";
//   const variants = getVariants(direction);

//   // determine if this item is open (from parent)
//   const isOpen = openId === item.id;

//   // detect mobile to decide portal vs inline
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth <= 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   useEffect(() => {
//     if (index === 0) {
//       controls.set("visible");
//       return;
//     }
//     if (inView) controls.start("visible");
//     else controls.start("hidden");
//   }, [inView, index, controls]);

//   const description = getDescriptionForId(item.id);

//   const handleToggle = (e?: React.MouseEvent) => {
//     e?.stopPropagation();
//     setOpenId(isOpen ? null : item.id);
//   };

//   // click outside to close (works for inline panel)
//   useEffect(() => {
//     const onDocClick = (e: MouseEvent) => {
//       if (!isOpen) return;
//       if (!ref.current) return;
//       if (!ref.current.contains(e.target as Node)) {
//         setOpenId(null);
//       }
//     };
//     document.addEventListener("click", onDocClick);
//     return () => document.removeEventListener("click", onDocClick);
//   }, [isOpen, setOpenId]);

//   // prevent body scroll when any panel is open
//   useEffect(() => {
//     const prev = document.body.style.overflow;
//     if (isOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = prev || "";
//     return () => {
//       document.body.style.overflow = prev || "";
//     };
//   }, [isOpen]);

//   // build panel JSX (reusable for inline and portal)
//   const panel = (
//     <div
//       id={`info-panel-${item.id}`}
//       className={`${styles.infoPanel} ${isMobile ? styles.infoPanelMobile : ""}`}
//       onClick={(e) => e.stopPropagation()}
//       role="dialog"
//       aria-modal="true"
//     >
//       {/* mobile top close (only visible in mobile via CSS) */}
//       <button
//         className={styles.mobileCloseTop}
//         onClick={() => setOpenId(null)}
//         aria-label="Tutup"
//       >
//         ✕
//       </button>

//       <div className={styles.infoImageWrap}>
//         <Image
//           src={item.gambar}
//           alt={item.judul}
//           width={1200}
//           height={800}
//           className={styles.infoImage}
//           priority
//           sizes="(max-width: 480px) 100vw, (max-width: 1024px) 60vw, 45vw"
//         />
//       </div>

//       <div className={styles.infoContent}>
//         <h3 className={styles.infoTitle}>{item.judul}</h3>
//         <p className={styles.infoDescription} style={{ whiteSpace: "pre-line" }}>
//           {description}
//         </p>
//         <div className={styles.infoActions}>
//           <button
//             type="button"
//             onClick={() => setOpenId(null)}
//             className={styles.closeButton}
//           >
//             Tutup
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <motion.div
//       ref={ref}
//       className={styles.katalogCard}
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//       style={{ position: "relative" }}
//     >
//       <div
//         className={styles.imageWrapper}
//         onClick={handleToggle}
//         role="button"
//         tabIndex={0}
//         aria-expanded={isOpen}
//         aria-controls={`info-panel-${item.id}`}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             e.preventDefault();
//             handleToggle();
//           }
//         }}
//       >
//         <Image
//           src={item.gambar}
//           alt={item.judul}
//           width={1200}
//           height={800}
//           className={styles.image}
//           priority={index === 0}
//           sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
//         />
//         <div className={styles.overlay}>{item.judul}</div>
//       </div>

//       {/* render inline panel for desktop/tablet; for mobile render via portal with backdrop */}
//       {isOpen && !isMobile && panel}

//       {isOpen && isMobile &&
//         ReactDOM.createPortal(
//           <>
//             <div
//               className={styles.modalBackdrop}
//               onClick={() => setOpenId(null)}
//               aria-hidden="true"
//             />
//             {panel}
//           </>,
//           document.body
//         )}
//     </motion.div>
//   );
// }

// export default function KatalogScroll() {
//   const [openId, setOpenId] = useState<number | null>(null);

//   return (
//     <section id='produk' className={styles.sectionKatalog}>
//       <h2 className={styles.heading}>Layanan Unggulan</h2>
//       <div className={styles.scrollWrapper}>
//         <div className={styles.container}>
//           {katalogList.map((item, index) => (
//             <KatalogItem key={item.id} item={item} index={index} openId={openId} setOpenId={setOpenId} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }






// app/components/KatalogScroll.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import Image from "next/image";
import styles from "../styles/KatalogScroll.module.scss";

const katalogList = [
  { id: 1, gambar: "/katalog/15.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 2, gambar: "/katalog/16.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 3, gambar: "/katalog/17.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 4, gambar: "/katalog/18.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 5, gambar: "/katalog/19.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 6, gambar: "/katalog/20.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 7, gambar: "/katalog/21.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 8, gambar: "/katalog/22.jpg", judul: "PT WAE MANDIRI KARYA" },
  { id: 9, gambar: "/katalog/23.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 10, gambar: "/katalog/24.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 11, gambar: "/katalog/25.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 12, gambar: "/katalog/26.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 13, gambar: "/katalog/27.jpg", judul: "PT WAE MANDIRI KARYA" },
  // { id: 14, gambar: "/katalog/28.jpg", judul: "PT WAE MANDIRI KARYA" },
  { id: 15, gambar: "/katalog/47.jpg", judul: "PT WAE MANDIRI KARYA" },
  { id: 16, gambar: "/katalog/49.jpg", judul: "PT WAE MANDIRI KARYA" },
];

const RACK_DESC = `Rack / Tray cable
manufacture of frames for racks or cable trays, and installation on site`;

const PIPE_DESC = `Pipe, Fabrication and instalation
• Manufacture of modified products.
• Manufacturing/assembling, dismantling and installing pipes.
• Manufacturing/assembling, dismantling and installation of pipe and tank insulation.
• Provision of labor (welder, fitter and pipe insulation team), etc.`;

const SPAREPART_DESC = `PT. WAE MANDIRI KARYA is also dedicated to supporting your project needs by providing the best quality materials and ensuring fast and reliable delivery.`;
const MAINTAINANCE_DESC = `Maintenance and Repair
Checking the machines for maintenances, and product.`;

const getVariants = (direction: "left" | "right"): Variants => {
  const offX = direction === "left" ? -160 : 160;
  return {
    hidden: {
      opacity: 0,
      x: offX,
      transition: {
        x: { type: "tween", duration: 0.28, ease: "linear" },
        opacity: { type: "tween", duration: 0.18, ease: "linear" },
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        x: { type: "tween", duration: 0.32, ease: "linear" },
        opacity: { type: "tween", duration: 0.18, ease: "linear" },
      },
    },
  };
};

type KatalogItemProps = {
  item: { id: number; gambar: string; judul: string };
  index: number;
  openId: number | null;
  setOpenId: (id: number | null) => void;
};

function getDescriptionForId(id: number) {
  // gunakan mapping final: 1 & 8 => RACK, others => PIPE
  if (id === 1 || id === 8) return RACK_DESC;
  if (id === 15) return SPAREPART_DESC;
  if (id === 16) return MAINTAINANCE_DESC;
  return PIPE_DESC;
}

function KatalogItem({ item, index, openId, setOpenId }: KatalogItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.6 });
  const controls = useAnimation();
  const direction = index % 2 === 0 ? "left" : "right";
  const variants = getVariants(direction);

  // determine if this item is open (from parent)
  const isOpen = openId === item.id;

  // detect mobile to decide portal vs inline
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (index === 0) {
      controls.set("visible");
      return;
    }
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, index, controls]);

  const description = getDescriptionForId(item.id);

  const handleToggle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenId(isOpen ? null : item.id);
  };

  // click outside to close (works for inline panel)
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!isOpen) return;
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isOpen, setOpenId]);

  // prevent body scroll when any panel is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [isOpen]);

  // build panel JSX (reusable for inline and portal)
  const panel = (
    <div
      id={`info-panel-${item.id}`}
      className={`${styles.infoPanel} ${isMobile ? styles.infoPanelMobile : ""}`}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      {/* mobile top close (only visible in mobile via CSS) */}
      <button
        className={styles.mobileCloseTop}
        onClick={() => setOpenId(null)}
        aria-label="Tutup"
      >
        ✕
      </button>

      <div className={styles.infoImageWrap}>
        <Image
          src={item.gambar}
          alt={item.judul}
          width={1200}
          height={800}
          className={styles.infoImage}
          priority
          sizes="(max-width: 480px) 100vw, (max-width: 1024px) 60vw, 45vw"
        />
      </div>

      <div className={styles.infoContent}>
        <h3 className={styles.infoTitle}>{item.judul}</h3>
        <p className={styles.infoDescription} style={{ whiteSpace: "pre-line" }}>
          {description}
        </p>
        <div className={styles.infoActions}>
          <button
            type="button"
            onClick={() => setOpenId(null)}
            className={styles.closeButton}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      data-katalog-id={item.id} // <-- ditambahkan agar banner bisa scroll ke card ini
      className={styles.katalogCard}
      initial="hidden"
      animate={controls}
      variants={variants}
      style={{ position: "relative" }}
    >
      <div
        className={styles.imageWrapper}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={`info-panel-${item.id}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <Image
          src={item.gambar}
          alt={item.judul}
          width={1200}
          height={800}
          className={styles.image}
          priority={index === 0}
          sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={styles.overlay}>{item.judul}</div>
      </div>

      {/* render inline panel for desktop/tablet; for mobile render via portal with backdrop */}
      {isOpen && !isMobile && panel}

      {isOpen && isMobile &&
        ReactDOM.createPortal(
          <>
            <div
              className={styles.modalBackdrop}
              onClick={() => setOpenId(null)}
              aria-hidden="true"
            />
            {panel}
          </>,
          document.body
        )}
    </motion.div>
  );
}

export default function KatalogScroll() {
  const [openId, setOpenId] = useState<number | null>(null);

  // listen untuk event dari BannerInformative
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.id === "number") {
        setOpenId(detail.id);
        // scroll to katalog card if present (small delay to allow layout)
        setTimeout(() => {
          const el = document.querySelector<HTMLElement>(`[data-katalog-id="${detail.id}"]`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 120);
      }
    };
    window.addEventListener("open-katalog", handler as EventListener);
    return () => window.removeEventListener("open-katalog", handler as EventListener);
  }, []);

  return (
    <section id='produk' className={styles.sectionKatalog}>
      <h2 className={styles.heading}>Layanan Unggulan</h2>
      <div className={styles.scrollWrapper}>
        <div className={styles.container}>
          {katalogList.map((item, index) => (
            <KatalogItem key={item.id} item={item} index={index} openId={openId} setOpenId={setOpenId} />
          ))}
        </div>
      </div>
    </section>
  );
}

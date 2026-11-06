// // components/BookingWizard.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { db } from "../../lib/firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   serverTimestamp
// } from "firebase/firestore";
// import emailjs from "@emailjs/browser";
// import styles from "../styles/SmeetBooking.module.scss";
// import { useSession, signIn } from "next-auth/react";
// import { createGoogleCalendarEvent } from "../../lib/googleCalendar";
// import BookingNavbarPage from "../bookingnavbar";

// const jamList = [
//   "08:00", "09:00", "10:00", "11:00", "12:00",
//   "13:00", "14:00", "15:00", "16:00", "17:00",
// ];

// const durasiOptions = ["15", "30", "45", "60"];
// const lokasiOptions = ["Zoom", "Phone call", "In-person", "WhatsApp", "Custom"];

// export default function BookingWizard() {
//   const [step, setStep] = useState(1);
//   const [tanggal, setTanggal] = useState("");
//   const [jadwalTerisi, setJadwalTerisi] = useState<string[]>([]);
//   const [selectedJam, setSelectedJam] = useState("");
//   const [durasi, setDurasi] = useState("30");
//   const [lokasi, setLokasi] = useState("WhatsApp");
//   const [nama, setNama] = useState("");
//   const [kontak, setKontak] = useState("");
//   const [keperluan, setKeperluan] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [bookingLink, setBookingLink] = useState("");
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (tanggal) {
//       const hari = new Date(tanggal).getDay();
//       if (hari === 0 || hari === 6) {
//         setJadwalTerisi(jamList);
//         return;
//       }
//       const fetchTerisi = async () => {
//         const q = query(collection(db, "agenda"), where("tanggal", "==", tanggal));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => doc.data().jam);
//         setJadwalTerisi(data);
//       };
//       fetchTerisi();
//     }
//   }, [tanggal]);

//   const sendEmailReminder = async (toEmail: string, subject: string, message: string) => {
//     try {
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//         {
//           to_email: toEmail,
//           subject,
//           message
//         },
//         process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
//       );
//       console.log("Email reminder sent");
//     } catch (error) {
//       console.error("Email sending failed", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const docRef = await addDoc(collection(db, "agenda"), {
//       tanggal,
//       jam: selectedJam,
//       durasi,
//       lokasi,
//       nama,
//       kontak,
//       keperluan,
//       timestamp: serverTimestamp(),
//     });

//     const link = `${window.location.origin}/booking/${docRef.id}`;
//     setBookingLink(link);

//     const emailMessage = `Hi ${nama},\n\nBerikut adalah detail booking Anda:\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nKeperluan: ${keperluan}\n\nLihat detail: ${link}`;
//     await sendEmailReminder(`${kontak}@email.com`, "Konfirmasi Booking Konsultasi", emailMessage);

//     if (session?.user?.email && (session as any)?.accessToken) {
//       const startDateTime = new Date(`${tanggal}T${selectedJam}:00`);
//       const endDateTime = new Date(startDateTime.getTime() + Number(durasi) * 60000);

//     //   await createGoogleCalendarEvent((session as any).accessToken, {
//     //     summary: `Meeting dengan ${nama}`,
//     //     description: keperluan,
//     //     start: startDateTime.toISOString(),
//     //     end: endDateTime.toISOString(),
//     //   });
// //       await fetch("../api/auth/[...nextauth].ts", {
// //   method: "POST",
// //   headers: { "Content-Type": "application/json" },
// //   body: JSON.stringify({
// //     summary: `Meeting dengan ${nama}`,
// //     description: keperluan,
// //     start: startDateTime.toISOString(),
// //     end: endDateTime.toISOString(),
// //   }),
// // });

// await fetch("/api/calendar", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     summary: `Meeting dengan ${nama}`,
//     description: keperluan,
//     start: startDateTime.toISOString(),
//     end: endDateTime.toISOString(),
//   }),
// });

// // await fetch("../api/google-calender/create.ts", {
// //   method: "POST",
// //   headers: { "Content-Type": "application/json" },
// //   body: JSON.stringify({
// //     summary: `Meeting dengan ${nama}`,
// //     description: keperluan,
// //     start: startDateTime.toISOString(),
// //     end: endDateTime.toISOString(),
// //   }),
// // });


//     } else {
//       alert("Login Google dibutuhkan untuk sinkronisasi ke Kalender");
//       signIn("google");
//     }

//     const pesan = `Halo Admin, saya ingin membuat janji temu:\n\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nNama: ${nama}\nKontak: ${kontak}\nKeperluan: ${keperluan}`;
//     const noHP = "6285817298071";
//     const whatsappLink = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;
//     setSuccess(true);
//     window.open(whatsappLink, "_blank");
//   };

//   return (
//     // <BookingNavbarPage/>
//     <div className={styles.bookingWizard}>
//       <BookingNavbarPage/>
//       <h3>Booking Jadwal Konsultasi</h3>

//       {/* Steps */}
//       {/* Step 1 */}
//       {step === 1 && (
//         <div className={styles.stepBox}>
//           <p>Pilih tanggal:</p>
//           <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
//           <p>Pilih durasi:</p>
//           <select value={durasi} onChange={(e) => setDurasi(e.target.value)}>
//             {durasiOptions.map((d) => (
//               <option key={d} value={d}>{d} menit</option>
//             ))}
//           </select>
//           <p>Pilih lokasi:</p>
//           <select value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
//             {lokasiOptions.map((loc) => (
//               <option key={loc} value={loc}>{loc}</option>
//             ))}
//           </select>
//           <div className={styles.navBtn}>
//             <button disabled={!tanggal} onClick={() => setStep(2)}>Next</button>
//           </div>
//         </div>
//       )}

//       {/* Step 2 */}
//       {step === 2 && (
//         <div className={styles.stepBox}>
//           <p>Pilih jam:</p>
//           <div className={styles.gridSlot}>
//             {jamList.map((jam) => (
//               <button
//                 key={jam}
//                 onClick={() => setSelectedJam(jam)}
//                 disabled={jadwalTerisi.includes(jam)}
//                 className={selectedJam === jam ? styles.active : jadwalTerisi.includes(jam) ? styles.disabled : ""}
//               >
//                 {jam}
//               </button>
//             ))}
//           </div>
//           <div className={styles.navBtn}>
//             <button onClick={() => setStep(1)}>Back</button>
//             <button disabled={!selectedJam} onClick={() => setStep(3)}>Next</button>
//           </div>
//         </div>
//       )}

//       {/* Step 3 */}
//       {step === 3 && (
//         <div className={styles.stepBox}>
//           <p>Isi data diri:</p>
//           <input type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
//           <input type="tel" placeholder="No. WhatsApp" value={kontak} onChange={(e) => setKontak(e.target.value)} required />
//           <textarea placeholder="Keperluan" value={keperluan} onChange={(e) => setKeperluan(e.target.value)} required />
//           <div className={styles.navBtn}>
//             <button onClick={() => setStep(2)}>Back</button>
//             <button onClick={handleSubmit}>Kirim & Redirect WhatsApp</button>
//           </div>
//         </div>
//       )}

//       {/* Success Message */}
//       {success && bookingLink && (
//         <div>
//           <p className={styles.success}>Janji berhasil dikirim! Anda akan diarahkan ke WhatsApp.</p>
//           <p><strong>Link Booking:</strong></p>
//           <input type="text" value={bookingLink} readOnly onClick={(e) => (e.target as HTMLInputElement).select()} style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
//           <a href={bookingLink} target="_blank" rel="noopener noreferrer">
//             <button style={{ marginTop: "1rem" }}>Lihat Detail Booking</button>
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }











// // components/BookingWizard.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { db } from "../../lib/firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   serverTimestamp
// } from "firebase/firestore";
// import emailjs from "@emailjs/browser";
// import styles from "../styles/SmeetBooking.module.scss";
// import { useSession, signIn } from "next-auth/react";
// import { createGoogleCalendarEvent } from "../../lib/googleCalendar";

// const jamList = [
//   "08:00", "09:00", "10:00", "11:00", "12:00",
//   "13:00", "14:00", "15:00", "16:00", "17:00",
// ];

// const durasiOptions = ["15", "30", "45", "60"];
// const lokasiOptions = ["Zoom", "Phone call", "In-person", "WhatsApp", "Custom"];

// export default function BookingWizard() {
//   const [step, setStep] = useState(1);
//   const [tanggal, setTanggal] = useState("");
//   const [jadwalTerisi, setJadwalTerisi] = useState<string[]>([]);
//   const [selectedJam, setSelectedJam] = useState("");
//   const [durasi, setDurasi] = useState("30");
//   const [lokasi, setLokasi] = useState("WhatsApp");
//   const [nama, setNama] = useState("");
//   const [kontak, setKontak] = useState("");
//   const [keperluan, setKeperluan] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [bookingLink, setBookingLink] = useState("");
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (tanggal) {
//       const hari = new Date(tanggal).getDay();
//       if (hari === 0 || hari === 6) {
//         setJadwalTerisi(jamList);
//         return;
//       }
//       const fetchTerisi = async () => {
//         const q = query(collection(db, "agenda"), where("tanggal", "==", tanggal));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => doc.data().jam);
//         setJadwalTerisi(data);
//       };
//       fetchTerisi();
//     }
//   }, [tanggal]);

//   const sendEmailReminder = async (toEmail: string, subject: string, message: string) => {
//     try {
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//         {
//           to_email: toEmail,
//           subject,
//           message
//         },
//         process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
//       );
//       console.log("Email reminder sent");
//     } catch (error) {
//       console.error("Email sending failed", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const docRef = await addDoc(collection(db, "agenda"), {
//       tanggal,
//       jam: selectedJam,
//       durasi,
//       lokasi,
//       nama,
//       kontak,
//       keperluan,
//       timestamp: serverTimestamp(),
//     });

//     const link = `${window.location.origin}/booking/${docRef.id}`;
//     setBookingLink(link);

//     const emailMessage = `Hi ${nama},\n\nBerikut adalah detail booking Anda:\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nKeperluan: ${keperluan}\n\nLihat detail: ${link}`;
//     await sendEmailReminder(`${kontak}@email.com`, "Konfirmasi Booking Konsultasi", emailMessage);

//     if (session?.user?.email && (session as any)?.accessToken) {
//       const startDateTime = new Date(`${tanggal}T${selectedJam}:00`);
//       const endDateTime = new Date(startDateTime.getTime() + Number(durasi) * 60000);

//     //   await createGoogleCalendarEvent((session as any).accessToken, {
//     //     summary: `Meeting dengan ${nama}`,
//     //     description: keperluan,
//     //     start: startDateTime.toISOString(),
//     //     end: endDateTime.toISOString(),
//     //   });
// //       await fetch("../api/auth/[...nextauth].ts", {
// //   method: "POST",
// //   headers: { "Content-Type": "application/json" },
// //   body: JSON.stringify({
// //     summary: `Meeting dengan ${nama}`,
// //     description: keperluan,
// //     start: startDateTime.toISOString(),
// //     end: endDateTime.toISOString(),
// //   }),
// // });

// await fetch("/api/calendar", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     summary: `Meeting dengan ${nama}`,
//     description: keperluan,
//     start: startDateTime.toISOString(),
//     end: endDateTime.toISOString(),
//   }),
// });

// // await fetch("../api/google-calender/create.ts", {
// //   method: "POST",
// //   headers: { "Content-Type": "application/json" },
// //   body: JSON.stringify({
// //     summary: `Meeting dengan ${nama}`,
// //     description: keperluan,
// //     start: startDateTime.toISOString(),
// //     end: endDateTime.toISOString(),
// //   }),
// // });


//     } else {
//       alert("Login Google dibutuhkan untuk sinkronisasi ke Kalender");
//       signIn("google");
//     }

//     const pesan = `Halo Admin, saya ingin membuat janji temu:\n\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nNama: ${nama}\nKontak: ${kontak}\nKeperluan: ${keperluan}`;
//     const noHP = "6285817298071";
//     const whatsappLink = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;
//     setSuccess(true);
//     window.open(whatsappLink, "_blank");
//   };

//   return (
//     <div className={styles.bookingWizard}>
//       <h3>Booking Jadwal Konsultasi</h3>

//       {/* Steps */}
//       {/* Step 1 */}
//       {step === 1 && (
//         <div className={styles.stepBox}>
//           <p>Pilih tanggal:</p>
//           <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
//           <p>Pilih durasi:</p>
//           <select value={durasi} onChange={(e) => setDurasi(e.target.value)}>
//             {durasiOptions.map((d) => (
//               <option key={d} value={d}>{d} menit</option>
//             ))}
//           </select>
//           <p>Pilih lokasi:</p>
//           <select value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
//             {lokasiOptions.map((loc) => (
//               <option key={loc} value={loc}>{loc}</option>
//             ))}
//           </select>
//           <div className={styles.navBtn}>
//             <button disabled={!tanggal} onClick={() => setStep(2)}>Next</button>
//           </div>
//         </div>
//       )}

//       {/* Step 2 */}
//       {step === 2 && (
//         <div className={styles.stepBox}>
//           <p>Pilih jam:</p>
//           <div className={styles.gridSlot}>
//             {jamList.map((jam) => (
//               <button
//                 key={jam}
//                 onClick={() => setSelectedJam(jam)}
//                 disabled={jadwalTerisi.includes(jam)}
//                 className={selectedJam === jam ? styles.active : jadwalTerisi.includes(jam) ? styles.disabled : ""}
//               >
//                 {jam}
//               </button>
//             ))}
//           </div>
//           <div className={styles.navBtn}>
//             <button onClick={() => setStep(1)}>Back</button>
//             <button disabled={!selectedJam} onClick={() => setStep(3)}>Next</button>
//           </div>
//         </div>
//       )}

//       {/* Step 3 */}
//       {step === 3 && (
//         <div className={styles.stepBox}>
//           <p>Isi data diri:</p>
//           <input type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
//           <input type="tel" placeholder="No. WhatsApp" value={kontak} onChange={(e) => setKontak(e.target.value)} required />
//           <textarea placeholder="Keperluan" value={keperluan} onChange={(e) => setKeperluan(e.target.value)} required />
//           <div className={styles.navBtn}>
//             <button onClick={() => setStep(2)}>Back</button>
//             <button onClick={handleSubmit}>Kirim & Redirect WhatsApp</button>
//           </div>
//         </div>
//       )}

//       {/* Success Message */}
//       {success && bookingLink && (
//         <div>
//           <p className={styles.success}>Janji berhasil dikirim! Anda akan diarahkan ke WhatsApp.</p>
//           <p><strong>Link Booking:</strong></p>
//           <input type="text" value={bookingLink} readOnly onClick={(e) => (e.target as HTMLInputElement).select()} style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
//           <a href={bookingLink} target="_blank" rel="noopener noreferrer">
//             <button style={{ marginTop: "1rem" }}>Lihat Detail Booking</button>
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }




//jangan di apus ini terbaru update september 2025
// // components/BookingWizard.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { db } from "../../lib/firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   serverTimestamp
// } from "firebase/firestore";
// import emailjs from "@emailjs/browser";
// import styles from "../styles/SmeetBooking.module.scss";
// import { useSession, signIn } from "next-auth/react";

// const jamList = [
//   "08:00", "09:00", "10:00", "11:00", "12:00",
//   "13:00", "14:00", "15:00", "16:00", "17:00",
// ];

// const durasiOptions = ["15", "30", "45", "60"];
// const lokasiOptions = ["Zoom", "Phone call", "In-person", "WhatsApp", "Custom"];

// export default function BookingWizard() {
//   const [step, setStep] = useState(1);
//   const [tanggal, setTanggal] = useState("");
//   const [jadwalTerisi, setJadwalTerisi] = useState<string[]>([]);
//   const [selectedJam, setSelectedJam] = useState("");
//   const [durasi, setDurasi] = useState("30");
//   const [lokasi, setLokasi] = useState("WhatsApp");
//   const [nama, setNama] = useState("");
//   const [kontak, setKontak] = useState("");
//   const [keperluan, setKeperluan] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [bookingLink, setBookingLink] = useState("");
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (tanggal) {
//       const hari = new Date(tanggal).getDay();
//       if (hari === 0 || hari === 6) {
//         setJadwalTerisi(jamList);
//         return;
//       }
//       const fetchTerisi = async () => {
//         const q = query(collection(db, "agenda"), where("tanggal", "==", tanggal));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => doc.data().jam);
//         setJadwalTerisi(data);
//       };
//       fetchTerisi();
//     }
//   }, [tanggal]);

//   const sendEmailReminder = async (toEmail: string, subject: string, message: string) => {
//     try {
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//         {
//           to_email: toEmail,
//           subject,
//           message
//         },
//         process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
//       );
//       console.log("Email reminder sent");
//     } catch (error) {
//       console.error("Email sending failed", error);
//     }
//   };

//   const handleSubmit = async () => {
//     const docRef = await addDoc(collection(db, "agenda"), {
//       tanggal,
//       jam: selectedJam,
//       durasi,
//       lokasi,
//       nama,
//       kontak,
//       keperluan,
//       timestamp: serverTimestamp(),
//     });

//     const link = `${window.location.origin}/booking/${docRef.id}`;
//     setBookingLink(link);

//     const emailMessage = `Hi ${nama},\n\nBerikut adalah detail booking Anda:\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nKeperluan: ${keperluan}\n\nLihat detail: ${link}`;
//     await sendEmailReminder(`${kontak}@email.com`, "Konfirmasi Booking Konsultasi", emailMessage);

//     if (session?.user?.email && (session as any)?.accessToken) {
//       const startDateTime = new Date(`${tanggal}T${selectedJam}:00`);
//       const endDateTime = new Date(startDateTime.getTime() + Number(durasi) * 60000);

//       // Jika ingin integrasi calendar, panggil API servermu
//       await fetch("/api/calendar", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           summary: `Meeting dengan ${nama}`,
//           description: keperluan,
//           start: startDateTime.toISOString(),
//           end: endDateTime.toISOString(),
//         }),
//       });
//     } else {
//       alert("Login Google dibutuhkan untuk sinkronisasi ke Kalender");
//       signIn("google");
//     }

//     const pesan = `Halo Admin, saya ingin membuat janji temu:\n\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nNama: ${nama}\nKontak: ${kontak}\nKeperluan: ${keperluan}`;
//     const noHP = "6285817298071";
//     const whatsappLink = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;
//     setSuccess(true);
//     window.open(whatsappLink, "_blank");
//   };

//   return (
//     <>
//     {/* Optional: visual calendar + timeline (non-interactive, presentational) */}
// <div className={styles.calendarTimeline} style={{ marginBottom: 18 }}>
//   <div className={styles.miniCalendar}>
//     <div className="month">Juli 2025</div>
//     <div className="weekdays">S M T W T F S</div>
//     <div className="dates" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
//       {Array.from({ length: 28 }).map((_, idx) => {
//         const isToday = idx === 2; // demo: mark one date as today
//         return (
//           <div key={idx} className={`${styles.dateChip} ${isToday ? "today" : ""}`}>
//             {idx + 1}
//           </div>
//         );
//       })}
//     </div>
//   </div>

//   <div className={styles.timelineWrap}>
//     <div className={styles.timelineHeader}>
//       <div style={{ fontWeight: 700 }}>Timeline</div>
//       <div style={{ color: "var(--muted)" }}>08:00 — 18:00</div>
//     </div>

//     <div className={styles.timelineGrid}>
//       {["Me","Mark","John","Anna","Tina"].map((p, i) => (
//         <div key={p} className={styles.timelineRow}>
//           <div className={styles.personName}>{p}</div>
//           <div className={styles.timelineBarArea}>
//             {/* example bars: set left and width in % inline to mimic schedule */}
//             <div className={styles.timelineBar} style={{ left: `${10 + i*5}%`, width: `${20 + i*8}%` }} />
//             {/* current time indicator at 45% */}
//             {i === 0 && <div className={styles.currentIndicator} style={{ left: "45%" }} />}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

//     <div className={styles.bookingWizard}>
//       <h3>Booking Jadwal Konsultasi</h3>

//       {/* Steps */}
//       {/* Step 1 */}
//       {step === 1 && (
//         <div className={styles.stepBox}>
//           <label className={styles.label}>Pilih tanggal:</label>
//           <input className={styles.input} type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
//           <label className={styles.label}>Pilih durasi:</label>
//           <select className={styles.select} value={durasi} onChange={(e) => setDurasi(e.target.value)}>
//             {durasiOptions.map((d) => (
//               <option key={d} value={d}>{d} menit</option>
//             ))}
//           </select>
//           <label className={styles.label}>Pilih lokasi:</label>
//           <select className={styles.select} value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
//             {lokasiOptions.map((loc) => (
//               <option key={loc} value={loc}>{loc}</option>
//             ))}
//           </select>
//           <div className={styles.navBtn}>
//             <button disabled={!tanggal} onClick={() => setStep(2)}>Next</button>
//           </div>
//         </div>
//       )}

//       {/* Step 2 */}
//       {step === 2 && (
//         <div className={styles.stepBox}>
//           <label className={styles.label}>Pilih jam:</label>
//           <div className={styles.gridSlot}>
//             {jamList.map((jam) => (
//               <button
//                 type="button"
//                 key={jam}
//                 onClick={() => setSelectedJam(jam)}
//                 disabled={jadwalTerisi.includes(jam)}
//                 className={`${styles.slotButton} ${selectedJam === jam ? styles.active : ""} ${jadwalTerisi.includes(jam) ? styles.disabled : ""}`}
//               >
//                 {jam}
//               </button>
//             ))}
//           </div>
//           <div className={styles.navBtn}>
//             <button onClick={() => setStep(1)}>Back</button>
//             <button disabled={!selectedJam} onClick={() => setStep(3)}>Next</button>
//           </div>
//         </div>
//       )}

//       {/* Step 3 */}
//       {step === 3 && (
//         <div className={styles.stepBox}>
//           <label className={styles.label}>Isi data diri:</label>
//           <input className={styles.input} type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
//           <input className={styles.input} type="tel" placeholder="No. WhatsApp" value={kontak} onChange={(e) => setKontak(e.target.value)} required />
//           <textarea className={styles.textarea} placeholder="Keperluan" value={keperluan} onChange={(e) => setKeperluan(e.target.value)} required />
//           <div className={styles.navBtn}>
//             <button onClick={() => setStep(2)}>Back</button>
//             <button onClick={handleSubmit}>Kirim & Redirect WhatsApp</button>
//           </div>
//         </div>
//       )}

//       {/* Success Message */}
//       {success && bookingLink && (
//         <div>
//           <p className={styles.success}>Janji berhasil dikirim! Anda akan diarahkan ke WhatsApp.</p>
//           <p><strong>Link Booking:</strong></p>
//           <input className={styles.input} type="text" value={bookingLink} readOnly onClick={(e) => (e.target as HTMLInputElement).select()} />
//           <a href={bookingLink} target="_blank" rel="noopener noreferrer">
//             <button className={styles.primaryBtn} style={{ marginTop: "1rem" }}>Lihat Detail Booking</button>
//           </a>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }


// // components/BookingWizard.tsx
// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { db } from "../../lib/firebase2";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   serverTimestamp,
//   DocumentData,
// } from "firebase/firestore";
// import emailjs from "@emailjs/browser";
// import styles from "../styles/SmeetBooking.module.scss";
// import { useSession, signIn } from "next-auth/react";

// /* ---------- Types ---------- */
// type AgendaDoc = {
//   id: string;
//   jam?: string; // "HH:MM"
//   durasi?: number | string; // minutes or string number
//   nama?: string;
//   kontak?: string;
//   keperluan?: string;
//   tanggal?: string; // YYYY-MM-DD
//   [k: string]: any;
// };

// type DateChip = {
//   label: string;
//   iso: string;
//   dayName: string;
// };

// /* ---------- Constants ---------- */
// const jamList = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
// const durasiOptions = ["15", "30", "45", "60"];
// const lokasiOptions = ["Zoom", "Phone call", "In-person", "WhatsApp", "Custom"];

// /* helper: parse "HH:MM" -> minutes since midnight */
// function hhmmToMinutes(t: string) {
//   const [hhStr, mmStr] = (t || "08:00").split(":");
//   const hh = parseInt(hhStr || "0", 10);
//   const mm = parseInt(mmStr || "0", 10);
//   return hh * 60 + mm;
// }

// /* timeline range constants (minutes) */
// const TL_START = 8 * 60; // 08:00
// const TL_END = 18 * 60; // 18:00
// const TL_TOTAL = TL_END - TL_START; // 600 minutes

// export default function BookingWizard() {
//   /* ---------- core form states ---------- */
//   const [step, setStep] = useState<number>(1);
//   const [tanggal, setTanggal] = useState<string>("");
//   const [jadwalTerisi, setJadwalTerisi] = useState<string[]>([]);
//   const [selectedJam, setSelectedJam] = useState<string>("");
//   const [durasi, setDurasi] = useState<string>("30");
//   const [lokasi, setLokasi] = useState<string>("WhatsApp");
//   const [nama, setNama] = useState<string>("");
//   const [kontak, setKontak] = useState<string>("");
//   const [keperluan, setKeperluan] = useState<string>("");
//   const [success, setSuccess] = useState<boolean>(false);
//   const [bookingLink, setBookingLink] = useState<string>("");
//   const { data: session } = useSession();

//   /* ---------- calendar & timeline states ---------- */
//   const [selectedDate, setSelectedDate] = useState<string>(() => {
//     const d = new Date();
//     return d.toISOString().slice(0, 10);
//   });
//   const [eventsForDate, setEventsForDate] = useState<AgendaDoc[] | null>(null); // null = not loaded
//   const [loadingEvents, setLoadingEvents] = useState<boolean>(false);

//   /* fetch jadwal terisi for form tanggal (to disable times) */
//   useEffect(() => {
//     if (!tanggal) {
//       setJadwalTerisi([]);
//       return;
//     }

//     const fetchTerisi = async () => {
//       try {
//         const q = query(collection(db, "agenda"), where("tanggal", "==", tanggal));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => {
//           const raw = doc.data() as DocumentData;
//           return (raw?.jam as string) || "";
//         }).filter(Boolean);
//         setJadwalTerisi(data);
//       } catch (err) {
//         console.error("fetchTerisi error", err);
//         setJadwalTerisi([]);
//       }
//     };

//     // weekend quick rule
//     const hari = new Date(tanggal).getDay();
//     if (hari === 0 || hari === 6) {
//       setJadwalTerisi(jamList);
//     } else {
//       fetchTerisi();
//     }
//   }, [tanggal]);

//   /* fetch events for selectedDate (timeline) */
//   useEffect(() => {
//     if (!selectedDate) {
//       setEventsForDate(null);
//       return;
//     }
//     const fetchForDate = async () => {
//       setLoadingEvents(true);
//       try {
//         const q = query(collection(db, "agenda"), where("tanggal", "==", selectedDate));
//         const snap = await getDocs(q);
//         const docs: AgendaDoc[] = snap.docs.map((d) => {
//           const raw = d.data() as DocumentData;
//           return {
//             id: d.id,
//             jam: raw.jam,
//             // prefer number for durasi; if string, convert
//             durasi: raw.durasi ? (typeof raw.durasi === "string" ? Number(raw.durasi) : raw.durasi) : (raw.duration ? Number(raw.duration) : 30),
//             nama: raw.nama || raw.keperluan || "Booking",
//             kontak: raw.kontak || "",
//             keperluan: raw.keperluan || "",
//             tanggal: raw.tanggal || selectedDate,
//             ...raw,
//           };
//         });
//         setEventsForDate(docs);
//       } catch (err) {
//         console.error("Failed to load events:", err);
//         setEventsForDate([]);
//       } finally {
//         setLoadingEvents(false);
//       }
//     };
//     fetchForDate();
//   }, [selectedDate]);

//   /* sync tanggal -> selectedDate */
//   useEffect(() => {
//     if (tanggal) setSelectedDate(tanggal);
//   }, [tanggal]);

//   /* date chips: next 14 days */
//   const dateChips: DateChip[] = useMemo(() => {
//     const base = new Date();
//     const arr: DateChip[] = [];
//     for (let i = 0; i < 14; i++) {
//       const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i);
//       arr.push({
//         label: d.getDate().toString(),
//         iso: d.toISOString().slice(0, 10),
//         dayName: d.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase(),
//       });
//     }
//     return arr;
//   }, []);

//   /* email function */
//   const sendEmailReminder = async (toEmail: string, subject: string, message: string) => {
//     try {
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//         {
//           to_email: toEmail,
//           subject,
//           message,
//         },
//         process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
//       );
//     } catch (error) {
//       console.error("Email sending failed", error);
//     }
//   };

//   /* submit handler */
//   const handleSubmit = async () => {
//     try {
//       const docRef = await addDoc(collection(db, "agenda"), {
//         tanggal,
//         jam: selectedJam,
//         durasi,
//         lokasi,
//         nama,
//         kontak,
//         keperluan,
//         timestamp: serverTimestamp(),
//       });

//       const link = `${window.location.origin}/booking/${docRef.id}`;
//       setBookingLink(link);

//       const emailMessage = `Hi ${nama},\n\nBerikut adalah detail booking Anda:\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nKeperluan: ${keperluan}\n\nLihat detail: ${link}`;
//       await sendEmailReminder(`${kontak}@email.com`, "Konfirmasi Booking Konsultasi", emailMessage);

//       if (session?.user?.email && (session as any)?.accessToken) {
//         const startDateTime = new Date(`${tanggal}T${selectedJam}:00`);
//         const endDateTime = new Date(startDateTime.getTime() + Number(durasi) * 60000);
//         await fetch("/api/calendar", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             summary: `Meeting dengan ${nama}`,
//             description: keperluan,
//             start: startDateTime.toISOString(),
//             end: endDateTime.toISOString(),
//           }),
//         });
//       } else {
//         alert("Login Google dibutuhkan untuk sinkronisasi ke Kalender");
//         signIn("google");
//       }

//       const pesan = `Halo Admin, saya ingin membuat janji temu:\n\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nNama: ${nama}\nKontak: ${kontak}\nKeperluan: ${keperluan}`;
//       const noHP = "6285817298071";
//       const whatsappLink = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;
//       setSuccess(true);
//       window.open(whatsappLink, "_blank");
//     } catch (err) {
//       console.error("Submit booking failed:", err);
//     }
//   };

//   /* convert event to left/width% relative to timeline */
//   function eventToStyle(e: AgendaDoc) {
//     const jam = e.jam || "08:00";
//     const dur = Number(e.durasi || 30);
//     const startMin = hhmmToMinutes(jam);
//     const leftMinutes = Math.max(0, Math.min(TL_TOTAL, startMin - TL_START));
//     const widthMinutes = Math.max(8, Math.min(TL_TOTAL - leftMinutes, dur));
//     const leftPct = (leftMinutes / TL_TOTAL) * 100;
//     const widthPct = (widthMinutes / TL_TOTAL) * 100;
//     return { left: `${leftPct}%`, width: `${widthPct}%` };
//   }

//   return (
//     <div className={styles.bookingWrap}>
//       <div className={styles.calendarTimeline}>
//         {/* calendar / chips */}
//         <div className={styles.miniCalendar}>
//           <div className={styles.monthRow}>
//             <div className={styles.monthTitle}>
//               {new Date(selectedDate).toLocaleString(undefined, { month: "long", year: "numeric" })}
//             </div>
//           </div>

//           <div className={styles.dateChips}>
//             {dateChips.map((d) => (
//               <div
//                 key={d.iso}
//                 className={`${styles.chip} ${selectedDate === d.iso ? styles.chipActive : ""}`}
//                 onClick={() => {
//                   setSelectedDate(d.iso);
//                   setTanggal(d.iso);
//                 }}
//               >
//                 <div className={styles.chipDay}>{d.dayName}</div>
//                 <div className={styles.chipDate}>{d.label}</div>
//               </div>
//             ))}
//           </div>

//           <div className={styles.miniCalendarFooter}>
//             <div className={styles.smallMuted}>Pilih tanggal untuk melihat jadwal</div>
//           </div>
//         </div>

//         {/* timeline */}
//         <div className={styles.timelineWrap}>
//           <div className={styles.timelineHeader}>
//             <div style={{ fontWeight: 700 }}>Timeline untuk {selectedDate}</div>
//             <div style={{ color: "var(--muted)" }}>{`${"08:00"} — ${"18:00"}`}</div>
//           </div>

//           <div className={styles.timelineGrid}>
//             {loadingEvents ? (
//               <div className={styles.noEventsMsg}>Memuat jadwal...</div>
//             ) : eventsForDate && eventsForDate.length > 0 ? (
//               eventsForDate.map((ev) => {
//                 const style = eventToStyle(ev);
//                 return (
//                   <div key={ev.id} className={styles.timelineRow}>
//                     <div className={styles.personName}>{ev.nama || "Booking"}</div>
//                     <div className={styles.timelineBarArea}>
//                       <div
//                         className={styles.timelineBar}
//                         style={{ left: style.left, width: style.width }}
//                         title={`${ev.jam} • ${ev.durasi} menit • ${ev.nama}`}
//                       >
//                         {ev.nama}
//                       </div>
//                       <div className={styles.timelineTimeLabel} style={{ left: style.left }}>
//                         {ev.jam}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className={styles.noEventsMsg}>Belum ada jadwal untuk tanggal ini.</div>
//             )}
//           </div>
//         </div>

//         {/* the booking form */}
//         <div className={styles.formWrap}>
//           <div className={styles.bookingWizard}>
//             <h3>Booking Jadwal Konsultasi</h3>

//             {/* Step 1 */}
//             {step === 1 && (
//               <div className={styles.stepBox}>
//                 <label className={styles.label}>Pilih tanggal:</label>
//                 <input
//                   className={styles.input}
//                   type="date"
//                   value={tanggal}
//                   onChange={(e) => {
//                     setTanggal(e.target.value);
//                     setSelectedDate(e.target.value);
//                   }}
//                 />
//                 <label className={styles.label}>Pilih durasi:</label>
//                 <select className={styles.select} value={durasi} onChange={(e) => setDurasi(e.target.value)}>
//                   {durasiOptions.map((d) => (
//                     <option key={d} value={d}>
//                       {d} menit
//                     </option>
//                   ))}
//                 </select>
//                 <label className={styles.label}>Pilih lokasi:</label>
//                 <select className={styles.select} value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
//                   {lokasiOptions.map((loc) => (
//                     <option key={loc} value={loc}>
//                       {loc}
//                     </option>
//                   ))}
//                 </select>

//                 <div className={styles.navBtn}>
//                   <button disabled={!tanggal} onClick={() => setStep(2)}>
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2 */}
//             {step === 2 && (
//               <div className={styles.stepBox}>
//                 <label className={styles.label}>Pilih jam:</label>
//                 <div className={styles.gridSlot}>
//                   {jamList.map((jam) => (
//                     <button
//                       key={jam}
//                       type="button"
//                       onClick={() => setSelectedJam(jam)}
//                       disabled={jadwalTerisi.includes(jam)}
//                       className={`${styles.slotButton} ${selectedJam === jam ? styles.active : ""} ${
//                         jadwalTerisi.includes(jam) ? styles.disabled : ""
//                       }`}
//                     >
//                       {jam}
//                     </button>
//                   ))}
//                 </div>

//                 <div className={styles.navBtn}>
//                   <button onClick={() => setStep(1)}>Back</button>
//                   <button disabled={!selectedJam} onClick={() => setStep(3)}>
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 3 */}
//             {step === 3 && (
//               <div className={styles.stepBox}>
//                 <label className={styles.label}>Isi data diri:</label>
//                 <input className={styles.input} type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
//                 <input className={styles.input} type="tel" placeholder="No. WhatsApp" value={kontak} onChange={(e) => setKontak(e.target.value)} />
//                 <textarea className={styles.textarea} placeholder="Keperluan" value={keperluan} onChange={(e) => setKeperluan(e.target.value)} />
//                 <div className={styles.navBtn}>
//                   <button onClick={() => setStep(2)}>Back</button>
//                   <button onClick={handleSubmit}>Kirim &amp; Redirect WhatsApp</button>
//                 </div>
//               </div>
//             )}

//             {/* Success */}
//             {success && bookingLink && (
//               <div>
//                 <p className={styles.success}>Janji berhasil dikirim! Anda akan diarahkan ke WhatsApp.</p>
//                 <p>
//                   <strong>Link Booking:</strong>
//                 </p>
//                 <input className={styles.input} type="text" value={bookingLink} readOnly onClick={(e) => (e.target as HTMLInputElement).select()} />
//                 <a href={bookingLink} target="_blank" rel="noreferrer">
//                   <button className={styles.primaryBtn} style={{ marginTop: 12 }}>
//                     Lihat Detail Booking
//                   </button>
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//frontend
// components/BookingWizard.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";
import styles from "../styles/SmeetBooking.module.scss";
import { useSession, signIn } from "next-auth/react";

/* ---------- Types ---------- */
type AgendaDoc = {
  id: string;
  jam?: string; // "HH:MM"
  durasi?: number | string; // minutes or string number
  nama?: string;
  kontak?: string;
  keperluan?: string;
  tanggal?: string; // YYYY-MM-DD
  [k: string]: any;
};

type DateChip = {
  label: string;
  iso: string;
  dayName: string;
};

/* ---------- Constants ---------- */
const jamList = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const durasiOptions = ["15", "30", "45", "60"];
const lokasiOptions = ["Zoom", "Phone call", "In-person", "WhatsApp", "Custom"];

/* helper: parse "HH:MM" -> minutes since midnight */
function hhmmToMinutes(t: string) {
  const [hhStr, mmStr] = (t || "08:00").split(":");
  const hh = parseInt(hhStr || "0", 10);
  const mm = parseInt(mmStr || "0", 10);
  return hh * 60 + mm;
}

/* format Date -> HH:MM */
function dateToHHMM(d: Date) {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/* timeline range constants (minutes) */
const TL_START = 8 * 60; // 08:00
const TL_END = 18 * 60; // 18:00
const TL_TOTAL = TL_END - TL_START; // 600 minutes

export default function BookingWizard() {
  /* ---------- core form states ---------- */
  const [step, setStep] = useState<number>(1);
  const [tanggal, setTanggal] = useState<string>("");
  const [jadwalTerisi, setJadwalTerisi] = useState<string[]>([]);
  const [selectedJam, setSelectedJam] = useState<string>("");
  const [durasi, setDurasi] = useState<string>("30");
  const [lokasi, setLokasi] = useState<string>("WhatsApp");
  const [nama, setNama] = useState<string>("");
  const [kontak, setKontak] = useState<string>("");
  const [keperluan, setKeperluan] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [bookingLink, setBookingLink] = useState<string>("");
  const { data: session } = useSession();

  /* ---------- calendar & timeline states ---------- */
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [eventsForDate, setEventsForDate] = useState<AgendaDoc[] | null>(null); // null = not loaded
  const [loadingEvents, setLoadingEvents] = useState<boolean>(false);

  /* fetch jadwal terisi for form tanggal (to disable times)
     <-- FIXED: robust normalization of jam values (Timestamp/Date/string) -->
  */
  useEffect(() => {
    if (!tanggal) {
      setJadwalTerisi([]);
      return;
    }

    const fetchTerisi = async () => {
      try {
        const q = query(collection(db, "agenda"), where("tanggal", "==", tanggal));
        const snapshot = await getDocs(q);

        if (!snapshot || snapshot.empty) {
          // no docs -> empty array (no times blocked)
          setJadwalTerisi([]);
          return;
        }

        const rawTimes = snapshot.docs
          .map((doc) => {
            const raw = doc.data() as DocumentData;
            let jamVal = raw?.jam;

            // Handle Firestore Timestamp (has toDate), Date, or string
            if (jamVal && typeof jamVal === "object") {
              // Firestore Timestamp
              if (typeof (jamVal as any).toDate === "function") {
                try {
                  const dt: Date = (jamVal as any).toDate();
                  return dateToHHMM(dt);
                } catch {
                  return null;
                }
              }
              // Plain Date object
              if (jamVal instanceof Date) {
                return dateToHHMM(jamVal);
              }
              // fallback: attempt toString
              jamVal = String(jamVal);
            }

            if (typeof jamVal === "string") {
              const trimmed = jamVal.trim();
              // normalize to HH:MM, cut seconds if present
              const mm = trimmed.split(":");
              if (mm.length >= 2) {
                return `${mm[0].padStart(2, "0")}:${mm[1].padStart(2, "0")}`;
              }
              return trimmed;
            }
            return null;
          })
          .filter(Boolean) as string[];

        // ensure unique and valid entries only (and intersect with jamList to avoid weird values)
        const normalized = Array.from(new Set(rawTimes))
          .map((s) => s.slice(0, 5)) // ensure HH:MM length
          .filter((s) => jamList.includes(s)); // only keep known slots

        setJadwalTerisi(normalized);
      } catch (err) {
        console.error("fetchTerisi error", err);
        setJadwalTerisi([]);
      }
    };

    // weekend quick rule: only if the chosen date is actually Saturday/Sunday
    const hari = new Date(tanggal + "T00:00:00").getDay();
    if (hari === 0 || hari === 6) {
      // keep behavior if you want weekends full
      setJadwalTerisi(jamList.slice()); // copy
    } else {
      fetchTerisi();
    }
  }, [tanggal]);

  /* fetch events for selectedDate (timeline) */
  useEffect(() => {
    if (!selectedDate) {
      setEventsForDate(null);
      return;
    }
    const fetchForDate = async () => {
      setLoadingEvents(true);
      try {
        const q = query(collection(db, "agenda"), where("tanggal", "==", selectedDate));
        const snap = await getDocs(q);
        if (!snap || snap.empty) {
          setEventsForDate([]);
          setLoadingEvents(false);
          return;
        }

        const docs: AgendaDoc[] = snap.docs.map((d) => {
          const raw = d.data() as DocumentData;
          // normalize jam value to HH:MM
          let jamVal = raw.jam;
          if (jamVal && typeof jamVal === "object") {
            if (typeof (jamVal as any).toDate === "function") {
              try {
                jamVal = dateToHHMM((jamVal as any).toDate());
              } catch {
                jamVal = undefined;
              }
            } else if (jamVal instanceof Date) {
              jamVal = dateToHHMM(jamVal as Date);
            } else {
              jamVal = String(jamVal);
            }
          } else if (typeof jamVal === "string") {
            jamVal = jamVal.trim().split(":").slice(0, 2).map((p, i) => (i === 0 ? p.padStart(2, "0") : p.padStart(2, "0"))).join(":");
          }

          return {
            id: d.id,
            jam: jamVal,
            durasi: raw.durasi ? (typeof raw.durasi === "string" ? Number(raw.durasi) : raw.durasi) : (raw.duration ? Number(raw.duration) : 30),
            nama: raw.nama || raw.keperluan || "Booking",
            kontak: raw.kontak || "",
            keperluan: raw.keperluan || "",
            tanggal: raw.tanggal || selectedDate,
            ...raw,
          };
        });
        setEventsForDate(docs);
      } catch (err) {
        console.error("Failed to load events:", err);
        setEventsForDate([]);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchForDate();
  }, [selectedDate]);

  /* sync tanggal -> selectedDate */
  useEffect(() => {
    if (tanggal) setSelectedDate(tanggal);
  }, [tanggal]);

  /* date chips: next 14 days */
  const dateChips: DateChip[] = useMemo(() => {
    const base = new Date();
    const arr: DateChip[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i);
      arr.push({
        label: d.getDate().toString(),
        iso: d.toISOString().slice(0, 10),
        dayName: d.toLocaleDateString(undefined, { weekday: "short" }).toUpperCase(),
      });
    }
    return arr;
  }, []);

  /* email function */
  const sendEmailReminder = async (toEmail: string, subject: string, message: string) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_email: toEmail,
          subject,
          message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
    } catch (error) {
      console.error("Email sending failed", error);
    }
  };

  /* submit handler */
  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "agenda"), {
        tanggal,
        jam: selectedJam,
        durasi,
        lokasi,
        nama,
        kontak,
        keperluan,
        timestamp: serverTimestamp(),
      });

      // 🔔 NOTIFIKASI EMAIL VIA BACKEND (SENDGRID / SMTP)
await fetch(
  `${process.env.NEXT_PUBLIC_API_BASE || "https://listfileswmk.vercel.app"}/sendEmail`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nama,
      // email: kontak, // kalau ini WA, tetap kirim sebagai identifier
      email: "no-reply@wmk.co.id",
      telepon: kontak,
      subjek: "Penjadwalan Konsultasi Baru",
      pesan: `
Penjadwalan baru masuk dari website:

Tanggal   : ${tanggal}
Jam       : ${selectedJam}
Durasi    : ${durasi} menit
Lokasi    : ${lokasi}

Nama      : ${nama}
Kontak    : ${kontak}
Keperluan : ${keperluan}

ID Booking: ${docRef.id}
      `,
    }),
  }
);


      const link = `${window.location.origin}/booking/${docRef.id}`;
      setBookingLink(link);

      const emailMessage = `Hi ${nama},\n\nBerikut adalah detail booking Anda:\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nKeperluan: ${keperluan}\n\nLihat detail: ${link}`;
      await sendEmailReminder(`${kontak}@email.com`, "Konfirmasi Booking Konsultasi", emailMessage);
      const emailMessageAdmin = `Halo Admin,

Ada booking konsultasi baru dengan detail berikut:

Tanggal   : ${tanggal}
Jam       : ${selectedJam}
Durasi    : ${durasi} menit
Lokasi    : ${lokasi}

Nama      : ${nama}
Kontak    : ${kontak}
Keperluan : ${keperluan}

Link Booking:
${link}
`;

await sendEmailReminder(
  "ptwaemandirikarya@wmk.co.id",
  "Booking Konsultasi Baru (Admin)",
  emailMessageAdmin
);


      if (session?.user?.email && (session as any)?.accessToken) {
        const startDateTime = new Date(`${tanggal}T${selectedJam}:00`);
        const endDateTime = new Date(startDateTime.getTime() + Number(durasi) * 60000);
        await fetch("/api/calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            summary: `Meeting dengan ${nama}`,
            description: keperluan,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
          }),
        });
      } else {
        alert("Login Google dibutuhkan untuk sinkronisasi ke Kalender");
        signIn("google");
      }

      // 📧 5. EMAIL VIA SENDBOOKING (Gmail SMTP — yang baru)
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE || "https://listfileswmk.vercel.app"}/sendBooking`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          kontak,
          tanggal,
          jam: selectedJam,
          durasi,
          lokasi,
          keperluan,
          bookingId: docRef.id,
          bookingLink: link,
        }),
      }
    );

      const pesan = `Halo Admin, saya ingin membuat janji temu:\n\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nNama: ${nama}\nKontak: ${kontak}\nKeperluan: ${keperluan}`;
      const noHP = "6281219122595";
      const whatsappLink = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;
      setSuccess(true);
      window.open(whatsappLink, "_blank");
    } catch (err) {
      console.error("Submit booking failed:", err);
    }
  };

  /* convert event to left/width% relative to timeline */
  function eventToStyle(e: AgendaDoc) {
    const jam = e.jam || "08:00";
    const dur = Number(e.durasi || 30);
    const startMin = hhmmToMinutes(jam);
    const leftMinutes = Math.max(0, Math.min(TL_TOTAL, startMin - TL_START));
    const widthMinutes = Math.max(8, Math.min(TL_TOTAL - leftMinutes, dur));
    const leftPct = (leftMinutes / TL_TOTAL) * 100;
    const widthPct = (widthMinutes / TL_TOTAL) * 100;
    return { left: `${leftPct}%`, width: `${widthPct}%` };
  }

  return (
    <div className={styles.bookingWrap}>
      <div className={styles.calendarTimeline}>
        {/* calendar / chips */}
        <div className={styles.miniCalendar}>
          <div className={styles.monthRow}>
            <div className={styles.monthTitle}>
              {new Date(selectedDate).toLocaleString(undefined, { month: "long", year: "numeric" })}
            </div>
          </div>

          <div className={styles.dateChips}>
            {dateChips.map((d) => (
              <div
                key={d.iso}
                className={`${styles.chip} ${selectedDate === d.iso ? styles.chipActive : ""}`}
                onClick={() => {
                  setSelectedDate(d.iso);
                  setTanggal(d.iso);
                }}
              >
                <div className={styles.chipDay}>{d.dayName}</div>
                <div className={styles.chipDate}>{d.label}</div>
              </div>
            ))}
          </div>

          <div className={styles.miniCalendarFooter}>
            <div className={styles.smallMuted}>Pilih tanggal untuk melihat jadwal</div>
          </div>
        </div>

        {/* timeline */}
        <div className={styles.timelineWrap}>
          <div className={styles.timelineHeader}>
            <div style={{ fontWeight: 700 }}>Timeline untuk {selectedDate}</div>
            <div style={{ color: "var(--muted)" }}>{`${"08:00"} — ${"18:00"}`}</div>
          </div>

          <div className={styles.timelineGrid}>
            {loadingEvents ? (
              <div className={styles.noEventsMsg}>Memuat jadwal...</div>
            ) : eventsForDate && eventsForDate.length > 0 ? (
              eventsForDate.map((ev) => {
                const style = eventToStyle(ev);
                return (
                  <div key={ev.id} className={styles.timelineRow}>
                    <div className={styles.personName}>{ev.nama || "Booking"}</div>
                    <div className={styles.timelineBarArea}>
                      <div
                        className={styles.timelineBar}
                        style={{ left: style.left, width: style.width }}
                        title={`${ev.jam} • ${ev.durasi} menit • ${ev.nama}`}
                      >
                        {ev.nama}
                      </div>
                      <div className={styles.timelineTimeLabel} style={{ left: style.left }}>
                        {ev.jam}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.noEventsMsg}>Belum ada jadwal untuk tanggal ini.</div>
            )}
          </div>
        </div>

        {/* the booking form */}
        <div className={styles.formWrap}>
          <div className={styles.bookingWizard}>
            <h3>Booking Jadwal Konsultasi</h3>

            {/* Step 1 */}
            {step === 1 && (
              <div className={styles.stepBox}>
                <label className={styles.label}>Pilih tanggal:</label>
                <input
                  className={styles.input}
                  type="date"
                  value={tanggal}
                  onChange={(e) => {
                    setTanggal(e.target.value);
                    setSelectedDate(e.target.value);
                  }}
                />
                <label className={styles.label}>Pilih durasi:</label>
                <select className={styles.select} value={durasi} onChange={(e) => setDurasi(e.target.value)}>
                  {durasiOptions.map((d) => (
                    <option key={d} value={d}>
                      {d} menit
                    </option>
                  ))}
                </select>
                <label className={styles.label}>Pilih lokasi:</label>
                <select className={styles.select} value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
                  {lokasiOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>

                <div className={styles.navBtn}>
                  <button disabled={!tanggal} onClick={() => setStep(2)}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className={styles.stepBox}>
                <label className={styles.label}>Pilih jam:</label>
                <div className={styles.gridSlot}>
                  {jamList.map((jam) => (
                    <button
                      key={jam}
                      type="button"
                      onClick={() => setSelectedJam(jam)}
                      disabled={jadwalTerisi.includes(jam)}
                      className={`${styles.slotButton} ${selectedJam === jam ? styles.active : ""} ${
                        jadwalTerisi.includes(jam) ? styles.disabled : ""
                      }`}
                    >
                      {jam}
                    </button>
                  ))}
                </div>

                <div className={styles.navBtn}>
                  <button onClick={() => setStep(1)}>Back</button>
                  <button disabled={!selectedJam} onClick={() => setStep(3)}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className={styles.stepBox}>
                <label className={styles.label}>Isi data diri:</label>
                <input className={styles.input} type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
                <input className={styles.input} type="tel" placeholder="No. WhatsApp" value={kontak} onChange={(e) => setKontak(e.target.value)} />
                <textarea className={styles.textarea} placeholder="Keperluan" value={keperluan} onChange={(e) => setKeperluan(e.target.value)} />
                <div className={styles.navBtn}>
                  <button onClick={() => setStep(2)}>Back</button>
                  <button onClick={handleSubmit}>Kirim &amp; Redirect WhatsApp</button>
                </div>
              </div>
            )}

            {/* Success */}
            {success && bookingLink && (
              <div>
                <p className={styles.success}>Janji berhasil dikirim! Anda akan diarahkan ke WhatsApp.</p>
                <p>
                  <strong>Link Booking:</strong>
                </p>
                <input className={styles.input} type="text" value={bookingLink} readOnly onClick={(e) => (e.target as HTMLInputElement).select()} />
                <a href={bookingLink} target="_blank" rel="noreferrer">
                  <button className={styles.primaryBtn} style={{ marginTop: 12 }}>
                    Lihat Detail Booking
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

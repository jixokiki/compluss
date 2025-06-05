// "use client";

// import { useEffect, useState } from "react";
// import { db } from "../../lib/firebase";
// import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
// import styles from "../styles/SmeetBooking.module.scss";

// const jamOptions = [
//   "08:00", "09:00", "10:00", "11:00", "12:00",
//   "13:00", "14:00", "15:00", "16:00", "17:00",
//   "18:00", "19:00", "20:00"
// ];

// export default function SmeetBooking() {
//   const [tanggal, setTanggal] = useState("");
//   const [nama, setNama] = useState("");
//   const [kontak, setKontak] = useState("");
//   const [keperluan, setKeperluan] = useState("");
//   const [jadwalTerisi, setJadwalTerisi] = useState<string[]>([]);

//   useEffect(() => {
//     if (tanggal) {
//       const cekJadwal = async () => {
//         const q = query(collection(db, "agenda"), where("tanggal", "==", tanggal));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map(doc => doc.data().jam);
//         setJadwalTerisi(data);
//       };
//       cekJadwal();
//     }
//   }, [tanggal]);

//   const isFull = jadwalTerisi.length >= jamOptions.length;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = {
//       tanggal,
//       jam: jamOptions.find(j => !jadwalTerisi.includes(j)),
//       nama,
//       kontak,
//       keperluan,
//       timestamp: serverTimestamp()
//     };

//     await addDoc(collection(db, "agenda"), formData);
//     alert("Agenda berhasil dibuat!");
//   };

//   return (
//     <div className={styles.smeetBooking}>
//       <h3>Booking Janji Temu</h3>
//       <form onSubmit={handleSubmit}>
//         <input type="date" required value={tanggal} onChange={e => setTanggal(e.target.value)} />
//         <input type="text" required placeholder="Nama" value={nama} onChange={e => setNama(e.target.value)} />
//         <input type="tel" required placeholder="No. Kontak (WA)" value={kontak} onChange={e => setKontak(e.target.value)} />
//         <textarea required placeholder="Keperluan" value={keperluan} onChange={e => setKeperluan(e.target.value)} />
        
//         {tanggal && (
//           <div className={styles.jadwalGrid}>
//             {jamOptions.map(jam => (
//               <button
//                 key={jam}
//                 type="button"
//                 disabled={jadwalTerisi.includes(jam)}
//                 className={jadwalTerisi.includes(jam) ? styles.penuh : ""}
//               >
//                 {jam}
//               </button>
//             ))}
//           </div>
//         )}

//         <button type="submit" disabled={isFull}>Buat Janji</button>
//         {isFull && <p className={styles.notice}>Maaf, semua slot di tanggal ini sudah penuh.</p>}
//       </form>
//     </div>
//   );
// }




//JANGAN DIHAPUS IKI
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
//   serverTimestamp,
// } from "firebase/firestore";
// import styles from "../styles/SmeetBooking.module.scss";

// const jamList = [
//   "08:00", "09:00", "10:00", "11:00", "12:00",
//   "13:00", "14:00", "15:00", "16:00", "17:00",
// ];

// export default function BookingWizard() {
//   const [step, setStep] = useState(1);
//   const [tanggal, setTanggal] = useState("");
//   const [jadwalTerisi, setJadwalTerisi] = useState<string[]>([]);
//   const [selectedJam, setSelectedJam] = useState("");
//   const [nama, setNama] = useState("");
//   const [kontak, setKontak] = useState("");
//   const [keperluan, setKeperluan] = useState("");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     if (tanggal) {
//       const fetchTerisi = async () => {
//         const q = query(collection(db, "agenda"), where("tanggal", "==", tanggal));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => doc.data().jam);
//         setJadwalTerisi(data);
//       };
//       fetchTerisi();
//     }
//   }, [tanggal]);

//   const handleSubmit = async () => {
//     await addDoc(collection(db, "agenda"), {
//       tanggal,
//       jam: selectedJam,
//       nama,
//       kontak,
//       keperluan,
//       timestamp: serverTimestamp(),
//     });

//     const pesan = `Halo Admin, saya ingin membuat janji temu:\n\nTanggal: ${tanggal}\nJam: ${selectedJam}\nNama: ${nama}\nKontak: ${kontak}\nKeperluan: ${keperluan}`;
//     const noHP = "6285817298071";
//     const whatsappLink = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;
//     setSuccess(true);
//     window.open(whatsappLink, "_blank");
//   };

//   return (
//     <div className={styles.bookingWizard}>
//       <h3>Booking Jadwal Konsultasi</h3>

//       {step === 1 && (
//         <div className={styles.stepBox}>
//           <p>Pilih tanggal:</p>
//           <input
//             type="date"
//             value={tanggal}
//             onChange={(e) => setTanggal(e.target.value)}
//             required
//           />
//           <div className={styles.navBtn}>
//             <button disabled={!tanggal} onClick={() => setStep(2)}>Next</button>
//           </div>
//         </div>
//       )}

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

//       {step === 3 && (
//         <div className={styles.stepBox}>
//           <p>Isi data diri:</p>
//           <input
//             type="text"
//             placeholder="Nama"
//             value={nama}
//             onChange={(e) => setNama(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="No. WhatsApp"
//             value={kontak}
//             onChange={(e) => setKontak(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Keperluan"
//             value={keperluan}
//             onChange={(e) => setKeperluan(e.target.value)}
//             required
//           />
//           <div className={styles.navBtn}>
//             <button onClick={() => setStep(2)}>Back</button>
//             <button onClick={handleSubmit}>Kirim & Redirect WhatsApp</button>
//           </div>
//         </div>
//       )}

//       {success && <p className={styles.success}>Janji berhasil dikirim! Anda akan diarahkan ke WhatsApp.</p>}
//     </div>
//   );
// }



//JANGAN DIHAPUS YAAA IKIII INI SUDAH FIX
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
// import styles from "../styles/SmeetBooking.module.scss";

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

//   useEffect(() => {
//     if (tanggal) {
//       const hari = new Date(tanggal).getDay();
//       if (hari === 0 || hari === 6) {
//         setJadwalTerisi(jamList); // disable semua jika weekend
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

//     console.log(`Email reminder: Kirim ke ${kontak}@email.com dengan jadwal ${tanggal} ${selectedJam}`);
//     console.log(`Sync ke Google Calendar: ${tanggal} ${selectedJam} selama ${durasi} menit - ${lokasi}`);

//     const pesan = `Halo Admin, saya ingin membuat janji temu:\n\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nNama: ${nama}\nKontak: ${kontak}\nKeperluan: ${keperluan}`;
//     const noHP = "6285817298071";
//     const whatsappLink = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;
//     setSuccess(true);
//     window.open(whatsappLink, "_blank");
//   };

//   return (
//     <div className={styles.bookingWizard}>
//       <h3>Booking Jadwal Konsultasi</h3>

//       {step === 1 && (
//         <div className={styles.stepBox}>
//           <p>Pilih tanggal:</p>
//           <input
//             type="date"
//             value={tanggal}
//             onChange={(e) => setTanggal(e.target.value)}
//             required
//           />
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

//       {step === 3 && (
//         <div className={styles.stepBox}>
//           <p>Isi data diri:</p>
//           <input
//             type="text"
//             placeholder="Nama"
//             value={nama}
//             onChange={(e) => setNama(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="No. WhatsApp"
//             value={kontak}
//             onChange={(e) => setKontak(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Keperluan"
//             value={keperluan}
//             onChange={(e) => setKeperluan(e.target.value)}
//             required
//           />
//           <div className={styles.navBtn}>
//             <button onClick={() => setStep(2)}>Back</button>
//             <button onClick={handleSubmit}>Kirim & Redirect WhatsApp</button>
//           </div>
//         </div>
//       )}

//       {success && bookingLink && (
//         <div>
//           <p className={styles.success}>Janji berhasil dikirim! Anda akan diarahkan ke WhatsApp.</p>
//           <p><strong>Link Booking:</strong></p>
//           <input
//             type="text"
//             value={bookingLink}
//             readOnly
//             onClick={(e) => (e.target as HTMLInputElement).select()}
//             style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
//           />
//           <a href={bookingLink} target="_blank" rel="noopener noreferrer">
//             <button style={{ marginTop: "1rem" }}>Lihat Detail Booking</button>
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }



//JANGAN DIHAPUS YAA IKI INI LINK< EMAIL JS SEMUA AMAN
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
// import { createGoogleCalendarEvent } from "../../lib/googleCalendar";
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

// const { data: session } = useSession();

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
//     //   await emailjs.send(
//     //     "your_service_id",
//     //     "your_template_id",
//     //     {
//     //       to_email: toEmail,
//     //       subject,
//     //       message
//     //     },
//     //     "your_user_id"
//     //   );
//     await emailjs.send(
//   process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//   process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//   {
//     to_email: toEmail,
//     subject,
//     message
//   },
//   process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
// );

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

//     const pesan = `Halo Admin, saya ingin membuat janji temu:\n\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nNama: ${nama}\nKontak: ${kontak}\nKeperluan: ${keperluan}`;
//     const noHP = "6285817298071";
//     const whatsappLink = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;
//     setSuccess(true);

//     if (session?.accessToken) {
//   const startDateTime = new Date(`${tanggal}T${selectedJam}:00`);
//   const endDateTime = new Date(startDateTime.getTime() + Number(durasi) * 60000);
  
//   await createGoogleCalendarEvent(session.accessToken, {
//     summary: `Meeting dengan ${nama}`,
//     description: keperluan,
//     start: startDateTime.toISOString(),
//     end: endDateTime.toISOString(),
//   });
// } else {
//   alert("Login Google dibutuhkan untuk sinkronisasi ke Kalender");
//   signIn("google");
// }
//     window.open(whatsappLink, "_blank");
//   };

//   return (
//     <div className={styles.bookingWizard}>
//       <h3>Booking Jadwal Konsultasi</h3>

//       {step === 1 && (
//         <div className={styles.stepBox}>
//           <p>Pilih tanggal:</p>
//           <input
//             type="date"
//             value={tanggal}
//             onChange={(e) => setTanggal(e.target.value)}
//             required
//           />
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

//       {step === 3 && (
//         <div className={styles.stepBox}>
//           <p>Isi data diri:</p>
//           <input
//             type="text"
//             placeholder="Nama"
//             value={nama}
//             onChange={(e) => setNama(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="No. WhatsApp"
//             value={kontak}
//             onChange={(e) => setKontak(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Keperluan"
//             value={keperluan}
//             onChange={(e) => setKeperluan(e.target.value)}
//             required
//           />
//           <div className={styles.navBtn}>
//             <button onClick={() => setStep(2)}>Back</button>
//             <button onClick={handleSubmit}>Kirim & Redirect WhatsApp</button>
//           </div>
//         </div>
//       )}

//       {success && bookingLink && (
//         <div>
//           <p className={styles.success}>Janji berhasil dikirim! Anda akan diarahkan ke WhatsApp.</p>
//           <p><strong>Link Booking:</strong></p>
//           <input
//             type="text"
//             value={bookingLink}
//             readOnly
//             onClick={(e) => (e.target as HTMLInputElement).select()}
//             style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
//           />
//           <a href={bookingLink} target="_blank" rel="noopener noreferrer">
//             <button style={{ marginTop: "1rem" }}>Lihat Detail Booking</button>
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }



// components/BookingWizard.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import emailjs from "@emailjs/browser";
import styles from "../styles/SmeetBooking.module.scss";
import { useSession, signIn } from "next-auth/react";
import { createGoogleCalendarEvent } from "../../lib/googleCalendar";

const jamList = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

const durasiOptions = ["15", "30", "45", "60"];
const lokasiOptions = ["Zoom", "Phone call", "In-person", "WhatsApp", "Custom"];

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [tanggal, setTanggal] = useState("");
  const [jadwalTerisi, setJadwalTerisi] = useState<string[]>([]);
  const [selectedJam, setSelectedJam] = useState("");
  const [durasi, setDurasi] = useState("30");
  const [lokasi, setLokasi] = useState("WhatsApp");
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookingLink, setBookingLink] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (tanggal) {
      const hari = new Date(tanggal).getDay();
      if (hari === 0 || hari === 6) {
        setJadwalTerisi(jamList);
        return;
      }
      const fetchTerisi = async () => {
        const q = query(collection(db, "agenda"), where("tanggal", "==", tanggal));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data().jam);
        setJadwalTerisi(data);
      };
      fetchTerisi();
    }
  }, [tanggal]);

  const sendEmailReminder = async (toEmail: string, subject: string, message: string) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_email: toEmail,
          subject,
          message
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      console.log("Email reminder sent");
    } catch (error) {
      console.error("Email sending failed", error);
    }
  };

  const handleSubmit = async () => {
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

    const link = `${window.location.origin}/booking/${docRef.id}`;
    setBookingLink(link);

    const emailMessage = `Hi ${nama},\n\nBerikut adalah detail booking Anda:\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nKeperluan: ${keperluan}\n\nLihat detail: ${link}`;
    await sendEmailReminder(`${kontak}@email.com`, "Konfirmasi Booking Konsultasi", emailMessage);

    if (session?.user?.email && (session as any)?.accessToken) {
      const startDateTime = new Date(`${tanggal}T${selectedJam}:00`);
      const endDateTime = new Date(startDateTime.getTime() + Number(durasi) * 60000);

    //   await createGoogleCalendarEvent((session as any).accessToken, {
    //     summary: `Meeting dengan ${nama}`,
    //     description: keperluan,
    //     start: startDateTime.toISOString(),
    //     end: endDateTime.toISOString(),
    //   });
      await fetch("../api/auth/[...nextauth].ts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    summary: `Meeting dengan ${nama}`,
    description: keperluan,
    start: startDateTime.toISOString(),
    end: endDateTime.toISOString(),
  }),
});
// await fetch("../api/google-calender/create.ts", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     summary: `Meeting dengan ${nama}`,
//     description: keperluan,
//     start: startDateTime.toISOString(),
//     end: endDateTime.toISOString(),
//   }),
// });


    } else {
      alert("Login Google dibutuhkan untuk sinkronisasi ke Kalender");
      signIn("google");
    }

    const pesan = `Halo Admin, saya ingin membuat janji temu:\n\nTanggal: ${tanggal}\nJam: ${selectedJam}\nDurasi: ${durasi} menit\nLokasi: ${lokasi}\nNama: ${nama}\nKontak: ${kontak}\nKeperluan: ${keperluan}`;
    const noHP = "6285817298071";
    const whatsappLink = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;
    setSuccess(true);
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className={styles.bookingWizard}>
      <h3>Booking Jadwal Konsultasi</h3>

      {/* Steps */}
      {/* Step 1 */}
      {step === 1 && (
        <div className={styles.stepBox}>
          <p>Pilih tanggal:</p>
          <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
          <p>Pilih durasi:</p>
          <select value={durasi} onChange={(e) => setDurasi(e.target.value)}>
            {durasiOptions.map((d) => (
              <option key={d} value={d}>{d} menit</option>
            ))}
          </select>
          <p>Pilih lokasi:</p>
          <select value={lokasi} onChange={(e) => setLokasi(e.target.value)}>
            {lokasiOptions.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <div className={styles.navBtn}>
            <button disabled={!tanggal} onClick={() => setStep(2)}>Next</button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className={styles.stepBox}>
          <p>Pilih jam:</p>
          <div className={styles.gridSlot}>
            {jamList.map((jam) => (
              <button
                key={jam}
                onClick={() => setSelectedJam(jam)}
                disabled={jadwalTerisi.includes(jam)}
                className={selectedJam === jam ? styles.active : jadwalTerisi.includes(jam) ? styles.disabled : ""}
              >
                {jam}
              </button>
            ))}
          </div>
          <div className={styles.navBtn}>
            <button onClick={() => setStep(1)}>Back</button>
            <button disabled={!selectedJam} onClick={() => setStep(3)}>Next</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className={styles.stepBox}>
          <p>Isi data diri:</p>
          <input type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
          <input type="tel" placeholder="No. WhatsApp" value={kontak} onChange={(e) => setKontak(e.target.value)} required />
          <textarea placeholder="Keperluan" value={keperluan} onChange={(e) => setKeperluan(e.target.value)} required />
          <div className={styles.navBtn}>
            <button onClick={() => setStep(2)}>Back</button>
            <button onClick={handleSubmit}>Kirim & Redirect WhatsApp</button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && bookingLink && (
        <div>
          <p className={styles.success}>Janji berhasil dikirim! Anda akan diarahkan ke WhatsApp.</p>
          <p><strong>Link Booking:</strong></p>
          <input type="text" value={bookingLink} readOnly onClick={(e) => (e.target as HTMLInputElement).select()} style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }} />
          <a href={bookingLink} target="_blank" rel="noopener noreferrer">
            <button style={{ marginTop: "1rem" }}>Lihat Detail Booking</button>
          </a>
        </div>
      )}
    </div>
  );
}

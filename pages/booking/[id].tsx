// pages/booking/[id].tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function BookingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBooking = async () => {
        const docRef = doc(db, "agenda", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBooking(docSnap.data());
        }
        setLoading(false);
      };
      fetchBooking();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!booking) return <p>Data booking tidak ditemukan.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1.5rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Detail Booking</h2>
      <p><strong>Nama:</strong> {booking.nama}</p>
      <p><strong>Tanggal:</strong> {booking.tanggal}</p>
      <p><strong>Jam:</strong> {booking.jam}</p>
      <p><strong>Durasi:</strong> {booking.durasi} menit</p>
      <p><strong>Lokasi:</strong> {booking.lokasi}</p>
      <p><strong>Kontak:</strong> {booking.kontak}</p>
      <p><strong>Keperluan:</strong> {booking.keperluan}</p>
      <p><em>ID Booking: {id}</em></p>
    </div>
  );
}
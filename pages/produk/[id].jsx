// // pages/produk/[id].jsx 
// import dynamic from "next/dynamic"; import React from "react"; // load client component client-only (ssr: false) agar tidak dieksekusi di server 
// const ProductDetailClient = dynamic(() => import("./ProductDetailClient"), { ssr: false }); export default function ProdukByIdPage() { return <ProductDetailClient />; }



// pages/produk/[id].jsx
import dynamic from "next/dynamic";
import React from "react";

// load client component only on client (so it can use window, router, firebase client)
const ProductDetailClient = dynamic(() => import("./ProductDetailClient"), { ssr: false });

export default function ProdukByIdPage() {
  return <ProductDetailClient />;
}


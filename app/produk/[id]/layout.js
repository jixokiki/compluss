// import './globals.css'
// // import "@/styles/globals.scss"; // ✅ gunakan file SCSS

// // export const metadata = {
// //   title: "BrandStore",
// //   description: "Produk terbaik dari BrandStore Indonesia",
// // };
// export const metadata = {
//   title: "PT. Complus Sistem Solusi",
//   description: "Solusi teknologi informasi terbaik untuk pendidikan, pemerintahan, dan sektor publik. Temukan produk unggulan dari Complus.",
//   openGraph: {
//     title: "PT. Complus Sistem Solusi",
//     description: "Solusi teknologi informasi terbaik dan produk TIK terlengkap. Kami adalah partner resmi Acer, Zyrex, Lenovo, dan lainnya.",
//     url: "https://www.compluscss.com",
//     type: "website",
//     images: [
//       {
//         url: "https://www.compluscss.com/logo4.png",
//         width: 1200,
//         height: 630,
//         alt: "Logo PT. Complus Sistem Solusi",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "PT. Complus Sistem Solusi",
//     description: "Temukan solusi perangkat IT dan produk unggulan di Complus.",
//     images: ["https://www.compluscss.com/logo4.png"],
//   },
// };


// export default function RootLayout({ children }) {
//   return (
//     <html lang="id">
//       <body className="font-sans bg-white text-gray-800">
//         {children}
//       </body>
//     </html>
//   );
// }




import "./globals.css";

export const metadata = {
  title: "PT. Complus Sistem Solusi",
  description:
    "Solusi teknologi informasi terbaik untuk pendidikan, pemerintahan, dan sektor publik. Temukan produk unggulan dari Complus.",
  openGraph: {
    title: "PT. Complus Sistem Solusi",
    description:
      "Solusi teknologi informasi terbaik dan produk TIK terlengkap. Kami adalah partner resmi Acer, Zyrex, Lenovo, dan lainnya.",
    url: "https://www.compluscss.com",
    type: "website",
    images: [
      {
        url: "https://www.compluscss.com/logo4.png",
        width: 1200,
        height: 630,
        alt: "Logo PT. Complus Sistem Solusi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT. Complus Sistem Solusi",
    description: "Temukan solusi perangkat IT dan produk unggulan di Complus.",
    images: ["https://www.compluscss.com/logo4.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="font-sans bg-white text-gray-800">{children}</body>
    </html>
  );
}

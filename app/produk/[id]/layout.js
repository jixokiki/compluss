import './globals.css'
// import "@/styles/globals.scss"; // ✅ gunakan file SCSS

export const metadata = {
  title: "BrandStore",
  description: "Produk terbaik dari BrandStore Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="font-sans bg-white text-gray-800">
        {children}
      </body>
    </html>
  );
}



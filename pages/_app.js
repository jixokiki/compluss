// import "@/styles/globals.css";

import "../styles/globals.css"; // ✅ gunakan relative path jika tidak pakai alias "@"



export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

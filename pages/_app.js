// import "@/styles/globals.css";

import "../styles/globals.css"; // ✅ gunakan relative path jika tidak pakai alias "@"



// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }


// pages/_app.js
// import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
    </SessionProvider>
  );
}


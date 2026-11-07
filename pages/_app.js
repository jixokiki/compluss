// import "@/styles/globals.css";

import "../styles/globals.css"; // ✅ gunakan relative path jika tidak pakai alias "@"



// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }


// pages/_app.js
// import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Script from "next/script"; // (tambahan) untuk Google Analytics & Clarity

// (tambahan) ID dibaca dari environment variable; kalau kosong, script tidak dipasang
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;            // contoh: G-XXXXXXXXXX
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;  // opsional (Microsoft Clarity)
const IS_PROD = process.env.NODE_ENV === "production";  // tidak menghitung kunjungan saat development

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* (tambahan) Google Analytics 4 */}
      {IS_PROD && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {/* (tambahan) Microsoft Clarity (opsional) */}
      {IS_PROD && CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}

      <Component {...pageProps} />
      {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
    </SessionProvider>
  );
}


// import { Html, Head, Main, NextScript } from "next/document";

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head>
// <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>PT. Wae Mandiri Karya | Solusi TIK Terintegrasi</title>
//         <meta
//           name="description"
//           content="Tingkatkan kualitas pendidikan dan operasional sekolah Anda dengan solusi perangkat TIK dari PT. Complus Sistem Solusi, partner resmi ACER, ZYREX, Lenovo, dan lainnya."
//         />
//         {/* OG Meta */}
//         <meta
//           property="og:title"
//           content="PT. Complus Sistem Solusi | Solusi TIK Terintegrasi untuk Sekolah & Pemerintah"
//         />
//         <meta
//           property="og:description"
//           content="Upgrade sekolah Anda dengan perangkat digital terbaik dari partner resmi ACER, ZYREX, Lenovo, dan lainnya. Smart Classroom, Meubeler, hingga Sistem Keamanan."
//         />
//         <meta
//           property="og:image"
//           content="https://www.compluscss.com/logo4.png"
//         />
//         <meta property="og:url" content="https://www.compluscss.com/" />
//         <meta property="og:type" content="website" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Open+Sans&display=swap"
//           rel="stylesheet"
//         />
//       </Head>
//       <body className="antialiased">
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }


// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://waemandirikarya-wmk.web.app";
// (tambahan) kode verifikasi, diisi lewat environment variable (kosong = tidak dipasang)
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;   // Google Search Console
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_VERIFICATION; // Bing Webmaster Tools
const SITE_NAME = "PT. Wae Mandiri Karya";
const LOGO_URL = process.env.NEXT_PUBLIC_OG_IMAGE || `${SITE_URL}/wmk-logo.jpeg`; // ganti jika path logo berbeda

export default function Document() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": LOGO_URL,
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+6289506377440",
        "contactType": "customer service",
        "email": "Marketing@wmk.co.id",
        "areaServed": "ID"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. BKKBN No.7 RT.002/RW.007, Mustika Jaya",
      "addressLocality": "Bekasi",
      "addressRegion": "Jawa Barat",
      "postalCode": "17158",
      "addressCountry": "ID"
    },
    "description": "PT. Wae Mandiri Karya menyediakan layanan fabrikasi pipa, pembuatan cable tray/rack, instalasi, modifikasi, dan maintenance untuk sektor industri."
  };

  return (
    <Html lang="id">
      <Head>
        {/* Basic meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Primary SEO: title & description */}
        <title>{`${SITE_NAME} | Solusi Manufaktur & Instalasi`}</title>
        <meta
          name="description"
          content="PT. Wae Mandiri Karya — layanan fabrikasi pipa, cable tray/rack, instalasi, dan maintenance. Solusi custom untuk kebutuhan industri dan infrastruktur."
        />
        <meta name="keywords" content="PT Wae Mandiri Karya, fabrikasi pipa, cable tray, cable rack, instalasi, maintenance, fabrikasi industri" />
        <meta name="author" content={SITE_NAME} />

        {/* Canonical + robots */}
        <link rel="canonical" href={SITE_URL} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Social) */}
        <meta property="og:locale" content="id_ID" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${SITE_NAME} | Solusi Manufaktur & Instalasi`} />
        <meta
          property="og:description"
          content="PT. Wae Mandiri Karya — solusi fabrikasi pipa, tray/rack kabel, instalasi, dan maintenance untuk sektor industri."
        />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={LOGO_URL} />
        <meta property="og:image:alt" content={`${SITE_NAME} logo`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@waemandirikarya" />
        <meta name="twitter:title" content={`${SITE_NAME} | Solusi Manufaktur & Instalasi`} />
        <meta name="twitter:description" content="Fabrikasi pipa, cable tray/rack, instalasi, modifikasi, dan maintenance." />
        <meta name="twitter:image" content={LOGO_URL} />

        {/* Mobile & PWA hints */}
        <meta name="theme-color" content="#0b63a6" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Preconnect / Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />

        {/* Structured data JSON-LD for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Favicons (ganti path jika berbeda) */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Sitemap & hreflang */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href={`${SITE_URL}/sitemap.xml`} />
        <link rel="alternate" href={SITE_URL} hrefLang="id" />

        {/* (tambahan) Verifikasi Google Search Console & Bing */}
        {GSC_VERIFICATION && <meta name="google-site-verification" content={GSC_VERIFICATION} />}
        {BING_VERIFICATION && <meta name="msvalidate.01" content={BING_VERIFICATION} />}
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add('js-enabled')}catch(e){}})();`,
          }}
        />
      </body>
    </Html>
  );
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
<meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PT. Complus Sistem Solusi | Solusi TIK Terintegrasi</title>
        <meta
          name="description"
          content="Tingkatkan kualitas pendidikan dan operasional sekolah Anda dengan solusi perangkat TIK dari PT. Complus Sistem Solusi, partner resmi ACER, ZYREX, Lenovo, dan lainnya."
        />
        {/* OG Meta */}
        <meta
          property="og:title"
          content="PT. Complus Sistem Solusi | Solusi TIK Terintegrasi untuk Sekolah & Pemerintah"
        />
        <meta
          property="og:description"
          content="Upgrade sekolah Anda dengan perangkat digital terbaik dari partner resmi ACER, ZYREX, Lenovo, dan lainnya. Smart Classroom, Meubeler, hingga Sistem Keamanan."
        />
        <meta
          property="og:image"
          content="https://www.compluscss.com/logo4.png"
        />
        <meta property="og:url" content="https://www.compluscss.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
